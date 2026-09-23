// every visible text line box vs every image / iframe box, whole page, reduced motion
import { chromium } from 'playwright';
const [port, ws] = process.argv.slice(2);
const widths = (ws || '390,768,800,880,919,920,1000,1024,1100,1200,1280,1366,1440,1525,1600,1704,1920').split(',').map(Number);
const b = await chromium.launch();
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const p = await ctx.newPage(); await p.goto(`http://127.0.0.1:${port}/`); await p.waitForTimeout(600);
  const r = await p.evaluate(() => {
    const boxes = [...document.querySelectorAll('main img, main iframe, main .fc-rosa')].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 1).map((r) => ({ l: r.left, r: r.right, t: r.top + scrollY, b: r.bottom + scrollY }));
    const out = []; const tw = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode());) {
      if (!n.textContent.trim()) continue; const el = n.parentElement;
      if (el.closest('.fc-rosa')) continue;
      const s = getComputedStyle(el); if (s.visibility !== 'visible' || s.display === 'none') continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) {
        if (q.width < 1) continue; const t = q.top + scrollY, bb = q.bottom + scrollY;
        if (boxes.some((x) => q.right > x.l + 0.5 && q.left < x.r - 0.5 && bb > x.t + 0.5 && t < x.b - 0.5)) out.push(n.textContent.trim().slice(0, 30));
      }
    }
    return { n: out.length, ex: [...new Set(out)].slice(0, 3), sx: document.documentElement.scrollWidth - innerWidth };
  });
  console.log(w, 'lines under img:', r.n, r.ex.join(' | '), 'hscroll', r.sx);
  await ctx.close();
}
await b.close();
