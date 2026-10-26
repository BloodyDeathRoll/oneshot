// dashboard/live.mjs — the Live strip's data: what each operator's session is doing right now
// (docs/heartbeat.md). Fed by tools/heartbeat.mjs over POST /status with the box key; never in git.
//
// The store is one JSON file outside the repo (the dashboard box's state dir, or ~/.oneshot locally):
// the current line per operator and the last RECENT events, nothing older than KEEP_H hours.
// A local dashboard with ~/.oneshot/box.json pulls the same picture from the box (GET /live) so both
// operators see one Live strip wherever they open the dashboard.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { timingSafeEqual } from 'node:crypto';
import { dirname } from 'node:path';

export const KINDS = new Set(['session', 'station_start', 'station_end', 'alive', 'idle', 'session_end']);
export const STALE_MIN = 10;      // no heartbeat for this long = "probably stopped"
export const KEEP_H = 24;
export const RECENT = 200;
const STR = ['operator', 'kind', 'run_id', 'slug', 'station', 'agent', 'version', 'note', 'session', 'agent_id', 'tool_id', 'branch', 'host', 'ts'];

// Checks a posted line and keeps only the fields the strip uses, clipped. Throws on a bad one.
export function validate(body, operators) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw Object.assign(new Error('body must be a JSON object'), { status: 400 });
  if (!operators[body.operator]) throw Object.assign(new Error(`operator must be one of ${Object.keys(operators).join(', ')}`), { status: 400 });
  if (!KINDS.has(body.kind)) throw Object.assign(new Error(`kind must be one of ${[...KINDS].join(', ')}`), { status: 400 });
  const out = {};
  for (const k of STR) if (body[k] != null) out[k] = String(body[k]).slice(0, k === 'note' ? 400 : 120);
  if (!out.ts || Number.isNaN(Date.parse(out.ts))) out.ts = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  if (typeof body.run_on_main === 'boolean') out.run_on_main = body.run_on_main;
  return out;
}

export function bearerOk(header, key) {
  if (!key || typeof header !== 'string') return false;
  const m = header.match(/^Bearer\s+(\S+)$/i); if (!m) return false;
  const a = Buffer.from(m[1]), b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

export class LiveStore {
  constructor(file) { this.file = file; this.data = this.#read(); }
  #read() { try { return existsSync(this.file) ? JSON.parse(readFileSync(this.file, 'utf8')) : { operators: {}, events: [] }; } catch { return { operators: {}, events: [] }; } }
  #write() { try { mkdirSync(dirname(this.file), { recursive: true }); writeFileSync(this.file, JSON.stringify(this.data)); } catch { /* a read-only disk loses history, not the request */ } }

  add(line) {
    const cur = this.data.operators[line.operator] ?? {};
    const next = { ...cur, last_seen: line.ts, last_kind: line.kind, host: line.host ?? cur.host ?? null, branch: line.branch ?? cur.branch ?? null, session: line.session ?? cur.session ?? null };
    if (line.run_id) { next.run_id = line.run_id; next.run_on_main = line.run_on_main ?? cur.run_on_main ?? null; }
    if (line.kind === 'station_start') next.station = { slug: line.slug ?? null, station: line.station ?? null, agent: line.agent ?? null, version: line.version ?? null, note: line.note ?? null, started: line.ts, tool_id: line.tool_id ?? null };
    else if (line.kind === 'station_end') { next.last_station = { ...(next.station?.tool_id && line.tool_id && next.station.tool_id !== line.tool_id ? {} : next.station), slug: line.slug ?? next.station?.slug ?? null, station: line.station ?? next.station?.station ?? null, agent: line.agent ?? next.station?.agent ?? null, ended: line.ts, note: line.note ?? null }; next.station = null; }
    else if (line.kind === 'idle' || line.kind === 'session_end') next.station = null;
    if (line.kind === 'session') next.session_started = line.ts;
    this.data.operators[line.operator] = next;
    if (line.kind !== 'alive') this.data.events.push(line);
    const cutoff = new Date(Date.now() - KEEP_H * 3600_000).toISOString();
    this.data.events = this.data.events.filter((e) => e.ts >= cutoff).slice(-RECENT);
    this.#write();
    return next;
  }

  // The picture a page renders: per operator, current state with a staleness flag, plus recent events.
  snapshot(now = Date.now()) {
    const operators = {};
    for (const [op, s] of Object.entries(this.data.operators)) {
      const age = s.last_seen ? Math.round((now - Date.parse(s.last_seen)) / 60_000) : null;
      const stale = age == null || age >= STALE_MIN;
      const state = s.last_kind === 'session_end' ? 'offline' : stale ? 'stale' : s.station ? 'running' : s.last_kind === 'idle' ? 'idle' : 'active';
      operators[op] = { ...s, age_min: age, state };
    }
    return { at: new Date(now).toISOString(), stale_after_min: STALE_MIN, operators, events: this.data.events.slice(-40).reverse() };
  }

  replace(snapshot) { if (snapshot && snapshot.operators) { this.pulled = snapshot; } }
  current() { return this.pulled ?? this.snapshot(); }
}

// A local dashboard pulls the box's snapshot (GET /live with the box key); null when unreachable.
export async function pull(cfg, { timeoutMs = 4000 } = {}) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(`${cfg.url}/live`, { headers: { authorization: `Bearer ${cfg.key}` }, signal: ac.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; } finally { clearTimeout(t); }
}
