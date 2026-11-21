# The Sandhya: sources

Harvester 0.5.0, run 2026-11-06, operator alon, `mode: test`. Public material only; nobody was contacted, nothing was logged into, no form was submitted.

How each page was read:

- **Headless:** one plain load in the repo's Playwright, no stealth, no cookies, no retry. `robots.txt` was checked first for every external page in this mode.
- **Fetch:** a summarising page fetch. Wording can be condensed, and quotes were limited in length. Entries from these carry `via_digest: true` in `dossier.json` where a quote matters: re-check against the page before quoting on a site.
- **Search:** text seen only in a web search result, the page itself not read. These are marked as such in the dossier and are never recorded as confirmed scores.

## The hotel's own

| URL | How | Yield |
|---|---|---|
| https://thesandhya.com/ | Headless, 200 | Copy, address, phone, email, Instagram link, 60 images (desktop), 114 on a phone. No `<video>`, iframe or video URL in source. Canonical and structured data point at vps125323.inmotionhosting.com |
| https://thesandhya.com/rooms | Headless, 200 | Room overview, sizes, 9 rooms, engine links, gallery |
| https://thesandhya.com/room/studio-king/ | Headless, 200 | Size, beds, floors, amenities, text, gallery |
| https://thesandhya.com/room/studio-twin/ | Headless, 200 | Same |
| https://thesandhya.com/room/studio-plus-king/ | Headless, 200 | Same |
| https://thesandhya.com/room/directors-suite/ | Headless, 200 | Same |
| https://thesandhya.com/dining | Headless, 200 | Concept, dishes, dietary note, cooking class, 2 galleries |
| https://thesandhya.com/design | Headless, 200 | Ethos, sustainability, service list: "Yoga and surf lessons", "Surfboard hire", gallery, staff photos |
| https://thesandhya.com/locale | Headless, 200 | Beach, nearby, day trips, Surf Dubai quote, map, gallery |
| https://thesandhya.com/house | Headless, 200 | Exclusive use "From US$3,500++ per night", the only price on the site |
| https://thesandhya.com/ (real viewports, 390 and 1440) | Headless, scrolled in steps | Settled the capture questions below; RESERVE button tapped; booking panel read |
| https://hotels.cloudbeds.com/reservation/WMvA6V | Page HTML 200 (plain fetch and headless). **The app's data call `/booking/property_info` answered 403 to headless, then it redirected to `/404` with "Oops! Something went wrong."** | From the HTML's structured data only: check-in/out, postcode, geo, 55 amenities, 4 rooms with ids, descriptions, occupancy, gallery URLs. **No live rates or availability: not reachable without getting round the wall, so not attempted further.** Tried for 2027-01-18 to 20 and 2026-12-07 to 09, and with no dates |

## Blocked or not read

| URL | What happened | What it would have given |
|---|---|---|
| https://www.instagram.com/thesandhya/ | robots.txt `Disallow: /`. Not loaded | Photos, reels, bio. A search snippet showed 6,847 followers, 188 posts, "adults-only beachfront boutique hotel and dining room" |
| https://www.facebook.com/thesandhya/ | robots.txt `Disallow: /`. Not loaded | Possible video. Found through search |
| https://www.booking.com/hotel/lk/the-sandhya.en-gb.html | 202, redirected to the Ahangama city page; the hotel is not on that page | Rating, rooms, quotes. Same with `/the-sandhya.html`. A search snippet showed 9.3 from 58 |
| https://www.tripadvisor.com/Hotel_Review-g674590-d12225146-Reviews-The_Sandhya-Ahangama_Galle_District_Southern_Province.html | 403 headless. A `ShowUserReviews` page answered 403 to fetch. `/Search` is disallowed in robots | Rating, quotes. A search digest gave about 4.9 from about 236, #3 of 42: unconfirmed |
| https://www.expedia.com/Ahangama-Hotels-The-Sandhya.h18099343.Hotel-Information | 429 "Bot or Not?" | Same family as Travelocity, Orbitz, Wotif, ebookers |
| https://www.lastminute.com.au/Ahangama-Hotels-The-Sandhya.h18099343.Hotel-Information | 429 "Bot or Not?" | |
| https://www.lastminute.com/hotels/sri-lanka/ahangama/the-sandhya_hid-4365451 | 403 to fetch | |
| https://hotels.com/ho686441/the-sandhya-ahangama-sri-lanka | `ERR_HTTP2_PROTOCOL_ERROR` headless | |
| https://www.agoda.com/the-sandhya/hotel/ahangama-lk.html | Guessed URL; redirected to a Unawatuna city page. Agoda's real URL not found | Google Maps shows Agoda selling it |
| https://vimeo.com/search?q=the%20sandhya%20sri%20lanka | robots.txt `Disallow: /search?`. Not loaded | |

## Read

| URL | How | Yield |
|---|---|---|
| Google Maps place page (`location.map_url`) | Headless, 200, "limited view" | Rating 4.6 with no count, 4-star, address without postcode, plus code X9G3+Q2, phone, site, check-in 14:00, check-out 12:00, amenities, prices for Sat Nov 7 to Sun Nov 8 in ILS. No reviews or photos readable |
| https://au.trip.com/hotels/ahangama-hotel-detail-10660372/hotel | Headless, 200 | 9.7 from 56, sub-scores, 9 full review texts, OTA room names, policies, opened 2017, renovated 2023, English. Prices not shown for the search date |
| https://www.kayak.com/Ahangama-Hotels-The-Sandhya.2781869.ksp | Fetch | 9.4 from 159, sub-scores, Booking 9.4 from 105, rates for Nov 11 to 12. No review texts |
| https://www.momondo.com/hotels/ahangama/The-Sandhya.mhd2781869.ksp | Fetch | 9.4 from 159, breakdown, rates for Nov 13 to 14 |
| https://guide.michelin.com/en/hotels-stays/ahangama/the-sandhya-13690 | Headless (202 with content) and fetch | Full description, 9 rooms, geo. No distinction shown; "No verified stays yet"; not taking reservations. Tablet Hotels images seen, not downloaded |
| https://www.wallpaper.com/travel/sri-lanka/ahangama/hotels/the-sandhya | Headless, 200 | Full article, Ali Morris, published 2017-06-09, modified 2022-07-25. Does not contain the words the hotel's site quotes from Wallpaper*. Images credited "TBC": not downloaded |
| https://www.thehotelguru.com/hotel/the-sandhya-ahangama | Fetch | Description, 30 metre pool, "from $240" undated, surf line |
| https://takeoff.to/hotel/the-sandhya | Fetch | "doesn't run its own surf school", under-16 policy, pool history |
| https://therantingpanda.com/2018/07/14/hotel-review-the-sandhya-at-sri-lanka-charming-boutique-beachfront-hotel-along-the-southern-coast/ | Fetch | 2018 stay: 15m pool, food, surf line. Hosted or not undisclosed |
| https://www.myboutiquehotel.com/en/boutique-hotels-ahangama/the-sandhya.html | Fetch | 9.3 from 54, 11 rooms, amenity list |
| https://collectorscarworld.com/?p=364933 | Fetch | 2022-12-01 article, surf lines, 15-meter plunge pool |

## Video surfaces

| Surface | Result |
|---|---|
| Own site | Every page's source checked for `<video>`, iframes and YouTube, Vimeo, mp4, webm and m3u8 URLs: none |
| YouTube @Thesandhya (https://www.youtube.com/@thesandhya, channel UCoiojyo51EtBSUizQ6DIFGA) | **Not the hotel.** A 123-subscriber channel of dance and transition shorts, 43 videos. Same name by chance; nothing taken |
| YouTube, third party: https://www.youtube.com/watch?v=9GjFPpm22bE | Andrew Moore, 2019-01-13, 12:19, a vlog of a stay. `vid-001`, license `unknown`, not usable; sheet looked at |
| YouTube, third party: https://www.youtube.com/watch?v=DDOkhVtvxo8 | Dany Dev, 2023, about Ahangama generally; page text does not mention the hotel. Not fetched, not recorded in `videos[]` |
| Vimeo | https://vimeo.com/thesandhya is a 404. Search disallowed by robots. A web search found no film |
| Instagram, Facebook | robots.txt disallows both, so **reels not checked**. A person with a browser should look at the Reels tab |

## Searches

The Sandhya hotel reviews; Wallpaper and surf and video; Tripadvisor, Booking and Agoda listings; Telegraph; video tour; Instagram and reels; the two Wallpaper* quotes on the site (no result); the Surf Dubai quote (a Roar Media article, https://archive.roar.media/?p=100240, has a similar sentence; no Surf Dubai page found); Matt Power photographer (nothing). A search digest mentioned a Telegraph description; no Telegraph page was found, so nothing from it is recorded.

## Images

- 264 candidates: 184 from the own site, 80 from the engine's structured data. All downloaded. Theme icons were excluded.
- 187 kept after removing exact (sha256) and near duplicates (perceptual hash and aspect), keeping the largest; 155 from the site, 32 from the engine only. Crops of the same scene with a different aspect remain.
- Steps match `tools/restore-assets.py`. Checked: 4 files deleted and re-fetched by the tool, and all 187 matched their hash.
- 46 have a long edge of at least 1920 px. Engine copies are capped near 1500 px.
- Not downloaded: Trip.com, Tablet Hotels and Wallpaper* copies. The own site has more and better, and their terms are not the hotel's.

## Capture questions settled against a real viewport

- **Washed-out hero:** a white intro veil with a logo-drawing animation, caught midway. Settled, the hero is rich and dark. The veil itself is real for about 3 s or more after load.
- **Blank sections in a full-page shot:** AOS scroll-reveal; all appear in a real viewport.
- **2381 px wide desktop shot:** off-screen carousels; no sideways scroll for a visitor.
- **Scout's `cta_above_fold: false`:** wrong. A RESERVE button shows on the first screen and stays fixed; `tools/funnel.mjs` misses it because it is an `<a>` with no `href`.
- **Booking panel with picked dates:** not settled. The calendar did not respond to the automated tap, so only the default-date behaviour was seen.
