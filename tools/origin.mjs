// tools/origin.mjs — what is merged on origin/main, for the dashboard (docs/team.md, "Parallel runs").
//
// Each operator runs on their own machine and branch; the shared truth is what has been merged to
// main. The dashboard shows both: this checkout's lines (work not merged yet) plus origin/main's
// (everything either operator merged). It reads origin/main from the local git objects; `fetch()`
// refreshes them. Nothing here writes to the working tree.

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, execFile } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const MAIN = 'origin/main';
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024 });

export function mainSha() { try { return git('rev-parse', '--verify', '-q', MAIN).trim(); } catch { return null; } }

// git fetch origin main, without blocking the caller; resolves true when origin/main moved. Never
// prompts for credentials; gives up after 20 s.
export function fetch() {
  const before = mainSha();
  return new Promise((done) => execFile('git', ['fetch', '-q', 'origin', 'main'], { cwd: ROOT, timeout: 20_000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } },
    (err) => done(!err && mainSha() !== before)));
}

// A file as it is on origin/main, or null (no remote, or not there).
export function showMain(rel) { try { return git('show', `${MAIN}:${rel}`); } catch { return null; } }

// File names under a directory on origin/main.
export function lsMain(dir) { try { return git('ls-tree', '--name-only', `${MAIN}:${dir}`).split('\n').filter(Boolean); } catch { return []; } }

// An append-only .jsonl file: this checkout's lines plus origin/main's lines that are not here,
// one copy of each (by exact text). Each side keeps its own file order ("the last line is the
// state", CLAUDE.md); the two are interleaved by timestamp, like a merge step.
// `abs` overrides the local path (the dashboard's --ledger).
export function readJsonlMerged(rel, abs = join(ROOT, rel)) {
  const lines = (text) => text.split('\n').map((l) => l.trim()).filter(Boolean);
  const local = lines(existsSync(abs) ? readFileSync(abs, 'utf8') : '');
  const have = new Set(local);
  const theirs = [...new Set(lines(showMain(rel) ?? ''))].filter((l) => !have.has(l));
  const parse = (l) => { try { return JSON.parse(l); } catch (e) { throw new Error(`${rel}: a line is not JSON: ${e.message}`); } };
  const a = local.map(parse), b = theirs.map(parse), out = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && (a[i].ts ?? '') <= (b[j].ts ?? ''))) out.push(a[i++]);
    else out.push(b[j++]);
  }
  return out;
}
