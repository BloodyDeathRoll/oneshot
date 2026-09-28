# sources — global-surf-adventures (run 2026-09-globalsurf-02, harvester 0.4.0, mode test)

Fetched 2026-09-28 16:56–17:50 UTC. Fresh harvest: nothing carried over from the voided run 01 (its sources.md in git history was used only as a map of where to look; every fact here was re-fetched). curl for raw HTML; headless Chromium (Playwright 1.62.1) for rendered pages, 1440×1000 unless noted, locale en-US (Booking en-GB). Logged out everywhere. Cookie dialogs: Google "Reject all", Booking "Decline", Facebook "Decline optional cookies". No login, no cookies passed to yt-dlp, no form submitted, no personal data entered.

## globalsurf.com (the business's own site)

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.globalsurf.com/sitemap_index.xml + its 12 sub-sitemaps (curl, 16:56Z) | 62 page URLs; all 62 fetched raw (16:57:06Z, all 200 or 301) | — |
| https://www.globalsurf.com/ | Hero "Tailor-Made Surf Trips Like Never Before", agency pitch, 5 destinations, footer © 2019, WhatsApp wa.me/972523593240 (16 links site-wide) and api.whatsapp.com/send?phone=+97299733943 (7), Instagram/Facebook/YouTube links, hero YouTube t0EF-4uKNuM; dateModified 2023-05-09 | Any price, lodge address |
| https://www.globalsurf.com/global-hotels/sri-lanka/kabalana-surf-lodge/ | Lodge description (verbatim in dossier), "12 well designed rooms … from 4 beds dorms to … private rooms", Experiences/Surf/Wellness/Nature/Adventure blocks, 2 agency testimonials (Eden Gershon, Lee Komm — about Maldives/Morocco), hero YouTube eE-YzSYizm0; dateModified 2023-05-07 | Prices, address, check-in times; "Choose your level" heading used twice over unrelated paragraphs |
| https://www.globalsurf.com/kabalana-lodge-surf-packages/ | "Weekly Surf & Wellness Retreats", ISA-certified guides, 8 service blocks, concept, accommodation "4 twin Rooms, 4 double/triple rooms, and 4 family rooms", level 1–3 texts, 3 testimonials (Dana Amsalem-Cohen, Nir Ofree, Seagallas); dateModified 2024-02-09 | Prices |
| https://www.globalsurf.com/levels/kabalan-surf-lodge/level-one/ · /level-two/ · /level-three/ · /free-style/ | "What is level …", "A day at the camp", "What's included?" lists, wave/board/theory FAQs, room + hotel amenities (free-style) | Prices; free-style contradicts itself (half board vs B&B only) |
| https://www.globalsurf.com/globalsurf-retreats/isa-level-1-2-ocean-safety-certification-course/ | **"The Lodge is located on the beach in Kabbalah overlooking 2 great spots – The Rock & South point"**, 2024 course prices | A current course |
| https://www.globalsurf.com/terms-conditions/ | Israel-registered company, Global Surf Lanka registered in Sri Lanka, NIS/USD, 40 % deposit / 60 % at 45 days | — |
| https://www.globalsurf.com/contact/ · /about/ | tel +97299733943, enquiry form | Address, reply time |
| Maldives, Morocco, Angola, Mozambique, retreat, yacht pages (all 62 fetched) | Destination summaries and seasons → `other_destinations[]`; video embeds for the list below | Prices (none current) |
| https://www.globalsurf.com/wp-json/wp/v2/media (35 pages × 100, 16:58:31Z) | Public WordPress media API: 3,201 items, original filenames and full dimensions — used to find the **largest original of every photo placed on the Kabalana pages**; also 2 small library videos (below) | — |
| https://www.globalsurf.com/wp-content/uploads/… (212 originals, 16:59:40Z) | 211 downloaded (bitmap.png 404) → see Images | — |

## Bookinglayer engine (the business's own booking engine) — read only

| URL | Yielded | Did not yield |
|---|---|---|
| https://globalsurfadventures.bookinglayer.com/en/category/sri-lanka | 4 products: LEVEL 1 - Fomies, LEVEL 2 - Rollers, LEVEL 3 - Riders, Freestylers - B&B only package | Other destinations |
| https://api.bookinglayer.io/public/products/<slug>?… (the engine page's own calls, 17:04Z) | Engine inclusion lists, durations 7/14/21/28 nights, max 6 per booking, USD, location "Sri Lanka Lodge" | price_from (null) |
| https://globalsurfadventures.bookinglayer.com/en/product/level-{1-fomies,2-rollers,3-riders} with 1 female / 1 couple, check-in Sat 3 Oct 2026 and Sat 13 Feb 2027 (17:05–17:09Z) | **Base price $1466 per person for 7 nights** on every sample, couple $2932; room supplement: Mixed dorm (4 beds) +$0 (Oct), Shared Twin Room +$140.04 single / +$160.05 couple (Feb). Screenshots `assets/engine-*.png`. The page's own `POST /public/packages/<id>/items` price-quote call fires on date selection; stopped at the summary, "Continue" never pressed | 19 Dec 2026 sample failed (not selectable for a couple; female run timed out); Freestylers not sampled |
| Choosable check-ins (API, 1 female, to 2027-09-30) | 2026-10-03, 10-24, 10-31, 12-19, 2027-01-23 … 04-03 (Saturdays) | — |

## Third-party

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/search/Global+Surf+Lodge+Kabalana+Ahangama/@5.9810484,80.3420635,17z?hl=en → resolved to the place URL in `location.map_url` (17:29:43Z, two runs) | Address "Henewatta addara gederawata, Ahangama 80650, Sri Lanka", plus code X8JR+CR, +94 77 077 6747, website globalsurf.com, check-in 14:00 / out 11:00, 4.7 stars, 3-star hotel | **Review count** (limited view; Reviews tab absent) |
| https://www.booking.com/hotel/lk/kabalana-by-ceilao-villas.en-gb.html (HTTP 202, rendered, 17:26:22Z) | 8.6 / 80 reviews + 7 category scores, address, 3 room types, facilities, house rules (check-in 14:00–20:00, out until 11:00, cash only, no pets, no extra beds), nearby distances, 10 guest quotes (some truncated by Booking), **50 property photos** | Review dates, nightly rates (live inventory), languages spoken (not rendered) |
| https://cf.bstatic.com/xdata/images/hotel/max3000/<id>.jpg (50 files, 17:26:57Z) | Booking photos at up to 3000 px (46 of 50 ≥ 1920 px) | — |
| https://www.facebook.com/GlobalSURFltd/ (17:31:01Z) | Page · Travel agency, 11K followers, +972 9-973-3943, info@globalsurf.com, 98% recommend (54 reviews) | Review texts, reels (login) |
| https://www.facebook.com/globalsurfadventures1 | Second footer link — not visited (scout: 400 on curl) | — |
| https://www.instagram.com/globalsurf_kabalana/reel/DWfvELQDOpY/ · https://www.instagram.com/globalsurf_/reel/DdyBBSQOiSx/ (yt-dlp, 17:30Z) | **Behind login** ("redirected to the login page … rate-limit") — no reel collected, no cookies passed | Reels, photos |
| https://www.tripadvisor.com/Hotel_Review-g674590-d10171834-… (17:30:36Z) | **403** bot wall | Rating, reviews |

## Video — every surface

| Surface | Result |
|---|---|
| Own site page source (62 pages) | 15 YouTube embeds (list in `videos[]`), no `<video>` files, no Vimeo |
| WordPress media library | 2 small videos on the Bipin Ji retreat page (IMG_5869.mov 480×360 6 s; 2FEE47A2….mp4 320×568 17 s) — recorded, not downloaded |
| YouTube channel @globalsurf1582 (UCh-GTj4Wu2FbdXpr-xNSGzQ) | `/videos` 214 videos → `assets/video/listings/UCh-GTj4Wu2FbdXpr-xNSGzQ-videos.json`; `/shorts` 9 → `…-shorts.json` (16:59–17:00Z) |
| Downloaded (source + contact sheet) | vid-001 t0EF-4uKNuM · vid-002 EXW-rN_nlvs · vid-003 OsSu_wzYhgo · vid-004 NjHHw3dvghs · vid-006 RHbSfJFg-Fo · vid-007 Cq6u_7x8CE4 · vid-008 RB0bv5MsBcM · vid-009 gE4XV41P4pY · vid-010 6FMqhhFMwG4 |
| Blocked | y-Bv37TRmXY, krC3XZIko44, bqISDBfdUCc: YouTube HTTP 403 mid-download ×6 each, then "Sign in to confirm you're not a bot" (17:24–17:44Z). ERkqRTIbwrg: "This video is not available". eE-YzSYizm0 (lodge hero): uploaded by personal channel "adam mizrachi" (UC3ZrZObAfygNlmU6gHGOZWg) → license unknown; also blocked. Retry later from another time/IP; never with cookies |
| Instagram reels | behind login (above) |
| Facebook reels | behind login (scout; page shows a Reels tab) |
| Vimeo, TikTok | none linked or found |

Note for the tool owner: during the first batch a failed yt-dlp run left its file under the next free `vid-NNN` id, and a later video reused it — two index entries (then vid-005, vid-009) held another video's file. They were deleted and re-fetched cleanly (durations now match YouTube metadata). Also, a re-cut always re-probes YouTube, so while YouTube bot-checks the machine no renditions can be made even though the source is on disk.

## Old site measurement (`assets/old-site-*.png`, 17:24–17:25Z)

Full-page and first-screen (`-fold`) shots at 390 px (DPR 2, Android UA) and 1440 px. One unthrottled headless run each, bytes = CDP `loadingFinished` until load + 5 s, no scroll:

| Page | Viewport | Status | Transfer | Requests | LCP | 3rd-party hosts |
|---|---|---|---|---|---|---|
| home | 390 | 200 | 8.90 MB | 133 | 1.99 s | 19 |
| home | 1440 | 200 | 9.27 MB | 134 | 1.90 s | 18 |
| lodge | 390 | 200 | 14.77 MB | 191 | 2.26 s | 23 |
| lodge | 1440 | 200 | 15.39 MB | 196 | 2.56 s | 22 |

## Images — what was done

- Page images from 14 Kabalana-related pages (home, lodge, packages, 4 level pages, homeslide, ISA, Bipin Ji retreat, 2 popups, about, thank-you) → 212 unique bases → matched to the media library to fetch the **true original** (`original_image`, not WordPress's 2560 `-scaled` copy) → 211 files.
- Plus 50 Booking.com property photos at max3000.
- Dedupe: sha256, then 16×16 average hash (Hamming ≤ 10, same aspect) keeping the largest; 5 Booking photos were the same frames as site originals.
- Excluded: icons/PNG graphics, favicon, Unsplash and Pixabay stock, Angola / Maldives / India photos, the Bipin Ji portrait, anything under 1000 px on the long edge.
- Kept **198**, all `business-owned` (own site, or property uploads on Booking — OTA photos usable per Shahar's 2026-09-19 decision, as applied in earlier dossiers). Resized to ≤ 2000 px long edge only where larger (originals up to 6000 px); `original_width/height` recorded.
- Every image carries `place`: `lodge` (95 — the lodge, its rooms, pool, food, people there), `surf_kabalana` (1 — filename says Kabalana), `unidentified` (77 — mostly surf shots whose wave cannot be identified; do not caption as the lodge's wave), `not_lodge` (25 — Global Surf Beach House (a different property), Hikkaduwa by filename, Koggala Lake/river trips, retreat venues). Photographer credits in filenames (`capt_nir`, `@wat3rman_visuals`) are in `license_note`.
- 152 of 198 originals are ≥ 1920 px on the long edge; 84 of the 95 lodge photos are.
