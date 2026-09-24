# humanizer notes — ka-surf-hostel-and-restaurant (en)

## 2026-09-21 — run 2026-09-ahangama-02, humanizer 0.2.0 — `copyBlocks[1]` (about, "Run by a local family") only

Scope: the one block the copywriter re-drafted after 4c. Draft kept byte for byte as `en.draft.json`.

Changed
- Para 2, sentence 1: "Staff is the hostel's highest score on Booking.com: 9.9 out of 10." → "On Booking.com the staff get 9.9 out of 10, the hostel's highest score there." Removes the colon-reveal (tell 10) and the stiff "Staff is … score" construction.
- Para 2, sentence 2: "Hostelworld guests give the staff the same 9.9, behind only value for money and security, both at 10." → "Hostelworld guests give them the same 9.9, and only value for money and security do better, both at a full 10." Drops the repeated "the staff" and the stacked-comma list rhythm; "a full 10" states the 10.0 plainly.

Left alone
- Heading and para 1. Para 1 already reads as spoken: one plain claim, then one guest's specific story (dengue, Kandy, Ayurvedic medicine, the hospital), attributed to her. No triad, no padding words, no tell phrases.

Facts: unchanged and in the same paragraphs (local family; guests say "family"; dengue story as the guest's account; Booking staff 9.9/10 = highest category; Hostelworld staff 9.9, below Value for Money 10.0 and Security 10.0). Checked against `dossier.json` `reviews.booking.categories`, `reviews.hostelworld.categories` and Mia's quote. `sources.md` needed no change.

Could not fix without a fact: nothing.

## 2026-09-21 (second pass) — run 2026-09-ahangama-02, humanizer 0.2.0 — `copyBlocks[1]` (about, "What guests say about the staff") only

Scope: the copywriter's re-draft after round 2 of 4c — the opening "KA is managed by a local family" was removed (it duplicated `copyBlocks[0]`) and the heading changed from "Run by a local family". Only the new heading, the new opening sentence and their join were in scope. Draft kept byte for byte as `en.draft.json` (`cmp`: identical).

Result: **block left unchanged.**

Why
- Heading "What guests say about the staff": plain, says what the block holds (guests' word, one guest's story, the guests' category scores). No tell phrase, no colon, no triad.
- New opening '"Family" is the word guests keep using.': a short, spoken sentence that now stands on its own and reads as the guests' word for the staff, which the heading sets up. It is followed by the long dengue sentence, so the short-then-long rhythm survives the cut. "One of them" still resolves to "guests". No re-add of who runs the place: that fact stays only in `copyBlocks[0]`.
- Rest of the block (already humanized and passed at 4c round 2) not touched.

Facts: unchanged (guests use "family"; dengue story as Mia's account; Booking staff 9.9/10 = highest category; Hostelworld staff 9.9, below Value for Money 10.0 and Security 10.0). Checked against `dossier.json` `reviews.quotes[]` (Clara, Luzzi, Nanet, Elena, Mia). `sources.md` rows "about ¶1 · para 1" / "para 2" already describe the new heading and opening: no change needed.

Could not fix without a fact: nothing.

## 2026-09-22 — run 2026-09-ahangama-02, humanizer 0.2.0 — `copyBlocks[2].body` (breakfast), `spot`, `contact.address` only

Scope: the copywriter's re-draft after critic full · round 1 (HF-1: breakfast "more often than anything else" and spot "when the swell is up" had no dossier entry; address respelled per Shahar). Draft kept byte for byte as `en.draft.json` (`cmp`: identical).

Result: **all three fields left unchanged.**

Why
- Breakfast body: a long sentence built on concrete nouns (rotis, hoppers, pancakes, eggs, a fruit platter), then a short one that hands the daily change to one guest. Uneven length, no padding, no tell phrase, no triad. The colon introduces a real list, not a reveal. Rewording the second sentence risked sliding it back into the business's voice.
- Spot: reads as a surfer's label for the field ("the wave this business sits on"). It keeps "beginners and intermediates" and "advanced surfers", carries no swell condition, and stays close to `location.spot`. The colon here names the spot and then what it holds; any looser rewording ("alongside", "go to") would add a position or behaviour the source does not give.
- `contact.address`: postal string, not touched.

Facts: unchanged (breakfast included, Sri Lankan, rotis/hoppers/pancakes/eggs/fruit platter, vegan option; daily change as Elena's account; Kabalana sandy beach break for beginners and intermediates; The Rock reef A-frame for advanced surfers). `sources.md` rows "about ¶2" and "spot" already match: no change needed.

Out of scope, flagged: the heading of `copyBlocks[2]`, "Breakfast changes every morning", still states the daily change as the business's claim, while the body and `sources.md` ("no frequency claim") now give it as one guest's account. For the copywriter.

Could not fix without a fact: nothing.

## 2026-09-22 — run 2026-09-ahangama-02, humanizer 0.2.0 — `copyBlocks[2]` heading and body (breakfast), after 4c round 4

Scope: the copywriter's re-draft of the breakfast facts after the copyeditor's round 4 fail. `copyBlocks[2].heading`, `copyBlocks[2].body`; `amenities[0]` ("Free breakfast") read but not touched, it is a list label. Draft kept byte for byte as `en.draft.json` (`cmp`: identical).

Result: **both fields left unchanged.**

Why
- Heading "Breakfast, every day": short, spoken, says what the block holds. "Every day" is the owner's "daily", no claim about the menu changing. No colon, no tell phrase.
- Body "Rotis, fruit, pancakes and eggs, with vegan options.": a fragment of concrete nouns, four items then the vegan note, which is how a person would say it at the counter. No padding, no triad, no marketing verb. Anything longer would need a fact the owner's list does not give.

Facts: unchanged, and only the owner's (`business.description_long`: "rotis, fruits, pancakes, eggs — vegan options available", "daily"). Checked by script: no "Sri Lankan", "hoppers", "platter", "changes" or "free" in the block; "free" stays only in `amenities[0]`. `sources.md` rows "about ¶2 · heading", "about ¶2 · body" and "amenities[0]" already match: no change needed.

Could not fix without a fact: nothing.

## 2026-09-22 — run 2026-09-ahangama-02, humanizer 0.2.0 — `copyBlocks[0]`, `[3]`, `[4]` bodies, after 4c round 6

Scope: the copywriter's fix of the six round-6 failing clauses, plus the copyeditor's round-6 voice note on `copyBlocks[4]`. Strict facts this round: no new time, duration, frequency, condition, season, quantity, outcome or sensory claim. Draft kept byte for byte as `en.draft.json` (`cmp`: identical).

Result: `copyBlocks[0].body` **unchanged**; `copyBlocks[3].body` and `copyBlocks[4].body` changed.

Why
- Intro (`[0]`): one long sentence carrying the family's aim ("from the moment you arrive", kept as their aim), a short one for the walk, then the dorms/private fragment. Uneven, spoken, no tell phrase. Left alone.
- Offer (`[3]`): only the last sentence. The em dash (tell 10) became ", and". Nothing else touched; "private lockers" stays plural.
- Info (`[4]`): the run of fragments ("Laundry. A minimarket on site.") read like the amenities list pasted in as prose, and the paragraph closed on a three-item list. Rewritten as full sentences of mixed length, keeping one fragment ("Luggage storage and lockers, too.") and ending on a short plain line about reception instead of a list. "Laundry" is now "Laundry service", the source's own words (`facilities[19]`, `description_long`). The surf rack is "can come with", matching the source's "possible" / "available", with no condition.

Facts: identical to the draft, checked field by field: garden, chill zone, free filtered water refillable any time, laundry service, minimarket on site, scooter rental, surf rack, luggage storage, lockers, 24-hour reception, pets on request at no charge, no children; room list, A/C and fan, private lockers, personal fridge, modern bathrooms, hot showers, rates change with the dates, booking links show availability. No fact moved between paragraphs, so `sources.md` needs no change (its info ¶1 row already lists "laundry service available"). Script: only these two bodies differ from `en.draft.json`; none of "ten minutes", "before breakfast", "come back wet", "open to the sky", "season" (outside the null `season` key), "if you ask", "a private locker" appears.

Could not fix without a fact: nothing.

## 2026-09-23 — run 2026-09-ahangama-02, humanizer 0.2.0 — offer last sentence ("actually available") and `contact.address`

Scope: `copyBlocks[3].body` last sentence, voice only; `contact.address` read, not touched (fixed rule string, identical in draft and `en.json`: "207/A Welahangoda, Ahangama 80650, Sri Lanka").

Result: **unchanged.** `en.json` already reads "Rates change with the dates, and the booking links below show what is actually available." (the round-6 ", and" in place of the draft's em dash kept). "Actually available" is how a person says it; plain, no tell phrase, no padding.

Facts: unchanged. Diff against `en.draft.json` shows only the three earlier humanizer edits (offer em dash, info body, `amenities` locker label); nothing new.

Could not fix without a fact: nothing.
