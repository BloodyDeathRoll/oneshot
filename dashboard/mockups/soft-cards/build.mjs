#!/usr/bin/env node
// dashboard/mockups/soft-cards/build.mjs — src/index.html + dashboard/data.json + the font → dist/index.html
//   node dashboard/mockups/soft-cards/build.mjs
// Self-contained output: data embedded once in <script id="data" type="application/json">, Manrope
// (variable, latin subset, OFL 1.1, from npm @fontsource-variable/manrope 5.3.0) embedded as a base64
// woff2 data URI. The page itself makes no network request; the Sites view lazy-loads one PNG per
// built site from dist/img/<slug>.png — each is a byte copy of that business's `shots.first` sheet.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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

await rm(join(here, 'dist/img'), { recursive: true, force: true });
await mkdir(join(here, 'dist/img'), { recursive: true });
await writeFile(join(here, 'dist/index.html'), out);

// first screenshot per built site: the first tile (desktop-00.png beside `shots.first`, else the
// sheet itself) rendered at the card slot's 2× size (672×420, cover, top) as JPEG — never embedded
const { chromium } = await import('playwright');
const { existsSync, statSync } = await import('node:fs');
const sites = data.businesses.filter((b) => ['delivered', 'pitched', 'outcome'].includes(b.group) && b.shots?.first);
const copied = [];
if (sites.length) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 672, height: 420 }, deviceScaleFactor: 1 });
  for (const b of sites) {
    const tile = join(repo, b.shots.first.replace(/[^/]+$/, 'desktop-00.png'));
    const src = existsSync(tile) ? tile : join(repo, b.shots.first);
    const tmp = join(here, 'dist/img/_thumb.html');
    await writeFile(tmp, `<!doctype html><style>html,body{margin:0;background:#fff}img{display:block;width:672px;height:420px;object-fit:cover;object-position:top}</style><img src="${pathToFileURL(src).href}">`);
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
    await page.waitForFunction(() => document.images[0].complete && document.images[0].naturalWidth > 0);
    const outPath = join(here, `dist/img/${b.slug}.jpg`);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: 82, clip: { x: 0, y: 0, width: 672, height: 420 } });
    copied.push(`${b.slug}.jpg ${(statSync(outPath).size / 1024).toFixed(0)} KB ← ${src.replace(repo + '/', '')}`);
  }
  await browser.close();
  await rm(join(here, 'dist/img/_thumb.html'), { force: true });
}

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log(`dist/index.html ${kb(Buffer.byteLength(out))} total · ${kb(Buffer.byteLength(out) - Buffer.byteLength(json))} before data · font ${kb(font.length)} (${kb(fontUri.length)} as base64) · data ${kb(Buffer.byteLength(json))}`);
console.log(copied.length ? `dist/img: ${copied.join(' · ')}` : 'dist/img: no built site with a screenshot');
