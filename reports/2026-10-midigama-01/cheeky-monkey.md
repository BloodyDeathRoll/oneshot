# cheeky-monkey — critic scorecards (run 2026-10-midigama-01)

## Round 1 — full (station 5)

critic 0.4.3 · rubric 0.3.1 · 2026-11-03 · build `sites/cheeky-monkey/final/dist/` (index.html 102,559 B, dated 2026-11-03 19:55, which is after 4h/4i) · served by a plain static server (`tools/_serve.mjs`) on :8961. `astro preview` would not start a second server while the user's preview held :8950, and that server was left alone. Independent: I did not read any visual-critic or experience-critic report. Context: the 4f quick pre-score did not run before gate b, so this is the critic's first look at the page.

```
mode: full        round: 1        variant: unique ("Pick your board")
total (dims 1–7): 65.1 / 75      result: fail      hard_fails: [primary action class tel ≠ recommended engine (funnel.json)]
dimension 8 (weight 25): not scored here, it belongs to visual-critic + experience-critic
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | Facts table below: **0 mismatches, 0 unsourced claims**, 41 claim groups checked against `dossier.json`. All 11 testimonials match `reviews.quotes[].text` **character for character** (checked by script), with matching author, source and month. Ratings are Google 4.5/5 · 467 and Booking.com 8.3/10 · 45, both shown with "26 Oct 2026" = `fetched_at` 2026-10-26. Every price carries "Published 2021, call to confirm". `audit.json.facts`: 48 numbers, 1 not in the copy ("3.0," from the CC BY-SA 3.0 credit, not a claim). −1: some present-tense statements rest on 2021 or older sources the dossier itself flags as uncertain. "Yoga happens up there too, at sunrise and at sunset" comes from a 2021 source. "Five dinners" sits in the package inclusions while `facilities` notes that guests from Dec 2025 to Mar 2026 found the restaurant closed, and Facebook says the Midigama site is closed for low season (`status_flag`). The page says nothing about open status, which is the agreed gap (notes "Open (human decisions)"), so this is not a mismatch. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `critic-cheeky-monkey-r1/audit.json` (throttled 390×844, 1.6 Mbps / 150 ms / 4× CPU): first load **392 KB** in 7 requests (HTML 102.6 KB with CSS and JS inline, fonts 64.9 KB, images 234 KB). JS 0 external files (about 7 KB gzip inline per the build notes). Largest image **75.6 KB**. **LCP 1,456 ms**. **CLS 0**. Scroll CLS early 0 / settled 0. Video after first paint: phone `m720.mp4` 1.86 MB (≤ 2 MB), desktop `d1920.webm` 1.77 MB, MP4 fallback 3.75 MB (≤ 4 MB). These are the only video requests seen at each width (`a11y.json` videoRequests). Fonts: 2 families, 65 KB, self-hosted. Layout at 390: `scrollWidth` 390 = `clientWidth` with no horizontal scroll. The elements past the edge are the clipped decorative beach layers (`i.sea/.foam/.wet/.sand`) and the swipe rows. Contact sheets: the first screen shows wordmark + "Surf Camp \| Midigama, Sri Lanka" + phone icon, the board window, the featureLine and the blue "Check dates on Booking.com" button, all in 844 px. No text overlaps in any of the 23 phone captures. −1: `font-display: optional`, while playbook §4 says `swap`. This is documented as build conflict 2 (swap measured early-scroll CLS 0.13) and is a deviation, not a defect. |
| 3 | booking CTA | 15 | 6 | 9.0 | **Tap-through (390, touch):** `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, identical character for character to `booking.engine_url`. The hero button is a plain `<a href>` at y 772, above the fold, and with JS off it is still that link (scratch JS-off pass). Every `tel:` is `+94719248686` = `contact.phone`. The `mailto:` links carry a prefilled subject naming the business and the offer ("Cheeky Monkey: Yoga and Surf Lesson Package week"). The drawer "Plan a stay" holds 6 booking links with JS off. Clicks to book **1 ≤ 1** (target `recommended.clicks_to_book` 1). **But** `funnel/cheeky-monkey-r1/funnel.json`: `primary_action.class` = **tel** ("Call +94 71 924 8686", the header phone icon, top 9 px) and `hero_action.class` = **tel**, both ≠ `recommended.primary_action` **engine**. The header icon is the first terminal action in DOM order and the top-most action above the fold, so both of funnel.mjs's readings pick it over the Booking.com button 763 px lower. Hard constraint 3 and rubric: a different class is a hard fail, and dimension 3 loses its points. Everything else on the path works end to end, so the score is capped at 6 rather than set lower. |
| 4 | brand fit | 5 | 8 | 4.0 | Playbook §3 order on the page: first screen what + where (header "Surf Camp \| Midigama, Sri Lanka") + strongest owned media (vid-009 in the board window) + one booking action. Then intro → spot and season ("Down at the water") → four surf weeks with prices → inclusions → lessons with level, length, group size and price → 5 rooms → staying-here rules → shop → roof/amenities → Baba (people) → 11 reviews + 2 ratings → getting here (address, distances, map link, transfers) → good to know → closing → footer contact. A persistent phone bar (Booking.com + "Plan a stay") shows in phone captures 01–22 and is not on screen 00, so nothing covers content on load. Custom.md: one clear CTA in the hero, and the main item comes from the place's own media (WebGL over the shop reel). −2: spot and season come before the offers (§3 puts offers 2nd and spot 4th), and the `recommended.above_fold` items "included, price, level, trust" are first reached at about y 2,400 on the phone (capture 05). Concepts §5 chose that on purpose ("not crammed into the first screen"), and audit.json's own `offer_framing` says "Prices … never on the first screen", so this is a small deduction. |
| 5 | copy | 10 | 8 | 8.0 | Plain and specific: prices with unit and year, room size, beds and sleeps, distances with their source ("Booking.com puts Midigama Beach 350 m away"), and honest gaps ("There's no generator for power cuts"). English complete (run languages `[en]`). There are no claims beyond the dossier. The copy left out "biggest" and "oldest" on purpose. −2: the intro heading "Catch waves, not worries" and the featureLine "Come as a stranger, leave as a friend" are generic surf and hospitality slogans (rubric: "no generic surf clichés"), even though both are the owner's own words (`business.tagline_alt`, `description_about`). The first is the first heading a visitor reads after the hero. A hidden status string "Loading the shop's reel" is also in the DOM text. |
| 6 | accessibility | 8 | 7 | 5.6 | axe-core 4.x (local copy `~/quiz-quest/node_modules/axe-core`, nothing installed), WCAG 2.0/2.1 A + AA, after a full wheel scroll with third-party requests blocked: **1 violation at both 390 and 1440: `listitem` (serious), 34 nodes.** The room photo tracks are `<ul class="track" role="group" aria-label="… photos">`, and the role on the `<ul>` removes list semantics from its `<li>` children. 26 rule sets pass. Incomplete: `color-contrast` 167 / 166 nodes (text over gradients and images). My own solid-background check found only the testimonial source links "Booking.com" / "cheekymonkeymidigama.com" at **4.44:1** (`#0B72C4` on `#EAF3FE`, 15 px), just under 4.5. The white-on-pill "Follow" flag is a false positive (the pill is a shape). Keyboard: a real skip link "Skip to surf weeks and prices" → `#counter` is the first stop. Every stop shows a 3 px solid outline. Drawer: Enter on "Plan a stay" opens `#book`, 40/40 Tabs and 5/5 Shift+Tabs stay inside, Esc closes it, and focus returns to "Plan a stay" at both widths. `audit.json`: 0 images without alt (7 decorative `alt=""`), 0 of 83 tap targets under 44 px, H1 then H2/H3 in order, `lang="en"`. Reduced motion: 1 canvas, hidden, photograph visible. 0 page errors. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static output only: `dist/` holds 64 files, 12 MB, no server code and no worker script. **0 third-party requests on first load** (`first_load.third_party_hosts` []) **and 0 attempted over a full scroll at 390 and 1440** (`a11y.json` externalRequestsAttempted []). Fonts, video, photos and the stock image are self-hosted. There is no CMS call (the seed is `src/tenant/content.json`). URLs are relative (no `src`/`href` starts with `/`). Filenames are all lowercase `[a-z0-9._-]`. No `localhost`, key, token or secret in `index.html` or `llms.txt`. The preview rule is on: `<meta name="robots" content="noindex, nofollow">`, robots.txt `Disallow: /` for `*` and 15 named AI crawlers, no sitemap. There are no third-party embeds (count 0 of the 2 allowed). |
| | **total 1–7** | 75 | | **65.1** | |

Hard fails: **1**. The built site's primary booking action class, as measured by `tools/funnel.mjs`, is **tel**. `audit.json.recommended.primary_action` is **engine**. Not a hard fail: facts (0 mismatches), CTA landing (the Booking.com URL and the phone number are exact), third-party on load (0), CMS dependency (none), keyboard trap (none: the drawer trap is intended, and Esc releases it), budgets (all met), secrets (none). The licence of the atmosphere image is not a hard fail either: stock-003 is CC BY-SA 3.0, which PLAN.md §9 (amended 2026-09-20) allows "for display only": shown whole with its credit and never cropped, re-saved or fed through a shader. I checked each condition. `dist/atmo/stock-003.jpg` is byte-identical to `dossier/cheeky-monkey/stock/stock-003.jpg` (`cmp`). It is rendered at ratio 1.495 = 2560:1712 at 390 and at 1440, with `object-fit: fill`, no filter, no transform and no clipping ancestor. The credit on the page equals `stock/index.json` `credit` character for character, and `place_ok` is `local`. The rubric's bare "share-alike" exclusion is older than that amendment. It is flagged here for the human and not scored.

Pass thresholds (full): dimensions 1–7 are each ≥ 6 ✓. All playbook §4 budget lines are met ✓. No hard fail ✗. Total ≥ 85 needs dimension 8 ≥ 19.9 / 25, which needs both visual critics at ≥ 8 (pending, not read).

**what the designer prompt got wrong:** Nothing in the designer prompt tells it that `tools/funnel.mjs` reads the **first terminal action in DOM order** (and, for `hero_action`, the top-most one above the fold) as the site's primary action. So a small header phone icon placed before the hero button turns an engine-led page into a "tel" page, a hard fail, even though the page a visitor sees leads with Booking.com. The concept asked for exactly this layout ("Header: wordmark left, the phone icon right"), so it slipped past concept, mockup and build. The designer's hand-off check should run `funnel.mjs` and compare `primary_action.class` with `audit.json.recommended.primary_action` before 4g hands off. Two smaller misses: the room-gallery `<ul>` carries `role="group"` (an axe `listitem` serious violation repeated 34×), and the hero/intro slogans are the owner's clichés reused without a check against rubric dimension 5.

**fix list (smallest first):**
1. **Dim 6:** drop `role="group"` from the room photo `<ul class="track">` (or move the role and label to a wrapper `<div>`) so the `<li>`s are list items again. 34 axe nodes, 5 rooms.
2. **Dim 6:** raise the testimonial source-link colour on the light card (`#0B72C4` on `#EAF3FE` = 4.44:1) to at least 4.5:1.
3. **Dim 3, hard fail:** make the site's first and top-most terminal action the engine. Either put the Booking.com action first in the header, or move the header phone link after the hero button in the DOM. Then re-run `node tools/funnel.mjs <url> --depth 3` and confirm `primary_action.class` = `hero_action.class` = `engine`. If the human rules instead that a header icon is not the primary action, the fix is to `tools/funnel.mjs`, which needs a proposal, not to the site.
4. **Dim 5 (optional, not gating):** replace "Catch waves, not worries" as the intro heading with a specific line from the copy, such as the shop or the main road. That needs a copy station decision because it is the owner's own headline.

### Facts table (claim → dossier key → result)

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Cheeky Monkey" / "Cheeky Monkey Surf Camp" (wordmark, title, og, JSON-LD) | `business.name` | match |
| "Surf Camp \| Midigama, Sri Lanka" | `business.type`, `location.address` | match |
| "Come as a stranger, leave as a friend." | `business.description_about` | match (owner's words) |
| "Catch waves, not worries" | `business.tagline_alt` | match (owner's words) |
| surf and yoga camp on the main road, close to the main point breaks | `business.tagline`, `location.spot` | match |
| Baba's Surf Shop alongside; rent, buy, repair | `business.run_by`, `rentals[1–2]` | match |
| Spot: main point breaks, many breaks a short walk | `location.spot` (+ host note) | match |
| Season: October till March or April; waves nice, beach clean | `season` | match |
| Full Surf Lesson USD 400 / 300 / 300, per person, 7 nights | `offers[0–2]` | match |
| Moderate USD 350 / 295 / 280 | `offers[3–5]` | match |
| Yoga and Surf USD 300 / 280 / 280 | `offers[6–8]` | match |
| Surf Board Rental USD 290 / 250 / 250 | `offers[9–11]` | match |
| Ranges USD 300–400, 280–350, 280–300, 250–290 | derived from `offers[0–11]` | match |
| "published 2021" on every price | `offers[].note` (WP modified 2021-02-12 / 2021-01-05) | match |
| 2 lessons/day × 6 days + rest day; Moderate 1 lesson or 1 guided session; Yoga+Surf 1+1; any board 7 days + tuk-tuk lesson | `packages[0–3].includes` | match |
| 7 nights, 7 breakfasts, 5 dinners, 2–3 yoga, party night, weekly BBQ, gym | `packages[*].includes` | match |
| Board + ride to the spot "with the three lesson packages" | `packages[0–2]` (not in [3]) | match |
| Lake tour USD 5 extra | `packages[*]`, `offers[25]` | match |
| Lesson USD 20 per person, 90 min | `lessons[0]` | match |
| Beginner / intermediate / advanced | `levels[0–2]` | match |
| Private lesson; group max 6; SUP; surf spot tour | `lessons[1,3,4,5]` | match (group price USD 100 omitted, its unit unclear) |
| Fitted to your level, pace and style; total beginner … next big ride | `business.description` | match |
| 5 rooms: beds, sleeps, m², views, top floor, desk, ocean from the entrance | `room_types[0–4]` | match (5/5) |
| Check-in 14:00–19:00, check-out 06:00–11:00 | `stay_info.check_in/out` | match |
| Adults only, no pets, no smoking, no extra beds, cash only, quiet 23:00–06:00, photo ID + credit card | `stay_info.house_rules` | match ("Children are not allowed" → "Adults only") |
| A/C, private bathroom, private entrance in every room | `room_types_note` | match |
| Amenities line (16 items incl. WiFi 57 Mbps, parking, shuttle, CCTV) | `facilities[]` | match |
| 400 boards; sizes, tails, colours; shortboards, longboards, fish | `rentals[0]` | match |
| Shaper fixes boards fast | `rentals[2]` | match |
| Beachwear, straps, bags, wax; run by surfers, for surfers | `business.description_shop` | match |
| Own brand shaped in Bali; scooters | `rentals[1]`, `rentals[3]` | match |
| Brands: Cheeky Monkey, Creatures of Leisure, Shapers | `brands[]` | match (subset) |
| 180° sea view; rooftop quote | `location.views`, `reviews.quotes` (Mihrican) | match |
| Rooftop yoga at sunrise and sunset | `facilities[5]` (2021) | match (dated source) |
| Opened late 2009: 3 rooms, tiny shop, restaurant; 10 rooms by 2021 | `business.since`, `room_count` | match |
| Baba founded it; self-taught at twelve; surf instructor; shop named after him | `business.run_by`, `business.owner` | match (contested surname not used) |
| 11 testimonials, authors, sources, months | `reviews.quotes[]` | match 11/11 verbatim |
| Google 4.5/5 · 467 · 26 Oct 2026 | `reviews.google` | match |
| Booking.com 8.3/10 · 45 · 26 Oct 2026 | `reviews.booking` | match |
| Distances 350 m, 800 m, 2 km, 3.3 km, 10 km | `location.distance_to_beach`, `location.nearby` | match |
| Address "Galle - Matara Main Road, Midigama East Midigama, Ahangama 80650, Sri Lanka" | `location.address` (Google, site form) | match |
| Airport drop USD 65, pick-up USD 65, both USD 130, 2021 | `offers[15–17]` | match |
| No generator; taxi, safari, cooking class | `facilities[15]`, `facilities[17]` | match |
| +94 71 924 8686 / cheekymonkeymidi@gmail.com / Booking.com / Instagram / Facebook / site / map | `contact.*`, `booking.engine_url`, `location.map_url` | match |
| JSON-LD geo 5.9617986, 80.3967609; checkin 14:00 / checkout 11:00; priceRange USD 20–400 (2021); knowsLanguage en | `location.lat_lng`, `stay_info`, `offers`, `languages_spoken` | match |
| Meta description "… with 400 boards to rent" | `rentals[0]` | match |

### Playbook §4 budget, measured

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (video excluded) | ≤ 1.5 MB | 392 KB (401,469 B, 7 requests) | ✓ |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | 1.86 MB `m720.mp4` · 1.77 MB `d1920.webm` (MP4 fallback 3.75 MB) | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; inline about 7 KB gzip | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 75.6 KB | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 64.9 KB | ✓ |
| LCP | ≤ 2.5 s | 1,456 ms | ✓ |
| CLS | < 0.1 | 0 (scroll early 0, settled 0) | ✓ |
| Third-party requests on load | 0 | 0 (and 0 over a full scroll) | ✓ |

### Network log, first load (390, throttled)

Only the local host serves the 7 requests: HTML 102,559 B, 2 woff2 (64,900 B total), and 4 images (234,010 B, largest 75,614 B, the poster). `third_party_hosts: []`. Over a full scroll with every non-local request aborted, none was attempted at either width. The only video request is the tier for the width.

### Screenshots (deleted after the round; `tools/shoot.mjs`, 1440 × 900 ×20 and 390 × 844 ×23, page 15,562 / 17,203 px)

- `mobile-00`: the header shows the wordmark, "Surf Camp | Midigama, Sri Lanka" and a round phone icon at top right. "Come as a stranger," is above a tall surfboard-shaped window showing the shop reel's poster (a multicolour board) over a drawn sky, sea and sand. "leave as a friend." is below it, then the blue "Check dates on Booking.com →" button. Nothing else is on screen and no bar is shown.
- `mobile-01–02`: the zoom-through fills the screen with resin boards. Then "Catch waves, not worries" and the intro on a sand ground. The bottom bar is now shown ("Check dates on Booking.com" + "Plan a stay").
- `mobile-03–04`: the stock-003 sea photograph with its credit line, "Down at the water" with "The spot" and "The season" cards, and two owned surf photographs.
- `mobile-05–08`: "A week of surf" with the four price cards on a swipe row, the "Published 2021, call to confirm" pill, "Call to book" + an email icon, "Every week comes with" as an icon list, and the lesson card at USD 20.
- `mobile-08–11`: the rooms, each a photo slideshow plus a "Check dates on Booking.com" button, then the "Staying here" card.
- `mobile-12–14`: Baba's Surf Shop with a photo masonry and "Message us on Instagram". "Up on the roof" with a sunset surfer photo and the amenities line.
- `mobile-15–17`: "Three rooms in 2009" with Baba's portrait, "What guests say" (1 / 11 slideshow), and the 4.5/5 and 8.3/10 rating cards.
- `mobile-18–22`: "Getting here" with the shop-front photo, address and transfers, "Good to know", the closing board and line, the three booking buttons, the Instagram tiles and the footer.

### Evidence files

- `reports/2026-10-midigama-01/critic-cheeky-monkey-r1/audit.json`: `tools/audit-mockup.mjs cheeky-monkey ../final`, moved here. The designer's own `final/audit.json` was restored unchanged.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r1/a11y.json`: axe at 390 and 1440, overflow, the first 12 Tab stops, the drawer trap/Esc/focus return, external requests attempted over a full scroll, video requests, page errors.
- `reports/2026-10-midigama-01/funnel/cheeky-monkey-r1/funnel.json`: `tools/funnel.mjs http://localhost:8961/ --depth 3`.
