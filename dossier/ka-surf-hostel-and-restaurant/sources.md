# sources — ka-surf-hostel-and-restaurant (run 2026-09-ahangama-02, harvester 0.1.0)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400, `Accept-Language: en-US` (Booking.com otherwise serves the browser's locale — Hebrew here).

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/ka-surf-hostel.html | Address, rating 9.5/38 with all seven category scores, six room types, ~16 facilities, house rules, check-in/out policy, legal note ("managed by a private host"), seven verbatim guest quotes with name + country, 12 property photos | Nightly rates — the availability table needs dates chosen in the widget; full text of one quote ("Read more") |
| https://www.hostelworld.com/hostels/p/331096/k-a-surf-hostel/ | **The owner's own marketing copy** ("Surf, Chill & Feel at Home in Ahangama" + the full Why Stay With Us / Comfort / Extras / Family-Run blocks) — the best writing this business has anywhere; rating 9.8/66 with category scores; check-in 13:00–23:00, check-out until 13:00; nine more facilities; three dated guest quotes with age/country | Its own "From €" price (rendered only for the other hostels in the list); images (served through a lazy gallery this probe did not trigger) |
| https://www.instagram.com/kasurfhostel/ | Bio ("Best for who interested surfing"), 1,494 followers, 12 grid tiles with permalinks | Captions, highlights (logged-out wall); anything above 640 px |
| https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en | Phone +94 77 374 6053, rating 4.8/42 with breakdown (40×5, 1×2, 1×1), the listing name "…and restaurant" | Review text (hotel-style listing, none rendered logged out), hours, website (none) |
| https://www.tripadvisor.com/Hotel_Review-g674590-d34170013-…-KA_Surf_Hostel-… | Confirmed a listing exists | Not fetched — TripAdvisor 403s this harvester (known from the scout run) |
| https://www.agoda.com/en-in/ka-surf-hostel-h61738910/hotel/ahangama-lk.html | Recorded as a third booking channel | Not fetched |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Spot description (third-party, marked as such) | Nothing about this business |

## Images
24 files: 12 from the Booking.com listing (576–1024 px; `square60`/`max500` URLs rewritten to `max1280x900` before download) and 12 from the Instagram grid (640 px). Both are marked `business-owned` — the Booking photos are property uploads, and Shahar approved OTA listing photos as usable on 2026-09-19. Deduped by sha256.

## Not attempted / blocked
- Booking.com nightly rates: require selecting dates in the availability widget. Rates are live, dated inventory, not a stable published fact — recorded as a gap rather than frozen into the dossier.
- Instagram captions and highlights, TripAdvisor: walls / 403. Never logged in (hard constraint 5).

## Four contradictions to put to the owner
1. Parking — Booking says none, Hostelworld says free.
2. Check-in — Booking says 24 hours, Hostelworld says 13:00–23:00.
3. WiFi — the owner advertises reliable fiber, Booking guests score it **2.5/10**.
4. Name — Google says "and restaurant"; no OTA mentions a restaurant at all.

## For the next run
- Hostelworld is the richest source for a hostel: it carries the owner's own long-form copy, which Booking does not.
- Send `Accept-Language: en-US` to Booking.com or the page comes back in the browser's locale.

## Field-scoped pass 2026-09-23 — Google listing address (playbook 0.5.0 §6)

Fetched 2026-09-23 (UTC), headless Chromium (Playwright), `locale en-US`, logged out.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en → resolved to https://www.google.com/maps/place/KA+surf+hostel+and+restaurant/@5.9794134,80.350836,17z/data=!4m9!3m8!1s0x3ae11300437b1eb3:0xc601caff438d6704!5m2!4m1!1i2!8m2!3d5.9818405!4d80.3520113!16s%2Fg%2F11y9z16whv?hl=en (08:44:02Z) | **Address `207/A welahangoda, Ahangama, Sri Lanka`** (now `location.address`); plus code `X9J2+PR Ahangama, Sri Lanka`; pin 5.9818405, 80.3520113 (from the place URL); phone +94 77 374 6053 (unchanged) | **A postcode** — the listing shows none |

The Booking.com address (`No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka`) and Hostelworld's `207/A welahangoda` moved to `location.address_other_platforms`; neither was re-fetched. The approximate scout pin (5.9805, 80.3486) is replaced by the listing's pin; the plus code matches the scout's.

**Gap:** Google's address has no postcode, so the site's current `207/A Welahangoda, 80650 Ahangama, Sri Lanka` matches Google on neither spelling (`Welahangoda` vs `welahangoda`) nor postcode (80650 is Booking's). Recorded in `gaps[]` as `location.address.postcode`, not filled.
