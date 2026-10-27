# Cheeky Monkey Surf Camp — final site (station 4g)

designer 0.7.0 · run `2026-10-midigama-01` (test, operator alon) · 2026-10-27 · port of `mockups/unique/` ("Pick your
board"). Alon picked it at gate b and kept unique only: *"i like the unique one, but lets work on the background a bit
to make it more colorful with surf and beach vibes."* He then asked for big photos of the beach and surf. Look rounds 4–7
made both changes in the mockup: the beach-colour grounds, and "Down at the water" with the stock-003 band and the own
surf photos. Both are carried over unchanged. The design direction is unchanged.

## Build

```
npm install                  # astro 7.3.3 + sharp 0.35.4 into this folder (node_modules is git-ignored)
bash scripts/make-media.sh   # the seed (no Payload tenant before a sale) + every media file
npm run build                # photos step + astro build → dist/index.html
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → photos → build
```

Needs `tools/link-assets.sh cheeky-monkey` (the dossier assets) and ffmpeg with libx264 + libsvtav1. `wrangler.jsonc` is
for station 6; nothing is deployed. Every media file is git-ignored and made by `scripts/make-media.sh`. Its
`# media:` headers cover `src/tenant/media`, `src/gaps/media`, `public/photos`, `public/video` and `public/atmo`.

| Path | What |
|---|---|
| `src/pages/index.astro` | the home page. The markup and class names are the mockup's, bound to content. 4g changes are commented |
| `src/styles/site.css`, `src/scripts/site.js` | the mockup's CSS and JS, inlined as in the mockup. 4g changes are commented: the button radius, and the reel read from content |
| `src/lib/site.mjs`, `slots.mjs`, `labels.json`, `icons.svg.txt` | content plumbing; which photo sits where and how it is cropped; template wording; the icon sprite |
| `src/tenant/content.json` | the seed, in Payload's REST shape (schema v0.9/v0.10). `npm run fetch` replaces it after a sale |
| `src/gaps/gaps.json` | SCHEMA GAP content (below). It survives a fetch |
| `scripts/*` | `make-media.sh`, `seed-from-dossier.mjs`, `photos.mjs`, `fetch-tenant.mjs` (plumbing from `sites/global-surf-adventures-v2/final`, plus `rooms[].photo`) |
| `public/fonts/` | Rethink Sans (variable, latin) and Permanent Marker (latin) woff2 files from Google Fonts, self-hosted, with their OFL and Apache licences |

## Port comparison (`tools/shoot.mjs`, both pages over http, shot the same day)

The final sheets are `shots/desktop-sheet.png` and `shots/mobile-sheet.png`. The mockup was re-shot into a scratch
folder rather than its own `shots/`.
- **Page height:** desktop 15,562 vs 15,561 px; phone 17,203 vs 17,179 px.
- **Captures:** 20 + 23 on each.
- **Structure:** the text, links, alt texts and aria labels were compared line by line: 169 / 70 / 56 / 68 on each side.
- **Markup:** a normalised HTML diff of the body differs only in whitespace and in the two items below.
- **Pixels:** a per-capture diff shows the same composition at every stop. The pixel differences are:
  - the moving reel and the beach drift, caught at other moments;
  - WebP encoder noise (sharp instead of cwebp, at the same ratio, width and quality);
  - the button corners;
  - from the transfers line on, the phone is 24 px lower.

Visible differences, both intended:

| Item | Mockup | Final | Why |
|---|---|---|---|
| Booking buttons (every `.btn`: hero, rooms, cards, closing, footer, phone bar, drawer) | left corners square, right end round | 18 px soft tail corners, a round nose half the height | **A bug, fixed.** The CSS asked for `18px 999px 999px 18px`. The browser scales every radius down by one factor when adjacent radii overflow the box (999 + 999 > 52 px), so the 18 px corners came out about 0.5 px. The concept draws the button as a board: "the booking button's rounded nose-shape". The nose is now `calc(var(--bh) / 2)`, with `--bh` set per button size (52 / 50 / 46 px) |
| Getting here, the transfers line | "… \| Drop and pick-up USD 130 \| …" | "… \| Airport drop and pick-up USD 130 \| …" | the line is built from `priceList[]`, and the copy's label is "Airport drop and pick-up". The mockup had shortened it by hand. Because the label is longer, the phone line wraps once more, which is the +24 px |

Everything else matches the mockup and its notes:
- the first screen (the board window over the drawn beach, the split featureLine, the blue button);
- the WebGL resin gloss, live (`gl-live`);
- the board-mask zoom-through over 180 vh / 110 vh, with the section height fixed before first paint;
- the colour grounds and shoreline edges;
- "Down at the water": stock-003 whole with its credit, and the img-100 / 103 / 155 mosaic;
- the four board cards, the inclusions and the lesson card;
- the five room slideshows, the shop masonry, the roof, Baba and the guests;
- Getting here, the closing, Instagram, the footer, the phone bar and the drawer.

## Performance (`tools/audit-mockup.mjs cheeky-monkey ../final`, throttled phone 390×844, no scroll) — `audit.json`

| Item | Target | Measured |
|---|---|---|
| First-load transfer, video excluded | ≤ 1.5 MB | **388 KB** (397,348 B in 7 requests): HTML 98 KB (25.7 KB gzip, with the CSS and JS inline), fonts 65 KB, images 234 KB |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | phone `m720` MP4 **1.86 MB** (720×1280) · desktop `d1920` (1080×1920, never upscaled) WebM AV1 **1.77 MB**, MP4 fallback 3.75 MB · 10 s · attached after load + idle |
| JS, compressed | ≤ 300 KB | **7.0 KB gzip** (18.4 KB raw), inline, **no library**. The set-piece is raw WebGL plus the page's own scroll JS |
| Largest above-the-fold image | ≤ 300 KB | 75.6 KB (the poster, 720 px WebP) |
| Fonts | ≤ 2 families, ≤ 150 KB | Rethink Sans + Permanent Marker, 65 KB, self-hosted, preloaded |
| LCP | ≤ 2.5 s | 1,472 ms |
| CLS (load) | < 0.1 | 0 |
| Scroll CLS early / settled | < 0.01 | 0 / 0 |
| Third-party requests on load | 0 | 0, and 0 over a full scroll at 1440 and 390 |

The 2.2 MB stock-003 band is outside first load. Its src is set by an IntersectionObserver 600 px out, and its
2560:1712 box is reserved from first paint, as in the mockup. There are no embeds.

## Checks (4g)

| Check | Result |
|---|---|
| `npm run build` | **pass**: 1 page, `dist/index.html` 98,438 B |
| `tools/check-design.mjs sites/cheeky-monkey/final/dist/index.html` | **ok**, 0 problems, 0 warnings. h1 Rethink Sans (the wordmark), h2 Permanent Marker, body Rethink Sans, ground `#FFFFFF`, 0 all-caps labels, 0/26 labelled headings |
| `tools/check-places.mjs cheeky-monkey` | **ok**, 1 borrowed image use checked, 0 failing. The tool reads `mockups/*` only, so the same rules were run on `final/dist` (next row) |
| check-places rules on the final build | **pass**: stock-003 `place_ok: local`. `dist/atmo/stock-003.jpg` is byte-identical to `dossier/cheeky-monkey/stock/stock-003.jpg` (`cmp`). The id is not in any inline script, so it is not shader input. The credit on the page equals `index.json` `credit` character for character. Its alt names no break and no business |
| JS off (390) | **pass**: the same first screen (the poster in the board shape). The drawer is the in-page `#book` section: 4 step anchors and 8 action links (Booking.com ×2, `tel:` ×3, prefilled `mailto:` ×2, Instagram). The hero button is the Booking.com link. The band is served by `<noscript>`. 0 video requests |
| Reduced motion (1440, 390) | **pass**: `js still`. The pick section is exactly 100svh with no pin, the canvas is hidden, and the poster shows in the board shape on a static beach. 0 video requests over a full scroll |
| No WebGL (`--disable-webgl`) | **pass**: `js motion` without `gl-live`. The same zoom-through runs on the CSS board mask over the `<video>`, without the gloss |
| Motion tier | desktop plays `video/cm-board.d1920.webm`, a 390 phone plays `video/cm-board.m720.mp4`. Both come from `videos.generated.json`; `gl-live` is on |
| Keyboard (1440, both motion settings) | 111 tab stops. The skip link comes first, and 0 stops are hidden. The drawer traps focus (30 Tabs stay inside), Esc closes it, and focus returns to "Plan a stay". `audit-mockup`: drawer opens / closes / focus returned = true |
| Booking end to end (1440 + 390) | The hero and every room go to `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, the dossier's `booking.engine_url` character for character (the seed fails if it differs): **1 tap**. Drawer → A surf week → Yoga and Surf → Shared double shows **USD 280**, and the Email link's subject is "Cheeky Monkey: Yoga and Surf Lesson Package, shared double room". Drawer → A room → Classic Triple hands off to Booking.com, with focus on the link |
| Offline except the local static server | every request goes to the local server: 0 other hosts in the request log at 1440 and 390, on load and over a full scroll |
| Tap targets < 44 px | 0 of 83 · images without alt: 0 (7 decorative `alt=""`) |
| Facts | `audit-mockup` finds 48 numbers, and 1 is not in the passed copy: "3.0," from "CC BY-SA 3.0," in the licence credit, which is not a claim |

## editable (owner, after a CMS sale) — where each thing on the page is edited

| Admin tab | Field | Where it shows |
|---|---|---|
| Basics | `businessName` | `<title>`, the section label, the wordmark (split by `gaps.wordmark` while the split rebuilds the name exactly; otherwise the full name) |
| Basics | `tagline` | the meta description |
| Basics | `featureLine` | the first screen's line, split at its comma either side of the board |
| Basics | `closing` | the closing line |
| Text | `copyBlocks` | by slot and order: `intro`[0] the intro · `about`[0] Baba · `about`[1] the shop · `about`[2] the roof · `offer`[0] lessons · `offer`[1] "A week of surf" (¶1–4 are the card lines, the last ¶ is the lede) · `info`[0] Getting here · `info`[1] Good to know |
| Prices | `priceList` | the four surf-week cards and the drawer (grouped by `gaps.weeks[].group`; range, room line, "per person, 7 nights" and the year all come from the rows); the flat rows are the transfers line |
| Lessons | `lessons` | the lesson card and the drawer (price, unit, duration, levels, the other lesson types, group size) |
| Photos & video | `photos[0–24]` | "Down at the water" ×3 · the cards ×4 · the shop masonry ×7 · the roof band and side · Baba and the print · Getting here · the closing board · Instagram ×5 (`src/lib/slots.mjs`, cropped by the build) |
| Photos & video | `heroVideo` + `heroVideoPoster` | the board window and its zoom (renditions from the build) |
| Rooms & stay | `rooms[]` | label, beds, sleeps and note make each room line; the m² goes on the drawer tile; `photo` is slide 1 and the drawer tile |
| Rooms & stay | `stayInfo` | check-in/out and the house rules ("Staying here") |
| Amenities | `amenities` | the roof's amenities line |
| Rentals & shop | `rentals`, `brands` | the shop list and the brands line |
| Surf | `spot`, `season` | "Down at the water" |
| Reviews | `ratings`, `testimonials` | the two rating cards and the 11-quote slideshow |
| Contact & booking | `contact.phone`, `contact.email`, `contact.address`, `contact.mapUrl`, `bookingLinks[0]` (Booking.com), `bookingLinks[1]` (Instagram) | every call, email, address, map, booking and Instagram button |

Not owner-editable today (the gaps below): the package names, the inclusions list, the lesson price year, the room
slides 2–6, the atmosphere photograph and its credit, the socials, the place line and the drawer's board text.

## schema gaps (bound only to existing fields; the rest is in `src/gaps/gaps.json`)

1. **Hero / what-and-where line** (creative director, concepts.md §6): there is no short subtitle field. The header shows
   `gaps.place` "Midigama, Sri Lanka" (the town in `contact.address`) after the wordmark. A proposal could add an optional
   `heroLine` (≤ 50 chars).
2. **Room galleries** (creative director): `rooms[].photo` holds one photo, which is bound as slide 1. Slides 2–6 per
   room are in `gaps.roomGalleries` (18 photos, `src/gaps/media/`). It needs `rooms[].photos[]` (≤ 8).
3. **Announcement line** (creative director): there is no field. The mockup shows no announcement either, so nothing is
   bound and nothing is invented. The open-status question (Facebook says low season / Arugam Bay) needs that field before
   any line can appear.
4. **Packages:** `priceList[]` is flat. A package (three room prices under one name, a short name and a one-line
   description) has no module. `gaps.weeks` holds each group prefix and the two display names.
5. **Package inclusions:** "Every week comes with" is "A week of surf" ¶5 split into an icon list (`gaps.inclusions`).
   There is no field.
6. **Lesson price date** (copyeditor N3): `lessons[]` has no note, so "Published 2021" on the lesson card comes from
   `gaps.lessonPriceYear`. It stays next to the "Lessons for your level" block that says "published in 2021", as N3
   asks.
7. **Credited atmosphere photo:** `media` has no credit or licence field. stock-003 and its credit parts are in
   `gaps.atmosphere`, rebuilt from and checked against `stock/index.json`.
8. **Socials:** `socialLinks[]` exists only among the v0.11 brand modules. A surf_camp has no field for its website (the
   source link on the `site` testimonial), Instagram (the tiles, the follow tile, the footer) and Facebook
   (`gaps.socials`).
9. **"In every room" line** in "Staying here": `amenities[0–2]` joined into one sentence (`gaps.stayRoomLine`).
10. **The drawer's board step** ("400 boards to rent" …): the shop ¶1 plus `rentals[]` as the drawer's words
    (`gaps.drawer`).
11. **SEO title** (not in v0.1): `gaps.seo.title`, which is the mockup's title.

## Facts (every checkable claim → field → dossier; the copy's audit is `copy/review.md`, 0 unsourced / 0 contradicted)

| Claim on the page | Field | Dossier |
|---|---|---|
| Surf weeks: USD 400/300/300 · 350/295/280 · 300/280/280 · 290/250/250, per person, 7 nights, published 2021 | `priceList[0–11]` | `offers[0–11]`, `packages[0–3]` |
| Card lines, "halves that", the tuk-tuk lesson | `copyBlocks offer[1]` ¶1–4 | `packages[0–3].value.includes` |
| Inclusions (7 nights … lake tour USD 5 extra; the board and ride with the three lesson packages) | gap (¶5) | `packages[0–3].value.includes`, `offers[25]` |
| Surf lesson USD 20 per person, 90 min, beginner / intermediate / advanced; private, group max 6, SUP, surf spot tour | `lessons[]` | `lessons[0–5]`, `levels[0–2]` |
| Five rooms: beds, sleeps, m², views | `rooms[]` | `room_types[]` |
| Check-in 14:00–19:00, check-out 06:00–11:00; house rules | `stayInfo` | `stay_info` |
| A/C, private bathroom and entrance in every room; the amenities line | `amenities[]`, gap line | `room_types_note`, `facilities[]` |
| 400 boards; shaper; shelves; brands; scooters; own boards shaped in Bali | `copyBlocks about[1]`, `rentals[]`, `brands[]` | `rentals[0–3]`, `business.description_shop`, `brands[]` |
| Opened late 2009 with three rooms; ten rooms by 2021; Baba | `copyBlocks about[0]` | `business.since`, `room_count`, `business.owner`, `business.run_by` |
| 180° sea view; rooftop yoga at sunrise and sunset | `copyBlocks about[2]` | `facilities[3]`, `[5]`, `reviews.quotes[8]` |
| Google 4.5/5, 467 reviews, 26 Oct 2026 · Booking.com 8.3/10, 45 reviews, 26 Oct 2026 | `ratings[]` | `reviews.google`, `reviews.booking` |
| 11 quotes, authors, sources, months | `testimonials[]` | `reviews.quotes[…]` (machine-checked by the copyeditor) |
| 350 m, 800 m, 2 km, 3.3 km, 10 km; Galle–Matara main road | `copyBlocks info[0]` | `location` (Booking.com distances) |
| Airport drop USD 65, pick-up USD 65, both USD 130, published 2021 | `priceList[12–14]` | `offers[15–17]` |
| Address; +94 71 924 8686; cheekymonkeymidi@gmail.com; map; Booking.com; Instagram; Facebook; site | `contact`, `bookingLinks`, gap socials | `location.address`, `contact.*`, `booking.engine_url`, `contact.socials` |
| Spot and season | `spot`, `season` | `location.spot`, `season` |
| Midigama shore photograph and credit | gap atmosphere | `stock/index.json` stock-003 (`place_ok: local`) |
| No generator; taxi, safari, cooking class | `copyBlocks info[1]` | as in `copy/review.md` |

## images

These are the mockup's images (`mockups/unique/notes.md`, "images"), made by the build from the same dossier ids at the
same ratios, crop centres, widths and qualities.
- **Business-owned:** img-100, 103, 155, 149, 135, 137, 096, 109, 146, 112 (cropped 1035:1180 from the top, without the
  avatar badge), 108, 131, 116, 087, 134, 078, 141, 121, 082, 105, 085, 099, 089 and 013.
- **Room slides:** img-030, 014, 021, 016, 033, 026 · 035, 034, 036, 037 · 058, 041, 045, 050, 053 · 002, 004, 009, 013 ·
  064, 063, 065, 070.
- **From vid-009 (business-owned reel, 7 Oct 2026):** the poster (the first frame of the 3.0–13.0 s cut) and the
  closing board (12.8 s).
- **Atmosphere, one photo:** stock-003, CC BY-SA 3.0, Maaike Hage via Wikimedia Commons. It is shown whole, never
  re-encoded, with its credit, and never presented as the business.
- **Alt text:** the mockup's, word for word (`scripts/seed-from-dossier.mjs` ALT).

## gaps

The same as in the mockup:
- No WhatsApp: `contact.whatsapp` is `null` in `content.json` (copyeditor N6; the copy has `""`).
- Rooms go to Booking.com. Weeks, lessons and boards go to `tel:`, prefilled `mailto:` and Instagram.
- Every price is dated 2021.
- The Booking.com date parameters are not built (they cannot be tap-tested in a test run).
- No break name, so no forecast.
- No shop hours.
- No instructor names.
- Open status is unclear, so the page says nothing about it.
- The Instagram tiles link to the profile, because no post URLs were harvested.
- No owner water footage.

Copyeditor N1 (the rooftop quote fragment, with Mihrican's full quote in the slideshow) is unchanged from the mockup.

## conflicts

1. **The concept's `/plan/` URL.** The drawer is `#book`, as in the mockup. With JS off it is the same content as an
   in-page section with every link, which works on any host and in a subfolder, and it is the convention
   `audit-mockup` measures. A separate `plan/` page would duplicate it, so none was built. Mockup conflict 10 said
   "4g gives it a real page". That promise is not kept: the in-page section already gives JS-off visitors the same
   path.
2. **`font-display: optional`, not `swap` (playbook §4).** This is kept from the mockup's round 3: swap reflowed the
   intro and counter text (early-scroll CLS 0.13). The two latin files are self-hosted and preloaded, so on a first
   visit they arrive inside the optional window. Measured: CLS 0, scroll CLS 0 / 0.
3. **No library to vendor.** The brief expected WebGL and zoom libraries vendored. The picked mockup uses none: raw
   WebGL (about 6 KB) and its own scroll JS. So 4g ships none: 7.0 KB gzip of JS in total, far inside the 300 KB budget.
4. **Phone video tier.** The schema's snippet gives phones `m1280`. For this 1080-wide portrait upload, `m1280` is the
   1080 encode (3.75 MB MP4). Phones get the `m720` tier from the same manifest (1.86 MB), as the mockup's 720 phone
   file did, to stay inside the 2 MB phone line. Desktops get `d1920` (1080 wide).
5. **Hard constraint 5:** this run has one business, so there is no other site to differ from (see the mockup's notes
   for the three variants).

## Not done

- SEO, JSON-LD, robots, sitemap and llms.txt (stations 4h / 4i).
- Deploy (station 6).
- `shots/` is left for the critics.
