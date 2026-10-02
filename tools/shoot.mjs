#!/usr/bin/env node
// tools/shoot.mjs — scrolled, per-viewport screenshots of a page, plus one contact sheet per width.
//
//   node tools/shoot.mjs <file.html | dir-with-index.html | http(s)://url> [--out <dir>] [--step 0.9] [--settle 700] [--max 40] [--force]
//
// Why: a single full-page capture never fires scroll-driven content, so it shows a page nobody will
// ever see. This scrolls top to bottom in viewport steps, lets motion settle, and captures each
// viewport. Used by the designer's look loop (4e) and by the critic (quick + full).
// Chromium is started with software GL so WebGL renders headlessly.
//
// Output in <out> (default ./shots): desktop-00.png …, mobile-00.png …, desktop-sheet.html,
// mobile-sheet.html, desktop-sheet.png, mobile-sheet.png, shoot.json (page height, console errors).
//
// One shared set per build (docs/team.md): the designer and all three critics read the same <out>.
// A local target is fingerprinted (every file under its folder, by path, size and mtime); when
// <out>/shoot.json carries the same fingerprint the shoot is skipped and the existing set reused.
// --force shoots anyway. A new shoot clears the folder's old images first, so it never mixes rounds.
// Screenshots are scratch: tools/clean-shots.mjs deletes them after the round is scored.
// Known artefact: an opaque element over a WebGL canvas can punch a black rectangle in the canvas
// under software GL. It is the compositor, not the page (designer/references.md #29).

import { chromium } from 'playwright';
import { mkdir, writeFile, stat, readFile, readdir, rm } from 'node:fs/promises';
import { resolve, join, dirname, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
if (!args.length || args[0].startsWith('--')) {
  console.error('usage: node tools/shoot.mjs <file|dir|url> [--out dir] [--step 0.9] [--settle 700] [--max 40]');
  process.exit(2);
}
const opt = (name, dflt) => { const i = args.indexOf('--' + name); return i > -1 ? args[i + 1] : dflt; };
const out = resolve(opt('out', 'shots'));
const step = Number(opt('step', 0.9));
const settle = Number(opt('settle', 700));
const max = Number(opt('max', 40));

let target = args[0];
let build = null;
if (!/^https?:\/\//.test(target)) {
  let p = resolve(target);
  if ((await stat(p)).isDirectory()) p = join(p, 'index.html');
  target = pathToFileURL(p).href;
  build = await fingerprint(dirname(p));
}

// path + size + mtime of every file the page could load (its own folder, minus screenshots)
async function fingerprint(dir) {
  const h = createHash('sha256');
  const walk = async (d) => {
    for (const e of (await readdir(d, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name === 'shots' || e.name === 'node_modules') continue;
      const f = join(d, e.name);
      const st = await stat(f).catch(() => null);
      if (!st) continue;
      if (st.isDirectory()) await walk(f);
      else h.update(`${relative(dir, f)}\t${st.size}\t${st.mtimeMs}\n`);
    }
  };
  await walk(dir);
  return h.digest('hex').slice(0, 16);
}

if (build && !args.includes('--force')) {
  const prev = JSON.parse(await readFile(join(out, 'shoot.json'), 'utf8').catch(() => 'null'));
  const sheets = await Promise.all(['desktop-sheet.png', 'mobile-sheet.png'].map((f) => stat(join(out, f)).then(() => true, () => false)));
  if (prev?.build === build && prev?.target === target && sheets.every(Boolean)) {
    console.log(`unchanged build ${build}: reusing ${out} (shot ${prev.at}); --force to shoot again`);
    process.exit(0);
  }
}

const WIDTHS = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  { name: 'mobile',  viewport: { width: 390,  height: 844 }, deviceScaleFactor: 2, isMobile: true,  hasTouch: true  },
];

await mkdir(out, { recursive: true });
for (const f of await readdir(out)) if (/\.(png|html)$/.test(f)) await rm(join(out, f));
const browser = await chromium.launch({
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const report = { target, build, at: new Date().toISOString(), widths: {} };

for (const w of WIDTHS) {
  const ctx = await browser.newContext(w);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(target, { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  // Some pages put the whole page in its own scroll area (so a fixed band can never cover
  // content); the window then never scrolls and every capture would be the first screen. If the
  // window does not scroll, scroll the largest scrollable element instead.
  const inner = await page.evaluate(() => {
    const d = document.scrollingElement;
    if (d.scrollHeight > d.clientHeight + 4) return false;
    const el = [...document.querySelectorAll('body *')]
      .filter((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 4)
      .sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0];
    if (!el) return false;
    window.__shootScroller = el;
    return true;
  });
  const metrics = () => page.evaluate(() => {
    const el = window.__shootScroller;
    return el ? { height: el.scrollHeight, view: el.clientHeight }
              : { height: document.documentElement.scrollHeight, view: innerHeight };
  });

  const files = [];
  let y = 0, i = 0, height = 0;
  for (;;) {
    await page.evaluate(v => (window.__shootScroller ? (window.__shootScroller.scrollTop = v) : window.scrollTo(0, v)), y);
    await page.waitForTimeout(settle);
    if (i === 0 && !w.isMobile) {            // show pointer-driven motion on the first screen
      await page.mouse.move(900, 500); await page.mouse.move(1100, 620, { steps: 8 });
      await page.waitForTimeout(400);
    }
    // wait for anything that marks itself as loading (e.g. the Rosa forecast block)
    await page.waitForFunction(() => !document.querySelector('[data-loading="true"]'), null, { timeout: 4000 }).catch(() => {});
    const name = `${w.name}-${String(i).padStart(2, '0')}.png`;
    await page.screenshot({ path: join(out, name) });
    files.push(name);
    const m = await metrics();
    height = m.height;
    const next = y + Math.round(m.view * step);
    if (y + m.view >= height || ++i >= max) break;
    y = Math.min(next, height - m.view);
  }
  await ctx.close();

  // contact sheet: the captures side by side, scaled, as one image to look at
  const cols = w.isMobile ? 8 : 3;
  const tw = w.isMobile ? 260 : 640;
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#f0f;display:grid;gap:8px;padding:8px;
    grid-template-columns:repeat(${cols},${tw}px)}img{width:${tw}px;display:block}</style>` +
    files.map(f => `<img src="${f}">`).join('');
  await writeFile(join(out, `${w.name}-sheet.html`), html);
  const sheetCtx = await browser.newContext({ viewport: { width: cols * (tw + 8) + 8, height: 800 } });
  const sheet = await sheetCtx.newPage();
  await sheet.goto(pathToFileURL(join(out, `${w.name}-sheet.html`)).href);
  await sheet.waitForTimeout(300);
  await sheet.screenshot({ path: join(out, `${w.name}-sheet.png`), fullPage: true });
  await sheetCtx.close();

  report.widths[w.name] = { pageHeight: height, scroller: inner ? 'inner element' : 'window', captures: files.length, truncated: i >= max, errors };
  console.log(`${w.name}: ${files.length} captures, page ${height}px${inner ? ' (inner scroll area)' : ''}${errors.length ? `, ${errors.length} console errors` : ''}`);
}

await browser.close();
await writeFile(join(out, 'shoot.json'), JSON.stringify(report, null, 2));
console.log(`sheets: ${join(out, 'desktop-sheet.png')}  ${join(out, 'mobile-sheet.png')}`);
