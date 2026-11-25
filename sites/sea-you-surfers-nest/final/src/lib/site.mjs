/**
 * Content plumbing for the page. Everything schema-covered comes from src/tenant/content.json (Payload's REST
 * shape, schemas/site-content.md v0.11); SCHEMA GAP content from src/gaps/gaps.json; interface wording from
 * src/lib/labels.json. Nothing here holds a fact: it reads, formats and escapes.
 * Plumbing (escaping, slots, IS_PREVIEW) follows sites/lotus-surf-house/final/src/lib/site.mjs.
 */
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import { ICON } from './icons.mjs'
import { SLOTS, S } from './slots.mjs'

const glob1 = (g) => Object.values(g)[0] ?? null
const photosGen = glob1(import.meta.glob('../tenant/photos.generated.json', { eager: true, import: 'default' })) ?? {}

export const c = raw.locales.en
export const G = gaps
export const L = labels
export { S }

export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const t = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
const blocks = c.copyBlocks ?? []
/* copy blocks by slot and order (the admin's order): several rows share a slot */
export const block = (slot, i = 0) => blocks.filter((b) => b.slot === slot)[i] ?? null
export const safeUrl = (u) => { try { return new URL(u).protocol === 'https:' ? u : null } catch { return null } }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const monYear = (ym) => { const m = /^(\d{4})-(\d{2})/.exec(ym ?? ''); return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb' }
const HOSTS = [[/(^|\.)booking\.com$/, 'Booking.com'], [/(^|\.)agoda\.com$/, 'Agoda'], [/(^|\.)hostelworld\.com$/, 'Hostelworld'], [/(^|\.)airbnb\./, 'Airbnb']]
export const hostName = (u) => { try { const h = new URL(u).hostname; return (HOSTS.find(([re]) => re.test(h)) ?? [, h.replace(/^www\./, '')])[1] } catch { return '' } }

/* the mockup's inline stroke icons (24 grid, currentColor) */
export const svg = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`
export const SEP = '<span class="sep" aria-hidden="true">|</span>'
/* items already escaped → "<span>a</span> | <span>b</span>" (the mockup's pipe()) */
export const pipe = (items) => items.filter(Boolean).map((i) => `<span>${i}</span>`).join(` ${SEP} `)

/* ---------- names, contact, booking ---------- */
export const NAME = c.businessName
export const LINKS = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
export const PRIMARY = LINKS[0] ?? null
/* Call buttons only for a number the owner has confirmed: the seed's number is read off the sign photograph and
   unconfirmed (dossier gaps[0]), so it is not published. Set TEL_CONFIRMED when the owner confirms it (station 8). */
export const TEL_CONFIRMED = false
export const TEL = TEL_CONFIRMED && /^\+[1-9]\d{6,14}$/.test(c.contact?.phone ?? '') ? `tel:${c.contact.phone}` : null
export const MAP = safeUrl(c.contact?.mapUrl)
export const ADDRESS = c.contact?.address ?? ''
const TOWN_RE = /^(?:(\d{4,6})\s+)?(.+?)(?:\s+(\d{4,6}))?$/
/* "151 Weliwaththa Rd, Midigama 80650, Sri Lanka" → town "Midigama", "Midigama, Sri Lanka" */
const addrParts = ADDRESS.split(/\s*(?:\n|,)\s*/).filter(Boolean)
export const TOWN = addrParts.length >= 3 ? TOWN_RE.exec(addrParts[addrParts.length - 2])?.[2] ?? '' : ''
export const PLACE = TOWN ? `${TOWN}, ${addrParts[addrParts.length - 1]}` : ''

/* ---------- rooms ---------- */
export const ROOMS = c.rooms ?? []
export const shortRoom = (label) => String(label).replace(/\s+Room$/i, '')
const st = c.stayInfo ?? {}
const range = (a, b) => (a ? (b ? `${a}–${b}` : a) : b ?? '')
export const CHECKOUT = st.checkOutFrom || st.checkOutTo ? t(L.checkout, { t: range(st.checkOutFrom, st.checkOutTo) }) : ''
export const STAY_NOTE = st.note ?? ''
export const amenity = (label) => (c.amenities ?? []).find((a) => a.label === label) ?? null

/* ---------- ratings and reviews ---------- */
export const RATINGS = (c.ratings ?? []).filter((r) => r.score != null && r.count).map((r) => ({
  ...r, name: PLATFORM[r.platform] ?? r.platform, day: dayMonYear(r.capturedAt), url: safeUrl(r.url),
  /* the mockup's score(): 8 on a 10-point scale prints 8.0/10; 4.9 and 5 on a 5-point scale print 4.9/5 and 5.0/5 */
  shown: `${r.scale === '10' || Number(r.score) % 1 === 0 ? Number(r.score).toFixed(1) : String(r.score)}/${r.scale}`,
}))
export const REVIEWS = c.testimonials ?? []

/* ---------- photographs ---------- */
export const slotRow = (n) => { const m = (c.photos ?? [])[n]?.image; return m?.filename && SLOTS[n] ? m : null }
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')
/* slot n's shape i (default the first) → { alt, sources, top, mask } or null */
export const slot = (n, i = 0) => {
  const m = slotRow(n)
  const sh = SLOTS[n]?.shapes[i]
  if (!m || !sh) return null
  const g = photosGen[m.filename]?.shapes?.[shapeKey(sh[0], sh[2]?.tag)]
  return g ? { alt: m.alt, sources: g.sources, top: g.sources[g.sources.length - 1], mask: g.mask ?? null } : null
}
export const srcset = (s) => s.sources.map((x) => `${x.webp} ${x.w}w`).join(', ')
/* an <img> for slot n, '' when the slot is empty */
export const img = (n, { i = 0, cls = '', lazy = true, sizes = '', extra = '' } = {}) => {
  const s = slot(n, i)
  if (!s) return ''
  const set = s.sources.length > 1 ? ` srcset="${srcset(s)}" sizes="${sizes || '100vw'}"` : sizes ? ` sizes="${sizes}"` : ''
  return `<img${cls ? ` class="${cls}"` : ''} src="${s.top.webp}"${set} width="${s.top.w}" height="${s.top.h}" alt="${e(s.alt)}" draggable="false"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high" decoding="async"'}${extra}>`
}

/* ---------- SEO plumbing (station 4h; as sites/lotus-surf-house/final and sites/cheeky-monkey/final) ----------
   Every value below is read from content.json or gaps.json; nothing is written here as a fact. Absolute URLs
   (canonical, hreflang, og:url, og:image, JSON-LD @id / url / image, the sitemap) exist only when the build has
   SITE_URL (astro.config.mjs `site`; it must end in '/').
   Preview or real domain? (Shahar's decision, 2026-09-22; the same rule as the other finals.) A build is a PREVIEW
   when it has no production domain of its own: no SITE_URL at all, or one on *.workers.dev or localhost /
   127.0.0.1. A preview carries <meta name="robots" content="noindex, nofollow">, a robots.txt that disallows
   everything and no sitemap. */
export const isPreviewUrl = (url) => {
  if (!url) return true
  let host
  try { host = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, '') } catch { return true }
  return host === 'workers.dev' || host.endsWith('.workers.dev') || host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '::1'
}
export const SITE = import.meta.env.SITE ? new URL(import.meta.env.SITE) : null
export const IS_PREVIEW = isPreviewUrl(SITE)

/* AI-crawler policy, read by src/pages/robots.txt.js. Default for a client site is allow; the owner decides
   (4i). On a PREVIEW build every one of them is refused anyway. Same list as the other finals. */
export const AI_CRAWLERS = {
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}
export const abs = (u) => (SITE ? new URL(u, SITE).href : null)
export const ROUTES = ['']

/* the <title>: "<businessName>, <town>" (the other finals' rule), the name alone if that passes 60 characters */
export const pageTitle = () => {
  const full = TOWN ? `${NAME}, ${TOWN}` : NAME
  return full.length <= 60 ? full : NAME
}
/* the meta description: owner-written fields only, joined as sentences, cut at a sentence boundary to 155 */
export const metaDescription = (parts, max = 155) => {
  let out = ''
  for (const p of parts.filter(Boolean).map((s) => s.trim().replace(/[.\s]+$/, ''))) {
    const next = out ? `${out} ${p}.` : `${p}.`
    if (next.length > max) break
    out = next
  }
  return out
}

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
/* geo from contact.mapUrl when it is a Google Maps place URL with its pin (!3d<lat>!4d<lng>); else gaps.geo; else none */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}
export const LD_TYPE = {
  surf_camp: ['LodgingBusiness', 'SportsActivityLocation'], beach_lodging: 'LodgingBusiness',
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}
/* 4h: a lodging's schema.org sub-type, read from the type line the hero prints (gaps typeLine, Google's category).
   Only a line that names the sub-type maps; anything else keeps LD_TYPE's LodgingBusiness. */
const LODGING_SUBTYPE = [[/^bed\s*(?:and|&)\s*breakfast$/i, 'BedAndBreakfast'], [/^hostel$/i, 'Hostel']]
export const ldType = () => {
  const base = LD_TYPE[c.businessType] ?? 'LocalBusiness'
  const line = (G.typeLine?.value ?? '').trim()
  const sub = base === 'LodgingBusiness' ? LODGING_SUBTYPE.find(([re]) => re.test(line))?.[1] : null
  return sub ?? base
}
/* the link-preview image: the first photos[] slot the page shows that is landscape and at least 1200 px wide */
export const ogImage = () => {
  for (let n = 0; n < (c.photos ?? []).length; n++) {
    const s = slot(n)
    if (s && s.top.w >= 1200 && s.top.w > s.top.h) return { src: s.top.webp, width: s.top.w, height: s.top.h, alt: s.alt }
  }
  return null
}
const pageImages = () => [...new Set((c.photos ?? []).map((_, n) => slot(n)?.top.webp).filter(Boolean))]
/* 4i: the room's size, read from the m² figure its rooms[].note prints ("13 m², with its own bathroom…" → 13), as
   sites/lotus-surf-house/final. The page shows the same note, so this adds no fact; no figure in the note, no floorSize. */
export const floorSize = (note) => {
  const m = /(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*m²/.exec(note ?? '')
  if (!m) return null
  const q = { '@type': 'QuantitativeValue', unitCode: 'MTK' }
  return m[2] ? { ...q, minValue: +m[1], maxValue: +m[2] } : { ...q, value: +m[1] }
}
/* JSON-LD for the business: one block, every value from content.json or gaps.json. No aggregateRating / review
   (Shahar's no-ratings-markup decision, applied to every site). No priceRange: room rates are live OTA inventory.
   No telephone until TEL_CONFIRMED (the number is read off the sign photograph and unconfirmed). */
export const businessLd = ({ description } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const gp = G.geo
  const pin = pinFromMapUrl(k.mapUrl) ?? (gp && Math.abs(gp.lat) <= 90 && Math.abs(gp.lng) <= 180 ? { lat: gp.lat, lng: gp.lng } : null)
  const images = pageImages()
  /* the listings the business is on: the rated platforms and the booking links (both content fields) */
  const same = [...new Set([...(c.ratings ?? []).map((r) => safeUrl(r.url)), ...LINKS.map((l) => l.url)].filter(Boolean))]
  const rooms = G.houseCount?.rooms
  const roomsLd = ROOMS.map((r) => {
    const m2 = floorSize(r.note)
    return {
      '@type': 'HotelRoom', name: r.label,
      ...(r.beds ? { bed: r.beds } : {}),
      ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
      ...(m2 ? { floorSize: m2 } : {}),
    }
  })
  return {
    '@context': 'https://schema.org',
    '@type': ldType(),
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
    ...(Number.isInteger(rooms) && rooms > 0 ? { numberOfRooms: rooms } : {}),
    ...((c.amenities ?? []).length ? { amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })) } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    ...(roomsLd.length ? { containsPlace: roomsLd } : {}),
    ...(same.length ? { sameAs: same } : {}),
  }
}
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
