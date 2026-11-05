#!/usr/bin/env node
/**
 * Station 4g stand-in for the deployer's first seed (no CMS before a sale): writes src/tenant/content.json in the shape
 * scripts/fetch-tenant.mjs would write from Payload, from the audited copy (copy/en.json), and copies the business-owned
 * originals from the dossier into src/tenant/media/. Keys of en.json that are not schema fields stay out:
 * slug, locale, copywriter_version, humanizer_version, ctas (ctas.primary is a template label: src/lib/labels.json).
 * photos[n] fills slot n (src/lib/slots.mjs). Alts were written with each photograph open.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, statSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const root = join(final, '..', '..', '..')
const copy = JSON.parse(readFileSync(join(final, '..', 'copy', 'en.json'), 'utf8'))
const assets = join(root, 'dossier', 'sanjee-surf-school', 'assets')
const mediaDir = join(final, 'src', 'tenant', 'media')
mkdirSync(mediaDir, { recursive: true })

const PHOTOS = [
  ['img-018.webp', 'Orange and peach sunset over the sea, the sun low on the horizon, lines of swell with small figures in the water, and a wave breaking on to the sand.'],
  ['img-005.jpg', 'A woman and an instructor on the sand, each with arms out and knees bent, standing on a red and a blue soft-top board.'],
  ['img-006.jpg', 'A surfer standing on a white board with arms out, riding along a green wave with white water breaking behind.'],
  ['img-009.webp', 'A surfer lying on a board, back to the camera, paddling at a low green wave with one arm lifted in a small splash. Another head in the water beyond it, open sea and a pale sky above.'],
  ['img-012.webp', 'Tall palms on a grass field above the beach, parasols and a path along the sand, and lines of white surf on a blue sea.'],
  ['img-007.webp', 'Sanjee from behind, hair tied up, turning hard on a yellow board with a pink rail, throwing white spray off a green wave.'],
  ['img-014.webp', 'Three thatched parasols on a sand beach, a line of surf and a green wave behind them under a grey sky.'],
  ['img-002.jpg', 'A rust-red headland with palms and tiled roofs running into a blue bay under a clear sky, seen from the sand.'],
]
const MIME = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' }

const photos = []
for (const [i, [filename, alt]] of PHOTOS.entries()) {
  const src = join(assets, filename), dest = join(mediaDir, filename)
  copyFileSync(src, dest)
  const m = await sharp(dest).metadata()
  photos.push({ image: { id: i + 1, alt, filename, mimeType: MIME[extname(filename)], filesize: statSync(dest).size, width: m.width, height: m.height, focalX: 50, focalY: 50 }, caption: null })
}

const site = {
  businessName: copy.businessName,
  businessType: copy.businessType,
  tagline: copy.tagline,
  closing: copy.closing,
  featureLine: copy.featureLine,
  languages: ['en'],
  copyBlocks: copy.copyBlocks,
  openingHours: copy.openingHours,
  hoursNote: copy.hoursNote,
  priceList: copy.priceList,
  photos,
  heroVideo: null,
  heroVideoPoster: null,
  videos: [],
  contact: copy.contact,
  bookingLinks: copy.bookingLinks,
  amenities: copy.amenities,
  ratings: copy.ratings,
  testimonials: copy.testimonials,
  spot: copy.spot,
  season: copy.season,
  languagesSpoken: copy.languagesSpoken,
  rooms: copy.rooms,
  stayInfo: copy.stayInfo,
  lessons: copy.lessons,
  credentials: copy.credentials,
  rentals: copy.rentals,
  brands: copy.brands,
  forecast: null,
}
const out = { tenant: { id: null, slug: copy.slug, name: copy.businessName }, locales: { en: site } }
writeFileSync(join(final, 'src', 'tenant', 'content.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`seed: content.json, ${photos.length} originals in src/tenant/media`)
