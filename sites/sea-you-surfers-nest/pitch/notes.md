# Pitch notes: sea-you-surfers-nest (run 2026-10-midigama-01, writer 0.5.1, 2026-11-25)

## Channel

The business publishes **no text contact at all**: no website, no email (`contact.email` null), no WhatsApp (`contact.whatsapp` null), no Instagram or Facebook found (`contact.socials`), and the Google listing is unclaimed with "Add place's phone number" (A F2). What it does publish:

1. **A phone number painted on its own street sign**, "+94 715880052", in photo 1 of its own Booking.com (1/45) and Agoda (1/44) galleries and on Airbnb listing 1 (D `contact.phone`, confidence medium-high, `gaps[0]` `human_decision: true`; A F3; `before-booking-sign.jpg`). A Sri Lankan mobile (071). The business put it on the sign for the public, so it is a channel the business itself publishes, but it was **read off a photo, never seen as text, and is UNCONFIRMED**.
2. **Platform messaging**: Airbnb "Message host" to Ashly (Superhost, "Responds within a few hours", response rate 70%: D `contact.airbnb_messaging`, `business.host_stats`) and Booking.com "Ask a question". Both need a guest account (A F1: "Log in or sign up", Booking.com sign-in), both are built for guests asking about a stay, and both routinely hold back links and contact details in messages before a booking (the Booking.com listing itself says "Once you book, we'll provide details so you can contact the property directly"). A sales message sent as a fake guest inquiry would also be the wrong first impression.

**Choice: one message, `message.en.whatsapp.md`, to the sign number +94715880052 on WhatsApp; if that number has no WhatsApp account, the same text as an SMS.** The message itself asks Ashly to confirm the number ("We read this number off your sign. Is it the right one to reach you?"). **No Airbnb or Booking.com version was written**: platform messaging is the fallback only if the sign number turns out wrong or dead, and that is a human decision (see "For the human before sending"). No email version: there is no address. Language: English (base.md rule 5, `markets/lk`). Run `mode: test`: nothing was sent, nobody was contacted.

## Short names

D = `dossier/sea-you-surfers-nest/dossier.json`; A = `dossier/sea-you-surfers-nest/audit.json` (findings F1–F9; `audit.md`); W = `dossier/sea-you-surfers-nest/funnel/walk.json` + `dossier/sea-you-surfers-nest/assets/walk/` (walked 2026-11-21); S = `reports/2026-10-midigama-01/sea-you-surfers-nest.md` "Round 1 — full (station 5)" (critic 0.4.3); X = `reports/2026-10-midigama-01/sea-you-surfers-nest.experience.md` "Station 5 — round 1"; V = `reports/2026-10-midigama-01/sea-you-surfers-nest.visual.md` "Station 5 — round 1"; FN = `sites/sea-you-surfers-nest/final/notes.md`; AI = `sites/sea-you-surfers-nest/aiseo-report.md`; DIST = `sites/sea-you-surfers-nest/final/dist/index.html` (= the deployed preview: fetched 2026-11-25, 200, `cmp`-identical); L = the `passed → previewed` ledger line (2026-11-25T12:36:02Z, version e1549c19-e3e3-438d-9bc0-e42ce5bc021a, commit 78c4211); P = `PLAN.md`. H = index.html, M = the WhatsApp/SMS message.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | Google 4.9/5 from 11 reviews, read 21 Nov 2026 | H, M | D `reviews.google` {4.9, 11, fetched_at 2026-11-21T22:56:15Z} |
| 2 | Airbnb 5.0/5 from 10 reviews | H, M | D `reviews.airbnb_1` {5.0, 10, 2026-11-21T23:05:23Z} |
| 3 | Booking.com 8.0/10 from 8 reviews | H | D `reviews.booking` {8.0, 8, 2026-11-21T22:57:19Z} |
| 4 | Booking.com sub-scores: location 10, staff 9.3 | H | D `reviews.booking.subscores` |
| 5 | No website of its own; found on Google Maps, Booking.com, Agoda or Airbnb | H, M | D `existing_site` (url null + notes); A scope `no_site`; audit.md "the path a traveller takes today" |
| 6 | None of the listings lets a guest ask before signing in or booking: Booking.com "Contacting the property" sentence and "Ask a question" → sign-in; Airbnb "Message host" → "Log in or sign up"; Agoda no phone/WhatsApp/email | H, M | A F1 (W 03–06: tel_links [], whatsapp 0, mailto 0); `before-booking-contact.jpg` (crop y 0–262 of `walk/03-booking-com-contacting.png`), `before-booking-signin.jpg` (y 0–620 of `walk/03-booking-com-ask-tapped.png`), `before-airbnb-login.jpg` (y 24–624 of `walk/05-airbnb-1-message-host-tapped.png`) |
| 7 | Rooms sold on Booking.com, Agoda and two Airbnb listings | H | D `booking.path` note, `booking.other_engines`; A F1 |
| 8 | Built from their Booking.com and Airbnb photos and listings, Google listing and guests' reviews | H | FN facts table and images (24 photos, all `business-owned` Booking.com / Airbnb uploads); S d1 facts table |
| 9 | Preview URL https://sea-you-surfers-nest.os1.workers.dev/ | H, M | L note; fetched 2026-11-25 → 200, `cmp`-identical to DIST |
| 10 | Private preview; search engines told not to list it; listings unchanged | H | L (noindex, robots `Disallow: /` + 15 AI bots, sitemaps 404); only the preview Worker exists |
| 11 | Today's Booking.com first screen: bar and search box "Kumbalgama", name with slogan, "Weliwaththa Road, Kumbalgama", 8.0 Very good · 8 reviews, the sign photo 1/45, Breakfast Asian, Free private parking, "Choose dates to see prices" | H | `before-booking-fold.jpg` (= `walk/03-booking-com-fold.png`, whole); V "Current presence: three-second test" |
| 12 | Preview first screen: palms over the balcony table, name, "Midigama, Sri Lanka" (phone) / "Bed and breakfast \| Midigama, Sri Lanka" (laptop), "See live dates"; then the tagline and "Hello to waves in a minute walk," says the house's own listing | H | DIST hero/glance; X "First screen"; V "Three-second test"; `after-390-top.jpg`, `after-1440-top.jpg` |
| 13 | On a capable screen the fronds sway; still under reduced motion / weak devices | H | FN (`palms.js`, weak-device rule, reduced motion); V ("The fronds sway on a real browser"); X (reduced motion: canvas `display:none`) |
| 14 | Seven rooms section, A/C sentence | H | DIST `#rooms`; S d1 (A/C sentence appears once); `after-1440-rooms.jpg`, `after-390-rooms.jpg` |
| 15 | Google listing says "Add website" and "Add place's phone number"; "Claim this business"; unclaimed | H | A F2; D `business.google_listing_claimed` false; `before-google-website.jpg` (crop x 80–488, y 190–520 of `walk/02-google-listing-desktop-add-website.png`: no map, no Google price list) |
| 16 | Four names and four places: Midigama (Google), Kumbalgama (Booking.com), Mirissa (Agoda), Matara (Airbnb) | H | A F7; D `business.other_names`, `location.address_other` |
| 17 | Preview: one name, Google address 151 Weliwaththa Rd, Midigama 80650, and the Kumbalgama/Matara sentence | H | DIST "Finding the house"; D `location.address` (Google, playbook §6) |
| 18 | Google "Check availability" compares Agoda and Booking.com; on a phone Directions, Start, Save, no Call | H | A F2 (W 02-google-listing-desktop `offer_links`); `before-google-phone.jpg` (crop y 1150–1688 of `walk/01-google-listing-fold.png`; the map with other places' names is cut off) |
| 19 | Airbnb: rooms and whole house are two separate listings | H | D `booking.other_engines`; A F8 |
| 20 | "See live dates" on the first screen: 1 tap to the Booking.com listing; bar at the bottom of the phone from screen 2 | H | S d3 (`clicks_to_book` 1, tapped URL = `booking.engine_url`); X ("Taps to booking 1", "The phone bar shows from screen 2 to the end") |
| 21 | "Who's coming?": two people → Booking.com or a room on Airbnb; a group → the whole house on Airbnb; "A question first" → "Ask Ashly on Airbnb" | H | X states.log ("the group answer is the whole house on Airbnb, and the question answer is 'Ask Ashly on Airbnb'"); DIST `#w1-two`, `#w1-group`, `#w1-ask`; `after-390-ask.jpg` |
| 22 | Booking.com and Agoda: "family rooms with air-conditioning, private entrances, and balconies"; Booking.com writes that summary, not the owner | H, M | A F4; D `business.description_booking` (author: Booking.com generated); `before-booking-summary.jpg` (crop y 735–1020 of `walk/03-booking-com-summary.png`; the map above it is cut off) |
| 23 | Owner's Airbnb note: "We have one A/C room & Six Non A/C rooms" … "Pls inquire for per room rate"; inquiring needs a login | H, M | D `business.description_rooms_note`; A F4, F5; `before-airbnb-note.jpg` (stack of `walk/05-airbnb-1-inquire-open.png` y 115–205 and y 632–780: heading and the note only) |
| 24 | Whole-house Airbnb listing: "14 guests · 7 bedrooms · 6 beds · 0 bathrooms", "New"; the ten 5-star reviews sit on the other listing | H | A F8; D `reviews.airbnb_2`; `before-airbnb-house.jpg` (crop y 615–940 of `walk/06-airbnb-2-summary.png`) |
| 25 | Preview: "All seven rooms are doubles … Only one has air conditioning, so ask when you book …" | H, M | DIST; S d1; D `room_count`, `contradictions` air conditioning (resolution: one A/C room) |
| 26 | Deluxe: "13 m², with its own bathroom, a private entrance, a terrace and a balcony"; Standard: "12 m², with a private entrance and a wardrobe"; each with its own photos | H | DIST `#room-deluxe`, `#room-standard`; D `room_types[0–1]`; S facts table |
| 27 | Breakfast described; no restaurant claimed | H | DIST "Breakfast"; D `contradictions` restaurant (resolution: no restaurant claim); S ("no restaurant") |
| 28 | Phone only in the sign photo, photo 1 of 45 on Booking.com and on Agoda; readable, not tappable; text on no listing walked | H | A F3 (W: `phone_715880052_in_text` false on all 8 pages); D `contact.phone.verified`; `before-booking-sign.jpg` (crop y 708–1258 of `walk/03-booking-com-fold.png`) |
| 29 | Phone left off the preview on purpose; Call button (and WhatsApp if applicable) once confirmed, at first screen, bar, end of page | H | FN (`TEL_CONFIRMED = false`, "the switch for station 8"); S "Unconfirmed phone: absent everywhere"; A F3 `fix_in_new_site`; S fix list 2 |
| 30 | "Your host is Ashly. He's a Superhost on Airbnb and usually replies there within a few hours." | H | DIST; D `business.owner`, `business.host_stats`, `booking.reply_time_hint` |
| 31 | Three ratings with count and date; five guest reviews word for word | H, M | S d1 (5/5 verbatim, 5/5 attribution; three dated ratings); DIST |
| 32 | Google review texts sit behind a sign-in | H | D `reviews.google.note`; A "Not measured" |
| 33 | Slowed-phone test 25 Nov 2026 of the site's files: 526 KB, all local, 0 outside requests, main picture ~1.4 s (LCP median 1,368 ms) | H | S d2 (526,390 B, 15 requests all local, LCP 908/1,368/1,456 ms). Measured on the built files served locally, which L shows are byte-identical to the live preview; L also records a live `site-check` LCP fail (2,532–2,928 ms) judged a measurement artifact of the tool's route (route-free live 1,072–1,224 ms). The page says "test of the site's files" for that reason |
| 34 | Fits a 390 px screen; Booking.com and Airbnb links work with JS off | H | S d2 (no overflow at 390/1440); S d3 and FN ("All four outbound links … are plain links" with JS off) |
| 35 | All 24 photos are their own Booking.com / Airbnb uploads | H | S hard fails ("all 24 photos are `business-owned` uploads"); FN images |
| 36 | Courtyard with carved fanlights, balconies over the coconut palms, carved doors and masks, surfboard shower, Breakfast, Ashly with his own words, five reviews | H | DIST sections `#house`, `#character`, `#guests`; S facts table (images img-046, 071, 003, 077, 027, 069, 036) |
| 37 | Midigama station 950 m on foot, Weligama Beach 3.4 km, by Booking.com's count; address + Maps link | H | DIST "Finding the house"; D `location.nearby` |
| 38 | House rules: check-out 06:00–10:00, children welcome, no cots/extra beds, pets on request, no parties | H | DIST; D `stay_info.check_out`, `.children`, `.pets`, `.parties` |
| 39 | No chat widget, pop-up or tracker | H | S d7 (0 third-party on load and over a scroll; 0 iframes) |
| 40 | Every fact checked: 0 mismatches | H | S d1 ("0 mismatches and 0 unsourced claims") |
| 41 | Advice: claim Google listing and add phone + site; fix Booking.com room facilities (A/C, restaurant; Agoda copies Booking.com); A/C room rate on Airbnb; whole-house bathroom count; one check-in time; one name and Midigama address everywhere | H | A `recommended.off_site[0–5]` (F2, F4, F5, F8, F9, F7) |
| 42 | No login today; with managed/self-hosted: own login, admin showing only this business, fields not code, Publish rebuilds | H | L (no tenant/login); P §1 (tenant-scoped login, publish flow) |
| 43 | Editable list (Basics incl. the tagline, Text, Photos (24, upload from a phone, the moving palms belong to the current hero photo), Rooms and stay, Amenities, Reviews, Contact and booking + phone once confirmed) | H | FN "editable (once a CMS product is sold, station 8)"; playbook §9 |
| 44 | Reviews: owner removes, we add | H | FN ("Reviews: delete a row"); as Lotus (`cms/app/src/collections/Sites.ts` `evidenceRowsDeleteOnly`) |
| 45 | No field yet: the "Bed and breakfast" line, "7 rooms, all doubles \| sleeps 14", Ashly's name, the "Who's coming?" roles, "In every room" | H | FN "schema gaps" (`typeLine`, `houseCount`, `host`, `bookingRoles`, every-room list) |
| 46 | Offer: managed (recommended; monthly fee agreed; hosting, updates, backups ours); self-hosted (one-time fee agreed, fully theirs, ~$6–12/month to their host, updates/backups theirs); files only (no editor, changes need a developer). Nothing set up yet | H | writer base.md hard constraint 2; P §1 hosting modes; run file `hosting.default_mode: managed`. No fee amounts (markets/lk/market.md: none until Shahar decides) |
| 47 | The preview runs on a temporary address; live address decided after they choose | H | base.md hard constraint 3; D `existing_site` (no domain of their own) |
| 48 | Q1 phone: +94 715880052 read off the sign; right number? WhatsApp? email? | H, M | D `contact.phone`, `gaps[0]` (human_decision), `contact.whatsapp` / `contact.email` null |
| 49 | Q2 check-in: Booking.com and Agoda 14:00–18:00; both Airbnb listings after 15:00; preview gives none | H | A F9; D `stay_info.check_in`, `contradictions` check-in (resolution none); AI "Check-in time" |
| 50 | Q3 breakfast: Asian breakfast listed; no listing says whether it is in the rate | H | D `facilities[0]` note ("Whether it is in the rate is not stated; Booking FAQ … unanswered") |
| 51 | Q4 A/C room: owner says one; Booking.com lists A/C for the Deluxe Double Room and as an additional charge; Standard has no bathroom inside per Booking.com | H | D `room_types[0].description`, `facilities` ("Air conditioning — Additional charge"), `room_types[1].bathrooms` 0, `contradictions` bathrooms, `gaps` room_types mapping |
| 52 | Q5 five amenities: free private parking, airport shuttle and laundry (extra charge), free toiletries (Booking.com); security cameras outside (Airbnb). In the structured data and llms.txt, not on the page | H | D `facilities[]`; S d4 (−1, "five of the eight `amenities[]` rows are not on the page"); AI R4 |
| 53 | Q6 restaurant: Booking.com and Agoda describe one; guests write about a shared kitchen and food cooked for them | H | D `contradictions` restaurant, `facilities` (shared kitchen: Mareike, Florentine; food: Dona); A F4 (Agoda FAQ) |
| 54 | Q7 prices only on the booking sites, changing with dates; preview shows none | H | D `offers_note`, gaps offers/prices (pitch_point); S "No prices" |
| 55 | Q8 surfing: one guest says the host arranged a board and transport; boards on a rack in the photos; preview says nothing about surf | H | D `surf.board_rental`, `.surf_transport` (Lazarine, confidence low), `surf.board_storage` gap (img-034, img-072); `location.spot` gap |
| 56 | Q9 no photo of the house front, the sea or the beach; no video | H | D gaps "images: exterior and the sea", "videos" (pitch_point); D `videos_note` |
| 57 | Q10 AI assistants: keep, or block training crawlers | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 58 | Greeting "Hello Ashly" | M | D `business.owner` (Airbnb host "Ashly"; guests name him) |
| 59 | "your seven rooms with the one A/C room said plainly, three ratings, five guest reviews, and Booking.com and Airbnb one tap away" | M | DIST (rooms, ratings, testimonials, booking links); S d1, d3 |
| 60 | Proposal page URL https://sea-you-surfers-nest-proposal.os1.workers.dev | M | `wrangler deploy` 2026-11-25, version e71f1f91-7adc-430c-bf01-daef8bbe371c; verified below |
| 61 | Screenshot dates: listings 21 Nov 2026 (ours); preview 25 Nov 2026 | H | A `audited_at` 2026-11-21, W `walked_at` 2026-11-21T23:35Z; `make-pitch-media.sh` run 2026-11-25 |

**61 claims, 61 sourced, 0 unsourced.**

Not claimed on purpose:
- **Any price or rate** (D `offers_note` holds live OTA prices seen 2026-11-21 "for the pitch only"; no amount is used anywhere, and no fee amount either).
- **That +94715880052 is theirs, answered or on WhatsApp** (unconfirmed; A "Not measured").
- **Booking.com's Preferred Partner sentence** ("It will pay us a higher commission if you make a booking", A F1). True and sourced, but the preview's own primary action sends guests to Booking.com, so using it as an argument would be unfair.
- **"Faster" or "more bookings"**: there is no old site to measure (A `measured` null).
- **A check-in time, A/C in a named room, en-suite for every room, a restaurant, surf lessons or a named break** (D `contradictions`, gaps).
- **Agoda's 8.8**: it re-scores Booking.com's same 8 reviews (D `reviews.agoda` note).
- **The Airbnb text's stray "– adds a surf vibe."** (D `business.description` note): cropped out of `before-airbnb-note.jpg` so the owner's own listing is not shown at its weakest.
- **The two host-conduct complaints** (below): not quoted, paraphrased or hinted at anywhere in the page or message.
- **Agoda's app pop-up** (A F6, not a pitch point) and the Google map / "Check availability" prices (other businesses' names and prices; cropped out).

## Images

All made by `make-pitch-media.sh` (`# media:` headers), git-ignored by the repo's `*.[jJ][pP][gG]` rule. **`media/sea-you-surfers-nest.tsv` still needs these 16 files added** (outside this agent's lane). Before (10): JPEG crops of the auditor's 2026-11-21 captures in `dossier/sea-you-surfers-nest/assets/walk/` (crops done in Chromium). Each keeps only this business's own panel: no Google map, no Google price list, no Booking.com map, no "best of Kumbalgama" cards. `before-booking-fold.jpg` and `before-booking-sign.jpg` show the sign with the phone number: it is the business's own public sign on its own listing, the page is noindex with robots `Disallow: /`, and the page asks the owner to confirm it. After (6): the live preview, 390×844 @2x with reduced motion (first screen, the glance with ratings, "Who's coming?" on "A question first", the Deluxe room with the A/C line) and 1440×900 (first screen, the seven rooms).

## Checks before handoff (2026-11-25)

- Preview https://sea-you-surfers-nest.os1.workers.dev/ → 200; live index.html `cmp`-identical to DIST.
- Screenshots of today's presence present: 10 (`before-*.jpg`). There is no old site; the before side is Google, Booking.com and Airbnb.
- Message `message.en.whatsapp.md`: **559 characters** (≤ 600), English, with the preview link and the proposal link. No email or platform-messaging version (see Channel).
- `index.html` static check: `python3 -m http.server` on 127.0.0.1 (random port), full wheel scroll in Playwright at 390×844, 1440×900 and 360×640: 17 requests each (page + 16 images), **0 external**, 0 console errors, 0 broken images, 0 px horizontal overflow, every `<img>` width/height equal to the file's. Inline CSS, system fonts, no scripts.
- Cloudflare: no `~/.oneshot/cf-token`; `npx wrangler whoami` (OAuth, wrangler 4.168.0) lists one account, e42421b29f42b84081a1e9be362397eb. Deployed with `CLOUDFLARE_ACCOUNT_ID=e42421b29f42b84081a1e9be362397eb npx wrangler deploy` (18 files).
- Proposal page live: `https://sea-you-surfers-nest-proposal.os1.workers.dev`, Worker `sea-you-surfers-nest-proposal`, version e71f1f91-7adc-430c-bf01-daef8bbe371c. `/` → 200 and `cmp`-identical to `index.html` (sha256 04834ec5e4a5b4c3…; `/index.html` 307 → `/` by auto-trailing-slash); all 16 JPEGs → 200 and `cmp`-identical (two answered 404 for a few seconds right after the deploy, then 200); `<meta name="robots" content="noindex, nofollow">` present; robots.txt directives `User-agent: *` / `Disallow: /` (Cloudflare prepends its managed content-signals comment block, as on the Lotus proposal; no other directive). `.assetsignore` keeps notes, message, recipe and config off the Worker (each → 404).

## For the human before sending

- **Confirm the number first.** +94715880052 was read off the street sign in the business's own photo; it is published as text nowhere. Before sending: open a WhatsApp chat to +94 71 588 0052 without sending anything and check that an account exists and, if it shows one, that the name or picture fits Sea You / Ashly. If there is no WhatsApp account, send the same text as an SMS. The message asks Ashly to confirm the number either way.
- **If the number is wrong or dead**, the only remaining channel is Airbnb "Message host" (or Booking.com "Ask a question"), which needs a guest account, is meant for stay inquiries and may strip the links before a booking. No version was written for it; whether to use it at all is your decision.
- **Host-conduct complaints, for you only (not in the pitch):** two Booking.com guests complained about the host, neither about safety. Camilla (UK, 5/10, stay 1–4 Jan 2026): a booking muddle, part of her group sent elsewhere and **a refund for two nights refused** (she is unsure whether Booking.com or the property was at fault). Daniel (Switzerland, 6/10, Feb 2026, in French): the owner was unaccommodating and **"counted every cent"** ("Il comptait chaque centime"). D `reviews.critical_themes[0–1]`, `gaps` (human_decision). They stand against 11 reviews that praise Ashly by name. Glance at them before deciding to pitch; Camilla also advises future guests to ring several days before arrival to check the booking (A F3 notes).
- **Surf sick is a separate business.** "Surf sick", a homestay at the same street number (151 Weliwaththa Rd), has its own phone (+94 74 243 2996), Booking.com listing and photos (D `same_address_neighbour`). Nothing in the pitch mentions it; don't use its number or confuse the two.
- **No fee amounts anywhere.**
- **Open on the preview (not gating):** the five amenities not shown on the page (S fix list 1; the page asks the owner), the phone switch at station 8 (`TEL_CONFIRMED`), and the 768 px edge-text nit (V). The live `site-check` LCP fail in L is recorded as a measurement artifact; the page quotes only the critic's measured numbers.
- The pitch names no other business; the Google crops leave out the map and the price comparison.
