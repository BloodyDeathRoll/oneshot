# humanizer notes — sanjee-surf-school · en

## Pass of 2026-11-05 · humanizer 0.2.1 · run 2026-10-midigama-01 (test)

Input: the copywriter 0.5.0 draft, kept unchanged as `en.draft.json`. I rewrote `en.json` in place and added `humanizer_version` (0.2.1). This was a light pass. The draft is plain and mostly the owner's own sentences, so most of what I fixed was shape: triads, one label-and-colon pattern, and a few stiff sentences. I changed 8 fields: six copy blocks, `spot` and one `priceList` note. Copy blocks went from 22 paragraphs and 403 words to 21 and 431. The rewrite is longer because breaking a list into sentences adds words.

I left these alone on purpose:
- Every testimonial (verbatim, byte-identical), `lessons[]`, `rentals[]`, `ratings[]`, `credentials[]`, `contact.*`, `tagline`, `closing`, `featureLine`, `season`, `ctas`, and every heading.
- Block [1], Sanjee's story. It is the owner's first person, as trimmed by the copywriter, and I kept it character for character, including the em dash. It is the only em dash on the page, and it is his, not a reflex of mine.
- Block [7], and [2] ¶3 "For group bookings, please leave us a message." That sentence is verbatim and is true on either reading of contradiction 9, so I did not touch it.
- [5] "Cash on the day can be LKR, USD or EUR." The wording is careful: it does not say the whole price is paid on the day, and it does not hint at any other way to pay.
- The repeated "not included" wording in the tour notes. It repeats so a reader can compare tours, and every exclusion is an honest limit.
- "up to 2 people" and "estimated introductory prices". The wording and the meaning of both stay. Only the second moved, within its own paragraph.

### Patterns found

Counted by reading all 61 prose fields in the business's voice: `tagline`, `closing`, `featureLine`, `spot`, `season`, `ctas.primary`, headings, each body paragraph, `lessons[].includes` and `.groupSize`, `rentals[].note`, `priceList[].note`. Testimonials, contact and labels are not counted. Lists that are plainly data (board sizes, currencies, exclusions) are not counted as triads. `priceList[1].note` is counted twice, once per pattern.

| Tell | Before | After | Where (before) |
|---|---|---|---|
| 1. Triad | 4 | 0 | [2] ¶1 three inclusions; [3] ¶3 leash, fins, wax with parallel clauses; [4] ¶1 three tour names; `priceList[1].note` |
| 2. Uniform or run-on rhythm | 1 | 0 | `spot`, one long comma chain |
| 3. Padding phrase | 1 | 0 | "hidden gems", `priceList[1].note` |
| 4. Symmetrical structure | 2 | 0 | [6] three paragraphs opening the same way; [5] four one-line paragraphs |
| 6. Echo of the heading | 1 | 0 | [0] "We teach" under "Who we teach" |
| 7. Category noun | 1 | 1 | "professional instruction", see below |
| 10. Label and colon | 4 | 0 | [6] "For beginners:", "For intermediates:", "For advanced surfers:"; [4] ¶1 "Three tours go looking for waves:" |
| 10. Em dash | 1 | 1 | [1] ¶2, the owner's, kept |
| Stiff or odd wording (not numbered) | 4 | 0 | "There is free dry storage there"; "Rentals need"; "Their prices are estimated introductory prices"; "to coordinate which days and times" |
| **Total** | **19** | **2** | |

None of "nestled", "vibrant", "unforgettable", "boasts", "ensures", "experience/discover/immerse" or "whether you're" appears, and there are no stock closers. Tell 9 needed nothing: the draft already states its limits.

### Changes (field: before → after)

1. **[0] ¶1.** "We teach total beginners, beginners who can already stand up, intermediates and advanced surfers." → "You can come to us as a total beginner, a beginner who can already stand up, an intermediate or an advanced surfer." Same four levels.
2. **[2] ¶1.** "All lessons include board and rash guard rental, professional instruction, and beach safety briefing." → "Every lesson includes professional instruction and a beach safety briefing. Board and rash guard rental is in the price too." Same three items, same scope.
3. **[2] ¶2, last sentence.** "Contact us beforehand to coordinate which days and times work best for you." → "Get in touch beforehand and we'll work out which days and times suit you." Promises no reply time.
4. **[3] ¶1, second sentence.** "There is free dry storage there while you eat or rest between sessions." → "Free dry storage there while you eat or rest between sessions." This is the owner's own fragment again.
5. **[3] ¶3.** One list of three → "Each board comes with a leash sized for it (6 ft – 9 ft) and fins fitted to your style (FCS-II or Futures). You also get wax for tropical water and a fresh wax comb." The source says "and a fresh wax comb", which this now follows.
6. **[3] ¶4.** "Rentals need an ID or passport copy and a refundable deposit. Ask us for the amount." → "To rent a board we need an ID or passport copy and a refundable deposit. Ask us how much it is." No amount.
7. **[4] ¶1.** "Three tours go looking for waves: the Surf Spot Safari, the Full Coast Adventure and the Sunrise Session." → "The Surf Spot Safari and the Full Coast Adventure go looking for waves, and so does the Sunrise Session." The word "three" goes; the three names are still there, and ¶2 still says "the other nine".
8. **[4] ¶2.** Two sentences → "The other nine are outings along the coast and inland, at estimated introductory prices, with pickup and return within Weligama." The hedge is unchanged and still covers only those nine.
9. **[5] ¶3 and ¶4 joined.** "Cash on the day can be LKR, USD or EUR. All prices are as of 5 November 2026." Both sentences are unchanged. The block now has paragraphs of one, two and two sentences instead of four short lines.
10. **[6] ¶1.** "For beginners: Jungle Beach and Weligama Main Point, both beach breaks. …" → "Jungle Beach and Weligama Main Point are both beach breaks we'd call beginner waves. …" "We'd call" stays inside the heading's "as we rate them".
11. **[6] ¶2.** "For intermediates there's Fishermans (a reef break), Island Point (a point break), Plantation Point (a right-hand reef) and Lazy Left in Midigama, a long left-hand reef. Lazy Right, also in Midigama, is a right-hand reef that goes from intermediate to advanced." Same spots, types and levels.
12. **[6] ¶3.** "Ram's Right, a reef break, and Kabalana (The Rock), an A-frame reef, are for advanced surfers."
13. **`spot`.** "…a beach break with smaller crowds…" → "Coco Beach is our home spot, a beach break. Smaller crowds than the main peak and a friendly, mellow vibe, ideal for first pop-ups." The second sentence is the owner's fragment, with a comma for his dash. Nothing about where in the bay.
14. **`priceList[1].note` (Full Coast Adventure).** "10+ potential surf spots, hidden gems and local breaks. Sri Lankan lunch included." → "10+ potential surf spots, some of them local breaks. Sri Lankan lunch included."

### Fact-bearing changes I considered and rejected

- **"less-known" or "quiet" for "hidden gems" (change 14).** Either would be a checkable claim the card does not make, so I did not replace it.
- **"Your board and rash guard are in the price" ([2] ¶1).** It drops "rental" and could read as keeping the rash guard, which is sold separately at $12. "Rental" stays.
- **"a safety briefing on the beach" ([2] ¶1).** "Beach safety briefing" does not say where it happens. "A beach safety briefing" stays.
- **"All sessions are private", or anything general about format ([2]).** Contradiction 9. Only the Private Coaching and Week Intensive rows speak for themselves.
- **"5 private sessions" or "two hours each" in [2] ¶2.** Both are already on the row. Not repeated.
- **"leave your board there" for the dry storage ([3] ¶1).** The source does not say what is stored.
- **"steps from the sand" or "right by the water" for the shop ([3] ¶1).** Hard constraint 3. "30 seconds" stays as the site's own number, with the owner item already in `sources.md`.
- **"Returned in full on undamaged check-in" to give the deposit weight ([3] ¶4).** It belongs to the contested deposit sentence (contradiction 14). "Refundable" is what both sides share.
- **"Private tuk-tuk" and "price is for both persons" ([4]).** On the cards, but the draft says "up to 2 people", and "private" next to the group-format question invites a misreading. Not added.
- **"at dawn" on the Sunrise Session ([4] ¶1), to give the line a detail.** It is in that row's note already.
- **"pay the rest in cash", or "if you pay cash, …" ([5]).** The first brings back the deposit, the second hints at cards (contradiction 18).
- **"good spots for beginners", "start at", "try" ([6]).** These turn a published level into advice. The block says how the school rates them.
- **"at the eastern end", "more than two decades", any reply time, hours, cancellation terms, student numbers, water temperature.** Not restored, anywhere.
- **"my school", "our founder", or any wording on who runs the business.** Contradiction 20. Sanjee stays "head instructor".

### `sources.md`

Updated line for line: a note at the top on `en.draft.json`; the `spot` row; the rows for [0] ¶1, [2] ¶1–2, [3] ¶1 and ¶3, [4] ¶1–2, [5] ¶3 (now carrying the date, with the old ¶4 row merged into it) and [6] ¶1–3; "Edits to the owner's words" ([2] ¶1 added; [2] ¶2, [3] ¶1, `spot` and the em dash line changed); the `priceList` paragraph; "Each fact once" (capture date is now [5] ¶3); the word and paragraph totals; and the caps table (longest body 563, `spot` 131).

### For the copyeditor

- **"hidden gems" is gone (change 14).** I read it as padding with no checkable content, not a fact, but it was on the card, so please rule on it. "Some of them local breaks" also makes the card's loose list slightly more exact: the card names "hidden gems, local breaks" as stops, not explicitly as a share of the 10+ spots.
- **"ideal for first pop-ups" (`spot`).** A mild tell, but the owner's own words and tied to the school's "Beginner" rating for Coco Beach. Kept.
- **"professional instruction" ([2] ¶1).** A category phrase (tell 7). Kept: the concrete version needs named instructors, and `team[1]` has none. "Professional" is the source's word.
- **"sits" ([3] ¶1) and "Making waves, one lesson at a time." (`featureLine`).** Both verbatim from the owner. The second reads as a slogan, and the copywriter had already flagged it.
- **"We'd call" ([6] ¶1)** adds no fact, but it does put "we" on a rating published on the school's site. The authorship of that site is unresolved (contradiction 20), the same exposure as every "we" on the page.

### Could not fix without a fact (owner items)

- **The page never says what a lesson day looks like.** No lesson times, hours or meeting point, so the Lessons block stays a list of conditions. Owner to pick the hours (contradiction 5).
- **The Beginner Lesson's format.** Its row stays silent on private or group, which reads as a small hole. Only the owner can close it (contradiction 9).
- **The deposit line ends in "Ask us how much it is."** It reads as a dodge beside a full price table, and is the clumsiest honest sentence on the page. Owner to pick the amount (contradiction 14).
- **The other instructors.** "Our instructors" could not be written warmly, since nobody but Sanjee is named (`team[1].gap`).
- **Warm details exist only in the flagged review** (the empty 6am line-up, coconuts at the beach huts). Not used, as the copywriter also noted.
