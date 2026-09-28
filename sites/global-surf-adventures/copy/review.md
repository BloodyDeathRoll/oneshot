# copy review — global-surf-adventures · en · round 1

Reviewer: copyeditor 0.3.1 (runtime prompt from `tools/prompt.mjs copyeditor`, all 795 lines read). Run `2026-09-globalsurf-02` (test), state `copy_humanised`, 2026-09-28. Independent of the copywriter (0.3.3) and the humanizer (0.2.0).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/global-surf-adventures/dossier.json` (words re-read, not taken from `sources.md`). `audit.json` is not a source (hard constraint 2); where `sources.md` leans on it, the fact was re-traced to the dossier or to a dossier-listed evidence file.

## Verdict: **FAIL** (round 1 of 2)

7 sentences or fields `contradicted`, 0 `unsourced`, 1 voice failure, 1 duplication. Fix list at the end.

## Scope check

- `diff en.draft.json en.json`: four sentences in three blocks (intro ¶2 S1, "Pick your level" ¶1–¶3 S1, rooms ¶1 S1) plus `humanizer_version`. Same facts before and after; nothing appeared during humanizing. One sentence the humanizer made reads wrong (V1 below).
- Testimonials: all nine machine-checked against `reviews.quotes[]` — text, author and source identical. Erez (`quotes[7]`) correctly excluded.
- Booking links: `[0]` = `booking.engine_url.value`; `[1–4]` = `booking.engine_products[0–3].url`; `[5]` = `wa.me/972523593240` (`booking.whatsapp.value`), prefill names the business. No `/tests/` URL.
- Lengths: `tagline` 81, `closing` 80, `featureLine` 53 (≤ 140); `spot` 120 (≤ 200); `lessons[].includes` 135 / 135 / 136 / 32 (≤ 140).

## Ruling: engine values taken as the dossier's value fields

The copywriter treated the Bookinglayer engine as the value behind prices, inclusions, rooms and the Freestylers board. Ruled field by field:

1. **Prices (`offers[0–2].price` 1466 USD per person, 7 nights) — accepted, `sourced`.** The harvester put the engine's figure in the dossier's `value` field with the engine as `source_url` and `fetched_at` 2026-09-28. No other price exists (`gaps[]` "offers[].price on the site"), and no `contradictions[]` entry covers price. The page also says where the number comes from and when ("the base price the booking engine showed on 28 September 2026"). The owner confirms it before go-live (`offers[].note`).
2. **Inclusions (`contradictions[2]`) — accepted, `sourced`.** `lessons[].includes` carries only items that both `includes_engine` and `includes_site` list. Nothing disputed is stated, so the contradiction is left open, not resolved.
3. **The engine as a tiebreaker for an open contradiction — not accepted.** None of the `contradictions[]` entries carries a resolution. The engine is one more source, not a ruling. Where a sentence states one side of an open contradiction as fact, without saying whose claim it is, and that sentence would be false under the other side, it is `contradicted`. This applies to:
   - the Freestylers board (`contradictions[1]`), where the engine's label "B&B only" was used as the tiebreaker (F3–F5);
   - the rooms (`contradictions[3]`), where the engine's two options are shown as the lodge's rooms (F6).
   The engine's product **names** used as labels ("Freestylers – B&B only", "Shared Twin Room") are `sourced` as names. What fails is the content sentences.
4. **The same test applied to the other open contradictions:**
   - WhatsApp target (`[0]`): "Ask us on WhatsApp" is true under both sides, and the link uses the number in `contact.whatsapp.value`, which 16 of the site's links carry. `sourced`; still an owner item.
   - Yoga frequency (`[4]`): "daily" is dropped. `sourced`.
   - Location name (`[5]`): "on the beach at Kabalana" is false under Booking's side, and the page itself prints Booking's "Kabalana Beach 350 m" (F1, F2).
   - Mozambique (`[6]`): not on the page.

## Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Global Surf Lodge Kabalana" | `business.name.value` | sourced |
| 2 | `businessType` | `surf_camp` | `businessType`; `business.type.value`; `test_mode_verdict.type` | sourced |
| 3 | `tagline` | "Surf weeks for all levels" | `offers[0–2]` weekly packages; `business.description_packages` "weekly retreats, available for all levels" | sourced |
| 4 | `tagline` | "on Sri Lanka's south coast" | `location.area_name` "south coast of Sri Lanka"; `description_packages` "South Coast of Sri Lanka" | sourced |
| 5 | `tagline` | "a few steps from the ocean" | `location.distance_to_beach.value` "Just a few steps from the ocean" (owner); consistent with `.others[0]` nearest beach 40 m | sourced |
| 6 | `closing` S1 | "Book the week for your level." | `offers[0–2]`; `booking.engine_products[0–2]` | sourced |
| 7 | `closing` S2–S3 | "Not sure which one fits? Ask us on WhatsApp first." | `contact.whatsapp.value`, `booking.whatsapp.value`; `contradictions[0]`: true under both sides (ruling 4) | sourced |
| 8 | `featureLine` | "Footwear is discouraged. Chilling out is inescapable." | `business.description` "footwear is discouraged, chilling out is inescapable" (owner, split) | sourced |
| 9 | intro heading | "Next set is yours" | `business.description` "Next set is yours!" | sourced |
| 10 | intro ¶1 | "We are surfing obsessed, and we invite you to join us." | `business.description` verbatim | sourced |
| 11 | intro ¶2 S1a | "The lodge is on the beach at Kabalana," | Owner: `location.distance_to_beach.others[1]` "on the beach in Kabbalah" (ISA page). Against it: `contradictions[5]` (Kabalana / Kabbalah vs Kathaluwa / Ahangama, open) and `distance_to_beach.others[0]` (Booking): nearest beach Kathaluwa West 40 m, **Kabalana Beach 350 m**. The sentence gives the owner's side as fact, and "the beach at Kabalana" reads as Kabalana Beach, which is the one this same page (row 47) puts 350 m away | **contradicted** |
| 12 | intro ¶2 S1b | "in the green of the jungle." | `business.experiences.note` Nature block "nestled in the lush green jungle" | sourced |
| 13 | intro ¶2 S2a | "We run surf weeks for three levels, from your first wave to carving," | `offers[0–2]`, `levels[0–2]`; `offers[0].description` "Catch your first wave"; `offers[2].description` "already carving it up" | sourced |
| 14 | intro ¶2 S2b | "and a bed-and-breakfast stay for independent travellers." | `offers[3].description` "accommodation and breakfast only … independent travelers". The same page says "half board … daily breakfast and dinner" (`offers[3].description.note`, **`contradictions[1]`**, open). States side b as fact (ruling 3) | **contradicted** |
| 15 | day heading | "Surf, breakfast, surf again" | `business.day_at_the_camp` morning surf, breakfast, afternoon surf | sourced |
| 16 | day ¶1 S1 | "Mornings start with your group and a surf session." | `business.day_at_the_camp.value` (Level 1 page, "same on level two"): "Wake up to … **yoga** … **Then** grab your board and head out with your group". Only Level 3 "drops yoga" (`.note`). The block covers every level and says the morning **starts** with surf, which the only schedule source contradicts for Levels 1 and 2. Dropping yoga is fine (`contradictions[2]`); saying what comes first is a new claim | **contradicted** |
| 17 | day ¶1 S2 | "Back at the lodge, a big, healthy breakfast is waiting." | `day_at_the_camp` "A big, healthy breakfast will be waiting for you when you get back" | sourced |
| 18 | day ¶2 S1 | "After that the day is yours: relax at the lodge, or go out and explore before the afternoon surf." | `day_at_the_camp` "relax at the lodge or explore the extraordinary surrounds before heading out for your afternoon surf" | sourced |
| 19 | day ¶2 S2 | "The evening ends with dinner, together with the other guests." | `day_at_the_camp` "End your day with an epic dinner together with the other guests"; a typical day, not "every evening" (5 dinners, `includes_*`) | sourced |
| 20 | levels heading | "Pick your level" | — | framing |
| 21 | levels ¶1 S1 | "Level 1 – Fomies is your first time on a board, and you don't need any surfing experience." | `offers[0].description` "your first time … You don't need any previous surfing experience" | sourced (voice: V1) |
| 22 | levels ¶1 S2 | "You learn on soft boards, on easy reef breaks and the sandy beaches around the lodge." | `facilities[10]` "soft boards for first-timers and intermediates"; `location.spot.note` beginners on "easy reef breaks and waves on the surrounding sandy beaches" | sourced |
| 23 | levels ¶2 S1 | "Level 2 – Rollers is for when you can stand up, but paddling out … is still a struggle." | `offers[1].description` "can stand up … still struggle with paddling out to the line-up and catching slick green waves" | sourced |
| 24 | levels ¶2 S2 | "You surf easy reefs and beach breaks with deep-water channels, on soft boards." | `location.spot.note` intermediates "easy reefs and beach breaks with deep water channels"; `facilities[10]` | sourced |
| 25 | levels ¶3 S1 | "Level 3 – Riders: you're already carving, and you want to sharpen your skills." | `offers[2].description` "already carving it up, but you want to improve your skill set" | sourced |
| 26 | levels ¶3 S2 | "From Galle to Matara, you surf the best spot of the day for the conditions, the wind and the tide." | `location.spot.note` "From Galle to Matara … the best spot to surf every day according to the surf conditions, winds & tide" | sourced |
| 27 | levels ¶4 | "Freestylers is bed and breakfast only, for independent travellers who want to soak up the lodge's vibe." | "independent travellers … soak up the lodge's vibe": `offers[3].description`, sourced. "bed and breakfast only": `contradictions[1]` open, as row 14 | **contradicted** |
| 28 | price heading | "One price, three levels" | `offers[0–2].price` all 1466 | sourced |
| 29 | price ¶1 S1 | "The three surf weeks cost the same, per person for seven nights." | `offers[0–2].price`, `.unit` "per person, 7 nights (base price)" | sourced |
| 30 | price ¶1 S2 | "That is the base price the booking engine showed on 28 September 2026." | `offers[].note` "Engine 'Base price'"; `.fetched_at` 2026-09-28 (ruling 1) | sourced |
| 31 | price ¶1 S3a | "The room you choose can add to it;" | `offers[0].note` "Room supplement on top … Shared Twin Room +$140.04 … dorm +$0" | sourced |
| 32 | price ¶1 S3b | "the engine shows any supplement once you pick your dates." | `offers[0].evidence` `engine-level-1-fomies-female-13_February_2027.png` (viewed): Start date set → "Base price $1466 · Accommodation $140.04 · Total $1606.04". `sources.md` cites audit F2 for this; the evidence file alone carries it | sourced |
| 33 | price ¶2 S1 | "Packages start on a Saturday and run for 7, 14, 21 or 28 nights, for up to six guests per booking." | `offers[0–2].duration_options` "7, 14, 21 or 28 nights … Saturday check-in only on every sampled date"; `.max_guests_per_booking` 6 | sourced |
| 34 | price ¶2 S2 | "Drinking water and local coffee and tea are unlimited." | `includes_engine` "Unlimited drinking water", "Local Coffee & Tea all day"; `includes_site` "Unlimited local coffee & tea" — in both lists | sourced |
| 35 | rooms heading | "Twelve rooms, one big family" | `business.staying_with_us` "just 12 suites … one big happy family"; `rooms[0].note` "12 spacious … rooms" | sourced (note N2) |
| 36 | rooms ¶1 S1 | "There are just twelve rooms." | as row 35 | sourced |
| 37 | rooms ¶1 S2 | "That keeps a stay here personal, part of one big happy family." | `staying_with_us` "making your stay personal … part of one big happy family" (owner) | sourced |
| 38 | rooms ¶1 S3 | "Every room has air conditioning, a ceiling fan, a safe box, a private toilet and shower, a socket next to each bed and, of course, a board rack." | `room_amenities.value` "All of our rooms have A/C, ceiling fan, safe box, en-suite private toilet & shower, electricity socket next to each bad, and a board rack of course!"; "private", not "en-suite": the dorm's bathroom is outdoor (`rooms[2]`) | sourced |
| 39 | rooms ¶2 | "When you're not on the water, lie out on a sunbed by the pool under the palms, hang out in the common area, take an ice-cold drink from the bar, or eat Sri Lankan produce from the lodge kitchen." | `staying_with_us` verbatim sense | sourced |
| 40 | between heading | "Between sessions" | — | framing |
| 41 | between S1 | "The lodge has a yoga chalet and ice baths, and holds yoga, meditation and sound healing sessions." | `facilities[1]`, `[6]`, `[7]` ("daily" dropped, `contradictions[4]`); stated as the lodge's, not as package items (`contradictions[2]`) | sourced (duplication D1) |
| 42 | between S2 | "There's a lookout terrace with an ocean view." | `facilities[2]` | sourced (duplication D1) |
| 43 | guests heading | "What guests say" | — | framing |
| 44 | guests ¶1 | "Booking.com guests score the staff 9.5 out of 10, and the facilities and the cleanliness 9.2 each." | `reviews.booking.categories` Staff 9.5, Facilities 9.2, Cleanliness 9.2; platform named; count 80 is on the rating block (`ratings[0]`) | sourced (note N3) |
| 45 | guests ¶2 | "In their reviews they write about the pool area, the open-air bathroom and the breakfast bowls." | `reviews.quotes[1]` Fanny "the open-air-bathroom, the relaxing pool area and especially the great breakfast bowls"; pool also `[3]`, `[5]`. Attributed to guests, no frequency word | sourced |
| 46 | getting heading | "Getting here" | — | framing |
| 47 | getting S1 | "Booking.com puts Kathaluwa West Beach 40 m from the lodge and Kabalana Beach 350 m." | `location.distance_to_beach.others[0]` | sourced |
| 48 | getting S2 | "Kathaluwa station is 400 m away, Ahangama Beach 4 km and Koggala Airport 3.9 km." | same key | sourced |
| 49 | `spot` S1 | "On the beach at Kabalana, overlooking two spots: The Rock and South Point." | "overlooking two spots: The Rock and South Point": `location.spot.value` (owner), sourced. "On the beach at Kabalana": as row 11 | **contradicted** |
| 50 | `spot` S2 | "More waves are a few minutes away by tuk-tuk." | `location.spot.value` "With a few minutes Tuk Tuk ride u can find some of the best waves" (superlative dropped) | sourced |
| 51 | `season` | `null` | `season.value` null; `gaps[]` "season" | correctly empty |
| 52 | `languagesSpoken` | `[]` | `languages_spoken.value` null; `gaps[]` | correctly empty |
| 53 | `lessons[0–2].label` | "Level 1 – Fomies" / "Level 2 – Rollers" / "Level 3 – Riders" | `booking.engine_products[0–2].label` | sourced |
| 54 | `lessons[0–2].level` | `first_time`+`beginner` / `intermediate` / `advanced` | `levels[0–2]` | sourced |
| 55 | `lessons[0–1].includes` | "7 nights, 7 breakfasts, 5 dinners, 5 guided 2-hour surf sessions, 5 theory lessons, all equipment, transport to the spots, an excursion" | Items in both `offers[0/1].includes_engine` and `.includes_site` (ruling 2). "all equipment": engine "7 days of unlimited equipment use" + `business.concept` "all your surfing equipment". "transport to the spots": `facilities[9]` "tuk tuk transfers to surf spots (included in the package)"; engine "Walk or transport (depending on surf location)" (note N4) | sourced |
| 56 | `lessons[2].includes` | same, "coached" | `offers[2].includes_engine` "with our professional coach"; `.includes_site` "coached surf sessions x 5" | sourced |
| 57 | `lessons[0–2].price/currency/unit` | 1466 / USD / `per_person` | `offers[0–2].price`, `.currency`, `.unit` (ruling 1) | sourced |
| 58 | `lessons[3].label` | "Freestylers – B&B only" | `booking.engine_products[3].label` "Freestylers - B&B only package" — the product's name (ruling 3) | sourced |
| 59 | `lessons[3].includes` | "Bed and breakfast, from 4 nights" | "from 4 nights": `offers[3].gap` "min 4 nights" (entry carries the engine `source_url`), sourced. "Bed and breakfast": `contradictions[1]` open, as row 14 | **contradicted** |
| 60 | `credentials[0]` | "ISA-certified surf guides" | `credentials[0]` "Our Professional team of Surf Guides, are ISA certified" | sourced |
| 61 | `rooms[0]` | "Mixed dorm room" · "4 single beds" · sleeps 4 · "Private outdoor bathroom" | `rooms[2]` (engine option, "+$0 on 3 Oct 2026") | **contradicted** (with row 62, by implication) |
| 62 | `rooms[1]` | "Shared Twin Room" · "1 double bed and 1 single bed" · "Private bathroom and a beach view all day" | `rooms[3]` (engine option). The row text matches the engine. But `rooms[]` is the page's room list, and it shows the engine's two options, which vary by date (`rooms[2–3].note`; the 13 Feb 2027 screenshot shows only the twin), as the lodge's rooms. **`contradictions[3]`** (room mix, open) gives other lists: the site "4 twin, 4 double/triple, 4 family rooms" (`rooms[0]`) and Booking "Deluxe Double; Superior Twin — 2 single beds; Single Bed in Dormitory" (`rooms[1]`). Under both of those, the implied mix is false, and Booking's twin bed set differs from this row's. Nothing on the page says whose list this is (ruling 3; "claims made by implication") | **contradicted** |
| 63 | `stayInfo` check-in / check-out | 14:00–20:00 / until 11:00 | `stayInfo.checkIn.value`, `.checkOut.value` (Booking; Google agrees) | sourced |
| 64 | `stayInfo.note` | "No pets and no extra beds; cots are free on request for children up to 5." | `stayInfo.rules` | sourced |
| 65 | `amenities[0–14]` | pool · yoga chalet · yoga, meditation and sound healing sessions · ice baths · lookout terrace (ocean view) · restaurant (breakfast, lunch and dinner, daily) · bar · gluten-free and vegan options · co-working (high-speed internet, coffee and fresh juices) · free WiFi · airport shuttle · free private parking on site · non-smoking rooms · garden · sun terrace | `facilities[0]`, `[1]`, `[7]` (no "daily"), `[6]`, `[2]`, `[3]`, `[4]`, `[11]`, `[5]`, `[12]`, `[13]`, `[14]`, `[15]`, `[16]`, `[17]` | sourced |
| 66 | `ratings[0]` | Booking 8.6/10, 80, URL, 2026-09-28 | `reviews.booking.rating`, `.scale`, `.count`, `.source_url`, `.fetched_at` | sourced |
| 67 | `testimonials[0–8]` | nine quotes | `reviews.quotes[1, 2, 9, 3, 0, 8, 4, 5, 6]`: verbatim, author and source identical (machine-checked) | sourced |
| 68 | `contact.phone` | "+97299733943" | `contact.phone.value` (Israeli HQ line; `phone_lodge` +94770776747 is on Google only; owner item) | sourced |
| 69 | `contact.whatsapp` | `""` | Deliberate: the engine stays the primary action (`booking.path` "engine"); WhatsApp is `bookingLinks[5]` | correctly empty |
| 70 | `contact.email` | "info@globalsurf.com" | `contact.email.value` | sourced |
| 71 | `contact.address` | "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address.value` (Google, postcode); only capitalisation changed (playbook §6) | sourced |
| 72 | `contact.mapUrl` | Google place URL | `location.map_url.value` | sourced |
| 73 | `bookingLinks[0]` | "See the weekly surf packages and dates" → category URL | `booking.engine_url.value` | sourced |
| 74 | `bookingLinks[1–4]` | "Book Level 1 – Fomies" … "Book Freestylers – B&B only" | `booking.engine_products[0–3]` (labels are product names) | sourced |
| 75 | `bookingLinks[5]` | "Ask on WhatsApp" → `wa.me/972523593240?text=…` | `booking.whatsapp.value`; `contradictions[0]` (ruling 4) | sourced |

Counts: sourced 60 · framing 4 · correctly empty 3 · **contradicted 8 rows (7 findings: F1–F7; rows 61–62 are one finding)** · unsourced 0.

### Notes (not failing)

- **N1.** `sources.md` defends the Freestylers board as "B&B taken because the engine product and the page's package text agree". That is the tiebreaker rejected in ruling 3.
- **N2.** "Twelve rooms": the count appears twice on the owner's site and is not in any contradiction entry. The engine calls the dorm "our **new** gallery room" (`rooms[2]`), so the count may have changed. Owner item, not a finding.
- **N3.** The category scores give the platform but no count. The count (80) is on the rating block on the same page, and playbook §6 exempts scores in body copy from the date. Location 7.7 and Free WiFi 5.6 are not quoted, and the amenities list "Free WiFi". No claim is made beyond the numbers, so this is not a finding.
- **N4.** "transport to the spots": the engine says "Walk or transport (depending on surf location)". The copy does not claim a ride to every session, so it passes.

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing / featureLine | ✓ | ✓ | ✓ | ✓ | ✓ | owner's line kept in `featureLine` |
| intro | ✓ | ✓ | ✓ | ✓ | ✓ | |
| day | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Pick your level | ✓ (openings now differ) | ✓ | ✓ | ✓ | **✗** | **V1** below |
| One price, three levels | ✓ | ✓ | ✓ | ✓ | ✓ | holds the page's honest limit (room supplement, capture date) |
| Twelve rooms | ✓ | ✓ | owner's "one big happy family", "of course" kept as owner prose | ✓ | ✓ | |
| Between sessions | ✓ | "yoga, meditation and sound healing" is the source's own list, not a rhetorical triad | ✓ | ✓ | ✓ | |
| What guests say | ✓ | ¶2 is three items, but it is Fanny's own list (humanizer's note agreed) | ✓ | ✓ | ✓ | |
| Getting here | ✓ | ✓ | ✓ | ✓ | ✓ | |

At least one honest limit: yes (price ¶1 S3). Register matches the owner's: yes.

- **V1 — levels ¶1 S1 (humanizer).** "Level 1 – Fomies is your first time on a board, and you don't need any surfing experience." The humanizer made this sentence. It says a package *is* the reader's first time on a board, which does not make sense and stumbles when read aloud. The draft did not have this problem.

## Completeness (`surf_camp`)

Must-haves: `contact` (phone, email, engine, WhatsApp as a booking link) ✓ · `lessons[]` ×4 ✓ · `rooms[]` ≥ 1 ✓ (but see F6) · photos are outside the copy. Should-haves: `stayInfo` ✓, `amenities[]` ✓, `ratings[]` ✓, `bookingLinks[]` ✓ (no Booking.com row; `sources.md` gives the reason), `credentials[]` ✓. Deliberately empty, each with a stated reason: `season`, `languagesSpoken`, `lessons[].groupSize` / `.durationMin`, `lessons[3].price`, `openingHours`, `hoursNote`, `priceList`.

- **D1 — duplication (copywriter).** The "Between sessions" block restates `amenities[1]`, `[2]`, `[3]` and `[4]` (yoga chalet, yoga/meditation/sound healing sessions, ice baths, lookout terrace with ocean view) and adds nothing else. Schema rule: "A fact lives in exactly one field." Owner prose in rooms ¶2 (pool, bar) overlaps `amenities[0]` / `[6]`. That is the owner's own paragraph, so it is a note only.

## Fix list — what must change to pass

Back to the **copywriter** (facts):

| ID | Where | Sentence | Verdict | Why |
|---|---|---|---|---|
| F1 | intro ¶2 S1 | "The lodge is on the beach at Kabalana, in the green of the jungle." | contradicted | `contradictions[5]` open; Booking puts Kabalana Beach 350 m away and the nearest beach (Kathaluwa West) 40 m, and the same page prints that |
| F2 | `spot` S1 | "On the beach at Kabalana, overlooking two spots: The Rock and South Point." | contradicted | as F1 |
| F3 | intro ¶2 S2 | "…and a bed-and-breakfast stay for independent travellers." | contradicted | `contradictions[1]` open (B&B vs half board); the engine's label is not a resolution |
| F4 | levels ¶4 | "Freestylers is bed and breakfast only, …" | contradicted | as F3 |
| F5 | `lessons[3].includes` | "Bed and breakfast, from 4 nights" | contradicted | as F3 ("from 4 nights" is fine) |
| F6 | `rooms[0]`, `rooms[1]` | the engine's two options shown as the lodge's room list | contradicted (by implication) | `contradictions[3]` open; the site and Booking list other rooms and a different twin bed set; the page does not say the list is the engine's date-dependent package options |
| F7 | day ¶1 S1 | "Mornings start with your group and a surf session." | contradicted | `business.day_at_the_camp`: Levels 1–2 start with yoga, then surf; only Level 3 drops yoga |
| D1 | "Between sessions" block | whole block | duplication | repeats `amenities[1–4]` |

Back to the **humanizer** (voice):

| ID | Where | Sentence | Why |
|---|---|---|---|
| V1 | levels ¶1 S1 | "Level 1 – Fomies is your first time on a board, and you don't need any surfing experience." | a package "is your first time"; reads wrong aloud; introduced in the rewrite |

Everything else passes. Round 2 will be a full re-check of every sentence (hard constraint 6), not only these. If round 2 still fails, the round after it is the third pass, and base.md sends the business out of the run (`mode: test`).

---

## Round 2 — full-file re-check after copywriter round 2 and humanizer round 2, 2026-09-28

Reviewer: copyeditor 0.3.1. Independent of the copywriter and the humanizer. Hard constraint 6 applies: every sentence and field of `copy/en.json` was re-traced to `dossier/global-surf-adventures/dossier.json`, changed or not. Nothing is carried over from round 1 on trust.

## Verdict: **PASS** (round 2)

0 `unsourced` · 0 `contradicted` · voice audit clean · completeness covered (every empty required field has a stated reason; see C1).

### Scope check

- Dossier unchanged since round 1 (last commit `a372213`, station 3).
- `en.json` round 1 (`27b647e`) → now (`f6ac133`). Every change is a removal or a narrowing:
  - intro ¶2 S1 and S2 · day ¶1 S1 · levels ¶1 S1 and ¶4 · "Between sessions" block removed · `spot` S1 · `lessons[3].includes` · `rooms[]` → `[]`.
  - No new fact appeared.
- Copywriter round 2 (`78ce8b5`) → humanizer round 2 (`f6ac133`): one sentence changed, levels ¶1 S1 (colon → ", no surfing experience needed"). Same fact.
- `en.draft.json` is still the round-1 draft; the round-2 fixes were made on the humanised file. The diff that shows what the humanizer did this round is `78ce8b5` → `f6ac133`, above.
- Testimonials: all nine machine-checked again (text, author, source identical to `reviews.quotes[]`).
- Booking links: unchanged, and re-checked against `booking.engine_url` and `engine_products[0–3]`.
- Lengths within limits: `spot` 102/200; `lessons[].includes` 135 / 135 / 136 / 13.

### Round-1 findings

| ID | Round 1 | Now | Closed? |
|---|---|---|---|
| F1 | intro ¶2 S1 "on the beach at Kabalana" | "The lodge sits in the green of the jungle." | yes |
| F2 | `spot` "On the beach at Kabalana, …" | "The lodge overlooks two spots, The Rock and South Point." | yes |
| F3 | intro ¶2 S2 "a bed-and-breakfast stay" | "a Freestylers package for independent travellers" | yes |
| F4 | levels ¶4 "bed and breakfast only" | "Freestylers is the package for independent travellers …" | yes |
| F5 | `lessons[3].includes` "Bed and breakfast, from 4 nights" | "From 4 nights" | yes |
| F6 | `rooms[0–1]` engine options as the room list | `rooms[]` = `[]` | yes (see C1) |
| F7 | day ¶1 "Mornings start with … a surf session" | "Head out with your group for a morning surf." | yes (no order claimed) |
| D1 | "Between sessions" repeats `amenities[1–4]` | block removed | yes |
| V1 | "Level 1 – Fomies is your first time on a board" | "… is for your first time on a board, no surfing experience needed." | yes |

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Global Surf Lodge Kabalana" | `business.name.value` | sourced |
| 2 | `businessType` | `surf_camp` | `businessType`; `business.type.value` | sourced |
| 3 | `tagline` | "Surf weeks for all levels" | `offers[0–2]`; `business.description_packages` "weekly retreats, available for all levels" | sourced |
| 4 | `tagline` | "on Sri Lanka's south coast" | `location.area_name`; `description_packages` "South Coast of Sri Lanka" | sourced |
| 5 | `tagline` | "a few steps from the ocean" | `location.distance_to_beach.value` (owner); consistent with `.others[0]` 40 m | sourced |
| 6 | `closing` S1 | "Book the week for your level." | `offers[0–2]`; `booking.engine_products[0–2]` | sourced |
| 7 | `closing` S2–S3 | "Not sure which one fits? Ask us on WhatsApp first." | `contact.whatsapp.value`, `booking.whatsapp.value`; `contradictions[0]` true on both sides (round 1, ruling 4) | sourced |
| 8 | `featureLine` | "Footwear is discouraged. Chilling out is inescapable." | `business.description` (owner) | sourced |
| 9 | intro heading | "Next set is yours" | `business.description` | sourced |
| 10 | intro ¶1 | "We are surfing obsessed, and we invite you to join us." | `business.description` verbatim | sourced |
| 11 | intro ¶2 S1 | "The lodge sits in the green of the jungle." | `business.experiences.note` "nestled in the lush green jungle". No place name, so `contradictions[5]` is not touched | sourced |
| 12 | intro ¶2 S2a | "We run surf weeks for three levels, from your first wave to carving," | `offers[0–2]`, `levels[0–2]`; `offers[0].description` "Catch your first wave"; `offers[2].description` "already carving it up" | sourced |
| 13 | intro ¶2 S2b | "and a Freestylers package for independent travellers." | `booking.engine_products[3]` (name); `offers[3].description` "The package perfectly fit independent travelers". No board stated (`contradictions[1]` not touched) | sourced |
| 14 | day heading | "Surf, breakfast, surf again" | `business.day_at_the_camp`: morning surf → breakfast → afternoon surf. This order holds for every level, with or without the yoga that comes first on Levels 1–2 | sourced |
| 15 | day ¶1 S1 | "Head out with your group for a morning surf." | `day_at_the_camp` "head out with your group for a refreshing morning surf session"; says nothing about what comes first | sourced |
| 16 | day ¶1 S2 | "Back at the lodge, a big, healthy breakfast is waiting." | `day_at_the_camp` | sourced |
| 17 | day ¶2 S1 | "After that the day is yours: relax at the lodge, or go out and explore before the afternoon surf." | `day_at_the_camp` | sourced |
| 18 | day ¶2 S2 | "The evening ends with dinner, together with the other guests." | `day_at_the_camp` "End your day with an epic dinner together with the other guests" (a typical day) | sourced |
| 19 | levels heading | "Pick your level" | — | framing |
| 20 | levels ¶1 S1 | "Level 1 – Fomies is for your first time on a board, no surfing experience needed." | `offers[0].description`; `booking.engine_products[0].label` | sourced |
| 21 | levels ¶1 S2 | "You learn on soft boards, on easy reef breaks and the sandy beaches around the lodge." | `facilities[10]`; `location.spot.note` (beginners) | sourced |
| 22 | levels ¶2 S1 | "Level 2 – Rollers is for when you can stand up, but paddling out … is still a struggle." | `offers[1].description` | sourced |
| 23 | levels ¶2 S2 | "You surf easy reefs and beach breaks with deep-water channels, on soft boards." | `location.spot.note` (intermediates); `facilities[10]` | sourced |
| 24 | levels ¶3 S1 | "Level 3 – Riders: you're already carving, and you want to sharpen your skills." | `offers[2].description` | sourced |
| 25 | levels ¶3 S2 | "From Galle to Matara, you surf the best spot of the day for the conditions, the wind and the tide." | `location.spot.note` (advanced) | sourced |
| 26 | levels ¶4 | "Freestylers is the package for independent travellers who want to soak up the lodge's vibe." | `offers[3].description` "The package perfectly fit independent travelers who want to soak up the vibes of our Lodge"; no board stated | sourced |
| 27 | price heading | "One price, three levels" | `offers[0–2].price` all 1466 | sourced |
| 28 | price ¶1 S1 | "The three surf weeks cost the same, per person for seven nights." | `offers[0–2].price`, `.unit` | sourced |
| 29 | price ¶1 S2 | "That is the base price the booking engine showed on 28 September 2026." | `offers[].note` "Engine 'Base price'"; `.fetched_at` 2026-09-28 (round 1, ruling 1) | sourced |
| 30 | price ¶1 S3a | "The room you choose can add to it;" | `offers[0].note` room supplement | sourced |
| 31 | price ¶1 S3b | "the engine shows any supplement once you pick your dates." | `offers[0].evidence` screenshot (13 Feb 2027): start date set → "Accommodation $140.04" line | sourced |
| 32 | price ¶2 S1 | "Packages start on a Saturday and run for 7, 14, 21 or 28 nights, for up to six guests per booking." | `offers[0–2].duration_options`; `.max_guests_per_booking` 6 | sourced |
| 33 | price ¶2 S2 | "Drinking water and local coffee and tea are unlimited." | `includes_engine` and `includes_site` both list it | sourced |
| 34 | rooms heading | "Twelve rooms, one big family" | `business.staying_with_us` "just 12 suites … one big happy family"; `rooms[0].note` "12 … rooms". The count is not part of `contradictions[3]`, which is about the mix | sourced (round-1 N2 stands) |
| 35 | rooms ¶1 S1 | "There are just twelve rooms." | as row 34 | sourced |
| 36 | rooms ¶1 S2 | "That keeps a stay here personal, part of one big happy family." | `staying_with_us` (owner) | sourced |
| 37 | rooms ¶1 S3 | "Every room has air conditioning, a ceiling fan, a safe box, a private toilet and shower, a socket next to each bed and, of course, a board rack." | `room_amenities.value` "All of our rooms have …"; "private" is narrower than "en-suite", not wider | sourced |
| 38 | rooms ¶2 | "When you're not on the water, lie out on a sunbed by the pool under the palms, … Sri Lankan produce from the lodge kitchen." | `staying_with_us` | sourced |
| 39 | guests heading | "What guests say" | — | framing |
| 40 | guests ¶1 | "Booking.com guests score the staff 9.5 out of 10, and the facilities and the cleanliness 9.2 each." | `reviews.booking.categories`; count 80 on `ratings[0]` | sourced (round-1 N3 stands) |
| 41 | guests ¶2 | "In their reviews they write about the pool area, the open-air bathroom and the breakfast bowls." | `reviews.quotes[1]`; pool also `[3]`, `[5]` | sourced |
| 42 | getting heading | "Getting here" | — | framing |
| 43 | getting S1 | "Booking.com puts Kathaluwa West Beach 40 m from the lodge and Kabalana Beach 350 m." | `location.distance_to_beach.others[0]` | sourced |
| 44 | getting S2 | "Kathaluwa station is 400 m away, Ahangama Beach 4 km and Koggala Airport 3.9 km." | same key | sourced |
| 45 | `spot` S1 | "The lodge overlooks two spots, The Rock and South Point." | `location.spot.value` "overlooking 2 great spots – The Rock & South point" (owner); "great" dropped; no place name | sourced |
| 46 | `spot` S2 | "More waves are a few minutes away by tuk-tuk." | `location.spot.value` | sourced |
| 47 | `season` | `null` | `season.value` null; `gaps[]` | correctly empty |
| 48 | `languagesSpoken` | `[]` | `languages_spoken.value` null; `gaps[]` | correctly empty |
| 49 | `lessons[0–2].label` | Level 1 / 2 / 3 names | `booking.engine_products[0–2].label` | sourced |
| 50 | `lessons[0–2].level` | `first_time`+`beginner` / `intermediate` / `advanced` | `levels[0–2]` | sourced |
| 51 | `lessons[0–1].includes` | "7 nights, 7 breakfasts, 5 dinners, 5 guided 2-hour surf sessions, 5 theory lessons, all equipment, transport to the spots, an excursion" | in both `includes_engine` and `includes_site`; equipment also `business.concept`; transport `facilities[9]` (round-1 N4 stands) | sourced |
| 52 | `lessons[2].includes` | same, "coached" | `offers[2].includes_engine` / `.includes_site` | sourced |
| 53 | `lessons[0–2].price/currency/unit` | 1466 / USD / `per_person` | `offers[0–2]` (round 1, ruling 1) | sourced |
| 54 | `lessons[3].label` | "Freestylers – B&B only" | `booking.engine_products[3].label` — the product's name (round 1, ruling 3) | sourced |
| 55 | `lessons[3].includes` | "From 4 nights" | `offers[3].gap` "min 4 nights" (entry carries the engine `source_url`) | sourced |
| 56 | `credentials[0]` | "ISA-certified surf guides" | `credentials[0]` | sourced |
| 57 | `rooms[]` | `[]` | `contradictions[3]` open; reason stated in `sources.md` "Room mix" | correctly empty (C1) |
| 58 | `stayInfo` check-in / check-out | 14:00–20:00 / until 11:00 | `stayInfo.checkIn.value`, `.checkOut.value` | sourced |
| 59 | `stayInfo.note` | "No pets and no extra beds; cots are free on request for children up to 5." | `stayInfo.rules` | sourced |
| 60 | `amenities[0–14]` | fifteen rows, unchanged | `facilities[0]`, `[1]`, `[7]` (no "daily"), `[6]`, `[2]`, `[3]`, `[4]`, `[11]`, `[5]`, `[12]`–`[17]` | sourced |
| 61 | `ratings[0]` | Booking 8.6/10, 80, URL, 2026-09-28 | `reviews.booking` | sourced |
| 62 | `testimonials[0–8]` | nine quotes | `reviews.quotes[1, 2, 9, 3, 0, 8, 4, 5, 6]` verbatim (machine-checked) | sourced |
| 63 | `contact.phone` | "+97299733943" | `contact.phone.value` (HQ line; owner item) | sourced |
| 64 | `contact.whatsapp` | `""` | the engine stays the primary action (`booking.path`); WhatsApp is `bookingLinks[5]` | correctly empty |
| 65 | `contact.email` | "info@globalsurf.com" | `contact.email.value` | sourced |
| 66 | `contact.address` | "Henewatta Addara Gederawata, Ahangama 80650, Sri Lanka" | `location.address.value` (Google; capitalised per playbook §6) | sourced |
| 67 | `contact.mapUrl` | Google place URL | `location.map_url.value` | sourced |
| 68 | `bookingLinks[0]` | "See the weekly surf packages and dates" | `booking.engine_url.value` | sourced |
| 69 | `bookingLinks[1–4]` | "Book Level 1 – Fomies" … "Book Freestylers – B&B only" | `booking.engine_products[0–3]` (labels are product names) | sourced |
| 70 | `bookingLinks[5]` | "Ask on WhatsApp" → `wa.me/972523593240?text=…` | `booking.whatsapp.value` | sourced |

Counts: sourced 61 · framing 3 · correctly empty 4 · unsourced **0** · contradicted **0** (70 rows).

Open contradictions, each checked against the whole file:
- `[0]` WhatsApp: true on both sides.
- `[1]` Freestylers board: no board stated anywhere except the engine product's name.
- `[2]` inclusions: only items both lists share.
- `[3]` room mix: no room list.
- `[4]` yoga frequency: no frequency, and yoga now appears only as an amenity.
- `[5]` location name: "Kabalana" appears only in the business name and in Booking's attributed "Kabalana Beach 350 m".
- `[6]` Mozambique: absent.

### Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing / featureLine | ✓ | ✓ | ✓ | ✓ | ✓ | |
| intro | ✓ | ✓ | ✓ | ✓ | ✓ | ¶2 S1 is short now; plain, and it does not stumble |
| day | ✓ | ✓ | ✓ | ✓ | ✓ | the imperative opening fits the owner's register |
| Pick your level | ✓ | ✓ | ✓ | ✓ | ✓ | V1 closed; one colon left (L3) |
| One price, three levels | ✓ | ✓ | ✓ | ✓ | ✓ | the honest limit (room supplement, capture date) |
| Twelve rooms | ✓ | ✓ | owner's phrases kept as owner prose | ✓ | ✓ | |
| What guests say | ✓ | ¶2 is Fanny's own list | ✓ | ✓ | ✓ | |
| Getting here | ✓ | ✓ | ✓ | ✓ | ✓ | |

Nothing reads as generated. At least one honest limit: yes. Register matches the owner's: yes.

### Completeness (`surf_camp`)

- **C1 — `rooms[]` empty.** base.md's completeness test is "copy or a stated reason it is empty". The reason is stated in `sources.md` ("Room mix": `contradictions[3]` is open, and any one list would state one side of it), so the test is met.
  - This leaves `schemas/business-types.md`'s `surf_camp` must-have "≥ 1 `rooms[]` row" unmet.
  - The ledger (18:19:42Z, copywriter line) records this as an orchestrator decision: an owner item, with the rooms shown through photos.
  - That is a buildability decision for the orchestrator or Shahar, not a copy verdict. It is recorded here so it is not lost.
- **Other required fields:**
  - `contact` (phone, email, engine, WhatsApp as a link) ✓; `lessons[]` ×4 ✓.
  - Empty, each with a stated reason: `season`, `languagesSpoken`, `groupSize` / `durationMin`, `lessons[3].price`, `openingHours`, `priceList`.
- **Duplication:**
  - The facts that were in "Between sessions" now live only in `amenities[]`.
  - Rooms ¶2 (pool, bar) overlaps `amenities[0]` / `[6]`. That is the owner's own paragraph, so it is a note only.

### Owner items carried forward (not copy failures)

- The room list (C1).
- The Freestylers board and price.
- Which phone and WhatsApp reach the lodge (+972 HQ vs +94 lodge).
- The engine price must be confirmed before go-live.
- One inclusion list per package.
- Level 1 spelling ("Fomies" vs "Foamie").
- The twelve-room count against the engine's "new gallery room".

### Verdict: **PASS** (round 2, full-file re-check)

Ledger line due (not written by me): `copy_humanised → copy_passed`, with the note "round 2 PASS: 70 rows, 0 unsourced, 0 contradicted; all 9 round-1 findings closed; rooms[] empty (owner item, surf_camp must-have unmet)".
