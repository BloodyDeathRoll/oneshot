/* robots.txt: the same file as sites/lotus-surf-house/final, sites/cheeky-monkey/final and sites/ka-surf-hostel-and-restaurant/final (plumbing,
   station 4h/4i rules), so the preview rule is identical across the finals.

   On a real domain everything is allowed. The Sitemap line needs an absolute URL, so it is written only
   when the build is given SITE_URL (the production domain); without it the file still allows all.
   AI crawlers are named one by one so the policy is a decision on record, not a default: AI_CRAWLERS in
   src/lib/site.mjs. The owner must confirm it (aiseo-report.md); flipping one bot to 'disallow' there is
   the whole change. A bot that matches its own group ignores the '*' group, so each group is complete.

   On a PREVIEW build (IS_PREVIEW in src/lib/site.mjs: no SITE_URL, or a workers.dev / localhost one)
   the whole file is one refusal: 'Disallow: /' for '*', and the same for every named AI crawler —
   because a named bot ignores the '*' group, an allow-all AI group under a site-wide Disallow would
   tell exactly those crawlers the opposite. No Sitemap line: there is no sitemap on a preview. */
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
