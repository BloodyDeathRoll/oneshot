#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 * Plumbing pattern from sites/global-surf-adventures-v2/final/scripts/photos.mjs.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses (playbook §9).
 * photos[n] fills slot n (src/lib/slots.mjs); rooms[].photo and the room slides (SCHEMA GAP) get ROOM_SHAPES;
 * heroVideoPoster gets the hero's stills, videos[].poster the board window's. Each shape is a crop at the largest size the source allows,
 * written at the widths that fit inside it — never enlarged — as WebP. Lowercase names.
 * The atmosphere band (stock-003, CC BY-SA, `modify: false`) is copied byte for byte, never re-encoded.
 *
 *   out: public/photos/<name>-<key>-<w>.webp, public/atmo/<file>, src/tenant/photos.generated.json
 *        { <filename>: { source: [W, H], shapes: { <key>: { crop: [w, h], sources: [{ w, h, webp, bytes }] } } } }
 *        <key> = ('full' | 'r<h/w to 3 decimals>') + ('-' + tag when tagged)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync, existsSync, copyFileSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { SLOTS, ROOM_SHAPES, HERO_POSTER_SHAPES, REEL_POSTER_SHAPES } from '../src/lib/slots.mjs'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const gapsFile = join(final, 'src', 'gaps', 'gaps.json')
const gaps = existsSync(gapsFile) ? JSON.parse(readFileSync(gapsFile, 'utf8')) : {}
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const jobs = new Map() // filename → { src, shapes: Map(key → { ratio, widths:Set, opts }), focal }
const want = (filename, src, shapes, focal = null) => {
  if (!jobs.has(filename)) jobs.set(filename, { src, shapes: new Map(), focal })
  const j = jobs.get(filename)
  for (const [ratio, widths, opts = {}] of shapes) {
    const k = shapeKey(ratio, opts.tag)
    if (!j.shapes.has(k)) j.shapes.set(k, { ratio, widths: new Set(), opts })
    for (const w of widths) j.shapes.get(k).widths.add(w)
  }
}
const media = (f) => join(final, 'src', 'tenant', 'media', basename(f))
const gapMedia = (f) => join(final, 'src', 'gaps', 'media', basename(f))
const focalOf = (m) => [(m.focalX ?? 50) / 100, (m.focalY ?? 50) / 100]
;(site.photos ?? []).forEach((row, n) => {
  const m = row?.image
  if (!m?.filename || !SLOTS[n]) return // a row past the design's slots is not shown
  want(m.filename, media(m.filename), SLOTS[n].shapes, focalOf(m))
})
for (const room of site.rooms ?? []) {
  if (room.photo?.filename) want(room.photo.filename, media(room.photo.filename), ROOM_SHAPES, focalOf(room.photo))
  for (const g of gaps.roomGalleries?.[room.label] ?? []) want(g.file, gapMedia(g.file), ROOM_SHAPES)
}
if (site.heroVideoPoster?.filename) want(site.heroVideoPoster.filename, media(site.heroVideoPoster.filename), HERO_POSTER_SHAPES, focalOf(site.heroVideoPoster))
for (const row of site.videos ?? []) if (row?.poster?.filename) want(row.poster.filename, media(row.poster.filename), REEL_POSTER_SHAPES)

const manifest = {}
let files = 0
for (const [filename, { src, shapes, focal }] of jobs) {
  const name = basename(filename, extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  const entry = { source: [W, H], shapes: {} }
  for (const [k, { ratio, widths: widthSet, opts }] of shapes) {
    const r = ratio ?? H / W
    let cw = W, ch = Math.round(W * r)
    if (ch > H) { ch = H; cw = Math.round(H / r) }
    /* round 4: `zoom` cuts a smaller region of the same ratio (the water photo off its sky, the sign print off its cut end) */
    if (opts.zoom > 1) { cw = Math.round(cw / opts.zoom); ch = Math.round(ch / opts.zoom) }
    const fx = opts.focal && focal ? focal[0] : opts.fx ?? 0.5, fy = opts.focal && focal ? focal[1] : opts.fy ?? 0.5
    const left = Math.min(Math.max(Math.round(fx * W - cw / 2), 0), W - cw)
    const top = Math.min(Math.max(Math.round(fy * H - ch / 2), 0), H - ch)
    const all = [...widthSet].sort((a, b) => a - b)
    const widths = all.filter((w) => w <= cw)
    if (all.some((w) => w > cw) && !widths.includes(cw)) widths.push(cw) // never enlarged
    const sources = []
    for (const w of widths) {
      const h = Math.round(w * r)
      const stem = `${name}-${k}-${w}`
      let pipe = sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h)
      if (opts.sharpen) pipe = pipe.sharpen({ sigma: opts.sharpen }) // round 3: light sharpening on the phone poster
      await pipe.webp({ quality: opts.q ?? 76, effort: 6 }).toFile(join(outDir, `${stem}.webp`))
      sources.push({ w, h, webp: `photos/${stem}.webp`, bytes: statSync(join(outDir, `${stem}.webp`)).size })
      files++
    }
    /* round 3: the crop's mean colour (a tonal placeholder while a lazy photo loads), and for the hero poster the mean
       colours of its top, middle and bottom thirds (`bands`, drawn as a CSS gradient under the poster), so the first
       half-second on a slow phone is the picture's own tones, with no placeholder image */
    const hex = (ch) => '#' + ch.slice(0, 3).map((c) => Math.round(c.mean).toString(16).padStart(2, '0')).join('')
    /* sharp's stats() reads its input, not the pipeline, so each region is cut to a buffer first */
    const meanOf = async (rect) => hex((await sharp(await sharp(src).rotate().extract(rect).png().toBuffer()).stats()).channels)
    const bg = await meanOf({ left, top, width: cw, height: ch })
    let bands
    if (opts.bands) {
      bands = []
      for (let i = 0; i < 3; i++) bands.push(await meanOf({ left, top: top + Math.floor((i * ch) / 3), width: cw, height: Math.floor(ch / 3) }))
    }
    entry.shapes[k] = { crop: [cw, ch], bg, bands, sources }
  }
  manifest[filename] = entry
}

/* the atmosphere band: served as published (share-alike, modify: false) */
const atmoDir = join(final, 'public', 'atmo')
rmSync(atmoDir, { recursive: true, force: true })
if (gaps.atmosphere?.file) {
  mkdirSync(atmoDir, { recursive: true })
  const from = gapMedia(gaps.atmosphere.file), to = join(atmoDir, gaps.atmosphere.file)
  copyFileSync(from, to)
  execFileSync('cmp', [from, to]) // byte for byte
  files++
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${jobs.size} photos, ${files} files → public/photos/, public/atmo/`)
