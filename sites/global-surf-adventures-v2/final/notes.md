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
| First-load transfer, video excluded | ≤ 1.5 MB | 466 KB (HTML 114 KB, fonts 83 KB, images 281 KB), station 5 r1 fix pass |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | phone 1080×1746 (from the 668×1080 crop): 1.40 MB webm / 1.90 MB mp4 · desktop 1920: 1.63 MB webm / 2.93 MB mp4 · 7.0 s |
| JS, compressed | ≤ 300 KB | 7.7 KB gzip (21 KB raw), inline, no library (the drop needs none) |
| Largest above-the-fold image | ≤ 300 KB | phone poster 62 KB (1080 w); desktop poster 87 KB (largest image on load 88 KB) |
| Fonts | ≤ 2 families, ≤ 150 KB | Literata + Parisienne, 83 KB, self-hosted |
| LCP | ≤ 2.5 s | 468 ms |
| CLS (load) | < 0.1 | 0.0069 (hero title and subtitle on font swap) |
| Scroll CLS early / settled | < 0.01 | 0.0069 / 0 |
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

## Fix pass after station 5 round 1 (2026-10-17; critic 72.9/80, visual 8.5, experience 8 — passed 92.9/100)

Design direction unchanged. Each must-fix, what was done, and how it was checked (local static server, playwright).

| Report | Item | Done |
|---|---|---|
| experience 1, Shahar's rule | the drop must always play in full | plates (with a small poster first) are requested as soon as the levels come into view (`#levels` 10 % inside the viewport), not at 1,400 px; never on first load (audit: 17 requests, no plate). When the plates become ready with the reader already inside the run, the whole sequence is mapped onto the remaining scroll from p 0 (`p0` remap); the remap is dropped when the reader is back above the block. Checked: plates held back until the reader is at raw 0.40 → state at ready is p 0 (plate 1 untransformed), plate 3 in by raw 0.9, the full sequence plays by raw 1.0; back above → no remap. Slow phone (1.6 Mbps / 150 ms / 4× CPU), 0.3 screen every 0.4 s from the hero: poster requested at 3.7 s, plates at 4.2 s, all ready before the run enters the screen (10.1 s), so the descent plays from p 0 (before: ready 5.7 s after arrival, already on the palm) |
| experience 2 | loading still | the stage's ground from first paint is plate 1's own blurred still, inline (1200 px wide, blur 30, 4.7 KB WebP; 1200 px so check-design's full-bleed rule holds for it as for any image); a sharp poster cut as the stage frames plate 1 at p 0 (phone 624×1123 AVIF 31 KB, desktop 1400 AVIF 56 KB) fades in only once decoded, so it is never seen half-painted; the old lazy 2000 px poster is gone. Desktop's inset frame is set in CSS before the motion starts, so nothing jumps at the hand-over |
| experience 3, brief | the dive ends on open water | both focal points now mark the same spot of open pool water (img-062 38.38 / 59.92, img-026 35.0 / 61.44; `seed-from-dossier.mjs` FOCAL and `content.json`). The plate-2 mask was the last per-photo coordinate in code (`42.3% 54.8%` in CSS): it now reads `--fx / --fy` from plate 2's focal point. The two-up crop of plate 1 uses its focal point (`focal: true`) instead of fixed `fx/fy`. Hand-off measured over 41 steps: focal points on the same screen point, error ≤ 0.01 px at 390 and ≤ 0.03 px at 1440; the dive (p 0.57–0.80) ends on blue water with the swimmers and boards, the palm at the edge |
| visual 1 | phone hero soft | `video-portrait.mjs` recipe p2: the 668×1080 crop is enlarged once with lanczos + light unsharp to 1080×1746 and encoded near the cap (webm AV1 1.40 MB, mp4 1.90 MB; was 0.72 / 1.20 MB), poster 1080 w WebP 62 KB. Source is 1080 px tall, so no more native pixels exist |
| visual 2 | Level 1 lead dull | `videos[0]` is now vid-010 19.80–22.40 s (golden hour: a guest stands up on a soft-top into the sun, then another paddles in smiling), poster at 0.5 s |
| visual 3 | hero dissolve | the ghosting was the poster's 0.6 s CSS fade over the video while the edit cut at 0.12 s; the fade is gone (the poster is frame 0, so the video replaces it invisibly) and the edit's first change is a hard cut. Opacity measured 0 → 1 in one step |
| visual 4, critic d5 | /book/ | the hand-off/deposit note once (in the summary card); one name per room everywhere — the copy's label in sentence case ("Shared twin room – 2 beds"), the tab its part before " – "; at 390 every level and room name is on one line (price under the words) |
| visual 5 | header band; seam | the header is solid white once half the hero is gone, no colour transition, so no half-way band; the drop run sits straight on "What's included"'s tint (no 110 px white margin) |
| critic d6 | room-tab contrast | inactive tabs `--ink-soft` (≈ 5.9:1); axe after a full scroll: 0 violations at 390 and 1440 |
| critic d3 | JS-off sends `end` | without JS the nights choice is hidden and the visitor picks a check-out Saturday; the GET form sends `start` + `end` (no `duration`): `…/level-2-rollers?start=2026-10-24&end=2026-11-07&female=1&male=0&couple=0`. With JS unchanged (`…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=1&couple=0`, total $3,212) |
| critic d4 | what + where on the first screen | the copy's own short subtitle (`mockup_extras.hero.subtitle_alt`, "Sri Lanka's south coast, all levels") under the title. **Rating not added:** Shahar's hero bar (references.md calibration: "No rating in the hero. No tagline + rating + button stack over the video"; custom.md: only header, one short title, one short CTA). The 8.6 proof stays one scroll down |
| experience 5 | drawer thumbnails | 120×88 on desktop, 112×84 on phones (were 84×62) |
| experience 4 | "What's included" on phones | layout only, same words: two columns of short lines under a 16:10 photograph |
| found in this pass | phone page 8 px too wide | the nine review dots (9 × 44 px) were wider than a 390 phone (layout viewport 398); they now wrap. scrollWidth 390 |

Measured after the pass (`audit.json`, throttled phone, no scroll): first load 466 KB (HTML 114 KB with the inline still, fonts 83 KB, images 281 KB), largest image 88 KB, LCP 468 ms, CLS 0.0069, **scroll CLS early 0.0069 / settled 0**, 0 third-party, tap targets < 44 px 0, JS 0 files (inline). check-design home + book/: 0 problems, 0 warnings. check-places: ok. Reduced motion and JS off: 0 video and 0 plate requests over a full scroll, static drop shown.

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

1. **Drop alignment — resolved 2026-10-17 (Shahar: "it cannot rely on absolute pixels").** The plates line up on each
   photo's focal point (schema v0.10: media `focalX` / `focalY`, set in the CMS by clicking the photo; seeded for
   img-062 38.38 / 59.92 and img-026 35.0 / 61.44, the same spot of open pool water, since station 5 r1). The descent
   dives into plate 2's focal point; the plate-2 mask is centred on it too. The zoom between
   plates (200 / 1510) stays a design constant. The trigger was never pixel-based: progress is measured on the block
   (`getBoundingClientRect`) on every scroll, starting when the block fills the screen (kept, Shahar).
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
