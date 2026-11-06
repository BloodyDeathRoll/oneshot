/* sitemap.xml (station 4h; copied from sites/coconut-surf-inn-guest-house-and-restaurant/final). The protocol needs
   absolute URLs, so the file is built only when the build has SITE_URL on a real domain (never on a preview such as
   panta-rei-resort.os1.workers.dev). One route (the home page), one locale (run.yaml: en).
   lastmod is the CMS document's updatedAt when there is one, never invented (the seed has null). */
import raw from '../tenant/content.json'
import { SITE, ROUTES, IS_PREVIEW } from '../lib/site.mjs'

export function getStaticPaths() {
  return SITE && !IS_PREVIEW ? [{ params: { sitemap: 'sitemap' } }] : []
}

export function GET({ site }) {
  const updated = raw.locales.en.updatedAt
  const lastmod = updated && !Number.isNaN(Date.parse(updated)) ? `<lastmod>${new Date(updated).toISOString().slice(0, 10)}</lastmod>` : ''
  const urls = ROUTES.map((r) => {
    const loc = new URL(r || './', site).href
    return `<url><loc>${loc}</loc>${lastmod}<xhtml:link rel="alternate" hreflang="en" href="${loc}"/></url>`
  })
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
