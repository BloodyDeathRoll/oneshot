# The Sandhya: critic scorecards

Run `2026-11-ahangama-01`, operator alon, `mode: test`. Critic 0.4.3, rubric 0.3.2. Dimension 8 belongs to `visual-critic` and `experience-critic`; their reports were not read before this was written.

# Round 1, quick mode (station 4f), 2026-11-06

Build reviewed: commit `23f14bf`, unchanged through the review (`git status` shows no change to any mockup). Pages served over http from a plain static server on port 8771, except where `tools/audit-mockup.mjs` and `tools/check-design.mjs` start their own.

## Result

| Variant | Dimensions 1-7 | Hard fails | Gates 1, 3, 7 at 6 or above | Total out of 100 |
|---|---|---|---|---|
| calm | **68.2 / 80** | none | yes (9, 9, 9) | waits for dimension 8 |
| interactive | **69.2 / 80** | none | yes (9, 8, 9) | waits for dimension 8 |
| unique | **57.9 / 80** | none | yes (8, 6, 9), dimension 3 at the floor | waits for dimension 8 |

The one sentence the human needs, as facts:

- **calm:** every room is one tap from the engine, and on a throttled phone the hero photograph's bytes finish at about 2.7 s while the measured LCP (336 ms) is the title.
- **interactive:** the room path is two taps through an in-page sheet, the copy is 132 of 132 sentences verbatim, and axe finds no violations.
- **unique:** after a fast swipe through the rooms the phone's booking button shows two or three labels stacked and unreadable, still stacked at the end of the page in every scripted run, and its dusk frames are re-grades of a daytime photograph.

## Decisions recorded, not scored as defects

- Positioning as a beachfront boutique hotel, no printed nightly rate, 2 testimonials, no usable video: operator decisions, no deduction.
- **No date picker: this departs from `agents/designer/custom.md`** ("pick dates" inside the site), in all three. It goes to the operator at the pick. **How it was scored:** no deduction in dimension 3, because that dimension measures the hand-off and audit recommendation 4 forbids dates that are not sent. **Minus 1 in dimension 4 on all three,** because that dimension measures the match to `custom.md`. It costs 0.5 of 80 on each and changes no ranking.
- `custom.md` also asks for an Instagram feed. All three have a button only, because no post could be read (`concepts.md`). No deduction: a feed would need content the dossier does not hold.
- Google Fonts on first load: expected at 4e (`agents/critic/tools.md`), so not counted as the rubric's third-party hard fail. It becomes one at full mode. All three load 2 font hosts and nothing else.

## Scorecards

```
mode: quick    round: 1    variant: calm
total: 68.2 / 80 (dimension 8 pending)    result: passes the critic's gates    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table below: 0 mismatches, 0 unsourced. Points off for the flagged rows, which the page shows as the copy gives them: Kayak read through a digest, Suite bed and size rulings, img-167's room not stated, staff photographs img-141 to 143 awaiting the owner |
| 2 | mobile + performance | 8 | Every budget line met (table below). No overflow at 320 to 1920 px. Hero image bytes finish at 2,681 to 2,702 ms in 3 runs, and LCP records only the H1, so the budget's LCP line does not cover the picture here |
| 3 | booking CTA | 9 | Hero, bar and 4 room links tapped on a phone: each lands on the dossier URL, 1 tap. Point off because `?rid=` and the engine's own steps are unverified (same on all three) |
| 4 | brand fit | 8 | Hierarchy present. Minus 1 date picker. Minus 1 order: Arrival comes before the rooms, so the first room button first enters the view between 1,691 and 2,255 px on a phone, where the other two reach rooms within about one screen |
| 5 | copy | 8 | 129 of 132 sentences verbatim. Rooms ¶3 is cut into an icon list (3 sentences reworded by structure, facts unchanged, copyeditor has not seen this form) |
| 6 | accessibility | 8 | axe, phone: 1 moderate (`region`, `#bar`). Desktop: `region` plus a `color-contrast` serious on `.feature` at 1.59, a false reading of the element's own background; pixels behind that text measure 4.4 minimum, 4.7 median, white on 42 px script, above the 3:1 for large text. Skip link present, 66 keyboard stops, all with a focus style, no trap, 0 animations under reduced motion. 22 dots are 34x44 px. "Details of the furniture" takes focus without scrolling into view (y 1,153 of 900) |
| 7 | delivery | 9 | No server code, no external scripts, no CMS call, relative URLs, lowercase names, no secrets strings. Full visit: only localhost and the font hosts, no 4xx, no console errors. Fonts must be self-hosted at 4g |

```
mode: quick    round: 1    variant: interactive
total: 69.2 / 80 (dimension 8 pending)    result: passes the critic's gates    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table below: 0 mismatches, 0 unsourced. Same flagged rows, without the staff photographs |
| 2 | mobile + performance | 9 | Every budget line met. LCP is the hero photograph at 2,020 to 2,056 ms in 3 runs, 2,024 in the audit. No overflow at 320 to 1920 px. Scroll CLS 0 and 0 |
| 3 | booking CTA | 8 | Hero and bar: 1 tap to the dossier URL. Rooms: tile then sheet link, 2 taps, each landing on its dossier `?rid=` on phone and desktop. The sheet's link sits inside the view at 390x844 and 390x664. JS off, `#room-suite` lands on the room with its link visible. `?rid=` unverified |
| 4 | brand fit | 8 | Ratings directly under the first screen, rooms next, order closest to playbook §3. Minus 1 date picker. Minus 1 the title is on a card at lower left, against `custom.md`'s centred title (a departure `concepts.md` reports) |
| 5 | copy | 9 | 132 of 132 sentences verbatim. Template labels only: "At the house", "Guests", "Call", "Map", "Email", "Instagram" |
| 6 | accessibility | 8 | axe: 0 violations on phone and desktop (2 contrast and 1 role check left incomplete by axe). Sheet by keyboard: focus goes to Close, 25 Tabs stay inside, Esc closes and focus returns to the tile. Reduced motion: canvases `display:none`, 0 running animations. All 28 stops have a focus style and are in view. 10 dots are 16x44 or 32x44 px and are `aria-hidden`, so a phone user has small targets and swipe. No element labelled as a skip link: the first stop is the logo, which links to `#main` |
| 7 | delivery | 9 | As calm. `?noguard` test switch is in the page, to be removed at 4g (`notes.md` says so) |

```
mode: quick    round: 1    variant: unique
total: 57.9 / 80 (dimension 8 pending)    result: passes the critic's gates    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Facts table below: 0 mismatches, 0 unsourced in the words. Same flagged rows, and img-167 leads the Studio Twin gallery. Further point off: the hero and the set-piece show this building in a light no camera recorded. See "Image policy" below |
| 2 | mobile + performance | 6 | Every budget line met, but the rubric's "no overlap or unreadable text at 390 px" fails on the bar (dimension 3 row). LCP 1,860 to 2,372 ms in 3 runs, 2,332 in the audit. 31 requests on first load against 11 and 13. Scroll CLS 0.0043 early (`h1`), 0 settled, under the 0.01 limit. CTA bottom at 573 px on a 320x568 window, 5 px below the fold |
| 3 | booking CTA | 6 | Hero, bar and 4 room links all land on the dossier URL. Room links: 1 tap on a phone, and 1 on desktop since the links stay visible in closed rows. **But the persistent button's label breaks:** a touch scroll gesture through the rooms at 2,400 or 4,000 px/s leaves 2 or 3 `.t` labels at opacity 1 in one grid cell, unreadable, in 3 of 4 fast runs with 2 labels and 1 with 3. At 600 and 1,200 px/s it stays clean. Scripted jumps 60 to 400 ms apart leave the same stack, and it is still there at the end of the page. The href stays correct. Cause: `src/page.js` lines 56-64 remove only the first `.t` after 260 ms, so a second change inside that time leaves the middle label behind |
| 4 | brand fit | 8 | Rooms directly after the first screen, on brief for the bold variant. Minus 1 date picker. Minus 1: the phone and email are not printed anywhere (Call and Email buttons only, which a desktop without a dialler cannot use for the number), against the contact block in playbook §3 and the other two pages |
| 5 | copy | 8 | 129 of 132 sentences verbatim. Rooms ¶3 as a list (as calm), and the booking section joins the breakfast and rates sentences in one paragraph. Template label "Services" |
| 6 | accessibility | 7 | axe, phone: **serious** `scrollable-region-focusable` on 4 `.strip` (`tabindex="-1"`), and moderate `region`. Desktop: moderate `region`. 0 targets under 44 px, the only page with none. Panel by keyboard: Enter opens, Esc closes, focus returns, no trap. All 34 stops have a focus style. Reduced motion: canvas at opacity 0, no pin, 0 running animations. Against that: no skip link, `<h3>` inside `<button>` 4 times, `.grow` does nothing on a phone though it is announced as an expandable button (`page.js` line 36), and a stacked bar label makes the link's accessible name run together |
| 7 | delivery | 9 | As calm |

## Facts table (the same copy on all three; exceptions named)

Each row was checked by script against `dossier.json` or against the page text. `audit.json` `facts`: the only number not in the copy is `3,500`, the copy's `3500` formatted.

| Claim on the page | Dossier key | Result |
|---|---|---|
| The Sandhya, adults-only beachfront boutique hotel, Kabalana Beach, Ahangama, Sri Lanka | `business.name`, `.description`, `location.spot` | match |
| Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka | `location.address` | match, exact |
| `tel:+94765700007`, `mailto:reservations@thesandhya.com` | `contact.phone`, `.email` | match, exact |
| Engine URL and 4 `?rid=` links | `booking.engine_url`, `.engine_room_links` | match, exact; `?rid=` behaviour unverified in the dossier too |
| Map, Instagram, Trip.com, Kayak links | `location.map_url`, `contact.socials`, `reviews.*.source_url` | match, exact |
| 9.7/10, Trip.com, 56 reviews, read 2026-11-06 | `reviews.trip` | match |
| 9.4/10, Kayak, 159 reviews, read 2026-11-06 | `reviews.kayak` | match, **flag:** `via_digest`; `copy/review.md` line 286 asks a person to read it before go-live |
| 2 testimonials, Guest User, Trip.com, June and February 2026 | `reviews.quotes` | match, string-equal, typos kept |
| 9 rooms | `room_count` | match |
| Studio King, Studio Twin: 38 sq m, beds, floors, 3.5 m glass | `room_types[0,1]` | match |
| Studio+ King: 40 to 43 sq m | `room_types[2]`, `contradictions.room_size` | match, both sides in the range |
| Director's Suite: about 75 sq m | `room_types[3].sqm` 76, `contradictions.room_size` 75 | match by "about", **flag** |
| Director's Suite: King bed | `room_types[3].beds` "Super King bed", `contradictions.suite_bed` | **flag:** a disclosed contradiction with a side taken (`copy/review.md` line 155), not counted as a mismatch; owner item |
| Sleeps 2 | `room_types[].sleeps` | match |
| 500 thread count, Spa Ceylon, lavender, 55-inch TV | `room_types[]`, `owner_copy` | match |
| Check-in from 14:00, check-out to 12:00, and the note on other sites | `stayInfo`, `contradictions.check_in`, `.age_policy` | match; the contradiction is shown |
| Continental breakfast for two adults | `dining.breakfast` | match |
| Front desk 24 hours | `hours_note` | match |
| US$3,500, "from", "++", as of 2026-11-06 | `offers[0]` | match |
| Opened 2017, renovated 2023 | `business.since` | match |
| Wallpaper* quote | `press[0]` | match, exact substring |
| Chef Christophe DuBois; zero-food waste, single-use plastic, water recycling, beach turtles | `dining.menu_designer`, `sustainability` | match |
| Galle Fort 25 minutes, UNESCO, nearby beaches, parks, station 1.4 km | `location.nearby`, `owner_copy` | match |
| Room photographs under each room | `images[].found_on` | match against the room pages, except **img-167** (engine only, description names no room), shown under Studio Twin on all three |
| All photographs business-owned, none from `concepts.md`'s never-used list | `images[].license` | match: calm 44, unique 40, interactive 38 by file name, plus hero, feature, arrival, map and tiles, whose sources are named by `notes.md` and were not hashed |
| Staff img-141 to 143 (calm only) | dossier note "confirm with the owner before leading" | small prints, not leading, unnamed; **flag for the owner** |

### Image policy: for the operator

Unique's hero (`hour-slice`) and set-piece (`hour-dusk`) are re-grades of img-152: sky through a gradient map, panes lit gold, foliage to silhouette. PLAN.md §9 says "Generated imagery: still no". `concepts.md` argues that no sky is replaced and no pixel is invented, and the real building is shown lit at dusk in img-027 and img-154. §9 does not say whether a heavy re-grade of the business's own photograph counts. **It is not scored as a hard fail, because the rubric does not rule on it, and it costs 1 point in dimension 1.** The first-screen alt text says the picture moves through a day. No visible text says so, and the all-dusk frame carries an empty alt, so a visitor could take that frame for a photograph.

## Budget, mobile home page

Measured by `tools/audit-mockup.mjs`, this review's own run, on a machine shared with other sessions. Files: `critic-evidence/the-sandhya-r1/<variant>.audit.json`.

| Item | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | 574 KB | 640 KB | 769 KB |
| Requests | | 11 | 13 | 31 |
| JS, gzip (all inline) | ≤ 300 KB | 2.0 KB | 6.1 KB | 8.2 KB |
| Largest image | ≤ 300 KB | 149 KB | 173 KB | 89 KB |
| Hero image on a phone | | 106 KB | 67 KB | 68 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 69 KB | 2, 34 KB | 2, 91 KB |
| LCP | ≤ 2.5 s | 336 ms, the H1 | 2,024 ms, photograph | 2,332 ms, photograph |
| CLS | < 0.1 | 0.0007 | 0 | 0.0006 |
| Scroll CLS, early and settled | < 0.01 | 0, 0 | 0, 0 | 0.0043, 0 |
| Third-party hosts on load | 0 (fonts allowed at 4e) | 2, fonts | 2, fonts | 2, fonts |
| Hero video | | none exists | none exists | none exists |

The tool's `bytes_js` reads 0 because all JS is inline; the JS row is measured from the HTML. Calm's LCP records no image entry in any of 3 runs. Its hero fills the viewport, and Chromium's LCP is known to skip full-viewport images, which is the likely reason but was not proved here. So calm's number and the other two are not the same measure. Desktop first load, outside the budget: calm 620 KB, interactive 850 KB, unique 2.0 MB.

## Tap-through log

Engine and other external pages were intercepted and stubbed, and the URL recorded. **The engine itself was never loaded.**

| Action, phone 390x844 | calm | interactive | unique |
|---|---|---|---|
| Hero link | engine, 1 tap | engine, 1 tap | engine, 1 tap |
| Studio King | `?rid=53570`, 1 | `?rid=53570`, 2 | `?rid=53570`, 1 |
| Studio Twin | `?rid=53586`, 1 | `?rid=53586`, 2 | `?rid=53586`, 1 |
| Studio+ King | `?rid=53587`, 1 | `?rid=53587`, 2 | `?rid=53587`, 1 |
| Director's Suite | `?rid=53603`, 1 | `?rid=53603`, 2 | `?rid=53603`, 1 |
| Call in the bar | `tel:+94765700007`, 54x54 | same, 52x52 | same, 52x52 |
| Booking action in view, 30 scroll samples | 30 of 30 | 30 of 30 | 30 of 30 |
| Booking buttons on the first screen | 1 | 1 | 1 |
| JS off: engine links visible | 7 | 7 | 7 |
| Images and fonts never answered: link in the DOM, topmost | 74 ms, yes | 71 ms, yes | 78 ms, yes |

On desktop the same room links land on the same URLs, with 2 clicks on interactive. Unique's desktop links answer after opening the panel (2 clicks); with the row closed the link is visible on all four and answered on the one tried, Studio King (1 click). The target is `clicks_to_book` 1 and primary action `engine` (`audit.json.recommended`): all three heroes meet it. `tools/funnel.mjs` is full-mode only and was not run.

## Against the current site

Visual judgement belongs to the two visual critics. On measured lines all three beat it:

| | Current site (dossier, audit) | calm, interactive, unique |
|---|---|---|
| First load, phone | 17.5 MB | 574, 640, 769 KB |
| Booking action | RESERVE, 70x30 px, script-driven, answers about 52 s after opening on slow 4G | real link, 52 to 56 px tall on a phone, in the DOM by about 75 ms |
| First screen says | a dictionary entry and "Adults Only Hideaway", no "hotel" | what and where in the `h1` |
| Ratings, stay facts, map link | none on any of 10 pages | all present |
| Room choice passed to the engine | no | a `?rid=` per room, unverified |

## `tools/check-design.mjs`, facts for the human

All three: 0 problems, 0 warnings, 0 all-caps labels, 0 of 15 labelled headings.

- calm: h1 and body Schibsted Grotesk, h2 Sacramento, ground `rgb(242,242,242)`.
- interactive: h1 and body Familjen Grotesk, h2 Nothing You Could Do, ground `rgb(242,246,246)`.
- unique: h1 and h2 Halant, body Mukta, ground `rgb(224,232,246)`.

## Designers' claims tested

- Calm "white, 4.7:1 or better" on the feature line: the median is 4.7, the minimum 4.4. Still passes for large text.
- Calm first load, "574 KB": confirmed.
- Interactive "the canvas hides whenever nothing is displaced": confirmed (`visibility:hidden` at rest, `live` under the pointer).
- Unique title 5.10 to 5.53:1 on the darkest pixel: 5.21 at 1440x900, on the poster.
- Unique "tap targets under 44 px: 0": confirmed.
- Unique round 6, "both labels share one grid cell": true, and it is why stacked labels overlap instead of pushing the layout.
- Look-logs: calm 3 first-screen rounds, interactive 3, unique 4, each describing changes. This meets the minimum. Whether the sheets really differed cannot be checked, since each shoot replaced the last.

## What the designer prompt got wrong

**calm:** the prompt lets `audit-mockup`'s LCP stand as the first-paint proof, and a full-viewport hero slips past it: the designer's own note on 574 KB is right, yet nothing told them the hero's bytes finish after 2.5 s, apparently because they compete with room photographs inside Chrome's lazy-load margin (img-077 finishes first, at about 1.9 s). **interactive:** nothing in the prompt requires a named skip link or says what to do about dots that are hidden from assistive tech yet still small for a thumb. **unique:** the look loop checks settled states and the shoot pauses between steps, so nothing catches a timing race, and "the bar that remembers" passed. The prompt should require any scroll-driven state change to be tested with a fast gesture. **All three:** `custom.md`'s "pick dates" and audit recommendation 4 conflict, and each designer resolved it by a note in `conflicts`; that belongs in a proposal as a surfaced `base.md` and `custom.md` conflict (PLAN.md §7.5). PLAN.md §9 also needs one line on whether re-grading the business's own photograph is allowed.

## Fix list (no critic gate fails; ordered smallest first)

**calm**
1. Dimension 6: scroll "Details of the furniture" into view on focus.
2. Dimension 6: widen the slideshow dots' hit area to 44 px.
3. Dimension 2: give the hero's preload clear priority over the lazy room photographs, and re-measure when its bytes finish.
4. Dimension 5: copyeditor to see the Rooms ¶3 list.

**interactive**
1. Dimension 6: add a real skip link, or label the first stop as one.
2. Dimension 6: widen the dots' hit area to 44 px.
3. Dimension 7, at 4g: remove `?noguard`; add the Open Graph tags (none today).

**unique**
1. **Dimension 3 and 2: fix the bar's label. On each change remove every `.t` except the new one, and clear the pending timer (`src/page.js` lines 56-64). Retest with a touch gesture at 4,000 px/s.**
2. Dimension 4: print the phone and email in the footer.
3. Dimension 6: `tabindex="0"` on the `.strip` scrollers.
4. Dimension 6: move `<h3>` outside `<button>`, and do not present `.grow` as a button on phones.
5. Dimension 6: add a skip link.
6. Dimension 2: keep the 320x568 CTA inside the fold.
7. Dimension 1: operator's ruling on the re-grade; if kept, give the all-dusk frame an honest alt.
8. Dimension 7, at 4g: add the Open Graph tags (none today).
9. Dimension 5: copyeditor to see the Rooms ¶3 list.

For calm, at 4g: the `og:image` is a relative WebP path. No page has a canonical or JSON-LD yet; that is station 4h's work.

## Not covered

- **The Cloudbeds engine.** Never loaded. Whether it honours `?rid=` or dates is unknown, so "lands" means the URL handed over.
- **Real devices.** All timings come from headless Chromium with emulated throttling on a shared machine. No real phone, no Safari, no Firefox. Whether 2,400 px/s matches a typical flick on a real phone was not measured, only that the gesture triggers the fault.
- **WebGL quality.** Software GL only (SwiftShader). Interactive's depth and unique's slice were confirmed to run, and one pointer-extreme still of each was looked at (interactive's taken with `?noguard`; a separate run without it also went live). Smoothness, the look in motion, battery and heat, and the weak-device guards on real hardware could not be judged.
- **Contrast over the canvas.** Pixel contrast was measured under reduced motion, so unique's title and links were read on the poster, not the live canvas or at the end of a pointer move. Logos, being images, were not measured.
- **Phone sharpness** of the 616 px hero crops: a visual question, not judged.
- **Scored by the other two:** dimension 8, and the visual verdict against the current site. The old site was compared from its dossier captures and measurements, not loaded live.
- **Axe limits.** Run under reduced motion, on the closed state of sheets and panels. It left contrast incomplete on 2 to 133 nodes depending on the page and width, mostly unique's gradient ground; pixel sampling covered one example per text colour, not every node.
- **One flaky run.** The first mobile shoot of unique timed out at 30 s waiting for `load` while other shoots ran beside it. Its later run, alone, finished. Not treated as a page fault.

## Evidence

`reports/2026-11-ahangama-01/critic-evidence/the-sandhya-r1/`:

- `<variant>.audit.json`: `tools/audit-mockup.mjs`, run from a scratch root so the designers' own `audit.json` files were not overwritten.
- `<variant>.probe.json`: links, text against the copy, taps, persistent action, JS off, stalled media, network, overflow, targets, axe, keyboard, reduced motion, WebGL. Its `rooms` entries for unique, and the `tel` entry for interactive, are faults in the first test (selector or wait) and were rerun; `probe2` holds the results.
- `<variant>.probe2.json`: LCP entries, pixel contrast, the reruns, settled keyboard pass, interactive's sheet, unique's bar race.
- `unique.bar-gesture.json`: the touch gesture runs.

**What the screenshots showed** (scratch, not kept, 1440 and 390 px in viewport steps, all three pages at every step): no overflow or overlap seen on the contact sheets, apart from the bar, which the sheets did not catch. No WebGL black rectangle was seen. The bar crop after a fast scroll (`unique-bar-end-120.png`) showed "Director's Suite: check live dates", "Studio+ King: check live dates" and "Check rooms and live dates" printed on top of each other in white on indigo, unreadable.
