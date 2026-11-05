/* robots.txt (station 4h; AI crawlers station 4i, the shape of sites/lotus-surf-house/final/src/pages/robots.txt.js).
   A real domain allows everything, names the AI crawlers (AI_CRAWLERS in src/lib/site.mjs, the owner must confirm) and points
   at the sitemap. A bot with its own group ignores the '*' group, so each group is complete.
   A PREVIEW (IS_PREVIEW: no SITE_URL, or a workers.dev / localhost one) is one refusal: 'Disallow: /' for '*' and the same for
   every named AI crawler, since an allow group here would tell exactly those bots the opposite. No Sitemap line: a preview has
   no sitemap. */
import { AI_CRAWLERS, IS_PREVIEW } from '../lib/site.mjs'

const plain = (lines) =>
  new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })

export function GET({ site }) {
  if (IS_PREVIEW) {
    const lines = [
      '# Preview build: this is not the published site. Nothing here may be crawled or indexed.',
      'User-agent: *',
      'Disallow: /',
    ]
    const bots = Object.keys(AI_CRAWLERS)
    if (bots.length) {
      lines.push('', '# The named AI crawlers repeat the refusal: a bot matching its own group ignores the "*" group.')
      for (const bot of bots) lines.push(`User-agent: ${bot}`)
      lines.push('Disallow: /')
    }
    return plain(lines)
  }

  const lines = ['User-agent: *', 'Allow: /']
  const groups = { allow: [], disallow: [] }
  for (const [bot, policy] of Object.entries(AI_CRAWLERS)) groups[policy === 'disallow' ? 'disallow' : 'allow'].push(bot)
  if (groups.allow.length) {
    lines.push('', '# AI crawlers and assistants: allowed, so answers can quote and link this site (owner to confirm)')
    for (const bot of groups.allow) lines.push(`User-agent: ${bot}`)
    lines.push('Allow: /')
  }
  if (groups.disallow.length) {
    lines.push('', '# AI crawlers the owner has chosen to block')
    for (const bot of groups.disallow) lines.push(`User-agent: ${bot}`)
    lines.push('Disallow: /')
  }
  if (site) lines.push('', `Sitemap: ${new URL('sitemap.xml', site).href}`)
  return plain(lines)
}
