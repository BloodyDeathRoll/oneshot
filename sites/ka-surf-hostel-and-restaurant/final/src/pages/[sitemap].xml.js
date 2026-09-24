/* sitemap.xml (station 4h). The sitemap protocol requires absolute URLs, so the file is built only when
   the build is given SITE_URL; without it there is no sitemap (and robots.txt names none). One page,
   one locale (run.yaml: en). lastmod is the CMS document's updatedAt when there is one, never invented.
   A preview build (IS_PREVIEW: no SITE_URL, or a workers.dev / localhost one) gets no sitemap either —
   it disallows everything, and a sitemap is a list of pages asking to be indexed. */
import raw from '../tenant/content.json'
import { IS_PREVIEW } from '../lib/site.mjs'

export function getStaticPaths() {
  return IS_PREVIEW ? [] : [{ params: { sitemap: 'sitemap' } }]
}

export function GET({ site }) {
  const loc = new URL('./', site).href
  const updated = raw.locales.en.updatedAt
  const lastmod = updated && !Number.isNaN(Date.parse(updated)) ? `<lastmod>${new Date(updated).toISOString().slice(0, 10)}</lastmod>` : ''
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url><loc>${loc}</loc>${lastmod}<xhtml:link rel="alternate" hreflang="en" href="${loc}"/></url>
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
