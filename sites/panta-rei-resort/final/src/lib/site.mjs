/**
 * Content plumbing for the page. Everything schema-covered comes from src/tenant/content.json (Payload's REST shape,
 * schemas/site-content.md v0.11); SCHEMA GAP content from src/gaps/gaps.json; interface wording from
 * src/lib/labels.json. Nothing here holds a fact: it reads, formats and escapes.
 * Plumbing (escaping, phone format, glob of the generated manifests) follows
 * sites/coconut-surf-inn-guest-house-and-restaurant/final/src/lib/site.mjs.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import { I } from './icons.mjs'
import { shapeKeyOf } from './shape.mjs'

const glob1 = (g) => Object.values(g)[0] ?? null
const photosGen = glob1(import.meta.glob('../tenant/photos.generated.json', { eager: true, import: 'default' })) ?? {}
const videosGen = glob1(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' })) ?? { videos: {} }

export const c = raw.locales.en
export const G = gaps
export const L = labels
export { I }

export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const t = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
export const P = (body) => paras(body).map((p) => `<p>${e(p)}</p>`).join('')
export const safeUrl = (u) => { try { return new URL(u).protocol === 'https:' ? u : null } catch { return null } }
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)
/* +94728003022 → +94 72 800 3022 (Sri Lankan mobile grouping); other numbers as stored */
export const phoneText = (e164) => { const m = /^\+94(\d{2})(\d{3})(\d{4})$/.exec(e164 ?? ''); return m ? `+94 ${m[1]} ${m[2]} ${m[3]}` : e164 ?? '' }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb', site: 'pantareiresort.com' }
const UNIT = { per_person: 'per person', per_lesson: 'per class', per_hour: 'per hour', per_day: 'per day', per_week: 'per week', flat: '' }
export const money = (p) => `${Number(p.price).toLocaleString('en-US')} ${p.currency}`
export const unit = (p) => UNIT[p.unit] ?? ''

/* copy blocks by slot and order (the admin's order): several rows share a slot */
const blocks = c.copyBlocks ?? []
export const block = (slot, i = 0) => blocks.filter((b) => b.slot === slot)[i] ?? null

/* ---------- contact and booking ---------- */
export const NAME = c.businessName
const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
export const ENGINE = links[0] ?? null                       // "Check dates and book direct"
export const roomUrl = (label) => links.find((l) => l.label === label)?.url ?? ENGINE?.url ?? null
const WA_NUM = (c.contact?.whatsapp ?? '').replace(/^\+/, '')
export const WA = WA_NUM ? `https://wa.me/${WA_NUM}` : null
export const wa = (msg) => (WA ? `${WA}?text=${encodeURIComponent(msg)}` : null)
export const TEL = tel(c.contact?.phone)
export const PHONE = phoneText(c.contact?.phone)
export const MAIL = c.contact?.email ?? null
export const MAP = safeUrl(c.contact?.mapUrl)
export const ADDRESS = c.contact?.address ?? ''
export const SOCIAL = (c.socialLinks ?? []).filter((s) => safeUrl(s.url))

/* ---------- ratings and reviews ---------- */
export const RATINGS = (c.ratings ?? []).filter((r) => r.score != null && r.count).map((r) => ({
  ...r, name: PLATFORM[r.platform] ?? r.platform, day: dayMonYear(r.capturedAt), url: safeUrl(r.url),
}))
/* the shortest first: the page shows one or two at a time (4f round 1) */
export const REVIEWS = [...(c.testimonials ?? [])].sort((a, b) => a.quote.length - b.quote.length).map((q) => ({ ...q, src: PLATFORM[q.source] ?? '' }))

/* ---------- photographs ---------- */
export const shapeKey = shapeKeyOf
/* <img> from the build's crops (scripts/photos.mjs): every width of one shape in srcset, the widest as src */
export const img = (file, key, { alt = '', sizes = '100vw', lazy = true, cls = '', attrs = '' } = {}) => {
  const s = photosGen[file]?.shapes?.[key]?.sources
  if (!s?.length) return ''
  const big = s[s.length - 1]
  const lz = lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'
  return `<img${cls ? ` class="${cls}"` : ''} src="${big.webp}" srcset="${s.map((x) => `${x.webp} ${x.w}w`).join(', ')}" sizes="${sizes}" width="${big.w}" height="${big.h}" alt="${e(alt)}"${lz}${attrs}>`
}
/* a tiny crop (the 'lq' shapes) inlined as a data URI: painted at first paint, used as the clips' poster */
export const lq = (file, key) => {
  const x = photosGen[file]?.shapes?.[key]?.sources?.[0]
  if (!x) return null
  const f = join(process.cwd(), 'public', x.webp)
  return existsSync(f) ? 'data:image/webp;base64,' + readFileSync(f).toString('base64') : null
}
export const srcOf = (file, key, w) => { const s = photosGen[file]?.shapes?.[key]?.sources ?? []; return (s.find((x) => x.w === w) ?? s[s.length - 1])?.webp ?? '' }
export const srcset = (file, key) => (photosGen[file]?.shapes?.[key]?.sources ?? []).map((x) => `${x.webp} ${x.w}w`).join(', ')

/* ---------- video (schema v0.9 + scripts/video-site.mjs tiers) ---------- */
export const tiersOf = (m) => (m?.filename ? videosGen.videos?.[m.filename]?.tiers ?? null : null)
/* <source data-src> list, phone tier first by media query (attached after first paint by the page script) */
export const sources = (list) => list.filter(([s]) => s).map(([s, media]) => `<source data-src="${s.src}" type='${s.type}'${media ? ` media="${media}"` : ''}>`).join('')

/* ---------- the logo (SCHEMA GAP: gaps.logo), drawn as a CSS mask in the text colour; scripts/photos.mjs writes it
   at 192 px as photos/logo-192.png (the page's relative URL) ---------- */
export const LOGO = gaps.logo?.file && existsSync(join(process.cwd(), 'public', 'photos', 'logo-192.png')) ? 'photos/logo-192.png' : null

/* ---------- SEO plumbing (station 4h; copied from sites/coconut-surf-inn-guest-house-and-restaurant/final, itself
   from lotus-surf-house and cheeky-monkey) ----------
   Every value below is read from content.json (or the SCHEMA GAP file); nothing is written here as a fact. Absolute
   URLs (canonical, hreflang, og:url, og:image, JSON-LD @id / url / image, the sitemap) exist only when the build has
   SITE_URL (astro.config.mjs `site`; it must end in '/'). */
/* Preview or real domain? (Shahar's decision, 2026-09-22; the same rule as the other finals.) A build is a PREVIEW
   when it has no production domain of its own: no SITE_URL at all, or one on *.workers.dev (the demo's
   panta-rei-resort.os1.workers.dev) or localhost / 127.0.0.1. A preview carries
   <meta name="robots" content="noindex, nofollow">, a robots.txt that disallows everything and no sitemap. */
export const isPreviewUrl = (url) => {
  if (!url) return true
  let host
  try { host = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, '') } catch { return true }
  return host === 'workers.dev' || host.endsWith('.workers.dev')
    || host === 'localhost' || host.endsWith('.localhost')
    || host === '127.0.0.1' || host === '::1'
}
export const SITE = import.meta.env.SITE ? new URL(import.meta.env.SITE) : null
export const IS_PREVIEW = isPreviewUrl(SITE)
export const abs = (u) => (SITE ? new URL(u, SITE).href : null)

/* 4i: AI-crawler policy, read by src/pages/robots.txt.js. Default for a client site is allow (being quotable is the
   point); it is the owner's decision (aiseo-report.md) and flipping one bot to 'disallow' here is the whole change.
   On a PREVIEW build every one of them is refused anyway. Same list as the other finals. */
export const AI_CRAWLERS = {
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}
/* the built routes: one page */
export const ROUTES = ['']

/* contact.address → its parts: "Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka" */
const TOWN_RE = /^(?:(\d{4,6})\s+)?(.+?)(?:\s+(\d{4,6}))?$/
const addrParts = ADDRESS.split(/\s*(?:\n|,)\s*/).filter(Boolean)
export const TOWN = addrParts.length >= 3 ? TOWN_RE.exec(addrParts[addrParts.length - 2])?.[2] ?? '' : ''
export const COUNTRY_NAME = addrParts.length >= 3 ? addrParts[addrParts.length - 1] : ''
/* the <title>: businessName · the place the tagline names when it ends in the address's town ("in Kabalana,
   Ahangama"), else the town; then the address's country. ≤ 60, else the shorter forms. */
const PLACE = (() => {
  if (!TOWN) return ''
  const m = new RegExp(`\\bin ((?:[A-Z][\\w-]*\\s?)+,\\s*)?${TOWN}\\b`).exec(c.tagline ?? '')
  return m ? `${(m[1] ?? '').trim()} ${TOWN}`.trim() : TOWN
})()
export const TITLE = [
  [NAME, [PLACE, COUNTRY_NAME].filter(Boolean).join(', ')],
  [NAME, PLACE],
  [NAME, TOWN],
  [NAME],
].map((p) => p.filter(Boolean).join(' · ')).find((s) => s.length <= 60) ?? NAME

/* the meta description: owner-written fields only, joined as sentences, ≤ 155. A part that would overflow is
   skipped and the next one is tried. */
export const metaDescription = (parts, max = 155) => {
  let out = ''
  for (const p of parts.filter(Boolean).map((s) => s.trim().replace(/[.\s]+$/, '')).filter(Boolean)) {
    const next = out ? `${out} ${p}.` : `${p}.`
    if (next.length <= max) out = next
  }
  return out
}
/* a body's sentences, in order (split after . ! ? followed by a space or a paragraph break) */
export const sentences = (body) => (body ?? '').split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean)
const firstSentence = (s) => sentences(s)[0] ?? ''
/* the home description, also the JSON-LD description: what + where (tagline), then the first of these that still
   fits: the rooms block's first sentence (what every room has), the spot, the feature line */
const offerBlock = block('offer', 0)
export const HOME_DESCRIPTION = metaDescription([c.tagline, firstSentence(offerBlock?.body), c.spot, c.featureLine])

const COUNTRY = { 'sri lanka': 'LK' }
/* contact.address (free text) → PostalAddress, "street…, town [postcode], country" (playbook §6). Never adds a part. */
export const postalAddress = (text) => {
  const parts = (text ?? '').split(/\s*(?:\n|,)\s*/).map((s) => s.trim()).filter(Boolean)
  if (!parts.length) return null
  const a = { '@type': 'PostalAddress' }
  const iso = parts.length >= 3 ? COUNTRY[parts[parts.length - 1].toLowerCase()] : null
  const town = iso ? TOWN_RE.exec(parts[parts.length - 2]) : null
  if (town) {
    a.streetAddress = parts.slice(0, -2).join(', ')
    if (town[1] || town[3]) a.postalCode = town[1] || town[3]
    a.addressLocality = town[2]
    a.addressCountry = iso
  } else a.streetAddress = parts.join(', ')
  return a
}
/* geo from contact.mapUrl when it is a Google Maps place URL with its pin (!3d<lat>!4d<lng>); else none */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}
/* schema.org type from businessType. beach_lodging is a LodgingBusiness; it is the subtype Resort when the business
   calls itself one in its own name or tagline ("Panta Rei Resort", "A boutique resort…"). */
const SAYS_RESORT = /\bresort\b/i.test(`${c.businessName} ${c.tagline ?? ''}`)
export const LD_TYPE = {
  surf_camp: ['LodgingBusiness', 'SportsActivityLocation'], beach_lodging: SAYS_RESORT ? 'Resort' : 'LodgingBusiness',
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}
/* the widest crop the build made of a file (any shape), as {src, w, h} */
const widest = (file) => {
  const all = Object.values(photosGen[file]?.shapes ?? {}).flatMap((s) => s.sources ?? [])
  const top = all.sort((a, b) => b.w - a.w)[0]
  return top ? { src: top.webp, w: top.w, h: top.h } : null
}
/* the link-preview image: the first photos[] row the page shows that is landscape and at least 1200 px wide
   (photos[0], the aerial view of the ring of bungalows) */
export const ogImage = () => {
  for (const row of c.photos ?? []) {
    const m = row?.image, s = m?.filename ? widest(m.filename) : null
    if (s && s.w >= 1200 && s.w > s.h) return { src: s.src, width: s.w, height: s.h, alt: m.alt }
  }
  return null
}
/* every photograph the page serves as content (hero poster, photos[], rooms[].photo), widest crop each */
const pageImages = () => [...new Set([c.heroVideoPoster, ...(c.photos ?? []).map((p) => p?.image), ...(c.rooms ?? []).map((r) => r.photo)]
  .map((m) => (m?.filename ? widest(m.filename)?.src : null)).filter(Boolean))]
/* the room's size, read from the m² figure its rooms[].note prints; no figure, no floorSize */
export const floorSize = (note) => {
  const m = /(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*m²/.exec(note ?? '')
  if (!m) return null
  const q = { '@type': 'QuantitativeValue', unitCode: 'MTK' }
  return m[2] ? { ...q, minValue: +m[1], maxValue: +m[2] } : { ...q, value: +m[1] }
}
/* JSON-LD for the business: one block, every value from content.json (+ gaps.listings). No aggregateRating / review
   (Shahar's no-ratings-markup decision, applied to every site since KA). No priceRange: room rates are live inventory
   on the booking engine. makesOffer: the priceList[] rows the page prints (day pass, classes, massages). */
export const businessLd = ({ description } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const pin = pinFromMapUrl(k.mapUrl)
  const images = pageImages()
  /* the listings (ratings[].url), the owner's channels (socialLinks[]), then the SCHEMA GAP extras
     (gaps.listings: Tripadvisor), https only, each once */
  const same = [...new Set([...(c.ratings ?? []).map((r) => r.url), ...SOCIAL.map((s) => s.url), ...(G.listings?.sameAs ?? [])].map(safeUrl).filter(Boolean))]
  const roomsLd = (c.rooms ?? []).map((r) => {
    const m2 = floorSize(r.note)
    return {
      '@type': 'HotelRoom', name: r.label,
      ...(r.beds ? { bed: r.beds } : {}),
      ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
      ...(m2 ? { floorSize: m2 } : {}),
      ...(r.note ? { description: r.note } : {}),
    }
  })
  const offers = (c.priceList ?? []).filter((p) => p.label && Number.isFinite(Number(p.price))).map((p) => ({
    '@type': 'Offer', name: p.label, price: Number(p.price), priceCurrency: p.currency,
    ...(p.note ? { description: p.note } : {}),
  }))
  return {
    '@context': 'https://schema.org',
    '@type': LD_TYPE[c.businessType] ?? 'LocalBusiness',
    ...(SITE ? { '@id': `${SITE.href}#business`, url: SITE.href } : {}),
    name: c.businessName,
    ...(description ? { description } : {}),
    ...(SITE && images.length ? { image: images.map(abs) } : {}),
    ...(TEL ? { telephone: k.phone } : {}),
    ...(k.email ? { email: k.email } : {}),
    ...(postal ? { address: postal } : {}),
    ...(pin ? { geo: { '@type': 'GeoCoordinates', latitude: pin.lat, longitude: pin.lng } } : {}),
    ...(MAP ? { hasMap: MAP } : {}),
    ...(st.checkInFrom ? { checkinTime: st.checkInFrom } : {}),
    ...(st.checkOutTo ? { checkoutTime: st.checkOutTo } : {}),
    ...((c.amenities ?? []).length ? { amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })) } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    ...(roomsLd.length ? { containsPlace: roomsLd } : {}),
    ...(offers.length ? { makesOffer: offers } : {}),
    ...(same.length ? { sameAs: same } : {}),
  }
}
const st = c.stayInfo ?? {}
/* JSON in a <script>: '<' escaped so no value can close the element */
export const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

/* head tags after <title> and the description. Absolute URLs only with SITE_URL. */
export const seoHead = ({ path, title, description, image }) => {
  const url = abs(path)
  return [
    url ? `<link rel="canonical" href="${e(url)}">` : '',
    url ? `<link rel="alternate" hreflang="en" href="${e(url)}">` : '',
    url ? `<link rel="alternate" hreflang="x-default" href="${e(url)}">` : '',
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${e(c.businessName)}">`,
    `<meta property="og:title" content="${e(title)}">`,
    description ? `<meta property="og:description" content="${e(description)}">` : '',
    url ? `<meta property="og:url" content="${e(url)}">` : '',
    ...(SITE && image ? [
      `<meta property="og:image" content="${e(abs(image.src))}">`,
      '<meta property="og:image:type" content="image/webp">',
      `<meta property="og:image:width" content="${image.width}">`,
      `<meta property="og:image:height" content="${image.height}">`,
      image.alt ? `<meta property="og:image:alt" content="${e(image.alt)}">` : '',
    ] : []),
    `<meta name="twitter:card" content="${SITE && image ? 'summary_large_image' : 'summary'}">`,
  ].filter(Boolean).join('\n')
}
