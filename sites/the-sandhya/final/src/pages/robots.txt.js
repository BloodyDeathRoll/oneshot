/* robots.txt (station 4h). On a real domain everything is allowed, and the Sitemap line (it needs an absolute
   URL) is written when the build has SITE_URL. On a PREVIEW build (IS_PREVIEW in src/lib/seo.mjs: no SITE_URL,
   or a workers.dev / localhost one) the file is one refusal and names no sitemap. Named AI-crawler groups are
   station 4i's. */
import { IS_PREVIEW } from '../lib/seo.mjs'

const plain = (lines) => new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

export function GET({ site }) {
  if (IS_PREVIEW) return plain(['# Preview build: this is not the published site. Nothing here may be crawled or indexed.', 'User-agent: *', 'Disallow: /'])
  const lines = ['User-agent: *', 'Allow: /']
  if (site) lines.push('', `Sitemap: ${new URL('sitemap.xml', site).href}`)
  return plain(lines)
}
