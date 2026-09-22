# copy review — ka-surf-hostel-and-restaurant · en · round 1

Reviewer: copyeditor 0.1.0. Independent of the copywriter and humanizer.

## Fact audit
Every sentence asserting anything was traced to `dossier/ka-surf-hostel-and-restaurant/dossier.json`.

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

---

## round 2 — block re-review: copyBlocks[1] (about), 2026-09-21

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`). Independent of the copywriter and humanizer. Scope: `en.json` → `copyBlocks[1]` only, re-opened because round 1 passed a false sentence ("Those are the highest numbers on either listing"; Hostelworld has Value for Money and Security at 10.0).

### Scope check (script)
Deep diff of `en.json` against `git show HEAD:sites/ka-surf-hostel-and-restaurant/copy/en.json`: the only differing paths are `.copyBlocks[1].heading` and `.copyBlocks[1].body`. Nothing outside the block moved. The false sentence is gone.

### Draft → final diff
Paragraph 1 and heading identical. Paragraph 2 reworded only: "Staff is the hostel's highest score on Booking.com: 9.9 out of 10" → "On Booking.com the staff get 9.9 out of 10, the hostel's highest score there"; "behind only value for money and security, both at 10" → "and only value for money and security do better, both at a full 10". No fact added or lost in humanizing.

### Fact audit (every sentence)

| # | Sentence / claim | Dossier field | Verdict |
|---|---|---|---|
| H | Heading "Run by a local family" | `business.run_by` "a local family" (Hostelworld, owner's words) | sourced |
| 1a | "KA is managed by a local family" | `business.description_long` "managed by a local family" (Hostelworld) | sourced |
| 1b | "and 'family' is the word guests keep using" | `reviews.quotes[]` Clara, Luzzi, Nanet (Booking), Elena (Hostelworld) all use "family" | sourced |
| 2 | "One of them caught dengue in Kandy and wrote that the staff helped nurse her back to health with Ayurvedic medicines, on top of what the hospital was already giving her." | `reviews.quotes[]` Mia, Hostelworld, 2026-02 — reported as her account, wording tracks the quote | sourced |
| 3a | "On Booking.com the staff get 9.9 out of 10" | `reviews.booking.categories.Staff` 9.9 | sourced |
| 3b | "the hostel's highest score there" | Booking categories: Staff 9.9 is the maximum (next Value for money 9.4); overall 9.5 | sourced |
| 4a | "Hostelworld guests give them the same 9.9" | `reviews.hostelworld.categories.Staff` 9.9 | sourced |
| 4b | "only value for money and security do better, both at a full 10" | Hostelworld Value for Money 10.0, Security 10.0; all other categories and the overall (9.8) are ≤ 9.8 | sourced ("a full" = framing) |

`unsourced`: 0 · `contradicted`: 0. None of the four unresolved dossier contradictions (parking, check-in, WiFi, name) is touched.

`sources.md` rows "about ¶1 · para 1" and "about ¶1 · para 2" verified against the dossier: both accurate.

Note, not a fail reason: the category scores are quoted with platform but without review count (38 Booking, 66 Hostelworld). The counts are carried by `ratings[]` on the same page.

### Voice audit

| Check | Result |
|---|---|
| Sentence rhythm varies | yes (short clause + long anecdote; two stat sentences of different shape) |
| No triads | yes |
| No padding vocabulary | yes |
| Concrete nouns over category words | yes (dengue, Kandy, Ayurvedic medicines, the numbers) |
| Honest limit | the block states where staff is not top on Hostelworld — it now says so plainly |
| Register matches the owner's | yes |
| Reads aloud without wincing | yes |
| Locale cadence | English only; natural |

Voice score: 8/8, clean.

### Schema
`slot` "about" (valid enum) · heading 21 chars (≤ 120) · body 436 chars (≤ 1500) · plain text, blank line between paragraphs. Pass.

### Duplication
- **Fails:** sentence 1a "KA is managed by a local family" (and the heading) restates the fact already opening `copyBlocks[0]` (intro): "A family runs this place". Same fact in two blocks (base.md completeness audit: "No duplicate fact across two blocks"; schema rule "A fact lives in exactly one field"). Introduced at 4a (present in `en.draft.json`); the HEAD version of this block did not state it this way.
- Observation, not a fail reason: sentence 2 paraphrases the Mia quote that is also `testimonials[2]` verbatim. Same as in the block passed at round 1; left to the orchestrator.

### Verdict: **FAIL** (round 2, block re-review)

| Offending sentence | Verdict | Goes back to |
|---|---|---|
| "KA is managed by a local family" (with heading "Run by a local family") — duplicates `copyBlocks[0]` "A family runs this place" | duplicate fact across two blocks (completeness audit); sourced, not false | copywriter (4a) |

Everything else in the block passes: zero `unsourced`, zero `contradicted`, voice clean, schema constraints met. To pass: the "family runs it" fact lives in one block only. This is the block's second round; per base.md, a further fail goes back to the harvester / out of the run.

---

## round 3 — block re-review: copyBlocks[1] (about), 2026-09-21

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`). Independent of the copywriter and humanizer. Scope: `en.json` → `copyBlocks[1]` only, after the copywriter removed "KA is managed by a local family" and changed the heading (round 2 fail); humanizer made no change. This is the block's third pass.

### Scope check (script)
Deep diff of `en.json` against `git show HEAD:sites/ka-surf-hostel-and-restaurant/copy/en.json`: the only differing paths are `.copyBlocks[1].heading` and `.copyBlocks[1].body`. Nothing outside the block moved.

### Draft → final diff
`cmp en.json en.draft.json`: byte-identical. Nothing appeared or disappeared in humanizing.

### Fact audit (every sentence, heading included)

| # | Sentence / claim | Dossier field | Verdict |
|---|---|---|---|
| H | Heading "What guests say about the staff" | the block is guests' words and guests' category scores (rows below) | framing |
| 1 | "\"Family\" is the word guests keep using." | `reviews.quotes[]`: Clara, Luzzi, Nanet (Booking), Elena (Hostelworld) use "family" — 4 of 10 quotes, both platforms | sourced ("keep using" = framing) |
| 2 | "One of them caught dengue in Kandy and wrote that the staff helped nurse her back to health with Ayurvedic medicines, on top of what the hospital was already giving her." | `reviews.quotes[]` Mia, Hostelworld, 2026-02 — attributed as her account, wording tracks the quote, not in the business's voice | sourced |
| 3a | "On Booking.com the staff get 9.9 out of 10" | `reviews.booking.categories.Staff` 9.9 | sourced |
| 3b | "the hostel's highest score there" | Booking categories max is Staff 9.9 (next Value for money 9.4); overall 9.5 | sourced |
| 4a | "Hostelworld guests give them the same 9.9" | `reviews.hostelworld.categories.Staff` 9.9 | sourced |
| 4b | "only value for money and security do better, both at a full 10" | Hostelworld Value for Money 10.0, Security 10.0; Atmosphere 9.8, Facilities 9.8, Cleanliness 9.7, Location 9.4, overall 9.8 | sourced ("a full" = framing) |

`unsourced`: 0 · `contradicted`: 0. None of the dossier's unresolved contradictions (parking, check-in, WiFi, name) is touched.

`sources.md` rows "about ¶1 · para 1" and "about ¶1 · para 2" verified against the dossier: accurate for the current text.

Note, not a fail reason: category scores are quoted with platform but without review count (38 Booking, 66 Hostelworld); the counts are on the same page in `ratings[]`.

### Voice audit

| Check | Result |
|---|---|
| Sentence rhythm varies | yes (short opener, long anecdote, two stat sentences of different shape) |
| No triads | yes |
| No padding vocabulary | yes |
| Concrete nouns over category words | yes (dengue, Kandy, Ayurvedic medicines, the numbers) |
| Honest limit | yes — states that staff is not top on Hostelworld |
| Register matches the owner's | yes |
| Reads aloud without wincing | yes |
| Locale cadence | English only; natural |

Voice score: 8/8, clean.

### Schema
`slot` "about" (valid enum) · heading 31 chars (≤ 120) · body 399 chars (≤ 1500) · plain text, one blank line between two paragraphs. Pass.

### Duplication (against every block and field in en.json)
- `copyBlocks[0]` (intro) "A family runs this place": no longer restated. Sentence 1 is a different fact (what guests write, not who runs it). Pass.
- `copyBlocks[2]`–`[5]`, `tagline`, `spot`, `rooms`, `stayInfo`, `amenities`: no overlap.
- `ratings[]`: carries overall scores only; the category scores in ¶2 live nowhere else. Pass.
- `testimonials[0]` (Clara) and `[1]` (Elena) contain the word "family"; sentence 1 is an aggregate observation, not a restatement of either. Pass.
- **Fails:** sentence 2 (the dengue story) restates `testimonials[2]` (Mia, verbatim) on the same page. Same fact in two fields — schema rule "No duplication: a fact lives in exactly one field" (the room-rate-in-a-paragraph case, with a testimonial in place of a rate). Rounds 1 and 2 passed this, round 2 as an observation because base.md's wording is "across two blocks"; on this full re-review the schema rule, which is part of the runtime prompt, is read as binding. The sentence is sourced and true; it fails on duplication only.

### Verdict: **FAIL** (round 3, block re-review)

| Offending sentence | Verdict | Goes back to |
|---|---|---|
| "One of them caught dengue in Kandy and wrote that the staff helped nurse her back to health with Ayurvedic medicines, on top of what the hospital was already giving her." — duplicates `testimonials[2]` (Mia) | duplicate fact across two fields (completeness audit / schema "No duplication"); sourced, not false | copywriter (4a) |

Everything else passes: zero `unsourced`, zero `contradicted`, voice 8/8, schema met, no other duplication. To pass: the dengue account lives in one field only.

Third pass: base.md says a block still failing on the third pass means the dossier cannot support a site, and in `mode: test` it goes out of the run. That rule applies literally here, but its premise does not hold: the dossier supports every sentence, and the fail is a copy-structure duplication that round 2 explicitly let stand. Whether to apply the drop-out rule or allow one more copywriter pass is a decision for the orchestrator / Shahar, not this reviewer.

## round 4 — field re-review for full round 2: copyBlocks[2], spot, contact.address (+ related), 2026-09-22

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, read in full). Independent of the copywriter and humanizer. Trigger: critic full round 1 HF-1 (breakfast "more often than anything else"; spot "when the swell is up"), proposal 005. Method: sentence by sentence, one dossier key per row; every comparative, superlative, frequency or condition treated as its own claim; a guest's words stated in the business's voice count as unsourced; a dropped qualifier that changes who a fact is for is a mismatch.

### Scope check (script)
Deep diff of `en.json` against `git show HEAD:…/copy/en.json`: exactly 3 differing paths — `.copyBlocks[2].body`, `.spot`, `.contact.address`. Nothing else moved. `cmp en.json en.draft.json`: byte-identical (nothing added or lost in humanizing). The two HF-1 phrases ("more often than anything else", "when the swell is up") appear nowhere in the file.

### Fact audit

| # | Field | Sentence / claim | Dossier key | Verdict |
|---|---|---|---|---|
| 1a | `copyBlocks[2].body` S1 | "Breakfast is included" | `business.description_long` ("daily free healthy breakfast"), `facilities[2]` ("free breakfast") | sourced |
| 1b | `copyBlocks[2].body` S1 | "and it is Sri Lankan" | Only `reviews.quotes[7]` Elena (guest): "always consists of **a** typical Sri Lankan dish". The owner's list (`description_long`: rotis, fruits, pancakes, eggs) never says Sri Lankan; `facilities[2]` (Booking) labels it "continental, full English/Irish" | **unsourced** — a guest's account in the business's voice, widened from "includes a Sri Lankan dish" to "the breakfast is Sri Lankan"; it also silently resolves a conflict with `facilities[2]` that the harvester did not flag |
| 1c | `copyBlocks[2].body` S1 | "rotis, … pancakes, eggs" | `description_long` | sourced |
| 1d | `copyBlocks[2].body` S1 | "hoppers" | only Elena (guest): "(roti, hoppers,…)" | **unsourced** — guest's words in the business's voice |
| 1e | `copyBlocks[2].body` S1 | "a fruit platter" | owner: "fruits" (`description_long`); "platter" only Elena (guest) | **unsourced** as worded — the guest's detail in the business's voice (fruit itself is sourced) |
| 1f | `copyBlocks[2].body` S1 | "and a vegan option if you need one" | `description_long` ("vegan options available") | sourced |
| 2 | `copyBlocks[2].body` S2 | "One guest wrote that the Sri Lankan dish changes every day." | `reviews.quotes[7]` Elena, Hostelworld, 2026-03: "…a typical Sri Lankan dish … which changes every day" — attributed, one guest, no frequency claim | sourced (but duplicates `testimonials[1]`, see Duplication) |
| 3 | `copyBlocks[2].heading` (unchanged, related) | "Breakfast changes every morning" | only Elena (guest), and she says the *Sri Lankan dish* changes, not the breakfast. Owner's "daily" = served daily, not changes daily | **unsourced** — guest's account stated as the business's fact, and widened from one dish to the whole breakfast. Contradicts the hedge in its own body (S2) |
| 4a | `amenities[0]` (unchanged, related) | "Free breakfast" | `facilities[2]`, `description_long` | sourced |
| 4b | `amenities[0]` | "Sri Lankan" | as 1b; and the amenity rows are drawn from `facilities[]`, whose breakfast row says "continental, full English/Irish" | **unsourced** (guest's account in business voice; conflicts with `facilities[2]`) |
| 4c | `amenities[0]` | "changes daily" | as 3 | **unsourced** — guest's account in the business's voice |
| 5a | `spot` | "Kabalana: a sandy beach break for beginners and intermediates" | `location.spot` ("sandy beach break for beginners and intermediates"), third-party guide, thesurfatlas.com | shared-context (about the wave, not claimed by the business) |
| 5b | `spot` | "and The Rock, a reef A-frame for advanced surfers." | `location.spot` ("with The Rock reef A-frame for advanced surfers"). "advanced" qualifier restored; no condition added | shared-context |
| 6 | `contact.address` | "207/A Welahangoda" | `location.address.note` ("Google '207/A welahangoda, Ahangama'"); `reports/…/candidates.json` KA entry, Google place page: "207/A welahangoda, Ahangama, Sri Lanka"; Shahar's decision (ledger 2026-09-22T12:31:54Z, 13:47:15Z) | sourced (capitalisation only) |
| 7 | `contact.address` | "80650 Ahangama, Sri Lanka" | `location.address.value` (Booking: "…80650 Ahangama, Sri Lanka"); Google gives no postcode | sourced (composite of two sources, stated in `sources.md`) |

`unsourced`: **6** (1b, 1d, 1e, 3, 4b, 4c) · `contradicted`: 0 (1b/4b conflict with `facilities[2]`, logged under unsourced because the harvester did not record it in `contradictions[]`). None of the dossier's recorded contradictions (parking, check-in, WiFi, name) is touched.

### `sources.md` rows verified against the dossier

| Row | Result |
|---|---|
| about ¶2 (`copyBlocks[2]`) | Accurate for the daily change (Elena, no frequency claim). **Incomplete:** it rests "Sri Lankan", "hoppers" and "fruit platter" on the same Elena quote without saying they are her words presented in the business's voice, does not cover the heading, and does not mention `facilities[2]`'s "continental, full English/Irish" |
| spot | Accurate, character-for-character against `location.spot`; "no swell condition stated" is true |
| contact.address | Accurate: note text, candidates.json record and ledger decision all verified |
| amenities ("copied straight from `facilities[]`") | **Inaccurate for `amenities[0]`:** `facilities[2]` says "free breakfast (continental, full English/Irish)"; "Sri Lankan, changes daily" is not in it |

### Voice audit (changed text)

| Check | `copyBlocks[2].body` | `spot` |
|---|---|---|
| Rhythm varies | yes (long list sentence, short attributed one) | single sentence, fits the field |
| No triads | yes (six-item list, not a padded triad) | yes |
| No padding vocabulary | yes | yes |
| Concrete nouns | yes (rotis, hoppers, eggs) | yes (sandy, reef A-frame) |
| Honest limit | yes — the daily change is given as one guest's word | yes — The Rock is for advanced surfers |
| Register matches owner | yes | yes, surf-guide register |
| Reads aloud | yes; "One guest wrote that…" is plain, not stiff | yes |
| Locale cadence | natural English | natural English |

Voice: clean, 8/8 on both. `contact.address` is data, not voice. Not a voice fault but visible to a reader: the heading and `amenities[0]` assert what the body carefully attributes to one guest (fact rows 3, 4c).

### Schema
`copyBlocks[2]` slot `about`, heading 31 chars, body 188 chars · `spot` 113 chars (≤ 200) · `contact.address` 44 chars (≤ 300). Plain text. Pass.

### Duplication (across the whole file)

In scope (fails):
- **Breakfast in two fields:** `amenities[0]` "Free breakfast, Sri Lankan, changes daily" restates `copyBlocks[2]` (included, Sri Lankan, daily change). Schema rule "a fact lives in exactly one field".
- **`copyBlocks[2]` S2 restates `testimonials[1]`** (Elena, verbatim, same page) — the same class as the round-3 dengue fail. Shahar's override on 2026-09-21 (ledger l.184) accepted `copyBlocks[1]` "as is"; it is not recorded as a standing rule, so it is applied here as in round 3. Decision point for Shahar if he wants the same exception.

Outside this round's field scope (pre-existing, reported, not scored here; same schema rule would catch them): 24-hour reception in `copyBlocks[4]`, `stayInfo.note` and `amenities[12]`; children not accommodated in `copyBlocks[4]` and `stayInfo.note`; pets in `copyBlocks[4]` and `amenities[16]`; A/C + fan, locker + fridge, hot showers in `copyBlocks[3]` and `amenities[2–4]`; scooter + surf rack, laundry, minimarket, luggage storage, filtered water, garden in `copyBlocks[4]` and `amenities[]`; shuttle (`copyBlocks[5]`) vs "Airport transfers" (`amenities[14]`); five-minute walk to Kabalana in `copyBlocks[0]` heading, body and `copyBlocks[5]`; dengue (`copyBlocks[1]`, accepted by Shahar). `spot` and `contact.address` duplicate nothing.

### Verdict: **FAIL** (round 4, field re-review)

| Offending sentence | Verdict | Goes back to |
|---|---|---|
| `copyBlocks[2].body` S1: "Breakfast is included and it is Sri Lankan: rotis, hoppers, pancakes, eggs, a fruit platter, and a vegan option if you need one." — "it is Sri Lankan", "hoppers", "a fruit platter" | unsourced (Elena's words in the business's voice; "Sri Lankan" widened and in conflict with `facilities[2]`) | copywriter (4a) |
| `copyBlocks[2].heading`: "Breakfast changes every morning" | unsourced (one guest's account as the business's fact, widened from one dish to the breakfast) | copywriter (4a) |
| `amenities[0]`: "Free breakfast, Sri Lankan, changes daily" | unsourced ("Sri Lankan", "changes daily"); duplicates `copyBlocks[2]` | copywriter (4a) |
| `copyBlocks[2].body` S2: "One guest wrote that the Sri Lankan dish changes every day." | sourced; duplicates `testimonials[1]` (Elena) | copywriter (4a), or Shahar's exception as for dengue |

Passes: `spot` (HF-1 fixed, "advanced" restored, no condition), `contact.address` (Google spelling, sourced, per Shahar), voice 8/8, schema, scope (3 paths only). No voice items for the humanizer.

To pass: breakfast is stated in the business's voice only from the owner's list (`description_long`) or `facilities[2]`; anything from Elena is attributed to her or left to her testimonial; heading and `amenities[0]` claim nothing the body attributes to a guest; the breakfast facts live in one field; `sources.md` rows for `copyBlocks[2]` and `amenities[0]` match what the text rests on. Possible harvester item: record `facilities[2]` "continental, full English/Irish" vs the owner/guest descriptions in `contradictions[]`.

Round count: base.md allows 2 rounds; this is the fourth pass on the copy overall and the first on these fields. Whether to loop once more (4a → 4c) is for the orchestrator / Shahar.

## round 5 — breakfast re-review for full round 2, 2026-09-22

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, read in full). Independent of the copywriter and humanizer. Scope: the round-4 breakfast fails only — `copyBlocks[2].heading`, `copyBlocks[2].body`, `amenities[0].label`, breakfast duplication across the file, and the matching `sources.md` rows. `spot` and `contact.address` passed in round 4 and are unchanged since. Method as round 4: one dossier key per row; every comparative, frequency or condition is its own claim; a guest's words in the business's voice count as unsourced.

### Scope check (script)
Deep diff of `en.json` against `git show HEAD:…/copy/en.json`: 5 differing leaf paths in exactly the 4 permitted fields — `.copyBlocks[2].heading`, `.copyBlocks[2].body`, `.spot`, `.amenities[0].label`, `.contact.address`. Nothing else moved. `cmp en.draft.json en.json`: byte-identical (the humanizer changed nothing; nothing added or lost). "Sri Lankan", "hoppers", "platter", "changes" appear in the file only inside `testimonials[1]` (Elena, verbatim).

### Fact audit

| # | Field | Sentence / claim | Dossier key | Verdict |
|---|---|---|---|---|
| 1a | `copyBlocks[2].heading` | "Breakfast" (there is one) | `business.description_long` ("daily free healthy breakfast"), Hostelworld, owner's copy; `facilities[2]` ("free breakfast"), Booking.com | sourced |
| 1b | `copyBlocks[2].heading` | "every day" (frequency) | `business.description_long` ("daily") — served daily; no claim that it changes | sourced |
| 2a | `copyBlocks[2].body` | "Rotis, fruit, pancakes and eggs" | `business.description_long` ("rotis, fruits, pancakes, eggs") — the owner's list, in the owner's order; "fruits" → "fruit" only | sourced |
| 2b | `copyBlocks[2].body` | "with vegan options" | `business.description_long` ("vegan options available") | sourced |
| 3 | `amenities[0].label` | "Free breakfast" | `facilities[2]` ("free breakfast (continental, full English/Irish)"), Booking.com; `business.description_long` ("daily free healthy breakfast") | sourced |

`unsourced`: 0 · `contradicted`: 0. No breakfast style is stated, so the owner's list vs Booking's "continental, full English/Irish" (`facilities[2]`) is not resolved either way in the copy. Nothing from Elena is stated in the business's voice. "healthy" (owner's word) is dropped — an omission, not a claim.

### `sources.md` rows verified against the dossier

| Row | Result |
|---|---|
| about ¶2 · heading | Accurate: quote matches `description_long`; the reading "served every day, nothing about it changing" matches the text; "free" is indeed only in `amenities[0]` |
| about ¶2 · body | Accurate: quote matches `description_long` character for character; Elena's details are indeed left to `testimonials[1]`. Wording note only: it calls Sri Lankan vs `facilities[2]` an "unresolved conflict", but `dossier.contradictions[]` does not record it (4 entries: parking, check-in, WiFi, name) — the copy does not rely on it either way |
| amenities[0] | Accurate: `facilities[2]` and `description_long` quoted correctly; "type not stated" is true |
| rooms / amenities / … "copied straight from `facilities[]`" | Now accurate for `amenities[0]` (was inaccurate in round 4) |

### Voice audit (changed text)

| Check | heading | body | `amenities[0]` |
|---|---|---|---|
| Rhythm varies | n/a (heading) | single fragment; the block is one line, which is what the owner's list supports | list label |
| No triads | yes | yes (four items + a note) | yes |
| No padding vocabulary | yes | yes | yes |
| Concrete nouns | yes | yes (rotis, pancakes, eggs) | yes |
| Honest limit | — | — (none needed in a menu line; the page carries its limits elsewhere) | — |
| Register matches owner | yes, plain | yes, close to the owner's own bullet | yes |
| Reads aloud | yes | yes | yes |
| Locale cadence | natural English | natural English | natural English |

Voice: clean. Nothing reads as generated. Note (not a fault): the block is now a single short line; that is the honest volume of the owner's source, not padding.

### Schema
`copyBlocks[2]` slot `about`, heading 20 chars (≤ 120), body 52 chars (≤ 1500) · `amenities[0].label` 14 chars (≤ 60). Plain text. Pass.

### Duplication (breakfast, across the whole file)
- `copyBlocks[2]` (daily; rotis, fruit, pancakes, eggs; vegan) and `amenities[0]` ("free") now hold different facts; neither restates the other. Round-4 fail cleared.
- `copyBlocks[2]` no longer restates `testimonials[1]` (Elena). Her quote overlaps on "roti" and "fruit" as independent guest evidence for the owner's list; that is corroboration, not the block retelling her review. Round-4 fail cleared.
- `testimonials[4]` (Saketh, "breakfast in the morning was great") and `copyBlocks[0]` ("check the surf before breakfast", framing) mention breakfast without restating any fact from the block. No fail.

Notes, outside this round's scope (pre-existing, not fail reasons here): 24-hour reception in `copyBlocks[4]`, `stayInfo.note` and `amenities[12]`; children not accommodated in `copyBlocks[4]` and `stayInfo.note`; pets in `copyBlocks[4]` and `amenities[16]`; A/C + fan, locker + fridge, hot showers in `copyBlocks[3]` and `amenities[2–4]`; scooter + surf rack, laundry, minimarket, luggage storage, filtered water, garden in `copyBlocks[4]` and `amenities[]`; shuttle (`copyBlocks[5]`) vs "Airport transfers" (`amenities[14]`); five-minute walk to Kabalana in `copyBlocks[0]` heading, body and `copyBlocks[5]`; dengue (`copyBlocks[1]` vs `testimonials[2]`, accepted by Shahar).

### Verdict: **PASS** (round 5, breakfast re-review)

Zero `unsourced`, zero `contradicted`, voice clean, schema pass, scope confined to the 4 permitted fields, breakfast facts each in one field. No sentences go back. Together with round 4's passes (`spot`, `contact.address`), every field changed since HEAD now passes.

Possible harvester item (carried from round 4, not blocking): record `facilities[2]` "continental, full English/Irish" vs the owner's list and Elena's "typical Sri Lankan dish" in `dossier.contradictions[]`, so `sources.md`'s "unresolved conflict" has a dossier entry behind it.

## round 6 — full-file audit before full round 3, 2026-09-22

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, read in full). Independent of the copywriter and humanizer. Trigger: critic full round 2 hard fail (three claims in copy that had not been re-opened since round 1) and Shahar's decision (ledger, 2026-09-22T16:18:14Z): "Fix all three: bathrooms, ten minutes, season. No framing exemptions. … the copyeditor re-checks every sentence, not just the changed ones."

Scope: **every sentence and every field** of `copy/en.json`, whether or not it changed. Method: one row per claim, one dossier key per row. No framing exemptions: any time, duration, frequency, comparison, superlative, condition, season, quantity or sensory claim that no dossier key supports is `unsourced`. Every quote cited as a source was re-read word for word. A dropped qualifier that changes who a fact is for counts as a mismatch. A guest's words stated in the business's voice are `unsourced` for the business. `framing` is used only for headings that assert nothing.

### Scope check
`cmp en.json en.draft.json`: byte-identical, so humanizing added or lost nothing. `en.json` is the text the critic read in full round 2 (same five paths changed since HEAD as in round 5). The three phrases the critic named are all present: "ten minutes after you drop your bag", "some of them open to the sky", "with the season".

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "KA Surf Hostel" | `business.name` (Booking.com) | sourced |
| 2 | `tagline` | "Surf, chill and feel at home in Ahangama" | `business.tagline` "Surf, Chill & Feel at Home in Ahangama" (owner, Hostelworld); only case and "&" changed | sourced |
| 3 | `languagesSpoken` | `["en"]` | `languages_spoken[0]` "English" (Booking.com) | sourced |
| 4 | `copyBlocks[0].heading` | "Five minutes from Kabalana Beach" | `location.distance_to_beach` "Kabalana Beach 450 yd / a 5-minute walk" | sourced (see note: "walk" dropped from the heading; the body restores it) |
| 5 | `copyBlocks[0].body` S1a | "A family runs this place" | `business.run_by` "a local family"; `description_long` "managed by a local family" | sourced |
| 6 | `copyBlocks[0].body` S1b | "and you feel it about ten minutes after you drop your bag" | none. No dossier key gives any time. The owner's line is "making you feel at home **from the moment you arrive**" (`description_long`). That is the owner's aim, not a measured time, and it does not say ten minutes. The feeling itself is a claim about guests' experience stated as fact | **unsourced** (duration; experience claim) |
| 7 | `copyBlocks[0].body` S2a | "Kabalana Beach is a five-minute walk" | `location.distance_to_beach` | sourced |
| 8 | `copyBlocks[0].body` S2b | "close enough to check the surf before breakfast and come back wet" | "close enough" rests on `distance_to_beach`. "Before breakfast" is a time claim: it needs breakfast service times, and the dossier has none (`description_long` says only "daily"; `hours` is empty). "Come back wet" asserts an outcome (you go in the water) that no key holds. Saketh's "close to kabalana beach so great for surfing" is a guest's words and does not give a time | **unsourced** (time relative to unpublished breakfast hours; outcome claim). The critic scored this framing in round 2. Under "no framing exemptions" it is not |
| 9 | `copyBlocks[0].body` S3 | "Dorms if you want the company, private rooms if you don't." | `room_types[0–5]` (3 dorm, 3 private); `description_long` "Dorms & Private Rooms: Options for every kind of traveler" | sourced |
| 10 | `copyBlocks[1].heading` | "What guests say about the staff" | labels rows 11–16; asserts nothing itself | framing |
| 11 | `copyBlocks[1].body` S1 | "\"Family\" is the word guests keep using." | `reviews.quotes[]`: "family" is in 4 of 10 quotes (Clara, Luzzi, Nanet, Elena), on both platforms. It is the most frequent descriptive word in the quotes (friendly 3, kind 3, clean 2, spacious 2). `business.run_by.note`: "corroborated by many guest reviews calling it family-run" | sourced (frequency held by count + harvester note) |
| 12 | `copyBlocks[1].body` S2 | dengue in Kandy; staff helped nurse her back to health with Ayurvedic medicines, on top of the hospital's | `reviews.quotes[9]` Mia, Hostelworld, 2026-02, re-read: "I got dengue in Kandy and the staff at KA helped nurse me back to health with Ayurvedic medicines (on top of what the hospital was already giving me)". Told as her account ("wrote that"), not in the business's voice | sourced |
| 13 | `copyBlocks[1].body` S3a | "On Booking.com the staff get 9.9 out of 10" | `reviews.booking.categories.Staff` 9.9 | sourced |
| 14 | `copyBlocks[1].body` S3b | "the hostel's highest score there" (superlative) | Booking categories: Staff 9.9 is the maximum; next is Value for money 9.4; overall 9.5 | sourced |
| 15 | `copyBlocks[1].body` S4a | "Hostelworld guests give them the same 9.9" | `reviews.hostelworld.categories.Staff` 9.9 | sourced |
| 16 | `copyBlocks[1].body` S4b | "only value for money and security do better, both at a full 10" (comparison) | Hostelworld Value for Money 10.0, Security 10.0; Atmosphere 9.8, Facilities 9.8, Cleanliness 9.7, Location 9.4, overall 9.8 | sourced |
| 17 | `copyBlocks[2].heading` | "Breakfast, every day" (frequency) | `description_long` "daily free healthy breakfast" | sourced |
| 18 | `copyBlocks[2].body` | "Rotis, fruit, pancakes and eggs" | `description_long` "(rotis, fruits, pancakes, eggs …)" | sourced |
| 19 | `copyBlocks[2].body` | "with vegan options" | `description_long` "vegan options available" | sourced |
| 20 | `copyBlocks[3].heading` | "Dorms and private rooms" | `room_types[]`; `description_long` "Dorms & Private Rooms" | sourced |
| 21 | `copyBlocks[3].body` S1 | "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles." | `room_types[0–5]` | sourced |
| 22 | `copyBlocks[3].body` S2a | "Every room has air conditioning and a fan" | `description_long` "A/C & fan in every room"; `facilities[22]` | sourced |
| 23 | `copyBlocks[3].body` S2b | "[every room has] a private locker" (one per room) | `description_long` "private **lockers** & personal fridge in every room" (plural); `facilities[16]` "free security lockers" (plural). No key says one locker per room. In a dorm, "a private locker" per room reads as one locker for the room, where the owner's plural means one per guest | **unsourced** (quantity changed from the source's plural; changes who the locker is for) |
| 24 | `copyBlocks[3].body` S2c | "and a personal fridge" | `description_long` "personal fridge in every room"; `facilities[23]` | sourced |
| 25 | `copyBlocks[3].body` S3a | "The bathrooms are modern" | `description_long` "modern bathrooms" | sourced |
| 26 | `copyBlocks[3].body` S3b | "some of them open to the sky" | Re-read: `reviews.quotes[0]` Maximilian (Booking.com): "the outdoor bathroom **got a roof** so its protected but never humid". `reviews.quotes[7]` Elena: "bathrooms are nice with the whole outdoor thing". "Outdoor" is not "open to the sky", and "a roof" contradicts it. The one bathroom described is singular ("the outdoor bathroom"), not "some of them". Both are guests' words, and neither is in the business's own copy (`description_long` says only "modern bathrooms with hot showers"). `images[img-005]` "a bathroom with a shower and a sink and some plants" says nothing about the sky | **contradicted** (against `reviews.quotes[0]`; also an unsourced quantity and guests' words in the business's voice) |
| 27 | `copyBlocks[3].body` S3c | "and the showers are hot" | `description_long` "hot showers"; `facilities[24]` | sourced |
| 28 | `copyBlocks[3].body` S4a | "Rates change with the season" | none. `season.value` is null with the gap "not published by the business". `gaps[]` "season": "not published". `gaps[]` "offers" says "live, dated inventory" and nothing about seasons | **unsourced** (season) |
| 29 | `copyBlocks[3].body` S4b | "and the dates" | `booking.path.note` "live inventory on Booking.com, Hostelworld and Agoda" (with source_url); `gaps[]` "offers" "nightly rates are live, dated inventory" (harvester note, no source_url) | sourced |
| 30 | `copyBlocks[3].body` S4c | "the booking links below show what is actually free" | `booking.path.note` "live inventory"; `booking.engine_url`, `other_engines` | sourced ("below" depends on the template) |
| 31 | `copyBlocks[4].heading` | "What is here" | asserts nothing itself | framing |
| 32 | `copyBlocks[4].body` S1 | "A green garden and a chill zone." | `description_long` "beautiful green garden & chill zone"; `facilities[4]` | sourced |
| 33 | `copyBlocks[4].body` S2 | "Free filtered water you can refill any time." | `description_long` "free filtered water — refill anytime"; `facilities[21]` | sourced (time claim held by "anytime") |
| 34 | `copyBlocks[4].body` S3 | "Laundry." | `facilities[19]` "laundry service"; `description_long` "laundry service available" | sourced (note: "service" dropped here; `amenities[8]` keeps it) |
| 35 | `copyBlocks[4].body` S4 | "A minimarket on site." | `facilities[12]` | sourced |
| 36 | `copyBlocks[4].body` S5a | "Scooter rental" | `description_long` "cheap scooter rental"; `facilities[20]` | sourced |
| 37 | `copyBlocks[4].body` S5b | "with a surf rack if you ask" | Surf rack: `description_long` "(also with surf rack possible)", `facilities[20]` "(surf rack available)". Neither says it depends on asking. "If you ask" adds a condition | **unsourced** (condition; the surf rack itself is sourced) |
| 38 | `copyBlocks[4].body` S6 | "Luggage storage, lockers, and a 24-hour reception." | `facilities[8]`, `facilities[16]`, `facilities[10]`; `description_long` "24/7 reception" | sourced |
| 39 | `copyBlocks[4].body` S7 | "Pets are welcome on request at no charge." | `facilities[15]` "pets allowed on request, no extra charge" | sourced |
| 40 | `copyBlocks[4].body` S8 | "Children are not accommodated." | `house_rules[1]` "Children are not allowed" | sourced |
| 41 | `copyBlocks[5].heading` | "Getting here" | asserts nothing itself | framing |
| 42 | `copyBlocks[5].body` S1 | "Ahangama, a five-minute walk from Kabalana Beach." | `location.address`; `distance_to_beach` | sourced |
| 43 | `copyBlocks[5].body` S2a | "Koggala Airport is about 5 km away" | `location.nearby` "3.3 mi" (5.3 km) | sourced |
| 44 | `copyBlocks[5].body` S2b | "Ahangama railway station is a little over 2 km" | `location.nearby` "1.3 mi" (2.09 km) | sourced |
| 45 | `copyBlocks[5].body` S3 | "The property arranges a shuttle." | `facilities[13]` "shuttle service" (Booking.com); `facilities[18]` "airport transfers" (Hostelworld) | sourced (note: placed after the station, it can be read as a station pickup, which no key states) |
| 46 | `spot` | "Kabalana: a sandy beach break for beginners and intermediates" | `location.spot` (thesurfatlas.com, third-party), re-read: "sandy beach break for beginners and intermediates" | shared-context |
| 47 | `spot` | "and The Rock, a reef A-frame for advanced surfers." | `location.spot` "with The Rock reef A-frame for advanced surfers"; qualifier kept, no condition added | shared-context |
| — | `season` | `null` | `season.value` null, gap "not published" | no claim (correctly empty) |
| 48–53 | `rooms[0–5]` | 3 dorm bunk rows ("1 bunk bed"); Double room / 1 extra-large double bed; Deluxe double room / 1 extra-large double bed; Deluxe double room / 1 single bed | `room_types[0–5]`, re-read row by row. The dorm "1 bunk bed" comes from the singular unit in each label ("Bunk Bed in … Dormitory Room") | sourced ×6 |
| 54 | `stayInfo.checkInFrom/To` | 13:00–23:00 | `hours_note` (Hostelworld). `contradictions[1]`: Booking.com says "available 24 hours"; unresolved, with the harvester's lean "Hostelworld's specific window is the more likely truth". `sources.md` records the choice | sourced (the contradiction stays an owner item; this follows the harvester's lean and is not silent) |
| 55 | `stayInfo.checkOutTo` | 13:00 | same as 54 | sourced (same note) |
| 56 | `stayInfo.note` S1 | "Reception is open 24 hours." | `hours_note`; `facilities[10]` | sourced |
| 57 | `stayInfo.note` S2 | "Children are not accommodated, and cots and extra beds are not available." | `house_rules[1]` "Children are not allowed; no cots or extra beds" | sourced |
| 58–74 | `amenities[0–16]` | Free breakfast · Free WiFi · A/C and fan in every room · Private locker and personal fridge in every room · Hot showers · Garden and chill zone · Free filtered water · Scooter rental (surf rack available) · Laundry service · Minimarket on site · Luggage storage · Tour desk · 24-hour reception · 24-hour security · Airport transfers · Bicycle parking · Pets allowed on request (no extra charge) | `facilities[2, 0, 22, 16+23 / description_long, 24, 4 / description_long, 21, 20, 19, 12, 8, 9, 10, 11, 18, 17, 15]`. "Free WiFi" states only that it exists, not the contradicted fibre/reliability claim. `amenities[3]` is a category label with no article, so it carries no count (compare row 23). "Bicycle parking" (Hostelworld) is a separate facility from the car-parking contradiction | sourced ×17 |
| 75–77 | `ratings[0–2]` | Hostelworld 9.8/10, 66 · Booking.com 9.5/10, 38 · Google 4.8/5, 42 | `reviews.hostelworld`, `reviews.booking`, `reviews.google`; URLs match `contact.socials` | sourced ×3 |
| 78–82 | `testimonials[0–4]` | Clara (booking) · Elena (hostelworld, 2026-03) · Mia (hostelworld, 2026-02) · Wolfgang (booking) · Saketh (hostelworld, 2026-02) | `reviews.quotes[1, 7, 9, 3, 8]`: script string-equality check, **5/5 verbatim**. Platform from each quote's `source_url`, dates equal, and no date is given where the dossier has none. Authors are shortened to first name + country (gender and age dropped), as the schema allows | sourced ×5 |
| 83 | `contact.phone` | +94773746053 | `contact.phone` | sourced |
| 84 | `contact.address` | "207/A Welahangoda, 80650 Ahangama, Sri Lanka" | `location.address.note` (Google spelling) + `location.address.value` (postcode); Shahar's decision, ledger 2026-09-22 (verified in round 4) | sourced |
| 85–87 | `bookingLinks[0–2]` | "Check dates on Hostelworld / Booking.com / Agoda" + URLs | `booking.other_engines[0]`, `booking.engine_url`, `booking.other_engines[1]`, character-identical; "check dates" = `booking.path.note` live inventory | sourced ×3 |

**Counts (87 claim rows):** `sourced` 76 · `shared-context` 2 · `framing` 3 (headings only) · **`unsourced` 5** · **`contradicted` 1**.

None of the dossier's recorded contradictions (parking, check-in, WiFi, name) is resolved silently. Check-in follows the harvester's stated lean and is recorded in `sources.md` (rows 54–55). The breakfast conflict (Booking's "continental, full English/Irish") is not written either way.

### Failing sentences

| # | Field | Sentence (clause at fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 6 | `copyBlocks[0].body` | "A family runs this place, **and you feel it about ten minutes after you drop your bag**." | unsourced: duration, and a guest-experience claim in the business's voice | copywriter |
| 8 | `copyBlocks[0].body` | "Kabalana Beach is a five-minute walk — **close enough to check the surf before breakfast and come back wet**." | unsourced: a time relative to unpublished breakfast hours, and an outcome claim | copywriter |
| 23 | `copyBlocks[3].body` | "Every room has air conditioning and a fan, **a private locker** and a personal fridge." | unsourced: quantity (the source's plural "private lockers" becomes one per room) | copywriter |
| 26 | `copyBlocks[3].body` | "The bathrooms are modern, **some of them open to the sky**, and the showers are hot." | contradicted by `reviews.quotes[0]` ("the outdoor bathroom got a roof"); also an unsourced plural, and guests' words in the business's voice | copywriter |
| 28 | `copyBlocks[3].body` | "Rates change **with the season** and the dates — the booking links below show what is actually free." | unsourced: season (`season` is a recorded gap) | copywriter |
| 37 | `copyBlocks[4].body` | "Scooter rental, with a surf rack **if you ask**." | unsourced: condition (the source says "possible" / "available") | copywriter |

The critic's three known fails are rows 6, 26 and 28. Rows 8, 23 and 37 are new. The critic's full round 2 scored row 8 as framing and rows 23 and 37 as matches. They fail here only because of "no framing exemptions" and the quantity/condition rule.

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | the owner's own triad (headline, verbatim) | yes | yes | — | owner's | yes | clean (owner's words) |
| `copyBlocks[0]` intro | yes | yes | yes | yes | — | yes | yes | 7/8. Note: "about ten minutes after you drop your bag" is false precision, the kind of specific-sounding detail that reads as generated (it is also fact row 6) |
| `copyBlocks[1]` staff | yes | yes | yes | yes | yes (not top on Hostelworld) | yes | yes | 8/8 |
| `copyBlocks[2]` breakfast | single line | yes | yes | yes | — | yes | yes | clean |
| `copyBlocks[3]` rooms | yes | yes | yes | yes | yes (no prices shown) | yes | yes | 8/8 |
| `copyBlocks[4]` what is here | staccato: "Laundry. A minimarket on site." reads like the amenities list turned into prose | the closing "Luggage storage, lockers, and a 24-hour reception." lands as a three-item closer | yes | yes | yes (children) | yes | yes | 6/8, notes only |
| `copyBlocks[5]` getting here | yes | yes | yes | yes | — | yes | yes | 8/8 |
| `spot` | single sentence | yes | yes | yes | yes (The Rock is for advanced surfers) | surf-guide register | yes | clean |

No voice fail. Notes for the humanizer: the `copyBlocks[4]` fragment run and three-item closer, and row 6's false precision, which goes away with the fact fix.

### Completeness (`beach_lodging`)
The must-haves covered by copy: `rooms[]` 6 rows and `bookingLinks[]` 3 rows (photos are not a copy field). Should-haves `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]` and `spot` are filled. `season` is null with its reason (dossier gap). `contact.whatsapp` is absent because the dossier has a gap. The schema requires it, and it stays a known open item for the Payload seed. Notes, not copy fails: `businessType` is absent from `en.json` (the deployer seeds it from `dossier.businessType` "beach_lodging"; the schema default would be `surf_school`). `copywriter_version` and `humanizer_version` read "0.1.0", while `run.yaml` pins 0.2.0 and the ledger shows 0.2.0 runs.

### Duplication across fields (notes, as instructed)
- Dengue: `copyBlocks[1]` S2 vs `testimonials[2]` (Mia). Accepted by Shahar.
- 24-hour reception: `copyBlocks[4]`, `stayInfo.note`, `amenities[12]`.
- Children not accommodated: `copyBlocks[4]`, `stayInfo.note`.
- Pets: `copyBlocks[4]`, `amenities[16]`.
- A/C + fan, locker + fridge, hot showers: `copyBlocks[3]` vs `amenities[2–4]`.
- Scooter + surf rack, laundry, minimarket, luggage storage, filtered water, garden: `copyBlocks[4]` vs `amenities[5–10]`.
- Shuttle (`copyBlocks[5]`) vs "Airport transfers" (`amenities[14]`).
- Five-minute walk to Kabalana: `copyBlocks[0]` heading and body, and `copyBlocks[5]`.
- New in this full pass: **lockers** appear three times (`copyBlocks[3]` "a private locker", `copyBlocks[4]` "lockers", `amenities[3]`). **The room list** in `copyBlocks[3]` S1 and `copyBlocks[0]` S3 restates `rooms[]` (schema "No duplication": a room fact lives in `rooms[]`).

### `sources.md` rows checked against the dossier

| Row | Result |
|---|---|
| tagline | Accurate (it does not mention "&" → "and") |
| intro ¶1 | **Wrong.** It cites `business.run_by`, `distance_to_beach` and `business.description` for "family-run, five-minute walk, check the surf before breakfast". `business.description` says "a short walk from the famous Kabalana Beach … restaurants, surf spots, and cozy hangout areas right at your doorstep". It holds no breakfast timing and nothing about coming back wet. The row does not mention "you feel it about ten minutes after you drop your bag" at all (no key). It also does not cover the heading |
| intro ¶2 | Accurate |
| about ¶1 · para 1 | Accurate: the four "family" quotes and Mia's words are verified. `business.run_by.note` would also support "keep using" |
| about ¶1 · para 2 | Accurate |
| about ¶2 · heading / body, amenities[0] | Accurate (the body's "unresolved conflict" wording still has no `contradictions[]` entry, as round 5 noted) |
| offer ¶1 | **Wrong.** It rests "bathrooms" on `room_types[]`, `description_long` and `facilities[]`. None of them holds "some of them open to the sky", and `reviews.quotes[0]` contradicts it. "Locker" is cited without noting that the source is plural ("private lockers") |
| offer ¶2 | **Wrong.** It describes the text as "rates change with dates", but the text says "with the season and the dates". There is no key for season (`season.value` null; `gaps[]` "season" "not published"). The key it cites, `gaps[]` "offers", has no `source_url`. The sourced key is `booking.path.note` |
| info ¶1 (facilities) | **Incomplete.** "If you ask" is not covered. The sources say "possible" / "available" |
| info ¶1 (pets / children) | **Wrong key and misquoted.** Pets are `facilities[15]`, not `house_rules[]`. The quoted "Pets are allowed on request. No extra charges." is in no dossier field (the dossier reads "pets allowed on request, no extra charge"). "Children are not allowed" matches `house_rules[1]` |
| info ¶2 | Accurate (3.3 mi, 1.3 mi, `facilities[13]`). It does not cover the heading or "Ahangama, a five-minute walk" (held by `distance_to_beach`) |
| spot | Accurate, character for character |
| rooms / amenities / ratings / testimonials / contact / bookingLinks | **Incomplete.** It has no row for `stayInfo` (which rests on `hours_note`, `facilities[10]` and `house_rules[1]`, with the check-in contradiction), `languagesSpoken`, `businessName`, or the headings of `copyBlocks[3–5]`. "Copied straight from `facilities[]`" is not exact: `amenities[3]` ("private locker … in every room") and `amenities[5]` ("chill zone") come from `description_long`, and the dorm "1 bunk bed" is derived from the label, not copied. `contact.address` is accurate (round 4) |
| Deliberately not written | Accurate. There is no fibre/reliability claim ("Free WiFi" states only that it exists), no parking claim ("Bicycle parking" is a separate Hostelworld facility, not the contradicted car parking), no restaurant and no prices |

### Verdict: **FAIL** (round 6, full-file audit)

5 `unsourced` and 1 `contradicted`, listed above. All six go to the copywriter. There are no voice fails; the humanizer has notes only. The `sources.md` rows intro ¶1, offer ¶1, offer ¶2, info ¶1 (both rows) and the catch-all row need correcting to match what the text rests on.

To pass: each of the six clauses either states only what its dossier key says or is removed; no new time, condition, quantity or season appears in the rewrite; `sources.md` covers every sentence and field with the right key. The copyeditor re-checks the whole file again after 4a/4b (Shahar's instruction), not only the changed clauses.

Round count: base.md allows 2 rounds; this is the sixth pass on this copy. It runs on Shahar's explicit instruction for full round 3, which the ledger records as the last round.

## round 7 — full-file re-check before full round 3, 2026-09-22

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, all 654 lines read). Independent of the copywriter and humanizer. Trigger: the copywriter fixed round 6's six failing clauses (ledger 16:26:47Z) and the humanizer re-voiced them (ledger 16:28:20Z). Shahar's rule still applies: every sentence re-checked, no framing exemptions.

Scope: **every sentence and every field** of `copy/en.json`. Method as in round 6: one row per claim, one dossier key per row, every cited quote re-read in `dossier.json`, dropped qualifiers counted as mismatches, guests' words in the business's voice counted as `unsourced`, and `framing` used only for headings that assert nothing.

### Scope check
- `en.json` vs `git HEAD`: `copyBlocks[0]`, `[2]`, `[3]`, `[4]` bodies, `[2]` heading, `spot`, `amenities[0]` and `contact.address` differ. `[2]`, `spot`, `amenities[0]` and the address were settled in rounds 4–5. This round re-checks them anyway.
- `en.draft.json` (copywriter) vs `en.json` (humanizer): two fields differ.
  - `copyBlocks[3].body`: an em dash became ", and". No fact changed.
  - `copyBlocks[4].body`: rewritten from fragments into sentences. New wording: "There's a green garden…", "Laundry service is available", "You can rent a scooter, and it can come with a surf rack", "Luggage storage and lockers, too", "Reception is open 24 hours". Each clause is traced to a key in rows 29–37. None of them adds a time, condition, quantity or outcome. "Cheap" (owner's scooter wording) and "free" (lockers) were dropped, and nothing was added in their place.
- Script check: none of the round-6 failing clauses is still in the file ("ten minutes", "before breakfast", "come back wet", "a private locker", "open to the sky", "with the season", "if you ask").

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "KA Surf Hostel" | `business.name` (Booking.com) | sourced |
| 2 | `tagline` | "Surf, chill and feel at home in Ahangama" | `business.tagline` "Surf, Chill & Feel at Home in Ahangama" (owner, Hostelworld) | sourced |
| 3 | `languagesSpoken` | `["en"]` | `languages_spoken[0]` "English" | sourced |
| 4 | `copyBlocks[0].heading` | "Five minutes from Kabalana Beach" | `location.distance_to_beach` "Kabalana Beach 450 yd / a 5-minute walk" | sourced ("walk" is in the body) |
| 5 | `copyBlocks[0].body` S1a | "A family runs this place" | `business.run_by` "a local family"; `description_long` "managed by a local family" | sourced ("local" dropped; this narrows nothing) |
| 6 | `copyBlocks[0].body` S1b | "and they set out to make you feel at home from the moment you arrive" | `description_long` "a local family who are passionate about making you feel at home from the moment you arrive". The copy states it as the family's aim ("set out to"), not as what guests feel, and the timing words are the owner's own | sourced |
| 7 | `copyBlocks[0].body` S2 | "Kabalana Beach is a five-minute walk." | `location.distance_to_beach` "a 5-minute walk" | sourced |
| 8 | `copyBlocks[0].body` S3 | "Dorms if you want the company, private rooms if you don't." | `room_types[0–5]`; `description_long` "Dorms & Private Rooms: Options for every kind of traveler", "Mingle when you want, relax when you need" | sourced |
| 9 | `copyBlocks[1].heading` | "What guests say about the staff" | labels rows 10–15 and asserts nothing | framing |
| 10 | `copyBlocks[1].body` S1 | "\"Family\" is the word guests keep using." | `reviews.quotes[1]` Clara "The most amazing family", `[2]` Luzzi "The most amazing family running the business", `[6]` Nanet "The family is so so so friendly", `[7]` Elena "Great family owned hostel": 4 of 10 quotes. `business.run_by.note` "corroborated by many guest reviews calling it family-run" | sourced |
| 11 | `copyBlocks[1].body` S2 | dengue in Kandy; the staff helped nurse her back to health with Ayurvedic medicines, on top of the hospital's | `reviews.quotes[9]` Mia, re-read: "I got dengue in Kandy and the staff at KA helped nurse me back to health with Ayurvedic medicines (on top of what the hospital was already giving me)". Given as her account ("wrote that") | sourced |
| 12 | `copyBlocks[1].body` S3a | "On Booking.com the staff get 9.9 out of 10" | `reviews.booking.categories.Staff` 9.9 | sourced |
| 13 | `copyBlocks[1].body` S3b | "the hostel's highest score there" | Booking categories: Staff 9.9 is the highest; the next is Value for money 9.4 | sourced |
| 14 | `copyBlocks[1].body` S4a | "Hostelworld guests give them the same 9.9" | `reviews.hostelworld.categories.Staff` 9.9 | sourced |
| 15 | `copyBlocks[1].body` S4b | "only value for money and security do better, both at a full 10" | Hostelworld: Value for Money 10.0 and Security 10.0; Atmosphere 9.8, Facilities 9.8, Cleanliness 9.7, Location 9.4 | sourced |
| 16 | `copyBlocks[2].heading` | "Breakfast, every day" | `description_long` "daily free healthy breakfast" | sourced |
| 17 | `copyBlocks[2].body` | "Rotis, fruit, pancakes and eggs" | `description_long` "(rotis, fruits, pancakes, eggs …)" | sourced |
| 18 | `copyBlocks[2].body` | "with vegan options" | `description_long` "vegan options available" | sourced |
| 19 | `copyBlocks[3].heading` | "Dorms and private rooms" | `description_long` "Dorms & Private Rooms"; `room_types[]` | sourced |
| 20 | `copyBlocks[3].body` S1 | "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles." | `room_types[0–5]` | sourced |
| 21 | `copyBlocks[3].body` S2a | "Every room has air conditioning and a fan" | `description_long` "A/C & fan in every room"; `facilities[22]` | sourced |
| 22 | `copyBlocks[3].body` S2b | "[every room has] private lockers" | `description_long` "private lockers & personal fridge in every room" (plural, as written); `facilities[16]` "free security lockers" | sourced (round-6 fail fixed) |
| 23 | `copyBlocks[3].body` S2c | "and a personal fridge" | `description_long` "personal fridge in every room"; `facilities[23]` | sourced |
| 24 | `copyBlocks[3].body` S3a | "The bathrooms are modern" | `description_long` "modern bathrooms" | sourced |
| 25 | `copyBlocks[3].body` S3b | "and the showers are hot." | `description_long` "hot showers"; `facilities[24]` | sourced |
| 26 | `copyBlocks[3].body` S4a | "Rates change with the dates" | `booking.path.note` "live inventory on Booking.com, Hostelworld and Agoda". No season claim | sourced (round-6 fail fixed) |
| 27 | `copyBlocks[3].body` S4b | "and the booking links below show what is actually free." | `booking.path.note` "live inventory"; `booking.engine_url`, `booking.other_engines` | sourced ("below" depends on the template) |
| 28 | `copyBlocks[4].heading` | "What is here" | asserts nothing | framing |
| 29 | `copyBlocks[4].body` S1a | "There's a green garden and a chill zone" | `description_long` "beautiful green garden & chill zone"; `facilities[4]` "garden" | sourced |
| 30 | `copyBlocks[4].body` S1b | "and free filtered water you can refill any time." | `description_long` "free filtered water — refill anytime"; `facilities[21]` | sourced |
| 31 | `copyBlocks[4].body` S2a | "Laundry service is available" | `description_long` "laundry service available"; `facilities[19]` | sourced |
| 32 | `copyBlocks[4].body` S2b | "and there's a minimarket on site." | `facilities[12]` "minimarket on site" | sourced |
| 33 | `copyBlocks[4].body` S3a | "You can rent a scooter" | `description_long` "cheap scooter rental"; `facilities[20]` "scooter rental (surf rack available)" | sourced ("cheap" dropped, which removes a claim) |
| 34 | `copyBlocks[4].body` S3b | "and it can come with a surf rack." | `description_long` "(also with surf rack possible)"; `facilities[20]` "(surf rack available)". "Can come with" = "possible", with no condition added | sourced (round-6 fail fixed) |
| 35 | `copyBlocks[4].body` S4a | "Luggage storage" | `facilities[8]` "luggage storage" | sourced |
| 36 | `copyBlocks[4].body` S4b | "and lockers, too." | `facilities[16]` "free security lockers" | sourced ("free" dropped) |
| 37 | `copyBlocks[4].body` S5 | "Reception is open 24 hours." | `hours_note` "Reception 24 hours"; `facilities[10]` "24-hour front desk"; `description_long` "24/7 reception" | sourced |
| 38 | `copyBlocks[4].body` S6 | "Pets are welcome on request at no charge." | `facilities[15]` "pets allowed on request, no extra charge" | sourced ("welcome" for "allowed" is warmth only, and the "on request" condition is kept) |
| 39 | `copyBlocks[4].body` S7 | "Children are not accommodated." | `house_rules[1]` "Children are not allowed" | sourced |
| 40 | `copyBlocks[5].heading` | "Getting here" | asserts nothing | framing |
| 41 | `copyBlocks[5].body` S1 | "Ahangama, a five-minute walk from Kabalana Beach." | `location.address` "80650 Ahangama"; `distance_to_beach` | sourced |
| 42 | `copyBlocks[5].body` S2a | "Koggala Airport is about 5 km away" | `location.nearby` "Koggala Airport": "3.3 mi" (5.3 km) | sourced |
| 43 | `copyBlocks[5].body` S2b | "Ahangama railway station is a little over 2 km" | `location.nearby` "Ahangama Railway Station": "1.3 mi" (2.09 km) | sourced |
| 44 | `copyBlocks[5].body` S3 | "The property arranges a shuttle." | `facilities[13]` "shuttle service"; `facilities[18]` "airport transfers" | sourced (round-6 note stands: next to the station it can read as a station pickup, which no key states) |
| 45 | `spot` | "Kabalana: a sandy beach break for beginners and intermediates" | `location.spot` (thesurfatlas.com) "sandy beach break for beginners and intermediates" | shared-context |
| 46 | `spot` | "and The Rock, a reef A-frame for advanced surfers." | `location.spot` "with The Rock reef A-frame for advanced surfers" | shared-context |
| — | `season` | `null` | `season.value` null, "not published by the business" | no claim |
| 47–52 | `rooms[0–5]` | 3 dorm bunk rows ("1 bunk bed"); Double room / 1 extra-large double bed; Deluxe double room / 1 extra-large double bed; Deluxe double room / 1 single bed | `room_types[0]`, `[1]`, `[2]`, `[3]`, `[5]`, `[4]`, re-read row by row | sourced ×6 |
| 53 | `stayInfo.checkInFrom/To` | 13:00–23:00 | `hours_note` "check-in 13:00–23:00". `contradictions[1]` is unresolved, and the copy follows the harvester's lean ("Hostelworld's specific window is the more likely truth"), recorded in `sources.md` | sourced (still an owner item) |
| 54 | `stayInfo.checkOutTo` | 13:00 | `hours_note` "check-out until 13:00"; same contradiction | sourced (same note) |
| 55 | `stayInfo.note` S1 | "Reception is open 24 hours." | `hours_note`; `facilities[10]` | sourced |
| 56 | `stayInfo.note` S2 | "Children are not accommodated, and cots and extra beds are not available." | `house_rules[1]` "Children are not allowed; no cots or extra beds" | sourced |
| 57–59 | `amenities[0–2]` | Free breakfast · Free WiFi · Air conditioning and a fan in every room | `facilities[2]` + `description_long` "daily free healthy breakfast"; `facilities[0]` (existence only, no fibre claim, `contradictions[2]`); `facilities[22]` | sourced ×3 |
| 60 | `amenities[3]` | "Private locker and personal fridge in every room" | `description_long` "private **lockers** & personal fridge in every room"; `facilities[16]` "free security lockers"; `facilities[23]` "personal fridge in every room". The owner writes lockers plural and fridge singular. The label puts both in the singular inside the same "… in every room" construction, and "personal fridge in every room" means one fridge per room, so the label reads as one locker per room. That is the quantity change round 6 failed in `copyBlocks[3]` (row 23 there), and it now also disagrees with the fixed body ("private lockers", row 22). **Round 6 exempted this label as "a category label with no article". That was wrong under the no-exemptions rule, and this round corrects it** | **unsourced** (quantity: the source's plural becomes singular, which changes who the locker is for) |
| 61–73 | `amenities[4–16]` | Hot showers · Garden and chill zone · Free filtered water · Scooter rental (surf rack available) · Laundry service · Minimarket on site · Luggage storage · Tour desk · 24-hour reception · 24-hour security · Airport transfers · Bicycle parking · Pets allowed on request (no extra charge) | `facilities[24]`; `description_long` "green garden & chill zone" + `facilities[4]`; `facilities[21]`, `[20]`, `[19]`, `[12]`, `[8]`, `[9]`, `[10]`, `[11]`, `[18]`, `[17]`, `[15]`, each re-read. "Bicycle parking" is not the car-parking contradiction | sourced ×13 |
| 74–76 | `ratings[0–2]` | Hostelworld 9.8/10, 66 · Booking.com 9.5/10, 38 · Google 4.8/5, 42 | `reviews.hostelworld`, `reviews.booking`, `reviews.google`; URLs equal the `source_url`s | sourced ×3 |
| 77–81 | `testimonials[0–4]` | Clara · Elena (2026-03) · Mia (2026-02) · Wolfgang · Saketh (2026-02) | `reviews.quotes[1, 7, 9, 3, 8]`: script string-equality check **5/5 verbatim**. Platforms from `source_url`, dates equal, no date invented | sourced ×5 |
| 82 | `contact.phone` | +94773746053 | `contact.phone` | sourced |
| 83 | `contact.address` | "207/A Welahangoda, 80650 Ahangama, Sri Lanka" | `location.address.note` "Google '207/A welahangoda, Ahangama'" + `location.address.value` postcode; the scout's record in `candidates.json` ("207/A welahangoda, Ahangama, Sri Lanka"); Shahar's decision (round 4) | sourced |
| 84–86 | `bookingLinks[0–2]` | "Check dates on Hostelworld / Booking.com / Agoda" + URLs | `booking.other_engines[0]`, `booking.engine_url`, `booking.other_engines[1]`, character-identical | sourced ×3 |

**Counts (86 claim rows):** `sourced` 80 · `shared-context` 2 · `framing` 3 (headings only) · **`unsourced` 1** · **`contradicted` 0**.

No recorded contradiction (parking, check-in, WiFi, name) is resolved silently. The breakfast type conflict (Booking's "continental, full English/Irish") is not written either way.

### Failing sentences

| # | Field | Sentence (fault in bold) | Verdict | Goes back to |
|---|---|---|---|---|
| 60 | `amenities[3].label` | "**Private locker** and personal fridge in every room" | unsourced: quantity (the owner's plural "private lockers" becomes a singular per room). It also disagrees with `copyBlocks[3]` "private lockers" | copywriter |

All six round-6 fails are fixed (rows 6, 7, 22, 26, 34, and the bathroom clause is gone). The humanizer added no fact in `copyBlocks[3]` or `[4]`. The one fail is in a field that round 6 wrongly let through, not a regression.

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | owner's own headline | yes | yes | — | owner's | yes | clean (owner's words) |
| `copyBlocks[0]` intro | yes (long, short, fragment) | yes | yes | yes | — | owner's (S1 is close to their own line) | yes | 8/8 where it applies |
| `copyBlocks[1]` staff | yes | yes | yes | yes | yes | yes | yes | 8/8 |
| `copyBlocks[2]` breakfast | single fragment | yes | yes | yes | — | yes | yes | clean |
| `copyBlocks[3]` rooms | yes | yes | yes | yes | yes (no prices) | yes | yes | 8/8 |
| `copyBlocks[4]` what is here | three sentences in a row share one shape, "X, and Y" ("There's … , and free filtered water …", "Laundry service is available, and there's …", "You can rent a scooter, and it can come …") | yes (the three-item closer is gone) | "Laundry service is available" is listing register | yes | yes (children) | yes | yes | 7/8, notes only |
| `copyBlocks[5]` getting here | yes | yes | yes | yes | — | yes | yes | 8/8 |
| `spot` | single sentence | yes | yes | yes | yes (The Rock is for advanced surfers) | surf-guide | yes | clean |

No voice fail. Notes for the humanizer on `copyBlocks[4]`: the repeated ", and" shape across three consecutive sentences, and the brochure-flat "Laundry service is available". The round-6 fragment run and closer are resolved.

### Completeness (`beach_lodging`)
Unchanged from round 6. `rooms[]` (6) and `bookingLinks[]` (3) are filled. `stayInfo`, `amenities[]`, `ratings[]`, `testimonials[]` and `spot` are filled. `season` is null because of a dossier gap. `contact.whatsapp` is absent because of a dossier gap; the schema requires it, so it stays open for the Payload seed. Notes: `businessType` is absent from `en.json` (the deployer seeds it); `copywriter_version` and `humanizer_version` still read "0.1.0" against 0.2.0 pinned and run.

### Duplication across fields (notes, as instructed)
- Dengue: `copyBlocks[1]` vs `testimonials[2]`. Accepted by Shahar.
- **24-hour reception**: now word for word, "Reception is open 24 hours.", in both `copyBlocks[4]` and `stayInfo.note`, and again as `amenities[12]`.
- **Lockers**: in three places: `copyBlocks[3]` "private lockers", `copyBlocks[4]` "lockers, too", and `amenities[3]` (which also disagrees on number, row 60).
- Children not accommodated: `copyBlocks[4]`, `stayInfo.note`.
- Pets: `copyBlocks[4]`, `amenities[16]`.
- A/C + fan, fridge, hot showers: `copyBlocks[3]` vs `amenities[2–4]`.
- Garden, filtered water, laundry, minimarket, scooter + surf rack, luggage storage: `copyBlocks[4]` vs `amenities[5–10]`.
- Shuttle (`copyBlocks[5]`) vs "Airport transfers" (`amenities[14]`).
- Five-minute walk: `copyBlocks[0]` heading and body, `copyBlocks[5]`.
- Room list: `copyBlocks[0]` S3 and `copyBlocks[3]` S1 restate `rooms[]`.

### `sources.md` rows checked against the dossier
Method: every double-quoted string in the "Rests on" column and in "Deliberately not written" was searched in `dossier.json` by script, then checked by hand against the key the row names. Quotes in the "Paragraph" column quote the copy, and each one matches `en.json`.

| Row | Result |
|---|---|
| businessName, tagline, languagesSpoken, intro heading, intro ¶1, intro ¶2 | Accurate. Every quote is in the named key |
| about (staff) heading, ¶1, ¶2 | Accurate. The four "family" quotes and Mia's words are in `reviews.quotes[1, 2, 6, 7, 9]`; the category scores match |
| about (breakfast) heading, body | Accurate |
| offer heading, ¶1, ¶2 | Accurate. The plural lockers is noted; `season.gap` is quoted correctly |
| info (what is here) heading, ¶1, ¶2 | Accurate. It covers the humanizer's wording: every item traces to the quoted `description_long` / `facilities[]` strings. Pets are now `facilities[15]`, as they should be |
| info (getting here) heading, ¶1 | Accurate (3.3 mi ≈ 5.3 km, 1.3 mi ≈ 2.1 km) |
| spot, season, rooms, stayInfo (both rows) | Accurate. The room-row index order [0, 1, 2, 3, 5, 4] matches the dossier |
| **amenities[3]** | **Wrong.** It rests a singular label ("Private locker …") on the plural "private lockers & personal fridge in every room" and does not record the change of number. The row for the body (offer ¶1) says "Lockers kept plural", and this row contradicts that |
| amenities[0–2], [4–16], ratings, testimonials, contact, bookingLinks | Accurate. Keys and indexes are right (`contradictions[2]` WiFi, `contradictions[0]` parking) |
| **Deliberately not written: WiFi bullet** | **Wrong key for the quote.** "reliable fiber internet" is in `reviews.booking.note`, not in `contradictions[]`, which reads "Reliable Wi-Fi (Fiber Internet)". The 2.5/10 figure is correct |
| **Deliberately not written: bathroom bullet** | **Quoted string not in the dossier.** "open to the sky" quotes the retired copy, not the dossier, and nothing marks it as such. "got a roof" is correctly in `reviews.quotes[0]` |
| Deliberately not written: parking, restaurant, check-in, prices, season, breakfast times | Accurate |

### Verdict: **FAIL** (round 7, full-file re-check)

1 `unsourced` (`amenities[3]`, quantity) and 0 `contradicted`. It goes to the copywriter. There are no voice fails; the humanizer has notes only on `copyBlocks[4]`. In `sources.md`, the `amenities[3]` row is wrong, and the WiFi and bathroom bullets of "Deliberately not written" quote strings that are not in the key cited (WiFi) or not in the dossier at all (bathroom).

To pass: `amenities[3]` states the lockers only as the dossier does, without changing the number, or drops them; nothing else in the file changes; and the three `sources.md` rows are corrected.

Round count: base.md allows 2 rounds and says a third failing pass means the dossier cannot support a site. That premise does not hold here. The dossier does hold this fact (plural lockers, `description_long`); the fail is one word of copy, in a label that round 6 wrongly exempted. Whether to allow one more fix-and-check or to stop is Shahar's call, since the ledger records full round 3 as the last round.

## round 8 — final full-file check before full round 3, 2026-09-22

Reviewer: copyeditor 0.2.0 (runtime prompt from `node tools/prompt.mjs copyeditor`, all 654 lines read). Independent of the copywriter and the humanizer. Trigger: Shahar allowed one more copy pass (ledger 2026-09-22T17:59:54Z, "One more pass") for round 7's `amenities[3]` plural and the two wrong `sources.md` notes; the copywriter made that one-label pass (ledger 18:02:36Z). The humanizer did not run again.

Scope: **every sentence and every field** of `copy/en.json`, changed or not, at round 6/7 strictness. No framing exemptions: any time, duration, frequency, comparison, superlative, condition, season, quantity, outcome or sensory claim with no dossier key behind it is `unsourced`. `framing` is used only for headings that assert nothing. Guests' words stated in the business's voice are `unsourced` for the business. Every quote cited below was re-read in `dossier.json`.

### Scope check
- `en.draft.json` (copywriter) vs `en.json` (humanizer), by diff: three fields differ, exactly as expected.
  - `copyBlocks[3].body`: em dash → ", and" (humanizer, cleared in round 7). No fact changed.
  - `copyBlocks[4].body`: fragments → full sentences (humanizer, cleared in round 7). Re-traced clause by clause below (rows 29–39); nothing added.
  - `amenities[3].label`: "Private locker and personal fridge in every room" → "**Private lockers** and personal fridge in every room" (this pass, copywriter).
- Nothing else in the file changed since round 7. Script check: none of the retired clauses is back ("ten minutes", "before breakfast", "come back wet", "a private locker", "open to the sky", "with the season", "if you ask").
- Word sweep for facts that must not appear in the business's voice: "restaurant" occurs only in the `slug` identifier, "parking" only in `amenities[15]` "Bicycle parking" (Hostelworld, `facilities[17]`, not the car-parking contradiction), and "Sri Lankan / hoppers / fruit platter / changes every / best" only inside the verbatim testimonials of Elena and Mia.

### Fact audit (whole file)

| # | Field | Sentence / claim | Dossier key (words re-read) | Verdict |
|---|---|---|---|---|
| 1 | `businessName` | "KA Surf Hostel" | `business.name` "KA Surf Hostel" (Booking.com). Google's "and restaurant" is not used (`contradictions[3]`, `gaps[]` "restaurant") | sourced |
| 2 | `tagline` | "Surf, chill and feel at home in Ahangama" | `business.tagline` "Surf, Chill & Feel at Home in Ahangama" (the owner's own Hostelworld headline); only case and "&" → "and" | sourced |
| 3 | `languagesSpoken` | `["en"]` | `languages_spoken[0]` "English" (Booking.com) | sourced |
| 4 | `copyBlocks[0].heading` | "Five minutes from Kabalana Beach" | `location.distance_to_beach` "Kabalana Beach 450 yd / a 5-minute walk" | sourced ("walk" is restored in the body) |
| 5 | `copyBlocks[0].body` S1a | "A family runs this place" | `business.run_by` "a local family"; `description_long` "managed by a local family" | sourced ("local" dropped, which narrows nothing) |
| 6 | `copyBlocks[0].body` S1b | "and they set out to make you feel at home from the moment you arrive" | `description_long` "a local family who are passionate about making you feel at home from the moment you arrive". Stated as the family's aim ("set out to"), not as what a guest feels; the timing words are the owner's own | sourced |
| 7 | `copyBlocks[0].body` S2 | "Kabalana Beach is a five-minute walk." | `location.distance_to_beach` "a 5-minute walk" | sourced |
| 8 | `copyBlocks[0].body` S3 | "Dorms if you want the company, private rooms if you don't." | `room_types[0–5]` (3 dorm, 3 private); `description_long` "Dorms & Private Rooms: Options for every kind of traveler" and "Chill & Social Vibes: Mingle when you want, relax when you need"; `business.description` "strikes the ideal balance between social vibes and personal space". The company/solitude contrast is the owner's own | sourced (see the `sources.md` note: the row cites only the first of those keys) |
| 9 | `copyBlocks[1].heading` | "What guests say about the staff" | labels rows 10–15 and asserts nothing itself | framing |
| 10 | `copyBlocks[1].body` S1 | "\"Family\" is the word guests keep using." | `reviews.quotes[1]` Clara "The most amazing family", `[2]` Luzzi "The most amazing family running the business", `[6]` Nanet "The family is so so so friendly", `[7]` Elena "Great family owned hostel": 4 of 10 quotes, on both platforms. `business.run_by.note` "corroborated by many guest reviews calling it family-run" | sourced (frequency held by count + the harvester's note) |
| 11 | `copyBlocks[1].body` S2 | dengue in Kandy; the staff helped nurse her back to health with Ayurvedic medicines, on top of what the hospital was giving her | `reviews.quotes[9]` Mia (Hostelworld, 2026-02), re-read word for word: "I got dengue in Kandy and the staff at KA helped nurse me back to health with Ayurvedic medicines (on top of what the hospital was already giving me)". Attributed to her ("wrote that"), not spoken in the business's voice | sourced |
| 12 | `copyBlocks[1].body` S3a | "On Booking.com the staff get 9.9 out of 10" | `reviews.booking.categories.Staff` 9.9 | sourced |
| 13 | `copyBlocks[1].body` S3b | "the hostel's highest score there" (superlative) | Booking categories re-read: Staff 9.9 is the maximum; next Value for money 9.4; Cleanliness 9.3, Facilities 9.2, Comfort 9.2, Location 9.0, Free WiFi 2.5; overall 9.5 | sourced |
| 14 | `copyBlocks[1].body` S4a | "Hostelworld guests give them the same 9.9" | `reviews.hostelworld.categories.Staff` 9.9 | sourced |
| 15 | `copyBlocks[1].body` S4b | "only value for money and security do better, both at a full 10" (comparison) | Hostelworld re-read: Value for Money 10.0, Security 10.0; Atmosphere 9.8, Facilities 9.8, Cleanliness 9.7, Location 9.4. Nothing else reaches 9.9 | sourced |
| 16 | `copyBlocks[2].heading` | "Breakfast, every day" (frequency) | `description_long` "daily free healthy breakfast" | sourced |
| 17 | `copyBlocks[2].body` | "Rotis, fruit, pancakes and eggs" | `description_long` "(rotis, fruits, pancakes, eggs — vegan options available)" | sourced |
| 18 | `copyBlocks[2].body` | "with vegan options" | `description_long` "vegan options available" | sourced |
| 19 | `copyBlocks[3].heading` | "Dorms and private rooms" | `description_long` "Dorms & Private Rooms"; `room_types[]` | sourced |
| 20 | `copyBlocks[3].body` S1 | "Mixed, female and male dormitories with bunk beds, plus double rooms and deluxe doubles." | `room_types[0–2]` "Bunk Bed in Mixed / Female / Male Dormitory Room"; `[3]` "Double Room"; `[4]`, `[5]` "Deluxe Double Room" ×2 | sourced. Re-opened deliberately this round: the plurals name room *categories*, in the owner's own plural ("Dorms & Private Rooms"), and state no count of rooms. That is why they are not the `amenities[3]` case, where "in every room" attached a number to each guest |
| 21 | `copyBlocks[3].body` S2a | "Every room has air conditioning and a fan" | `description_long` "A/C & fan in every room"; `facilities[22]` "A/C and fan in every room" | sourced |
| 22 | `copyBlocks[3].body` S2b | "[every room has] private lockers" | `description_long` "private lockers & personal fridge in every room" (plural, as the owner writes it); `facilities[16]` "free security lockers" | sourced |
| 23 | `copyBlocks[3].body` S2c | "and a personal fridge" | `description_long` "personal fridge in every room"; `facilities[23]` "personal fridge in every room" | sourced |
| 24 | `copyBlocks[3].body` S3a | "The bathrooms are modern" | `description_long` "modern bathrooms with hot showers" | sourced (no outdoor/open-air claim; guests' words stay in `testimonials[1]`) |
| 25 | `copyBlocks[3].body` S3b | "and the showers are hot." | `description_long` "hot showers"; `facilities[24]` "hot showers" | sourced |
| 26 | `copyBlocks[3].body` S4a | "Rates change with the dates" | `booking.path.note` "live inventory on Booking.com, Hostelworld and Agoda"; `gaps[]` "offers" "nightly rates are live, dated inventory on the OTAs". No season claim (`season.value` null) | sourced |
| 27 | `copyBlocks[3].body` S4b | "and the booking links below show what is actually free." | `booking.path.note` "live inventory"; `booking.engine_url`; `booking.other_engines` | sourced ("below" depends on the template) |
| 28 | `copyBlocks[4].heading` | "What is here" | asserts nothing itself | framing |
| 29 | `copyBlocks[4].body` S1a | "There's a green garden and a chill zone" | `description_long` "beautiful green garden & chill zone"; `facilities[4]` "garden" | sourced ("beautiful" dropped) |
| 30 | `copyBlocks[4].body` S1b | "and free filtered water you can refill any time." | `description_long` "free filtered water — refill anytime"; `facilities[21]` "free filtered water" | sourced (the time claim is the owner's "anytime") |
| 31 | `copyBlocks[4].body` S2a | "Laundry service is available" | `description_long` "laundry service available"; `facilities[19]` "laundry service" | sourced |
| 32 | `copyBlocks[4].body` S2b | "and there's a minimarket on site." | `facilities[12]` "minimarket on site" | sourced |
| 33 | `copyBlocks[4].body` S3a | "You can rent a scooter" | `description_long` "cheap scooter rental"; `facilities[20]` "scooter rental (surf rack available)" | sourced ("cheap" dropped, which removes a claim rather than adding one) |
| 34 | `copyBlocks[4].body` S3b | "and it can come with a surf rack." | `description_long` "(also with surf rack possible)"; `facilities[20]` "(surf rack available)". "Can come with" = "possible"; no condition added | sourced |
| 35 | `copyBlocks[4].body` S4a | "Luggage storage" | `facilities[8]` "luggage storage" | sourced |
| 36 | `copyBlocks[4].body` S4b | "and lockers, too." | `facilities[16]` "free security lockers" | sourced ("free" dropped) |
| 37 | `copyBlocks[4].body` S5 | "Reception is open 24 hours." | `hours_note` "Reception 24 hours"; `facilities[10]` "24-hour front desk"; `description_long` "24/7 reception" | sourced |
| 38 | `copyBlocks[4].body` S6 | "Pets are welcome on request at no charge." | `facilities[15]` "pets allowed on request, no extra charge" | sourced ("welcome" for "allowed" is warmth; the "on request" condition is kept) |
| 39 | `copyBlocks[4].body` S7 | "Children are not accommodated." | `house_rules[1]` "Children are not allowed; no cots or extra beds" | sourced |
| 40 | `copyBlocks[5].heading` | "Getting here" | asserts nothing itself | framing |
| 41 | `copyBlocks[5].body` S1 | "Ahangama, a five-minute walk from Kabalana Beach." | `location.address.value` "80650 Ahangama, Sri Lanka"; `distance_to_beach` "a 5-minute walk" | sourced |
| 42 | `copyBlocks[5].body` S2a | "Koggala Airport is about 5 km away" | `location.nearby` "Koggala Airport": "3.3 mi" = 5.31 km | sourced |
| 43 | `copyBlocks[5].body` S2b | "Ahangama railway station is a little over 2 km." | `location.nearby` "Ahangama Railway Station": "1.3 mi" = 2.09 km | sourced |
| 44 | `copyBlocks[5].body` S3 | "The property arranges a shuttle." | `facilities[13]` "shuttle service" (Booking.com); `facilities[18]` "airport transfers" (Hostelworld). No price and no free claim | sourced (rounds 6–7 note stands: standing after the station, it can be read as a station pickup, which no key states — wording, not a new fact) |
| 45 | `spot` | "Kabalana: a sandy beach break for beginners and intermediates" | `location.spot` (thesurfatlas.com, third party) "sandy beach break for beginners and intermediates"; written about the wave, not as the business's claim | shared-context |
| 46 | `spot` | "and The Rock, a reef A-frame for advanced surfers." | `location.spot` "with The Rock reef A-frame for advanced surfers"; the "advanced" qualifier kept, no swell condition added | shared-context |
| — | `season` | `null` | `season.value` null, gap "not published by the business" | no claim (correctly empty) |
| 47–52 | `rooms[0–5]` | 3 dorm bunk rows ("1 bunk bed"); Double room / 1 extra-large double bed; Deluxe double room / 1 extra-large double bed; Deluxe double room / 1 single bed | `room_types[0]`, `[1]`, `[2]`, `[3]`, `[5]`, `[4]`, re-read row by row. `beds` copied from the brackets; the dorm "1 bunk bed" comes from the singular "Bunk Bed" in each label | sourced ×6 |
| 53 | `stayInfo.checkInFrom/To` | 13:00–23:00 | `hours_note` "check-in 13:00–23:00" (Hostelworld). `contradictions[1]` (Booking: "available 24 hours") is unresolved; the copy follows the harvester's own lean, "Hostelworld's specific window is the more likely truth", and `sources.md` records the choice | sourced (not a silent resolution; stays an owner item) |
| 54 | `stayInfo.checkOutTo` | 13:00 | `hours_note` "check-out until 13:00"; same contradiction, same record | sourced (same note) |
| 55 | `stayInfo.note` S1 | "Reception is open 24 hours." | `hours_note` "Reception 24 hours"; `facilities[10]` | sourced |
| 56 | `stayInfo.note` S2 | "Children are not accommodated, and cots and extra beds are not available." | `house_rules[1]` "Children are not allowed; no cots or extra beds" | sourced |
| 57–59 | `amenities[0–2]` | Free breakfast · Free WiFi · Air conditioning and a fan in every room | `facilities[2]` "free breakfast (continental, full English/Irish)" + `description_long` "daily free healthy breakfast"; `facilities[0]` "free WiFi (fiber, all areas)" — existence only, no fibre or reliability claim (`contradictions[2]`); `facilities[22]` | sourced ×3 |
| 60 | `amenities[3]` | "**Private lockers** and personal fridge in every room" | `description_long` "private lockers & personal fridge in every room" — the owner's own construction, plural lockers and singular fridge both kept inside his own "in every room"; `facilities[16]` "free security lockers"; `facilities[23]` "personal fridge in every room". **Round 7's fail is fixed**, and the label now agrees with `copyBlocks[3]` (row 22) | sourced |
| 61–73 | `amenities[4–16]` | Hot showers · Garden and chill zone · Free filtered water · Scooter rental (note "surf rack available") · Laundry service · Minimarket on site · Luggage storage · Tour desk · 24-hour reception · 24-hour security · Airport transfers · Bicycle parking · Pets allowed on request (note "no extra charge") | `facilities[24]`; `description_long` "beautiful green garden & chill zone" + `facilities[4]`; then `facilities[21]`, `[20]`, `[19]`, `[12]`, `[8]`, `[9]`, `[10]`, `[11]`, `[18]`, `[17]`, `[15]`, each re-read against its index. "Bicycle parking" (Hostelworld) is not the car-parking contradiction | sourced ×13 |
| 74–76 | `ratings[0–2]` | Hostelworld 9.8/10 (66) · Booking.com 9.5/10 (38) · Google 4.8/5 (42) | `reviews.hostelworld` 9.8/10, 66; `reviews.booking` 9.5/10, 38; `reviews.google` 4.8, 42. Each score carries its count, scale and platform; the two URLs equal the dossier `source_url`s, and no URL is written for Google | sourced ×3 |
| 77–81 | `testimonials[0–4]` | Clara (booking) · Elena (hostelworld, 2026-03) · Mia (hostelworld, 2026-02) · Wolfgang (booking) · Saketh (hostelworld, 2026-02) | `reviews.quotes[1, 7, 9, 3, 8]`: script string-equality re-run, **5/5 verbatim**. Platform from each quote's `source_url`, dates equal where given and absent where the dossier has none. Authors shortened to first name + country (gender and age band dropped), as the schema allows | sourced ×5 |
| 82 | `contact.phone` | "+94773746053" | `contact.phone` (Google), E.164 valid. No WhatsApp is written (`contact.whatsapp` is a dossier gap) | sourced |
| 83 | `contact.address` | "207/A Welahangoda, 80650 Ahangama, Sri Lanka" | `location.address.note` "Google '207/A welahangoda, Ahangama'" (capitalised) + `location.address.value` "80650 Ahangama, Sri Lanka"; the scout's Google record in `candidates.json`; Shahar's decision (ledger 2026-09-22T13:47:15Z, verified in round 4) | sourced |
| 84–86 | `bookingLinks[0–2]` | "Check dates on Hostelworld / Booking.com / Agoda" + URLs | `booking.other_engines[0]`, `booking.engine_url`, `booking.other_engines[1]`, character-identical and all `https://`; "check dates" rests on `booking.path.note` "live inventory" | sourced ×3 |

**Counts (86 claim rows):** `sourced` 81 · `shared-context` 2 · `framing` 3 (headings only) · **`unsourced` 0** · **`contradicted` 0**.

No recorded contradiction is resolved silently: parking is not written either way, check-in follows the harvester's stated lean and is recorded, the WiFi fibre claim is absent, and the Google "and restaurant" name is not used. The breakfast type conflict (Booking's "continental, full English/Irish" against the owner's list) is not written either way.

### Failing sentences

None. No `unsourced` and no `contradicted` row in the file.

### Voice audit (per block)

| Block | Rhythm | No triads | No padding | Concrete | Honest limit | Register | Aloud | Score |
|---|---|---|---|---|---|---|---|---|
| `tagline` | — | the owner's own headline | yes | yes | — | owner's | yes | clean (owner's words) |
| `copyBlocks[0]` intro | yes (long, short, fragment) | yes | yes | yes | — | owner's (S1 sits close to his own line) | yes | 8/8 |
| `copyBlocks[1]` staff | yes | yes | yes | yes | yes (not top on Hostelworld) | yes | yes | 8/8 |
| `copyBlocks[2]` breakfast | single fragment | yes | yes | yes | — | yes | yes | clean |
| `copyBlocks[3]` rooms | yes | yes | yes | yes | yes (no prices shown) | yes | yes | 8/8 |
| `copyBlocks[4]` what is here | three consecutive sentences share one shape, "X, and Y" | yes | "Laundry service is available" is listing register | yes | yes (children) | yes | yes | 7/8, notes only |
| `copyBlocks[5]` getting here | yes | yes | yes | yes | — | yes | yes | 8/8 |
| `spot` | single sentence | yes | yes | yes | yes (The Rock is for advanced surfers) | surf-guide | yes | clean |

No voice fail. The humanizer did not run this pass, so round 7's two notes on `copyBlocks[4]` stand unchanged and unfixed: the repeated ", and" shape across three sentences, and the brochure-flat "Laundry service is available". Neither is a fail; both are for the humanizer whenever this copy is next touched. `amenities[3]` is a label, not prose, and reads as the owner writes it.

### Completeness (`beach_lodging`)
Must-haves that are copy fields: `rooms[]` 6 rows and `bookingLinks[]` 3 rows — filled (photos are not a copy field). Should-haves `stayInfo`, `amenities[]` (17), `ratings[]` (3), `testimonials[]` (5) and `spot` — filled. `season` is `null` with its reason on record (dossier gap, and `sources.md` carries the row). Nothing is padded; every block earns its length from a dossier key.

Schema constraints re-checked by script against `schemas/site-content.md`: every `label`, `heading`, `body`, `note`, `quote` and `address` is inside its character limit (`amenities[3]` is 48 of 60), `contact.phone` matches the E.164 pattern, all `bookingLinks[].url` are `https://`, and the `copyBlocks[].slot` values (intro, about, about, offer, info, info) are all in the enum.

Open items, unchanged and not copy fails: `contact.whatsapp` is absent because the dossier has no published WhatsApp — the schema requires it, so it stays an open item for the Payload seed; `businessType` is absent from `en.json` (the deployer seeds it from `dossier.businessType` "beach_lodging", since the schema default would be `surf_school`); `copywriter_version` and `humanizer_version` still read "0.1.0" while `run.yaml` pins 0.2.0 and the ledger records 0.2.0 runs.

### Duplication across fields (notes, as instructed)
- Dengue: `copyBlocks[1]` vs `testimonials[2]` (Mia). Accepted by Shahar.
- **24-hour reception**: word for word, "Reception is open 24 hours.", in both `copyBlocks[4]` and `stayInfo.note`, and again as `amenities[12]`. Noted in round 7; unchanged.
- **Lockers**: three places — `copyBlocks[3]` "private lockers", `copyBlocks[4]` "lockers, too", `amenities[3]`. They now agree on number, which was the round-7 fail; the repetition itself remains. Noted in round 7; unchanged.
- Children not accommodated: `copyBlocks[4]`, `stayInfo.note`.
- Pets: `copyBlocks[4]`, `amenities[16]`.
- A/C + fan, fridge, hot showers: `copyBlocks[3]` vs `amenities[2–4]`.
- Garden, filtered water, laundry, minimarket, scooter + surf rack, luggage storage: `copyBlocks[4]` vs `amenities[5–10]`.
- Shuttle (`copyBlocks[5]`) vs "Airport transfers" (`amenities[14]`).
- Five-minute walk to Kabalana: `copyBlocks[0]` heading and body, and `copyBlocks[5]`.
- Room list: `copyBlocks[0]` S3 and `copyBlocks[3]` S1 restate `rooms[]` (schema "No duplication").

### `sources.md` rows checked against the dossier
Method: every double-quoted string in the "Rests on" column and in "Deliberately not written" was extracted by script and searched in `dossier.json` (object keys included in the haystack), then every `facilities[n]` / `room_types[n]` / `house_rules[n]` / `reviews.quotes[n]` / `contradictions[n]` index citation was checked against the value at that index. Result: **42 indexed citations verified, 0 mismatches; every quoted string found verbatim** (the only regex misses were nested quotes inside parentheses, e.g. `"&" written as "and"`). Quotes in the "Paragraph" column were checked against `en.json` separately.

| Row | Result |
|---|---|
| businessName, tagline, languagesSpoken | Accurate |
| intro heading, ¶1 | Accurate. "managed by a local family who are passionate about making you feel at home from the moment you arrive" is verbatim in `description_long`, and the row states that the copy gives it as the family's aim |
| intro ¶2 | Accurate but **incomplete**: it cites `room_types[0–5]` and "Dorms & Private Rooms: Options for every kind of traveler", which carry the two room kinds but not the company/solitude contrast the sentence draws. The keys that do carry it — `description_long` "Mingle when you want, relax when you need" and `business.description` "the ideal balance between social vibes and personal space" — are not named. The sentence is sourced (row 8); the row under-cites it |
| about (staff) heading, ¶1, ¶2 | Accurate. The four "family" quotes are at `reviews.quotes[1, 2, 6, 7]` as cited, Mia's sentence is verbatim at `[9]`, and the category figures match both platforms |
| about (breakfast) heading, body | Accurate, including the note that the `facilities[2]` "continental, full English/Irish" conflict is recorded nowhere in `contradictions[]` and is written neither way |
| offer heading, ¶1, ¶2 | Accurate. "Lockers kept plural, as the owner writes them" is now true of the body and the label alike; the bathroom note correctly attributes "the outdoor bathroom got a roof" to `reviews.quotes[0]` and "the whole outdoor thing" to `[7]`; `season.value` is quoted correctly |
| info (what is here) heading, ¶1, ¶2 | Accurate. Every item in the humanizer's re-voiced sentences traces to the quoted `description_long` / `facilities[]` string; pets rest on `facilities[15]`, children on `house_rules[1]` |
| info (getting here) heading, ¶1 | Accurate (3.3 mi ≈ 5.3 km, 1.3 mi ≈ 2.1 km; `facilities[13]` and `[18]`) |
| spot, season, rooms, stayInfo (both rows) | Accurate. The room index order [0, 1, 2, 3, 5, 4] matches the dossier, and the check-in row records the unresolved `contradictions[1]` and the lean it follows |
| **amenities[3]** | **Corrected and now accurate.** It rests the label on `description_long` "private lockers & personal fridge in every room", states that the owner's number is kept on both sides, and points at the matching `copyBlocks[3]`. Round 7's fault is gone |
| amenities[0–2], [4–16], ratings, testimonials, contact.phone, contact.address, bookingLinks | Accurate. Indexes and keys all verified; `contradictions[2]` (WiFi) and `contradictions[0]` (parking) are cited correctly |
| **Deliberately not written: WiFi bullet** | **Corrected and now accurate.** "Reliable Wi-Fi (Fiber Internet)" is quoted as `contradictions[2]` writes it, and "reliable fiber internet" is attributed to `reviews.booking.note`, where it actually sits. The 2.5/10 figure is in both |
| **Deliberately not written: bathroom bullet** | **Corrected and now accurate.** "Open to the sky" is now marked as the copy's own retired phrasing rather than presented as a dossier quote, and Maximilian's "the outdoor bathroom got a roof so its protected but never humid" is verbatim at `reviews.quotes[0]` |
| Deliberately not written: parking, restaurant, check-in, prices, season, breakfast times | Accurate |
| Minor, not a fault | The `bookingLinks` row compresses the three labels into "Check dates on Hostelworld / Booking.com / Agoda"; the three labels themselves are in `en.json` exactly |

One note stands for whoever writes the next dossier: `gaps[]` entries and `business.run_by.note` carry no `source_url` of their own, so rows that lean on them lean on the harvester's word. Nothing in this copy rests on them alone.

### Verdict: **PASS** (round 8, full-file check)

0 `unsourced`, 0 `contradicted`, 81 `sourced`, 2 `shared-context`, 3 `framing`. Round 7's single fail (`amenities[3]`) is fixed at the source's own number, and all three `sources.md` rows it named are corrected and verified against the dossier. The voice audit is clean, with two standing notes on `copyBlocks[4]` for the humanizer. Required fields for `beach_lodging` are covered, and every schema limit holds. The copy is ready for the round-3 build.

Round count: this is the eighth pass. It runs on Shahar's explicit allowance (ledger 2026-09-22T17:59:54Z), which waives base.md's third-pass rule for this one label because the dossier holds the fact.
