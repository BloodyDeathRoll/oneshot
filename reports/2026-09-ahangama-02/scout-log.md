# scout-log — run 2026-09-ahangama-02

Scout 0.1.0, 2026-09-19 11:08–11:50 UTC. Mode `business`, anchor "The Lavish Haven, Ahangama, Sri Lanka", radius **300 m** (rerun of `2026-09-ahangama-01`, whose 100 m circle the human rejected as too small). All times UTC.

## 1. Anchor geocoding (reused from run 01)

Nominatim does not know the business (`[]` for both query forms, run 01 §1). Anchor = Booking.com property-page map pin **5.97941339533991, 80.3508360317383** (`data-atlas-latlng`, headless Chromium, fetched 2026-09-19T10:49:10Z, https://www.booking.com/hotel/lk/the-lavish-haven.html), cross-checked against the Google Maps place pin 5.9794565,80.3508299 (5 m away, fetched 10:51:44Z). Evidence is younger than a day, so it was not re-fetched.

`area.geojson`: anchor Point + 64-vertex circle at 300 m, pure-python equirectangular (1° lat = 110.6 km, 1° lng = 110.0 km; shapely/pyproj not installed). Vertices at 299.99–300.01 m, chord midpoints at 299.64 m. Bounding box 5.976701,80.348109 – 5.982126,80.353563. Deterministic from run.yaml.

Shore distances: OSM coastline way 23463869 (api.openstreetmap.org/api/0.6/way/23463869/full.json, 1,222 nodes, fetched 11:02:25Z in run 01, cached); distance = nearest point on any segment. Anchor pin is 239 m from the coastline.

## 2. Sources queried and counts

| Source | Query / scope | Returned | Inside 300 m | Notes |
|---|---|---|---|---|
| Google Maps search, headless Chromium (consent cookies), z18, feed scrolled — **run-01 cache** | 13 generic queries centred on the anchor (`surf`, `hotel`, `restaurant`, `cafe`, `villa`, `guest house`, `hostel`, `surfboard rental`, `surf shop`, `yoga`, `apartment`, `homestay`, `shop`), fetched 10:52–10:56Z | 243 unique places within 700 m (cache `near_all.json`; run 01's "484" counted raw feed rows) | 106 | reused, not re-fetched |
| Google Maps search, headless, z18, feed scrolled ×10 — **new** | 12 surf/lodging queries from the anchor (`surf school`, `surf camp`, `surf hostel`, `surf villa`, `surf house`, `surf lessons`, `surfboard`, `lodging`, `resort`, `bed and breakfast`, `boutique hotel`, `retreat`) + 16 queries from four off-centre points (SW 5.9776,80.3500; E 5.9785,80.3524; N 5.9812,80.3505; W 5.9787,80.3487: `surf`, `surf school`, `hotel`, `villa`, `hostel`, `guest house`, `apartment`), 11:10:36–11:20:40Z, 4 s pause between queries | 28 queries, 14–77 results each; union with the cache = **758 unique places** | **121 listings** | 15 new inside listings vs the cache, of which 3 surf-related (Yathi's Surf Rest, Shanu Surf Lanka, room-level duplicates) |
| Google Maps place pages, headless (name search at z17 → click best match when a results list came back) | one per surf-related listing, 49 pages, 11:11:33–11:28:42Z, 3 s pause | 49 | – | phone (`data-item-id="phone:tel:…"`), address, plus code, website field, category, rating/reviews, 'Claim this business', 'Temporarily closed' |
| OSM Overpass (overpass-api.de), **run-01 cache** | all `name`/`shop`/`tourism`/`amenity`/`leisure`/`sport` in the 500 m bbox, fetched 10:50:05Z | 64 | 11 | nothing surf-related: 2 named hotels (Timeless Villa, Teal Ahangama, Cafe Ceylon), a bar (TRAX), unnamed guest houses and pools. OSM business coverage here is negligible |
| Existing-website test, headless Chromium, 390×844 mobile viewport (Pixel 7 UA) | every URL in a Google website field or found by search: 15 URLs, 11:22–11:31Z | 15 | – | status, final URL, viewport meta, document width vs viewport, text length, booking-type links (wa.me / tel: / mailto / engines), social links, generator |
| Booking.com property pages, headless | Layday Surf, Yathi's Surf Rest, Nirvana Surf Retreat, 11:37–11:40Z | 2 of 3 (Nirvana returned no content) | – | pins (both within 2 m of Google), JSON-LD address/rating, host/guest surf text |
| Instagram / Facebook og tags, headless, no login | 16 profile URLs, 11:33:41–11:35:38Z, 3 s pause | 16 (2 Instagram profiles "isn't available") | – | follower/post counts and bio line; used to distinguish score 0 from 1 |
| Web search (WebSearch) | 20 queries: `"<name>" Ahangama` (+ instagram / website variants) for the surf-related businesses without a Google website field | – | – | found sites/socials for Nirvana, Kasun's, Sayon, Surf Revolution, KA Surf Hostel, Wake N Flow, Mellow, Licuala, Tharanga (Facebook), Artur & Barbara; nothing for 12 small schools/villas beyond OTA and scraped directories |
| curl (mobile UA), status only | 8 known domains, 11:22Z | 8 | – | pre-check before the headless pass |

Sources that failed: Booking.com for Nirvana Surf Retreat (headless returned status null / empty on the one attempt; not retried — Instagram + Google evidence sufficed); TripAdvisor (403 to everything, run 01; URLs recorded from search results only, nothing read); Nominatim (no match for any of these businesses); Overpass coastline `out geom` (timed out in run 01, OSM API way fetch used instead); Instagram search itself (login wall — handles only via web search, then og tags); `https://www.instagram.com/solas_surf` and `/ashen_surfschoolkabalana` (both "Profile isn't available" although linked from the businesses' own sites).

## 3. Everything found inside the 300 m polygon

121 Google listings inside the polygon (OSM added nothing surf-related). They resolve to **35 surf-related businesses** (44 listings: 35 + 9 duplicates merged) and **77 excluded listings** (§5).

### 3a. Candidates (all 35 are in `candidates.json`; score ≤ 2 = shortlist)

Sorted by score, then distance to the anchor. "shore m" is the distance to the OSM coastline.

| # | slug | name | type | anchor m | shore m | score | reason | site | conf |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `surf-inn-kabalana-beach-villa` | Surf Inn Kabalana Beach Villa | beach_lodging | 191 | 65 | **0** | Only an unclaimed Google listing (4.5, 2 reviews, no phone, no website, 'Claim this business'); web search finds no site, social or OTA page under this name. | — | 0.7 |
| 2 | `vishals-turning-point-surf` | Vishal's turning point & Juice bar | surf_school | 227 | 16 | **0** | Only a Google listing (4.9, 14 reviews, no phone, no website, 'Add place's phone number'); no site, social or directory page found. | — | 0.7 |
| 3 | `bappa-surf-school` | Bappa Surf School | surf_school | 228 | 11 | **0** | Only a Google listing (4.7, 24 reviews, phone, no website); web search finds no site or social page. | — | 0.95 |
| 4 | `sam-surf-and-tours` | Sam Surf and Tours | surf_school | 236 | 5 | **0** | Only a Google listing (no reviews, phone, no website); web search finds nothing else. | — | 0.9 |
| 5 | `shanu-surf-lanka` | Shanu Surf Lanka | surf_school | 236 | 14 | **0** | Only an unclaimed Google listing (5.0, no review count shown, no phone, no website, 'Claim this business'); web search finds nothing else. | — | 0.9 |
| 6 | `hool-kabalana` | hool kabalana | surf_school | 254 | 15 | **0** | Only a Google listing (5.0, 2 reviews, phone, no website); web search finds nothing else. | — | 0.9 |
| 7 | `laza-surf-point` | Laza Surf Point | surf_school | 257 | 6 | **0** | Only an unclaimed Google listing (4.7, 7 reviews, phone, no website, 'Claim this business'); web search finds only a scraped directory page (srilanka-places.com). | — | 0.9 |
| 8 | `lollipop-surf-school` | Lollipop Surf School | surf_school | 276 | 19 | **0** | Only a Google listing (5.0, 1 review, phone, no website); web search finds nothing else. | — | 0.9 |
| 9 | `dad-and-sun-surf-school` | DAD & SUN Surf School | surf_school | 295 | 53 | **0** | Only an unclaimed Google listing (3.9, 7 reviews, phone, no website, 'Claim this business'); web search finds nothing else. | — | 0.9 |
| 10 | `hr-surfing-place` | HR Surfing Place | surf_school | 297 | 50 | **0** | Only an unclaimed Google listing (5.0, 4 reviews, phone, no website, 'Claim this business'); web search finds nothing else. | — | 0.9 |
| 11 | `the-lavish-haven` | The Lavish Haven Hotel And Resort | beach_lodging | 5 | 243 | **1** | No own website or social page found; the only presence is the Google Maps listing (5.0, 21 reviews, phone, no website field) and OTA pages (Booking.com 9.3/34 reviews, Agoda, TripAdvisor), so booking happens only through third parties. | — | 0.4 |
| 12 | `villa-vera-ahangama` | Villa Vera | beach_lodging | 87 | 154 | **1** | No own website or social page found; presence is a Booking.com listing (9.2) and a Google Maps listing ('Vera Villa', 5.0, 16 reviews, phone) plus a second Google entry 'Villa Vera - Superior Villa' that is the same property's room listing. | — | 0.6 |
| 13 | `briza-surf-kabalana` | Briza Surf Kabalana | surf_school | 99 | 148 | **1** | Instagram only (@brizasurf_kabalana: 259 followers, 129 posts) plus a Google Maps listing with a phone number and 1 review; no website anywhere. | — | 0.95 |
| 14 | `nirvana-surf-retreat` | Nirvana Surf Retreat | surf_camp | 118 | 130 | **1** | No website; presence is an Instagram account (95 followers, 27 posts), a Booking.com 'surf package' listing and a Google listing (5.0, 3 reviews, phone, 'Surf school' / lodging). | — | 0.85 |
| 15 | `yathis-surf-rest` | Yathi's Surf Rest | beach_lodging | 144 | 230 | **1** | No website or social page found; presence is a Booking.com listing (9.5, 10 reviews) and a Google listing (5.0, 6 reviews, phone) with OTA price links. | — | 0.6 |
| 16 | `boardwalk-surf-villa` | Boardwalk Surf Villa | beach_lodging | 170 | 255 | **1** | No website or social page found; presence is Booking.com/Agoda listings and a Google listing (4.6, 9 reviews, phone) that says 'Contact this property for rates'. | — | 0.6 |
| 17 | `surf-front` | Surf Front | beach_lodging | 170 | 93 | **1** | No website or social page found; presence is a Booking.com listing (on Booking since Dec 2022 per web search) and a Google listing (5.0, 17 reviews, phone, EUR 22 OTA price links). | — | 0.6 |
| 18 | `surf-revolution-kabalana` | Surf Revolution Kabalana | surf_school | 224 | 15 | **1** | Instagram only (@surf_revolution_kabalana: 121 followers, 50 posts) plus a Google listing (5.0, 19 reviews, phone); no website anywhere. | — | 0.95 |
| 19 | `layday-surf-ahangama` | Layday Surf Ahangama | beach_lodging | 226 | 215 | **1** | No website or social page found (web search returns only OTA pages); presence is Booking.com (10.0, 6 reviews), Hostelworld and Agoda listings and a Google listing (5.0, 15 reviews, phone). | — | 0.6 |
| 20 | `kabalana-surf-point-kasuns-place` | Kabalana Surf Point - Kasun's Place | surf_school | 228 | 13 | **1** | Facebook only (634 followers; description carries a WhatsApp number) plus a Google listing (4.3, 85 reviews, phone); no website. | — | 0.9 |
| 21 | `summer-of-surf-accommodation` | Summer of Surf Accommodation | beach_lodging | 289 | 119 | **1** | The website on the Google listing (summerofsurf.com) is an unrelated Californian kids' surf camp (US phone 818-653-7241, Costa Rica trips), so this hotel has no site of its own; presence is the Google listing (4.8, 5 reviews, phone) and OTA price links. | — | 0.6 |
| 22 | `ka-surf-hostel-and-restaurant` | KA Surf Hostel and Restaurant | beach_lodging | 298 | 534 | **1** | Instagram (@kasurfhostel: 1,495 followers, 22 posts) plus Booking.com/Hostelworld listings and a Google listing (4.8, 42 reviews, phone); no website. | — | 0.8 |
| 23 | `sion-surf-shop-and-cafe` | Sion Surf Shop and Cafe | surf_shop | 75 | 210 | **2** | The website Google lists (sionsurfcamp.com) 301-redirects via juliediamondfitness.com to an unrelated gambling page (idcwin88lagi.com), so the site is effectively dead; a Facebook page (4,242 followers) and a Google listing (4.4, 79 reviews, phone) remain, and Google marks the shop 'Temporarily closed'. | http://www.sionsurfcamp.com/ | 0.9 |
| 24 | `good-story-surf-school-ahangama` | Good Story Surf School - Ahangama | surf_camp | 206 | 33 | **2** | The website on the Google listing (goodstorysurf.com/surf-school) returns 404 after redirecting to goodstoryvillage.com, whose home page lists pool villas only (no surf school, no Ahangama page, email link only), so the surf school effectively has no working site; Instagram @goodstorysurf (6,811 followers) and a Google listing (4.6, 81 reviews, phone) remain. | https://goodstorysurf.com/surf-school | 0.9 |
| 25 | `artur-barbaras-surfing-villa` | Artur & Barbara's Surfing Villa | beach_lodging | 256 | 54 | **3** | surfing-villa.com loads with a mobile viewport but is a German-only one-pager (about 840 characters, page title 'ps') whose only contact paths are a mailto link and an inquiry page; no WhatsApp, tel: link or booking engine. | http://www.surfing-villa.com/ | 0.85 |
| 26 | `mellow-hostel` | Mellow Hostel | beach_lodging | 152 | 92 | **4** | mellowhostel.com is mobile-friendly and links to a Cloudbeds booking engine and Booking.com, but the home page is thin (about 1,100 characters of generic copy, no prices, no phone/WhatsApp link) and the only year in it is 2024. | http://www.mellowhostel.com/ | 0.55 |
| 27 | `tharanga-surfing-villa` | Tharanga Surfing Villa | beach_lodging | 215 | 78 | **4** | The listed site is a Hotelonia white-label page: mobile-friendly with a 'Book now' engine, but only about 350 characters of text, no phone, no WhatsApp and no socials; a Facebook page (613 followers) and a Google listing (3.4, 38 reviews, phone) exist. | https://tharangasurfingvilla.hotelonia.com/ | 0.8 |
| 28 | `sun-and-surf-rest` | Sun and Surf Rest | beach_lodging | 219 | 133 | **4** | The listed site is a Hotelonia white-label page (sunandsurfrest.hotelonia.com): mobile-friendly with a 'Book now' engine, but only about 380 characters of text, no phone, no WhatsApp and no socials. | https://sunandsurfrest.hotelonia.com/ | 0.6 |
| 29 | `ashen-surf-school` | Ashen Surf School | surf_school | 253 | 16 | **4** | ashensurfschool.com is mobile-friendly with wa.me booking links and prices, but it ships template leftovers (a paragraph about 'the real estate spectrum', Facebook/Instagram links to a Bahrain real-estate agency) and its own Instagram link goes to an unavailable profile. | https://ashensurfschool.com/ | 0.95 |
| 30 | `kabalana-home-waves-surf-school` | Kabalana Home Waves Surf School | surf_school | 265 | 18 | **4** | homewaveskabalana.com is mobile-friendly with wa.me booking links, but it is an unfinished shell: about 570 characters of text, 'See All 0 Photos', no prices, and an Instagram link that points at Ashen Surf School's account (same web designer). | https://homewaveskabalana.com/ | 0.95 |
| 31 | `wake-n-flow-ahangama` | Wake N Flow, Ahangama - Kabalana Beach | surf_camp | 193 | 390 | **5** | wakenflow.com is a current, mobile-friendly multi-location brand site with live availability per location (letsbook.me engine for the Ahangama-Kabalana house), a WhatsApp line and surf/yoga content. | https://www.wakenflow.com/ | 0.8 |
| 32 | `licuala-lanka-surf-loft` | Licuala Lanka Surf Loft | beach_lodging | 209 | 85 | **5** | licuala-lanka.com/stays/surf-loft is a current Webflow page, mobile-friendly, with a 'Book now' path into the property's own booking engine (booking.licuala-lanka.com), a tel: link and an email. | https://licuala-lanka.com/stays/surf-loft | 0.6 |
| 33 | `sayon-surf-school` | Sayon Surf School Ahangama | surf_school | 228 | 15 | **5** | sayonsurfahangama.com is mobile-friendly (about 6,900 characters of lesson content) with a wa.me WhatsApp link, a #book section, phone, Instagram and Facebook links. | https://sayonsurfahangama.com/ | 0.95 |
| 34 | `soul-and-surf-kit` | Soul & Surf - Kit. | surf_shop | 232 | 105 | **5** | The listed URL redirects to shop.soulandsurf.com, the Soul & Surf brand's mobile-friendly Shopify store ('Our Little Online Shop – Soul & Surf / Kit'), part of a full brand site with retreat booking. | http://www.soulandsurf.com/kit | 0.9 |
| 35 | `solas-surf` | Solas Surf | surf_camp | 252 | 55 | **5** | solassurf.com is a current (winter 2026/27), mobile-friendly WordPress site with a package/date booking form, tel: and mailto links and pricing pages; its Instagram link (@solas_surf) goes to an unavailable profile. | https://www.solassurf.com/ | 0.95 |

Counts: 121 listings inside → 35 surf-related businesses after dedupe (15 surf_school, 14 beach_lodging, 4 surf_camp, 2 surf_shop, 0 board_rental, 0 shaper) → scores: **0 × 10, 1 × 12, 2 × 2, 3 × 1, 4 × 5, 5 × 5**. **Shortlist (score ≤ 2): 24.** `max_sites` is 3; not trimmed (base.md constraint 7).

Run-01 candidates reused unchanged (evidence 10:49–10:59Z, younger than a day): `the-lavish-haven`, `briza-surf-kabalana`, `sion-surf-shop-and-cafe`, `villa-vera-ahangama`; only `distance_to_shore_m` was recomputed with the segment method (243/148/210/154 m) and a fresh Briza place page (11:12:24Z) was appended.

### 3b. Duplicates merged (base.md constraint 6)

| Kept | Merged listing(s) | Rule |
|---|---|---|
| `kabalana-surf-point-kasuns-place` | Plam Beach Restaurant And Surf School (Restaurant, 1.6/15) | **same phone** +94779065637, 21 m apart |
| `sun-and-surf-rest` (Google "Sun and Surf" hostel, phone + site) | Sun and Surf Rest (house), Sun and Surf Rest - Double Room…, Sun Surf Villa - Three-Bedroom Apartment | same name family within 31 m; the site is sunandsurfrest.hotelonia.com. "Sun Surf Villa" is a bluepillow room listing with no contact of its own — human to confirm |
| `licuala-lanka-surf-loft` | Surf Loft (Apartment, website booking.licuala-lanka.com) | same unit, 22 m, same operator domain |
| `boardwalk-surf-villa` | Boardwalk Surf Villa, Boardwalk Surf Villa 2 - One-Bedroom Villa | same name, 3 m / 5 m |
| `ka-surf-hostel-and-restaurant` | KA Surf Restaurant - Ahangama (+94764812045) | same address 207/A, 5 m; second phone kept in evidence |
| `villa-vera-ahangama` (run 01) | Villa Vera - Superior Villa | same name, 12 m |

Not merged although within 30 m: the Kabalana Rd beach strip has surf schools 3–36 m apart with distinct names and phones (DAD & SUN vs HR Surfing Place share plus code X9G2+RVC, 3 m; Kasun's vs Sayon 17 m; Sam Surf vs Vishal's 12 m). A literal "same coordinates within 30 m → one business" rule would have collapsed independent schools, so proximity was applied only together with a name or phone match. Villa Vera / Nina Villa (shared phone, different names, 35 m) kept separate as in run 01.

## 4. Spot check (3 entries against a second map source)

- `layday-surf-ahangama`: Google pin 5.9784609,80.3526536 vs Booking.com `data-atlas-latlng` 5.9784743,80.352641 — 2 m. Consistent.
- `yathis-surf-rest`: Google pin 5.9788637,80.3520265 vs Booking.com 5.9788637,80.3520265 — identical.
- `solas-surf`: Google pin 5.9772903,80.3516733 vs the Google Maps link on solassurf.com (`@5.9773022,80.351672`) — 2 m. Consistent.
- Also: the anchor (Booking vs Google 5 m, run 01). Caveat for all beach schools: Google pins sit on Kabalana Rd 5–20 m from the coastline; the schools work from the sand, so pins are approximate.

## 5. Excluded listings inside the polygon (77)

Three classes: restaurants/cafes (24, no run.yaml type), non-surf shops and services (5), and lodging with no surf branding or surf marketing on its Google page (43 + 3 wave-villa listings; base.md constraint 5 — only the Google listing was checked for these, not their OTA pages), plus the beach itself and one ambiguous "beach entertainment shop".

| dist | Name (Google Maps) | Google text | Reason |
|---|---|---|---|
| 20 m | Jasmine place | 4.3(12) Restaurant · X9H2+GCQ | restaurant / cafe: no run.yaml type |
| 21 m | Sea breeze bay | No reviews Villa · 221/2 Welhengoda Road Closed · Opens 6 am Sun · +9 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 38 m | Bandi House | 5.0(5) Villa · 147 welhengoda +94 77 077 1150  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 40 m | Babi's place | 4.2(27) Sri Lankan restaurant Open · Closes 10:30 pm Dine-in · Takea | restaurant / cafe: no run.yaml type |
| 58 m | Falafel B | 3.7(3) Falafel · 221/1 Welhengoda Road Open · Closes 12 am Takeaway | restaurant / cafe: no run.yaml type |
| 70 m | Manju's place hotel & restaurant | 4.8 Restaurant Open now | restaurant / cafe: no run.yaml type |
| 75 m | East Falafel & More | 4.7 Mediterranean restaurant · X9H2+XF Open · Closes 10 pm | restaurant / cafe: no run.yaml type |
| 78 m | Amesh Villa | 5.0(3) Villa · X9H2+XF Open 24 hours  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 101 m | Puffer Fish Villa | 5.0(4) Villa +34 636 32 38 30  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 107 m | SMA Rent scooter & taxi service | 5.0(68) Transportation service · Welhengoda Road Open 24 hours | scooter/taxi rental, no run.yaml type |
| 113 m | Nina Villa, Ahangama, Sri Lanka | 4.4(36) Villa Closes soon · 5 pm · Opens 9 am Mon · +94 74 104 0000 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 131 m | Puffer Fish Villa - Kabalana Beach | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 131 m | Puffer Fish Villa - Kabalana Beach - One-Bedroom Villa | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 151 m | Cottage by the Lake (5 mins from the beach) | Villa Sleeps 6 • 3 bedrooms • 3 bathrooms €400  Free Wi-Fi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 153 m | Mama's Thai & Ocean Grill | 4.8 Thai restaurant · AH 43 Opens soon · 4:30 pm | restaurant / cafe: no run.yaml type |
| 162 m | Ranu Restaurant (Local Family) | 5.0 Asian restaurant · X9H2+56R, Kabalana Rd | restaurant / cafe: no run.yaml type |
| 166 m | Chathumi villa | 5.0(4) Grocery store · X9H2+XF  Directions | non-surf shop: no run.yaml type |
| 168 m | Nami Coffee | 5.0 Coffee shop · X9H2+5F6 Open · Closes 6 pm | restaurant / cafe: no run.yaml type |
| 168 m | PappaRich Ahangama | 5.0 Asian restaurant · X9H2+5F6 Open · Closes 10 pm  Order online | restaurant / cafe: no run.yaml type |
| 169 m | Pizza Boy Ahangama | 5.0 Restaurant · X9H2+5F6 Maya Food Court Open · Closes 10 pm  Orde | restaurant / cafe: no run.yaml type |
| 170 m | Mellow Restaurant & Bar | 4.8(626) · Rs 2,000–3,000 Restaurant · jayamedura Open · Closes 5:30 | restaurant / cafe: no run.yaml type |
| 170 m | Maya Food Court | 4.9 Food court · X9H2+5F6 Open · Closes 10 pm | restaurant / cafe: no run.yaml type |
| 172 m | The blue sky - Double Room With Garden View | 4.4(8) House Sleeps 2 • 4 bedrooms • 1 bed €28  Free Wi-Fi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 177 m | Sisters Kabalana | 4.9(291) Cafe · Kabalana Beach, Matara - Galle Road, Welhengoda Clos | restaurant / cafe: no run.yaml type |
| 181 m | The Gully - Kitchen plus Cocktails | 4.3(32) Eclectic · jayamedura, matara road,welhengoda Open · Closes | restaurant / cafe: no run.yaml type |
| 181 m | Coastal Villa Ahangama | No reviews Villa Open 24 hours · +94 77 969 3445  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 184 m | Veda Cafe | 4.9 Restaurant · Galle road Closes soon · 5 pm · Opens 8:30 am Sun | restaurant / cafe: no run.yaml type |
| 185 m | Teal Ahangama - Beach Front Villa - Villa | Lodging  Directions  Pool  Free parking  Beach access  Air-condi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 191 m | The Cinnamon Trail | 4.5 Cafe · Welhengoda, Gane Arambawatta Open · Closes 10 pm | restaurant / cafe: no run.yaml type |
| 191 m | Timeless Villa | 3.9(192) 3-star hotel +94 912 282 262  Website  Directions  Air-c | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 192 m | Panta Rei Resort | 4.8(204) Hotel  Pool  Free parking  Free breakfast  Free Wi-Fi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 193 m | gihan home | 5.0 Hostel · X9J2+3X7, Sri Wijaya Mawatha | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 196 m | Teal Ahangama | 4.7(32) Villa Open 24 hours · +94 70 620 0400  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 202 m | Kabalana Garden Home - Two-Bedroom Apartment | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 204 m | Chao Beach Villa - Double Room with Balcony | 4.9(16) House Sleeps 2 • 1 bedroom • 1 bed €22  Free Wi-Fi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 205 m | Mezze Ahangama | 4.9 Mediterranean restaurant · Welhengoda Road Open · Closes 10 pm | restaurant / cafe: no run.yaml type |
| 206 m | Chao Beach Villa Kabalana | 5.0(11) Homestay +94 76 924 5538  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 209 m | Mula Vila - Two-Bedroom Villa | Lodging  Directions  Pool  Air-conditioned  Kitchen  Pet-friendl | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 213 m | Solana Villa | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 216 m | Naiya Villa - Three-Bedroom Villa | 5.0(5) Villa Sleeps 7 • 3 bedrooms • 4 beds €260 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 216 m | The Wave Villa Kabalana - Two-Bedroom Villa | Lodging  Website  Directions  Pool  Free parking  Air-conditione | villa; 'wave' in the name but no surf marketing on the Google page (1 review, no website); shares street no. 179 with Surf Inn Kabalana — flagged for the human |
| 216 m | The wave villa kabalana - Two-Bedroom Villa | Lodging  Website  Directions  Free parking  Air-conditioned  Kit | villa; 'wave' in the name but no surf marketing on the Google page (1 review, no website); shares street no. 179 with Surf Inn Kabalana — flagged for the human |
| 216 m | Solana Villa Ahangama | Lodging  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 220 m | Villa WM | No reviews Villa · Welhengoda  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 221 m | Beach House by Unrushed | 5.0(12) Villa Open 24 hours · +94 74 269 4693  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 225 m | Sunil Roti Shop - A Sea of Sweets | 4.9(44) Bakery · X8HX+4R9 Open · Closes 6 pm | restaurant / cafe: no run.yaml type |
| 227 m | The Blue Sky | 4.8 Homestay €22 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 229 m | Sakura villa | No reviews Villa · X9J2+H6M Sampath uyana, welhengoda  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 231 m | Welhengoda Beach | 5.0(5) Beach entertainment shop · X8HX+2WH +94 77 831 0570 | 'Beach entertainment shop' named after the beach; the only review praises the beach itself; no surf service, name or social evidence — not treated as a business of a run.yaml type |
| 231 m | Terrene Villa, Ahangama | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 235 m | 7th Sky Idyll | 3.7(103) 3-star hotel €56 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 242 m | Interlanka Coast Living | 5.0(17) Hotel +94 71 266 0884  Website  Directions  Pool  Free p | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 246 m | The wave villa kabalana | 5.0(1) Villa ·  · Welhengoda, 179 Galle Rd +94 77 665 9084  Direct | villa; 'wave' in the name but no surf marketing on the Google page (1 review, no website); shares street no. 179 with Surf Inn Kabalana — flagged for the human |
| 255 m | Kabalana Palm Paradise Restaurant | 3.5(78) Sri Lankan · X8HX+4MJ, Matara Rd Open · Closes 10 pm Dine-in | restaurant / cafe: no run.yaml type |
| 262 m | Coast 67 Boutique Hotel | 4.5(133) Hotel  Pool  Free parking  Free breakfast  Free Wi-Fi | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 264 m | Palm Paradise Kabalana | 3.2(126) Hotel | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 264 m | Clara tailoring & Shop | 5.0(37) Clothing store · 178 Welhengoda Road Open · Closes 7 pm · +9 | non-surf shop: no run.yaml type |
| 266 m | Maison Ahangama | No reviews Villa · Back to Life, Welhengoda Open 24 hours · +94 77 17 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 270 m | Celuna Villa - Ahangama - Double Room | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 273 m | 4Suns villas | 4.9(34) Villa Open 24 hours · +94 74 355 8453  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 274 m | Pigeon House Kabalana | 5.0(1) Hotel | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 275 m | Lum Shop | 5.0(4) Clothing store Open · Closes 9 pm | non-surf shop: no run.yaml type |
| 276 m | King's Villa - Two-Bedroom Villa | Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 277 m | Bael House | 5.0(11) Bed & breakfast €23  Air-conditioned | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 279 m | The serenity cove | 4.9(17) Villa · No'8, back to life home, kabalana, welhengoda Open 2 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 280 m | Kabalana beach | 4.7(829) Tourist attraction ·  · X9G2+QHQ, Welhengoda Open now "Eas | the beach itself (tourist attraction), not a business |
| 280 m | Lum Restaurant and Bar | 4.9 Modern European restaurant · X9J3+929 Open · Closes 9:30 pm  Or | restaurant / cafe: no run.yaml type |
| 286 m | Villa "A7" | 5.0(14) Hotel +94 72 960 3135  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 286 m | Eden Villa - Ahangama - Standard Double Room | Lodging  Website  Directions  Free parking  Free Wi-Fi  Air-cond | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 286 m | Eden Villa - Ahangama - Budget Double Room | 1.0(1) Lodging  Website  Directions | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 287 m | Café Ceylon Ahangama | 4.3 Cafe ·  Open · Closes 10 pm  Pool  Free parking  Free breakf | restaurant / cafe: no run.yaml type |
| 288 m | KAIRO Cafe & Restaurant | No reviews Coffee shop · X9G3+X2F, Welhengoda Road | restaurant / cafe: no run.yaml type |
| 289 m | Lum Residence | 4.9(136) 3-star hotel €63  Pool  Free parking  Free breakfast  F | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |
| 289 m | Jungle Villa cafe & rooms | 5.0(39) 1-star hotel +94 76 447 5021  Website  Directions  Free b | cafe + rooms with no surf branding or surf marketing seen: not beach_lodging per base.md constraint 5 |
| 291 m | Gusta Specialty Supermarket | 4.6(30) Gourmet grocery store · Matara Road, Kabalana Rd Open · Clos | non-surf shop: no run.yaml type |
| 292 m | DONNA - Ahangama | 4.7 Pizza restaurant · Cafe Ceylon - Double Room with Garden View Op | restaurant / cafe: no run.yaml type |
| 300 m | Lovely villa near the beach | 5.0(1) Villa · Sri Pemarathana Mawatha, Welhengoda Closed · Opens 12 | lodging with no surf branding or surf marketing seen (Google listing only checked): not beach_lodging per base.md constraint 5 |


## 6. Judgement calls the human should look at

1. **Score 0 vs 1.** The scale has no rung for "Google listing only" or "OTA listings only". Used here: **0** = nothing but a Google Business listing (10 schools/villas, most unclaimed — `google_listing_only`); **1** = at least one page the business runs or is sold on beyond Google (Instagram/Facebook, or an OTA page — `ota_listings_only`, as in run 01). Both are ≤ 2 so the shortlist is unaffected, but the ordering inside it depends on this.
2. **Google-listing-only lodgings were excluded** under constraint 5 when their listing shows no surf branding or surf marketing (43 villas/hotels/homestays, e.g. Amesh Villa, Puffer Fish Villa, Bandi House, Sea breeze bay, Timeless Villa, Panta Rei, Teal, Coast 67, Lum Residence). Only the Google page was read for them; a few may market to surfers on Booking.com. If "everything inside goes in" is meant literally, they would add ~45 `beach_lodging` entries at confidence ≤ 0.2.
3. **Included lodgings** are those with "surf" in the name or explicit surf marketing: Mellow Hostel (confidence 0.55 — "post-surf" copy, surfcamp-online listing, no surf service) and Licuala Surf Loft (0.6 — one surf-branded unit of a jungle-bungalow property) are the softest calls. **The wave villa kabalana** (three listings, 1 review, no surf text) was excluded but shares street number 179 with Surf Inn Kabalana Beach Villa (included, score 0).
4. **White-label booking sites** (Hotelonia pages for Tharanga Surfing Villa and Sun and Surf Rest) scored 4 by the letter of the scale (mobile + booking engine) although they are ~350-character auto-generated pages with no phone or WhatsApp. If the human wants these as targets, the tag `whitelabel_booking_site` isolates them.
5. **Ashen Surf School (4) and Kabalana Home Waves (4)** have sites from the same designer (Maroon Frog); Ashen's carries real-estate template text and links to a Bahrain estate agency, Home Waves' is an unfinished shell ("See All 0 Photos") linking to Ashen's Instagram. Real defects, but each has a working wa.me path, so ≤ 2 would be wrong by the scale. Strong pitch material if the threshold is ever raised to 3–4.
6. **Good Story (2)**: Google's website link 404s and the domain now serves a generic villa-rental listing site; the school (6.8k Instagram followers, 81 Google reviews) is the most established name on the shortlist. **Summer of Surf Accommodation (1)**: the Google website field points to a Californian kids' surf camp — a wrong link, not their site.
7. **Wake N Flow (5), Soul & Surf Kit (5)** are outlets of multi-location brands; **Solas Surf (5)** is a retreat operator. Not small-owner targets even if the threshold were raised.
8. **Vishal's turning point & Juice bar** is typed `surf_school` (0.7) on review evidence only ("Vishal surf school is the best in kabalana beach"); Google calls it a beach entertainment shop. **Welhengoda Beach** (beach entertainment shop, phone, 5 reviews about the beach) was excluded as not evidently a business of a run.yaml type.
9. **Kasun's Place WhatsApp** (+94710101753) comes from its Facebook og:description, not Google; the Google phone is +94779065637. Both copied verbatim.
10. **Pins for the beach schools** are on Kabalana Rd; HR Surfing Place and DAD & SUN share a plus code. Distances to the anchor are within ±10 m of each other for the whole strip (224–297 m), so the polygon edge decides nothing here — the closest outside surf business is D & S Restaurant and Surf Camp at 312 m (run 01 §6).

## 7. Prompt / schema / run.yaml issues met in practice

1. `agents/scout/tools.md` and `taxonomy.md` are still header-only; used run.yaml `types` and the tooling recorded in run 01 §7 (Booking.com pins via headless Chromium; Google Maps needs SOCS/CONSENT cookies; place pages need a name search at z17 plus a click-through when a results list comes back; cached search hrefs are truncated and do not resolve).
2. Presence scale: no rung for Google-only / OTA-only (item 6.1) and no guidance for white-label booking pages (6.4) or for "site works but is broken/unfinished" (6.5). Suggest tags be made canonical: `google_listing_only`, `ota_listings_only`, `whitelabel_booking_site`, `dead_site_link`, `template_leftovers`.
3. Schema: added the run-01 extra fields again (`geocoder_source_url`, `distance_to_anchor_m`) plus `also_listed_as` (merged duplicate names), `surf_related_note`, `reused_from_run`, `presence_threshold` at the top level, and OTA keys inside `socials` (`booking`, `agoda`, `hostelworld`). `existing_site.google_website_field` was added for Summer of Surf, whose Google link is not its site.
4. Constraint 6 (dedupe within 30 m) needs "and same name or phone", or it merges neighbouring schools on a beach strip (§3b).
5. Constraint 5 vs 7 (lodging without surf marketing) still needs a rule (6.2); this run followed constraint 5.
6. base.md §Outputs says the geojson holds a coastline segment for town/stretch; for `business` mode the file holds anchor + circle only. The coastline distance uses the OSM way but the way is not written into the geojson (1,222 nodes; could be added if wanted).
7. Google Maps place pages for lodgings render the category differently (no category button, "Check availability" block, OTA price grid); the extractor fell back to text parsing, and for two entries (`Boardwalk`, `Tharanga`) the parsed category is the review count — the category was taken from the search feed instead. Ratings on lodging pages sometimes came without a count.
8. The Google Maps website field is not reliable evidence of a site: three of 15 fields pointed at a 404 (Good Story), an unrelated business (Summer of Surf) or a hijacked domain (Sion). Every URL was fetched, as base.md constraint 3 requires.
9. Budget: ~40 min wall clock, 28 search loads + 49 place loads + 15 site loads + 3 Booking + 16 og loads in headless Chromium, 20 web searches, 8 curl. No screenshots were needed to decide a score.
