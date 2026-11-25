# humanizer notes — sea-you-surfers-nest · en

## Pass of 2026-11-22 · humanizer 0.2.1 · run 2026-10-midigama-01 (test)

Input: the copywriter 0.5.0 draft, kept unchanged as `en.draft.json`. I rewrote `en.json` in place and added `humanizer_version` (0.2.1). This was a light pass. The draft is short, plain and written from facts, with none of the stock padding in the business's own voice. I made edits in `closing`, `spot` and every copy block body (11 paragraphs). Headings are unchanged. I checked the fact set field by field against the draft, and it is identical. No fact was added, and none was moved between fields. One unsourced position word ("further in") was taken out (change 10).

I left these alone on purpose:
- Every testimonial (verbatim, checked equal by script), rating, heading, `tagline`, `rooms[]`, `stayInfo`, `amenities[]`, `contact.*` and `bookingLinks[]` entry. They are data or short plain lines, and they have no tells.
- Ashly's quoted sentence. It is full of tells (see below), but it is his own published text and quotes are untouchable.
- The honest limits: one A/C room in seven, Airbnb rates being for a room without it, no cots or extra beds, no parties, laundry and shuttle at extra charge. All are still there.
- Every attribution the copywriter set: Booking.com on the distances, Airbnb on Superhost and reply time, the owner on "Hello to waves in a minute walk".

### Patterns found

- Tell 10, label-and-colon in front of the owner's own words (2): "In his own words: “…”" (Ashly block) and "The house’s own line: “…”" (`spot`).
- Tell 10, list after a colon (1): "The rooms share a look: a four-poster …, a teal velvet throw, a timber towel ladder and a green cabinet with a mirror" (offer ¶2).
- Symmetrical openings (2): intro ¶1 and ¶2 opened "Downstairs, …" / "Upstairs, …"; info ¶1 and ¶2 both opened "Booking.com …".
- Explaining the obvious (1): "Only one has air conditioning; the other six do not."
- Stiff register (3): "a white house of two storeys", "Both are this house, in Midigama", "To ask Ashly something first, call." (odd word order).
- Echo of the heading with a flat list (1): "Breakfast is Asian, with local specialities, warm dishes, juice and fruit." under "Breakfast".
- No contractions anywhere in the draft (uniform, formal rhythm). I added a few ("there's", "he's", "it's").
- None of "nestled", "vibrant", "unforgettable", "boasts", "experience/discover/immerse" or "whether you're…" in the copy we wrote. The only triad and the only "perfect … home away from home" are inside Ashly's quote.

### Changes (field: before → after)

1. **`closing`.** "…To ask Ashly something first, call." → "…If you want to ask Ashly something first, call." (125 chars, cap 140). Same channel (phone), no number, no new promise. I did not write "call him": the number is read from the sign and not confirmed as Ashly's own.
2. **`spot`.** "The house’s own line: “Hello to waves in a minute walk.”" → "“Hello to waves in a minute walk,” says the house’s own listing." (64 chars). Quote verbatim; the attribution names where the owner wrote it (the listing name on Booking/Agoda).
3. **intro ¶1.** "Sea You is a white house of two storeys. Downstairs, room doors with carved fanlights open onto an inner courtyard, with a cushioned bench and potted plants." → "Sea You is a white two-storey house. Downstairs there’s an inner courtyard, with potted plants and a cushioned bench, and the room doors that open onto it have carved fanlights over them." Same facts (white, two storeys, courtyard, plants, bench, room doors with carved fanlights onto it; img-046). "The room doors that open onto it" does not claim every room opens there.
4. **intro ¶2.** "Upstairs, the balconies look out over the garden to the coconut palms. There are tables and chairs out there, and a settee with green cushions on the long balcony." → "From the balconies upstairs you look out over the garden to the coconut palms. There are tables and chairs out there, and the long one has a settee with green cushions." Breaks the Downstairs/Upstairs pairing; same facts (img-003, 045, 076, 077).
5. **Ashly ¶1.** "He is a Superhost on Airbnb, and he usually answers messages there within a few hours." → "He’s a Superhost on Airbnb and usually replies there within a few hours." Same claims, "usually" kept (response rate is 70%).
6. **Ashly ¶2.** "In his own words: “Whether you’re … unwind, our place is your perfect home away from home.”" → "“Whether you’re … unwind,” he writes, “our place is your perfect home away from home.”" Split at his own comma. Every word and its order are verbatim against `business.description.value`; the only added marks are the quotation marks at the break.
7. **offer ¶1.** "There are seven double rooms, sleeping fourteen guests between them. Only one has air conditioning; the other six do not. Airbnb rates are for a room without it, so if you want the air-conditioned room, ask when you book." → "All seven rooms are doubles, and between them they sleep fourteen. Only one has air conditioning. Airbnb’s rates are for a room without it, so ask when you book if you want the one that has it." "Only one" of seven still says six do not; the owner's count, 14 guests and the ask-when-booking line are all there.
8. **offer ¶2.** "The rooms share a look: a four-poster double bed painted mint green, a teal velvet throw, a timber towel ladder and a green cabinet with a mirror." → "The rooms are furnished much alike. The bed is a mint-green four-poster double with a teal velvet throw on it, and there’s a timber towel ladder and a green cabinet with a mirror." Same four objects. "Much alike" keeps the copywriter's hedge (the photos do not show all seven rooms); the throw sits on the bed as in `room_types_note`.
9. **Breakfast.** "Breakfast is Asian, with local specialities, warm dishes, juice and fruit." → "Breakfast here is Asian, with local specialities and warm dishes, and there’s juice and fruit too." Same four items, no claim that it is in the rate.
10. **carved ¶1.** "The front door is a carved grey double door, with a carved wooden chair beside it. Further in, carved wooden masks hang by a doorway among the ferns." → "The front door is a carved grey double door, and the wooden chair beside it is carved too. Elsewhere, carved wooden masks hang by a doorway among the ferns." **"Further in" removed:** img-035 shows the masks beside a grey door among ferns, not where in the house, so "further in" was a position the dossier does not give. "Elsewhere" claims none. Nothing sourced was dropped.
11. **carved ¶2.** "In the garden, a shower is built into a wooden surfboard fixed to the wall under the palms, for rinsing off after the sea." → "Out in the garden there’s a shower built into a wooden surfboard, fixed to the wall under the palms. It’s for rinsing off after the sea." Same facts (img-036), the copywriter's framing kept as its own short sentence.
12. **info ¶1.** "Booking.com lists the house under Kumbalgama, and Airbnb under Matara. Both are this house, in Midigama." → "Booking.com lists the house under Kumbalgama and Airbnb under Matara, but it’s one house, in Midigama."
13. **info ¶2.** "Booking.com puts Midigama railway station 950 m away on foot, and Weligama Beach 3.4 km." → "Midigama railway station is 950 m away on foot, by Booking.com’s count, and Weligama Beach is 3.4 km." Both numbers unchanged; the one attribution still covers both. The paragraph no longer opens like the one before it.

### `sources.md`

Updated line for line: the caps line (`closing` 125, `spot` 64), the note on `en.json` / `en.draft.json`, the `closing` and `spot` rows, every copy-block paragraph row (with the "further in" removal and the split quote recorded), and the word count (281 → 298 words with headings). No fact moved, so the "Each fact once" table still holds.

### For the copyeditor

- **Ashly's quote is the most generated-sounding line on the page** ("Whether you’re…", a triad, "perfect" twice, "home away from home"). It is his own Airbnb text and is quoted verbatim, so I kept it. It is the only first-person line the owner has published that is not a sales call. Dropping the quote would remove a sourced fact, so that is the copywriter's or the owner's call, not mine.
- **"Airbnb’s rates are for a room without it"** rests on listing 2's note ("rates are for Non A/C double room"). Listing 1 only says "Pls inquire for per room rate". I kept the draft's claim unchanged; a stricter reading would name the whole-house listing.
- **"he writes"** has no place named in the sentence. "On Airbnb" is in the sentence before it, so I did not repeat it.
- **"carved" three times** in the doors block. It is the point of the block (heading "Carved doors…"), so I varied the sentence shape rather than the word.

### Could not fix without a fact (owner items)

- **No line about the surf** beyond the owner's "a minute walk". No break is named, no season, no board storage or rental, even though the photos show a board rack and the house is called a surfers' nest.
- **No warm line about the hosts in the business's voice.** That Ashly lives in the house and hosts with his brother, and the home cooking, come only from guests (one in German), so they stay out.
- **No `featureLine`.** The owner has written no short line about the place that is not already used.
- **Breakfast** is platform text, and whether it is in the rate is unknown. The block cannot be made warmer or more specific without the owner.
