# critic 4f (quick) — the-lavish-haven-v2 · run 2026-10-lk-surf-01 · 2026-10-20

critic 0.4.3 · rubric 0.3.1 · runtime prompt from `ONESHOT_RUN=2026-10-lk-surf-01 node tools/prompt.mjs critic`.
Scope: rubric dimensions 1–7 (max 80). Dimension 8 belongs to visual-critic / experience-critic; their reports were not read.
Comparison: the earlier round's three Astro mockups (`sites/the-lavish-haven/mockups/*/dist/`) scored with the same
method, widths and checks, **for comparison only — not part of the gate**.

## Method (identical for all six pages)

- `tools/audit-mockup.mjs <slug> <variant>` for all six (390 × 844, 1.6 Mbps / 150 ms / 4x CPU, no scroll; plus scroll CLS).
  Copies: `evidence/audit-<slug>-<variant>.json`. The earlier round's tracked `audit.json` files were restored after the run
  (git shows no change under `sites/the-lavish-haven/`).
- `tools/check-design.mjs <page> --no-shots` → `evidence/check-design-*.txt`.
- `tools/shoot.mjs` over **http** (plain static server, one port per page), default options, 1440 × 900 and 390 × 844.
  The shared `shots/` folders had been shot from `file://`: fonts were blocked there (CORS) and the earlier interactive/
  unique pages lost their only script (root-absolute `/_astro/…` path), so those frames did not show the real page. Scored
  from the http frames instead; the frames are deleted (described in words below).
- Playwright probes (`evidence/probe-a11y-booking.json`, `evidence/probe-rosa-tapthrough.json`): JS-off booking links,
  header-CTA tap-through on a 390 touch viewport with external requests intercepted, booking action visible at 30/60/90 %
  scroll, axe-core 4.14 (WCAG 2.0/2.1 A+AA) at 1440 after a full scroll, 80-press keyboard pass with focus-indicator check,
  Rosa requests before/after scrolling to the block, JS-off Rosa fallback. Extra checks for the v2 date forms and the
  interactive chooser (results quoted below). Text-size census (words under 14 px).
- Facts: the rendered `body.innerText` of each page (`evidence/text-*.txt`) checked line by line against
  `dossier/the-lavish-haven-v2/dossier.json` (the earlier round against the same dossier: same business, same harvest).

## Budget table (playbook §4, measured, phone, no scroll)

| page | first load | JS ext. | fonts | largest img | LCP | CLS | scroll CLS early / settled | 3rd-party on load |
|---|---|---|---|---|---|---|---|---|
| budget | ≤ 1.5 MB | ≤ 300 KB | ≤ 150 KB | ≤ 300 KB | ≤ 2.5 s | < 0.1 | < 0.01 | 0 |
| v2 calm | 462 KB | 0 | 87 KB | 83 KB | 2164 ms | 0 | 0 / 0 | 0 |
| v2 interactive | 310 KB | 0 | 61 KB | 118 KB | 1524 ms | 0 | 0 / 0 | 0 |
| v2 unique | 199 KB | 0 | 90 KB | 69 KB | 420 ms | 0 | 0.004 / 0 (`div#bar`) | 0 |
| earlier calm | 785 KB | 0 | 68 KB | 139 KB | 1784 ms | 0.0014 | 0 / 0 | 0 |
| earlier interactive | 407 KB | 6 KB | 110 KB | 159 KB | 356 ms | 0.0005 | 0.0005 / 0 | 0 |
| earlier unique | 852 KB | 19 KB | 119 KB | 153 KB | 1760 ms | 0.0015 | 0.0015 / 0 | 0 |

Every line met on all six. No horizontal overflow at 390 on any page (JS on and off).

## Facts table (v2; same copy on all three, `copy/en.json` passed 4c)

| claim on page | dossier key | result |
|---|---|---|
| "A new hotel, two minutes from Kabalana" / "2 min to Kabalana, on foot" | `location.distance_to_beach` (2-minute walk) | match |
| 12 room names + beds + sleeps (all three variants) | `room_types[0..11]` | match 12/12 (Two-Bedroom "2 extra-large double beds" = "1 + 1 extra-large") |
| calm groups by view (pool 2 / pool+garden 3 / garden 3 / none 4); interactive counts pool 5, garden 6, both 3, kitchen 3, sleeps 4+ 5 (live region text after each chip tap) | words in `room_types` names | match (recounted) |
| 9.3 / 10 Booking.com, 34 reviews, "read 25 September 2026" | `reviews.booking` rating 9.3, count 34, fetched 2026-09-25 | match (copy says 9.2; page follows the refreshed dossier, notes.md says so) |
| 5.0 / 5 Google, 21 reviews | `reviews.google` | match |
| Cleanliness 9.7, Comfort 9.7, Location 9.6, Facilities 9.5, Staff 9.4, "read 19 September 2026" | `reviews.booking.categories` | match; **Value for money 9.1 (the lowest) is left out** of the line — not false, but selective |
| 5 quotes, authors, "on Booking.com" | `reviews.quotes[0,3,4,6,7]` | verbatim match; truncations kept with "…"; Shahar's own review not used |
| check-in 14:00–00:00 / "until 00:00", check-out any hour, cash only, 24 h desk, parking reserve, shuttle | `stayInfo.*`, `hours_note`, `facilities` | match |
| Koggala Airport about 5 km | `business.description` 3.1 mi | match |
| amenities list (25) | `facilities[]` | match |
| No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka | `location.address` (capitalised per playbook §6) | match |
| tel:+94764832988 | `contact.phone` | match |
| booking.com / agoda URLs | `booking.engine_url`, `other_engines[0]` | match character for character |
| Kabalana beach break / The Rock reef A-frame | `location.spot` | match |
| calm + interactive Rosa headline "0.7–1.1 m chest-high · Swell 1.3 m, 12.6 s, from the S · Wind 6.5 km/h cross-shore" | fixture `agents/designer/fixtures/rosa-kabalana.json` `current` | match |
| calm + interactive "Kabalana, **Sun** 21 Sep, 20:30" | fixture `current.t` = `2026-09-21T20:30+05:30` | **mismatch: 21 Sep 2026 is a Monday** (fixture data, not a dossier claim → scored, not a hard fail) |

No invented claim found; no dossier contradiction. Earlier round: see its section.

---

## v2 — calm ("Prints")

```
mode: quick   round: 1   variant: calm
total: 71.7 / 80 (dims 1–7)   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | Facts table: every dossier claim matches. −1 Rosa time label "Sun 21 Sep" for a Monday; −1 category line omits value for money 9.1 (the lowest of six). |
| 2 | mobile + perf | 9 | Budget table, all lines met; LCP 2164 ms is the closest to its line. 390 frames: hero = two prints overlapping + script name + one blue button in one screen; room table restacks to name / beds / sleeps; no overflow; no text under 14 px. |
| 3 | booking CTA | 10 | Header "Check dates" tapped at 390 → request `https://www.booking.com/hotel/lk/the-lavish-haven.html` = `booking.engine_url` (1 tap; auditor target 1, class engine). JS off: 16 visible booking links (Booking, Agoda, tel). Bottom bar "Check dates on Booking.com" + call visible at 30/60/90 % scroll. |
| 4 | brand fit | 8 | playbook §3 order present (what+where, rooms, inclusions, spot, reviews, practicalities, contact). Auditor `above_fold` asks for trust; the rating first appears in "Staying longer", ~8 phone screens down (calm brief allows it, but it is the funnel target). |
| 5 | copy | 9 | Passed copy unchanged; added interface words only ("Pool view", "No view in the name", question labels). Practicalities live inside four collapsed `<details>`. |
| 6 | accessibility | 9 | axe: 0 violations. 26 tap targets, 0 under 44 px. Keyboard: 27 stops, wraps, visible focus on all but the Rosa iframe. Skip link, `lang=en`, headings H1→H2→H3. Reduced motion: photograph visible, no canvas. |
| 7 | security + delivery | 10 | 0 third-party requests on load; Rosa iframe `loading=lazy`, one frame request only after scrolling to it, reserved 500 px; JS-off shows "See today's forecast for Kabalana on Rosa". Fonts self-hosted, 0 root-absolute URLs, lowercase filenames, nothing secret. |

check-design (facts, not taste): ok, 0 problems / 0 warnings; Pinyon Script headings, Work Sans body, ground `rgb(244,245,248)`, 0 all-caps labels.

## v2 — interactive ("Pick your view")

```
mode: quick   round: 1   variant: interactive
total: 72.2 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 8 | As calm: −1 "Sun 21 Sep" (Monday), −1 value-for-money omitted. Chooser counts verified by tapping each chip (live text "5 of 12 … Pool", "6 … Garden", "3 … both", "3 … kitchen", "5 … four or more"). |
| 2 | mobile + perf | 9 | All budget lines met (310 KB, LCP 1524 ms). 390: header → balcony photo → name → button → 9.3/5.0 ratings in the first screen; chip row scrolls sideways ("Own kitch…" cut at the edge, by design). |
| 3 | booking CTA | 10 | Header "Check dates" → `booking.engine_url` in 1 tap. "Choose dates first" panel: GET form submitted → `…the-lavish-haven.html?checkin=2026-11-12&checkout=2026-11-15&group_adults=2&no_rooms=1&group_children=0`. JS off: 17 visible booking links. Bar visible at every scroll stop. |
| 4 | brand fit | 9 | Trust (both ratings with date) and the action on the first screen, as the auditor recommends; rooms filterable directly under it. |
| 5 | copy | 9 | Passed copy; interface words only (chip labels, count line). |
| 6 | accessibility | 9 | axe 0; 0 tap targets under 44 px; keyboard 30 stops, wraps; panel button has `aria-controls`; focus indicator missing only on the Rosa iframe. |
| 7 | security + delivery | 10 | As calm (0 third-party on load, lazy Rosa frame, JS-off fallback link, self-hosted fonts, relative URLs). |

check-design: ok; Bodoni Moda headings, Hanken Grotesk body, aqua ground `rgb(227,240,241)`, 0 all-caps labels.

## v2 — unique ("Do not disturb")

```
mode: quick   round: 1   variant: unique
total: 73.7 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts row "2 min to Kabalana · Check in until 00:00 · Check out any hour · 9.3 / 10, 34 reviews" each with its source line — all match. −1 value-for-money omitted from the category line. No forecast (concept), so no fixture label. |
| 2 | mobile + perf | 9 | Smallest page (199 KB, LCP 420 ms). Early scroll CLS 0.004 from the phone bar arriving — under 0.01. 390: the tag (name, tagline, stay note, two buttons) fills the first screen, night pool print below it. |
| 3 | booking CTA | 10 | Tag front "Check dates on Booking.com" / header → engine URL, 1 tap. Back of tag: `#tag-back` is `inert` + `aria-hidden` until flipped, focus moves to the arrival field, submit → same dated Booking.com URL as interactive. JS off: 13 visible booking links. |
| 4 | brand fit | 8 | §3 order present. The rating is not on the first screen (facts row on screen 2); no Rosa forecast (allowed per concept, `concepts.md`). |
| 5 | copy | 9 | Passed copy; interface words ("Turn back", deck key). |
| 6 | accessibility | 9 | axe 0; 0 small tap targets; keyboard 23 stops, all with a visible indicator; back face inert when hidden. Esc on the flipped tag not tested. |
| 7 | security + delivery | 10 | 0 third-party requests at any point (no embeds); self-hosted fonts; relative URLs. |

check-design: ok; EB Garamond throughout, ground `rgb(245,246,244)`, 0 all-caps labels.

---

## Earlier round (comparison only, not gated)

Same dossier, so the same facts table applies. Failures found:

- **Rating 9.2/10** on all three pages, against the dossier's 9.3 (refreshed 2026-09-25, after these mockups were built),
  and **no capture date** on the rating block (playbook §6). Rubric: a contradicting fact = hard fail.
- **interactive:** "The pool is in the middle of the hotel, and most evenings that is where people end up." — no dossier
  entry; `sites/the-lavish-haven/copy/review.md` row 11 already marked it unsourced. Hard fail.
- **unique:** the WebGL band titles the rooms section "**Nine doors**" (canvas only, from `data-label`); the dossier lists
  12 room types. Hard fail. On the phone the band occupies about the bottom fifth of every screen under the booking bar.
- interactive + unique: header CTA opens a drawer → **2 taps** to the engine (auditor target 1); with JS off the first
  booking link is at 13,123 px / 8,925 px. calm: header CTA is `#book`, but a Booking.com button is on the first phone screen.
- calm + unique carry Rosa's widget with **no site-drawn headline and no plain-link fallback** with JS off.
- interactive + unique load their script from a root-absolute `/_astro/…` path with an uppercase filename — breaks from a
  subfolder or `file://`.
- Accessibility: axe colour-contrast 28 nodes (interactive, 4.15:1), 4 nodes + 1 unfocusable scroll region (unique);
  16 / 4 / 4 tap targets under 44 px; calm has 7 of 11 keyboard stops with no visible focus indicator; 120–140 words
  under 14 px on each page (unique uses 10 px).
- check-design: all three FAIL (images from 1024 px sources drawn 1440 px full-bleed: 6 / 2 / 3); default-look warnings
  (Instrument Serif + Inter + cream ground + 23 caps labels; Fraunces + Inter Tight + 36 caps labels; Inter Tight + 26 caps labels).

| # | dim (weight) | calm | interactive | unique |
|---|---|---|---|---|
| 1 | facts (20) | 2 | 1 | 1 |
| 2 | mobile + perf (15) | 8 | 8 | 6 |
| 3 | booking CTA (15) | 9 | 6 | 6 |
| 4 | brand fit (5) | 8 | 8 | 7 |
| 5 | copy (10) | 8 | 5 | 6 |
| 6 | accessibility (8) | 6 | 5 | 5 |
| 7 | delivery (7) | 8 | 8 | 7 |
| | **total / 80** | **51.9** | **41.6** | **38.4** |

---

## Result

| variant | new round score (/80, dims 1–7) | earlier round score (/80, dims 1–7) | hard fails |
|---|---|---|---|
| calm | 71.7 | 51.9 | new: none · earlier: rating 9.2 vs dossier 9.3, undated rating |
| interactive | 72.2 | 41.6 | new: none · earlier: 9.2 rating; unsourced "most evenings" claim |
| unique | 73.7 | 38.4 | new: none · earlier: 9.2 rating; "Nine doors" vs 12 room types |

Quick-mode gates owned by the critic (no hard fail; dims 1, 3, 7 ≥ 6): all three v2 mockups pass. The round still needs
dimension 8 ≥ 8 from both visual critics.

The one sentence the human needs: all three v2 pages are under 0.5 MB with 0 third-party requests and book in one tap;
only interactive shows the rating on the first screen, and calm and interactive print the forecast time as "Sun 21 Sep",
which was a Monday.

**What the designer prompt got wrong:** it lets the designer write the Rosa time label by hand from the fixture, and two
of three pages printed "Sun 21 Sep, 20:30" for `2026-09-21T20:30+05:30`, a Monday; the label should be formatted from
the timestamp (`Intl.DateTimeFormat`, `timeZone: 'Asia/Colombo'`), never typed. It also does not say that a row of
platform category scores is shown complete or not at all — all three dropped the lowest one (value for money 9.1) —
and it does not tie the first screen to the auditor's `above_fold` list, so calm and unique left the rating
(`above_fold: trust`) off the first screen.

## Screenshots (http, deleted after the round)

- v2 calm 390: frame 0 two overlapping prints (pool from above, balcony blind), script name, blue button; frames 2–4 the
  room list grouped by view, restacked; frame 13 Rosa widget beside the headline; every frame has the bar. 1440: 12 frames,
  hero = small blind print + large pool print + script name; ochre field behind the rooms list.
- v2 interactive 390: frame 0 balcony-over-pool photo, name, orange button, both ratings; frame 1 "Pick your view" chips;
  1440: aqua reading half + photo filling the right 45 %, photo changes per section.
- v2 unique 390: frame 0 white tag on a hook with name, stay note, two buttons; frames 2–5 room tags in pale blue/green/
  sand; 1440: night pool print beside the tag; room deck travels sideways in a pinned run.
- earlier calm/interactive/unique 390: night-pool hero with caps labels; interactive hero repeats over 3 frames (pinned);
  unique has a WebGL title band ("The Lavish Haven", "Where it is", "Nine doors", "The wave") under the bar on every frame.
