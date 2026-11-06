#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 * Plumbing from sites/coconut-surf-inn-guest-house-and-restaurant/final/scripts/photos.mjs; the slots and shapes are
 * this design's (src/lib/slots.mjs).
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses (playbook §9).
 * photos[n] fills slot n; rooms[].photo gets ROOM_SHAPES; the room galleries (SCHEMA GAP, src/gaps/gaps.json
 * roomGalleries) GALLERY_SHAPES; heroVideoPoster HERO_POSTER_SHAPES; videos[].poster CLIP_POSTER_SHAPES.
 * Each shape is a crop of the largest box of its ratio, centred on the owner's focal point when they set one (else on
 * the shape's fx/fy), written at the widths that fit inside it, never enlarged, as WebP. Lowercase names.
 *
 *   out: public/photos/<name>-<key>-<w>.webp, src/tenant/photos.generated.json
 *        { <filename>: { source: [W, H], shapes: { <key>: { crop: [w, h], sources: [{ w, h, webp, bytes }] } } } }
 *        <key> = ('full' | 'r<h/w to 3 decimals>') + ('-' + tag when tagged)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { SLOTS, ROOM_SHAPES, GALLERY_SHAPES, HERO_POSTER_SHAPES, CLIP_POSTER_SHAPES } from '../src/lib/slots.mjs'

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
const want = (filename, src, shapes, focal = null, extra = {}) => {
  if (!jobs.has(filename)) jobs.set(filename, { src, shapes: new Map(), focal })
  const j = jobs.get(filename)
  for (const [ratio, widths, opts = {}] of shapes) {
    const k = shapeKey(ratio, opts.tag)
    if (!j.shapes.has(k)) j.shapes.set(k, { ratio, widths: new Set(), opts: { ...opts, ...extra } })
    for (const w of widths) j.shapes.get(k).widths.add(w)
  }
}
const media = (f) => join(final, 'src', 'tenant', 'media', basename(f))
const gapMedia = (f) => join(final, 'src', 'gaps', 'media', basename(f))
/* the owner's focal point (v0.10) counts only when it is set: Payload's default is the centre, 50 / 50 */
const focalOf = (m) => {
  const x = m?.focalX ?? 50, y = m?.focalY ?? 50
  return x === 50 && y === 50 ? null : [x / 100, y / 100]
}
;(site.photos ?? []).forEach((row, n) => {
  const m = row?.image
  if (!m?.filename || !SLOTS[n]) return
  want(m.filename, media(m.filename), SLOTS[n].shapes, focalOf(m))
})
for (const room of site.rooms ?? []) {
  if (room.photo?.filename) want(room.photo.filename, media(room.photo.filename), ROOM_SHAPES, focalOf(room.photo))
  for (const g of gaps.roomGalleries?.[room.label] ?? []) want(g.file, gapMedia(g.file), GALLERY_SHAPES, null, { fy: (g.focalY ?? 50) / 100 })
}
if (site.heroVideoPoster?.filename) want(site.heroVideoPoster.filename, media(site.heroVideoPoster.filename), HERO_POSTER_SHAPES, focalOf(site.heroVideoPoster))
for (const v of site.videos ?? []) if (v.poster?.filename) want(v.poster.filename, media(v.poster.filename), CLIP_POSTER_SHAPES, focalOf(v.poster))

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
    const [fx, fy] = focal ?? [opts.fx ?? 0.5, opts.fy ?? 0.5]
    let left = Math.round(fx * W - cw / 2), top = Math.round(fy * H - ch / 2)
    left = Math.min(Math.max(left, 0), W - cw); top = Math.min(Math.max(top, 0), H - ch)
    const all = [...widthSet].sort((a, b) => a - b)
    const widths = all.filter((w) => w <= cw)
    if (all.some((w) => w > cw) && !widths.includes(cw)) widths.push(cw) // never enlarged
    const sources = []
    for (const w of widths) {
      const h = Math.round(w * r)
      const stem = `${name}-${k}-${w}`
      const out = join(outDir, `${stem}.webp`)
      await sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h, { kernel: 'lanczos3' })
        .webp({ quality: opts.q ?? 78, effort: 6, smartSubsample: true }).toFile(out)
      sources.push({ w, h, webp: `photos/${stem}.webp`, bytes: statSync(out).size })
      files++
    }
    entry.shapes[k] = { crop: [cw, ch], sources }
  }
  manifest[filename] = entry
}
/* the logo (SCHEMA GAP gaps.logo): 192 px PNG, alpha kept, used as the header/footer mask */
if (gaps.logo?.file && existsSync(gapMedia(gaps.logo.file))) {
  await sharp(gapMedia(gaps.logo.file)).resize(192, 192, { fit: 'inside' }).png({ compressionLevel: 9, palette: true }).toFile(join(outDir, 'logo-192.png'))
  files++
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${jobs.size} photos, ${files} files → public/photos/`)
