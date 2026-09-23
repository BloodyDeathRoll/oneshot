#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves.
 *
 * Owners upload whatever their phone gives them; the site crops, resizes and compresses
 * (playbook §9). The gold page has two shapes, by slot (photos[] order is the owner's order):
 *   slots 0–2  the night print and the two "where" prints — 4:3 landscape (the gold page's
 *              1024×768, 960×720 and 820×615 frames)
 *   slots 3+   the strip — 4:5 portrait (the gold page's 600×750 crops, references.md #26)
 * Each photo is cropped to its slot's shape at the largest possible size, centred on the media
 * document's focal point (focalX/focalY, Payload's own fields; 50/50 when unset), then written at
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
const SHAPE = (slot) => (slot < 3
  ? { ratio: 3 / 4, widths: [480, 640, 820, 1024] }   // height / width
  : { ratio: 5 / 4, widths: [300, 450, 600] })

const content = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8'))
const site = content.locales.en
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const pct = (v) => (Number.isFinite(+v) && v !== null ? Math.min(100, Math.max(0, +v)) : 50) / 100
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
  const left = Math.round(Math.min(W - cw, Math.max(0, pct(m.focalX) * W - cw / 2)))
  const top = Math.round(Math.min(H - ch, Math.max(0, pct(m.focalY) * H - ch / 2)))
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
  manifest[m.filename] = { crop: [cw, ch], offset: [left, top], source: [W, H], sources }
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${Object.keys(manifest).length} photos → public/photos/`)
