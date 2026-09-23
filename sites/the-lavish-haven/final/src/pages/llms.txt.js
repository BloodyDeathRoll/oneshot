/* /llms.txt — copied from this run's Layday build (mechanics only); station 4i owns it. — a plain-text summary of the page for answer engines (llms.txt shape: H1 name, blockquote
   summary, sections, links). Built from src/tenant/content.json at build time, the same content the
   page renders, so it cannot drift from the site. Every sentence is an owner/deployer field; only the
   section labels are template wording. Station 4i owns the final form of this file. */
import { content as c, pName, safeUrl, phoneLabel, paras, scoreText, monthYear, dayMonthYear, IS_PREVIEW } from '../lib/site.mjs'

export function GET({ site }) {
  const name = c.businessName
  const blocks = c.copyBlocks ?? []
  const intro = blocks.find((b) => b.slot === 'intro') ?? null
  const others = blocks.filter((b) => b !== intro)
  const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
  const address = (c.contact?.address ?? '').replace(/\n/g, ', ')
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')

  out.push(`# ${name}`, '')
  out.push(`> ${[c.tagline, intro?.heading].filter(Boolean).map((s) => s.replace(/[.\s]+$/, '')).join('. ')}.`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${name}, ${address}.`)
  if (intro) out.push('', text(intro))
  /* 4i: the room rows sit under the rooms block (offer[0], the same binding as the page), not in a
     separate section after the rest, so the prose and the list it describes stay together. */
  const roomsBlock = blocks.filter((b) => b.slot === 'offer')[0] ?? null
  const roomRows = (c.rooms ?? []).map((r) => `- ${[r.label, r.beds, r.note, r.sleeps ? `sleeps ${r.sleeps}` : null].filter(Boolean).join(', ')}`)
  for (const b of others) section(b.heading || name, b === roomsBlock && roomRows.length ? [text(b), '', ...roomRows] : [text(b)])
  if (!roomsBlock) section('Rooms', roomRows)
  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('Check-in and check-out', [
    st.checkInFrom && `- Check-in: ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    st.checkOutTo && `- Check-out: ${st.checkOutFrom ? `${st.checkOutFrom} to ` : 'by '}${st.checkOutTo}`,
    st.note && `- ${st.note}`,
  ])
  section('The wave', [c.spot, c.season])
  if (c.closing) section('Rates', [c.closing])
  section('Ratings', (c.ratings ?? []).map((r) => {
    const p = pName(r.platform) || r.platform
    return `- ${safeUrl(r.url) ? `[${p}](${r.url})` : p}: ${scoreText(r)}/${r.scale}, ${r.count} reviews${dayMonthYear(r.capturedAt) ? `, read ${dayMonthYear(r.capturedAt)}` : ''}`
  }))
  section('What guests wrote', (c.testimonials ?? []).map((t) =>
    `- "${t.quote}" (${[t.author, pName(t.source), monthYear(t.date)].filter(Boolean).join(', ')})`))
  section('How to book', [
    ...links.map((l) => `- [${l.label}](${l.url})`),
    c.contact?.phone && `- Phone: ${phoneLabel(c.contact.phone)} (${c.contact.phone})`,
  ])
  section('Location', [
    address && `- Address: ${address}`,
    safeUrl(c.contact?.mapUrl) && `- [Map](${c.contact.mapUrl})`,
  ])
  const spotId = c.forecast?.enabled && /^[a-z0-9-]+$/.test(c.forecast?.rosaSpotId ?? '') ? c.forecast.rosaSpotId : null
  section('Pages', [
    `- [${name}](${site ? new URL('./', site).href : './'}): the website, one page`,
    spotId && `- [Forecast for ${c.forecast.spotName || spotId} by Rosa](https://rosa.surf/spot/${spotId})`,
  ])
  /* 4i: from the CMS's updatedAt once a tenant exists (null in the seed, so omitted today) */
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)
  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
