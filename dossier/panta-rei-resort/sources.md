# panta-rei-resort — sources

Harvester 0.5.0, run 2026-11-lk-surf-01, 2026-11-06 09:51–10:10 UTC. Public web only; no login, no cookies.

| URL | Fetched (UTC) | Yielded | Did not yield |
|---|---|---|---|
| https://www.pantareiresort.com/ (Playwright 1440 px + iPhone UA, curl) | 09:51 | tagline, 16 bungalows, restaurant text, address, email, WhatsApp link, engine link, home background video (vid-001), 6 photos, logo, old-site screenshots, first-load weight | room prices, location detail |
| …/about | 09:51 | owner's About text (Kabalana, surfing, yoga shala, pool), pool day pass 3500 LKR, fitness text, About background video (vid-002), 3 photos (1 stock: Unsplash Buddha) | |
| …/ourrooms | 09:51 | 4 room names + feature lists, 11 room photos | prices; descriptions are one repeated Booking.com sentence |
| …/restaurant | 09:51 | breakfast/lunch/dinner hours, menu text, one testimonial (Alba R), 4 photos, links to the menu PDFs | |
| …/events (Activities) | 09:51 | Panta Fitness Club, groups & retreats, Activities background video (vid-003), 2 photos (+1 stock background), schedule PDF | |
| …/explore, …/menus, …/room-information | 09:51 | nothing: empty pages (in sitemap) | |
| …/contact | 09:51 | address, phone, emails (link → gmail), "surf background" image | |
| …/sitemap.xml, …/pages-sitemap.xml | 09:41 | 8 pages, lastmod 2026-10-29 | |
| …/_files/ugd/4ed5e8_62b16ead32284163b9888499e1c39ca7.pdf (guest guide, linked as "room" on the home page) | 09:52 | house rules, quiet hours, generator, laundry, breakfast 8:30–11:30, transport, emergency contact, sister hotel The Nuga House, local guide, Surf Therapy / Revitalizing massage prices | (also contains the guest Wi-Fi password: deliberately not recorded) |
| …/_files/ugd/89c528_cceeed2210fc430fb26ea35eb35d6032.pdf (breakfast menu) | 09:52 | 14 breakfast + 3 kids' items with LKR prices, 10% service charge | |
| …/_files/ugd/89c528_2938814660ac49abab25d22799fba94c.pdf (all-day menu) | 09:52 | all-day breakfast, sweets, mains, sides, salads, kids' — LKR prices | |
| …/_files/ugd/89c528_2cd9bc960fa848c18229699f785b0152.pdf (fitness schedule) | 09:52 | Vinyasa yoga 8:30AM daily except Friday; 2500 / 3000 / 3500 LKR | |
| https://static.wixstatic.com/media/… (27 files) | 10:00 | image originals (make-media.sh) | |
| https://video.wixstatic.com/video/… (3 files) | 09:52 | vid-001, vid-002, vid-003 (tools/fetch-video.mjs) | |
| https://pantareiresort.holidayfuture.com/ | 09:55 | engine home: 4 room types, "Book direct" text, stale ratings (4.8 / 9.1 / 4.5), YouTube link, broken logo link | prices without dates |
| …/listings/572800, 572802, 572799, 572798 | 09:57 | room descriptions (m², beds, bathroom, view), check-in 2 pm / out 11 am, cancellation 100% refund up to 14 days, 20 photo URLs (17 unique) | per-night price: needs dates; the calendar did not respond to automation |
| https://www.youtube.com/@Panta_Rei_Resort/videos | 10:00 | channel listing: 1 video (assets/video/listings/UC-iTHq8oyqKavbU14c8nlcg.json) | |
| https://www.youtube.com/watch?v=Zg-yEE_XiFI | 09:59 | vid-004, 129 s film, uploaded 2023-01-09 | |
| Google Maps place (cid 0xd6c7333702ff274) | 09:44, 09:55 | name, address, plus code, phone, website, check-in/out, 4.7 (213), 5 review texts, owner reply, OTA price ₪339 | review dates; reception hours |
| https://www.booking.com/hotel/lk/panta-rei-resort.en-gb.html | 09:55 | 9.2 (468) + category scores, 4 room types with beds, facilities, policies (cash, 3% card fee, extra bed US$20), nearby distances, 5 guest highlights, JSON-LD | prices (dated URL hit a challenge); "+70 photos" not opened |
| https://www.instagram.com/pantarei_resort/ | 09:45 | 2,970 followers, 186 posts (meta) | reels/posts: login wall |
| https://www.facebook.com/profile.php?id=100093054286482 | 09:45 | 123 followers, intro, +94 74 209 5135, gmail, last post 2026-11-04 | reels: login wall |
| https://www.tripadvisor.com/Hotel_Review-g674590-d25364260-… | 09:45 | — | 403 bot wall |
| OSM API map bbox 80.343,5.970,80.357,5.984 | 09:44 | coastline way 23463869: pin 366 m from shore | |
| Nominatim | 09:40 | [] for the name and the road | |

Not visited: Agoda (seen only in Google's price panel), Airbnb (no listing found linked), Vimeo / TikTok (none linked).
