/**
 * Template-owned helpers and shared markup for the two pages (home + booking), ported from the picked
 * mockup's build.py / book.py (sites/global-surf-adventures/mockups/picked/src/). Every word, number,
 * link and photograph the pages print about the business comes from:
 *   src/tenant/content.json   Payload (schemas/site-content.md v0.9, REST shape) — owner-editable;
 *   src/gaps/gaps.json        SCHEMA GAP content the schema has no field for yet (notes.md);
 *   src/lib/labels.json       interface wording approved with the copy (template-owned).
 * What lives here is markup, interface wording the copy lacks (marked TEMPLATE-LABEL, listed in
 * notes.md), number/date formatting and the photo/video manifests' plumbing.
 */
import raw from '../tenant/content.json'
import gaps from '../gaps/gaps.json'
import labels from './labels.json'
import photosGen from '../tenant/photos.generated.json'
import { SLOTS } from './slots.mjs'

export const c = raw.locales.en
export const G = gaps
export const L = labels
export const CT = labels.ctas
export const ST = labels.titles
export const B = labels.booking

const videosGen = Object.values(import.meta.glob('../tenant/videos.generated.json', { eager: true, import: 'default' }))[0] ?? null
const portraitGen = Object.values(import.meta.glob('../tenant/videos.portrait.json', { eager: true, import: 'default' }))[0] ?? null

/* ---------------------------------------------------------------- text */
export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const paras = (body) => (body ?? '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
const blocks = c.copyBlocks ?? []
export const block = (slot, i = 0) => blocks.filter((b) => b.slot === slot)[i] ?? null

/* Only ever put a checked https URL in an href (schema: templates re-check). */
export const safeUrl = (u) => { try { return new URL(u).protocol === 'https:' ? u : null } catch { return null } }
export const tel = (e164) => (e164 && /^\+[1-9]\d{6,14}$/.test(e164) ? `tel:${e164}` : null)

/* ' | ' details: each item is kept whole (it wraps as a unit), its separator travels with it and is
   hidden by common.js when the next item starts a new line, so no line ends on a bare ' | '. [picked build.py] */
export const detail = (s, drop) => {
  const parts = String(s ?? '').split('|').map((p) => p.trim()).filter((p) => p && p !== drop)
  return parts.map((p, k) => `<span class="di">${e(p)}${k < parts.length - 1 ? '<span class="sep">|</span>' : ''}</span>`).join('')
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const dayMonYear = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '' }
export const money = (x, cur = 'USD') => (cur === 'USD' ? '$' : cur + ' ') + Math.round(x).toLocaleString('en-US')

/* booking links, by their label (copy: "Book Level 1" …, "Ask on WhatsApp") */
const links = (c.bookingLinks ?? []).map((l) => ({ ...l, url: safeUrl(l.url) })).filter((l) => l.url)
export const linkByLabel = (label) => links.find((l) => l.label === label)?.url ?? null
/* WhatsApp: contact.whatsapp when the owner sets one (schema v0.7), else the "Ask on WhatsApp" booking link */
export const WA = c.contact?.whatsapp
  ? `https://wa.me/${c.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${c.businessName}, I have a question about the surf packages.`)}`
  : (links.find((l) => /^https:\/\/wa\.me\//.test(l.url))?.url ?? null)
export const waWith = (text) => (WA ? WA.split('?')[0] + '?text=' + encodeURIComponent(text) : null)

/* detail lines composed from passed fields (copy/sources.md: "the numbers inside detail lines come from
   passed fields … composed by the template, never stored twice") */
const priced = (c.lessons ?? []).filter((l) => typeof l.price === 'number')
export const fromPrice = priced.length ? money(Math.min(...priced.map((l) => l.price)), priced[0].currency) : null
export const levelPrice = fromPrice ? `From ${fromPrice} pp | 7 nights` : '' // TEMPLATE-LABEL wording; the base price is per person for 7 nights (lessons[].unit + copy)
const st = c.stayInfo ?? {}
export const stayLine = st.checkInFrom
  ? `Check-in ${st.checkInFrom}${st.checkInTo ? '–' + st.checkInTo : ''}${st.checkOutTo ? ' | check-out by ' + st.checkOutTo : ''}` : ''
export const PLATFORM = { booking: 'Booking.com', google: 'Google', hostelworld: 'Hostelworld', agoda: 'Agoda', tripadvisor: 'Tripadvisor', airbnb: 'Airbnb' }

/* lessons ↔ the design's three levels (gaps.levels carries the one-liners and the engine product) */
export const LEVELS = G.levels.map((g, k) => {
  const lesson = (c.lessons ?? [])[k] ?? {}
  return { ...g, n: String(k + 1), name: lesson.label ?? g.lesson, cta: CT['level_' + (k + 1)] }
})
const freeLesson = (c.lessons ?? []).find((l) => /freestyl/i.test(l.label)) ?? null
export const FREE = { name: freeLesson?.label ?? G.freestylers.lesson, one: G.freestylers.oneLiner, detail: freeLesson?.includes ?? '' }
export const ROOMS = G.rooms

/* ---------------------------------------------------------------- photos */
/* photos[] row n fills slot n (src/lib/slots.mjs) */
export const slotRow = (n) => {
  const m = (c.photos ?? [])[n]?.image
  return m && SLOTS[n] ? { filename: m.filename, alt: m.alt ?? '' } : null
}
export const shapeOf = (filename, key) => photosGen[filename]?.shapes?.[key] ?? null
export const srcset = (shape, kind = 'webp', pre = '') => shape.sources.map((s) => `${pre}${s[kind]} ${s.w}w`).join(', ')
export const top = (shape) => shape.sources[shape.sources.length - 1]
/* a source of at least `w` px, else the largest */
export const atLeast = (shape, w) => shape.sources.find((s) => s.w >= w) ?? top(shape)
export const R45 = 'r1.25', R32 = 'r0.667', R169 = 'r0.563', FULL = 'full'

/* <picture> with a WebP srcset and a JPEG fallback at the given width [postcard ppic / week slides] */
export const picture = (row, key, sizes, jpgW, pre = '', { lazy = true, altText } = {}) => {
  if (!row) return ''
  const sh = shapeOf(row.filename, key); if (!sh) return ''
  const j = atLeast(sh, jpgW)
  return `<picture><source type="image/webp" srcset="${srcset(sh, 'webp', pre)}" sizes="${sizes}"><img src="${pre}${j.jpg}" width="${j.w}" height="${j.h}" alt="${e(altText ?? row.alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}></picture>`
}
/* a WebP <img> with srcset [try-your-week wimg] */
export const wimg = (file, alt, sizes, pre = '', { lazy = true, cls = '' } = {}) => {
  const sh = shapeOf(file, FULL); if (!sh) return ''
  const t = top(sh)
  return `<img${cls ? ` class="${cls}"` : ''} src="${pre}${t.webp}" srcset="${srcset(sh, 'webp', pre)}" sizes="${sizes}" width="${t.w}" height="${t.h}" alt="${e(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ''}>`
}

/* ---------------------------------------------------------------- video (schema v0.9 manifest) */
export const heroVideo = () => {
  const v = c.heroVideo && videosGen?.videos?.[c.heroVideo.filename]
  const poster = c.heroVideoPoster && videosGen?.posters?.[c.heroVideoPoster.filename]
  if (!v || !poster) return null
  const pv = portraitGen?.video?.[c.heroVideo.filename] ?? null
  const pp = portraitGen?.poster?.[c.heroVideoPoster.filename] ?? null
  return { v, poster, pv, pp, alt: c.heroVideo.alt ?? '' }
}
/* videos[] row n → its tiers and poster (rows 0–2 home level cards, 3–5 booking desk; notes.md) */
export const clip = (n) => {
  const row = (c.videos ?? [])[n]
  const v = row?.video && videosGen?.videos?.[row.video.filename]
  const p = row?.poster && videosGen?.posters?.[row.poster.filename]
  return v && p ? { v, p, description: row.description ?? '' } : null
}

/* ---------------------------------------------------------------- fonts (self-hosted, 4g) */
export const fontFaces = (pre) => `@font-face{font-family:'Lora';font-style:normal;font-weight:400 700;font-display:swap;src:url(${pre}fonts/lora-latin-wght-normal.woff2) format('woff2')}
@font-face{font-family:'Lora';font-style:italic;font-weight:500;font-display:swap;src:url(${pre}fonts/lora-latin-wght-italic.woff2) format('woff2')}
@font-face{font-family:'Dancing Script';font-style:normal;font-weight:400 700;font-display:swap;src:url(${pre}fonts/dancing-script-latin-wght-normal.woff2) format('woff2')}
`

/* ---------------------------------------------------------------- icons [sign sprite + postcard inclusion icons] */
const ICON = {
  bed: '<path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h3A1.5 1.5 0 0 1 12 6.5V9"/>',
  bowl: '<path d="M3 11h18a9 9 0 0 1-18 0zM9 19.5 8.5 21h7l-.5-1.5"/><path d="M9 3c-1 1.3 1 2.2 0 3.5M13 3c-1 1.3 1 2.2 0 3.5"/>',
  plate: '<circle cx="13" cy="12" r="7.5"/><circle cx="13" cy="12" r="4"/><path d="M3 4v5.5M3 12v8M1.8 4v4a1.2 1.2 0 0 0 2.4 0V4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  book: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13"/>',
  board: '<path d="M5.2 18.8C3 16.6 6 10.8 10.4 6.4S19.6.9 20.9 3.1c1.3 2.2-2 8-6.4 12.4s-7.1 5.5-9.3 3.3z"/><path d="M6.5 17.5 18.5 5.5"/>',
  van: '<path d="M2.5 16.5V7a1 1 0 0 1 1-1H14v10.5M14 9.5h3.6l3.4 3.6v3.4h-1.8M9 16.5h6.5M2.5 16.5h1.8"/><circle cx="6.6" cy="17" r="1.9"/><circle cx="17" cy="17" r="1.9"/>',
  map: '<path d="M9 4 3 6.2v13.6L9 17.6l6 2.2 6-2.2V4.2L15 6.4 9 4zM9 4v13.6M15 6.4V20"/>',
  water: '<path d="M12 3s6 6.8 6 11a6 6 0 0 1-12 0c0-4.2 6-11 6-11z"/>',
  cup: '<path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.8a2.2 2.2 0 0 1 0 4.4H16M3 21h14"/><path d="M8 3.5c-.8 1 .8 1.8 0 3M12 3.5c-.8 1 .8 1.8 0 3"/>',
}
/* the WhatsApp glyph is the-sign's path, verbatim */
const WA_PATH = 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z'
export const SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
  Object.entries(ICON).map(([k, v]) => `<symbol id="ic-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`).join('') +
  `<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="${WA_PATH}"/></symbol>` +
  '<symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></symbol>' +
  '<symbol id="i-yt" viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></symbol>' +
  '<symbol id="i-fb" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"/></symbol>' +
  '<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3.5h3.6l1.9 4.8-2.4 1.5a11.5 11.5 0 0 0 6.1 6.1l1.5-2.4 4.8 1.9V19a2 2 0 0 1-2 2A17.5 17.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/></symbol>' +
  '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></symbol>' +
  '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21.5s-7-6.1-7-11.5a7 7 0 0 1 14 0c0 5.4-7 11.5-7 11.5z"/><circle cx="12" cy="10" r="2.6"/></symbol>' +
  '<symbol id="i-l" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></symbol>' +
  '<symbol id="i-r" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></symbol>' +
  '<symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7h18M3 12h18M3 17h18"/></symbol>' +
  '<symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol>' +
  '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>' +
  '</defs></svg>'
export const ic = (n, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} aria-hidden="true"><use href="#${n}"/></svg>`

export const logo = () => `<svg viewBox="${G.logo.viewBox}" aria-hidden="true"><path fill="currentColor" d="${G.logo.d}"/></svg>`

/* ---------------------------------------------------------------- header, footer [sign] */
const NAV = [['Levels', '#levels'], ['Rooms', '#rooms'], ['The lodge', '#welcome'], ['Contact', '#contact']] // TEMPLATE-LABEL (concepts.md §0)

export const header = (pre, home) => {
  const h = home ? '' : '../'
  const links = NAV.map(([t, u]) => `<a href="${u === '#contact' ? u : h + u}">${t}</a>`).join('')
  const book = home ? `<a class="btn btn-book hdr-book" href="${pre}book/">${e(CT.header_and_bar)}</a>` : ''
  const menuBook = home ? `<a class="btn btn-book" href="${pre}book/">${e(CT.header_and_bar)}</a>` : ''
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr${home ? '' : ' solid'}" id="hdr">
  <div class="hdr-in">
    <a class="logo" href="${h || './'}" aria-label="${e(G.logo.homeLinkLabel)}">${logo()}</a>
    <nav class="nav" aria-label="Main">${links}</nav>
    ${book}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu">${ic('i-menu')}</button>
  </div>
  <div class="menu" id="menu" hidden>${links}${menuBook}</div>
</header>`
}

export const footer = (pre) => {
  const k = c.contact ?? {}, S = G.socials
  const info = block('info', 0)
  const phone = tel(k.phone), map = safeUrl(k.mapUrl), terms = safeUrl(G.termsUrl)
  return `<footer class="foot" id="contact">
  <div class="wrap foot-g">
    <div>
      <a class="logo" href="${pre || './'}" aria-label="${e(G.logo.homeLinkLabel)}">${logo()}</a>
      <p style="margin-top:22px;max-width:320px">${e(c.tagline)}</p>
    </div>
    <div>
      <h2>Talk to us</h2>
      <div class="stack">
        ${WA ? `<a class="btn btn-soft" href="${e(WA)}">${ic('i-wa', 'wa')}${e(CT.whatsapp_footer)}</a>` : ''}
        ${phone ? `<a class="btn btn-soft" href="${phone}">${ic('i-phone')}${e(CT.call)}</a>` : ''}
        ${k.email ? `<a class="btn btn-soft" href="mailto:${e(k.email)}">${ic('i-mail')}${e(CT.email)}</a>` : ''}
      </div>
    </div>
    <div>
      <h2>${e(info?.heading ?? ST.getting_here)}</h2>
      ${k.address ? `<address>${e(k.address)}</address>` : ''}
      ${info ? `<p class="small">${e(info.body)}</p>` : ''}
      ${stayLine ? `<p class="small">${e(stayLine)}</p>` : ''}
      ${map ? `<a class="btn btn-soft" href="${e(map)}" target="_blank" rel="noopener">${ic('i-pin')}${e(CT.map)}</a>` : ''}
    </div>
    <div>
      <h2>Follow</h2>
      <div class="social">
        <a href="${e(S.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ic('i-ig')}</a>
        <a href="${e(S.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${ic('i-yt')}</a>
        <a href="${e(S.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${ic('i-fb')}</a>
      </div>
    </div>
  </div>
  <div class="wrap legal"><span>© Global Surf Adventures</span>${terms ? `<a href="${e(terms)}" target="_blank" rel="noopener">Terms and conditions</a>` : ''}</div>
</footer>`
}

/* one dot slideshow: items are ready HTML slides */
export const show = (items, label, cls = '', arrows = true, extra = '') => {
  const arr = arrows ? `<button class="arrow prev" type="button" aria-label="Previous photo">${ic('i-l')}</button><button class="arrow next" type="button" aria-label="Next photo">${ic('i-r')}</button>` : ''
  return `<div class="show ${cls}" data-show><div class="show-frame"><div class="show-track" tabindex="0" role="region" aria-label="${e(label)}">${items.join('')}</div>${arr}</div><div class="dots"></div>${extra}</div>`
}

/* the room viewer [week]: pills + one panel per room (gallery, name, price, details, action) */
export const roomPrice = (r) => (r.supplement.display ? e(r.supplement.display) : `${e(r.supplement.displayOneGuest)}<br>${e(r.supplement.displayCouple)}`)
export const roomViewer = (pre, action, { idp = '', ctaFirst = false, sizes = '(max-width: 1000px) 100vw, 780px' } = {}) => {
  const pills = ROOMS.map((r, k) => `<button type="button" role="tab" id="${idp}rt-${r.key}" aria-controls="${idp}room-${r.key}" aria-selected="${k === 0}">${e(r.short)}</button>`).join('')
  const panels = ROOMS.map((r, k) => {
    const slides = r.gallery.map((g) => `<figure>${wimg(g.file, g.alt, sizes, pre)}</figure>`)
    const buy = `<p class="price" data-rprice>${roomPrice(r)}</p><p class="rstate" data-rstate hidden></p>${action(r, k)}`
    return `
<div class="room-panel" id="${idp}room-${r.key}" role="tabpanel" aria-labelledby="${idp}rt-${r.key}" data-room="${r.key}" data-engine-title="${e(r.engineTitle)}">
 <div class="room">
  ${show(slides, r.label + ', photographs')}
  <div class="room-txt">
   <h3>${e(r.label)}</h3>
   ${ctaFirst ? buy : ''}
   <p class="line">${e(r.line)}</p>
   <p class="desc">${e(r.description)}</p>
   <p class="detail">${detail(r.details)}</p>
   ${ctaFirst ? '' : buy}
  </div>
 </div>
</div>`
  }).join('')
  return `<div class="room-box"><div class="pills-row"><div class="pills" role="tablist" aria-label="Room type">${pills}</div></div><div class="room-panels">${panels}</div></div>`
}

/* ---------------------------------------------------------------- SEO plumbing (station 4h) */
/* Preview or real domain? One place decides it (the rule KA's build set, Shahar 2026-09-22; same code as
   this run's Lavish/Layday finals). PREVIEW = no SITE_URL, or a SITE_URL on *.workers.dev / localhost.
   A preview is not indexed: robots.txt disallows everything, both pages carry
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

/* AI crawlers and assistants (station 4i), named one by one so the policy is a decision on record, not a
   default. 'allow' for every one: being quotable is the point of the site (aiseo base.md §7). It is the
   owner's decision and has not been put to them yet (aiseo-report.md); blocking one is changing its value
   to 'disallow' here. robots.txt.js writes the groups; on a preview build they repeat the refusal. Same
   list as this pipeline's other finals (KA, Layday, Lavish). */
export const AI_CRAWLERS = {
  GPTBot: 'allow', 'OAI-SearchBot': 'allow', 'ChatGPT-User': 'allow',
  ClaudeBot: 'allow', 'Claude-SearchBot': 'allow', 'Claude-User': 'allow',
  PerplexityBot: 'allow', 'Perplexity-User': 'allow',
  'Google-Extended': 'allow', 'Applebot-Extended': 'allow',
  CCBot: 'allow', 'Meta-ExternalAgent': 'allow', Amazonbot: 'allow', DuckAssistBot: 'allow',
  'MistralAI-User': 'allow',
}
export const abs = (u) => (SITE ? new URL(u, SITE).href : null)
/* the two routes, for the sitemap and the canonicals */
export const ROUTES = ['', 'book/']

/* one paragraph → its sentences */
export const sentences = (p) => (p ?? '').split(/(?<=[.!?])\s+(?=[A-Z0-9'“"])/).map((s) => s.trim()).filter(Boolean)
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
/* contact.address (free text) → PostalAddress. Splits "street…, town [postcode], country" (playbook §6
   order) only when the last part is a country it knows; otherwise the whole address stays in
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

/* geo from contact.mapUrl: a Google Maps *place* URL carries the listing's own pin as !3d<lat>!4d<lng>
   (the @lat,lng part is only the viewport). The schema has no geo field, so the pin rides on the
   owner-editable map link: change the link and the pin follows; a link without a pin gives no geo. */
export const pinFromMapUrl = (u) => {
  const m = /!3d(-?\d{1,2}\.\d+)!4d(-?\d{1,3}\.\d+)/.exec(u ?? '')
  if (!m) return null
  const lat = +m[1], lng = +m[2]
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? { lat, lng } : null
}

/* businessType → schema.org type. A surf camp sells the bed and the lessons, so it is typed as both
   (schema.org allows a multi-typed entity): LodgingBusiness carries checkinTime / checkoutTime /
   amenityFeature, SportsActivityLocation is base.md's type for a school or camp. */
export const LD_TYPE = {
  surf_camp: ['LodgingBusiness', 'SportsActivityLocation'], beach_lodging: 'LodgingBusiness',
  surf_school: 'SportsActivityLocation', board_rental: 'SportsActivityLocation',
  surf_shop: 'SportingGoodsStore', shaper: 'Store', other: 'LocalBusiness',
}

/* JSON-LD for the business: one block, every value from content.json (and, for sameAs, the footer's
   SCHEMA GAP Instagram link). No aggregateRating / review: Shahar's no-ratings-markup decision for KA,
   applied to every site since. Absolute @id / url / image only with SITE_URL. */
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
    ...(st.checkInFrom ? { checkinTime: st.checkInFrom } : {}),
    ...(st.checkOutTo ? { checkoutTime: st.checkOutTo } : {}),
    ...((c.amenities ?? []).length ? {
      amenityFeature: c.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a.note ? `${a.label} (${a.note})` : a.label, value: true })),
    } : {}),
    ...((c.languagesSpoken ?? []).length ? { knowsLanguage: c.languagesSpoken } : {}),
    ...(same.length ? { sameAs: [...new Set(same)] } : {}),
    ...answerLd(),
  }
}

/* Station 4i: what the page sells and where you sleep, as data, so an answer engine can say "a surf week
   at Global Surf Lodge Kabalana starts from …" without reading the design. Both mirror rows the home page
   shows (the level cards and the room viewer); nothing is added that the page does not print.
   makesOffer ← lessons[] (label, from-price, currency) + the level's one-liner (gaps.levels / freestylers)
   + lessons[].includes; url = that level on the site's own booking page, only with SITE_URL.
   containsPlace ← the rooms the page shows (gaps.rooms: label, description, sleeps). rooms[] is empty by
   the copy ruling, so the SCHEMA GAP file is the page's source, as it is for the room viewer. Room
   supplements are dated samples, not prices, so they stay out. */
const unitWords = { per_person: 'per person' }
export const answerLd = () => {
  const offers = (c.lessons ?? []).filter((l) => l.label).map((l) => {
    const lv = LEVELS.find((L) => L.name === l.label)
    const one = lv?.oneLiner ?? (l.label === FREE.name ? FREE.one : null)
    const description = [one, l.includes].filter(Boolean).map((s) => s.trim().replace(/[.\s]+$/, '') + '.').join(' ')
    const priced = typeof l.price === 'number' && l.currency
    return {
      '@type': 'Offer',
      name: l.label,
      ...(description ? { description } : {}),
      ...(priced ? {
        priceCurrency: l.currency,
        /* "From $1,466 pp | 7 nights" on the page: the package's base price, per person, 7 nights (4h priceRange) */
        priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: l.price, priceCurrency: l.currency, unitText: [unitWords[l.unit], '7 nights'].filter(Boolean).join(', ') },
      } : {}),
      ...(SITE && lv ? { url: abs(`book/?level=${lv.slug}`) } : {}),
    }
  })
  const rooms = (ROOMS ?? []).filter((r) => r.label).map((r) => ({
    '@type': 'Room',
    name: r.label,
    ...(r.description ? { description: r.description } : {}),
    ...(r.sleeps ? { occupancy: { '@type': 'QuantitativeValue', maxValue: r.sleeps } } : {}),
  }))
  return {
    ...(offers.length ? { makesOffer: offers } : {}),
    ...(rooms.length ? { containsPlace: rooms } : {}),
  }
}
/* JSON in a <script>: '<' escaped so no value can close the element */
export const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

/* head tags shared by both pages (after <title> and the description). og:image only with SITE_URL. */
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
