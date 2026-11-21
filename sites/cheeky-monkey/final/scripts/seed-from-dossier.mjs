#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh, after the video master is cut).
 * Plumbing pattern from sites/global-surf-adventures-v2/final; the photo order, alt text and gap content are
 * this design's (the picked unique mockup, "Pick your board", mockups/unique/dist/index.html).
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.9/v0.10). No Payload tenant exists before a sale (station 8).
 *   src/gaps/gaps.json + src/gaps/media/          SCHEMA GAP content: what the design shows that the schema has
 *       no field for (notes.md "schema gaps"). Every value is copied from copy/en.json or the dossier, never invented.
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'cheeky-monkey'
const repo = join(siteDir, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')
const fail = (m) => { throw new Error('seed: ' + m) }

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)

/* Alt text: exactly the alt the picked mockup carries (written from the photographs and the owner's /
   Booking.com alt text, checked by the 4f critics). */
const ALT = {
  'img-100': 'A surfer walking into the sea with his board',
  'img-103': 'A surfer in a Cheeky Monkey vest holding a yellow fish board, looking at the waves',
  'img-151': 'Cheeky Monkey surfers on the sand with coconuts, lined up in front of their colourful soft boards, palms behind',
  'img-149': 'Surf lessons at Cheeky Monkey surf camp in Sri Lanka',
  'img-135': 'Surfers off to surf from the Cheeky Monkey surf camp',
  'img-137': 'Rooftop yoga sessions at Cheeky Monkey with Sea View',
  'img-096': 'Shop interior: rack of colourful fish boards',
  'img-030': 'Superior Double Room: a bedroom with a bed with a bus on the wall',
  'img-014': 'Superior Double Room: a bedroom with a canopy bed with blue pillows',
  'img-021': 'Superior Double Room: a bedroom with a large white bed with blue pillows',
  'img-016': 'Superior Double Room: a bedroom with a bed and a desk in a room',
  'img-033': 'Superior Double Room: a bedroom with a door open to a balcony',
  'img-026': 'View from a room door to the balcony and palms',
  'img-035': 'Classic Triple Room: a hotel room with three beds and a piano',
  'img-034': 'Classic Triple Room: a room with three beds and two lamps',
  'img-036': 'Classic Triple Room: a hotel room with two beds and a desk',
  'img-037': 'Classic Triple Room: a room with three beds and a door with a window',
  'img-058': 'Double Room: a bedroom with a bed with a sign on the wall',
  'img-041': 'Double Room: a bedroom with a large white bed with blue pillows',
  'img-045': 'Double Room: a bedroom with a bed and a window with a view',
  'img-050': 'Double Room: a view of the ocean from a balcony',
  'img-053': 'Balcony with potted plants outside a room',
  'img-002': 'Small Double Room: a bedroom with a large bed with blue and white sheets',
  'img-004': 'Small Double Room: a bedroom with a bed and a mirror in it',
  'img-009': 'Small Double Room: a bedroom with a large bed in a room',
  'img-013': 'Rooftop view over the wall to the sea',
  'img-064': 'Small Twin Room: a room with two beds in a room',
  'img-063': 'Small Twin Room: a room with two beds and two lamps in it',
  'img-065': 'Small Twin Room: a bedroom with a bed and a lamp on a nightstand',
  'img-070': 'Small Twin Room: an open door to a room with a view of the ocean',
  'img-109': "Surfboards at Baba's surf shop",
  'img-146': 'Colorful surfboards for rent at Cheeky Monkey surf camp in Sri Lanka',
  'img-112': 'A guy repeairing surfboard at Cheeky Monkey surf camp',
  'img-108': 'Surf shop near Cheeky Monkey surf camp',
  'img-131': 'Happy client with white cheeky monkey surfboard',
  'img-116': 'Hand painted surfboard at Cheeky Monkey',
  'img-087': 'Shop interior: board racks with a blue board in front',
  'img-134': 'Cheeky Monkey surfer on the beach with his surfboard',
  'img-078': 'Open-air wooden rooftop bar with a sea view in golden light',
  'img-141': 'Baba, who founded Cheeky Monkey, among the boards in his shop',
  /* round 4: written from the new 4:5 crop of the print (slots.mjs 17), which ends after "BABA'S SURF" */
  'img-121': "An earlier view of the shop front: the Cheeky Monkey signpost and the Baba's Surf sign, boards outside",
  'img-082': "The building from the road: BABA'S SURF SHOP & SURF SCHOOL front, signpost and a red tuk-tuk",
  'img-105': 'Busy night at restaurant near Cheeky Monkey',
  'img-085': 'Group selfie of smiling guests and an instructor on the beach, soft boards behind',
  'img-099': 'Thatched rooftop terrace with wooden bar and sea view at dusk',
  'img-089': 'Smiling guests and staff on the beach with boards',
}
const alt = (id) => ALT[id] ?? fail(`no alt for ${id}`)

/* photos[] in the design's slot order (src/lib/slots.mjs). 'rail' is the closing board's still, a frame of
   vid-009 cut by scripts/make-media.sh. */
const PHOTOS = ['img-100', 'img-103', 'img-151', 'img-149', 'img-135', 'img-137', 'img-096',
  'img-109', 'img-146', 'img-112', 'img-108', 'img-131', 'img-116', 'img-087',
  'img-134', 'img-078', 'img-141', 'img-121', 'img-082', 'rail',
  'img-105', 'img-085', 'img-099', 'img-089', 'img-013']

/* rooms: the mockup's order and slides (dossier images[].room tags); the first slide is rooms[].photo */
const ROOMS = [
  ['Superior Double Room', ['img-030', 'img-014', 'img-021', 'img-016', 'img-033', 'img-026']],
  ['Classic Triple Room', ['img-035', 'img-034', 'img-036', 'img-037']],
  ['Double Room', ['img-058', 'img-041', 'img-045', 'img-050', 'img-053']],
  ['Small Double Room', ['img-002', 'img-004', 'img-009', 'img-013']],
  ['Small Twin Room', ['img-064', 'img-063', 'img-065', 'img-070']],
]

const mediaDir = join(final, 'src', 'tenant', 'media')
const gapDir = join(final, 'src', 'gaps', 'media')
for (const f of ['cm-board.mp4', 'cm-board-poster.jpg', 'cm-board-rail.jpg']) if (!existsSync(join(mediaDir, f))) fail(`${f} missing: run scripts/make-media.sh, not this script alone`)
rmSync(gapDir, { recursive: true, force: true })
mkdirSync(gapDir, { recursive: true })

let mediaId = 1
const meta = async (file) => { const m = await sharp(file).metadata(); return { width: m.width, height: m.height } }
const mediaDoc = (filename, altText, mimeType, dims, filesize) => ({
  id: mediaId++, alt: altText, filename, mimeType, filesize, width: dims?.width ?? null, height: dims?.height ?? null,
  url: `/api/media/file/${filename}`, focalX: 50, focalY: 50, sizes: {},
})
const putImage = async (id, dir) => {
  const a = images.get(id)
  if (!a || a.license !== 'business-owned') fail(`${id}: not a business-owned dossier image`)
  const filename = `${id}.jpg`, dst = join(dir, filename)
  copyFileSync(join(assets, a.file), dst)
  return mediaDoc(filename, alt(id), 'image/jpeg', await meta(dst), statSync(dst).size)
}
const local = async (filename, altText, mime) => {
  const p = join(mediaDir, filename)
  return mediaDoc(filename, altText, mime, mime.startsWith('image/') ? await meta(p) : null, statSync(p).size)
}

const photos = []
for (const id of PHOTOS) {
  const image = id === 'rail'
    ? await local('cm-board-rail.jpg', 'The rainbow rail of a new board in the shop, with a hand', 'image/jpeg')
    : await putImage(id, mediaDir)
  photos.push({ id: `seed-photo-${photos.length + 1}`, image, caption: null })
}

/* rooms[]: the copy's rows, in the design's order, each with its first slide as rooms[].photo */
const rooms = []
const galleries = {}
for (const [label, ids] of ROOMS) {
  const row = copy.rooms.find((r) => r.label === label) ?? fail(`room ${label} not in copy`)
  for (const id of ids) if (images.get(id)?.room && images.get(id).room !== label && id !== 'img-013') fail(`${id} is tagged ${images.get(id).room}, not ${label}`)
  rooms.push({ id: `seed-room-${rooms.length + 1}`, ...row, photo: await putImage(ids[0], mediaDir) })
  galleries[label] = []
  for (const id of ids.slice(1)) { await putImage(id, gapDir); galleries[label].push({ file: `${id}.jpg`, alt: alt(id) }) }
}

/* video (schema v0.8/0.9). Round 2 (Alon, 2026-11-04, in session: "i dont like the cartoon" / "yes, use the promo
   drone shots"): heroVideo is the drone cut scripts/make-media.sh makes from dossier.videos[] vid-001 (Lorenzo
   Marzocca's 2018 promo film for the guesthouse, licence unknown: to be confirmed with the owner at pitch); the
   business-owned shop reel (vid-009) moves to videos[0], shown in the intro's board window. */
const vid001 = dossier.videos.find((v) => v.id === 'vid-001') ?? fail('vid-001 missing')
const vid009 = dossier.videos.find((v) => v.id === 'vid-009') ?? fail('vid-009 missing')
if (vid009.license !== 'business-owned') fail('vid-009 is not business-owned')
for (const f of ['cm-drone.mp4', 'cm-drone-poster.jpg']) if (!existsSync(join(mediaDir, f))) fail(`${f} missing: run scripts/make-media.sh`)
const heroVideo = await local('cm-drone.mp4', 'Drone footage of the Midigama coast: the reef and the coast road, the village under the palms, a surfer on a green wave', 'video/mp4')
/* round 3: focalX 52 = where the phone's 9:16 poster crop and p1080 video tier are centred (the surfer of the
   loop's surf shot rides between 41% and 64% of the frame's width; a 390x844 screen shows 26% of it; checked every 0.25 s, notes.md) */
const heroVideoPoster = await local('cm-drone-poster.jpg', 'Drone view of the Midigama coast: turquoise reef water, the rock wall along the coast road, houses and palms behind', 'image/jpeg')
const videos = [{
  id: 'seed-video-1',
  video: await local('cm-board.mp4', 'New boards on the rack in Baba\'s Surf Shop, filmed close along their rails', 'video/mp4'),
  poster: await local('cm-board-poster.jpg', 'New boards on the rack in Baba\'s Surf Shop: the rails of a red, a green, a yellow splattered and a sand-coloured board side by side', 'image/jpeg'),
  description: 'New boards on the rack in Baba\'s Surf Shop, filmed close along their rails',
}]

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))
for (const r of copy.ratings) {
  const k = { google: 'google', booking: 'booking' }[r.platform]
  const at = dossier.reviews?.[k]?.fetched_at?.slice(0, 10)
  if (at && r.capturedAt !== at) fail(`rating ${r.platform}: capturedAt ${r.capturedAt} ≠ dossier ${at}`)
}
const engine = dossier.booking.engine_url.value
if (copy.bookingLinks[0].url !== engine) fail('bookingLinks[0] is not the dossier engine URL')

const doc = {
  id: null,
  tenant: { id: null, name: copy.businessName, slug },
  businessName: copy.businessName,
  businessType: copy.businessType,
  tagline: copy.tagline,
  /* round 4 (visual and experience critics, verification 1): the closing line is set in the marker hand and ran to three
     lines on a phone; shortened by the designer on the operator's fix list. Same two facts as copy.closing: rooms go
     to Booking.com (booking.engine_url), lessons and surf weeks are booked by phone (contact.phone) */
  closing: 'Book a room online, or call us about lessons and surf weeks.',
  featureLine: copy.featureLine,
  languages: ['en'],
  copyBlocks: rowIds(copy.copyBlocks, 'block'),
  openingHours: copy.openingHours ?? [],
  hoursNote: copy.hoursNote ?? null,
  priceList: rowIds(copy.priceList, 'price'),
  photos,
  heroVideo,
  heroVideoPoster: { ...heroVideoPoster, focalX: 52 },
  videos,
  contact: { ...copy.contact, whatsapp: copy.contact.whatsapp || null }, // copyeditor N6: "" → null
  bookingLinks: rowIds(copy.bookingLinks, 'link'),
  amenities: rowIds(copy.amenities, 'amenity'),
  ratings: rowIds(copy.ratings, 'rating'),
  testimonials: rowIds(copy.testimonials, 'quote'),
  spot: copy.spot,
  season: copy.season,
  languagesSpoken: copy.languagesSpoken,
  rooms,
  stayInfo: copy.stayInfo,
  lessons: rowIds(copy.lessons, 'lesson'),
  credentials: copy.credentials ?? [],
  rentals: rowIds(copy.rentals, 'rental'),
  brands: rowIds(copy.brands, 'brand'),
  shaping: null,
  /* schema v0.3 forecast. Human decision (Alon, operator, 2026-11-04): the dossier names no break (concepts.md §3 said
     "no forecast" for that reason), and Alon chose Rosa's `rams`, the Rosa spot closest to the guesthouse pin
     (Rosa's spot lat/lon vs dossier location.lat_lng, about 360 m). It is shown as the forecast for Rams, never as the
     business's own break. Carried here so a reseed keeps it. */
  forecast: { enabled: true, rosaSpotId: 'rams', spotName: 'Rams' },
  createdAt: null,
  updatedAt: null,
}
writeFileSync(join(final, 'src', 'tenant', 'content.json'), JSON.stringify({ tenant: doc.tenant, locales: { en: doc } }, null, 1) + '\n')

/* ---------- SCHEMA GAP content (notes.md "schema gaps") ---------- */
const [mark, ...rest] = ['Cheeky Monkey', 'Surf Camp']
if (`${mark} ${rest.join(' ')}` !== copy.businessName) fail('wordmark split does not rebuild businessName')
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs from copy/en.json and dossier.json; listed in notes.md "schema gaps". Edit there, not here.',
  wordmark: { mark, rest: rest.join(' '), _source: 'businessName, split for the two-line header mark' },
  place: { value: 'Midigama, Sri Lanka', _source: 'the town in contact.address (Midigama East Midigama) + country; concepts.md §6 "hero subtitle" gap' },
  seo: { title: 'Cheeky Monkey Surf Camp, Midigama | Rooms, lessons, boards', _source: 'seo 4h: the mockup\'s <title> cut to 58 chars (base.md: <= 60); businessName + the town + the tagline\'s rooms, lessons and boards (dossier room_types, lessons, rentals)' },
  weeks: [
    { group: 'Full Surf Lesson Package', title: 'Full Surf Lesson Package', short: 'Full Surf Lesson' },
    { group: 'Moderate Surf Lesson or Surf Spot Guiding Package', title: 'Moderate', short: 'Moderate' },
    { group: 'Yoga and Surf Lesson Package', title: 'Yoga and Surf', short: 'Yoga and Surf' },
    { group: 'Surf Board Rental Package', title: 'Surf Board Rental', short: 'Board Rental' },
  ],
  _weeks: 'priceList[] is flat rows; a package (three room prices under one name) has no field. `group` is the priceList label before ", private room" etc.; title/short are the card and drawer names (the copy\'s own names in "A week of surf").',
  inclusions: [
    { icon: 'moon', text: 'Seven nights' }, { icon: 'cup', text: 'Seven breakfasts' }, { icon: 'plate', text: 'Five dinners' },
    { icon: 'yoga', text: 'Two or three yoga classes' }, { icon: 'music', text: 'A party night' }, { icon: 'fire', text: 'The weekly BBQ night' },
    { icon: 'gym', text: 'Free use of the gym' },
    { icon: 'board', text: 'Your board for the lessons and the ride to the surf spot', note: 'with the three lesson packages' },
    { icon: 'lake', text: 'One lake tour in the week', note: 'USD 5 extra' },
  ],
  _inclusions: '"A week of surf" ¶5 (copy), as the icon list the design shows; no package-inclusions field',
  lessonPriceYear: { value: '2021', _source: 'copyeditor N3: lessons[] has no note, so the price date cannot ride on the row; "Lessons for your level" ¶2 says "published in 2021"' },
  stayRoomLine: { value: 'Air conditioning, a private bathroom and a private entrance in every room', _source: 'amenities[0–2] as one line (dossier room_types_note)' },
  roomGalleries: galleries,
  _roomGalleries: 'rooms[].photo holds one photo (the first slide); the other slides have no field (concepts.md §6). Files in src/gaps/media/',
  heroCredit: { person: 'Lorenzo Marzocca', what: '2018 promo film for Cheeky Monkey', url: vid001.source_url, licence: vid001.license, _source: 'dossier.videos[] vid-001 found_on ("Promotional video for Cheeky Monkey Guesthouse", uploaded 2018-02-06 by Lorenzo Marzocca) and source_url; media has no credit field. Licence unknown: to be confirmed with the owner at pitch' },
  socials: { website: dossier.contact.socials.website, instagram: dossier.contact.socials.instagram, facebook: dossier.contact.socials.facebook },
  _socials: 'socialLinks[] exists only among the v0.11 brand modules; a surf_camp has no field for its site, Instagram and Facebook',
  forecast: {
    line: 'Rams is the nearest spot Rosa covers, about 360 m from the shop.',
    _source: "round 4 (Alon, 2026-11-04; concepts.md §3 amendment of 2026-11-09): Rosa's data/index.json (rams 5.962565, 80.393597; the next, weligama-west 'Coconut', 578 m) against dossier location.lat_lng (5.9617986, 80.3967609): 360 m by haversine; 369 m from the shop's own Google listing (location.address_other_platforms). Never called the business's break",
  },
  drawer: {
    boardsTile: '400 boards to rent',
    boardStep: "400 boards for rent, in different sizes, tails and colours: shortboards, longboards and fish, and Cheeky Monkey's own boards, shaped in Bali. Scooters too.",
    _source: 'the shop block ¶1 + rentals[] as the drawer\'s board step words (mockup)',
  },
}
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: ${photos.length} photos, ${rooms.length} rooms (${Object.values(galleries).flat().length} gallery slides), hero drone cut + poster, shop reel → content.json, gaps.json`)
