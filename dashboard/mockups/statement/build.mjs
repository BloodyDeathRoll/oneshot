#!/usr/bin/env node
// dashboard/mockups/statement/build.mjs — builds the self-contained mockup.
//
//   node dashboard/mockups/statement/build.mjs
//
// Reads src/index.html, dashboard/data.json and src/fonts/geist-latin-wght-normal.woff2, and writes
// dist/index.html with the data embedded once in <script id="data" type="application/json"> and the
// font embedded once as a base64 @font-face. The built page makes no network request.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..', '..', '..');
const src = await readFile(join(here, 'src', 'index.html'), 'utf8');
const dataText = await readFile(join(repo, 'dashboard', 'data.json'), 'utf8');
const data = JSON.parse(dataText); // fail loudly on a broken file
const font = await readFile(join(here, 'src', 'fonts', 'geist-latin-wght-normal.woff2'));

const fontFace = `@font-face{font-family:"Geist Variable";font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${font.toString('base64')}) format("woff2");}`;
// JSON inside a <script> must never contain "</script"; escape the slash.
const json = JSON.stringify(data).replace(/<\//g, '<\\/');

let out = src;
if (!out.includes('/*FONT*/') || !out.includes('<!--DATA-->')) throw new Error('src/index.html lost a placeholder');
out = out.replace('/*FONT*/', fontFace).replace('<!--DATA-->', json);

await mkdir(join(here, 'dist'), { recursive: true });
await writeFile(join(here, 'dist', 'index.html'), out);
// deep link for tools/shoot.mjs (which takes a file path, not a hash): a redirect to the Pipeline view
await writeFile(join(here, 'dist', 'pipeline.html'), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=index.html#pipeline"><title>OneShot — Pipeline</title><a href="index.html#pipeline">Pipeline</a>\n');

const before = Buffer.byteLength(out) - Buffer.byteLength(json);
console.log(`dist/index.html: ${Buffer.byteLength(out)} B total, ${before} B before the data (font ${font.length} B raw, ${Math.ceil(font.length / 3) * 4} B base64), data ${Buffer.byteLength(json)} B`);
