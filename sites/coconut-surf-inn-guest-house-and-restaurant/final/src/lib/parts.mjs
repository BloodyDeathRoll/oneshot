/**
 * The page parts both pages share (the home page and rooms/, the "Find your room" page for visitors without JS).
 * Markup and class names are the unique mockup's (mockups/unique/src/build.py), bound to content: every word,
 * photo, link and number comes from content.json, the SCHEMA GAP file or the template's labels.
 */
import {
  c, L, PLATFORM, e, t, svg, pipe, SEP, NAME, PRIMARY, BOOK_HOST, TEL, PHONE, MAP, ADDRESS, HOURS, AIRBNB_URL, ROOMS, imgOf,
} from './site.mjs'

/* ---------- buttons: real links, work with JS off ---------- */
export const book = (cls = '', label = PRIMARY?.label, icon = true) =>
  PRIMARY ? `<a class="btn btn-book ${cls}" href="${e(PRIMARY.url)}" rel="noopener">${icon ? svg('cal') : ''}<span>${e(label)}</span></a>` : ''
export const call = (cls = '', label = null) =>
  TEL ? `<a class="btn btn-ghost ${cls}" href="${TEL}">${svg('phone')}<span>${e(label ?? t(L.call, { phone: PHONE }))}</span></a>` : ''
export const sunCall = (cls = '') =>
  TEL ? `<a class="sun-call ${cls}" href="${TEL}" aria-label="${e(t(L.call, { phone: PHONE }))}">${svg('phone')}</a>` : ''
export const finder = (cls = 'btn-ghost', label = L.finder, pre = '') =>
  `<a class="btn ${cls}" href="${pre}rooms/" data-finder data-open-drawer>${svg('bed')}<span>${e(label)}</span></a>`

export const rating = (r) => {
  const tag = r.url ? 'a' : 'div'
  return `<${tag} class="rating"${r.url ? ` href="${e(r.url)}" rel="noopener"` : ''}><span class="score">${e(r.shown)}<small>/${e(r.scale)}</small></span>`
    + `<span class="rmeta">${pipe([e(r.name), e(t(L.reviews_n, { n: r.count })), e(r.day)])}</span></${tag}>`
}

/* a review: the guest's own line breaks kept as <br> */
export const quote = (q, cls = 'q') =>
  `<figure class="${cls}"><blockquote><p>${q.lines.map(e).join('<br>')}</p></blockquote>`
  + `<figcaption>${pipe([e(q.author), e(q.src), e(q.month)])}</figcaption></figure>`

export const paras = (ps, cls = '') => ps.map((p) => `<p${cls ? ` class="${cls}"` : ''}>${e(p)}</p>`).join('')

/* ---------- header, footer, phone bar ---------- */
export const header = (pre = '') => `<a class="skip" href="#main">${e(L.skip)}</a>
<header class="top" id="top">
  <a class="mark" href="${pre || '#top'}">${e(NAME)}</a>
  <nav class="nav" aria-label="${e(L.nav_aria)}">${pipe([`<a href="${pre}#rooms">${e(L.nav.rooms)}</a>`, `<a href="${pre}#stay">${e(L.nav.stay)}</a>`, `<a href="${pre}#break">${e(L.nav.break)}</a>`])}</nav>
  <div class="top-act">${book('btn-sm', L.header_book)}${sunCall('sun-sm')}</div>
</header>`

export const footer = () => `<footer class="foot tint">
  <div class="wrap foot-grid">
    <div><p class="mark">${e(NAME)}</p>${ADDRESS ? `<p>${e(ADDRESS)}</p>` : ''}${HOURS ? `<p class="small">${e(HOURS)}</p>` : ''}</div>
    <div class="foot-act">${call()}${MAP ? `<a class="btn btn-ghost" href="${e(MAP)}" rel="noopener">${svg('map')}<span>${e(L.map_short)}</span></a>` : ''}</div>
    <div class="foot-act">${book('btn-sm', t(L.foot_book, { p: BOOK_HOST }))}${AIRBNB_URL ? `<a class="btn btn-ghost btn-sm" href="${e(AIRBNB_URL)}" rel="noopener">${svg('bed')}<span>${e(PLATFORM.airbnb)}</span></a>` : ''}</div>
  </div>
</footer>`

export const bar = (pre = '') => `<div class="bar" id="bar">${book('', PRIMARY?.label)}${finder('btn-ghost', L.finder, pre)}</div>`

/* ---------- a room in the "Find your room" overlay and on rooms/ ---------- */
export const roomRow = (r, pre = '') => {
  const lead = r.slides[0]
  return `<li class="pick" data-sleeps="${r.sleeps ?? ''}"><div class="pick-pic">${imgOf(lead, { pre })}${r.chip ? `<span class="chip">${e(r.chip)}</span>` : ''}</div>`
    + `<div class="pick-txt"><h3>${e(r.label)}</h3><p class="meta">${r.chip ? `<span class="kind">${e(r.chip)} ${SEP} </span>` : ''}${pipe([e(r.beds), r.sleeps ? e(t(L.sleeps, { n: r.sleeps })) : ''])}</p>`
    + `${r.note ? `<p class="note">${e(r.note)}</p>` : ''}${book('btn-sm')}</div></li>`
}
/* rooms that sleep n or n + 1, smallest first (mockup notes, conflict 5) */
export const fits = (n) => [...ROOMS].sort((a, b) => (a.sleeps ?? 0) - (b.sleeps ?? 0)).filter((r) => r.sleeps && n <= r.sleeps && r.sleeps <= n + 1)

/* ---------- <head> pieces ---------- */
/* the head script: `js` and `at-hero` before first paint, and `pin` (the sticky set-piece) unless reduced motion or ?still */
export const HEADJS = "(function(d){var c=d.documentElement.classList;c.add('js');c.add('at-hero');"
  + "if(matchMedia('(prefers-reduced-motion: no-preference)').matches&&!/[?&]still\\b/.test(location.search))c.add('pin')})(document)"
/* 4g: fonts self-hosted (the mockup loaded the same latin files from fonts.gstatic.com), same display: swap */
export const fontFaces = (pre = '') => `@font-face{font-family:'Red Hat Text';font-style:normal;font-weight:400 600;font-display:swap;src:url(${pre}fonts/red-hat-text-latin-wght-normal.woff2) format('woff2')}
@font-face{font-family:'Caveat';font-style:normal;font-weight:600;font-display:swap;src:url(${pre}fonts/caveat-latin-600-normal.woff2) format('woff2')}
`
export const fontPreloads = (pre = '') => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${pre}fonts/red-hat-text-latin-wght-normal.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin href="${pre}fonts/caveat-latin-600-normal.woff2">`
export { c }
