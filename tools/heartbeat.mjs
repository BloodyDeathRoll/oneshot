#!/usr/bin/env node
// tools/heartbeat.mjs — tells the online dashboard what this session is doing (docs/heartbeat.md).
//
// A Claude Code hook (.claude/settings.json) pipes each hook event here on stdin. The script turns it
// into one small status line — operator, run, business, station, agent — and POSTs it to the dashboard
// box (dashboard/server.mjs POST /status), which both operators' dashboards show as the Live strip.
// Nothing is written to git. No config, no network: the script exits 0 and says nothing.
//
// Config, outside git: ~/.oneshot/box.json (ONESHOT_BOX overrides the path)
//   { "url": "https://dash.130-61-212-182.sslip.io", "key": "<ONESHOT_BOX_KEY on the box>" }
//
// Events sent (kind):
//   session        SessionStart — a session opened on this run
//   station_start  PreToolUse Agent — a station's agent was launched (parsed from the runtime prompt header)
//   station_end    PostToolUse Agent — it returned; the first lines of its report travel as the note
//   alive          any other tool call, at most once a minute
//   idle           Stop — the session is waiting for the human
//   session_end    SessionEnd
//
//   echo '{"hook_event_name":"Stop"}' | node tools/heartbeat.mjs      # by hand
//   node tools/heartbeat.mjs --test                                      # sends one `alive` and prints the reply

import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { homedir, hostname } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = process.env.ONESHOT_BOX ?? join(homedir(), '.oneshot', 'box.json');
const THROTTLE = join(homedir(), '.oneshot', 'heartbeat.last');
const ALIVE_EVERY_S = 60;
const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const clip = (s, n) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

export function loadConfig(path = CONFIG) {
  if (!existsSync(path)) return null;
  try { const c = JSON.parse(readFileSync(path, 'utf8')); return c.url && c.key ? { url: String(c.url).replace(/\/$/, ''), key: String(c.key) } : null; } catch { return null; }
}

// The station and agent a runtime prompt names: "# RUNTIME PROMPT — agent: scout  (station 2)" + "version: 0.3.2".
export function parsePrompt(prompt = '', description = '') {
  const p = String(prompt), d = String(description);
  const m = p.match(/agent:\s*([\w-]+)\s*\(station\s+([^)]+)\)/i);
  const agent = m?.[1] ?? null, station = m?.[2]?.trim() ?? null;
  const version = p.match(/^version:\s*(\S+)/m)?.[1] ?? null;
  const slug = (p + '\n' + d).match(/\bslug\b\s*[:=]?\s*`?([a-z0-9][a-z0-9-]{2,})`?/i)?.[1]
    ?? (p + '\n' + d).match(/\b(?:dossier|sites|brief|notes)\/([a-z0-9][a-z0-9-]+)\//)?.[1] ?? null;
  return { agent, station, version, slug, note: clip(d, 200) };
}

// The text a subagent returned, whatever shape the harness hands it in.
export function responseText(r) {
  if (r == null) return '';
  if (typeof r === 'string') return r;
  if (Array.isArray(r)) return r.map(responseText).join('\n');
  if (typeof r === 'object') return responseText(r.text ?? r.content ?? r.result ?? r.output ?? Object.values(r).find((v) => typeof v === 'string') ?? '');
  return String(r);
}

// One status line from a hook payload, or null when the event is not worth sending.
export function eventFrom(hook, { now = Date.now(), throttleFile = THROTTLE } = {}) {
  const name = hook?.hook_event_name ?? '';
  const base = { session: hook?.session_id ?? null, agent_id: hook?.agent_id ?? null };
  if (name === 'SessionStart') return { ...base, kind: 'session', note: clip(hook.source ?? 'startup', 40) };
  if (name === 'SessionEnd') return { ...base, kind: 'session_end', note: clip(hook.reason ?? '', 40) };
  if (name === 'Stop') return { ...base, kind: 'idle' };
  if (name === 'PreToolUse' || name === 'PostToolUse') {
    if (hook.tool_name === 'Agent') {
      const p = parsePrompt(hook.tool_input?.prompt, hook.tool_input?.description);
      if (name === 'PreToolUse') return { ...base, kind: 'station_start', ...p, tool_id: hook.tool_use_id ?? null };
      return { ...base, kind: 'station_end', ...p, tool_id: hook.tool_use_id ?? null, note: clip(responseText(hook.tool_response), 300) || p.note };
    }
    if (name !== 'PreToolUse') return null;
    try { if (existsSync(throttleFile) && now - statSync(throttleFile).mtimeMs < ALIVE_EVERY_S * 1000) return null; } catch {}
    try { writeFileSync(throttleFile, String(now)); } catch {}
    return { ...base, kind: 'alive', note: clip(hook.tool_name ?? '', 40) };
  }
  return null;
}

// Who and on which run this machine is: operator from team.json, run from runs/ (quietly null when unresolved).
export async function context() {
  let operator = null, run_id = null, run_on_main = null;
  try { operator = (await import('./team.mjs')).whoami(); } catch {}
  try { run_id = (await import('./run.mjs')).currentRun({ operator }).run_id; } catch {}
  if (run_id) { try { execFileSync('git', ['cat-file', '-e', `origin/main:runs/${run_id}.yaml`], { cwd: ROOT, stdio: 'ignore' }); run_on_main = true; } catch { run_on_main = false; } }
  return { operator, run_id, run_on_main, branch: git('branch', '--show-current') || null, host: hostname() };
}

export async function send(cfg, line, { timeoutMs = 4000 } = {}) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(`${cfg.url}/status`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${cfg.key}` }, body: JSON.stringify(line), signal: ac.signal });
    return { status: res.status, body: await res.text().catch(() => '') };
  } finally { clearTimeout(t); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const cfg = loadConfig();
  const test = process.argv.includes('--test');
  if (!cfg) { if (test) console.error(`no ${CONFIG}: {"url":"https://dash.…","key":"…"} (docs/heartbeat.md)`); process.exit(0); }
  let hook = {};
  if (test) hook = { hook_event_name: 'PreToolUse', tool_name: 'test' };
  else { let raw = ''; try { for await (const c of process.stdin) raw += c; hook = JSON.parse(raw || '{}'); } catch { process.exit(0); } }
  const ev = eventFrom(hook, test ? { throttleFile: '/nonexistent/never' } : {});
  if (!ev) process.exit(0);
  const ctx = await context();
  if (!ctx.operator) process.exit(0);
  const line = { ts: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), ...ctx, ...ev };
  try { const r = await send(cfg, line); if (test) console.log(`${r.status} ${r.body}`); }
  catch (e) { if (test) console.error(`heartbeat failed: ${e.message}`); }
  process.exit(0);
}
