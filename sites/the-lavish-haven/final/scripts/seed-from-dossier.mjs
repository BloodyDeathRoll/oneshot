#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS: write src/tenant/content.json + src/tenant/media/ in exactly the
 * shape scripts/fetch-tenant.mjs writes from Payload (schemas/site-content.md v0.5, "What the
 * template receives"), seeded from the audited copy (sites/<slug>/copy/en.json, passed 4c round 4)
 * and the dossier.
 *
 * There is no Payload tenant for The Lavish Haven yet, so this is what the deployer's first seed
 * would contain. Once the tenant exists, `npm run fetch` replaces both outputs with the CMS's own.
 *
 * Nothing here is invented: every value is copied from copy/en.json or dossier.json; the only
 * additions are what the schema asks the seeder for (alt text and focal point per photo, photo
 * order, rating capture dates, the forecast mapping from concepts.md) and they are listed in notes.md.
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const here = dirname(fileURLToPath(import.meta.url))
const final = join(here, '..')
const site = join(final, '..')
const slug = 'the-lavish-haven'
const repo = join(site, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')

const copy = JSON.parse(readFileSync(join(site, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const byId = new Map(dossier.images.map((a) => [a.id, a]))

/* Photo order = the gold page's slots (identified by matching the gold page's inlined images
   against dossier/…/assets/, see notes.md "images"):
     0  the night print that rises over the water (img-002)
     1  the pool from above, "where" section (img-079)
     2  the balcony over the pool, "where" section (img-069)
     3+ the 4:5 strip after the room list
   Alt text: written for 4g from looking at each file; no room type is named, because nothing in the
   dossier ties a photograph to a room type. focalX = the horizontal centre of the gold page's 4:5
   crop (measured, notes.md), used by scripts/photos.mjs; Payload's own focal-point fields. */
const PHOTOS = [
  { id: 'img-002', focalX: 50, alt: 'The pool at night, lit from below, with two storeys of lit rooms and balconies behind it' },
  { id: 'img-079', focalX: 50, alt: 'The pool and the stone-paved garden seen from above, with palms behind the tiled roofs' },
  { id: 'img-069', focalX: 50, alt: 'A covered balcony with wooden chairs and a low table, looking down through the railing to the pool' },
  { id: 'img-007', focalX: 42, alt: 'A bedroom with a wooden staircase up to a loft, warm light on plaster walls' },
  { id: 'img-073', focalX: 60, alt: 'Wooden chairs and a low table on a balcony beside a mottled grey wall, the pool below' },
  { id: 'img-021', focalX: 50, alt: 'A bed under a pitched white ceiling, grey-green curtains either side of a glass door' },
  { id: 'img-028', focalX: 55, alt: 'Two beds under a timber ceiling, a wooden chair at a desk, a glass door at the far end' },
  { id: 'img-071', focalX: 45, alt: 'A balcony with wooden chairs and a low table under white-painted rafters, looking into palms' },
  { id: 'img-017', focalX: 55, alt: 'A made bed with folded towels, a tall window on one side and a painting of a wave on the wall' },
  { id: 'img-008', focalX: 45, alt: 'A loft bedroom behind a timber balustrade, with purple curtains' },
]

const mediaDir = join(final, 'src', 'tenant', 'media')
rmSync(mediaDir, { recursive: true, force: true })
mkdirSync(mediaDir, { recursive: true })

const photos = []
let mediaId = 1
for (const p of PHOTOS) {
  const a = byId.get(p.id)
  if (!a || a.license !== 'business-owned') throw new Error(`${p.id}: not a business-owned dossier asset`)
  const filename = `${p.id}.jpg`
  const out = await sharp(join(repo, 'dossier', slug, a.file)).rotate().jpeg({ quality: 95 }).toFile(join(mediaDir, filename))
  photos.push({
    id: `seed-photo-${mediaId}`,
    image: {
      id: mediaId++, alt: p.alt, filename, mimeType: 'image/jpeg',
      width: out.width, height: out.height, url: `/api/media/file/${filename}`,
      focalX: p.focalX, focalY: 50, sizes: {},
    },
    caption: null,
  })
}

/* Copy blocks exactly as passed, in the order the copy gives them (intro, about×2, offer×2, info).
   The page places them by slot and order within the slot. Words untouched. */
const blocks = copy.copyBlocks.map((b, i) => ({ id: `seed-block-${i + 1}`, ...b }))
const want = [['intro', 1], ['about', 2], ['offer', 2], ['info', 1]]
for (const [s, n] of want) {
  if (blocks.filter((b) => b.slot === s).length !== n) throw new Error(`copy blocks changed (${s}); check the page's slot mapping`)
}

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))

/* schema v0.4: ratings[].capturedAt is required and is the deployer's — the day the harvester read
   the score off the platform: dossier.reviews.<platform>.fetched_at, never today's date. */
const capturedAt = (platform) => {
  const at = dossier.reviews?.[platform]?.fetched_at
  const d = /^(\d{4}-\d{2}-\d{2})T/.exec(at ?? '')
  if (!d) throw new Error(`rating ${platform}: no reviews.${platform}.fetched_at in the dossier`)
  return d[1]
}

const testimonials = copy.testimonials.map((t, i) => ({
  id: `seed-quote-${i + 1}`, quote: t.quote, author: t.author, source: t.source, date: t.date ?? null,
}))

const doc = {
  id: null,
  tenant: { id: null, name: copy.businessName, slug },
  businessName: copy.businessName,
  businessType: dossier.business.type.value,
  tagline: copy.tagline,
  closing: copy.closing ?? null, // v0.5
  featureLine: copy.featureLine ?? null, // v0.6: the line over the night-pool photograph
  languages: ['en'],
  copyBlocks: blocks,
  openingHours: [],
  hoursNote: null,
  priceList: [],
  photos,
  contact: {
    phone: copy.contact.phone,
    whatsapp: dossier.contact.whatsapp.value, // null: schema says required — a gap, see notes.md
    email: dossier.contact.email.value,
    address: copy.contact.address,
    mapUrl: dossier.location.map_url.value,
  },
  bookingLinks: rowIds(copy.bookingLinks, 'link'),
  amenities: rowIds(copy.amenities, 'amenity').map((a) => ({ note: null, ...a })),
  ratings: rowIds(copy.ratings, 'rating').map((r) => ({ url: null, ...r, capturedAt: capturedAt(r.platform) })),
  testimonials,
  spot: copy.spot,
  season: copy.season,
  languagesSpoken: copy.languagesSpoken,
  rooms: rowIds(copy.rooms, 'room').map((r) => ({ sleeps: null, note: null, photo: null, ...r })),
  stayInfo: { checkInFrom: null, checkInTo: null, checkOutFrom: null, checkOutTo: null, minNights: null, note: null, ...copy.stayInfo },
  lessons: [],
  credentials: [],
  rentals: [],
  brands: [],
  shaping: null,
  /* v0.3: the gold page carries the forecast for Kabalana (dossier location.spot "Kabalana beach
     break" → Rosa id `kabalana`, the mapping this run's concepts use). */
  forecast: { enabled: true, rosaSpotId: 'kabalana', spotName: 'Kabalana' },
  updatedAt: null,
  createdAt: null,
}

/* SCHEMA GAP (station 4h): site-content.md has no geo field, so the JSON-LD pin cannot travel through
   content.json. It stays the MAP_PIN constant in src/lib/site.mjs, and this seed checks it against the
   dossier's pin (location.lat_lng, Google listing, 2026-09-23) so the two cannot drift apart: rounded
   to 5 decimals they must be equal, or the seed stops. Same check as Layday's seed. */
{
  const ll = dossier.location?.lat_lng?.value
  const pin = /MAP_PIN\s*=\s*\{\s*lat:\s*([-\d.]+),\s*lon:\s*([-\d.]+)\s*\}/.exec(readFileSync(join(final, 'src', 'lib', 'site.mjs'), 'utf8'))
  const r5 = (x) => Math.round(x * 1e5) / 1e5
  if (!Array.isArray(ll) || !pin) throw new Error('pin: dossier location.lat_lng or MAP_PIN in src/lib/site.mjs missing')
  if (r5(ll[0]) !== +pin[1] || r5(ll[1]) !== +pin[2]) throw new Error(`pin: MAP_PIN ${pin[1]},${pin[2]} ≠ dossier location.lat_lng ${ll.join(',')} — update MAP_PIN`)
}

writeFileSync(
  join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: doc } }, null, 2) + '\n',
)
console.log(`seed: ${slug} — 1 locale, ${photos.length} photos → src/tenant/`)
