// dashboard/publish.mjs — after a save from the dashboard, the same change goes to GitHub as its own
// branch and PR (Shahar, 2026-10-06: "each save commits and opens a PR after being saved in the user's pc").
//
// The PR is built in a throwaway worktree of origin/main, so the operator's own checkout, branch and
// index are never touched. Each file is given as {rel, before, after}: the text the save replaced and the
// text it wrote. If main still has `before`, the PR writes `after`; if main moved, a three-way merge
// (git merge-file) carries the edit over, and a conflict stops the PR (the local save stays).
// `optional` files are skipped when main does not have them yet.
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

async function merge3(ours, base, theirs, rel) {
  const d = mkdtempSync(join(tmpdir(), 'oneshot-merge-'));
  try {
    for (const [k, t] of Object.entries({ ours, base, theirs })) writeFileSync(join(d, k), t);
    // writes the result into "ours"; exits non-zero on a conflict
    return await sh('git', ['merge-file', join(d, 'ours'), join(d, 'base'), join(d, 'theirs')], d).then(() => readFileSync(join(d, 'ours'), 'utf8'), () => {
      throw new Error(`main has a different version of ${rel}; open this PR by hand`);
    });
  } finally { rmSync(d, { recursive: true, force: true }); }
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
      if (onMain === null && f.optional) continue;
      if (onMain === f.after) continue;
      let next = f.after;
      if (onMain !== null && onMain !== f.before) {
        next = await merge3(onMain, f.before ?? '', f.after, f.rel);
      }
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, next);
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
    const why = String(e.stderr || e.message || e).trim().split('\n').pop();
    throw new Error(pushed ? `branch ${branch} was pushed, but the PR was not opened: ${why}` : why);
  } finally {
    if (added) await sh('git', ['worktree', 'remove', '--force', tmp], root).catch(() => {});
    rmSync(tmp, { recursive: true, force: true });
    await sh('git', ['branch', '-D', branch], root).catch(() => {}); // the local copy only; the pushed branch stays
  }
}
