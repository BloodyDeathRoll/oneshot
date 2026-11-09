# scout-log — run 2026-11-lk-surf-01

Scout 0.4.0, 2026-11-06 09:40–09:50 UTC. Mode `business`, anchor "Panta Rei Resort, Kabalana, Ahangama, Sri Lanka", `radius_m: 0`: one named business (Alon, chosen from a shortlist of upscale Ahangama hotels with weak sites), no area search. `mode: test`.

## 1. Anchor and area

- Nominatim returned `[]` for "Panta Rei Resort Ahangama" and "Back To Life Road Ahangama" (09:40:58Z).
- Google Maps place "Panta Rei Resort" (website link pantareiresort.com) gives pin **5.9807381, 80.3497102**, plus code X8JX+7V (09:44:48Z). This pin is the anchor.
- OSM coastline way 23463869 (OSM API `map` call, bbox 80.343,5.970,80.357,5.984): the pin is **366 m** from the shore. The site itself says "300 metres from Kabalana Beach".

`area.geojson` holds the anchor Point; radius 0 means no circle. The candidate is the anchor, so `inside_buffer: true`.

## 2. Sources queried

| Source | Result |
|---|---|
| pantareiresort.com (curl: home, about, ourrooms, restaurant, events, explore, contact) | All 200. Wix. Desktop viewport `width=device-width`; an iPhone UA gets Wix's phone layout (`width=320`, scrollWidth = innerWidth, no horizontal scroll). Sitemap: 8 pages, lastmod 2026-10-29 |
| `tools/funnel.mjs` 0.2.0 `--depth 1` | clicks_to_book 1; primary action WhatsApp (+94728003022, prefilled "check availability"); hero "CHECK AVAILABILITY" → pantareiresort.holidayfuture.com; cta_above_fold true; 7 pages; 0 errors. Its 390 px screenshot shows the desktop layout (the tool's UA is not a phone UA); a separate iPhone 13 screenshot shows the phone layout with the same CTA plus "Best price when booking direct" |
| HolidayFuture engine | 200, title "Panta Rei Resort \| Boutique Hotel in Ahangama, Sri Lanka" |
| Google Maps (headless) | Hotel, 4.7 stars, 213 reviews; address "back to life road, Kabalana Rd, Ahangama 80650, Sri Lanka"; +94 72 800 3022; check-in 14:00 / out 11:30; Booking.com and Agoda from ₪339 (Nov 10–12, 2 adults) |
| Booking.com (headless) | 9.2 Superb, 468 reviews; pool, restaurant, bar, airport shuttle, family rooms. No surf facility listed |
| Instagram @pantarei_resort | 2,970 followers, 186 posts |
| Facebook page 100093054286482 | 123 followers; lists +94 74 209 5135 and pantareiresort@gmail.com; last post 2026-11-04 |
| TripAdvisor d25364260 | **403** bot wall |

## 3. Score

**4: booking exists, content stale.** The site is mobile and books in one tap (WhatsApp, plus the HolidayFuture engine above the fold). What is weak is the content, which the 0–5 scale only reaches through "stale":

- 140 words on the home page; the "Rooms", "Restaurant" and "Fitness" home sections are image tiles with a button and no text;
- the four room cards on /ourrooms open with the same Booking.com sentence ("Situated in Ahangama Central, 300 metres from Kabalana Beach, Panta Rei resort features accommodation with a seasonal outdoor swimming pool…");
- /explore ("Expolore" in its title) is empty;
- a Wix template address `mailto:info@mysite.com` is left on /events;
- no room price anywhere on the site (only a 3,500 LKR pool day pass on /about);
- three contact sets across site and Facebook: hello@pantareiresort.com, pantareiresort@gmail.com, +94 72 800 3022, +94 74 209 5135.

So the pitch is a redesign of a working site, not "you have no site": the new one has to beat a real site that already books directly.

## 4. Surf relation (constraint 5)

`beach_lodging`, `surf_related_confidence` 0.5. For: its own site says "surfing the waves of Kabalana" (/about) and "the perfect base for surfing" (meta description), and offers to host surf/yoga groups (/events). Against: no lessons, rental or board storage found on the site, Booking.com or Google; run 2026-09-ahangama-02 excluded it under constraint 5 from its Google listing alone. Alon chose it by name; gate a decides.

## 5. For the harvester

- The desktop home page has a background video (motion-blurred frame in the funnel's fold screenshot); Wix-hosted. Instagram has 186 posts to check for reels.
- Photography on the site is strong and professional (aerial of the pool and bungalows, rooms, food, yoga).
- Room types on the site: Double Deluxe, Suite Triple, Family Villa, and a one-bedroom villa with a private pool. No prices: Google/OTA prices are the only public ones.
- Rule 7 flag: `no_public_prices` on the own site (OTA prices exist).

## 6. Exclusions

None: a single-business run with no area search.

## 7. Gaps

- `verticals/surf/taxonomy.md` is a stub, so `run.yaml` `types` was used.
- TripAdvisor not read (403).
