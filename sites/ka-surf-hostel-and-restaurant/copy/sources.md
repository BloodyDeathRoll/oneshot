# copy sources — ka-surf-hostel-and-restaurant · en

One line per paragraph, naming the `dossier.json` fields it rests on. A paragraph with no line here is not shippable.

| Block | Paragraph | Rests on |
|---|---|---|
| businessName | "KA Surf Hostel" | `business.name` ("KA Surf Hostel", Booking.com) |
| tagline | "Surf, chill and feel at home in Ahangama" | `business.tagline` ("Surf, Chill & Feel at Home in Ahangama") — the owner's own Hostelworld headline, lower-cased, "&" written as "and" |
| languagesSpoken | `["en"]` | `languages_spoken[0]` ("English", Booking.com) |
| intro · heading | "Five minutes from Kabalana Beach" | `location.distance_to_beach` ("Kabalana Beach 450 yd / a 5-minute walk"); the body says "walk" |
| intro ¶1 | a family runs it and sets out to make you feel at home from the moment you arrive; Kabalana Beach is a five-minute walk | `business.run_by` ("a local family") · `business.description_long` ("managed by a local family who are passionate about making you feel at home from the moment you arrive") — stated as the family's aim, not as a guest's experience · `location.distance_to_beach` ("a 5-minute walk") |
| intro ¶2 | dorms or private rooms | `room_types[0–5]` (3 dorm types, 3 private) · `business.description_long` ("Dorms & Private Rooms: Options for every kind of traveler") |
| about (staff) · heading | "What guests say about the staff" | framing: labels the two paragraphs below, asserts nothing itself |
| about (staff) ¶1 | guests say "family"; the dengue story | `reviews.quotes[1]` Clara, `[2]` Luzzi, `[6]` Nanet ("family"), `[7]` Elena ("family owned") · `business.run_by.note` ("corroborated by many guest reviews calling it family-run") · `reviews.quotes[9]` Mia ("I got dengue in Kandy and the staff at KA helped nurse me back to health with Ayurvedic medicines (on top of what the hospital was already giving me)") — reported as her account (the copy says *wrote that*), not in the business's voice |
| about (staff) ¶2 | staff top score on Booking; 9.9 on Hostelworld behind value for money and security | `reviews.booking.categories` (Staff 9.9 is the highest; next Value for money 9.4) · `reviews.hostelworld.categories` (Staff 9.9; Value for Money 10.0 and Security 10.0 higher; all others ≤ 9.8) |
| about (breakfast) · heading | "Breakfast, every day" | `business.description_long` ("daily free healthy breakfast") — "daily" means served every day, nothing about it changing; "free" is left to `amenities[0]` |
| about (breakfast) · body | rotis, fruit, pancakes, eggs, vegan options | `business.description_long` ("(rotis, fruits, pancakes, eggs — vegan options available)") only. Elena's details (Sri Lankan dish, hoppers, fruit platter, changes every day) are left to her testimonial (`testimonials[1]`). Not written: `facilities[2]` ("continental, full English/Irish", Booking.com) against the owner's list — a conflict `contradictions[]` does not record; neither is stated |
| offer · heading | "Dorms and private rooms" | `room_types[0–5]` · `business.description_long` ("Dorms & Private Rooms") |
| offer ¶1 | room list; A/C and fan, private lockers and a personal fridge in every room; modern bathrooms; hot showers | `room_types[0–5]` · `business.description_long` ("A/C & fan in every room; private lockers & personal fridge in every room; modern bathrooms with hot showers") · `facilities[22]` ("A/C and fan in every room") · `facilities[23]` ("personal fridge in every room") · `facilities[24]` ("hot showers"). Lockers kept plural, as the owner writes them. Not written: the outdoor bathroom — guests only (`reviews.quotes[0]` Maximilian, "the outdoor bathroom got a roof"; `reviews.quotes[7]` Elena, "the whole outdoor thing", which stays in her testimonial) |
| offer ¶2 | rates change with the dates; the booking links show what is available (Shahar's wording ruling, 2026-09-23: "available", not "free", for availability) | `booking.path.note` ("live inventory on Booking.com, Hostelworld and Agoda") · `booking.engine_url` · `booking.other_engines`. No season: `season.value` is null ("not published by the business") |
| info (what is here) · heading | "What is here" | framing: labels the paragraphs below, asserts nothing itself |
| info (what is here) ¶1 | garden and chill zone, filtered water, laundry, minimarket, scooter rental with surf rack, luggage storage, lockers, 24-hour reception | `business.description_long` ("beautiful green garden & chill zone"; "free filtered water — refill anytime"; "cheap scooter rental (also with surf rack possible)"; "laundry service available"; "24/7 reception") · `facilities[4]` ("garden") · `facilities[21]` ("free filtered water") · `facilities[19]` ("laundry service") · `facilities[12]` ("minimarket on site") · `facilities[20]` ("scooter rental (surf rack available)") · `facilities[8]` ("luggage storage") · `facilities[16]` ("free security lockers") · `facilities[10]` ("24-hour front desk") · `hours_note` ("Reception 24 hours") |
| info (what is here) ¶2 | pets on request at no charge; no children | `facilities[15]` ("pets allowed on request, no extra charge") · `house_rules[1]` ("Children are not allowed") |
| info (getting here) · heading | "Getting here" | framing: labels the paragraph below, asserts nothing itself |
| info (getting here) ¶1 | Ahangama, five-minute walk to Kabalana; airport about 5 km; station a little over 2 km; shuttle | `location.address.value` ("207/A welahangoda, Ahangama, Sri Lanka" — the town only; no postcode in this paragraph) · `location.distance_to_beach` ("a 5-minute walk") · `location.nearby` ("Koggala Airport": "3.3 mi" ≈ 5.3 km; "Ahangama Railway Station": "1.3 mi" ≈ 2.1 km) · `facilities[13]` ("shuttle service", Booking.com) · `facilities[18]` ("airport transfers", Hostelworld) |
| spot | Kabalana sandy beach break for beginners and intermediates; The Rock reef A-frame for advanced surfers | `location.spot` ("sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers") — third-party surf guide, written as a description of the wave, not as a claim by the business; no swell condition stated |
| season | `null` | `season.value` null ("not published by the business") · `gaps[]` "season" ("not published") |
| rooms[0–5] | 3 dorm bunk rows, Double room, 2 Deluxe double rooms | `room_types[0]`, `[1]`, `[2]`, `[3]`, `[5]`, `[4]` in that order. Labels shortened ("Bunk Bed in Mixed Dormitory Room" → *Bunk bed in mixed dormitory*); `beds` copied from the brackets ("1 extra-large double bed", "1 single bed"). The dorm *1 bunk bed* is derived from the singular "Bunk Bed" in each label, not copied |
| stayInfo.checkInFrom / checkInTo / checkOutTo | 13:00–23:00; out by 13:00 | `hours_note` ("check-in 13:00–23:00, check-out until 13:00", Hostelworld). `contradictions[1]`: Booking.com says "available 24 hours"; unresolved ("ask the owner"), with the harvester's lean "Hostelworld's specific window is the more likely truth", which this follows. Owner item |
| stayInfo.note | 24-hour reception; no children, no cots or extra beds | `hours_note` ("Reception 24 hours") · `facilities[10]` ("24-hour front desk") · `house_rules[1]` ("Children are not allowed; no cots or extra beds") |
| amenities[0] | "Free breakfast" | `facilities[2]` ("free breakfast (continental, full English/Irish)", Booking.com) · `business.description_long` ("daily free healthy breakfast"); the breakfast type is not stated (see about (breakfast) · body) |
| amenities[1] | "Free WiFi" | `facilities[0]` ("free WiFi (fiber, all areas)") — existence only; the fibre/reliability claim is left out (`contradictions[2]`) |
| amenities[2] | "Air conditioning and a fan in every room" | `facilities[22]` ("A/C and fan in every room") · `business.description_long` ("A/C & fan in every room") |
| amenities[3] | "Private lockers and personal fridge in every room" | `business.description_long` ("private lockers & personal fridge in every room") — the owner's number kept on both sides: lockers plural, fridge singular, "&" written as "and"; matches `copyBlocks[3]` ("private lockers", offer ¶1) · `facilities[16]` ("free security lockers") · `facilities[23]` ("personal fridge in every room") |
| amenities[4] | "Hot showers" | `facilities[24]` ("hot showers") · `business.description_long` ("hot showers") |
| amenities[5] | "Garden and chill zone" | `business.description_long` ("beautiful green garden & chill zone") · `facilities[4]` ("garden") |
| amenities[6] | "Free filtered water" | `facilities[21]` ("free filtered water") |
| amenities[7] | "Scooter rental" · note "surf rack available" | `facilities[20]` ("scooter rental (surf rack available)") |
| amenities[8] | "Laundry service" | `facilities[19]` ("laundry service") |
| amenities[9] | "Minimarket on site" | `facilities[12]` ("minimarket on site") |
| amenities[10] | "Luggage storage" | `facilities[8]` ("luggage storage") |
| amenities[11] | "Tour desk" | `facilities[9]` ("tour desk") |
| amenities[12] | "24-hour reception" | `facilities[10]` ("24-hour front desk") · `hours_note` ("Reception 24 hours") |
| amenities[13] | "24-hour security" | `facilities[11]` ("24-hour security") |
| amenities[14] | "Airport transfers" | `facilities[18]` ("airport transfers") |
| amenities[15] | "Bicycle parking" | `facilities[17]` ("bicycle parking", Hostelworld) — separate from the car-parking contradiction (`contradictions[0]`) |
| amenities[16] | "Pets allowed on request" · note "no extra charge" | `facilities[15]` ("pets allowed on request, no extra charge") |
| ratings[0–2] | Hostelworld 9.8/10 (66) · Booking.com 9.5/10 (38) · Google 4.8/5 (42) | `reviews.hostelworld` (rating, count, source_url) · `reviews.booking` · `reviews.google` (no URL written for Google) |
| testimonials[0–4] | Clara · Elena · Mia · Wolfgang · Saketh | `reviews.quotes[1]`, `[7]`, `[9]`, `[3]`, `[8]`, quotes verbatim; `source` from each quote's `source_url`; `date` only where the dossier gives one; authors shortened to first name + country |
| contact.phone | +94773746053 | `contact.phone` |
| contact.address | "207/A Welahangoda, Ahangama 80650, Sri Lanka" | `location.address.value` — the Google listing address ("207/A welahangoda, Ahangama, Sri Lanka"), place name capitalised (base.md constraint 9; playbook §6). Google shows no postcode (`gaps[]` "location.address.postcode"); **80650 from Booking.com**, `location.address_other_platforms[0]` ("No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka"). Order and result per Shahar, 2026-09-23 |
| bookingLinks[0–2] | "Check dates on Hostelworld / Booking.com / Agoda" | `booking.other_engines[0]` · `booking.engine_url` · `booking.other_engines[1]`; *check dates* rests on `booking.path.note` ("live inventory") |

## Deliberately not written
- **No WiFi speed claim.** The owner advertises "Reliable Wi-Fi (Fiber Internet)" (`contradictions[2]`, which also records the 2.5/10 score); the harvester's phrasing of the same claim, "reliable fiber internet", is in `reviews.booking.note`. Booking guests score Free WiFi **2.5/10** (`reviews.booking.note`, `contradictions[2]`). Neither claim appears in the copy.
- **No parking statement.** Booking says none, Hostelworld says free (`contradictions[]`).
- **No restaurant.** Google's listing name says "and restaurant" but no source describes one (`gaps[]`).
- **No check-in claim beyond Hostelworld's window.** Booking says "24 hours", Hostelworld says 13:00–23:00; the specific window is used and the 24-hour reception stated separately.
- **No prices.** Live dated inventory only.
- **No season.** `season.value` is null; rates are said to change with the dates only.
- **No breakfast times, no surf timing.** The dossier gives breakfast as "daily" and nothing more (`hours` is empty), so nothing is timed against it.
- **No outdoor or open-air bathroom.** Only guests mention it: `reviews.quotes[0]` Maximilian ("the outdoor bathroom got a roof so its protected but never humid") and `reviews.quotes[7]` Elena ("bathrooms are nice with the whole outdoor thing"), which stays in her testimonial. *Open to the sky* was the copy's own phrasing, cut in round 6 — it is not a dossier quote, and Maximilian's roof rules it out.
