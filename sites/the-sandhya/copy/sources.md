# copy sources: the-sandhya, en

Copywriter 0.5.0, round 2, 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. Caps re-read from `schemas/site-content.md` v0.11 this round. Humanizer 0.2.1 pass after round 1: nine lines changed, no fact moved, each logged in `humanizer-notes.md`. Round 2 changed eight paragraphs, listed in the next section, and corrected the stale Looking after ¶1 row (review, "Draft against final"). Humanizer 0.2.1 pass after round 2: eight lines changed, no fact moved, each logged in `humanizer-notes.md` and listed below. The rows below quote the result.

## Round 2: what changed, for the humanizer and the copyeditor

Scope: the facts `review.md` sent back to the copywriter (rows 1 to 7), and the two owner sentences the operator's ruling allows to be trimmed so they parse (Alon, 2026-11-06; `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`). No fact was added, and every word in these lines is the owner's, except Dining ¶5 (a copywriter's sentence, narrowed to `booking.rate_terms`) and the capital letters at the new sentence starts.

| Review row | Field | Round 1 | Round 2 | What happened |
|---|---|---|---|---|
| 1 | Rooms ¶1 S1 | "Our 9 spacious rooms are the epitome of quiet elegance, design excellence, thoughtful detail and home comforts." | Joined to S2: "Our 9 spacious rooms have unobstructed …" | Superlative cut. The 9 and "spacious" stay |
| 2 | Kabalana ¶2 S1 | "Centuries old Galle Fort, the crowning jewel of southern Sri Lanka and a UNESCO World Heritage Site, is just 25 minutes away." | "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." | Ranking cut |
| 3 | Kabalana ¶4 S1 | "World famous Yala and Udwalawe National Parks, …" | "Yala and Udwalawe National Parks, …" | Ranking cut |
| 4 | Kabalana ¶1 S2 | "Pristine sand, stunning sunsets and a consistent swell have nurtured …" | "Pristine sand and stunning sunsets have nurtured …" | Frequency cut; `season` is a stated gap |
| 5 | Dining ¶5 | "A continental breakfast is included in your stay." | "A continental breakfast for two adults is included in your stay." | Narrowed to `booking.rate_terms` |
| 6 | intro ¶2 | "… magnificent and omnipresent in every part of the hotel including all our Studios and Suite." | "… magnificent and omnipresent." | Every room seeing the ocean now lives in Rooms ¶1 only |
| 6, 7 | Rooms ¶1 S2 | "All our retreat rooms have unobstructed sweeping views of the white sandy beach and beyond …" | "Our 9 spacious rooms have unobstructed sweeping views of the beach and beyond …" | White sand now lives in `spot` only. "All our retreat rooms" gave way to the opening of S1 |
| ruling | intro ¶1 | "… an intimate boutique hotel, your relaxation starts as you …" | "… an intimate boutique hotel. Your relaxation starts as you …" | Split so it parses. The first part is now a fragment. No word cut |
| ruling | Dining ¶2 | "From our signature Sri Lankan rice & curry, … or going directly to a finger licking array of delicious homemade desserts, we truly believe …" | "Our signature Sri Lankan rice & curry, … or a finger licking array of delicious homemade desserts. We truly believe …" | "From" and "going directly to" cut and the sentence split, so it parses. The first part is now a fragment. Same four dishes |

**Humanizer pass after round 2:** the table above records the copywriter's round. The humanizer then changed the five register lines the review sent it (`stayInfo.note` S1, S2; `amenities[6].note`; `amenities[7].note`; `priceList[0].note`), rejoined Dining ¶2, and treated three agent-written lines (Looking after ¶1, Kabalana ¶3 S1, Kabalana ¶5). Intro ¶1 and Dining ¶5 read well aloud and did not change; "for two adults" is still there. The rows below quote the result, and `humanizer-notes.md` gives before and after.

**For the copyeditor:** `en.draft.json` is now the copywriter's round 2 text, as the humanizer's prompt asks, so the diff against it is the humanizer's pass and nothing else. The round 1 draft is in git (commit `4bb4be1`). "Pristine" (Kabalana ¶1) stays as the owner's word; the review notes it in the audit table and did not flag it, and `reviews.quotes[7]` reports debris on the beach while other guests call it clean.

**This is the owner-prose case.** Most of the page is the hotel's own words from `owner_copy[]` (dossier paths below are indexes into that array), kept verbatim or trimmed, because it is their voice. Where a sentence was trimmed, the row says what was cut and why. `reviews.quotes[n]` indexes the dossier array. The audit shaped the label, the order and the closing; no fact rests on it.

Alon's positioning (`business.businessType_note`, 2026-11-06): a beachfront boutique hotel, not a surf stay. So "Kabalana Surf Beach" and "world class surf" are not used, and surf appears only as the owner's words about the place and as two amenity rows that claim no provider.

## Fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "The Sandhya" | `business.name` |
| `businessType` | `beach_lodging` | `businessType`, `business.businessType_note` |
| `tagline` | "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." | `business.description` ("Luxury beachfront boutique hotel on Kabalana Surf Beach … Adults only."), `location.address` (Ahangama). "Luxury" and "Surf" dropped for the positioning. Written for audit F4 (what and where on the first screen). Adults-only stated here once, no age: see the contradictions table |
| `closing` | "See live dates on our own booking page. If you have a question first, call or email us." | `booking.path`, `booking.engine_url`, `contact.phone`, `contact.email`. Follows `recommended.closing_intent`. No digits, so the number lives only in `contact`: the design must set the phone and email links beside this line |
| `featureLine` | "With panoramic glass doors & windows throughout, this captivating view is our artwork." | `owner_copy[3]` S2, verbatim except the misspelling "though out" (audit F15) |
| `spot` | "Kabalana is a mile long, white sandy beach on the golden south coast of Sri Lanka." | `owner_copy[18]` "A mile long, white sandy beach", `owner_copy[19]` "on the golden south coast of Sri Lanka", `location.spot`. No break type, bottom or level: `gaps[]` `location.spot.detail` |
| `season` | `null` | `season.gap`, no source gives months |
| `openingHours` | `[]` | `hours` is empty. A hotel: an empty row would read as closed |
| `hoursNote` | "The front desk is open 24 hours a day." | `hours_note` "Front desk hours: 24/7" (Trip.com) |
| `priceList[0]` | Exclusive Use, 3500 USD, note "Our “from” price, plus “++”, as of 2026-11-06." | `offers[0]` "From US$3,500++ per night", /house, fetched 2026-11-06. "From" and "++" kept. Unit is `flat` and "per night" is in the label, because `priceList[].unit` has no per-night value (schema gap, flagged to the designer). The ++ is unexplained at source: owner item |
| `rooms[0]` | Studio King, King bed, sleeps 2, "38 sq m on the upper or ground floor, with 3.5 m floor-to-ceiling glass doors." | `room_types[0]` `.sqm`, `.beds`, `.sleeps`, `.floor`, `.site_text[1]`. Name is the hotel's, per `contradictions` room_names |
| `rooms[1]` | Studio Twin, 2 super-single beds, sleeps 2, "38 sq m on the upper floor, with 3.5 m floor-to-ceiling glass doors." | `room_types[1]`, same keys. `.site_text[1]` writes "3.5meter" |
| `rooms[2]` | Studio+ King, King bed, sleeps 2, "40 to 43 sq m on the upper or ground floor, with a deep stand-alone soaking tub and dual sinks." | `room_types[2]` `.beds`, `.sleeps`, `.floor`, `.site_text[1]`. Size: both sides of `contradictions` room_size shown as a range. "Studio+ King" over the site's stray "Studio King+" (audit F15; the engine and /rooms say Studio+) |
| `rooms[3]` | Director’s Suite, King bed, sleeps 2, "About 75 sq m on the top floor, with a living area, walk-in wardrobe, soaking tub, ocean-view balconies and a 55-inch TV." | `room_types[3]` `.amenities`, `.site_text[1]` "top floor", "their own ocean view balconies", `.site_text[2]`, `.site_text[3]`. Size and bed: see contradictions. `sleeps` 2 is the dossier value; engine maximum 3 is in `.sleeps_note` |
| `stayInfo.checkInFrom` | "14:00" | `stayInfo.checkInFrom` (own engine; Google and Michelin agree). The other side is on the page in the note |
| `stayInfo.checkOutTo` | "12:00" | `stayInfo.checkOutTo`, every source agrees |
| `stayInfo.note` S1 | "Other sites give different minimum ages for us, and some say check-in is after 16:00." | `contradictions` age_policy (16 at Michelin and Takeoff, 12 at Trip.com), check_in (Kayak, Trip.com). "Other sites" is exact: the own site and engine give no age in years, and the engine says 14:00 |
| `stayInfo.note` S2 | "Ask us before you book." | `contact.phone`, `contact.email`: the channel exists. Delete the note once the owner settles both points |
| `amenities[0]` | Airport transfers, "additional charge" | `facilities` "Airport transfers" (own site), "Airport pick-up and drop-off, additional charge" (Trip.com) |
| `amenities[1–5]` | Transfers throughout Sri Lanka; Tuk tuk bookings; Car and motorbike rentals; Tours and activities assistance; In-room spa massage | `facilities[1–5]`, own /design list |
| `amenities[6]` | Yoga and surf lessons, "on our list; ask us who runs them and what they cost" | `facilities[6]`, `surf_statements`, `contradictions` surf_lessons. The note claims no provider |
| `amenities[7]` | Surfboard hire, "on our list; ask us who provides the boards and what hire costs" | `facilities[7]`, same |
| `amenities[8]` | Sri Lankan rice & curry cooking class | `facilities` "Join us for a Sri Lankan Rice & Curry cooking class", also "Cooking class" (engine) |
| `amenities[9]` | Celebratory arrangements | `facilities[8]` |
| `amenities[10]` | Laundry and ironing | `facilities` "Laundry", "Ironing Service" |
| `amenities[11–18]` | Daily housekeeping; Beach chairs, loungers and umbrellas; Pool and beach towels; Sun deck and terrace; Garden; Library; Welcome drink; Bottled water and refillable water stations | `facilities`, engine list; Library from Trip.com. Rows merged where the engine splits one thing in two |
| `amenities[19–22]` | 24-hour check-in; 24-hour security; Safety deposit box; Baggage storage | `facilities`, engine list |
| `amenities[23]` | Free parking | `facilities` "Free parking" (Google), "Guest parking" (engine) |
| `amenities[24–28]` | Non-smoking rooms; Hypoallergenic rooms; Designated smoking area; Access to healthcare professionals; Cashless payment accepted | `facilities`, engine list |
| `ratings[0]` | `other` (Trip.com), 9.7/10, 56, URL, 2026-11-06 | `reviews.trip`, read first-hand. `platform: other` because the enum has no Trip.com: the design must print the name, from `url` or a label (flagged) |
| `ratings[1]` | `other` (Kayak), 9.4/10, 159, URL, 2026-11-06 | `reviews.kayak`, `via_digest`. Care taken: `reviews.momondo` is a separate fetch with the same score and count, and its breakdown adds up to 159 (132+11+13+2+0+0+1). Kept so the page does not show only the highest number. A person should read the score on the page before go-live |
| `testimonials[0]` | Guest User, 2026-06 | `reviews.quotes[3]`, whole and verbatim, typos and all. `source: other`, Trip.com |
| `testimonials[1]` | Guest User, 2026-02 | `reviews.quotes[6]`, same |
| `contact.phone` | "+94765700007" | `contact.phone`, five sources agree |
| `contact.email` | "reservations@thesandhya.com" | `contact.email` |
| `contact.whatsapp` | absent | `contact.whatsapp.verified` "Weak", an icon only; audit `recommended.secondary_actions`. Optional since schema v0.7 |
| `contact.address` | "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | `location.address`, Google's words with place names capitalised. **Postcode 80650 is not on Google: it comes from the hotel's Cloudbeds engine (`postalCode`); Kayak, Trip.com and Michelin agree** (base.md constraint 9) |
| `contact.mapUrl` | Google Maps place URL | `location.map_url`. Fixes audit F10 |
| `bookingLinks[0]` | "Check rooms and live dates" | `booking.engine_url`. Label from `recommended.primary_label`, kept as the final words |
| `bookingLinks[1–4]` | "<room>: check live dates", four rows | `booking.engine_room_links`. For audit F8. **Unverified that `?rid=` preselects a room**: the label does not promise it. A person should open each once |
| `socialLinks[0]` | Instagram | `contact.socials.instagram`, linked from the own site. Facebook left out: its URL came from search and was never opened |
| `languagesSpoken` | `["en"]` | `languagesSpoken` (Trip.com only; the own site is silent; `gaps[]` business.languagesSpoken) |
| `photos[].caption` | none | Copy writes no captions. Whoever does: the surf, stilt-fisher and aerial shots on /locale are never captioned as Kabalana (`gaps[]` images.locale_provenance) |

## Copy blocks: headings

| Block | Heading | Rests on |
|---|---|---|
| `copyBlocks[0]` intro | "Pause, take a deep breath & exhale. You are home." | `owner_copy[0]`, verbatim |
| `copyBlocks[1]` about | "Why Sandhya" | `business.name_meaning`; asserts nothing itself |
| `copyBlocks[2]` about | "Casual Luxe" | `owner_copy[13]` |
| `copyBlocks[3]` about | "Looking after the place" | framing over `sustainability` |
| `copyBlocks[4]` offer | "The rooms" | framing |
| `copyBlocks[5]` offer | "The Dining Room" | `dining.name` |
| `copyBlocks[6]` offer | "Exclusive Use" | `owner_copy[24]` |
| `copyBlocks[7]` info | "Kabalana and around" | framing over `location.spot`, `location.nearby` |

## Copy blocks: paragraphs

| Block | Paragraph | Rests on |
|---|---|---|
| intro ¶1 | "Designed to feel like an exclusive private beach house with the amenities of an intimate boutique hotel. Your relaxation starts as you kick off your shoes …" | `owner_copy[2]`, every word kept, split in two so it parses (operator's ruling); the cedilla in "façade" stored as one character. `owner_copy[1]` ("Perched on the edge …") not used: its facts are in the tagline and the Casual Luxe block |
| intro ¶2 | "Inside, you will catch the first glimpses of our star attraction, The Indian Ocean, magnificent and omnipresent." | `owner_copy[3]` S1, the stray space in "Inside ," fixed, "in every part of the hotel including all our Studios and Suite" cut: every room seeing the ocean is in Rooms ¶1 (constraint 10) |
| intro ¶3 | "Whether you are enjoying the sunshine … the sea is always your view." | `owner_copy[4]` S2, verbatim |
| intro ¶4 | "Dipping your feet in the azure waters of our swimming pool …" | `owner_copy[5]`, with "brand new 30-meter" cut: `contradictions` pool |
| Why Sandhya ¶1 | "Sandhya, in Sanskrit संध्य, means “twilight.” It is that magical moment between light and dark." | `business.name_meaning`, recast only to open with the name. The design needs a Devanagari glyph fallback for one word |
| Why Sandhya ¶2 | "Come evening, as temperature cools …" | `owner_copy[7]`, verbatim |
| Casual Luxe ¶1 | "Casual Luxe is at the heart of our ethos … bling and glitter." | `owner_copy[13]` S1, S2, verbatim |
| Casual Luxe ¶2 | "Our property’s furnishings are inspired by mid-century aesthetics …" | `owner_copy[6]`, verbatim from "our property’s", opening clause cut |
| Casual Luxe ¶3 | "Wallpaper* describes The Sandhya as “a clean-lined boutique hotel with Scandinavian design sensibilities.”" | `press[0]`, Ali Morris, read in full on wallpaper.com, not via a digest. A fragment, verbatim. **This is the traced page, not one of the two Wallpaper* quotes on the hotel's site** (`press[2]`, `press[3]`), which are not used |
| Casual Luxe ¶4 | "We opened in 2017 and renovated in 2023." | `business.since`, Trip.com "Opened: 2017", "Renovated: 2023". One source: owner to confirm |
| Casual Luxe ¶5 | "Our service is warm, kind, attentive yet informal …" | `owner_copy[15]`, verbatim |
| Casual Luxe ¶6 | "We have blended the best of the worlds … simply The Sandhya." | `owner_copy[17]`, verbatim |
| Looking after ¶1 | "We support the local community … We strive for sustainable tourism." | `sustainability`, the hotel's own claims, in its first person as `sustainability.note` asks. Shipping-container clause and "lifelong family member to Mother Nature" cut: `contradictions` pool, and padding. "vibrant" and "stunning" cut by the humanizer (tell list, and the review's voice row): the sentence is a recast with words added, so the ruling does not cover it |
| Rooms ¶1 | "Our 9 spacious rooms have unobstructed sweeping views of the beach and beyond to the endless ocean, each with its own private balcony or exclusive patio area." | `owner_copy[8]` S1, S2, joined with no word added. Cut: "are the epitome of quiet elegance, design excellence, thoughtful detail and home comforts" (a superlative no dossier entry supports), "All our retreat rooms" (the join) and "white sandy" (in `spot`). Views and outdoor space also `room_types[].view`, `.outdoor`. 9: `room_count`, see contradictions |
| Rooms ¶2 | "We have included thoughtful touches … any one of our room types." | `owner_copy[8]` S3, cut before the sizes, which are in `rooms[]` |
| Rooms ¶3 | "Every room has a plush pillow-top mattress …" | Checked room by room against all four `room_types[]`: `.amenities` (desk, speaker, hairdryer, 2-person rain shower, robes and slippers, universal sockets, central aircon, WiFi, PressReader), `.site_text` (pillow-top, Spa Ceylon), `.engine_description` (500 thread count; the site's "tread" is audit F15), `.engine_amenities` (ceiling fan) |
| Rooms ¶4 | "In the Studio King, a triple occupancy can be arranged …" | `room_types[0].engine_description`, verbatim. Only this room's text says it, though the engine lists a maximum of 3 for all four: owner item |
| Rooms ¶5 | "Nightly rates are on our booking page, for the dates you choose." | `booking.path` (dates go to the engine), `booking.rate_terms`, `gaps[]` offers.nightly_rates. No number. The engine itself was not seen working: `booking.engine_status` |
| Dining ¶1 | "Elevated Comfort Food was the brief for our visiting menu designer …" | `owner_copy[12]`, verbatim. Used over the near-identical `owner_copy[9]` S1, S2 because it names the chef (`dining.menu_designer`); never both |
| Dining ¶2 | "We truly believe some of the island’s best qualities may be expressed through our food, from our signature Sri Lankan rice & curry, … homemade desserts, exploring the diversity of the local produce available." | `owner_copy[10]`, `dining.dishes`. "going directly to" cut and the clauses reordered so it parses (operator's ruling), so the owner's "from" now lands; no word added, checked by script. Same four dishes. The wrong quote mark in "island‘s" fixed. A stated belief, in the hotel's voice |
| Dining ¶3 | "Our breads, pastas, sauces … evolve with the seasons." | `owner_copy[11]`, "but rest assured, the quality remains" cut |
| Dining ¶4 | "If you don’t find what you crave … are available." | `owner_copy[9]` S3, S4, verbatim |
| Dining ¶5 | "A continental breakfast for two adults is included in your stay." | `dining.breakfast` (own engine), Trip.com "A complimentary continental breakfast is included", `facilities` "Free breakfast" (Google). "for two adults": `booking.rate_terms`, added in round 2 because the copy may not widen a fact the dossier holds (review row 5). **That limit is a search snippet of the engine page, not seen live: a person should read it on the engine before go-live** |
| Exclusive ¶1 | "Our home at The Sandhya … simply to celebrate life." | `owner_copy[24]` S1, S2, "prime" and "unique" cut as unevidenced rankings, "nestled" cut by the humanizer (tell list) |
| Exclusive ¶2 | "With the beach as your blank canvas … your special occasion." | `owner_copy[24]` S3, "perfect" and the sunset clause cut (sunset is in Why Sandhya). Price is in `priceList[0]` only |
| Kabalana ¶1 | "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own …" | `owner_copy[19]`, reordered, "on the golden south coast" moved to `spot`. "has nurtured" corrected to "have nurtured" (the plural subject) by the humanizer. "a consistent swell" cut: a frequency nothing counts, and `season` is a stated gap (playbook §7). The comma after "Pristine sand" became the owner's "and". The hotel's words about the place, not its offer |
| Kabalana ¶2 | "Centuries old Galle Fort, a UNESCO World Heritage Site, … restaurant scene." | `owner_copy[21]` S1, S2; `location.nearby[0]`. "the crowning jewel of southern Sri Lanka and" cut: a ranking with only the hotel's marketing behind it |
| Kabalana ¶3 | "The nearby beaches of Midigama … eateries and night spots." | `owner_copy[22]`, S1 turned round by the humanizer to lose "Discover", same places and same three things. That rewording takes it out of the ruling, so the post-round-2 pass split the triad and cut "amazing". **"all within a stone’s throw from us" cut**: guests put Ahangama a 15-minute walk or a 5-minute tuk tuk away (`location.nearby[5]`) |
| Kabalana ¶4 | "Yala and Udwalawe National Parks … late lunch or cocktail." | `owner_copy[23]`, sunset clause cut, "World famous" cut: the same unevidenced ranking as "famed". Place-name spellings as published (`location.nearby[2]`): owner to check "Udwalawe" and "Singharaja" |
| Kabalana ¶5 | "Ahangama train station is 1.4 km from us." | `location.nearby[3]`, Trip.com |

## The 13 contradictions

| Field | What the copy does | Why |
|---|---|---|
| pool | Says "swimming pool". No length, no age, no container, and no pool row in `amenities` (the block carries it) | 30 m, 15 m and a shipping container all stand unresolved. The guest's "long crystal clean relaxing pool" stays inside `testimonials[0]`. **Owner confirms and the 30 m goes in: it is the strongest fact held back** |
| check_in | 14:00 in the field, and on the page "some say check-in is after 16:00" | Own engine, Google and Michelin against Kayak and Trip.com. Both sides shown, not settled |
| age_policy | "adults-only" in the tagline, no age. On the page "Other sites give different minimum ages for us" | Own site and engine agree on adults; 16, 12 and a main guest of 21 do not agree |
| room_names | The hotel's four names | The dossier's note says so. OTA names not used |
| room_size | Studio+ King "40 to 43 sq m"; Director's Suite "About 75 sq m" | Both true of both sides, neither picked. 38 sq m is undisputed |
| room_count | 9 | Own site, Michelin, Wallpaper*, Trip.com, Kayak and The Hotel Guru against one listing. Side stated here |
| suite_bed | "King bed" | The site's text and the engine against one amenity line reading "Super King". Understates rather than overstates. Side stated here |
| surf_lessons | Two amenity rows, each saying it is on our list and to ask us who runs or provides it | Own site and engine list them; Takeoff says no surf school of its own, via a digest, so not quoted. No claim either way |
| ratings | Each platform's own score, count and date; never merged | Dossier note. Booking left out (two versions, neither read live). Google 4.6 left out: the schema needs a count and Google showed none. MyBoutiqueHotel left out: digest only, uncorroborated, and it is the source of the stray 11 rooms |
| star_rating | Not stated | 4 and 5 |
| pets | Not stated | Pet-friendly and not allowed |
| airport_distance | Not stated, Koggala not named | 5.37 km and 2.4 km |
| address_spelling | Google's "Baranige Wattha" | Playbook §6, and the dossier's note |

## Left out, and why

| Left out | Why |
|---|---|
| `rate_snapshots` | Aggregator prices; never seeded (schema rule, brief) |
| Michelin, in any form | The brief; its page shows no distinction. Its descriptive line would imply one |
| `press[2]`, `press[3]`, `press[4]` (two Wallpaper*, one Surf Dubai, all on the hotel's site) | Not traced to an original |
| `press[5]`, `press[6]`, `surf_statements` from Takeoff, Hotel Guru, collectorscarworld | `via_digest`: wording may be condensed, so not quoted |
| `reviews.quotes[0]`, `[1]`, `[2]` | Machine-translated by Google on Trip.com: not the guest's words (schema: verbatim guest words, never translated) |
| `reviews.quotes[4]` (781 characters), `[5]` (971) | Over the 600 cap, and testimonials are not trimmed. `[5]` also names a staff member |
| `reviews.quotes[7]` (mixed, 2,180 characters) | Over the cap; the dossier says never trim it |
| `reviews.quotes[8]` (booking dispute) | Dossier: "not for the site" |
| `stayInfo.deposit`, US$200 | Trip.com only, and may be that platform's term. Owner item |
| `booking.rate_terms`, triple-share US$75++ | Search snippet of the engine page, not seen live. Its breakfast limit is on the page, in Dining ¶5, so the copy does not widen it |
| Dhillan | Dossier: not without the owner |
| Linden Davis, lobby furniture | One 2017 line, and the hotel renovated in 2023 |
| "Luxury", "world class surf", "famed", "Kabalana Surf Beach", "holiday of a lifetime" | Positioning, and unevidenced rankings |
| "the epitome of quiet elegance, design excellence, thoughtful detail and home comforts", "the crowning jewel of southern Sri Lanka", "World famous", "a consistent swell" | Round 2: rankings and a frequency nothing in the dossier checks (review rows 1 to 4). The owner can restore them with evidence: a source for the swell would also fill `season` |
| `facilities` hygiene and safety rows (COVID items, CCTV, alarms, extinguishers), Invoices, Internet, Newspapers, Beach, Beachfront, Outdoor furniture, Wine / Champagne | Noise, or said elsewhere on the page |
| `videos[0]` | Copy has no use for it; license unknown, `usable: false` |

## Each fact once (constraint 10)

Adults only: `tagline`. Beachfront, boutique hotel, Ahangama as place: `tagline` (the intro's "boutique hotel" is the owner's "amenities of an intimate boutique hotel", a different claim). Mile-long white sand: `spot`. Nine rooms: rooms ¶1. Every room seeing the ocean: rooms ¶1 (`rooms[3]` names the suite's ocean-view balconies, and intro ¶3 is the shared spaces). Balcony or patio: rooms ¶1. Sizes, floors, beds: `rooms[]`. Common room kit: rooms ¶3. Rain shower: rooms ¶2 (pressure), ¶3 (two people). Triple: rooms ¶4. Rates: rooms ¶5 and `closing` (the link, as `closing_intent` asks). Pool: intro ¶4. Media room, lawns: intro ¶3. Name's meaning, evening light: Why Sandhya. Owner and craftsmen: Casual Luxe ¶2. Wallpaper*: Casual Luxe ¶3. Opened, renovated: Casual Luxe ¶4. Service: Casual Luxe ¶5. Sustainability: Looking after ¶1. Dishes: dining ¶2. Breakfast: dining ¶5. Cooking class: `amenities[8]`. Exclusive Use: block for words, `priceList[0]` for price. Front desk: `hoursNote`. Check-in, check-out: `stayInfo`. Phone, email, address: `contact`. Train station: Kabalana ¶5. Galle Fort: Kabalana ¶2.

The word "sunset" appears in Kabalana ¶1 as part of the owner's scene sentence; the evening itself is told once, in Why Sandhya.

## Required fields (`beach_lodging`)

`rooms[]` 4 rows. `bookingLinks[]` 5 rows. `photos[]`: 187 in the dossier, seeded by the deployer. `stayInfo` check-in and check-out set. `amenities[]`, `ratings[]`, `testimonials[]`, `spot` all set. `season` empty: no source. `contact.whatsapp` empty: stated above.
