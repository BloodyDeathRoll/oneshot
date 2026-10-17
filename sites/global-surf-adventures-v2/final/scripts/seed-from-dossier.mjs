#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh, after the video masters are cut).
 * Plumbing adapted from sites/global-surf-adventures/final (same business, run 02); the photo order,
 * clips and alt text are this design's (the picked unique mockup, "From the air").
 *
 *   src/tenant/content.json + src/tenant/media/   the shape scripts/fetch-tenant.mjs writes from Payload
 *       (schemas/site-content.md v0.9). No Payload tenant exists before a sale (station 8); `npm run fetch`
 *       replaces both once one does.
 *   src/gaps/gaps.json + src/gaps/media/          SCHEMA GAP content: what the design shows that the schema has
 *       no field for (copy/sources.md "mockup_extras"; notes.md "schema gaps"). Survives a fetch.
 *   src/lib/labels.json                           template wording approved with the copy (mockup_extras ctas,
 *       section titles, booking microcopy). Template-owned, as the schema says interface labels are.
 *
 * Nothing is invented: every value comes from copy/en.json, dossier.json or docs/bookinglayer.md.
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'global-surf-adventures-v2'
const repo = join(siteDir, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const X = copy.mockup_extras
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)
const fail = (m) => { throw new Error('seed: ' + m) }

/* Alt text: the alt the picked mockup wrote from looking at each photograph (mockups/unique/dist/index.html,
   checked by the 4f critics); where it wrote none, the dossier's own description. */
const ALT = {
  'img-062': 'The lodge from straight above: the beach and sea wall, the coast road, white roofs around a long blue pool, and the railway line',
  'img-026': 'The pool from straight above, a coconut palm growing out of the water, swimmers and two surfboards',
  'img-005': 'The pool at water level, with the open lounge and bar behind it',
  'img-099': 'A surfer deep inside a clear turquoise barrel',
  'img-011': 'A breakfast bowl of mango, fruit and pancakes at the lodge',
  'img-129': 'Two guests in a yoga tree pose, silhouetted against the sunset',
  'img-093': 'The pool at dusk with the lodge\'s lights on',
  'img-036': 'The lodge\'s lounge and pool deck', 'img-075': 'The lodge garden and white bungalows',
  'img-077': 'The open-air lounge with cushions and hanging lamps',
  'img-016': 'A guest flipping wet hair back as she comes up in the lodge pool',
  'img-063': 'The mixed dorm room with four single beds', 'img-078': 'The dorm room\'s beds and lockers',
  'img-095': 'The dorm room from the door', 'img-042': 'The dorm\'s private outdoor bathroom',
  'img-050': 'The white bungalow wall in the sun', 'img-064': 'A corner of the dorm room',
  'img-080': 'The twin room with two beds', 'img-084': 'The twin room\'s private bathroom',
  'img-083': 'The twin room from the window side', 'img-069': 'The twin room\'s beds made up in white',
  'img-079': 'A detail of the twin room', 'img-081': 'The deluxe double room with its queen-size bed',
  'img-082': 'The deluxe double room seen from the bed', 'img-041': 'The double room\'s private bathroom',
  'img-043': 'The double room\'s bed and side table', 'img-044': 'A detail of the double room',
  'img-071': 'The double room in daylight',
}
const alt = (id) => {
  if (ALT[id]) return ALT[id]
  const d = images.get(id)?.description?.trim()
  return d ? d[0].toUpperCase() + d.slice(1) : fail(`no alt for ${id}`)
}

/* Photo order = the design's slots (src/lib/slots.mjs): the drop's three plates, the waves band, breakfast,
   sunset, dinner, the lodge slideshow, the Freestylers card, the Instagram tiles. Copied untouched; the build
   crops. */
const PHOTOS = ['img-062', 'img-026', 'img-005', 'img-099', 'img-011', 'img-129', 'img-093',
  'img-036', 'img-075', 'img-077', 'img-016', 'img-024', 'img-090', 'img-055', 'img-087', 'img-118']

let mediaId = 1
const mediaDir = join(final, 'src', 'tenant', 'media')
const gapDir = join(final, 'src', 'gaps', 'media')
if (!existsSync(join(mediaDir, 'gs2-hero.mp4'))) fail('video masters missing: run scripts/make-media.sh, not this script alone')
rmSync(gapDir, { recursive: true, force: true })
mkdirSync(gapDir, { recursive: true })

const putImage = async (id, dir) => {
  const a = images.get(id)
  if (!a || a.license !== 'business-owned') fail(`${id}: not a business-owned dossier image`)
  const filename = `${id}.jpg`
  const dst = join(dir, filename)
  copyFileSync(join(assets, a.file), dst)
  const m = await sharp(dst).metadata()
  return { filename, width: m.width, height: m.height, filesize: statSync(dst).size }
}
const mediaDoc = (f, altText, mimeType) => ({
  id: mediaId++, alt: altText, filename: f.filename, mimeType, filesize: f.filesize,
  width: f.width ?? null, height: f.height ?? null, url: `/api/media/file/${f.filename}`, focalX: 50, focalY: 50, sizes: {},
})

const photos = []
for (const id of PHOTOS) {
  const f = await putImage(id, mediaDir)
  photos.push({ id: `seed-photo-${photos.length + 1}`, image: mediaDoc(f, alt(id), 'image/jpeg'), caption: null })
}

/* Videos (schema v0.8/0.9): the uploads are the masters scripts/make-media.sh cut from dossier.videos[]
   vid-009 / vid-010 / vid-003 / vid-002. heroVideo replaces the hero photo. videos[0–2]: the level cards
   (and the booking drawer's band). description = what the clip shows, the accessible name. */
const fileOf = async (filename) => {
  const p = join(mediaDir, filename)
  if (!existsSync(p)) fail(`${filename} missing from src/tenant/media`)
  const isImg = filename.endsWith('.jpg')
  const m = isImg ? await sharp(p).metadata() : {}
  return { filename, filesize: statSync(p).size, width: m.width, height: m.height }
}
const vid = async (stem, description, posterAlt) => ({
  video: mediaDoc(await fileOf(`${stem}.mp4`), description, 'video/mp4'),
  poster: mediaDoc(await fileOf(`${stem}-poster.jpg`), posterAlt, 'image/jpeg'),
  description,
})
const hero = await vid('gs2-hero',
  'From the air: the sea and reef over the lodge roofs, the lodge in its palms, the turquoise reef coast, surfers from above',
  "The lodge's white roofs among the palms on Sri Lanka's south coast, seen from a drone")
const CLIPS = [
  ['gs2-level-1', 'A beach lesson on soft-tops: guests practise the pop-up on the sand, then carry their boards to the water'],
  ['gs2-level-2', 'A surfer riding a turquoise reef wave'],
  ['gs2-level-3', 'A surfer deep in a right-hand barrel'],
]
const videos = []
for (const [stem, d] of CLIPS) videos.push({ id: `seed-video-${videos.length + 1}`, ...(await vid(stem, d, d)) })

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))

for (const r of copy.ratings) {
  const at = dossier.reviews?.[r.platform]?.fetched_at?.slice(0, 10)
  if (r.capturedAt !== at) fail(`rating ${r.platform}: capturedAt ${r.capturedAt} ≠ dossier ${at}`)
}

const doc = {
  id: null,
  tenant: { id: null, name: copy.businessName, slug },
  businessName: copy.businessName,
  businessType: copy.businessType,
  tagline: copy.tagline,
  closing: copy.closing,
  featureLine: copy.featureLine,
  languages: ['en'],
  languagesSpoken: copy.languagesSpoken ?? [],
  copyBlocks: rowIds(copy.copyBlocks, 'block'),
  openingHours: [],
  hoursNote: null,
  priceList: copy.priceList ?? [],
  photos,
  heroVideo: hero.video,
  heroVideoPoster: hero.poster,
  videos: videos.map(({ id, video, poster, description }) => ({ id, video, poster, description })),
  rooms: copy.rooms ?? [], // [] by the copy ruling; the rooms shown are a SCHEMA GAP below
  stayInfo: { checkInFrom: null, checkInTo: null, checkOutFrom: null, checkOutTo: null, minNights: null, note: null, ...copy.stayInfo },
  lessons: rowIds(copy.lessons, 'lesson').map((l) => ({ durationMin: null, level: [], groupSize: null, includes: null, price: null, currency: null, unit: null, ...l })),
  credentials: rowIds(copy.credentials, 'credential'),
  rentals: [],
  brands: [],
  shaping: null,
  amenities: rowIds(copy.amenities, 'amenity').map((a) => ({ note: null, ...a })),
  ratings: rowIds(copy.ratings, 'rating'),
  testimonials: rowIds(copy.testimonials, 'quote').map((t) => ({ date: null, ...t })),
  spot: copy.spot,
  season: copy.season,
  /* v0.3: concepts.md "Forecast": dossier spot "South point" → Rosa `south-point`, "South Point" */
  forecast: { enabled: true, rosaSpotId: 'south-point', spotName: 'South Point' },
  contact: {
    phone: copy.contact.phone,
    whatsapp: copy.contact.whatsapp || null, // "" in the copy: the "Ask on WhatsApp" booking link carries the agency's number
    email: copy.contact.email,
    address: copy.contact.address,
    mapUrl: copy.contact.mapUrl,
  },
  bookingLinks: rowIds(copy.bookingLinks, 'link'),
  updatedAt: null,
  createdAt: null,
}
mkdirSync(join(final, 'src', 'tenant'), { recursive: true })
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: doc } }, null, 2) + '\n')

/* ---------------- SCHEMA GAP content (src/gaps/gaps.json) ---------------- */
const LEVEL_SLUGS = ['level-1-fomies', 'level-2-rollers', 'level-3-riders']
const linkFor = (label) => copy.bookingLinks.find((b) => b.label === label)?.url ?? fail('booking link ' + label)
LEVEL_SLUGS.forEach((s, k) => { if (!linkFor(`Book Level ${k + 1}`).endsWith('/' + s)) fail('engine slug ' + s) })

const ROOM_KEYS = ['dorm', 'twin', 'double']
const rooms = []
for (const [k, r] of X.rooms.entries()) {
  const gallery = []
  for (const id of r.gallery) {
    const f = await putImage(id, gapDir)
    gallery.push({ file: f.filename, width: f.width, height: f.height, alt: alt(id) })
  }
  const s = r.supplement
  rooms.push({
    key: ROOM_KEYS[k], label: r.label, line: r.line, description: r.description, details: r.details, sleeps: r.sleeps,
    /* build-time snapshot of the engine's supplement (docs/bookinglayer.md §2.1, 20–27 Feb 2027, read
       29 Sep 2026), per person for 7 nights: one guest / a couple sharing. Not content ("Live prices are
       not content"). */
    supplement: {
      display: s.display ?? null, displayOneGuest: s.display_one_guest ?? null, displayCouple: s.display_couple ?? null,
      onePP: s.per_person ?? s.one_guest_per_person, couplePP: s.per_person ?? s.couple_per_person,
    },
    gallery,
  })
}
/* testimonials with source "other": the site that published them (dossier reviews.quotes[].source_url) */
const otherSources = {}
for (const t of copy.testimonials.filter((t) => t.source === 'other')) {
  const q = (dossier.reviews?.quotes ?? []).find((d) => d.author === t.author && d.text.trim() === t.quote.trim())
  if (!q?.source_url) fail(`no source_url for testimonial by ${t.author}`)
  otherSources[t.author] = new URL(q.source_url).hostname.replace(/^www\./, '')
}
const logoSymbol = readFileSync(join(final, 'src', 'lib', 'logo.svg.txt'), 'utf8').trim()
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.9 has no field for (copy/sources.md mockup_extras "Schema gaps"). Written by scripts/seed-from-dossier.mjs from copy/en.json, dossier.json and docs/bookinglayer.md; listed in notes.md "schema gaps". Edit there, not here.',
  heroTitle: X.hero.title_c3,
  logo: { paths: logoSymbol, viewBox: '12 20 233 48', alt: X.logo.alt, homeLinkLabel: X.logo.home_link_label, source: 'dossier business.logo (assets/logo-001.svg), as drawn in the unique mockup' },
  levels: X.levels.slice(0, 3).map((l, k) => ({ lesson: l.lesson, oneLiner: l.one_liner, slug: LEVEL_SLUGS[k] })),
  freestylers: {
    lesson: X.levels[3].lesson, oneLiner: X.levels[3].one_liner,
    /* the unique mockup's prefilled WhatsApp text for "Ask about dates" */
    whatsappText: "Hi Global Surf Lodge Kabalana, I'd like to ask about dates for the Freestylers – B&B only package.",
  },
  inclusions: { 1: X.inclusions.level_1, 2: X.inclusions.level_2, 3: X.inclusions.level_3, optionalExtra: X.inclusions.optional_extra },
  rooms,
  roomsNote: X.rooms_note,
  details: { everyRoom: X.detail_lines.every_room, ratingCategories: X.detail_lines.rating_categories },
  otherSources,
  instagram: X.instagram,
  socials: X.socials,
  engine: { product: linkFor('Book Level 1').replace(/[^/]+$/, '') },
  /* docs/bookinglayer.md §2.1: the choosable Saturdays for 1 guest, read 29 Sep 2026; the page drops the
     ones already past at runtime. */
  snapshot: {
    baseAsOf: '28 Sep 2026', roomsAsOf: '29 Sep 2026',
    saturdays: ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13',
      '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03'],
  },
}
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')

const labels = {
  _about: 'Template-owned interface wording (schema: interface labels belong to the template), approved with the copy in copy/en.json mockup_extras (ctas, section_titles, booking). Written by scripts/seed-from-dossier.mjs.',
  ctas: X.ctas,
  titles: X.section_titles,
  booking: X.booking,
  detailLines: { trust: X.detail_lines.trust, stay: X.detail_lines.stay, levelPrice: X.detail_lines.level_price },
}
writeFileSync(join(final, 'src', 'lib', 'labels.json'), JSON.stringify(labels, null, 1) + '\n')

console.log(`seed: ${slug} — ${photos.length} photos, 1 hero video, ${videos.length} clips, ${rooms.reduce((n, r) => n + r.gallery.length, 0)} room photos (gap) → src/tenant/, src/gaps/`)
