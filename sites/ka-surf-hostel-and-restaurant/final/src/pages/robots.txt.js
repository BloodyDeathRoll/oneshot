/* robots.txt (station 4h; AI-crawler policy added at 4i). Everything is allowed. The Sitemap line needs an
   absolute URL, so it is written only when the build is given SITE_URL (the production domain); without
   it the file still allows all.
   AI crawlers are named one by one so the policy is a decision on record, not a default: AI_CRAWLERS in
   src/lib/site.mjs. The owner must confirm it (aiseo-report.md); flipping one bot to 'disallow' there is
   the whole change. A bot that matches its own group ignores the '*' group, so each group is complete. */
import { AI_CRAWLERS } from '../lib/site.mjs'

export function GET({ site }) {
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
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
