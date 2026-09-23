# humanizer notes — the-lavish-haven · en

## Pass of 2026-09-23 · humanizer 0.2.0 · field-scoped

Scope: only the two fields the copywriter changed on 2026-09-23, `spot` (new second sentence) and `closing` (new field, schema v0.5). No other field was read for rewriting or touched. The only other change to `en.json` is `humanizer_version` 0.1.0 → 0.2.0. `en.draft.json` is left as the copywriter's draft.

Result: **both lines left unchanged.** Fact set identical to the draft; `sources.md` still accurate line for line (nothing moved, so no edit there).

### `spot`, sentence 2: "The beach is two minutes from the hotel, on foot." (unchanged)

- No tell-list patterns: no triad, no padding, no marketing verb, no category noun.
- The trailing ", on foot" reads like something a person adds after the fact. It also breaks up the rhythm after the long first sentence (long, then short), which is what base.md asks for.
- The explicit subject "The beach" is needed. A smoother "It's a two-minute walk" would let "it" point back to The Rock reef, whose distance has no source (hard constraint 3). Keep the noun.
- The phrasing differs from intro ¶1's "Kabalana Beach is a two-minute walk", so it is not a word-for-word echo.
- Fact checked against `location.distance_to_beach` ("Kabalana Beach is a 2-minute walk", Booking). Nothing added.

### `closing`: "Rates move with the dates. Booking.com and Agoda show what is free." (unchanged)

- Two short, plain sentences with concrete nouns (the two platform names) and nothing generic. It admits a limit: there is no fixed price. base.md counts that as the most credible kind of sentence.
- Facts checked: `gaps[]` offers (live dated OTA inventory, no price list) and `booking.path.note` ("live inventory on Booking.com and Agoda"). Nothing added.

### Noted, not changed (out of scope for this pass)

- **Repetition of the distance.** "Two minutes" now appears three times: in `tagline`, intro ¶1 and `spot`. Each one is sourced and the wording differs, but a reader who scrolls the whole page will notice. If the page reads repetitive once it is laid out, the cheapest fix is to drop it from intro ¶1, since `tagline` and `spot` each need it. That decision belongs to the copywriter or the copy editor.
- **"what is free"** in `closing` (and "the booking links show what is free" in the offer block) could be read as "free of charge" rather than "available". This is a clarity point for the copy editor (4c), not a generated-text tell, so it is left alone here.
- **The rate fact appears twice**, in `closing` and the offer block. `sources.md` says this is by design, because `closing` sits beside the last booking action.

### Could not fix without a fact

None.

## Round 3 · 2026-09-23 · humanizer 0.2.0 · after copywriter round 3

Input: `en.draft.json` (copywriter round 3, identical to `en.json` on arrival). Scope: voice only, wherever the round-3 cuts left fragment runs or awkward joins. Every fact stays in the paragraph it was in, with the same scope, qualifier and charge; no quote touched; no heading, data field, `tagline`, `spot`, `closing`, `stayInfo` or `contact.*` touched. `humanizer_version` null → 0.2.0.

Round 2's two voice fails ("free" in the availability sense) arrived already fixed by the copywriter ("available", Shahar's ruling); nothing left to do there.

### Changes

1. **`copyBlocks[1]` ¶2.** "Guests there score it…" → "Booking.com guests score it 9.7 out of 10 for cleanliness and the same for comfort, and 9.4 for staff, across 34 reviews." After the paragraph break "there" pointed at nothing; naming the platform fixes it. "The same for comfort" breaks the even score-list rhythm. Figures unchanged.
2. **`copyBlocks[2]`.** "…until they found this one, and stayed over a month" → "…before finding this one, then stayed over a month". "Another extended their stay instead of going to another hotel" → "Another extended their stay rather than go on to a different hotel" (removes the another/another echo). Still two guests, no cause, no cancellation, no count.
3. **`copyBlocks[3]` ¶1.** The fragment "Superior kings." folded into one sentence: "There are king rooms with a balcony or a garden view, superior kings, and a deluxe king on the ground floor with a private patio and a pool view. Family studios and suites sleep four, and the two-bedroom suite sleeps five." Same nine types, same sleeps figures, "pool view" kept (not "onto the pool"). ¶2 and ¶3 unchanged.
4. **`copyBlocks[4]` ¶1.** Four fragments ("An outdoor pool… A restaurant serving… A coffee house on site. A spa and wellness centre.") → three sentences: "The outdoor pool is in the middle of the hotel and open all year. The restaurant serves breakfast with local specialities and fresh pastries, plus Chinese, Indian and Italian dishes. There’s a coffee house on site too, and a spa and wellness centre." No service hours added.
5. **`copyBlocks[4]` ¶2.** "For families: family rooms, an outdoor play area, and kids’ meals and babysitting at an extra charge." → "For families there are the family rooms and an outdoor play area. Kids’ meals and babysitting cost extra." The charge now reads as the limit it is; still applies to both, nothing else.
6. **`copyBlocks[5]` (all fragments).** ¶1 → "The front desk is staffed 24 hours, with private and express check-in. Parking is free and private, but you need to reserve it. There’s an airport shuttle as well." ("staffed" matches `stayInfo.note`; no parking location; no airport named, still apart from Koggala.) ¶2 → "Housekeeping is daily. There is laundry, dry cleaning and ironing, bicycles to rent, non-smoking rooms, and facilities for guests with disabilities." ("non-smoking rooms", not "the rooms are non-smoking": scope kept.)

### Left as is

- `copyBlocks[0]` intro, `copyBlocks[1]` ¶1 (the two short quotes read fine and stay verbatim), `copyBlocks[3]` ¶2–¶3: no tell.
- Headings, incl. "Pool, restaurant, spa" (round 2 note, triad): a heading carries its own `sources.md` row; changing it is not worth reopening that for a note-level item.

### For the copywriter / copyeditor (not changed here)

- `sources.md` quotes three sentences verbatim that now read differently: staying ¶1 S1 and S2, pool ¶1 S1. Keys and facts are unchanged, so the rows are still true in substance, but the quoted text is stale. I was scoped to `en.json` and these notes, so I left `sources.md` alone.
- `copywriter_version` in `en.json` is "0.3.0"; `run.yaml` pins copywriter 0.3.1. Not mine to change.

### Could not fix without a fact

None.

## Round 4 · 2026-09-23 · humanizer 0.2.0 · after copywriter round 4

Input: `en.json` with one field changed, `copyBlocks[0].heading` "Off the main road, over the surf" → "Among cafés and restaurants" (cut as unsourced, Shahar). Scope: that heading's voice against the intro body. Facts fixed; nothing else read for change.

### Changes

None. `en.json` left as it arrived.

### Why it stays

- Plain, concrete, no marketing verb, no triad, no padding. A place-name kind of heading, which suits a short intro.
- It does echo the body's first words ("Cafés and restaurants surround the hotel…"). That is a mild repetition, not a generated-text tell, and any rewrite that avoids it would either need a new claim or drop the one sourced fact the heading carries (`sources.md` row `copyBlocks[0]` intro). Left alone.

### For the copywriter / copyeditor (not changed here)

- If the heading/body echo reads flat once laid out, the cheaper fix is in the body (e.g. open ¶1 on the fruit stand or the 9.6 location score) rather than the heading. Their call.

### Could not fix without a fact

None.
