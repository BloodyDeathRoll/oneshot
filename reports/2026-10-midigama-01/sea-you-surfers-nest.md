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

## Round 2 — quick (station 4f)

critic 0.4.3 · rubric 0.3.2 · 2026-11-22 · mockups as committed in **b0cce9b** (designer 0.7.1, round 2 against the 4f round-1 lists). I served each `dist/` with `tools/_serve.mjs` on :8995 / :8996 / :8997, and each served `index.html` is byte-identical to its `dist/index.html` (`cmp`). I scored fresh against the rubric and the dossier with the same checks, order and viewports as round 1. I did not read the visual-critic or experience-critic reports, round 1 or 2. The designers' round-2 notes mention their scores, and I skipped those lines.

Checks, all re-run on the b0cce9b builds:
- **`audit.json`** from my report-folder copy of `tools/audit-mockup.mjs` (port 8991/8992; nothing written into the mockup folders).
- **`tools/shoot.mjs`** at 1440×900 and 390×844 (scratch, deleted after the round):
  - calm: 11 / 11 captures, page 8,276 / 8,006 px;
  - interactive: 11 / 13, page 8,204 / 9,496 px;
  - unique: 15 / 17, page 11,563 / 12,868 px.
  - Re-shoots: the first interactive shoot logged `ERR_INTERNET_DISCONNECTED` on the Google font and rendered the titles in a serif fallback, and the first calm shoot stopped after two captures. I re-shot both, and the re-shoots logged 0 errors.
- **axe-core 4.10.2** at 390 and 1440, after a full scroll, with third-party requests blocked.
- **Keyboard pass** with JS on and with JS off.
- **Contrast passes**: solid-ground, plus over-photo (`photo-contrast.json`: text hidden, the photo pixels behind each box measured).
- **Reduced motion.**
- **Tap-through.**
- **Quote and copy scripts.**
- **`check-design --no-shots`.**
- **The unique door** with the keyboard.

### Round-1 fix list, verified

| fix (round 1) | result in b0cce9b | evidence |
|---|---|---|
| Unique: img-008 / img-010 out of the Standard slideshow | **done**. The Standard slideshow is img-026, 009, 005, 025. | `misc.json.unique.standard_section` |
| Interactive: skip link; peeking review card | **done**. "Skip to the rooms" is the first Tab stop at both widths with JS on. axe at 1440: 0 violations (round 1: 2 × `color-contrast` 2.48:1). | `interactive/a11y.json` |
| Calm: `.prints` keyboard-scrollable; dots 44 px; JS-off invisible header link | **done**. axe 390: 0 violations (round 1: `scrollable-region-focusable`). The row is a labelled focusable region ("Photographs: the carved door, the masks and the su…", 390×353). Tap targets under 44 px: **0** of 40 (round 1: 15). With JS off at 1440, the header button is visible (opacity 1). | `calm/audit.json`, `calm/a11y.json`, `jsoff-keyboard-and-fold.json` |
| All: business type on the first screen | **done** at both widths for all three. Calm hero subtitle at y 384 (390) / 437 (1440). Unique hero subtitle at y 360 / 422. Interactive hero line "Bed and breakfast \| Midigama, Sri Lanka" at y 267 / 404. | `jsoff-keyboard-and-fold.json.first_screen` |
| Interactive: A/C sentence and "Who's coming?" once | **done**. "Only one has air conditioning" occurs **1×** in the page text (round 1: 3×). The panel appears once, in the glance, and the closing carries the three buttons. | `misc.json.interactive.ac_count` |
| Calm + interactive: hero visible under reduced motion | **done** at 390 and 1440. h1 opacity 1, hero photo opacity 1, 0 running animations, interactive canvas `display:none`. | `misc.json.*.rm390/rm1440` |

**Deliberate state still holds:** 0 `tel:`, 0 `wa.me` / WhatsApp, and the string `715880052` appears in none of the four HTML files (`index.html` ×3, `unique/stay/index.html`). The number is visible only on the sign photograph img-001. **No prices:** a scan for currency amounts and per-night patterns finds none. The only hit was the code comment "corners 0,1" in unique's WebGL script. Price is "Live dates on Booking.com" in all three.

### Shared evidence (identical for all three)

- **Facts.** 0 mismatches and 0 unsourced claims. The round-1 facts table stands; the copy is unchanged since 5b022e1. The non-copy lines that changed since round 1 are each a template label or a restatement of a copy or dossier field:
  - interactive: "Bed and breakfast \| Midigama, Sri Lanka" (`businessType`, Google "Bed & breakfast"), "7 rooms, all doubles \| sleeps 14 \| …" (`room_count`, `amenities`), "Deluxe Double Room \| Standard Double Room \| 1 large double bed each" (`rooms[]`);
  - calm and unique: the "Midigama, Sri Lanka" hero line is replaced by the copy's tagline.

  5/5 testimonials equal `copy/en.json` on every page, and Kenza's matches with its line break (`misc.json.*.kenza`). Attributions are 5/5 (`quotes.json`). Calm now sets the listing's "Hello to waves…" spot line in a `<blockquote>`, which is not a guest review; its "says the house's own listing" attribution is correct. `audit.json.facts`: the only non-copy numbers are "8.0" (Booking.com's 8) and, on calm, "2026.".
- **Booking.** Every Booking.com href equals `booking.engine_url`. The Airbnb hrefs equal `other_engines[0–1]`, and the Maps href equals `contact.mapUrl`. `audit.json.booking.tapped` at 390 touch lands on the engine URL character for character, and `primary_above_fold` is true. Class **engine**, **1** click. JS off: the first booking link is a real `<a>` at y 454 / 307 / 427 (390). `booking_links_reachable` is 3 / 3 / 3.
- **Delivery.** Static HTML with CSS and JS inline, plus WebP images: 1.7 / 1.6 / 1.6 MB. No root-absolute URLs, all filenames lowercase, 0 secret strings, 0 iframes, 0 external scripts, and no CMS call. The only third-party host, on load and over a full scroll, is Google Fonts, which is allowed at 4e only.
- **Hard-fail screen:** none applies. There is no video in the dossier. Every first screen is an own photograph from a 2000 px source. There is no stock, no keyboard trap, and no content that lives only in a canvas.
- **check-design** (facts): 0 problems and 0 warnings on all three. All have a white ground, 0 all-caps labels and 0 labelled headings. The interactive h1 is now **Courgette** (round 1: Kalam), with Plus Jakarta Sans body. Calm (Grand Hotel / Karla) and unique (Leckerli One / Instrument Sans) are unchanged.
- **Solid-ground contrast** (`contrast-type.json`): 0 failures. The only rows flagged are white text drawn over photographs, which the solid pass cannot see; `photo-contrast.json` measures those. Minimum type is 13–14 px.

### calm — "The board rack"

```
mode: quick        round: 2        variant: calm
total (dims 1–7): 76.5 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check. The Standard gallery is img-009, 026, 005, 025 (no bathroom shots). Ratings 4.9/5 · 11, 8.0/10 · 8 and 5.0/5 · 10, each dated 21 Nov 2026. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `calm/audit.json`: first load **495 KB** (494,921 B) in 12 requests, 0 external JS, fonts 43 KB (2 families), largest image 73 KB. **LCP 764 ms** (observer ×3: 652–708 ms; LCP element is the h1). CLS 0.001, scroll 0 / 0. **0 of 40** tap targets under 44 px. No overflow at 390 or 1440. Mobile sheet: no overlap in 11 captures, and the bar shows from mobile-01. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" is above the fold at both widths, and each room has its own button. The closing carries Booking.com and both Airbnb listings. −1: the listing's top, without room or dates (no deep link in the dossier). |
| 4 | brand fit | 5 | 9 | 4.5 | Type + place now on the first screen at both widths. §3 order holds: hero → glance (spot line, included, 3 dated ratings, live dates, button) → Seven rooms → Deluxe / Standard full-width galleries → courtyard → prints → Ashly + breakfast + guests → finding the house → closing → footer. −1: the first desktop screen now carries **two** "See live dates" buttons, header (y 14) and hero (y 497). The designer's round-1 notes cite custom.md's one CTA on the calm first screen. |
| 5 | copy | 10 | 10 | 10.0 | Copy unedited and English complete. The round-1 repetition is gone: the three-rating block now appears once (glance). |
| 6 | accessibility | 8 | 9 | 7.2 | axe **0 violations** at 390 and 1440 (25 rule sets pass). Skip link first. 43 / 42 Tab stops with a 3 px outline. The print row is a focusable labelled region. 0/19 images without alt, headings in order, reduced motion still. −1: at 390 the phone bar slides away over the closing and footer, but its two buttons ("At a glance", "See rooms and live dates on Booking.com") stay in the Tab order off-screen. That makes the last 2 of 43 stops invisible with JS on, and the same 2 with JS off. |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **76.5** | |

### interactive — "In the palms"

```
mode: quick        round: 2        variant: interactive
total (dims 1–7): 76.0 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check. The Standard stage is img-005, 026, 009, 025, 010, all Booking.com-tagged to Standard. img-010's WC door is unchanged from round 1 and noted there; the alt states only the door. No bathroom is claimed in the text. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `interactive/audit.json`: first load **554 KB** (554,300 B) in 17 requests, 0 external JS, fonts 46 KB, largest image 49 KB. **LCP 748 ms** (the hero image), CLS 0.0041, scroll early 0.0001 / settled 0. **LCP outlier:** the first audit run (run while the other reviewers' audits were running) measured **6,372 ms**, which would be over the +50 % line. I re-measured it 3 times with `audit-mockup` (772, 760, 748 ms) and 3 times with an LCP observer under the same throttle (744–768 ms). The outlier is kept as `audit-run1-outlier.json`, and I treat it as measurement noise, not the page. Its early scroll shift 0.004 (`::before` at y 0) is also under 0.01. 0 of 34 tap targets under 44 px. No overflow. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" is at y 307 (390) / 450 (1440). The "Who's coming?" tiles are buttons, and with JS off the answers are plain links. Room buttons and the closing's three listings are present. −1: the listing's top, as calm. |
| 4 | brand fit | 5 | 10 | 5.0 | Type + place on the first screen at both widths ("Bed and breakfast \| Midigama, Sri Lanka", y 267 / 404). §3 order: palms hero → tagline, spot, one fact line, address + Maps, 3 dated ratings, "Who's coming?" → Seven rooms (pill, stage, room line, button, A/C sentence) → courtyard + shelf → board shower + masks → breakfast → Ashly + guests → finding the house → closing over the palms with three listings → footer. The interactive brief holds (WebGL palms hidden under reduced motion, tiles, pill, drag shelf), with one CTA on the first screen. |
| 5 | copy | 10 | 9 | 9.0 | Copy unedited, and the A/C sentence appears once. −1: on the phone the first screen says the type twice: "Bed and breakfast \| Midigama, Sri Lanka" in the hero (y 267), then "A bed and breakfast in Midigama, on Sri Lanka's south coast." under it (y 731, mobile-00). |
| 6 | accessibility | 8 | 9 | 7.2 | axe **0 violations** at 390 and 1440 (27 pass). The skip link is the first stop. 36 / 43 stops, all visible with a 3 px outline. The peeking review card is now opacity 1. 0/26 images without alt, headings in order, reduced motion: canvas hidden, photograph visible. −1, two small items: (a) the closing sentence (white, 22 px / 600, not "large" under WCAG) over the palms at 390 measures a **median 5.38:1**, but 10 % of the photo behind it is under 3.45:1, so pale fronds weaken parts of the line (`photo-contrast.json`; at 1440, 28 px: median 8.91, worst 10 % 7.68); (b) with JS off, "Skip to the rooms" gets focus but stays off-screen (`jsoff-keyboard-and-fold.json`). |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. −1: Google Fonts (4e only). If the font host fails, the titles fall back to a serif (seen in the first shoot). |
| | **total 1–7** | 80 | | **76.0** | |

### unique — "Every side of the four-poster"

```
mode: quick        round: 2        variant: unique
total (dims 1–7): 75.5 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | Shared facts check. **The round-1 deduction is fixed:** the Standard slideshow is img-026, 009, 005, 025, and the toilet/shower img-008 and WC door img-010 are gone, consistent with `room_types[1].bathrooms` 0 and concepts §2. The turn captions are the `offer` copy split at sentence ends. The A/C sentence is visible on the page, and again in the door and `stay/`. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `unique/audit.json`: first load **184 KB** (183,778 B) in **5 requests**. HTML 92 KB with CSS and JS inline, images 45 KB (the turn photos load only on approach), fonts 47 KB. **LCP 796 ms** (observer ×3: 680–716 ms; the h1). CLS 0.0004, scroll 0.0001 / 0. 0 of 40 tap targets under 44 px. No overflow. The frame renders headless. |
| 3 | booking CTA | 15 | 9 | 13.5 | Shared booking evidence. The hero "See live dates" is at y 427 (390) / 472 (1440), a plain engine link. "More ways to book" / "More" / "Book" go to `stay/` (all three listings, JS-off safe). With JS, they open the door: `role=dialog aria-modal=true`, focus on the Booking.com tile, 20/20 Tabs inside, Esc returns focus to the trigger, at both widths. −1: the listing's top, as calm. |
| 4 | brand fit | 5 | 9 | 4.5 | Type + place on the first screen at both widths (y 360 / 422). §3 order holds. The turn is shorter: the phone page is 12,868 px (round 1: 14,766) and "Deluxe or Standard" arrives at capture 06 of 17 (round 1: 08 of 20). −1: the rooms are still about three phone screens later than in calm (rooms at capture 02 of 11) and interactive (02 of 13). |
| 5 | copy | 10 | 9 | 9.0 | Copy unedited. −1, as round 1: the glance's four amenities (Free WiFi in public areas, Kitchen, Fan and mosquito net, Free private parking on site) are listed again in the Facilities line under "In every room" (mobile-01 and mobile-07). |
| 6 | accessibility | 8 | 9 | 7.2 | axe **0 violations** at 390 and 1440 (26 pass). Skip link first. 42 / 50 stops, all visible with a 3 px outline. The desktop nav is now 44 px (round 1: 39). The door is keyboard-correct (above). 0/32 images without alt. Reduced motion: both canvases `display:none`, the photograph visible, 0 running animations. Hero text over the photograph at 390: h1 median 6.65:1 (large), subtitle median 9.65:1. −1: with JS off on the phone, the bottom bar's "See live dates" and "More" take focus off-screen (`jsoff-keyboard-and-fold.json`). |
| 7 | security + delivery | 7 | 9 | 6.3 | Shared delivery evidence. `stay/` is relative. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **75.5** | |

### Playbook §4 budget, measured (390, throttled, no scroll)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 495 KB | 554 KB | 184 KB |
| JS, compressed | ≤ 300 KB | 0 external (inline) | 0 external (inline) | 0 external (inline) |
| largest above-fold image | ≤ 300 KB | 73 KB | 49 KB | 45 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2, 43 KB | 2, 46 KB | 2, 47 KB |
| LCP | ≤ 2.5 s | 764 ms | 748 ms (outlier run 6,372 ms; see dimension 2) | 796 ms |
| CLS (load / scroll early / settled) | < 0.1; scroll < 0.01 | 0.001 / 0 / 0 | 0.0041 / 0.0001 / 0 | 0.0004 / 0.0001 / 0 |
| third-party requests on load | 0 (4e: fonts allowed) | Google Fonts only | Google Fonts only | Google Fonts only |

### Compared with the current presence (dimensions 1–7)

Unchanged from round 1. All three are better on facts, clarity and booking options than the Google, Booking.com, Agoda and Airbnb pages: one name and the Midigama address, the honest A/C line, three dated ratings, verbatim reviews, 1 tap to live dates, and both Airbnb listings. None closes the missing direct contact while the phone is unconfirmed. The at-a-glance comparison is dimension 8.

### The one sentence the human needs

All three pass dimensions 1–7 with no hard fail. Every round-1 item is fixed and verified, and they differ by:

| | first load | LCP | axe | remaining defect |
|---|---|---|---|---|
| calm | 495 KB | 764 ms | 0 | two off-screen phone-bar buttons at the end of the Tab order; two "See live dates" on the first desktop screen |
| interactive | 554 KB | 748 ms | 0 | the closing line over the palms dips under 4.5:1 in places on a phone; the type is said twice on the first phone screen |
| unique | 184 KB | 796 ms | 0 | rooms arrive at phone screen 6 of 17; the amenities are repeated in the Facilities line |

**what the designer prompt got wrong:** The round-1 list was applied exactly, and every item is verified. What remains is the class of defect the 4e hand-off still does not test: **focus on elements that are moved off-screen rather than hidden.** Calm's phone bar slides away at the closing, and unique's phone bar with JS off, both keep their links in the Tab order. Interactive's skip link with JS off is the same case. Neither `audit-mockup` nor `check-design` walks the Tab order and checks that each focused element is on screen. A Tab walk in the 4e checks would have caught all three. Separately, the LCP outlier (6.4 s on one run, 0.75 s on six others) shows that `audit-mockup` runs taken while other reviewers' browsers share the machine can be off by an order of magnitude. A single run is not enough to call a budget fail.

**fix list (not gating at 4f; for the build, smallest first):**
1. **Calm, dim 6:** give the phone bar `visibility:hidden` (or `inert`) while it is slid away, so its links leave the Tab order.
2. **Unique, dim 6:** the same for the JS-off phone bar.
3. **Interactive, dim 6:** reveal "Skip to the rooms" on `:focus` without JS.
4. **Interactive, dim 6:** darken the scrim under the closing sentence on the phone so its weakest 10 % reaches 4.5:1.
5. **Calm, dim 4:** hold the header "See live dates" back on the first desktop screen, as round 1 did.
6. **Interactive, dim 5:** keep one type line on the first phone screen (the hero's "Bed and breakfast" or the tagline).
7. **Unique, dim 5:** drop the glance's four amenities from the Facilities line, or the reverse.
8. **All, dim 7 (at build):** self-host the fonts.

### Evidence files (`critic-sea-you-surfers-nest-r2/`)

- `{calm,interactive,unique}/audit.json`: `audit-mockup`, measured this round. `interactive/audit-run1-outlier.json` is the 6,372 ms run.
- `{calm,interactive,unique}/a11y.json`: axe at 390 / 1440, overflow, third-party attempts over a full scroll, page errors, every Tab stop, JS-off link counts, page text, links and alts.
- `quotes.json`, `misc.json`: Kenza with its line break, A/C sentence count, the Standard gallery's images, reduced-motion state at both widths.
- `contrast-type.json`: solid-ground contrast and type sizes; unique door keyboard test.
- `photo-contrast.json`: text over hero and closing photographs, median and worst 10 % / 2 % of the pixels behind each box.
- `jsoff-keyboard-and-fold.json`: the JS-off Tab walk, type line and CTAs on the first screen, and interactive LCP re-runs.
- `check-design.txt`.
- Screenshots: scratch, deleted after the round; described in words above.

## Round 3 — quick (station 4f), interactive and unique

critic 0.4.3 · rubric 0.3.2 · 2026-11-22 · interactive and unique as committed in **8d8d821** (+ the media manifest 1b826e9). Calm passed in round 2 and is unchanged: `git diff 83d0358 HEAD -- …/mockups/calm` is empty, so its round-2 scorecard (76.5 / 80) stands and calm was not re-measured.

Method:
- Each `dist/` was served on :8996 / :8997 (served `index.html` = `dist/index.html`, `cmp`).
- Same checks, order and viewports as rounds 1–2:
  - `audit-mockup` (report-folder copy, run one at a time);
  - `shoot.mjs` at 1440 / 390 (interactive 10 / 13 captures, page 8,156 / 9,430 px; unique 15 / 16, page 11,563 / 12,204 px; 0 console errors; scratch, deleted after the round);
  - axe at 390 / 1440 after a full scroll;
  - JS-on and JS-off Tab walks;
  - a phone-bar probe;
  - solid-ground and over-photo contrast;
  - reduced motion;
  - quote and copy scripts;
  - the unique door;
  - `check-design --no-shots`.
- I did not read the visual-critic or experience-critic reports.

**Re-confirmed:**
- **No phone or chat link:** 0 `tel:`, 0 `wa.me` / WhatsApp, and `715880052` appears in none of interactive `index.html`, unique `index.html` or unique `stay/index.html`.
- **No prices:** a currency and per-night scan finds no prices in any of the three files.
- **img-008 / img-010:** **absent from unique** (no reference in either HTML file, and its Standard slideshow is img-026, 009, 005, 025). **Interactive still shows img-010** (WC door) in its Standard stage, as in rounds 1 and 2: Booking.com-tagged to Standard, alt states only the door, never deducted. img-008 is in neither page.

### Round-2 items, verified

| item | result | evidence |
|---|---|---|
| Interactive: one "bed and breakfast" on the first phone screen | **done**. The hero's "Bed and breakfast" span is `display:none` at 390. The only type line is the tagline at y 697 (of 844). At 1440, "Bed and breakfast \| Midigama, Sri Lanka" stays in the hero (y 404). | `jsoff-keyboard-fold-lcp.json.first_screen` |
| Interactive: skip link visible on focus with JS off | **done**. The JS-off Tab walk finds 0 off-screen or hidden stops at 390 and 1440 (round 2: the skip link). | `jsoff-keyboard-fold-lcp.json` |
| Interactive: closing line contrast | **done**. White 22 px / 600 over the palms at 390: median **11.27:1**, worst 10 % **9.64:1**, worst 2 % 9.19:1. The designer's claim was 9.7. At 1440: 11.35 / 10.26. The closing's outlined Airbnb buttons, now white text on the photograph, measure ≥ 11.6:1 (390) and ≥ 10.3:1 (1440) for the worst 10 %. | `photo-contrast.json`, `photo-contrast-buttons.json` |
| Interactive: phone bar out of the Tab order when slid away | **done**. With JS at the top of the page the bar is off-screen with 0 focusable links. Once shown it has 1, and the JS-on Tab walk finds 0 invisible stops of 36. | `phone-bar.json`, `interactive/a11y.json` |
| Unique: summary amenities not repeated | **done**. "Free WiFi", "Kitchen", "Fan and mosquito net" and "Free private parking" each occur **once** in the page text. The old Facilities line is now "Also at the house: Free toiletries \| Airport shuttle (additional charge) \| Laundry (additional charge) \| Security cameras outside", the other four `amenities[]`. | text count, `unique/a11y.json` |
| Unique: phone bar out of the Tab order while off-screen, JS on and off | **done**. JS on: off-screen at the top with 0 focusable, then on screen with 2 focusable from the second screen to the end (wheel probe). JS off: the bar is never shown and has 0 focusable links. Both Tab walks find 0 invisible stops (42 / 49 with JS). | `phone-bar.json`, `jsoff-keyboard-fold-lcp.json`, `unique/a11y.json` |
| Unique: rooms earlier on the phone | **done, by one screen**. Page 12,204 px (round 2: 12,868). "Deluxe or Standard" at capture **05 of 16** (round 2: 06 of 17). | shoot sheets (scratch) |

**No regressions found:**
- Facts unchanged; the only non-copy line that changed is unique's "Also at the house" label over copy `amenities[]`.
- 5/5 testimonials verbatim with attribution; Kenza's line break kept (`quotes.json`, `misc.json`).
- The A/C sentence appears once in interactive. Unique has it on the page plus in the door and `stay/`.
- Booking hrefs are exact. `audit.json.booking.tapped` = the engine URL at 390 touch, with the primary action above the fold. JS off: 3 booking links reachable on each page.
- axe 0 violations, no overflow, 0 page errors, 0 tap targets under 44 px.
- Reduced motion: canvases `display:none`, hero opaque, 0 running animations.
- The unique door: dialog, `aria-modal`, focus on the Booking.com tile, 20/20 Tabs inside, Esc returns focus.
- `check-design`: 0 problems and 0 warnings on both; fonts unchanged (interactive Courgette / Plus Jakarta Sans, unique Leckerli One / Instrument Sans). Google Fonts is the only third-party host.

### interactive — "In the palms"

```
mode: quick        round: 3        variant: interactive
total (dims 1–7): 77.8 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | 0 mismatches and 0 unsourced claims. Round-1 table stands. img-010 note as above. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `interactive/audit.json`: first load **561 KB** in 17 requests, 0 external JS, fonts 46 KB, largest image 51 KB. **LCP 796 ms** (second run 820). CLS 0.0026, scroll 0 / 0 (second run early 0.0026 from `::before` at y 0, under 0.01). 0 of 33 targets under 44 px. No overflow at 390 or 1440. |
| 3 | booking CTA | 15 | 9 | 13.5 | Engine class, 1 click, exact URLs. The hero "See live dates" is at y 290 (390) / 450 (1440). The tiles are buttons, and with JS off the answers are links. −1: the listing's top, without room or dates (no deep link in the dossier). |
| 4 | brand fit | 5 | 10 | 5.0 | Type + place on the first screen at both widths. §3 order and the interactive brief hold, with one CTA on the first screen. |
| 5 | copy | 10 | 10 | 10.0 | Copy unedited. One type line on the first phone screen, and the A/C sentence once. The round-2 repetition is gone. |
| 6 | accessibility | 8 | 10 | 8.0 | axe **0 violations** at 390 and 1440 (27 pass). Skip link first, and visible with JS off. 36 / 43 Tab stops all on screen with a 3 px outline, with JS on and off. Phone bar out of the Tab order while hidden. Closing text ≥ 9.6:1 for the worst 10 % of its photo. 0/26 images without alt, headings in order, reduced motion still. |
| 7 | security + delivery | 7 | 9 | 6.3 | Static, no secrets, no root-absolute URLs, 0 iframes, 0 external scripts, 1.6 MB. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **77.8** | |

### unique — "Every side of the four-poster"

```
mode: quick        round: 3        variant: unique
total (dims 1–7): 77.3 / 80      result: pass (dims 1–7; dim 8 pending)      hard_fails: []
```

| # | dimension | weight | score | weighted | evidence |
|---|---|---|---|---|---|
| 1 | facts | 20 | 10 | 20.0 | 0 mismatches and 0 unsourced claims. img-008 / img-010 absent. "Also at the house" lists `amenities[]` rows 3, 6, 7, 8 with their "additional charge" notes. |
| 2 | mobile + performance | 15 | 10 | 15.0 | `unique/audit.json`: first load **187 KB** in 5 requests (HTML 95 KB inline, images 45 KB, fonts 47 KB). **LCP 996 ms.** CLS 0.0015, scroll 0.0004 / 0. **Outlier:** one of five runs measured **3,220 ms**, which is over 2.5 s but under the +50 % line. The others measured 996, 844, 744 and 704 ms, all run one at a time, while 6–8 other headless Chromium processes from the other reviewers were running. I kept it as `unique/audit-outlier-3220ms.json` and treat it as noise. 0 of 38 targets under 44 px. No overflow. |
| 3 | booking CTA | 15 | 9 | 13.5 | Engine class, 1 click, exact URLs. The hero "See live dates" is at y 427 / 472. "More ways to book" → `stay/` (JS-off safe), and with JS it opens the door, keyboard-correct. −1: the listing's top, as interactive. |
| 4 | brand fit | 5 | 9 | 4.5 | Type + place on the first screen at both widths, and §3 order holds. −1: the rooms still arrive at phone capture 05 of 16, against capture 02 in calm and interactive. This improved by one screen since round 2. |
| 5 | copy | 10 | 10 | 10.0 | Copy unedited. Each summary amenity now appears once; the round-2 repetition is gone. |
| 6 | accessibility | 8 | 10 | 8.0 | axe **0 violations** at 390 and 1440 (26 pass). Skip link first. 42 / 49 Tab stops all on screen with a 3 px outline, with JS on and off. Phone bar focusable only while shown. The door traps and returns focus. Hero text over the photograph: h1 median 6.65:1 (large), subtitle median 9.65:1 (390). 0/32 images without alt. Reduced motion: both canvases `display:none`. |
| 7 | security + delivery | 7 | 9 | 6.3 | Static, `stay/` relative, no secrets, 0 iframes, 0 external scripts, 1.6 MB. −1: Google Fonts (4e only). |
| | **total 1–7** | 80 | | **77.3** | |

### Playbook §4 budget, measured (390, throttled, no scroll)

| line | target | interactive | unique |
|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | 561 KB | 187 KB |
| JS | ≤ 300 KB | 0 external (inline) | 0 external (inline) |
| largest above-fold image | ≤ 300 KB | 51 KB | 45 KB |
| fonts | ≤ 2 families, ≤ 150 KB | 2, 46 KB | 2, 47 KB |
| LCP | ≤ 2.5 s | 796 / 820 ms | 996 ms (runs: 996, 3,220 outlier, 844, 744, 704) |
| CLS (load / scroll early / settled) | < 0.1; scroll < 0.01 | 0.0026 / 0 / 0 | 0.0015 / 0.0004 / 0 |
| third-party on load | 0 (4e: fonts allowed) | Google Fonts only | Google Fonts only |

### The one sentence the human needs

Calm (76.5, round 2), interactive (77.8) and unique (77.3) all pass dimensions 1–7 with no hard fail. Every round-2 item on interactive and unique is fixed and measured, and the rebuild introduced no regression. What remains:
- **Unique's rooms** arrive at phone screen 5 of 16.
- **Interactive's img-010** WC-door photo is still in its Standard stage. It is unscored, as before, but unique and calm leave it out.
- **Google Fonts** on all three, which is allowed at 4e only.

**what the designer prompt got wrong:** Nothing new this round; every critic item was applied and holds. The one systemic lesson is measurement, not design. Two of the 13 `audit-mockup` runs across rounds 2–3 produced a largest paint 4–8× the median while other reviewers' browsers shared the machine. One of them (6.4 s) would have read as a hard fail. Proposal material: `audit-mockup` should take the median of three runs, or refuse to run while other headless Chromium processes are busy.

**fix list (not gating):** 1. Interactive, dim 1 (consistency): drop img-010 from the Standard stage, as calm and unique do. 2. All, dim 7 (at build): self-host the fonts.

### Evidence files (`critic-sea-you-surfers-nest-r3/`)

- `{interactive,unique}/audit.json`: `audit-mockup`, this round. `unique/audit-outlier-3220ms.json` is the outlier run.
- `{interactive,unique}/a11y.json`: axe at 390 / 1440, overflow, third-party attempts, page errors, every Tab stop, JS-off link counts, page text, links and alts.
- `quotes.json`, `misc.json`: testimonials and attributions, Kenza's line break, A/C sentence count, Standard gallery images, reduced motion at both widths.
- `contrast-type.json`: solid-ground contrast and type sizes; unique door keyboard test.
- `photo-contrast.json`, `photo-contrast-buttons.json`: text over hero and closing photographs.
- `phone-bar.json`, `jsoff-keyboard-fold-lcp.json`: phone-bar focusability on and off screen, the JS-off Tab walk, the first-screen type line and CTAs, the LCP runs, and the wheel-scroll bar probe.
- `check-design.txt`.
