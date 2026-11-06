# copy sources: panta-rei-resort · en

Copywriter 0.5.0 · run 2026-11-lk-surf-01 (test) · 2026-11-06. Facts come from `dossier/panta-rei-resort/dossier.json` only (harvester 0.5.0). `audit.json` `recommended` (auditor 0.1.3) is used only for how to sell: the primary action and its working label ("Check dates and book direct"), the offer framing (rooms by size and their one distinct thing, breakfast included, then live dates), restaurant / fitness / massage as text on the page (F6), ratings shown (F5), and the closing intent. It is never used as a fact.

`en.draft.json` is the copywriter's draft; after the humanizer 0.2.1 pass `en.json` is the rewrite (`humanizer-notes.md`), and the rows below describe `en.json`.

Caps re-read from `schemas/site-content.md` v0.11 this round: `copyBlocks` ≤ 8 (8 used), body ≤ 1500 (longest 522), heading ≤ 120 (longest 24); `tagline` / `closing` / `featureLine` ≤ 140 (97 / 107 / 22); `spot` / `season` / `hoursNote` ≤ 200 (52 / null / 102); `priceList` ≤ 30 rows × label ≤ 80, note ≤ 140 (8 rows, longest label 50); `rooms` ≤ 20 × label ≤ 80, beds ≤ 80, note ≤ 140 (4 rows, longest note 103); `stayInfo.note` ≤ 200 (102); `amenities` ≤ 40 × label ≤ 60, note ≤ 80 (16 rows, longest label 46); `ratings` ≤ 6 (2); `testimonials` ≤ 12 × ≤ 600 (6, longest 557); `bookingLinks` ≤ 6 × label ≤ 60 (5, longest 27).

**This is the owner-prose case.** The owner's About text (`business.description`) is used verbatim for the intro (block [0]), with the edits listed under "Edits to the owner's words". The group text (`business.group_hosting`) is used verbatim in block [6]. The rest is written from facts.

Index keys: `room_types[0–3]` = Double, Triple, Family Villa, Suite. `offers[n]` follows the dossier's order (0 = pool day pass, 1–3 = fitness, 4–7 = massages, 8 = extra bed). `facilities[n]` follows the dossier's order (0 = pool … 8 = dietary options). `reviews.quotes[0–5]` = Peter, Lynette, Arianna, Oishanee, Akhila, Alba R.

## Round 2 (after copy review r1, 2026-11-06)

The harvester added the business's own PDF text to the dossier: `menu.descriptions` (4 breakfast items), `facilities[4].text` (massages), `stay_info.transport.text` (tuk tuk / taxi), `facilities[2].season_note`. Changes: [2] ¶1 'Lunch and dinner come off the same menu… leans Mediterranean' → 'Later there's … Dinner is a mix of traditional and modern Mediterranean dishes.' (the same-menu claim was an inference from two links; dropped); [3] season/Pilates sentence rewritten to the sources; [4] ¶1 now rests on `facilities[4].text`; [7] ¶2 rests on `stay_info.transport.text`; `languagesSpoken` emptied. Block [1]'s ring now cites img-001 and vid-001 (review note).

## Harvest decisions followed

| Decision | How the copy handles it |
|---|---|
| Distance to Kabalana Beach: 300 m (site, engine) vs 600 m / 7-minute walk (Booking) vs 366 m to the coastline (OSM) — `contradictions[0]` | No number. "a short walk" in `spot` and block [7]. Owner item. |
| Email: hello@ shown, links go to gmail / info@mysite.com — `contradictions[3]` | `contact.email` = hello@pantareiresort.com, the address shown everywhere and on the engine. |
| Check-out 11 am (engine, guide) vs 11:30 (Google) — `contradictions[1]` | `stayInfo.checkOutTo` 11:00. |
| Breakfast 8:30–12:00 (site) vs 8:30–11:30 (guide) — `contradictions[2]` | `hoursNote` uses the site's public hours. Owner item. |
| Triple beds: engine vs Booking — `contradictions[4]` | `rooms[1].beds` uses the engine's words. |
| Live prices are not content (`offers_note`, schema rule) | No room price anywhere. `bookingLinks[]` go to the engine home and each room's engine page; block [5] ¶2 and `closing` send the reader to live dates. |
| No season published (`season.gap`) | `season` = null. The off-season restaurant closure (one guest, July 2026) is not stated. Owner item. |
| Stock images (img-026, img-027) and the Explore embed's stock copy | Not used. The Explore embed's generic area text is not used either (its surf line is a superlative about the region). |
| Massage booking number +79995285952 (`contact.massage_whatsapp`) | Not on the site: it is a therapist's number in an in-house booklet. Massages are listed with prices; how to book one is an owner item. |
| The guest Wi-Fi password in the guide PDF | Not recorded, not used. |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Panta Rei Resort" | `business.name` |
| `businessType` | `beach_lodging` | `businessType`, `businessType_note` |
| `tagline` | "A boutique resort set around a large pool in Kabalana, Ahangama, on the south coast of Sri Lanka." | "boutique resort in Kabalana": `business.description`; "large pool": `business.description` ("the large pool"); "around": `images[img-001].description`, `videos[vid-001].shows` (the ring of bungalows around the pool); Ahangama: `location.address`; "south coast of Sri Lanka": the site's own "Southern Coast of Sri Lanka" (`existing_site`, home footer; `business.tagline.note`). Answers audit F4 (what + where). |
| `closing` | "Booking direct gets you our best rate, and if there's anything you'd like to ask first, send us a WhatsApp." (humanizer: the live-dates sentence now lives only in [5] ¶2) | Task: `audit.recommended.closing_intent`. "best rate": `booking.path.note` (engine: "Book direct with Panta Rei for our best available rates"; site: "Best price when booking direct"). WhatsApp: `contact.whatsapp`. |
| `featureLine` | "No paradise like home." | The owner's headline, `business.tagline` ("No Paradise Like Home, Panta Rei." / About "NO PARADISE LIKE HOME"), case changed. |
| `spot` | "The waves of Kabalana, a short walk from the resort." | "surfing the waves of Kabalana": `business.description`. "a short walk": see contradictions row (no number). No break named (`location.spot.gap`). |
| `season` | null | `season.gap` |
| `openingHours` | `[]` | Lodging; reception hours not published (`hours_note.gap`). |
| `hoursNote` | "Restaurant, every day: breakfast 8:30–12:00 (coffee from 8:00), lunch 13:00–17:00, dinner 18:00–21:30." | `restaurant_hours[0]` (site /restaurant), 24 h format. |
| `languagesSpoken` | `[]` | `languages_spoken[0]` says staff languages are not stated (copy review r1) |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] intro ¶1 | "Welcome to our boutique resort in Kabalana … rainforests come together." | `business.description`, verbatim. |
| [0] intro ¶2 | "The resort features 16 bungalows, each with its own charm and style, inspired by wild nature and made from natural materials." | `business.description`, edited (see Edits). |
| [1] about ¶1 | "The bungalows sit in a ring around a long pool with a stone deck and loungers, and the garden runs between them." | `images[img-001].description`, `videos[vid-001].shows`, `videos[vid-001].shows` (the business's own photos and film: ring of red-roofed bungalows, stone surround, loungers, lawn); "large pool": `business.description`. |
| [1] about ¶2 | "The pool opens early in the morning, so you can swim before breakfast. If you're staying nearby, you can come for the day too." | `facilities[0]` ("open from early morning"; About: "ideal spot to kick-start your day"); day pass: `offers[0]` (price in `priceList[0]`, not repeated here). |
| [2] about ¶1 | "The restaurant serves breakfast, lunch, dinner and cocktails all day, to guests and to anyone who drops in. Breakfast goes from smoothie bowls, granola and banana oat pancakes to shakshuka, or the Sri Lankan plate with egg hoppers, dhal and coconut sambal. Later there's a fish bowl, the curry of the day and a whole grilled fish, priced on weight. Dinner is a mix of traditional and modern Mediterranean dishes." | `facilities[1]`, `business.description` ("open to outside guests"); dishes: `menu.sections` + `menu.descriptions` (Smoothie Bowls, Granola Bowl, Banana Oat Pancakes, Shakshuka, Sri Lankan Breakfast "2 egg hoppers, homemade green chutney, dhal and coconut sambal", Fish Bowl, Curry of the Day, Whole Grilled Fish "Priced on weight"); dinner sentence: owner's /restaurant text ("a mix of traditional and modern mediterranean dishes"). |
| [2] about ¶2 | "The bar is upstairs, above the restaurant. Go up for the sunset." | `facilities[1]` (owner: "our well equipped bar located above the restaurant … right at the perfect location to watch the tropical sunsets"). |
| [3] about ¶1 | "An open-air fitness area on the upper floor looks out over the resort. Vinyasa yoga is at 8:30 every morning; Friday is the day off. There are Pilates classes too, led by experienced instructors, and in the season the schedule gets longer. You don't need to book." | `facilities[2]` (events page: "open-air fitness area overlooking the resort … daily yoga and Pilates classes led by experienced instructors"); "upper floor": `videos[vid-003].shows`, `images[img-020].description`; schedule: `offers[1–3]` notes; "in the season the schedule gets longer": `facilities[2].season_note`; "No need to book": schedule PDF (`offers[1]`). |
| [4] about ¶1–2 | "The Surf Therapy Massage was put together for surfers. It's a full body oil massage that works on every muscle with sport massage techniques, for the physical demands of surfing, and helps your body recover faster. / There's a Revitalizing massage as well. Either one is an hour on the whole body, or 45 minutes on the back, neck and shoulders." | `facilities[4].text` (guide p.7, verbatim); `facilities[4]`. Prices only in `priceList[4–7]`. |
| [5] offer ¶1 | "Every room has air conditioning, hot water and wifi, is cleaned daily, and comes with breakfast." | `room_types[0–3].features` (each lists Air conditioning, Hot water, Wifi, Daily cleaning, Breakfast included); `stay_info.breakfast`. |
| [5] offer ¶2 | "Prices move with the dates. Pick yours on our booking page and you'll see what's free and what it costs." | `offers_note` (engine prices only for chosen dates); `booking.engine_url`. Framing: `audit.recommended.offer_framing`. |
| [6] info ¶1 | "Planning to bring a big group to Sri Lanka? … enjoying every moment together." | `business.group_hosting`, verbatim except the em dash before "enjoying" (see Edits). |
| [7] info ¶1 | "Kabalana Beach is a short walk away and Koggala Lake about 1.5 km. Koggala Airport is 5 km from the resort, Kathaluwa station 1.9 km and Ahangama station 2.1 km." | `location.nearby` (Booking: Koggala Lake 1.5 km, Kathaluwa 1.9 km, Ahangama station 2.1 km, Koggala Airport 5 km); beach: contradictions row. |
| [7] info ¶2 | "Tuk tuk drivers wait at the door of the hotel. Agree the price before you set off, or ask us to call one. If you'd rather have a private taxi, we'll arrange it." | `stay_info.transport.text` (guide p.3: "we have some drivers always waiting at the door of the hotel. We recommend you to agree to a price before you take them. Let us know and we can also give them a call"; "PRIVATE TAXI … We will arrange everything for you!"). |

## Modules

| Field | Rests on |
|---|---|
| `priceList[0]` pool day pass 3500 LKR per person, "Spent at the restaurant" | `offers[0]` |
| `priceList[1–3]` fitness class 2500 / 3000 / 3500 LKR (residents / in-house guests / walk-ins), "No need to book" | `offers[1–3]` (schedule PDF wording "RESIDENTS / IN HOUSE GUESTS / WALK IN'S") |
| `priceList[4–7]` massages 20000 / 17000 LKR | `offers[4–7]` (unit `flat`: per treatment) |
| `rooms[0]` Double Room · "King-size bed or twin single beds" · sleeps 3 · "22 m², with a private balcony over the pool. En-suite shower." | `room_types[0]` (engine: 22 m², "private balcony with pool view", "3 guests") |
| `rooms[1]` Triple Room · "King-size bed and a sofa bed" · 3 · "30 m², with a private balcony over the pool. Bathroom with both a bathtub and a shower." | `room_types[1]` |
| `rooms[2]` Family Villa · "Two king-size beds or four single beds" · 4 · "50 m², two bedrooms, garden view and a private balcony. Private bathroom plus an outdoor bath." | `room_types[2]` |
| `rooms[3]` Suite with Private Pool · "King-size bed" · 2 · "40 m², with your own private pool just steps from the room and a chill-out corner with a built-in sofa." | `room_types[3]` (engine "Your own private pool, just steps from the room"; site "Private chilling area with in-build sofa"). Label: Booking's "Suite with Private Pool" (shorter than the engine's "Suite Room With Private Pool", same room). |
| `stayInfo` 14:00 / 11:00; note "Children of any age are welcome. No pets, and no smoking in the rooms. Quiet hours are 22:00 to 08:00." | `stay_info.check_in`, `.check_out`, `.house_rules` |
| `amenities[]` (16) | pool `facilities[0]`; restaurant `facilities[1]`; dietary `facilities[8]`; fitness area + shala `facilities[2–3]`; classes `offers[1–3]`; massage `facilities[4]`; WiFi, parking, airport shuttle, garden, sun terrace `facilities[7]`; private taxi `stay_info.transport`; laundry `facilities[5]` ("Please pay in cash"); safe `facilities[6]`; generator `stay_info.generator`; cot and extra bed `stay_info.house_rules` + `offers[8]` (US$20 per person per night) |
| `ratings[]` Booking 9.2/10 (468), Google 4.7/5 (213), captured 2026-11-06 | `reviews.booking`, `reviews.google`. The engine's stale 4.8 / 9.1 and the unverified TripAdvisor 4.5 are not used. |
| `testimonials[]` (6, verbatim) | `reviews.quotes[0,5,2,1,3,4]` (Peter, Alba R, Arianna, Lynette, Oishanee, Akhila). Dates null: not captured. Alba R's source is `site` (the business's own /restaurant page). |
| `contact` | phone/whatsapp `contact.phone`/`.whatsapp`; email `contact.email`; address `location.address` (Google's words, place names capitalised per playbook §6: "back to life road" → "Back to Life Road"); mapUrl `location.map_url` |
| `bookingLinks[]` (5) | `booking.engine_url` and `booking.engine_rooms` (deep links, audit F1/F11). Booking.com is not listed: the business pushes direct booking on every screen (`booking.path.note`). |
| `lessons`, `credentials`, `rentals`, `brands` | `[]`: no lessons, rental or shop (`businessType_note`). |

## Edits to the owner's words

- [0] ¶2: "The resort features 16 beautiful bungalows, each has its own unique charm and style inspired by wild nature and made from natural materials." → "…16 bungalows, each with its own charm and style, inspired by…". Dropped "beautiful" and "unique" (self-praise), fixed "each has" → "each with".
- [6]: "…enjoying every moment together. All you have to do is arrive and let us handle the rest!" → ends at "together." (the last sentence repeats the one before). Em dash → colon.
- `featureLine`: case only.

## Each fact once

16 bungalows (intro ¶2 only) · large pool (tagline; [1] ¶1 says "long pool" for its shape — **check**) · Kabalana (tagline; intro ¶1 owner; spot) · breakfast included ([5] ¶1 only; the amenities row was cut) · restaurant hours (hoursNote only) · massage prices (priceList only) · fitness prices (priceList only; [3] names the schedule, not the price) · distances ([7] only) · booking direct / best rate (closing only); live dates ([5] ¶2 only) · rooms' sizes and features (rooms[] only; [5] ¶1 lists only what every room shares).

## Owner items (what the owner would need to supply)

Room prices or a "from" rate · the real distance to Kabalana Beach · breakfast end time (12:00 or 11:30) · which inbox to publish · season and off-season closures · how guests book a massage · owner / chef / instructor names · opening year · surf help (board storage, lessons nearby) if any.
