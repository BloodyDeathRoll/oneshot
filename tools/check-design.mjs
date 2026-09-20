#!/usr/bin/env node
// tools/check-design.mjs — house rules that are easy to state and easy to break.
//
// Every one of these was a real regression on 2026-09-20: a dark ground came
// back on a rebuilt mockup, captions came back under photographs, and a photo
// grid went back to equal-height boxes padded out with empty space. Saying
// "don't" in a prompt did not hold. This measures the built page instead.
//
//   node tools/check-design.mjs [slug|variant ...]
//
// Checks, per built mockup, at 1440 and 390:
//   1. LIGHT GROUND. Every surf business here gets a light theme. The page
//      background luminance must be >= 0.55, and no element taller than a third
//      of the viewport may be a dark ground (luminance < 0.35) behind body text.
//      A container filled by a photograph is not a dark theme, so one that is
//      covered by its own img or canvas is skipped.
//   2. NO CAPTION UNDER A PHOTOGRAPH. Alt text carries the description for
//      anyone who cannot see it; a label under every picture is noise for
//      everyone who can. Quote attributions are fine — those are not pictures.
//   3. NO PADDED-OUT PICTURE BOXES. In any container of three or more figures,
//      no figure may have more than 12% of its height as empty space below its
//      image. Either crop to one ratio or let masonry give every picture its
//      own height; never stretch the boxes to match and leave holes.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from '/home/shahar/.npm/_npx/e41f203b7505f1fb/node_modules/playwright-core/index.mjs';

const root = process.cwd();
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const MIN_LUM = 0.55;      // the page's own ground
const MIN_BLOCK_LUM = 0.35; // a panel behind text
const MAX_SLACK = 0.12;
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};
const serve = (dir, port) => new Promise((res) => {
  const s = http.createServer((req, rp) => {
    let f = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
    if (f.endsWith('/')) f += 'index.html';
    fs.readFile(f, (e, b) => e ? (rp.statusCode = 404, rp.end())
      : (rp.setHeader('content-type', types[path.extname(f)] || 'application/octet-stream'), rp.end(b)));
  }).listen(port, () => res(s));
});

const PROBE = `(() => {
  const lum = (c) => {
    const m = c.match(/[\\d.]+/g); if (!m) return 1;
    const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const out = { bg: lum(getComputedStyle(document.body).backgroundColor), darkBlocks: [], captions: [], padded: [] };

  // 1. big dark grounds behind text
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    const c = s.backgroundColor;
    if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') continue;
    const r = el.getBoundingClientRect();
    if (r.height < innerHeight / 3 || r.width < innerWidth * 0.5) continue;
    if (lum(c) >= ${MIN_BLOCK_LUM}) continue;
    // a container filled by its own photograph is a picture, not a dark theme
    const cover = [...el.querySelectorAll(':scope > img, :scope > canvas, :scope > figure > img, :scope > figure > canvas')]
      .some((m) => { const b = m.getBoundingClientRect(); return b.height > r.height * 0.8 && b.width > r.width * 0.8; });
    if (cover) continue;
    if (!el.innerText || el.innerText.trim().length < 40) continue;
    out.darkBlocks.push(el.tagName.toLowerCase() + '.' + (el.className || '').toString().split(' ')[0] + ' L=' + lum(c).toFixed(2));
  }

  // 2. captions under photographs
  for (const fc of document.querySelectorAll('figcaption')) {
    const fig = fc.closest('figure');
    if (!fig) continue;
    const img = fig.querySelector('img, canvas');
    if (!img) continue;                                  // a quote card, not a picture
    if (fc.getBoundingClientRect().top < img.getBoundingClientRect().bottom - 2) continue; // an overlay label
    out.captions.push((fc.textContent || '').trim().slice(0, 60));
  }

  // 3. picture boxes padded out with empty space
  const groups = new Map();
  for (const fig of document.querySelectorAll('figure')) {
    const img = fig.querySelector('img');
    if (!img) continue;
    const parent = fig.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push([fig, img]);
  }
  for (const [parent, list] of groups) {
    if (list.length < 3) continue;
    for (const [fig, img] of list) {
      const f = fig.getBoundingClientRect(), i = img.getBoundingClientRect();
      if (f.height < 40) continue;
      const slack = (f.bottom - i.bottom) / f.height;
      if (slack > ${MAX_SLACK}) out.padded.push(
        (parent.className || parent.tagName).toString().split(' ')[0] + ' ' + Math.round(slack * 100) + '% empty');
    }
  }
  return out;
})()`;

const b = await chromium.launch();
let port = 8960, fails = 0;
const rows = [];
for (const slug of fs.readdirSync(path.join(root, 'sites'))) {
  const mdir = path.join(root, 'sites', slug, 'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of fs.readdirSync(mdir)) {
    if (only.length && !only.includes(v) && !only.includes(slug)) continue;
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    const srv = await serve(dist, port);
    const problems = [];
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const page = await b.newPage({ viewport: { width: w, height: h } });
      await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        const el = document.scrollingElement.scrollHeight > document.scrollingElement.clientHeight + 4
          ? document.scrollingElement
          : [...document.querySelectorAll('*')].find((e) => /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 4) || document.scrollingElement;
        for (let y = 0; y < el.scrollHeight; y += el.clientHeight * 0.7) { el.scrollTop = y; await new Promise((r) => setTimeout(r, 70)); }
        el.scrollTop = 0;
      });
      await page.waitForTimeout(500);
      const r = await page.evaluate(PROBE);
      if (r.bg < MIN_LUM) problems.push(`${w}px: page ground is dark (luminance ${r.bg.toFixed(2)} < ${MIN_LUM})`);
      for (const d of new Set(r.darkBlocks)) problems.push(`${w}px: dark ground behind text — ${d}`);
      for (const c of new Set(r.captions)) problems.push(`${w}px: caption under a photograph — "${c}"`);
      for (const p of new Set(r.padded)) problems.push(`${w}px: picture box padded out — ${p}`);
      await page.close();
    }
    srv.close(); port++;
    if (problems.length) { fails++; console.log(`\nFAIL  ${slug} / ${v}`); for (const p of problems) console.log('      ' + p); }
    rows.push({ slug, variant: v, problems: problems.length });
  }
}
await b.close();
console.table(rows);
console.log(`\n${rows.length} mockup(s) · ${fails} failing`);
process.exit(fails ? 1 : 0);
