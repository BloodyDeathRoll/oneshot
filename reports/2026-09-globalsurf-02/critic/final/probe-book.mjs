// critic station 5 round 1 probe, final site booking flow (4g build). usage: node probe-book.mjs <base-url/> <out-dir>
// Walk from the HOME hero, counting taps: hero "Book package now" -> Level 2 -> Twin pill -> Choose this room
// -> + couple -> first offered Saturday (20 Feb 2027 when offered) -> Next -> Continue booking (bar).
// Engine hand-off navigations are aborted and recorded. Passes: live, blocked, mocked "dorm only", mocked "date struck".
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [base, out] = process.argv.slice(2);
fs.mkdirSync(`${out}/book-walk`, { recursive: true });
const b = await chromium.launch();
const log = {};
const J = (body) => ({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) });

async function walk(name, vp, mobile, mode) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await ctx.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage();
  const engine = []; const errors = []; const all = []; let handoff = null; let taps = 0;
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('requestfinished', async (r) => { let s = 0; try { s = (await r.sizes()).responseBodySize; } catch {} all.push({ u: r.url(), s }); });
  await p.route('**/*', (r) => {
    const u = r.request().url(); const host = new URL(u).host;
    if (host === 'globalsurfadventures.bookinglayer.com') { handoff = u; return r.abort(); }
    if (host === 'api.bookinglayer.io') {
      engine.push(r.request().method() + ' ' + u.split('?')[0].replace(/^https:\/\/[^/]+/, ''));
      if (mode === 'blocked') return r.abort();
      if (mode === 'mock-dorm-only') {
        if (/accommodations\/availabilities/.test(u)) return r.fulfill(J({ data: [{ translations: { en: { title: 'Mixed dorm room - 4 beds' } }, price: { from: 0 } }] }));
        if (/packages\/.*\/items/.test(u)) return r.fulfill(J({ data: { totals: { base: 2932 } } }));
        if (/availabilities/.test(u)) return r.fulfill(J({ data: { dates: { '2027-02-20': { choosable: true } } } }));
      }
      if (mode === 'mock-date-struck') {
        // calendar offers 20 Feb for 1 couple; after a second guest is added it no longer does
        const two = /couple=1/.test(u) && /female=1/.test(u);
        if (/products\/.*\/availabilities/.test(u)) return r.fulfill(J({ data: { dates: two ? { '2027-02-27': { choosable: true } } : { '2027-02-20': { choosable: true }, '2027-02-27': { choosable: true } } } }));
        return r.abort();
      }
    }
    return r.continue();
  });
  const tap = async (sel) => { await p.click(sel); taps++; };
  await p.goto(base, { waitUntil: 'load' }); await p.waitForTimeout(1200);
  await tap('a.btn-book.btn-lg[href="book/"] >> nth=0');
  await p.waitForLoadState('load'); await p.waitForTimeout(2000);
  const r = { mode, errors, landed: p.url() };
  r.on_load = { engine_calls: engine.length, hosts: [...new Set(all.map((x) => new URL(x.u).host))], videos: all.filter((x) => /\.(mp4|webm)/.test(x.u)).map((x) => x.u.split('/').pop()) };
  const state = async (k) => {
    await p.waitForTimeout(700);
    const s = await p.evaluate(() => {
      const H = innerHeight;
      const rect = (el) => { if (!el) return null; const rc = el.getBoundingClientRect(); if (!rc.width) return null; return { top: Math.round(rc.top), bottom: Math.round(rc.bottom), in_view: rc.top >= 0 && rc.bottom <= H }; };
      const bar = document.querySelector('#snav'); const next = document.querySelector('[data-next]'); const go = document.querySelector('.snav .go'); const fix = document.querySelector('.snav .fix');
      const panel = [...document.querySelectorAll('#room .room-panel')].find((x) => !x.hidden);
      const choose = panel && panel.querySelector('.choose .btn');
      const small = []; for (const el of document.querySelectorAll('a,button,input:not([type=radio]):not([type=checkbox]),select,[role=tab],label.choose,.chip')) { const rc = el.getBoundingClientRect(); if (!rc.width || el.closest('[hidden]') || el.classList.contains('skip') || getComputedStyle(el).visibility === 'hidden') continue; if (rc.width < 44 || rc.height < 44) small.push(`${el.tagName}.${el.className} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(rc.width)}x${Math.round(rc.height)}`); }
      return {
        hash: location.hash, search: location.search, cur: document.querySelector('.step.cur')?.id,
        level: document.querySelector('input[name=level]:checked')?.value || null,
        room_checked: document.querySelector('input[name=room]:checked')?.value || null,
        bar: bar && { ...rect(bar), text: document.querySelector('.snav-t')?.textContent.trim().replace(/\s+/g, ' '), next: next.hidden ? 'hidden' : `${next.textContent.trim()} ${next.className}`, go: go.hidden ? 'hidden' : `${go.textContent.trim()} ${JSON.stringify(rect(go))}`, fix: fix && !fix.hidden ? fix.textContent.trim() : 'hidden' },
        choose: choose && document.querySelector('.step.cur')?.id === 'room' ? { text: choose.textContent.trim(), ...rect(choose), under_bar: bar ? choose.getBoundingClientRect().bottom > bar.getBoundingClientRect().top : null } : null,
        dmsg: [...document.querySelectorAll('[data-dmsg]')].filter((e) => !e.hidden && e.closest('.step.cur')).map((e) => e.textContent.trim().replace(/\s+/g, ' ')),
        rstate: [...document.querySelectorAll('#room [data-rstate]')].filter((e) => !e.hidden).map((e) => e.textContent.trim()),
        nights_field: rect(document.querySelector('fieldset.seg')), guests_field: rect(document.querySelector('.guests')),
        small: small.slice(0, 10), overflow_x: document.documentElement.scrollWidth - innerWidth
      };
    });
    await p.screenshot({ path: `${out}/book-walk/${name}-${k}.png` });
    return s;
  };
  r.s1_level = await state('1-level');
  await tap('.pick:nth-child(2)'); await p.waitForTimeout(900);
  r.s2_room_arrival = await state('2-room-arrival');
  await tap('#room [role=tab]:nth-child(2)'); await p.waitForTimeout(700);
  await tap('#b-room-twin .choose .btn'); await p.waitForTimeout(1200);
  r.s3_dates_arrival = await state('3-dates');
  if (mode === 'mock-date-struck') { await p.click('#f-couple ~ .sb[data-d="1"]'); }
  else await tap('#f-couple ~ .sb[data-d="1"]');
  await p.waitForTimeout(mode === 'live' ? 6000 : 1800);
  r.s3_chips = await p.evaluate(() => [...document.querySelectorAll('.chip')].map((c) => c.dataset.v + (c.disabled ? '(x)' : '')));
  const want = await p.evaluate(() => { const c = document.querySelector('.chip[data-v="2027-02-20"]:not(:disabled)') || document.querySelector('.chip:not(:disabled)'); return c ? c.dataset.v : null; });
  r.date_chosen = want;
  if (want) await tap(`.chip[data-v="${want}"]`);
  if (mode === 'mock-date-struck') {
    await p.waitForTimeout(800);
    await p.click('#f-female ~ .sb[data-d="1"]'); await p.waitForTimeout(2200);
    r.s3_struck = await state('3s-struck');
    r.s3_struck_start = await p.evaluate(() => document.querySelector('#f-start').value);
    await p.click('[data-next]'); await p.waitForTimeout(600);
    r.s3_struck_next = await p.evaluate(() => document.querySelector('.step.cur')?.id);
    r.s3_struck_submit = await p.evaluate(() => { const f = document.querySelector('#bk'); const ev = new Event('submit', { cancelable: true }); f.dispatchEvent(ev); return ev.defaultPrevented ? 'blocked' : 'sent'; });
    await ctx.close(); return { ...r, handoff };
  }
  await p.waitForTimeout(mode === 'live' ? 6000 : 1500);
  r.s3c = await state('3c-filled');
  await tap('[data-next]'); await p.waitForTimeout(mode === 'live' ? 3000 : 900);
  r.s4_total = await state('4-total');
  r.s4_sum = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll('.sum [data-s]')].map((e) => [e.dataset.s, e.textContent.trim()])));
  r.s4_wa = await p.evaluate(() => decodeURIComponent(document.querySelector('[data-wa]')?.href || ''));
  if (mode === 'mock-dorm-only') {
    r.s4_go_hidden = await p.evaluate(() => document.querySelector('.snav .go').hidden);
    r.s4_submit = await p.evaluate(() => { const f = document.querySelector('#bk'); const ev = new Event('submit', { cancelable: true }); f.dispatchEvent(ev); return ev.defaultPrevented ? 'blocked' : 'sent'; });
    // choose the dorm the engine says is free
    await p.evaluate(() => { location.hash = '#room'; }); await p.waitForTimeout(800);
    await p.click('#room [role=tab]:nth-child(1)'); await p.waitForTimeout(500);
    await p.click('#b-room-dorm .choose .btn'); await p.waitForTimeout(1500);
    await p.click('[data-next]').catch(() => {}); await p.waitForTimeout(1200);
    r.s4b_after_dorm = await state('4b-dorm');
    r.s4b_sum = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll('.sum [data-s]')].map((e) => [e.dataset.s, e.textContent.trim()])));
  }
  const goVisible = await p.evaluate(() => !document.querySelector('.snav .go').hidden);
  if (goVisible) await tap('.snav .go'); await p.waitForTimeout(1500);
  r.taps_home_hero_to_engine = taps;
  r.handoff = handoff; r.engine_calls = engine; r.cls = await p.evaluate(() => +window.__cls.toFixed(4)).catch(() => null);
  await ctx.close();
  return r;
}

log.phone_live = await walk('390', { width: 390, height: 844 }, true, 'live');
log.desktop_live = await walk('1440', { width: 1440, height: 900 }, false, 'live');
log.phone_blocked = await walk('390-blocked', { width: 390, height: 844 }, true, 'blocked');
log.phone_mock_dorm_only = await walk('390-mock', { width: 390, height: 844 }, true, 'mock-dorm-only');
log.phone_mock_date_struck = await walk('390-struck', { width: 390, height: 844 }, true, 'mock-date-struck');
log.phone_small_blocked = await walk('360x640', { width: 360, height: 640 }, true, 'blocked');

{ // deep links from home "Choose this room" and level CTAs
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.route('**/*', (r) => (/bookinglayer/.test(r.request().url()) ? r.abort() : r.continue()));
  await p.goto(base); await p.waitForTimeout(800);
  log.home_book_hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href*="book/"]')].map((a) => `${a.textContent.trim().slice(0, 24)} -> ${a.getAttribute('href')}`))]);
  for (const [k, u] of [['room_double', 'book/?room=double'], ['level3', 'book/?level=level-3-riders']]) {
    await p.goto(base + u); await p.waitForTimeout(1200);
    log['deeplink_' + k] = await p.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, level: document.querySelector('input[name=level]:checked')?.value || null, room: document.querySelector('input[name=room]:checked')?.value || null, next: document.querySelector('[data-next]').className }));
  }
  // room_double: Next without level stays
  await p.goto(base + 'book/?room=double'); await p.waitForTimeout(1000);
  await p.click('[data-next]'); await p.waitForTimeout(500);
  log.deeplink_room_double_next_without_level = await p.evaluate(() => document.querySelector('.step.cur')?.id);
  await p.click('.pick:nth-child(3)'); await p.waitForTimeout(900);
  log.deeplink_room_double_after_level3 = await p.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, room: document.querySelector('input[name=room]:checked')?.value || null }));
  // keyboard: 40 tabs on booking page
  await p.goto(base + 'book/'); await p.waitForTimeout(800);
  const tabs = []; for (let i = 0; i < 40; i++) { await p.keyboard.press('Tab'); tabs.push(await p.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); const host = a.closest('.pick,.fl,label') || a; return `${a.tagName}${a.type ? ':' + a.type : ''} ${(a.textContent || a.value || a.getAttribute('aria-label') || '').trim().slice(0, 20)} ring=${c.outlineStyle !== 'none' || c.boxShadow !== 'none' || getComputedStyle(host).boxShadow !== 'none' || getComputedStyle(host).outlineStyle !== 'none'}`; })); }
  log.tab_first_40 = tabs;
  await ctx.close();
}
{ // reduced motion + phone video on booking
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); const v = []; p.on('request', (r) => { if (/\.(mp4|webm)/.test(r.url())) v.push(r.url()); });
  await p.goto(base + 'book/'); await p.waitForTimeout(2500); log.reduced_videos_desktop = v.length; await ctx.close();
  const c2 = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p2 = await c2.newPage(); const v2 = []; p2.on('request', (r) => { if (/\.(mp4|webm)/.test(r.url())) v2.push(r.url()); });
  await p2.goto(base + 'book/'); await p2.waitForTimeout(3000); log.phone_video_requests = v2; await c2.close();
}
{ // JS off
  for (const [k, vp] of [['390', { width: 390, height: 844 }], ['1440', { width: 1440, height: 900 }]]) {
    const ctx = await b.newContext({ viewport: vp, javaScriptEnabled: false });
    const p = await ctx.newPage(); let handoff = '';
    await p.route('**/*', (r) => { if (new URL(r.request().url()).host === 'globalsurfadventures.bookinglayer.com') { handoff = r.request().url(); return r.abort(); } return r.continue(); });
    await p.goto(base + 'book/');
    const o = {};
    o.visible_steps = await p.evaluate(() => [...document.querySelectorAll('.step')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => e.id));
    o.first_start = await p.evaluate(() => [...document.querySelectorAll('#f-start option')].slice(1, 3).map((o) => o.value));
    await p.selectOption('#f-start', '2027-02-20'); await p.fill('#f-couple', '1');
    await p.click('button[formaction$="level-2-rollers"]', { force: true, timeout: 8000 }).catch((e) => { o.click_err = (o.click_err || []).concat(e.message.split("\n")[0]); }); await p.waitForTimeout(800);
    o.submit_without_duration = handoff || 'blocked (no request)';
    await p.selectOption('#f-dur', '8');
    await p.click('button[formaction$="level-2-rollers"]', { force: true, timeout: 8000 }).catch((e) => { o.click_err = (o.click_err || []).concat(e.message.split("\n")[0]); }); await p.waitForTimeout(1000);
    o.handoff = handoff; log['nojs_' + k] = o; await ctx.close();
  }
}
fs.writeFileSync(`${out}/book-probe.json`, JSON.stringify(log, null, 1));
await b.close();
console.log('ok');
