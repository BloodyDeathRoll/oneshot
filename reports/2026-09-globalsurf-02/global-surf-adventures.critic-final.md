# global-surf-adventures — critic full scorecard, final site, round 1 (station 5)

critic 0.4.2 · rubric 0.3.1 · run `2026-09-globalsurf-02` · 2026-10-05 · operator shahar · the built site `sites/global-surf-adventures/final/dist/` as served at http://127.0.0.1:8764/ (home + `book/`; a no-`SITE_URL` preview build). Not rebuilt or edited. Dimensions 1–7 only. The visual-critic and experience-critic reports for this round were not opened.

Checks, in this order:
1. `tools/audit-mockup.mjs` on a scratch mirror of `final/dist` (throttled phone, no scroll). Output: `critic/final/audit.json`.
2. `tools/funnel.mjs http://127.0.0.1:8764/ --depth 3` → `funnel/global-surf-adventures-r1/funnel.json`.
3. `tools/shoot.mjs` on home and `book/`, 1440 and 390 (scrolled, per viewport).
4. Home probe (`probe-home.mjs`, the 4f r2 probe unchanged): video timing, first screen, hero tap, full-scroll CLS, overflow, tap targets, fonts, 90-stop Tab pass, reduced motion, Save-Data, JS off.
5. Booking walk (`probe-book.mjs`, new for 4g), **starting on the home hero and counting taps**: 390 live, 1440 live, 390 engine blocked, 390 mocked "dorm only", 390 mocked "date struck after a guest is added", 360×640. Plus deep links from home, a 40-stop Tab pass, reduced motion, phone video, and JS off at 390 and 1440.
6. axe-core 4.13.0 (wcag2a/aa, wcag21a/aa) on home and on all four booking steps, at 390 and 1440. Delivery baseline: both pages with every non-local request blocked, load plus full scroll (`probe-axe-offline.mjs`).
7. Rosa: live and JSON blocked (`probe-rosa.mjs`), the layout before and after the JSON (`probe-rosa-shift.mjs`, `probe-rosa-cls.mjs`), and a slow failure in view (`probe-rosa-slowfail.mjs`).
8. Hero title contrast: the poster plus 11 frames of `gs-hero-loop.d1920.mp4` and `.p546.mp4` (`probe-hero.mjs`).
9. `check-design.mjs` on both pages. Licence of every image and video in `dist/`. Static-output grep: secrets, CMS and localhost URLs, root-absolute paths, uppercase names, audio tracks.
10. Facts: rendered text (home, and booking with JS off so all four steps show) against `dossier.json`, mechanically. Quotes are compared verbatim.
11. The two engine hand-off URLs, loaded read-only in headless Chromium.

Evidence: `reports/2026-09-globalsurf-02/critic/final/` — `audit.json`, `home-probe.json`, `home-text*.txt`, `book-probe.json`, `book-text-nojs.txt`, `axe-offline.json`, `rosa-probe.json`, `rosa-shift.txt`, `rosa-cls.json`, `rosa-slowfail.json`, `hero-contrast.json`, `check-design-*.txt`, the probe scripts and logs. Funnel: `reports/2026-09-globalsurf-02/funnel/global-surf-adventures-r1/funnel.json`. The screenshots were deleted after scoring (CLAUDE.md rule 6); what they showed is described below in words.

## Result

**PASS on the critic's gates: 71.4 / 80 on d1–7, no hard fail, every dimension ≥ 6, every playbook §4 budget line met.** d8 is pending from the visual critics. For the full-mode total of ≥ 85 / 100, d8 must be ≥ 8 from both of them, which gives ≥ 91.4.

| d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | hard fails |
|---|---|---|---|---|---|---|---|---|
| 10 | 9 | 9 | 8 | 9 | 9 | 6 | **71.4** | none |

One defect is real and new at 4g. If the Rosa forecast fails while the block is on screen (a timeout or a slow refusal), the block collapses by 612 px on a phone and the page jumps (layout shift 0.27 at 390, 0.10 at 1440). It is not a hard fail, because the load-time CLS is 0.0033, but it breaks playbook §4's embed rule. It is item 1 of the fix list.

## Funnel (rubric 0.3.1, `recommended.booking_flow` set)

| measure | target (`audit.json.recommended`) | built site |
|---|---|---|
| `hero_action.class` | `engine` | **engine** ("Book package now") ✓ |
| `hero_action.clicks_to_flow` | ≤ 1 | **1** (home → `book/`) ✓ |
| walked taps, hero CTA → engine hand-off | ≤ 8 | **8** at 390 live, 1440 live, 390 blocked, 360×640 ✓ (at the limit) |
| `clicks_to_book` / `primary_action` (tool fields, not the gate under 0.3.1) | 1 / engine | 1 / whatsapp ("Ask about dates", the Freestylers link) |
| pages crawled / broken | – | 8 / 0, no console errors |

The 8 taps are Book package now → Level 2 → Twin pill → Choose this room → + couple → Sat 20 Feb 2027 → Next → Continue booking. With the room shown first (Dorm) it is 7.

Hand-off: `…/product/level-2-rollers?couple=1&start=2027-02-20&end=2027-02-27`. Loaded read-only, it lands on the engine's `/accommodation` step with "Guests: 2" and "Duration 7 nights". The JS-off `duration=8` URL lands the same. The chosen room is not carried over: the engine lists its rooms again. The Total step says so ("confirm your room … on our Bookinglayer booking page").

## Measured (playbook §4)

| line | target | measured |
|---|---|---|
| first load, phone, throttled, no scroll | ≤ 1.5 MB | **506 KB** (11 requests; HTML 97 KB, fonts 104 KB, images 317 KB, JS 0 external) |
| hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | phone `gs-hero-loop.p546.webm` 1.27 MB, requested 35 ms after FCP; desktop `d1920.webm` 2.83 MB, 30 ms after FCP. MP4 fallbacks 1.79 / 3.87 MB |
| JS, compressed | ≤ 300 KB | inline only, 0 external |
| largest above-fold image | ≤ 300 KB | 73 KB |
| fonts | ≤ 2 families, ≤ 150 KB | Lora + Dancing Script, 104 KB, self-hosted (`dist/fonts/`) |
| LCP / CLS on load | ≤ 2.5 s / < 0.1 | **436 ms / 0.0033** |
| CLS after a full scroll | – | phone 0, desktop 0.0072 (Rosa live) |
| third-party requests on load | 0 | **0** on home and `book/` (audit, and the network-blocked run) |
| overflow-x, tap targets < 44 px | 0 / 0 | 0 / 0 on home and every booking step at 390, 1440 and 360 |
| video, phone full scroll of home | – | 3.76 MB (hero 1.24 MB + three level clips 0.53 / 0.71 / 1.28 MB) |
| video under reduced motion / Save-Data | 0 | 0 / 0 on home; 0 on `book/` (reduced motion, desktop); 0 on the phone booking page |

## Booking walk (Level 2 → Twin → Sat 20 Feb 2027, 7 nights, 1 couple) — Shahar's 4g must-fixes re-tested

| check | 390 live | 1440 live | 390 blocked | 390 mock "dorm only" | 390 mock "date struck" | 360×640 |
|---|---|---|---|---|---|---|
| engine calls on load | 0 | 0 | 0 | 0 | 0 | 0 |
| hero lands on | `book/`, Level (L1 preselected) | same | same | same | same | same |
| "Choose this room" on arrival | y 633–685 / bar 776 ✓ | y 481–533 / bar 820 ✓ | ✓ | ✓ | ✓ | **y 615–667, under the bar (572)** |
| guests above the Saturdays (fix 1) | ✓ guests y 437–641, chips after | ✓ | ✓ | ✓ | ✓ | ✓ |
| live calendar | Sat 19 Dec struck for 1 couple | same | none struck (snapshot) | only 20 Feb offered | 20 Feb struck after +1 woman | snapshot |
| struck date (fix 1) | – | – | – | – | start cleared; "Sat 20 Feb 2027 isn't available for 1 woman, 1 couple. Choose another Saturday."; Next stays on Dates; submit blocked | – |
| room not free (fix 2) | – | – | – | Twin **kept**; Dates: "Not free on these dates: Shared twin room – 2 beds. Only the Mixed dorm room – 4 beds is free on these dates." + Change room; Total: room "Not free on these dates", totals "—", bar button "Change room", submit blocked; after choosing Dorm: $2,932 + Continue booking | – | – |
| total | $3,092, "Live price from the booking engine" | same | $3,092, "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." | $2,932 (dorm) | – | $3,092 (snapshot) |
| summary dates (fix 5) | "20 Feb 2027 – 27 Feb 2027" / "7 nights" | same | same | same | – | same |
| hand-off | `…level-2-rollers?couple=1&start=2027-02-20&end=2027-02-27` | same | same | same | none | same |
| CLS through the walk | 0 | 0 | 0 | 0 | – | 0 |

- **Home "Choose this room" (fix 3):** the links are `book/?room=dorm|twin|double`. `?room=double` opens Level with no level chosen, room = double, and Next soft. Next without a level stays on Level. After Level 3 it opens Room with Deluxe kept.
- **Level CTAs:** `book/?level=level-N-…#room`.
- **JS off (fix 4), 390 and 1440:**
  - All four steps stack. The first Saturday is 24 Oct 2026.
  - A submit without a stay length is blocked by `required`, and no request is made.
  - Hand-off: `…level-2-rollers?female=0&male=0&couple=1&start=2027-02-20&duration=8`.
  - The JS-off list still offers Sat 19 Dec, which the live calendar strikes for 1 couple. That is unavoidable without JS; the engine decides.
- **WhatsApp prefill on Total:** "Hi Global Surf Lodge Kabalana, I have a question about the surf packages. Level 2 – Rollers, check-in 20 Feb 2027, 7 nights, 1 couple, Shared twin room – 2 beds." The number is `wa.me/972523593240`, character for character `booking.whatsapp`. The phone is `tel:+97299733943` = `contact.phone`.
- **Dates step:** after the guests and chips, the Nights selector is below the fold. It is at y 791 at 390 (bar at 776) and y 1093 at 1440. It defaults to 7, so the flow is not blocked.
- **Screenshots (deleted):**
  - `390-struck-3s-struck` showed the steppers (Women 1, Couples 1) and the grey message box under them.
  - `390-mock-3c-filled` showed every Saturday struck through except a dark "Sat 20".
  - `390-mock-4-total` showed the summary with "Room, per person: Not free on these dates", "Total per person —", and a dark-coral "Change room" in the bar.

## Facts (every checkable claim → dossier; 0 mismatches, 0 unsourced)

| claim on the page | dossier key | result |
|---|---|---|
| From $1,466 pp, 7 nights (×3 levels, bar) | `offers[0–2].price` 1466 USD, unit per person 7 nights | match |
| 12 rooms · Saturday check-in · ISA-certified surf guides | `rooms[0]` "12 spacious…", `offers[].duration_options` "Saturday check-in", `credentials[0]` | match |
| inclusions (7 nights, 7 breakfasts, 5 dinners, 5 × 2 h sessions, 5 theory, equipment all week, walk or ride, excursion, water, coffee and tea) | `offers[0–2].includes_engine` | match (subset) |
| Level 3: 5 coached surf sessions of 2 hours | `offers[2].includes_engine[4]` | match |
| airport pickup from $220 pp, not included | `offers[].package_items_engine` | match |
| Freestylers – B&B only, from 4 nights, no price | `offers[3]` ("min 4 nights", price gap) | match; gap handled by omission |
| room amenities (AC, fan, safe box, private toilet and shower, socket, board rack) | `room_amenities` | match |
| Dorm 4 single beds, private outdoor bathroom, shared, sleeps 4 | `rooms_engine[0]` | match |
| Twin 2 beds, private bathroom, beach view, +$140 (one) / +$80 (two sharing) | `rooms_engine[1]` (140.04 / 80.025) | match (whole dollars, < $0.50) |
| Deluxe queen-size bed, sleeps 2, private, +$418 | `rooms_engine[2]` (418.46) | match |
| sample 20–27 Feb 2027, prices 29 Sep 2026 | `rooms_engine[].supplement_samples` fetched 2026-09-29 | match |
| 8.6 Booking.com, 80 reviews, 28 Sep 2026; Staff 9.5, Facilities 9.2, Cleanliness 9.2 | `reviews.booking` | match |
| 9 quotes + authors | `reviews.quotes` | 9/9 verbatim; 7 Booking.com, 2 from the business's own site (`source: other`) |
| two spots, The Rock and South Point; more waves by tuk-tuk | `location.spot` | match |
| address "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address` (Google, capitalised per §6) | match |
| 40 m / 350 m / 400 m / 4 km / 3.9 km, credited to Booking.com | `location.distance_to_beach.others[0]` | match |
| check-in 14:00–20:00, check-out by 11:00 | `stayInfo` | match |
| 40 % deposit, rest 45 days before; full payment inside 45 days | `booking.deposit_terms` | match |
| up to 6 guests | `offers[].max_guests_per_booking` 6 | match |
| Saturdays (JS-off list), 7/14/21/28 nights | `docs/bookinglayer.md` §2 (2026-09-29), `duration_options` | match |
| WhatsApp, phone, email, Instagram, YouTube, Facebook, terms, Google Maps | `contact`, `booking.whatsapp`, `location.map_url` | match |
| Rosa values (0.4–0.6 m, 9 s SSE, 6 km/h cross-shore, "Mon 5 Oct 08:30") | live Rosa JSON, not content (schema v0.3) | n/a, sourced at run time |

`audit.json` `facts`: 28 numbers on the page, 0 not in the passed copy. Images: 32 photo ids used, all `business-owned`; 7 video stems, made from 10 dossier videos, all `business-owned`; no `stock/` folder. Videos have no audio track (ffprobe, all MP4 and WebM files).

## Accessibility

- **axe-core 4.13.0:** 0 violations on home and on all four booking steps at 390 and 1440.
  - "Incomplete" items: `color-contrast` 22 / 17 on home (text over photos and video, which axe cannot decide) and 3 on the Dates step.
- **Keyboard:**
  - Home, 90 Tab stops: no trap. Every stop has a ring, except Rosa's iframe (Rosa's own) and `body` at the wrap-around.
  - Booking, 40 Tab stops: the order is skip link, logo, menu, the four step links, the level radio group, "Ask about dates", Next, then the footer. Every stop has a ring.
- **Hero title background**, glyphs and shadow removed, shade on, lightest 10 %:
  - Desktop: 3.13–8.77 on the poster and on 10 of 11 frames. The reef frame at 9.0 s is **2.41**.
  - Phone (p546): 2.57 at 2.0 s and 2.85 at 9.0 s; every other frame is ≥ 3.04.
  - These figures are before the text-shadow, which adds on top. Large text needs 3:1.
- Reduced motion: no video, a photograph stays. Skip link, `lang="en"`, 0 images without alt (4 decorative with empty alt), headings in order (h1 → h2 → h3).

## Delivery baseline

- **Static output:** 230 files, `index.html` + `book/index.html`, no server code. Only relative URLs (no root-absolute `src`/`href`). Lowercase filenames.
- **No secrets or internal URLs:** a grep for `localhost`, `127.0.0.1`, `api-key`, `token`, `secret`, `password`, `/api/media` and `payload` finds nothing. The page has no CMS or Payload reference at run time (the build reads a seed `content.json`).
- **Network blocked except the local server:** both pages load whole, with 0 third-party attempts on load.
  - After a full scroll of home, the only attempt is Rosa's JSON. The block then shows "See today's forecast for South Point on Rosa".
  - `book/` attempts nothing: its engine calls start only after interaction.
- **Embeds: 1** (Rosa's widget). It loads lazily, after its JSON.
  - Requests made by the page itself: `south-point.json`.
  - Requests made inside Rosa's frame: `rosa.surf/widget/?spot=south-point&theme=light&units=metric`, a second JSON, `fonts.googleapis.com`, `fonts.gstatic.com` and `server.arcgisonline.com` tiles. All are Rosa's own, so the widget is unmodified.
  - Credit line "Forecast for South Point by Rosa". The headline shows only the reading now: height, period and direction, wind and its class, and the time. The 24 h staleness rule is in `home.js`.
- **Rosa space reservation — defect:**
  - **Live success, 390:** the headline grows by 46 px and the detail by 26 px when the data arrives, so the widget box moves down 71 px. Shift 0.007–0.014 in two runs. 1440 does not shift.
  - **JSON blocked before the block nears the viewport:** the block collapses out of sight, and nothing visible shifts.
  - **JSON failing while the block is in view** (3 s, then refused; the page's own abort is at 8 s): the block collapses from 1016 to 404 px at 390 and from 720 to 449 px at 1440. Layout shift **0.269** (390) / **0.099** (1440).
  - Playbook §4 requires "its space is reserved, so nothing shifts when it arrives, fails, or is refused". The 4f composite passed this because it carried an inlined reading; 4g removed it (must-fix 8).
- `dossier.videos[]` now has `vid-hero-c`, `vid-book-l1..l3` (commit 131a580). `make-media.sh` has `# media:` headers. `media/global-surf-adventures.tsv` lists the `gs-*` files.
- Preview build: `noindex, nofollow`, robots `Disallow: /`, no canonical, og:image or sitemap without `SITE_URL`. This is by design (seo-report.md item 8); the deployer must build with the domain.

## Shots (deleted after scoring; what they showed)

- **Home, mobile sheet (16 frames, 11,582 px):**
  - Frame 1 is the portrait hero: a pool under palms, the white title "Your surf week starts here", a coral "Book package now", and the "GLOBALSURF" logo.
  - The rest, in order: welcome with the surfer photo; level cards in a swipe row; Freestylers card; What's included icon list; "Surf, breakfast, surf again" with a slideshow; Our rooms pills with Dorm and "Choose this room"; the "Footwear is discouraged" feature photo; the guests band on ink (8.6 Booking.com); the Rosa block with the widget; Instagram row; the closing split; footer.
  - The "From $1,466 pp | 7 nights · Book now" bar is on every frame after the hero.
- **Home, desktop sheet (13 frames, 9,938 px):** the same order, with the nav "Levels · Rooms · The lodge · Contact" and a coral "Book now" after the hero.
- **Booking, mobile sheet:** a photo band, then the progress bar "Level · Room · Dates & guests · Total", "Your level" with Level 1 ink-selected with a tick, Levels 2 and 3 below, and the bar "From $1,466 pp · Next".

---

```
mode: full        round: 1        variant: picked composite, 4g port (final/)
total: 71.4 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches and 0 unsourced (facts table above; 9/9 quotes verbatim; 28 numbers, 0 outside the passed copy). Gaps (Freestylers price, season, staff languages, Google count) are omitted, not filled. The rating is dated. Whole-dollar supplements are the passed copy's strings (< $0.50 rounding). |
| 2 | mobile + perf | 9 | 506 KB, LCP 436 ms, CLS 0.0033, 0 third-party on load, 73 KB largest image, fonts 104 KB self-hosted, hero video after first paint and within both caps, 0 overflow, 0 small targets, 360×640 usable. Minus: 3.76 MB of video on a phone full scroll; the Rosa headline at 390 shifts the widget 71 px on arrival (0.007–0.014). |
| 3 | booking CTA | 9 | `hero_action` engine, 1 tap to the flow, 8 walked taps to the hand-off (target ≤ 8). The hand-off lands on the engine's accommodation step with the guests and 7 nights. Correct with JS on, JS off (`duration`), the engine blocked, and the mocked "dorm only" and "date struck" cases. Must-fixes 1–5 and 7 verified. The prefill names the business and every choice. Minus: "Choose this room" is under the bar at 360×640; Nights is below the fold on Dates (390, 1440); 8 taps sits exactly at the limit. |
| 4 | brand fit | 8 | §3 order present, the persistent mobile bar, prices one scroll from the hero. Minus: no proof point on the first screen. The h1 has no name or place (Shahar's open decision; not scored down further). |
| 5 | copy | 9 | Passed `en.json` verbatim; room names now in sentence case. Minus: the two testimonials from the business's own site carry no source label; neither the rating nor the quotes link to their listing (`ratings[0].url` is in the content but not rendered). |
| 6 | accessibility | 9 | axe 0 violations on 10 page states. No keyboard trap, rings everywhere. Reduced motion and Save-Data load 0 video. Skip link, alt, heading order. Minus: the hero title background reaches 2.41:1 (desktop reef frame) and 2.57:1 (phone 2.0 s) at its lightest 10 % before the text-shadow; Rosa's iframe shows no ring. |
| 7 | security + delivery | 6 | Static, relative, no secrets, no CMS runtime call, self-hosted fonts, 0 third-party on load, 1 lazy embed, `# media:` recipe, dossier videos recorded, no audio tracks. **Minus: the Rosa block's space is not reserved against failure.** A forecast that fails while in view collapses the block (shift 0.27 at 390). Playbook §4 / critic hard constraint 9. |

check-design default-look facts (none fail):
- home: h1 Lora, h2 Dancing Script, body Lora.
- book: h1/h2 Dancing Script, body Lora.
- Both: ground `#FFFFFF`, 0 all-caps labels, 0 labelled headings (0/20, 0/11).
- 0 problems, 0 warnings.

## Open decisions for Shahar (noted, not failed)

1. The home h1 "Your surf week starts here" carries neither the name nor the place. Playbook §2 asks for "what + where above the fold".
2. The business name is not visible text: it appears in the logo SVG (`aria-label`), the hero `aria-label`, `<title>` and the footer © ("Global Surf Adventures").
3. The site's phone `+97299733943` (the Israeli HQ line, `contact.phone`) and name "Global Surf Lodge Kabalana" differ from the Google listing (`phone_lodge` `+94770776747`, "Global Surf Lodge").
4. The phone hero is a build-made 546×972 portrait crop of the one CMS hero video. The poster and 11 frames were checked for title contrast above; whether the crop is good enough is the visual critics' call.

## Fix list for the designer (none blocks this round; smallest first)

1. **Rosa: reserve the block's space against failure** (d7, playbook §4). When the JSON fails, times out or is stale, keep the block's height and show the plain link inside the reserved box, instead of collapsing it. Also give the headline its full arrival height at 390, so the widget does not move 71 px when data lands.
   - Evidence: `rosa-slowfail.json` (shift 0.269 at 390, 0.099 at 1440); `rosa-shift.txt` (`.now` 53 → 99 px, `.detail` 44 → 70 px, `.rosa-box` y 436 → 507); `home.js` `plain()` hides `now` and adds `box.off`.
2. **Testimonials from the business's own site:** label their source, e.g. "globalsurf.com", as the Booking.com ones are labelled. Link the 8.6 rating to `ratings[0].url` (d5, playbook §6).
3. **360×640: keep "Choose this room" above the bar** (d3). It is at y 615–667, under the bar top at 572 (`book-probe.json` `phone_small_blocked.s2_room_arrival`). Not fixed since 4f.
4. **Dates step:** bring Nights into view after the date is chosen, or put it above the chips (d3). It is at y 791 at 390 (bar 776) and y 1093 at 1440.
5. **Hero title, optional** (d6): a slightly stronger shade behind the title, for the reef frame (9.0 s, 2.41) and the phone 2.0 s frame (2.57).

what the designer prompt got wrong: The prompt says a third-party block must reserve its space, but the only failure the self-check tries is an immediate block. A refused request before the block is on screen hides the collapse, because nothing visible moves. The real case is a phone on hostel Wi-Fi: the visitor is already looking at the block when the 8 s timeout fires. The self-check should name "fail while in view" (delay, then refuse) and "data arrives at 390" as required passes, measuring the layout shift with the block on screen. Removing the inlined reading at 4g was correct, and it is exactly the change that exposed the gap.

Not tested:
- a real phone or GPU, Safari;
- throttled numbers for the booking page;
- the engine past its accommodation step (no booking was attempted);
- the hero contrast with the text-shadow included;
- the room-not-free and date-struck cases against the real engine (mocked replies only);
- a production build with `SITE_URL` (canonical, og:image, sitemap, JSON-LD 17 keys are the SEO report's claims, not re-run here);
- the side-by-side with globalsurf.com (the visual critics').
