# Pitch notes: global-surf-adventures-v2 (run 2026-10-globalsurf-03, writer 0.4.0, 2026-10-17)

Channels: WhatsApp + email (the two the business publishes, `contact.whatsapp` and `contact.email`; the run file names none). Language: English (writer base.md rule 5). Run `mode: test`: nothing sent. Shape follows v1's pitch (`sites/global-surf-adventures/pitch/`); every v2-specific claim was re-sourced against the v2 build and its station-5 reports.

Short names: D = `dossier/global-surf-adventures-v2/dossier.json`; A = `dossier/global-surf-adventures-v2/audit.json` (findings F1–F10; byte-identical to v1's, forked at copy_passed); CV = `reports/2026-10-globalsurf-03/global-surf-adventures-v2.critic-verification-1.md`; CF = `….critic-final.md`; EV = `….experience-verification-1.md`; FN = `sites/global-surf-adventures-v2/final/notes.md`; AI = `sites/global-surf-adventures-v2/aiseo-report.md`; SEO = `sites/global-surf-adventures-v2/seo-report.md`; DIST = `sites/global-surf-adventures-v2/final/dist/index.html` (the deployed build); L = the `passed → previewed` ledger line for this slug (2026-10-17, version ac8bc564); P = `PLAN.md`. H = index.html, W = WhatsApp message, E = email.

## Claims → sources

| # | Claim | Where | Source |
|---|---|---|---|
| 1 | 8.6/10 on Booking.com, 80 reviews, read 28 Sep 2026 | H, W, E | D `reviews.booking` {rating 8.6, count 80, fetched_at 2026-09-28T17:26:22Z} |
| 2 | The lodge shares globalsurf.com with the other destinations (four others) | H, W, E | D `business.businessType_note`; A F4 |
| 3 | A site for the lodge alone; globalsurf.com and the other destinations unchanged | H | L (only the preview Worker was deployed) |
| 4 | Built from their pages, photos, videos, booking engine and guests' reviews | H, E | CF d1 (sources: D site, engine, Booking.com, Google); FN "images": all business-owned, no stock |
| 5 | Preview URL https://global-surf-lodge-kabalana-v2.os1.workers.dev/ | H, W, E | L note; opened 2026-10-17 → 200 |
| 6 | Private preview, search engines told not to list it | H, E | L (noindex, robots Disallow, no sitemap); live `<meta name="robots" content="noindex, nofollow">` |
| 7 | Old first phone screen: "Tailor-Made Surf Trips Like Never Before" over another destination's reef; lodge is the fourth carousel card | H | A F4; `before-home-390.jpg` (= A evidence `funnel/landing-fold.png`) |
| 8 | Messenger bubble over the first screen of home, lodge, level, contact pages | H | A F6; visible in `before-home-390.jpg` |
| 9 | Old booking button loses the package (engine front page, one "Sri Lanka" card; same links on lodge, Level 2/3, Freestylers, home) | H, W, E | A F1, F3; `before-engine-390.jpg` (= `funnel/walk-05-level-one-cta-engine-fold.png`) |
| 10 | No price on the 30 pages read; engine list shows none; price after five steps | H, W, E | A F2 (`pages_crawled` 30; click path); `before-packages-390.jpg` |
| 11 | WhatsApp: 22 × 24 px "What'sup" icon, 3,795 px down home, 7,332 px down the lodge page | H | A F5; `before-whatsapp-390.jpg` (crop of `funnel/landing-mobile.png`, y 7464–7784) |
| 12 | Old home page 8.9 MB, 19 outside hosts, one phone run, 28 Sep 2026 | H | D `existing_site.measurements[0]`; A F7 notes allow citing it |
| 13 | New: 478 KB first load, 0 outside requests, slowed phone test, 17 Oct 2026; main content in under half a second; video after that | H | CV d2 + budget table (478 KB, 0 third-party, LCP 468–472 ms, hero video after first paint) |
| 14 | "From $1,466 pp \| 7 nights" on every level and in a bar at the bottom after the first scroll | H | CV d4 (persistent bar from `mobile-01`); `after-390-levels.jpg` |
| 15 | $1,466 pp, 7 nights, as the engine showed it on 28 Sep 2026 | H, E | D `offers[0–2].price` 1466 USD, fetched 2026-09-28 |
| 16 | Hero "Book package now" opens a booking panel on the page (level, room, dates and guests, total) | H, E | CV d3 (drawer at `/book/`); FN 4g table (concepts C3); `after-390-book.jpg` |
| 17 | Two taps from the first screen to the Bookinglayer page for that package with start date, check-out date and guests | H, W, E | CV d3 ("2 taps (limit 8)"; hand-off `…/level-1-fomies?start=2026-10-24&end=2026-10-31&female=1&male=0&couple=0`). Not claimed: the room (not in the URL) |
| 18 | Level buttons open the panel with that level chosen | H | CF d6 / FN checks ("Choose Level 2" → drawer, Level 2 checked) |
| 19 | WhatsApp full-size button in the menu, beside the B&B (Freestylers) package, at the end of the page, in the footer next to the phone | H, E | DIST: wa.me links in the menu sheet (`.sheet .acts2`), `section.incl .fs` (Freestylers), the closing `.acts`, the footer `.stack` with `tel:+97299733943`; checked 2026-10-17 |
| 20 | Prefilled message: "Hi Global Surf Lodge Kabalana, I have a question about the surf packages." | H, E | DIST wa.me `text=` (decoded); CF booking walk |
| 21 | Nothing covers the page: no chat widget, pop-up or tracker | H | CV d7 (0 third-party on load; one lazy embed, Rosa) |
| 22 | Every button and link ≥ 44 px; booking works with JS off | H | CV d6 (audit tap targets < 44 px: 0); CV d3 (JS-off GET form sends `start` + `end`). Not claimed for the stepper number fields (42 × 32, CV d6) |
| 23 | Rating under "Choose your level"; nine quotes verbatim with names, seven Booking.com, two from their own site | H, E | CV d4 (rating at `mobile-01`); CF d1 (9/9 verbatim; two globalsurf.com); `after-390-levels.jpg`, `after-390-guests.jpg` |
| 24 | First screen: drone video of the lodge, "Sri Lanka's south coast, all levels" | H, E | FN 4g (hero = vid-009, the lodge from the air; A `recommended.notes`); CV d4 (subtitle); `after-390-top.jpg` |
| 25 | The descent: from above the roofs into the pool, three of their own photographs, ends on the water with "Footwear is discouraged. Chilling out is inescapable." | H, E | FN (plates img-062, 026, 005, business-owned; focal points on open pool water); CV screenshots (`mobile-06…09`); DIST featureLine; `after-390-drop.jpg`, `after-1440-drop.jpg` |
| 26 | On a slow phone it waits for the photographs, so the whole descent plays; reduced motion → still photographs | H | EV §1 ("Fixed": stage ready before the reader arrives, full sequence plays); FN fix pass (p0 remap); CV d6 (reduced motion: 0 video, photographs visible) |
| 27 | Booking panel has its own address and works without JavaScript; Saturdays as the engine showed on 29 Sep 2026, past ones dropped | H, H(confirm) | FN 4g table (`book/` URL, JS-off path); FN gaps ("Saturdays are the 29 Sep 2026 snapshot, past ones dropped at build and at runtime") |
| 28 | Three engine room types, with photos and what each adds | H | CF d1 (+$140 / +$80 / +$418 pp, `rooms_engine` 29 Sep); FN images (room photos) |
| 29 | Surf forecast for South Point by Rosa | H | CV d7 |
| 30 | Every fact checked, 0 mismatches | H | CV d1 ("No mismatches"); CF d1 |
| 31 | No login today; with managed/self-hosted: own login, lodge-only admin, fields not code, Publish rebuilds | H, E | L (no tenant/login); P §1 (tenant-scoped login, publish flow) |
| 32 | Editable list (Basics incl. the line over the pool; Text incl. "Surf, breakfast, surf again"; hero video + still, level clips, the descent's three photos, gallery; packages; check-in/out, amenities; reviews; spot + forecast; contact and booking links) | H, E | FN "editable (owner, after a CMS sale)" |
| 33 | For the descent the owner marks the landing spot with a click | H | FN conflicts 1 (schema v0.10 media `focalX`/`focalY`, "set in the CMS by clicking the photo"); `cms/app/src/payload-types.ts` `focalX` |
| 34 | Upload from a phone; the site makes the sizes | H | playbook §9; FN build (`photos.mjs`, publisher video step) |
| 35 | Reviews: owner removes, we add | H | `cms/app/src/collections/Sites.ts` l.72 `evidenceRowsDeleteOnly(['ratings', 'testimonials'])` |
| 36 | No field yet: room galleries and supplements, inclusions, level one-liners, main title, logo, social links, the panel's Saturdays | H | FN "Not editable (gap)" |
| 37 | Offer: managed (recommended; monthly fee agreed; hosting, updates, backups ours); self-hosted (one-time fee, fully theirs, ~$6–12/month to their host, updates/backups theirs); files only (no editor, changes need a developer). Nothing set up yet. | H, E | writer base.md hard constraint 2; P §1 hosting modes; run.yaml `hosting.default_mode: managed`. No fee amounts exist |
| 38 | Domain: we connect one they already own | H | writer base.md hard constraint 3 |
| 39 | Numbers: preview uses +972 52 359 3240 (WhatsApp) and +972 9 973 3943; Google lists +94 77 077 6747 | H | D `contact.whatsapp`, `contact.phone`, `contact.phone_lodge`; SEO open item 2 |
| 40 | Name: "Global Surf Lodge Kabalana" (site, Booking.com) vs Google "Global Surf Lodge" | H | D `business.name.note`; SEO open item 2 |
| 41 | Prices 28–29 Sep 2026; inclusions differ (yoga, spa, filmed sessions); preview shows the overlap | H | D `offers[].fetched_at`, `rooms_engine`; D `contradictions`; A F9 |
| 42 | Rooms differ across site, engine, Booking.com; preview shows the engine's three | H | D `contradictions`; CF d1 |
| 43 | AI assistants: keep, or block the training crawlers | H | AI "Crawler policy (owner decision, must be confirmed)" |
| 44 | Season, team, spot details not found | H | D `gaps[]` pitch_point: season, team, location.spot detail |
| 45 | Proposal page URL https://global-surf-lodge-kabalana-v2-proposal.os1.workers.dev | W, E | `wrangler deploy` 2026-10-17, version 5b4593ce-20dd-4ad4-8bc8-03ca1b987677; verified below |
| 46 | Screenshot dates: globalsurf.com/engine ours 28 Sep 2026; preview 17 Oct 2026 | H | A (walk 2026-09-28, 390×844); `make-pitch-media.sh` run 2026-10-17 |

**46 claims, 46 sourced, 0 unsourced.**

Not claimed on purpose: that the WhatsApp or phone reaches the lodge (owner question, A F5); live engine prices or dates (v2 has none: FN "Not done"; v1's pitch claimed a live calendar for v1's build); that the room carries into the engine; "more bookings"; a Publish-to-live time; the old site's LCP.

## Images

All made by `make-pitch-media.sh` (`# media:` headers; manifest `media/global-surf-adventures-v2.tsv`). Before: crops of the auditor's 2026-09-28 captures. v2's `funnel/` holds only the JSON (the audit was copied, not re-run), so the recipe reads the PNGs from `dossier/global-surf-adventures/funnel/` (restored from the store with `node tools/media.mjs restore global-surf-adventures`). After: the live v2 preview, 390×844 @2x and 1440×900; reduced motion for the first screens, levels, guests and the booking panel; motion on for the two descent frames (stage `.ready`, 30 % into the run).

## Checks before handoff (2026-10-17)

- Preview https://global-surf-lodge-kabalana-v2.os1.workers.dev/ → 200 (and every file of `dist/`, see L).
- Old-site screenshots present: 4 (`before-*.jpg`).
- WhatsApp message **554 characters** (≤ 600), English, with the preview and the proposal link. Email present, with both links.
- `index.html` static check: `python3 -m http.server` on 127.0.0.1, full scroll in Playwright at 390×844, 1440×900, 360×640: 12 requests, **0 external**, 0 console errors, 0 broken images, 0 px horizontal overflow. Inline CSS, system fonts, no scripts.
- Proposal page live: `https://global-surf-lodge-kabalana-v2-proposal.os1.workers.dev`, Worker `global-surf-lodge-kabalana-v2-proposal` (v1's `global-surf-lodge-kabalana-proposal` untouched, still 200), version 5b4593ce-20dd-4ad4-8bc8-03ca1b987677. `index.html`, `robots.txt` and all 11 JPEGs → 200 and `cmp`-identical to this folder (index sha256 5d05117c…); `noindex, nofollow` present; robots `Disallow: /`. `.assetsignore` keeps notes, messages, recipe and config off the Worker (each → 404).

## For the human before sending

- **Two pitches for one business.** v1 (`global-surf-lodge-kabalana[-proposal]`) and v2 (`global-surf-lodge-kabalana-v2[-proposal]`) are both live. Send one; the v2 messages link only v2.
- **WhatsApp message has no offer line** (it would pass 600 characters with both links); the offer is in the email and on the page.
- **No fee amounts anywhere.**
- **Who receives it.** WhatsApp +972523593240 (HQ mobile the site publishes); email info@globalsurf.com.
- **Prices and Saturdays** are the 28–29 Sep 2026 snapshot; the page asks the owner to confirm them.
- **The proposal's descent frame** is one still; the motion itself is only seen on the preview.
