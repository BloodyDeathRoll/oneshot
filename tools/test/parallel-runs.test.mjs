// tools/test/parallel-runs.test.mjs — parallel runs (docs/team.md): which run a session gets
// (tools/run.mjs), the run layer of the prompt (tools/prompt.mjs), and the merge with origin/main
// (tools/origin.mjs).
//
//   npm test
//
// run.mjs and origin.mjs resolve the repo from their own location, so each test copies them into a
// throwaway git repo (with a bare "origin") and imports the copies from there.

import assert from 'node:assert/strict';
import { test, after } from 'node:test';
import { mkdtempSync, mkdirSync, cpSync, writeFileSync, rmSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const TOOLS = join(dirname(fileURLToPath(import.meta.url)), '..');
const tmp = [];
after(() => { for (const d of tmp) rmSync(d, { recursive: true, force: true }); });

const git = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const runFile = (id, operator, status = 'active') => `run_id: ${id}\noperator: ${operator}\nstatus: ${status}\nmode: test\n`;

// A repo with tools/{run,team,origin}.mjs, team.json and the given runs/ files.
function fixture(runs = {}) {
  const root = mkdtempSync(join(tmpdir(), 'oneshot-runs-'));
  tmp.push(root);
  mkdirSync(join(root, 'tools'));
  for (const f of ['run.mjs', 'team.mjs', 'origin.mjs']) cpSync(join(TOOLS, f), join(root, 'tools', f));
  writeFileSync(join(root, 'team.json'), JSON.stringify({ operators: { shahar: { name: 'Shahar', git_emails: [], git_names: [] }, alon: { name: 'Alon', git_emails: [], git_names: [] } } }));
  mkdirSync(join(root, 'runs'));
  for (const [id, text] of Object.entries(runs)) writeFileSync(join(root, 'runs', `${id}.yaml`), text);
  return root;
}
const load = (root, mod) => import(pathToFileURL(join(root, 'tools', mod)).href + `?${Math.random()}`);

// ONESHOT_RUN is read at call time; every test that sets it puts the old value back.
function withRunEnv(value, fn) {
  const old = process.env.ONESHOT_RUN;
  if (value == null) delete process.env.ONESHOT_RUN; else process.env.ONESHOT_RUN = value;
  try { return fn(); } finally { if (old == null) delete process.env.ONESHOT_RUN; else process.env.ONESHOT_RUN = old; }
}

// ---- tools/run.mjs --------------------------------------------------------------------------------

test('each operator gets their own active run', async () => {
  const root = fixture({ 'r-shahar': runFile('r-shahar', 'shahar'), 'r-alon': runFile('r-alon', 'alon') });
  const { currentRun } = await load(root, 'run.mjs');
  withRunEnv(null, () => {
    assert.equal(currentRun({ operator: 'shahar' }).run_id, 'r-shahar');
    assert.equal(currentRun({ operator: 'alon' }).run_id, 'r-alon');
    assert.equal(currentRun({ operator: 'alon' }).file, 'runs/r-alon.yaml');
  });
});

test('a run file without packs is lk / surf / outbound; one that names them keeps them', async () => {
  const root = fixture({
    old: runFile('old', 'shahar'),
    il: runFile('il', 'alon') + 'market: il\nvertical: brand_design   # a comment\nengagement: inbound\n',
  });
  const { listRuns } = await load(root, 'run.mjs');
  const [il, old] = listRuns();
  assert.deepEqual([old.market, old.vertical, old.engagement], ['lk', 'surf', 'outbound']);
  assert.deepEqual([il.market, il.vertical, il.engagement], ['il', 'brand_design', 'inbound']);
});

test('closed runs are ignored', async () => {
  const root = fixture({ old: runFile('old', 'shahar', 'closed'), now: runFile('now', 'shahar') });
  const { currentRun } = await load(root, 'run.mjs');
  withRunEnv(null, () => assert.equal(currentRun({ operator: 'shahar' }).run_id, 'now'));
});

test('no active run stops, and names the active runs', async () => {
  const root = fixture({ 'r-shahar': runFile('r-shahar', 'shahar') });
  const { currentRun } = await load(root, 'run.mjs');
  withRunEnv(null, () => assert.throws(() => currentRun({ operator: 'alon' }), /alon has no active run \(active: r-shahar \(shahar\)\)/));
});

test('two active runs for one operator stop: never a guess', async () => {
  const root = fixture({ a: runFile('a', 'shahar'), b: runFile('b', 'shahar') });
  const { currentRun } = await load(root, 'run.mjs');
  withRunEnv(null, () => assert.throws(() => currentRun({ operator: 'shahar' }), /2 active runs \(a, b\): set ONESHOT_RUN/));
});

test('ONESHOT_RUN picks the run, closed or someone else\'s included', async () => {
  const root = fixture({ a: runFile('a', 'shahar'), b: runFile('b', 'shahar'), c: runFile('c', 'alon', 'closed') });
  const { currentRun } = await load(root, 'run.mjs');
  withRunEnv('b', () => assert.equal(currentRun({ operator: 'shahar' }).run_id, 'b'));
  withRunEnv('c', () => assert.equal(currentRun({ operator: 'shahar' }).run_id, 'c'));
  withRunEnv('nope', () => assert.throws(() => currentRun({ operator: 'shahar' }), /ONESHOT_RUN=nope: no runs\/nope\.yaml/));
});

test('a run_id that does not match its file name is refused', async () => {
  const root = fixture({ 'r-1': runFile('r-2', 'shahar') });
  const { listRuns } = await load(root, 'run.mjs');
  assert.throws(() => listRuns(), /runs\/r-1\.yaml: run_id "r-2" must match the file name/);
});

test('a run file without status is active', async () => {
  const root = fixture({ r: 'run_id: r\noperator: alon\n' });
  const { listRuns } = await load(root, 'run.mjs');
  assert.deepEqual(listRuns().map((r) => [r.run_id, r.operator, r.status]), [['r', 'alon', 'active']]);
});

test('CLI: prints the run, lists runs, exits 1 when there is none', async () => {
  const root = fixture({ r: runFile('r', 'shahar'), s: runFile('s', 'alon', 'closed') });
  const env = { ...process.env, ONESHOT_OPERATOR: 'shahar' };
  delete env.ONESHOT_RUN;
  const cli = (...a) => execFileSync('node', ['tools/run.mjs', ...a], { cwd: root, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  assert.equal(cli(), 'r\truns/r.yaml\n');
  assert.equal(cli('list'), 'r\tshahar\tactive\ns\talon\tclosed\n');
  assert.throws(() => execFileSync('node', ['tools/run.mjs'], { cwd: root, env: { ...env, ONESHOT_OPERATOR: 'alon' }, stdio: ['ignore', 'pipe', 'pipe'] }),
    (e) => e.status === 1 && /^run: alon has no active run/.test(String(e.stderr)));
});

// ---- tools/prompt.mjs: the run layer ---------------------------------------------------------------

test('the prompt\'s run.yaml layer is the session\'s run file, or missing with the reason', async () => {
  const { layersFor, RUN_LAYER } = await import(pathToFileURL(join(TOOLS, 'prompt.mjs')).href);
  const { listRuns } = await import(pathToFileURL(join(TOOLS, 'run.mjs')).href);
  const any = listRuns()[0];
  assert.ok(any, 'the repo has at least one run file');
  withRunEnv(any.run_id, () => {
    const layer = layersFor('scout').find((l) => l.rel === RUN_LAYER);
    assert.equal(layer.src, any.file);
    assert.equal(layer.text, any.text);
  });
  withRunEnv('no-such-run', () => {
    const layer = layersFor('scout').find((l) => l.rel === RUN_LAYER);
    assert.equal(layer.missing, true);
    assert.match(layer.why, /ONESHOT_RUN=no-such-run/);
  });
});

// ---- tools/origin.mjs ---------------------------------------------------------------------------------

// work/ is a clone of origin.git; other/ is the other operator's clone, which pushes to main.
function twoClones() {
  const base = fixture();
  const bare = join(base, 'origin.git');
  git(base, 'init', '-q', '--bare', '-b', 'main', bare);
  const clone = (name) => {
    const dir = join(base, name);
    git(base, 'clone', '-q', bare, dir);
    git(dir, 'config', 'user.email', `${name}@test`); git(dir, 'config', 'user.name', name);
    git(dir, 'checkout', '-q', '-B', 'main');
    return dir;
  };
  const other = clone('other');
  writeFileSync(join(other, 'README'), 'x\n');
  git(other, 'add', '.'); git(other, 'commit', '-q', '-m', 'init'); git(other, 'push', '-q', 'origin', 'main');
  const work = clone('work');
  mkdirSync(join(work, 'tools'));
  for (const f of ['run.mjs', 'team.mjs', 'origin.mjs']) cpSync(join(TOOLS, f), join(work, 'tools', f));
  const push = (rel, text) => {
    git(other, 'pull', '-q', 'origin', 'main');
    mkdirSync(dirname(join(other, rel)), { recursive: true });
    appendFileSync(join(other, rel), text);
    git(other, 'add', '.'); git(other, 'commit', '-q', '-m', rel); git(other, 'push', '-q', 'origin', 'main');
  };
  return { work, other, push };
}
const jl = (...lines) => lines.map((l) => JSON.stringify(l) + '\n').join('');

test('fetch: true when origin/main moved, false when it did not', async () => {
  const { work, push } = twoClones();
  const o = await load(work, 'origin.mjs');
  assert.equal(await o.fetch(), false);
  push('ledger.jsonl', jl({ ts: '2026-10-01T00:00:00Z', slug: 'x' }));
  assert.equal(await o.fetch(), true);
  assert.equal(await o.fetch(), false);
  assert.equal(o.showMain('ledger.jsonl'), jl({ ts: '2026-10-01T00:00:00Z', slug: 'x' }));
  assert.equal(o.showMain('missing.jsonl'), null);
});

test('merged jsonl: local order kept, main-only lines interleaved by ts, shared lines once', async () => {
  const { work, push } = twoClones();
  const shared = { ts: '2026-10-01T01:00:00Z', run_id: 'a', slug: 's', to_state: 'scored' };
  // local: one line out of ts order on purpose; the file order is the state order and must stay
  writeFileSync(join(work, 'ledger.jsonl'), jl(shared, { ts: '2026-10-01T05:00:00Z', run_id: 'a', slug: 's', to_state: 'shortlisted' }, { ts: '2026-10-01T04:00:00Z', run_id: 'a', slug: 's', to_state: 'approved' }));
  push('ledger.jsonl', jl(shared, { ts: '2026-10-01T02:00:00Z', run_id: 'b', slug: 't', to_state: 'scored' }, { ts: '2026-10-01T09:00:00Z', run_id: 'b', slug: 't', to_state: 'shortlisted' }));
  const o = await load(work, 'origin.mjs');
  await o.fetch();
  const merged = o.readJsonlMerged('ledger.jsonl').map((l) => `${l.run_id}:${l.to_state}`);
  assert.deepEqual(merged, ['a:scored', 'b:scored', 'a:shortlisted', 'a:approved', 'b:shortlisted']);
});

test('merged jsonl: no origin/main yet means this checkout only', async () => {
  const root = fixture();
  git(root, 'init', '-q');
  writeFileSync(join(root, 'activity.jsonl'), jl({ ts: '2026-10-01T00:00:00Z', kind: 'work' }));
  const o = await load(root, 'origin.mjs');
  assert.equal(o.mainSha(), null);
  assert.deepEqual(o.readJsonlMerged('activity.jsonl'), [{ ts: '2026-10-01T00:00:00Z', kind: 'work' }]);
  assert.deepEqual(o.lsMain('runs'), []);
});

test('lsMain lists the other operator\'s merged run files', async () => {
  const { work, push } = twoClones();
  push('runs/r-alon.yaml', runFile('r-alon', 'alon'));
  const o = await load(work, 'origin.mjs');
  await o.fetch();
  assert.deepEqual(o.lsMain('runs'), ['r-alon.yaml']);
  assert.equal(o.showMain('runs/r-alon.yaml'), runFile('r-alon', 'alon'));
});
