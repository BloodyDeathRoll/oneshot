# KA Surf Hostel v2: critic pre-score, round 2 (station 4f, quick)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · the designer's round 2
(notes.md rounds 6–7 of each variant). Round 1 scorecard: `critic-4f.md` (same folder). Earlier round not re-scored.

Same method, same order, same widths as round 1, in my own scratch folder:
`tools/audit-mockup.mjs` from a symlinked scratch tree (the designer's `audit.json` files untouched;
copies `evidence/r2-<variant>.audit.json`); `tools/shoot.mjs` at 1440 and 390 **over http**
(`evidence/r2-<variant>.shoot.json`, 0 console errors; screenshots read and deleted); `tools/check-design.mjs`;
the Playwright walk (first screen, tap-through with external navigation recorded, 400 px scroll steps,
JS off, all third-party blocked, Tab/Enter/12 Tabs/Esc at 1440, axe-core 4.14 at 390 and 1440 —
`evidence/r2-<variant>.walk.json`); the page text at 1440 diffed against `copy/en.json` and traced to the
dossier; plus a failed-request run for the embeds (`evidence/r2-{interactive,unique}-embeds-blocked.json`).

## Result

| variant | r1 (1–7, /80) | r2 (1–7, /80) | hard fails |
|---|---|---|---|
| calm "Patio" | 65.4 | **75.0** (pass on 1–7) | none |
| interactive "Stories" | 60.8 | **73.8** (pass on 1–7) | none |
| unique "The roll" | 67.7 | **72.2** (pass on 1–7) | none |

Dims 1/3/7 ≥ 6 on all three; scroll CLS 0 / 0 on all three. Final pass still needs dimension 8 ≥ 8 from both visual critics.

## What changed, measured

| | v2 calm | v2 interactive | v2 unique |
|---|---|---|---|
| first-load transfer (≤ 1536 KB) | 626 KB (16 req) | 802 KB (18) | 773 KB (27) |
| LCP (≤ 2500 ms) | **1876** (r1 2960) | **1852** (r1 3432) | 1432 (r1 1564) |
| largest image (≤ 300 KB) | 70 KB | 127 KB | 70 KB |
| fonts (≤ 2 fam, ≤ 150 KB) | Albert Sans + Kalam, 53 KB | Public Sans + Caveat, 99 KB | Switzer + Nanum Pen Script, 50 KB |
| CLS load / scroll early / settled | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| third-party hosts on load | **0** (fonts now self-hosted) | **0** | **0** (Fontshare gone) |
| tap targets < 44 px | 0 of 35 | 0 of 47 | 0 of 42 |
| axe (390 / 1440) | 0 / 0 | 0 / 0 | **4** `scrollable-region-focusable` / 0 |
| booking sheet | modal `dialog` (was non-modal popover): focus stays in over 12 Tabs, Esc closes, focus back on "Check dates" | same | same |
| hero "Check dates" (JS off href / sheet first link) | `https://www.booking.com/hotel/lk/ka-surf-hostel.html` = `booking.engine_url` | same | same |
| Rosa widget + map | none (concept) | **load after scroll**: widget + `rosa-data-opal…/kabalana.json` at y 7200, map at 10400; 358 × 500 in the 500 px box, 358 × 269 in the 269 px box; 0 requests on load | same (widget at y 8000, map 10800) |
| forecast weekday | — | "Mon 21 Sep 2026" (fixed) | "Mon 21 Sep 2026" (fixed) |

Sheet contents on all three, tapped at 390: Booking.com, Hostelworld, Agoda, `tel:+94773746053`, all
character-for-character the dossier; the first sheet link navigates to Booking.com. With JS off: 4 booking
links in `#book` (15–16 on the page), Rosa block shows "See today's forecast for Kabalana on Rosa", map
block shows "Open in Google Maps", 0 iframes. `check-design`: 0 problems, 0 warnings on all three
(grounds `#F1F2FB`; display faces Kalam / Caveat / Nanum Pen Script; 0 all-caps labels). No overflow at 390
at any scroll step. Facts: the page text adds no new claims over r1; 5/5 quotes verbatim on each page;
ratings 9.8 (66) / 9.4 (39) / 4.8 (42) read 25 Sep 2026 = the refreshed dossier; address, stay times,
distances, phone as in the r1 facts table.

## Scores

| # | dimension | calm | interactive | unique | evidence |
|---|---|---|---|---|---|
| 1 | facts (×2) | 9 | 9 | 9 | 0 mismatches, 0 unsourced (r1 table holds). −1 each: check-in 13:00–23:00 is published while dossier `contradictions[1]` (Booking.com: 24 h) is unresolved. Weekday error gone. |
| 2 | mobile + perf (×1.5) | 10 | 10 | 10 | Every budget line inside (table above); scroll CLS 0; no overflow; persistent "Check dates" + call bar mid-page on all three. |
| 3 | booking CTA (×1.5) | 9 | 9 | 9 | Primary action now the dossier's engine (Booking.com), exact URL, real link with JS off; sheet links exact. −1: hero → engine is 2 taps (sheet), and there is still no 3b `audit.json` target to measure against. |
| 4 | brand fit (×0.5) | 9 | 8 | 8 | calm: spot moved up to §3 item 4 (rooms → Kabalana → breakfast …). interactive and unique: the beach still comes after guests, breakfast and amenities (−1). All: no rates (dossier gap). Embeds now render. |
| 5 | copy (×1) | 9 | 9 | 9 | copy/en.json plus labels. −1: copy still carries Booking.com 9.5 (38); the page uses the dossier's 9.4 (39). |
| 6 | accessibility (×0.8) | 10 | 10 | 8 | axe 0 (calm, interactive); 0 small targets; modal sheet traps and returns focus; reduced motion static; skip link; 2 px focus outline. unique −2: axe at 390 flags 4 `scrollable-region-focusable` — the new five-frame image bands (`#family`, `#here-is`, `.beach` … `.band[data-rise="img"]`) are `overflow-x: auto` with the scrollbar hidden and nothing focusable, so a keyboard user cannot scroll them. |
| 7 | security + delivery (×0.7) | 10 | 9 | 9 | Static, inline JS, self-hosted fonts, relative paths, 0 third-party on load. interactive/unique: 2 embeds, lazy, reserved, JS-off fallback (hard constraint 9 met). −1: when the embed request **fails** (all Rosa/Google hosts blocked), the frame still fires `load`, fades in and covers the fallback — `elementFromPoint` at the "See today's forecast" link returns the `IFRAME` for both embeds, so the visitor sees the browser's error page there (the separate "Forecast for Kabalana by Rosa" credit link and "Open in Google Maps" link elsewhere still work). Not measured: the playbook budget with both embeds loaded (the Google Maps embed alone makes about 30 requests after scroll). |
| | **total /80** | **75.0** | **73.8** | **72.2** | |

**For the human:** all three are now inside every budget line with zero third-party requests on load, and
all three send "Check dates" to Booking.com. Interactive and unique show the live Rosa widget and the map
after scrolling; calm carries neither.

## Remaining top fixes

**calm**
1. Nothing blocking at this stage. Before 4g: refresh `copy/en.json` ratings to 9.4 / 39 so copy and page agree.
2. Ask the owner which check-in window is right (Hostelworld 13:00–23:00 vs Booking.com 24 h) before go-live.
3. Optional: one tap to the engine from the hero (the sheet adds a step).

**interactive**
1. Keep the plain-link fallback visible when an embed fails: fade the frame in only after a success signal or a timeout check, or keep the link outside the frame's box.
2. Move "The beach" (spot) ahead of guests / breakfast / amenities (playbook §3 item 4).
3. Measure the page budget with both embeds loaded (Google Maps embed ~30 requests); a static map image linking to Google Maps is the lighter option the playbook allows.

**unique**
1. Make the five-frame image bands keyboard-reachable (`tabindex="0"` + an `aria-label` on each band) or stop them scrolling on the phone.
2. Same embed-failure fallback fix as interactive.
3. Move "The beach" ahead of the amenities, and measure the budget with both embeds loaded.

## What the designer prompt got wrong (round 2)

The embed fix verified the success path only: the iframes now fade in on `load`, but a cross-origin frame
fires `load` on a failed request too, so the fallback the playbook requires ("a plain link … when the
request fails") is covered by the browser's error page. The designer's own check should include a run with
the embed hosts blocked and confirm the fallback link is the top element in the box.
