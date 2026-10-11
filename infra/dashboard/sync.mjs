#!/usr/bin/env node
// infra/dashboard/sync.mjs — keeps the box's checkout on origin/main (DASH_REF), every 2 minutes
// (oneshot-dashboard-sync.timer). The online dashboard reads sites/, agents/, proposals/ from this
// checkout, so it must follow what the operators merge.
//
// The checkout is never worked in: its only local changes are the dashboard's own saves (a ledger or
// activity line, a custom.md, a suggested tweak), each of which also went to main as a PR. It moves to
// the new main once every local change is already there — an appended line is on main, a file is
// identical to main's — so a save is not dropped while its PR waits. dashboard/tweaks.json (the page's
// summary, optional in PRs) never holds it back. A save whose PR is never merged (closed, or a PR that
// failed to open) must not freeze the checkout: after WAIT_H hours it gives up waiting, writes the
// unsynced changes to a patch outside the repo (STATE_DIR/unsynced-<time>.patch) and moves on.
//
// After moving, it reinstalls and restarts the server when their inputs changed. What was last applied
// in full is kept in STATE_DIR/sync.json, so a failed `npm ci` or restart is retried on the next run.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const REF = process.env.DASH_REF || 'origin/main';
const WAIT_H = Number(process.env.DASH_WAIT_H || 6);
const STATE_DIR = process.env.DASH_STATE_DIR || join(ROOT, '..', 'dashboard-state');
const STATE = join(STATE_DIR, 'sync.json');
const APPEND_ONLY = new Set(['ledger.jsonl', 'activity.jsonl', 'usage.jsonl', 'expenses.jsonl', 'revenues.jsonl']);
const NEVER_BLOCKS = new Set(['dashboard/tweaks.json']);
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256e6, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } });
const lines = (t) => new Set(t.split('\n').map((l) => l.trim()).filter(Boolean));
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z');

mkdirSync(STATE_DIR, { recursive: true });
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : {};
const save = () => writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n');

git('fetch', '-q', 'origin');
const target = git('rev-parse', REF).trim();
const head = git('rev-parse', 'HEAD').trim();
state.applied ??= head; // first run: what is checked out is what the server runs
const atRef = (rel) => { try { return git('show', `${target}:${rel}`); } catch { return null; } };
const dirty = git('status', '--porcelain', '-z', '--untracked-files=all').split('\0').filter(Boolean).map((e) => e.slice(3));

if (head !== target || dirty.length) {
  const waiting = dirty.filter((rel) => {
    if (NEVER_BLOCKS.has(rel)) return false;
    const main = atRef(rel);
    const local = existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), 'utf8') : null;
    if (APPEND_ONLY.has(rel)) { const m = lines(main ?? ''); return [...lines(local ?? '')].some((l) => !m.has(l)); }
    return local !== main;
  });
  if (waiting.length) {
    state.waiting_since ??= now();
    const hours = (Date.now() - Date.parse(state.waiting_since)) / 3600e3;
    if (hours < WAIT_H) { save(); console.log(`waiting for main to have: ${waiting.join(', ')} (since ${state.waiting_since})`); process.exit(0); }
    // Give up waiting, but keep every unsynced change: tracked diffs plus untracked files, as one patch.
    const untracked = git('ls-files', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean);
    if (untracked.length) git('add', '--intent-to-add', '--', ...untracked);
    const patch = join(STATE_DIR, `unsynced-${now().replace(/\D/g, '')}.patch`);
    writeFileSync(patch, git('diff', 'HEAD'));
    console.error(`ALERT: waited ${hours.toFixed(1)} h for main to have ${waiting.join(', ')}; their PRs were not merged. Changes kept in ${patch}; moving to ${REF}.`);
  }
  git('reset', '-q', '--hard', target);
  git('clean', '-fdq', '-e', 'node_modules'); // left-over untracked saves are in the patch or on main; ignored files (thumbs, media) stay
  delete state.waiting_since;
  save();
  console.log(`checkout at ${target.slice(0, 7)}`);
}

// Reinstall and restart against what the server last ran in full, so a failure is retried next time.
if (state.applied !== target) {
  let changed; try { changed = git('diff', '--name-only', state.applied, target).split('\n').filter(Boolean); } catch { changed = ['package-lock.json']; } // unknown base: redo both
  if (changed.some((f) => f === 'package-lock.json' || f === 'package.json')) execFileSync('npm', ['ci', '--silent'], { cwd: ROOT, stdio: 'inherit' });
  if (changed.some((f) => /^(dashboard\/[^/]+\.mjs|tools\/[^/]+\.mjs|team\.json|package-lock\.json)$/.test(f))) {
    execFileSync('sudo', ['-n', 'systemctl', 'restart', 'oneshot-dashboard'], { stdio: 'inherit' });
    console.log('server restarted');
  }
  state.applied = target;
  save();
}
