#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  JPEG crops of the auditor's own captures of the business's presence today (it has no website):
#                Booking.com and the two Airbnb listings at 390x844 @2x, the Google listing at 390x844 @2x and at
#                1440x1000 @1x, 2026-11-21: dossier/sea-you-surfers-nest/assets/walk/ (`local` media, made by
#                dossier/sea-you-surfers-nest/funnel/make-walk.mjs; get them with
#                `node tools/media.mjs restore sea-you-surfers-nest`). Every crop keeps only this business's own
#                panel: no Google map, no Google price list, no Booking.com map or "best of Kumbalgama" cards, so no
#                other business's name, photo or price is shown.
#  after-*.jpg   Playwright captures of the live preview: 390x844 @2x with reduced motion (the palm shader stays
#                off, the graded still shows), and 1440x900 @1x.
#
# Needs: node + playwright (repo package.json; crops are done in Chromium, no Pillow), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever the
# preview or font rasterisation change.
# media: sites/sea-you-surfers-nest/pitch/before-*.jpg
# media: sites/sea-you-surfers-nest/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/sea-you-surfers-nest/pitch
WALK=dossier/sea-you-surfers-nest/assets/walk
PREVIEW=${PREVIEW:-https://sea-you-surfers-nest.os1.workers.dev/}

node --input-type=module - "$WALK" "$OUT" "$PREVIEW" <<'JS'
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [walk, out, url] = process.argv.slice(2);
const browser = await chromium.launch();

// ---- before: crops of the auditor's PNGs, stacked top to bottom in a 1x page.
// Each image = a list of parts [file, [x, y, w, h]] in image pixels (null box = whole image).
const before = [
  ['before-booking-fold.jpg',    [['03-booking-com-fold.png', null]]],                                // first screen, F3, F7
  ['before-booking-sign.jpg',    [['03-booking-com-fold.png', [0, 708, 780, 550]]]],                  // F3: photo 1/45, the sign
  ['before-booking-contact.jpg', [['03-booking-com-contacting.png', [0, 0, 780, 262]]]],              // F1
  ['before-booking-signin.jpg',  [['03-booking-com-ask-tapped.png', [0, 0, 780, 620]]]],              // F1
  ['before-airbnb-login.jpg',    [['05-airbnb-1-message-host-tapped.png', [0, 24, 780, 600]]]],       // F1
  ['before-google-phone.jpg',    [['01-google-listing-fold.png', [0, 1150, 780, 538]]]],              // F2 (no map)
  ['before-google-website.jpg',  [['02-google-listing-desktop-add-website.png', [80, 190, 408, 330]]]], // F2 (panel only, no prices)
  ['before-booking-summary.jpg', [['03-booking-com-summary.png', [0, 735, 780, 285]]]],               // F4 (no map)
  ['before-airbnb-note.jpg',     [['05-airbnb-1-inquire-open.png', [0, 115, 780, 90]],                // F4, F5: heading + the owner's note only
                                  ['05-airbnb-1-inquire-open.png', [0, 632, 780, 148]]]],
  ['before-airbnb-house.jpg',    [['06-airbnb-2-summary.png', [0, 615, 780, 325]]]],                  // F4, F8: 0 bathrooms, New
];
{
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const [name, parts] of before) {
    const boxes = [];
    for (const [src, box] of parts) {
      const b64 = readFileSync(`${walk}/${src}`).toString('base64');
      boxes.push({ b64, box });
    }
    const html = boxes.map(({ b64, box }, i) =>
      `<div class="p" id="p${i}" data-box="${box ? box.join(',') : ''}"><img src="data:image/png;base64,${b64}"></div>`).join('');
    await page.setContent(`<style>html,body{margin:0;background:#fff}.p{position:relative;overflow:hidden}.p img{position:absolute;display:block}</style>${html}`);
    const size = await page.evaluate(async () => {
      let w = 0, h = 0;
      for (const p of document.querySelectorAll('.p')) {
        const img = p.querySelector('img'); await img.decode();
        const box = p.dataset.box ? p.dataset.box.split(',').map(Number) : [0, 0, img.naturalWidth, img.naturalHeight];
        p.style.width = box[2] + 'px'; p.style.height = box[3] + 'px';
        img.style.left = -box[0] + 'px'; img.style.top = -box[1] + 'px';
        w = Math.max(w, box[2]); h += box[3];
      }
      return { w, h };
    });
    await page.setViewportSize({ width: size.w, height: size.h });
    await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78, clip: { x: 0, y: 0, width: size.w, height: size.h } });
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
const toEl = async (page, find, offset = 0) => {
  await page.evaluate(([f, o]) => {
    const el = new Function(`return (${f})`)();
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o);
  }, [find, offset]);
  await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' };

// phone: first screen, the glance (ratings), "Who's coming?" on "A question first", the Deluxe room with the A/C line
let ctx = await browser.newContext(phone);
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-390-top.jpg');
await toEl(page, "document.querySelector('#glance')", 0); await shot(page, 'after-390-glance.jpg');
await toEl(page, "document.querySelector('#who-h')", -40);
await page.click('.tile[data-for="ask"]'); await page.waitForTimeout(700);
await shot(page, 'after-390-ask.jpg');
await toEl(page, "document.querySelector('#room-deluxe h3')", -380); await shot(page, 'after-390-rooms.jpg');
await ctx.close();

// laptop: first screen and the rooms
ctx = await browser.newContext(laptop);
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-1440-top.jpg');
await toEl(page, "document.querySelector('#rooms')", 0); await shot(page, 'after-1440-rooms.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
