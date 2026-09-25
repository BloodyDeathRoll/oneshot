# Pitch notes: KA Surf Hostel (`ka-surf-hostel-and-restaurant`, run `2026-09-ahangama-02`)

writer 0.2.0 · 2026-09-25 · channels: WhatsApp and in person (Shahar's decision) · English only (Shahar's decision, so there are no `[needs native check]` items; the dossier's `languages.owner_language_hint` is `si`) · `mode: test`, so nothing is sent.

Abbreviations: **D** = `dossier/ka-surf-hostel-and-restaurant/dossier.json` · **DJ** = `sites/ka-surf-hostel-and-restaurant/deploy.json` · **CR** = `reports/2026-09-ahangama-02/ka-surf-hostel-and-restaurant.md`, section "full · Full-mode verification 3" (lines 1005–1128) · **SEO** = `sites/…/seo-report.md` · **AISEO** = `sites/…/aiseo-report.md` · **CMS** = `cms/app/src/collections/Sites.ts` · **TPL** = `sites/…/final/src/pages/index.astro` (which content fields the design renders) · **PLAN** = `PLAN.md` · **SHOT** = our own screenshot in this folder, taken 2026-09-25.

Why the critic's numbers apply to the live preview: CR measured a local build on 2026-09-23. DJ `deploy.evidence.parity.identical: true` says the CMS-built deploy is identical to that build (photo names aside), and `live.identicalToBuild: true`.

## Claims → sources

| # | Claim (page = P, WhatsApp = W, in person = I) | Where | Source |
|---|---|---|---|
| 1 | Preview URL `https://ka-surf-hostel.os1.workers.dev/` | P, W, I | DJ `deploy.evidence.live.url`. Re-checked 2026-09-25: HTTP 200 |
| 2 | "Search engines are told not to list it" / "not on Google yet" / "only a preview" | P, W, I | DJ `live.noindex: true`, `verify.liveAfter.noindex: true`. Re-checked 2026-09-25: `<meta name="robots" content="noindex, nofollow">` |
| 3 | Run by a family / "KA Surf Hostel family" | P, W | D `business.run_by` "a local family" |
| 4 | Built from your own words on Hostelworld | P, W, I | D `business.tagline`, `description`, `description_long` (Hostelworld, the owner's copy); CR facts table rows 2, 6–12 |
| 5 | No website of its own | P, I | D `existing_site.url: null`, `existing_site.notes`; D `gaps[]` `existing_site.url` (pitch_point) |
| 6 | Listed on Booking.com, Hostelworld, Agoda, TripAdvisor, Google Maps, and Instagram | P | D `contact.socials` |
| 7 | 9.8/10 Hostelworld (66), 9.4/10 Booking.com (39), 4.8/5 Google (42), read 25 September 2026 | P, I (9.8) | D `reviews.hostelworld`, `.booking`, `.google` (`fetched_at` 2026-09-25, refreshed by the orchestrator); same values live on the preview |
| 8 | Booking.com screenshot dated 25 September | P (caption) | SHOT `before-booking-390.jpg` |
| 9 | Booking platforms take a commission on the booking | P | D `existing_site.notes` ("platforms that take a commission"); D `gaps[]` `existing_site.url` ("every booking pays an OTA commission") |
| 10 | Best writing on Hostelworld; photos split between Booking.com and Instagram | P | D `business.description.note`; D `images[].source_url` (img-001…012 Booking.com, img-013…024 Instagram) |
| 11 | Names: Google "KA surf hostel and restaurant", Hostelworld "K A Surf Hostel", Booking.com "KA Surf Hostel" | P | D `business.name.note`; D `contradictions[3]` |
| 12 | Instagram asks a phone-browser visitor to open the app first | P | SHOT `before-instagram-390.jpg` |
| 13 | One page, English, 11 of their photos, from Booking.com and Instagram | P | `final/src/tenant/content.json` `locales.en.photos` (11); CR row "Photographs: KA Surf Hostel's own…"; playbook §8 (English only) |
| 14 | Three ratings with source and date, five guest reviews word for word | P, I | CR dim 1 (5 quotes equal to `reviews.quotes[3,7,9,1,8]` by string); CR facts row for ratings ("read 19 September 2026" ×7) |
| 15 | All six room types, mixed/female/male dorms to deluxe doubles | P, W | D `room_types[0–5]`; CR facts rows "6 room rows" and "Mixed, female and male dormitories…" |
| 16 | On a phone, "Check dates" stays on screen; opens Hostelworld, Booking.com, Agoda; "Call" rings +94 77 374 6053 | P, W, I | CR dim 3 (bar, sheet links identical to `booking.engine_url`, `other_engines[]`, `tel:+94773746053`); D `contact.phone`; SHOT `after-390.jpg`, `after-rooms-390.jpg` (bar visible after scrolling) |
| 17 | Guests book "the way you already take bookings" / "Nothing new for you to answer" | P, I | D `booking.path` "engine" (live inventory on Booking.com, Hostelworld, Agoda); playbook §5 (no channel the owner doesn't monitor) |
| 18 | 241 KB first screen; our limit 1.5 MB | P, I | CR budget table: 241 215 B, 8 requests; playbook §4 |
| 19 | Main text shows in 0.4 s (416 ms) on a slowed-down phone connection; limit 2.5 s | P, I | CR budget table LCP 416 ms at 1.6 Mbps / 150 ms RTT / 4× CPU; playbook §4 |
| 20 | 0 requests to other companies while the page loads; no trackers | P | CR budget table "Third-party requests on load 0"; CR dim 7 (0 `<script src>`, both embeds `data-src` only) |
| 21 | 0 accessibility errors in an automatic check on phone and laptop | P | CR dim 6: axe-core 4.11.1, WCAG 2.0/2.1 A+AA, 0 violations at 390 and 1440 |
| 22 | 0 sentences we could not trace back to your listings | P | CR dim 1: "0 contradictions, 0 claims without an entry" |
| 23 | No prices: rates change by date on the booking sites | P, I | D `gaps[]` `offers` (pitch_point); CR facts row "Rates change with the dates…" |
| 24 | No WhatsApp or email published | P, I | D `contact.whatsapp`, `contact.email` gaps; D `gaps[]` (pitch_point) |
| 25 | Restaurant: Google's name says "and restaurant", no menu or hours found | P, I | D `gaps[]` `restaurant`, `hours` (pitch_point); D `contradictions[3]` |
| 26 | Parking: Booking.com says none, Hostelworld says free | P, I | D `house_rules[0]`; D `contradictions[0]` |
| 27 | Fibre Wi-Fi: the Hostelworld page mentions it; Booking.com guests score Wi-Fi 2.5/10 | P | D `description_long`; D `reviews.booking.categories["Free WiFi"]` 2.5; D `contradictions[2]` |
| 28 | Own email/password login that opens their site only | P, I | PLAN §1 CMS row; DJ `verify.ownerSitesVisible: 1`, `otherTenantSites` 404 ×2, `ownerMediaForeign: 0` |
| 29 | Saving rebuilds the site; in our test a text change was live about 20 s after saving | P, I | CMS `hooks.afterChange: publishAfterChange`; DJ `verify.edit.saveToLiveMs: 19546` (intro text), `restore.saveToLiveMs: 14876` |
| 30 | You never touch the design, so an edit can't break the page | P | playbook §9 ("Not owner-editable: layout, styles, scripts…"); CMS has no layout/style fields |
| 31 | Tabs and what each changes on this page: Basics (name, tagline, languages spoken), Text, Photos (up to 24), Rooms & stay (rooms, check-in/out, note), Amenities, Surf (spot, forecast on/off), Contact & booking (phone, address, map link, booking links), Reviews | P, W ("text, photos and rooms"), I | CMS tab labels and fields (`photos.maxRows 24`, `forecast.enabled`); TPL renders businessName, tagline, languagesSpoken, copyBlocks, photos, rooms, stayInfo, amenities, spot, forecast, ratings, testimonials, contact (phone/address/map), bookingLinks |
| 32 | Reviews: copied word for word; you can remove one but not add or rewrite one | P, I | `cms/app/src/hooks/evidenceRowsDeleteOnly.ts` ("can be deleted, not added or edited"); CMS Reviews tab description; DJ `verify.ownerAddsRating: 400` |
| 33 | Opening hours, Prices, Lessons, Rentals & shop tabs exist, but this design doesn't show them, or a WhatsApp/email button, yet | P | CMS tabs; TPL does not read `openingHours`, `priceList`, `lessons`, `rentals`, `contact.whatsapp`, `contact.email` (grep: 0 hits in `index.astro`) |
| 34 | The offer paragraph: managed (monthly fee, hosting/updates/backups ours) vs self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, they carry updates/backups); we install, verify, hand over, revoke access; fees agreed with the owner | P, I | writer base.md hard constraint 2; PLAN §5 writer and §1 Hosting modes; Shahar's instruction (no fee amounts exist yet) |
| 35 | Preview address; if they already own a domain, we connect it | P, I | writer base.md hard constraint 3; PLAN §1 Domains |
| 36 | Check-in: Hostelworld 13:00–23:00, Booking.com 24 hours; the site shows 13:00–23:00 | P, I | D `hours_note`, `contradictions[1]`; CR facts row "Check-in 13:00 to 23:00" |
| 37 | Postcode not on the Google listing; the site uses 80650 from Booking.com | P | D `gaps[]` `location.address.postcode` (pitch_point); CR facts row for the address |
| 38 | AI assistants such as ChatGPT are allowed to read and quote the site: keep, or block? | P, I | AISEO "Crawler policy (owner decision, must be confirmed)" (GPTBot etc. `Allow: /`); PLAN §5 aiseo ("the writer must put it to them") |
| 39 | Screenshots are our own, 390 px, taken 25 September 2026 | P | the files in this folder (captured with headless Chrome, 390×844 at 2× and 1440×900) |
| 40 | Photos on the preview are KA's own, from Booking.com and Instagram | P | D `images[].license` "business-owned", `license_note`; CR facts row "Photographs…" |
| 41 | "Your guests clearly love the place" | P | framing on claim 7 (D `reviews.*`) |
| 42 | "Surf, chill…" / "Five minutes from Kabalana Beach", visible in the screenshots | P (images) | D `business.tagline`, `location.distance_to_beach` |

42 claims, all sourced, none without a source.

Not claimed on purpose: more bookings, speed compared with anything else, a Google ranking, a domain purchase, tablet layout (CR found an overflow from 761 to 1070 px), prices for our service, a published channel of ours.

## Images in this folder

| File | What | Size |
|---|---|---|
| `before-hostelworld-390.jpg` | their Hostelworld listing, phone | 83.8 KB |
| `before-booking-390.jpg` | their Booking.com listing, phone | 97.7 KB |
| `before-instagram-390.jpg` | their Instagram, phone browser, with the app prompt | 62.2 KB |
| `after-390.jpg` | preview first screen, 390 px | 58.3 KB |
| `after-rooms-390.jpg` | preview rooms section, 390 px | 65.9 KB |
| `after-1440.jpg` | preview first screen, 1440 px | 60.7 KB |

The Google Maps listing screenshot was not taken: the page timed out after 45 s in headless Chrome.

## Checks before handing off

1. Every claim above has a source.
2. Preview: HTTP 200 on 2026-09-25, noindex present. The "before" is shown with our own screenshots of the listings, because there is no old site (D `existing_site.screenshot: null`).
3. WhatsApp message: 512 characters, limit 600. English, per Shahar. The in-person version is present.
4. Static check: `index.html` served from `python3 -m http.server` on 127.0.0.1, loaded in headless Chrome at 390 and 1440 with a full scroll. 7 requests, **0 off localhost**, 0 broken images, 0 horizontal overflow. The one console 404 at 390 is `/favicon.ico` from the local server. Inline CSS only, system fonts, no scripts.
