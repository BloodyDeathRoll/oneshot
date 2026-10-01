// tools/shoot-mockups.mjs — screenshot every built mockup at 390 px and 1440 px.
//
// Scrolls the whole page first, so lazy images have loaded and scroll-triggered
// reveals have fired before anything is captured; then a full-page shot plus a
// handful of viewport stops. The stops matter for mockups with a pinned section:
// a full-page capture of a sticky hero shows the sticky element once and leaves
// the rest of its scroll height blank, which is an artefact of the capture, not
// a layout bug.
import fs from 'node:fs'; import path from 'node:path';
import { chromium } from 'playwright';
import { serve } from './_serve.mjs';

const root = process.cwd();
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const STOPS = 6;

/* Some mockups scroll the document; some put the page in its own scroll area so
   that a fixed element can never cover content. Find whichever one actually
   scrolls, sweep it, and sweep every horizontal rail too — lazy images inside a
   sideways scroller never load otherwise. */
const SCROLLER = `(() => {
  const d = document.scrollingElement;
  if (d.scrollHeight > d.clientHeight + 4) return d;
  return [...document.querySelectorAll('*')].find((e) => {
    const s = getComputedStyle(e);
    return /auto|scroll/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 4;
  }) || d;
})()`;

const sweep = async (page) => {
  await page.evaluate(async (S) => {
    const el = eval(S);
    for (const r of document.querySelectorAll('*')) {
      if (r.scrollWidth > r.clientWidth + 4 && /auto|scroll/.test(getComputedStyle(r).overflowX)) {
        for (let x = 0; x <= r.scrollWidth; x += r.clientWidth * 0.8) { r.scrollLeft = x; await new Promise((k) => setTimeout(k, 70)); }
        r.scrollLeft = 0;
      }
    }
    const step = el.clientHeight * 0.6;
    for (let y = 0; y < el.scrollHeight; y += step) { el.scrollTop = y; await new Promise((k) => setTimeout(k, 90)); }
    el.scrollTop = 0; await new Promise((k) => setTimeout(k, 250));
  }, SCROLLER);
  await page.waitForTimeout(500);
};

const b = await chromium.launch();
const rows = [];
let port = 8930;
for (const slug of fs.readdirSync(path.join(root, 'sites'))) {
  const mdir = path.join(root, 'sites', slug, 'mockups');
  if (!fs.existsSync(mdir)) continue;
  for (const v of fs.readdirSync(mdir)) {
    if (only.length && !only.includes(v) && !only.includes(slug)) continue;
    const dist = path.join(mdir, v, 'dist');
    if (!fs.existsSync(dist)) continue;
    const srv = await serve(dist, port);
    const url = `http://localhost:${port}/`;
    const shots = path.join(mdir, v, 'shots');
    fs.rmSync(shots, { recursive: true, force: true });
    fs.mkdirSync(shots, { recursive: true });

    const shoot = async (name, ctx) => {
      const page = await b.newPage(ctx);
      await page.goto(url, { waitUntil: 'networkidle' });
      await sweep(page);
      await page.screenshot({ path: path.join(shots, `${name}.png`), fullPage: true });
      const { h, vh } = await page.evaluate((S) => { const el = eval(S); return { h: el.scrollHeight, vh: el.clientHeight }; }, SCROLLER);
      for (let i = 0; i < STOPS; i++) {
        const y = Math.round((h - vh) * (i / (STOPS - 1)));
        await page.evaluate(([S, y]) => { eval(S).scrollTop = y; }, [SCROLLER, y]);
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(shots, `${name}-${i + 1}.png`) });
      }
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
      await page.close();
      return broken;
    };

    const bm = await shoot('mobile', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const bd = await shoot('desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    srv.close();
    const kb = fs.readdirSync(dist, { recursive: true })
      .map((f) => path.join(dist, f)).filter((f) => fs.statSync(f).isFile())
      .reduce((n, f) => n + fs.statSync(f).size, 0) / 1024;
    rows.push({ slug, variant: v, brokenMobile: bm.length, brokenDesktop: bd.length, distKB: Math.round(kb) });
    if (bm.length || bd.length) console.log(`  broken in ${slug}/${v}:`, [...new Set([...bm, ...bd])].slice(0, 6));
    port++;
  }
}
await b.close();
console.table(rows);
