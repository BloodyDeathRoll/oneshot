# critic 4f (quick) round 3 — the-lavish-haven-v2 · run 2026-10-lk-surf-01 · 2026-10-20

critic 0.4.3 · rubric 0.3.1 · dimensions 1–7 only (max 80); dimension 8 is the visual critics'. Same method as
`critic-4f.md` and `critic-4f-r2.md`, on the designer's round-3 pages (notes.md rounds 8–9; `dist/index.html` last
written 18:20 / 18:29 / 18:29 IDT; every measurement below is later).

## Method

- `tools/audit-mockup.mjs the-lavish-haven-v2 <variant>` ×3, measured 15:34–15:35 UTC (port 8980 free on the first try),
  copies in `evidence-r3/audit-*.json`; calm and interactive measured twice more for LCP. The designer's `audit.json`
  files were restored afterwards (byte-identical, checked with `cmp`).
- `tools/check-design.mjs <page> --no-shots` → `evidence-r3/check-design-*.txt`.
- `tools/shoot.mjs` over http (plain static server), 1440 + 390, `--force`; frames deleted after scoring.
- Playwright: `evidence-r3/probe.json`, `probe2.json` (JS off, CTA tap at 390, booking links at 30/60/90 % scroll, Rosa
  lazy load, axe-core 4.14 WCAG 2.0/2.1 A+AA, keyboard, rating on first screen, interactive chips + dates form, unique
  flip / Esc / dates at 390 and 1440), `sideways-390.json` (below), amenity toggle JS on/off, text-size census.
- Facts: `evidence-r3/text-*.txt` against `dossier/the-lavish-haven-v2/dossier.json`, diffed against round 2.

## Interactive at 390: no sideways scroll (confirmed)

Scrolled top to bottom in 400 px steps at 390 × 844 (touch, 2x), JS on and off: `scrollWidth` never above 390 at any
stop; `scrollTo(200, …)` leaves `scrollX` at 0; no element extends past the right edge outside an overflow-clipped
container (the slideshow and chip rows are clipped). Same result for calm and unique.

## Budget table (phone, no scroll)

| page | first load | JS ext. | fonts | largest img | LCP (3 runs) | CLS | scroll CLS early / settled | 3rd-party on load |
|---|---|---|---|---|---|---|---|---|
| budget | ≤ 1.5 MB | ≤ 300 KB | ≤ 150 KB | ≤ 300 KB | ≤ 2.5 s | < 0.1 | < 0.01 | 0 |
| calm r3 | 488 KB | 0 | 87 KB | 92 KB | 2428 / 2428 / 2420 ms | 0.0015 | 0 / 0 | 0 |
| interactive r3 | 460 KB | 0 | 61 KB | 100 KB | 2348 / 2356 / 2348 ms | 0.0004 | 0 / 0 | 0 |
| unique r3 | 323 KB | 0 | 90 KB | 55 KB | 1588 ms | 0.0005 | 0.0048 (`div#bar`) / 0 | 0 |

All lines met. Calm's LCP is 72–80 ms under its line (it was 2192 ms in r2; notes.md: two more large photographs).
0 words under 14 px at 390 and 1440 on all three.

## Changes since round 2, checked

| item | r3 |
|---|---|
| calm Rosa iframe focus (open in r2) | fixed: `.rosa-w` gets a 2 px solid outline when the frame is focused |
| interactive load CLS 0.0172 | now 0.0004 |
| unique weight (517 KB / 182 KB in r2) | 323 KB / 55 KB |
| page text | calm and interactive: no line added or dropped against r2. unique: amenities now eight + "All 25 at the hotel" on the phone; with JS off all 25 are visible and the toggle is hidden; with JS on the toggle opens all 25 |
| **unique: booking action on the first phone screen** | **regression.** At 390 × 844 the tag's "Check dates on Booking.com" starts at y = 806 (bottom ~856, cut by the screen edge), the header "Check dates" pill is `display: none` on phones, and the bar is translated 77 px below the screen until the page scrolls. So no booking action is fully visible on arrival (the 4f r3 frame 0 shows the button half cut off at the bottom). In r2 the tag buttons sat at ~480 px. With JS off the button is at 784 and fully visible. The tap itself still lands on `booking.engine_url`. |

Facts: no change in any claim; every claim matches the dossier, as in round 2 (rooms 12/12, ratings with dates, all six
category scores, quotes verbatim, stay rules, amenities 25, address, phone, booking URLs, spot, "Mon 21 Sep" forecast
label from the fixture). No mismatch, no unsourced claim.

---

## calm r3

```
mode: quick   round: 3   variant: calm
total: 77.0 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | All claims match; text identical to r2. |
| 2 | mobile + perf | 9 | Budget met, but LCP 2420–2428 ms over three runs, 72–80 ms of headroom. No overflow at 390. |
| 3 | booking CTA | 10 | First-screen "Check dates on Booking.com" (y 635 at 390) tapped → `booking.engine_url`, 1 tap. JS off: 15 booking links. 3–4 in view at each scroll stop. |
| 4 | brand fit | 9 | What + where, rating with date, action on the first screen; §3 order present. |
| 5 | copy | 9 | Passed copy; interface words only. |
| 6 | accessibility | 10 | axe 0; 0 tap targets under 44 px; keyboard 22 stops, wraps; Rosa frame focus now visible. |
| 7 | security + delivery | 10 | 0 third-party on load; Rosa frame only after scrolling to it, space reserved, JS-off link; fonts self-hosted, relative URLs. |

check-design: ok (0 / 0).

## interactive r3

```
mode: quick   round: 3   variant: interactive
total: 77.0 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | All match; chooser counts unchanged (opens on Pool: "5 of 12 …"). |
| 2 | mobile + perf | 9 | Budget met, LCP 2348–2356 ms (144–152 ms headroom); load CLS 0.0004; no sideways scroll at 390 (section above). |
| 3 | booking CTA | 10 | First-screen button (y 688) → engine URL, 1 tap; dates panel → `…?checkin=2026-11-12&checkout=2026-11-15&group_adults=2&no_rooms=1&group_children=0`. JS off: 16 booking links. |
| 4 | brand fit | 9 | Trust + action on the first screen. |
| 5 | copy | 9 | Passed copy; interface labels only. |
| 6 | accessibility | 10 | axe 0; 0 small tap targets; keyboard 26 stops, wraps; Rosa frame focus ring on its wrapper; chips `aria-pressed` + `aria-live` count. |
| 7 | security + delivery | 10 | As calm. |

check-design: ok.

## unique r3

```
mode: quick   round: 3   variant: unique
total: 75.0 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | All match. |
| 2 | mobile + perf | 9 | Lightest page (323 KB, LCP 1588 ms); early scroll CLS 0.0048 from the bar arriving (under 0.01). |
| 3 | booking CTA | 9 | Tag button and back-of-tag dates form both land on `booking.engine_url` (dated URL verified at 390); 1 tap; JS off 12 links. −1: on arrival at 390 × 844 no booking action is fully on screen (button cut at the bottom edge, header pill hidden, bar off-screen until scroll). |
| 4 | brand fit | 8 | Rating and what + where on the first phone screen, but the auditor's `above_fold: primary_action` is not met at 390 (above); no forecast (concept's choice). |
| 5 | copy | 9 | Passed copy; interface words only. |
| 6 | accessibility | 10 | axe 0; 0 small tap targets; keyboard 18 stops, all with a visible indicator; flip → focus on arrival field, Esc → back and focus on "Choose dates first" (390 + 1440); back face inert when hidden. |
| 7 | security + delivery | 10 | 0 third-party requests at any point; fonts self-hosted; relative URLs. |

check-design: ok.

---

## Result

| variant | r1 (/80) | r2 (/80) | r3 (/80) | hard fails |
|---|---|---|---|---|
| calm | 71.7 | 76.2 | 77.0 | none |
| interactive | 72.2 | 77.0 | 77.0 | none |
| unique | 73.7 | 77.0 | 75.0 | none |

Critic gates (no hard fail; dims 1, 3, 7 ≥ 6): all three pass. Dimension 8 is still the visual critics' call.

The one sentence the human needs: all three book in one tap, carry every fact correctly and stay within budget; unique's
phone first screen no longer shows a whole booking button, and calm's LCP is now 0.08 s under its 2.5 s line.

**Remaining fixes** (none blocking; this was the designer's last round)

- unique: put one booking action fully on the first phone screen — raise the tag buttons above ~790 px at 390 × 844, or
  show the bar (or the header pill) on load. Dims 3 and 4.
- calm: LCP 2.42 s leaves ~80 ms; any heavier first-screen photo crosses the playbook line. Dim 2.
- interactive: LCP 2.35 s, ~150 ms headroom. Dim 2.
- all: forecast headline still from the 21 September fixture (allowed at 4e; live JSON + 24 h stale rule at 4g).

**What the designer prompt got wrong:** the r2 change "one booking button per phone screen" (header pill hidden) assumes
the hero button is always on the first screen; unique's r3 layout pushed it to y 806 on a 844 px phone and nothing
replaced it. The rule should be "exactly one booking action fully visible on arrival at 390 × 844", checked, not
"hide the header pill".

## Screenshots (http, deleted after scoring)

- calm 390 (17 frames): pool print with blind square, script name, button, ratings; "After dark" night pool full width;
  grouped room list beside two prints; bar on every frame after the first. 1440 (15).
- interactive 390 (14): pool-and-garden hero photo, name, orange button, ratings; chips on two lines; photographs break
  the lists (night pool, blind, door); no frame wider than the screen. 1440 (9).
- unique 390 (13): night print, door-hanger tag overlapping its foot, name, ratings; the tag's booking button cut by
  the bottom edge in frame 0; bar from frame 1 on. 1440 (12): night print beside the tag; room tags three per row.
