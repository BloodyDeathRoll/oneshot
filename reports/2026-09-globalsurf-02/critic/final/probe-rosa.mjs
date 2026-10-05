// critic station 5 round 1 probe (4f r2 copy): Rosa block, live and with the JSON blocked, 390 px; layout shifts inside #waves.
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [url, out] = process.argv.slice(2); const b = await chromium.launch(); const res = {};
for (const mode of ['live', 'json_blocked']) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { window.__sh = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__sh.push({ v: +e.value.toFixed(4), src: e.sources.map((s) => s.node && (s.node.className || s.node.nodeName)).join(',') }); }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage(); const reqs = [];
  p.on('request', (r) => { if (/rosa/.test(r.url())) reqs.push({ u: r.url().split('?')[0], phase: p.__ph || 'load' }); });
  if (mode === 'json_blocked') await p.route(/rosa-data.*\.json/, (r) => r.abort());
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(1500); p.__ph = 'scroll';
  const y0 = await p.evaluate(() => { scrollTo(0, 0); return window.__sh.length; });
  await p.evaluate(() => document.querySelector('#waves').scrollIntoView()); await p.waitForTimeout(4000);
  res[mode] = await p.evaluate((y0) => ({ shifts_after_scroll: window.__sh.slice(y0), visible_text: document.querySelector('#waves').innerText.slice(0, 500), iframe: document.querySelector('#waves iframe')?.src || null }), y0);
  res[mode].rosa_requests = reqs;
  await ctx.close();
}
fs.writeFileSync(`${out}/rosa-probe.json`, JSON.stringify(res, null, 1)); await b.close(); console.log(JSON.stringify(res, null, 1));
