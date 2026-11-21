# copy review — coconut-surf-inn-guest-house-and-restaurant · en · round 1

Reviewer: copyeditor 0.4.2. I read the runtime prompt (940 lines, assembled by `tools/prompt.mjs copyeditor` at 2026-11-04T22:25Z) in full. Run `2026-10-midigama-01` (test, outbound), state `copy_humanised`, 2026-11-05. I am independent of the copywriter (0.5.0) and the humanizer (0.2.1).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/coconut-surf-inn-guest-house-and-restaurant/dossier.json` (harvester 0.5.0, harvest commit `16dac18`). I read the dossier's own values and notes, not `sources.md`'s summary of them. `audit.json` / `audit.md` are not a source (hard constraint 2). `sources.md` uses the audit only for the CTA, the fan/A/C framing, the placement of `hoursNote`, the ratings to show and the closing intent, and I re-traced each of those lines to a dossier key below. The three auditor facts handed over with the brief are not in the dossier yet, so they are checked as **absences**, never as sources: Google's Pool and Fitness center are shown crossed out, Booking.com shows Visa/Mastercard icons next to Cash, and the "Coconut Beach" place (4.8 · 120) is the beach, not the inn. No `industry.md` exists (outbound run), so there is no research check.

## Verdict: **PASS** (round 1 of 2)

95 rows: 85 `sourced`, 2 `shared-context`, 3 `framing`, 5 correctly empty, **0 `unsourced`, 0 `contradicted`**. The voice audit is clean, with notes only. The `beach_lodging` must-haves are covered. Below are seven rulings (the seven questions the copywriter and humanizer left me) and nine notes. None of them fails the copy.

## Scope check

- **Draft vs final.** `diff` of the normalised `en.draft.json` and `en.json`: `humanizer_version` was added, and nine fields were reworded (`closing`, [2] ¶1–¶2, [3], [4] ¶1, [5], [6] ¶1–¶3, `spot`, `season`, `stayInfo.note`). Headings, `tagline`, [0], [1], [4] ¶2, `hoursNote`, `rooms[]`, `amenities[]`, `ratings[]`, `testimonials[]`, `contact` and `bookingLinks[]` are byte-identical. I re-checked every changed sentence:
  - `closing`: the same two facts (live dates and prices on Booking.com; phone as the way to ask). No number, no reply-time promise.
  - [2] ¶1: the same three facts. "Whether breakfast comes with your room depends on the rate you book" → "Breakfast comes with some rates and not with others" says the same thing (N9).
  - [2] ¶2: the same listing name, 4.6 and 39.
  - [3]: the same five things (thatch, swing seat, hammocks, benches, tables) and the sea beyond the palms.
  - [4] ¶1: still a channel of water, never a pool.
  - [5]: the same count (six), range (single for 1 → family for 4), entrance and bathroom.
  - [6]: the same distances and attribution. "let us know and we'll arrange one" = the owner's Q&A answer. "There's a charge" = Booking's "paid airport shuttle".
  - `spot`: the second sentence moved closer to the host's own wording.
  - `season`: the same attribution, spot name and months.
  - `stayInfo.note`: the same two house rules.
  - **Nothing appeared during humanizing, and nothing was lost.**
- **Testimonials:** I machine-checked all 12 against `reviews.quotes[2, 9, 57, 49, 70, 78, 55, 89, 72, 87, 8, 90].text`. Text is byte-identical, and author, `source: booking` and the YYYY-MM date are identical. All are English (`lang: en` in the dossier). The longest is 467 chars (limit 600). No chosen quote names Edwin, Wikum/Vikum or Silva (`contradictions[9]`). Excluded quotes are excluded for the reasons stated: over 600 chars, non-English, pre-renovation Airbnb, a different owner named, or pitch-only complaints.
- **Lengths:** every field is within the schema. `tagline` 91, `closing` 88, `spot` 135, `season` 108 (≤ 200), `hoursNote` 61, `stayInfo.note` 112. Headings 11–23 characters, bodies 120–353. `rooms[].note` ≤ 77, `rooms[].label` ≤ 39, `amenities[].label` ≤ 44. There are 7 `copyBlocks` (≤ 8).
- **`sources.md` indexes** (`quotes[n]`, `room_types[n]`, `facilities[n]`): checked against the dossier. All point at the right entries. Two traces in it are inaccurate, and the facts behind both still hold (N1).
- **Auditor facts (absence check):** no pool, gym, fitness centre, spa or public bath appears anywhere. The courtyard channel ([4] ¶1) is described as a channel of water and is never called a pool. No payment method is stated anywhere: the copy promises neither cash only nor cards (`booking.payment` and its note). The "Coconut Beach" 4.8 · 120 is in no `ratings[]` row and no sentence. Erin's "views of coconut beach" and Mette's "close to coconut beach" are guests naming the beach itself, which is correct.

## Rulings

**R1. "a consistent A-frame reef break" (`spot`) is the host's own claim, so it is `sourced`.** The dossier records it as the business's words: `break.evidence[0]` (who: "business (Airbnb listing text by host Chinthaka)") and `location.spot` (`origin_note`: "the business's own words"), verbatim from `business.description`. The third-party guide (`location.spot_reference`) also says "A-frame", but the copy does not rest on it. The auditor's reading of it as third-party is wrong. "Consistent" is a frequency word, and it has its own source: it is the owner's statement about his own break, quoted from his listing. The guide's level line ("Best suited for intermediate surfers") is **not** a qualifier the copy drops. The copy makes no claim about level or suitability, so nothing is widened. See N4 for what must not be added later.

**R2. `season`, attributed to the Sri Lanka Travel Pages guide, is allowed: `shared-context`.** The playbook (§7) says generic surf knowledge "is a fact like any other: sourced or omitted". This one is sourced: `location.spot_reference`, with its `source_url` and `fetched_at`. It is about the place, not the business, and the sentence names the guide, so it is never presented as the business's own season (`season.gap`). The schema's `season` field does not require the owner's words; only `spot` says "in the owner's words". No qualifier that matters is dropped: the guide's "with consistent swells, especially good during sunrise and sunset high tides" narrows nothing about the months. It stays an owner item (the business's own season), and the review-date cluster is correctly not used. Voice note N3 is about the spot name.

**R3. The edits to the host's words are trims and grammar repairs, not paraphrase.** On the site, the host's sentences run in the business's own voice, unquoted. So the verbatim rule (which covers `testimonials[]`) does not bind them; the test is that no fact changes. Edit by edit:
- [0] ¶1: drops "This undiscovered gem is a peaceful, serene oasis that is" (a superlative and padding) and mends "but it right next to" into ", right next to". Trim.
- [1] ¶1: "Chintaka" → "Chinthaka", his own signed spelling (`quotes[87].owner_reply`, `business.people[0]`). Spelling fix.
- [2] ¶1: "available." → "are available.". Grammar.
- `spot`: drops "located" and "just", and "100 meters walk" becomes "a 100 m walk". Trim. Dropping "just" removes a minimiser and adds nothing.
- None of them moves a distance, adds an amenity or changes who says what.

**R4. [1] ¶1, "the gracious host Chinthaka", stays as written: `sourced`, with a voice note and an owner item.** The host published this sentence about himself, in the third person, on his own live listing (`business.description`). Putting it on his own site in the business's voice is faithful to its source and asserts nothing new. Guests corroborate the warmth (Booking Staff 9.4, `reviews.booking.subscores`), but that is not needed: the sentence is his. It is also the page's one marketing-register sentence (stacked adjectives, "you will experience"). That is a taste matter for the owner at the pitch, not a fail: the register is the owner's own, which is what the voice audit asks for. Quoting it as his would be a rewrite, and I make no wording suggestion. Keep, trim or quote are all acceptable if the owner or humanizer wants a change later.

**R5. Budget Single "no hot water" is `sourced`, by a guest's verbatim observation of a physical fact.** `reviews.quotes[19]` is Frederic, Canada, Booking 2026-01-24, room **Budget Single Room**. His `negative_text` says "Pas d'eau chaude. J'avais pris une chambre sans l'air climatiser mais avec un fan". That is a guest observing a physical fact about that room type, which counts as a source (base.md, Shahar 2026-09-23), and it agrees with `critical_themes[0]`. `sources.md` missed this quote and leaned on the auditor's note, which cannot source a claim. The fact stands on `quotes[19]`. No A/C stands on `room_types[2].air_conditioning: false` and the owner's reply at `quotes[71]`. The owner's reply to Marcel ("our other rooms do include that mentioned amenities", `quotes[20]`) reads loosely, as if it covered the Single as well. His reply at `quotes[71]` rules that out for A/C, and the harvester flagged no contradiction. **It stays a light owner item**: confirm hot water per room type.

**R6. Keep the Airbnb `ratings[]` row: `sourced`.** 4.44 / 5 · 54 · captured 2026-11-04 (`reviews.airbnb`) is a real, current score on a live listing the business runs. The schema wants "one row per platform the business is actually rated on", and the row carries platform, count and date. It is also the lowest of the three, so it is not cherry-picked. The risk is the link: it opens a listing that describes the pre-renovation house ("Shared bathroom" header, fans only, "Break fast not included", 12:00/12:00), and that contradicts the site's rooms and `stayInfo` (audit F6, as pitch context only). That is an off-site problem, not a false sentence on the site. **Owner item:** update or close the Airbnb listing. **Deployer:** drop the row if the listing is closed or rewritten before go-live.

**R7. "with a balcony" in the Deluxe Double Room with Balcony note stays.** The label is Booking's room name, kept verbatim so the row matches the listing. The note is the room's spec line and states the feature, in the same pattern as the Deluxe Family note. The schema's "No duplication" rule is about one fact in two places on the page (a `copyBlocks` paragraph and a `rooms[]` row). A name and its own spec line in one row are not that. Read aloud ("Deluxe Double Room with Balcony — Upstairs, 15 m², with a balcony") it is a little redundant, so it is a taste note: the humanizer may cut it in a later pass, and nothing requires that.

## Fact audit (whole file, one row per sentence)

### Top-level fields

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | Coconut Surf Inn | `business.name.value` (Booking, Airbnb, sign img-002) | sourced |
| 2 | `businessType` | beach_lodging | `business.type.value`, `businessType_note` | sourced |
| 3 | `tagline` | A guesthouse in Gurubebila, between Midigama and Weligama, … | "guesthouse": `business.description` ("Coconut Surf Inn guesthouse"), `business.type.note` (Booking "Guest house"). Place: `location.place_name_used` (sign "Gurubebila", host "Midigama", platforms "Weligama"), whose note recommends exactly this form. Geography holds: the pin is at 80.4029 E, with Midigama to the west and Weligama (3.3 km, `location.distance_to_centre`) to the east | sourced |
| 4 | `tagline` | … on the south coast of Sri Lanka. | `location.lat_lng` (5.96 N), `location.nearby` (Weligama, Ahangama, Koggala) | shared-context |
| 5 | `closing` S1 | Booking.com has the live dates and prices. | `booking.engine_url`, `booking.path`, `offers_note` (live OTA rates only) | sourced |
| 6 | `closing` S2 | If you'd rather ask something first, call us. | `booking.direct_channels` (phone only), `contact.phone`. No reply time is promised (`booking.reply_time_hint`) | sourced |
| 7 | `featureLine` | null | `business.tagline.gap` | correctly empty |
| 8 | `spot` S1 | Coconuts, a consistent A-frame reef break, is in front of the guesthouse. | `break.evidence[0]`, `location.spot` (`origin_note`: the business's own words), `business.description`; `business.owner_voice` "coconut surf break ( 60m)" (R1, R3) | sourced |
| 9 | `spot` S2 | Plantations is a more mellow wave, a 100 m walk up the beach. | as row 8 ("a more mellow wave, located just 100 meters walk up the beach"); the comparative is the host's own; `location.nearby` | sourced |
| 10 | `season` | According to the Sri Lanka Travel Pages surf guide, the season at Coconut Point runs from November to April. | `location.spot_reference` (srilankatravelpages.com, fetched 2026-11-04), attributed; `season.gap` (R2) | shared-context |
| 11 | `openingHours` | [] | `hours_note.gap` (lodging; the 24-hour front desk is an amenity row) | correctly empty |
| 12 | `hoursNote` | The restaurant upstairs is open every day from 7:30 to 22:00. | `restaurant_hours[0]` (Google restaurant listing, 07:30–22:00, mon–sun); "upstairs": `facilities[0]`, `business.aliases[0]` ("2nd floor"). The one-off Diwali flag is correctly not stated (N8) | sourced |
| 13 | `priceList`, `lessons`, `credentials`, `rentals`, `brands` | [] | `offers_note`; `business.type.note` and `facilities_note` (no lessons or board rental); schema rule "Live prices are not content" | correctly empty |
| 14 | `languagesSpoken` | ["en"] | `languages_spoken[0]`, `contradictions[11]` resolution | sourced |

### Copy blocks

| # | Field | Sentence | Dossier key | Verdict |
|---|---|---|---|---|
| 15 | [0] heading | By the beach | `location.distance_to_beach` | framing |
| 16 | [0] ¶1 | The guesthouse is tucked away from the busy Galle–Matara road, right next to the beach. | `business.description` (host, trimmed, R3); `location.distance_to_beach.value` "right next to the beach"; `contradictions[4]` resolution (the owner's words, never Booking's 1.3 km). Guests confirm it is off the main road (Elinor `quotes[70]`, Dean `[72]`) (N6) | sourced |
| 17 | [0] ¶2 | Next to the guesthouse is a large open grassed area overlooking the beach, where the friendly locals and tourists alike gather to watch the surf, play cricket, socialise and enjoy beautiful sunrises and sunsets. | `business.description`, verbatim; img-009 (the open green, beach shacks and reef from the roof) | sourced |
| 18 | [1] heading | The Eranga family home | `business.description`, `business.people[0]` | sourced |
| 19 | [1] ¶1 | Coconut Surf Inn is the Eranga family home, so staying here means you will experience the endless warm smiles and kind hospitality of the gracious host Chinthaka and his family. | `business.description`, verbatim except the spelling, which matches his own signature (`quotes[87].owner_reply`) (R3, R4) | sourced |
| 20 | [1] ¶2 | Chinthaka has been a host on Airbnb for 13 years. | `business.since.note` ("say 'hosting on Airbnb for 13 years' if used, not an opening year"); `reviews.airbnb.note` ("13 years hosting") | sourced |
| 21 | [2] heading | The restaurant upstairs | `facilities[0]`, `business.aliases[0]` | sourced |
| 22 | [2] ¶1 S1 | A long covered room on the upper floor, with cushioned benches, low tables and a view of the sea. | `facilities[0]` ("upper-floor restaurant with sea view"); img-105 ("covered upper-floor restaurant lounge: cushioned bench seats, low tables, sea view"), img-107 ("the long upper-floor restaurant"); `location.views` | sourced |
| 23 | [2] ¶1 S2 | All meals, snacks and drinks are available. | `business.description` ("All meals, snacks and drinks available"); still current: `restaurant_hours[0]` (open all day), `facilities[4]` | sourced |
| 24 | [2] ¶1 S3 | Breakfast comes with some rates and not with others. | `stay_info.breakfast.note` ("Rate-dependent — the owner must confirm"); `contradictions[5]` resolution ("rate-dependent") (N9) | sourced |
| 25 | [2] ¶2 | The restaurant has its own Google listing, Coconut Surf Restaurant (2nd floor), where it's rated 4.6 from 39 reviews. | `business.aliases[0]`, `reviews.google_restaurant` (4.6 · 39, fetched 2026-11-04). A score in body copy needs no date (playbook §6) | sourced |
| 26 | [3] heading | On the roof | `facilities[1]` | sourced |
| 27 | [3] S1 | The terrace up top is shaded with thatch, and has a swing seat, hammocks, benches and tables. | `facilities[1].value` ("rooftop terrace with thatched shade, hammocks, swing seats"); img-100–104 | sourced |
| 28 | [3] S2 | Beyond the palms, the sea. | img-100 ("rooftop swing seat with the sea and palms behind"), img-102–104; `location.views` | sourced |
| 29 | [4] heading | Inside the house | — | framing |
| 30 | [4] ¶1 S1 | The middle of the house is a skylit courtyard. | `facilities[3]` ("light-well courtyard"); img-006 ("skylit light-well"), img-001, img-011 | sourced |
| 31 | [4] ¶1 S2 | Palms grow out of a shallow channel of water there, between the windows of the rooms. | img-006 ("palms planted in a shallow turquoise water channel"), img-007 ("courtyard water channel with palms between the red-framed windows of the rooms"); `facilities_note` (not a pool) | sourced |
| 32 | [4] ¶2 | There are hammocks on the verandas, an outdoor shower in the garden, a clothes line, and a rack for your boards. | `business.description` (host's list); `facilities[2]`, `[3]`. Veranda hammocks: img-017, img-030, img-098. Garden shower: img-003. Board rack: img-016, Merethe in `facilities[2].note`. Clothes line: the host's text only (N2) | sourced |
| 33 | [5] heading | Six kinds of room | `room_types` (6) | sourced |
| 34 | [5] S1 | Booking.com lists six, starting with a single for one person and going up to a family room for four. | `room_types[2]` (Budget Single, sleeps 1), `room_types[4]` (Deluxe Family, sleeps 4); attributed to Booking (`room_count.note`: Airbnb's "09 rooms" is pre-renovation) | sourced |
| 35 | [5] S2 | Each one has its own entrance, and its own bathroom with a shower. | All six `room_types[].facilities`: "Private entrance", "Private bathroom", "Bath or shower". Shower: the descriptions of `room_types[0–3]`, plus guests' observations for the other two: Deluxe Double with Balcony (Leah `quotes[1]` "nice shower", Rosa `[8]`) and Deluxe Family (Séverine `[14]` "une douche") (N1) | sourced |
| 36 | [6] heading | Getting here | — | framing |
| 37 | [6] ¶1 S1 | Koggala Airport is 11 km away. | `location.airport` | sourced |
| 38 | [6] ¶1 S2 | If you want a taxi from the airport, let us know and we'll arrange one. | `business.owner_voice.note` (Booking Q&A: "If you want to arrange a taxi from airport to our hotel please let us know"); `facilities[5]` | sourced |
| 39 | [6] ¶1 S3 | There's a charge. | `location.airport` ("paid airport shuttle"), `facilities[5]` ("paid") | sourced |
| 40 | [6] ¶2 S1 | The nearest train station is Kumbalgama, about a 13-minute walk. | `location.distance_to_station` ("Kumbalgama station 800 m (1.2 km on foot, 13 min)"). "Nearest" is a superlative, checked against every station in the dossier: Kumbalgama 800 m < Midigama 1.4 km | sourced |
| 41 | [6] ¶2 S2 | Midigama station is 1.4 km away. | `location.distance_to_station.note` | sourced |
| 42 | [6] ¶2 S3 | Booking.com puts the centre of Weligama 3.3 km from the house. | `location.distance_to_centre`, attributed | sourced |
| 43 | [6] ¶3 | On Google Maps, look for Coconut Surf Inn Guest House and Restaurant. | `business.google_listing_name`; `contact.mapUrl` points at the same place | sourced |

### `rooms[]`

| # | Row | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 44 | [0] label / beds / sleeps | Budget Single Room · 1 single bed · 1 | `room_types[2].value` | sourced |
| 45 | [0] note S1 | Upstairs, 9 m². | `room_types[2]` (`size_m2` 9, `floor` [1]) | sourced |
| 46 | [0] note S2 | Fan and mosquito net; no air conditioning and no hot water. | facilities "Fan", "Mosquito net"; `air_conditioning: false`; owner reply `quotes[71]` (no A/C); no hot water: Frederic `quotes[19]` (this room type), `critical_themes[0]` (R5) | sourced |
| 47 | [1] label / beds / sleeps | Budget Double Room · 1 large double bed · 2 | `room_types[0].value` | sourced |
| 48 | [1] note S1 | 12 m². | `room_types[0].size_m2` (no floor given, none stated) | sourced |
| 49 | [1] note S2 | Fan and mosquito net; no air conditioning and no hot water. | `room_types[0]` facilities, `air_conditioning: false`; owner reply `quotes[20]` ("does not include facilities such as air conditioning or hot water") | sourced |
| 50 | [2] label / beds / sleeps | Superior Double Room · 1 large double bed · 2 | `room_types[3].value` | sourced |
| 51 | [2] note S1 | Ground floor, 14 m². | `room_types[3]` (`floor` [0], 14) | sourced |
| 52 | [2] note S2 | Air conditioning, fan and hot water. | `room_types[3]` facilities; hot water: owner reply `quotes[20]` ("our other rooms do include that mentioned amenities"), Laurie `quotes[0]` (this room: "Climatisation et eau chaude") | sourced |
| 53 | [3] label / beds / sleeps | Deluxe Double Room with Balcony · 1 large double bed · 2 | `room_types[5].value` | sourced |
| 54 | [3] note S1 | Upstairs, 15 m², with a balcony. | `room_types[5]` (`floor` [1], 15, `balcony: true`) (R7) | sourced |
| 55 | [3] note S2 | Air conditioning, fan and hot water. | `room_types[5]` facilities; hot water: owner reply `quotes[20]`, Rosa `quotes[8]` (this room; it had hot water until a failure) | sourced |
| 56 | [4] label / beds / sleeps | Deluxe Double Room (2 Adults + 1 Child) · 1 double bed and 1 large double bed · 3 | `room_types[1].value` | sourced |
| 57 | [4] note S1 | Ground floor, 19 m². | `room_types[1]` (`floor` [0], 19) | sourced |
| 58 | [4] note S2 | Air conditioning, fan and hot water. | `room_types[1]` facilities; hot water: owner reply `quotes[20]` | sourced |
| 59 | [5] label / beds / sleeps | Deluxe Family Room · 1 single bed and 1 large double bed · 4 | `room_types[4].value` (N5) | sourced |
| 60 | [5] note S1 | 28 m², with a balcony and a garden view. | `room_types[4]` (28, `balcony: true`, "Garden view"; no floor given, none stated) | sourced |
| 61 | [5] note S2 | Air conditioning, fan and hot water. | `room_types[4]` facilities; hot water: owner reply `quotes[20]` | sourced |

### `stayInfo`

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 62 | `checkInFrom` / `checkOutTo` | 13:00 / 11:00 | `stay_info.check_in`, `.check_out`; `contradictions[7]` resolution (Booking, not Airbnb) | sourced |
| 63 | `checkInTo` / `checkOutFrom` / `minNights` | null | not published | correctly empty |
| 64 | note S1 | Children of any age are welcome, but there are no cots or extra beds. | `stay_info.house_rules[0, 1]` | sourced |
| 65 | note S2 | Pets are allowed on request, at no charge. | `stay_info.house_rules[3]` | sourced |

### `amenities[]`

| # | Row | Dossier key | Verdict |
|---|---|---|---|
| 66 | Free WiFi | `facilities[8]` | sourced |
| 67 | 24-hour front desk | `facilities[9]` | sourced |
| 68 | 24-hour security and CCTV | `facilities[9]` | sourced |
| 69 | Room service | `facilities[4]` | sourced |
| 70 | Packed lunches | `facilities[4]`; `business.description_booking` | sourced |
| 71 | Swimwear and snacks for sale at the entrance | `facilities[7]`; img-014, img-023, img-028 ("at the entrance") | sourced |
| 72 | Bicycle hire · additional charge | `facilities[6]` ("bicycle hire (paid)") | sourced |
| 73 | Car hire | `facilities[6]` (no charge given, so no note) | sourced |
| 74 | Tour desk | `facilities[6]` | sourced |
| 75 | Laundry · additional charge | `facilities[9]` ("laundry (paid)") | sourced |

### `ratings[]`, `testimonials[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 76 | `ratings[0]` | Booking.com 8.5/10 · 142 · 2026-11-04 · listing URL | `reviews.booking` (rating, count, fetched_at) | sourced |
| 77 | `ratings[1]` | Google 4.8/5 · 88 · 2026-11-04 · place-id URL | `reviews.google`; `location.map_url` (the inn's place, never "Coconut Beach") | sourced |
| 78 | `ratings[2]` | Airbnb 4.44/5 · 54 · 2026-11-04 · room 2402254 | `reviews.airbnb` (R6) | sourced |
| 79–90 | `testimonials[0–11]` | Erin, Janno, Meagan, Chloe, Elinor, V, Mette, Liam, Dean, Abdulrahman, Rosa, Tadiwa | `reviews.quotes[2, 9, 57, 49, 70, 78, 55, 89, 72, 87, 8, 90]`: text, author, source and date machine-checked identical | sourced (12) |

### `contact`, `bookingLinks[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 91 | `contact.phone` | +94778921396 | `contact.phone.value` (Google tel: link, live Kayak and Momondo); `contradictions[2]` resolution. +94713177978 appears nowhere | sourced |
| 92 | `contact.whatsapp` / `.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap` | correctly empty |
| 93 | `contact.address` | Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka | `location.address.value`: Google's listing words exactly, postcode from Google, no house number (`contradictions[0]`); playbook §6 | sourced |
| 94 | `contact.mapUrl` | Google place-id link | `location.map_url` | sourced |
| 95 | `bookingLinks[0]` | Check dates on Booking.com → listing | `booking.engine_url` | sourced |

Totals: 85 sourced, 2 shared-context (4, 10), 3 framing (15, 29, 36), 5 correctly empty (7, 11, 13, 63, 92). **0 unsourced, 0 contradicted.**

### Notes (not failing)

- **N1. Two traces in `sources.md` are wrong, but the facts behind them hold.**
  - Block [5]: it says "every room description names a shower". Only four of the six do. The Deluxe Double with Balcony and the Deluxe Family descriptions say only "private bathroom", with Booking's "Bath or shower" tick. Guests' verbatim observations fill both (row 35).
  - `rooms[0]`: it rests "no hot water" on the auditor's note, which cannot source a claim. The real source is `quotes[19]` (R5).
- **N2. "a clothes line" ([4] ¶2)** rests only on the host's Airbnb text. That text is live and is the business's own, so the line is sourced. But the text predates the renovation, and no photo or current review shows a clothes line. It is not contradicted (Samantha's missing drying rack, `quotes[71]`, was inside her room). Owner to confirm.
- **N3. Two names for one break.** `spot` says "Coconuts" (the host's name), and `season` says "Coconut Point" (the guide's name, which has to stay to keep the attribution accurate). A reader may not link the two. That is a voice and clarity note. The designer can set the two fields together.
- **N4. Level.** The copy says nothing about who the waves suit, which is correct: the business does not say, and the guide's "intermediate" and Natalie's "alleen … als je een gevorderde surfer bent" (`quotes[23]`) are third-party. Later agents (designer, SEO) must not imply the break suits beginners, for example with "learn to surf" framing next to `spot`. Doing that would drop the guide's limit and be `contradicted`.
- **N5. The Deluxe Family Room "sleeps 4" with one single and one large double bed** is Booking's own data, reproduced as is. Owner to confirm how four people sleep in it.
- **N6. "right next to the beach" ([0] ¶1)** is the host's phrase, and it is the dossier's `distance_to_beach.value`. The rest of the evidence puts the house close but not on the sand: guests say 100 m and 1–2 minutes, the scout measured 92 m, and the open green lies between the house and the shore. The copy says nothing closer than the owner does ("steps from the sand" would go further). Accepted.
- **N7. `\r\n` inside the Meagan and Mette quotes** is verbatim. The template must render it as a line break or a space, never as literal characters (designer item).
- **N8. The restaurant hours** come from a Google listing that is unclaimed (`business.aliases[0]`). They are sourced, but the owner should confirm them and claim the listing (audit F4, pitch).
- **N9. Breakfast.** "Breakfast comes with some rates and not with others" follows the harvester's "rate-dependent". Every OTA offer seen on 2026-11-04 showed free breakfast, and the "not included" evidence dates from 2024 and earlier. The sentence is honest about the uncertainty, and nothing in the dossier says that every rate today includes breakfast. Owner to confirm.

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing | ✓ | ✓ | ✓ | ✓ | ✓ | the closing gives a real choice; the tagline is long but every part of it does work |
| By the beach | ✓ | ~ (host's list of four) | ~ ("friendly", "beautiful", host's) | ✓ green, cricket, road | ✓ | V1 |
| The Eranga family home | ✓ | ✓ | ✗ in ¶1 (host's) | ~ | ~ | V2 (= R4) |
| The restaurant upstairs | ✓ (the fragment opener works under the heading) | ✓ | ✓ | ✓ benches, low tables | ✓ | |
| On the roof | ✓ (long, then a fragment) | ✓ | ✓ | ✓ thatch, swing seat | ✓ | |
| Inside the house | ✓ | ✓ | ✓ | ✓ channel, red windows, rack | ✓ | |
| Six kinds of room | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Getting here | ✓ | ✓ | ✓ | ✓ | ✓ | "There's a charge." is a good short honest line |
| spot / season / hoursNote | ✓ | ✓ | ✓ | ✓ | ✓ | N3 |
| rooms / stayInfo / amenities | ✓ (the repetition is deliberate, so rows compare line by line) | — | ✓ | ✓ | ✓ | R7 |

- **V1.** [0] ¶2 is the host's sentence verbatim. "the friendly locals and tourists alike gather to watch the surf, play cricket, socialise and enjoy beautiful sunrises and sunsets" is brochure register, but it is his, concrete (cricket on the green) and not a rhetorical triad. Taste, not a fail.
- **V2.** [1] ¶1 is the page's one sentence with tell-list wording ("you will experience", "endless warm smiles", "gracious host"), and on his own site it has the host praising himself (R4). It is the owner's verbatim register. The owner decides at the pitch, and it is not a fail.
- **Honest limits:** present, and plain: the budget rooms have no A/C and no hot water, there are no cots or extra beds, the airport taxi costs extra, and breakfast comes only with some rates.
- **Padding vocabulary in our sentences:** none ("nestled", "vibrant", "boasts", "unforgettable", "discover", "whether you're…" are absent). What padding there is sits only in the host's two kept sentences.
- **Register:** plain and slightly informal ("up top", "we'll", "There's"), with the host's warmer register in the two places he speaks. It matches a family guesthouse.
- **Locale:** English only, in its own cadence.

Voice score: **8 / 8 criteria met (two taste notes on the host's own sentences); 8.5 / 10.**

## Completeness (`beach_lodging`)

Must-haves: ≥ 1 `rooms[]` row ✓ (6, every Booking room type); ≥ 1 `bookingLinks[]` ✓; ≥ 6 photos is outside the copy (134 business-owned images in the dossier). Core: `businessName` ✓, one working channel (phone) ✓.

Should-haves: `stayInfo` check-in/out ✓, `amenities[]` ✓ (10), `ratings[]` ✓ (3), `testimonials[]` ✓ (12), `spot` ✓ (named by the business).

Deliberately empty, each with a stated reason: `featureLine`, `openingHours`, prices, `contact.whatsapp` / `.email`, the teaching and kit modules. Nothing is padded, at about 300 words of body copy. Duplicates: none across blocks. Hammocks (roof and verandas) and the sea view (restaurant and roof) are each two places with their own facts. The balcony label/note pair is R7.

## Owner items (not copy failures)

- **Hot water by room type**, the Budget Single especially (R5).
- **Breakfast**: whether every current rate includes it (N9).
- **Season, and who the waves suit**: the business publishes neither (R2, N4).
- **The Airbnb listing**: update or close it. It describes the old house and is linked from `ratings[2]` (R6).
- **"the gracious host Chinthaka"**: whether he wants his Airbnb sentence on his own site as is (R4).
- **The clothes line** (N2); the **Family Room sleeping four** (N5); the **restaurant hours**, and claiming the restaurant's Google listing (N8).
- **Payment**: Booking says cash, and Visa/Mastercard icons sit beside it. The site states neither.
- **Prices, WhatsApp, email, reply time**: none published.
- **House number** (44 or 49), and the **place name** order: Gurubebila, Midigama or Weligama.
- **Who runs the house today**: Chinthaka is the only person the business names; guests name Edwin and Wikum.

## Verdict: **PASS** (round 1, full-file check)

0 `unsourced`, 0 `contradicted`, voice clean (8.5/10), required fields covered. The closest calls for the human are R5 (Budget Single hot water, sourced by one guest's observation) and R6 (the Airbnb row and its outdated listing).

Ledger line due (not written by me): `copy_humanised → copy_passed`, note "round 1 PASS (copyeditor 0.4.2): 95 rows, 85 sourced / 2 shared-context / 3 framing / 5 correctly empty, 0 unsourced, 0 contradicted; draft→final diff clean (9 fields reworded, no fact added or lost; 12 testimonials machine-checked verbatim); rulings: A-frame = host's words, season attributed to the guide allowed, host edits are trims, 'gracious host' kept, Budget Single no-hot-water sourced by quotes[19], Airbnb row kept, balcony repeat kept; voice 8.5/10; owner items: hot water per room, breakfast per rate, season/level, Airbnb listing".
