#!/usr/bin/env node
// dossier/sea-you-surfers-nest/funnel/make-walk.mjs — the auditor's hand walk (station 3b, auditor 0.1.3, scope no_site)
// of Sea You Surfers Nest's off-site path as a phone sees it: the unclaimed Google listing, Booking.com (the
// dossier's booking path), Agoda (fed from Booking), the two Airbnb listings, the Airbnb host profile, and a
// Google search for the name. The scrolled whole-page sets of the marketplaces come from tools/shoot.mjs
// (assets/walk/shoot-*/), run beside this recipe; this file makes the targeted, cookie-declined screens.
/*
# media: dossier/sea-you-surfers-nest/assets/walk/*.png
*/
// Read-only: opens pages, declines cookie dialogs ("Only necessary" / reject), closes sign-in prompts. A button a
// visitor would tap to ask a question is tapped once to see where it leads; nothing is typed or sent.
// No login, no form, no dates, no booking, no contact (run mode: test).
// Run from the repo root: node dossier/sea-you-surfers-nest/funnel/make-walk.mjs
// Writes dossier/sea-you-surfers-nest/assets/walk/*.png (screenshots are scratch, outside git) and
// dossier/sea-you-surfers-nest/funnel/walk.json.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const DIR = 'dossier/sea-you-surfers-nest/funnel';
const OUT = 'dossier/sea-you-surfers-nest/assets/walk';
mkdirSync(OUT, { recursive: true });
mkdirSync(DIR, { recursive: true });
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SOCS = { name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg', domain: '.google.com', path: '/' };
const GOOGLE = 'https://www.google.com/maps/place/Sea+You+Surfers+Nest/data=!4m10!3m9!1s0x3ae11500586794a3:0xed458ea29dd833eb!5m2!4m1!1i2!8m2!3d5.9621402!4d80.3974064!16s%2Fg%2F11mlt9v7jb!19sChIJo5RnWAAV4ToR6zPYnaKORe0?hl=en';
const BOOKING = 'https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html';
const AGODA = 'https://www.agoda.com/en-gb/sea-you-surfers-nest/hotel/all/midigama-east-lk.html';
const AIRBNB_1 = 'https://www.airbnb.co.uk/rooms/1508895627217411616';
const AIRBNB_2 = 'https://www.airbnb.co.uk/rooms/1793988904511877292';
const AIRBNB_HOST = 'https://www.airbnb.co.uk/users/show/718689424';
const SEARCH = 'https://www.google.com/search?q=%22Sea+You+Surfers+Nest%22+Midigama&hl=en';

const b = await chromium.launch();
const mobile = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-GB', userAgent: IPHONE });
const desktop = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-GB' });
for (const c of [mobile, desktop]) await c.addCookies([SOCS]);
const steps = [];
const rel = (f) => `assets/walk/${f}`;

async function decline(p) {
  for (const sel of ['#onetrust-reject-all-handler', 'button:has-text("Only necessary")', 'button:has-text("Decline")', 'button:has-text("Reject all")', 'button:has-text("Decline optional cookies")', '[aria-label="Decline optional cookies"]']) {
    const l = p.locator(sel).first();
    if (await l.count().catch(() => 0) && await l.isVisible().catch(() => false)) { await l.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(800); return sel; }
  }
  return null;
}

async function info(p) {
  return p.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
    const text = document.body ? document.body.innerText : '';
    const links = [...document.querySelectorAll('a[href]')].filter(vis);
    const pick = (re) => [...new Set(text.match(re) || [])].slice(0, 10).map(s => s.trim().slice(0, 240));
    return {
      title: document.title,
      doc_width: document.documentElement.scrollWidth,
      page_height: document.documentElement.scrollHeight,
      text_chars: text.length,
      tel_links: links.filter(a => a.getAttribute('href').startsWith('tel:')).map(a => a.getAttribute('href')),
      whatsapp_links: links.filter(a => /wa\.me|whatsapp\.com/.test(a.getAttribute('href'))).length,
      mailto_links: links.filter(a => a.getAttribute('href').startsWith('mailto:')).length,
      phone_715880052_in_text: /71\s?588\s?0052|715\s?880\s?052|715880052/.test(text),
      add_website: /Add website/.test(text),
      add_phone: /Add place's phone number|Add phone/i.test(text),
      claim: /Claim this business|Own this business/i.test(text),
      offsite_booking_links: links.filter(a => /booking\.com|agoda|kayak|priceline|expedia|hotels\.com|trip\.com|airbnb/i.test(a.getAttribute('href')) && !location.hostname.includes(new URL(a.href).hostname.replace(/^www\./, ''))).map(a => ({ label: a.innerText.trim().replace(/\s+/g, ' ').slice(0, 80), href: a.getAttribute('href').slice(0, 160) })).slice(0, 12),
      commission_phrases: pick(/[^.\n]*commission[^.\n]*/gi),
      contact_phrases: pick(/[^.\n]*(contact the property|contacting the property|ask a question|message (the )?host|contact host|once you book|after booking|response rate|responds within)[^.\n]*/gi),
      inquire_phrases: pick(/[^.\n]*(inquire|enquire)[^.\n]*/gi),
      ac_phrases: pick(/[^.\n]*(air[- ]condition|A\/C)[^.\n]*/gi),
      restaurant_phrases: pick(/[^.\n]*restaurant[^.\n]*/gi),
      checkin_phrases: pick(/[^.\n]*check[- ]?in[^.\n]*/gi),
      review_source_phrases: pick(/[^.\n]*(verified reviews|provided by)[^.\n]*/gi),
      login_wall: /log in|sign in|create new account/i.test(text) && text.length < 3000,
      captcha: /unusual traffic|not a robot|captcha/i.test(text),
      text_head: text.replace(/\n{2,}/g, '\n').slice(0, 1200),
    };
  });
}

// Scroll the first visible element whose text contains `needle` to the centre; screenshot the viewport there.
async function shotAt(p, needle, file) {
  const y = await p.evaluate((n) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node; while ((node = w.nextNode())) {
      if (!node.textContent.includes(n)) continue;
      const el = node.parentElement; const r = el.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      el.scrollIntoView({ block: 'center' });
      return Math.round(r.top + scrollY);
    }
    return null;
  }, needle);
  if (y === null) return null;
  await p.waitForTimeout(1000);
  await p.screenshot({ path: `${OUT}/${file}` });
  await p.evaluate(() => window.scrollTo(0, 0));
  return { needle, y, screenshot: rel(file) };
}

async function load(p, url, e, wait) {
  const chain = [];
  p.on('response', (r) => { if (r.request().isNavigationRequest() && r.frame() === p.mainFrame()) chain.push([r.status(), r.url().slice(0, 160)]); });
  try { const r = await p.goto(url, { waitUntil: 'load', timeout: 60000 }); e.status = r?.status() ?? null; }
  catch (err) { e.error = String(err).slice(0, 200); }
  await p.waitForTimeout(wait);
  // Booking.com answers 202 with a JS challenge and reloads itself; wait for that navigation to settle
  await p.waitForLoadState('load').catch(() => {});
  await p.waitForTimeout(1500);
  e.navigation_chain = chain;
}

async function visit(step, url, opts = {}) {
  const ctx = opts.desktop ? desktop : mobile;
  const p = await ctx.newPage();
  const e = { step, viewport: opts.desktop ? '1440x1000' : '390x844', requested: url, status: null, error: null };
  await load(p, url, e, opts.wait || 4000);
  // what the visitor sees first, before any dialog is answered (cookie banners, app interstitials)
  await p.screenshot({ path: `${OUT}/${step}-on-load.png` }); e.screenshot_on_load = rel(`${step}-on-load.png`);
  e.on_load_dialogs = await p.evaluate(() => [...document.querySelectorAll('[role="dialog"], [aria-modal="true"]')]
    .filter(d => { const r = d.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
    .map(d => d.innerText.replace(/\s+/g, ' ').trim().slice(0, 200)).filter(Boolean).slice(0, 4)).catch(() => []);
  e.cookie_declined = await decline(p);
  for (const t of (opts.dismiss ?? ['Go back to web', 'Close', 'Dismiss sign-in info.', 'Not now'])) {
    const l = p.getByRole('button', { name: t }).or(p.getByRole('link', { name: t })).or(p.getByText(t, { exact: true })).first();
    if (await l.count().catch(() => 0) && await l.isVisible().catch(() => false)) { await l.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(1200); e.dismissed = (e.dismissed || []).concat(t); }
  }
  e.final_url = p.url().slice(0, 200);
  await p.evaluate(() => window.scrollTo(0, 0)).catch(() => {}); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/${step}-fold.png` }); e.screenshot = rel(`${step}-fold.png`);
  if (opts.lazy) { for (let y = 0; y < opts.lazy; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(250); } await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500); }
  Object.assign(e, await info(p).catch(err => ({ info_error: String(err).slice(0, 200) })));
  e.at = [];
  for (const [needle, file] of (opts.at || [])) { const r = await shotAt(p, needle, `${step}-${file}.png`).catch(() => null); e.at.push(r || { needle, found: false }); }
  if (opts.after) await opts.after(p, e).catch(err => { e.after_error = String(err).slice(0, 200); });
  steps.push(e);
  await p.close();
}

// Tap a button a visitor would use to ask the host something; record where it leads. Nothing is typed.
async function tapAndRecord(p, e, label, file, key) {
  const l = p.getByRole('button', { name: label }).or(p.getByRole('link', { name: label })).first();
  if (!(await l.count())) { e[key] = { label, found: false }; return; }
  await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/${file}-before.png` });
  const chain = [];
  const h = (r) => { if (r.request().isNavigationRequest() && r.frame() === p.mainFrame()) chain.push([r.status(), r.url().slice(0, 160)]); };
  p.on('response', h);
  await l.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(5000);
  p.off('response', h);
  const text = await p.evaluate(() => { const d = [...document.querySelectorAll('[role="dialog"], [aria-modal="true"]')].pop(); return (d ? d.innerText : document.body.innerText.slice(0, 800)).replace(/\n{2,}/g, '\n').slice(0, 800); });
  await p.screenshot({ path: `${OUT}/${file}.png` });
  e[key] = { label, url_after_tap: p.url().slice(0, 200), navigation_chain: chain, text, screenshot_before: rel(`${file}-before.png`), screenshot: rel(`${file}.png`) };
}

// 1. Google Maps: where the playbook's traveller finds the place.
await visit('01-google-listing', GOOGLE, { wait: 6000, at: [['Add place', 'add-missing']] });
await visit('02-google-listing-desktop', GOOGLE, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['Add website', 'add-website'], ["Add place's phone number", 'add-phone'], ['Claim this business', 'claim'], ['View prices', 'prices'], ['Booking.com', 'offers']],
  after: async (p, e) => {
    e.panel = await p.evaluate(() => [...document.querySelectorAll('[data-item-id], button[aria-label], a[aria-label]')]
      .map(x => (x.getAttribute('aria-label') || x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120))
      .filter(t => /website|phone|address|call|book|availability|plus code|check-in|check-out|price|agoda|claim/i.test(t)).slice(0, 30));
    e.offer_links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => ({ label: (a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 100), href: a.getAttribute('href').slice(0, 200) })).filter(x => /booking\.com|agoda|airbnb|googleadservices|\/travel\/|aclk/i.test(x.href)).slice(0, 12));
    e.website_links = await p.evaluate(() => [...document.querySelectorAll('a[data-item-id="authority"], a[aria-label^="Website"]')].map(a => a.getAttribute('href')));
  },
});

// 2. Booking.com: the dossier's booking path.
await visit('03-booking-com', BOOKING, {
  wait: 6000, lazy: 9000,
  at: [['Comfortable Accommodations', 'summary'], ['Choose dates', 'dates'], ['ringing several days', 'review-ring-ahead'], ['Check your booking', 'review-title'], ['Contacting the property', 'contacting-closed'], ['Check-in', 'house-rules']],
  after: async (p, e) => {
    e.accordions = [];
    for (const [label, file] of [['Contacting the property', 'contacting'], ['Hotel policies', 'policies'], ['Preferred Partner Programme', 'preferred-partner']]) {
      const h = p.getByText(label, { exact: true }).first();
      if (!(await h.count())) { e.accordions.push({ label, found: false }); continue; }
      await h.scrollIntoViewIfNeeded(); await h.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(1500);
      await h.evaluate((x) => x.scrollIntoView({ block: 'start' })); await p.waitForTimeout(700);
      await p.screenshot({ path: `${OUT}/03-booking-com-${file}.png` });
      const text = await h.evaluate((x) => { let n = x; for (let i = 0; i < 6 && n.parentElement; i++) { n = n.parentElement; if (n.innerText.length > x.innerText.length + 40) break; } return n.innerText.replace(/\n{2,}/g, '\n').slice(0, 1500); });
      e.accordions.push({ label, screenshot: rel(`03-booking-com-${file}.png`), text });
    }
    e.summary_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.indexOf('Comfortable Accommodations'); return i < 0 ? null : t.slice(i, i + 900); });
    await tapAndRecord(p, e, 'Ask a question', '03-booking-com-ask-tapped', 'ask_question');
  },
});

// 3. Agoda: the second OTA, fed from Booking.
await visit('04-agoda', AGODA, {
  wait: 6000, lazy: 9000, dismiss: ['Continue to mobile site', 'Close', 'Not now'],
  at: [['Comfortable Accommodations', 'summary'], ['Provided by verified guests', 'reviews-source'], ['on-site restaurant', 'faq-restaurant'], ['air conditioning available', 'faq-ac'], ['Check-in from', 'checkin']],
});

// 4. Airbnb listing 1 (the reviewed one) and listing 2 (the whole house, new).
await visit('05-airbnb-1', AIRBNB_1, {
  wait: 6000, lazy: 8000, dismiss: ['Close', 'Not now'],
  at: [['Pls inquire', 'inquire'], ['Response rate', 'host-details'], ['Check in after', 'checkin'], ['Message host', 'message-host']],
  after: async (p, e) => {
    e.description_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.indexOf('Escape to the sun'); return i < 0 ? null : t.slice(i, i + 700); });
    await tapAndRecord(p, e, 'Show more', '05-airbnb-1-description-open', 'show_more');
    const r = await shotAt(p, 'Pls inquire', '05-airbnb-1-inquire-open.png').catch(() => null); e.at.push(r || { needle: 'Pls inquire (open)', found: false });
    await p.keyboard.press('Escape').catch(() => {}); await p.waitForTimeout(800);
    await tapAndRecord(p, e, 'Message host', '05-airbnb-1-message-host-tapped', 'message_host');
  },
});
await visit('06-airbnb-2', AIRBNB_2, {
  wait: 6000, lazy: 8000, dismiss: ['Close', 'Not now'],
  at: [['bathroom', 'summary'], ['No reviews', 'no-reviews'], ['Pls inquire', 'inquire'], ['Check in after', 'checkin']],
  after: async (p, e) => {
    e.overview = await p.evaluate(() => { const t = document.body.innerText; const m = t.match(/[^\n]*guests?[^\n]*bedrooms?[^\n]*/i); return m ? m[0] : null; });
    await tapAndRecord(p, e, 'Show more', '06-airbnb-2-description-open', 'show_more');
  },
});
await visit('07-airbnb-host', AIRBNB_HOST, { wait: 5000, dismiss: ['Close', 'Not now'], at: [['Response rate', 'response']] });

// 5. A Google search for the name, as a traveller who heard of the place would type it.
await visit('08-google-search', SEARCH, { wait: 4000 });

await b.close();
writeFileSync(`${DIR}/walk.json`, JSON.stringify({
  walked_at: new Date().toISOString(),
  scope: 'no_site',
  viewport: '390x844 DPR2 mobile, iPhone Safari UA, en-GB, logged out (the Google listing also at 1440x1000, where its detail rows show)',
  rules: 'read-only; cookie dialogs declined ("Only necessary" / reject), sign-in prompts closed; a visitor\'s ask button tapped once to see where it leads, nothing typed or sent; no form submitted, no dates or personal data entered, no login, no contact',
  recipe: 'dossier/sea-you-surfers-nest/funnel/make-walk.mjs',
  shoot_sets: 'scrolled whole-page sets from tools/shoot.mjs (desktop 1440 + mobile 390, cookie dialogs not declined by that tool): assets/walk/shoot-agoda/, shoot-airbnb-1/, shoot-airbnb-2/; Booking.com crashed tools/shoot.mjs on the mobile pass (its 202 JS-challenge reload destroys the page context), so Booking.com is covered by step 03 only',
  steps,
}, null, 1));
console.log(steps.map(s => `${s.step} ${s.status} ${s.final_url} tel=${JSON.stringify(s.tel_links)} wa=${s.whatsapp_links} addweb=${s.add_website} addphone=${s.add_phone} claim=${s.claim} captcha=${s.captcha} at=${(s.at || []).map(a => a.found === false ? '-' + a.needle : '+').join(',')} ${s.error || ''}`).join('\n'));
