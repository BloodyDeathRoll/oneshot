# coconut-surf-inn-guest-house-and-restaurant — critic scorecards (run 2026-10-midigama-01)

## Round 1 — quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 (local) · mockups `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive,unique}/dist/` (designer 0.7.1; `index.html` last written 01:22 / 01:25 / 01:30 local). The builds were served on :8921 / :8922 / :8923. I confirmed with md5 that each served `index.html` is byte-identical to its `dist/index.html`. I did not read any visual-critic or experience-critic report.

Same checks, same order and same viewports for all three:
- **`audit.json`** from `tools/audit-mockup.mjs`. Each one was measured after its page's last write (calm 23:23Z after 23:22Z, interactive 23:29Z after 23:25Z, unique 23:30:55Z after 23:30:54Z), so I read them and did not re-run them.
- **My own `tools/shoot.mjs` pass** at 1440×900 and 390×844, saved in `critic-…-r1/shots/` (gitignored scratch, to be cleaned with `tools/clean-shots.mjs`). Page heights and capture counts match the designer's `shots/`: calm 14,565 / 16,300 px and 18 / 22 captures; interactive 10,844 / 12,848 px and 14 / 17 (shot with `?depth=force`); unique 12,002 / 14,094 px and 15 / 19. There were 0 console errors.
- **axe-core** (WCAG 2.0/2.1 A+AA) after a full wheel scroll, at 390 and 1440, with every non-localhost request blocked and logged. Also a 60-stop keyboard pass, overflow at 320, 360 and 390 with JS off, and a reduced-motion pass (`a11y-*.json`, `misc.json`).
- **A Rosa and network pass** at 390 (`net-*.json`): first load, a gradual scroll to the forecast block, and the same again with every `rosa*` host aborted.
- **A facts pass** (`facts-diff.txt`): the page text with JS on and off, diffed line by line against `copy/en.json`. Every testimonial was compared character for character with the copy and the dossier, and every href was listed.
- **`tools/check-design.mjs --no-shots`** on each page path.
- **`tools/funnel.mjs --depth 3`** as a forward check (`funnel-*/funnel.json`). This is full-mode evidence, run early.
- **Interactive only:** the WebGL depth pass forced with `?depth=force` under SwiftShader, and a pixel-contrast probe of the hero lines.
- **Unique only:** a keyboard pass of the "Find your room" overlay.

The business has **no own website**. Its current presence is the Booking.com and Airbnb listings plus two Google places (`dossier/…/audit.json`). The side-by-side comparison with that presence belongs to dimension 8 and is not scored here.

**Rubric arithmetic (fact for the human):** dimension weights 1–7 sum to **80**, so the totals below are out of 80.

### Shared evidence (identical for all three)

- **Facts.** The facts table below has 0 mismatches and 0 contradicted values on every page.
  - All 12 copy testimonials equal a `dossier.reviews.quotes[]` text exactly, with the same author, month and source (script).
  - All 12 appear verbatim on each page. Meagan's, Mette's, Chloe's and Abdulrahman's line breaks are rendered as `<br>` (calm, unique) or `</p><p>` (interactive), and no word is changed. Abdulrahman's blank line is collapsed to a single break.
  - Every page line that is not in the copy is one of two things:
    - an interface label ("13:00, check-in", "The afternoon", "Fan rooms: no air conditioning and no hot water", "How do you like to sleep?", "Find your room", "Fan", "A/C | Hot water", "No A/C");
    - a restatement of a copy or dossier value (beds | sleeps | m², the dated rating blocks, "Restaurant upstairs, 7:30–22:00", the Rosa headline).
  - The Rosa headline values (0.4–0.6 m, knee-high, Thu 5 Nov 02:30, swell 1.04 m / 9.2 s from 172°, wind 3.9 km/h cross-shore) equal the unedited fixture `src/rosa-weligama-west.json`. Its md5 is the same in all three, and it is `generated_at` 2026-11-04T20:26Z, under 24 h old when tested at 23:36Z.
  - None of the claims that must never appear is on any page:
    - the "Coconut Beach" place's 120-review rating;
    - a pool, spa or level claim;
    - a payment method or nightly price;
    - a blanket "breakfast included" (the only one is inside Chloe's verbatim review);
    - house number 44 or 49.
- **Booking.**
  - Every external booking href is exactly `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html`, which equals `dossier.booking.engine_url.value`.
  - Every `tel:` is `tel:+94778921396`, which equals `contact.phone.value`.
  - There is no WhatsApp or email, which matches the dossier gaps. The Airbnb (`/rooms/2402254`) and Google Maps (`place_id:ChIJI29C…`) links match the dossier.
  - `audit.json.booking.tapped` on a 390 touch lands on the Booking.com URL, character for character, on all three. `primary_above_fold` is true.
  - With JS off, `booking_links_reachable` is 2, and the page carries 14 (calm, interactive) or 20 (unique) Booking.com links.
  - **Forward check, all three: `funnel.mjs` reports `primary_action.class` = `hero_action.class` = `tel`, not `engine`.** `clicks_to_book` is 1. The recommendation is `primary_action: engine`, `clicks_to_book: 1`.
    - Cause: on the phone, the header's round call icon (`aria-label "Call +94 77 892 1396"`, top 10 px) is the top-most terminal action on the first screen. It sits above the hero's "Check dates on Booking.com" (top ≈ 306 px).
    - It does not block a booking today. But at station 5 this exact markup is a **hard fail** ("primary booking action is a different class").
- **Delivery.**
  - Each page is static HTML plus `img/`; unique also has `rooms/index.html`.
  - There is no server code and no CMS call.
  - No `src` or `href` starts with `/`, and all filenames are lowercase.
  - There are no localhost, key, token or secret strings.
  - Third-party hosts on first load are Google Fonts only: `fonts.googleapis.com` + `fonts.gstatic.com` for calm and interactive, `fonts.gstatic.com` for unique. That is allowed at 4e (critic `tools.md`) and is a defect in full mode only.
- **Rosa (hard constraint 9).**
  - All three carry the forecast in its own block after the offers.
  - The mapping is concepts.md's: dossier break "Coconuts" → Rosa `weligama-west` ("Coconut", Midigama). It is never `coconut` or `coconut-beach`.
  - The widget is `https://rosa.surf/widget/?spot=weligama-west&theme=light&units=metric`, unfiltered, opacity 1, with no transform. `elementFromPoint` at its centre is the iframe itself, so it is uncovered.
  - The credit "Forecast for Coconuts by Rosa" links to `https://rosa.surf/spot/weligama-west`.
  - There is no day-by-day row on the site's own half.
  - First load makes **0** Rosa requests. After scrolling to the block:
    - calm and interactive request only the widget frame, because their headline is the inlined fixture while it is under 24 h old;
    - unique makes **1** request to `rosa-data-opal.vercel.app/data/spots/weligama-west.json` plus the widget frame.
  - Layout shift while scrolling to the block and the widget loading: 0 on all three.
  - With JS off, all three show the plain link "See today's forecast for Coconuts on Rosa".
  - The blocked-request path differs per page; see dimension 7 of each.
  - Embeds: 1 of the allowed 2 on each page (Rosa only; the map is a link).
- **Hard-fail screen.**
  - **No usable video**: `videos[]` vid-001/002/003 are all `license: unknown`, and vid-003 is another business's film.
  - **Every first screen carries a ≥ 1920 px own photograph:** img-009 (calm, unique) and img-102 (interactive), both 1920×1440 and `business-owned`.
  - There are no borrowed or stock images (`dossier.images[]` are all business-owned, and every notes.md reports check-places 0).
  - There are no secrets.
  - **No hard fail on any page.**
- **check-design default look** (facts, not taste). All three: 0 problems and 0 warnings, white ground `hsl(0 0% 100%)`, 0 all-caps labels, 0 labelled headings.

  | page | display face | body face | headings |
  |---|---|---|---|
  | calm | Satisfy | Onest | 19 |
  | interactive | Shadows Into Light Two | Nunito Sans | 19 |
  | unique | Caveat | Red Hat Text | 25 |
- **Shared dimension 4 deduction.** On a 390 phone the first screen shows only:
  - "Coconut Surf Inn";
  - "Gurubebila, between Midigama and Weligama";
  - the button.

  The business **type** ("A guesthouse in Gurubebila…") first appears on screen 01 in all three: the mobile captures 01 of each sheet, under "13:00, check-in". Playbook §2/§3 asks for type + place above the fold, and "Surf Inn" alone can be read as a surf school or camp, which `business.type` says it is not. The `recommended.above_fold` items spot, included, price and trust also begin on screen 01, which concepts §3 chose deliberately.
- **Shared dimension 3 deduction.** Booking.com cannot take a room from the URL, so every room button lands on the listing top (concepts §3). It is 1 tap and within target. The second point is the funnel class risk described above.

### calm — "The view from the roof"

```
mode: quick        round: 1        variant: calm
total (dims 1–7): 70.2 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim with correct author, month and source. Ratings 8.5/10 · 142, 4.8/5 · 88 and 4.44/5 · 54 are each dated "4 Nov 2026" = `fetched_at` 2026-11-04. Rooms: label, beds, sleeps and m² equal `room_types[]` for all six, and the fan/A/C groups equal `air_conditioning`. −1: the Deluxe Family Room slideshow ends on **img-089**, a bathroom with **no `room_types`** in the dossier (Booking `in_main_gallery: false`). Showing it as that room's bathroom is an attribution the dossier does not hold. It comes from concepts §4.1; unique's designer dropped it for this reason. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json` (390, 1.6 Mbps / 150 ms / 4× CPU): first load **1,078 KB** (≤ 1.5 MB) in 21 requests. JS 0 external (≈ 7 KB inline). Fonts 56 KB, 2 families. Largest image 130 KB (≤ 300). **LCP 600 ms**. CLS 0.0023. Scroll CLS early 0 / settled 0. No overflow at 390 or 1440 (scrollWidth = clientWidth), with JS on or off. Mobile sheet: 22 captures, no overlap or clipped text, and the phone bar ("Check dates on Booking.com" + call icon) is present from capture 02. −1: 46 of 89 tap targets are under 44 px (slideshow dots 24×44 beside 44 px arrows). At 320 px the header, phone bar and amenities line overflow to 340 px (not a run viewport; noted). |
| 3 | booking CTA | 15 | 8 | 12.0 | Shared booking evidence. The hero button is above the fold at 390 (mobile-00, under the title in the sky) and at 1440. The check-in section has "See rooms and live dates on Booking.com" + Call, and every room has its own button. −2: the shared deduction (listing top, plus `funnel.mjs` reading the header call icon as the primary action). |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order, the concept's clock: view → 13:00 check-in (tagline, details line, two dated ratings, booking pair) → six rooms in two plain groups, A/C first and fan rooms never hidden (`recommended.offer_framing`) → inside the house → roof band → sunset → restaurant until 22:00 + Eranga family → 7:30 the break (spot + season + Rosa) → 11:00 check-out (three ratings, quotes) → getting here → closing → footer. custom.md calm brief: no canvas (`reduced_motion.canvases` 0), one action in the hero, micro-motion only. −2: the shared above-the-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | Every word comes from `copy/en.json` (passed 4c). The labels are short and factual ("Fan rooms: no air conditioning and no hot water" states the room notes). Each quote appears once: Meagan's with the family block, the other 11 in the guests slideshow. English is complete. |
| 6 | accessibility | 8 | 8 | 6.4 | axe at 390 and 1440: **0 violations**, 26 rule sets pass. Keyboard: the skip link "Skip to the rooms" is first, and all 60 stops sampled are visible with a 2 px solid outline. There is no drawer. 0 of 43 images lack alt. Headings H1 → H2/H3 in order. `lang="en"`. Reduced motion: no pan and no settle, 0 animations. The hero title is ink on sky (the designer measured ≥ 5.9:1 at p10). With JS off, the Rosa block is one plain link. 0 page errors. −2: the 46 small tap targets. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery and Rosa evidence. Blocked Rosa: the reserved 350×500 box keeps the plain link "See today's forecast for Coconuts on Rosa" visible in its middle (`net-calm.json`; blocked capture), as playbook §4 asks. −1: fonts load from Google, which is allowed at 4e but must be self-hosted at build. |
| | **total 1–7** | 80 | | **70.2** | |

### interactive — "Under the thatch"

```
mode: quick        round: 1        variant: interactive
total (dims 1–7): 64.4 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim. Fact cards: "Coconuts in front of the guesthouse / An A-frame reef break" (`spot`), "Restaurant upstairs, 7:30–22:00 / Every day" (`hoursNote`), "8.5/10 and 4.8/5 · Booking.com, 142 · Google, 88 · 4 Nov 2026" (`ratings[]`). Tile counts are correct against `rooms[]`: "4 kinds of room · sleep 2 to 4", "2 kinds · sleep 1 or 2", "Three or four of us · 2 kinds · sleep 3 or 4". Room chips "Fan / A/C / Hot water / No A/C / No hot water" equal each `rooms[].note`. Rosa "Swell 1.0 m, 9 s from the S" = fixture 1.04 m / 9.2 s / 172°. −1: the same **img-089** as the Deluxe Family bathroom (no `room_types` in the dossier). |
| 2 | mobile + performance | 15 | 8 | 12.0 | `audit.json`: first load **374 KB**, 8 requests. JS 0 external. Fonts 65 KB. Largest image 102 KB. **LCP 520 ms**. CLS 0.0018. Scroll CLS early 0.0018 (one 0.0014 text shift at 1.09 s) / settled 0. No overflow at 320, 360 or 390 (JS on or off) or at 1440. Mobile sheet, 17 captures: no overlap, and the 3-part phone bar (Booking.com, call, ˄) is present from capture 02. `?depth=force`: a 1440×900 canvas at opacity 1, 0 errors. Without force, the canvas also ran (`depth live`) under SwiftShader. −2: **17 of 41 tap targets under 44 px**, including the room-slide dots at **8×8 / 24×8**, the hero-card rating links "Booking.com, 142" **113×19** and "Google, 88" **69×19**, and the header wordmark 156×26. |
| 3 | booking CTA | 15 | 8 | 12.0 | Shared booking evidence. The hero button is above the fold (mobile-00, on the parapet; desktop-00 centred low). The tiles change the stage in place, and each room has "Check dates on Booking.com". With JS off, the tiles are anchors and every room stacks with its button. −2: the shared deduction. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order: thatch hero → 13:00 four fact cards in the audit's order (spot, included, price → Booking.com, trust) + booking pair → "How do you like to sleep?" (fan / A/C / 3–4) list + stage → inside the house + veranda drag row → roof → sunset band → restaurant + night print + Eranga family → 7:30 break + Rosa → 11:00 ratings + review row → getting here → closing → footer. custom.md "richer in interaction": the WebGL depth parallax on its own photograph, the tile chooser, rolling digits, a drag row. −2: the shared above-the-fold deduction (the fact cards are on screen 01). |
| 5 | copy | 10 | 8 | 8.0 | Copy from `copy/en.json`, plain and specific. −1: Erin's and Janno's reviews each appear **twice** (roof block / restaurant block, then the guests row). −1: the hero card reads "Booking.com, 142 · Google, 88" with no "reviews", next to the 11:00 blocks that say "142 reviews". |
| 6 | accessibility | 8 | 6 | 4.8 | axe at 390 and 1440: **2 serious `aria-prohibited-attr`** on `b > .num[data-roll="8.5"][aria-label="8.5 out of 10"]` and `[data-roll="4.8"]`. The digit columns inside are hidden and the `aria-label` sits on a role-less span, so screen readers may not get the scores. **This is the same defect the critic reported on Lotus interactive (4f, 2026-11-03), repeated.** 29 rule sets pass. Skip link → rooms. Focus outline 3 px solid; the slideshow arrows fade in on focus (opacity 1 after 450 ms). 0 of 15 images lack alt. Headings in order. Reduced motion: 1 canvas, hidden, photograph visible. Hero title over the photo: median 14:1 at 390 and 4.8:1 at 1440 (large text, ≥ 3:1). 0 page errors. −2: the small targets above (8 px dots). |
| 7 | security + delivery | 7 | 8 | 5.6 | Shared delivery and Rosa evidence. −1: with Rosa's host blocked, the reserved 342×500 widget box is **empty white**, with no "See today's forecast" link inside it. Only the small credit line above it links to Rosa (`net-interactive.json`, `blk` capture). Playbook §4: "never an empty box". −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **64.4** | |

### unique — "Round the clock"

```
mode: quick        round: 1        variant: unique
total (dims 1–7): 67.4 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 12/12 quotes verbatim. The 13:00 paragraph joins `tagline` + `spot` sentence 1 + `hoursNote` + `closing` sentence 1, unedited. All three ratings carry count, source and "4 Nov 2026". Fan / "A/C \| Hot water" chips equal each room's note. Galleries use only photos listed under that `room_types[]` entry (img-089 deliberately left out). `rooms/` page: the six rooms grouped by guests ("Just me" … "Four of us"), same facts and links. JSON-LD `LodgingBusiness`: name, phone, Google address, 13:00 / 11:00, and AggregateRating 8.5/10 · 142, all dossier values. |
| 2 | mobile + performance | 15 | 8 | 12.0 | `audit.json`: first load **382 KB**, 8 requests. JS 0 external (≈ 14 KB inline). Fonts 81 KB (2 families, preloaded). Largest image 78 KB. **LCP 1,888 ms** (the slowest of the three, within 2.5 s). CLS 0.0011. Scroll CLS early 0.0009 / settled 0. **0 tap targets under 44 px.** Mobile sheet, 19 captures: no overlap, and the bar ("Check dates on Booking.com" + "Find your room") is present from capture 01. −2: horizontal overflow. **With JS off at 390, the page is 397 px wide**: the Rosa fallback button and credit (`.fc-plain`, `.rosa-box .fallback`) and the phone bar stick out 7 px. With JS on, at 320 and 360 the slideshow `.ctrl` row and the bar reach 342 / 362 px. At 390 with JS on there is no overflow. |
| 3 | booking CTA | 15 | 8 | 12.0 | Shared booking evidence. The hero button is above the fold (mobile-00, on the white sky). "Find your room" is a real link to `rooms/`, which works with JS off. With JS, a dialog opens: focus lands on tile "1 · Just me", and Tab stays inside (25/25 stops). "2" lists the Deluxe Balcony, Superior, Deluxe 2+1 and Budget Double, each with chip and "Check dates on Booking.com". Esc closes it and focus returns to "Find your room", at 390 and 1440 (`audit.json.keyboard` also passes). −2: the shared deduction. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order: sky-dissolve hero → 13:00 fact paragraph + three dated ratings + booking pair → six rooms, A/C first → inside the house (masonry) → the 450 vh sticky split (afternoon → sunset → 22:00 → 7:30 → the break) with the sign-sun hour marker → "Today on Coconuts" Rosa row → 11:00 ratings + one quote at a time → getting here with the sign print → closing → footer. custom.md "bolder": a WebGL horizon wipe through five own 1920 px photographs. Reduced motion stacks them. −2: the shared above-the-fold deduction. |
| 5 | copy | 10 | 9 | 9.0 | Copy from `copy/en.json`, plain and specific. Labels are short and factual. −1: Erin's and Janno's reviews each appear **twice** (set-piece blocks and the guests slideshow). |
| 6 | accessibility | 8 | 6 | 4.8 | axe at 390 and 1440: **1 serious rule, `color-contrast`, 21 nodes**. In the set-piece, every block that is not the current one is dimmed while it is on screen. Its titles ("Sunset", "Until 22:00", "From 7:30", "The break") are at **2.29:1** (#acabab on #fff), body text at **2.29:1**, sub-titles at **1.71:1**, and Janno's quote card at **2.19 / 1.75:1**. This is readable text on the way into view (mobile capture 11 shows "Until 22:00 / The restaurant upstairs" faded under the pinned frame), not hidden text. The rest passes: 27 rule sets, skip link, 3 px solid outlines, 0 of 50 images without alt, the dialog trap above, 0 small targets, and reduced motion gives stacked blocks with the canvas hidden. −2: the dimmed set-piece text. |
| 7 | security + delivery | 7 | 8 | 5.6 | Shared delivery and Rosa evidence. One JSON request after the scroll, as the concept says. −1: with Rosa's hosts blocked, the reserved 358×500 widget box is **empty white**. Its "See today's forecast for Coconuts on Rosa" link stays hidden (`vis=false`), and only the credit line links to Rosa (blocked capture). The headline keeps the fixture values, which is correct while they are < 24 h old. −1: Google Fonts (`fonts.gstatic.com`, 4e only). |
| | **total 1–7** | 80 | | **67.4** | |

### Facts table (claim → dossier key → result), all three variants

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Coconut Surf Inn" (wordmark, title, footer) | `business.name` | match |
| "A guesthouse in Gurubebila, between Midigama and Weligama, on the south coast of Sri Lanka"; hero "Gurubebila, between Midigama and Weligama" | `business.type` beach_lodging, `location.place_name_used` | match (the hero line is a fragment of the tagline) |
| Coconuts, a consistent A-frame reef break, in front of the guesthouse; Plantations a 100 m walk up the beach | `location.spot`, `break.evidence[0]` (host's words) | match |
| Season November to April, attributed to the Sri Lanka Travel Pages surf guide, at Coconut Point | `location.spot_reference`, `season` gap | match (attributed, not the owner's claim) |
| Restaurant upstairs, every day 7:30–22:00 | `restaurant_hours[0]` | match |
| Restaurant's own Google listing, 4.6 from 39 reviews | `reviews.google_restaurant` | match |
| "Breakfast comes with some rates and not with others" | `stay_info.breakfast` (rate-dependent), contradictions | match |
| Booking.com 8.5/10 · 142 reviews · 4 Nov 2026 | `reviews.booking` (fetched 2026-11-04) | match |
| Google 4.8/5 · 88 reviews · 4 Nov 2026, linked to `place_id:ChIJI29C…` | `reviews.google`, `location.map_url` | match (not the beach place's 120) |
| Airbnb 4.44/5 · 54 reviews · 4 Nov 2026 | `reviews.airbnb` | match |
| Six rooms: Budget Single (1 single, sleeps 1, 9 m², upstairs, fan, no A/C, no hot water) · Budget Double (1 large double, 2, 12 m², fan) · Superior Double (1 large double, 2, 14 m², ground floor, A/C) · Deluxe Double with Balcony (1 large double, 2, 15 m², upstairs, balcony, A/C) · Deluxe 2 Adults + 1 Child (1 double + 1 large double, 3, 19 m², ground floor, A/C) · Deluxe Family (1 single + 1 large double, 4, 28 m², balcony, garden view, A/C) | `room_types[0–5]`, `room_types_note` | match |
| Room galleries (each room's photos) | `room_types[].photos` | match, except **img-089** in calm and interactive's Deluxe Family gallery (no room type: missing) |
| Every room has its own entrance and bathroom with a shower | `room_types[].facilities` (Private entrance, Private bathroom, Bath or shower) | match |
| Check-in from 13:00; check-out until 11:00 | `stay_info.check_in` / `check_out` (Booking) | match |
| Children of any age welcome; no cots or extra beds; pets on request, no charge | `stay_info.house_rules` | match |
| Skylit courtyard with palms in a water channel; verandas with hammocks, outdoor shower, clothes line, board rack | `facilities[2–3]`, `business.description` | match (not called a pool) |
| Thatched roof terrace with swing seat, hammocks, benches, sea view | `facilities[1]` | match |
| Open green by the beach, locals and travellers, cricket, sunrises and sunsets | `business.description` (host) | match |
| Eranga family home, host Chinthaka; host on Airbnb for 13 years | `business.description`, `business.people[0]`, `business.since` (worded as Airbnb's count) | match |
| Amenities line (10 items, two marked "additional charge") | `facilities[4–9]` | match |
| Koggala Airport 11 km, taxi on request with a charge; Kumbalgama about a 13-minute walk; Midigama station 1.4 km; Weligama centre 3.3 km (Booking.com) | `location.airport`, `distance_to_station`, `distance_to_centre`, `facilities[5]` | match |
| "Coconut Surf Inn Guest House and Restaurant" on Google Maps | `business.google_listing_name` | match |
| Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka | `location.address` (Google's words) | match |
| +94 77 892 1396 / `tel:+94778921396` | `contact.phone` | match |
| Booking.com URL / Airbnb URL | `booking.engine_url`, `booking.other_engines[0]` | match (character for character) |
| 12 testimonials, authors, country, source, month | `reviews.quotes[]` | match 12/12 verbatim on each page |
| Rosa headline (0.4–0.6 m, knee-high, Thu 5 Nov 02:30, swell, wind cross-shore) and spot `weligama-west` | fixture `src/rosa-weligama-west.json`, concepts §3 mapping | match |

### Playbook §4 budget, measured (`audit.json`, 390, throttled)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 1,078 KB | 374 KB | 382 KB |
| JS | ≤ 300 KB | 0 external (≈ 7 KB inline) | 0 external | 0 external (≈ 14 KB inline) |
| largest above-fold image | ≤ 300 KB | 130 KB | 102 KB | 78 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2 · 56 KB | 2 · 65 KB | 2 · 81 KB |
| LCP | ≤ 2.5 s | 600 ms | 520 ms | 1,888 ms |
| CLS / scroll CLS (early, settled) | < 0.1 / < 0.01 | 0.0023 / 0, 0 | 0.0018 / 0.0018, 0 | 0.0011 / 0.0009, 0 |
| third-party on load | 0 (fonts allowed at 4e) | Google Fonts only | Google Fonts only | fonts.gstatic.com only |

### Ranking (dimensions 1–7 only; dimension 8 belongs to the visual critics)

1. **calm 70.2 / 80**
2. **unique 67.4 / 80**
3. **interactive 64.4 / 80**

All three pass the quick gate on dimensions 1–7: no hard fail, and dimensions 1, 3 and 7 are each ≥ 6.

### The one sentence the human needs

All three have the same facts, the same Booking.com and phone links, every budget line met and no hard fail. They differ by:

| | first load | LCP | axe violations | named defect |
|---|---|---|---|---|
| calm | 1,078 KB | 600 ms | 0 | the Family Room slideshow shows a bathroom (img-089) the dossier does not tie to that room |
| interactive | 374 KB | 520 ms | 2 | the rolling 8.5 and 4.8 ratings are hidden from screen readers; 8 px slide dots; empty Rosa box when Rosa fails; img-089 as calm |
| unique | 382 KB | 1,888 ms | 1 (21 nodes) | dimmed set-piece text at 1.7–2.3:1; page 7 px too wide with JS off; empty Rosa box when Rosa fails |

Unique's booking accent `#BE4532` is 7° from Lotus's shipped `#B8431C` (concepts §4.3, notes conflict 3). That is a fact for the pick, not a score.

**What the designer prompt got wrong:**
- **The header call icon.** Nothing in the designer prompt says the hero's booking button must be the first booking action on the phone's first screen. In all three mockups a round call icon in the header comes first in the DOM and on screen (top 10 px), so `tools/funnel.mjs` reads the primary action as `tel`, not the audit's `engine`. Station 5 turns that into a hard fail. The 4e hand-off checks run `audit-mockup` (whose tap-through clicks the first *Booking* link) but not `funnel.mjs`, so nobody saw it.
- **The Lotus axe defect came back.** Its interactive rolling-digit `aria-label` on a role-less span returned unchanged one business later, because 4e still does not run axe.
- **Fallbacks only on the JS-off path.** Two "4e fallback" paths were built for JS off but not for a failed request. Interactive and unique leave Rosa's reserved box empty white when Rosa is unreachable. Calm keeps its plain link visible under the frame, which is the pattern to copy.

**Fix list** (not gating at 4f; for the build, smallest first):
1. **All, dim 3:** put the header call icon after the hero CTA in the phone's first screen, or drop it from the header while the hero is in view (the bar carries Call). Then re-run `funnel.mjs` until `primary_action.class` = `engine`.
2. **Interactive, dim 6:** give `.num[data-roll]` `role="img"` (or a visually hidden "8.5 out of 10" text node) so the ratings are announced.
3. **Interactive and unique, dim 7:** keep the "See today's forecast for Coconuts on Rosa" link visible in the reserved widget box until the iframe's `load` fires, as calm does.
4. **Calm and interactive, dim 1:** drop img-089 from the Deluxe Family gallery, or get the owner to confirm which room it belongs to.
5. **Unique, dim 2:** let `.fc-plain` / `.rosa-box .fallback` / `.bar` wrap or shrink, so the JS-off page is 390 px wide; check the `.ctrl` row at 360.
6. **Interactive, dim 2/5:** make the hero-card rating links read "Booking.com, 142 reviews · Google, 88 reviews" and at least 44 px tall; give the slide dots a 44 px hit area.
7. **Unique, dim 6:** keep inactive set-piece text at ≥ 4.5:1 (dim with the photograph, not the text), or dim only blocks that are off-screen.
8. **Interactive and unique, dim 5:** show Erin's and Janno's quotes once each (calm's split: one with its block, the rest in the guests row).
9. **All, dim 4:** put the type in the first phone screen, for example "A guesthouse in Gurubebila, between Midigama and Weligama" as the hero line (the `heroLine` schema gap, concepts §6).
10. **All, dim 7 (at build):** self-host the fonts.

### Evidence files

`reports/2026-10-midigama-01/critic-coconut-surf-inn-guest-house-and-restaurant-r1/`:
- `a11y-{calm,interactive,unique}.json`: axe, keyboard, overflow, JS-off, reduced motion.
- `net-{…}.json`: first load, Rosa lazy load, blocked Rosa.
- `misc.json`: overflow culprits, the unique set-piece state, the interactive canvas and tab stops.
- `contrast-interactive.json`.
- `facts-diff.txt`.
- `funnel-{…}/funnel.json`.
- `shots/{calm,interactive,unique}/`: scratch, gitignored.

The screenshots, as cited above:
- **mobile-00 of each:** the hero with name, town line and button only.
- **mobile-01 of each:** the first appearance of "A guesthouse…".
- **unique mobile-11:** "Until 22:00" faded under the pinned frame.
- **Blocked-Rosa captures:** calm shows the plain link in the box; interactive and unique show an empty white 500 px box.

## Round 2 — quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 (local, 10:31–10:50) · round-2 mockups `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive,unique}/dist/` (designer 0.7.1). `index.html` last written 10:26 / 02:05 / 02:04 local. Served on :8921 / :8922 / :8923; md5 of each served page equals its `dist/index.html` at the start and at the end of this round. I did not read any visual-critic or experience-critic report. I read each notes.md round-2 section and checked every claim below myself.

Same checks, same order, same viewports for all three (as round 1):
- **`tools/audit-mockup.mjs` re-run** on all three, because interactive's and unique's `audit.json` were older than their round-2 page.
- **`tools/funnel.mjs <url> --depth 3`** (`funnel-*/funnel.json`).
- **`tools/shoot.mjs`** at 1440×900 and 390×844 (`shots/`, scratch; interactive with `?depth=force`). Calm 12,590 / 14,214 px, 16 / 19 captures; interactive 10,465 / 12,398 px, 13 / 17; unique 11,786 / 12,830 px, 15 / 17. 0 console errors.
- **axe-core** WCAG 2.0/2.1 A+AA at 390 and 1440 after a full scroll, with every non-localhost request blocked; keyboard pass; overflow at 320, 360, 390 (JS on) and 390/1440 (JS off); reduced motion (`a11y-*.json`). Unique also: axe `color-contrast` at each of the five set-piece blocks, at both widths.
- **Rosa pass** (`net-*.json`): first load, a gradual scroll to the block, and the same with every `rosa*` host aborted. New this round: a hit test and a real tap on the fallback link with Rosa blocked (`misc.txt`).
- **Facts pass** (`facts-diff.txt`): page text with JS on and off, diffed against `copy/en.json`; every testimonial compared whitespace-insensitively; every href; a grep for the claims that must never appear; every room-gallery photo checked against that room's `dossier.images[].room_types`.
- **`tools/check-design.mjs <exact page path> --no-shots`** on each page only. No `.taste-skill/` was created.

### What changed since round 1, verified

| round-1 finding | calm | interactive | unique |
|---|---|---|---|
| `funnel.mjs` read the header call icon as primary (`tel`) | **fixed**: primary `engine`, hero `engine` "Check dates on Booking.com", clicks_to_book 1, CTA above fold | **fixed**: same | **fixed**: same |
| type not on the first phone screen | **fixed**: hero line "A guesthouse in Gurubebila, between Midigama and Weligama" (mobile-00) | **fixed** (mobile-00) | **fixed** (mobile-00) |
| img-089 shown as the Family Room bathroom | **fixed**: 0 occurrences; all 28 gallery photos carry their room in `room_types` | **fixed**: same, 28/28 | was already clean; still 0 |
| rolling 8.5 / 4.8 hidden from screen readers (axe serious) | n/a | **fixed**: `<span class="num" role="img" aria-label="8.5 out of 10">`, axe 0 violations | n/a |
| small tap targets | **not changed**: 45 of 83 under 44 px wide (slideshow dots 24×44, active 36×44) | **fixed**: 0 of 40 | still 0 of 58 |
| empty Rosa box when Rosa fails | see dim 7 | **fixed**: the frame is never added; the plain link is visible, on top, and a tap lands on `rosa.surf/spot/weligama-west` | **half fixed**: link visible (iframe opacity 0), but a tap lands on the invisible iframe and goes nowhere |
| dimmed set-piece text 1.7–2.3:1 | n/a | n/a | **fixed**: axe `color-contrast` 0 at every block, 390 and 1440 |
| page 7 px too wide (JS off 390; JS 320/360) | 320 JS: 344 px (not a run viewport; noted) | 320/360/390: no overflow | **fixed**: 320, 360, 390 JS on and 390 JS off all equal the viewport |
| Erin's and Janno's quotes twice | n/a | **fixed**: each of 12 quotes once in the page text | **fixed**: same |
| "Booking.com, 142 · Google, 88" without "reviews" | n/a | **fixed**: "Booking.com, 142 reviews" / "Google, 88 reviews" | n/a |

### Shared evidence (round 2, identical for all three)

- **Facts.** 0 mismatches, 0 contradicted values on every page. 12/12 testimonials verbatim with JS off (author, month, source as the dossier), each once. Every line not in the copy is an interface label or a restatement of a copy/dossier value. Not on any page: the "Coconut Beach" place's 4.8 / 120 (only the inn's Google 4.8 / 88, linked to `place_id:ChIJI29C…`), a pool, spa or level claim, a price or currency, a "breakfast included" outside Chloe's verbatim review, house number 44 or 49, WhatsApp. Rosa: calm and interactive show the inlined fixture (0.4–0.6 m, Thu 5 Nov 02:30, `generated_at` 2026-11-04T20:26Z, about 12 h old at test time); unique shows the live JSON it fetched after the scroll (0.3–0.5 m, Thu 5 Nov 08:30, swell 9.1 s from the S, wind 5 km/h cross-shore). Unique's JSON-LD `LodgingBusiness` is unchanged (8.5/10 · 142).
- **Booking.** Every Booking.com href is exactly `dossier.booking.engine_url.value`; every `tel:` is `tel:+94778921396`; Airbnb and Google Maps links match. `audit.json.booking.tapped` lands on the Booking.com URL on all three, `primary_above_fold` true. JS off: `booking_links_reachable` 2; 14 / 14 / 20 Booking.com links. Funnel as in the table above, equal to `recommended` (engine, 1).
- **Delivery.** Static HTML + `img/` (unique + `rooms/`). Third-party on first load: Google Fonts only (`fonts.googleapis.com` + `fonts.gstatic.com` calm/interactive, `fonts.gstatic.com` unique), allowed at 4e. 0 Rosa requests on first load on all three.
- **Rosa (hard constraint 9).** Spot `weligama-west`; widget `https://rosa.surf/widget/?spot=weligama-west&theme=light&units=metric`, filter none, opacity 1, transform none, `elementFromPoint` = the iframe; credit "Forecast for Coconuts by Rosa" → `rosa.surf/spot/weligama-west`; no day-by-day row on the site's half; scroll CLS 0 with the widget loading and with it blocked; JS off shows the plain link on all three. After the scroll: calm requests the widget frame only (headline inlined); interactive requests a no-cors probe to the widget URL, then the frame; unique requests its JSON once, the probe, then the frame. The probe is one request more than "one JSON request plus the widget frame" — a fact for the build, not scored.
- **Hard-fail screen.** No usable video (`videos[]` all `license: unknown`); every first screen carries a ≥ 1920 px business-owned photograph (img-009 calm/unique, img-102 interactive); no borrowed images; no secrets; no keyboard trap. **No hard fail on any page.**
- **check-design** (facts, not taste): all three 0 problems, 0 warnings, ground `hsl(0 0% 100%)`, 0 all-caps labels, 0 labelled headings. Faces: calm Satisfy / Onest (19 headings); interactive **Merienda** / Nunito Sans (19; was Shadows Into Light Two); unique Caveat / Red Hat Text (25).
- **Shared dimension 4 deduction (−1).** The type and place are now on the first phone screen, but the audit's other `above_fold` items (spot, included, price, trust) still begin on screen 01 under "13:00, check-in" in all three (concept choice, unchanged).
- **Shared dimension 3 deduction (−1).** Booking.com cannot preselect a room, so every room button lands on the listing top (1 tap, within target).

### calm — "The view from the roof"

```
mode: quick        round: 2        variant: calm
total (dims 1–7): 73.5 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts. img-089 gone; 28/28 room-gallery photos carry that room in `room_types`. Ratings 8.5/10 · 142, 4.8/5 · 88, 4.44/5 · 54 dated 4 Nov 2026. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `audit.json` (re-run): first load **926 KB** in 25 requests; JS 0 external; fonts 56 KB; largest image 79 KB; **LCP 764 ms**; CLS 0.001; scroll CLS 0.0008 / 0. No overflow at 360, 390, 1440 (JS on/off). Mobile sheet: 19 captures, no overlap; the bar from capture 01. −1: 45 of 83 tap targets under 44 px wide (slide dots 24×44). At 320 the page is 344 px wide (not a run viewport). |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking. Hero button above the fold (mobile-00 in the sky, desktop-00). Funnel engine/engine, 1. The header call icon is hidden on the first screen and appears with the white header (mobile-02 on). −1: the shared listing-top deduction. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order unchanged (view → 13:00 → rooms in two groups → inside → roof → sunset band → night band + restaurant → family → 7:30 break + Rosa → 11:00 → getting here → closing). Rooms now 2 desktop rows (desktop-02/03). custom.md calm: no canvas, one hero action. −1: shared above-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | All copy from `copy/en.json`; each quote once; labels factual. |
| 6 | accessibility | 8 | 8 | 6.4 | axe 390 and 1440: **0 violations**, 27 rule sets pass. Skip link first; 60 tab stops, all in view with a 2 px solid outline. 0/43 images without alt; headings in order; reduced motion: no canvas, no pan. −2: the 45 narrow tap targets (unchanged from round 1). |
| 7 | security + delivery | 7 | 8 | 5.6 | Shared delivery and Rosa. −1: **with Rosa blocked, "See today's forecast for Coconuts on Rosa" is visible in the box but not tappable**: the failed iframe (opacity 1, `pointer-events: auto`, z 1) sits over it; `elementFromPoint` at the link's centre is the iframe and a touch tap leaves the page where it is (`misc.txt`). Round 1 credited this box from its screenshot; the tap test is new this round. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **73.5** | |

### interactive — "Under the thatch"

```
mode: quick        round: 2        variant: interactive
total (dims 1–7): 76.5 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts. img-089 gone; 28/28 gallery photos match `room_types`. Hero card "Booking.com, 142 reviews · 4 Nov 2026", "Google, 88 reviews · 4 Nov 2026". Tiles "4 kinds of room · sleep 2 to 4", "2 kinds · sleep 1 or 2", "Three or four of us · 2 kinds · sleep 3 or 4" match `rooms[]`. Rosa "Swell 1.0 m, 9 s from the S" = fixture 1.04 m / 9.2 s / 172°. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `audit.json` (re-run): first load **663 KB** in 12 requests (up from 374 KB; images 482 KB, the 152 KB veranda print pulled by lazy distance); JS 0 external; fonts 68 KB; largest image 152 KB (≤ 300); **LCP 584 ms**; CLS 0.0005; scroll CLS 0.0005 / 0. **0 of 40 tap targets under 44 px.** No overflow at 320, 360, 390 or 1440, JS on or off. Mobile sheet: 17 captures, no overlap; the 3-part bar from capture 01. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking. Hero button above the fold (mobile-00 on the parapet). "Call +94 77 892 1396" now sits under the check-in button (mobile-01), not in the first-screen header. −1: shared listing-top deduction. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order as round 1 (thatch hero → 13:00 → "How do you like to sleep?" chooser + stage → inside → roof → sunset band → restaurant → family → 7:30 break + Rosa → 11:00 → getting here → closing). custom.md interactive: WebGL depth on its own photograph, tile chooser, drag row. −1: shared above-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | Each of the 12 quotes once; "reviews" added to the hero-card counts. |
| 6 | accessibility | 8 | 9 | 7.2 | axe 390 and 1440: **0 violations** (was 2 serious), 27 rule sets pass. Ratings `role="img"`. Skip link; 3 px solid outlines; the only outline-less stop is Rosa's own iframe (focus goes into the widget). 0/13 images without alt; headings in order; reduced motion: 1 canvas, hidden, photograph visible. −1: axe "needs review" `aria-prohibited-attr` on `<div class="picks" aria-label="Rooms">` (a label on a role-less div is not announced). |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery and Rosa. With Rosa blocked the iframe is never inserted; the plain link is visible, on top (`elementFromPoint` = link) and a tap navigates to `rosa.surf/spot/weligama-west`. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **76.5** | |

### unique — "Round the clock"

```
mode: quick        round: 2        variant: unique
total (dims 1–7): 76.6 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts. 13:00 paragraph unchanged (tagline + spot + hoursNote + closing). All three ratings dated. `rooms/` page: six rooms by guests, same facts and links, no forbidden claims. JSON-LD dossier values only. Live Rosa headline from the fetched JSON. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `audit.json` (re-run): first load **362 KB** in 8 requests; JS 0 external; fonts 81 KB; largest image 78 KB; **LCP 1,672 ms** (slowest of the three, within 2.5 s); CLS 0.0012; scroll CLS 0.001 / 0. **0 of 58 tap targets under 44 px.** No overflow at 320, 360, 390 (JS on) and 390 / 1440 (JS off). Mobile sheet: 17 captures, no overlap; bar from capture 00. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking. Hero button (now ink `#252323`) above the fold (mobile-00); header wordmark and round Call hidden until the hero button scrolls away. "Find your room" is a real link to `rooms/`; with JS the dialog opens with focus on "1 · Just me", Tab stays inside 25/25, "2" lists Deluxe Balcony, Superior, Deluxe 2+1, Budget Double each with "Check dates on Booking.com"; Esc closes and focus returns to "Find your room" (390 and 1440). −1: shared listing-top deduction. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order as round 1; the sticky split now uses natural block heights on the phone; "Today on Coconuts" follows the pin. custom.md "bolder": the WebGL horizon wipe over five own 1920 px photographs; reduced motion stacks them. −1: shared above-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | Each quote once (Erin and Janno only in the set-piece). Labels factual. |
| 6 | accessibility | 8 | 10 | 8.0 | axe 390 and 1440: **0 violations** (was `color-contrast` × 21), and 0 at each of the five set-piece blocks at both widths (`misc.txt`). Skip link; 56–60 tab stops with 3 px solid outlines, all visible; dialog trap and return as above; 0/50 images without alt; headings in order; reduced motion: canvas hidden, blocks stacked. |
| 7 | security + delivery | 7 | 8 | 5.6 | Shared delivery and Rosa. −1: **with Rosa blocked, the fallback link is visible but not tappable**: the iframe stays in place at opacity 0 over it; `elementFromPoint` = the iframe and a touch tap does nothing (`misc.txt`). The notes' "link visible" claim is true; "works" is not. −1: Google Fonts (`fonts.gstatic.com`, 4e only). |
| | **total 1–7** | 80 | | **76.6** | |

### Playbook §4 budget, measured (round 2, `audit.json` re-run, 390, throttled)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 926 KB | 663 KB | 362 KB |
| JS | ≤ 300 KB | 0 external | 0 external | 0 external |
| largest above-fold image | ≤ 300 KB | 79 KB | 152 KB (largest image, a lazy-distance print, not the hero) | 78 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2 · 56 KB | 2 · 68 KB | 2 · 81 KB |
| LCP | ≤ 2.5 s | 764 ms | 584 ms | 1,672 ms |
| CLS / scroll CLS (early, settled) | < 0.1 / < 0.01 | 0.001 / 0.0008, 0 | 0.0005 / 0.0005, 0 | 0.0012 / 0.001, 0 |
| third-party on load | 0 (fonts allowed at 4e) | Google Fonts only | Google Fonts only | fonts.gstatic.com only |

### Ranking (dimensions 1–7 only)

1. **unique 76.6 / 80** (round 1: 67.4)
2. **interactive 76.5 / 80** (round 1: 64.4)
3. **calm 73.5 / 80** (round 1: 70.2)

All three pass the quick gate on dimensions 1–7: no hard fail; dimensions 1, 3 and 7 each ≥ 6. Unique and interactive are 0.1 apart, which is no difference a visitor would see.

### The one sentence the human needs

All three now have the same facts, Booking.com as the funnel's primary action (`engine`, 1 tap), every budget line met, 0 axe violations and no hard fail; what still differs is that calm keeps 45 narrow slideshow dots (24×44 px), calm's and unique's "See today's forecast" link cannot be tapped when Rosa is down (interactive's can), and unique's LCP is 1.7 s against 0.6–0.8 s for the other two.

**What the designer prompt got wrong (round 2):** the 4e Rosa fallback check asks whether the plain link is *visible* when Rosa fails, so calm and unique each left a failed iframe sitting over a visible link (calm at opacity 1, unique at opacity 0) and reported "pass". A fallback is tested by tapping it, not by looking at it: the hand-off check should tap the link with Rosa blocked and confirm the navigation, or require that the iframe is not in the DOM (or has `pointer-events: none`) until its probe succeeds, as interactive does.

**Fix list** (not gating at 4f; for the build, smallest first):
1. **Calm and unique, dim 7:** with Rosa unreachable, remove the iframe or set `pointer-events: none` on it until the probe answers, so the fallback link is tappable (copy interactive's pattern).
2. **Interactive, dim 6:** give `div.picks` a role (`role="group"`) or drop its `aria-label`.
3. **Calm, dims 2/6:** give the slideshow dots a 44 px wide hit area (padding or a pseudo-element), as interactive did.
4. **Interactive and unique, dim 7 (build):** fold the no-cors probe into the widget load so the block makes one JSON request plus the frame.
5. **All, dim 7 (build):** self-host the fonts.

### Evidence files (round 2)

`reports/2026-10-midigama-01/critic-coconut-surf-inn-guest-house-and-restaurant-r2/`:
- `a11y-{calm,interactive,unique}.json`: axe, keyboard, overflow 320/360/390/1440, JS-off, reduced motion.
- `net-{…}.json`: first load, Rosa lazy load, blocked Rosa.
- `misc.txt`: unique dialog keyboard pass; odd tab stops and the interactive `aria-prohibited-attr` node; unique set-piece contrast per block; Rosa-blocked hit test and tap.
- `facts-diff.txt`: page lines not literally in the copy, hrefs, head and JSON-LD.
- `funnel-{…}/funnel.json`.
- `shots/{calm,interactive,unique}/` + `shots-*.log`: scratch, to be cleaned with `tools/clean-shots.mjs`.

The screenshots, as cited:
- **mobile-00 of each:** the hero with the name, "A guesthouse in Gurubebila, between Midigama and Weligama" and the booking button; no call icon in calm's or unique's header, none in interactive's.
- **calm desktop-02/03:** the four A/C rooms in one row, the two fan rooms in the next.
- **unique desktop-06 to -10:** the set-piece with the inactive blocks in readable grey and the sun marker on the current hour.
- **Rosa blocked (scratch):** calm and unique show the plain link in the reserved box; a tap on it does nothing.

## Round 3 — quick (station 4f)

critic 0.4.3 · rubric 0.3.1 · 2026-11-05 (local, 11:06–11:20) · round-3 mockups `sites/coconut-surf-inn-guest-house-and-restaurant/mockups/{calm,interactive}/dist/` (designer 0.7.1; `index.html` written 11:02:14 / 11:03:16 local). They were served on :8921 / :8922, and the md5 of each served page equals its `dist/index.html`. **Unique was not revised**: its `index.html` is still the 02:04:57 build. It is not re-scored, and its round-2 **76.6 / 80** carries forward. I did not read any visual-critic or experience-critic report. I read my round-2 section and each notes.md round-3 section, and I tested each claim below myself.

Same checks, same order and same viewports for both:
- **`audit.json`**: both were measured after their page's last write (calm 09:02:24Z, interactive 09:03:52Z), so I read them and did not re-run them.
- **`tools/funnel.mjs <url> --depth 3`** (`funnel-*/funnel.json`).
- **`tools/shoot.mjs`** at 1440×900 and 390×844 (scratch; interactive with `?depth=force`). Calm: 11,489 / 13,394 px, 15 / 18 captures. Interactive: 10,487 / 12,450 px, 13 / 17 captures. 0 console errors.
- **axe-core** (WCAG 2.0/2.1 A+AA) at 390 and 1440 after a full scroll, with every non-localhost request blocked. Also a keyboard pass, overflow at 320 / 360 / 390 / 1440, JS off, and reduced motion (`a11y-*.json`).
- **Tap targets and slideshow controls** at 390 (touch) and 1440 (`taps.txt`): every link and button measured, then a real tap on dot 2 (or Next) of every slideshow.
- **Rosa pass** (`net-*.json`, `misc.txt`): first load, a gradual scroll, the same with every `rosa*` host aborted, a hit test, a touch tap at 390 and a click at 1440 on the fallback link, and the headline with the clock moved 30 h ahead.
- **Facts pass** (`facts-diff.txt`): page text with JS on and off against `copy/en.json`, testimonials checked whitespace-insensitively, hrefs, head, and a grep for the claims that must never appear.
- **`tools/check-design.mjs <exact page path> --no-shots`** on each page only. Neither `funnel/` nor `.taste-skill/` was created at the repo root; I checked before and after.

### What changed since round 2, verified

| round-2 finding / round-3 claim | calm | interactive |
|---|---|---|
| A hero **Call** (`tel`) now sits on the first screen: does `funnel.mjs` still read `engine`? | **yes**. Primary `engine` and hero `engine` ("Check dates on Booking.com", 0 taps to flow), clicks_to_book 1, CTA above the fold. On the 390 first screen the booking button (top 266) comes before Call (top 334), both 56 px tall | **yes**. Same result. Booking (top 649) comes before Call (top 715), both 54 px tall and above the 844 fold |
| "See today's forecast" not tappable with Rosa blocked | **fixed**. 0 iframes. `elementFromPoint` = the link. A touch tap at 390 and a click at 1440 both navigate to `https://rosa.surf/spot/weligama-west` | still works: same result at 390 and 1440 |
| Slideshow dots under 44 px | **fixed**. 0 of 70 (390) and 0 of 93 (1440) links and buttons under 44 px, and `audit.json` gives 0 of 62. Every dot button is 44×44. The phone's passive pips are `aria-hidden` spans, not controls. A real tap on dot 2 (or Next, where only arrows show) advanced each of the 8 slideshows at both widths | still 0 under 44 px (45 at 390 / 54 at 1440). Dots 44×44 or 50×44, review arrows 48 px, "1 of 10" counter on the phone |
| `div.picks` `aria-label` on a role-less div | n/a | **fixed**. `role="group"`, and axe `aria-prohibited-attr` incomplete is now empty |
| Name twice on the first screen | the wordmark is hidden while the hero is in view (mobile-00 and desktop-00 show "Coconut Surf Inn" once) | same (mobile-00 and desktop-00) |

### Shared evidence (round 3, calm and interactive)

- **Facts.**
  - 0 mismatches and 0 contradicted values. The 12 copy testimonials equal `dossier.reviews.quotes[]` (text, author, month, source). Each appears exactly once in the DOM on both pages, with JS on or off.
  - Every page line not literally in the copy is an interface label or a restatement of a copy or dossier value. The only new line since round 2 is interactive's "Airbnb, 54 reviews", which is `reviews.airbnb`.
  - **Google 4.8 / 5 is the inn's: 88 reviews, linked to `place_id:ChIJI29C…`.** The "Coconut Beach" place's 4.8 / 120 appears nowhere: the number 120 occurs only inside a script timer. "coconut beach" appears only inside two guests' verbatim reviews.
  - None of these appears: pool, spa, level, price or currency, WhatsApp, house number 44 or 49, or a "breakfast included" outside Chloe's verbatim review.
  - Every Booking.com href equals `dossier.booking.engine_url`, and every `tel:` is `tel:+94778921396`. The Airbnb and Google Maps links match.
  - Both pages show the Rosa headline from the fixture `src/rosa-weligama-west.json` (same md5 in both, `generated_at` 2026-11-04T20:26:28Z, 12.8 h old at test time).
- **Delivery.**
  - Static HTML plus `img/`.
  - First-load third parties are Google Fonts only, which is allowed at 4e.
  - 0 Rosa requests on first load. After the scroll there is the no-cors probe to the widget URL, then the widget frame and Rosa's own sub-requests, made by the widget. The probe is the one extra request already noted in round 2.
  - Scroll CLS 0 with the widget loading and with it blocked.
  - JS off: the plain link is shown, 14 Booking.com links and 7 `tel:` links.
- **Rosa (hard constraint 9).**
  - Spot `weligama-west`. Widget `https://rosa.surf/widget/?spot=weligama-west&theme=light&units=metric`, with filter none, opacity 1 and transform none.
  - Credit "Forecast for Coconuts by Rosa" → `/spot/weligama-west`. No day-by-day row on the site's half.
- **Hard-fail screen.**
  - No usable video (`videos[]` are all `license: unknown`).
  - Both first screens carry a business-owned 1920 px photograph: img-009 for calm, img-102 for interactive.
  - No borrowed images, no secrets.
  - No keyboard trap. The only outline-less tab stops are Rosa's own iframe, where focus moves into the widget. Interactive's slideshow arrows fade in on focus and are at full opacity within 250 ms.
  - **No hard fail on either page.**
- **check-design** (facts, not taste):
  - calm: 0 problems, 0 warnings. Satisfy / Onest, ground `hsl(0 0% 100%)`, 0 all-caps labels, 0/19 labelled headings.
  - interactive: 0 problems, 0 warnings. Merienda / Nunito Sans, same ground, 0 all-caps labels, 0/19 labelled headings.
- **Shared deductions, unchanged:**
  - dim 4 −1: spot, included, price and trust still begin on screen 01.
  - dim 3 −1: Booking.com cannot preselect a room, so room buttons land on the listing top.

### calm — "The view from the roof"

```
mode: quick        round: 3        variant: calm
total (dims 1–7): 77.3 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts. Ratings 8.5/10 · 142, 4.8/5 · 88 and 4.44/5 · 54, each dated 4 Nov 2026. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `audit.json`: first load **893 KB** in 25 requests. JS 0 external. Fonts 56 KB. Largest image 79 KB. **LCP 596 ms**. CLS 0.0014. Scroll CLS 0.0005 / 0. **0 of 62 tap targets under 44 px.** No overflow at 360, 390 or 1440, with JS on or off. Mobile sheet: 18 captures, no overlap; the phone bar steps aside over the closing section and footer. At 320 (not a run viewport) the header and phone bar reach 322 px (was 344). |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking. Hero booking button then an outlined Call (mobile-00, desktop-00). Funnel engine / engine, 1 click. −1: shared listing-top deduction. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order unchanged: view → 13:00 → rooms (A/C row, then the fan row as two wide cards with a header line, desktop-03) → inside → roof → sunset → restaurant → family → 7:30 break + Rosa → 11:00 → getting here → closing. custom.md calm: no canvas, one primary hero action; Call is secondary in weight. −1: shared above-the-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | All copy from `copy/en.json`, each quote once, labels factual. |
| 6 | accessibility | 8 | 10 | 8.0 | axe at 390 and 1440: **0 violations**, 25 rule sets pass (incomplete: `color-contrast` over photographs only). Skip link first. 60 tab stops, all visible, 2 px solid outline. 0/43 images without alt. Headings in order. Reduced motion: no canvas, animations 0.01 ms. 0 small targets. Slideshow dots work by tap. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery and Rosa evidence. With Rosa blocked, no frame is added, and the plain link is on top and navigates. With the clock 30 h ahead, the inlined headline hides itself (`misc.txt`), as playbook §4 asks. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **77.3** | |

### interactive — "Under the thatch"

```
mode: quick        round: 3        variant: interactive
total (dims 1–7): 76.6 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts. The 11:00 block now sets 8.5/10 · Booking.com, 142 reviews; 4.8/5 · Google, 88 reviews; 4.44/5 · Airbnb, 54 reviews, each dated 4 Nov 2026. Tile counts and room chips match `rooms[]` as in round 2. Rosa "Swell 1.0 m, 9 s from the S" = fixture 1.04 m / 9.2 s / 172°. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `audit.json`: first load **669 KB** in 12 requests. JS 0 external. Fonts 68 KB. Largest image 152 KB (the lazy-distance veranda photo). **LCP 564 ms**. CLS 0.0002. Scroll CLS 0.0001 / 0. **0 of 42 tap targets under 44 px.** No overflow at 360, 390 or 1440, with JS on or off. Mobile sheet: 17 captures, no overlap. At 320 (not a run viewport) the room stage `article.room` / `.show.r43` reaches 335 px; round 2 had none at 320. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking. Hero booking button then a translucent Call (mobile-00, desktop-00). The check-in block has "See rooms and live dates on Booking.com" + "Call +94 77 892 1396" (mobile-01). Funnel engine / engine, 1 click. −1: shared listing-top deduction. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order as round 2. Verandas are a flush 4-up. The reviews are a paged carousel inside the grid (3 up at 1440, "1 of 10" on the phone). Restaurant: one 4:5 photo, then the night band. custom.md interactive: depth parallax, tile chooser, rolling digits, carousel. −1: shared above-the-fold deduction. |
| 5 | copy | 10 | 10 | 10.0 | Each of the 12 quotes once; labels factual. |
| 6 | accessibility | 8 | 10 | 8.0 | axe at 390 and 1440: **0 violations**, 27 rule sets pass (incomplete: `color-contrast` over photographs only). `div.picks` is `role="group"`. Ratings are `role="img"` with `aria-label`. Skip link. 3 px solid outlines. 0/13 images without alt. Headings in order. Reduced motion: 1 canvas, hidden, photograph visible. 0 small targets. |
| 7 | security + delivery | 7 | 8 | 5.6 | Shared delivery and Rosa evidence. With Rosa blocked, no frame is added, and the plain link is on top and navigates. −1: **the forecast headline has no 24 h check.** It is written into the HTML at build from the fixture, and `page.js` never compares `generated_at` with the time. With the clock moved 30 h ahead it still shows "0.4–0.6 m · Thu 5 Nov, 02:30" as the current reading, whether Rosa is live or blocked (`misc.txt`). Playbook §4: "never stale numbers shown as current". Calm does this check; interactive does not. Found this round; rounds 1–2 assumed it. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **76.6** | |

### Playbook §4 budget, measured (round 3, `audit.json`, 390, throttled)

| line | target | calm | interactive | unique (round 2, unchanged) |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 893 KB | 669 KB | 362 KB |
| JS | ≤ 300 KB | 0 external | 0 external | 0 external |
| largest image | ≤ 300 KB | 79 KB | 152 KB | 78 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2 · 56 KB | 2 · 68 KB | 2 · 81 KB |
| LCP | ≤ 2.5 s | 596 ms | 564 ms | 1,672 ms |
| CLS / scroll CLS (early, settled) | < 0.1 / < 0.01 | 0.0014 / 0.0005, 0 | 0.0002 / 0.0001, 0 | 0.0012 / 0.001, 0 |
| third-party on load | 0 (fonts allowed at 4e) | Google Fonts only | Google Fonts only | fonts.gstatic.com only |

### Ranking (dimensions 1–7 only)

1. **calm 77.3 / 80** (round 2: 73.5)
2. **unique 76.6 / 80** (round 2; not revised)
2. **interactive 76.6 / 80** (round 2: 76.5)

All three pass the quick gate on dimensions 1–7. None has a hard fail, and dimensions 1, 3 and 7 are each ≥ 6. The three are within 0.7 points of each other.

### The one sentence the human needs

All three now have the same facts (Google 4.8 is the inn's 88 reviews, never the beach's 120), Booking.com as the funnel's primary and hero action even with the new hero Call, every budget line met, 0 axe violations, 0 tap targets under 44 px and no hard fail. What still differs:
- unique's LCP is 1.7 s against 0.6 s for the other two;
- unique's "See today's forecast" link cannot be tapped when Rosa is down (round 2, not revised);
- interactive's forecast headline would show the build-day reading as current once it is more than 24 h old.

**What the designer prompt got wrong (round 3):** the 4e Rosa checks test the fixture's values and the failed-request path, but not the clock. A headline baked in at build from a fixture needs the same "older than 24 h → plain link" rule as a live fetch. The hand-off check should load the page with `Date.now` moved a day ahead and confirm that the headline gives way to the link. Calm does this; interactive passed its own checks without it.

**Fix list** (not gating at 4f; for the build, smallest first):
1. **Interactive, dim 7:** compare `#rosa-now[data-generated]` with `Date.now()` on load, and show the plain link when the reading is older than 24 h (copy calm's `fresh()`).
2. **Unique, dim 7 (round 2, open):** take the iframe out, or set `pointer-events: none` on it, until the probe answers, so the fallback link can be tapped.
3. **Interactive, dim 2:** let `article.room` / `.show.r43` shrink at 320 px (not a run viewport).
4. **All, dim 7 (build):** fold the no-cors probe into the widget load; self-host the fonts.

### Evidence files (round 3)

`reports/2026-10-midigama-01/critic-coconut-surf-inn-guest-house-and-restaurant-r3/`:
- `a11y-{calm,interactive}.json`: axe, keyboard, overflow at 320/360/390/1440, JS off, reduced motion.
- `net-{calm,interactive}.json`: first load, Rosa lazy load, blocked Rosa.
- `misc.txt`: the Rosa-blocked hit test, tap (390) and click (1440); the headline with the clock moved 30 h ahead; odd tab stops.
- `taps.txt`: tap-target sizes, dot and pip inventory, a real tap on every slideshow's controls, and the 320 px overflow culprits.
- `facts-diff.txt`: page lines not literally in the copy, hrefs, head, and testimonial counts.
- `funnel-{calm,interactive}/funnel.json`.
- `shots-*.log`. The captures were deleted after scoring.

The screenshots, as cited:
- **mobile-00 of each:** the name once, "A guesthouse in Gurubebila, between Midigama and Weligama", then the booking button and below it a quieter Call. Calm shows sky, palms and the sea at the foot; interactive shows the thatch fringe and the parapet.
- **desktop-00 of each:** the same pair side by side. Calm's crop now reaches the sea, the reef and the beach shack.
- **calm desktop-03:** the fan rooms as two wide cards under a header line.
- **interactive mobile-13/14 and desktop-11:** the 11:00 ratings set large, then the review carousel with "1 of 10" (phone) or 3 up with dots (desktop).
