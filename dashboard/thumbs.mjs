// dashboard/thumbs.mjs — first-screen thumbnail of a site's live preview, for the Overview and Sites views.
// Output: dashboard/mockups/<variant>/dist/img/<slug>.jpg (git-ignored, skipped by tools/media.mjs).
//
// Shot from the preview URL (the `previewed` ledger line), never from review screenshots: those are
// scratch and deleted after each scored round (CLAUDE.md rule 6). The JPEG is a cache, ignored by git;
// delete it and it is shot again. One browser, one shot at a time.
import { existsSync, statSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export const THUMB_MAX_AGE_MS = 6 * 3600 * 1000;
let browser = null, queue = Promise.resolve();

export const thumbFresh = (path) => existsSync(path) && Date.now() - statSync(path).mtimeMs < THUMB_MAX_AGE_MS;

// 1344×840 desktop viewport at device scale 0.5 → a 672×420 JPEG (the card slot at 2×).
export function shootThumb(url, outPath) {
  const job = queue.then(async () => {
    if (!browser) { const { chromium } = await import('playwright'); browser = await chromium.launch(); }
    const page = await browser.newPage({ viewport: { width: 1344, height: 840 }, deviceScaleFactor: 0.5 });
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30_000 });
      await page.waitForTimeout(2500); // hero video / canvas first frame
      mkdirSync(dirname(outPath), { recursive: true });
      await page.screenshot({ path: outPath, type: 'jpeg', quality: 80 });
    } finally { await page.close(); }
    return outPath;
  });
  queue = job.catch(() => {});
  return job;
}

export async function closeThumbs() { if (browser) { await browser.close(); browser = null; } }
