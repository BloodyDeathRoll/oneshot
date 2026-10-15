import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toProperties, keyOf, verdictOf, SCHEMA } from '../notion.mjs';

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

test('not shortlisted reads as rejected, with our rating and the cause', () => {
  const p = toProperties({ ...b, state: 'scored', group: 'not_shortlisted', presence: 4 },
    { verdict: 'not shortlisted', why: 'Already has a decent online presence (4/5 is above the cut-off).' });
  assert.equal(p.Verdict.select.name, 'rejected');
  assert.equal(p.Rating.number, 4);
  assert.match(p.Reason.rich_text[0].text.content, /above the cut-off/);
});

test('other prospect verdicts pass through; no prospect falls back to the group', () => {
  assert.equal(verdictOf(b, { verdict: 'dropped' }), 'dropped');
  assert.equal(verdictOf({ group: 'superseded' }, undefined), 'not continued');
  assert.equal(verdictOf({ state: 'void', group: 'pipeline' }, undefined), 'voided');
  assert.equal(verdictOf({ group: 'not_shortlisted' }, undefined), 'rejected');
});

test('a presence of 0 is a rating, not a blank', () => {
  assert.equal(toProperties({ ...b, presence: 0 }).Rating.number, 0);
});
