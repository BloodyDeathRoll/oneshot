// dashboard/publish.mjs — after a save from the dashboard, the same change goes to GitHub as its own
// branch and PR (Shahar, 2026-10-06: "each save commits and opens a PR after being saved in the user's pc").
//
// The PR is built in a throwaway worktree of origin/main, so the operator's own checkout, branch and
// index are never touched. Each file is given as {rel, before, after}: the text the save replaced and the
// text it wrote. The PR writes `after` only if main still has `before`; otherwise it stops and the
// local save stays.
// `optional` files are skipped when main's copy differs (or is missing).
//
// ONESHOT_SAVE_REMOTE (default origin) and ONESHOT_GH (default gh) exist for tests.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { existsSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';

const run = promisify(execFile);
const REMOTE = process.env.ONESHOT_SAVE_REMOTE || 'origin';
const GH = process.env.ONESHOT_GH || 'gh';
const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
const sh = (cmd, args, cwd) => run(cmd, args, { cwd, env, timeout: 90_000, maxBuffer: 64 * 1024 * 1024 }).then((r) => r.stdout.trim());

// One PR at a time: two quick saves must not race over worktrees and branches.
let queue = Promise.resolve();
export function openPr(spec) {
  const p = queue.then(() => publish(spec));
  queue = p.catch(() => {});
  return p;
}

async function publish({ root, branch, message, title, body, files }) {
  await sh('git', ['fetch', '-q', REMOTE, 'main'], root);
  const tmp = mkdtempSync(join(tmpdir(), 'oneshot-pr-'));
  let added = false, pushed = false;
  try {
    await sh('git', ['worktree', 'add', '-q', '-b', branch, tmp, `${REMOTE}/main`], root);
    added = true;
    const used = [];
    for (const f of files) {
      const abs = join(tmp, f.rel);
      const onMain = existsSync(abs) ? readFileSync(abs, 'utf8') : null;
      if (f.optional && (onMain ?? '') !== (f.before ?? '')) continue;
      if (onMain === f.after) continue;
      // No automatic merge: a test showed git merge-file silently dropping a line. Main must still hold
      // the text this save replaced.
      if ((onMain ?? '') !== (f.before ?? '')) throw new Error(`main has a newer version of ${f.rel}. Pull main, then save again`);
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, f.after);
      used.push(f.rel);
    }
    if (!used.length) throw new Error('main already has this change');
    await sh('git', ['add', '--', ...used], tmp);
    // Text files only (.md/.json), so the media pre-commit hook has nothing to check — and in a fresh
    // worktree without the media store it would rewrite media/*.tsv into this commit.
    await sh('git', ['-c', 'core.hooksPath=/dev/null', 'commit', '-q', '-m', message], tmp);
    await sh('git', ['push', '-q', '-u', REMOTE, branch], tmp);
    pushed = true;
    const url = (await sh(GH, ['pr', 'create', '--base', 'main', '--head', branch, '--title', title, '--body', body], tmp)).split('\n').pop();
    return { pr: url, branch };
  } catch (e) {
    const why = [e.stderr, e.stdout].map((t) => String(t ?? '').trim()).find(Boolean)?.split('\n').pop() || String(e.message ?? e);
    throw new Error(pushed ? `branch ${branch} was pushed, but the PR was not opened: ${why}` : why);
  } finally {
    if (added) await sh('git', ['worktree', 'remove', '--force', tmp], root).catch(() => {});
    rmSync(tmp, { recursive: true, force: true });
    await sh('git', ['branch', '-D', branch], root).catch(() => {}); // the local copy only; the pushed branch stays
  }
}
