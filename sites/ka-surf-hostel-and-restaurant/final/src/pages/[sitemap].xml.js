/* sitemap.xml (station 4h). The sitemap protocol requires absolute URLs, so the file is built only when
   the build is given SITE_URL; without it there is no sitemap (and robots.txt names none). One page,
   one locale (run.yaml: en). lastmod is the CMS document's updatedAt when there is one, never invented. */
import raw from '../tenant/content.json'

export function getStaticPaths() {
  return process.env.SITE_URL ? [{ params: { sitemap: 'sitemap' } }] : []
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
