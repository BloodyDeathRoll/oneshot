# sources — lotus-surf-house (run 2026-10-midigama-01, harvester 0.5.0)

Fetched 2026-11-03 (UTC, 17:30–18:10), headless Chromium (playwright) at 1440×1400 with an en-GB locale. Google pages loaded with the SOCS consent cookie and `hl=en`, no other cookies. Nothing was logged in to. The scout merged two Google listings into this business (Lotus Surf House ← Yelum Guest House: same phone, 7 m apart); the harvest confirms it — Booking's old URL `/hotel/lk/yelum-guest-house` redirects to `/hotel/lk/lotus-surf-house`.

## The business's own surfaces

| URL | Yielded | Did not yield |
|---|---|---|
| Own website | None exists: the Google listing says "Add website"; the old listing's website is the Facebook page below | — |
| https://www.facebook.com/Yelum-guest-house-midigama-1553875118208096/ (the old Google listing's website) → https://www.facebook.com/people/Midigama-guesthouse-YELUM/100054389085744/ and `/about` | Logged-out page "Midigama guesthouse YELUM", Hotel, 677 followers, intro "Midigama ahangama, Matara, Sri Lanka", phone **+94 71 258 5804** (differs from Google), one visible post 12 Nov 2018 "with Yelum Manoj". ~10 photo thumbnails (2018, ≤ 960 px, signed expiring CDN URLs) — not downloaded: older and smaller than the Booking set | Posts, photos, reels (login wall); email; WhatsApp |
| Instagram | Nothing found (web searches below; no handle linked from any listing) | — |
| YouTube / Vimeo channel of the business | None found | — |

## Platforms

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html (page, its embedded Apollo state and `hotelPhotos`, hotel id 5590766) | Name, address "Indhana Road, 80650 Midigama, Sri Lanka", 9.0 Superb (125) with sub-scores, Booking's description, 8 room units in 4 room types (beds, m², occupancy, description, facilities, per-room photos), property facilities and policies (check-in 24 h, check-out 11:00–12:00, cash only, pets on request, children welcome, no parking), surroundings with distances, FAQ, spoken languages (en). **44 property photos** (42 in the gallery + 2 only on the Deluxe Queen room), uploaded 2021-10-30 – 2025-12-24, downloaded at `max1920` (originals ≤ 1600 px) | Prices (no dates entered); host profile text; Q&A (none) |
| https://www.booking.com/hotel/lk/yelum-guest-house.en-gb.html | 302 → the lotus-surf-house page (proves the two names are one property) | — |
| Booking GraphQL `/dml/graphql` (`ReviewList`, `Facilities`, `PropertyFaq`, `RoomPageDesktopRDS`, `PropertySurroundingsBlockDesktop`) — the requests the page itself makes, replayed from the page with skip/limit to page through the list | All 125 reviews (author, country, date, score, room, nights, title, positive/negative text, language) and **70 owner replies** (one long, signed "Yelum"); 85 reviews carry text | — |
| https://www.booking.com/searchresults.en-gb.html?ss=Lotus+Surf+House+Midigama | The listing found under its name | — |
| https://www.google.com/maps/place/Lotus+Surf+House/... (scout link, `hl=en`) | 4.9 (78), "3-star hotel", address "5.965106, 80.392243, Indhana Rd, Midigama 80650, Sri Lanka", phone +94 77 464 7541 (`tel:+94774647541`), plus code X98R+3W, Booking.com and Agoda offers (ILS 119 for 8–9 Nov, free breakfast), Tripadvisor 5/5 · 5 (entity d19431857), hotel details incl. "Pool", "Restaurant" (contradicted everywhere else), 150 photos (not downloaded: mostly guest uploads, licence unknown) | Review texts (sign-in wall in the limited view); website (none) |
| https://www.google.com/maps/place/Yelum+Guest+House/... | 4.7 (13), "Guest house", address "5.965106, 80.392243, Indhana Rd, Sri Lanka", same phone, website = the Facebook page, Tripadvisor entity d7736476 | Review texts |
| https://www.kayak.com/Midigama-East-Hotels-Yelum-Guest-House.3733075.ksp (and the scout's es.kayak.com twin) | Page title now "Lotus Surf House", 9.0 Wonderful (138), "Indhana Road, Midigama East 11200" (postcode differs), phone +94 774 647 541, from $19; check-in 12:00 / check-out 10:00 (differs from Booking) | Anything Booking does not have |
| https://www.priceline.com/hotel-deals/en-us/P5000497909/H73226805/lotus-surf-house.ssp | 9.3 Exceptional (45 verified), Booking's AI summary, 42 photos (the Booking set), from $31 | Anything Booking does not have |
| https://www.agoda.com/search?q=Lotus%20Surf%20House%20Midigama | Redirected to Agoda's home page; listing URL not found (Agoda only seen as an offer in Google's prices) | Listing |
| https://www.tripadvisor.com/Hotel_Review-g2492996-d19431857-Reviews.html, https://www.tripadvisor.com/Hotel_Review-g2492996-d7736476-Reviews.html | 403 to headless Chromium (bot wall); not retried. Rating/count taken from Google | Reviews |
| https://www.hostelworld.com/hostels/p/296178/lotus/ (search hit) | A different property ("Lotus", Shiraz, Iran) — unrelated | — |

## Video hunt (constraint 6)

| Surface | Result |
|---|---|
| Own site | None exists |
| YouTube / Vimeo channel of the business | None. Searches: `ytsearch8:` "lotus surf house midigama", "yelum guest house midigama", "yelum midigama" |
| YouTube, third-party (all `license: unknown`, fetched with `tools/fetch-video.mjs --no-renditions`) | vid-001 RJqzt6e_0ks (Coastal Stay Journal, 2026-09-27, affiliate listicle with QR codes, mostly AI/stock scenes that are not the property); vid-002 gbUYkE1xlnI (Travel With Sandhya, 2023-04-17, real footage: roof terrace, garden with surfboards, an aerial to the sea, surf selfies in the water — best footage, unusable without the owner); vid-003 Wmj8cJU7oc0 (Travel With Sandhya, 2025-05-31, slideshow of stills with Booking's room data) |
| YouTube, found and not fetched | urbZl1Scl5c "Lotus Surf Camp … Lotus Files" (a different business), sCu4bFyvR0Q, LgdMxs4EwQw, JzYw3zTK_es, LaF5jcMSDR4, uSWcfGrGTdM (general Sri Lanka / other properties) |
| Instagram reels | No account |
| Facebook reels | Behind the login wall |

Contact sheets for every fetched video: `assets/video/vid-00N-sheet.jpg`. All three looked at; `shows` written from the frames. No hero candidate.

## Web searches (WebSearch)
"Lotus Surf House" Midigama · "Yelum Guest House" Midigama · "Lotus Surf House" OR "Yelum guest house" instagram OR agoda OR hostelworld OR airbnb · "lotussurfhouse" OR "lotus surf house midigama" OR "yelum midigama". They returned the Priceline, Kayak, easyJet/flytap (Booking white-label city pages) and atrapalo listings, and unrelated "Lotus" properties elsewhere; no own site, no Instagram, no Airbnb/Hostelworld listing of this property.

## Media
Images: `dossier/lotus-surf-house/make-media.sh` (recipe, `# media: dossier/lotus-surf-house/assets/img-*`) downloads every `images[].photo_url` and checks sha256; `--write` re-records sha256/size. Videos: re-fetch with `tools/fetch-video.mjs lotus-surf-house <source_url> --no-renditions`. Manifest: `media/lotus-surf-house.tsv`.

## Not attempted / blocked
- Google review texts: sign-in wall in the limited view. Not bypassed.
- Tripadvisor: 403 bot wall. Not bypassed.
- Facebook posts/photos/reels: login wall. Not bypassed.
- No owner contact (test mode).
