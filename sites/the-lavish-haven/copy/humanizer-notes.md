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
