# Pitch notes: lotus-surf-house (run 2026-10-midigama-01, writer 0.5.1, 2026-11-04)

Channels: the business publishes **one** direct channel, the phone +94 77 464 7541 (`contact.phone`, both Google listings; `booking.direct_channels`). No email (`contact.email` null, gap), no WhatsApp confirmed (`contact.whatsapp` null, gap pitch_point), no Instagram; the Facebook page is dormant since 2018 and carries another number. So there is **one message**, `message.en.whatsapp.md`, for WhatsApp if the number is on it, otherwise as an SMS to the same number. **No email version**: there is no address to send it to. The run file names no channel. Language: English (base.md rule 5, `markets/lk`). Run `mode: test`: nothing sent. Shape follows `sites/cheeky-monkey/pitch/` (same run, same writer version); every claim below is lotus-surf-house's own.

Short names: D = `dossier/lotus-surf-house/dossier.json`; A = `dossier/lotus-surf-house/audit.json` (findings F1–F6; `audit.md`); W = `dossier/lotus-surf-house/funnel/walk.json` + `walk/`; S = `reports/2026-10-midigama-01/lotus-surf-house.md` "Round 1 — full (station 5)" (critic 0.4.3); X = `reports/2026-10-midigama-01/lotus-surf-house.experience.md` "Round 1 — full"; V = `reports/2026-10-midigama-01/lotus-surf-house.visual.md` "Round 1 — full"; FJ = `reports/2026-10-midigama-01/funnel/lotus-surf-house-r1/funnel.json`; FN = `sites/lotus-surf-house/final/notes.md`; AI = `sites/lotus-surf-house/aiseo-report.md`; SEO = `sites/lotus-surf-house/seo-report.md`; NB = `notes/lotus-surf-house.md`; DIST = `sites/lotus-surf-house/final/dist/index.html` (= the deployed preview: fetched 2026-11-04, `cmp`-identical); L = the `passed → previewed` ledger line (2026-11-04T16:59:35Z, version 1d69c54f); P = `PLAN.md`. H = index.html, M = the WhatsApp/SMS message.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | Booking.com 9.0/10 from 125 reviews, read 3 Nov 2026 | H, M | D `reviews.booking` {9, 125, fetched_at 2026-11-03T17:33:45Z} |
| 2 | Google 4.9/5 from 78 reviews, read 3 Nov 2026 | H, M | D `reviews.google` {4.9, 78, fetched_at 2026-11-03T17:37:54Z} |
| 3 | Staff score 9.9 on Booking.com | H | D `reviews.booking.subscores.Staff` 9.9 |
| 4 | No website of its own; found on Google Maps or Booking.com | H, M | D `existing_site.url` null + note; A scope `no_site`; audit.md "the path a traveller takes today" |
| 5 | On Booking.com a guest can't reach the hosts before booking: no phone/WhatsApp/email; "Once you book, we'll provide details…"; "Ask a question" → sign-in | H, M | A F1 (W 04-booking-com: tel_links [], whatsapp 0, mailto 0); `before-booking-contact.jpg` (crop y 0–262 of `walk/04-booking-com-contacting.png`), `before-booking-signin.jpg` (crop y 0–620 of `walk/04-booking-com-ask-tapped.png`) |
| 6 | The phone number is on Google and comparison sites like Kayak, not where a guest books | H | D `contact.phone.verified` (Google listings, Kayak) |
| 7 | Built from their Booking.com photos and listing, Google listing and guests' reviews | H | FN facts table + images (18 photos, all Booking.com uploads `business-owned`); S d1 facts table |
| 8 | Preview URL https://lotus-surf-house.os1.workers.dev/ | H, M | L note; fetched 2026-11-04 → 200, `cmp`-identical to DIST |
| 9 | Private preview; search engines told not to list it; listings unchanged | H | L (noindex,nofollow meta; robots Disallow; no sitemap); only the preview Worker exists |
| 10 | Today's Booking.com first screen: Booking.com bar and search box, name, 9.0 Superb · 125 reviews, ping-pong table photo 1/42, "Choose dates to see prices" | H | `before-booking-fold.jpg` (= `walk/04-booking-com-fold.png`, whole); V "Current presence"; X "Against the current presence" |
| 11 | Preview first screen: the gate, name, "A guesthouse in Midigama, on the south coast of Sri Lanka.", "Check dates on Booking.com", "Call +94 77 464 7541" | H | S d4 (mobile-00); X timeline; DIST hero; `after-390-top.jpg`, `after-1440-top.jpg` |
| 12 | One scroll down: the King Rooms band, "The King Rooms upstairs are new, and their balconies look out into the trees." | H | DIST `#upstairs`; FN (Alon's gate-b words "show the king room first"); `after-1440-king.jpg` |
| 13 | Google listing says "Add website" | H | A F2; `before-google-website.jpg` (crop x 72–488, y 205–577 of `walk/02-google-listing-desktop-add-website.png`; no map, no "Similar hotels nearby") |
| 14 | On a laptop the first Google button is a sponsored Booking.com advert | H | A F2 ("On a desktop the first button is 'Book now' on a Booking.com ad marked 'Sponsored'"); `walk/02-google-listing-desktop-availability.png` (not shown) |
| 15 | Google on a phone: Directions, Start, Call; photos behind "See all 150 photos in the app"; nothing in the house's own words | H | A F2; W 01-google-listing text; `before-google-phone.jpg` (crop y 1150–1688 of `walk/01-google-listing-fold.png`; the map with other places' names is cut off) |
| 16 | 1 tap from the first screen to the Booking.com listing | H, M | FJ (`clicks_to_book` 1, primary/hero engine, `cta_above_fold` true); S d3 (tapped URL = `booking.engine_url`) |
| 17 | The Booking.com button stays in a bar at the bottom of the phone with a call button as the guest scrolls | H | S d2 ("From mobile-02 on, the phone bar shows 'Check dates on Booking.com' plus a call button"); X walk (bar w02 to the end); `after-390-king.jpg` |
| 18 | Call on the first screen, beside the King Room, in the bar and at the end of the page | H | DIST (6 `tel:+94774647541`: hero, King block, Getting here, closing, footer, bar); S d3 |
| 19 | Booking.com's description says every room has air-conditioning and a balcony; its own room list gives them only to the 3 King Rooms | H | A F4; D `room_types[]` (`air_conditioning` true only on King Room with Balcony, 3 units); `before-booking-summary.jpg` (crop y 735–987 of `walk/04-booking-com-summary.png`; the Booking.com map above it, which names other places, is cut off) |
| 20 | Booking.com writes that summary, not the owner | H | A F4 notes |
| 21 | Some guests wrote the room was not the one in the photos, or that the fan rooms were hot | H | D `reviews.critical_themes` [0] (hot at night, no A/C) and [3] (rooms differ from the photos: 3 guests); A F4 |
| 22 | King Room: "Upstairs, 25 m². Air conditioning, fan, mosquito net and hot water." with its own photos | H | DIST King block; D `room_types[3]`, `room_units[]`; S facts table; `after-390-king.jpg` |
| 23 | Garden rooms under "Ground floor, three room types", each with beds, size and "Fan and mosquito net; no air conditioning and no hot water", with their own photos | H, M | DIST `#garden`; D `room_types[0–2]`, `room_types_note`; FN images (slots 11–16 = garden-room photos img-029/043/030/009/028/044, D `room_types[0–2].photos`); `after-390-garden.jpg` |
| 24 | Guest reviews today: on Booking.com below the listing (between sign-in prompts); on Google behind a sign-in | H | X ("Sign in, save money / Genius" interruptions twice in four screens); D gaps `reviews.google quotes` (texts behind the sign-in wall) |
| 25 | Preview: both ratings with count and read date, the glance line "Midigama Beach 250 m (Booking.com) \| Breakfast included, 8–10 \| Check-in any hour" | H | DIST `.glance`; S facts table; `after-390-glance.jpg` |
| 26 | 12 guest reviews quoted word for word with name, country and month; link to all 125 on Booking.com | H, M | S d1 (12/12 verbatim, 12/12 attribution); DIST "Read all 125 reviews on Booking.com" |
| 27 | Cash only today only inside the closed "Hotel policies" section | H | A F5 (not a pitch point; stated as what a guest meets); `walk/04-booking-com-policies.png` (not shown) |
| 28 | Preview: cash only under the King Room buttons and in "Good to know" | H | DIST ("Check-out 11:00–12:00 \| Check-in at any hour \| Cash only"; Good to know) |
| 29 | Slowed phone test 4 Nov 2026: 883 KB, 0 outside requests, main content in under half a second | H | S d2 (903,716 B, LCP 484 ms, `third_party_hosts` []) |
| 30 | Fits a 390 px phone without sideways scrolling; Booking.com and Call links work with JavaScript off | H | S d2 (scrollWidth = clientWidth at 320/360/390/1440); S d3 (JS off: 9 booking + 6 tel links present) |
| 31 | The preview tells the story: gate, King Rooms, roof with the Buddha, garden with hammock and ping-pong, Yelum and breakfast 8–10, guests, getting here by train | H | DIST sections; D `facilities[]`, `stay_info.breakfast_hours` (owner reply), `location.distance_to_station` |
| 32 | All 18 photos on the page are their own Booking.com uploads | H | S hard fails ("All 18 drawn photos are `business-owned` Booking.com uploads"); FN images |
| 33 | Getting here: station 50 m; beaches and Koggala Airport by Booking.com's distances | H | DIST; D `location.distance_to_station`, `.nearby` |
| 34 | Good to know: check-in any hour, cash only, children welcome, no cots/extra beds, pets on request free, no parking | H | D `stay_info.check_in`, `.house_rules`, `.parking`; DIST |
| 35 | "On Google you may also find the house under its old name, Yelum Guest House." | H | DIST Getting here; D `business.former_names` |
| 36 | No chat widget, pop-up or tracker | H | S d7 (0 third-party on load and over a scroll; 0 iframes) |
| 37 | Every fact checked against sources: 0 mismatches | H | S d1 ("0 mismatches and 0 unsourced claims") |
| 38 | Old Google listing "Yelum Guest House" at the same spot, 4.7, "Claim this business"; website → Facebook page "Midigama guesthouse YELUM", newest visible post Nov 2018; Facebook phone +94 71 258 5804 vs +94 77 464 7541 on both Google listings; address ends "123456789" | H | A F3, `recommended.off_site[1–2]`; D `business.former_names`, `contact.phone_other`, `contact.facebook_profile`; SEO recommendation 1; NB pitch points; `before-yelum.jpg` (stack of `walk/03-google-old-listing-desktop-fold.png` x 72–488 y 250–328 and `walk/03-google-old-listing-desktop-website.png` x 72–488 y 438–640; no "Similar hotels nearby"), `before-facebook.jpg` (crop y 530–890 of `walk/06-facebook-phone.png`) |
| 39 | Booking.com's old Yelum web address already leads to the Lotus Surf House listing | H | A F3 notes (`/hotel/lk/yelum-guest-house` redirects, walk.json 05-booking-old-url); D `business.name` note |
| 40 | Advice: add the site to the Google listing; claim/merge the old listing; update Facebook; check room facilities in the Booking.com extranet | H | A `recommended.off_site[0–3]` |
| 41 | No login today; with managed/self-hosted: own login, Lotus-only admin, fields not code, Publish rebuilds | H | L (no tenant/login); P §1 (tenant-scoped login, publish flow) |
| 42 | Editable list (Basics, Text, Photos incl. optional first-screen video, Rooms and stay, Amenities, Reviews, Contact and booking) | H | FN "editable (owner, after a CMS sale)" |
| 43 | Upload from a phone; the site makes the sizes | H | playbook §9; FN (the build crops whatever is uploaded) |
| 44 | Reviews: owner removes, we add | H | `cms/app/src/collections/Sites.ts` l.72 `evidenceRowsDeleteOnly(['ratings', 'testimonials'])` |
| 45 | No field yet: the featured "King Rooms" room, the glance line, the stay line under the King buttons | H | FN "schema gaps" (`gaps.featuredRoom`, `gaps.glance`, `gaps.stayShort`) |
| 46 | Offer: managed (recommended; monthly fee agreed; hosting, updates, backups ours); self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, updates/backups theirs); files only (no editor, changes need a developer). Nothing set up yet | H | writer base.md hard constraint 2; P §1 hosting modes; run file `hosting.default_mode: managed`. No fee amounts exist (market.md: none until Shahar decides) |
| 47 | The preview runs on a temporary address; the live address is decided with them after they choose | H | base.md hard constraint 3 (no domain promise); D `existing_site` (no domain of their own) |
| 48 | WhatsApp/email: add a WhatsApp button if the number is on WhatsApp; add an email if they have one | H | D `contact.whatsapp` null (gap pitch_point), `contact.email` null (gap) |
| 49 | Preview uses only +94 77 464 7541; ask about +94 71 258 5804 | H | D `contradictions` phone (resolution: site uses +94774647541) |
| 50 | Rates only on Booking.com, changing with dates; preview shows no price, links to live dates | H | D gaps offers/prices (pitch_point); FN gaps ("no price (live Booking.com inventory)"); AI "Price per night" |
| 51 | Booking.com lists a private hot tub in the King Rooms, Google a pool and a restaurant; no photo/review shows them; preview says nothing | H | D `contradictions` pool / restaurant / hot tub; NB open item; AI ("The King Room hot tub… I left it out") |
| 52 | A 2023 YouTube video by Travel With Sandhya shows the roof terrace, garden and surfing nearby; ask whether the footage is theirs | H | D `videos[]` vid-002 (uploaded 2023-04-17, channel Travel With Sandhya, `not_picked`: "Ask the owner whether the footage is his (pitch point)") |
| 53 | No photos of the beach, waves, breakfast or the people running the house; none larger than 1600 px | H | D gaps images (pitch_point: "all 44 photos are ≤ 1600 px … nothing of the wave or the people") |
| 54 | Guests write about Lazy Left and Lazy Right; the house names no break and no season; preview shows only a Rosa forecast for Lazy Left, the nearest spot Rosa covers | H | D gaps `location.spot` and `season` (pitch_point); AI "Surf" and "The season" |
| 55 | AI assistants: keep, or block the training crawlers | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 56 | Greeting "Hello Yelum" | M | DIST ("Yelum owns the house"); D owner replies in `reviews`; NB ("Owner Yelum and his family") |
| 57 | Proposal page URL https://lotus-surf-house-proposal.os1.workers.dev | M | `wrangler deploy` 2026-11-04, version dc0b8ed6-0330-47a5-9a56-7d495722470f; verified below |
| 58 | Screenshot dates: Booking.com, Google, Facebook 3 Nov 2026 (ours); preview 4 Nov 2026 | H | A (`audited_at` 2026-11-03), W `walked_at` 2026-11-03; `make-pitch-media.sh` run 2026-11-04 |

**58 claims, 58 sourced, 0 unsourced.**

Not claimed on purpose: any price or rate; that +94 77 464 7541 is on WhatsApp; the hot tub, pool or restaurant; the surf break or season as the house's own words; that Booking.com receives the guest's room or dates (S d3: documented gap, the link lands on the listing top); "faster" or "more bookings" (there is no old site to measure; A `measured` null); the number of rooms (D `contradictions` room count); the Booking.com commission (A "Not measured"); the guests' cancellation/refund complaints (D `booking.reliability_note`: context only, not for the pitch); "44 px tap targets" (S d2: 20 of 41 are under 44 px); Google's "Similar hotels nearby" panel (A F6: Google's layout, not a pitch point, and it names other businesses).

## Images

All made by `make-pitch-media.sh` (`# media:` headers). Git-ignored by the repo's `*.[jJ][pP][gG]` rule, as in the cheeky-monkey precedent. **`media/lotus-surf-house.tsv` still needs these 14 files added** (outside this agent's lane). Before (8): JPEG crops of the auditor's 2026-11-03 captures in `dossier/lotus-surf-house/funnel/walk/` (crops done in Chromium; Pillow is not installed). Each crop keeps only this business's own panel: no Google map, no "Similar hotels nearby", no Booking.com map, so no other business's name, photo or price appears. After (6): the live preview, 390×844 @2x with reduced motion (first screen, King Room, glance, garden rooms) and 1440×900 (first screen, King band).

## Checks before handoff (2026-11-04)

- Preview https://lotus-surf-house.os1.workers.dev/ → 200; live index.html `cmp`-identical to DIST (L: all 28 files on 2026-11-04).
- Screenshots of today's presence present: 8 (`before-*.jpg`). There is no old site; the before side is Booking.com, Google and Facebook.
- Message `message.en.whatsapp.md`: **473 characters** (≤ 600), English, with the preview link and the proposal link. No email version (no published address).
- `index.html` static check: `python3 -m http.server` on 127.0.0.1, full wheel scroll in Playwright at 390×844, 1440×900 and 360×640: 15 requests each (page + 14 images), **0 external**, 0 console errors, 0 broken images, 0 px horizontal overflow, every `<img>` width/height equal to the file's. Inline CSS, system fonts, no scripts.
- Cloudflare: no `~/.oneshot/cf-token`; `npx wrangler whoami` (OAuth, wrangler 4.157.0) lists one account only, e42421b29f42b84081a1e9be362397eb. Deployed with `CLOUDFLARE_ACCOUNT_ID=e42421b29f42b84081a1e9be362397eb npx wrangler deploy`.
- Proposal page live: `https://lotus-surf-house-proposal.os1.workers.dev`, Worker `lotus-surf-house-proposal`, version dc0b8ed6-0330-47a5-9a56-7d495722470f. `index.html`, `robots.txt` and all 14 JPEGs → 200 and `cmp`-identical to this folder (index sha256 c2eaf7b444748021…); `<meta name="robots" content="noindex, nofollow">` present; robots `Disallow: /`. `.assetsignore` keeps notes, message, recipe and config off the Worker (each → 404).

## For the human before sending

- **One channel only:** +94 77 464 7541. WhatsApp is unconfirmed; if it is not on WhatsApp, send the text as an SMS, or call. There is no email address and no active social account to write to.
- **The Facebook number** +94 71 258 5804 is on a page dormant since 2018; don't use it.
- **No fee amounts anywhere.**
- **Polish open on the preview** (all three critics, not gating; NB): the phone header wordmark overprints the hero line and Call button while scrolling, the porch photo shows a white Instagram border on desktop, the King thumbnails can't be tapped. The owner will see the first one on his first scroll. The pitch's screenshots don't show it.
- The pitch names no other business; the Google crops leave out the map and "Similar hotels nearby". It names the YouTube channel Travel With Sandhya only to ask whether its footage is the owner's.
