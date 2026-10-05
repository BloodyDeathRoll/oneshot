#!/usr/bin/env node
// dashboard/mockups/soft-cards/build.mjs — src/index.html + dashboard/data.json + the font → dist/index.html
//   node dashboard/mockups/soft-cards/build.mjs
// Self-contained output: data embedded once in <script id="data" type="application/json">, Manrope
// (variable, latin subset, OFL 1.1, from npm @fontsource-variable/manrope 5.3.0) embedded as a base64
// woff2 data URI. The page itself makes no network request; the Sites view lazy-loads one JPEG per
// site from dist/img/<slug>.jpg — the first screen of its live preview (dashboard/thumbs.mjs).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');
const src = await readFile(join(here, 'src/index.html'), 'utf8');
const dataRaw = await readFile(join(repo, 'dashboard/data.json'), 'utf8');
const font = await readFile(join(here, 'src/fonts/manrope-latin-wght-normal.woff2'));

const data = JSON.parse(dataRaw);
const json = JSON.stringify(data).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const fontUri = 'data:font/woff2;base64,' + font.toString('base64');

if (!src.includes('__FONT__') || !src.includes('<!--__DATA__-->')) throw new Error('placeholders missing in src/index.html');
const out = src.replace('__FONT__', fontUri).replace('<!--__DATA__-->', () => json);

await mkdir(join(here, 'dist/img'), { recursive: true });
await writeFile(join(here, 'dist/index.html'), out);

// first screen per site with a preview: shot from the live preview URL (dashboard/thumbs.mjs), never
// embedded; the live server shoots the same file on demand at /thumb/<slug>.jpg
const { shootThumb, closeThumbs, thumbFresh } = await import('../../thumbs.mjs');
const { statSync } = await import('node:fs');
const sites = data.businesses.filter((b) => b.preview_url && b.state !== 'void');
const copied = [];
for (const b of sites) {
  const outPath = join(here, `dist/img/${b.slug}.jpg`);
  if (thumbFresh(outPath)) { copied.push(`${b.slug}.jpg kept (fresh)`); continue; }
  try { await shootThumb(b.preview_url, outPath); copied.push(`${b.slug}.jpg ${(statSync(outPath).size / 1024).toFixed(0)} KB ← ${b.preview_url}`); }
  catch (e) { copied.push(`${b.slug}: not shot (${e.message.split('\n')[0]})`); }
}
await closeThumbs();

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/index.html ${kb(Buffer.byteLength(out))} total · ${kb(Buffer.byteLength(out) - Buffer.byteLength(json))} before data · font ${kb(font.length)} (${kb(fontUri.length)} as base64) · data ${kb(Buffer.byteLength(json))}`);
console.log(copied.length ? `dist/img: ${copied.join(' · ')}` : 'dist/img: no site with a preview');
