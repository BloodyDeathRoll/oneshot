#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 * Plumbing pattern from sites/lotus-surf-house/final/scripts/photos.mjs; the slots and shapes are this design's.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses (playbook §9).
 * photos[n] fills slot n (src/lib/slots.mjs); heroVideoPoster, when there is one, gets HERO_POSTER_SHAPES.
 * Each shape is a crop of that ratio (times `zoom`), placed at sx / sy of the slack (the mockup's recipe), or
 * centred on the owner's focal point when they set one, written at the widths that fit inside it, never
 * enlarged, as WebP. Lowercase names.
 *
 * The palm shader's mask: when src/palms/<photo stem>.png exists (scripts/make-media.sh paints it for the
 * photograph it was drawn on, and for no other), a shape marked `mask` also cuts the mask with the very same box,
 * at half the shape's largest width, into public/palms/. A replaced hero photo has no mask, so no shader.
 *
 *   out: public/photos/<name>-<key>-<w>.webp, public/palms/<name>-<key>.webp, src/tenant/photos.generated.json
 *        { <filename>: { source: [W, H], shapes: { <key>: { crop: [w, h], sources: [{ w, h, webp, bytes }], mask? } } } }
 *        <key> = ('full' | 'r<h/w to 3 decimals>') + ('-' + tag when tagged)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync, existsSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { SLOTS, HERO_POSTER_SHAPES } from '../src/lib/slots.mjs'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
export const shapeKey = (ratio, tag) => (ratio == null ? 'full' : 'r' + ratio.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')) + (tag ? '-' + tag : '')

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const outDir = join(final, 'public', 'photos'), maskOut = join(final, 'public', 'palms')
for (const d of [outDir, maskOut]) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }) }

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
/* the owner's focal point (v0.10) counts only when it is set: Payload's default is the centre, 50 / 50 */
const focalOf = (m) => {
  const x = m.focalX ?? 50, y = m.focalY ?? 50
  return x === 50 && y === 50 ? null : [x / 100, y / 100]
}
;(site.photos ?? []).forEach((row, n) => {
  const m = row?.image
  if (!m?.filename || !SLOTS[n]) return // a row past the design's slots is not shown
  want(m.filename, media(m.filename), SLOTS[n].shapes, focalOf(m))
})
if (site.heroVideo?.filename && site.heroVideoPoster?.filename) want(site.heroVideoPoster.filename, media(site.heroVideoPoster.filename), HERO_POSTER_SHAPES)

const manifest = {}
let files = 0
for (const [filename, { src, shapes, focal }] of jobs) {
  const name = basename(filename, extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const maskSrc = join(final, 'src', 'palms', `${name}.png`)
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  const entry = { source: [W, H], shapes: {} }
  for (const [k, { ratio, widths: widthSet, opts }] of shapes) {
    const r = ratio ?? H / W
    let cw = W, ch = Math.round(W * r)
    if (ch > H) { ch = H; cw = Math.round(H / r) }
    if (opts.zoom && opts.zoom < 1) { cw = Math.round(cw * opts.zoom); ch = Math.round(cw * r) }
    let left, top
    if (focal) {
      left = Math.min(Math.max(Math.round(focal[0] * W - cw / 2), 0), W - cw)
      top = Math.min(Math.max(Math.round(focal[1] * H - ch / 2), 0), H - ch)
    } else {
      left = Math.round((opts.sx ?? 0.5) * (W - cw))
      top = Math.round((opts.sy ?? 0.5) * (H - ch))
    }
    const all = [...widthSet].sort((a, b) => a - b)
    const widths = all.filter((w) => w <= cw)
    if (all.some((w) => w > cw) && !widths.includes(cw)) widths.push(cw) // never enlarged
    const sources = []
    for (const w of widths) {
      const h = Math.round(w * r)
      const stem = `${name}-${k}-${w}`
      await sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h, { kernel: 'lanczos3' })
        .webp({ quality: opts.q ?? 72, effort: 6, smartSubsample: true }).toFile(join(outDir, `${stem}.webp`))
      sources.push({ w, h, webp: `photos/${stem}.webp`, bytes: statSync(join(outDir, `${stem}.webp`)).size })
      files++
    }
    entry.shapes[k] = { crop: [cw, ch], box: [left, top], sources }
    if (opts.mask && !focal && existsSync(maskSrc)) {
      const mw = Math.round(Math.max(...widths) / 2), mh = Math.round(mw * r)
      const mfile = `${name}-${k}.webp`
      await sharp(maskSrc).extract({ left, top, width: cw, height: ch }).resize(mw, mh, { kernel: 'lanczos3' }).greyscale()
        .webp({ quality: 80 }).toFile(join(maskOut, mfile))
      entry.shapes[k].mask = `palms/${mfile}`
      files++
    }
  }
  manifest[filename] = entry
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${jobs.size} photos, ${files} files → public/photos/, public/palms/`)
