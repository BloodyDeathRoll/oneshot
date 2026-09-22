/**
 * Template-owned settings and helpers. Nothing here is owner-editable content — except the three
 * values marked SCHEMA GAP, which are facts the design needs and schemas/site-content.md v0.3 has
 * no field for. They are listed in notes.md (gaps) and must move into the schema, not stay here.
 */
import raw from '../tenant/content.json'
import generated from '../tenant/photos.generated.json'

export const content = raw.locales.en

/* SCHEMA GAP (no geo coordinates in v0.3, only contact.mapUrl): the JSON-LD geo point, from the
   dossier's location.plus_code "X9J2+PR Ahangama" = 5.98181, 80.35206 (matches the scout's Google
   pin). `bbox` is the OpenStreetMap embed's window around that pin — about 950 m across, so the
   junction on Galle Road and the beach are both in frame. Restored for round 8: Shahar asked for
   the embed back (gate answer "Put the embed back", 2026-09-22), reversing the round-3 removal.
   The link the address carries stays "Open in Google Maps" and still points at contact.mapUrl. */
export const MAP_PIN = { lat: 5.98181, lon: 80.35206, bbox: '80.3455,5.9760,80.3540,5.9845' }

/* SCHEMA GAP (no SEO title / place field in v0.3): the place in the page title, from the
   dossier's location.address ("… Ahangama, Sri Lanka"). */
export const PLACE = 'Ahangama'

/* SCHEMA GAP (no photo-credit field): who took the photographs, from the dossier's asset
   index (Booking.com property uploads and the hostel's own Instagram). Must be revisited as soon
   as the owner uploads a photograph from anywhere else. */
export const photoCredit = (name) => `Photographs: ${name}'s own, from its Booking.com listing and Instagram.`

/* SEO plumbing (station 4h). Template-owned, not content: every value these emit is read from
   content.json at build time; only the vocabularies (schema.org type, ISO country code) live here. */

/* businessType → schema.org type. beach_lodging is refined to Hostel for this site: the business
   sells dorm beds and private rooms and Booking.com files it as "Hostel" (dossier business.type). */
export const LD_TYPE = {
  beach_lodging: 'Hostel', surf_camp: 'LodgingBusiness', surf_school: 'SportsActivityLocation',
  board_rental: 'SportsActivityLocation', surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* AI-crawler policy (station 4i), read by src/pages/robots.txt.js. Default for a client site is allow:
   being quotable by answer engines is the point. It is the owner's decision (aiseo-report.md): set a
   bot to 'disallow' to block it. Training crawlers and live/search fetchers are listed separately so
   the owner can, for example, keep search answers and refuse training. */
export const AI_CRAWLERS = {
  // OpenAI: training, search index, user-triggered fetch
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  // Anthropic
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  // Perplexity
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  // Google (Gemini / AI training control token), Apple (Apple Intelligence control token)
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  // Others
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}

/* Preview or real domain? (station 4h; Shahar's decision, 2026-09-22.) One place decides it, and every
   file that needs it imports IS_PREVIEW from here — never its own sniffing.
   A build is a PREVIEW when it has no production domain of its own: no SITE_URL at all, or a SITE_URL
   on *.workers.dev (the temporary Cloudflare preview we show the owner) or on localhost / 127.0.0.1.
   A preview must not be indexed: robots.txt disallows everything — the named AI crawlers included, so
   no crawler is told it may read the site — and the page carries <meta name="robots" content="noindex,
   nofollow">. Everything else stays as it is, so the preview's own links still resolve.
   On a real domain none of that is emitted: allow-all robots with the AI group, the Sitemap line,
   sitemap.xml, canonical, hreflang and og:* exactly as before. */
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

const COUNTRY = { 'sri lanka': 'LK' }
/* contact.address (free text) → PostalAddress. Splits "street…, <postcode> <town>, <country>" when the
   owner's text has that shape; otherwise the whole address stays in streetAddress. Never adds a part. */
export const postalAddress = (text) => {
  const parts = (text ?? '').split(/\s*(?:\n|,)\s*/).map((s) => s.trim()).filter(Boolean)
  if (!parts.length) return null
  const a = { '@type': 'PostalAddress' }
  const town = parts.length >= 3 ? /^(\d{4,6})\s+(.+)$/.exec(parts[parts.length - 2]) : null
  if (town) {
    const country = parts[parts.length - 1]
    a.streetAddress = parts.slice(0, -2).join(', ')
    a.postalCode = town[1]
    a.addressLocality = town[2]
    a.addressCountry = COUNTRY[country.toLowerCase()] ?? country
  } else a.streetAddress = parts.join(', ')
  return a
}

/* the meta description: owner-written fields only (tagline, the intro and offer headings), joined
   as sentences and cut at a word boundary to 155 characters. */
export const metaDescription = (parts, max = 155) => {
  let out = ''
  for (const p of parts.filter(Boolean).map((s) => s.trim().replace(/[.\s]+$/, ''))) {
    const next = out ? `${out} ${p}.` : `${p}.`
    if (next.length > max) break
    out = next
  }
  return out
}

/* interface wording and platform names/marks: design, not content */
export const PLATFORM = {
  hostelworld: { name: 'Hostelworld', host: 'hostelworld.com', mark: 'img/hostelworld.svg', mw: 32 },
  booking: { name: 'Booking.com', host: 'booking.com', mark: 'img/bookingdotcom.svg', mw: 32 },
  agoda: { name: 'Agoda', host: 'agoda.com', mark: 'img/agoda.svg', mw: 62 },
  google: { name: 'Google' }, tripadvisor: { name: 'Tripadvisor' }, airbnb: { name: 'Airbnb' }, other: { name: '' },
}
export const platformOfUrl = (url) => {
  try {
    const h = new URL(url).hostname
    return Object.keys(PLATFORM).find((k) => PLATFORM[k].host && (h === PLATFORM[k].host || h.endsWith('.' + PLATFORM[k].host))) ?? null
  } catch { return null }
}

/* Only ever put a checked https URL in an href (schema: templates re-check). */
export const safeUrl = (u) => {
  try { const x = new URL(u); return x.protocol === 'https:' ? u : null } catch { return null }
}
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)
export const phoneLabel = (e164) => {
  if (!e164) return ''
  const m = e164.match(/^\+94(\d{2})(\d{3})(\d{4})$/)
  return m ? `+94 ${m[1]} ${m[2]} ${m[3]}` : e164
}
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
export const score = (r) => `${r.score}/${r.scale}`

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const monthYear = (ym) => {
  const m = /^(\d{4})-(\d{2})$/.exec(ym ?? '')
  return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : ''
}
/* schema v0.4 ratings[].capturedAt → the day the score was read, spelled out (playbook §6: a rating
   is shown with its count, its source and its capture date). Payload dates may arrive as a full
   ISO timestamp; only the calendar day is shown. */
export const dayMonthYear = (d) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d ?? '')
  return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : ''
}
export const readOn = (r) => (dayMonthYear(r?.capturedAt) ? `read ${dayMonthYear(r.capturedAt)}` : '')

/* photos[] row → { alt, w, h, src, srcset (webp), srcsetJpg } from the build's manifest */
export const photo = (row) => {
  const m = row?.image
  if (!m || !generated[m.filename]) return null
  const g = generated[m.filename]
  const top = g.sources[g.sources.length - 1]
  return {
    alt: m.alt ?? '',
    w: top.w, h: top.h,
    src: top.jpg,
    webp: g.sources.map((s) => `${s.webp} ${s.w}w`).join(', '),
    jpg: g.sources.map((s) => `${s.jpg} ${s.w}w`).join(', '),
  }
}
