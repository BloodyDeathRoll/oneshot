/* Reading the content (src/tenant/content.json, later Payload) and the template's labels. Every word, number, photo and
   link comes from here. Where the schema has no field for a thing the design needs, the reading is marked SCHEMA GAP:
   it reads an existing field by position or wording and renders nothing when that fails. Proposals: notes.md. */
import content from '../tenant/content.json'
import L from './labels.json'
import photos from '../tenant/photos.generated.json'

export { L }
export const S = content.locales.en
export const P = (id) => photos[id] ?? null

export const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
export const t = (s, vars = {}) => s.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m)
export const paras = (b) => (b?.body ?? '').split('\n\n').filter(Boolean)
export const ps = (items, cls = '') => items.map((x) => `<p${cls ? ` class="${cls}"` : ''}>${e(x)}</p>`).join('')
/* copyBlocks by slot, then order inside the slot: "several rows may share a slot" */
export const block = (slot, n = 0) => (S.copyBlocks ?? []).filter((b) => b.slot === slot)[n] ?? null
export const httpsOnly = (u) => (/^https:\/\//.test(u ?? '') ? u : null)

export const BIZ = S.businessName
export const WA_DIGITS = (S.contact?.whatsapp ?? '').replace(/^\+/, '')
export const PHONE = S.contact?.phone ?? ''
export const PHONE_PRINT = PHONE ? `+${PHONE.slice(1, 3)} ${PHONE.slice(3, 5)} ${PHONE.slice(5, 8)} ${PHONE.slice(8)}` : ''
export const EMAIL = S.contact?.email ?? ''
export const ADDRESS = S.contact?.address ?? ''
export const MAP = httpsOnly(S.contact?.mapUrl)

/* SCHEMA GAP heroLine: the title is the tagline up to its first comma ("Surf lessons in Weligama"), as concepts.md asks */
export const HERO_LINE = (S.tagline ?? BIZ).split(',')[0]
/* SCHEMA GAP pricesAsOf: the sentence inside the Before you book block, shown beside each price table too */
export const PRICE_DATE = (block('info', 0)?.body.match(/All prices are as of [^.]+\./) ?? [null])[0]

export const M = Object.fromEntries(Object.entries(L.msg).map(([k, v]) => [k, typeof v === 'string' ? t(v, { biz: BIZ }) : v]))
export const wa = (ask) => `https://wa.me/${WA_DIGITS}?text=` + encodeURIComponent(`${M.hello}${ask}.`).replace(/'/g, '%27')
export const lessonAsk = (name) => (M.no_article.includes(name) ? name : t(M.the, { x: name }))

export const date = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/* ---- rentals. SCHEMA GAP rentals[].kind / .duration: "<kind>, <duration>" in the label. A row that does not read that
   way is listed under the table instead of being lost. ---- */
const SOFT = L.soft, HARD = L.hard
export function rentalTable() {
  const rows = new Map(), extra = []
  for (const r of S.rentals ?? []) {
    const [kind, dur] = r.label.includes(', ') ? [r.label.slice(0, r.label.indexOf(', ')), r.label.slice(r.label.indexOf(', ') + 2)] : []
    if (kind !== SOFT && kind !== HARD) { extra.push(r); continue }
    if (!rows.has(dur)) rows.set(dur, {})
    rows.get(dur)[kind === SOFT ? 'soft' : 'hard'] = r
  }
  return { rows: [...rows].map(([dur, v]) => ({ dur, soft: v.soft, hard: v.hard })), extra }
}
/* ---- priceList. SCHEMA GAP priceList[].group: things to buy say so in the label; of the rest, the first three are the
   surf tours (the third offer block, para 1) and the others the outings. ---- */
const SURF_TOURS = 3
export const SHOP = (S.priceList ?? []).filter((r) => r.label.includes('to buy'))
export const TOURS = (S.priceList ?? []).filter((r) => !r.label.includes('to buy')).map((r, i) => {
  const m = r.label.match(/^(.*?)\s*(\(.*\))?$/)
  return { ...r, name: m[1], when: m[2] ?? '', outing: i >= SURF_TOURS, firstOuting: i === SURF_TOURS }
})

/* ---- boards. SCHEMA GAP board sizes as rows: lengths are read from the board-rental paragraph, so an owner's edit of
   that paragraph reaches the chart. Outlines, widths and colours are design, keyed by the words of the board's name
   (colours from the school's own photographs); no width is printed. A board the design does not know gets a plain
   outline; a paragraph with no lengths gives no chart. ---- */
const SHAPES = [
  ['fish', 20.5, 'point', 'swallow', '#E9A45C', '#F4CFA4', '#C97A2E'],
  ['shortboard', 18.5, 'point', 'squash', '#E9D8B8', '#F3EAD8', '#C72C60'],
  ['mid-length', 21, 'round', 'round', '#53969D', '#A5CBCF', '#3A7379'],
  ['mini-mal', 22.5, 'round', 'round', '#91B0C8', '#C6D6E3', '#6C8FA9'],
  ['soft-top', 24, 'round', 'squash', '#DE1446', '#F08CA3', '#AE0F36'],
  ['longboard', 23, 'round', 'round', '#1E78C8', '#8FBBE3', '#155C9C'],
]
const inches = (s) => { const [ft, i] = s.split("'"); return +ft * 12 + +(i || 0) }
export function boards() {
  const text = paras(block('offer', 1)).find((p) => /\d'\d+–\d'\d+/.test(p)) ?? ''
  const found = [...text.matchAll(/([A-Za-z][A-Za-z -]*?)\s+(\d'\d+)–(\d'\d+)/g)].map((m) => {
    const raw = m[1].replace(/^(?:we rent|and)\s+/i, '').trim()
    return { name: raw.charAt(0).toUpperCase() + raw.slice(1), lo: m[2], hi: m[3] }
  })
  const rank = (b) => { const i = SHAPES.findIndex((s) => b.name.toLowerCase().includes(s[0])); return i < 0 ? SHAPES.length : i }
  return found.sort((a, b) => rank(a) - rank(b)).map((b) => {
    const s = SHAPES[rank(b)] ?? ['', 22, 'round', 'round', '#91B0C8', '#C6D6E3', '#6C8FA9']
    return { ...b, a: inches(b.lo), b: inches(b.hi), W: s[1], nose: s[2], tail: s[3], deck: s[4], tip: s[5], rail: s[6] }
  })
}
const f = (x) => x.toFixed(1)
export function outline(L0, W, nose, tail) {
  const cx = W / 2, h = W / 2
  const [a, b] = nose === 'point' ? [[h * .14, 0], [h * .94, L0 * .2]] : [[h * .62, 0], [h * .98, L0 * .1]]
  const wp = L0 * .47
  const [tw, c] = { squash: [h * .46, 1.4], swallow: [h * .62, .4], round: [h * .34, 3.0] }[tail]
  const t1 = [h, L0 * .72], t2 = [tw + h * .2, L0 * .95]
  const right = `M${f(cx)},0 C${f(cx + a[0])},${f(a[1])} ${f(cx + b[0])},${f(b[1])} ${f(cx + h)},${f(wp)} C${f(cx + t1[0])},${f(t1[1])} ${f(cx + t2[0])},${f(t2[1])} ${f(cx + tw)},${f(L0 - c)}`
  let mid
  if (tail === 'swallow') mid = `L${f(cx + tw - .4)},${f(L0)} L${f(cx)},${f(L0 - W * .24)} L${f(cx - tw + .4)},${f(L0)} L${f(cx - tw)},${f(L0 - c)}`
  else if (tail === 'round') mid = `C${f(cx + tw)},${f(L0 - .6)} ${f(cx + tw * .5)},${f(L0)} ${f(cx)},${f(L0)} C${f(cx - tw * .5)},${f(L0)} ${f(cx - tw)},${f(L0 - .6)} ${f(cx - tw)},${f(L0 - c)}`
  else mid = `Q${f(cx + tw)},${f(L0)} ${f(cx + tw - 1.6)},${f(L0)} L${f(cx - tw + 1.6)},${f(L0)} Q${f(cx - tw)},${f(L0)} ${f(cx - tw)},${f(L0 - c)}`
  const left = `C${f(cx - t2[0])},${f(t2[1])} ${f(cx - t1[0])},${f(t1[1])} ${f(cx - h)},${f(wp)} C${f(cx - b[0])},${f(b[1])} ${f(cx - a[0])},${f(a[1])} ${f(cx)},0 Z`
  return `${right} ${mid} ${left}`
}

export const ICON = {
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.3-.9 2.1 0 .9.4 1.9 1 2.6 1.2 1.7 2.7 3 4.6 3.8.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.6-.2Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.4 9 3c.5-.1 1 .2 1.2.7l1.1 2.8c.2.4 0 .9-.3 1.2L9.5 9.1a12.6 12.6 0 0 0 5.4 5.4l1.4-1.5c.3-.3.8-.5 1.2-.3l2.8 1.1c.5.2.8.7.7 1.2l-.4 2.4c-.1.9-.9 1.6-1.8 1.6C10.7 19 5 13.300 5 5.200c0-.9.7-1.700 1.600-1.800Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.5l8 5 8-5V7H4Zm16 2.900-8 5-8-5V17h16V9.900Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.500 7.500 0 0 0-7.500 7.500C4.500 15 12 22 12 22s7.500-7 7.500-12.500A7.500 7.500 0 0 0 12 2Zm0 10.300a2.800 2.800 0 1 1 0-5.600 2.800 2.800 0 0 1 0 5.600Z"/></svg>',
}
