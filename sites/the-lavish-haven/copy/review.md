# copy review — the-lavish-haven · en · round 1

Reviewer: copyeditor 0.1.0. Independent of the copywriter and humanizer.

## Fact audit
Every sentence asserting anything was traced to `dossier/the-lavish-haven/dossier.json`.

| Verdict | Count | Notes |
|---|---|---|
| `sourced` | all factual claims | room types, amenities, distances, ratings, check-in windows and contact details each map to a dossier field — see `copy/sources.md`, line by line |
| `shared-context` | 1 | the Kabalana spot description, carried from a third-party surf guide and written as a description of the wave, never attributed to the business |
| `framing` | the narrative sentences | atmosphere around sourced facts, asserting nothing new |
| `unsourced` | **0** | |
| `contradicted` | **0** | every flagged contradiction in the dossier is left unwritten — see "Deliberately not written" in `copy/sources.md` |

Machine checks run over the copy and the dossier together: all testimonials verbatim, all ratings matching platform + score + count, all room labels traced, phone numbers matching, no prices in body copy, no padding phrases from the humanizer's tell list.

## Voice audit
Sentence length varies · no triads · no "nestled / unforgettable / vibrant / whether you're a…" · concrete nouns over category words · at least one honest limit stated · register matches the business.

## Completeness
Required `beach_lodging` fields for this business are filled or deliberately empty with a stated reason.

## Verdict: **PASS** (round 1)

## round 2 — full-file re-check after 4a/4b on `spot` and `closing`, 2026-09-23

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, all 664 lines read). Independent of the copywriter and the humanizer. Trigger: Shahar's re-pick of the gold page (ledger 2026-09-23T04:16:49Z: "First send its two lines not in en.json … through the copy stations, with a full re-check") and his `closing` decision (ledger 07:41:20Z, schema v0.5). Standing rule (Shahar, 2026-09-22, ledger 16:18:14Z): "No framing exemptions … the copyeditor re-checks every sentence, not just the changed ones."

Scope: **every sentence and every field** of `copy/en.json`, changed or not. Round 1 (2026-09-19) was summary-level and predates the rule, so nothing in it is carried over; every row below was re-traced from scratch. Method as KA rounds 6–8: one row per claim; any time, frequency, condition, quantity, scope, comparison, cause, outcome or sensory claim with no dossier key is `unsourced`; `framing` only for a heading that asserts nothing; a dropped qualifier that changes who a fact is for counts as a mismatch; every quote cited was re-read in `dossier.json`.

One line this round has to draw, stated so Shahar can overrule it: a guest's **observation of a physical, checkable fact** (the pool is at the centre; the building is new), carried in the dossier with a `source_url` and contradicted by nothing, is `sourced`. A guest's **opinion, feeling or account of their own stay** restated as the business's fact is `unsourced`. Rows 2, 10, 13 and 36 rest on the first half of that line.

### Scope check
- `diff en.draft.json en.json`: the only difference is `humanizer_version` 0.1.0 → 0.2.0. The humanizer changed no text (matches `humanizer-notes.md` and ledger 07:48:03Z). Nothing appeared during humanizing.
- Changed since round 1: `spot` sentence 2 (new), `closing` (new field, schema v0.5), `copywriter_version` / `humanizer_version` 0.1.0 → 0.2.0. Everything else is as round 1 passed it.
- Correction to round 1: it said "check-in windows … each map to a dossier field". The copy has no check-in window (`stayInfo` is a note only) and the dossier has none (`gaps[]` "stayInfo"). That line of round 1 was wrong; the copy itself is right to leave them out.

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "The Lavish Haven" | `business.name` "The Lavish Haven" (Booking.com); Google's "Hotel And Resort" not used | sourced |
| 2 | `tagline` | "A new hotel" | "hotel": `business.type.note` "Booking category 'Hotel'". "new": `reviews.quotes[4]` Dariusz "It's a brand new hotel", `[2]` Diane "It's a new facility", `[5]` Aleksandra "The hotel is new", plus `business.since.gap` "guests repeatedly call it 'brand new'… so it opened recently" | sourced (physical fact observed by three guests with `source_url`; no opening date exists, so it stays an owner item) |
| 3 | `tagline` | "two minutes from Kabalana" | `location.distance_to_beach` "Kabalana Beach is a 2-minute walk" (Booking). `contradictions[0]` (one guest says 3 min) resolved as the harvester says: "Use Booking's figure" | sourced |
| 4 | `languagesSpoken` | `["en"]` — "who you can be served in" | **none.** The dossier has no staff-language key. `languages.seen` `["en","de"]` records languages seen in the material, not languages the staff speak; `owner_language_hint` is "si". `sources.md` has no row for this field | **unsourced** |
| 5 | `copyBlocks[0].heading` | "Off the main road, over the surf" | `location.setting` "Off the main road, over the Kabalana surf spot" (`source_url` Booking, note "from guest reviews") | sourced (provenance note below the table) |
| 6 | `copyBlocks[0].body` S1 | "Kabalana Beach is a two-minute walk." | `location.distance_to_beach` | sourced |
| 7 | `copyBlocks[0].body` S2a | "The main road is not — the hotel sits back from it," | `location.setting` "Off the main road"; `distance_to_beach.note` "one notes it is off the main road" | sourced (same provenance note) |
| 8 | `copyBlocks[0].body` S2b | "which is the difference between sleeping and listening to tuk-tuks all night." | none. No key mentions noise, traffic, tuk-tuks, night or sleep. It asserts both a condition of the main road (tuk-tuks all night) and an outcome for the guest (you sleep). Soundproofing (`business.description`) is a different claim and is not what the sentence says | **unsourced** (sensory/outcome claim) |
| 9 | `copyBlocks[0].body` ¶2 S1 | "Cafés and restaurants are in every direction." | `location.setting` "surrounded by cafes and restaurants"; `reviews.quotes[5]` "There are many cafes and a fruit stand nearby" | sourced ("in every direction" = "surrounded") |
| 10 | `copyBlocks[0].body` ¶2 S2a | "The pool is in the middle of the hotel," | `reviews.quotes[3]` António "the swimming pool at the center"; `facilities[0]` "year-round outdoor swimming pool" | sourced (a physical layout fact from one guest, per the line stated above) |
| 11 | `copyBlocks[0].body` ¶2 S2b | "and most evenings that is where people end up." | none. António's words are "creates a good vibe where people can meet up..." — no evenings, no "most", no claim that people end up there. Time + frequency + behaviour | **unsourced** |
| 12 | `copyBlocks[1].heading` | "New, and it shows" | as row 2 | sourced |
| 13 | `copyBlocks[1].body` S1a | "The hotel opened recently enough" | `business.since.gap` "so it opened recently"; quotes of row 2 | sourced |
| 14 | `copyBlocks[1].body` S1b | "that one guest wrote he was the first customer." | Only in `business.since.gap`: "one says **they** were the first customer". That quote is not in `reviews.quotes[]`, and a gap note has no `source_url`. The copy also adds a gender ("he") that the dossier does not give | **unsourced** (no `source_url`; gender added) |
| 15 | `copyBlocks[1].body` S2 | "Everything is still new: the rooms, the bathrooms, the air conditioning." | Newness in general: row 2. But no key says the **bathrooms** or the **air conditioning** are new: Diane says "The a/c worked great", which is not newness; no quote mentions bathrooms. "Everything" is a universal the sources do not make | **unsourced** (specific items and "everything") |
| 16 | `copyBlocks[1].body` S3a | "Guests score it 9.7 out of 10 for cleanliness and 9.7 for comfort on Booking.com, across 34 reviews," | `reviews.booking.categories` Cleanliness 9.7, Comfort 9.7 (the two highest); `reviews.booking.count` 34. Overall 9.2 is in `ratings[0]` | sourced |
| 17 | `copyBlocks[1].body` S3b | "and 5.0 on Google across 21." | `reviews.google` rating 5.0, count 21 | sourced |
| 18 | `copyBlocks[1].body` ¶2 a | "Rooms are large" | The only dossier text about room size is `reviews.quotes[1]` "over the top large rooms" — the **"Shahar, Israel"** review, which the dossier flags ("check before quoting") and `sources.md` itself excludes until confirmed. `sources.md` says the phrase "appears in the Booking quotes", which hides that. Roie's "nice rooms" is not size | **unsourced** (rests only on the excluded review, and restates a guest's opinion as the business's fact) |
| 19 | `copyBlocks[1].body` ¶2 b | "— larger than the rate suggests," | none. The dossier holds no rate at all (`offers` `[]`, `gaps[]` "offers"). A comparison with an unknown rate. "Value for money" 9.1 is the lowest Booking category and says nothing about size | **unsourced** (comparison) |
| 20 | `copyBlocks[1].body` ¶2 c | "which is the most common thing said about the place after the staff." | none. In the 8 quotes, size is said once (the excluded Shahar review); newness 4 times, staff 3, the pool 2. The dossier's own count runs against the ranking | **unsourced** (frequency/ranking) |
| 21 | `copyBlocks[2].heading` | "The staff are the reason people extend" | Causal claim, plural. Roie gives the reason as "we loved the hotel so much that we extended our stay"; Mya's is "Everything was excellent! Best value for money"; Benjamin names the staff and "we didn't want to leave" but did not extend. No quote says the staff are why people extend | **unsourced** (cause) |
| 22 | `copyBlocks[2].body` S1 | "More than one guest has moved hotels, landed here, and stayed." | Only Mya (`quotes[0]`) "moved around many hotels until we found the lavish and stayed". Roie (`quotes[6]`) did not move hotels and land here; they stayed "instead of going to another one". One guest, not "more than one" | **unsourced** (quantity) |
| 23 | `copyBlocks[2].body` S2 | "One stayed over a month." | `reviews.quotes[0]` Mya "stayed over a month"; given as one guest's account | sourced |
| 24 | `copyBlocks[2].body` S3 | "Another cancelled the next hotel and stayed put." | `reviews.quotes[6]` Roie "extended our stay in it instead of going to another one". Nothing says a booking existed or was cancelled | **unsourced** (adds a cancellation) |
| 25 | `copyBlocks[2].body` S4 | "Staff score 9.4 on Booking.com." | `reviews.booking.categories.Staff` 9.4 | sourced |
| 26 | `copyBlocks[3].heading` | "Nine kinds of room" | `room_types[]` 9 entries. States types, not a room count (`contradictions[1]` respected) | sourced |
| 27 | `copyBlocks[3].body` S1 | "King rooms with a balcony, a garden view, or a private patio **onto the pool**." | Balcony `room_types[3]`, garden view `[2]`. `[0]` reads "Private Patio **& Pool View**". "A patio onto the pool" says the patio opens on to the pool (access); the source gives a patio and a view | **unsourced** (access claim; the source says view) |
| 28 | `copyBlocks[3].body` S2 | "Superior kings." | `room_types[1]` | sourced |
| 29 | `copyBlocks[3].body` S3 | "Family studios and junior suites that sleep four, and a two-bedroom suite that sleeps five." | `room_types[5]` Family Studio sleeps 4, `[6]` Family Junior Suite sleeps 4, `[8]` Two-Bedroom Suite sleeps 5 | sourced (Deluxe Family Suite and Family Suite are not named here; `rooms[]` has them) |
| 30 | `copyBlocks[3].body` ¶2 S1a | "Every room has … soundproofing, a work desk and free WiFi." | `business.description` "each room has a work desk, soundproofing and free WiFi"; `facilities[4]` "free WiFi in all areas" | sourced |
| 31 | `copyBlocks[3].body` ¶2 S1b | "Every room has air conditioning, a private bathroom, …" | `business.description` "Comfortable Accommodations: **family rooms** with air-conditioning, balconies and private bathrooms; each room has a work desk…". A/C and private bathrooms are stated for family rooms, in the same clause as balconies, which only one king type has. "Every room" widens the scope. `facilities[]` (which `sources.md` cites) holds none of A/C, private bathroom, soundproofing or desk | **unsourced** (scope widened from family rooms to every room) |
| 32 | `copyBlocks[3].body` ¶2 S2a | "Rates depend on the room and the dates" | "the dates": `booking.path.note` "live inventory on Booking.com and Agoda"; `gaps[]` "offers" "nightly rates are live dated OTA inventory". "**the room**": no key says rates differ by room type | **unsourced** for "the room" (the mildest row here, but the same class as KA's "with the season": plausible, not held) |
| 33 | `copyBlocks[3].body` ¶2 S2b | "— the booking links show what is free." | `booking.path.note` "live inventory"; `booking.engine_url`, `other_engines` | sourced (voice fail below: "free") |
| 34 | `copyBlocks[4].heading` | "Pool, restaurant, spa" | `facilities[0]`, `[1]`, `[3]` | sourced |
| 35 | `copyBlocks[4].body` S1a | "An outdoor pool, open all year," | `facilities[0]` "year-round outdoor swimming pool" | sourced |
| 36 | `copyBlocks[4].body` S1b | "in the middle of the hotel." | as row 10 | sourced |
| 37 | `copyBlocks[4].body` S2a | "A restaurant serving breakfast with local specialities and fresh pastries, and Chinese, Indian and Italian" | `facilities[1]` "restaurant (Chinese, Indian, Italian; local breakfast and fresh pastries)"; `business.description` "breakfast with local specialities, fresh pastries and Chinese, Indian and Italian dishes" | sourced |
| 38 | `copyBlocks[4].body` S2b | "through the day." | none. No restaurant or service hours anywhere (`hours` `[]`). A time claim | **unsourced** (time) |
| 39 | `copyBlocks[4].body` S3 | "A coffee house on site." | `facilities[2]` | sourced |
| 40 | `copyBlocks[4].body` S4 | "A spa and wellness centre." | `facilities[3]` | sourced |
| 41 | `copyBlocks[4].body` ¶2 a | "For families: family rooms, kids' meals, an outdoor play area" | `facilities[5]`, `[19]` (additional charge — carried in `amenities[19]`), `[17]` "outdoor play equipment for kids"; `business.description` "outdoor play area" | sourced |
| 42 | `copyBlocks[4].body` ¶2 b | "and babysitting **on request**." | `facilities[18]` "babysitting / child services (additional charge)". The source gives a charge, not a condition. Same class as KA's "if you ask" | **unsourced** (condition) |
| 43 | `copyBlocks[5].heading` | "Practicalities" | asserts nothing | framing |
| 44 | `copyBlocks[5].body` S1 | "A 24-hour front desk, with private and express check-in." | `facilities[8]`, `[9]`; `hours_note` | sourced |
| 45 | `copyBlocks[5].body` S2a | "Free private parking …, by reservation." | `facilities[10]` "free private parking (reservation needed)" | sourced |
| 46 | `copyBlocks[5].body` S2b | "… **on site** …" | none. The key says "private parking", not where. `contradictions[2]` (a guest calls the parking area "very small and hard with a car") is unresolved; adding a location is a step past "parking exists and is by reservation", which is what `sources.md` says the copy states | **unsourced** (location) |
| 47 | `copyBlocks[5].body` S3a | "An airport shuttle" | `facilities[6]` | sourced |
| 48 | `copyBlocks[5].body` S3b | "Koggala Airport is about 5 km away." | `business.description` "Koggala Airport is 3.1 mi away" = 4.99 km. (`sources.md` cites `location.distance`, a key that does not exist) | sourced |
| 49 | `copyBlocks[5].body` S3 (dash) | "An airport shuttle — Koggala Airport is about 5 km away." read as one claim: the shuttle serves Koggala | No key says which airport the shuttle serves. The dash binds the two, so the sentence states by implication what the dossier does not hold. (KA's round 6–8 note on the station was two separate sentences; here it is one) | **unsourced** (by implication) |
| 50 | `copyBlocks[5].body` ¶2 S1 | "Daily housekeeping, laundry, dry cleaning and ironing." | `facilities[21]`, `[22]` (additional charge carried in `amenities[22]`) | sourced |
| 51 | `copyBlocks[5].body` ¶2 S2 | "Bicycle rental." | `facilities[20]` | sourced |
| 52 | `copyBlocks[5].body` ¶2 S3 | "Facilities for guests with disabilities." | `facilities[11]` | sourced |
| 53 | `copyBlocks[5].body` ¶2 S4 | "Non-smoking rooms." | `facilities[12]` | sourced |
| 54 | `spot` S1a | "Kabalana: a sandy beach break that suits beginners and improvers," | `location.spot` (thesurfatlas.com, third party) "sandy beach break for beginners and intermediates". About the wave, not claimed for the business. "Improvers" for "intermediates" is a drift in register, not in who it is for | shared-context |
| 55 | `spot` S1b | "with The Rock reef alongside it **when the swell is up**." | `location.spot` "with The Rock reef A-frame **for advanced surfers**". "When the swell is up" is a condition no key gives. "For advanced surfers" is dropped, so the sentence now reads as if The Rock is part of what suits "beginners and improvers" — a dropped qualifier that changes who it is for. "Alongside" is a position the source does not state ("with") | **unsourced** (condition added; qualifier dropped) |
| 56 | `spot` S2 (new) | "The beach is two minutes from the hotel, on foot." | `location.distance_to_beach` "Kabalana Beach is a 2-minute walk"; `contradictions[0]` resolution "Use Booking's figure". Subject is the beach, so the distance cannot attach to The Rock | sourced |
| — | `season` | `null` | `season.value` null, gap "not published by the business" | no claim (correctly empty) |
| 57 | `closing` S1 (new) | "Rates move with the dates." | `booking.path.note` "live inventory on Booking.com and Agoda" (`source_url`); `gaps[]` "offers" "nightly rates are live dated OTA inventory, not a published price list" | sourced |
| 58 | `closing` S2 (new) | "Booking.com and Agoda show what is free." | `booking.path.note` "live inventory on Booking.com and Agoda"; `booking.engine_url`, `other_engines[0]`. TripAdvisor rightly left out ("a TripAdvisor listing exists", no inventory) | sourced (voice fail below: "free") |
| 59–67 | `rooms[0–8]` | nine labels, beds, sleeps, "ground floor" note | `room_types[0–8]`, compared row by row by script: labels, beds ("+" → "and") and sleeps all match; `[0]` "ground floor" from its label; no `sleeps` written where the dossier has none | sourced ×9 |
| 68 | `stayInfo.note` | "The front desk is staffed 24 hours, with private and express check-in and check-out." | `hours_note` "24-hour front desk; private and express check-in/out available"; `facilities[8]`, `[9]`. No times written (`gaps[]` "stayInfo") | sourced |
| 69–93 | `amenities[0–24]` | 25 rows | `facilities[0–24]`, compared index by index by script: every label is its facility, every "additional charge" / "reservation needed" / "open all year" note is the facility's own bracket. `facilities[25]` (CCTV etc.) is left out, which adds nothing | sourced ×25 |
| 94 | `ratings[0]` | Booking.com 9.2/10, 34, URL | `reviews.booking` 9.2, scale 10, count 34; URL = `source_url` | sourced (`capturedAt` absent — see Completeness) |
| 95 | `ratings[1]` | Google 5.0/5, 21, no URL | `reviews.google` 5.0, 21 (breakdown 21×5★) | sourced (same) |
| 96–100 | `testimonials[0–4]` | Mya · Dariusz · António · Roie · Benjamin (all booking) | `reviews.quotes[0, 4, 3, 6, 7]`: script string-equality, **5/5 verbatim**, ellipses kept as Booking renders them; author strings identical; no dates (dossier has none). Benjamin's German kept untranslated (schema: quotes not localized). "Shahar, Israel" (`quotes[1]`) not used | sourced ×5 |
| 101 | `contact.phone` | "+94764832988" | `contact.phone` (Google), identical, E.164 valid | sourced |
| 102 | `contact.address` | "Ahangama, Sri Lanka" | `location.address` "Ahangama, Sri Lanka" | sourced |
| 103–104 | `bookingLinks[0–1]` | "Check dates on Booking.com / Agoda" + URLs | `booking.engine_url`, `booking.other_engines[0]`, character-identical, `https://`; "check dates" rests on `booking.path.note` "live inventory" | sourced ×2 |

**Counts (104 claim rows):** `sourced` 83 · `shared-context` 1 · `framing` 1 (heading only) · **`unsourced` 19** · **`contradicted` 0**.

Recorded contradictions: distance (`[0]`) follows the harvester's resolution; room count (`[1]`) is not written; parking (`[2]`) is not promised as easy, but row 46 adds a location. Provenance note on rows 5 and 7: `location.setting` is a keyed field with a `source_url`, so they pass, but the only quote in the dossier that says "not on the main road" is `quotes[1]`, the "Shahar, Israel" review the copy excludes pending confirmation (`distance_to_beach.note`: "**one** notes it is off the main road"). If that review is Shahar's own, "off the main road" rests on it alone — for Shahar to confirm, not a fail this round.

### Failing sentences

| # | Field | Sentence (clause at fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 4 | `languagesSpoken` | `["en"]` | unsourced: no staff-language key in the dossier | copywriter (empty the field), or harvester if Booking's "languages spoken" can be fetched |
| 8 | `copyBlocks[0].body` | "The main road is not — the hotel sits back from it, **which is the difference between sleeping and listening to tuk-tuks all night**." | unsourced: noise condition and sleep outcome | copywriter |
| 11 | `copyBlocks[0].body` | "The pool is in the middle of the hotel, **and most evenings that is where people end up**." | unsourced: time, frequency, behaviour | copywriter |
| 14 | `copyBlocks[1].body` | "The hotel opened recently enough that **one guest wrote he was the first customer**." | unsourced: the quote has no `source_url` (gap note only) and "he" is added | copywriter (or harvester, to capture that review with its `source_url`) |
| 15 | `copyBlocks[1].body` | "**Everything** is still new: the rooms, **the bathrooms, the air conditioning**." | unsourced: no key says bathrooms or A/C are new; "everything" is universal | copywriter |
| 18–20 | `copyBlocks[1].body` ¶2 | "**Rooms are large — larger than the rate suggests, which is the most common thing said about the place after the staff.**" | unsourced ×3: size rests only on the excluded "Shahar, Israel" review; comparison with a rate the dossier does not hold; a frequency ranking the quote count runs against | copywriter |
| 21 | `copyBlocks[2].heading` | "**The staff are the reason people extend**" | unsourced: cause and plural; the one guest who extended gives a different reason | copywriter |
| 22 | `copyBlocks[2].body` | "**More than one guest** has moved hotels, landed here, and stayed." | unsourced: quantity (only Mya did) | copywriter |
| 24 | `copyBlocks[2].body` | "Another **cancelled the next hotel** and stayed put." | unsourced: adds a cancellation Roie does not describe | copywriter |
| 27 | `copyBlocks[3].body` | "King rooms with a balcony, a garden view, or a private patio **onto the pool**." | unsourced: access, where the source says "Pool View" | copywriter |
| 31 | `copyBlocks[3].body` | "**Every room has air conditioning, a private bathroom**, soundproofing, a work desk and free WiFi." | unsourced: scope widened from Booking's "family rooms" to every room | copywriter |
| 32 | `copyBlocks[3].body` | "Rates depend on **the room** and the dates — the booking links show what is free." | unsourced: no key says rates vary by room | copywriter |
| 38 | `copyBlocks[4].body` | "…and Chinese, Indian and Italian **through the day**." | unsourced: service hours | copywriter |
| 42 | `copyBlocks[4].body` | "…an outdoor play area and babysitting **on request**." | unsourced: condition (source: "additional charge") | copywriter |
| 46 | `copyBlocks[5].body` | "Free private parking **on site**, by reservation." | unsourced: location, next to an unresolved parking contradiction | copywriter |
| 49 | `copyBlocks[5].body` | "An airport shuttle **— Koggala Airport** is about 5 km away." | unsourced by implication: which airport the shuttle serves | copywriter |
| 55 | `spot` | "…with The Rock reef alongside it **when the swell is up**." | unsourced: condition added, and "for advanced surfers" dropped so The Rock reads as suiting beginners | copywriter |

Neither changed line fails on facts: `spot` S2 (row 56) and both `closing` sentences (rows 57–58) are sourced. The failures are in text round 1 passed without a sentence-level trace.

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | yes | yes | yes | — | yes | yes | clean |
| `copyBlocks[0]` intro | yes (short, long, short) | yes | yes | yes | — | yes | yes | 8/8 (fact rows 8, 11 aside) |
| `copyBlocks[1]` new | yes | **"the rooms, the bathrooms, the air conditioning"** is a triad | yes | yes | — | yes | yes | 7/8, note (the clause fails on facts anyway) |
| `copyBlocks[2]` staff | yes | **"moved hotels, landed here, and stayed"** is a triad | yes | yes | — | yes | yes | 7/8, note (same) |
| `copyBlocks[3]` rooms | yes | yes | yes | yes | yes (no price shown) | yes | **no**: "free WiFi" and "show what is free" sit in consecutive sentences with two meanings of "free" (no charge, then available) | **FAIL** (clarity) |
| `copyBlocks[4]` pool | fragment run ("A coffee house on site. A spa and wellness centre.") reads as the amenity list turned into prose | heading "Pool, restaurant, spa" is a three-item list | yes | yes | — | yes | yes | 6/8, notes only |
| `copyBlocks[5]` practicalities | all fragments, listing register | yes | yes | yes | — | yes | yes | 7/8, note only (KA precedent) |
| `spot` | long, then short | yes | yes | yes | yes (via "suits beginners") | surf-guide | yes | clean (fact row 55 aside) |
| `closing` | two short sentences | yes | yes | yes (two platform names) | yes (no fixed price) | yes | **no**: after "Rates", "show what is free" reads first as "free of charge", on a page whose amenities say "Free WiFi" and "Free private parking" | **FAIL** (clarity) |

Voice fails: 2, both the word "free" in the availability sense, both to the **humanizer** (wording only; the fact under them is sourced). The humanizer flagged this for 4c; it is a fail here, not a note, because in both places the price sense is primed by the words just before it ("free WiFi"; "Rates"). KA's round 8 passed "show what is actually free", which has neither primer; Shahar may want one ruling for both sites.

### Completeness (`beach_lodging`)
Must-haves that are copy fields: `rooms[]` 9 rows, `bookingLinks[]` 2 rows — filled (photos are not a copy field). Should-haves: `amenities[]` 25, `ratings[]` 2, `testimonials[]` 5, `spot` — filled; `stayInfo` has a note and no times, with the reason on record (`gaps[]` "stayInfo"). `season` null with its reason (dossier gap). `closing` (v0.5, optional) filled.

Schema limits re-checked by script: `tagline` 38/140, `closing` 67/140, `spot` 169/200, every heading ≤ 38/120, every body ≤ 402/1500, `stayInfo.note` 84/200, all amenity and room labels in limit, slots in the enum, phone E.164, booking URLs `https://`.

**`ratings[].capturedAt` (schema v0.4, required):** absent from both rows of `en.json`. The dossier supports it: `reviews.booking.fetched_at` and `reviews.google.fetched_at` are both "2026-09-19T18:55:00Z", so both rows would be "2026-09-19". The field is deployer-edited, not copy. Checked the seeder: `sites/ka-surf-hostel-and-restaurant/final/scripts/seed-from-dossier.mjs` (and Layday's) derive it from `dossier.reviews.<platform>.fetched_at` and throw if it is missing; the platform keys "booking" and "google" both exist in this dossier. **The Lavish Haven has no `final/` build or seeder yet**, so "the build seeds it" is true of the pattern, not yet of this site. Not a copy fail; an open item for the deployer.

Open items, not copy fails: `contact.whatsapp` absent (schema-required; dossier gap "not published") — for the Payload seed. `businessType` absent from `en.json` (deployer seeds "beach_lodging"). `ratings[1]` (Google) has no URL, as on KA.

### Duplication across fields (notes)
- **"Two minutes"** (the humanizer's flag): `tagline`, `copyBlocks[0]` S1, `spot` S2 — three times, each worded differently, plus Dariusz's "next to the Kabalana Beach" in `testimonials[1]`. `spot` S2 is a deliberate repeat from the gold page (Shahar's instruction, ledger 04:16:49Z). Which one to cut, if any, is the copywriter's call; not a fail.
- **Pool in the middle**: `copyBlocks[0]` ¶2 and `copyBlocks[4]` S1, plus António in `testimonials[2]`.
- **Rates / dates / booking links**: `copyBlocks[3]` ¶2 and `closing` — by design (v0.5 field beside the last booking action).
- **24-hour desk, express check-in**: `copyBlocks[5]`, `stayInfo.note`, `amenities[8–9]`.
- **Newness**: `tagline`, `copyBlocks[1]` heading and body, `testimonials[1]`.
- **Mya's month, Roie's extension**: `copyBlocks[2]` and `testimonials[0]`, `[3]`.
- **Room list and amenities restated in prose**: `copyBlocks[3]` vs `rooms[]`; `copyBlocks[4–5]` vs `amenities[]` (schema "No duplication").

### `sources.md` rows checked against the dossier
Every quoted string and key in "Rests on" searched in `dossier.json`:

| Row | Result |
|---|---|
| tagline | Accurate (`business.since` is a gap note with no `source_url`; the guest quotes of row 2 carry it) |
| intro ¶1 | **Wrong key.** "not on the main road but a 2 min…" is not in `location.setting`; it is in `reviews.quotes[1]`, the excluded "Shahar, Israel" review. Does not cover the tuk-tuk clause |
| intro ¶2 | Accurate for cafés and the pool (`quotes[3]` verbatim). Does not cover "most evenings" |
| about ¶1 (new, first customer, scores) | Scores accurate. "First customer" rests on a gap note without `source_url`, and "he" is not noted. "Everything is still new: … bathrooms, … air conditioning" not covered |
| about ¶1 (large rooms) | **Wrong.** "over the top large rooms" appears only in `quotes[1]`, the review `sources.md` itself excludes; "appears in the Booking quotes" hides that. "Larger than the rate suggests" and "most common thing said" not covered |
| about ¶2 | Quotes accurate (Mya, Roie, Staff 9.4). Roie's words do not support "cancelled the next hotel"; one quote does not support "more than one guest". Heading not covered |
| offer ¶1 | **Wrong key.** `facilities[]` holds none of air conditioning, private bathroom, soundproofing or desk; they are in `business.description`, where A/C and bathrooms are scoped to "family rooms" |
| offer ¶2 | Incomplete: cites only `gaps[]` "offers" (no `source_url`); the keyed source `booking.path.note` is cited only in the closing row. "The room" not covered |
| offer ¶3 | Accurate for the facts; "through the day" and "on request" not covered |
| info | **Wrong key:** `location.distance` does not exist; the Koggala figure is in `business.description` ("3.1 mi"). "On site" not covered |
| spot | Incomplete: does not cover "when the swell is up", "alongside", "improvers", or the dropped "for advanced surfers" |
| spot sentence 2 | Accurate: `distance_to_beach` verbatim; `contradictions[0]` resolution quoted correctly |
| closing | Accurate: `gaps[]` "offers" verbatim; `booking.path.note` verbatim; `other_engines` holds Agoda and TripAdvisor as stated |
| (missing rows) | No row for `businessName`, `languagesSpoken`, `rooms`, `stayInfo`, `amenities`, `ratings`, `testimonials`, `contact`, `bookingLinks` or the headings |
| Deliberately not written | Check-in, room count, street address, truncated quotes: accurate. Parking: accurate as a statement of intent, but the copy adds "on site" (row 46). Shahar review: accurate for `testimonials[]`, but its content is used elsewhere (rows 18; provenance of 5, 7) |

### Verdict: **FAIL** (round 2, full-file re-check)

19 `unsourced` (rows 4, 8, 11, 14, 15, 18, 19, 20, 21, 22, 24, 27, 31, 32, 38, 42, 46, 49, 55), 0 `contradicted`, 2 voice fails (`copyBlocks[3]` and `closing`, "free"). Facts → **copywriter**, including the `sources.md` corrections above; voice → **humanizer**. The two lines this pass was opened for — `spot` S2 and `closing` — are sourced; `closing` fails on voice only.

To pass: each failing clause either states only what its dossier key says or is removed; no new time, frequency, condition, cause, scope or location appears in the rewrite; nothing rests on the "Shahar, Israel" review until Shahar confirms it; `sources.md` covers every sentence and field with the key it really rests on. The copyeditor then re-checks the whole file again, not only the changed clauses.

Round count: base.md allows 2 rounds and this is the second. None of these fails is a dossier that cannot support a site — each is a clause that goes beyond a dossier that holds enough — so this is not a send-back to the harvester. A third pass needs Shahar's allowance, as KA's rounds 6–8 had.

## round 3 — full-file re-check after copywriter round 3, the 0.3.1 address pass and humanizer round 3, 2026-09-23

Reviewer: copyeditor 0.3.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, every layer read). Independent of the copywriter and the humanizer. Third pass allowed by Shahar (ledger 2026-09-23T08:42:00Z, "Allow third pass"). Rules applied: hard constraint 6 (every sentence of the whole file re-checked against the dossier, nothing carried over from round 2); a verbatim guest observation of a physical fact is `sourced`, never for a ranking, frequency or cause; no framing exemptions. Dossier re-read as it stands today (Google address, plus code, pin, `contradictions[3]` 166/1 vs 166/2 added 08:15–08:16Z).

### Scope check
- `diff en.draft.json en.json`: `humanizer_version` null → 0.2.0, and `copyBlocks[1]`–`[5]` bodies. Headings, `copyBlocks[0]`, `tagline`, `spot`, `closing`, `rooms`, `stayInfo`, `amenities`, `ratings`, `testimonials`, `contact`, `bookingLinks`, `languagesSpoken` identical. Matches `humanizer-notes.md` round 3 and ledger 08:49:00Z.
- Draft → final, clause by clause (appeared / vanished / strengthened):

| Block | Draft | Final | Result |
|---|---|---|---|
| `[1]` ¶2 | "Guests there score it 9.7 … cleanliness, 9.7 for comfort and 9.4 for staff" | "Booking.com guests score it 9.7 … cleanliness and the same for comfort, and 9.4 for staff" | same figures; platform now named (was implied by "there"). Nothing added |
| `[2]` | "until they found this one, and stayed over a month" / "instead of going to another hotel" | "before finding this one, then stayed over a month" / "rather than go on to a different hotel" | same accounts, still one guest each, no cause, no cancellation, no count |
| `[3]` ¶1 | "…and a two-bedroom suite that sleeps five" | "…and **the** two-bedroom suite sleeps five" | reordered, nine types kept, "pool view" kept. Article change noted below (row 21), not a fail |
| `[4]` ¶1–2 | fragments; "at an extra charge" | "The outdoor pool is in the middle of the hotel and open all year." … "Kids' meals and babysitting cost extra." | same facts, same scope; the charge still covers exactly those two items |
| `[5]` ¶1–2 | "Free private parking, by reservation." etc. | "Parking is free and private, but you need to reserve it." etc. | same; no location added, shuttle still apart from Koggala |

Nothing vanished, nothing strengthened, nothing new appeared in humanizing.

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "The Lavish Haven" | `business.name` | sourced |
| 2 | `tagline` | "A new hotel" | "hotel": `business.type.note` "Booking category 'Hotel'". "new": `reviews.quotes[4]` "It's a brand new hotel", `[2]` "It's a new facility", `[5]` "The hotel is new" | sourced (guest observation of a physical fact, Shahar's ruling) |
| 3 | `tagline` | "two minutes from Kabalana" | `location.distance_to_beach` "Kabalana Beach is a 2-minute walk"; `contradictions[0]` "Use Booking's figure" | sourced |
| — | `languagesSpoken` | `[]` | no staff-language key | no claim (round 2 row 4 fixed) |
| 5 | `copyBlocks[0].heading` | "**Off the main road**, over the surf" | `location.setting` "Off the main road, over the Kabalana surf spot…" — a harvester summary, note "from guest reviews", no verbatim quote. `distance_to_beach.note` narrows it to a single guest: "**one** notes it is off the main road". The only captured quote that says it is `reviews.quotes[1]` "not on the main road" — the "Shahar, Israel" review, which `sources.md` excludes until confirmed (`quotes[1].note`). Same basis as round 2 row 18 ("rooms are large", failed for resting only on that review) | **unsourced** (rests only on the excluded review) |
| 6 | `copyBlocks[0].heading` | "…, over the surf" | same `location.setting` key "over the Kabalana surf spot", which has a `source_url`. No captured quote says it; the captured ones say near, not over (`distance_to_beach` "2-minute walk", `quotes[4]` "next to the Kabalana Beach") | sourced on the key alone; note: read as "overlooking the surf" it would be a view claim the verbatim sources do not make |
| 7 | `copyBlocks[0].body` S1a | "Cafés and restaurants surround the hotel," | `location.setting` "surrounded by cafes and restaurants"; `quotes[5]` "many cafes … nearby" | sourced |
| 8 | `copyBlocks[0].body` S1b | "and there is a fruit stand nearby." | `quotes[5]` Aleksandra "a fruit stand nearby" | sourced (physical fact) |
| 9 | `copyBlocks[0].body` S2 | "Guests score the location 9.6 out of 10 on Booking.com." | `reviews.booking.categories.Location` 9.6, scale 10 | sourced |
| 10 | `copyBlocks[0].body` ¶2 | "Koggala Airport is about 5 km away." | `business.description` "Koggala Airport is 3.1 mi away" (4.99 km). Shuttle is in `[5]`, no link implied | sourced |
| 11 | `copyBlocks[1].heading` | "New, and it shows" | as row 2 | sourced |
| 12 | `copyBlocks[1].body` S1 | "The hotel is new." | as row 2 | sourced |
| 13 | `copyBlocks[1].body` S2 | "On Booking.com one guest calls it "brand new", another "a new facility"." | `quotes[4]` Dariusz, `[2]` Diane, both Booking, fragments verbatim, attributed | sourced |
| 14 | `copyBlocks[1].body` ¶2 S1 | "Booking.com guests score it 9.7 … cleanliness and the same for comfort, and 9.4 for staff, across 34 reviews." | `reviews.booking.categories` 9.7 / 9.7 / 9.4; `count` 34 | sourced |
| 15 | `copyBlocks[1].body` ¶2 S2 | "On Google it has 5.0 out of 5 from 21 reviews." | `reviews.google` 5.0, 21 | sourced |
| 16 | `copyBlocks[2].heading` | "Staying longer" | the two accounts below (`quotes[0]` "stayed over a month", `[6]` "extended our stay") | sourced (no cause, no count) |
| 17 | `copyBlocks[2].body` S1 | "One guest wrote that they moved around many hotels before finding this one, then stayed over a month." | `quotes[0]` Mya "We moved around many hotels until we found the lavish and stayed over a month" | sourced (attributed, one guest) |
| 18 | `copyBlocks[2].body` S2 | "Another extended their stay rather than go on to a different hotel." | `quotes[6]` Roie "we extended our stay in it instead of going to another one" | sourced (no cancellation, no cause) |
| 19 | `copyBlocks[3].heading` | "Nine kinds of room" | `room_types[]` 9 entries; types, not a count (`contradictions[1]`) | sourced |
| 20 | `copyBlocks[3].body` ¶1 S1 | "There are king rooms with a balcony or a garden view, superior kings, and a deluxe king on the ground floor with a private patio and a pool view." | `room_types[3]`, `[2]`, `[1]`, `[0]` "Private Patio & Pool View, ground floor" | sourced (view, not access) |
| 21 | `copyBlocks[3].body` ¶1 S2 | "Family studios and suites sleep four, and the two-bedroom suite sleeps five." | `room_types[4–7]` sleeps 4; `[8]` sleeps 5 | sourced. Note: "**the** two-bedroom suite" (draft: "a") can be read as "there is one"; in a list of kinds under "Nine kinds of room" it reads as the type, so no room count is asserted — not a fail |
| 22 | `copyBlocks[3].body` ¶2 S1 | "Each room has a work desk, soundproofing and free WiFi." | `business.description` "each room has a work desk, soundproofing and free WiFi"; `facilities[4]` | sourced |
| 23 | `copyBlocks[3].body` ¶2 S2 | "The family rooms have air conditioning and private bathrooms." | `business.description` "family rooms with air-conditioning, balconies and private bathrooms" | sourced (scope kept) |
| 24 | `copyBlocks[3].body` ¶3 S1 | "There is no published price list." | `gaps[]` "offers"; `offers` `[]` | sourced |
| 25 | `copyBlocks[3].body` ¶3 S2 | "Rates go by date, and the booking links show what is available." | `booking.path.note` "live inventory on Booking.com and Agoda"; `gaps[]` "offers" | sourced (no room-type variation claimed) |
| 26 | `copyBlocks[4].heading` | "Pool, restaurant, spa" | `facilities[0]`, `[1]`, `[3]` | sourced |
| 27 | `copyBlocks[4].body` S1 | "The outdoor pool is in the middle of the hotel and open all year." | `facilities[0]` "year-round outdoor swimming pool"; `quotes[3]` "the swimming pool at the center" | sourced (physical fact) |
| 28 | `copyBlocks[4].body` S2 | "The restaurant serves breakfast with local specialities and fresh pastries, plus Chinese, Indian and Italian dishes." | `facilities[1]`; `business.description` | sourced (no hours) |
| 29 | `copyBlocks[4].body` S3 | "There's a coffee house on site too, and a spa and wellness centre." | `facilities[2]`, `[3]` | sourced |
| 30 | `copyBlocks[4].body` ¶2 S1 | "For families there are the family rooms and an outdoor play area." | `facilities[5]`, `[17]`; `business.description` "outdoor play area" | sourced |
| 31 | `copyBlocks[4].body` ¶2 S2 | "Kids' meals and babysitting cost extra." | `facilities[19]`, `[18]` "(additional charge)" | sourced (no condition added) |
| 32 | `copyBlocks[5].heading` | "Practicalities" | asserts nothing | framing |
| 33 | `copyBlocks[5].body` ¶1 S1 | "The front desk is staffed 24 hours, with private and express check-in." | `facilities[8]`, `[9]`; `hours_note` | sourced |
| 34 | `copyBlocks[5].body` ¶1 S2 | "Parking is free and private, but you need to reserve it." | `facilities[10]` "free private parking (reservation needed)"; no location, no ease (`contradictions[2]` respected) | sourced |
| 35 | `copyBlocks[5].body` ¶1 S3 | "There's an airport shuttle as well." | `facilities[6]`; no airport named | sourced |
| 36 | `copyBlocks[5].body` ¶2 S1 | "Housekeeping is daily." | `facilities[21]` | sourced |
| 37 | `copyBlocks[5].body` ¶2 S2 | "There is laundry, dry cleaning and ironing, bicycles to rent, non-smoking rooms, and facilities for guests with disabilities." | `facilities[22]`, `[20]`, `[12]`, `[11]` | sourced. Note: the "additional charge" on laundry and bicycles is carried only in `amenities[20]`, `[22]`; with `[4]` now saying outright that two other items "cost extra", this list's silence reads slightly more like "included". Not a claim; a note |
| 38 | `spot` S1 | "Kabalana: a sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers." | `location.spot` (thesurfatlas.com) verbatim, qualifier restored | shared-context |
| 39 | `spot` S2 | "The beach is two minutes from the hotel, on foot." | `location.distance_to_beach`; `contradictions[0]` | sourced |
| — | `season` | `null` | `season` gap | no claim |
| 40 | `closing` S1 | "Rates move with the dates." | `booking.path.note`; `gaps[]` "offers" | sourced |
| 41 | `closing` S2 | "Booking.com and Agoda show what is available." | `booking.path.note`; `engine_url`; `other_engines[0]` | sourced ("available", Shahar's ruling) |
| 42 | `stayInfo.note` | "The front desk is staffed 24 hours, with private and express check-in and check-out." | `hours_note`; `facilities[8]`, `[9]`; no times (`gaps[]` "stayInfo") | sourced |
| 43–51 | `rooms[0–8]` | labels, beds, sleeps, "ground floor" | `room_types[0–8]`, compared row by row by script | sourced ×9 |
| 52–76 | `amenities[0–24]` | 25 rows | `facilities[0–24]` index for index by script; every note is the facility's own bracket | sourced ×25 |
| 77–78 | `ratings[0–1]` | Booking 9.2/10, 34, URL · Google 5.0/5, 21 | `reviews.booking`, `reviews.google` | sourced ×2 (`capturedAt`: see Completeness) |
| 79–83 | `testimonials[0–4]` | Mya · Dariusz · António · Roie · Benjamin | `quotes[0, 4, 3, 6, 7]`: script string-equality on text and author, 5/5 verbatim; `[1]` not used | sourced ×5 |
| 84 | `contact.phone` | "+94764832988" | `contact.phone`, identical, E.164 | sourced |
| 85 | `contact.address` | "No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka" | `location.address` (Google, fetched 2026-09-23) "No166/1 walhengoda road, Ahangama 80650, Sri Lanka". Playbook 0.5.1 §6: Google's words ✓, postcode from Google ✓, street name capitalised and nothing else changed ✓ ("No166/1" kept as Google writes it), order street / town postcode / country ✓. `contradictions[3]` (Booking JSON-LD 166/2) is resolved by the harvester for the site ("uses the Google listing address") and the owner question stays open — followed, not silently resolved | sourced |
| 86–87 | `bookingLinks[0–1]` | "Check dates on Booking.com / Agoda" | `booking.engine_url`, `other_engines[0]`, character-identical; `path.note` "live inventory" | sourced ×2 |

**Counts (86 claim rows; no row 4 — `languagesSpoken` is now empty):** `sourced` 83 · `shared-context` 1 · `framing` 1 · **`unsourced` 1** · **`contradicted` 0**. All 19 round-2 `unsourced` rows are gone (each clause removed or cut back to its key; spot qualifier restored; `languagesSpoken` emptied).

### Ruling on the copywriter's open question — intro heading
"Off the main road" is **unsourced**. The key it cites, `location.setting`, is the harvester's summary "from guest reviews", not a guest's words; the dossier's own note says one guest said it (`distance_to_beach.note`), and the one captured quote that says it is `reviews.quotes[1]`, the excluded "Shahar, Israel" review. Shahar's ruling makes a *verbatim* guest observation a source; a paraphrase of an excluded review is not one. Round 2 let this through as a provenance note; under hard constraint 6 a passed sentence can be wrong, and round 2 row 18 failed "rooms are large" on the same basis, so this is the consistent call. Three ways to clear it: the copywriter drops the "main road" claim; or Shahar confirms `quotes[1]` usable (it is his name — whether an operator's own review may source client copy is his call, not mine); or the harvester captures the other guest review(s) behind `location.setting` verbatim with `source_url`. "Over the surf" (row 6) does not fail on its own. Knock-on, not mine to act on: `concepts.md` names concept 1 "Off the main road", and `mockups/unique/src/tenant/content.json` still carries round-1 copy (tuk-tuks, "most evenings").

### `sources.md` check
Every key cited was re-read in `dossier.json`; all keys exist and say what the rows claim. Findings:
- **Stale quotes (humanizer's flag):** staying ¶1 S1 and S2 and pool ¶1 S1 quote the pre-humanizer wording ("until they found this one, and stayed…", "instead of going to another hotel", "An outdoor pool, open all year, in the middle of the hotel."). Keys, facts and scope are unchanged, and I traced the final sentences myself (rows 17, 18, 27). **Not a fail**: the verdict turns on whether the copy is sourced, and it is; the traceability file is out of date in wording only. Copywriter to refresh the three quoted strings on the next pass.
- Header says "Copywriter 0.3.0"; the address row was written under 0.3.1 (ledger 08:46:43Z). The address row's "base.md constraint 9" is correct for copywriter 0.3.1.
- The intro-heading row is honest about its caveat; it is now a fail (above).

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | yes | yes | yes | — | yes | yes | clean |
| `[0]` intro | yes | yes | yes | yes | — | yes | yes | clean (fact row 5 aside) |
| `[1]` new | yes | three scores in one sentence, a data list, not a rhetorical triad; "the same for comfort" breaks it | yes | yes | — | yes | yes | clean |
| `[2]` staying | yes | yes (round-2 triad gone) | yes | yes | yes (one guest each, said so) | yes | yes | clean |
| `[3]` rooms | long then shorter | yes | yes | yes | yes (no price list) | yes | yes ("free" / "available" clash gone) | clean |
| `[4]` pool | yes (fragment run gone) | heading "Pool, restaurant, spa" is a three-item list (note, as round 2) | yes | yes | yes ("cost extra") | yes | yes | clean, note |
| `[5]` practicalities | short / long; ¶2 S2 is a five-item list in one sentence, still listing register | yes | yes | yes | yes ("you need to reserve it") | yes | yes | clean, note |
| `spot` | long, then short | yes | yes | yes | yes | surf-guide | yes | clean |
| `closing` | two short | yes | yes | yes | yes | yes | yes ("available") | clean |

Voice fails: **0**. Round 2's two "free" fails are fixed.

### Completeness (`beach_lodging`)
Unchanged from round 2 and re-checked: `rooms[]` 9, `bookingLinks[]` 2 (must-haves); `amenities[]` 25, `ratings[]` 2, `testimonials[]` 5, `spot`, `closing` filled; `stayInfo` note only (reason on record); `season` null (dossier gap). Schema limits by script: `tagline` 38/140, `closing` 72/140, `spot` 161/200, headings ≤ 32/120, bodies ≤ 440/1500, `stayInfo.note` 84/200, `contact.address` 50/300, labels in limit, phone E.164, URLs `https://`.

Open items, not copy fails: `ratings[].capturedAt` absent (deployer; both platforms have `fetched_at` 2026-09-19; still no `final/` seeder for this site). `contact.whatsapp` absent (schema-required, dossier gap). House number 166/1 vs 166/2 (`contradictions[3]`) — owner question. `copywriter_version` in `en.json` and `en.draft.json` reads "0.3.0", but the address pass ran under 0.3.1 (ledger 08:46:43Z; `run.yaml` pins 0.3.1): the file records one version for text written under two. Copywriter/orchestrator to record it; not a copy fail.

### Duplication (notes)
"Two minutes" now in `tagline` and `spot` only (cut from intro). Still repeated by design or tolerated: 24-hour desk / express check-in (`[5]`, `stayInfo.note`, `amenities[8–9]`); rates by date (`[3]` ¶3, `closing`); newness (`tagline`, `[1]`, `testimonials[1]`); Mya and Roie (`[2]`, `testimonials[0]`, `[3]`); pool position (`[4]`, `testimonials[2]`); room and amenity lists restated in prose (`[3]–[5]` vs `rooms[]`, `amenities[]`).

### Failing sentences

| # | Field | Sentence (clause at fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 5 | `copyBlocks[0].heading` | "**Off the main road**, over the surf" | unsourced: rests only on the excluded "Shahar, Israel" review via the harvester's paraphrase in `location.setting` | copywriter; or Shahar (rule on `quotes[1]`); or harvester (capture the review behind `location.setting` verbatim) |

### Verdict: **FAIL** (round 3, full-file re-check)

1 `unsourced` (row 5), 0 `contradicted`, 0 voice fails. Everything else in the file is sourced, and the diff from draft to final added, dropped or strengthened no fact.

Round count, said plainly: base.md allows 2 rounds, and still failing on the third pass is defined as "the dossier cannot support a site", with a send-back to the harvester or, in `mode: test`, out of the run. That definition does not fit the facts here: the one fail is a four-word heading clause that leans on an excluded review, and the other 85 rows show that the dossier supports the whole page without it. Whether that means a fourth pass, a ruling on `quotes[1]`, a send-back to the harvester or dropping the site is a gate for Shahar, not for me.

## round 4 — full-file re-check after copywriter round 4 and humanizer round 4, 2026-09-23

Reviewer: copyeditor 0.3.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, every layer read). Independent of the copywriter and the humanizer. Fourth pass allowed by Shahar (ledger 2026-09-23T09:03:11Z, "Drop it, one more round"). Rules applied: hard constraint 6 (every sentence of the whole file re-checked against `dossier.json` as it stands, nothing carried over from round 3); a verbatim guest observation of a physical fact is `sourced`, never for a ranking, frequency or cause; no framing exemptions.

### Scope check
- `cmp en.json en.draft.json`: identical (humanizer round 4 changed nothing, matching `humanizer-notes.md` round 4 and ledger 09:04:40Z).
- `git diff e384470 -- en.json` (round 3 → now): `copywriter_version` 0.3.0 → 0.3.1; `copyBlocks[0].heading` "Off the main road, over the surf" → "Among cafés and restaurants". Nothing else in `en.json` changed. (`en.draft.json` additionally caught up with round 3's humanised bodies and `humanizer_version`, so draft = final.)
- Draft → final diff: none. Nothing appeared, vanished or strengthened in humanizing.
- `sources.md`: header now "Copywriter 0.3.1 · round 4"; intro-heading row rewritten; the three stale strings (staying ¶1 S1, S2; pool ¶1 S1) now quote the final wording; "Shahar, Israel" bullet updated.

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "The Lavish Haven" | `business.name` | sourced |
| 2 | `tagline` | "A new hotel" | "hotel": `business.type.note` "Booking category 'Hotel'". "new": `quotes[4]` "It's a brand new hotel", `[2]` "It's a new facility", `[5]` "The hotel is new" | sourced (guest observation of a physical fact) |
| 3 | `tagline` | "two minutes from Kabalana" | `location.distance_to_beach` "Kabalana Beach is a 2-minute walk"; `contradictions[0]` "Use Booking's figure" | sourced |
| — | `languagesSpoken` | `[]` | no staff-language key | no claim |
| 5 | `copyBlocks[0].heading` | "Among cafés and restaurants" | `location.setting` "surrounded by cafes and restaurants" (source_url Booking); `quotes[5]` Aleksandra "There are many cafes and a fruit stand nearby" (verbatim, physical fact). Nothing ties this clause to the excluded `quotes[1]`, whose captured text mentions no cafés or restaurants. Same basis as row 7, which passed in rounds 2 and 3 | sourced. Note: "restaurants" rests on the `location.setting` key alone (no verbatim quote), "cafés" on both |
| 7 | `copyBlocks[0].body` S1a | "Cafés and restaurants surround the hotel," | as row 5 | sourced |
| 8 | `copyBlocks[0].body` S1b | "and there is a fruit stand nearby." | `quotes[5]` "a fruit stand nearby" | sourced (physical fact) |
| 9 | `copyBlocks[0].body` S2 | "Guests score the location 9.6 out of 10 on Booking.com." | `reviews.booking.categories.Location` 9.6, scale 10 | sourced |
| 10 | `copyBlocks[0].body` ¶2 | "Koggala Airport is about 5 km away." | `business.description` "Koggala Airport is 3.1 mi away" (4.99 km); shuttle kept in `[5]`, no link implied | sourced |
| 11 | `copyBlocks[1].heading` | "New, and it shows" | as row 2 | sourced |
| 12 | `copyBlocks[1].body` S1 | "The hotel is new." | as row 2 | sourced |
| 13 | `copyBlocks[1].body` S2 | "On Booking.com one guest calls it "brand new", another "a new facility"." | `quotes[4]` Dariusz, `[2]` Diane, both Booking; fragments verbatim, attributed | sourced |
| 14 | `copyBlocks[1].body` ¶2 S1 | "Booking.com guests score it 9.7 out of 10 for cleanliness and the same for comfort, and 9.4 for staff, across 34 reviews." | `reviews.booking.categories` Cleanliness 9.7, Comfort 9.7, Staff 9.4; `count` 34 | sourced |
| 15 | `copyBlocks[1].body` ¶2 S2 | "On Google it has 5.0 out of 5 from 21 reviews." | `reviews.google` 5.0, 21 | sourced |
| 16 | `copyBlocks[2].heading` | "Staying longer" | `quotes[0]` "stayed over a month", `[6]` "extended our stay" | sourced (no cause, no count) |
| 17 | `copyBlocks[2].body` S1 | "One guest wrote that they moved around many hotels before finding this one, then stayed over a month." | `quotes[0]` Mya "We moved around many hotels until we found the lavish and stayed over a month" | sourced (attributed, one guest) |
| 18 | `copyBlocks[2].body` S2 | "Another extended their stay rather than go on to a different hotel." | `quotes[6]` Roie "we extended our stay in it instead of going to another one" | sourced (no cancellation, no cause) |
| 19 | `copyBlocks[3].heading` | "Nine kinds of room" | `room_types[]` 9 entries; types, not a count (`contradictions[1]`) | sourced |
| 20 | `copyBlocks[3].body` ¶1 S1 | "There are king rooms with a balcony or a garden view, superior kings, and a deluxe king on the ground floor with a private patio and a pool view." | `room_types[3]`, `[2]`, `[1]`, `[0]` "Private Patio & Pool View, ground floor" | sourced (view, not access) |
| 21 | `copyBlocks[3].body` ¶1 S2 | "Family studios and suites sleep four, and the two-bedroom suite sleeps five." | `room_types[4–7]` sleeps 4; `[8]` sleeps 5 | sourced ("the" = the type, no count; as round 3) |
| 22 | `copyBlocks[3].body` ¶2 S1 | "Each room has a work desk, soundproofing and free WiFi." | `business.description` "each room has a work desk, soundproofing and free WiFi"; `facilities[4]` | sourced |
| 23 | `copyBlocks[3].body` ¶2 S2 | "The family rooms have air conditioning and private bathrooms." | `business.description` "family rooms with air-conditioning, balconies and private bathrooms" | sourced (scope kept) |
| 24 | `copyBlocks[3].body` ¶3 S1 | "There is no published price list." | `gaps[]` "offers"; `offers` `[]` | sourced |
| 25 | `copyBlocks[3].body` ¶3 S2 | "Rates go by date, and the booking links show what is available." | `booking.path.note` "live inventory on Booking.com and Agoda"; `gaps[]` "offers" | sourced |
| 26 | `copyBlocks[4].heading` | "Pool, restaurant, spa" | `facilities[0]`, `[1]`, `[3]` | sourced |
| 27 | `copyBlocks[4].body` S1 | "The outdoor pool is in the middle of the hotel and open all year." | `facilities[0]` "year-round outdoor swimming pool"; `quotes[3]` "the swimming pool at the center" | sourced (physical fact) |
| 28 | `copyBlocks[4].body` S2 | "The restaurant serves breakfast with local specialities and fresh pastries, plus Chinese, Indian and Italian dishes." | `facilities[1]`; `business.description` | sourced (no hours) |
| 29 | `copyBlocks[4].body` S3 | "There's a coffee house on site too, and a spa and wellness centre." | `facilities[2]`, `[3]` | sourced |
| 30 | `copyBlocks[4].body` ¶2 S1 | "For families there are the family rooms and an outdoor play area." | `facilities[5]`, `[17]`; `business.description` "outdoor play area" | sourced |
| 31 | `copyBlocks[4].body` ¶2 S2 | "Kids' meals and babysitting cost extra." | `facilities[19]`, `[18]` "(additional charge)" | sourced |
| 32 | `copyBlocks[5].heading` | "Practicalities" | asserts nothing | framing |
| 33 | `copyBlocks[5].body` ¶1 S1 | "The front desk is staffed 24 hours, with private and express check-in." | `facilities[8]`, `[9]`; `hours_note` | sourced |
| 34 | `copyBlocks[5].body` ¶1 S2 | "Parking is free and private, but you need to reserve it." | `facilities[10]` "free private parking (reservation needed)"; no location or ease (`contradictions[2]`) | sourced |
| 35 | `copyBlocks[5].body` ¶1 S3 | "There's an airport shuttle as well." | `facilities[6]`; no airport named | sourced |
| 36 | `copyBlocks[5].body` ¶2 S1 | "Housekeeping is daily." | `facilities[21]` | sourced |
| 37 | `copyBlocks[5].body` ¶2 S2 | "There is laundry, dry cleaning and ironing, bicycles to rent, non-smoking rooms, and facilities for guests with disabilities." | `facilities[22]`, `[20]`, `[12]`, `[11]` | sourced (round-3 note stands: the charge on laundry and bicycles is only in `amenities[20]`, `[22]`) |
| 38 | `spot` S1 | "Kabalana: a sandy beach break for beginners and intermediates, with The Rock reef A-frame for advanced surfers." | `location.spot` (thesurfatlas.com), source's words | shared-context |
| 39 | `spot` S2 | "The beach is two minutes from the hotel, on foot." | `location.distance_to_beach`; `contradictions[0]` | sourced |
| — | `season` | `null` | `season` gap | no claim |
| 40 | `closing` S1 | "Rates move with the dates." | `booking.path.note`; `gaps[]` "offers" | sourced |
| 41 | `closing` S2 | "Booking.com and Agoda show what is available." | `booking.path.note`; `engine_url`; `other_engines[0]` | sourced |
| 42 | `stayInfo.note` | "The front desk is staffed 24 hours, with private and express check-in and check-out." | `hours_note`; `facilities[8]`, `[9]`; no times (`gaps[]` "stayInfo") | sourced |
| 43–51 | `rooms[0–8]` | labels, beds, sleeps, "ground floor" | `room_types[0–8]`, compared row by row by script ("+" → "and", sleeps only where given) | sourced ×9 |
| 52–76 | `amenities[0–24]` | 25 rows | `facilities[0–24]` index for index by script; every note is the facility's own bracket; `[25]` unused | sourced ×25 |
| 77–78 | `ratings[0–1]` | Booking 9.2/10, 34, URL · Google 5/5, 21 | `reviews.booking`, `reviews.google` | sourced ×2 |
| 79–83 | `testimonials[0–4]` | Mya · Dariusz · António · Roie · Benjamin | `quotes[0, 4, 3, 6, 7]`: script string-equality on text and author, 5/5; `[1]` not used | sourced ×5 |
| 84 | `contact.phone` | "+94764832988" | `contact.phone`, identical | sourced |
| 85 | `contact.address` | "No166/1 Walhengoda Road, Ahangama 80650, Sri Lanka" | `location.address` (Google) "No166/1 walhengoda road, Ahangama 80650, Sri Lanka": playbook §6 words, postcode, capitalisation, order ✓; `contradictions[3]` followed, owner question open | sourced |
| 86–87 | `bookingLinks[0–1]` | "Check dates on Booking.com / Agoda" | `booking.engine_url`, `other_engines[0]`, URL-identical by script; `path.note` "live inventory" | sourced ×2 |

**Counts (85 claim rows; round 3's rows 5–6 are now the single row 5; no row 4, no row 6):** `sourced` 83 · `shared-context` 1 · `framing` 1 · **`unsourced` 0** · **`contradicted` 0**. The one round-3 fail ("Off the main road") is gone, and "over the surf" (round-3 row 6, a possible view claim) went with it.

### `sources.md` check
Every key cited re-read in `dossier.json`; all exist and say what the rows claim. The three stale strings from round 3 now quote the final sentences exactly. Header version (0.3.1) matches `en.json` and `run.yaml`. The intro-heading row cites `location.setting` and `quotes[5]` correctly and records why round 3's heading was dropped. No stale or wrong citation found.

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | yes | yes | yes | — | yes | yes | clean |
| `[0]` intro | yes | yes | yes | yes | — | yes | yes | clean, note: heading "Among cafés and restaurants" repeats the body's first words "Cafés and restaurants surround the hotel" (humanizer flagged the same). Mild repetition, not a generated-text tell |
| `[1]` new | yes | data list, not rhetorical | yes | yes | — | yes | yes | clean |
| `[2]` staying | yes | yes | yes | yes | yes | yes | yes | clean |
| `[3]` rooms | yes | yes | yes | yes | yes (no price list) | yes | yes | clean |
| `[4]` pool | yes | heading a three-item list (note, as before) | yes | yes | yes ("cost extra") | yes | yes | clean, note |
| `[5]` practicalities | yes | yes | yes | yes | yes | yes | yes | clean, note (five-item list, listing register) |
| `spot` | yes | yes | yes | yes | yes | surf-guide | yes | clean |
| `closing` | yes | yes | yes | yes | yes | yes | yes | clean |

Voice fails: **0**.

### Completeness (`beach_lodging`)
Re-checked: `rooms[]` 9, `bookingLinks[]` 2, `amenities[]` 25, `ratings[]` 2, `testimonials[]` 5, `spot`, `closing` filled; `stayInfo` note only (no times, gap on record); `season` null (dossier gap). Schema limits by script: `tagline` 38/140, `closing` 72/140, `spot` 161/200, headings ≤ 27/120, bodies ≤ 440/1500, `stayInfo.note` 84/200, `contact.address` 50/300, booking labels ≤ 26/60, phone E.164, URLs `https://`.

Open items, not copy fails (unchanged): `ratings[].capturedAt` absent (deployer seeds from `fetched_at` 2026-09-19). `contact.whatsapp` absent (schema-required, dossier gap). House number 166/1 vs 166/2 (`contradictions[3]`), owner question. Round-3's `copywriter_version` item is fixed (0.3.1). Knock-ons outside this file, not mine to act on: `concepts.md` still names concept 1 "Off the main road"; `mockups/unique/src/tenant/content.json` carries round-1 copy.

### Duplication (notes)
As round 3, plus the intro heading now repeating its own body's opening. Tolerated repeats: 24-hour desk (`[5]`, `stayInfo.note`, `amenities[8–9]`); rates by date (`[3]` ¶3, `closing`); newness (`tagline`, `[1]`, `testimonials[1]`); Mya and Roie (`[2]`, `testimonials`); pool position (`[4]`, `testimonials[2]`); room and amenity lists in prose and in modules.

### Failing sentences
None.

### Verdict: **PASS** (round 4, full-file re-check)

0 `unsourced`, 0 `contradicted`, 0 voice fails, required fields covered. Round 4 of 4 (base.md allows 2; rounds 3 and 4 were each allowed by Shahar).

## round 5 — full-file re-check after `featureLine` (schema v0.6) was drafted and kept, 2026-09-23

Reviewer: copyeditor 0.3.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, every layer read; playbook 0.5.2). Rules applied: hard constraint 6 (every sentence of the whole file re-checked against `dossier.json`, nothing carried over from round 4); a verbatim guest observation of a physical fact is `sourced`, never for a ranking, frequency or cause; no framing exemptions.

### Scope check
- `cmp en.json en.draft.json`: identical (humanizer 4b kept the line unchanged).
- `git diff 5beb75d -- en.json en.draft.json` (round 4 PASS → now): one added line in each, `"featureLine": "A year-round outdoor pool, at the centre of the hotel."`. Nothing else changed.
- `dossier.json` unchanged since `5e198a5` (before round 4).
- Draft → final diff: none.

### Fact audit (whole file)

Rows 1–87 re-checked against the dossier's current words; every one holds as recorded in round 4 (same keys, same values: `business.*`, `location.setting`/`distance_to_beach`/`spot`/`address`, `contradictions[0–3]`, `gaps[]`, `hours_note`, `booking.*`, `reviews.booking` incl. categories Location 9.6 / Cleanliness 9.7 / Comfort 9.7 / Staff 9.4 / count 34, `reviews.google` 5.0 / 21, `quotes[0–7]`, `facilities[0–25]`, `room_types[0–8]`). By script this round: `rooms[0–8]` vs `room_types[0–8]` 9/9; `amenities[0–24]` vs `facilities[0–24]` 25/25, notes = the facility's own brackets; `testimonials[0–4]` vs `quotes[0,4,3,6,7]` string-equal 5/5; booking URLs and phone identical. New row:

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 88 | `featureLine` | "A year-round outdoor pool," | `facilities[0]` "year-round outdoor swimming pool" (source_url Booking, fetched 2026-09-19); also `business.description` "a year-round outdoor swimming pool" | sourced |
| 89 | `featureLine` | "at the centre of the hotel." | `reviews.quotes[3]` António (Booking) "the swimming pool at the center" — verbatim guest observation of a physical fact (position). His "creates a good vibe where people can meet up" is not carried. Same basis as row 27 | sourced (physical fact) |

**Counts (87 claim rows):** `sourced` 85 · `shared-context` 1 · `framing` 1 · **`unsourced` 0** · **`contradicted` 0**.

### Playbook 0.5.2 §6 (dates)
The capture date is required on headline rating blocks only. `ratings[0–1]` (the headline blocks) carry no `capturedAt` in the copy; the deployer seeds it from `reviews.booking.fetched_at` / `reviews.google.fetched_at` (2026-09-19) — open item, as before, not a copy fail. The scores in body copy (intro 9.6; about 9.7 / 9.7 / 9.4 / 34; Google 5.0 / 21) each name platform and count where they are a rating, and need no date of their own under 0.5.2.

### `sources.md` check
Every key cited re-read; all exist and say what the rows claim. New `featureLine` row cites `facilities[0]`, `business.description.value`, `reviews.quotes[3]` correctly; 54/140 correct. Its "critic full round 1 item 6" provenance is not a page claim and was not checked. Minor: the header still reads "round 4"; the row itself is dated.

### Voice audit (per block)
Round 4 scores stand on re-read (all clean, notes as recorded). New:

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `featureLine` | fragment, fits a caption | yes | yes | yes (pool, year-round, centre) | — | yes; "centre" matches the file's British spelling | yes | clean |

Voice fails: **0**.

### Completeness (`beach_lodging`)
Unchanged from round 4, plus `featureLine` 54/140. Schema limits by script: `tagline` 38, `closing` 72, `spot` 161/200, headings ≤ 27, bodies ≤ 440, `stayInfo.note` 84, `contact.address` 50. Open items unchanged: `ratings[].capturedAt` (deployer), `contact.whatsapp` (dossier gap), house number 166/1 vs 166/2 (`contradictions[3]`).

### Duplication (note)
The pool's year-round opening and central position now appear in `featureLine`, `copyBlocks[4]` S1, `amenities[0]` and `testimonials[2]`. `featureLine` is not a word-for-word repeat of `[4]` S1. Tolerated, as the other repeats in round 4.

### Failing sentences
None.

### Verdict: **PASS** (round 5, full-file re-check)

0 `unsourced`, 0 `contradicted`, 0 voice fails, required fields covered.
