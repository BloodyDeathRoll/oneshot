#!/usr/bin/env node
// infra/dashboard/sync.mjs — keeps the box's checkout on origin/main (DASH_REF), every 2 minutes
// (oneshot-dashboard-sync.timer). The online dashboard reads sites/, agents/, proposals/ from this
// checkout, so it must follow what the operators merge.
//
// The checkout is never worked in: its only local changes are the dashboard's own saves (a ledger or
// activity line, a custom.md, a suggested tweak), each of which also went to main as a PR. It moves to
// the new main only when every local change is already there — an appended line is on main, a file is
// identical to main's. Until the PR is merged it waits, so a save is never lost. When code the server
// runs changed, it reinstalls if needed and restarts the server.
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REF = process.env.DASH_REF || 'origin/main';
const APPEND_ONLY = new Set(['ledger.jsonl', 'activity.jsonl', 'usage.jsonl', 'expenses.jsonl', 'revenues.jsonl']);
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256e6, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
const atRef = (rel) => { try { return git('show', `${target}:${rel}`); } catch { return null; } };
const lines = (t) => new Set(t.split('\n').map((l) => l.trim()).filter(Boolean));

git('fetch', '-q', 'origin');
const target = git('rev-parse', REF).trim();
const head = git('rev-parse', 'HEAD').trim();
const dirty = git('status', '--porcelain', '-z', '--untracked-files=all').split('\0').filter(Boolean).map((e) => e.slice(3));
if (head === target && !dirty.length) process.exit(0);

const waiting = dirty.filter((rel) => {
  const main = atRef(rel);
  const local = existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null;
  if (APPEND_ONLY.has(rel)) { const m = lines(main ?? ''); return [...lines(local ?? '')].some((l) => !m.has(l)); }
  return local !== main;
});
if (waiting.length) { console.log(`waiting for main to have: ${waiting.join(', ')}`); process.exit(0); }

const changed = head === target ? [] : git('diff', '--name-only', head, target).split('\n').filter(Boolean);
git('reset', '-q', '--hard', target);
console.log(`checkout at ${target.slice(0, 7)} (${changed.length} files changed)`);
if (changed.some((f) => f === 'package-lock.json' || f === 'package.json')) execFileSync('npm', ['ci', '--silent'], { cwd: ROOT, stdio: 'inherit' });
if (changed.some((f) => /^(dashboard\/[^/]+\.mjs|tools\/[^/]+\.mjs|team\.json|package-lock\.json)$/.test(f))) {
  execFileSync('sudo', ['-n', 'systemctl', 'restart', 'oneshot-dashboard'], { stdio: 'inherit' });
  console.log('server restarted');
}
