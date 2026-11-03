/* robots.txt (station 4h): everything allowed on a real domain. The Sitemap line needs an absolute URL, so it is
   written only when the build has SITE_URL. On a PREVIEW build (IS_PREVIEW in src/lib/site.mjs: no SITE_URL, or a
   workers.dev / localhost one) the whole file is one refusal and there is no Sitemap line. Named AI-crawler groups
   are station 4i's. */
import { IS_PREVIEW } from '../lib/site.mjs'

export function GET({ site }) {
  const lines = IS_PREVIEW
    ? ['# Preview build: this is not the published site. Nothing here may be crawled or indexed.', 'User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /']
  if (site && !IS_PREVIEW) lines.push('', `Sitemap: ${new URL('sitemap.xml', site).href}`)
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
