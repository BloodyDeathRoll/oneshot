# copy review — global-surf-adventures · en · round 1

Reviewer: copyeditor 0.3.1. I built the runtime prompt with `node tools/prompt.mjs copyeditor` and read every layer. Run `2026-09-globalsurf-01` (mode `test`), state `copy_humanised`, 2026-09-28. I am independent of copywriter 0.3.3 and humanizer 0.2.0.

Rules applied:
- Every sentence and every field of `en.json` is checked against `dossier/global-surf-adventures/dossier.json`. `sources.md` is verified, not trusted.
- A sentence traced only to `audit.json` is `unsourced` (hard constraint 2).
- A verbatim guest observation of a physical fact is `sourced`. It never sources a ranking, frequency or cause.
- Any time, frequency, condition, quantity, scope or location that has no dossier key is `unsourced`. This is the method of the Lavish Haven rounds.
- A sentence stating one side of an unresolved `contradictions[]` item is `contradicted`.

## Scope check

- **`diff en.draft.json en.json`:**
  - `humanizer_version` 0.2.0 was added.
  - Three paragraphs were reworded: `copyBlocks[1]` ¶2, `copyBlocks[3]` ¶2 and `copyBlocks[4]` ¶1–¶2.
  - Nothing else changed.
  - Every reworded clause is traced in rows 13–16, 25–28 and 30–32.
  - Nothing appeared during humanizing that the draft did not already rest on:
    - "all you pay" = the draft's "the whole price".
    - "each one apart from the others" = "sit apart from each other".
    - "Cross the Matara road and you're on the beach" = the draft's "across the Matara road" plus the owner's "right across Matara road".
- **Owner prose, checked verbatim by script against `dossier.json`:** intro ¶1 and ¶2 are in `business.description.value`, and the lodge ¶1 is in `business.description_packages.value`. Both "A day at the camp" paragraphs are in `business.day_at_the_camp.value`, with the yoga sentence removed and "Then grab" changed to "Grab". The Myrthe fragment is in `reviews.quotes[1]`.
- **Script checks:**
  - `testimonials[0–5]` are string-equal to `reviews.quotes[6, 0, 1, 2, 3, 4]` on text, author and source (6/6).
  - `rooms[0–1].label` = `room_types.engine.value[0–1].label`.
  - `bookingLinks[0–2]` are in `booking.engine_products.value`.
  - `bookingLinks[4]` = `contact.socials.booking`.
  - `contact.mapUrl` and `ratings[0].url` = `location.map_url.value`.
  - The phone is E.164.

## Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Global Surf Lodge Kabalana" | `business.name.value` (own site, Booking, TripAdvisor per `.note`) | sourced |
| 2 | `businessType` | `surf_camp` | `businessType`; `business.type.value` "surf_camp" ("Weekly Surf & Wellness Retreats") | sourced |
| 3 | `tagline` | "A surf camp" | `business.type`; `contact.instagram_profile.value.bio` "Srilanka surf camp". This is not one of the three disputed classes in `contradictions[7]` (hostel / 3-star hotel / boutique resort) | sourced |
| 4 | `tagline` | "a few steps from the ocean" | `location.distance_to_beach.value` "Just a few steps from the ocean" (owner); `.others[0]` 40 m (Booking) | sourced |
| 5 | `tagline` | "in Kabalana, Ahangama, on Sri Lanka's south coast" | `location.area_name.value` "Kabalana / Kathaluwa, Ahangama, south coast of Sri Lanka"; `business.description_packages` "the beautiful South Coast of Sri Lanka" | sourced |
| 6 | `[0]` heading | "Surf weeks for every level" | `business.description_packages` "We offer weekly retreats, available for all levels"; `levels[0–3]` | sourced |
| 7 | `[0]` ¶1 | "Just a few steps from the ocean, find Global Surf Lodge Kabalana – a wild oasis where footwear is discouraged, chilling out is inescapable, and good times never stop." | `business.description.value`, owner prose, verbatim (the first half, before "[…]") | sourced (owner's words) |
| 8 | `[0]` ¶2 S1 | "We are surfing obsessed, and we invite you to join us and experience a perfect blend of wild tropical views and great surfing for all levels." | `business.description.value`, verbatim | sourced (owner's words) |
| 9 | `[0]` ¶2 S2 | "Next set is yours!" | the same, verbatim; asserts nothing | framing |
| 10 | `[1]` heading | "Three levels, one week each" | `offers[0–2]` (three level packages), `.unit` "per person (7-night package)" | sourced (note: `stayInfo.note` says packages run 7–28 nights, so "one week" means the package unit) |
| 11 | `[1]` ¶1 S1 | "Level 1 needs no surfing experience." | `levels[0].note` "You don't need any previous surfing experience" | sourced |
| 12 | `[1]` ¶1 S2 | "Level 2 is for intermediate surfers, Level 3 for advanced ones." | `offers[1].label` "(Intermediate)", `offers[2].label` "(Advanced)"; `levels[2–3]` | sourced |
| 13 | `[1]` ¶2 S1 | "Take a bed in the four-bed mixed dorm and the package price is all you pay, tax included." | `offers[0–2].note` "'Mixed dorm room - 4 beds' $0 (2026-10-03)"; `samples[0]` base 1466 = total 1466 for all three levels; `booking.engine_rules.value.price_type` "including_tax" | sourced (note: the $0 dorm line was seen on one sampled check-in; ¶3 dates the prices; owner to confirm) |
| 14 | `[1]` ¶2 S2 | "The shared twin room costs more, and having it to yourselves costs more again." | `offers[0–2].note` "'Shared Twin Room - 2 Beds' +$140.04 … / +$160.05 … 'Privately reserve … for an additional $350'"; `samples[1]` total 1606.04 | sourced |
| 15 | `[1]` ¶2 S3 | "The booking engine shows how much for your dates." | `offers[].note` "has_seasonal_pricing true"; prices appear only after guests and a date are chosen (`gaps[]` "offers (prices on the site)") | sourced |
| 16 | `[1]` ¶2 S4 | "Every level package in the engine also comes with seven days of unlimited equipment use." | `offers[0–2].includes_engine` "7 days of unlimited equipment use"; `offers_extras_engine.value[0]` "Surfboard rental … included (price 0) in the level packages". This item sits on the engine side of `contradictions[1]`, but the sentence names its one source ("in the engine"), which `test_mode_verdict.caveats[2]` allows ("state only what both agree on, or cite one source"). The site's lists are silent on equipment; they do not deny it | sourced (see the ruling below) |
| 17 | `[1]` ¶3 | "Prices as the booking engine showed them on 28 September 2026." | `offers[0–2].fetched_at` 2026-09-28 | sourced |
| 18 | `[2]` heading | "A day at the camp" | owner's heading on the level pages (`business.description.note` "level pages (… A day at the camp)") | sourced |
| 19 | `[2]` ¶1 S1 | "Grab your board and head out with your group for a refreshing morning surf session." | `business.day_at_the_camp.value`, verbatim except "Then grab" → "Grab". The yoga sentence before it is removed because yoga in the package is `contradictions[1]` | sourced (owner's words) |
| 20 | `[2]` ¶1 S2 | "A big, healthy breakfast will be waiting for you when you get back." | the same, verbatim | sourced (owner's words) |
| 21 | `[2]` ¶2 S1 | "Afterwards, you can either relax at the lodge or explore the extraordinary surrounds before heading out for your afternoon surf." | the same, verbatim | sourced (owner's words; see the note on the day's two surfs below) |
| 22 | `[2]` ¶2 S2 | "End your day with an epic dinner together with the other guests and soak up the electric aloha vibes." | the same, verbatim | sourced (owner's words) |
| 23 | `[3]` heading | "The lodge" | asserts nothing | framing |
| 24 | `[3]` ¶1 | "At Global Surf Lodge Kabalana, we provide our guests with a unique, holistic stay which combines surf, yoga & wellness, local culture, and nature." | `business.description_packages.value`, verbatim (the first sentence) | sourced (owner's words) |
| 25 | `[3]` ¶2 S1 | "The rooms are spread around the garden, each one apart from the others." | `room_types.site.value` "all the rooms are located separately around the lush gardens"; `facilities[17]` Garden. The count and class from the same passage are not written (`contradictions[0]`, `[7]`) | sourced |
| 26 | `[3]` ¶2 S2 | "The pool has sunbeds under the palms, and there's a bar and a laid-back common area too." | `facilities[7]` "Swimming pool with sunbeds under the palms", `[9]` Bar, `[8]` "Laid-back common area" | sourced |
| 27 | `[3]` ¶2 S3 | "One guest on Booking.com called the place "something inbetween a hostel and a luxurious hotel"." | `reviews.quotes[1]` Myrthe (Booking) "This place felt like something inbetween a hostel and a luxurious hotel"; the fragment is verbatim and attributed to a guest, not stated as the business's class | sourced |
| 28 | `[3]` ¶2 S4 | "On the same site the staff get 9.5 out of 10, across 80 reviews." | `reviews.booking.categories.Staff` 9.5; `.count` 80; `.scale` 10 | sourced |
| 29 | `[4]` heading | "Getting here" | asserts nothing | framing |
| 30 | `[4]` ¶1 S1 | "Colombo airport is about two and a half hours away by road." | `location.getting_there.value` "about 2.5 hours drive from Colombo airport" (owner, ~2019) | sourced |
| 31 | `[4]` ¶1 S2 | "There's an airport shuttle, for an extra charge." | `facilities[12]` "Airport shuttle (additional charge)" (Booking, 2026-09-28); the 2019 "83 EURO" is not written | sourced |
| 32 | `[4]` ¶2 S1 | "Cross the Matara road and you're on the beach at Kathaluwa West, 40 metres from the lodge." | `location.distance_to_beach.others[0]` "Kathaluwa West Beach 40 m" (Booking); `.others[1]` "less than 50 meters from the water, right across Matara road" (owner). The distance does not creep closer: 40 m is Booking's figure | sourced |
| 33 | `[4]` ¶2 S2 | "Kabalana Beach is 350 metres away." | `location.distance_to_beach.others[0]` "Kabalana Beach 350 m" | sourced |
| 34 | `[4]` ¶3 | "Stays booked through Booking.com **are paid in cash**." | `booking.payment_methods.value` ["Cash"], note: Booking house rules "Accepted payment methods: Cash". That key says which payment method the property accepts. It does not say how a Booking stay is paid overall. `gaps[]` "deposit/cancellation" says Booking's terms "var[y] by room". So the flat "are paid in cash" covers prepayments and deposits that the dossier says can differ by room. It widens the key's scope | **unsourced** (scope) |
| 35 | `[5]` heading | "Beyond Kabalana" | asserts nothing | framing |
| 36 | `[5]` S1a | "Global Surf Adventures, the company behind the lodge," | `business.brand.value` "Global Surf Adventures"; `business.name.note` "The operating brand is 'Global Surf Adventures'"; `businessType_note` "The only place it runs itself is Global Surf Lodge Kabalana" | sourced |
| 37 | `[5]` S1b | "also arranges surf trips to the Maldives, Morocco, Angola and Mozambique." | `other_destinations[0–3].text`: Maldives "surf trips options", Morocco "surfing trips", Angola "exclusive representative of 'Angola Waves' … surf trips", Mozambique "guided tours between the two main surfing towns". The Mozambique page is about surfing ("The surfing season starts in April"), so "surf trips" does not widen it (humanizer's flag, ruled here). No season, price or date is written, so `contradictions[8]` is not touched | sourced |
| 38 | `[5]` S2 | "Ask about them on WhatsApp or by email." | `contact.whatsapp`, `contact.email` (every globalsurf.com page) | sourced |
| 39 | `spot` S1a | "Beach breaks, points and reefs a few steps from the lodge," | `location.spot.note` quotes the packages page (owner): "just few steps away from few of the best waves in the area - beach-breaks, points and reefs". The ranking is dropped and no spot names are written (`contradictions[4]`) | sourced (owner's claim) |
| 40 | `spot` S1b | "and more waves a few minutes away by tuk-tuk." | `location.spot.value` "With a few minutes Tuk Tuk ride u can find some of the best waves"; the ranking is dropped | sourced |
| 41 | `season` S1 | "The main season runs from October to April." | `season.others[0].value` "The main season is between October to April" (owner, surfcamp-online, ~2019) | sourced (`gaps[]` season: third-party and ~2019; owner to confirm) |
| 42 | `season` S2 | "May to September is the low season." | the same: "Low season usually refer to May - September". "usually" is dropped. The claim still names a season, not a certainty, so this is not flagged | sourced |
| 43 | `closing` S1 | "Pick your level to see the dates still open." | `booking.engine_products` (one product per level); the engine shows live availability (`offers[].note`, `booking.engine_rules`) | sourced |
| 44 | `closing` S2 | "Questions first? Ask on WhatsApp." | `contact.whatsapp.value` | sourced |
| 45 | `lessons[0]` | "Level 1 (first-timers and beginners), 7 nights"; `first_time`, `beginner`; 1466 USD `per_person` | `offers[0]` label, level, price, currency, unit "per person (7-night package)"; `levels[0–1]`. The prices are the engine side of `contradictions[10]` (see the ruling below) | sourced |
| 46 | `lessons[0].includes` | "5 guided 2-hour surf sessions, 5 surf theory lessons, 7 breakfasts, 5 dinners, a cultural or nature excursion" | Each item is in both `offers[0].includes_site` and `.includes_engine` ("Guided surf session of 2 hours x 5" / "5 guided surf session of 2-hours…"; "Surf theory lessons x 5" / "5 surf theory lesson"; "Breakfasts x 7" / "7 breakfasts"; "Dinners x 5" / "5 dinners"; "A cultural or nature excursion" / "Cultural or nature adventure (Half day excursion)"). No item from `contradictions[1]` is included | sourced |
| 47 | `lessons[1]` | "Level 2 (intermediate), 7 nights"; `intermediate`; 1466 USD `per_person` | `offers[1]`; `levels[2]` | sourced |
| 48 | `lessons[1].includes` | as row 46, plus "2 filmed or photographed sessions"; "an excursion" | `offers[1].includes_site` "Filmed or photographed sessions x 2" / `.includes_engine` "2 photographed/filmed session"; the rest as row 46 | sourced |
| 49 | `lessons[2]` | "Level 3 (advanced), 7 nights"; `advanced`; 1466 USD `per_person` | `offers[2]`; `levels[3]` | sourced |
| 50 | `lessons[2].includes` | "5 coached 2-hour surf sessions, …" | `offers[2].includes_site` "2 hours coached surf sessions x 5" / `.includes_engine` "5 surf session with our professional coach (2 hours…)"; the rest as row 46. The filmed and analysis counts (5 vs 4, 5 vs 3) are left out | sourced |
| 51 | `credentials[0]` | "ISA-certified surf guides" | `credentials[0].value` "Our Professional team of Surf Guides, are ISA certified"; `facilities[0]` | sourced |
| 52 | `rooms[0]` | "Mixed dorm room - 4 beds"; "4 single beds"; sleeps 4; "Private outdoor bathroom" | `room_types.engine.value[0]` label, "4 comfortable single beds", sleeps 4, "features a private outdoor bathroom" | sourced |
| 53 | `rooms[1]` | "Shared Twin Room - 2 Beds"; sleeps 2; "Private bathroom" | `room_types.engine.value[1]` label, sleeps 2, "a lovely private bathroom". The beds are not written (`contradictions[0]`) | sourced |
| 54 | `stayInfo` times | check-in 14:00–20:00, check-out until 11:00 | `stayInfo.checkInFrom` / `.checkInTo` / `.checkOutTo` (Booking; Google agrees on 14:00 and 11:00) | sourced |
| 55 | `stayInfo.note` S1 | "Packages start on a Saturday and run 7, 14, 21 or 28 nights." | `stayInfo.package_rules.value` "Packages start on Saturdays and run 7 nights (7/14/21/28)"; `booking.engine_rules.value.check_in_day`, `.durations_nights`. This is the engine side of `contradictions[3]` (see the ruling below) | sourced |
| 56 | `stayInfo.note` S2 | "You must be 18 or over to book a package online." | `stayInfo.package_rules.value` "Guests must be 18+ to book a package online"; `engine_rules.min_guest_age` 18 | sourced |
| 57 | `stayInfo.note` S3 | "No pets." | `stayInfo.note.value` "Pets are not allowed" | sourced |
| 58 | `amenities[0]` | Swimming pool — "sunbeds under the palms; shallow end" | `facilities[7]`, `[10]` "Outdoor swimming pool (free, shallow end)" | sourced |
| 59 | `amenities[1]` | Yoga, meditation and sound healing sessions | `facilities[2]` "Daily yoga classes, meditation and sound healing sessions", `[19]`. "Daily" and "included" are dropped (yoga in the package is `contradictions[1]`) | sourced |
| 60 | `amenities[2]` | Ice baths and breathing exercises | `facilities[3]` | sourced |
| 61 | `amenities[3]` | Video analysis and photography — "in-house photographer" | `facilities[1]`; no count | sourced |
| 62 | `amenities[4]` | Getting to the surf lessons — "on foot or by tuk-tuk, depending on the spot; in the packages" | `facilities[6]` "Tuk tuk transfers to surf spots (activity transfers included in the package)"; `offers[0–2].includes_engine` "Walk or transport (depending on surf location) to surf lessons" | sourced |
| 63 | `amenities[5]` | Drinking water, local coffee and tea all day — "in the packages" | `offers[0–2].includes_site` "Unlimited drinking water", "Unlimited local coffee & tea"; `.includes_engine` "Local Coffee & Tea all day" (on both lists) | sourced |
| 64 | `amenities[6]` | Restaurant, freshly cooked meals — "vegan, vegetarian and gluten-free options" | `facilities[4]`, `[13]` | sourced |
| 65 | `amenities[9]` | Co-working space — "coffee and fresh juices" | `facilities[5]`; "high-speed internet" is not written | sourced |
| 66–81 | `amenities[7–8, 10–23]` | Bar · Coffee house on site · Laid-back common area · Garden · Sun terrace · Free WiFi · Air conditioning · Daily housekeeping · Airport shuttle (additional charge) · Free private parking on site (reservation needed) · Water sport facilities on site (additional charge) · Tour desk · Luggage storage · Safety deposit box · 24-hour security · Non-smoking throughout | `facilities[9]/[15]`, `[16]`, `[8]`, `[17]`, `[18]`, `[11]`, `[26]`, `[20]`, `[12]`, `[14]`, `[23]`, `[22]`, `[21]`, `[25]`, `[24]`, `[27]`. Each re-read; each note is the facility's own bracket | sourced ×16 |
| 82 | `ratings[0]` | Google 4.7/5, 198, captured 2026-09-28, listing URL | `reviews.google` 4.7 / 5 / 198, `fetched_at` 2026-09-28; URL = `location.map_url.value` | sourced |
| 83 | `ratings[1]` | Booking 8.6/10, 80, captured 2026-09-28 | `reviews.booking` 8.6 / 10 / 80, `source_url`, `fetched_at` 2026-09-28 | sourced |
| 84–89 | `testimonials[0–5]` | Nina van der Burgh (Google) · Fanny, Germany · Myrthe, Netherlands · Agustin, Chile · Sara, Austria · Hannah, Oman (Booking) | `reviews.quotes[6, 0, 1, 2, 3, 4]`, string-equal by script; no dates written (none are month-exact) | sourced ×6 |
| 90 | `languagesSpoken` | `["en", "other"]` | `languages_spoken.value` ["en","he"] (Booking "English, Hebrew"); `other` stands for `he`, which the schema enum lacks | sourced (schema gap, noted) |
| 91 | `contact.phone` | "+97299733943" | `contact.phone.value` (every globalsurf.com page). It is not stated to be the lodge's number, so `contradictions[6]` is not touched | sourced |
| 92 | `contact.email` | "info@globalsurf.com" | `contact.email.value` | sourced |
| 93 | `contact.address` | "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address.value` (Google) "Henewatta addara gederawata, Ahangama 80650, Sri Lanka". Playbook §6 is met: Google's words, Google's postcode, place names capitalised, street / town postcode / country order. `contradictions[5]` was resolved by the harvester ("Site uses Google's") | sourced |
| 94 | `contact.mapUrl` | Google place URL | `location.map_url.value`, identical | sourced |
| 95 | `bookingLinks[0–2]` | "Level 1/2/3: see dates and prices" → engine product URLs | `booking.engine_products.value[0–2]`, identical; the engine shows dates and prices per product | sourced ×3 |
| 96 | `bookingLinks[3]` | "Ask on WhatsApp" → `wa.me/972523593240?text=…` | `contact.whatsapp.value` +972523593240; the prefilled text asserts nothing | sourced |
| 97 | `bookingLinks[4]` | "Stay without a package: Booking.com" → Booking URL | `contact.socials.booking`; `booking.other_engines.value[0]` (room listing; `room_types.booking` rooms only) | sourced |
| — | `openingHours` `[]`, `hoursNote` null, `priceList` `[]`, `featureLine` null, `forecast` null, `contact.whatsapp` null | empty | `hours_note.gap`; prices live in `lessons[]` (schema "No duplication"); the other fields are optional. `contact.whatsapp` is optional since schema v0.7 | no claim |

**Counts (rows 1–97; grouped rows counted per claim = 99 claims):** `sourced` 94 · `framing` 4 · `shared-context` 0 · **`unsourced` 1** (row 34) · **`contradicted` 0**.

### Contradictions (`contradictions[0–10]`), one by one

| # | Topic | In the copy | Ruling |
|---|---|---|---|
| 0 | Room inventory | Only the engine room labels, with no count and no twin bed layout; "spread around the garden" (row 25) carries no count | not stated |
| 1 | Package inclusions | `lessons[].includes` carry only the items both lists share. Equipment (row 16) is engine-only and says "in the engine". Yoga appears in `amenities[1]` as a lodge activity, not as an inclusion | not stated as a resolved fact (see the ruling on row 16) |
| 2 | Freestylers board | package not written | not stated |
| 3 | Start day | "Packages start on a Saturday" (row 55) | **Ruling: not contradicted.** One side is the live engine (2026-10-03 … 2027-04-03, fetched today). The other is a ~2019 third-party listing. The harvester put the engine side in a value field (`stayInfo.package_rules.value`), and the 2019 side is in no value field. This is the same pattern as the address in [5], where the harvester's value field decides. Shahar may overrule: if he does, this row and the prices in rows 45, 47 and 49 flip to `contradicted` |
| 4 | Spot names | no names written | not stated |
| 5 | Address spelling | Google's, per the harvester's stated resolution | resolved by the harvester |
| 6 | Phones | HQ phone and HQ WhatsApp, neither called the lodge's | not stated |
| 7 | Property class | "surf camp" (the harvester's type, Instagram bio); the one hostel/hotel phrase is a guest's, attributed | not stated |
| 8 | Mozambique season | no season written | not stated |
| 9 | Instagram followers | not written | not stated |
| 10 | Prices | $1466 from the engine, dated 28 September 2026 (row 17) | **Ruling as [3]:** `offers[0–2].price` carries the engine value, and the 2019 "from 855€" is in no value field. The price is dated on the page |

**Ruling on row 16 (equipment):** it is written as the engine's claim ("in the engine"), and the harvester's caveat allows citing one source. It is `sourced`. **Note:** the copywriter left out the Ayurvedic spa treatment, which is also engine-only, as "contradicted". Equipment and spa sit on the same side of `contradictions[1]`, so the two calls are inconsistent. Leaving the spa out is the more conservative call and is not a fail. It is flagged for the copywriter's consistency.

## Failing sentences

| # | Field | Sentence (clause at fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 34 | `copyBlocks[4].body` ¶3 | "Stays booked through Booking.com **are paid in cash**." | unsourced: scope. The key gives the payment method accepted at the property (Booking house rules), not how the whole stay is paid. `gaps[]` "deposit/cancellation" says Booking's terms vary by room. This sentence was already in the draft; it was not introduced by the humanizer | copywriter (with the `sources.md` row) |

No voice fails.

## Voice audit (per block)

Owner prose (intro ¶1–¶2, "A day at the camp", the lodge ¶1) is the owner's own text from globalsurf.com, reproduced verbatim. It has tells: a triad in "footwear is discouraged, chilling out is inescapable, and good times never stop", "a perfect blend", "unique, holistic stay", "extraordinary surrounds", "epic", and a four-item list in "surf, yoga & wellness, local culture, and nature". They are the owner's register and are the owner's to change (`schemas/business-types.md`: "If the owner has already written … use it, it is their voice"). They are scored for register and reading aloud, not counted as generated-text tells. The copywriter's and humanizer's own sentences are scored in full.

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | yes | yes | yes | — | yes | yes, but see the echo note below | clean, note |
| `[0]` intro | owner | owner | owner | owner | — | owner's own | yes | owner prose, not scored |
| `[1]` offer | yes (short, long, short, fragment) | yes | yes | yes (dorm, twin, engine, dates) | yes (the twin and a private room cost more) | yes | yes | clean |
| `[2]` day | owner | owner | owner | owner | — | owner's own | yes | owner prose, not scored |
| `[3]` lodge | ¶2 varies | ¶2 S2 lists three facilities, but the parallel is broken ("The pool has …, and there's a bar and … too"). It is a data list, not a rhetorical triad | yes | yes | — | ¶1 "we" (owner) then ¶2 in an outside voice ("the staff get 9.5"). This mild shift reads naturally for a review score | yes | clean, note |
| `[4]` getting here | yes | yes | yes | yes (Matara road, 40 m, 350 m) | yes (a road to cross; the shuttle costs extra) | yes | yes | clean (fact row 34 aside) |
| `[5]` beyond | yes | a four-country list is data | yes | yes | — | third person ("the company behind the lodge") beside the owner's "we" elsewhere on the page; tolerable in an info block | yes | clean, note |
| `spot` | one sentence, two halves | "beach breaks, points and reefs" is the owner's own list | yes | yes | — | yes | yes | clean |
| `season` | two short sentences | yes | yes | yes (months) | yes (a low season is stated) | yes | yes | clean |
| `closing` | yes | yes | yes | yes | — | yes | yes | clean |
| `stayInfo.note` | yes, ends on the "No pets." fragment | yes | yes | yes | yes (18+, no pets) | yes | yes | clean |
| `lessons[].includes`, `amenities[]`, `rooms[]` | data | data | yes | yes | — | yes | yes | clean |

Voice fails: **0**.

**Echo (note, not a fail, as the Lavish Haven's "two minutes"):** the tagline "A surf camp a few steps from the ocean …" is followed directly by intro ¶1 "Just a few steps from the ocean, …". `spot` then says "a few steps from the lodge". The humanizer flagged the same thing. The owner's line is verbatim. Whether to change the tagline's anchor is the copywriter's call.

## Completeness (`surf_camp`)

- **Must-haves:** `contact` has phone, email, a WhatsApp booking link and engine links. `lessons[]` has 3 rows. `rooms[]` has 2 rows. `photos[]` is not a copy field.
- **Should-haves:** all filled. `stayInfo` has times and a note. `amenities[]` has 24 rows, `ratings[]` 2 with `capturedAt`, and `bookingLinks[]` 5 (engine ×3, WhatsApp, Booking.com). `credentials[]` has 1 row, and levels are set in `lessons[].level`. `spot`, `season` and `testimonials[]` (6) are filled.
- **Deliberately empty, each with a reason in `sources.md`:** `openingHours` (lodge, `hours_note.gap`), `priceList` (prices live in `lessons[]`), `featureLine` and `forecast` (optional), and `contact.whatsapp`.
- **Schema limits, by script:**
  - `tagline` 88/140, `closing` 78/140, `spot` 104/200, `season` 79/200, `stayInfo.note` 118/200, `contact.address` 54/300.
  - Headings ≤ 27/120 and bodies ≤ 473/1500.
  - `lessons[].includes` ≤ 126/140 and labels ≤ 46/80.
  - Amenity labels ≤ 44/60 and notes ≤ 61/80.
  - Booking labels ≤ 35/60.
  - The phone is E.164, and every URL is `https://`.
- Prices carry a capture date (`[1]` ¶3), and ratings carry `capturedAt` (playbook §6–§7).

**Open items (not copy fails; for the orchestrator or Shahar):**
- **`contact.whatsapp` is null on purpose.** The engine is the primary action (`booking.path.value` "engine"), and WhatsApp is `bookingLinks[3]`. Playbook §5 says "WhatsApp first where it exists". The copy follows the dossier's `booking.path` and audit F8. This is a booking-path decision, not a copy fact.
- The WhatsApp prefill cannot carry the chosen level (a template item).
- The `languagesSpoken` enum lacks `he`.
- "A day at the camp" describes a morning surf and an afternoon surf, and a dinner that ends each day. The packages list 5 guided sessions and 5 dinners over 7 nights. These are the owner's words, and the harvester flags no contradiction, so this is not a fail. The owner may want the day text and the inclusions to agree.

## Duplication (notes)

- **"A few steps" from the ocean or lodge:** `tagline`, `[0]` ¶1 and `spot`. The 40 m figure in `[4]` says the same in numbers. See the echo note above.
- **Pool, bar, common area:** `[3]` ¶2 and `amenities[0, 7, 10]`, plus testimonials.
- **Airport shuttle:** `[4]` ¶1 and `amenities[15]`.
- **Booking.com staff score:** `[3]` ¶2 only. Booking's overall score is in `ratings[1]`, so the two are different facts.
- **Levels:** `[1]` ¶1 and the `lessons[].label`s.

These repeats are tolerated, as on the Lavish Haven and KA (prose beside modules).

## `sources.md` check

Every key and quoted string in "Rests on" was re-read in `dossier.json`. All of them exist and say what the rows claim. Facility index mapping, quote indices and offer notes were verified row by row. One row is incomplete:

- **`[4]` info ¶3:** it cites `gaps[]` deposit/cancellation only as "package payment terms are not published". It leaves out the same gap entry's "Booking says it varies by room", which is the reason row 34 fails.

Minor points:
- The address row cites "base.md constraint 9" (the copywriter's base); the rule is playbook §6.
- The "Contradictions — none written" header lists [3] and [10] as avoided. The copy does state their engine side (rows 55, 45, 47, 49). The body rows say so, and the header should too. That is the copywriter's wording to fix; the copy is not wrong for it.

## Verdict: **FAIL** (round 1)

1 `unsourced` (row 34), 0 `contradicted`, 0 voice fails, required fields covered.

**Fix list:**
1. **Copywriter:** `copyBlocks[4].body` ¶3, "Stays booked through Booking.com are paid in cash." The sentence may state only what `booking.payment_methods` holds, which is the payment method accepted at the property for Booking stays. Otherwise remove it. Update its `sources.md` row to cite the full `gaps[]` deposit/cancellation entry. (No wording is suggested here, by rule.)
2. **Copywriter, optional (consistency, not a fail):** make one call for engine-only inclusions. Equipment is written and the spa treatment is not. Also correct the `sources.md` header on contradictions [3] and [10].

The rulings on `contradictions[3]` and `[10]` (engine side written) are stated above for Shahar to overrule if he reads them differently.

Round 1 of 2. The dossier supports this site. The failure is one clause, not a missing fact. The next round re-checks the whole file.
