// tools/handoff.mjs: the handoff state machine over activity.jsonl lines (docs/handoff.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handoffs, ownerOf, STEPS } from '../handoff.mjs';

const L = (step, id, extra = {}) => ({ ts: extra.ts ?? `2026-10-26T1${STEPS.indexOf(step)}:00:00Z`, operator: extra.operator ?? 'shahar', slug: extra.slug ?? 'biz', kind: 'handoff', step, id, ...extra });

test('requested → approved → shipped → received, owner follows', () => {
  const lines = [
    L('requested', 'h-1', { operator: 'alon', from: 'shahar', to: 'alon', note: 'I know the owner' }),
    L('approved', 'h-1', { note: 'go' }),
    L('shipped', 'h-1', { key: 'biz/h-1.zip', bytes: 1234, sha256: 'abc', files: 3 }),
  ];
  let [h] = handoffs(lines);
  assert.equal(h.status, 'shipped'); assert.equal(h.open, true); assert.equal(h.from, 'shahar'); assert.equal(h.to, 'alon');
  assert.deepEqual(h.shipped, { ts: lines[2].ts, key: 'biz/h-1.zip', bytes: 1234, sha256: 'abc', files: 3 });
  assert.equal(ownerOf('biz', 'shahar', lines), 'shahar', 'not the owner until received');
  lines.push(L('received', 'h-1', { operator: 'alon' }));
  [h] = handoffs(lines);
  assert.equal(h.status, 'received'); assert.equal(h.open, false);
  assert.equal(ownerOf('biz', 'shahar', lines), 'alon');
  assert.equal(ownerOf('other', 'shahar', lines), 'shahar', 'other businesses keep the run operator');
});

test('rejected closes it; steps out of order or for an unknown id are ignored', () => {
  const lines = [L('requested', 'h-2', { operator: 'alon', from: 'shahar', to: 'alon' }), L('rejected', 'h-2', { note: 'not yet' }), L('shipped', 'h-2', { key: 'x' }), L('approved', 'h-9')];
  const all = handoffs(lines);
  assert.equal(all.length, 1);
  assert.equal(all[0].status, 'rejected'); assert.equal(all[0].open, false); assert.equal(all[0].shipped, undefined);
  assert.equal(ownerOf('biz', 'shahar', lines), 'shahar');
});

test('a second handoff passes the business back; the last received one wins', () => {
  const lines = [
    L('requested', 'h-1', { operator: 'alon', from: 'shahar', to: 'alon', ts: '2026-10-20T10:00:00Z' }), L('approved', 'h-1', { ts: '2026-10-20T10:01:00Z' }), L('shipped', 'h-1', { ts: '2026-10-20T10:02:00Z', key: 'a', bytes: 1, sha256: 's', files: 1 }), L('received', 'h-1', { operator: 'alon', ts: '2026-10-20T10:03:00Z' }),
    L('requested', 'h-2', { operator: 'shahar', from: 'alon', to: 'shahar', ts: '2026-10-25T10:00:00Z' }), L('approved', 'h-2', { operator: 'alon', ts: '2026-10-25T10:01:00Z' }), L('shipped', 'h-2', { operator: 'alon', ts: '2026-10-25T10:02:00Z', key: 'b', bytes: 1, sha256: 's', files: 1 }), L('received', 'h-2', { operator: 'shahar', ts: '2026-10-25T10:03:00Z' }),
  ];
  assert.equal(ownerOf('biz', 'alon', lines), 'shahar');
  assert.deepEqual(handoffs(lines).map((h) => h.status), ['received', 'received']);
});

test('other activity kinds are ignored', () => {
  assert.deepEqual(handoffs([{ ts: 't', operator: 'shahar', slug: 'biz', kind: 'work', note: 'x' }, { ts: 't', operator: 'shahar', slug: 'biz', kind: 'assign', id: 'a-1', to: 'alon', task: 't' }]), []);
});
