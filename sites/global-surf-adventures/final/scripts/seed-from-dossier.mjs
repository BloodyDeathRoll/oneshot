#!/usr/bin/env node
/**
 * Station 4g stand-in for the CMS (run by scripts/make-media.sh, after the video masters are cut).
 * Writes, from the audited copy (sites/<slug>/copy/en.json) and the dossier:
 *
 *   src/tenant/content.json + src/tenant/media/   exactly the shape scripts/fetch-tenant.mjs writes from
 *       Payload (schemas/site-content.md v0.9, "What the template receives"). There is no Payload tenant
 *       for Global Surf yet, so this is what the deployer's first seed would contain; `npm run fetch`
 *       replaces both once the tenant exists.
 *   src/gaps/gaps.json + src/gaps/media/          SCHEMA GAP content: what the picked design shows that the
 *       schema has no field for yet (copy/sources.md "mockup_extras": schema gaps; notes.md "schema gaps").
 *       Not owner-editable until the schema grows; fetch-tenant leaves it alone.
 *   src/lib/labels.json                           template wording approved with the copy (mockup_extras
 *       ctas / section titles / booking microcopy). Template-owned, as the schema says interface labels are.
 *
 * Nothing here is invented: every value is copied from copy/en.json, dossier.json or docs/bookinglayer.md.
 * The additions the schema asks the seeder for (alt text, photo order, video descriptions, the forecast
 * mapping from concepts.md) are listed in notes.md.
 *
 *   node scripts/seed-from-dossier.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const final = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteDir = join(final, '..')
const slug = 'global-surf-adventures'
const repo = join(siteDir, '..', '..')
const sharp = createRequire(join(final, 'node_modules', 'sharp', 'package.json'))('sharp')

const copy = JSON.parse(readFileSync(join(siteDir, 'copy', 'en.json'), 'utf8'))
const X = copy.mockup_extras
const dossier = JSON.parse(readFileSync(join(repo, 'dossier', slug, 'dossier.json'), 'utf8'))
const images = new Map(dossier.images.filter((i) => i && i.id).map((i) => [i.id, i]))
const assets = join(repo, 'dossier', slug)
const fail = (m) => { throw new Error('seed: ' + m) }

/* Alt text: the dossier's own description of the photograph (capitalised); where it has none, the
   alt the picked mockup wrote from looking at the photograph (mockups/picked/src/build.py ALT_FALLBACK). */
const ALT_FALLBACK = {
  'img-063': 'The dorm: single beds under a timber loft with a ladder', 'img-095': 'Two single beds side by side under a sloping white roof',
  'img-042': 'Single beds on a timber floor under a white roof', 'img-050': 'A room terrace with a hanging chair and glass doors',
  'img-064': 'Open-air bathroom with a palm tree growing through it', 'img-080': 'Twin room with two beds, rattan lamps and glass doors to the garden',
  'img-084': 'Twin room with a rattan pendant lamp', 'img-083': 'Towels, a surf book and a plant on a timber shelf',
  'img-069': 'Private bathroom with a glass shower', 'img-079': 'Bathroom with a concrete wall, glass shower and plants',
  'img-081': 'Double room with a large white bed and garden doors', 'img-082': 'Double room with a white bed, rattan lamp and a hammock outside',
  'img-041': 'Double room with coral cushions and a woven pouf', 'img-043': 'Double room with a lime wall, bed and daybed',
  'img-044': 'Daybed with cushions under framed surf prints', 'img-071': 'Two framed black-and-white wave photographs',
  'img-104': 'A group walks along the beach carrying surfboards', 'img-011': 'A breakfast bowl of fruit, banana and granola',
  'img-023': 'Guests raise their glasses at a shared table by the pool', 'img-114': 'A surf theory class sitting in a circle on the sand',
  'img-060': 'The pool, lounge and garden from above', 'img-115': 'A surf coach explains how a wave breaks at the chalkboard',
  'img-001': 'A guest on a daybed by the pool in front of a white bungalow', 'img-118': 'A woman carries a surfboard on her head by the railway line',
  'img-024': 'A pineapple floating in the pool', 'img-005': 'The pool at water level, with the open lounge behind',
  'img-111': 'A surfer on a longboard at sunset', 'img-093': 'The pool and lounge at dusk with the lights on',
}
const alt = (id) => {
  const d = images.get(id)?.description?.trim()
  return d ? d[0].toUpperCase() + d.slice(1) : (ALT_FALLBACK[id] ?? fail(`no alt for ${id}`))
}

/* Photo order = the design's slots (src/lib/slots.mjs). img-104 is uploaded as the picked mockup's
   badge-free crop (1700×1133 at 170,200 of the 2000×1333 original, measured against the mockup's
   rendition): the original carries the agency badge in its corner, and choosing the file to upload is
   the seeder's call; cropping to the slot is still the build's. All others are copied untouched. */
const PHOTOS = ['img-118', 'img-024', 'img-115', 'img-104', 'img-011', 'img-023', 'img-114', 'img-060',
  'img-005', 'img-111', 'img-001', 'img-093', 'img-099', 'img-010', 'img-073', 'img-012']
const UPLOAD_CROP = { 'img-104': { left: 170, top: 200, width: 1700, height: 1133 } }

let mediaId = 1
const mediaDir = join(final, 'src', 'tenant', 'media')
const gapDir = join(final, 'src', 'gaps', 'media')
if (!existsSync(join(mediaDir, 'gs-hero-loop.mp4'))) fail('video masters missing: run scripts/make-media.sh, not this script alone')
rmSync(gapDir, { recursive: true, force: true })
mkdirSync(gapDir, { recursive: true })

const putImage = async (id, dir) => {
  const a = images.get(id)
  if (!a || a.license !== 'business-owned') fail(`${id}: not a business-owned dossier image`)
  const filename = `${id}.jpg`
  const src = join(assets, a.file), dst = join(dir, filename)
  if (UPLOAD_CROP[id]) await sharp(src).rotate().extract(UPLOAD_CROP[id]).jpeg({ quality: 95 }).toFile(dst)
  else copyFileSync(src, dst)
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

/* Videos (schema v0.8/0.9): the uploads are the masters scripts/make-media.sh cut. heroVideo replaces
   the hero photo. videos[] rows: 0–2 the home level cards, 3–5 the booking desk (step 1, desktop).
   description = what the clip shows, from dossier.videos[].shows and the cut lists, used as the
   accessible name where a clip is not decorative. */
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
const hero = await vid('gs-hero-loop',
  'The pool deck under the palms, a beginner standing up on a wave as the guide cheers, then a surfer on the reef',
  'The lodge pool deck under palms, in the sun')
const CLIPS = [
  ['gs-level-1-card', 'A golden-hour beginner session at the beach: a rider stands up into the sun'],
  ['gs-level-2-card', 'An intermediate surfer rides a sunny reef wave, then another rider on the reef'],
  ['gs-level-3-card', 'A surfer rides deep in a right-hand barrel, twice'],
  ['gs-level-1-desk', 'A golden-hour beginner session at the beach: a rider stands up into the sun'],
  ['gs-level-2-desk', 'An intermediate surfer rides a sunny reef wave, then another rider on the reef'],
  ['gs-level-3-desk', 'A surfer rides deep in a right-hand barrel, twice'],
]
const videos = []
for (const [stem, d] of CLIPS) videos.push({ id: `seed-video-${videos.length + 1}`, ...(await vid(stem, d, d)) })

const rowIds = (arr, k) => (arr ?? []).map((r, i) => ({ id: `seed-${k}-${i + 1}`, ...r }))

/* schema v0.4: ratings[].capturedAt — the day the harvester read the score (dossier reviews.<p>.fetched_at) */
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
  rooms: copy.rooms ?? [], // [] by the copy ruling (sources.md: room mix contradiction open); the rooms shown are a SCHEMA GAP below
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
    whatsapp: copy.contact.whatsapp || null, // "" in the copy: no WhatsApp number of the lodge's own; the "Ask on WhatsApp" booking link carries the agency's
    email: copy.contact.email,
    address: copy.contact.address,
    mapUrl: copy.contact.mapUrl,
  },
  bookingLinks: rowIds(copy.bookingLinks, 'link'),
  updatedAt: null,
  createdAt: null,
}
writeFileSync(join(final, 'src', 'tenant', 'content.json'),
  JSON.stringify({ tenant: { id: null, slug, name: copy.businessName }, locales: { en: doc } }, null, 2) + '\n')

/* ---------------- SCHEMA GAP content (src/gaps/gaps.json) ---------------- */
const LEVEL_SLUGS = ['level-1-fomies', 'level-2-rollers', 'level-3-riders']
/* docs/bookinglayer.md §2.1, product ids (the API's own); the slugs are the bookingLinks' URLs */
const PRODUCT_IDS = {
  'level-1-fomies': '877aef3d-86ed-4b60-8932-03e49c613af8',
  'level-2-rollers': '4b58b491-24fc-4fb8-a40d-2705df961db4',
  'level-3-riders': '54ec3447-2efb-4677-8685-f272e00d32e8',
}
const linkFor = (label) => copy.bookingLinks.find((b) => b.label === label)?.url ?? fail('booking link ' + label)
LEVEL_SLUGS.forEach((s, k) => { if (!linkFor(`Book Level ${k + 1}`).endsWith('/' + s)) fail('engine slug ' + s) })

const ROOM_KEYS = ['dorm', 'twin', 'double']
const ROOM_SHORT = ['Dorm', 'Twin', 'Deluxe double'] // TEMPLATE-LABEL [try-your-week]
/* Room names: the engine's titles mix casing ("Shared Twin Room – 2 Beds"); shown in sentence case,
   one casing for all three (visual-critic composite r2, fix 4). Casing only; the words are the copy's. */
const sentence = (s) => s.split(' ').map((w, i) => (i > 0 && /^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w)).join(' ')
const rooms = []
for (const [k, r] of X.rooms.entries()) {
  const gallery = []
  for (const id of r.gallery.filter((g) => g !== 'img-078')) { // img-078 is the same frame as img-063 (picked notes)
    const f = await putImage(id, gapDir)
    gallery.push({ file: f.filename, width: f.width, height: f.height, alt: alt(id) })
  }
  const s = r.supplement
  rooms.push({
    key: ROOM_KEYS[k], short: ROOM_SHORT[k], engineTitle: r.engine_title, label: sentence(r.label),
    line: r.line, description: r.description, details: r.details, sleeps: r.sleeps,
    /* the build-time snapshot of the engine's supplement (docs/bookinglayer.md §2.1, 20–27 Feb 2027,
       read 29 Sep 2026), per person: one guest / a couple sharing. Not content (schema: "Live prices
       are not content"); the fallback when the live quote has not answered. */
    supplement: {
      display: s.display ?? null, displayOneGuest: s.display_one_guest ?? null, displayCouple: s.display_couple ?? null,
      onePP: s.per_person ?? s.one_guest_per_person, couplePP: s.per_person ?? s.couple_per_person,
    },
    gallery,
  })
}
const logoD = readFileSync(join(siteDir, 'mockups', 'the-sign', 'src', 'logo-d.txt'), 'utf8').trim()
const gaps = {
  _about: 'SCHEMA GAP content: what the picked design shows and schemas/site-content.md v0.9 has no field for (copy/sources.md, mockup_extras "Schema gaps"). Written by scripts/seed-from-dossier.mjs from copy/en.json, dossier.json and docs/bookinglayer.md; listed in notes.md "schema gaps". Edit there, not here.',
  heroTitle: X.hero.title_c3,
  logo: { d: logoD, viewBox: '12 21 237 46', homeLinkLabel: X.logo.home_link_label, source: 'dossier business.logo (assets/logo-001.svg), the-sign mockup path' },
  levels: X.levels.slice(0, 3).map((l, k) => ({ lesson: l.lesson, oneLiner: l.one_liner, slug: LEVEL_SLUGS[k], productId: PRODUCT_IDS[LEVEL_SLUGS[k]] })),
  freestylers: {
    lesson: X.levels[3].lesson, oneLiner: X.levels[3].one_liner,
    /* postcard's prefilled WhatsApp text for "Ask about dates" (picked build.py WA_FREE) */
    whatsappText: 'Hi Global Surf Lodge Kabalana, I would like to ask about dates for the Freestylers – B&B only package.',
  },
  inclusions: { 1: X.inclusions.level_1, 2: X.inclusions.level_2, 3: X.inclusions.level_3, optionalExtra: X.inclusions.optional_extra },
  rooms,
  roomsNote: X.rooms_note,
  details: { welcome: X.detail_lines.welcome, ratingCategories: X.detail_lines.rating_categories },
  instagram: X.instagram,
  socials: X.socials,
  termsUrl: 'https://www.globalsurf.com/terms-conditions/', // dossier booking.deposit_terms.source_url
  engine: {
    product: linkFor('Book Level 1').replace(/[^/]+$/, ''),
    api: 'https://api.bookinglayer.io/public/',
    businessDomain: 'globalsurfadventures.bookinglayer.com',
  },
  /* docs/bookinglayer.md §2.1: the choosable Saturdays for 1 guest, read 29 Sep 2026. The live calendar
     replaces them per level and guest mix; the build drops those before its own date. */
  snapshot: {
    baseAsOf: '28 Sep 2026', roomsAsOf: '29 Sep 2026',
    saturdays: ['2026-10-03', '2026-10-24', '2026-10-31', '2026-12-19', '2027-01-23', '2027-01-30', '2027-02-13',
      '2027-02-20', '2027-02-27', '2027-03-06', '2027-03-13', '2027-03-20', '2027-03-27', '2027-04-03'],
  },
}
writeFileSync(join(final, 'src', 'gaps', 'gaps.json'), JSON.stringify(gaps, null, 1) + '\n')

/* ---------------- template wording approved with the copy (src/lib/labels.json) ---------------- */
const labels = {
  _about: 'Template-owned interface wording (schema: interface labels belong to the template), approved with the copy in copy/en.json mockup_extras (ctas, section_titles, booking). Written by scripts/seed-from-dossier.mjs.',
  ctas: X.ctas,
  titles: X.section_titles,
  booking: X.booking,
}
writeFileSync(join(final, 'src', 'lib', 'labels.json'), JSON.stringify(labels, null, 1) + '\n')

console.log(`seed: ${slug} — ${photos.length} photos, 1 hero video, ${videos.length} clips, ${rooms.reduce((n, r) => n + r.gallery.length, 0)} room photos (gap) → src/tenant/, src/gaps/`)
