# copy review — sanjee-surf-school · en · round 1

Reviewer: copyeditor 0.4.2. I read the runtime prompt in full (940 lines, assembled by `tools/prompt.mjs copyeditor` at 2026-11-05T09:52Z). Run `2026-10-midigama-01` (test, outbound), state `copy_humanised`, 2026-11-05. I am independent of the copywriter (0.5.0) and the humanizer (0.2.1).

Scope: **every sentence and every field** of `copy/en.json`, traced to `dossier/sanjee-surf-school/dossier.json` (harvester 0.5.0, harvested 2026-11-05T08:58Z). I read the dossier's own values and notes, not `sources.md`'s summary of them. `audit.json` and `audit.md` are not a source (hard constraint 2). No `industry.md` exists (outbound run), so there is no research check.

## Verdict: **FAIL** (round 1 of 2)

136 rows: 119 `sourced`, 1 `shared-context`, 7 `framing`, 5 correctly empty, **1 `unsourced`, 3 `contradicted`**. The voice audit is not clean: two sentences go back to the humanizer. The `surf_school` must-haves are covered.

Three of the four fact failures are small and take one edit each. The fourth (F3) is the closest call in the file and can also be settled by a decision on the dossier. Everything else, including the first-person story and both credentials, holds.

## What must change to pass

| # | Field | Exact sentence or value | Verdict | Why | Goes back to |
|---|---|---|---|---|---|
| F1 | `ctas.primary` | "Message Sanjee on WhatsApp" | **unsourced** | Says the number reaches Sanjee. No dossier key says so, and the label's only trace is `audit.recommended.primary_label` (R10) | copywriter |
| F2 | `languagesSpoken` | `"ta"` | **contradicted** | Dropped qualifier: the dossier says "basic Tamil", the field says who you can be served in (R6) | copywriter |
| F3 | `copyBlocks[4].body` ¶3 | "Each tour price covers up to 2 people." | **contradicted** | States one side of `contradictions[12]`, which is open, with no attribution, and is false under the other side for the half-day tour (R7) | copywriter; or the operator records a `resolved` line, and the sentence then stands |
| F4 | `priceList[8].note` S1 | "Coastal stops; snake farm optional, admission paid separately." | **contradicted** | Dropped qualifier: the card says "an optional snake-farm visit, subject to opening and availability" (`offers`, tour_id `turtle-bay-snake-farm-tour`). The limit is gone, so the visit reads as always available | copywriter |
| V1 | `copyBlocks[4].body` ¶1 | "The Surf Spot Safari and the Full Coast Adventure go looking for waves, and so does the Sunrise Session." | voice | A triad with its shape hidden. "And so does" suggests the Sunrise Session differs from the other two, which nothing supports. It winces when read aloud, and it comes from this rewrite | humanizer |
| V2 | `copyBlocks[4].body` ¶2 | "The other nine are outings along the coast and inland, at estimated introductory prices, with pickup and return within Weligama." | voice | Nine of what? The rewrite removed "Three tours", so "other nine" has no noun in reach and the reader has to count. The fact is correct and stays `sourced` | humanizer |

I make no wording suggestions (base.md). Round 2 re-checks the whole file, not only these fields (hard constraint 6).

## Scope check

- **Draft vs final.** `diff` of the normalised `en.draft.json` and `en.json`: `humanizer_version` added, and 8 fields reworded (`copyBlocks` [0], [2], [3], [4], [5], [6], `spot`, `priceList[1].note`), which matches `humanizer-notes.md`. Everything else is byte-identical. Each changed sentence, traced:
  - [0] ¶1: the same four levels.
  - [2] ¶1: the same three items and the same "all lessons" scope. "Rental" stays.
  - [2] ¶2: "Get in touch … we'll work out" is the source's "Contact us beforehand to coordinate". No reply time appears.
  - [3] ¶1, ¶3, ¶4: the same facts. "Wax … and a fresh wax comb" is now closer to the source.
  - [4] ¶1–2: the same tours, hedge and pickup. The word "Three" is lost, which is not a fact but costs clarity (V2).
  - [5] ¶3: two sentences joined, unchanged.
  - [6]: the same spots, levels and break types. "We'd call" is ruled in R3.
  - `spot`: the same facts, closer to the owner's fragment.
  - `priceList[1].note`: ruled in R1.
  - **Nothing checkable appeared during humanizing, and no fact was lost.**
- **Machine checks against the dossier.**
  - All 4 testimonials are byte-identical to `reviews.quotes[].text`, with the same `source`, and none is marked `do_not_use`.
  - All 3 `lessons[]` rows match on label, price, duration, unit and level.
  - All 17 `rentals[]` rows match on price and currency, labels match on the 16 table rows, and every kept note is a substring of its source note.
  - All 12 tour rows and 2 shop rows match `offers` on price and currency.
- **Lengths.** No field is over its cap. Longest body 563, longest note 122, longest `includes` 104, `spot` 131, `season` 90. `sources.md`'s caps table and the humanizer's word and paragraph totals (21 and 431, from 22 and 403) are correct.
- **Things held back.** A text search of `en.json` finds no Marcel, Panzer, founder, Berlin, 150, 500, 2,000, 3,000, "two decades", "eastern", 6am, "within a few hours", Coconut Beach, Channel Islands, 40+, $8, 20%, Instagram, pool, or any number of years. The `do_not_use` review and the three unverified site testimonials are not used, and neither are the facts that come only from them.
- **`sources.md` contradiction table.** All 21 indexes point at the right entries.

## Rulings on the ten open items

The test for an open contradiction is the one from the Global Surf and Cheeky Monkey reviews: if a sentence states one side as fact, without saying whose claim it is, and would be false under the other side, it is `contradicted`.

**R1. `priceList[1].note`, "some of them local breaks": `sourced`. Cutting "hidden gems" is accepted.** "Hidden gems" has nothing checkable in it, so no fact is lost. "Some of them" is not a new frequency. The card says the tour covers "10+ potential surf spots" and visits "local breaks", so at least some of the spots are local breaks; "some" is the least the card entails, and "potential" stays.

**R2. Credentials: `sourced`, keep both. Audit F9 does not exclude them.** Each is a dossier entry with a `source_url` and an issuer, and no contradiction touches them. `claims_unconfirmed` lists students and lessons, not these. F9 is about counts that disagree, and the audit cannot rule a sourced claim in or out anyway (hard constraint 2). Playbook §6 asks for "only if sourced", and they are, while `status` says plainly how weak that source is. **Owner item before go-live: show the certificates**, the lifeguard one above all, since it is a safety claim. Both come from /about, Sanjee's page, so a template must not present them as every instructor's (N5).

**R3. First-person story and "We'd call": `sourced`, with the strongest owner item on the page.** Under `contradictions[20]`, Sanjee can be born in Weligama and teach while someone else is the legal operator, so no sentence is false on either side, and neither sentence says who owns the school. The heading drops "Founder". The trim of "more than two decades" is a trim: it removes one side of `contradictions[7]`, the comma becomes "and", and no age or year remains. "Every single morning" is a frequency, and it has its own source, the owner's words verbatim. "We'd call" sits under "as we rate them" and restates levels the school itself publishes (`surf_spots[].source_url`), and "we" holds under both sides. The exposure is what the words *are*, not what they claim: this puts a named man's first-person voice on a page when `business.owner_voice.note` says "Authorship unknown". **The human needs to see this before any pitch** (`flags_for_operator[0]`). See also V3.

**R4. "30 seconds from the sand": `sourced`, owner item.** It is verbatim from `location.shop.value`, nothing crept closer, and the harvester did not flag it as a contradiction. The dossier does not say the Google pin marks the shop. The rental page gives Coco Beach, Weligama Bay as its address, and the listing gives Kadabaddagama. If the pin is the shop, 105 m takes more than 30 seconds on foot, and `contact.mapUrl` on the same page lets a reader see that, so the owner must confirm. Same treatment as "right next to the beach" (Coconut Surf Inn, N6). No photograph of the shop exists (`location.shop.note`).

**R5. "Cash on the day can be LKR, USD or EUR.": `sourced`.** The source's "remaining balance" limits how much is due on the day, not which currencies are accepted, and the sentence states only the currencies. So nothing is widened, unlike R6. It is true whether or not a deposit applies, and whether or not cards are taken (`contradictions[18]`); "can be" does not say cash only. A reader may still assume the whole price is paid in cash. The page is silent on a deposit because whether one applies over WhatsApp is unknown. **Owner item**, and it should be settled before go-live. Scope note: N6.

**R6. `ta` in `languagesSpoken`: `contradicted` (F2).** The dossier's value is limited ("basic Tamil", `languages_spoken[2].note`). The schema defines the field as "who you can be served in", and the select cannot carry a limit, so the limit is lost and Tamil reads the same as English. That is the base.md rule on dropped qualifiers. Calling it a judgement call in `sources.md`, or asking the template not to imply fluency, does not change what the field says. `en` and `si` are `sourced`.

**R7. Tuk-tuk prices and "up to 2 people": prices `sourced`, the size sentence `contradicted` (F3).** This is the closest call in the file.
- **Prices.** `offers_note` is the harvester's own decision: "Lower prices elsewhere on the site are in contradictions, not here." The copy follows it and dates it, and the owner confirms before go-live (playbook §7). KA Surf Hostel set this precedent (harvester's lean, not silent). $80 and $120 are also not false under the FAQ's "from about $60" and "from about $110", which are floors.
- **Size.** `offers_note` speaks only of prices. The FAQ says a half day takes "up to 3 people". `contradictions[12]` has no `resolved` line, although its neighbours [10] and [13] do, with the same priced-card logic, so the harvester left this one open. The sentence covers all 12 tours flatly with no attribution, and for the half-day tour it is false under the FAQ's side.
- **Harm.** Low: it is narrower than the other side, not wider, and a group of three would simply ask. But the rule has no exception for the safe direction, and `sources.md`'s trace ("a stated choice, per audit F13") leans on the audit.
- **Ways out.** The copywriter changes the sentence, or the operator decides the contradiction in the dossier. Either clears F3.

**R8. Rating with 13 reviews, one of them `do_not_use`: `sourced`.** The row states what Google displays, with platform, count and capture date (playbook §6). The `do_not_use` mark sits on the quote and on the site's 150, not on Google's count, and the score cannot be recalculated because 8 reviews are unreadable. The quote is correctly absent. **For the human at the pitch:** if that reviewer is the legal operator, one of the 13 is not independent. Nothing on the page depends on knowing this.

**R9. `testimonials[].date` omitted: correct, recorded as a gap.** The field takes `YYYY-MM`, and turning "7 months ago" into a month would be a guess. The schema says "omit rather than guess", and playbook §6's date cannot be met from what Google shows. No fail. The rating row carries the capture date, and a template must not invent dates.

**R10. "Message Sanjee on WhatsApp": `unsourced` (F1).** The number is verified as the business's (`contact.whatsapp`), and that is all. `booking.path.note` says "Which channel is actually answered is unverified". No key says Sanjee holds this phone, and the site's own labels ("Reserve on WhatsApp", "Ask on WhatsApp") name nobody. The page presents Sanjee as a person (block [1]), so the button says a person will read the message, which is a claim by implication. With `contradictions[20]` open, that person may not be him. That the number looks plausible, or that the email is `sanjee@`, is not evidence (hard constraint 2: plausible is not sourced), and the audit, the label's only trace, cannot source it. `sources.md` already asks the owner to confirm this and names its own fallback; choosing is the copywriter's job. `closing` ("Send us …") is true under both sides and is not touched.

## Fact audit (whole file, one row per sentence)

### Top-level fields

| # | Field | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | Sanjee Surf School | `business.name.value` (Google, tee); `contradictions[0]`, the other name disclosed in [7] | sourced |
| 2 | `businessType` | surf_school | `business.type.value`, `businessType_note` | sourced |
| 3 | `tagline` | Surf lessons in Weligama, … | `business.type`, `business.description`; `location.address` | sourced |
| 4 | `tagline` | … on the south coast of Sri Lanka. | `location.lat_lng` (5.96 N, 80.40 E). A fact about the place; the words are not in the dossier | shared-context |
| 5 | `closing` | Send us the lesson and date you want on WhatsApp, … | `booking.path`, `contact.whatsapp`. No reply time. "Us" holds under `contradictions[20]` | sourced |
| 6 | `closing` | … or call the same number. | `contact.phone.value` = `contact.whatsapp.value`; `contact.phone.verified` | sourced |
| 7 | `featureLine` | Making waves, one lesson at a time. | `business.tagline.value`, verbatim (V4) | sourced |
| 8 | `ctas.primary` | Message Sanjee on WhatsApp | **none.** `contact.whatsapp` gives the number, not who holds it; `booking.path.note`; trace is `audit.recommended.primary_label` (R10, F1) | **unsourced** |
| 9 | `spot` S1 | Coco Beach is our home spot, a beach break. | `location.spot` (value, `name`), `surf_spots[0]`. "At the eastern end" correctly cut (`contradictions[3]`) | sourced |
| 10 | `spot` S2 | Smaller crowds than the main peak and a friendly, mellow vibe, ideal for first pop-ups. | `location.spot.value`, the business's own comparative, verbatim bar the dash; `surf_spots[0]` level Beginner | sourced |
| 11 | `season` | Best surf season runs November to April; peak swell and dry weather are December–February. | `season.value`, verbatim, the business's words | sourced |
| 12 | `openingHours` | [] | `hours_note.gap`, `contradictions[5]` | correctly empty |
| 13 | `hoursNote` | null | as row 12 | correctly empty |
| 14 | `languagesSpoken` | en, si | `languages_spoken[1]`, `[0]` | sourced |
| 15 | `languagesSpoken` | ta | `languages_spoken[2].note` "basic Tamil"; the limit is dropped (R6, F2) | **contradicted** |
| 16 | `rooms`, `stayInfo`, `amenities`, `brands` | empty | not this type (`businessType_note`); the one amenity is in [3] ¶1 | correctly empty |
| 17 | `bookingLinks` | [] | `booking.engine_url.kind` (no deep link) | correctly empty |

### Copy blocks

| # | Field | Sentence | Dossier key | Verdict |
|---|---|---|---|---|
| 18 | [0] heading | Who we teach | — | framing |
| 19 | [0] ¶1 | You can come to us as a total beginner, a beginner who can already stand up, an intermediate or an advanced surfer. | `levels[0–3]` | sourced |
| 20 | [0] ¶2 | Lessons are in English as standard. | `languages_spoken[1].note` | sourced |
| 21 | [1] heading | Sanjee, head instructor | `team[0]`; "Founder" cut, which narrows | sourced |
| 22 | [1] ¶1 | I was born in Weligama and learned to surf on a broken board my uncle fixed with resin and hope. | `business.owner_voice.value`, trimmed (R3) | sourced |
| 23 | [1] ¶2 | Today I teach surfers from all over the world — and I still paddle out every single morning. | `business.owner_voice.value`, verbatim; the frequency is the source's own (R3, V3) | sourced |
| 24 | [2] heading | Lessons | — | framing |
| 25 | [2] ¶1 S1 | Every lesson includes professional instruction and a beach safety briefing. | `includes[0].value`, "All lessons include" | sourced |
| 26 | [2] ¶1 S2 | Board and rash guard rental is in the price too. | `includes[0].value`; `lessons[2].features` | sourced |
| 27 | [2] ¶2 S1 | The Week Intensive is spread across 10 days, so you can pick your best days. | `lessons[2].description` | sourced |
| 28 | [2] ¶2 S2 | After 2 hours of surfing, your muscles will be happily exhausted. | `lessons[2].description`, verbatim | sourced |
| 29 | [2] ¶2 S3 | Get in touch beforehand and we'll work out which days and times suit you. | `lessons[2].description`, `lessons[2].features` | sourced |
| 30 | [2] ¶3 | For group bookings, please leave us a message. | `lessons[0].note`, verbatim; true on every side of `contradictions[9]` | sourced |
| 31 | [3] heading | Board rental | — | framing |
| 32 | [3] ¶1 S1 | Our shop sits 30 seconds from the sand at Coco Beach, Weligama. | `location.shop.value`, verbatim (R4) | sourced |
| 33 | [3] ¶1 S2 | Free dry storage there while you eat or rest between sessions. | `facilities[0].value` | sourced |
| 34 | [3] ¶2 | We rent soft-top foamies 8'0–9'0, mini-mals 7'2–7'10, mid-lengths and funboards 6'8–7'4, fish and hybrids 5'8–6'4, performance shortboards 5'10–6'2 and longboards 9'0–9'4. | `rental_terms.quiver[0–5]`, each size checked. Count and brands correctly left out (`quiver_size_claim`) | sourced |
| 35 | [3] ¶3 S1 | Each board comes with a leash sized for it (6 ft – 9 ft) and fins fitted to your style (FCS-II or Futures). | `rental_terms.included[0–1]` (N2) | sourced |
| 36 | [3] ¶3 S2 | You also get wax for tropical water and a fresh wax comb. | `rental_terms.included[2]` | sourced |
| 37 | [3] ¶4 S1 | To rent a board we need an ID or passport copy and a refundable deposit. | `rental_terms.id_required`; `contradictions[14]`, both sides refundable (N3) | sourced |
| 38 | [3] ¶4 S2 | Ask us how much it is. | no amount stated; `contradictions[14]` open | framing |
| 39 | [4] heading | By tuk-tuk | `offers` group `tuk_tuk` | framing |
| 40 | [4] ¶1 | The Surf Spot Safari and the Full Coast Adventure go looking for waves, and so does the Sunrise Session. | `offers` tour_id `surf-safari`, `full-coast`, `sunrise-session` (fact holds; voice V1) | sourced |
| 41 | [4] ¶2 | The other nine are outings along the coast and inland, at estimated introductory prices, with pickup and return within Weligama. | The 9 other `tuk_tuk` offers, counted: each has "Pickup and return within Weligama" and "Estimated introductory package price". Inland: tea estate (fact holds; voice V2) | sourced |
| 42 | [4] ¶3 | Each tour price covers up to 2 people. | `offers[].unit`, against open `contradictions[12]` "up to 3 people" (R7, F3) | **contradicted** |
| 43 | [5] heading | Before you book | — | framing |
| 44 | [5] ¶1 | You need to be able to swim at least 50 meters unaided. | `requirements[0]` | sourced |
| 45 | [5] ¶2 S1 | We teach kids from age 6 and up. | `requirements[2]`, verbatim | sourced |
| 46 | [5] ¶2 S2 | Anyone under 18 must be accompanied by a parent or legal guardian. | `requirements[1]`, same limit | sourced |
| 47 | [5] ¶3 S1 | Cash on the day can be LKR, USD or EUR. | `booking.payment_on_the_day` (R5, N6) | sourced |
| 48 | [5] ¶3 S2 | All prices are as of 5 November 2026. | `offers_note` "captured 2026-11-05" | sourced |
| 49 | [6] heading | Other waves, as we rate them | `surf_spots[].source_url` (the school's site) | sourced |
| 50 | [6] ¶1 S1 | Jungle Beach and Weligama Main Point are both beach breaks we'd call beginner waves. | `surf_spots[1]`, `[4]` (R3) | sourced |
| 51 | [6] ¶1 S2 | Mirissa, also a beach break, goes from beginner to intermediate. | `surf_spots[10]` | sourced |
| 52 | [6] ¶2 S1 | For intermediates there's Fishermans (a reef break), Island Point (a point break), Plantation Point (a right-hand reef) and Lazy Left in Midigama, a long left-hand reef. | `surf_spots[2, 3, 5, 6]` | sourced |
| 53 | [6] ¶2 S2 | Lazy Right, also in Midigama, is a right-hand reef that goes from intermediate to advanced. | `surf_spots[7]` | sourced |
| 54 | [6] ¶3 | Ram's Right, a reef break, and Kabalana (The Rock), an A-frame reef, are for advanced surfers. | `surf_spots[8, 9]` | sourced |
| 55 | [7] heading | Finding us | — | framing |
| 56 | [7] S1 | On Google Maps, look for Sanjee Surf School (plus code XC63+4H). | `business.name`, `location.plus_code` (N4) | sourced |
| 57 | [7] S2 | You may also see us as Sanjee Surf. | `business.site_brand` | sourced |

### `lessons[]`

| # | Row | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 58 | [0] | Beginner Lesson · 120 min · first_time, beginner · $40 per_lesson | `lessons[0]`, `offers` | sourced |
| 59 | [0] `groupSize` | null | `contradictions[9]` open (N7) | correctly empty |
| 60 | [0] `includes` | Safety basics and ocean awareness, board handling, paddle and pop-up practice, catching your first waves | `lessons[0].features` | sourced |
| 61 | [1] | Private Coaching · 120 min · beginner, intermediate, advanced · $50 per_lesson | `lessons[1]`, `level_note` | sourced |
| 62 | [1] `groupSize` | One-on-one | `lessons[1].features`; true on every side of `contradictions[9]` | sourced |
| 63 | [1] `includes` | Customized learning pace, flexible scheduling | `lessons[1].features` | sourced |
| 64 | [2] | Week Intensive · 120 min · $160 flat; `level` null | `lessons[2]`, `.note`; level null in the dossier | sourced |
| 65 | [2] `groupSize` | 5 private sessions | `lessons[2].features`, `.note` | sourced |
| 66 | [2] `includes` | Progress tracking, photo/video memories | `lessons[2].features` | sourced |

### `rentals[]`

Prices and labels machine-checked. Each kept note is a substring of its source note. "Most popular", "best value" and "Save 20%" are cut, correctly: the last is wrong for the hardboard, at about 17%.

| # | Row | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 67 | [0] | Soft-top, 1 hour · $5 · Walk-in | `rentals[0]` | sourced |
| 68 | [1] | Hardboard, 1 hour · $7 · Walk-in | `rentals[1]` | sourced |
| 69 | [2] | Soft-top, 2 hours · $8 · One full session | `rentals[2]` | sourced |
| 70 | [3] | Hardboard, 2 hours · $12 · One full session | `rentals[3]` | sourced |
| 71 | [4] | Soft-top, Half day (4 h) · $12 · Dawn or afternoon session | `rentals[4]` | sourced |
| 72 | [5] | Hardboard, Half day (4 h) · $18 · Dawn or afternoon session | `rentals[5]` | sourced |
| 73 | [6] | Soft-top, Full day (24 h) · $15 · Two sessions + sunset | `rentals[6]` | sourced |
| 74 | [7] | Hardboard, Full day (24 h) · $20 · Two sessions + sunset | `rentals[7]`; `contradictions[15]` is about the town, so no conflict | sourced |
| 75 | [8] | Soft-top, 3 days · $36 | `rentals[8]` | sourced |
| 76 | [9] | Hardboard, 3 days · $50 | `rentals[9]` | sourced |
| 77 | [10] | Soft-top, 7 days · $70 | `rentals[10]` | sourced |
| 78 | [11] | Hardboard, 7 days · $95 | `rentals[11]` | sourced |
| 79 | [12] | Soft-top, 14 days · $120 | `rentals[12]` | sourced |
| 80 | [13] | Hardboard, 14 days · $170 | `rentals[13]` | sourced |
| 81 | [14] | Soft-top, Monthly · $220 | `rentals[14]` | sourced |
| 82 | [15] | Hardboard, Monthly · $310 | `rentals[15]` | sourced |
| 83 | [16] | Bodyboard · $5 per_day | `offers`, "Bodyboard rental" | sourced |

### `priceList[]`

All keys are `offers` by tour_id, or group `shop`. Labels keep the dossier's name and length.

| # | Row | Sentence / value | Dossier key | Verdict |
|---|---|---|---|---|
| 84 | [0] | Surf Spot Safari (half day, 4 hours) · $80 | `surf-safari`, `offers_note` (R7) | sourced |
| 85 | [0] note S1 | 5+ potential surf spots around Weligama Bay, chosen for your skill level. | `surf-safari` includes, note | sourced |
| 86 | [0] note S2 | Flexible timing, photo stops. | `surf-safari` includes | sourced |
| 87 | [1] | Full Coast Adventure (full day, 8 hours) · $120 | `full-coast`, `offers_note` (R7) | sourced |
| 88 | [1] note S1 | 10+ potential surf spots, some of them local breaks. | `full-coast` includes, note (R1) | sourced |
| 89 | [1] note S2 | Sri Lankan lunch included. | `full-coast` includes, note | sourced |
| 90 | [2] | Sunrise Session (3 hours) · $60 | `sunrise-session` | sourced |
| 91 | [2] note | 3 spots at dawn, with a 5:30 AM pickup and a breakfast stop. | `sunrise-session` includes, note (N8) | sourced |
| 92 | [3] | Weligama Bay & Taprobane Island (approx. 2 hours) · $15 | `weligama-bay-tour` | sourced |
| 93 | [3] note S1 | Bay viewpoints and photo stops, with the island seen from the shore. | as row 92, includes and note | sourced |
| 94 | [3] note S2 | Island entry, meals and activities not included. | as row 92 | sourced |
| 95 | [4] | Midigama Reef Breaks (approx. 3 hours) · $25 | `midigama-tour` | sourced |
| 96 | [4] note S1 | Lazy Left and Lazy Right viewpoints and beach stops. | as row 95 | sourced |
| 97 | [4] note S2 | Not beginner lesson spots. | as row 95, note | sourced |
| 98 | [4] note S3 | Boards, lessons and meals not included. | as row 95 (N1) | sourced |
| 99 | [5] | Mirissa Beach & Coconut Tree Hill (approx. 4 hours) · $30 | `mirissa-tour` | sourced |
| 100 | [5] note S1 | Beach time and the viewpoint. | as row 99 | sourced |
| 101 | [5] note S2 | No whale-watching boat trip. | as row 99, note | sourced |
| 102 | [5] note S3 | Entry fees, meals and activities not included. | as row 99 | sourced |
| 103 | [6] | Ahangama & Kabalana (approx. 4 hours) · $30 | `kabalana-tour` | sourced |
| 104 | [6] note S1 | Coastal stops, Kabalana Beach and a view of the Rock reef break. | as row 103 | sourced |
| 105 | [6] note S2 | Boards, lessons and meals not included. | as row 103 (N1) | sourced |
| 106 | [7] | Secret Beach Mirissa (approx. 4 hours) · $30 | `secret-beach-tour` | sourced |
| 107 | [7] note S1 | Final access may need a walk. | as row 106, note | sourced |
| 108 | [7] note S2 | Swimming depends on the sea and is not guaranteed safe. | as row 106, note | sourced |
| 109 | [7] note S3 | Entry fees and meals not included. | as row 106 (N1) | sourced |
| 110 | [8] | Turtle Bay & Snake Farm (approx. 4 hours) · $35 | `turtle-bay-snake-farm-tour` | sourced |
| 111 | [8] note S1 | Coastal stops; snake farm optional, admission paid separately. | as row 110, note "subject to opening and availability"; that limit is dropped (F4) | **contradicted** |
| 112 | [8] note S2 | Wildlife not guaranteed. | as row 110, note | sourced |
| 113 | [8] note S3 | Snorkeling and meals not included. | as row 110 (N1) | sourced |
| 114 | [9] | Handunugoda Tea Estate (approx. 4 hours) · $40 | `tea-estate-tour` | sourced |
| 115 | [9] note S1 | Inland through the countryside. | as row 114 | sourced |
| 116 | [9] note S2 | Estate admission, tastings and meals not included. | as row 114 (N1) | sourced |
| 117 | [10] | Galle Fort (approx. 6 hours) · $55 | `galle-fort-tour` | sourced |
| 118 | [10] note S1 | Time on foot on the ramparts and historic streets. | as row 117 | sourced |
| 119 | [10] note S2 | Museum entry and meals not included. | as row 117 (N1) | sourced |
| 120 | [11] | Hiriketiya Bay (approx. 8 hours) · $70 | `hiriketiya-tour` | sourced |
| 121 | [11] note S1 | Beach time and coastal stops. | as row 120 | sourced |
| 122 | [11] note S2 | Surfing depends on conditions and ability; boards, lessons and meals not included. | as row 120 (N1) | sourced |
| 123 | [12] | Rashguard (UV long-sleeve), to buy · $12 | `offers` group `shop` | sourced |
| 124 | [13] | Reef booties, to buy, per pair · $15 | `offers` group `shop` | sourced |

### `credentials[]`, `ratings[]`, `testimonials[]`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 125 | `credentials[0]` | ISA Level 1 Surf Instructor · International Surfing Association | `credentials[0]` (R2, N5) | sourced |
| 126 | `credentials[1]` | Certified Surf Lifeguard · Sri Lanka Lifesaving | `credentials[1]` (R2, N5) | sourced |
| 127 | `ratings[0]` | Google 5/5 · 13 · 2026-11-05 · listing URL | `reviews.google`, `contradictions[6]` resolved (R8) | sourced |
| 128 | `testimonials[0]` | hal starkie | `reviews.quotes[3]`, byte-identical | sourced |
| 129 | `testimonials[1]` | Rossana Encina | `reviews.quotes[4]`, byte-identical (N9) | sourced |
| 130 | `testimonials[2]` | samagra singh | `reviews.quotes[1]`, byte-identical (N9) | sourced |
| 131 | `testimonials[3]` | Tim St | `reviews.quotes[2]`, byte-identical | sourced |

### `contact`

| # | Field | Value | Dossier key | Verdict |
|---|---|---|---|---|
| 132 | `contact.phone` | +94774004422 | `contact.phone.value` | sourced |
| 133 | `contact.whatsapp` | +94774004422 | `contact.whatsapp.value`; number verified, whether it is answered is not | sourced |
| 134 | `contact.email` | sanjee@sanjee-surf.com | `contact.email.value`, `contradictions[4]` resolved | sourced |
| 135 | `contact.address` | Kadabaddagama, Weligama 81700, Sri Lanka | `location.address.value`, `contradictions[1]` resolved, playbook §6 | sourced |
| 136 | `contact.mapUrl` | Google listing link | `location.map_url.value` | sourced |

Totals: 119 sourced, 1 shared-context (4), 7 framing (18, 24, 31, 38, 39, 43, 55), 5 correctly empty (12, 13, 16, 17, 59), **1 unsourced (8), 3 contradicted (15, 42, 111).**

### Notes (not failing)

- **N1. `sources.md`'s `priceList` paragraph is inaccurate.** It says each note "keeps its exclusions and limits". Seven of the nine outing notes drop "activities" from the exclusions, and Turtle Bay also drops "entry fees". Hiriketiya drops "swimming" from "Surfing and swimming depend on conditions and ability". None of these asserts an included activity or that swimming is safe, so no stated fact is widened (compare F4, where one is). Whoever corrects F4 should correct this line too, and the copywriter may want to look at the Hiriketiya swimming limit, since Secret Beach keeps its own.
- **N2. "Each board" ([3] ¶3).** `rentals[]` also lists a bodyboard, which takes no FCS-II or Futures fins. No reader will take it that way, and the source's list sits under its rental terms. No fail.
- **N3. "refundable" ([3] ¶4).** The rental page adds "Returned in full on undamaged check-in"; the FAQ says "refundable" flatly. The sentence uses the word both share, so it stands, with the amount and damage terms left for the owner.
- **N4. "plus code XC63+4H" ([7]).** The dossier's value is "XC63+4H Weligama, Sri Lanka". A short plus code generally needs its town to resolve for someone searching from elsewhere. It is a usability point, not a false fact; the copywriter or designer should test it.
- **N5. Holder of the credentials and languages.** Both lists come from /about, Sanjee's own page, and other instructors are unnamed (`team[1].gap`). The schema has no holder field. The designer must place `credentials[]` with Sanjee and must not imply they cover every instructor; doing so would widen the fact.
- **N6. Scope of the cash sentence.** The source is about the balance of a booked lesson or tour, while the rental page says "All prices in USD, cash (LKR equivalent) or card". [5] sits under "Before you book", so it reads as about bookings and is not false for rentals, but it does not say so. Part of the owner's card and payment decision (`contradictions[18]`).
- **N7. Beginner Lesson's blank `groupSize`** beside Private Coaching's "One-on-one" could suggest the first is a group lesson. Nothing states it, and the blank is the correct holding position on `contradictions[9]`. The owner must settle it before go-live.
- **N8. "5:30 AM pickup"** is the card's own, earlier than all three sets of hours in `contradictions[5]`. Those are opening hours, so it is not a conflict. Owner to confirm.
- **N9. Verbatim oddities.** Rossana's quote ends in a stray closing quotation mark, and samagra's has double spaces and "Id". They stay (schema: never edited). The template must not add its own quotation marks in a way that doubles Rossana's.
- **N10. `openingHours: []`.** `sources.md`'s designer warning stands: a template must show no hours, not a week of "closed".

## Voice audit (per section)

| Section | Rhythm | Triads | Padding | Concrete | Reads aloud | Note |
|---|---|---|---|---|---|---|
| tagline / closing / CTA | ✓ | ✓ | ✓ | ✓ | ✓ | the closing is a real instruction |
| featureLine | ✓ | ✓ | ~ | ~ | ~ | V4 (owner's slogan) |
| Who we teach | ✓ | ✓ (four levels, data) | ✓ | ✓ | ~ | "You can come to us as … an intermediate" is a little stiff; not a fail |
| Sanjee, head instructor | ✓ | ✓ | ✓ | ✓ broken board, resin | ~ | V3 |
| Lessons | ✓ | ✓ | ~ ("professional instruction", the source's) | ✓ | ✓ | "happily exhausted" is the owner's and earns its place |
| Board rental | ✓ | ✓ | ✓ | ✓ sizes, fin systems | ✓ | "Ask us how much it is." is clumsy but honest |
| By tuk-tuk | ✓ | ✗ V1 | ✓ | ~ | ✗ | V1, V2: both introduced by this rewrite |
| Before you book | ✓ | ✓ | ✓ | ✓ | ~ | "Cash on the day can be LKR, USD or EUR." is telegraphic; acceptable as a rule |
| Other waves | ✓ | ✓ | ✓ | ✓ | ✓ | parentheses vary the list well |
| Finding us | ✓ | ✓ | ✓ | ✓ | ✓ | |
| spot / season | ✓ | ✓ | ~ ("vibe", the owner's) | ✓ | ✓ | "the main peak" has no bay in reach now; it is the owner's phrase |
| rentals / tour notes | ✓ (repetition is deliberate, so rows compare) | — | ✓ | ✓ | ✓ | |

- **V1, V2.** Fail, listed above. Both go back to the humanizer.
- **V3. [1] ¶2** "Today I teach surfers from all over the world — and I still paddle out every single morning." reads as polished marketing copy, as does "resin and hope", and the old site is built with Lovable and carries generated-looking art (`existing_site`). The sentence is verbatim, so it is not the humanizer's to change, and I do not fail it. Whether a man from Weligama recognises this as his own voice is the owner question in R3.
- **V4. `featureLine`** "Making waves, one lesson at a time." is a stock slogan shape. It is the owner's footer line, verbatim, and the only slogan on the page. Taste, for the owner.
- **Honest limits:** plenty, and plain: the 50 m swim, no group price, the deposit, "not guaranteed safe", "Wildlife not guaranteed", "Not beginner lesson spots", estimated prices.
- **Padding in our own sentences:** none ("nestled", "vibrant", "boasts", "unforgettable", "discover", "whether you're…" are absent).
- **Register:** plain, with the owner's warmer lines where he speaks. "We", "I" and "Sanjee" all appear, which is fine under the block's heading.
- **Locale:** English only, in its own cadence.

Voice score: **6 / 8 criteria met; 7 / 10.** Triads and reads-aloud both fail, on block [4] only. The other six criteria (rhythm, padding, concrete nouns, honest limit, register, locale) hold across the page.

## Completeness (`surf_school`)

Must-haves:
- `contact` ✓ (phone and WhatsApp, same number, plus email).
- `lessons[]` ✓ (3).
- ≥ 3 photos is outside the copy (the dossier records 20 business-owned images and a quality warning).
- Core: `businessName` ✓, what, where and offer ✓.

Should-haves:
- `credentials[]` ✓ (2).
- Levels via `lessons[].level` ✓, with the Week Intensive null as in the dossier.
- `spot` ✓, `testimonials[]` ✓ (4, all the usable named reviews).
- `openingHours[]` is empty with a stated reason.

Deliberately empty, each with a stated reason: `openingHours`, `hoursNote`, `bookingLinks`, Beginner `groupSize`, `testimonials[].date` (R9). Not this type: `rooms`, `stayInfo`, `amenities`, `brands`.

Nothing is padded (431 words of body). `sources.md`'s "Each fact once" table holds, with no duplicate fact across blocks. Lazy Left, Lazy Right and Kabalana recur as tour stops without level or break type, and the three surf tours are named in [4] ¶1 only to say which they are.

## Owner items (not copy failures)

- **Who runs the business, who wrote the story, and who holds the phone** (R3, R10). For the human before any pitch.
- **Certificates**, the lifeguard one first (R2).
- **The Google review by the legal operator's namesake** (R8).
- **Whether a deposit applies over WhatsApp**, and card payment (R5, N6).
- **The shop:** that it exists where stated, and "30 seconds" against the 105 m pin (R4).
- **Tuk-tuk size and prices** (R7); private or group for the Beginner Lesson (N7); 5:30 AM pickup (N8).
- **Hours, cancellation, rental deposit amount, board swaps, experience and student numbers, whether WhatsApp is answered.** Correctly left off the page; all as `sources.md` lists them.

## For the operator (dossier, not changed by me)

- **`contradictions[12]`** has no `resolved` line, while [10] and [13] do. `offers_note` covers its prices only. A decision on the size would clear F3.
- **`gaps` `location.shop`** says "a shop on the sand", while `location.shop.value` says "30 seconds from the sand". The 105 m pin appears only inside `contradictions[2]`, and the harvester never set it against the shop claim. Worth a line, since it bears on R4.

## Not checked

- Judged against the dossier only. I did not re-fetch sanjee-surf.com or Google, so anything the harvester misread would pass here.
- I did not open the photographs. I searched `images[]` descriptions for a shop and read the pool's flag. No sentence rests on an image.
- WhatsApp, phone and email untested (test mode, no contact).
- Rendering: the template's handling of `ctas`, empty hours and `\n` is not a copy question.

## Verdict: **FAIL** (round 1, full-file check)

1 `unsourced` (F1), 3 `contradicted` (F2, F3, F4), 2 voice (V1, V2). Required fields are covered. The closest calls for the human are F3 (tuk-tuk size, low harm, and a dossier decision would clear it) and R3 (the first-person story, which stands as `sourced` but whose authorship is unknown).

Ledger line due (not written by me): `copy_humanised → copy_failed`, note "round 1 FAIL (copyeditor 0.4.2): 136 rows, 119 sourced / 1 shared-context / 7 framing / 5 correctly empty, 1 unsourced (ctas.primary), 3 contradicted (languagesSpoken ta; [4] ¶3 up to 2 people; priceList[8].note snake farm), 2 voice ([4] ¶1, ¶2); draft→final diff clean, testimonials machine-checked verbatim".
