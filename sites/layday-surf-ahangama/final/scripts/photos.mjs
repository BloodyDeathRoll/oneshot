#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses
 * (playbook §9). The design has two shapes, by slot (photos[] order is the owner's order):
 *   slots 0–1  the two large room photographs — 4:3 landscape (the mockup's 1024×768 frames)
 *   slots 2+   the pair and the two rows      — 4:5 portrait (the mockup's 576×720 crops)
 * Each photo is centre-cropped to its slot's shape at the largest possible size, then written at
 * the widths below that fit inside that crop — never enlarged — as WebP with a JPEG fallback.
 * File names are lowercase.
 *
 *   in:  src/tenant/content.json (photos[].image.filename), src/tenant/media/<filename>
 *   out: public/photos/<name>-<w>.{webp,jpg}, src/tenant/photos.generated.json
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
const SHAPE = (slot) => (slot < 2
  ? { ratio: 3 / 4, widths: [384, 512, 640, 768, 1024] }   // height / width
  : { ratio: 5 / 4, widths: [240, 320, 480, 576] })

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const manifest = {}
let slot = 0
for (const row of site.photos ?? []) {
  const m = row.image
  if (!m || typeof m !== 'object' || !m.filename) { slot++; continue }
  const { ratio, widths: WIDTHS } = SHAPE(slot++)
  const file = basename(m.filename)
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const src = join(final, 'src', 'tenant', 'media', file)
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  let cw = W, ch = Math.round(W * ratio)
  if (ch > H) { ch = H; cw = Math.round(H / ratio) }
  const left = Math.round((W - cw) / 2), top = Math.round((H - ch) / 2)
  const widths = WIDTHS.filter((w) => w <= cw)
  if (!widths.length) widths.push(cw)
  const sources = []
  for (const w of widths) {
    const h = Math.round(w * ratio)
    const base = () => sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h)
    await base().webp({ quality: 76 }).toFile(join(outDir, `${name}-${w}.webp`))
    await base().jpeg({ quality: 80, mozjpeg: true }).toFile(join(outDir, `${name}-${w}.jpg`))
    sources.push({ w, h, webp: `photos/${name}-${w}.webp`, jpg: `photos/${name}-${w}.jpg`,
      bytes: statSync(join(outDir, `${name}-${w}.webp`)).size })
  }
  manifest[m.filename] = { crop: [cw, ch], source: [W, H], sources }
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${Object.keys(manifest).length} photos → public/photos/`)
