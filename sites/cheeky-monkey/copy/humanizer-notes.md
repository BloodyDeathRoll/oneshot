# humanizer notes — cheeky-monkey · en

## Pass of 2026-10-26 · humanizer 0.2.0 · run 2026-10-midigama-01 (test)

Input: copywriter 0.4.0 draft (`3e402cf`), kept as `en.draft.json`. I rewrote `en.json` in place and added `humanizer_version` (0.2.0). This was a medium pass: 16 sentence edits in seven of the eight copy blocks. I checked the fact set field by field and it matches the draft, apart from the one removal below that the operator decided on.

I left these alone on purpose:
- Every quote, rating, heading, `tagline`, `closing`, `spot`, `season`, `rooms[]`, `stayInfo`, `amenities[]`, `lessons[]`, `rentals[]`, `brands[]`, `contact.*` and `bookingLinks[]` entry. They are short, plain or data, and have no tells.
- The owner's own words: `featureLine` ("Come as a stranger, leave as a friend."), the intro heading ("Catch waves, not worries"), "close to the main point breaks" and "run by surfers, for surfers".
- The places where the copywriter held a contradiction open. None of these was reintroduced: open/closed status, the restaurant, the 20-vs-22 double, the room rates with no unit, owner names other than "Baba" (only ever as founder), "biggest"/"oldest", and the PayHere links. Every "published in 2021" qualifier is still there, worded as before (lessons ¶2, packages ¶6, every `priceList[].note`). So is the "call to check lessons are running" limit.

### Patterns found

- Tell-list padding (1): "Whether you are a total beginner or chasing your next big ride" (lessons ¶1, from the owner's home page).
- Triads (3): "rent a board, buy one, or bring yours in for a repair" (intro ¶2), "your skill level, your pace and your style" (lessons ¶1), "sizes, tails and colours" (shop ¶1, kept; see below).
- Symmetrical structure (1): four package paragraphs in a row all opened "The X package is …".
- Colon habit (3): "The shelves hold the rest: …", "depends on the room: …", plus a list-colon feel in the packages block.
- Clumsy grammar (2): "check the price, and that lessons are running"; "The week includes one lake tour, for an extra USD 5".
- Passive, uniform openings (1): "It was founded by Baba, who …" (about ¶2).
- I found no "nestled", "vibrant", "unforgettable", "boasts" or "experience/discover/immerse" in the draft.

### Changes (block ¶: before → after)

1. **intro ¶2.** "…Baba's Surf Shop, where you can rent a board, buy one, or bring yours in for a repair." → "…Baba's Surf Shop. Rent a board there or buy one, and bring yours in if it needs a repair." Same three facts (rent, buy, repair), no longer a triad.
2. **about "Three rooms in 2009" ¶2.** "It was founded by Baba, who taught himself to surf at twelve, like most kids in the area, and worked as a surf instructor. The shop carries his name." → "Baba founded it. Like most kids in the area, he taught himself to surf at twelve. He worked as a surf instructor too, and the shop carries his name." He is still the founder only and is never called the current owner. No surname.
3. **shop ¶3.** "The shelves hold the rest: wax, straps, bags and beachwear. The shop is run by surfers, for surfers." → "On the shelves there's beachwear, straps, bags and, of course, wax. It's a shop run by surfers, for surfers." "Of course, wax" is the owner's own phrase (`business.description_shop`). The same four items, no brands added.
4. **lessons ¶1.** "Whether you are a total beginner or chasing your next big ride, lessons are tailored to your skill level, your pace and your style." → "Lessons are fitted to your level and your pace, and to your style. That goes for a total beginner and for someone chasing their next big ride." No level was added or removed: `lessons[0].level` still holds beginner, intermediate and advanced.
5. **lessons ¶2 S2.** "Call before you come to check the price, and that lessons are running when you are here." → "Call before you come, to check it and to make sure lessons are running while you're here." S1, "The lesson price on this page was published in 2021.", is unchanged.
6. **packages ¶2.** "The Moderate package is one surf lesson a day for six days, or one guided session at a surf spot instead." → "The Moderate package halves that, to one surf lesson a day for six days (or one guided session at a surf spot instead)." "Halves" is plain arithmetic against ¶1 (two a day → one a day).
7. **packages ¶3.** "The Yoga and Surf package is one yoga lesson and one surf lesson a day for six days." → "Yoga and Surf gives you one of each a day for six days, a yoga lesson and a surf lesson."
8. **packages ¶4.** "The Surf Board Rental package is any board for seven days, and a tuk-tuk driving lesson if you want one." → "And the Surf Board Rental package gets you any board for seven days, plus a tuk-tuk driving lesson if you fancy one." The source says "if someone liked", so the lesson stays optional.
9. **packages ¶5.** "Every package has seven nights, …" → "All four come with seven nights, …" (the list is unchanged). "The three lesson packages include your board during lessons and transport to the surf spot." → "With the three lesson packages, your board for the lessons and the ride to the surf spot are included too." This still isn't claimed for the rental package. "The week includes one lake tour, for an extra USD 5." → "There's one lake tour in the week as well, at USD 5 extra."
10. **packages ¶6 S1.** "The price is per person for the week and depends on the room: a private room, a shared double or a shared triple." → "You pay per person for the week, and the price depends on whether you take a private room, a shared double or a shared triple." S2, the 2021 qualifier, is unchanged.
11. **getting here ¶1.** The two sentences are now one, so the Booking.com attribution covers every distance: "…800 m, then Ahangama Beach at 2 km, Weligama Beach at 3.3 km and Koggala Airport at 10 km." The draft's second sentence had lost the attribution. Every distance is unchanged.
12. **good to know.** "There is no generator" → "There's no generator" (the limit is kept as it was). "…book you a taxi and organise a safari or a cooking class." → "…book you a taxi, and set up a safari or a cooking class."
13. ¶1 of the packages block is unchanged.

### Removed on the operator's decision, not a humanizer rewrite

- **`priceList[12]` "Air conditioning, added to any package", USD 50 `per_week`, "Per person. Price published in 2021".** It was removed on Alon's decision, passed on by the coordinator during this pass. The 2021 add-on would sit next to Booking.com's 2026 "A/C in every room" (`amenities[0]`), and showing both would confuse a visitor. Nothing replaces it. No copy sentence mentioned the add-on, so no prose changed. In `sources.md` the row's line is deleted, and the airport rows that followed it are renumbered from `[13–15]` to `[12–14]` so the table still matches `en.json`. The owner-items bullets at the end of `sources.md` (the A/C add-on's 2021 price, and "Whether the A/C add-on still exists") stay as they are: they are questions for the owner, not site copy.

### `sources.md`

Apart from the removal above, every row is a summary rather than a word-for-word quote of the copy, and every one is still accurate. No fact moved between paragraphs.

### Left as is

- **shop ¶1 "in different sizes, tails and colours".** This triad is the owner's list ("different sizes, Surfboard tails, and colors"). Breaking it would mean dropping one, and each one is a fact.
- **packages ¶5's seven-item list.** It is long, but each item is a sourced inclusion, and splitting it would only spread the same list over more sentences.
- **"Good to know" heading.** It is a little stock. Keeping it is a matter of taste, so the copy editor can change it.

### For the copy editor

- Lessons ¶1, "That goes for a total beginner and for someone chasing their next big ride", carries the owner's range of levels. If it reads as a claim about who teaches whom, it can be cut down to the first sentence. The levels then live in `lessons[0].level` alone.

### Could not fix without a fact (owner items)

- **There is no warm, specific line about lessons.** I can't say who teaches, the ratio, which break, or what a first lesson looks like, because the dossier has no instructors and no named break.
- **The intro can't say what the camp feels like day to day.** I'd need a schedule, a meal or a named spot, and the only sourced ones are 2021 package items.
- **The honest limits on the page are the no-generator line, the 2021 price caveats, Booking.com's 350 m to the beach and "call to check lessons are running".** There's nothing on reply time or season closures, because the status is unresolved.
