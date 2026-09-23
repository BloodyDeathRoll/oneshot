# Layday Surf Ahangama — 4g build, round 1 · "Inside" (unique)

designer 0.3.4 · run `2026-09-ahangama-02` · pick: ledger `mocked → picked`, `agent: "human"`,
2026-09-22T11:33:23Z ("Pick: unique … For 4g: the docked booking box never covers text at any width;
remove the empty screen after the hero; add the capture date to each rating"). Source of the look:
`mockups/unique/dist/index.html`, round 7 (= `agents/designer/gold/layday-surf.html` with the images
inlined; diffed, identical otherwise).

## What this is

One Astro 7.3.3 project, static output, one page (`dist/index.html`) + `robots.txt` + `llms.txt`
(+ `sitemap.xml` only on a non-preview build). Toolchain symlinked from
`spikes/payload/site/node_modules` exactly as KA (no install). Shape copied from
`sites/ka-surf-hostel-and-restaurant/final/`; nothing of KA's look.

| file | job |
|---|---|
| `scripts/seed-from-dossier.mjs` | CMS stand-in until Layday has a tenant: writes `src/tenant/content.json` (schema v0.4 REST shape, `{tenant, locales:{en:<site>}}`) and `src/tenant/media/` from `copy/en.json` + the dossier. `npm run seed`. Throws if a copy block, testimonial or rating date is missing. |
| `scripts/fetch-tenant.mjs` | KA's (= the spike's) fetch step, locales `['en']`; `npm run fetch` / `build:cms`. Never part of `npm run build`. |
| `scripts/photos.mjs` | build step: slots 0–1 centre-cropped 4:3 (the mockup's 1024×768 frames), slots 2+ centre-cropped 4:5 (the mockup's 576×720 crops); widths ≤ the crop, never enlarged; WebP + JPEG; lowercase names → `public/photos/`. |
| `src/pages/index.astro` | the page; every owner-editable value read from `content.json`. |
| `src/styles/site.css` | the mockup's stylesheet verbatim, then a "4g additions" block; every 4g change is commented at the line. |
| `src/scripts/site.js` | the mockup's script verbatim except: the Rosa block (live, KA's mechanics), `CLIMB`, the box's centre after unpin, the wall transform reset, WebGL context-loss handling. |
| `src/lib/site.mjs` | helpers, interface wording, platform names, score/date formatting, preview rule. |
| `wrangler.jsonc` | Worker `layday-surf-ahangama`, `./dist`. **Not deployed.** |

Build: `npm run build` (= `node scripts/photos.mjs && astro build`), clean, 0 warnings.
Preview rule (KA's `IS_PREVIEW`): no `SITE_URL` / `*.workers.dev` / localhost → `robots.txt`
`Disallow: /` for `*` and every named AI crawler, `<meta name="robots" content="noindex, nofollow">`,
no sitemap. This build has no `SITE_URL`, so it is a preview build (checked in `dist/`).

## The three pick notes, as built and measured

### 1. The docked booking box never covers text, at any width

The berth docks at `right:52px; bottom:20px`, 176 × 110 + its 30 px ladder: it owns the strip from the
window's right edge to 228 px in. The mockup's centred 1200 px column only clears that strip from
~1704 px; below that the right-hand column ran under it (critic's `dock-overlap-1440/1525.png`).

- **920 px and up — a reserved lane.** `.sec` and `.foot` give up their right edge to the strip plus a
  24 px gap: `padding-right: clamp(32px, calc(884px − 50%), 252px)` (left edge unchanged). From 1704 px
  it is the mockup's 32 px, i.e. no change. The footer berth block gets `padding-right:252px` below
  1276 px (above that it already clears).
- **768–919 px — the foot bar.** There the lane would leave the 12-column rows too narrow (the three
  check-in times and the 7.5 rem scores overflowed into the berth at 768–880 in the first attempt), so
  the berth takes the mockup's own phone form: the full-width 64 px foot bar. The first screen and the
  page end make room for it, as the mockup does under 768.
- **Under 768 — the mockup's foot bar, unchanged.**

**Measured** (`shots/4g-round-3/dock-sweep-900.txt`, `dock-sweep-heights.txt`,
`dock-sweep-final-recheck.txt`): Playwright, every width from 320 to 2560 in 40 px steps plus 767, 768,
1275, 1276, **1280, 1366, 1525, 1536**, 1703, 1704 (67 widths); three modes — JS (WebGL climb-out,
dock appears once docked), reduced motion (docked from load), JS off (docked from load); the whole page
scrolled in quarter-viewport steps plus the last position; at each step every visible text node's
line boxes (`Range.getClientRects`) tested against the dock's box and its ladder.
- Corner berth (920–2560): **0 overlaps** in all 150 width × mode runs at 900 px tall, and 0 in 63
  more runs at 600 / 740 / 1100 px tall (920, 1024, 1280, 1440, 1525, 1920, 2560). At 1525 × 900:
  35 dock positions, 630 line checks, 0 overlaps (JS); 0 with reduced motion and JS off too.
- Foot bar (320–919): lines scroll behind an edge-to-edge bar exactly as they scroll behind the bottom
  of the screen (45–96 line passes per run), no line is ever cut sideways, and at the page's end
  **0** lines are under it at every width and mode. **This is my reading of "never covers text" for a
  persistent phone control; see "For Shahar" below.**
- Final re-check after the last CSS change: 20 runs, 0 corner overlaps, 0 at page end.

### 2. No empty screen after the hero

The mockup pinned the stage for 90 svh (80 on a phone) after the first screen and ran the climb-out
over 1.2 screens, so for ~0.6 of a screen at 1440 (0.43 at 390) nothing but the flying box was on the
ground (round-7 `desktop-01`, `mobile-01`).
- Pinned run 30 svh (`--climb`), the climb-out over 0.8 of a screen (`CLIMB`), so the page arrives as
  the box docks. Same camera, same phases, same colours.
- After the stage unpins, the box keeps the pinned stage's centre (`ppy = max(s.top,0) + h/2`) instead
  of riding up off the top and dropping into the corner (seen, and rejected, in an in-between build).
- The page's sections are now layered above the canvas (`.sec{z-index:2}`), so on a phone, where the
  box flies down into the foot bar while the lead paragraph rises, the lead passes **over** the box,
  never under it. At 1440 / 1024 / 1525 the flight never touches a line of text (pixel check of the
  box's three yellows inside every text line box, 20 px scroll steps: 0 frames).
- **Measured** (longest scroll run with neither the hero words nor any page text/photo on screen):
  1440 × 900 — mockup 530 px (0.59 screen), build **130 px (0.14)**; 390 × 844 — mockup 360 px (0.43),
  build **80 px (0.09)**. Sheets: `4g-round-4/desktop-01` and `mobile-01` carry the lead paragraph
  where the mockup's carried only the box.

### 3. The capture date on each rating

`ratings[].capturedAt` (schema v0.4) is seeded from `dossier.reviews.<platform>.fetched_at`
(2026-09-19T18:20:00Z for all three → `"2026-09-19"`); the seed throws if one is missing. Printed as
**"read 19 September 2026"** (`readOn()` in `src/lib/site.mjs`, KA's wording):
- hero: after "9.8/10 on Hostelworld, 10 reviews", same line at desktop; its own line on a phone
  (inline, the link broke as "10 / reviews");
- guests row: one line at 14 px under each of the three "Platform, N reviews" lines.
All four are DOM text, present with JS off and under reduced motion. `llms.txt` carries them too
(", read 19 September 2026").

## Deviations from the mockup's look (none other seen)

Compared capture by capture against `mockups/unique/shots/round-7/` (side by side:
`shots/4g-round-4/compare-desktop.png`, `compare-mobile.png`; pixel diffs in round 1 and round 4):
- **First screen at 1440: 0.08 % of pixels differ — the date text only.** On a phone the words sit
  ~27 px higher because the date takes a line.
- Round 1 (pure port + dates + live forecast): desktop captures 01–06 and phone 01–06 identical to the
  mockup (≤ 0.5 %, photo re-encoding), later captures offset by the date line.
- **The 1440 / 1525 column is 132 / 90 px narrower on its right** (pick note 1): headings and
  paragraphs in right-hand columns wrap earlier ("Newly built, and / kept that way", the spot heading
  on three lines), and centred groups (forecast pair, photo rows) sit ~66 px further left.
- 768–919 px: foot bar instead of the corner berth (pick note 1).
- The climb-out is shorter and the page arrives under it (pick note 2); on a phone the rising lead is
  drawn over the last of the flight.
- 768–1007 px: the rows of three 320 px photographs now share the row (max 320 each). In the mockup
  they ran off the window and the page scrolled sideways (measured on the mockup: 104 px at 800,
  64 at 880, 4 at 1000). From 1008 px up nothing changes.
- Hero headline: the mockup's three `<span>` lines became a measure (`h1{max-width:5.9em}`), so an
  owner's heading wraps; the same three lines at every width tested.
- Skip link (off-screen until focused).
- Phone tap targets (below). No visible change: round-4 is byte-identical to round-3 at 1440 and 390.
- Fonts self-hosted (Urbanist variable, fontsource 5.3.0, latin, 27 752 B) instead of Google's four
  static weights; no visible difference in the sheets.

## Tap targets at phone widths

Inline links (`.score a`, quote attributions, `.rate a`, Rosa credit, drawer call) grew by 13 px
vertical padding (does not move lines); block/flex links (`.act .call`, `.maplink`, `.addr a`,
`.bed a`, `.berth .fine a`, `.dock .mcall`) the same padding cancelled by negative margins. Their
border-bottom underline became a 1 px line pinned to the content box's bottom (same pixel row). Audit
(fixed tool, flags either side): **0 of 20 under 44 px** (first run with 12 px: 9 at 42–43 high).

## Rosa forecast (live, KA's mechanics)

One request to `https://rosa-data-opal.vercel.app/data/spots/kabalana.json` when the block is 400 px
from the viewport; with data < 24 h old the headline is drawn in the mockup's form ("0.7–1.0 m",
"Wednesday 23 September, 08:30", "Swell 11.5 s from the south", "Wind 16.2 km/h from the west,
cross-shore", "Rosa, updated …"), and only then does Rosa's iframe get its `src` (markup exactly as
tools.md, `theme=light`, metric). Failure, 10 s timeout, stale, JS off, no IntersectionObserver or
`file://`: the plain link "See today's forecast for Kabalana on Rosa" in the 420 × 500 box; the
headline's 336 × 296 box (350 × 244 on a phone, the mockup's measured sizes) stays reserved, hidden.

Measured with the block **on screen** when the failure lands (`shots/4g-round-3/states/`), JSON routed
to the fixture with a fresh / 30 h `generated_at`, Rosa's widget stubbed at its size — 390, 1440,
1525: success · 404 after 1.5 s · abort after 3 s · hang to the 10 s timeout · stale → **CLS 0 and
identical box positions on every path, 0 third-party requests before the scroll**. Offline (every
non-local request aborted): `fc off`, link visible, fonts and 10/10 images local.

Note: during this session headless Chromium got **HTTP 403** from both `rosa-data-opal.vercel.app` and
`rosa.surf/widget/` (node `fetch` and curl got 200 with `access-control-allow-origin: *`) — Vercel's
bot check, intermittent: the round-1, round-3 and round-4 shoots drew live data and the widget, the
round-2 shoot fell back (and logged the missing-CORS 403 as a console error). Real browsers not tested.

## Other checks

- `node tools/check-design.mjs sites/layday-surf-ahangama/final/dist --no-shots` → **ok**, 0 problems,
  0 warnings; fonts h1/h2/body "Urbanist", ground rgb(232,233,240) = hsl(233 21% 93%), all-caps labels
  0, labelled headings 0/7. *(Run from a scratch copy with only the port changed to 8753 — the tool
  hard-codes 8960 and this session was limited to 8750–8759.)*
- `node tools/check-places.mjs layday-surf-ahangama` → 0 borrowed image uses, 0 failing (no stock used).
- `tools/audit-mockup.mjs layday-surf-ahangama ../final` → `final/audit.json` *(scratch copy, port
  8752 instead of 8980)*: first load **178 278 B / 6 requests** (HTML 56 996 incl. inline CSS + JS,
  font 27 752, images 93 530), JS 0 B as files, **LCP 376 ms**, **CLS 0**, **third-party on load 0**,
  images without alt 0, tap targets under 44: 0 of 20, skip link yes. `no_js.booking_links_reachable`
  reads 0 and `keyboard` n/a because the tool looks for `#book` / `data-open-drawer`, which this page
  (like the mockup) does not have — covered by hand below. Numbers not in the passed copy: "5.0" =
  the Google score 5.0 (copy `ratings[2].score`, printed as Google prints it).
- Keyboard (1440 and 390): Enter on the hero "Check dates" opens the drawer, focus on "Check dates on
  Hostelworld"; six Tabs stay inside (Booking.com, Agoda, Call, Close, Hostelworld, Booking.com); Esc
  closes; focus returns to the button.
- Reduced motion, JS off, no WebGL (getContext stubbed): static box / 2D canvas, 0 page errors
  (`states/*-00.png`, `*-01.png`). JS off: every "Check dates" is a plain Hostelworld link, the dock's
  `<details>` holds the three listings + phone.
- **WebGL context loss (found and fixed here, not in the mockup):** in headless Chromium this build's
  context was lost ~150 ms after load on 5 of 6 loads (`CONTEXT_LOST_WEBGL`), leaving the box blank
  (the mockup, whose script ran later behind Google Fonts, 0 of 6). The script now waits a second for
  the browser to restore the context and otherwise draws the same box on a fresh 2D canvas: 6 of 6
  loads draw the box. First-screen captures in round 3 and 4 are drawn.
- Booking hrefs (raw HTML, i.e. JS off), identical in count to the mockup: 10 Hostelworld, 6
  Booking.com, 3 Agoda, 6 `tel:+94778553343`, 2 Google Maps, 2 rosa.surf — each character-identical to
  the dossier (`booking.engine_url`, `booking.other_engines`, `contact.phone`, `location.map_url`).
- No horizontal overflow at 320, 800, 880, 1000, 1024, 1440, 1525, 1920, 2560 after scrolling the whole
  page.
- Words in the page not in the mockup: "Skip to content", "read" (the rating date). Nothing else.

### Budget (playbook §4, mobile, first load, no scroll; `audit.json` 2026-09-23T05:13:24Z)

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 178 278 B, 6 requests |
| JS, compressed | ≤ 300 KB | inline only: 18 983 B raw / 7 327 B gzip; 0 B as files |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn); largest image on first load 28 408 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family, 1 file, 27 752 B |
| LCP | ≤ 2.5 s | 376 ms |
| CLS | < 0.1 | 0 on load; 0 on every forecast path with the block on screen |
| Third-party requests on load | 0 | 0 |

## Rounds

- **4g-round-1**: pure port + dates + live forecast. Sheets opened against round 7: same page; the date
  lines; live numbers. Found: on a phone the hero rating link broke mid-phrase around the date.
- **4g-round-2**: first cut of notes 1 and 2 + tap targets. Found by looking: the phone page was 20 107
  px tall with nine empty screens at the end — the hero words' transform kept translating after the
  stage unpinned; fixed (transform dropped once the words are hidden). The Rosa JSON was 403'd in this
  shoot. In the in-between sweeps: the box rode up off the top before dropping into the corner (fixed:
  it keeps the pinned centre), and on a phone it flew over the rising lead (fixed: text above canvas).
- **4g-round-3**: the fixes; first shoot's first screen was blank → WebGL context loss found and fixed;
  re-shot. Compared side by side (`compare-*.png`): first screen identical but the date, capture 01 now
  the lead paragraph, everything after offset. States, wide widths (`wide/`), dock sweeps here.
- **4g-round-4**: final, after the 13 px tap padding and the photo-row fix: byte-identical to round 3 at
  1440 and 390; `shoot.json` errors `[]`.

## facts — every fact on the page → dossier key

All words come from `copy/en.json` (passed 4c) or the dossier; the table is the dossier key under each.

| on the page | source |
|---|---|
| Layday Surf Ahangama | `business.name` (copy `businessName`) |
| Surf, chill and feel at home in Ahangama | `business.tagline` (copy `tagline`) |
| A two-minute walk from Kabalana; intro, "One dorm…", "Newly built…", "The room", "Finding the door", "Practicalities" bodies | copy blocks → `copy/sources.md` rows (`location.distance_to_beach`, `business.run_by`, `room_types[]`, `reviews.hostelworld.categories`, `facilities[]`, `location.finding_it`, `stayInfo`, `hours_note`) |
| Bed in the dormitory · One air-conditioned dormitory | `room_types[]` (copy `rooms[0]`) |
| 9.8/10 Hostelworld 10 reviews · 10/10 Booking.com 6 · 5.0/5 Google 15 | `reviews.hostelworld`, `reviews.booking`, `reviews.google` |
| read 19 September 2026 (×4) | `reviews.<platform>.fetched_at` = 2026-09-19T18:20:00Z |
| five quotes, authors, platform, month | `reviews.quotes[]` (copy `testimonials[]`, verbatim) |
| Kabalana: a sandy beach break… The Rock reef… | `location.spot` (copy `spot`) |
| Check in from 14:00 · until 19:00 · out by 14:00; the stay note | `stayInfo` |
| 19 amenity rows | `facilities[]` (copy `amenities[]`) |
| 'Warnagiri' Welhengoda, Ahangama, Sri Lanka | `location.address` |
| +94 77 855 3343 | `contact.phone` |
| Rates move with the season and the dates… | copy offer ¶2 (`gaps[]` offers) |
| Rosa headline and widget | live Rosa data, facts-rule exemption; mapping `kabalana` from `concepts.md` |

## editable — what the owner edits, and where (Payload "My site" form)

Basics: `businessName`, `tagline` (hero), `languages`. Text: the six `copyBlocks` (slot + order place
them: intro → hero headline + lead; about[0] → "One dorm"; about[1] → "Newly built"; offer → "The room",
its second paragraph → drawer + footer berth; info[0] → the door steps, one sentence per ruled line;
info[1] → practicalities). `spot` (wave heading). `stayInfo` (times + note). `amenities[]`. `rooms[]`
(label, beds; `note` is not rendered). Photos: `photos[]` order = slots (0 berth, 1 dorm, 2–3 pair, 4–6
"newly built" row, 7–9 beach row); the build crops and sizes. Contact & booking: `contact.phone`,
`address`, `mapUrl`, `bookingLinks[]` (first = the primary "Check dates"). Deployer-only: `ratings[]`
(incl. `capturedAt`), `testimonials[]`, `forecast` (owner may switch it off). Not editable: layout,
motion, type, colour, interface labels.

## gaps

- `contact.whatsapp` is required by the schema and null in the dossier (not published). The seed
  writes null; the booking path is the OTAs + phone, as at 4e. The deployer's seed will need a decision.
- `season` null → not shown. No coordinates (`location.lat_lng` gap) → no JSON-LD `geo`; no map embed
  (the mockup has none).
- No JSON-LD / Open Graph beyond title + description + canonical-if-`SITE_URL`: station 4h's job.
- No Payload tenant; `content.json` is the seed. Payload's collection is behind schema v0.4 (PLAN §9).

## conflicts

1. **Ledger.** designer `base.md` hard constraint 14 says the designer never writes `ledger.jsonl`;
   this invocation's task told me to append the `picked → built` line. I followed the task (one line,
   append-only). Flagged for Shahar.
2. **"read"** is the one interface word the mockup did not have. The copy has no label for a capture
   date; the schema gives interface wording to the template; KA's shipped build uses the same word. If
   Shahar wants a different word it is one line (`readOn()` in `src/lib/site.mjs`).
3. **Phone foot bar vs "never covers text"** — see pick note 1 and "For Shahar".

## not verified

- A real phone, a real GPU, Safari, Firefox. Headless Chromium only (software GL).
- The Rosa widget and JSON in a real browser today (headless was 403'd intermittently by Vercel).
- Throttled LCP beyond the audit's one run; the climb-out's feel at 60 fps.
- The `build:cms` path against a real Payload tenant (none exists).
- Real screen readers.

## For Shahar

- Under 920 px the booking control is a full-width foot bar (the mockup's phone form, now also 768–919).
  Text scrolls behind it as behind the screen edge; nothing is ever left under it at the end of the
  page. A persistent phone control cannot avoid that without going away; if "never covers text" must
  hold literally on phones too, the bar would have to hide while scrolling, which the playbook's
  "reachable from every screen" forbids. Your call.

## 4g round 2 — pick note 1 under 920 px: "Reserve space" (Shahar, 2026-09-23)

Gate answer: *"Reserve space" — pad the page so no line of text ever sits under the bar at rest;
scrolled text may still pass under it while scrolling.* Applies below 920 px, where the berth is the
mockup's fixed full-width 64 px foot bar. The h1/`.hl`/head changes of 4h are untouched.

**Interpretation applied.** A "rest" is a position the page itself produces or lands on: the top of
the page on load, the very end of the page, any snap point (there are none), any in-page anchor target
(there is one: the skip link's `#main`), anywhere the browser scrolls a control into view for the
visitor (keyboard focus, find-in-page, `scrollIntoView`), and the position the page is left at after
the booking drawer / dock panel closes. At each: no text line under the bar; the page's bottom padding
≥ the bar + a margin; anchor and focus targets land clear of the bar. A free scroll that the visitor
stops mid-page is "scrolling" in Shahar's sense: lines may sit under the bar there, as they sit under
the bottom edge of the screen (see "For Shahar", round 2).

**What changed** (`src/styles/site.css`, one commented block after pick note 1; nothing else):
1. `@media (max-width:919px){ html{scroll-padding-top:var(--top);scroll-padding-bottom:88px} }` —
   anything the browser scrolls into view stops 88 px (bar 64 + 24) above the window's bottom, and
   `#main` lands under the top line, i.e. on the first screen, which is already sized to end where
   the bar starts. Draws nothing.
2. Short windows only, no camera (reduced motion, JS off; `html:not(.fly)`): the stage keeps its floor
   (520 px phone, 560 px 768–919) so on a window shorter than 640 px (phone) / 688 px (768–919) the
   first screen ran past the bar and the hero's last line ("or call +94 …", the "Check dates"
   button) sat under it at the top of the page. There the hero's words rise by exactly that overhang
   (`.wall` bottom = `clamp(40px, 40px + 520px + top + 64px − 100svh, 112px)`; 56/560/160 px at
   768–919; cap 83 px under 360 px so the longest hero stays inside the box), keeping the 40/56 px of
   air above the bar a tall window has. The box is drawn as before. At 640/688 px tall and up nothing
   changes. `shots/4g-round-5/short/compare-short.png` (320 × 568, 390 × 568, 800 × 568, before |
   after). The niche overlaps one hero line at 320–400 px at every height, before and after (the
   mockup's); the lift adds no niche overlap at any width (measured 568/600/620/640/680 tall).
3. The page end already reserved it: `.foot` padding-bottom 96 px = bar + 32 px. Unchanged.

**Measured** (Playwright, scratch `rest.mjs`, copied to `shots/4g-round-5/rest/` with the raw JSONL and
`summary.txt`). Widths 320–900 in 20 px steps + 390, 767, 768, 919 (34); heights 844 (< 768) / 1024
(768–919) and 568; JS (WebGL camera), reduced motion, JS off → 204 runs, before and after. Every
visible text node's line boxes (`Range.getClientRects`) tested against the bar's box; third-party
requests blocked.

| resting position | before | after |
|---|---|---|
| top of the page | 68 / 204 with a line under the bar (all 568 tall, reduced motion / JS off) | **0 / 204** |
| end of the page | 0 / 204; gap last line → bar 34–35 px | **0 / 204**; 34–35 px |
| skip link → `#main` (the only anchor) | 68 / 204 (the lead's first line under the bar, reduced motion / JS off) | **0 / 204** |
| keyboard focus: focused control under the bar | 881 of 3 942 Tab stops | **102 of 3 908** — all the Rosa box's plain link at 568 tall: a 500 px box in a 424 px space; its text lines are clear (e.g. 241–294 vs bar 504) |
| drawer / dock open + close (Esc, Close, outside click; every opener; `<details>` with JS off) moves the page | 0 | **0** |
| focused opener under the bar after close | — | 0 (it is where the keyboard or finger left it, and focus scroll keeps it clear) |
| other lines under the bar after close | depends on where the visitor stood: 390 / 408 at my mid-page dock test position, 118 / 544 at opener positions | same — unchanged, see "For Shahar" |

**Look unchanged.** 920 px and up (1024, 1440, 1525, 1920; JS off, reduced motion, JS at page end):
**0 px differ** full page, 255 / 255 elements with identical box and style (`rest/wide-elements.json`).
Below 920 at 900 px tall (320, 390, 768, 800, 900): 0 px differ, the only computed difference is the
root's `scroll-padding`. `tools/shoot.mjs` before (`4g-round-5/before/`) vs after (`after/`): 0.00 % on
25 of 26 captures; desktop-07 4.08 % is Rosa's live widget, loaded in the after shoot and not in the
before one (crops compared). `npm run build` clean, 0 warnings. `check-design.mjs … --no-shots`
(scratch copy, port 8753): ok, 0 problems, 0 warnings.

**For Shahar (round 2).** Everything the page itself decides now keeps text clear of the bar. What
it cannot decide is where a visitor lifts their thumb: mid-page, a line can be left under the bar,
exactly as a line can be left half off the bottom of the screen, and the drawer closing returns them
to that same spot (it never moves the page). Guaranteeing that literally would need either the page
scrolling in a box that ends above the bar (the camera, the sticky first screen and mobile browsers'
toolbar collapse all key off the window's scroll, so a rewrite of the climb) or scroll snapping line
by line (fights the visitor). Neither is done; say if you want one. Also: on very short windows the
first screen cannot hold the hero above the bar. Measured after the change, top of the page, reduced
motion: clear at 560 px tall and up at every width tested, at 540 except 320 px wide, and at 520 only
from 430 px wide; at 390 px tall (a phone held sideways) 2–3 hero lines stay under the bar at every
width. With the camera (JS on) the bar is hidden at the top until the box docks, so this is reduced
motion / JS off only.

## 4g round 3: reseed from the copy that passed 4c round 3 (2026-09-23)

The input is `copy/en.json` (review.md round 3 PASS) plus the dossier, which now has Google's address, plus code and pin. The design is unchanged.

**What changed**
1. `scripts/seed-from-dossier.mjs`: it stopped on the renamed block ("One dorm, and that is deliberate" became "Just one dorm"), so I updated the order list. There is a new guard: the seed stops if `MAP_PIN` in `src/lib/site.mjs` differs from the dossier's `location.lat_lng` rounded to 5 dp (5.97846, 80.35265: they match). `npm run seed` ran clean. Diff in `content.json`: all six block bodies, one heading, `spot`, `contact.address` → "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka", `languagesSpoken` → `[]`, `rooms[0].beds` removed and `rooms[0].note` changed. Quotes, ratings, links, amenities, stayInfo and photos are unchanged. `contact.mapUrl` was already seeded from the dossier's `location.map_url` (the copy has no mapUrl) and is unchanged. It is the same URL the page has linked since round 1.
2. **Geo:** the schema has no geo field, so the pin cannot come through `content.json` without inventing a field. It stays the `MAP_PIN` constant. Its comment now cites the dossier (`location.lat_lng`, Google listing) instead of candidates.json, and the seed guard above keeps the two in sync. This is still a schema gap.
3. `rooms[].note` is now audited owner copy (review.md row 46), and `beds` is gone. `index.astro` prints the note in the line where beds was, and `llms.txt.js` adds it to the room line. Without this change the bed row would lose its second line.

**Measured**
- `npm run build`: clean, 0 warnings. h1 = "Layday Surf Ahangama" (exactly 1). `.hl` = "A two-minute walk from Kabalana". Title unchanged (54 chars). Description "Surf, chill and feel at home in Ahangama. A two-minute walk from Kabalana. Layday is small and new." (99). JSON-LD PostalAddress {streetAddress "Warnagiri Welhengoda", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"}, geo 5.97846/80.35265, hasMap. `knowsLanguage` is now omitted because `languagesSpoken` is []. The page and llms.txt contain none of the old copy's words.
- `tools/shoot.mjs` → `shots/4g-round-6/`, 12 + 14 captures, errors []. Page heights: desktop 9 334 → 9 162, phone 10 657 → 10 341 (shorter text). I compared the sheets with `4g-round-5/after`. Same page, same order, same first screen. Only the text lengths differ.
- Six widths, before (round-5 + 4h dist) and after, full page, reduced motion (`widths/compare-<w>.png`). Heights: 390 10 340→10 024, 768 9 737→9 382, 1024 9 535→9 219, 1440 9 064→8 892, 1525 9 018→8 847, 1920 8 978→8 773. No horizontal scroll at any width.
- Pick note 1, ≥920 (`dock/dock-sweep.txt`): 18 widths from 920 to 2560 (1275/1276, 1703/1704 included) × JS / reduced / JS off, the whole page in 225 px steps. 1 971 dock positions and 38 322 line checks found **0 overlaps**.
- Pick note 1, <920, reserve space (`rest/`, round-5's `rest.mjs`): 10 widths × 2 heights × 3 modes = 60 runs. Text under the bar at the top of the page: 0. At the end: 0 (gap 34–35 px). At the skip target: 0. Drawer or dock moving the page: 0. Focused control under the bar: only the Rosa box's plain link at 568 tall, the same as round 5. Lines left under the bar after the drawer closes mid-page are the accepted "scrolling" case, as in round 5.
- Pick note 3: "read 19 September 2026" appears 4 times in the HTML, also in llms.txt.
- `check-design.mjs … --no-shots` (a copy of the tool on port 8756, since removed): ok, 0 problems, 0 warnings. `check-places.mjs`: 0 borrowed images, 0 failing.
- `audit-mockup.mjs` (a copy on port 8757, since removed) → `audit.json`: first load 183 271 B / 6 requests, all local. HTML 61 989. Fonts 27 752. Largest image 28 408. JS 0 B as files. LCP 404 ms (this is one run; round 5/4h measured 376–392). CLS 0. Third-party requests on load 0. Tap targets under 44 px: 0 of 20. Alt missing: 0.

**Found, not fixed (outside this task): the Beth quote runs under the two berth photographs at 768–1440 px.** `text-vs-photo/textimg.mjs` tests every text line against every photo. Lines under a photo in the current build: 25 at 768, 30 at 920, 24 at 1024, 17 at 1200, 5 at 1440, 0 from 1525. The new copy did not cause this. The quote is unchanged, and round 5's build (and 4h's) has the same numbers. The mockup already had it at 768–1100 (29 → 10 lines). 4g round 1's right-hand lane (pick note 1) extended it up to 1440. Cause: `.room .pair` holds two fixed 320 px images in a column narrower than 664 px, flex-end, so they overflow left over `.beth`. Tested in a scratch copy: `@media (min-width:768px){ .room .pair img{width:calc((100% - 24px) / 2);max-width:320px} }` (the round-1 `.trio` fix, applied to the pair) gives **0 lines under a photo at all 17 widths from 390 to 1920**. From 1525 up nothing changes, and below that the two photos get narrower. Not applied: waiting for a go-ahead.

**Fixed after the gate (Shahar, via the coordinator, 2026-09-23): Beth's quote under the berth pair.** I applied the approved line to the end of `src/styles/site.css`, with a comment: `@media (min-width:768px){ .room .pair img{width:calc((100% - 24px) / 2);max-width:320px} }`. Build clean, 0 warnings. Evidence is in `shots/4g-round-6/pair-fix/`.
- Lines under a photo, at the 17 widths from 390 to 1920 (1525 included): **0 at every width** (`text-vs-photo/after-fix.txt`). Before the fix: 25 at 768, 24 at 1024, 5 at 1440. No horizontal scroll.
- Pixel diff, full page, JS off and reduced motion, against the pre-fix dist (`pixel-diff.txt`, `pix2.mjs`): **0 px at 390, 1704, 1920, 2560, and from 1620 up** (1620: 0). **Not 0 at 1525–1614**: my earlier "from 1525 nothing changes" was wrong. The pair's cell is narrower than 664 px up to about 1617 px (`cell.mjs`: 638 at 1525, 660 at 1600), so the two photos get narrower there. At 1525 they are about 307 px instead of 320. No text moves. `beth-1440-before-after.png` and `beth-1024-before-after.png` show the change.
- Pick notes still hold:
  - Docked box ≥920: 54 runs, 1971 positions, 0 overlaps.
  - Space reserved <920: 36 runs, 0 at the top of the page, at the end and at the skip target, and the page never moves. The only focused control under the bar is the Rosa box's link, as before.
  - Rating capture dates: 4 in the HTML.
- `check-design`: ok, 0 problems. `shoot.mjs` → `pair-fix/shoot/`, errors [].
