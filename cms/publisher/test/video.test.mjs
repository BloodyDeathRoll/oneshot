// The video build step (src/video.mjs) on a generated clip. Needs ffmpeg + ffprobe (skipped without).
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { after, before, test } from 'node:test'

import { buildVideos } from '../src/video.mjs'

const hasFfmpeg = ['ffmpeg', 'ffprobe'].every((b) => spawnSync(b, ['-version'], { stdio: 'ignore' }).status === 0)
const tmp = mkdtempSync(path.join(os.tmpdir(), 'video-step-test-'))
after(() => rmSync(tmp, { recursive: true, force: true }))
const ff = (...args) => {
  const r = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error(r.stderr)
}
const streams = (file) =>
  JSON.parse(spawnSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', file], { encoding: 'utf8' }).stdout).streams

const siteDir = path.join(tmp, 'site')
const media = path.join(siteDir, 'src', 'tenant', 'media')
const cacheDir = path.join(tmp, 'cache')
const writeContent = (site) =>
  writeFileSync(path.join(siteDir, 'src', 'tenant', 'content.json'), JSON.stringify({ tenant: { slug: 't' }, locales: { en: site } }))
const doc = (filename, mimeType, url) => ({ id: 1, filename, mimeType, url: url ?? `http://cms.invalid/api/media/file/${filename}`, alt: filename })

before(() => {
  if (!hasFfmpeg) return
  mkdirSync(media, { recursive: true })
  // 4 s, 640×360 WITH an audio track (an owner's phone clip has one); poster 800 px wide
  ff('-f', 'lavfi', '-i', 'testsrc2=size=640x360:rate=30:duration=4', '-f', 'lavfi', '-i', 'sine=duration=4',
    '-c:v', 'libx264', '-preset', 'ultrafast', '-c:a', 'aac', '-shortest', path.join(media, 'Owner Clip.mp4'))
  ff('-f', 'lavfi', '-i', 'testsrc2=size=800x450', '-frames:v', '1', path.join(media, 'poster.jpg'))
})

test('no video in content.json → nothing written, no ffmpeg needed', async () => {
  const dir = path.join(tmp, 'plain')
  mkdirSync(path.join(dir, 'src', 'tenant'), { recursive: true })
  writeFileSync(path.join(dir, 'src', 'tenant', 'content.json'), JSON.stringify({ locales: { en: { heroVideo: null, videos: [] } } }))
  assert.equal(await buildVideos({ siteDir: dir, cacheDir }), null)
  assert.ok(!existsSync(path.join(dir, 'public', 'video')))
})

test('hero video → tiers without audio, never upscaled, poster widths, manifest; second build from cache', { skip: !hasFfmpeg }, async () => {
  writeContent({
    heroVideo: doc('Owner Clip.mp4', 'video/mp4'),
    heroVideoPoster: doc('poster.jpg', 'image/jpeg'),
    videos: [{ video: doc('Owner Clip.mp4', 'video/mp4'), poster: doc('poster.jpg', 'image/jpeg'), description: 'same clip twice' }],
  })
  const first = await buildVideos({ siteDir, cacheDir, webm: true })
  assert.deepEqual(first.stats, { encoded: 1, cached: 0 }) // the same original is encoded once
  const m = JSON.parse(readFileSync(path.join(siteDir, 'src', 'tenant', 'videos.generated.json'), 'utf8'))
  const v = m.videos['Owner Clip.mp4']
  assert.equal(v.source.hadAudio, true)
  // 640 px source: every tier is the one 640 px encode (named after the first tier)
  for (const tier of ['d1920', 'm1280', 'm720']) {
    assert.equal(v.tiers[tier].mp4.src, 'video/owner-clip.d1920.mp4')
    assert.equal(v.tiers[tier].mp4.width, 640)
    assert.match(v.tiers[tier].mp4.type, /^video\/mp4; codecs=/)
    assert.equal(v.tiers[tier].webm.src, 'video/owner-clip.d1920.webm')
  }
  const out = path.join(siteDir, 'public', 'video')
  assert.deepEqual(readdirSync(out).sort(), ['owner-clip.d1920.mp4', 'owner-clip.d1920.webm', 'poster.1280.jpg', 'poster.1920.jpg'])
  for (const f of ['owner-clip.d1920.mp4', 'owner-clip.d1920.webm']) {
    const s = streams(path.join(out, f))
    assert.deepEqual(s.map((x) => x.codec_type), ['video'], `${f} must have no audio track`)
  }
  assert.equal(streams(path.join(out, 'owner-clip.d1920.mp4'))[0].codec_name, 'h264')
  assert.equal(streams(path.join(out, 'owner-clip.d1920.webm'))[0].codec_name, 'av1')
  // poster: 800 px source → 1920 slot stays 800 (never upscaled), 1280 slot is 800 too
  assert.equal(m.posters['poster.jpg'][1920].width, 800)
  assert.equal(m.posters['poster.jpg'][1280].width, 800)

  const second = await buildVideos({ siteDir, cacheDir, webm: true })
  assert.deepEqual(second.stats, { encoded: 0, cached: 1 })
  assert.deepEqual(second.manifest, m)
})

test('a wide source gets three tiers; VIDEO_WEBM off → MP4 only', { skip: !hasFfmpeg }, async () => {
  ff('-f', 'lavfi', '-i', 'testsrc2=size=1920x1080:rate=30:duration=3', '-c:v', 'libx264', '-preset', 'ultrafast', path.join(media, 'wide.mp4'))
  writeContent({ heroVideo: doc('wide.mp4', 'video/mp4'), heroVideoPoster: doc('poster.jpg', 'image/jpeg'), videos: [] })
  const { manifest } = await buildVideos({ siteDir, cacheDir, webm: false })
  const t = manifest.videos['wide.mp4'].tiers
  assert.deepEqual([t.d1920.mp4.width, t.m1280.mp4.width, t.m720.mp4.width], [1920, 1280, 720])
  assert.ok(!t.d1920.webm && !t.m1280.webm)
  assert.ok(t.m1280.mp4.bytes <= 2_000_000 && t.d1920.mp4.bytes <= 4_000_000)
})

test('an original missing from src/tenant/media is downloaded with the builder key; without a CMS it fails', { skip: !hasFfmpeg }, async () => {
  const bytes = readFileSync(path.join(media, 'Owner Clip.mp4'))
  const seen = []
  const server = http.createServer((req, res) => {
    seen.push({ url: req.url, auth: req.headers.authorization })
    if (req.headers.authorization !== 'builders API-Key k' || req.url !== '/api/media/file/remote.mp4') { res.writeHead(403).end(); return }
    res.writeHead(200, { 'content-type': 'video/mp4' }).end(bytes)
  })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  const cmsUrl = `http://127.0.0.1:${server.address().port}`
  try {
    // Payload's url carries its PUBLIC origin; only the path is used, against our CMS origin
    writeContent({ heroVideo: doc('remote.mp4', 'video/mp4', 'https://cms.example/api/media/file/remote.mp4'), heroVideoPoster: doc('poster.jpg', 'image/jpeg'), videos: [] })
    await assert.rejects(buildVideos({ siteDir, cacheDir, cmsUrl: '', builderApiKey: '' }), /no CMS/)
    const r = await buildVideos({ siteDir, cacheDir, cmsUrl, builderApiKey: 'k', webm: true })
    assert.deepEqual(seen, [{ url: '/api/media/file/remote.mp4', auth: 'builders API-Key k' }])
    assert.ok(existsSync(path.join(media, 'remote.mp4')))
    assert.deepEqual(r.stats, { encoded: 0, cached: 1 }) // same bytes as Owner Clip.mp4: the cache is keyed by content, not name
  } finally {
    server.close()
  }
})
