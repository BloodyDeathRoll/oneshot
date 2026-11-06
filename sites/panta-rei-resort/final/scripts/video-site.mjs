#!/usr/bin/env node
/**
 * This template's own video step. Runs after the publisher's cms/publisher/src/video.mjs (the schema's generic tiers
 * d1920, m1280, m720) and before scripts/photos.mjs. Plumbing from sites/cheeky-monkey/final/scripts/video-site.mjs;
 * the tiers are this design's. Like video.mjs it reads only content.json and the uploads, so it works the same for an
 * owner's replacement clip after a sale.
 *
 *   heroVideo:  p1080, a portrait tier for portrait phones: a 9:16 column at the original's full height (608x1080 from
 *               a 1920x1080 upload), centred on heroVideoPoster's focalX (the same crop as the phone poster in
 *               scripts/photos.mjs, so the hand-off from poster to film does not move). Crop only, no scaling.
 *               The hero's m720 is pruned (never served).
 *   videos[0]:  p900, the Welcome frame: a 4:5 crop at full height (864x1080) centred on its poster's focalX, scaled to
 *               720x900 (the round-2 mockup's welcome-720). Its d1920 / m1280 / m720 are pruned.
 *   videos[1]:  the fitness clip keeps the publisher's m720 (720x1280, a portrait upload) only; d1920 / m1280 pruned.
 *   Posters:    the publisher's poster JPEGs are removed: this template paints posters from photos.mjs's WebP crops.
 *
 *   out: public/video/<stem>.p1080.{webm,mp4}, public/video/<stem>.p900.{webm,mp4}, src/tenant/videos.generated.json
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const tenant = join(final, 'src', 'tenant')
const manifestPath = join(tenant, 'videos.generated.json')
if (!existsSync(manifestPath)) { console.log('video-site: no videos.generated.json, nothing to do'); process.exit(0) }
const site = JSON.parse(readFileSync(join(tenant, 'content.json'), 'utf8')).locales.en
const man = JSON.parse(readFileSync(manifestPath, 'utf8'))
const outDir = join(final, 'public', 'video')
const TYPE = { mp4: 'video/mp4; codecs="avc1.640028"', webm: 'video/webm; codecs="av01.0.08M.08"' }

const run = (args) => {
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...args], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(`ffmpeg: ${(r.stderr || '').trim().split('\n').slice(-3).join(' | ')}`)
}
const probe = (f) => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', f], { encoding: 'utf8' })
  const j = JSON.parse(r.stdout)
  return { width: j.streams[0].width, height: j.streams[0].height, duration: Math.min(20, Number(j.format.duration)) }
}
const stemOf = (f) => basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')

/* one tier: vf = crop/scale chain; cap in bytes; both codecs, re-encoded with a lower rate until under the cap */
const tier = (src, stem, name, vf, cap) => {
  const { duration } = probe(src)
  const out = {}
  for (const kind of ['webm', 'mp4']) {
    const file = join(outDir, `${stem}.${name}.${kind}`)
    let kbps = Math.floor((cap * 8 * 0.85) / duration / 1000)
    for (let i = 0; i < 4; i++) {
      const codec = kind === 'webm'
        ? ['-c:v', 'libsvtav1', '-preset', '6', '-crf', '34', '-svtav1-params', `mbr=${kbps}`]
        : ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', '21', '-maxrate', `${kbps}k`, '-bufsize', `${kbps * 2}k`, '-movflags', '+faststart']
      run(['-t', String(duration), '-i', src, '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-vf', `${vf},format=yuv420p`, ...codec, file])
      if (statSync(file).size <= cap) break
      kbps = Math.floor(kbps * 0.8)
    }
    const p = probe(file)
    out[kind] = { src: `video/${basename(file)}`, type: TYPE[kind], width: p.width, height: p.height, bytes: statSync(file).size }
  }
  return out
}
const drop = (entry, tierName) => {
  const t = entry?.tiers?.[tierName]
  if (!t) return
  for (const k of ['webm', 'mp4']) {
    if (!t[k]) continue
    const used = Object.entries(entry.tiers).some(([n, o]) => n !== tierName && o[k]?.src === t[k].src)
    if (!used) rmSync(join(final, 'public', t[k].src), { force: true })
  }
  delete entry.tiers[tierName]
}
const centred = (W, cw, focalX) => Math.min(Math.max(Math.round(((focalX ?? 50) / 100) * W - cw / 2), 0), W - cw)

/* the hero: portrait tier */
const hv = site.heroVideo, hp = site.heroVideoPoster
if (hv?.filename && man.videos[hv.filename]) {
  const src = join(tenant, 'media', basename(hv.filename))
  const { width: W, height: H } = probe(src)
  const cw = Math.round((H * 9) / 16 / 2) * 2
  const e = man.videos[hv.filename]
  e.tiers.p1080 = tier(src, stemOf(hv.filename), 'p1080', `crop=${cw}:${H}:${centred(W, cw, hp?.focalX)}:0`, 2_000_000)
  drop(e, 'm720')
}
/* videos[0]: the Welcome frame, 4:5 */
const w0 = (site.videos ?? [])[0]
if (w0?.video?.filename && man.videos[w0.video.filename]) {
  const src = join(tenant, 'media', basename(w0.video.filename))
  const { width: W, height: H } = probe(src)
  const cw = Math.round((H * 4) / 5 / 2) * 2
  const e = man.videos[w0.video.filename]
  e.tiers.p900 = tier(src, stemOf(w0.video.filename), 'p900', `crop=${cw}:${H}:${centred(W, cw, w0.poster?.focalX)}:0,scale=720:900:flags=lanczos,fps=30`, 1_500_000)
  drop(e, 'd1920'); drop(e, 'm1280'); drop(e, 'm720')
}
/* videos[1]: the fitness clip, m720 only */
const w1 = (site.videos ?? [])[1]
if (w1?.video?.filename && man.videos[w1.video.filename]) {
  const e = man.videos[w1.video.filename]
  if (e.tiers.m720) { drop(e, 'd1920'); drop(e, 'm1280') }
}
for (const [f, sizes] of Object.entries(man.posters ?? {})) { for (const o of Object.values(sizes)) rmSync(join(final, 'public', o.src), { force: true }); delete man.posters[f] }
writeFileSync(manifestPath, JSON.stringify(man, null, 2) + '\n')
for (const [f, e] of Object.entries(man.videos)) console.log(`video-site: ${f}: ${Object.entries(e.tiers).map(([n, t]) => `${n} ${Object.entries(t).map(([k, o]) => `${k} ${(o.bytes / 1e6).toFixed(2)} MB`).join(' / ')}`).join(' · ')}`)
