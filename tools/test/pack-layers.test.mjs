import { test } from 'node:test';
import assert from 'node:assert/strict';
import { missingPackLayers } from '../check-wiring.mjs';
import { dbFileOf } from '../notion.mjs';

// markets/il has no sources.md; only the scout loads market/sources.md.
const il = { market: 'il', vertical: 'brand_design' };

test('an inbound run is not bound by the scout\'s pack layers', () => {
  assert.deepEqual(missingPackLayers({ ...il, engagement: 'inbound' }), []);
});

test('an outbound run fails on a pack layer its scout loads and its pack lacks', () => {
  assert.deepEqual(missingPackLayers({ ...il, engagement: 'outbound' }),
    [{ agent: 'scout', rel: 'market/sources.md', src: 'markets/il/sources.md' }]);
});

test('the lk surf run has every pack layer', () => {
  assert.deepEqual(missingPackLayers({ market: 'lk', vertical: 'surf', engagement: 'outbound' }), []);
});

test('a workflow name may hold a vertical with _', () => {
  assert.match(dbFileOf('il-brand_design'), /notion-db-il-brand_design$/);
  assert.throws(() => dbFileOf('../x'), /bad workflow name/);
});
