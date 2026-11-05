# Coconut Surf Inn: final site (station 4g)

designer 0.7.1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05 · a port of `mockups/unique/` ("Round the clock").

Alon picked unique at gate b (ledger `mocked → picked`, agent human). He made one tweak before the pick, and it was approved: the first screen uses calm's view-from-the-roof frame of img-009 (see `mockups/unique/notes.md`, "Human tweak before the pick"). The port keeps the mockup's order:
1. the first screen;
2. 13:00, check-in;
3. six kinds of room;
4. inside the house;
5. the clock set-piece;
6. today on Coconuts (Rosa);
7. 11:00, check-out;
8. getting here;
9. the closing;
10. the footer.

The port also keeps `rooms/`, the "Find your room" page for visitors without JS. It fixes only the six known defects from the 4f round-2 reports (below).

## Build

```
npm install                  # astro 7.3.3 + sharp 0.35.4 (node_modules is git-ignored)
bash scripts/make-media.sh   # the seed (no Payload tenant before a sale) + every media file
npm run build                # photos step + astro build → dist/index.html, dist/rooms/index.html, robots.txt, llms.txt
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → photos → build
SITE_URL=https://<domain>/ npm run build   # the production build (canonical, og:image, sitemap); without it, a preview
```

Before you build:
- Run `tools/link-assets.sh coconut-surf-inn-guest-house-and-restaurant` so the dossier assets are linked.
- If your npm cache has root-owned files, use `npm install --cache <dir>`.

Nothing is deployed: `wrangler.jsonc` is for station 6.

Every media file is git-ignored and made by `scripts/make-media.sh`. Its `# media:` headers cover:
- `src/tenant/media` (13 originals, unchanged from the dossier);
- `src/gaps/media` (20 room slides);
- `public/photos` (48 crops).

The fonts in `public/fonts/` are not media. They are Red Hat Text (variable) and Caveat 600, the same latin woff2 files the mockup loaded from fonts.gstatic.com, self-hosted with their OFL licences, as on the other finals.

| Path | What |
|---|---|
| `src/pages/index.astro` | The home page. Its markup and class names are `mockups/unique/src/build.py`'s, bound to content. 4g changes are commented |
| `src/pages/rooms/index.astro` | `rooms/`, the no-JS "Find your room" page (the mockup's `dist/rooms/index.html`) |
| `src/lib/parts.mjs` | Parts both pages share: buttons, header, footer, phone bar, room rows, fonts, the head script |
| `src/styles/site.css`, `src/scripts/site.js` | The mockup's `page.css` / `page.js`, inlined as in the mockup. Changes are marked `4g` |
| `src/lib/site.mjs` | Content plumbing: escaping, ratings, reviews, rooms, photos by slot, horizons, Rosa, and SEO (IS_PREVIEW, JSON-LD, the OG image) |
| `src/lib/slots.mjs` | Which `photos[]` row sits where, and the crops: the mockup's `make-media.sh` boxes, written as slack fractions and zooms |
| `src/lib/labels.json`, `src/lib/icons.mjs` | Template wording (the mockup's interface labels) and the mockup's stroke icons |
| `src/tenant/content.json` | The seed, in Payload's REST shape (schema v0.10). `npm run fetch` replaces it after a sale |
| `src/gaps/gaps.json` | SCHEMA GAP content (below). It survives a fetch |
| `scripts/*` | `make-media.sh`, `seed-from-dossier.mjs`, `photos.mjs` and `fetch-tenant.mjs`. The last is from `sites/cheeky-monkey/final` and downloads `rooms[].photo` |
| `src/pages/robots.txt.js`, `[sitemap].xml.js`, `llms.txt.js` | The other finals' plumbing, with the same IS_PREVIEW rule. The sitemap lists `/` and `rooms/` |

## The six 4f fixes

| # | Defect (4f round 2) | What changed | Checked |
|---|---|---|---|
| 1 | "See today's forecast" could not be tapped with Rosa down. A failed iframe at opacity 0 covered it (critic dim 7) | The widget frame is created only after a HEAD request to `rosa.surf/widget/` answers OK. A cross-origin frame fires `load` even on Chrome's error page, which is why the check comes first. Until the frame loads it is `pointer-events:none`. With no answer in 10 s, or on a frame error, it is removed. The no-cors probe is gone, so the block makes 1 JSON GET, 1 HEAD and 1 frame | With Rosa blocked, at 390 (touch) and 1440: 0 iframes; `elementFromPoint` is the link; a tap requests `https://rosa.surf/spot/weligama-west`. The headline's plain link shows too (`.stale`). With Rosa live, the box gets `.loaded`, the headline is drawn, and there are 0 third-party requests on load |
| 2 | At 768 the clock kept the desktop 3-column split: the title broke and the photo was a sliver (visual fix 1) | The stacked phone layout of the set-piece (photo, dial, text) now runs to 1023 px. The reading line in `site.js` follows. At 768–1023 the photo is `50svh + 52px` high and the text 32 px in, up to 620 px wide | 768 / 900 / 1023: the pinned media is full width × 564 px, with no overflow. 1024 keeps the desktop split (597 × 960) |
| 3 | A/C rooms opened on bed close-ups (experience) | Each A/C room now opens on its widest photograph, all tied to the room by dossier `images[].room_types` (asserted by the seed): Superior on img-037 (the room seen whole; was img-035, the towel), the 2 + 1 on img-036 (the carved bed and the dresser; was img-040), the family room on img-045 (wide-angle, both beds; was img-031). The balcony room already opened wide on img-076. The other slides keep their order | desktop-02/03 and mobile-03/04 are the only big pixel differences (below) |
| 4 | On the phone, set-piece titles were half cut under the pinned photo's fade (experience; inspector covered-text) | Once the photo is pinned, a block's title and sub-title fade out over the 12 px before they reach the white fade. Nothing fades at rest, because a block's text sits 40 px below the photo | Scrolled through `#stay` in 23 px steps: 0 of 134 steps at 390 and 0 of 126 at 768 show a title with opacity > 0.02 under the photo or its fade. axe has 0 violations at rest |
| 5 | The closing line ran 4 lines at 390 (visual fix 4) | Phone size `clamp(26px, 8.3vw, 34px)` (was 38 px) | 3 lines at 320, 360, 390 and 430; 2 lines at 767. The phone page is 56 px shorter (12,774 px, was 12,830) |
| 6 | LCP 1.7 s on the throttled phone | Fonts are self-hosted (no gstatic connection). Both hero crops are preloaded per media query ahead of the inline CSS, with `fetchpriority=high`. The look is unchanged | `audit-mockup`: LCP **460 ms** and **456 ms** (two runs; the mockup measured 1,672) |

## Port comparison (`tools/shoot.mjs`, both over http: the mockup on :8923, the final on :8970)

**Text and attributes.** I extracted the visible text, every `alt`, every `aria-label`, every `href` and every heading from both pages, with JS on and with JS off, and diffed them. `rooms/` was diffed the same way with JS off.
- The text is identical, except that the Rosa headline values were blocked in this run. They are live data, and the mockup inlined a fixture.
- Alts, labels and links are identical apart from the photo file names and the three new lead slides (fix 3).
- `rooms/` is identical. The one exception is its bar's "Find your room" link, which is `./` instead of `../rooms/` (the same page).

**Pixels** (mean difference on a 255 scale, per capture):
- Desktop is 11,786 px in both, in 15 captures.
- The phone is 12,774 px against 12,830 (fix 5).
- Most captures differ by 0–3: WebP encoder noise (sharp instead of ffmpeg + cwebp) and the hero grade, re-made in sharp (desktop-00 2.3, mobile-00 2.2).
- desktop-02/03 and mobile-03/04 differ by 14–23. That is fix 3: the room leads.
- desktop-10 and mobile-14 differ by 3–4. That is the Rosa headline: today's live values against the mockup's fixture.
- mobile-07…10 differ by 2–6. That is fix 4: the titles fade before they pass under the photo. Wipe frames also differ by timing.
- mobile-15/16 differ by 8–12. That is fix 5, and the 56 px shorter page.

### Visible differences from the mockup, and why
1. **Room leads** (fix 3): Superior, the 2 + 1 and the family room open on a different photograph.
2. **The set-piece at 768–1023 px** (fix 2) is stacked: photo, dial, then text. Before, it was the 3-column split.
3. **Set-piece titles on phone and tablet** (fix 4) fade out over 12 px just before the pinned photo, instead of sliding half cut under its fade.
4. **The phone closing line** (fix 5) is 26–34 px (was 38), in 3 lines.
5. **The Rosa headline** is drawn live, and its lines stay reserved (hidden) until the JSON arrives. On a failed or stale fetch, the plain link replaces it. The mockup showed inlined fixture values first.
6. **The hero grade** is sharp's linear + modulate instead of ffmpeg's `eq` + `curves`, within a mean of 2.3 / 255.
7. **Not visible:** the `<title>` is "Coconut Surf Inn, Weligama" (the finals' rule: name and the town of the address); the meta description uses owner fields only; the JSON-LD has no `aggregateRating` (Shahar's no-ratings-markup rule).

## Performance (`tools/audit-mockup.mjs coconut-surf-inn-guest-house-and-restaurant ../final`, throttled phone 390×844, 1.6 Mbps / 150 ms / 4× CPU, no scroll): `audit.json`

| Item | Target | Measured |
|---|---|---|
| First-load transfer (no video) | ≤ 1.5 MB | **373 KB** (381,661 B in 8 requests). HTML 107 KB raw (24.9 KB gzip, CSS and JS inline), fonts 81 KB, images 193 KB |
| Hero video | – | none: no usable video (vid-001 is third-party, vid-002 shows the pre-renovation building, vid-003 is another business's film) |
| JS, compressed | ≤ 300 KB | 0 external; inline, 18.5 KB raw (site.js) |
| Largest above-the-fold image | ≤ 300 KB | 66 KB desktop hero (1440); the phone gets the 27 KB 560 × 1100 crop. The largest image on first load is 76 KB (a room slide inside the lazy distance) |
| Fonts | ≤ 2 families, ≤ 150 KB | Red Hat Text (variable 400–600) + Caveat 600, 81 KB, self-hosted, preloaded, `font-display: swap`, with the mockup's metric-matched fallbacks |
| LCP | ≤ 2.5 s | **460 ms** / 456 ms (mockup: 1,672 ms) |
| CLS (load) | < 0.1 | 0.0012 |
| Scroll CLS, early / settled | < 0.01 | 0.0012 / 0 |
| Third-party requests on load | 0 | **0** |

## Checks (4g)

| Check | Result |
|---|---|
| `npm run build` | **pass**: 2 pages (`index.html` 107,551 B, `rooms/index.html` 60,430 B), `robots.txt`, `llms.txt`, no sitemap on a preview |
| `tools/check-design.mjs sites/coconut-surf-inn-guest-house-and-restaurant/final/dist/index.html` | **ok**, 0 problems, 0 warnings. h1/h2 Caveat, body Red Hat Text, ground #fff, 0 all-caps labels, 0/25 labelled headings |
| `tools/check-places.mjs coconut-surf-inn-guest-house-and-restaurant` | **ok**, 0 borrowed images. The seed refuses any image that is not `business-owned`, and any room slide not tied to its room by `images[].room_types` |
| axe-core (WCAG 2.0/2.1 A + AA), after a full scroll, external requests blocked | **0 violations** on `/` and `rooms/`, at 390 and at 1440 |
| Keyboard | `/`: 57 tab stops at 390 and 89+ at 1440. `rooms/`: 22 / 23. The skip link is first, and 0 stops are invisible. The "Find your room" dialog: focus lands on "1 Just me"; "2" lists Balcony, Superior, 2 + 1 and Budget Double; Esc closes it and returns focus to "Find your room". The audit's own keyboard check passes |
| JS off | No overflow at 320, 360, 390, 768, 1024 or 1440. The forecast is the plain link in both halves. The bar is static. Room slides come from `<noscript>`. "Find your room" goes to `rooms/` |
| Reduced motion | No pin and the canvas hidden. The five moments are stacked blocks, each with its photograph (5 visible) |
| Cold load, Rosa blocked | Every request goes to localhost; on load, 0 go anywhere else. The Rosa requests happen only near the block, and when they fail the link is visible and tappable (fix 1) |
| Booking | 20 links on `/`, all `https://www.booking.com/hotel/lk/coconut-surf-inn-weligama.en-gb.html` = `dossier.booking.engine_url` (the seed asserts it). All 6 `tel:` links are `tel:+94778921396` = `dossier.contact.phone`. The audit tapped the hero button and landed on the engine URL |
| `tools/funnel.mjs http://localhost:8970/ --depth 3` | `clicks_to_book` **1**; `primary_action` **engine** "Check dates on Booking.com"; `hero_action` **engine**, `clicks_to_flow` 0; CTA above the fold; 2 pages, 0 broken. Output in the scratchpad, not the repo |
| IS_PREVIEW | No SITE_URL: `noindex, nofollow` on both pages, robots `Disallow: /` (plus the named AI crawlers), no sitemap, llms.txt says "Preview build". With `SITE_URL=https://coconutsurfinn.example/`: no noindex, canonical set, `Allow: /` with a `Sitemap:` line, and `sitemap.xml` lists `/` and `rooms/` |
| Rosa spot | Only `weligama-west` appears on the page; `coconut-beach` appears 0 times. The seed fails on any other id |

Served for review: `dist/` on **http://0.0.0.0:8970/** by a small rebuild-safe node static server (scratchpad `coconut/serve.mjs`), left running.

## editable (owner, after a CMS sale)

| Admin tab | Field | Where it shows |
|---|---|---|
| Basics | `businessName` | wordmark, h1, footer, `<title>` |
| Basics | `tagline` | opens the 13:00 paragraph; the hero line is its first words (gap `heroLine`); meta description |
| Basics | `closing` | the closing script line; the 13:00 paragraph's last sentence; "Not sure" in the overlay and on `rooms/` |
| Text | `copyBlocks` offer 0 | "Six kinds of room" title + line |
| Text | `copyBlocks` about 0–3, intro 0, info 0 | the clock's sub-titles and bodies (Eranga family / restaurant / roof / by the beach), "Inside the house", "Getting here" |
| Opening hours | `hoursNote` | 13:00 paragraph, "Until 22:00" block, footer |
| Photos & video | `photos[0–12]` by position (`src/lib/slots.mjs`) | 0 first screen · 1–5 clock frames · 6–11 inside the house · 12 the sign. A focal point set in the admin moves the crop, and on a clock frame it also sets the wipe's horizon |
| Rooms & stay | `rooms[]` label, beds, sleeps, note, photo | the room cards (in the admin's order), the overlay, `rooms/` (by sleeps); `photo` is the first slide |
| Rooms & stay | `stayInfo.checkInFrom` / `checkOutTo` / `note` | "13:00, check-in", "11:00, check-out", the stay line under the rooms |
| Amenities | `amenities[]` | "At the house" |
| Surf | `spot`, `season`, `forecast.enabled` / `spotName` (`rosaSpotId` deployer-only) | the break block, the 13:00 paragraph, "Today on Coconuts" |
| Reviews | `ratings[]`, `testimonials[]` (deployer) | the two rating rows; the two set-piece quotes and the guests slideshow |
| Contact & booking | `contact.phone`, `address`, `mapUrl`, `bookingLinks[0]` | every Call, Map and booking button |

## schema gaps (`src/gaps/gaps.json`; the template binds only to existing fields)

| Gap | What the design needs | What the build does now |
|---|---|---|
| `heroLine` (concepts §6) | a short first-screen line | "A guesthouse in Gurubebila, between Midigama and Weligama", the tagline's first words. The seed asserts it, and the template falls back to the full tagline if they diverge |
| `rooms[].photos[]` | room slideshows | `rooms[].photo` holds the first slide; `roomGalleries` lists the other 20 slides by room label (files in `src/gaps/media/`) |
| `rooms[].features` | the "A/C \| Hot water" / "Fan" chips | `roomFeature`, from dossier `room_types[].air_conditioning`, checked against each room's note |
| restaurant hours | the clock's "Until 22:00" / "From 7:30" | `restaurantHours`, parsed from `hoursNote` (the seed fails if the sentence changes shape) |
| testimonial placement | the two quotes inside the set-piece | `momentQuotes`, by author: Erin (afternoon) and Janno (7:30). Each review shows once |
| geo | JSON-LD `geo` | `geo`, the Google pin from dossier `location.lat_lng` (`contact.mapUrl` is a place_id URL with no pin) |
| other names and listings (4h) | JSON-LD `alternateName` and extra `sameAs` | `listings`: Google's listing name "Coconut Surf Inn Guest House and Restaurant" (dossier `business.google_listing_name`) and the Tripadvisor entity d7744329 (dossier `contact.socials.tripadvisor`). Never shown on the page; see `../seo-report.md` |

The clock moments' titles and ticks ("The afternoon", "Sunset", "The break"…) and the chip words are template labels.

## Facts

The page text is the mockup's, which the 4f critic checked against the dossier (rounds 1–2: 0 mismatches, 12/12 quotes verbatim). Each value now comes from a field: ratings (8.5/10 · 142 Booking.com, 4.8/5 · 88 Google, 4.44/5 · 54 Airbnb, all read 4 Nov 2026) ← `ratings[]` ← dossier `reviews.*`. The 4.8 is the **inn's** Google listing (88), never the "Coconut Beach" place (4.8/120). The page also carries rooms ← `room_types[]`, check-in/out ← `stay_info`, 7:30–22:00 ← `restaurant_hours`, the address ← `location.address` (Google), the phone and the engine URL (asserted), and the spot and season ← `break` / `season`. The Rosa numbers are live third-party data, credited "Forecast for Coconuts by Rosa", and never content.

## images

All are `business-owned` Booking.com / Airbnb property uploads. They are cropped and never enlarged, with the mockup's alt text (written from each photograph). The crops are as in `mockups/unique/notes.md` "images", except the three new room leads (fix 3).

## conflicts

None blocking.
1. The first screen and the break frame are two `photos[]` rows pointing at the same media (img-009), so an owner can change one without the other. It costs one row; 13 of 24 are used.
2. The set-piece horizons are per slot (`hz` in `slots.mjs`). An owner who replaces a clock photo without setting a focal point keeps the old horizon, which may not match the new photo; the wipe still works, centred within .38–.62.
3. The phone/tablet title fade (fix 4) is a small addition to the design: it is visible only for the 12 px of scroll before a title reaches the pinned photo.

## other businesses in this run

- **Cheeky Monkey** (unique, "Pick your board") is a drone reel in a surfboard window, Permanent Marker lettering on beach colours, with a plan drawer.
- **Lotus Surf House** (calm, "The gate") is a carved gate in a split on white, in Parisienne with a brick-red button.
- **This page** opens full-bleed on the sea from the roof, with a Caveat title and an ink-black button. It moves through a day in one pinned window with the sign's sun as the hour marker, and it carries the forecast for its own break.

They share no layout, type, colour or section order.

## ledger note (`picked → built`, for the orchestrator)

Unique "Round the clock" is ported to Astro (`sites/coconut-surf-inn-guest-house-and-restaurant/final`), with Alon's calm hero. It matches the mockup apart from the six 4f fixes:
- Rosa link tappable when Rosa is down;
- the stacked set-piece below 1024 px;
- the widest room leads;
- no half-cut titles;
- the closing in 3 lines;
- LCP 460 ms (was 1.7 s).

First load is 373 KB, JS is inline, 0 third-party requests. check-design, check-places and axe are clean. Funnel: engine, 1 tap.
