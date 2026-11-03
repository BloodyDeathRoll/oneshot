/* /llms.txt (station 4i). A plain-text summary of the page for answer engines, in the llms.txt shape (H1 name,
   blockquote summary, sections, links). Built from src/tenant/content.json at build time — the same content the page
   renders — so it can never drift from the site. Nothing here is written by hand: every sentence is an owner/deployer
   field (or the SCHEMA GAP value the page itself shows, gaps.json); only the section labels are template wording.
   Absolute URLs only when the build has SITE_URL (as canonical/sitemap, station 4h). Same shape as
   sites/ka-surf-hostel-and-restaurant/final/src/pages/llms.txt.js, extended for a surf camp's lessons, weeks and shop. */
import {
  c, PLACE, PLATFORM, safeUrl, phoneText, paras, block, money, monYear, dayMonYear, quoteSource,
  LESSON, LESSON_YEAR, UNIT, TRANSFERS, IS_PREVIEW,
} from '../lib/site.mjs'

const UNIT_TEXT = { ...UNIT, flat: '' }
const price = (r) => [money(r.price, r.currency), UNIT_TEXT[r.unit]].filter(Boolean).join(' ')

export function GET({ site }) {
  const name = c.businessName
  const blocks = c.copyBlocks ?? []
  const intro = block('intro', 0)
  /* the same blocks index.astro places: lessons = offer 0, weeks = offer 1, shop = about 1, getting here = info 0 */
  const lessonsB = block('offer', 0), weeksB = block('offer', 1), shopB = block('about', 1), hereB = block('info', 0)
  const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
  const address = (c.contact?.address ?? '').replace(/\n/g, ', ')
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')
  const list = (rows) => (rows.length ? ['', ...rows] : [])

  /* rows the page shows next to a copy block, appended under that block's heading */
  const extra = new Map()
  if (lessonsB) extra.set(lessonsB, (c.lessons ?? []).map((l) => {
    const det = [
      l.price != null && l.currency ? price(l) : '',
      l.durationMin ? `${l.durationMin} min` : '',
      (l.level ?? []).length ? `levels: ${l.level.map((x) => x.replace('_', '-')).join(', ')}` : '',
      l.groupSize ?? '',
      l.includes ? `includes ${l.includes}` : '',
    ].filter(Boolean).join(', ')
    const dated = l === LESSON && LESSON_YEAR ? ` (price published in ${LESSON_YEAR})` : ''
    return `- ${l.label}${det ? `: ${det}` : ''}${dated}`
  }))
  if (weeksB) extra.set(weeksB, (c.priceList ?? []).filter((r) => r.unit !== 'flat')
    .map((r) => `- ${r.label}: ${price(r)}${r.note ? ` (${r.note.replace(/\.$/, '')})` : ''}`))
  if (shopB) extra.set(shopB, [
    ...(c.rentals ?? []).map((r) => `- ${r.label}${r.price != null && r.currency ? `: ${price(r)}` : ''}${r.note ? ` (${r.note})` : ''}`),
    (c.brands ?? []).length ? `- Brands: ${c.brands.map((b) => b.label).join(', ')}` : null,
  ])
  if (hereB) extra.set(hereB, TRANSFERS.map((r) => `- ${r.label}: ${price(r)}${r.note ? ` (${r.note.replace(/\.$/, '')})` : ''}`))

  out.push(`# ${name}`, '')
  if (c.tagline) out.push(`> ${c.tagline.replace(/[.\s]+$/, '')}.`)
  /* on a preview build the file stays reachable (the owner and we read it) but says what it is. robots.txt already
     disallows everything; this line is the only in-band signal an engine that ignores robots.txt would see. */
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${name}, ${address}.`)
  if (intro) out.push('', text(intro))

  for (const b of blocks) {
    if (b === intro) continue
    section(b.heading || name, [text(b), ...list((extra.get(b) ?? []).filter(Boolean))])
  }

  section('Rooms', (c.rooms ?? []).map((r) => `- ${[r.label, r.beds, r.sleeps ? `sleeps ${r.sleeps}` : '', r.note].filter(Boolean).join(', ')}`))
  section('Check-in and check-out', [
    st.checkInFrom && `- Check-in: ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    st.checkOutTo && `- Check-out: ${st.checkOutFrom ? `${st.checkOutFrom} to ` : 'by '}${st.checkOutTo}`,
    st.minNights ? `- Minimum stay: ${st.minNights} nights` : null,
    st.note && `- ${st.note}`,
  ])
  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('The wave', [c.spot && `- The spot: ${c.spot}`, c.season && `- The season: ${c.season}`])
  section('Ratings', (c.ratings ?? []).filter((r) => r.score != null).map((r) => {
    const p = PLATFORM[r.platform] || r.platform
    const when = dayMonYear(r.capturedAt)
    return `- ${safeUrl(r.url) ? `[${p}](${r.url})` : p}: ${r.score}/${r.scale}, ${r.count} reviews${when ? ` (read ${when})` : ''}`
  }))
  section('What guests wrote', (c.testimonials ?? []).map((q) => {
    const src = quoteSource(q)
    return `- "${q.quote.replace(/\s*\n\s*/g, ' ')}" (${[q.author, src?.name, monYear(q.date)].filter(Boolean).join(', ')})`
  }))
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
  section('Pages', [
    `- [${[name, PLACE].filter(Boolean).join(', ')}](${site ? new URL('./', site).href : './'}): the website, one page`,
  ])
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
