# copy review: the-sandhya, en

Copyeditor 0.4.2, round 1, 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. Input: `en.json` (copywriter 0.5.0, humanizer 0.2.1), `en.draft.json`, `sources.md`, `humanizer-notes.md`, `dossier.json`. Every sentence below was read against the dossier, not against `sources.md`.

## Verdict: FAIL, round 1

| Check | Result |
|---|---|
| Fact audit | **4 `unsourced`, 1 `contradicted`.** Back to the copywriter |
| Voice audit | **Not clean.** 5 lines the agents wrote break the register: humanizer, no ruling needed. The owner's triads and tell-list phrases: the rules conflict, see below |
| Completeness | Required fields covered. 2 duplicate facts: copywriter |

The fact audit fails on its own, so the voice conflict does not decide this verdict. It does decide how much work round 2 is.

## Flagged sentences

| # | Sentence | Field | Verdict | Why | Owner |
|---|---|---|---|---|---|
| 1 | "Our 9 spacious rooms are the epitome of quiet elegance, design excellence, thoughtful detail and home comforts." | Rooms ¶1 S1 | `unsourced` | A superlative about the hotel. No dossier entry ranks it against anything. The 9 and "spacious" stand; "the epitome of … design excellence" does not | copywriter |
| 2 | "Centuries old Galle Fort, the crowning jewel of southern Sri Lanka and a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `unsourced` | "the crowning jewel of southern Sri Lanka" is a superlative ranking of a place, with only the hotel's marketing behind it. The 25 minutes and UNESCO status stand | copywriter |
| 3 | "World famous Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `unsourced` | "World famous" is the same claim as "famed", which `sources.md` cut elsewhere as an unevidenced ranking. "manageable day trips" stands as `location.nearby[2]` | copywriter |
| 4 | "Pristine sand, stunning sunsets and a consistent swell have nurtured a laid-back scene …" | Kabalana ¶1 S2 | `unsourced` | "a consistent swell" is a frequency, and nothing counts it. `season` is a stated gap ("no best months from any source"; "Generic coast knowledge needs a source of its own"), so the page says consistent and has nothing on when. Playbook §7: surf knowledge is sourced or omitted | copywriter |
| 5 | "A continental breakfast is included in your stay." | Dining ¶5 | `contradicted` | Dropped qualifier. `booking.rate_terms` says breakfast is "for two adults", and Rooms ¶4 on the same page offers a third adult in the Studio King, who now reads as covered. `sources.md` left it out knowingly because that source is a search snippet. The evidence is weak and the case is narrow, but the rule has no exception for a weak limit, and the copy may not widen the fact while the dossier still holds it | copywriter |
| 6 | "All our retreat rooms have unobstructed sweeping views …" with intro ¶2 "… omnipresent in every part of the hotel including all our Studios and Suite" | Rooms ¶1 S2, intro ¶2 | duplicate | Every room sees the ocean, stated in two blocks. Not in the `sources.md` "each fact once" list | copywriter |
| 7 | "… sweeping views of the white sandy beach …" with `spot` "… a mile long, white sandy beach …" | Rooms ¶1 S2, `spot` | duplicate | White sand stated in two fields. `sources.md` lists it once | copywriter |
| 8 | "Listings differ on the minimum age, and some say check-in after 16:00." | `stayInfo.note` S1 | voice | True and an honest limit, kept in the audit as `sourced`. On the hotel's own page it speaks as an aggregator about the hotel, while the rest of the page says "we" | humanizer |
| 9 | "Ask the hotel before you book." | `stayInfo.note` S2 | voice | Same: third person on a first-person page | humanizer |
| 10 | "listed by the hotel; ask who runs them and what they cost" | `amenities[6].note` | voice | Same | humanizer |
| 11 | "listed by the hotel; ask who provides the boards and what they cost" | `amenities[7].note` | voice | Same | humanizer |
| 12 | "The hotel publishes this as a “from” price, plus “++”." | `priceList[0].note` | voice | Same. This wording came in during the humanizer pass | humanizer |

**How I drew the line on owner prose in the fact audit.** The hotel's statement about its own premises, offer or beliefs is `sourced`: the dossier carries it with a URL, even when only the hotel says it. A ranking or frequency about the wider world, with only hotel marketing behind it, is not, because the rule asks for the comparison checked or the frequency counted, and the copywriter already cut "prime", "unique", "famed" and "world class" on that ground. Rows 1 to 5 apply the rule's letter. Apart from the narrow breakfast case in row 5, the dossier does not show any sentence on this page to be false.

## The conflict: owner prose against the voice rules

Reported plainly, because the humanizer asked the reviewer to judge it.

- **What my rules say.** The voice audit scores "no triads" and "no padding vocabulary", and a pass needs the audit clean. There is no exception for owner prose. The humanizer's own hand-off list also says "No phrase from the tell list survives", with no exception.
- **What the humanizer did.** It kept the hotel's triads and "Whether", "Elevated", on the grounds of its constraint 7 ("The owner is the author") and the copywriter's rule ("Keep it verbatim where it works"). It disclosed this in full; nothing was hidden.
- **Where they disagree.** The same audit also scores "register matches the owner's", which verbatim owner prose passes by definition. On this page "no triads" and "register matches the owner's" cannot both be satisfied. Under the rules as written, the choice does not pass the voice audit.
- **What a round 2 cannot do.** The humanizer will keep these lines for the same reason unless someone rules, so another pass without a ruling repeats this one. The decision is not in my prompt, and I did not settle it by exempting them. It needs Alon, or Shahar as the rule's author.

Whichever way it goes, three things hold:

1. **The notes undercount.** The humanizer lists eight triads. Two more are in the copy: "We are not international. We are not local. We are simply The Sandhya." and "vegetarian, vegan, keto and other dietary lifestyles".
2. **The grammar policy is uneven.** "has nurtured" was corrected as a grammar slip in an owner sentence, while "Designed to feel like … your relaxation starts" (intro ¶1) and "From our signature … we truly believe" (Dining ¶2) were left, though the notes admit neither parses. "as temperature cools" and "stocks, spice blends, jams are made" are in the same position.
3. **Being verbatim does not stop it reading as generated.** "the epitome of quiet elegance" and "ethereal glow of orange, pink and blue hues" read as machine copy to a stranger who does not know the hotel wrote them. The counts in the notes are right: "array" 4, "thoughtful" 3, "eclectic" 2, "stunning" 2.

The lines in rows 8 to 12 are not owner prose, so this conflict does not shelter them.

## Voice score per section

`Y` pass, `N` fail. Rhythm, triads, padding, concrete nouns, register, read aloud. At page level: honest limit **Y** (`stayInfo.note`, the two amenity notes, the train station); locale cadence **Y** (`en` only).

| Section | Rhythm | No triads | No padding | Concrete | Register | Aloud | Score | Quoted |
|---|---|---|---|---|---|---|---|---|
| Intro | Y | N | N | Y | Y | N | 3/6 | "Whether you are enjoying the sunshine …"; "magnificent and omnipresent"; "Designed to feel like … your relaxation starts" |
| Why Sandhya | Y | N | N | Y | Y | Y | 4/6 | "ethereal glow of orange, pink and blue hues"; "magical moment" |
| Casual Luxe | Y | N | N | Y | Y | Y | 4/6 | "understated design, thoughtful form and practical function"; "warm, kind, attentive"; "We are not international. We are not local. We are simply The Sandhya." |
| Looking after the place | Y | Y | N | Y | Y | Y | 5/6 | "our stunning environment"; "We strive for sustainable tourism." sits bare |
| The rooms | Y | Y | N | Y | Y | N | 4/6 | "the epitome of quiet elegance, design excellence, thoughtful detail and home comforts". ¶3 is the best writing the agents did: concrete and uneven |
| The Dining Room | Y | N | N | Y | Y | N | 3/6 | "Elevated Comfort Food"; "food heaven highlights"; "From our signature … we truly believe"; "vegetarian, vegan, keto" |
| Exclusive Use | Y | Y | N | Y | Y | Y | 5/6 | "your special occasion"; "blank canvas" |
| Kabalana and around | Y | N | N | Y | Y | Y | 4/6 | "surfers, families, and digital nomads"; "Pristine sand, stunning sunsets and a consistent swell"; "crowning jewel"; "awe-inspiring". Place names keep it concrete |
| `tagline`, `closing`, `spot`, `hoursNote` | Y | Y | Y | Y | Y | Y | 6/6 | Plain. The `closing` edit reads better than the draft |
| Notes (`stayInfo`, `amenities`, `priceList`) | Y | Y | Y | Y | N | Y | 5/6 | Rows 8 to 12 above |

Also noted, not fails: `bookingLinks[1–4]` "Studio King: check live dates" is a colon label four times, which the humanizer kept so as not to promise `?rid=` preselects a room, and that reasoning holds. `featureLine` "this captivating view" has no antecedent when it stands alone over an image.

## The three items asked about

**Wallpaper\* fragment: `sourced`, clean.** "a clean-lined boutique hotel with Scandinavian design sensibilities." is an exact substring of `press[0].quote`, checked by script. That entry is the one read in full on wallpaper.com, carries no `via_digest` flag, and is not `press[2]` or `press[3]`, the two untraced quotes on the hotel's site. Cutting the opening clause changes no meaning. The page dates from 2017 (modified 2022), before the 2023 renovation stated two lines later, and the present-tense "describes" is true because the page was live at fetch.

**Kayak 9.4 from 159: `sourced`, with an open condition.** The dossier carries score, count, URL and `fetched_at`, so it meets the definition, and I did not re-fetch it. But:
- `dossier/the-sandhya/sources.md` says of digest entries "re-check against the page before quoting on a site". That has not been done, and `capturedAt` means "read from the platform" in the schema. **A person must read the number on Kayak before go-live**; `sources.md` says so too, and it should not be lost.
- The Momondo "care taken" is weaker than it sounds. Both URLs carry the same hotel id (2781869), and both were read by the same summarising method, so this looks like one dataset read twice. It supports the digest's reading of the number and should not count as a second source. The breakdown does add up to 159 (checked).
- Kayak's five sub-scores average 8.7, and four of the five sit below the 9.4 headline (Cleanliness 8). That is not a contradiction, but it is worth a look when the person opens the page.

**Surf lesson and board hire rows: `sourced`, contradiction held open.** Own site `/design` lists "Yoga and surf lessons" and "Surfboard hire" (`facilities[6]`, `[7]`). The engine lists "Surfing lessons" and "Yoga" but no board hire. Takeoff, via digest, says the hotel has no surf school. `contradictions.surf_lessons` says own or arranged is not stated. The rows claim no provider, price or schedule, and "ask who runs them" keeps the question open rather than settling it in the copy's favour. Fact is fine; register is not (rows 10, 11).

## Draft against final

Nine changes, as the notes say, plus `humanizer_version`. Nothing appeared in the rewrite: no new number, place, amenity or distance. `testimonials`, `ratings`, `contact`, `bookingLinks`, `amenities`, `stayInfo` and `socialLinks` are byte-identical to the draft. The two "from" and "++" qualifiers survived the price-note rewrite. `sources.md` is accurate on every index I followed, with one stale row: Looking after ¶1 still quotes "the vibrant local community", though its header says rows quote the result.

## Fact audit: one row per sentence

Keys are dossier paths. `owner_copy[n]` rows were read word for word against the entry.

### Single fields

| Sentence | Field | Dossier key | Verdict |
|---|---|---|---|
| "The Sandhya" | `businessName` | `business.name` | `sourced` |
| "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." | `tagline` | `business.description`, `location.address`; age: `contradictions.age_policy`, own site and engine (MaxChildren 0) against Trip.com 12+. Disclosed in `stayInfo.note`, not settled silently | `sourced` |
| "See live dates on our own booking page." | `closing` S1 | `booking.path`, `.engine_url`. **Engine never seen working from a real browser** (`booking.engine_status`, `gaps[]` booking.live_rates) | `sourced` |
| "If you have a question first, call or email us." | `closing` S2 | `contact.phone`, `contact.email` | `sourced` |
| "With panoramic glass doors & windows throughout, this captivating view is our artwork." | `featureLine` | `owner_copy[3]` S2, spelling fixed | `sourced` |
| "Kabalana is a mile long, white sandy beach on the golden south coast of Sri Lanka." | `spot` | `owner_copy[18]`, `[19]`. `[18]` says "A mile long" of "the perfect holiday destination", not by name: applied to Kabalana by inference from the page. Guests: "long stretch", "long (enough)" | `sourced` |
| (empty, reason stated) | `season`, `openingHours` | `season.gap`, `hours` | n/a |
| "The front desk is open 24 hours a day." | `hoursNote` | `hours_note` (Trip.com) | `sourced` |
| "Listings differ on the minimum age, and some say check-in after 16:00." | `stayInfo.note` S1 | `contradictions.age_policy`, `.check_in` | `sourced` |
| "Ask the hotel before you book." | `stayInfo.note` S2 | `contact` | `framing` |
| 14:00 / 12:00 | `stayInfo` | `stayInfo.checkInFrom`, `.checkOutTo`; other side shown in the note | `sourced` |

### Copy blocks

| Sentence | Field | Dossier key | Verdict |
|---|---|---|---|
| "Pause, take a deep breath & exhale. You are home." | intro heading | `owner_copy[0]` | `framing` |
| "Designed to feel like an exclusive private beach house … wide wooden façade." | intro ¶1 | `owner_copy[2]` | `sourced` |
| "Inside, you will catch the first glimpses of our star attraction, The Indian Ocean … all our Studios and Suite." | intro ¶2 | `owner_copy[3]` S1 | `sourced` (duplicate, row 6) |
| "Whether you are enjoying the sunshine … the sea is always your view." | intro ¶3 | `owner_copy[4]` S2; media room also `facilities` | `sourced` |
| "Dipping your feet in the azure waters of our swimming pool, you will soon be hypnotised by the allure of the white tipped surf breaks just a few meters ahead." | intro ¶4 | `owner_copy[5]`, length cut for `contradictions.pool`. **"just a few meters" is the hotel's own figure.** The only measure is 74 m pin to coastline, `location.distance_to_shore`, a pin distance, not pool to break, so not a contradiction. "A stone's throw" was cut on guest evidence; no such evidence exists here. Owner to confirm | `sourced` |
| "Sandhya, in Sanskrit संध्य, means “twilight.”" | Why ¶1 S1 | `business.name_meaning` | `sourced` |
| "It is that magical moment between light and dark." | Why ¶1 S2 | `business.name_meaning` | `framing` |
| "Come evening, as temperature cools and the sun begins to set … cotton candy-clouded sky." | Why ¶2 | `owner_copy[7]`; sunset over the ocean also `room_types[0].engine_description` | `framing` |
| "Casual Luxe is at the heart of our ethos at The Sandhya." | Casual ¶1 S1 | `owner_copy[13]` | `framing` |
| "We prioritise understated design, thoughtful form and practical function above conspicuous bling and glitter." | Casual ¶1 S2 | `owner_copy[13]` | `sourced` |
| "Our property’s furnishings are inspired by mid-century aesthetics and embellished with mod-chinoiserie decor." | Casual ¶2 S1 | `owner_copy[6]` | `sourced` |
| "Our Singaporean owner’s discerning vision has been brought to life by the local designers and craftsmen he worked with across Sri Lanka." | Casual ¶2 S2 | `owner_copy[6]`, `business.owner` | `sourced` |
| "Wallpaper* describes The Sandhya as “a clean-lined boutique hotel with Scandinavian design sensibilities.”" | Casual ¶3 | `press[0].quote` | `sourced` |
| "We opened in 2017 and renovated in 2023." | Casual ¶4 | `business.since` and its note; Trip.com only, Wallpaper* first published 2017-06-09. Owner to confirm | `sourced` |
| "Our service is warm, kind, attentive yet informal." | Casual ¶5 S1 | `owner_copy[15]` | `sourced` |
| "Ask for your heart’s desire or simply be left alone when seeking that self-restoration." | Casual ¶5 S2 | `owner_copy[15]` | `framing` |
| "Just feel at home and allow us to look after you." | Casual ¶5 S3 | `owner_copy[15]` | `framing` |
| "We have blended the best of the worlds that we live in." | Casual ¶6 S1 | `owner_copy[17]` | `framing` |
| "We are not international. We are not local. We are simply The Sandhya." | Casual ¶6 S2–4 | `owner_copy[17]` | `framing` |
| "We support the local community and our stunning environment, with a zero-food waste menu, a ban on single-use plastic, water recycling and a care programme for our beach turtles." | Looking after S1 | `sustainability`, first person as its note asks; `facilities` "Single-use plastics removed". Beside `amenities[18]` "Bottled water": the dossier does not say what the bottles are. Owner item | `sourced` |
| "We strive for sustainable tourism." | Looking after S2 | `sustainability` | `framing` |
| "Our 9 spacious rooms are the epitome of quiet elegance, design excellence, thoughtful detail and home comforts." | Rooms ¶1 S1 | 9: `room_count`, the own site and five others against one digest. Epitome: nothing | **`unsourced`** (row 1) |
| "All our retreat rooms have unobstructed sweeping views … private balcony or exclusive patio area." | Rooms ¶1 S2 | `owner_copy[8]`; `room_types[].outdoor`, `.view` | `sourced` (duplicates, rows 6, 7) |
| "We have included thoughtful touches from evening lavender scents to high pressure rain showers … any one of our room types." | Rooms ¶2 | `owner_copy[8]` S3 | `sourced` |
| "Every room has a plush pillow-top mattress with 500 thread count linen, a shower big enough for two, Spa Ceylon amenities, bathrobes and slippers." | Rooms ¶3 S1 | `room_types[0–3]`: `.site_text`, `.engine_description`, `.amenities`. Checked for all four rooms | `sourced` |
| "Each one also has central air conditioning and a ceiling fan, a desk, universal sockets, a hairdryer and a Bluetooth speaker." | Rooms ¶3 S2 | `room_types[0–3].amenities`, `.engine_amenities`. Checked for all four | `sourced` |
| "High speed WiFi too, with newspapers and magazines from around the world on PressReader." | Rooms ¶3 S3 | `room_types[0–3].amenities` | `sourced` |
| "In the Studio King, a triple occupancy can be arranged (subject to availability) with a supplement." | Rooms ¶4 | `room_types[0].engine_description`, `.sleeps_note` | `sourced` |
| "Nightly rates are on our booking page, for the dates you choose." | Rooms ¶5 | `booking.path`, `.rate_terms` ("per room per night"). **Engine not seen live**: `gaps[]` booking.live_rates | `sourced` |
| "Elevated Comfort Food was the brief for our visiting menu designer, Chef Christophe DuBois." | Dining ¶1 S1 | `owner_copy[12]`, `dining.menu_designer` | `sourced` |
| "Working closely with our owner, a self-confessed “easy foodie”, the team conjured …" | Dining ¶1 S2 | `owner_copy[12]` | `sourced` |
| "From our signature Sri Lankan rice & curry … we truly believe some of the island’s best qualities may be expressed through our food …" | Dining ¶2 | `owner_copy[10]`, `dining.dishes`. A stated belief, not a ranking of the hotel | `sourced` |
| "Our breads, pastas, sauces, infused mayonnaise, stocks, spice blends, jams are made in-house and the menus subtly evolve with the seasons." | Dining ¶3 | `owner_copy[11]`, `dining.made_in_house` | `sourced` |
| "If you don’t find what you crave, simply ask our team to prepare what your tummy desires." | Dining ¶4 S1 | `owner_copy[9]` | `sourced` |
| "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining ¶4 S2 | `owner_copy[9]`, `facilities` | `sourced` |
| "A continental breakfast is included in your stay." | Dining ¶5 | `dining.breakfast`, `facilities`; limit in `booking.rate_terms` dropped | **`contradicted`** (row 5) |
| "Our home at The Sandhya can be your very own private beach house with an Exclusive Use booking." | Exclusive ¶1 S1 | `owner_copy[24]` | `sourced` |
| "Our position on Kabalana Beach, in a secluded nook, lends itself to an intimate wedding party … or simply to celebrate life." | Exclusive ¶1 S2 | `owner_copy[24]`; Wallpaper* "a quiet corner" | `sourced` |
| "With the beach as your blank canvas and with our delightful staff at your service, we offer a private setting for your special occasion." | Exclusive ¶2 | `owner_copy[24]` S3 | `framing` |
| "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own in recent years with surfers, families, and digital nomads alike." | Kabalana ¶1 S1 | `owner_copy[19]`, `location.spot`. About the beach; "families" is not about this adults-only hotel | `shared-context` |
| "Pristine sand, stunning sunsets and a consistent swell have nurtured a laid-back scene …" | Kabalana ¶1 S2 | `owner_copy[19]`. Swell: uncounted, `season` gap. "Pristine": `reviews.quotes[7]` reports debris on the beach, other guests call it clean | **`unsourced`** (row 4) |
| "Centuries old Galle Fort, the crowning jewel of southern Sri Lanka and a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `owner_copy[21]`, `location.nearby[0]`. Ranking: nothing | **`unsourced`** (row 2) |
| "While away a whole day browsing through an eclectic array of boutiques, stopping for well-earned sips and bites from an ever-growing cafe and restaurant scene." | Kabalana ¶2 S2 | `owner_copy[21]` | `shared-context` |
| "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have amazing surf points, whale-watching boat rides and a dizzying array of dining options." | Kabalana ¶3 S1 | `owner_copy[22]`, `location.nearby[1]`. Same places and things as the draft | `shared-context` |
| "Our own town Ahangama has grown into a foodies’ haven with a diverse selection of high-quality eateries and night spots." | Kabalana ¶3 S2 | `owner_copy[22]`, "stone's throw" correctly cut | `shared-context` |
| "World famous Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `owner_copy[23]`, `location.nearby[2]`. "World famous": nothing | **`unsourced`** (row 3) |
| "Depart your room in the crisp early morning and be back in time for a late lunch or cocktail." | Kabalana ¶4 S2 | `owner_copy[23]` | `framing` |
| "Ahangama train station is 1.4 km from the hotel." | Kabalana ¶5 | `location.nearby[3]` (Trip.com) | `sourced` |

Headings "Why Sandhya", "Casual Luxe", "Looking after the place", "The rooms", "The Dining Room", "Exclusive Use", "Kabalana and around" assert nothing beyond their blocks: `framing`.

### Prices, rooms

| Row | Field | Dossier key | Verdict |
|---|---|---|---|
| Exclusive Use, 3500 USD per night, "from", "++", as of 2026-11-06 | `priceList[0]` | `offers[0]`; qualifiers kept, `fetched_at` matches | `sourced` |
| Studio King, King bed, sleeps 2, "38 sq m on the upper or ground floor, with 3.5 m floor-to-ceiling glass doors." | `rooms[0]` | `room_types[0]`, `.site_text[1]` | `sourced` |
| Studio Twin, 2 super-single beds, sleeps 2, "38 sq m on the upper floor, with 3.5 m …" | `rooms[1]` | `room_types[1]`, `.site_text[1]` | `sourced` |
| Studio+ King, King bed, sleeps 2, "40 to 43 sq m on the upper or ground floor, with a deep stand-alone soaking tub and dual sinks." | `rooms[2]` | `room_types[2]`, `contradictions.room_size`, both sides in the range | `sourced` |
| Director’s Suite, King bed, sleeps 2, "About 75 sq m on the top floor, with a living area, walk-in wardrobe, soaking tub, ocean-view balconies and a 55-inch TV." | `rooms[3]` | `room_types[3]`, `.site_text[1–3]`. Bed: `contradictions.suite_bed`, a side taken and not shown; two of three own-surface mentions, and it understates rather than flatters, so not `contradicted`. Owner item | `sourced` |

### Amenities

| Row | Dossier key (`facilities`) | Verdict |
|---|---|---|
| Airport transfers, "additional charge" | "Airport transfers" (own site); "… additional charge" (Trip.com) | `sourced` |
| Transfers throughout Sri Lanka | own /design | `sourced` |
| Tuk tuk bookings | own /design | `sourced` |
| Car and motorbike rentals | own /design | `sourced` |
| Tours and activities assistance | own /design; "Tour Assistance" (engine) | `sourced` |
| In-room spa massage | own /design; "Massage" (engine) | `sourced` |
| Yoga and surf lessons, note | own /design; engine; `contradictions.surf_lessons` | `sourced` |
| Surfboard hire, note | own /design only | `sourced` |
| Sri Lankan rice & curry cooking class | own /dining; "Cooking class" (engine) | `sourced` |
| Celebratory arrangements | own /design | `sourced` |
| Laundry and ironing | "Laundry", "Ironing Service" | `sourced` |
| Daily housekeeping | engine | `sourced` |
| Beach chairs, loungers and umbrellas | "Beach chairs / loungers", "Beach umbrellas" | `sourced` |
| Pool and beach towels | "Pool / Beach towels" | `sourced` |
| Sun deck and terrace | "Sun deck", "Terrace" | `sourced` |
| Garden | engine | `sourced` |
| Library | Trip.com | `sourced` |
| Welcome drink | engine | `sourced` |
| Bottled water and refillable water stations | engine, two rows | `sourced` |
| 24-hour check-in | engine | `sourced` |
| 24-hour security | engine | `sourced` |
| Safety deposit box | engine | `sourced` |
| Baggage storage | engine | `sourced` |
| Free parking | Google; "Guest parking" (engine) | `sourced` |
| Non-smoking rooms | engine | `sourced` |
| Hypoallergenic rooms | engine | `sourced` |
| Designated smoking area | engine | `sourced` |
| Access to healthcare professionals | engine | `sourced` |
| Cashless payment accepted | engine | `sourced` |

### Ratings, testimonials, contact, links

| Row | Field | Dossier key | Verdict |
|---|---|---|---|
| Trip.com, 9.7/10, 56, 2026-11-06 | `ratings[0]` | `reviews.trip`, first-hand | `sourced` |
| Kayak, 9.4/10, 159, 2026-11-06 | `ratings[1]` | `reviews.kayak`, `via_digest`; see above | `sourced`, person to read before go-live |
| "It’s a beautiful place …", Guest User, 2026-06 | `testimonials[0]` | `reviews.quotes[3]`, exact match by script, not machine-translated, 473 characters | `sourced` |
| "A great stay …", Guest User, 2026-02 | `testimonials[1]` | `reviews.quotes[6]`, exact match by script, not machine-translated, 387 characters | `sourced` |
| +94765700007 | `contact.phone` | `contact.phone` | `sourced` |
| reservations@thesandhya.com | `contact.email` | `contact.email` | `sourced` |
| "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | `contact.address` | `location.address`, Google's words, postcode noted per playbook §6 | `sourced` |
| Google Maps URL | `contact.mapUrl` | `location.map_url` | `sourced` |
| "Check rooms and live dates" | `bookingLinks[0]` | `booking.engine_url` | `sourced` |
| Four "<room>: check live dates" | `bookingLinks[1–4]` | `booking.engine_room_links`, all four `rid` values match. Preselection unverified, not promised | `sourced` |
| Instagram | `socialLinks[0]` | `contact.socials.instagram` | `sourced` |
| English | `languagesSpoken` | `languagesSpoken` (Trip.com only) | `sourced` |

## Completeness (`beach_lodging`)

Must have: `rooms[]` 4, `bookingLinks[]` 5, `photos[]` 187 in the dossier for the deployer. Should have: `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `spot` all set. `season`, `openingHours` and `contact.whatsapp` are empty, each with a stated reason in `sources.md` that holds against the dossier. Caps on the prose fields, notes and quotes were checked by script and met, including the longest body, Kabalana at 1,213 of 1,500. No section is padded.

For the designer, not a copy fail: `testimonials[].source` is `other` and the schema has no URL or label on a testimonial, so **nothing in the content names Trip.com for the two quotes**. Playbook §6 asks for the source. `sources.md` flags this for ratings, which at least have a `url`, but not for testimonials. "Guest User" is as published, which the schema allows, though §6 asks for a first name; Trip.com shows none.

## What must change to pass

1. **Copywriter:** rows 1 to 5, each claim either gets a dossier source or leaves the page. Rows 6 and 7, each fact stays in one place.
2. **Humanizer:** rows 8 to 12, the register.
3. **Alon or Shahar first:** the ruling on owner prose against the voice rules. Without it, round 2 cannot come back clean on voice.

Round 2 is a full re-check of every sentence (hard constraint 6).

## Not covered

No live page was opened: the dossier is the ground truth for this review. Photos and captions are outside it, as the copy has none. The engine links and the Kayak number remain for a person to open.
