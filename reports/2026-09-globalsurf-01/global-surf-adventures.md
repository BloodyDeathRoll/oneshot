# global-surf-adventures — critic quick pre-score (station 4f)

critic 0.3.3 · rubric 0.2.0 · run `2026-09-globalsurf-01` · 2026-09-28 · state `mocked`
Mockups: `sites/global-surf-adventures/mockups/{calm,interactive,unique}/dist/index.html` (designer 0.3.4).
Evidence folder: `reports/2026-09-globalsurf-01/critic-quick/`. Same checks, same order and same viewports for all three (hard constraint 5).

**The one sentence the human needs:** none of the three passes quick. Each one prints a statement the dossier doesn't support. Calm and unique mark Level 1 and Level 3 as having no filmed or photographed sessions, but both of the business's sources list them for those levels. Interactive's table head says "Every Saturday", but the dossier only says packages start on Saturdays. In interactive and unique, when Rosa's widget is blocked the space shows an empty 500 px box instead of the link. Otherwise all three measure alike: 1 tap to book to the engine, first load 284 KB (calm), 511 KB (interactive) and 267 KB (unique), and check-design reports no default-look findings for any of them.

## How the evidence was produced (identical for all three)

| Check | Command / file |
|---|---|
| Throttled first load, booking, a11y, no-JS, reduced motion | `node tools/audit-mockup.mjs global-surf-adventures <v>` → `sites/…/mockups/<v>/audit.json`, copied to `critic-quick/audit-<v>.json` |
| House rules + default look | `node tools/check-design.mjs sites/global-surf-adventures/mockups/<v>/dist/index.html --no-shots` → `critic-quick/check-design-<v>.txt` |
| Taps to book | `node tools/funnel.mjs sites/…/<v>/dist/index.html --depth 3 --out critic-quick/funnel/<v>` → `funnel/<v>/funnel.json` |
| Scrolled screenshots, 1440 × 900 + 390 × 844 | `node tools/shoot.mjs sites/…/<v>/dist/index.html --out sites/…/mockups/<v>/shots/critic-quick` (contact sheets `desktop-sheet.png`, `mobile-sheet.png`) |
| Tap-through, JS off, Rosa lazy/blocked, keyboard, reduced-motion canvas | critic probe over a plain `http://localhost` static server → `critic-quick/probe.json`, `nojs-390-<v>.png`, `rosa-blocked-<v>.png` |
| Page text vs passed copy, tables | `critic-quick/text-<v>.json` (`not_in_copy` = every string not in `copy/en.json`) |
| Contrast (DOM text on its opaque background, 390 px) | `critic-quick/contrast.json`: 0 pairs under AA on all three. Text over photographs was not scanned. |

## check-design default-look findings (facts, not preference)

| | calm | interactive | unique |
|---|---|---|---|
| h1 / h2 / body face | Barlow Condensed / Barlow Condensed / Barlow | Barlow Condensed / Barlow / Barlow | Barlow Condensed / Barlow Condensed / Barlow |
| ground | `rgb(244,245,251)` = hsl(231 47% 97%), a cool white (not in the cream range) | same | same |
| all-caps labels | 0 | 0 | 0 |
| labelled headings | 0/13 | 0/16 | 0/15 |
| problems / default-look warnings | 0 / 0 | 0 / 0 | 0 / 0 |

## Budget table, playbook §4 (measured: `audit-<v>.json` `first_load`, 390 × 844, 1.6 Mbps, 150 ms, 4x CPU, no scroll)

| Line | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | 284 KB | 511 KB | 267 KB |
| JS (external files) | ≤ 300 KB | 0 (no `<script>`) | 0 external; ≈ 6 KB inline in HTML (notes.md) | 0 external; ≈ 3 KB inline |
| Largest image on load | ≤ 200 KB | 79 KB | 119 KB | 132 KB (aerial, below fold, pulled by lazy threshold) |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 107 KB (Google Fonts) | 2, 107 KB (Google) | 2, 86 KB (Google) |
| LCP | ≤ 2.5 s | 604 ms | 576 ms | 596 ms |
| CLS | < 0.1 | 0.045 | 0.064 | 0.017 |
| Third-party on load | 0 | fonts.googleapis.com, fonts.gstatic.com | same | same |

All three load Google Fonts on first load. `agents/critic/tools.md` treats that as expected at 4e and a defect only in full mode, so it isn't counted as a hard fail here. No page overflows horizontally at 390 (probe `overflow_390` = 0 for all).

## Taps to book (`tools/funnel.mjs`, depth 3) vs `dossier/…/audit.json` `recommended` (engine, 1)

| | clicks_to_book | primary_action.class | CTA above fold | matches target |
|---|---|---|---|---|
| calm | 1 | engine (`…/product/level-1-fomies`) | yes | yes |
| interactive | 1 | engine (`…/level-1-fomies`) | yes | yes |
| unique | 1 | engine (`…/level-1-fomies`) | yes | yes |

## Tap-through at 390 × 844, touch (probe.json `taps`)

On all three, tapping fare rows 1, 2 and 3 went to `…/en/product/level-1-fomies`, `…/level-2-rollers` and `…/level-3-riders`. Each URL matches `dossier.booking.engine_products` exactly, with no `/tests/` or `/frontoffice/` and no added parameters. "Ask on WhatsApp" went to `wa.me/972523593240?text=Hi%20Global%20Surf%20Lodge%20Kabalana%2C…` (= `contact.whatsapp.value`). `tel:+97299733943` (= `contact.phone.value`). The persistent phone bar was checked at 50 % scroll: "Level 1 / Level 2 / Level 3 / WhatsApp" were visible on all three. With JS off, the engine links stay visible (15 / 12 / 15) and the fare rows still sit above the fold.

## Facts table (all three; every checkable item on the page → dossier key)

The passed copy (`copy/en.json`, 4c, `copy/sources.md`) was spot-rechecked against the dossier. The items the designers added (`text-<v>.json` `not_in_copy`) were checked one by one.

| Page item | Dossier key | calm | inter. | unique |
|---|---|---|---|---|
| USD 1,466 per person, 7 nights, each level, tax incl., dorm | `offers[0..2].price`, `.samples`, `booking.engine_rules.price_type` | match | match | match |
| "Prices as the booking engine showed them on 28 September 2026" | `offers[].fetched_at` 2026-09-28 | match | match | match |
| Google 4.7/5, 198 reviews, captured 28 Sep 2026 | `reviews.google` | match | match | match |
| Booking.com 8.6/10, 80 reviews; staff 9.5 | `reviews.booking`, `.categories.Staff` | match | match | match |
| 6 testimonials, author, platform | `reviews.quotes[]` (exact string compare: 6/6 verbatim) | match | match | match |
| Engine product URLs ×3 | `booking.engine_products` | match | match | match |
| WhatsApp +972523593240, phone +97299733943, info@globalsurf.com | `contact.whatsapp`, `.phone`, `.email` | match | match | match |
| Address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address` (Google, capitalised per playbook §6) | match | match | match |
| Check-in 14:00–20:00, check-out by 11:00 | `stayInfo.checkInFrom/To`, `checkOutTo` | match | match | match |
| 40 m Kathaluwa West, 350 m Kabalana Beach, ~2.5 h from Colombo, shuttle extra | `location.distance_to_beach.others`, `location.getting_there` | match | match | match |
| Season Oct–Apr / May–Sep low | `season.others[0]` | match | match | match |
| Rooms: dorm 4 single beds, private outdoor bath; shared twin 2, private bath | `room_types` (engine names), copy `rooms[]` | match | match | match |
| 5 guided (L1, L2) / 5 coached (L3) 2-hour sessions; 5 theory; 7 breakfasts; 5 dinners; excursion; 7 days equipment | `offers[0..2].includes_engine` / `includes_site` | match | match | match |
| Level 2: 2 filmed or photographed sessions | `offers[1].includes_engine` "2 photographed/filmed session", `includes_site` "×2" | match | match | match |
| **Level 1 and Level 3: filmed/photographed sessions shown as absent** | `offers[0].includes_engine` "2 photographed/filmed session", `includes_site` "A filming and photography day"; `offers[2].includes_engine` "4 photographed/filmed session", `includes_site` "×5" | **mismatch**: table cell "not included –" (calm) | not claimed (tabs list only the copy's inclusions) | **mismatch**: row "2 filmed or photographed sessions", cells "— / not listed" for Levels 1 and 3 |
| **Table head "Every Saturday, 7 nights"** | `booking.engine_rules.check_in_day` "Saturdays only … sampled 2026-10-03 … 2027-04-03"; `stayInfo.package_rules` "start on Saturdays" | — ("Starts on a Saturday") | **no entry**: asserts a departure every week; the dossier gives only the start day | — ("Starts on a Saturday") |
| "ISA-certified surf guides" | `credentials[0]` | match | match | match |
| Rosa spot "Kabalana", widget `spot=kabalana&theme=light&units=metric` | `concepts.md` mapping ("Kabalana main point" → Rosa `kabalana`) | n/a | match | match |
| Rosa headline 0.7–1.1 m, 12.6 s S, wind 6.5 km/h W cross-shore (unique rounds to 7 km/h), dated 21 Sep 20:30 | `agents/designer/fixtures/rosa-kabalana.json` (`current`), not dossier; labelled with its own date, never "now" | n/a | match | match |

## Rosa forecast and third-party embeds (hard constraint 9, playbook §4)

| Check | calm | interactive | unique |
|---|---|---|---|
| Embeds on the page | 0 | 1 (Rosa iframe) | 1 (Rosa iframe) |
| Rosa request on first load | — | none (first load: Google Fonts only) | none |
| After scrolling to the block | — | widget frame loads (+ Rosa's own requests inside it); CLS 0 during load | same; CLS 0 |
| Space reserved | — | 420 × 500 box (358 × 500 at 390) | same |
| JS off | — | fallback link "See today's forecast for Kabalana on Rosa" visible | visible |
| **Request to rosa.surf blocked** | — | **box is empty.** The iframe still fires `load`, `.fc-rosa.on` hides the link, and the box shows as blank ground (`rosa-blocked-interactive.png`) | **same empty box** (`rosa-blocked-unique.png`). Also empty in the `file://` shots, where Rosa's `frame-ancestors *` refuses the frame (`shots/critic-quick/shoot.json` errors) |
| Headline half: headline only, no day boxes | — | yes | yes |
| Credit "Forecast for Kabalana by Rosa" → rosa.surf/spot/kabalana | — | yes | yes |

## Look-log (station check)

calm has 7 rounds (4 on the first screen), interactive 6 (4 on the first screen), unique 6 (3 on the first screen, then whole-page rounds). Every round records a visible change. No station failure.

---

```
mode: quick        round: 1        variant: calm
total: 70 / 100    result: fail     hard_fails: [facts: Level 1 and Level 3 "Filmed or photographed sessions — not included" contradicts dossier offers[0].includes_engine/includes_site and offers[2].includes_engine/includes_site]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | 17 of 18 item rows match. 1 mismatch: includes table, row "Filmed or photographed sessions", Levels 1 and 3 = "not included" (`critic-quick/text-calm.json`; table dump in this report). The dossier lists 2 (engine) or a filming day (site) for Level 1, and 4 (engine) or 5 (site) for Level 3 |
| 2 | mobile + perf | 9 | 284 KB, LCP 604 ms, CLS 0.045, 0 JS, no overflow at 390 (`audit-calm.json`, `probe.json`). Minus 1: fonts come from Google (self-host at 4g) |
| 3 | booking CTA | 9 | 1 tap, engine class, above fold (`funnel/calm/funnel.json`). Every tap landed on the dossier URL (`probe.json taps`). JS-off links work. Minus 1: the WhatsApp prefill names the business but not the visitor's choice ("about a surf week") |
| 4 | brand fit | 8 | First screen at 390 shows, in order: what + where, three levels, fare, plates, dorm and date line, Google rating, WhatsApp (`shots/critic-quick/mobile-00.png`). Zero JS and no motion match the calm brief. Hierarchy follows playbook §3. No people section (a dossier gap) |
| 5 | copy | 7 | Copy text is unchanged from the passed en.json. One interface cell ("not included") makes a claim beyond the dossier |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures (`contrast.json`), focus outline on every tab stop, fare rows first in tab order (`probe.json tab_order`). 16 of 28 tap targets are under 44 px (text links: ratings, WhatsApp, phone, email). No skip link |
| 7 | security + delivery | 9 | Static output, 0 scripts, relative URLs, lowercase filenames, no CMS or localhost references, 0 embeds. Minus 1: Google Fonts on load (expected at 4e) |

what the designer prompt got wrong: the prompt lets the designer turn `lessons[].includes` into a comparison grid but never says that an empty cell is a claim. The copy dropped Level 1's and Level 3's filmed sessions because the site and the engine disagree on the count, and the grid then printed "not included" where the dossier says "included, count uncertain". A grid built from `includes` must leave a missing inclusion out of the grid entirely, never print it as absent.

fix list (fail only): 1. Remove the "Filmed or photographed sessions" row, or print only Level 2's figure without "not included" cells for Levels 1 and 3 (dim 1).

---

```
mode: quick        round: 1        variant: interactive
total: 63.5 / 100  result: fail     hard_fails: [facts: "Every Saturday, 7 nights" asserts a weekly departure with no dossier entry (booking.engine_rules.check_in_day gives the start day only)]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | 17 of 18 match. 1 claim has no entry: the table head "Every Saturday, 7 nights" (`text-interactive.json`; both desktop-00 and mobile-00 shots). Calm's notes.md already rejected the same word for this reason |
| 2 | mobile + perf | 8 | 511 KB (the heaviest of the three: 367 KB of images on load), LCP 576 ms, CLS 0.064 (the highest), no overflow. Fonts come from Google |
| 3 | booking CTA | 8 | 1 tap, engine, above fold (`funnel/interactive/funnel.json`). Every visible tap landed on the dossier URL. Minus 1: same prefill as calm. Minus 1: the first booking link in the DOM is WhatsApp. audit-mockup's `tapped` therefore records wa.me, and at 1440 the keyboard reaches WhatsApp and phone before the fare rows (`probe.json tab_order`) |
| 4 | brand fit | 8 | Fare table plus the swinging sign match the interactive brief. Tabs work with arrow keys (`probe.json tabs_arrow`). Hierarchy follows §3. WhatsApp is not on the phone's first screen (`mobile-00.png`) |
| 5 | copy | 7 | Copy is unchanged. The interface wording "Every Saturday" goes beyond the dossier |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures, visible focus, `role=tablist` with arrow keys. Reduced motion stops the swing (notes.md; no canvas). 20 of 31 tap targets under 44 px. No skip link. DOM order puts the contact links before the fares |
| 7 | security + delivery | 6 | Static, relative, lowercase, no CMS. 1 embed (Rosa): lazy, reserved, JS-off link visible. **When the request to rosa.surf fails, the box is empty** (`rosa-blocked-interactive.png`), which breaks playbook §4 ("never an empty box") and hard constraint 9. Google Fonts on load |

what the designer prompt got wrong: the concept's table head "Every Saturday" went into the page as interface wording without being checked against the dossier. The prompt says interface labels belong to the template, and that let a checkable claim through as "a label". Separately, the Rosa loader treats the iframe's `load` event as success. Chrome fires `load` for a refused or failed frame, so the fallback is hidden exactly when it's needed.

fix list (fail only): 1. "Every Saturday" → "Starts on a Saturday" (dim 1). 2. Show the Rosa link unless the widget has actually rendered, for example by keeping the link under the iframe instead of hiding it (dim 7). 3. Put the fare rows before the contact links in the DOM (dim 3).

---

```
mode: quick        round: 1        variant: unique
total: 67 / 100    result: fail     hard_fails: [facts: row "2 filmed or photographed sessions" marks Level 1 and Level 3 "— / not listed", contradicting dossier offers[0].includes_engine "2 photographed/filmed session" and offers[2] (4 engine / 5 site)]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 3 | 17 of 18 match. 1 mismatch: comparison table, Level 1 and Level 3 cells "not listed" (shown as "—") on the 2-filmed-sessions row. The Level 1 engine list contains exactly "2 photographed/filmed session" |
| 2 | mobile + perf | 9 | 267 KB (the lightest), LCP 596 ms, CLS 0.017, no overflow. Minus 1: the aerial (132 KB) loads on first load although it is lazy and below the fold. Google Fonts |
| 3 | booking CTA | 9 | 1 tap, engine, above fold. Every tap landed on the dossier URL. JS-off links work. Minus 1: same prefill as calm |
| 4 | brand fit | 8 | The drawn cross-section (sea, road, lodge, rails) with the fare table matches the unique brief. Hierarchy follows §3. First screen at 390 includes WhatsApp and phone (`mobile-00.png`) |
| 5 | copy | 7 | Copy is unchanged. The interface cells "not listed" go beyond the dossier |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures. Focus is shown by an underline plus a plate outline (`.row:focus-visible .plate`). Reduced motion hides the canvas, which then does not change (`probe.json rm`). 15 of 29 tap targets under 44 px. No skip link |
| 7 | security + delivery | 6 | Static, relative, lowercase, no CMS. 1 embed (Rosa): lazy, reserved, JS-off link visible. **Blocked or refused request = empty box** (`rosa-blocked-unique.png`; also every file:// shot). Google Fonts on load |

what the designer prompt got wrong: this is the same gap as calm, written differently. "not listed" reads as "not included" in a comparison grid, and it isn't true of the dossier, only of the passed copy. The same Rosa-loader defect as interactive, so it is a shared snippet or a shared instruction, not a one-off.

fix list (fail only): 1. Drop the Level 1 and Level 3 cells on the filmed-sessions row, or drop the row (dim 1). 2. Rosa fallback as in interactive's fix 2 (dim 7).

---

## Summary

| variant | total | result | hard fails | first load | taps to book |
|---|---|---|---|---|---|
| calm | 70 | fail | 1 (facts: L1/L3 filming "not included") | 284 KB | 1 (engine) |
| interactive | 63.5 | fail | 1 (facts: "Every Saturday") | 511 KB | 1 (engine) |
| unique | 67 | fail | 1 (facts: L1/L3 filming "not listed") | 267 KB | 1 (engine) |

Each hard fail is a one-line text change. Every other gating dimension (3 and 7) is ≥ 6 on all three.

---

# Round 2 (quick, after designer fixes in commit a820fb8)

critic 0.3.3 · rubric 0.2.0 · 2026-09-28 · evidence in `reports/2026-09-globalsurf-01/critic-quick-r2/`. Screenshots are in `sites/global-surf-adventures/mockups/<v>/shots/critic-quick-r2/`.

Same checks, same order and same viewports as round 1 for all three, with one change the coordinator asked for: `tools/funnel.mjs` ran at `--depth 1`. The runs were `audit-mockup.mjs`, then `check-design.mjs <file path> --no-shots`, then `funnel.mjs`, then `shoot.mjs` (file://). After those came the critic probe over http (tap-through, JS off, Rosa lazy load and blocked request, keyboard, reduced motion), then text against copy and a table dump, then contrast.

**The one sentence the human needs:** all three now pass quick with no hard fail. Each takes 1 tap to the level's page in the booking engine, and check-design reports no default-look findings. The measured differences: calm 284 KB with no JavaScript and no forecast; interactive 553 KB, the heaviest, and it carries the Rosa forecast; unique 268 KB with the Rosa forecast and a drawn sea animated on a canvas.

## Round-1 hard fails re-checked

| variant | round-1 fail | round 2 |
|---|---|---|
| calm | Level 1 and Level 3 filming "not included" | Row removed from the includes table. The new line under it, "Level 2's package lists 2 filmed or photographed sessions.", matches `offers[1].includes_engine` and `includes_site`. **Cleared** |
| interactive | "Every Saturday, 7 nights" | Now "Starts on a Saturday, 7 nights" (= `stayInfo.package_rules`). **Cleared** |
| unique | Level 1 and Level 3 filming "not listed" | Row removed from the comparison table. **Cleared** |
| interactive, unique | Rosa request blocked → empty box | Blocked request now shows "See today's forecast for Kabalana on Rosa" (`probe.json rosa_blocked.link_visible: true`, `rosa-blocked-<v>.png`). **Cleared** |
| interactive | WhatsApp first in DOM | Tab order now starts with the three fare rows. audit-mockup's `tapped` is now the Level 1 engine page. **Cleared** |

## check-design default-look findings (facts)

All three: 0 problems, 0 default-look warnings. Headings Barlow Condensed (interactive h2: Barlow), body Barlow, background `rgb(244,245,251)` = hsl(231 47% 97%) (cool white), 0 all-caps labels. Labelled headings: 0/13 (calm), 0/16 (interactive), 0/15 (unique).

## Budget, playbook §4 (throttled phone, no scroll; `audit-<v>.json`)

| Line | Target | calm | interactive | unique |
|---|---|---|---|---|
| First-load transfer | ≤ 1.5 MB | 284 KB | 553 KB | 268 KB |
| JS | ≤ 300 KB | 0 | 0 external; inline ≈ 6 KB | 0 external; inline ≈ 3 KB |
| Largest image | ≤ 200 KB | 79 KB | 119 KB | 132 KB |
| Fonts | ≤ 2 families, 150 KB | 2 families, 107 KB (Google) | 2, 107 KB (Google) | 2, 86 KB (Google) |
| LCP | ≤ 2.5 s | 600 ms | 576 ms | 600 ms |
| CLS | < 0.1 | 0.045 | 0.068 | 0.018 |
| Third-party on load | 0 | Google Fonts only (expected at 4e, tools.md) | same | same |

Interactive's images on load rose from 367 KB in round 1 to 409 KB. No page overflows horizontally at 390.

## Taps to book (`funnel.mjs --depth 1`) vs `audit.json.recommended` (engine, 1)

| | clicks_to_book | primary class | CTA above fold | matches |
|---|---|---|---|---|
| calm | 1 | engine (`…/level-1-fomies`) | yes | yes |
| interactive | 1 | engine | yes | yes |
| unique | 1 | engine | yes | yes |

Tap-through at 390 (`probe.json`): on all three, fare rows 1, 2 and 3 went to `…/level-1-fomies`, `…/level-2-rollers` and `…/level-3-riders`, identical to `booking.engine_products`. On calm and unique, WhatsApp and phone were tapped and landed on `wa.me/972523593240?text=…` and `tel:+97299733943`. On interactive the first six visible booking links the probe took were engine and Booking.com links; its WhatsApp and phone hrefs are identical in the DOM, and they were tapped in round 1. The persistent bar at 50 % scroll shows "Level 1 / Level 2 / Level 3 / WhatsApp" on all three. With JS off, the engine links are visible (15 / 12 / 15).

## Facts table, round 2 (in full)

| Page item | Dossier key | calm | inter. | unique |
|---|---|---|---|---|
| USD 1,466 per person, 7 nights, each level, tax incl., dorm | `offers[0..2].price`, `.samples`, `booking.engine_rules.price_type` | match | match | match |
| Prices captured 28 September 2026 | `offers[].fetched_at` | match | match | match |
| Google 4.7/5, 198 reviews, captured 28 Sep 2026 | `reviews.google` | match | match | match |
| Booking.com 8.6/10, 80 reviews; staff 9.5 | `reviews.booking` | match | match | match |
| 6 testimonials, verbatim, author, platform | `reviews.quotes[]` | match | match | match |
| Engine product URLs ×3 | `booking.engine_products` | match | match | match |
| WhatsApp, phone, email | `contact.whatsapp`, `.phone`, `.email` | match | match | match |
| Address (Google, capitalised) | `location.address` | match | match | match |
| Check-in 14:00–20:00, out by 11:00 | `stayInfo` | match | match | match |
| 40 m / 350 m / ~2.5 h / shuttle extra | `location.distance_to_beach.others`, `location.getting_there` | match | match | match |
| Season Oct–Apr, May–Sep low | `season.others[0]` | match | match | match |
| Rooms (dorm 4 single beds, outdoor bath; shared twin 2, private bath) | `room_types`, copy `rooms[]` | match | match | match |
| 5 guided (L1, L2) / coached (L3) 2-h sessions, 5 theory, 7 breakfasts, 5 dinners, excursion, 7 days equipment | `offers[0..2].includes_engine` / `includes_site` | match | match | match |
| Level 2: 2 filmed or photographed sessions | `offers[1].includes_engine`, `includes_site` | match | match | match (not printed) |
| Filming for Level 1 and Level 3 | `offers[0]`, `offers[2]` | not printed (gap left out) | not printed | not printed |
| Start day: "Starts on a Saturday, 7 nights" | `stayInfo.package_rules`, `booking.engine_rules` | match | match | match |
| "ISA-certified surf guides" | `credentials[0]` | match | match | match |
| Rosa spot `kabalana`, widget `spot=kabalana&theme=light&units=metric` | `concepts.md` mapping | n/a | match | match |
| Rosa headline (fixture, dated 21 Sep 20:30, never "now") | `agents/designer/fixtures/rosa-kabalana.json` | n/a | match | match (wind rounded 6.5 → 7 km/h) |

18 of 18 applicable rows match on all three; 0 mismatches, 0 unsupported claims.

## Rosa and embeds (hard constraint 9)

| Check | calm | interactive | unique |
|---|---|---|---|
| Embeds | 0 | 1 | 1 |
| Rosa on first load | — | none | none |
| After scroll to the block | — | widget frame loads; CLS 0 | same |
| Reserved space | — | 358 × 500 at 390 | same |
| JS off | — | link visible | link visible |
| Request to rosa.surf blocked | — | link visible | link visible |

---

```
mode: quick        round: 2        variant: calm
total: 86 / 100    result: pass     hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 18/18 match (table above). Minus 1: Level 1 and Level 3 filming is left out of the page. It is a dossier gap (site and engine counts differ), so the reader can't learn those levels include it |
| 2 | mobile + perf | 9 | 284 KB, LCP 600 ms, CLS 0.045, 0 JS, no overflow. Google Fonts |
| 3 | booking CTA | 9 | 1 tap, engine, above fold. Every tap landed on the dossier URL. JS-off links work. The prefill does not name the chosen level |
| 4 | brand fit | 8 | Unchanged from round 1 (`shots/critic-quick-r2/mobile-00.png`) |
| 5 | copy | 8 | Copy unchanged. The new interface line is sourced |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures, visible focus. 16 of 28 tap targets under 44 px. No skip link |
| 7 | security + delivery | 9 | Static, 0 scripts, relative URLs, lowercase names, 0 embeds. Google Fonts on load |

---

```
mode: quick        round: 2        variant: interactive
total: 83 / 100    result: pass     hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 18/18 match. Same gap handling as calm |
| 2 | mobile + perf | 8 | 553 KB (the heaviest; 409 KB of images on load), LCP 576 ms, CLS 0.068 (the highest). Google Fonts |
| 3 | booking CTA | 9 | 1 tap, engine, above fold. Fare rows now first in DOM and tab order. Same prefill note as calm |
| 4 | brand fit | 8 | The sign swings and the tabs work with arrow keys (`probe.json tabs_arrow`). WhatsApp is not on the phone's first screen (`mobile-00.png`) |
| 5 | copy | 8 | Copy unchanged. Interface wording is sourced |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures, visible focus, working tablist. 20 of 31 tap targets under 44 px. No skip link |
| 7 | security + delivery | 8 | Static, relative, lowercase, no CMS. Rosa lazy, reserved, fallback on JS off and on a blocked request. Google Fonts on load |

---

```
mode: quick        round: 2        variant: unique
total: 85 / 100    result: pass     hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 9 | 18/18 match. Same gap handling as calm |
| 2 | mobile + perf | 9 | 268 KB, LCP 600 ms, CLS 0.018, no overflow. The aerial (132 KB) is still pulled on first load by the lazy threshold. Google Fonts |
| 3 | booking CTA | 9 | 1 tap, engine, above fold. Every tap landed on the dossier URL. Same prefill note as calm |
| 4 | brand fit | 8 | Unchanged from round 1. WhatsApp and phone are on the phone's first screen |
| 5 | copy | 8 | Copy unchanged. Interface wording is sourced |
| 6 | accessibility | 7 | 0 images without alt, 0 contrast failures, focus shown (`.row:focus-visible .plate`). The reduced-motion canvas is hidden and static. 15 of 29 tap targets under 44 px. No skip link |
| 7 | security + delivery | 8 | Static, relative, lowercase, no CMS. Rosa lazy, reserved, fallback on JS off and on a blocked request. Google Fonts on load |

what the designer prompt got wrong (round 2): nothing new. The round-1 lessons stand: an empty or "not" cell in a comparison grid is a claim, and concept wording used as an interface label is still a checkable claim. Both were fixed in the pages, not in the prompt, so they belong in a learn-mode proposal.

## Round 2 summary

| variant | total | result | hard fails | first load | taps to book |
|---|---|---|---|---|---|
| calm | 86 | pass | 0 | 284 KB | 1 (engine) |
| interactive | 83 | pass | 0 | 553 KB | 1 (engine) |
| unique | 85 | pass | 0 | 268 KB | 1 (engine) |
