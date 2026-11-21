import test from 'node:test';
import assert from 'node:assert/strict';
import { previewFromNotes } from '../handoff.mjs';

const PREVIEW = 'https://cheeky-monkey-surf-camp.os1.workers.dev';
const PITCH = 'https://cheeky-monkey-surf-camp-proposal.os1.workers.dev';

test('a pitch URL on a later line does not replace the preview', () => {
  assert.equal(previewFromNotes([{ note: `live at ${PREVIEW}` }, { note: `proposal ${PITCH}` }]), PREVIEW);
});

test('a note listing the pitch first still gives the preview', () => {
  assert.equal(previewFromNotes([{ note: `proposal ${PITCH}; preview ${PREVIEW}/` }]), PREVIEW);
});

test('the newest preview URL wins', () => {
  const moved = 'https://cheeky-monkey.os1.workers.dev';
  assert.equal(previewFromNotes([{ note: PREVIEW }, { note: moved }]), moved);
});

test('only a pitch, or no URL at all, is no preview', () => {
  assert.equal(previewFromNotes([{ note: PITCH }, { note: 'no link here' }, {}]), null);
});
