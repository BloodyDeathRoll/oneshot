# copy review — layday-surf-ahangama · en · round 1

Reviewer: copyeditor 0.1.0. Independent of the copywriter and humanizer.

## Fact audit
Every sentence asserting anything was traced to `dossier/layday-surf-ahangama/dossier.json`.

| Verdict | Count | Notes |
|---|---|---|
| `sourced` | all factual claims | room types, amenities, distances, ratings, check-in windows and contact details each map to a dossier field — see `copy/sources.md`, line by line |
| `shared-context` | 1 | the Kabalana spot description, carried from a third-party surf guide and written as a description of the wave, never attributed to the business |
| `framing` | the narrative sentences | atmosphere around sourced facts, asserting nothing new |
| `unsourced` | **0** | |
| `contradicted` | **0** | every flagged contradiction in the dossier is left unwritten — see "Deliberately not written" in `copy/sources.md` |

Machine checks run over the copy and the dossier together: all testimonials verbatim, all ratings matching platform + score + count, all room labels traced, phone numbers matching, no prices in body copy, no padding phrases from the humanizer's tell list.

## Voice audit
Sentence length varies · no triads · no "nestled / unforgettable / vibrant / whether you're a…" · concrete nouns over category words · at least one honest limit stated · register matches the business.

## Completeness
Required `beach_lodging` fields for this business are filled or deliberately empty with a stated reason.

## Verdict: **PASS** (round 1)

## round 2 — full-file re-check after the 4a rewrite and the 4b re-voice, 2026-09-23

Reviewer: copyeditor 0.3.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, every layer read). Independent of the copywriter and humanizer. Trigger: the copywriter rewrote the file under the no-framing-exemptions rule (ledger 08:45:50Z, 0.3.0), set the address under the refined rule (08:46:43Z, 0.3.1), and the humanizer re-voiced all six `copyBlocks[].body` (08:48:46Z). Rules applied: hard constraint 6 (every sentence of the whole file, not only the changed ones); a verbatim guest observation of a physical fact is a source, never for a ranking, a frequency or a cause; no framing exemptions (`framing` only for headings that assert nothing); guests' words stated in the business's voice are `unsourced` unless they are a physical fact.

### Scope check
- `en.draft.json` (copywriter) vs `en.json` (humanizer), by JSON diff: the six `copyBlocks[].body` differ, `humanizer_version` null → 0.2.0, and `ratings[1].score` 10.0 → 10 and `ratings[2].score` 5.0 → 5. The two scores are equal in value, so no fact changed, but `humanizer-notes.md` calls ratings "byte-identical", which is not true to the byte. Headings, tagline, spot, rooms, stayInfo, amenities, testimonials, contact and bookingLinks are identical.
- What the humanizer did to facts, clause by clause:
  - Appeared: nothing new. "Layday is small and new, with…" (subject added); "It is one dorm and a garden, owned by a family" (the draft said "the family who own it", so ownership was already there); "It is quiet, too" ("too" is linking only); "One guest wrote…, another…, a third…" (it attributes each quote to a guest and adds no count); "though that is from ten reviews" (the same count); "stayed on longer than they had planned" (the draft said "meant to"); "Credit cards are not accepted" (the draft said "the property does not take credit cards"); "pets can come" (the draft said "allowed").
  - Vanished: nothing. All six facilities and pets are still in `copyBlocks[5]`, and laundry is still not called free.
  - Strengthened: nothing. No claim got a quantity, frequency, superlative or condition. The ownership sentence reads more like a flat statement of fact than the draft's fragment did, but it was already in the draft as a claim (row 9).
- Compared with round 1 (commit 893160d): the 4a rewrite removed "about as close to the wave as you can sleep", "a family who built the place and still run it", "Guests keep saying so", "that is deliberate", "Everyone who writes… lands on the same two words", "It is also a perfect one", "all of it is new", "which is the sentence this place earns most often", "a wardrobe", "everything you need to cook", "Rates move with the season", "Guests have got lost here", "Non-smoking throughout" and "if you want one". None of them is back. Round 1 was summary-level and passed each of them, and most would fail today's rules. **Round 1's PASS does not stand.**

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "Layday Surf Ahangama" | `business.name` (Booking.com) | sourced |
| 2 | `tagline` | "Surf, chill and feel at home in Ahangama" | `business.tagline` "Surf, Chill & Feel at Home in Ahangama" (the owner's Hostelworld headline); only case and "&" changed | sourced |
| — | `languagesSpoken` | `[]` | `languages_spoken` is empty | no claim (correctly empty) |
| 3 | `copyBlocks[0].heading` | "A two-minute walk from Kabalana" | `location.distance_to_beach` "guests say a 2-minute walk"; `reviews.quotes[7]` Beth "just a 2-min walk to Kabalana Beach". Distance is a physical fact | sourced |
| 4 | `copyBlocks[0].body` S1a | "Layday is small" | `reviews.quotes[0]` Taiya "It's a tiny place", `[1]` "quite small" (physical) | sourced |
| 5 | `copyBlocks[0].body` S1b | "and new" | `reviews.quotes[7]` Beth "Newly built", `[4]` Akshay "New and clean", `[3]` Alina "new and comfy" (this is the rule's own example) | sourced |
| 6 | `copyBlocks[0].body` S1c | "with Kabalana Beach a few steps away" | `location.distance_to_beach` "Kabalana Beach is a few steps away" (Booking.com) | sourced |
| 7 | `copyBlocks[0].body` S2a | "It is one dorm" | `reviews.quotes[5]` Catherine "just one dorm room" (physical); `room_types[0]` (one type). No bed count, so `contradictions[0]` is not resolved | sourced (see note N1) |
| 8 | `copyBlocks[0].body` S2b | "and a garden" | `facilities[7]` "garden and terrace with outdoor dining" | sourced |
| 9 | `copyBlocks[0].body` S2c | "**owned by a family**" | `business.run_by` "Rukshan and his family", note "named by a guest review on Hostelworld, not by the business; **unconfirmed**"; `reviews.quotes[6]` Jennine "The lovely family who own this". Who owns a business is not a physical fact a guest can observe, and the harvester marks it unconfirmed. `sources.md` keeps Rukshan's name out of the business's voice on this same ground, yet states the ownership in it | **unsourced** (guest words in the business's voice; not a physical fact) |
| 10 | `copyBlocks[0].body` S3 | "It is quiet, too." | `reviews.quotes[5]` Catherine "it is very quiet which was amazing". Quiet is a physical condition, quoted in the next sentence; her cause ("one dorm room … so") is not stated | sourced |
| 11 | `copyBlocks[0].body` S4 | "One guest called it "very quiet which was amazing"." | `reviews.quotes[5]`, verbatim | sourced |
| 12 | `copyBlocks[1].heading` | "Just one dorm" | `reviews.quotes[5]` "just one dorm room"; `room_types[0]` | sourced |
| 13 | `copyBlocks[1].body` S1 | "There is only the one dormitory." | same as row 12 | sourced |
| 14 | `copyBlocks[1].body` S2 | "One guest wrote "super clean", another "very clean", a third "absolutely spotless"." | `reviews.quotes[6]` Jennine "Super clean", `[5]` Catherine "very clean", `[7]` Beth "absolutely spotless": three different guests, and no count or frequency is claimed. "super clean" in lower case is also verbatim in `[0]` Taiya and `[2]` Nas | sourced (voice fail V1) |
| 15 | `copyBlocks[1].body` S3a | "On Hostelworld it scores 10 out of 10 in every category (value for money, security, atmosphere, cleanliness, staff, location and facilities)" | `reviews.hostelworld.categories`: all seven are 10.0, and there are exactly seven. The overall 9.8 is not called perfect | sourced |
| 16 | `copyBlocks[1].body` S3b | "though that is from ten reviews" | `reviews.hostelworld.count` 10 | sourced |
| 17 | `copyBlocks[2].heading` a | "Newly built" | `reviews.quotes[7]` Beth "Newly built" (physical) | sourced |
| 18 | `copyBlocks[2].heading` b | "and kept that way" | `facilities[15]` "daily housekeeping" (Booking.com); `reviews.quotes[7]` "he keeps it immaculate daily" | sourced (the ongoing claim rests on the platform's key, not on the guest's "daily") |
| 19 | `copyBlocks[2].body` S1 | "There is housekeeping every day." | `facilities[15]` "daily housekeeping" | sourced |
| 20 | `copyBlocks[2].body` S2 | "One guest called the beds "super comfy" and the showers "amazing"." | `reviews.quotes[7]` Beth "Super comfy beds", "amazing showers". Attributed, one guest | sourced |
| 21 | `copyBlocks[2].body` S3a | "Two wrote that they stayed on longer than they had planned" | `[7]` Beth "I extended my stay way longer than expected"; `[0]` Taiya "I was only supposed to stay a night and just kept expecting and ended up here a week". The count of two is exact and the claim is reported speech, attributed | sourced |
| 22 | `copyBlocks[2].body` S3b | "and one was only supposed to stay a night and "ended up here a week"." | `[0]` Taiya, verbatim, before Booking's truncation | sourced |
| 23 | `copyBlocks[3].heading` | "The room" | labels the block | framing |
| 24 | `copyBlocks[3].body` S1a | "One air-conditioned dormitory" | `room_types[0]`; `facilities[8]` "air conditioning"; `[5]` Catherine "just one dorm room" | sourced |
| 25 | `copyBlocks[3].body` S1b | "with lockers, luggage storage and hot showers" | `facilities[12]` "lockers", `[20]` "free security lockers", `[14]` "baggage storage", `[24]` "hot showers" | sourced (see note N2) |
| 26 | `copyBlocks[3].body` S2a | "The shared kitchen has a kettle, a dishwasher and kitchenware" | `facilities[5]` "shared kitchen with kitchenette, dishwasher, kettle and kitchenware" | sourced |
| 27 | `copyBlocks[3].body` S2b | "and there is a dining area as well as the terrace and the garden" | `facilities[6]` "dining area and seating area"; `[7]` "garden and terrace with outdoor dining" | sourced |
| 28 | `copyBlocks[3].body` S3 | "Rates change with the dates." | `booking.path.note` "live inventory on Booking.com, Hostelworld and Agoda"; `gaps[]` "offers". No season claim | sourced |
| 29 | `copyBlocks[3].body` S4 | "The booking links show what is available." | `booking.path.note`; `booking.engine_url`; `booking.other_engines` | sourced |
| 30 | `copyBlocks[4].heading` | "Finding the door" | labels the block | framing |
| 31 | `copyBlocks[4].body` S1 | "One guest found it "a little bit difficult to find", so here is the way in." | `reviews.quotes[5]` Catherine "A little bit difficult to find" (only the case changed) | sourced |
| 32 | `copyBlocks[4].body` S2 | "Follow Google Maps." | `location.finding_it` "Follow Google Maps"; the pin agrees across Google, Booking and Hostelworld (`location.lat_lng.note`) | sourced |
| 33 | `copyBlocks[4].body` S3 | "You will come to a large black gate; open it." | `location.finding_it` "there is a large black gate that you need to open" (a guest's physical route) | sourced |
| 34 | `copyBlocks[4].body` S4 | "Through the gate there is a wooden platform with a door through to the Layday area, to the right of the house." | `location.finding_it` "once through the gate there is a wooden platform with a door through to the Layday Surf area to the right of the house". The order and the ambiguity are both kept, and the promised sign is not written | sourced |
| 35 | `copyBlocks[5].heading` | "Practicalities" | labels the block | framing |
| 36 | `copyBlocks[5].body` S1 | "Check-in is between 14:00 and 19:00, and check-out is by 14:00." | `stayInfo.checkInFrom/To/checkOutTo`; `hours_note` | sourced |
| 37 | `copyBlocks[5].body` S2 | "Credit cards are not accepted." | `stayInfo.note` "Credit cards not accepted" | sourced |
| 38 | `copyBlocks[5].body` S3a | "Taxes are included" | `stayInfo.note` "taxes included" | sourced |
| 39 | `copyBlocks[5].body` S3b | "and it is non-smoking." | `stayInfo.note` "non-smoking" (Hostelworld); `facilities[4]` "non-smoking rooms" | sourced |
| 40 | `copyBlocks[5].body` S4 | "WiFi is free, and so is the private parking." | `facilities[0]` "free WiFi (all areas)"; `[1]` "free private parking" | sourced |
| 41 | `copyBlocks[5].body` S5a | "There is laundry, daily housekeeping, bicycles to rent and an airport shuttle" | `facilities[16]` (additional charge, and not called free), `[15]`, `[17]` (additional charge), `[2]` | sourced |
| 42 | `copyBlocks[5].body` S5b | "and pets can come at no extra charge." | `facilities[19]` "pets allowed, no extra charge" | sourced |
| 43 | `spot` | "Kabalana: a sandy beach break for beginners and intermediates" | `location.spot` (thesurfatlas.com, third party), written about the wave | shared-context |
| 44 | `spot` | "with The Rock, a reef A-frame for advanced surfers." | `location.spot` "with The Rock reef A-frame for advanced surfers"; no swell condition added | shared-context |
| — | `season` | `null` | `season.value` null; `gaps[]` "season" | no claim (correctly empty) |
| 45 | `rooms[0].label` | "Bed in the dormitory" | `room_types[0]` "Single Bed in 6-Bed Dormitory Room". No bed count (`contradictions[0]`) | sourced |
| 46 | `rooms[0].note` | "The only room: one air-conditioned dormitory" | `reviews.quotes[5]` "just one dorm room" (physical); `room_types[0]`; `facilities[8]` | sourced |
| 47 | `stayInfo` times | 14:00–19:00, out by 14:00 | `stayInfo.checkInFrom` 14:00, `checkInTo` 19:00, `checkOutTo` 14:00 (Hostelworld) | sourced |
| 48–51 | `stayInfo.note` | "Credit cards are not accepted." · "Non-smoking." · "Taxes included." · "Reception has limited hours." | `stayInfo.note` ×3; `hours_note` "Reception has limited hours" | sourced ×4 |
| 52–70 | `amenities[0–18]` | Free WiFi · Free private parking (no reservation needed) · Air conditioning · Shared kitchen with dishwasher, kettle and kitchenware · Dining area and seating area · Garden and terrace with outdoor dining · Hot showers · Free security lockers · Luggage storage · Daily housekeeping · Washing machine · Laundry, dry cleaning and ironing (additional charge) · Bicycle rental (additional charge) · Airport shuttle · Concierge · Free city maps · 24-hour security, CCTV and key access · Safety deposit box · Pets allowed (no extra charge) | `facilities[0]`, `[1]`, `[8]`, `[5]`, `[6]`, `[7]`, `[24]`, `[20]`, `[14]`, `[15]`, `[23]`, `[16]`, `[17]`, `[2]`, `[13]`, `[21]`, `[18]`, `[18]`, `[19]`, each re-read at its index. Each charge note is kept, and no row calls a charged service free | sourced ×19 |
| 71–73 | `ratings[0–2]` | Hostelworld 9.8/10 (10) · Booking.com 10/10 (6) · Google 5/5 (15) | `reviews.hostelworld`, `reviews.booking`, `reviews.google`. Each carries its platform, scale and count, and none is averaged (`contradictions[1]`). The two URLs equal the `source_url`s, and no URL is written for Google | sourced ×3 |
| 74–78 | `testimonials[0–4]` | Beth (hostelworld, 2026-04) · Jennine (hostelworld, 2026-04) · Catherine (hostelworld, 2026-04) · Akshay (booking) · Taiya (booking) | `reviews.quotes[7, 6, 5, 4, 1]`: string-equality check by script, **5/5 verbatim**. The platform comes from each `source_url`, the dates are equal, and none is invented. Catherine's "4 bunk beds" and Jennine's "the best hostel" stay in the guests' own words | sourced ×5 |
| 79 | `contact.phone` | "+94778553343" | `contact.phone` (Google); E.164 valid | sourced |
| 80 | `contact.address` | "Warnagiri Welhengoda, Ahangama 80650, Sri Lanka" | `location.address.value` "Warnagiri welhengoda, Ahangama 80650, Sri Lanka" (Google listing, fetched 2026-09-23). Google carries the postcode, so no other platform is needed. "welhengoda" → "Welhengoda" is the only change (playbook 0.5.1 §6 refinement 2), the order is street, town postcode, country, and `address_other_platforms[]` is not used | sourced |
| 81–83 | `bookingLinks[0–2]` | "Check dates on Hostelworld / Booking.com / Agoda" + URLs | `booking.other_engines[0]`, `booking.engine_url`, `booking.other_engines[1]`, character-identical, all `https://` | sourced ×3 |

**Counts (83 claim rows):** `sourced` 77 · `shared-context` 2 · `framing` 3 (headings only) · **`unsourced` 1** · **`contradicted` 0**.

No recorded contradiction is resolved silently. The bed count (`contradictions[0]`) is not written in the business's voice; it appears only inside Catherine's verbatim quote. Ratings are shown per platform, never averaged.

Notes (not fails):
- **N1** (row 7, copywriter): "It is one dorm and a garden" reads as a complete description of the property, while the dossier also holds a shared kitchen, a dining area and a terrace (the same file lists them in `copyBlocks[3]`). This understates and adds nothing, so it is not a fail.
- **N2** (row 25, copywriter): "One air-conditioned dormitory, with … hot showers" hangs the showers on the dormitory, which can read as en-suite. The dossier says `facilities[11]` "shared bathroom", and the copy does not mention it anywhere. Nothing is asserted that the dossier contradicts; this is a reading risk.
- **N3** (intro, copywriter): the heading gives "a two-minute walk" and the body "a few steps away". Both are sourced, from guests and from Booking.com, but they sit in one block as two different distances.

### Failing sentences

| # | Field | Sentence (fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 9 | `copyBlocks[0].body` | "It is one dorm and a garden, **owned by a family**." | unsourced. Ownership comes only from a guest (`reviews.quotes[6]` Jennine), and `business.run_by` is marked "unconfirmed". It is not a physical fact, so the guest-observation rule does not cover it. The draft carried it too ("the family who own it"), so the 4a self-check missed it rather than 4b adding it | copywriter |
| V1 | `copyBlocks[1].body` | "**One guest wrote "super clean", another "very clean", a third "absolutely spotless"**." | voice: a triad. The humanizer broke up the draft's three-quote colon list, but this is the same rule of three in a one / another / a third shape, and it reads as generated | humanizer |

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | the owner's own headline | yes | yes | — | owner's | yes | clean (owner's words) |
| `copyBlocks[0]` intro | three of four sentences open "Layday is / It is / It is" | yes | "too" in "It is quiet, too" only links | thin: noted by the humanizer, and the dossier has nothing more the copy may use | — | yes | yes | 6/8, notes only |
| `copyBlocks[1]` dorm | yes | **no**: "one guest… another… a third" (V1) | yes | yes | yes ("though that is from ten reviews") | yes | yes | **7/8, fail (V1)** |
| `copyBlocks[2]` kept | yes | yes | yes | yes | — | yes | yes | 8/8 |
| `copyBlocks[3]` room | three lists in two sentences ("lockers, luggage storage and hot showers"; "a kettle, a dishwasher and kitchenware"; "a dining area as well as the terrace and the garden") | inventory lists, not rhetorical triads (KA precedent, rounds 7–8) | yes | yes | yes (no prices) | yes | yes | 7/8, notes only |
| `copyBlocks[4]` door | yes (imperative, short, long) | yes | yes | yes | yes ("a little bit difficult to find") | yes | yes | 8/8 |
| `copyBlocks[5]` practicalities | "Taxes are included, and it is non-smoking" joins two unrelated facts with "and"; the last sentence runs four items and then adds pets with a second "and" | yes | yes | yes | yes (no credit cards) | listing register | yes | 7/8, notes only |
| `spot` | single sentence | yes | yes | yes | yes (The Rock is for advanced surfers) | surf-guide | yes | clean |

One voice fail (V1). The humanizer's notes on the other blocks are advisory.

### Completeness (`beach_lodging`)
Must-haves that are copy fields: `rooms[]` (1 row) and `bookingLinks[]` (3 rows) are filled; photos are not a copy field. Should-haves: `stayInfo`, `amenities[]` (19), `ratings[]` (3), `testimonials[]` (5) and `spot` are filled. `season` is `null` because the dossier has a gap there. Nothing is padded.

Schema limits, checked by script: every heading, body, label, note and address is within its limit (longest body 300 of 1500; longest amenity label 54 of 60). `contact.phone` matches E.164, every URL is `https://`, and every slot is in the enum.

Open items, not copy fails:
- `contact.whatsapp` is absent (dossier gap). The schema requires it, so it stays open for the Payload seed.
- `ratings[].capturedAt` is absent on all three rows. Schema v0.4 requires it, and `sources.md` leaves it to the deployer (2026-09-19).
- `contact.mapUrl` is absent, although the dossier holds `location.map_url` and `copyBlocks[4]` tells the guest to "Follow Google Maps". It is optional in the schema; this is for the copywriter to decide.
- `businessType` is absent (the deployer seeds "beach_lodging"). The optional `closing` is empty.
- **Versions:** `en.json` and `en.draft.json` both say `copywriter_version` "0.3.0", and the `sources.md` header says 0.3.0. The address pass ran under 0.3.1 (ledger 08:46:43Z), and `run.yaml` pins 0.3.1. The file does not record the version that last wrote it. Separately, `dossier.json` still says `harvester_version` "0.2.0" after the 0.3.0 field-scoped harvest (ledger 08:42:00Z). Its `location.address.note` says "Google's lowercase 'welhengoda' is kept as shown", which was written under playbook 0.5.0 and has been superseded by 0.5.1's capitalisation rule. The copy follows 0.5.1 correctly.

### Duplication across fields (notes, as instructed)
- **One dorm**: five times. Intro S2, the `copyBlocks[1]` heading and S1, `copyBlocks[3]` S1, and `rooms[0].note`.
- **Daily housekeeping**: in two prose blocks (`copyBlocks[2]` S1 and `copyBlocks[5]` S5), in the `copyBlocks[2]` heading, and as `amenities[9]`.
- **Garden**: intro, `copyBlocks[3]`, `amenities[5]`.
- Check-in/out, credit cards, taxes, non-smoking: `copyBlocks[5]` ¶1 vs `stayInfo` + `stayInfo.note`.
- WiFi, parking, laundry, bicycles, shuttle, pets: `copyBlocks[5]` ¶2 vs `amenities[]`.
- A/C, lockers, luggage, hot showers, kitchen, dining: `copyBlocks[3]` vs `amenities[]`.
- Guest quotes: each one quoted in the body is also in the testimonials (Beth ×3, Catherine ×3, Jennine ×1). Taiya's "ended up here a week" is from `quotes[0]`, which is not a testimonial.

### `sources.md` rows checked against the dossier
Method: every double-quoted string in the "Rests on" column and in "Deliberately not written" was extracted by script and searched in `dossier.json`, with "…" treated as an elision. Every `facilities[n]`, `reviews.quotes[n]`, `room_types[n]` and `contradictions[n]` citation was then checked by hand against the value at that index. Result: **every quoted string was found**. The only miss was "one dormitory", which quotes the copy, not the dossier. **All indexed citations resolve to the value they claim.**

| Row | Result |
|---|---|
| businessName, tagline, intro heading, intro ¶1 S1, intro ¶2 | Accurate |
| **intro ¶1 S2** | Resolves (Jennine's "The lovely family who own this" is at `reviews.quotes[6]`), but **the ground is wrong**. It rests an ownership claim in the business's voice on one guest's words, while `business.run_by` says "unconfirmed" and the "No staff names" bullet refuses the same guest-only source for Rukshan's name. The row also still paraphrases the draft ("the family who own it"), not the final text ("owned by a family") |
| about (dorm) heading, ¶1, ¶2 | Accurate. It cites Jennine's "Super clean" with a capital S; the copy's lower-case "super clean" is verbatim in `[0]` Taiya and `[2]` Nas. The seven categories and the count of ten match |
| about (kept) heading, ¶1 S1–S3 | Accurate. Taiya's elided quote matches `[0]` before the truncation |
| offer heading, ¶1 S1–S2, ¶2 | Accurate. The Paragraph column still says "rates move with the dates"; the final text says "change". That column is a paraphrase, so this is not a fault |
| info (door) heading, ¶1 S1, S2–S4 | Accurate. The `finding_it` quote is character-exact |
| info (practical) heading, ¶1, ¶2 | Accurate |
| spot, season, rooms[0], stayInfo | Accurate. `contradictions[0]` is cited correctly |
| amenities[0–18] | Accurate. All 19 indexes resolve, including `[18]` twice (security row, safety deposit box) |
| ratings, testimonials | Accurate. The quote indexes `[7, 6, 5, 4, 1]` are right, and `capturedAt` is left to the deployer, as stated |
| contact.phone, contact.address, contact.whatsapp | Accurate. The address row cites base.md constraint 9 (copywriter 0.3.1) and playbook §6, and it quotes Google's string exactly |
| bookingLinks, languagesSpoken | Accurate |
| Deliberately not written (bed count, price, season, reception, wardrobe, staff names, sign, languages) | Accurate. "wardrobe" occurs nowhere in `dossier.json`, as claimed |

### Verdict: **FAIL** (round 2, full-file re-check)

1 `unsourced` (row 9, ownership), 0 `contradicted`, 77 `sourced`, 2 `shared-context`, 3 `framing`; 1 voice fail (V1, triad).

- Row 9 goes to the **copywriter**. It passes when the copy states only what the dossier holds as a source for the business, or leaves the claim out. The `sources.md` intro ¶1 S2 row must then match.
- V1 goes to the **humanizer**. It passes when the cleanliness quotes are no longer set as a rule of three. The humanizer may not add a count or a frequency to do it.
- Nothing else in the file may change. The next round re-checks the whole file anyway.

Round count: this is round 2, the last one base.md allows. The fact fail is not a case of the dossier being unable to support a site: the fix removes or re-grounds one clause, and the dossier holds enough for the rest. Whether a round 3 runs is Shahar's call.
