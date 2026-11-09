// sites/the-sandhya/final/src/lib/seo.mjs — SEO plumbing (station 4h, seo 0.2.2). Template, not content:
// every value comes from src/tenant/content.json (schemas/site-content.md; Payload after a sale) and the
// photo renditions the build wrote. Same rules as this pipeline's other finals
// (sites/global-surf-adventures-v2/final/src/lib/site.mjs, sites/the-lavish-haven/final).
import content from '../tenant/content.json'
import photos from '../tenant/photos.generated.json'

const c = content.locales[content.locales.en?.languages?.[0] ?? 'en'] ?? content.locales.en

/* Preview or real domain? One place decides it (the preview rule, Shahar 2026-09-22). PREVIEW = no SITE_URL, or
   a SITE_URL on *.workers.dev / localhost. A preview is not indexed: the page carries
   <meta name="robots" content="noindex, nofollow">, robots.txt disallows everything, there is no sitemap, and
   no canonical or hreflang (a noindexed copy names no canonical home). With a workers.dev SITE_URL the preview
   still gets absolute og:url / og:image, so the pitch link shows a picture in WhatsApp. SITE_URL ends in '/'. */
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

/* 4i (aiseo 0.2.2): the AI-crawler policy, named bot by bot so it is a decision on record, not a default.
   Default for a client site is 'allow' (being quoted is the point), but it is THE OWNER'S CALL and has not
   been put to them (aiseo-report.md). Flipping one bot to 'disallow' here is the whole change. Only a real
   domain uses these values: a PREVIEW build refuses every one of them (robots.txt.js). Same list as this
   pipeline's other finals (KA, Layday, Lavish Haven, Global Surf v2). */
export const AI_CRAWLERS = {
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}
/* the site's routes, for the sitemap and the canonicals: one page */
export const ROUTES = ['']

const https = (u) => (typeof u === 'string' && /^https:\/\/[^\s"<>]+$/.test(u) ? u : null)
const stop = (t) => (t ? t.trim().replace(/[.\s]+$/, '') : '')
const paras = (b) => (b?.body ? b.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [])

/* <title> (≤ 60): "<name> | <tagline>" when it fits, else "<name>, <town>" with the town parsed from
   contact.address (KA's rule), else the name. The schema has no SEO title field (proposed: seo.title). */
export const pageTitle = (max = 60) => {
  const name = c.businessName
  const full = c.tagline ? `${name} | ${stop(c.tagline)}` : name
  if (full.length <= max) return full
  const town = postalAddress(c.contact?.address)?.addressLocality
  const short = town && !name.includes(town) ? `${name}, ${town}` : name
  return short.length <= max ? short : name
}

/* meta description (≤ 155): the booking card's own summary, in its order — tagline, spot, the Dining block's
   last paragraph (breakfast), the Rooms block's last paragraph (rates) — each whole sentence added only if
   the total still fits. Owner-written fields only; nothing is shortened mid-sentence. */
export const metaDescription = (max = 155) => {
  const offer = (c.copyBlocks ?? []).filter((b) => b.slot === 'offer')
  const parts = [c.tagline, c.spot, paras(offer[1]).at(-1), paras(offer[0]).at(-1)]
  let out = ''
  for (const p of parts.filter(Boolean).map(stop)) {
    if (/[.!?]\s/.test(p)) continue // more than one sentence: never cut, skip it
    const next = out ? `${out} ${p}.` : `${p}.`
    if (next.length <= max) out = next
  }
  return out || stop(c.tagline || c.businessName)
}

const COUNTRY = { 'sri lanka': 'LK' }
/* contact.address (free text) → PostalAddress. Splits "street…, town [postcode], country" (playbook §6 order)
   only when the last part is a country it knows; otherwise the whole address stays in streetAddress. */
export function postalAddress (text) {
  const parts = (text ?? '').split(/\s*(?:\n|,)\s*/).map((s) => s.trim()).filter(Boolean)
  if (!parts.length) return null
  const a = { '@type': 'PostalAddress' }
  const iso = parts.length >= 3 ? COUNTRY[parts[parts.length - 1].toLowerCase()] : null
  const town = iso ? /^(?:(\d{4,6})\s+)?(.+?)(?:\s+(\d{4,6}))?$/.exec(parts[parts.length - 2]) : null
  if (town) {
    a.streetAddress = parts.slice(0, -2).join(', ')
    if (town[1] || town[3]) a.postalCode = town[1] || town[3]
    a.addressLocality = town[2]
    a.addressCountry = iso
  } else a.streetAddress = parts.join(', ')
  return a
}

/* geo from contact.mapUrl: a Google Maps place URL carries the listing's own pin as !3d<lat>!4d<lng>. The schema
   has no geo field, so the pin rides on the owner-editable map link; a link without a pin gives no geo. */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}

/* businessType → schema.org type. beach_lodging → Hotel for this site: the business calls itself a hotel
   (tagline, dossier business.type "Luxury Beachfront Boutique Hotel"); the schema has no lodging sub-type
   field, so the sub-type is this template's choice (seo-report.md). */
export const LD_TYPE = {
  beach_lodging: 'Hotel', surf_camp: ['LodgingBusiness', 'SportsActivityLocation'],
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* a photo row's uncropped rendition (own ratio) where the build made one, else its first */
const shape = (m) => { const r = m && photos[m.filename]; return r ? (r.d ?? r.l ?? r.w ?? Object.values(r)[0]) : null }
export const heroImage = () => {
  const m = c.photos?.[0]?.image
  const r = shape(m)
  return r ? { ...r, alt: m.alt } : null
}

/* JSON-LD for the business: one block, every value from content.json. Left out on purpose (seo-report.md):
   aggregateRating / review (Shahar's no-ratings-markup decision, KA, applied to every site since; the Kayak
   score is not yet verified by a person), priceRange (the only price is the whole-house Exclusive Use rate per
   night; no room rate is published), openingHoursSpecification (openingHours[] is empty: a 24-hour desk is not
   opening hours). Absolute @id / url / image only with SITE_URL. */
export const businessLd = ({ description } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const pin = pinFromMapUrl(k.mapUrl)
  const map = https(k.mapUrl)
  const stay = c.stayInfo ?? {}
  const images = (c.photos ?? []).map((p) => shape(p.image)?.src).filter(Boolean)
  const same = [...(c.socialLinks ?? []).map((l) => https(l.url)), ...(c.ratings ?? []).map((r) => https(r.url))].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': LD_TYPE[c.businessType] ?? 'LocalBusiness',
    ...(SITE ? { '@id': `${SITE.href}#business`, url: SITE.href } : {}),
    name: c.businessName,
    ...(description ? { description } : {}),
    ...(SITE && images.length ? { image: [...new Set(images)].map(abs) } : {}),
    ...(/^\+[1-9]\d{6,14}$/.test(k.phone ?? '') ? { telephone: k.phone } : {}),
    ...(k.email ? { email: k.email } : {}),
    ...(postal ? { address: postal } : {}),
    ...(pin ? { geo: { '@type': 'GeoCoordinates', latitude: pin.lat, longitude: pin.lng } } : {}),
    ...(map ? { hasMap: map } : {}),
    ...(stay.checkInFrom ? { checkinTime: stay.checkInFrom } : {}),
    ...(stay.checkOutTo ? { checkoutTime: stay.checkOutTo } : {}),
    ...((c.amenities ?? []).length ? {
      amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })),
    } : {}),
    ...((c.openingHours ?? []).length ? {
      openingHoursSpecification: c.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => ({ mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' })[d]), opens: h.opens, closes: h.closes })),
    } : {}),
    /* 4i: the rooms[] rows as HotelRoom, the shape of KA and the Lavish Haven (seo-report.md left rooms as
       data to 4i). Mirrors the visible room list row for row: name ← label, bed ← beds, description ← note,
       occupancy ← sleeps. No rates: nightly prices are live engine inventory (schema rule, dossier gap
       offers.nightly_rates). No floor size parsed out of the note text. */
    ...((c.rooms ?? []).length ? {
      containsPlace: c.rooms.map((r) => ({
        '@type': 'HotelRoom', name: r.label,
        ...(r.beds ? { bed: r.beds } : {}),
        ...(r.note ? { description: r.note } : {}),
        ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
      })),
    } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    ...(same.length ? { sameAs: [...new Set(same)] } : {}),
  }
}

/* JSON for a <script type="application/ld+json">: '<' escaped so no value can close the script */
export const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c')
