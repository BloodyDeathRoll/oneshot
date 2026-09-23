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
