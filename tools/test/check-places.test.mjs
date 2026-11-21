import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const TOOL = resolve('tools/check-places.mjs');

function run(slug, { stock, content }) {
  const dir = mkdtempSync(join(tmpdir(), 'places-'));
  try {
    mkdirSync(join(dir, 'sites', slug, 'final', 'src', 'tenant'), { recursive: true });
    writeFileSync(join(dir, 'sites', slug, 'final', 'src', 'tenant', 'content.json'), JSON.stringify(content));
    if (stock) {
      mkdirSync(join(dir, 'dossier', slug, 'stock'), { recursive: true });
      writeFileSync(join(dir, 'dossier', slug, 'stock', 'index.json'), JSON.stringify(stock));
    }
    const r = spawnSync('node', [TOOL], { cwd: dir, encoding: 'utf8' });
    return { code: r.status, out: r.stdout };
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

test('a site with no stock file is named as having nothing to check', () => {
  const r = run('lotus-surf-house', { content: {} });
  assert.equal(r.code, 0);
  assert.match(r.out, /No atmosphere images to check: lotus-surf-house/);
});

test('a final site is checked, not only its mockups', () => {
  const stock = [{ id: 'stock-001', credit: 'A. Person, CC BY', place: 'Hikkaduwa', place_ok: 'neutral' }];
  const r = run('lotus-surf-house', { stock, content: { hero: 'stock-001.jpg' } });
  assert.equal(r.code, 1);
  assert.match(r.out, /FAIL {2}lotus-surf-house \/ final/);
  assert.match(r.out, /hikkaduwa/);
});

test('a stock file the final site does not use is not a failure', () => {
  const stock = [{ id: 'stock-001', credit: 'A. Person, CC BY', place: 'Hikkaduwa', place_ok: 'neutral' }];
  assert.equal(run('coconut-surf-inn-guest-house-and-restaurant', { stock, content: {} }).code, 0);
});
