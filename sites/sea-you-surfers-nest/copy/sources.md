# copy sources: sea-you-surfers-nest · en

Copywriter 0.5.0 · run 2026-10-midigama-01 (test) · 2026-11-22. Facts come from `dossier/sea-you-surfers-nest/dossier.json` only (harvester 0.5.0, harvested 2026-11-21). `audit.json` `recommended` (auditor 0.1.3) is used only for how to sell: the primary action and its label, the offer framing (F4, F5, F7) and the closing intent. It is never a fact source. Caps were re-read from `schemas/site-content.md` v0.11 this round: `copyBlocks` ≤ 8 (6 used), `testimonials` ≤ 12 × ≤ 600 chars (5 used, longest 386), `rooms[].note` ≤ 140 (longest 74), `stayInfo.note` ≤ 200 (127), `tagline` / `closing` ≤ 140 (60 / 77 after round 2), `spot` ≤ 200 (64 after the humanizer pass), `bookingLinks[].label` ≤ 60 (longest 39).

`en.json` was the copywriter's output. After the humanizer 0.2.1 pass (2026-11-22), `en.draft.json` is the copywriter's draft and `en.json` the rewrite; the changes are in `humanizer-notes.md`, and the rows below describe `en.json`. No fact was added, removed or moved between fields, so the "Each fact once" table still holds. **Round 2** (2026-11-22, after the 4c copy review, round 1) changed four strings in `en.json` only; `en.draft.json` is untouched. See "Round 2 changes" at the end.

**This is the thin-prose case.** The owner's only prose is the short Airbnb text (`business.description`), which is generic and ends in a stray "– adds a surf vibe." One sentence of it is quoted verbatim, in quotation marks and attributed to Ashly (block [1]). His rooms note (`business.description_rooms_note`) is the source of the A/C line in block [2]. Booking.com's description (`business.description_booking`) is Booking's generated text: it is used only for the breakfast line, and its restaurant and "family rooms with air-conditioning" claims are not used. Everything else is written from facts and the business's own photos.

Index keys: `reviews.quotes[n]` follows the dossier's order (0 = Sanna … 12 = Karl). `room_types[0]` = Deluxe Double Room, `[1]` = Standard Double Room. `facilities[n]` follows the dossier's order (0 = breakfast … 17 = shared beach access). `img-NNN` = `images[]` by id, all `license: business-owned`.

## Harvest and audit decisions followed

| Decision | How the copy handles it |
|---|---|
| A/C in one room only (`contradictions[3]`: "never 'air-conditioned rooms'") | Block [2] says one of seven rooms has air conditioning and six do not, in the owner's terms. No room row claims A/C: which room type holds it is a gap (`gaps[]` room_types mapping). |
| No restaurant (`contradictions[4]`) | No restaurant anywhere in the business's voice. "Restaurants" appears once, inside Kenza's quote, about places near the house. |
| Private bathroom only for the Deluxe room (`contradictions[5]`) | Only `rooms[0].note` names a bathroom. The Standard room says nothing about one, and no amenity row promises en-suite. |
| Seven rooms, sleeps 14 (`contradictions[6]`) | Block [2] ¶1, the owner's count. |
| Distance to the beach: owner's and guests' words, no metre figure (`contradictions[2]`) | `spot` quotes the owner's listing line. No metres to the beach anywhere; Booking's 500 m / 6 minutes is not used. |
| No check-in time until the owner confirms (`contradictions[0]`, audit F9) | `stayInfo.checkInFrom/To` = null. |
| Address = Google listing, postcode 80650 (`contradictions[1]`) | `contact.address`. Booking's 81700 is not used. |
| Host-conduct complaints are never used (`reviews.critical_themes`, severity high: Camilla, Daniel) | Neither is quoted or paraphrased, and nothing in the copy refers to refunds, overbooking or the host's manner. |
| Phone read from the sign, not yet confirmed by a human (`contact.phone.confidence` medium-high, `gaps[0]` human_decision) | `contact.phone` = +94715880052 as the dossier records it. The closing does not mention the phone (round 2, 4e follow-up: the mockups show no Call button while the number is unconfirmed). **The deployer and the human gate must confirm the number before it goes live as a tap-to-call action;** audit item 4 says the secondary action is empty if it is not confirmed. |
| Primary action Booking.com; Airbnb secondary; Agoda not linked (audit `recommended`, item 7) | `bookingLinks[0]` Booking.com, `[1]` Airbnb listing 1 (rooms), `[2]` Airbnb listing 2 (whole house). No WhatsApp, no email. |
| Live prices are not content (`offers_note`) | `priceList[] = []`; no room carries a price. |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Sea You Surfers Nest" | `business.name.value` (Google). The sign's "Sea You – The Surfers Nest – Midigama" and the OTA name suffix are not used as the name (audit F7 advises one name). |
| `businessType` | `beach_lodging` | `businessType`, `businessType_why` |
| `tagline` | "A bed and breakfast in Midigama, on Sri Lanka's south coast." (60) | "Bed and breakfast": `business.google_category` ("Bed & breakfast"). "Midigama": `location.address`. "South coast of Sri Lanka": shared context about the place (Midigama lies between Weligama and Koggala, both in `location.nearby`). |
| `closing` | "Live dates are on Booking.com, and groups can rent the whole house on Airbnb." (77) | Task: `audit.recommended.closing_intent` (not a fact). Booking.com: `booking.engine_url`. Whole house on Airbnb: `booking.other_engines[1]` (listing 1793988904511877292, "whole guest house, 14 guests"). Round 2 (4e follow-up) dropped the humanizer's second sentence, "If you want to ask Ashly something first, call.": the phone (`contact.phone`) is read from a sign and unconfirmed (`gaps[0]`), so the mockups show no Call button, and the line pointed to an action the page does not offer. Airbnb messaging is not offered in its place, because it needs a login (audit F1). The third part of the closing intent ("give the phone as the way to ask Ashly first") waits for the number to be confirmed; it is then a one-line owner edit. |
| `featureLine` | null | No owner line suits a feature image that is not already used elsewhere ("Hello to waves in a minute walk" is in `spot`). Left for the designer and owner. |
| `spot` | "“Hello to waves in a minute walk,” says the house’s own listing." (64; humanizer 0.2.1 replaced the label-and-colon with a plain attribution) | `location.distance_to_beach[0]` (owner's Booking/Agoda listing-name suffix), verbatim; "the house's own listing" = that listing name (author: owner). Attributed because it is the owner's claim; `contradictions[2]` resolution. No break is named: `location.spot.gap`. |
| `season` | null | `season.gap` |
| `openingHours` / `hoursNote` | `[]` / null | `hours_note.gap` (lodging). Booking's "24-hour front desk" (`facilities[13]`) is not used: it sits badly with a 14:00–18:00 check-in window and a family-run house, and is not worth a claim the owner may have to explain. Owner item. |
| `priceList`, `lessons`, `credentials`, `rentals`, `brands` | `[]` | No price published (`offers_note`). No lessons (`surf.lessons.gap`). Board rental is one guest's word only (`surf.board_rental`, confidence low), so no `rentals[]` row. |
| `languagesSpoken` | `["en"]` | `languages_spoken[0]` (Booking, Agoda) |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] intro heading | "Around the courtyard" | framing; img-046 |
| [0] intro ¶1 | a white two-storey house; downstairs an inner courtyard with potted plants and a cushioned bench, and the room doors that open onto it have carved fanlights over them | White, two storeys: `same_address_neighbour.comparison` ("a white two-storey house"), Marina's "ground floor" (`all_booking[0].negative`) and the upstairs balconies (img-003, 076, 077), outside stair img-042. Courtyard, carved fanlights, bench, plants: img-046 ("inner courtyard: room doors with carved fanlights, green-cushioned bench, plants"), img-071. |
| [0] intro ¶2 | from the balconies upstairs you look out over the garden to the coconut palms; tables and chairs out there, and the long one has a settee with green cushions | `facilities[10]` (Booking "Terrace", "Balcony", "Garden"). img-077 ("long upstairs balcony with a green-cushioned settee, mint tables and chairs … garden and palms beyond"), img-076 ("coconut palms beyond"), img-003, img-045. |
| [1] about heading | "Ashly" | `business.owner.value` |
| [1] about ¶1 | your host is Ashly; he's a Superhost on Airbnb and usually replies there within a few hours | `business.owner` (Airbnb host "Ashly"); `business.host_stats` (superhost true, "Responds within a few hours"); `booking.reply_time_hint`. "Host", not "owner": only a guest (Marina) calls him the owner. The 70% response rate is not stated. He lives in the house and hosts with his brother: guest words only (Mareike, in German), so not stated (constraint 13). Pronoun "he": the guests' (Marina's quote, which is on the page). |
| [1] about ¶2 | “Whether you’re chasing the perfect wave, soaking up the beach vibes, or just looking to unwind,” he writes, “our place is your perfect home away from home.” | `business.description.value`, second sentence, verbatim (owner, Airbnb). Humanizer 0.2.1 split it at his own comma around "he writes" in place of the label "In his own words:"; every word and its order are unchanged. The rest of that text is not used: its first and third sentences are sales lines, and "– adds a surf vibe." is a generator leftover (`business.description.note`). |
| [2] offer heading | "Seven rooms" | `room_count.value` |
| [2] offer ¶1 | all seven rooms are doubles and sleep fourteen between them; only one has air conditioning ("only one" of seven carries the owner's six non-A/C rooms), so ask when booking for the one that has it | `room_count` / `business.description_rooms_note` (owner, listing 1: "We have one A/C room & Six Non A/C rooms can accommodate 14 pax.(Pls inquire for per room rate for individual rooms)"; listing 2: "… Pls inquire when booking"). Round 2: the clause "Airbnb's rates are for a room without it" is cut. Listing 2 (whole house) says "rates are for Non A/C double room"; listing 1, where "Book a room on Airbnb" leads, says only "Pls inquire for per room rate", so the clause did not hold for the room listing. The advice to ask rests on both listings' "Pls inquire". "Double rooms": `room_types[3]` (Airbnb: 7 bedrooms, 1 double bed each). Audit F5 framing. |
| [2] offer ¶2 | the rooms are furnished much alike: the bed a mint-green four-poster double with a teal velvet throw, a timber towel ladder, a green cabinet with a mirror | `room_types_note` ("Mint-green painted four-poster double beds with teal velvet throws, timber towel ladders and green cabinets in every room (photos)"); img-005, 015, 018, 021, 026. "Furnished much alike" (the draft's "share a look") rather than "every room", because the photos cannot show all seven. |
| [3] about heading | "Breakfast" | framing |
| [3] about ¶1 | breakfast here is Asian, with local specialities and warm dishes, and juice and fruit too | `facilities[0]` (Booking "Breakfast info: Asian"; Agoda "Asian breakfast with local specialities, warm dishes, juice, and fruits"), `business.description_booking` ¶2 (breakfast sentence only). Platform text, not the owner's: **owner to confirm**, and to say whether breakfast is in the rate (`facilities[0].note`: not stated). The restaurant in the same Booking paragraph is not used (`contradictions[4]`). Home-cooked food from the hosts (`facilities[3]`) is guest-only (Dona) and not stated. |
| [4] about heading | "Carved doors and a surfboard shower" | img-027, img-036 |
| [4] about ¶1 | one of the rooms has a carved grey double door, and the wooden chair beside it is carved too; elsewhere, carved wooden masks hang by a doorway among the ferns | img-027 ("entrance: carved grey double door, wall lamp, carved wooden chair"; tagged to Booking room 1492325603, the Standard Double Room, and to Airbnb "Bedroom 2"). Round 2: "the front door" became "one of the rooms has": nothing says img-027 shows the house's front door, and its room tags place it at a room. The block heading "Carved doors…" still holds. img-035 ("carved wooden masks hung beside a grey door, ferns and plants"). The draft's "further in" placed the masks inside the house, which img-035 does not show; "elsewhere" claims no position. |
| [4] about ¶2 | out in the garden a shower built into a wooden surfboard, fixed to the wall under the palms; it's for rinsing off after the sea | img-036 ("outdoor shower built into a wooden surfboard fixed to the garden wall (tap and shower head), palms above"); `images_note`. "For rinsing off after the sea" is framing around the sourced object. The surfboard rack on the veranda (img-034, 072) is not described, so the copy implies no board storage or rental (`surf.board_storage.gap`). |
| [5] info heading | "Finding the house" | framing |
| [5] info ¶1 | Booking.com lists the house under Kumbalgama and Airbnb under Matara, but it's one house, in Midigama | `location.address_other[0]` (Booking "81700 Kumbalgama"), `business.booking_category.note` (Airbnb "Room in Matara"), `location.address` (Google, Midigama). Audit F7: a traveller meeting the listings needs to know they are one house. Agoda's "Mirissa" is not named, since Agoda is not linked. |
| [5] info ¶2 | Midigama railway station is 950 m away on foot and Weligama Beach is 3.4 km, both by Booking.com's count | `location.nearby.value` (Booking "Midigama station (train)": 950 m walking; "Weligama Beach": 3.4 km), attributed to Booking.com. Round 2: the attribution moved to the end of the sentence and says "both", so the 3.4 km is plainly Booking.com's too. Agoda's 750 m / 2.5 km are not used. Koggala and Mattala airports are left out (not where travellers fly in; the shuttle is in `amenities[]`). Nearby restaurants are third parties and are not named. |

## `rooms[]` (no price, per the schema rule)

| Row | Copy | Rests on |
|---|---|---|
| [0] | Deluxe Double Room · 1 large double bed · sleeps 2 · "13 m², with its own bathroom, a private entrance, a terrace and a balcony." | `room_types[0]` (Booking: size 13, bathrooms 1, "private entrance, as well as a terrace and a balcony"). Booking's "features air conditioning" is **left out**: the owner has one A/C room in seven, and how many units Booking sells as Deluxe is unknown (`gaps[]` room_types mapping). Owner item. |
| [1] | Standard Double Room · 1 large double bed · sleeps 2 · "12 m², with a private entrance and a wardrobe." | `room_types[1]` (Booking: size 12, "private entrance and a wardrobe"). The bathroom is not stated: Booking says 0 bathrooms in the unit and Airbnb says "Private attached bathroom" (`contradictions[5]`, resolution "the rest is a gap"). Owner item. |
| not rows | "Budget Double Room" (`room_types[2]`, one review, no longer listed); the Airbnb whole-house unit (`room_types[3]`, carried by `bookingLinks[2]` and the offer block) | |

`stayInfo`: check-in null (`contradictions[0]`). Check-out `06:00`–`10:00` (`stay_info.check_out`, Booking; Agoda agrees; Airbnb gives none, so there is no conflict). `stayInfo.note`: "Children of any age are welcome; there are no cots or extra beds. Pets on request, and charges may apply. No parties or events." (127), from `stay_info.children`, `.pets`, `.parties` (Booking house rules, close to verbatim). `minNights` null (`stay_info.min_nights.gap`).

## `amenities[]`

| Row | Rests on |
|---|---|
| Free WiFi · in public areas | `facilities[4]` (Booking "WiFi is available in public areas and is free of charge"). Agoda's "in all rooms" is not used. |
| Fan and mosquito net | `facilities[9]` (Booking room facilities) |
| Free toiletries | `facilities[9]` |
| Kitchen | `facilities[1]` (Airbnb amenity "Kitchen"). That it is shared with the host and other guests comes from guests only (Mareike, Florentine), so the row says "Kitchen", nothing more. |
| Free private parking on site | `facilities[5]` |
| Airport shuttle · additional charge | `facilities[6]` (Booking, paid) |
| Laundry · additional charge | `facilities[7]` |
| Security cameras outside | `facilities[15]` (Airbnb safety disclosure, "Exterior security cameras on property") |
| not rows | Air conditioning (block [2]); balconies, terrace, garden (block [0]); breakfast (block [3]); pets, children (`stayInfo.note`); restaurant (contradicted); 24-hour front desk (see `hoursNote`); outdoor workspace and hot water (`facilities[11]`, `[12]`: one guest's room only); desk (Booking's generated text, and a guest missed a shelf); bidet, shower (minor); shared beach access (the beach is public); no CO or smoke alarm (`facilities[16]`: a safety disclosure, not an amenity) |

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Google 4.9/5, 11 reviews, captured 2026-11-21, url = the Google place link | `reviews.google`; url `location.map_url` |
| `ratings[1]` | Booking.com 8.0/10, 8 reviews, captured 2026-11-21 | `reviews.booking` |
| `ratings[2]` | Airbnb 5.0/5, 10 reviews, captured 2026-11-21, url = listing 1 | `reviews.airbnb_1` |
| not rows | Agoda 8.8 (8); Airbnb host 5.0 (10); Airbnb listing 2 (none) | Agoda re-scores Booking's same 8 reviews (`reviews.agoda.note`, audit item 9). The host rating is the same 10 reviews as listing 1. |
| `testimonials[]` (5) | Pulled from `reviews.quotes` by script, not retyped, and checked equal to `all_airbnb[].text` / `all_booking[].positive`: Niamh `[1]`, Kenza `[2]`, Marina `[3]` (positive half, as the dossier quotes it), Molly Jayne `[4]`, Raul `[11]`. `source`, `lang: en`, `date` YYYY-MM from the dossier. Round 2: in Kenza's quote the trailing space before the line break ("restaurants. \nWe") is stripped to "restaurants.\nWe"; whitespace only, every word and mark unchanged. | Chosen for the hosts, the location and the balconies, in guests' own words. Guest-only facts the business's voice leaves out live here: the sea and restaurants steps away (Kenza), private balconies outside the rooms and the help with laundry and an airport transfer (Niamh), the patio and the value for money (Marina). |
| excluded | Sanna `[0]` (607 chars) | Over 600; a quote is never trimmed. Her outdoor workspace, hot water and en-suite go unsaid with it. |
| excluded | Dona `[10]`, Thushan `[9]` | `reviews.quotes_note`: the two earliest one-night 10/10 reviews read like friends of the house; the harvester advises preferring the 2026 Airbnb quotes. |
| excluded | Hannah `[5]`, Lazarine `[6]`, Florentine `[7]`, Mareike `[8]`, Karl `[12]` | Not English. The site is `en`, and quotes are not translated. |
| excluded | Camilla, Daniel (`critical_themes`, severity high) | Never used anywhere (run rule). |
| excluded | Joanna (6/10), Szebi, Yulia (no text) | Joanna's praise sits in a review whose substance is a complaint about small, hot rooms; quoting only its positive half would overstate her. |

## `contact`, `bookingLinks[]`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | +94715880052 | `contact.phone.value`, read from the business's own sign in its own photo (img-001). **Not yet confirmed by a human** (`gaps[0]`). |
| `contact.whatsapp` / `contact.email` | "" / "" | `contact.whatsapp.gap`, `contact.email.gap`. Whether the number has WhatsApp is not assumed. |
| `contact.address` | 151 Weliwaththa Rd, Midigama 80650, Sri Lanka | `location.address.value`: Google's words, with Google's own postcode. Already in the playbook §6 order and capitalisation. |
| `contact.mapUrl` | the Google place link | `location.map_url.value` |
| `bookingLinks[0]` | "See rooms and live dates on Booking.com" → Booking.com listing | `booking.engine_url`; `audit.recommended.primary_action` "engine" and its working label, kept because it says what the reader gets (rooms and live dates). |
| `bookingLinks[1]` | "Book a room on Airbnb" → listing 1508895627217411616 | `booking.other_engines[0]` (private room) |
| `bookingLinks[2]` | "Book the whole house on Airbnb" → listing 1793988904511877292 | `booking.other_engines[1]` (whole guest house, 14 guests) |
| not rows | Agoda; MapQuest; Instagram/Facebook | Agoda copies Booking (audit item 7). No social profile was found (`contact.socials`). |

## Each fact once (constraint 10)

| Fact | Where it appears |
|---|---|
| bed and breakfast, Midigama, south coast | `tagline` only ("Midigama" again in block [5] ¶1, to say the listings' other place names are this house: a different fact, on a different screen) |
| white two-storey house, courtyard, carved fanlights | block [0] ¶1 only |
| upstairs balconies, garden, palms | block [0] ¶2 only (Niamh's quote mentions a private balcony in her words) |
| Ashly as host, Superhost, replies within hours | block [1] ¶1 only |
| Ashly's quoted sentence | block [1] ¶2 only |
| seven rooms, 14 guests, one A/C room, ask when booking | block [2] ¶1 only |
| the rooms' furniture and colours | block [2] ¶2 only |
| breakfast | block [3] only |
| carved door and masks; surfboard shower | block [4] only |
| other listings' place names; station and Weligama distances | block [5] only |
| a minute's walk to the waves | `spot` only |
| room sizes, bathroom, entrance, terrace, wardrobe | `rooms[]` notes only |
| check-out, children, cots, pets, parties | `stayInfo` only |
| live dates on Booking.com; whole house on Airbnb | `closing` (the sentence) and `bookingLinks[0]`/`[2]` (the buttons), as in the passed sites |
| phone | `contact.phone` only |

No slogan lines, and no keyword list repeated across tagline, intro and CTA. "Surf" appears in the business name, the owner's quoted sentence and the shower block only, and no surf service is implied.

## Tempted and did not write: owner items

- **Which room has the A/C**, and whether it is the Deluxe Double Room Booking sells with air conditioning; how many units each Booking type covers.
- **Bathrooms**: which rooms are en-suite. Booking's Standard room shows none in the unit; Airbnb says "private attached".
- **Check-in time**: 14:00–18:00 on Booking.com against "after 15:00" on Airbnb.
- **Breakfast**: whether it is in the rate, and what it really is (the line on the page is platform text). Home-cooked meals from the hosts: guests only.
- **Prices**: none published. The A/C room's rate is "inquire" on Airbnb.
- **Phone**: confirm +94715880052 is the number to publish, and whether it takes WhatsApp.
- **Surf**: board rental, transport to the breaks (one guest, French), board storage (the rack in the photos), and which break is in front of the house. None is stated.
- **Spot and season**: no break, no season published.
- **The hosts**: Ashly lives in the house and hosts with his brother (one guest, German). Not stated.
- **Outdoor workspace, hot water, yoga on the balcony, free pick-up**: guests only, and their quotes are over length or not in English.
- **24-hour front desk** and **restaurant** (Booking): not used; the restaurant is contradicted.
- **Opening year**: listings date from 2025; no year is published.

## Facts available vs words written

About 35 usable business-side facts: Google's name, category, address, rating and pin; Booking's two room types, facilities, house rules and distances; the owner's Airbnb text and room count; Airbnb host stats and amenities; and 82 business-owned photos with descriptions. They become a short page: 6 blocks of 1 to 2 paragraphs (281 words with headings in the draft, 298 after the humanizer pass, 292 after round 2), 2 room rows, 8 amenities, a stay note, 3 ratings and 5 guest quotes (181 words, verbatim), about 430 words written in all. The guests carry the warmth about the host and the location; the business's own voice is one quoted sentence and its listing line. Nothing in the dossier is too thin to build a page on. The thin parts are the sea (no photo, no named break), prices, bathrooms and which room is cool, and those are pitch points.

## Round 2 changes (copywriter 0.5.0, 2026-11-22)

After the 4c copy review, round 1 (two blocking sentences, two notes). Edited in `en.json` (the humanizer's version) only; every other humanizer wording is kept, and `en.draft.json` is untouched. No fact was added; one claim was removed (the Airbnb rate clause), one was corrected (the door's place), so the "Each fact once" table still holds.

| Field | Before | After | Why |
|---|---|---|---|
| `copyBlocks[2]` ¶1 | "Only one has air conditioning. Airbnb’s rates are for a room without it, so ask when you book if you want the one that has it." | "Only one has air conditioning, so ask when you book if you want the one that has it." | Blocking: "rates are for Non A/C double room" is said only on Airbnb listing 2 (whole house), not listing 1 (rooms). Rate clause dropped; the advice to ask stays. |
| `copyBlocks[4]` ¶1 | "The front door is a carved grey double door, and the wooden chair beside it is carved too." | "One of the rooms has a carved grey double door, and the wooden chair beside it is carved too." | Blocking: img-027 is an "entrance" tagged to the Standard Double Room (Booking) and "Bedroom 2" (Airbnb), not the front door. |
| `copyBlocks[5]` ¶2 | "Midigama railway station is 950 m away on foot, by Booking.com’s count, and Weligama Beach is 3.4 km." | "Midigama railway station is 950 m away on foot and Weligama Beach is 3.4 km, both by Booking.com’s count." | Note: the 3.4 km is now plainly Booking.com's. |
| `testimonials[1].quote` (Kenza) | "…steps away from the sea and restaurants. \nWe would…" | "…steps away from the sea and restaurants.\nWe would…" | Note: stray space before the line break removed; words verbatim. |
| `closing` (4e follow-up, raised by two designers at 4e) | "Live dates are on Booking.com, and groups can rent the whole house on Airbnb. If you want to ask Ashly something first, call." | "Live dates are on Booking.com, and groups can rent the whole house on Airbnb." | The phone is unconfirmed, so the mockups have no Call button; the sentence asked for an action the page does not offer. No replacement channel (Airbnb messaging needs a login, audit F1). |

Caps after round 2: `closing` 77 (≤ 140); offer body 332, carved body 297, info body 209 (≤ 1500); Kenza 259 (≤ 600).
