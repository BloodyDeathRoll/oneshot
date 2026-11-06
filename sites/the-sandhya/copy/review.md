# copy review: the-sandhya, en

Copyeditor 0.4.2, round 2, 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. Input: `en.json` (copywriter 0.5.0 round 2, humanizer 0.2.1), `en.draft.json`, `sources.md`, `humanizer-notes.md`, round 1 of this file, `dossier.json`. Every sentence below was re-read against the dossier, not against `sources.md`, and not only the changed fields (hard constraint 6). Applies the operator's ruling of 2026-11-06 as written in `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`. That proposal is not merged and the prompt is otherwise unchanged.

## Verdict: FAIL, round 2. Back to the humanizer (4b)

| Check | Result |
|---|---|
| Fact audit | **Clean. 0 `unsourced`, 0 `contradicted`.** All of round 1's fact rows are fixed. Nothing goes back to the copywriter |
| Voice audit | **Not clean. 6 sentences.** They break "no triads", "no padding vocabulary" or "reads aloud", and none of them qualifies for the ruling. Two fail on any reading of the ruling (flags 1 and 2) |
| Completeness | Required fields covered. Round 1's 2 duplicate facts are gone, and no new one appeared |

The copy now passes on facts. Flag 1 is a sentence the humanizer itself says the ruling does not cover. Flags 2 to 6 turn on a narrow question: whether a sentence with its clauses moved, or one word changed, still counts as "verbatim or trimmed with no words added". The notes say it does. The ruling does not say so, so I scored these as not exempt.

**This is the last round the prompt allows.** `base.md` says "Max 2 rounds", and that still failing on the third pass means the dossier cannot support a site: back to the harvester, or out of the run in `mode: test`. The next review is that third pass. The dossier is not the problem here: facts are clean, so sending this business to the harvester would not fix anything. If the third pass fails on voice alone, that outcome does not fit the cause, and Alon should decide what happens next.

## Flagged sentences

Voice flags, all owned by the humanizer. Quoted, not reworded.

| # | Sentence | Field | Why the ruling does not cover it | Flag | Does it depend on the reading of the ruling? |
|---|---|---|---|---|---|
| 1 | "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have surf points and whale-watching boat rides, and a dizzying array of dining options." | Kabalana ¶3 S1 | An agent's recast: order turned round and "have" added. `humanizer-notes.md` agrees the ruling does not cover it | **Triad:** surf points, boat rides, dining options are still three things in one list; moving a comma does not break the pattern, though the notes count it as "split" (tell 1, tell 11). **Padding:** "a dizzying array". The notes name this as the line to send back if the reviewer wants it gone | **No. Fails on any reading** |
| 2 | "We truly believe some of the island’s best qualities may be expressed through our food, from our signature Sri Lankan rice & curry, our zesty DIY poke bowls, our localized “Tom Yum” style noodles with fresh Ceylon prawns or a finger licking array of delicious homemade desserts, exploring the diversity of the local produce available." | Dining ¶2 | Clauses moved: "we truly believe …" now opens a sentence the owner opened with "From our signature". No word added, but neither verbatim nor only trimmed | **Padding:** "truly believe", "may be expressed", "finger licking array of delicious". **Aloud:** 54 words, and ", exploring the diversity of the local produce available" hangs with nothing to attach to; the notes say so themselves ("still hangs loose") | Padding yes. **Aloud no: that check applies either way** |
| 3 | "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own in recent years with surfers, families, and digital nomads alike." | Kabalana ¶1 S1 | Clauses moved: the owner opens "Kabalana Beach, on the golden south coast …" | **Triad:** "surfers, families, and digital nomads". **Padding:** "buzzing and eclectic", "come into its own" | Yes |
| 4 | "Pristine sand and stunning sunsets have nurtured a laid-back scene where surf lovers, beach bunnies, serial retreat hunters and quiet couples coexist with welcoming locals." | Kabalana ¶1 S2 | "has" became "have", a different word, and the owner's "and" moved from the third item to the second | **Padding:** "stunning", the word the humanizer cut from Looking after ¶1 under tell 3; "laid-back scene" | Yes. The closest call of the six: the two changes are grammar made necessary by a cut |
| 5 | "Our position on Kabalana Beach, in a secluded nook, lends itself to an intimate wedding party, birthday celebration, family reunion, wellness/fitness retreat or simply to celebrate life." | Exclusive ¶1 S2 | Reworded. The owner wrote "Our prime location on Kabalana Beach with its unique position nestled in a secluded nook". "location" and "with its" are gone and "position" moved ahead of the beach. `sources.md` lists only three cut words, which understates this | **Padding:** "lends itself to", "or simply to celebrate life" | Yes |
| 6 | "With the beach as your blank canvas and with our delightful staff at your service, we offer a private setting for your special occasion." | Exclusive ¶2 | The owner wrote "the perfect private setting", so "a" is an added word. The notes admit this as "the one exception" while still filing the sentence under the ruling | **Padding:** "blank canvas", "delightful staff at your service", "your special occasion" | Yes |

**If Alon reads the ruling more widely.** Allowing moved clauses and one-word grammar or article changes would clear rows 3 to 6 and the padding half of row 2. Rows 1 and 2 (aloud) would still fail, so the verdict would not change, but the humanizer's work would shrink to those two sentences. That is his call and I have not made it. If he widens it, proposal 001's wording ("trimmed with no words added") needs the same change.

**Not flagged, though agent-worded.** `spot`, `tagline`, `closing`, `hoursNote`, the notes, Rooms ¶3, ¶4, ¶5, Dining ¶5, Why ¶1 S1, Casual ¶3, ¶4, Looking after S1, Kabalana ¶5. Each was scored on all checks with no exemption and came back clean. Lists of four or more ("a zero-food waste menu, a ban on single-use plastic, water recycling and a care programme", Rooms ¶3) are not triads. `amenities[]` rows are data labels, so "Beach chairs, loungers and umbrellas" was not scored as rhetoric.

## Round 1's flags, checked

| Round 1 row | Now | Status |
|---|---|---|
| 1 "the epitome of quiet elegance …" | Cut; Rooms ¶1 joins the owner's two sentences | Fixed |
| 2 "the crowning jewel of southern Sri Lanka" | Cut | Fixed |
| 3 "World famous" | Cut | Fixed |
| 4 "a consistent swell" | Cut. The fix changed the sentence's grammar; see flag 4 | Fixed for facts |
| 5 Breakfast, dropped qualifier | "for two adults" added | Fixed. Rests on a search snippet, see "For a person" |
| 6 Every room sees the ocean, twice | Intro ¶2 trimmed; now only Rooms ¶1 | Fixed |
| 7 White sand, twice | Rooms ¶1 trimmed; now only `spot` | Fixed |
| 8 to 12 Third person on a "we" page | All five reworded. `the hotel` no longer occurs anywhere in the file, checked by script | Fixed |

Kabalana ¶5 "from the hotel", which round 1 missed, was also fixed by the humanizer.

## The exempted sentences (35)

The ruling requires this list. I tested each sentence by script against `owner_copy[]`, `business.name_meaning` and `sustainability`: every word present, in the owner's order. Spelling and spacing corrections and the capital at a new sentence start were not counted as changes. Flagged and borderline sentences were then read by hand. These are not scored on "no triads" or "no padding vocabulary". Every other voice check and the whole fact audit apply to them.

| Sentence | Field | Source | Form | What the ruling shelters |
|---|---|---|---|---|
| "Pause, take a deep breath & exhale. You are home." (2) | intro heading | `owner_copy[0]` | verbatim | A triad of actions. The notes do not list it among their eight, so the true count is nine |
| "Designed to feel like an exclusive private beach house with the amenities of an intimate boutique hotel." | intro ¶1 S1 | `owner_copy[2]` | split, no word changed | "intimate" |
| "Your relaxation starts as you kick off your shoes and slip through the hidden door in the wide wooden façade." | intro ¶1 S2 | `owner_copy[2]` | split, capital | nothing |
| "Inside, you will catch the first glimpses of our star attraction, The Indian Ocean, magnificent and omnipresent." | intro ¶2 | `owner_copy[3]` | trimmed, stray space fixed | "star attraction", "magnificent and omnipresent" |
| "Whether you are enjoying the sunshine … the sea is always your view." | intro ¶3 | `owner_copy[4]` S2 | verbatim | Triad of places; "Whether" |
| "Dipping your feet in the azure waters of our swimming pool, you will soon be hypnotised by the allure of the white tipped surf breaks just a few meters ahead." | intro ¶4 | `owner_copy[5]` | trimmed | "azure", "hypnotised by the allure" |
| "It is that magical moment between light and dark." | Why ¶1 S2 | `business.name_meaning` | verbatim | "magical" |
| "Come evening, as temperature cools … cotton candy-clouded sky." | Why ¶2 | `owner_copy[7]` | verbatim | "ethereal glow of orange, pink and blue hues" |
| "Casual Luxe is at the heart of our ethos at The Sandhya." | Casual ¶1 S1 | `owner_copy[13]` | verbatim | "at the heart of" |
| "We prioritise understated design, thoughtful form and practical function above conspicuous bling and glitter." | Casual ¶1 S2 | `owner_copy[13]` | verbatim | Triad |
| "Our property’s furnishings are inspired by mid-century aesthetics and embellished with mod-chinoiserie decor." | Casual ¶2 S1 | `owner_copy[6]` | trimmed | nothing |
| "Our Singaporean owner’s discerning vision has been brought to life by the local designers and craftsmen he worked with across Sri Lanka." | Casual ¶2 S2 | `owner_copy[6]` | verbatim | "discerning vision" |
| "Our service is warm, kind, attentive yet informal." | Casual ¶5 S1 | `owner_copy[15]` | verbatim | Triad |
| "Ask for your heart’s desire or simply be left alone when seeking that self-restoration." | Casual ¶5 S2 | `owner_copy[15]` | verbatim | "heart’s desire" |
| "Just feel at home and allow us to look after you." | Casual ¶5 S3 | `owner_copy[15]` | verbatim | nothing |
| "We have blended the best of the worlds that we live in." | Casual ¶6 S1 | `owner_copy[17]` | verbatim | nothing |
| "We are not international. We are not local. We are simply The Sandhya." (3) | Casual ¶6 S2–4 | `owner_copy[17]` | verbatim | Triad of sentences |
| "We strive for sustainable tourism." | Looking after S2 | `owner_copy[16]` | trimmed | nothing. `sources.md` calls the paragraph a recast; per sentence, S1 is and S2 is not |
| "Our 9 spacious rooms have unobstructed sweeping views of the beach and beyond to the endless ocean, each with its own private balcony or exclusive patio area." | Rooms ¶1 | `owner_copy[8]` S1, S2 | two sentences joined by cutting, no word added | "sweeping", "endless". The join is the furthest a trim goes and still qualifies |
| "We have included thoughtful touches from evening lavender scents to high pressure rain showers so you are assured of a restorative stay in any one of our room types." | Rooms ¶2 | `owner_copy[8]` S3 | trimmed | "thoughtful touches" |
| "Elevated Comfort Food was the brief for our visiting menu designer, Chef Christophe DuBois." | Dining ¶1 S1 | `owner_copy[12]` | verbatim | "Elevated" |
| "Working closely with our owner, a self-confessed “easy foodie”, the team conjured a delectable array of dishes inspired from a global set-list of food heaven highlights." | Dining ¶1 S2 | `owner_copy[12]` | verbatim | "delectable array", "food heaven highlights" |
| "Our breads, pastas, sauces, infused mayonnaise, stocks, spice blends, jams are made in-house and the menus subtly evolve with the seasons." | Dining ¶3 | `owner_copy[11]` | trimmed | nothing |
| "If you don’t find what you crave, simply ask our team to prepare what your tummy desires." | Dining ¶4 S1 | `owner_copy[9]` | verbatim | nothing |
| "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining ¶4 S2 | `owner_copy[9]` | verbatim | Triad |
| "Our home at The Sandhya can be your very own private beach house with an Exclusive Use booking." | Exclusive ¶1 S1 | `owner_copy[24]` | verbatim | "your very own" |
| "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `owner_copy[21]` | trimmed | nothing |
| "While away a whole day browsing through an eclectic array of boutiques, stopping for well-earned sips and bites from an ever-growing cafe and restaurant scene." | Kabalana ¶2 S2 | `owner_copy[21]` | verbatim | "eclectic array" |
| "Our own town Ahangama has grown into a foodies’ haven with a diverse selection of high-quality eateries and night spots." | Kabalana ¶3 S2 | `owner_copy[22]` | trimmed | "foodies’ haven", "diverse selection" |
| "Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `owner_copy[23]` | trimmed | Triad; "awe-inspiring" |
| "Depart your room in the crisp early morning and be back in time for a late lunch or cocktail." | Kabalana ¶4 S2 | `owner_copy[23]` | trimmed | nothing |
| "With panoramic glass doors & windows throughout, this captivating view is our artwork." | `featureLine` | `owner_copy[3]` S2 | verbatim, "though out" corrected | "captivating" |

**Owner-derived, not exempt:** the six flagged sentences, plus Why ¶1 S1 ("Sandhya," added to open it), Looking after S1 ("with" added, order changed), Rooms ¶4 ("In the Studio King," added, though `sources.md` says verbatim), Casual ¶3 (an agent's frame around a quote), `spot` (composed from two sentences). All five of those were scored in full and are clean.

**What this does not settle.** Being exempt does not make these sentences good, only unscored on two checks. As round 1 said, several still read as generated to a stranger. Grammar slips remain in exempt lines ("as temperature cools", "stocks, spice blends, jams are made", "inspired from"). They parse, so they pass "aloud".

## Voice score per section

`Y` pass, `N` fail. "No triads" and "no padding" score only the non-exempt sentences in each section. At page level: honest limit **Y** (`stayInfo.note`, the two amenity notes, the train station, breakfast for two adults); locale cadence **Y** (`en` only).

| Section | Rhythm | No triads | No padding | Concrete | Register | Aloud | Score | Note |
|---|---|---|---|---|---|---|---|---|
| Intro | Y | Y | Y | Y | Y | Y | 6/6 | All exempt. The split in ¶1 reads well after the heading, which supplies the subject. Up from 3/6 |
| Why Sandhya | Y | Y | Y | Y | Y | Y | 6/6 | Only ¶1 S1 scored on the two checks |
| Casual Luxe | Y | Y | Y | Y | Y | Y | 6/6 | ¶3, ¶4 scored; plain |
| Looking after the place | Y | Y | Y | Y | Y | Y | 6/6 | "stunning" gone. "We strive for sustainable tourism." still sits bare, as the notes say; not a fail |
| The rooms | Y | Y | Y | Y | Y | Y | 6/6 | ¶3 remains the best writing the agents did |
| The Dining Room | Y | Y | **N** | Y | Y | **N** | 4/6 | Flag 2 |
| Exclusive Use | Y | Y | **N** | Y | Y | Y | 5/6 | Flags 5, 6 |
| Kabalana and around | Y | **N** | **N** | Y | Y | Y | 4/6 | Flags 1, 3, 4. Place names keep it concrete |
| `tagline`, `closing`, `featureLine`, `spot`, `hoursNote` | Y | Y | Y | Y | Y | Y | 6/6 | `featureLine`: "this captivating view" has no antecedent when it stands alone over an image; the design must make the view the image |
| Notes (`stayInfo`, `amenities`, `priceList`) | Y | Y | Y | Y | Y | Y | 6/6 | The register slip is gone. "ask us who runs them" and the quotation marks in "Our “from” price, plus “++”" read a little oddly from a hotel that would know; the notes own this, and it ends when the owner answers. Not a fail: the limits are honest and the facts allow nothing firmer |

Also noted, not fails: `bookingLinks[1–4]` keep the colon label, which still avoids promising that `?rid=` preselects a room.

## Draft against final

`en.draft.json` is the copywriter's round 2, so this diff is the humanizer's pass alone. Seven fields differ (three copy blocks, `stayInfo.note`, `amenities[6].note`, `amenities[7].note`, `priceList[0].note`), as the notes say, checked by script. No number appeared or vanished, nothing else moved, and `testimonials` are byte-identical to the dossier. Nothing new in the rewrite: "from" and "++" survive in the price note; Dining ¶2 keeps the same four dishes; Kabalana ¶3 S1 keeps the same five places and three things. "Other sites" in `stayInfo.note` is exact, since every differing age and the 16:00 come from third parties.

**`sources.md` and the notes are inaccurate in six places.** None changes a fact, but the humanizer must correct them on its next pass (its hard constraint 2):

1. Notes, "Trimmed or reordered, no word added, so also under the ruling". The ruling does not mention reordering.
2. Notes file Kabalana ¶1 S2 under "no word added" while logging "has" to "have" as a change.
3. `sources.md`, Exclusive ¶1 row: says three words were cut. "location" and "with its" also went and "position" moved.
4. `sources.md`, Exclusive ¶2 row: says "perfect" was cut, and does not say "the" became "a".
5. `sources.md`, Kabalana ¶3 row, and the notes' pattern table: "split the triad". It is still a triad.
6. `sources.md`, Rooms ¶4 row: says verbatim, though "In the Studio King," was added.

Everything else in `sources.md` that I followed was accurate.

## Calls I made on the fact audit

Stated so a person can disagree.

- **The same line as round 1.** The hotel's statement about its own premises, offer or beliefs is `sourced`. A ranking or frequency about the wider world, with only hotel marketing behind it, is not. On the current text no such ranking or frequency remains.
- **Trend words about the area stay `shared-context`:** "has come into its own in recent years", "an ever-growing cafe and restaurant scene", "has grown into a foodies’ haven". Each is a change over time with only the hotel's word behind it. I read the comparatives rule as aimed at claims that rank or count something; these rank nothing, name no number and are not attributed to the hotel. A stricter reader could mark them `unsourced`. If Alon or Shahar reads them that way, they go to the copywriter.
- **"Pristine" stays `shared-context`, as in round 1.** One guest (`reviews.quotes[7]`, 2026-02) reports debris from demolished structures on the beach; two others call it clean (`quotes[5]` 2026-02, `quotes[1]` 2026-07, the latter machine-translated). The evidence leans the hotel's way, and the harvester did not record a contradiction.
- **"unobstructed" stays `sourced`.** `room_types[].site_summary` "full ocean views"; `quotes[0]` "all the rooms face the ocean"; the same `quotes[7]` calls the view "wonderful" despite the structures.

## Fact audit: one row per sentence

Keys are dossier paths.

### Single fields

| Sentence | Field | Dossier key | Verdict |
|---|---|---|---|
| "The Sandhya" | `businessName` | `business.name` | `sourced` |
| "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." | `tagline` | `business.description`, `location.address`; age: `contradictions.age_policy`, own site and engine (MaxChildren 0) against Trip.com 12+. Disclosed in `stayInfo.note`, not settled silently | `sourced` |
| "See live dates on our own booking page." | `closing` S1 | `booking.path`, `.engine_url`. **Engine never seen working from a real browser** (`booking.engine_status`, `gaps[]` booking.live_rates) | `sourced` |
| "If you have a question first, call or email us." | `closing` S2 | `contact.phone`, `contact.email` | `sourced` |
| "With panoramic glass doors & windows throughout, this captivating view is our artwork." | `featureLine` | `owner_copy[3]` S2 | `sourced` |
| "Kabalana is a mile long, white sandy beach on the golden south coast of Sri Lanka." | `spot` | `owner_copy[18]`, `[19]`. `[18]` says "A mile long" of "the perfect holiday destination", not by name: applied to Kabalana by inference from the page. Guests: "long stretch", "long (enough)" | `sourced` |
| (empty, reason stated) | `season`, `openingHours` | `season.gap`, `hours` | n/a |
| "The front desk is open 24 hours a day." | `hoursNote` | `hours_note` (Trip.com) | `sourced` |
| "Other sites give different minimum ages for us, and some say check-in is after 16:00." | `stayInfo.note` S1 | `contradictions.age_policy` (Michelin, Takeoff 16; Trip.com 12), `.check_in` (Kayak, Trip.com; also `stayInfo.checkInFrom.note` Momondo) | `sourced` |
| "Ask us before you book." | `stayInfo.note` S2 | `contact` | `framing` |
| 14:00 / 12:00 | `stayInfo` | `stayInfo.checkInFrom`, `.checkOutTo`; other side shown in the note | `sourced` |

### Copy blocks

| Sentence | Field | Dossier key | Verdict |
|---|---|---|---|
| "Pause, take a deep breath & exhale. You are home." | intro heading | `owner_copy[0]` | `framing` |
| "Designed to feel like an exclusive private beach house with the amenities of an intimate boutique hotel." | intro ¶1 S1 | `owner_copy[2]` | `sourced` |
| "Your relaxation starts as you kick off your shoes and slip through the hidden door in the wide wooden façade." | intro ¶1 S2 | `owner_copy[2]` | `sourced` |
| "Inside, you will catch the first glimpses of our star attraction, The Indian Ocean, magnificent and omnipresent." | intro ¶2 | `owner_copy[3]` S1 | `sourced` |
| "Whether you are enjoying the sunshine on the expansive lawns, lounging all day around our abundant, airy indoor living spaces or cooling off in our air-conditioned media room, the sea is always your view." | intro ¶3 | `owner_copy[4]` S2; media room also `facilities`. "always" is the hotel's statement about its own premises | `sourced` |
| "Dipping your feet in the azure waters of our swimming pool, you will soon be hypnotised by the allure of the white tipped surf breaks just a few meters ahead." | intro ¶4 | `owner_copy[5]`, length cut for `contradictions.pool`. **"just a few meters" is the hotel's own figure.** Wallpaper* (`press[0]`) says "just metres from the turquoise waters". The only measure is 74 m pin to coastline, `location.distance_to_shore`, a pin distance, not pool to break, so not a contradiction. Owner to confirm | `sourced` |
| "Sandhya, in Sanskrit संध्य, means “twilight.”" | Why ¶1 S1 | `business.name_meaning`, spelled as the hotel publishes it. See "For a person" | `sourced` |
| "It is that magical moment between light and dark." | Why ¶1 S2 | `business.name_meaning` | `framing` |
| "Come evening, as temperature cools and the sun begins to set over the majestic Indian Ocean, the beauty of twilight is undeniable with its ethereal glow of orange, pink and blue hues painting the cotton candy-clouded sky." | Why ¶2 | `owner_copy[7]`; sunset over the ocean also `room_types[0].engine_description` | `framing` |
| "Casual Luxe is at the heart of our ethos at The Sandhya." | Casual ¶1 S1 | `owner_copy[13]` | `framing` |
| "We prioritise understated design, thoughtful form and practical function above conspicuous bling and glitter." | Casual ¶1 S2 | `owner_copy[13]` | `sourced` |
| "Our property’s furnishings are inspired by mid-century aesthetics and embellished with mod-chinoiserie decor." | Casual ¶2 S1 | `owner_copy[6]` | `sourced` |
| "Our Singaporean owner’s discerning vision has been brought to life by the local designers and craftsmen he worked with across Sri Lanka." | Casual ¶2 S2 | `owner_copy[6]`, `business.owner` | `sourced` |
| "Wallpaper* describes The Sandhya as “a clean-lined boutique hotel with Scandinavian design sensibilities.”" | Casual ¶3 | `press[0].quote`: exact substring by script; read in full on wallpaper.com, no `via_digest`, not the untraced `press[2]`, `press[3]`. The page dates from 2017, modified 2022, before the 2023 renovation | `sourced` |
| "We opened in 2017 and renovated in 2023." | Casual ¶4 | `business.since` and its note; Trip.com only, Wallpaper* first published 2017-06-09. Owner to confirm | `sourced` |
| "Our service is warm, kind, attentive yet informal." | Casual ¶5 S1 | `owner_copy[15]` | `sourced` |
| "Ask for your heart’s desire or simply be left alone when seeking that self-restoration." | Casual ¶5 S2 | `owner_copy[15]` | `framing` |
| "Just feel at home and allow us to look after you." | Casual ¶5 S3 | `owner_copy[15]` | `framing` |
| "We have blended the best of the worlds that we live in." | Casual ¶6 S1 | `owner_copy[17]` | `framing` |
| "We are not international. We are not local. We are simply The Sandhya." | Casual ¶6 S2–4 | `owner_copy[17]` | `framing` |
| "We support the local community and our environment, with a zero-food waste menu, a ban on single-use plastic, water recycling and a care programme for our beach turtles." | Looking after S1 | `sustainability`, first person as its note asks; `facilities` "Single-use plastics removed". Beside `amenities[18]` "Bottled water" and `quotes[7]` "single use slippers": the dossier does not say what either is made of. Owner item | `sourced` |
| "We strive for sustainable tourism." | Looking after S2 | `sustainability` | `framing` |
| "Our 9 spacious rooms have unobstructed sweeping views of the beach and beyond to the endless ocean, each with its own private balcony or exclusive patio area." | Rooms ¶1 | `owner_copy[8]`, `room_count` (the own site and five others against one digest), `room_types[].outdoor`, `.view`, `.site_summary` | `sourced` |
| "We have included thoughtful touches from evening lavender scents to high pressure rain showers so you are assured of a restorative stay in any one of our room types." | Rooms ¶2 | `owner_copy[8]` S3 | `sourced` |
| "Every room has a plush pillow-top mattress with 500 thread count linen, a shower big enough for two, Spa Ceylon amenities, bathrobes and slippers." | Rooms ¶3 S1 | `room_types[0–3]`: `.site_text`, `.engine_description`, `.amenities`. Checked again for all four rooms | `sourced` |
| "Each one also has central air conditioning and a ceiling fan, a desk, universal sockets, a hairdryer and a Bluetooth speaker." | Rooms ¶3 S2 | `room_types[0–3].amenities`, `.engine_amenities`. Checked again for all four. "a desk" is the dossier's "Console or Work Desk" in three rooms, "Console and working desk" in the suite | `sourced` |
| "High speed WiFi too, with newspapers and magazines from around the world on PressReader." | Rooms ¶3 S3 | `room_types[0–3].amenities` | `sourced` |
| "In the Studio King, a triple occupancy can be arranged (subject to availability) with a supplement." | Rooms ¶4 | `room_types[0].engine_description`, `.sleeps_note`. Qualifier kept | `sourced` |
| "Nightly rates are on our booking page, for the dates you choose." | Rooms ¶5 | `booking.path`, `.rate_terms` ("per room per night"). **Engine not seen live**: `gaps[]` booking.live_rates | `sourced` |
| "Elevated Comfort Food was the brief for our visiting menu designer, Chef Christophe DuBois." | Dining ¶1 S1 | `owner_copy[12]`, `dining.menu_designer` | `sourced` |
| "Working closely with our owner, a self-confessed “easy foodie”, the team conjured a delectable array of dishes inspired from a global set-list of food heaven highlights." | Dining ¶1 S2 | `owner_copy[12]` | `sourced` |
| "We truly believe some of the island’s best qualities may be expressed through our food, from our signature Sri Lankan rice & curry, … exploring the diversity of the local produce available." | Dining ¶2 | `owner_copy[10]`, `dining.dishes`, same four dishes. A stated belief, not a ranking of the hotel. Voice: flag 2 | `sourced` |
| "Our breads, pastas, sauces, infused mayonnaise, stocks, spice blends, jams are made in-house and the menus subtly evolve with the seasons." | Dining ¶3 | `owner_copy[11]`, `dining.made_in_house` | `sourced` |
| "If you don’t find what you crave, simply ask our team to prepare what your tummy desires." | Dining ¶4 S1 | `owner_copy[9]` | `sourced` |
| "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining ¶4 S2 | `owner_copy[9]`, `facilities` | `sourced` |
| "A continental breakfast for two adults is included in your stay." | Dining ¶5 | `dining.breakfast`, `facilities`, `booking.rate_terms`. The limit is now kept. **That limit is a search snippet, not seen live** | `sourced` |
| "Our home at The Sandhya can be your very own private beach house with an Exclusive Use booking." | Exclusive ¶1 S1 | `owner_copy[24]` | `sourced` |
| "Our position on Kabalana Beach, in a secluded nook, lends itself to an intimate wedding party, birthday celebration, family reunion, wellness/fitness retreat or simply to celebrate life." | Exclusive ¶1 S2 | `owner_copy[24]`; Wallpaper* "a quiet corner". Voice: flag 5. "family reunion" beside `tagline` adults-only: see "For a person" | `sourced` |
| "With the beach as your blank canvas and with our delightful staff at your service, we offer a private setting for your special occasion." | Exclusive ¶2 | `owner_copy[24]` S3. Voice: flag 6 | `framing` |
| "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own in recent years with surfers, families, and digital nomads alike." | Kabalana ¶1 S1 | `owner_copy[19]`, `location.spot`. About the beach; "families" is not about this adults-only hotel. Voice: flag 3 | `shared-context` |
| "Pristine sand and stunning sunsets have nurtured a laid-back scene where surf lovers, beach bunnies, serial retreat hunters and quiet couples coexist with welcoming locals." | Kabalana ¶1 S2 | `owner_copy[19]`. See "Calls I made". Voice: flag 4 | `shared-context` |
| "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `owner_copy[21]`, `location.nearby[0]`; `quotes[0]` "20-30-minute drive" (machine-translated) | `sourced` |
| "While away a whole day browsing through an eclectic array of boutiques, stopping for well-earned sips and bites from an ever-growing cafe and restaurant scene." | Kabalana ¶2 S2 | `owner_copy[21]` | `shared-context` |
| "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have surf points and whale-watching boat rides, and a dizzying array of dining options." | Kabalana ¶3 S1 | `owner_copy[22]`, `location.nearby[1]`. Voice: flag 1 | `shared-context` |
| "Our own town Ahangama has grown into a foodies’ haven with a diverse selection of high-quality eateries and night spots." | Kabalana ¶3 S2 | `owner_copy[22]`, "stone's throw" correctly cut | `shared-context` |
| "Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `owner_copy[23]`, `location.nearby[2]`, spellings as published | `shared-context` |
| "Depart your room in the crisp early morning and be back in time for a late lunch or cocktail." | Kabalana ¶4 S2 | `owner_copy[23]` | `framing` |
| "Ahangama train station is 1.4 km from us." | Kabalana ¶5 | `location.nearby[3]` (Trip.com) | `sourced` |

Headings "Why Sandhya", "Casual Luxe", "Looking after the place", "The rooms", "The Dining Room", "Exclusive Use", "Kabalana and around" assert nothing beyond their blocks: `framing`.

### Prices, rooms

| Row | Field | Dossier key | Verdict |
|---|---|---|---|
| Exclusive Use of the whole house, per night, 3500 USD, "Our “from” price, plus “++”, as of 2026-11-06." | `priceList[0]` | `offers[0]`; qualifiers kept, `fetched_at` matches. "++" unexplained at source | `sourced` |
| Studio King, King bed, sleeps 2, "38 sq m on the upper or ground floor, with 3.5 m floor-to-ceiling glass doors." | `rooms[0]` | `room_types[0]`, `.site_text[1]` | `sourced` |
| Studio Twin, 2 super-single beds, sleeps 2, "38 sq m on the upper floor, with 3.5 m floor-to-ceiling glass doors." | `rooms[1]` | `room_types[1]`, `.site_text[1]` | `sourced` |
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
| Yoga and surf lessons, "on our list; ask us who runs them and what they cost" | own /design; engine; `contradictions.surf_lessons`. No provider, price or schedule claimed, so the contradiction stays open | `sourced` |
| Surfboard hire, "on our list; ask us who provides the boards and what hire costs" | own /design only; `surf_statements`. Same | `sourced` |
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
| 24-hour check-in | engine. Beside `checkInFrom` 14:00: both are on the hotel's engine, and arriving at any hour after the start time does not conflict with it | `sourced` |
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
| Kayak, 9.4/10, 159, 2026-11-06 | `ratings[1]` | `reviews.kayak`, `via_digest` | `sourced`, person to read before go-live |
| "It’s a beautiful place …", Guest User, 2026-06 | `testimonials[0]` | `reviews.quotes[3]`, exact match by script, not machine-translated, 473 characters | `sourced` |
| "A great stay …", Guest User, 2026-02 | `testimonials[1]` | `reviews.quotes[6]`, exact match by script, not machine-translated, 387 characters | `sourced` |
| +94765700007 | `contact.phone` | `contact.phone` | `sourced` |
| reservations@thesandhya.com | `contact.email` | `contact.email` | `sourced` |
| "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | `contact.address` | `location.address`, exact; postcode source noted in `sources.md` per playbook §6 | `sourced` |
| Google Maps URL | `contact.mapUrl` | `location.map_url`, exact | `sourced` |
| "Check rooms and live dates" | `bookingLinks[0]` | `booking.engine_url`, exact | `sourced` |
| Four "<room>: check live dates" | `bookingLinks[1–4]` | `booking.engine_room_links`, all four `rid` values match. Preselection unverified, not promised | `sourced` |
| Instagram | `socialLinks[0]` | `contact.socials.instagram`, exact | `sourced` |
| English | `languagesSpoken` | `languagesSpoken` (Trip.com only) | `sourced` |

## Completeness (`beach_lodging`)

Must have: `rooms[]` 4, `bookingLinks[]` 5, `photos[]` 187 in the dossier for the deployer. Should have: `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `spot` all set. `season`, `openingHours` and `contact.whatsapp` are empty, each with a stated reason in `sources.md` that holds against the dossier. Two testimonials stand, by the operator's decision against excerpting. Caps on the prose fields, labels, notes and quotes were checked by script and met; the longest body is Kabalana at 1,124 of 1,500, and `copyBlocks[]` is at its limit of 8. No section is padded to look full. No duplicate fact across two blocks: rates in Rooms ¶5 and the link in `closing` are disclosed in `sources.md` and say different things, as do rain shower pressure (Rooms ¶2) and size (¶3).

For the designer, not a copy fail, carried from round 1: `testimonials[].source` is `other` and the schema has no URL or label on a testimonial, so nothing in the content names Trip.com for the two quotes, and playbook §6 asks for the source. `ratings[].platform` is `other` for both rows too: the design must print each name.

## For a person, before go-live

None of these is a defect in the copy under the prompt.

1. **Kayak 9.4 from 159.** Read through a digest only. `capturedAt` means "read from the platform". Momondo carries the same hotel id, so it looks like one dataset read twice and should not count as a second source.
2. **Breakfast "for two adults".** Rests on a search snippet of the engine page, as does the rest of `booking.rate_terms`.
3. **The engine and the four `?rid=` links.** Never opened from a real browser.
4. **"संध्य".** Copied correctly from the hotel's text, so `sourced`. From general knowledge, not from the dossier: the usual Sanskrit spelling of the word is "संध्या", with a final long vowel. Worth one check by someone who reads Devanagari before a large word on the page carries it.
5. **"family reunion" beside "adults-only".** Both are the hotel's words. A guest listed as "(Family)" appears in `reviews.quotes[0]`, and `contradictions.age_policy` is open. The owner should say whether Exclusive Use lifts the age limit.
6. **Owner items already in `sources.md`:** pool length, "++", the triple supplement, minimum age, check-in time, who runs surf lessons and board hire, "just a few meters", 2017 and 2023, "Udwalawe" and "Singharaja", "Bottled water" beside the plastic ban.

## What must change to pass

**Humanizer:** flags 1 to 6. Each sentence must either come within the ruling as written or pass the checks it is scored on, and flag 2 must also read aloud. Then the six corrections to `sources.md` and the notes above. No fact may move while doing so: these six sentences are clean on facts today, and any rewording gets the full audit again.

**Alon, optional and first if at all:** whether moved clauses and one-word grammar or article changes count as "trimmed". That decides whether the humanizer has six sentences to work on or two.

**Copywriter:** nothing.

Round 3 is a full re-check of every sentence (hard constraint 6).

## Not covered

No live page was opened and nothing was re-fetched: the dossier is the ground truth for this review, so the items under "For a person" remain open. Photos and captions are outside it, as the copy has none. No research check: the run is outbound. `dossier.json` was read in full except `images[]`, `videos[]` and `rate_snapshots`, which were skipped because the copy has no captions, no video and no OTA price. `audit.json` was not read, because the audit is never a source for a claim (hard constraint 2).
