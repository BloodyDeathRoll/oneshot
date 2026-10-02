#!/usr/bin/env node
// tools/team.mjs — who is working on what (docs/team.md).
//
// Two operators share one repo. The ledger records state changes; activity.jsonl records the work
// between them (a font swap, a hero rework, a re-cut clip) and the assignments, so whoever picks a
// business up next sees what was done, by whom, and what is still open.
//
//   node tools/team.mjs whoami
//   node tools/team.mjs log <slug> "<what changed>" [--files a,b]   # one line of work
//   node tools/team.mjs assign <slug> "<task>" [--to <operator>]    # opens an assignment (default: you)
//   node tools/team.mjs done <id> ["<note>"]                         # closes it
//   node tools/team.mjs status [slug]                                # open assignments + last worked
//
// Identity: ONESHOT_OPERATOR, else git user.email, else git user.name, matched in team.json.

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const ACTIVITY = join(ROOT, 'activity.jsonl');

export function team() {
  return JSON.parse(readFileSync(join(ROOT, 'team.json'), 'utf8')).operators;
}

const git = (...a) => { try { return execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { return ''; } };

// Operator id for a git author (email or name), or null when team.json does not know them.
export function operatorFor({ email, name } = {}, ops = team()) {
  for (const [id, o] of Object.entries(ops)) if (email && (o.git_emails ?? []).includes(email)) return id;
  for (const [id, o] of Object.entries(ops)) if (name && (o.git_names ?? []).includes(name)) return id;
  return null;
}

export function whoami() {
  const ops = team();
  const env = process.env.ONESHOT_OPERATOR;
  if (env) { if (!ops[env]) throw new Error(`ONESHOT_OPERATOR=${env} is not in team.json`); return env; }
  const id = operatorFor({ email: git('config', 'user.email'), name: git('config', 'user.name') }, ops);
  if (!id) throw new Error('unknown operator: set ONESHOT_OPERATOR or add your git user.email to team.json');
  return id;
}

export function readActivity(path = ACTIVITY) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').split('\n').filter((l) => l.trim()).map((l, i) => {
    try { return JSON.parse(l); } catch (e) { throw new Error(`activity.jsonl:${i + 1} is not JSON: ${e.message}`); }
  });
}

// Assignments with their state: open until a `done` line names the id.
export function assignments(lines = readActivity()) {
  const done = new Map(lines.filter((l) => l.kind === 'done').map((l) => [l.id, l]));
  return lines.filter((l) => l.kind === 'assign').map((a) => ({
    id: a.id, slug: a.slug, task: a.task, to: a.to, by: a.operator, ts: a.ts,
    open: !done.has(a.id), done_ts: done.get(a.id)?.ts ?? null, done_by: done.get(a.id)?.operator ?? null, done_note: done.get(a.id)?.note ?? null,
  }));
}

const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const append = (line) => appendFileSync(ACTIVITY, JSON.stringify(line) + '\n');

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [cmd, ...rest] = process.argv.slice(2);
  const flag = (k) => { const i = rest.indexOf(`--${k}`); if (i < 0) return null; const v = rest[i + 1]; rest.splice(i, 2); return v; };
  const usage = () => { console.error(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(7, 13).map((l) => l.slice(3)).join('\n')); process.exit(2); };
  try {
    if (cmd === 'whoami') { const id = whoami(); console.log(`${id} (${team()[id].name})`); }
    else if (cmd === 'log') {
      const files = flag('files'); const [slug, what] = rest;
      if (!slug || !what) usage();
      append({ ts: now(), operator: whoami(), slug, kind: 'work', note: what, ...(files ? { files: files.split(',') } : {}) });
      console.log('logged');
    } else if (cmd === 'assign') {
      const to = flag('to'); const [slug, task] = rest;
      if (!slug || !task) usage();
      const me = whoami();
      if (to && !team()[to]) throw new Error(`--to ${to} is not in team.json`);
      const id = `a-${now().replace(/[-:TZ]/g, '').slice(0, 12)}-${Math.random().toString(36).slice(2, 6)}`;
      append({ ts: now(), operator: me, slug, kind: 'assign', id, to: to ?? me, task });
      console.log(id);
    } else if (cmd === 'done') {
      const [id, note] = rest;
      const a = assignments().find((x) => x.id === id);
      if (!a) throw new Error(`no assignment ${id}`);
      if (!a.open) throw new Error(`${id} is already done (${a.done_by}, ${a.done_ts})`);
      append({ ts: now(), operator: whoami(), slug: a.slug, kind: 'done', id, note: note ?? '' });
      console.log('done');
    } else if (cmd === 'status') {
      const [slug] = rest;
      const lines = readActivity().filter((l) => !slug || l.slug === slug);
      const open = assignments(lines).filter((a) => a.open);
      console.log(open.length ? 'Open assignments:' : 'No open assignments.');
      for (const a of open) console.log(`  ${a.id}  ${a.slug}  → ${a.to}: ${a.task}  (by ${a.by}, ${a.ts.slice(0, 10)})`);
      const last = new Map();
      for (const l of lines) last.set(l.slug, l);
      if (last.size) console.log('Last worked:');
      for (const [s, l] of last) console.log(`  ${s}  ${l.operator}  ${l.ts.slice(0, 16).replace('T', ' ')}  ${l.kind}: ${l.note || l.task || ''}`);
    } else usage();
  } catch (e) { console.error(e.message); process.exit(1); }
}
