#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS: write src/tenant/content.json + src/tenant/media/ in exactly the
 * shape scripts/fetch-tenant.mjs writes from Payload (schemas/site-content.md v0.4, "What the
 * template receives"), seeded from the audited copy (sites/<slug>/copy/en.json) and the dossier.
 *
 * There is no Payload tenant for Layday yet, so this is what the deployer's first seed would
 * contain. Once the tenant exists, `npm run fetch` replaces both outputs with the CMS's own.
 *
 * Nothing here is invented: every value is copied from copy/en.json or dossier.json; the only
 * additions are what the schema asks the seeder for (alt text per photo, photo order, the forecast
 * mapping from concepts.md) and they are listed in notes.md.
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
const slug = 'layday-surf-ahangama'
const repo = join(site, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')

const copy = JSON.parse(readFileSync(join(site, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const assets = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'assets', 'index.json'), 'utf8'))
const byId = new Map(assets.map((a) => [a.id, a]))

/* Photo order = the design's slots: 0 the berth inside (room, right), 1 the dorm through its door
   (room, left), 2–3 the berth pair, 4–6 the "newly built" row, 7–9 the beach row.
   Alt text is the 4e mockup's (written from looking at each file; mockups/unique/notes.md "images").
   The originals are copied untouched: cropping and resizing are the build's job (scripts/photos.mjs). */
const PHOTOS = [
  { id: 'img-018', alt: 'Inside a berth: yellow plaster walls and ceiling, a square niche, a black wall lamp, a white pillow, the curtain drawn back' },
  { id: 'img-012', alt: 'The dormitory through its open glass-and-timber door: yellow berths with curtains, a timber door at the far end, a bench with cushions under a painting' },
  { id: 'img-002', alt: 'A lower berth close up: yellow plaster, a white bed, curtains tied back, a black ladder and locking drawers underneath' },
  { id: 'img-008', alt: 'The end of a berth with its black steel ladder and a locking drawer, a potted palm beside it' },
  { id: 'img-013', alt: 'Cane-fronted lockers beside poured-concrete shelving and a potted plant' },
  { id: 'img-003', alt: 'A white basin on a concrete counter under a round cane mirror, cane cabinet doors below' },
  { id: 'img-017', alt: 'A long bench with violet, ochre, green and grey cushions under an abstract painting' },
  { id: 'img-019', alt: 'Surfers in the line-up behind white water, seen from the sand' },
  { id: 'img-021', alt: 'A blue surfboard carried through the shallows of a long sandy beach' },
  { id: 'img-020', alt: 'A man walking along wet sand, palms further up the shore' },
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
      focalX: 50, focalY: 50, sizes: {},
    },
    caption: null,
  })
}

/* Copy blocks in the order the design reads them within each slot:
   intro → hero headline + lead · about[0] → "Just one dorm" · offer → "The room" (¶2, the rates line,
   goes to the drawer and the footer berth) · info[0] → finding the door · about[1] → newly built ·
   info[1] → practicalities. Words untouched. */
const blocks = copy.copyBlocks
const pick = (heading) => {
  const b = blocks.find((x) => x.heading === heading)
  if (!b) throw new Error('copy block missing: ' + heading)
  return b
}
const ordered = [
  pick('A two-minute walk from Kabalana'),
  pick('Just one dorm'),
  pick('Newly built, and kept that way'),
  pick('The room'),
  pick('Finding the door'),
  pick('Practicalities'),
].map((b, i) => ({ id: `seed-block-${i + 1}`, ...b }))
if (ordered.length !== blocks.length) throw new Error('copy blocks changed; update the order above')

/* Testimonials in slot order: room (Beth), finding the door (Catherine), then the guests row. Verbatim. */
const tOrder = ['Beth, England', 'Catherine, Australia', 'Jennine, England', 'Akshay, Sri Lanka', 'Taiya, Australia']
const testimonials = tOrder.map((author, i) => {
  const t = copy.testimonials.find((x) => x.author === author)
  if (!t) throw new Error('testimonial missing: ' + author)
  return { id: `seed-quote-${i + 1}`, quote: t.quote, author: t.author, source: t.source, date: t.date ?? null }
})
if (testimonials.length !== copy.testimonials.length) throw new Error('testimonials changed; update the order above')

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))

/* schema v0.4: ratings[].capturedAt is required and is the deployer's — the day the harvester read
   the score off the platform: dossier.reviews.<platform>.fetched_at, never today's date. */
const capturedAt = (platform) => {
  const at = dossier.reviews?.[platform]?.fetched_at
  const d = /^(\d{4}-\d{2}-\d{2})T/.exec(at ?? '')
  if (!d) throw new Error(`rating ${platform}: no reviews.${platform}.fetched_at in the dossier`)
  return d[1]
}

const doc = {
  id: null,
  tenant: { id: null, name: copy.businessName, slug },
  businessName: copy.businessName,
  businessType: dossier.business.type.value,
  tagline: copy.tagline,
  languages: ['en'],
  copyBlocks: ordered,
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
  /* rooms[].note is owner copy since copy round 3 ("The only room: one air-conditioned dormitory",
     review.md row 46); rooms[].beds was removed. The template prints the note where beds was. */
  rooms: rowIds(copy.rooms, 'room').map((r) => ({ sleeps: null, note: null, photo: null, ...r })),
  stayInfo: { checkInFrom: null, checkInTo: null, checkOutFrom: null, checkOutTo: null, minNights: null, note: null, ...copy.stayInfo },
  lessons: [],
  credentials: [],
  rentals: [],
  brands: [],
  shaping: null,
  /* v0.3: concepts.md concept 3 maps dossier "Kabalana beach break" → Rosa id `kabalana`, "Kabalana". */
  forecast: { enabled: true, rosaSpotId: 'kabalana', spotName: 'Kabalana' },
  updatedAt: null,
  createdAt: null,
}

/* SCHEMA GAP: site-content.md has no geo field, so the JSON-LD pin cannot travel through content.json
   (inventing a field is not allowed). It stays the MAP_PIN constant in src/lib/site.mjs, and this seed
   checks it against the dossier's own pin (location.lat_lng, Google listing, 2026-09-23) so the two
   cannot drift apart: rounded to 5 decimals they must be equal, or the seed stops. */
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
