# panta-rei-resort · final (station 4g, designer 0.7.1) — run 2026-11-lk-surf-01

The picked mockup, **interactive "Morning swim"** (ledger `mocked → picked`, agent human: "I like the interactive one.
Let's go with that", Alon on his phone), ported to one static Astro project. Same markup, CSS and script as
`mockups/interactive` round 2; everything schema-covered is read from `src/tenant/content.json`
(schemas/site-content.md v0.11 shape, seeded from `copy/en.json` + the dossier; no Payload before a sale).

## How it is built

```
npm install                  # astro 7.3.3, sharp 0.35.4
npm run seed                 # scripts/make-media.sh: seed (content.json, uploads, gaps) → publisher video step →
                             # video-site.mjs (this template's tiers) → photos.mjs (crops)  [media recipe]
npm run build                # photos.mjs again, then astro build → dist/ (one page, static, relative URLs)
npm run build:demo           # the demo build: SITE_URL=https://panta-rei-resort.os1.workers.dev/ (canonical + og:image;
                             # a *.workers.dev build is a preview, so noindex stays)
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → video-site → photos → build
```

| Path | What |
|---|---|
| `src/pages/index.astro` | the page: the mockup's markup as a template over content.json / gaps.json / labels.json |
| `src/lib/site.mjs` | reads content, escapes, formats prices and phones, builds `<img srcset>` from the photo manifest and `<source>` lists from the video manifest |
| `src/lib/slots.mjs`, `shape.mjs` | the design's crops per photo slot (the mockup's crops) |
| `src/lib/labels.json`, `icons.mjs` | interface wording and the mockup's inline icons (template-owned, no facts) |
| `src/styles/site.css`, `src/scripts/site.js` | the mockup's `style.css` / `app.js`, inlined; changes marked `4g:` |
| `src/tenant/content.json` | the content, Payload's REST shape (`fetch-tenant.mjs` writes the same file after a sale) |
| `src/gaps/gaps.json` | SCHEMA GAP content (below) |
| `scripts/seed-from-dossier.mjs` | the 4g stand-in for the CMS seed; fails if a booking URL, phone or WhatsApp differs from the dossier |
| `scripts/video-site.mjs`, `photos.mjs`, `fetch-tenant.mjs`, `make-media.sh` | media plumbing (patterns from coconut-surf-inn and cheeky-monkey finals) |
| `public/fonts/` | Jost (variable, latin, OFL: `ofl-jost.txt`) and Satisfy (latin 400, Apache 2.0: `license-satisfy-apache-2.0.txt`), self-hosted |
| `wrangler.jsonc` | for the deployer (station 6); nothing deployed here |

Media never goes in git: `public/photos`, `public/video`, `src/tenant/media`, `src/gaps/media` and the generated
manifests are `.gitignore`d and made by `scripts/make-media.sh` (`# media:` header lines for all four).

## 4g changes (the 4f round-2 polish, as the coordinator listed it; nothing else changed on purpose)

| Item | Change |
|---|---|
| Closing (visual fix 1) | the dim bedroom interior is replaced by the bright top-down frame of the ring and the pool (vid-001 poster, `photos[6]`); the button is now "Check dates" (+ WhatsApp), both centred in the image |
| Fitness screen (visual fix 2, experience fix 4) | half-bleed: words left, the mat-class clip filling the right half edge to edge (min 560–880 px tall); on the phone the clip follows the words at 4:5, as before. The 300 px of empty ground under the week strip is gone |
| Script for section titles only (visual fix 3) | "Surf Therapy Massage" / "Revitalizing Massage" in Jost semibold |
| Phone drawer (experience fix 1) | under 640 px: room chips → Arrival / Departure / Guests → "Prices with your dates…" → gallery and details. Desktop unchanged |
| Welcome clip loading with the hero (coordinator) | clips attach only when their frame is a fifth of the screen past its top (`rootMargin 0 0 -20% 0`), never on load. Measured: at 1440 with no scroll only the hero film loads (3.40 MB) |
| Hover on the selected tab (experience fix 3) | the selected tab darkens on hover; dots already had hover/focus |
| Not done (not on the coordinator's list) | header opacity (visual fix 4), smaller hero title (visual fix 5), shorter script headings (experience fix 5), the "if your dates clear…" line (experience fix 2: new copy, an owner item) |

## Regressions vs the mockup

Shot with `tools/shoot.mjs` (served over http) at 1440 and 390 and compared sheet by sheet with
`mockups/interactive/shots/` (round 9). Hero, Welcome, rooms over the ring, pool, restaurant, guests, getting here,
groups and footer match. Differences are the requested ones only: the closing image and button, the half-bleed fitness
section, Jost massage names. Found and fixed during the port:
- first build: LCP 2.50 s on the throttled phone (at the budget line) — the logo had been inlined as a 24 KB base64 PNG
  and the phone poster was q78. The logo is now a 6 KB 192 px PNG mask (`photos/logo-192.png`), the phone poster q70:
  LCP 2.14 s.
- dropping the font preloads to save bandwidth made the Welcome text reflow on an early scroll (scroll.early.cls
  0.044); the preloads are back: 0.0009.
No unrequested visual difference remains that I could see on the sheets.

## Station 5 round 1 fixes (critic FAIL 85.3 on the funnel hard fail; coordinator's list, 2026-11-06)

| # | Item | Change |
|---|---|---|
| 1 | Hard fail: primary action read as WhatsApp | the header's WhatsApp icon is hidden (`visibility:hidden`) while the header sits over the hero, like the header's "Check dates"; both come in when the header turns solid. The hero "Check dates" is now the top-most booking action. `tools/funnel.mjs` (with holidayfuture.com in ENGINES) on the built site over http, depth 3 → `reports/2026-11-lk-surf-01/funnel/panta-rei-resort-r2/funnel.json`: **primary_action.class = engine ("Check dates"), hero_action engine, clicks_to_book 1** |
| 2 | Header | opaque `#FAFBF8` once past the hero (was 96 %): nothing shows through. Anchor offsets: `scroll-margin-top` 84 px (76 px under 860) |
| 3 | First seconds on a slow phone | an 18 px (phone) / 32 px (landscape) frame of the poster is inlined as the hero's background, so the picture is there with the first paint (0.5 s frame on the throttled phone shows the blurred ring and pool, the full poster by ~3 s); both poster preloads carry `fetchpriority="high"`; the film still attaches on `load` (playing by 6 s on 1.6 Mbps) |
| 4 | Clip posters | each of the three `<video>` has a `poster` (a ~1 KB inline frame) and its frame box carries the same frame as background, so no grey box before the poster or film arrives; the inline frames are dropped once the real poster image has loaded |
| 5 | Closing | the even 46 % scrim replaced by a local radial one behind the words (roofs stay red, pool turquoise); the one closing sentence (copy's `closing`) and its two buttons centred in the image at both widths; the persistent phone bar and the desktop WhatsApp button step aside while the closing buttons are on screen (IntersectionObserver) |
| 6 | Phone drawer + axe | under 640 px the gallery is hidden until a room chip is tapped in the drawer, then shown in full and scrolled into view (no cut strip between the price note and the button). The photo strip has `tabindex=0`, `role=region`, "Photos of the <room>" and arrow-key paging (axe `scrollable-region-focusable`). The bar and the floating WhatsApp button sit in `<nav aria-label="Book">` (axe `region`). Room cards: the photo is decorative inside the link (its alt is the drawer's first slide), so the link's name is its visible text (axe `label-content-name-mismatch`, found on this build) |
| 7 | Margins + hover | `scrollbar-gutter: stable both-edges`: 100 px / 100 px at 1440 (was 106 / 122). Hover and press: the selected tab (immediate), the hero "Check dates" (white ring), the dots (the button itself, not only its dot) |
| 8 | SITE_URL | `npm run build:demo` builds with `SITE_URL=https://panta-rei-resort.os1.workers.dev/`: canonical and `og:image` present, `noindex, nofollow` kept (a workers.dev build is a preview) |

Not changed: anything not on the list (no new copy: the "if your dates clear" line stays an owner item).

**Regressions vs the picked mockup (r2 build):** none seen. 1440 and 390 sheets compared with `mockups/interactive/shots/`: hero, Welcome, rooms, pool, restaurant, fitness, guests, getting here, groups and footer unchanged; the differences are the listed ones (no header WhatsApp over the hero on the phone, opaque header, lighter closing scrim, gallery behind a chip tap in the phone drawer).

## Budget (playbook §4), measured

`tools/audit-mockup.mjs` takes only `mockups/<variant>`, so it was run unchanged in logic from a scratch copy pointed at
`final/dist` (throttled phone: ~1.6 Mbps, 150 ms RTT, 4x CPU, 390×844). Result in `audit.json`.

| Item | Target | Measured |
|---|---|---|
| First-load transfer (no scroll, video excluded) | ≤ 1.5 MB | **653 KB** (652,667 B, 12 requests, station-5 r2 build): HTML 97 KB (CSS + JS + JSON-LD + four ~1 KB inline poster frames), fonts 49 KB, images 506 KB |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | portrait phone `p1080` WebM **1.50 MB** (MP4 1.68) · landscape phone `m1280` WebM 1.64 / MP4 1.88 MB · desktop `d1920` WebM **3.40 MB** / MP4 3.75 MB. Other clips only on scroll: Welcome `p900` 1.32 MB, fitness `m720` 1.10 MB |
| JS, compressed | ≤ 300 KB | **4.9 KB** gzip (14 KB raw, inline; no library) |
| Largest above-the-fold image | ≤ 300 KB | phone poster 72 KB (`p-608`), desktop poster 246 KB (1920); largest image in the first load 148 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, **49 KB** |
| LCP (throttled phone) | ≤ 2.5 s | **1.98 s** (the hero poster; a 18 px inline frame of it paints with the title at ~0.4 s) |
| CLS | < 0.1 | **0** on load; scroll early **0.0009**, settled **0** |
| Third-party requests on load | 0 | **0** (no host but the site's own) |

## Checks

| Check | Result |
|---|---|
| `npm run build` | clean: 1 page, no warnings |
| `node tools/check-design.mjs sites/panta-rei-resort/final/dist/index.html` | ok (light ground, no captions, no padded boxes, no upscaled bleed; Satisfy / Jost, no default-look warnings) |
| Booking tap-through, 390 touch, built site | hero "Check dates" → Double Room preselected → 2026-12-10 … 12-13, 2 guests → "See prices on our booking page" → `https://pantareiresort.holidayfuture.com/listings/572800?start=2026-12-10&end=2026-12-13&numberOfGuests=2`, page reads **"$465 · For 3 nights · Dec 10 - Dec 13"**. Literal `&` in the href |
| Funnel (`tools/funnel.mjs`, built site over http, depth 3) | primary **engine** "Check dates", hero engine, clicks_to_book **1** (≤ 2), CTA above the fold |
| axe-core 4 (1440 + 390, page scrolled through, and with the drawer open) | **0 violations** (any impact) |
| Keyboard (390, 1440) | room card → drawer opens on that room's chip; 40 × Tab stays inside; Esc closes; focus returns to the card. Re-opening from the hero keeps the room and dates |
| Reduced motion (1440) | 0 video requests, posters only, no parallax/tilt |
| JS off (390) | all text, both menu lists, room cards → `/listings/<id>`, every CTA an engine / wa.me / tel link; 2 booking links in `#book`; drawer hidden |
| Offline (dist/ served by `python3 -m http.server`, every other host blocked, 1440 + 390, full scroll) | 0 third-party requests attempted, 0 failed requests, 0 console errors, 0 broken images, both fonts loaded |
| Tap targets / alt | 0 under 44 px; 0 images without alt |
| Horizontal overflow at 390 | 0 px |

## facts

Every checkable statement on the page, with its dossier key (dossier.json). The words are copy/en.json's (passed 4c);
the seed copies them and checks the booking URLs, phone and WhatsApp character for character. Script check on the built
page: 44 numbers, all in the dossier (seven are 12 h → 24 h renderings of dossier times: 08:00, 11:00, 13:00, 17:00,
18:00, 21:30, 22:00); all six quotes verbatim in `reviews.quotes`; every https link on the page is a dossier URL or a
wa.me link built from `contact.whatsapp`.

| On the page | Dossier key |
|---|---|
| boutique resort, large pool, Kabalana, Ahangama, south coast of Sri Lanka (tagline, Welcome) | `business.tagline`, `business.description`, `location.address` |
| 16 bungalows, natural materials | `room_count`, `business.description` |
| ring of bungalows around a long pool, stone deck, loungers, garden; opens early; day guests | `facilities`, `business.description` |
| Pool day pass 3,500 LKR per person, spent at the restaurant | `offers[0]` |
| Rooms: Double 22 m² / Triple 30 m² / Family Villa 50 m² / Suite 40 m²; beds; sleeps 3 / 3 / 4 / 2; balconies, baths, private pool | `room_types[].value` (size_m2, beds, sleeps, bathroom, view) |
| A/C, hot water, wifi, cleaned daily, breakfast included | `room_types[].value.features` |
| Room pages and the engine | `booking.engine_rooms`, `booking.engine_url` |
| Check-in from 14:00, check-out until 11:00; children welcome, no pets, no smoking in rooms, quiet hours 22:00–08:00 | `stay_info.check_in`, `.check_out`, `.house_rules` |
| Restaurant: breakfast 8:30–12:00 (coffee from 8:00), lunch 13:00–17:00, dinner 18:00–21:30, every day; open to outside guests; bar upstairs | `restaurant_hours`, `facilities` |
| Dishes: smoothie bowls, granola, banana oat pancakes, shakshuka, Sri Lankan plate (egg hoppers, dhal, coconut sambal), fish bowl, curry of the day, whole grilled fish priced on weight; dinner traditional + modern Mediterranean | `menu.sections`, `menu.descriptions`, `menu.note` |
| Panta Fitness Club: open-air upper floor, Vinyasa 8:30 daily, Friday off, Pilates, longer schedule in season, no need to book; 2,500 / 3,000 / 3,500 LKR per class | `offers[1–3]`, `facilities` |
| Surf Therapy and Revitalizing massages, 60 min 20,000 LKR, 45 min 17,000 LKR | `offers[4–7]` |
| Groups and retreats, meals and accommodation | `business.group_hosting` |
| Kabalana Beach a short walk; Koggala Lake 1.5 km; Koggala Airport 5 km; Kathaluwa station 1.9 km; Ahangama station 2.1 km; tuk tuks at the door; taxi on request | `location.distance_to_beach` (contradiction → "a short walk"), `location.nearby`, `facilities` |
| Amenities list ("Good to know") | `facilities`, `facilities_note` |
| Booking.com 9.2/10, 468 reviews; Google 4.7/5, 213 reviews; captured 6 Nov 2026 | `reviews.booking`, `reviews.google` (`fetched_at` 2026-11-06) |
| Six guest quotes with name and source | `reviews.quotes` |
| Booking direct gets you our best rate (closing) | `booking.path.note` ("Book direct … for our best available rates") |
| Address Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka | `location.address` (Google listing, place names capitalised) |
| +94 72 800 3022 (phone, WhatsApp), hello@pantareiresort.com, Google Maps link | `contact.phone`, `contact.whatsapp`, `contact.email`, `location.map_url` |
| Instagram, Facebook, YouTube | `contact.socials` |
| Photographs and films | `images[]` (business-owned), `videos[]` vid-001, vid-002, vid-003 (business-owned) |

## editable (owner, in Payload after a sale; seeded today by scripts/seed-from-dossier.mjs)

| Tab | Field | Where on the page |
|---|---|---|
| Basics | `businessName` | footer ©, `<title>`, drawer and alt fallbacks |
| Text | `tagline` | Welcome lead line, footer, meta description |
| Text | `featureLine` | Welcome, under the title ("No paradise like home.") |
| Text | `closing` | the closing line over the last photograph |
| Text | `copyBlocks[]` intro / about ×4 / offer / info ×2 | Welcome, The pool, Restaurant and bar, Panta Fitness Club, After the surf, Four ways to stay (+ its first paragraph in the drawer), Groups and retreats, Getting here and around — headings and bodies |
| Opening hours | `hoursNote` | under the restaurant's dish list |
| Prices | `priceList[]` | pool day pass line; fitness "Per class" line (rows labelled `Fitness class: …`); massage rows (labels `<name>, <duration>`) |
| Photos & video | `photos[0–6]` | ring under the room cards; pool (full-bleed); restaurant tab photos ×2; after the surf (full-bleed); groups; closing (cropped by the build, `src/lib/slots.mjs`) |
| Photos & video | `heroVideo`, `heroVideoPoster` (+ its `focalX`: where an upright phone looks) | the first screen |
| Photos & video | `videos[0]` (Welcome frame), `videos[1]` (fitness half) — video, poster, description | the two clips |
| Rooms & stay | `rooms[]` label, beds, sleeps, note, photo | room cards and the drawer; the room's size is read from the start of its note ("22 m², …") |
| Rooms & stay | `stayInfo` check-in/out, note | the line under the room cards |
| Amenities | `amenities[]` | "Good to know" |
| Reviews | `ratings[]`, `testimonials[]` (delete only) | guests section, the drawer's trust line (Booking.com row) |
| Contact & booking | `contact.*`, `bookingLinks[]` (row 1 = the engine, rows 2–5 = room pages, matched to rooms by label) | every booking button, drawer hand-off, footer, Getting here |
| (v0.11) | `socialLinks[]` | footer icons |

## schema gaps (src/gaps/gaps.json; owner cannot edit these in Payload yet)

| Gap | What | Source |
|---|---|---|
| `heroTitle` | "Panta Rei, Kabalana" on the first screen | concepts.md §6 (the concept's new line was never audited) |
| `logo` | the business's logo, drawn as a mask in the header and footer (no logo field in the schema) | `images[]` img-023 |
| `roomGalleries` | 4–5 more photographs per room in the drawer (rooms[] holds one photo) | `room_types[].value.photos` |
| `menuTabs` | the two dish lists + which photo each tab shows (no menu module) | cut from copyBlocks "Restaurant and bar" (checked by the seed) |
| `classWeek` | "Vinyasa yoga, every morning", 8:30, Friday off — the week strip (no schedule field) | copyBlocks "Panta Fitness Club" (checked by the seed) |
| `distances` | the five distances list (no places-nearby field) | copyBlocks "Getting here and around" (checked by the seed) |
| `listings` (4h) | the Tripadvisor listing, JSON-LD `sameAs` only, never shown (socialLinks[] has no tripadvisor platform) | dossier `contact.socials.tripadvisor` (the seed fails unless it is entity d25364260) |

## conflicts

- **Fonts licence:** the coordinator asked for "woff2 + OFL text". Jost is OFL (`ofl-jost.txt`); Satisfy is Apache 2.0, so
  its licence text is `license-satisfy-apache-2.0.txt`. Not blocking.
- **audit-mockup does not take `final`:** run from a scratch copy whose only change is the project path (and absolute
  imports); same measurements, same thresholds.
- **Fitness clip on desktop** is the publisher's `m720` (720×1280) shown in a half-width frame (720 CSS px at 1440): sharp at
  1x, soft on a 2x laptop. A wider tier of a portrait upload would be a 1080-wide file over 2 MB; kept at m720 for the
  budget. Not blocking.
- **Room sizes** are read from the start of `rooms[].note` ("22 m², …") because `rooms[]` has no size field: if the
  owner rewrites a note without the size, the card shows "sleeps n" only. Schema gap candidate (`rooms[].size`).
- **Fitness / massage prices** are found by their price-row labels ("Fitness class: …", "<Massage name>, <duration>"):
  an owner who renames them moves them out of those lines. Documented in `editable`.
- Not done, as not requested for 4g (see "4g changes"): header opacity, smaller hero title, shorter script headings,
  the "if your dates clear" line.
