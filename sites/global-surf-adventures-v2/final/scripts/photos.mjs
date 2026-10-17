#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the pages serve.
 * Adapted from sites/global-surf-adventures/final (same business, run 02) with per-shape quality,
 * crop centre and inline placeholders (src/lib/slots.mjs).
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses (playbook §9).
 * photos[n] fills slot n; room galleries (SCHEMA GAP) get ROOM_SHAPES; heroVideoPoster and videos[].poster
 * get WebP renditions. Each shape is a crop at the largest size the source allows, written at the widths
 * that fit inside it — never enlarged — as WebP (and JPEG for the hero poster's fallback). Lowercase names.
 *
 *   out: public/photos/<name>-<key>-<w>.webp, src/tenant/photos.generated.json
 *        { <filename>: { source: [W, H], shapes: { <key>: { crop: [w, h], tint?, sources: [{ w, h, webp, bytes }] } } } }
 *        <key> = ('full' | 'r<h/w to 3 decimals>') + ('-' + tag when tagged)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { SLOTS, ROOM_SHAPES, HERO_POSTER_SHAPES, CLIP_POSTER_SHAPES } from '../src/lib/slots.mjs'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const gapsFile = join(final, 'src', 'gaps', 'gaps.json')
const gaps = existsSync(gapsFile) ? JSON.parse(readFileSync(gapsFile, 'utf8')) : { rooms: [] }
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const jobs = new Map() // filename → { src, shapes: Map(key → { ratio, widths:Set, opts }) }
const want = (filename, src, shapes, jpg = false) => {
  if (!jobs.has(filename)) jobs.set(filename, { src, shapes: new Map(), jpg })
  const j = jobs.get(filename)
  j.jpg ||= jpg
  for (const [ratio, widths, opts = {}] of shapes) {
    const k = shapeKey(ratio, opts.tag)
    if (!j.shapes.has(k)) j.shapes.set(k, { ratio, widths: new Set(), opts })
    for (const w of widths) j.shapes.get(k).widths.add(w)
  }
}
const media = (f) => join(final, 'src', 'tenant', 'media', basename(f))
;(site.photos ?? []).forEach((row, n) => {
  const m = row?.image
  if (!m?.filename || !SLOTS[n]) return // a row past the design's slots is not shown
  want(m.filename, media(m.filename), SLOTS[n].shapes)
})
for (const r of gaps.rooms ?? []) for (const g of r.gallery ?? []) want(g.file, join(final, 'src', 'gaps', 'media', basename(g.file)), ROOM_SHAPES)
if (site.heroVideoPoster?.filename) want(site.heroVideoPoster.filename, media(site.heroVideoPoster.filename), HERO_POSTER_SHAPES, true)
for (const v of site.videos ?? []) if (v?.poster?.filename) want(v.poster.filename, media(v.poster.filename), CLIP_POSTER_SHAPES)

const manifest = {}
let files = 0
for (const [filename, { src, shapes, jpg }] of jobs) {
  const name = basename(filename, extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  const entry = { source: [W, H], shapes: {} }
  for (const [k, { ratio, widths: widthSet, opts }] of shapes) {
    const r = ratio ?? H / W
    let cw = W, ch = Math.round(W * r)
    if (ch > H) { ch = H; cw = Math.round(H / r) }
    const fx = opts.fx ?? 0.5, fy = opts.fy ?? 0.5
    const left = Math.min(Math.max(Math.round(fx * W - cw / 2), 0), W - cw)
    const top = Math.min(Math.max(Math.round(fy * H - ch / 2), 0), H - ch)
    const all = [...widthSet].sort((a, b) => a - b)
    const widths = all.filter((w) => w <= cw)
    if (all.some((w) => w > cw) && !widths.includes(cw)) widths.push(cw) // never enlarged
    const base = (w, h) => sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h)
    const sources = []
    for (const w of widths) {
      const h = Math.round(w * r)
      const stem = `${name}-${k}-${w}`
      await base(w, h).webp({ quality: opts.q ?? 76 }).toFile(join(outDir, `${stem}.webp`))
      const s = { w, h, webp: `photos/${stem}.webp`, bytes: statSync(join(outDir, `${stem}.webp`)).size }
      if (jpg) { await base(w, h).jpeg({ quality: 80, mozjpeg: true }).toFile(join(outDir, `${stem}.jpg`)); s.jpg = `photos/${stem}.jpg`; files++ }
      files++
      sources.push(s)
    }
    const shape = { crop: [cw, ch], sources }
    if (opts.tint) { // the crop's dominant colour: the ground a slow connection sees before the photograph
      const { dominant: d } = await base(64, Math.max(1, Math.round(64 * r))).stats()
      shape.tint = `rgb(${d.r},${d.g},${d.b})`
    }
    entry.shapes[k] = shape
  }
  manifest[filename] = entry
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${jobs.size} photos, ${files} files → public/photos/`)
