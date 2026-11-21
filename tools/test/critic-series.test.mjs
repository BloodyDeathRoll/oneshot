import test from 'node:test';
import assert from 'node:assert/strict';
import { criticSeries } from '../../dashboard/data.mjs';

const line = (ts, to_state, note) => ({ ts, agent: 'critic', to_state, note });

test('a raw total from before rubric 0.3.2 is converted, and a passed line repeating the round is dropped', () => {
  const s = criticSeries([
    line('2026-11-04T10:58:32Z', 'critiqued(2)', 'FAIL round 2. critic d1-7 70.4/75; visual-critic 8/10 pass; experience-critic 8/10 pass'),
    line('2026-11-04T13:07:13Z', 'critiqued(3)', 'Round 3 full: critic d1-7 72.7/75, 0 hard fails. visual-critic 0.2.0 8/10 pass; experience-critic 0.2.0 8/10 pass'),
    line('2026-11-04T13:07:13Z', 'passed', 'PASS: 92.7/100 (>= 85), no hard fail.'),
  ]);
  assert.deepEqual(s.map((c) => [c.kind, c.round, c.verdict, c.score]), [['round', 2, 'FAIL', 86.1], ['round', 3, 'PASS', 88.3]]);
});

test('the "PASS round 1: N (>= 85)" form is read', () => {
  const s = criticSeries([line('2026-11-05T12:13:09Z', 'passed', 'PASS round 1: 96.3 (>= 85), no hard fail.')]);
  assert.deepEqual(s.map((c) => [c.verdict, c.score]), [['PASS', 91.7]]);
});

test('a total before dimension 8 existed, or after rubric 0.3.2 reached main, stays as written', () => {
  const s = criticSeries([
    line('2026-09-22T10:00:00Z', 'passed', 'PASS, 92/100, no hard fails.'),
    line('2026-11-06T10:00:00Z', 'passed', 'PASS 88.3/100, no hard fail.'),
  ]);
  assert.deepEqual(s.map((c) => c.score), [92, 88.3]);
});

test('a round with no score stays in the series; an unscored passed line does not', () => {
  const s = criticSeries([line('2026-10-01T10:00:00Z', 'critiqued(1)', 'looked at it'), line('2026-10-01T10:00:00Z', 'passed', 'all good')]);
  assert.deepEqual(s.map((c) => [c.kind, c.score, c.verdict]), [['round', null, null]]);
});
