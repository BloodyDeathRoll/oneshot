# KA Surf Hostel v2: critic pre-score, round 3 (station 4f, quick, the designer's last round)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · designer round 3
(notes.md "Round 3" / round 8 of each variant). Earlier scorecards: `critic-4f.md` (r1), `critic-4f-r2.md` (r2).

Same method, order and widths as r1 and r2, in my own scratch subfolder: `tools/audit-mockup.mjs` from a
symlinked scratch tree, so the designer's `audit.json` files were never written (md5 checked before and
after: unchanged); `tools/shoot.mjs` at 1440 and 390 over http (0 console errors; screenshots read, then
deleted); `tools/check-design.mjs`; the Playwright walk (tap-through, scroll requests, JS off, all
third-party blocked, keyboard, axe-core 4.14 at 390 and 1440); page text diffed against `copy/en.json`
and against the r2 text; a Rosa failed-request run; an OSM-credit check at 390 and 1440. Evidence:
`evidence/r3-<variant>.{audit,walk,shoot}.json`, `evidence/r3-{interactive,unique}-{osm,rosa-blocked}.json`.

## Result

| variant | r1 | r2 | r3 | hard fails |
|---|---|---|---|---|
| calm "Patio" | 65.4 | 75.0 | **75.0** (pass on 1–7) | none |
| interactive "Stories" | 60.8 | 73.8 | **74.3** (pass on 1–7) | none |
| unique "The roll" | 67.7 | 72.2 | **74.3** (pass on 1–7) | none |

Scores are dimensions 1–7, out of 80. Dims 1, 3 and 7 are ≥ 6 on all three. Scroll CLS: calm 0.0015 / 0
(source `#text`), interactive 0.0003 / 0, unique 0.0004 / 0, all under 0.01. Final pass still needs
dimension 8 ≥ 8 from both visual critics.

## Measured (390 phone, throttled, no scroll)

| | calm | interactive | unique |
|---|---|---|---|
| first-load transfer (≤ 1536 KB) | 648 KB (17 req) | 770 KB (18) | 820 KB (36) |
| LCP (≤ 2500 ms) | 1864 | 1688 | 1140 |
| largest image (≤ 300 KB) | 70 KB | 127 KB | 70 KB |
| fonts (≤ 2 fam, ≤ 150 KB) | 50 KB | 67 KB (Caveat subset) | 34 KB |
| third-party on load | 0 | 0 | 0 |
| tap targets < 44 px / images without alt | 0 / 0 | 0 / 0 | 0 / 0 |
| axe 390 / 1440 | 0 / 0 | 0 / 0 | **0** / 0 (r2: 4 at 390, now fixed) |
| hero "Check dates" | Booking.com engine URL, exact; dialog with Booking.com, Hostelworld, Agoda, `tel:+94773746053`, all exact; focus stays in over 12 Tabs, Esc returns it | same | same |
| embeds | none | Rosa widget only (the Google map iframe is gone) | Rosa widget only |

## What changed and what I checked

- **Static map (interactive, unique).** `#map` is now a link to the dossier's Google Maps URL wrapping
  `img/map-osm.webp` (960 × 720, 52 KB, lazy). It is made by the committed recipe `make-media.sh`
  l. 75–99: 25 OSM tiles at zoom 16, fetched once with a named User-Agent, centred on the dossier pin
  `location.lat_lng`. The image matches its alt ("the hostel's pin north of the Matara Road, Kabalana beach
  to the south-west"). There is no Google request any more, so the page now has one third-party embed.
- **OSM licence check.** The credit "© OpenStreetMap contributors" is printed on the map at 12 px, ink on
  85 % white, and is the top element at its centre at 390 and 1440. This meets the attribution's wording and
  visibility. **It falls short on one point:** OSM's attribution guidelines ask that the credit say, or link
  to, where the ODbL licence is stated (normally the words link to `https://www.openstreetmap.org/copyright`).
  Here the credit sits inside the Google Maps link, so tapping it opens Google, and no link to
  `openstreetmap.org/copyright` exists anywhere on the page. Not a rubric hard fail: the map is not a
  `stock/` atmosphere image, and the credit is present. It is the one licence fix left.
- **Rosa failure path (r2 fix 1).** With rosa.surf blocked, the frame stays at opacity 0 and the
  "See today's forecast for Kabalana on Rosa" fallback is the top element in the box, so the link works.
  With JS off, the same fallback shows. On success, the widget is 358 × 500 in its 500 px box, after scroll.
  Note: the page now makes its own `fetch` to the widget URL before setting `src` (a reachability probe),
  so a visit makes one extra request to rosa.surf on top of the frame and the widget's JSON. This is within
  the "lazy, after scroll" rule, but it is one request more than hard constraint 9 describes.
- **Order.** Interactive and unique now put "The beach" right after the rooms (playbook §3 item 4). Calm
  already did in r2.
- **Text.** The only new page lines are "Guests" (calm nav) and the OSM credit. The sheets add a
  dorm/private choice ("3 dormitories", "3 room types": 3 + 3 rows in `room_types[]`). Quotes are 5/5
  verbatim on each page. Ratings 9.8 (66) / 9.4 (39) / 4.8 (42), read 25 Sep 2026, match the dossier.
  The weekday is "Mon 21 Sep 2026", which is correct.
- `check-design`: 0 problems, 0 warnings on all three (`#F1F2FB` ground; Kalam / Caveat / Nanum Pen
  Script; 0 all-caps labels). No horizontal overflow at 390 at any 400 px step; the persistent bar is
  present mid-page on all three.

## Scores

| # | dimension | calm | interactive | unique | evidence |
|---|---|---|---|---|---|
| 1 | facts (×2) | 9 | 9 | 9 | 0 mismatches, 0 unsourced. −1 each: check-in 13:00–23:00 is shown while `contradictions[1]` (Booking.com: 24 h) is unresolved. |
| 2 | mobile + perf (×1.5) | 10 | 10 | 10 | Every budget line is inside (table above); no overflow; scroll CLS < 0.01. |
| 3 | booking CTA (×1.5) | 9 | 9 | 9 | Engine URL exact, real link with JS off, sheet links exact. −1: hero to engine is 2 taps, with no 3b target to measure against. The dorm/private choice in the sheet does not change the links (nothing is carried to the engine). |
| 4 | brand fit (×0.5) | 9 | 9 | 9 | §3 order complete on all three, the spot now 4th. −1: no rates (dossier gap, stated on the page). |
| 5 | copy (×1) | 9 | 9 | 9 | −1: `copy/en.json` still carries Booking.com 9.5 (38); the page shows the dossier's 9.4 (39). |
| 6 | accessibility (×0.8) | 10 | 10 | 10 | axe 0/0; 0 small targets; modal sheet traps and returns focus; unique's strips are now focusable groups. |
| 7 | security + delivery (×0.7) | 10 | 9 | 9 | Static, self-hosted, 0 third-party on load, one lazy embed with a working fallback. interactive and unique −1: the OSM credit has no link to the ODbL/copyright page (above). |
| | **total /80** | **75.0** | **74.3** | **74.3** | |

**For the human:** the three pages are within 0.7 points of each other on 1–7. All are inside every
budget line with zero third-party requests on load, and all send "Check dates" to Booking.com.
Interactive and unique carry the live Rosa widget and a static map; calm carries neither.

## Remaining fixes (none blocking at 4f)

- **calm:** (1) update `copy/en.json` ratings to 9.4 / 39 (copy station); (2) ask the owner which check-in
  window is right before go-live; (3) optional: one tap from the hero to the engine.
- **interactive:** (1) move the OSM credit out of the Google link and link it to
  `https://www.openstreetmap.org/copyright`; (2) drop the extra `fetch` probe to rosa.surf, or record
  why it is needed; (3) the copy and check-in items as calm.
- **unique:** same three as interactive.
