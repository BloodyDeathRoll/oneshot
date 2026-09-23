// corner berth (>= 920): every visible text line vs the dock + ladder, whole page in quarter-screen steps
import { chromium } from 'playwright';
const port = process.argv[2];
const widths = [920, 960, 1000, 1024, 1100, 1200, 1275, 1276, 1280, 1366, 1440, 1525, 1536, 1600, 1703, 1704, 1920, 2560];
const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const probe = () => {
  const d = document.getElementById('dock'); const cs = getComputedStyle(d);
  if (cs.visibility !== 'visible' || +cs.opacity < 0.01 || cs.display === 'none') return null;
  const R = [d.getBoundingClientRect(), document.getElementById('ladder').getBoundingClientRect()];
  const hits = []; let n = 0;
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let t; (t = tw.nextNode());) {
    if (!t.textContent.trim()) continue; const el = t.parentElement;
    if (el.closest('#dock,#drawer,.skip,script,style')) continue;
    const s = getComputedStyle(el); if (s.visibility !== 'visible' || s.display === 'none' || +s.opacity < 0.05) continue;
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const q of rg.getClientRects()) {
      if (q.width < 1 || q.bottom <= 0 || q.top >= innerHeight) continue; n++;
      if (R.some((r) => r.width > 0 && q.right > r.left + .5 && q.left < r.right - .5 && q.bottom > r.top + .5 && q.top < r.bottom - .5)) hits.push(t.textContent.trim().slice(0, 30));
    }
  }
  return { n, hits };
};
let total = 0, lines = 0, pos = 0;
for (const w of widths) for (const mode of ['js', 'reduce', 'nojs']) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, javaScriptEnabled: mode !== 'nojs', reducedMotion: mode === 'reduce' ? 'reduce' : 'no-preference' });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:${port}/`); await p.waitForTimeout(1000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const ys = []; for (let y = 0; y < H; y += 225) ys.push(y); ys.push(H);
  let bad = [];
  for (const y of ys) {
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(mode === 'js' ? 120 : 40);
    const r = await p.evaluate(probe); if (!r) continue; pos++; lines += r.n;
    if (r.hits.length) bad.push(`${y}:${r.hits.join('/')}`);
  }
  total += bad.length;
  if (bad.length) console.log(w, mode, 'OVERLAP', bad.slice(0, 3).join(' '));
  await ctx.close();
}
console.log(`runs ${widths.length * 3}, dock positions ${pos}, line checks ${lines}, positions with overlap ${total}`);
await b.close();
