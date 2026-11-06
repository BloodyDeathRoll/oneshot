/* /llms.txt (station 4i). A plain-text summary of the page for answer engines, in the llms.txt shape (H1 name,
   blockquote summary, sections, links). Built from src/tenant/content.json at build time, the same content the page
   renders, so it can never drift from the site. Every sentence is an owner/deployer field, except the section
   labels, the list prefixes ("sleeps", "Check-in:") and the four composed lines of "In short", which only join
   fields with the business name so each survives being quoted alone (aiseo-report.md lists them). Absolute URLs
   only when the build has SITE_URL. Plumbing from sites/coconut-surf-inn-guest-house-and-restaurant/final, cut and
   extended to what this resort publishes: rooms, restaurant hours, prices for the day pass, classes and massages. */
import { c, NAME, ENGINE, TITLE, PLATFORM, safeUrl, phoneText, paras, block, dayMonYear, money, unit, IS_PREVIEW, SOCIAL } from '../lib/site.mjs'

export function GET({ site }) {
  const blocks = c.copyBlocks ?? []
  const intro = block('intro', 0)
  const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
  const address = (c.contact?.address ?? '').replace(/\n/g, ', ')
  const st = c.stayInfo ?? {}
  const rooms = c.rooms ?? []
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')
  const phone = c.contact?.phone ? `${phoneText(c.contact.phone)} (${c.contact.phone})` : ''
  const wa = c.contact?.whatsapp ?? ''

  out.push(`# ${NAME}`, '')
  if (c.tagline) out.push(`> ${c.tagline.replace(/[.\s]+$/, '')}.`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')

  /* the composed lines: each joins content fields with the business name, nothing else */
  section('In short', [
    address && `- ${NAME} is at ${address}.`,
    rooms.length ? `- ${NAME} has ${rooms.length} room types: ${rooms.map((r) => r.label).join(', ')}.` : null,
    st.checkInFrom && st.checkOutTo ? `- Check-in at ${NAME} is from ${st.checkInFrom}; check-out is by ${st.checkOutTo}.` : null,
    ENGINE ? `- ${NAME} takes bookings direct at ${ENGINE.url}${wa ? ` and on WhatsApp at ${wa}` : ''}.` : null,
  ])

  if (intro) out.push('', `## ${intro.heading || NAME}`, '', text(intro))
  for (const b of blocks) if (b !== intro) section(b.heading || NAME, [text(b)])

  section('Rooms', rooms.map((r) => `- ${[r.label, r.beds, r.sleeps ? `sleeps ${r.sleeps}` : '', r.note].filter(Boolean).join(', ')}`))
  section('Check-in and check-out', [
    st.checkInFrom && `- Check-in: from ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    st.checkOutTo && `- Check-out: ${st.checkOutFrom ? `${st.checkOutFrom} to ` : 'by '}${st.checkOutTo}`,
    st.minNights ? `- Minimum stay: ${st.minNights} nights` : null,
    st.note && `- ${st.note}`,
  ])
  const DAY = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' }
  section('Opening hours', [
    ...(c.openingHours ?? []).filter((h) => h.opens && h.closes && (h.days ?? []).length)
      .map((h) => `- ${h.days.map((d) => DAY[d] ?? d).join(', ')}: ${h.opens} to ${h.closes}`),
    c.hoursNote && `- ${c.hoursNote}`,
  ])
  section('Prices', (c.priceList ?? []).map((p) => `- ${p.label}: ${money(p)}${unit(p) ? ` ${unit(p)}` : ''}${p.note ? ` (${p.note})` : ''}`))
  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('The surf', [c.spot && `- ${c.spot}`, c.season && `- ${c.season}`])
  section('Ratings', (c.ratings ?? []).filter((r) => r.score != null).map((r) => {
    const p = PLATFORM[r.platform] || r.platform
    const when = dayMonYear(r.capturedAt)
    return `- ${safeUrl(r.url) ? `[${p}](${r.url})` : p}: ${r.score}/${r.scale}, ${r.count} reviews${when ? ` (captured ${when})` : ''}`
  }))
  section('What guests wrote', (c.testimonials ?? []).map((q) =>
    `- "${q.quote.replace(/\s*\r?\n\s*/g, ' ').trim()}" (${[q.author, PLATFORM[q.source]].filter(Boolean).join(', ')})`))
  section('How to book', [
    c.closing ?? null,
    c.closing ? '' : null,
    ...links.map((l) => `- [${l.label}](${l.url})`),
    wa && `- WhatsApp: ${phoneText(wa)} (https://wa.me/${wa.replace(/^\+/, '')})`,
    phone && `- Phone: ${phone}`,
    c.contact?.email && `- Email: ${c.contact.email}`,
  ])
  section('Location', [
    address && `- Address: ${address}`,
    safeUrl(c.contact?.mapUrl) && `- [Map](${c.contact.mapUrl})`,
  ])
  const SOC = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube' }
  section('Follow', SOCIAL.map((s) => `- [${SOC[s.platform] ?? s.platform}](${s.url})`))
  section('Pages', [`- [${TITLE}](${site ? new URL('./', site).href : './'}): the website`])
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
