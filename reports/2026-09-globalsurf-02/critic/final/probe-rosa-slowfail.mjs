// critic station 5 r1: Rosa block when the JSON fails slowly (3 s, then aborted) while the block is in view; 390 and 1440.
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const out = {};
for (const [k, vp, mob] of [['390', { width: 390, height: 844 }, true], ['1440', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob });
  await ctx.addInitScript(() => { window.__sh = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sh.push({ v: +e.value.toFixed(4), src: e.sources.map((s) => (s.node && (s.node.className || s.node.nodeName)) + ' ' + JSON.stringify([Math.round(s.previousRect.y), Math.round(s.currentRect.y)])) }); }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage();
  await p.route(/rosa-data.*\.json/, async (r) => { await new Promise((res) => setTimeout(res, 3000)); r.abort(); });
  await p.goto('http://127.0.0.1:8764/'); await p.waitForTimeout(1500);
  const n0 = await p.evaluate(() => window.__sh.length);
  await p.evaluate(() => document.querySelector('#waves').scrollIntoView()); await p.waitForTimeout(500);
  const h1 = await p.evaluate(() => Math.round(document.querySelector('#waves').getBoundingClientRect().height));
  await p.waitForTimeout(5000);
  const h2 = await p.evaluate(() => Math.round(document.querySelector('#waves').getBoundingClientRect().height));
  out[k] = { waves_height_while_loading: h1, waves_height_after_fail: h2, shifts: await p.evaluate((n) => window.__sh.slice(n), n0), cls_total: await p.evaluate(() => +window.__sh.reduce((a, x) => a + x.v, 0).toFixed(4)) };
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1)); await b.close();
