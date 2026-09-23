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
