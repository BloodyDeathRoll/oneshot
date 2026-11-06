# Pitch notes: panta-rei-resort (run 2026-11-lk-surf-01, writer 0.5.1, 2026-11-06)

Channel: the business publishes WhatsApp +94 72 800 3022 (`contact.whatsapp`, the site's own WhatsApp button, same number as Google's phone). So there is **one message**, `message.en.whatsapp.md` (547 characters, English). No email version: which inbox the owner reads is itself an open question (audit F3; `contact.email` vs `email_alt`), so email is the human's fallback, not a channel we wrote for. Run `mode: test`: nothing sent (gate c). Method follows `sites/lotus-surf-house/pitch/` and `sites/coconut-surf-inn-guest-house-and-restaurant/pitch/` (same operator); every word and claim here is Panta Rei's own.

Short names: D = `dossier/panta-rei-resort/dossier.json`; A = `dossier/panta-rei-resort/audit.json` (F1–F11; `audit.md`); W = `dossier/panta-rei-resort/funnel/walk.json` + `walk/`; S1/S2 = `reports/2026-11-lk-surf-01/panta-rei-resort.md` "Full r1" / "Full r2" (critic 0.4.3); X = `reports/2026-11-lk-surf-01/panta-rei-resort.experience.md`; FJ = `reports/2026-11-lk-surf-01/funnel/panta-rei-resort-r2-critic/funnel.json`; FN = `sites/panta-rei-resort/final/notes.md`; AI = `sites/panta-rei-resort/aiseo-report.md`; NB = `notes/panta-rei-resort.md`; DIST = `sites/panta-rei-resort/final/dist/index.html` (= the deployed preview: fetched 2026-11-06, `cmp`-identical); L = the `passed → previewed` ledger line (version 4b5dc11e); P = `PLAN.md`; CMS = `cms/app/src/collections/Sites.ts`. H = index.html, M = the WhatsApp message.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | Booking.com 9.2/10 from 468 reviews | H, M | D `reviews.booking` {9.2, 468, fetched 2026-11-06T09:55:37Z} |
| 2 | Google 4.7/5 from 213 reviews | H, M | D `reviews.google` {4.7, 213, fetched 2026-11-06T09:55:37Z} |
| 3 | The website shows no rating (one unsourced testimonial on Restaurant) | H | A F5; D `existing_site.notes` |
| 4 | The booking page shows 4.8 Google, 9.1 Booking.com, 4.5 Tripadvisor | H | A F5, F11; D `reviews.self_reported_on_engine`; `before-engine-ratings.jpg` (live capture of the engine, 6 Nov 2026) |
| 5 | Preview: both scores with count and "captured 6 Nov 2026"; 6 guest reviews verbatim with name and source; Booking.com score in the booking panel | H, M | DIST (guests section, drawer `.trust`); S2 facts (6/6 quotes verbatim); `after-390-guests.jpg`, `after-390-drawer.jpg` |
| 6 | Preview built from their aerial film, photos, booking-page room details and guests' words; all photos and film their own | H, M | D `videos[]` (all `business-owned`), `images_note`; FN; S1 facts table; `room_types[]` sources = engine listings |
| 7 | Preview URL https://panta-rei-resort.os1.workers.dev | H, M | L note; fetched 2026-11-06 → 200, `cmp`-identical to DIST |
| 8 | Private: search engines told not to list it; current site, booking page, listings unchanged | H | L (noindex,nofollow; robots `Disallow: /`; /sitemap.xml 404); only the preview Worker exists |
| 9 | Old first screen: "CHECK AVAILABILITY", "Best price when booking direct", WhatsApp/Instagram icons; 1 tap to the booking page | H | A `measured` (clicks_to_book 1, cta_above_fold true), F4; `before-390-home.jpg` (= W `01-home-fold.png`), `before-1440-home.jpg` (= `reports/…/current-site/shots/desktop-00.png`) |
| 10 | Preview first screen: aerial film of the red roofs and pool, "Panta Rei, Kabalana", one "Check dates" to the booking page; poster stays on slow connections / reduced motion | H | S2 (`mobile-00`, funnel primary engine, hero_action engine); FJ; playbook §1a; S1 a11y "reduced motion: 0 video requests"; `after-390-top.jpg`, `after-1440-top.jpg` |
| 11 | Taps: 1 before, 1 after; 2 to the chosen room's page with dates filled in | H | A `measured.clicks_to_book` 1; FJ `clicks_to_book` 1; S2 tap-through (hero → drawer → Suite + dates → `…/listings/572798?start=…&end=…&numberOfGuests=2`) |
| 12 | All four old room cards open with "Situated in Ahangama Central, 300 metres from Kabalana Beach…", Booking.com's sentence | H | A F2; D `existing_site.notes` (2); `before-rooms.jpg` (live capture of /ourrooms, 1440 @2x, 6 Nov 2026, four title+first-lines crops) |
| 13 | Room titles Double Deluxe, Suite Triple, Family Villa, Luxury Private Villa | H | D `room_types[].value.site_label`; `before-rooms.jpg` |
| 14 | What differs (22–50 m², king or twin, sofa bed, outdoor bath, private pool) only on the booking page | H | A F2; D `room_types[]` (engine sources) |
| 15 | Preview: own card per room with size and sleeps; drawer with beds, note, photos and one button to that room's engine page | H, M | DIST cards + drawer; FN editable (`rooms[]`, `roomGalleries`); `after-390-rooms.jpg`, `after-1440-drawer.jpg` (Family Villa: "Two king-size beds or four single beds", "50 m², two bedrooms, garden view and a private balcony. Private bathroom plus an outdoor bath." = D `room_types[2]`) |
| 16 | No room price before the booking page; it says "Add dates for prices" | H | A F1; D `offers_note`, gaps `offers / room prices` (pitch_point); `before-engine-price.jpg` (crop y 1190–1992 of W `03-engine-suite.png`) |
| 17 | Rates change with dates, so the preview shows no fixed room price; guest picks room, dates, guests; lands on that room's engine page with dates filled; JS off → plain room links | H, M | DIST ("Prices move with the dates…", drawer form, `#dr-go`); S2 tap-through + JS-off line; X (engine accepts `start/end/numberOfGuests`) |
| 18 | hello@pantareiresort.com shown; Contact/footer link → pantareiresort@gmail.com; Activities footer → info@mysite.com (template placeholder) | H | A F3; W `06-events-email` / `07-contact-email` mailto pairs; D `contradictions` email; `before-email.jpg` (crop y 1290–1510 of W `06-events-email.png`) |
| 19 | Preview shows one address and links to it | H | DIST (1 × `mailto:hello@pantareiresort.com`, 0 others) |
| 20 | Old first load ~15.7 MB in 6 s incl. the background film, 9 outside hosts incl. error tracking and visitor analytics; unthrottled | H | D `existing_site.first_load` (15,740,750 B mobile; hosts sentry-cdn, visitor-analytics.io…; note "6 s after load… bytes include the background video"); A F8 |
| 21 | Preview: 653 KB first load, film 1.5 MB on a phone after the page shows, 0 outside servers, main picture in about 2 s on a slowed phone | H | S2 budget (652,667 B; `p1080.webm` 1.50 MB; third-party 0; LCP 1,984–2,020 ms throttled 1.6 Mbps/150 ms/4× CPU) |
| 22 | Photos sized per screen; no trackers or pop-ups | H | FN (`<img srcset>` from the photo manifest); S2 delivery (0 off-site requests) |
| 23 | Massage ("Full recovery after active surfing"), fitness class prices, pool day pass only inside PDFs | H | A F6; D gaps `menu on the web` (pitch_point); D Surf Therapy Massage text |
| 24 | Preview: massage with 60/45-minute prices, Vinyasa 8:30 daily except Friday with three class prices, pool day pass, restaurant dishes and hours as text | H | DIST (After the surf, Panta Fitness Club, The pool, Restaurant); S2 JSON-LD 8 offers = D `offers[0–7]`; `after-390-massage.jpg` |
| 25 | Facebook: +94 74 209 5135 and pantareiresort@gmail.com vs +94 72 800 3022 / hello@ on site and Google | H | A F10, `recommended.off_site[0]`; D `contact.phone_emergency`, `email_alt` |
| 26 | Engine logo links to "pantareiresort.holidayfuture." (no ending), no way back; rating line could be refreshed | H | A F11, `recommended.off_site[1]`; W `02-engine-home` `logo_href` |
| 27 | Engine clears dates silently when the room can't take them (owner note) | H | X round 2 ("the engine silently clears dates the room can't take"); S1 tap-through ("for the owner"); NB |
| 28 | No editor, login or address yet; with a CMS product: own login scoped to Panta Rei, fields not code, Publish → live in about a minute | H | L (no CMS/tenant/domain); P §1 (tenant-scoped login, publish flow ~1 minute); base.md constraint 2a |
| 29 | Editable list (rooms, prices, texts, hours/stay/house rules/Good to know, photos + first-screen film from a phone, contact/booking/socials, ratings & reviews) | H | FN "editable"; playbook §9 (upload from phone, site makes sizes) |
| 30 | Reviews: owner removes, we add | H | CMS l.72 `evidenceRowsDeleteOnly(['ratings','testimonials'])` |
| 31 | Not editable yet: hero title + logo, room galleries, dish lists, class week, distances | H | FN "schema gaps" (`heroTitle`, `logo`, `roomGalleries`, `menuTabs`, `classWeek`, `distances`) |
| 32 | Offer: managed (recommended; monthly fee; hosting, updates, backups ours; own login); own server (one-time fee; we install, verify, hand over, revoke access; ~$6–12/month to their host; updates/backups theirs); files only (no editor; changes need a developer; any host incl. the current one). Nothing set up; fee agreed after they choose | H | base.md constraint 2; P §1 hosting modes; run file `hosting.default_mode: managed`; market.md (no amount until Shahar decides). The $6–12 is the third-party host's cost stated in base.md/PLAN, not a fee of ours |
| 33 | Connect pantareiresort.com once they have chosen | H | base.md constraint 3 (owner already has a domain); D `existing_site.url` |
| 34 | Beach distance 300 m (own site) vs 600 m (Booking.com); preview "a short walk" | H | D `contradictions[0]`; DIST ("Kabalana Beach is a short walk away") |
| 35 | Breakfast 8:30–12:00 (site) vs 8:30–11:30 (guest booklet); preview 8:30–12:00 | H | D `contradictions[2]`; DIST |
| 36 | Check-out 11:00 (engine) vs 11:30 (Google); preview 11:00 | H | D `contradictions[1]`; DIST |
| 37 | Triple Room beds: engine king + sofa bed vs Booking.com other beds; preview follows the engine | H | D `contradictions[4]`, `room_types[1]` |
| 38 | Couldn't find: team names, restaurant's closed months, surfer offering | H | D gaps `team / people`, `season`, `surf offering` (all pitch_point) |
| 39 | AI assistants allowed on the real domain, owner may refuse | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 40 | "Four rooms", "the four rooms" | H, M | D `room_types[]` (4 types) |
| 41 | Proposal URL https://panta-rei-resort-proposal.os1.workers.dev | M | `wrangler deploy` 2026-11-06, version 4b75d552-2f47-4b70-9081-b6da615b26f6; verified below |
| 42 | Screenshot dates: today's pages 6 Nov 2026 (auditor walk 2026-11-06T10:10Z; live captures by `make-pitch-media.sh` 2026-11-06), preview 6 Nov 2026 | H | W `at`; recipe run |

**42 claims, 42 sourced, 0 unsourced.**

Not claimed on purpose:
- **F9 (the guest booklet behind the footer link "room", which publishes the guest Wi-Fi password):** left out of the page **and** the message. The page is public to anyone with the link, and even "the footer link opens the guest booklet" points a stranger at the password; a teaser line in a cold message ("something I'd rather mention privately") reads like a hook. The human should tell the owner privately, once a conversation exists (or as a courtesy whatever the outcome): "the footer link 'room' opens your in-house guest booklet, which includes the guest Wi-Fi password; you may want to take it off the public site." Source: A F9 notes, `recommended.off_site[2]`.
- Any room rate, or the engine's "$615 · For 3 nights" (S2): not ours to quote, and changes with dates. The OTA price in D `offers_note` (₪339) likewise.
- Any fee amount for our products (market.md).
- "faster", "more bookings", conversion: none measured (A `not_measurable`). Taps to book are equal (1 vs 1) and the page says so.
- F4 (first screen doesn't say what/where): the preview's first screen is "Panta Rei, Kabalana", also without the business type (S2 dim 4), so it is not sold as a fix.
- F7 (stock "Things to Do" block): not a pitch point.
- The Booking.com "Free WiFi 7" subscore, Tripadvisor 4.5 (unverified, 403), the +7 massage WhatsApp number.
- No other business is named; the only third parties named are Booking.com, Google, Facebook and (as a generic "booking-page provider") the engine.

## Images

All made by `make-pitch-media.sh` (`# media:` headers); git-ignored by the repo's `*.[jJ][pP][gG]` rule. **`media/panta-rei-resort.tsv` still needs these 13 files added** (outside this agent's lane). Before (6): four crops/scales of local captures (auditor walk 2026-11-06, critic current-site shot) and two live captures (`/ourrooms` at 1440 @2x; the engine's rating block at 390 @2x), re-made on every run. After (7): the live preview, 390×844 @2x reduced motion (top, room cards, guests, massage, the booking panel with the Suite + 3–6 Mar 2027 + 2 guests) and 1440×900 (top, Family Villa drawer). No tap past the preview into the engine.

## Checks before handoff (2026-11-06)

- Preview https://panta-rei-resort.os1.workers.dev/ → 200, `noindex, nofollow`; live index.html `cmp`-identical to DIST.
- Old-site screenshots present: 6 `before-*.jpg`.
- Message: 547 characters (≤ 600), English, carries the preview link and the proposal link.
- Static check of `index.html` (local http server, Playwright wheel-scroll at 390×844, 1440×900, 360×640): 14 requests each (page + 13 images), **0 external**, 0 console errors, 0 broken images, 0 px horizontal overflow, every `<img>` width/height = the file's. Inline CSS, system fonts, no scripts.
- Cloudflare: no `~/.oneshot/cf-token`; deployed with wrangler's OAuth login and `CLOUDFLARE_ACCOUNT_ID=e42421b29f42b84081a1e9be362397eb npx wrangler deploy` (the Oneshot account), as for lotus-surf-house.
- Proposal live: `https://panta-rei-resort-proposal.os1.workers.dev`, Worker `panta-rei-resort-proposal`, version **4b75d552-2f47-4b70-9081-b6da615b26f6**. `index.html`, `robots.txt` and all 13 JPEGs → 200 and `cmp`-identical to this folder (15/15; index sha256 ab48cf5fac6213f8…); `<meta name="robots" content="noindex, nofollow">` present; robots `Disallow: /`. `.assetsignore` keeps notes, message, recipe and config off the Worker (each → 404).

## For the human before sending

- **Channel:** WhatsApp +94 72 800 3022 (the site's own WhatsApp button). Not the Facebook number +94 74 209 5135 (the guest booklet's emergency line).
- **F9 privately** (above): not in the page or the message.
- **No fee amounts anywhere.** The only number in the offer is the ~$6–12/month a VPS host would charge the owner for the self-hosted option (base.md constraint 2).
- The owner may notice on the preview the polish items the critics left open (S2/X: closing line length on a phone, drawer text cut, the "if your dates clear" line not added). None shows in the pitch's screenshots.
- No owner name is published (D `business.owners`), hence "Hello Panta Rei team".
