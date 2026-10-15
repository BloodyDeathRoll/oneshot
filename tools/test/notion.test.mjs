import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toProperties, keyOf, SCHEMA } from '../notion.mjs';

const b = {
  slug: 'example-surf-school', run_id: '2026-09-ahangama-01', name: 'Example Surf School',
  state: 'packaged', next_step: 'send the pitch', gate: 'send the pitch', owner: 'Shahar',
  hosting_mode: 'managed', preview_url: 'https://example.os1.workers.dev',
  pitch: { proposal_url: 'https://example-proposal.os1.workers.dev' },
  last_change: '2026-10-05T11:58:26Z', last_worked: { name: 'Shahar' }, out: false,
};

test('every property maps to a column in SCHEMA', () => {
  assert.deepEqual(Object.keys(toProperties(b)).sort(), Object.keys(SCHEMA).sort());
});

test('a business maps to its row', () => {
  const p = toProperties(b);
  assert.equal(keyOf(b), '2026-09-ahangama-01/example-surf-school');
  assert.equal(p.Key.rich_text[0].text.content, '2026-09-ahangama-01/example-surf-school');
  assert.equal(p.Name.title[0].text.content, 'Example Surf School');
  assert.equal(p.State.select.name, 'packaged');
  assert.equal(p.Proposal.url, 'https://example-proposal.os1.workers.dev');
  assert.equal(p['Last change'].date.start, '2026-10-05T11:58:26Z');
});

test('missing fields become empty values, not errors', () => {
  const p = toProperties({ slug: 's', run_id: 'r', state: 'discovered' });
  assert.equal(p.Name.title[0].text.content, 's');
  assert.equal(p.Preview.url, null);
  assert.equal(p['Hosting mode'].select, null);
  assert.equal(p['Last change'].date, null);
  assert.deepEqual(p.Gate.rich_text, []);
});

test('select values drop commas (Notion rejects them)', () => {
  assert.equal(toProperties({ ...b, owner: 'A, B' }).Owner.select.name, 'A  B');
});
