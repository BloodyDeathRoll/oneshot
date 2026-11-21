#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  JPEG copies (some cropped) of the auditor's own captures of cheekymonkeymidigama.com and the Google
#                listing, 2026-10-26, 390x844 @2x (the Google one 1440x1000 @1x): dossier/cheeky-monkey/funnel/
#                (`local` media — get them with `node tools/media.mjs restore cheeky-monkey`). The Google crop keeps
#                only the listing panel, so no other business's name is shown.
#  after-*.jpg   Playwright captures of the live preview: 390x844 @2x and 1440x900 @1x. Reduced motion for the phone's
#                first screen, the surf weeks, the plan panel and the guests (the hero poster stays); motion on for the two
#                drone frames (the loop must be playing, ~2.5 s in, on the surf shot).
#
# Needs: node + playwright (repo package.json; crops are done in Chromium, no Pillow), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever the
# preview or font rasterisation change.
# media: sites/cheeky-monkey/pitch/before-*.jpg
# media: sites/cheeky-monkey/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/cheeky-monkey/pitch
FUN=dossier/cheeky-monkey/funnel
PREVIEW=${PREVIEW:-https://cheeky-monkey-surf-camp.os1.workers.dev/}

node --input-type=module - "$FUN" "$OUT" "$PREVIEW" <<'JS'
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [fun, out, url] = process.argv.slice(2);
const browser = await chromium.launch();

// ---- before: the auditor's PNGs to JPEG, cropped in a 1x page (box = [x, y, w, h] in image pixels, null = whole)
const before = [
  ['landing-fold.png', null, 'before-home-390.jpg'],                                          // F1 + F9
  ['walk/01-home-renovation-banner.png', null, 'before-banner-390.jpg'],                      // F3
  ['walk/04-packages-price-table.png', null, 'before-prices-390.jpg'],                        // F2 + F8
  ['walk/01-home-phone-text.png', null, 'before-phone-390.jpg'],                              // F4 + F8
  ['walk/02-contact-shortcode.png', [0, 520, 780, 440], 'before-contact-390.jpg'],            // F5
  ['walk/03-our-services-reservation-enquiry.png', [0, 1380, 780, 308], 'before-enquiry-390.jpg'], // F6
  ['walk/13-google-listing-desktop-add-website.png', [72, 88, 416, 490], 'before-google.jpg'], // F13 (panel only)
];
{
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [src, box, name] of before) {
    const b64 = readFileSync(`${fun}/${src}`).toString('base64');
    await page.setContent(`<style>html,body{margin:0}img{display:block}</style><img src="data:image/png;base64,${b64}">`);
    const { w, h } = await page.evaluate(async () => { const i = document.images[0]; await i.decode(); return { w: i.naturalWidth, h: i.naturalHeight }; });
    await page.setViewportSize({ width: w, height: h });
    const [x, y, cw, ch] = box || [0, 0, w, h];
    await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78, clip: { x, y, width: cw, height: ch } });
  }
  await ctx.close();
}

// ---- after: the live preview
const settle = async (page) => {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(800);
};
const inView = (page) => page.evaluate(async () => {
  const imgs = [...document.querySelectorAll('img')].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; });
  await Promise.all(imgs.map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); })));
});
const toEl = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]);
  await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
};
const drone = async (page) => {            // wait until the hero loop plays, then stop ~2.5 s in (the surf shot)
  await page.waitForFunction(() => { const v = document.querySelector('#hero video'); return v && !v.paused && v.readyState >= 3; }, null, { timeout: 60000 });
  await page.waitForFunction(() => { const v = document.querySelector('#hero video'); return v.currentTime > 2.4 && v.currentTime < 3.2; }, null, { timeout: 30000, polling: 50 });
  await page.evaluate(() => document.querySelector('#hero video').pause());
  await page.waitForTimeout(300);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };

// phone, reduced motion: first screen, surf weeks, guests, the plan panel
let ctx = await browser.newContext({ ...phone, reducedMotion: 'reduce' });
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-390-top.jpg');
await toEl(page, '#counter', -150); await shot(page, 'after-390-weeks.jpg');
await toEl(page, '#guests', -150); await shot(page, 'after-390-guests.jpg');
await page.locator('#bar a[href="#book"]:visible').first().click();
await page.waitForTimeout(1500); await inView(page);
await shot(page, 'after-390-plan.jpg');
await ctx.close();

// phone, motion on: a frame of the drone loop
ctx = await browser.newContext({ ...phone, reducedMotion: 'no-preference' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await drone(page); await shot(page, 'after-390-drone.jpg');
await ctx.close();

// laptop, motion on: a frame of the drone loop
ctx = await browser.newContext({ ...laptop, reducedMotion: 'no-preference' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await drone(page); await shot(page, 'after-1440-drone.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
