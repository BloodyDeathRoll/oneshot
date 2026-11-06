/**
 * Content plumbing for the page. Everything schema-covered comes from src/tenant/content.json (Payload's REST shape,
 * schemas/site-content.md v0.11); SCHEMA GAP content from src/gaps/gaps.json; interface wording from
 * src/lib/labels.json. Nothing here holds a fact: it reads, formats and escapes.
 * Plumbing (escaping, phone format, glob of the generated manifests) follows
 * sites/coconut-surf-inn-guest-house-and-restaurant/final/src/lib/site.mjs.
 */
import { existsSync } from 'node:fs'
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
export const srcOf = (file, key, w) => { const s = photosGen[file]?.shapes?.[key]?.sources ?? []; return (s.find((x) => x.w === w) ?? s[s.length - 1])?.webp ?? '' }
export const srcset = (file, key) => (photosGen[file]?.shapes?.[key]?.sources ?? []).map((x) => `${x.webp} ${x.w}w`).join(', ')

/* ---------- video (schema v0.9 + scripts/video-site.mjs tiers) ---------- */
export const tiersOf = (m) => (m?.filename ? videosGen.videos?.[m.filename]?.tiers ?? null : null)
/* <source data-src> list, phone tier first by media query (attached after first paint by the page script) */
export const sources = (list) => list.filter(([s]) => s).map(([s, media]) => `<source data-src="${s.src}" type='${s.type}'${media ? ` media="${media}"` : ''}>`).join('')

/* ---------- the logo (SCHEMA GAP: gaps.logo), drawn as a CSS mask in the text colour; scripts/photos.mjs writes it
   at 192 px as photos/logo-192.png (the page's relative URL) ---------- */
export const LOGO = gaps.logo?.file && existsSync(join(process.cwd(), 'public', 'photos', 'logo-192.png')) ? 'photos/logo-192.png' : null
