/* robots.txt (station 4h). A real domain allows everything and points at the sitemap. A PREVIEW (IS_PREVIEW in src/lib/site.mjs:
   no SITE_URL, or a workers.dev / localhost one) is one refusal and has no Sitemap line, since it has no sitemap. Which AI
   crawlers are named is station 4i's decision. A bot with its own group ignores the '*' group, so a named group must repeat
   the refusal on a preview: sites/lotus-surf-house/final/src/pages/robots.txt.js has the shape. */
import { IS_PREVIEW } from '../lib/site.mjs'

const plain = (lines) =>
  new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

export function GET({ site }) {
  if (IS_PREVIEW) {
    return plain([
      '# Preview build: this is not the published site. Nothing here may be crawled or indexed.',
      'User-agent: *',
      'Disallow: /',
    ])
  }
  return plain(['User-agent: *', 'Allow: /', ...(site ? ['', `Sitemap: ${new URL('sitemap.xml', site).href}`] : [])])
}
