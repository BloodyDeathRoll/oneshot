#!/usr/bin/env node
/*
dossier/the-sandhya/funnel/make-walk.mjs — the auditor's hand walk (station 3b, auditor 0.1.3) of
thesandhya.com and its off-site path, as a phone sees it. It measures what tools/funnel.mjs cannot
see: the fixed RESERVE button is an <a> with no href, opened by script.

Screenshots go to funnel/shots/ (scratch, never in the media manifest; dossier/ is exempt from
tools/clean-shots.mjs), so this file declares no media of its own. Facts go to funnel/walk-hand.json.

Read-only. No login, no form submission, no booking started, no contact, no personal data. The
Cloudbeds engine is not opened in the site walk: requests to it are aborted, and the panel's submit
is cancelled by a capture listener, so the site's own script builds the hand-off URL, it is read
back, and nothing is sent. Step 90 loads the engine once, plainly, with the same browser settings as
tools/funnel.mjs (no user-agent override, no stealth, no retry), and records what came back. A 403
to a headless browser is a wall, not a fault of the hotel, and it is not worked around here.

Run from the repo root: node dossier/the-sandhya/funnel/make-walk.mjs [step-prefix ...]
With no argument it runs every step and rewrites walk-hand.json. With prefixes it runs only those
steps and merges them into the existing walk-hand.json.
*/
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';

const DIR = 'dossier/the-sandhya/funnel';
const OUT = `${DIR}/shots`;
const JSON_OUT = `${DIR}/walk-hand.json`;
const only = process.argv.slice(2);
const want = (id) => !only.length || only.some((p) => id.startsWith(p));
mkdirSync(OUT, { recursive: true });

const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SITE = 'https://thesandhya.com';
const ENGINE = 'https://hotels.cloudbeds.com/reservation/WMvA6V';
const GOOGLE = 'https://www.google.com/maps/place/The+Sandhya/@5.9769788,80.3525613,17z/data=!4m9!3m8!1s0x3ae1134e3ce889b1:0x41288b6ad09d4032!5m2!4m1!1i2!8m2!3d5.9769788!4d80.3525613!16s%2Fg%2F11f1gbc2nq?hl=en';
const TRIP = 'https://au.trip.com/hotels/ahangama-hotel-detail-10660372/hotel';
const MICHELIN = 'https://guide.michelin.com/en/hotels-stays/ahangama/the-sandhya-13690';
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-US' };
const rel = (f) => `funnel/shots/${f}`;

const b = await chromium.launch();
const steps = [];

// The site walk: a phone. The engine host is aborted, so a tap only records where it would go.
async function phone() {
  const ctx = await b.newContext({ ...PHONE, userAgent: IPHONE });
  await ctx.route(/cloudbeds\.com/, (r) => r.abort());
  return ctx;
}

async function shot(p, file) { await p.screenshot({ path: `${OUT}/${file}` }); return rel(file); }

// Scroll to the first visible text holding `needle`, let scroll-reveal run, screenshot the viewport.
async function shotAt(p, needle, file) {
  const y = await p.evaluate((n) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node;
    while ((node = w.nextNode())) {
      if (!node.textContent.includes(n)) continue;
      const r = node.parentElement.getBoundingClientRect();
      if (r.height && r.width) {
        const top = Math.round(r.top + scrollY);
        // scrollIntoView, not window.scrollTo: Google Maps scrolls inside its own side panel.
        node.parentElement.scrollIntoView({ block: 'center' });
        return top;
      }
    }
    return null;
  }, needle);
  if (y === null) return { needle, found: false };
  await p.waitForTimeout(1800);
  return { needle, y, screenshot: await shot(p, file) };
}

async function shotSel(p, sel, file) {
  const y = await p.evaluate((s) => { const el = [...document.querySelectorAll(s)].find((x) => x.getBoundingClientRect().height > 0); return el ? Math.round(el.getBoundingClientRect().top + scrollY) : null; }, sel);
  if (y === null) return { sel, found: false };
  await p.evaluate((v) => window.scrollTo(0, Math.max(0, v - 300)), y); await p.waitForTimeout(1800);
  return { sel, y, screenshot: await shot(p, file) };
}

// Every word on the first screen, read from the DOM, whatever the veil is doing.
const firstScreenText = () => {
  const out = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const t = n.textContent.replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const el = n.parentElement;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    if (!r.width || !r.height || s.visibility === 'hidden' || s.display === 'none' || +s.opacity === 0) continue;
    if (r.top >= innerHeight || r.bottom <= 0 || r.left >= innerWidth || r.right <= 0) continue;
    out.push(t);
  }
  return [...new Set(out)];
};

// The RESERVE control in the header.
const reserveInfo = () => {
  const els = [...document.querySelectorAll('a, button')].filter((e) => /^reserve$/i.test((e.innerText || '').trim()));
  return els.map((e) => {
    const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    let fixed = false; for (let x = e; x; x = x.parentElement) if (['fixed', 'sticky'].includes(getComputedStyle(x).position)) fixed = true;
    return { tag: e.tagName.toLowerCase(), href: e.getAttribute('href'), id: e.id || null, cls: e.className || null, text: e.innerText.trim(),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0, fixed_or_sticky: fixed };
  });
};

// What sits on top of the RESERVE button right now.
const topAtReserve = () => {
  const a = document.querySelector('a.btn-header-booking');
  if (!a) return 'no_header_yet';
  const r = a.getBoundingClientRect();
  const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  if (el && el.closest('#loader')) return 'veil';
  if (el && el.closest('a.btn-header-booking')) return 'reserve';
  return el ? `other:${el.tagName}` : 'nothing_hit_yet';
};

// The veil: from the page's own inline script, a timer from DOM ready (#loader, delay 4200 + fadeOut 3200).
// Samples what is on top of RESERVE, and taps it for real while the veil is up and again after it clears.
async function veil(e, path, prefix) {
  const ctx = await phone(); const p = await ctx.newPage();
  const t0 = Date.now();
  const r = await p.goto(`${SITE}${path}`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  e.status = r?.status() ?? null;
  e.dom_ready_ms = Date.now() - t0;
  e.loader_present = await p.evaluate(() => !!document.getElementById('loader'));
  e.screenshot_dom_ready = await shot(p, `${prefix}-veil-at-dom-ready.png`);
  const center = await p.evaluate(() => { const a = document.querySelector('a.btn-header-booking'); if (!a) return null; const q = a.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; });
  if (center) {
    await p.touchscreen.tap(center.x, center.y); await p.waitForTimeout(400);
    e.early_tap = { ms: Date.now() - t0, top_at_reserve: await p.evaluate(topAtReserve), panel_opened: await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false) };
    e.screenshot_after_early_tap = await shot(p, `${prefix}-veil-after-early-tap.png`);
  }
  const log = []; let last = null;
  while (Date.now() - t0 < 40000) {
    const s = await p.evaluate(topAtReserve).catch(() => 'navigating');
    if (s !== last) { log.push({ ms: Date.now() - t0, top_at_reserve: s }); last = s; }
    if (s === 'reserve') break;
    await p.waitForTimeout(250);
  }
  e.reserve_state_log = log;
  e.reserve_tappable_ms = last === 'reserve' ? log[log.length - 1].ms : null;
  e.tappable_after_dom_ready_ms = e.reserve_tappable_ms === null ? null : e.reserve_tappable_ms - e.dom_ready_ms;
  e.screenshot_clear = await shot(p, `${prefix}-veil-clear.png`);
  if (center) {
    const was = await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false);
    await p.touchscreen.tap(center.x, center.y); await p.waitForTimeout(800);
    e.tap_after_clear = { panel_before: was, panel_after: await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false) };
  }
  await ctx.close();
}

// Off site: plain settings, one load, a consent dialog declined, and which of the needles the page shows.
async function offsite(e, url, prefix, needles) {
  const ctx = await b.newContext({ ...PHONE });
  const p = await ctx.newPage();
  const r = await p.goto(url, { waitUntil: 'load', timeout: 60000 }).catch((err) => { e.error_load = String(err).slice(0, 160); return null; });
  e.status = r?.status() ?? null;
  await p.waitForTimeout(5000);
  for (const sel of ['button:has-text("Reject all")', 'button:has-text("Decline")', '#onetrust-reject-all-handler']) {
    const l = p.locator(sel).first();
    if (await l.count().catch(() => 0)) { await l.click({ timeout: 3000 }).catch(() => {}); e.cookie_declined = sel; await p.waitForTimeout(2500); break; }
  }
  e.final_url = p.url();
  e.screenshot = await shot(p, `${prefix}-fold.png`);
  // Trip.com opens its own date picker over the page on load: a tap on the dimmed strip closes it, as a visitor would.
  if (prefix === '08-trip') { await p.touchscreen.tap(12, 420); await p.waitForTimeout(1500); e.date_picker_closed_by_tap = true; }
  const text = await p.evaluate(() => document.body.innerText).catch(() => '');
  e.text_chars = text.length;
  e.shows = Object.fromEntries(needles.map((n) => {
    const i = text.indexOf(n);
    return [n, i < 0 ? null : text.slice(Math.max(0, i - 70), i + n.length + 90).replace(/\s+/g, ' ').trim()];
  }));
  e.panel_text = text.replace(/\s+/g, ' ').slice(0, 1400);
  e.own_site_links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].filter((a) => /thesandhya\.com/.test(a.href)).map((a) => ({ label: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 60), href: a.href.slice(0, 160) }))).catch(() => []);
  e.shots_at = [];
  for (const n of needles.slice(0, 6)) { if (e.shows[n]) { const f = `${prefix}-${n.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 30)}.png`; e.shots_at.push(await shotAt(p, n, f)); } }
  await ctx.close();
}

const STEPS = {
  // Inspection: what the page is made of, read from the DOM; nothing is tapped.
  async '01-home-inspect'(e) {
    const ctx = await phone(); const p = await ctx.newPage();
    const r = await p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 120000 });
    e.status = r?.status() ?? null;
    await p.waitForTimeout(12000);
    e.screenshot_settled = await shot(p, '01-home-settled.png');
    e.first_screen_text = await p.evaluate(firstScreenText);
    e.reserve_controls = await p.evaluate(reserveInfo);
    e.head = await p.evaluate(() => ({
      title: document.title,
      canonical: document.querySelector('link[rel=canonical]')?.href ?? null,
      og_url: document.querySelector('meta[property="og:url"]')?.content ?? null,
      og_image: document.querySelector('meta[property="og:image"]')?.content ?? null,
      description: document.querySelector('meta[name=description]')?.content ?? null,
      ld_types: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return (j['@graph'] ?? [j]).map((x) => x['@type']); } catch { return ['unparsable']; } }),
    }));
    await ctx.close();
  },

  async '02-veil-home'(e) { await veil(e, '/', '02-home'); },
  async '02-veil-rooms'(e) { await veil(e, '/rooms', '02-rooms'); },

  // The veil is lifted by the same script that starts the logo animation, whose library comes from a CDN.
  // Requests to that CDN are refused in this browser only, to see what a visitor meets if it does not answer.
  async '02-veil-cdn-refused'(e) {
    const ctx = await phone(); await ctx.route(/cdnjs\.cloudflare\.com/, (r) => r.abort());
    const p = await ctx.newPage(); const errors = []; p.on('pageerror', (x) => errors.push(String(x).slice(0, 160)));
    const t0 = Date.now();
    const r = await p.goto(`${SITE}/`, { waitUntil: 'domcontentloaded', timeout: 120000 });
    e.status = r?.status() ?? null; e.dom_ready_ms = Date.now() - t0;
    await p.waitForTimeout(25000);
    e.waited_after_dom_ready_ms = 25000;
    e.top_at_reserve = await p.evaluate(topAtReserve);
    e.loader = await p.evaluate(() => { const l = document.getElementById('loader'); if (!l) return null; const s = getComputedStyle(l); return { display: s.display, opacity: s.opacity }; });
    e.page_errors = errors.slice(0, 5);
    const c = await p.evaluate(() => { const a = document.querySelector('a.btn-header-booking'); if (!a) return null; const q = a.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; });
    if (c) { await p.touchscreen.tap(c.x, c.y); await p.waitForTimeout(800); e.panel_opened_by_tap = await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false); }
    e.screenshot = await shot(p, '02-home-cdn-refused-25s.png');
    await ctx.close();
  },

  // JavaScript off: playbook §4 and §5 ask for text and a booking action that work without scripts.
  async '02-veil-no-js'(e) {
    const ctx = await b.newContext({ ...PHONE, userAgent: IPHONE, javaScriptEnabled: false });
    await ctx.route(/cloudbeds\.com/, (r) => r.abort());
    const p = await ctx.newPage();
    const r = await p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 120000 });
    e.status = r?.status() ?? null;
    await p.waitForTimeout(3000);
    e.screenshot = await shot(p, '02-home-no-js.png');
    await ctx.close();
  },

  // One throttled load: Lighthouse's slow-4G figures, no CPU throttle. The customer of playbook §1 and §4.
  async '03-throttled-slow4g'(e) {
    const ctx = await phone(); const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
    e.profile = '1.6 Mbps down, 750 Kbps up, 150 ms RTT, no CPU throttle, empty cache, one headless run';
    let bytes = 0; cdp.on('Network.loadingFinished', (x) => { bytes += x.encodedDataLength; });
    await p.addInitScript(() => { window.__lcp = 0; new PerformanceObserver((l) => { for (const x of l.getEntries()) window.__lcp = x.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); });
    const t0 = Date.now();
    const go = p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 180000 }).then((r) => { e.load_event_ms = Date.now() - t0; e.status = r?.status() ?? null; }).catch((err) => { e.load_error = String(err).slice(0, 160); });
    const log = []; let last = null;
    const marks = [5000, 15000, 30000]; e.timeline = [];
    while (Date.now() - t0 < 180000) {
      const s = await p.evaluate(topAtReserve).catch(() => 'navigating');
      if (s !== last) { log.push({ ms: Date.now() - t0, top_at_reserve: s }); last = s; }
      if (s === 'reserve') break;
      if (marks.length && Date.now() - t0 >= marks[0]) {
        const at = marks.shift();
        // page.screenshot waits for fonts and stalled this loop by up to 30 s on a loading page, so the
        // capture goes straight through CDP, and every row carries the time it really happened.
        const row = { mark_ms: at, shot_ms: Date.now() - t0, top_at_reserve: s };
        const png = await cdp.send('Page.captureScreenshot', { format: 'png' }).catch(() => null);
        if (png) { writeFileSync(`${OUT}/03-slow4g-${at / 1000}s.png`, Buffer.from(png.data, 'base64')); row.screenshot = rel(`03-slow4g-${at / 1000}s.png`); }
        // A real tap on RESERVE at each mark: does the panel open yet? (Only before the veil lifts, so it cannot toggle shut.)
        const c = await p.evaluate(() => { const a = document.querySelector('a.btn-header-booking'); if (!a) return null; const q = a.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; }).catch(() => null);
        if (c) {
          row.tap_ms = Date.now() - t0;
          await p.touchscreen.tap(c.x, c.y).catch(() => {}); await p.waitForTimeout(300);
          row.panel_opened_by_tap = await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false).catch(() => null);
          row.jquery_ready = await p.evaluate(() => (window.jQuery ? window.jQuery.isReady : false)).catch(() => null);
        }
        e.timeline.push(row);
      }
      await p.waitForTimeout(500);
    }
    e.reserve_state_log = log;
    e.reserve_tappable_ms = last === 'reserve' ? log[log.length - 1].ms : null;
    e.bytes_when_tappable = bytes;
    await Promise.race([go, p.waitForTimeout(120000)]);
    e.bytes_at_end = bytes; e.ended_ms = Date.now() - t0;
    e.lcp_ms = await p.evaluate(() => Math.round(window.__lcp)).catch(() => null);
    await ctx.close();
  },

  // The header RESERVE: where it is at the top and far down the page; how far down the page says what it is.
  async '04-reserve-fixed'(e) {
    const ctx = await phone(); const p = await ctx.newPage();
    await p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(9000);
    e.at_top = (await p.evaluate(reserveInfo))[0];
    e.first_mentions = await p.evaluate(() => {
      const words = ['hotel', 'ahangama', 'sri lanka', 'kabalana', 'beach', 'room', 'breakfast'];
      const out = {};
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) {
        const el = n.parentElement;
        if (el.closest('.main-menu, .booking-wrap, header, script, style, noscript, footer')) continue;
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
        if (!r.height || !r.width || s.display === 'none' || s.visibility === 'hidden') continue;
        const t = n.textContent.toLowerCase();
        for (const k of words) if (!(k in out) && t.includes(k)) out[k] = { y: Math.round(r.top + scrollY), sample: n.textContent.replace(/\s+/g, ' ').trim().slice(0, 120) };
      }
      return out;
    });
    e.page_height = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.evaluate(() => window.scrollTo(0, 3000)); await p.waitForTimeout(1500);
    e.at_scroll_3000 = (await p.evaluate(reserveInfo))[0];
    e.screenshot_scrolled = await shot(p, '04-reserve-scrolled.png');
    await ctx.close();
  },

  // The panel. A capture listener cancels the submit: the site's own click handler builds the hand-off
  // URL, it is read back, and nothing is sent. Picking dates enters no personal data.
  async '05-panel'(e) {
    const ctx = await phone(); const p = await ctx.newPage();
    const popups = []; ctx.on('page', (x) => popups.push(x.url()));
    await p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(9000);
    await p.evaluate(() => {
      window.__sub = [];
      document.getElementById('bookingForm').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const f = ev.target; const fd = new FormData(f);
        window.__sub.push({ action: f.action, method: f.method, target: f.target, named_fields: [...fd.entries()], adults_shown: f.querySelector('.quantity input')?.value ?? null, displayed: document.getElementById('displayDate')?.textContent ?? null });
      }, true);
    });
    const tapEl = async (sel) => { const r = await p.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const q = el.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2, w: q.width, h: q.height }; }, sel); if (r && r.w) await p.touchscreen.tap(r.x, r.y); return r; };
    e.tap_reserve = await tapEl('a.btn-header-booking'); await p.waitForTimeout(1500);
    e.panel_active = await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false);
    e.screenshot_panel = await shot(p, '05-panel-open.png');
    e.panel = await p.evaluate(() => {
      const box = (s) => { const el = document.querySelector(s); if (!el) return null; const q = el.getBoundingClientRect(); return { x: Math.round(q.x), y: Math.round(q.y), w: Math.round(q.width), h: Math.round(q.height) }; };
      return { wrap: box('.bookingbar'), date_row: box('.bookingbar .line'), inputdates: box('#inputdates'), reserve: box('#bookingBtn'), displayed: document.getElementById('displayDate')?.textContent, adults_input_name: document.querySelector('.quantity input')?.getAttribute('name'), cookie_line: document.querySelector('.bookingbar .txt-sm')?.textContent ?? null, today_iso: new Date().toISOString().slice(0, 10) };
    });
    e.tap_panel_reserve_default = await tapEl('#bookingBtn'); await p.waitForTimeout(1000);
    e.handoff_default_dates = await p.evaluate(() => window.__sub[window.__sub.length - 1] ?? null);
    e.panel_active_after_default_tap = await p.evaluate(() => document.querySelector('.booking-wrap')?.classList.contains('active') ?? false);
    // Open the calendar with a real tap on the date row, as a visitor would.
    e.top_element_at_date_row = await p.evaluate(() => { const r = document.querySelector('.bookingbar .line')?.getBoundingClientRect(); if (!r) return null; const el = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return el ? `${el.tagName.toLowerCase()}#${el.id}.${String(el.className)}`.slice(0, 80) : null; });
    e.tap_date_row = await tapEl('.bookingbar .line'); await p.waitForTimeout(1200);
    const calOpen = () => p.evaluate(() => { const w = document.getElementById('mobile-date-wrapper'); if (!w) return null; const q = w.getBoundingClientRect(); return { display: getComputedStyle(w).display, y: Math.round(q.y), h: Math.round(q.height), bottom_in_viewport: q.bottom <= innerHeight }; });
    e.calendar_after_touch = await calOpen();
    e.screenshot_calendar = await shot(p, '05-panel-calendar.png');
    const days = () => p.evaluate(() => [...document.querySelectorAll('#mobile-date-wrapper .lightpick__day.is-available:not(.is-next-month)')].map((d) => { const q = d.getBoundingClientRect(); return { n: d.textContent, x: q.x + q.width / 2, y: q.y + q.height / 2, w: q.width, h: q.height }; }));
    if ((e.calendar_after_touch?.h ?? 0) > 0) {
      await tapEl('#mobile-date-wrapper .lightpick__next-action'); await p.waitForTimeout(700);
      const ds = await days();
      const a = ds.find((d) => d.n === '10'); const c = ds.find((d) => d.n === '12');
      e.day_tap_target = a ? { w: Math.round(a.w), h: Math.round(a.h) } : null;
      if (a && c) { await p.touchscreen.tap(a.x, a.y); await p.waitForTimeout(500); await p.touchscreen.tap(c.x, c.y); await p.waitForTimeout(900); }
      e.displayed_after_pick = await p.evaluate(() => document.getElementById('displayDate')?.textContent);
      e.span_values_after_pick = await p.evaluate(() => [document.getElementById('checkin').value ?? null, document.getElementById('checkout').value ?? null]);
      e.screenshot_picked = await shot(p, '05-panel-picked.png');
      e.calendar_after_pick = await calOpen();
      e.tap_panel_reserve_picked = await tapEl('#bookingBtn'); await p.waitForTimeout(1000);
      e.handoff_picked_dates = await p.evaluate(() => window.__sub[window.__sub.length - 1] ?? null);
      e.submits_cancelled = await p.evaluate(() => window.__sub.length);
    }
    e.popups_opened = popups;
    await ctx.close();
  },

  // The menu.
  async '06-menu'(e) {
    const ctx = await phone(); const p = await ctx.newPage();
    await p.goto(`${SITE}/`, { waitUntil: 'load', timeout: 120000 }); await p.waitForTimeout(9000);
    const t = await p.evaluate(() => [...document.querySelectorAll('.header-menu, .header-menu *')].map((x) => { const q = x.getBoundingClientRect(); return { x: q.x, y: q.y, w: q.width, h: q.height, tag: x.tagName, cls: String(x.className).slice(0, 60) }; }).filter((x) => x.w > 0).slice(0, 4));
    e.toggle_candidates = t;
    const box = t[0];
    if (box) { await p.touchscreen.tap(box.x + box.w / 2, box.y + box.h / 2); await p.waitForTimeout(1800); }
    e.menu_open = await p.evaluate(() => document.body.classList.contains('main-menu-open'));
    e.screenshot_menu = await shot(p, '06-menu-open.png');
    e.menu_links = await p.evaluate(() => [...document.querySelectorAll('#primary-menu a, a.btn-reserve, a[href^="tel:"], a[href^="mailto:"]')].map((a) => { const q = a.getBoundingClientRect(); return { text: a.innerText.trim().replace(/\s+/g, ' ').slice(0, 60), href: a.getAttribute('href'), w: Math.round(q.width), h: Math.round(q.height), y: Math.round(q.y), in_viewport: q.top >= 0 && q.bottom <= innerHeight }; }).filter((x) => x.w > 0));
    e.contact_markup = await p.evaluate(() => { const a = document.querySelector('.main-menu a[href^="tel:"]') ?? document.querySelector('a[href^="tel:"]'); return a ? a.parentElement.outerHTML.replace(/\s+/g, ' ').slice(0, 800) : null; });
    await ctx.close();
  },

  // Every page the tool crawled: what it answers, read from the DOM.
  async '07-pages'(e) {
    const ctx = await phone(); e.pages = [];
    for (const path of ['/', '/rooms', '/room/studio-king', '/room/studio-twin', '/room/studio-plus-king', '/room/directors-suite', '/dining', '/design', '/locale', '/house']) {
      const p = await ctx.newPage(); const row = { path };
      const r = await p.goto(`${SITE}${path}`, { waitUntil: 'load', timeout: 120000 }).catch((err) => { row.error = String(err).slice(0, 120); return null; });
      row.status = r?.status() ?? null;
      await p.waitForTimeout(9000);
      Object.assign(row, await p.evaluate(() => {
        const text = document.body.innerText; const low = text.toLowerCase();
        const grep = (re) => { const m = text.match(re); return m ? [...new Set(m.map((x) => x.replace(/\s+/g, ' ').trim()))].slice(0, 8) : []; };
        const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
        return {
          loader: !!document.getElementById('loader'),
          header_reserve: !!document.querySelector('a.btn-header-booking'),
          prices: grep(/(?:US\$|USD|\$|LKR|Rs\.?)\s?\d[\d,.]*\+*(?:\s*per night)?/g),
          breakfast: low.includes('breakfast'), check_in_words: /check[\s-]?in/.test(low.replace(/check-in\/check-out/g, '')), check_out_words: /check[\s-]?out/.test(low.replace(/check-in\/check-out/g, '')),
          review_words: grep(/[^.\n]*\b(reviews?|rated|rating|tripadvisor|booking\.com|guests? (?:say|said))\b[^.\n]*/gi),
          age_words: grep(/[^.\n]*\b(adults?[- ]only|under \d+|children|\d+ years)\b[^.\n]*/gi),
          whatsapp_links: links.filter((h) => /wa\.me|whatsapp/i.test(h)),
          map_links: links.filter((h) => /google\.[^/]+\/maps|maps\.google|goo\.gl\/maps|maps\.app|openstreetmap/i.test(h)),
          iframes: [...document.querySelectorAll('iframe')].map((f) => f.src),
          engine_links: [...new Set(links.filter((h) => /cloudbeds/.test(h)))],
          canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href') ?? null,
          description: document.querySelector('meta[name=description]')?.getAttribute('content') ?? null,
          img_count: document.images.length, img_lazy: [...document.images].filter((i) => i.loading === 'lazy').length,
          slips: grep(/500 tread count|though out|Studio King\+|brand new 30-meter|up-cycled shipping container/g),
          text_chars: text.length,
        };
      }));
      // RESERVE NOW is upper case only in CSS, so it is found by its link, not its text.
      const button = { '/rooms': '07-rooms-reserve-now.png', '/room/studio-king': '07-room-reserve-now.png', '/room/directors-suite': '07-suite-reserve-now.png' }[path];
      if (button) {
        row.reserve_now = await p.evaluate(() => [...document.querySelectorAll('main a[href*="cloudbeds"], #page a[href*="cloudbeds"]:not(.btn-reserve)')].filter((a) => a.getBoundingClientRect().height > 0).map((a) => ({ text: a.innerText.trim(), href: a.getAttribute('href'), w: Math.round(a.getBoundingClientRect().width), h: Math.round(a.getBoundingClientRect().height) })));
        row.screenshot = await shotSel(p, '#page a[href*="cloudbeds"]:not(.btn-reserve)', button);
      }
      if (path === '/house') row.screenshot = await shotAt(p, '3,500', '07-house-price.png');
      if (path === '/') row.screenshot_footer = await shotSel(p, 'footer a[href^="tel:"]', '07-home-footer-contact.png');
      if (path === '/locale') {
        row.map_imgs = await p.evaluate(() => [...document.images].filter((i) => /map/i.test(i.src + i.alt)).map((i) => ({ src: i.currentSrc || i.src, alt: i.alt, in_link: !!i.closest('a'), link: i.closest('a')?.getAttribute('href') ?? null })));
        row.screenshot_map = await shotSel(p, 'img[src*="map" i]', '07-locale-map.png');
      }
      e.pages.push(row);
      await p.close();
    }
    await ctx.close();
  },

  // Off site, plain settings, one load each, the pages the harvester could read.
  async '08-google'(e) { await offsite(e, GOOGLE, '08-google', ['thesandhya', 'Check-in time', 'Pet-friendly', 'Agoda', 'Hotels.com', 'limited view', 'Website', 'Booking.com', 'Official site', '4.6']); },
  async '08-michelin'(e) { await offsite(e, MICHELIN, '08-michelin', ['not currently taking reservations', 'No verified stays yet', 'thesandhya', '16 or older', 'Check-in']); },
  async '08-trip'(e) { await offsite(e, TRIP, '08-trip', ['After 16:00', 'Children aged 12', 'Pets are not allowed', '9.7', 'thesandhya', 'US$ 200', 'Adults only', 'adults only']); },

  // The engine: one plain load with the tools/funnel.mjs settings. No user-agent override, no stealth, no retry.
  async '90-engine-once'(e) {
    const ctx = await b.newContext({ viewport: PHONE.viewport, deviceScaleFactor: 2, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true, locale: 'en-US', extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' } });
    const p = await ctx.newPage();
    const calls = []; p.on('response', (r) => { if (/(^|\.)cloudbeds\.com$/.test(new URL(r.url()).hostname) && /reservation|property_info|booking\/|404/.test(r.url())) calls.push({ url: r.url().slice(0, 120), status: r.status() }); });
    const r = await p.goto(ENGINE, { waitUntil: 'load', timeout: 60000 }).catch((err) => { e.error_load = String(err).slice(0, 160); return null; });
    e.document_status = r?.status() ?? null;
    await p.waitForTimeout(6000);
    e.final_url = p.url(); e.calls = calls.slice(0, 12);
    e.visible_text = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').slice(0, 200)).catch(() => null);
    e.screenshot = await shot(p, '90-engine-headless-wall.png');
    e.reading = 'What a headless browser gets, read as an automation wall and not as a fault of the hotel. The engine steps were not exercised; no finding rests on this screen.';
    await ctx.close();
  },
};

const prior = only.length && existsSync(JSON_OUT) ? JSON.parse(readFileSync(JSON_OUT, 'utf8')).steps ?? [] : [];
for (const [id, fn] of Object.entries(STEPS)) {
  if (!want(id)) continue;
  const e = { step: id, at: new Date().toISOString() };
  try { await fn(e); } catch (err) { e.error = String(err).slice(0, 300); }
  steps.push(e);
  console.log(id, e.error ?? 'ok');
}
await b.close();

const merged = [...prior.filter((s) => !steps.some((x) => x.step === s.step)), ...steps].sort((x, y) => x.step.localeCompare(y.step));
writeFileSync(JSON_OUT, JSON.stringify({
  walked_at: new Date().toISOString(),
  viewport: '390x844 DPR2 mobile, en-US, logged out; site steps use an iPhone Safari user agent, as the harvester did; off-site steps and step 90 use plain settings',
  rules: 'read-only; no login, no form submission (the panel submit is cancelled by a capture listener), no booking started, no personal data, no contact; the engine host is aborted in site steps',
  recipe: 'dossier/the-sandhya/funnel/make-walk.mjs',
  steps: merged,
}, null, 1));
