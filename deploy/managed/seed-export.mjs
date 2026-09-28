/**
 * The seed's pure half: a site document in the REST shape a template reads
 * (sites/<slug>/final/src/tenant/content.json → locales.en) → a tenant export directory, format v1
 * (cms/scripts/lib/tenant-io.mjs), which importTenant() then writes into Payload.
 *
 * Kept apart from deploy.mjs (which needs SSH and the live CMS) so it can be tested locally.
 *
 * Video (schema v0.8): heroVideo / heroVideoPoster / videos[] come from content.json when the site
 * already carries them (files in src/tenant/media, like photos). When it carries none, they are
 * mapped from the dossier's videos[] (cms/scripts/lib/dossier-video.mjs) and the files are read
 * from dossier/<slug>/assets/video/.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { videoContentFromDossier } from '../../cms/scripts/lib/dossier-video.mjs'

const hasVideo = (site) => Boolean(site.heroVideo) || (Array.isArray(site.videos) && site.videos.length > 0)

/**
 * Fill the video fields of `site` (in place) from the dossier when content.json has none.
 * @returns 'content.json' | 'dossier' | 'none', plus the dossier entries that were not used
 */
export const resolveVideo = (site, { dossierPath }) => {
  if (hasVideo(site)) return { source: 'content.json', skipped: [] }
  if (!dossierPath || !existsSync(dossierPath)) return { source: 'none', skipped: [] }
  const dossier = JSON.parse(readFileSync(dossierPath, 'utf8'))
  const v = videoContentFromDossier(dossier, path.dirname(dossierPath))
  if (!v.heroVideo && v.videos.length === 0) return { source: 'none', skipped: v.skipped }
  site.heroVideo = v.heroVideo
  site.heroVideoPoster = v.heroVideoPoster
  site.videos = v.videos
  return { source: 'dossier', skipped: v.skipped }
}

/**
 * @param site      content.json locales.en (not modified)
 * @param slug      tenant slug (prefix of every uploaded file name)
 * @param mediaDir  src/tenant/media of the site (where content.json's media files are)
 * @param dir       empty output directory
 * @returns {{ media: {filename, mimeType, alt}[] }}
 */
export const writeSeedExport = ({ site, slug, mediaDir, dir, source }) => {
  mkdirSync(path.join(dir, 'media'), { recursive: true })
  const media = []
  const out = structuredClone(site)
  for (const k of ['id', 'tenant', 'createdAt', 'updatedAt']) delete out[k]
  // Payload rejects a group set to null (TypeError in its field traversal): an empty group is omitted
  for (const g of ['contact', 'stayInfo', 'shaping', 'forecast']) if (out[g] == null) delete out[g]
  const wrap = (v) => (v == null ? v : { en: v })
  for (const f of ['tagline', 'featureLine', 'closing', 'hoursNote', 'spot', 'season']) if (f in out) out[f] = wrap(out[f])
  const groups = { contact: ['address'], stayInfo: ['note'], shaping: ['boardTypes', 'leadTime', 'customOrder'] }
  for (const [g, fs] of Object.entries(groups)) if (out[g]) for (const f of fs) if (f in out[g]) out[g][f] = wrap(out[g][f])
  const arrays = {
    copyBlocks: ['heading', 'body'], priceList: ['label', 'note'], photos: ['caption'], videos: ['description'], bookingLinks: ['label'],
    amenities: ['label', 'note'], rooms: ['label', 'beds', 'note'], lessons: ['label', 'groupSize', 'includes'],
    credentials: ['label'], rentals: ['label', 'note'],
  }
  const allArrays = [...Object.keys(arrays), 'openingHours', 'ratings', 'testimonials', 'brands']
  for (const a of allArrays) {
    if (!Array.isArray(out[a])) continue
    out[a] = out[a].map(({ id, ...row }) => {
      for (const f of arrays[a] ?? []) if (f in row) row[f] = wrap(row[f])
      return row
    })
  }

  // media filenames are unique per CMS instance, not per tenant, and Payload renames a clash
  // (img-001 → img-2). Name = slug + content hash + original name: no clash across tenants,
  // and a re-seed finds the file it uploaded last time and reuses it instead of uploading again
  const add = (m) => {
    const bytes = readFileSync(m.path ?? path.join(mediaDir, m.filename))
    const name = `${slug}-${createHash('sha256').update(bytes).digest('hex').slice(0, 8)}-${path.basename(m.filename)}`
    if (!media.some((x) => x.filename === name)) {
      writeFileSync(path.join(dir, 'media', name), bytes)
      media.push({ filename: name, mimeType: m.mimeType, alt: { en: m.alt } })
    }
    return name
  }
  for (const [a, f] of [['photos', 'image'], ['rooms', 'photo'], ['videos', 'video'], ['videos', 'poster']]) {
    for (const row of out[a] ?? []) if (row[f]) row[f] = add(row[f])
  }
  for (const f of ['heroVideo', 'heroVideoPoster']) if (out[f]) out[f] = add(out[f])
  if (out.heroVideo && !out.heroVideoPoster) throw new Error('heroVideo without heroVideoPoster: the CMS rejects it (schema v0.8)')

  writeFileSync(path.join(dir, 'site.json'), JSON.stringify(out, null, 2))
  writeFileSync(path.join(dir, 'media.json'), JSON.stringify(media, null, 2))
  writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({
    format: 'oneshot-tenant-export', version: 1, exportedAt: new Date().toISOString(),
    source: { profile: 'repo', path: source ?? `sites/${slug}/final/src/tenant/content.json` }, tenant: { slug, name: site.businessName },
  }))
  return { media }
}
