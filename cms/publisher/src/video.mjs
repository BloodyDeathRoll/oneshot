#!/usr/bin/env node
/**
 * Build step for video (schema v0.9): the owner uploads ONE file per video; the build makes what
 * the page serves, the way scripts/photos.mjs does for photos. Template-agnostic, so the publisher
 * runs it for every site (after the template's scripts/fetch-tenant.mjs, before its photos step);
 * a template can also run it itself: `node <repo>/cms/publisher/src/video.mjs <site-dir>`.
 *
 *   in:  src/tenant/content.json (locales.en: heroVideo, heroVideoPoster, videos[].video/.poster)
 *        src/tenant/media/<filename>   — a file that is missing is downloaded from the CMS when
 *        CMS_URL + BUILDER_API_KEY are set (templates whose fetch step predates v0.8 fetch photos only)
 *   out: public/video/<stem>.{d1920,m1280,m720}.mp4   H.264 high, yuv420p, +faststart, NO audio track
 *        public/video/<stem>.{d1920,m1280}.webm       AV1 (SVT-AV1), no audio; skipped with VIDEO_WEBM=0
 *        public/video/<poster-stem>.{1920,1280}.jpg   the poster at the two widths
 *        (<stem> = the media file name without its extension, lowercased, [a-z0-9-] only)
 *        src/tenant/videos.generated.json             what a template reads (shape in schemas/site-content.md)
 *
 * Never upscaled: a tier wider than the original is made once, at the original's width. At most the
 * first 20 s of an upload are used (the schema's guidance is 8–20 s). Size caps as tools/fetch-video.mjs:
 * desktop ≤ 4 MB, mobile ≤ 2 MB. Encodes are cached by the original's sha256 (VIDEO_CACHE_DIR), so a
 * publish that did not change a video costs a copy, not an encode.
 * Needs ffmpeg + ffprobe on PATH only when the site has a video.
 */
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Bump when an encode setting changes: cached encodes of the old recipe are then ignored. */
export const RECIPE = 'v1'
const MAX_SECONDS = 20
export const TIERS = [
  { tier: 'd1920', width: 1920, cap: 4_000_000, webm: true },
  { tier: 'm1280', width: 1280, cap: 2_000_000, webm: true },
  { tier: 'm720', width: 720, cap: 2_000_000, webm: false },
]
const POSTER_WIDTHS = [1920, 1280]
// codecs strings let a browser that cannot decode AV1 skip the WebM and take the MP4
const TYPE = { mp4: 'video/mp4; codecs="avc1.640028"', webm: 'video/webm; codecs="av01.0.08M.08"' }

const run = (bin, args) => {
  const r = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 64 << 20 })
  if (r.error) throw new Error(`${bin}: ${r.error.message}`)
  if (r.status !== 0) throw new Error(`${bin} failed (${r.status}): ${(r.stderr || '').trim().split('\n').slice(-4).join(' | ')}`)
  return r.stdout
}

const probe = (file) => {
  const j = JSON.parse(run('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file]))
  const v = j.streams.find((s) => s.codec_type === 'video')
  if (!v) throw new Error(`${path.basename(file)} has no video stream`)
  const [n, d] = (v.avg_frame_rate || '0/1').split('/').map(Number)
  return {
    width: v.width,
    height: v.height,
    duration: Number(j.format?.duration ?? v.duration ?? 0),
    fps: d ? n / d : 30,
    audio: j.streams.some((s) => s.codec_type === 'audio'),
  }
}

const scale = (width, fps) => [`scale='min(${width},iw)':-2:flags=lanczos`, ...(fps > 30 ? ['fps=30'] : []), 'format=yuv420p'].join(',')

const encodeMp4 = (src, out, { width, cap, length, fps }) => {
  let kbps = Math.floor((cap * 8 * 0.92) / length / 1000)
  let crf = 23
  for (let attempt = 0; attempt < 4; attempt++) {
    run('ffmpeg', ['-y', '-v', 'error', '-t', String(length), '-i', src,
      '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-vf', scale(width, fps),
      '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', String(crf),
      '-maxrate', `${kbps}k`, '-bufsize', `${kbps * 2}k`, '-movflags', '+faststart', out])
    if (statSync(out).size <= cap) return
    kbps = Math.floor(kbps * 0.8)
    crf += 2
  }
  console.warn(`video: ${path.basename(out)} is over its ${cap} byte cap after 4 tries`)
}

const encodeWebm = (src, out, { width, cap, length, fps }) => {
  const kbps = Math.floor((cap * 8 * 0.9) / length / 1000)
  run('ffmpeg', ['-y', '-v', 'error', '-t', String(length), '-i', src,
    '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-vf', scale(width, fps),
    '-c:v', 'libsvtav1', '-preset', '8', '-crf', '38', '-svtav1-params', `mbr=${kbps}`, out])
  if (statSync(out).size > cap) console.warn(`video: ${path.basename(out)} is over its ${cap} byte cap`)
}

const stemOf = (filename) =>
  path.basename(filename, path.extname(filename)).toLowerCase().replace(/[^a-z0-9-]+/g, '-')

/** All video/poster pairs of a site document: [{ video: <media doc>, poster: <media doc>|null }]. */
export const videoPairs = (site) => {
  const pairs = []
  if (site?.heroVideo && typeof site.heroVideo === 'object') pairs.push({ video: site.heroVideo, poster: site.heroVideoPoster ?? null })
  for (const row of site?.videos ?? []) if (row?.video && typeof row.video === 'object') pairs.push({ video: row.video, poster: row.poster ?? null })
  return pairs
}

/** Make sure src/tenant/media/<filename> exists; download it from the CMS if it does not. */
const ensureFile = async (m, mediaDir, { cmsUrl, builderApiKey }) => {
  const file = path.join(mediaDir, path.basename(m.filename))
  if (existsSync(file)) return file
  if (!cmsUrl || !builderApiKey || !m.url) throw new Error(`${m.filename} is not in src/tenant/media and there is no CMS to fetch it from`)
  // Payload's url is absolute (its public SERVER_URL); keep only the path, against our CMS origin
  const res = await fetch(new URL(new URL(m.url, cmsUrl).pathname, cmsUrl), { headers: { Authorization: `builders API-Key ${builderApiKey}` } })
  if (!res.ok) throw new Error(`${res.status} downloading ${m.filename}`)
  mkdirSync(mediaDir, { recursive: true })
  writeFileSync(file, Buffer.from(await res.arrayBuffer()))
  return file
}

/** Encodes of one original, cached under cacheDir/<sha256>-<recipe>-<webm|nowebm>/. */
const renditionsOf = (src, cacheDir, webm) => {
  const sha = createHash('sha256').update(readFileSync(src)).digest('hex')
  const dir = path.join(cacheDir, `${sha.slice(0, 32)}-${RECIPE}-${webm ? 'webm' : 'nowebm'}`)
  const doneFile = path.join(dir, 'done.json')
  if (existsSync(doneFile)) return { dir, ...JSON.parse(readFileSync(doneFile, 'utf8')), cached: true }

  const tmp = `${dir}.tmp-${process.pid}`
  rmSync(tmp, { recursive: true, force: true })
  mkdirSync(tmp, { recursive: true })
  const p = probe(src)
  const length = Math.min(MAX_SECONDS, p.duration || MAX_SECONDS)
  const tiers = {}
  const byWidth = new Map() // effective width → tier that already has those files
  for (const t of TIERS) {
    const w = Math.min(t.width, p.width)
    const same = byWidth.get(w)
    if (same) { tiers[t.tier] = { ...tiers[same], sameAs: same }; continue }
    byWidth.set(w, t.tier)
    const entry = {}
    encodeMp4(src, path.join(tmp, `${t.tier}.mp4`), { width: t.width, cap: t.cap, length, fps: p.fps })
    entry.mp4 = { file: `${t.tier}.mp4`, ...dims(path.join(tmp, `${t.tier}.mp4`)) }
    if (webm && t.webm) {
      encodeWebm(src, path.join(tmp, `${t.tier}.webm`), { width: t.width, cap: t.cap, length, fps: p.fps })
      entry.webm = { file: `${t.tier}.webm`, ...dims(path.join(tmp, `${t.tier}.webm`)) }
    }
    tiers[t.tier] = entry
  }
  const done = { source: { width: p.width, height: p.height, duration_s: round(p.duration), hadAudio: p.audio }, length_s: round(length), tiers }
  writeFileSync(path.join(tmp, 'done.json'), JSON.stringify(done, null, 1))
  rmSync(dir, { recursive: true, force: true })
  renameSync(tmp, dir)
  return { dir, ...done, cached: false }
}

const round = (n) => Math.round(n * 100) / 100
const dims = (file) => {
  const p = probe(file)
  return { width: p.width, height: p.height, bytes: statSync(file).size, audio: p.audio }
}

const posterRenditions = (src, outDir, stem) => {
  const out = {}
  const { width } = probe(src)
  for (const w of POSTER_WIDTHS) {
    const eff = Math.min(w, width)
    const file = `${stem}.${w}.jpg`
    run('ffmpeg', ['-y', '-v', 'error', '-i', src, '-frames:v', '1', '-vf', `scale=${eff}:-2:flags=lanczos`, '-q:v', '3', path.join(outDir, file)])
    const p = probe(path.join(outDir, file))
    out[w] = { src: `video/${file}`, width: p.width, height: p.height }
  }
  return out
}

/**
 * @param siteDir   the template's root (has src/tenant/content.json)
 * @param cacheDir  where encodes are kept between builds
 * @returns the manifest it wrote, or null when the site has no video (nothing is written then)
 */
export const buildVideos = async ({
  siteDir,
  cacheDir = process.env.VIDEO_CACHE_DIR || path.join(os.homedir(), '.cache', 'oneshot', 'video'),
  cmsUrl = process.env.CMS_URL,
  builderApiKey = process.env.BUILDER_API_KEY,
  webm = !['0', 'false', 'no'].includes(String(process.env.VIDEO_WEBM ?? '1').toLowerCase()),
} = {}) => {
  const tenantDir = path.join(siteDir, 'src', 'tenant')
  const content = JSON.parse(readFileSync(path.join(tenantDir, 'content.json'), 'utf8'))
  const site = content.locales?.en ?? Object.values(content.locales ?? {})[0]
  const pairs = videoPairs(site)
  const outDir = path.join(siteDir, 'public', 'video')
  const manifestPath = path.join(tenantDir, 'videos.generated.json')
  rmSync(outDir, { recursive: true, force: true })
  if (!pairs.length) {
    rmSync(manifestPath, { force: true })
    return null
  }
  mkdirSync(outDir, { recursive: true })
  mkdirSync(cacheDir, { recursive: true })

  const mediaDir = path.join(tenantDir, 'media')
  const manifest = { recipe: RECIPE, videos: {}, posters: {} }
  const stats = { encoded: 0, cached: 0 }
  for (const { video, poster } of pairs) {
    if (!String(video.mimeType ?? '').startsWith('video/')) throw new Error(`${video.filename} is not a video (${video.mimeType})`)
    if (!manifest.videos[video.filename]) {
      const src = await ensureFile(video, mediaDir, { cmsUrl, builderApiKey })
      const r = renditionsOf(src, cacheDir, webm)
      stats[r.cached ? 'cached' : 'encoded']++
      const stem = stemOf(video.filename)
      const tiers = {}
      for (const [tier, e] of Object.entries(r.tiers)) {
        tiers[tier] = {}
        for (const kind of ['webm', 'mp4']) {
          if (!e[kind]) continue
          const name = `${stem}.${e.sameAs ?? tier}.${kind}`
          if (!existsSync(path.join(outDir, name))) copyFileSync(path.join(r.dir, e[kind].file), path.join(outDir, name))
          const { file, audio, ...rest } = e[kind]
          tiers[tier][kind] = { src: `video/${name}`, type: TYPE[kind], ...rest }
        }
      }
      manifest.videos[video.filename] = { source: r.source, length_s: r.length_s, tiers }
    }
    if (poster && typeof poster === 'object' && !manifest.posters[poster.filename]) {
      const src = await ensureFile(poster, mediaDir, { cmsUrl, builderApiKey })
      manifest.posters[poster.filename] = posterRenditions(src, outDir, stemOf(poster.filename))
    }
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  return { manifest, stats }
}

// CLI: node cms/publisher/src/video.mjs <site-dir>
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const siteDir = path.resolve(process.argv[2] ?? '.')
  const t0 = Date.now()
  const res = await buildVideos({ siteDir })
  if (!res) console.log('video: no video in content.json — nothing to do')
  else console.log(`video: ${Object.keys(res.manifest.videos).length} video(s), ${res.stats.encoded} encoded, ${res.stats.cached} from cache, ${Object.keys(res.manifest.posters).length} poster(s) → public/video/ (${((Date.now() - t0) / 1000).toFixed(1)} s)`)
}
