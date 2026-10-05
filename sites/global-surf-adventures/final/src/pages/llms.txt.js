/* /llms.txt (station 4i) — a plain-text summary of the site for answer engines (llms.txt shape: H1 name,
   blockquote summary, sections, links). Generated at build time from the same sources the two pages
   render — src/tenant/content.json (Payload), src/gaps/gaps.json (SCHEMA GAP content) and the approved
   labels — through the same helpers, so it cannot drift from the site. Never hand-maintained.

   Rule: it says what the pages show, in page order, and nothing else. Content fields the design does not
   render (the two "offer" copy blocks, amenities[], stayInfo.note, the second rooms paragraph, the "What
   guests say" body) stay out until the page shows them (aiseo-report.md lists them). Every link here is
   an href or a form action on the pages. Only section labels and the joins ("per person", "read") are
   template wording. Mechanics follow this pipeline's other finals (KA, Layday, Lavish). */
import {
  c, G, ST, B, paras, block, levelPrice, stayLine, PLATFORM, LEVELS, FREE, ROOMS, WA, waWith,
  safeUrl, tel, dayMonYear, IS_PREVIEW,
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
  const intro = block('intro', 0)
  section(intro?.heading ?? ST.welcome, [paras(intro?.body).join('\n\n'), '', ...items(G.details?.welcome).map((x) => `- ${x}`)])

  const from = levelPrice ? items(levelPrice) : []
  const price = from.length ? `${from[0].replace(/ pp$/, ' per person')}, ${from.slice(1).join(', ')}` : null
  section(ST.levels, [
    ...LEVELS.map((L) => `- ${L.name}: ${dot(L.oneLiner)}${price ? ` ${price}.` : ''} [Book ${L.name}](${url(`book/?level=${L.slug}`)})`),
    FREE.name && `- ${FREE.name}: ${dot(FREE.one)}${FREE.detail ? ` ${dot(FREE.detail)}` : ''}${WA ? ` [Ask about dates on WhatsApp](${waWith(G.freestylers?.whatsappText)})` : ''}`,
  ])

  const inc = G.inclusions ?? {}
  const coached = (inc[3] ?? []).map((i) => i.text).find((t) => /coached/.test(t))
  section(ST.included, [
    ...(inc[1] ?? []).map((i) => `- ${i.text}`),
    '',
    coached && LEVELS[2] ? `${LEVELS[2].name}: ${coached}.` : null,
    dot(inc.optionalExtra),
  ])

  const week = block('about', 0)
  section(week?.heading ?? ST.week, [paras(week?.body).join('\n\n')])

  const roomsLead = paras(block('about', 1)?.body)[0] ?? ''
  section(ST.rooms, [
    roomsLead, '',
    ...ROOMS.map((r) => {
      const sup = r.supplement?.display ?? [r.supplement?.displayOneGuest, r.supplement?.displayCouple].filter(Boolean).join('; ')
      return `- ${r.label}: ${dot(r.line)} ${dot(r.description)} ${items(r.details).join(', ')}.${sup ? ` Room price: ${sup}.` : ''}`
    }),
    '',
    G.roomsNote ?? null,
  ])

  if (c.featureLine) out.push('', c.featureLine)

  const guests = block('about', 2)
  section(guests?.heading ?? ST.guests, [
    ...(c.ratings ?? []).map((r) => {
      const p = PLATFORM[r.platform] ?? r.platform
      return `- ${p}: ${r.score}/${r.scale}, ${r.count} reviews${dayMonYear(r.capturedAt) ? `, read ${dayMonYear(r.capturedAt)}` : ''}`
    }),
    G.details?.ratingCategories ? `- ${items(G.details.ratingCategories).join(', ')}` : null,
    '',
    ...(c.testimonials ?? []).map((t) => `- "${t.quote}" (${[t.author, PLATFORM[t.source]].filter(Boolean).join(', ')})`),
  ])

  const fc = c.forecast?.enabled && /^[a-z0-9-]+$/.test(c.forecast?.rosaSpotId ?? '') ? c.forecast : null
  section(ST.waves, [
    c.spot, '',
    fc && `- [Forecast for ${fc.spotName || fc.rosaSpotId} by Rosa](https://rosa.surf/spot/${fc.rosaSpotId})`,
  ])

  if (c.closing) out.push('', c.closing)

  /* booking page (book/): how the booking works, the approved booking labels it prints */
  section('How to book', [
    [B.field_checkin_help, B.guests_help, B.currency_note && dot(B.currency_note), B.deposit, B.handoff, B.handoff_nothing_booked].filter(Boolean).join(' '),
    '',
    `- [Booking page](${url('book/')}): choose your level, room, dates and guests, then continue to the booking engine`,
    WA && `- [WhatsApp](${WA})`,
    tel(k.phone) && `- Phone: ${k.phone}`,
    k.email && `- Email: ${k.email}`,
  ])

  const info = block('info', 0)
  section(info?.heading ?? ST.getting_here, [
    address && `- Address: ${address}`,
    info?.body && `- ${info.body}`,
    stayLine && `- ${items(stayLine).join(', ')}`,
    safeUrl(k.mapUrl) && `- [Map](${k.mapUrl})`,
  ])

  section('Pages', [
    `- [${name}](${url('')}): the lodge, the three surf levels, rooms, reviews, the waves`,
    `- [Booking](${url('book/')}): level, room, dates and guests, total`,
    G.instagram?.url && safeUrl(G.instagram.url) && `- [Instagram ${G.instagram.handle ?? ''}](${G.instagram.url})`.replace(' ]', ']'),
  ])

  /* from the CMS's updatedAt once a tenant exists (null in the seed, so omitted today) */
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)
  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
