#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  The hotel's own web presence as a guest meets it today, never another business's:
#    before-390-home.jpg       the auditor's phone capture of pantareiresort.com, first screen
#                              (dossier/panta-rei-resort/funnel/walk/01-home-fold.png, 2026-11-06, whole, scaled to 780 px wide)
#    before-1440-home.jpg      the critic's laptop capture of the same page
#                              (reports/2026-11-lk-surf-01/current-site/shots/desktop-00.png, 2026-11-06, whole)
#    before-engine-price.jpg   the booking engine's Suite page on a phone: "Add dates for prices" (audit F1)
#                              (funnel/walk/03-engine-suite.png, crop y 1190-1992, scaled)
#    before-email.jpg          the Activities footer showing hello@pantareiresort.com (audit F3; the link goes to info@mysite.com)
#                              (funnel/walk/06-events-email.png, crop y 1290-1510, scaled)
#    before-rooms.jpg          LIVE capture of https://www.pantareiresort.com/ourrooms at 1440 @2x: the four room titles, each with
#                              the first lines of its text, stacked (audit F2: the same sentence under all four)
#    before-engine-ratings.jpg LIVE capture of https://pantareiresort.holidayfuture.com/ at 390 @2x: the "Book Direct" rating block
#                              (audit F5: 4.8 / 9.1 / 4.5 there; 4.7 from 213 and 9.2 from 468 on Google and Booking.com)
#  after-*.jpg   Playwright captures of the live preview https://panta-rei-resort.os1.workers.dev/ :
#                390x844 @2x with reduced motion (posters, no video), and 1440x900 @1x.
#
# The `local` inputs come with `node tools/media.mjs restore panta-rei-resort` (dossier) or a re-run of the critic's shoot.
# The LIVE halves change whenever the hotel edits its site or engine, or the preview is redeployed; hashes then differ.
# Needs: node + playwright (repo package.json); crops are done in Chromium (no Pillow). Network for the live parts.
# media: sites/panta-rei-resort/pitch/before-*.jpg
# media: sites/panta-rei-resort/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/panta-rei-resort/pitch
WALK=dossier/panta-rei-resort/funnel/walk
SHOTS=reports/2026-11-lk-surf-01/current-site/shots
PREVIEW=${PREVIEW:-https://panta-rei-resort.os1.workers.dev/}

node --input-type=module - "$WALK" "$SHOTS" "$OUT" "$PREVIEW" <<'JS'
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [walk, shots, out, url] = process.argv.slice(2);
const browser = await chromium.launch();
const Q = 74;

// ---- crop helper: parts = [[png path or Buffer, [x,y,w,h] | null]], stacked top to bottom, then scaled by `scale`.
async function stack(name, parts, scale = 1, gap = 0) {
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const html = parts.map(([src, box], i) => {
    const b64 = (Buffer.isBuffer(src) ? src : readFileSync(src)).toString('base64');
    return `<div class="p" data-box="${box ? box.join(',') : ''}"><img src="data:image/png;base64,${b64}"></div>`;
  }).join('');
  await page.setContent(`<style>html,body{margin:0;background:#fff}.p{position:relative;overflow:hidden;margin-bottom:${gap}px}.p img{position:absolute;display:block;transform-origin:0 0}</style>${html}`);
  const size = await page.evaluate(async (s) => {
    let w = 0, h = 0;
    for (const p of document.querySelectorAll('.p')) {
      const img = p.querySelector('img'); await img.decode();
      const box = p.dataset.box ? p.dataset.box.split(',').map(Number) : [0, 0, img.naturalWidth, img.naturalHeight];
      p.style.width = Math.round(box[2] * s) + 'px'; p.style.height = Math.round(box[3] * s) + 'px';
      img.style.transform = `translate(${-box[0] * s}px,${-box[1] * s}px) scale(${s})`;
      w = Math.max(w, Math.round(box[2] * s)); h += Math.round(box[3] * s);
    }
    return { w, h };
  }, scale);
  size.h += gap * (parts.length - 1);
  await page.setViewportSize({ width: size.w, height: size.h });
  await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: Q, clip: { x: 0, y: 0, width: size.w, height: size.h } });
  await ctx.close();
}

// ---- before: the auditor's and the critic's captures
await stack('before-390-home.jpg', [[`${walk}/01-home-fold.png`, null]], 2 / 3);
await stack('before-1440-home.jpg', [[`${shots}/desktop-00.png`, null]], 1);
await stack('before-engine-price.jpg', [[`${walk}/03-engine-suite.png`, [0, 1190, 1170, 802]]], 2 / 3);
await stack('before-email.jpg', [[`${walk}/06-events-email.png`, [0, 1290, 1170, 220]]], 2 / 3);

// ---- before, live: the four room cards on /ourrooms (F2)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('https://www.pantareiresort.com/ourrooms', { waitUntil: 'load', timeout: 90000 });
  for (let y = 0; y < 4200; y += 450) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(250); }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200);
  const boxes = await page.evaluate(() => {
    const els = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div')];
    const titles = ['DOUBLE DELUXE', 'SUITE TRIPLE', 'FAMILY VILLA', 'LUXURY PRIVATE VILLA'];
    return titles.map((t) => {
      const tEl = els.filter((e) => e.children.length === 0 && e.textContent.trim() === t)[0]
        || els.find((e) => e.textContent.trim() === t);
      const tr = tEl.getBoundingClientRect();
      const sEl = els.filter((e) => e.textContent.trim().startsWith('Situated in Ahangama Central'))
        .map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.top > tr.top && r.top - tr.top < 200)
        .sort((a, b) => b[1].height - a[1].height)[0];
      const sr = sEl[1];
      const x = Math.min(tr.left, sr.left) - 24;
      return [Math.round(x), Math.round(tr.top + scrollY - 20), 470, Math.round(sr.top - tr.top + 52 + 40)];
    });
  });
  const full = await page.screenshot({ fullPage: true });
  await ctx.close();
  await stack('before-rooms.jpg', boxes.map((b) => [full, b.map((v) => v * 2)]), 0.75, 14);
}

// ---- before, live: the engine's rating block (F5)
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('https://pantareiresort.holidayfuture.com/', { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(2500);
  for (let y = 0; y < 6000; y += 600) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(200); }
  const top = await page.evaluate(() => {
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) if (/^Book Direct with Panta Rei$/.test(n.textContent.trim())) return n.parentElement.getBoundingClientRect().top + scrollY;
    return null;
  });
  await page.evaluate((y) => scrollTo(0, y - 40), top); await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/before-engine-ratings.jpg`, type: 'jpeg', quality: Q, clip: { x: 0, y: 0, width: 390, height: 270 } });
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
const toSel = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]);
  await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: Q });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' };

let ctx = await browser.newContext(phone);
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-390-top.jpg');
await toSel(page, 'a.card', -150); await shot(page, 'after-390-rooms.jpg');
await toSel(page, '#h-guests', -110); await shot(page, 'after-390-guests.jpg');
await toSel(page, '#h-surf', -110); await shot(page, 'after-390-massage.jpg');
// the drawer: the Suite card, dates filled (no tap past it: the engine is the hotel's, not ours)
await toSel(page, '#rooms', 0);
await page.evaluate(() => document.querySelector('a.card[data-room="room-3"]').click());
await page.waitForTimeout(900);
await page.fill('#f-arr', '2027-03-03'); await page.fill('#f-dep', '2027-03-06');
await page.dispatchEvent('#f-arr', 'change'); await page.dispatchEvent('#f-dep', 'change');
await page.evaluate(() => document.activeElement && document.activeElement.blur());
await page.waitForTimeout(900); await inView(page);
await shot(page, 'after-390-drawer.jpg');
await ctx.close();

ctx = await browser.newContext(laptop);
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await shot(page, 'after-1440-top.jpg');
// the drawer on a laptop shows the chosen room's beds, size and photos
await page.evaluate(() => document.querySelector('a.card[data-room="room-2"]').click());
await page.waitForTimeout(1200); await inView(page);
await shot(page, 'after-1440-drawer.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
