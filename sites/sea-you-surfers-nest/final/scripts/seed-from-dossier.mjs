#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh). Plumbing pattern from
 * sites/lotus-surf-house/final/scripts/seed-from-dossier.mjs; the photo order, alt text and gap content are this
 * design's (the picked interactive mockup, "In the palms", mockups/interactive/src/build.py).
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.11). No Payload tenant exists before a sale (station 8).
 *   src/gaps/gaps.json                            SCHEMA GAP content: what the design shows that the schema has
 *       no field for (notes.md "schema gaps"). Every value is copied or shortened from copy/en.json or the
 *       dossier, never invented.
 *
 * Every word comes from copy/en.json (passed at 4c). The booking URLs and the phone are checked against
 * dossier.json character for character; the seed fails if any differs. The hero upload is the graded img-003
 * (make-media.sh writes it after this script, as img-003-graded.jpg; this script copies the original first).
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'sea-you-surfers-nest'
const repo = join(siteDir, '..', '..')
const fail = (m) => { throw new Error('seed: ' + m) }

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)

if (copy.bookingLinks[0].url !== dossier.booking.engine_url.value) fail('booking URL differs from the dossier')
const others = dossier.booking.other_engines.value.map((o) => o.url)
for (const l of copy.bookingLinks.slice(1)) if (!others.includes(l.url)) fail(`${l.url} is not in the dossier's other_engines`)
if (copy.contact.phone !== dossier.contact.phone.value) fail('phone differs from the dossier')

/* Alt text: exactly the alt the picked mockup carries (mockups/interactive/src/build.py ALT, written from the
   crops the page uses, checked by the 4f critics). */
const ALT = {
  'img-003': 'A mint-green table with a potted pothos and two mint chairs on the upstairs balcony, coconut palm fronds filling the view beyond the white parapet',
  'img-051': 'A courtyard doorway under a carved grey fanlight, a mint four-poster with a teal throw inside, carved masks and a carved shutter on the white wall, plants in pots',
  'img-002': 'A mint-green four-poster double made up in white linen, a grey panelled door and a small black mirror on the wall behind it',
  'img-015': 'A gabled mint-green four-poster with lime sheets, grey and striped pillows and a teal velvet throw, grey doors either side',
  'img-012': 'A mint four-poster with lime-green sheets and pillows and a towel roll, a timber towel ladder by the shuttered window',
  'img-022': 'Lime-green sheets and pillows on a mint four-poster, the teal throw at the foot and a potted plant beside the bed',
  'img-013': 'A mint-framed mirror with a little shelf on the bedroom wall, the corner of a lime-green bed below it and a dark green door to the side',
  'img-033': 'A grey panelled door with a carved roundel, a black mirror and a mint bedside cabinet beside a bed in white linen',
  'img-005': 'A mint four-poster with grey pillows and a teal velvet throw, a timber towel ladder and a mint cabinet with a plant beside it',
  'img-026': 'A mint four-poster with a teal velvet throw over lime sheets and striped pillows, a grey door behind',
  'img-009': 'A mint four-poster with grey sheets and a folded towel, a timber towel ladder and a green mirror on the wall behind',
  'img-025': 'A round wooden side table with a white tea set between two green chairs, the foot of a bed with a teal throw at the edge',
  'img-071': 'The courtyard bench with turquoise cushions against a grey wall, a small wooden stool in front and palms above the wall',
  'img-006': 'A corner of the courtyard: a potted plant, a wooden stool with a chequerboard top and a concrete bench below a grey door',
  'img-007': 'A mint table laid with a white teapot, two cups and a pink rose in a little pot, on a red-oxide floor',
  'img-039': 'A round wooden table with a white tea set between two green chairs',
  'img-041': 'A carved wooden settee with a cane seat beside a low table, big leaves in the foreground',
  'img-045': 'Two carved wooden chairs with cane seats at a small round table on the balcony',
  'img-037': 'A wooden stool with a chequerboard top beside a concrete bench, a leaf in the foreground',
  'img-038': 'A variegated pothos in a white pot on a concrete ledge, big leaves behind it',
  'img-077': 'The long upstairs balcony: a settee with green cushions, mint tables and chairs, and palms beyond the railing',
  'img-036': 'A wooden surfboard fixed upright to a grey garden wall with a tap and a shower head, palms above the wall',
  'img-069': 'Carved wooden masks hanging on a wall beside a doorway, leaves at the edge',
  'img-001': 'The round sign by the road: Sea You, The Surfers Nest, Midigama, with a wave, a board, a sun and a palm, against palms and a cloudy sky',
}

/* photos[] in slot order (src/lib/slots.mjs). Room galleries follow Booking.com's own room tags (dossier
   room_types[].note); img-010 (the WC door) is left out of Standard at 4g: Booking.com lists 0 bathrooms for it. */
const ORDER = [
  'img-003',                                                       // 0 first screen + closing band
  'img-051',                                                       // 1 the carved-door band
  'img-002', 'img-015', 'img-012', 'img-022', 'img-013', 'img-033', // 2–7 Deluxe Double Room
  'img-005', 'img-026', 'img-009', 'img-025',                      // 8–11 Standard Double Room
  'img-071', 'img-006', 'img-007', 'img-039', 'img-041', 'img-045', 'img-037', 'img-038', 'img-077', // 12–20 shelf
  'img-036', 'img-069', 'img-001',                                 // 21 shower, 22 masks, 23 sign
]
const tagged = (label) => (dossier.room_types.find((r) => r.value?.label === label)?.note ?? '')
for (const id of ORDER.slice(2, 8)) if (!tagged('Deluxe Double Room').includes(id.slice(4))) fail(`${id} is not tagged to the Deluxe Double Room`)
for (const id of ORDER.slice(8, 12)) if (!tagged('Standard Double Room').includes(id.slice(4))) fail(`${id} is not tagged to the Standard Double Room`)

const M = join(final, 'src', 'tenant', 'media')
rmSync(M, { recursive: true, force: true })
mkdirSync(M, { recursive: true })
let mediaId = 0
const mediaDoc = (id, filename = `${id}.jpg`) => {
  const im = images.get(id) ?? fail(`no dossier image ${id}`)
  if (im.license !== 'business-owned') fail(`${id} is not business-owned`)
  if (!ALT[id]) fail(`no alt text for ${id}`)
  copyFileSync(join(assets, im.file), join(M, filename))
  return {
    id: ++mediaId, alt: ALT[id], filename, mimeType: 'image/jpeg', filesize: statSync(join(M, filename)).size,
    width: im.width ?? null, height: im.height ?? null, focalX: 50, focalY: 50,
  }
}
/* the hero row: img-003 as the deployer would upload it after the grade (make-media.sh overwrites the copy) */
const photos = ORDER.map((id, n) => ({ image: mediaDoc(id, n === 0 ? 'img-003-graded.jpg' : `${id}.jpg`), caption: null }))

/* Guests open on Kenza ("just steps away from the sea"), then the copy's order, as in the mockup. Only the order
   changes: every quote stays verbatim, none added or dropped. */
const LEAD = ['Kenza', 'Niamh', 'Marina, Italy', 'Molly Jayne', 'Raul']
const testimonials = LEAD.map((a) => copy.testimonials.find((t) => t.author === a) ?? fail(`no testimonial by ${a}`))
if (testimonials.length !== copy.testimonials.length) fail('testimonial count changed')
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
  testimonials: testimonials.map((t) => pick(t, ['quote', 'author', 'source', 'lang', 'date'])),
  spot: copy.spot ?? null,
  season: copy.season ?? null,
  languagesSpoken: copy.languagesSpoken ?? [],
  rooms: copy.rooms.map((r) => ({ ...pick(r, ['label', 'beds', 'sleeps', 'note']), photo: null })),
  stayInfo: pick(copy.stayInfo, ['checkInFrom', 'checkInTo', 'checkOutFrom', 'checkOutTo', 'minNights', 'note']),
  lessons: [], credentials: [], rentals: [], brands: [],
  forecast: { enabled: false, rosaSpotId: null, spotName: null },   // concepts §3: no named break, no forecast
  updatedAt: null,
  createdAt: null,
}
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: site } }, null, 1) + '\n')

/* ---------- SCHEMA GAP content ---------- */
const rc = dossier.room_types.find((r) => r.value?.sleeps === 14)?.value ?? fail('no room count in the dossier')
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.11 has no field for. Written by scripts/seed-from-dossier.mjs from copy/en.json and dossier.json; listed in notes.md "schema gaps". Edit there, not here.',
  typeLine: {
    value: dossier.business.google_category.value.replace('&', 'and'),
    _source: 'the hero line "Bed and breakfast | Midigama, Sri Lanka" (4f r1, critic d4: type + place on the first screen). businessType is an enum (beach_lodging) with no display wording; this is Google\'s category (dossier business.google_category, "Bed & breakfast")',
  },
  houseCount: {
    rooms: rc.label.match(/^Airbnb: (\d+) bedrooms/)?.[1] ? Number(rc.label.match(/^Airbnb: (\d+) bedrooms/)[1]) : fail('no bedroom count'),
    sleeps: rc.sleeps,
    allDoubles: true,
    _source: 'the glance line "7 rooms, all doubles | sleeps 14". rooms[] holds the two room types Booking.com sells, not the house\'s count; the copy says it in words ("All seven rooms are doubles, and between them they sleep fourteen.", Seven rooms ¶1); dossier room_types[3] (Airbnb, 7 bedrooms, 1 double bed each, sleeps 14)',
  },
  host: {
    firstName: 'Ashly',
    _source: 'the "A question first" answer\'s button, "Ask Ashly on Airbnb". The schema has no host / owner name for a lodging site (team[] is a brand module); the name is the copy\'s ("Your host is Ashly.", copyBlocks about "Ashly") and dossier business.owner',
  },
  bookingRoles: {
    couple: [0, 1],
    group: [2],
    question: 1,
    _source: '"Who\'s coming?": which bookingLinks[] row answers which tile (Two of you → the Booking.com listing and the Airbnb room listing; A group → the whole house on Airbnb; A question first → Airbnb\'s messaging on the room listing, dossier contact.airbnb_messaging). bookingLinks[] rows have no audience field',
  },
  everyRoom: [
    { icon: 'bed', text: 'Mint-green four-poster double' },
    { icon: 'throw', text: 'Teal velvet throw' },
    { icon: 'ladder', text: 'Timber towel ladder' },
    { icon: 'cabinet', text: 'Green cabinet with a mirror' },
  ],
  _everyRoom: 'the "In every room" icon list (concepts.md §3): the objects the copy names in "Seven rooms" ¶2, shortened; the fifth item is amenities "Fan and mosquito net", read from content.json. The schema has no per-room feature list',
}
mkdirSync(join(final, 'src', 'gaps'), { recursive: true })
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')
console.log(`seed: content.json (${photos.length} photos, ${site.rooms.length} rooms, ${site.testimonials.length} testimonials), gaps.json`)
