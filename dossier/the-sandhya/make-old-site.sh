#!/usr/bin/env bash
# dossier/the-sandhya/make-old-site.sh — capture the hotel's current site before it changes
# (harvester base.md constraint 7): first-screen viewport shots and full-page shots at 390 px and
# 1440 px of the home page, plus status, first-load transfer and LCP. The page reveals sections and
# loads images on scroll, so it is scrolled one viewport at a time, slowly, before the full-page
# shot; the first-screen shot is taken after a long settle, so an animation caught midway does not
# read as a fault.
# media: dossier/the-sandhya/assets/old-site-*.png
# Writes dossier/the-sandhya/assets/old-site-{mobile,desktop}.png,
# old-site-first-screen-{mobile,desktop}.png and old-site.json. Run from anywhere.
set -euo pipefail
cd "$(dirname "$0")/../.."
URL=${1:-https://thesandhya.com/}
OUT=dossier/the-sandhya/assets
mkdir -p "$OUT"
URL="$URL" OUT="$OUT" node --input-type=module <<'JS'
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const { URL, OUT } = process.env;
const b = await chromium.launch();
const res = {};
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
for (const [name, vp, mobile] of [['mobile', { width: 390, height: 844 }, true], ['desktop', { width: 1440, height: 900 }, false]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, locale: 'en-US', ...(mobile ? { userAgent: IPHONE } : {}) });
  const p = await ctx.newPage();
  let bytes = 0;
  const hosts = new Set();
  p.on('response', async r => { try { hosts.add(new globalThis.URL(r.url()).hostname); const l = r.headers()['content-length']; bytes += l ? +l : (await r.body()).length; } catch {} });
  await p.addInitScript(() => {
    window.__lcp = 0; window.__cls = 0;
    new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const r = await p.goto(URL, { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(8000);
  const firstLoad = bytes;
  const [lcp, cls] = await p.evaluate(() => [window.__lcp, window.__cls]);
  await p.screenshot({ path: `${OUT}/old-site-first-screen-${name}.png` });
  const height = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += Math.round(vp.height * 0.7)) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(900); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(2500);
  // AOS fades each section in only while it is in the viewport, so a full-page shot leaves them blank
  // although a visitor sees them on scrolling; show them for this one shot, and clip the off-screen carousels.
  await p.addStyleTag({ content: '[data-aos]{opacity:1!important;transform:none!important;visibility:visible!important}' });
  await p.waitForTimeout(1500);
  const pageHeight = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.screenshot({ path: `${OUT}/old-site-${name}.png`, fullPage: true, clip: { x: 0, y: 0, width: vp.width, height: pageHeight } });
  res[name] = { status: r?.status(), first_load_bytes: firstLoad, lcp_ms: Math.round(lcp), cls: +cls.toFixed(3), hosts_on_load: [...hosts], page_height: pageHeight, captured_at: new Date().toISOString() };
  await ctx.close();
}
await b.close();
writeFileSync(`${OUT}/old-site.json`, JSON.stringify({ url: URL, ...res }, null, 1));
console.log(JSON.stringify(res, null, 1));
JS
