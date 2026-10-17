/**
 * Content plumbing for the two pages. Everything schema-covered comes from src/tenant/content.json (Payload's
 * REST shape, schemas/site-content.md v0.9); SCHEMA GAP content from src/gaps/gaps.json; interface wording
 * from src/lib/labels.json. Markup that both pages share (sprite, header, footer, booking form) is here as
 * strings, escaped with e().
 */
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import icons from './icons.svg.txt?raw'
import { SLOTS, S, INSTAGRAM } from './slots.mjs'

const glob1 = (g) => Object.values(g)[0] ?? null
const photosGen = glob1(import.meta.glob('../tenant/photos.generated.json', { eager: true, import: 'default' })) ?? {}
const videosGen = glob1(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' }))
const portraitGen = glob1(import.meta.glob('../tenant/videos.portrait.json', { eager: true, import: 'default' }))

export const c = raw.locales.en
export const G = gaps
export const CT = labels.ctas
export const ST = labels.titles
export const B = labels.booking
export { S, INSTAGRAM }

export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
export const sentences = (p) => (p ?? '').split(/(?<=[.!?])\s+(?=[A-Z0-9'“"])/).map((s) => s.trim()).filter(Boolean)
const blocks = c.copyBlocks ?? []
export const block = (slot, i = 0) => blocks.filter((b) => b.slot === slot)[i] ?? null
export const safeUrl = (u) => { try { return new URL(u).protocol === 'https:' ? u : null } catch { return null } }
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const money = (x, cur = 'USD') => (cur === 'USD' ? '$' : cur + ' ') + Math.round(x).toLocaleString('en-US')
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb' }
export const sourceOf = (t) => PLATFORM[t.source] ?? G.otherSources?.[t.author] ?? ''

/* booking paths: WhatsApp from contact.whatsapp, else the owner's "Ask on WhatsApp" booking link */
const links = (c.bookingLinks ?? []).filter((l) => safeUrl(l.url))
export const linkByLabel = (label) => links.find((l) => l.label === label)?.url ?? null
const waLink = c.contact?.whatsapp ? `https://wa.me/${c.contact.whatsapp.replace(/\D/g, '')}` : links.find((l) => /^https:\/\/wa\.me\//.test(l.url))?.url ?? null
export const WA = waLink
export const waWith = (text) => (WA ? WA.split('?')[0] + '?text=' + encodeURIComponent(text) : null)
export const WA_GENERAL = links.find((l) => /^https:\/\/wa\.me\//.test(l.url))?.url ?? (WA ? waWith(`Hi ${c.businessName}, I have a question about the surf packages.`) : null)
export const ENGINE = G.engine.product

/* the three packages: lessons[0..2] with the design's one-liners and engine slugs */
const lessons = c.lessons ?? []
export const LEVELS = G.levels.map((g, k) => {
  const l = lessons.find((x) => x.label === g.lesson) ?? lessons[k] ?? {}
  return { name: l.label ?? g.lesson, one: g.oneLiner, slug: g.slug, price: l.price ?? null, currency: l.currency ?? 'USD', n: k + 1 }
})
const priced = LEVELS.filter((l) => l.price != null)
export const BASE = priced.length ? Math.min(...priced.map((l) => l.price)) : null
export const levelPrice = BASE != null ? `From ${money(BASE)} pp | 7 nights` : '' // template wording around the content price
const freeLesson = lessons.find((x) => x.label === G.freestylers.lesson)
const lc = (s) => (s ? s[0].toLowerCase() + s.slice(1) : '')
export const FREE = { name: freeLesson?.label ?? G.freestylers.lesson, detail: freeLesson?.includes ? lc(freeLesson.includes) : '', one: G.freestylers.oneLiner, wa: waWith(G.freestylers.whatsappText) }
export const ROOMS = G.rooms
export const roomTab = (r) => r.label.split(' – ')[0].split(' ').map((w, i) => (i > 0 && /^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w)).join(' ')

/* inclusions: Level 1's list; a line that differs for Level 3 carries Level 3's wording under it */
export const INCL = (G.inclusions[1] ?? []).map((it, i) => {
  const l3 = (G.inclusions[3] ?? [])[i]
  return { icon: it.icon, text: it.text, l3: l3 && l3.text !== it.text ? l3.text : null }
})

/* ---------- photographs ---------- */
export const slotRow = (n) => { const m = (c.photos ?? [])[n]?.image; return m?.filename ? m : null }
export const shapeOf = (filename, key) => photosGen[filename]?.shapes?.[key] ?? null
/* a photo's uncropped shape when it has one, else the first shape the page uses (JSON-LD image) */
export const anyShape = (filename) => { const s = photosGen[filename]?.shapes; return s ? s[FULL] ?? Object.values(s)[0] ?? null : null }
export const srcset = (shape, pre = '') => shape.sources.map((s) => `${pre}${s.webp} ${s.w}w`).join(', ')
export const top = (shape) => shape.sources[shape.sources.length - 1]
export const R45 = 'r1.25', R32 = 'r0.667', R1610 = 'r0.625', SQ = 'r1', R219 = 'r0.429', FULL = 'full'
/* an <img> for slot n in shape key; '' when the slot is empty */
export const img = (n, key, sizes, pre, { lazy = true, cls = '', altText, extra = '' } = {}) => {
  const m = slotRow(n), sh = m && shapeOf(m.filename, key)
  if (!sh) return ''
  const t = top(sh)
  return `<img${cls ? ` class="${cls}"` : ''} src="${pre}${t.webp}" srcset="${srcset(sh, pre)}" sizes="${sizes}" width="${t.w}" height="${t.h}" alt="${e(altText ?? m.alt)}"${lazy ? ' loading="lazy"' : ''}${extra}>`
}
export const gapImg = (file, alt, key, sizes, pre, { lazy = true } = {}) => {
  const sh = shapeOf(file, key)
  if (!sh) return ''
  const t = top(sh)
  return `<img src="${pre}${t.webp}" srcset="${srcset(sh, pre)}" sizes="${sizes}" width="${t.w}" height="${t.h}" alt="${e(alt)}"${lazy ? ' loading="lazy"' : ''}>`
}

/* ---------- video ---------- */
export const hero = () => {
  const v = c.heroVideo, p = c.heroVideoPoster
  if (!v?.filename || !p?.filename) return null
  const gen = videosGen?.videos?.[v.filename], port = portraitGen?.video?.[v.filename], pport = portraitGen?.poster?.[p.filename]
  const poster = shapeOf(p.filename, FULL)
  if (!gen || !poster) return null
  const d = gen.tiers.d1920
  return {
    alt: p.alt, poster, phonePoster: pport ?? null,
    phone: port ? [port.webm, port.mp4].filter(Boolean) : [gen.tiers.m1280?.webm, gen.tiers.m1280?.mp4].filter(Boolean),
    desk: [d?.webm, d?.mp4].filter(Boolean),
    jpg: poster.sources.find((s) => s.jpg)?.jpg ?? null,
  }
}
/* videos[n]: the level clip n (card and drawer band) */
export const clip = (n) => {
  const row = (c.videos ?? [])[n]
  if (!row?.video?.filename) return null
  const gen = videosGen?.videos?.[row.video.filename]
  const ps = row.poster?.filename && shapeOf(row.poster.filename, FULL)
  const thumb = row.poster?.filename && shapeOf(row.poster.filename, 'full-thumb')
  if (!gen || !ps) return null
  const t = gen.tiers
  const big = t.m1280 ?? t.d1920
  return {
    label: row.description,
    webm: (big?.webm ?? t.d1920?.webm)?.src, mp4: (t.m720?.mp4 ?? big?.mp4)?.src,
    bandMp4: big?.mp4?.src,
    poster: ps, thumb: thumb ? top(thumb).webp : top(ps).webp,
  }
}

/* ---------- shared markup ---------- */
export const ic = (n, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`
export const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><symbol id="logo" viewBox="${G.logo.viewBox}">${G.logo.paths}</symbol>${icons}</defs></svg>`
const [, , vw, vh] = G.logo.viewBox.split(' ')
const logoSvg = `<svg viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${e(G.logo.alt)}"><use href="#logo"/></svg>`
export const logoLink = (href) => `<a class="logo" href="${href}" aria-label="${e(G.logo.homeLinkLabel)}">${logoSvg}</a>`

/* section anchors: home's own (#…), or home's from book/ (../#…) */
const NAV = [['levels', 'Surf weeks'], ['lodge', ST.lodge], ['rooms', 'Rooms'], ['waves', ST.waves]] // TEMPLATE-LABEL [mockup nav]
export const header = (pre, home) => {
  const at = (id) => (home ? `#${id}` : `${pre}#${id}`)
  const homeHref = home ? '#top' : `${pre}./`
  return `<header class="hdr${home ? '' : ' solid page-hdr'}" id="hdr"><div class="wrap">${logoLink(homeHref)}
<nav class="nav" aria-label="Main">${NAV.map(([id, l]) => `<a href="${at(id)}">${e(l)}</a>`).join('')}<a class="btn" href="${pre}book/" data-book>${e(CT.header_and_bar)}</a></nav>
<button class="menu-b" type="button" id="menub" aria-controls="sheet" aria-expanded="false">${ic('menu')}Menu</button></div></header>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu"><div class="sheet-top">${logoLink(homeHref)}<button class="x2" type="button" aria-label="Close menu" data-sclose>${ic('x')}</button></div>
<nav aria-label="Menu">${NAV.map(([id, l]) => `<a href="${at(id)}">${e(l)}</a>`).join('')}</nav>
<div class="acts2"><a class="btn" href="${pre}book/" data-book>${e(CT.hero_c1)}</a>${WA_GENERAL ? `<a class="btn light" href="${e(WA_GENERAL)}" target="_blank" rel="noopener">${ic('wa', 'wa')}${e(CT.whatsapp_footer)}</a>` : ''}</div></div>`
}

const stay = c.stayInfo ?? {}
export const stayLine = stay.checkInFrom ? `Check-in ${stay.checkInFrom}${stay.checkInTo ? '–' + stay.checkInTo : ''}${stay.checkOutTo ? ` | check-out by ${stay.checkOutTo}` : ''}` : ''
export const footer = (pre) => {
  const so = G.socials ?? {}
  const soc = [['instagram', 'ig', 'Instagram'], ['youtube', 'yt', 'YouTube'], ['facebook', 'fb', 'Facebook']]
    .filter(([k]) => safeUrl(so[k])).map(([k, i, l]) => `<a href="${e(so[k])}" target="_blank" rel="noopener" aria-label="${l}">${ic(i)}</a>`).join('')
  const here = block('info', 0)
  const phone = tel(c.contact?.phone), map = safeUrl(c.contact?.mapUrl)
  return `<footer class="ft" aria-labelledby="ft-t"><div class="wrap"><div class="ft-top">
<div>${logoLink(`${pre}./`)}<p style="margin-top:18px">${e(c.businessName)}</p><div class="social">${soc}</div></div>
<div><h2 id="ft-t">Talk to us</h2><div class="stack">
${WA_GENERAL ? `<a class="btn light" href="${e(WA_GENERAL)}" target="_blank" rel="noopener">${ic('wa', 'wa')}${e(CT.whatsapp_footer)}</a>` : ''}
${phone ? `<a class="btn light" href="${phone}">${ic('phone')}${e(CT.call)}</a>` : ''}
${c.contact?.email ? `<a class="btn light" href="mailto:${e(c.contact.email)}">${ic('mail')}${e(CT.email)}</a>` : ''}
</div></div>
<div><h2>${e(here?.heading ?? ST.getting_here)}</h2>${c.contact?.address ? `<p>${e(c.contact.address).replace(/\n/g, '<br>')}</p>` : ''}${paras(here?.body).map((p) => `<p>${e(p)}</p>`).join('')}${stayLine ? `<p>${e(stayLine)}</p>` : ''}
${map ? `<a class="btn light" style="margin-top:8px" href="${e(map)}" target="_blank" rel="noopener">${ic('pin')}${e(CT.map)}</a>` : ''}</div>
</div><div class="legal"><span>© ${e(c.businessName)}</span>${stay.note ? `<span>${e(stay.note)}</span>` : ''}</div></div></footer>`
}

/* ---------- the booking form (drawer on home, page at book/) ---------- */
const today = new Date().toISOString().slice(0, 10)
export const SATURDAYS = (G.snapshot?.saturdays ?? []).filter((d) => d >= today)
const satLabel = (iso) => { const d = new Date(iso + 'T12:00:00Z'); return `Sat ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}` }
const amt = (r) => (r.supplement.onePP ? `+${money(r.supplement.onePP)} pp` : B.room_included)
export const bookForm = (pre, page) => {
  const clips = [0, 1, 2].map(clip)
  const first = clips[0]
  const lv = LEVELS.map((l, k) => `<label class="opt"><input type="radio" name="lvl" value="${l.slug}"${k === 0 ? ' checked' : ''} form="noform">${clips[k] ? `<img src="${pre}${clips[k].thumb}" width="84" height="62" alt="" loading="lazy">` : ''}<span><b>${e(l.name)}</b><small>${e(l.one)}</small></span><span class="amt">${l.price != null ? money(l.price) + ' pp' : ''}</span></label>`).join('')
  const rooms = ROOMS.map((r, k) => {
    const g = r.gallery[0], th = g && shapeOf(g.file, 'full-thumb')
    return `<label class="opt"><input type="radio" name="room" value="${r.key}"${k === 0 ? ' checked' : ''} form="noform">${th ? `<img src="${pre}${top(th).webp}" width="84" height="62" alt="" loading="lazy">` : ''}<span><b>${e(r.label)}</b><small>${e(r.line)}</small></span><span class="amt"${r.key === 'twin' ? ' id="twinamt"' : ''}>${e(amt(r))}</span></label>`
  }).join('')
  const incl = INCL.map((it) => `<li${it.l3 ? ' id="sessline"' : ''}>${ic(it.icon)}<span>${e(it.text)}</span></li>`).join('')
  const nights = (B.nights_options ?? ['7']).map((n, k) => `<label><input type="radio" name="duration" value="${+n + 1}"${k === 0 ? ' checked' : ''}><span>${e(n)}</span></label>`).join('')
  const step = (id, lab, sing) => `<div class="stp"><label for="${id}">${e(lab)}</label><div class="row"><button type="button" data-step="-1" data-for="${id}" aria-label="Remove ${sing}">−</button><input id="${id}" name="${{ 'g-f': 'female', 'g-m': 'male', 'g-c': 'couple' }[id]}" type="number" min="0" max="${id === 'g-c' ? 3 : 6}" value="${id === 'g-f' ? 1 : 0}" inputmode="numeric"><button type="button" data-step="1" data-for="${id}" aria-label="Add ${sing}">+</button></div></div>`
  const asOf = `Prices from the booking engine, ${G.snapshot.baseAsOf} (rooms ${G.snapshot.roomsAsOf}).`
  const handoff = `${e(B.handoff)} ${e(B.handoff_nothing_booked)}`
  /* 4h: on book/ the form is the page, so its title is the page's one h1 and the steps are h2 (the drawer on
     home keeps h2 / h3 under the home h1). CSS styles both levels the same. */
  const h = page ? ['h1', 'h2'] : ['h2', 'h3']
  return `<section class="book ${page ? 'page' : 'drawer'}" id="book" aria-labelledby="bk-t">
<div class="book-panel" id="bookpanel"><button class="x" type="button" aria-label="Close booking" data-close>${ic('x')}</button>
<div class="book-scroll" id="bookscroll">
${page ? '' : `<div class="book-band" id="bookband" aria-hidden="true">${first ? `<img id="bandposter" src="${pre}${top(first.poster).webp}" alt=""><video id="bandvid" muted loop playsinline preload="none"></video>` : ''}</div>`}
<${h[0]} class="script" id="bk-t">${e(CT.hero_c3)}</${h[0]}>
<form id="bookform" method="get" action="${e(ENGINE + LEVELS[0].slug)}">
<div class="step"><${h[1]}>${e(ST.book_level)}</${h[1]}><div class="opts">${lv}
<div class="opt fs-opt"><span><b>${e(FREE.name)}${FREE.detail ? ' | ' + e(FREE.detail) : ''}</b><small>${e(FREE.one)}</small></span>${FREE.wa ? `<a class="btn light" href="${e(FREE.wa)}" target="_blank" rel="noopener">${ic('wa', 'wa')}${e(CT.freestylers)}</a>` : ''}</div></div></div>
<div class="step"><${h[1]}>${e(ST.book_included)}</${h[1]}><ul class="blist" id="blist">${incl}</ul></div>
<div class="step"><${h[1]}>${e(ST.book_room)}</${h[1]}><div class="opts">${rooms}</div></div>
<div class="step"><${h[1]}>${e(ST.book_dates)}</${h[1]}>
<div class="field"><select id="start" name="start" required>${SATURDAYS.map((d) => `<option value="${d}">${satLabel(d)}</option>`).join('')}</select><label for="start">${e(B.field_checkin)}</label></div>
<p class="help">${e(B.field_checkin_help)}</p>
<fieldset class="seg" id="nights"><legend>${e(B.field_nights)}</legend>${nights}</fieldset>
<input type="hidden" name="end" id="end" disabled>
<div class="steppers">${step('g-f', B.field_women, 'a woman')}${step('g-m', B.field_men, 'a man')}${step('g-c', B.field_couples, 'a couple')}</div>
<p class="help" style="margin-top:10px">${e(B.guests_help)}</p></div>
<p class="handoff-note usd">Package ${BASE != null ? money(BASE) : ''} pp for 7 nights; room supplements per person. ${e(B.currency_note)}. ${e(asOf)}</p>
<p class="handoff-note">${handoff}<br>${e(B.deposit)}</p>
<div class="book-foot" id="bookfoot">
<div class="tot js-act" aria-live="polite"><div><span>${e(B.total_package)}</span><span id="t-pkg">${BASE != null ? money(BASE) : ''}</span></div><div><span>${e(B.total_room)}</span><span id="t-room">${e(B.room_included)}</span></div><div class="big"><span id="t-all-l">Total for 1 guest</span><span id="t-all">${BASE != null ? money(BASE) : ''}</span></div></div>
<button class="btn js-act" type="submit">${e(CT.handoff)}</button>
<div class="nojs-acts">${LEVELS.map((l) => `<button class="btn" type="submit" formaction="${e(ENGINE + l.slug)}">${e(CT.handoff)}: Level ${l.n}</button>`).join('')}</div>
<p class="fine keep">${e(B.currency_note)}. ${e(asOf)}</p>
<p class="fine">${handoff}</p><p class="fine">${e(B.deposit)}</p>
</div></form></div></div></section>`
}

/* data the page script needs (prices, engine, clips, room supplements, the drop's plates) */
export const pageData = (pre) => {
  const clips = [0, 1, 2].map(clip)
  return {
    engine: ENGINE, base: BASE,
    levels: Object.fromEntries(LEVELS.map((l, k) => [l.slug, clips[k] ? { poster: pre + top(clips[k].poster).webp, webm: clips[k].webm && pre + clips[k].webm, mp4: clips[k].bandMp4 && pre + clips[k].bandMp4 } : null])),
    rooms: Object.fromEntries(ROOMS.map((r) => [r.key, { one: r.supplement.onePP ?? 0, couple: r.supplement.couplePP ?? 0 }])),
    sess: Object.fromEntries(LEVELS.map((l, k) => [l.slug, (G.inclusions[k + 1] ?? []).find((it) => it.icon === 'clock')?.text ?? ''])),
    totalAll: B.total_all, included: B.room_included,
  }
}

/* ---------- SEO plumbing (station 4h) ---------- */
/* Preview or real domain? One place decides it (the rule KA's build set, Shahar 2026-09-22; same code as
   sites/global-surf-adventures/final and this pipeline's other finals). PREVIEW = no SITE_URL, or a SITE_URL on
   *.workers.dev / localhost. A preview is not indexed: robots.txt disallows everything, both pages carry
   <meta name="robots" content="noindex, nofollow">, and there is no sitemap. SITE_URL must end in '/'. */
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
/* the two routes, for the sitemap and the canonicals */
export const ROUTES = ['', 'book/']

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
/* contact.address (free text) → PostalAddress. Splits "street…, town [postcode], country" (playbook §6 order)
   only when the last part is a country it knows; otherwise the whole address stays in streetAddress. Never
   adds a part. */
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

/* geo from contact.mapUrl: a Google Maps *place* URL carries the listing's own pin as !3d<lat>!4d<lng> (the
   @lat,lng part is only the viewport). The schema has no geo field, so the pin rides on the owner-editable map
   link: change the link and the pin follows; a link without a pin gives no geo. */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}

/* businessType → schema.org type. A surf camp sells the bed and the lessons, so it is typed as both (schema.org
   allows a multi-typed entity): LodgingBusiness carries checkinTime / checkoutTime / amenityFeature,
   SportsActivityLocation is seo base.md's type for a school or camp. */
export const LD_TYPE = {
  surf_camp: ['LodgingBusiness', 'SportsActivityLocation'], beach_lodging: 'LodgingBusiness',
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* JSON-LD for the business: one block, every value from content.json (and, for sameAs, the SCHEMA GAP Instagram
   link the page shows). No aggregateRating / review: Shahar's no-ratings-markup decision for KA, applied to every
   site since. Absolute @id / url / image only with SITE_URL. */
export const businessLd = ({ description, images = [] } = {}) => {
  const k = c.contact ?? {}
  const postal = postalAddress(k.address)
  const pin = pinFromMapUrl(k.mapUrl)
  const map = safeUrl(k.mapUrl)
  const priced = (c.lessons ?? []).filter((l) => typeof l.price === 'number' && l.currency)
  const low = priced.length ? priced.reduce((a, b) => (b.price < a.price ? b : a)) : null
  const same = [safeUrl(G.instagram?.url), ...(c.ratings ?? []).map((r) => safeUrl(r.url))].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': LD_TYPE[c.businessType] ?? 'LocalBusiness',
    ...(SITE ? { '@id': `${SITE.href}#business`, url: SITE.href } : {}),
    name: c.businessName,
    ...(description ? { description } : {}),
    ...(SITE && images.length ? { image: images.map(abs) } : {}),
    ...(tel(k.phone) ? { telephone: k.phone } : {}),
    ...(k.email ? { email: k.email } : {}),
    ...(postal ? { address: postal } : {}),
    ...(pin ? { geo: { '@type': 'GeoCoordinates', latitude: pin.lat, longitude: pin.lng } } : {}),
    ...(map ? { hasMap: map } : {}),
    /* the lowest package price, as the page prints it ("From $1,466 pp | 7 nights": lessons[].price, per person, 7 nights) */
    ...(low ? { priceRange: `From ${low.currency} ${low.price.toLocaleString('en-US')} per person, 7 nights` } : {}),
    ...(stay.checkInFrom ? { checkinTime: stay.checkInFrom } : {}),
    ...(stay.checkOutTo ? { checkoutTime: stay.checkOutTo } : {}),
    ...((c.amenities ?? []).length ? {
      amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })),
    } : {}),
    ...((c.openingHours ?? []).length ? {
      openingHoursSpecification: c.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => ({ mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' })[d]), opens: h.opens, closes: h.closes })),
    } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    ...(same.length ? { sameAs: [...new Set(same)] } : {}),
  }
}
/* JSON in a <script>: '<' escaped so no value can close the element */
export const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

/* head tags shared by both pages (after <title> and the description). Absolute URLs (canonical, hreflang,
   og:url, og:image) only with SITE_URL: a relative og:image is not read by link previews. */
export const seoHead = ({ path, title, description, image }) => {
  const url = abs(path)
  return [
    IS_PREVIEW ? '<meta name="robots" content="noindex, nofollow">' : '',
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
      `<meta property="og:image:width" content="${image.width}">`,
      `<meta property="og:image:height" content="${image.height}">`,
      image.alt ? `<meta property="og:image:alt" content="${e(image.alt)}">` : '',
    ] : []),
    `<meta name="twitter:card" content="${SITE && image ? 'summary_large_image' : 'summary'}">`,
  ].filter(Boolean).join('\n')
}
