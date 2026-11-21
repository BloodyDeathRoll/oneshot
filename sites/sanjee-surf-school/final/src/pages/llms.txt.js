/* /llms.txt (station 4i). A plain-text summary of the page, in page order, built at build time from the same content and the
   same helpers as the page, so it cannot say more than the page. Every sentence is a content field, verbatim; only the section
   labels are template wording, and no sentence is written here.
   Left out on purpose: credentials[] (self-reported, no certificate found, not repeated as a machine-readable claim: same as the
   JSON-LD), featureLine (a slogan). No hours, cancellation terms, founder or operator: the content has none of them.
   A preview says it is one and claims no address of its own. */
import {
  S, L, M, BIZ, IS_PREVIEW, ADDRESS, EMAIL, MAP, PHONE_PRINT, PRICE_DATE, SHOP, TOURS, WA_DIGITS,
  block, date, lessonDetails, paras, rentalTable, t, wa, httpsOnly,
} from '../lib/site.mjs'

const money = (r) => `${r.currency} ${r.price}`

export function GET({ site }) {
  const out = []
  const used = new Set()
  /* one section: a heading and its lines; empty lines are dropped, an empty section is not written */
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  /* a copy block under its own heading, verbatim, with the rows the page shows next to it */
  const copy = (b, rows = []) => { if (!b) return; used.add(b); section(b.heading || BIZ, [paras(b).join('\n\n'), rows.length ? '' : null, ...rows]) }
  const dated = (rows) => (rows.length && PRICE_DATE ? [...rows, '', PRICE_DATE] : rows)

  out.push(`# ${BIZ}`, '')
  if (S.tagline) out.push(`> ${S.tagline}`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site. Do not index, quote or cite it.')
  if (ADDRESS) out.push('', `${BIZ}, ${ADDRESS}.`)

  copy(block('intro', 0))
  copy(block('offer', 0), dated((S.lessons ?? []).map((l) =>
    `- ${[l.label, ...lessonDetails(l), `${money(l)}${l.unit === 'per_lesson' ? ` ${L.per_lesson}` : ''}`, l.includes].filter(Boolean).join(' | ').replace(/ /g, ' ')}`)))
  copy(block('info', 0))

  const rental = rentalTable()
  copy(block('offer', 1), dated([
    ...rental.rows.map(({ dur, soft, hard }) => {
      const note = (soft ?? hard).note
      return `- ${dur}${note ? ` (${note})` : ''}: ${[soft && `${L.soft} ${money(soft)}`, hard && `${L.hard} ${money(hard)}`].filter(Boolean).join(', ')}`
    }),
    ...rental.extra.map((r) => `- ${r.label}${r.unit === 'per_day' ? ` | ${L.per_day}` : ''}: ${money(r)}`),
    ...SHOP.map((r) => `- ${r.label}: ${money(r)}`),
  ]))

  /* Sanjee: the languages line as his section prints it. No credentials (see the top of this file). */
  const names = (S.languagesSpoken ?? []).map((x) => L.language_names[x] ?? x).join(' | ')
  copy(block('about', 0), names ? [t(L.languages, { list: names })] : [])

  const r0 = S.ratings?.[0]
  section(L.reviews_aria, [
    r0 && `${httpsOnly(r0.url) ? `[${r0.score}/${r0.scale}](${r0.url})` : `${r0.score}/${r0.scale}`}, ${t(L.reviews, { n: r0.count })} | ${t(L.as_of, { date: date(r0.capturedAt) })}`,
    r0 ? '' : null,
    ...(S.testimonials ?? []).map((q) => `- "${q.quote}" (${q.author} | ${L.platform})`),
  ])

  section(L.nav.find(([, i]) => i === 'waves')[0], [S.spot && `- ${S.spot}`, S.season && `- ${S.season}`])
  copy(block('info', 1))

  copy(block('offer', 2), dated(TOURS.map((r) => `- ${r.name}${r.when ? ` ${r.when}` : ''}: ${money(r)}. ${r.note}`)))

  /* the primary action is asking on WhatsApp */
  section(L.primary, [
    S.closing ?? null,
    S.closing ? '' : null,
    WA_DIGITS ? `- [${L.primary}](${wa(M.generic)})` : null,
    PHONE_PRINT ? `- ${PHONE_PRINT}` : null,
    EMAIL ? `- ${EMAIL}` : null,
  ])

  copy(block('info', 2), [ADDRESS && `- ${ADDRESS}`, MAP && `- [${L.open_map}](${MAP})`].filter(Boolean))

  /* a block a later edit adds still reaches the file */
  for (const b of S.copyBlocks ?? []) if (!used.has(b)) copy(b)

  /* no page address on a preview: the host is an assumption until a real domain (4h) */
  section('Pages', [`- [${BIZ}](${!IS_PREVIEW && site ? new URL('./', site).href : './'})`])
  if (S.updatedAt && !Number.isNaN(Date.parse(S.updatedAt))) out.push('', `Last updated: ${new Date(S.updatedAt).toISOString().slice(0, 10)}`)

  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
