#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh). Plumbing pattern from
 * sites/lotus-surf-house/final and sites/cheeky-monkey/final (room slides in the gap file); the photo order, alt text
 * and gap content are this design's (the picked unique mockup, "Round the clock", mockups/unique/src/build.py).
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.10). No Payload tenant exists before a sale (station 8).
 *   src/gaps/gaps.json + src/gaps/media/          SCHEMA GAP content: what the design shows that the schema has
 *       no field for (notes.md "schema gaps"). Every value is copied or cut from copy/en.json or the dossier.
 *
 * Every word comes from copy/en.json (passed at 4c). The booking URL and the phone are checked against
 * dossier.json character for character; the seed fails if either differs.
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'coconut-surf-inn-guest-house-and-restaurant'
const repo = join(siteDir, '..', '..')
const fail = (m) => { throw new Error('seed: ' + m) }

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)

if (copy.bookingLinks[0].url !== dossier.booking.engine_url.value) fail('booking URL differs from the dossier')
if (copy.contact.phone !== dossier.contact.phone.value) fail('phone differs from the dossier')

/* Alt text: exactly the alt the picked mockup carries (mockups/unique/src/build.py ALT, written from each photograph
   as seen on contact sheets and checked by the 4f critics). */
const ALT = {
  'img-009': 'The view from the roof: coconut palms over the open green and the beach shacks, the sea beyond, with white water breaking on the reef',
  'img-103': 'The thatched roof terrace in the afternoon: a grey hammock slung between timber posts, a swing seat, and the sea beyond the palms',
  'img-008': 'Three coconut palms against a pink and orange sunset sky over the beach',
  'img-099': 'The house at night, its upper-floor restaurant lit with strings of bulbs among the palms',
  'img-105': 'The restaurant upstairs: cushioned benches with saffron and crimson cushions around a low dark table, the sea and palms beyond the railing',
  'img-076': 'Double bed with a grey cover and red cushions, a ceiling fan and an air conditioner, the balcony doors open onto green',
  'img-073': 'Double bed with red cushions against a rust-red wall, a ceiling fan and an air conditioner above',
  'img-079': 'Double doors open onto the balcony, rattan chairs and banana plants beyond',
  'img-068': 'The balcony: two rattan chairs with magenta cushions and a round rattan table beside the room door',
  'img-077': 'Rattan chairs with magenta cushions on the balcony above banana plants',
  'img-074': 'Bathroom with grey polished walls, a wall-hung basin, a timber-framed mirror and a toilet',
  'img-035': 'Double bed with a green towel beside red-framed glass doors and white curtains',
  'img-037': 'Double bed on a dark timber frame with a green towel, the bedside lamps lit',
  'img-034': 'Red-framed double doors open into the room in the evening, a towel ladder beside them',
  'img-030': 'The veranda: a hammock, a wooden bench, a surfboard against the wall and a potted palm',
  'img-017': 'A hammock on the veranda in front of the red-framed glass doors',
  'img-064': 'Bathroom with an electric water heater above the shower, and a toilet',
  'img-040': 'Double bed under a wall lamp, with a chair and a bedside table, grey walls',
  'img-036': 'A carved dark-wood bed beside an antique dresser and a red wall',
  'img-053': 'Grey concrete bathroom with a shower and a toilet',
  'img-031': 'Room with two beds, a red feature wall and a ceiling fan',
  'img-045': 'A long room with two beds, a red feature wall and a wall-mounted desk',
  'img-022': 'A long room with concrete walls, a wall-mounted desk and stool, and a red wall',
  'img-027': 'The room entrance: a red wall, a wooden ladder rail and a wall lantern',
  'img-047': 'Bed with a rolled purple towel under a mosquito net',
  'img-046': 'An open door onto an older room with a mosquito-net bed',
  'img-048': 'Doorway into a bedroom with a net canopy',
  'img-049': 'Room doors with frosted panels, standing open',
  'img-056': 'Bed under a white mosquito-net canopy',
  'img-057': 'Net-canopy bed beside a driftwood rail hung on ropes',
  'img-059': 'Bed with a mosquito net and a wall shelf',
  'img-061': 'A plain older bathroom with a white pedestal basin',
  'img-006': 'The skylit light-well: palms growing out of a shallow jade water channel between red-framed windows',
  'img-007': 'The courtyard water channel with palms, between the red-framed windows of the rooms',
  'img-011': 'A corridor beside the water channel, palms and red-framed windows',
  'img-019': 'Looking down the stairwell through a screen of rods to the pebble-paved courtyard',
  'img-016': 'The side lawn with surfboards racked against the wall',
  'img-002': 'The round Coconut Surf Inn sign, a palm in front of an orange sun, on the grey entrance wall in leaf shade',
}

/* photos[] in slot order (src/lib/slots.mjs). img-009 is two rows: the first screen and the break's frame are
   different crops, and an owner may change one without the other. */
const ORDER = [
  'img-009',                                         // 0 the first screen (calm's frame, Alon's tweak at gate b)
  'img-103', 'img-008', 'img-099', 'img-105', 'img-009', // 1–5 the clock: afternoon, sunset, 22:00, 7:30, the break
  'img-006', 'img-007', 'img-019', 'img-011', 'img-016', 'img-030', // 6–11 inside the house, three columns
  'img-002',                                         // 12 the sign, getting here
]

/* rooms in the page's order: A/C rooms first (the photographs sell them), fan rooms after, never hidden (concepts §3).
   4g fix 3 (experience critic, 4f round 2): every A/C room opens on its widest photograph, never a bed close-up:
   Superior on img-037 (the room seen whole), the 2 + 1 on img-036 (the carved bed and the dresser), the family room
   on img-045 (wide-angle, both beds); the balcony room already opened on img-076 (the room and its balcony). */
const ROOMS = [
  ['Deluxe Double Room with Balcony', ['img-076', 'img-073', 'img-079', 'img-068', 'img-077', 'img-074']],
  ['Superior Double Room', ['img-037', 'img-035', 'img-034', 'img-017', 'img-064']],
  ['Deluxe Double Room (2 Adults + 1 Child)', ['img-036', 'img-040', 'img-053']],
  ['Deluxe Family Room', ['img-045', 'img-031', 'img-022', 'img-027']],
  ['Budget Double Room', ['img-046', 'img-047', 'img-048', 'img-049']],
  ['Budget Single Room', ['img-056', 'img-057', 'img-059', 'img-061']],
]

const M = join(final, 'src', 'tenant', 'media'), GM = join(final, 'src', 'gaps', 'media')
for (const d of [M, GM]) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }) }
const asset = (id) => {
  const im = images.get(id) ?? fail(`no dossier image ${id}`)
  if (im.license !== 'business-owned') fail(`${id} is not business-owned`)
  if (!ALT[id]) fail(`no alt text for ${id}`)
  return im
}
let mediaId = 0
const docs = new Map()
const mediaDoc = (id) => {
  if (docs.has(id)) return docs.get(id)
  const im = asset(id), filename = `${id}.jpg`
  copyFileSync(join(assets, im.file), join(M, filename))
  const doc = {
    id: ++mediaId, alt: ALT[id], filename, mimeType: 'image/jpeg', filesize: statSync(join(M, filename)).size,
    width: im.width, height: im.height, focalX: 50, focalY: 50,
  }
  docs.set(id, doc)
  return doc
}
const photos = ORDER.map((id) => ({ image: mediaDoc(id), caption: null }))

const byLabel = new Map(copy.rooms.map((r) => [r.label, r]))
const dossierRoom = new Map(dossier.room_types.map((r) => [r.value.label, r]))
const rooms = ROOMS.map(([label, ids]) => {
  const r = byLabel.get(label) ?? fail(`no room ${label} in the copy`)
  for (const id of ids) {
    const rt = asset(id).room_types ?? []
    if (!rt.includes(label)) fail(`${id} is not tied to ${label} in the dossier (images[].room_types)`)
  }
  return { label: r.label, beds: r.beds ?? null, sleeps: r.sleeps ?? null, note: r.note ?? null, photo: mediaDoc(ids[0]) }
})
if (rooms.length !== copy.rooms.length) fail('the copy has a room the design does not place')

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
  heroVideo: null,
  heroVideoPoster: null,
  videos: [],
  contact: {
    phone: copy.contact.phone || null,
    whatsapp: copy.contact.whatsapp || null,
    email: copy.contact.email || null,
    address: copy.contact.address || null,
    mapUrl: copy.contact.mapUrl || null,
  },
  bookingLinks: copy.bookingLinks.map((l) => pick(l, ['label', 'url'])),
  amenities: copy.amenities.map((a) => pick(a, ['label', 'note'])),
  ratings: copy.ratings.map((r) => pick(r, ['platform', 'score', 'scale', 'count', 'url', 'capturedAt'])),
  testimonials: copy.testimonials.map((t) => pick(t, ['quote', 'author', 'source', 'lang', 'date'])),
  spot: copy.spot ?? null,
  season: copy.season ?? null,
  languagesSpoken: copy.languagesSpoken ?? [],
  rooms,
  stayInfo: pick(copy.stayInfo, ['checkInFrom', 'checkInTo', 'checkOutFrom', 'checkOutTo', 'minNights', 'note']),
  lessons: [], credentials: [], rentals: [], brands: [],
  /* schema v0.3 forecast. concepts.md "The dossier-spot → Rosa-spot mapping" (checked live 2026-11-05): the inn's own
     break, Coconuts (dossier break.name, named by the business), is Rosa's `weligama-west` ("Coconut", Midigama,
     141 m from the Google pin). Never `coconut-beach`, which is Arugam Bay. spotName is the business's own name. */
  forecast: { enabled: true, rosaSpotId: 'weligama-west', spotName: 'Coconuts' },
  updatedAt: null,
  createdAt: null,
}
if (site.forecast.rosaSpotId !== 'weligama-west') fail('Rosa spot must be weligama-west')
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: site } }, null, 1) + '\n')

/* ---------- SCHEMA GAP content ---------- */
function pin() {
  const ll = dossier.location?.lat_lng
  const [lat, lng] = Array.isArray(ll?.value) ? ll.value : []
  if (!(Math.abs(lat) <= 90 && Math.abs(lng) <= 180)) fail('dossier location.lat_lng is not a [lat, lng] pair')
  return { lat, lng, _source: `dossier location.lat_lng (the Google pin, ${ll.source_url}, fetched ${ll.fetched_at})` }
}
const HERO_LINE = 'A guesthouse in Gurubebila, between Midigama and Weligama'
if (!copy.tagline.startsWith(HERO_LINE)) fail('the hero line is no longer words of the tagline')
const roomGalleries = {}
for (const [label, ids] of ROOMS) {
  roomGalleries[label] = ids.slice(1).map((id) => {
    const im = asset(id), file = `${id}.jpg`
    copyFileSync(join(assets, im.file), join(GM, file))
    return { file, alt: ALT[id], width: im.width, height: im.height }
  })
}
const roomFeature = {}
for (const [label] of ROOMS) {
  const ac = dossierRoom.get(label)?.value?.air_conditioning
  if (typeof ac !== 'boolean') fail(`dossier room_types has no air_conditioning for ${label}`)
  const note = byLabel.get(label).note
  if (ac !== /Air conditioning, fan and hot water/.test(note) || ac === /no air conditioning/.test(note)) fail(`room note and dossier disagree on A/C for ${label}`)
  roomFeature[label] = ac ? 'ac' : 'fan'
}
/* the clock's "Until 22:00" and "From 7:30": the restaurant's hours, said only in hoursNote (openingHours[] is the
   business's hours, and this guesthouse publishes none; the restaurant has no hours field of its own) */
const hm = /from (\d{1,2}:\d{2}) to (\d{1,2}:\d{2})/.exec(copy.hoursNote ?? '') ?? fail('hoursNote has no "from HH:MM to HH:MM"')
const author = (first) => (copy.testimonials.find((t) => t.author.split(',')[0] === first) ?? fail(`no testimonial by ${first}`)).author
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs from copy/en.json and dossier.json; listed in notes.md "schema gaps". Edit there, not here.',
  heroLine: {
    value: HERO_LINE,
    _source: 'the first-screen line (concepts.md §6 heroLine gap): the tagline cut before ", on the south coast of Sri Lanka." (4f round 1: type and place on the first screen). The full tagline opens the check-in paragraph.',
  },
  roomFeature,
  _roomFeature: 'the chip on each room\'s photos ("A/C | Hot water" or "Fan"): dossier room_types[].air_conditioning, checked against the room note; rooms[] has no features field',
  roomGalleries,
  _roomGalleries: 'rooms[].photo holds one photo (the first slide); the other slides have no field (concepts.md §6, rooms[].photos[]). Files in src/gaps/media/; every one is tied to its room by dossier images[].room_types',
  momentQuotes: { afternoon: author('Erin'), morning: author('Janno') },
  _momentQuotes: 'which testimonials[] sit in the clock set-piece (by author), beside "On the roof" and "The Eranga family home"; each review shows once on the page, so the guests slideshow holds the others. testimonials[] has no placement field',
  restaurantHours: { opens: hm[1], closes: hm[2], _source: `hoursNote ("${copy.hoursNote}"); dossier restaurant_hours` },
  geo: pin(),
}
mkdirSync(join(final, 'src', 'gaps'), { recursive: true })
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: content.json (${photos.length} photo rows, ${rooms.length} rooms, ${site.testimonials.length} testimonials), gaps.json (${Object.values(roomGalleries).flat().length} room slides)`)
