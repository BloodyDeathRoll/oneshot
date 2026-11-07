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

# Round 2, quick mode (station 4f), 2026-11-07

Interactive and unique only, after the designer's rework. Build reviewed: commit `2351ac2`. Calm was not reworked or re-run, so its round 1 numbers stand (68.2 / 80, no hard fail). Tested afresh over http on port 8771; the designers' notes were treated as claims. The other reviewers' round 2 sections were not read.

## Result

| Variant | Dimensions 1-7 | Round 1 | Hard fails | Gates 1, 3, 7 at 6 or above | Total out of 100 |
|---|---|---|---|---|---|
| interactive | **66.6 / 80** | 69.2 | none | yes (9, 8, 9) | waits for dimension 8 |
| unique | **68.5 / 80** | 57.9 | **1, by the letter: one word of alt text** | yes (8, 9, 9) | waits for dimension 8 |

The one sentence the human needs, as facts:

- **interactive:** every photograph dot except the last opens the next photograph instead of its own, and the white tile names fall below 4.5:1 at tablet widths (768 to 844 px), though the room sheet gave the right `rid` in every chip sequence tried.
- **unique:** the phone bar no longer stacks at any speed tried, first load is 326 KB, and the first screen is now an ungraded photograph plus a second photograph of the sea; the sea's alt text says "reef", which the dossier does not.

**The hard fail, stated plainly.** The rubric fails "a claim has no dossier entry", and hard constraint 2 says not to round one away. Unique's sea strip alt reads "clear turquoise shallows over dark reef". "reef" appears 0 times in `dossier.json`, and `gaps` lists the bottom as unknown (`location.spot.detail`). It is alt text only, the dark patches are visible in the picture, and deleting the phrase clears it. If the coordinator reads alt text describing a photograph as outside this rule, unique has no hard fail and its scores do not change.

## Scorecards

```
mode: quick    round: 2    variant: interactive
total: 66.6 / 80 (dimension 8 pending)    result: passes the critic's gates    hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Copy, links and image set rechecked by script: 0 mismatches, 0 unsourced. 39 dossier images by file name, all business-owned, none from the never-used list; img-031 is new. The round 1 flags stand: Kayak via digest, Suite bed and size rulings, img-167's room not stated |
| 2 | mobile + performance | 9 | Every budget line met (table below). LCP is the hero photograph, 2,160 to 2,184 ms in 4 runs. No overflow at 320 to 1920 px. CLS 0, scroll CLS 0 and 0 |
| 3 | booking CTA | 8 | Hero and bar 1 tap, rooms 2 taps, all landing on the dossier URLs. **Chip switching correct throughout** (see below). `?rid=` itself unverified |
| 4 | brand fit | 8 | As round 1: minus 1 date picker, minus 1 title on a card at lower left against `custom.md`'s centred title |
| 5 | copy | 8 | `copy/en.json` unchanged since round 1. 30 of 30 paragraphs and 132 of 132 sentences are verbatim in the DOM, JS on and off. But Rooms ¶3 now shows as a list: the punctuation sits in 1x1 px clipped `.sep` elements, and the first letters are capitalised for display. All words stay, and the copyeditor has not seen this form. Down 1 from round 1 for that |
| 6 | accessibility | 6 | axe 0 violations, phone and desktop. Skip link works. Sheet: Esc, focus return and trap all correct. 30 keyboard stops with a focus style, none hidden. Reduced motion clean. **Two faults a visitor would notice:** the dots and the tile contrast, both below |
| 7 | delivery | 9 | As round 1: only localhost and the font hosts, no 4xx, no console errors. `?noguard` is still in the page, for 4g |

```
mode: quick    round: 2    variant: unique
total: 68.5 / 80 (dimension 8 pending)    result: hard fail by the letter, as above; gates pass    hard_fails: ["claim with no dossier entry: 'dark reef' in the sea strip's alt text"]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Visible words: 0 mismatches, 0 unsourced. 39 dossier images, all business-owned. Round 1 flags stand (minus 1), and img-167 still leads Studio Twin. Minus 1 for "dark reef". **The round 1 point for the graded frames is given back,** see below |
| 2 | mobile + performance | 9 | Every budget line met. LCP is the hero, 1,788 to 1,792 ms in 4 runs. First load 326 KB (334 in decimal KB, the designer's number). The round 1 overlap is gone. No overflow at 320 to 1920 px. Rooms 3 and 4 paint about 0.4 to 0.5 s after they enter the view on a throttled phone, with their space reserved |
| 3 | booking CTA | 9 | Hero, bar and 4 room links land on the dossier URLs: 1 tap on a phone, 2 clicks on desktop through the panel, and the closed rows' links stay visible. Bar fixed, below. `?rid=` unverified |
| 4 | brand fit | 8 | Minus 1 date picker. Minus 1 **sea strip against `custom.md`** ("only the header, at most one short centred title, and one short call to action"), below. `notes.md` also says the first screen no longer has a WebGL or video main item, by the operator's direction. Recorded, no deduction, and I could not confirm that direction from here |
| 5 | copy | 8 | `copy/en.json` unchanged. 29 of 30 paragraphs verbatim and in order, JS on and off. **Kabalana's leads are verbatim and in order:** all five paragraphs found whole; only the setting changes. On a phone they are a swipe row, so 4 of 5 start off screen. The exception is Rooms ¶3, a list that drops "Each one also has" and "too, with" and joins "Spa Ceylon amenities, bathrobes and slippers". The copyeditor has not seen either form |
| 6 | accessibility | 9 | axe phone 0 violations; desktop 1 moderate (`region`, the logo in `.top`). Round 1's list is met: `.strip` has `tabindex="0"` on all 4 with arrow keys working, 0 `<h3>` in `<button>`, `.grow` not rendered on phones, skip link first. 0 targets under 44 px. 39 stops, none hidden. Panel: Enter, Esc and focus return correct. h1 on the sand 5.74 minimum, 10.3 median |
| 7 | delivery | 9 | As round 1. No graded still in `dist/img/` |

## Unique: the items asked for

**Phone bar: fixed.** One `.t` label at every 40 ms sample, in all of these:

| Run | Labels at most | End state |
|---|---|---|
| Touch gestures at 600, 1,200, 2,400, 4,000 px/s, canvas on | 1 | correct |
| The same four, reduced motion | 1 | correct |
| 4,000 px/s on to the end of the page, both modes | 1 | "Check rooms and live dates", engine URL |
| Round 1's scripted jumps, 60, 120, 200, 400 ms apart | 1 | Suite and `rid=53603` at the last room, general at page end |

Two small effects remain. The label can go blank during very fast scrolling (longest 361 ms at 4,000 px/s, none under reduced motion). The shown label trails the href by up to about 120 ms. The bar also names the room most in view, so on the phone sheet "Director's Suite" sat in the bar while Studio+ King's own button was on screen above it. That was already the behaviour in round 1.

**Fix list from round 1:**

| Item | Result |
|---|---|
| Phone and email printed in the footer | Yes, phone and desktop, as plain text beside the buttons. The number prints unspaced, `+94765700007`; the other two pages use `+94 765 700 007` |
| `tabindex` on `.strip` | Yes, 4 of 4, and axe's serious finding is gone |
| `<h3>` out of `<button>` | Yes, 0 left |
| Skip link | First stop, visible on focus, white on indigo. Lands on Rooms with the heading at 229 px, clear of the 84 px header. Next Tab goes to the first gallery |
| CTA in the fold at 320x568 | Yes, bottom at 497 of 568. Also in the fold at 360x640, 390x664, 1280x640, 1366x650, 1920x1080 |

**Lazy rooms: the images do arrive.**

- First load on a phone fetches 4 images: hero (110 KB, bytes finish at about 1,778 ms), logo, sea and the first room's first photograph.
- Throttled phone, 1,500 px/s: rooms 1 and 2 were painted on arrival, room 3 after 417 ms and room 4 after 484 ms. Layout did not move (scroll CLS 0.0006).
- A direct jump to room 4 loaded it. On desktop, all 23 photographs showed when opened through the panels' dots. JS off: 23 of 23 shown.
- Swiping slides 2 to 5 on the throttled phone found them already loaded, but that was after a pause; an immediate swipe on arrival was not tested.

**The graded frames: D1 point given back.**

- `dist/img/` holds no graded file: only `hour-noon`, `hour-noon-phone`, `hour-mask`, `hour-folds`. The first screen is ungraded img-152.
- The rest state is real. At the end of the pin the frame's opacity is 0 and img-027 stands alone, on phone and desktop. Reduced motion and no-WebGL never draw the grade, with no console errors.
- **The label reaches assistive tech only.** It is an `aria-label`; the stage has no visible text, so a sighted visitor is told nothing.
- **"At rest" does not mean unseen.** On desktop at 84% of the pin the real print covers 40% of the frame, and the rest shows the full dusk grade at full opacity, lit bays and pink sky. It fades over 86% to 96%. On a phone the print covers 81% at 84% and all of it by 90%. A phone stopped at 60% shows a half-graded building with lit bays. A visitor can stop anywhere.
- The point comes back because no graded picture now stands as a still or as where the page ends. **Whether the moving grade may stay is still the operator's or Shahar's ruling** (PLAN.md §9); `notes.md` says the same.

**Sea strip, flagged against `custom.md`.** A second photograph (img-153) on the first screen, under the building, with no caption:

| Window | Strip | Share of the view |
|---|---|---|
| 1440x900 | 783 to 900 px | 13% |
| 1366x650 | 566 to 650 px | 13% |
| 1920x1080 | 950 to 1080 px | 12% |
| 390x844 | 768 to 844 px | 9% |
| 390x664 | 604 to 664 px | 9% |
| 360x640, 320x568 | not rendered | 0 |

The designer reports it as a conflict for the reviewers. Scored minus 1 in dimension 4.

## Interactive: the items asked for

**Skip link: works.** First stop, visible on focus, white on ink. It moves focus to `#main`, and the next Tab reaches the hero's CTA.

**Dots: the targets are 44 px by box only, and they are wrong.** The negative margins put each later button over the previous dot. `elementFromPoint` at a dot's centre returns the next button, for every dot but the last. Real taps and clicks at the dot's centre:

| Gallery | Result |
|---|---|
| Room sheet, phone and desktop (5 dots) | dots 1, 2, 3, 4 opened photographs 2, 3, 4, 5; only the last was right |
| Dining, phone (6 dots) | dots 1 to 5 opened photographs 2 to 6; only the last was right |

So no dot can return to the first photograph; only a swipe or the arrow keys can. `audit-mockup` and my own target count both report 0 under 44 px, because they read boxes. The dots are `aria-hidden` with `tabindex="-1"`, so keyboard users are unaffected and use arrow keys on the track.

**Room sheet after a chip switch: correct.** The sheet's label, heading, pressed chip, `rid`, link text and first image were checked after each step, on phone and desktop:

- A six-chip sequence, every step right, and the real tap landed on `?rid=53586`.
- Three chips 60 ms apart ended on the last one.
- A chip then Esc 40 ms later, then another tile.
- Esc then a tile 60 ms later.
- `#room-studio-plus` opened directly.
- Reduced motion.

One leftover: a chip then an immediate Esc leaves the hidden sheet labelled for the chip's room, with no visible effect; all 4 rooms were back in place.

**Tile scrim: passes at phone and desktop, fails at tablet widths.** White text over the real pixels, with the text hidden while measuring:

| Width | Tile name, worst | Pixels under 4.5:1 |
|---|---|---|
| 320 | minimum 4.51 | 0 |
| 390 | minimum 6.07 | 0 |
| 600 to 740 | minimum 6.64 or better | 0 |
| **768** | **Studio Twin: minimum 1.36, median 4.09** | **59%**; Studio King 22% |
| 800 | Studio King: minimum 3.26 | 14% |
| 820 | Studio King: minimum 3.28 | 11% |
| 844 | Studio King: minimum 3.35 | 8% |
| 900 to 1000 | minimum 4.34 to 4.69, isolated pixels | under 0.5% |
| 1440, 1920 | minimum 6.15 or better | 0 |

At 768 "2 super-single beds | Sleeps 2" wraps to two lines, which lifts "Studio Twin" to the top of the 34% scrim and onto the white bed. In the capture it is visibly hard to read. The designer's checks ran before the scrim was shortened, as `notes.md` says.

**The "cream" warning: confirmed as mid-ease, not a page colour.** Settled grounds at every scroll position are `rgb(242,246,246)`, `rgb(245,237,229)` and `rgb(248,226,211)`, none in the tool's cream range. `check-design` samples 500 ms after scrolling back to the top, during a 0.6 s ease. `rgb(243,243,240)` lies on the line between the first two, and my samples of that ease passed through `rgb(243,244,242)`. This round the tool itself read `rgb(243,244,243)` and gave 0 warnings, so the warning depends on timing. One fact for the human: the settled later ground, `#F5EDE5`, is hue 30, saturation 44%, lightness 93%, which is 4 points outside the range.

## Budget, mobile home page

`tools/audit-mockup.mjs`, this review's own run. Files: `critic-evidence/the-sandhya-r2/<variant>.audit.json`.

| Item | Target | interactive | unique |
|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | 628 KB | 326 KB |
| Requests | | 12 | 11 |
| JS, gzip (all inline) | ≤ 300 KB | 6.6 KB | 9.0 KB |
| Largest image | ≤ 300 KB | 173 KB | 110 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 44 KB | 2, 91 KB |
| LCP | ≤ 2.5 s | 2,184 ms, photograph | 1,792 ms, photograph |
| CLS | < 0.1 | 0 | 0 |
| Scroll CLS, early and settled | < 0.01 | 0, 0 | 0.0006, 0.0006 |
| Third-party hosts on load | 0 (fonts allowed at 4e) | 2, fonts | 2, fonts |

Desktop first load, outside the budget: interactive 919 KB, unique 1.04 MB.

**Against the current site, measured lines only:** both still beat it on first load (17.5 MB), the booking link and the content it lacks, as in round 1. The visual verdict is the other two critics'.

**`check-design`:** 0 problems, 0 warnings on all three. Interactive: h1 and body Familjen Grotesk, h2 now Allura. Unique: h1 and h2 Halant, body Mukta, ground `rgb(242,246,246)`.

## What the designer prompt got wrong

The prompt lets "tap targets at 44 px" be proved by box size, so a fix made by overlap passes every tool while breaking the control. It should require a real tap on each control, with the result checked. Contrast checked on a photograph is only as good as the last build and the widths tried: the prompt names 1440 and 390, and interactive's fault sits between them, where a text line wraps. It should ask for a width sweep wherever text sits on a photograph, rerun after any change to the scrim. Alt text is written by designers from contact sheets and no step reads it as claims, which is how "reef" got in; the prompt should say alt text describes what is visible and asserts nothing the dossier does not. Two tool proposals follow from this round: a hit test in `audit-mockup`, and a settled wait before `check-design` samples the ground.

## Fix list, smallest first

**interactive** (no critic gate fails)
1. Dimension 6: stop later dot buttons covering earlier dots, then retest with a real tap on every dot in the sheet, Dining and The house.
2. Dimension 6: keep tile names on the scrim at 768 to 844 px, for example with a taller scrim or by not wrapping the second line, and retest by width.
3. Dimension 5: copyeditor to see the Rooms ¶3 list.
4. Dimension 7, at 4g: remove `?noguard`; add Open Graph tags (none today).

**unique**
1. **Dimension 1, the hard fail: delete "over dark reef" from the sea strip's alt.**
2. Dimension 5: print the footer number spaced, as on the hotel's own site and the other two pages. (Matches the dossier either way; a readability fix.)
3. Dimension 6: put the `.top` logo inside a landmark.
4. Dimension 5: copyeditor to see the Rooms ¶3 list and Kabalana's leads.
5. Dimension 4, for a ruling: keep or remove the sea strip.
6. Dimension 1, for the operator or Shahar: whether the moving grade may stay, and if so whether sighted visitors need to be told.
7. Dimension 7, at 4g: add Open Graph tags (none today).

## Not covered

- **The Cloudbeds engine.** Never loaded, so `?rid=` and dates remain unverified.
- **Real devices.** Headless Chromium on a shared machine, with no real phone, tablet, Safari or Firefox. The tablet widths were desktop-style windows, not touch devices. How often a real flick reaches these speeds is unknown.
- **WebGL.** Software GL only. I confirmed the canvas draws, and looked at one still each of the phone sweep and the desktop end. I could not judge the grade's motion, interactive's depth in motion, smoothness or the weak-device guards.
- **The moving frames' light and banding** are visual questions for the other two critics.
- **Contrast.** One example per text colour, under reduced motion, plus the full width sweep on tile names only. Tile hover state not measured.
- **Facts.** Copy, links, image ids and room galleries were re-run by script. The round 1 table was not rebuilt row by row, because `dossier.json` and `copy/en.json` have not changed.
- **Interactive with JS off on desktop.** `notes.md` says it has no persistent button; I tested JS off on a phone only.
- **An immediate swipe on a room's arrival** on a throttled phone, as above. Only one Dining dot run on a phone; The house's dots share the same CSS and were not tapped one by one.
- **Calm.** Not re-run.
- **Earlier look-log rounds** cannot be checked, as each shoot replaces the last.

## Evidence

`reports/2026-11-ahangama-01/critic-evidence/the-sandhya-r2/`:

- `<variant>.audit.json`: `tools/audit-mockup.mjs`, from a scratch root.
- `<variant>.probe.json`, `<variant>.probe2.json`: the same checks as round 1. Unique's phone `rooms` entries and interactive's `tel` entry in `probe.json` are the same faults in the first test as in round 1; `probe2.json` holds the reruns.
- `<variant>.round2.json`: bar runs, sea strip, room images, set-piece steps, skip link, copy order (unique); chip sequences, dots, tiles, ground (interactive).
- `interactive.tiles-and-dots.json`: the width sweep and the Dining dots.

**What the screenshots showed** (scratch, not kept; contact sheets at 1440 and 390 in viewport steps for interactive, 390 for unique, plus single captures): no overflow or overlap on those sheets. Unique's desktop contact sheet was shot but not opened; its desktop layout rests on the probes and single captures. At 768 px "Studio Twin" sits on a white bed above the dark of the scrim. At 84% of the desktop pin, img-027 stands in the middle with the graded dusk building visible either side.
