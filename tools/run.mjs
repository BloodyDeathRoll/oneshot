#!/usr/bin/env node
// tools/run.mjs — which run this session works on (docs/team.md, "Parallel runs").
//
// Each run is one file, runs/<run_id>.yaml, with an `operator` (team.json) and a `status`
// (active | closed). Several runs can be active at once, one per operator and machine; a session
// works on exactly one of them:
//   1. ONESHOT_RUN=<run_id>, if set (must name a file in runs/);
//   2. else the one active run whose `operator` is this session's (tools/team.mjs whoami);
//   3. else it stops: zero or several candidates is a question for the human, never a guess.
//
//   node tools/run.mjs           # this session's run: "<run_id>\truns/<run_id>.yaml"
//   node tools/run.mjs list      # every run: id, operator, status

import { readFileSync, readdirSync, existsSync, realpathSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { whoami } from './team.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const RUNS_DIR = 'runs';

const scalar = (y, k) => (y.match(new RegExp(`^${k}:\\s*([^#\\n]+)`, 'm'))?.[1] ?? '').trim().replace(/^["']|["']$/g, '');

// Every run file: { run_id, operator, status, file, text }. The file name is the run_id.
export function listRuns() {
  const dir = join(ROOT, RUNS_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort().map((f) => {
    const text = readFileSync(join(dir, f), 'utf8');
    const run = { run_id: scalar(text, 'run_id'), operator: scalar(text, 'operator') || null, status: scalar(text, 'status') || 'active', file: `${RUNS_DIR}/${f}`, text };
    if (run.run_id !== f.slice(0, -5)) throw new Error(`${run.file}: run_id "${run.run_id}" must match the file name`);
    return run;
  });
}

export function currentRun({ operator } = {}) {
  const runs = listRuns();
  const env = process.env.ONESHOT_RUN;
  if (env) {
    const r = runs.find((x) => x.run_id === env);
    if (!r) throw new Error(`ONESHOT_RUN=${env}: no ${RUNS_DIR}/${env}.yaml`);
    return r;
  }
  const op = operator ?? whoami();
  const mine = runs.filter((r) => r.status === 'active' && r.operator === op);
  if (mine.length === 1) return mine[0];
  const active = runs.filter((r) => r.status === 'active').map((r) => `${r.run_id} (${r.operator ?? 'no operator'})`).join(', ') || 'none';
  throw new Error(mine.length
    ? `${op} has ${mine.length} active runs (${mine.map((r) => r.run_id).join(', ')}): set ONESHOT_RUN=<run_id>`
    : `${op} has no active run (active: ${active}): create ${RUNS_DIR}/<run_id>.yaml with operator: ${op}, or set ONESHOT_RUN=<run_id>`);
}

// realpath: the module URL is the real path, argv[1] may run through a symlink (macOS /var → /private/var)
if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(process.argv[1])) {
  try {
    if (process.argv[2] === 'list') {
      for (const r of listRuns()) console.log(`${r.run_id}\t${r.operator ?? '-'}\t${r.status}`);
    } else {
      const r = currentRun();
      console.log(`${r.run_id}\t${r.file}`);
    }
  } catch (e) { console.error(`run: ${e.message}`); process.exit(1); }
}
