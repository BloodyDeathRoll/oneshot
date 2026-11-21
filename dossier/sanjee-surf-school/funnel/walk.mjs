#!/usr/bin/env node
// dossier/sanjee-surf-school/funnel/walk.mjs — the auditor's hand walk (station 3b, auditor 0.1.3) of
// sanjee-surf.com and its off-site path (Google listing, the linked social accounts), as a phone sees it.
// Made by funnel/make-walk.sh, which carries the media header.
// Read-only: opens pages, opens the menu and the booking dialog, taps through its choices. Types nothing, ticks
// nothing, submits nothing. Any write to the site's backend or to Stripe is aborted by the route guard below and logged.
// No login and no cookies of ours. Light on purpose: one load of the home page, a handful of others, spaced apart.
// Run from the repo root: node dossier/sanjee-surf-school/funnel/walk.mjs dossier/sanjee-surf-school/funnel/walk
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = process.argv[2] || 'dossier/sanjee-surf-school/funnel/walk';
const JSON_OUT = OUT.replace(/\/walk\/?$/, '') + '/walk-hand.json';
mkdirSync(OUT, { recursive: true });
const SITE = 'https://sanjee-surf.com';
const GOOGLE = 'https://www.google.com/maps/place/Sanjee+Surf+School/data=!4m7!3m6!1s0x3ae1156e4b0b7fab:0x3e8ea0f911f62414!8m2!3d5.9603113!4d80.4039507!16s%2Fg%2F11ybcfd3tx!19sChIJq38LS24V4ToRFCT2Efmgjj4?hl=en';
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const GAP_MS = 5000;

const log = { walked_at: new Date().toISOString(), viewport: '390x844, iPhone UA, en-GB', backend_calls: [], blocked_writes: [], steps: [] };
const step = (name, data) => { log.steps.push({ name, at: new Date().toISOString(), ...data }); console.log(`\n== ${name}\n${JSON.stringify(data, null, 1)}`); };
const save = () => writeFileSync(JSON_OUT, JSON.stringify(log, null, 1) + '\n');
const wait = (p, ms) => p.waitForTimeout(ms);

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en-GB', userAgent: IPHONE });

// The guard: reads pass, writes do not, except the two reads the page makes by POST.
await ctx.route('**/*', async (route) => {
  const r = route.request();
  const m = r.method();
  if (['GET', 'HEAD', 'OPTIONS'].includes(m)) return route.continue();
  const u = r.url();
  if (/functions\/v1\/[^?]*(surf|condition|avail|slot|booked)/i.test(u)) return route.continue();
  log.blocked_writes.push({ method: m, url: u.split('?')[0] });
  return route.abort();
});

const page = await ctx.newPage();
const pageErrors = [];
page.on('console', (m) => { if (m.type() === 'error') pageErrors.push(m.text().slice(0, 160)); });
page.on('response', async (res) => {
  const u = res.url();
  if (!/supabase\.co|functions\/v1|rest\/v1/.test(u)) return;
  const h = res.headers();
  const entry = { method: res.request().method(), path: new URL(u).pathname, status: res.status(), at: new Date().toISOString() };
  for (const k of ['retry-after', 'x-ratelimit-limit', 'x-ratelimit-remaining', 'x-ratelimit-reset', 'ratelimit-reset']) if (h[k]) entry[k] = h[k];
  if (/functions\/v1/.test(u)) { try { const t = (await res.text()).slice(0, 400); if (!log.backend_calls.some((c) => c.body === t)) entry.body = t; } catch {} }
  log.backend_calls.push(entry);
});

const shot = async (p, file, opts = {}) => { await p.screenshot({ path: `${OUT}/${file}`, ...opts }); return `funnel/walk/${file}`; };

// Scroll the deepest element holding this text to the middle of the screen, shoot, and say what is there.
async function at(p, re, file) {
  const found = await p.evaluate(({ src }) => {
    const rx = new RegExp(src, 'i');
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const hits = [...document.querySelectorAll('body *')].filter((e) => vis(e) && rx.test(e.innerText || '') );
    const el = hits.at(-1);
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    let box = el;
    while (box.parentElement && (box.innerText || '').length < 250) box = box.parentElement;
    return { top: Math.round(el.getBoundingClientRect().top + scrollY), text: el.innerText.slice(0, 200), context: (box.innerText || '').slice(0, 900) };
  }, { src: re.source });
  if (found) await wait(p, 900);
  return { re: re.source, found, shot: found && file ? await shot(p, file) : null };
}

const glance = (p) => p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const links = [...document.querySelectorAll('a[href]')];
  const list = (re) => links.filter((a) => re.test(a.getAttribute('href'))).map((a) => ({ href: a.getAttribute('href'), text: (a.innerText || '').trim().slice(0, 50), top: Math.round(a.getBoundingClientRect().top + scrollY), h: Math.round(a.getBoundingClientRect().height), visible: vis(a) }));
  return {
    title: document.title,
    doc_width: document.documentElement.scrollWidth,
    page_height: document.documentElement.scrollHeight,
    tel: list(/^tel:/), whatsapp: list(/wa\.me|whatsapp/i), mailto: list(/^mailto:/),
    socials: list(/instagram|facebook|youtube|tiktok/i),
  };
});

// ---------------------------------------------------------------- the home page: a single load
const respHome = await page.goto(SITE + '/', { waitUntil: 'load', timeout: 45000 });
const t0 = Date.now();
const toast = [];
let shotDone = false;
for (let i = 0; i < 40; i++) {           // 20 s of watching the first screen, nothing else
  const s = await page.evaluate(() => {
    const el = [...document.querySelectorAll('li,[role=status],[role=alert]')].filter((e) => /Could not refresh/i.test(e.innerText || '') && e.getBoundingClientRect().height > 20 && e.getBoundingClientRect().top < 800)[0];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
  });
  toast.push({ ms: Date.now() - t0, on_screen: s });
  if (i === 2) await shot(page, '01-home-fold-1s.png');
  if (s && !shotDone) { await shot(page, '01-home-toast.png'); shotDone = true; }
  await wait(page, 500);
}
await shot(page, '01-home-fold-settled.png');
const fold = await page.evaluate(() => {
  const vp = { w: innerWidth, h: innerHeight, vv_w: visualViewport?.width, vv_h: visualViewport?.height, vv_scale: visualViewport?.scale };
  const inView = [...document.querySelectorAll('h1,h2,h3,p,span,a,button')].filter((e) => { const r = e.getBoundingClientRect(); return r.height > 0 && r.top >= 0 && r.top < 844 && e.children.length === 0 && (e.innerText || '').trim(); }).map((e) => e.innerText.trim().slice(0, 100));
  const banner = [...document.querySelectorAll('div,section,aside')].filter((e) => /essential cookies/i.test(e.innerText || '') && (e.innerText || '').length < 300).at(-1);
  const bannerRect = banner?.getBoundingClientRect();
  const btns = banner ? [...banner.closest('div,section').parentElement.querySelectorAll('button,a')].map((x) => { const r = x.getBoundingClientRect(); return { text: (x.innerText || '').trim(), top: Math.round(r.top), bottom: Math.round(r.bottom) }; }) : [];
  const over = [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > 391 && getComputedStyle(e).position !== 'fixed').slice(0, 12).map((e) => ({ tag: e.tagName, cls: String(e.className).slice(0, 60), right: Math.round(e.getBoundingClientRect().right), text: (e.innerText || '').slice(0, 40) }));
  const heroImg = [...document.images].filter((i) => i.getBoundingClientRect().top < 200 && i.getBoundingClientRect().height > 300).map((i) => ({ src: i.currentSrc, alt: i.alt }));
  const meta = Object.fromEntries(['og:title', 'og:description', 'og:image'].map((k) => [k, document.querySelector(`meta[property="${k}"]`)?.content]));
  return { vp, inView, banner: bannerRect ? { top: Math.round(bannerRect.top), bottom: Math.round(bannerRect.bottom), left: Math.round(bannerRect.left), right: Math.round(bannerRect.right) } : null, banner_buttons: btns, overflowing: over, heroImg, meta };
});
const toastSeen = toast.filter((t) => t.on_screen);
step('home first load', {
  status: respHome.status(), ...await glance(page), ...fold,
  toast: { seen: toastSeen.length > 0, first_ms: toastSeen[0]?.ms ?? null, last_ms: toastSeen.at(-1)?.ms ?? null, rect: toastSeen[0]?.on_screen ?? null },
  surf_calls: { total: log.backend_calls.filter((c) => /surf-conditions/.test(c.path)).length, ok: log.backend_calls.filter((c) => /surf-conditions/.test(c.path) && c.status === 200).length, refused: log.backend_calls.filter((c) => /surf-conditions/.test(c.path) && c.status === 429).map((c) => c.at), first: log.backend_calls.find((c) => /surf-conditions/.test(c.path))?.at, sample_ok_body: log.backend_calls.find((c) => /surf-conditions/.test(c.path) && c.status === 200)?.body, refusal_body: log.backend_calls.find((c) => /surf-conditions/.test(c.path) && c.status === 429)?.body },
  header_nav: await page.evaluate(() => [...document.querySelectorAll('header,nav,header *,nav *')].filter((e) => ['HEADER', 'NAV', 'A', 'BUTTON'].includes(e.tagName)).map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName, text: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 30), top: Math.round(r.top + scrollY), h: Math.round(r.height), visible: r.height > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none', y_opacity: getComputedStyle(e).opacity }; }).slice(0, 25)),
});
save();

// The page once through, so what loads on scroll has loaded; then the fixed things at mid-page.
const H = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 800) { await page.evaluate((v) => scrollTo(0, v), y); await wait(page, 150); }
await page.evaluate(() => scrollTo(0, 3000)); await wait(page, 500);
const fixed = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => ['fixed', 'sticky'].includes(getComputedStyle(e).position) && e.getBoundingClientRect().height > 0).map((e) => { const r = e.getBoundingClientRect(); return { pos: getComputedStyle(e).position, tag: e.tagName, top: Math.round(r.top), bottom: Math.round(r.bottom), text: (e.innerText || '').trim().slice(0, 80) }; }));
step('fixed or sticky at scroll 3000', { fixed, shot: await shot(page, '02-home-scroll-3000.png') });

// The width once the page has been scrolled: on load it is 417 px, which is the slide-in of a section not yet revealed.
step('width after scrolling', { doc_width: await page.evaluate(() => document.documentElement.scrollWidth), inner_width: await page.evaluate(() => innerWidth) });
await page.evaluate(() => scrollTo(0, 0)); await wait(page, 500);

// The menu.
const menuBtn = page.locator('header button:visible, nav button:visible, button[aria-label*="menu" i]:visible').first();
step('menu button on a phone', { count: await menuBtn.count() });
if (await menuBtn.count()) {
  await menuBtn.click({ timeout: 4000 }).catch((e) => step('menu click failed', { e: String(e).slice(0, 150) }));
  await wait(page, 800);
  const items = await page.evaluate(() => [...document.querySelectorAll('header a, nav a, header button, nav button')].filter((e) => e.getBoundingClientRect().height > 0).map((e) => ({ text: (e.innerText || '').trim().slice(0, 40), href: e.getAttribute('href') })));
  step('menu', { items, shot: await shot(page, '03-home-menu-open.png') });
  await menuBtn.click({ timeout: 3000 }).catch(() => {});
  await wait(page, 500);
}
save();

// Sections of the home page a visitor scrolls past.
for (const [re, f] of [
  [/surf rating/, '04-home-surf-report.png'],
  [/temporarily unavailable/, null],
  [/sessions are private/, '05-home-all-private.png'],
  [/GOOGLE REVIEWS/, '06-home-reviews.png'],
  [/1 week ago/, '06-home-review-dates.png'],
  [/on Google/, '06-home-google-badge.png'],
  [/2,000/, '06-home-bio-2000.png'],
  [/Students/, '06-home-stats.png'],
  [/Tropical Beach/, '07-home-contact-block.png'],
  [/Making waves, one lesson/, '08-home-footer.png'],
]) step(`home: ${re.source}`, await at(page, re, f));
save();

// The one dated form the funnel tool found.
const forms = await page.evaluate(() => [...document.forms].filter((f) => f.getBoundingClientRect().height > 0).map((f) => {
  let box = f; while (box.parentElement && (box.innerText || '').length < 120) box = box.parentElement;
  return { top: Math.round(f.getBoundingClientRect().top + scrollY), action: f.getAttribute('action'), fields: [...f.querySelectorAll('input,select,textarea')].map((i) => ({ tag: i.tagName, type: i.type, name: i.name, ph: i.placeholder })), buttons: [...f.querySelectorAll('button')].map((x) => (x.innerText || '').trim().slice(0, 40)), context: (box.innerText || '').slice(0, 500) };
}));
step('forms on the home page', { forms });
if (forms[0]) {
  await page.evaluate((y) => scrollTo(0, y - 150), forms[0].top); await wait(page, 700);
  step('form shot', { shot: await shot(page, '09-home-dated-form.png') });
}

// "Contact Us" further down: tap it, and see what it does.
const contact = page.locator('button:has-text("Contact Us")').first();
if (await contact.count()) {
  const before = await page.evaluate(() => scrollY);
  await contact.scrollIntoViewIfNeeded().catch(() => {});
  await wait(page, 500);
  const near = await shot(page, '10-home-contact-us-button.png');
  await contact.click({ timeout: 4000 }).catch((e) => step('contact click failed', { e: String(e).slice(0, 150) }));
  await wait(page, 1200);
  step('Contact Us tapped', { before, after: await page.evaluate(() => scrollY), url: page.url(), near, dialog: await page.evaluate(() => (document.querySelector('[role=dialog]')?.innerText || '').slice(0, 500)), shot: await shot(page, '10-home-contact-us-after.png') });
  await page.keyboard.press('Escape'); await wait(page, 500);
}
save();

// ---------------------------------------------------------------- the booking dialog, same load, from the first screen
await page.evaluate(() => scrollTo(0, 0)); await wait(page, 600);
const dlgInfo = () => page.evaluate(() => {
  const d = document.querySelector('[role=dialog]');
  if (!d) return { open: false, scrollY, top_text: [...document.querySelectorAll('h2')].filter((h) => { const r = h.getBoundingClientRect(); return r.top >= 0 && r.top < 400; }).map((h) => h.innerText).slice(0, 3) };
  const r = d.getBoundingClientRect();
  return {
    open: true, rect: { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) }, viewport: { layout_w: innerWidth, visual_w: visualViewport?.width }, scrollable: d.scrollHeight > d.clientHeight, text: (d.innerText || '').slice(0, 1300),
    buttons: [...d.querySelectorAll('button')].filter((x) => x.getBoundingClientRect().height > 0 && !x.closest('[role=grid],table')).map((x) => { const q = x.getBoundingClientRect(); return { text: (x.innerText || x.getAttribute('aria-label') || '').trim().slice(0, 70), disabled: x.disabled, top: Math.round(q.top), bottom: Math.round(q.bottom), left: Math.round(q.left), right: Math.round(q.right) }; }),
    inputs: [...d.querySelectorAll('input,select,textarea')].map((i) => ({ tag: i.tagName, type: i.type, name: i.name || i.id, ph: i.placeholder, required: i.required })),
    links: [...d.querySelectorAll('a[href]')].map((a) => ({ text: (a.innerText || '').trim().slice(0, 40), href: a.href.slice(0, 80) })),
  };
});
let taps = 0;
const dlg = page.locator('[role=dialog]');
async function wstep(label, file) {
  await wait(page, 1000);
  const info = await dlgInfo();
  step(`wizard: ${label}`, { taps_so_far: taps, ...info, shot: await shot(page, file) });
  save();
  return info;
}
const tapIn = async (re) => { const l = dlg.locator('button').filter({ hasText: re }).first(); if (!(await l.count())) return false; await l.click({ timeout: 5000 }); taps++; return true; };

await page.locator('button:has-text("Book Your Lesson")').first().click({ timeout: 5000 }); taps++;
let info = await wstep('after hero button', '11-wizard-1-after-hero.png');
if (info.open) {
  if (await tapIn(/lesson/i)) info = await wstep('type: lessons', '11-wizard-2-type.png');
  if (await tapIn(/Beginner/i)) info = await wstep('offer: beginner', '11-wizard-3-offer.png');
  // Next, if the offer step asks for one.
  // A date a week or so ahead: the first enabled day after the 6th enabled.
  const days = dlg.locator('button[name="day"]:not([disabled]), [role=gridcell]:not([aria-disabled="true"]) button:not([disabled]), button[role=gridcell]:not([disabled])');
  const n = await days.count();
  step('wizard: days enabled in the calendar', { n });
  if (n) {
    await days.nth(Math.min(6, n - 1)).click({ timeout: 5000 }); taps++;
    info = await wstep('date picked', '11-wizard-4-date.png');
    if (await tapIn(/8:00/)) info = await wstep('slot picked', '11-wizard-5-slot.png');
    if (info.buttons?.some((x) => /^continue$/i.test(x.text) && !x.disabled)) { await tapIn(/^\s*Continue\s*$/i); info = await wstep('continue after slot', '11-wizard-6-details.png'); }
    // Show the bottom of the last step; the pay button is read, never pressed.
    await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); if (d) d.scrollTop = d.scrollHeight; });
    await page.evaluate(() => { const x = [...document.querySelectorAll('[role=dialog] button')].find((e) => /pay/i.test(e.innerText || '')); x?.scrollIntoView({ block: 'center' }); });
    await wstep('bottom of the last step, nothing typed', '11-wizard-7-pay-button.png');
  }
  await dlg.getByRole('button', { name: 'Close' }).first().click({ timeout: 4000 }).catch(() => {}); await wait(page, 700);
}

// A lesson card's own Book Now: where does it start?
const card = page.locator('button:text-is("Book Now")').first();
if (await card.count()) {
  await card.scrollIntoViewIfNeeded().catch(() => {}); await wait(page, 600);
  await card.click({ timeout: 5000 }).catch(() => {});
  await wait(page, 1000);
  const ci = await dlgInfo();
  step('lesson card Book Now', { ...ci, shot: await shot(page, '12-card-book-now.png') });
  await page.keyboard.press('Escape'); await wait(page, 500);
}
step('errors in the page console during this load', { errors: pageErrors.slice(0, 20) });
save();

// ---------------------------------------------------------------- other pages of the site, one load each, spaced
async function visit(path, sections) {
  await wait(page, GAP_MS);
  const r = await page.goto(SITE + path, { waitUntil: 'load', timeout: 45000 }).catch((e) => ({ status: () => String(e).slice(0, 100) }));
  await wait(page, 3500);
  const out = { status: r.status(), ...await glance(page) };
  out.sections = [];
  for (const [re, f] of sections) out.sections.push(await at(page, re, f));
  step(`page ${path}`, out);
  save();
}
await visit('/surfboard-rental-weligama', [[/message us on Instagram/, '20-rental-instagram-line.png'], [/Reserve on WhatsApp/, '20-rental-whatsapp.png'], [/Opening hours/, null]]);
await visit('/faq', [[/WhatsApp \+94/, '21-faq-whatsapp.png']]);
await visit('/faq/how-much-does-a-surf-lesson-cost-in-weligama', [[/25 USD/, '22-faq-lesson-price.png']]);
await visit('/faq/cancellation-and-refund-policy', [[/24 hours/, '23-faq-cancellation.png']]);
await visit('/terms', [[/48 hours/, '24-terms-cancellation.png']]);
await visit('/about', [[/3,000/, '25-about-students.png']]);

// ---------------------------------------------------------------- off site
async function offsite(name, url, file) {
  await wait(page, 2000);
  const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }).catch((e) => ({ status: () => String(e).slice(0, 100) }));
  await wait(page, 4500);
  for (const sel of ['button:has-text("Reject all")', 'button:has-text("Decline optional cookies")', 'button:has-text("Decline")']) {
    const l = page.locator(sel).first();
    if (await l.count().catch(() => 0)) { await l.click({ timeout: 3000 }).catch(() => {}); await wait(page, 2500); break; }
  }
  const text = await page.evaluate(() => (document.body?.innerText || '').slice(0, 700));
  const links = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((h) => /^tel:|sanjee-surf|wa\.me/.test(h)).slice(0, 8));
  step(`off site: ${name}`, { url, status: r.status(), final_url: page.url().slice(0, 120), text, links, shot: await shot(page, file) });
  save();
}
await offsite('google listing', GOOGLE, '30-google-listing-fold.png');
await offsite('instagram (footer link)', 'https://instagram.com/sanjeesurf', '31-instagram.png');
await offsite('facebook (footer link)', 'https://facebook.com/sanjeesurf', '32-facebook.png');
await offsite('youtube (footer link)', 'https://youtube.com/@sanjeesurf', '33-youtube.png');

await b.close();
save();
console.log(`\nblocked writes: ${JSON.stringify(log.blocked_writes)}\n-> ${JSON_OUT}`);
