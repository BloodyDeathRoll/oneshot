/**
 * Template-owned settings and helpers. Nothing here is owner-editable content: every value the page
 * prints about the business comes from src/tenant/content.json (schemas/site-content.md v0.4).
 * What lives here is interface wording, platform names, number/date formatting and SEO plumbing.
 */
import raw from '../tenant/content.json'
import generated from '../tenant/photos.generated.json'

export const content = raw.locales.en

/* AI-crawler policy, read by src/pages/robots.txt.js (station 4i owns it; default allow, the owner
   decides). On a preview build every one of them is refused, see IS_PREVIEW. */
export const AI_CRAWLERS = {
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}

/* Preview or real domain? One place decides it (the rule KA's build set, Shahar 2026-09-22).
   PREVIEW = no SITE_URL, or a SITE_URL on *.workers.dev / localhost / 127.0.0.1. A preview must not
   be indexed: robots.txt disallows everything (named AI crawlers included), the page carries
   <meta name="robots" content="noindex, nofollow">, and there is no sitemap. */
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

/* SEO plumbing (station 4h). Template-owned, not content: every value these emit is read from
   content.json at build time; only the vocabularies (schema.org type, ISO country code) and the one
   SCHEMA GAP constant below live here. */

/* businessType → schema.org type. beach_lodging is refined to Hostel for this site: the business
   sells beds in one dormitory and Booking.com files it as "Hostel" (dossier business.type.note). */
export const LD_TYPE = {
  beach_lodging: 'Hostel', surf_camp: 'LodgingBusiness', surf_school: 'SportsActivityLocation',
  board_rental: 'SportsActivityLocation', surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* SCHEMA GAP (no contact.geo field in site-content.md; dossier location.lat_lng is a gap that points
   at candidates.json): the Google Maps pin the scout recorded, reports/2026-09-ahangama-02/
   candidates.json, evidence "pin 5.9784609,80.3526536" (Google Maps, 2026-09-19). It encodes to
   plus code 6MQ2X9H3+93 = the "X9H3+93" in Google's own address line, and Booking.com's pin
   (5.9784743,80.352641) falls in the same cell. The @5.9794134,80.350836 in contact.mapUrl is the
   search viewport's centre, not the pin, and is not used. */
export const MAP_PIN = { lat: 5.97846, lon: 80.35265 }

const COUNTRY = { 'sri lanka': 'LK' }
/* contact.address (free text) → PostalAddress. Splits "street…, [<postcode>] <town> [<postcode>],
   <country>" only when the last part is a country it knows; otherwise the whole address stays in
   streetAddress. Never adds a part. */
export const postalAddress = (text) => {
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

/* the meta description: owner-written fields only, joined as sentences and cut at a sentence
   boundary to 155 characters. */
export const metaDescription = (parts, max = 155) => {
  let out = ''
  for (const p of parts.filter(Boolean).map((s) => s.trim().replace(/[.\s]+$/, ''))) {
    const next = out ? `${out} ${p}.` : `${p}.`
    if (next.length > max) break
    out = next
  }
  return out
}

/* platform names: interface wording, not content */
export const PLATFORM = {
  hostelworld: { name: 'Hostelworld' }, booking: { name: 'Booking.com' }, agoda: { name: 'Agoda' },
  google: { name: 'Google' }, tripadvisor: { name: 'Tripadvisor' }, airbnb: { name: 'Airbnb' }, other: { name: '' },
}
export const pName = (p) => PLATFORM[p]?.name ?? ''

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
/* one paragraph → its sentences (the "Finding the door" steps are set one sentence per ruled line) */
export const sentences = (p) => (p ?? '').split(/(?<=[.!?])\s+(?=[A-Z0-9'“"])/).map((s) => s.trim()).filter(Boolean)

/* A score as its platform prints it: Google always with one decimal (5.0), the others as given
   (9.8, 10). The template prints score/scale and never rescales (schema). */
export const scoreText = (r) => (r.platform === 'google' ? Number(r.score).toFixed(1) : String(r.score))

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const monthYear = (ym) => {
  const m = /^(\d{4})-(\d{2})$/.exec(ym ?? '')
  return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : ''
}
/* ratings[].capturedAt → the day the score was read (playbook §6), spelled out. Same wording as the
   KA build ("read 19 September 2026"): the one interface word the mockup did not have. */
export const dayMonthYear = (d) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d ?? '')
  return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : ''
}
export const readOn = (r) => (dayMonthYear(r?.capturedAt) ? `read ${dayMonthYear(r.capturedAt)}` : '')

/* photos[] row → { alt, w, h, src, webp srcset, jpg srcset } from the build's manifest */
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
