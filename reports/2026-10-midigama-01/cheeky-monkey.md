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

## Round 3 — full (station 5, last round)

critic 0.4.3 · rubric 0.3.1 · 2026-11-04 · build `sites/cheeky-monkey/final/dist/` (index.html 96,992 B, built 2026-11-04 13:31, designer 0.7.1 round 3). It was served by a plain static server (`tools/_serve.mjs` on :8961), which was stopped afterwards. The user's `astro preview` on :8950 was not touched. Scored fresh against the rubric and the dossier. I did not read any visual-critic or experience-critic report.

```
mode: full        round: 3        variant: unique ("Pick your board", drone-loop first screen on Alon's decision)
total (dims 1–7): 72.7 / 75      result: pass (critic's part)      hard_fails: []   (vid-001 licence: human-waived exception, see below)
dimension 8 (weight 25): not scored here, it belongs to visual-critic + experience-critic
```

**The vid-001 licence: a human-waived exception, not a hard fail.** Round 2 failed on the rubric line "an image is used against the run's image policy (PLAN.md §9)". The first screen is a cut of vid-001, Lorenzo Marzocca's 2018 promo film, whose dossier `license` is **"unknown"** (re-checked this round: unchanged). The human waived it in session. Alon, operator, 2026-11-04, verbatim: *"i accept it as an exception for the preview. and make the last fixes."* The waiver is logged in `activity.jsonl` (`tools/team.mjs log`) and in `sites/cheeky-monkey/final/notes.md` conflicts 6. **Scope: the `*.workers.dev` preview only, until the owner confirms the rights at pitch.** So it is reported here and not counted. **It stays flagged for the pitch.** Before any go-live the owner must confirm the rights (or supply the raw footage). Otherwise the hero falls back to business-owned media: an owner clip as `heroVideo`, or `heroVideo` emptied and a business-owned photograph ≥ 1920 px as `heroVideoPoster`. The template already renders both. The footer credit stays, and the footage is still kept out of JSON-LD and the link preview.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | The round-1/2 facts table was re-checked against this build, and the new items were added (table below). **0 mismatches, 0 unsourced claims.** The 11 blockquotes are verbatim `reviews.quotes[].text`, checked by script (`critic-cheeky-monkey-r3/quotes.json.txt`): 10 match exactly. In the 11th the dossier's `\n` is rendered as `<br>` ("wifi was great!<br>There"), so 11/11 match. Google 4.5/5 · 467 and Booking.com 8.3/10 · 45 each appear once, with "26 Oct 2026" = `fetched_at`. "Published 2021" appears 7 times beside the prices. `audit.json.facts`: 48 numbers, 1 not in the copy: "2018", in the footer credit = vid-001 `found_on`. New this round: img-151 (`license: business-owned`, the business's own site, 1920×900) replaces img-155. Its alt "Cheeky Monkey surfers on the sand with coconuts…" agrees with the owner's own alt "Group of Cheeky Monkey surfers". The board reel's new alt "New boards on the rack in Baba's Surf Shop, filmed close along their rails" = vid-009 `shows` (business-owned). −1, unchanged: present-tense lines rest on 2021 sources (rooftop yoga, five dinners), and open status is the agreed gap. Note, not scored, as in round 2: "Midigama" in the hero alt is inferred from the promo's subject. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `critic-cheeky-monkey-r3/audit.json` (throttled 390×844, 1.6 Mbps / 150 ms / 4× CPU): first load **691 KB** (708,018 B) in 12 requests: HTML 97.0 KB with CSS and JS inline, fonts 64.9 KB, images 546 KB. **0 external JS.** Largest image **119 KB** (the 608×1080 portrait poster). **LCP 508 ms. CLS 0.** Scroll CLS early 0 / settled 0 (the 3 px font-swap shift the designer found is gone). Video after first paint (`a11y.json` videoRequests): a 390 phone plays `cm-drone.p1080.webm` (designer 1.00 MB, MP4 1.87 MB ≤ 2 MB) and 1440 plays `cm-drone.d1920.webm` (1.64 MB, MP4 3.82 MB ≤ 4 MB). The video is muted, looped, `playsinline`, has no controls and is `aria-hidden`. The board reel is no longer early (`timing.json`, throttled DPR-3 phone, cold): `load` 3.77 s → hero `p1080.webm` requested 3.80 s, **playing 5.63 s** → reel `p640.webm` requested **5.64 s, after the hero plays** (round 2: 440 ms). Round-2 issue fixed: the review slideshow now takes the height of the quote on show. At 390, track = slide = content for quotes 1–3: 259 / 231 / 402 px (round 2: always 402, about 240 px of empty card). Layout: `scrollWidth` = `clientWidth` at 390 and 1440. There are no overlaps in the 22 phone or 17 desktop captures, and the hero line and button sit in the lower band clear of the surfer (`mobile-00`). Fonts: 2 families, 65 KB, `swap`. |
| 3 | booking CTA | 15 | 9 | 13.5 | **`funnel/cheeky-monkey-r3/funnel.json`:** `primary_action` = **engine** ("Book", header, top 9), `hero_action` = **engine** (0 taps to flow), `clicks_to_book` **1** ≤ `recommended.clicks_to_book` 1, CTA above the fold, 1 page, 0 broken. `recommended.primary_action` is **engine**, so the classes match. Tap-through (390): `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, the same as `booking.engine_url` character for character. The hero "Check dates on Booking.com" is at top 737 of 844. Every `tel:` is `+94719248686` = `contact.phone`. JS off at 390 and 1440: the first booking link is the header "Book" to the engine, and `#book` is visible with 12 links. Reduced motion is the same. The `mailto:` subjects name the business and the offer. −1, unchanged: the engine link carries none of the visitor's choices. That is the documented gap (Booking.com date parameters cannot be tap-tested in a test run). |
| 4 | brand fit | 5 | 8 | 4.0 | First screen (`mobile-00`, `desktop-00`): full-bleed drone footage (the surfer on the green reef wave), the wordmark with "Surf Camp \| Midigama, Sri Lanka", the featureLine and one "Check dates on Booking.com" button, with header Book + phone. Video leads (playbook §1a). The page order is unchanged from round 2: intro + board reel → "Down at the water" (img-103, spot, season, img-100, img-151) → four surf weeks with prices → inclusions → lessons → 5 rooms → staying here → shop → roof → Baba → reviews + ratings → getting here → good to know → closing → footer. The persistent phone bar shows in captures 01–21 and not on 00. −2, unchanged: spot and season come before the offers (§3 puts offers 2nd), and the `recommended.above_fold` items "included, price, level, trust" first appear at about capture 05 on the phone. That is the concept's choice. |
| 5 | copy | 10 | 8 | 8.0 | English is complete. The copy is plain and specific, with no claim beyond the dossier, and it is unchanged this round (notes: "The copy is unchanged"). −2, unchanged: "Catch waves, not worries" (intro heading) and "Come as a stranger, leave as a friend." (the hero line) are generic hospitality slogans, although both are the owner's own words. Changing them is a copy-station decision. |
| 6 | accessibility | 8 | 9 | 7.2 | axe-core (WCAG 2.0/2.1 A + AA, after a full wheel scroll, third-party blocked): **0 violations at 390 and 1440**, 27 rule sets pass. Incomplete: `color-contrast` 172 / 170 nodes (text over footage and photos). **Round-2 issue fixed: header contrast over the footage** (`contrast-hero.json`, 7 samples across the loop, same method as round 2, text shadows not modelled). The worst samples are: 1440 subtitle **5.80:1**, wordmark 6.32:1, nav links 6.54:1; 390 subtitle **6.30:1**, wordmark 6.82:1. All are ≥ 4.5:1 (round 2: 3.0–4.8). The hero line is large text, and its minimum is 4.27:1 at 390 and 4.61:1 at 1440 (≥ 3:1). Keyboard: the skip link "Skip to surf weeks and prices" comes first, then the wordmark, (1440: Surf weeks, Rooms, Shop, Plan a stay), Book, Call, the hero button and See the surf weeks. Every stop has a 3 px solid outline. Drawer: it opens, Esc closes it and focus returns (`audit.json.keyboard` true/true/true). 0 of 84 tap targets are under 44 px, 0 images lack alt (6 decorative `alt=""`), H1 then H2/H3 in order, `lang="en"`. Reduced motion and JS off: 0 video requests, the poster only. 0 page errors. −1 (a new finding this round, also true in round 2): the two looping videos (the hero, and the board reel) start on their own and loop without end, but no control pauses them (WCAG 2.2.2 Pause, Stop, Hide, level A). This is mitigated, not met: they stop under `prefers-reduced-motion`, and they pause off screen. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static output only: `dist/` holds 71 files, 16 MB, with no server code (no `.js`, `.php` or worker files). **0 third-party requests on first load** (`third_party_hosts` []) and **0 attempted over a full scroll at 390 and 1440** (`a11y.json` externalAttempted []). Video, fonts and photos are self-hosted. There is no CMS call. No `src`/`href` starts with `/`. Every filename is lowercase `[a-z0-9._/-]`. 0 hits for localhost/key/token/secret/password in `index.html` and `llms.txt`. `noindex, nofollow` is on. 0 iframes, so 0 embeds. `check-design`: 0 failing, 0 warnings. |
| | **total 1–7** | 75 | | **72.7** | |

**Hard fails: 0.** The vid-001 licence line is a **human-waived exception** for the preview, as quoted above, and is not counted. It stays flagged for the pitch. Not hard fails:
- facts (0 mismatches)
- CTA landing (the URL and phone are exact)
- primary-action class (engine = recommended)
- third-party requests (0 on load and over a scroll)
- CMS dependency (none)
- keyboard trap (none)
- content only in video (none: the hero video is `aria-hidden`, and its line and button are DOM text)
- budgets (every line met, below)
- secrets (none)
- borrowed atmosphere (none)

**Pass thresholds (full), critic's part:**
- No hard fail ✓ (with the waiver).
- Dimensions 1–7 each ≥ 6 ✓ (lowest 8).
- Every playbook §4 budget line is met ✓.
- Total ≥ 85 needs dimension 8 ≥ 12.3 / 25. The rule that both visual critics must be ≥ 8 is stricter, and their verdicts are pending (not read).

**what the designer prompt got wrong:** Little this round: every round-2 item in my report was fixed and measured. The designer even reported its own scroll-CLS find. One gap is left. The designer's hand-off check has no item for WCAG 2.2.2: an autoplaying loop longer than 5 s needs a visible pause control, and honouring `prefers-reduced-motion` does not satisfy it. The schema's hero-video snippet (`schemas/site-content.md` v0.9) shows none either, so every site built from it will repeat this. Proposal material, not a designer defect: (1) add a small pause/play toggle to the reference `HeroVideo.astro` snippet; (2) add a rubric or designer line saying how an operator-waived asset exception is recorded and carried to the pitch. This round needed a waiver quoted from an in-session message.

**remaining fix list (not gating; smallest first):**
1. **Dim 6:** add a visible pause control (≥ 44 px, labelled) for the hero loop and the board reel, to meet WCAG 2.2.2.
2. **Pitch (waiver condition):** confirm the vid-001 rights with the owner (or get the raw footage). If not confirmed, switch the hero to business-owned media before go-live. The template supports this already.
3. **Dim 5 (copy station):** "Catch waves, not worries" and the hero slogan are the owner's clichés, and they are unchanged.
4. **Dim 4 (concept choice):** spot and season come before the offers, and price, level and inclusions first appear at about capture 05 on the phone.
5. **Dim 3 (documented gap):** Booking.com date and guest parameters are not carried. Revisit with a live run.

### Facts table, round 3 (changes against round 2; every other row re-checked and unchanged)

| Claim on the page | Dossier key | Result |
|---|---|---|
| img-151 in "Down at the water", alt "Cheeky Monkey surfers on the sand with coconuts, lined up in front of their colourful soft boards, palms behind" | `images[]` img-151 (business-owned, cheekymonkeymidigama.com, 2020; owner alt "Group of Cheeky Monkey surfers") | match (alt written from the photograph) |
| img-155 | — | removed |
| Board reel alt "New boards on the rack in Baba's Surf Shop, filmed close along their rails" | `videos[]` vid-009 `shows` (business-owned) | match |
| Hero alt "Drone view of the Midigama coast…", the footer credit "Drone footage: Lorenzo Marzocca (2018 promo film for Cheeky Monkey)" | vid-001 `shows`, `found_on`, `source_url` | match (as round 2; licence: waived exception) |
| 11 testimonials | `reviews.quotes[]` | 11/11 verbatim (script; one `\n` rendered as `<br>`) |
| Ratings, prices, lessons, rooms, stay rules, distances, contact, address, JSON-LD | as rounds 1–2 | match (unchanged) |

### Playbook §4 budget, measured (round 3)

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (video excluded) | ≤ 1.5 MB | 691 KB (708,018 B, 12 requests) | ✓ |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | `p1080.webm` 1.00 MB (MP4 1.87 MB) · `d1920.webm` 1.64 MB (MP4 3.82 MB) | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; inline about 3.2 KB gzip (designer's figure) | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 119 KB | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 64.9 KB, `swap` | ✓ |
| LCP | ≤ 2.5 s | 508 ms | ✓ |
| CLS | < 0.1 | 0 (scroll early 0, settled 0) | ✓ |
| Third-party requests on load | 0 | 0 (and 0 over a full scroll at both widths) | ✓ |

### Network log, first load (390, throttled)

The 12 requests are all to the local host: HTML 96,992 B, 2 woff2 (64,900 B), and images 546,126 B (the portrait poster, 119,050 B, plus the images just below the fold that the lazy margin pulls in). `third_party_hosts: []`, and no video is in first load. Over a full scroll the only video requests are:
- 390: `cm-drone.p1080.webm` + `cm-board.p640.webm`
- 1440: `cm-drone.d1920.webm` + `cm-board.m720.mp4`
- reduced motion or JS off: none

### Screenshots (`tools/shoot.mjs` into a scratch folder, deleted after the round; 1440 × 900 ×17 and 390 × 844 ×22, page 13,626 / 16,257 px)

- `mobile-00`: the portrait drone frame of a surfer on a turquoise reef wave in the upper middle. The clear header holds the wordmark, "Surf Camp | Midigama, Sri Lanka", a blue "Book" and a ringed phone icon, all legible on the darker top shade. "Come as a stranger, / leave as a friend." and the blue "Check dates on Booking.com →" sit in the lower band over open water, clear of the rider. No bottom bar.
- `desktop-00`: the wide surf shot, graded green-turquoise. The rider is above the line. The header shows Surf weeks · Rooms · Shop · Plan a stay · Book · phone.
- `mobile-01–02` / `desktop-01–02`: "Catch waves, not worries" with the board window and the bright rail reel, then img-103 full-bleed.
- `mobile-03–04` / `desktop-03`: "Down at the water", the spot and season cards, img-100, and img-151 (surfers lined up in front of colourful soft boards).
- `mobile-04–08`: "A week of surf" photo cards with prices and the "Published 2021, call to confirm" pill, the inclusions, and the lessons at USD 20.
- `mobile-08–11` / `desktop-06–08`: the five room slideshows with Booking.com buttons, and "Staying here".
- `mobile-11–16`: the shop masonry, "Up on the roof", and "Three rooms in 2009" with Baba.
- `mobile-16–17` / `desktop-13`: "What guests say" 1/11. Christina's card is as tall as her quote, then the 4.5/5 and 8.3/10 cards with no hole.
- `mobile-18–21`: Getting here, Good to know, the closing board and line, the actions, the Instagram tiles, and the footer with the drone credit.

### Evidence files

- `reports/2026-10-midigama-01/critic-cheeky-monkey-r3/audit.json`: `tools/audit-mockup.mjs cheeky-monkey ../final`, moved here. The designer's own `final/audit.json` was restored byte-identical (`cmp`).
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r3/a11y.json`: axe at 390 and 1440, the first 12 Tab stops, external requests attempted over a full scroll, video requests, hero video state, overflow, page errors, and the reduced-motion and JS-off passes.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r3/contrast-hero.json`: the header and hero text sampled over the loop (7 samples per width).
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r3/timing.json`: video request order on a throttled cold phone, and the review slideshow heights.
- `reports/2026-10-midigama-01/critic-cheeky-monkey-r3/quotes.json.txt`: the verbatim testimonial check and the counts of key facts.
- `reports/2026-10-midigama-01/funnel/cheeky-monkey-r3/funnel.json`: `tools/funnel.mjs http://localhost:8961/ --depth 3`.

## Verification 1 — full

critic 0.4.3 · rubric 0.3.2 · 2026-11-06 · a verification, not a scored round: the ledger is untouched and no round is counted. Site under test: the live preview https://cheeky-monkey-surf-camp.os1.workers.dev/ (home page, `llms.txt` and `robots.txt` fetched and `cmp`-identical to `sites/cheeky-monkey/final/dist/`). `tools/audit-mockup.mjs` ran on the same `dist/` from a plain local server, as the tool always does, in an isolated scratch root so nothing under `sites/` was written. I did not read any visual-critic or experience-critic report. A network drop during the session caused early timeouts to rosa.surf; every measurement below was taken after the network came back, and none of those timeouts is counted as a finding.

```
mode: full (verification)        round: none        variant: unique ("Pick your board", drone-loop first screen)
total (dims 1–7): 68.5 / 80      hard_fails: []   (vid-001 licence: Alon's recorded preview-only waiver, not re-opened)
result: critic's part passes its gates; the overall result depends on dimension 8
dimension 8 (weight 25): not scored here, it belongs to visual-critic + experience-critic
```

**What that means for the total (rubric 0.3.2: weighted sum × 100 ÷ 105, pass ≥ 85).** A pass needs dimension 8 ≥ 20.75 / 25, which is 8.3 / 10.

| Dimension 8 (lower of the two critics) | Total | Result on total |
|---|---|---|
| 8 / 10 | 84.3 | **fail by 0.7** |
| 9 / 10 | 86.7 | pass |

Fix 1 below takes no code and is worth +2.0 on dimension 1: it alone makes an 8 / 10 total 86.2.

The earlier sections print dimensions 1–7 "/ 75", but the weights sum to 80 (rubric 0.3.2). Round 3's 72.7 is the comparable number: this build is 4.2 lower, all of it from the new block's checks and the new scroll shift.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 8 | 16.0 | `critic-cheeky-monkey-v1/facts.json`: 42 page claims traced to dossier keys by script, 0 mismatches; I read the 12 package prices and 3 airport rows against `offers[]` by hand. 11 / 11 reviews are verbatim (`quotes.txt`). `copy/` and every field of `content.json` except `forecast` are unchanged since round 3 (git diff). Forecast numbers equal the live JSON fetched in the same run: 0.9–1.3 m, 20:30, swell 16.6 s from 201° ("the south"), wind 5.1 km/h from 352° ("the north"), offshore; `generated_at` 19:56 Colombo. −1, unchanged: present-tense lines on 2021 sources, open status the agreed gap. −1, new: rule 9's mapping check fails as written. `concepts.md` §3 still says "Forecast: no", and the dossier names no break and has no `rams`. See "The forecast block". |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json`, throttled 390 × 844: first load 528,409 B in 8 requests, LCP 576 ms, CLS 0, largest image 119,050 B, fonts 64,900 B, 0 third-party. Every budget line is met (table below), including with Rosa's embed loaded. No overflow at 320, 390 and 1440. −1: `scroll.early.cls` is **0.0288** (limit 0.01), source `div.hero-in`, the same in all 4 audit runs; round 3 measured 0. See "The early scroll shift". On the live preview the same scroll gives 0–0.0008 (9 of 9 runs). |
| 3 | booking CTA | 15 | 9 | 13.5 | `funnel/funnel.json` on the live preview: `primary_action` engine, `hero_action` engine (0 taps to flow), `clicks_to_book` 1 ≤ target 1, CTA above the fold, 0 console errors reported by my page runs. All 23 Booking.com hrefs equal `booking.engine_url` character for character; every `tel:` is `+94719248686` = `contact.phone`. JS off at 390 and 1440: 21 visible Booking.com links, 11 visible `tel:` links. **The `.handoff[hidden]` fix works** (`handoff-widget-refuse.json`): `display: none` at load, on opening the drawer and on the room step; `flex` with "Classic Triple Room" and a 292 × 52 button after a room is picked. JS off: hand-off `none`, `.plain-only` booking button shown. −1, unchanged: the engine link carries none of the visitor's choices (documented gap). |
| 4 | brand fit | 5 | 8 | 4.0 | The forecast sits in "Down at the water", under spot and season, which fits playbook §3 item 4. Page order is otherwise unchanged. −2, unchanged: spot and season come before the offers, and price, level and inclusions first appear at about capture 05 on the phone. That is the concept's choice. |
| 5 | copy | 10 | 8 | 8.0 | English complete; the copy is unchanged since round 3. The two new lines use the rule's exact wording: "Forecast for Rams by Rosa", "See today's forecast for Rams on Rosa". Nothing calls Rams the business's break. −2, unchanged: "Catch waves, not worries" and "Come as a stranger, leave as a friend." are generic slogans, though the owner's own. |
| 6 | accessibility | 8 | 9 | 7.2 | `a11y-page.json`, axe-core 4 (WCAG 2.0 / 2.1 A + AA) on the live page with the widget loaded: 0 violations at 390 and 1440, 30 rule sets pass; `color-contrast` incomplete 179 / 183 nodes (text over footage and photos). Block text measured on its own ground: 6.37:1 at the lowest (the 13 px update pill), 7.55:1 for the swell and wind lines. Keyboard: credit link, then the frame (focus lands on Rosa's one `a.card`, outline `auto 1px`, Rosa's own), then out to the first package card: no trap. Drawer: Tab cycles inside it, Esc closes it, focus returns to "Plan a stay". 0 of the tap targets in `audit.json` under 44 px at 390; the credit link is 48 px tall at 390 and 26 px at 1440. Reduced motion: 0 video requests. −1, unchanged: no pause control for the two looping videos (WCAG 2.2.2). |
| 7 | security + delivery | 7 | 9 | 6.3 | `dist/`: 71 files, no server code, lowercase names, relative URLs, 0 hits for localhost / key / token / secret / password, `noindex, nofollow`, no sitemap. 0 third-party requests on first load at 390 and 1440, in `audit.json` and on the live preview. 0 cookies after the widget loads, and the frame's localStorage is empty. No CMS call. `check-design`: 0 failing, 0 warnings. −1: two §4 embed rule misses in the new block, the refused-frame hole and the extra HEAD request, both below. |
| | **total 1–7** | 80 | | **68.5** | |

**Hard fails: 0.** The vid-001 licence is Alon's recorded preview-only waiver and is not counted. Not hard fails: fact contradictions (0), CTA landing (URLs and phone exact), primary-action class (engine = recommended), third-party on first load (0), CMS dependency (none), keyboard trap (none), content only in video (none), budgets (all met), secrets (none), borrowed atmosphere (none).

One line I weighed and did not count: "a claim has no dossier entry". The dossier has no Rams. I read the block as making no claim about the business: it says Rosa forecasts a spot Rosa calls Rams, Rosa's own `spot.name`, and schema v0.3 says forecast values are never content. A stricter reading would make this a hard fail, so the human should see it stated.

**Pass thresholds (full), critic's part:** no hard fail ✓; dimensions 1–7 each ≥ 6 ✓ (lowest 8); every playbook §4 budget line met ✓ (one reading noted below); total ≥ 85 depends on dimension 8, as tabled above; both visual critics ≥ 8 pending.

### The forecast block (rule 9 and playbook §4)

| Check | Result | Evidence |
|---|---|---|
| Spot id in the headline and the widget | same: `rams` | `data-json` …/spots/rams.json, widget `spot=rams`; JSON `spot.id` rams, `name` Rams, `town` Midigama |
| Matches the dossier's spot through the mapping in `concepts.md` | **FAILS as written** | `concepts.md` lines 91, 113, 158, 214, 262 say no forecast; line 113 calls "Midigama" "the nearest-other-spot error the rule forbids". Schema v0.3: "The nearest other spot is never used as this one". Alon's decision is recorded in `final/notes.md`, `seed-from-dossier.mjs` and `activity.jsonl` line 65, and `notes.md` says it overrides the schema "on Alon's say". Not recorded in `concepts.md`. |
| "Closest Rosa spot, ~360 m" | true | Rosa `index.json` against `location.lat_lng`: Rams 360 m, Coconut 578 m, Lazy Left 679 m, Lazy Right 980 m |
| Site's half: headline only | pass | Height range, time, swell, wind, Rosa's update time. No day-by-day content |
| Widget unmodified | pass | All attributes as `agents/designer/tools.md`; `theme=light&units=metric`; computed filter none, opacity 1, no transform or clip; `elementFromPoint` hits the IFRAME at every in-view point; 420 × 500 at 1440, 350 × 500 at 390 |
| Nothing from Rosa on first load | pass | 0 third-party at 390 and 1440 after 5 s without a scroll |
| After scrolling: one JSON request plus the frame | **one extra request** | The site makes GET JSON, **HEAD widget**, then the frame document. The HEAD is deliberate (`site.js`) and is not in the rule. The frame then makes its own requests, including a second JSON GET: Inter CSS and font, favicon, 6 satellite tiles |
| Space reserved, CLS unchanged | pass | Block 860 px at 390 and 500 px at 1440, before and after; document height unchanged; 0 shifts when the block loads, fails or is refused |
| JS off | pass | Plain link fills the box, `rosa.surf/spot/rams`, 0 third-party requests |
| JSON blocked, hung 12 s, stale 30 h, or without `current` | pass on the link | Link shown, no numbers, no frame request. Below the screen the headline box is dropped (`.solo`, document 17165 → 16805 at 390, no visible shift) |
| Failure with the block in view | link shown, **blank hole beside it** | `.fc-now` goes `visibility: hidden`: a 420 × 500 gap on the left at 1440, a 340 px gap above the link at 390, no credit line (my scratch captures of the JSON-blocked and hung runs). Playbook: "never an empty box". It is an empty space, not a drawn box |
| Widget blocked at HEAD | pass | Headline stays, link in the widget's box, no frame |
| **Frame refused after a good HEAD** | **FAIL** | Three forced cases (document request aborted, `X-Frame-Options: DENY`, HTTP 500): all end `fc-rosa on`, link hidden, frame visible. The aborted case, which I looked at, shows the right half blank with no link at all. A cross-origin frame fires `load` regardless, so the HEAD guard does not cover a GET that fails after it. A narrow path, but §4 asks for the link "when the request fails" |
| Visitor stops at the edge of the 400 px margin | pass | At 390, block 1,234 px below the top of the screen: headline and frame both load inside the 10 s limit |
| WebKit | pass | Desktop normal path only: `fc live`, `fc-rosa on` |
| `shoot.mjs` waited | pass | `desktop-04` and `mobile-04/05` show the drawn headline and the loaded widget; `shoot.json` errors [] |
| Embed count | 1 of 2 | One iframe, no map embed |
| Page scroll over the frame | pass at 1440 | Mouse wheel over the widget moved the page 400 px. Not tested with touch |

**The headline can disagree with the widget beside it.** `desktop-04` (Rosa's 13:56 publication) shows the site's "Swell 8.6 s from the south-east" next to the widget's "15s SSE". The site follows `tools.md` to the letter (the first `in_window` swell), and the widget picks a different one. Each is right about its own number, and a visitor sees two periods. In tonight's publication they happen to agree closely (16.6 s against 16s, "south" against SSE). Not scored as a fact error; it needs a line in `tools.md`.

### The early scroll shift

`audit.json.scroll.early.cls` = 0.0288, 4 of 4 audit runs, against round 3's 0. Hard constraint 3 says that at or above 0.01 the page goes back to the designer. The rubric's own hard fails and thresholds do not list it (CLS line < 0.1 is met), so it is scored and listed as a fix, not as a hard fail.

`early-scroll-cls.json`, audit's method with shift rectangles: plain local server 3 of 4 runs 0.0288, at about 15 ms after first paint; `hero-in` goes from y 641, height 203 to y 567, height 277, a growth of 74 px. Live preview 0–0.0008 in 4 of 4 runs here and 5 of 5 in `handoff-widget-refuse.json`.

It is not the font swap: it comes about 270 ms before the fonts finish. My explanation, consistent with the numbers but not proven: the plain server sends the 106,679 B page uncompressed, so the browser paints a part-parsed document, and the 74 px matches the hero button (56 px plus the 18 px gap), which starts about 100 bytes after `hero-in` at byte 42,789. The block's added CSS, JS and markup would have moved where that paint falls. Cloudflare sends about 27.6 KB compressed, which is why live does not show it. A visitor on the preview does not see it; a client on an uncompressed host (the zip export) could.

### Playbook §4 budget, measured

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (video excluded) | ≤ 1.5 MB | 528 KB (`audit.json`, plain server); 455 KB on the live preview | ✓ |
| The same plus Rosa's block | ≤ 1.5 MB | + 122 KB third-party (throttled phone) | ✓ |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | `p1080.webm` 0.999 MB (MP4 1.87 MB) · `d1920.webm` 1.64 MB (MP4 3.82 MB), file sizes on disk | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; inline 14,818 B, 5,494 B gzip; the widget's script is inline in its 7.9 KB document | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 119 KB; largest Rosa tile 14.8 KB | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | Site: 2 families, 64.9 KB. With the frame: + Inter, 49 KB = **3 families**, 114 KB | ✓ on my reading |
| LCP | ≤ 2.5 s | 576 ms; 552 ms on the live preview | ✓ |
| CLS | < 0.1 | 0 at load, 0 after the block loads | ✓ |
| Third-party requests on load | 0 | 0 | ✓ |

**The fonts line is a rule conflict, not a site defect.** §4 says every budget line holds with the embeds loaded; the same section requires the widget exactly as Rosa ships it, and `tools.md` records that it loads Inter inside its frame. The site cannot fix that. I counted the line as met because the third family lives in Rosa's frame. If Shahar reads it the other way, every site with this widget misses the line, and "budget met on every line" fails for all of them.

**what the designer prompt got wrong:** Three things, all from porting the block rather than from the design. (1) The forecast was added after the concept, so `concepts.md` still forbids what the page does; nothing in the hand-off requires a late block to update the concept's mapping, and an operator override of a schema rule has no agreed place to be recorded. (2) `tools.md` asks for a lazy frame and a plain-link fallback but does not say how to detect a refused cross-origin frame; `load` always fires, so the ported HEAD guard adds a request that rule 9 does not allow and still misses a GET that fails. (3) `tools.md` picks "the first `in_window` swell" without checking which swell the widget shows, so the two halves can print different periods side by side.

**fix list (smallest first):**
1. **Dim 1 (human, no code):** record the Rams mapping and Alon's decision in `concepts.md` §3, and take the conflict with schema v0.3 ("the nearest other spot is never used") to Shahar as a proposal or a recorded exception.
2. **Dim 7 (rule or code):** decide on the HEAD request: either amend rule 9 to allow it or remove it.
3. **Dim 2:** stop `.hero-in` growing when the button is parsed, for example a phone `min-height` on it, then re-run `audit-mockup.mjs` until `scroll.early.cls` < 0.01.
4. **Dim 7:** leave the plain link visible under the frame, so a blank frame still shows it. A browser error page or a server's error page painted inside the frame cannot be detected from outside; say so in `tools.md`.
5. **Dim 7 (optional):** on a failure in view, keep the white card and put the link or credit in it, instead of a blank space.
6. **`tools.md` proposal:** say which swell the headline shows, so it agrees with the widget.
7. **Playbook proposal (Shahar):** state whether fonts inside Rosa's frame count against the 2-family line.
8. **Open from round 3:** pause control for the two videos (dim 6); the owner's slogans (dim 5); offers after spot and season (dim 4); Booking.com parameters (dim 3); vid-001 rights at pitch (the waiver's condition).

### What this verification did not test

- A real tap through to Booking.com or a real call. Booking.com was not loaded, by the brief's limits; `audit.json.booking.tapped` reads the href and the funnel does not follow an engine. The URL is compared character for character only.
- A real phone: everything is headless Chromium with emulation and throttling, plus one WebKit desktop run. No Firefox. Touch swipe inside the widget and page scroll over it by touch are untested.
- Screen readers, including the block's `aria-live="polite"`.
- Inside Rosa's frame: axe ran with `iframes: false`.
- Hero and header contrast over the loop was not re-sampled. Since round 3 the CSS, JS and template have only additions (git diff shows no removed lines); the last figures are round 3's.
- The cause of the early shift is an explanation, not a proof; no round-3 build was rebuilt to compare.
- Data aged just under or over 24 h: only 30 h stale was forced.
- The two-embed budget case: this page has one embed.
- A sentence-by-sentence facts re-read: claims were traced by script, and some match on a dossier note field. The copy is unchanged since round 3's full check.

### Evidence files

All under `reports/2026-10-midigama-01/critic-cheeky-monkey-v1/`. Screenshots stay out of the report: the shared `verify-1-cheeky-monkey/shots/` was reused and not deleted, and my failure-path captures stayed in scratch.

- `audit.json`: `tools/audit-mockup.mjs` on `dist/`, run from an isolated root.
- `funnel/funnel.json`: `tools/funnel.mjs` on the live preview, depth 3.
- `forecast.json`: the block at 390 and 1440, every request, the iframe's attributes, cover tests, and the failure paths.
- `a11y-page.json`: axe, tab stops, block contrast, reduced motion, JS off, 320 px, budgets with the embed loaded.
- `handoff-widget-refuse.json`: the Plan a stay hand-off, headline against widget, focus in the frame, refused frames, stop at the margin, WebKit, live early CLS.
- `early-scroll-cls.json`: early scroll on the plain server and the live preview, with shift rectangles.
- `facts.json`, `quotes.txt`: the claims traced to dossier keys, and the review check.

## Verification 2 — full

critic 0.4.3 · rubric 0.3.2 · 2026-11-09 · this is a verification, not a scored round: the ledger is untouched and no round is counted. Site under test: the live preview https://cheeky-monkey-surf-camp.os1.workers.dev/. At 14:26 UTC its `index.html` was sha1 `d5851277…`, byte-identical to `sites/cheeky-monkey/final/dist/index.html` at that time. `tools/audit-mockup.mjs` ran on that same `dist/` at 14:26:44 UTC, from a scratch copy that writes only to my evidence folder. At 16:38 IST (14:38 UTC) the coordinator rebuilt `dist/` with one CSS hover/press transition on `.mark` that is not deployed. I scored the live page and did not count that difference. Every other test ran against the live URL. I formed this view before reading the "Verification 1" section, then checked each of its items. I did not read any visual-critic or experience-critic report. I reused the shared shots in `verify-2-cheeky-monkey/shots/` and did not delete them.

```
mode: full (verification)        round: none        variant: unique ("Pick your board", drone-loop first screen)
total (dims 1–7): 71.2 / 80      hard_fails: []   (vid-001 licence: Alon's recorded preview-only waiver, not re-opened)
result: the critic's part passes its gates; the overall result depends on dimension 8
```

With dimension 8 at 8/10 the total is (71.2 + 20) × 100 ÷ 105 = **86.9**, which passes. At 9/10 it is 89.2. A pass on the total needs dimension 8 ≥ 13.85 / 25 (5.6 / 10). The 8/10 gate from both visual critics is the binding condition.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | `critic-cheeky-monkey-v2/facts.json`: 60 page claims traced to dossier keys, 0 mismatches, 0 missing. I read every price by hand against `offers[]` / `lessons[]`: the 12 package prices, USD 20 per 90 min, and the 3 airport rows. 11 / 11 reviews are verbatim, with author, source and month equal to `reviews.quotes` (script compare). Ratings are 4.5/5 · 467 and 8.3/10 · 45, captured 26 Oct 2026, which equals `fetched_at`. Rosa headline = the live `rams.json` fetched in the same session: `current.t` 14:30+05:30, h [0.3, 0.5], first in-window swell 7.9 s from 149.5° ("south-east"), wind 5.7 km/h from 162° ("south"), onshore, `generated_at` 08:26Z (13:56 Colombo). Rams mapping: now recorded in `concepts.md` §3 (amendment 2026-11-09). I recomputed Rams at 360 m as the nearest of all Rosa spots (Coconut 578, Lazy Left 679, Lazy Right 980). −1: the 2021 package page priced A/C as a USD 50/week add-on (`offers[18..21]`). The page shows the 2021 package prices beside "Air conditioning … in every room" and does not mention the add-on. The prices carry "published 2021, call to confirm", so I score this as a framing risk, not a mismatch. The Rams mapping also still departs from schema v0.3 pending proposal 003 item 1. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json` (throttled 390 × 844): first load 533,112 B in 8 requests, LCP 752 ms, CLS 0, **`scroll.early.cls` 0 and `scroll.settled.cls` 0** (V1's 0.0288 is gone), largest image 119,050 B, fonts 64,900 B (2 families), 0 external JS, 0 third-party. No horizontal overflow at 320, 390 and 1440 (`scrollWidth` = `clientWidth`). At 320 the headline range shrinks to fit (206 px in a 236 px card). −1, layout at 390: Rosa's card is shorter than its 500 px reserved frame at 350 px wide. The site's white fallback card (`.fc-alt`, under the frame) shows through the frame's transparent lower part as an empty white strip of about 50 px under Rosa's card. Shared shot `mobile-05.png` shows it: the widget card ends and a second white card edge follows below it. At 1440 the widget fills its box and there is no strip (`desktop-04.png`). |
| 3 | booking CTA | 15 | 9 | 13.5 | `funnel/funnel.json` (live, depth 3): `primary_action` engine, `hero_action` engine with 0 taps to flow, `clicks_to_book` 1 ≤ target 1, class = `recommended.primary_action` (engine). `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html`, equal to `booking.engine_url` character for character. Every `tel:` is `+94719248686` (`contact.phone`) and every `mailto:` is `cheekymonkeymidi@gmail.com`. Primary action above the fold. JS off: 6 booking links reachable in `#book`, page text 10,350 chars. −1, unchanged: the engine link carries none of the visitor's choices (documented gap). |
| 4 | brand fit | 5 | 8 | 4.0 | The first screen has the drone loop, what and where in the header line ("Surf Camp \| Midigama, Sri Lanka") and "Check dates on Booking.com". Weeks with prices and inclusions, lessons and levels, rooms, shop, reviews, location and contact follow. The forecast sits under spot and season. −1: spot and season come before the offers (the concept's order, not playbook §3's). −1: "Languages spoken" is answered nowhere visible on the page (dossier `languages_spoken`: en; it appears only in JSON-LD `knowsLanguage`). |
| 5 | copy | 10 | 8 | 8.0 | English is complete. The fix-round labels are applied as the copyeditor asked ("Forecast for Mon 14:30", "Getting Rosa's latest forecast for Rams", "No fresh forecast just now"). Nothing calls Rams the business's break. No claim goes beyond the dossier. −2: the owner's slogans ("Catch waves, not worries", "Come as a stranger, leave as a friend.") are generic. The 16 amenities run as one pipe-joined paragraph. The fourth package card opens with "And the Surf Board Rental package…", which reads oddly in a card that stands alone. Two of the owner's verbatim alts carry a typo and a US spelling ("repeairing", "Colorful") on a British-spelled page. |
| 6 | accessibility | 8 | 9 | 7.2 | `a11y-page.json`: axe-core 4.13 (WCAG 2.0/2.1 A + AA) after a full scroll, widget loaded: **0 violations** at 390 and 1440, and 0 inside the open drawer. `color-contrast` incomplete on 182 / 186 nodes (text over footage and photos). Measured tokens: `--ink-2` on tint 6.37:1, on white 7.55:1, white on `--book` 4.98:1. Keyboard: 70 tab stops at each width, all with a visible outline or ring and all on screen. Drawer: role dialog, `aria-modal`, focus to close, Tab stays inside over 25 presses, Esc closes, focus returns to "Plan a stay". **The pause control now exists** ("Pause the videos", 44 × 44, `aria-pressed`). Pressed by keyboard, it paused both loops at 390 and 1440, and they stayed paused after scrolling to the board and back. Reduced motion: 0 video requests, poster shown. 0 images without alt, 0 tap targets under 44 px. −1: in every widget-failure path (frame aborted, 404, CSP-refused) the frame still fires `load` and is shown on top of the fallback card. The card's blue "See today's forecast for Rams on Rosa" button is then visible but dead: a tap hits the iframe ("nothing happened" in `forecast-widget-failure-taps.json`), and the card is `inert`. The working plain link stays in the credit line above it. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static output: 71 files, lowercase names, relative URLs, the only `http://` is the SVG namespace, 0 hits for key / token / secret / password, `noindex, nofollow`, robots `Disallow: /`. Fonts self-hosted with licence files. 0 third-party requests on first load at 390 and 1440 (`audit.json` and `forecast.json`). No CMS call. V1's two §4 misses are fixed: **no HEAD request any more** (after the scroll the page itself makes one GET to `rams.json` plus the frame document), and the plain link no longer depends on the frame: it is always visible in the credit line. The iframe's attributes are exactly `agents/designer/tools.md`'s snippet, with `src` held in `data-src` until the block nears. |
| | **total 1–7** | 80 | | **71.2** | |

**Hard fails: 0.** I checked each one: fact contradictions 0, CTA landing exact, primary-action class engine = recommended, third-party on first load 0, CMS dependency none, keyboard trap none, content only in video none, every budget line met, secrets none, no non-business image shown as the business (46 / 46 photos `business-owned`), no borrowed atmosphere. The vid-001 licence is Alon's recorded preview-only waiver and is not counted. It still has to be resolved before anything goes live. As in V1, a strict reading of schema v0.3 ("the nearest other spot is never used as this one") would make the Rams block a claim with no dossier entry. It is recorded in `concepts.md` as the nearest Rosa spot with its distance, pending Shahar on proposal 003 item 1, and I judged it as recorded.

**Pass thresholds (full), the critic's part:** no hard fail ✓. Dimensions 1–7 each ≥ 6 ✓ (lowest 8). Every playbook §4 budget line met ✓. Total ≥ 85 ✓ if dimension 8 is ≥ 5.6. Both visual critics ≥ 8: pending.

### The forecast block (rule 9 and playbook §4), live, 390 and 1440

`forecast.json` (17 scenarios) and `forecast-widget-failure-taps.json`. Captures stayed in scratch.

| Check | Result | Evidence |
|---|---|---|
| Spot id, headline and widget | same: `rams` | `data-json` …/spots/rams.json; widget `spot=rams&theme=light&units=metric`; JSON `spot.id` rams, `name` Rams, `town` Midigama |
| Mapping through `concepts.md` | **pass, as recorded** | §3 amendment 2026-11-09: `rosaSpotId: rams`, nearest Rosa spot, 360 m; recomputed from Rosa `index.json` today: Rams 360 m, Coconut 578, Lazy Left 679, Lazy Right 980. Open: proposal 003 item 1 (Shahar) |
| Page wording | pass | "Rams is the nearest spot Rosa covers, about 360 m from the shop." · "Forecast for Rams by Rosa" · "See today's forecast for Rams on Rosa" |
| Site's half: headline only | pass | Time, height range, swell, wind, Rosa's update time; no day-by-day boxes, rows or chart |
| Widget unmodified | pass | Attributes = `tools.md` snippet; computed filter none, opacity 1, no transform/clip/blend; parent `overflow: visible`; `elementFromPoint` = IFRAME at all 6 (390) / 12 (1440) in-view points; 350 × 500 at 390, 420 × 500 at 1440 |
| Nothing from Rosa on first load | pass | 0 third-party hosts after 3 s without a scroll, every scenario |
| After scrolling: one JSON request plus the frame | **pass** | Top document: exactly 1 request (`rosa-data-opal.vercel.app/data/spots/rams.json`). Then the frame, whose own 11 requests (rosa.surf document, Inter from Google Fonts, Esri tiles, Rosa's own JSON) belong to the frame. V1's HEAD is gone |
| Space reserved, CLS | pass | 0 layout shifts in all 17 scenarios, through load, failure, refusal and scrolling past. In view, every box keeps its size (block 949 px at 390, 500 px at 1440, live or failed) |
| Headline = live JSON | pass | See dimension 1. A fresh 23 h file still draws, with "Rosa updated it on 8 November at 21:01" |
| JS off | pass | The headline card is hidden; the box shows the fallback card "Wave height, swell and wind for Rams" with its working "See today's forecast for Rams on Rosa" button, plus the credit link; 0 third-party; a tap navigated to rosa.surf |
| JSON aborted · 500 · stale 25 h · no `current` · not JSON | pass | No numbers and no frame request in any of the five. Below the screen (`.solo`): the headline card drops and the fallback card takes its own height (no shift seen). The link is in the fallback card and working (a tap navigated to rosa.surf) |
| JSON failure with the block in view (aborted at 1440; hung 13 s at 390) | **pass** (V1's blank hole fixed) | The white card says "No fresh forecast just now / Rosa's own page for Rams has today's forecast."; the credit line keeps the plain link; the right box shows the fallback card; sizes unchanged |
| Widget frame never loads (request held, no response) | pass | After 10 s the frame loses its `src`; the fallback card's button works (a tap navigated) |
| **Widget aborted · 404 · `frame-ancestors 'none'`** | **link shown; dead button beside it** | The frame fires `load`, so `fc-rosa on`, and the frame is shown on top of the fallback card. The credit line's plain link is visible and works. The card's button under the frame does nothing when tapped (all three cases), and the card is `inert` / `aria-hidden`. With a 404, Rosa's error body ("404 Not Found" in default serif) paints over the top of the card (scratch capture). Headless shows aborted and refused frames as transparent; a real Chrome would paint its own error page there (untested) |
| `shoot.mjs` waited | pass | `mobile-05.png` and `desktop-04.png` show the drawn headline (0.3–0.5 m, Mon 14:30) and the loaded widget; `shoot.json` errors [] |
| Embeds | 1 of 2 | One iframe (Rosa); the map is a link |
| Budget with the embed loaded | pass | +301,022 B third-party (decoded) after the block loads; 533 KB + 301 KB < 1.5 MB |

**Headline against the widget.** At 14:30 the site shows "Swell 7.9 s from the south-east", the mean `period` of the first in-window swell, as `tools.md` says today. Rosa's widget row for 12:00 shows "12s SSE"; that swell's `peak_period` is 12.3 s. This is the known `tools.md` gap (proposal 003 item 3), not a site defect. A visitor sees two different periods side by side until it is settled.

### Playbook §4 budget, measured

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (video excluded) | ≤ 1.5 MB | 533,112 B (plain server, uncompressed HTML); live HTML is 30,792 B compressed | ✓ |
| The same plus Rosa's block | ≤ 1.5 MB | + 301,022 B decoded | ✓ |
| Hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | Files on disk: phone `cm-drone.p1080.webm` 0.999 MB (+ board reel `p640.webm` 0.42 MB = 1.42 MB); desktop `d1920.webm` 1.64 MB (MP4 3.82 MB) | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; inline 15,889 B, 5,888 B gzip | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 119,050 B | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | Site: 2 families, 64.9 KB; Rosa's frame adds Inter. I count this as met, the same reading and the same open rule conflict as V1 | ✓ |
| LCP | ≤ 2.5 s | 752 ms | ✓ |
| CLS | < 0.1 | 0 at load; early and settled scroll 0 | ✓ |
| Third-party requests on load | 0 | 0 | ✓ |

### Verification 1's items, re-checked

| V1 item | Now |
|---|---|
| 1. Rams mapping missing from `concepts.md` | Fixed: §3 amendment, with distances and the pending proposal |
| 2. Extra HEAD request | Fixed: removed; one JSON GET + the frame |
| 3. `scroll.early.cls` 0.0288 | Fixed: 0 / 0 in `audit.json` |
| 4. Refused frame hides the link | Fixed for the link: always visible in the credit line. Left: the fallback card under a shown failed frame carries a dead button (dimension 6) |
| 5. Blank space on a failure in view | Fixed: "No fresh forecast just now" card in the same box |
| 6. `tools.md` swell choice | Open (proposal 003 item 3) |
| 7. Fonts in Rosa's frame | Open (rule conflict, Shahar) |
| 8. Pause control | Fixed: works at both widths, by keyboard |
| 8. Slogans, offers order, Booking.com parameters, vid-001 rights | Unchanged; vid-001 under the waiver |

**what the designer prompt got wrong:** The fallback card was built as an underlay for a frame whose failure cannot be detected. Its button is therefore visible but dead whenever Rosa's document fails after the frame has started loading. On a phone it also shows through the bottom of the widget's transparent reserved box. `tools.md` says the frame cannot report a refusal, but it does not say what may sit under the frame. The plain link must live outside the frame's box. Anything drawn inside that box under the frame should be decoration only, never a control, and it should stop at the widget's measured height at each width (`tools.md` already lists 453 px at 360 and 416 at 300).

**fix list (smallest first; none blocks the critic's part):**
1. **Dim 2:** at narrow widths, keep the fallback card from showing under a loaded widget: hide `.fc-alt` once `.fc-rosa.on` is set, or give the box no white ground.
2. **Dim 6:** when the frame is shown (`.on`), drop the fallback card's button (or the whole card) so no dead control is visible; the credit line's plain link already covers the failure paths.
3. **Dim 4:** show "English spoken" in the facts the page already has (staying here or getting here); the source is `languages_spoken`.
4. **Dim 5:** break the amenities paragraph into a list; reword "And the Surf Board Rental package…" so the card stands alone.
5. **Dim 1 (owner/copy):** say beside the 2021 package prices that A/C was then a USD 50/week extra, or leave the question to the "call to confirm" line explicitly.
6. **Open for the humans:** proposal 003 items 1 (Rams mapping) and 3 (swell field); the fonts-in-frame reading; vid-001 rights before go-live.

### What this verification did not test

- A real phone or a real desktop browser. Everything ran in headless Chromium with emulation; there was no WebKit or Firefox run this time. How a real Chrome paints an aborted or refused frame (its own error page over the fallback card) is untested.
- A real tap through to Booking.com, a call or an email; links compared character for character only. I did not re-walk the "Plan a stay" room hand-off beyond opening, tabbing and closing the drawer (V1 walked it and the code is unchanged in that part).
- Screen readers, including the headline's `aria-live`.
- Save-Data (the code puts it in the same `still` class as reduced motion; only reduced motion was run).
- Contrast of the hero and header text over the moving footage (axe incomplete).
- Inside Rosa's frame: axe was not run in the frame. Touch scrolling over the widget was not tested.
- `audit-mockup.mjs` measured `dist/` as it was at 14:26 UTC (identical to live). The coordinator's later `.mark` transition was not measured.

### Evidence files

All under `reports/2026-10-midigama-01/critic-cheeky-monkey-v2/`; screenshots stayed in scratch.

- `audit.json`: `tools/audit-mockup.mjs` (scratch copy, output path only changed) on `dist/` as deployed.
- `funnel/funnel.json`: `tools/funnel.mjs` on the live preview, depth 3.
- `facts.json`: 60 claims → dossier keys → result.
- `page-text.txt`: rendered text, alts and every link of the live page at 390.
- `forecast.json`: 17 forecast scenarios (normal, JS off, JSON aborted / 500 / stale 25 h / 23 h / no `current` / not JSON / 13 s hang, widget aborted / 404 / refused, everything blocked) with requests, block state, iframe attributes, cover points and layout shifts.
- `forecast-widget-failure-taps.json`: what a tap on the fallback card's button does in each state.
- `a11y-page.json`: axe at 390 and 1440 and in the drawer, 70 tab stops per width, drawer trap and Esc, pause control, reduced motion, video playback.
