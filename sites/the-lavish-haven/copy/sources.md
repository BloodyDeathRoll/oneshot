# copy sources — the-lavish-haven · en

Copywriter 0.3.0 · round 3 (third pass allowed by Shahar after copyeditor round 2 FAIL), 2026-09-23.

**This is the "no owner prose" case.** Nothing on the public web is written in this business's voice — Booking's "About this property" (`business.description`) is machine-generated. Every paragraph below was written from sourced facts in `dossier.json`. Keys are given as dossier paths; `reviews.quotes[n]` indexes the dossier array (0 Mya · 1 Shahar (excluded) · 2 Diane · 3 António · 4 Dariusz · 5 Aleksandra · 6 Roie · 7 Benjamin).

Shahar's rulings applied this round: a verbatim guest observation of a physical fact is a source for that fact (pool position, newness), never for a ranking, frequency or cause; `languagesSpoken` is empty unless the dossier holds staff languages; "available", not "free", for what the booking platforms show.

## Fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "The Lavish Haven" | `business.name.value` (Booking). Google's "The Lavish Haven Hotel And Resort" (`business.name.note`) not used |
| `tagline` | "A new hotel, two minutes from Kabalana" | "hotel": `business.type.note` "Booking category 'Hotel'". "new": `reviews.quotes[4]` Dariusz "It's a brand new hotel", `[2]` Diane "It's a new facility", `[5]` Aleksandra "The hotel is new" (guest observation of a physical fact). "two minutes from Kabalana": `location.distance_to_beach` "Kabalana Beach is a 2-minute walk"; `contradictions[0]` resolution "Use Booking's figure" |
| `spot` S1 | "Kabalana: a sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers." | `location.spot` (thesurfatlas.com, third-party surf guide) "sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers" — the source's words, qualifier kept. Shared context about the wave, not claimed by the business |
| `spot` S2 | "The beach is two minutes from the hotel, on foot." | `location.distance_to_beach`; `contradictions[0]` resolution. Subject is the beach, so no distance attaches to The Rock |
| `season` | `null` | `season.value` null, gap "not published by the business" |
| `closing` | "Rates move with the dates. Booking.com and Agoda show what is available." | S1: `gaps[]` "offers" ("nightly rates are live dated OTA inventory, not a published price list"); `booking.path.note` ("live inventory on Booking.com and Agoda"). S2: `booking.path.note`; `booking.engine_url`; `booking.other_engines.value[0]` (Agoda). TripAdvisor left out: a listing, not inventory. "available" per Shahar's ruling |
| `languagesSpoken` | `[]` | Empty: the dossier holds no staff-language key. `languages.seen` is languages seen in the material, `owner_language_hint` is a hint about the owner, neither is who serves guests. Owner item |
| `rooms[0–8]` | nine labels, beds, sleeps; `[0]` note "ground floor" | `room_types[0–8]`, one row each: label and beds from the value ("+" → "and"), `sleeps` only where the value gives it, "ground floor" from `[0]`'s value |
| `stayInfo.note` | "The front desk is staffed 24 hours, with private and express check-in and check-out." | `hours_note.value`; `facilities[8]`, `[9]`. No times: `stayInfo.note` gap, `gaps[]` "stayInfo" |
| `amenities[0–24]` | 25 rows | `facilities[0–24]`, index for index; every note ("open all year", "reservation needed", "additional charge") is the facility's own wording. `facilities[25]` (CCTV, key access, fire extinguishers) not used |
| `ratings[0]` | Booking.com 9.2/10, 34, URL | `reviews.booking.rating`, `.scale`, `.count`, `.source_url`. `capturedAt` is deployer-seeded from `reviews.booking.fetched_at` (2026-09-19) |
| `ratings[1]` | Google 5.0/5, 21 | `reviews.google.rating`, `.count`. No URL (as KA). `capturedAt` from `reviews.google.fetched_at` (2026-09-19), deployer |
| `testimonials[0–4]` | Mya · Dariusz · António · Roie · Benjamin | `reviews.quotes[0]`, `[4]`, `[3]`, `[6]`, `[7]`: text and author verbatim, ellipses as Booking renders them, no dates (dossier has none). Benjamin's German untranslated. `[1]` (Shahar) excluded |
| `contact.phone` | "+94764832988" | `contact.phone.value` (Google) |
| `contact.address` | "No166/1 walhengoda road, Ahangama 80650, Sri Lanka" | `location.address.value` — the Google listing address, character for character, postcode included (base.md constraint 9; playbook 0.5.0 §6). Booking's "166/2 Welhengoda Road" (`location.address_other_platforms[1]`) not used; the 166/1 vs 166/2 house number is `contradictions[3]`, an owner question |
| `contact.whatsapp` | absent | `contact.whatsapp` gap "not published". Schema-required: for the Payload seed / owner |
| `bookingLinks[0]` | "Check dates on Booking.com" | `booking.engine_url.value`; "check dates" rests on `booking.path.note` "live inventory" |
| `bookingLinks[1]` | "Check dates on Agoda" | `booking.other_engines.value[0]`; same note |

## Copy blocks — headings

| Block | Heading | Rests on |
|---|---|---|
| `copyBlocks[0]` intro | "Off the main road, over the surf" | `location.setting.value` "Off the main road, over the Kabalana surf spot" (note "from guest reviews"). Provenance caveat from review round 2: the only quote in the dossier that says "not on the main road" is `reviews.quotes[1]` (Shahar, excluded) — for Shahar to confirm |
| `copyBlocks[1]` about | "New, and it shows" | as `tagline` "new": `reviews.quotes[4]`, `[2]`, `[5]` |
| `copyBlocks[2]` about | "Staying longer" | the two accounts in its body: `reviews.quotes[0]` Mya, `[6]` Roie. States no cause and no count |
| `copyBlocks[3]` offer | "Nine kinds of room" | `room_types[]`, 9 entries — types, not a room count (`contradictions[1]`) |
| `copyBlocks[4]` offer | "Pool, restaurant, spa" | `facilities[0]`, `[1]`, `[3]` |
| `copyBlocks[5]` info | "Practicalities" | asserts nothing (framing) |

## Copy blocks — paragraphs

| Block | Paragraph | Rests on |
|---|---|---|
| intro ¶1 S1 | "Cafés and restaurants surround the hotel, and there is a fruit stand nearby." | `location.setting.value` "surrounded by cafes and restaurants"; `reviews.quotes[5]` Aleksandra "There are many cafes and a fruit stand nearby" (physical fact) |
| intro ¶1 S2 | "Guests score the location 9.6 out of 10 on Booking.com." | `reviews.booking.categories.Location` 9.6, `reviews.booking.scale` 10 |
| intro ¶2 | "Koggala Airport is about 5 km away." | `business.description.value` "Koggala Airport is 3.1 mi away" (= 4.99 km). Kept apart from the airport shuttle (info ¶1): no key says which airport the shuttle serves |
| about ¶1 | "The hotel is new. On Booking.com one guest calls it "brand new", another "a new facility"." | `reviews.quotes[4]` Dariusz "It's a brand new hotel"; `[2]` Diane "It's a new facility" — fragments quoted verbatim, attributed to guests, not restated in the business's voice |
| about ¶2 | cleanliness 9.7, comfort 9.7, staff 9.4, 34 reviews; Google 5.0/5 from 21 | `reviews.booking.categories` Cleanliness 9.7, Comfort 9.7, Staff 9.4; `reviews.booking.count` 34; `reviews.google.rating` 5.0, `.count` 21 |
| staying ¶1 S1 | "One guest wrote that they moved around many hotels until they found this one, and stayed over a month." | `reviews.quotes[0]` Mya "We moved around many hotels until we found the lavish and stayed over a month". One guest, no gender |
| staying ¶1 S2 | "Another extended their stay instead of going to another hotel." | `reviews.quotes[6]` Roie "we extended our stay in it instead of going to another one". No cancellation stated |
| offer ¶1 | balcony, garden view, deluxe king on the ground floor with private patio and pool view; superior kings; family studios and suites sleep four; two-bedroom suite sleeps five | `room_types[3]` balcony, `[2]` garden view, `[0]` "Deluxe King Room with Private Patio & Pool View, ground floor", `[1]` Superior King; `[4]` Deluxe Family Suite, `[5]` Family Studio, `[6]` Family Junior Suite, `[7]` Family Suite (all "sleeps 4"); `[8]` Two-Bedroom Suite "sleeps 5" |
| offer ¶2 S1 | "Each room has a work desk, soundproofing and free WiFi." | `business.description.value` "each room has a work desk, soundproofing and free WiFi"; `facilities[4]` "free WiFi in all areas" |
| offer ¶2 S2 | "The family rooms have air conditioning and private bathrooms." | `business.description.value` "family rooms with air-conditioning, balconies and private bathrooms" — scope kept to family rooms. (Balconies not repeated here: only `room_types[3]` names one.) |
| offer ¶3 | "There is no published price list. Rates go by date, and the booking links show what is available." | `gaps[]` "offers" ("nightly rates are live dated OTA inventory, not a published price list"); `offers` `[]`; `booking.path.note` "live inventory on Booking.com and Agoda". No claim that rates vary by room. "available" per Shahar's ruling |
| pool ¶1 S1 | "An outdoor pool, open all year, in the middle of the hotel." | `facilities[0]` "year-round outdoor swimming pool"; position: `reviews.quotes[3]` António "the swimming pool at the center" (physical fact) |
| pool ¶1 S2 | restaurant: breakfast with local specialities and fresh pastries, and Chinese, Indian and Italian dishes | `facilities[1]`; `business.description.value` "breakfast with local specialities, fresh pastries and Chinese, Indian and Italian dishes". No service hours |
| pool ¶1 S3–S4 | coffee house on site; spa and wellness centre | `facilities[2]`, `[3]` |
| pool ¶2 | family rooms, outdoor play area, kids' meals and babysitting at an extra charge | `facilities[5]`; `facilities[17]` "outdoor play equipment for kids", `business.description.value` "outdoor play area"; `facilities[19]` "kids' meals (additional charge)", `[18]` "babysitting / child services (additional charge)" |
| info ¶1 | 24-hour front desk, private and express check-in; free private parking by reservation; airport shuttle | `facilities[8]`, `[9]`, `hours_note.value`; `facilities[10]` "free private parking (reservation needed)" — no location stated (`contradictions[2]`); `facilities[6]` "airport shuttle" |
| info ¶2 | daily housekeeping, laundry, dry cleaning and ironing; bicycle rental; facilities for guests with disabilities; non-smoking rooms | `facilities[21]`, `[22]`, `[20]`, `[11]`, `[12]` (charges carried in `amenities[]` notes) |

## Deliberately not written
- **No check-in or check-out times.** Not published anywhere (`gaps[]` "stayInfo"). The copy states only the 24-hour front desk, which is sourced.
- **No room count.** `business.businessType_note` says 17 rooms from a review summary; Booking lists 9 room types (`contradictions[1]`, unresolved).
- **No "easy parking", no parking location.** Booking says free private parking (reservation needed); a guest calls the area very small and hard with a car (`contradictions[2]`). The copy states parking exists and is by reservation, nothing about size or where.
- **No room size.** The only size claim ("over the top large rooms") is in `reviews.quotes[1]`, the excluded review.
- **No "first customer".** It exists only in the `business.since` gap note, which has no `source_url`.
- **No staff names.** `business.staff` ("Amal and his daughters; receptionist Pramodee") is named by guests and marked unconfirmed.
- **No claim that the staff are why guests stay longer**, and no count of guests who did: two accounts, each told as the guest told it.
- **No A/C or private bathroom promised for non-family rooms.** Booking's text scopes them to family rooms; the owner should confirm the rest.
- **No airport named for the shuttle.** The shuttle and the Koggala distance sit in different blocks.
- **Languages spoken left empty.** No staff-language key.
- **The "Shahar, Israel" review is excluded.** The author name matches the operator of this pipeline (`reviews.quotes[1].note`); it is not used until that is confirmed. `location.setting` "off the main road" may rest on it (see intro heading).
- **Truncated quotes are carried with their ellipsis**, exactly as Booking renders them, rather than completed.
- **"Two minutes" cut from the intro.** It stays in `tagline` and `spot` S2 (the gold-page line); the intro now carries the surroundings and the location score instead.
