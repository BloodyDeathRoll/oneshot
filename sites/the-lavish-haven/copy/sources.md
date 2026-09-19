# copy sources — the-lavish-haven · en

**This is the "no owner prose" case.** Nothing on the public web is written in this business's voice — Booking's "About this property" is machine-generated. Every paragraph below was written from sourced facts in `dossier.json`.

| Block | Paragraph | Rests on |
|---|---|---|
| tagline | "A new hotel, two minutes from Kabalana" | `location.distance_to_beach` · `business.since` gap note (guests call it brand new) |
| intro ¶1 | off the main road, two-minute walk | `location.setting` ("not on the main road but a 2 min…" from a guest review) · `location.distance_to_beach` |
| intro ¶2 | cafés nearby; the pool at the centre | `location.setting` · `facilities[]` outdoor pool · `reviews.quotes[]` António ("the swimming pool at the center creates a good vibe") |
| about ¶1 | new; first customer; cleanliness 9.7, comfort 9.7, 34 reviews; Google 5.0/21 | `business.since` gap note · `reviews.booking.categories` · `reviews.booking.count` · `reviews.google` |
| about ¶1 | large rooms | `reviews.quotes[]` — "over the top large rooms" appears in the Booking quotes |
| about ¶2 | guests move hotels and stay; one over a month; staff 9.4 | `reviews.quotes[]` Mya ("stayed over a month"), Roie ("extended our stay… instead of going to another one") · `reviews.booking.categories.Staff` |
| offer ¶1 | the nine room types and what is in a room | `room_types[]` · `facilities[]` (air conditioning, private bathroom, soundproofing, desk, WiFi) |
| offer ¶2 | rates depend on room and dates | `gaps[]` "offers" — no price stated |
| offer ¶3 | pool, restaurant and its cuisines, coffee house, spa; family provision | `facilities[]` · `business.description` (Booking's facts, re-written — its wording is not reused) |
| info | 24-hour desk, parking, shuttle, housekeeping, laundry, bicycles, accessibility, non-smoking | `facilities[]` · `hours_note` · `location.distance` to Koggala Airport |
| spot | Kabalana beach break | `location.spot` — third-party surf guide, described as the wave, not claimed by the business |

## Deliberately not written
- **No check-in or check-out times.** Not published anywhere (`gaps[]`). The copy states only the 24-hour front desk, which is sourced.
- **No room count.** A review summary says 17 bedrooms; Booking lists 9 room types (`contradictions[]`).
- **No "easy parking".** Booking says free private parking; a guest calls the area very small and hard with a car (`contradictions[]`). The copy states parking exists and is by reservation, nothing about size.
- **No street address.** Booking publishes only the town.
- **The "Shahar, Israel" review is excluded.** The author name matches the operator of this pipeline (`reviews.quotes[].note`); it is not used until that is confirmed.
- **Truncated quotes are carried with their ellipsis**, exactly as Booking renders them, rather than completed.
