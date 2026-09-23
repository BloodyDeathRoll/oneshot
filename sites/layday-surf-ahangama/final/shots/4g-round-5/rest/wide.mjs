// before (8750) vs after (8751): full-page pixels + every element's box and style, per width and mode
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const widths = (process.argv[2] || '1024,1440,1525,1920').split(',').map(Number);
const out = process.argv[3] || 'wide'; mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const dump = () => [...document.querySelectorAll('*')].map((e) => {
  const r = e.getBoundingClientRect(), s = getComputedStyle(e);
  return [e.tagName, e.className, r.x, r.y + scrollY, r.width, r.height, s.fontSize, s.color, s.backgroundColor, s.padding, s.margin, s.display, s.visibility, s.position].join('|');
}).concat(['scroll-padding:' + getComputedStyle(document.documentElement).scrollPadding]);
const res = [];
for (const w of widths) for (const mode of ['nojs', 'reduce', 'js']) {
  const d = {};
  for (const port of [8750, 8751]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const p = await ctx.newPage();
    await p.goto(`http://127.0.0.1:${port}/`); await p.waitForTimeout(1500);
    d[port] = await p.evaluate(dump);
    if (mode !== 'js') await p.screenshot({ path: `${out}/${w}-${mode}-${port}.png`, fullPage: true });
    else { await p.evaluate(() => scrollTo(0, 1e7)); await p.waitForTimeout(600); await p.screenshot({ path: `${out}/${w}-${mode}-end-${port}.png` }); }
    await ctx.close();
  }
  const diffs = d[8750].map((l, i) => (l === d[8751][i] ? null : [l, d[8751][i]])).filter(Boolean);
  res.push({ w, mode, elements: d[8750].length, differing: diffs.length, first: diffs.slice(0, 3) });
  console.log(w, mode, 'elements', d[8750].length, 'differ', diffs.length, diffs.slice(0, 2));
}
writeFileSync(`${out}/elements.json`, JSON.stringify(res, null, 1));
await b.close();
