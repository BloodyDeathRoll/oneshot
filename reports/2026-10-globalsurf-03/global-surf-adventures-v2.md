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
