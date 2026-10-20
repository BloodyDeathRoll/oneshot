# Layday Surf Ahangama v2: critic pre-score (station 4f, quick)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · round 1 of the v2 mockups.
The prompt was assembled with `ONESHOT_RUN=2026-10-lk-surf-01 node tools/prompt.mjs critic`.

This scorecard covers dimensions 1–7 only (max 80 points). Dimension 8, visual quality, belongs to
visual-critic and experience-critic. I did not read their reports. The gate at this stage:
no hard fail, and dimensions 1, 3 and 7 each ≥ 6. Dimensions 2, 5 and 6 are reported but do not gate.
Base hard constraint 3 also applies: scroll CLS (early and settled) must be under 0.01, or the
mockup goes back to the designer.

**For comparison only (not part of the gate):** I scored the earlier round's mockups
(`sites/layday-surf-ahangama/mockups/*`, round 3 "Berth / Curtain / Inside", designer 0.3.3,
built 2026-09-22) with the same tools, widths and order, against **today's** dossier, copy and rubric.

## Method (same for all six pages, in this order)

1. `tools/audit-mockup.mjs` (throttled 390 × 844 phone: 1.6 Mbps, 150 ms, 4x CPU). It was run from a
   scratch tree that symlinks each `dist/` and `copy/`, so the designer's untracked
   `audit.json` and the committed earlier-round `audit.json` were not overwritten. Copies are in
   `evidence/new-<variant>.audit.json` and `evidence/earlier-<variant>.audit.json`. I ran v2 unique
   three times to confirm its scroll shift.
2. `tools/shoot.mjs` at 1440 × 900 and 390 × 844. For v2, the shared `shots/` were reused because
   the build fingerprint was unchanged. The earlier round was shot into a scratch folder, read, then
   deleted. I scored from the contact sheets, never from one full-page capture.
3. `tools/check-design.mjs <page> --no-shots` and `tools/check-places.mjs layday-surf-ahangama-v2`.
4. A Playwright walk over a plain static server:
   - at 390 (touch): the first-screen actions, then a tap on the persistent "Check dates", then
     arrival 2026-11-10 filled in, then the Booking.com href read back;
   - a slow scroll for the embeds, with request timing, iframe sizes and the space reserved for them;
   - at 1440: a Tab pass (focus style), then Enter on the first booking trigger, then Esc (focus return);
   - for Rosa: JavaScript on, the Rosa request blocked, and JavaScript off.
5. axe-core 4.14 (wcag2a/aa, 2.1a/aa) at 390 and 1440, after scrolling every reveal into its final state.
6. Page text (1440) diffed line by line against `sites/<slug>/copy/en.json`. Every number and claim
   on the page was traced to `dossier/layday-surf-ahangama-v2/dossier.json`.
7. `dist/` grep: no uppercase filenames, no `localhost`, home paths or root-absolute `src`, no secrets,
   no external `<script src>`.

There is no `dossier/layday-surf-ahangama-v2/audit.json`, so there is no `recommended` funnel target.
The designer also lists this as a gap. The primary action was checked against `dossier.booking.path`
(`engine`, Booking.com) instead.

## Summary

| variant | new round (1–7, /80) | earlier round (1–7, /80) | hard fails (new) | hard fails (earlier, today's dossier) |
|---|---|---|---|---|
| calm | **71.5** (pass on 1–7) | 44.4 | none | facts: Hostelworld 9.8 (dossier 10), non-Google address, "improvers … when the swell is up", "Rates move with the season" |
| interactive | **72.7** (pass on 1–7) | 44.4 | none | same four facts |
| unique | **64.7** (**back to designer**: scroll CLS 0.031) | 41.6 | none | same four facts |

"Pass on 1–7" means no hard fail, and dimensions 1, 3 and 7 are each ≥ 6. The final result also
needs dimension 8 from both visual critics.

The earlier round scored 90.5 / 84 / 85.5 out of 100 on 2026-09-22 (critic 0.3.1). Its facts
matched the dossier as it stood that day. Since then:
- the dossier was re-read on 2026-09-25 (Hostelworld 9.8 → 10/10);
- the Google-address rule arrived on 2026-09-23 (playbook §6);
- the copy was rewritten at 4a, removing the old page's phrasing (`copy/review.md` l. 36).

So today the earlier pages fail on facts. That is the copy and dossier moving on, not a design defect.

### Playbook §4 budget, measured (390 phone, throttled, no scroll)

| line | target | v2 calm | v2 interactive | v2 unique | earlier calm | earlier interactive | earlier unique |
|---|---|---|---|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 771 KB (24 req) | 417 KB (14) | 683 KB (21) | 191 KB (5) | 424 KB (9) | 328 KB (7) |
| JS (external) | ≤ 300 KB | 0 (inline) | 0 (inline) | 0 (inline) | 0 | 0 (inline) | 0 (inline) |
| largest image | ≤ 300 KB | 84 KB | 70 KB | 87 KB | 86 KB | 90 KB | 86 KB |
| fonts | ≤ 2 fam, ≤ 150 KB | Pilcrow Rounded, 63 KB | Libre Franklin + Yellowtail, 48 KB | Boska, **196 KB (+30 %)** | Urbanist, 28 KB | Urbanist | Urbanist, 28 KB |
| LCP | ≤ 2500 ms | 1256 | 612 | 2364 (2356–2364 over 3 runs) | 576 | 1580 | 596 |
| CLS (load) | < 0.1 | 0 | 0.0007 | 0.0001 | 0.0013 | 0.0015 | 0.0007 |
| scroll CLS early / settled | < 0.01 | 0.0003 / 0 | 0.0004 / 0 | **0.0311–0.0318** / 0 | **0.318** / 0 | **0.275** / 0 | **0.732** / 0 |
| third-party hosts on load | 0 (font CDN tolerated at 4e) | api/cdn.fontshare.com | fonts.googleapis/gstatic | cdn.fontshare.com | Google Fonts | Google Fonts | Google Fonts |

- **v2 unique scroll shift.** 0.0309 at y = 5400, at about 2.4 s, source `section#wave.sec.wave`. It
  coincides with the late Boska faces arriving: the first-load LCP is 2.36 s, the same moment.
  The designer's notes record "early 0", which I could not reproduce.
- **Earlier round scroll shifts.** calm: `section.s.built` / `section.s.door`. interactive:
  `section.door` / `section.built`. unique: 0.589 at y = 0 from `div#wall` plus 0.143 at `blockquote.beth`.
  This check did not exist on 2026-09-22.
- **Fontshare.** `agents/critic/tools.md` names only Google Fonts as expected at 4e. I treated
  Fontshare as the same case: a font CDN at 4e, which is a full-mode defect, and **not** a hard fail.
  I deducted for it under dimension 7. Shahar may rule the other way. If he does, v2 calm and v2
  unique hard-fail on "third-party request on first load".

---

## v2 calm: "Samples" · 71.5 / 80 (1–7)

```
mode: quick   round: 1   variant: calm
total (1–7): 71.5 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 33 page lines are not verbatim in the copy. All are labels, splits, or traced: <br>• ratings Hostelworld 10/10 (10), Booking.com 10/10 (6), Google 5.0/5 (15), "read 25 September 2026" = `reviews.*` refreshed `fetched_at` 2026-09-25 <br>• address "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka" = `location.address` (playbook §6 capitalisation) <br>• plus code = `location.plus_code` <br>• check-in 14:00–19:00 / out by 14:00 = `stayInfo` <br>• Taiya's "I was only supposed to stay a night … ended up here a week." = first sentence of `reviews.quotes[0]`, verbatim <br>• Kabalana / The Rock line = copy, which matches the dossier spot value <br>• reviewer names, countries and dates = `reviews.quotes` <br>`audit.facts` unmatched numbers: "25", "5.0", "2026." (date and score, traced above). 0 mismatches, 0 unsourced. No bed count, price or season shown (dossier gaps). |
| 2 | mobile + perf | 9 | Every budget line is inside (table above). Worst line: first-load transfer at 50 %. Scroll CLS 0.0003 / 0. The 390 contact sheet (`shots/mobile-sheet.png`, frames 00–19) shows no horizontal overflow and no overlap. The fixed foot bar ("Check dates" red, "Call") sits over content at every stop, as playbook §3 requires. |
| 3 | booking CTA | 9 | First screen at 390: "Call +94 77 855 3343" pill, plus the foot bar "Check dates" (52 px tall). Tapping the foot bar scrolls to `#book` and focuses `#arrival`. Filling 2026-11-10 shows "Leaving Fri 13 Nov". The Booking.com link becomes `https://www.booking.com/hotel/lk/layday-surf-ahangama.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=1&no_rooms=1&group_children=0`: dossier `booking.engine_url` exactly, plus the dates. Hostelworld, Agoda and `tel:+94778553343` match the dossier character for character. With JS off, 5 booking links stay in `#book`. −1: hero to engine is 2 taps plus a date pick, and there is no funnel target to measure against. |
| 4 | brand fit | 7 | Playbook §3 is present: what + where, rating and booking on the first screen; room; included items; reviews; location; practicalities; contact footer. Against custom.md: <br>• only one family, Pilcrow Rounded (custom.md asks for a text face plus an expressive display face; declared as a concept conflict) <br>• first screen is a split mosaic, not a full-bleed photograph <br>• the spot section ("The wave") comes after Guests and Practicalities, later than §3 item 4 <br>• slideshow with dots is present; booking with dates is inside the page <br>`check-design`: 0 problems, 0 warnings. Ground `#FFFFFF`, no all-caps labels. |
| 5 | copy | 9 | The words are copy/en.json (passed 4c), plus interface labels ("The berth", "The lockers", "Arrival", "Nights", "Leaving"). No filler added. English complete. |
| 6 | accessibility | 8 | axe: 0 violations at 390 and 1440. 49 images, 0 missing alt (30 decorative, empty alt). Skip link present. `lang="en"`. Tab focus is a 3 px solid ink outline on every stop. Reduced motion: no canvas, photograph visible. There is no drawer, so Esc does not apply. −2: 14 of 39 tap targets are under 44 px, e.g. review-source links "Hostelworld" 72×16, gallery dots 28×44, brand mark 350×26. |
| 7 | security + delivery | 8 | Static, inline JS, relative URLs, lowercase filenames. No localhost or secrets. No embeds. 0 non-font third-party requests on load and after a full scroll. −2: fonts come from `api.fontshare.com` and `cdn.fontshare.com`, outside the Google-Fonts exception in tools.md. They must be self-hosted at 4g. |

**For the human:** quietest of the three. All budget lines are inside, the lightest after interactive
on LCP, and it has no third-party embed (no Rosa, no map). The display face is the single family
Pilcrow Rounded.

**Top 3 fixes:**
1. Self-host Pilcrow Rounded (now two Fontshare hosts on first load).
2. Bring the 14 tap targets to ≥ 44 px: citation links, gallery dots, brand mark.
3. Move "The wave" (spot) ahead of Guests and Practicalities, per playbook §3 item 4.

---

## v2 interactive: "One room" · 72.7 / 80 (1–7)

```
mode: quick   round: 1   variant: interactive
total (1–7): 72.7 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Same traced set as calm: ratings, dates, address, plus code, stay times, reviewers. Rosa headline "0.7–1.1 m chest-high · Swell 1.3 m at 12.6 s from the south · Wind 7 km/h from the west, cross-shore · For Monday 21 September 2026, 20:30 (Rosa, updated … 19:55)" is the 4e fixture, labelled with its own date. Spot id `kabalana` in the headline credit and in the widget `spot=`, per concepts.md. `audit.facts` unmatched: 5.0, 25, 0.7, 1.1, 1.3, 12.6, 21, 20:30, 19:55, all ratings, dates or Rosa fixture values. 0 mismatches. |
| 2 | mobile + perf | 9 | Every line inside budget; fastest LCP of the six pages (612 ms). Scroll CLS 0.0004 / 0. 390 sheet: no overflow. On the first screen, the pinned title "Just one dorm" (h1, 72–177 px) sits over the portrait, with the foot bar visible. Two font families, 48 KB. |
| 3 | booking CTA | 9 | Tapping the foot bar "Check dates" opens `dialog#sheet` with `#arrival` focused. After the date: "Leaving Friday 13 November", and both Booking.com links carry `?checkin=2026-11-10&checkout=2026-11-13&…` on the exact dossier URL. Hostelworld, Agoda and tel match the dossier. With JS off, 4 links stay in `#book`. −1: same 2 taps plus date, no funnel target. |
| 4 | brand fit | 8 | §3 order present: "The place" summary, room with slideshow and dots, finding the door with map, guests, the wave with Rosa, practicalities, visit card. Against custom.md: a text face plus a script display face (Yellowtail) for section titles only, which matches; raspberry booking colour with white text; slideshow with dots. −2: the first screen is a big title plus portrait on a coloured ground, not a full-bleed photograph. The pinned run's release repeats the sentence and button (designer's own conflict). |
| 5 | copy | 9 | copy/en.json words (one panel line swapped to another verbatim copy sentence, which the designer declared), plus labels. |
| 6 | accessibility | 8 | axe: 0 violations at 390 and 1440. 17 images, 0 missing alt. Skip link present. Focus outline 3 px. Dialog: Enter opens it with focus on `#arrival`; Esc closes it and focus returns to the "Check dates" trigger. Reduced motion: no canvas, photograph visible. −2: 17 of 42 tap targets under 44 px (gallery dots 28×44, brand mark 165×23, citation links). |
| 7 | security + delivery | 9 | Two embeds, the playbook maximum. **OSM map**: first request at scrollY 4000, iframe 350×263 in a 263 px reserved box, plain "Open in Google Maps" fallback. **Rosa widget**: `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, 350×500 in a 500 px box. Its JSON request (`rosa-data-opal.vercel.app/data/spots/kabalana.json`) is made by the widget. 0 requests before scroll. Scroll CLS unchanged. With JS off: 0 iframes and the plain link "See today's forecast for Kabalana on Rosa". With Rosa blocked: the same link. Static, relative, lowercase, no secrets. −1: Google Fonts at 4e (self-host at 4g). Not measured: both embeds' total weight against the budget. |

**For the human:** fastest page of the six (LCP 612 ms). It carries both embeds the playbook
allows (map plus Rosa). It is the only v2 page with a second, script display face, as custom.md asks.

**Top 3 fixes:**
1. Wire the Rosa headline to the per-spot JSON, with the 24 h rule, before 4g. It is still the
   21 September fixture, and the JS-off and blocked paths show those dated numbers above the link.
   Also confirm that the `sandbox` attribute added to Rosa's iframe is acceptable under the
   "embedded exactly as Rosa ships it" rule.
2. Bring the 17 tap targets to ≥ 44 px.
3. Self-host Libre Franklin and Yellowtail.

---

## v2 unique: "Name in plaster" · 64.7 / 80 (1–7) · back to the designer

```
mode: quick   round: 1   variant: unique
total (1–7): 64.7 / 80   result: fail — scroll CLS ≥ 0.01 (base hard constraint 3)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Same traced set. Beth's lead line "… I extended my stay way longer than expected and didn't want to leave …" is a verbatim fragment of `reviews.quotes` (Beth), with ellipses, and her full quote follows. Rosa fixture as in interactive. 0 mismatches. |
| 2 | mobile + perf | 5 | **Scroll CLS early 0.0311 / 0.0318 / 0.0311** over three runs, ≥ 0.01, source `section#wave.sec.wave` at about 2.4 s. **Fonts 196 KB** from seven preloaded Boska faces on `cdn.fontshare.com`: one budget line over, by 30 %. LCP 2364 ms, at 95 % of budget. 390 sheet: no overflow. On the first screen the room print takes the top half, the h1 "Layday" sits at 502–626 px, and the foot bar is visible. |
| 3 | booking CTA | 9 | Tapping the foot bar opens the yellow field in place, scrolls it to the top 153 px, and focuses `#arrival`. Closed-field controls are `inert` (verified). After the date: "Leaving Friday 13 November", and Booking.com carries the dates on the exact dossier URL. Hostelworld, Agoda and tel match the dossier. With JS off, the field shows open with 4 plain links. −1 as calm. |
| 4 | brand fit | 7 | §3 order present: band of room prints and name, the walk, finding the door, the dorm, guests, the wave, practicalities, call. Against custom.md: one family (Boska roman and italic), no text-face/display-face split, declared; no script. The first screen is an edge-to-edge band of three prints, which is the closest of the three to full bleed. Slideshow with dots is present. Booking is inside the page. |
| 5 | copy | 9 | copy/en.json words plus labels. |
| 6 | accessibility | 7 | axe: **1 serious, `definition-list`**: a `<dl>` has `div > a` direct children (Finding the door facts), at 390 and 1440. 15 images, 0 missing alt (1 decorative). Skip link present. Focus outline 3 px. Panel: Enter opens it with focus on `#arrival`; Esc closes it and focus returns to the trigger. 17 of 38 tap targets under 44 px (plate dots 32×44, "Hostelworld" 84×19). |
| 7 | security + delivery | 8 | One embed (Rosa): first request at scrollY 4800, 350×500 in a 500 px box. With JS off and with Rosa blocked: the plain link. 0 non-font third-party requests on load. Static, relative, lowercase, no secrets. −2: Fontshare fonts outside the Google-Fonts exception at 4e. |

**For the human:** unique is 196 KB of fonts (30 % over budget), and its page jumps once while
scrolling (0.031 at the wave section), so it goes back to the designer before the pick.

**Top 3 fixes:**
1. Remove the early-scroll shift at `section#wave` (0.031 → < 0.01). It lines up with the late Boska
   faces, so a fallback face that matches Boska's metrics for every weight used there would likely fix it.
2. Cut Boska to ≤ 150 KB: fewer faces or a subset, self-hosted. This also pulls LCP back from 2.36 s.
3. Fix the `<dl>` markup in Finding the door (axe serious), and bring the 17 tap targets to ≥ 44 px.

---

## Earlier round (comparison only), against today's dossier, copy and rubric

All three share one set of facts and copy, so dimensions 1 and 5 are the same for each.

**Dimension 1, facts: 2 for all three.** **Hard fail** on four points:
- (a) Hostelworld "9.8/10" against `reviews.hostelworld.rating` 10 (re-read 2026-09-25).
- (b) Address "'Warnagiri' Welhengoda, Ahangama, Sri Lanka". That is the Hostelworld form, which the
  dossier marks "not to be used on the site". Playbook §6 requires the Google listing address with
  its postcode.
- (c) "a sandy beach break that suits beginners and **improvers**, with The Rock reef alongside it
  **when the swell is up**". The dossier says "beginners and intermediates … The Rock reef A-frame
  for advanced surfers". "When the swell is up" has no entry.
- (d) "Rates move with the **season**". `season.value` is null, a gap.
- Also, the page states "Every category on Hostelworld sits at 10 out of 10" next to an overall 9.8.

**Dimension 5, copy: 5 for all three.** The text is a pre-4a-rewrite copy. Phrases that the 4a
rewrite removed ("about as close to the wave as you can sleep", "Guests keep saying so", "that is
deliberate", "nobody checking in at three in the morning") are still on all three pages
(`copy/review.md` l. 36).

| # | dimension | calm "Berth" | interactive "Curtain" | unique "Inside" |
|---|---|---|---|---|
| 1 | facts (20) | 2: see above | 2 | 2 |
| 2 | mobile + perf (15) | 6: all load lines inside budget (191 KB, LCP 576 ms), scroll CLS 0.318 | 6: 424 KB, LCP 1580 ms, scroll CLS 0.275 | 5: 328 KB, LCP 596 ms, scroll CLS 0.732 (0.589 at y = 0, `div#wall`). The 390 frame 01 is a yellow box with no text |
| 3 | booking CTA (15) | 8: Hostelworld, Booking.com, Agoda and tel are identical to the dossier. Foot bar → `#book` plain links. No dates carried | 8: "Check dates" goes straight to Hostelworld. Links identical | 8: same as interactive |
| 4 | brand fit (5) | 5: §3 order present. Against custom.md: one family (Urbanist), ruled lines and a bordered card, underlined text links for booking actions, no slideshow | 5: same, plus curtain lines over the print | 4: same, plus the first screen is a drawn box with no photograph |
| 5 | copy (10) | 5: see above | 5 | 5 |
| 6 | accessibility (8) | 7: axe at 390 `scrollable-region-focusable` ×2. 9 targets under 44 px. Skip link present. Focus outline 2 px | 7: axe ×3, 13 targets under 44 px | 6: axe ×2, 14 targets under 44 px, no skip link |
| 7 | delivery (7) | 9: Google Fonts only (4e), static, relative | 9: Rosa lazy (scrollY 5600), 500 px reserved, link fallback | 9: Rosa lazy (scrollY 7200), reserved |
| | **total (1–7)** | **44.4 / 80** | **44.4 / 80** | **41.6 / 80** |

`check-design` on all three earlier pages: 0 problems, 0 warnings. Ground `#E8E9F0` (a light
lavender grey), Urbanist throughout, 0 all-caps labels.

---

## Default-look facts (`check-design`, reported per hard constraint 4)

| page | display / body face | ground | all-caps labels | labelled headings |
|---|---|---|---|---|
| v2 calm | Pilcrow Rounded / Pilcrow Rounded | `#FFFFFF` | 0 | 0/9 |
| v2 interactive | Libre Franklin (h1), Yellowtail (h2) / Libre Franklin | `#FFFFFF` | 0 | 0/12 |
| v2 unique | Boska / Boska | `#FFFFFF` | 0 | 0/9 |

`check-places`: 0 borrowed images. All images are business-owned Booking.com photos, per the notes,
and no beach frame is captioned as Kabalana.

## Station check

Each v2 `notes.md` has 3 first-screen rounds and 3 whole-page rounds in its look-log, and each round
names a visible change. The per-round shots are not on disk, because shots are deleted after each
round, so I could not compare the sheets of successive rounds.

## What the designer prompt got wrong

- **Fonts are not budget-checked before hand-off.** Designer 0.6.1 let a concept bring a non-Google
  font CDN (Fontshare: calm and unique) and preload seven faces (unique: 196 KB, 30 % over the
  playbook §4 font line).
- **Its own scroll-CLS figure was wrong.** The unique notes say "early 0". The audit measures 0.031
  at `section#wave` in three runs, at the moment the late faces land.
- **Tap targets.** Every page ships citation links and gallery dots under 44 px, and nothing in the
  designer's hand-off checks counts them (14 / 17 / 17).
- **Rosa headline is static.** It is the 21 September fixture in every v2 page, and JS-off shows
  those dated numbers above the plain link. That is acceptable at 4e but must be wired with the 24 h
  rule at 4g.

A one-line hand-off check would catch the first three: `audit.json` `bytes_fonts ≤ 150 KB`, scroll
early CLS < 0.01 re-measured after the last font change, `tapables_under_44px == 0`. Plus a rule
that 4e fonts come only from Google Fonts, or self-hosted.

Fix list (unique only; smallest first): `<dl>` markup → tap targets → Boska ≤ 150 KB self-hosted →
scroll shift at `#wave` < 0.01.

## Evidence

- `reports/2026-10-lk-surf-01/layday-surf-ahangama-v2/evidence/{new,earlier}-{calm,interactive,unique}.audit.json`
- Contact sheets read: `sites/layday-surf-ahangama-v2/mockups/<variant>/shots/{desktop,mobile}-sheet.png`
  (shared; frames were already removed; the sheets are left for the parallel visual critics) and the
  earlier-round sheets (scratch, deleted after reading).
  - v2 calm mobile frame 00: white top with h1 and tagline, then the photo mosaic, then the red foot bar.
  - v2 interactive frames 00–01: yellow grounds behind a pinned "Just one dorm" while the portraits change.
  - v2 unique frame 00: room print, then the yellow field with "Layday".
  - v2 unique frame 11: the Rosa box reserved, with only the fallback link under `file://`.
