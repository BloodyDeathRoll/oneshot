#!/usr/bin/env node
// dashboard/server.mjs — control layer, step 1 (proposals/dashboard-01/001, approved 2026-09-27).
//
// One Node process, no dependencies. It does three things and nothing else:
//   1. serves the dashboard build and a live data.json (buildData() on every request);
//   2. pushes a Server-Sent Event whenever ledger.jsonl / runs/ / deploy.json / proposals change, or
//      origin/main moves (it fetches every --sync seconds, default 60, 0 = never; docs/team.md);
//   3. accepts a human gate decision on POST /decide and appends exactly one ledger line for it,
//      after checking the business is still in the state the page saw (a stale page is rejected);
//   5. saves an agent's definition from the Agents view: POST /agent-rules writes the operator's own
//      agents/<name>/custom.md; POST /agent-tweak turns an edit of Claude's base.md into a suggested
//      tweak (proposals/<run>/NNN-<agent>-<title>.md + its plain summary in dashboard/tweaks.json) and
//      never touches base.md itself. Both refuse a file that changed since the page read it.
//   4. accepts a handoff on POST /handoff and appends one assignment line to activity.jsonl
//      (tools/team.mjs assign — never a ledger line), and serves /thumb/<slug>.jpg, the first screen
//      of the site's live preview (dashboard/thumbs.mjs).
// It holds no Claude credentials, runs no agent, and can write only the ledger line shapes in DECISIONS
// plus one activity.jsonl shape (an assignment, via /handoff).
//
//   node dashboard/server.mjs [--port 8970] [--host 127.0.0.1] [--root dashboard/mockups/soft-cards/dist] [--ledger ledger.jsonl] [--operator shahar] [--sync 60]
//
// The operator running the server (team.json; default `tools/team.mjs whoami`) is the one whose
// decisions it records: every line it appends carries `operator` (docs/team.md).
//
// Local by default. For a phone: run it behind Caddy + basic auth on the CMS box, or a Cloudflare
// Tunnel to this machine; never expose it bare.

import { createServer } from 'node:http';
import { readFileSync, existsSync, appendFileSync, writeFileSync, mkdirSync, readdirSync, mkdtempSync, rmSync, watch, statSync, createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildData } from './data.mjs';
import { whoami, team, assign, ACTIVITY } from '../tools/team.mjs';
import { currentRun } from '../tools/run.mjs';
import { shootThumb, thumbFresh, markPitchLive } from './thumbs.mjs';
import { readJsonlMerged, fetch as fetchMain } from '../tools/origin.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const PORT = Number(arg('port', 8970));
const HOST = arg('host', '127.0.0.1');
const DIST = resolve(ROOT, arg('root', 'dashboard/mockups/soft-cards/dist'));
const LEDGER = resolve(ROOT, arg('ledger', 'ledger.jsonl'));
const SYNC_S = Number(arg('sync', 60));
let OPERATOR;
try { OPERATOR = arg('operator', null) ?? whoami(); if (!team()[OPERATOR]) throw new Error(`${OPERATOR} is not in team.json`); }
catch (e) { console.error(`dashboard server: ${e.message}`); process.exit(2); }
const HUMAN = team()[OPERATOR].name;

// Repo files the page may read (sheets to pick from, pitch drafts, proposals) — prefixes only, read-only.
const FILE_PREFIXES = ['sites/', 'proposals/', 'reports/', 'agents/', 'dashboard/mockups/', 'dashboard/overview-03/', 'dashboard/agents-04/', 'agents/designer/gold/shots/'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };

// ---- the only seven things this server can write --------------------------------------------------
// Each decision: which state the business must be in now, and the line it produces.
const DECISIONS = {
  // gate a — one call per business on the shortlist
  shortlist: {
    from: ['shortlisted'],
    choices: ['approve', 'drop'],
    line: ({ choice, reason }) => choice === 'approve'
      ? { to_state: 'approved', note: `gate a: approved by ${HUMAN} via dashboard. Verbatim: "${reason}"` }
      : { to_state: 'shortlisted', note: `dropped by ${HUMAN} via dashboard: ${reason}` },
  },
  // gate b — the mockup pick
  pick: {
    from: ['mocked'],
    choices: ['calm', 'interactive', 'unique'],
    line: ({ choice, reason }) => ({ to_state: 'picked', note: `${HUMAN} picks ${choice.toUpperCase()} via dashboard. Verbatim: "${reason}"` }),
  },
  // gate c — the pitch was sent (by a human, outside this system)
  pitch: {
    from: ['packaged'],
    choices: ['whatsapp', 'in_person', 'email', 'phone'],
    line: ({ choice, reason, date }) => ({ to_state: 'pitched', note: `sent by ${HUMAN} via ${choice.replace('_', ' ')}${date ? ` on ${date}` : ''}. ${reason}` }),
  },
  // after the pitch — outcomes, repeatable (reply → meeting → sale)
  outcome: {
    from: ['pitched', 'outcome:reply', 'outcome:meeting', 'outcome:ignored'],
    choices: ['reply', 'meeting', 'sale', 'ignored'],
    line: ({ choice, reason }) => ({ to_state: `outcome:${choice}`, note: reason }),
  },
  // gate e — after a sale, the product the client chose (2026-10-05: the CMS comes only after this);
  // the line carries hosting_mode, which decides the deployer's station-8 adapter (docs/ledger.md)
  product: {
    from: ['outcome:sale'],
    choices: ['managed', 'self_hosted_docker', 'static_only'],
    line: ({ choice, reason }) => ({ to_state: 'product_chosen', hosting_mode: choice, note: `gate e: the client chose ${choice}, recorded by ${HUMAN} via dashboard. Verbatim: "${reason}"` }),
  },
  // gate d — a prompt diff under proposals/ (slug "-"); the merge itself stays a code change
  proposal: {
    from: null,
    choices: ['approved', 'rejected'],
    reasonOptional: true, // a yes/no on a suggested agent tweak needs no explanation
    line: ({ choice, reason, file }) => ({ to_state: `proposal:${choice}`, note: `${file}: ${choice} by ${HUMAN} via dashboard${reason ? `. ${reason}` : ''}` }),
  },
};

// The default ledger is read merged with origin/main's, so a gate the other operator already passed
// and merged is seen here as passed (tools/origin.mjs).
function readLedger() {
  if (LEDGER === join(ROOT, 'ledger.jsonl')) return readJsonlMerged('ledger.jsonl');
  return readFileSync(LEDGER, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}
function currentState(run_id, slug) {
  const lines = readLedger().filter((l) => l.run_id === run_id && l.slug === slug);
  return lines.at(-1) ?? null; // last line in file order (CLAUDE.md)
}

function decide(body) {
  const spec = Object.hasOwn(DECISIONS, body.gate) ? DECISIONS[body.gate] : null;
  if (!spec) return { status: 400, error: `unknown gate "${body.gate}"; one of ${Object.keys(DECISIONS).join(', ')}` };
  if (!spec.choices.includes(body.choice)) return { status: 400, error: `choice must be one of ${spec.choices.join(', ')}` };
  const reason = String(body.reason ?? '').trim();
  if (reason.length < 3 && !spec.reasonOptional) return { status: 400, error: 'a reason is required; it becomes the ledger note verbatim' };
  if (!body.run_id) return { status: 400, error: 'run_id is required' };

  let from_state = null, slug;
  if (spec.from) {
    slug = body.slug;
    if (!slug) return { status: 400, error: 'slug is required' };
    const last = currentState(body.run_id, slug);
    if (!last) return { status: 409, error: `${slug} has no line in run ${body.run_id}` };
    if (!spec.from.includes(last.to_state)) return { status: 409, error: `stale: ${slug} is now "${last.to_state}", this decision needs ${spec.from.join(' | ')}`, current: last };
    if (body.expected_state && body.expected_state !== last.to_state) return { status: 409, error: `stale page: expected "${body.expected_state}", ledger says "${last.to_state}"`, current: last };
    from_state = last.to_state;
  } else {
    slug = '-';
    const file = String(body.file ?? '');
    if (!/^proposals\/[\w.-]+\/[\w.-]+\.md$/.test(file) || !existsSync(join(ROOT, file))) return { status: 400, error: 'file must be an existing proposals/<run>/<name>.md' };
    const prior = [...readLedger()].reverse().find((l) => /^proposal:/.test(l.to_state) && (l.note ?? '').startsWith(file));
    if (prior) return { status: 409, error: `already decided: ${file} was ${prior.to_state.slice(9)} on ${prior.ts}; a change is a CLI decision, not a second click`, current: prior };
    body = { ...body, file };
  }
  const { to_state, note, hosting_mode } = spec.line({ ...body, reason });
  const line = { ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), run_id: body.run_id, slug, agent: 'human', agent_version: null, from_state, to_state, note, operator: OPERATOR, ...(hosting_mode ? { hosting_mode } : {}) };
  appendFileSync(LEDGER, JSON.stringify(line) + '\n');
  return { status: 201, line };
}

// ---- handoff: an assignment for the other operator (docs/team.md) ---------------------------------
// Reaches them through activity.jsonl once merged to main; the page offers the prompt to copy and send.
function handoff(body) {
  const slug = String(body.slug ?? ''), to = String(body.to ?? ''), task = String(body.task ?? '').trim();
  if (!team()[to]) return { status: 400, error: `to must be one of ${Object.keys(team()).join(', ')}` };
  if (task.length < 3) return { status: 400, error: 'a request is required (at least 3 characters)' };
  if (!readLedger().some((l) => l.slug === slug)) return { status: 400, error: `${slug} has no ledger line` };
  return { status: 201, line: assign(slug, task, to, OPERATOR) };
}

// ---- agent definitions (the Agents view) ----------------------------------------------------------
// custom.md is the operator's own layer (CLAUDE.md: Claude never edits it); the operator saves it here.
// base.md is Claude's: an edit from the dashboard only becomes a suggested tweak for gate d.
const shaOf = (t) => createHash('sha256').update(t).digest('hex').slice(0, 16);
const agentDir = (a) => (typeof a === 'string' && /^[a-z][a-z-]*$/.test(a) && existsSync(join(ROOT, 'agents', a, 'base.md')) ? join(ROOT, 'agents', a) : null);
const logWork = (slug, note, files) => appendFileSync(ACTIVITY, JSON.stringify({ ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), operator: OPERATOR, slug, kind: 'work', note, files }) + '\n');
function saveRules(body) {
  const dir = agentDir(body.agent);
  if (!dir) return { status: 400, error: 'unknown agent' };
  if (typeof body.text !== 'string' || body.text.length > 200_000) return { status: 400, error: 'text is required' };
  const path = join(dir, 'custom.md');
  const cur = existsSync(path) ? readFileSync(path, 'utf8') : '';
  if (body.base_sha && body.base_sha !== shaOf(cur)) return { status: 409, error: 'This file changed since you opened it. Reload the page, then make your edit again.' };
  const header = cur.match(/^#\s[^\n]*\n(?:\s*\n)*---\s*\n/)?.[0] ?? '';
  const next = header + body.text.trim() + '\n';
  writeFileSync(path, next);
  logWork('-', `${body.agent}: ${HUMAN} saved their rules (custom.md) from the dashboard`, [`agents/${body.agent}/custom.md`]);
  return { status: 201, sha: shaOf(next), file: `agents/${body.agent}/custom.md` };
}
function suggestTweak(body) {
  const dir = agentDir(body.agent);
  if (!dir) return { status: 400, error: 'unknown agent' };
  const title = String(body.title ?? '').trim(), what = String(body.what ?? '').trim(), why = String(body.why ?? '').trim();
  if (title.length < 3 || what.length < 3 || why.length < 3) return { status: 400, error: 'Give the tweak a title, what it changes and why.' };
  if (typeof body.text !== 'string' || body.text.length > 400_000) return { status: 400, error: 'text is required' };
  const cur = readFileSync(join(dir, 'base.md'), 'utf8');
  if (body.base_sha && body.base_sha !== shaOf(cur)) return { status: 409, error: "Claude's instructions changed since you opened them. Reload the page, then make your edit again." };
  const next = body.text.endsWith('\n') ? body.text : body.text + '\n';
  if (next === cur) return { status: 400, error: 'Nothing changed.' };
  const tmp = mkdtempSync(join(tmpdir(), 'tweak-'));
  let diff = '';
  try {
    writeFileSync(join(tmp, 'a'), cur); writeFileSync(join(tmp, 'b'), next);
    try { execFileSync('diff', ['-u', '--label', `a/agents/${body.agent}/base.md`, '--label', `b/agents/${body.agent}/base.md`, join(tmp, 'a'), join(tmp, 'b')], { encoding: 'utf8' }); }
    catch (e) { diff = e.stdout ?? ''; }
  } finally { rmSync(tmp, { recursive: true, force: true }); }
  let run; try { run = currentRun({ operator: OPERATOR }).run_id; } catch { run = 'dashboard'; }
  const pdir = join(ROOT, 'proposals', run);
  mkdirSync(pdir, { recursive: true });
  const n = Math.max(0, ...readdirSync(pdir).map((f) => Number(f.match(/^(\d{3})-/)?.[1] ?? 0))) + 1;
  const num = String(n).padStart(3, '0');
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
  const rel = `proposals/${run}/${num}-${body.agent}-${slug}.md`;
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(ROOT, rel), `# ${num} — ${body.agent}: ${title}\n\nFiled ${today} by ${HUMAN} from the dashboard (Agents → Edit as a suggested tweak). **Not applied.** Awaiting approval (gate d); on approval Claude applies the diff to \`agents/${body.agent}/base.md\`, bumps its version and adds a CHANGELOG line.\n\n**Target:** \`agents/${body.agent}/base.md\`\n\n## What changes\n\n${what}\n\n## Why\n\n${why}\n\n## Diff\n\n\`\`\`diff\n${diff.trimEnd()}\n\`\`\`\n`);
  const tw = join(ROOT, 'dashboard', 'tweaks.json');
  const plain = existsSync(tw) ? JSON.parse(readFileSync(tw, 'utf8')) : {};
  const name = body.agent.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  plain[rel] = { title, agent: name, what, why, status: 'pending' };
  writeFileSync(tw, JSON.stringify(plain, null, 2) + '\n');
  logWork('-', `${body.agent}: ${HUMAN} suggested a tweak to Claude's instructions from the dashboard: ${title}`, [rel, 'dashboard/tweaks.json']);
  return { status: 201, file: rel };
}

// ---- thumbnails -------------------------------------------------------------------------------------
let previewCache = { at: 0, urls: {} };
function previewUrl(slug) {
  if (Date.now() - previewCache.at > 60_000) {
    const urls = {};
    for (const b of buildData({ ledgerPath: LEDGER, operator: OPERATOR }).businesses) if (b.preview_url) urls[b.slug] = b.preview_url;
    previewCache = { at: Date.now(), urls };
  }
  return previewCache.urls[slug] ?? null;
}
async function serveThumb(res, slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return send(res, 400, { error: 'bad slug' });
  const out = join(DIST, 'img', `${slug}.jpg`);
  if (!thumbFresh(out)) {
    const url = previewUrl(slug);
    if (!url) return send(res, 404, { error: `${slug} has no preview URL` });
    try { await shootThumb(url, out); } catch (e) { if (!existsSync(out)) return send(res, 502, { error: `could not shoot ${url}: ${e.message}` }); }
  }
  serveFile(res, out);
}

// ---- live updates ---------------------------------------------------------------------------------
const clients = new Set();
let timer = null;
function notify(what) {
  clearTimeout(timer);
  timer = setTimeout(() => { for (const res of clients) res.write(`event: data\ndata: ${JSON.stringify({ changed: what, at: new Date().toISOString() })}\n\n`); }, 300);
}
for (const rel of ['ledger.jsonl', 'activity.jsonl', 'runs', 'proposals', 'sites', 'expenses.jsonl', 'revenues.jsonl', 'media', 'agents', 'dashboard/tweaks.json']) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) continue;
  try { watch(abs, { recursive: statSync(abs).isDirectory() }, (_e, f) => notify(f ? `${rel}/${f}` : rel)); } catch { /* recursive watch unsupported: ledger still watched */ }
}
if (LEDGER !== join(ROOT, 'ledger.jsonl') && existsSync(LEDGER)) watch(LEDGER, () => notify('ledger'));
// What the other operator merged reaches this page through origin/main.
if (SYNC_S > 0) {
  const sync = async () => { if (await fetchMain()) notify('origin/main'); };
  sync(); setInterval(sync, SYNC_S * 1000).unref();
}

// ---- http -----------------------------------------------------------------------------------------
const send = (res, status, body, type = 'application/json') => { res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' }); res.end(typeof body === 'string' ? body : JSON.stringify(body)); };
const safeUnder = (base, rel) => { const p = normalize(join(base, rel)); return p.startsWith(base + sep) || p === base ? p : null; };
function serveFile(res, abs) {
  if (!abs || !existsSync(abs) || statSync(abs).isDirectory()) return send(res, 404, { error: 'not found' });
  res.writeHead(200, { 'content-type': MIME[extname(abs).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(abs).pipe(res);
}

function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = decodeURIComponent(url.pathname);
  if (req.method === 'GET' && (path === '/' || path === '/index.html')) return serveFile(res, join(DIST, 'index.html'));
  if (req.method === 'GET' && path === '/data.json') { markPitchLive(buildData({ ledgerPath: LEDGER, operator: OPERATOR })).then((d) => send(res, 200, d), (e) => send(res, 500, { error: String(e.message ?? e) })); return; }
  if (req.method === 'GET' && path === '/events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
    res.write(`event: hello\ndata: ${JSON.stringify({ at: new Date().toISOString() })}\n\n`);
    clients.add(res); req.on('close', () => clients.delete(res)); return;
  }
  if (req.method === 'GET' && path.startsWith('/files/')) {
    const rel = path.slice('/files/'.length);
    const abs = safeUnder(ROOT, rel); // test the resolved path: "sites/../x" starts with a prefix and is not under one
    if (!abs || !FILE_PREFIXES.some((p) => abs.startsWith(join(ROOT, p)))) return send(res, 403, { error: 'not a readable prefix' });
    return serveFile(res, abs);
  }
  if (req.method === 'GET' && path.startsWith('/thumb/') && path.endsWith('.jpg')) { serveThumb(res, path.slice(7, -4)).catch((e) => { if (!res.headersSent) send(res, 500, { error: String(e.message ?? e) }); }); return; }
  if (req.method === 'GET' && path === '/gates') return send(res, 200, { gates: buildData({ ledgerPath: LEDGER, operator: OPERATOR }).gates, decisions: Object.fromEntries(Object.entries(DECISIONS).map(([k, v]) => [k, { from: v.from, choices: v.choices }])) });
  if (req.method === 'POST' && (path === '/agent-rules' || path === '/agent-tweak')) {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 1_000_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = path === '/agent-rules' ? saveRules(body) : suggestTweak(body); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status === 201) notify(path.slice(1));
      return send(res, out.status, out);
    });
    return;
  }
  if (req.method === 'POST' && path === '/handoff') {
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = handoff(body); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status === 201) notify('handoff');
      return send(res, out.status, out);
    });
    return;
  }
  if (req.method === 'POST' && path === '/decide') {
    // A page on another origin can send text/plain or a form without a preflight; JSON it cannot.
    if (!/^application\/json\b/i.test(req.headers['content-type'] ?? '')) return send(res, 415, { error: 'content-type must be application/json' });
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return send(res, 400, { error: 'body must be a JSON object' });
      let out; try { out = decide(body); } catch (e) { return send(res, 500, { error: String(e.message ?? e) }); }
      if (out.status === 201) notify('decision');
      return send(res, out.status, out);
    });
    return;
  }
  if (req.method === 'GET') return serveFile(res, safeUnder(DIST, path.slice(1)));
  send(res, 405, { error: 'method not allowed' });
}
// One bad request must not take the control layer down: a throw in a handler is an uncaught exception.
const server = createServer((req, res) => {
  try { handle(req, res); } catch (e) {
    if (res.headersSent) return res.end();
    send(res, e instanceof URIError || e.code === 'ERR_INVALID_URL' ? 400 : 500, { error: String(e.message ?? e) });
  }
});

server.listen(PORT, HOST, () => console.log(`dashboard server on http://${HOST}:${PORT}  dist=${DIST}  ledger=${LEDGER}`));
