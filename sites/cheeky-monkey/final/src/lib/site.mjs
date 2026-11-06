/**
 * Content plumbing for the page. Everything schema-covered comes from src/tenant/content.json (Payload's REST
 * shape, schemas/site-content.md v0.9/v0.10); SCHEMA GAP content from src/gaps/gaps.json; interface wording from
 * src/lib/labels.json. Nothing here holds a fact: it reads, formats and escapes.
 */
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import { SLOTS } from './slots.mjs'

const glob1 = (g) => Object.values(g)[0] ?? null
const photosGen = glob1(import.meta.glob('../tenant/photos.generated.json', { eager: true, import: 'default' })) ?? {}
const videosGen = glob1(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' }))

export const c = raw.locales.en
export const G = gaps
export const L = labels

export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const t = (s, vars = {}) => String(s).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '')
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
export const pHtml = (body) => paras(body).map((p) => `<p>${e(p)}</p>`).join('')
const blocks = c.copyBlocks ?? []
/* copy blocks by slot and order (the admin's order): several rows share a slot */
export const block = (slot, i = 0) => blocks.filter((b) => b.slot === slot)[i] ?? null
export const safeUrl = (u) => { try { return new URL(u).protocol === 'https:' ? u : null } catch { return null } }
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)
/* +94719248686 → +94 71 924 8686 (Sri Lankan mobile grouping); other numbers as stored */
export const phoneText = (e164) => { const m = /^\+94(\d{2})(\d{3})(\d{4})$/.exec(e164 ?? ''); return m ? `+94 ${m[1]} ${m[2]} ${m[3]}` : e164 ?? '' }
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const monYear = (ym) => { const m = /^(\d{4})-(\d{2})/.exec(ym ?? ''); return m ? `${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const money = (x, cur = 'USD') => `${cur} ${Math.round(x).toLocaleString('en-US')}`
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
export const Word = (n) => { const w = WORDS[n] ?? String(n); return w[0].toUpperCase() + w.slice(1) }
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb' }

/* ---------- names ---------- */
const wm = G.wordmark ?? {}
const wmOk = wm.mark && `${wm.mark}${wm.rest ? ' ' + wm.rest : ''}` === c.businessName
export const MARK = wmOk ? wm.mark : c.businessName       // the hand-lettered mark ("Cheeky Monkey")
export const MARK_REST = wmOk ? wm.rest ?? '' : ''         // "Surf Camp"
export const PLACE = G.place?.value ?? ''
export const MARK_SUB = [MARK_REST, PLACE].filter(Boolean).join(' | ')

/* ---------- booking paths (the dossier's own: Booking.com for rooms, phone / email / Instagram for the rest) ---------- */
const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
export const PRIMARY = links[0] ?? null                                  // "Check dates on Booking.com"
export const INSTA_LINK = links.find((l) => /^https:\/\/(www\.)?instagram\.com\//.test(l.url)) ?? null
export const TEL = tel(c.contact?.phone)
export const PHONE = phoneText(c.contact?.phone)
export const EMAIL = c.contact?.email ?? null
export const mailto = (subject) => (EMAIL ? `mailto:${EMAIL}${subject ? '?subject=' + encodeURIComponent(subject) : ''}` : null)
export const MAP = safeUrl(c.contact?.mapUrl)
export const SOC = { website: safeUrl(G.socials?.website), instagram: safeUrl(G.socials?.instagram) ?? INSTA_LINK?.url ?? null, facebook: safeUrl(G.socials?.facebook) }
export const IG_HANDLE = SOC.instagram ? '@' + new URL(SOC.instagram).pathname.replace(/\//g, '') : ''

/* ---------- the surf weeks: priceList rows grouped by package (SCHEMA GAP: no package module) ---------- */
const ROOM_KINDS = [['private room', 'Private room'], ['shared double room', 'shared double'], ['shared triple room', 'shared triple']]
const weekB = block('offer', 1)
const weekP = paras(weekB?.body)
export const WEEKS_BLOCK = weekB
export const WEEKS_LEDE = weekP.length > 4 ? weekP[weekP.length - 1] : ''
export const WEEKS = (G.weeks ?? []).map((w, k) => {
  const rows = (c.priceList ?? []).filter((r) => r.label.startsWith(w.group + ', '))
  const by = ROOM_KINDS.map(([suffix, word]) => { const r = rows.find((x) => x.label === `${w.group}, ${suffix}`); return r ? { word, price: r.price, currency: r.currency } : null })
  const prices = by.filter(Boolean).map((b) => b.price)
  const cur = rows[0]?.currency ?? 'USD'
  const note = rows[0]?.note ?? ''
  const per = note.split('.')[0].trim()
  return {
    ...w, by, currency: cur,
    min: prices.length ? Math.min(...prices) : null, max: prices.length ? Math.max(...prices) : null,
    range: prices.length ? (Math.min(...prices) === Math.max(...prices) ? money(prices[0], cur) : `${money(Math.min(...prices), cur)}–${Math.max(...prices).toLocaleString('en-US')}`) : '',
    rowsLine: by.filter(Boolean).map((b) => `${b.word} ${money(b.price, b.currency)}`).join(' | '),
    per: per ? per[0].toLowerCase() + per.slice(1) : L.weeks.per,
    year: (/(\d{4})/.exec(note) ?? [])[1] ?? '',
    line: weekP[k] ?? '',
  }
}).filter((w) => w.min != null)
export const WEEKS_FROM = WEEKS.length ? Math.min(...WEEKS.map((w) => w.min)) : null

/* ---------- lessons ---------- */
const LEVEL = { first_time: 'first-timer', beginner: 'beginner', intermediate: 'intermediate', advanced: 'advanced' }
const lessons = c.lessons ?? []
export const LESSON = lessons.find((l) => l.price != null) ?? null
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '')
const low = (s) => (s && !/^[A-Z]{2}/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)
export const LESSON_LEVELS = (LESSON?.level ?? []).map((l) => LEVEL[l] ?? l)
export const LESSON_OTHERS = lessons.filter((l) => l !== LESSON).map((l) => l.label + (l.groupSize ? ', ' + low(l.groupSize) : ''))
export const LESSON_YEAR = G.lessonPriceYear?.value ?? ''
export const UNIT = { per_person: 'per person', per_lesson: 'per lesson', per_hour: 'per hour', per_day: 'per day', per_week: 'per week', flat: '' }
export const lessonPrice = LESSON ? money(LESSON.price, LESSON.currency) : ''
export const lessonUnit = LESSON ? [UNIT[LESSON.unit], [LESSON.durationMin && `${LESSON.durationMin} min`, low(LESSON.label)].filter(Boolean).join(' ')].filter(Boolean).join(' | ') : ''
export const lessonLevelsLine = LESSON_LEVELS.map((l, i) => (i ? l : cap(l))).join(' | ')
export const lessonOthersLine = LESSON_OTHERS.join(' | ')
/* the drawer's lesson sentence: "For beginner, intermediate and advanced surfers. Also: private lesson | …" */
const andList = (xs) => (xs.length > 1 ? xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1] : xs[0] ?? '')
export const lessonDrawerLine = [LESSON_LEVELS.length ? `For ${andList(LESSON_LEVELS)} surfers.` : '', LESSON_OTHERS.length ? `Also: ${LESSON_OTHERS.map(low).join(' | ')}.` : ''].filter(Boolean).join(' ')

/* the airport transfers: the flat-priced rows */
export const TRANSFERS = (c.priceList ?? []).filter((r) => r.unit === 'flat')
export const transfersLine = TRANSFERS.length
  ? TRANSFERS.map((r) => `${r.label} ${money(r.price, r.currency)}`).join(' | ') + ((/(\d{4})/.exec(TRANSFERS[0].note ?? '') ?? [])[1] ? ` | published ${(/(\d{4})/.exec(TRANSFERS[0].note))[1]}` : '')
  : ''

/* ---------- stay ---------- */
const st = c.stayInfo ?? {}
const range = (a, b) => (a ? (b ? `${a}–${b}` : a) : '')
export const stayTimes = [st.checkInFrom && `Check-in ${range(st.checkInFrom, st.checkInTo)}`, st.checkOutFrom || st.checkOutTo ? `check-out ${range(st.checkOutFrom, st.checkOutTo)}` : ''].filter(Boolean).join(' | ')
export const amenLine = (c.amenities ?? []).map((a) => a.label + (a.note ? ` (${a.note})` : '')).join(' | ')
export const roomDet = (r) => [r.beds, r.sleeps ? `sleeps ${r.sleeps}` : '', r.note].filter(Boolean).join(' | ')
export const roomShort = (r) => r.label.replace(/ Room$/, '')
export const roomSize = (r) => (/^\d+ m²/.exec(r.note ?? '') ?? [])[0] ?? ''

/* ---------- reviews ---------- */
const ratingUrl = (p) => safeUrl((c.ratings ?? []).find((r) => r.platform === p)?.url)
export const quoteSource = (q) => {
  if (q.source === 'site') return SOC.website ? { name: new URL(SOC.website).host.replace(/^www\./, ''), url: SOC.website } : null
  const name = PLATFORM[q.source]
  return name ? { name, url: ratingUrl(q.source) } : null
}

/* ---------- photographs ---------- */
export const slotRow = (n) => { const m = (c.photos ?? [])[n]?.image; return m?.filename && SLOTS[n] ? m : null }
export const shapeOf = (filename, key) => photosGen[filename]?.shapes?.[key] ?? null
export const top = (shape) => shape.sources[shape.sources.length - 1]
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')
export const keyOf = (n, i = 0) => { const [ratio, , opts = {}] = SLOTS[n].shapes[i]; return shapeKey(ratio, opts.tag) }
/* an <img> for slot n (its i-th shape); '' when the slot is empty */
export const img = (n, { i = 0, cls = '', lazy = true, altText, decorative = false, extra = '' } = {}) => {
  const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n, i))
  if (!sh) return ''
  const s = top(sh)
  return `<img${cls ? ` class="${cls}"` : ''} src="${s.webp}" width="${s.w}" height="${s.h}"${lazy ? ' loading="lazy"' : ''} decoding="async" alt="${decorative ? '' : e(altText ?? m.alt)}"${extra}>`
}
export const slotSrc = (n, i = 0) => { const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n, i)); return sh ? top(sh) : null }
export const ROOM_KEY = 'r0.667'
/* a room's slides: rooms[].photo first, then its SCHEMA GAP slides */
export const roomSlides = (r) => {
  const out = []
  if (r.photo?.filename) { const sh = shapeOf(r.photo.filename, ROOM_KEY); if (sh) out.push({ ...top(sh), alt: r.photo.alt }) }
  for (const g of G.roomGalleries?.[r.label] ?? []) { const sh = shapeOf(g.file, ROOM_KEY); if (sh) out.push({ ...top(sh), alt: g.alt }) }
  return out
}

/* ---------- the reel (schema v0.8/0.9) ---------- */
export const hero = () => {
  const v = c.heroVideo, p = c.heroVideoPoster
  if (!v?.filename || !p?.filename) return null
  const gen = videosGen?.videos?.[v.filename]
  const p720 = shapeOf(p.filename, 'full'), p1080 = shapeOf(p.filename, 'full-d')
  if (!p720) return null
  const tiers = gen?.tiers ?? {}
  const pick = (tier) => [tier?.webm, tier?.mp4].filter(Boolean).map((s) => ({ src: s.src, type: s.type }))
  return {
    alt: p.alt,
    poster: top(p720), posterD: p1080 ? top(p1080) : top(p720),
    desk: pick(tiers.d1920),           // 1080 wide here (a 1080x1920 upload is never upscaled)
    phone: pick(tiers.m720).length ? pick(tiers.m720) : pick(tiers.m1280),
  }
}

/* the featureLine split around the board: "Come as a stranger," | "leave as a friend." */
export const splitLine = (s) => {
  s = (s ?? '').trim()
  const i = s.indexOf(', ')
  if (i > 0) return [s.slice(0, i + 1), s.slice(i + 2)]
  const w = s.split(' '), h = Math.ceil(w.length / 2)
  return [w.slice(0, h).join(' '), w.slice(h).join(' ')]
}
