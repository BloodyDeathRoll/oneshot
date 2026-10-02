#!/usr/bin/env node
// dashboard/mockups/instrument/build.mjs — src/index.html + dashboard/data.json → dist/index.html
//
//   node dashboard/mockups/instrument/build.mjs
//
// Self-contained output: data.json embedded once in <script id="data" type="application/json">,
// IBM Plex Sans (variable wght, latin subset, OFL 1.1, from npm @fontsource-variable/ibm-plex-sans)
// embedded as base64 woff2. No network request from the page.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const src = await readFile(join(here, 'src/index.html'), 'utf8');
const data = await readFile(join(root, 'dashboard/data.json'), 'utf8');
const font = await readFile(join(here, 'src/fonts/ibm-plex-sans-latin-wght-normal.woff2'));

const fontCss = `<style>
@font-face{font-family:'IBM Plex Sans';font-style:normal;font-display:block;font-weight:100 700;
src:url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');
unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
</style>`;
// JSON inside a <script>: escape the only sequences that could close it or break parsing.
const safe = JSON.stringify(JSON.parse(data)).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const dataTag = `<script id="data" type="application/json">${safe}</script>`;

if (!src.includes('<!--FONT-->') || !src.includes('<!--DATA-->')) throw new Error('src/index.html is missing <!--FONT--> or <!--DATA-->');
const out = src.replace('<!--FONT-->', fontCss).replace('<!--DATA-->', () => dataTag);
await mkdir(join(here, 'dist'), { recursive: true });
await writeFile(join(here, 'dist/index.html'), out);

const kb = n => (n / 1024).toFixed(1) + ' KB';
const beforeData = Buffer.byteLength(out) - Buffer.byteLength(dataTag);
console.log(`dist/index.html ${kb(Buffer.byteLength(out))} total · ${kb(beforeData)} before data (font ${kb(font.length)} raw, ${kb(Math.ceil(font.length / 3) * 4)} base64) · data ${kb(Buffer.byteLength(dataTag))}`);
if (beforeData > 300 * 1024) { console.error('over the 300 KB budget before data'); process.exit(1); }
