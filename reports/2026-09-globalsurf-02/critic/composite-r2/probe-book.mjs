// critic 4f round-2 probe, picked composite booking page (the round-6 flow: level tap advances, "Choose this room",
// hand-off in the bar). usage: node probe-book.mjs <base-url-of-dist/> <out-dir>
// Walk: Level 2 (tap) -> Room (Next with none chosen, then Twin, Choose) -> Sat 20 Feb 2027, 7 nights, 1 couple -> Total -> Continue booking.
// Engine hand-off navigations are aborted and recorded. Passes: live API, API blocked, API mocked to "only the dorm is free".
import { chromium } from '/home/shahar/.superset/worktrees/oneshot/nine-gruyere-2605b615/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [base, out] = process.argv.slice(2);
fs.mkdirSync(`${out}/book-walk`, { recursive: true });
const b = await chromium.launch();
const PALETTE = ['rgb(39, 41, 62)', 'rgb(63, 66, 96)', 'rgb(255, 255, 255)', 'rgb(238, 242, 245)', 'rgb(226, 232, 237)', 'rgb(209, 64, 42)', 'rgb(183, 51, 31)', 'rgb(31, 175, 84)'];
const log = {};

async function walk(name, vp, mobile, mode) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await ctx.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  const p = await ctx.newPage();
  const engine = []; const errors = []; const all = []; let handoff = null;
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
        if (/accommodations\/availabilities/.test(u)) return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ data: [{ translations: { en: { title: 'Mixed dorm room - 4 beds' } }, price: { from: 0 } }] }) });
        if (/packages\/.*\/items/.test(u)) return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ data: { totals: { base: 2932 } } }) });
        if (/availabilities/.test(u)) return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ data: { dates: { '2027-02-20': { choosable: true } } } }) });
      }
    }
    return r.continue();
  });
  await p.goto(base + 'book/', { waitUntil: 'load' }); await p.waitForTimeout(2000);
  const r = { mode, errors };
  r.on_load = { engine_calls: engine.length, hosts: [...new Set(all.map((x) => new URL(x.u).host))], kb: Math.round(all.reduce((a, x) => a + x.s, 0) / 1024), videos: all.filter((x) => /\.(mp4|webm)/.test(x.u)).map((x) => x.u.split('/').pop()) };
  const state = async (k) => {
    await p.waitForTimeout(700);
    const s = await p.evaluate((PALETTE) => {
      const H = innerHeight;
      const rect = (el) => { if (!el) return null; const rc = el.getBoundingClientRect(); if (!rc.width) return null; return { top: Math.round(rc.top), bottom: Math.round(rc.bottom), in_view: rc.top >= 0 && rc.bottom <= H }; };
      const vis = [...document.querySelectorAll('.step')].filter((e) => getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0).map((e) => e.id);
      const small = []; for (const el of document.querySelectorAll('a,button,input:not([type=radio]):not([type=checkbox]),select,[role=tab],label.choose,.chip')) { const rc = el.getBoundingClientRect(); if (!rc.width || el.closest('[hidden]') || el.classList.contains('skip') || getComputedStyle(el).visibility === 'hidden') continue; if (rc.width < 44 || rc.height < 44) small.push(`${el.tagName}.${el.className} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(rc.width)}x${Math.round(rc.height)}`); }
      const off = {};
      for (const el of document.querySelectorAll('body *')) {
        const c = getComputedStyle(el); const rc = el.getBoundingClientRect(); if (!rc.width || c.display === 'none' || c.visibility === 'hidden' || (el.closest('svg') && el.tagName !== 'svg')) continue;
        const tag = el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '');
        if (c.backgroundColor !== 'rgba(0, 0, 0, 0)' && !PALETTE.includes(c.backgroundColor)) (off['bg ' + c.backgroundColor] ||= new Set()).add(tag);
        if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && !PALETTE.includes(c.color)) (off['fg ' + c.color] ||= new Set()).add(tag);
      }
      const bar = document.querySelector('#snav'); const next = document.querySelector('[data-next]'); const go = document.querySelector('.snav .go');
      const panel = [...document.querySelectorAll('#room .room-panel')].find((x) => !x.hidden);
      const choose = panel && panel.querySelector('.choose .btn');
      return {
        hash: location.hash, search: location.search, cur: document.querySelector('.step.cur')?.id, visible_steps: vis, viewport_h: H,
        bar: bar && { ...rect(bar), text: document.querySelector('.snav-t')?.textContent.trim(), next: next.hidden ? 'hidden' : `${next.textContent.trim()} ${next.className}`, go: go.hidden ? 'hidden' : `${go.textContent.trim()} ${JSON.stringify(rect(go))}` },
        room_checked: document.querySelector('input[name=room]:checked')?.value || null,
        pills: [...document.querySelectorAll('#room [role=tab]')].map((e) => e.textContent + (e.getAttribute('aria-selected') === 'true' ? '[viewed]' : '') + (e.classList.contains('chosen') ? '[chosen-tick]' : '')),
        choose: choose && document.querySelector('.step.cur')?.id === 'room' ? { text: choose.textContent.trim(), bg: getComputedStyle(choose).backgroundColor, ...rect(choose), under_bar: bar ? choose.getBoundingClientRect().bottom > bar.getBoundingClientRect().top : null } : null,
        rstate: panel ? [...document.querySelectorAll('#room [data-rstate]')].filter((e) => !e.hidden).map((e) => e.textContent) : null,
        title: document.querySelector('.step.cur .script')?.textContent,
        small: small.slice(0, 10), overflow_x: document.documentElement.scrollWidth - innerWidth,
        off_palette: Object.fromEntries(Object.entries(off).map(([k, v]) => [k, [...v].slice(0, 5)]))
      };
    }, PALETTE);
    await p.screenshot({ path: `${out}/book-walk/${name}-${k}.png` });
    return s;
  };
  r.s1_level = await state('1-level');
  r.s1_picks = await p.evaluate(() => [...document.querySelectorAll('.pick')].map((e) => { const rc = e.getBoundingClientRect(); return `${e.querySelector('strong').textContent} top ${Math.round(rc.top)} bottom ${Math.round(rc.bottom)}`; }));
  await p.click('.pick:nth-child(2)');
  await p.waitForTimeout(900);
  r.s2_room_arrival = await state('2-room-arrival');
  await p.click('[data-next]'); await p.waitForTimeout(900);
  r.s2_next_without_room = await p.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, focus: document.activeElement?.closest('.choose') ? 'choose input' : document.activeElement?.tagName, scrollY: Math.round(scrollY) }));
  await p.evaluate(() => scrollTo(0, 0));
  await p.click('#room [role=tab]:nth-child(2)'); await p.waitForTimeout(700);
  r.s2_twin_viewed = await state('2b-twin');
  await p.click('#b-room-twin .choose .btn'); await p.waitForTimeout(1200);
  r.s3_dates = await state('3-dates');
  r.s3_dates_options = await p.evaluate(() => ({ chips: [...document.querySelectorAll('.chip')].map((c) => c.textContent + (c.disabled ? '(x)' : '')).slice(0, 6), select_first: [...document.querySelectorAll('#f-start option')].slice(1, 3).map((o) => o.value) }));
  await p.click('[data-next]'); await p.waitForTimeout(400);
  r.s3_missing = await p.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, focus: document.activeElement?.className || document.activeElement?.id }));
  const chip = await p.$('.chip[data-v="2027-02-20"]');
  if (chip) await chip.click(); else await p.selectOption('#f-start', '2027-02-20');
  await p.click('#f-couple ~ .sb[data-d="1"]');
  await p.waitForTimeout(mode === 'live' ? 6000 : 1500);
  r.s3c = await state('3c-filled');
  await p.click('[data-next]'); await p.waitForTimeout(mode === 'live' ? 3000 : 900);
  r.s4_total = await state('4-total');
  r.s4_sum = await p.evaluate(() => Object.fromEntries([...document.querySelectorAll('.sum [data-s]')].map((e) => [e.dataset.s, e.textContent.trim()])));
  r.s4_wa = await p.evaluate(() => decodeURIComponent(document.querySelector('#total [data-wa]')?.href || ''));
  await p.goBack(); await p.waitForTimeout(500); r.after_back = await p.evaluate(() => location.hash + ' cur=' + document.querySelector('.step.cur')?.id);
  await p.goForward(); await p.waitForTimeout(500); r.after_forward = await p.evaluate(() => location.hash + ' cur=' + document.querySelector('.step.cur')?.id);
  await p.click('.snav .go'); await p.waitForTimeout(1500);
  r.handoff = handoff; r.engine_calls = engine; r.cls = await p.evaluate(() => +window.__cls.toFixed(4)).catch(() => null);
  if (mode === 'live') {
    const p2 = await ctx.newPage();
    for (const [k, u] of [['level3_room', 'book/?level=level-3-riders#room'], ['home_room_double', 'book/?room=double#room'], ['room_double_nohash', 'book/?room=double']]) {
      await p2.goto(base + u); await p2.waitForTimeout(1200);
      r['deeplink_' + k] = await p2.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, level: document.querySelector('input[name=level]:checked')?.value, room: document.querySelector('input[name=room]:checked')?.value || null, viewed: document.querySelector('#room [aria-selected=true]')?.textContent, chosen_btn: [...document.querySelectorAll('#room .room-panel')].find((x) => !x.hidden)?.querySelector('.choose .btn')?.textContent.trim() }));
    }
    await p2.goto(base + 'book/'); await p2.waitForTimeout(800);
    const tabs = []; for (let i = 0; i < 30; i++) { await p2.keyboard.press('Tab'); tabs.push(await p2.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return `${a.tagName}${a.type ? ':' + a.type : ''} ${(a.textContent || a.value || a.getAttribute('aria-label') || '').trim().slice(0, 20)} ring=${c.outlineStyle !== 'none' || c.boxShadow !== 'none' || getComputedStyle(a.closest('.pick,.fl,label') || a).boxShadow !== 'none' || getComputedStyle(a.closest('.pick') || a).outlineStyle !== 'none'}`; })); }
    r.tab_first_30 = tabs;
    // keyboard: choose a level with arrows (must not jump), then Next, then choose a room with Space
    await p2.goto(base + 'book/'); await p2.waitForTimeout(800);
    await p2.focus('input[name=level][value=level-1-fomies]'); await p2.keyboard.press('ArrowDown'); await p2.waitForTimeout(600);
    r.kbd_arrow_level = await p2.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, level: document.querySelector('input[name=level]:checked')?.value }));
    await p2.click('[data-next]'); await p2.waitForTimeout(700);
    await p2.focus('#b-room-dorm .choose input'); await p2.keyboard.press('Space'); await p2.waitForTimeout(900);
    r.kbd_space_room = await p2.evaluate(() => ({ cur: document.querySelector('.step.cur')?.id, room: document.querySelector('input[name=room]:checked')?.value }));
  }
  await ctx.close();
  return r;
}

log.phone_live = await walk('390', { width: 390, height: 844 }, true, 'live');
log.desktop_live = await walk('1440', { width: 1440, height: 900 }, false, 'live');
log.phone_blocked = await walk('390-blocked', { width: 390, height: 844 }, true, 'blocked');
log.phone_mock_dorm_only = await walk('390-mock', { width: 390, height: 844 }, true, 'mock-dorm-only');
// small phone
log.phone_small_live = await walk('360x640', { width: 360, height: 640 }, true, 'blocked');

{ // reduced motion
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); const v = []; p.on('request', (r) => { if (/\.(mp4|webm)/.test(r.url())) v.push(r.url()); });
  await p.goto(base + 'book/'); await p.waitForTimeout(2500); log.reduced_videos_desktop = v.length; await ctx.close();
}
{ // phone video
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); const v = []; p.on('request', (r) => { if (/\.(mp4|webm)/.test(r.url())) v.push(r.url()); });
  await p.goto(base + 'book/'); await p.waitForTimeout(3000); log.phone_video_requests = v; await ctx.close();
}
{ // JS off
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, javaScriptEnabled: false });
  const p = await ctx.newPage(); let handoff = '';
  await p.route('**/*', (r) => { if (new URL(r.request().url()).host === 'globalsurfadventures.bookinglayer.com') { handoff = r.request().url(); return r.abort(); } return r.continue(); });
  await p.goto(base + 'book/');
  log.nojs_visible_steps = await p.evaluate(() => [...document.querySelectorAll('.step')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => e.id));
  log.nojs_first_start = await p.evaluate(() => [...document.querySelectorAll('#f-start option')].slice(1, 3).map((o) => o.value));
  await p.selectOption('#f-start', '2027-02-20'); await p.fill('#f-couple', '1');
  await p.click('button[formaction$="level-2-rollers"]'); await p.waitForTimeout(800);
  log.nojs_submit_without_end = handoff || 'blocked (no request)';
  await p.selectOption('#f-end', '2027-02-27');
  await p.click('button[formaction$="level-2-rollers"]'); await p.waitForTimeout(1000);
  log.nojs_handoff = handoff; await ctx.close();
}
fs.writeFileSync(`${out}/book-probe.json`, JSON.stringify(log, null, 1));
await b.close();
console.log('ok');
