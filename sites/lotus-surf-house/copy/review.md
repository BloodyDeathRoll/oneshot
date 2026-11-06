# copy review — lotus-surf-house · en · round 1

Reviewer: copyeditor 0.4.2. Runtime prompt from `tools/prompt.mjs copyeditor` (941 lines), read in full. Run `2026-10-midigama-01` (test, outbound), state `copy_humanised`, 2026-11-03. Independent of the copywriter (0.5.0) and the humanizer (0.2.1).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/lotus-surf-house/dossier.json` (harvester 0.5.0, last changed at `8844884`, before the copy commit `d3eb4c2`). I read the dossier's own values and notes, not `sources.md`'s summary of them. `audit.json` is not a source (hard constraint 2); `sources.md` uses it only for the CTA choice, the F4 framing and the closing intent, and each of those lines is re-traced below to a dossier key. No `industry.md` exists (outbound run), so there is no research check.

## Verdict: **PASS** (round 1 of 2)

78 rows: 66 `sourced`, 1 `shared-context`, 5 `framing`, 6 correctly empty, **0 `unsourced`, 0 `contradicted`**. Voice audit clean, notes only. The `beach_lodging` must-haves are covered. Four rulings and six notes follow; none fails the copy.

## Scope check

- **Draft vs final.** `diff en.draft.json en.json` (normalised): `humanizer_version` added; `closing` S2 and one paragraph in each of the six copy blocks reworded. Nothing else changed: headings, `tagline`, `spot`, `rooms[]`, `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `contact`, `bookingLinks[]` are identical. Every changed sentence re-checked:
  - `closing` S2: same channel (phone), no number, no new promise.
  - intro ¶1: same four facts (shady garden, Indhana Road, hammock under trees, ping-pong under a thatched roof). Nothing added.
  - Yelum: "As he once wrote to a guest" is new wording. It is true: the quote is from his signed reply to Nadia (`reviews.quotes[60].owner_reply`). The quote itself is unchanged and verbatim.
  - Breakfast: "any time from 8 to 10 in the morning" = `stay_info.breakfast_hours` "8 a.m. to 10 a.m." No widening.
  - offer ¶1: the owner's sentence split at his own comma; every word checked verbatim against `quotes[60].owner_reply`.
  - roof: "the trees behind it" = img-004 "green canopy of trees behind". "As well" asserts nothing.
  - info ¶2: same three distances, still attributed to Booking.com; "Further out" is true (all three are > the 250 m beach and 50 m station).
  - **Nothing appeared during humanizing.**
- **Testimonials:** all 12 machine-checked against `reviews.quotes[74, 47, 82, 37, 78, 43, 46, 75, 48, 22, 14, 12].text`: text byte-identical, author, `source: booking` and YYYY-MM date identical. Longest 492 chars (limit 600). Excluded quotes are excluded for stated reasons (over 600 chars, non-English, pitch-only cancellation complaints).
- **Lengths:** all within schema. `tagline` 58 (sources.md says 59; trivial), `closing` 87, `spot` 53, `stayInfo.note` 130; headings 5–17; bodies 80–264; `rooms[].note` ≤ 127; `rooms[].label` ≤ 45.
- **`sources.md` indexes** (`quotes[n]`, `facilities[n]`, `room_types[n]`, `room_units[n]`) spot-checked against the dossier: all point at the right entries.

## Rulings

**R1. "their balconies" (offer ¶2) is `sourced`, with an owner item.** Booking's room-type label is "King Room with Balcony" for all three units, and the dossier's own `location.views.value` says "balcony views into the trees from the upstairs King rooms" (photos img-016, img-025). Unit 559076610's facility list omits "Balcony". That is a gap in one unit's data, not a contradiction the harvester flagged; `sources.md` already carries it to the owner. Not `contradicted`.

**R2. "Breakfast is included" is `sourced`.** `facilities[0].value` = "breakfast included" (Adele, verbatim: "A delicious breakfast is included"; Google offers "Free breakfast" on the Booking and Agoda rates). Booking's own description says only "Guests … can enjoy a continental breakfast". Whether every rate includes it is unconfirmed; carried as an owner item, as `sources.md` does.

**R3. "Old rooms and new" (heading) is a comparative, and it is `sourced`.** The new half is `business.recent_works` (upstairs King Rooms built 2024–2025, owner: "our new deluxe rooms"); the old half is the owner's own "The standard rooms may not be the newest" and the ground-floor photos dated 2021. "Old" is a notch blunter than the owner's phrasing — a voice note (V2), not a fact error.

**R4. Tagline "on the south coast of Sri Lanka" is `shared-context`.** It is about the place, not the business, and the dossier pins it: `location.lat_lng` 5.965 N, 80.392 E (the southern shore), Facebook intro "Midigama ahangama, Matara", `location.nearby` (Ahangama, Weligama, Koggala). Not `unsourced`.

## Fact audit (whole file, one row per sentence)

### Top-level fields

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | Lotus Surf House | `business.name.value`; `contradictions[6]` resolution | sourced |
| 2 | `businessType` | beach_lodging | `business.type.value`, `businessType_note` | sourced |
| 3 | `tagline` | A guesthouse in Midigama, … | "guesthouse": `business.type.note` (old Google category "Guest house"), `business.former_names` ("Yelum Guest House"); Midigama: `location.address` | sourced |
| 4 | `tagline` | … on the south coast of Sri Lanka. | `location.lat_lng`, `location.address_other_platforms[2]` (Matara), `location.nearby` (R4) | shared-context |
| 5 | `closing` S1 | Live dates and prices are on Booking.com. | `booking.engine_url`, `booking.path` ("rooms are sold on Booking.com (live)"), `offers_note` | sourced |
| 6 | `closing` S2 | If you'd rather ask us something first, call. | `booking.direct_channels` (phone only), `contact.phone` | sourced |
| 7 | `featureLine` | null | `business.tagline.gap` (owner wrote no line) | correctly empty |
| 8 | `spot` | Booking.com puts Midigama Beach 250 m from the house. | `location.distance_to_beach.value`; `contradictions[3]` resolution ("250 m with the source") — followed exactly, attributed | sourced |
| 9 | `season` | null | `season.gap` | correctly empty |
| 10 | `openingHours` / `hoursNote` | [] / null | `hours_note` (lodging; check-in in `stayInfo`) | correctly empty |
| 11 | `priceList`, `rooms[]` prices | [] / none | `offers_note`; schema rule "Live prices are not content" | correctly empty |
| 12 | `lessons`, `credentials`, `rentals`, `brands` | [] | `business.type.note`, `facilities_note` (no lessons, rentals or shop) | correctly empty |
| 13 | `languagesSpoken` | ["en"] | `languages_spoken[0]` (Booking `spokenLanguages: [en]`) | sourced |

### Copy blocks

| # | Field | Sentence | Dossier key | Verdict |
|---|---|---|---|---|
| 14 | [0] heading | In the garden | `facilities[1]` | framing |
| 15 | [0] ¶1 S1 | The house is in a shady garden on Indhana Road. | `facilities[1]` (Booking "Garden"); img-020 "shady garden"; `location.address` (Indhana Rd) | sourced |
| 16 | [0] ¶1 S2 | There's a hammock under the trees, and the ping-pong table has a thatched roof over it. | `facilities[1]` ("hammock, ping-pong table"); img-020 "hammock under the trees"; img-005 "ping-pong table under a thatched pavilion" | sourced |
| 17 | [0] ¶2 | Every room downstairs opens onto the garden through its own terrace, with chairs outside and a table to eat at. | `room_units[0–4].facilities`: all five ground-floor units list "Terrace", "Outdoor furniture", "Outdoor dining area", "Garden view", "Entire unit located on ground floor" (checked unit by unit; "every" holds); img-032, img-009 | sourced |
| 18 | [1] heading | Yelum | `business.owner.value` | framing |
| 19 | [1] S1 | Yelum owns the house. | `business.owner` (signs the property's replies; 30+ guests name him owner/host) | sourced |
| 20 | [1] S2 | As he once wrote to a guest, "I strive every day to make my customers' holidays as wonderful as possible." | `reviews.quotes[60].owner_reply` — verbatim, a reply to a guest | sourced |
| 21 | [2] heading | Breakfast | `facilities[0]` | framing |
| 22 | [2] S1 | Breakfast is included, and you can have it any time from 8 to 10 in the morning. | `facilities[0].value` (R2); `stay_info.breakfast_hours` | sourced |
| 23 | [3] heading | Old rooms and new | `business.recent_works`; `quotes[60].owner_reply` (R3) | sourced |
| 24 | [3] ¶1 S1 | The garden rooms are downstairs. | `room_units[0–4]` ("Garden view", "Entire unit located on ground floor") | sourced |
| 25 | [3] ¶1 S2 | "The standard rooms may not be the newest," Yelum says, "but they are popular with many vacationers due to their charm." | `reviews.quotes[60].owner_reply`, verbatim (split at his comma) | sourced |
| 26 | [3] ¶2 | The King Rooms upstairs are new, and their balconies look out into the trees. | new + upstairs: `business.recent_works`, owner reply `quotes[7]` ("1st floor"); balconies into trees: `location.views.value`, img-016, img-025 (R1) | sourced |
| 27 | [4] heading | Up on the roof | `facilities[2]` | framing |
| 28 | [4] S1 | There's a roof terrace as well, with a wooden table and chairs and the trees behind it. | `facilities[2]` (Booking "Sun terrace", "Terrace"; Svenja "rooftop terrace" — a guest's physical observation); img-004 "roof terrace dining table with wooden chairs, green canopy of trees behind" | sourced |
| 29 | [4] S2 | In one corner a Buddha sits on a pedestal, with offerings of flowers and fruit. | img-021 "roof terrace corner with a Buddha statue on a pedestal"; img-022 "offerings of flowers and fruit" | sourced |
| 30 | [5] heading | Getting here | — | framing |
| 31 | [5] ¶1 | Midigama railway station is 50 m from the house, so you can come by train. | `location.distance_to_station.value` (Booking "Railway access — 50 m walking from Midigama station") | sourced |
| 32 | [5] ¶2 | Further out, Booking.com lists Ahangama Beach at 1.4 km, Weligama Beach at 4.2 km and Koggala Airport at 9 km. | `location.nearby.value` (1.4 km, 4.2 km, 9 km), attributed; Koggala 10 km in Booking's description not used (one figure, attributed) | sourced |
| 33 | [5] ¶3 | On Google you may also find the house under its old name, Yelum Guest House. | `business.former_names`, `reviews.google_old_listing` (live second Google listing) | sourced |

### `rooms[]`

| # | Row | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 34 | [0] label/beds/sleeps | Standard Double or Twin Room with Garden View · 2 single beds · 2 | `room_types[0].value` | sourced |
| 35 | [0] note S1 | Ground floor, 20–25 m², garden view. | `room_types[0].size_m2` [20, 25]; `room_units[0,3]` | sourced |
| 36 | [0] note S2 | Fan and mosquito net; no air conditioning and no hot water. | `room_units[0,3].facilities` (Fan, Mosquito net; no A/C), `room_types[0].air_conditioning: false`; no hot water: owner reply `quotes[7]` ("…without air condition and hot water room. we have 1st floor that's rooms only have"), `critical_themes[0]` | sourced |
| 37 | [1] label/beds/sleeps | Double or Twin Room with Garden View · 2 single beds · 2 | `room_types[2].value` | sourced |
| 38 | [1] note S1 | Ground floor, 25 m², garden view. | `room_units[4]` | sourced |
| 39 | [1] note S2 | Fan and mosquito net; no air conditioning and no hot water. | as row 36 (`room_units[4]`) | sourced |
| 40 | [2] label/beds/sleeps | Deluxe Queen Room · 1 large double bed · 2 | `room_types[1].value` | sourced |
| 41 | [2] note S1 | Ground floor, 25 m², garden view, tiled floor and a walk-in shower. | `room_types[1].description`, `room_units[1,2]` ("Tile/marble floor", "Entire unit located on ground floor") | sourced |
| 42 | [2] note S2 | Fan and mosquito net; no air conditioning and no hot water. | `room_units[1,2]`; owner reply `quotes[7]` (that guest stayed in a Deluxe Queen) | sourced |
| 43 | [3] label/beds/sleeps | King Room with Balcony · 1 extra-large double bed · 2 | `room_types[3].value` | sourced |
| 44 | [3] note S1 | Upstairs, 25 m². | `room_types[3].size_m2`; upstairs as row 26 | sourced |
| 45 | [3] note S2 | Air conditioning, fan, mosquito net and hot water. | `room_units[5–7].facilities` (all three: A/C, Fan, Mosquito net); hot water: owner reply `quotes[7]`. "Private hot tub" correctly left out (`contradictions[4]`) | sourced |

### `stayInfo`

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 46 | `checkOutFrom/To` | 11:00 / 12:00 | `stay_info.check_out`; `contradictions[1]` resolution (Booking, not Kayak) | sourced |
| 47 | `checkInFrom/To` | null / null | "Available 24 hours" has no HH:MM form; stated in the note | correctly empty |
| 48 | note S1 | Check-in at any hour, day or night. | `stay_info.check_in` ("Available 24 hours") | sourced |
| 49 | note S2 | Cash only. | `stay_info.house_rules[4]` | sourced |
| 50 | note S3 | Children welcome; no cots or extra beds. | `stay_info.house_rules[0,1]` | sourced |
| 51 | note S4 | Pets on request, at no charge. | `stay_info.house_rules[3]`, `facilities[16]` | sourced |
| 52 | note S5 | No parking. | `stay_info.parking` | sourced |

### `amenities[]`

| # | Row | Dossier key | Verdict |
|---|---|---|---|
| 53 | Private bathroom in every room | `facilities[18]` | sourced |
| 54 | Free WiFi · in all areas | `facilities[7]` | sourced |
| 55 | Outdoor shower | `facilities[5]` (owner reply `quotes[37]`) | sourced |
| 56 | Shared kitchen | `facilities[3]` | sourced |
| 57 | Shared lounge with TV | `facilities[4]` | sourced |
| 58 | Room service | `facilities[13]` | sourced |
| 59 | Airport shuttle · additional charge | `facilities[9]` (Booking, paid) | sourced |
| 60 | Bicycle rental · additional charge | `facilities[8].note` ("Booking lists 'Bicycle rental' (paid)"); scooter hire correctly not a row | sourced |
| 61 | Walking tours · additional charge | `facilities[10].note` ("Booking lists 'Walking tours' (paid)") | sourced |
| 62 | Laundry · additional charge | `facilities[11]` (paid) | sourced |
| 63 | Luggage storage | `facilities[12]` (free) | sourced |
| 64 | CCTV outside and in common areas | `facilities[17]` | sourced |

### `ratings[]`, `testimonials[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 65 | `ratings[0]` | Booking.com 9.0/10 · 125 · 2026-11-03 | `reviews.booking` (rating, count, fetched_at) | sourced |
| 66 | `ratings[1]` | Google 4.9/5 · 78 · 2026-11-03 · place-id URL | `reviews.google`; `location.map_url` | sourced |
| 67–78 | `testimonials[0–11]` | Fiona, Benjamin, Svenja, Giada, Henry, Dimitrios, Talia, Nicole, Holtmann, Colin, ジョナ, Katsiaryna | `reviews.quotes[74, 47, 82, 37, 78, 43, 46, 75, 48, 22, 14, 12]` — text, author, source, date machine-checked identical | sourced (12) |

### `contact`, `bookingLinks[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| — | `contact.phone` | +94774647541 | `contact.phone.value` (verified, both Google listings); `contradictions[0]` resolution | sourced (counted in row 6) |
| — | `contact.whatsapp` / `.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap` | correctly empty (counted with row 12) |
| — | `contact.address` | Indhana Rd, Midigama 80650, Sri Lanka | `location.address_site_form` — Google's listing words with the coordinate prefix removed, order and postcode per playbook §6 | sourced |
| — | `contact.mapUrl` | Google place-id link | `location.map_url` | sourced |
| — | `bookingLinks[0]` | Check dates on Booking.com → listing | `booking.engine_url` | sourced |

(The four contact/booking rows are counted with their sibling rows above; the totals in the verdict count rows 1–78.)

### Notes (not failing)

- **N1. Duplicate-ish facts across blocks.** "Downstairs rooms by the garden" is said in intro ¶2 ("Every room downstairs opens onto the garden"), offer ¶1 ("The garden rooms are downstairs") and each ground-floor `rooms[].note` ("Ground floor … garden view"); "upstairs" for the King Rooms is in offer ¶2 and `rooms[3].note`. The room notes are per-row data meant for side-by-side comparison (the copywriter's flagged judgement call), and the block sentences carry different main facts (terraces; the owner's quote; new + balconies). Not a failure; the designer should not set the intro and offer blocks back to back.
- **N2. `contact.address`** drops Google's coordinate prefix. That is a deletion, not a rewording; the harvester flagged it, and it is the playbook §6 form. Accepted.
- **N3. Testimonial `lang`.** Colin and ジョナ are `xu` in the dossier and `en` in the copy. Both texts are English; `en` is correct for the page.
- **N4. Giada's quote contains `\r\n`** line breaks, verbatim. The template must render them as spaces or line breaks, never as literal characters (designer item, not copy).
- **N5. "As he once wrote to a guest"** quotes a sentence from his reply to a 2/10 complaint. The words are his and verbatim, and the context is not misrepresented (nothing from the review is used). Owner should be comfortable seeing it on his site; flagged for the pitch, not a failure.
- **N6. `sources.md` drift.** The intro ¶1 short-copy column still paraphrases the draft ("the house stands…") although the facts are the same; the tagline length is 58, not 59. Cosmetic.

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing | ✓ | ✓ | ✓ | ✓ | ✓ | plain; the closing gives the reader a real choice |
| In the garden | ✓ (short S1, longer S2) | ✓ (the parallel pair was broken in the rewrite) | ✓ | ✓ hammock, thatch, terrace, table | ✓ | |
| Yelum | ✓ | ✓ | ✓ | ✓ | ~ | V1 |
| Breakfast | ✓ | ✓ | ✓ | ✓ | ✓ | one sentence; thin, but nothing more is the business's to say |
| Old rooms and new | ✓ | ✓ | ✓ | ✓ | ✓ | V2 |
| Up on the roof | ✓ | ✓ | ✓ | ✓ Buddha, offerings | ✓ | |
| Getting here | ✓ | the three distances are data, attributed | ✓ | ✓ | ✓ | |
| rooms / stayInfo / amenities | ✓ (deliberate repetition for comparison) | — | ✓ | ✓ | ✓ | |

- **V1.** "Yelum owns the house. As he once wrote to a guest, '…'" — fine aloud, but the motto is the page's only line in his voice about himself, and its source is a complaint reply (N5). Taste, not a fail.
- **V2.** "Old rooms and new" is blunter than the owner's "may not be the newest", and the Deluxe Queen is a ground-floor room called "Deluxe". Honest and short; the humanizer flagged it too. Taste, not a fail.
- **Honest limit:** yes, several, in the business's own or Booking's words: older standard rooms, no A/C and no hot water downstairs, cash only, no parking, no cots.
- **Padding vocabulary:** none ("nestled", "vibrant", "boasts", "unforgettable", "whether you're…" absent).
- **Register:** plain, slightly formal where the owner is quoted; matches a family guesthouse with no prose of its own.
- **Locale:** English only, in its own cadence.

Voice score: **8 / 8 criteria met; two taste notes; 9 / 10.**

## Completeness (`beach_lodging`)

Must-haves: ≥ 1 `rooms[]` row ✓ (4, every Booking room type); ≥ 1 `bookingLinks[]` ✓; ≥ 6 photos is outside the copy (44 business-owned images in the dossier). Core: `businessName` ✓, one working channel (phone) ✓.

Should-haves: `stayInfo` ✓, `amenities[]` ✓ (12), `ratings[]` ✓ (2), `testimonials[]` ✓ (12), `spot` ✓ (distance only — no break named, correctly).

Deliberately empty, each with a stated reason: `season`, `featureLine`, `openingHours` / `hoursNote`, prices, `contact.whatsapp` / `.email`, check-in times, teaching and kit modules. No section is padded; about 210 words of body copy for a business with no prose of its own, and the guests carry the warmth. Overlaps: N1.

## Owner items (not copy failures)

- Whether **breakfast is included on every rate** (R2).
- The **balcony on King unit 559076610**, and the Booking "Private hot tub" listing (not on the site).
- The **break(s)** in front of the house, who they suit, and the **season**.
- **Prices**, **WhatsApp**, **email**.
- **Check-in**: 24 h on Booking against one guest's afternoon-only experience (Felix, `quotes[24]`).
- **Room count** (8 units vs the owner's "3 type room").
- Whether he is happy with the **quote from the Nadia reply** on his own page (N5), and with the heading "Old rooms and new" (V2).
- Whether to name **the family** (wife, mother, father) in the business's voice; today only guests do.

## Verdict: **PASS** (round 1, full-file check)

0 `unsourced`, 0 `contradicted`, voice clean (9/10), required fields covered. Closest calls for the human: R1 (balconies on all three King units) and R2 (breakfast included on every rate) — both sourced, both owner items.

Ledger line due (not written by me): `copy_humanised → copy_passed`, note "round 1 PASS (copyeditor 0.4.2): 78 rows, 66 sourced / 1 shared-context / 5 framing / 6 correctly empty, 0 unsourced, 0 contradicted; draft→final diff clean (7 rewordings, no fact added or lost; 12 testimonials machine-checked verbatim); voice 9/10; owner items: breakfast on every rate, King-unit balcony, break/season, prices, WhatsApp".
