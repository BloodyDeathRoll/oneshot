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
