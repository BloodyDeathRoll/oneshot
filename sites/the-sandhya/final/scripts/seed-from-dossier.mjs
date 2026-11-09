#!/usr/bin/env node
// sites/the-sandhya/final/scripts/seed-from-dossier.mjs — station 4g stand-in for the CMS.
// No Payload tenant exists before a sale (station 8), so this writes what the deployer's first seed
// would upload, in the shape scripts/fetch-tenant.mjs would write from Payload:
//   src/tenant/content.json   the passed copy (sites/the-sandhya/copy/en.json, never retyped) plus the
//                             media documents, in schemas/site-content.md's shape
//   src/tenant/media/*.jpg    the uploads: the dossier's own photographs, unchanged, except img-013, which
//                             is uploaded cut to the drawn map (an owner would upload the map itself)
//   src/gaps/gaps.json        what the design shows and the schema has no field for (notes.md "schema gaps")
//   src/gaps/media/*.jpg      the room-gallery photographs beyond rooms[].photo (schema gap 1)
// Alt text was written from each photograph at 4e (mockups/calm/notes.md "images") and is carried here.
// Run by scripts/make-media.sh.
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..')
const ROOT = join(SITE, '../../..')
const ASSETS = join(ROOT, 'dossier/the-sandhya/assets')
const copy = JSON.parse(readFileSync(join(ROOT, 'sites/the-sandhya/copy/en.json'), 'utf8'))
const index = new Map(JSON.parse(readFileSync(join(ASSETS, 'index.json'), 'utf8')).map((e) => [e.id, e]))

const TM = join(SITE, 'src/tenant/media')
const GM = join(SITE, 'src/gaps/media')
for (const d of [TM, GM]) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }) }

// Focal points (percent) reproduce the mockup's crops as ratio cuts around a point (src/lib/layout.mjs).
const FOCAL = { 'img-071': [50.8, 50], 'img-038': [73.35, 50], 'img-068': [70.675, 50], 'img-032': [58.65, 50], 'img-118': [45.675, 50] }

const media = async (id, alt, dir = TM) => {
  const e = index.get(id)
  if (!e || e.license !== 'business-owned') throw new Error(`${id}: not a business-owned dossier asset`)
  const filename = `${id}.jpg`
  let { width, height } = e
  if (id === 'img-013') {
    // the hotel's drawn map, cut to the drawing (the mockup's crop 730x630 at 100,230)
    await sharp(join(ASSETS, `${id}.jpg`)).extract({ left: 100, top: 230, width: 730, height: 630 }).jpeg({ quality: 94 }).toFile(join(dir, filename))
    width = 730; height = 630
  } else copyFileSync(join(ASSETS, `${id}.jpg`), join(dir, filename))
  const [focalX, focalY] = FOCAL[id] ?? [50, 50]
  return { filename, alt, mimeType: 'image/jpeg', width, height, focalX, focalY }
}

// photos[] in the order src/lib/layout.mjs PHOTO_ROWS places them.
const PHOTOS = [
  ['img-071', 'From a white bed in a pale room, floor-to-ceiling glass doors stand between grey curtains. Through them, one palm on the centre line, a sandy beach and a green-blue sea. A round table, chairs with woven seats and a red-shaded lamp stand to the left of the bed.'],
  ['img-038', 'Tall slatted teak doors standing open under a concrete canopy, with three low steps in front. Inside, a stair and a wall of glass.'],
  ['img-068', 'From inside a room, a wall of glass in black frames. Beyond it a terrace of patterned tile with a metal lounge chair, a pool, a green lawn, two tall palms and the sea. A red-shaded lamp and a small round table stand by the curtain on the left.'],
  ['img-118', 'A blue patterned plate of wide pasta with herbs and a red crab shell on top, on a wooden table beside a dark napkin and cutlery.'],
  ['img-113', 'Seen from above, a round wooden table laid with small plates and bowls, between two slatted wooden seats on a stone floor.'],
  ['img-112', 'A blue and white bowl of salad with halved boiled eggs, avocado and tomato on a woven placemat with gold cutlery.'],
  ['img-115', 'Noodles with prawns and green beans in a patterned bowl on a wooden table, with chopsticks and a small patterned bowl.'],
  ['img-032', 'A double-height lounge. A stair climbs the pale wall on a fan of thin steel rods, low sun lies across the floor, wooden armchairs and a grey sofa face a wall of glass, and through it a long blue pool, parasols and the sea.'],
  ['img-131', 'Close on a dark wooden chair frame curving over a woven paper-cord seat.'],
  ['img-125', 'Close on a wooden hoop chair strung with white cord, with a pale cushion tied into it.'],
  ['img-139', 'Close on a pale wooden armrest over a basket-woven seat back.'],
  ['img-140', 'The corner of a teak desk with a dark inlaid panel.'],
  ['img-130', 'The arm of a blue upholstered armchair with a small wooden cap, on a pale stone floor.'],
  ['img-135', 'A black metal lounge chair and footstool with dark wooden slats on a black and white patterned tile floor.'],
  ['img-141', 'Black and white: a smiling staff member in a white shirt and glasses reading a tablet by the stair.'],
  ['img-142', 'Black and white: a staff member in a white polo shirt smoothing a bed beside a round lamp.'],
  ['img-143', 'Black and white: a staff member in a white shirt setting a cup on a low table from a tray.'],
  ['img-034', "Looking along a raked sandy beach from the edge of a green lawn, with a dark stone bowl and a slate sign bearing the hotel's logo in the foreground and two people far off by the water."],
  ['img-013', "The hotel's own drawn map of the south-west coast of Sri Lanka: the road from the airport and Colombo down past Galle to The Sandhya, drawn as a small building on the sea, with Weligama beyond it."],
  ['img-039', 'The long two-storey block with its decks and glass from the lawn: tall palms, tables under white parasols, a line of loungers beside the pool and the sea at the far right.'],
  ['img-027', "The hotel's two-storey concrete frame at blue hour, each room's curtains lit gold against a deep blue sky."],
  ['img-022', 'A sunset over the sea, gold light breaking through dark clouds onto wet sand, with palms and a roof in silhouette on the right.'],
]

// Rooms: the first photograph is rooms[].photo; the rest are the gallery the schema cannot hold.
const ROOM_SHOTS = {
  'Studio King': [
    ['img-077', 'A white bed in the foreground, glass doors looking onto the long blue pool, parasols and the sea, a tall black mirror on the far wall and a dark bench beside it.'],
    ['img-061', 'From the foot of the bed: a dark daybed, a round wooden table and glass doors with two palms and white surf beyond.'],
    ['img-062', 'The whole room: a king bed with a teak headboard on the right, a cowhide on the floor, a ceiling fan and the glass doors to the sea on the left.'],
    ['img-070', 'A king bed against a pale wall, with chevron-panelled teak wardrobe doors and a short corridor behind it.'],
    ['img-079', 'A white stone basin under a lit mirror, a teak splashback and a glass-walled shower to the left.'],
  ],
  'Studio Twin': [
    ['img-043', 'Two white beds with teak headboards, a jute rug, a round table and glass doors with the sea and palms on the right.'],
    ['img-080', 'From behind the beds: glass doors with a bent palm and white surf, curtains drawn to each side, a round table to the right.'],
    ['img-165', 'Two beds side by side on small dark rugs, chevron-panelled teak wardrobe doors on the wall behind.'],
    ['img-167', 'Two beds on the left, sliding glass doors filling the right with palms, sea and a table with a red-shaded lamp.'],
    ['img-083', 'A round wooden table with a water bottle and a small plant, two wooden chairs with woven seats and a red-shaded floor lamp in front of sheer curtains.'],
  ],
  'Studio+ King': [
    ['img-042', 'A teak desk built into the back of the bed, a tall black mirror on the wall and glass doors with a palm and the sea beyond.'],
    ['img-066', 'A teak desk built into the back of the bed, seen from the side, with a glimpse of the pool and lawn through the glass doors.'],
    ['img-067', 'The corner of a white bed, a round table with flowers and a red lamp, and glass doors with the pool, a parasol and the sea.'],
    ['img-074', 'A white bed along the left, a jute rug and sliding glass doors on the right with palms and a lounge chair outside.'],
    ['img-076', 'A deep white stand-alone tub with a teak tray against a dark wall, and through a doorway a desk and a palm in the window.'],
    ['img-073', 'A bathroom with dual white basins on the left, a towel ladder and the stand-alone soaking tub under a lit niche.'],
  ],
  'Director’s Suite': [
    ['img-087', 'The suite from the living area: a grey sofa and teak desk in front, a television on a teak unit, the bed behind and a wall of glass with palms and the sea.'],
    ['img-171', 'From the bed: a corner of glass with palms and surf on the left, a television unit, a grey sofa and a tall mirror.'],
    ['img-172', 'A long teak desk and a grey sofa in the foreground, and the bed beyond a television unit.'],
    ['img-058', 'A walk-in wardrobe lined in teak, with a white robe on a hanger and open shelves on either side.'],
    ['img-059', 'From the wardrobe, a long teak-backed double basin running towards a white tub at the far end.'],
    ['img-055', 'A marble bathroom with a stand-alone tub beyond a glass door and a double basin in the foreground.'],
  ],
}

const photos = []
for (const [id, alt] of PHOTOS) photos.push({ image: await media(id, alt), caption: null })
const rooms = []
const roomGalleries = []
for (const r of copy.rooms) {
  const shots = ROOM_SHOTS[r.label]
  if (!shots) throw new Error(`no photographs for room ${r.label}`)
  rooms.push({ ...r, photo: await media(...shots[0]) })
  const rest = []
  for (const s of shots.slice(1)) rest.push(await media(s[0], s[1], GM))
  roomGalleries.push(rest)
}

const KEYS = ['businessName', 'businessType', 'tagline', 'closing', 'featureLine', 'languages', 'copyBlocks', 'spot', 'season', 'openingHours', 'hoursNote', 'priceList', 'stayInfo', 'amenities', 'ratings', 'testimonials', 'contact', 'bookingLinks', 'socialLinks', 'languagesSpoken']
const site = Object.fromEntries(KEYS.map((k) => [k, copy[k] ?? null]))
Object.assign(site, { rooms, photos, heroVideo: null, heroVideoPoster: null, videos: [] })
const content = {
  _about: 'Written by scripts/seed-from-dossier.mjs from sites/the-sandhya/copy/en.json and dossier/the-sandhya/assets/index.json, in the shape scripts/fetch-tenant.mjs would write from Payload (schemas/site-content.md v0.11). After a sale the CMS replaces this file; edit the copy, not this file.',
  tenant: { slug: 'the-sandhya', name: copy.businessName },
  locales: { en: site },
}
writeFileSync(join(SITE, 'src/tenant/content.json'), JSON.stringify(content, null, 1) + '\n')

const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs; listed in sites/the-sandhya/notes.md "schema gaps". Edit there, not here.',
  roomGalleries,
  _roomGalleries: 'rooms[].photo holds one photograph and photos[] has no room link (concepts.md §7 gap 1). One list per rooms[] row, in order, after rooms[].photo.',
  roomKit: [
    ['bed', 'a plush pillow-top mattress with 500 thread count linen'],
    ['shower', 'a shower big enough for two'],
    ['leaf', 'Spa Ceylon amenities'],
    ['robe', 'bathrobes and slippers'],
    ['fan', 'central air conditioning and a ceiling fan'],
    ['desk', 'a desk'],
    ['plug', 'universal sockets'],
    ['dryer', 'a hairdryer'],
    ['speaker', 'a Bluetooth speaker'],
    ['wifi', 'High speed WiFi'],
    ['news', 'newspapers and magazines from around the world on PressReader'],
  ].map(([icon, text]) => ({ icon, text })),
  _roomKit: 'The rooms ¶3, cut at its commas into the icon list concepts.md asks for (mockups/calm/notes.md conflict 6); the copy has no list field. The template shows this list in place of ¶3.',
  platformLabels: { 'au.trip.com': 'Trip.com', 'www.kayak.com': 'Kayak' },
  testimonialSource: 'Trip.com',
  _labels: 'ratings[].platform and testimonials[].source are "other" with no label field and testimonials[] has no URL (concepts.md §7 gap 2); both quotes are Trip.com (copy/sources.md).',
}
writeFileSync(join(SITE, 'src/gaps/gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: ${photos.length} photos[], ${rooms.length} rooms, ${roomGalleries.flat().length} gallery photographs`)
