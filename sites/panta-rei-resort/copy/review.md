# copy review: panta-rei-resort · en · round 1

Reviewer: copyeditor 0.4.2. The runtime prompt came from `ONESHOT_RUN=2026-11-lk-surf-01 node tools/prompt.mjs copyeditor`, and all of its layers were read (945 lines). Run `2026-11-lk-surf-01` (test, outbound), state `copy_humanised`, 2026-11-06. I am independent of the copywriter (0.5.0) and the humanizer (0.2.1).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/panta-rei-resort/dossier.json`. I read the dossier's own words and did not take them from `sources.md`. Where `sources.md` quotes a PDF more fully than the dossier does, the dossier's text is what counts. `audit.json` is not a source (hard constraint 2). No `industry.md` exists (outbound run), so there is no research check.

## Verdict: **FAIL** (round 1 of 2)

97 rows: 83 `sourced`, 7 `framing`, 3 correctly empty, 0 `shared-context`, **4 `unsourced`, 0 `contradicted`**. Every unsourced sentence was already in the copywriter's draft, so all four go back to the **copywriter**. One voice flag goes back to the **humanizer**. The `beach_lodging` required fields are covered.

| # | Field | Sentence | Verdict | Goes back to |
|---|---|---|---|---|
| U1 | `copyBlocks[2].body` ¶1 S2 | "Breakfast goes from smoothie bowls, granola and banana oat pancakes to shakshuka, or the Sri Lankan plate with egg hoppers, dhal and coconut sambal." | **unsourced** | copywriter |
| U2 | `copyBlocks[3].body` S3 | "In the season there's a longer schedule, with Pilates and other classes, all led by experienced instructors." | **unsourced** | copywriter |
| U3 | `copyBlocks[4].body` ¶1 S2 | "It's a full body oil massage that uses sport massage techniques on every muscle, for the physical demands of surfing, so your body recovers faster." | **unsourced** | copywriter |
| U4 | `copyBlocks[7].body` ¶2 S2 | "Agree the price before you set off, or ask us to call one." | **unsourced** | copywriter |
| V1 | `copyBlocks[2].body` ¶1 S4 | "In the evening the kitchen leans Mediterranean, traditional and modern." | voice | humanizer |

**What must change to pass:**
- U1 to U4 must each rest on the dossier, or be cut. For U1, U3 and U4 the words exist in the business's PDFs (menu, guest guide p.3 and p.7), but the dossier does not carry them: `menu.sections` holds dish names and prices only, `offers[4].note` cuts the massage text with an ellipsis, and `stay_info.transport` has no price advice and no "we can call". The copywriter cannot cite a PDF the dossier does not hold. The fix is either to drop the words, or to have the harvester add the PDF text to the dossier first and then re-cite it. Which one is for the orchestrator to decide.
- U2 attaches a condition, Pilates only in the season, that no source states.
- V1 must read cleanly.

Round 2 will re-check the whole file, not only these lines (hard constraint 6).

## Scope check

- **Draft vs final.** `en.draft.json` is byte-identical to `en.json` as committed by the copywriter (`43f7d5e`). Commit `0612ef1` (the humanizer) changed `closing`, `copyBlocks[1–4]`, `sources.md` and `humanizer-notes.md`, and added `humanizer_version`. No module, price, quote or contact field changed. The dossier was last changed in `23c45bf`, before the copy was written.
- **What appeared or went in the rewrite.** I checked each changed sentence against the draft and the dossier:
  - `closing`: dropped the "choose your dates … see what's free" sentence, which is still in [5] ¶2. No fact added.
  - [1] ¶2: dropped "or a slow afternoon in the sun". No fact added.
  - [2] ¶1: "walks in" became "drops in" (same fact). "Priced on weight" was **added** and is sourced (`menu.sections["Main dishes"]` "Whole Grilled Fish", "priced on weight"). "We call dinner a mix of traditional and modern Mediterranean dishes, with fresh ingredients and bold flavours" became "In the evening the kitchen leans Mediterranean, traditional and modern". The padding went, the fact stayed, but the sentence now reads badly (V1). The hoppers list (U1) was already in the draft.
  - [2] ¶2: "in the right spot for the sunset" became "Go up for the sunset." Same fact.
  - [3]: split into sentences. "Except Friday" became "Friday is the day off" (`offers[1].note` "Friday day off"). "Led by experienced instructors" became "**all** led by experienced instructors". That widens it to the "other classes" of U2, which were already unsourced in the draft.
  - [4]: split into two paragraphs. "Either one is an hour on the whole body" spells out what the draft implied, and is sourced (`offers[4]`, `offers[6]` "60 min full body"). The oil / every muscle / recovers faster sentence (U3) was already in the draft.
  - **Only one fact appeared during humanizing ("priced on weight"), and it is sourced.**
- **`sources.md` is mostly accurate, with three errors:**
  - [1] ¶1 and the tagline cite `images[img-001].description` for a ring of bungalows. img-001 actually says the buildings sit "in a ring of jungle and palms". The ring around the pool comes from `videos[vid-001].hero_candidate.why`, "the ring of red roofs around the pool" (ruling R1).
  - [4] rests on a full PDF quote that the dossier does not hold (U3).
  - [7] ¶2 rests on a full PDF quote that the dossier does not hold (U4).
- **Testimonials:** all six were machine-checked against `reviews.quotes[0,5,2,1,3,4].text`. Text and author are identical. The sources agree: `google` / `booking`, and `site` for Alba R, whose dossier source is "own site (testimonial on /restaurant)". Dates are null, matching `quotes_note` ("Dates not captured"). The longest quote is 557 characters, under the 600 limit.
- **Lengths:** all within the schema.
  - `tagline` 97, `closing` 107, `featureLine` 22 (limit 140).
  - Bodies 202–518 (limit 1500). `copyBlocks` 8 of 8.
  - `rooms[].note` ≤ 103, `stayInfo.note` 102, `hoursNote` 102, `amenities` 16 rows.
- **Prices:** `priceList[0–7]` equal `offers[0–7]` in price and currency. Units: `per_person` for the day pass, `per_lesson` for "per class", `flat` for "per treatment". The extra bed (`offers[8]`, USD 20) is carried as an amenity note, not a price row, which is acceptable. No room rate appears anywhere, following the schema's "Live prices are not content" rule.

## Rulings

**R1. Image and video descriptions as a source for a physical layout: accepted here, within limits.**

The tagline ("set around a large pool") and [1] ¶1 ("The bungalows sit in a ring around a long pool with a stone deck and loungers, and the garden runs between them") describe how the place is laid out. Each part has a dossier entry:
- **"large":** `business.description`, the owner's "the large pool".
- **"long pool":** `images[img-006].description`, "the long pool".
- **"stone deck and loungers":** `facilities[0]`, the owner's /about, "large outdoor pool with stone surround and loungers". This is the owner's own fact, not only a picture.
- **The ring around the pool:** `videos[vid-001].shows` "top-down drone over the ring of bungalows", and `videos[vid-001].hero_candidate.why` "the ring of red roofs around the pool".
- **The garden between them:** `images[img-035].description` "the lawn by the pool … red-roofed bungalows"; `facilities[7]` "garden"; guest Alba R "the pool and garden area".

Each of those image and video entries is business-owned media with its own `source_url` and `fetched_at`. A harvester's description of what the business's own photograph or film plainly shows has the same standing as a verbatim guest observation of a physical fact (base.md, Shahar 2026-09-23). It can source a layout. It never sources a ranking, a frequency or a cause. I opened img-001 to make sure the description is faithful: red-roofed bungalows and the main building do stand around the lawn and the stone-decked pool.

Verdict: `sourced`.

Limit, as a note: two of the four room types are not on that ring's pool side. The Family Villa has a "garden view" (`room_types[2]`) and the Suite has its own walled plunge pool (`room_types[3]`, img-043/046). "The bungalows" therefore reads as true for the main cluster. The room notes already say which rooms face the pool, so this is not a widened fact.

**R2. "Go up for the sunset." is `sourced`.**

The source is `facilities[1]`, the owner's /restaurant page: the bar is "above the restaurant", "at the perfect location to watch the tropical sunsets". The imperative restates the owner's claim. It does not add a view, a time or an opening hour.

**R3. "to guests and to anyone who drops in" is `sourced`.**

The sources are `facilities[1]`, "open all day to residents and outside guests", and `restaurant_hours[0].note`, About "We're open to outside guests too". "Drops in" is colloquial for "outside guests". It promises no table without booking beyond what "open to outside guests" says.

**R4. Distances in "Getting here and around" are `sourced`, and none crept closer.**

- Koggala Lake 1.5 km ("about 1.5 km"), Kathaluwa station 1.9 km, Ahangama station 2.1 km and Koggala Airport 5 km: each equals `location.nearby` (Booking.com).
- The beach distance is unresolved in `contradictions[0]` (300 m / 600 m / 366 m). It is given as "a short walk", which holds under every value (Booking's own "7-minute walk"). No number was picked in the business's favour.
- Galle Fort 18 km is left out, which is fine.

**R5. The address follows playbook §6.**

- **Google:** "back to life road, Kabalana Rd, Ahangama 80650, Sri Lanka" (`location.address`).
- **Copy:** "Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka".

Only the place-name capitals changed ("to" stays lower case, as the business's own site writes it). "Kabalana Rd" is not expanded, the postcode is Google's own, and the order is street, town postcode, country.

**R6. The fitness schedule: what is sourced and what is not.**

The dossier holds three statements:
- `facilities[2]` (events page): "daily yoga and Pilates classes led by experienced instructors; Vinyasa yoga 8:30AM daily except Friday; 'No need to book'".
- `offers[1].note` (schedule PDF): "Vinyasa yoga 8:30AM Mon–Thu, Sat, Sun; Friday day off".
- `season.gap` (guest guide): "During the season, our resort offers a extended schedule of activities".

How each sentence of [3] fares:
- "Vinyasa yoga is at 8:30 every morning; Friday is the day off." is sourced. The second clause states the exception.
- "In the season there's a longer schedule" is sourced.
- "…with Pilates and other classes" is **not** sourced (U2). It ties Pilates to the season, which no source does: the events page and the engine say Pilates is held daily. "Other classes" turns "activities" into classes.
- "all led by experienced instructors" spreads the instructor claim to those invented classes.

The page also contradicts itself: `amenities[4]` says "Daily yoga and Pilates classes", while [3] puts Pilates in the season only. The amenity row is the owner's own words (`facilities[2]`; engine "Yoga and pilates classes are held daily at 8:30am"), so it is `sourced`. Fixing U2 must leave the two consistent.

**R7. Massage wording.**

The dossier holds:
- `offers[4].note`: "'A unique program created specifically for surfers… sport massage techniques to address the physical demands of surfing'".
- `businessType_note`: "'Surf Therapy Massage — Full recovery after active surfing' (guest guide)".
- `offers[4–7]` labels: "60 min full body" and "45 min back, neck & shoulders".

How the sentences fare:
- [4] ¶1 S1 ("put together for surfers") is sourced.
- [4] ¶2 is sourced.
- [4] ¶1 S2 is **not** sourced (U3). "Oil", "every muscle" and "so your body recovers faster" are not in the dossier. The ellipsis in `offers[4].note` removes exactly those words, and "full recovery" is not "recovers faster". The last is also an efficacy claim, which needs its exact source.

## Fact audit (whole file, one row per sentence)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Panta Rei Resort" | `business.name.value` (Google) | sourced |
| 2 | `businessType` | `beach_lodging` | `businessType`; `business.type`; `businessType_note` | sourced |
| 3 | `tagline` | "A boutique resort set around a large pool in Kabalana, Ahangama, on the south coast of Sri Lanka." | "boutique resort in Kabalana" and "the large pool": `business.description`. "Set around": `videos[vid-001].hero_candidate.why` (R1). Ahangama: `location.address`. "South coast of Sri Lanka": `business.tagline.note` (Facebook "Hidden paradise in the south coast of Sri Lanka") | sourced |
| 4 | `closing` | "Booking direct gets you our best rate, and if there's anything you'd like to ask first, send us a WhatsApp." | `booking.path.note`: engine "Book direct with Panta Rei for our best available rates", site "Best price when booking direct". `contact.whatsapp` | sourced |
| 5 | `featureLine` | "No paradise like home." | `business.tagline.value`; About "NO PARADISE LIKE HOME" (case only) | sourced |
| 6 | [0] heading | "Welcome to Panta Rei" | none | framing |
| 7 | [0] ¶1 S1 | "Welcome to our boutique resort in Kabalana, Sri Lanka." | `business.description`, verbatim | sourced |
| 8 | [0] ¶1 S2 | "In Panta Rei you can escape the hustle and bustle … crystal blue beaches and rainforests come together." | `business.description`, verbatim (the owner's claim) | sourced |
| 9 | [0] ¶2 | "The resort features 16 bungalows, each with its own charm and style, inspired by wild nature and made from natural materials." | `business.description`; `room_count.value` 16. "Beautiful" and "unique" dropped; no fact added | sourced |
| 10 | [1] heading | "The pool" | none | framing |
| 11 | [1] ¶1 | "The bungalows sit in a ring around a long pool with a stone deck and loungers, and the garden runs between them." | `facilities[0]`; `images[img-006]`; `videos[vid-001].shows` / `.hero_candidate.why`; `images[img-035]`; `facilities[7]` (R1) | sourced |
| 12 | [1] ¶2 S1 | "The pool opens early in the morning, so you can swim before breakfast." | `facilities[0]` "open from early morning"; breakfast from 8:30 (`restaurant_hours[0]`) | sourced |
| 13 | [1] ¶2 S2 | "If you're staying nearby, you can come for the day too." | `offers[0]` "Pool day pass (non-residents)"; the qualifier is kept | sourced |
| 14 | [2] heading | "Restaurant and bar" | `facilities[1]` | sourced |
| 15 | [2] ¶1 S1 | "The restaurant serves breakfast, lunch, dinner and cocktails all day, to guests and to anyone who drops in." | `facilities[1]` "open all day to residents and outside guests"; `restaurant_hours[0]`; cocktails: `business.description` "a sunset cocktail" (R3) | sourced |
| 16 | [2] ¶1 S2 | "Breakfast goes from smoothie bowls, granola and banana oat pancakes to shakshuka, or the Sri Lankan plate with egg hoppers, dhal and coconut sambal." | Dish names: `menu.sections["Good Morning Panta Rei"]` (Smoothie Bowls, Granola Bowl, Banana Oat Pancakes, Shakshuka, Sri Lankan Breakfast). **"Egg hoppers, dhal and coconut sambal" is not in the dossier.** `menu.sections` holds names and prices only, and `menu.note` says the descriptions are in the PDFs | **unsourced** (U1) |
| 17 | [2] ¶1 S3 | "Lunch and dinner come off the same menu, with a fish bowl, the curry of the day and a whole grilled fish, priced on weight." | `menu.note`: Lunch and Dinner link to the same PDF. `menu.sections["Main dishes"]`: Fish Bowl, Curry of the Day, Whole Grilled Fish "priced on weight" | sourced |
| 18 | [2] ¶1 S4 | "In the evening the kitchen leans Mediterranean, traditional and modern." | `menu.note`: dinner is "a mix of traditional and modern mediterranean dishes" (V1 on wording) | sourced |
| 19 | [2] ¶2 S1 | "The bar is upstairs, above the restaurant." | `facilities[1]` "bar above the restaurant" | sourced |
| 20 | [2] ¶2 S2 | "Go up for the sunset." | `facilities[1]` "at the perfect location to watch the tropical sunsets" (R2) | sourced |
| 21 | [3] heading | "Panta Fitness Club" | `facilities[2]` | sourced |
| 22 | [3] S1 | "An open-air fitness area on the upper floor looks out over the resort." | `facilities[2]` "open-air fitness area overlooking the resort"; "upper floor": `videos[vid-003].shows` "covered upper floor", `images[img-020]` "upstairs balcony railing" (R1) | sourced |
| 23 | [3] S2 | "Vinyasa yoga is at 8:30 every morning; Friday is the day off." | `offers[1].note` "Vinyasa yoga 8:30AM Mon–Thu, Sat, Sun; Friday day off" | sourced |
| 24 | [3] S3 | "In the season there's a longer schedule, with Pilates and other classes, all led by experienced instructors." | "Longer schedule in the season": `season.gap` "extended schedule of activities". **Pilates as a season-only class, and "other classes", are not in the dossier.** `facilities[2]` says Pilates is daily (R6) | **unsourced** (U2) |
| 25 | [3] S4 | "You don't need to book." | `facilities[2]`, `offers[1].note` "No need to book" | sourced |
| 26 | [4] heading | "After the surf" | `businessType_note` "Full recovery after active surfing" | framing |
| 27 | [4] ¶1 S1 | "The Surf Therapy Massage was put together for surfers." | `offers[4].note` "created specifically for surfers" | sourced |
| 28 | [4] ¶1 S2 | "It's a full body oil massage that uses sport massage techniques on every muscle, for the physical demands of surfing, so your body recovers faster." | "Full body": `offers[4].label`. "Sport massage techniques … physical demands of surfing": `offers[4].note`. **"Oil", "every muscle" and "recovers faster" are not in the dossier** (R7) | **unsourced** (U3) |
| 29 | [4] ¶2 S1 | "There's a Revitalizing massage as well." | `offers[6]`; `facilities[4]` | sourced |
| 30 | [4] ¶2 S2 | "Either one is an hour on the whole body, or 45 minutes on the back, neck and shoulders." | `offers[4–7].label` | sourced |
| 31 | [5] heading | "Four ways to stay" | `room_types[0–3]` | sourced |
| 32 | [5] ¶1 | "Every room has air conditioning, hot water and wifi, is cleaned daily, and comes with breakfast." | `room_types[0–3].value.features`, each checked; `stay_info.breakfast` | sourced |
| 33 | [5] ¶2 S1 | "Prices move with the dates." | `offers_note`: the engine "prices only after dates are chosen". A reading of it, with no figure | framing |
| 34 | [5] ¶2 S2 | "Pick yours on our booking page and you'll see what's free and what it costs." | `booking.engine_url`; `offers_note` | sourced |
| 35 | [6] heading | "Groups and retreats" | `business.group_hosting` (groups for yoga and surfing) | framing |
| 36 | [6] S1 | "Planning to bring a big group to Sri Lanka?" | `business.group_hosting`, verbatim | framing |
| 37 | [6] S2 | "Whether it's for yoga, surfing, or simply soaking up the chilled island vibes, our resort is ready to host you." | `business.group_hosting`, verbatim | sourced |
| 38 | [6] S3 | "We'll take care of all the meals and accommodation, so you can focus on what matters most: enjoying every moment together." | `business.group_hosting`, verbatim (em dash → colon) | sourced |
| 39 | [7] heading | "Getting here and around" | none | framing |
| 40 | [7] ¶1 S1 | "Kabalana Beach is a short walk away and Koggala Lake about 1.5 km." | `contradictions[0]` (no number); `location.nearby` "Koggala Lake 1.5 km" (R4) | sourced |
| 41 | [7] ¶1 S2 | "Koggala Airport is 5 km from the resort, Kathaluwa station 1.9 km and Ahangama station 2.1 km." | `location.nearby` (R4) | sourced |
| 42 | [7] ¶2 S1 | "Tuk tuk drivers wait at the door of the hotel." | `stay_info.transport` "tuk tuk drivers waiting at the door" | sourced |
| 43 | [7] ¶2 S2 | "Agree the price before you set off, or ask us to call one." | **Not in the dossier.** `stay_info.transport` holds only "tuk tuk drivers waiting at the door; private taxi arranged on request; airport shuttle". The "agree a price" advice and the call service appear only in `sources.md`'s quote of the guide PDF | **unsourced** (U4) |
| 44 | [7] ¶2 S3 | "If you'd rather have a private taxi, we'll arrange it." | `stay_info.transport` "private taxi arranged on request" | sourced |
| 45 | `spot` | "The waves of Kabalana, a short walk from the resort." | `business.description` "surfing the waves of Kabalana"; `contradictions[0]`. No break named (`location.spot.gap`) | sourced |
| 46 | `season` | null | `season.gap` | correctly empty |
| 47 | `openingHours` | `[]` | `hours` `[]`; `hours_note.gap` (reception hours not published) | correctly empty |
| 48 | `hoursNote` | "Restaurant, every day: breakfast 8:30–12:00 (coffee from 8:00), lunch 13:00–17:00, dinner 18:00–21:30." | `restaurant_hours[0]` (site; "Everyday"). Breakfast end per `contradictions[2]`'s resolution (N3) | sourced |
| 49 | `priceList[0]` | Pool day pass · LKR 3500 · per person · "Spent at the restaurant" | `offers[0]` | sourced |
| 50 | `priceList[1]` | Fitness class: residents · LKR 2500 · "No need to book" | `offers[1]` (N4) | sourced |
| 51 | `priceList[2]` | Fitness class: in-house guests · LKR 3000 | `offers[2]` | sourced |
| 52 | `priceList[3]` | Fitness class: walk-ins · LKR 3500 | `offers[3]` | sourced |
| 53 | `priceList[4–7]` | Surf Therapy / Revitalizing, 60 min full body LKR 20000, 45 min back, neck & shoulders LKR 17000 | `offers[4–7]` | sourced |
| 54 | `lessons` / `credentials` / `rentals` / `brands` | `[]` | `businessType_note` (no lessons, rental or shop); `gaps[]` "surf offering" | correctly empty |
| 55 | `rooms[0]` | Double Room · "King-size bed or twin single beds" · 3 · "22 m², with a private balcony over the pool. En-suite shower." | `room_types[0]`: 22 m², beds, 3 guests, "private balcony with pool view", "en-suite bathroom with shower" (N5) | sourced |
| 56 | `rooms[1]` | Triple Room · "King-size bed and a sofa bed" · 3 · "30 m², with a private balcony over the pool. Bathroom with both a bathtub and a shower." | `room_types[1]`; beds per `contradictions[4]`'s resolution (engine) | sourced |
| 57 | `rooms[2]` | Family Villa · "Two king-size beds or four single beds" · 4 · "50 m², two bedrooms, garden view and a private balcony. Private bathroom plus an outdoor bath." | `room_types[2]` | sourced |
| 58 | `rooms[3]` | Suite with Private Pool · "King-size bed" · 2 · "40 m², with your own private pool just steps from the room and a chill-out corner with a built-in sofa." | `room_types[3]` (the label is `booking_label`); "Private chilling area with in-build sofa" | sourced |
| 59 | `stayInfo` times | check-in from 14:00 · check-out by 11:00 | `stay_info.check_in` "2 pm"; `.check_out` "11 am" (`contradictions[1]`'s resolution) | sourced |
| 60 | `stayInfo.note` S1 | "Children of any age are welcome." | `stay_info.house_rules[3]` | sourced |
| 61 | `stayInfo.note` S2 | "No pets, and no smoking in the rooms." | `house_rules[0–1]` ("Smoking inside: not allowed") | sourced |
| 62 | `stayInfo.note` S3 | "Quiet hours are 22:00 to 08:00." | `house_rules[2]` | sourced |
| 63 | `amenities[0]` | Large outdoor pool | `facilities[0]`; `business.description` (N6) | sourced |
| 64 | `amenities[1]` | Restaurant and bar, open to outside guests | `facilities[1]` | sourced |
| 65 | `amenities[2]` | Vegetarian, gluten-free and dairy-free options | `facilities[8]` | sourced |
| 66 | `amenities[3]` | Open-air fitness area and yoga shala | `facilities[2]`, `[3]` | sourced |
| 67 | `amenities[4]` | Daily yoga and Pilates classes · "additional charge" | `facilities[2]` "daily yoga and Pilates classes"; engine "held daily at 8:30am for extra charge" (`room_types[3].note`). It conflicts with [3] on the page (R6) | sourced |
| 68 | `amenities[5]` | Massage · "additional charge" | `facilities[4]`; `offers[4–7]` | sourced |
| 69 | `amenities[6]` | Free WiFi | `room_types[].features` "Wifi"; Booking.com free WiFi (`reviews.booking.categories` "Free WiFi") | sourced |
| 70 | `amenities[7]` | Free private parking | `facilities[7]` | sourced |
| 71 | `amenities[8]` | Airport shuttle | `facilities[7]`; `stay_info.transport` | sourced |
| 72 | `amenities[9]` | Private taxi · "on request" | `stay_info.transport` | sourced |
| 73 | `amenities[10]` | Laundry service · "additional charge, cash" | `facilities[5]` "private laundry service … (cash)" | sourced |
| 74 | `amenities[11]` | Safe box in the rooms | `facilities[6]` | sourced |
| 75 | `amenities[12]` | Generator for power cuts | `stay_info.generator` | sourced |
| 76 | `amenities[13]` | Garden and sun terrace | `facilities[7]` | sourced |
| 77 | `amenities[14]` | Cot for under-2s · "free, on request" | `house_rules[3]` "cot 0–2 years free on request" | sourced |
| 78 | `amenities[15]` | Extra bed for an adult · "US$20 per night, on request" | `offers[8]` "Extra bed (adult)", US$20 per person per night | sourced |
| 79 | `ratings[0]` | Booking.com 9.2/10 · 468 · 2026-11-06 | `reviews.booking` (rating, count, scale, `fetched_at`) | sourced |
| 80 | `ratings[1]` | Google 4.7/5 · 213 · 2026-11-06 | `reviews.google`. The engine's stale 4.8 / 9.1 and the unverified TripAdvisor 4.5 are correctly not used | sourced |
| 81 | `testimonials[0]` | Peter · google | `reviews.quotes[0]`, verbatim (machine-checked) | sourced |
| 82 | `testimonials[1]` | Alba R · site | `reviews.quotes[5]`, verbatim | sourced |
| 83 | `testimonials[2]` | Arianna, Italy · booking | `reviews.quotes[2]`, verbatim (line break kept) | sourced |
| 84 | `testimonials[3]` | Lynette · google | `reviews.quotes[1]`, verbatim | sourced |
| 85 | `testimonials[4]` | Oishanee, India · booking | `reviews.quotes[3]`, verbatim ("Everything thing" typo kept) | sourced |
| 86 | `testimonials[5]` | Akhila, Sri Lanka · booking | `reviews.quotes[4]`, verbatim | sourced |
| 87 | `contact.phone` | +94728003022 | `contact.phone.value` | sourced |
| 88 | `contact.whatsapp` | +94728003022 | `contact.whatsapp.value` | sourced |
| 89 | `contact.email` | hello@pantareiresort.com | `contact.email.value`; `contradictions[3]`'s resolution | sourced |
| 90 | `contact.address` | "Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka" | `location.address.value` (Google) (R5) | sourced |
| 91 | `contact.mapUrl` | Google place URL | `location.map_url.value` | sourced |
| 92 | `bookingLinks[0]` | "Check dates and book direct" → engine home | `booking.engine_url`; `booking.path.note` | sourced |
| 93 | `bookingLinks[1]` | Double Room → /listings/572800 | `booking.engine_rooms["Double Room"]` | sourced |
| 94 | `bookingLinks[2]` | Triple Room → /listings/572802 | `booking.engine_rooms["Triple Room"]` | sourced |
| 95 | `bookingLinks[3]` | Family Villa → /listings/572799 | `booking.engine_rooms["Family Villa"]` | sourced |
| 96 | `bookingLinks[4]` | Suite with Private Pool → /listings/572798 | `booking.engine_rooms["Suite Room With Private Pool"]` | sourced |
| 97 | `languagesSpoken` | `["en"]` | `languages_spoken[0]` (N7) | sourced |

Counts: sourced 83 · framing 7 · correctly empty 3 · shared-context 0 · **unsourced 4 · contradicted 0**.

Watch-list check:
- **Distances:** none crept closer (R4).
- **Amenities in the rewrite:** none appeared.
- **Reviews:** none paraphrased into the business's voice. Peter's "the best resort so far" stays inside his verbatim quote, and no copy sentence reuses it.
- **Ratings:** both are shown with count, platform and date.
- **Flagged contradictions:** none resolved in the copy's favour. The beach distance, check-out, breakfast end, email and Triple beds each follow the harvester's resolution.
- **Implication:** no "steps from the sand". The suite's "just steps from the room" is the engine's own wording for its private pool.

## Notes (not failing)

- **N1. Overlaps between a summary line and a detail field.** None is a whole block restating another, and no price appears twice.
  - "A short walk" to Kabalana: `spot` and [7] ¶1.
  - Private taxi: `amenities[9]` and [7] ¶2.
  - Outside guests: `amenities[1]` and [2] ¶1.
  - Pool size: `tagline` "large", `amenities[0]` "Large" and [1] "long".
  - "No need to book": [3] S4 and the three fitness `priceList` notes.
  - Wifi: `amenities[6]` and [5] ¶1.

  The closest calls are the `spot` / [7] beach line and the fourfold "No need to book". The designer can drop the repeat when the rows sit beside [3].
- **N2. No seasonal limit is stated, and it is the one honest limit the dossier has.** These are not flagged contradictions, so the copy does not break a rule:
  - `reviews.critical_themes[0]`: one guest, July 2026, found the kitchen and restaurant closed in the off season.
  - `facilities[0].note`: Booking calls the pool "seasonal".
  - `hoursNote` says "every day", which is the business's own claim.

  Owner item: confirm off-season service before go-live. The copy does keep honest limits elsewhere (Friday off, prices only for chosen dates, no pets or smoking).
- **N3. Breakfast end.** 12:00 comes from the site, against 11:30 in the guide (`contradictions[2]`). This is an owner item, as `sources.md` says.
- **N4. "Residents" against "in-house guests".** The schedule PDF's words are kept verbatim, but a reader may take "residents" (LKR 2500) to mean hotel guests. The pool pass's "(non-residents)" in `offers[0]` uses the word that way. Most likely it means local residents. Owner item. It is not a claim the copy added.
- **N5. "A private balcony over the pool"** stands for the engine's "private balcony with pool view". It reads as "overlooking", so it is not counted as distance creep, but "with a pool view" would be the exact wording.
- **N6. "Large".** It is the owner's word (`business.description`), not measured.
- **N7. `languagesSpoken` = en.** `languages_spoken[0].note` says "staff languages not stated". The field is the harvester's, with a `source_url`, so it is `sourced`, the same ruling as the Cheeky Monkey review.
- **N8. "Groups and retreats".** "Retreats" is not the owner's word ("a big group … for yoga, surfing"). It is kept as a heading frame with no new offer in it.

## Voice audit

| Check | Result |
|---|---|
| Sentence rhythm varies | Yes. The short "Go up for the sunset." and "You don't need to book." sit after long sentences. |
| No triads | The three-item lists are menu, room or service facts ("smoothie bowls, granola and banana oat pancakes"; "a fish bowl, the curry of the day and a whole grilled fish"; "back, neck and shoulders"), not rhetorical triads. The owner's "yoga, surfing, or simply soaking up the chilled island vibes" is verbatim (N9). |
| No padding vocabulary | Clean in Claude-written text. The owner's verbatim intro and groups blocks carry stock phrases (N9). |
| Concrete nouns over category words | Yes: dishes, times, m², bed types. |
| At least one honest limit | Yes: Friday off; prices only for chosen dates; quiet hours. The seasonal limit is missing (N2). |
| Register matches the owner's | Yes. It is first person where the owner speaks ("our", "we'll arrange it"), and plain elsewhere. |
| Reads aloud without wincing | **One flag: V1.** |
| Locale cadence | en only. Native, not translated. |

Per section: tagline / closing / featureLine clean · [0] owner verbatim (N9) · [1] clean · [2] **V1** · [3] clean once U2 is fixed · [4] the U3 sentence stacks two trailing purpose clauses ("for the physical demands of surfing, so your body recovers faster") and reads like brochure copy; it has to change for U3 anyway · [5] clean · [6] owner verbatim (N9) · [7] clean · modules clean.

- **V1 (humanizer).** "In the evening the kitchen leans Mediterranean, traditional and modern." The two adjectives dangle after "Mediterranean", so the sentence reads as a list of three things the kitchen leans to, not as the owner's "a mix of traditional and modern Mediterranean dishes". It also follows straight on "Lunch and dinner come off the same menu", so "in the evening the kitchen leans…" reads as a different evening menu. This sentence was created by the humanizer pass.
- **N9 (not failing).** The owner's verbatim phrases "escape the hustle and bustle of daily life", "immerse yourself in a tropical paradise", "soaking up the chilled island vibes" and "focus on what matters most" are stock hospitality phrasing. The humanizer kept them on purpose under the owner-prose rule, and I agree that this is an owner conversation, not a rewrite. The heading "Welcome to Panta Rei" directly above "Welcome to our boutique resort" says "Welcome" twice in a row. That is a minor note for the copywriter.

## Completeness audit (`beach_lodging`)

| Requirement | Status |
|---|---|
| ≥ 1 `rooms[]` | 4 rows, all with label, beds, sleeps and note. |
| ≥ 6 `photos[]` | Not a copy field. The dossier has 42 business-owned photos (`must_have_check`), and the designer seeds them. |
| ≥ 1 `bookingLinks[]` | 5: the engine home and four room pages. |
| `stayInfo` check-in/out | 14:00 / 11:00, plus house rules. |
| `amenities[]` | 16 rows. |
| `ratings[]` | 2, each with count, platform and date. |
| `testimonials[]` | 6, all verbatim. |
| `spot` | Set. No break named, per `location.spot.gap`. |
| Playbook §2: price per night | Empty, with a stated reason: there is no published rate (`offers_note`, the schema's "Live prices are not content" rule), [5] ¶2 sends the reader to live dates, and it is an owner item. |
| Playbook §2: distance to the break | "A short walk", per `contradictions[0]`. |
| Playbook §2: board storage / rental | Not stated, and correctly so: `gaps[]` "surf offering". It is an owner item and a pitch point. |
| Playbook §2: what's nearby | [7]. |
| `season`, `openingHours` | Empty, with a dossier reason (`season.gap`, `hours_note.gap`). |
| `lessons`, `credentials`, `rentals`, `brands` | Empty, which is correct for the type. |
| Padding | No section is padded to look full. |
| Duplicates | Summary overlaps only (N1). The [3] / `amenities[4]` Pilates conflict (R6) is resolved when U2 is fixed. |

Required fields: **covered.**

## Ledger

Due on this verdict: `copy_humanised → copy_failed`, reason "4 unsourced (copywriter: [2] hoppers, [3] season Pilates, [4] oil / every muscle / recovers faster, [7] agree price / call one); 1 voice (humanizer: [2] S4)". Per the task brief, I wrote no ledger line in this session. The orchestrator appends it.
