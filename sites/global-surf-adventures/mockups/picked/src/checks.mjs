// Checks for the picked composite: tap targets, reduced motion, poster paint on a throttled phone, first-load weight.
// usage: node checks.mjs <base-url>
import { chromium } from 'playwright';
const base = process.argv[2];
const b = await chromium.launch();
const out = {};

// 1. tap targets >= 44 px (visible interactive elements), home + each booking step, 390 and 1440
const taps = async (p) => p.evaluate(() => {
  const bad = [];
  document.querySelectorAll('a[href],button,input[type=radio]+span,label.pick,label.choose,.chip,select,input:not([type=radio]):not([type=hidden])').forEach((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    if (!r.width || !r.height || cs.visibility === 'hidden' || el.closest('[hidden]') || el.closest('.menu')) return;
    if (el.closest('.skip')) return;
    if (r.width < 44 || r.height < 44) bad.push(`${el.tagName.toLowerCase()}.${el.className} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
  });
  return bad;
});
for (const [w, h, mob] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob });
  const p = await ctx.newPage();
  await p.route(/bookinglayer|rosa/, (r) => r.abort());
  await p.goto(base); await p.waitForTimeout(800);
  out[`taps-home-${w}`] = await taps(p);
  for (const s of ['level', 'room', 'dates', 'total']) {
    await p.goto(base + 'book/#' + s); await p.waitForTimeout(600);
    out[`taps-book-${s}-${w}`] = await taps(p);
  }
  await ctx.close();
}

// 2. reduced motion: no video source attached, no video visible
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', isMobile: true });
  const p = await ctx.newPage(); const vids = [];
  p.on('request', (r) => { if (/\.(webm|mp4)$/.test(r.url())) vids.push(r.url()); });
  await p.goto(base); await p.waitForTimeout(2500);
  await p.mouse.wheel(0, 2500); await p.waitForTimeout(1500);
  await p.goto(base + 'book/'); await p.waitForTimeout(2000);
  out.reducedMotionVideoRequests = vids;
  await ctx.close();
}

// 3. poster paint on a throttled phone (Slow 4G-ish: 1.6 Mb/s, 150 ms RTT, CPU x4), cold cache
for (const [w, h, mob] of [[390, 844, true], [1440, 900, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const bytes = { total: 0, video: 0, byType: {} };
  p.on('response', async (r) => {
    try { const len = +(r.headers()['content-length'] || (await r.body()).length); const t = r.request().resourceType();
      if (/\.(webm|mp4)/.test(r.url())) bytes.video += len; else { bytes.total += len; bytes.byType[t] = (bytes.byType[t] || 0) + len; } } catch {}
  });
  await p.addInitScript(() => {
    window.__lcp = []; new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lcp.push({ t: Math.round(e.startTime), el: e.element && (e.element.currentSrc || e.element.tagName) }))).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await p.goto(base, { waitUntil: 'load' });
  await p.waitForTimeout(6000);
  const m = await p.evaluate(() => {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    const img = document.querySelector('.hero-p img');
    const poster = performance.getEntriesByType('resource').find((e) => /hero-poster/.test(e.name));
    return { fcp: fcp && Math.round(fcp.startTime), lcp: window.__lcp, posterSrc: img.currentSrc.split('/').pop(), posterDone: poster && Math.round(poster.responseEnd), posterBytes: poster && poster.transferSize };
  });
  out[`paint-${w}`] = { ...m, firstLoadBytesNoVideo: bytes.total, byType: bytes.byType, videoBytes: bytes.video };
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out, null, 1));
