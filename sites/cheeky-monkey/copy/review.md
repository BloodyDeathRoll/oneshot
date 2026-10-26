# copy review — cheeky-monkey · en · round 1

Reviewer: copyeditor 0.4.2. The runtime prompt came from `tools/prompt.mjs copyeditor`, and all 940 lines were read. Run `2026-10-midigama-01` (test, outbound), state `copy_humanised`, 2026-10-26. I am independent of the copywriter (0.4.0) and the humanizer (0.2.0).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/cheeky-monkey/dossier.json`. I re-read the dossier's words and did not take them from `sources.md`. `audit.json` is not a source (hard constraint 2). `sources.md` uses it only for the closing intent and the CTA label, and both are re-traced below to `booking.engine_url` and `contact.phone`. No `industry.md` exists, so there is no research check.

## Verdict: **PASS** (round 1 of 2)

97 rows: 89 `sourced`, 5 `framing`, 3 correctly empty, **0 `unsourced`, 0 `contradicted`**. The voice audit is clean, with notes only. The required `surf_camp` fields are covered. Five rulings and seven notes follow; none of them fails the copy.

## Scope check

- **Draft vs final.** `en.draft.json` is byte-identical to `en.json` at the copywriter's commit `3e402cf`. Commit `c877c9a` touched only `en.json`, `en.draft.json`, `sources.md` and `humanizer-notes.md`. The dossier was last changed at `0efba49`, before the copy was written.
- **What changed in `en.json`:** `humanizer_version` was added, 14 prose sentences changed in 7 of the 8 copy blocks, and `priceList[12]` (the 2021 "ADD A/C" USD 50/week row) was removed. I checked every changed sentence against the draft and the dossier:
  - intro ¶2: still rent, buy and repair.
  - about ¶2: still founder only and "Baba" only.
  - shop ¶3: the same four items, with "of course, wax" from `business.description_shop`.
  - lessons ¶1: still the same three-item list and two levels.
  - lessons ¶2 S2: still "call to check" plus "lessons running".
  - packages ¶2: "halves that" is correct arithmetic against `packages[0]` (2 a day) and `[1]` (1 a day).
  - packages ¶3–¶6: same inclusions, and the rental package still gets neither the lesson board nor the transport. "if you fancy one" keeps the tuk-tuk lesson optional, as "if someone liked" does.
  - getting here: the same five distances. Merging the sentences now attributes all of them to Booking.com, which is an improvement.
  - good to know: same facts.
  - **Nothing appeared during humanizing.**
- **The A/C removal is the only structural change.** No `priceList` row, label, price, unit or note moved: draft rows 0–11 and 13–15 are identical to final rows 0–11 and 12–14. No prose mentioned the add-on.
- **`sources.md`:** the diff `3e402cf..c877c9a` deletes the `[12]` A/C line and renumbers the airport row from `[13–15]` to `[12–14]`, and changes nothing else. The owner-item bullets that mention the A/C add-on stay, correctly, as questions for the owner.
- **Testimonials:** all 11 were machine-checked against `reviews.quotes[12, 11, 2, 3, 4, 5, 6, 8, 9, 7, 10].text`. Text, author, source and YYYY-MM date are identical.
  - Tomas (`[0]`, names "Chulanga", `contradictions[0]`) is correctly excluded.
  - Sofie (`[1]`, 838 characters, over the 600 limit) is correctly excluded.
  - The longest quote used is 418 characters.
- **Lengths:** all within the schema.
  - `tagline` 83, `closing` 87, `featureLine` 38 (limit 140).
  - `spot` 77, `season` 93, `stayInfo.note` 133 (limit 200).
  - Headings 12–24 (limit 120). Bodies 107–955 (limit 1500).
  - `priceList[].label` ≤ 69 (limit 80). Notes ≤ 45 (limit 140). `rooms[].note` ≤ 89 (limit 140).
- **Prices:** all 15 `priceList` rows equal `offers[0–11]` and `[15–17]` in price, currency and unit. `payhere_links` agree for the package rows.

## Rulings

**R1. The surf school (`contradictions[1]`, unresolved) is held open, not resolved.**

The values in `contradictions[1]` are:
- the owner sells lessons, packages and SUP (2025 home page);
- guests in Dec 2025 report "surf school would be open but they weren't" and "It is actually not a surfcamp";
- Facebook says "surf lessons available" (in Arugam Bay).

I applied the test from the Global Surf review: would the sentence be false under the other side?

- The tagline ("…rooms and lessons…"), the intro ("a surf and yoga camp", which is the owner's tagline and Booking.com's property name), lessons ¶1 and the `lessons[]` rows describe **what the business offers**. They don't say lessons run on any given date. On the guests' side the business still offers lessons (Facebook: "surf lessons available"), so these sentences are not false there.
- The open question is whether lessons run *when you come*. Two lines state it as a question: lessons ¶2 ("Call before you come … to make sure lessons are running while you're here") and the closing ("For lessons and surf weeks, call us first").
- No sentence says "daily" or "now", and none names an instructor. `credentials[]` is empty, as the note on `credentials[0]` requires.

Verdict: `sourced`. This is the closest call in the file, and it is flagged for the human below.

**R2. Status (`status_flag`, `contradictions[2]`, `facebook_hours`): nothing is claimed.**

No sentence says the place is open, closed, seasonal, renovated or in Arugam Bay. `openingHours[]` is empty and `hoursNote` is null. The present tense ("There are 400 boards for rent", "The team can book you a taxi") describes the offer, not the opening status.

**R3. Facts from the 2021 orphan pages are `sourced`. They are dated where they are prices and undated where they are not.**

Each of these is a dossier entry with a `source_url`:
- the shaper "can fix it fast" (`rentals[2]`; Instagram's current bio adds "Board Repair");
- sunrise and sunset yoga on the roof (`facilities[5].note`);
- the private lesson (`lessons[3]`);
- the package inclusions (`packages[0–3]`).

Every price from those pages is dated "published in 2021": lessons ¶2, packages ¶6 and every `priceList[].note`. The one 2021 claim the dossier forbids repeating, ISA certification (`credentials[0].note`), is absent. The non-price items are carried as owner items, not as findings.

**R4. Baba's biography is consistent with the resolution of `contradictions[0]`.**

The press release (`business.owner`, `business.since.note`) names its subject "'Baba' Pasindu" and is the source for "taught himself to surf at the age of 12" and "worked as a surf instructor". The owner's site says "founded by Baba". The copy uses only "Baba", and only as the founder. "Pasindu", "Delgodage", "Dodangoda" and "Chulanga" appear nowhere. "Like most kids in the area" is a frequency claim, and it has its own source: the press release says it verbatim.

**R5. The rooftop bar (`amenities[5]`) is `sourced`.**

Booking.com lists the bar with its pool table (`facilities[3]`). The guest reports of a closed bar are in `critical_themes` and in the note on `facilities[4]`, not in a `contradictions[]` entry, and the amenity claims no opening times. The restaurant, which does have a flagged contradiction (`[6]`), is correctly left out. Owner item.

## Fact audit (whole file, one row per sentence)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Cheeky Monkey Surf Camp" | `business.name.value` (Booking.com property name) | sourced |
| 2 | `businessType` | `surf_camp` | `businessType`; `business.type.value`; `business.businessType_note` | sourced |
| 3 | `tagline` | "Surf shop, rooms and lessons on the main road in Midigama, with 400 boards to rent." | `facilities[0]`; `room_types[]`; `lessons[0–5]`; `location.address.value` "Galle - Matara Main Road … Midigama"; `rentals[0].value.raw` "one of our 400 boards for rent" (R1) | sourced |
| 4 | `closing` S1 | "See the rooms and live dates on Booking.com." | `booking.engine_url.value`; `booking.path.note` (Booking.com live) | sourced |
| 5 | `closing` S2 | "For lessons and surf weeks, call us first." | `contact.phone.value`; `packages[]` (7 nights). A request to the reader that holds R1 open | framing |
| 6 | `featureLine` | "Come as a stranger, leave as a friend." | `business.description_about.value`, the owner's words verbatim | sourced |
| 7 | `spot` | "Close to the main point breaks, with many more surf breaks a short walk away." | `location.spot.value` "close to the main point breaks"; `.note`, Booking host "many surfbreaks in a short walking distance". No break is named and no level fit is given (`gaps[]` location.spot) | sourced |
| 8 | `season` S1 | "The best time is from October till March or April." | `season.value` (owner, Booking Q&A 2019) "October till March/April" | sourced |
| 9 | `season` S2 | "The waves are nice and the beach is clean." | `season.value`, verbatim | sourced |
| 10 | intro heading | "Catch waves, not worries" | `business.tagline_alt.value`, verbatim | sourced |
| 11 | intro ¶1 | "Cheeky Monkey is a surf and yoga camp on the main road through Midigama, close to the main point breaks." | `business.tagline.value` "Your Surf and Yoga Camp in Midigama"; `location.address.value`; `location.spot.value` (R1) | sourced |
| 12 | intro ¶2 S1 | "Right alongside the guesthouse is Baba's Surf Shop." | `business.description_about.value` "our Baba's Surf Shop sits right alongside the guesthouse" | sourced |
| 13 | intro ¶2 S2 | "Rent a board there or buy one, and bring yours in if it needs a repair." | rent: `rentals[0]`; buy: `rentals[1].value.label` "(sale and rent)", `contact.facebook_profile.value.intro` "boards for rent & sale"; repair: `rentals[2]`, `contact.instagram_profile.value.bio` "Board Repair" | sourced |
| 14 | about heading | "Three rooms in 2009" | `business.since.note` "In late 2009 … just 3 rooms" | sourced |
| 15 | about ¶1 S1 | "Cheeky Monkey opened in late 2009 as a small guesthouse with three rooms, a tiny surf shop and a restaurant." | `business.since.value` / `.note` (press release, verbatim sense) | sourced |
| 16 | about ¶1 S2 | "By 2021 it had ten rooms." | `room_count.value` "10 rooms", `.note` "now a 10 roomed accommodation" (2021) | sourced |
| 17 | about ¶2 S1 | "Baba founded it." | `business.run_by.value` "founded by Baba" (R4) | sourced |
| 18 | about ¶2 S2 | "Like most kids in the area, he taught himself to surf at twelve." | `business.owner.note` "Like most kids in the area, Pasindu taught himself to surf at the age of 12" (R4) | sourced |
| 19 | about ¶2 S3 | "He worked as a surf instructor too, and the shop carries his name." | `business.owner.note` "he worked as a surf instructor"; `business.description_about.value` "Named after Baba, our Baba's Surf Shop" | sourced |
| 20 | shop heading | "Baba's Surf Shop" | `business.name.note` (signage); `business.description_about.value` | sourced |
| 21 | shop ¶1 | "There are 400 boards for rent, in different sizes, tails and colours." | `rentals[0].value.raw` "400 boards for rent … different sizes, Surfboard tails, and colors" | sourced |
| 22 | shop ¶2 | "If your own board gets damaged, the shaper here can fix it fast." | `rentals[2].value.raw` "our shaper in Cheeky Monkey can fix it fast" (R3) | sourced |
| 23 | shop ¶3 S1 | "On the shelves there's beachwear, straps, bags and, of course, wax." | `business.description_shop.value` "beachwear … straps, bags, and, of course, wax" | sourced |
| 24 | shop ¶3 S2 | "It's a shop run by surfers, for surfers." | `business.description_shop.value` "created and run by surfers, for surfers" | sourced |
| 25 | lessons heading | "Lessons for your level" | `levels[0–2]`; `business.description.value` "tailored to your skill level" | sourced |
| 26 | lessons ¶1 S1 | "Lessons are fitted to your level and your pace, and to your style." | `business.description.value` "tailored to your skill level, your pace, and your style" (R1) | sourced |
| 27 | lessons ¶1 S2 | "That goes for a total beginner and for someone chasing their next big ride." | `business.description.value`; `levels[0]`, `[2]` | sourced |
| 28 | lessons ¶2 S1 | "The lesson price on this page was published in 2021." | `lessons[0].note` (orphan page, modified 2021-01-05) | sourced |
| 29 | lessons ¶2 S2 | "Call before you come, to check it and to make sure lessons are running while you're here." | `contact.phone.value`. A request, and the honest limit that holds `contradictions[1]` open | framing |
| 30 | packages heading | "A week of surf" | `packages[0–3]` "7 Night Accommodation" | sourced |
| 31 | packages ¶1 | "The Full Surf Lesson Package is two surf lessons a day for six days, with one rest day." | `packages[0].value.includes[0]` "2 Surf lesson per day 6 days (1 Rest Day)" | sourced |
| 32 | packages ¶2 | "The Moderate package halves that, to one surf lesson a day for six days (or one guided session at a surf spot instead)." | `packages[1].value.includes[0]` "1 Surf lesson Or 1 Surf spot guiding per day 6 days". The comparative "halves" is checked: 2 → 1 a day | sourced |
| 33 | packages ¶3 | "Yoga and Surf gives you one of each a day for six days, a yoga lesson and a surf lesson." | `packages[2].value.includes[0]` "1 Yoga Lesson 1 Surf lesson per day 6 days" | sourced |
| 34 | packages ¶4 | "And the Surf Board Rental package gets you any board for seven days, plus a tuk-tuk driving lesson if you fancy one." | `packages[3].value.includes[0]` "7 Days any Surf Board Rent", `[8]` "Free Tuk Tuk Driving lesson (if someone liked)" | sourced |
| 35 | packages ¶5 S1 | "All four come with seven nights, seven breakfasts, five dinners, two or three yoga classes, a party night, the weekly BBQ night and free use of the gym." | every item is in all four `packages[0–3].value.includes` (checked one by one) | sourced |
| 36 | packages ¶5 S2 | "With the three lesson packages, your board for the lessons and the ride to the surf spot are included too." | `packages[0–2].value.includes` "Free use of surf board during surf lesson", "Free Transport for Surfing Spot". Neither is in `[3]`, and neither is claimed for it | sourced |
| 37 | packages ¶5 S3 | "There's one lake tour in the week as well, at USD 5 extra." | all four `includes` "1 Lake Tour (additional Charge US$ 5)"; `offers[25]` | sourced |
| 38 | packages ¶6 S1 | "You pay per person for the week, and the price depends on whether you take a private room, a shared double or a shared triple." | `offers[0–11].label` "PRIVATE ROOM / DOUBLE ROOM SHARED / TRIPPLE ROOM SHARED (1 Person)", unit "per week" | sourced |
| 39 | packages ¶6 S2 | "These packages and prices were published in 2021, so call to confirm them before you book." | `packages[].note`, `offers_note` (modified 2021-02-12) | sourced |
| 40 | roof heading | "Up on the roof" | `facilities[3]`, `[5]` (rooftop) | framing |
| 41 | roof ¶1 S1 | "The house looks out on a 180° sea view." | `location.views.value` "a fantastic 180° sea view" | sourced |
| 42 | roof ¶1 S2 | "One guest wrote that \"the ocean view is amazing from the rooftop\"." | `reviews.quotes[8].text` (Mihrican, Booking, 2025-12), verbatim fragment (N1) | sourced |
| 43 | roof ¶2 | "Yoga happens up there too, at sunrise and at sunset, facing the ocean." | `facilities[5].note` "sunrise and sunset yoga on our roof top, facing the ocean!"; yoga is current per `business.description_about` (R3) | sourced |
| 44 | getting-here heading | "Getting here" | — | framing |
| 45 | getting here S1 | "Cheeky Monkey is on the Galle–Matara main road." | `location.address.value` | sourced |
| 46 | getting here S2 | "Booking.com puts Midigama Beach 350 m away and Midigama train station 800 m, then Ahangama Beach at 2 km, Weligama Beach at 3.3 km and Koggala Airport at 10 km." | `location.distance_to_beach.value` "Midigama Beach 350 m"; `location.nearby.value` 800 m / 2 km / 3.3 km / 10 km (Booking.com), attributed. No distance crept closer | sourced |
| 47 | info heading | "Good to know" | — | framing |
| 48 | info ¶1 | "There's no generator for power cuts." | `facilities[15]` (owner, Booking Q&A, 31 Mar 2026) | sourced |
| 49 | info ¶2 | "The team can book you a taxi, and set up a safari or a cooking class." | `rentals[3].value.raw` "Book Taxi"; `facilities[17]` "tours: safari, cooking class…" | sourced |
| 50 | `openingHours` / `hoursNote` | `[]` / null | `hours_note.gap`; `contradictions[3]` (three conflicting values) | correctly empty |
| 51 | `credentials` | `[]` | `credentials[0].note` "the copy must not repeat it until the owner confirms" | correctly empty |
| 52 | `lessons[0]` | Surf lesson · 90 min · beginner/intermediate/advanced · USD 20 per person | `lessons[0].value` (90, 20, USD, per person); `levels[0–2]` (N3) | sourced |
| 53 | `lessons[1]` | Private lesson | `lessons[3]`; `lessons[4]` "private coaching" (2025 home page) | sourced |
| 54 | `lessons[2]` | Group lesson · "Maximum 6" · no price | `lessons[1].value.group_size`. The price was left out because its unit is unstated | sourced |
| 55 | `lessons[3]` | Stand-up paddleboarding (SUP) | `lessons[4].value.raw` | sourced |
| 56 | `lessons[4]` | Surf spot tour | `lessons[5].value` | sourced |
| 57 | `priceList[0–2]` | Full package: private 400 · shared double 300 · shared triple 300 USD/week, "Per person, 7 nights. Price published in 2021" | `offers[0–2]`; `packages[0]` "7 Night Accommodation" | sourced |
| 58 | `priceList[3–5]` | Moderate: 350 · 295 · 280 | `offers[3–5]` | sourced |
| 59 | `priceList[6–8]` | Yoga and Surf: 300 · 280 · 280 | `offers[6–8]` | sourced |
| 60 | `priceList[9–11]` | Board Rental: 290 · 250 · 250 | `offers[9–11]` | sourced |
| 61 | `priceList[12–14]` | Airport drop 65 · pick-up 65 · both 130 USD flat, "Price published in 2021" | `offers[15–17]` (unit "flat") | sourced |
| 62 | `rooms[0]` | Small Double Room · 1 double bed · 2 · "8 m² on the top floor, with a small desk. You can see the ocean from the private entrance" | `room_types[0].value` | sourced |
| 63 | `rooms[1]` | Superior Double Room · 1 large double · 2 · "9 m² with a desk, a seating area and a garden view" | `room_types[1].value` | sourced |
| 64 | `rooms[2]` | Double Room · 1 large double · 2 · "9 m² with a garden view" | `room_types[3].value` | sourced |
| 65 | `rooms[3]` | Classic Triple Room · 3 single beds · 3 · "12 m² with a sea view" | `room_types[2].value` | sourced |
| 66 | `rooms[4]` | Small Twin Room · 2 single beds · 2 · "8 m²" | `room_types[4].value` | sourced |
| 67 | `stayInfo` times | check-in 14:00–19:00 · check-out 06:00–11:00 | `stay_info.check_in`, `.check_out`; `contradictions[4]` "compatible" | sourced |
| 68 | `stayInfo.note` S1 | "Adults only." | `stay_info.house_rules` "Children are not allowed." | sourced |
| 69 | `stayInfo.note` S2 | "No pets, no smoking, no extra beds." | `house_rules` (pets; smoking; "Cots and extra beds are not available") | sourced |
| 70 | `stayInfo.note` S3 | "Cash only." | `house_rules` "Accepted payment methods: Cash" (N5) | sourced |
| 71 | `stayInfo.note` S4 | "Quiet from 23:00 to 06:00." | `house_rules` | sourced |
| 72 | `stayInfo.note` S5 | "Bring photo ID and a credit card for check-in." | `house_rules` | sourced |
| 73 | `amenities[0–2]` | A/C, private bathroom, private entrance, each "in/to every room" | `room_types_note` "all rooms: private bathroom, air conditioning, private entrance" | sourced |
| 74 | `amenities[3]` | Surf shop on site | `facilities[0]` | sourced |
| 75 | `amenities[4]` | Gym | `facilities[1]` | sourced |
| 76 | `amenities[5]` | Rooftop bar with a pool table | `facilities[3]` (R5) | sourced |
| 77 | `amenities[6]` | Yoga on the rooftop | `facilities[5]` | sourced |
| 78 | `amenities[7]` | Sun terrace | `facilities[13]` | sourced |
| 79 | `amenities[8]` | Free WiFi · "57 Mbps" | `facilities[6]` | sourced |
| 80 | `amenities[9]` | Free private parking · "reservation needed" | `facilities[7]` | sourced |
| 81 | `amenities[10]` | Airport shuttle · "additional charge" | `facilities[8]` | sourced |
| 82 | `amenities[11–15]` | Laundry · Daily housekeeping · Luggage storage · Currency exchange · CCTV in common areas and outside | `facilities[9]`, `[11]`, `[10]`, `[12]`, `[14]` | sourced |
| 83 | `rentals[0]` | Surfboards · "Shortboards, longboards and fish" | `rentals[0].value.raw` "Shortboards, Longboard, fishtail" | sourced |
| 84 | `rentals[1]` | Cheeky Monkey boards · "Our own brand, shaped in Bali" | `rentals[1].value.raw` | sourced |
| 85 | `rentals[2]` | Scooters | `rentals[3].value.raw` "rent scooter" | sourced |
| 86 | `brands[]` | Cheeky Monkey · Creatures of Leisure · Shapers | `brands[5]`, `[0]`, `[1]`. The 2021-only Quiksilver, Billabong and Rip Curl are correctly omitted | sourced |
| 87 | `ratings[0]` | Google 4.5/5 · 467 · captured 2026-10-26 | `reviews.google` (rating, count, scale, `fetched_at` 2026-10-26) | sourced |
| 88 | `ratings[1]` | Booking.com 8.3/10 · 45 · captured 2026-10-26 | `reviews.booking` | sourced |
| 89 | `testimonials[0–10]` | 11 quotes | `reviews.quotes[12, 11, 2, 3, 4, 5, 6, 8, 9, 7, 10]`: verbatim, author, source and date identical (machine-checked) | sourced |
| 90 | `contact.phone` | +94719248686 | `contact.phone.value` | sourced |
| 91 | `contact.whatsapp` | `""` | `contact.whatsapp.gap`: none published (N6) | correctly empty |
| 92 | `contact.email` | cheekymonkeymidi@gmail.com | `contact.email.value` | sourced |
| 93 | `contact.address` | "Galle - Matara Main Road, Midigama East Midigama, Ahangama 80650, Sri Lanka" | `location.address.value` (Google, postcode) without the leading business name, in the site form given in `.note` (playbook §6) | sourced |
| 94 | `contact.mapUrl` | Google place URL | `location.map_url.value` | sourced |
| 95 | `bookingLinks[0]` | "Check dates on Booking.com" → Booking.com listing | `booking.engine_url.value` | sourced |
| 96 | `bookingLinks[1]` | "Message us on Instagram" → instagram.com/cheekymonkeysrilanka/ | `booking.direct_channels.value` "Instagram DM"; `contact.socials.instagram` | sourced |
| 97 | `languagesSpoken` | `["en"]` | `languages_spoken[0]` | sourced |

Counts: sourced 89 · framing 5 · correctly empty 3 · shared-context 0 · **unsourced 0 · contradicted 0**.

Watch-list check:
- No distance crept closer: 350 m is attributed to Booking.com, and Google's "8-minute walk" is not used.
- No amenity appeared in the rewrite.
- No guest review is paraphrased into the business's voice.
- No rating is shown without its count and platform.
- No flagged contradiction is resolved in the copy's favour: R1 and R2 above, plus the restaurant, the 20-vs-22 double, the owner name, the town and the shop hours.
- No claim is made by implication: no "steps from the sand", and no "biggest" or "oldest".

### Notes (not failing)

- **N1. The guest fragment in roof ¶1.** "One guest wrote that 'the ocean view is amazing from the rooftop'" gives no name, platform or date in the body. The quote is verbatim; the capital "The" is lowercased to fit the sentence. The full quote appears in `testimonials[7]` with Mihrican, Booking and 2025-12. The designer should put the two near each other or link them.
- **N2. Overlaps, none of them a duplicated block.** These are summary lines that restate a fact a detail field carries. No price appears in two places.
  - intro ¶1 and `spot` both say "close to the main point breaks".
  - `tagline` and shop ¶1 both say "400 boards".
  - `amenities[6]` and roof ¶2 both have rooftop yoga; ¶2 adds sunrise and sunset.
  - `rentals[1]` and `brands[0]` both name the Cheeky Monkey boards.
  - `amenities[10]` (airport shuttle, additional charge) and `priceList[12–14]` (the charges).

  This is unlike the Global Surf D1 finding, where a whole block only restated amenities. The closest call is intro ¶1 against `spot`, which the human may want to know about.
- **N3. The lesson price row has no date.** `lessons[0]` USD 20 can't carry its own date, because `lessons[]` has no note field. "Published in 2021" is in lessons ¶2. The designer must keep that block next to the row.
- **N4. Two package items sit against later evidence.** "A party night" (2021 package) sits against Booking.com's 2026 house rule "Parties/events are not allowed". "Five dinners" sits against guests finding the restaurant closed (`contradictions[6]`). Both are dated 2021 in packages ¶6, and neither is a flagged contradiction. Owner item.
- **N5. The payment rules read oddly together.** "Cash only" and "a credit card for check-in" are both Booking.com house rules. Owner item.
- **N6. `contact.whatsapp` is `""`.** The schema expects null for an empty value. The deployer should normalise it.
- **N7. `sources.md` describes some sentences in their pre-humanizer wording.** This affects intro ¶2, lessons ¶1 and others. Its keys are still right, as the humanizer's notes say. Not a defect.

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing / featureLine | ✓ | ✓ (the tagline lists what is sold) | ✓ | ✓ | ✓ | `featureLine` is the owner's line, a little stock, kept as owner prose |
| intro | ✓ | ✓ (the triad was broken in the rewrite) | ✓ | ✓ | ✓ | the heading is the owner's |
| Three rooms in 2009 | ✓ (short "Baba founded it." against longer sentences) | ✓ | ✓ | ✓ | ✓ | |
| Baba's Surf Shop | ✓ | "sizes, tails and colours" is the owner's own list | ✓ | ✓ | ✓ | "run by surfers, for surfers" and "of course, wax" are owner prose |
| Lessons for your level | ✓ | ~ "your level and your pace, and to your style" is the owner's triad, split | ✓ | ✓ | ~ | the split reads slightly stiff (note) |
| A week of surf | ✓ (openings now differ) | ✓ | ✓ | ✓ | ~ | ¶3 "one of each a day for six days, a yoga lesson and a surf lesson" puts the explanation after the count (note); the ¶5 seven-item list is all sourced inclusions |
| Up on the roof | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Getting here | ✓ | ✓ | ✓ | ✓ | ✓ | the numbers are attributed |
| Good to know | ✓ | ✓ | ✓ | ✓ | ✓ | the heading is stock (the humanizer agreed); taste only |

The rest of the checklist:
- **Honest limit:** yes, several: "There's no generator for power cuts", the dated 2021 prices, "call … to make sure lessons are running", and Booking.com's 350 m to the beach.
- **Padding vocabulary:** none. There is no "nestled", "vibrant", "boasts" or "unforgettable".
- **Register:** it matches the owner's casual, surfer-first prose ("if you fancy one", "of course, wax").
- **Locale:** English only, written in its own cadence.

Voice score: **8 / 8 criteria met; two read-aloud notes; 9 / 10.** Neither note is a failure. Both are grammatical and clear, and neither carries a fact error.

## Completeness (`surf_camp`)

Must-haves:
- `contact`: phone, email, Booking.com and Instagram ✓.
- ≥ 1 `lessons[]` / `priceList[]` row ✓ (5 and 15).
- ≥ 1 `rooms[]` row ✓ (5).
- Photos are outside the copy (`must_have_check`: 156 business-owned images).

Should-haves: `stayInfo` ✓, `amenities[]` ✓, `ratings[]` ✓ (2), `bookingLinks[]` ✓, `testimonials[]` ✓, `spot` ✓.

Shop facts are in the kit modules (`rentals[]`, `brands[]`), as `businessType_note` flags.

Deliberately empty, each with a stated reason in `sources.md` and the dossier: `openingHours` / `hoursNote` (`contradictions[3]`), `credentials` (`credentials[0].note`), `contact.whatsapp` (gap), the group-lesson price (unit unstated), and room rates (live OTA inventory).

No section is padded. For overlaps, see N2.

## Owner items (not copy failures)

- **Current status:** open, closed for low season, or in Arugam Bay.
- **Whether lessons run in Midigama this season, and who teaches.** This includes names, ratio and ISA certification.
- **Every 2021 price:** lessons, packages and transfers.
- **The group lesson's unit**, and the 20-vs-22 non-A/C double.
- **2021 facts not on a dated line:** whether rooftop yoga still runs at sunrise and sunset, and whether the shaper is still on site.
- **The bar** (R5), and the restaurant and dinners (N4).
- **The party night** against Booking.com's house rule (N4).
- **"Cash only"** together with a credit card at check-in (N5).
- **Who runs the place today**, and whether to name the family.
- **The name of the break.**
- **Brands stocked now.**
- **WhatsApp.**
- **The business name**: "Cheeky Monkey Surf Camp" (Booking.com) or "Cheeky Monkey" (Google, site).
- **The shop's second Google listing** at 3.2/5 (11 reviews). It is not shown, and the human should know that.

## Verdict: **PASS** (round 1, full-file check)

0 `unsourced`, 0 `contradicted`, voice clean, required fields covered. For the human, the closest calls are R1 (the surf school, held open by "call … to make sure lessons are running") and N2 (intro ¶1 against `spot`).

Ledger line due (not written by me): `copy_humanised → copy_passed`, note "round 1 PASS (copyeditor 0.4.2): 97 rows, 89 sourced / 5 framing / 3 correctly empty, 0 unsourced, 0 contradicted; draft→final diff clean apart from the operator-removed 2021 A/C add-on row (sources.md renumbered, nothing else moved); voice 9/10; owner items carried (status, lessons running, 2021 prices, bar/restaurant, party night)".
