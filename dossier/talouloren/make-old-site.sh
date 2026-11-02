#!/usr/bin/env bash
# dossier/talouloren/make-old-site.sh — capture the client's current site before it changes
# (harvester base.md constraint 7): full-page screenshots at 390 px and 1440 px of the home page
# (after scrolling it once so lazy images load), plus status, first-load transfer and LCP.
# media: dossier/talouloren/assets/old-site-*.png
# Writes dossier/talouloren/assets/old-site-{mobile,desktop}.png and old-site.json. Run from the repo root.
set -euo pipefail
cd "$(dirname "$0")/../.."
URL=${1:-https://talouloren.com/}
OUT=dossier/talouloren/assets
mkdir -p "$OUT"
URL="$URL" OUT="$OUT" node --input-type=module <<'JS'
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const { URL, OUT } = process.env;
const b = await chromium.launch();
const res = {};
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
for (const [name, vp, mobile] of [['mobile', { width: 390, height: 844 }, true], ['desktop', { width: 1440, height: 900 }, false]]) {
  // a phone UA, so the theme serves its mobile layout
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: 'he-IL', ...(mobile ? { userAgent: IPHONE } : {}) });
  const p = await ctx.newPage();
  let bytes = 0;
  p.on('response', async r => { try { const l = r.headers()['content-length']; bytes += l ? +l : (await r.body()).length; } catch {} });
  await p.addInitScript(() => { window.__lcp = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
  const r = await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await p.waitForTimeout(4000);
  const firstLoad = bytes; const lcp = await p.evaluate(() => window.__lcp);
  for (let y = 0; y < 30; y++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(200); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/old-site-${name}.png`, fullPage: true });
  res[name] = { status: r?.status(), first_load_bytes: firstLoad, lcp_ms: Math.round(lcp), page_height: await p.evaluate(() => document.documentElement.scrollHeight), captured_at: new Date().toISOString() };
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}/old-site.json`, JSON.stringify({ url: URL, ...res }, null, 1));
console.log(JSON.stringify(res));
JS
