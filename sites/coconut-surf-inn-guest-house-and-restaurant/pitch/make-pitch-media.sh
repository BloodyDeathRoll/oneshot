#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  JPEG crops of the auditor's own captures of the business's presence today (it has no website):
#                Booking.com and Airbnb at 390x844 @2x, the three Google places at 1440x1000 @1x (the inn's listing
#                also on a phone, 390x844 @2x), 2026-11-04: dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/walk/
#                (`local` media — get them with `node tools/media.mjs restore coconut-surf-inn-guest-house-and-restaurant`).
#                Every crop keeps only this business's own panel: no Google map, no "Similar hotels nearby", no price
#                box, no Booking.com map, so no other business's name, photo or price is shown.
#  after-*.jpg   Playwright captures of the live preview: 390x844 @2x and 1440x900 @1x, reduced motion (the
#                set-piece stacks, the hero photo stays still).
#
# Needs: node + playwright (repo package.json; crops are done in Chromium, no Pillow), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever the
# preview or font rasterisation change.
# media: sites/coconut-surf-inn-guest-house-and-restaurant/pitch/before-*.jpg
# media: sites/coconut-surf-inn-guest-house-and-restaurant/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/coconut-surf-inn-guest-house-and-restaurant/pitch
WALK=dossier/coconut-surf-inn-guest-house-and-restaurant/funnel/walk
PREVIEW=${PREVIEW:-https://coconut-surf-inn-guest-house-and-restaurant.os1.workers.dev/}

node --input-type=module - "$WALK" "$OUT" "$PREVIEW" <<'JS'
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [walk, out, url] = process.argv.slice(2);
const browser = await chromium.launch();

// ---- before: crops of the auditor's PNGs in a 1x page. [name, file, [x, y, w, h] in image pixels, null = whole]
const before = [
  ['before-booking-fold.jpg',      '05-booking-com-fold.png',                   null],                  // first screen
  ['before-booking-contact.jpg',   '05-booking-com-contacting.png',             [0, 0, 780, 262]],      // F1
  ['before-booking-questions.jpg', '05-booking-com-questions.png',              [0, 700, 780, 500]],    // F1 (late reply)
  ['before-booking-summary.jpg',   '05-booking-com-summary.png',                [0, 640, 780, 260]],    // F5 (no map)
  ['before-airbnb-host.jpg',       '06-airbnb-response.png',                    [0, 740, 780, 290]],    // F2
  ['before-airbnb-signin.jpg',     '06-airbnb-message-tapped.png',              [0, 24, 780, 620]],     // F2
  ['before-airbnb-header.jpg',     '06-airbnb-header.png',                      [0, 660, 780, 300]],    // F6
  ['before-airbnb-rooms.jpg',      '06-airbnb-description-rooms.png',           [0, 1190, 780, 390]],   // F6
  ['before-google-phone.jpg',      '01-google-listing-fold.png',                [0, 1130, 780, 290]],   // F3 (no map)
  ['before-google-website.jpg',    '02-google-listing-desktop-add-website.png', [72, 175, 408, 395]],   // F3 (no prices, no similar hotels)
  ['before-google-restaurant.jpg', '03-google-restaurant-desktop-claim.png',    [72, 125, 408, 600]],   // F4 (panel only)
  ['before-google-beach.jpg',      '04-google-beach-desktop-phone.png',         [72, 255, 408, 305]],   // F4 (panel only)
];
{
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, src, box] of before) {
    const b64 = readFileSync(`${walk}/${src}`).toString('base64');
    await page.setContent(`<style>html,body{margin:0}img{display:block}</style><img src="data:image/png;base64,${b64}">`);
    const { w, h } = await page.evaluate(async () => { const i = document.images[0]; await i.decode(); return { w: i.naturalWidth, h: i.naturalHeight }; });
    await page.setViewportSize({ width: w, height: h });
    const [x, y, cw, ch] = box || [0, 0, w, h];
    await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78, clip: { x, y, width: cw, height: ch } });
  }
  await ctx.close();
}

// ---- after: the live preview, reduced motion
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
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' };

// phone: first screen, check-in + ratings, an A/C room, a fan room, getting here
let ctx = await browser.newContext(phone);
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-390-top.jpg');
await toEl(page, '#checkin', -70); await shot(page, 'after-390-checkin.jpg');
await toEl(page, '#room-0', -70); await shot(page, 'after-390-room-ac.jpg');
await toEl(page, '#room-4', -70); await shot(page, 'after-390-room-fan.jpg');
await toEl(page, '#h-here', -120); await shot(page, 'after-390-here.jpg');
await ctx.close();

// laptop: first screen and the rooms
ctx = await browser.newContext(laptop);
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-1440-top.jpg');
await toEl(page, '#rooms', 0); await shot(page, 'after-1440-rooms.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
