#!/usr/bin/env node
// dossier/lotus-surf-house/funnel/make-walk.mjs — the auditor's hand walk (station 3b, auditor 0.1.3, scope no_site)
// of Lotus Surf House's off-site path as a phone sees it: the Google listing (and the old Yelum Guest House listing),
// Booking.com (the only booking path), the Facebook page the old listing calls its website, and a Google search.
/*
# media: dossier/lotus-surf-house/funnel/walk/*.png
*/
// Read-only: opens pages, declines cookie dialogs, closes sign-in prompts. No login, no form, no dates, no booking, no contact.
// Run from the repo root: node dossier/lotus-surf-house/funnel/make-walk.mjs
// Writes dossier/lotus-surf-house/funnel/walk/*.png and dossier/lotus-surf-house/funnel/walk.json.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const DIR = 'dossier/lotus-surf-house/funnel';
const OUT = `${DIR}/walk`;
mkdirSync(OUT, { recursive: true });
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SOCS = { name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg', domain: '.google.com', path: '/' };
const GOOGLE = 'https://www.google.com/maps/place/Lotus+Surf+House/data=!4m10!3m9!1s0x3ae115fa41dc1f05:0x4dc98f89addc1542!5m2!4m1!1i2!8m2!3d5.9652192!4d80.3922802!16s%2Fg%2F11h5p61yh3!19sChIJBR_cQfoV4ToRQhXcrYmPyU0?hl=en';
const GOOGLE_OLD = 'https://www.google.com/maps/place/Yelum+Guest+House/data=!4m10!3m9!1s0x3ae114c1a01189c7:0x43e62c20fba3efe5!5m2!4m1!1i2!8m2!3d5.9651521!4d80.3922717!16s%2Fg%2F11cjgd948_!19sChIJx4kRoMEU4ToR5e-j-yAs5kM?hl=en';
const BOOKING = 'https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html';
const BOOKING_OLD = 'https://www.booking.com/hotel/lk/yelum-guest-house.en-gb.html';
const FACEBOOK = 'https://www.facebook.com/Yelum-guest-house-midigama-1553875118208096/';
const SEARCH = 'https://www.google.com/search?q=Lotus+Surf+House+Midigama&hl=en';

const b = await chromium.launch();
const mobile = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-US', userAgent: IPHONE });
const desktop = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
for (const c of [mobile, desktop]) await c.addCookies([SOCS]);
const steps = [];
const rel = (f) => `funnel/walk/${f}`;

async function decline(p) {
  for (const sel of ['#onetrust-reject-all-handler', 'button:has-text("Decline")', 'button:has-text("Reject all")', 'button:has-text("Decline optional cookies")', '[aria-label="Decline optional cookies"]']) {
    const l = p.locator(sel).first();
    if (await l.count().catch(() => 0)) { await l.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(800); return sel; }
  }
  return null;
}

async function info(p) {
  return p.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
    const text = document.body ? document.body.innerText : '';
    const links = [...document.querySelectorAll('a[href]')].filter(vis);
    const pick = (re) => (text.match(re) || []).slice(0, 10);
    return {
      title: document.title,
      doc_width: document.documentElement.scrollWidth,
      page_height: document.documentElement.scrollHeight,
      text_chars: text.length,
      tel_links: links.filter(a => a.getAttribute('href').startsWith('tel:')).map(a => a.getAttribute('href')),
      whatsapp_links: links.filter(a => /wa\.me|whatsapp\.com/.test(a.getAttribute('href'))).length,
      mailto_links: links.filter(a => a.getAttribute('href').startsWith('mailto:')).length,
      phone_774647541_in_text: /77\s?464\s?7541|774\s?647\s?541|774647541/.test(text),
      phone_712585804_in_text: /71\s?258\s?5804|712585804/.test(text),
      add_website: /Add website/.test(text),
      lotus_site_links: links.map(a => a.getAttribute('href')).filter(h => /lotussurf|lotus-surf/i.test(h) && !/booking\.com|google\./.test(h)).slice(0, 10),
      offsite_booking_links: links.filter(a => /booking\.com|agoda|kayak|priceline|expedia|hotels\.com|trip\.com/i.test(a.getAttribute('href'))).map(a => ({ label: a.innerText.trim().replace(/\s+/g, ' ').slice(0, 80), href: a.getAttribute('href').slice(0, 160) })).slice(0, 15),
      commission_phrases: pick(/[^.\n]*commission[^.\n]*/gi),
      contact_phrases: pick(/[^.\n]*(contact the property|ask a question|questions\?|message the property|property's phone|host)[^.\n]*/gi),
      login_wall: /log in|sign in|create new account/i.test(text) && text.length < 3000,
      captcha: /unusual traffic|not a robot|captcha/i.test(text),
      text_head: text.replace(/\n{2,}/g, '\n').slice(0, 1200),
    };
  });
}

// Scroll to the first visible element whose text contains `needle`; screenshot the viewport there.
async function shotAt(p, needle, file) {
  const y = await p.evaluate((n) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node; while ((node = w.nextNode())) {
      if (!node.textContent.includes(n)) continue;
      const r = node.parentElement.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      return Math.round(r.top + scrollY);
    }
    return null;
  }, needle);
  if (y === null) return null;
  // scrollIntoView also scrolls inner panels (Google's side panel), not only the window
  await p.evaluate((n) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node; while ((node = w.nextNode())) {
      if (!node.textContent.includes(n)) continue;
      const r = node.parentElement.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      node.parentElement.scrollIntoView({ block: 'center' }); return;
    }
  }, needle);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/${file}` });
  await p.evaluate(() => window.scrollTo(0, 0));
  return { needle, y, screenshot: rel(file) };
}

async function visit(step, url, opts = {}) {
  const ctx = opts.desktop ? desktop : mobile;
  const p = await ctx.newPage();
  const e = { step, viewport: opts.desktop ? '1440x1000' : '390x844', requested: url, status: null, error: null };
  const chain = [];
  p.on('response', (r) => { if (r.request().isNavigationRequest() && r.frame() === p.mainFrame()) chain.push([r.status(), r.url().slice(0, 160)]); });
  try { const r = await p.goto(url, { waitUntil: 'load', timeout: 60000 }); e.status = r?.status() ?? null; }
  catch (err) { e.error = String(err).slice(0, 200); }
  await p.waitForTimeout(opts.wait || 4000);
  e.cookie_declined = await decline(p);
  for (const t of (opts.dismiss ?? ['Go back to web', 'Close', 'Dismiss sign-in info.', 'Not now'])) {
    const l = p.getByRole('button', { name: t }).first();
    if (await l.count().catch(() => 0)) { await l.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(1200); e.dismissed = (e.dismissed || []).concat(t); }
  }
  e.navigation_chain = chain;
  e.final_url = p.url();
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/${step}-fold.png` }); e.screenshot = rel(`${step}-fold.png`);
  Object.assign(e, await info(p).catch(err => ({ info_error: String(err).slice(0, 200) })));
  e.at = [];
  for (const [needle, file] of (opts.at || [])) { const r = await shotAt(p, needle, `${step}-${file}.png`); e.at.push(r || { needle, found: false }); }
  if (opts.full) { await p.screenshot({ path: `${OUT}/${step}-full.png`, fullPage: true }); e.screenshot_full = rel(`${step}-full.png`); }
  if (opts.after) await opts.after(p, e).catch(err => { e.after_error = String(err).slice(0, 200); });
  steps.push(e);
  await p.close();
}

// 1. Google Maps: where the playbook's traveller finds the place.
await visit('01-google-listing', GOOGLE, { wait: 6000 });
await visit('02-google-listing-desktop', GOOGLE, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['Add website', 'add-website'], ['View prices', 'prices'], ['Check availability', 'availability']],
  after: async (p, e) => {
    e.panel = await p.evaluate(() => [...document.querySelectorAll('[data-item-id], button[aria-label], a[aria-label]')]
      .map(x => (x.getAttribute('aria-label') || x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120))
      .filter(t => /website|phone|address|call|book|availability|plus code|check-in|check-out|price|agoda/i.test(t)).slice(0, 30));
    e.offer_links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => ({ label: (a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 100), href: a.getAttribute('href').slice(0, 200) })).filter(x => /booking\.com|agoda|googleadservices|\/travel\/|aclk/i.test(x.href)).slice(0, 12));
    e.website_links = await p.evaluate(() => [...document.querySelectorAll('a[data-item-id="authority"], a[aria-label^="Website"]')].map(a => a.getAttribute('href')));
  },
});
await visit('03-google-old-listing-desktop', GOOGLE_OLD, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['facebook.com', 'website']],
  after: async (p, e) => {
    e.panel = await p.evaluate(() => [...document.querySelectorAll('[data-item-id], button[aria-label], a[aria-label]')]
      .map(x => (x.getAttribute('aria-label') || x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120))
      .filter(t => /website|phone|address|call|book|availability|facebook/i.test(t)).slice(0, 30));
    e.website_links = await p.evaluate(() => [...document.querySelectorAll('a[data-item-id="authority"], a[aria-label^="Website"]')].map(a => a.getAttribute('href')));
  },
});

// 2. Booking.com: the only booking path the business publishes.
await visit('04-booking-com', BOOKING, {
  wait: 6000, full: true,
  at: [['Choose dates to see prices', 'dates'], ['Ask a question', 'ask']],
  after: async (p, e) => {
    // load the lazy sections, then open the two accordions a visitor would tap for terms and contact (read-only)
    for (let y = 0; y < 8000; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(250); }
    e.accordions = [];
    for (const [label, file] of [['Hotel policies', 'policies'], ['Contacting the property', 'contacting']]) {
      const h = p.getByText(label, { exact: true }).first();
      if (!(await h.count())) { e.accordions.push({ label, found: false }); continue; }
      await h.scrollIntoViewIfNeeded(); await h.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(1500);
      await h.evaluate((x) => x.scrollIntoView({ block: 'start' })); await p.waitForTimeout(700);
      await p.screenshot({ path: `${OUT}/04-booking-com-${file}.png` });
      const text = await h.evaluate((x) => { let n = x; for (let i = 0; i < 6 && n.parentElement; i++) { n = n.parentElement; if (n.innerText.length > x.innerText.length + 40) break; } return n.innerText.replace(/\n{2,}/g, '\n').slice(0, 1500); });
      e.accordions.push({ label, screenshot: rel(`04-booking-com-${file}.png`), text });
    }
    // the AI summary at the top of the description (what a visitor reads about the rooms)
    e.summary_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.indexOf('Comfortable Accommodations'); return i < 0 ? null : t.slice(i, i + 700); });
    const r = await shotAt(p, 'Comfortable Accommodations', '04-booking-com-summary.png'); e.at.push(r || { needle: 'Comfortable Accommodations', found: false });
  },
});
await visit('05-booking-old-url', BOOKING_OLD, { wait: 4000 });

// 3. The Facebook page the old Google listing gives as its website.
await visit('06-facebook', FACEBOOK, { wait: 6000, at: [['258 5804', 'phone']] });

// 4. A Google search for the name, as a traveller who heard of the place would type it.
await visit('07-google-search', SEARCH, { wait: 4000 });

await b.close();
writeFileSync(`${DIR}/walk.json`, JSON.stringify({
  walked_at: new Date().toISOString(),
  scope: 'no_site',
  viewport: '390x844 DPR2 mobile, iPhone Safari UA, en-US, logged out (Google listings also at 1440x1000, where the detail rows show)',
  rules: 'read-only; cookie dialogs declined, sign-in prompts closed; no form submitted, no dates or personal data entered, no login, no contact',
  recipe: 'dossier/lotus-surf-house/funnel/make-walk.mjs',
  steps,
}, null, 1));
console.log(steps.map(s => `${s.step} ${s.status} ${s.final_url} tel=${JSON.stringify(s.tel_links)} wa=${s.whatsapp_links} addweb=${s.add_website} captcha=${s.captcha} ${s.error || ''}`).join('\n'));
