/* /llms.txt (station 4i) — a plain-text summary of the site for answer engines (llms.txt shape: H1 name,
   blockquote summary, sections, links). Generated at build time from the same sources the two pages render —
   src/tenant/content.json (Payload), src/gaps/gaps.json (SCHEMA GAP content) and the approved labels — through
   the same helpers (LV_LEDE, INCL, LODGE_P, AMEN, ROOMS, levelPrice, stayLine… in src/lib/site.mjs), so it
   cannot drift from the site. Never hand-maintained.

   Rule: it says what the pages show, in page order, and nothing else. Content fields the design does not
   render (the "Pick your level" block, paragraphs after the ones the page shows, lessons[].includes, the
   "What guests say" body) stay out until the page shows them (aiseo-report.md lists them). Every link here is
   an href or a form action on the pages. Only section labels and the joins ("per person", "read") are
   template wording. Mechanics follow sites/global-surf-adventures/final (v1 of this business). */
import {
  c, G, ST, B, paras, block, levelPrice, stayLine, PLATFORM, sourceOf, LEVELS, FREE, ROOMS, INCL, WA_GENERAL,
  LV_LEDE, INCL_LEDE, LODGE_P, LODGE_LEDE, AMEN, safeUrl, tel, dayMonYear, IS_PREVIEW,
} from '../lib/site.mjs'

const items = (s) => String(s ?? '').split('|').map((p) => p.trim()).filter(Boolean)
const dot = (s) => (s ? s.trim().replace(/[.\s]+$/, '') + '.' : '')

export function GET({ site }) {
  const name = c.businessName
  const k = c.contact ?? {}
  const address = (k.address ?? '').replace(/\n/g, ', ')
  const url = (p) => (site ? new URL(p || './', site).href : `./${p}`)
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }

  out.push(`# ${name}`, '')
  if (c.tagline) out.push(`> ${dot(c.tagline)}`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (address) out.push('', `${name}, ${address}.`)

  /* home, in page order */
  const rating = (r) => `${PLATFORM[r.platform] ?? r.platform}: ${r.score}/${r.scale}, ${r.count} reviews${dayMonYear(r.capturedAt) ? `, read ${dayMonYear(r.capturedAt)}` : ''}`
  const from = levelPrice ? items(levelPrice) : []
  const price = from.length ? `${from[0].replace(/ pp$/, ' per person')}, ${from.slice(1).join(', ')}` : null
  section(ST.levels, [
    LV_LEDE, '',
    ...LEVELS.map((L) => `- ${L.name}: ${dot(L.one)}${price ? ` ${price}.` : ''} [Book ${L.name}](${url(`book/?level=${L.slug}`)})`),
    FREE.name && `- ${FREE.name}${FREE.detail ? `, ${FREE.detail}` : ''}: ${dot(FREE.one)}${FREE.wa ? ` [Ask about dates on WhatsApp](${FREE.wa})` : ''}`,
  ])

  section(ST.included, [
    INCL_LEDE, '',
    ...INCL.map((it) => `- ${it.text}${it.l3 ? ` (Level 3: ${it.l3.charAt(0).toLowerCase() + it.l3.slice(1)})` : ''}`),
    '',
    G.inclusions?.optionalExtra ?? null,
  ])

  section(ST.lodge, [
    c.featureLine ?? null, '',
    LODGE_LEDE, '',
    LODGE_P[1] ?? null, '',
    AMEN ? `Amenities: ${items(AMEN).join('; ')}.` : null,
  ])

  section(ST.rooms, [
    ...ROOMS.map((r) => {
      const sup = r.supplement?.display ?? [r.supplement?.displayOneGuest, r.supplement?.displayCouple].filter(Boolean).join('; ')
      return `- ${r.label}: ${dot(r.line)} ${dot(r.description)} ${items(r.details).join(', ')}.${sup ? ` Room price: ${sup}.` : ''}`
    }),
    '',
    G.details?.everyRoom ? `${items(G.details.everyRoom).join(', ')}.` : null,
    G.roomsNote ?? null,
  ])

  const fc = c.forecast?.enabled && /^[a-z0-9-]+$/.test(c.forecast?.rosaSpotId ?? '') ? c.forecast : null
  section(ST.waves, [
    c.spot ?? null, '',
    fc && `- [Forecast for ${fc.spotName || fc.rosaSpotId} by Rosa](https://rosa.surf/spot/${fc.rosaSpotId})`,
  ])

  section(ST.guests, [
    ...(c.ratings ?? []).map((r) => `- ${rating(r)}`),
    G.details?.ratingCategories ? `- ${items(G.details.ratingCategories).join(', ')}` : null,
    '',
    ...(c.testimonials ?? []).map((t) => `- "${t.quote}" (${[t.author, sourceOf(t)].filter(Boolean).join(', ')})`),
  ])

  if (c.closing) out.push('', c.closing)

  const ig = G.instagram
  if (safeUrl(ig?.url)) section(ST.instagram, [`${ig.line ?? ''} [Instagram ${ig.handle ?? ''}](${ig.url})`.replace(' ]', ']').trim()])

  /* the booking form (book/, and the drawer on home): how the booking works, the approved booking labels it prints */
  section('How to book', [
    [B.field_checkin_help, B.guests_help, B.currency_note && dot(B.currency_note), B.deposit, B.handoff, B.handoff_nothing_booked].filter(Boolean).join(' '),
    '',
    `- [Booking page](${url('book/')}): choose your level, room, dates and guests, then continue to the booking engine`,
    WA_GENERAL && `- [WhatsApp](${WA_GENERAL})`,
    tel(k.phone) && `- Phone: ${k.phone}`,
    k.email && `- Email: ${k.email}`,
  ])

  /* footer */
  const info = block('info', 0)
  section(info?.heading ?? ST.getting_here, [
    address && `- Address: ${address}`,
    ...paras(info?.body).map((p) => `- ${p}`),
    stayLine && `- ${items(stayLine).join(', ')}`,
    c.stayInfo?.note && `- ${c.stayInfo.note}`,
    safeUrl(k.mapUrl) && `- [Map](${k.mapUrl})`,
  ])

  section('Pages', [
    `- [${name}](${url('')}): the three surf levels, what's included, the lodge, rooms, the waves, reviews`,
    `- [Booking](${url('book/')}): level, room, dates and guests, total`,
  ])

  /* from the CMS's updatedAt once a tenant exists (null in the seed, so omitted today) */
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)
  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
