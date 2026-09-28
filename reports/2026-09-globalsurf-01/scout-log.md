# scout-log — run 2026-09-globalsurf-01

Scout 0.3.0, 2026-09-28 12:10–12:15 UTC. Mode `business`, anchor "Global Surf Adventures (globalsurf.com)", `radius_m: 0` — one named business (Shahar, 2026-09-28), no area search. `mode: test`. All times UTC.

## 1. Anchor and area

Global Surf Adventures is not a single-site business: it is a surf travel agency registered in Israel (terms page: "Global Surf is a company registered in Israel … Global Surf Lanka is a company registered in Srilan[ka]"), HQ phone +972 9 973 3943, selling trips to Sri Lanka, Maldives, Morocco, Angola and Mozambique, plus retreats and ISA courses. The site publishes no HQ address.

**Chosen location: Global Surf Lodge Kabalana, Ahangama, Sri Lanka** — the one property the site lists under "Our Hotels", and the only location with a Google listing, OTA listings and reviews.

- Nominatim: `[]` for "Global Surf Adventures", "Global Surf Lodge Kabalana, Ahangama, Sri Lanka", "Global Surf Lodge, Ahangama" (12:13:19Z).
- Google Maps place "Global Surf Lodge" (links to the globalsurf.com lodge page): pin **5.9810484, 80.3420635** (12:12:08Z) — used as the anchor.
- Booking.com property pin 5.9811597, 80.3420327 (12:12:00Z): 13 m from the Google pin.
- OSM coastline way 23463869 (fetched 12:13:11Z): Google pin is 45 m from the shore.

`area.geojson`: the anchor Point, and the area as that same Point (radius 0 → no circle). The one candidate is the anchor itself, so `inside_buffer: true` by definition.

## 2. Sources queried

| Source | Result |
|---|---|
| globalsurf.com (curl: home, contact, about, lodge, terms, sitemaps) | 200; viewport meta; footer "© 2019"; dateModified 2023 on key pages; newest sitemap page 2026-03-18 |
| `tools/funnel.mjs --depth 1` (12:10:11Z) | 16 pages; clicks_to_book 1 (WhatsApp, footer); cta_above_fold false; 1 page error (Mozambique timeout) |
| Bookinglayer engine (headless) | Live: Sri Lanka category lists Level 1/2/3 + Freestylers B&B packages |
| Google Maps (headless, consent cookie) | Listing found: 4.7 stars, review count not rendered, phone +94 77 077 6747, address "Henewatta addara gederawata, Ahangama 80650, Sri Lanka" |
| Booking.com (headless) | 8.6, 80 reviews; pin and address |
| Instagram @globalsurf_ | meta says 17K followers / 1,622 posts; rendered page said 2K — conflicting |
| Facebook GlobalSURFltd | 11,277 followers, 98% recommend (54 reviews); second link `globalsurfadventures1` = login wall |
| YouTube channel | consent wall, not checked |
| TripAdvisor | **403** (bot wall); rating only from search snippet (#8 of 86 B&Bs in Ahangama, 4/5) |
| BookSurfCamps | **403** (Cloudflare); listing and package only from search snippet |
| Web search | also surfcamp-online, KAYAK, trip.com, lakpura listings (not fetched) |

## 3. Score

**4 — booking exists, content stale.** Booking works (Bookinglayer engine, WhatsApp, tel, forms), site is mobile; staleness: © 2019 footer, key pages last modified 2023, lodge "BOOK YOUR STAY" goes through a `/tests/` URL (redirects to the engine home, not the Sri Lanka category), Mozambique page timed out, typos in engine product names ("Fomies") and URL slugs ("malidves"). No prices on the site itself (only inside the engine).

## 4. Funnel probe caveat

The funnel numbers are copied as the tool produced them. They understate the site: the hero button "Ready to catch my first wave" (above the fold) links to `globalsurfadventures.bookinglayer.io/frontoffice/#/`, but `bookinglayer` is not in `tools/funnel.mjs` ENGINES and the label does not read as booking, so the probe ignored it and reported `cta_above_fold: false`, `primary_action: whatsapp` via the footer icon. Tool gap, reported; not fixed here.

## 5. Exclusions

None (single-business run, no area search).

## 6. Gaps

- `taxonomy.md` is a stub; `run.yaml` `types` used. No type fits a multi-destination surf travel agency; `surf_camp` chosen for the lodge.
- Google review count not captured; TripAdvisor and BookSurfCamps unverified first-hand (403).
- Instagram follower count conflicts (17K meta vs 2K rendered).
- Test-mode fitness (public material enough for a complete site) is for the human at gate a: prices are only inside the engine; the business spans five countries.
