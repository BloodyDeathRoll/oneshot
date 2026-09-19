# sources — good-story-surf-school-ahangama (run 2026-09-ahangama-02, harvester 0.1.0)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400, mobile probes at 390×844 with an iPhone UA.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.google.com/maps/search/Good%20Story%20Surf%20School%20-%20Ahangama/@5.9794134,80.350836,17z?hl=en | Name, "2-star hotel", address "Ahangama, Sri Lanka", plus code X9H2+32, phone +94 76 005 2597, website field goodstorysurf.com, attribute "Identifies as women-owned", hotel details (Wi-Fi, free breakfast, free parking, pool, beach access, kid-friendly), rating 4.6 | No opening hours, no prices ("Contact this property for rates and availability"), no review text — hotel listings expose no Reviews tab logged out, no street address |
| https://www.instagram.com/goodstorysurf/ | Bio verbatim, "since 2013", ISA-certified coaches, 6,811 followers / 117 posts, highlight titles (TEAM, Price, How to book, ABOUT, Surf school, Spa, Villas, Hotel), 12 grid tiles (7 own, 5 from sibling brands) | Highlight contents (logged-out wall) — the "Price" and "How to book" highlights are exactly what is missing; captions; full-resolution images (640 px only) |
| https://goodstorysurf.com/surf-school (mobile 390 px + desktop 1440 px, screenshots kept) | HTTP 404, final URL www.goodstoryvillage.com/surf-school, title "404: This page could not be found.", 33 chars of body — pitch evidence | Any surf-school content |
| https://www.goodstoryvillage.com/ (mobile screenshot kept) | Where the domain lands: villa-rental listing, mailto:info@goodstoryvillage.com as the only booking path | No surf school, no Ahangama page, no prices |
| curl -sIL https://goodstorysurf.com/ and https://www.goodstorysurf.com/ | Both 301 → https://www.goodstoryvillage.com/ — confirms the loss is domain-wide, not a single bad path | — |
| Web search: `"Good Story Surf" Ahangama … ISA instructor` | Corroboration of ISA certification and villa/camp structure; a stale index entry titling goodstorysurf.com as a live surf site | Prices (one aggregator calls it "the most expensive surf school in Sri Lanka" — not recorded, no primary source) |
| Web search: `"Good Story Surf School" tripadvisor …` | A TripAdvisor listing exists with ~71 reviews — recorded with a gap, because the listing is filed under **Weligama**, not Ahangama | Star rating, verbatim reviews |

## Not attempted / blocked
- TripAdvisor pages: 403 to this harvester (known from the scout run); not retried with a browser.
- Instagram highlights and captions: logged-out wall. Never logged in (hard constraint 5).
- Google review text: not exposed on hotel-style listings logged out.

## For the next run
- The Instagram highlights "Price" and "How to book" hold the two biggest gaps — ask the owner rather than scraping.
- Confirm whether the TripAdvisor Weligama listing is the same business before using any of its numbers.
