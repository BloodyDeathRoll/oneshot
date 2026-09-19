# scout-log — run 2026-09-ahangama-01

Scout 0.1.0, 2026-09-19 10:47–11:05 UTC. Mode `business`, anchor "The Lavish Haven, Ahangama, Sri Lanka", radius 100 m. All times UTC.

## 1. Anchor geocoding

| Step | Source | Result | fetched_at |
|---|---|---|---|
| Nominatim `q=The Lavish Haven, Ahangama, Sri Lanka` | https://nominatim.openstreetmap.org/search | `[]` (no match) | 10:47:26 |
| Nominatim `q=Lavish Haven Ahangama` | same | `[]` | 10:47:27 |
| Nominatim `q=Ahangama, Sri Lanka` | same | town node 5.9735163, 80.3622999 (context only) | 10:47:29 |
| Booking.com property page, curl | https://www.booking.com/hotel/lk/the-lavish-haven.html | HTTP 202 AWS-WAF challenge page, no content | 10:47:55 |
| Agoda property page, curl | https://www.agoda.com/the-lavish-haven-h82617698/hotel/piyadigama-lk.html | HTTP 200 JS shell, no address/coords in HTML | 10:48:02 |
| casai.com / vacationcottage.com mirrors, curl + WebFetch | … | HTTP 202 challenge, empty | 10:48:37 |
| **Booking.com property page, headless Chromium** | https://www.booking.com/hotel/lk/the-lavish-haven.html | `data-atlas-latlng="5.97941339533991,80.3508360317383"`; JSON-LD `streetAddress: "166/2 Welhengoda Road , 80650 Ahangama, Sri Lanka"`; name "The Lavish Haven - Ahangama"; rating 9.3 / 34 reviews | **10:49:10** |
| Nominatim reverse of that point (zoom 18) | https://nominatim.openstreetmap.org/reverse?lat=5.97941339533991&lon=80.3508360317383 | "Thiththagalla Road, Kabalana, Galle District, 80650" | 10:49:30 |
| TripAdvisor page, WebFetch and headless | https://www.tripadvisor.com/Hotel_Review-g674590-d34333972-… | HTTP 403 both ways | 10:50:35 |
| **Google Maps place, headless Chromium (consent cookie)** | https://www.google.com/maps/search/The+Lavish+Haven+Hotel+And+Resort+Ahangama | "The Lavish Haven Hotel And Resort", pin `!3d5.9794565!4d80.3508299`, address "No166/1 walhengoda road, Ahangama 80650", plus code X9H2+Q8, tel:+94764832988, 5.0 (21), Hotel, no website field | **10:51:44** |

Decision: anchor = Booking.com pin **5.97941339533991, 80.3508360317383** (the first source that gave a coordinate). Google Maps' pin is 5 m away, so two independent publishers agree. The Booking text "2-minute walk from Kabalana Beach" and the reverse-geocode to Kabalana village are consistent. The OSM coastline (way 23463869) is 243 m from the pin, so "2-minute walk" is plausible.

Recorded in `area.geojson` (anchor Point + 64-point circle, pure-python equirectangular: 1° lat = 110.6 km, 1° lng = 110.0 km; shapely/pyproj not installed). Polygon vertices lie at 100 m; chord midpoints at 99.88 m.

## 2. Sources queried and counts

| Source | Query | Elements returned | Within 100 m polygon | Notes |
|---|---|---|---|---|
| OSM Overpass (overpass-api.de) | all `name`/`shop`/`tourism`/`amenity`/`leisure`/`sport` in the 500 m bbox | 64 | **0** | nearest POI a cafe at 176 m; OSM business coverage here is thin and mostly unnamed `tourism=guest_house` buildings. Fetched 10:50:05 |
| OSM Overpass, coastline `out geom` | 2 attempts (overpass-api.de, overpass.kumi.systems) | timeout / "server too busy" | – | fell back to api.openstreetmap.org/api/0.6/way/23463869/full.json at 11:02:25 (1,222 nodes) for shore distances |
| Google Maps search, headless, centred on the anchor at z18, feed scrolled | `surf`, `hotel`, `restaurant`, `cafe`, `villa`, `guest house`, `hostel`, `surfboard rental`, `surf shop`, `yoga`, `apartment`, `homestay`, `shop` | 484 unique places within ~700 m | **11 listings, 10 businesses** | 10:52:28–10:55:59. Coordinates taken from each result's `!3d…!4d…` href; point-in-polygon in python |
| Google Maps place pages, headless | one per inside listing | 9 | – | 10:56:55–10:57:34: phone, address, website, category, "Temporarily closed" |
| Booking.com, headless | The Lavish Haven; Villa Vera | 2 | – | pins, addresses, host text |
| Instagram / Facebook, headless (og tags only, no login) | @brizasurf_kabalana; /sionsurflanka | 2 | – | 10:59:43, 10:59:51 |
| Web search | "The Lavish Haven" Ahangama (+ instagram/facebook variants), "Welhengoda Road" Ahangama, "Thiththagalla Road", "Briza Surf", "Sion Surf", "Villa Vera", "Amesh Villa" | – | – | for addresses, socials, and the Sion camp location |
| Existing website test | http://www.sionsurfcamp.com/ | curl -IL + headless | – | 301 → juliediamondfitness.com → 301 → idcwin88lagi.com (gambling). No other candidate has a website to test |

Sources that failed: TripAdvisor (403 to everything), Booking/Agoda/casai/vacationcottage via curl and WebFetch (bot challenges; headless Chromium worked for Booking), Overpass coastline (`out geom`) timed out twice, Instagram bio beyond the og:description (not attempted further; a login wall).

## 3. Everything found inside the 100 m polygon

| # | Name (Google Maps) | Google category | dist to anchor | lat, lng | Verdict |
|---|---|---|---|---|---|
| 1 | The Lavish Haven Hotel And Resort | Hotel | 5 m | 5.9794565, 80.3508299 | **candidate** `the-lavish-haven` (anchor) |
| 2 | Jasmine place | Restaurant | 20 m | 5.9792563, 80.3507533 | excluded: restaurant, no `run.yaml` type; +94 77 800 4194, 4.3 (12) |
| 3 | Babi's place | Sri Lankan restaurant | 40 m | 5.9794873, 80.3511912 | excluded: restaurant; +94 71 649 6468, 4.2 (27) |
| 4 | Falafel B | Falafel restaurant, "221/1 Welhengoda Road" | 58 m | 5.9792436, 80.3513341 | excluded: restaurant; 3.7 (3) |
| 5 | Manju's place hotel & restaurant | Restaurant ("hotel" in the local sense of eatery; Google category is Restaurant) | 70 m | 5.9788422, 80.3511068 | excluded: restaurant; +94 76 375 5368 |
| 6 | Sion Surf Shop and Cafe | Surf shop, "Temporarily closed" | 75 m | 5.9793846, 80.3501572 | **candidate** `sion-surf-shop-and-cafe` |
| 7 | East Falafel & More | Mediterranean restaurant | 75 m | 5.9799756, 80.3512131 | excluded: restaurant; instagram.com/east_falafel, +94 71 492 8363 |
| 8 | Amesh Villa | Villa, 5.0 (3), no phone, no website | 78 m | 5.9800463, 80.3505174 | excluded: lodging with no evidence of marketing to surfers (Google listing only; web search found nothing). Borderline, see §5 |
| 9 | Vera Villa | Villa, 5.0 (16), +94 74 104 0000 | 87 m | 5.97874, 80.35042 | **candidate** `villa-vera-ahangama` |
| 10 | Villa Vera - Superior Villa | Lodging (room-level listing) | 89 m | 5.9787302, 80.3504105 | duplicate of #9 (same name, 12 m apart) — merged |
| 11 | Briza Surf Kabalana | Surf school, 5.0 (1), +94 74 164 8662 | 99 m | 5.9787537, 80.3502322 | **candidate** `briza-surf-kabalana` — 1 m inside the polygon edge |

OSM: nothing inside. First item outside the polygon: Puffer Fish Villa at 100.9 m (5.9802678, 80.3511587; Villa, 5.0 (4), +34 636 32 38 30) — excluded as outside buffer.

Counts: found inside 11 listings → 10 businesses after dedupe → 4 surf-related candidates → scores: 1 × 3 (Lavish Haven, Briza, Villa Vera), 2 × 1 (Sion). Shortlist (score ≤ 2): all 4. `max_sites` is 3; not trimmed.

## 4. Spot check (3 entries against the map)

- `the-lavish-haven`: Booking pin and Google pin 5 m apart; reverse-geocodes to Kabalana village; 243 m from OSM coastline. Consistent.
- `villa-vera-ahangama`: Google pin 5.97874,80.35042 vs Booking pin 5.97873108,80.35041314 — 1 m apart. Consistent.
- `briza-surf-kabalana`: only one pin (Google). It is inland on Kabalana Rd, ~150 m from the shore. Surf schools on Kabalana typically operate from the sand, so the human should check whether the pin is the office/home or the beach post.

## 5. Judgement calls the human should look at

- **Amesh Villa** was excluded under base.md constraint 5 ("beach hotels that merely sit on the coast are not `beach_lodging` unless they market to surfers"): the only trace is a Google listing with 3 reviews and no phone/site. If "everything inside goes in" is meant literally regardless of type, add it as `beach_lodging`, score 0, confidence ~0.2.
- **The Lavish Haven** is in because the run brief says the anchor is a candidate. Its own marketing is beach, not surf (confidence 0.4).
- **Villa Vera** shares phone +94 74 104 0000 with "Nina Villa" (113 m, outside). Dedupe rule 6 (same phone → one business) would merge them, but they carry different names and pins 35 m apart; I kept Villa Vera alone and note the shared number.
- **Sion Surf Shop** is "Temporarily closed" per Google. The parent camp (Sion Surf Camp) is at Goviyapana Junction, outside the area; the shop is what sits in the circle. Its domain is dead/hijacked — a strong pitch angle if the owner is reachable through the camp.
- **Presence scale gap:** three of four candidates exist only as Google + OTA (Booking/Agoda) listings with no site and no social. The 0–5 scale has no rung for "third-party listings only"; I scored them 1 (closest to "Facebook/Instagram only") and tagged `ota_listings_only`.

## 6. Context: what is within 500 m (log only, not candidates)

Google Maps returned 189 places between 100 and 500 m of the anchor. The surf-related ones (Google category or name), by distance:

| dist | Name | Category / hint |
|---|---|---|
| 118 m | Nirvana Surf Retreat | Hostel |
| 152 m | Mellow Hostel | Hostel, 4.6 (291), €17 |
| 170 m | Boardwalk surf villa (+ "Boardwalk Surf Villa" / "…2" listings) | Villa, 4.6 (9) |
| 170 m | Surf Front | Villa |
| 191 m | Surf Inn Kabalana Beach Villa | Hostel / surf school, "179 Matara Road Welhengoda Junction" |
| 193 m | Wake N Flow, Ahangama - Kabalana Beach | Hostel, €11 |
| 194 m | Surf Loft | Apartment |
| 204 m | Sun and Surf Rest / Sun and Surf | Hostel / house, 3.3–4.2 |
| 206 m | Good Story Surf School - Ahangama | 2-star hotel + surf school, 4.6 (81) |
| 208 m | Sun Surf Villa | Lodging |
| 208 m | Plam Beach Restaurant And Surf School | Restaurant, 1.6 (15) |
| 209 m | Licuala Lanka Surf Loft | Holiday apartment, 5.0 (1) |
| 215 m | Tharanga Surfing Villa | Hotel, 3.4 (38) |
| 225 m | Surf Revolution Kabalana | Surf school, 5.0 |
| 226 m | Layday Surf Ahangama | Hostel |
| 228 m | Bappa surf school | Surf school, 4.7 |
| 228 m | Kabalana Surf Point - Kasun's Place | Surf school, 4.3 |
| 228 m | Sayon Surf School Ahangama Sri Lanka | Surf school, 4.8 |
| 232 m | Soul & Surf - Kit. | Surf shop, no reviews |
| 236 m | Sam Surf and Tours | Surf school, no reviews |
| 252 m | Solas Surf | Hotel / surf school, 4.9 (own site solassurf.com per web search) |
| 253 m | Ashen Surf School | Surf school, 4.9 |
| 254 m | hool kabalana | Surf school, 5.0 (2) |
| 256 m | Artur & Barbara's Surfing Villa | 2-star hotel, 4.9 (81) |
| 257 m | Laza Surf Point | Surf school, 4.7 |
| 265 m | Kabalana Home Waves Surf School | Surf school, 4.9 |
| 276 m | Lollipop Surf School | Surf school, 5.0 |
| 280 m | Kabalana beach | Tourist attraction, 4.7 (829) — the break itself |
| 289 m | summer of surf accommodation | Hotel, 4.8 (5) |
| 293 m | KA Surf Restaurant / KA surf hostel and restaurant (298 m) | Restaurant / hotel, 4.8 (42) |
| 295 m | DAD & SUN SURF SCHOOL | Surf school, 3.9 (7) |
| 297 m | HR Surfing Place | Surf school, 5.0 |
| 312 m | D & S Restaurant and Surf Camp | Restaurant / surf camp, 3.9 (55) |
| 340 m | Prebo´s Beachub | Surf school, no reviews |
| 365 m | Blue Whale surf hotel | Hotel, 4.0 (2) |
| 380 m | Pearl Surf Resort | Hotel, 5.0 (10) |
| 388 m | Lapoint Surf Camp | Surf school / resort, 4.8 |
| 392 m | Sandil Surf House | 3-star hotel, 4.6 (28) |
| 394 m | Surf Villa Ahangama | Villa, 5.0 (2) |
| 396 m | Gota Dagua Surf Camp Sri Lanka - Ahangama | Surf school / hostel, 5.0 |
| 412 m | Kabalana Surf Hostel | Hostel, 4.5 (OSM: hostelworld link) |
| 466 m | JUICE DOGZ SURF HOUSE | Hotel, 5.0 (10) |
| 495 m | PULSE Marine showroom | Surf shop, 5.0 |
| 495 m | ONDA - KABALANA | Surf shop, 3.5 |

Plus ~140 non-surf places (villas, guest houses, cafes, restaurants) in the same ring; the full list with coordinates is in the scratch data (`near_all.json`), not copied here. Take-away for the radius question: the surf-school cluster on Kabalana Rd / the beach starts at ~200 m from the anchor and holds ~20 surf schools and ~15 surf-branded lodgings inside 500 m. A 100 m circle catches the anchor plus one borderline surf school, one closed surf shop and one villa; 250–300 m would catch the whole Kabalana cluster.

## 7. Prompt / schema / run.yaml issues met in practice

1. `agents/scout/tools.md` is a one-line header; base.md points to it for the geocoder, coastline fetch, buffer/PIP, Places, web search and headless browser. Everything above was improvised from the run brief.
2. `taxonomy.md` is header-only; used `run.yaml` `types` as the list. Restaurants/cafes have no type, so they cannot be candidates even when inside.
3. Presence scale has no rung for "OTA/Google listings only, no site, no social" (see §5). Suggest a criteria tag or an explicit rung.
4. Schema `area.anchors[].geocoder` is a free string; there is no field for the geocoder's source URL, so I added `geocoder_source_url` (extra field, not in the schema).
5. Schema `location` has `distance_to_shore_m` but no `distance_to_anchor_m`, which is the useful number in `business` mode; added it as an extra field.
6. Base.md "everything inside the polygon goes in" (constraint 7) and "surf-related by taxonomy" (constraint 5) pull in opposite directions for lodging with no surf marketing (Amesh Villa). Needs a rule.
7. Base.md output says `area.geojson` holds "the coastline segment (town/stretch)"; nothing is said for `business` mode. I wrote anchor + circle only.
8. Booking.com property pages are the most reliable coordinate source when Nominatim fails, but only in a real browser (curl/WebFetch get WAF challenges). Worth writing into tools.md. Google Maps needs a consent cookie in headless mode.
9. run.yaml `max_sites: 3` with a shortlist of 4 — not trimmed, per base.md constraint 7.
10. Numbers: Google shows phones as "+94 76 483 2988"; I removed spaces to make E.164 (`+94764832988`), the same digits as Google's `tel:` link. No number was retyped from another format.
