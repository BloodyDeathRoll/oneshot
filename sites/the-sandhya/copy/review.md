# copy review: the-sandhya, en

Copyeditor 0.4.2, round 4 (the fourth pass), 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. This pass runs past the prompt's "Max 2 rounds" on Alon's instruction. Input: `en.json` (copywriter 0.5.0 round 2, humanizer 0.2.1, plus the one sentence Alon approved), `en.draft.json` (the copy before that change), `369a73e:sites/the-sandhya/copy/en.draft.json`, `sources.md`, `humanizer-notes.md`, round 3 of this file, `dossier.json`. Every sentence below was re-read against the dossier, not against `sources.md`, and not only the changed one (hard constraint 6).

**The rules this pass applies, and where each comes from:**

| Rule | Where it is written |
|---|---|
| The hotel's own sentences are not scored on "no triads" or "no padding vocabulary" | `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`, as Alon widened it. Not merged; the prompt is otherwise unchanged |
| Dining ¶2 S2 and S3 are not scored on those two checks, because Alon approved them as the hotel's register | `sources.md`, `humanizer-notes.md` and the ledger line of 12:51:36Z record the approval. The session's brief gives the exemption |
| Voice fails only on something a reader would actually get wrong or stumble over, not on taste or a preferred phrasing. Fact checks stay as strict as before | **The session's brief only.** It is not in proposal 001 or anywhere else on disk |

## Verdict: PASS, round 4

| Check | Result |
|---|---|
| Fact audit | **Clean. 0 `unsourced`, 0 `contradicted`.** |
| Voice audit | **Clean under the rules above.** Round 3's flag on Dining ¶2 S2 is fixed. No sentence on the page is one a reader would get wrong or have to re-read |
| Completeness | Required fields covered. No duplicate fact across two blocks |

**What this pass rests on.** Under the prompt's plain text ("voice audit clean", "no triads", "no padding vocabulary"), this page does not pass: 42 sentences are exempt from two of its checks. The pass holds on the rulings above. See "What this does not settle".

## The changed sentences

Dining ¶2, as it now reads:

> We truly believe some of the island’s best qualities may be expressed through our food. Our signature Sri Lankan rice & curry, our zesty DIY poke bowls and our localized “Tom Yum” style noodles with fresh Ceylon prawns explore the diversity of the local produce available. Or go directly to a finger licking array of delicious homemade desserts.

**Facts: both `sourced`.**

- Same four dishes as `dining.dishes` and `owner_copy[10]`. No number, place or claim is new; the set of numbers in the file is identical to `en.draft.json`.
- S2 now says three dishes explore the local produce, where the last version said four. That narrows the sentence. `dining.concept` ("using the freshest of locally-sourced ingredients") covers the menu as the hotel's own statement about its own offer. The dossier records no ingredient origin for a single dish beyond "fresh Ceylon prawns", and "explore" is figurative: it gives no share, count or origin. The same reasoning stood in round 3.
- S3 asserts that the desserts exist and are homemade (`dining.dishes`). "Finger licking array" is the hotel's description of its own offer. No menu is in the dossier to count an array against, which is the footing "delectable array" has in Dining ¶1.

**Round 3's three faults, checked one by one:**

| Round 3 fault | Now | Status |
|---|---|---|
| The noodles swallow the desserts ("noodles with fresh Ceylon prawns and a finger licking array …") | The desserts have their own sentence. "With fresh Ceylon prawns" can only attach to the noodles, and nothing follows it inside the list | Fixed |
| No place to breathe: verb at word 32, then 27 words with no comma from "our localized" | Verb at word 24 of 31 (counting "&"). 18 words with no comma from "our localized" to the full stop. Three "our" openings mark the list, and "and our" announces its last item | Fixed. Long, but it reads through on one pass |
| The verb lands on the wrong noun ("desserts explore") | The noun beside the verb is now "prawns", so see below | No longer a misreading |

**Two things I looked at and did not fail.** Neither is one a reader gets wrong, so under this pass's rule both are taste.

1. **"… fresh Ceylon prawns explore the diversity …"** The ear gets "prawns explore" for a moment. Round 3 failed the sentence with "desserts explore" as one of three faults, so this is the same thing in a smaller form, and I am naming it to be consistent. It does not send the reader back: the list is clearly marked as the subject and "with fresh Ceylon prawns" closes the third item. Dishes that "explore" produce is a familiar figure in food writing.
2. **"Or go directly to …"** The "Or" follows a statement, not a choice, and the mood turns imperative. A reader supplies the missing half straight away: skip those and go to dessert. It reads as a small joke, and the "or" and "directly to" are the owner's own words. No misreading, and no re-read.

**Rhythm:** 15, 31 and 12 words. S1 reads cleanly. The paragraph ends on the short line, and ¶3 ("Our breads, pastas …") follows without a bump.

**Exempt status.** S2 and S3 are exempt from the two checks by Alon's approval, not by the ruling's wording. Word check against `owner_copy[10]`: added "and", changed "exploring" to "explore" and "going" to "go", cut "from". The "and" replaces a comma, so it is an added word, and the ruling alone might not have covered S2. The approval settles it. S1 is exempt under the ruling, with clauses moved and no word added.

## Round 3's sentence checks, re-run

| Round 3 flag | Sentence | Now | Status |
|---|---|---|---|
| 1 | Dining ¶2 S2 | Replaced, above | Fixed |

Rounds 1 and 2 stay fixed: none of the cut rankings or the frequency has returned (`crowning`, `World famous`, `consistent`, `epitome`, `the hotel`, `stone`, Michelin, a pool length, WhatsApp, `dizzying`, `nestled`, `vibrant`, `amazing` and em dashes were checked by script and are absent from the file).

The three imprecisions round 3 listed in `sources.md` are corrected by a note at the end of that file. See "Draft against final" for what that leaves.

## The exempted sentences (42)

The ruling requires this list. Each was tested by script against `owner_copy[]` or `business.name_meaning`, word by word, this round, then read by hand. Spelling, spacing and the capital at a new sentence start were not counted as changes. They are not scored on "no triads" or "no padding vocabulary". Every other voice check and the whole fact audit apply.

| Sentence | Field | Source | Form | What the exemption shelters |
|---|---|---|---|---|
| "Our signature Sri Lankan rice & curry, … explore the diversity of the local produce available." | Dining ¶2 S2 | `owner_copy[10]` | **Alon approved this wording** | "zesty" |
| "Or go directly to a finger licking array of delicious homemade desserts." | Dining ¶2 S3 | `owner_copy[10]` | **Alon approved this wording** | "finger licking array of delicious" |
| "Pause, take a deep breath & exhale. You are home." (2) | intro heading | `owner_copy[0]` | verbatim | Triad of actions |
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
| "We strive for sustainable tourism." | Looking after S2 | `owner_copy[16]` | trimmed | nothing |
| "Our 9 spacious rooms have unobstructed sweeping views of the beach and beyond to the endless ocean, each with its own private balcony or exclusive patio area." | Rooms ¶1 | `owner_copy[8]` S1, S2 | two sentences joined by cutting, no word added | "sweeping", "endless" |
| "We have included thoughtful touches from evening lavender scents to high pressure rain showers so you are assured of a restorative stay in any one of our room types." | Rooms ¶2 | `owner_copy[8]` S3 | trimmed | "thoughtful touches" |
| "Elevated Comfort Food was the brief for our visiting menu designer, Chef Christophe DuBois." | Dining ¶1 S1 | `owner_copy[12]` | verbatim | "Elevated" |
| "Working closely with our owner, a self-confessed “easy foodie”, the team conjured a delectable array of dishes inspired from a global set-list of food heaven highlights." | Dining ¶1 S2 | `owner_copy[12]` | verbatim | "delectable array", "food heaven highlights" |
| "We truly believe some of the island’s best qualities may be expressed through our food." | Dining ¶2 S1 | `owner_copy[10]` | clauses moved, trimmed, wrong quote mark fixed | "truly believe", "may be expressed" |
| "Our breads, pastas, sauces, infused mayonnaise, stocks, spice blends, jams are made in-house and the menus subtly evolve with the seasons." | Dining ¶3 | `owner_copy[11]` | trimmed | nothing |
| "If you don’t find what you crave, simply ask our team to prepare what your tummy desires." | Dining ¶4 S1 | `owner_copy[9]` | verbatim | nothing |
| "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining ¶4 S2 | `owner_copy[9]` | verbatim | Triad |
| "Our home at The Sandhya can be your very own private beach house with an Exclusive Use booking." | Exclusive ¶1 S1 | `owner_copy[24]` | verbatim | "your very own" |
| "Our position on Kabalana Beach, in a secluded nook, lends itself to an intimate wedding party, birthday celebration, family reunion, wellness/fitness retreat or simply to celebrate life." | Exclusive ¶1 S2 | `owner_copy[24]` | clauses moved, trimmed | "lends itself to", "or simply to celebrate life" |
| "With the beach as your blank canvas and with our delightful staff at your service, we offer a private setting for your special occasion." | Exclusive ¶2 | `owner_copy[24]` S3 | trimmed, "the perfect" to "a" to drop a claim. Read by hand, since the word check finds "a" elsewhere in the source | "blank canvas", "delightful staff at your service", "your special occasion" |
| "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own in recent years with surfers, families, and digital nomads alike." | Kabalana ¶1 S1 | `owner_copy[19]` | clauses moved, trimmed | Triad; "buzzing and eclectic", "come into its own" |
| "Pristine sand and stunning sunsets have nurtured a laid-back scene where surf lovers, beach bunnies, serial retreat hunters and quiet couples coexist with welcoming locals." | Kabalana ¶1 S2 | `owner_copy[19]` | trimmed, "has" to "have" for grammar | "stunning", "laid-back scene" |
| "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `owner_copy[21]` | trimmed | nothing |
| "While away a whole day browsing through an eclectic array of boutiques, stopping for well-earned sips and bites from an ever-growing cafe and restaurant scene." | Kabalana ¶2 S2 | `owner_copy[21]` | verbatim | "eclectic array" |
| "Our own town Ahangama has grown into a foodies’ haven with a diverse selection of high-quality eateries and night spots." | Kabalana ¶3 S3 | `owner_copy[22]` | trimmed | "foodies’ haven", "diverse selection" |
| "Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `owner_copy[23]` | trimmed | Triad; "awe-inspiring" |
| "Depart your room in the crisp early morning and be back in time for a late lunch or cocktail." | Kabalana ¶4 S2 | `owner_copy[23]` | trimmed | nothing |
| "With panoramic glass doors & windows throughout, this captivating view is our artwork." | `featureLine` | `owner_copy[3]` S2 | verbatim, "though out" corrected | "captivating" |

**Owner-derived, not exempt, scored in full and clean:** Why ¶1 S1 ("Sandhya," added), Looking after S1 ("with" added, order changed), Rooms ¶4 ("In the Studio King," added), Casual ¶3 (an agent's frame around a quote), `spot` (composed from two sentences), Kabalana ¶3 S1 and S2 (recast, words added).

**Agent-written, scored in full and clean:** `tagline`, `closing`, `hoursNote`, `stayInfo.note`, the amenity, price and room notes, Casual ¶4, Rooms ¶3, Rooms ¶5, Dining ¶5, Kabalana ¶5. Lists of four or more ("a zero-food waste menu, a ban on single-use plastic, water recycling and a care programme", Rooms ¶3) are not triads. `amenities[]` rows are data labels, so "Beach chairs, loungers and umbrellas" was not scored as rhetoric.

**What this does not settle.** Being exempt does not make these sentences good, only unscored on two checks. Several still read as generated to a stranger ("food heaven highlights", "hypnotised by the allure"), which is the cost the proposal states. Loose grammar remains in exempt lines: "as temperature cools", "stocks, spice blends, jams are made", "inspired from", "within manageable day trips", and "lends itself to … or simply to celebrate life" does not run parallel. "25 minutes away. While away a whole day" repeats "away" and opens on an idiom a reader may take a beat over. All of them parse on the first read, so none is a fail under this pass's rule.

## Voice score per section

`Y` pass, `N` fail. "No triads" and "no padding" score only the non-exempt sentences in each section. "Aloud" uses this pass's rule. At page level: honest limit **Y** (`stayInfo.note`, the two amenity notes, the train station, breakfast for two adults); locale cadence **Y** (`en` only).

| Section | Rhythm | No triads | No padding | Concrete | Register | Aloud | Score | Note |
|---|---|---|---|---|---|---|---|---|
| Intro | Y | Y | Y | Y | Y | Y | 6/6 | All exempt |
| Why Sandhya | Y | Y | Y | Y | Y | Y | 6/6 | Only ¶1 S1 scored on the two checks |
| Casual Luxe | Y | Y | Y | Y | Y | Y | 6/6 | ¶3, ¶4 scored; plain |
| Looking after the place | Y | Y | Y | Y | Y | Y | 6/6 | "We strive for sustainable tourism." still sits bare, as the notes say; not a fail |
| The rooms | Y | Y | Y | Y | Y | Y | 6/6 | ¶3 remains the best writing the agents did |
| The Dining Room | Y | Y | Y | Y | Y | Y | 6/6 | Up from 5/6. ¶5 is the only line scored on the two checks |
| Exclusive Use | Y | Y | Y | Y | Y | Y | 6/6 | All exempt |
| Kabalana and around | Y | Y | Y | Y | Y | Y | 6/6 | ¶3 S1, S2 and ¶5 scored |
| `tagline`, `closing`, `featureLine`, `spot`, `hoursNote` | Y | Y | Y | Y | Y | Y | 6/6 | `featureLine`: "this captivating view" has no antecedent when it stands alone over an image; the design must make the view the image |
| Notes (`stayInfo`, `amenities`, `priceList`, `rooms`) | Y | Y | Y | Y | Y | Y | 6/6 | "ask us who runs them" and the quotation marks in "Our “from” price, plus “++”" read a little oddly from a hotel that would know; the notes own this, and it ends when the owner answers. A reader still understands them, and the facts allow nothing firmer |

Also noted, not fails: `bookingLinks[1–4]` keep the colon label, which still avoids promising that `?rid=` preselects a room.

## Draft against final

`en.draft.json` is the copy before this one change. By script, one field differs: `copyBlocks[5]` ¶2, as the brief says. The body is now 992 characters of 1,500, up from 974. Against the copywriter's round 2 (`369a73e`), seven fields differ (`copyBlocks[3]`, `[5]`, `[7]`, `stayInfo.note`, `amenities[6].note`, `amenities[7].note`, `priceList[0].note`), all logged. The set of numbers in the file is identical to both. `testimonials` are byte-identical to the dossier.

**`sources.md` and `humanizer-notes.md` are imprecise in these places.** None changes a fact, and none fails the copy.

1. **Both files, "Fix after the third review pass":** `"and" replaces a comma and the owner's "or"`. By word check the owner's "or" is still there, capitalised, opening S3. Only the comma went.
2. **`sources.md`, the ruling table and the Dining ¶2 row** still quote the superseded sentence and its form ("or" to "and"). The fix is in a note at the end of the file, and the rows were not changed. The same is true of the Kabalana ¶3 row (S1 and S2 numbering) and the "not exempt" list (`rooms[].note`), which the corrections note covers.
3. **`sources.md`, "For the copyeditor":** "the diff against it is this pass's two sentences and nothing else". `en.draft.json` has moved on since, and the diff is now the one paragraph.
4. **`humanizer-notes.md`:** the header's input line and the "Fences checked" paragraph describe `en.draft.json` as it stood before this change: "only `copyBlocks[5]` ¶2 and `copyBlocks[7]` ¶3 differ", and "974" for the body that is now 992. The "Left alone on purpose" entry for Dining ¶2 also still gives the old form.

## Calls I made on the fact audit

Stated so a person can disagree.

- **The same line as rounds 1 to 3.** The hotel's statement about its own premises, offer or beliefs is `sourced`. A ranking or frequency about the wider world, with only hotel marketing behind it, is not. On the current text no such ranking or frequency remains.
- **Alon's approval settles the voice of the two Dining sentences, not their facts.** I audited them like any others. They would have gone back to the copywriter if the audit had found a claim the dossier does not hold.
- **Trend and quantity words about the area stay `shared-context`:** "has come into its own in recent years", "an ever-growing cafe and restaurant scene", "has grown into a foodies’ haven", and "plenty of places to eat". I read the comparatives rule as aimed at claims that rank or count something. These rank nothing, name no number and are not attributed to the hotel. They are not `framing`: each is a claim with a dossier key. A stricter reader could mark them `unsourced`. If Alon or Shahar reads them that way, they go to the copywriter.
- **"plenty of places to eat" in detail.** `owner_copy[22]` says "a dizzying array of dining options" at the five beaches together, so "plenty" is narrower than what it replaced. Beyond the hotel, support is partial: `quotes[0]` covers Weligama and is machine-translated, and `quotes[5]` covers the hotel's own surroundings. For Midigama, Mirissa, Madiha and Hiriketiya Bay there is only the hotel's word.
- **"be back in time for a late lunch or cocktail" stays `shared-context`.** It is a claim about how long a day trip takes. `owner_copy[23]` carries it, and the dossier has no drive time for Yala, Udwalawe or Singharaja to check it against. On the owner's list below.
- **"Pristine" stays `shared-context`.** One guest (`reviews.quotes[7]`, 2026-02) reports debris from demolished structures on the beach; two others call it clean (`quotes[5]` 2026-02, `quotes[1]` 2026-07, the latter machine-translated). The evidence leans the hotel's way, and the harvester did not record a contradiction.
- **"unobstructed" stays `sourced`.** `room_types[].site_summary` "full ocean views"; `quotes[0]` "all the rooms face the ocean"; the same `quotes[7]` calls the view "wonderful" despite the structures.
- **"King bed" on the Director's Suite stays `sourced`.** `contradictions.suite_bed` has a side taken and not shown: two of three own-surface mentions, and it understates rather than flatters. Owner item.

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
| "We truly believe some of the island’s best qualities may be expressed through our food." | Dining ¶2 S1 | `owner_copy[10]`. A stated belief, not a ranking of the hotel | `sourced` |
| "Our signature Sri Lankan rice & curry, our zesty DIY poke bowls and our localized “Tom Yum” style noodles with fresh Ceylon prawns explore the diversity of the local produce available." | Dining ¶2 S2 | `owner_copy[10]`, `dining.dishes`, `dining.concept` for local produce. Reasoning above | `sourced` |
| "Or go directly to a finger licking array of delicious homemade desserts." | Dining ¶2 S3 | `owner_copy[10]`, `dining.dishes` "homemade desserts" | `sourced` |
| "Our breads, pastas, sauces, infused mayonnaise, stocks, spice blends, jams are made in-house and the menus subtly evolve with the seasons." | Dining ¶3 | `owner_copy[11]`, `dining.made_in_house` | `sourced` |
| "If you don’t find what you crave, simply ask our team to prepare what your tummy desires." | Dining ¶4 S1 | `owner_copy[9]` | `sourced` |
| "Dishes catering to vegetarian, vegan, keto and other dietary lifestyles are available." | Dining ¶4 S2 | `owner_copy[9]`, `facilities` | `sourced` |
| "A continental breakfast for two adults is included in your stay." | Dining ¶5 | `dining.breakfast`, `facilities`, `booking.rate_terms`. The limit is kept. **That limit is a search snippet, not seen live** | `sourced` |
| "Our home at The Sandhya can be your very own private beach house with an Exclusive Use booking." | Exclusive ¶1 S1 | `owner_copy[24]` | `sourced` |
| "Our position on Kabalana Beach, in a secluded nook, lends itself to an intimate wedding party, birthday celebration, family reunion, wellness/fitness retreat or simply to celebrate life." | Exclusive ¶1 S2 | `owner_copy[24]`; Wallpaper* "a quiet corner". "family reunion" beside `tagline` adults-only: see "For a person" | `sourced` |
| "With the beach as your blank canvas and with our delightful staff at your service, we offer a private setting for your special occasion." | Exclusive ¶2 | `owner_copy[24]` S3 | `framing` |
| "Just by the buzzing and eclectic town of Ahangama, Kabalana Beach has come into its own in recent years with surfers, families, and digital nomads alike." | Kabalana ¶1 S1 | `owner_copy[19]`, `location.spot`. About the beach; "families" is not about this adults-only hotel | `shared-context` |
| "Pristine sand and stunning sunsets have nurtured a laid-back scene where surf lovers, beach bunnies, serial retreat hunters and quiet couples coexist with welcoming locals." | Kabalana ¶1 S2 | `owner_copy[19]`. See "Calls I made" | `shared-context` |
| "Centuries old Galle Fort, a UNESCO World Heritage Site, is just 25 minutes away." | Kabalana ¶2 S1 | `owner_copy[21]`, `location.nearby[0]`; `quotes[0]` "20-30-minute drive" (machine-translated) | `sourced` |
| "While away a whole day browsing through an eclectic array of boutiques, stopping for well-earned sips and bites from an ever-growing cafe and restaurant scene." | Kabalana ¶2 S2 | `owner_copy[21]` | `shared-context` |
| "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have surf points and whale-watching boat rides." | Kabalana ¶3 S1 | `owner_copy[22]`, `location.nearby[1]` (no distances given, and the copy gives none) | `shared-context` |
| "You will find plenty of places to eat there too." | Kabalana ¶3 S2 | `owner_copy[22]` "a dizzying array of dining options"; partial: `quotes[0]` (Weligama, machine-translated), `quotes[5]` (near the hotel). See "Calls I made" | `shared-context` |
| "Our own town Ahangama has grown into a foodies’ haven with a diverse selection of high-quality eateries and night spots." | Kabalana ¶3 S3 | `owner_copy[22]`, "stone's throw" correctly cut | `shared-context` |
| "Yala and Udwalawe National Parks, Singharaja Forest and awe-inspiring waterfalls are within manageable day trips from The Sandhya." | Kabalana ¶4 S1 | `owner_copy[23]`, `location.nearby[2]`, spellings as published | `shared-context` |
| "Depart your room in the crisp early morning and be back in time for a late lunch or cocktail." | Kabalana ¶4 S2 | `owner_copy[23]`. See "Calls I made" | `shared-context` |
| "Ahangama train station is 1.4 km from us." | Kabalana ¶5 | `location.nearby[3]` (Trip.com) | `sourced` |

Headings "Why Sandhya", "Casual Luxe", "Looking after the place", "The rooms", "The Dining Room", "Exclusive Use", "Kabalana and around" assert nothing beyond their blocks: `framing`.

### Prices, rooms

| Row | Field | Dossier key | Verdict |
|---|---|---|---|
| Exclusive Use of the whole house, per night, 3500 USD, "Our “from” price, plus “++”, as of 2026-11-06." | `priceList[0]` | `offers[0]`; qualifiers kept, `fetched_at` matches. "++" unexplained at source | `sourced` |
| Studio King, King bed, sleeps 2, "38 sq m on the upper or ground floor, with 3.5 m floor-to-ceiling glass doors." | `rooms[0]` | `room_types[0]`, `.site_text[1]` | `sourced` |
| Studio Twin, 2 super-single beds, sleeps 2, "38 sq m on the upper floor, with 3.5 m floor-to-ceiling glass doors." | `rooms[1]` | `room_types[1]`, `.site_text[1]` | `sourced` |
| Studio+ King, King bed, sleeps 2, "40 to 43 sq m on the upper or ground floor, with a deep stand-alone soaking tub and dual sinks." | `rooms[2]` | `room_types[2]`, `contradictions.room_size`, both sides in the range | `sourced` |
| Director’s Suite, King bed, sleeps 2, "About 75 sq m on the top floor, with a living area, walk-in wardrobe, soaking tub, ocean-view balconies and a 55-inch TV." | `rooms[3]` | `room_types[3]`, `.site_text[1–3]`. Bed: see "Calls I made" | `sourced` |

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

Exact matches below were checked by script this round.

| Row | Field | Dossier key | Verdict |
|---|---|---|---|
| Trip.com, 9.7/10, 56, 2026-11-06 | `ratings[0]` | `reviews.trip`, first-hand; score, count and URL exact | `sourced` |
| Kayak, 9.4/10, 159, 2026-11-06 | `ratings[1]` | `reviews.kayak`, `via_digest`; score, count and URL exact | `sourced`, person to read before go-live |
| "It’s a beautiful place …", Guest User, 2026-06 | `testimonials[0]` | `reviews.quotes[3]`, exact match, author and date match, not machine-translated, 473 characters | `sourced` |
| "A great stay …", Guest User, 2026-02 | `testimonials[1]` | `reviews.quotes[6]`, exact match, author and date match, not machine-translated, 387 characters | `sourced` |
| +94765700007 | `contact.phone` | `contact.phone`, exact | `sourced` |
| reservations@thesandhya.com | `contact.email` | `contact.email`, exact | `sourced` |
| "Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka" | `contact.address` | `location.address`, exact; postcode source noted in `sources.md` per playbook §6 | `sourced` |
| Google Maps URL | `contact.mapUrl` | `location.map_url`, exact | `sourced` |
| "Check rooms and live dates" | `bookingLinks[0]` | `booking.engine_url`, exact | `sourced` |
| Four "<room>: check live dates" | `bookingLinks[1–4]` | `booking.engine_room_links`, all four exact. Preselection unverified, not promised | `sourced` |
| Instagram | `socialLinks[0]` | `contact.socials.instagram`, exact | `sourced` |
| English | `languagesSpoken` | `languagesSpoken` (Trip.com only) | `sourced` |

## Completeness (`beach_lodging`)

Must have: `rooms[]` 4, `bookingLinks[]` 5, `photos[]` 187 in the dossier for the deployer. Should have: `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]`, `spot` all set. `season`, `openingHours` and `contact.whatsapp` are empty, each with a stated reason in `sources.md` that holds against the dossier. Two testimonials stand, by the operator's decision against excerpting: not a defect. Caps on the prose fields, labels, notes and quotes were checked by script and met; the longest body is Kabalana at 1,133 of 1,500, and `copyBlocks[]` is at its limit of 8. No section is padded to look full. No duplicate fact across two blocks: the new sentence adds no fact, and the dishes are still only in Dining ¶2. Kabalana ¶3's places to eat are at the five beaches and its eateries are in Ahangama, which are different places. Rates in Rooms ¶5 and the link in `closing` are disclosed in `sources.md` and say different things, as do rain shower pressure (Rooms ¶2) and size (¶3).

For the designer, not a copy fail, carried from round 1: `testimonials[].source` is `other` and the schema has no URL or label on a testimonial, so nothing in the content names Trip.com for the two quotes, and playbook §6 asks for the source. `ratings[].platform` is `other` for both rows too: the design must print each name.

## For a person, before go-live

None of these is a defect in the copy under the prompt.

1. **Kayak 9.4 from 159.** Read through a digest only. `capturedAt` means "read from the platform". Momondo carries the same hotel id, so it looks like one dataset read twice and should not count as a second source.
2. **Breakfast "for two adults".** Rests on a search snippet of the engine page, as does the rest of `booking.rate_terms`.
3. **The engine and the four `?rid=` links.** Never opened from a real browser.
4. **"संध्य".** Copied correctly from the hotel's text, so `sourced`. From general knowledge, not from the dossier: the usual Sanskrit spelling of the word is "संध्या", with a final long vowel. Worth one check by someone who reads Devanagari before a large word on the page carries it.
5. **"family reunion" beside "adults-only".** Both are the hotel's words. A guest listed as "(Family)" appears in `reviews.quotes[0]`, and `contradictions.age_policy` is open. The owner should say whether Exclusive Use lifts the age limit.
6. **Owner items already in `sources.md`:** pool length, "++", the triple supplement, minimum age, check-in time, who runs surf lessons and board hire, "just a few meters", 2017 and 2023, "Udwalawe" and "Singharaja", "Bottled water" beside the plastic ban.
7. **"be back in time for a late lunch".** The hotel's claim for day trips to Yala, Udwalawe and Singharaja. The dossier holds no drive time, so only the owner can stand behind it.

## What must change to pass

Nothing. **Copywriter:** nothing. **Humanizer:** nothing.

## Not covered

No live page was opened and nothing was re-fetched: the dossier is the ground truth for this review, so the items under "For a person" remain open. Photos and captions are outside it, as the copy has none. No research check: the run is outbound. `dossier.json` was read in full except `images[]`, `videos[]` and `rate_snapshots`, which were skipped because the copy has no captions, no video and no OTA price; only the count of `images[]` was taken. `audit.json` was not read, because the audit is never a source for a claim (hard constraint 2). "Aloud" is a judgement made from the text, as in earlier rounds, not a recording of anyone reading it. I did not see Alon's own words: his approval of the Dining wording and his rule for this pass reached this review through the session's brief and, for the wording, the files named at the top.

## Follow-up after 4g: Every room has

Copyeditor 0.4.2, 2026-11-09, run `2026-11-ahangama-01`, `mode: test`. A narrow check, not a round: the critic at 4g / critiqued(1) (`reports/2026-11-ahangama-01/the-sandhya.md`, dimension 5) found that Rooms ¶3 S1–S3 reach the built page not as prose but as a list, and this review had never seen that form. Only those three sentences were checked. `en.json` and `dossier.json` are unchanged since round 4, so the rest of this file stands.

**Verdict: PASS. No replacement wording needed.**

**What the page shows** (`final/dist/index.html`, `.kit-list`). The label `Every room has` (`src/lib/labels.mjs` `roomKit`), then 11 items from `src/gaps/gaps.json` `roomKit`, shown by `src/pages/index.astro` in place of Rooms ¶3. Each item is Rooms ¶3 cut at its commas and "and"s. Every word is kept. Only the connectives "Each one also has" and "too, with" are dropped. The text is lower case in the DOM, and `.cap::first-letter` capitalises it on screen.

| Sentence in `en.json` (Rooms ¶3) | List items | Dossier key, checked again for all four `room_types[]` | Verdict |
|---|---|---|---|
| S1 "Every room has a plush pillow-top mattress with 500 thread count linen, a shower big enough for two, Spa Ceylon amenities, bathrobes and slippers." | a plush pillow-top mattress with 500 thread count linen · a shower big enough for two · Spa Ceylon amenities · bathrobes and slippers | `.site_text` / `.engine_description` "plush pillow top mattress clad in 500 thread count linen"; `.amenities` "2-person rain shower"; `.site_text` "Spa Ceylon"; `.amenities` "Bathrobes and slippers". Present in all four | `sourced` |
| S2 "Each one also has central air conditioning and a ceiling fan, a desk, universal sockets, a hairdryer and a Bluetooth speaker." | central air conditioning and a ceiling fan · a desk · universal sockets · a hairdryer · a Bluetooth speaker | `.amenities` / `.engine_amenities` "Central aircon", "Ceiling fan", "Console or Work Desk" ("Console and working desk" in the suite), "Universal sockets", "Hairdryer", "Bluetooth speaker". Present in all four | `sourced` |
| S3 "High speed WiFi too, with newspapers and magazines from around the world on PressReader." | High speed WiFi · newspapers and magazines from around the world on PressReader | `.amenities` "High speed Wi-Fi", "…from around the world via PressReader"; `.site_text` "high speed wifi", PressReader. Present in all four | `sourced` |

**Facts.** The scope has not widened. In the prose, S2's "Each one" and S3's "too" already put every item in every room. The label says the same, and the dossier holds every item for each of the four room types. No qualifier is lost, since the sentences had none. Nothing new was added. 0 `unsourced`, 0 `contradicted`.

**Voice.** These are agent-written sentences, not owner prose (line 110 above), so the owner-prose exemption does not apply and every check was run in full. An 11-item list under a label is not a triad. "plush" is the hotel's own word (`room_types[].site_text`). Each item reads correctly after "Every room has", and with CSS off each reads as the continuation of that phrase. Nothing here would make a reader stumble or misread. Clean.

**Completeness.** Rooms ¶3 is no longer in the DOM as prose (`R.slice(3)` skips it), so its facts appear once. None of the 11 items repeats a row of `amenities[]` in the "Amenities" block below it.

**Note for the operator, not a fail.** These words now live in `final/src/gaps/gaps.json` `roomKit`, a second copy of `en.json` Rooms ¶3. If either is edited, the other must be edited to match, and this check must be repeated.
