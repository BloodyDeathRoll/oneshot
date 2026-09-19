# sources — the-lavish-haven (run 2026-09-ahangama-02, harvester 0.2.0, mode test)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400, `Accept-Language: en-US`.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/the-lavish-haven.html | Rating 9.2/34 with six category scores, **9 distinct room types**, ~26 facilities (pool, restaurant, spa, coffee house, kids' play area), breakfast detail, eight verbatim guest quotes with name + country, and the photo gallery | Nightly rates (need dates); check-in/check-out times — not published; a street address; full text of six quotes; any owner-written prose — "About this property" is Booking's generated summary |
| https://www.google.com/maps/search/The%20Lavish%20Haven%20Ahangama/@5.9794134,80.350836,17z?hl=en | Phone +94 76 483 2988, rating 5.0 over 21 reviews, all five-star, under the name "The Lavish Haven Hotel And Resort" | Review text (hotel-style listing), hours, website (none) |
| https://www.agoda.com/the-lavish-haven-h82617698/hotel/piyadigama-lk.html | Recorded as a second live booking channel | Not fetched |
| https://www.tripadvisor.com/Hotel_Review-g674590-d34333972-… | Confirmed a listing exists | Not fetched — TripAdvisor 403s this harvester |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Spot description (third-party, marked as such) | Nothing about this business |

## Images — and the filter that was needed
The first gallery pass returned **137** images: scrolling the property page sweeps in the "similar hotels nearby" carousel, so most belonged to other properties. Filtered by Booking photo id: the property page's own hero image is id `916751203`, and the gallery's own photos form a tight cluster around it (`916751114`–`916751338`), so only that range plus the two hero ids were kept. Result: **79 photos**, all rewritten to the `max1024x768` variant, deduped by sha256. Spot-checked four at random (pool at night, bedroom, balcony, bathroom) — all one property.

This filter should go into `agents/harvester/tools.md`: on Booking, cluster photo ids around the one that appears on the property page itself, or the gallery grab silently includes the neighbours.

## Test-mode check (`schemas/business-types.md`, `beach_lodging`)
- rooms[] ✔ (9 types) · ≥ 6 photos ✔ (79) · bookingLinks ✔ (Booking + Agoda) · facts for copy ✔ (26 facilities, 8 quotes, ratings on two platforms)
- stayInfo check-in/out ✘ — not published anywhere
- owner-written copy ✘ — Booking's summary is generated

**Judgement call, flagged for Shahar:** this fails the same two must-haves that disqualified surf-front and boardwalk-surf-villa. It is kept in the run anyway because the material is an order of magnitude richer (9 room types, 79 photos, 26 facilities, 8 quotes, two live booking channels), and a test of the pipeline is a test of whether the copywriter can write from facts. See the note in the report.

## Three things to put to an owner in a live run
1. Room count — a review summary says 17 bedrooms; Booking lists 9 room types with repeating names.
2. Check-in and check-out times — published nowhere.
3. Parking — Booking says free private parking, a guest calls it very small and hard with a car.

## One caution
One Booking review is authored by "Shahar, Israel". The name matches the operator of this pipeline. Confirm before that quote is used on a site or in a pitch.
