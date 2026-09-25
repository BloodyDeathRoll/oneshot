# Pitch notes: layday-surf-ahangama (run 2026-09-ahangama-02, writer 0.2.0, 2026-09-25)

Channels: WhatsApp + in person (Shahar). Language: English only (Shahar). The dossier's `languages.owner_language_hint` is `si`, and Shahar overrode it, so there is no Sinhala version and nothing needs a native check. Run `mode: test`: nothing sent.

Short names used below: D = `dossier/layday-surf-ahangama/dossier.json`; DJ = `sites/layday-surf-ahangama/deploy.json`; CR = `reports/2026-09-ahangama-02/layday-surf-ahangama.md` ("Full round 1 — final site" unless marked); SEO = `sites/layday-surf-ahangama/seo-report.md`; AI = `sites/layday-surf-ahangama/aiseo-report.md`; CT = `sites/layday-surf-ahangama/final/src/tenant/content.json` (seeded content, DJ `seed.evidence.source`); IDX = `sites/layday-surf-ahangama/final/src/pages/index.astro`; SITES = `cms/app/src/collections/Sites.ts`. W = WhatsApp message, P = in-person file, H = index.html.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | 9.8/10 on Hostelworld, 10 reviews | H, W, P | D `reviews.hostelworld` {rating 9.8, count 10} |
| 2 | 10/10 on Booking.com, 6 reviews | H, W, P | D `reviews.booking` {rating 10.0, count 6} |
| 3 | 5.0/5 on Google, 15 reviews | H, W, P | D `reviews.google` {rating 5.0, count 15} |
| 4 | Ratings read on 19 September 2026 | H | D `reviews.*.fetched_at` 2026-09-19T18:20:00Z |
| 5 | No website, no Instagram, no Facebook | H, W, P | D `existing_site.url` null + `.notes`; `contact.socials.instagram/facebook` null |
| 6 | A guest finds three listings (Hostelworld, Booking.com, Agoda) and a Google Maps pin | H | D `existing_site.notes`; `contact.socials` (booking, hostelworld, agoda, google_maps) |
| 7 | The listings carry the owner's own words and photos | H | D `existing_site.notes`; `business.description` (verbatim owner copy on Hostelworld); `images[].license_note` (property-uploaded) |
| 8 | The way in (black gate, door to the right of the house) is only in a guest review | H | D `location.finding_it` (source = Hostelworld guest review, note "from a guest review") |
| 9 | "a little bit difficult to find" | H, P | D `reviews.quotes[5]` (Catherine, Hostelworld) |
| 10 | No WhatsApp number or email published | H, P | D `contact.whatsapp` gap, `contact.email` gap; `gaps[]` pitch_point |
| 11 | Before screenshots: Hostelworld and Booking.com listings on a phone, 25 Sep 2026 | H | Own captures, 390×844 @2x, Playwright, 2026-09-25 (`before-hostelworld-390.jpg`, `before-booking-390.jpg`). Google Maps capture timed out, so it was skipped. |
| 12 | The preview is built from their listings; everything comes from listings and reviews | H, W, P | CR dim. 1: "84 individual claims, 0 mismatch, 0 unsourced"; DJ `seed.evidence.source` (built from the dossier) |
| 13 | Headline "A two-minute walk from Kabalana" | H, P | CT `copyBlocks[intro].heading`; D `location.distance_to_beach`; live preview (screenshot) |
| 14 | Tagline from Hostelworld, "Surf, chill and feel at home in Ahangama" | H, P | CT `tagline`; D `business.tagline` (source Hostelworld, the owner's headline) |
| 15 | Ten of their own photographs | H | CR hard-fail list: "all 10 images business-owned"; CT `photos` length 10 |
| 16 | "Finding the door" section, step by step, with a map link | H, W, P | CT `copyBlocks[info,0]`; live preview screenshot `after-1440-finding-the-door.jpg`; AI row 15 |
| 17 | Three ratings, each with platform, count and the date read | H, P | CR pick note 3 ("read 19 September 2026" ×4); AI row 13 |
| 18 | Five guest reviews, word for word; name + platform; month where shown | H, P | CR dim. 1 (5 testimonials = `reviews.quotes[7,5,6,4,1]` by string equality); CT `testimonials` (3 dated 2026-04, 2 Booking undated) |
| 19 | The Kabalana wave, with today's forecast by Rosa | H | CT `spot`, `forecast`; CR "Third-party embeds" section |
| 20 | Check-in 14:00–19:00, check-out by 14:00 | H | D `stayInfo.checkInFrom/To`, `checkOutTo`; CT `stayInfo` |
| 21 | 19 facilities | H | CT `amenities` length 19; CR dim. 5 ("19 amenities") |
| 22 | "Check dates" opens Hostelworld, Booking.com, Agoda; Call rings +94 77 855 3343 | H, P | CR dim. 3 (tap-through at 390); D `booking.engine_url`, `other_engines`, `contact.phone` +94778553343 |
| 23 | Screenshots of the preview at 390 and 1440 px, 25 Sep 2026 | H | Own captures, Playwright, https://layday-surf.os1.workers.dev/ → 200 |
| 24 | 184 KB to open on a phone; limit 1.5 MB | H, P | CR budget table: 183 832 B first load; playbook §4 ≤ 1.5 MB |
| 25 | 0.39 s until main content shows on a slowed phone test; limit 2.5 s | H, P | CR budget table: LCP 388 ms (390×844, 1.6 Mbps, 150 ms, 4× CPU); playbook §4 ≤ 2.5 s |
| 26 | 0 jumps while loading | H | CR budget table: CLS 0 |
| 27 | 0 requests to other companies' servers on open; no trackers, no pop-ups | H, P | CR budget table: third-party requests on load 0; CR dim. 7; playbook §4 |
| 28 | Every button/link ≥ 44 px on a phone: 0 of 19 smaller | H | CR dim. 6: "Tap targets at 390 … 0 of 19" |
| 29 | 84 facts, 0 without a source | H, P | CR dim. 1 |
| 30 | Booking and phone links work with JavaScript off | H | CR dim. 3 (JS off: plain Hostelworld link, `<details>` dock with listings + phone); AI "JavaScript off" |
| 31 | Reviewer's full check scored 91.5/100, before it went online | H | CR "total: 91.5 / 100 … result: pass" (2026-09-23; deploy 2026-09-25) |
| 32 | Own login (email + password) that opens only their site | H, P | DJ `provision.evidence.ownerEmail`; `verify.ownerSitesVisible` 1, `verify.otherTenantSites` 404 ×2 |
| 33 | Save, and the live page updates by itself; ~17 s on this site | H, P | DJ `verify.edit.saveStatus` 200, `saveToLiveMs` 16994 (restore 14659); SITES `afterChange: publishAfterChange` |
| 34 | The 12 editor tabs (Basics … Contact & booking) | H | SITES tab labels, lines 76–399 |
| 35 | What each rendered tab changes on this page (name, tagline, six text blocks, photos, room, times, stay note, amenities, spot, forecast toggle, phone, address, map, booking links) | H, P | IDX (fields read: businessName, tagline, copyBlocks by slot intro/about×2/offer/info×2, photos, rooms label/beds/note, stayInfo, amenities, spot, forecast, contact.phone/address/mapUrl, bookingLinks, ratings, testimonials); CT `copyBlocks[].heading` |
| 36 | Photos uploaded from a phone: the site crops, resizes, compresses | H | `final/scripts/photos.mjs` header; `final/package.json` `build:cms` runs `photos.mjs`; playbook §9 |
| 37 | Ratings/quotes: can delete, cannot edit or add; we add new ones | H | SITES Reviews tab description ("You can delete a row; new rows are added by Oneshot"), `evidenceRowsDeleteOnly(['ratings','testimonials'])`; DJ `verify.ownerAddsRating` 400 |
| 38 | Opening hours, Prices, Lessons, Rentals & shop, WhatsApp, email, season are not shown by this design | H, P | IDX reads none of `openingHours`, `hoursNote`, `priceList`, `lessons`, `rentals`, `contact.whatsapp`, `contact.email`, `season` (grep, 2026-09-25; `season` only in `llms.txt.js`) |
| 39 | Layout, colours, fonts not editable; an edit cannot break the page | H, P | playbook §9 "Not owner-editable"; SITES has no layout/style fields |
| 40 | No nightly price published; rates are live dated OTA inventory; page sends guests to listings | H | D `gaps[offers]`; AI row 5 ("Rates change with the dates…") |
| 41 | Booking lists a 6-bed dorm, a Hostelworld guest wrote 4 bunk beds; neither published | H, P | D `contradictions[0]`, `room_types[0]`; AI `containsPlace` note (beds/sleeps null) |
| 42 | Season and opening year not published | H | D `season` gap, `business.since` gap |
| 43 | Bed count can be typed in (Rooms & stay) and shows | H | SITES `rooms[].beds`; IDX renders `r.beds` |
| 44 | Preview is hidden from search engines until they decide | H, P | DJ `deploy.live.noindex` true, `verify.liveAfter.noindex` true; live HTML `<meta name="robots" content="noindex, nofollow">` (fetched 2026-09-25) |
| 45 | Offer: managed = monthly fee, hosting/updates/backups ours; self-hosted = one-time fee, fully theirs, ~$6–12/month to their host, they carry updates/backups; managed recommended; fees agreed with the owner | H, W, P | PLAN.md §1 "Hosting modes", §5 writer; writer base.md hard constraint 2; Shahar: no fee amounts exist |
| 46 | Preview link https://layday-surf.os1.workers.dev/ | H, W, P | DJ `deploy.live.url`; opened 2026-09-25 → 200 |
| 47 | Reply via the WhatsApp message or in person | H, W | Shahar's instruction (no published channel of ours) |
| 48 | "Rukshan and his family" named by a guest, unconfirmed | P | D `business.run_by` (note: named by a guest review, unconfirmed) |
| 49 | Their listings don't change; the site links to them | P | DJ steps touch only our CMS + the Worker (provision/seed/deploy/verify); CT `bookingLinks` |

**49 claims, 49 sourced, 0 unsourced.**

## Checks before handoff (2026-09-25)

- Preview https://layday-surf.os1.workers.dev/ → HTTP 200 (curl and Playwright at 390 and 1440), `noindex, nofollow` present.
- "Before" screenshots present: Hostelworld and Booking.com listings (own captures). Google Maps capture timed out (45 s) and was skipped. The dossier has no old site (`existing_site.url` null), so there is no old-site screenshot to show.
- WhatsApp message: **485 characters** (≤ 600), English, contains the preview link. In-person version present.
- `index.html` static check: served by `python3 -m http.server` on 127.0.0.1, loaded and fully scrolled in Playwright at 390×844 and 1440×900. **7 requests, all to 127.0.0.1, 0 external**; 0 console errors; 0 broken images; 0 px horizontal overflow. Inline CSS, system fonts, no scripts, favicon `data:,`. Six JPEGs, 55–131 KB each.

## For the human before sending

- **Live numbers moved.** The Hostelworld listing captured on 2026-09-25 shows **10 (10 reviews)**. The dossier (read 2026-09-19) and the preview show 9.8. The page and the message quote the dossier's 9.8 with its date, so they match the preview. Re-harvest before sending if you want the current figure.
- The message goes to +94778553343 (the only published number). The dossier does not confirm WhatsApp on it (`contact.whatsapp` gap).
- No fee amounts anywhere. "How much?" is answered without a number (P).
- Not claimed on purpose: commission savings (the preview still books through the same OTAs, plus the phone); "live on Google" (noindex); a domain.
