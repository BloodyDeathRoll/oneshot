# humanizer notes — lotus-surf-house · en

## Pass of 2026-11-03 · humanizer 0.2.1 · run 2026-10-midigama-01 (test)

Input: the copywriter 0.5.0 draft, kept unchanged as `en.draft.json`. I rewrote `en.json` in place and added `humanizer_version` (0.2.1). This was a light pass. The draft is short, plain and written from facts, with almost none of the usual padding. I made 7 sentence edits: one in `closing`, and one in each of the six copy blocks. I checked the fact set field by field against the draft, and it is identical. No fact was added, removed or moved between fields.

I left these alone on purpose:
- Every testimonial (verbatim), rating, heading, `tagline`, `spot`, `rooms[]`, `stayInfo`, `amenities[]`, `contact.*` and `bookingLinks[]` entry. They are data or short plain lines, and they have no tells.
- The repeated room-note wording ("Fan and mosquito net; no air conditioning and no hot water."). It repeats on purpose, so a reader can compare the rooms line by line (audit F4).
- The honest limits: the owner's own "may not be the newest" about the standard rooms, no A/C and no hot water downstairs, cash only, no parking, no cots. Every one is still there, worded as the draft or closer to speech.
- Every attribution the copywriter set: "Booking.com" on each distance, and the two owner quotes as his words.

### Patterns found

- Tell 10, label-and-colon in front of the owner's sentence (2): "In his own words: “…”" (about, Yelum) and "Yelum says it plainly: “…”" (offer ¶1). The second one also editorialised ("plainly").
- Symmetrical, parallel phrasing (1): "with a hammock under the trees and a ping-pong table under a thatched roof" (intro ¶1).
- Repeated construction across the page (1): "Booking.com puts X …" in both `spot` and Getting here ¶2.
- Same opening twice (1, my own): after my first edit, both intro ¶1 and the Yelum block opened "The house is …". I fixed it in the same pass.
- Explaining the obvious, and a literary phrase (1): "Above the house is a roof terrace … against the green of the trees", under the heading "Up on the roof".
- Echo of the heading, and a stiff register (1): "Breakfast is included, and it is served from 8 a.m. to 10 a.m." sits under the heading "Breakfast".
- Slightly odd word order (1): "To ask us anything first, call." (`closing`).
- None of "nestled", "vibrant", "unforgettable", "boasts", "experience/discover/immerse", "whether you're…", and no triads in the business's own voice. The only list of three is the Booking.com distances, which is data.

### Changes (field: before → after)

1. **`closing`.** "…To ask us anything first, call." → "…If you'd rather ask us something first, call." (87 chars, cap 140). Same channel (phone), and no number in the line.
2. **intro ¶1.** "The house stands in a shady garden on Indhana Road, with a hammock under the trees and a ping-pong table under a thatched roof." → "The house is in a shady garden on Indhana Road. There's a hammock under the trees, and the ping-pong table has a thatched roof over it." Same four facts: shady garden, the road, hammock under trees, ping-pong under thatch (img-005, img-020).
3. **about, Yelum.** "The house is Yelum's. In his own words: “I strive …”" → "Yelum owns the house. As he once wrote to a guest, “I strive …”". The quote is unchanged. "Wrote to a guest" is sourced: it comes from his signed reply to a guest review (`reviews.quotes[60].owner_reply`). The reply is not named, and nothing from the review is used.
4. **about, Breakfast.** "Breakfast is included, and it is served from 8 a.m. to 10 a.m." → "Breakfast is included, and you can have it any time from 8 to 10 in the morning." Same hours. "Included" is still the draft's claim, and the owner still has to confirm it for every rate (`sources.md`).
5. **offer ¶1.** "Yelum says it plainly: “The standard rooms may not be the newest, but they are popular with many vacationers due to their charm.”" → "“The standard rooms may not be the newest,” Yelum says, “but they are popular with many vacationers due to their charm.”" I split the quote at his own comma. Every word and its order are verbatim. The only added marks are the quotation marks at the break.
6. **about, roof.** "Above the house is a roof terrace, with a wooden table and chairs against the green of the trees." → "There's a roof terrace as well, with a wooden table and chairs and the trees behind it." The trees behind it come from img-004 ("green canopy of trees behind"). The Buddha sentence is unchanged ("in one corner" is img-021).
7. **info ¶2.** "Booking.com puts Ahangama Beach 1.4 km away, Weligama Beach 4.2 km and Koggala Airport 9 km." → "Further out, Booking.com lists Ahangama Beach at 1.4 km, Weligama Beach at 4.2 km and Koggala Airport at 9 km." The attribution still covers all three distances in one sentence, and every number is unchanged. `spot` keeps "Booking.com puts …", so the construction is used once on the page.
8. Unchanged: intro ¶2, offer ¶2, info ¶1 and ¶3, and every heading.

### `sources.md`

I updated it line for line: the caps line (`closing` is now 87 chars), the `closing` row, the Yelum row (with what "wrote to a guest" rests on), the offer ¶1 row (the quote is split, words unchanged), the roof row and the info ¶2 row. The note that `en.json` and `en.draft.json` were the same file is now marked as true at hand-off only. No fact moved, so the "Each fact once" table still holds.

### For the copyeditor

- **"Old rooms and new"** (offer heading) is the copywriter's framing. "Old" is a little stronger than the owner's "may not be the newest". The Deluxe Queen downstairs also isn't the owner's "new deluxe rooms". I kept the heading because it is honest and short. It could go softer ("Downstairs and up").
- **King Room note repeats "Upstairs"**, which is already in offer ¶2. The copywriter flagged this as a judgement call, and I left it.
- **"Yelum says"** puts a written reply in the present tense. That is normal for a quote, but "Yelum wrote" would be stricter if you prefer.
- **The page is thin on the business's own voice:** two quoted sentences, and the guests do the rest. I did not try to warm it up, because every warm line would need a fact the dossier does not hold (see below).

### Could not fix without a fact (owner items)

- **No line about the surf.** The draft can't name the break in front of the house, who it suits or the season. The business publishes none of this, and "Lazy Left / Lazy Right" exist only in a guest quote.
- **No line about the family or the breakfast itself.** The mother's cooking, the coconut roti and the hosts' trip planning come only from guests, so they stay in the testimonials.
- **No `featureLine`.** The owner has written no short line about the place.
- **The honest limits on the page are all the owner's or Booking's own:** older standard rooms, fan rooms without hot water, cash only, no parking. Train noise and dust appear only in guests' words (Holtmann, Giada), and the copy does not restate them.
