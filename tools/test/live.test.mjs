// dashboard/live.mjs: heartbeat lines → the Live strip's picture (docs/heartbeat.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { LiveStore, validate, bearerOk, STALE_MIN } from '../../dashboard/live.mjs';

const ops = { shahar: { name: 'Shahar' }, alon: { name: 'Alon' } };
const T0 = Date.parse('2026-10-26T12:00:00Z');
const at = (min) => new Date(T0 + min * 60_000).toISOString().replace(/\.\d+Z$/, 'Z');

test('validate keeps the strip fields, clips them, and refuses unknown operators and kinds', () => {
  const l = validate({ operator: 'alon', kind: 'station_start', run_id: 'r', slug: 's', agent: 'scout', station: '2', version: '0.3.2', note: 'x'.repeat(500), secret: 'no', run_on_main: false, ts: 'bad' }, ops);
  assert.equal(l.note.length, 400); assert.equal(l.secret, undefined); assert.equal(l.run_on_main, false);
  assert.ok(!Number.isNaN(Date.parse(l.ts)), 'a bad ts is replaced');
  assert.throws(() => validate({ operator: 'eve', kind: 'alive' }, ops), /operator must be/);
  assert.throws(() => validate({ operator: 'alon', kind: 'dance' }, ops), /kind must be/);
  assert.throws(() => validate([], ops), /JSON object/);
});

test('bearerOk compares the whole key', () => {
  assert.equal(bearerOk('Bearer abc', 'abc'), true);
  assert.equal(bearerOk('bearer abc', 'abc'), true);
  assert.equal(bearerOk('Bearer ab', 'abc'), false);
  assert.equal(bearerOk('Bearer abc', null), false);
  assert.equal(bearerOk(undefined, 'abc'), false);
});

test('a station runs, ends with its report, the operator goes idle, then stale; events are kept newest first', () => {
  const dir = mkdtempSync(join(tmpdir(), 'live-'));
  try {
    const s = new LiveStore(join(dir, 'live.json'));
    s.add(validate({ operator: 'alon', kind: 'session', run_id: '2026-10-midigama-01', run_on_main: false, ts: at(0) }, ops));
    s.add(validate({ operator: 'alon', kind: 'station_start', slug: null, agent: 'scout', station: '2', version: '0.3.2', tool_id: 't1', ts: at(1) }, ops));
    let snap = s.snapshot(T0 + 2 * 60_000);
    assert.equal(snap.operators.alon.state, 'running');
    assert.equal(snap.operators.alon.station.agent, 'scout');
    assert.equal(snap.operators.alon.run_on_main, false, 'a run only on the sender\'s disk is flagged');
    s.add(validate({ operator: 'alon', kind: 'alive', note: 'Bash', ts: at(5) }, ops));
    s.add(validate({ operator: 'alon', kind: 'station_end', agent: 'scout', station: '2', tool_id: 't1', note: '67 candidates', ts: at(14) }, ops));
    snap = s.snapshot(T0 + 15 * 60_000);
    assert.equal(snap.operators.alon.state, 'active');
    assert.equal(snap.operators.alon.station, null);
    assert.equal(snap.operators.alon.last_station.note, '67 candidates');
    assert.equal(snap.operators.alon.last_station.started, at(1), 'the end keeps the start time of the same tool call');
    s.add(validate({ operator: 'alon', kind: 'idle', ts: at(16) }, ops));
    assert.equal(s.snapshot(T0 + 17 * 60_000).operators.alon.state, 'idle');
    assert.equal(s.snapshot(T0 + (16 + STALE_MIN + 1) * 60_000).operators.alon.state, 'stale');
    s.add(validate({ operator: 'alon', kind: 'session_end', ts: at(40) }, ops));
    assert.equal(s.snapshot(T0 + 41 * 60_000).operators.alon.state, 'offline');
    assert.deepEqual(snap.events.map((e) => e.kind), ['station_end', 'station_start', 'session'], 'alive pings are not events');
    assert.ok(existsSync(join(dir, 'live.json')));
    const again = new LiveStore(join(dir, 'live.json'));
    assert.equal(again.snapshot(T0 + 41 * 60_000).operators.alon.state, 'offline', 'the file survives a restart');
    assert.equal(JSON.parse(readFileSync(join(dir, 'live.json'), 'utf8')).events.length, 5);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('a pulled picture replaces the local one', () => {
  const dir = mkdtempSync(join(tmpdir(), 'live-'));
  try {
    const s = new LiveStore(join(dir, 'live.json'));
    s.replace({ at: 'x', operators: { shahar: { state: 'running' } }, events: [] });
    assert.equal(s.current().operators.shahar.state, 'running');
    s.replace(null);
    assert.equal(s.current().operators.shahar.state, 'running', 'a failed pull keeps the last picture');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
