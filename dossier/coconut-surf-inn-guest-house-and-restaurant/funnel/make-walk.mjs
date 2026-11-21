#!/usr/bin/env node
// dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/make-walk.mjs — the auditor's hand walk (station 3b,
// auditor 0.1.3, scope no_site) of Coconut Surf Inn's off-site path as a phone sees it: the inn's Google listing, the
// unclaimed "Coconut Surf Restaurant (2nd floor)" listing, the "Coconut Beach" place that carries the inn's phone,
// Booking.com (the booking path), Airbnb (the second engine), Kayak, and a Google search for the name.
/*
# media: dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/walk/*.png
*/
// Read-only: opens pages, declines cookie dialogs, closes sign-in prompts and translation dialogs. No login, no form,
// no dates, no booking, no message, no contact.
// Run from the repo root: node dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/make-walk.mjs
// Writes dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/walk/*.png and …/funnel/walk.json.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const DIR = 'dossier/coconut-surf-inn-guest-house-and-restaurant/funnel';
const OUT = `${DIR}/walk`;
mkdirSync(OUT, { recursive: true });
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const SOCS = { name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVuIAEaBgiA_LyaBg', domain: '.google.com', path: '/' };
const GOOGLE = 'https://www.google.com/maps/place/Coconut+Surf+Inn+Guest+House+and+Restaurant/data=!4m10!3m9!1s0x3ae114e71b426f23:0xe26a608b9e3c1b42!5m2!4m1!1i2!8m2!3d5.9606427!4d80.4028521!16s%2Fg%2F11c0q0glzw!19sChIJI29CG-cU4ToRQhs8notgauI?hl=en';
const GOOGLE_REST = 'https://www.google.com/maps/place/Coconut+Surf+Restaurant+%282nd+floor%29/data=!4m7!3m6!1s0x3ae115004317322d:0xfb15750303ad8d58!8m2!3d5.9607452!4d80.4028573!16s%2Fg%2F11vsw9c7g_!19sChIJLTIXQwAV4ToRWI2tAwN1Ffs?hl=en';
const GOOGLE_BEACH = 'https://www.google.com/maps/place/Coconut+Beach/data=!4m7!3m6!1s0x3ae114e1474f1fef:0x76380a35b311bcfe!8m2!3d5.9588096!4d80.4058413!16s%2Fg%2F11c5hxgc0t!19sChIJ7x9PR-EU4ToR_rwRszUKOHY?hl=en';
const BOOKING = 'https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html';
const AIRBNB = 'https://www.airbnb.com/rooms/2402254';
const KAYAK = 'https://www.kayak.com/Weligama-Hotels-Coconut-Surf-Inn.2771966.ksp';
const SEARCH = 'https://www.google.com/search?q=Coconut+Surf+Inn+Midigama&hl=en';

const b = await chromium.launch();
const mobile = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-US', userAgent: IPHONE });
const desktop = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
for (const c of [mobile, desktop]) await c.addCookies([SOCS]);
const steps = [];
const rel = (f) => `funnel/walk/${f}`;

async function decline(p) {
  for (const sel of ['#onetrust-reject-all-handler', 'button:has-text("Decline")', 'button:has-text("Reject all")', 'button:has-text("Decline optional cookies")', '[aria-label="Decline optional cookies"]', 'button:has-text("Only necessary")']) {
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
      phone_778921396_in_text: /77\s?892\s?1396|778\s?921\s?396|778921396/.test(text),
      add_website: /Add website/.test(text),
      claim_business: /Claim this business/.test(text),
      own_site_links: links.map(a => a.getAttribute('href')).filter(h => /coconutsurf|coconut-surf/i.test(h) && !/booking\.com|google\.|airbnb|kayak|momondo|agoda/.test(h)).slice(0, 10),
      offsite_booking_links: links.filter(a => /booking\.com|agoda|kayak|priceline|expedia|hotels\.com|trip\.com|hometogo|airbnb/i.test(a.getAttribute('href'))).map(a => ({ label: a.innerText.trim().replace(/\s+/g, ' ').slice(0, 80), href: a.getAttribute('href').slice(0, 160) })).slice(0, 15),
      commission_phrases: pick(/[^.\n]*commission[^.\n]*/gi),
      contact_phrases: pick(/[^.\n]*(contact the property|ask a question|questions\?|message the property|message host|contact host|responds within|response rate)[^.\n]*/gi),
      place_names: { midigama: (text.match(/Midigama/g) || []).length, gurubebila: (text.match(/Gurubebila/g) || []).length, weligama: (text.match(/Weligama/g) || []).length, matara: (text.match(/Matara/g) || []).length },
      login_wall: /log in|sign in|create new account/i.test(text) && text.length < 3000,
      captcha: /unusual traffic|not a robot|captcha/i.test(text),
      text_head: text.replace(/\n{2,}/g, '\n').slice(0, 1200),
    };
  });
}

// Scroll to the first visible element whose text contains `needle`; screenshot the viewport there.
async function shotAt(p, needle, file) {
  const found = await p.evaluate((n) => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node; while ((node = w.nextNode())) {
      if (!node.textContent.includes(n)) continue;
      const r = node.parentElement.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      node.parentElement.scrollIntoView({ block: 'center' }); // also scrolls inner panels (Google's side panel)
      return Math.round(r.top + scrollY);
    }
    return null;
  }, needle);
  if (found === null) return null;
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/${file}` });
  await p.evaluate(() => window.scrollTo(0, 0));
  return { needle, y: found, screenshot: rel(file) };
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
  // Google's mobile page sometimes hands the visitor to the app link (maps.app.goo.gl) after "Go back to web";
  // a visitor would come back to the web listing, so reload it once without tapping anything.
  if (opts.stayOn && !p.url().includes(opts.stayOn)) {
    e.left_to = p.url().slice(0, 160);
    await p.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(opts.wait || 4000);
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

const panel = (re) => async (p, e) => {
  e.panel = await p.evaluate((src) => { const re = new RegExp(src, 'i'); return [...document.querySelectorAll('[data-item-id], button[aria-label], a[aria-label]')]
    .map(x => (x.getAttribute('aria-label') || x.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 140))
    .filter(t => re.test(t)).slice(0, 40); }, re);
  e.offer_links = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => ({ label: (a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 100), href: a.getAttribute('href').slice(0, 200) })).filter(x => /booking\.com|agoda|hometogo|googleadservices|\/travel\/|aclk/i.test(x.href)).slice(0, 12));
  e.website_links = await p.evaluate(() => [...document.querySelectorAll('a[data-item-id="authority"], a[aria-label^="Website"]')].map(a => a.getAttribute('href')));
};

// 1. Google Maps: where the playbook's traveller finds the place.
await visit('01-google-listing', GOOGLE, { wait: 6000, stayOn: 'google.com/maps' });
await visit('02-google-listing-desktop', GOOGLE, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['Add website', 'add-website'], ['Check availability', 'availability'], ['View prices', 'prices']],
  after: async (p, e) => {
    await panel('website|phone|address|call|book|availability|plus code|check-in|check-out|price|agoda|pool|hometogo')(p, e);
    // the "About" tab carries the hotel details (amenities); open it read-only and look for what Google claims
    const about = p.getByRole('tab', { name: /About/ }).first();
    if (await about.count().catch(() => 0)) {
      await about.click({ timeout: 4000 }).catch(() => {}); await p.waitForTimeout(2500);
      e.about_text = await p.evaluate(() => { const m = document.querySelector('[role="main"]'); return (m ? m.innerText : '').replace(/\n{2,}/g, '\n').slice(0, 1500); });
      const r = await shotAt(p, 'Pool', '02-google-listing-desktop-about-pool.png'); e.at.push(r || { needle: 'Pool (About tab)', found: false });
    } else e.about_text = null;
  },
});
await visit('03-google-restaurant-desktop', GOOGLE_REST, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['Claim this business', 'claim'], ['Add website', 'add-website']],
  after: panel('website|phone|address|call|hours|claim|menu|reserve|order|plus code'),
});
await visit('04-google-beach-desktop', GOOGLE_BEACH, {
  desktop: true, wait: 6000, dismiss: [],
  at: [['892 1396', 'phone']],
  after: panel('website|phone|address|call|plus code'),
});

// 2. Booking.com: the booking path the dossier records (booking.path = engine).
await visit('05-booking-com', BOOKING, {
  wait: 6000, full: true,
  at: [['Choose dates to see prices', 'dates'], ['Ask a question', 'ask'], ['1.3 km', 'distance']],
  after: async (p, e) => {
    for (let y = 0; y < 9000; y += 700) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(250); }
    e.accordions = [];
    for (const [label, file] of [['Accommodation Policies', 'policies'], ['Hotel policies', 'policies'], ['Contacting the property', 'contacting']]) {
      const h = p.getByText(label, { exact: true }).first();
      if (!(await h.count())) { e.accordions.push({ label, found: false }); continue; }
      await h.scrollIntoViewIfNeeded(); await h.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(1500);
      await h.evaluate((x) => x.scrollIntoView({ block: 'start' })); await p.waitForTimeout(700);
      await p.screenshot({ path: `${OUT}/05-booking-com-${file}.png` });
      const text = await h.evaluate((x) => { let n = x; for (let i = 0; i < 6 && n.parentElement; i++) { n = n.parentElement; if (n.innerText.length > x.innerText.length + 40) break; } return n.innerText.replace(/\n{2,}/g, '\n').slice(0, 1500); });
      e.accordions.push({ label, screenshot: rel(`05-booking-com-${file}.png`), text });
    }
    // Booking's own summary at the top of the description (what a visitor reads about the rooms)
    e.summary_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.indexOf('Each room'); return i < 0 ? null : t.slice(Math.max(0, i - 400), i + 500); });
    const r = await shotAt(p, 'Each room', '05-booking-com-summary.png'); e.at.push(r || { needle: 'Each room', found: false });
    e.faq_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.indexOf('1.3 km'); return i < 0 ? null : t.slice(Math.max(0, i - 300), i + 200); });
    // The Q&A: "Show all questions", then the button that lets a visitor send their own question. Tapped to see what
    // it asks for; nothing is typed or sent.
    const all = p.getByText('Show all questions', { exact: true }).first();
    if (await all.count()) {
      await all.scrollIntoViewIfNeeded(); await all.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(3000);
      await p.screenshot({ path: `${OUT}/05-booking-com-questions.png` });
      e.questions = { url_after_tap: p.url().slice(0, 200), text: (await p.evaluate(() => { const d = document.querySelector('[role="dialog"], [aria-modal="true"]'); return (d ? d.innerText : '').replace(/\n{2,}/g, '\n').slice(0, 1500); })), screenshot: rel('05-booking-com-questions.png') };
    }
    const ask = p.getByRole('button', { name: /^(Ask a question|Ask a different question|Ask a new question)$/ }).first();
    if (await ask.count()) {
      await ask.scrollIntoViewIfNeeded(); await ask.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(4000);
      e.ask_question = { url_after_tap: p.url().slice(0, 200), text: (await p.evaluate(() => { const d = document.querySelector('[role="dialog"], [aria-modal="true"]'); return (d ? d.innerText : document.body.innerText.slice(0, 600)).replace(/\n{2,}/g, '\n').slice(0, 800); })) };
      await p.screenshot({ path: `${OUT}/05-booking-com-ask-tapped.png` }); e.ask_question.screenshot = rel('05-booking-com-ask-tapped.png');
    }
  },
});

// 3. Airbnb: the second engine, where the host's own words live.
await visit('06-airbnb', AIRBNB, {
  wait: 7000, dismiss: ['Close', 'Not now', 'Dismiss'],
  at: [['Shared bathroom', 'header'], ['Responds within', 'response']],
  after: async (p, e) => {
    // the host's own description sits behind "Show more"; open it read-only and shoot the rooms paragraph
    const more = p.getByText('Show more', { exact: true }).first();
    if (await more.count().catch(() => 0)) {
      await more.scrollIntoViewIfNeeded(); await more.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(2500);
      e.description_modal = await p.evaluate(() => { const d = document.querySelector('[role="dialog"], [aria-modal="true"]'); return (d ? d.innerText : '').replace(/\n{2,}/g, '\n').slice(0, 2500); });
      const g = p.locator('[role="dialog"], [aria-modal="true"]').getByText('Guest access', { exact: true }).first();
      if (await g.count().catch(() => 0)) {
        await g.evaluate((x) => x.scrollIntoView({ block: 'start' })); await p.waitForTimeout(900);
        await p.screenshot({ path: `${OUT}/06-airbnb-description-rooms.png` });
        e.at.push({ needle: 'Guest access (description modal)', screenshot: rel('06-airbnb-description-rooms.png') });
      } else e.at.push({ needle: 'Guest access (description modal)', found: false });
      await p.keyboard.press('Escape').catch(() => {}); await p.waitForTimeout(1000);
    }
    e.response_text = await p.evaluate(() => { const t = document.body.innerText; const i = t.search(/Responds within|Response rate/); return i < 0 ? null : t.slice(Math.max(0, i - 200), i + 300); });
    // "Message host" is the one pre-booking channel on the listing. Tap it to see what it asks for; nothing is typed or sent.
    const m = p.getByText(/^(Message host|Contact host|Message Host)$/).first();
    if (await m.count().catch(() => 0)) {
      await m.scrollIntoViewIfNeeded(); await m.click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(4000);
      e.message_host = { url_after_tap: p.url().slice(0, 200), text: (await p.evaluate(() => { const d = document.querySelector('[role="dialog"], [aria-modal="true"]'); return (d ? d.innerText : document.body.innerText.slice(0, 600)).replace(/\n{2,}/g, '\n').slice(0, 800); })) };
      await p.screenshot({ path: `${OUT}/06-airbnb-message-tapped.png` }); e.message_host.screenshot = rel('06-airbnb-message-tapped.png');
    } else e.message_host = { found: false };
  },
});

// 4. Kayak: the meta-search page that shows the phone.
await visit('07-kayak', KAYAK, { wait: 5000, at: [['778 921 396', 'phone']] });

// 5. A Google search for the name and the village the owner uses, as a traveller who heard of the place would type it.
await visit('08-google-search', SEARCH, { wait: 4000 });

await b.close();
writeFileSync(`${DIR}/walk.json`, JSON.stringify({
  walked_at: new Date().toISOString(),
  scope: 'no_site',
  viewport: '390x844 DPR2 mobile, iPhone Safari UA, en-US, logged out (Google listings also at 1440x1000, where the detail rows show)',
  rules: 'read-only; cookie dialogs declined, sign-in prompts closed; no form submitted, no dates or personal data entered, no login, no message, no contact',
  recipe: 'dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/make-walk.mjs',
  steps,
}, null, 1));
console.log(steps.map(s => `${s.step} ${s.status} ${s.final_url} tel=${JSON.stringify(s.tel_links)} wa=${s.whatsapp_links} addweb=${s.add_website} claim=${s.claim_business} phone=${s.phone_778921396_in_text} captcha=${s.captcha} ${s.error || ''}`).join('\n'));
