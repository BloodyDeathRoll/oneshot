/**
 * Content plumbing for the page. Everything schema-covered comes from src/tenant/content.json (Payload's REST
 * shape, schemas/site-content.md v0.10); SCHEMA GAP content from src/gaps/gaps.json; interface wording from
 * src/lib/labels.json. Nothing here holds a fact: it reads, formats and escapes.
 * Plumbing (escaping, SEO head, IS_PREVIEW, JSON-LD shape) follows sites/cheeky-monkey/final/src/lib/site.mjs.
 */
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import { ICON } from './icons.mjs'
import { SLOTS, S } from './slots.mjs'

const glob1 = (g) => Object.values(g)[0] ?? null
const photosGen = glob1(import.meta.glob('../tenant/photos.generated.json', { eager: true, import: 'default' })) ?? {}
const videosGen = glob1(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' }))

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
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)
/* +94774647541 → +94 77 464 7541 (Sri Lankan mobile grouping); other numbers as stored */
export const phoneText = (e164) => { const m = /^\+94(\d{2})(\d{3})(\d{4})$/.exec(e164 ?? ''); return m ? `+94 ${m[1]} ${m[2]} ${m[3]}` : e164 ?? '' }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const monYear = (ym) => { const m = /^(\d{4})-(\d{2})/.exec(ym ?? ''); return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
export const word = (n) => WORDS[n] ?? String(n)
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb' }
const HOSTS = [[/(^|\.)booking\.com$/, 'Booking.com'], [/(^|\.)agoda\.com$/, 'Agoda'], [/(^|\.)hostelworld\.com$/, 'Hostelworld'], [/(^|\.)airbnb\./, 'Airbnb']]
export const hostName = (u) => { try { const h = new URL(u).hostname; return (HOSTS.find(([re]) => re.test(h)) ?? [, h.replace(/^www\./, '')])[1] } catch { return '' } }

/* the mockup's inline stroke icons (24 grid, currentColor) */
export const svg = (name, cls = 'ic', sw = '1.8') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`
const SEP = '<span class="sep" aria-hidden="true">|</span>'
/* items already escaped → "<span>a</span> | <span>b</span>" (spaces around the bar so the line can wrap) */
export const pipe = (items) => items.filter(Boolean).map((i) => `<span>${i}</span>`).join(` ${SEP} `)

/* ---------- names, contact, booking ---------- */
export const NAME = c.businessName
const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
export const PRIMARY = links[0] ?? null                       // "Check dates on Booking.com"
export const BOOK_HOST = PRIMARY ? hostName(PRIMARY.url) : ''
export const TEL = tel(c.contact?.phone)
export const PHONE = phoneText(c.contact?.phone)
export const MAP = safeUrl(c.contact?.mapUrl)
export const ADDRESS = c.contact?.address ?? ''
const TOWN_RE = /^(?:(\d{4,6})\s+)?(.+?)(?:\s+(\d{4,6}))?$/
/* the town of contact.address ("Indhana Rd, Midigama 80650, Sri Lanka" → "Midigama"), for the <title> */
export const TOWN = (() => { const p = ADDRESS.split(/\s*(?:\n|,)\s*/).filter(Boolean); return p.length >= 3 ? TOWN_RE.exec(p[p.length - 2])?.[2] ?? '' : '' })()

/* ---------- rooms: the featured (upstairs) room and the rest, the garden rooms ---------- */
const rooms = c.rooms ?? []
export const KING = rooms.find((r) => r.label === G.featuredRoom?.label) ?? null
export const GARDEN_ROOMS = rooms.filter((r) => r !== KING)
export const beds = (r) => [r.beds, r.sleeps ? t(L.sleeps, { n: r.sleeps }) : ''].filter(Boolean).join(', ')
const st = c.stayInfo ?? {}
const range = (a, b) => (a ? (b ? `${a}–${b}` : a) : b ?? '')
export const checkOut = st.checkOutFrom || st.checkOutTo ? t(L.checkout, { t: range(st.checkOutFrom, st.checkOutTo) }) : ''
export const STAY_NOTE = st.note ?? ''
export const AMENITIES = (c.amenities ?? []).map((a) => a.label + (a.note ? ` (${a.note})` : ''))

/* ---------- ratings and reviews ---------- */
export const RATINGS = (c.ratings ?? []).filter((r) => r.score != null && r.count).map((r) => ({
  ...r, name: PLATFORM[r.platform] ?? r.platform, day: dayMonYear(r.capturedAt), shown: Number(r.score).toFixed(1), url: safeUrl(r.url),
}))
export const REVIEWS = (c.testimonials ?? []).map((q) => ({
  ...q, text: q.quote.replace(/\s*\r?\n\s*/g, ' ').trim(), src: PLATFORM[q.source] ?? '', month: monYear(q.date),
}))
const bookingRating = RATINGS.find((r) => r.platform === 'booking' && r.url) ?? RATINGS.find((r) => r.url) ?? null
export const REVIEW_LINK = bookingRating ? { url: bookingRating.url, label: t(L.read_all, { n: bookingRating.count, p: bookingRating.name }) } : null
const andList = (xs) => (xs.length > 1 ? xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1] : xs[0] ?? '')
const latest = RATINGS.map((r) => r.capturedAt).filter(Boolean).sort().pop()
export const FINE = RATINGS.length ? t(L.fine, { p: andList([...new Set(RATINGS.map((r) => r.name))]), d: dayMonYear(latest) }) : ''

/* ---------- photographs ---------- */
export const slotRow = (n) => { const m = (c.photos ?? [])[n]?.image; return m?.filename && SLOTS[n] ? m : null }
export const shapeOf = (filename, key) => photosGen[filename]?.shapes?.[key] ?? null
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')
const keyOf = (n, i = 0) => { const [ratio, , opts = {}] = SLOTS[n].shapes[i]; return shapeKey(ratio, opts.tag) }
export const slot = (n) => { const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n)); return sh ? { alt: m.alt, sources: sh.sources, top: sh.sources[sh.sources.length - 1] } : null }
export const srcset = (s) => s.sources.map((x) => `${x.webp} ${x.w}w`).join(', ')
/* an <img> for slot n, '' when the slot is empty. srcset only when the slot has more than one width. */
export const img = (n, { cls = '', lazy = true, sizes = '', extra = '' } = {}) => {
  const s = slot(n)
  if (!s) return ''
  const set = s.sources.length > 1 ? ` srcset="${srcset(s)}" sizes="${sizes || '100vw'}"` : ''
  return `<img${cls ? ` class="${cls}"` : ''} src="${s.top.webp}"${set} width="${s.top.w}" height="${s.top.h}" alt="${e(s.alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}${extra}>`
}

/* ---------- hero video (schema v0.8/0.9; none today: the dossier has no usable clip) ---------- */
export const heroVideo = () => {
  const v = c.heroVideo, p = c.heroVideoPoster
  if (!v?.filename || !p?.filename) return null
  const gen = videosGen?.videos?.[v.filename]
  const ps = shapeOf(p.filename, 'full')
  if (!gen || !ps) return null
  const tiers = gen.tiers ?? {}
  const PHONE_Q = '(max-width: 899px)'
  const sources = [[tiers.m1280?.webm, PHONE_Q], [tiers.m1280?.mp4, PHONE_Q], [tiers.d1920?.webm], [tiers.d1920?.mp4]].filter(([s]) => s).map(([s, media]) => ({ src: s.src, type: s.type, media }))
  return { alt: p.alt, poster: { alt: p.alt, sources: ps.sources, top: ps.sources[ps.sources.length - 1] }, sources }
}

/* ---------- SEO plumbing (as sites/cheeky-monkey/final, station 4h) ----------
   Every value below is read from content.json; nothing is written here as a fact. Absolute URLs (canonical,
   hreflang, og:url, og:image, JSON-LD @id / url / image, the sitemap) exist only when the build has SITE_URL
   (astro.config.mjs `site`; it must end in '/'). */
/* Preview or real domain? (Shahar's decision, 2026-09-22; the same rule as the other finals.) A build is a
   PREVIEW when it has no production domain of its own: no SITE_URL at all, or one on *.workers.dev or
   localhost / 127.0.0.1. A preview carries <meta name="robots" content="noindex, nofollow">, a robots.txt that
   disallows everything and no sitemap. */
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

/* AI-crawler policy, read by src/pages/robots.txt.js. Default for a client site is allow; the owner decides.
   On a PREVIEW build every one of them is refused anyway. Same list as the other finals. */
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
/* geo from contact.mapUrl when it is a Google Maps place URL with its pin (!3d<lat>!4d<lng>); else none */
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
/* the link-preview image: the first photos[] slot the page shows that is landscape and at least 1200 px wide */
export const ogImage = () => {
  for (let n = 0; n < (c.photos ?? []).length; n++) {
    const s = slot(n)
    if (s && s.top.w >= 1200 && s.top.w > s.top.h) return { src: s.top.webp, width: s.top.w, height: s.top.h, alt: s.alt }
  }
  return null
}
const pageImages = () => [...new Set((c.photos ?? []).map((_, n) => slot(n)?.top.webp).filter(Boolean))]
/* JSON-LD for the business: one block, every value from content.json. No aggregateRating / review (Shahar's
   no-ratings-markup decision, applied to every site). No priceRange: room rates are live Booking.com inventory. */
export const businessLd = ({ description } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const pin = pinFromMapUrl(k.mapUrl)
  const images = pageImages()
  const same = [...new Set((c.ratings ?? []).map((r) => safeUrl(r.url)).filter(Boolean))]
  const roomsLd = rooms.map((r) => ({
    '@type': 'HotelRoom', name: r.label,
    ...(r.beds ? { bed: r.beds } : {}),
    ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
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
