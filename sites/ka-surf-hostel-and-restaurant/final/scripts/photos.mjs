#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses
 * (playbook §9). The design's one shape is 3:4 (every print, every beach crop), so every photo is
 * centre-cropped to 3:4 at its largest possible size, then written at the widths below that fit
 * inside that crop — never enlarged — as WebP with a JPEG fallback. File names are lowercase.
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
const WIDTHS = [264, 384, 480, 576, 768, 960]
const RATIO = 4 / 3 // height / width

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const manifest = {}
for (const row of site.photos ?? []) {
  const m = row.image
  if (!m || typeof m !== 'object' || !m.filename) continue
  const file = basename(m.filename)
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const src = join(final, 'src', 'tenant', 'media', file)
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  // largest centred 3:4 window
  let cw = W, ch = Math.round(W * RATIO)
  if (ch > H) { ch = H; cw = Math.round(H / RATIO) }
  const left = Math.round((W - cw) / 2), top = Math.round((H - ch) / 2)
  const widths = WIDTHS.filter((w) => w <= cw)
  if (!widths.length) widths.push(cw)
  const sources = []
  for (const w of widths) {
    const h = Math.round(w * RATIO)
    const base = () => sharp(src).rotate().extract({ left, top, width: cw, height: ch }).resize(w, h)
    await base().webp({ quality: 74 }).toFile(join(outDir, `${name}-${w}.webp`))
    await base().jpeg({ quality: 78, mozjpeg: true }).toFile(join(outDir, `${name}-${w}.jpg`))
    sources.push({ w, h, webp: `photos/${name}-${w}.webp`, jpg: `photos/${name}-${w}.jpg`,
      bytes: statSync(join(outDir, `${name}-${w}.webp`)).size })
  }
  manifest[m.filename] = { crop: [cw, ch], source: [W, H], sources }
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${Object.keys(manifest).length} photos → public/photos/`)
