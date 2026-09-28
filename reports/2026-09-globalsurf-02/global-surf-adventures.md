# global-surf-adventures — critic quick scorecard (station 4f)

critic 0.4.0 · rubric 0.3.0 · run `2026-09-globalsurf-02` · 2026-09-28 · round 1 · dimensions 1–7 only (dimension 8 belongs to visual-critic and experience-critic; their reports were not opened).

Same checks, same order, same viewports for all three: `tools/audit-mockup.mjs` (per variant, own static server) → `tools/shoot.mjs` over http://127.0.0.1:8981 (1440×900 and 390×844, scrolled per viewport) → critic probe (CDP network timing vs first paint, reduced motion, Save-Data, full scroll, JS off, 60-stop Tab pass) → `tools/check-design.mjs --no-shots` → page text vs `copy/en.json` + `dossier.json` → booking URLs fetched.

Evidence:
- `sites/global-surf-adventures/mockups/{calm,interactive,unique}/audit.json`
- `reports/2026-09-globalsurf-02/critic/<variant>/shots/` (`mobile-sheet.png`, `desktop-sheet.png`, `shoot.json`)
- `reports/2026-09-globalsurf-02/critic/<variant>-probe.json` (network/video/keyboard/no-JS)
- `reports/2026-09-globalsurf-02/critic/<variant>-text.txt` (rendered text at 390 px)

## The sentence the human needs

All three clear the critic's gates (no hard fail; dimensions 1, 3, 7 ≥ 6). They open on the same vid-009 hero, and all three are far inside budget (first load 263–342 KB). Differences: **calm** has no skip link. **interactive** puts white hero type over the white roofs of the drone frame on the phone, and its mobile bar shows "8.6 Booking.com" with no count or date. **unique** has the cleanest facts and carries no Rosa forecast.

## Summary

| variant | d1 facts (20) | d2 perf (15) | d3 CTA (15) | d4 fit (5) | d5 copy (10) | d6 a11y (8) | d7 delivery (7) | total /80 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|---|
| calm | 9 | 9 | 9 | 8 | 9 | 8 | 8 | **70.0** | none | pass (d8 pending) |
| interactive | 9 | 9 | 9 | 8 | 9 | 7 | 8 | **69.2** | none | pass (d8 pending) |
| unique | 10 | 9 | 9 | 8 | 9 | 8 | 8 | **72.0** | none | pass (d8 pending) |

Totals are Σ score × weight ÷ 10 over dimensions 1–7 (max 80). The orchestrator adds dimension 8.

## Measured (playbook §4 budget, 390×844 throttled, no scroll — audit.json unless noted)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer (video excl.) | ≤ 1.5 MB | 342 KB | 263 KB | 278 KB |
| JS (inline, not separable) | ≤ 300 KB | inline in 41 KB HTML | inline in 54 KB HTML | inline in 46 KB HTML |
| fonts | ≤ 2 families, 150 KB | Sora, 25 KB | Barlow + Barlow Condensed, 86 KB | Archivo (variable), 90 KB |
| largest image | ≤ 300 KB | 84 KB | 66 KB | 58 KB |
| LCP | ≤ 2.5 s | 624 ms | 624 ms | 648 ms |
| CLS | < 0.1 | 0 | 0.027 | 0.0015 |
| third-party on load | 0 | 2 (Google Fonts — allowed at 4e, defect at full) | 2 (same) | 2 (same) |
| overflow-x at 390 (probe) | 0 | 0 | 0 | 0 |

**Video (probe + ffprobe), identical results for all three unless stated:**
- Poster first. The poster is in the HTML (`<picture>` AVIF plus preload). The hero video request goes out after first paint: calm +376 ms (phone) / +358 ms (desktop), interactive +462 / +446, unique +480 / +545.
- Under reduced motion and under Save-Data (header plus `navigator.connection.saveData`), all three made 0 video requests on load and 0 after a full scroll, at both widths.
- Hero renditions: vid-009 `m1280.webm` 1.50 MB (phone; mp4 fallback 1.90 MB, unique uses m720.mp4 at 1.74 MB), `d1920.webm` 2.98 MB (desktop; mp4 3.79 MB). All are within ≤ 2 MB / ≤ 4 MB, 12.0 s, video stream only (no audio), with moov before mdat (faststart).
- Level clips load only on scroll:
  - calm: in view on touch, hover on desktop; the phone scroll fetched vid-010 m1280 (1.9 MB).
  - interactive: the stage is near; phone m720.mp4 1.86 MB, desktop m1280 1.3–1.9 MB.
  - unique: within one viewport; phone m1280 1.3–1.9 MB, and **desktop d1920 webm 2.1–3.2 MB each** (8.2 MB for three scenes). No budget line covers these, but it is the heaviest scroll of the three.

**Rosa / embeds (hard constraint 9).**
- calm and interactive each carry 1 embed (Rosa). unique carries none.
- Mapping: dossier "South point" → `south-point`, as `concepts.md` records. `spot=south-point` appears in both the widget URL and the credit.
- Widget: `https://rosa.surf/widget/?spot=south-point&theme=light&units=metric` in an iframe that is not restyled.
- Nothing from Rosa loads before scroll. After scroll there is exactly one JSON request (`rosa-data-opal…/south-point.json`) plus the widget frame and its own sub-requests (Inter, arcgis tiles).
- With JS off, both show "See today's forecast for South Point on Rosa".
- The headline half is hard-coded from one fetch ("For 28 Sep 2026, 20:30 local", with calm adding "Rosa data built … 19:56 local"). That is acceptable at 4e as the fixture, but at 4g it must be live with the > 24 h fallback.
- CLS after the embed arrives was not measured (the probe did not read CLS after scroll).

## Facts table (all three; en.json passed 4c, so the checks below cover what the pages add)

| claim on page | dossier key | calm | interactive | unique |
|---|---|---|---|---|
| $1,466 per person, 7 nights, read 28 Sep 2026, ×3 levels | `offers[0..2]` price 1466 USD, fetched 2026-09-28 | match | match | match |
| 8.6/10 Booking.com, 80 reviews, 28 Sep 2026 | `reviews.booking` 8.6/10/80, fetched 2026-09-28 | match | match (hero); **bar "8.6 Booking.com" has no count/date** | match |
| 9.5 staff / 9.2 facilities / 9.2 cleanliness | `reviews.booking.categories` | match | match | match |
| inclusions per level ("guided" L1/L2, "coached" L3) | `offers[]` via en.json `lessons[].includes` | match | match | match |
| address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address` (Google, capitalised per §6) | match | match | match |
| engine category + 4 product URLs | `booking.engine_url`, `booking.engine_products` | char-for-char | char-for-char | char-for-char |
| wa.me/972523593240 | `contact.whatsapp` | match | match | match (+ shown "+972 52-359-3240") |
| tel:+97299733943, info@globalsurf.com | `contact.phone`, `contact.email` | match | match | match |
| Check-in 14:00–20:00, check-out by 11:00, no pets/extra beds, cots ≤ 5 | `stayInfo` | match | match | match |
| distances 40 m / 350 m / 400 m / 4 km / 3.9 km | `location.distance_to_beach` (en.json "Getting here") | match | match | match |
| The Rock and South Point | `location.spot` | match | match | match |
| ISA-certified surf guides | `credentials[0]` | match | match | match |
| testimonials (verbatim) | `reviews` / en.json `testimonials` | 4/4 shown are verbatim | 9/9 verbatim | 6/6 verbatim |
| Seagallas source | `reviews[…].source_url` globalsurf.com | **"· review"** (source not named) | "globalsurf.com" | "globalsurf.com" |
| Rosa headline 0.7–1.0 m, swell 1.1 m 14.4 s 198°, wind 7 km/h 276° cross-shore; "chest-high" | `mockups/<v>/rosa-south-point.json` (4e fixture) | match | match ("chest-high" = JSON `phrase`) | n/a |
| interface labels: "lessons, meals, room" (bar), "price read / as of / Base price in the booking engine, 28 Sep 2026", "Book Level N", "At the lodge / Also at the lodge", "Not sure which level?" plus 4 level-specific WhatsApp prefills | template labels; each checked against `offers[]`/`stayInfo`/en.json | no new claim | no new claim | no new claim |

No mismatch and no unsourced claim in any variant. Season, staff languages, reply time and the Google count are omitted as gaps in all three, as `notes.md` records.

---

```
mode: quick        round: 1        variant: calm
total: 70.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table: 0 mismatches, 4 verbatim quotes, 3 engine prices dated. Minus: the Seagallas quote is credited "· review" rather than its source (globalsurf.com); playbook §6 asks for the source. |
| 2 | mobile + perf | 9 | 342 KB first load, LCP 624 ms, CLS 0, 1 font family 25 KB, largest image 84 KB (audit.json). Hero video +376 ms after first paint, 1.50 MB phone, 2.98 MB desktop. overflow-x 0 at 390. Minus: Google Fonts (4e allowance). |
| 3 | booking CTA | 9 | Primary above the fold at both widths is "See the weekly surf packages and dates" → the engine category URL, char-for-char (class engine = audit `recommended`; designer funnel.json clicks 1). Per-level "Book Level N" → product URLs. WhatsApp + tel secondary. All 6 targets return HTTP 200 (curl). Not tapped through to the live engine UI on a phone. The WhatsApp prefill names the business but not the level. |
| 4 | brand fit | 8 | §3 order present: media, what/where, action, proof → levels with price → included → rooms → reviews → spot + Rosa → getting here → contact. Brief "almost no motion": the level clips play in view on touch, a conflict the designer declared in notes.md. No booking drawer (custom.md). Ground hsl(225 20% 96%) is cool. |
| 5 | copy | 9 | Copy is en.json verbatim. Template labels are plain and add no claim. Minus: "· review" as a source label. |
| 6 | accessibility | 8 | 0 of 16 images without alt; 0 tap targets under 44 px; 59 Tab stops, all with visible focus; headings in order; reduced motion = poster only, 0 video; with JS off all 10 links are present. Minus: **no skip link** (audit's `has_skip_link` true only counts the `#top` logo link). axe not run (quick). |
| 7 | security + delivery | 8 | Static, relative paths, lowercase filenames, no localhost/secret strings. Rosa is the only embed, lazy with a fallback link. Minus: Google Fonts on load (allowed at 4e, a hard fail at full). |

what the designer prompt got wrong: Nothing makes the designer add a real skip link (calm has none, and `audit-mockup.mjs` counts any `href="#…"` as one). The review-credit rule does not say that a testimonial with `source: other` must name the site it came from.

fix list (not failing; for 4g, smallest first): name "globalsurf.com" on the Seagallas credit · add a skip link · self-host Sora · make the Rosa headline live with the > 24 h fallback.

---

```
mode: quick        round: 1        variant: interactive
total: 69.2 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | Facts table: 0 mismatches, 9/9 quotes verbatim with sources. Minus: the persistent mobile bar shows **"8.6 Booking.com"** with no count or capture date (`shots/mobile-14.png`); playbook §6 requires both on a headline rating. |
| 2 | mobile + perf | 9 | 263 KB first load, LCP 624 ms, CLS 0.027, 2 families 86 KB, largest image 66 KB. Hero video +462 ms after first paint, 1.50 MB phone, 2.98 MB desktop. overflow-x 0. Minus: Google Fonts. |
| 3 | booking CTA | 9 | Primary above the fold = engine category, char-for-char, class engine. The level stage's "Book Level N" and the bar button switch to each product URL. Four WhatsApp prefills name the business and the visitor's level ("I already carve. Which level fits me?"). All targets HTTP 200. Not tapped through on a phone. |
| 4 | brand fit | 8 | §3 order present; interactive brief met (pinned level stage, fitted word, horizontal day run). Minus: ground hsl(20 100% 99%), a warm-tinted white against custom.md's "cool whites"; no booking drawer. |
| 5 | copy | 9 | en.json verbatim. The room list rephrases the copy's own items ("A safe box, a board rack") and adds no claim. The level prefills are plain. |
| 6 | accessibility | 7 | 0 of 22 without alt; skip link present; 59 Tab stops with visible focus (except the Rosa iframe itself); reduced motion = posters, 0 video. Minus: **hero tagline and rating sit in white on the white roofs** of the drone frame on the phone (`shots/mobile-00.png`; pixel sample behind the tagline gives about 2.4:1 at the 75th percentile). 3 targets under 44 px: logo 135×22, rating link 323×39, Rosa credit 200×17. |
| 7 | security + delivery | 8 | Same as calm: static, relative, lowercase, no secrets, Rosa lazy with a fallback. Minus: Google Fonts on load. |

what the designer prompt got wrong: The prompt checks hero legibility only on the frame the screenshot lands on. A looping aerial film has bright frames (white roofs) where small white type drops under 4.5:1, so the scrim has to be sized for the brightest frame of the cut. The "rating needs count + date" rule is not applied to the compact persistent bar.

fix list (not failing; smallest first): add count + date to the bar's rating or drop it · enlarge the logo, rating and Rosa-credit hit areas to 44 px · deepen the phone hero scrim to hold on the brightest vid-009 frame · cool the ground · self-host Barlow · live Rosa headline.

---

```
mode: quick        round: 1        variant: unique
total: 72.0 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts table: 0 mismatches. 6/6 quotes verbatim with named sources. Every rating instance carries its count and date. Prices dated "Base price in the booking engine, 28 Sep 2026". |
| 2 | mobile + perf | 9 | 278 KB first load, LCP 648 ms, CLS 0.0015, 1 variable family 90 KB, largest image 58 KB. Hero video +480 ms after first paint, 1.50 MB phone, 2.98 MB desktop. overflow-x 0. Minus: Google Fonts. Note: desktop level scenes pull d1920 (8.2 MB for three on scroll), the heaviest scroll of the three. |
| 3 | booking CTA | 9 | Primary above the fold = engine category, char-for-char, class engine. Each level scene links its product URL. WhatsApp + tel secondary. HTTP 200 for all. Not tapped through on a phone. audit.json `tapped` reads booking.com only because the rating link comes first in the DOM; the probe's above-fold list shows the engine CTA. The WhatsApp prefill does not name the level. |
| 4 | brand fit | 8 | §3 order present; unique brief met (WebGL waterline; 7 canvases, all hidden under reduced motion). Ground hsl(215 39% 90%) is cool. Minus: no booking drawer; the phone foot bar has no level switch (a conflict the designer declared). |
| 5 | copy | 9 | en.json verbatim; the designer removed a self-written line (notes round 6). Labels add no claim. |
| 6 | accessibility | 8 | 0 of 18 without alt; skip link present; 59 Tab stops with visible focus; reduced motion = poster + CSS waterline, 0 video; with JS off, text and all 9 links are present; DOM text behind every canvas. Minus: 4 targets under 44 px (skip link 115×26; rating links 358×24 ×3). |
| 7 | security + delivery | 8 | Static, relative, lowercase, no secrets, 0 embeds, no third-party request after scroll. Minus: Google Fonts on load. |

what the designer prompt got wrong: Nothing says that below-the-fold clips should use the phone-tier or m1280 rendition on desktop. The d1920 cuts are sized for a full-bleed hero, and three of them add about 8 MB to a scroll. Inline rating links are not held to the 44 px tap-target floor.

fix list (not failing; smallest first): set the rating links and skip link to 44 px tall · serve m1280 for the level scenes on desktop · self-host Archivo.

---

## check-design default-look facts (hard constraint 4; none fail)

- calm: Sora for h1/h2/body; ground `#F3F4F7` (hsl 225 20% 96%); 0 all-caps labels; 0/14 labelled headings.
- interactive: Barlow h1/body, Barlow Condensed h2; ground `#FFFDFC` (hsl 20 100% 99%, warm-tinted white); 0 all-caps; 0/17.
- unique: Archivo throughout; ground `#DDE5F0` (hsl 215 39% 90%); 0 all-caps; 0/12.

## Station checks

- Look-logs: calm 7 rounds, interactive 8, unique 7, each with ≥ 3 first-screen rounds that make visible changes. No hollow loop.
- Not tested (stated, not scored): a real phone or GPU; Safari (the MP4 path); axe; CLS after the Rosa widget arrives; the live engine UI after landing (the SPA returns 200).
