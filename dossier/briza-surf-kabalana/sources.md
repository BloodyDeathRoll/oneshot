# sources — briza-surf-kabalana (run 2026-09-ahangama-02, harvester 0.1.0)

All fetched 2026-09-19 (UTC) with headless Chromium (playwright-core 1.62.1, Chromium 1234) at 1440×1200 unless noted.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/search/Briza%20Surf%20Kabalana/@5.9794134,80.350836,17z?hl=en | Name, category "Surf school", address Kabalana Rd / plus code X9H2+G3, phone +94 74 164 8662, full week hours 6 am–6:30 pm (from the expanded hours aria-labels), rating 5.0 (1), the one review verbatim | No website (listing shows "Add website"), no price list, no description, no email |
| https://www.google.com/maps/place/Briza+Surf+Kabalana/data=!4m7!3m6!1s0x3ae113b188981a99:0xb1a7729445741718!8m2!3d5.9787537!4d80.3502322!16s%2Fg%2F11zkgd2_y0 | — (recorded as `map_url` only) | Direct `/place/…/data=` navigation drops the place and lands on a default map; use the `/maps/search/<name>/@lat,lng,17z` form instead |
| https://www.instagram.com/brizasurf_kabalana/ | Bio verbatim ("Surf • Eat • Chill 🌴 / All levels welcome / Beach food & fresh juice / Surf camp @nirvanasurfretreat / Bike Rental @nirvanabikessrilanka"), wa.me/94741648662, 259 followers / 129 posts, 12 grid tiles with post permalinks (9 own, 3 reposted from @nirvanasurfretreat) | Prices, captions (logged-out wall), full-resolution images — grid serves 640 px long edge only |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Kabalana spot description and Nov–Apr season (third-party, marked as such in the dossier) | Nothing about this business |
| Web search: `"Briza Surf" Kabalana Ahangama surf school` | Confirmed only the Instagram account; one aggregator mention of a founder named "Dinusha" — **not recorded**, no primary source found | No website, no OTA listing, no TripAdvisor page, no prices |
| Web search: `brizasurf_kabalana instagram surf lessons price Ahangama` | Nothing new | No published prices |

## Not attempted / blocked
- Instagram post captions and comments: logged-out wall. Never logged in (hard constraint 5).
- Google Maps photos (2 on the listing): not downloaded; the Instagram set is licensable as business-owned, Maps photos would need per-photo attribution checks.
- No existing site, so no mobile/desktop screenshots and no Lighthouse run.

## For the next run
- Skip the `/place/…/data=` URL form; it fails logged out.
- Ask the owner directly for prices, lesson durations, group sizes and high-resolution photos — none of this is public.
