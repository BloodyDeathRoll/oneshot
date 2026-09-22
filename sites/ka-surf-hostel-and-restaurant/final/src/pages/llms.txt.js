/* /llms.txt (station 4i). A plain-text summary of the page for answer engines, in the llms.txt shape
   (H1 name, blockquote summary, sections, links). Built from src/tenant/content.json at build time, the
   same content the page renders, so it can never drift from the site. Nothing here is written by hand:
   every sentence is an owner/deployer field; only the section labels are template wording.
   Absolute URLs only when the build has SITE_URL (as canonical/sitemap, station 4h). */
import {
  content as c, PLATFORM, safeUrl, phoneLabel, paras, score, monthYear, postalAddress, PLACE, IS_PREVIEW,
} from '../lib/site.mjs'

export function GET({ site }) {
  const name = c.businessName
  const blocks = c.copyBlocks ?? []
  const slot = (s, i) => blocks.filter((b) => b.slot === s)[i] ?? null
  const intro = slot('intro', 0), offer = slot('offer', 0)
  const others = blocks.filter((b) => b !== intro && b !== offer)
  const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
  const address = (c.contact?.address ?? '').replace(/\n/g, ', ')
  const place = postalAddress(c.contact?.address)?.addressLocality ?? PLACE
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')

  out.push(`# ${name}`, '')
  out.push(`> ${[c.tagline, intro?.heading].filter(Boolean).map((s) => s.replace(/[.\s]+$/, '')).join('. ')}.`)
  /* 4h: on a preview build the file stays reachable (the owner and we read it) but says what it is.
     robots.txt already disallows everything; this line is the only in-band signal an engine that
     ignores robots.txt would see, and it must not read as an invitation. */
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${name}, ${address}.`)
  if (intro) out.push('', text(intro))

  section(offer?.heading || 'Rooms', [
    offer && text(offer),
    offer && (c.rooms ?? []).length ? '' : null,
    ...(c.rooms ?? []).map((r) => `- ${[r.label, r.beds, r.note].filter(Boolean).join(', ')}`),
  ])
  for (const b of others) section(b.heading || name, [text(b)])

  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('Check-in and check-out', [
    st.checkInFrom && `- Check-in: ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    st.checkOutTo && `- Check-out: ${st.checkOutFrom ? `${st.checkOutFrom} to ` : 'by '}${st.checkOutTo}`,
    st.minNights ? `- Minimum stay: ${st.minNights} nights` : null,
    st.note && `- ${st.note}`,
  ])
  section('The wave', [c.spot, c.season])
  section('Ratings', (c.ratings ?? []).map((r) => {
    const p = PLATFORM[r.platform]?.name || r.platform
    return `- ${safeUrl(r.url) ? `[${p}](${r.url})` : p}: ${score(r)}, ${r.count} reviews`
  }))
  section('What guests wrote', (c.testimonials ?? []).map((t) =>
    `- "${t.quote}" (${[t.author, PLATFORM[t.source]?.name, monthYear(t.date)].filter(Boolean).join(', ')})`))
  section('How to book', [
    ...links.map((l) => `- [${l.label}](${l.url})`),
    c.contact?.phone && `- Phone: ${phoneLabel(c.contact.phone)} (${c.contact.phone})`,
    c.contact?.email && `- Email: ${c.contact.email}`,
  ])
  section('Location', [
    address && `- Address: ${address}`,
    safeUrl(c.contact?.mapUrl) && `- [Map](${c.contact.mapUrl})`,
  ])
  const spotId = c.forecast?.enabled && /^[a-z0-9-]+$/.test(c.forecast?.rosaSpotId ?? '') ? c.forecast.rosaSpotId : null
  section('Pages', [
    `- [${name}, ${place}](${site ? new URL('./', site).href : './'}): the website, one page`,
    spotId && `- [Forecast for ${c.forecast.spotName || spotId} by Rosa](https://rosa.surf/spot/${spotId})`,
  ])
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
