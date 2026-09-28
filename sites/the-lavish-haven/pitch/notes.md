# Pitch notes — The Lavish Haven

writer 0.2.0 · run `2026-09-ahangama-02` (`mode: test`, nothing sent) · 2026-09-25

Files: `index.html` (proposal page), `message.en.whatsapp.md` (528 chars), `in-person.en.md`, this file, and 4 screenshots taken by me on 2026-09-25 with headless Chrome (Playwright): `before-booking-390.jpg` (102 KB), `after-390-top.jpg` (62 KB), `after-390-photos.jpg` (89 KB), `after-1440-top.jpg` (63 KB).

Decisions given by Shahar for this run, not re-derived: channels WhatsApp + in person; English only (the dossier's `languages.owner_language_hint` is `si`, overridden by instruction, so no `[needs native check]`); no fee amounts; no domain promised; the preview is noindexed.

Abbreviations: **D** = `dossier/the-lavish-haven/dossier.json`; **CR2** = `reports/2026-09-ahangama-02/the-lavish-haven.md`, "Full round 2" (critic 0.3.2, pass 91.5); **DJ** = `sites/the-lavish-haven/deploy.json`; **SEO** / **AISEO** = `sites/the-lavish-haven/seo-report.md` / `aiseo-report.md`; **CMS** = `cms/app/src/collections/Sites.ts`; **PB** = `playbook.md`; **PLAN** = `PLAN.md`; **SHOT** = my own screenshot of 2026-09-25.

## Claims → sources

| # | Claim (where) | Source |
|---|---|---|
| 1 | The Lavish Haven has no website of its own / no website and no social media account (page, in-person) | D `existing_site.url` null; `existing_site.notes` "No website and no social account found"; D `gaps[existing_site.url]` |
| 2 | We built it only from public listings (page, WhatsApp, in-person) | D (every value carries `source_url`); CR2 dim 1: 60 rows, 0 unsourced; DJ `seed.evidence.source` (content.json built from the dossier) |
| 3 | Preview URL `https://the-lavish-haven.os1.workers.dev/` (all three) | DJ `deploy.evidence.url`, `live.url`; opened 2026-09-25: HTTP 200 |
| 4 | Private preview; search engines told not to list it; not on Google (all three) | DJ `live.noindex: true`, `verify.liveAfter.noindex: true`; live HTML 2026-09-25 has `<meta name="robots" content="noindex, nofollow">`; CR2 dim 7 (robots.txt Disallow) |
| 5 | Guests find Booking.com, Agoda, Tripadvisor, Google Maps (page) | D `contact.socials` (tripadvisor, google_maps, booking, agoda); D `booking.other_engines` |
| 6 | 9.3 / 10 from 34 reviews on Booking.com, 5.0 / 5 from 21 on Google, read 25 September 2026 (page, in-person) | D `reviews.booking` (9.3, 10, 34), `reviews.google` (5.0, 21), `fetched_at` 2026-09-25 (refreshed by the orchestrator); same values live on the preview |
| 7 | (removed 2026-09-25: the "9.2 then 9.3" confirm item — the site now shows 9.3) | — |
| 8 | No price list, WhatsApp number or email found published (page, in-person) | D `gaps[offers]`, `gaps[contact.whatsapp]`, `gaps[contact.email]` (all `pitch_point: true`); DJ `seed.evidence.gaps`. **2026-09-28:** check-in/check-out times removed from this claim and from the page's "what you could add" list: the harvester's re-fetch found them in Booking's house rules (D `stayInfo`; `gaps[stayInfo]` closed), and the site now shows them |
| 9 | Nine room types (page, WhatsApp, in-person) | D `room_types[0–8]`; CR2 facts "Nine kinds of room", 9 room rows |
| 10 | Your photos (page, WhatsApp, in-person) | DJ `seed.evidence.licence` "business-owned photographs only (dossier assets)"; CR2 "all 10 `license: business-owned`" |
| 11 | Guests' own words, word for word, with the guest's name; 5 quotes (page, WhatsApp, in-person) | CR2 dim 1: 5 testimonials = D `reviews.quotes[0,4,3,6,7]` by string equality, authors too |
| 12 | The beach and the wave (page) | D `location.spot` (thesurfatlas.com), `location.distance_to_beach`; CR2 facts table |
| 13 | "Check dates" on every screen / stays on screen while scrolling, opens your Booking.com page (page, WhatsApp, in-person) | CR2 dim 3 (bar's "Check dates" → one navigation to `https://www.booking.com/hotel/lk/the-lavish-haven.html`; JS off goes straight there); SHOT `after-390-photos.jpg` and my scrolled captures show the bar fixed at the top |
| 14 | Agoda and your phone number are on the page too (page) | CR2 dim 1 hrefs: Agoda ×2, `tel:+94764832988` ×2 |
| 15 | Every link checked against your listings (page) | CR2 dim 1 "Each is identical to the dossier"; dim 3 |
| 16 | 0.42 s for the main content of the first screen, slow mobile connection simulated; target 2.5 s (page); "under half a second" (in-person) | CR2 dim 2 and budget table: LCP 424 / 420 / 424 ms at 390×844, 1.6 Mbps, 150 ms RTT, 4× CPU; target PB §4 LCP ≤ 2.5 s. Headless Chromium, no real phone (stated in CR2) |
| 17 | 589 KB first load, under the 1.5 MB limit (page) | CR2 budget table: 589 030 B, 12 requests; PB §4 ≤ 1.5 MB |
| 18 | 60 of 60 facts checked; nothing made up; unpublished facts left out (page) | CR2 dim 1 "60 rows, 60 match, 0 mismatch, 0 unsourced"; CR2 facts table last row "absent as required: prices, check-in times…". **2026-09-28:** the page's example now reads "like prices" only (check-in times are on the site) |
| 19 | 25 amenities, as the Booking.com listing gives them (page) | D `facilities` (26 rows, all `source_url` booking.com); CR2: 25 shown, CCTV omitted |
| 20 | 0 accessibility errors, automated check, WCAG 2.1 AA, phone and laptop (page) | CR2 dim 6: axe-core 4.13.0, WCAG 2.0/2.1 A+AA, 0 violations at 390 and 1440 |
| 21 | Every button at least 44 px (page) | CR2 dim 6: 17 page targets, 0 under 44 px; drawer targets ≥ 44 |
| 22 | Live Kabalana wave forecast, loads only when scrolled to (page) | CR2 "Rosa forecast" section: `spot=kabalana`, 0 third-party requests on first load, loads when the panel is near |
| 23 | Name, address, phone and rooms marked up for search engines and AI assistants, once public (page) | SEO "Structured data" (JSON-LD `Hotel`, address, telephone, `containsPlace` 9 rooms); AISEO (`llms.txt`); DJ noindex (hence "once public") |
| 24 | A WhatsApp number can be saved in the login; showing it as a button is a design change we make (page, in-person) | CMS `contact.whatsapp` field exists (optional, schema v0.7); the Lavish template (`sites/the-lavish-haven/final/src/`) never renders `contact.whatsapp` — checked by the orchestrator 2026-09-25, which corrected an earlier claim that a button appears automatically |
| 25 | No description written by the owner online; Booking.com's is its own summary (page) | D `business.description.note` "Booking.com's own generated summary, NOT the owner's copy"; D `gaps[business.description]` |
| 26 | Guests can also message you directly (page) | Consequence of #24; today the only booking path is the OTAs: D `booking.path` "engine" |
| 27 | Own login; the admin only shows The Lavish Haven (page, WhatsApp, in-person) | DJ `provision` (owner user, tenant 3); DJ `verify`: `ownerSitesVisible: 1`, other tenants' sites 404 |
| 28 | Fields, not code; an edit can't break the design; design and technical setup stay fixed (page, in-person) | PB §9 "without touching code, and without being able to break the layout"; "Not owner-editable: layout, styles, scripts, fonts, SEO plumbing" |
| 29 | A saved change was live 17 seconds later in our test (page, in-person) | DJ `verify.edit.saveToLiveMs: 17079` (field `copyBlocks[0].body`), `saveStatus: 200`; restore 14 692 ms |
| 30 | Admin tabs: Basics, Text, Opening hours, Prices, Photos, Rooms & stay, Lessons, Rentals & shop, Amenities, Surf, Reviews, Contact & booking, and what each holds (page) | CMS tab labels lines 76–399 and their fields (e.g. Rooms & stay has `checkInFrom/To`, `checkOutFrom/To`; Contact & booking has phone, whatsapp, email, address, mapUrl, bookingLinks) |
| 31 | Lessons and Rentals & shop are left empty for a hotel (page) | CMS tab descriptions ("For surf schools and camps. Leave empty otherwise." / "For board rental, surf shops and shapers…"); DJ `seed.evidence.gaps` includes lessons, rentals |
| 32 | Ratings and quotes copied word for word; owner can remove, not add or edit; new ones added by us (page) | CMS `Reviews` tab description "You can delete a row; new rows are added by Oneshot."; hook `evidenceRowsDeleteOnly(['ratings','testimonials'])`; DJ `verify.ownerAddsRating: 400` |
| 33 | House number: Google No166/1 Walhengoda Road, Booking.com 166/2 Welhengoda Road; site follows Google (page, in-person) | D `location.address`, `address_other_platforms[1]`, `contradictions[3]`; SHOT `before-booking-390.jpg` shows "166/2 Welhengoda Road" on the visible Booking page |
| 34 | Name: Google "The Lavish Haven Hotel And Resort", Booking.com "The Lavish Haven"; site uses the short one (page, in-person) | D `business.name.note`; SEO "Still wrong" 1 |
| 35 | Once public, AI assistants are allowed to read it by default; can be blocked (page, in-person) | AISEO "Crawler policy (owner decision, must be confirmed)": default allow all, one-line edit to block |
| 36 | The offer: managed (monthly fee, hosting/updates/backups ours, recommended) or self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, they carry updates and backups) (page, in-person) | PLAN §1 "Commercial default", "Hosting modes"; PLAN §5 writer; writer base.md constraint 2; `run.yaml` `hosting.default_mode: managed`. Fee amounts: none exist (Shahar's instruction) → "agreed with you" |
| 37 | Self-hosted = the same site and editor on their own server (page) | PLAN §1 `self_hosted_docker`: single-tenant Payload + Postgres + Astro builder + Caddy on the client's VPS |
| 38 | Preview address for now; if they own a web address we connect it (page) | writer base.md constraint 3; PLAN §1 "Domains"; no domain promised |
| 39 | Reply to the WhatsApp message or in person; no obligation; preview stays private until they decide (page, WhatsApp) | Shahar's instruction (no published channel of ours); DJ noindex |
| 40 | Owner named Amal by guests, unconfirmed (in-person, internal note only) | D `business.staff` "Amal and his daughters; receptionist Pramodee", note "named by guest reviews… unconfirmed" |
| 41 | "A new hotel, two minutes from Kabalana" quoted from the preview (in-person) | Preview tagline; CR2 facts row 2 (D `since` note, `location.distance_to_beach`) |
| 42 | +94 76 483 2988 is the number to message (WhatsApp file, in-person) | D `contact.phone` (Google). WhatsApp on it is **not** confirmed (D `contact.whatsapp` gap) |
| 43 | Footer: facts from Booking.com, Google Maps, Agoda listings and a public surf guide, read 19–25 September 2026 (page) | D `fetched_at` 2026-09-19 / 2026-09-23; D `location.spot` source thesurfatlas.com; SHOTs 2026-09-25 |

**43 claims, 43 sourced, 0 unsourced.** One (#7) is sourced only to my screenshot, not the dossier, and is used only as "we will update it".

## Images

All four are my own screenshots (writer base.md constraint 6). The "after" shots show the owner's photos exactly as the preview shows them. The "before" shot is the public Booking.com page on a phone; it contains Booking.com's logo and UI as found. No dossier photo is embedded directly.

Not captured: **Google Maps.** Headless Chrome was sent to a generic Maps view with an "Open the Google Maps app?" modal and "No reviews", which is not this listing and would mislead. Skipped; the page describes it in words. Tripadvisor 403s automated clients (D `gaps[reviews.tripadvisor]`); not tried.

## Static check (before handing off)

- Preview: `curl` → 200, 62 805 B, `noindex, nofollow` present (2026-09-25).
- `index.html`: inline CSS, system font stack (no web font), 4 local `.jpg` files, no `<script>`. Served from `python3 -m http.server` on localhost and loaded in headless Chrome at 390 and 1440 with a full scroll and every request logged: 5 requests each (the page + 4 images), **0 to any host other than localhost**, 0 console errors, 0 horizontal overflow.
- Message: 528 characters ≤ 600.

## Weak spots in the pitch (dossier gaps)

- No WhatsApp and no email published, so the site's only booking path is the OTAs plus the phone, and there is no direct-booking number to show.
- No prices, no owner-written description, no tagline of the owner's: the "what you can add" list is long because of this.
- Owner's name unconfirmed (guest reviews only); the WhatsApp number is not confirmed to be on WhatsApp.
- Booking.com score moved from 9.2 to 9.3 since the harvest; fixed on 2026-09-25 (dossier, site, pitch).
- House number 166/1 vs 166/2 and Google's longer name are unresolved.
