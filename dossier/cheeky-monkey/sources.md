# sources — cheeky-monkey (run 2026-10-midigama-01, harvester 0.5.0)

Fetched 2026-10-26 (UTC, 19:00–19:40), headless Chromium (playwright) at 1440×1400 with an en locale; old-site capture at 390 px (iPhone 13 profile) and 1440 px. Google pages loaded with the SOCS consent cookie and `hl=en`, no other cookies. Nothing was logged in to.

## The business's own surfaces (the scout found none of these)

| URL | Yielded | Did not yield |
|---|---|---|
| https://cheekymonkeymidigama.com/ (home, `home-new`, modified 2025-05-14) | Own site (WordPress). Tagline "Your Surf and Yoga Camp in Midigama", owner's description, renovation banner ("rooms ... aren’t bookable right now, our surf store is still open"), lessons incl. SUP, shop brands Creatures of Leisure and Shapers, café and events, email, phone, Instagram handle. Old-site capture: 200, mobile 3.07 MB / 54 requests / LCP 2.6 s, page 470 px wide in a 390 px viewport, 2 PHP notices, 0 tel: and 0 WhatsApp links; screenshots `assets/old-site-mobile.png`, `assets/old-site-desktop.png` | Prices, hours, a working booking action, video |
| https://cheekymonkeymidigama.com/aboutus/ | About text: founded by Baba, run by the Dodangoda family, Baba's Surf Shop alongside; 12 images | Names of staff/instructors |
| https://cheekymonkeymidigama.com/surf-shop-facilities/ | Shop (sale, rental, clothes, accessories), "400 boards for rent", own-brand boards shaped in Bali, repairs, scooter and taxi, events, café, gym and yoga; 19 images | Prices |
| https://cheekymonkeymidigama.com/contact/ | Address "Thanahena waththa, Midigama East, Midigama / Ahangama", phone, email | A form: it prints raw shortcodes `[contact-form-7 id=”117″]` |
| https://cheekymonkeymidigama.com/our-services/ (orphan page, modified 2021-01-05) | Lesson prices (USD 20 per person for 1.5 h; group max 6 USD 100), 7-day program, "ISA certified" claim, rooftop yoga, shop stock, sister shop at Surf Swell Hostel, Wednesday parties, Booking.com "Reservation Enquiry" link | Current prices |
| https://cheekymonkeymidigama.com/surf-camp-packages-sri-lanka/ (orphan, modified 2021-02-12) | 4 weekly packages with contents and 12 prices (USD 250–400 per person per week), 2021 room descriptions, airport transfer USD 65 / 130, lake tour USD 5 | — |
| https://cheekymonkeymidigama.com/booking-surf-camp/ (orphan, modified 2021-10-17) | B&B rates USD 20 / 25 / 27 (unit not stated) | A form: raw `[ninja_form id=”2″]` |
| https://cheekymonkeymidigama.com/about-us/ (older About, modified 2025-05-02) | "close to the main point breaks", "180° sea view" | — |
| https://cheekymonkeymidigama.com/why-cheeky-monkey-surf-camp/, /why-surfing-in-midigama/ | 2020–21 blog copy ("packages expand from USD 50-USD 300"; "Main surf shops like Cheeky Monkey (Baba’s surf shop)") | Facts beyond the above |
| https://cheekymonkeymidigama.com/product/surf-pakage/, /service/surf-lesson/, /service/rent-and-repairer/, /portfolio/youtube-video/ | Evidence of theme leftovers: test product "Surf pakage" (£16, "dfsfgf"), lorem-ipsum pages, demo portfolio ("Client Four Seasons, Value $35,000") | — |
| https://cheekymonkeymidigama.com/testimonial/christina/ (+ /michael/, /patrick/, /james/) | One real-looking testimonial (Christina, mentions Baba); the others are titled Andre, Lorenz and Cam and not quoted | Dates |
| https://cheekymonkeymidigama.com/robots.txt, /wp-sitemap.xml and its post/page/product/service/testimonial/portfolio/process sub-sitemaps | Full page list (17 pages, 20 posts, 6 services, 7 testimonials, 12 portfolio items) | — |
| https://cheekymonkeymidigama.com/wp-json/wp/v2/pages?per_page=100 | Created/modified dates of every page (used to date the prices) | — |
| https://cheekymonkeymidigama.com/wp-json/wp/v2/media (pages 1–4, 378 items: 237 JPEG, 141 PNG, no video) | The public media library. 76 JPEGs downloaded (the 17 shown on the 2025 pages + a curated 59 from 2020 of the shop, rooftop yoga, lessons, owner, parties, views); 75 kept (1 exact duplicate). Skipped: unsplash/freepik/pexels-named stock, the 141 PNG blog graphics, and old Booking.com copies | — |
| https://www.instagram.com/cheekymonkeysrilanka/ (linked from the site) | Logged-out profile: 15.3K followers, 267 posts, bio "Surf shop 7am-6pm \| Lessons \| Board Repair / Rooms / Bar", highlights, 12 latest posts (Jun–Oct 2026) incl. 2 reels | The full grid and captions (login wall after 12 posts) |
| https://www.instagram.com/reel/DeojthqIzGm/ (18 Oct 2026) | vid-008 via `tools/fetch-video.mjs`, no login needed; business-owned; caption on every frame, not picked | — |
| https://www.instagram.com/reel/DeMAX5bIEzz/ (7 Oct 2026) | vid-009, business-owned, **hero rank 1**, cut 3 s + 10 s, poster at 4 s, renditions d1920 (1080×1920, 3.74 MB), m720 (1.86 MB), webm (1.79 MB), no audio | AVIF poster (ffmpeg failed) |
| https://www.instagram.com/sunzapperlk/reel/Dd0it4dg-vK/ | Seen on the grid: a collab reel by another brand (Sun Zapper) — not fetched | — |
| https://www.facebook.com/cheekymonkeysrilanka/ | Logged-out page: 7K followers, "Hotel resort", address, phone, email, website, $$, intro "Midigama shop, rooms & restaurant closed for low season. Catch us now in Arugam Bay – surf shop open daily and surf lessons available!", latest post 9 Oct 2026; 2 images ≥ 1080 px downloaded (shop front, customers with a new board) | Posts, photo grid, reels (login wall; `/reels_tab` not reachable without login, and yt-dlp does not support a page's reels URL) |
| `curl https://www.instagram.com/<handle>/` for 10 guessed handles | Nothing (Instagram serves no meta to curl); the real handle came from a YouTube description | — |

## Platforms

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/place/Cheeky+Monkey/... (scout link, `hl=en`) | Name, 4.5 (467), "3-star hotel", address with postcode 80650, "Located in: Shortcut by Cheeky Monkey", phone, plus code X96W+PP, check-in 14:00 / check-out 11:00, Google's hotel summary, Tripadvisor 4.5/5 · 160 reviews, Booking/Agoda/Bluepillow offers | Review texts (the Reviews tab is behind the sign-in wall in the limited view); website field (empty: "Add website") |
| https://www.google.com/maps/place/Baba%27s+surfshop%2FCheeky+monky+midigama+guesthouse/... | Shop listing: "Clothing store", 3.2 (11), address "Midigama east,Ahangama, 80650", hours shown only for Monday 8 am–7 pm, review topics "board rental" and "rental", three partly visible review snippets | Full review texts (after one load the listing collapses to the sign-in wall); other days' hours |
| https://www.google.com/maps/search/Cheeky+Monkey+Midigama/... and /search/Cheeky+Monkey+Surf+Spot+Midigama/... | Confirmed "Cheeky Monkey Surf Spot - Midigama" is a tourist-attraction pin (5.0, 1 review), not a business; Google's line "Modest hotel with dining & a surf school" | — |
| https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html (page + embedded Apollo state) | Name "Cheeky Monkey Surf Camp", address, 8.3 (45) with sub-scores, 5 room types (beds, size, sleeps, description, floor, facilities), facilities, house rules, check-in/out windows, host texts, 3 Q&A (owner's season answer), **86 property photos** (downloaded at max1920, created 2017–2026-09-15, room tags) | Prices (no dates entered) |
| Booking.com review list (GraphQL behind "Read all reviews" on the same page) | All 45 reviews with author, country, date, score, room, nights, positive/negative text | — |
| https://www.booking.com/reviewlist.en-gb.html?pagename=cheeky-monkey&cc1=lk… | 404 (the old endpoint is gone) | — |
| https://www.casai.com/property/cheeky-monkey-surf-camp/BC-1229648 | A Booking.com mirror (same hotel id 1229648); nothing new | — |
| https://h.priceline.com/hotel/lk/cheeky-monkey.en-gb.html | 200 but an empty JS shell in headless Chromium | Anything |
| https://www.tripadvisor.com/Hotel_Review-g2492996-d7305062-Reviews.html, https://www.tripadvisor.com/Attraction_Review-g16645969-d20996445-Reviews.html | 403 to headless Chromium and to WebFetch (bot wall); not retried | Reviews (rating/count taken from Google instead) |
| https://ra.co/events/1519329, https://de.ra.co/events/1519329 | 403 (bot wall). The search snippet says: a 26 Jan 2022 party, "international Dj's, every Wednesday and sometimes Sunday in our magical garden" (the same words are on the owner's site) | Event page |
| Agoda | Only as an offer inside Google's hotel prices; the listing URL was not found by search | Listing |

## Press and third-party

| URL | Yielded |
|---|---|
| https://www.dailymirror.lk/press-releases/The-Cheeky-Monkey-Midigama-ready-to-catch-the-new-wave-of-surf-tourism/335-206161 | Press release, 2 Feb 2021: owner 'Baba' Pasindu Delgodage, opened late 2009 with 3 rooms, now 10 rooms, gym, restaurant/café, the area's largest surf shop (Quiksilver, Billabong, Rip Curl), surf school, oldest surf guesthouse in town. 3 article images (800×600, licence unknown) not downloaded |

## Video hunt (constraint 6)

| Surface | Result |
|---|---|
| Own site (all pages, page source, media library) | No `<video>`, no YouTube/Vimeo embed (the only embed is the theme demo's `youtube.com/embed/QgnRut8Qloc` on a demo portfolio page — not theirs) |
| YouTube channel of the business | None found. Searches: `ytsearch12:` "cheeky monkey midigama", "cheeky monkey surf camp sri lanka", "baba surf shop midigama", "cheeky monkey midigama surf" |
| YouTube, third-party uploads (all `license: unknown`, fetched with `--channel @cheekymonkeysrilanka --no-renditions`) | vid-001 Qo3SqaCSkpk (Lorenzo Marzocca, 2018 promo film "for my friend Baba", 1080p, drone + surf — the best footage, not usable); vid-002 4AsZuT8igMM (TRAVSOME party film, 2019); vid-003 y5CSy5XOpXI (Bee Vof "BABA'S SURF SHOP", 2016, owner interview); vid-004 gPqUW9w0_e8 (hotel-affiliate slideshow, 2016); vid-005 1AhY41bg7tE (DJ LUCKY, 2022 party); vid-006 wfclTiOnfas (Ekans TV, 2022 party, 640×352); vid-007 ILOAeZGYkS0 (Shika# Vlogs, 2019, Sinhala shop vlog, 14.5 min) |
| YouTube, found and not fetched | B1nn6ZYbPOQ (61-min DJ set "@ Cheeky Monkeys", 2023 — audio set, not site media); iJKV3lsxh54 (Sri Lanka Tourism, macaques in Polonnaruwa — unrelated) |
| Vimeo | Nothing found |
| Instagram reels | 2 business-owned reels fetched (vid-008, vid-009); older reels beyond the 12 visible posts are behind the login wall |
| Facebook reels | Behind the login wall |

Contact sheets for every video: `assets/video/vid-00N-sheet.jpg`. All looked at; `shows` written from the frames.

## Web searches (WebSearch)
"Cheeky Monkey" Midigama surf instagram · "Cheeky Monkey" Midigama surf camp booking.com OR agoda OR airbnb OR tripadvisor · "Baba's surf shop" OR "Baba surf shop" Midigama · cheekymonkeymidigama OR "cheeky monkey midigama" instagram OR facebook · tripadvisor "Cheeky Monkey" Midigama · site:instagram.com cheeky monkey midigama · site:facebook.com "Cheeky Monkey" Midigama · "Cheeky Monkey" Midigama surf lessons price board rental · agoda "Cheeky Monkey" Midigama OR Weligama hotel. None surfaced the own site or socials; they were found through the TRAVSOME YouTube description (Instagram) → Facebook page → website.

## Not attempted / blocked
- Google review texts: sign-in wall in the limited view. Not bypassed.
- Tripadvisor, Resident Advisor: 403 bot walls. Not bypassed.
- Instagram beyond the first 12 posts, Facebook posts/photos/reels: login walls. Never logged in.
- Airbnb: no listing found.

## For the next run
- The scout's 2–3-query search missed a live own site, a 15K Instagram and a 7K Facebook page. Searching YouTube descriptions and the Facebook page name turned them up within minutes.
- Re-check the Midigama status before the pitch: Facebook says closed for low season and the team is in Arugam Bay.
