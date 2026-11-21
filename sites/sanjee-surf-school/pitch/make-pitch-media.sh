#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  JPEG crops of the auditor's own captures of sanjee-surf.com, and of the three social links, at
#                390x844 @2x on 2026-11-05: dossier/sanjee-surf-school/funnel/walk/ (recipe: funnel/make-walk.sh).
#                This script opens nothing on sanjee-surf.com: crops only, done in Chromium. Every crop leaves out the
#                cookie notice where it would cover the point, and none shows the legal operator's name or address.
#  after-*.jpg   Playwright captures of the live preview: 390x844 @2x with reduced motion, and 1440x900 @1x. The tiles
#                are never in frame, so img-005 (identifiable people, consent open) is not repeated on the page, and the
#                frames stay above and below img-007 (rights open). wa.me is blocked in the browser context: no chat opens.
#
# Needs: node + playwright (repo package.json), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever the
# preview or font rasterisation change.
# media: sites/sanjee-surf-school/pitch/before-*.jpg
# media: sites/sanjee-surf-school/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/sanjee-surf-school/pitch
WALK=dossier/sanjee-surf-school/funnel/walk
PREVIEW=${PREVIEW:-https://sanjee-surf-school.os1.workers.dev/}

node --input-type=module - "$WALK" "$OUT" "$PREVIEW" <<'JS'
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [walk, out, url] = process.argv.slice(2);
const browser = await chromium.launch();

// ---- before: crops of the auditor's PNGs (all 780x1688), stacked top to bottom in a 1x page.
// Each image = a list of parts [file, [x, y, w, h]] in image pixels (null box = whole image).
const before = [
  ['before-home-first.jpg',    [['01-home-fold-settled.png', null]]],                              // F6, F5
  ['before-home-toast.jpg',    [['01-home-toast.png', [0, 0, 780, 240]]]],                         // F4: the red box
  ['before-wizard-date.jpg',   [['11-wizard-4-date.png', null]]],                                  // F1: date and slots
  ['before-wizard-pay.jpg',    [['11-wizard-5-slot.png', null]]],                                  // F1: details, Pay $8 Now
  ['before-contact.jpg',       [['07-home-contact-block.png', [0, 180, 780, 950]]]],               // F2
  ['before-footer.jpg',        [['08-home-footer.png', [0, 650, 780, 705]]]],                      // F3
  ['before-price-home.jpg',    [['05-home-all-private.png', [0, 470, 780, 880]]]],                 // F7
  ['before-price-faq.jpg',     [['22-faq-lesson-price.png', [0, 480, 780, 830]]]],                 // F7
  ['before-cancel-terms.jpg',  [['24-terms-cancellation.png', [0, 490, 780, 680]]]],               // F8 (no party named)
  ['before-cancel-faq.jpg',    [['23-faq-cancellation.png', [0, 210, 780, 890]]]],                 // F8
  ['before-numbers-home.jpg',  [['06-home-stats.png', [48, 330, 684, 980]]]],                      // F9
  ['before-numbers-about.jpg', [['25-about-students.png', [48, 420, 684, 550]]]],                  // F9
  ['before-reviews.jpg',       [['06-home-review-dates.png', [0, 230, 780, 890]]]],                // F10
  ['before-social.jpg',        [['31-instagram.png', [0, 0, 780, 530]],                            // F11
                                ['32-facebook.png', [0, 290, 780, 660]],
                                ['33-youtube.png', [0, 700, 780, 270]]]],
  ['before-rental-line.jpg',   [['20-rental-instagram-line.png', [0, 620, 780, 320]]]],            // F11
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
const toEl = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => {
    document.documentElement.style.scrollBehavior = 'auto';
    const el = document.querySelector(s);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o);
  }, [sel, offset]);
  await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });
const guard = (ctx) => ctx.route(/wa\.me|whatsapp\.com|sanjee-surf\.com/, (r) => r.abort());
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' };

// phone: first screen, lessons, a filled-in message (the same lesson and date as the old dialog's capture), finding us
let ctx = await browser.newContext(phone); await guard(ctx);
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-390-top.jpg');
await toEl(page, '#lessons', -70); await shot(page, 'after-390-lessons.jpg');
await toEl(page, '.feature', 60); await page.waitForTimeout(100);
await page.evaluate(() => document.querySelector('#card-beginner .add').click());
await page.locator('#date').fill('2026-11-11');
await page.locator('#date').blur();
await page.evaluate(() => { const c = [...document.querySelectorAll('#message .chip')].find((e) => e.textContent.trim() === '1'); c.click(); });
await toEl(page, '#message', -66); await shot(page, 'after-390-message.jpg');
const msg = await page.evaluate(() => ({ bubble: document.querySelector('#bubble').textContent, href: document.querySelector('#send').href }));
console.log('message on capture:', JSON.stringify(msg));
await toEl(page, '#finding-us', -110); await shot(page, 'after-390-finding.jpg');
await ctx.close();

// laptop: first screen
ctx = await browser.newContext(laptop); await guard(ctx);
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-1440-top.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
