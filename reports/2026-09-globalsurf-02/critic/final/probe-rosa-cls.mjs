// critic station 5 r1: layout shifts from the Rosa block at 390 and 1440, two runs each (sources + rects).
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
const b = await chromium.launch(); const out = {};
for (const [k, vp, mob] of [['390', { width: 390, height: 844 }, true], ['1440', { width: 1440, height: 900 }, false]]) {
  for (let run = 0; run < 2; run++) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mob, hasTouch: mob });
  await ctx.addInitScript(() => { window.__sh = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sh.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: e.sources.map((s) => (s.node && (s.node.className || s.node.nodeName)) + ' ' + JSON.stringify([s.previousRect.y, s.previousRect.height, s.currentRect.y, s.currentRect.height])) }); }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8764/'); await p.waitForTimeout(1500);
  const n0 = await p.evaluate(() => window.__sh.length);
  const before = await p.evaluate(() => { const w = document.querySelector('#waves'); return [...w.querySelectorAll('*')].filter(e=>e.className && /rosa/.test(e.className)).slice(0,8).map(e => e.className + ' h=' + Math.round(e.getBoundingClientRect().height)); });
  await p.evaluate(() => document.querySelector('#waves').scrollIntoView()); await p.waitForTimeout(5000);
  const after = await p.evaluate(() => { const w = document.querySelector('#waves'); return [...w.querySelectorAll('*')].filter(e=>e.className && /rosa/.test(e.className)).slice(0,8).map(e => e.className + ' h=' + Math.round(e.getBoundingClientRect().height)); });
  const link = await p.evaluate(() => [...document.querySelectorAll('#waves a')].map(a => { const r = a.getBoundingClientRect(); const c = getComputedStyle(a); return `${a.textContent.trim().slice(0,50)} ${r.width}x${r.height} vis=${c.visibility} clip=${c.clip} pos=${c.position} hiddenAncestor=${!!a.closest('[hidden]')}`; }));
  out[k + '_' + run] = { shifts: await p.evaluate((n) => window.__sh.slice(n), n0), before, after, link };
  await ctx.close();
  }
}
console.log(JSON.stringify(out, null, 1)); await b.close();
