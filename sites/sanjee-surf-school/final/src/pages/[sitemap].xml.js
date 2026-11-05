/* sitemap.xml (station 4h; as sites/lotus-surf-house/final). The protocol needs absolute URLs, so the file is built only when
   the build has SITE_URL on a real domain, never on a preview. One route, one locale (run.yaml: en). lastmod is the CMS
   document's updatedAt when there is one, never invented (the seed has none). */
import raw from '../tenant/content.json'
import { SITE_URL, IS_PREVIEW } from '../lib/site.mjs'

export function getStaticPaths() {
  return SITE_URL && !IS_PREVIEW ? [{ params: { sitemap: 'sitemap' } }] : []
}

export function GET({ site }) {
  const updated = raw.locales.en.updatedAt
  const lastmod = updated && !Number.isNaN(Date.parse(updated)) ? `<lastmod>${new Date(updated).toISOString().slice(0, 10)}</lastmod>` : ''
  const loc = new URL('./', site).href
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url><loc>${loc}</loc>${lastmod}<xhtml:link rel="alternate" hreflang="en" href="${loc}"/></url>
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
