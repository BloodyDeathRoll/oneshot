#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS: write src/tenant/content.json + src/tenant/media/ in exactly the
 * shape scripts/fetch-tenant.mjs writes from Payload (schemas/site-content.md v0.3, "What the
 * template receives"), seeded from the audited copy (sites/<slug>/copy/en.json) and the dossier.
 *
 * There is no Payload tenant for KA yet and the Payload collection is behind schema v0.3
 * (PLAN.md §9), so this is what the deployer's first seed would contain. Once the tenant exists,
 * `npm run fetch` replaces both outputs with the CMS's own and this script is no longer used.
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
const slug = 'ka-surf-hostel-and-restaurant'
const repo = join(site, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')

const copy = JSON.parse(readFileSync(join(site, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const assets = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'assets', 'index.json'), 'utf8'))
const byId = new Map(assets.map((a) => [a.id, a]))

/* Photo order = the design's slots (index 0..7 prints down the walk, 8.. the beach row).
   Alt text says what the photograph shows; the dossier's asset index only has generic
   descriptions, so these are the 4e mockup's, written from looking at each file.
   `rotate` turns the three Instagram squares stored on their side upright, as an owner's
   upload would be; cropping and resizing are the build's job (scripts/photos.mjs). */
const PHOTOS = [
  { id: 'img-001', alt: 'A private room with a double bed, white plank walls and the door open to the garden' },
  { id: 'img-004', alt: 'The dormitory: grey-green timber bunk beds with white linen and a blue runner, under a vaulted ceiling' },
  { id: 'img-003', alt: 'A hand holding a plate of papaya, watermelon, pineapple, passion fruit and banana in front of the garden' },
  { id: 'img-005', alt: 'An open-air bathroom with a glass roof, a black shower wall, plants and a round basin' },
  { id: 'img-006', alt: 'Two small cottages under coconut palms and banana trees' },
  { id: 'img-008', alt: 'A bathroom with a round basin and a window full of banana leaves' },
  { id: 'img-002', alt: 'Guests around a long wooden table on the veranda at night' },
  { id: 'img-012', alt: 'A ring lamp glowing on the white wall of the house at night' },
  { id: 'img-023', alt: 'Surfers waiting in the water off a sandy beach, low white-water rolling in', rotate: 270 },
  { id: 'img-020', alt: 'A man beside a stack of blue soft-top surfboards on the beach' },
  { id: 'img-021', alt: 'Surfboards leaning on a wooden rail by the beach', rotate: 270 },
]

const mediaDir = join(final, 'src', 'tenant', 'media')
rmSync(mediaDir, { recursive: true, force: true })
mkdirSync(mediaDir, { recursive: true })

const photos = []
let mediaId = 1
for (const p of PHOTOS) {
  const a = byId.get(p.id)
  if (!a || a.license !== 'business-owned') throw new Error(`${p.id}: not a business-owned dossier asset`)
  const src = join(repo, 'dossier', slug, a.file)
  const filename = `${p.id}.jpg`
  const img = sharp(src).rotate(p.rotate ?? undefined)
  const out = await img.jpeg({ quality: 95 }).toFile(join(mediaDir, filename))
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
   intro → hero + lead · offer → rooms · about[0] → breakfast · info[0] → what is here ·
   about[1] → the staff · info[1] → getting here. Words untouched. */
const blocks = copy.copyBlocks
const pick = (heading) => {
  const b = blocks.find((x) => x.heading === heading)
  if (!b) throw new Error('copy block missing: ' + heading)
  return b
}
const ordered = [
  pick('Five minutes from Kabalana Beach'),
  pick('Dorms and private rooms'),
  pick('Breakfast, every day'),
  pick('What is here'),
  pick('What guests say about the staff'),
  pick('Getting here'),
].map((b, i) => ({ id: `seed-block-${i + 1}`, ...b }))
if (ordered.length !== blocks.length) throw new Error('copy blocks changed; update the order above')

/* Testimonials in slot order: rooms, breakfast, staff (large), staff, staff. Verbatim. */
const tOrder = ['Wolfgang, Austria', 'Elena, Germany', 'Mia, USA', 'Clara, United Kingdom', 'Saketh, England']
const testimonials = tOrder.map((author, i) => {
  const t = copy.testimonials.find((x) => x.author === author)
  if (!t) throw new Error('testimonial missing: ' + author)
  return { id: `seed-quote-${i + 1}`, quote: t.quote, author: t.author, source: t.source, date: t.date ?? null }
})

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))

/* schema v0.4: ratings[].capturedAt is required and is the deployer's — the day the harvester read
   the score off the platform. It is dossier.reviews.<platform>.fetched_at, never today's date. */
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
  rooms: rowIds(copy.rooms, 'room').map((r) => ({ sleeps: null, note: null, photo: null, ...r })),
  stayInfo: { checkInFrom: null, checkInTo: null, checkOutFrom: null, checkOutTo: null, minNights: null, note: null, ...copy.stayInfo },
  lessons: [],
  credentials: [],
  rentals: [],
  brands: [],
  shaping: null,
  /* v0.3: concepts.md concept 3 maps dossier "Kabalana beach break" → Rosa id `kabalana`. */
  forecast: { enabled: true, rosaSpotId: 'kabalana', spotName: 'Kabalana' },
  updatedAt: null,
  createdAt: null,
}

writeFileSync(
  join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: doc } }, null, 2) + '\n',
)
console.log(`seed: ${slug} — 1 locale, ${photos.length} photos → src/tenant/`)
