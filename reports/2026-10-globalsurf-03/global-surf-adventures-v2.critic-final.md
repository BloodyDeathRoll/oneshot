# global-surf-adventures-v2 — critic full scorecard (station 5, round 1)

critic 0.4.3 · rubric 0.3.1 · run `2026-10-globalsurf-03` · 2026-10-17 · site `sites/global-surf-adventures-v2/final/` (port of the picked `unique` variant), rebuilt with `npm run build` at commit 2041e31 before the review. This card scores dimensions 1–7 only. Dimension 8 belongs to visual-critic and experience-critic. Their reports were not opened.

```
mode: full        round: 1        variant: unique (final)
total: 72.9 / 80 (d1–7; d8 /25 from the visual critics)   result: pass on the critic's gates (no hard fail, every d1–7 ≥ 6, budget met on every line); the overall pass needs d8 ≥ 8 from both visual critics and a total ≥ 85   hard_fails: []
```

| # | dimension | score | weighted | evidence |
|---|---|---|---|---|
| 1 | facts | 10 | 20.0 | Every rendered line, including the drawer and the hidden room panels, traces to `copy/en.json`, which passed station 4c. The exceptions are interface labels and the live Rosa reading. Key values checked against the dossier: $1,466 pp (`offers[0–2]`); 8.6/10, 80 reviews, 28 Sep 2026; Staff 9.5, Facilities 9.2, Cleanliness 9.2 (`reviews.booking`); +$140 / +$80 / +$418 pp (`rooms_engine`, 29 Sep); 40 % deposit and 45 days (`booking.deposit_terms`); the address (Google's wording, capitalised per §6); WhatsApp +972523593240, tel +97299733943 and info@globalsurf.com (`contact.*`); the Saturdays match the `docs/bookinglayer.md` snapshot with past dates dropped. All 9/9 quotes are verbatim and each shows a source; Seagallas and Dana now say "globalsurf.com" (fixed since 4f). audit `facts`: 29 numbers, 0 not in the copy. No mismatches. |
| 2 | mobile + perf | 9 | 13.5 | audit-r1 plus 3 repeat runs: LCP 444–460 ms; load CLS 0.0061; **scroll.early.cls 0.0072, scroll.settled.cls 0**, identical in 4 of 4 runs (both under 0.01). First load excluding video is 481 KB (HTML 103 KB, fonts 83 KB, images 295 KB, largest image 88 KB); 0 third-party. JS is about 7.7 KB gzipped, inline. Hero video: phone 0.72 MB webm, desktop 1.63 MB webm. overflow-x is 0 on home and `book/` at 390 and 1440. Probe CLS over a full scroll: 0 on the phone, 0.0002 on desktop. Minus: DCL 1,770 ms on the throttled phone, and the load CLS of 0.0061 from the hero title's font swap remains. |
| 3 | booking CTA | 9 | 13.5 | `funnel.json`: `hero_action.class` engine = `recommended.primary_action`; `clicks_to_flow` 1 ≤ 1 (`booking_flow`). Walk at 390 touch, with the engine intercepted: hero "Book package now" (y 451, above the fold) opens the drawer at `/book/` with focus on "Close booking". "Continue booking" then hands off to `…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0`. That is **2 taps, within the limit of 8**. Engine product bases match `booking.engine_products` exactly. JS off: `book/` is a GET form with one submit per level, each with the right `formaction`. Minus: if the visitor changes nothing, the hand-off sends 1 woman. The JS-off path sends `duration=8` with an empty `end=`, and `docs/bookinglayer.md` l.167 says "Use `end`, not `duration`". Not tapped through the live engine. |
| 4 | brand fit | 7 | 3.5 | The §3 order is present: levels with price, then included, the drop and lodge, rooms, waves + Rosa, reviews, closing, contact. The persistent phone bar "From $1,466 pp \| 7 nights · Book now" shows on every frame from `mobile-01` on. Unique brief: the drop set-piece is kept. Minus: the **first screen has no what + where line and no proof point**. `mobile-00` shows only "Your surf week starts here" and "Book package now" over the video. The place (Sri Lanka, Kabalana) and the 8.6 rating first appear one scroll down (`mobile-01`). Playbook §3.1 and `audit.json.recommended.above_fold` (level, price, included, trust) ask for them on the first screen. |
| 5 | copy | 9 | 9.0 | The page is en.json verbatim plus plain template labels. Minus: the same room has two names. The drawer says "Shared Twin Room – 2 Beds" (the engine's casing) and the rooms tab says "Shared twin room". |
| 6 | accessibility | 8 | 6.4 | axe (wcag2a/aa, 21a/aa) after a full scroll: desktop home 0, `book/` 0 at both widths. **Phone home: 1 serious color-contrast violation.** The inactive room tabs `#tab-twin` and `#tab-double` are #778a90 on #fff at 3.6:1, against the 4.5:1 required for 22 px regular text. Tab pass: 58 stops at 1440 and 56 at 390; the skip link comes first; 0 hidden stops, 0 without a ring, 0 unnamed. The drawer traps focus (0 of 40 Tabs left it); Esc closes it, returns the URL to `/` and focus to "Choose Level 2"; browser back closes it. The phone menu traps focus (0 of 25) and Esc returns focus to `#menub`. Reduced motion and Save-Data: 0 video requests and 0 playing videos over a full scroll; photographs stay visible. Alt: 50 images, 0 missing, 21 empty (decorative). Tap targets under 44 px: 0 (audit and probe). |
| 7 | security + delivery | 10 | 7.0 | Static output: 131 files, all lowercase, relative asset paths. No CMS, localhost or `/api/` reference and no secrets (grep). Scripts are only inline, `application/json` and `ld+json`. Fonts are self-hosted. First load: 0 third-party requests (audit, probe phone and desktop, JS off). Embeds: 1 (Rosa). After scrolling to the block: one site request to `rosa-data-opal…/south-point.json`, then the widget frame `rosa.surf/widget/?spot=south-point&theme=light&units=metric` (350×500 at 390, 420×500 at 1440, unmodified). The frame's own sub-requests (Inter from Google Fonts, the JSON, arcgis tiles) come from Rosa's document. The headline shows Sat 17 Oct 14:30 (live). The fallbacks show the plain link "See today's forecast for South Point on Rosa" plus "Open Rosa" in the reserved box with JS off, with Rosa blocked (no frame), and with the clock moved 3 days ahead (headline hidden). `robots.txt` is a preview Disallow and pages carry `noindex`. |

Total: 20.0 + 13.5 + 13.5 + 3.5 + 9.0 + 6.4 + 7.0 = **72.9 / 80**.

## Hard fails

None.
- No fact contradicts the dossier.
- The CTA lands on the right engine product, and the number, tel and mail match the dossier.
- The hero action class is engine, as recommended.
- No third-party request on first load; no CMS runtime dependency.
- No keyboard trap. Content is DOM text.
- No budget line is over.
- All images are business-owned (notes.md; no stock).

## Measured — playbook §4 budget (390×844, 1.6 Mbps / 150 ms / 4x CPU, no scroll)

| line | target | measured | |
|---|---|---|---|
| first-load transfer, video excl. | ≤ 1.5 MB | 481 KB (1,200,298 B total − 719,116 B phone hero webm) | met |
| hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | 0.72 MB · 1.63 MB (webm) | met |
| JS, compressed | ≤ 300 KB | ~7.7 KB gzip, inline (audit `bytes_js` 0: no JS files) | met |
| largest above-the-fold image | ≤ 300 KB | 88 KB (desktop poster); phone poster p668 webp | met |
| fonts | ≤ 2 families, ≤ 150 KB | Literata + Parisienne, 82.7 KB, self-hosted | met |
| LCP | ≤ 2.5 s | 448 ms (444–460 over 4 runs) | met |
| CLS | < 0.1 | 0.0061 | met |
| scroll CLS early / settled (critic 0.4.3) | < 0.01 each | **0.0072 / 0**; the early shift is at y 0 and 1.26 s, from `a.btn`, the hero text and `button#menub` (0.0061, font swap), and then `div#pbar` and `#menub` (0.0011) | met |
| third-party requests on load | 0 | 0 | met |

## Booking walk (390 touch, engine intercepted, nothing booked)

1. The hero "Book package now" (y 451, h 52) opens the drawer. The URL becomes `/book/` and focus goes to "Close booking". The defaults are Level 1, dorm, 7 nights, 24 Oct, 1 woman, total $1,466.
2. "Continue booking" hands off to `https://globalsurfadventures.bookinglayer.com/en/product/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0`.

Desktop: "Choose Level 2" (Enter) opens the drawer with `lvl=level-2-rollers` checked. Esc closes it and focus returns to "Choose Level 2".

WhatsApp prefills name the business:
- the general link: "…I have a question about the surf packages."
- Freestylers: "…ask about dates for the Freestylers – B&B only package."

## Screenshots (`tools/shoot.mjs`, deleted after the round)

- Mobile: 19 frames, page 14,609 px. Desktop: 17 frames, page 13,062 px. Nothing truncated, no console errors.
- `mobile-00`: the full-bleed hero video (lodge roofs, palms and the sea) with "Your surf week starts here" and the "Book package now" button. Nothing else.
- `mobile-01`: "Choose your level", 8.6 / Booking.com / 80 reviews / 28 Sep 2026, and the Level 1 clip.
- `mobile-06…09`: the drop set-piece (aerial views, then the pool, then "Footwear is discouraged…" over the pool). No blank frames.
- `mobile-13`: the Rosa headline and the widget. `mobile-17/18`: the footer and contact.
- `desktop-15/16`: the same footer frame twice, which is the end-of-page clamp in shoot.mjs.

## Evidence (in `reports/2026-10-globalsurf-03/`)

- `critic-final/audit-r1.json`: `tools/audit-mockup.mjs` pointed at `final/`, written here so nothing was written under `sites/`. It includes `scroll`.
- `critic-final/probe-r1.json`: phone and desktop load/scroll network, video timing, axe, tap targets, reduced motion, Save-Data, JS off, Rosa blocked, booking walk, drawer and menu focus, Tab passes.
- `critic-final/text-r1.txt`: the rendered text at 390 after a full scroll.
- `funnel/global-surf-adventures-v2-r1/funnel.json`. It was served by `python3 -m http.server`; `tools/_serve.mjs` does not redirect `/book` → `/book/`, so funnel saw a false 404 there.

## What the designer prompt got wrong

The designer's checks never assert §3.1's first-screen contract when the hero is a full-bleed video: a what + where line and one proof point next to the primary action. The picked direction moved both one scroll down, and every tool passes it: audit `primary_above_fold` only looks at the CTA, and check-design does not read the hero text. The contrast rule is not checked on inactive tab states either, because the designer self-check runs no axe.

## Top fixes (not failing; smallest first)

1. (d6) Darken the inactive room-tab colour (#778a90) to ≥ 4.5:1 on white.
2. (d5) Use one name for the twin room in the drawer and the rooms tab.
3. (d3) JS-off hand-off: send `end` instead of the empty `end=` + `duration=8` (the bookinglayer doc says to use `end`).
4. (d4) Put a what + where line ("Surf weeks in Kabalana, Sri Lanka") and the 8.6 / 80 / Booking.com / 28 Sep 2026 proof on the first screen.
