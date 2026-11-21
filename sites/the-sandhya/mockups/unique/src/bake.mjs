#!/usr/bin/env node
// Cuts the hand-made mask and the curtain-fold texture the set-piece's shader reads. Called by
// make-media.sh, which holds the `# media:` header.
//   node bake.mjs <noon image> <outdir>           writes hour-mask.png and hour-folds.png
//   node bake.mjs <noon image> <outdir> --compare also renders graded frames, for looking only:
//                                                 no graded still is ever served
// Runs src/hour.js, the page's own shader, in headless Chromium.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const [noonPath, out, flag] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b64 = (p) => 'data:image/webp;base64,' + readFileSync(p).toString('base64');

// The polygons, in frame px, cut against a 2x crop of the photograph.
// R: where sky can be. G: where sand is. B: what is always foliage or trunk: palm trunks and the
// two low green layers between the garden wall and the sand, so no leaf edge escapes the grade.
const SKY = [[0, 0], [1920, 0], [1920, 655], [1648, 640], [1622, 628], [1621, 471], [205, 473], [203, 505], [0, 505]];
const SAND = [[0, 860], [120, 858], [300, 856], [470, 857], [600, 853], [760, 845], [860, 839], [1000, 835], [1200, 833], [1400, 836], [1650, 835], [1920, 837], [1920, 1080], [0, 1080]];
const HEDGE = [[0, 788], [92, 782], [108, 740], [1920, 744], [1920, 840], [1650, 835], [1400, 836], [1200, 833], [1000, 835], [860, 839], [760, 845], [600, 853], [470, 857], [300, 856], [120, 858], [0, 860]];
// Capsules: x0, y0, x1, y1, half-width.
const TRUNKS = [[232, 500, 243, 697, 9], [298, 470, 283, 697, 13], [300, 330, 298, 470, 8], [596, 470, 601, 697, 8], [600, 440, 596, 470, 6], [952, 470, 962, 697, 7], [950, 440, 952, 470, 5], [1349, 470, 1357, 697, 8], [1349, 450, 1349, 470, 5]];

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('[page]', m.text()));
page.on('pageerror', (e) => { console.error(e); process.exit(1); });
await page.setContent('<!doctype html><body></body>');
await page.addScriptTag({ content: readFileSync(join(HERE, 'hour.js'), 'utf8') });
const save = (name, dataUrl) => writeFileSync(join(out, name), Buffer.from(dataUrl.split(',')[1], 'base64'));

const mask = await page.evaluate(({ SKY, SAND, HEDGE, TRUNKS }) => {
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
  const x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, 1920, 1080);
  x.globalCompositeOperation = 'lighter';
  const poly = (pts, col, blur) => { x.filter = blur ? `blur(${blur}px)` : 'none'; x.fillStyle = col; x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.closePath(); x.fill(); };
  poly(SKY, '#f00', .6);
  poly(SAND, '#0f0', 2.5);
  poly(HEDGE, '#00f', 1.5);
  poly([[0, 503], [205, 503], [205, 700], [100, 712], [0, 700]], '#00f', 1.5);   // the trees left of the building
  x.filter = 'blur(.6px)'; x.strokeStyle = '#00f'; x.lineCap = 'round';
  for (const [a, b, d, e, w] of TRUNKS) { x.lineWidth = w * 2; x.beginPath(); x.moveTo(a, b); x.lineTo(d, e); x.stroke(); }
  return c.toDataURL('image/png');
}, { SKY, SAND, HEDGE, TRUNKS });
save('hour-mask.png', mask);

// The curtains' own folds: for every pane, the median luminance of each pixel column, softened a
// touch sideways. Folds and mullions run vertically and survive; chairs, reflections, stains and
// the file's block marks do not. Everything here is derived from img-152.
const folds = await page.evaluate(async ({ noon }) => {
  const i = new Image(); i.src = noon; await i.decode();
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
  const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(i, 0, 0);
  const d = x.getImageData(0, 0, 1920, 1080).data;
  const lum = (px, py) => { const k = (py * 1920 + px) * 4; return .2126 * d[k] + .7152 * d[k + 1] + .0722 * d[k + 2]; };
  const o = document.createElement('canvas'); o.width = 1920; o.height = 1080;
  const g = o.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, 1920, 1080);
  for (const r of window.HOUR_PANES) {
    const [x0, y0, x1, y1] = r; const col = [];
    for (let px = x0; px < x1; px++) {
      const v = []; for (let py = y0; py < y1; py++) v.push(lum(px, py));
      v.sort((a, b) => a - b); col.push(v[Math.floor(v.length * .62)]);
    }
    for (let k = 0; k < col.length; k++) {
      const a = col[Math.max(0, k - 2)], b = col[Math.max(0, k - 1)], e = col[Math.min(col.length - 1, k + 1)], f = col[Math.min(col.length - 1, k + 2)];
      const v = Math.round((a + 2 * b + 3 * col[k] + 2 * e + f) / 9);
      g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x0 + k, y0 - 2, 1, y1 - y0 + 4);
    }
  }
  return o.toDataURL('image/png');
}, { noon: b64(noonPath) });
save('hour-folds.png', folds);

if (flag === '--compare') {
  const renders = [
    { name: 'cmp-p00', w: 1920, h: 1080, a: 1, b: 1.85 },
    { name: 'cmp-dusk', w: 1920, h: 1080, a: -2, b: -1 },
    { name: 'cmp-p35', w: 1920, h: 1080, a: .35, b: 1.2 },
    { name: 'cmp-p60', w: 1920, h: 1080, a: -.1, b: .75 },
    { name: 'cmp-p80', w: 1920, h: 1080, a: -.6, b: .25 }
  ];
  for (const r of renders) {
    const url = await page.evaluate(async ({ r, noon, mask, folds }) => {
      const load = (u) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = u; });
      const [p, m, f] = await Promise.all([load(noon), load(mask), load(folds)]);
      const c = document.createElement('canvas'); c.width = r.w; c.height = r.h;
      const h = window.HourGL(c, p, m, f, { preserve: true });
      h.draw([0, 0, 1, 1], [0, 1], r.a, r.b);
      const d = c.toDataURL('image/jpeg', .9); h.lose(); return d;
    }, { r, noon: b64(noonPath), mask, folds });
    save(r.name + '.jpg', url);
    console.log('rendered', r.name);
  }
}
await browser.close();
