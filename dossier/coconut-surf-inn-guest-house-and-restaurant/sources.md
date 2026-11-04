# sources — coconut-surf-inn-guest-house-and-restaurant (run 2026-10-midigama-01, harvester 0.5.0)

Fetched 2026-11-04 (UTC, 21:51–22:10), headless Chromium (playwright) at 1440×1400, en-GB locale (Airbnb en-US), a generic desktop User-Agent. Google pages loaded with the SOCS consent cookie and `hl=en`, no other cookies. Nothing was logged in to; no wall was bypassed. No owner contact (test mode).

**Aliases.** The scout merged a Google place "Coconut Beach" into this business because it has the same phone. The harvest shows that place is the **beach** (category Beach, 4.8 · 120 reviews about the beach, turtles and sunsets, address "Matara, Sri Lanka", pin 388 m SE). It carries the inn's phone, but its rating and reviews are not the inn's. The business's real second listing is **"Coconut Surf Restaurant (2nd floor)"**: its own upper-floor restaurant, with 4.6 · 39 reviews, hours 7:30–22:00 daily and house number "No 44". It is unclaimed and has no phone. The scout excluded it as "not a run type".

## The business's own surfaces

| URL | Yielded | Did not yield |
|---|---|---|
| Own website | None. Both Google listings show "Add website" | — |
| Instagram / Facebook / YouTube / Vimeo | None found: web searches below, no link on any listing | — |
| https://www.airbnb.com/rooms/2402254 (page + its `StaysPdpSections`, `StaysPdpReviewsQuery`, `StaysPdpPoliciesQuery` API responses) | **The host's own long description**, which names the breaks: "Coconuts is a consistent A-frame reef break, located in front of the guesthouse. Plantations is a more mellow wave, located just 100 meters walk up the beach". "09 rooms", the facilities, breakfast "not included to the Price", host Chinthaka with 13 years hosting, "the Eranga family home". Rating 4.44 · 54 with sub-scores. 24 reviews (2016–2022) with host responses. Check-in after 12:00, check-out before 12:00. **29 host photos** (img-108…136) | Reviews 25–54, which do not page without login |

## Platforms

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html (page, its Apollo state, hotel id 1592968) | Name, address "No.49, Kadabeddagama,Gurubebila,Weligama, 81700 Weligama", pin 5.960173, 80.403193, rating 8.5 Very good · 142 with sub-scores, Booking's description and its AI summary, 6 room types (beds, m², occupancy, description, facilities, photos), facilities, policies (check-in from 13:00, check-out until 11:00, pets free on request, cash), languages listed, **4 Q&A answers by the property, including "yes. coconut surf break ( 60m)"**. **107 property photos**: 45 in the gallery and 62 attached to rooms. Originals are up to 5152 px; they were downloaded at `max1920` | Prices (no dates entered); unit counts per room type |
| Booking GraphQL `/dml/graphql` (`ReviewList`, `Facilities`, `PropertyFaq`, `RoomPageDesktopRDS`, `PropertySurroundingsBlockDesktop`): requests the page itself makes, replayed from the page with skip/limit | **All 142 reviews** from 2023-11-07 to 2026-10-17. 94 carry text, 17 have owner replies, 13 have reviewer photos (not downloaded). Also the full facility list, the FAQ, surroundings with distances, and room details | — |
| https://www.booking.com/searchresults.en-gb.html?ss=Coconut+Surf+Inn+Weligama | The listing found under its name ("1 property found", 8.5 · 142) | — |
| https://www.google.com/maps/place/Coconut+Surf+Inn+Guest+House+and+Restaurant/… (the scout link, `hl=en`) | 4.8 · 88, "3-star hotel", address "Kadabeddagama Road Gurubebila, Weligama 81700, Sri Lanka", phone `tel:+94778921396`, plus code XC63+74, check-out 11:00. Booking.com, Agoda and HomeToGo offers (₪80 for 8–9 Nov, free breakfast). Hotel details (they list a "Pool", which no other source shows). Tripadvisor 5/5 · 4 (d7744329) with one truncated snippet. 202 photos, not downloaded: mostly guest uploads with unknown licence | Review texts (sign-in wall in the limited view) |
| https://www.google.com/maps/place/Coconut+Surf+Restaurant+%282nd+floor%29/… (found by a Maps search) | 4.6 · 39, Restaurant, "No 44 Kadebeddagama Gurubebila, Weligama 81700", hours 7:30 am–10 pm every day, plus code XC63+74, unclaimed, no phone, review topics (sesame tuna, tuna steak, ocean view, coconut ice cream), 63 photos (not downloaded) | Review texts |
| https://www.google.com/maps/place/Coconut+Beach/… (the scout's merged listing) | A beach place: 4.8 · 120, "Matara, Sri Lanka", phone +94 77 892 1396. Not the business | — |
| https://www.kayak.com/Weligama-Hotels-Coconut-Surf-Inn.2771966.ksp and https://www.es.kayak.com/Weligama-Hoteles-Coconut-Surf-Inn.2771966.ksp | 8.5 · 101 ("1 star"), "No.49, Kadabeddagama,Gurubebila,Weligama, Weligama 81700", phone +94 778 921 396, from $35 (Budget Double $25–26), check-in after 1:00 PM, check-out before 11:00 AM, 55 reviews (a Booking mirror) | Anything Booking does not have |
| https://www.momondo.com/hotels/weligama/Coconut-Surf-Inn.mhd2771966.ksp | Phone +94 778 921 396 (live). The search engine's summary claimed +94 713 177 978 there; that number is not on the live page and is not recorded as a fact | — |
| https://www.tripadvisor.com/Hotel_Review-g2492996-d7744329-Reviews.html | 403 to headless Chromium (bot wall), not retried. Rating and count were taken from Google | Reviews |
| https://www.agoda.com/search?q=Coconut%20Surf%20Inn%20Weligama | Redirected to Agoda's home page. No listing URL found; Agoda appears only as an offer in Google's prices | Listing |
| https://www.hostelworld.com/bed-and-breakfasts/p/315356/coconut-surf/ (search hit) | A different business: "Coconut Surf", San Juan del Sur, Nicaragua | — |
| https://srilankatravelpages.com/?p=35568 (WebFetch) | A third-party description of Coconut Point, Gurubebila: "A-frame point break offering long, peeling lefts and rights", "riding up to 400 m", intermediate, November to April. Recorded as `location.spot_reference` (not the business's words) | — |
| https://ceylonsliders.com/best-surf-spots-on-sri-lankas-south-coast/ | 404 | — |

## Video hunt (constraint 6)

| Surface | Result |
|---|---|
| Own site | None exists |
| YouTube / Vimeo channel of the business | None. Searches `ytsearch10:` "coconut surf inn", "coconut surf inn midigama", "coconut surf inn weligama", "coconuts surf midigama gurubebila" |
| YouTube, third-party (all `license: unknown`, fetched with `tools/fetch-video.mjs --no-renditions`, contact sheets looked at) | **vid-001** UEfSF9roEmk (Palm Resort Vault): affiliate listicle with a QR code on every frame; nearly all stock/AI footage. **vid-002** kWI-nZhZkwY (Mira Bela): a slideshow of 2017 stills of the pre-renovation building. **vid-003** 6MX7okgNikQ (channel "coconut point" = Freddy's at Coconut Point, a different business): drone film of the reef and the beach |
| YouTube, found and not fetched | VxmSL5lktKc (same Freddy's channel, village); kSM-exZf9Qk / b37ZDbFG0gQ (Lion's Rest, another hotel at Coconuts); bMmP62iWSoI, B9cMYCKekNc, gWJfRkv5Z2s, zaQYwUHPuSU (tourists' clips of Coconuts/Gurubebila); PVex1r0Djsk (Dew Drop Villa); general Midigama/Weligama vlogs |
| Instagram / Facebook reels | No account found |

No hero video. The first screen leads with img-009.

## Web searches (WebSearch)
"Coconut Surf Inn" Midigama OR Weligama · "coconut surf inn" instagram OR facebook OR youtube · "Coconut Surf Inn" Sri Lanka Chinthaka OR Eranga OR tripadvisor OR agoda OR hostelworld · "Coconut Surf Inn" "Gurubebila" OR "Kadabeddagama" OR the phone · agoda.com "Coconut Surf Inn" Weligama · Coconuts surf break Gurubebila A-frame reef Midigama Plantations. These returned Booking white-label pages (routard, easyJet, aegeanair), Kayak/Momondo, Airbnb, and other businesses (Cocoplant Surf Inn, Plantation Surf Inn, Sundance Surf Coconut Point, Lion's Rest). No own site or social account turned up.

## Media
- **Images:** `dossier/coconut-surf-inn-guest-house-and-restaurant/make-media.sh` (recipe, `# media: …/assets/img-*`) downloads every `images[].photo_url`: Booking `max1920`, plus the Airbnb originals scaled to ≤ 2000 px. It then checks sha256; `--write` re-records sha256 and size. There are 134 files. img-067 and img-082 were byte-identical duplicate Booking uploads; they were dropped and their files deleted.
- **Videos:** re-fetch with `tools/fetch-video.mjs coconut-surf-inn-guest-house-and-restaurant <source_url> --no-renditions`.
- **Manifest:** `media/coconut-surf-inn-guest-house-and-restaurant.tsv` has not been written by the harvester (the operator's step).

## Not attempted / blocked
- Google review texts: sign-in wall in the limited view.
- Tripadvisor: 403 bot wall.
- Airbnb reviews beyond the first 24: they do not page without login.
- Booking reviewer photos (13 reviews): not downloaded (`review-photo`, not needed).
- No owner contact (test mode).
