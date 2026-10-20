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

## Field-scoped pass 2026-09-23 — Google listing address (playbook 0.5.0 §6)

Fetched 2026-09-23 (UTC), headless Chromium (Playwright), `locale en-US`, logged out.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/place/The+Lavish+Haven+Hotel+And+Resort/@5.9794565,80.3508299,17z/data=!4m9!3m8!1s0x3ae113bbadfe5595:0x8d858b9ae5001097!5m2!4m1!1i2!8m2!3d5.9794565!4d80.3508299!16s%2Fg%2F11ypgcrxg6?hl=en (08:15:20Z; URL from the scout's candidates.json) | **Address `No166/1 walhengoda road, Ahangama 80650, Sri Lanka`** (now `location.address`); plus code `X9H2+Q8 Ahangama, Sri Lanka`; pin 5.9794565, 80.3508299 (from the place URL); phone +94 76 483 2988 (unchanged) | Nothing new beyond these |
| https://www.booking.com/hotel/lk/the-lavish-haven.html (08:16:03Z) | JSON-LD streetAddress `166/2 Welhengoda Road , 80650 Ahangama, Sri Lanka` — the page's visible text still shows no street address, which is why the 2026-09-19 pass missed it → `address_other_platforms` | — |

The `location.address` gap is closed. New contradiction: house number 166/1 (Google) vs 166/2 (Booking JSON-LD); the site uses Google's.

## Field-scoped correction 2026-09-28 — house rules and room table (harvester 0.3.0)

Prompted by the auditor trial (`funnel/booking-policies.png`); every item re-verified on a fresh fetch, not taken from the audit. Fetched 2026-09-28T09:12:44Z (UTC), headless Chromium (Playwright 1.62.1) at 1440×1400, `locale en-GB`, logged out, cookie dialog declined.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/the-lavish-haven.en-gb.html (HTTP 202, page rendered) | House rules, verbatim: **"Check-in — From 14:00 to 00:00"**, **"Check-out — Available 24 hours"**, **"Accepted payment methods — Cash"** (only method listed) → `stayInfo`. Room type table: **12 rows**, each a distinct name with its own beds (list in `room_types`) → `room_types` 9 → 12; the old 9 kept as `room_types_previous` | Nightly rates (need dates); cancellation/prepayment terms ("vary according to accommodation type") |

What changed in `dossier.json`: `stayInfo.checkInFrom` "14:00", `.checkInTo` "00:00" (midnight), `.checkOut` "Available 24 hours" (raw text, not a range), `.paymentMethods` ["Cash"]; `gaps[]` "stayInfo" removed; `room_types` replaced with the 12 names verbatim; `contradictions[1]` reworded (17 bedrooms vs 12 types — still unresolved); `hours_note.note` points at `stayInfo`; a `corrections[]` entry records this pass.

The 2026-09-19 pass's "check-in/check-out — not published" and "9 distinct room types" were wrong: it read the room table with shortened, merged names, and did not capture the house-rules block. Also on the page, not acted on: cot free on request, extra bed US$30 per night, pets not allowed, parties/events not allowed, children of any age welcome.

The "put to an owner" item 2 above (check-in/check-out times) is closed; item 1 (room count) now reads 17 bedrooms vs 12 types.
