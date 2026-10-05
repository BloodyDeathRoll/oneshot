# Global Surf Lodge Kabalana — final site (station 4g)

designer 0.4.2 · run `2026-09-globalsurf-02` · 2026-10-05 · operator shahar · port of `mockups/picked/` (the
composite Shahar picked on 2026-09-30, 4f round 2 passed: critic 72.8/80, visual 8, experience 8), plus
Shahar's 4g must-fix list of 2026-10-04 (`notes/global-surf-adventures.md`).

## Build

```
bash scripts/make-media.sh   # seed (no Payload tenant yet) + every media file: video masters, renditions, photo crops
npm run build                # photos step + astro build → dist/ (index.html, book/index.html)
npm run build:cms            # once the tenant exists: fetch-tenant → publisher video step → portrait hero → photos → build
```

Needs `tools/link-assets.sh global-surf-adventures` (dossier assets and the video sources), ffmpeg with
libx264 / libsvtav1 / libwebp. `node_modules` is a link to `spikes/payload/site/node_modules` (astro 7.3.3,
sharp 0.35.4), as for the other finals. Nothing is deployed here: `wrangler.jsonc` is for station 6.

| Path | What |
|---|---|
| `src/pages/index.astro`, `src/pages/book/index.astro` | the two pages; markup ported from `build.py` / `book.py` |
| `src/styles/*.css`, `src/scripts/*.js` | the mockup's CSS and JS (origin marks kept), inlined as in the mockup; 4g changes are commented |
| `src/lib/site.mjs` | shared markup (header, footer, slideshow, room viewer, icons), formatting, manifest plumbing |
| `src/lib/slots.mjs` | which photo sits where (`photos[n]` → slot n) and the crops each slot gets |
| `src/tenant/content.json` | the seed, in Payload's REST shape (schema v0.9); `npm run fetch` replaces it |
| `src/gaps/gaps.json` | SCHEMA GAP content (below); survives a fetch |
| `src/lib/labels.json` | interface wording approved with the copy (`mockup_extras` ctas / titles / booking) |
| `scripts/make-media.sh` | the media recipe (`# media:` headers); `seed-from-dossier.mjs`, `photos.mjs`, `video-portrait.mjs`, `fetch-tenant.mjs` |
| `public/fonts/` | Lora (normal + italic) and Dancing Script, latin woff2 (the exact files the mockup loaded from Google), OFL texts |

## Must-fix list (Shahar, 2026-10-04) — what was done and how it was checked

| # | Item | Done | Checked |
|---|---|---|---|
| 1 | Dates step dropped `start` | Guests above the Saturdays. A date counts only while the live calendar offers it; a struck date is cleared with "Sat 19 Dec 2026 isn't available for 1 couple. Choose another Saturday."; Next and the hand-off need an offered date | mocked engine, 390 + 1440: cleared + message, forced submit sends nothing, hand-off `…/level-2-rollers?couple=1&start=2027-02-20&end=2027-02-27` |
| 2 | Silent room switch | The chosen room stays chosen; dates and total say "Not free on these dates: <room>." (+ "Only the … is free on these dates."); the bar's hand-off becomes "Change room" / "Change dates" | mocked "dorm only": twin kept, message on dates, total blocked, submit blocked, after choosing the dorm $2,932 and the hand-off |
| 3 | Home "Choose this room" assumed Level 1 | Links to `book/?room=<key>`: Level step, room kept, no level preselected, Next soft until one is chosen | 390: Deluxe → Level (none, Next soft) → Level 3 → Room "Chosen" → Dates, summary Level 3; hero path unchanged |
| 4 | JS off: check-out before check-in | The no-JS check-out list is replaced by the stay length sent as the engine's documented `duration` (days) | live engine, read only: `start=2027-02-20&duration=8&couple=1` lands like `end=2027-02-27` (duration 15 → 14 nights); JS-off probe 390 + 1440: blocked without a stay length, hand-off `…?female=0&male=0&couple=1&start=2027-02-20&duration=8` |
| 5 | Phone quote control jumps; "7 / nights" | Quote slideshow takes the tallest quote's height (after fonts, on resize); summary dates as two items, two lines on phones | 390: › at the same y for all 9 quotes, no attribution clipped; "20 Feb 2027 – 27 Feb 2027" / "7 nights" |
| 6 | Room photos 800 px on desktop; level-1 phone crop; casing | Media-half gallery sized for its ~1240 px cover draw, 1400/2000 renditions; band cut per level (12/38/40 %); room names sentence case in the seed | 1440×900 loads `img-063-full-1400.webp`; band screenshot shows the head and arm; "Shared twin room – 2 beds" |
| 7 | Rounding; `viewed()` fallback | Snapshot and live prices rounded once where they enter; fallback = first room in the page | probe totals $3,092 / $2,932 |
| 8 | Self-host fonts; Rosa live | `public/fonts/`; the forecast has no inlined reading. Reworked after station 5 (below): the JSON is retried, the widget no longer waits for it, the block's space is reserved in every state | home load: 0 third-party requests; see "Rosa forecast after station 5" |
| 9 | Hero loop + booking clips in `dossier.videos[]` | Appended `vid-hero-c`, `vid-book-l1..l3` (append only) | `dossier.json` diff: 138 insertions, 0 deletions |

### Rosa forecast after station 5 (Shahar, 2026-10-05: "the forecast does not fail")

The critic found the block collapsing when the JSON failed in view (1016 → 404 px at 390, CLS 0.27) and the
widget moving down 71 px at 390 when the reading arrived. Now (`home.js`, `index.astro`, `home.css`):
- **Start:** nothing third-party on first load. When the headline or the widget box comes within 300 px of the
  viewport, Rosa's widget is framed (it is Rosa's own and reads Rosa's data itself; it no longer waits for our
  JSON) and the headline asks for `south-point.json`.
- **Retry:** up to 4 tries, 6 s each, 1 / 3 / 7 s apart (≈ 35 s worst case); a new round when the browser
  comes back online (and the frame is reloaded then). The plain link "See today's forecast for South Point on
  Rosa" stands in after 3 s or the first failed try; a later success replaces it with the reading.
- **Stale:** `generated_at` older than 24 h is an answer, not a failure: the plain link, no retry. A reading
  on screen turns into the plain link and is fetched again when it reaches 24 h.
- **Reserved space:** a hidden ghost of the headline with Rosa's longest wording ("double overhead+", "WSW",
  "cross-shore", "Wed 28 Sep 00:00"), the reading and the plain link share one grid cell, so the cell has its
  final height before anything arrives, at every width. A reading that lands while the block is still below
  the screen drops the ghost, so the block keeps its designed height (identical geometry to the 4g build at
  320–1920 px, measured). The widget box is 420 × 500 in every state (no more `.off`). No swell in window →
  "–", never the placeholder "00".
- **JS off:** the plain link only, no frame (unchanged).

Measured on the local build (headless Chromium, block scrolled into view before the JSON answers; CLS after
the scroll; the 1440 runs also log the header's own 0.0019 shift, `nav`, which predates this and is not Rosa):

| scenario | 390: #waves height, Rosa CLS | 1440 | ends with | widget |
|---|---|---|---|---|
| live | 1087 → 1087, 0 | 720 → 720, 0 | reading | Rosa's widget |
| JSON refused (4 tries) | 1087 → 1087, 0 | 720 → 720, 0 | plain link | Rosa's widget |
| 3 s then refused, each try | 1087 → 1087, 0 | 720 → 720, 0 | plain link | Rosa's widget |
| no answer (6 s timeouts) | 1087 → 1087, 0 | 720 → 720, 0 | plain link | Rosa's widget |
| first 2 tries refused | 1087 → 1087, 0 | 720 → 720, 0 | reading (3rd try) | Rosa's widget |
| `generated_at` 25 h old | 1087 → 1087, 0 | 720 → 720, 0 | plain link | Rosa's widget |
| offline while loading, then online | 1087 → 1087, 0 | 720 → 720, 0 | plain link, then reading | Rosa's widget (reloaded) |
| widget refused | 1087 → 1087, 0 | 720 → 720, 0 | reading | box keeps its own plain link (390 screenshot: refused and hanging) |

The critic's own probes (`reports/…/critic/final/probe-rosa*.mjs`) on this build: no Rosa shift in any run;
slow failure in view 1087 → 1087 px at 390 (was 1016 → 404, 0.269) and 720 → 720 at 1440 (was 720 → 449, 0.099).

## Funnel (`tools/funnel.mjs` 0.2.0, built site over http, depth 3)

`hero_action`: "Book package now", class **engine**, **1 tap** to the booking page (target 1). Walked from the
hero to the Bookinglayer hand-off: **8 taps** with the Twin (hero, Level 2, Twin pill, Choose this room, + couple,
Sat 20 Feb, Next, Continue booking), 7 with the first room shown (target ≤ 8), at 390 and 1440, engine API live
and blocked. `clicks_to_book` 1; `primary_action` is still reported as whatsapp ("Ask about dates") — the
tool's own field; rubric 0.3.1 reads `hero_action` when `booking_flow` is set. 8 pages, 0 broken (served with
trailing-slash handling, as Workers' `auto-trailing-slash` does; `tools/_serve.mjs` does not redirect `/book`).

## Performance (`tools/audit-mockup.mjs`, throttled phone, no scroll) — `audit.json`

| Item | Target | Measured |
|---|---|---|
| First-load transfer, video excluded | ≤ 1.5 MB | 501 KB (HTML 92 KB, fonts 104 KB, images 317 KB) |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | portrait phone 1.27 MB webm / 1.79 MB mp4 · desktop 2.83 MB webm / 3.87 MB mp4 |
| JS, compressed | ≤ 300 KB | inline only (0 external): home 14 KB (5 KB gzip), booking 29 KB (10 KB gzip) |
| Largest above-fold image | ≤ 300 KB | 73 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | Lora + Dancing Script, 104 KB |
| LCP / CLS | ≤ 2.5 s / < 0.1 | 432 ms / 0.0033 |
| Third-party requests on load | 0 | 0 |

Reduced motion (390, 1440): 0 video requests on home and booking. Offline apart from the local server: both
pages load, the forecast shows its plain link. 80-stop Tab pass: every stop has a ring, no trap. check-design:
home 0 problems / 0 warnings; booking (root copy, as at 4f) 0 / 0. check-places: no borrowed images.

## Compared with the picked mockup (`tools/shoot.mjs`, `shots/home`, `shots/book`)

Desktop home: same page height (9938 px) and the same sheets. Booking, desktop and phone: the same sheets.
Visible differences, all requested or forced:
- the must-fix changes above (dates step order and messages, band crops, quote height: phone home +100 px);
- the Freestylers line reads "From 4 nights" (the passed `lessons[3].includes`) where the mockup printed its
  detail line "from 4 nights";
- phone hero: see conflict 1.

## Schema gaps (`src/gaps/gaps.json`; not owner-editable until the schema grows)

From `copy/sources.md` "mockup_extras" (each already listed there as a gap): short hero title; level one-liners;
inclusions as icon lists; the three engine room types with line, description, details and **galleries (16
photos, in `src/gaps/media/`)** — `rooms[]` stays `[]` by the copy ruling; logo; Instagram + socials. Also:
the welcome detail line ("12 rooms | Saturday check-in | ISA…") and the rating categories; the Freestylers
WhatsApp text; the terms URL; Bookinglayer product ids, API and business domain; the booking snapshot
(Saturdays, room supplements, as-of dates). photos[] carries the other 16 photos (cap 24).

## Editable (owner, Payload)

Basics: business name, tagline, closing, featureLine. Text: copyBlocks (welcome, the week, rooms lead, guests
title, Getting here). Photos & video: photos[0–15] (slots in `src/lib/slots.mjs`), heroVideo + poster, videos[0–2]
(home level cards), videos[3–5] (booking desk). Lessons: names and the from-price (drives "From $1,466 pp" and
the snapshot base). Stay: check-in/out times (footer line). Reviews: ratings, testimonials. Surf: spot text,
forecast on/off. Contact: phone, email, address, map link, WhatsApp (contact.whatsapp, else the "Ask on
WhatsApp" booking link), booking links (engine product URLs).

## Facts (every number on the page; audit: 28 numbers, 0 not in the passed copy)

| Claim | Field | Dossier |
|---|---|---|
| From $1,466 pp, 7 nights | lessons[].price | offers[0–2].price (28 Sep 2026) |
| 8.6, Booking.com, 80 reviews, 28 Sep 2026 | ratings[0] | reviews.booking |
| Staff 9.5, Facilities 9.2, Cleanliness 9.2 | gap | reviews.booking.categories |
| 12 rooms, Saturday check-in, ISA-certified guides | gap / credentials | business.staying_with_us, offers duration_options, credentials |
| inclusions (7 nights, 7 breakfasts, 5 dinners, 5 × 2 h sessions, 5 theory…) | gap | offers includes_engine ∩ includes_site |
| airport pickup from $220 pp | gap | offers package_items_engine |
| room supplements +$140 / +$80 / +$418 pp, sample 20–27 Feb 2027 | gap snapshot | rooms_engine (29 Sep 2026) |
| 40 % deposit, 45 days | labels (copy) | booking.deposit_terms |
| up to 6 guests | labels (copy) | offers max_guests_per_booking |
| check-in 14:00–20:00, check-out 11:00 | stayInfo | stayInfo |
| 40 m, 350 m, 400 m, 4 km, 3.9 km | copyBlocks (Getting here) | location distances (Booking.com) |
| phone, email, address, map, WhatsApp | contact, bookingLinks | contact, booking.whatsapp |
| quotes | testimonials | reviews quotes |
| Saturdays offered | gap snapshot | docs/bookinglayer.md §2.1 (read 29 Sep 2026); live calendar after interaction |

## images

All business-owned (dossier). Alt text: dossier description, else the mockup's written alt
(`seed-from-dossier.mjs` ALT_FALLBACK). img-104 is uploaded as the mockup's badge-free crop (1700×1133 at
170,200); every other file is copied untouched and cropped by the build. img-078 left out (same frame as
img-063). Videos: masters cut from vid-009/010/003/002 and vid-002e/003e with the mockup's cut lists.

## Template labels not in the copy (new at 4g)

"{date} isn't available for {guests}. Choose another Saturday.", "Change room", "Change dates", "Choose your
nights" (no-JS), "{n} nights" options. The rest as listed in `mockups/picked/notes.md`.

## conflicts

1. **Phone hero (schema v0.9 vs the mockup's phone cut).** The mockup played a separate 9:16 phone edit whose
   crop moved per shot (and panned on the reef). v0.9 allows one upload and build-made renditions, and base.md
   forbids a hard-coded video file, so the phone gets a build-made portrait rendition of the same upload
   (`scripts/video-portrait.mjs`, 546×972 at 46 % across), not the landscape m1280 tier, which would be drawn
   ~2.3× enlarged. Frames at 0.5 / 3.4 / 4.8 / 7.5 / 9.8 s against the mockup's: same subjects, all whole, a
   little tighter; the reef pan is gone. Alternative: the phone edit as a `videos[]` row the design plays on
   phones — it would drift from heroVideo when the owner replaces it.
2. **Lane.** base.md hard constraints 14–15 keep the designer out of `dossier/` and `ledger.jsonl`; Shahar's 4g
   list (item 9) and the orchestrator's brief asked for the `dossier.videos[]` entries and the `built` ledger
   line. Done as asked, append only.
3. **v0.9 snippet, two deviations:** the hero `<video>` has no `poster` attribute (it is invisible until it
   plays; with it, phones fetched the landscape poster for nothing), and the level clips put the 864 px AV1
   WebM first for every width (smaller than the m720 MP4 the snippet would give phones).
4. **"Choose this room" from home** lands on the Level step with no level chosen; the hero path keeps the
   mockup's Level 1 preselection (not on Shahar's list; the critic reported it, unscored).

## Not done (not on the list; seen in the r2 reports)

360×640: "Choose this room" under the bar; desktop Dates step: nights below the fold; hero video keeps playing
when scrolled away; the closing split's empty space; the reef frame's title contrast. SEO, JSON-LD, robots,
sitemap and llms.txt are stations 4h/4i.
