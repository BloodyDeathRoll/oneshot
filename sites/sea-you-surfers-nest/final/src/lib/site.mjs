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

/* ---------- head ---------- */
export const isPreviewUrl = (url) => {
  if (!url) return true
  let host
  try { host = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, '') } catch { return true }
  return host === 'workers.dev' || host.endsWith('.workers.dev') || host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '::1'
}
export const SITE = import.meta.env.SITE ? new URL(import.meta.env.SITE) : null
export const IS_PREVIEW = isPreviewUrl(SITE)
