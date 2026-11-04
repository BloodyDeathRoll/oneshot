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
/* every width of slot n's i-th shape, for a srcset */
export const slotSet = (n, i = 0) => { const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n, i)); return sh ? sh.sources : [] }
export const slotSrc = (n, i = 0) => { const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n, i)); return sh ? top(sh) : null }
export const ROOM_KEY = 'r0.667'
/* a room's slides: rooms[].photo first, then its SCHEMA GAP slides */
export const roomSlides = (r) => {
  const out = []
  if (r.photo?.filename) { const sh = shapeOf(r.photo.filename, ROOM_KEY); if (sh) out.push({ ...top(sh), alt: r.photo.alt }) }
  for (const g of G.roomGalleries?.[r.label] ?? []) { const sh = shapeOf(g.file, ROOM_KEY); if (sh) out.push({ ...top(sh), alt: g.alt }) }
  return out
}

/* ---------- the hero video (schema v0.8/0.9, the snippet's pattern) ----------
   Round 2: heroVideo is the drone cut. Sources: the phone tier first by media query, WebM before MP4 in each tier
   (schemas/site-content.md "How a template uses the hero video"); the poster is the LCP image. */
export const PHONE_MQ = '(max-width: 860px)'
const srcOf = (s) => s && { src: s.src, type: s.type }
export const hero = () => {
  const v = c.heroVideo, p = c.heroVideoPoster
  if (!p?.filename) return null
  const full = shapeOf(p.filename, 'full'), port = shapeOf(p.filename, shapeKey(16 / 9, 'm'))
  if (!full) return null
  const gen = v?.filename && videosGen?.videos?.[v.filename]
  const t = gen?.tiers ?? {}
  const sources = [[srcOf(t.m1280?.webm), PHONE_MQ], [srcOf(t.m1280?.mp4), PHONE_MQ], [srcOf(t.d1920?.webm)], [srcOf(t.d1920?.mp4)]]
    .filter(([s]) => s).map(([s, media]) => ({ ...s, media }))
  return { alt: p.alt, land: full.sources, port: port ? top(port) : null, sources, first: full.sources[0] }
}
/* videos[0]: the shop reel in the intro's board window. Shown at most ~360 CSS px wide, so the m720 tier
   (720 wide) is sharp at 2x and the reel is never blown up (round 1's macroblocked zoom is gone) */
export const reel = () => {
  const row = (c.videos ?? [])[0]
  if (!row?.video?.filename || !row?.poster?.filename) return null
  const gen = videosGen?.videos?.[row.video.filename], ps = shapeOf(row.poster.filename, 'full')
  if (!ps) return null
  const t = gen?.tiers ?? {}
  const src = [srcOf(t.m720?.mp4), srcOf(t.m1280?.webm), srcOf(t.m1280?.mp4)].filter(Boolean)
  return { label: row.description ?? row.video.alt, poster: top(ps), sources: src }
}
/* the hero footage's credit (SCHEMA GAP: media has no credit field) */
export const HERO_CREDIT = G.heroCredit ?? null

/* the featureLine split around the board: "Come as a stranger," | "leave as a friend." */
export const splitLine = (s) => {
  s = (s ?? '').trim()
  const i = s.indexOf(', ')
  if (i > 0) return [s.slice(0, i + 1), s.slice(i + 2)]
  const w = s.split(' '), h = Math.ceil(w.length / 2)
  return [w.slice(0, h).join(' '), w.slice(h).join(' ')]
}

/* ---------- SEO plumbing (station 4h) ----------
   Every value below is read from content.json (and, where the schema has no field, the SCHEMA GAP file the page
   already shows); nothing is written here as a fact. Absolute URLs (canonical, hreflang, og:url, og:image,
   JSON-LD @id / url / image, the sitemap) exist only when the build has SITE_URL (astro.config.mjs `site`; it
   must end in '/'). */
/* Preview or real domain? (Shahar's decision, 2026-09-22; the same rule as the other finals.) One place decides
   it, and every file that needs it imports IS_PREVIEW from here. A build is a PREVIEW when it has no production
   domain of its own: no SITE_URL at all, or one on *.workers.dev or localhost / 127.0.0.1. A preview carries
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

/* AI-crawler policy (station 4i), read by src/pages/robots.txt.js. Default for a client site is allow: being quotable
   by answer engines is the point. It is the owner's decision (aiseo-report.md): set a bot to 'disallow' to block it.
   Training crawlers and live/search fetchers are listed separately so the owner can, for example, keep search answers
   and refuse training. On a PREVIEW build every one of them is refused anyway (robots.txt.js). Same list as the other
   finals (sites/ka-surf-hostel-and-restaurant/final). */
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
export const abs = (u) => (SITE ? new URL(u, SITE).href : null)
/* the one route (the plan drawer is the in-page #book section, not a page), for the sitemap and the canonical */
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
/* contact.address (free text) → PostalAddress. Splits "street…, town [postcode], country" (playbook §6 order) only
   when the last part is a country it knows; otherwise the whole address stays in streetAddress. Never adds a part. */
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

/* geo from contact.mapUrl: a Google Maps *place* URL carries the listing's own pin as !3d<lat>!4d<lng> (the @lat,lng
   part is only the viewport). The schema has no geo field, so the pin rides on the owner-editable map link: change
   the link and the pin follows; a link without a pin gives no geo. */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}

/* businessType → schema.org type. A surf camp sells the bed and the lessons, so it is typed as both (schema.org allows
   a multi-typed entity): LodgingBusiness carries checkinTime / checkoutTime / amenityFeature, SportsActivityLocation
   is seo base.md's type for a school or camp. Same table as the pipeline's other finals. */
export const LD_TYPE = {
  surf_camp: ['LodgingBusiness', 'SportsActivityLocation'], beach_lodging: 'LodgingBusiness',
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* the published price span, as the page prints its rows: every priced priceList[] and lessons[] row in one currency
   ("USD 20–400"), with the year the page dates them by when every row carries the same one */
const priceRange = () => {
  const rows = [...(c.priceList ?? []), ...lessons].filter((r) => typeof r.price === 'number' && r.currency)
  const curs = [...new Set(rows.map((r) => r.currency))]
  if (!rows.length || curs.length !== 1) return null
  const ps = rows.map((r) => r.price), lo = Math.min(...ps), hi = Math.max(...ps)
  const years = [...new Set([...(c.priceList ?? []).map((r) => (/(\d{4})/.exec(r.note ?? '') ?? [])[1] ?? ''), ...(LESSON ? [LESSON_YEAR] : [])])]
  const span = lo === hi ? money(lo, curs[0]) : `${money(lo, curs[0])}–${hi.toLocaleString('en-US')}`
  return years.length === 1 && years[0] ? `${span} (prices published ${years[0]})` : span
}

/* the link-preview image: the first photos[] row the page shows in a landscape shape at least 1200 px wide
   (a WhatsApp / Instagram preview is ~1.91:1; the hero poster is a 9:16 portrait and would be cropped to a sliver) */
export const ogImage = () => {
  for (let n = 0; n < (c.photos ?? []).length; n++) {
    const m = slotRow(n), sh = m && shapeOf(m.filename, keyOf(n))
    const s = sh && top(sh)
    if (s && s.w >= 1200 && s.w > s.h) return { src: s.webp, width: s.w, height: s.h, alt: m.alt }
  }
  return null
}
/* the photographs the page serves (photos[] in the owner's order), for JSON-LD `image`. Round 2: the hero poster
   is a frame of third-party footage (vid-001, licence to be confirmed), so it is not offered as the business's image */
export const pageImages = () => {
  const out = []
  ;(c.photos ?? []).forEach((_, n) => { const s = slotSrc(n); if (s) out.push(s.webp) })
  return [...new Set(out)]
}

/* JSON-LD for the business: one block, every value from content.json, plus the SCHEMA GAP socials the footer links
   (gaps.socials). No aggregateRating / review: Shahar's no-ratings-markup decision (KA), applied to every site since. */
const roomsLd = () => (c.rooms ?? []).map((r) => {
  const m2 = /^(\d+(?:\.\d+)?) m²/.exec(r.note ?? '')
  return {
    '@type': 'HotelRoom',
    name: r.label,
    ...(r.beds ? { bed: r.beds } : {}),
    ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
    ...(m2 ? { floorSize: { '@type': 'QuantitativeValue', value: +m2[1], unitCode: 'MTK' } } : {}),
  }
})
const DAY = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' }
export const businessLd = ({ description } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const pin = pinFromMapUrl(k.mapUrl)
  const pr = priceRange()
  const images = pageImages()
  const same = [SOC.website, SOC.instagram, SOC.facebook, ...(c.ratings ?? []).map((r) => safeUrl(r.url))].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': LD_TYPE[c.businessType] ?? 'LocalBusiness',
    ...(SITE ? { '@id': `${SITE.href}#business`, url: SITE.href } : {}),
    name: c.businessName,
    ...(description ? { description } : {}),
    ...(SITE && images.length ? { image: images.map(abs) } : {}),
    ...(TEL ? { telephone: k.phone } : {}),
    ...(EMAIL ? { email: EMAIL } : {}),
    ...(postal ? { address: postal } : {}),
    ...(pin ? { geo: { '@type': 'GeoCoordinates', latitude: pin.lat, longitude: pin.lng } } : {}),
    ...(MAP ? { hasMap: MAP } : {}),
    ...(pr ? { priceRange: pr } : {}),
    ...(st.checkInFrom ? { checkinTime: st.checkInFrom } : {}),
    ...(st.checkOutTo ? { checkoutTime: st.checkOutTo } : {}),
    ...((c.amenities ?? []).length ? {
      amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })),
    } : {}),
    ...((c.openingHours ?? []).length ? {
      openingHoursSpecification: c.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => DAY[d]), opens: h.opens, closes: h.closes })),
    } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    /* 4i: the rooms the page lists, as HotelRoom (rooms[] only: label, beds, sleeps, and the floor size the row's note
       begins with). No price: room rates are live Booking.com inventory, not content. */
    ...(roomsLd().length ? { containsPlace: roomsLd() } : {}),
    ...(same.length ? { sameAs: [...new Set(same)] } : {}),
  }
}
/* JSON in a <script>: '<' escaped so no value can close the element */
export const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

/* head tags after <title> and the description. Absolute URLs only with SITE_URL: a relative og:image or canonical
   is not read by link previews and is ambiguous across the preview and the real domain. */
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
      `<meta property="og:image:type" content="image/webp">`,
      `<meta property="og:image:width" content="${image.width}">`,
      `<meta property="og:image:height" content="${image.height}">`,
      image.alt ? `<meta property="og:image:alt" content="${e(image.alt)}">` : '',
    ] : []),
    `<meta name="twitter:card" content="${SITE && image ? 'summary_large_image' : 'summary'}">`,
  ].filter(Boolean).join('\n')
}
