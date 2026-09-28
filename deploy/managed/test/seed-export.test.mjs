// node --test deploy/managed/test/*.test.mjs   — the seed's video mapping, without a CMS.
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, test } from 'node:test'

import { videoContentFromDossier } from '../../../cms/scripts/lib/dossier-video.mjs'
import { readExport } from '../../../cms/scripts/lib/tenant-io.mjs'
import { resolveVideo, writeSeedExport } from '../seed-export.mjs'

const tmp = mkdtempSync(path.join(os.tmpdir(), 'seed-export-test-'))
after(() => rmSync(tmp, { recursive: true, force: true }))

const dossierDir = path.join(tmp, 'dossier', 'test-surf')
const vdir = path.join(dossierDir, 'assets', 'video')
mkdirSync(vdir, { recursive: true })
const put = (rel, bytes) => writeFileSync(path.join(dossierDir, rel), bytes)
const entry = (id, extra = {}) => {
  put(`assets/video/${id}-d1920.mp4`, `mp4 of ${id}`)
  put(`assets/video/${id}-m1280.mp4`, `m1280 of ${id}`)
  put(`assets/video/${id}-poster.jpg`, `jpg of ${id}`)
  return {
    id, license: 'business-owned', shows: `what ${id} shows`, cut: { start_s: 0, length_s: 10 },
    renditions: [
      { id: `${id}-m1280-mp4`, file: `assets/video/${id}-m1280.mp4`, mime: 'video/mp4', role: 'hero-mobile' },
      { id: `${id}-d1920-mp4`, file: `assets/video/${id}-d1920.mp4`, mime: 'video/mp4', role: 'hero-desktop' },
    ],
    poster: { id: `${id}-poster-jpg`, file: `assets/video/${id}-poster.jpg` },
    ...extra,
  }
}
const dossier = {
  slug: 'test-surf',
  videos: [
    entry('vid-001', { hero_candidate: { rank: 2 } }),
    entry('vid-002', { hero_candidate: { rank: 1 } }),
    entry('vid-003'),
    { id: 'vid-004', license: 'unknown', shows: 'a reel from someone else' },
    { id: 'vid-005', license: 'business-owned', shows: 'listed, never cut' },
  ],
}
const dossierPath = path.join(dossierDir, 'dossier.json')
writeFileSync(dossierPath, JSON.stringify(dossier))

test('rank-1 candidate → heroVideo (desktop MP4) + poster; the rest → videos[], ranked first', () => {
  const v = videoContentFromDossier(dossier, dossierDir)
  assert.equal(v.heroVideo.filename, 'vid-002-d1920.mp4')
  assert.equal(v.heroVideo.mimeType, 'video/mp4')
  assert.equal(v.heroVideo.alt, 'what vid-002 shows')
  assert.equal(v.heroVideoPoster.filename, 'vid-002-poster.jpg')
  assert.equal(v.heroVideoPoster.mimeType, 'image/jpeg')
  assert.deepEqual(v.videos.map((r) => r.video.filename), ['vid-001-d1920.mp4', 'vid-003-d1920.mp4'])
  assert.deepEqual(v.videos.map((r) => r.description), ['what vid-001 shows', 'what vid-003 shows'])
  assert.deepEqual(v.skipped, [{ id: 'vid-005', why: 'no cut' }, { id: 'vid-004', why: 'license unknown' }])
})

test('no usable video → nothing', () => {
  const v = videoContentFromDossier({ videos: [{ id: 'x', license: 'unknown' }] }, dossierDir)
  assert.equal(v.heroVideo, null)
  assert.equal(v.heroVideoPoster, null)
  assert.deepEqual(v.videos, [])
  assert.deepEqual(videoContentFromDossier({}, dossierDir).videos, [])
})

test('guards: two rank-1 heroes, a missing file, a path outside the dossier, a too-long description', () => {
  const two = { videos: [entry('vid-010', { hero_candidate: { rank: 1 } }), entry('vid-011', { hero_candidate: { rank: 1 } })] }
  assert.throws(() => videoContentFromDossier(two, dossierDir), /exactly one may/)
  const missing = entry('vid-012', { hero_candidate: { rank: 1 } })
  missing.poster.file = 'assets/video/nope.jpg'
  assert.throws(() => videoContentFromDossier({ videos: [missing] }, dossierDir), /missing/)
  const escape = entry('vid-013', { hero_candidate: { rank: 1 } })
  escape.renditions[1].file = '../../../etc/passwd'
  assert.throws(() => videoContentFromDossier({ videos: [escape] }, dossierDir), /outside the dossier/)
  const long = entry('vid-014', { shows: 'x'.repeat(201) })
  assert.throws(() => videoContentFromDossier({ videos: [long] }, dossierDir), /allows 200/)
})

const baseSite = () => ({
  id: 1, tenant: 2, createdAt: 'x', updatedAt: 'x',
  businessName: 'Test Surf', businessType: 'surf_school', languages: ['en'], tagline: 'Hi',
  photos: [{ id: 'r1', image: { filename: 'img-001.jpg', mimeType: 'image/jpeg', alt: 'a photo' }, caption: 'c' }],
  heroVideo: null, heroVideoPoster: null, videos: [],
})
const mediaDir = path.join(tmp, 'site-media')
mkdirSync(mediaDir, { recursive: true })
writeFileSync(path.join(mediaDir, 'img-001.jpg'), 'jpg bytes')

test('seed without video in content.json: the dossier fills heroVideo/heroVideoPoster/videos[] and the files are exported', async () => {
  const site = baseSite()
  const r = resolveVideo(site, { dossierPath })
  assert.equal(r.source, 'dossier')
  const dir = path.join(tmp, 'export-1')
  const { media } = writeSeedExport({ site, slug: 'test-surf', mediaDir, dir })
  const exp = await readExport(dir) // the importer's own reader: every listed file must exist
  const c = exp.content
  assert.match(c.heroVideo, /^test-surf-[0-9a-f]{8}-vid-002-d1920\.mp4$/)
  assert.match(c.heroVideoPoster, /^test-surf-[0-9a-f]{8}-vid-002-poster\.jpg$/)
  assert.equal(c.videos.length, 2)
  assert.deepEqual(c.videos[0].description, { en: 'what vid-001 shows' }) // localized in the export format
  assert.match(c.videos[0].video, /-vid-001-d1920\.mp4$/)
  assert.ok(!('path' in c.videos[0]) && !('id' in c.photos[0]) && !('tenant' in c))
  const byName = Object.fromEntries(media.map((m) => [m.filename, m]))
  assert.equal(byName[c.heroVideo].mimeType, 'video/mp4')
  assert.deepEqual(byName[c.heroVideo].alt, { en: 'what vid-002 shows' })
  assert.equal(readFileSync(path.join(dir, 'media', c.heroVideo), 'utf8'), 'mp4 of vid-002')
  assert.equal(media.length, 1 + 2 * 3) // 1 photo + 3 × (video + poster)
})

test('seed with video already in content.json: content.json wins, files come from src/tenant/media', () => {
  const site = baseSite()
  writeFileSync(path.join(mediaDir, 'clip.mp4'), 'own clip')
  writeFileSync(path.join(mediaDir, 'clip-poster.jpg'), 'own poster')
  site.heroVideo = { filename: 'clip.mp4', mimeType: 'video/mp4', alt: 'own clip' }
  site.heroVideoPoster = { filename: 'clip-poster.jpg', mimeType: 'image/jpeg', alt: 'own poster' }
  assert.equal(resolveVideo(site, { dossierPath }).source, 'content.json')
  const dir = path.join(tmp, 'export-2')
  writeSeedExport({ site, slug: 'test-surf', mediaDir, dir })
  const c = JSON.parse(readFileSync(path.join(dir, 'site.json'), 'utf8'))
  assert.match(c.heroVideo, /-clip\.mp4$/)
  assert.deepEqual(c.videos, [])
})

test('no dossier → no video, and a hero video without a poster is refused', () => {
  const site = baseSite()
  assert.equal(resolveVideo(site, { dossierPath: path.join(tmp, 'none.json') }).source, 'none')
  writeFileSync(path.join(mediaDir, 'clip.mp4'), 'own clip')
  site.heroVideo = { filename: 'clip.mp4', mimeType: 'video/mp4', alt: 'own clip' }
  assert.throws(() => writeSeedExport({ site, slug: 'test-surf', mediaDir, dir: path.join(tmp, 'export-3') }), /without heroVideoPoster/)
})
