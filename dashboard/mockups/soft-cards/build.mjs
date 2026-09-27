#!/usr/bin/env node
// dashboard/mockups/soft-cards/build.mjs — src/index.html + dashboard/data.json + the font → dist/index.html
//   node dashboard/mockups/soft-cards/build.mjs
// Self-contained output: data embedded once in <script id="data" type="application/json">, Manrope
// (variable, latin subset, OFL 1.1, from npm @fontsource-variable/manrope 5.3.0) embedded as a base64
// woff2 data URI. The page itself makes no network request; the Sites view lazy-loads one PNG per
// built site from dist/img/<slug>.png — each is a byte copy of that business's `shots.first` sheet.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
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
const out = src.replace('__FONT__', fontUri).replace('<!--__DATA__-->', json);

await mkdir(join(here, 'dist/img'), { recursive: true });
await writeFile(join(here, 'dist/index.html'), out);

// first screenshot per built site: copied, never embedded
const copied = [];
for (const b of data.businesses) {
  if (!['delivered', 'pitched', 'outcome'].includes(b.group) || !b.shots?.first) continue;
  await copyFile(join(repo, b.shots.first), join(here, `dist/img/${b.slug}.png`));
  copied.push(`${b.slug}.png ← ${b.shots.first}`);
}

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/index.html ${kb(Buffer.byteLength(out))} total · ${kb(Buffer.byteLength(out) - Buffer.byteLength(json))} before data · font ${kb(font.length)} (${kb(fontUri.length)} as base64) · data ${kb(Buffer.byteLength(json))}`);
console.log(copied.length ? `dist/img: ${copied.join(' · ')}` : 'dist/img: no built site with a screenshot');
