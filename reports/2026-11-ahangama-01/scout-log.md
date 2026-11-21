# scout-log — run 2026-11-ahangama-01

Scout 0.4.0, 2026-11-06, operator alon. Mode `business`, one anchor named by Alon, `radius_m` 0, `presence_threshold` 5. Alon asked for a higher-priced hotel in Ahangama; no town search was run, so this is a comparison of named hotels, not a census.

## Anchor

Google Maps place page, headless Chromium, `The Sandhya Ahangama Sri Lanka`: pin 5.9769788, 80.3525613. OSM coastline way 23463869 (OSM API, 1,234 elements): nearest node 74 m from the pin. A radius of 0 leaves the anchor as the whole area, so `area.geojson` is the point.

## Candidate comparison, 2026-11-06

Prices are aggregator snapshots on default or mixed dates, not confirmed rates. In `candidates.json`, only the funnel's `measured_at` is an exact time; the other `fetched_at` values are this session's approximate times.

| Hotel | Price seen | Own site | Funnel probe (`--depth 1`) | Outcome |
|---|---|---|---|---|
| The Sandhya | $231–387 (Kayak, Momondo) | thesandhya.com | 1 tap, primary tel, no action above the fold, engine on /rooms | Named by Alon, candidate |
| Coast 67 | $334 (Travelocity, one listing) | coast67.com | 1 tap, hero WhatsApp, CTA above the fold | Not taken: strong funnel |
| Harding | from $206–220 (Travelocity, Booking) | hardingboutiquehotels.com | Failed twice (the second with exit 3): not measured | Not taken |
| Kurulu Bay | from $306 (Mr & Mrs Smith) | kurulubay.com | Not run | Not taken |
| SĀMA | Not checked | sama-ahangama.com | 1 tap, hero engine, CTA above the fold | Not taken |
| Panta Rei | None found | pantareiresort.com | 1 tap, primary WhatsApp, CTA above the fold | Not taken |
| Casa Tikiri | from $33 (Booking, one listing) | casatikiri.com | 1 tap, primary WhatsApp, CTA above the fold | Not taken: low price |
| Mihira | None found | mihirasrilanka.com | 2 taps, primary WhatsApp, CTA above the fold | Not taken |
| UYANA | $52–210, conflicting | uyana.ch | 1 tap, primary engine, no CTA above the fold | Not taken: conflicting prices |
| Thalduwa Island Villas | $315 for Karmel only | None found at 3 guessed domains or in search | Not run | Not taken: rates unverified |
| Soul Temple | €240 (Expedia, one listing) | soultempleofsurfing.com, titled as a Weligama surf school | Not run | Not taken: conflicting listings, one says temporarily closed |

## Sources that failed

Booking.com (HTTP 202, empty body), Expedia and Travelocity (HTTP 429), hotels.com (timeout), luxurytraveladvisor.com (HTTP 403), traveleon.ai (HTTP 521). No workaround was tried.

## Taxonomy gap

`verticals/surf/taxonomy.md` holds only its title, so `types` and scout rule 5 are the definition used. Under rule 5, The Sandhya does not market to surfers: `surf_related_confidence` 0.4. Reported to Alon before harvest.

## Corrections after harvest, 2026-11-06

Both checked on the live site after the harvester reported them.

- **First screen:** a RESERVE button is visible on the first phone screen (390 x 844). It is an `<a>` with no `href`, which `tools/funnel.mjs` does not count, so `cta_above_fold: false` in `funnel.json` is a limit of the probe, not a fault of the site. The `no_cta_above_fold` tag is removed. The `scored` ledger line still says otherwise; the ledger is append-only, so the `harvested` line carries the correction.
- **Surf:** `/design` lists "Yoga and surf lessons" and "Surfboard hire", so "no boards, lessons or surf offers" above was wrong: it was based on `/locale` and `/rooms` only. `surf_related_confidence` goes from 0.4 to 0.6.
