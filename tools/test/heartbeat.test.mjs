// tools/heartbeat.mjs: hook payloads → status lines; tools/r2.mjs: the request signature.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, utimesSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parsePrompt, responseText, eventFrom, loadConfig } from '../heartbeat.mjs';
import { sign } from '../r2.mjs';

const PROMPT = '# RUNTIME PROMPT — agent: designer  (station 4e)\n# Assembled by tools/prompt.mjs …\nversion: 0.6.1\n…\nBusiness: sites/ka-surf-hostel-and-restaurant/concepts.md';

test('the station, agent, version and slug are read from the runtime prompt header', () => {
  assert.deepEqual(parsePrompt(PROMPT, 'Designer: three mockups'), { agent: 'designer', station: '4e', version: '0.6.1', slug: 'ka-surf-hostel-and-restaurant', note: 'Designer: three mockups' });
  assert.deepEqual(parsePrompt('do something', 'slug: foo-bar'), { agent: null, station: null, version: null, slug: 'foo-bar', note: 'slug: foo-bar' });
});

test('an agent report in any shape becomes text', () => {
  assert.equal(responseText('plain'), 'plain');
  assert.equal(responseText([{ type: 'text', text: 'a' }, { type: 'text', text: 'b' }]), 'a\nb');
  assert.equal(responseText({ content: [{ text: 'c' }] }), 'c');
  assert.equal(responseText(null), '');
});

test('hook events map to kinds; alive pings are throttled to one a minute', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hb-'));
  try {
    const throttleFile = join(dir, 'last');
    assert.equal(eventFrom({ hook_event_name: 'SessionStart', source: 'startup', session_id: 's1' }).kind, 'session');
    assert.equal(eventFrom({ hook_event_name: 'Stop' }).kind, 'idle');
    assert.equal(eventFrom({ hook_event_name: 'SessionEnd', reason: 'exit' }).note, 'exit');
    const start = eventFrom({ hook_event_name: 'PreToolUse', tool_name: 'Agent', tool_use_id: 'tu1', tool_input: { prompt: PROMPT, description: 'd' } });
    assert.equal(start.kind, 'station_start'); assert.equal(start.agent, 'designer'); assert.equal(start.tool_id, 'tu1');
    const end = eventFrom({ hook_event_name: 'PostToolUse', tool_name: 'Agent', tool_use_id: 'tu1', tool_input: { prompt: PROMPT }, tool_response: [{ type: 'text', text: 'Round 2: PASS 91/100.\nDetails…' }] });
    assert.equal(end.kind, 'station_end'); assert.equal(end.note, 'Round 2: PASS 91/100. Details…');
    assert.equal(eventFrom({ hook_event_name: 'PostToolUse', tool_name: 'Bash' }), null, 'only Agent ends are sent');
    const now = Date.now();
    const a1 = eventFrom({ hook_event_name: 'PreToolUse', tool_name: 'Bash' }, { now, throttleFile });
    assert.equal(a1.kind, 'alive'); assert.equal(a1.note, 'Bash');
    assert.equal(eventFrom({ hook_event_name: 'PreToolUse', tool_name: 'Read' }, { now: now + 30_000, throttleFile }), null, 'within the minute');
    const old = new Date(now - 120_000); utimesSync(throttleFile, old, old);
    assert.equal(eventFrom({ hook_event_name: 'PreToolUse', tool_name: 'Read' }, { now, throttleFile }).kind, 'alive', 'after the minute');
    assert.equal(eventFrom({ hook_event_name: 'Notification' }), null);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('box.json must have url and key; a missing file is silence, not an error', () => {
  const dir = mkdtempSync(join(tmpdir(), 'hb-'));
  try {
    assert.equal(loadConfig(join(dir, 'none.json')), null);
    writeFileSync(join(dir, 'a.json'), '{"url":"https://dash.example/","key":"k"}');
    assert.deepEqual(loadConfig(join(dir, 'a.json')), { url: 'https://dash.example', key: 'k' });
    writeFileSync(join(dir, 'b.json'), '{"url":"https://dash.example"}');
    assert.equal(loadConfig(join(dir, 'b.json')), null);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('SigV4: the authorization header names the credential scope and the signed headers; the query is canonical', () => {
  const cfg = { access_key_id: 'AKID', secret_access_key: 'SECRET' };
  const r = sign({ method: 'GET', host: 'acc.r2.cloudflarestorage.com', path: '/oneshot-handoff', query: { 'list-type': '2', prefix: 'biz/' }, now: new Date('2026-10-26T12:00:00Z') }, cfg);
  assert.equal(r.url, 'https://acc.r2.cloudflarestorage.com/oneshot-handoff?list-type=2&prefix=biz%2F');
  assert.match(r.headers.authorization, /^AWS4-HMAC-SHA256 Credential=AKID\/20261026\/auto\/s3\/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=[0-9a-f]{64}$/);
  assert.equal(r.headers['x-amz-date'], '20261026T120000Z');
  assert.equal(r.headers['x-amz-content-sha256'], 'UNSIGNED-PAYLOAD');
  const same = sign({ method: 'GET', host: 'acc.r2.cloudflarestorage.com', path: '/oneshot-handoff', query: { prefix: 'biz/', 'list-type': '2' }, now: new Date('2026-10-26T12:00:00Z') }, cfg);
  assert.equal(same.headers.authorization, r.headers.authorization, 'query order does not change the signature');
});
