/**
 * Dossier `videos[]` → the video fields of a `sites` document (schemas/dossier.md "Mapping",
 * schemas/site-content.md v0.8 "Seeded from the dossier"):
 *
 *   the usable entry with hero_candidate.rank 1   → heroVideo (its hero-desktop MP4) + heroVideoPoster (its poster JPEG)
 *   every other usable entry with a cut            → a videos[] row: video ← hero-desktop MP4, poster ← poster JPEG,
 *                                                     description ← shows   (ranked candidates first, ≤ 6 rows)
 *
 * Usable = `license: "business-owned"` (the same rule as photos). Media fields come back in the
 * REST shape a template reads from content.json (`{ filename, mimeType, alt }`), plus `path`: the
 * absolute file on disk, which the seed uploads. Zero dependencies.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

export const MAX_VIDEO_ROWS = 6 // cms/app/src/collections/Sites.ts videos.maxRows
const MAX_DESCRIPTION = 200 // videos[].description maxLength

const usable = (v) => v?.license === 'business-owned'

const fileOf = (dossierDir, rel, what) => {
  const abs = path.resolve(dossierDir, rel)
  if (!abs.startsWith(path.resolve(dossierDir) + path.sep)) throw new Error(`${what}: ${rel} is outside the dossier`)
  if (!existsSync(abs)) throw new Error(`${what}: ${rel} is missing (run tools/fetch-video.mjs again)`)
  return abs
}

/** One dossier video → { video, poster, description } with media descriptors, or a reason it cannot be used. */
const mediaOf = (v, dossierDir) => {
  const where = `dossier videos[${v.id}]`
  if (!v.cut) return { skip: 'no cut' }
  const desktop = (v.renditions ?? []).find((r) => r.role === 'hero-desktop' && r.mime === 'video/mp4')
  if (!desktop) return { skip: 'no hero-desktop MP4 rendition' }
  if (!v.poster?.file) return { skip: 'no poster' }
  const shows = typeof v.shows === 'string' ? v.shows.trim() : ''
  if (!shows) throw new Error(`${where}: "shows" is empty — it becomes the video's description and alt text`)
  if (shows.length > MAX_DESCRIPTION) throw new Error(`${where}: "shows" is ${shows.length} characters; the site field allows ${MAX_DESCRIPTION}`)
  const videoPath = fileOf(dossierDir, desktop.file, where)
  const posterPath = fileOf(dossierDir, v.poster.file, `${where} poster`)
  return {
    dossierId: v.id,
    description: shows,
    video: { filename: path.basename(videoPath), mimeType: 'video/mp4', alt: shows, path: videoPath },
    poster: { filename: path.basename(posterPath), mimeType: 'image/jpeg', alt: shows, path: posterPath },
  }
}

/**
 * @param dossier     parsed dossier/<slug>/dossier.json
 * @param dossierDir  dossier/<slug> (the renditions' paths are relative to it)
 * @returns {{ heroVideo, heroVideoPoster, videos, skipped }}  heroVideo/heroVideoPoster null and
 *          videos [] when the business has no usable video
 */
export const videoContentFromDossier = (dossier, dossierDir) => {
  const all = Array.isArray(dossier?.videos) ? dossier.videos : []
  const skipped = []
  const heroes = all.filter((v) => usable(v) && v.hero_candidate?.rank === 1)
  if (heroes.length > 1) throw new Error(`dossier videos[]: ${heroes.length} usable entries have hero_candidate.rank 1 (${heroes.map((v) => v.id).join(', ')}); exactly one may`)

  let heroVideo = null
  let heroVideoPoster = null
  if (heroes[0]) {
    const m = mediaOf(heroes[0], dossierDir)
    if (m.skip) throw new Error(`dossier videos[${heroes[0].id}] is the rank-1 hero candidate but has ${m.skip}`)
    heroVideo = m.video
    heroVideoPoster = m.poster
  }

  const rank = (v) => v.hero_candidate?.rank ?? Number.POSITIVE_INFINITY
  const rest = all
    .map((v, i) => ({ v, i }))
    .filter(({ v }) => usable(v) && v !== heroes[0])
    .sort((a, b) => rank(a.v) - rank(b.v) || a.i - b.i)
  const videos = []
  for (const { v } of rest) {
    const m = mediaOf(v, dossierDir)
    if (m.skip) { skipped.push({ id: v.id, why: m.skip }); continue }
    if (videos.length >= MAX_VIDEO_ROWS) { skipped.push({ id: v.id, why: `over ${MAX_VIDEO_ROWS} rows` }); continue }
    videos.push({ video: m.video, poster: m.poster, description: m.description })
  }
  for (const v of all.filter((x) => !usable(x))) skipped.push({ id: v.id, why: `license ${v.license ?? 'missing'}` })
  return { heroVideo, heroVideoPoster, videos, skipped }
}
