#!/usr/bin/env bash
# dossier/sanjee-surf-school/make-old-site.sh — capture the business's current site before it changes
# (harvester base.md constraint 7): full-page screenshots at 390 px and 1440 px of the home page
# (after scrolling it once so lazy images load), plus status, first-load transfer, LCP, CLS and the
# document width that shows the sideways scroll. Unthrottled, one run: a floor, not a field measure.
# media: dossier/sanjee-surf-school/assets/old-site-*.png
# Writes assets/old-site-{mobile,desktop}.png and assets/old-site.json. Run from anywhere.
# No login and no cookies of ours: a fresh browser context, as any first-time visitor.
set -euo pipefail
cd "$(dirname "$0")/../.."
[ -e dossier/sanjee-surf-school/assets ] || tools/link-assets.sh sanjee-surf-school >/dev/null
OUT=dossier/sanjee-surf-school/assets
OUT="$OUT" node --input-type=module <<'JS'
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const { OUT } = process.env;
const URL_ = 'https://sanjee-surf.com/';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const b = await chromium.launch();
const res = { url: URL_, fetched_at: new Date().toISOString() };
for (const [name, vp, mobile] of [['mobile', { width: 390, height: 844 }, true], ['desktop', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: 'en-GB', ...(mobile ? { userAgent: IPHONE } : {}) });
  const p = await ctx.newPage();
  await p.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  let bytes = 0, requests = 0; const third = new Set();
  const cdp = await ctx.newCDPSession(p); await cdp.send('Network.enable');
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; requests++; });
  p.on('request', (r) => { const u = new URL(r.url()); if (u.protocol.startsWith('http') && !u.hostname.endsWith('sanjee-surf.com')) third.add(u.hostname); });
  const r = await p.goto(URL_, { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(1500);
  const m = await p.evaluate(() => ({ lcp_ms: Math.round(window.__lcp), cls: +window.__cls.toFixed(3), document_width: document.documentElement.scrollWidth, title: document.title }));
  res[name] = { status: r.status(), viewport: vp.width, first_load_bytes: bytes, requests, third_party_hosts_on_load: [...third], ...m };
  for (let y = 0; y < 40; y++) { await p.evaluate(() => window.scrollBy(0, 700)); await p.waitForTimeout(120); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/old-site-${name}.png`, fullPage: true });
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}/old-site.json`, JSON.stringify(res, null, 1) + '\n');
console.log(JSON.stringify(res));
JS
