# copy review — sea-you-surfers-nest · en · round 1

Reviewer: copyeditor 0.4.2. Runtime prompt from `tools/prompt.mjs copyeditor`, read in full. Run `2026-10-midigama-01` (test, outbound), state `copy_humanised`, 2026-11-22. I am independent of the copywriter (0.5.0) and the humanizer (0.2.1).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/sea-you-surfers-nest/dossier.json` (harvester 0.5.0, commit `71f0c22`, before the copy commit `c9b9ba4`). I read the dossier's own values, notes and image records, not `sources.md`'s summary of them. `audit.json` is not a source (hard constraint 2). `sources.md` uses it only for the CTA order, the F4/F5/F7 framing and the closing intent, and I re-traced each of those lines below to a dossier key. There is no `industry.md` (outbound run), so there is no research check.

## Verdict: **FAIL** (round 1 of 2)

There are 72 rows: 55 `sourced`, 1 `shared-context`, 6 `framing`, 8 correctly empty, **1 `unsourced`, 1 `contradicted`**. The voice audit passes, with notes. The `beach_lodging` must-haves are covered. Both failing sentences were already in the copywriter's draft, so both go back to the **copywriter**.

| # | Field | Sentence | Verdict | Owner |
|---|---|---|---|---|
| 27 | `copyBlocks[2]` (offer) ¶1 S3 | "Airbnb’s rates are for a room without it, so ask when you book if you want the one that has it." | **contradicted** (dropped qualifier) | copywriter |
| 33 | `copyBlocks[4]` (carved) ¶1 S1 | "The front door is a carved grey double door, and the wooden chair beside it is carved too." | **unsourced** | copywriter |

**B1, row 27.** The dossier limits this fact to one listing. `business.description_rooms_note.note` quotes **listing 2** (the whole-house listing, 1793988904511877292): "(rates are for Non A/C double room, Pls inquire when booking)". `offers_note` repeats it as "Airbnb listing 2". The **listing 1** text (`description_rooms_note.value`, the room listing 1508895627217411616) says only "(Pls inquire for per room rate for individual rooms)". It says nothing about which room its rate covers. The copy says this of "Airbnb’s rates" in general, and the page's "Book a room on Airbnb" button (`bookingLinks[1]`) goes to listing 1, the listing the dossier says nothing about. The humanizer flagged the same thing in `humanizer-notes.md`. **Change needed:** limit the rate statement to the listing the dossier attributes it to, or drop the rate clause. The advice to ask when booking is supported by both listings and can stay. The copywriter chooses the words. Also note that listing 2 is the whole house, so its own note ("rates are for Non A/C double room") is unclear about what a whole-house rate covers. That makes it an owner item too.

**B2, row 33.** The source is img-027, "entrance: carved grey double door, wall lamp, carved wooden chair". The image record ties it to a room, not to the house: `booking_room_ids: [1492325603]` (the Standard Double Room, which Booking says has "a private entrance") and `airbnb_space: "Bedroom 2"`. Nothing in the dossier says this is the house's front door. That is the same kind of unsourced position as the draft's "further in", which the humanizer correctly removed from the next sentence. **Change needed:** describe the door without calling it the house's front door, or have the harvester establish where it is. The heading "Carved doors and a surfboard shower" and the carved chair are fine.

## Scope check

- **Draft vs final.** I compared `en.draft.json` and `en.json` after normalising both. The humanizer added `humanizer_version`, reworded `closing` S2 and `spot`, and reworded every copy-block body. Headings, `tagline`, `rooms[]`, `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `contact` and `bookingLinks[]` are identical. I re-checked every changed sentence:
  - `closing`: "To ask Ashly…" became "If you want to ask Ashly…". Same channel, no number.
  - `spot`: the label and colon became a plain attribution. The quote is still verbatim.
  - intro ¶1 and ¶2, Ashly ¶1, offer ¶1–¶2, Breakfast, carved ¶2, info ¶1: same facts in a different order. Nothing was added. "Only one has air conditioning" still says six do not.
  - Ashly ¶2: the quote is split at his own comma. Every word was checked verbatim against `business.description.value`, sentence 2.
  - carved ¶1: "Further in" became "Elsewhere". This **removes** a position claim, which is correct.
  - info ¶2: same two numbers. The attribution "by Booking.com’s count" now sits after the station clause (see N1).
  - **Nothing appeared during humanizing.** Both failing sentences are in the draft.
- **Testimonials.** All 5 were machine-checked against `reviews.quotes[1, 2, 3, 4, 11]`. In every case the text is byte-identical, the author matches, the source matches and the YYYY-MM date matches. Each was also found in `all_airbnb[]` / `all_booking[].positive`. The longest is 386 chars (limit 600). Excluded quotes are excluded for stated reasons: over 600 chars (Sanna), not English, `quotes_note` advice (Dona, Thushan), host-conduct complaints (never used), and Joanna's mixed review.
- **Lengths.** All are within the schema: `tagline` 60, `closing` 125, `spot` 64, `stayInfo.note` 127 (each ≤ 140/200). Headings are 5–35 chars and bodies 98–374. `rooms[].note` is at most 74 chars and `rooms[].label` at most 20. `amenities` labels are ≤ 28 and notes ≤ 17. `bookingLinks[].label` is at most 39. Array counts: 6 copy blocks (≤ 8), 5 testimonials, 8 amenities, 3 ratings, 3 booking links.
- **`sources.md` indexes.** I checked every `facilities[n]`, `contradictions[n]`, `quotes[n]`, `room_types[n]` and `all_booking[0]` reference against the dossier. All point at the right entries.

## Rulings (not failing)

**R1. Check-out 06:00–10:00 is `sourced`.** `contradictions[0]` is about **check-in** ("what": "check-in time"), and its resolution reads "the site should not state times until the owner confirms". `stay_info.check_out` has no conflicting value: Booking says 06:00–10:00, Agoda "until 10:00", and Airbnb publishes none. The `gaps[]` row names "check_in / check_out", but only check-in conflicts. The copy states check-out and leaves check-in null, and `sources.md` says so openly rather than silently. I accept it. The human may read the harvester's "times" more strictly.

**R2. "usually replies there within a few hours" is a frequency, and it is `sourced`.** `business.host_stats` gives `response_time` "Responds within a few hours" and `response_rate` 70%. "Usually" (more than half) holds at 70%, and the reply time is Airbnb's own figure. "There" limits it to Airbnb.

**R3. "a white two-storey house" is `sourced`.** The harvester describes the photo set as "a white two-storey house" (`same_address_neighbour.comparison`). The upstairs balconies are img-003, img-076 and img-077, and img-042 shows a white wall. One balcony wall is ochre (img-077), which is a detail, not a contradiction.

**R4. Tagline "on Sri Lanka’s south coast" is `shared-context`.** It is about the place, not the business, and the dossier pins it: `location.lat_lng` (5.962 N, 80.397 E) and `location.nearby` (Weligama, Koggala). This is the same ruling as Lotus R4.

**R5. "If you want to ask Ashly something first, call." is `sourced`.** It rests on `business.owner` (Ashly, the host; Marina: "Ashley, the owner") and `contact.phone` (the business's own sign). It implies that a call reaches Ashly. The number is the business's, and he runs the house. The open item is the one already in `gaps[0]`: a human must confirm the number before it becomes a tap-to-call action.

**R6. Marina's quote is her Booking "positive" field only.** Booking stores positive and negative as separate fields. The quote is the whole positive field, verbatim, and its meaning is not changed by leaving out the negative one (a dark ground-floor room, a bathroom outside the room). The site does not promise an en-suite for the Standard room, so nothing in the copy contradicts her negative half.

## Fact audit (whole file, one row per sentence)

### Top-level fields

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | Sea You Surfers Nest | `business.name.value` (Google) | sourced |
| 2 | `businessType` | beach_lodging | `businessType`, `businessType_why` | sourced |
| 3 | `tagline` | A bed and breakfast in Midigama, … | `business.google_category` ("Bed & breakfast"); `location.address` (Midigama) | sourced |
| 4 | `tagline` | … on Sri Lanka’s south coast. | `location.lat_lng`, `location.nearby` (R4) | shared-context |
| 5 | `closing` S1a | Live dates are on Booking.com, … | `booking.engine_url`, `booking.path` ("engine") | sourced |
| 6 | `closing` S1b | … and groups can rent the whole house on Airbnb. | `booking.other_engines[1]` ("whole guest house, 14 guests") | sourced |
| 7 | `closing` S2 | If you want to ask Ashly something first, call. | `business.owner`, `contact.phone`, `booking.path.note` (the only direct channel) (R5) | sourced |
| 8 | `featureLine` | null | `business.tagline.gap` | correctly empty |
| 9 | `spot` | “Hello to waves in a minute walk,” says the house’s own listing. | `location.distance_to_beach[0]` (verbatim, author owner, the Booking/Agoda listing name); `contradictions[2]` resolution ("owner's words … no metre figure") followed | sourced |
| 10 | `season` | null | `season.gap` | correctly empty |
| 11 | `openingHours` / `hoursNote` | [] / null | `hours_note.gap` (lodging) | correctly empty |
| 12 | `priceList`, room prices | [] / none | `offers_note`; schema rule "Live prices are not content" | correctly empty |
| 13 | `lessons`, `credentials`, `rentals`, `brands` | [] | `surf.lessons.gap`; `surf.board_rental` (one guest, confidence low) | correctly empty |
| 14 | `languagesSpoken` | ["en"] | `languages_spoken[0]` | sourced |

### Copy blocks

| # | Field | Sentence | Dossier key | Verdict |
|---|---|---|---|---|
| 15 | [0] heading | Around the courtyard | img-046 | framing |
| 16 | [0] ¶1 S1 | Sea You is a white two-storey house. | `same_address_neighbour.comparison`; img-003, 076, 077 (upstairs), img-042 (R3) | sourced |
| 17 | [0] ¶1 S2 | Downstairs there’s an inner courtyard, with potted plants and a cushioned bench, and the room doors that open onto it have carved fanlights over them. | img-046 ("inner courtyard: room doors with carved fanlights, green-cushioned bench, plants"); img-006 ("courtyard corner … potted plants"); img-071 | sourced |
| 18 | [0] ¶2 S1 | From the balconies upstairs you look out over the garden to the coconut palms. | `facilities[10]` (terrace / balconies and garden); img-076 ("coconut palms beyond"), img-077 ("garden and palms beyond"), img-003 | sourced |
| 19 | [0] ¶2 S2 | There are tables and chairs out there, and the long one has a settee with green cushions. | img-077 ("long upstairs balcony with a green-cushioned settee, mint tables and chairs"), img-003 | sourced |
| 20 | [1] heading | Ashly | `business.owner.value` | framing |
| 21 | [1] ¶1 S1 | Your host is Ashly. | `business.owner` (Airbnb host "Ashly") | sourced |
| 22 | [1] ¶1 S2 | He’s a Superhost on Airbnb and usually replies there within a few hours. | `business.host_stats` (superhost true, response_time, response_rate 70%); `booking.reply_time_hint`; "he": Marina's quote, Mareike "sein Bruder" (R2) | sourced |
| 23 | [1] ¶2 | “Whether you’re chasing the perfect wave, soaking up the beach vibes, or just looking to unwind,” he writes, “our place is your perfect home away from home.” | `business.description.value` sentence 2, verbatim (author owner, Airbnb) | sourced |
| 24 | [2] heading | Seven rooms | `room_count.value` | sourced |
| 25 | [2] ¶1 S1 | All seven rooms are doubles, and between them they sleep fourteen. | `room_count.verbatim` ("can accommodate 14 pax"); `room_types[3]` ("7 bedrooms, 1 double bed each"); `contradictions[6]` resolution | sourced |
| 26 | [2] ¶1 S2 | Only one has air conditioning. | `business.description_rooms_note`; `contradictions[3]` resolution ("one A/C room") | sourced |
| 27 | [2] ¶1 S3 | Airbnb’s rates are for a room without it, so ask when you book if you want the one that has it. | `description_rooms_note.note` and `offers_note` say this of **listing 2 only**; listing 1 says only "Pls inquire for per room rate" (B1) | **contradicted** |
| 28 | [2] ¶2 S1 | The rooms are furnished much alike. | `room_types_note` ("… in every room (photos)") | sourced |
| 29 | [2] ¶2 S2 | The bed is a mint-green four-poster double with a teal velvet throw on it, and there’s a timber towel ladder and a green cabinet with a mirror. | `room_types_note`; img-005, 015, 018, 021, 026 | sourced |
| 30 | [3] heading | Breakfast | `facilities[0]` | framing |
| 31 | [3] S1 | Breakfast here is Asian, with local specialities and warm dishes, and there’s juice and fruit too. | `facilities[0]` (Booking "Asian"; Agoda "local specialities, warm dishes, juice, and fruits"). It does not say breakfast is in the rate, which is correct (`facilities[0].note`). No restaurant (`contradictions[4]`) | sourced |
| 32 | [4] heading | Carved doors and a surfboard shower | img-027 (carved double door), img-046 (carved fanlights), img-036 | framing |
| 33 | [4] ¶1 S1 | The front door is a carved grey double door, and the wooden chair beside it is carved too. | img-027 "entrance", tagged `booking_room_ids` [1492325603] (Standard Double Room) and `airbnb_space` "Bedroom 2". "Front door" is not in the dossier (B2) | **unsourced** |
| 34 | [4] ¶1 S2 | Elsewhere, carved wooden masks hang by a doorway among the ferns. | img-035 ("carved wooden masks hung beside a grey door, ferns and plants") | sourced |
| 35 | [4] ¶2 S1 | Out in the garden there’s a shower built into a wooden surfboard, fixed to the wall under the palms. | img-036 | sourced |
| 36 | [4] ¶2 S2 | It’s for rinsing off after the sea. | the purpose of the sourced outdoor shower; asserts nothing new | framing |
| 37 | [5] heading | Finding the house | — | framing |
| 38 | [5] ¶1 | Booking.com lists the house under Kumbalgama and Airbnb under Matara, but it’s one house, in Midigama. | `location.address_other[0]` (Booking, Kumbalgama); `business.booking_category.note` (Airbnb "Room in Matara"); `location.address` (Google, Midigama); same photo set on all listings (`images_note`) | sourced |
| 39 | [5] ¶2 | Midigama railway station is 950 m away on foot, by Booking.com’s count, and Weligama Beach is 3.4 km. | `location.nearby.value` (Booking: station 950 m walking; Weligama Beach 3.4 km). Agoda's 750 m / 2.5 km not used (N1) | sourced |

### `rooms[]`

| # | Row | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 40 | [0] label/beds/sleeps | Deluxe Double Room · 1 large double bed · 2 | `room_types[0].value` | sourced |
| 41 | [0] note | 13 m², with its own bathroom, a private entrance, a terrace and a balcony. | `room_types[0]` (size_m2 13, bathrooms 1, description); `contradictions[5]` resolution (private bathroom for the Deluxe only). Booking's "air conditioning" correctly left out (`contradictions[3]`) | sourced |
| 42 | [1] label/beds/sleeps | Standard Double Room · 1 large double bed · 2 | `room_types[1].value` | sourced |
| 43 | [1] note | 12 m², with a private entrance and a wardrobe. | `room_types[1].description`. No bathroom is claimed (bathrooms 0; Marina) | sourced |

### `stayInfo`

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 44 | `checkInFrom/To` | null / null | `contradictions[0]` resolution "none" | correctly empty |
| 45 | `checkOutFrom/To` | 06:00 / 10:00 | `stay_info.check_out` (Booking; Agoda agrees; Airbnb gives none) (R1) | sourced |
| 46 | `minNights` | null | `stay_info.min_nights.gap` | correctly empty |
| 47 | note S1 | Children of any age are welcome; there are no cots or extra beds. | `stay_info.children` | sourced |
| 48 | note S2 | Pets on request, and charges may apply. | `stay_info.pets`, `facilities[14]` | sourced |
| 49 | note S3 | No parties or events. | `stay_info.parties` | sourced |

### `amenities[]`

| # | Row | Dossier key | Verdict |
|---|---|---|---|
| 50 | Free WiFi · in public areas | `facilities[4]` (Booking wording; Agoda's "in all rooms" not used) | sourced |
| 51 | Fan and mosquito net | `facilities[9]`; `room_types_note` | sourced |
| 52 | Free toiletries | `facilities[9]` | sourced |
| 53 | Kitchen | `facilities[1]` (Airbnb amenity "Kitchen"; does not claim a private kitchen) | sourced |
| 54 | Free private parking on site | `facilities[5]` | sourced |
| 55 | Airport shuttle · additional charge | `facilities[6]` | sourced |
| 56 | Laundry · additional charge | `facilities[7]` | sourced |
| 57 | Security cameras outside | `facilities[15]` ("exterior security cameras on property") | sourced |

### `ratings[]`, `testimonials[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 58 | `ratings[0]` | Google 4.9/5 · 11 · 2026-11-21 · place link | `reviews.google`; `location.map_url` | sourced |
| 59 | `ratings[1]` | Booking.com 8.0/10 · 8 · 2026-11-21 | `reviews.booking` | sourced |
| 60 | `ratings[2]` | Airbnb 5.0/5 · 10 · 2026-11-21 · listing 1 | `reviews.airbnb_1`. Agoda (Booking's same 8 reviews) and the host rating (same 10 reviews) correctly not added | sourced |
| 61–65 | `testimonials[0–4]` | Niamh, Kenza, Marina (Italy), Molly Jayne, Raul | `reviews.quotes[1, 2, 3, 4, 11]`: text, author, source and date machine-checked identical (R6) | sourced (5) |

### `contact`, `bookingLinks[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 66 | `contact.phone` | +94715880052 | `contact.phone.value` (from the business's own sign, img-001). Must be confirmed by a human before go-live (`gaps[0]`) | sourced |
| 67 | `contact.whatsapp` / `.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap` | correctly empty |
| 68 | `contact.address` | 151 Weliwaththa Rd, Midigama 80650, Sri Lanka | `location.address.value` (Google, exactly as shown; `contradictions[1]` resolution) | sourced |
| 69 | `contact.mapUrl` | Google place link | `location.map_url.value` | sourced |
| 70 | `bookingLinks[0]` | See rooms and live dates on Booking.com | `booking.engine_url` | sourced |
| 71 | `bookingLinks[1]` | Book a room on Airbnb → 1508895627217411616 | `booking.other_engines[0]` (private room) | sourced |
| 72 | `bookingLinks[2]` | Book the whole house on Airbnb → 1793988904511877292 | `booking.other_engines[1]` (whole guest house) | sourced |

## Notes (not failing)

- **N1. Weligama attribution (humanizer).** The draft said "Booking.com puts … station 950 m … and Weligama Beach 3.4 km", so one attribution clearly covered both numbers. The rewrite puts "by Booking.com’s count" after the station clause, so "Weligama Beach is 3.4 km" now reads as less clearly attributed. Agoda says 2.5 km. The figure is sourced, so this is not a failure, but the attribution became weaker during humanizing.
- **N2. Ashly's quote is the most generated-sounding line on the page** ("Whether you’re…", a triad, "perfect" twice, "home away from home"). It is his own text, verbatim and attributed, so it is not our voice and not a failure. Whether to keep it is a call for the copywriter or the owner.
- **N3. "Carved" appears four times in block [4]** (heading, door, chair, masks). That is the point of the block. Taste only.
- **N4. Kenza's quote contains " \n"** (a space and a line break, verbatim). The template must render it as a space or a line break, never as literal characters. This is a designer item.
- **N5. Tagline "bed and breakfast"** is Google's category. Whether breakfast is in the rate is unknown (`facilities[0].note`). That is an owner item, not a copy error.
- **N6. Superhost and the reply time** are live platform stats, captured 2026-11-21. They can change before go-live, so the deployer should re-read them.
- **N7. Duplicates.** "Midigama" appears in `tagline` and block [5] ¶1, carrying different facts (where the house is, and the listings' other place names). Booking.com and whole-house Airbnb appear in `closing` and `bookingLinks[]` (a sentence and its buttons), as in the passed sites. No other fact appears twice.

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing / spot | ✓ | ✓ | ✓ | ✓ | ✓ | plain; the closing gives a real choice |
| Around the courtyard | ✓ | ✓ | ✓ | ✓ fanlights, bench, settee, palms | ✓ | the Downstairs/Upstairs pairing is broken up in the rewrite |
| Ashly | ✓ | only inside the quote | only inside the quote | ✓ | ✓ | N2 |
| Seven rooms | ✓ | the ¶2 object list is description | ✓ | ✓ four-poster, throw, ladder, cabinet | ~ | "if you want the one that has it" is slightly clunky; taste |
| Breakfast | ✓ | ✓ | ✓ | ✓ | ✓ | one sentence of platform text; thin, but there is nothing more to say |
| Carved doors and a surfboard shower | ✓ | ✓ | ✓ | ✓ | ✓ | N3 |
| Finding the house | ✓ | ✓ | ✓ | ✓ | ✓ | N1 |
| rooms / stayInfo / amenities | ✓ | — | ✓ | ✓ | ✓ | |

- **Honest limits:** yes, several. One air-conditioned room in seven, WiFi in public areas only, no cots or extra beds, no parties, extra charges for the shuttle and laundry, and no bathroom claimed for the Standard room.
- **Padding vocabulary:** none in our voice ("nestled", "vibrant", "boasts", "unforgettable", "experience" are absent). The only "perfect" and "home away from home" are inside Ashly's quote.
- **Register:** plain and slightly informal (contractions), which suits a small family house whose owner writes casually.
- **Locale:** English only, in its own cadence.

Voice score: **8 / 8 criteria met; three taste notes; 8.5 / 10.** Voice does not fail this copy.

## Completeness (`beach_lodging`)

Must-haves: ≥ 1 `rooms[]` row ✓ (2, both Booking room types); ≥ 1 `bookingLinks[]` ✓ (3). The ≥ 6 photos requirement is outside the copy (82 business-owned images in the dossier). Core: `businessName` ✓ and one working channel (phone, pending human confirmation) ✓.

Should-haves: `stayInfo` ✓ (check-out and note), `amenities[]` ✓ (8), `ratings[]` ✓ (3), `testimonials[]` ✓ (5), `spot` ✓ (the owner's line; no break named, correctly).

Deliberately empty, each with a stated reason: `featureLine`, `season`, `openingHours` / `hoursNote`, prices, check-in times, `minNights`, `contact.whatsapp` / `.email`, and the teaching and kit modules. No section is padded.

## Owner items (not copy failures)

- What the Airbnb rates cover on **each** listing, and what the whole-house listing's "rates are for Non A/C double room" means (B1).
- Where the carved grey double door is: the house's entrance or a room's (B2).
- **Which room has the A/C**, and whether it is Booking's Deluxe Double; which rooms have their own bathroom.
- **Check-in time** (Booking 14:00–18:00 vs Airbnb after 15:00); whether check-out 06:00–10:00 stands (R1).
- **Phone**: confirm +94715880052 before it becomes a tap-to-call button, and whether it takes WhatsApp.
- **Breakfast**: whether it is in the rate, and whether the platform description is right (N5).
- **Surf**: the break, the season, board storage or rental (the rack is in the photos).

## What must change to pass

1. Row 27 (`copyBlocks[2]` ¶1 S3): limit the Airbnb rate statement to the listing the dossier says it of, or remove it. → copywriter.
2. Row 33 (`copyBlocks[4]` ¶1 S1): stop calling the carved grey double door the house's front door, unless the dossier is amended to say so. → copywriter (or harvester, to establish it).

Round 2 is a full re-check of every sentence (hard constraint 6), not only these two.

Ledger line due (not written by me): `copy_humanised → copy_failed`, note "round 1 FAIL (copyeditor 0.4.2): 72 rows, 55 sourced / 1 shared-context / 6 framing / 8 correctly empty, 1 unsourced, 1 contradicted. Offer ¶1 'Airbnb’s rates are for a room without it' widens listing 2's note to all Airbnb (contradicted, dropped qualifier); carved ¶1 'The front door is…' places img-027, tagged to the Standard Double Room / Airbnb Bedroom 2, as the house's front door (unsourced). Both from the draft, back to copywriter. Draft→final diff clean; 5 testimonials machine-checked verbatim; voice 8.5/10".
