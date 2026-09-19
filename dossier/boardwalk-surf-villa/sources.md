# sources — boardwalk-surf-villa (run 2026-09-ahangama-02, harvester 0.2.0, mode test)

Fetched 2026-09-19 (UTC), headless Chromium (playwright-core 1.62.1) at 1440×1400, `Accept-Language: en-US`.

| URL | Yielded | Did not yield |
|---|---|---|
| https://www.booking.com/hotel/lk/boardwalk-surf-villa.html | Address, rating 9.0/50 with seven category scores, the single room type, ~14 amenities, breakfast detail, four verbatim guest quotes, and the photo gallery (24 usable) | Nightly rates (need dates); check-in/check-out times — not published for this listing; full text of three quotes; **any owner-written prose** — "About this property" is Booking's own generated summary |
| https://www.google.com/maps/search/Boardwalk%20Surf%20Villa%20Ahangama/@5.97897,80.35231,17z?hl=en | Phone +94 70 238 6893, plus code, rating 4.6/9, "Open 24 hours", and the fact that the listing is **unclaimed** ("Claim this business") | Review text; a real website |
| Google "website" links (read from the `a[aria-label^="Visit"]` hrefs) | **Neither link is the business's.** One is `stays.dogfriendlyretreats.com/hotel/ahangama/boardwalk-surf-villa`, the other a `br.bluepillow.com` search URL — white-label resellers of the same Booking inventory. A second listing, "Boardwalk Surf Villa 2 - One-Bedroom Villa", points at the bluepillow one | Any owner-controlled page |
| https://thesurfatlas.com/sri-lanka-surf/kabalana-beach/ | Spot description (third-party, marked as such) | Nothing about this business |

## Test-mode check (`schemas/business-types.md`, `beach_lodging`) — **FAILS**
- rooms[] ✔ · ≥ 6 photos ✔ (24) · bookingLinks ✔
- stayInfo check-in/check-out ✘ — not published anywhere
- owner-written copy ✘ — **nothing on the public web is written in this business's own voice**

In `mode: test` there is nobody to ask, so this is a disqualification, not a question. The dossier is kept on disk; the business goes back to the shortlist.

## Worth keeping for a live run
The white-label reseller links and the unclaimed Google listing are a strong pitch: the business does not control the page most customers see, and two aggregators are monetising its name.
