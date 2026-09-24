# sources — surf-revolution-kabalana (run 2026-09-ahangama-02, harvester 0.1.0)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/place/Surf+Revolution+Kabalana/data=…!19sChIJHzN521QT4ToRCj-I9EmGCww?hl=en&rclk=1 | Name, category "Surf school", address "Kabalana beach, Ahangama 80650", phone +94 76 379 2260, full week hours 6:30 am–6 pm, rating 5.0 (19) with breakdown (19×5, no negatives), three review texts | Prices, description, the remaining 16 reviews, full text of the longest quote ("More" does not expand logged out) |
| https://www.google.com/maps/search/Surf%20Revolution%20Kabalana/@5.9794134,80.350836,17z?hl=en | The **duplicate listing**: "Surf revolution kabalana", no reviews, same phone, whose website link is https://www.surfrevolutionkabalana.com/ — the main listing's website link is the Instagram account | — |
| https://www.instagram.com/surf_revolution_kabalana/ | Bio verbatim (Beginner • Intermediate, WhatsApp +94 76 379 2260, English/Russian, Kabalana Beach), 121 followers / 50 posts, 12 grid tiles with permalinks — all their own | Prices, captions (logged-out wall), images above 640 px |
| curl -sIL http://surfrevolutionkabalana.com/ and https:// on both hosts | HTTPS refused on both hosts; HTTP 302 → https://www.expiredwixdomain.com/?redirectedFor=surfrevolutionkabalana.com → HTTP 404. DNS resolves both hosts to 199.15.163.139 | Any surviving site content — the Wix domain has lapsed |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Spot description (third-party, marked as such) | Nothing about this business |

## Corrections to the scout
- The scout recorded "no website anywhere" and scored presence **1**. There *is* a website link, on the duplicate listing, and it is dead: the business scores **2** (dead site). Still inside this run's threshold of 2, so the shortlist decision stands.
- The scout did not merge the duplicate listing "Surf revolution kabalana" (no reviews, same phone, links the dead domain) with the main one. The dedupe rule planned for the scout (30 m AND same name/phone) would have caught it on the phone number.

## Not attempted / blocked
- Instagram captions and comments: logged-out wall. Never logged in (hard constraint 5).
- No screenshot of the old site: HTTPS is refused and the HTTP redirect target is a 404 parking page, so there is nothing to capture.

## For the next run
- Always read the `a[aria-label^="Visit …'s website"]` hrefs out of the Maps search feed, not just the place page — that is where the second listing's dead domain surfaced.
- Ask the owner whether they want the lapsed domain back; it is a concrete, cheap pitch opening.
