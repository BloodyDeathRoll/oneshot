/**
 * Parity between the CMS-built site and a local build of the same content (deploy.mjs `deploy`,
 * tools/site-check.mjs --full). Pure functions, unit-tested in tools/test/site-check.test.mjs.
 *
 * The seed stores every photo and video as `<slug>-<sha256:8>-<original name>` (no clash across
 * tenants, a re-seed reuses the stored file), so the CMS build names its files that way while a
 * local build of content.json uses the original names. Strip the whole prefix, whatever the
 * original name looks like (`img-…`, `vid-…`, `gs-hero-loop.mp4`…).
 */

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Remove the seed's `<slug>-<8 hex>-` prefix from every file name in `text`. */
export const stripSeedPrefix = (text, slug) => text.replace(new RegExp(`${escape(slug)}-[0-9a-f]{8}-`, 'g'), '')

/** Lines that differ between two HTML files (after splitting tags onto their own lines). */
export function lineDiff(a, b) {
  const split = (s) => s.replace(/></g, '>\n<').split('\n')
  const A = split(a), B = split(b)
  const out = []
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    if (A[i] !== B[i]) out.push({ line: i + 1, local: (A[i] ?? '').slice(0, 200), cms: (B[i] ?? '').slice(0, 200) })
  }
  return out
}

/** Parity of a local build (`localHtml`) against the CMS build (`cmsHtml`) of tenant `slug`. */
export const parity = (localHtml, cmsHtml, slug) => {
  const diff = lineDiff(stripSeedPrefix(localHtml, slug), stripSeedPrefix(cmsHtml, slug))
  return { identical: diff.length === 0, note: 'photo and video names compared without the seed\'s <slug>-<sha256:8>- prefix', differingLines: diff.slice(0, 20), differingCount: diff.length }
}
