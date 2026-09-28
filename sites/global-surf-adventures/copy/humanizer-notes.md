# humanizer notes — global-surf-adventures · en

## Pass of 2026-09-28 · humanizer 0.2.0 · run 2026-09-globalsurf-01

Input: `en.json` from copywriter 0.3.3, kept unchanged as `en.draft.json`. Output: `en.json` with three paragraphs rewritten and `humanizer_version` 0.2.0 added. `sources.md` quoted rows updated to match. Every fact stays in the same paragraph with the same scope, charge and qualifier. No quote, heading, data field (`lessons`, `rooms`, `amenities`, `stayInfo`, `ratings`, `testimonials`, `contact`, `bookingLinks`), `tagline`, `spot`, `season` or `closing` was touched.

**Owner prose left alone:** intro ¶1–¶2, "A day at the camp" and the lodge's ¶1 are the owner's own words from globalsurf.com, kept as the copywriter left them. They have tells ("experience a perfect blend", "unique, holistic stay", "extraordinary surrounds", "epic", the triad in "surf, yoga & wellness, local culture, and nature"), but they are in the owner's voice and register, so they are the owner's to change.

### Patterns found (in the copywriter's own sentences)

- Mechanical sentences built around a rule: 2 ("the package price is the whole price"; "reserving it just for yourselves … ; the booking engine shows"), plus one semicolon splice.
- A triad: 1 ("a pool …, a bar and a laid-back common area").
- The same "X is N metres away" frame used twice in a row: 1 pair.
- Passive or stiff phrasing: 2 ("An airport shuttle runs at an extra charge"; "Across 80 reviews there, guests score…").
- Padding words, marketing verbs, category nouns: none in the copywriter's own sentences.

### Changes

1. **`copyBlocks[1]` ¶2.** "With a bed in the four-bed mixed dorm, the package price is the whole price, tax included. The shared twin room costs more, and reserving it just for yourselves costs more again; the booking engine shows the amounts for your dates." → "Take a bed in the four-bed mixed dorm and the package price is all you pay, tax included. The shared twin room costs more, and having it to yourselves costs more again. The booking engine shows how much for your dates." The semicolon splice is now two sentences, so the paragraph has a short sentence in it. "includes seven days of unlimited equipment use" → "comes with…", which avoids an echo of `includes`. Same facts: dorm = no surcharge, tax included, twin costs more, private use costs more again, amounts only in the engine, and the equipment is still "in the engine".
2. **`copyBlocks[3]` ¶2.** "The rooms sit apart from each other around the garden." → "The rooms are spread around the garden, each one apart from the others." The triad is now one item plus two: "The pool has sunbeds under the palms, and there's a bar and a laid-back common area too." "called it" → "called the place". "Across 80 reviews there, guests score the staff 9.5 out of 10." → "On the same site the staff get 9.5 out of 10, across 80 reviews." Same figures and platform. The Myrthe fragment is verbatim, including "inbetween".
3. **`copyBlocks[4]` ¶1–¶2.** "The lodge is about two and a half hours' drive from Colombo airport. An airport shuttle runs at an extra charge." → "Colombo airport is about two and a half hours away by road. There's an airport shuttle, for an extra charge." "The beach at Kathaluwa West is 40 metres away, across the Matara road." → "Cross the Matara road and you're on the beach at Kathaluwa West, 40 metres from the lodge." This keeps the one honest limit on the page (there is a road to cross) and gives it a concrete action. It adds no claim: the owner's own "right across Matara road" plus Booking's 40 m support it. "Kabalana Beach is 350 metres away." is unchanged. ¶3 (cash for Booking.com stays) is unchanged.

### Left as is (checked, no tell)

`tagline`, `spot` (the "beach breaks, points and reefs" list is the owner's own), `season`, `closing`, every heading, `copyBlocks[1]` ¶1 and ¶3 (the date line stays a fragment on purpose), `copyBlocks[5]`, `stayInfo.note` (its closing "No pets." fragment is fine).

### For the copywriter / copyeditor (not changed here)

- **Few honest limits.** The only ones are the road crossing, the twin/private surcharges and cash-only for Booking.com stays. The dossier holds more, such as the 5.6/10 Booking WiFi score and Erez's "poor location" review. Adding them would be new facts, so that is the copywriter's or Shahar's call.
- **"a few steps from the ocean"** appears in `tagline`, intro ¶1 (owner) and `spot` ("a few steps from the lodge"). Each one is sourced, but the whole page repeats it. Dropping it from `tagline` would be the cheapest fix, but the tagline's what+where line would then need another anchor.
- **`copyBlocks[5]`** calls Mozambique "surf trips". The source says "guided tours between the two main surfing towns". That is close enough that I left it, but the copyeditor may want the exact scope.

### Could not fix without a fact

None.
