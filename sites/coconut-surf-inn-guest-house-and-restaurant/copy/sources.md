# copy sources: coconut-surf-inn-guest-house-and-restaurant · en

Copywriter 0.5.0 · run 2026-10-midigama-01 (test) · 2026-11-05. Facts come from `dossier/coconut-surf-inn-guest-house-and-restaurant/dossier.json` only (harvester 0.5.0, harvested 2026-11-04). `audit.json` `recommended` (auditor 0.1.3) is used only for how to sell: the primary action, the offer framing (fan rooms and A/C rooms told apart, F5/F6), the restaurant hours in `hoursNote`, the ratings to show and the closing intent. It is never used as a fact. Four auditor notes handed over with the brief that the dossier does not yet carry are listed under "Auditor notes" below, with how each was used.

Caps were re-read from `schemas/site-content.md` v0.11 this round: `copyBlocks` ≤ 8 (7 used), body ≤ 1500 (longest 353 after the humanizer pass), heading ≤ 120 (longest 23); `testimonials` ≤ 12 × ≤ 600 chars (12 used, longest 467); `rooms[].note` ≤ 140 (longest 77); `stayInfo.note` ≤ 200 (112 after the humanizer pass); `hoursNote` ≤ 200 (61); `tagline` / `closing` ≤ 140 (91 / 88 after the humanizer pass); `spot` / `season` ≤ 200 (135 / 108 after the humanizer pass); `amenities[].label` ≤ 60 (longest 44); `bookingLinks[].label` ≤ 60 (26).

`en.json` and `en.draft.json` were the same file when the copywriter handed off. After the humanizer 0.2.1 pass (2026-11-05), `en.draft.json` is the copywriter's draft and `en.json` the rewrite; the changes are in `humanizer-notes.md`, and the rows below describe `en.json`.

**This is the owner-prose case.** The host wrote a long description on his Airbnb listing (`business.description`, origin_note: the host's own words). Three of its sentences are used as the site's own copy, in the business's voice (blocks [0] ¶2, [1] ¶1, and `spot`). The edits are listed under "Edits to the owner's words". The parts written before the renovation are not used: "09 rooms", "ceiling fan, Wall fan" in every room, and "(Break fast not included to the Price)" (`business.description.origin_note`, `contradictions[5]`, `[6]`). The rest of the copy is written from facts.

Index keys: `reviews.quotes[n]` follows the dossier's order (0 = Laurie … 117 = Stefan). `room_types[0–5]` = Budget Double, Deluxe Double (2 Adults + 1 Child), Budget Single, Superior Double, Deluxe Family, Deluxe Double with Balcony. `facilities[n]` follows the dossier's order (0 = restaurant … 9 = front desk/security/laundry).

## Harvest decisions and auditor notes followed

| Decision | How the copy handles it |
|---|---|
| The phone is Google's +94778921396 (`contradictions[2]`) | `contact.phone`. +94713177978 (`contact.phone_unverified`) appears nowhere. |
| The "Coconut Beach" Google place (4.8 · 120) is the beach, not the inn (`business.aliases[1]`, `contradictions[3]`; auditor note) | Its rating is not in `ratings[]` and is not quoted anywhere. The Google row is the inn's own 4.8 · 88. |
| No pool, gym, spa, public bath or windsurfing (`facilities_note`, `contradictions[8]`; auditor note: Google's hotel details show "Pool" and "Fitness center" crossed out) | None appears anywhere. The "skylit courtyard … shallow channel of water" (block [4]) is the light-well channel, which `facilities_note` says is not a pool. It is described as a channel and never as a pool or water feature to swim in. |
| Budget rooms are fan-only with no hot water (`room_types[0,2]`, `critical_themes[0]`, owner replies at `quotes[20]` and `[71]`; auditor note) | Both budget `rooms[]` notes say "Fan and mosquito net; no air conditioning and no hot water." The four A/C rooms say "Air conditioning, fan and hot water." |
| Payment: Booking says "Cash", and the auditor saw Visa and Mastercard icons beside it (`booking.payment`; auditor note) | Payment is **not stated anywhere**. The sources disagree, so the copy promises neither cash only nor cards. Owner item. |
| The break is named by the business (`break`, `location.spot`; auditor note) | `spot` uses the host's own sentence. See the next row for break type. |
| Break type, level and season come from a third-party guide (auditor note; `location.spot_reference`) | **Break type is the owner's.** The host's Airbnb text says "Coconuts is a consistent A-frame reef break" (`business.description`, `break.evidence[0]`), so `spot` keeps "a consistent A-frame reef break" as his words. **Level** ("intermediate") is third-party only and is not used anywhere. **Season** is used once, in `season`, attributed by name to the guide (judgement call, below). The auditor's note and the dossier differ on break type; flagged for the copyeditor. |
| Town names (`contradictions[1]`, `location.place_name_used`, audit F8) | `contact.address` is Google's (Weligama 81700). The tagline gives "Gurubebila, between Midigama and Weligama", the dossier's recommended form, which the owner should confirm. |
| House number 44 or 49 (`contradictions[0]`) | Not stated. Google's inn address has no number, and it is used as is. |
| Owner name (`business.people`, `contradictions[9]`) | Only Chinthaka and his family are named. Edwin, Wikum/Vikum and the chef Silva come from guests only, and no chosen quote names them. |
| Breakfast is rate-dependent (`stay_info.breakfast`, `contradictions[5]`) | Block [2]: "Whether breakfast comes with your room depends on the rate you book." Guests saying it was included stay inside their quotes (Rosa). |
| Live prices are not content (`offers_note`, schema rule) | `priceList[] = []`, and `rooms[]` has no price. `bookingLinks[0]` and `closing` send the reader to live dates. |
| Booking's "Beachfront" and its 1.3 km nearest-beach figure are wrong (`location.distance_to_beach`, `contradictions[4]`, audit F7) | Neither is used. "right next to the beach" is the host's phrase (block [0] ¶1). |
| Airbnb's listing describes the old house (audit F6) | Airbnb is not a `bookingLinks[]` row. Its rating is a `ratings[]` row because the audit recommends it (judgement call, below). |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Coconut Surf Inn" | `business.name.value` (Booking, Airbnb, the logo sign img-002). Google's longer name appears in block [6] ¶3. |
| `businessType` | `beach_lodging` | `business.type`, `business.businessType_note` |
| `tagline` | "A guesthouse in Gurubebila, between Midigama and Weligama, on the south coast of Sri Lanka." (91) | "guesthouse": the host's own word (`business.description`: "Coconut Surf Inn guesthouse"; Booking's type "Guest house", `business.type.note`). "Gurubebila, between Midigama and Weligama": `location.place_name_used` (sign: Gurubebila; host: Midigama; Google/Booking: Weligama), whose note recommends exactly this form. **Owner to confirm.** "South coast of Sri Lanka": shared context about the place (the Galle–Matara coast; `location.nearby`). No star rating (`contradictions[10]`). |
| `closing` | "Booking.com has the live dates and prices. If you'd rather ask something first, call us." (88; humanizer 0.2.1 reworded both sentences) | Task: `audit.recommended.closing_intent` (not a fact). Booking.com: `booking.engine_url`. "Call": `contact.phone`, the only direct channel (`booking.direct_channels`). No reply time is promised (`booking.reply_time_hint` is Airbnb's "a few days or more"). |
| `featureLine` | null | No owner line fits a feature image without repeating `spot` or block [0]. Left for the designer and the owner. |
| `spot` | "Coconuts, a consistent A-frame reef break, is in front of the guesthouse. Plantations is a more mellow wave, a 100 m walk up the beach." (135; humanizer 0.2.1 put the second sentence back closer to the host's "Plantations is a more mellow wave, located just 100 meters walk up the beach") | The host's words (`location.spot.value`, `business.description`, `break.evidence[0]`), restructured; see "Edits". Confirmed by the business's Booking Q&A answer "coconut surf break ( 60m)" (`business.owner_voice`), which is not quoted because the 60 m and "in front" are the same fact. |
| `season` | "According to the Sri Lanka Travel Pages surf guide, the season at Coconut Point runs from November to April." (108; humanizer 0.2.1 reworded, same attribution and months) | `location.spot_reference` (srilankatravelpages.com, fetched 2026-11-04), attributed by name because `season.gap` says the business publishes no season. **Judgement call**: playbook §7 and base.md's "shared context" allow a sourced fact about the place. It is never stated as the business's own season. If the copyeditor rules that `season` must be the owner's words only, set it to null; the gap is already an owner item. The review-date cluster (124 of 142 reviews from Nov–Apr) is not used: it is an inference. |
| `openingHours` | `[]` | Lodging. Reception hours are not published beyond the 24-hour front desk (an `amenities[]` row); `hours_note.gap`. The restaurant's hours go in `hoursNote` so they are not read as the inn's hours. |
| `hoursNote` | "The restaurant upstairs is open every day from 7:30 to 22:00." (61) | `restaurant_hours[0]` (the restaurant's Google listing, 7:30 am–10 pm daily); placement per `audit.recommended.offer_framing`. Google flagged one Sunday "Hours might differ" for Diwali. That is a one-off and is not stated. |
| `priceList`, `lessons`, `credentials`, `rentals`, `brands` | `[]` | No price is published (`offers_note`). There are no lessons or board rental (`business.type.note`, `facilities_note`). Booking's "Yoga classes" tick is not a service (`facilities[1].note`). |
| `languagesSpoken` | `["en"]` | `languages_spoken[0]`, `contradictions[11]` (English only is corroborated) |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] intro heading | "By the beach" | framing; `location.distance_to_beach` |
| [0] intro ¶1 | the guesthouse is tucked away from the busy Galle–Matara road, right next to the beach | The host's words (`business.description`: "tucked away from the busy Galle - Matara road, but it right next to the beach"), with the grammar mended; see "Edits". Guests agree it is off the main road (Elinor, Dean in their quotes). |
| [0] intro ¶2 | "Next to the guesthouse is a large open grassed area overlooking the beach, where the friendly locals and tourists alike gather to watch the surf, play cricket, socialise and enjoy beautiful sunrises and sunsets." | The host's words, verbatim (`business.description`). Photo img-009 shows the green, the beach shacks and the reef from the roof. |
| [1] about heading | "The Eranga family home" | `business.description`, `business.people[0]` |
| [1] about ¶1 | "Coconut Surf Inn is the Eranga family home, so staying here means you will experience the endless warm smiles and kind hospitality of the gracious host Chinthaka and his family." | The host's words, verbatim except one spelling: "Chintaka" becomes "Chinthaka", the spelling he signs with (`quotes[87].owner_reply`, "Chinthaka Eranga") and his Airbnb host name (`business.people[0].evidence`). See "Edits". |
| [1] about ¶2 | Chinthaka has been a host on Airbnb for 13 years | `business.since.note`: "say 'hosting on Airbnb for 13 years' if used, not an opening year". No opening year is given. |
| [2] about heading | "The restaurant upstairs" | `facilities[0]` |
| [2] about ¶1 | a long covered room on the upper floor, with cushioned benches, low tables and a view of the sea (a fragment under the heading "The restaurant upstairs"); all meals, snacks and drinks are available; breakfast comes with some rates and not with others | Upper floor: `facilities[0]` (Google "Coconut Surf Restaurant (2nd floor)"). Covered room, benches, low tables: photos img-105 ("covered upper-floor restaurant lounge: cushioned bench seats, low tables, sea view") and img-107 ("the long upper-floor restaurant"). Sea view: `location.views`, the owner's "the sea view from our terraces" (`business.owner_voice.note`). "All meals, snacks and drinks available": the host's words (`business.description`), re-tensed into a sentence. Breakfast: `stay_info.breakfast`, `contradictions[5]` resolution. Dishes (sesame tuna) and service stay in Meagan's and Abdulrahman's quotes. "Open to the public" is not stated as such: the restaurant's own Google listing (¶2) says it plainly enough. |
| [2] about ¶2 | the restaurant has its own Google listing, Coconut Surf Restaurant (2nd floor), where it's rated 4.6 from 39 reviews | `business.aliases[0]`, `reviews.google_restaurant` (4.6 · 39, fetched 2026-11-04). A score inside body copy needs no date (playbook §6). It is not a `ratings[]` row: the schema has one row per platform, and the inn's own Google score holds it. This also helps the traveller who meets two Google places (audit F4). |
| [3] about heading | "On the roof" | `facilities[1]` |
| [3] about ¶1 | the terrace up top is shaded with thatch, and has a swing seat, hammocks, benches and tables; beyond the palms, the sea | `facilities[1].value` ("rooftop terrace with thatched shade, hammocks, swing seats and sea view"); photos img-100–104 (swing seat, hammock, benches and tables under the thatch, sea and palms behind). Surf checks and morning yoga come only from guests (`facilities[1].note`), so they are not stated. The rooftop's view of the surf is in V's quote. |
| [4] about heading | "Inside the house" | framing |
| [4] about ¶1 | the middle of the house is a skylit courtyard; palms grow out of a shallow channel of water there, between the windows of the rooms | `facilities[3]` ("light-well courtyard with palms and water channel"); photos img-006 ("skylit light-well with palms planted in a shallow turquoise water channel"), img-007 ("courtyard water channel with palms between the red-framed windows of the rooms"), img-011. Not a pool (`facilities_note`). |
| [4] about ¶2 | hammocks on the verandas, an outdoor shower in the garden, a clothes line, and a rack for your boards | The host's list (`business.description`: "Hammocks, a shady restaurant area and garden, outdoor shower, clothes line and surf board rack are all provided"); `facilities[2]`, `[3]`. Verandas: photos img-017, img-030, img-098. Outdoor shower in the garden: img-003. Board rack: img-016 ("surfboards racked against the wall"). These hammocks are not the roof hammocks of block [3] (img-103); both places have them. |
| [5] offer heading | "Six kinds of room" | `room_types` (6) |
| [5] offer ¶1 | Booking.com lists six, starting with a single for one person and going up to a family room for four; each one has its own entrance, and its own bathroom with a shower | `room_types[0–5]`: six types; Budget Single sleeps 1, Deluxe Family sleeps 4. Every type lists "Private bathroom", "Bath or shower" and "Private entrance", and every room description names a shower. Attributed to Booking.com, because the host's Airbnb "09 rooms" is a pre-renovation count (`room_count.note`); the number of rooms is not stated. Fan/A/C and hot water are in `rooms[]` only (each fact once). |
| [6] info heading | "Getting here" | framing |
| [6] info ¶1 | Koggala Airport is 11 km away; if you want a taxi from the airport, let us know and we'll arrange one; there's a charge | `location.airport` (Booking: 11 km, "the property offers a paid airport shuttle service"); the business's own Booking Q&A answer "If you want to arrange a taxi from airport to our hotel please let us know" (`business.owner_voice.note`), re-voiced as "let us know and we'll arrange one". "There's a charge" is Booking's "paid airport shuttle". Samantha's driver complaint (`facilities[5].note`) is not used. |
| [6] info ¶2 | the nearest train station is Kumbalgama, about a 13-minute walk; Midigama station 1.4 km; Booking.com puts the centre of Weligama 3.3 km from the house | `location.distance_to_station` (Booking: Kumbalgama "1.2 km on foot, 13 min"; Midigama station 1.4 km); `location.distance_to_centre` (Booking FAQ). Beach distances from Booking (Weligama Beach 2.2 km, Ahangama Beach 2.6 km) are left out, because Booking's beach geodata for this property is known to be wrong (`contradictions[4]`). The tuk-tuk times are guests' (Liam's quote). |
| [6] info ¶3 | on Google Maps, look for Coconut Surf Inn Guest House and Restaurant | `business.google_listing_name`. This helps a traveller match the site to the Maps pin (audit F3/F4). |

## Edits to the owner's words

| Where | The host wrote | The site says | Why |
|---|---|---|---|
| [0] ¶1 | "…is a peaceful, serene oasis that is tucked away from the busy Galle - Matara road, but it right next to the beach." | "The guesthouse is tucked away from the busy Galle–Matara road, right next to the beach." | Trimmed "This undiscovered gem is a peaceful, serene oasis" (an unsupported superlative, and padding) and mended "but it right". The facts are unchanged. **Copyeditor**: check that this counts as a trim, not a paraphrase. |
| [1] ¶1 | "Chintaka" | "Chinthaka" | His own signed spelling. Otherwise verbatim. |
| [2] ¶1 | "All meals, snacks and drinks available." | "All meals, snacks and drinks are available." | Made into a sentence. |
| `spot` | "Coconuts is a consistent A-frame reef break, located in front of the guesthouse. Plantations is a more mellow wave, located just 100 meters walk up the beach." | "Coconuts, a consistent A-frame reef break, is in front of the guesthouse. Plantations is a more mellow wave, a 100 m walk up the beach." | Restructured to fit a short field; "located" dropped and "just 100 meters walk" becomes "a 100 m walk". The facts are unchanged. (Humanizer 0.2.1 undid the copywriter's second appositive, which made the two sentences mirror each other.) |
| not used | "This undiscovered gem…", "This really is a surfer's paradise.", "This isn't just a place to stay, it's a place to live.", "You can truly immerse yourself in the life of a small Sri Lankan village." | — | Slogans and superlatives (constraint 12, hard constraint 3). The village sentence is harmless but repeats [0] ¶2's point. |

## `rooms[]` (no price, per the schema rule)

Order: smallest to largest. Labels, beds and sleeps are Booking's, so each row matches what the reader sees on Booking.com.

| Row | Copy | Rests on |
|---|---|---|
| [0] | Budget Single Room · 1 single bed · 1 · "Upstairs, 9 m². Fan and mosquito net; no air conditioning and no hot water." | `room_types[2]` (9 m², floor 1, "Fan", "Mosquito net", `air_conditioning: false`). No A/C: the owner's reply at `quotes[71]` ("we did not mentioned the Air-condition available for this budget single room"). No hot water: `critical_themes[0]` ("budget rooms have no A/C or hot water"), the auditor's note. **Owner to confirm** the hot water: the owner's own statement covers the Budget Double only. |
| [1] | Budget Double Room · 1 large double bed · 2 · "12 m². Fan and mosquito net; no air conditioning and no hot water." | `room_types[0]` (12 m², no floor given); the owner's reply at `quotes[20]` ("does not include facilities such as air conditioning or hot water"). |
| [2] | Superior Double Room · 1 large double bed · 2 · "Ground floor, 14 m². Air conditioning, fan and hot water." | `room_types[3]` (14 m², floor 0, A/C, fan). Hot water: the owner's reply at `quotes[20]` ("our other rooms do include that mentioned amenities"). |
| [3] | Deluxe Double Room with Balcony · 1 large double bed · 2 · "Upstairs, 15 m², with a balcony. Air conditioning, fan and hot water." | `room_types[5]` (15 m², floor 1, balcony, A/C, fan); hot water as above. "Balcony" is also in the label; the note repeats it because the row reads as a spec line. **Judgement call** for the copyeditor (cut "with a balcony" if it counts as twice). |
| [4] | Deluxe Double Room (2 Adults + 1 Child) · 1 double bed and 1 large double bed · 3 · "Ground floor, 19 m². Air conditioning, fan and hot water." | `room_types[1]` (19 m², floor 0); hot water as above. |
| [5] | Deluxe Family Room · 1 single bed and 1 large double bed · 4 · "28 m², with a balcony and a garden view. Air conditioning, fan and hot water." | `room_types[4]` (28 m², balcony, garden view, no floor given); hot water as above. |
| not stated | "Landmark view", "Desk", "Clothes rack", "Bidet" | Minor Booking ticks, the same on every row. Private bathroom and entrance are in block [5]. |
| photos (not in the JSON) | Suggested `rooms[].photo`: [0] img-056 · [1] img-047 · [2] img-035 · [3] img-073 or img-076 · [4] img-036 · [5] img-031 | `room_types[].photos`. One photo per room, because guests said the budget rooms did not look like what they booked (`gaps[]` room-type clarity). The deployer sets the uploads; it should check each pick against Booking's room assignment. |

`stayInfo`: check-in from `13:00`, check-out until `11:00` (`stay_info.check_in` / `.check_out`, Booking; Google and Kayak agree on 11:00; Airbnb's 12:00 / 12:00 is not used, `contradictions[7]`). `stayInfo.note` reads "Children of any age are welcome, but there are no cots or extra beds. Pets are allowed on request, at no charge." (112; humanizer 0.2.1 replaced the semicolon), from `stay_info.house_rules` (Booking policies, verbatim in substance). Cancellation terms ("vary according to accommodation type") are Booking's to show. Payment is left out (see the decisions table).

## `amenities[]`

| Rows | Rests on |
|---|---|
| Free WiFi | `facilities[8]` (Booking; score 9.2) |
| 24-hour front desk · 24-hour security and CCTV | `facilities[9]` |
| Room service · Packed lunches | `facilities[4]` (Booking) |
| Swimwear and snacks for sale at the entrance | `facilities[7]` (Booking "Minimarket on site"); photos img-014, img-028 |
| Bicycle hire · additional charge · Car hire · Tour desk | `facilities[6]` (Booking; bicycle hire marked paid, car hire with no charge given, so no note) |
| Laundry · additional charge | `facilities[9]` (Booking, paid) |
| not rows | **Restaurant** (block [2] + `hoursNote`; the audit suggests a row, but the fact would then live in two fields; the designer can draw a restaurant badge from block [2]). Roof terrace (block [3]). Hammocks, outdoor shower, clothes line, board rack, courtyard (block [4]). Airport taxi (block [6] ¶1). Private bathroom and entrance (block [5]). Fan/A/C (`rooms[]`). Breakfast (block [2]). Spa, public bath, movie nights, BBQ, diving, fishing, hiking, pool, gym (`facilities_note`; auditor note). Yoga classes (`facilities[1].note`: not a service). Motorbike/scooter hire (guests only). |

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Booking.com 8.5/10, 142 reviews, captured 2026-11-04 | `reviews.booking` |
| `ratings[1]` | Google 4.8/5, 88 reviews, captured 2026-11-04, url = the inn's place link | `reviews.google`; url `location.map_url`. The inn's listing, never the "Coconut Beach" place. |
| `ratings[2]` | Airbnb 4.44/5, 54 reviews, captured 2026-11-04 | `reviews.airbnb`; `audit.recommended` step 9 asks for it. **Judgement call**: the listing describes the pre-renovation house (audit F6), and its loaded reviews are 2016–2022. It is a real current score, but the link leads to the outdated listing. The deployer may drop the row if the owner closes or rewrites the listing. |
| not rows | Google restaurant 4.6 (39), in block [2] ¶2 instead; Kayak 8.5 (101), a Booking mirror; Tripadvisor 5/5 (4), read only through Google (403); "Coconut Beach" 4.8 (120), not the business | `reviews.kayak`, `reviews.tripadvisor`, `business.aliases[1]` |
| `testimonials[]` (12) | Pulled from the dossier by script, not retyped, positive `text` field only: Erin `[2]`, Janno `[9]`, Meagan `[57]`, Chloe `[49]`, Elinor `[70]`, V `[78]`, Mette `[55]`, Liam `[89]`, Dean `[72]`, Abdulrahman `[87]`, Rosa `[8]`, Tadiwa `[90]`. All `source: booking`, `lang: en`, `date` YYYY-MM (2023-11 to 2026-04) | Chosen to cover what guests praise: the staff (9.4), the location by the breaks (9.6), the restaurant and rooftop view, breakfast, families (Erin, Janno), a solo traveller in a Budget Single (Mette), a surfer in a Budget Double (Liam). All are post-renovation Booking reviews, so they describe the house as it is now. Guest-only facts the copy keeps out of the business's voice live here: sesame tuna and the kitchen staff (Meagan), turtles and beach shacks (Chloe), breakfast included (Rosa), watching surfers from the roof (V), the tuk-tuk to Weligama (Liam), the walk to Coconuts and Plantations (Elinor, Dean). Honest limits stay in guests' words: slow food (Abdulrahman). |
| excluded | Ricardo `[48]` (939 chars), Merethe `[65]` (1243), Alessandro `[68]` (1440), and the Airbnb texts over 600 | A quote is never trimmed. |
| excluded | Ole `[76]`, Konstantin `[81]`, Timo `[82]`, Agnete `[83]` (name "Edwin" as owner/host), Sayod `[42]` ("Mr. Vikum"), Ricardo `[48]` ("Wikum, manager and owner") | Owner identity is unresolved (`contradictions[9]`). A quote naming another person as owner would contradict block [1]. |
| excluded | All Airbnb reviews (2015–2022) | They describe the house before the renovation (no A/C, breakfast extra), which would contradict the rooms and block [2]. Edwin's Airbnb quote `[96]` ("20m from the house, 3 waves") and Liz's `[109]` ("50 metres … Coconuts or Plantations") are good but old. |
| excluded | Every non-English text (`lang` fr, de, sv, nl, ru, xu…) | The site is `en`, and quotes are not translated. |
| excluded | Marcel `[20]`, Samantha `[71]`, Maël `[77]` and other low scores | Their complaints are pitch context (audit F5). The budget rooms' limits are stated plainly in `rooms[]` instead. |

## `contact`, `bookingLinks[]`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | +94778921396 | `contact.phone.value` (Google tel: link; live Kayak and Momondo agree) |
| `contact.whatsapp` / `contact.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap`. Neither is published, and WhatsApp on the mobile number is not assumed. |
| `contact.address` | Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka | `location.address.value`, Google's listing address exactly, with its postcode 81700 from Google itself. Place names are already capitalised. No comma is added after "Road", because Google has none (`location.address.note`). The order is street, town postcode, country. |
| `contact.mapUrl` | https://www.google.com/maps/place/?q=place_id:ChIJI29CG-cU4ToRQhs8notgauI | `location.map_url` |
| `bookingLinks[0]` | "Check dates on Booking.com" → the Booking.com listing | `booking.engine_url`; `audit.recommended.primary_action` "engine". The audit's working label is shortened to the run's house button (the same call as lotus-surf-house and cheeky-monkey); the full sense is in `closing`. |
| not rows | Airbnb, Agoda, HomeToGo, Kayak | Airbnb's listing is outdated (audit F6). Agoda and HomeToGo have no listing URL (`booking.other_engines`). Kayak is a meta-search, not a channel the owner runs. |

## Each fact once (constraint 10)

| Fact | Where it appears |
|---|---|
| Gurubebila / Midigama / Weligama as place | `tagline`; the address in `contact.address` is the postal form |
| off the Galle–Matara road, next to the beach | block [0] ¶1 only |
| the grassed area, cricket, sunrises and sunsets | block [0] ¶2 only |
| Coconuts in front, Plantations 100 m | `spot` only |
| season (third-party) | `season` only |
| Eranga family home, host Chinthaka | block [1] ¶1 (closing's "us" refers to them without restating) |
| 13 years on Airbnb | block [1] ¶2 only |
| restaurant upstairs, sea view, meals, breakfast by rate | block [2] ¶1 only |
| restaurant's Google listing and 4.6 (39) | block [2] ¶2 only |
| restaurant hours | `hoursNote` only |
| roof terrace | block [3] only |
| courtyard; veranda hammocks, outdoor shower, clothes line, board rack | block [4] only |
| six room types; private bathroom and entrance | block [5] only |
| fan / A/C / hot water / size / floor per room | `rooms[]` notes only (balcony also in two labels: see row [3]) |
| airport 11 km, taxi on request | block [6] ¶1 only |
| stations, Weligama centre | block [6] ¶2 only |
| Google listing name | block [6] ¶3 only |
| check-in / check-out, children, cots, pets | `stayInfo` only |
| live prices on Booking.com | `closing` (the sentence) + `bookingLinks[0]` (the button) |
| phone | `contact.phone` only ("call" in `closing` gives no number) |

"Sea" appears in block [2] (the restaurant's view) and block [3] (beyond the roof's palms). These are two places, each with its own view. "Hammocks" appears in [3] (roof) and [4] (verandas), also two places. No slogan lines, and no keyword list repeated across the tagline, intro and CTA. "Midigama" appears once on the first screen (the tagline); "surf" appears in the intro only inside the host's sentence.

## Tempted and did not write: owner items

- **Season and level**: the business publishes neither. The season comes from a third-party guide and is attributed. "Intermediate" (guide) and "less ideal for beginners" (Alice, a negative text) are not used.
- **Prices**: no published rate, only live OTA rates (Kayak "from $35", Google ₪80).
- **WhatsApp and email**: none published. The phone is the only direct line, and Airbnb says replies take "a few days or more". No reply time is promised.
- **Payment**: Booking says cash, with Visa and Mastercard icons beside it.
- **Breakfast**: included on today's OTA rates, but not on the older ones. The menu (roti, fruit, à la carte) is guests'.
- **Restaurant menu and prices**: sesame tuna, tuna steak and coconut ice cream come from Google review topics and guests only.
- **Who runs it today**: Chinthaka is the only person the business names. Guests name Edwin, Wikum/Vikum and the chef Silva.
- **Number of rooms**: "09 rooms" in the pre-renovation text; Booking shows types, not counts.
- **Renovation**: rebuilt around 2022–2023 (photo dates, owner replies). Which rooms are new and which are older is not stated per type, so "old rooms and new" is not written.
- **Hot water in the Budget Single**: implied by `critical_themes[0]` and the auditor, not stated by the owner for that room.
- **Yoga on the roof, surf checks, bonfires and music on the beach, turtles**: guests only.
- **House number** 44 or 49, and whether to say Midigama, Gurubebila or Weligama first.
- **Noise** (thin doors, dogs, the road): not stated in the business's voice, and no quote that dwells on it is chosen. It is an honest gap; the owner may want to address it.
- **"Undiscovered gem", "surfer's paradise", "the best breakfast"**: superlatives, not used in the business's voice.
- **Pool, gym, spa, public bath, windsurfing**: contradicted or unsupported, never used.

## Facts available vs words written

About 55 usable business-side facts: the host's Airbnb prose, three owner replies and Q&A answers, Booking's six room types with sizes, floors and facilities, the policies, the facilities list, Booking's distances, three ratings plus the restaurant's own, the Google address, phone and listing names, and 134 photos. They become a mid-length page: 7 blocks of 1 to 3 paragraphs (about 300 words of body), 6 room rows, 10 amenities, a stay note, `spot`, `season`, `hoursNote`, 3 ratings and 12 guest quotes. The host's own sentences carry the voice for the place and the family. Guests carry the food, the surf and the warmth. Nothing in the dossier is too thin to build on. The thin parts are season, prices, the menu, payment and who runs the house today, and those are pitch points.
