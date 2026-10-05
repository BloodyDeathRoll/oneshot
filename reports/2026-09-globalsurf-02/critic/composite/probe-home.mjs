// critic 4f probe, picked composite home page. usage: node probe-home.mjs <url> <out-dir>
import { chromium } from '/home/shahar/Projects/oneshot/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [url, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const PALETTE = ['rgb(39, 41, 62)', 'rgb(63, 66, 96)', 'rgb(255, 255, 255)', 'rgb(238, 242, 245)', 'rgb(226, 232, 237)', 'rgb(209, 64, 42)', 'rgb(183, 51, 31)', 'rgb(31, 175, 84)'];
const res = {};

async function run(name, vp, mobile, opts = {}) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference', javaScriptEnabled: !opts.nojs });
  if (opts.saveData) await ctx.addInitScript(() => { Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' } }); });
  const p = await ctx.newPage();
  const reqs = []; const errors = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('requestfinished', async (r) => { let size = 0; try { size = (await r.sizes()).responseBodySize; } catch {} reqs.push({ u: r.url(), size, phase: p.__phase || 'load' }); });
  await ctx.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await p.goto(url, { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  const r = { errors };
  if (!opts.nojs) {
    r.timing = await p.evaluate(() => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime;
      const vids = performance.getEntriesByType('resource').filter((e) => /\.(mp4|webm)/.test(e.name)).map((e) => ({ f: e.name.split('/').slice(-1)[0], start: Math.round(e.startTime), rel_fcp: Math.round(e.startTime - fcp) }));
      return { fcp: Math.round(fcp), vids };
    });
  }
  r.load_hosts = [...new Set(reqs.map((x) => new URL(x.u).host))];
  r.load_rosa = reqs.filter((x) => /rosa/.test(x.u)).map((x) => x.u);
  // first screen
  r.first_screen = await p.evaluate(() => {
    const H = innerHeight; const out = [];
    for (const a of document.querySelectorAll('a,button')) {
      const rc = a.getBoundingClientRect(); const cs = getComputedStyle(a);
      if (rc.bottom > 0 && rc.top < H && rc.width > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05) out.push({ t: a.textContent.trim().slice(0, 40), href: a.getAttribute('href'), w: Math.round(rc.width), h: Math.round(rc.height) });
    }
    const h1 = document.querySelector('h1'); const cs = getComputedStyle(h1);
    return { actions: out, h1: { text: h1.textContent, font: cs.fontFamily, weight: cs.fontWeight, size: cs.fontSize, color: cs.color, shadow: cs.textShadow } };
  });
  r.overflow_x = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (opts.full) {
    // scroll the page in steps
    p.__phase = 'scroll';
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += Math.round(vp.height * 0.6)) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(350); }
    await p.waitForTimeout(2500);
    r.cls_full_scroll = await p.evaluate(() => +window.__cls.toFixed(4));
    r.scroll_videos = reqs.filter((x) => /\.(mp4|webm)/.test(x.u)).map((x) => ({ f: x.u.split('/').slice(-1)[0], kb: Math.round(x.size / 1024) }));
    r.scroll_rosa = reqs.filter((x) => /rosa/.test(x.u)).map((x) => x.u.split('?')[0]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 8);
    r.third_party_after_scroll = [...new Set(reqs.map((x) => new URL(x.u).host))];
    // tap targets
    r.small_targets = await p.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('a,button,input,select,[role=tab],[tabindex="0"],label.choose')) {
        const rc = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (!rc.width || cs.visibility === 'hidden' || el.closest('[hidden]') || el.classList.contains('skip')) continue;
        if (el.type === 'radio' || el.type === 'checkbox') continue;
        if (rc.width < 44 || rc.height < 44) out.push({ el: el.tagName + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''), t: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: Math.round(rc.width), h: Math.round(rc.height) });
      }
      return out;
    });
    // fonts and titles
    r.titles = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,.script,blockquote,.feature p, .feature-l')].map((e) => { const c = getComputedStyle(e); return { tag: e.tagName, cls: e.className, t: e.textContent.trim().slice(0, 40), font: c.fontFamily.split(',')[0], w: c.fontWeight, size: c.fontSize, color: c.color, style: c.fontStyle }; }));
    r.fonts_loaded = await p.evaluate(async () => { await document.fonts.ready; return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`).filter((v, i, a) => a.indexOf(v) === i); });
    // palette
    r.colors = await p.evaluate(() => {
      const m = {};
      for (const el of document.querySelectorAll('body *')) {
        const c = getComputedStyle(el); const rc = el.getBoundingClientRect(); if (!rc.width || c.display === 'none' || c.visibility === 'hidden' || el.closest('svg') && el.tagName !== 'svg') continue;
        if (c.backgroundColor !== 'rgba(0, 0, 0, 0)') { const k = 'bg ' + c.backgroundColor; (m[k] ||= []).push(el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')); }
        if (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) { const k = 'fg ' + c.color; (m[k] ||= []).push(el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')); }
      }
      return Object.fromEntries(Object.entries(m).map(([k, v]) => [k, { n: v.length, ex: [...new Set(v)].slice(0, 6) }]));
    });
    r.colors_off_palette = Object.keys(r.colors).filter((k) => !PALETTE.includes(k.slice(3)));
    // keyboard
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    const seen = []; let prev = null; let stuck = 0;
    for (let i = 0; i < 90; i++) {
      await p.keyboard.press('Tab');
      const f = await p.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); const rc = a.getBoundingClientRect(); return { t: (a.textContent || a.getAttribute('aria-label') || a.tagName).trim().slice(0, 30), outline: c.outlineStyle !== 'none' && c.outlineWidth !== '0px', shadow: c.boxShadow !== 'none', vis: rc.width > 0 && rc.height > 0, inIframe: a.tagName === 'IFRAME' }; });
      const k = JSON.stringify(f); if (k === prev) stuck++; prev = k; seen.push(f);
    }
    r.tab = { stops: seen.length, first: seen.slice(0, 3).map((x) => x.t), no_ring: seen.filter((x) => !x.outline && !x.shadow).map((x) => x.t).slice(0, 15), invisible: seen.filter((x) => !x.vis).map((x) => x.t).slice(0, 15), repeated_same: stuck };
    r.text = await p.evaluate(() => document.body.innerText);
  }
  r.video_requests = reqs.filter((x) => /\.(mp4|webm)/.test(x.u)).length;
  if (opts.nojs) r.nojs = await p.evaluate(() => ({ text: document.body.innerText.length, rosa: document.querySelector('#waves')?.innerText.slice(0, 400), book_links: [...document.querySelectorAll('a[href*="book/"]')].map((a) => a.getAttribute('href')).slice(0, 10) }));
  if (opts.tap) {
    const cta = p.locator('.hero a').first();
    const href = await cta.getAttribute('href');
    await cta.click(); await p.waitForTimeout(1500);
    r.hero_cta = { href, landed: p.url(), step: await p.evaluate(() => document.querySelector('.step.cur')?.id || null) };
  }
  if (opts.shot) await p.screenshot({ path: `${out}/${name}-first.png` });
  await ctx.close();
  return r;
}

res.phone = await run('phone', { width: 390, height: 844 }, true, { full: true, shot: true });
res.desktop = await run('desktop', { width: 1440, height: 900 }, false, { full: true, shot: true });
res.phone_tap = await run('phone-tap', { width: 390, height: 844 }, true, { tap: true });
res.phone_reduced = await run('phone-reduced', { width: 390, height: 844 }, true, { reduced: true, full: true });
res.desktop_reduced = await run('desktop-reduced', { width: 1440, height: 900 }, false, { reduced: true, full: true });
res.phone_savedata = await run('phone-savedata', { width: 390, height: 844 }, true, { saveData: true, full: true });
res.phone_nojs = await run('phone-nojs', { width: 390, height: 844 }, true, { nojs: true });
for (const k of ['phone_reduced', 'desktop_reduced', 'phone_savedata']) { for (const f of ['text', 'colors', 'titles', 'tab', 'small_targets']) delete res[k][f]; }
fs.writeFileSync(`${out}/home-text.txt`, res.phone.text); fs.writeFileSync(`${out}/home-text-desktop.txt`, res.desktop.text);
delete res.phone.text; delete res.desktop.text;
fs.writeFileSync(`${out}/home-probe.json`, JSON.stringify(res, null, 1));
await b.close();
console.log('ok');
