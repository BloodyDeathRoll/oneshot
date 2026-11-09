# Pitch notes: cheeky-monkey (run 2026-10-midigama-01, writer 0.5.1, 2026-11-04)

Channels: email (published: `contact.email` cheekymonkeymidi@gmail.com) and WhatsApp (to `contact.phone` +94719248686, **not confirmed to be on WhatsApp**: `contact.whatsapp` is null, gap pitch_point). Instagram DM (`booking.direct_channels`) is the other published channel; the WhatsApp text fits it as is. The run file names no channel. Language: English (base.md rule 5, `markets/lk`). Run `mode: test`: nothing sent. Shape follows `sites/global-surf-adventures-v2/pitch/`; every claim below is cheeky-monkey's own.

Short names: D = `dossier/cheeky-monkey/dossier.json`; A = `dossier/cheeky-monkey/audit.json` (findings F1–F14; `audit.md`); S3 = `reports/2026-10-midigama-01/cheeky-monkey.md` "Round 3" (critic 0.4.3); X3 = `reports/2026-10-midigama-01/cheeky-monkey.experience.md` "Round 3" (and its round-1 §4 booking walk); FN = `sites/cheeky-monkey/final/notes.md`; FJ = `reports/2026-10-midigama-01/funnel/cheeky-monkey-r3/funnel.json`; AI = `sites/cheeky-monkey/aiseo-report.md`; SEO = `sites/cheeky-monkey/seo-report.md`; DIST = `sites/cheeky-monkey/final/dist/index.html` (= the deployed preview, byte-identical, checked 2026-11-04); L = the `passed → previewed` ledger line (2026-11-04T16:59:35Z, version e59d7492); LP = the `critiqued(3) → passed` line (waiver); P = `PLAN.md`. H = index.html, W = WhatsApp, E = email.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | Google 4.5/5 from 467 reviews, read 26 Oct 2026 | H, W, E | D `reviews.google` {4.5, 467, fetched_at 2026-10-26T19:01:35Z} |
| 2 | Booking.com 8.3/10 from 45 reviews, read 26 Oct 2026 | H, E | D `reviews.booking` {8.3, 45, fetched_at 2026-10-26T19:03:37Z} |
| 3 | Built from their pages, photos, Instagram reel, Booking.com listing | H, E | FN images (business-owned img-…, vid-009 reel), FN facts table (sources); S3 d1 |
| 4 | Preview URL https://cheeky-monkey-surf-camp.os1.workers.dev/ | H, W, E | L note; opened 2026-11-04 → 200, live index.html `cmp`-identical to DIST |
| 5 | Private preview, search engines told not to list it; cheekymonkeymidigama.com unchanged | H, E | L (noindex,nofollow meta; robots Disallow; no sitemap); only the preview Worker was deployed |
| 6 | Old first phone screen: nine-line WordPress "Notice" over the top half, then logo, no button | H | A F9, F1; `before-home-390.jpg` (= A evidence `funnel/landing-fold.png`) |
| 7 | Menu reaches Home, About us, Surf Shop & Activities, Contact us; none has a booking button or a price | H | A F1 (click path), audit.md intro; `walk/01-home-menu-open.png` |
| 8 | No booking button on any of the 4 pages the menu reaches; only action an email link 5,360 px down; nothing leads to Booking.com | H, W, E | A intro ("The menu reaches four pages"); A F1 (`clicks_to_book` null; `pages_crawled` 8 counts crawl URLs, not menu pages) |
| 9 | Phone plain text 5,410 px down the home page and on the contact page; tap does nothing; no call or WhatsApp link on any page | H, E | A F4 (0 tel:, 0 WhatsApp on 8 pages); `before-phone-390.jpg` (= `walk/01-home-phone-text.png`) |
| 10 | Prices only on /our-services/ and /surf-camp-packages-sri-lanka/, not linked from the menu; table in a closed "Prices" accordion | H, W, E | A F2; `before-prices-390.jpg` (= `walk/04-packages-price-table.png`) |
| 11 | Banner: rooms "aren't bookable right now"; Booking.com sells them, 45 reviews of stays Sept 2025 – Sept 2026 | H, W, E | A F3; D `status_flag`, `reviews.booking.note`; `before-banner-390.jpg` (= `walk/01-home-renovation-banner.png`) |
| 12 | Home page 470 px wide on a 390 px phone; email and price table cut off | H | A F8; D `existing_site.mobile.layout_width_px` 470; visible in `before-phone-390.jpg`, `before-prices-390.jpg` |
| 13 | Contact page shows "[contact-form-7 id="117"]", booking page "[ninja_form id="2"]" | H | A F5; `before-contact-390.jpg` (crop y 520–960 of `walk/02-contact-shortcode.png`) |
| 14 | "Reservation Enquiry!!" shows a line of code instead of the Booking.com button | H | A F6; D `booking.site_reservation_enquiry`; `before-enquiry-390.jpg` (crop y 1380–1688 of `walk/03-our-services-reservation-enquiry.png`) |
| 15 | No rating or review on the site | H | A F10 |
| 16 | Preview first screen: drone loop of the coast and a surfer; name, "Surf Camp \| Midigama, Sri Lanka", "Come as a stranger, leave as a friend.", "Check dates on Booking.com" | H | S3 screenshots `mobile-00`/`desktop-00`; DIST h1 and hero; `after-390-top.jpg`, `after-390-drone.jpg`, `after-1440-drone.jpg` |
| 17 | Drone shots are from Lorenzo Marzocca's 2018 promo film for Cheeky Monkey, on his YouTube channel; credited at the foot of the preview; licence unknown; preview-only use; otherwise the hero switches to their own photos before go-live; original footage would be sharper | H, W, E | D `videos[]` vid-001 (`found_on` "YouTube channel Lorenzo Marzocca … uploaded 2018-02-06 … Promotional video for Cheeky Monkey Guesthouse", `license` unknown); DIST footer credit link; LP + FN conflicts 6 (waiver scope, fallback to business-owned media); FN conflicts 8 (raw footage lifts quality) |
| 18 | "Book" in the header + "Check dates on Booking.com": 1 tap to their Booking.com listing | H, W, E | FJ (`clicks_to_book` 1, primary/hero engine, CTA above the fold); S3 d3 (tapped URL = `booking.engine_url`) |
| 19 | After the first scroll the button stays in a bar at the bottom of the phone | H | X3 table ("After the first scroll the phone bar holds 'Check dates on Booking.com' and 'Plan a stay'"); `after-390-weeks.jpg` |
| 20 | Call button in the header on every screen; "Call to book" beside surf weeks and lessons | H, W, E | S3 d3 (every `tel:` = +94719248686); S3 `mobile-01–21` (header persists); DIST "Call to book", "Call to book a lesson" in `#counter` |
| 21 | Four surf weeks priced per person for 7 nights by room (Full Surf Lesson Package USD 300–400: private 400, shared double 300, shared triple 300) | H, W, E | FN facts (`priceList[0–11]` = D `offers[0–11]`, `packages[]`); `after-390-weeks.jpg` |
| 22 | Lessons USD 20 per person for 90 minutes | H, E | D `lessons[]`; FN facts; DIST |
| 23 | Every price marked published in 2021, "call to confirm" | H, E | S3 d1 ("Published 2021" beside the prices); DIST; D `gaps` offers |
| 24 | Five Booking.com room types with photos, beds, views; each to live dates on Booking.com | H, W, E | FN facts (`rooms[]` = D `room_types[]`); DIST (5 room h3s, "Check dates on Booking.com" per room) |
| 25 | 11 guest reviews quoted word for word, with names and source; both ratings with count and date | H, W, E | S3 d1 (11/11 verbatim, script-checked); `after-390-guests.jpg` |
| 26 | Fits a 390 px screen; every button and link ≥ 44 px | H | S3 d2 (`scrollWidth` = `clientWidth` at 390), d6 (0 of 84 tap targets < 44 px) |
| 27 | Slowed phone test 4 Nov 2026: 691 KB, 0 outside requests, main content in about half a second; video after; reduced motion keeps the still | H | S3 d2 (708,018 B, LCP 508 ms, `third_party_hosts` []), d6 / X3 §3 (reduced motion: 0 video, poster only) |
| 28 | Booking links work with JavaScript off | H | S3 d3 (JS off at 390 and 1440: first booking link is the engine, `#book` visible with 12 links) |
| 29 | Email links open with the subject filled in, e.g. "Cheeky Monkey: Full Surf Lesson Package week" | H | DIST `mailto:…?subject=Cheeky%20Monkey%3A%20Full%20Surf%20Lesson%20Package%20week` |
| 30 | "Plan a stay": a room, a surf week, a lesson or a board; room → Booking.com; surf week → price for the chosen room → "Call about this week" or an email naming package and room | H, E | X3 round-1 §4 booking walk (Yoga and Surf → Shared double → USD 280 → call / email subject "Cheeky Monkey: Yoga and Surf Lesson Package, shared double room"); FN checks "Booking end to end"; `after-390-plan.jpg` |
| 31 | Their Instagram reel of new boards on the rack (7 Oct 2026) in a surfboard shape under "Catch waves, not worries" | H | D `videos[]` vid-009 (business-owned, posted 7 Oct 2026); FN images; S3 screenshots `mobile-01–02` |
| 32 | Sections "Down at the water", "Baba's Surf Shop" (400 boards, brands), "Up on the roof", "Three rooms in 2009" | H, E | DIST headings; D `rentals[0]` (400 boards), `brands[]`, `business.since` (late 2009) |
| 33 | Check-in/out times and house rules from Booking.com; "Getting here" distances from Booking.com | H | D `stay_info` (Booking.com); FN facts (350 m, 800 m, 2 km, 3.3 km, 10 km = D `location`, Booking.com distances) |
| 34 | No chat widget, pop-up or tracker | H | S3 d7 (0 third-party on load and over a scroll; 0 iframes) |
| 35 | Every fact checked against sources: 0 mismatches | H | S3 d1 ("0 mismatches, 0 unsourced claims") |
| 36 | Google listing shows Call but no website; "Add website" under "Add missing information"; same for the Baba's Surf Shop listing | H | A F13, `recommended.off_site[0]`; `before-google.jpg` (crop x 72–488, y 88–578 of `walk/13-google-listing-desktop-add-website.png`; no other business shown) |
| 37 | Instagram bio "OPEN … Rooms"; Facebook "Always open" in details and "closed for low season" in its intro; site says rooms not bookable | H | A F14, `recommended.off_site[1]`; D `status_flag`, `facebook_hours`, `contact.instagram_profile.bio` |
| 38 | No login today; with managed/self-hosted: own login, Cheeky-Monkey-only admin, fields not code, Publish rebuilds | H, E | L (no tenant/login); P §1 (tenant-scoped login, publish flow) |
| 39 | Editable list (Basics, Text, Prices incl. transfers, Lessons, Photos & video incl. hero video + still and shop reel, Rooms & stay, Shop, Surf, Reviews, Contact & booking) | H, E | FN "editable (owner, after a CMS sale)" |
| 40 | Upload from a phone; the site makes the sizes | H | playbook §9; FN build (`scripts/photos.mjs`, video renditions from the build) |
| 41 | Reviews: owner removes, we add | H | `cms/app/src/collections/Sites.ts` l.72 `evidenceRowsDeleteOnly(['ratings', 'testimonials'])` |
| 42 | No field yet: package names and inclusions, lesson price year, room slides 2–6, hero credit, socials, place line, drawer's board step | H | FN "Not owner-editable today" + schema gaps 1–11 |
| 43 | Offer: managed (recommended; monthly fee agreed; hosting, updates, backups ours); self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, updates/backups theirs); files only (no editor, changes need a developer). Nothing set up yet | H, E | writer base.md hard constraint 2; P §1 hosting modes; run file `hosting.default_mode: managed`. No fee amounts exist (market.md: none until Shahar decides) |
| 44 | They already have cheekymonkeymidigama.com; we connect it once they choose | H | D `contact.socials.website`; base.md hard constraint 3 |
| 45 | Open status: site/Facebook/Booking.com/Instagram disagree; preview says nothing | H | D `status_flag`, `gaps` business status; FN gaps ("Open status is unclear, so the page says nothing about it") |
| 46 | All preview prices from 2021 pages; B&B rates left out because two pages give USD 20 and 22$ for the same double | H | D `gaps` offers, offers (B&B double room rate); notes/cheeky-monkey.md (copy left out the 20-vs-22 double) |
| 47 | 400 boards to rent, no rental price or deposit found | H | D `rentals[0]`, `rentals_note`, gap rentals prices |
| 48 | WhatsApp: add a button if +94 71 924 8686 is on WhatsApp | H | D `contact.whatsapp` (null, gap: "may be on WhatsApp, unconfirmed") |
| 49 | Owner name: preview "Baba" only; 2021 press names Pasindu Delgodage; About page the Dodangoda family | H | D `contradictions` owner / family name ("the site uses only 'Baba' until the owner confirms") |
| 50 | Shop hours: Instagram 7am–6pm; Google Monday 8 am–7 pm; preview shows none | H | D `contradictions` shop hours; FN gaps ("No shop hours") |
| 51 | AI assistants: keep, or block the training crawlers | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 52 | Not found: names of the breaks, instructors, a video of their own | H | D `gaps` location.spot, instructors / team, videos (usable hero) |
| 53 | Proposal page URL https://cheeky-monkey-surf-camp-proposal.os1.workers.dev | W, E | `wrangler deploy` 2026-11-04, version da1915a6-3c9a-4ae8-8a4b-c6c2517576ac; verified below |
| 54 | Screenshot dates: old site and Google listing 26 Oct 2026 (ours); preview 4 Nov 2026 | H | A (`audited_at` 2026-10-26, walk at 390×844); `make-pitch-media.sh` run 2026-11-04 |

**54 claims, 54 sourced, 0 unsourced.**

Not claimed on purpose: that the business is open now, or which parts (D `status_flag`, unresolved); that +94 71 924 8686 is on WhatsApp; the old site's weight (3.07 MB) or LCP (A F11: single headless run, not a pitch point), so no "faster" comparison; "more bookings"; the Tripadvisor rating (not on the preview, not verified on Tripadvisor); that Booking.com receives the guest's dates (S3 d3: documented gap); the PayHere buttons (A F7, not a pitch point); that the owner can edit the open-status line (FN schema gap 3: no field yet); any fee amount.

## Images

All made by `make-pitch-media.sh` (`# media:` headers). Git-ignored by the repo's `*.[jJ][pP][gG]` rule, as in the precedent. **`media/cheeky-monkey.tsv` still needs these 13 files added** (outside this agent's lane). Before (7): JPEGs and crops of the auditor's 2026-10-26 captures in `dossier/cheeky-monkey/funnel/` (crops done in Chromium; Pillow is not installed). After (6): the live preview, 390×844 @2x (reduced motion: first screen, surf weeks, guests, Plan a stay; motion on: one drone frame) and 1440×900 (motion on: one drone frame, ~2.5 s into the loop). The drone frames show vid-001 footage, which is used under the preview-only waiver (LP); the page's footer says where it comes from.

## Checks before handoff (2026-11-04)

- Preview https://cheeky-monkey-surf-camp.os1.workers.dev/ → 200; live index.html byte-identical to DIST (L: all 71 files on 2026-11-04).
- Old-site screenshots present: 7 (`before-*.jpg`).
- WhatsApp message **576 characters** (≤ 600), English, with the preview link, the proposal link and the footage question. Email present (2,597 characters), with both links, the footage question and the offer.
- `index.html` static check: `python3 -m http.server` on 127.0.0.1, full wheel scroll in Playwright at 390×844, 1440×900 and 360×640: 14 requests each (page + 13 images), **0 external**, 0 console errors, 0 broken images, 0 px horizontal overflow. Inline CSS, system fonts, no scripts.
- Cloudflare: no `~/.oneshot/cf-token`; `npx wrangler whoami` (OAuth, wrangler 4.157.0) lists one account only, e42421b29f42b84081a1e9be362397eb. Deployed with `CLOUDFLARE_ACCOUNT_ID=e42421b29f42b84081a1e9be362397eb npx wrangler deploy`.
- Proposal page live: `https://cheeky-monkey-surf-camp-proposal.os1.workers.dev`, Worker `cheeky-monkey-surf-camp-proposal`, version da1915a6-3c9a-4ae8-8a4b-c6c2517576ac. `index.html`, `robots.txt` and all 13 JPEGs → 200 and `cmp`-identical to this folder (index sha256 3962c6b7ed06f71f…); `<meta name="robots" content="noindex, nofollow">` present; robots `Disallow: /`. `.assetsignore` keeps notes, messages, recipe and config off the Worker (each → 404).

## For the human before sending

- **The footage question is the condition of the waiver** (LP): the owner must confirm the vid-001 rights, or the hero switches to business-owned media before go-live. It is in the page (first-screen section and confirm list item 1), the email and the WhatsApp text.
- **WhatsApp is unconfirmed** for +94 71 924 8686. If it is not on WhatsApp, send the WhatsApp text as an Instagram DM to @cheekymonkeysrilanka, or send only the email.
- **Open status.** Facebook says Midigama is closed for low season with the team in Arugam Bay; the timing of the message may matter.
- **No fee amounts anywhere.**
- **Shared phone and owner** with Surf Swell Hostel (notes/cheeky-monkey.md): the same number receives both businesses' pitches if both are sent.
- The pitch names no other business; the Google crop leaves out the "Similar hotels nearby" panel.

Revised 2026-11-09 after the fix round and verification 2: five after-*.jpg re-shot from the live preview by make-pitch-media.sh (after-390-plan and before-*.jpg unchanged); three alt texts updated to the new shots (the pause button on both drone shots; the surf-weeks card shows its range, not the per-room rows); the sources line now includes the forecast, which verification 2's facts check covered (0 mismatches).
