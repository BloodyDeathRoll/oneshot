# copy sources — layday-surf-ahangama · en

| Block | Paragraph | Rests on |
|---|---|---|
| tagline | reuses the owner's Hostelworld headline | `business.tagline` |
| intro ¶1 | small, new, two-minute walk, family-built | `location.distance_to_beach` · `business.run_by` · `reviews.quotes[]` Beth ("newly built", "2-min walk"), Alina ("new and comfy") |
| intro ¶2 | it is quiet | `reviews.quotes[]` Catherine ("so it is very quiet which was amazing") · Beth ("peaceful little sanctuary") |
| about ¶1 | one dormitory; clean and quiet | `room_types[]` · `reviews.quotes[]` Catherine, Taiya, Nas, Akshay |
| about ¶1 | every Hostelworld category at 10 | `reviews.hostelworld.categories` — all seven are 10.0 · `reviews.hostelworld.count` = 10, stated plainly as a small sample |
| about ¶2 | new, cleaned daily by the owners | `reviews.quotes[]` Beth ("keeps it immaculate daily"), Jennine ("super clean"), Alina |
| offer ¶1 | one A/C dormitory, luggage space, wardrobe, lockers, hot showers, shared kitchen, dining, terrace, garden | `facilities[]` · `reviews.quotes[]` Beth ("loads of luggage space", "amazing showers") |
| offer ¶2 | rates move with dates | `gaps[]` "offers" — no price stated |
| info ¶1 | the black gate directions | `location.finding_it` — quoted almost verbatim from the guest review that describes it |
| info ¶2 | check-in/out, no credit cards, non-smoking, taxes included | `stayInfo` · `hours_note` |
| info ¶2 | parking, WiFi, laundry, housekeeping, bicycles, shuttle, pets | `facilities[]` |
| spot | Kabalana beach break | `location.spot` — third-party surf guide, described as the wave, not claimed by the business |

## Deliberately not written
- **No bed count.** Booking says a 6-bed dorm, a guest says one dorm of 4 bunk beds (`contradictions[]`). The copy says "one dormitory" and nothing more — not even "bunk beds", since Booking's room type says "single bed". Catherine's quote carries her own count as her own words.
- **No price.** Live dated OTA inventory.
- **No claim about reception hours beyond "limited"**, which is Hostelworld's own wording.
