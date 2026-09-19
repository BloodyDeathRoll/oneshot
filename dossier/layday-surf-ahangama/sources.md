# sources — layday-surf-ahangama (run 2026-09-ahangama-02, harvester 0.2.0, mode test)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400, `Accept-Language: en-US`.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.hostelworld.com/hostels/p/337893/layday-surf-ahangama/ | **The owner's own copy** ("Surf, Chill & Feel at Home in Ahangama" + the full paragraphs); rating 9.8/10 over 10 reviews with all seven category scores at 10.0; check-in 14:00–19:00, check-out until 14:00; house rules (no credit cards, non-smoking, taxes included); three dated guest quotes; the black-gate directions | Its own "from US$" price (shown only for other hostels in the list); gallery images |
| https://www.booking.com/hotel/lk/layday-surf-ahangama.html | Address, rating 10/6 (location 9.6), one room type, ~25 amenities, five verbatim guest quotes with name + country, and the photo gallery | Nightly rates (need dates); full text of three quotes; check-in times — Booking does not publish them here |
| Booking.com photo gallery (opened via the gallery button, scrolled) | 22 property photos at 576–1024 px after rewriting each URL to the `max1024x768` variant and deduping by photo id and sha256 | The listing claims 47 photos; the rest sit behind further gallery paging |
| https://www.google.com/maps/search/Layday%20Surf%20Ahangama/@5.9794134,80.350836,17z?hl=en | Phone +94 77 855 3343, rating 5.0 over 15 reviews, all five-star | Review text (hotel-style listing), hours, website (none) |
| https://www.agoda.com/layday-surf-ahangama/hotel/piyadigama-lk.html | Recorded as a third booking channel | Not fetched |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Spot description (third-party, marked as such) | Nothing about this business |

## Test-mode check (`schemas/business-types.md`, `beach_lodging`)
- rooms[] ✔ · stayInfo check-in/out ✔ · ≥ 6 photos ✔ (22) · bookingLinks ✔ (3 OTAs) · owner-written copy ✔ (Hostelworld)
- **Buildable from public material alone.** No owner contact needed.

## Not attempted / blocked
- Booking nightly rates: live dated inventory, recorded as a gap rather than frozen into the dossier.
- Quote expansion behind "Read more": needs a logged-in session. Never logged in (hard constraint 5).

## Two things to put to the owner later
1. How many beds — Booking says a 6-bed dorm, a guest says one dorm of 4 bunk beds.
2. The unmarked black gate. Guests say the place is hard to find and a sign was promised; directions and a map on the new site fix it immediately.
