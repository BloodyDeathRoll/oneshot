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

# 4g / critiqued(1): full mode (station 5), round 1, 2026-11-09

Build reviewed: `sites/the-sandhya/final/dist/`, the calm port, as of commit `d3ce216`. No file under `final/src`, `scripts`, `public` or `astro.config.mjs` is newer than `dist/index.html`, so it was not rebuilt. The site stayed unchanged through the review. It was served over http from a plain static server (`tools/_serve.mjs`) on port 8771, and every non-localhost request was stubbed or aborted. `tools/audit-mockup.mjs` was run from a scratch root whose `mockups/final/dist` links to the real `dist/`, so the designer's `final/audit.json` was not overwritten. The visual-critic and experience-critic reports from this round were not read.

## Result

```
mode: full    round: 1    variant: calm (final)
total: dimensions 1-7 = 69.4 / 80; out of 100 waits for dimension 8    result: passes the critic's gates    hard_fails: []
```

**Out of 100.** The total is (69.4 + 2.5 × d8) × 100 ÷ 105, where d8 is the lower of the two visual critics' scores. With d8 = 8 it is **85.1, a pass by 0.1**. With d8 = 9 it is 87.5, and with d8 = 10 it is 89.9. Below 8 the round fails anyway on the visual gate. So, on my dimensions: **PASS if both visual critics give 8 or more and neither says it loses to the current site; otherwise FAIL.** My dimensions alone leave almost no margin. The 0.1 point at d8 = 8 rests on dimension 6 (8) and dimension 2 (8).

Gates I own, all met: no hard fail; every one of dimensions 1 to 7 at 6 or above (lowest 8); every playbook §4 budget line met (table below); `funnel.json` `clicks_to_book` 1 against target 1, and primary action class `engine` against `engine`.

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table below: 0 mismatches, 0 unsourced claims. 44 photographs, all `business-owned`, none from the never-used list, 0 empty alts. Point off for the same open flags as 4f, which now reach more places: Kayak 9.4 is read through a digest and is printed **three** times (the new line under the rooms, Guests and the booking card); the Suite is "King bed" against the dossier's "Super King", now also in JSON-LD `containsPlace`; img-167's room is not stated; and the staff prints img-141 to 143 still await the owner |
| 2 | mobile + performance | 8 | Every budget line met in 10 `audit-mockup` runs (table below): 601 KB first load, LCP 556 to 632 ms, CLS 0.0032, scroll CLS 0.0032 early and 0 settled. No horizontal scroll from 320 to 1920 px. Minus 2, **4f fix 3 not landed:** the measured LCP is still the `h1`. The hero photograph's bytes finish at 2,657 to 2,677 ms on the throttled phone and 3,220 to 3,237 ms on desktop, 3 runs each (`lcp.json`). They finish after img-077 (1.9 s), `logo-footer.png` (2.1 s) and img-043 (2.6 s), although the hero has `fetchpriority="high"` and a preload. The budget's LCP line does not see the picture, which paints after 2.5 s on a phone |
| 3 | booking CTA | 9 | `tools/funnel.mjs`: `clicks_to_book` 1, primary `engine`, hero `engine` with 0 taps to flow, CTA above the fold. All 8 engine links and the tel and mailto links match the dossier character for character, tapped on a 390 phone (log below). The persistent action was in view and topmost at 31 of 31 scroll stops. With images and fonts never answered, the hero link was in the DOM and topmost at 37 ms. With JS off, all 8 links are present and the date fields are hidden. **The date fields work and are honest** (below). Point off: nobody has seen Cloudbeds honour `?rid=` or `#checkin=`, so "lands" means the URL handed over |
| 4 | brand fit | 9 | Playbook §3 hierarchy present. 4f's "minus 1, date picker" is gone: the fields answer `custom.md`'s "pick dates", by Alon's gate-b ruling. The ratings now follow the rooms directly. Minus 1 still for order: Arrival comes before the rooms, so on a phone the first room button first comes into view after about two screens (the concept's order, kept on purpose by `notes.md`). Instagram is a button and not a feed: no deduction, as at 4f |
| 5 | copy | 8 | 127 of 130 copy sentences are verbatim in the DOM, JS on and off (`probe.json` `text_js_*`). The 3 others are Rooms ¶3, shown as the "Every room has" icon list (`gaps.roomKit`). All its words are kept, but "Each one also has" and "too, with" are dropped and the list items begin lower case. **4f fix 4 not landed:** `copy/review.md` was last changed on 2026-11-06, so the copyeditor has still not seen this form. Every other visible string is a template label or a formatted value (`US$3,500`, `9.7/10`, `June 2026`). The h1 is the passed tagline without the business name. The rubric's copy dimension asks for plain, specific, sourced words, and the tagline is all three, so there is **no deduction**. Said plainly: the name appears in no sentence on the page, only in the logo's alt, the `<title>`, `og:site_name` and JSON-LD (SEO "Still wrong" 1, AI SEO R1). That is a human's call, not a rubric point |
| 6 | accessibility | 8 | axe 4.13, phone: 0 violations. Desktop: 1 moderate, `region`, on `.stick-in > .logo` and `.stick-in > .right` (the sticky header sits outside any landmark; 4f's desktop finding, not fixed, since only the phone bar became a `nav`). Keyboard, desktop: 76 stops, every one with a focus style, in view after its scroll and not covered, no trap. The skip link moves to `#main`. 4f fixes 1 and 2 landed: dots are 44×44, and the details row scrolls into view on focus. The date inputs are labelled ("Check-in", "Check-out"), the label is a 158×67 target that focuses the input, and the `.field:focus-within` outline shows. Reduced motion: 0 running animations and no parallax transform. **Minus 2:** (a) on a phone with a keyboard, the four room buttons take focus **wholly behind the sticky bar** (0 of 52 px visible), and the Kayak line under the rooms shows 13 of 86 px (`probe2.json`, confirmed by a third pass). There is no `scroll-padding-bottom` for the bar. (b) the desktop `region` above |
| 7 | delivery | 10 | Static output only: `index.html`, `llms.txt`, `robots.txt`, `photos/`, `img/`, `fonts/`, 81 files, all lowercase, relative URLs, no `/`-rooted path. Full scroll at 390 and 1440: 48 requests each, **0 external**, 0 failed, 0 broken images, 0 console errors. Both families are self-hosted (Sacramento inline): 4f's "fonts must be self-hosted at 4g" landed. No CMS call. No key, token, password, localhost or old-host string in the page, `llms.txt` or `robots.txt`. A preview is `noindex, nofollow` with `Disallow: /` |

Weighted: 18 + 12 + 13.5 + 4.5 + 8 + 6.4 + 7 = **69.4 / 80**.

## Decisions taken by the operator, not scored as defects

Beachfront boutique hotel, not a surf stay. No nightly room price. Two testimonials, shown whole. No usable video, so the video hard fail does not apply. The first screen carries img-071 at 2000 px. The date fields are Alon's gate-b ruling, and I judged only whether they work and are honest. The h1 is the passed tagline without the name, scored as the rubric says (dimension 5 above).

## The date fields: do they work, are they honest

Tested on a 390 phone, external pages stubbed (`probe.json` `dates`, `probe2.json`).

| Case | Links | Line under the fields |
|---|---|---|
| Page loaded, nothing chosen | 8 plain dossier hrefs | none |
| Check-in chosen | check-out fills with the next day; all 8 get `#checkin=…&checkout=…` | none |
| Both chosen | all 8 rewritten, rooms as `?rid=53570#checkin=2026-12-09&checkout=2026-12-12` | none |
| Check-out before check-in, same day, check-in in the past | all plain again | "Choose both dates, or clear both." |
| One cleared | all plain | the same line |
| Both cleared | all plain | none |
| JS off | the fields are `hidden`, 8 plain links | n/a |

- **The dates reach the address bar.** After tapping the booking card's link, and separately the phone bar's link, the navigated URL was `https://hotels.cloudbeds.com/reservation/WMvA6V#checkin=2026-12-09&checkout=2026-12-11`. The fragment is not part of the HTTP request, so whether Cloudbeds reads it is still unknown, as the brief says. No adults parameter is sent anywhere.
- **Honest:** no date is pre-filled. No availability, price or "your dates" claim appears. The button keeps its plain label, "Check rooms and live dates". An invalid pair is never sent: the links fall back to the plain href and the page says so. `min` is the visitor's local date. A visitor at UTC-10 can pick a check-in that is already yesterday in Sri Lanka (Honolulu `min` 2026-11-09 while Colombo's is 2026-11-10 at the time of the test). The engine decides then. Not a defect.
- **Note for the go-live check.** After back-navigation the fields came back empty and the links plain, so a returning visitor sees no stale dates. Real-browser bfcache behaviour was not tested. The fields sit only in the booking card near the end. The hero, header, room and bar links carry the dates only after a visitor has chosen them there.

## Facts table

`copy/en.json` and `dossier.json` are unchanged since 4f round 1, so the 4f table (above) stands for every claim the page shares with the mockup. It was re-run by script on the built page. Below are only the rows that are new or that moved at 4g.

| Claim on the page | Dossier key | Result |
|---|---|---|
| All copy sentences | `copy/en.json` (passed 4c) → `copy/sources.md` | 127 of 130 verbatim. The other 3 are the Rooms ¶3 list (words kept) |
| Rating line after the rooms: "9.7/10 \| Trip.com \| 56 reviews \| read 2026-11-06", "9.4/10 \| Kayak \| 159 reviews \| read 2026-11-06" | `reviews.trip`, `reviews.kayak` | match. Kayak **flag** as at 4f (`via_digest`) |
| 8 engine links (hero, header, 4 rooms, booking card, bar) | `booking.engine_url`, `.engine_room_links` | match, exact. `audit-mockup` `tapped` = engine URL |
| `tel:+94765700007`, printed "+94 765 700 007"; `mailto:reservations@thesandhya.com` | `contact.phone`, `.email` | match |
| Address "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | `location.address` | match, exact |
| Map, Instagram links | `location.map_url`, `contact.socials.instagram` | match, exact |
| `<title>` "The Sandhya, Ahangama"; description = tagline + breakfast sentence | `business.name`, copy | match |
| JSON-LD `Hotel`: telephone, email, PostalAddress, geo 5.9769788, 80.3525613, `hasMap`, check-in 14:00, check-out 12:00, 29 amenities, 4 `HotelRoom`, `knowsLanguage` en, `sameAs` 3 | `contact`, `location`, `stayInfo`, `facilities`, `room_types`, `languagesSpoken` (Trip.com), `reviews.*.source_url` | match. **Flags:** the Suite's "King bed", as above. `checkinTime` 14:00 stands without the contradiction note the page prints (Trip.com says after 16:00, `contradictions.check_in`). `knowsLanguage` rests on Trip.com alone (`gaps[] business.languagesSpoken`). No rating, price or FAQ markup |
| `llms.txt` | copy | not re-checked line by line. AI SEO checked 156 fragments against the JS-off page. I checked its preview line and its absence of ratings |
| `audit-mockup` `facts` | | the only number not in the copy is "3,500", the copy's 3500 formatted |

## Budget, mobile home page

`tools/audit-mockup.mjs`, 10 runs on this machine (`critic-evidence/the-sandhya-4g-r1/audit-01..10.json`).

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 615,542 B (601 KB), 9 requests, every run |
| Hero video | ≤ 2 MB / 4 MB | none exists |
| JS, compressed | ≤ 300 KB | 0 as files; the inline script is 93 source lines, within the 44 KB gzipped HTML |
| Largest image | ≤ 300 KB | 175,632 B (the desktop hero; on the phone 96 KB) |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families: 46,752 B file + Sacramento inline (about 23 KB) |
| LCP | ≤ 2.5 s | 556 to 632 ms in 10 runs (the `h1`; the hero photograph's bytes end at about 2.66 s, see dimension 2) |
| CLS | < 0.1 | 0.0032 every run |
| Scroll CLS early / settled | < 0.01 | 0.0032 / 0 in 10 of 10 runs |
| Third-party requests on load | 0 | 0 |
| Tap targets under 44 px (`audit-mockup`) | | 0 of 50 |

The early 0.0032 is a 1 px text shift at the font swap at y 61, about 1.63 s in. The intermittent 0.22 to 0.42 shift that SEO caught before `d3ce216` (about 1 run in 5) did not appear in any of 10 runs. The designer's 12 clean runs bring it to 22 of 22. Its cause, the phone Dining masonry collapsing, has a stated fix in `notes.md`.

## Tap-through log, phone 390×844

External pages stubbed. **Cloudbeds was never loaded.**

| Action | Box | Lands |
|---|---|---|
| Hero "Check rooms and live dates" | 358×56, bottom at 824 of 844 | `…/reservation/WMvA6V` |
| Header copy of it | not shown on a phone (desktop only) | same href |
| Studio King / Studio Twin / Studio+ King / Director's Suite | 350×52 each | `?rid=53570` / `53586` / `53587` / `53603` |
| Exclusive Use Call, Email | 103×50, 114×50 | `tel:+94765700007`, `mailto:reservations@thesandhya.com` |
| Booking card button | 326×64 | engine; with dates, the URL with the fragment |
| Booking card and footer Call, Email | 103×50, 114×50 | as above |
| Bar button, bar call | 302×54, 54×54 | engine, `tel:+94765700007` |

## Against the current site (thesandhya.com)

The visual verdict belongs to the two visual critics. On measured lines the build beats the current site on every row:

| | Current site (`old-site.json`, dossier audit) | Final |
|---|---|---|
| First load, phone | 17.5 MB, LCP 4.2 s | 601 KB, LCP 0.6 s (the `h1`); hero photograph at about 2.7 s |
| Hosts on load | 13 hosts, including Facebook, Google Ads, DoubleClick and Analytics | 1 (localhost) |
| Booking action | RESERVE, 70×30 px, a script control that answers about 52 s after opening on slow 4G | a real link, 358×56, topmost at 37 ms with media stalled |
| Dates passed to the engine | empty unless picked in 5 or 6 taps (F2) | only if chosen, both or neither, never shown and unsent |
| Room passed to the engine | no (F8) | `?rid=` per room (unverified) |
| What and where on the first screen | a dictionary entry and "Adults Only Hideaway" | in the h1 |
| Ratings, check-in times, breakfast, map link | none on any of 10 pages | all present |

## 4f fixes for calm: did they land

| 4f item | Status |
|---|---|
| 1. Details row into view on focus | **landed** (`site.js`, verified: in view at every stop) |
| 2. Dots 44 px | **landed** (44×44) |
| 3. Hero bytes priority, re-measure | **not landed**: the preload and `fetchpriority` are there, but the bytes still finish at about 2.66 s on a phone, behind lazy room photographs and an eager footer logo |
| 4. Copyeditor to see the Rooms ¶3 list | **not landed** (`review.md` unchanged since 2026-11-06) |
| 4g: self-hosted fonts | **landed** |
| 4g: `og:image` absolute; canonical, JSON-LD | **landed** with `SITE_URL` (4h). The preview build carries no `og:image`, since it has no absolute URL |
| axe `region` on `#bar` (phone) | **landed** (`nav`). The desktop `region` on the sticky header remains |

## `tools/check-design.mjs`, facts for the human

0 problems, 0 warnings. h1 and body in Schibsted Grotesk, h2 in Sacramento. Ground `rgb(242,242,242)`, hsl(0 0% 95%). 0 all-caps labels, 0 of 15 labelled headings.

## What the designer prompt got wrong

The prompt accepts `audit-mockup`'s `lcp_ms` as proof of a fast first screen. On a page whose LCP entry is the h1, that number says nothing about the photograph the concept calls "the one thing". The calm designer was told at 4f that the hero's bytes finish after 2.5 s. They added a preload and `fetchpriority` and reported LCP 740 ms, but did not re-measure the photograph, which is still at about 2.66 s. The prompt should require, for every first screen with a hero image, the hero resource's `responseEnd` on the throttled phone, and ask for lazy images within the first two screens and non-critical eager images (the footer logo) to be held back until it lands. Second, the prompt's keyboard check runs at 1440 only (`notes.md`: "Keyboard, 1440"). A sticky bottom bar exists only on a phone, so focus hidden under it cannot show up there. The keyboard pass should also run at 390, with a check that each focused element is not covered (`elementFromPoint`). Third, a copy form the copyeditor has not seen (a sentence turned into a list) was carried from 4e to 4g as a known item without being sent back to 4c. The prompt should make it a hand-off, not a note.

## Fix list, smallest first (no critic gate fails; for the next pass or before go-live)

1. **Dimension 6:** on phones, `scroll-padding-bottom` at least equal to the bar's height (about 76 px with the safe area), so that a focused room button is not hidden behind the bar. Retest by Tab at 390 with an `elementFromPoint` check.
2. **Dimension 6:** put the desktop sticky header (`.stick > .stick-in`) inside a landmark, for example `<header>` or a `nav` wrapper, to clear axe `region`.
3. **Dimension 2:** let the hero win the bandwidth. Give `logo-footer.png` `loading="lazy"`, and keep the first room's photographs from competing (for example `fetchpriority="low"` on the room images, or wake them by observer as the other slides are). Then report the hero's `responseEnd` on the throttled phone, with a target under 2.5 s.
4. **Dimension 5:** send the "Every room has" list to the copyeditor (4c) as a form of Rooms ¶3.
5. **Dimension 1, before go-live (a person):** read Kayak's 9.4 from 159 on Kayak itself, or drop that line from all three places and from `sameAs`. Settle the Suite's bed with the owner. Confirm img-167's room and the staff prints.
6. **Dimension 3, before go-live (a person, already in `notes.md`):** in a real browser, open the base link with `#checkin=…&checkout=…` and each `?rid=` link with and without it. If Cloudbeds ignores the fragment, remove the fields.
7. **For a human, not a rubric point:** the name in the h1 or in one sentence (SEO "Still wrong" 1, AI SEO R1), through 4c.

## Not covered

- **Dimension 8 and the visual verdict against the current site:** the visual-critic's and experience-critic's, not read. The total out of 100 waits for them.
- **The Cloudbeds engine.** Never loaded. Whether it reads `#checkin=`/`#checkout=` or `?rid=` is unknown, and so are its own steps. The adults count is never sent.
- **Real devices.** All of this ran in headless Chromium with emulated throttling, on a machine other sessions were using. I tested no real phone, Safari, iOS date picker or Android picker. Tapping the label focuses the input in Chromium, but whether it opens the native picker on a phone was not seen. bfcache on a real back-navigation was not seen either.
- **Contrast** beyond axe: axe left `color-contrast` incomplete on 5 phone nodes and 7 desktop nodes, and I did no pixel sampling this round. The h1 on the bed and the feature line were sampled at 4f, on the same photograph and crops.
- **`llms.txt` and the JSON-LD with `SITE_URL`:** I read the preview build only. The workers.dev and real-domain builds rest on the SEO and AI SEO reports.
- **WhatsApp or other link previews:** the preview build has no `og:image` without `SITE_URL`, and no preview was tested.
- **Facts:** not rebuilt row by row from the dossier for rows unchanged since 4f. Copy, links and image ids were re-run by script against the built page.
- **The phone hero's sharpness** (616 px source shown at 924): a visual question.

## Evidence

`reports/2026-11-ahangama-01/critic-evidence/the-sandhya-4g-r1/`:

- `audit-01.json` … `audit-10.json`: `tools/audit-mockup.mjs`, 10 runs, from a scratch root.
- `probe.json`: text against the copy with JS on and off, links, phone tap-through, persistent action, date-field cases, overflow at 9 widths, axe for phone and desktop, a first keyboard pass, reduced motion, an offline full visit at both widths, small targets. Its `kbd_*` "not in view" lists are a fault in that first test: it waited 60 ms under `scroll-behavior: smooth`. `probe2.json` reran it with 900 ms.
- `probe2.json`: the keyboard reruns with a covered-element check, the field box, label tap, navigated URLs with dates, back-navigation, time zones, and the stalled-media CTA.
- `lcp.json`: LCP entries and resource end times, phone and desktop, 3 runs each.

`reports/2026-11-ahangama-01/funnel/the-sandhya-r1/funnel.json`: `tools/funnel.mjs --depth 3`. Its two screenshots were deleted.

**What the screenshots showed** (`tools/shoot.mjs` over http, scratch, not kept; 20 desktop and 23 phone captures in viewport steps). The first screen is img-071 with the h1 on the bed and the red button under it, on both widths. The phone bar is present from the second capture to the last. There is no overflow or overlap on either contact sheet. The date fields read "dd/mm/yyyy" in full at 390 and sit side by side. The rating line under the amenities is small grey text at both widths. A first shoot over `file://` blocked the text font (CORS), which is a property of `file://`, not a page fault. It was discarded and reshot over http.

# Verification 1, after the fix pass (`459db5a`), 2026-11-09

`npm run build` in `final/` was clean and left the tree unchanged. The new `dist/` was served on 8771 by the plain static server, with every non-localhost request stubbed or aborted. `audit-mockup` was run from the scratch root as before. The other two reviewers' files were not read. Evidence is in `critic-evidence/the-sandhya-4g-v1/`.

```
mode: full    verification 1 of critiqued(1)    variant: calm (final)
total: 89.0 / 100 (dimensions 1-7 = 73.5 / 80; d8 = 8 as the visual critics scored it)    result: PASS    hard_fails: []
```

| # | dimension | r1 | v1 | evidence |
|---|---|---|---|---|
| 1 | facts | 9 | 9 | Copy unchanged: 127 of 130 sentences verbatim, JS on and off. The other 3 are the room list. All 9 engine hrefs are exactly the dossier URLs on load, JS on and off (`probe.json` `engine_all_dossier`). The new visible strings are template labels (`labels.mjs`) filled from the visitor's own dates: "Check 9–12 Dec · 3 nights", "Studio King: 9–12 Dec · 3 nights". The night counts are right for 1 night, across a month, across a year and over a European DST weekend (26 Mar – 2 Apr = 7). The 4f flags stand (Kayak via digest, the Suite's bed, img-167, the staff prints) |
| 2 | mobile + performance | 8 | 9 | **Fix 3 landed.** The hero's bytes finish at 1,484 to 1,498 ms on the throttled phone (was 2,657 to 2,677) and 1,758 to 1,759 ms on desktop (was 3,220 to 3,237), 3 runs each. Nothing loads beside it but the header logo and the font (`lcp.json`). 10 `audit-mockup` runs: first load 273,877 B (267 KB, 4 requests, was 601 KB), LCP 560 to 648 ms (the `h1`), CLS 0.0039, scroll CLS 0.0039 early (font swap at 1.26 s, `#text`, `span.lbl`) and 0 settled in 10 of 10, largest image 98 KB, 0 third-party. Minus 1 for what the trade costs: a visitor who scrolls straight down on slow 4G waits 2.0 to 2.5 s for the doors photo and each room's first photograph after it enters the view. Space is reserved and nothing jumps (`probe.json` `throttled`). That is a trade, not a fault |
| 3 | booking CTA | 9 | 9 | `funnel.json` (`funnel/the-sandhya-v1/`): `clicks_to_book` 1, primary `engine`, hero `engine`. Both date sets share one state: check-in in the rooms set fills both sets. Every href stays plain until the pair is valid. Check-out first, a past check-in, a cleared date, a stale stored pair and broken storage all keep or return all 9 to the dossier URL. The half-date line shows only in the set used. Tapping the card's button navigates to `…/WMvA6V#checkin=2026-12-09&checkout=2026-12-12`. Back and reload restore the pair and the labels. Point off as before: the engine has not been seen to read the fragment or `?rid=`. **This weighs more now, because the buttons name the dates** |
| 4 | brand fit | 9 | 9 | The dates now sit where the choice is made, straight after the rooms. Arrival still comes before the rooms (concept order), minus 1 as before |
| 5 | copy | 8 | 9 | **Fix 4 landed:** the copyeditor passed the "Every room has" list (`6e478cd`, `copy/review.md`). Minus 1: on narrow screens the dated labels end in "…", so the visitor loses the nights or the year (below) |
| 6 | accessibility | 8 | 10 | **Fixes 1 and 2 landed.** Tab at 390: 73 stops, **0 under the bar**, 0 covered, 0 out of view (`kbd_phone`, `elementFromPoint` at each stop after 800 ms). axe 4.13: **0 violations on phone and desktop**. The sticky header is `div[role=region]` "Sections and booking", and 5 to 7 contrast checks stay incomplete as before. Fields are 158 to 170 × 67 at 390, labelled, with the focus-within outline. Each clipped label keeps its full text as the link's accessible name |
| 7 | delivery | 10 | 10 | 0 external requests, JS on and off. `check-design` 0 problems, 0 warnings. No CMS call. `sessionStorage` is wrapped in try/catch (broken storage tested) |

Weighted: 18 + 13.5 + 13.5 + 4.5 + 9 + 8 + 7 = **73.5 / 80**. With d8 = 8: (73.5 + 20) × 100 ÷ 105 = **89.0**. Every dimension is at 6 or above, every budget line is met and there is no hard fail.

## Regressions checked

| Check | Result |
|---|---|
| JS off | Rooms set hidden whole. Card fields hidden, its button shown. **7 plain engine links visible**, all exact dossier URLs. Photos: 47 of 47 images load through `<noscript>`. The 23 `data-src` placeholders are `display:none`, not empty boxes (the room slide was checked in a capture) |
| Lazy photos load as you scroll, 390 and 1440 | Scrolled in 0.7-screen steps with 900 ms each: **0 blank images in view at any stop**, 47 of 47 loaded at the end, 0 left unwoken. Every slide of all four rooms was shown by its dot: 22 of 22 painted at both widths |
| Hero stalls | A 4 s timer wakes the rest. The code was read, not tested with a stalled hero |
| Overflow 320 to 1440 with the longest labels | `scrollWidth` = `clientWidth` at 320, 360, 390, 768 and 1440 |
| Early-scroll CLS | 0.0039 in 10 of 10, under 0.01 |

## A glance at the visible changes

Crops at 320, 360, 390 and 1440 with dates set (scratch, not kept). The **fields** after the rooms read "30/12/2026" in full and stack below 380 px. They are side by side at 390, and the same 440 px width as the button at 1440. Nothing overflows. **Room buttons** wrap to two lines cleanly (53 px). **The other dated buttons ellipsize** when the label is long (`probe-b.json`):

| Label form | 320 | 390 | 768 and 1440 |
|---|---|---|---|
| Same month, "Check 9–12 Dec · 3 nights" | only the card's big button clips | none | none |
| Across months, "Check 30 Jan – 2 Feb · 3 nights" | hero, rooms set, card and bar clip | none | none |
| Across years, "Check 30 Dec 2026 – 2 Jan 2027 · 3 nights" | hero, rooms set, card and bar clip | the same four clip | the card's big button clips ("…2 Jan 2027 · …") |

At 320 the bar reads "Check 30 Dec 2026 – 2 Jan …". At 1440 the card reads "Check 30 Dec 2026 – 2 Jan 2027 · …". The href is right in every case, and the clipping is clean, with no overlap. It is a small, visible blemish on the common phone widths for any stay that crosses a month end. It is not a clear regression of the page as a whole, so **d8 stays at 8**. That is for the visual critics to weigh.

## Fix list (no gate fails), smallest first

1. Dimension 5: keep the dated labels from clipping. Drop the year unless the stay is more than about 11 months away. Let the hero, rooms set and card buttons wrap like the room buttons (the bar can keep its ellipsis). Or shorten the label to the range alone on narrow screens. Retest the three label forms at 320 and 390, and the card at 1440.
2. Before go-live, unchanged and now more important: a person checks in a real browser that Cloudbeds shows the dates from `#checkin=…&checkout=…` and the room from `?rid=`. The buttons now promise the dates by name. If the engine ignores them, remove both `data-dates` blocks.
3. Unchanged owner items: Kayak's 9.4, the Suite's bed, img-167, the staff prints.

## Not covered

Cloudbeds itself. Real phones, Safari and the native pickers. A hero that really stalls (only the code was read). Pixel contrast beyond axe. The tablet header nudge at 768 to 1023 portrait was not looked at. The full contact sheets were not reshot: only crops of the changed parts, the JS-off room slide and the probes. Dimension 8 stays with the visual critics.

## Evidence

`critic-evidence/the-sandhya-4g-v1/`:
- `audit-01.json` … `audit-10.json`
- `lcp.json` (hero timing)
- `probe.json`: text, engine hrefs, the date cases, widths, the keyboard at 390, axe with landmarks, the lazy-load walk at both widths, throttled photo timings
- `probe-b.json`: label clipping by form and width, the JS-off placeholders

Also `funnel/the-sandhya-v1/funnel.json`, whose two screenshots were deleted.
