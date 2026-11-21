#!/usr/bin/env node
/**
 * Build step (runs before `astro build`): turn the tenant's photos into what the page serves. Owners upload whatever
 * their phone gives them; the site crops, resizes and compresses (playbook §9). photos[n] fills slot n (src/lib/slots.mjs).
 * Never enlarged.   out: public/photos/*, src/tenant/photos.generated.json   { <cut id>: { src, w, h, bytes } }
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join, dirname, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { SLOTS } from '../src/lib/slots.mjs'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const site = JSON.parse(readFileSync(join(final, 'src', 'tenant', 'content.json'), 'utf8')).locales.en
const outDir = join(final, 'public', 'photos')
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

/* the mockup's grade, ffmpeg eq=contrast=1.1:saturation=1.18:gamma=0.98: on Y and on chroma, BT.601 limited range */
async function graded(pipe) {
  const { data, info } = await pipe.removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const lut = new Float64Array(256)
  for (let i = 0; i < 256; i++) lut[i] = 256 * Math.pow(Math.max(0, 1.1 * (i / 256 - 0.5) + 0.5), 1 / 0.98)
  const clip = (v) => Math.max(0, Math.min(255, Math.round(v)))
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const y = lut[clip(16 + 0.257 * r + 0.504 * g + 0.098 * b)] - 16
    const u = 1.18 * (-0.148 * r - 0.291 * g + 0.439 * b), v = 1.18 * (0.439 * r - 0.368 * g - 0.071 * b)
    data[i] = clip(1.164 * y + 1.596 * v)
    data[i + 1] = clip(1.164 * y - 0.392 * u - 0.813 * v)
    data[i + 2] = clip(1.164 * y + 2.017 * u)
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
}

const manifest = {}
let total = 0, n = 0
for (const [i, slot] of SLOTS.entries()) {
  const m = site.photos?.[i]?.image
  if (!m?.filename) continue
  const src = join(final, 'src', 'tenant', 'media', basename(m.filename))
  const stem = basename(m.filename, extname(m.filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const own = basename(m.filename) === slot.file
  const meta = await sharp(src).rotate().metadata()
  const turned = (meta.orientation ?? 1) >= 5
  const W = turned ? meta.height : meta.width, H = turned ? meta.width : meta.height
  for (const cut of slot.cuts) {
    let box
    if (cut.crop && own) {
      const [w, h, x, y] = cut.crop
      box = { left: x, top: y, width: w, height: h }
    } else if (cut.crop) {
      /* someone else's photograph: same ratio, the largest box, centred on the owner's focal point */
      const r = cut.crop[1] / cut.crop[0]
      let w = W, h = Math.round(W * r)
      if (h > H) { h = H; w = Math.round(H / r) }
      const fx = (m.focalX ?? 50) / 100, fy = (m.focalY ?? 50) / 100
      box = { left: Math.min(Math.max(Math.round(fx * W - w / 2), 0), W - w), top: Math.min(Math.max(Math.round(fy * H - h / 2), 0), H - h), width: w, height: h }
    } else box = { left: 0, top: 0, width: W, height: H }
    const width = Math.min(cut.w, box.width)
    let pipe = sharp(src).rotate().extract(box).resize({ width, kernel: 'lanczos3' })
    if (cut.grade && own) pipe = await graded(pipe)
    const name = cut.name.replace('{s}', stem) + (cut.jpeg ? '.jpg' : '.webp')
    const file = join(outDir, name)
    const out = await (cut.jpeg
      ? pipe.jpeg({ quality: 82, mozjpeg: true }).toFile(file)
      : pipe.webp({ quality: cut.q, effort: 6, smartSubsample: true }).toFile(file))
    manifest[cut.id] = { src: `photos/${name}`, w: out.width, h: out.height, bytes: statSync(file).size }
    total += out.size; n++
  }
}
writeFileSync(join(final, 'src', 'tenant', 'photos.generated.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`photos: ${n} files, ${Math.round(total / 1024)} KB -> public/photos, src/tenant/photos.generated.json`)
