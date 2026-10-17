# Global Surf Lodge Kabalana v2 — final site (station 4g)

designer 0.5.1 · run `2026-10-globalsurf-03` · 2026-10-17 · operator shahar · port of `mockups/unique/` ("From the
air"), picked by Shahar on 2026-10-17: *"all three super high end; unique wins for the extra movement"*. The scroll
set-piece ("the drop") and its motion are kept; the design direction is unchanged.

## Build

```
bash scripts/make-media.sh   # the seed (no Payload tenant before a sale) + every media file
npm run build                # photos step + astro build → dist/ (index.html, book/index.html)
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → portrait hero → photos → build
```

Needs `tools/link-assets.sh global-surf-adventures-v2`, ffmpeg (libx264, libsvtav1, libwebp). `node_modules` links to
`spikes/payload/site/node_modules` (astro 7.3.3, sharp 0.35.4). `wrangler.jsonc` is for station 6; nothing deployed.

| Path | What |
|---|---|
| `src/pages/index.astro`, `src/pages/book/index.astro` | home (with the booking drawer) and `book/` (the URL the drawer pushes; the JS-off booking path) |
| `src/styles/site.css`, `src/scripts/site.js` | the mockup's CSS and JS, inlined as in the mockup; 4g changes are commented |
| `src/lib/site.mjs`, `head.mjs`, `slots.mjs` | content plumbing, shared markup, head pieces, which photo sits where |
| `src/tenant/content.json` | the seed in Payload's REST shape (schema v0.9); `npm run fetch` replaces it after a sale |
| `src/gaps/gaps.json`, `src/lib/labels.json` | SCHEMA GAP content and template wording (from `copy/en.json` mockup_extras) |
| `scripts/*` | `make-media.sh` (`# media:` headers), `seed-from-dossier.mjs`, `photos.mjs`, `video-portrait.mjs`, `fetch-tenant.mjs` (plumbing adapted from `sites/global-surf-adventures/final`, same business) |
| `public/fonts/` | Literata (variable normal + italic) and Parisienne, latin woff2 from Google Fonts, OFL texts |

## What changed against the mockup (all asked for, or forced by 4g)

| Source | Item | Done |
|---|---|---|
| proposal 001 / brief | early-scroll CLS 0.0931 (`article.lv` font swap; `section#lodge.drop` switching to the static view) | fonts self-hosted + preloaded; the drop never switches tier after first paint; its height (pin spacing included) is reserved in CSS from the first frame. **scroll.early.cls 0.0072, settled 0** |
| designer 0.5.1 | set-piece loading state | until all plates are loaded and decoded, the stage shows plate 1 (on its dominant-colour ground) with a loading ring; then the motion takes over with a 0.45 s cross-fade. Plate failure keeps the poster and shows the feature line. Measured on slow 4G after a jump into the drop: page height 14,580 → 14,580 (phone), 13,027 → 13,027 (laptop); ready after 7.0 / 7.9 s |
| critic r2 #3 | plates on first load (1,012 KB) | plates are requested only when the drop is within 1,400 px; first load is 476 KB |
| critic r2 #1, #2, #4 | forecast link < 44 px; non-lazy drawer thumbnail; Google Fonts | 44 px link; every drawer image lazy; fonts self-hosted, 0 third-party requests on load |
| experience r2 #1 | waves band blank on slow 4G | the band's box carries its photograph's dominant colour while it loads (an inline LQ image was tried and refused by check-design's 1200 px rule) |
| experience r2 #2 | cents in the drawer | whole dollars everywhere ("+$140 pp", "$3,212") |
| experience r2 #3 | blurred step at the roof → pool switch; pool/bar double exposure | blur ≤ 2.4 px (was 5) and half the rate; the 026 → 005 cross-fade is 0.80–0.83 of the run (was 0.80–0.87) and the pool is gone once the bar is in |
| experience r2 #4, visual r2 #3 | phone stage 4:5 with white bands | the phone stage fills the space between the header and the bottom bar (`100svh − 142px`) |
| experience r2 #5 | JS off: level clips showed native controls | each card's poster is an `<img>`; the `<video>` is not shown without JS (nor the hero's) |
| visual r2 #1 | dull Level 1 lead; soft drawer header | Level 1 is now vid-010 11.8–16.4 s (a sunlit beach lesson: pop-up practice on soft-tops, a guest laughing with her board, the group walking to the water); the drawer band plays the clip's 864 px rendition at ≤ 820 px (no upscale) |
| visual r2 #2 | two script titles in the drawer | step titles are Literata 500, 20 px; only "Book your week" is script |
| visual r2 #3 | level buttons misaligned on the 7/5 grid | on desktop Level 1's media fills its column; its button sits on Level 3's line |
| concepts.md C3 | real `/book/` URL | the drawer pushes `book/`; back closes it; `book/` is the same form as a page (with `?level=` / `?room=` preselection); with JS off every "Book"/"Choose" link goes there |
| schema v0.9 | video from content | hero = `heroVideo` (one 1920×1080 upload, cut to start on the poster frame so the loop seam is a continuous cut), build renditions + the 668×1080 phone crop (the mockup's `hero-p668`); level clips = `videos[0–2]` |

Visible differences in `tools/shoot.mjs` sheets against the mockup re-shot today (both over http): page height 13,030 vs
13,091 (desktop) and 14,580 vs 14,419 (phone: taller drop stage, all nine quotes in the slideshow). Otherwise the same
sections, order, type and colour; the items above are the only intended changes. Small content-driven differences: the
levels lede uses the copy's sentence verbatim (the mockup appended ", from a Saturday"), the amenities line includes
"Non-smoking rooms" (in `amenities[]`), and the guests slideshow shows all nine testimonials (the mockup showed six).

## Performance (`tools/audit-mockup.mjs`, throttled phone 390×844, no scroll) — `audit.json`

| Item | Target | Measured |
|---|---|---|
| First-load transfer, video excluded | ≤ 1.5 MB | 476 KB (HTML 98 KB, fonts 83 KB, images 295 KB); 1,195 KB with the phone hero video the audit's 3.5 s wait catches |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | phone 668×1080: 0.72 MB webm / 1.20 MB mp4 · desktop 1920: 1.63 MB webm / 2.93 MB mp4 · 7.0 s |
| JS, compressed | ≤ 300 KB | 7.7 KB gzip (21 KB raw), inline, no library (the drop needs none) |
| Largest above-the-fold image | ≤ 300 KB | phone poster 34 KB; desktop poster 87 KB (largest image on load 88 KB) |
| Fonts | ≤ 2 families, ≤ 150 KB | Literata + Parisienne, 83 KB, self-hosted |
| LCP | ≤ 2.5 s | 452 ms |
| CLS (load) | < 0.1 | 0.0061 (hero title on font swap) |
| Scroll CLS early / settled | < 0.01 | 0.0072 / 0 |
| Third-party requests on load | 0 | 0 |

Embeds: one (Rosa), lazy. Forecast block height unchanged when the reading arrives (1452 → 1452 px at 1440, 1673 →
1673 at 390): the headline and the plain link share one grid cell with a hidden ghost of Rosa's widest wording.

## Checks

- `check-design` home and `book/`: 0 problems, 0 warnings (h1 Literata, h2 Parisienne, ground #FFFFFF).
- `check-places`: ok (0 borrowed images).
- Booking, 390 and 1440, engine intercepted: "Choose Level 2" → drawer, URL `/book/`, focus on "Close booking", Level 2
  checked; Twin + 1 man → "+$140 pp", "$3,212"; Esc closes, URL back to `/`, focus to "Choose Level 2"; browser back
  closes it; hand-off `…/level-2-rollers?start=2026-10-24&end=2026-10-31&female=1&male=1&couple=0`.
- `book/?level=level-3-riders&room=double`: Level 3 + double preselected, "5 coached surf sessions of 2 hours", action
  `…/level-3-riders`, $1,884.
- JS off (390, 1440): hero CTA → `book/`; "Continue booking: Level 2" → `…/level-2-rollers?start=2026-10-24&duration=8&female=1&male=0&couple=0`
  (`duration` = the engine's documented stay length); no video element shown; drawer copy hidden on home; forecast shows the plain link.
- Reduced motion (390, 1440): 0 video requests over a full scroll; the static two-up + img-005 with the feature line.
- Offline except the local server: the forecast stays the plain link, no frame; no broken image after opening the drawer.
- Keyboard (1440, 70 Tab stops): skip link first, 0 hidden stops, every stop ringed; menu sheet and drawer trap focus
  and return it (mockup code, re-checked above for the drawer).
- `tools/funnel.mjs`: hero action engine, 1 tap to the flow (`book/`), 8 pages, 0 broken; audit tap targets < 44 px: 0.
- Facts: audit finds 29 numbers, 0 not in the passed copy.

## Facts (every checkable claim → field → dossier)

| Claim | Field | Dossier |
|---|---|---|
| From $1,466 pp, 7 nights; Level 1/2/3 names | lessons[] | offers[0–2] (28 Sep 2026) |
| Freestylers – B&B only, from 4 nights | lessons[3] | offers[3] |
| 8.6, Booking.com, 80 reviews, 28 Sep 2026 | ratings[0] | reviews.booking |
| Staff 9.5, Facilities 9.2, Cleanliness 9.2 | gap (details) | reviews.booking.categories |
| inclusions list, airport pickup from $220 pp | gap (inclusions) | offers includes / package_items_engine |
| twelve rooms; amenities | copyBlocks, amenities[] | business.staying_with_us, facilities |
| room lines, details, +$140 / +$80 / +$418 pp, sample 20–27 Feb 2027 | gap (rooms) | rooms_engine (29 Sep 2026) |
| every room: AC, fan, safe, toilet and shower, board rack | gap (details) | business.staying_with_us |
| 40 % deposit, 45 days; up to 6 guests; Saturdays 7/14/21/28 nights | labels (copy) | booking.deposit_terms, offers |
| The Rock and South Point | spot | location.spot.value |
| 40 m, 350 m, 400 m, 4 km, 3.9 km; address; check-in 14:00–20:00, out by 11:00 | copyBlocks, contact, stayInfo | location, contact, stayInfo |
| quotes and sources (globalsurf.com for two) | testimonials[], gap (otherSources) | reviews.quotes[].source_url |
| WhatsApp +972523593240, tel +97299733943, info@globalsurf.com, map | bookingLinks, contact | booking.whatsapp, contact |
| Saturdays offered | gap (snapshot) | docs/bookinglayer.md §2.1 |
| forecast numbers | — | Rosa live (playbook §4 exception), labelled "Forecast for South Point by Rosa" |

## editable (owner, after a CMS sale)

Basics: business name, tagline (description), closing, featureLine (the drop's line). Text: copyBlocks (levels lede,
"Surf, breakfast, surf again", "Twelve rooms" lede + details, Getting here). Photos & video: photos[0–2] the drop's
plates, [3] waves band, [4] breakfast, [5] guests, [6] dinner, [7–9] lodge slideshow, [10] Freestylers + IG, [11–15]
Instagram (`src/lib/slots.mjs`); heroVideo + poster; videos[0–2] the level cards and the drawer band. Lessons: names
and prices. Stay: check-in/out, note. Amenities. Reviews: ratings, testimonials. Surf: spot, forecast on/off. Contact
& booking: phone, email, address, map, WhatsApp, booking links. Not editable (gap): room galleries and supplements,
inclusions, one-liners, hero title, logo, socials, snapshot dates.

## images

All business-owned (dossier). Photos: img-062, 026, 005 (plates), 099, 011, 129, 093, 036, 075, 077, 016, 024, 090,
055, 087, 118; rooms (gap): 063, 078, 095, 042, 050, 064 · 080, 084, 083, 069, 079 · 081, 082, 041, 043, 044, 071. Alt
text: the mockup's (written from the photographs), else the dossier description. Video masters from vid-009, vid-010,
vid-003, vid-002 (`scripts/make-media.sh`). No stock.

## gaps

As in the mockup: no season or daily times; level clips illustrate the level, never captioned as the lodge's wave;
WhatsApp/phone are the HQ's; Freestylers has no engine dates (WhatsApp); no Instagram posts harvested (own photos as
tiles); Saturdays are the 29 Sep 2026 snapshot, past ones dropped at build and at runtime. Schema gaps: `gaps.json`.

## conflicts

1. **Drop alignment vs owner-editable plates.** The descent aligns the pools of img-062 and img-026 by source pixels
   (`ALIGN` in `index.astro`). An owner who replaces a plate keeps the motion, aligned on the centre instead. The
   alternative (a schema field for a focal point) does not exist; `media.focalX/Y` is "unused in v0.1".
2. **No vendored library.** The brief says vendored libraries; the picked mockup has none since its round 2.2 (sticky
   stage, own JS), so 4g ships none: 7.7 KB gzip of JS in total.
3. **Hero master rotated.** The mockup seeked the loop to 1.35 s; an owner's upload cannot carry a seek, so the master
   starts on that frame (vid-009 3.05 s) and ends on the rise into it. Same first frame and order; the loop seam is
   now continuous.
4. **Lane.** base.md hard constraint 14 keeps the designer out of `ledger.jsonl`; the orchestrator's brief asks for the
   `picked → built` line. Done as asked, append only.
5. **Load CLS 0.0061** from the hero title's font swap remains (fallback metric overrides were tried and dropped: no
   Georgia on the test machine to measure against, so the values would have been guesses).

## Not done

SEO, JSON-LD, robots, sitemap, llms.txt (stations 4h/4i). No live Bookinglayer calendar (the mockup had none; the
snapshot is the fallback the playbook allows).
