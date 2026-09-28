# sources — global-surf-adventures (run 2026-09-globalsurf-01, harvester 0.3.0, mode test)

Fetched 2026-09-28 12:17–13:07 UTC. Headless Chromium (Playwright) at 1440×1000 unless noted, `locale en-US` (Booking `en-GB`), logged out everywhere. Cookie dialogs: Google "Reject all", Booking "Decline"; Facebook/Instagram dialogs left unanswered (nothing accepted). No login, no form submitted, no personal data entered.

## globalsurf.com (the business's own site)

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.globalsurf.com/sitemap_index.xml + page-, levels-, global-hotels-, hotels-, locations-, yachts-, popup_trips-, globalsurf-retreats-, recomendations-, homeslides-, jet-popup-, post_tag-sitemap.xml (curl) | Full page inventory (≈50 URLs) | lastmod on most sub-sitemaps is empty |
| https://www.globalsurf.com/ | Agency pitch ("A unique travel agency for ocean lovers"), 5 destinations, WhatsApp +972523593240, email, "Typically replies within a day", footer © 2019, hero CTA → Bookinglayer | Any price, any lodge address |
| https://www.globalsurf.com/global-hotels/sri-lanka/kabalana-surf-lodge/ (also reached via /levels/hotels/kabalan-surf-lodge/ and /global-hotels/locations/sri-lanka/, both redirect here) | Lodge description, "12 well designed rooms … from 4 beds dorms to … private rooms", daily yoga, levels 1–3 + FreeStylers, ~22 photos | Prices, address, check-in times; ROOMS/SERVICES/LOUNGES/POOL tabs are photo galleries only |
| https://www.globalsurf.com/kabalana-lodge-surf-packages/ (dateModified 2024-02-09) | Weekly surf & wellness retreat concept, **ISA-certified surf guides**, 8 service blocks (video, yoga, ice baths, meals with GF/vegan, co-working, tuk tuk transfers), accommodation "4 twin / 4 double-triple / 4 family", level 1–3 descriptions, 3 own-site testimonials, ~50 photos | Prices |
| https://www.globalsurf.com/levels/kabalan-surf-lodge/level-one/ · /level-two/ · /level-three/ · /free-style/ | Per-level "What is level …", "A day at the camp", **What's included** lists, Bookinglayer product links (via /tests/) | Prices; Freestylers page contradicts itself (half board vs B&B only) |
| https://www.globalsurf.com/about/ | Agency mission, "For Surfers, By Surfers" | Founding year, team |
| https://www.globalsurf.com/contact/ | tel +97299733943, WhatsApp, inquiry form (Sri Lanka, Maldives, Morocco, Angola — no Mozambique) | Address |
| https://www.globalsurf.com/terms-conditions/ | Israel-registered company; Global Surf Lanka registered in Sri Lanka; charges in NIS or USD | — |
| https://www.globalsurf.com/global-hotels/maldives/malidves-surf-adventure/ · /yachts/myna/ | Maldives resale range; Myna charter schedule 2024 ($3,450 / $2,800) | Current-year prices |
| https://www.globalsurf.com/global-hotels/marocco/morocco-surf-trips/ · /levels/marocco/the-soul-house-morocco/ · /levels/marocco/the-yogi-surfer/ | Morocco text, season, two partner-hotel packages | Prices |
| https://www.globalsurf.com/global-hotels/angola/african-adventure/ · /levels/angola/combined-camping-trip-angola/ · /challenging-camping-trip/ · /muckamuck-surf-trip-angola/ · /contact-us-longboard-mastermind-workshop-angola/ | "Exclusive representative of 'Angola Waves'", season May–Oct, 3 trip types, Longboard Mastermind 2026 (form only) | Prices |
| https://www.globalsurf.com/global-hotels/mozambique/mozambique/ · /wellness-experiences/contact-us-mozambique/ | Mozambique trips, season (two versions), group ≥ 6 for private trips. Loaded fine this time (scout's probe timed out) | Prices |
| https://www.globalsurf.com/wellness-experiences/ · /our-concepts/ · /globalsurf-retreats/ · /globalsurf-retreats/isa-level-1-2-ocean-safety-certification-course/ · /globalsurf-retreats/yoga-retreat-in-sri-lanka-bipin-ji/ · /popup_trips/surf-yoga-retreats/ | Retreat archive (dates past); **ISA page: "The Lodge is located on the beach in Kabbalah overlooking 2 great spots – The Rock & South point"**, 2024 course prices; Bipin Ji retreat prices; 2023 popup $2,499 | Any current retreat |
| Raw HTML (curl) of the packages, lodge, level-one and free-style pages | WordPress datePublished/dateModified (lodge 2019-02-13 / 2023-05-07; packages 2023-11-07 / 2024-02-09; level-one 2019-02-11 / 2023-12-10; free-style 2019-02-12 / 2023-05-07) | Tab contents (JS-rendered) |
| https://www.globalsurf.com/wp-content/uploads/… (≈120 image files, originals where the size suffix could be stripped) | 114 unique site photos after sha256 + perceptual dedupe | — |

Not visited: /blog (menu item), /work-with-us/, /thanks/ pages, other yacht/resort pages (Maldives resale, not the lodge).

## Bookinglayer engine (own booking engine)

| URL | Yielded | Did not yield |
|---|---|---|
| https://globalsurfadventures.bookinglayer.com/en · https://globalsurfadventures.bookinglayer.io/frontoffice/#/ (redirects to /en) | Engine home: one tile, "Sri Lanka" | Any other destination |
| https://globalsurfadventures.bookinglayer.com/en/category/sri-lanka | 4 products: LEVEL 1 - Fomies, LEVEL 2 - Rollers, LEVEL 3 - Riders, Freestylers - B&B only package | — |
| https://globalsurfadventures.bookinglayer.com/en/product/level-1-fomies · level-2-rollers · level-3-riders · freestylers-bb-only-package | Product pages; by selecting 1 female or 1 couple and a Saturday check-in (2026-10-03, 2027-02-13) the page shows **Base price $1466 per person / 7 nights** for all three levels, accommodation supplement and total. Screenshots in assets/engine-level1-*.png. Stopped at the summary; "Continue" never pressed | Freestylers: no bookable dates → no price. 2026-12-19 sample failed (calendar cell not clickable in headless) |
| api.bookinglayer.io/public/settings, /widgets, /widgets/sri-lanka, /products/<slug>, /products/<id>/availabilities, /accommodations/availabilities, /packages/<id>/items (the calls the engine page itself makes; the POST /items is the engine's own price-quote call fired by the page on date selection, not a booking) | Extended inclusion lists per level, duration variants 7/14/21/28 nights, Saturday check-ins, min age 18, max 6 per booking, USD incl. tax, room names/descriptions, included extras (board rental, dinner, coffee/tea at $0) | Full room list (only rooms still free on the sampled dates) |
| https://globalsurfadventures.bookinglayer.com/tests/en/category/sri-lanka · /tests/en/product/level-1-fomies · /tests/en/product/level-3-riders/ · https://globalsurfadventures.bookinglayer.io/frontoffice/#/category/8337 | All four land on the engine home — the site's booking buttons lose the chosen package | — |

## Third-party

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/search/Global%20Surf%20Lodge%20Ahangama/@5.9810484,80.3420635,17z?hl=en (3 runs) | **Address "Henewatta addara gederawata, Ahangama 80650, Sri Lanka"**, plus code X8JR+CR, phone +94 77 077 6747, website globalsurf.com, check-in 14:00 / check-out 11:00, **4.7 / 198 reviews**, review topics, 5 reviews (1 complete, 4 truncated; "More" does not expand in Google's limited view) | Full review texts, exact review dates |
| https://www.google.com/maps/place/Global+Surf+Lodge/@5.9810484,80.3420635,… (scout's URL) | Pin from URL params only — Google served a limited view with an empty panel | Everything else |
| https://www.booking.com/hotel/lk/kabalana-by-ceilao-villas.en-gb.html (HTTP 202, rendered) | **8.6 / 80 reviews** + 7 category scores, 3 room types, ~50 facilities, house rules (check-in 14:00–20:00, check-out until 11:00, cash only, no pets, no extra beds), languages English + Hebrew, nearby (Kathaluwa West Beach 40 m), 10 guest quotes (6 complete), gallery of **50 photos** (hero 8 + "+42"; photo ids 221851075–868729438, every alt text names Global Surf Lodge Kabalana) → 47 kept after dedupe with site photos | Nightly rates (need dates — live inventory, not content), review dates, owner-written copy ("About this property" is Booking-generated) |
| https://www.surfcamp-online.com/en/surfcamps/viewproperty/global-surf-lodge-kabalana-ahangama-sri-lanka/876 | Owner-written ~2019 listing: spot detail (South Beach 200 m, Kabalana main point < 500 m, beach break), season Oct–Apr, 32 beds, room types, old staff list, 2019 prices (€855 / €255), 8.0 / 4 reviews (2019) | Anything current; the +34 phone is the platform's |
| https://www.facebook.com/GlobalSURFltd/ | 11K followers, "Page · Travel agency", +972 9-973-3943, info@globalsurf.com, **98% recommend (54 reviews)** | Review texts (login wall) |
| https://www.instagram.com/globalsurf_/ | 17.2K followers, 1,814 following, bio | Posts (login wall); photos not taken |
| https://www.tripadvisor.com/Hotel_Review-g674590-d10171834-Reviews-Global_Surf_Lodge_Kabalana-Ahangama_Galle_District_Southern_Province.html | **403** (bot wall) — retry later or skip | Rating, reviews |
| https://www.booksurfcamps.com/global-surf-lodge-kabalana | **403** (Cloudflare challenge) | Package, deposit terms |
| https://cf.bstatic.com/xdata/images/hotel/max1280x900/<id>.jpg (50 files) | Booking photos at 1280 px | — |

Not visited: YouTube (scout: consent wall), Agoda (Google shows an offer; URL not captured), KAYAK / trip.com / lakpura (search results only, per scout), the second Facebook link (login wall per scout), @globalsurf.retreats.

## Old site measurement (assets/old-site-*.png)

`old-site-home-{mobile,desktop}.png`, `old-site-lodge-{mobile,desktop}.png` — full-page, 390 px (DPR 2, Android UA) and 1440 px. One unthrottled headless run each, bytes counted from CDP `loadingFinished` until load + 5 s, no scroll:

| Page | Viewport | Status | Transfer | Requests | LCP |
|---|---|---|---|---|---|
| home | 390 | 200 | 13.44 MB | 133 | 2.2 s |
| home | 1440 | 200 | 9.28 MB | 133 | 1.9 s |
| lodge | 390 | 200 | 19.95 MB | 191 | 2.1 s |
| lodge | 1440 | 200 | 15.37 MB | 195 | 2.5 s |

Third-party hosts on load: 16–21 (googletagmanager, doubleclick ×3, google-analytics, connect.facebook.net, fbcdn, YouTube + googlevideo, Elfsight, Kuula 360° on the lodge page, fonts.gstatic). Autoplay video hero; Messenger bubble overlays content on mobile.

## Images — what was done

- 189 downloads (139 site URLs incl. size variants of the same photo, 50 Booking) → 183 unique by sha256 → **161 kept** after sha256 + 16×16 average-hash dedupe (Hamming ≤ 12; kept the largest). Resized to ≤ 2000 px only where larger; otherwise original bytes.
- Skipped on purpose: page icons/PNG badges, the Bipin Ji portrait (a guest host, not the business), an Angola photo (`0_angolcsavo…`) and a longboard photo of unclear origin on the Kabalana pages, Elfsight/Instagram feed images, the engine's Unsplash stock photo (`eaters-collective-…-unsplash.jpg`).
- License: all 161 `business-owned` (own site, or property-uploaded on Booking under Shahar's 2026-09-19 OTA approval). Photographer credits in filenames (`capt_nir`, `@wat3rman_visuals`) are kept in `license_note` — the site should credit them.
- 11 surf photos are flagged `location_note` — filenames say Hikkaduwa, or the place cannot be identified. Do not caption them as the lodge's wave.
- A few 2025 retreat photos (img-042, img-044, img-045) carry EXIF rotation. Browsers apply it; a raw-pixel pipeline must too.

## Test-mode check (`surf_camp`)

contact ✔ · ≥ 1 lessons/priceList ✔ (3 level packages, engine price) · ≥ 3 photos ✔ (161) · ≥ 1 rooms ✔ (Booking 3, engine 2). **Buildable** as the lodge's site. The agency's other four destinations do not fit one `sites` document (see `gaps[0]`).
