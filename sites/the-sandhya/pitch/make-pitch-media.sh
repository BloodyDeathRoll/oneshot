#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.5.1, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  crops of the auditor's own captures of thesandhya.com (2026-11-06, 390x844 @2x, and one 390x844 @1x
#                slow-4G frame): dossier/the-sandhya/funnel/shots/*.png. Those shots are scratch and not in the media
#                manifest: if they are missing here, remake them with `node dossier/the-sandhya/funnel/make-walk.mjs`
#                (the auditor's recipe; the live site may have changed since 2026-11-06).
#  after-*.jpg   Playwright captures of the live preview, reduced motion on (no settle, no parallax): the first screen
#                at 390x844 @2x and 1440x900 @1x, one room, the date fields after the rooms with two dates chosen
#                (60 and 63 days from the day of the run), and the footer contact. Each "after" crop is clipped to its
#                own element, so no rating line enters a capture.
#
# Needs: node + playwright (repo package.json), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever
# the preview, the run date (the chosen dates) or font rasterisation change.
# media: sites/the-sandhya/pitch/before-*.jpg
# media: sites/the-sandhya/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/the-sandhya/pitch
SHOTS=dossier/the-sandhya/funnel/shots
PREVIEW=${PREVIEW:-https://the-sandhya.os1.workers.dev/}

node --input-type=module - "$SHOTS" "$OUT" <<'JS'
// crop and re-encode with Playwright itself (no image library needed): the PNG is drawn at 1:1 and clipped
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const [shots, out] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
const save = async (src, box, name) => {
  const b64 = readFileSync(`${shots}/${src}`).toString('base64');
  await page.setContent(`<html><body style="margin:0;background:#fff"><img id="i" src="data:image/png;base64,${b64}"></body></html>`);
  await page.waitForFunction(() => document.getElementById('i').complete);
  const [w, h] = await page.evaluate(() => { const i = document.getElementById('i'); return [i.naturalWidth, i.naturalHeight]; });
  await page.setViewportSize({ width: w, height: h });
  await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78, clip: box ?? { x: 0, y: 0, width: w, height: h } });
};
await save('01-home-settled.png', null, 'before-home-390.jpg');                                            // F3, F4
await save('03-slow4g-15s.png', null, 'before-slow4g-15s-390.jpg');                                        // F1
await save('05-panel-open.png', { x: 0, y: 0, width: 780, height: 840 }, 'before-panel-390.jpg');          // F2
await save('07-suite-reserve-now.png', { x: 0, y: 0, width: 780, height: 520 }, 'before-suite-390.jpg');   // F8
await save('07-home-footer-contact.png', { x: 0, y: 1060, width: 780, height: 380 }, 'before-contact-390.jpg'); // F9
await browser.close();
JS

node --input-type=module - "$PREVIEW" "$OUT" <<'JS'
import { chromium } from 'playwright';
const [url, out] = process.argv.slice(2);
const browser = await chromium.launch();
const settle = async (page) => {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(800);
};
const inView = (page) => page.evaluate(async () => {
  const imgs = [...document.querySelectorAll('img')].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; });
  await Promise.all(imgs.map((i) => i.complete && i.naturalWidth ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 8000); })));
});
const toEl = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]);
  await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
};
// screenshot of one element, padded, clipped to the viewport width
// (from the top of `sel` to the bottom of `selEnd`, which defaults to `sel`)
const clipShot = async (page, sel, name, pad = 16, selEnd = sel) => {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(900); await inView(page); await page.waitForTimeout(600);
  const b = await el.boundingBox();
  const e = await page.locator(selEnd).first().boundingBox();
  const vw = page.viewportSize().width;
  const clip = { x: 0, y: Math.max(0, b.y - pad), width: vw, height: e.y + e.height - b.y + 2 * pad };
  await page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78, clip });
};
const iso = (d) => d.toISOString().slice(0, 10);
const day = (n) => { const d = new Date(); d.setUTCHours(12, 0, 0, 0); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' };

// phone: first screen, one room, the date fields with dates chosen, footer
let ctx = await browser.newContext(phone);
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await page.screenshot({ path: `${out}/after-390-top.jpg`, type: 'jpeg', quality: 78 });
await toEl(page, '#rooms article', -16);
await clipShot(page, '#rooms article', 'after-390-room.jpg');
await page.locator('.kit [data-dates] .d-in').fill(day(60));
await page.locator('.kit [data-dates] .d-out').fill(day(63));
await page.evaluate(() => document.activeElement && document.activeElement.blur());   // no focus ring in the capture
await page.waitForTimeout(400);
// from "Nightly rates are on our booking page, for the dates you choose." to the button under the fields
await clipShot(page, '.kit-text p:nth-of-type(3)', 'after-390-dates.jpg', 20, '.kit [data-dates]');
await clipShot(page, 'footer.foot', 'after-390-footer.jpg', 0);
await ctx.close();

// laptop: first screen
ctx = await browser.newContext(laptop);
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page); await inView(page);
await page.screenshot({ path: `${out}/after-1440-top.jpg`, type: 'jpeg', quality: 78 });
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
