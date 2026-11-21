# lotus-surf-house — critic scorecards (run 2026-10-midigama-01)

## Round 1 — quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-03 · mockups `sites/lotus-surf-house/mockups/{calm,interactive,unique}/dist/` (index.html dated 21:19 local, designer 0.7.1). The builds were served on :8913 / :8914 / :8915, and I confirmed each served `index.html` is byte-identical to its `dist/index.html` (`cmp`). I did not read any visual-critic or experience-critic report.

Same checks, same order, same viewports for all three:
- `audit.json` from `tools/audit-mockup.mjs`. It was measured at 19:21–19:22 UTC, after the last build, so I read it and did not re-run it.
- My own `tools/shoot.mjs` pass at 1440×900 and 390×844 (scratch, deleted after the round). Page heights and capture counts match the designer's `shots/`.
- axe-core (WCAG 2.0/2.1 A+AA) after a full wheel scroll, with every non-localhost request blocked and logged.
- A keyboard pass and a solid-background contrast pass.
- A tap-through.
- `tools/funnel.mjs --depth 3` as a forward check. That is full-mode evidence, run early here and kept in scratch only.
- `tools/check-design.mjs --no-shots`.
- A script that compares every testimonial with `copy/en.json` and `dossier.json` character by character.
- WebGL forced (`?light=force`, `?net=force`) under SwiftShader, to confirm the main items render.

The business has **no own website**. Its current presence is the Booking.com listing plus Google (`dossier/lotus-surf-house/audit.json`). The side-by-side comparison with that presence belongs to dimension 8 and is not scored here.

**Rubric arithmetic note (fact for the human):** dimension weights 1–7 sum to **80**, not 75, and with dimension 8 (25) the total is 105, not 100. The totals below are out of 80. The cheeky-monkey round-1 scorecard wrote "/ 75" for the same sum.

### Shared evidence (identical for all three)

- **Facts.** The tables below cover 0 mismatches and 0 unsourced claims. All 12 testimonials on each page equal `copy/en.json` character for character, and each copy quote equals a `dossier.json` review string exactly (script). Author, country, source and month match all 12/12 on every page. The page text was diffed line by line against `copy/en.json`. Every line not in the copy is one of two things: an interface label ("Skip to the rooms", "Choose your floor", "From the roof down", "Good to know", "Guests") or a short restatement of a copy or dossier fact ("Midigama Beach 250 m (Booking.com)", "Breakfast included, 8–10", "Check-in any hour", "Fan, no A/C, no hot water", "Ground floor, three room types", the rating blocks). Each of those traces to a dossier key, listed below. `audit.json.facts`: the only numbers outside the copy are "9.0" (the rating, `reviews.booking.rating`) and "2026." (from "read 3 Nov 2026.").
- **Booking.** Every external booking href is exactly `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html` = `dossier.booking.engine_url.value`. Every `tel:` is `tel:+94774647541` = `contact.phone.value`. There is no WhatsApp or email, which matches the dossier gaps. `audit.json.booking.tapped` on 390 touch lands on the listing URL, character for character. With JS off, `booking_links_reachable` is 2. Forward check `funnel.mjs`: `primary_action.class` = `hero_action.class` = **engine**, `clicks_to_book` **1**. That equals `recommended.primary_action` engine and `recommended.clicks_to_book` 1.
- **Delivery.** Each page is a static single HTML file plus `img/` (unique also has `stay/index.html`). There is no server code and no CMS call. No `src`/`href` starts with `/`, all filenames are lowercase, and there are no localhost, key, token or secret strings. Third-party hosts on first load and over a full scroll: only `fonts.googleapis.com` / `fonts.gstatic.com`. That is allowed at 4e (critic `tools.md`) and is a defect only in full mode. There are no embeds (0 of the 2 allowed) and no Rosa forecast (concepts §3: no named break).
- **Hard-fail screen.** No usable video: `videos[]` vid-001/002/003 are all `license: unknown`. No dossier photograph is ≥ 1920 px (max 1600, all 44 `business-owned`). So neither visual media hard fail can apply. No borrowed or stock image (notes: `check-places` 0; dossier `images[].license` all business-owned). No secrets.
- **check-design default look** (facts, not taste): 0 problems and 0 warnings on all three. Calm: display face Parisienne, body Hanken Grotesk. Interactive: Patrick Hand / Be Vietnam Pro. Unique: Allura / Gelasio. All three have a white ground (`hsl(0 0% 100%)`), 0 all-caps labels and 0 labelled headings.
- **Shared dimension 4 deduction.** On a 390 phone the first screen shows "Lotus Surf House / Midigama, Sri Lanka" and the button. The business **type** ("A guesthouse in Midigama…") first appears on screen 01 in all three (mobile-00/01 of each sheet). Playbook §2/§3 asks for type + place above the fold, and "Surf House" alone can read as a surf school or camp, which `business.type` says it is not. The `recommended.above_fold` items spot, included and trust also start on screen 01.

### calm — "The gate"

```
mode: quick        round: 1        variant: calm
total (dims 1–7): 71.9 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim with correct attribution, ratings 9.0/10 · 125 and 4.9/5 · 78 dated "3 Nov 2026" = `fetched_at` 2026-11-03. The hero details line "Midigama Beach 250 m (Booking.com) \| Breakfast included, 8–10 \| Check-in any hour" = `location.distance_to_beach`, `stay_info.breakfast_hours`, `stay_info.check_in`. Gaps (price, season, WhatsApp) are omitted, not filled. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json` (390, 1.6 Mbps / 150 ms / 4× CPU): first load **617 KB** (≤ 1.5 MB), 7 requests. JS 0 external (≈ 3 KB inline). Fonts 57 KB, 2 families. Largest image 232 KB (≤ 300). **LCP 1,016 ms**. CLS 0.02. Scroll CLS early 0.0008 / settled 0 (< 0.01). scrollWidth = clientWidth at 390 and 1440. Mobile sheet: no overlap or clipped text in 15 captures, and the persistent bar ("Check dates on Booking.com" + call icon) is present from capture 02 on. −1: 32 of 62 tap targets under 44 px (slideshow dots 24×44, header wordmark 134×43). |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero button is above the fold at 390 and 1440 (mobile-00: "Check dates on Booking.com" on the gate photo; desktop-00: left half). Every room has its own button. −1: every action lands on the listing's top, not on a room or with dates. It is still 1 click and within target. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order: gate photo + name + place + CTA → tagline, details, two dated ratings → garden → three garden rooms (fan, no A/C, no hot water stated plainly, per `recommended.offer_framing`) → Yelum and breakfast → King Rooms → roof → amenities → guests → getting here → good to know → closing → footer. custom.md calm brief: no canvas (`reduced_motion.canvases` 0), one CTA in the hero. −2: the shared above-the-fold deduction. |
| 5 | copy | 10 | 9 | 9.0 | All words come from `copy/en.json` (passed 4c). They are plain and specific (m², beds, fan / A/C / hot water per room, cash only, distances with their source). English complete. −1: on the phone the 12 reviews sit in a one-at-a-time slideshow, and Fiona's 80-word review appears twice (porch block and guests block, capture 08 and 12). |
| 6 | accessibility | 8 | 7 | 5.6 | axe 390: **1 serious, `scrollable-region-focusable`** on `.three` (the roof triptych is a horizontal scroll row, scrollWidth 883 in a 390 box, with no focusable content and tabindex −1, so a keyboard user cannot scroll it). axe 1440: 0 violations, 24 rule sets pass. Keyboard: a real skip link "Skip to the rooms" → `#garden` is the first stop, and every stop shows a 2 px solid outline. There is no drawer. 0 images without alt (23). H1 → H2/H3 in order, `lang="en"`. Contrast: the only sub-4.5 solid-ground items are decorative "\|" separators. The white hero text over the photograph was measured against a white fallback, a false positive. 0 page errors. −1 for the 32 small tap targets. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. −1: fonts load from Google, allowed at 4e, but they must be self-hosted at build. |
| | **total 1–7** | 80 | | **71.9** | |

### interactive — "Dappled"

```
mode: quick        round: 1        variant: interactive
total (dims 1–7): 71.9 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim (cards "Name, Country / Booking.com · Mon YYYY"). Fact cards "Midigama Beach 250 m · Booking.com", "Breakfast included · 8 to 10 in the morning", "9.0/10 and 4.9/5 · Booking.com, 125 reviews · Google, 78 · 3 Nov 2026" = dossier. The floor chips "Fan, no A/C, no hot water" = `room_types[0–2].air_conditioning:false` + `room_types_note`. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json`: first load **686 KB**, 13 requests. JS 0 external (≈ 10 KB inline). Fonts 41 KB. Largest image 181 KB. **LCP 532 ms**. CLS 0.0036. Scroll CLS 0.0001 / 0. No overflow at 390 or 1440. Mobile sheet, 11 captures: no overlap, and the 3-part phone bar (Booking.com, call, ˄) shows from capture 02. Forced `?light=force` at 390 and 1440: the canvas renders at full hero size, opacity ≈ 1, with 0 console errors. −1: 8 of 35 tap targets under 44 px, including the hero-card rating links "Google, 78" **74×18** and "Booking.com, 125 reviews" 121×38. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero button is above the fold (mobile-00 centred, desktop-00 centred). The floor switch puts a booking button inside every room accordion (mobile-03). −1: same as calm, the listing top rather than a room or dates. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order: moving garden + name + place + CTA → tagline + 4 fact cards (beach distance, breakfast, live dates, both ratings) → "Choose your floor" (rooms first, A/C truth per floor) → garden → amenities → breakfast with Fiona → Yelum → guests (12 reviews, drag row) → getting here / good to know → closing → footer. custom.md "richer in interaction": WebGL light on its own photograph, floor switch, digit roll, drag row. −2: the shared above-the-fold deduction (fact cards are on screen 01). |
| 5 | copy | 10 | 9 | 9.0 | Copy from `copy/en.json`, plain and specific. −1: the hero card reads "Google, 78" without "reviews", which is unclear next to "Booking.com, 125 reviews". |
| 6 | accessibility | 8 | 7 | 5.6 | axe at 390 and 1440: **2 serious, `aria-prohibited-attr`**. `span.num[data-roll="9.0"][aria-label="9.0 out of 10"]` and `[data-roll="4.9"]`: every digit column inside is `aria-hidden="true"`, and an `aria-label` on a role-less span is not reliably announced. A screen reader may get "/10 … /5" with no score, so the ratings are not dependable DOM text for assistive tech. The rest: 26 rule sets pass. Skip link → `#floors`. Visible 2 px outlines. 0 images without alt (17). Headings in order. Reduced motion: 1 canvas, hidden, photograph visible. 0 page errors. −1 for the small rating links. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **71.9** | |

### unique — "Under the net"

```
mode: quick        round: 1        variant: unique
total (dims 1–7): 72.7 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim. The intro paragraph joins tagline + `spot` + breakfast copy unedited. "From the roof down" labels restate `room_types[3]` (King: upstairs, 25 m², A/C) and the garden-floor copy. The chooser tiles "Garden room: fan, on the ground floor", "King Room: A/C, upstairs" = `room_types[].air_conditioning` + `room_types_note`. `stay/index.html` carries the same room facts. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json`: first load **741 KB**, 9 requests. JS 0 external (≈ 14 KB inline). Fonts 61 KB. Largest image 190 KB. **LCP 1,452 ms** (the slowest of the three, within 2.5 s). CLS 0.0006. Scroll CLS 0 / 0. No overflow. Mobile sheet, 16 captures: no overlap, and the bar ("Check dates" + "Choose a room" + call) shows from capture 01. Forced `?net=force`: 2 canvases render (hero 358×544 at 390, closing 350×126), 0 errors, and the photograph reads through the mesh (forced 390 capture). −1: 20 of 50 tap targets under 44 px (slideshow dots 22–34×44). |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero button is above the fold (mobile-00 at y≈767 under the net). "Choose a room" is a real link to `stay/`, which works with JS off. With JS, a panel opens. Tapping "King Room" showed "Check dates on Booking.com" on screen (y 565). "Not sure" leads to Yelum's words and Call. −1: the listing top, as in the other two. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order: net-over-balcony print + name + place + CTA → intro with spot and breakfast + dated ratings → "From the roof down" (roof / upstairs / garden) → King Rooms → garden rooms with fan notes → Fiona → Yelum / breakfast → roof → amenities → guests → getting here (gate print) → closing under a second net → footer. custom.md "bolder": WebGL cloth as the main item from its own photograph, with a still SVG drape without WebGL. −2: the shared above-the-fold deduction. |
| 5 | copy | 10 | 9 | 9.0 | Copy from `copy/en.json`, plain and specific. Interface labels are short and factual. −1: Fiona's review appears twice (Yelum/breakfast block and guests block, captures 08/09 and 12). |
| 6 | accessibility | 8 | 8 | 6.4 | axe at 390 and 1440: **0 violations**, 24 rule sets pass. Skip link → `#king`, with visible outlines. Chooser (390, keyboard): Enter on the bar's "Choose a room" opens a dialog, and focus lands on "Close" (`aria-label="Close"`, not the first tile as notes.md says). 20/20 Tabs stay inside, Esc closes it, and focus returns to "Choose a room". 0 images without alt (20). Reduced motion: 2 canvases, both hidden, photograph visible. −2: 20 small tap targets (dots). |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. `stay/` is a relative link. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **72.7** | |

### Facts table (claim → dossier key → result), all three variants

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Lotus Surf House" (wordmark, title, footer) | `business.name` | match |
| "Midigama, Sri Lanka"; "A guesthouse in Midigama, on the south coast of Sri Lanka." | `business.type` beach_lodging (guesthouse per guests and old listing), `location.address` | match |
| Midigama Beach 250 m (Booking.com) | `location.distance_to_beach` (Booking FAQ 250 m; its description says 300 m, and the copy names its source) | match |
| Breakfast included, 8 to 10 | `facilities[0]`, `stay_info.breakfast_hours` (owner reply) | match |
| Check-in at any hour; check-out 11:00–12:00 | `stay_info.check_in`, `.check_out` (Booking; Kayak contradiction resolved to the engine) | match |
| Cash only; children welcome; no cots or extra beds; pets on request, no charge; no parking | `stay_info.house_rules`, `.parking` | match |
| Booking.com 9.0/10 · 125 reviews · 3 Nov 2026 | `reviews.booking` (fetched 2026-11-03) | match |
| Google 4.9/5 · 78 reviews · 3 Nov 2026 | `reviews.google` (fetched 2026-11-03) | match |
| Shady garden on Indhana Road, hammock, ping-pong table under a thatched roof | `facilities[1]`, img-005 description, `location.address` | match |
| Every downstairs room opens onto the garden through its own terrace | `room_types[0–2].description` (terrace, garden views) | match |
| Standard Double or Twin, 2 single beds, sleeps 2, 20–25 m², fan, no A/C, no hot water | `room_types[0]`, `room_types_note` | match |
| Double or Twin, 2 single beds, sleeps 2, 25 m² | `room_types[2]` | match |
| Deluxe Queen, 1 large double, sleeps 2, 25 m², tiled floor, walk-in shower | `room_types[1]` | match |
| King Room with Balcony, 1 extra-large double, sleeps 2, upstairs, 25 m², A/C, hot water | `room_types[3]`, `business.recent_works` | match (the unverified hot tub is omitted) |
| "The standard rooms may not be the newest…" (Yelum) | owner reply, Booking review | match (verbatim) |
| "I strive every day to make my customers' holidays as wonderful as possible." | owner reply, Booking review | match (verbatim) |
| King Rooms upstairs are new; balconies into the trees | `business.recent_works` | match |
| Roof terrace, wooden table and chairs, Buddha on a pedestal with offerings | `facilities[2]`, img-021/022 descriptions | match |
| Amenities line (12 items, paid ones marked "additional charge") | `facilities[]`, `business.description` | match |
| Railway station 50 m; Ahangama Beach 1.4 km, Weligama Beach 4.2 km, Koggala Airport 9 km | `location.nearby` | match |
| Old name Yelum Guest House on Google | `business.former_names` | match |
| Indhana Rd, Midigama 80650, Sri Lanka | `location.address_site_form` (Google, coordinates removed) | match |
| +94 77 464 7541 / `tel:+94774647541` | `contact.phone` | match |
| Booking URL | `booking.engine_url` | match (character for character) |
| 12 testimonials, authors, country, source, month | `reviews` quote strings | match 12/12 verbatim on each page |

### The one sentence the human needs

All three pass dimensions 1–7 with no hard fail, the same facts, the same Booking.com and phone links, and every budget line met. They differ by:

| | first load | LCP | axe violations | named defect |
|---|---|---|---|---|
| calm | 617 KB | 1,016 ms | 1 | the roof row can't be scrolled by keyboard on a phone |
| interactive | 686 KB | 532 ms | 2 | the rolling 9.0 and 4.9 ratings are hidden from screen readers |
| unique | 741 KB | 1,452 ms | 0 | none |

**what the designer prompt got wrong:** Nothing in the designer prompt makes the first phone screen say what the business **is**. All three heroes carry only "Lotus Surf House / Midigama, Sri Lanka". For a guesthouse with no surf service, "Surf House" without "guesthouse" can be read as a surf school or camp, and playbook §2's "business type + place in one line, above the fold" was met on screen 01, not screen 00. A smaller, repeated miss: decorative motion is added without an accessibility check on its markup. Interactive puts `aria-label` on a role-less span and hides the rating digits. Calm turns the roof triptych into a phone scroll row with nothing focusable. The 4e hand-off check runs `audit-mockup` and `check-design` but not axe, so neither was caught.

**fix list (not gating at 4f; for the build, smallest first):**
1. **Interactive, dim 6:** give `span.num[data-roll]` `role="img"` (or render a visually hidden "9.0 out of 10" text node) so the ratings are announced.
2. **Calm, dim 6:** make `.three` focusable (`tabindex="0"` + a label) or stack it on the phone.
3. **Interactive, dim 2/5:** make the hero-card rating link read "Google, 78 reviews" and at least 44 px tall.
4. **All, dim 4:** put the type in the first phone screen (for example the tagline's "A guesthouse in Midigama" as the hero line), a template label rather than new copy.
5. **All, dim 7 (at build):** self-host the two font families.

## Round 1 — full (station 5)

critic 0.4.3 · rubric 0.3.1 · 2026-11-04 · build `sites/lotus-surf-house/final/dist/` (index.html 58,212 B, built 2026-11-04 15:29, designer 0.7.1, after SEO 4h and AI search 4i). I served it with a plain static server (`tools/_serve.mjs` on :8961) and stopped that server afterwards. I did not touch the user's `astro preview` on :8960. The page served on :8960 and the one on :8961 are both byte-identical to `dist/index.html` (`cmp`). I scored fresh against the rubric and the dossier, and I did not read any visual-critic or experience-critic report.

```
mode: full        round: 1        variant: calm ("The gate", revised to Alon's pick: his photos up top, the King Room first)
total (dims 1–7): 74.2 / 80      result: pass (critic's part)      hard_fails: []
dimension 8 (weight 25): not scored here; it belongs to visual-critic + experience-critic
```

Weights 1–7 sum to 80 (20 + 15 + 15 + 5 + 10 + 8 + 7), as noted at 4f, so the total is out of 80. Cheeky-monkey's scorecards write "/ 75" for the same sum.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | The facts table is below: **0 mismatches and 0 unsourced claims**. The 12 guest blockquotes each equal a `reviews.quotes[].text` (script, `critic-lotus-surf-house-r1/quotes.json.txt`). Eleven match exactly. Giada's matches once whitespace is collapsed: the dossier's `\r\n` line breaks render as spaces, and no word changes. All 12 have the right author, country, source (booking) and month. Yelum's two quotes are verbatim owner replies in the dossier. The ratings are 9.0/10 · 125 (Booking.com) and 4.9/5 · 78 (Google), both dated "3 Nov 2026" = `fetched_at` 2026-11-03. The rooms match `room_units[].facilities`, including the King's "Air conditioning, fan, mosquito net". The JSON-LD (4h/4i) also matches the dossier: geo = `location.lat_lng`, the four rooms with beds and m², `checkoutTime` 12:00 (the end of 11:00–12:00), `knowsLanguage` en = `languages_spoken`, and no `aggregateRating`. llms.txt matches the page. `audit.json.facts`: 27 numbers on the page, and the 2 not in the copy are "9.0" (the rating) and "2026." (the read date). Gaps are omitted, not filled: price (live Booking inventory), WhatsApp, email and the hot tub. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `critic-lotus-surf-house-r1/audit.json` (throttled 390×844, 1.6 Mbps / 150 ms / 4× CPU, no scroll). **First load 883 KB** (903,716 B) in 13 requests: HTML 58.2 KB with CSS and JS inline, fonts 57.0 KB, images 788.5 KB. **0 external JS.** The largest image is **228 KB** (img-019, the gate). **LCP 484 ms, CLS 0.** Scroll CLS is **early 0.0018 / settled 0**: one shift from `h1.script` at 840 ms, under 0.01. There is no horizontal overflow at 320, 360, 390 or 1440 (`a11y.json`: scrollWidth = clientWidth). From mobile-02 on, the phone bar shows "Check dates on Booking.com" plus a call button. −1, two small issues: (a) 20 of 41 tap targets are under 44 px (the slideshow dots are 24×44, and each slideshow also has 44 px arrows); (b) mobile-01: the header wordmark, white and transparent, is fixed, and while the hero scrolls under it the wordmark sits over the hero's "Call +94 77 464 7541" pill. The two texts overlap for that stretch of scroll. |
| 3 | booking CTA | 15 | 9 | 13.5 | **`funnel/lotus-surf-house-r1/funnel.json`:** `primary_action` and `hero_action` are both **engine** ("Check dates on Booking.com", top 696 of 844, 350×54), with `clicks_to_flow` 0. `clicks_to_book` is **1**, which equals `recommended.clicks_to_book` 1, and the class equals `recommended.primary_action` engine. The CTA is above the fold, on 1 page, with 0 broken links. Tap-through at 390 with touch: `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html`, which is `booking.engine_url` character for character. All 9 Booking links are that URL. All 6 `tel:` links are `tel:+94774647541` = `contact.phone`. With JS off (`a11y.json`), the 9 booking links and 6 tel links are all present, and the first booking link is at the top of the page at both widths. −1: the action lands on the top of the listing, without room, dates or guests. The dossier records no deep-link parameters, so this is a documented gap. |
| 4 | brand fit | 5 | 8 | 4.0 | The 4f deduction is fixed. **mobile-00** now shows the gate, "Lotus Surf House", "A guesthouse in Midigama, on the south coast of Sri Lanka.", "Check dates on Booking.com" and "Call", so type, place and CTA are above the fold. The order follows Alon's revision: gate → King Rooms (img-002 full-bleed, then img-025 with facts and Book / Call, then the 4-photo strip) → roof (img-021) → ratings and glance → garden → three garden rooms (fan / no A/C / no hot water, stated plainly per `recommended.offer_framing`) → Yelum and breakfast → guests → getting here and good to know → closing → footer. Calm brief: no canvas, no video, one CTA in the hero. −2: `recommended.above_fold` also lists spot, included and trust. "Midigama Beach 250 m", "Breakfast included" and the two ratings first appear on mobile-05 (desktop-04), after the King band and the roof. This is the human-approved order, reported as a fact. |
| 5 | copy | 10 | 9 | 9.0 | Every sentence comes from `copy/en.json` (passed 4c) or is a short restatement of a dossier fact. English is complete. The copy is plain and specific: m², beds, fan / A/C / hot water per room, cash only, and distances with their source. The 4f duplicate is gone: Fiona's review now appears once (Guests). −1: check-in is said three times within a few screens. "Check-in at any hour" is under the King buttons (mobile-03), "Check-in any hour" is in the glance line (mobile-05), and "Check-in at any hour, day or night" is in Good to know. |
| 6 | accessibility | 8 | 9 | 7.2 | axe-core 4.x (WCAG 2.0/2.1 A + AA), run after a full scroll with third-party requests blocked: **0 violations at 390 and at 1440**, 24 rule sets pass. The 4f `scrollable-region-focusable` on the roof row is gone. The only incomplete item is `color-contrast` over photos (7 / 3 nodes). I sampled those by hiding the text and measuring the photo behind each box (`contrast.json`). The median background contrast is ≥ 6.88:1 for every white text over a photo: hero name 9.4, hero line 11.5, King title 6.88 (large), King line 9.25. Keyboard: the first stop is "Skip to the rooms" at both widths. There are 42 tab stops at 390 and 44 at 1440, and all show a 2 px solid outline. At 390, 0 are invisible. At 1440, the header nav and "Check dates" reach full opacity on focus within 500 ms. There is no drawer, so there is no trap. 0 of 18 images lack alt. Headings run H1 → H2/H3 in order, and `lang="en"` is set. Reduced motion: 0 running animations, 0 video, 0 canvas. −1: the slideshow dots are 24×44 px. That meets WCAG 2.5.8 but not playbook §4's 44 px. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static output only: `dist/` holds `index.html`, `llms.txt`, `robots.txt`, 21 WebP files and 2 self-hosted woff2 fonts with their OFL texts. There is no `.js`, `.php` or worker file. **0 third-party requests on first load** (`third_party_hosts` []) and **0 attempted over a full scroll** at 390 and 1440 (`a11y.json` `external_attempted` []). There are 0 iframes, so 0 of the 2 allowed embeds. There is no CMS call. No `src`, `href` or `srcset` starts with `/`, and every filename is lowercase. I found 0 hits for localhost, key, token, secret or password in `index.html` and `llms.txt`. As a preview build it carries `noindex, nofollow`, and robots.txt says `Disallow: /` for `*` and for the named AI crawlers. `check-design`: 0 problems and 0 warnings. |
| | **total 1–7** | 80 | | **74.2** | |

**Hard fails: 0.** None of these applies:
- facts: 0 mismatches.
- CTA landing: the URL and phone are exact.
- primary-action class: engine, as recommended.
- third-party requests: 0 on load and 0 over a scroll.
- CMS dependency: none.
- keyboard trap: none.
- content only in canvas or video: none.
- budgets: every line is met.
- secrets: none.
- borrowed or stock images: none. All 18 drawn photos are `business-owned` Booking.com uploads.
- the two visual-media lines: no video has a usable licence (vid-001/002/003 are `license: unknown`), and no photo is ≥ 1920 px (the maximum is 1600).

**Pass thresholds (full), critic's part:**
- No hard fail ✓
- Dimensions 1–7 each ≥ 6 ✓ (the lowest is 8)
- Every playbook §4 budget line is met ✓
- The total of ≥ 85 depends on dimension 8. The rule that both visual critics must give ≥ 8 is pending; I have not read their reports.

### Facts table (claim → dossier key → result)

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Lotus Surf House"; "A guesthouse in Midigama, on the south coast of Sri Lanka." | `business.name`, `business.type` (guesthouse per the old Google listing and guests), `location.address` | match |
| King Room with Balcony: 1 extra-large double bed, sleeps 2, upstairs, 25 m², A/C, fan, mosquito net, hot water; "new, balconies into the trees" | `room_types[3]`, `room_units[]` King facilities, `business.recent_works` | match (the unverified hot tub is omitted) |
| Standard Double or Twin: 2 single beds, sleeps 2, 20–25 m², garden view, fan + mosquito net, no A/C, no hot water | `room_types[0]`, `room_units[]`, `room_types_note` | match |
| Double or Twin: 25 m²; Deluxe Queen: 1 large double, 25 m², tiled floor, walk-in shower | `room_types[2]`, `room_types[1]` | match |
| Check-out 11:00–12:00; check-in at any hour; cash only; children welcome, no cots or extra beds; pets on request, no charge; no parking | `stay_info.check_out`, `.check_in`, `.house_rules`, `.parking` | match |
| Breakfast included, 8–10 | `facilities[0]`, `stay_info.breakfast_hours` (owner reply) | match |
| Booking.com 9.0/10, 125 reviews, 3 Nov 2026 · Google 4.9/5, 78 reviews, 3 Nov 2026 | `reviews.booking`, `reviews.google` | match |
| Midigama Beach 250 m (Booking.com); station 50 m; Ahangama Beach 1.4 km, Weligama Beach 4.2 km, Koggala Airport 9 km ("Booking.com lists") | `location.distance_to_beach`, `.distance_to_station`, `.nearby` (Booking surroundings) | match (Booking's description says 10 km for the airport. The page cites the surroundings list, which says 9 km) |
| Garden, hammock, ping-pong under a thatched roof; terraces downstairs; roof terrace, table and chairs, Buddha with offerings | `facilities[1–2]`, `room_types[*].description`, img-005/020/021/022 | match |
| Yelum's two quotes | owner replies in `reviews` | match (verbatim) |
| Old name Yelum Guest House | `business.former_names` | match |
| Indhana Rd, Midigama 80650, Sri Lanka | `location.address_site_form` (Google) | match |
| +94 77 464 7541 / `tel:+94774647541` | `contact.phone` | match |
| Booking URL (9×) | `booking.engine_url` | match, character for character |
| Google Maps `place_id:ChIJBR_cQfoV4ToRQhXcrYmPyU0` | `contact.socials.google_maps` (`19sChIJBR_…`) | match |
| 12 amenities (4 marked "additional charge") | `facilities[]`, `business.description` | match |
| 12 testimonials | `reviews.quotes[]` | 12/12 verbatim, 12/12 attribution |
| JSON-LD geo 5.9652192, 80.3922802; rooms; checkoutTime 12:00; knowsLanguage en | `location.lat_lng`, `room_types[]`, `stay_info.check_out`, `languages_spoken` | match |
| 18 photos, alts | `images[]` (all `business-owned`); alts written from each photograph and consistent with the dossier descriptions | match (img-008 "A new bathroom" sits in the King strip. The dossier says "new bathroom" with no room tag, and the alt does not claim the King) |

### Playbook §4 budget, measured

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (no video) | ≤ 1.5 MB | 883 KB (903,716 B, 13 requests) | ✓ |
| Hero video | ≤ 2 / 4 MB | none (no licensed video) | n/a |
| JS, compressed | ≤ 300 KB | 0 external; ≈ 1 KB inline | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 228 KB | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families (Parisienne, Hanken Grotesk), 57.0 KB, self-hosted | ✓ |
| LCP | ≤ 2.5 s | 484 ms | ✓ |
| CLS | < 0.1 | 0 (scroll early 0.0018, settled 0) | ✓ |
| Third-party requests on load | 0 | 0 (0 over a full scroll at both widths) | ✓ |

### Network log, first load (390, throttled)

All 13 requests go to the local host:
- HTML: 58,212 B
- 2 woff2 fonts: 56,996 B
- images: 788,508 B. That is the gate at 228 KB, plus the King band, strip and roof photos that sit inside Chromium's lazy-load margin.

`third_party_hosts: []`.

### Screenshots (`tools/shoot.mjs` into a scratch folder, deleted after the round; 1440 × 900 ×11 and 390 × 844 ×13, page 8,558 / 9,818 px)

- `mobile-00`: the carved gate under leaves, full height. The script "Lotus Surf House", the white line "A guesthouse in Midigama, on the south coast of Sri Lanka.", a brick-red "Check dates on Booking.com" and an outlined "Call +94 77 464 7541" sit in the lower third. There is no bottom bar.
- `mobile-01`: img-002, the King bed under its net, with "Upstairs / The King Rooms" and the line. At the top, the fixed white wordmark overlaps the hero's Call pill as it scrolls under (fix 1).
- `mobile-02–03`: img-025, the balcony, then the King facts, Book / Call, "Check-out 11:00–12:00 | Check-in at any hour | Cash only", and the 2×2 strip. The phone bar is visible from here on.
- `mobile-04`: the roof, with img-021 (the Buddha), "Up on the roof", img-022 and img-004.
- `mobile-05`: the 9.0/10 and 4.9/5 cards, then the glance line and "In the garden".
- `mobile-06–08`: the garden photo, Yelum's quote, the garden-room slideshow and the three rooms with fan / no A/C.
- `mobile-08–09`: img-032, the veranda, with Yelum and Breakfast.
- `mobile-09–10`: Guests 1/12 (Fiona), the dots and "Read all 125 reviews on Booking.com".
- `mobile-10–12`: Getting here, the amenities, Maps / Call, Good to know, the closing script line with Book / Call, and the footer.
- `desktop-00`: a split. The name, line and buttons are on white at the left, and the gate is at the right.
- `desktop-01`: img-002 full-bleed with "The King Rooms".
- `desktop-02–03`: img-025 with the facts, then the strip.
- `desktop-04`: the roof and ratings.
- `desktop-05–06`: the garden and the rooms.
- `desktop-07`: Yelum.
- `desktop-08`: Guests.
- `desktop-09–10`: Getting here, the closing and the footer.

**what the designer prompt got wrong:** Little. Every 4f item for calm was fixed and measured:
- the type line is in the first phone screen;
- the roof row no longer fails axe;
- the duplicate review is gone;
- the fonts are self-hosted.

Two things remain, and both are general. (1) The designer's hand-off check has no item for a **fixed transparent header passing over hero content while it scrolls**. The white wordmark sits on top of the hero's own Call button between first and second screen. A "shoot at the hero's bottom edge" capture would catch it. (2) `recommended.above_fold` (spot, included, trust) and a human-reordered page can conflict. Here the human's King-first order pushes the beach distance, breakfast and ratings to screen 5 on a phone. Nothing in the prompt tells the designer to carry the auditor's above-the-fold facts into the hero band when the order changes. One short line under the hero buttons would do it, for example the existing glance line.

**fix list (not gating; smallest first):**
1. **Dim 2:** stop the fixed header's wordmark from overlapping the hero's Call pill while it scrolls under it (mobile-01). Options: give the header its solid ground earlier, or hide the wordmark until the hero name has left the screen.
2. **Dim 5:** say "check-in at any hour" once or twice, not three times (the King stay line, the glance line, Good to know).
3. **Dim 6 / 2:** make the slideshow dots 44 px wide, or take them out of the tab order (the arrows already move the slides).
4. **Dim 4:** move the glance line (Midigama Beach 250 m · Breakfast included, 8–10) and/or the ratings into or just under the hero band, inside Alon's order.
5. **Dim 3 (documented gap):** the Booking.com hand-off carries no room, dates or guests.

### Evidence files

- `reports/2026-10-midigama-01/critic-lotus-surf-house-r1/audit.json`: `tools/audit-mockup.mjs lotus-surf-house ../final`, moved here. The designer's `final/audit.json` was restored byte-identical (`cmp`).
- `reports/2026-10-midigama-01/critic-lotus-surf-house-r1/a11y.json`: holds four passes:
  - axe at 390 and 1440, with the Tab stops, overflow, external requests attempted over a full scroll and page errors;
  - overflow at 320 and 360;
  - JS off at 390 and 1440;
  - reduced motion.
- `reports/2026-10-midigama-01/critic-lotus-surf-house-r1/contrast.json`: white text over photos, with the background sampled with the text hidden. It also holds the first six Tab stops after a fresh load.
- `reports/2026-10-midigama-01/critic-lotus-surf-house-r1/quotes.json.txt`: the verbatim and attribution check of the 13 blockquotes.
- `reports/2026-10-midigama-01/funnel/lotus-surf-house-r1/funnel.json`: `tools/funnel.mjs http://localhost:8961/ --depth 3`.

## Verification 1 — full

critic 0.4.3 · rubric 0.3.2 · 2026-11-06 · live preview `https://lotus-surf-house.os1.workers.dev/`. This is a verification, not a scored round. All 28 files in `sites/lotus-surf-house/final/dist/` are byte-identical to what the Worker serves (`cmp` per file; `/index.html` answers 307 to `/`, so the page was compared at `/`). The source changed since round 1 only through commit 639883d, the forecast (`content.json`: `forecast` null → the block; nothing else in the content). The dossier and `copy/en.json` have not changed since 2026-11-03. I did not read any visual-critic or experience-critic report.

```
mode: full (verification)        variant: calm ("The gate") + Rosa forecast for Lazy Left
total (dims 1–7): 72.8 / 80      result: pass (critic's part)      hard_fails: []
dimension 8 (weight 25): not scored here; it belongs to visual-critic + experience-critic
```

At dimension 8 = 8/10 from both visual critics, rubric 0.3.2 would give (72.8 + 20) × 100 ÷ 105 = 88.4. That is arithmetic only; I have not seen their scores.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | **0 mismatches, 0 unsourced claims.** 12/12 guest quotes are verbatim and 12/12 attributions match on author, country, source and month (`quotes.txt`). Giada's differs only by the dossier's `\r\n` rendered as spaces. Yelum's line is split by "Yelum says" with no word changed. Booking and phone hrefs, ratings, address and geo were re-checked by script against the dossier (`facts.json`). The room, amenity and distance rows are carried from round 1's table because their content did not change. Forecast: the block names Lazy Left only in "Forecast for Lazy Left by Rosa", "See today's forecast for Lazy Left on Rosa" and the widget title; the only other "lazy left" on the page is Giada's review. "In front of" appears 0 times, and it is not in the JSON-LD. The headline equals the JSON field by field (table below). |
| 2 | mobile + performance | 15 | 9 | 13.5 | Live, throttled 390 (`site-check.json`): **first load 871,407 B in 13 requests, LCP 504 ms, CLS 0, 0 external JS, 0 third-party.** Local plain server (`audit.json`): 914,800 B uncompressed, LCP 540 ms, largest image 228,380 B, fonts 56,996 B, scroll CLS early 0.0018 / settled 0. No horizontal overflow at 320, 360, 390, 768, 1024 or 1440 with the block loaded (`page-checks.json`). −1, unchanged from round 1: 20 of 43 tap targets are under 44 px (slideshow dots 24×44), and on shared `mobile-01` the fixed wordmark still prints over the hero's Call pill as it scrolls under. |
| 3 | booking CTA | 15 | 9 | 13.5 | `funnel/funnel.json` on the live URL: `primary_action` and `hero_action` both **engine**, `clicks_to_book` **1**, `clicks_to_flow` 0, above the fold, 0 broken; equal to `recommended` (engine, 1). A touch tap on the hero button at 390 navigates to `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html`, the dossier URL character for character (the response was stubbed; see "Not tested"). JS off: 9 Booking links and 6 `tel:+94774647541`. The Rosa links are not read as booking actions. −1, as round 1: the hand-off carries no room, dates or guests (documented gap). |
| 4 | brand fit | 5 | 8 | 4.0 | Type, place and CTA are on the first phone screen. −2, unchanged: `recommended.above_fold` spot, included and trust start on phone screen 5, in Alon's approved order. The forecast helps the "which wave, when" question but sits at the end of "Getting here", about four fifths down the page. No season is stated, and none is sourced. |
| 5 | copy | 10 | 9 | 9.0 | The forecast's words are plain and specific, with no surf clichés and no claim on the break. The rest comes from the passed copy. −1, unchanged: check-in is said three times (King stay line, glance line, Good to know). |
| 6 | accessibility | 8 | 9 | 7.2 | axe-core 4.10.2 (WCAG 2.0/2.1 A + AA) on the live page after a full scroll with the block loaded: **0 violations at 390 and 1440**, 27 rule sets pass. Run with `iframes: false`, so the inside of Rosa's frame is not audited. Incomplete: `color-contrast` over photos only, sampled in round 1 (`critic-lotus-surf-house-r1/contrast.json`), not re-sampled; those photos did not change. Forecast text on the tint card: 11.36:1 (ink), 5.68:1 (muted, including the 13.5 px update line). Keyboard: credit link → widget → next CTA, and back; **no trap**. The widget draws its own blue focus line inside the frame, visible mainly along its bottom edge (`focus-1440`); that is Rosa's. The iframe has a `title`. The credit link is 218×48 on the phone. Reduced motion: 0 running animations, widget still loads. −1, unchanged: slideshow dots 24×44. |
| 7 | security + delivery | 7 | 8 | 5.6 | Static only: 28 files, all lowercase, no root-relative URLs, no secrets by grep, no CMS call. `notes.md`, `audit.json`, `package.json`, `.env`, `wrangler.jsonc` and `src/tenant/content.json` answer 404 live. `noindex, nofollow`, robots `Disallow: /`, no sitemap. **0 third-party requests on first load** at 390 and 1440 and with JS off. 1 of 2 embeds. −2: **when the widget's frame fails or is refused after its HEAD succeeds, the box stays empty and the plain link is hidden** (forecast check below). A visitor would notice it on that failure path; booking is not affected. |
| | **total 1–7** | 80 | | **72.8** | Round 1 was 74.2. The whole drop is dimension 7 (−1.4). |

**Hard fails: 0.** Facts, CTA landing, primary-action class, third-party on first load, CMS dependency, keyboard trap, canvas-only content, budgets and secrets were tested today. The image and video lines are unchanged from round 1 because the photos and dossier did not change: no video with a usable licence, no photo ≥ 1920 px, all drawn photos `business-owned`.

**Pass thresholds (full), critic's part:** no hard fail ✓ · dimensions 1–7 each ≥ 6 ✓ (lowest 8) · every playbook §4 budget line met ✓ · total ≥ 85 and both visual critics ≥ 8: pending dimension 8.

### Rosa forecast (hard constraint 9, playbook §4)

| check | result | evidence |
|---|---|---|
| Spot id | **Id correct; mapping not where the rule says.** `lazy-left` in the JSON URL, the widget's `spot=` and the spot link; Rosa's own `spot.id` / `name` / `town` = lazy-left / Lazy Left / Midigama. It is in Rosa's index, nearest of 4,000 spots to the Google pin at **293 m** (Rams 329 m, Lazy Right 485 m). The dossier's `location.spot` names Lazy Left, as guests' words. | Rule 9 wants the mapping in `concepts.md`, which still says "Forecast: no" with no mapping (lines 104, 197, 270, 361). The decision is recorded in `final/notes.md`, `activity.jsonl` (2026-11-04) and the seed script. Not deducted; the human chose this. |
| Headline only, no day-by-day | ✓ | "0.9–1.4 m · Friday 6 November, 20:30 · Swell 16.6 s from the south · Wind 5.1 km/h from the north, offshore · Rosa, updated 6 November 2026, 19:56" = `current.h` [0.9, 1.4], `current.t` 20:30+05:30, first in-window swell 16.6 s / 201°, wind 5.1 kph / 352° / offshore, `generated_at` 14:26:34Z. |
| Widget is Rosa's, unmodified | ✓ | All attributes equal the snippet in `agents/designer/tools.md` (`theme=light`, `units=metric`, 100% × 500, style, lazy, referrerpolicy, sandbox). Filter, transform, clip and blend none, opacity 1. No overflow inside the frame at 280, 320, 350 and 420 px wide. `elementFromPoint` = IFRAME in the box; only the phone's booking bar passes over the frame's lower part while scrolling, as over everything else. A click opens `rosa.surf/spot/lazy-left` in a new window, as Rosa ships it. |
| Nothing on first load | ✓ | 0 Rosa or other third-party requests in 13 first-load requests, 390 and 1440. First request fires when the block is within 400 px (seen at 305 px and 398 px below the screen, walking in 200 px steps). |
| One JSON request plus the frame | ✓ **plus one HEAD** | The page makes 1 GET to the JSON, 1 HEAD to the widget, then the frame. The second JSON GET, Inter, the tiles and the favicon come from inside the frame (attributed per frame in `page-checks.json`). The HEAD is one more than the rule's wording; same as Coconut's scorecard; not deducted, listed for the prompt. |
| Space reserved, arriving | ✓ | Section height unchanged and CLS 0 at 320, 360, 390, 768, 1024 and 1440. Card and box 350×340 + 350×500 at 390, 420×500 each at 1440. Longest values I could construct (10.5–12.5 m, "Wednesday 30 September", 110.4 km/h from the north-west, cross-shore) do not clip at 320–1440. |
| JS off | ✓ | Only the link, in the 350×500 / 420×500 box; 0 third-party requests; tap lands on `rosa.surf/spot/lazy-left`. |
| JSON blocked, 500, malformed, no `current`, 30 h stale, 3 h in the future, hanging | ✓ with a note | Plain link shown, no numbers, no widget request, CLS 0, height unchanged, and the link is really tappable (touch at 390, click at 1440). 23 h old still draws, with the update time shown. **Note:** when the failure arrives with the block on screen, the headline's box stays reserved and blank: 420×500 of white beside the link on desktop, 360 px of white above it on a phone. Failing while still below the screen drops the box (`.solo`; 1984 → 1624 px at 390, CLS 0). Blank space, not a visible empty box; not deducted on its own. |
| Widget blocked entirely (HEAD and frame) | ✓ | Headline stays, the plain link shows in the box and is tappable, CLS 0. |
| **Frame fails or is refused after the HEAD succeeds** | **✗ defect** | Three simulated cases at 390 and 1440: frame request aborted, frame 500, frame answered with `frame-ancestors 'none'`. `load` fires anyway, so the block goes `.on`: the link is hidden and the box is empty (blank white with aborted and refused; the error body shows with the 500). CLS stays 0, and the credit link on the headline card still reaches Rosa. Playbook §4: "never an empty box"; rule 9: a plain link on failure. A HEAD cannot see a framing refusal. Same gate in `sites/layday-surf-ahangama/final/src/scripts/site.js` (read, not run). `tools/site-check.mjs` does not test this, which is why it passes. |
| `shoot.mjs` waited | ✓ with one unexplained capture | It waits on `data-loading`, which both halves set. Shared `mobile-12` (15:30 UTC) shows the headline with the **plain link in the widget box**, while the same run's desktop shows the widget. Not reproduced: the widget came up in all 17 runs where I recorded it, and on my own `shoot.mjs` pass (`mobile-12`). I cannot tell whether that capture was a slow load or a failed one. |

Slow phone, 3 runs (1.6 Mbps, 150 ms, 4× CPU): widget up 1,447–1,553 ms after reaching the block, under the page's 10 s limit, CLS 0.

Two facts for the human, Rosa's side, not the site's:
- The headline says "from the south" (201°), correct for the first in-window swell. The widget's 18:00 row beside it says "16s SSE", while the JSON's 18:30 hour has 8.5 s from 157° and 16.8 s from 200°. The two read slightly differently side by side.
- The headline shows Rosa's `current.t`, which was about 6 h behind the clock during the test (data 6.8 h old, within 24 h). It is labelled with its time and never called "now".

### Playbook §4 budget, measured live

| Item | Target | First load (no scroll) | With the embed loaded | |
|---|---|---|---|---|
| Transfer | ≤ 1.5 MB | 871,329–871,407 B, 13 requests | 1,065,366 B: + 122,225 B embed + 71,812 B own lazy photos near the block | ✓ |
| JS, compressed | ≤ 300 KB | 0 external; 8,760 B inline before compression, inside 19.7 KB of HTML | + the widget's inline script, inside a 7.9 KB document | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 228,380 B | unchanged | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families, 57 KB, self-hosted | 106 KB; Rosa's Inter (49 KB) is a third family, **inside Rosa's frame** | ✓ |
| LCP | ≤ 2.5 s | 504 ms | unchanged | ✓ |
| CLS | < 0.1 | 0; scroll 0.0018 / 0 | 0 | ✓ |
| Third-party on load | 0 | 0 | outside this count per §4's exception | ✓ |
| Embeds | ≤ 2 | 0 loaded | 1 | ✓ |

Fonts line: I did not count Inter against the page, as Lavish Haven's scorecard did not ("Rosa's Inter loads inside Rosa's frame") and because the widget may not be changed. Read strictly, §4's "every budget line with both embeds loaded" would count it; that wording is for the human.

### Facts table: forecast rows (all other rows as round 1, content unchanged)

| Claim on the page | Source | Result |
|---|---|---|
| "Forecast for Lazy Left by Rosa" → `rosa.surf/spot/lazy-left` (200, title "Lazy Left surf forecast - Midigama, Sri Lanka \| Rosa") | Rosa `spot`; `location.spot` (guests) | match; no claim that it is the business's break |
| Height, time, swell, wind, update time | Rosa JSON, live | match, field by field |
| llms.txt "Forecast for Lazy Left by Rosa" | same | match |
| JSON-LD | no forecast or break in it | match |

**what the designer prompt got wrong:** The port treats a successful HEAD plus a frame `load` as proof that the widget is showing. A cross-origin frame fires `load` for an aborted, failed or refused document too, so the one failure the HEAD cannot see ends in an empty box with the link hidden. Neither the designer's checks nor `tools/site-check.mjs` block the frame on its own: they block everything, which passes. Separately, the forecast was added by a human decision after critique without a line in `concepts.md`, so rule 9's "mapping recorded in `concepts.md`" cannot be met as written.

**fix list (not gating; smallest first):**
1. **Rule 9, process:** record `lazy-left` and Alon's decision in `concepts.md` §3, replacing "Forecast: no".
2. **Dim 5:** say "check-in at any hour" once or twice, not three times.
3. **Dim 6 / 2:** make the slideshow dots 44 px wide, or take them out of the tab order.
4. **Dim 2:** stop the fixed wordmark printing over the hero's Call pill while it scrolls under (`mobile-01`).
5. **Forecast, blank space:** when the JSON fails with the block on screen, let the link fill the reserved space rather than leave half of it blank.
6. **Dim 7, forecast:** make the plain link survive a failed or refused frame. For example, keep the link visible outside the frame's box, or show the frame only on a positive sign that the widget rendered. Add a frame-only failure case to `site-check`.
7. **Dim 4:** move the glance line or the ratings into or just under the hero band, inside Alon's order.
8. **Dim 3 (documented gap):** the Booking.com hand-off carries no room, dates or guests.

### Not tested

- **Real phones and browsers.** Everything ran in headless Chromium. Safari, Firefox and a real device were not tried, so frame `load` behaviour on a refusal is Chromium's.
- **Real Rosa outages.** The failure paths are simulated by intercepting requests in my own browser. Nothing at Rosa failed.
- **A frame slower than 10 s.** The timeout was tested for the JSON (hanging) only. For the frame I read the code but did not run it.
- **The Booking.com listing today.** A plain request got 202 with no content, and tap-through responses were stubbed. The ratings are checked against the dossier (read 2026-11-03), not the live listing. Google Maps answered 200; its content was not read.
- **Inside Rosa's widget.** Its own accessibility, swipe between days, and whether its row labels are right.
- **Screen reader.** Not run; axe and the Tab pass only.

### Evidence files

Under `reports/2026-10-midigama-01/critic-lotus-surf-house-v1/`:
- `audit.json`: `tools/audit-mockup.mjs` on `dist/`, run from a scratch root so the designer's `final/audit.json` was not touched.
- `site-check.json`: `tools/site-check.mjs` acceptance on the live URL: PASS, video skipped.
- `funnel/funnel.json`: `tools/funnel.mjs --depth 3` on the live URL.
- `rosa-forecast.json`: normal path at six widths, slow phone, JS off, 12 failure paths at two widths, below-screen failure, trigger distance.
- `page-checks.json`: requests per frame and embed bytes, a `shoot.mjs`-style walk ×3, fallback tap, axe, keyboard, overflow, JS off, reduced motion, tap-through, widget click.
- `forecast-worstcase-focus.json`: longest values in the card; widget focus (computed outline plus pixels with and without focus).
- `facts.json`, `quotes.txt`: hrefs, numbers, text not in the copy, JSON-LD, grep results; quotes and attribution.

Screenshots stayed in scratch and are described above: `shots/` for `ok-*`, `json_blocked-*`, `widget_refused_csp-*`, `focus-*`; the shared `verify-1-lotus-surf-house/shots/` was only read. `check-design`: 0 problems, 0 warnings; display face Parisienne, body Hanken Grotesk, white ground, 0 all-caps labels, 0 labelled headings.

## Verification 2 — full

critic 0.4.3 · rubric 0.3.2 · 2026-11-09 · live preview `https://lotus-surf-house.os1.workers.dev/`, after the designer fix round and the copyeditor's "Fix round 2026-11-09". This is a verification, not a scored round. `index.html`, `llms.txt`, `robots.txt`, the 21 WebP files and the 2 fonts the Worker serves are byte-identical to `sites/lotus-surf-house/final/dist/` (`cmp`, 25 files plus the page). I scored the whole page against the rubric and the dossier before I read the Verification 1 section. I did not read any visual-critic or experience-critic report.

```
mode: full (verification 2)        variant: calm ("The gate") + Rosa forecast for Lazy Left, own section #surf
total (dims 1–7): 73.4 / 80      result: pass (critic's part)      hard_fails: []
dimension 8 (weight 25): not scored here; it belongs to visual-critic + experience-critic
```

If both visual critics give dimension 8 an 8/10, rubric 0.3.2 gives (73.4 + 20) × 100 ÷ 105 = 89.0. That is arithmetic only: I have not seen their scores.

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | **0 mismatches, 0 unsourced claims** (facts table below). Each of the 13 guest blockquotes (12 in Guests, plus Giada in #surf) is a substring of a `reviews.quotes[].text`. Eleven match raw. Giada's two match once the dossier's line breaks are collapsed (`quotes-check.json`). Author, country, Booking.com and the month match for all 13. Yelum's two quotes are verbatim owner replies. The new King proof line reads "9.0/10 Booking.com, 125 reviews \| 4.9/5 Google, 78 reviews \| read 3 Nov 2026", which matches `reviews.booking` / `reviews.google` (`fetched_at` 2026-11-03). The copyeditor's count fix is live. "Lazy Left is the Rosa spot nearest the house.": I recomputed it from Rosa's `data/index.json` today. Lazy Left is 293 m from `location.lat_lng`, nearest of 4,000 spots (Rams 329 m, Lazy Right 485 m). The forecast headline equals the live JSON field by field (forecast table). JSON-LD and llms.txt hold only dossier facts: geo, the 4 rooms, `checkoutTime` 12:00, `knowsLanguage` en = `languages_spoken`, no `aggregateRating`. The page claims no break, no "in front of" and no walking time. The gaps (price, WhatsApp, email, hot tub, season) are omitted, not filled. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json` (`tools/audit-mockup.mjs` on a scratch copy of `dist/`, throttled 390×844, 1.6 Mbps / 150 ms / 4× CPU, no scroll): **first load 919,007 B (897 KB) in 13 requests from 1 host**: HTML 73,503 B (CSS and JS inline), fonts 56,996 B, images 788,508 B. **0 external JS. Largest image 228,380 B. LCP 468 ms. CLS 0.0018. Scroll CLS early 0.0018 / settled 0**: one shift, `h1.script` at 835 ms. Live Worker, compressed: 872,763 B in 13 requests (`bytes-live.json`). No horizontal overflow at 320, 360, 390 or 1440 (`a11y.json`). The phone header now scrolls away with the hero. Shared `mobile-01` shows the Call pill with no wordmark over it, and no band at the top of later screens. −1: **a forecast failure that arrives while the block is on screen moves the plain link.** With the JSON stale (30 h) or hanging until the 10 s timeout, `.fc-link` jumps from the card's bottom row (y 356, 48 px high) to fill the whole card (y 150, 254 px). Layout-shift API: **0.0659 at 390, 0.0126 at 1440** (`forecast-onscreen-stale.json`). Nothing outside the card moves. Playbook §4: "nothing shifts when it arrives, fails, or is refused". |
| 3 | booking CTA | 15 | 9 | 13.5 | `funnel/funnel.json` (live URL, `--depth 3`): `primary_action` and `hero_action` are both **engine**, "Check dates on Booking.com", top 696 of 844, 350×54. `clicks_to_book` **1**, `clicks_to_flow` 0, 0 broken. That equals `recommended` (engine, 1), and `booking_flow` is not set. `audit.json.booking.tapped` = `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html` = `booking.engine_url`, character for character. All 9 Booking links on the page are that URL. All 6 `tel:` links are `tel:+94774647541` = `contact.phone`. JS off at 390: the hero Booking link is in the first screen (top 624) and its href is the same. The phone bar keeps Book and Call on every screen after the hero (shared `mobile-02`–`14`). −1: the hand-off lands on the top of the listing, with no room, dates or guests carried over. The dossier records no deep-link parameters, so this is a documented gap. |
| 4 | brand fit | 5 | 8 | 4.0 | The first phone screen (shared `mobile-00`) carries the type, the place and both actions. The playbook §3 content is present: rooms floor by floor with fan / A/C / hot water, ratings, the garden, the host, breakfast, reviews, location, Good to know, the closing and the footer contact. The forecast is now its own section with a "Surf" nav item, which answers "which wave, when". The calm brief holds: no canvas, no video, no motion beyond the settle. −2: (a) `recommended.above_fold` also lists spot, included and trust. Beach distance, breakfast and the ratings first appear on phone screen 4–5 (shared `mobile-03` and `mobile-05`), and the spot near the end. That is Alon's gate-b order, reported as a fact and not re-litigated. (b) Playbook §6 asks for each review "with … link". The 12 Guests quotes have no per-review link and no `cite`. Only "Read all 125 reviews on Booking.com" links out. Giada's quote has a `cite` attribute, which a visitor cannot see. (c) Languages spoken (en, `languages_spoken`) are not shown anywhere visible. |
| 5 | copy | 10 | 9 | 9.0 | The new words were passed by the copyeditor (fix round, 15 rows), and both replacements are live: the review counts, and "Forecast for {t}" instead of "Latest reading". Check-in is now said twice, not three times. The copy is plain and specific: m², beds, fan / A/C / hot water per room, cash only, and distances with their source. English is complete. −1, small: (a) the headline card opens with two lines that both start "Forecast for": "Forecast for Lazy Left by Rosa" / "Forecast for Mon 9 Nov, 14:30". (b) "Lazy Left is the Rosa spot nearest the house." uses "Rosa" before the page has said what Rosa is. The credit line below names it as a forecast. |
| 6 | accessibility | 8 | 8 | 6.4 | axe-core 4.10.3 (WCAG 2.0/2.1 A + AA) on the live page after a full scroll, with the forecast drawn and the widget loaded: **0 violations at 390 and 1440**. The only incompletes are 7 `color-contrast` nodes over photographs (`a11y.json`), which I sampled with the text hidden (`contrast-over-photos.json`). Median background contrast: hero name 9.4:1, hero line 11.5:1, Call pill 8.8:1, King title 6.9:1 (large), King line 9.2:1. Keyboard: 30 stops at 390 and 33 at 1440, with the skip link first. Every page stop shows a 2 px solid outline, and none is invisible. The slider dots are out of the tab order. The forecast order is credit → plain link → widget frame → closing CTA. **No trap.** Reduced motion: 0 running animations, 0 video. JS off: 7,798 characters of text, 18 images, hero CTA on screen. 0 of 18 images lack alt. Headings are in order, and `lang="en"` is set. −2: (a) **"Upstairs" over the King photo on the phone** (15 px / 600, white at 0.9 alpha, no text-shadow) measures **3.4:1 median, 4.38:1 at p90** against the photo under its own text box. That is under 4.5:1 (desktop: 10.1:1). axe could not decide it (`pseudoContent`). (b) Tap targets at 390: the review arrows are **40×44**, the review dots **15×44** (12 of them), and the photo dots 24–36×44. All are under playbook §4's 44 px. The dots are pointer-only now, and the 40 px arrows are the controls. (c) The Rosa iframe's own tab stop shows no outline from the page (computed `outline: none`). What Rosa draws inside the frame is Rosa's, so this is not deducted on its own. |
| 7 | security + delivery | 7 | 10 | 7.0 | Static only: `index.html`, `llms.txt`, `robots.txt`, 21 WebP files, 2 woff2 fonts with their OFL texts. All filenames are lowercase. Every `src` / `href` / `srcset` is relative, `tel:`, `#`, or one of booking.com, google.com/maps or rosa.surf. Grep finds 0 hits for localhost, 127.0.0.1, key, token, secret or payload. There is no CMS call. The only other host in the HTML is Rosa's data CDN, in `data-json`, fetched lazily. `<meta name="robots" content="noindex, nofollow">`, and robots `Disallow: /`. **0 third-party requests on first load** at 390 and 1440, with JS on and off, live (`forecast-paths.json`, 19 runs). Over a full scroll the only third-party hosts are Rosa's: the JSON from the page, and inside the frame rosa.surf, fonts.googleapis/gstatic and arcgisonline (`a11y.json`). 1 iframe, so 1 of 2 embeds. Verification 1's −2 (frame failure hid the link) is fixed: the plain link stays visible when the frame is aborted, refused or blocked (forecast table). |
| | **total 1–7** | 80 | | **73.4** | Verification 1 gave 72.8. +1.4 on dimension 7 (frame-failure fix), −0.8 on dimension 6 (two findings I measured that were not reported before: "Upstairs" contrast and the 15 px review dots / 40 px arrows). |

**Hard fails: 0.** I tested each of these today:
- facts: 0 mismatches.
- CTA landing: the URL and phone are exact.
- primary-action class: engine = recommended.
- third-party requests on first load: 0.
- CMS dependency: none.
- keyboard trap: none.
- content only in canvas or video: none.
- budgets: every line met.
- secrets: none.

The image and video lines are unchanged since the dossier and photos were checked:
- no video has a usable licence;
- no photo is ≥ 1920 px;
- all drawn photos are `business-owned` Booking.com uploads. `notes.md` changes only the img-032 crop and tone.

**Pass thresholds (full), critic's part:**
- No hard fail ✓
- Dimensions 1–7 each ≥ 6 ✓ (the lowest is 8)
- Every playbook §4 budget line met ✓
- Total ≥ 85 and both visual critics ≥ 8: pending dimension 8.

### Rosa forecast (hard constraint 9, playbook §4), including the failure paths

Live page, headless Chromium, 390 touch and 1440, `forecast-paths.json` (9 paths × 2 widths, plus a New York timezone run) and `forecast-onscreen-stale.json`.

| check | result | evidence |
|---|---|---|
| Spot id ↔ dossier spot via `concepts.md` | ✓ | `concepts.md` §3 amendment (2026-11-09) maps `location.spot` (guests name Lazy Left and Lazy Right) to `rosaSpotId: "lazy-left"`, 293 m. The page uses `lazy-left` in `data-json` (`…/data/spots/lazy-left.json`), in the widget's `spot=lazy-left`, and in both `rosa.surf/spot/lazy-left` links. Rosa's own `spot.id` / `name` / `town` are lazy-left / Lazy Left / Midigama. The page names it only as "Surf at Lazy Left", "the Rosa spot nearest the house", Rosa's credit, and Giada's attributed words, never as the house's break. |
| Headline only, no day-by-day | ✓ | The card shows "Forecast for Mon 9 Nov, 14:30 · 0.4–0.7 m · Swell 7.9 s from the south-east · Wind 5.7 km/h from the south, onshore · Rosa, updated 9 Nov 2026, 13:56". Against the JSON: `current.t` 14:30+05:30, `current.h` [0.4, 0.7], first in-window swell `period` 7.9 s from 149.5°, wind 5.7 kph from 162° onshore, `generated_at` 08:26:23Z = 13:56 Colombo. Times use the spot's timezone: identical with the browser set to America/New_York. No boxes, rows of days or chart. The swell is the mean `period`, while the widget shows the 12–14 s peak; recorded as the tools.md gap (proposal 003 item 3), not scored. |
| Widget is Rosa's, unmodified | ✓ | The attributes equal the `agents/designer/tools.md` snippet: `theme=light`, `units=metric`, width 100%, height 500, the same style, `loading="lazy"`, referrerpolicy and sandbox. `src` is set from `data-src`, as tools.md asks. Filter, transform, clip-path and blend are none, opacity 1, parent overflow visible. The frame is 420×500 at 1440 and 350×500 at 390. `elementFromPoint` returns the IFRAME at 5 points of the box with the box on screen. Only the phone booking bar passes over its lower edge while scrolling, as it does over every section. |
| Nothing from Rosa on first load | ✓ | 0 Rosa or other third-party requests on load in all 19 runs (390 and 1440, JS on and off). |
| After scrolling: one JSON request plus the frame | ✓ | The page makes exactly **1** GET to `lazy-left.json` and loads the frame. The HEAD request from verification 1 is gone. A second GET to the same JSON, Inter, the favicon and the satellite tiles come from inside Rosa's frame (`frame: sub`). With the widget blocked, the page's own count is 1. |
| Space reserved on arrival | ✓ | Section height 1058 → 1058 (390) and 612 → 612 (1440), 0 layout shift as the headline draws and the widget loads. |
| JS off | ✓ | The card is just the plain link "See today's forecast for Lazy Left on Rosa" → `rosa.surf/spot/lazy-left` (350×112 / 620×112). No widget box is drawn, so there is no blank reserved box. 0 Rosa requests. |
| JSON aborted / 500 (fails before the block is on screen) | ✓ | `.off.solo`: the card shrinks to the link, 112 px, out of sight. Phone section height 1058 → 916. No layout shift is recorded, because it happens below the screen. The widget still loads beside it, and the link is visible. |
| JSON 30 h stale / hanging to the 10 s timeout (fails with the block on screen) | ✓ link, **✗ shift** | The card keeps 254 / 220 px and shows only the link. No numbers are shown, and section height is unchanged. But the link moves from the bottom row to the card's centre: **CLS 0.0659 at 390, 0.0126 at 1440** (`forecast-onscreen-stale.json`: `fc-link` y 356 → 150, height 48 → 254). That is the one defect in this block (dimension 2). |
| Widget frame aborted / refused (`frame-ancestors 'none'`) | ✓ | The headline stays drawn, the plain link stays visible in the card, and height is unchanged. Verification 1's defect is fixed. |
| All Rosa hosts blocked | ✓ with a note | The card shows the link (`.off.solo`). At 1440 the widget's 420×500 column is plain white beside it (screenshot `fc-allblocked-d`, scratch): no border, no box, and the link is visible. This is the designer's recorded choice (notes.md fix round, row 1). |
| Stale data and Rosa's widget | note for the human | The widget loads independently of the page's JSON check. With the JSON stale, the site's half falls back to the link correctly, while Rosa's widget still renders its own days with "Today" (designer conflict 2 in `notes.md`). I could not simulate truly stale content inside the widget, only a stale `generated_at`. |
| `shoot.mjs` waited | ✓ | Both halves set `data-loading`. Shared `desktop-10` and `mobile-12` show the drawn headline (0.4–0.7 m) and Rosa's widget with Today's rows. |
| Embeds and budgets | ✓ | 1 of 2 embeds (the map is a link). Live, compressed: first load 872,763 B; Rosa's JSON 9,612 B + frame 7,863 B + Inter 48,983 B + tiles and favicon, about 82 KB in all after scrolling (`bytes-live.json`). With the embed loaded the transfer stays far under 1.5 MB. Inter is a third family, **inside Rosa's frame**, not counted, as in verification 1. |

The headline's time was about 5.5 h behind the clock during the test (data generated 08:26Z, test 14:26Z). It is labelled "Forecast for Mon 9 Nov, 14:30", never "now" (notes.md conflict 5).

### Playbook §4 budget, measured

| Item | Target | Measured | |
|---|---|---|---|
| First-load transfer (no video) | ≤ 1.5 MB | 919,007 B local, uncompressed; 872,763 B live, compressed; 13 requests | ✓ |
| Hero video | ≤ 2 / 4 MB | none (no licensed video) | n/a |
| JS, compressed | ≤ 300 KB | 0 external; inline only | ✓ |
| Largest above-the-fold image | ≤ 300 KB | 228,380 B (img-019) | ✓ |
| Fonts | ≤ 2 families, ≤ 150 KB | Parisienne + Hanken Grotesk, 56,996 B, self-hosted | ✓ |
| LCP | ≤ 2.5 s | 468 ms | ✓ |
| CLS | < 0.1 | 0.0018 on load; scroll early 0.0018 / settled 0 | ✓ |
| Third-party requests on load | 0 | 0 | ✓ |

### Network log, first load (390, throttled, local static server)

All 13 requests go to one host:
- HTML: 73,503 B
- 2 woff2 fonts: 56,996 B
- 10 WebP files: 788,508 B. These are the gate plus the King band, the strip and the roof photos inside Chromium's lazy-load margin.

`third_party_hosts: []`.

### Facts table (claim → dossier key → result)

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Lotus Surf House"; "A guesthouse in Midigama, on the south coast of Sri Lanka." | `business.name`; `business.type.note` and `former_names` (guesthouse); `location.address`. "South coast" is shared context (`lat_lng`, Facebook "Matara", copy review R4) | match |
| King Room with Balcony: 1 extra-large double bed, sleeps 2, upstairs, 25 m², A/C, fan, mosquito net, hot water; "new, balconies look out into the trees" | `room_types[3]`, `room_units[]` (559076608: Air conditioning, Fan, Mosquito net), `business.recent_works`, `location.views` | match (unverified hot tub omitted) |
| Standard / Double or Twin: 2 single beds, sleeps 2, 20–25 / 25 m², garden view, fan + net, no A/C, no hot water; Deluxe Queen: 1 large double, 25 m², tiled floor, walk-in shower | `room_types[0–2]`, `room_units[]` facilities, owner reply "1st floor … only have air condition and hot water" | match |
| "Ground floor, three room types" | `room_types` (3 ground-floor types) | match |
| Check-out 11:00–12:00; check-in at any hour; cash only; children welcome, no cots or extra beds; pets on request, no charge; no parking | `stay_info.check_out`, `.check_in`, `.house_rules`, `.parking` | match (Kayak's contradiction is an open owner item, `copy/review.md`) |
| Breakfast included, 8–10 | `facilities[0]`, `stay_info.breakfast_hours` | match |
| 9.0/10 Booking.com 125 reviews · 4.9/5 Google 78 reviews · 3 Nov 2026 (cards, King proof line, footer) | `reviews.booking`, `reviews.google`, `fetched_at` 2026-11-03 | match |
| Midigama Beach 250 m (Booking.com); station 50 m; Ahangama Beach 1.4 km, Weligama Beach 4.2 km, Koggala Airport 9 km | `location.distance_to_beach`, `.distance_to_station`, `.nearby` | match |
| Garden, hammock, ping-pong under a thatched roof; terraces with chairs and a table downstairs; roof terrace, wooden table and chairs, Buddha with offerings of flowers and fruit | `facilities[1–2]`, `room_units[0–4]` (Terrace, Outdoor furniture, Outdoor dining area), image descriptions img-005 / img-021 / img-022 | match |
| "Yelum owns the house"; his two quotes | `business.owner`; owner replies in `reviews.quotes[60]` | match, verbatim |
| Old name Yelum Guest House | `business.former_names` | match |
| Indhana Rd, Midigama 80650, Sri Lanka | `location.address_site_form` (Google) | match |
| +94 77 464 7541 / `tel:+94774647541` | `contact.phone` | match |
| Booking URL (every Booking link) | `booking.engine_url` | match, character for character |
| Google Maps `place_id:ChIJBR_cQfoV4ToRQhXcrYmPyU0` | `location.map_url` | match |
| 8 amenities + "Additional charge: Airport shuttle, Bicycle rental, Walking tours, Laundry" | `facilities[]` (paid per Booking) | match (grouped; none dropped or reworded) |
| 12 testimonials + Giada in #surf | `reviews.quotes[]` | 13/13 verbatim, 13/13 attribution |
| "Lazy Left is the Rosa spot nearest the house." | Rosa `index.json` vs `location.lat_lng`: 293 m, nearest of 4,000 | match (recomputed today) |
| Forecast height, time, swell, wind, update time | Rosa JSON, live | match, field by field |
| JSON-LD: geo, rooms, `checkoutTime` 12:00, `knowsLanguage` en, amenities | `location.lat_lng`, `room_types[]`, `stay_info.check_out`, `languages_spoken`, `facilities` | match |
| 18 photos and their alts | `images[]`, all `business-owned` | match |

### Screenshots (shared `reports/2026-10-midigama-01/verify-2-lotus-surf-house/shots/`, read only; 1440 × 900 ×12, 390 × 844 ×15; page 9,208 / 10,922 px)

- `mobile-00`: the carved gate under leaves, full height. Top left, the white wordmark. Lower third: "Lotus Surf House" in script, "A guesthouse in Midigama, on the south coast of Sri Lanka.", brick-red "Check dates on Booking.com" and an outlined Call.
- `mobile-01`: the Call pill alone at the top, with no wordmark over it. Then img-002 (King bed under its net) with "Upstairs / The King Rooms" and the line. "Upstairs" sits over the pale bed sheet.
- `mobile-02`–`03`: img-025 (balcony), the King facts, Book / Call, the stay line, the dated proof line with counts, and the 2×2 strip. The phone bar (Book + call icon) is there from here on.
- `mobile-04`–`05`: the roof (Buddha, table), the two rating cards, and the glance line "Midigama Beach 250 m (Booking.com) \| Breakfast included, 8–10".
- `mobile-05`–`08`: In the garden, Yelum's quote, the garden photo, the garden-room slideshow (Deluxe Queen first) and the three rooms.
- `mobile-08`–`09`: Yelum, the recropped warm porch print, Breakfast, then Guests opening on Henry.
- `mobile-10`–`11`: "Read all 125 reviews", Getting here, the address, amenities in a `|` flow with "Additional charge:" on its own line, Maps / Call, Good to know, then "Surf at Lazy Left", the sourced line and Giada.
- `mobile-12`: the forecast card (0.4–0.7 m) above Rosa's widget (map, "Lazy Left", Today's rows).
- `mobile-13`–`14`: "Come and stay", the closing line, Book / Call, and the footer.
- `desktop-00`: a split, with the name, line and buttons on white at left and the gate at right.
- `desktop-01`: img-002 full-bleed with "The King Rooms".
- `desktop-02`–`03`: img-025 with the facts and proof line, then the strip.
- `desktop-04`: the roof, then the ratings.
- `desktop-05`–`06`: the garden and the rooms.
- `desktop-07`: Yelum and Breakfast beside the print.
- `desktop-08`: Guests (Henry).
- `desktop-09`: Getting here, with the two-column amenities.
- `desktop-10`: "Surf at Lazy Left" with the card beside Rosa's widget on the page grid.
- `desktop-11`: the closing and the footer.

**what the designer prompt got wrong:** Little. Every verification-1 item in the designer's scope was fixed and measured:
- the frame failure no longer hides the link;
- the mapping is in `concepts.md`;
- the phone wordmark no longer overlaps;
- check-in is said twice;
- the dots are out of the tab order;
- the failure no longer leaves a blank half.

Two general gaps remain. (1) The prompt's rule for forecast failures is "the link fills the card at the same height", and the designer met it by re-laying the link out. Neither the prompt nor `tools/site-check.mjs` measures layout shift *inside* the reserved box when the failure arrives on screen. site-check compares section heights, which do not change, so a 0.066 shift passes. The check should record layout-shift entries during an on-screen failure (stale JSON with the block in view), not only heights. (2) The contrast check stops at the elements axe flags as violations. Small light labels over photographs ("Upstairs", 15 px, no shadow) come back from axe as *incomplete*, and nobody samples them. The designer's hand-off should sample every text-over-photo node axe leaves incomplete, at 390 as well as 1440.

**fix list (not gating; smallest first):**
1. **Dim 6:** give "Upstairs" on the phone a text-shadow or the scrim the King title has, or set it on a darker part of the photo, until it reaches 4.5:1. It measures 3.4:1 median today.
2. **Dim 5:** vary one of the two adjacent "Forecast for …" lines on the card. Optionally say what Rosa is before "the Rosa spot".
3. **Dim 2, forecast:** on an on-screen failure, keep the plain link where it already is (bottom row) and only clear the numbers. Or fade them out with opacity or transform instead of re-laying out the link. The goal is a layout-shift value of 0 when the JSON goes stale or times out in view.
4. **Dim 6:** make the review arrows 44 px wide at 390 (40 today). The dots (15 px) are pointer-only and could be larger or dropped on the phone.
5. **Dim 4:** add a per-review link to each Guests quote (each has a dossier `source_url`), and show languages spoken (en) where the host is introduced.
6. **Dim 4 (human order, not for the designer alone):** `recommended.above_fold` spot / included / trust still start on phone screen 4–5.
7. **Dim 3 (documented gap):** the Booking.com hand-off carries no room, dates or guests.

### Not tested

- **Real phones and other browsers.** Everything ran in headless Chromium. Frame behaviour on a refusal and the layout-shift values are Chromium's.
- **Real Rosa outages.** The failure paths were simulated by intercepting requests in my own browser. Stale data was simulated by rewriting only `generated_at`, so I could not see what Rosa's widget shows with truly old content.
- **A frame slower than 10 s.** I tested the JSON hang to the timeout. The frame's own 10 s timer I read in the code but did not run.
- **The Booking.com listing today.** I did not load it. The tap-through is the recorded navigation URL. The ratings are checked against the dossier (read 2026-11-03), not the live listing.
- **Inside Rosa's widget.** Its accessibility, swipe between days, its focus drawing and its row labels. axe audited the page, not the frame.
- **Screen reader.** Not run; axe and a Tab pass only.
- **The visual and experience critics' view.** Dimension 8 is not mine, and I did not read their reports.

### Evidence files

Under `reports/2026-10-midigama-01/critic-lotus-surf-house-v2/`:
- `audit.json`: `tools/audit-mockup.mjs` run from a scratch root on a copy of `dist/`. The designer's `final/audit.json` was not touched.
- `funnel/funnel.json`: `tools/funnel.mjs https://lotus-surf-house.os1.workers.dev/ --depth 3`. Its two PNGs were moved to scratch.
- `forecast-paths.json`: normal, JS off, JSON aborted / 500 / stale / hanging, widget aborted / refused, all Rosa blocked, at 390 and 1440, plus a New York timezone run. Each records requests per frame, section height before and after, card text, link visibility, iframe geometry and style, element at the iframe centre, and layout shifts.
- `forecast-onscreen-stale.json`: failure arriving with the block in view (link rects before and after, layout-shift entries), and stale data fed to page and widget alike, with the widget's text and the coverage points.
- `a11y.json`: axe at 390 and 1440 after a full scroll, Tab stops, hosts over a full scroll, console errors, overflow at 320 / 360 / 390 / 1440, reduced motion, JS off.
- `contrast-over-photos.json`: white text over photographs sampled with the text hidden, including the "Upstairs" text box alone.
- `bytes-live.json`: compressed bytes on the live Worker, first load and after a full scroll, Rosa's requests itemised.
- `quotes-check.json`, `page-text.txt`: the verbatim and attribution check of the 13 quotes, and the page's visible text at 1440 after a full scroll.

My forecast screenshots (`fc-*`, `fc2-*`, `iframe-focus-m`, `phone-*`) stayed in scratch and are described above. The shared `verify-2-lotus-surf-house/shots/` was only read.
