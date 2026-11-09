#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh). Plumbing pattern from
 * sites/coconut-surf-inn-guest-house-and-restaurant/final and sites/cheeky-monkey/final (video uploads, room slides
 * in the gap file); the photo order, crops, alt text and gap content are this design's (the picked interactive
 * mockup, "Morning swim", mockups/interactive/src/build.py + make-media.sh, 4f round 2).
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.11). No Payload tenant exists before a sale (station 8).
 *   src/gaps/gaps.json + src/gaps/media/          SCHEMA GAP content: what the design shows that the schema has
 *       no field for (notes.md "schema gaps"). Every value is copied or cut from copy/en.json or the dossier.
 *
 * Every word comes from copy/en.json (passed at 4c). The booking URLs, the phone and WhatsApp numbers are checked
 * against dossier.json character for character; the seed fails if any differs.
 * The three video uploads are cut here with ffmpeg (no audio, near-lossless masters); the build makes every
 * served rendition from them (cms/publisher/src/video.mjs + scripts/video-site.mjs).
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'panta-rei-resort'
const repo = join(siteDir, '..', '..')
const fail = (m) => { throw new Error('seed: ' + m) }

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const videos = new Map(dossier.videos.map((v) => [v.id, v]))
const assets = join(repo, 'dossier', slug)

/* booking path, character for character */
if (copy.bookingLinks[0].url !== dossier.booking.engine_url.value) fail('engine URL differs from the dossier')
const engineRooms = dossier.booking.engine_rooms.value
const ROOM_ENGINE = { 'Double Room': 'Double Room', 'Triple Room': 'Triple Room', 'Family Villa': 'Family Villa', 'Suite with Private Pool': 'Suite Room With Private Pool' }
for (const l of copy.bookingLinks.slice(1)) if (engineRooms[ROOM_ENGINE[l.label]] !== l.url) fail(`room URL for ${l.label} differs from the dossier`)
if (copy.contact.phone !== dossier.contact.phone.value) fail('phone differs from the dossier')
if (copy.contact.whatsapp !== dossier.contact.whatsapp.value) fail('WhatsApp differs from the dossier')

/* Alt text: exactly the alt the picked mockup carries (mockups/interactive/src/build.py), written from each
   photograph as seen on contact sheets. */
const ALT = {
  'img-001': 'The resort from the air: red-tiled bungalows and the white two-storey main building around a long turquoise pool, jungle all round',
  'img-006': 'A guest wading into the long pool, red-roofed bungalows and tall palms beyond',
  'img-003': 'Breakfast served at a teak table under greenery: a bowl passed across, juice and fruit',
  'img-005': 'Sliders and plated dishes on a teak table in the garden',
  'img-035': 'Two guests carrying surfboards across the lawn by the pool; a woman in a straw hat crouches beside a dog',
  'img-021': 'A class from behind on the open upper floor, hands behind heads, palms beyond the railing',
  'vid-001-poster': 'Top-down view of the long pool ringed by red-tiled bungalows, loungers along the stone deck',
  'vid-002-poster': 'The resort from straight above: red-tiled bungalows in a ring around the long pool, swimmers in the water, palms all round',
  'img-028': 'Double Room: white bed with a rattan arch headboard, a wooden drawer base and rattan-panel wardrobe doors',
  'img-031': 'Bed with a rattan arch headboard beside tall teak French windows open to the garden',
  'img-029': 'Bathroom with a white vanity, a rattan-front cabinet, blue crazy-paving tiles and a window onto greenery',
  'img-007': 'Bed with a striped throw and a straw hat, rattan wardrobe doors and a round rattan rug',
  'img-013': 'Bed with a rattan arch headboard, a rattan-panel wardrobe and a round rattan rug on a polished concrete floor',
  'img-037': 'Triple Room: bed with a rattan arch headboard, a pink cushioned rocking chair and an arched rattan mirror under a white vaulted ceiling',
  'img-034': 'Freestanding white bathtub, blue crazy-paving tiles and wooden-framed windows',
  'img-036': 'Bungalow front: red tile roof, white walls, teak doors and two rattan chairs on the terrace',
  'img-010': 'Bed with a rattan arch headboard and an orange cushioned rattan armchair',
  'img-011': 'Hooks with a straw bag and a red cloth beside an arched rattan mirror',
  'img-038': 'Family Villa bedroom: tall teak French windows to the garden and a rattan arch headboard',
  'img-040': 'Freestanding white tub on pebbles in a walled outdoor bath under palms',
  'img-012': 'Room with glass sliding doors open to the lawn, a surfboard leaning outside',
  'img-014': 'Twin beds pushed together under a large palm-fan headboard, rattan pendant lamps and open shelving',
  'img-015': 'White bungalow with glass sliding doors behind dense tropical planting',
  'img-043': 'Suite: bed facing open glass doors onto a private plunge pool and two terrace chairs',
  'img-046': 'The private plunge pool on its terrace with two wooden lounge chairs, palms behind',
  'img-047': 'Bed under a large palm-fan headboard with rattan pendant lamps and a potted palm',
  'img-044': 'Walk-in shower with pale crazy-paving stone walls, a backlit niche and a built-in bench',
  'img-002': 'Palm-fan headboard, a rattan pendant lamp, a wooden stool and a potted palm',
  'img-016': 'Lounge niche with a built-in white bench, cushions and a rattan side table, the glass shower to the right',
}

const M = join(final, 'src', 'tenant', 'media'), GM = join(final, 'src', 'gaps', 'media')
for (const d of [M, GM]) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }) }
const ff = (args) => {
  const r = spawnSync('ffmpeg', ['-y', '-v', 'error', ...args], { encoding: 'utf8' })
  if (r.status !== 0) fail(`ffmpeg: ${(r.stderr || '').trim().split('\n').slice(-3).join(' | ')}`)
}
const probe = (f) => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', f], { encoding: 'utf8' })
  const [w, h] = r.stdout.trim().split(',').map(Number)
  return { width: w, height: h }
}

let mediaId = 0
const docs = new Map()
/* a photo upload: a dossier image (business-owned) or a frame file the business's own film gives */
const photoDoc = (id, focal = [50, 50]) => {
  if (docs.has(id)) return docs.get(id)
  let src, width, height
  if (id.startsWith('vid-')) {
    const v = videos.get(id.replace('-poster', '')) ?? fail(`no dossier video for ${id}`)
    if (v.license !== 'business-owned') fail(`${id} is not business-owned`)
    src = join(assets, v.poster.file); width = v.poster.width; height = v.poster.height
  } else {
    const im = images.get(id) ?? fail(`no dossier image ${id}`)
    if (im.license !== 'business-owned') fail(`${id} is not business-owned`)
    src = join(assets, im.file); width = im.width; height = im.height
  }
  if (!ALT[id]) fail(`no alt text for ${id}`)
  const ext = src.endsWith('.png') ? 'png' : 'jpg'
  const filename = `${id}.${ext}`
  copyFileSync(src, join(M, filename))
  const doc = { id: ++mediaId, alt: ALT[id], filename, mimeType: `image/${ext === 'png' ? 'png' : 'jpeg'}`,
    filesize: statSync(join(M, filename)).size, width, height, focalX: focal[0], focalY: focal[1] }
  docs.set(id, doc)
  return doc
}
/* a video upload cut from a business-owned source, no audio, near-lossless (the build re-encodes every tier) */
const videoDoc = (vid, filename, from, length, alt) => {
  const v = videos.get(vid) ?? fail(`no dossier video ${vid}`)
  if (v.license !== 'business-owned') fail(`${vid} is not business-owned`)
  const out = join(M, filename)
  ff(['-ss', String(from), '-t', String(length), '-i', join(assets, v.source_file), '-map', '0:v:0', '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out])
  const { width, height } = probe(out)
  return { id: ++mediaId, alt: alt, filename, mimeType: 'video/mp4', filesize: statSync(out).size, width: null, height: null, focalX: 50, focalY: 50, _w: width, _h: height }
}
const frameDoc = (videoFile, at, filename, alt, focal = [50, 50]) => {
  const out = join(M, filename)
  ff(['-ss', String(at), '-i', join(M, videoFile), '-frames:v', '1', '-q:v', '2', out])
  const { width, height } = probe(out)
  return { id: ++mediaId, alt, filename, mimeType: 'image/jpeg', filesize: statSync(out).size, width, height, focalX: focal[0], focalY: focal[1] }
}
const clean = (d) => { const { _w, _h, ...rest } = d; return rest }

/* heroVideo: vid-002, the dossier's cut 3–17 s (dossier videos[] vid-002 cut), uploaded as its hero-desktop rendition
   (schema v0.8 seed rule). heroVideoPoster: the dossier poster (5 s), focalX 60 = where a portrait phone looks
   (the round-2 mockup's 608 px column at x = 840 of 1920; scripts/video-site.mjs and photos.mjs both centre on it). */
const v2 = videos.get('vid-002')
const heroFile = 'vid-002-cut.mp4'
copyFileSync(join(assets, v2.renditions.find((r) => r.role === 'hero-desktop' && r.mime === 'video/mp4').file), join(M, heroFile))
const heroVideo = { id: ++mediaId, alt: 'The resort from the air: the ring of red-tiled bungalows around the long pool, then the rise over the palms to the sea at dusk',
  filename: heroFile, mimeType: 'video/mp4', filesize: statSync(join(M, heroFile)).size, width: null, height: null, focalX: 50, focalY: 50 }
const heroVideoPoster = photoDoc('vid-002-poster', [60, 50])

/* videos[0]: the Welcome clip, vid-001 4.75–12.1 s (the open-air lounge: chairs, the lounge wide, sun through the lamps;
   the mockup's round-2 cut); its poster is the 3.4 s frame (the lounge wide). videos[1]: the fitness clip, vid-003
   4–14 s (a mat class on the upper floor, 1080x1920); its poster is the first frame. */
const welcome = videoDoc('vid-001', 'vid-001-lounge.mp4', 4.75, 7.35, 'The open-air lounge: rattan pendant lamps, rattan chairs, sun through the palms')
const welcomePoster = frameDoc(welcome.filename, 3.4, 'vid-001-lounge-poster.jpg', 'The open-air lounge under the main building: orange cushioned rattan chairs, rattan pendant lamps, palms beyond')
const fitness = videoDoc('vid-003', 'vid-003-mat-class.mp4', 4, 10, 'A mat class on the open upper floor, women on their backs doing crunches')
const fitnessPoster = frameDoc(fitness.filename, 0, 'vid-003-mat-class-poster.jpg', 'A mat class on the open upper floor, women on their backs doing crunches')

/* photos[] in slot order (src/lib/slots.mjs) */
const ORDER = [
  ['img-001'],                 // 0 the ring of roofs under the room cards
  ['img-006'],                 // 1 the pool, full-bleed
  ['img-003'],                 // 2 restaurant: Breakfast
  ['img-005'],                 // 3 restaurant: Later on
  ['img-035'],                 // 4 after the surf, full-bleed
  ['img-021'],                 // 5 groups
  ['vid-001-poster'],          // 6 the closing: the ring and the pool from straight above (4g: the critics' bright closing)
]
const photos = ORDER.map(([id, f]) => ({ image: photoDoc(id, f), caption: null }))

/* rooms in the copy's order; the first id is rooms[].photo (the card), the rest the gallery (SCHEMA GAP) */
const ROOMS = {
  'Double Room': ['img-028', 'img-031', 'img-029', 'img-007', 'img-013'],
  'Triple Room': ['img-037', 'img-034', 'img-036', 'img-010', 'img-011'],
  'Family Villa': ['img-038', 'img-040', 'img-012', 'img-014', 'img-015'],
  'Suite with Private Pool': ['img-043', 'img-046', 'img-047', 'img-044', 'img-002', 'img-016'],
}
const FOCAL_Y = { 'img-040': 62, 'img-044': 45 } // the mockup's gallery crops
const dossierRoom = new Map(dossier.room_types.map((r) => [r.value.label, r.value]))
const roomGalleries = {}
const rooms = copy.rooms.map((r) => {
  const ids = ROOMS[r.label] ?? fail(`no photographs placed for ${r.label}`)
  const dr = dossierRoom.get(ROOM_ENGINE[r.label]) ?? fail(`no dossier room ${r.label}`)
  for (const id of ids) if (!dr.photos.includes(id)) fail(`${id} is not one of ${r.label}'s photos in the dossier`)
  roomGalleries[r.label] = ids.slice(1).map((id) => {
    const im = images.get(id)
    const file = `${id}.${im.file.endsWith('.png') ? 'png' : 'jpg'}`
    copyFileSync(join(assets, im.file), join(GM, file))
    return { file, alt: ALT[id] ?? fail(`no alt for ${id}`), width: im.width, height: im.height, focalY: FOCAL_Y[id] ?? 50 }
  })
  return { label: r.label, beds: r.beds ?? null, sleeps: r.sleeps ?? null, note: r.note ?? null, photo: photoDoc(ids[0]) }
})

/* the logo (img-023, white on transparent): the schema has no logo field (v0.1 list "not in v0.1") */
const logo = images.get('img-023')
copyFileSync(join(assets, logo.file), join(GM, 'logo.png'))

const pick = (o, keys) => Object.fromEntries(keys.map((k) => [k, o[k] ?? null]))
const site = {
  businessName: copy.businessName,
  businessType: copy.businessType,
  tagline: copy.tagline,
  closing: copy.closing,
  featureLine: copy.featureLine ?? null,
  languages: ['en'],
  copyBlocks: copy.copyBlocks.map((b) => pick(b, ['slot', 'heading', 'body'])),
  openingHours: copy.openingHours ?? [],
  hoursNote: copy.hoursNote ?? null,
  priceList: copy.priceList ?? [],
  photos,
  heroVideo,
  heroVideoPoster,
  videos: [
    { video: clean(welcome), poster: welcomePoster, description: welcome.alt },
    { video: clean(fitness), poster: fitnessPoster, description: fitness.alt },
  ],
  contact: pick(copy.contact, ['phone', 'whatsapp', 'email', 'address', 'mapUrl']),
  bookingLinks: copy.bookingLinks,
  amenities: copy.amenities ?? [],
  ratings: copy.ratings ?? [],
  testimonials: copy.testimonials ?? [],
  spot: copy.spot ?? null,
  season: copy.season ?? null,
  languagesSpoken: copy.languagesSpoken ?? [],
  rooms,
  stayInfo: copy.stayInfo ?? null,
  lessons: [], credentials: [], rentals: [], brands: [],
  /* v0.11 shared module: the dossier's own channels (contact.socials) */
  socialLinks: [
    { platform: 'instagram', url: dossier.contact.socials.instagram },
    { platform: 'facebook', url: dossier.contact.socials.facebook },
    { platform: 'youtube', url: dossier.contact.socials.youtube },
  ],
  forecast: null,
  updatedAt: null,
}
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: site } }, null, 1) + '\n')

/* ---------- SCHEMA GAP content ---------- */
const fit = copy.copyBlocks.find((b) => b.heading === 'Panta Fitness Club').body
if (!fit.includes('Vinyasa yoga is at 8:30 every morning; Friday is the day off.')) fail('the fitness block no longer carries the class time')
const resto = copy.copyBlocks.find((b) => b.heading === 'Restaurant and bar').body
const DISHES = {
  Breakfast: ['Smoothie bowls', 'Granola', 'Banana oat pancakes', 'Shakshuka', 'The Sri Lankan plate with egg hoppers, dhal and coconut sambal'],
  'Later on': ['Fish bowl', 'Curry of the day', 'Whole grilled fish, priced on weight', 'Dinner is a mix of traditional and modern Mediterranean dishes'],
}
for (const d of Object.values(DISHES).flat()) {
  const probeText = d.toLowerCase().replace(/^the /, '')
  if (!resto.toLowerCase().includes(probeText.split(',')[0])) fail(`dish "${d}" is not in the restaurant block`)
}
const where = copy.copyBlocks.find((b) => b.heading === 'Getting here and around').body
const DIST = [['5 km', 'Koggala Airport'], ['2.1 km', 'Ahangama station'], ['1.9 km', 'Kathaluwa station'], ['1.5 km', 'Koggala Lake'], ['A short walk', 'Kabalana Beach']]
for (const [k, n] of DIST) if (!where.includes(n.replace(' station', '')) || !(where.includes(k) || where.toLowerCase().includes(k.toLowerCase()))) fail(`distance ${k} ${n} not in the getting-here block`)

/* 4h: the business's other listings, for JSON-LD sameAs only (never shown). The schema has no field for a
   Tripadvisor listing (socialLinks[] has no tripadvisor platform; seo-report.md proposal C). The dossier keeps it under
   contact.socials (entity d25364260, "Panta_Rei_Resort-Ahangama"); the seed fails if it is anything else. Google's
   listing name equals businessName, so there is no alternateName. */
function listings() {
  const ta = dossier.contact?.socials?.tripadvisor
  if (ta && !/^https:\/\/www\.tripadvisor\.com\/Hotel_Review-g\d+-d25364260-Reviews-Panta_Rei_Resort-/.test(ta)) fail('dossier tripadvisor URL is not entity d25364260')
  return {
    sameAs: ta ? [ta] : [],
    _source: 'sameAs: dossier contact.socials.tripadvisor (reviews.tripadvisor.source_url; the score itself is behind a bot wall and is not used). JSON-LD only; Booking.com and Google come from ratings[].url, Instagram, Facebook and YouTube from socialLinks[]',
  }
}
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs from copy/en.json and dossier.json; listed in notes.md "schema gaps". Edit there, not here.',
  heroTitle: { value: 'Panta Rei, Kabalana', _source: 'concepts.md §6: the first screen\'s title until a new line is audited; businessName\'s first words + the village of the spot field ("The waves of Kabalana…")' },
  logo: { file: 'logo.png', alt: 'Panta Rei Resort, Kabalana', _source: 'dossier images[] img-023 (the business\'s logo, white on transparent); the template draws it as a mask in the text colour' },
  roomGalleries,
  _roomGalleries: 'rooms[] holds one photo per room; the drawer shows every photograph the engine lists for the room (dossier room_types[].photos)',
  menuTabs: [
    { label: 'Breakfast', dishes: DISHES.Breakfast, photo: 2 },
    { label: 'Later on', dishes: DISHES['Later on'], photo: 3 },
  ],
  _menuTabs: 'dish names cut from copyBlocks "Restaurant and bar" (no menu module in the schema); photo = photos[] index',
  classWeek: { title: 'Vinyasa yoga, every morning', time: '8:30', off: 'fri' },
  _classWeek: 'from copyBlocks "Panta Fitness Club": "Vinyasa yoga is at 8:30 every morning; Friday is the day off." (no schedule field in the schema)',
  distances: DIST.map(([k, n]) => ({ distance: k, place: n })),
  _distances: 'cut from copyBlocks "Getting here and around" (no places-nearby field in the schema)',
  listings: listings(),
}
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: ${docs.size} photos, 3 videos, ${Object.values(roomGalleries).flat().length} gallery photos, logo → src/tenant, src/gaps`)
