# global-surf-adventures-v2 — critic quick scorecard (station 4f)

critic 0.4.2 · rubric 0.3.1 · run `2026-10-globalsurf-03` · 2026-10-17 · round 1. This card scores dimensions 1–7 only. Dimension 8 belongs to visual-critic and experience-critic, and their reports were not opened.

Every mockup got the same checks in the same order:
1. `tools/shoot.mjs` into each mockup's shared `shots/`. The build had changed, so it re-shot: 1440×900 and 390×844, scrolled per viewport.
2. `tools/audit-mockup.mjs`, each on its own static server.
3. Critic probe over http (plain static server): first paint against network timing; reduced motion; Save-Data; full scroll at both widths; JavaScript off (home page and `/book/`); Rosa request origin; Rosa blocked; CLS across the scroll.
4. Full Tab pass at both widths, plus dialog focus tests.
5. Scripted booking walk at 390 px, with engine navigation intercepted (nothing was booked).
6. Page text compared with `copy/en.json` and `dossier.json`.
7. `ffprobe` on the hero renditions.
8. `tools/check-design.mjs --no-shots`.

Evidence is in `reports/2026-10-globalsurf-03/critic/`:
- `<v>-audit.json`: the audit-mockup output, moved here so that nothing was written under `sites/`.
- `<v>-probe.json`, `<v>-probe2.json`, `<v>-tab.json`, `<v>-book-tab.json`.
- `<v>-text.txt`: the rendered text at 390 px after a full scroll.

## The sentence the human needs

All three clear the critic's gates: no hard fail, and dimensions 1, 3 and 7 are all ≥ 6. They differ on these facts:
- **unique** loads GSAP from cdn.jsdelivr.net when you scroll near the drop. With Rosa, that makes 2 third-party embeds, the playbook limit. Its fonts are 156 KB, over the 150 KB line. Its pinned drop logs a scroll-time CLS of about 1.0, and its Rosa headline shows a forecast from 29 Sep.
- **interactive** has no skip link on the home page. Its phone menu lets keyboard focus escape behind the open sheet.
- **calm** and **unique** credit two testimonials with no source.

## Summary

| variant | d1 facts (20) | d2 perf (15) | d3 CTA (15) | d4 fit (5) | d5 copy (10) | d6 a11y (8) | d7 delivery (7) | total /80 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|---|
| calm | 9 | 9 | 9 | 8 | 9 | 8 | 8 | **70.0** | none | pass (d8 pending) |
| interactive | 10 | 9 | 9 | 8 | 9 | 6 | 8 | **70.4** | none | pass (d8 pending) |
| unique | 9 | 6 | 9 | 8 | 9 | 7 | 7 | **64.0** | none | pass (d8 pending) |

Totals are Σ score × weight ÷ 10 over dimensions 1–7 (max 80). The orchestrator adds dimension 8.

## Measured (playbook §4 budget, 390×844 throttled, no scroll — audit.json unless noted)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer (video excl.) | ≤ 1.5 MB | 442 KB | 590 KB | 654 KB |
| JS | ≤ 300 KB | inline in 66 KB HTML | inline in 98 KB HTML | inline in 87 KB HTML; GSAP + ScrollTrigger from jsdelivr only near the drop (not in first load) |
| fonts | ≤ 2 families, ≤ 150 KB | Figtree + Kalam, 41 KB | Plus Jakarta Sans + Sacramento, 23 KB | Literata + Parisienne, **152 KB (156,128 B)** |
| largest image | ≤ 300 KB | 70 KB | 155 KB | 82 KB |
| LCP | ≤ 2.5 s | 492 ms | 492 ms | 488 ms |
| CLS (load) | < 0.1 | 0.0038 | 0.0008 | 0.0056 |
| CLS across full scroll (probe2) | — | 0 (phone) / 0.005 (desktop) | 0 / 0.003 | **1.25 / 1.03** |
| third-party on load | 0 | 2 (Google Fonts, allowed at 4e) | 2 (same) | 2 (same) |
| overflow-x at 390, whole scroll | 0 | 0 | 0 | 0 (also `/book/` pages: 0) |

**Unique scroll CLS.** The Layout Instability API logs two shifts of about 1.0. Both are on `#droppin` and fall at the ScrollTrigger pin's start and end, with the previous rect at 0 height. A wheel-scroll test sampled the position of `#lodge` every 40 px and found no visible jump in the content that follows. It is the pin switching to and from `position: fixed`, but field CLS (CrUX) would record it as "poor".

**Video (probe + ffprobe).**
- Poster first. The hero video request goes out after first contentful paint:
  - calm: +86 ms on the phone (FCP 208 → 294 ms), +85 ms on desktop
  - interactive: +191 / +181 ms
  - unique: +87 / +217 ms
- Under reduced motion and under Save-Data (header plus `navigator.connection.saveData`), none of the three made a video request, on load or after a full scroll.
- Hero renditions:
  - calm: phone 1.30 MB webm, desktop 2.48 MB webm / 3.59 MB mp4, 7.96 s
  - interactive: phone 1.44 MB, desktop 2.72 MB, 7.4 s
  - unique: phone 1.14 MB, desktop 2.06 MB, 7.0 s
  - All are video-only (no audio stream), inside ≤ 2 MB / ≤ 4 MB, and ≥ 6 s.
- Level clips load only on scroll or on Play, at 0.4–0.8 MB each.

**Rosa / embeds (hard constraint 9).**
- Mapping: dossier "South point" → `south-point`, as `concepts.md` §6 records. It never uses `kabalana`.
- Widget: all three use `https://rosa.surf/widget/?spot=south-point&theme=light&units=metric`, in a 350×500 box at 390 px, not restyled.
- Lazy load: nothing from Rosa is in the first load. After scroll, the widget frame appears plus exactly one JSON request (`rosa-data-opal…/south-point.json`, made from inside the iframe) and the widget's own Inter/arcgis sub-requests. The site's own headline is inlined and makes no request.
- CLS with the widget loaded: 0 on the phone (calm, interactive).
- JavaScript off: all three show "See today's forecast for South Point on Rosa".
- Rosa requests blocked: only the credit link "Forecast for South Point by Rosa" remains as text, and the reserved box shows the failed frame. The playbook says "never an empty box", so the same gap is noted for all three.
- Headline vs fixture:
  - calm: matches `calm/src/rosa-south-point.json`, 16 Oct 20:30: 0.4–0.6 m knee-high, 6.9 s from 186°, 4.3 km/h onshore. It hides itself after 24 h.
  - interactive: same values, from a live fetch with no checked-in fixture.
  - unique: matches the **run-02 fixture of 29 Sep**: 0.6–0.9 m waist-high, 12 s, 193°, 7.9 km/h, 267° cross-shore. It is shown dated "Tue 29 Sep, 20:30", 17 days old. Fixtures are accepted at 4e; at 4g it must be live with the > 24 h fallback.
- Embed count:
  - calm: 1 (Rosa)
  - interactive: 1 (Rosa)
  - unique: 2, Rosa plus the GSAP scripts from cdn.jsdelivr.net (playbook §4: "any iframe or script from another origin"). GSAP is lazy, is not requested under reduced motion, and the page falls back to a static two-up with JavaScript off. That is at the limit, not over it.

**Booking walk (390 px touch, rubric 0.3.1 `booking_flow`: class engine, clicks_to_flow ≤ 1, taps to engine ≤ 8).**

| | hero CTA (above fold at 390) | taps hero → engine hand-off | hand-off URL (engine intercepted) | JS off |
|---|---|---|---|---|
| calm | "Book package now" @429 px → `book/` (1 tap) | 5: hero · Next · Next · Sat 24 Oct · Continue booking | `…/en/product/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0` | `book/` GET form, check-in/check-out date fields + 3 per-level submits |
| interactive | "Book package now" @449 px → `book/` (1 tap) | 7: hero · Next · Next · Sat 24 Oct · +1 woman · Next · Continue booking | `…/en/product/level-1-fomies?start=2026-10-24&female=1&end=2026-10-31` | `book/` GET form with `duration`, 3 per-level submits |
| unique | "Book package now" @451 px → `#book` drawer (1 tap) | 2: hero · Continue booking (defaults: Level 1, first Saturday, 1 woman) | `…/en/product/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0` | in-page `#book` GET form, 3 per-level submits |

- Engine product bases match `booking.engine_products` character for character.
- WhatsApp is `wa.me/972523593240` (`contact.whatsapp`) with a prefill that names the business. tel is `+97299733943` and mail is `info@globalsurf.com`.
- interactive calls `api.bookinglayer.io` (availability, rooms, items) only after the visitor interacts on `book/`. Its first load and scroll make no engine request, which fits the playbook's booking-engine rule.
- No variant was tapped through the live engine UI.

**Default-look facts (check-design, never failing).**
- calm: Figtree + Kalam, ground #FFFFFF, 0 all-caps labels
- interactive: Plus Jakarta Sans + Sacramento, ground #FFFFFF, 0
- unique: Literata + Parisienne, ground #FFFFFF, 0
- All three: 0 problems, 0 warnings.

## Facts table (copy/en.json passed 4c; checked here: what the pages show vs copy and dossier)

| claim on page | dossier key | calm | interactive | unique |
|---|---|---|---|---|
| $1,466 pp, 7 nights, ×3 levels; "base price … 28 September 2026" | `offers[0..2].price` 1466 USD, fetched 2026-09-28 | match | match | match |
| 8.6 Booking.com, 80 reviews, 28 Sep 2026 (all rating blocks) | `reviews.booking` 8.6/10/80, 2026-09-28 | match | match | match |
| Staff 9.5, Facilities 9.2, Cleanliness 9.2 | `reviews.booking.categories` | match | match | match |
| twin +$140 pp one guest / +$80 pp two sharing; deluxe +$418 pp; dorm included; "sample 20–27 Feb 2027, engine 29 Sep 2026" | `rooms_engine[].supplement_samples` (140.04 / 160.05 per couple / 418.46), fetched 2026-09-29 | match | match | match (in drawer) |
| airport pickup from $220 pp, not included | `offers[0].package_items_engine` "Airport pickup / drop off" price_from 220 | match | match | match |
| up to 6 guests per booking; 7/14/21/28 nights from a Saturday | `offers[].max_guests_per_booking` 6, `duration_options` | match | match | match |
| 40 % deposit, rest 45 days before; full if < 45 days | `booking.deposit_terms` | match (book page) | match (book page) | match (drawer) |
| inclusions list (7 nights, 7 breakfasts, 5 dinners, 5 guided/coached sessions of 2 h, 5 theory, equipment, walk/ride, excursion, water, coffee/tea) | via en.json `lessons[].includes` | match | match | match |
| check-in 14:00–20:00, check-out by 11:00 | `stayInfo.checkIn/checkOut` | match | match | match |
| address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address` (Google, capitalised per §6) | match | match | match |
| 40 m / 350 m / 400 m / 4 km / 3.9 km (Booking.com) | `location.distance_to_beach.others` | match | match | match |
| The Rock and South Point | `location.spot` | match | match | match |
| Saturday lists | interactive and unique: the 1-female choosable snapshot in `docs/bookinglayer.md` (past dates dropped); calm: the next 12 Saturdays, not an availability claim | — | match | match |
| testimonials | `reviews.quotes` / en.json `testimonials` | 9/9 verbatim | 9/9 verbatim | 6/6 verbatim |
| Seagallas and Dana Amsalem-Cohen credits | en.json `source: other`, globalsurf.com | **no source shown** | "on globalsurf.com" | **no source shown** |
| Rosa headline | the mockup's fixture (above) | match | match | match (29 Sep fixture) |
| template labels ("Book package now", "Choose this room", "Not sure? Ask us", prefills, "Nothing is booked until you check out there") | interface; no checkable claim | — | — | — |

- No mismatches and no unsourced claims in any variant.
- audit `facts` flagged only Rosa numbers (0.4/0.6/20:30/0.85/6.9; 0.6/0.9), all traced above.
- Two lines in unique join copy paragraphs: "The three surf weeks cost the same, per person for seven nights, from a Saturday." Both halves are in the copy; no new claim.
- All three omit the same gaps: season, staff languages, reply time, Google count and team.

---

```
mode: quick        round: 1        variant: calm
total: 70.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table: 0 mismatches; 9/9 quotes verbatim; prices and supplements dated. Minus: the Seagallas and Dana Amsalem-Cohen quotes carry a name and **no source** (`calm-text.txt` l.136, l.142; playbook §6 needs the source). |
| 2 | mobile + perf | 9 | 442 KB first load, LCP 492 ms, CLS 0.0038 (0 across the full scroll on the phone), 2 families 41 KB, largest image 70 KB. Hero video +86 ms after FCP; 1.30 / 2.48 MB; no audio. overflow-x 0 on home and `book/`. Minus: Google Fonts (4e allowance). |
| 3 | booking CTA | 9 | The hero "Book package now" is above the fold at 390 px and opens `book/` in 1 tap. Engine hand-off in 5 taps (≤ 8), engine class, product URLs char-for-char. JS-off GET form works. WhatsApp and tel are secondary. Per-level "Choose Level N" → `book/?level=N`. Minus: the WhatsApp prefills name the business and the Freestylers package but never the visitor's level. Not tapped through the live engine. |
| 4 | brand fit | 8 | §3 order present: media + what + action → levels with price → included → lodge → rooms → waves + Rosa → reviews → closing → contact. Persistent phone bar "From $1,466 pp \| 7 nights · Book now" (`shots/mobile-01…17`). Calm brief: stills first, clips on Play. Minus: no proof point on the first screen (the rating first appears one scroll down, `mobile-03`). |
| 5 | copy | 9 | Page text is en.json verbatim except template labels. Minus: the two source-less credits. |
| 6 | accessibility | 8 | Skip link. Tab pass: 86 stops at 1440 and 79 at 390, all with a visible ring. The phone menu keeps focus inside and returns it to Menu on Esc (probe2). Reduced motion: poster only, 0 video. Alt on 36/36 images. Minus: 39 targets under 44 px (28×28 carousel and review dots, level tabs 82×40, phone bar "Book now" 111×42). 4 focusable carousel DIVs have no accessible name. axe not run (quick). |
| 7 | security + delivery | 8 | Static; relative paths; lowercase; 1 embed (Rosa), lazy, with reserved space and JS-off link; no secrets. Minus: Google Fonts on load (a hard fail at full mode). When Rosa is blocked the reserved box shows the failed frame, with only the credit link as fallback. |

what the designer prompt got wrong: The review-credit rule still lets a `source: other` testimonial ship as a bare name. This was the same miss in run 02, then as "· review". Nothing makes the designer show the rating (the §3 first-screen proof point) on the first screen when the hero is a full-bleed video.

top fixes (not failing; for 4g, smallest first):
1. Name "globalsurf.com" on the Seagallas and Dana credits.
2. Put the 8.6 / 80 / date proof on the first screen.
3. Make the carousel dots and level tabs ≥ 44 px, and name the focusable carousel DIVs.
4. Name the chosen level in the WhatsApp prefill.
5. Self-host the fonts.
6. Show the plain Rosa link, not the failed frame, when the widget is refused.

---

```
mode: quick        round: 1        variant: interactive
total: 70.4 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table: 0 mismatches. 9/9 quotes verbatim, each with its source ("on Booking.com" / "on globalsurf.com"). Both rating blocks carry count + date (`interactive-text.txt` l.36, l.139–141). Rosa numbers match the 16 Oct live response quoted in notes.md. |
| 2 | mobile + perf | 9 | 590 KB first load, LCP 492 ms, CLS 0.0008 (0 across the phone scroll), 2 families 23 KB, largest image 155 KB. Hero +191 ms after FCP; 1.44 / 2.72 MB; no audio. overflow-x 0. Minus: Google Fonts. |
| 3 | booking CTA | 9 | The hero "Book package now" is above the fold at 390 px and opens `book/` in 1 tap. Engine hand-off in 7 taps (≤ 8, but the closest of the three to the limit), engine class, URL char-for-char. JS-off form uses `duration`. Live engine API only after interaction. Minus: the dates step's "Next" does nothing until a guest is added, and nothing on screen says so (the walk stalled there until +1 woman). |
| 4 | brand fit | 8 | §3 order present; the rating sits right under the level reel. Interactive brief: snap reel, level switch + compare, pool wipe, room mosaics with galleries, stepped booking page with a ticket. Persistent phone bar. |
| 5 | copy | 9 | en.json verbatim; template labels plain. |
| 6 | accessibility | 6 | Alt 31/31; 72-stop Tab pass with visible rings. Room gallery opens on "Close photos" and Esc returns focus to its opener. Reduced motion: poster only. Minus: **no skip link** on the home page (Tab starts on the logo; audit's `has_skip_link` is a false positive). **Phone menu does not hold focus**: 19 of 25 Tabs after opening land on the page behind the open sheet. The level reel (`DIV.reel`, tabindex) has **no focus ring**. On `book/` at 390 px the header WhatsApp link is **icon-only with no accessible name** (`.hd-wa span{display:none}`, no aria-label). 32 targets under 44 px: review dots 20×44, source links ~91×18, "Rosa" 33×18. |
| 7 | security + delivery | 8 | Static, relative, lowercase, no secrets. 1 embed (Rosa), lazy, reserved, JS-off link. Engine API only on interaction. Minus: Google Fonts on load; the Rosa-blocked box shows the failed frame. |

what the designer prompt got wrong: The skip link and modal-focus rules are not enforced per page. interactive is the only variant without a skip link, and its full-screen menu sheet does not trap focus. The tool check does not catch either, because `audit-mockup.mjs` counts any `href="#…"` as a skip link and tests only `[data-open-drawer]` drawers. The "≥ 44 px tap targets" rule is not applied to dots, inline source links or icon-only header buttons.

top fixes (not failing; for 4g, smallest first):
1. Add an aria-label to the icon-only WhatsApp link on `book/`.
2. Add a skip link.
3. Give the reel a visible focus style.
4. Trap focus in the phone menu sheet while it is open.
5. Explain or preselect 1 guest on the dates step.
6. Raise review dots and source links to ≥ 44 px.
7. Self-host the fonts.

---

```
mode: quick        round: 1        variant: unique
total: 64.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table: 0 mismatches; 6/6 quotes verbatim. Minus: the Seagallas and Dana credits carry **no source** (`unique-text.txt` l.110, l.116). The Rosa headline is the run-02 fixture dated "Tue 29 Sep, 20:30", 17 days old; it is labelled with its date, and fixtures are accepted at 4e. |
| 2 | mobile + perf | 6 | 654 KB first load, LCP 488 ms, CLS 0.0056 at load. Hero +87 ms after FCP; 1.14 / 2.06 MB; no audio. **Fonts 156,128 B, over the 150 KB line** (rubric: one budget line over = 4–6). **CLS across the scroll 1.25 (phone) / 1.03 (desktop)**, from the ScrollTrigger pin toggling `#droppin` (probe2 + wheel test); no visible content jump was measured, but field CLS would be "poor". DCL 1,428 ms, the slowest of the three. |
| 3 | booking CTA | 9 | The hero "Book package now" is above the fold at 390 px and opens the `#book` drawer in 1 tap. Engine hand-off in 2 taps (≤ 8), engine class, URL char-for-char. JS-off in-page GET form with per-level submits. The desktop drawer opens on "Close booking", traps focus (0 of 25 Tabs left it), and Esc returns focus to "Choose Level 2". Minus: the hand-off defaults to 1 woman and the first Saturday if the visitor changes nothing. `/book/` is a hash drawer at 4e; notes.md defers the real page to 4g. |
| 4 | brand fit | 8 | §3 order present. The unique brief and scroll set-piece are present (the drop: img-062 → img-026 → img-005 with `featureLine`; static two-up under reduced motion and with JS off). Persistent phone bar. Minus: **no navigation at all on phones**: no menu button, and the header holds only the logo (`shots/mobile-00…19`, and probe2's menu test found nothing). |
| 5 | copy | 9 | en.json content; two lines join copy sentences without adding a claim. Minus: the source-less credits. |
| 6 | accessibility | 7 | Skip link (→ `#levels`). 57-stop Tab pass with rings. Drawer focus is correct (above). Reduced motion: no GSAP request, no video, static plates. Alt on 46 images (17 empty, decorative). Minus: the header "Book now" is **focusable while invisible** at the top of the desktop page (1239,16, opacity 0). Every guest stepper is labelled only "One less" / "One more", without the guest type. 19 targets under 44 px (30×30 dots, room-name tabs 187×38). 2 focusable DIVs have no name. |
| 7 | security + delivery | 7 | Static, relative, lowercase, no secrets. Minus: **GSAP 3.13.0 + ScrollTrigger from cdn.jsdelivr.net**, a third-party script that is not self-hosted. It is lazy (not in first load) and absent under reduced motion; with Rosa it makes 2 embeds, the playbook §4 limit. Also Google Fonts on load, and the Rosa-blocked box shows the failed frame. |

what the designer prompt got wrong: Designer 0.5.0 allows the scroll set-piece's library "from the CDN at 4e". Nothing in the brief or the self-check counts that CDN script against playbook §4's two-embed limit or the "assets self-hosted" line. No check measures CLS during the pinned scroll: `audit-mockup.mjs` does not scroll, so a pin that logs CLS ≈ 1.0 passes every tool. The font budget is not checked at 4e, so a serif plus a script face reached 156 KB unseen. The scroll playbook's pinning pattern should name a pin type that does not log layout shifts, and the self-check should read CLS after a full scroll.

top fixes (not failing; for 4g, smallest first):
1. Name "globalsurf.com" on the two credits.
2. Remove the invisible header "Book now" from the tab order until it shows.
3. Label the steppers with the guest type.
4. Add phone navigation (or state in concepts.md that the phone has none).
5. Subset or self-host Literata + Parisienne under 150 KB.
6. Vendor GSAP (the plan already says ≈ 45 KB gz at 4g).
7. Make the pin stop logging layout shifts, and re-measure CLS across the scroll.
8. Wire the Rosa headline live with the > 24 h fallback.

---
---

# Round 2 — critic quick scorecard (station 4f)

critic 0.4.2 · rubric 0.3.1 · 2026-10-17 · round 2, on the build in commit 23f7563 (4e round 2 rework). Dimensions 1–7 only. The visual-critic and experience-critic reports were not opened.

The checks were the same as in round 1, in the same order, at the same viewports. All of them ran over http on a plain static server.
1. Shots: the shared `shots/` sets in each mockup were made after the last `dist/` edit, and their page heights match a fresh http shoot (calm 10,455 / 11,701 px, interactive 11,143 / 13,170, unique 13,091 / 14,419). I reused them and read the sheets from the http re-shoot, because interactive's and unique's shared sets were shot over file://, where Rosa does not render.
2. `tools/audit-mockup.mjs`, moved to `critic/<v>-audit-r2.json` so nothing was left under `sites/`.
3. Probe 1 (`<v>-probe-r2.json`): FCP vs. hero-video request; overflow over the whole scroll; third parties on load and after scroll; reduced motion; Save-Data; JS-off home and `/book/`; rendered text (`<v>-text-r2.txt`).
4. Probe 2 (`<v>-probe2-r2.json`): Rosa request origin; CLS across the full scroll; Rosa blocked; Tab pass; dialog focus tests.
5. Full Tab pass at 1440 and 390 (`<v>-tab-r2.json`, `<v>-book-tab-r2.json`).
6. Scripted 390 px booking walk with engine navigation intercepted (nothing booked).
7. `ffprobe` on the hero renditions.
8. `check-design --no-shots`.
9. The quotes compared with `copy/en.json`.

## The sentence the human needs (round 2)

All three still clear the critic's gates (no hard fail; d1, d3 and d7 ≥ 6), and every round-1 defect that touched a gate is fixed. They now differ on these facts:
- **unique** dropped GSAP. It has 1 embed and a scroll CLS of 0 / 0.006 (was ≈ 1.0). Its fonts are 83 KB (were 156 KB). But its first load doubled to 1.01 MB, because the drop's plates load eagerly.
- **interactive** is the only one with self-hosted fonts and 0 third-party requests on load. Its booking walk is still the longest: 7 taps.
- **calm** is the only one whose first screen still carries no rating.

## Round-1 fixes re-checked

| round-1 item | calm | interactive | unique |
|---|---|---|---|
| Source on the Seagallas / Dana credits | **fixed**: "Seagallas, globalsurf.com" (`calm-text-r2.txt` l.135, 141) | was fine | **fixed**: "Seagallas \| globalsurf.com" (l.110, 116) |
| Rating proof on the first screen | **not done**: the rating first appears in `mobile-03` (4th viewport) | unchanged: under the reel (`mobile-02`) | **improved**: "8.6 on Booking.com · 80 reviews · 28 Sep 2026" directly under the hero (`mobile-01`). It is not on the 844 px first screen, which is all video |
| Tap targets ≥ 44 px | partly: 39 → 25 under 44 (dots 36×44) | 32 → 3 ("Choose Level 2/3", "Ask about dates" at 41 px tall) | 19 → 1 ("Forecast for South Point" link, 234×23) |
| Unnamed focusable DIVs / no-ring stops | **fixed**: 0 unnamed, 0 without a ring | reel ring **fixed**: 0 without a ring | **fixed**: 0 unnamed |
| WhatsApp prefill names the visitor's choice | **fixed** on `book/`: the message is rebuilt from the level, room, start date, nights and guests | n/a | n/a |
| Rosa refused → plain link, not a failed frame | **fixed**: designed plain-link card until the frame loads; blocked shows "See today's forecast for South Point on Rosa" | **fixed**: same, and the frame is inserted only after a no-cors probe succeeds | **fixed**: the frame is appended only after the JSON fetch succeeds; blocked shows the link + "Open Rosa" |
| Skip link (interactive) | — | **fixed**: "Skip to content" is the first Tab stop on home and `book/` | — |
| Phone menu traps focus (interactive) | 0/25 Tabs escape | **fixed**: focus cycles over the menu links and its Close button. The 3 "OUT" stops are the toggle, which sits outside `#sheet` but is the sheet's own Close; Esc → Menu | 0/25 escape; Esc → Menu |
| Icon-only WhatsApp on `book/` (interactive) | — | **fixed**: `aria-label="Questions? Ask us on WhatsApp"` | — |
| Dates "Next" stalls with no guest (interactive) | — | **fixed**: Next now focuses Women and shows "Add at least one guest to see your total." | — |
| Self-hosted fonts | no (Google Fonts) | **yes**: 0 third-party on load | no (Google Fonts) |
| GSAP from jsdelivr / 2 embeds (unique) | — | — | **fixed**: no GSAP; sticky stage on the page's own JS; 1 embed |
| Scroll CLS ≈ 1.0 from the pin (unique) | — | — | **fixed**: 0 phone / 0.0055 desktop over the full scroll, no shift > 0.01 |
| Fonts > 150 KB (unique) | — | — | **fixed**: 82.7 KB |
| Invisible focusable header "Book now" (unique) | — | — | **fixed**: 0 hidden stops |
| Stepper labels (unique) | — | — | **fixed**: "Add a woman / man / couple" |
| No phone navigation (calm, unique) | **fixed**: Menu sheet, focus kept, Esc returns | — | **fixed**: Menu sheet, focus kept, Esc returns |
| Rosa headline from the 29 Sep fixture (unique) | — | — | **fixed**: live JSON, made lazily from the main frame, hidden when > 24 h old. It shows "Fri 16 Oct, 20:30", inside 24 h at test time |

## Measured (playbook §4, 390×844 throttled, no scroll — audit-r2 unless noted)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 475 KB | 616 KB | **1,012 KB** (was 654) |
| JS | ≤ 300 KB | inline (75 KB HTML) | inline (80 KB HTML) | inline (99 KB HTML), no external script at all |
| fonts | ≤ 2 families, ≤ 150 KB | 2, 54 KB (Google) | 2, 51 KB, self-hosted | 2, 83 KB (Google) |
| largest image | ≤ 300 KB | 72 KB | 159 KB | 212 KB (`plate-img-062-m.webp`, below the fold) |
| LCP | ≤ 2.5 s | 484 ms | 348 ms | 484 ms |
| CLS load / full scroll (probe2) | < 0.1 | 0.0038 / 0 phone, 0.005 desktop | 0.0008 / 0, 0.003 | 0.0061 / 0, 0.0055 |
| third-party on load | 0 | 2 (Google Fonts, 4e allowance) | **0** | 2 (Google Fonts) |
| overflow-x at 390, whole scroll | 0 | 0 (also `book/` JS-off) | 0 (also `book/`) | 0 |

- **Unique first load.** Twelve images load with no scroll. The drop's plates `plate-img-062-m` (207 KB) and `plate-img-026-m` (188 KB) are swapped in by JS from `data-m` on load. `room-img-063` also loads through a duplicate `<img alt="">` that has no `loading="lazy"`. The drop starts below the fold. The total is inside budget, but playbook §4 says "lazy below the fold".
- **Hero video** (poster first, video requested after FCP):

  | | FCP → video request | renditions | length | reduced motion / Save-Data |
  |---|---|---|---|---|
  | calm | phone 276 → 368 ms; desktop 212 → 284 ms | phone 1.54 MB webm / 1.79 MB mp4; desktop 3.18 / **3.96 MB** | 7.24 s | 0 video requests, load or full scroll |
  | interactive | phone 152 → 168 ms; desktop 68 → 162 ms | phone `ride-p810` 1.50 / 1.57 MB; desktop 2.76 / 3.08 MB | 7.4 s | same |
  | unique | phone 284 → 367 ms; desktop 228 → 289 ms | phone 1.14 MB; desktop 2.04 / 2.18 MB | 7.0 s | same |

  - calm's desktop mp4 is 3.96 MB, 40 KB under the 4 MB line.
  - Every rendition is video-only and between 6 and 20 s.
- **Rosa (hard constraint 9).**
  - All three use `spot=south-point`, the `concepts.md` mapping, with `theme=light&units=metric`, unmodified.
  - Nothing from Rosa is in the first load.
  - After scroll, all three load the widget frame, and the frame makes its own JSON request.
  - Main-frame requests, all lazy:
    - unique: one JSON request for its own headline, as the playbook allows.
    - interactive: one no-cors probe of the widget URL. It fetches the JSON only when its inlined reading is over 24 h old, which it was not.
    - calm: none, because its inlined reading is under 24 h old.
  - With JS off, all three show "See today's forecast for South Point on Rosa". Blocked: the same link.
  - Headlines: South Point, knee-high, 0.4–0.6 m, 16 Oct 20:30, 7 s / S, 4 km/h onshore. They match the 16 Oct JSON; interactive adds the 0.85 m / 6.9 s swell line.
  - Embed count is 1 for every variant.
- **Booking walk** (390 touch; `booking_flow`: engine, clicks_to_flow ≤ 1, taps ≤ 8):

  | | hero CTA at 390 | taps to engine | hand-off (intercepted) | JS off |
  |---|---|---|---|---|
  | calm | "Book package now" 429–481 px → `book/` | 5: hero · Next · Next · Sat 24 Oct · Continue booking | `…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0` | `book/` GET form, check-in/out dates, 3 per-level submits |
  | interactive | 449–503 px → `book/` | 7: hero · Next · Next · Sat 24 · +1 woman · Next · Continue booking | `…/level-1-fomies?start=2026-10-24&female=1&end=2026-10-31` | `book/` GET form, Saturday select + duration, 3 per-level submits |
  | unique | 451–503 px → `#book` drawer | 2: hero · Continue booking | `…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0` | in-page GET form, 3 per-level submits (`/book/` is 404 by design: drawer) |

  - Engine product bases match the dossier character for character.
  - interactive calls `api.bookinglayer.io` only after interaction on `book/`.
  - WhatsApp is `wa.me/972523593240` and tel is `+97299733943` in all three.
  - unique's desktop drawer opens on "Close booking", 0/25 Tabs escape it, and Esc returns focus to the opener.
- **check-design** (home, and calm `book/`): 0 problems and 0 default-look warnings on every page.
  - calm: h1 Figtree, h2 Birthstone
  - interactive: Plus Jakarta Sans + Sacramento
  - unique: Literata + Parisienne
  - All: ground #FFFFFF, 0 all-caps labels
- **Facts.** The facts table from round 1 was re-run against the round-2 text:
  - 0 mismatches and 0 unsourced claims.
  - Quotes: calm 9/9 verbatim, interactive 9/9, unique 6/6 (of en.json's 9).
  - New on calm's first scroll: "12 rooms | Saturday check-in | ISA-certified surf guides". This is en.json `detail_lines.welcome`, sourced in `copy/sources.md` l.203 to `business.staying_with_us`, `duration_options` and `credentials[0]`.
  - audit `facts` flags only the Rosa numbers, traced above.
  - The same gaps are omitted as in round 1.

## Summary (round 2)

| variant | d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | r1 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|---|---|
| calm | 10 | 9 | 10 | 8 | 10 | 8 | 8 | **74.5** | 70.0 | none | pass (d8 pending) |
| interactive | 10 | 10 | 9 | 8 | 9 | 9 | 9 | **75.0** | 70.4 | none | pass (d8 pending) |
| unique | 10 | 8 | 9 | 9 | 9 | 9 | 8 | **71.8** | 64.0 | none | pass (d8 pending) |

```
mode: quick        round: 2        variant: calm
total: 74.5 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; 9/9 quotes verbatim, each with a source (`calm-text-r2.txt` l.131–141); rating blocks carry count + date (l.36–37, 125–126); Rosa headline = 16 Oct JSON. |
| 2 | mobile + perf | 9 | 475 KB, LCP 484 ms, CLS 0.0038 / 0 over the scroll, fonts 54 KB, largest image 72 KB, overflow 0. Hero after FCP (+92 / +72 ms), 0 video under reduced motion and Save-Data. Minus: Google Fonts; desktop mp4 at 3.96 MB is at the line. |
| 3 | booking CTA | 10 | Hero CTA above the fold → `book/` (1 tap); engine in 5 taps; URL char-for-char; JS-off form; WhatsApp prefill on `book/` now carries level, room, date, nights, guests. |
| 4 | brand fit | 8 | §3 order and phone bar present. Phone menu now present (`shots/mobile-00`). Minus: still no rating on the first screen; it first appears in `mobile-03`. |
| 5 | copy | 10 | en.json verbatim plus interface labels; credits now sourced. |
| 6 | accessibility | 8 | Skip link; 69 / 68 Tab stops, all ringed, 0 unnamed; carousel arrows appear on `:focus-visible`; menu sheet keeps focus and Esc returns; alt 36/36. Minus: 25 targets under 44 px (carousel dots 36×44, a 120×24 link). axe not run (quick). |
| 7 | security + delivery | 8 | Static, relative, lowercase, no secrets. 1 embed, lazy, with its space reserved; plain-link card when the embed is refused or JS is off. Minus: Google Fonts on load (a hard fail in full mode). |

what the designer prompt got wrong: The §3 first-screen proof point is still treated as optional when the hero is a full-bleed video. Calm fixed every other round-1 item, but not this one, and no self-check line asks for it.

fixes (not failing; for 4g, smallest first):
1. Put 8.6 / 80 / date on the first screen.
2. Make the dots ≥ 44 px wide.
3. Self-host the fonts.
4. Trim the desktop mp4 below 3.9 MB for headroom.

```
mode: quick        round: 2        variant: interactive
total: 75.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; 9/9 quotes verbatim with "on Booking.com / on globalsurf.com"; rating blocks with count + date (`interactive-text-r2.txt` l.37, 139–141); Rosa headline = 16 Oct JSON, hidden when > 24 h old. |
| 2 | mobile + perf | 10 | 616 KB, LCP 348 ms, CLS 0.0008 / 0, fonts 51 KB **self-hosted**, largest image 159 KB, **0 third-party requests on load**, overflow 0. Hero after FCP; phone rendition ≤ 1.57 MB; 0 video under reduced motion and Save-Data. Every budget line is met. |
| 3 | booking CTA | 9 | Hero CTA above the fold → `book/`. Engine in 7 taps (≤ 8). URL char-for-char. JS-off form. Engine API only on interaction. The dates step now says why Next waits. Minus: 7 taps, the closest of the three to the limit; no guest preselected. |
| 4 | brand fit | 8 | §3 order present; rating under the reel (`mobile-02`), not on the first screen; interactive brief intact; phone bar. |
| 5 | copy | 9 | en.json verbatim; labels plain. |
| 6 | accessibility | 9 | Skip link; 81 / 69 Tab stops all ringed, 0 unnamed. Menu sheet keeps focus and Esc → Menu. Gallery opens on "Close photos" and Esc returns to its opener. WhatsApp icon on `book/` is named. Alt 31/31. Minus: 3 buttons at 41 px tall. The wipe's range input is opacity 0, and its focus is shown on the knob (`.wipe input:focus-visible ~ .knob`). |
| 7 | security + delivery | 9 | Static, relative, lowercase, self-hosted fonts, no secrets; 1 embed, lazy, reserved, plain-link fallback. Minus: a no-cors probe of `rosa.surf/widget/` from the main frame before the iframe. It is lazy, and it is a second request to the same embed. |

what the designer prompt got wrong: Nothing new. Every round-1 item is fixed. The one structural cost left is the stepped `book/` page's tap count (7 of 8), which no prompt line weighs against the other variants' 2–5.

fixes (not failing, smallest first):
1. Raise the three 41 px buttons to 44 px.
2. Preselect 1 guest, or merge the dates and guests "Next" into one step.

```
mode: quick        round: 2        variant: unique
total: 71.8 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches; 6/6 quotes verbatim, credits now sourced (l.110, 116); rating blocks with count + date (l.9–11, 103); Rosa headline live, 16 Oct 20:30, hidden when > 24 h old. |
| 2 | mobile + perf | 8 | LCP 484 ms; CLS 0.0061 at load, **0 / 0.0055 over the full scroll** (was 1.25 / 1.03); fonts 83 KB (was 156); no external script. Hero after FCP; 0 video under reduced motion and Save-Data. Minus: **first load 1,012 KB** (was 654). The below-fold plates (207 + 188 KB) load eagerly through JS, and so does a non-lazy duplicate `room-img-063`. Also Google Fonts. |
| 3 | booking CTA | 9 | Hero CTA above the fold → drawer; engine in 2 taps; URL char-for-char; JS-off in-page form; drawer focus correct. Minus: the hand-off defaults to 1 woman and the first Saturday if nothing is changed. |
| 4 | brand fit | 9 | §3 order present; the drop is intact. The phone now has a Menu (`shots/mobile-00`). Rating directly under the hero (`mobile-01`). |
| 5 | copy | 9 | en.json content; two joined copy sentences, no new claim. |
| 6 | accessibility | 9 | Skip link; 55 / 53 Tab stops all ringed, 0 hidden, 0 unnamed; menu sheet and drawer keep focus, Esc returns; steppers named "Add a woman / man / couple"; reduced motion → static plates, no video. Minus: 1 target under 44 ("Forecast for South Point" 234×23). |
| 7 | security + delivery | 8 | Static, relative, lowercase, no secrets; **GSAP removed**, 1 embed (Rosa), lazy, the iframe only after a successful JSON fetch, plain link otherwise. Minus: Google Fonts on load. |

what the designer prompt got wrong: The rework removed the CDN library, the pin CLS and the font weight. But the new sticky stage's images are assigned by script at load (`data-m` → `src`) and are not lazy, so a fix for one budget line moved 400 KB onto the first load. The self-check reads first-load bytes only as pass/fail against 1.5 MB, so the regression from 654 KB to 1,012 KB went unseen.

fixes (not failing, smallest first):
1. Enlarge the forecast credit link to ≥ 44 px.
2. Lazy-load the duplicate `room-img-063`.
3. Assign the plate sources only when the drop nears the viewport.
4. Self-host the fonts.

## Ranking (critic, d1–7 only; facts, not a pick)

1. **interactive** 75.0: every budget line met, 0 third-party on load, every round-1 item fixed; the longest booking walk (7 taps).
2. **calm** 74.5: CTA and copy now clean; no rating on the first screen, Google Fonts.
3. **unique** 71.8: GSAP, CLS and font issues are gone; first load is up to 1.01 MB through eager below-fold plates; the shortest booking walk (2 taps).

Look loop: each `notes.md` carries round 2.x first-screen and whole-page entries with named changes between sheets. No hollow round.
