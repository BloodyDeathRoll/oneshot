# global-surf-adventures — critic quick scorecard, post-gate mockups (station 4f)

critic 0.4.0 · rubric 0.3.0 · run `2026-09-globalsurf-02` · 2026-09-29 · mockups at `c443a84` (postcard, try-your-week, the-sign; home + `book/` each) · dimensions 1–7 only. The visual critics' reports were not opened.

Checks, same order for all three:
1. `tools/audit-mockup.mjs` (home, throttled phone).
2. `tools/shoot.mjs` over http://127.0.0.1:8981, home and `book/`.
3. Page probe on home and `book/`: video timing, reduced motion, Save-Data, full-scroll CLS, tap targets, skip link, JS off, 60-stop Tab pass.
4. Booking probe (phone): requests on load; live calls after interaction (Level 2, 1 couple, 20 Feb 2027, 7 nights); the same with `api.bookinglayer.io` blocked; hand-off URL with JS on and off. Engine navigations were aborted and recorded; the guest form was never opened.
5. `check-design.mjs`.
6. Rendered text against `copy/en.json`, facts against `dossier.json`.
7. ffprobe on every served rendition.

Evidence:
- `reports/2026-09-globalsurf-02/critic/post-r2/<variant>/{home,book}/shots/`
- `…/post-r2/<variant>{,-book}-probe.json`, `-text.txt`, `<variant>-booking.json`
- `sites/global-surf-adventures/mockups/<variant>/audit.json`

## The sentence the human needs

All three clear the critic's gates, with no hard fail.
- **postcard** and **the-sign** hand off with `start`/`end`/guests on both paths.
- **try-your-week** sends `duration=8` with JS off, which breaks the brief. In the one test it still landed on 20–27 Feb. Its hero button scrolls to the levels, so the first phone screen has no booking action.
- All three use a 7.3 s hero (under §1a's 8–20 s) and load Google Fonts.
- In all three, the slideshow dots are 28–30 px tap targets.

| variant | d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|---|
| postcard | 10 | 9 | 9 | 8 | 9 | 7 | 8 | **71.2** | none | pass (d8 pending) |
| try-your-week | 10 | 9 | 6 | 8 | 9 | 7 | 8 | **66.7** | none | pass, d3 at the floor (d8 pending) |
| the-sign | 10 | 9 | 9 | 8 | 9 | 7 | 8 | **71.2** | none | pass (d8 pending) |

## Measured

| line | target | postcard | try-your-week | the-sign |
|---|---|---|---|---|
| first load, phone, no scroll (audit.json) | ≤ 1.5 MB | 320 KB | 875 KB | 248 KB |
| LCP / CLS on load | ≤ 2.5 s / < 0.1 | 752 ms / 0.022 | 540 ms / 0.004 | 504 ms / 0.003 |
| CLS after full scroll, phone / desktop | – | 0 / 0.004 | 0 / 0.002 | 0 / 0.005 |
| booking page first load, phone (probe) | – | 739 KB | 461 KB | 1.11 MB |
| fonts | ≤ 2 families | DM Sans + Caveat (Google) | Newsreader + Mansalva (Google, ~200 KB per notes) | Bricolage Grotesque + Yellowtail (Google) |
| third-party on load (home and book) | 0 | Google Fonts only (allowed at 4e) | same | same |
| Bookinglayer requests on load (book) | 0 | **0** | **0** | **0** |
| overflow-x at 390 (home, book) | 0 | 0, 0 | 0, 0 | 0, 0 |
| skip link first, target exists | yes | ✓ both pages | ✓ both | ✓ both |

**Video**
- **Hero `vid-009e`, home:** requested after first paint. Phone: postcard +206 ms, try-your-week +203 ms, the-sign +84 ms. Desktop: +209 to +234 ms.
- **Files:** m1280 webm 1.43 MB and d1920 webm 2.63 MB. Every served file has no audio track, every MP4 is faststart, and every size is inside ≤ 2 MB (phone) / ≤ 4 MB (desktop).
- **Hero length: 7.3 s, under §1a's 8–20 s.** The dossier's `vid-009e` entry still says "~6.8 s": the hard-cut re-edit is not recorded.
- **Reduced motion and Save-Data:** 0 video requests on load and after a full scroll, on all six pages, at both widths.
- **Booking-page level clip on load:**
  - postcard: +222 ms after first paint.
  - try-your-week (−33 ms) and the-sign (−16 ms): the request goes out **before** first paint.
  - Posters are in the HTML in all three.
- **Scroll video, home, phone:** postcard 1.9 MB, try-your-week 1.2 MB, the-sign 4.2 MB (three level panels).
- **Provenance:** `vid-003e` (all three) and `vid-010c` (made by the try-your-week designer) are not in `dossier.videos[]`. Both derive from business-owned vid-003 and vid-010.

**Rosa (home, all three; one embed each):**
- Widget: `https://rosa.surf/widget/?spot=south-point&theme=light&units=metric`, lazy.
- On load: 0 Rosa requests.
- After scroll: one `rosa-data…/south-point.json` request plus the widget frame and its tiles.
- With JS off, the page shows "See today's forecast for South Point on Rosa".
- Mapping: South point → `south-point`, as `concepts.md` records.
- Headline fixtures:
  - try-your-week and the-sign match `try-your-week/src/rosa-south-point.json` (29 Sep 20:30: 0.6–0.9 m waist-high, swell 0.78 m 12 s SSW, wind 7.9 km/h cross-shore).
  - postcard reuses the 28 Sep 20:30 fixture from the rejected calm mockup.
  - 4g must make the headline live, with the > 24 h fallback.

## Booking pages (playbook §4 engine-data rule, docs/bookinglayer.md)

| check | postcard | try-your-week | the-sign |
|---|---|---|---|
| Bookinglayer calls on load | 0 | 0 | 0 |
| calls after interaction (all to `api.bookinglayer.io`) | GET check-in calendar → GET rooms → POST quote | same 3 | same 3 |
| shown after live | "Live price from the booking engine", $2,932 for the couple | same | same |
| API blocked | snapshot kept, "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." | same | same |
| hand-off, JS on | `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` | `…/level-2-rollers?start=2027-02-20&end=2027-02-27&couple=1` | `…/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27` |
| hand-off, JS off (level-2 `formaction` button) | `…?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` | **`…?female=0&male=0&couple=1&start=2027-02-20&duration=8`** | `…?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` |
| `duration` anywhere | no | **yes (JS off)** | no |
| WhatsApp prefill carries the choices | no (generic text) | no (generic text) | yes ("Level 2 – Rollers, check-in 20 Feb 2027, 7 nights, 1 couple, Mixed dorm room – 4 beds") |

- **try-your-week `duration=8`, read only:** I opened the resulting URL on the engine's product page. It landed on `/accommodation` with Sat 20 Feb → Sat 27 Feb, 7 nights, base $2,932. The same happened with the `end` URL. So it lands correctly in this one sample, but it breaks the stated rule, and the doc's `duration=7` test shows the engine corrects durations silently.
- **Home → book links:** try-your-week preselects with `?level=1|2|3`. The other two use `?level=<slug>`. Each variant matches its own reader.
- **Snapshot prices:**
  - $1,466 pp for 7 nights = `offers[].price` (fetched 28 Sep).
  - Room supplements $0, $140.04 single, $80.025 pp sharing and $418.46 = the `rooms_engine` / docs sample of 20–27 Feb 2027, labelled with the sample and "29 Sep 2026".
  - 14, 21 and 28 nights show no invented price: "Price for {n} nights on the next page" (postcard), "–" (try-your-week), "Shown on the booking page" (the-sign).
- **Zero guests (postcard, the-sign):** the total reads "Total for 1 guest $1,466" while the steppers show 0. It is a default display, not a false claim.

## Facts, copy, room galleries

- **Copy:** every rendered line on all six pages is an en.json string (normalised match) or one of these template labels:
  - "Skip to content", "Step n of 4", "Talk to us", "Visit", "Terms and conditions", "as of 29 Sep 2026".
  - Rosa headline labels.
  - the-sign's no-JS Saturday options, which come from the docs §2.1 calendar.
  - "on globalsurf.com" as a review source.
  - "Total for 1 guest" (the singular of copy `total_all`).
- **Interface labels as claims:** no label adds a claim beyond the dossier. "12 rooms", "Saturday check-in", "From $1,466 pp | 7 nights", "8.6 on Booking.com | 80 reviews | 28 Sep 2026", the deposit line and "airport pickup from $220 pp" are all passed `mockup_extras` strings. `audit.json` `facts` flags only the Rosa numbers (checked above).
- **Copyright line:** "© Global Surf Adventures" (postcard, the-sign) and "© Global Surf Lodge Kabalana" (try-your-week). Both trace to the dossier (the agency and the lodge). It is an inconsistency between variants, not a mismatch.
- **Ratings:** every 8.6 carries its count (80), source and date.
- **Room galleries** (all three use `mockup_extras.rooms[].gallery`; try-your-week and the-sign drop img-078, a duplicate frame of img-063):

  | room | photos | source in `room_photo_groups` |
  |---|---|---|
  | dorm | 063, 078, 095, 042, 050 | `groups` |
  | dorm | 064 | `shared_all_types` |
  | twin | 080, 084, 083 | `groups` (**medium** confidence; the beds contradict between Booking.com and the engine) |
  | twin | 069, 079 | `shared_all_types` |
  | deluxe | 081, 082, 041, 043, 044, 071 | `groups` |

  **Every gallery photo comes from `room_photo_groups`. The mapping is still owner-unconfirmed (`status: proposal`): flagged, not failed.**
- **Tally:** 0 mismatches and 0 unsourced claims in any variant.

---

```
mode: quick        round: 1 (post-gate)        variant: postcard (quiet)
total: 71.2 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches. Prices and supplements are dated. Room galleries come from `room_photo_groups` (owner-unconfirmed, flagged). Rosa headline is the 28 Sep fixture, labelled with its time. |
| 2 | mobile + perf | 9 | 320 KB, LCP 752 ms, CLS 0.022. Hero after paint, 1.43 / 2.63 MB. Minus: Google Fonts; hero 7.3 s. |
| 3 | booking CTA | 9 | Hero "Book package now" → `book/`. After interaction only, 3 live calls. Fallback label shown when blocked. Hand-off `start`/`end`/guests with JS on and off. Minus: WhatsApp prefill does not carry the choices; not tapped on a real phone. |
| 4 | brand fit | 8 | §3 order: video, what/where, action → levels + price → included → rooms → reviews → waves → contact. No proof point on the first screen (the calibration list forbids a rating in the hero). |
| 5 | copy | 9 | en.json verbatim; labels add no claim. |
| 6 | accessibility | 7 | Skip link, 0 alts missing, focus visible (fields through `:focus-within`), 0 video under reduced motion. Minus: **32 slideshow dots at 28×28** on the phone home; logo 128×39; "Terms and conditions" 139×22; Rosa credit 239×20 (desktop). |
| 7 | security + delivery | 8 | Static, relative, 1 lazy embed with fallback, 0 Bookinglayer requests on load. Minus: Google Fonts. |

```
mode: quick        round: 1 (post-gate)        variant: try-your-week (interactive)
total: 66.7 / 80 (d1–7)   result: pass (critic gates; d3 = 6, at the floor)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; galleries from `room_photo_groups` (flagged). |
| 2 | mobile + perf | 9 | 875 KB (lazy photos in Chrome's margin), LCP 540 ms, CLS 0.004. Minus: Google Fonts ≈ 200 KB (over 150 KB, per notes); hero 7.3 s; booking-page clip requested 33 ms before first paint. |
| 3 | booking CTA | 6 | Live layer and fallback correct. JS-on hand-off `start`/`end`. **JS-off hand-off sends `duration=8`, no `end`** (brief and docs §3: never `duration`). It landed correctly in one read-only test. **Phone first screen has no booking action:** the hero "Choose your level" goes to `#levels`, the header "Book now" is hidden until scroll, and `funnel.mjs` gives `cta_above_fold: false` (designer's declared conflict). 7 taps to the engine. |
| 4 | brand fit | 8 | §3 order and interactive brief (level stage, room viewer, stepped desk). No first-screen proof point (calibration). |
| 5 | copy | 9 | en.json verbatim. |
| 6 | accessibility | 7 | Skip link, focus visible, 0 video under reduced motion, menu traps focus and Esc closes it (from source). Minus: **~40 targets under 44 px on the phone**: dots 28×28, review-source links 86×15, Rosa credit 221×15, logo 132×40. |
| 7 | security + delivery | 8 | Same as postcard. |

```
mode: quick        round: 1 (post-gate)        variant: the-sign (bold)
total: 71.2 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; 29 Sep Rosa fixture matches; galleries from `room_photo_groups` (flagged). |
| 2 | mobile + perf | 9 | 248 KB, LCP 504 ms, CLS 0.003. Minus: Google Fonts; hero 7.3 s; 4.2 MB of level-panel video on a phone scroll; booking-page clip requested 16 ms before first paint; booking page 1.11 MB on load. |
| 3 | booking CTA | 9 | Hero "Book your week" → `book/`. Live and fallback correct. `start`/`end` on both paths (fix `c443a84` verified). WhatsApp prefill carries level, date, nights, guests and room. Minus: not tapped on a real phone. |
| 4 | brand fit | 8 | §3 order and bold brief; aqua sections capped at four. No first-screen proof point (calibration). |
| 5 | copy | 9 | en.json verbatim; the subtitle is `hero.subtitle_alt`. |
| 6 | accessibility | 7 | Skip link, `:focus-visible` rings, 0 video under reduced motion. Minus: 32 dots at 30×30; logo 128×26 (phone); steppers 40×44; Rosa credit 229×17; "Terms and conditions" 149×23. |
| 7 | security + delivery | 8 | Same as postcard. |

### check-design default-look facts (none fail)
- postcard: DM Sans (h1, body) + Caveat (h2).
- try-your-week: Newsreader (h1, body) + Mansalva (h2).
- the-sign: Yellowtail (h1, h2) + Bricolage Grotesque (body).
- All three: ground `#FFFFFF`, 0 all-caps labels, 0 labelled headings.

## Fix list (smallest first)
1. try-your-week: with JS off, send `end`. Use a check-out select as the-sign does, not the `duration` radios.
2. All: make slideshow dots, logo link, credit/source links and "Terms and conditions" ≥ 44 px hit areas. the-sign: make the steppers 44 wide.
3. try-your-week and the-sign: attach the booking-page level clip after first paint.
4. postcard and try-your-week: carry the level, dates and guests into the booking page's WhatsApp prefill.
5. try-your-week: put a booking action on the phone's first screen (the hero button to `book/`, or show the header "Book now").
6. Record `vid-003e`, `vid-010c` and the 7.3 s `vid-009e` re-cut in `dossier.videos[]`, and decide whether a 7.3 s hero is accepted under §1a's 8–20 s.
7. 4g, all: self-host the fonts; make the Rosa headline live with the > 24 h fallback.
8. Owner: confirm the room ↔ photo mapping (the twin group is medium confidence).

what the designer prompt got wrong: The brief says the hand-off uses `start`/`end` and never `duration`, but the prompt does not say how to build `end` without JavaScript. One designer shipped the `duration` radios as the no-JS path, and another needed a coordinator fix. The prompt should name the pattern: a build-time check-out select, grouped by check-in. The 44 px tap floor is also not applied to slideshow dots, which all three drew at 28–30 px.

Not tested: a real phone or GPU, Safari, axe, the engine's screens past `/accommodation`, a frame-by-frame contrast scan of the heroes, and first-load throttled numbers for the booking pages (the probe was unthrottled).

---

# Round 2

critic 0.4.0 · rubric 0.3.0 · 2026-09-29 · mockups at `7d2bad2` (post-gate fix round; HEAD `2f4bd5e` changes only usage.jsonl) · dimensions 1–7 only. The visual critics' reports were not opened.

Checks: the same as round 1, in the same order, on port 8981 (the server was stopped afterwards).

Evidence:
- `reports/2026-09-globalsurf-02/critic/post-r2b/<variant>/{home,book}/shots/`
- `…/post-r2b/<variant>{,-book}-probe.json`, `-text.txt`, `<variant>-booking.json`
- `sites/global-surf-adventures/mockups/<variant>/audit.json` (overwritten)

## The sentence the human needs (round 2)

All three pass the critic's gates, with no hard fail, and all three now score 72.0.
- Every round-1 booking finding is fixed:
  - try-your-week sends `start`/`end` with JS off.
  - try-your-week's first screen now has a booking action.
  - The booking-page clips start after first paint.
  - postcard's WhatsApp prefill carries the visitor's choices.
- What remains:
  - Google Fonts on all three.
  - the-sign's phone dots are 39×44.
  - try-your-week's desktop nav links are 43 px tall.
  - `vid-010c` is not in `dossier.videos[]`.

| variant | d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | r1 | hard fails |
|---|---|---|---|---|---|---|---|---|---|---|
| postcard | 10 | 9 | 9 | 8 | 9 | 8 | 8 | **72.0** | 71.2 | none |
| try-your-week | 10 | 9 | 9 | 8 | 9 | 8 | 8 | **72.0** | 66.7 | none |
| the-sign | 10 | 9 | 9 | 8 | 9 | 8 | 8 | **72.0** | 71.2 | none |

## Measured (round 2)

| line | target | postcard | try-your-week | the-sign |
|---|---|---|---|---|
| first load, phone, no scroll (audit.json) | ≤ 1.5 MB | 474 KB | 764 KB | 456 KB |
| LCP / CLS on load | ≤ 2.5 s / < 0.1 | 764 ms / 0.001 | 556 ms / 0.005 | 500 ms / 0.003 |
| CLS after full scroll, phone / desktop | – | 0 / 0.004 | 0 / 0.003 | 0 / 0.004 |
| booking page on load, phone (unthrottled probe) | – | 758 KB | 493 KB | 1.33 MB |
| fonts (check-design) | ≤ 2 families | DM Sans + Caveat Brush | Figtree + Water Brush | Bricolage Grotesque + Damion |
| third-party on load, home + book | 0 | Google Fonts only (allowed at 4e) | same | same |
| Bookinglayer on load (book) | 0 | 0 | 0 | 0 |
| targets < 44 px (probe, phone / desktop) | 0 | 0 / 0 | 0 / 4 nav links at 43 px tall | **9 dots 39×44** / 0 |
| skip link first, target exists; overflow-x | ✓; 0 | ✓; 0 | ✓; 0 | ✓; 0 |
| check-design | 0 problems | 0 | 0 | 0 |

**Video (ffprobe + probe):**
- **Files:** every rendition has no audio track, and every MP4 is faststart. Phone tiers are ≤ 2 MB (largest: `vid-010-m1280.webm` at 1.94 MB). Desktop tiers are ≤ 4 MB (largest: `vid-010c-d1600.webm` 3.50 MB, `vid-009e-d1920.mp4` 3.48 MB).
- **Hero `vid-009e`:** 7.3 s, now inside playbook 0.6.2's 6–20 s. The dossier records the hard-cut edit (~7.3 s).
- **Hero request after first paint:**
  - Phone: postcard +228 ms, try-your-week +197 ms, the-sign +63 ms.
  - Desktop: +221, +248 and +130 ms.
- **Booking-page level clip (round-1 finding fixed):** now after first paint, +111 to +287 ms.
  - try-your-week desktop pulls `vid-010c-d1600.webm` (3.5 MB).
  - the-sign desktop pulls `vid-010-d1920.webm` (3.2 MB).
- **Reduced motion and Save-Data:** 0 video requests on load and after a full scroll, on all six pages, at both widths.
- **Provenance:**
  - `vid-003e` is now in `dossier.videos[]`.
  - **`vid-010c` (try-your-week's crop of business-owned vid-010) is still not recorded.**

**Rosa (home, all three):**
- 0 requests on load. After scroll, one `south-point.json` request plus the widget frame.
- With JS off, the page shows "See today's forecast for South Point on Rosa".
- Headline fixtures are unchanged from round 1: postcard 28 Sep 20:30, the other two 29 Sep 20:30.

## Booking (phone; Level 2, 1 couple, 20 Feb 2027, 7 nights)

| check | postcard | try-your-week (now 3 steps) | the-sign |
|---|---|---|---|
| calls after interaction | GET calendar, GET rooms, POST quote (`api.bookinglayer.io` only) | same | same |
| live label / total | "Live price from the booking engine", $2,932 | same | same |
| API blocked | "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026.", snapshot $2,932 | same | same |
| hand-off, JS on | `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` | `…?start=2027-02-20&end=2027-02-27&couple=1` | `…?start=2027-02-20&couple=1&end=2027-02-27` |
| hand-off, JS off (level-2 button) | `…?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` | **`…?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1`** (fixed) | same as postcard |
| `duration` anywhere | no | no | no |
| WhatsApp prefill carries the choices | yes ("…about Level 2 – Rollers, Sat 20 Feb – Sat 27 Feb 2027 (7 nights), 1 couple.") | yes | yes |
| first-screen booking action (phone) | "Book package now" → `book/` | **"Book now" + "Choose your level" → `book/`** (fixed) | "Book your week" → `book/` |

## Facts and copy (round 2)

- `copy/en.json` is unchanged since round 1.
- The rendered text on all six pages still matches en.json, apart from the same template labels as round 1. try-your-week's booking page now reads "Step n of 3".
- No new label makes a claim.
- Room-gallery image ids are unchanged on every page. try-your-week's booking page dropped img-001 and img-093 (bands). They all still come from `room_photo_groups` (owner-unconfirmed; flagged, not failed).
- 0 mismatches and 0 unsourced claims.

---

```
mode: quick        round: 2 (post-gate)        variant: postcard
total: 72.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; dated prices; galleries from `room_photo_groups` (flagged). |
| 2 | mobile + perf | 9 | 474 KB, LCP 764 ms, CLS 0.001; video after paint and inside the caps. Minus: Google Fonts. |
| 3 | booking CTA | 9 | Live, fallback and `start`/`end` on both paths; the prefill carries the choices. Minus: not tapped on a real phone. |
| 4 | brand fit | 8 | §3 order. No first-screen proof point (calibration). |
| 5 | copy | 9 | en.json verbatim. |
| 6 | accessibility | 8 | 0 targets < 44 px on either page; skip link; focus visible (fields through `:focus-within`); 0 video under reduced motion. axe not run. |
| 7 | delivery | 8 | Static, 1 lazy embed with a fallback, 0 Bookinglayer requests on load. Minus: Google Fonts. |

```
mode: quick        round: 2 (post-gate)        variant: try-your-week
total: 72.0 / 80 (d1–7)   result: pass   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | As postcard. |
| 2 | mobile + perf | 9 | 764 KB, LCP 556 ms. Minus: Google Fonts; the desktop booking clip is 3.5 MB. |
| 3 | booking CTA | 9 | JS-off hand-off now `start`/`end` (round-1 blocker closed); first screen → `book/`; prefill carries the choices. Minus: not tapped on a real phone. |
| 4 | brand fit | 8 | As postcard. |
| 5 | copy | 9 | Verbatim. |
| 6 | accessibility | 8 | 0 phone targets < 44 px. Minus: the 4 desktop nav links are 43 px tall. |
| 7 | delivery | 8 | As postcard. |

```
mode: quick        round: 2 (post-gate)        variant: the-sign
total: 72.0 / 80 (d1–7)   result: pass   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | As postcard. |
| 2 | mobile + perf | 9 | 456 KB, LCP 500 ms. Minus: Google Fonts; 4.2 MB of level-panel video on a phone scroll; booking page 1.33 MB on load. |
| 3 | booking CTA | 9 | As postcard. |
| 4 | brand fit | 8 | As postcard. |
| 5 | copy | 9 | Verbatim. |
| 6 | accessibility | 8 | Skip link, focus visible, 0 video under reduced motion. Minus: 9 slideshow dots at 39×44 on the phone; Rosa's iframe has no focus ring. |
| 7 | delivery | 8 | As postcard. |

check-design default-look facts (none fail):
- postcard: DM Sans + Caveat Brush.
- try-your-week: Figtree + Water Brush.
- the-sign: Bricolage Grotesque + Damion.
- All three: ground `#FFFFFF`, 0 all-caps labels, 0 labelled headings.

fix list (not failing; smallest first):
1. the-sign: make the phone dots 44 px wide.
2. try-your-week: make the desktop nav links 44 px tall.
3. Record `vid-010c` in `dossier.videos[]`.
4. At 4g: self-host the fonts and make the Rosa headline live.
5. Owner: confirm the room ↔ photo mapping.

what the designer prompt got wrong (round 2): The prompt sets no weight rule for below-the-fold clips on desktop. Two booking pages pull a 3.2–3.5 MB desktop tier for a side-panel clip that an m1280 file would fill.

Not tested in round 2: a real phone or GPU, Safari, axe, the engine's screens past `/accommodation`, and throttled numbers for the booking pages.
