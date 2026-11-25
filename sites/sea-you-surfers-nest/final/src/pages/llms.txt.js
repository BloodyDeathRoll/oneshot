/* /llms.txt (station 4i). A plain-text summary of the page for answer engines, in the llms.txt shape (H1 name,
   blockquote summary, sections, links). Built from src/tenant/content.json (and the page's SCHEMA GAP file and
   labels) at build time, through the same helpers the page uses, so it can never drift from the site. Every
   sentence is an owner/deployer field; only the section labels are template wording. Absolute URLs only when the
   build has SITE_URL. Shape as sites/lotus-surf-house/final/src/pages/llms.txt.js, with two changes for this site:
   - the phone is printed only when TEL is set, i.e. when the owner has confirmed the number (TEL_CONFIRMED in
     src/lib/site.mjs). The seed's number is read off the sign photograph and unconfirmed (dossier gaps[0]), so
     today no number is printed. Lotus printed contact.phone directly; that would leak it here.
   - ratings print as the page prints them (RATINGS.shown: 4.9/5, 8.0/10, 5.0/5). */
import { c, G, L, t, NAME, TOWN, PLATFORM, LINKS, TEL, MAP, ADDRESS, CHECKOUT, ROOMS, RATINGS, REVIEWS, hostName, paras, block, monYear, IS_PREVIEW } from '../lib/site.mjs'

export function GET({ site }) {
  const blocks = c.copyBlocks ?? []
  const intro = block('intro', 0)
  const address = ADDRESS.replace(/\n/g, ', ')
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b?.body).join('\n\n')
  /* the page's "A question first" answer: the bookingLinks[] row gaps.bookingRoles.question points at */
  const ask = LINKS[G.bookingRoles?.question] ?? null

  out.push(`# ${NAME}`, '')
  if (c.tagline) out.push(`> ${c.tagline.replace(/[.\s]+$/, '')}.`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${NAME}, ${address}.`)
  if (intro) out.push('', `## ${intro.heading || NAME}`, '', text(intro))
  for (const b of blocks) if (b !== intro) section(b.heading || NAME, [text(b)])

  section('Rooms', ROOMS.map((r) => `- ${[r.label, r.beds, r.sleeps ? `sleeps ${r.sleeps}` : '', r.note].filter(Boolean).join(', ')}`))
  /* check-in is printed only when stayInfo has it: today it is null (Booking.com and Airbnb disagree) */
  section(st.checkInFrom ? 'Check-in and check-out' : 'Check-out and house rules', [
    st.checkInFrom && `- Check-in: ${st.checkInFrom}${st.checkInTo ? ` to ${st.checkInTo}` : ''}`,
    CHECKOUT && `- ${CHECKOUT}`,
    st.minNights ? `- Minimum stay: ${st.minNights} nights` : null,
    st.note && `- ${st.note}`,
  ])
  section('Amenities', (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  section('The beach', [c.spot && `- ${c.spot}`, c.season && `- The season: ${c.season}`])
  section('Ratings', RATINGS.map((r) => `- ${r.url ? `[${r.name}](${r.url})` : r.name}: ${r.shown}, ${r.count} reviews${r.day ? ` (read ${r.day})` : ''}`))
  section('What guests wrote', REVIEWS.map((q) =>
    `- "${q.quote.replace(/\s*\r?\n\s*/g, ' ').trim()}" (${[q.author, PLATFORM[q.source], monYear(q.date)].filter(Boolean).join(', ')})`))
  section('How to book', [
    c.closing ?? null,
    c.closing ? '' : null,
    ...LINKS.map((l) => `- [${l.label}](${l.url})`),
    ask && G.host?.firstName ? `- [${t(L.ask, { name: G.host.firstName, host: hostName(ask.url) })}](${ask.url})` : null,
    c.contact?.whatsapp && `- WhatsApp: ${c.contact.whatsapp}`,
    TEL ? `- Phone: ${c.contact.phone}` : null,
    c.contact?.email && `- Email: ${c.contact.email}`,
  ])
  section('Location', [
    address && `- Address: ${address}`,
    MAP && `- [Google Maps](${MAP})`,
  ])
  section('Pages', [
    `- [${[NAME, TOWN].filter(Boolean).join(', ')}](${site ? new URL('./', site).href : './'}): the website, one page`,
  ])
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
