# Pitch notes: global-surf-adventures (run 2026-09-globalsurf-02, writer 0.2.1, 2026-10-05)

Channels: WhatsApp + email (assumed: the two channels the business publishes, `contact.whatsapp` and `contact.email`; the run file names none). Language: English for the messages and the page. The owner is Israeli (`owner_language_hint` = `he` is correct), but Shahar prefers an English pitch (2026-10-05); the first draft was Hebrew. Run `mode: test`: nothing sent, nothing deployed by the writer.

Short names: D = `dossier/global-surf-adventures/dossier.json`; A = `dossier/global-surf-adventures/audit.json` (findings F1–F10) / `audit.md`; CR = `reports/2026-09-globalsurf-02/global-surf-adventures.critic-final.md`; VR = `….visual-final.md`; ER = `….experience-final.md`; AI = `sites/global-surf-adventures/aiseo-report.md`; SEO = `sites/global-surf-adventures/seo-report.md`; FN = `sites/global-surf-adventures/final/notes.md`; ST = `cms/app/src/collections/Sites.ts`; SC = `schemas/site-content.md`; L = the last `ledger.jsonl` line for this slug (2026-10-05T09:58:01Z, the static preview deploy); P = `PLAN.md`. H = index.html, W = WhatsApp message, E = email.

There is no `sites/global-surf-adventures/deploy.json`: station 6 was not run (L; Shahar, 2026-10-05: the CMS/hosting decision comes after the client chooses the product). The preview URL comes from L instead.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | 8.6/10 on Booking.com, 80 reviews, read 28 Sep 2026 | H, W, E | D `reviews.booking` {rating 8.6, count 80, fetched_at 2026-09-28T17:26:22Z} |
| 2 | The lodge shares globalsurf.com with the other destinations (four others) | H, W, E | D `business.businessType_note` (Sri Lanka, Maldives, Morocco, Angola, Mozambique); A F4 |
| 3 | We built a site for the lodge alone; globalsurf.com and the other destinations stay as they are | H | D `business.businessType_note` ("The site we build is the lodge's"); L (only the preview Worker was deployed) |
| 4 | Built from their pages, photos, videos, booking engine and guests' reviews | H, E | CR facts table (sources: D site, engine, Booking.com, Google); CR "32 photo ids … all business-owned; 7 video stems … all business-owned" |
| 5 | Preview URL https://global-surf-lodge-kabalana.os1.workers.dev/ | H, W, E | L note; opened 2026-10-05 → 200 (home and /book/) |
| 6 | Private preview, search engines told not to list it | H, E | L ("noindex, robots Disallow all"); live HTML `<meta name="robots" content="noindex, nofollow">` (curl, 2026-10-05) |
| 7 | Old first phone screen: "Tailor-Made Surf Trips Like Never Before" over a reef from another destination; lodge is the fourth carousel card after Angola, Mozambique, Maldives | H | A F4 `what_a_visitor_meets`; screenshot `before-home-390.jpg` (= A evidence `funnel/landing-fold.png`) |
| 8 | Messenger bubble over the first screen of every page (home, lodge, level, contact) | H | A F6; visible in `before-home-390.jpg` |
| 9 | Old booking button: one tap leaves the site for the engine front page with one "Sri Lanka" card; package lost; lodge "BOOK YOUR STAY", Level 2/3, Freestylers use the same links; home button lands on the same card | H, W, E | A F1, F3; `before-engine-390.jpg` (= `funnel/walk-05-level-one-cta-engine-fold.png`, byte-identical to `walk-02-home-cta-engine-fold.png`, same sha256 in `media/global-surf-adventures.tsv`) |
| 10 | No price on any of the 30 pages read; engine package list shows none; price only after package + guests + a Saturday (five steps) | H, W, E | A F2 (`pages_crawled` 30; click path: button, Sri Lanka, package, guests, start date); `before-packages-390.jpg` (= `funnel/walk-10-engine-sri-lanka-list-fold.png`) |
| 11 | WhatsApp: 22 × 24 px "What'sup" icon in the footer, 3,795 px down home, 7,332 px down the lodge page | H | A F5; `before-whatsapp-390.jpg` (crop of `funnel/landing-mobile.png`, y 7464–7784) |
| 12 | Old home page 8.9 MB on a phone, 19 outside hosts, one run, 28 Sep 2026 | H | D `existing_site.measurements[0]` (8,902,146 B, 19 third-party hosts, mobile, 2026-09-28T17:24Z). A F7 is not a pitch point (no screenshot shows bytes); A F7 `notes` allows citing the dossier measurement |
| 13 | New: 506 KB first load, 0 outside requests, slowed phone test, 5 Oct 2026; main content in 0.44 s | H | CR "Measured" (506 KB, 11 requests; third-party on load 0; LCP 436 ms; throttled 390). Measured on the local build; L: live index.html byte-identical to local dist |
| 14 | "From $1,466 pp \| 7 nights" on every level card and in a bar at the bottom of the phone screen after the first scroll | H, W, E | CR facts row 1; ER "The walk" (bar present from the first scroll to the footer); `after-390-levels.jpg` |
| 15 | $1,466 per person, 7 nights, as the engine showed it on 28 Sep 2026 | H, E | D `offers[0–2].price` 1466 USD, unit "per person, 7 nights (base price)", fetched 2026-09-28T17:06:10Z |
| 16 | One tap from the first screen to the lodge's own booking page (level, room, dates and guests, total) | H, E | CR funnel table (`hero_action.clicks_to_flow` 1); `after-390-book.jpg` (progress bar) |
| 17 | Eight taps to the Bookinglayer page with package, guests, start date and 7 nights filled in | H, W, E | CR funnel ("8 at 390 live, 1440 live, 390 blocked, 360×640"; hand-off lands on the engine's accommodation step with "Guests: 2" and "Duration 7 nights"; URL carries the product and `start`). Not claimed: the room (the engine asks again, CR) |
| 18 | Level buttons open the booking page with that level chosen | H | CR booking walk ("Level CTAs: `book/?level=level-N-…#room`") |
| 19 | WhatsApp is a full-size button with the packages, at the end of the page and in the footer, next to the phone | H, E | `final/dist/index.html`: wa.me links in `#levels` (Freestylers), `.closing`, `footer#contact` (+ `tel:` in the footer), checked 2026-10-05; CR "tap targets < 44 px: 0" |
| 20 | On the booking page's last step the WhatsApp message names the lodge, level, date, nights, guests and room | H, E | CR "WhatsApp prefill on Total" (verbatim message) |
| 21 | Nothing covers the page: no chat widget, no pop-up, no tracker | H | CR measured (third-party on load 0; "Embeds: 1", Rosa, lazy); playbook §4; VR first-screen description |
| 22 | Every button and link ≥ 44 px; booking works with JavaScript off | H | CR measured ("tap targets < 44 px 0/0 … at 390, 1440 and 360"); CR booking walk "JS off (fix 4)" |
| 23 | Their own videos and photographs only | H, E | CR "Images: 32 photo ids used, all business-owned; 7 video stems … all business-owned; no stock/ folder" |
| 24 | Booking page reads live prices and free dates from the engine when the guest uses it | H | CR booking walk ("live calendar", "Live price from the booking engine"; "engine calls on load 0") |
| 25 | Three room types from the engine (mixed dorm, shared twin, deluxe double), with photos and what each adds to the price | H | CR facts (Dorm, Twin +$140/+$80, Deluxe +$418); D `rooms_engine`; FN schema gaps (room galleries) |
| 26 | Surf forecast for South Point by Rosa | H | CR delivery ("Forecast for South Point by Rosa") |
| 27 | Every fact checked: 0 mismatches | H | CR d1 ("0 mismatches and 0 unsourced") |
| 28 | 8.6 shown with count and date; nine quotes verbatim with names, seven Booking.com, two from their own site | H, E | CR facts ("9/9 verbatim; 7 Booking.com, 2 from the business's own site"); `after-390-guests.jpg` |
| 29 | Today no login exists; the preview is a finished build | H | L ("No tenant, no owner login, no domain. Station 6 not run") |
| 30 | With managed or self-hosted: own login, admin shows only the lodge; fields, not code; Publish → the site rebuilds | H, E | P §1 (tenant-scoped login; publish flow; self-hosted rebuild-on-save); ST `afterChange: publishAfterChange` |
| 31 | Editable list: name, tagline, closing line; welcome, the week, rooms intro, getting here; hero video + still, level clips, gallery photos; package names + from-price; check-in/out; reviews; spot text + forecast toggle; phone, WhatsApp, email, address, map link, booking links | H, E | FN "Editable (owner, Payload)"; ST tabs (Basics, Text, Photos & video, Lessons, Rooms & stay, Reviews, Surf, Contact & booking) |
| 32 | Upload from a phone; the site makes the sizes | H | playbook §9; SC v0.9 (the build makes the video renditions), FN make-media step 5 (`scripts/photos.mjs`) |
| 33 | Reviews: owner can remove; we add new ones | H | ST `evidenceRowsDeleteOnly(['ratings','testimonials'])` |
| 34 | Layout, colours, fonts fixed | H | playbook §9 "Not owner-editable" |
| 35 | No field yet for room galleries/descriptions, level one-liners, inclusion lists, booking fallback dates/prices; we change those | H | FN "Schema gaps (… not owner-editable until the schema grows)"; `final/src/gaps/gaps.json` |
| 36 | Offer: managed (recommended; monthly fee agreed with them; hosting, updates, backups ours); self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, they carry updates/backups); files only (if they never edit; changes need a developer). Nothing set up yet. | H, W, E | P §1 "Hosting modes", P §5 writer; writer base.md hard constraint 2; run.yaml `hosting.default_mode: managed`; orchestrator brief 2026-10-05 (Shahar: the client selects the product). No fee amounts exist. W and E name only managed and self-hosted (see "For the human") |
| 37 | Domain: if they want one they already own, we connect it | H | writer base.md hard constraint 3; P §1 Domains |
| 38 | The preview uses WhatsApp +972 52 359 3240 and phone +972 9 973 3943; Google lists +94 77 077 6747 | H | D `contact.whatsapp`, `contact.phone`, `contact.phone_lodge`; CR booking walk (wa.me/972523593240, tel:+97299733943); SEO open item 2 |
| 39 | Name: preview "Global Surf Lodge Kabalana" (their site, Booking.com); Google "Global Surf Lodge" | H | D `business.name.note`; SEO open item 2 |
| 40 | Prices read 28 and 29 Sep 2026; site and engine list different inclusions (yoga, spa, filmed sessions); preview shows only items both list | H | D `offers[].fetched_at` (28 Sep), `rooms_engine` supplements (29 Sep); D `contradictions[2]`; A F9; FN facts ("offers includes_engine ∩ includes_site") |
| 41 | Rooms described differently by site, engine and Booking.com; preview shows the engine's three | H | D `contradictions` (room mix; twin bed configuration); CR facts (Dorm/Twin/Deluxe) |
| 42 | AI assistants may read and quote the site; keep, or block the training crawlers | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 43 | Season, team and spot details not found published | H | D `gaps[]` pitch_point: season, team, location.spot detail |
| 44 | Screenshots of globalsurf.com and the engine: ours, phone-size, 28 Sep 2026; preview shots 5 Oct 2026 | H | A (walk 2026-09-28T17:59Z, 390×844); `make-pitch-media.sh` (preview captured 2026-10-05) |
| 45 | Reply to the WhatsApp message or the email | H, W, E | The two channels in this file's header |

**45 claims, 45 sourced, 0 unsourced.**

Not claimed on purpose: that the WhatsApp or phone reaches the lodge (open owner question, A F5, D `contradictions[0]`); the old site's LCP (measured unthrottled, not comparable); "more bookings"; a time from Publish to live (no `deploy.json`, no measured round trip); that the room choice carries into the engine (it does not, CR); A F7–F10 as findings (not pitch points), except the F7 measurement as allowed.

## Images

All made by `make-pitch-media.sh` (recipe, `# media:` headers; listed in `media/global-surf-adventures.tsv`). The before images are crops/re-encodes of the auditor's 2026-09-28 captures (`dossier/global-surf-adventures/funnel/*.png`, `local` media restored from `~/.oneshot/assets`; sha256 matched the manifest). The dossier's own old-site screenshots (`existing_site.screenshots`, `assets/old-site-*.png`) are not on disk or in the store, so they were not used. The after images are the live preview at 390×844 @2x and 1440×900, reduced motion on (hero poster).

## Language

- `message.en.whatsapp.md` and `message.en.email.md` are in English: the owner is Israeli (`dossier.languages.owner_language_hint` = `he`, correct), but Shahar prefers an English pitch (2026-10-05). Same facts and offer as the first, Hebrew, draft.

## Checks before handoff (2026-10-05)

- Preview https://global-surf-lodge-kabalana.os1.workers.dev/ → 200, `/book/` → 200 (curl); `noindex, nofollow` present.
- Old-site screenshots present: 4 (`before-*.jpg`), from the audit's own captures.
- WhatsApp message: **583 characters** (≤ 600), English, contains the preview link. Email version present.
- `index.html` static check: served by `python3 -m http.server` on 127.0.0.1, loaded and fully scrolled in Playwright at 390×844, 1440×900 and 360×640: **10 requests, all to 127.0.0.1, 0 external**; 0 console errors; 0 broken images; 0 px horizontal overflow. Inline CSS, system fonts, no scripts, favicon `data:,`. Ten JPEGs, 15–129 KB.

## For the human before sending

- **Offer, three options vs two.** The page lists managed, self-hosted and files-only, per the orchestrator's brief (Shahar, 2026-10-05: the client selects the product). Writer base.md hard constraint 2 says `static_only` is mentioned only if the owner says they never intend to edit. The messages name only the two. Drop the "Files only" sentence from the page if base.md should win.
- **No fee amounts anywhere.** "How much?" has no number yet.
- **Proposal page live** (2026-10-17, Oneshot account, version 6d50d5c2): https://global-surf-lodge-kabalana-proposal.os1.workers.dev — 200, images 200, live `index.html` byte-identical to this folder's, noindex + robots `Disallow`. The email carries the link.
- **Who receives it.** WhatsApp +972523593240 is the HQ mobile the site publishes; email info@globalsurf.com. The +94 lodge phone (Google only) is not the target.
- **Video editing depends on the CMS version.** The page promises the owner can replace the hero video and clips (SC v0.8/v0.9, ST `heroVideo`/`videos`). L says the shared CMS running today (0.7.0) has no video support; the managed option needs the video-capable CMS deployed first.
- **Prices** were read 28–29 Sep 2026; the page asks the owner to confirm them before go-live.
- Not claimed: "live on Google" (noindex); a domain purchase; a Publish-to-live time.
