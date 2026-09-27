#!/usr/bin/env node
// dashboard/server.mjs — control layer, step 1 (proposals/dashboard-01/001, approved 2026-09-27).
//
// One Node process, no dependencies. It does three things and nothing else:
//   1. serves the dashboard build and a live data.json (buildData() on every request);
//   2. pushes a Server-Sent Event whenever ledger.jsonl / run.yaml / deploy.json / proposals change;
//   3. accepts a human gate decision on POST /decide and appends exactly one ledger line for it,
//      after checking the business is still in the state the page saw (a stale page is rejected).
// It holds no Claude credentials, runs no agent, and can write only the line shapes in DECISIONS.
//
//   node dashboard/server.mjs [--port 8970] [--host 127.0.0.1] [--root dashboard/mockups/soft-cards/dist] [--ledger ledger.jsonl]
//
// Local by default. For a phone: run it behind Caddy + basic auth on the CMS box, or a Cloudflare
// Tunnel to this machine; never expose it bare.

import { createServer } from 'node:http';
import { readFileSync, existsSync, appendFileSync, watch, statSync, createReadStream } from 'node:fs';
import { join, dirname, resolve, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildData } from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const PORT = Number(arg('port', 8970));
const HOST = arg('host', '127.0.0.1');
const DIST = resolve(ROOT, arg('root', 'dashboard/mockups/soft-cards/dist'));
const LEDGER = resolve(ROOT, arg('ledger', 'ledger.jsonl'));
const HUMAN = 'Shahar';

// Repo files the page may read (sheets to pick from, pitch drafts, proposals) — prefixes only, read-only.
const FILE_PREFIXES = ['sites/', 'proposals/', 'reports/', 'dashboard/mockups/', 'agents/designer/gold/shots/'];
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };

// ---- the only six things this server can write --------------------------------------------------
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
  // gate d — a prompt diff under proposals/ (slug "-"); the merge itself stays a code change
  proposal: {
    from: null,
    choices: ['approved', 'rejected'],
    line: ({ choice, reason, file }) => ({ to_state: `proposal:${choice}`, note: `${file}: ${reason}` }),
  },
};

function readLedger() {
  return readFileSync(LEDGER, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}
function currentState(run_id, slug) {
  const lines = readLedger().filter((l) => l.run_id === run_id && l.slug === slug);
  return lines.at(-1) ?? null; // last line in file order (CLAUDE.md)
}

function decide(body) {
  const spec = DECISIONS[body.gate];
  if (!spec) return { status: 400, error: `unknown gate "${body.gate}"; one of ${Object.keys(DECISIONS).join(', ')}` };
  if (!spec.choices.includes(body.choice)) return { status: 400, error: `choice must be one of ${spec.choices.join(', ')}` };
  const reason = String(body.reason ?? '').trim();
  if (reason.length < 3) return { status: 400, error: 'a reason is required; it becomes the ledger note verbatim' };
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
  const { to_state, note } = spec.line({ ...body, reason });
  const line = { ts: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'), run_id: body.run_id, slug, agent: 'human', agent_version: null, from_state, to_state, note };
  appendFileSync(LEDGER, JSON.stringify(line) + '\n');
  return { status: 201, line };
}

// ---- live updates ---------------------------------------------------------------------------------
const clients = new Set();
let timer = null;
function notify(what) {
  clearTimeout(timer);
  timer = setTimeout(() => { for (const res of clients) res.write(`event: data\ndata: ${JSON.stringify({ changed: what, at: new Date().toISOString() })}\n\n`); }, 300);
}
for (const rel of ['ledger.jsonl', 'run.yaml', 'proposals', 'sites', 'expenses.jsonl']) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) continue;
  try { watch(abs, { recursive: statSync(abs).isDirectory() }, (_e, f) => notify(f ? `${rel}/${f}` : rel)); } catch { /* recursive watch unsupported: ledger still watched */ }
}
if (LEDGER !== join(ROOT, 'ledger.jsonl') && existsSync(LEDGER)) watch(LEDGER, () => notify('ledger'));

// ---- http -----------------------------------------------------------------------------------------
const send = (res, status, body, type = 'application/json') => { res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' }); res.end(typeof body === 'string' ? body : JSON.stringify(body)); };
const safeUnder = (base, rel) => { const p = normalize(join(base, rel)); return p.startsWith(base + sep) || p === base ? p : null; };
function serveFile(res, abs) {
  if (!abs || !existsSync(abs) || statSync(abs).isDirectory()) return send(res, 404, { error: 'not found' });
  res.writeHead(200, { 'content-type': MIME[extname(abs).toLowerCase()] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(abs).pipe(res);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = decodeURIComponent(url.pathname);
  if (req.method === 'GET' && (path === '/' || path === '/index.html')) return serveFile(res, join(DIST, 'index.html'));
  if (req.method === 'GET' && path === '/data.json') return send(res, 200, buildData({ ledgerPath: LEDGER }));
  if (req.method === 'GET' && path === '/events') {
    res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
    res.write(`event: hello\ndata: ${JSON.stringify({ at: new Date().toISOString() })}\n\n`);
    clients.add(res); req.on('close', () => clients.delete(res)); return;
  }
  if (req.method === 'GET' && path.startsWith('/files/')) {
    const rel = path.slice('/files/'.length);
    if (!FILE_PREFIXES.some((p) => rel.startsWith(p))) return send(res, 403, { error: 'not a readable prefix' });
    return serveFile(res, safeUnder(ROOT, rel));
  }
  if (req.method === 'GET' && path === '/gates') return send(res, 200, { gates: buildData({ ledgerPath: LEDGER }).gates, decisions: Object.fromEntries(Object.entries(DECISIONS).map(([k, v]) => [k, { from: v.from, choices: v.choices }])) });
  if (req.method === 'POST' && path === '/decide') {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64_000) req.destroy(); });
    req.on('end', () => {
      let body; try { body = JSON.parse(raw); } catch { return send(res, 400, { error: 'body must be JSON' }); }
      const out = decide(body);
      if (out.status === 201) notify('decision');
      return send(res, out.status, out);
    });
    return;
  }
  if (req.method === 'GET') return serveFile(res, safeUnder(DIST, path.slice(1)));
  send(res, 405, { error: 'method not allowed' });
});

server.listen(PORT, HOST, () => console.log(`dashboard server on http://${HOST}:${PORT}  dist=${DIST}  ledger=${LEDGER}`));
