#!/usr/bin/env node
// dossier/mutag-meitiv/funnel/walk.mjs — the auditor's hand walk (station 3b) of mutagmeitiv.com as a phone sees it.
// media: dossier/mutag-meitiv/funnel/walk/*.png
// Why: tools/funnel.mjs uses Chromium's own user agent, so Wix serves it the 980 px desktop page;
// a real phone (iPhone UA) gets Wix's separate mobile layout with the WhatsApp/email action bar.
// Read-only: opens pages, taps two registration buttons (they open a Wix lightbox form, never filled
// or submitted) and the menu; no login, no form submission, no contact.
// Run from the repo root: node dossier/mutag-meitiv/funnel/walk.mjs dossier/mutag-meitiv/funnel/walk
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const OUT = process.argv[2];
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const pages = ['/', '/personal101', '/process', '/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%95%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA', '/contact', '/about', '/newcourse', '/smst', '/brandandbreakfast', '/blank-2', '/blog', '/register'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: 'he-IL', userAgent: IPHONE });
const res = [];
let i = 0;
for (const path of pages) {
  i++;
  const p = await ctx.newPage();
  const url = 'https://www.mutagmeitiv.com' + path;
  let status = null, err = null;
  for (let t = 0; t < 3; t++) { try { const r = await p.goto(url, { waitUntil: 'load', timeout: 90000 }); status = r?.status(); err = null; if (status < 500) break; } catch (e) { err = String(e).slice(0, 200); } await p.waitForTimeout(3000); }
  await p.waitForTimeout(3500);
  const name = String(i).padStart(2, '0') + '-' + (path === '/' ? 'home' : decodeURIComponent(path).replace(/[^\w֐-׿-]/g, '').slice(0, 30));
  await p.screenshot({ path: `${OUT}/${name}-fold.png` });
  for (let y = 0; y < 25; y++) { await p.mouse.wheel(0, 800); await p.waitForTimeout(150); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1000);
  await p.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
  const info = await p.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
    const fixedAnc = (e) => { for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x).position; if (s === 'fixed' || s === 'sticky') return true; } return false; };
    const items = [...document.querySelectorAll('a, button, [role=button]')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName.toLowerCase(), text: (e.innerText || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 80), href: e.getAttribute('href'), top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), fixed: fixedAnc(e) }; });
    const h1 = [...document.querySelectorAll('h1')].map(e => e.innerText.trim().slice(0, 80));
    return { title: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir, height: document.documentElement.scrollHeight, width: document.documentElement.scrollWidth, h1, items };
  });
  res.push({ url, status, err, shot_fold: `walk/${name}-fold.png`, shot_full: `walk/${name}-full.png`, ...info });
  await p.close();
}
await ctx.close();
writeFileSync(`${OUT}/walk-raw.json`, JSON.stringify({ walked_at: new Date().toISOString(), user_agent: IPHONE, viewport: '390x844', pages: res }, null, 1));
const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'he-IL', userAgent: IPHONE });
const log = [];
async function tryClick(path, text, shot, role='button') {
  const p = await ctx2.newPage();
  await p.goto('https://www.mutagmeitiv.com' + path, { waitUntil: 'load', timeout: 90000 }); await p.waitForTimeout(3500);
  const before = p.url();

  const loc = role === 'menu' ? p.locator('[aria-label="פתיחת תפריט הניווט"]').first() : p.getByRole('button', { name: text }).first();
  let found = await loc.count();
  let entry = { page: path, target: text, found: !!found };
  if (found) {
    await loc.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await loc.click({ timeout: 10000 }).catch(e => entry.click_error = String(e).slice(0, 150));
    await p.waitForTimeout(3000);
    entry.url_after = p.url(); entry.navigated = p.url() !== before;
    entry.dialogs = await p.evaluate(() => [...document.querySelectorAll('[role=dialog], [data-testid=lightbox]')].filter(e => e.getBoundingClientRect().height > 0).length);
    if (role === 'menu') entry.menu_links = await p.evaluate(() => [...document.querySelectorAll('nav a, [role=dialog] a, #MENU_AS_CONTAINER a')].filter(e => e.getBoundingClientRect().height > 0).map(e => [e.innerText.trim(), e.getAttribute('href')]));
    await p.screenshot({ path: `${OUT}/${shot}` });
    entry.screenshot = `walk/${shot}`;
  }
  log.push(entry); await p.close();
}
await tryClick('/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%95%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA', 'הרשמה', 'click-workshops-register.png');
await tryClick('/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%95%D7%94%D7%A8%D7%A6%D7%90%D7%95%D7%AA', 'ספרי לי עוד', 'click-workshops-tellmemore.png');
await tryClick('/', 'menu', 'click-home-menu.png', 'menu');
// desktop check
const d = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'he-IL' });
const dp = await d.newPage();
await dp.goto('https://www.mutagmeitiv.com/', { waitUntil: 'load', timeout: 90000 }); await dp.waitForTimeout(4000);
await dp.screenshot({ path: `${OUT}/desktop-home-fold.png` });
// desktop /newcourse: a linked graphic points at /blank-2 (Wix 404 page)
const np = await d.newPage(); await np.goto('https://www.mutagmeitiv.com/newcourse', { waitUntil: 'load', timeout: 90000 }); await np.waitForTimeout(4000);
const blank = np.locator('a[href*="blank-2"]').first(); let blankLinks = await np.locator('a[href*="blank-2"]').count();
if (blankLinks) { await blank.scrollIntoViewIfNeeded(); await np.waitForTimeout(800); await np.screenshot({ path: `${OUT}/desktop-newcourse-blank2-link.png` }); }
log.push({ page: '/newcourse (desktop 1440)', links_to_blank_2: blankLinks, screenshot: blankLinks ? 'walk/desktop-newcourse-blank2-link.png' : null });
const html = await dp.content();
log.push({ page: '/ (desktop 1440, desktop UA)', whatsapp_links: (html.match(/wa\.me|api\.whatsapp\.com/g) || []).length, tel_links: (html.match(/href="tel:/g) || []).length, screenshot: 'walk/desktop-home-fold.png',
  header_actions: await dp.evaluate(() => [...document.querySelectorAll('a')].filter(e => { const r = e.getBoundingClientRect(); return r.top < 900 && r.height > 0; }).map(e => [e.innerText.trim().slice(0, 40), e.getAttribute('href')])) });
await b.close();
writeFileSync(`${OUT}/clicks.json`, JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1));
