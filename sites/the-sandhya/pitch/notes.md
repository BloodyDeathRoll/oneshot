# Pitch notes: the-sandhya (run 2026-11-ahangama-01, writer 0.5.1, 2026-11-09)

Operator alon. `mode: test`: nothing sent, no mail drafted; sending is gate c. Language: English (`markets/lk/market.md`). Shape follows `sites/global-surf-adventures-v2/pitch/`.

**Channels.** `message.en.email.md` to `reservations@thesandhya.com` (D `contact.email`, verified on the own site, engine and Trip.com). `message.en.short.md` (446 characters, under the 600 limit) is for a chat channel the human picks: Instagram DM (D `contact.socials.instagram`, linked from the own site), or WhatsApp **only after a person confirms the number takes messages** (D `contact.whatsapp.verified`: "Weak"). It is not named `whatsapp` on purpose.

Short names: D = `dossier/the-sandhya/dossier.json`; A = `dossier/the-sandhya/audit.json` / `audit.md` (findings F1–F16, hand walk `funnel/walk-hand.json`); OS = `dossier/the-sandhya/assets/old-site.json` (one phone-size run, 2026-11-06, unthrottled, load + 8 s); CR = `reports/2026-11-ahangama-01/the-sandhya.md` 4g round 1; CV = the same file, "Verification 1"; VC = `the-sandhya.visual.md` 4g; EC = `the-sandhya.experience.md` 4g; FN = `sites/the-sandhya/final/notes.md`; AI = `sites/the-sandhya/aiseo-report.md`; L = the `passed → previewed` ledger line (2026-11-09T19:49:21Z, version 89e320e5); LM = my own load of the live preview, 2026-11-09 (`requests` 4, 207,596 B compressed, 1 host, 9 engine links, 4 with `?rid=`, `noindex, nofollow`); P = PLAN.md §1; W = writer base.md. H = index.html, E = email, S = short message.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | Nine-room, adults-only beachfront boutique hotel on Kabalana Beach | H | D `business.description`, `room_count` (9) |
| 2 | 9.7/10 on Trip.com, 56 reviews, read 6 Nov 2026 | H, E, S | D `reviews.trip` {9.7, 56, fetched_at 2026-11-06T10:04:08Z} (read directly, not via a digest); A F6 |
| 3 | New version built from their pages, photographs and booking engine | H, E, S | FN "facts" and "images" (all `business-owned`); D `booking.engine_url` |
| 4 | Preview URL https://the-sandhya.os1.workers.dev/; private, noindex; thesandhya.com unchanged | H, E, S | L (noindex meta, robots Disallow, no sitemap; only Worker `the-sandhya` deployed); LM (200, `noindex, nofollow`) |
| 5 | Old first screen: dictionary entry for Sandhya, "Adults Only Hideaway", small RESERVE | H, E | A F4, F3; `before-home-390.jpg` = A `funnel/shots/01-home-settled.png` |
| 6 | Old home page 17.5 MB from 13 servers, incl. Facebook, Google Ads, DoubleClick, Google Analytics; one phone-size run, 6 Nov 2026 | H, E | OS `mobile.first_load_bytes` 17,539,223, `hosts_on_load` (13 non-empty: own, unpkg, cdnjs, connect.facebook.net, facebook.com, googletagmanager, google-analytics, analytics.google.com, ad./googleads.g./stats.g.doubleclick.net, google.com, google.co.il); CR "Against the current site". Note: google.co.il reflects where the run was made |
| 7 | Slowed 4G: page white, RESERVE does nothing at 5, 15, 30 s; first answers about 52 s after opening | H, E, S | A F1 (two runs, 52.6 s and 52.3 s); `before-slow4g-15s-390.jpg` = `funnel/shots/03-slow4g-15s.png` |
| 8 | Fast line: white layer over RESERVE for 7.5 s after the page is ready | H | A F1 |
| 9 | RESERVE 70 × 30 px, top corner | H | A F3 |
| 10 | Preview: about 270 KB in 4 files, all from its own server, no trackers | H, E, S | CV d2 (273,877 B, 4 requests, 0 third-party, 10 runs); FN fix after verification 1 (269 KB on the deployed build 49b5001); LM (4 requests, 1 host) |
| 11 | Booking button a plain link, there from first paint; title and button in about 0.6 s, main photograph by about 1.5 s on a slowed phone test | H, E | CV d2 (LCP 560–648 ms = the h1; hero `responseEnd` 1,484–1,498 ms throttled phone); CR d3 (hero link in DOM, topmost at 37 ms with media stalled) |
| 12 | Button "Check rooms and live dates", full width on a phone, 56 px tall; same button in a bar at the bottom | H | CR tap log (hero 358×56; bar 302×54); CR d3 (persistent action at 31 of 31 stops) |
| 13 | Old: 2 taps with the panel's dates not sent; 5 or 6 taps to pick dates the engine receives; adults never sent | H | A F2; A hand-walk table |
| 14 | Preview: 1 tap from the first screen, any room or the bar | H, E, S | CV d3 (`clicks_to_book` 1); CR tap log |
| 15 | A guest who picks dates has them added to the link; none pre-filled; with none picked the links are plain | H, E | CR "The date fields"; CV d3; FN "The date fields". **Not claimed:** that Cloudbeds reads them (A not_measurable; FN "Nobody has yet seen the engine honour the dates") |
| 16 | Buttons name the dates, e.g. "Check 8–11 Jan · 3 nights"; two sets (under the rooms, booking section) | H | FN fix pass + label fix; `after-390-dates.jpg` (recipe, dates = run day + 60/63) |
| 17 | Old: Sri Lanka ~3,200 px down, Kabalana ~3,900, Ahangama only in menu/footer; ~two screens to "hotel" | H | A F4 |
| 18 | Preview h1 "An adults-only beachfront boutique hotel on Kabalana Beach, Ahangama, Sri Lanka." | H, E | LM (h1 text); `after-390-top.jpg`, `after-1440-top.jpg` |
| 19 | Timings from test browsers with slowed connections, not real phones | H | A not_measurable; CR/EC "Not covered" |
| 20 | Nothing covers the page; usable before the photograph; booking works with JS off | H | CR d3 (stalled media, JS off: plain links); CV regressions (JS off, 7 plain engine links) |
| 21 | Old panel: today, tomorrow, 2 adults pre-shown | H | A F2; `before-panel-390.jpg` = crop of `funnel/shots/05-panel-open.png` (y 0–840) |
| 22 | Old: Director's Suite RESERVE NOW has no room in its link | H | A F8; `before-suite-390.jpg` = crop of `07-suite-reserve-now.png` (y 0–520) |
| 23 | Preview: four room types, photos, bed, size, floor, own button; link carries the engine's room number, "so it can open on that room" (pointed to the confirm list) | H, E | D `booking.engine_room_links` (`?rid=` from the engine's structured data); CR tap log (4 rid links); FN facts (room rows); `after-390-room.jpg`. **Not claimed:** that it does |
| 24 | Sanskrit meaning, twilight, near the end under "Why Sandhya" | H | D `business.name_meaning`; preview section `Why Sandhya` (twilight) |
| 25 | Old: none of 10 pages shows a rating, review or link | H | A F6 |
| 26 | Preview: Trip.com 9.7 with count, date, link after the rooms; two guest reviews whole, source and month | H, E | FN facts (ratings, `reviews.quotes[3]`, `[6]`); preview `.rooms-proof`. Kayak is deliberately not mentioned anywhere in the pitch |
| 27 | Old: tel and mailto links 15–16 px tall; drawn island map, no map link | H | A F9, F10; `before-contact-390.jpg` = crop of `07-home-footer-contact.png` (y 1060–1440) |
| 28 | Preview: Call, Email, Map, Instagram buttons 50 px; address, number, email printed; Map opens the Google listing; round call button in the bar | H | CR tap log (Call 103×50, Email 114×50); markup `footer.foot` (`btn-soft`, `location.map_url`), `#bar a.round` tel; `after-390-footer.jpg` |
| 29 | Own photographs only; room galleries; food shown large | H | FN images (all `business-owned`); VC checklist "Media" ("Food is big") |
| 30 | Check-in from 14:00, check-out by 12:00 as the engine gives them; breakfast sentence | H, E | D `stayInfo` (engine `checkinTime`/`checkoutTime`); FN facts (breakfast, `booking.rate_terms`); A F7 |
| 31 | Nightly rates on the booking page for chosen dates; Exclusive Use "from US$3,500" with its date | H | D `offers[0]` (3500 USD, 2026-11-06); preview copy "Nightly rates are on our booking page, for the dates you choose."; A recommendation 8 (no copied nightly rate) |
| 32 | Most text their own; every fact traces to site, engine or public listing; reviewer checked each | H | FN facts / `copy/sources.md`; CR d1 (facts table, 0 unsourced). "0 mismatches" deliberately not claimed (Suite bed flag) |
| 33 | No cookie notice, pop-up, chat widget or tracker | H | CR d7 (0 external, no third party); LM |
| 34 | Off site: Google listing resellers first, own engine absent, own-site link below; ask Cloudbeds about a direct rate | H | A F12, `recommended.off_site[0]` |
| 35 | Off site: MICHELIN Guide page bar text (verbatim), no link to own site; ask them | H | A F13, `recommended.off_site[1]`. **No Michelin distinction is claimed** |
| 36 | Off site: Google 14:00 + pet-friendly vs Trip.com after 16:00, no pets, 12+; align them | H | A F14, `recommended.off_site[2]`; D `contradictions` |
| 37 | Editable after a CMS sale: text blocks, rooms (name, bed, guests, description, main photo), photos with alt and focal point, stay facts, amenities, front-desk hours, Exclusive Use price, reviews (remove; we add), contact and booking links, Instagram | H, E | FN "editable"; `cms/app/src/collections/Sites.ts` l.72 (`evidenceRowsDeleteOnly(['ratings','testimonials'])`); playbook §9 |
| 38 | No field yet: room galleries beyond the first photo, "Every room has" list, logos, date fields | H | FN "schema gaps", "editable" (not editable) |
| 39 | Offer: managed (recommended), self-hosted (~$6–12/month to their host), files only; nothing set up; prices agreed, none stated | H, E | W hard constraint 2; P §1; run.yaml `hosting.default_mode: managed`; `markets/lk/market.md` (no amount until Shahar decides) |
| 40 | thesandhya.com stays theirs; we connect it once they choose | H | W hard constraint 3 |
| 41 | Confirm: Cloudbeds reading dates and `?rid=` unseen (headless wall); if ignored we remove the fields | H | A not_measurable; D `booking.engine_status`; FN "Nobody has yet seen…"; CV fix list 2 |
| 42 | Confirm: check-in times and age rule differ across sources | H | D `contradictions` (check_in, age_policy); preview stay note |
| 43 | Confirm: ratings read from public listings 6 Nov 2026 | H | D `reviews.*.fetched_at` |
| 44 | Confirm: Suite "King bed" on the preview vs "Super King bed" on their room page | H | D `room_types[3].beds` (source thesandhya.com/room/directors-suite/); CR d1 flag |
| 45 | Confirm: one Studio Twin photo's room unsure (img-167); three staff photos shown only with agreement (img-141–143); phone first screen cut from a smaller copy | H | CR d1 flags; `mockups/calm/notes.md` l.44, l.51; VC fix 1 (616 px source shown at 924) |
| 46 | Confirm: WhatsApp icon beside the number is not a link, unconfirmed; preview leaves it out | H | A F9; D `contact.whatsapp.verified` "Weak"; FN gaps |
| 47 | Confirm: AI assistants, keep or block training crawlers | H | AI "Crawler policy (owner decision, not yet put to them)" |
| 48 | Gaps: no video of the hotel, no season, minimum stay or team names | H | D `gaps[]` (videos, season, stayInfo.minNights); AI (staff and owner names) |
| 49 | Proposal page https://the-sandhya-proposal.os1.workers.dev | E, S | `wrangler deploy` 2026-11-09, version 45b677f4-cc59-4990-9d05-ea431f51dd7c; verified below |
| 50 | Screenshot dates: old site ours 6 Nov 2026; preview 9 Nov 2026 | H | A (walk 2026-11-06); `make-pitch-media.sh` run 2026-11-09 |

**50 claims, 50 sourced, 0 unsourced.**

**Not claimed on purpose:** any Michelin distinction or Key; the three press quotes (Wallpaper* as quoted on the own site is untraced, D `press[2..]`); any nightly or aggregator rate; Kayak's 9.4/159 or any digest-relayed score (Kayak, Momondo, Booking.com, MyBoutiqueHotel); Google's 4.6 (no count); that WhatsApp works; that Cloudbeds honours the dates or `?rid=`; the adults count; "more bookings"; a surf angle (Alon, 2026-11-06: a beachfront boutique hotel, not a surf stay); a publish-to-live time.

## Images (`make-pitch-media.sh`, `# media: before-*.jpg`, `after-*.jpg`)

- `before-*`: crops of the auditor's 2026-11-06 captures in `dossier/the-sandhya/funnel/shots/` (scratch, not in the manifest; remade by `funnel/make-walk.mjs`), re-encoded by Playwright.
- `after-*`: Playwright captures of the live preview on 2026-11-09, reduced motion on. Each phone crop is clipped to its own element, so neither the Trip.com/Kayak rating line nor the booking card's rating block appears in any capture (checked by eye).

## Verification of the proposal page (2026-11-09)

- Worker `the-sandhya-proposal` (name checked free against the account's 25 Workers first; nothing else touched), Oneshot account e42421b29f42b84081a1e9be362397eb, version **45b677f4-cc59-4990-9d05-ea431f51dd7c**.
- `curl`: `/` (index.html), `robots.txt` and all 10 images → 200 and `cmp` byte-identical to the local files (12 of 12). `notes.md`, both messages, the recipe, `wrangler.jsonc` and `.assetsignore` → 404 (not served).
- `<meta name="robots" content="noindex, nofollow">`; `robots.txt` `User-agent: * / Disallow: /`.
- Headless phone load: 200, 4 requests, 1 host (its own), 0 broken images; the only outside URL in the page is the preview link (not requested). No horizontal overflow at 390 or 1440.
- Preview https://the-sandhya.os1.workers.dev/ → 200 on 2026-11-09.

## For the human before sending (gate c)

1. **Kayak 9.4 / 159 is on the preview**, in three places (rating line after the rooms, Guests, booking card) and in `sameAs`. It was read through a digest and is unverified. The pitch never mentions it, but the owner will see it on the preview: verify it on Kayak or have it removed from the site (copy/4g) before sending.
2. **Cloudbeds.** Open https://hotels.cloudbeds.com/reservation/WMvA6V in a real browser, with `#checkin=…&checkout=…`, and each `?rid=` link with and without it. The pitch says only that the site passes the dates and the room in the link; if Cloudbeds ignores them, the page's confirm item 1 already says the fields come out.
3. **Channel.** Email is the verified channel. Use the short message on WhatsApp only after confirming the number takes messages; otherwise Instagram DM or not at all.
4. The MICHELIN Guide paragraph quotes the Guide's own page text as of 2026-11-06 (A F13); re-check it is still there, or drop that bullet.
5. The old-site numbers (17.5 MB, 13 hosts, 52 s) are from 2026-11-06; re-run `dossier/the-sandhya/make-old-site.sh` if sending much later.
6. Fee amounts: none are stated. Agree them before any reply that asks.
