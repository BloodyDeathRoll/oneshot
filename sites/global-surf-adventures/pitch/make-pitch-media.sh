#!/usr/bin/env bash
# Recipe for the proposal page's images (writer, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  crops of the auditor's own captures of globalsurf.com (2026-09-28, 390x844 @2x):
#                dossier/global-surf-adventures/funnel/*.png. Those are `local` media: get them with
#                `node tools/media.mjs restore global-surf-adventures` (store), or the operator's zip.
#  after-*.jpg   Playwright captures of the live preview, reduced motion on so the hero poster stays
#                (no video frame timing), 390x844 @2x and 1440x900 @1x.
#
# Needs: python3 with Pillow, node + playwright (repo package.json), network for the preview.
# Re-running the "after" half makes new files from the live preview; their hashes will differ from
# media/global-surf-adventures.tsv whenever the preview or the fonts' rasterisation change.
# media: sites/global-surf-adventures/pitch/before-*.jpg
# media: sites/global-surf-adventures/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/global-surf-adventures/pitch
FUN=dossier/global-surf-adventures/funnel
PREVIEW=${PREVIEW:-https://global-surf-lodge-kabalana.os1.workers.dev/}

python3 - "$FUN" "$OUT" <<'PY'
import sys
from PIL import Image
fun, out = sys.argv[1], sys.argv[2]
def save(src, box, name):
    im = Image.open(f"{fun}/{src}").convert("RGB")
    if box: im = im.crop(box)
    im.save(f"{out}/{name}", "JPEG", quality=78, optimize=True, progressive=True)
# F4 + F6: home first screen (agency headline, Messenger bubble)
save("landing-fold.png", None, "before-home-390.jpg")
# F1 + F3: what a booking button opens (engine front page, one "Sri Lanka" card)
save("walk-05-level-one-cta-engine-fold.png", None, "before-engine-390.jpg")
# F2: the engine's package list, no prices
save("walk-10-engine-sri-lanka-list-fold.png", None, "before-packages-390.jpg")
# F5: the footer's WhatsApp icon, bottom of the home page (full-page capture, 7984 px tall)
save("landing-mobile.png", (0, 7464, 780, 7784), "before-whatsapp-390.jpg")
PY

node --input-type=module - "$PREVIEW" "$OUT" <<'JS'
import { chromium } from 'playwright';
const [url, out] = process.argv.slice(2);
const browser = await chromium.launch();
const settle = async (page) => {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((i) => !i.complete && i.loading !== 'lazy').map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
  });
  await page.waitForTimeout(800);
};
const toSection = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]);
  await page.waitForTimeout(600);
  await page.evaluate(async (s) => {
    const imgs = [...document.querySelectorAll('img')].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
    await Promise.all(imgs.map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
  }, sel);
  await page.waitForTimeout(600);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });

// phone
let ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await settle(page);
await shot(page, 'after-390-top.jpg');
await toSection(page, '#levels');
await shot(page, 'after-390-levels.jpg');
await toSection(page, '#guests');
await shot(page, 'after-390-guests.jpg');
await page.goto(new URL('book/', url).href, { waitUntil: 'load' });
await settle(page);
await shot(page, 'after-390-book.jpg');
await ctx.close();

// laptop
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' });
await settle(page);
await shot(page, 'after-1440-top.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
