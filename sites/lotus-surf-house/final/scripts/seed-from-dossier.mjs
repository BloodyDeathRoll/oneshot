#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh). Plumbing pattern from
 * sites/cheeky-monkey/final/scripts/seed-from-dossier.mjs; the photo order, alt text and gap content are this
 * design's (the picked calm mockup, "The gate", mockups/calm/src/build.py + ../lotus_data.py).
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.10). No Payload tenant exists before a sale (station 8).
 *   src/gaps/gaps.json                            SCHEMA GAP content: what the design shows that the schema has
 *       no field for (notes.md "schema gaps"). Every value is copied or shortened from copy/en.json or the
 *       dossier, never invented.
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
const slug = 'lotus-surf-house'
const repo = join(siteDir, '..', '..')
const fail = (m) => { throw new Error('seed: ' + m) }

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)

if (copy.bookingLinks[0].url !== dossier.booking.engine_url.value) fail('booking URL differs from the dossier')
if (copy.contact.phone !== dossier.contact.phone.value) fail('phone differs from the dossier')

/* Alt text: exactly the alt the picked mockup carries (mockups/lotus_data.py ALT, written from each photograph
   opened at full size, checked by the 4f critics). */
const ALT = {
  'img-002': 'An upstairs King Room: a bed under a white mosquito net with a blush trim, glass doors open onto a balcony with rattan chairs and trees',
  'img-004': 'A long wooden table and chairs on the roof terrace, green treetops behind',
  'img-008': 'A new bathroom with a poured-concrete basin, a round lit mirror and a walk-in shower',
  'img-009': 'The garden lawn with a stone birdbath in front of the tiled-roof garden wing and its veranda',
  'img-010': 'A King Room bed under a mosquito net, tall glass doors open to the trees',
  'img-015': 'A King Room with the bed under its net, an air-conditioning unit and a wooden wall shelf',
  'img-019': 'The carved wooden garden gate standing open in a slate wall under a canopy of leaves, the sunlit garden through the doorway',
  'img-020': 'The garden under a big shade tree: a hammock by the wall, the lawn in dappled sun, a ping-pong table further back',
  'img-021': 'A corner of the roof terrace: a Buddha on a carved pedestal, yoga mats and cushions on the floor, palms beyond',
  'img-022': 'A bronze Buddha on its pedestal with offerings of fruit and flowers, among them a violet blossom',
  'img-025': 'From inside a King Room: glass doors open onto the balcony, two rattan chairs and a small table, palms and sky',
  'img-028': 'A ground-floor bathroom with grey flower-patterned wall tiles, black floor tiles, a pebble shower floor, a toilet and a basin',
  'img-029': 'A garden twin room with two single beds, striped covers, wooden wall shelves and a round woven rug',
  'img-030': 'A ground-floor bathroom with sage-green walls, a shower, a toilet and a small basin',
  'img-032': 'The veranda of the garden rooms: rattan chairs and a glass table on a red cement floor',
  'img-034': 'A King Room bedside: the bed under its net, an air-conditioning remote on a wooden side table',
  'img-043': 'The Deluxe Queen Room, wide-angle: a double bed under a mosquito net, rattan chairs and a rattan sofa, wooden shelves and a surfboard',
  'img-044': 'The wooden deck of a garden room, with rattan chairs and a glass table',
}

/* photos[] in slot order (src/lib/slots.mjs): the gate, then Alon's three (gate b: the King Room img-002 and
   img-025, the roof img-021) at the top of the page, then the rest as the picked mockup places them. */
const ORDER = [
  'img-019',                                   // 0 the gate
  'img-002', 'img-025',                        // 1–2 the King Rooms
  'img-010', 'img-015', 'img-034', 'img-008',  // 3–6 the King strip
  'img-021', 'img-022', 'img-004',             // 7–9 the roof
  'img-020',                                   // 10 the garden
  'img-029', 'img-043', 'img-030', 'img-009', 'img-028', 'img-044', // 11–16 garden rooms slideshow
  'img-032',                                   // 17 the porch
]

const M = join(final, 'src', 'tenant', 'media')
rmSync(M, { recursive: true, force: true })
mkdirSync(M, { recursive: true })
let mediaId = 0
const mediaDoc = (id) => {
  const im = images.get(id) ?? fail(`no dossier image ${id}`)
  if (im.license !== 'business-owned') fail(`${id} is not business-owned`)
  if (!ALT[id]) fail(`no alt text for ${id}`)
  const filename = `${id}.jpg`
  copyFileSync(join(assets, im.file), join(M, filename))
  return {
    id: ++mediaId, alt: ALT[id], filename, mimeType: 'image/jpeg', filesize: statSync(join(M, filename)).size,
    width: im.width, height: im.height, focalX: 50, focalY: 50,
  }
}
const photos = ORDER.map((id) => ({ image: mediaDoc(id), caption: null }))

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
  rooms: copy.rooms.map((r) => ({ ...pick(r, ['label', 'beds', 'sleeps', 'note']), photo: null })),
  stayInfo: pick(copy.stayInfo, ['checkInFrom', 'checkInTo', 'checkOutFrom', 'checkOutTo', 'minNights', 'note']),
  lessons: [], credentials: [], rentals: [], brands: [],
  /* schema v0.3 forecast. Human decision (Alon, operator, 2026-11-04): the dossier names no break (the 4e gaps said
     "no forecast (no named break)"), and Alon chose Rosa's `lazy-left`, the Rosa spot closest to the Google pin
     (Rosa's spot lat/lon in data/index.json vs dossier location.lat_lng, about 290 m). It is shown only as the
     forecast for Lazy Left, never as the business's own break. Carried here so a reseed keeps it. */
  forecast: { enabled: true, rosaSpotId: 'lazy-left', spotName: 'Lazy Left' },
  updatedAt: null,
  createdAt: null,
}
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: site } }, null, 1) + '\n')

/* ---------- SCHEMA GAP content ---------- */
/* 4h: the Google pin, from dossier location.lat_lng; the seed fails on anything but a [lat, lng] pair in range */
function pin() {
  const ll = dossier.location?.lat_lng
  const [lat, lng] = Array.isArray(ll?.value) ? ll.value : []
  if (!(Math.abs(lat) <= 90 && Math.abs(lng) <= 180)) fail('dossier location.lat_lng is not a [lat, lng] pair')
  return { lat, lng, _source: `dossier location.lat_lng (the Google pin, ${ll.source_url}, fetched ${ll.fetched_at})` }
}
const king = copy.rooms.find((r) => r.note.startsWith('Upstairs')) ?? fail('no upstairs room in the copy')
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs from copy/en.json and dossier.json; listed in notes.md "schema gaps". Edit there, not here.',
  featuredRoom: {
    label: king.label,
    title: 'The King Rooms',
    tag: 'Upstairs',
    _source: 'rooms[] has no floor and no "featured" flag. Alon at gate b: "show the king room first, its the nicest". `label` picks the rooms[] row the full-bleed band sells; `title` is the band\'s script title (the copy\'s own name, "The King Rooms upstairs are new", Old rooms and new ¶2); `tag` is that row\'s note ("Upstairs, 25 m²…"). Every other rooms[] row is listed in the garden block.',
  },
  gardenTag: {
    value: 'Ground floor',
    _source: 'the first words of the three garden rooms\' rooms[].note ("Ground floor, 20–25 m²…"); the template adds the count ("Ground floor, three room types")',
  },
  glance: [
    { text: 'Midigama Beach 250 m (Booking.com)', _source: 'spot ("Booking.com puts Midigama Beach 250 m from the house.") in short form; dossier location.distance_to_beach' },
    { text: 'Breakfast included, 8–10', _source: 'copyBlocks "Breakfast" ("…any time from 8 to 10 in the morning") in short form; dossier stay_info.breakfast_hours' },
    { text: 'Check-in any hour', _source: 'stayInfo.note ("Check-in at any hour, day or night.") in short form; dossier stay_info.check_in' },
  ],
  _glance: 'the details line under the two ratings (concepts.md §4.1): three short restatements; the schema has no short-facts field, and stayInfo has no "any hour" value (checkInFrom is null)',
  stayShort: [
    { text: 'Check-in at any hour', _source: 'stayInfo.note, sentence 1, cut before ", day or night"' },
    { text: 'Cash only', _source: 'stayInfo.note, sentence 2' },
  ],
  _stayShort: 'the line under the King Room\'s buttons, after "Check-out <checkOutFrom>–<checkOutTo>" (which comes from stayInfo)',
  /* 4h (seo): the JSON-LD geo pair. contact.mapUrl is a place_id URL with no pin, and the schema has no geo
     field (site-content.md "Not in v0.1": geo coordinates; proposal D in seo-report.md). Copied from the dossier. */
  geo: pin(),
}
mkdirSync(join(final, 'src', 'gaps'), { recursive: true })
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: content.json (${photos.length} photos, ${site.rooms.length} rooms, ${site.testimonials.length} testimonials), gaps.json`)
