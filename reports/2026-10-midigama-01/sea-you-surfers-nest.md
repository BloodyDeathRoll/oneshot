# sea-you-surfers-nest — critic scorecards (run 2026-10-midigama-01)

## Round 1 — quick (station 4f)

critic 0.4.3 · rubric 0.3.2 · 2026-11-22 · mockups `sites/sea-you-surfers-nest/mockups/{calm,interactive,unique}/dist/` as committed in 047d6b9 (designer 0.7.1). I served each `dist/` with the repo's plain static server (`tools/_serve.mjs`) on :8995 / :8996 / :8997, and each served `index.html` is byte-identical to its `dist/index.html` (`cmp`). I did not read any visual-critic or experience-critic report. One disclosure: a `git status` / `git diff usage.jsonl` during this round showed the two other reviewers' one-line `usage.jsonl` notes. I did not open their reports, and dimension 8 is not scored here.

Same checks, same order, same viewports for all three:
- **`audit.json`, measured fresh.** The designer's `audit.json` files (00:38–00:54 UTC) predate the last rebuild: calm's HTML is 58,276 B now against 58,324 B measured. So I re-ran `tools/audit-mockup.mjs` unchanged except that it writes to `critic-sea-you-surfers-nest-r1/<variant>/audit.json`, not into the mockup folder, and on port 8991.
- **Screenshots.** My own `tools/shoot.mjs` pass at 1440×900 and 390×844 over http (scratch, deleted after the round). Calm: 11 desktop / 12 mobile captures, page 8,390 / 8,934 px. Interactive: 10 / 13, page 7,727 / 9,369 px. Unique: 17 / 20, page 13,137 / 14,766 px. No run was truncated, and every run logged 0 console errors.
- **axe-core 4.10.2** (WCAG 2.0/2.1 A + AA) at 390 and 1440, after a full wheel scroll, with every non-localhost request blocked and logged.
- **A keyboard pass** at both widths, plus a solid-background contrast and type-size pass over every visible text node.
- **A JS-off pass** at both widths.
- **A tap-through.**
- **`tools/check-design.mjs --no-shots`.**
- **Quotes and copy, by script.** A script compared every testimonial with `copy/en.json` and `dossier.json`, and diffed the page text line by line against `copy/en.json`.
- **Unique only: the booking door.** I opened it with the keyboard and checked the Tab trap, Esc and focus return.

The business has **no own website** (`audit.json` scope `no_site`). Its current presence is the unclaimed Google listing, Booking.com, Agoda and two Airbnb listings, walked in `dossier/sea-you-surfers-nest/funnel/walk.json`. The visual side-by-side with that presence belongs to dimension 8. The factual comparison for dimensions 1–7 is below the scorecards.

**Deliberate state, not scored as a defect:** `PHONE_CONFIRMED = False` in all three `build.py`. There are 0 `tel:` links, and the string `715880052` appears nowhere in any page's HTML. The number is visible only on the sign photograph img-001, as the business printed it. The closing copy (5b022e1) no longer mentions a call, and all three pages render the new sentence. `recommended.secondary_actions` `tel` is therefore empty, as the audit's funnel step 4 allows.

**Rubric arithmetic note:** dimension weights 1–7 sum to 80. The totals below are out of 80. Rubric 0.3.2 turns the full total into /100 as (weighted sum × 100 ÷ 105) once dimension 8 is added.

### Shared evidence (identical for all three)

- **Facts.** The table below lists 0 mismatches and 0 unsourced claims in the page text. All 5 testimonials on each page equal `copy/en.json` character for character (`quotes.json`). Kenza's line break renders as a break in all three. Each copy quote is a dossier review string. Four are exact. Kenza's differs only by the dossier's trailing space before `\n`. Author, source and month match 5/5 on every page. `audit.json.facts`: the only numbers outside the copy are "8.0" (Booking.com's `8` printed as 8.0/10, `reviews.booking.rating` 8.0) and, on calm, "2026." (the read date). Every non-copy line is one of two kinds. It is either an interface label ("See live dates", "At a glance", "In every room", "Who's coming?", "Deluxe or Standard", "More ways to book", "Scroll, and the bed turns") or a restatement of a copy field (rating blocks, " | " amenity lines, "1 large double bed | Sleeps 2", "Check-out 06:00–10:00", "7 rooms / All doubles | sleeps 14", "Spoken here: English", "Photographs: the house's own").
- **Room galleries.** Every room photo is one that Booking.com tags to that room (`room_types[].note`). Calm and interactive leave the bathroom photos img-008 and img-011 out of the Standard room. Unique does not (see its dimension 1).
- **Booking.** Every Booking.com href is exactly `https://www.booking.com/hotel/lk/sea-you-surfers-nest.en-gb.html` = `booking.engine_url`. The two Airbnb hrefs equal `booking.other_engines[0–1].url` and `copy.bookingLinks[1–2]`, and the Maps href equals `copy.contact.mapUrl`. Agoda is never linked, as the audit asks. There is no WhatsApp or email link, matching the dossier gaps. In `audit.json.booking.tapped` (390, touch), the hero action lands on the engine URL character for character. `primary_above_fold` is true. Primary class: **engine** = `recommended.primary_action`. Clicks to book: **1** = `recommended.clicks_to_book`. With JS off, the first visible booking link is a real `<a>` at y 444 / 195 / 416 (390) and y 491 / 265 / 472 (1440).
- **Delivery.** Each page is static: one HTML file with CSS and JS inline, plus `img/` (WebP). Unique also has `stay/index.html`. There is no server code and no CMS call. No `src`, `href` or `srcset` starts with `/`. Every filename is lowercase. 0 hits for localhost, key, token, secret or password. The only third-party host, on first load and over a full scroll, is `fonts.googleapis.com` / `fonts.gstatic.com`. That is allowed at 4e (critic `tools.md`) and is a defect only in full mode. There are 0 iframes (0 of the 2 allowed embeds) and no Rosa forecast (concepts §3: the business names no break).
- **Hard-fail screen.** The visual-media rules cannot apply. `dossier.videos[]` is empty, and every first screen is an own photograph from a 2000 px source: calm img-004, interactive img-003, unique img-015, with phone crops img-034 / img-003 / img-005. There are no stock or atmosphere images (no `stock/`, all 82 dossier images are `business-owned`). There are no secrets, no keyboard trap, and no content that lives only in a canvas.
- **check-design default look** (facts, not taste): 0 problems and 0 warnings on all three, and all three have a white ground (`hsl(0 0% 100%)`), 0 all-caps labels and 0/13 labelled headings. Calm: h1 Grand Hotel, body Karla. Interactive: h1 Kalam, body Plus Jakarta Sans. Unique: h1 and h2 Leckerli One, body Instrument Sans. Output in `check-design.txt`.
- **Type and contrast on solid grounds** (`contrast-type.json`): 0 text nodes under 4.5:1 (3:1 for large) on all six page × width pairs. The smallest text is 12.5–13.5 px, and long paragraphs are 15–22 px.
- **Shared dimension 4 deduction (playbook §2/§3: type + place in one line above the fold).** The tagline "A bed and breakfast in Midigama, on Sri Lanka's south coast." first appears on screen 01 in calm (both widths) and unique (both widths). The heroes carry only "Sea You Surfers Nest / Midigama, Sri Lanka" and a button. "Surfers Nest" alone can read as a surf camp, and `businessType` is `beach_lodging` with no lessons. Interactive shows the tagline on mobile-00 (under the hero, at 390) but not on desktop-00. `recommended.above_fold` (spot, included, price, trust) starts on screen 01 in all three, which is concepts §3's stated choice.
- **Stale notes, a station fact.** `calm/notes.md` conflict 1 and `interactive/notes.md` conflict 1 ("BLOCKING") still describe the closing's "…call." clause. The pages render the new closing without it, so the notes are out of date and the pages are right.

### calm — "The board rack"

```
mode: quick        round: 1        variant: calm
total (dims 1–7): 71.9 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 5/5 quotes verbatim, ratings 4.9/5 · 11, 8.0/10 · 8 and 5.0/5 · 10, each dated "21 Nov 2026" = `fetched_at` 2026-11-21. Deluxe 13 m² with its own bathroom, private entrance, terrace and balcony = `room_types[0]` (`bathrooms: 1`). Standard 12 m², private entrance, wardrobe = `room_types[1]`. The Standard gallery (img-009, 026, 005, 025) keeps the bathroom shots img-010 and img-011 out (notes conflict 2). img-009 shows a green door in the background, as Booking.com's own photo does. Gaps (price, A/C room, check-in, season) are omitted, not filled. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `critic-…-r1/calm/audit.json` (390, 1.6 Mbps / 150 ms / 4× CPU): first load **361 KB** (370,016 B, ≤ 1.5 MB) in 16 requests. 0 external JS. Fonts 43 KB, 2 families. Largest image 73 KB. **LCP 644 ms.** CLS 0.0061. Scroll CLS early 0 / settled 0. No overflow at 390 or 1440. Mobile sheet: no overlap or clipped text in 12 captures, and the phone bar ("See live dates" + ˄ summary) shows from mobile-01. −1: 15 of 42 tap targets are under 44 px. These are the slideshow and review dots (24×44); each slideshow also has 44 px arrows. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" (`aria-label` = the copy's full label) is above the fold at 390 (mobile-00, under the title) and at 1440 (desktop-00, centred). The glance section, each room row and the closing all carry the full-label button. The closing adds both Airbnb listings. −1: every action lands on the listing's top, without room or dates. The dossier records no deep-link parameters. It is still 1 click and within target. |
| 4 | brand fit | 5 | 8 | 4.0 | §3 order, as concepts §3: veranda with boards + name + place + CTA → at a glance (tagline, spot line, included, live dates, 3 dated ratings, full button) → Seven rooms (A/C sentence at body size) + "In every room" → Deluxe (6 photos) and Standard (4) → courtyard band + balconies → carved door / masks / board shower prints → breakfast in type → Ashly + ratings + 5 guests → sign + Finding the house → closing card → footer. custom.md calm: no canvas (`reduced_motion.canvases` 0), and one CTA on the first screen (the header button is held back until the header turns solid). −2: the shared above-the-fold deduction. |
| 5 | copy | 10 | 9 | 9.0 | Every sentence is `copy/en.json` (passed 4c) unedited, or an interface label. Plain and specific: m², beds, "Only one has air conditioning", Booking.com's distances with their source. English is complete. −1: the three-rating block appears twice (glance, mobile-01, and Ashly, mobile-07), which a visitor reads as repetition. |
| 6 | accessibility | 8 | 7 | 5.6 | axe 390: **1 serious, `scrollable-region-focusable`** on `.prints`, the carved-door / masks / shower row, which is a horizontal swipe row on the phone with nothing focusable. A keyboard user cannot scroll it. This is the same defect as Lotus calm's `.three` at 4f. axe 1440: 0 violations, 25 rule sets pass. Keyboard: "Skip to the rooms" → `#rooms` is the first stop. There are 45 stops at 390 and 42 at 1440, all visible, all with a 3 px solid outline, and none invisible. 0/19 images without alt. Headings H1 → H2/H3 in order, `lang="en"`. Reduced motion: no canvas, photograph visible. With JS off, the header "See live dates" is opacity 0 but still 44 px tall and focusable at 1440, so it is an invisible tab stop. −1: the 15 dots at 24×44. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. `dist/` is 1.4 MB. −1: fonts come from Google, which is allowed at 4e but must be self-hosted at build. |
| | **total 1–7** | 80 | | **71.9** | |

### interactive — "In the palms"

```
mode: quick        round: 1        variant: interactive
total (dims 1–7): 72.4 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check: 0 mismatches, 5/5 quotes verbatim. Fact row: "7 rooms / All doubles \| sleeps 14" = `room_count` 7 / 14 pax. "Free WiFi in public areas \| Kitchen" = `amenities`. "Live dates on Booking.com" is the price stand-in, with no rate copied. The "Who's coming?" answers send "Two of you" to Booking.com, "A group" to the whole-house Airbnb listing and "A question first" to "Ask Ashly on Airbnb", which is Airbnb listing 1 with `contact.airbnb_messaging`. The Standard stage includes img-010, whose WC door beside the bed is Booking.com's own photo tagged to Standard. The alt states only the door, and no bathroom is claimed in the text. |
| 2 | mobile + performance | 15 | 9 | 13.5 | `critic-…-r1/interactive/audit.json`: first load **767 KB** (785,047 B) in 22 requests. 0 external JS (inline; the designer reports 18 KB gzipped). Fonts 40 KB. Largest image 66 KB. **LCP 960 ms.** CLS 0.0031. Scroll CLS early 0 / settled 0 in my run. 0 of 37 tap targets under 44 px. No overflow at 390 or 1440. Mobile sheet, 13 captures: no overlap, and the bar (name + place + "See live dates") is present from mobile-01. −1: the designer's own run measured early scroll CLS **0.0085** from `section#house` (`li` / `span`). That is under 0.01 but not stable across runs, and close to the line. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" is above the fold at 390 (y 195) and 1440. The "Who's coming?" tiles are `<button>`s that switch the answer. With JS off, the three answers stack as plain links (`audit.json.no_js.booking_links_reachable` 4). Each room has a full-label button. −1: the listing's top, as calm. |
| 4 | brand fit | 5 | 9 | 4.5 | §3 order: moving palms + name + place + CTA → tagline + 4 fact cards + 3 dated ratings + "Who's coming?" → Seven rooms (sticky Deluxe/Standard pill, 4:5 stage, room line, button) + "In every room" → courtyard + drag shelf of nine → board shower + masks → breakfast in type → Ashly + ratings + 5 guests → sign + Finding the house → closing over the palms band with the panel again → footer. custom.md interactive: WebGL frond motion on its own photograph, tiles, pill, drag shelf (canvas hidden under reduced motion). −1: the type line is on the first phone screen (mobile-00) but not the first desktop screen (desktop-01). |
| 5 | copy | 10 | 9 | 9.0 | Copy from `copy/en.json` unedited. The interface labels are short and factual. −1: "Only one has air conditioning, so ask when you book if you want the one that has it." appears three times: in Seven rooms and in both "Who's coming?" panels (glance and closing, mobile-02 and mobile-12). The whole panel is repeated. |
| 6 | accessibility | 8 | 7 | 5.6 | axe 390: 0 violations, 27 pass. axe 1440: **2 serious, `color-contrast` 2.48:1**: `.q:nth-child(2) .q-by span`, the byline of the peeking next quote card, which sits at opacity 0.5 on screen at x 1220–1440 and is not `aria-hidden` or `inert`. **No skip link.** `audit.json` reports `has_skip_link: true` only because the tool counts any `#` anchor. The DOM has no "skip" link, and at 390 the first Tab stop is the hero button, with 39 stops on the page. Otherwise: every stop is visible with a 3 px outline (39 at 390, 46 at 1440), the tiles and the pill are buttons, 0/25 images lack alt, headings are in order, and with reduced motion 1 canvas is hidden and the photograph shows. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. `dist/` is 1.5 MB. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **72.4** | |

### unique — "Every side of the four-poster"

```
mode: quick        round: 1        variant: unique
total (dims 1–7): 72.5 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 9 | 18.0 | Shared facts check: 0 mismatches in the text, 5/5 quotes verbatim. The turn's four captions are the `offer` block split at sentence ends, with no word changed. "Facilities" line = `amenities[]` (8, two marked "additional charge"). "Spoken here: English" = `languages_spoken`. `stay/` holds the three listings plus the A/C sentence. −1: **the Standard Double Room slideshow ends on img-008**, alt "A white bathroom with a toilet, an instant shower heater and a rain shower head", and also shows img-010 (WC door). Booking.com does tag both to Standard. But `room_types[1].bathrooms` is **0**, Marina writes "my bathroom was located outside the room", and concepts §2 says "No concept … puts a bathroom on the Standard room". A visitor can read the Standard room as en-suite. Calm leaves both out for this reason. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `critic-…-r1/unique/audit.json`: first load **282 KB** (289,086 B) in 8 requests. HTML 88 KB with all CSS and JS inline (raw WebGL, no library; the designer reports 8.6 KB gzipped). Fonts 47 KB, 2 families. Largest image 54 KB. **LCP 756 ms.** **CLS 0.** Scroll CLS early 0.0003 / settled 0. 0 of 43 tap targets under 44 px at 390. No overflow at 390 or 1440. Mobile sheet, 20 captures: no overlap, and the bar ("See live dates" + "More") is present from mobile-01. The WebGL frame renders headless (mobile-03…07, desktop-01…06), with 0 page errors. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" is above the fold at 390 (y 416) and 1440 (y 472), and it is a plain link to the engine. "Book" / "More ways to book" / "More" are real links to `stay/`, which works with JS off and holds all three listings. With JS they open the door, tested below. −1: the listing's top, as calm. |
| 4 | brand fit | 5 | 7 | 3.5 | §3 order: four-poster + name + place + CTA → glance beside the bed (tagline, spot line, included, live dates, 3 ratings, two actions) → four rests of the turn with the offer sentences → "Deluxe or Standard", two slideshows of six + "In every room" + Facilities → courtyard masonry → carved door / shower prints → breakfast in type → Ashly + ratings + guests → sign + Finding the house → gabled closing → footer. custom.md unique ("bolder"): the pinned rotation is the main item, and both canvases are hidden under reduced motion. −2: the shared above-the-fold deduction. −1: the page is 14,766 px at 390, against 8,934 for calm, and the room rows with their own buttons first arrive at mobile-08 of 20. The phone bar keeps booking 1 tap away throughout. |
| 5 | copy | 10 | 9 | 9.0 | Copy from `copy/en.json` unedited, plus short interface labels. −1: the glance's four amenities (Free WiFi (in public areas), Kitchen, Fan and mosquito net, Free private parking on site; mobile-01) are said again in the Facilities line under "In every room" (mobile-10). |
| 6 | accessibility | 8 | 9 | 7.2 | axe at 390 and 1440: **0 violations** (26 rule sets pass). "Skip to the details" → `#glance` is the first stop. There are 45 stops at 390 and 51 at 1440, all visible with a 3 px outline. **Door, keyboard at both widths:** Enter on the header "Book" opens `role=dialog aria-modal=true aria-labelledby=door-h`, focus lands on "See rooms and live dates on Booking.com", 20/20 Tabs stay inside, Esc closes it, and focus returns to "Book". 0/32 images without alt. Headings start at H1 and stay in order. With reduced motion, 2 canvases are hidden and the photograph shows. The turn's captions are DOM text. −1: the desktop header nav links are 74–97 × 39 px at 1440. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. `stay/` is relative (`stay/`, `../`). `dist/` is 1.4 MB. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **72.5** | |

### Facts table (claim → dossier key → result), all three variants

| Claim on the page | Dossier key | Result |
|---|---|---|
| "Sea You Surfers Nest" (title, header, footer) | `business.name` (Google listing) | match |
| "Midigama, Sri Lanka"; "A bed and breakfast in Midigama, on Sri Lanka's south coast." | `location.address`, `businessType` beach_lodging (Google "Bed & breakfast") | match |
| "Hello to waves in a minute walk," says the house's own listing | `business.name` note (Booking/Agoda listing name) | match (attributed) |
| Free WiFi in public areas; Kitchen; Fan and mosquito net; Free private parking on site; free toiletries; airport shuttle and laundry (additional charge); security cameras outside | `facilities[]`, `room_types_note` | match |
| Seven rooms, all doubles, sleep fourteen; only one has A/C | `room_count` ("one A/C room & Six Non A/C rooms can accommodate 14 pax") | match |
| Mint-green four-poster, teal velvet throw, timber towel ladder, green cabinet and mirror in every room | `room_types_note` | match |
| Deluxe Double Room: 1 large double, sleeps 2, 13 m², own bathroom, private entrance, terrace, balcony | `room_types[0]` (`bathrooms: 1`) | match |
| Standard Double Room: 1 large double, sleeps 2, 12 m², private entrance, wardrobe | `room_types[1]` | match (unique's gallery adds a bathroom photo; see unique dim 1) |
| Breakfast: Asian, local specialities, warm dishes, juice and fruit | `facilities[0]` (Booking + Agoda) | match |
| Courtyard bench, carved fanlights, balconies over the palms, long settee with green cushions, carved door and chair, masks, surfboard shower | `images[]` descriptions (img-071, 024, 003, 077, 027, 035, 036) | match |
| Ashly, Superhost, usually replies on Airbnb within a few hours; his quote | `business.owner`, `contact.airbnb_messaging`, Airbnb listing text | match (as passed at 4c) |
| Google 4.9/5 · 11 reviews; Booking.com 8.0/10 · 8 reviews; Airbnb 5.0/5 · 10 reviews; 21 Nov 2026 | `reviews.google`, `.booking`, `.airbnb_1` (fetched 2026-11-21) | match. Agoda's re-score is not shown, as the dossier asks |
| 5 testimonials, authors, source, month | `reviews.all_airbnb[]`, `reviews.all_booking[]` | 5/5 verbatim, 5/5 attribution |
| Booking.com lists the house under Kumbalgama, Airbnb under Matara; one house, in Midigama | `location.address_other`, `contradictions[]` postcode | match |
| Midigama station 950 m on foot; Weligama Beach 3.4 km, "by Booking.com's count" | `location.nearby` (Booking) | match (Agoda's 750 m / 2.5 km not used) |
| 151 Weliwaththa Rd, Midigama 80650, Sri Lanka | `location.address` (Google, with postcode) | match |
| Check-out 06:00–10:00; children welcome, no cots or extra beds; pets on request, charges may apply; no parties or events | `stay_info.check_out`, `.children`, `.pets`, `.parties` | match. Check-in is omitted, per `contradictions[]` |
| Spoken here: English (unique) | `languages_spoken` | match |
| Booking.com URL; Airbnb room URL; Airbnb whole-house URL; Google Maps URL | `booking.engine_url`, `booking.other_engines[0–1]`, `contact.socials.google_maps` | match, character for character |
| No phone, WhatsApp or email link | `contact.phone` unconfirmed (`gaps[0]`, `human_decision`), `whatsapp` / `email` null | match (deliberate) |

### Compared with the current presence (dimensions 1–7 only)

Baseline, from `funnel/walk.json` and `assets/walk/`:
- The Google listing has no website and no Call button (F2).
- Booking.com opens on a blue search bar, "Kumbalgama", "8.0 Very good · 8 reviews", and the road sign as photo 1/45 (`03-booking-com-fold.png`).
- Booking.com and Agoda claim A/C rooms, and Agoda a restaurant (F4).
- The phone exists only painted on that sign (F3).
- Asking before booking needs a login on every platform (F1).
- The house appears under four place names (F7).

Against that, all three mockups:
- give **one name and the Google Midigama address**, and explain the Kumbalgama/Matara labels;
- state **"Only one has air conditioning"** plainly, with no restaurant;
- show all three dated ratings with sources, not one platform's;
- quote 5 verified reviews;
- reach Booking.com's live dates in **1 tap**, the same as the listing itself;
- add the two Airbnb listings, including the whole house for groups, which no single platform shows together.

Every budget line is met, and there is nothing third-party except the 4e fonts. On dimensions 1–7 each mockup is **better than the current presence**. It does **not** close F1 yet: there is still no direct channel until the phone is confirmed, which is the same as today. Whether each page is visibly better at a glance is dimension 8, judged by the two visual critics.

### Playbook §4 budget, measured (390, throttled, no scroll)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 361 KB | 767 KB | 282 KB |
| JS, compressed | ≤ 300 KB | 0 external (inline ≈ 4 KB) | 0 external (inline, 18 KB gz per notes) | 0 external (inline, 8.6 KB gz per notes) |
| largest above-fold image | ≤ 300 KB | 73 KB | 66 KB | 54 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2, 43 KB | 2, 40 KB | 2, 47 KB |
| LCP | ≤ 2.5 s | 644 ms | 960 ms | 756 ms |
| CLS (load / scroll early / settled) | < 0.1; scroll < 0.01 | 0.0061 / 0 / 0 | 0.0031 / 0 / 0 (designer run 0.0085) | 0 / 0.0003 / 0 |
| third-party requests on load | 0 (4e: fonts allowed) | Google Fonts only | Google Fonts only | Google Fonts only |

### The one sentence the human needs

All three pass dimensions 1–7 with no hard fail. They carry the same facts, the same Booking.com and Airbnb links, no Call button (the phone is unconfirmed), and every budget line met. They differ by:

| | first load | LCP | axe violations | named defect |
|---|---|---|---|---|
| calm | 361 KB | 644 ms | 1 serious (390) | the door / masks / shower print row can't be scrolled by keyboard on a phone |
| interactive | 767 KB | 960 ms | 2 serious (1440) | no skip link; the faded peeking quote card fails contrast |
| unique | 282 KB | 756 ms | 0 | a toilet-and-shower photo in the Standard room's slideshow, whose room has no bathroom; 14,766 px page on a phone |

**what the designer prompt got wrong:** This is the second business in this run where the first phone screen says only "Name / Midigama, Sri Lanka" and leaves the business **type** to screen 01 (Lotus at 4f, now calm and unique here). Concepts §3 shortens the hero to name + place on purpose, and nothing in the designer prompt then puts playbook §2's "business type + place in one line, above the fold" back on the first screen. Second, the same accessibility miss repeats across businesses. A phone print row becomes a horizontal scroll with nothing focusable (Lotus calm `.three`, Sea You calm `.prints`). A decorative peek leaves real text at half opacity (interactive). The 4e hand-off runs `audit-mockup` and `check-design`, not axe, so neither was caught. `audit-mockup`'s `has_skip_link` is true for any `#` anchor, so it reported a skip link that interactive does not have. Third, concepts §2's "no bathroom on the Standard room" rule was kept by calm and broken by unique, which follows Booking.com's room tags instead. The designer prompt has no step that checks a gallery against the concept's room rules.

**fix list (not gating at 4f; for the build, smallest first):**
1. **Unique, dim 1:** drop img-008 (toilet and shower) and img-010 (WC door) from the Standard slideshow, as calm does.
2. **Interactive, dim 6:** add a "Skip to the rooms" link. Make the peeking quote cards `aria-hidden` + `inert`, or bring their byline to ≥ 4.5:1.
3. **Calm, dim 6:** make `.prints` focusable (`tabindex="0"` + a label) or stack it on the phone. Hide the held-back header button with `visibility:hidden` (not opacity only) so JS-off keyboard users don't land on an invisible link.
4. **Calm, dim 2/6:** slideshow and review dots to 44 × 44, as interactive and unique did.
5. **All, dim 4:** put the type in the first screen, for example the tagline under the place line on both widths, as interactive already does on the phone.
6. **Interactive, dim 5:** keep the "Who's coming?" panel once, or drop the A/C note from the closing copy of it.
7. **All, dim 7 (at build):** self-host the font families.

### Evidence files

- `critic-sea-you-surfers-nest-r1/{calm,interactive,unique}/audit.json`: `tools/audit-mockup.mjs`, measured this round on the committed builds.
- `critic-sea-you-surfers-nest-r1/{calm,interactive,unique}/a11y.json`: axe at 390 / 1440, overflow, third-party attempts over a full scroll, page errors, every Tab stop with size, opacity and outline, JS-off link counts, page text, links and image alts.
- `critic-sea-you-surfers-nest-r1/quotes.json`: the quote check against `copy/en.json` with attributions, and unique's `stay/` page.
- `critic-sea-you-surfers-nest-r1/contrast-type.json`: solid-ground contrast and type sizes per text node, and the unique door keyboard test.
- `critic-sea-you-surfers-nest-r1/check-design.txt`.
- Screenshots: `tools/shoot.mjs` into a scratch folder, deleted after the round. What they showed is described in words in the rows above: mobile-00 of each (hero, title, place, one button; the tagline appears only on interactive's), the bar from mobile-01, unique's frame rests mobile-03…07, and its rooms at mobile-08.
