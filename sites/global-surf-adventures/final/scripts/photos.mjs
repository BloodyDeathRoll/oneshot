#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the pages serve.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses
 * (playbook §9). Which shapes each photograph needs is decided by its slot (src/lib/slots.mjs):
 * photos[n] fills slot n. The room galleries (SCHEMA GAP, src/gaps/gaps.json) get ROOM_SHAPES.
 * Each shape is a centre crop at the largest size the source allows, written at the shape's widths
 * that fit inside the crop — never enlarged — as WebP with a JPEG fallback. File names are lowercase.
 *
 *   in:  src/tenant/content.json (photos[].image.filename) + src/tenant/media/<filename>
 *        src/gaps/gaps.json (rooms[].gallery[].file)     + src/gaps/media/<file>
 *   out: public/photos/<name>-<shape>-<w>.{webp,jpg}, src/tenant/photos.generated.json
 *        { <filename>: { source: [W, H], shapes: { <key>: { crop: [w, h], sources: [{ w, h, webp, jpg, bytes }] } } } }
 *        <key> = 'full' or 'r<h/w to 3 decimals>' (r1.25 = 4:5 portrait, r0.667 = 3:2, r0.563 = 16:9)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { SLOTS, ROOM_SHAPES } from '../src/lib/slots.mjs'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
export const shapeKey = (ratio) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''))

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const gapsFile = join(final, 'src', 'gaps', 'gaps.json')
const gaps = existsSync(gapsFile) ? JSON.parse(readFileSync(gapsFile, 'utf8')) : { rooms: [] }
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

/* filename → { src, shapes: Map(key → [ratio, Set(widths)]) } */
const jobs = new Map()
const want = (filename, src, shapes) => {
  if (!jobs.has(filename)) jobs.set(filename, { src, shapes: new Map() })
  const j = jobs.get(filename)
  for (const [ratio, widths] of shapes) {
    const k = shapeKey(ratio)
    if (!j.shapes.has(k)) j.shapes.set(k, [ratio, new Set()])
    for (const w of widths) j.shapes.get(k)[1].add(w)
  }
}
;(site.photos ?? []).forEach((row, n) => {
  const m = row?.image
  if (!m || typeof m !== 'object' || !m.filename || !SLOTS[n]) return // a row past the design's slots is not shown
  want(m.filename, join(final, 'src', 'tenant', 'media', basename(m.filename)), SLOTS[n].shapes)
})
for (const r of gaps.rooms ?? []) for (const g of r.gallery ?? []) want(g.file, join(final, 'src', 'gaps', 'media', basename(g.file)), ROOM_SHAPES)

const manifest = {}
let files = 0
for (const [filename, { src, shapes }] of jobs) {
  const name = basename(filename, extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  const entry = { source: [W, H], shapes: {} }
  for (const [k, [ratio, widthSet]] of shapes) {
    const r = ratio ?? H / W
    let cw = W, ch = Math.round(W * r)
    if (ch > H) { ch = H; cw = Math.round(H / r) }
    const left = Math.round((W - cw) / 2), top = Math.round((H - ch) / 2)
    const all = [...widthSet].sort((a, b) => a - b)
    const widths = all.filter((w) => w <= cw)
    // a source smaller than the largest width still gets its own full size (never enlarged)
    if (all.some((w) => w > cw) && !widths.includes(cw)) widths.push(cw)
    const sources = []
    for (const w of widths) {
      const h = Math.round(w * r)
      const base = () => sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h)
      const stem = `${name}-${k}-${w}`
      await base().webp({ quality: 76 }).toFile(join(outDir, `${stem}.webp`))
      await base().jpeg({ quality: 80, mozjpeg: true }).toFile(join(outDir, `${stem}.jpg`))
      files += 2
      sources.push({ w, h, webp: `photos/${stem}.webp`, jpg: `photos/${stem}.jpg`, bytes: statSync(join(outDir, `${stem}.webp`)).size })
    }
    entry.shapes[k] = { crop: [cw, ch], sources }
  }
  manifest[filename] = entry
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${jobs.size} photos, ${files} files → public/photos/`)
