# copy sources: lotus-surf-house · en

Copywriter 0.5.0 · run 2026-10-midigama-01 (test) · 2026-11-03. Facts come from `dossier/lotus-surf-house/dossier.json` only (harvester 0.5.0, harvested 2026-11-03). `audit.json` `recommended` (auditor 0.1.3) is used only for how to sell: the primary action, the offer framing (F4), cash only in `stayInfo.note` (F5) and the closing intent. It is never used as a fact. Caps were re-read from `schemas/site-content.md` v0.11 this round: `copyBlocks` ≤ 8 (6 used), `testimonials` ≤ 12 × ≤ 600 chars (12 used, longest 492), `rooms[].note` ≤ 140 (longest 127), `stayInfo.note` ≤ 200 (130), `tagline` / `closing` ≤ 140 (59 / 87 after the humanizer pass), `spot` ≤ 200 (53).

`en.json` and `en.draft.json` were the same file when the copywriter handed off. After the humanizer 0.2.1 pass (2026-11-03), `en.draft.json` is the copywriter's draft and `en.json` the rewrite; the changes are in `humanizer-notes.md`, and the rows below describe `en.json`. `base.md` names the output `<locale>.json`, and the humanizer keeps the pre-rewrite copy as `<locale>.draft.json`, so both names are present.

**This is the no-prose case.** The owner has written nothing about the place. Booking.com's description is Booking's own text and is not used as prose. The owner's only long text in public is his signed reply to a 2/10 review (`business.owner_voice`, full text at `reviews.quotes[60].owner_reply`). Two sentences from it are quoted verbatim, in quotation marks and attributed to him (blocks [1] and [3]). All other copy is written from facts.

Index keys: `reviews.quotes[n]` follows the dossier's order (0 = Melvin … 84 = Francis). `room_types[0–3]` = Standard D/T, Deluxe Queen, D/T Garden View, King. `facilities[n]` follows the dossier's order.

## Harvest decisions followed

| Decision | How the copy handles it |
|---|---|
| Phone is Google's +94774647541 (`contradictions[0]`) | `contact.phone`. The Facebook number (+94712585804) appears nowhere, and the Facebook page is not linked. |
| Address "Indhana Rd, Midigama 80650, Sri Lanka" | `contact.address` = `location.address_site_form`. This is Google's listing address with the leading coordinates removed, nothing else changed (playbook §6). |
| Lazy Left / Lazy Right are guest words only (`location.spot.origin_note`) | The break names appear only inside Giada's quote (testimonial row 4). `spot` names no break. |
| No pool, restaurant or hot tub (`contradictions[4]`) | None of the three appears anywhere. The King Room note leaves out Booking's "Private hot tub". |
| Fan rooms vs A/C King Rooms said plainly (audit F4) | Each `rooms[]` note states the floor, and says either "Fan and mosquito net; no air conditioning and no hot water" or "Air conditioning, fan, mosquito net and hot water". Block [3] separates downstairs from upstairs. Katsiaryna's quote (row 12) is a guest's honest word on a fan room. |
| Prices = a link to live dates on Booking.com, never copied numbers (`offers_note`, schema rule "Live prices are not content") | `priceList[] = []`, and `rooms[]` has no price. `bookingLinks[0]` and `closing` send the reader to live dates. |
| Cancellation complaints are pitch context, not site content (`booking.reliability_note`) | Brett (`quotes[83]`), Alaa (`[13]`) and Franciszek (`[23]`) are not quoted, and nothing in the copy refers to them. |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Lotus Surf House" | `business.name.value` (Booking, Google, the entrance sign in img-018); `contradictions[6]` resolution. |
| `businessType` | `beach_lodging` | `business.type.value`, `business.businessType_note`. |
| `tagline` | "A guesthouse in Midigama, on the south coast of Sri Lanka." (59) | "guesthouse": `business.type.note` (the old Google listing's category "Guest house") and `business.former_names` ("Yelum Guest House"). Booking's "3-star hotel" is not used: `business.stars.note` says no star certificate is published. "Midigama": `location.address`. "South coast of Sri Lanka": shared context about the place (Midigama is on the Galle–Matara coast; `location.nearby` lists Ahangama, Weligama and Koggala). |
| `closing` | "Live dates and prices are on Booking.com. If you'd rather ask us something first, call." (87; humanizer 0.2.1 reworded the second sentence) | Task: `audit.recommended.closing_intent`, which is not a fact. Booking.com: `booking.engine_url`. "Call": `contact.phone`, the only direct channel (`booking.direct_channels`). The template sets the line beside the last booking action, where the phone is shown. |
| `featureLine` | null | No line the owner wrote fits a feature image, and inventing one would add voice without a fact. Left for the designer and owner. |
| `spot` | "Booking.com puts Midigama Beach 250 m from the house." (53) | `location.distance_to_beach.value` (Booking surroundings and FAQ). It is attributed to Booking.com because Booking's own description says 300 m and guests give 1 to 5 minutes (`contradictions[3]`, resolution "250 m with the source"). No break, break type or level is named: `gaps[]` location.spot. |
| `season` | null | `season.gap`: the business publishes no season. Owner item. |
| `openingHours` / `hoursNote` | `[]` / null | `hours_note.gap` (lodging; check-in is in `stayInfo`). |
| `priceList`, `lessons`, `credentials`, `rentals`, `brands` | `[]` | No price is published (`offers_note`). Lessons, rentals and a shop are not offered by the business (`facilities_note`, `business.type.note`). |
| `languagesSpoken` | `["en"]` | `languages_spoken[0]` (Booking). |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] intro heading | "In the garden" | framing; `facilities[1]` |
| [0] intro ¶1 | the house stands in a shady garden on Indhana Road, a hammock under the trees, a ping-pong table under a thatched roof | Garden: `facilities[1]` (Booking "Garden"). Hammock under the trees and "shady garden": the business's own photo img-020 ("shady garden: hammock under the trees, ping-pong table"). Ping-pong table: Booking "Table tennis" (`facilities[1].note`); "under a thatched roof": photo img-005 ("ping-pong table under a thatched pavilion"). Indhana Road: `location.address`. |
| [0] intro ¶2 | every room downstairs opens onto the garden through its own terrace, with chairs outside and a table to eat at | `room_units[0–4].facilities` (the five ground-floor units, Booking): "Entire unit located on ground floor", "Terrace", "Outdoor furniture", "Outdoor dining area", "Garden view". Photos img-009 and img-032 (veranda with rattan chairs and a table). |
| [1] about heading | "Yelum" | `business.owner.value` |
| [1] about ¶1 | Yelum owns the house; as he once wrote to a guest, quoted: "I strive every day to make my customers' holidays as wonderful as possible." | Owner: `business.owner` (he signs the property's reply "Yelum"; 30+ guests name him as owner and host). Quote: `reviews.quotes[60].owner_reply`, verbatim (his reply of 2025-03 to Nadia, which is what "wrote to a guest" rests on). "His wife and family" is **not** stated in the business's voice, because that comes only from guests (`business.run_by`, constraint 13). It stays inside the testimonials (Fiona, Benjamin, Svenja, Dimitrios). |
| [2] about heading | "Breakfast" | framing |
| [2] about ¶1 | breakfast is included, served 8 a.m. to 10 a.m. | Hours: `stay_info.breakfast_hours`, the owner's own words in his reply ("Breakfast is served from 8 a.m. to 10 a.m."). "Included": `facilities[0]` (Google's offers "Free breakfast" on the Booking.com and Agoda rates; Booking "Exceptional breakfast"). **Owner to confirm** that every rate includes it. The dishes (coconut roti, dhal, granola, pancakes) come only from guests and stay inside Fiona's quote. |
| [3] offer heading | "Old rooms and new" | framing; `business.recent_works` |
| [3] offer ¶1 | the garden rooms are downstairs; Yelum, quoted (split around "Yelum says" at his own comma, words unchanged): "The standard rooms may not be the newest, but they are popular with many vacationers due to their charm." | Downstairs: `room_units[0–4]` "Entire unit located on ground floor", "Garden view". Quote: `reviews.quotes[60].owner_reply`, verbatim. It is the owner's own frank sentence about these rooms, and it supports audit F4. |
| [3] offer ¶2 | the King Rooms upstairs are new, and their balconies look out into the trees | "New": `business.recent_works` (owner reply, 2025-03, "our new deluxe rooms"; King-room photos uploaded 2025-03 to 2025-12). "Upstairs": owner reply at `quotes[7]` ("we have 1st floor that's rooms only have"), `room_count.note`. Balconies into the trees: `location.views.value` (Booking "View" and "Balcony" on the King units) and photos img-016 and img-025 ("balcony with two rattan chairs looking into trees"). The room count (8) is not stated (`contradictions[5]` resolution). |
| [4] about heading | "Up on the roof" | `facilities[2]` |
| [4] about ¶1 | a roof terrace, a wooden table and chairs with the trees behind; in one corner a Buddha on a pedestal with offerings of flowers and fruit | Roof terrace: `facilities[2]` (Booking "Sun terrace", "Terrace"). Table and trees: photo img-004 ("roof terrace dining table with wooden chairs, green canopy of trees behind"). Buddha: photos img-021 and img-022 ("Buddha statue on a pedestal … offerings of flowers and fruit"). "Partly shaded" and the yoga sessions come only from a guest, so they stay in Svenja's quote. Yoga is not a service (`facilities[2].note`). The owner's "even larger roof terrace" was a plan in 2025-03, and its completion is not sourced, so it is not used. |
| [5] info heading | "Getting here" | framing |
| [5] info ¶1 | Midigama railway station is 50 m from the house, so you can come by train | `location.distance_to_station.value` (Booking "Railway access — 50 m walking from Midigama station"). The train noise guests mention is not stated as a fact. Holtmann's quote (row 9) says it in a guest's words. |
| [5] info ¶2 | "Further out", Booking.com lists Ahangama Beach 1.4 km, Weligama Beach 4.2 km, Koggala Airport 9 km | `location.nearby.value` (Booking surroundings, OSM distances), attributed. Koggala is 9 km in the surroundings and 10 km in Booking's description. The surroundings figure is used, once. Restaurants and the spa next door are not named: they are third parties, and the spa is known only from guests (`facilities[19]`). |
| [5] info ¶3 | on Google the house may also appear under its old name, Yelum Guest House | `business.former_names` (old Google listing, Booking's old URL redirects). This helps a traveller who meets both listings (audit F3). |

## `rooms[]` (no price, per the schema rule)

| Row | Copy | Rests on |
|---|---|---|
| [0] | Standard Double or Twin Room with Garden View · 2 single beds · sleeps 2 · "Ground floor, 20–25 m², garden view. Fan and mosquito net; no air conditioning and no hot water." | `room_types[0]` (size 20 and 25 across its two units), `room_units[0,3].facilities` ("Fan", "Mosquito net", "Garden view", "Entire unit located on ground floor", no A/C). No hot water: the owner's reply at `quotes[7]` ("Sorry you book without air condition and hot water room.we have 1st floor that's rooms only have."). |
| [1] | Double or Twin Room with Garden View · 2 single beds · 2 · "Ground floor, 25 m², garden view. Fan and mosquito net; no air conditioning and no hot water." | `room_types[2]`, `room_units[4]`; hot water as above. Booking's own label is kept so the row matches what the reader sees on Booking.com. |
| [2] | Deluxe Queen Room · 1 large double bed · 2 · "Ground floor, 25 m², garden view, tiled floor and a walk-in shower. Fan and mosquito net; no air conditioning and no hot water." | `room_types[1]` (description: "tiled floor … walk-in shower"), `room_units[1,2]`; hot water as above. The name "Deluxe" is Booking's, and it is a ground-floor fan room. The note says so, because the owner's "new deluxe rooms" are the upstairs ones. |
| [3] | King Room with Balcony · 1 extra-large double bed · 2 · "Upstairs, 25 m². Air conditioning, fan, mosquito net and hot water." | `room_types[3]`, `room_units[5–7]` ("Air conditioning", "Fan", "Mosquito net"); "upstairs" and hot water from the owner's reply at `quotes[7]`. **Left out:** "Private hot tub" (`room_types_note`: unverified, no photo or guest shows one; harvest decision). "Balcony" is in Booking's label, but one of the three units (559076610) does not list a balcony among its facilities. Owner to confirm. |
| photos (not in the JSON) | Suggested `rooms[].photo`: [0]/[1] img-029 (twin room) or img-009; [2] img-043; [3] img-002 | `room_types[].photos`, `images[].room`. The deployer sets the uploads. Each room gets its own photo because of `gaps[]` "room photos per room type" and the guest complaints that the rooms did not match the photos. |

`stayInfo`: check-out `11:00`–`12:00` (`stay_info.check_out`, Booking). Check-in times are left empty, because "Available 24 hours" has no HH:MM form. It is in the note instead. `stayInfo.note` reads "Check-in at any hour, day or night. Cash only. Children welcome; no cots or extra beds. Pets on request, at no charge. No parking." (130), from `stay_info.check_in`, `.house_rules` (verbatim policies: cash only, children of any age, no cots or extra beds, pets on request at no charge) and `.parking`. Kayak's 12:00 / 10:00 are not used (`contradictions[1]`). **Owner item:** Felix (`quotes[24].negative_text`, 2026-01) says check-in was in fact only possible in the afternoon.

## `amenities[]`

| Rows | Rests on |
|---|---|
| Private bathroom in every room | `facilities[18]` (Booking `isPrivateBathroomInAllRooms`) |
| Free WiFi · in all areas | `facilities[7]` |
| Outdoor shower | `facilities[5]`, the owner's reply at `quotes[37]` ("yes i fix all ready out door shower") |
| Shared kitchen; Shared lounge with TV; Room service | `facilities[3]`, `[4]`, `[13]` (Booking) |
| Airport shuttle · additional charge | `facilities[9]` (Booking, paid) |
| Bicycle rental · additional charge | `facilities[8].note` (Booking "Bicycle rental", paid). Scooter hire is **not** a row: it comes only from guests (constraint 13). It stays inside Talia's quote. |
| Walking tours · additional charge | `facilities[10].note` (Booking, paid). Trips Yelum arranges (Yala, a snake farm, batik) come only from guests and stay in Benjamin's quote. |
| Laundry · additional charge; Luggage storage | `facilities[11]`, `[12]` (Booking; luggage storage is free, so it has no note) |
| CCTV outside and in common areas | `facilities[17]` |
| not rows | Fan, mosquito net, A/C (in `rooms[]`); garden, hammock, table tennis (block [0]); roof terrace (block [4]); breakfast (block [2]); pets, cash, parking (`stayInfo.note`); express check-in and board games (minor, left out); the water refill station (from a guest only); the spa next door (not the business) |

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Booking.com 9.0/10, 125 reviews, captured 2026-11-03 | `reviews.booking` |
| `ratings[1]` | Google 4.9/5, 78 reviews, captured 2026-11-03, url = the Google place link | `reviews.google`; url `location.map_url` |
| not rows | Old Google listing 4.7 (13); Kayak 9.0 (138); Priceline 9.3 (45); Tripadvisor 5/5 (5) | The schema allows one Google row, and the current listing carries it. Kayak and Priceline aggregate or mirror Booking. Tripadvisor was read only through Google (403), as in cheeky-monkey. |
| `testimonials[]` (12) | Pulled from the dossier by script, not retyped, positive `text` field only: Fiona `[74]`, Benjamin `[47]`, Svenja `[82]`, Giada `[37]`, Henry `[78]`, Dimitrios `[43]`, Talia `[46]`, Nicole `[75]`, Holtmann `[48]`, Colin `[22]`, ジョナ `[14]`, Katsiaryna `[12]`. All `source: booking`, `lang: en`, `date` YYYY-MM | Chosen to cover what guests praise (hosts, breakfast, garden, ping-pong, the walk to the surf), with the honest limits in guests' own words: trains (Holtmann), a fan room (Katsiaryna), a dusty room (Giada). Each guest-only fact the copy leaves out of the business's voice lives here: the family, breakfast dishes, Lazy Left/Right, trip planning, scooters, yoga on the roof. |
| excluded | Gravina `[10]` (618 chars), Adele `[2]`, Victoria `[39]`, Sylvia `[58]`, Jane `[36]` (all over 600) | A quote is never trimmed. |
| excluded | Every non-English text | The site is `en`, and quotes are not translated. |
| excluded | Brett `[83]`, Alaa `[13]`, Franciszek `[23]` | Pitch context only (harvest decision). |

## `contact`, `bookingLinks[]`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | +94774647541 | `contact.phone.value` (Google tel: link on both listings; Kayak agrees) |
| `contact.whatsapp` / `contact.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap`. Neither is published; whether the number has WhatsApp is not assumed. |
| `contact.address` | Indhana Rd, Midigama 80650, Sri Lanka | `location.address_site_form`. Google's own words carry the postcode, so no other platform is needed. |
| `contact.mapUrl` | https://www.google.com/maps/place/?q=place_id:ChIJBR_cQfoV4ToRQhXcrYmPyU0 | `location.map_url` |
| `bookingLinks[0]` | "Check dates on Booking.com" → the Booking.com listing | `booking.engine_url`; `audit.recommended.primary_action` "engine". The audit's working label is shortened to the house's short button (same call as cheeky-monkey). The full sense is in `closing`. |
| not rows | Facebook page; Agoda; Kayak; Priceline | Facebook has been dormant since 2018 and shows another phone (audit F3). Agoda has no listing URL. Kayak and Priceline are not channels the owner runs. |

## Each fact once (constraint 10)

| Fact | Where it appears |
|---|---|
| Midigama Beach 250 m | `spot` only |
| station 50 m | block [5] ¶1 only |
| other distances (Ahangama, Weligama, Koggala) | block [5] ¶2 only |
| former name Yelum Guest House | block [5] ¶3 only |
| garden, hammock, ping-pong | block [0] ¶1 only |
| ground-floor terraces with outdoor seating and dining | block [0] ¶2 only |
| owner Yelum + his two quoted sentences | block [1] (owner; "holidays" sentence), block [3] ¶1 (rooms sentence). Different sentences, each quoted once. |
| breakfast included, 8–10 | block [2] only |
| King Rooms new, upstairs, balconies into the trees | block [3] ¶2. The King note repeats "Upstairs" as the room's location; it is the row's own floor, and the F4 rule asks every row to state it. **Judgement call**, flagged for the copyeditor. |
| fan / A/C / hot water per room | `rooms[]` notes only |
| roof terrace | block [4] only |
| cash only, check-in 24 h, children, cots, pets, parking | `stayInfo.note` only |
| live prices on Booking.com | `closing` (the sentence) + `bookingLinks[0]` (the button) |
| phone | `contact.phone` only ("call" in `closing` gives no number) |

No slogan lines, and no keyword list repeated across tagline, intro and CTA. "Midigama" appears in the tagline only on the first screen. The intro names the road, not the town.

## Tempted and did not write: owner items

- **Spot and season**: which breaks are in front of the house, the break type, who they suit, and the best months. Guests name Lazy Left / Lazy Right. The business does not.
- **Prices**: no published rate. Live OTA rates only.
- **WhatsApp and email**: none published.
- **The family**: "Yelum and his wife", his mother's breakfasts, his father. These come only from guests.
- **Breakfast**: the dishes, and whether every rate includes it.
- **Scooter hire, trip planning, the airport pick-up story, the spa next door, yoga on the roof, the water refill station**: guests only.
- **Room count**: 8 units on Booking, against "3 type room" in the owner's words.
- **Hot tub** in the King Rooms, and the balcony on unit 559076610.
- **Check-in**: 24 h on Booking, against a guest's afternoon-only experience.
- **Opening year**: "5 years ago" comes from a guest. Facebook goes back to 2018.
- **"The best place to stay in Midigama"** (Adele, Gravina): a guest superlative. Not used, even in quotes (both quotes are over 600 chars).
- **Train and party noise**: not stated in the business's voice. Holtmann's quote speaks to the trains.
- **Pool / restaurant** (Google hotel details): contradicted everywhere, so not used.

## Facts available vs words written

About 40 usable business-side facts: Booking room data, facilities, policies and distances; Google rating, address and phone; three owner replies; and the photos. They become a short page: 6 blocks of 1 to 3 paragraphs (about 230 words of body), 4 room rows, 12 amenities, a stay note, 2 ratings and 12 guest quotes. The guests carry most of the warmth; the business's own voice is two quoted sentences. Nothing in the dossier is too thin to build on. The thin parts are spot, season, prices and the hosts' own story, and those are pitch points.
