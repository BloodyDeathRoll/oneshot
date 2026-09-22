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
