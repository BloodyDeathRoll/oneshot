# humanizer notes: the-sandhya, en

Humanizer 0.2.1, 2026-11-06, run `2026-11-ahangama-01`, `mode: test`. Pass after review round 2 (copy round 3). Input: `en.json` as the round 2 pass left it, now kept unchanged as `en.draft.json`. The copywriter's round 2 text is `en.draft.json` at commit `369a73e`, and the round 1 draft is in git (commit `4bb4be1`).

## How this pass was scoped

Most of this page is the hotel's own prose. Two rules apply, and the second is now a ruling, not my call:

- **Sentences the agents wrote or recast** get a normal pass. That covers `closing`, `spot`, the notes, the room-kit paragraph, and any owner line an agent recast or added words to.
- **The hotel's own sentences** are exempt from "no triads" and "no padding vocabulary" when they are verbatim, trimmed, or have their clauses moved, or have a word or two changed for grammar or to drop a claim, as long as no other words are added (Alon, 2026-11-06, widened after review round 2; `proposals/2026-11-ahangama-01/001-copyeditor-owner-prose-voice.md`). Their facts are audited as usual, and every other voice check still applies. Flags 3 to 6 in `review.md` are cleared by this, so I left those sentences as they are.

## What changed in this pass (two lines)

| Field | Before | Now | Why |
|---|---|---|---|
| Kabalana ¶3 S1 | "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have surf points and whale-watching boat rides, and a dizzying array of dining options." | "The nearby beaches of Midigama, Weligama, Mirissa, Madiha and Hiriketiya Bay have surf points and whale-watching boat rides. You will find plenty of places to eat there too." | Review flag 1, tells 1, 3 and 11. My last pass only moved a comma, so the three-item list was still there. Dining now gets its own short sentence, which also leads into the next one about Ahangama's eateries. "A dizzying array" is gone; "plenty" keeps the owner's claim of many. Same five places and same three things. An agent's recast, so it is not exempt and was checked against every voice check |
| Dining ¶2 | "We truly believe some of the island’s best qualities may be expressed through our food, from our signature Sri Lankan rice & curry, our zesty DIY poke bowls, our localized “Tom Yum” style noodles with fresh Ceylon prawns or a finger licking array of delicious homemade desserts, exploring the diversity of the local produce available." | "We truly believe some of the island’s best qualities may be expressed through our food. Our signature Sri Lankan rice & curry, our zesty DIY poke bowls, our localized “Tom Yum” style noodles with fresh Ceylon prawns and a finger licking array of delicious homemade desserts explore the diversity of the local produce available." | Review flag 2, aloud. Split in two (15 and 39 words), and the tail now has a subject and a verb, so nothing hangs. "From" cut, "or" to "and", "exploring" to "explore", both for grammar. No word added, checked by script against `owner_copy[10]`, so it stays under the ruling. Same four dishes |

`sources.md` is updated on both rows, and on the six inaccuracies below. No fact moved between fields, so its "each fact once" list stands. `en.json` keeps `humanizer_version` 0.2.1.

**Corrected from `review.md`'s list of six:**

1. "Trimmed or reordered, no word added" in these notes now states the widened ruling and lists sentences by form (see "Left alone on purpose").
2. Kabalana ¶1 S2 is no longer filed under "no word added". It is filed under a word changed for grammar ("has" to "have").
3. `sources.md`, Exclusive ¶1: now says "location" and "with its" also went and "position" moved, as well as the three words it listed.
4. `sources.md`, Exclusive ¶2: now says "the perfect" became "a".
5. `sources.md`, Kabalana ¶3, and the pattern table here: "split the triad" is withdrawn. It was still a triad until this pass.
6. `sources.md`, Rooms ¶4: no longer says verbatim. "In the Studio King," was added, so the sentence is not exempt.

Two smaller corrections the review also pointed at: the owner triads are nine, not eight (the intro heading was missing), and Looking after S2 is the owner's trimmed sentence and exempt, while only S1 is a recast.

## What changed in the round 2 pass (eight lines, two since replaced)

| Field | Before | Now | Why |
|---|---|---|---|
| `stayInfo.note` S1 | "Listings differ on the minimum age, and some say check-in after 16:00." | "Other sites give different minimum ages for us, and some say check-in is after 16:00." | Review row 8. Speaks as the hotel, not about it. Both disagreements stay open. "Other sites" is exact: every differing age and the 16:00 come from third parties |
| `stayInfo.note` S2 | "Ask the hotel before you book." | "Ask us before you book." | Review row 9 |
| `amenities[6].note` | "listed by the hotel; ask who runs them and what they cost" | "on our list; ask us who runs them and what they cost" | Review row 10. Still no claim about who runs them |
| `amenities[7].note` | "listed by the hotel; ask who provides the boards and what they cost" | "on our list; ask us who provides the boards and what hire costs" | Review row 11. "What they cost" read as buying a board. Still no provider and no price |
| `priceList[0].note` | "The hotel publishes this as a “from” price, plus “++”. Price as of 2026-11-06." | "Our “from” price, plus “++”, as of 2026-11-06." | Review row 12. "From", "++" and the capture date are all there, and "price" no longer comes twice |
| Dining ¶2 | "Our signature Sri Lankan rice & curry, … or a finger licking array of delicious homemade desserts. We truly believe … through our food, exploring the diversity of the local produce available." | "We truly believe … through our food, from our signature Sri Lankan rice & curry, … or a finger licking array of delicious homemade desserts, exploring the diversity of the local produce available." | Read aloud, the fragment ended on "or" and waited for a verb that never came. Rejoined by moving the belief first. Every word is the owner's, checked by script, and the owner's "from" now lands. Same four dishes. Replaced in the pass above: the tail still hung |
| Looking after ¶1 S1 | "… and our stunning environment, with a zero-food waste menu, …" | "… and our environment, with a zero-food waste menu, …" | Tell 3 and the review's voice row. The copywriter's recast adds words, so the ruling does not cover this sentence |
| Kabalana ¶3 S1 | "… have amazing surf points, whale-watching boat rides and a dizzying array of dining options." | "… have surf points and whale-watching boat rides, and a dizzying array of dining options." | Tell 1 and 3. I reworded this sentence in round 1, so the ruling does not cover it. Same five places and same three things. Replaced in the pass above: moving a comma left the triad in place |
| Kabalana ¶5 | "Ahangama train station is 1.4 km from the hotel." | "Ahangama train station is 1.4 km from us." | The same register slip as review rows 8 to 12, in an agent's sentence. The review did not list it |

The first two rows are one field, so that is nine rows and eight lines.

**Read and left:**

- **Intro ¶1**, "Designed to feel like an exclusive private beach house with the amenities of an intimate boutique hotel. Your relaxation starts as you …". Read aloud, the fragment works: it follows the heading "You are home", which supplies the subject, and the next sentence moves on cleanly. No change.
- **Dining ¶5**, "A continental breakfast for two adults is included in your stay." Plain and short, the one changed line that is not the owner's. "for two adults" is still there.

## What changed in the round 1 pass (nine lines, still in place)

Listed for the record. The Kabalana ¶1 subject is now two things after the copywriter's cut, and "have nurtured" is still right.

| Field | Draft | Then | Why |
|---|---|---|---|
| `spot` | "Kabalana Beach: a mile long, white sandy beach …" | "Kabalana is a mile long, white sandy beach …" | Tell 10, a keyword label with a colon in front of the owner's words. "Beach" no longer comes twice |
| `closing` | "… booking page, or call or email us first with any question." | "… booking page. If you have a question first, call or email us." | "or call or email" stumbled aloud. Same two actions, in the order `closing_intent` gives |
| `priceList[0].note` | "From this price, plus “++” as the hotel publishes it." | "The hotel publishes this as a “from” price, plus “++”." | "From this price" read as a translation. Replaced again in this pass |
| `rooms[3].note` | "… top floor: living area, walk-in wardrobe, soaking tub, ocean-view balconies, 55-inch TV." | "… top floor, with a living area, walk-in wardrobe, soaking tub, ocean-view balconies and a 55-inch TV." | Tell 10, the colon reflex. Same five items |
| Rooms ¶3 | One sentence of thirteen items | Three sentences, the last a fragment ("High speed WiFi too, …") | Tell 2. "Every room" carries through as "Each one also has". Same items, same order |
| Looking after ¶1 | "the vibrant local community" | "the local community" | Tell 3, by name |
| Exclusive ¶1 | "nestled in a secluded nook" | "in a secluded nook" | Tell 3, by name. "Secluded nook" is the fact and stays |
| Kabalana ¶1 | "has nurtured" | "have nurtured" | Grammar, the plural subject. Same footing as the spelling fixes in audit F15 |
| Kabalana ¶3 S1 | "Discover amazing surf points, … at the nearby beaches of …" | "The nearby beaches of … have amazing surf points, …" | Tell 5. Reworked again in this pass |

## Patterns on the page now

Counted over everything except testimonials and data fields.

| Pattern | Found across all passes | Fixed | Left |
|---|---|---|---|
| Third person on a "we" page | 6 | 6 | 0 |
| Colon label or colon list (tell 10) | 6 | 2 | 4, the room booking labels, see below |
| Padding words (tell 3, and the review's voice row) | 7 | 5 ("vibrant", "nestled", "stunning" in Looking after, "amazing", "a dizzying array") | "Elevated" and "Whether", both the owner's and under the ruling, as are the owner's other adjectives |
| Marketing verb (tell 5) | 1 | 1 | 0 |
| One overlong even sentence (tell 2) | 1 | 1 | 0 |
| Triads (tell 1) | 11 | 2 (one cut by the copywriter, one broken in this pass) | 9, all the owner's and under the ruling |
| Sentence that hung aloud | 1 | 1 (Dining ¶2) | 0 |
| Em dashes | 0 | | |

Fences checked by script against `en.draft.json`: only `copyBlocks[5]` ¶2 and `copyBlocks[7]` ¶3 differ. The set of numbers across the file is identical, both to that draft and to the copywriter's round 2, and testimonials are byte-identical to the draft and the dossier. Caps are met: the two changed bodies are 974 and 1,133 characters of 1,500. No pool length, no Michelin, no untraced press quote, no nightly price, no WhatsApp, no claim about who runs the surf lessons. The tagline still says beachfront boutique hotel, and no surf wording was added.

## Left alone on purpose

For the copy reviewer. These are the owner's and the ruling covers them. Named here, as the proposal asks.

- **"Elevated Comfort Food"** (Dining ¶1). The name of the brief, capitalised, and it is `dining.concept`.
- **"Whether you are enjoying the sunshine …"** (intro ¶3). Three places leading to the owner's best line, "the sea is always your view".
- **The nine owner triads**: "Pause, take a deep breath & exhale" (the intro heading); "understated design, thoughtful form and practical function"; "warm, kind, attentive"; "orange, pink and blue"; "surfers, families, and digital nomads"; "We are not international. We are not local. We are simply The Sandhya."; "vegetarian, vegan, keto and other"; the national parks, forest and waterfalls; and the three-place sentence above. "Pristine sand and stunning sunsets" is now two items, so it does not count. Kabalana ¶3 S1 was never the owner's sentence in this form, and it is no longer a triad.
- **Under the ruling, beyond verbatim or trimmed.** The full list by form is in `sources.md`, "The operator's ruling, and what it exempts". The five that need the widened wording:
  - **Clauses moved, no word added:** Kabalana ¶1 S1 (the owner opens "Kabalana Beach, on the golden south coast …"; "buzzing and eclectic" stays), Exclusive ¶1 S2 ("position" moved ahead of the beach; "prime", "location", "with its", "unique" and "nestled" cut).
  - **A word changed for grammar, no other word added:** Kabalana ¶1 S2 ("has" to "have", and the owner's "and" moved up when "a consistent swell" was cut).
  - **A word changed to drop a claim, no other word added:** Exclusive ¶2 ("the perfect" to "a").
  - **Clauses moved and two words changed for grammar, no other word added:** Dining ¶2 ("or" to "and", "exploring" to "explore").
- **Trimmed, no word changed:** Rooms ¶1 (two sentences joined by cutting), Kabalana ¶2 and ¶4, Dining ¶3.
- **The owner's repeated words.** "array" three times (Dining ¶1, ¶2, Kabalana ¶2), "thoughtful" and "eclectic" twice each. "Thoughtful" was three until "the epitome …" went, and "stunning" is now once.
- **`bookingLinks[1–4]`, "Studio King: check live dates".** A colon, but on a button, and the wording does not promise `?rid=` preselects the room, which is unverified. The review agrees.
- **Amenity labels** such as "Celebratory arrangements" and "Tours and activities assistance". Category words, but they are the hotel's own list.
- **"Wallpaper* describes The Sandhya as …"** (Casual ¶3). An agent's sentence that names the hotel rather than saying "us". The owner's prose names The Sandhya the same way, and the review did not flag its voice, so I left it.
- **The tagline.** Plain what and where.

The honest limits stay and are the plainest lines on the page: `stayInfo.note`, the two "ask us" amenity notes, the train station at 1.4 km, and breakfast for two adults.

## Stayed clumsy: needs the owner

Fixing these would take a fact I do not have, or would rewrite what the owner wrote.

1. **The pool** (intro ¶4). "our swimming pool" is flat next to the rest of that sentence because the 30 m is held back. Once the owner settles 30 m against 15 m, it goes back in.
2. **"++" on the Exclusive Use price.** The note can only repeat it, because no source says what "++" adds. In the first person this shows more, since a hotel would know.
3. **The triple in the Studio King** (Rooms ¶4). "with a supplement" has no amount, and only this room's text says it, though the engine lists a maximum of 3 for all four rooms.
4. **`stayInfo.note`.** Sends the reader to ask about the minimum age and the check-in time. It reads oddly in the hotel's own voice, because the hotel is the one who knows. It goes once the owner settles both.
5. **"Yoga and surf lessons" and "Surfboard hire" notes.** Same problem: the first person makes "ask us who runs them" stranger than the third person did. They stay awkward until the owner says who runs them and what they cost. Any firmer wording would claim a provider.
6. **"We strive for sustainable tourism."** (Looking after ¶1). Sits bare since the shipping-container clause was cut for the pool contradiction. The owner may want to say more.
