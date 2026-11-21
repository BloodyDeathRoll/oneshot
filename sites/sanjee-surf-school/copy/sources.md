# copy sources: sanjee-surf-school · en

Copywriter 0.5.0 · run 2026-10-midigama-01 (test) · 2026-11-05. Facts come from `dossier/sanjee-surf-school/dossier.json` only (harvester 0.5.0, harvested 2026-11-05). `audit.json` `recommended` (auditor 0.1.3) is used only for how to sell: the primary action, the order of the offer and the closing intent. It is never used as a fact.

Caps were re-read from `schemas/site-content.md` v0.11 this round: see "Caps" at the end, with the measured lengths.

The humanizer 0.2.1 pass of 2026-11-05 rewrote `en.json`; its changes are in `humanizer-notes.md`. The rows below describe `en.json`, and paragraph numbers are `en.json`'s. `en.draft.json` was refreshed for the voice fixes V1 and V2 (`review.md` round 1): it is now the committed `en.json` of 6d49a9f, with the copywriter's round 2 fixes, so a diff against `en.json` shows only those two sentences. The copywriter's original draft is at `git show 419b979:sites/sanjee-surf-school/copy/en.json`.

**Round 2 fixes (copywriter 0.5.0, after `review.md` round 1).** Made directly in `en.json` and not listed in `humanizer-notes.md`; they are in the refreshed `en.draft.json`: `ctas.primary` (F1), `languagesSpoken` (F2), block [4] ¶3 and a new ¶4 (F3, N1), and nine `priceList` notes (F4, N1). The `priceList` section below lists them row by row.

**This is the owner-prose case, with a warning.** The site carries a lot of first-person and owner-side copy, so its sentences are used wherever they do not touch a contradiction (edits are listed under "Edits to the owner's words"). The authorship of the first-person story is unknown (`business.owner_voice.note`), and the legal pages name someone else as provider (`flags_for_operator[0]`). The copy therefore says "we" and "our" without saying whose business it is, calls Sanjee only "head instructor", and never says owner, founder, family or "his school".

Prices and quotes were pulled from the dossier by script, not retyped.

## Harvest decisions: all 21 contradictions

Index = position in `contradictions[]`. "Left out" means no value is stated anywhere on the page.

| # | What | How the copy handles it |
|---|---|---|
| 0 | name: Sanjee Surf School / Sanjee Surf | `businessName` is `business.name.value`, Sanjee Surf School (Google and the tee). Block [7] tells the reader the other name exists. No side is hidden. |
| 1 | address | Resolved in the dossier: the Google listing, used in `contact.address` (playbook §6). |
| 2 | coordinates | `contact.mapUrl` is the Google pin. The site schema's point is not used. Block [7] gives Google's plus code for the same pin. |
| 3 | where Coco Beach is ("eastern end of the bay" against the Google pin) | **Left out.** `spot` keeps the owner's sentence without "at the eastern end of the bay". No direction or side of the bay is stated. "Coco Beach" is the site's word. "Coconut Beach" and "Coconut Surf Point" are not used, because `location.spot.note` says the same place is likely, not proven. **Owner to confirm.** |
| 4 | email | Resolved in the dossier: sanjee@sanjee-surf.com, the only one that can receive mail. |
| 5 | hours (three sets) | **Left out.** `openingHours` is `[]`, `hoursNote` is null. See the warning under "Top-level fields". Audit F14. **Owner to pick.** |
| 6 | review count | Resolved in the dossier: Google, 13. The schema's 150 (`reviews.site_claim`, `do_not_use`) appears nowhere. |
| 7 | experience ("over 15 years", "20+", "12+ teaching", age 8 or twelve, "28 years") | **Left out**, every number and age, audit F9. `business.owner_voice` says "more than two decades in this bay"; that clause is cut from the owner's sentence in block [1] (see "Edits"). The story keeps what no value disagrees with. **Owner to pick.** |
| 8 | students (500+, 2,000, 3,000+) and lessons (5,000+) | **Left out** (`claims_unconfirmed`, audit F9). |
| 9 | lesson format: all private, or small groups of 2 to 4 | **Not resolved.** The Beginner Lesson has `groupSize: null`, so the page does not say private or group for it. Private Coaching says "One-on-one" and the Week Intensive "5 private sessions" because each card says so of itself (`lessons[1].features`, `lessons[2].features`), and neither is disputed. "All sessions are private" is not used. Block [2] ¶3 keeps only "For group bookings, please leave us a message.", which is true on every reading, and gives no group size or price. Audit F7. **Owner to settle before go-live.** |
| 10 | lesson price | Resolved in the dossier: home page, $40 and $50 (`offers`, `offers_note`). The FAQ's about $25 and about $45 appear nowhere. |
| 11 | multi-day packages | The Week Intensive only, the one with a price. The FAQ's 3-, 5- and 7-day packages (no prices) are left out. **Owner to confirm.** |
| 12 | tuk-tuk price and size | **Prices:** `priceList` carries the home page and /tuktuk prices that `offers` records, following the harvester's own decision in `offers_note`. The FAQ's "from about $60" and "from about $110" are left out. **Size: not resolved, left out.** The dossier has no `resolved` line for it: the cards say up to 2, the FAQ up to 3 for the half day, and /faq "2–3 passengers". No row or sentence states a party size. Block [4] ¶4 says only what every side agrees on, that the price is for the tour and not per person, and tells the reader to ask how many can come (`review.md` R7, F3). **Owner to pick.** |
| 13 | tour inclusions | Resolved in the dossier: the priced cards. Guided tasting, snorkelling and surfboards are not promised. The nine outings' exclusions are in block [4] ¶3 and their own notes. Whether the three surf tours supply boards is not stated, because no priced card says. **Owner item.** |
| 14 | rental deposit: $50 or $100 by board, or $100 or 30,000 LKR on all | **Amount left out.** Both sides agree there is a refundable deposit, so block [3] ¶4 says that and tells the reader to ask. Audit F12. **Owner to pick.** |
| 15 | hardboard day rate: $20, against "$10–15" about the town | $20 from the rental table. The other figure is about the town, not this business. |
| 16 | board swaps | **Left out.** Audit F12. **Owner to pick.** |
| 17 | cancellation | **Left out**, both policies, audit F8. No cancellation sentence exists on the page. **Owner to pick.** |
| 18 | card on the day | **Left out.** Block [5] ¶3 names only cash, which every source accepts, and does not mention cards. **Owner to pick.** |
| 19 | water temperature | **Left out.** Neither range is used. |
| 20 | who is behind the business | **Not resolved, not touched.** See the paragraph at the top. The legal operator's name, city, street address and email appear nowhere. |

## Other harvest decisions

| Decision | How the copy handles it |
|---|---|
| `do_not_use`: the review by "Dr. Marcel Panzer", the three `/surfing-weligama` testimonials, the 150 reviews | None used. Facts that come only from the flagged review (the 6am session, the 10 minutes by tuk-tuk, the coconuts, "Booked through the website") are not used either. |
| Booking path (`booking.path`, audit `primary_action`) | WhatsApp is the primary action (`contact.whatsapp`, `ctas.primary`, `closing`). Nothing on the page says WhatsApp is answered or how fast. |
| The old wizard, deposit and slots (`booking.engine_url`, `booking.deposit`) | Not described: no online booking, no $8, no 20%, no five time slots. Whether a deposit applies to a booking made over WhatsApp is unknown and is not stated. **Owner item.** |
| Reply time (`booking.reply_time_hint`, "within a few hours") | **Left out.** The dossier does carry this /faq line, but nobody has tested it (`contact.whatsapp.verified`), and it would sit beside the very action we could not test. **Owner to confirm**, then it can go beside the action (playbook §5). |
| Socials | None. All three linked accounts are dead (`contact.socials`, audit F11). |
| Video | No copy refers to a video (operator's decision: go on stills). "photo/video memories" in `lessons[2].includes` is a card feature of the Week Intensive, not page media. |
| Old-site faults (toast, placeholder address, dead email) | Pitch material, not on the page. |
| Pool (img-015) | Not mentioned. `images[14].not_a_facility_of_the_school`. |
| Quiver size and brands (`rental_terms.quiver_size_claim`: 40+ boards, Channel Islands, JS, Pyzel, local shapers) | **Left out**: the dossier says to treat them as unconfirmed. The board types and sizes are used (block [3] ¶2). |
| Pickup area | `facilities[1]` says "Weligama, Mirissa, and surrounding areas"; the nine priced outings say "Pickup and return within Weligama". The narrower one is used, and only for those nine. Mirissa pickup is not promised. **Owner to confirm.** |

## Top-level fields

| Field | Copy | Rests on |
|---|---|---|
| `businessName` | "Sanjee Surf School" | `business.name.value` |
| `businessType` | `surf_school` | `business.type` |
| `tagline` | "Surf lessons in Weligama, on the south coast of Sri Lanka." | "Surf lessons": `business.description`, `business.type`. "Weligama": `location.address`. "South coast of Sri Lanka": shared context about the place. Written to answer audit F6 (the old first screen names no place). |
| `closing` | "Send us the lesson and date you want on WhatsApp, or call the same number." | Task: `audit.recommended.closing_intent` (not a fact). WhatsApp: `contact.whatsapp`, `booking.path`. Same number: `contact.phone.verified`, `contact.whatsapp.value`. No reply time. |
| `featureLine` | "Making waves, one lesson at a time." | `business.tagline.value`, the owner's footer line, verbatim. The hero's "Ride the Wave of Your Life" is not used. |
| `ctas.primary` | "Ask on WhatsApp" | Not a schema field: the schema leaves interface labels to the template, and `sites/global-surf-adventures/copy/en.json` is the precedent for `ctas`. The site's own label (`booking.path.note`: "Reserve on WhatsApp", "Ask on WhatsApp"). It names nobody, because no dossier key says who holds this phone (`review.md` R10, F1): the number is verified (`contact.whatsapp`), who answers is not. "Reserve" is not used, because nothing has shown a message secures a place. `audit.recommended.primary_label`, "Message Sanjee on WhatsApp about a lesson", is not used for the same reason. The prefilled message carries what was chosen (playbook §5). **Owner to confirm** who holds the phone; if it is Sanjee, the label can name him. |
| `spot` | "Coco Beach is our home spot, a beach break. Smaller crowds than the main peak and a friendly, mellow vibe, ideal for first pop-ups." | `location.spot.value`, restructured (see "Edits"), and `surf_spots[0]` (beach break). |
| `season` | "Best surf season runs November to April; peak swell and dry weather are December–February." | `season.value`, verbatim. No closed months are published. |
| `openingHours`, `hoursNote` | `[]`, null | Contradiction 5. **Designer warning:** the schema says a day in no row is closed. With this empty array the template must show no hours at all, never a week of "closed". |
| `languagesSpoken` | `["en","si"]` | `languages_spoken[0–1]`. Tamil is left out: the dossier says "basic Tamil" (`languages_spoken[2].note`), the field means "who you can be served in", and the select cannot carry "basic", so `ta` would read the same as English (`review.md` R6, F2). The reason is the field's meaning, not a cap. Both languages come from /about, Sanjee's own page. **Owner item**: Tamil can return if he confirms lessons can be given in it. |
| `rooms`, `stayInfo`, `amenities`, `brands` | empty | Not this type. The one amenity, free dry storage, is in block [3] ¶1. |
| `bookingLinks` | `[]` | No engine carries over: the old dialog has no deep link (`booking.engine_url.kind`). |

## Copy blocks: one line per paragraph

| Block ¶ | Copy (short) | Rests on |
|---|---|---|
| [0] heading | "Who we teach" | framing |
| [0] ¶1 | "You can come to us as" a total beginner, a beginner who can already stand up, an intermediate or an advanced surfer | `levels[0–3]` ("Total beginner", "Beginner (can stand up)", "Intermediate", "Advanced") |
| [0] ¶2 | lessons in English as standard | `languages_spoken[1].note` ("Lessons in English as standard") |
| [1] heading | "Sanjee, head instructor" | `team[0]`, role "Head Instructor & Founder", with "Founder" cut (`flags_for_operator[0]`) |
| [1] ¶1 | born in Weligama; learned on a broken board his uncle fixed with resin and hope | `business.owner_voice.value`, first person. See "Edits". **Owner to confirm**: authorship unknown. |
| [1] ¶2 | "Today I teach surfers from all over the world — and I still paddle out every single morning." | `business.owner_voice.value`, verbatim. |
| [2] heading | "Lessons" | framing; `lessons` |
| [2] ¶1 | every lesson includes professional instruction and a beach safety briefing; board and rash guard rental is in the price | `includes[0].value`, first sentence, reworded with the same three items and the same "all lessons" scope (see "Edits"). The second, "We provide everything you need—just bring yourself and a smile!", is cut as padding. |
| [2] ¶2 | Week Intensive across 10 days, pick your best days; muscles happily exhausted; get in touch beforehand to work out days and times | `lessons[2].description`. See "Edits". |
| [2] ¶3 | "For group bookings, please leave us a message." | `lessons[0].note`, second sentence, verbatim. Contradiction 9. |
| [3] heading | "Board rental" | framing; `rentals` |
| [3] ¶1 | shop 30 seconds from the sand at Coco Beach; free dry storage there between sessions | `location.shop.value`, verbatim; `facilities[0].value`, the owner's fragment with "at our shop" as "there". Both are site claims with no photograph (`location.shop.note`, `gaps` location.shop). The scout's pin is 105 m from shore (`contradictions[2]`), which is more than 30 seconds on foot if the pin marks the shop. **Owner to confirm.** |
| [3] ¶2 | six board types with their sizes | `rental_terms.quiver[0–5]`. Soft-top and hardboard prices are not mapped to these types, because no source does. The photos show soft-tops and few hard boards (`rental_terms.quiver_size_claim.note`). **Owner to confirm.** |
| [3] ¶3 | leash (6 ft – 9 ft) and fins (FCS-II or Futures); then wax and a fresh wax comb, as a second sentence | `rental_terms.included[0–2]` |
| [3] ¶4 | ID or passport copy, refundable deposit, ask for the amount | `rental_terms.id_required`, `rental_terms.deposit`. Contradiction 14. |
| [4] heading | "By tuk-tuk" | framing; `offers` group `tuk_tuk` |
| [4] ¶1 | the three tours that go looking for waves, by name ("three tours" is written again, after `review.md` V1 and V2) | `offers` tour_id `surf-safari`, `full-coast`, `sunrise-session` |
| [4] ¶2 | the other nine tours: outings along the coast and inland, at estimated introductory prices, with pickup and return within Weligama (one sentence; ¶3's "those outings" leans on "outings" here) | The nine other `offers` with group `tuk_tuk`: `includes` "Pickup and return within Weligama", `note` "Estimated introductory package price". "Inland": the tea estate's "Travel inland". The hedge on the prices is kept on purpose. |
| [4] ¶3 | those outings don't include meals or activities | The nine other `offers` with group `tuk_tuk`: each one's `includes` lists "meals and activities" as excluded (checked by script). Stated once here, not nine times in the notes. "Those outings" leans on the noun in ¶2. The three surf tours are not covered: one includes lunch, one has a breakfast stop. |
| [4] ¶4 | a tour's price is for the tour, not per person; ask how many people can come | `offers` group `tuk_tuk`: `unit` "per tour", `includes` "price per tour", `note` "Price is for both persons if 2 attend". The FAQ's side of contradiction 12 also prices the tour for a party, so this holds on every side. No party size is stated (F3). |
| [5] heading | "Before you book" | framing |
| [5] ¶1 | swim at least 50 meters unaided | `requirements[0]` (Terms) |
| [5] ¶2 | kids from age 6; under 18 with a parent or legal guardian | `requirements[2]`, verbatim; `requirements[1]`, shortened. |
| [5] ¶3 | cash on the day can be LKR, USD or EUR; all prices as of 5 November 2026 (two paragraphs in the draft, joined by the humanizer) | Cash: `booking.payment_on_the_day` ("can be paid in cash (LKR, USD, or EUR)"). Worded so it does not say the whole price is paid on the day, because the source speaks of the balance after a deposit, and does not mention the deposit, which the new page will not take. Cards: contradiction 18. Date: `offers_note` ("captured 2026-11-05"); playbook §7. |
| [6] heading | "Other waves, as we rate them" | The levels and break types are the school's own (`surf_spots[].source_url` is its site), so the heading says so. |
| [6] ¶1 | Jungle Beach, Weligama Main Point: "beach breaks we'd call beginner waves"; Mirissa beginner to intermediate | `surf_spots[1,4,10]`, as published. "We'd call" is the school's own level rating, as the heading says, not a new claim. "Weligama Main Point" is listed as a beginner beach break despite its name; kept as published. |
| [6] ¶2 | for intermediates: Fishermans, Island Point, Plantation Point, Lazy Left; Lazy Right intermediate to advanced | `surf_spots[2,3,5,6,7]` |
| [6] ¶3 | Ram's Right, Kabalana (The Rock): for advanced surfers | `surf_spots[8,9]` |
| [7] heading | "Finding us" | framing |
| [7] ¶1 | look for Sanjee Surf School on Google Maps, plus code XC63+4H; may also appear as Sanjee Surf | `business.name`, `location.plus_code`, `business.site_brand` |

## Edits to the owner's words

| Where | The site says | This page says | Why |
|---|---|---|---|
| [1] ¶1 | "I was born in Weligama, learned to surf on a broken board my uncle fixed with resin and hope, and have spent more than two decades in this bay." | "I was born in Weligama and learned to surf on a broken board my uncle fixed with resin and hope." | The "more than two decades" clause is cut (contradiction 7), and the comma becomes "and" to close the sentence. **Copyeditor**: check this counts as a trim. |
| [2] ¶1 | "All lessons include board and rash guard rental, professional instruction, and beach safety briefing." | "Every lesson includes professional instruction and a beach safety briefing. Board and rash guard rental is in the price too." | Humanizer: the triad broken into two sentences. Same three items, same scope. "Rental" stays, because a rashguard is also sold (`priceList`). |
| [2] ¶2 | "Spread across 10 days – pick your best days! After 2 hours of surfing, your muscles will be happily exhausted. Contact us beforehand to coordinate which days and times work best for you ❤️" | "The Week Intensive is spread across 10 days, so you can pick your best days. After 2 hours of surfing, your muscles will be happily exhausted. Get in touch beforehand and we'll work out which days and times suit you." | First sentence made whole. Second verbatim. Third re-voiced by the humanizer ("coordinate" was the stiff word), without the emoji. No reply time is implied. |
| [3] ¶1 | "Free dry storage at our shop while you eat or rest between sessions." | "Free dry storage there while you eat or rest between sessions." | Follows the shop sentence, so "at our shop" becomes "there". The owner's fragment is kept (humanizer). |
| [5] ¶2 | "Participants under 18 years of age must be accompanied by a parent or legal guardian." | "Anyone under 18 must be accompanied by a parent or legal guardian." | Terms wording made plain; same limit. |
| `spot` | "Our home spot at the eastern end of the bay. Smaller crowds than the main peak and a friendly, mellow vibe — ideal for first pop-ups." | "Coco Beach is our home spot, a beach break. Smaller crowds than the main peak and a friendly, mellow vibe, ideal for first pop-ups." | Contradiction 3 removes the location clause. The name and "beach break" (`surf_spots[0]`) are added so the field stands alone. The owner's second sentence is a fragment again (humanizer), with a comma for its em dash. |
| not used | "Ride the Wave of Your Life", "Personalized instruction", "experienced local instructors", "ultimate surf guiding experience", "best surf spots", "perfect waves", "scoring glassy waves" | | Slogans and superlatives (hard constraints 3 and 12). "Experienced" also touches contradiction 7. |

The em dash in [1] ¶2 is the owner's. The humanizer kept it: the sentence is verbatim, and it is the only em dash on the page.

## `lessons[]`

| Row | Copy | Rests on |
|---|---|---|
| [0] | Beginner Lesson · 120 min · first_time, beginner · groupSize null · $40 per_lesson · includes the four card features, lightly joined | `lessons[0]`. `groupSize`: contradiction 9. |
| [1] | Private Coaching · 120 min · beginner, intermediate, advanced · "One-on-one" · $50 per_lesson · "Customized learning pace, flexible scheduling" | `lessons[1]`, `.features`. Level: `lessons[1].level` and its `level_note` (not stated on the card; the site says "From beginners to advanced" for lessons overall). |
| [2] | Week Intensive · 120 min each · level null · "5 private sessions" · $160 flat · "Progress tracking, photo/video memories" | `lessons[2]`, `.features`, `.note`. Level is null in the dossier. "Flexible scheduling" and choosing days are in block [2] ¶2, and "Board & rash guard included" in block [2] ¶1. No saving against single lessons is computed. |

## `rentals[]`

17 rows: 16 from `rentals[0–15]`, labels and prices unchanged, plus the bodyboard from `offers`. Unit: `per_hour` for 1 hour, `per_day` for 24 hours, `flat` for the rest because the select has no matching unit and the label carries the length.

Notes kept: "Walk-in" (1 hour), "One full session" (2 hours), "Dawn or afternoon session" (half day), "Two sessions + sunset" (full day). The same note on a soft-top and a hardboard row of one length is one row-level attribute, not a repeated claim.

Notes cut, not for a cap:
- "Save 20% vs daily": **wrong for the hardboard**. 3 × $20 = $60 against $50 is about 17%. The soft-top is right (3 × $15 = $45 against $36). Reported to the operator.
- "Save ~33% — best value for a week trip": "best value" is a superlative, and the reader can see the price.
- "Most popular": cut from the 2-hour note, no evidence.
- "Ideal for a quick session", "Long-stay travellers", "Surf-and-stay rate": padding.

## `priceList[]`

14 rows. 12 tours from `offers` group `tuk_tuk`, prices unchanged, unit `flat`. Labels keep the dossier's name and length ("Approx." lower-cased, nested brackets flattened). Each note trims that tour's `note` and `includes`.

Every note was re-read against its card in round 2 (`review.md` F4, N1). Exclusions common to all nine outings, meals and activities, moved to block [4] ¶3: each note is capped at 140, and with them in the row the Turtle Bay, Midigama and Kabalana limits did not fit. Those three limits outrank a repeated exclusion. "Up to 2" and "Private tuk-tuk for up to 2 people" are in no note (contradiction 12).

| Row | Limits and exclusions the note keeps | Left out of the note, and why |
|---|---|---|
| [0] Surf Spot Safari | "potential" | "best", "perfect" (superlatives). No limit on the card is lost. |
| [1] Full Coast Adventure | "potential"; lunch included | "ultimate", "authentic", "hidden gems" (humanizer: a stock phrase with nothing checkable; the card's "local breaks" is written "some of them local breaks"). |
| [2] Sunrise Session | 5:30 AM pickup; it is a breakfast stop, not a breakfast included | "prime", "best", "avoiding crowds", "glassy waves" (claims with no evidence). The pickup is the card's own and earlier than all three sets of hours, so **owner to confirm**. |
| [3] Weligama Bay & Taprobane Island | island seen from the shore; island and other entry fees | Meals, activities: block [4] ¶3. |
| [4] Midigama Reef Breaks | surfing optional, "conditions permitting" (card: "conditions dependent"); not beginner lesson spots; no boards or lessons | Meals, activities: block [4] ¶3. |
| [5] Mirissa Beach & Coconut Tree Hill | no whale-watching boat trip; entry fees | Meals, activities: block [4] ¶3. "Coastal views and photo stops": description, no limit. |
| [6] Ahangama & Kabalana | surfing depends on skill and sea conditions; no boards or lessons | Meals, activities: block [4] ¶3. |
| [7] Secret Beach Mirissa | access may need a walk; swimming depends on the sea and is not guaranteed safe; entry fees | Meals, activities: block [4] ¶3. "Relaxed", photo stops: description, no limit. |
| [8] Turtle Bay & Snake Farm | snake farm optional "if open and available" (card: "subject to opening and availability"); admission separate; wildlife not guaranteed; entry fees; snorkeling | Meals, activities: block [4] ¶3. |
| [9] Handunugoda Tea Estate | estate entry, tours and tastings depend on current visitor arrangements and are not included | Meals, activities: block [4] ¶3. Photo stops: description, no limit. |
| [10] Galle Fort | museum entry | Meals, activities: block [4] ¶3. Coastal photo stops: description, no limit. |
| [11] Hiriketiya Bay | surfing and swimming depend on conditions and ability; boards and lessons (card: "equipment and coaching", "Surfboards, lessons") | Meals, activities: block [4] ¶3. |

2 shop rows: rashguard $12 and reef booties $15 a pair (`offers` group `shop`), both to buy.

## `credentials[]`

| Row | Copy | Rests on |
|---|---|---|
| [0] | ISA Level 1 Surf Instructor · International Surfing Association | `credentials[0]`, on /about |
| [1] | Certified Surf Lifeguard · Sri Lanka Lifesaving | `credentials[1]`, on /about |

Both are self-reported, with no certificate or registry entry found (`.status`, `gaps` credentials). No contradiction touches them. **Judgement call**: playbook §6 allows certifications "only if sourced" and these are sourced to the business's own page, but audit F9 asks that `credentials[]` carry what the owner confirms. Kept; if the copyeditor reads F9 as applying here, set the array to `[]`. **Owner to show the certificates before go-live**, because a safety claim is at stake. Student and year counts are not credentials rows (contradictions 7 and 8).

## `ratings[]`, `testimonials[]`

| Field | Copy | Rests on |
|---|---|---|
| `ratings[0]` | Google 5/5, 13 reviews, captured 2026-11-05, url = the listing | `reviews.google`. **Note**: one of the 13 is the flagged review (`reviews.google.note`). The score is what Google shows and cannot be recalculated, since 8 reviews are not readable. |
| `testimonials[]` (4) | hal starkie, Rossana Encina, samagra singh, Tim St. All `source: google`, `lang: en`, pulled from `reviews.quotes[].text` by script | These are all the usable named reviews. Authors as the dossier has them. Spelling, spacing and the stray closing quotation mark in Rossana's text are the reviewer's and stay (hard constraint 7). |
| `testimonials[].date` | omitted | Google shows only relative dates (`date_as_shown`: hal starkie 7 months ago; Rossana Encina and samagra singh 10 months ago; Tim St 9 months ago; captured 2026-11-05). The schema says omit rather than guess. Playbook §6 asks for a date, so this is a gap. |
| excluded | Dr. Marcel Panzer `quotes[0]` | `do_not_use` |
| excluded | `site_testimonials_unverified` (Anna L., James M., Sofia R.) | `do_not_use` |
| excluded | `site_quoted` (6 texts) | No author, and the schema requires one. Two are on Google under a name and use Google's text here. The site's "1 week ago" dates are wrong (`site_quoted_note`). |

Guest-only claims stay in the quotes and are not stated in the business's voice: patience, standing up in the first session, being put in the best position, progress after seven days (hard constraint 13).

## `contact`

| Field | Copy | Rests on |
|---|---|---|
| `contact.phone` | +94774004422 | `contact.phone.value` |
| `contact.whatsapp` | +94774004422 | `contact.whatsapp.value`. The number is verified, whether it is answered is not (`contact.whatsapp.verified`). |
| `contact.email` | sanjee@sanjee-surf.com | `contact.email.value`; contradiction 4. The business address, not the operator's personal one. |
| `contact.address` | Kadabaddagama, Weligama 81700, Sri Lanka | `location.address.value`, Google's wording with its postcode (hard constraint 9). |
| `contact.mapUrl` | the Google listing link | `location.map_url.value` |

## Each fact once (constraint 10)

| Fact | Where it appears |
|---|---|
| lessons, Weligama, south coast | `tagline` (address in `contact.address` is the postal form) |
| the levels taught | block [0] ¶1 (per-lesson levels in `lessons[].level`, a narrower fact) |
| lessons in English | block [0] ¶2 |
| languages spoken | `languagesSpoken` |
| Sanjee's story | block [1] |
| what all lessons include | block [2] ¶1 |
| what each lesson adds | `lessons[].includes` |
| Week Intensive's 10 days and scheduling | block [2] ¶2 |
| group bookings by message | block [2] ¶3 |
| shop, dry storage | block [3] ¶1 |
| board types and sizes | block [3] ¶2 |
| leash, fins, wax | block [3] ¶3 |
| ID, deposit | block [3] ¶4 |
| tour names and lengths | `priceList[].label`; the three surf tours are also named in block [4] ¶1 to say which they are, with no fact restated |
| outings' pickup and estimated prices | block [4] ¶2 |
| outings exclude meals and activities | block [4] ¶3 |
| price is for the tour, not per person | block [4] ¶4 |
| swim, age rules | block [5] ¶1–2 |
| cash | block [5] ¶3 |
| capture date | block [5] ¶3 |
| other waves | block [6]. Lazy Left and Lazy Right also appear in the Midigama tour's note as stops, and Kabalana in that tour's, without level or break type. |
| Coco Beach as home spot, its character | `spot` (block [3] ¶1 uses the name only to place the shop) |
| season | `season` |
| Google name, plus code, other name | block [7] |
| WhatsApp as the way in, same number for calls | `closing`, plus the button `ctas.primary` |
| rating | `ratings[0]` only |

No line reads as a slogan except the owner's own `featureLine`, which is one short line, not a list. "Surf lessons" is said once on the first screen. No keyword list repeats across tagline, intro and action.

## Tempted and did not write: owner items

- **Hours**: which of 9–5, 6–6 or 06:00–18:30. Also lesson times.
- **Private or group** for the Beginner Lesson, and whether a group price exists.
- **Cancellation**: which policy.
- **Deposit on a lesson**: whether one applies when booking by WhatsApp. And the **rental deposit** amount.
- **Reply time**: whether "within a few hours" holds, and who answers the phone (the button names nobody until then).
- **How many people a tour takes**: 2, or 3 on the half day.
- **Tamil**: whether lessons can be given in it.
- **Experience and students**: any number at all.
- **Who owns and runs the school**: nothing beyond "head instructor".
- **Other instructors**: unnamed (`team[1].gap`). "Experienced, English-speaking instructors" is not used.
- **Card payment**, on the beach or at the shop.
- **Board swaps.**
- **Whether surf tours supply boards**, and whether pickup reaches Mirissa.
- **Other packages**: the FAQ's 3-, 5- and 7-day versions, video analysis.
- **Water temperature**, what to wear.
- **Coconut Beach and Coconut Surf Point**: whether they are Coco Beach, and which end of the bay.
- **Quiver size and brands.**
- **Founding year** (`business.since.gap`). "He's building his own school" is in the flagged review only.
- **Social links**: any account that loads.
- **Attractive lines not used because their only source is flagged**: the empty 6am line-up, cold coconuts at the beach huts.

## Facts available vs words written

About 80 usable facts: 3 lessons, 16 + 1 rental rates, 12 tours, 2 shop items, 6 board types, 3 rental inclusions, 4 levels, 11 waves, the rules, the owner's story, 2 credentials, the Google rating, 4 quotes and the contact lines. They become 8 blocks, 22 paragraphs and 450 words of body, plus 34 priced rows: a fairly long page because the offer is long, with short prose and the rows carrying the numbers. Nothing in the dossier is too thin to build on. The thin parts are the ones the old site contradicts itself on, listed above, and those are pitch points.

## Caps

Read from `schemas/site-content.md` v0.11 this round, measured on the final file.

| Field | Cap | Used |
|---|---|---|
| `copyBlocks` | 8 rows | 8 |
| `copyBlocks[].body` | 1500 | longest 563 |
| `copyBlocks[].heading` | 120 | longest 28 |
| `tagline` / `closing` / `featureLine` | 140 | 58 / 74 / 35 |
| `spot` / `season` | 200 | 131 / 90 |
| `lessons` | 20 rows | 3 |
| `lessons[].includes` | 140 | longest 104 |
| `rentals` | 30 rows | 17 |
| `priceList` | 30 rows | 14 |
| `priceList[].label` / `.note` | 80 / 140 | longest 51 / 139 |
| `credentials` | 8 rows | 2 |
| `testimonials` | 12 rows, 600 chars | 4, longest 310 |

Nothing was dropped from the page for a cap. In round 2 the 140-character note cap did move meals and activities out of the nine outing notes and into block [4] ¶3, where they are stated once.
