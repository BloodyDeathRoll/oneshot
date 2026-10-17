#!/usr/bin/env bash
# Recipe for the proposal page's images (writer 0.4.0, station 7; CLAUDE.md rule 6: no images in git).
#
#  before-*.jpg  crops of the auditor's own captures of globalsurf.com (2026-09-28, 390x844 @2x). The v2 audit
#                (dossier/global-surf-adventures-v2/audit.json) is byte-identical to v1's, forked at copy_passed;
#                its screenshots live with v1: dossier/global-surf-adventures/funnel/*.png (`local` media — get
#                them with `node tools/media.mjs restore global-surf-adventures`).
#  after-*.jpg   Playwright captures of the live v2 preview: 390x844 @2x and 1440x900 @1x. Reduced motion on for
#                the first screens (the hero poster stays, no video-frame timing); motion on for the drop frames
#                (the stage must be `.ready`, i.e. every plate decoded).
#
# Needs: python3 with Pillow, node + playwright (repo package.json), network for the preview.
# Re-running the "after" half makes new files from the live preview; hashes differ from the manifest whenever
# the preview or font rasterisation change.
# media: sites/global-surf-adventures-v2/pitch/before-*.jpg
# media: sites/global-surf-adventures-v2/pitch/after-*.jpg
set -euo pipefail
cd "$(dirname "$0")/../../.."
OUT=sites/global-surf-adventures-v2/pitch
FUN=dossier/global-surf-adventures/funnel
PREVIEW=${PREVIEW:-https://global-surf-lodge-kabalana-v2.os1.workers.dev/}

python3 - "$FUN" "$OUT" <<'PY'
import sys
from PIL import Image
fun, out = sys.argv[1], sys.argv[2]
def save(src, box, name):
    im = Image.open(f"{fun}/{src}").convert("RGB")
    if box: im = im.crop(box)
    im.save(f"{out}/{name}", "JPEG", quality=78, optimize=True, progressive=True)
save("landing-fold.png", None, "before-home-390.jpg")                         # F4 + F6
save("walk-05-level-one-cta-engine-fold.png", None, "before-engine-390.jpg")  # F1 + F3
save("walk-10-engine-sri-lanka-list-fold.png", None, "before-packages-390.jpg")  # F2
save("landing-mobile.png", (0, 7464, 780, 7784), "before-whatsapp-390.jpg")   # F5
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
const inView = (page) => page.evaluate(async () => {
  const imgs = [...document.querySelectorAll('img')].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 0; });
  await Promise.all(imgs.map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 6000); })));
});
const toEl = async (page, sel, offset = 0) => {
  await page.evaluate(([s, o]) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + o); }, [sel, offset]);
  await page.waitForTimeout(700); await inView(page); await page.waitForTimeout(500);
};
// walk down to the drop (plates are requested once the levels are in view), wait for the stage, then stop at fraction f of the run
const toDrop = async (page, f) => {
  for (let y = 0; y < 2400; y += 300) { await page.mouse.wheel(0, 300); await page.waitForTimeout(150); }
  await page.waitForSelector('#lodge .ready', { timeout: 30000 }).catch(() => {});
  await page.evaluate((f) => { const r = document.getElementById('droprun'); const top = r.getBoundingClientRect().top + scrollY; window.scrollTo(0, top + f * (r.offsetHeight - innerHeight)); }, f);
  await page.waitForTimeout(1500);
};
const shot = (page, name) => page.screenshot({ path: `${out}/${name}`, type: 'jpeg', quality: 78 });
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const laptop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };

// phone, reduced motion: first screen, levels, guests, booking drawer
let ctx = await browser.newContext({ ...phone, reducedMotion: 'reduce' });
let page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await shot(page, 'after-390-top.jpg');
await toEl(page, '#levels'); await shot(page, 'after-390-levels.jpg');
await toEl(page, '#gs-t', -110); await shot(page, 'after-390-guests.jpg');
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
await page.locator('a.btn[data-book]:visible', { hasText: 'Book package now' }).first().click();
await page.waitForTimeout(1500); await inView(page);
await shot(page, 'after-390-book.jpg');
await ctx.close();

// phone, motion on: the drop
ctx = await browser.newContext({ ...phone, reducedMotion: 'no-preference' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await toDrop(page, 0.3); await shot(page, 'after-390-drop.jpg');
await ctx.close();

// laptop: first screen (reduced motion), then the drop (motion on)
ctx = await browser.newContext({ ...laptop, reducedMotion: 'reduce' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await shot(page, 'after-1440-top.jpg');
await ctx.close();
ctx = await browser.newContext({ ...laptop, reducedMotion: 'no-preference' });
page = await ctx.newPage();
await page.goto(url, { waitUntil: 'load' }); await settle(page);
await toDrop(page, 0.3); await shot(page, 'after-1440-drop.jpg');
await ctx.close();
await browser.close();
JS
ls -l "$OUT"/before-*.jpg "$OUT"/after-*.jpg
