#!/usr/bin/env node
// Bakes the hand-cut mask and the graded stills for "The Hour". Called by make-media.sh, which
// holds the `# media:` header. Runs src/hour.js, the page's own shader, in headless Chromium.
//   node bake.mjs <noon.png> <outdir> [--scale n]    writes PNGs into <outdir>; make-media.sh encodes them
// Everything is a re-grade of img-152. No sky is replaced and no pixel is invented.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const [noonPath, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b64 = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');

// The polygons, in frame px, cut against a 2x crop of the photograph.
// R: where sky can be. G: where sand is. B: what stands in front of a pane or the sky (palm trunks).
const SKY = [[0, 0], [1920, 0], [1920, 655], [1648, 640], [1622, 628], [1621, 471], [205, 473], [203, 505], [0, 505]];
const SAND = [[0, 853], [120, 851], [300, 849], [470, 850], [600, 846], [760, 838], [860, 832], [1000, 828], [1200, 826], [1400, 829], [1650, 828], [1920, 830], [1920, 1080], [0, 1080]];
// Capsules: x0, y0, x1, y1, half-width.
const TRUNKS = [[232, 500, 243, 697, 9], [298, 470, 283, 697, 13], [300, 330, 298, 470, 8], [596, 470, 601, 697, 8], [600, 440, 596, 470, 6], [952, 470, 962, 697, 7], [950, 440, 952, 470, 5], [1349, 470, 1357, 697, 8], [1349, 450, 1349, 470, 5]];

export const WINDOWS = { hero: [0, 0, 1, 1], phone: [668 / 1920, 60 / 1080, 651 / 1920, 930 / 1080] };

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => { console.error(e); process.exit(1); });
await page.setContent('<!doctype html><body></body>');
await page.addScriptTag({ content: readFileSync(join(HERE, 'hour.js'), 'utf8') });

const save = async (name, dataUrl) => writeFileSync(join(out, name), Buffer.from(dataUrl.split(',')[1], 'base64'));

const mask = await page.evaluate(({ SKY, SAND, TRUNKS }) => {
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
  const x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, 1920, 1080);
  x.globalCompositeOperation = 'lighter';
  const poly = (pts, col, blur) => { x.filter = blur ? `blur(${blur}px)` : 'none'; x.fillStyle = col; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.closePath(); x.fill(); };
  poly(SKY, '#f00', .6);
  poly(SAND, '#0f0', 3);
  x.filter = 'blur(.6px)'; x.strokeStyle = '#00f'; x.lineCap = 'round';
  for (const [a, b, d, e, w] of TRUNKS) { x.lineWidth = w * 2; x.beginPath(); x.moveTo(a, b); x.lineTo(d, e); x.stroke(); }
  return c.toDataURL('image/png');
}, { SKY, SAND, TRUNKS });
await save('hour-mask.png', mask);

const renders = [
  { name: 'hour-slice', w: 1920, h: 1080, win: WINDOWS.hero, a: .20, b: .90, keep: 1 },
  { name: 'hour-dusk', w: 1920, h: 1080, win: WINDOWS.hero, a: -2, b: -1, keep: 0 },
  { name: 'hour-slice-phone', w: 780, h: 1114, win: WINDOWS.phone, a: .04, b: 1.02, keep: .5 },
  { name: 'hour-dusk-phone', w: 780, h: 1114, win: WINDOWS.phone, a: -2, b: -1, keep: 0 }
];
for (const r of renders) {
  const url = await page.evaluate(async ({ r, noon, mask }) => {
    const load = (u) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = u; });
    const [p, m] = await Promise.all([load(noon), load(mask)]);
    const c = document.createElement('canvas'); c.width = r.w; c.height = r.h;
    const h = window.HourGL(c, p, m, { preserve: true });
    h.draw(window.hourCover(r.win, r.w / r.h, .5, 1), [r.win[0], r.win[0] + r.win[2]], r.a, r.b, r.keep);
    const d = c.toDataURL('image/png'); h.lose(); return d;
  }, { r, noon: b64(noonPath), mask });
  await save(r.name + '.png', url);
  console.log('baked', r.name);
}
await browser.close();
