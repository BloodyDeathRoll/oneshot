# Layday Surf Ahangama v2: critic pre-score, round 2 (station 4f, quick)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · the three v2 mockups
after the designer's round 2 (`notes.md` § "Round 2"). Round 1 is in `critic-4f.md` and stays as
it is.

This scorecard covers dimensions 1–7 only (max 80). Dimension 8 belongs to visual-critic and
experience-critic. The gate at this stage:
- no hard fail;
- dimensions 1, 3 and 7 each ≥ 6;
- scroll CLS (early and settled) under 0.01, per base hard constraint 3.

## Method

Same order and widths as round 1, everything over http.

1. **`tools/audit-mockup.mjs`**, run twice per variant from the scratch tree (symlinked `dist/` and
   `copy/`), so no tracked file and no designer `audit.json` were written. Copies:
   `evidence/r2-<variant>.audit.json`.
   - **Port problem.** The tool always binds port 8980, and the parallel critics' audits held that
     port. My first calm and interactive runs therefore exited without writing anything. I reran them
     after checking that `audit.json`'s `measured_at` had changed. All six runs below are fresh, and
     each pair matched.
2. **`tools/shoot.mjs`** against my own static server (1440 × 900 and 390 × 844). Frames went to a
   scratch folder: read, then deleted. 0 console errors, no capture truncated.
   - Page heights: calm 7828 / 9283 px, interactive 9161 / 10522 px, unique 7354 / 8196 px.
3. **`tools/check-design.mjs --no-shots`** and **`tools/check-places.mjs`**.
4. **Playwright walk.**
   - At 390 (touch): the first-screen actions and horizontal overflow; a tap on the foot-bar
     "Check dates"; arrival set to 2026-11-10; the Booking.com href read back; Esc, then focus return.
   - At 1440 with the keyboard only: Enter on "Check dates", date, 30 Tabs (does focus leave the
     sheet?), Esc.
   - A slow scroll recording every third-party request and the iframe boxes.
   - The Rosa block with JavaScript off and with Rosa blocked.
5. **axe-core 4.14** (wcag2a/aa, 2.1a/aa) at 390 and 1440, reduced motion, after scrolling.
6. **Page text** at 1440 diffed line by line against `copy/en.json`, then every claim traced to the dossier.
7. **The live Rosa headline** checked against `rosa-data-opal.vercel.app/data/spots/kabalana.json`
   (`generated_at` 2026-10-20T08:26:40Z).

## Result

| variant | r1 score (1–7, /80) | r2 score (1–7, /80) | hard fails (r2) | result (1–7) |
|---|---|---|---|---|
| calm | 71.5 | **76.5** | none | pass (dimension 8 pending) |
| interactive | 72.7 | **74.3** | none | pass (dimension 8 pending) |
| unique | 64.7 (back: scroll CLS 0.031) | **74.3** | none | pass (dimension 8 pending) |

Hard-fail list, checked for each variant and empty for all three:
- No fact contradicts the dossier, and every claim has a dossier entry.
- Every booking href is identical to the dossier character for character. Booking.com only adds
  `?checkin=…&checkout=…&group_adults=1&no_rooms=1&group_children=0`.
- No non-business image (`check-places`: 0 borrowed).
- **0 third-party requests on first load.** All fonts are now self-hosted. This removes round 1's
  Fontshare question.
- No keyboard trap.
- All content is DOM text.
- No budget line over.
- No secrets or internal URLs.

### Playbook §4 budget (390 phone, throttled, no scroll; two identical runs each)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 600 KB (19 req) | 361 KB (13) | 551 KB (18) |
| JS external | ≤ 300 KB | 0 (inline) | 0 (inline) | 0 (inline) |
| largest image | ≤ 300 KB | 72 KB | 41 KB | 85 KB |
| fonts | ≤ 2 fam, ≤ 150 KB | Pilcrow Rounded + Caveat, 82 KB | Libre Franklin + Yellowtail, 42 KB | Boska + General Sans, 56 KB |
| LCP | ≤ 2500 ms | 1368 | 1228–1232 | 1260–1276 |
| CLS (load) | < 0.1 | 0 | 0 | 0 |
| scroll CLS early / settled | < 0.01 | **0 / 0** | **0.0065 / 0** (`div.footbar`, `a.btn.btn-plain` at 513 ms, y = 0) | **0.0058 / 0** (`section#door` at ~670 ms, y = 675) |
| third-party on load | 0 | 0 | 0 | 0 |
| tap targets < 44 px | — | 0 / 38 | 0 / 41 | 0 / 36 |

Compared with round 1:
- unique fonts went from 196 KB to 56 KB;
- unique LCP went from 2364 ms to about 1265 ms;
- unique scroll CLS went from 0.031 to 0.0058;
- the 14 / 17 / 17 small tap targets are now 0 / 0 / 0.

---

## calm: "Samples" · 76.5 / 80 (r1 71.5)

```
mode: quick   round: 2   variant: calm
total (1–7): 76.5 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 36 lines are not verbatim in the copy. All are labels or splits of traced facts: <br>• Hostelworld 10/10 (10), Booking.com 10/10 (6), Google 5.0/5 (15), "Each read 25 September 2026" = `reviews.*` refreshed 2026-09-25 <br>• plus code and Google address = `location.*` <br>• 14:00–19:00 / by 14:00 = `stayInfo` <br>• reviewer names, countries and dates = `reviews.quotes` <br>• Taiya's first sentence verbatim <br>• the amenity list, now joined with " \| ", = copy amenities <br>`audit.facts` unmatched: 25, 5.0, 2026. 0 mismatches. |
| 2 | mobile + perf | 10 | Every line inside budget (worst: transfer at 39 %). Scroll CLS 0 / 0. `scrollWidth` − viewport = 0 at 390. Sheet frames show no overlap. First screen at 390: h1 (72–147 px), tagline, rating, "Check dates" and "Call" at 293 px, the berth photograph, foot bar at 782 px. |
| 3 | booking CTA | 9 | Foot-bar tap opens `dialog#sheet` (`showModal`) with the arrival input focused. Arrival 2026-11-10 → the sheet's Booking.com href carries `checkin=2026-11-10&checkout=2026-11-13`. Hostelworld, Agoda and `tel:+94778553343` match the dossier. Esc closes, focus returns to "Check dates". JS off: 5 booking links in `#book`. −1: hero to engine is still 2 taps plus a date, and there is no `dossier/…/audit.json` funnel target. |
| 4 | brand fit | 8 | Playbook §3 order is now right: the room, then the door, then **the wave before Guests and Practicalities**. Matches custom.md: a text face plus the Caveat script for section titles only; teak `#75421B` booking colour with white text; slideshow with 44 px dots; booking inside the site. −2: the first screen is a statement beside two photographs, not a full-bleed photograph (custom.md). |
| 5 | copy | 9 | copy/en.json words plus interface labels. English complete. |
| 6 | accessibility | 10 | axe 0 at 390 and 1440. 41 images, 0 missing alt (23 decorative). Skip link to `#main-top`. Focus is a 3 px solid outline. Modal sheet: focus stayed inside for 30 Tabs at both widths, Esc returns it. 0 tap targets under 44 px. Reduced motion: no canvas, photograph visible. |
| 7 | security + delivery | 10 | 0 third-party requests on load and after a full scroll (no embeds). Fonts self-hosted from `dist/fonts/` (`../make-fonts.sh`). Static, inline JS, relative URLs, lowercase filenames, no secrets. |

**Remaining fixes (none gating):**
1. Two separate date choosers: the sheet's, and the one in the `#book` section. Only the one
   the visitor fills carries dates into Booking.com, so the other's link stays plain.
2. The first screen is not full-bleed (custom.md). This is for the pick.
3. `font-display: optional`: on a first visit over a slow link the fallback face can stay for the
   whole visit (the designer declared this trade-off).

## interactive: "One room" · 74.3 / 80 (r1 72.7)

```
mode: quick   round: 2   variant: interactive
total (1–7): 74.3 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Same traced set as calm. **Rosa headline is now live.** It reads "0.9–1.3 m chest-high · Swell 1.3 m at 14.6 s from the south · Wind 14 km/h from the west, cross-shore · Now: Tuesday 20 October at 14:30, Kabalana time". The JSON's `current` says t 14:30+05:30, h [0.9, 1.3], "chest-high", swell 1.32 m / 14.6 s / 191.6°, wind 14.4 kph / 270° / "cross-shore". It matches. The 24 h guard (`generated_at`) is in the script. The 21 September fixture is gone. `audit.facts` unmatched: 5.0, 25. |
| 2 | mobile + perf | 9 | Every line inside budget. Fastest transfer of the three (361 KB). Scroll CLS 0.0065 early (the foot bar and a plain button moving at 513 ms, at y = 0). That is under 0.01 but not 0. No overflow at 390. |
| 3 | booking CTA | 9 | Foot bar → `dialog#sheet` (`showModal`), `#arrival` focused. After the date, both Booking.com links carry the dates. Hostelworld, Agoda and tel are identical. Esc returns focus. JS off: 4 links in `#book`. −1 as calm. |
| 4 | brand fit | 8 | §3 order present. Matches custom.md: Libre Franklin plus the Yellowtail script for titles; raspberry booking colour with white text; a room row with 44 px dots; Guests on berth yellow. The pinned run no longer repeats the hero text on release. −2: the first screen is a title plus portrait on a coloured ground, not full-bleed. |
| 5 | copy | 9 | copy/en.json words plus labels. The Rosa fallback wording ("Wave height, swell and wind for Kabalana, from Rosa's forecast. See today's forecast for Kabalana on Rosa") is interface. |
| 6 | accessibility | 10 | axe 0 at both widths. 16 images, 0 missing alt. Skip link present. 3 px focus outline. Modal sheet: focus contained for 30 Tabs, Esc returns it. 0 tap targets under 44 px. |
| 7 | security + delivery | 9 | 0 third-party requests on load. Two embeds, the playbook maximum. **OSM map**: first request at scrollY 4000, iframe 350×263 in a 263 px box, plain "Open in Google Maps" fallback. **Rosa**: one page request to the per-spot JSON, plus the widget `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, 350×500 in a 500 px box. The widget makes its own JSON, font and arcgis tile requests inside its frame. JS off and Rosa blocked: no numbers, only "See today's forecast for Kabalana on Rosa". Fonts self-hosted. −1: Rosa's iframe carries a `sandbox` attribute (`allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin`). That is not in the "embedded exactly as Rosa ships it" spec; it needs a yes from Shahar or Rosa. |

**Remaining fixes:**
1. The 0.0065 foot-bar shift at first paint: reserve the bar's final size before the face loads.
2. Confirm or drop the `sandbox` attribute on Rosa's iframe.
3. The first screen is not full-bleed (custom.md). This is for the pick.

## unique: "Name in plaster" · 74.3 / 80 (r1 64.7)

```
mode: quick   round: 2   variant: unique
total (1–7): 74.3 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Same traced set. Beth's ellipsised lead line is a verbatim fragment. Live Rosa headline as interactive, matching the JSON. `audit.facts` unmatched: 5.0, 25. |
| 2 | mobile + perf | 9 | Every line inside budget. Fonts 56 KB (was 196). LCP about 1.27 s (was 2.36). **Scroll CLS 0.0058 early** (`section#door`, y = 675, about 670 ms), settled 0: under the 0.01 line. Round 1's 0.031 at `#wave` is gone. No overflow at 390. First screen: room print, then the yellow field with h1 "Layday" (428–550 px), then the foot bar. |
| 3 | booking CTA | 9 | Phone: the foot bar raises the yellow field as a bottom sheet (`#book.panel.open`), with the page behind made `inert` and arrival focused. After the date, the Booking.com links carry the dates. Hostelworld, Agoda and tel are identical. Esc closes, focus returns. Closed-panel controls are `visibility: hidden` and inert. JS off: field open with 4 plain links. −1 as calm. |
| 4 | brand fit | 8 | §3 order present. Matches custom.md: a readable text face (General Sans 17–19 px) plus the Boska display face for the name and titles; booking inside the site's yellow; slideshow dots; a guests row with dots. The first screen is an edge-to-edge band of three room prints, the nearest of the three to full bleed. −2: the band is not one full-bleed photograph, and the page leans on the name. |
| 5 | copy | 9 | copy/en.json words plus labels. |
| 6 | accessibility | 10 | axe 0 at both widths (round 1's `definition-list` is fixed). 15 images, 0 missing alt. Skip link present. 3 px focus outline. Phone sheet: inert background, Esc returns focus. 0 tap targets under 44 px. At 1440 the field opens in place, not as a modal, so Tab continues into the page. That is not a trap. |
| 7 | security + delivery | 9 | 0 third-party requests on load. One embed (Rosa): page JSON request at scrollY 4400, then the widget; 350×500 in a 500 px box. JS off and blocked: link only. Fonts self-hosted. −1: the same Rosa `sandbox` attribute as interactive. |

**Remaining fixes:**
1. The 0.0058 early-scroll shift at `section#door`: it passes, but it is the largest of the three.
2. Confirm or drop the `sandbox` attribute on Rosa's iframe.
3. At 1440 the opened booking field does not keep focus. Consider sending focus back to the trigger
   when Tab leaves the field, so the panel does not stay open behind the visitor.

---

## Default-look facts (`check-design`, hard constraint 4)

| page | h1 / h2 / body | ground | all-caps labels | labelled headings | problems / warnings |
|---|---|---|---|---|---|
| calm | Pilcrow Rounded / Caveat / Pilcrow Rounded | `#FFFFFF` | 0 | 0/10 | 0 / 0 |
| interactive | Libre Franklin / Yellowtail / Libre Franklin | `#FFFFFF` | 0 | 0/12 | 0 / 0 |
| unique | Boska / Boska / General Sans | `#FFFFFF` | 0 | 0/9 | 0 / 0 |

## What the designer prompt got wrong

Round 2 fixed every gating item from round 1, so the prompt did not cause a defect this round.
- **Over-optimistic self-check.** The designer's notes claimed "tap targets under 44 px: 0" and
  scroll CLS figures. Both are reproduced here, but in round 1 the same self-check was wrong
  (0 against 0.031). The hand-off still trusts one `audit-mockup` run measured while other audits
  may hold port 8980.
- **Tool port.** `tools/audit-mockup.mjs` binds a fixed port (8980) and fails silently with
  parallel critics. I lost two runs to it before rerunning. Worth a proposal: a free port per
  invocation, and an explicit error when the port is in use.

## Housekeeping

- No commit, no ledger line, no edits to mockups, custom.md or tools.
- Scratch screenshots deleted. The shared `shots/` sheets were not touched.
- `git status` shows `tools/check-places.mjs` modified: a fork fallback for `<slug>-v2`, file time
  14:10. That change predates and is not from my runs. The tools I ran do not write to it, so I left
  it alone.
- Evidence: `evidence/r2-{calm,interactive,unique}.audit.json`.
