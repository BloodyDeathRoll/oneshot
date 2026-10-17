# global-surf-adventures-v2 — critic verification 1 (station 5, after the round-1 fix pass)

critic 0.4.3 · rubric 0.3.1 · run `2026-10-globalsurf-03` · 2026-10-17 · site `sites/global-surf-adventures-v2/final/` at HEAD 291ae7c, rebuilt once with `npm run build` before the review. This card scores dimensions 1–7 only; dimension 8 belongs to visual-critic and experience-critic, and their reports were not opened. Round-1 card: `global-surf-adventures-v2.critic-final.md` (72.9 / 80).

```
mode: full (verification)   round: 1, verification 1   variant: unique (final)
total: 75.7 / 80 (d1–7; d8 /25 from the visual critics)   result: pass on the critic's gates (no hard fail, every d1–7 ≥ 6, budget met on every line); the overall pass still needs d8 ≥ 8 from both visual critics and a total ≥ 85   hard_fails: []
```

| # | dimension | score | weighted | evidence |
|---|---|---|---|---|
| 1 | facts | 10 | 20.0 | audit `facts`: 29 numbers, 0 not in the passed copy (3 of 3 runs). The rendered text at 390 (`text-v1.txt`), with digits stripped, differs from round 1's text in one line only: the new hero subtitle "Sri Lanka's south coast, all levels". That is `en.json` `hero.subtitle_alt`, sourced in `copy/sources.md` l.196 (`business.description_packages` "available for all levels", the same as the passed `tagline`). The new Level 1 clip description ("A golden-hour beginner session: a guest stands up on a soft-top into the sun…") matches dossier `videos[vid-010].shows` ("a golden-hour beginner session (riders into the sun, silhouettes, cheering)"). The room names are the copy's labels in sentence case. Prices, rating, WhatsApp, tel and address are unchanged from round 1 and still match. No mismatches. |
| 2 | mobile + perf | 9 | 13.5 | 3 audit runs (`critic-verification-1/audit-v1-run1..3.json`): LCP 468–472 ms; load CLS 0.0069; **scroll.early.cls 0.0069, scroll.settled.cls 0** in all 3 runs. First load is 478 KB in 17 requests (HTML 114 KB, fonts 83 KB, images 281 KB, largest image 88 KB); 0 third-party; no drop plate or poster in the first load (probe `load` list). Phone hero is now `gs2-hero.p1080.webm` at 1.40 MB (≤ 2 MB); desktop is `d1920.webm` at 1.63 MB (≤ 4 MB). overflow-x is 0 on home and on `book/` at 390 and 1440. Probe CLS over a full scroll: 0 on the phone and 0.0007 on desktop (three tiny `NAV.nav` shifts as the header turns solid). Minus: DCL rose from 1,770 to about 2,030 ms on the throttled phone because the HTML grew 11 KB (the drop's inline blurred still). The early shift (font swap on `a.btn`, `p.hero-sub`, `#menub`) is still present. |
| 3 | booking CTA | 9 | 13.5 | `funnel/global-surf-adventures-v2-v1/funnel.json`: `hero_action.class` engine = `recommended.primary_action`, and `clicks_to_flow` 1 ≤ 1. Walk at 390 touch, engine intercepted: the hero "Book package now" opens the drawer at `/book/` with focus on "Close booking". "Continue booking" then hands off to `…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0`, which is 2 taps (limit 8). **Round-1 fix verified:** with JS off, `book/` no longer sends `duration`. The nights radios are `form="noform"` and hidden, and a visible check-out select (`#endsel`) sends `end`. Level 2 with the defaults goes to `…/level-2-rollers?start=2026-10-24&end=2026-10-31&…`, and Level 1 with 31 Oct → 14 Nov goes to `…?start=2026-10-31&end=2026-11-14&…`. With JS on, `#endsel` is disabled, so no duplicate `end` is sent. Minus: the default hand-off still sends 1 woman. With JS off, check-out is not tied to check-in, so a later start with the default end would send an end date before the start. Not tapped through the live engine. |
| 4 | brand fit | 9 | 4.5 | **Round-1 fix verified (what + where):** `mobile-00` and `desktop-00` now show "Your surf week starts here" / "Sri Lanka's south coast, all levels" / "Book package now" over the hero video. The probe puts the subtitle at y 416–443 on the phone and 430–460 on desktop, all inside the first screen. Per the brief, the rating is kept off the first screen on purpose: the designer's hero rules in references.md and custom.md forbid it there. It is the first thing after the hero (`mobile-01`: 8.6 / Booking.com / 80 reviews / 28 Sep 2026, next to "Choose your level"), and price sits on the persistent bar "From $1,466 pp \| 7 nights · Book now" from `mobile-01` on. This is scored as a rule-driven choice, not a defect. The §3 order is unchanged: levels with price, included, the drop, lodge, rooms, waves + Rosa, reviews, closing, contact. Minus: trust and included are not on the first screen, as listed in `audit.json.recommended.above_fold`. |
| 5 | copy | 10 | 10.0 | **Round-1 fix verified:** one name per room everywhere. The tabs read "Mixed dorm room / Shared twin room / Deluxe double room"; the room headings, the home drawer and `book/` read "Mixed dorm room – 4 beds / Shared twin room – 2 beds / Deluxe double room". On `book/`, the hand-off note shows exactly once (1 visible "Next, on our Bookinglayer…" node at 390 and 1440). Every level and room name on `book/` fits on one line at 390. |
| 6 | accessibility | 9 | 7.2 | **Round-1 fix verified:** axe (wcag2a/aa, 21a/aa) after a full scroll finds 0 violations on home and on `book/`, at 390 and 1440. The inactive room tabs are now `rgba(7,43,53,.72)` on #fff, which is about #4C666E and computes to about 6.1:1 (it was 3.6:1). Desktop Tab pass: 58 stops; the skip link ("Skip to the surf weeks") comes first; 0 hidden stops, 0 without a ring, 0 unnamed. The drawer traps focus (0 of 40 Tabs left it). Esc closes it, returns the URL to `/` and puts focus back on "Book package now". "Choose Level 2" + Enter opens the drawer with `level-2-rollers` checked, and Esc returns focus to it. Reduced motion and Save-Data: 0 video requests and 0 playing over a full scroll, with 34 photographs visible. Alt: 50 images, 0 missing, 21 empty (decorative). audit tap targets under 44 px: 0. Minus (not new): the guest-count number fields in the steppers are 42 × 32, between 44 × 44 −/+ buttons. |
| 7 | security + delivery | 10 | 7.0 | Static build; 0 third-party requests on first load (audit, plus the probe on phone and desktop). Embeds: 1 (Rosa). After scrolling to it there is one site request to `rosa-data-opal…/south-point.json`, then the frame `rosa.surf/widget/?spot=south-point&theme=light&units=metric` (350×500 at 390, 420×500 at 1440, unmodified); the frame's own sub-requests come from Rosa's document. The headline reads live "Sat 17 Oct, 14:30". Fallbacks: with Rosa blocked, no frame, the headline empty and "See today's forecast for South Point on Rosa" shown; with the clock 3 days ahead, the headline is hidden and the same link shown; with JS off, "Open Rosa" links to rosa.surf/spot/south-point. The drop plates and poster load lazily: none in the first load, and they are requested once the levels are reached. |

Total: 20.0 + 13.5 + 13.5 + 4.5 + 10.0 + 7.2 + 7.0 = **75.7 / 80** (round 1: 72.9).

## Round-1 fixes

| # | round-1 fix | status | evidence |
|---|---|---|---|
| 1 | (d6) inactive room-tab contrast ≥ 4.5:1 | done | ~6.1:1; axe 0 on home at both widths |
| 2 | (d5) one name for the twin room | done | "Shared twin room – 2 beds" in drawer, `book/` and heading; tab "Shared twin room" |
| 3 | (d3) JS-off sends `end`, not `duration` | done | the JS-off hand-off URLs above carry `end=`, and no `duration` |
| 4 | (d4) what + where and proof on the first screen | what + where done; the proof point is deliberately kept off per the designer's hero rules | `mobile-00`/`desktop-00`; rating at `mobile-01` |

## Regressions

None that fails a gate or lowers a score. Small changes, measured:
- DCL on the throttled phone went from 1.77 to about 2.03 s (HTML +11 KB, the drop's inline blurred still). LCP did not move.
- Load / early-scroll CLS went from 0.0061/0.0072 to 0.0069/0.0069; the new `p.hero-sub` takes part in the font-swap shift. It is still under 0.01.
- The drop's poster and plates are now requested as soon as the levels come into view (round 1: 1,400 px before the drop). That is more data on a phone for a visitor who stops after the levels. It is not on the first load and not a budget line.
- Desktop: three `NAV.nav` shifts (total 0.0007) when the header snaps solid.

## Measured — playbook §4 budget (390×844, 1.6 Mbps / 150 ms / 4x CPU, no scroll)

| line | target | measured | |
|---|---|---|---|
| first-load transfer, video excl. | ≤ 1.5 MB | 478 KB | met |
| hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | 1.40 MB (p1080 webm) · 1.63 MB (d1920 webm) | met |
| JS, compressed | ≤ 300 KB | inline only (audit `bytes_js` 0) | met |
| largest above-the-fold image | ≤ 300 KB | 88 KB | met |
| fonts | ≤ 2 families, ≤ 150 KB | 82.7 KB, self-hosted | met |
| LCP | ≤ 2.5 s | 468–472 ms | met |
| CLS | < 0.1 | 0.0069 | met |
| scroll CLS early / settled | < 0.01 each | 0.0069 / 0 (3 of 3 runs) | met |
| third-party requests on load | 0 | 0 | met |

## Screenshots (`tools/shoot.mjs` on the served build; deleted after the round)

- Mobile: 19 frames, page 14,419 px. Desktop: 16 frames, page 12,952 px. Nothing truncated, no console errors.
- `mobile-00`: the hero video frame (palms, lodge roofs, sea) with the title, the new subtitle and "Book package now". `desktop-00` shows the same three lines centred over the coast.
- `mobile-01`: "Choose your level", the 8.6 Booking.com proof and the golden-hour Level 1 clip.
- `mobile-06…09` / `desktop-04…07`: the drop. It starts directly on the tint under "What's included" with no white seam, runs through the aerial plates into the pool, and ends on "Footwear is discouraged. Chilling out is inescapable." over the pool water. No blank or half-painted frames; the probe found the stage `ready` with the poster in from its first frame in view.
- `mobile-05`: "What's included" as a two-column list under a shorter photo.
- `mobile-11` / `desktop-09`: the room tabs, with the inactive names clearly readable.
- `mobile-13`: the Rosa headline and the widget.
- `mobile-15`: the review dots wrap inside the width.

## Evidence (in `reports/2026-10-globalsurf-03/`)

- `critic-verification-1/audit-v1-run1..3.json`: `tools/audit-mockup.mjs` run through a temporary `mockups/final -> ../final` symlink, removed afterwards. The site's own `final/audit.json` was restored byte for byte, and `git status` shows no change under `sites/`.
- `critic-verification-1/probe-v1.json`: load and scroll network on phone and desktop, header states, drop state per step, axe, tabs and room names, booking walk, JS-off hand-offs, reduced motion, Save-Data, Rosa blocked, Tab pass.
- `critic-verification-1/text-v1.txt`: the rendered text at 390.
- `funnel/global-surf-adventures-v2-v1/funnel.json`, served with `python3 -m http.server` (it redirects `/book` to `/book/`).

## What the designer prompt got wrong

Nothing new in this pass: every round-1 item was fixed without breaking a gate. The open item is structural. §3.1 asks for a proof point on the first screen, and the designer's hero rules forbid the rating there. Neither prompt names which one wins, so the critic, the auditor's `above_fold` list and the designer will keep disagreeing on every video-hero site. That conflict belongs in a base.md vs custom.md proposal (critic base hard constraint 7), not in a fix list.

## Remaining fixes (not failing; smallest first)

1. (d3) JS off: tie the check-out options to the chosen check-in (or default `end` to start + 7) so a later start cannot send an earlier end.
2. (d6) Make the guest-count fields in the steppers at least 44 px tall.
3. (d2) Optional: trim the inline blurred still (~11 KB of HTML) or defer it, to get back the ~250 ms of DCL.
