# humanizer notes — coconut-surf-inn-guest-house-and-restaurant · en

## Pass of 2026-11-05 · humanizer 0.2.1 · run 2026-10-midigama-01 (test)

Input: the copywriter 0.5.0 draft. I kept it unchanged as `en.draft.json`, rewrote `en.json` in place and added `humanizer_version` (0.2.1). This was a light pass. The draft is plain and built from facts, and much of its voice is the host's own Airbnb prose. I made 12 sentence-level edits across 9 fields: `closing`, `spot`, `season`, `stayInfo.note`, and copy blocks [2], [3], [4], [5] and [6]. I checked the fact set field by field against the draft, and it is identical. No fact was added, removed or moved between fields.

### Patterns found

- **Inverted "Next to X is Y" openings** (3 in the business's voice): [0] ¶2 "Next to the guesthouse is …" (host), [3] "Up on the roof is …", [4] "In the middle of the house is …". I rewrote the two that are ours. The host's one stays.
- **Body echoes its heading** (3): "The restaurant upstairs" → "The restaurant is on the upper floor"; "On the roof" → "Up on the roof is"; "Six kinds of room" → "lists six kinds of room".
- **Colon and semicolon in front of a list or clause** (4, tell 8/10): [2] "upper floor: a long covered room …", [6] ¶1 "arrange it; there is a charge", [6] ¶2 "on foot; Midigama station", `stayInfo.note` "welcome; no cots".
- **Mirrored sentences** (1): `spot`, "Coconuts, a …, is … Plantations, a …, is …".
- **The same construction twice on a page** (1): "On Google the restaurant has …" ([2] ¶2) and "On Google the inn is listed as …" ([6] ¶3).
- **Cloned line across the run** (1): `closing` was the Lotus Surf House closing in all but one word. I varied it so the two sites do not share a sentence.
- None of "nestled", "vibrant", "unforgettable", "boasts", "discover/immerse", "whether you're…", and no triads, in the copy we wrote. The one marketing-register sentence on the page is the host's (see below).

### Changes (field: before → after)

1. **`closing`.** "Live dates and prices are on Booking.com. To ask us something first, call." → "Booking.com has the live dates and prices. If you'd rather ask something first, call us." (88). Same channel (phone), and no number in the line.
2. **[2] ¶1.** "The restaurant is on the upper floor: a long covered room with cushioned benches, low tables and a view of the sea. All meals, snacks and drinks are available. Whether breakfast comes with your room depends on the rate you book." → "A long covered room on the upper floor, with cushioned benches, low tables and a view of the sea. All meals, snacks and drinks are available. Breakfast comes with some rates and not with others." The opening fragment leans on the heading. The host's sentence is unchanged. Breakfast is still rate-dependent, no more and no less.
3. **[2] ¶2.** "On Google the restaurant has a listing of its own, … rated 4.6 from 39 reviews." → "The restaurant has its own Google listing, Coconut Surf Restaurant (2nd floor), where it's rated 4.6 from 39 reviews."
4. **[3].** "Up on the roof is a terrace under a thatched shade, with a swing seat, hammocks, benches and tables, and the sea beyond the palms." → "The terrace up top is shaded with thatch, and has a swing seat, hammocks, benches and tables. Beyond the palms, the sea." The same five things. The last line is a fragment, on purpose.
5. **[4] ¶1.** "In the middle of the house is a skylit courtyard, where palms grow …" → "The middle of the house is a skylit courtyard. Palms grow out of a shallow channel of water there, between the windows of the rooms." It is still a channel, never a pool. ¶2 is unchanged.
6. **[5].** "Booking.com lists six kinds of room, from a single for one person to a family room for four. Every room has its own bathroom with a shower, and its own entrance." → "Booking.com lists six, starting with a single for one person and going up to a family room for four. Each one has its own entrance, and its own bathroom with a shower."
7. **[6] ¶1.** "If you would like a taxi from the airport, let us know and we will arrange it; there is a charge." → "If you want a taxi from the airport, let us know and we'll arrange one. There's a charge."
8. **[6] ¶2.** "By train, the nearest station is Kumbalgama, about 13 minutes on foot; Midigama station is 1.4 km away." → "The nearest train station is Kumbalgama, about a 13-minute walk. Midigama station is 1.4 km away." The Weligama sentence and its Booking.com attribution are unchanged.
9. **[6] ¶3.** "On Google the inn is listed as Coconut Surf Inn Guest House and Restaurant." → "On Google Maps, look for Coconut Surf Inn Guest House and Restaurant." It is the same listing name, the one `mapUrl` points at.
10. **`spot`.** "… Plantations, a more mellow wave, is 100 m up the beach." → "… Plantations is a more mellow wave, a 100 m walk up the beach." This puts the second sentence back closer to the host's own ("Plantations is a more mellow wave, located just 100 meters walk up the beach"), and the two sentences no longer mirror each other. The first sentence, including "a consistent A-frame reef break", is unchanged.
11. **`season`.** "The Sri Lanka Travel Pages surf guide gives November to April as the season at Coconut Point." → "According to the Sri Lanka Travel Pages surf guide, the season at Coconut Point runs from November to April." The attribution, the spot name and the months are the same.
12. **`stayInfo.note`.** "Children of any age are welcome; no cots or extra beds." → "Children of any age are welcome, but there are no cots or extra beds." The pets sentence is unchanged.

### Left alone on purpose

- **The host's own sentences**: [0] ¶1 (the copywriter's trim), [0] ¶2 and [1] ¶1. They are the owner's voice and register, so I did not paraphrase them further. Doing that would turn his words into ours.
- **Every heading, `tagline`, `hoursNote`, [1] ¶2, [4] ¶2, `rooms[]`, `amenities[]`, `ratings[]`, `contact.*`, `bookingLinks[]`**: these are data or short plain lines, with no tells.
- **Every testimonial**: verbatim, including the typos and the `\r\n` in the source text.
- **The repeated room notes** ("Fan and mosquito net; no air conditioning and no hot water." / "Air conditioning, fan and hot water."): they repeat on purpose, so the rooms compare line by line (audit F5/F6), as on Lotus Surf House.
- **The honest limits**: the budget rooms without A/C or hot water, no cots or extra beds, the paid taxi, breakfast only on some rates. All of them are still there.

### `sources.md`

I updated it line for line: the caps line (`closing` 88, `spot` 135, `season` 108, `stayInfo.note` 112, longest body 353), the note on `en.json` / `en.draft.json`, and the rows for `closing`, `spot`, `season`, [2] ¶1 and ¶2, [3], [4] ¶1, [5], [6] ¶1–¶3, the `spot` row of "Edits to the owner's words", and the `stayInfo` line. No fact moved, so the "Each fact once" table still holds.

### For the copyeditor (rulings in your lane, not mine)

1. **"a consistent A-frame reef break"** (`spot`) is still the host's wording. It is his Airbnb text and the break type is his claim, so it is sourced. The auditor's note read the break type as third-party. That is your call.
2. **`season`** is still attributed to the Sri Lanka Travel Pages guide. If `season` must be the owner's words, set it to null. The gap is already an owner item.
3. **Edits to the host's words** are listed in `sources.md` "Edits": the [0] ¶1 trim, "but it right" mended, "Chintaka" → "Chinthaka", "are" added in [2], and the `spot` restructure (now closer to his original). Please confirm that they count as trims, not paraphrase.
4. **[1] ¶1 voice.** "…you will experience the endless warm smiles and kind hospitality of the gracious host Chinthaka and his family" is the host's verbatim sentence. On the site it sits in the business's own voice, next to "us" in `closing`, so the host ends up calling himself "gracious". It is also the one sentence on the page with tell-list words ("experience", stacked adjectives). I left it because it is his. You may prefer to quote it as his ("Chinthaka puts it like this: …"), or to keep it as is.
5. **Budget Single "no hot water"** rests on `critical_themes[0]` and the auditor's note. The owner's own statement covers the Budget Double only. I did not touch the wording. It is an owner item.
6. **Airbnb rating row** links to the pre-renovation listing (audit F6). Whether to keep the row is for you or the deployer. I made no change.
7. **"with a balcony"** in the Deluxe Double Room with Balcony note repeats its label. I left it as a spec line, for your ruling. The Deluxe Family note has no such repeat.

### Could not fix without a fact (owner items)

- **No line on who the waves suit, and no season of the business's own.** The level is third-party only, and the season is the guide's.
- **The food has no voice of its own.** Dishes (sesame tuna), breakfast and the kitchen staff come only from guests, so they stay in the testimonials. The restaurant block names no dish.
- **No `featureLine`.** The host has no short line that would not repeat `spot` or [0].
- **No reply time beside "call us".** Airbnb's "a few days or more" is not promised, and there is no WhatsApp or email.
