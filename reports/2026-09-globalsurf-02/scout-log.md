# scout-log — run 2026-09-globalsurf-02

Scout 0.3.0, 2026-09-28 16:48–16:55 UTC. Mode `business`, anchor "Global Surf Adventures (globalsurf.com)", `radius_m: 0`: one named business (Shahar), no area search. `mode: test`. Fresh run: nothing carried over from the voided run 01.

## 1. Anchor and area

Global Surf Adventures is an Israel-registered surf travel agency (terms page: "Global Surf is a company registered in Israel … Global Surf Lanka is a company registered in Srilanka"). It publishes an HQ phone (+972 9 973 3943) but no HQ address. It sells trips to Sri Lanka, the Maldives, Morocco, Angola and Mozambique, plus retreats. Its one owned property is **Global Surf Lodge Kabalana, Ahangama, Sri Lanka**.

**Mismatch noted:** the business is an agency; the candidate is typed `surf_camp` and located at the lodge. No `run.yaml` type fits a multi-destination agency.

- Nominatim returned `[]` for "Global Surf Lodge Kabalana Ahangama" and "Global Surf Adventures" (16:52:56Z).
- Google Maps place "Global Surf Lodge" (its website link is the globalsurf.com lodge page) gives pin **5.9810484, 80.3420635** (16:52:13Z). This pin is the anchor.
- Booking.com property pin 5.9811597, 80.3420327 is 12.8 m away.
- OSM coastline way 23463869 (OSM API map call, 16:53:07Z): the pin is 45.1 m from the shore.

`area.geojson` holds the anchor Point. The area is that same Point, because radius 0 means no circle. The candidate is the anchor, so `inside_buffer: true`.

## 2. Sources queried

| Source | Result |
|---|---|
| globalsurf.com (curl: home, contact, lodge, terms) | All 200 with viewport meta. Footer "© 2019". dateModified: home 2023-05-09, lodge 2023-05-07, contact 2023-12-07, terms 2024-11-06 |
| Sitemaps (12 files, 64 URLs), all fetched | Scanned for video. Newest lastmod is 2026-03-18 |
| `tools/funnel.mjs` 0.1.2 `--depth 1` | clicks_to_book 1; primary action engine ("READY TO CATCH MY FIRST WAVE" → Bookinglayer); cta_above_fold true; 16 pages; 0 page errors |
| Bookinglayer links (curl) | `/tests/en/category/sri-lanka` → 200 at `/en/tests/en/category/sri-lanka`; `.io/frontoffice` → 200 `/en/frontoffice`; `/en/category/sri-lanka` → 200 |
| Google Maps (headless) | Rating 4.7 (review count not rendered), 3-star hotel, address, plus code X8JR+CR, +94 77 077 6747 |
| Booking.com (headless) | 8.6 from 80 reviews; address; pin |
| Instagram @globalsurf_ | 17K followers, 1,622 posts; Reels tab has reel links |
| Instagram @globalsurf_kabalana | 1,867 followers, 75 posts; has reels |
| Facebook GlobalSURFltd | 11,277 followers; 98% recommend (54 reviews); Reels tab present. curl got 400, headless worked |
| YouTube @globalsurf1582 | 542 subscribers, 223 videos, latest upload 2026-09-03 (RSS feed + /videos page) |
| TripAdvisor | **403** bot wall |
| Overpass API | **406**; used the OSM API `map` call instead |

## 3. Score

**4: booking exists, content stale.** The site is mobile and has a working Bookinglayer engine one tap from landing, with the CTA above the fold. It also offers WhatsApp, tel and a contact form. The content is stale:
- the footer still says © 2019;
- the home and lodge pages were last modified in May 2023;
- the lodge's "BOOK YOUR STAY" link goes through a `/tests/` URL;
- no prices appear on the site itself.

The site also loads the Facebook Pixel and an Elfsight Facebook chat widget.

## 4. Video presence (for the harvester)

- **Site-embedded (15 distinct YouTube IDs, all Elementor background/hero or inline):**
  - home hero `t0EF-4uKNuM`;
  - lodge hero `eE-YzSYizm0`;
  - about `bqISDBfdUCc`;
  - Kabalana packages/levels `EXW-rN_nlvs`, `6FMqhhFMwG4`, `OsSu_wzYhgo`;
  - Maldives `tAyHnAuyySI`, `PIuf9PwtlUY`, `StHadymX1ps`, `6AHIkeFxMVk`, `ISRAqQpe8oU`;
  - Morocco `iCPZ2x-Wxig`, `qfPsqK0f-UY`;
  - Angola `8cJVcKjcVRs`, `bCAh8vntcgA`.

  There are no self-hosted mp4 files and no Vimeo.
- **YouTube channel:** 223 videos in total. The lodge-specific ones among the 15 most recent are `RHbSfJFg-Fo` "Kabalana Lodge Experience", `ERkqRTIbwrg` "Global Surf's Lodge Kabalana" and `Cq6u_7x8CE4` "Surf & Yoga Retreat – Global Surf Lodge Kabalana".
- **Instagram reels:** @globalsurf_ (12 sampled) and @globalsurf_kabalana (4 own reels sampled). The kabalana grid also shows reels owned by other accounts; those are excluded.
- **Facebook:** the page has a Reels tab and a recent 6-second video post. It was not enumerated because that needs a login.
- **TikTok, Vimeo:** none linked or found.

The full list with URLs is in `candidates.json` → `candidates[0].videos`. That field extends schema v0.2.0.

## 5. Exclusions

None. This is a single-business run with no area search.

## 6. Gaps

- `taxonomy.md` is a stub, so `run.yaml` `types` was used. No type fits an agency.
- The Google review count was not captured. TripAdvisor was not verified (403).
- Test-mode fitness is for the human at gate a. Prices exist only inside the Bookinglayer engine, and the business spans five countries.
- `schemas/candidates.md` has no `videos` field. The scout added one; a schema proposal may be warranted.
