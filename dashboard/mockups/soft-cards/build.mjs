#!/usr/bin/env node
// dashboard/mockups/soft-cards/build.mjs — src/index.html + dashboard/data.json + the font → dist/index.html
//   node dashboard/mockups/soft-cards/build.mjs
// Self-contained output: data embedded once in <script id="data" type="application/json">, Manrope
// (variable, latin subset, OFL 1.1, from npm @fontsource-variable/manrope 5.3.0) embedded as a base64
// woff2 data URI. The page makes no network request.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../../..');
const src = await readFile(join(here, 'src/index.html'), 'utf8');
const data = await readFile(join(repo, 'dashboard/data.json'), 'utf8');
const font = await readFile(join(here, 'src/fonts/manrope-latin-wght-normal.woff2'));

const json = JSON.stringify(JSON.parse(data)).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
const fontUri = 'data:font/woff2;base64,' + font.toString('base64');

if (!src.includes('__FONT__') || !src.includes('<!--__DATA__-->')) throw new Error('placeholders missing in src/index.html');
const out = src.replace('__FONT__', fontUri).replace('<!--__DATA__-->', json);

await mkdir(join(here, 'dist'), { recursive: true });
await writeFile(join(here, 'dist/index.html'), out);
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/index.html ${kb(Buffer.byteLength(out))} total · ${kb(Buffer.byteLength(out) - Buffer.byteLength(json))} before data · font ${kb(font.length)} (${kb(fontUri.length)} as base64) · data ${kb(Buffer.byteLength(json))}`);
