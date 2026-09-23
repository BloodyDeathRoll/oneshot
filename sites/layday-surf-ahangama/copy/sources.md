# copy sources — layday-surf-ahangama · en · copywriter 0.3.1

One line per paragraph, heading and field, naming the `dossier.json` keys it rests on. Guest observations of physical facts count as sources; rankings, frequencies and causes do not. A paragraph with no line here is not shippable. Rewritten 2026-09-23 (copywriter 0.3.0), every sentence re-checked; round 3 fixes 2026-09-23 (copywriter 0.3.1). The Paragraph column quotes or closely paraphrases the current `en.json`.

| Block | Paragraph | Rests on |
|---|---|---|
| businessName | "Layday Surf Ahangama" | `business.name` (Booking.com) |
| tagline | "Surf, chill and feel at home in Ahangama" | `business.tagline` ("Surf, Chill & Feel at Home in Ahangama") — the owner's own Hostelworld headline, lower-cased, "&" written as "and" |
| intro · heading | "A two-minute walk from Kabalana" | `reviews.quotes[7]` Beth ("just a 2-min walk to Kabalana Beach") · `location.distance_to_beach` ("guests say a 2-minute walk"). The only distance in the block; the body no longer repeats it as "a few steps away" |
| intro ¶1 | "Layday is small and new, with a shared kitchen, a terrace and a garden." | small: `reviews.quotes[0]` Taiya ("It's a tiny place"), `[1]` Taiya ("quite small") · new: `[7]` Beth ("Newly built"), `[4]` Akshay ("New and clean"), `[3]` Alina ("new and comfy") · `facilities[5]` ("shared kitchen …") · `facilities[7]` ("garden and terrace with outdoor dining"). No ownership claim: `business.run_by` is "unconfirmed" and rests on one guest (`reviews.quotes[6]`), and who owns a place is not guest-observable |
| intro ¶2 | "It is quiet, too." + Catherine's words, quoted | `reviews.quotes[5]` Catherine ("so it is very quiet which was amazing") — quoted as her words; her cause ("one dorm room … so") is not restated as fact |
| about (dorm) · heading | "Just one dorm" | `reviews.quotes[5]` Catherine ("just one dorm room") · `room_types[0]` |
| about (dorm) ¶1 | "There is only the one dormitory."; three guests on cleanliness, quoted (one / another / a third) | `room_types[0]` · `reviews.quotes[5]` Catherine · quotes: `[6]` Jennine ("Super clean"), `[5]` Catherine ("very clean"), `[7]` Beth ("absolutely spotless") — three guests, no frequency claimed |
| about (dorm) ¶2 | 10 out of 10 in every Hostelworld category, seven named; "though that is from ten reviews" | `reviews.hostelworld.categories` (all seven 10.0, named as the platform names them, "Value for Money" lower-cased) · `reviews.hostelworld.count` = 10. Overall 9.8 sits in `ratings[0]`; nothing here calls it perfect |
| about (kept) · heading | "Newly built, and kept that way" | `reviews.quotes[7]` Beth ("Newly built"; "he keeps it immaculate daily") · `facilities[15]` ("daily housekeeping") |
| about (kept) ¶1 S1 | "There is housekeeping every day." | `facilities[15]` ("daily housekeeping", Booking.com) |
| about (kept) ¶1 S2 | one guest: beds "super comfy", showers "amazing" | `reviews.quotes[7]` Beth ("Super comfy beds", "amazing showers") — attributed to one guest |
| about (kept) ¶1 S3 | two stayed on longer than they had planned; one "only supposed to stay a night", "ended up here a week" | `reviews.quotes[7]` Beth ("I extended my stay way longer than expected") · `reviews.quotes[0]` Taiya ("I was only supposed to stay a night … ended up here a week") — the quoted part lies before Booking's truncation |
| offer · heading | "The room" | `room_types[0]` (one room type) — labels the block |
| offer ¶1 S1 | "The dormitory is air-conditioned, with lockers and luggage storage." | `room_types[0]` · `facilities[8]` ("air conditioning") · `facilities[12]` ("lockers"), `[20]` ("free security lockers") · `facilities[14]` ("baggage storage") |
| offer ¶1 S2 | shared kitchen with a kettle, a dishwasher and kitchenware; hot showers and a dining area | `facilities[5]` ("shared kitchen with kitchenette, dishwasher, kettle and kitchenware") · `facilities[24]` ("hot showers") · `facilities[6]` ("dining area and seating area"). Showers are listed with the shared spaces, not hung on the dormitory, so they do not read as en-suite (`facilities[11]` "shared bathroom"); no new claim added. Terrace and garden now sit in the intro only |
| offer ¶2 | "Rates change with the dates. The booking links show what is available." | `booking.path.note` ("live inventory on Booking.com, Hostelworld and Agoda") · `booking.engine_url` · `booking.other_engines`. No season: `season.value` is null ("not published by the business") |
| info (door) · heading | "Finding the door" | `location.finding_it` ("a door through to the Layday Surf area") |
| info (door) ¶1 S1 | one guest found it "a little bit difficult to find" | `reviews.quotes[5]` Catherine ("A little bit difficult to find") — quoted, one guest |
| info (door) ¶1 S2–S4 | Google Maps; large black gate, open it; wooden platform, door through to the Layday area to the right of the house | `location.finding_it` ("Follow Google Maps — there is a large black gate that you need to open; once through the gate there is a wooden platform with a door through to the Layday Surf area to the right of the house") — a guest's description of a physical route, kept in its own order. Not written: the promised sign (a guest's report of a promise) |
| info (practical) · heading | "Practicalities" | labels the block, asserts nothing |
| info (practical) ¶1 | check-in 14:00–19:00, out by 14:00; credit cards not accepted; taxes included; non-smoking | `stayInfo.checkInFrom` / `checkInTo` / `checkOutTo` · `hours_note` · `stayInfo.note` ("Credit cards not accepted · non-smoking · taxes included") |
| info (practical) ¶2 | WiFi and private parking free; laundry, daily housekeeping, bicycles to rent, airport shuttle; pets at no extra charge | `facilities[1]` ("free private parking") · `facilities[0]` ("free WiFi") · `facilities[16]` ("laundry … (additional charge)", not called free) · `facilities[15]` · `facilities[17]` ("bicycle rental (additional charge)") · `facilities[2]` ("airport shuttle") · `facilities[19]` ("pets allowed, no extra charge") |
| spot | Kabalana sandy beach break for beginners and intermediates; The Rock reef A-frame for advanced surfers | `location.spot` (thesurfatlas.com, third-party) — as a description of the wave, not a claim by the business; no swell condition, no position stated |
| season | `null` | `season.value` null · `gaps[]` "season" ("not published") |
| rooms[0] | "Bed in the dormitory" · note "The only room: one air-conditioned dormitory" | `room_types[0]` (one type listed) · `reviews.quotes[5]` Catherine ("just one dorm room") · `facilities[8]`. No `beds` or `sleeps`: `contradictions[0]` (6-bed vs 4 bunk beds), unresolved |
| stayInfo | 14:00–19:00, out by 14:00; note | `stayInfo.*` · `hours_note` ("Reception has limited hours") · `stayInfo.note` |
| amenities[0–18] | one row each | `facilities[0]` WiFi · `[1]` parking · `[8]` A/C · `[5]` kitchen · `[6]` dining/seating · `[7]` garden/terrace · `[24]` hot showers · `[20]` free security lockers · `[14]` luggage · `[15]` housekeeping · `[23]` washing machine · `[16]` laundry (additional charge) · `[17]` bicycles (additional charge) · `[2]` airport shuttle · `[13]` concierge · `[21]` free city maps · `[18]` 24-hour security, CCTV, key access · `[18]` safety deposit box · `[19]` pets |
| ratings[0–2] | Hostelworld 9.8/10 (10) · Booking.com 10/10 (6) · Google 5/5 (15) | `reviews.hostelworld` · `reviews.booking` · `reviews.google` (no URL written for Google). `capturedAt` for all three is `fetched_at` 2026-09-19 (left to the deployer, per schema v0.4) |
| testimonials[0–4] | Beth · Jennine · Catherine · Akshay · Taiya | `reviews.quotes[7]`, `[6]`, `[5]`, `[4]`, `[1]`, verbatim; `source` from each `source_url`; `date` only where the dossier gives one; authors shortened to first name + country |
| contact.phone | +94778553343 | `contact.phone` (Google listing) |
| contact.address | "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka" | `location.address.value` — the Google listing address ("Warnagiri welhengoda, Ahangama 80650, Sri Lanka"), postcode included, place name capitalised, nothing else changed (base.md constraint 9; playbook §6). Not used: `location.address_other_platforms[]` (Hostelworld, Booking.com) |
| contact.whatsapp | absent | `contact.whatsapp` null, `gaps[]` ("not published"). Schema-required; open item |
| bookingLinks[0–2] | "Check dates on Hostelworld / Booking.com / Agoda" | `booking.other_engines[0]` · `booking.engine_url` · `booking.other_engines[1]`; *check dates* rests on `booking.path.note` ("live inventory") |
| languagesSpoken | `[]` | `languages_spoken` is empty. `languages.seen` ["en"] is the language of the listings, not of the staff, so it is not used |

## Deliberately not written
- **No bed count.** Booking says a 6-bed dorm, a guest says one dorm of 4 bunk beds (`contradictions[0]`). The copy says "the one dormitory" / "the dormitory" and nothing more — not even "bunk beds". Catherine's quote carries her own count as her own words.
- **No price.** Live dated OTA inventory (`gaps[]` "offers").
- **No season.** `season.value` is null; rates are said to move with the dates only.
- **No claim about reception hours beyond "limited"**, which is Hostelworld's own wording.
- **No wardrobe.** No dossier key holds one (removed 2026-09-23).
- **No staff names or ownership in the business's voice.** Rukshan and "his family" are named only by guests (`business.run_by.note`: "unconfirmed"); who owns the place is not guest-observable. Rukshan appears in Beth's testimonial and the family in Jennine's, not in the copy (ownership removed from the intro, round 3).
- **No sign at the gate.** Only a guest's report that the owner promised one.
- **No staff languages.** `languages_spoken` is empty.
