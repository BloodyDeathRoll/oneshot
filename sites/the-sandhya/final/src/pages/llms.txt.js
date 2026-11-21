/* /llms.txt (station 4i, aiseo 0.2.2): a plain-text summary of the page for answer engines, in the llms.txt
   shape (H1 name, blockquote summary, sections, links). Built at build time from src/tenant/content.json, the
   same content the page renders (Payload after a sale), so it cannot drift from the site and is never
   hand-maintained. Every sentence is an owner or deployer field; only the section labels and the "Phone" /
   "Email" / "Address" prefixes are template wording (src/lib/labels.mjs where the page has the label).

   Rule: it says what the page shows, in the page's order, and nothing more. Left out on purpose
   (aiseo-report.md): the ratings (no rating is restated for machines; the Kayak score is not verified by a
   person), languagesSpoken (the page prints no sentence for it), photo alt texts.
   On a PREVIEW build it says so in its first lines; robots.txt refuses every crawler there anyway. */
import content from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import LABELS from '../lib/labels.mjs'
import { IS_PREVIEW } from '../lib/seo.mjs'

const lang = content.locales.en?.languages?.[0] ?? 'en'
const c = content.locales[lang] ?? content.locales.en
const L = LABELS[lang] ?? LABELS.en

const https = (u) => (typeof u === 'string' && /^https:\/\/[^\s"<>]+$/.test(u) ? u : null)
const paras = (b) => (b?.body ? b.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [])
const stop = (t) => (t ? t.trim().replace(/[.\s]+$/, '') : '')
/* the page's own formatting (index.astro): US$3,500, +94 765 700 007, "June 2026" */
const money = (p) => `${{ USD: 'US$', EUR: '€', LKR: 'LKR ' }[p.currency] ?? p.currency + ' '}${p.price.toLocaleString('en-US')}`
const phonePrinted = (p) => p.replace(/^\+(94)(\d{3})(\d{3})(\d{3})$/, '+$1 $2 $3 $4')
const monthName = (ym) => new Date(`${ym}-15T00:00:00Z`).toLocaleString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

export function GET({ site }) {
  const name = c.businessName
  const slot = (n) => (c.copyBlocks ?? []).filter((b) => b.slot === n)
  /* the page's bindings (index.astro): intro; about = Why, Casual Luxe, Looking after the place;
     offer = the rooms, the Dining Room, Exclusive Use; info = Kabalana and around */
  const [intro] = slot('intro')
  const [why, luxe, care] = slot('about')
  const [roomsB, dining, excl] = slot('offer')
  const [kab] = slot('info')
  const placed = new Set([intro, why, luxe, care, roomsB, dining, excl, kab].filter(Boolean))
  const extra = (c.copyBlocks ?? []).filter((b) => !placed.has(b)) // a row the page does not place yet: kept, at the end

  const links = (c.bookingLinks ?? []).filter((l) => https(l.url))
  const k = c.contact ?? {}
  const st = c.stayInfo ?? {}
  const out = []
  const section = (h, lines) => { const l = lines.filter((x) => typeof x === 'string'); if (l.some(Boolean)) out.push('', `## ${h}`, '', ...l) }
  const text = (b) => paras(b).join('\n\n')
  const block = (b, more = []) => b && section(b.heading || name, [text(b), ...more])

  out.push(`# ${name}`, '')
  if (c.tagline) out.push(`> ${stop(c.tagline)}.`)
  if (IS_PREVIEW) out.push('', 'Preview build, not the published site: shown to the owner for review. Do not index, quote or cite it.')
  if (k.address) out.push('', `${name}, ${k.address.replace(/\s*\n\s*/g, ', ')}.`)

  block(intro)
  const roomRows = (c.rooms ?? []).map((r) => `- ${r.label}: ${[r.beds, r.sleeps && `${L.sleeps.toLowerCase()} ${r.sleeps}`].filter(Boolean).join(', ')}.${r.note ? ` ${r.note}` : ''}`)
  block(roomsB, roomRows.length ? ['', ...roomRows] : [])
  if (!roomsB) section(L.rooms, roomRows)
  section(`${L.checkIn} and ${L.checkOut.toLowerCase()}`, [
    st.checkInFrom && `- ${L.checkInFrom} ${st.checkInFrom}`,
    st.checkOutTo && `- ${L.checkOutBy} ${st.checkOutTo}`,
    st.note && `- ${st.note}`,
  ])
  section(L.amenities, (c.amenities ?? []).map((a) => `- ${a.label}${a.note ? ` (${a.note})` : ''}`))
  if (c.featureLine) section(L.theView, [c.featureLine])
  block(dining)
  block(luxe)
  /* spot sits under the Kabalana heading on the page, before the block's paragraphs */
  if (kab) section(kab.heading || L.kabalana, [c.spot, c.spot && '', text(kab)])
  else if (c.spot) section(L.kabalana, [c.spot])
  section(L.guests, (c.testimonials ?? []).map((t) =>
    `- "${t.quote}" (${[t.author, t.source === 'other' ? gaps.testimonialSource : t.source, t.date && monthName(t.date)].filter(Boolean).join(', ')})`))
  const prices = (c.priceList ?? []).map((p) => `- ${p.label}: ${money(p)}.${p.note ? ` ${p.note}` : ''}`)
  block(excl, prices.length ? ['', ...prices] : [])
  if (!excl) section('Prices', prices)
  block(care)
  block(why)
  for (const b of extra) block(b)
  section('How to book', [
    ...links.map((l) => `- [${l.label}](${l.url})`),
    c.closing && '',
    c.closing,
  ])
  section('Contact and location', [
    k.phone && `- Phone: ${phonePrinted(k.phone)} (${k.phone})`,
    k.email && `- Email: ${k.email}`,
    k.address && `- Address: ${k.address.replace(/\s*\n\s*/g, ', ')}`,
    c.hoursNote && `- ${c.hoursNote}`,
    https(k.mapUrl) && `- [${L.map}](${k.mapUrl})`,
    ...(c.socialLinks ?? []).filter((l) => https(l.url)).map((l) => `- [${l.platform === 'instagram' ? L.instagram : l.platform}](${l.url})`),
  ])
  section('Pages', [`- [${name}](${site ? new URL('./', site).href : './'}): the website, one page`])
  /* from the CMS's updatedAt once a tenant exists (the demo's content.json has none, so omitted today) */
  if (c.updatedAt && !Number.isNaN(Date.parse(c.updatedAt))) out.push('', `Last updated: ${new Date(c.updatedAt).toISOString().slice(0, 10)}`)
  return new Response(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
