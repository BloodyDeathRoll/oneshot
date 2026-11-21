#!/usr/bin/env node
// sites/the-sandhya/final/scripts/photos.mjs — the build's photo step: the owner uploads one original,
// the build crops, resizes and compresses it (playbook §9). Reads src/tenant/content.json (and the room
// galleries in src/gaps/gaps.json), cuts every rendition src/lib/layout.mjs names for the photograph's
// place on the page, writes public/photos/*.webp and src/tenant/photos.generated.json.
// Refuses a full-bleed photograph under 1200 px wide (hard constraint 7). Run by `npm run build`;
// its output is listed by scripts/make-media.sh's `# media:` header.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { ROLES, PHOTO_ROWS, BLEED_ROLES, MIN_BLEED_WIDTH, cropBox, stem } from '../src/lib/layout.mjs'

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..')
const content = JSON.parse(readFileSync(join(SITE, 'src/tenant/content.json'), 'utf8'))
const gapsFile = join(SITE, 'src/gaps/gaps.json')
const gaps = existsSync(gapsFile) ? JSON.parse(readFileSync(gapsFile, 'utf8')) : {}
const OUT = join(SITE, 'public/photos')
mkdirSync(OUT, { recursive: true })

const site = content.locales.en
const uses = [] // [media, role, dir]
site.photos.forEach((p, i) => { if (PHOTO_ROWS[i]) uses.push([p.image, PHOTO_ROWS[i][1], 'src/tenant/media']) })
for (const r of site.rooms ?? []) if (r.photo) uses.push([r.photo, 'slide', 'src/tenant/media'])
for (const g of gaps.roomGalleries ?? []) for (const m of g) uses.push([m, 'slide', 'src/gaps/media'])

const out = {}
let made = 0
for (const [m, role, dir] of uses) {
  const src = join(SITE, dir, m.filename)
  if (!existsSync(src)) throw new Error(`${m.filename}: missing in ${dir} (run scripts/make-media.sh)`)
  const meta = await sharp(src).metadata()
  if (BLEED_ROLES.has(role) && meta.width < MIN_BLEED_WIDTH) throw new Error(`${m.filename}: ${meta.width} px is under ${MIN_BLEED_WIDTH} px and cannot be drawn full-bleed (hard constraint 7)`)
  const entry = (out[m.filename] ??= {})
  for (const v of ROLES[role]) {
    const box = cropBox(meta.width, meta.height, v.ratio, m.focalX ?? 50, m.focalY ?? 50)
    const width = v.upscale ? v.w : Math.min(v.w, box.width)
    const height = Math.round((width * box.height) / box.width)
    const name = `${stem(m.filename)}-${v.key}-${width}.webp`
    const file = join(OUT, name)
    if (!existsSync(file) || statSync(file).mtimeMs < statSync(src).mtimeMs) {
      let img = sharp(src).extract(box).resize(width, height, { kernel: 'lanczos3' })
      if (v.sharpen) img = img.sharpen({ sigma: 0.9, m1: 0.45, m2: 0.45 })
      await img.webp({ quality: v.q, effort: 6, smartSubsample: true }).toFile(file)
      made++
    }
    entry[v.key] = { src: `photos/${name}`, width, height }
  }
}
writeFileSync(join(SITE, 'src/tenant/photos.generated.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`photos: ${Object.keys(out).length} photographs, ${made} renditions written`)
