// critic 4f probe, picked composite booking page. usage: node probe-book.mjs <base-url-of-dist/> <out-dir>
// Walks Level 2 -> Twin -> Sat 20 Feb 2027, 7 nights, 1 couple -> Total -> Continue. Engine hand-off navigations are aborted
// and recorded; api.bookinglayer.io calls go live in the 'live' pass and are blocked in the 'blocked' pass.
import { chromium } from '/home/shahar/Projects/oneshot/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [base, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch();
const log = {};

async function walk(name, vp, mobile, block) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await ctx.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage();
  const engine = []; const errors = []; const all = []; let handoff = null;
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('requestfinished', async (r) => { let s = 0; try { s = (await r.sizes()).responseBodySize; } catch {} all.push({ u: r.url(), s, t: Date.now() }); });
  await p.route('**/*', (r) => {
    const u = r.request().url();
    const host = new URL(u).host;
    if (host === 'globalsurfadventures.bookinglayer.com') { handoff = u; return r.abort(); }
    if (host === 'api.bookinglayer.io') { engine.push(r.request().method() + ' ' + u.split('?')[0].replace(/^https:\/\/[^/]+/, '')); if (block) return r.abort(); }
    return r.continue();
  });
  await p.goto(base + 'book/', { waitUntil: 'load' }); await p.waitForTimeout(2000);
  const r = { errors };
  r.on_load = { engine_calls: engine.length, hosts: [...new Set(all.map((x) => new URL(x.u).host))], kb: Math.round(all.reduce((a, x) => a + x.s, 0) / 1024), videos: all.filter((x) => /\.(mp4|webm)/.test(x.u)).map((x) => x.u.split('/').pop()) };
  r.timing = await p.evaluate(() => { const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime; return performance.getEntriesByType('resource').filter((e) => /\.(mp4|webm)/.test(e.name)).map((e) => ({ f: e.name.split('/').pop(), rel_fcp: Math.round(e.startTime - fcp) })); });
  const state = async (k) => {
    await p.waitForTimeout(700);
    const s = await p.evaluate(() => {
      const vis = [...document.querySelectorAll('.step')].filter((e) => { const r = e.getBoundingClientRect(); return getComputedStyle(e).display !== 'none' && r.height > 0 && !e.hidden; }).map((e) => e.id);
      const sh = document.documentElement.scrollHeight; const footTop = document.querySelector('footer').getBoundingClientRect().top + scrollY;
      const small = []; for (const el of document.querySelectorAll('a,button,input:not([type=radio]):not([type=checkbox]),select,[role=tab],label.choose,.chip')) { const rc = el.getBoundingClientRect(); if (!rc.width || el.closest('[hidden]') || el.classList.contains('skip') || getComputedStyle(el).visibility === 'hidden') continue; if (rc.width < 44 || rc.height < 44) small.push(`${el.tagName}.${el.className} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(rc.width)}x${Math.round(rc.height)}`); }
      const h = document.querySelector('.step.cur h1, .step.cur h2.script'); const hc = h && getComputedStyle(h);
      return { hash: location.hash, search: location.search, cur: document.querySelector('.step.cur')?.id, visible_steps: vis, page_h: sh, footer_top: Math.round(footTop), viewport_h: innerHeight, title: h && `${h.textContent} / ${hc.fontFamily.split(',')[0]} ${hc.fontWeight} ${hc.fontSize}`, bar: document.querySelector('[data-s=bartotal]')?.textContent, small: small.slice(0, 10), overflow_x: document.documentElement.scrollWidth - innerWidth };
    });
    await p.screenshot({ path: `${out}/book-${name}-${k}.png` });
    return s;
  };
  r.s1_level = await state('1-level');
  await p.click('input[name=level][value=level-2-rollers]', { force: true }).catch(async () => { await p.click('.pick:nth-child(2)'); });
  await p.waitForTimeout(500);
  r.s1_level_media = await p.evaluate(() => document.querySelector('.bk-media .m.on')?.dataset.m);
  await p.click('[data-next]');
  r.s2_room = await state('2-room');
  r.s2_room_ui = await p.evaluate(() => ({ pills: [...document.querySelectorAll('#room [role=tab]')].map((e) => e.textContent + (e.getAttribute('aria-selected') === 'true' ? '*' : '')), choose: [...document.querySelectorAll('#room .choose .btn')].filter((e) => e.getBoundingClientRect().width).map((e) => { const c = getComputedStyle(e); return `${e.textContent} bg ${c.backgroundColor} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`; }), media: document.querySelector('.bk-media .m.on')?.dataset.m }));
  await p.click('#room [role=tab]:nth-child(2)'); await p.waitForTimeout(600);
  r.s2b = await state('2b-twin');
  await p.click('#b-room-twin .choose'); await p.waitForTimeout(800);
  r.s3_dates = await state('3-dates');
  r.s3_dates_options = await p.evaluate(() => ({ chips: [...document.querySelectorAll('.chip')].map((c) => c.textContent + (c.disabled ? '(x)' : '')), select_first: [...document.querySelectorAll('#f-start option')].slice(1, 4).map((o) => o.value) }));
  await p.click('[data-next]'); await p.waitForTimeout(400);
  r.s3_missing = await p.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, focus: document.activeElement?.id || document.activeElement?.className }));
  const chip = await p.$('.chip[data-v="2027-02-20"]');
  if (chip) await chip.click(); else await p.selectOption('#f-start', '2027-02-20');
  await p.click('#f-couple ~ .sb[data-d="1"]');
  await p.waitForTimeout(block ? 1500 : 6000);
  r.s3c = await state('3c-filled');
  await p.click('[data-next]'); await p.waitForTimeout(block ? 800 : 3000);
  r.s4_total = await state('4-total');
  r.s4_sum = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll('.sum [data-s]')].map((e) => [e.dataset.s, e.textContent.trim()])));
  r.s4_wa = await p.evaluate(() => decodeURIComponent(document.querySelector('#total [data-wa]')?.href || ''));
  r.s4_status = await p.evaluate(() => [...document.querySelectorAll('#total .small, #total [role=status], .live')].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 6));
  await p.goBack(); await p.waitForTimeout(500); r.after_back = await p.evaluate(() => location.hash + ' cur=' + document.querySelector('.step.cur')?.id);
  await p.goForward(); await p.waitForTimeout(500); r.after_forward = await p.evaluate(() => location.hash + ' cur=' + document.querySelector('.step.cur')?.id);
  await p.click('.go'); await p.waitForTimeout(1500);
  r.handoff = handoff; r.engine_calls = engine; r.cls = await p.evaluate(() => +window.__cls.toFixed(4)).catch(() => null);
  // deep link
  const p2 = await ctx.newPage(); await p2.goto(base + 'book/?level=level-3-riders#room'); await p2.waitForTimeout(1200);
  r.deeplink_level3_room = await p2.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, level: document.querySelector('input[name=level]:checked')?.value }));
  await p2.goto(base + 'book/?room=double'); await p2.waitForTimeout(1200);
  r.deeplink_room_double = await p2.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, room: document.querySelector('input[name=room]:checked')?.value, tab: document.querySelector('#room [aria-selected=true]')?.textContent }));
  // keyboard: tab through the first step
  await p2.goto(base + 'book/'); await p2.waitForTimeout(800);
  const tabs = []; for (let i = 0; i < 40; i++) { await p2.keyboard.press('Tab'); tabs.push(await p2.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return `${a.tagName}${a.type ? ':' + a.type : ''} ${(a.textContent || a.value || a.getAttribute('aria-label') || '').trim().slice(0, 20)} ring=${c.outlineStyle !== 'none' || c.boxShadow !== 'none' || getComputedStyle(a.closest('.pick,.fl,label') || a).boxShadow !== 'none'}`; })); }
  r.tab_first_40 = tabs;
  await ctx.close();
  return r;
}

log.phone_live = await walk('390', { width: 390, height: 844 }, true, false);
log.desktop_live = await walk('1440', { width: 1440, height: 900 }, false, false);
log.phone_blocked = await walk('390-blocked', { width: 390, height: 844 }, true, true);

// reduced motion on booking
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); const v = []; p.on('request', (r) => { if (/\.(mp4|webm)/.test(r.url())) v.push(r.url()); });
  await p.goto(base + 'book/'); await p.waitForTimeout(2500); log.reduced_videos = v.length; await ctx.close();
}
// JS off
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, javaScriptEnabled: false });
  const p = await ctx.newPage(); let handoff = '';
  await p.route('**/*', (r) => { if (new URL(r.request().url()).host === 'globalsurfadventures.bookinglayer.com') { handoff = r.request().url(); return r.abort(); } return r.continue(); });
  await p.goto(base + 'book/');
  log.nojs_visible_steps = await p.evaluate(() => [...document.querySelectorAll('.step')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => e.id));
  await p.selectOption('#f-start', '2027-02-20'); await p.selectOption('#f-end', '2027-02-27'); await p.fill('#f-couple', '1');
  await p.click('button[formaction$="level-2-rollers"]'); await p.waitForTimeout(1000);
  log.nojs_handoff = handoff; await ctx.close();
}
fs.writeFileSync(`${out}/book-probe.json`, JSON.stringify(log, null, 1));
await b.close();
console.log('ok');
