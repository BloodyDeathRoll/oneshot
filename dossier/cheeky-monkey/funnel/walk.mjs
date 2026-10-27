#!/usr/bin/env node
// dossier/cheeky-monkey/funnel/walk.mjs — the auditor's hand walk (station 3b, auditor 0.1.3) of
// cheekymonkeymidigama.com and its off-site path (Google listing, Booking.com, Instagram, Facebook), as a phone sees it.
// media: dossier/cheeky-monkey/funnel/walk/*.png
// Read-only: opens pages, opens the site's menu, declines cookie dialogs. No login, no form, no dates, no booking, no contact.
// Run from the repo root: node dossier/cheeky-monkey/funnel/walk.mjs dossier/cheeky-monkey/funnel/walk
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = process.argv[2] || 'dossier/cheeky-monkey/funnel/walk';
mkdirSync(OUT, { recursive: true });
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SITE = 'https://cheekymonkeymidigama.com';
const GOOGLE = 'https://www.google.com/maps/place/Cheeky+Monkey/data=!4m10!3m9!1s0x3ae114c1f7d9fc01:0xb59451ca09648650!5m2!4m1!1i2!8m2!3d5.9617986!4d80.3967609!16s%2Fg%2F11b6scl3ts!19sChIJAfzZ98EU4ToRUIZkCcpRlLU?hl=en';
const BOOKING = 'https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-US', userAgent: IPHONE });
await ctx.addCookies([{ name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg', domain: '.google.com', path: '/' }]);
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
    return {
      title: document.title,
      doc_width: document.documentElement.scrollWidth,
      body_width: document.body ? document.body.scrollWidth : null,
      page_height: document.documentElement.scrollHeight,
      text_chars: text.length,
      tel_links: links.filter(a => a.getAttribute('href').startsWith('tel:')).length,
      whatsapp_links: links.filter(a => /wa\.me|whatsapp\.com/.test(a.getAttribute('href'))).length,
      booking_com_links: links.filter(a => /booking\.com/.test(a.getAttribute('href'))).map(a => ({ label: a.innerText.trim().slice(0, 60), href: a.getAttribute('href') })),
      shortcodes: (text.match(/\[(contact-form-7|ninja_form|heading)[^\]]*\]/g) || []),
      php_notices: (text.match(/Notice: Function/g) || []).length,
      lorem: /lorem ipsum|dolorem ipsum/i.test(text),
      site_links: [...document.querySelectorAll('a[href]')].filter(a => /cheekymonkeymidigama|l\.instagram\.com|l\.facebook\.com/.test(a.getAttribute('href'))).map(a => ({ label: a.innerText.trim().slice(0, 60), href: a.getAttribute('href').slice(0, 200) })),
      reservation_links: [...document.querySelectorAll('a[href]')].filter(a => /reserv|enquir|book/i.test(a.innerText)).map(a => ({ label: a.innerText.trim().slice(0, 60), href: a.getAttribute('href').slice(0, 200) })),
      phone_in_text: /\+?94[\s\-()]*71[\s-]*924|0719248686|071 ?924/.test(text),
      price_mentions: (text.match(/(USD|US\$|\$|£|LKR|Rs\.?)\s?\d[\d,.]*/g) || []).slice(0, 30),
      text_head: text.replace(/\n{2,}/g, '\n').slice(0, 1500),
    };
  });
}

// Scroll to the first visible element whose text contains `needle`, screenshot the viewport there.
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
  await p.evaluate((y) => window.scrollTo(0, Math.max(0, y - 250)), y); await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/${file}` });
  await p.evaluate(() => window.scrollTo(0, 0));
  return { needle, y, screenshot: rel(file) };
}

async function visit(step, url, opts = {}) {
  const p = await ctx.newPage();
  const e = { step, requested: url, status: null, error: null };
  try { const r = await p.goto(url, { waitUntil: 'load', timeout: 60000 }); e.status = r?.status() ?? null; }
  catch (err) { e.error = String(err).slice(0, 200); }
  await p.waitForTimeout(opts.wait || 3500);
  e.cookie_declined = await decline(p);
  for (const t of ['Go back to web', 'Close']) { const l = p.getByRole('button', { name: t }).first(); if (await l.count().catch(() => 0)) { await l.click({ timeout: 3000 }).catch(() => {}); await p.waitForTimeout(1200); e.dismissed = (e.dismissed || []).concat(t); } }
  e.final_url = p.url();
  await p.screenshot({ path: `${OUT}/${step}-fold.png` }); e.screenshot = rel(`${step}-fold.png`);
  if (opts.full) { await p.screenshot({ path: `${OUT}/${step}-full.png`, fullPage: true }); e.screenshot_full = rel(`${step}-full.png`); }
  Object.assign(e, await info(p).catch(err => ({ info_error: String(err).slice(0, 200) })));
  e.at = [];
  for (const [needle, file] of (opts.at || [])) { const r = await shotAt(p, needle, `${step}-${file}.png`); e.at.push(r || { needle, found: false }); }
  if (opts.after) await opts.after(p, e);
  steps.push(e);
  await p.close();
}

// 1. The site, as the funnel tool reached it and beyond (orphan pages come from the WordPress sitemap, not the menu).
await visit('01-home', SITE + '/', {
  full: true,
  at: [['GOOD TO KNOW', 'renovation-banner'], ['71 924 8686', 'phone-text'], ['cheekymonkeymidi@gmail.com', 'email-text']],
  after: async (p, e) => {
    // sideways scroll: scroll the page right as far as it goes and capture what a phone sees
    await p.evaluate(() => window.scrollTo(10000, 0)); await p.waitForTimeout(600);
    e.scroll_x_max = await p.evaluate(() => window.scrollX);
    await p.screenshot({ path: `${OUT}/01-home-scrolled-right.png` }); e.screenshot_scrolled_right = rel('01-home-scrolled-right.png');
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    // open the menu
    const t = p.locator('.elementor-menu-toggle, [aria-label*="Menu" i], button.menu-toggle').first();
    if (await t.count()) {
      await t.click({ timeout: 5000 }).catch(err => e.menu_error = String(err).slice(0, 120)); await p.waitForTimeout(1200);
      e.menu_items = await p.evaluate(() => [...document.querySelectorAll('nav a, .elementor-nav-menu--dropdown a')].filter(a => { const r = a.getBoundingClientRect(); return r.height > 0; }).map(a => [a.innerText.trim(), a.getAttribute('href')]));
      await p.screenshot({ path: `${OUT}/01-home-menu-open.png` }); e.screenshot_menu = rel('01-home-menu-open.png');
    }
  },
});
await visit('02-contact', SITE + '/contact/', { full: true, at: [['contact-form-7', 'shortcode']] });
await visit('03-our-services', SITE + '/our-services/', { full: true, at: [['USD 20', 'lesson-price'], ['Reservation', 'reservation-enquiry']] });
await visit('04-packages', SITE + '/surf-camp-packages-sri-lanka/', {
  full: true,
  after: async (p, e) => {
    // on a phone the price table sits in a closed accordion: tap its "Prices" heading (read-only)
    const tab = p.locator('.vc_tta-panel-title a', { hasText: 'Prices' }).first();
    if (await tab.count()) { await tab.click({ timeout: 5000 }).catch(err => e.prices_tab_error = String(err).slice(0, 120)); await p.waitForTimeout(1500); e.prices_tab_opened = true; }
    e.prices_visible_after_tap = await p.evaluate(() => document.body.innerText.includes('USD 400'));
    const first = p.locator('button', { hasText: 'Book Now' }).first();
    if (await first.count()) {
      await first.evaluate((x) => { x.scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(900);
      await p.screenshot({ path: `${OUT}/04-packages-price-table.png` }); e.screenshot_price_table = rel('04-packages-price-table.png');
    }
    // the price table's "Book Now" are <button onclick=location.href=...>, not links: record where each one goes
    e.book_now_buttons = await p.evaluate(() => [...document.querySelectorAll('button')].filter(x => /book now/i.test(x.innerText)).map(x => { const m = (x.getAttribute('onclick') || '').match(/https?:[^'"]+/); return { label: x.innerText.trim(), target: m ? m[0] : null, cell: x.parentElement.innerText.replace(/\s+/g, ' ').trim().slice(0, 60) }; }));
  },
});
// What a visitor meets after tapping the first package's "Book Now" (opened by URL, nothing entered).
await visit('04b-packages-book-now-target', 'https://www.payhere.lk/pay/o6fad45', { wait: 5000 });
await visit('05-booking-surf-camp', SITE + '/booking-surf-camp/', { full: true, at: [['ninja_form', 'shortcode']] });
await visit('06-service-surf-lesson', SITE + '/service/surf-lesson/', { at: [['Lorem', 'lorem']] });
await visit('07-product-surf-pakage', SITE + '/product/surf-pakage/', {});
await visit('08-aboutus', SITE + '/aboutus/', {});

// 2. Off site: Google listing, Booking.com, Instagram, Facebook.
await visit('09-google-listing', GOOGLE, { wait: 6000, full: false, at: [['Add website', 'add-website'], ['71 924 8686', 'phone']] });
await visit('10-booking-com', BOOKING, { wait: 6000, at: [['Reserve', 'reserve'], ['Questions', 'qa'], ['Property information', 'host-info']] });
await visit('11-instagram', 'https://www.instagram.com/cheekymonkeysrilanka/', { wait: 6000 });
await visit('12-facebook', 'https://www.facebook.com/cheekymonkeysrilanka/', { wait: 6000, at: [['closed for low season', 'intro']] });

// Google listing at desktop width too: the mobile web view hides the listing's detail rows behind the app prompt.
{
  const d = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  await d.addCookies([{ name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg', domain: '.google.com', path: '/' }]);
  const p = await d.newPage();
  const e = { step: '13-google-listing-desktop', requested: GOOGLE, viewport: '1440x1000' };
  try { const r = await p.goto(GOOGLE, { waitUntil: 'load', timeout: 60000 }); e.status = r?.status(); } catch (err) { e.error = String(err).slice(0, 200); }
  await p.waitForTimeout(6000);
  e.final_url = p.url();
  await p.screenshot({ path: `${OUT}/13-google-listing-desktop.png` }); e.screenshot = rel('13-google-listing-desktop.png');
  e.panel = await p.evaluate(() => [...document.querySelectorAll('[data-item-id], button[aria-label], a[aria-label]')].map(x => (x.getAttribute('aria-label') || x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 120)).filter(t => /website|phone|address|call|book|check availability|plus code/i.test(t)).slice(0, 30));
  e.has_add_website = await p.getByText('Add website').count();
  e.website_links = await p.evaluate(() => [...document.querySelectorAll('a[data-item-id="authority"], a[aria-label^="Website"]')].map(a => a.getAttribute('href')));
  const aw = p.getByText('Add website').first();
  if (await aw.count()) { await aw.scrollIntoViewIfNeeded().catch(() => {}); await p.waitForTimeout(800); await p.screenshot({ path: `${OUT}/13-google-listing-desktop-add-website.png` }); e.screenshot_add_website = rel('13-google-listing-desktop-add-website.png'); }
  steps.push(e);
  await d.close();
}

await b.close();
writeFileSync(`${OUT}/../walk-hand.json`, JSON.stringify({
  walked_at: new Date().toISOString(),
  viewport: '390x844 DPR2 mobile, iPhone Safari UA, en-US, logged out',
  rules: 'read-only; menu opened, cookie dialogs declined; no form submitted, no dates or personal data entered, no login, no contact',
  recipe: 'dossier/cheeky-monkey/funnel/walk.mjs',
  steps,
}, null, 1));
console.log(steps.map(s => `${s.step} ${s.status} ${s.final_url} w=${s.doc_width} tel=${s.tel_links} wa=${s.whatsapp_links} ${s.error || ''}`).join('\n'));
