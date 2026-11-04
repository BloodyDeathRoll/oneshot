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

## Round 2 — full (station 5)

critic 0.4.3 · rubric 0.3.1 · 2026-11-04 · build `sites/cheeky-monkey/final/dist/` (index.html 91,991 B, built 2026-11-04 12:38, designer 0.7.1 round 2). It was served by a plain static server (`tools/_serve.mjs` on :8961), which was stopped afterwards. The user's `astro preview` on :8950 was not touched. Scored fresh against the rubric and the dossier. I did not read any visual-critic or experience-critic report.

```
mode: full        round: 2        variant: unique ("Pick your board", first screen replaced by the drone loop on Alon's decision)
total (dims 1–7): 70.4 / 75      result: fail (one hard fail, which only the human can clear)      hard_fails: [image policy: hero footage vid-001, licence unknown]
dimension 8 (weight 25): not scored here, it belongs to visual-critic + experience-critic
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | The round-1 facts table was re-checked against the changed build, and the new claims were added (table below). **0 mismatches, 0 unsourced claims.** The 11 blockquotes are verbatim `reviews.quotes[].text`, checked by script (11 of 11 match, 0 no-match). Google 4.5/5 · 467 and Booking.com 8.3/10 · 45 each carry "26 Oct 2026" = `fetched_at`. "Published 2021" appears 7 times beside the prices. `audit.json.facts`: 48 numbers, 1 not in the copy: "2018", in the footer credit "Drone footage: Lorenzo Marzocca (2018 promo film for Cheeky Monkey)". That matches `videos[]` vid-001 `found_on` (uploaded 2018-02-06, "Promotional video for Cheeky Monkey Guesthouse"). The stock-003 credit is gone with the photo. −1, same as round 1: present-tense lines rest on 2021 sources (rooftop yoga, five dinners), and open status is unknown (the agreed gap). Note, not scored: the hero alt "Drone view of the Midigama coast…" names the place. The dossier says only "the reef coast and the village" of a Midigama guesthouse's promo film. That is a plausible reading, not a recorded fact. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `critic-cheeky-monkey-r2/audit.json` (throttled 390×844, 1.6 Mbps / 150 ms / 4× CPU): first load **631 KB** in 12 requests (HTML 92.0 KB with CSS and JS inline, fonts 64.9 KB, images 489 KB). **0 external JS.** Largest image **79.2 KB** (the 608×1080 phone poster). **LCP 468 ms. CLS 0.** Scroll CLS early 0 / settled 0. Hero video after first paint (`a11y.json` videoRequests): a 390 phone plays `cm-drone.m1280.webm` **0.88 MB** (MP4 fallback 1.83 MB ≤ 2 MB). 1440 plays `cm-drone.d1920.webm` **1.58 MB** (MP4 3.46 MB ≤ 4 MB). Every tier is 6.72 s with no audio stream (ffprobe), and the MP4 is faststart (`moov` before `mdat`). The video is muted, looped, `playsinline`, has no controls and is `aria-hidden`. Fonts: 2 families, 65 KB, now `font-display: swap` (round-1 deviation fixed) with CLS still 0. Layout: `scrollWidth` = `clientWidth` at 390 and at 1440, and no overlaps in the 22 phone or 17 desktop captures. −1: on the phone the review slideshow is as tall as its longest quote. Under a short one (Christina, `mobile-17`) about 240 CSS px of empty card sit before the rating cards. A visitor sees it as a hole. Not a defect: `desktop-07/08` show the Small Twin Room's first slide as an empty rose box. A re-check (`room-slides.json`) found every visible slide loaded, so the box was the lazy image arriving after the 700 ms settle. |
| 3 | booking CTA | 15 | 9 | 13.5 | **`funnel/cheeky-monkey-r2/funnel.json`:** `primary_action` = **engine** ("Book", header, top 9), `hero_action` = **engine** (0 taps to flow), `clicks_to_book` **1** ≤ `recommended.clicks_to_book` 1, CTA above the fold, 0 broken pages, 0 console errors. `recommended.primary_action` is **engine**, so the classes match and **the round-1 hard fail is cleared**. Tap-through (390): `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, the same as `booking.engine_url` character for character. The header Book, the hero button (top 454) and the phone bar all use that URL. Every `tel:` is `+94719248686` = `contact.phone`. JS off at 390 and 1440: the first booking link is still the header "Book" to the engine, and `#book` is visible with 12 links. The `mailto:` subjects name the business and the offer. −1: the engine link carries none of the visitor's choices (no dates or guests). This is the documented gap, because Booking.com date parameters cannot be tap-tested in a test run. |
| 4 | brand fit | 5 | 8 | 4.0 | First screen (`mobile-00`, `desktop-00`): full-bleed drone footage of the reef coast and village, the wordmark with "Surf Camp \| Midigama, Sri Lanka" (what + where), the featureLine, and one "Check dates on Booking.com" button. Video leads (playbook §1a), and it is the strongest footage of the place in the dossier. Then intro + board/shop reel → "Down at the water" (img-103 full-bleed, spot, season) → four surf weeks with prices → inclusions → lessons → 5 rooms → staying here → shop → roof → Baba → reviews + ratings → getting here → good to know → closing → footer. The persistent phone bar is on screen in captures 01–21 and absent from 00. The set-piece that the brief "unique" called for was removed on the human's decision, so that is not scored. −2, unchanged from round 1: spot and season come before the offers (§3 puts offers 2nd), and the `recommended.above_fold` items "included, price, level, trust" are first reached at about capture 05 on the phone. |
| 5 | copy | 10 | 8 | 8.0 | English is complete. The copy is plain and specific, and no claim goes beyond the dossier. The hidden "Loading the shop's reel" string is gone. −2, unchanged: "Catch waves, not worries" (intro heading) and "Come as a stranger, leave as a friend." (now the only words on the hero) are generic hospitality slogans, even though both are the owner's own. |
| 6 | accessibility | 8 | 8 | 6.4 | axe-core (WCAG 2.0/2.1 A + AA, after a full wheel scroll, third-party blocked): **0 violations at 390 and 1440** (round 1: `listitem` ×34), 26 rule sets pass. Incomplete: `color-contrast` 172 / 170 nodes, which is text over footage and photos. Keyboard: the first stop is the skip link "Skip to surf weeks and prices" → `#counter`, then the wordmark, (1440: Surf weeks, Rooms, Shop, Plan a stay), Book, Call, and the hero button. Every stop has a 3 px solid outline. Drawer: it opens, Esc closes it and focus returns (`audit.json.keyboard` true/true/true). 0 of 84 tap targets are under 44 px. 0 images lack alt (6 decorative `alt=""`). H1 then H2/H3 in order, `lang="en"`. Reduced motion at 390: 0 video requests, the poster stays. JS off: 0 video requests, and the header keeps its white ground. 0 page errors. −2: **contrast of the clear header over the moving footage** (`contrast-hero.json`, 7 samples across the loop). The subtitle "Surf Camp \| Midigama, Sri Lanka" (12–13 px, white at .88) measures about **3.1–3.9:1** at 1440 and **3.2–4.3:1** at 390. The 15 px nav links measure **3.0–4.8:1** and the 20–22 px wordmark **3.5–4.7:1**. All three need 4.5:1. The hero line is large text and stays at ≥ 3.0:1 in every sample (minimum 3.04). The method is approximate: the text-shadow is not modelled. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static output only: `dist/` holds 74 files, 19 MB, with no server code. **0 third-party requests on first load** (`third_party_hosts` []) and **0 attempted over a full scroll at 390 and 1440** (`a11y.json` externalAttempted []). Video, fonts and photos are self-hosted. There is no CMS call. No `src`/`href` starts with `/`. Every filename is lowercase `[a-z0-9._-]`. No localhost, key, token or secret is in `index.html` or `llms.txt`. The preview rule is on: `noindex, nofollow` and robots.txt `Disallow: /`. 0 embeds: the YouTube credit is a plain link, not an iframe. `check-design`: ok, 0 problems, 0 warnings. |
| | **total 1–7** | 75 | | **70.4** | |

**Hard fails: 1.** The hero footage is used against the run's image policy (rubric hard fail "an image is used against the run's image policy (PLAN.md §9)"). The first screen and its poster are a 6.72 s cut, slowed and debanded, from vid-001: Lorenzo Marzocca's 2018 promo film for the guesthouse. Its `license` is **"unknown"** ("third-party YouTube upload, not the business's own channel"). PLAN.md §9 allows business-owned images, review photos with credit, and CC0 / CC BY atmosphere. CC BY-SA atmosphere is allowed for display only, never cropped or re-saved. An unknown-licence third-party film, cut and re-encoded, is in none of those. Playbook §6: "an image of unknown ownership is not used as if it were theirs". The page does credit Marzocca in the footer and keeps the footage out of JSON-LD and the link preview, so it does not pass the film off as the business's own work. That keeps it off the "presented as the business" line, but not off the policy line. **This is not a designer defect.** Alon chose this footage in session on 2026-11-04 ("yes, use the promo drone shots"). Its licence is to be confirmed with the owner at pitch, and the designer carried out that decision as asked, with a credit (notes conflicts 6). The rubric has no waiver clause for this line, so I record it and leave it to the human. It clears only if the human formally accepts the exception for this test-mode preview until the pitch, or the owner confirms the rights, or the hero falls back to a business-owned asset. The fallback is already wired: an empty `heroVideo` plus an owner photograph as `heroVideoPoster`.

Cleared since round 1: the primary-action class (now engine = recommended).

Not hard fails: facts (0 mismatches), CTA landing (the URL and phone are exact), third-party requests (0 on load and over a scroll), CMS dependency (none), keyboard trap (none), budgets (every line met, below), secrets (none), borrowed atmosphere (none left: stock-003 is dropped and there is no `atmo/` in `dist/`).

Pass thresholds (full): dimensions 1–7 are each ≥ 6 ✓. All playbook §4 budget lines are met ✓. Hard fail present ✗ (the image policy, human-owned). If the human accepts the vid-001 exception, nothing else in my part blocks the pass. The total ≥ 85 then needs dimension 8 ≥ 14.6 / 25, so both visual critics must still be ≥ 8 (pending, not read).

**what the designer prompt got wrong:** Two things. (1) The designer's contrast check stops at axe, and axe reports text over video as "incomplete", not as a violation. That let the header text pass with nothing checked: the hero's top shade (`rgba(10,32,44,.42)` fading out by 150 px) leaves the 12–13 px subtitle and the 15 px nav links at about 3–4:1 over the bright parts of the loop. The hand-off check should sample contrast across the video's frames (or test the poster plus the brightest frame) for every piece of text that sits on footage. (2) Not the designer's fault, and a gap for a proposal: neither the designer prompt nor the rubric says how to record a human operator's decision to use an asset outside PLAN.md §9. The designer documented the decision correctly, but the rubric still has to fail it, and only a human can clear it. A rubric line such as "an operator-approved exception recorded in the ledger, with an owner check at pitch, is reported and not failed" would make that explicit.

**fix list (smallest first):**
1. **Dim 2 (minor):** size the review slideshow to the current quote, or centre a short quote in the card. Christina's quote leaves about 240 px of empty card at 390 (`mobile-17`).
2. **Dim 6:** bring the clear-header text over the footage to ≥ 4.5:1. Options: deepen and extend the top shade (for example `.42` → about `.6` over the first ~120 px), draw the subtitle at full white, or give the header a light frosted ground over the hero. Then re-sample across the loop (`contrast-hero.json` method).
3. **Hard fail, human decision, not a designer fix:** vid-001's unknown licence. The human either records the exception (test-mode preview, owner to confirm at pitch), or tells the designer to switch the hero to business-owned material. The template already supports that: owner footage, or `heroVideo` emptied with an owner photo ≥ 1920 px as the poster.
4. **Dim 5 (optional, copy station):** "Catch waves, not worries" is unchanged. It is the owner's line, so changing it is a copy decision.

### Facts table, round 2 (changes against round 1; every other row re-checked and unchanged)

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Drone footage: Lorenzo Marzocca (2018 promo film for Cheeky Monkey)", linked to youtube.com/watch?v=Qo3SqaCSkpk | `videos[]` vid-001 `found_on`, `source_url` | match |
| Hero alt "Drone view of the Midigama coast: turquoise reef water, the rock wall along the coast road, houses and palms behind" | vid-001 `shows` ("drone over the reef coast and the village") | match on content. "Midigama" is inferred from a Midigama guesthouse's promo, not stated (note) |
| Hero line "Come as a stranger, leave as a friend." | `business.description_about` | match |
| Shop reel (board window) description | vid-009 `shows` | match |
| stock-003 + its CC BY-SA credit | — | removed (no longer on the page) |
| 11 testimonials | `reviews.quotes[]` | 11/11 verbatim (script) |
| Ratings, prices, rooms, stay rules, distances, contact, address, JSON-LD | as round 1 | match (unchanged) |

### Playbook §4 budget, measured (round 2)

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (video excluded) | ≤ 1.5 MB | 631 KB (646,325 B, 12 requests) | ✓ |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | 0.88 MB `m1280.webm` (MP4 1.83 MB) · 1.58 MB `d1920.webm` (MP4 3.46 MB) | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; inline about 2.9 KB gzip (designer's figure) | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 79.2 KB | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 64.9 KB, `swap` | ✓ |
| LCP | ≤ 2.5 s | 468 ms | ✓ |
| CLS | < 0.1 | 0 (scroll early 0, settled 0) | ✓ |
| Third-party requests on load | 0 | 0 (and 0 over a full scroll at both widths) | ✓ |

### Network log, first load (390, throttled)

The 12 requests are all to the local host: HTML 91,991 B, 2 woff2 (64,900 B), and images 489,434 B (the phone poster, 79,236 B, plus the images just below the fold that the browser's lazy margin pulls in). `third_party_hosts: []`. Over a full scroll the only video requests at 390 are `cm-drone.m1280.webm` + `cm-board.m720.mp4`, and at 1440 `cm-drone.d1920.webm` + `cm-board.m720.mp4`. With reduced motion or JS off there are none.

### Screenshots (`tools/shoot.mjs` into a scratch folder, deleted after the round; 1440 × 900 ×17 and 390 × 844 ×22, page 13,717 / 16,490 px)

- `mobile-00`: drone frame of the reef, a white building, red roofs, palms and the railway. The clear header holds the wordmark, "Surf Camp | Midigama, Sri Lanka", a blue "Book" and a ringed phone icon. The centred hand-lettered line "Come as a stranger, / leave as a friend." sits above the blue "Check dates on Booking.com →". No bottom bar.
- `desktop-00`: the surfer-on-a-green-reef-wave part of the loop. The header holds Surf weeks · Rooms · Shop · Plan a stay · Book · phone, then the same line and button.
- `mobile-01–02` / `desktop-01–02`: "Catch waves, not worries" with the board window and the shop reel, then img-103 full-bleed (the surfer with the yellow fish).
- `mobile-03–04`: "Down at the water", the spot and season cards, img-100 / img-155.
- `mobile-05–08`: "A week of surf", photo-led white cards with prices and the "Published 2021, call to confirm" pill, "Every week comes with", lessons at USD 20.
- `mobile-08–11` / `desktop-06–08`: five room slideshows with Booking.com buttons, and "Staying here". In `desktop-07/08` the Small Twin Room slide was still loading (see `room-slides.json`).
- `mobile-12–16`: Baba's Surf Shop masonry, "Up on the roof", "Three rooms in 2009".
- `mobile-16–17`: "What guests say" 1/11 with Christina's short quote, then about 240 px of empty card, then the 4.5/5 and 8.3/10 cards.
- `mobile-18–21`: Getting here, Good to know, the closing board and line, the three actions, the Instagram tiles, and the footer with the drone credit line.

### Evidence files

- `reports/2026-10-midigama-01/critic-cheeky-monkey-r2/audit.json`: `tools/audit-mockup.mjs cheeky-monkey ../final`, moved here. The designer's own `final/audit.json` was restored byte-identical.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r2/a11y.json`: axe at 390 and 1440, the first 12 Tab stops, external requests attempted over a full scroll, video requests, hero video state, overflow, page errors, and the reduced-motion and JS-off passes.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r2/contrast-hero.json`: the header and hero text sampled over the loop.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r2/room-slides.json`: the lazy-slide re-check.
- `reports/2026-10-midigama-01/funnel/cheeky-monkey-r2/funnel.json`: `tools/funnel.mjs http://localhost:8961/ --depth 3`.
