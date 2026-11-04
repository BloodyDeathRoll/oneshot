/* /llms.txt. A plain-text summary of the page for answer engines, in the llms.txt shape (H1 name, blockquote
   summary, sections, links). Built from src/tenant/content.json at build time — the same content the page renders —
   so it can never drift from the site. Every sentence is an owner/deployer field; only the section labels are
   template wording. Absolute URLs only when the build has SITE_URL. Shape as sites/cheeky-monkey/final/src/pages/
   llms.txt.js (plumbing), cut to what a guesthouse publishes: no lessons, prices or shop. */
import { c, TOWN, PLATFORM, safeUrl, phoneText, paras, block, monYear, dayMonYear, IS_PREVIEW } from '../lib/site.mjs'

export function GET({ site }) {
  const name = c.businessName
  const blocks = c.copyBlocks ?? []
  const intro = block('intro', 0)
  const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
  const address = (c.contact?.address ?? '').replace(/\n/g, ', ')
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')

  out.push(`# ${name}`, '')
  if (c.tagline) out.push(`> ${c.tagline.replace(/[.\s]+$/, '')}.`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${name}, ${address}.`)
  if (intro) out.push('', `## ${intro.heading || name}`, '', text(intro))
  for (const b of blocks) if (b !== intro) section(b.heading || name, [text(b)])

  section('Rooms', (c.rooms ?? []).map((r) => `- ${[r.label, r.beds, r.sleeps ? `sleeps ${r.sleeps}` : '', r.note].filter(Boolean).join(', ')}`))
  section('Check-in and check-out', [
    st.checkInFrom && `- Check-in: ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    st.checkOutTo && `- Check-out: ${st.checkOutFrom ? `${st.checkOutFrom} to ` : 'by '}${st.checkOutTo}`,
    st.minNights ? `- Minimum stay: ${st.minNights} nights` : null,
    st.note && `- ${st.note}`,
  ])
  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('The beach', [c.spot && `- ${c.spot}`, c.season && `- The season: ${c.season}`])
  /* 4i: the score to one decimal, as the page prints it (RATINGS.shown: "9.0", not "9") */
  section('Ratings', (c.ratings ?? []).filter((r) => r.score != null).map((r) => {
    const p = PLATFORM[r.platform] || r.platform
    const when = dayMonYear(r.capturedAt)
    return `- ${safeUrl(r.url) ? `[${p}](${r.url})` : p}: ${Number(r.score).toFixed(1)}/${r.scale}, ${r.count} reviews${when ? ` (read ${when})` : ''}`
  }))
  section('What guests wrote', (c.testimonials ?? []).map((q) =>
    `- "${q.quote.replace(/\s*\r?\n\s*/g, ' ').trim()}" (${[q.author, PLATFORM[q.source], monYear(q.date)].filter(Boolean).join(', ')})`))
  section('How to book', [
    c.closing ?? null,
    c.closing ? '' : null,
    ...links.map((l) => `- [${l.label}](${l.url})`),
    c.contact?.whatsapp && `- WhatsApp: ${c.contact.whatsapp}`,
    c.contact?.phone && `- Phone: ${phoneText(c.contact.phone)} (${c.contact.phone})`,
    c.contact?.email && `- Email: ${c.contact.email}`,
  ])
  section('Location', [
    address && `- Address: ${address}`,
    safeUrl(c.contact?.mapUrl) && `- [Map](${c.contact.mapUrl})`,
  ])
  section('Pages', [`- [${[name, TOWN].filter(Boolean).join(', ')}](${site ? new URL('./', site).href : './'}): the website, one page`])
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
