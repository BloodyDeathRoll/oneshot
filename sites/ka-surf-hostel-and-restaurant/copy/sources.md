# copy sources — ka-surf-hostel-and-restaurant · en

One line per paragraph, naming the `dossier.json` fields it rests on. A paragraph with no line here is not shippable.

| Block | Paragraph | Rests on |
|---|---|---|
| tagline | "Surf, chill and feel at home in Ahangama" | `business.tagline` — the owner's own Hostelworld headline, lower-cased |
| intro ¶1 | family-run, five-minute walk, check the surf before breakfast | `business.run_by` · `location.distance_to_beach` ("Kabalana Beach 450 yd / a 5-minute walk") · `business.description` |
| intro ¶2 | dorms or private rooms | `room_types[]` (3 dorm types, 3 private) · `business.description_long` ("Dorms & Private Rooms") |
| about ¶1 · para 1 | guests say "family"; the dengue story (heading: what guests say about the staff — rests on this row and the next) | `reviews.quotes[]` Clara, Luzzi, Nanet, Elena (all use "family") · Mia (dengue in Kandy, "helped nurse me back to health with Ayurvedic medicines (on top of what the hospital was already giving me)") — reported as her account, not a claim in the business's voice |
| about ¶1 · para 2 | staff top score on Booking; 9.9 on Hostelworld behind value for money and security | `reviews.booking.categories` (Staff 9.9 is the highest; next Value for money 9.4) · `reviews.hostelworld.categories` (Staff 9.9; Value for Money 10.0 and Security 10.0 higher; all others ≤ 9.8) |
| about ¶2 | breakfast, daily change, vegan | `business.description_long` ("daily free healthy breakfast (rotis, fruits, pancakes, eggs — vegan options available)") · `reviews.quotes[]` Elena ("roti, hoppers… changes every day") |
| offer ¶1 | room list, A/C + fan, locker, fridge, bathrooms, hot showers | `room_types[]` · `business.description_long` · `facilities[]` |
| offer ¶2 | rates change with dates | `gaps[]` "offers" — rates are live dated OTA inventory; no price is stated, the booking links carry it |
| info ¶1 | garden, filtered water, laundry, minimarket, scooter + surf rack, lockers, 24h reception | `facilities[]` and `business.description_long` |
| info ¶1 | pets welcome; no children | `house_rules[]` ("Pets are allowed on request. No extra charges." / "Children are not allowed") |
| info ¶2 | distances and shuttle | `location.nearby` (Koggala Airport 3.3 mi, Ahangama station 1.3 mi) · `facilities[]` shuttle service |
| spot | Kabalana beach break + The Rock | `location.spot` — third-party surf guide, written as a description of the wave, not as a claim by the business |
| rooms / amenities / ratings / testimonials / contact / bookingLinks | — | copied straight from `room_types[]`, `facilities[]`, `reviews.*`, `contact.*`, `booking.*` |

## Deliberately not written
- **No WiFi speed claim.** The owner advertises "reliable fiber internet" but Booking guests score WiFi **2.5/10** (`contradictions[]`). Neither claim appears in the copy.
- **No parking statement.** Booking says none, Hostelworld says free (`contradictions[]`).
- **No restaurant.** Google's listing name says "and restaurant" but no source describes one (`gaps[]`).
- **No check-in claim beyond Hostelworld's window.** Booking says "24 hours", Hostelworld says 13:00–23:00; the specific window is used and the 24-hour reception stated separately.
- **No prices.** Live dated inventory only.
