#!/usr/bin/env node
/**
 * Build step after the publisher's video step (cms/publisher/src/video.mjs): one extra rendition of
 * the hero video for portrait phones, made from the same single original (schema v0.9: one upload,
 * the build makes every rendition). Template-owned, because the crop is this design's.
 *
 * Why: the picked mockup (unique) played a 668×1080 phone cut of its hero loop at native resolution. The v0.9
 * tiers are all landscape; on a 390×844 phone a 1280×720 tier is cover-cropped to about a quarter of
 * its width and drawn ~2.3× enlarged. A portrait crop of the original at its full height keeps the
 * phone picture as sharp as the mockup's (it is drawn ~1.7× instead) and stays under the 2 MB
 * phone cap. The mockup's phone crop was centred in every shot, so one centred crop of the 1920×1080 upload
 * reproduces it (CROP_X 0.5). Adapted from sites/global-surf-adventures/final (same business, run 02).
 *
 *   in:  src/tenant/content.json (heroVideo, heroVideoPoster), src/tenant/media/<filename>
 *   out: public/video/<stem>.p<w>.{mp4,webm}, public/video/<poster-stem>.p<w>.{webp,jpg}
 *        src/tenant/videos.portrait.json
 *        { recipe, video: { src mp4/webm + type, width, height, bytes }, poster: { webp, jpg, width, height, lq } }
 *        lq = a ~8 KB WebP of the portrait poster as a data: URI, drawn as the phone hero's background
 *        so the first paint already carries the picture (as the mockup did).
 * Nothing is written, and the manifest is removed, when the site has no hero video.
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const RECIPE = 'p1'
const CROP_X = 0.5
const RATIO = 668 / 1080 // width / height: the unique mockup's phone master (hero-p668)
const CAP = 2_000_000
const MAX_SECONDS = 20
const TYPE = { mp4: 'video/mp4; codecs="avc1.640028"', webm: 'video/webm; codecs="av01.0.08M.08"' }

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tenant = path.join(site, 'src', 'tenant')
const outDir = path.join(site, 'public', 'video')
const manifestPath = path.join(tenant, 'videos.portrait.json')
const cacheDir = process.env.VIDEO_CACHE_DIR || path.join(os.homedir(), '.cache', 'oneshot', 'video')

const run = (bin, args) => {
  const r = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 64 << 20 })
  if (r.error) throw new Error(`${bin}: ${r.error.message}`)
  if (r.status !== 0) throw new Error(`${bin} failed (${r.status}): ${(r.stderr || '').trim().split('\n').slice(-4).join(' | ')}`)
  return r.stdout
}
const probe = (file) => {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file]))
  const v = j.streams.find((s) => s.codec_type === 'video')
  return { width: v.width, height: v.height, duration: Number(j.format?.duration ?? v.duration ?? 0) }
}
const stemOf = (filename) => path.basename(filename, path.extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
const even = (n) => Math.floor(n / 2) * 2

const content = JSON.parse(readFileSync(path.join(tenant, 'content.json'), 'utf8'))
const doc = content.locales?.en ?? {}
const video = doc.heroVideo && typeof doc.heroVideo === 'object' ? doc.heroVideo : null
const poster = doc.heroVideoPoster && typeof doc.heroVideoPoster === 'object' ? doc.heroVideoPoster : null
if (!video || !poster) {
  rmSync(manifestPath, { force: true })
  console.log('video-portrait: no hero video — nothing to do')
  process.exit(0)
}

const crop = ({ width, height }) => {
  const h = even(height), w = even(Math.min(width, h * RATIO))
  return { w, h, x: even((width - w) * CROP_X), y: even((height - h) / 2) }
}

/* the clip: cached by the original's sha256, like the publisher's encodes */
const src = path.join(tenant, 'media', path.basename(video.filename))
const sha = createHash('sha256').update(readFileSync(src)).digest('hex')
const cdir = path.join(cacheDir, `portrait-${sha.slice(0, 32)}-${RECIPE}-${CROP_X}`)
const p = probe(src)
const c = crop(p)
if (!existsSync(path.join(cdir, 'done.json'))) {
  const tmp = `${cdir}.tmp-${process.pid}`
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })
  const length = Math.min(MAX_SECONDS, p.duration || MAX_SECONDS)
  const vf = `crop=${c.w}:${c.h}:${c.x}:${c.y},format=yuv420p`
  let crf = 24
  for (let i = 0; i < 4; i++) {
    run('ffmpeg', ['-y', '-v', 'error', '-t', String(length), '-i', src, '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1',
      '-vf', vf, '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', String(crf), '-movflags', '+faststart', path.join(tmp, 'p.mp4')])
    if (statSync(path.join(tmp, 'p.mp4')).size <= CAP) break
    crf += 2
  }
  const kbps = Math.floor((CAP * 8 * 0.9) / length / 1000)
  run('ffmpeg', ['-y', '-v', 'error', '-t', String(length), '-i', src, '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1',
    '-vf', vf, '-c:v', 'libsvtav1', '-preset', '8', '-crf', '36', '-svtav1-params', `mbr=${kbps}`, path.join(tmp, 'p.webm')])
  writeFileSync(path.join(tmp, 'done.json'), JSON.stringify({ crop: c }))
  rmSync(cdir, { recursive: true, force: true })
  renameSync(tmp, cdir)
}
mkdirSync(outDir, { recursive: true })
const vstem = `${stemOf(video.filename)}.p${c.w}`
const out = {}
for (const kind of ['webm', 'mp4']) {
  const name = `${vstem}.${kind}`
  copyFileSync(path.join(cdir, `p.${kind}`), path.join(outDir, name))
  const bytes = statSync(path.join(outDir, name)).size
  if (bytes > CAP) console.warn(`video-portrait: ${name} is over the ${CAP} byte phone cap`)
  out[kind] = { src: `video/${name}`, type: TYPE[kind], width: c.w, height: c.h, bytes }
}

/* the poster: the same crop of the poster frame, WebP + JPEG, plus the inline low-quality copy */
const psrc = path.join(tenant, 'media', path.basename(poster.filename))
const pp = probe(psrc)
const pc = crop(pp)
const pstem = `${stemOf(poster.filename)}.p${pc.w}`
const pvf = `crop=${pc.w}:${pc.h}:${pc.x}:${pc.y}`
run('ffmpeg', ['-y', '-v', 'error', '-i', psrc, '-frames:v', '1', '-vf', pvf, '-c:v', 'libwebp', '-quality', '74', path.join(outDir, `${pstem}.webp`)])
run('ffmpeg', ['-y', '-v', 'error', '-i', psrc, '-frames:v', '1', '-vf', pvf, '-q:v', '3', path.join(outDir, `${pstem}.jpg`)])
const lqFile = path.join(os.tmpdir(), `gs-lq-${process.pid}.webp`)
run('ffmpeg', ['-y', '-v', 'error', '-i', psrc, '-frames:v', '1', '-vf', `${pvf},scale=270:-2`, '-c:v', 'libwebp', '-quality', '42', lqFile])
const lq = 'data:image/webp;base64,' + readFileSync(lqFile).toString('base64')
rmSync(lqFile, { force: true })

writeFileSync(manifestPath, JSON.stringify({
  recipe: RECIPE,
  video: { [video.filename]: { crop: c, ...out } },
  poster: { [poster.filename]: { webp: `video/${pstem}.webp`, jpg: `video/${pstem}.jpg`, width: pc.w, height: pc.h, lq } },
}, null, 1) + '\n')
console.log(`video-portrait: ${vstem} (${c.w}×${c.h} at x ${c.x}; webm ${out.webm.bytes} B, mp4 ${out.mp4.bytes} B) + poster → public/video/`)
