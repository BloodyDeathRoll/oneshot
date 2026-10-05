// dashboard/thumbs.mjs — first-screen thumbnail of a site's live preview, for the Overview and Sites views,
// and whether a site's pitch page is deployed.
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

// Is a page live? (a pitch page can be written and never deployed). Cached 5 minutes per URL.
const liveCache = new Map();
export async function isLive(url) {
  const c = liveCache.get(url);
  if (c && Date.now() - c.at < 300_000) return c.ok;
  let ok = false;
  try { ok = (await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(4000) })).ok; } catch { ok = false; }
  liveCache.set(url, { ok, at: Date.now() });
  return ok;
}
export async function markPitchLive(data) {
  await Promise.all(data.businesses.filter((b) => b.pitch?.proposal_url).map(async (b) => { b.pitch.proposal_live = await isLive(b.pitch.proposal_url); }));
  return data;
}
