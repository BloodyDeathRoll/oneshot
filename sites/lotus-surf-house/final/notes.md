# Lotus Surf House: final site (station 4g)

designer 0.7.1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-04 · a port of `mockups/calm/` ("The gate").

Alon picked calm at gate b (ledger `mocked → picked`, agent human): *"for lotus surf house, i like the calm mockup. the first photo is great, but use the attached photos in the top areas, show the king room first, its the nicest."* His three photographs are img-021 (the roof Buddha), img-025 (the balcony view) and img-002 (the King Room). The mockup was revised to his words (look rounds 7–9 in `mockups/calm/notes.md`), and he approved the revision on 2026-11-04: *"yes, go for calm. looks good. well done."*

The port keeps his order:
1. the gate hero (img-019);
2. the King Room img-002, full-bleed;
3. img-025 with the King facts and Book / Call, then the four-photo strip;
4. the roof (img-021);
5. at a glance (the two dated ratings);
6. the compact garden rooms;
7. Yelum and breakfast, guests, getting here, the closing, the footer.

The design direction is unchanged.

## Build

```
npm install                  # astro 7.3.3 + sharp 0.35.4 into this folder (node_modules is git-ignored)
bash scripts/make-media.sh   # the seed (no Payload tenant before a sale) + every media file
npm run build                # photos step + astro build → dist/index.html, robots.txt, llms.txt
npm run build:cms            # after a sale with a CMS: fetch-tenant → publisher video step → photos → build
SITE_URL=https://<domain>/ npm run build   # the production build (canonical, og:image, sitemap); without it, a preview
```

Before you build:
- Run `tools/link-assets.sh lotus-surf-house` so the dossier assets are linked.
- If your npm cache has root-owned files, use `npm install --cache <dir>`. This machine has them.

Nothing is deployed: `wrangler.jsonc` is for station 6.

Every media file is git-ignored and made by `scripts/make-media.sh`. Its `# media:` headers cover:
- `src/tenant/media` (the 18 originals, copied unchanged from the dossier);
- `public/photos` (the crops).

The fonts in `public/fonts/` are not media. They are the Google Fonts latin woff2 files, self-hosted, with their OFL licences, and they are committed the way cheeky-monkey's are.

| Path | What |
|---|---|
| `src/pages/index.astro` | The home page. Its markup and class names are `mockups/calm/src/build.py`'s, line for line, bound to content. 4g changes are commented |
| `src/styles/site.css`, `src/scripts/site.js` | The mockup's `page.css` / `page.js`, inlined as in the mockup. CSS changes are marked `4g` (listed below). The JS is unchanged |
| `src/lib/site.mjs` | Content plumbing: escaping, rooms, ratings, photos by slot, the hero video, and SEO (IS_PREVIEW, JSON-LD, the OG image) |
| `src/lib/slots.mjs` | Which `photos[]` row sits where, and the crops. The crops are the mockup's `make-media.sh` crops, written as centres |
| `src/lib/labels.json`, `src/lib/icons.mjs` | Template wording (the mockup's interface labels) and the mockup's stroke icons |
| `src/tenant/content.json` | The seed, in Payload's REST shape (schema v0.10). `npm run fetch` replaces it after a sale |
| `src/gaps/gaps.json` | SCHEMA GAP content (below). It survives a fetch |
| `scripts/*` | `make-media.sh`, `seed-from-dossier.mjs`, `photos.mjs`, `fetch-tenant.mjs` (the last is plumbing from `sites/cheeky-monkey/final`) |
| `src/pages/robots.txt.js`, `[sitemap].xml.js`, `llms.txt.js` | The other finals' plumbing, including the IS_PREVIEW rule (checked below) |

## Port comparison (`tools/shoot.mjs`, both pages over http, shot the same day)

I shot the mockup (:8913, byte-identical to `mockups/calm/dist/index.html`) and the final (:8960) the same way and diffed them pixel by pixel, capture by capture.

**Text and attributes.** I extracted the visible text, every `alt`, every `aria-label` and every `href` from both pages and diffed them. The text is identical, line for line. Every alt, aria-label and link is identical too. The only differences are the font URLs (Google → `fonts/`) and the hero `src` path.

**Desktop, 1440.** Page height is 8,558 px for both, in 11 captures. The mean pixel difference per capture is 0–1.8 on a 255 scale, and at most 1.2 % of pixels differ by more than 24. Those differences are WebP encoder noise: the photos are re-cut by sharp at the mockup's crops and qualities, where the mockup used ffmpeg + cwebp. Nothing moved.

**Phone, 390.** Captures 00–04 differ by 1.2–2.4 mean, which is encoder noise again. The page is now 9,818 px, 26 px shorter than the mockup's 9,844. That is the rating-card fix below: each card lost a wrapped line. Everything after the cards is offset by 26 px, and nothing else changed.

**Hero lift.** The gate's light lift of the leaf shadows was an ffmpeg `curves` filter in the mockup. Here it is sharp `linear(0.97, +0.03)`, which comes within 0.005 of the curve at mid-grey. desktop-00 and mobile-00 differ by a mean of 1.8 and 1.6.

Sheets: `shots/desktop-sheet.png`, `shots/mobile-sheet.png`. These are scratch, for the 4h critic round.

### Visible differences from the mockup, and why

1. **The phone rating cards' meta now sits on two lines** ("Booking.com, 125 reviews" / "3 Nov 2026"), not three.
   - Why: the visual critic (fix 5) and the experience critic (fix 4) both asked for this, and the mockup's round 8 said it was fixed. At 390 it still wrapped "Booking.com, 125 / reviews".
   - Change: the score column is 96 px (was 116) and the meta is 14.5 px and does not wrap.
2. **On focus only**, two things now show (WCAG 2.4.7):
   - the desktop header's nav and "Check dates" button, which are tab stops before the header turns solid;
   - the phone bar, when a keyboard user reaches its links while it is parked below the screen.
   In the mockup these tab stops were invisible: opacity 0 / translateY(110 %). Nothing changes for pointer or touch users.
3. **Under 360 px only:** the hero title, the rating cards, the "Read all 125 reviews" button and the phone bar shrink or wrap. The mockup overflowed by 15 px at 320. Nothing changes at 360 px and up.
4. **Under 409 px only:** "The King Rooms" is capped at 300 px wide.
   - It already sets on two lines there in Parisienne ("The King / Rooms", as in the mockup), so nothing visible changes.
   - The cap makes the Georgia fallback break in the same place. Before, the font swap grew the bottom-anchored King block by a line while it was on screen: early-scroll CLS 0.022 in the first 4g audit.
   - The mockup measured 0.0008 only because Google Fonts arrived after its band had scrolled past. Self-hosted and preloaded fonts arrive sooner.
5. **A metric-matched Arial fallback for Hanken Grotesk** (`size-adjust: 100.2 %`, measured against the web font at 400). This is the same device the mockup used for Parisienne. It is invisible once the font loads.

## Performance (`tools/audit-mockup.mjs lotus-surf-house ../final`, throttled phone 390×844, 1.6 Mbps / 150 ms / 4× CPU, no scroll): `audit.json`

| Item | Target | Measured |
|---|---|---|
| First-load transfer (no video) | ≤ 1.5 MB | **882 KB** (903,341 B in 13 requests): HTML 57.8 KB (14.4 KB gzip, CSS and JS inline), fonts 57 KB, images 789 KB. The images include the lazy photos of the King band, the strip and the roof, which sit inside Chromium's lazy-load distance on a phone (as in the mockup, 911 KB) |
| Hero video | – | none: the dossier has no usable video (all three clips are third-party, licence unknown) |
| JS, compressed | ≤ 300 KB | **≈ 1.1 KB gzip** (2.8 KB raw), inline, no library, 0 JS requests |
| Largest above-the-fold image | ≤ 300 KB | 228 KB (`img-019-full-1200.webp`, the gate; the phone gets the 800 w file from `srcset`) |
| Fonts | ≤ 2 families, ≤ 150 KB | Hanken Grotesk (variable 400–600) + Parisienne, 57 KB, self-hosted, preloaded, `font-display: swap` with metric-matched fallbacks |
| LCP | ≤ 2.5 s | **516 ms** (three runs today: 420–568 ms; the mockup measured 808 ms) |
| CLS (load) | < 0.1 | **0** |
| Scroll CLS, early / settled | < 0.01 | **0.0016 / 0** |
| Third-party requests on load | 0 | **0**, and 0 over a full scroll at 1440 and 390 (only `127.0.0.1:8960` in the request log) |

## Checks (4g)

| Check | Result |
|---|---|
| `npm run build` | **pass**: 1 page, `dist/index.html` 57,837 B, plus `robots.txt` and `llms.txt` (no sitemap on a preview) |
| `tools/check-design.mjs sites/lotus-surf-house/final/dist/index.html` | **ok**, 0 problems, 0 warnings. h1/h2 Parisienne, body Hanken Grotesk, ground `#FFFFFF`, 0 all-caps labels, 0/13 labelled headings |
| `tools/check-places.mjs lotus-surf-house` | **ok**, 0 borrowed images. The final uses only the 18 business-owned Booking.com uploads; the seed refuses any other licence |
| axe-core 4.10.3 (WCAG 2.0/2.1 A + AA), after a full scroll | **0 violations** at 1440 and at 390 |
| Keyboard, 1440 and 390 | 45 / 43 tab stops. The skip link ("Skip to the rooms" → `#upstairs`) is first. 0 stops are invisible after the 4g focus fix, and all show the 2.5 px outline. ArrowRight on the focused garden slideshow moves one slide (scrollLeft 0 → 440 / 350, dot 2 current). Enter on "Next review" shows review 2. There is no drawer, so there is no trap |
| JS off, 1440 and 390 | The same first screen, and `.top` is `position:absolute` (no white wordmark over light sections). The phone bar is shown statically. All 12 reviews are readable. The slideshows are swipeable rows without controls. The hero button is the Booking.com link. 0 overflow |
| Reduced motion, 1440 and 390 | No gate settle (`animation: none`), transitions at 1 ms, 0 video elements. The page is otherwise the same |
| Booking end to end (390, touch) | Tapping the hero "Check dates on Booking.com" requests `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html`, which is `dossier.booking.engine_url.value` character for character (**1 tap**). The phone bar, shown once the hero has gone, lands on the same URL. All 9 Booking.com links on the page are that URL. Every `tel:` is `tel:+94774647541` = `dossier.contact.phone.value`. The seed fails the build if either differs |
| Offline except the local static server | Every request goes to the local server, at 1440 and 390, on load and over a full scroll. There are no relative-root (`/…`) URLs, and filenames are lowercase |
| IS_PREVIEW | No SITE_URL, `https://….workers.dev/` or `http://localhost:4321/`: `<meta name="robots" content="noindex, nofollow">`, robots `Disallow: /` (plus every named AI crawler), no `sitemap.xml`, and llms.txt says "Preview build". `https://lotussurfhouse.lk/` (example): no noindex, canonical + og:image absolute, `Allow: /`, `Sitemap:` line, `sitemap.xml` built |
| Tap targets < 44 px | 20 of 41: the slideshow dots are 24 × 44 px. That meets WCAG 2.5.8's 24 px, as in the mockup, and each slideshow also has 44 px arrows |
| Facts | `audit-mockup` finds 27 numbers. 2 are not in the passed copy: "9.0" (the Booking.com score, `ratings[0].score` printed to one decimal) and "2026." (from "read 3 Nov 2026."). Neither is a new claim |

## editable (owner, after a CMS sale): where each thing on the page is edited

| Admin tab | Field | Where it shows |
|---|---|---|
| Basics | `businessName` | header wordmark, h1, footer script name, `<title>` |
| Basics | `tagline` | the hero line under the name; meta description; llms.txt |
| Basics | `closing` | the closing script line above the last Book / Call |
| Text | `copyBlocks` intro 0 ("In the garden") | garden title + lede |
| Text | `copyBlocks` offer 0 ("Old rooms and new") | ¶1 = Yelum's quote beside the garden lede; ¶2 = the line on the King band |
| Text | `copyBlocks` about 0 / 1 / 2 | Yelum, Breakfast (the porch), Up on the roof |
| Text | `copyBlocks` info 0 ("Getting here") | Getting here |
| Photos & video | `photos[]` rows 0–17, by position (`src/lib/slots.mjs`) | 0 the gate · 1 the King band · 2 the King photo · 3–6 the strip · 7–9 the roof · 10 the garden · 11–16 the garden-rooms slideshow · 17 the porch. The build crops whatever is uploaded; a focal point set in the admin (v0.10) moves the crop |
| Photos & video | `heroVideo` + `heroVideoPoster` | Optional. When set, the poster replaces the gate and the video plays after first paint (not under reduced motion or Save-Data). There is none today |
| Rooms & stay | `rooms[]` label, beds, sleeps, note | the King block (the row named in gaps `featuredRoom.label`) and the garden list (every other row, with its count) |
| Rooms & stay | `stayInfo.checkOutFrom/To`, `stayInfo.note` | "Check-out 11:00–12:00" under the King buttons; "Good to know" |
| Amenities | `amenities[]` | the line under the address |
| Reviews | `ratings[]` (deployer) | the two dated cards; the "Read all 125 reviews" link; the footer's fine print |
| Reviews | `testimonials[]` (deployer) | the Guests slideshow, in the admin's order |
| Contact & booking | `contact.phone` | every Call button, the phone bar, the footer |
| Contact & booking | `contact.address`, `contact.mapUrl` | Getting here, the footer, "Open in Google Maps" |
| Contact & booking | `bookingLinks[0]` label + url | every booking button (9). The header's short "Check dates" and the footer's host name are template labels |

Not owner-editable, by design: layout, CSS, JS, fonts, labels, the slot crops, and the SEO plumbing.

## schema gaps (bound only to existing fields; the rest is in `src/gaps/gaps.json`)

| Gap | What the design needs | What the build does now |
|---|---|---|
| No floor and no "featured room" on `rooms[]` | The King band sells one room, and the garden block lists the rest | `gaps.featuredRoom` = { label: "King Room with Balcony", title: "The King Rooms", tag: "Upstairs" }. Every other `rooms[]` row goes in the garden list, under `gaps.gardenTag` "Ground floor" + the count |
| No room galleries (`rooms[].photos[]`) | the King strip and the garden-rooms slideshow | bound to `photos[]` by position (slots 1–6 and 11–16). `rooms[].photo` stays null |
| No short-facts field | "Midigama Beach 250 m (Booking.com) \| Breakfast included, 8–10 \| Check-in any hour" | `gaps.glance` (three short restatements of `spot`, the Breakfast block and `stayInfo.note`, each with its source) |
| `stayInfo` cannot say "check-in at any hour"; there is no payment field | "Check-in at any hour \| Cash only" under the King buttons | `gaps.stayShort`, cut from `stayInfo.note`. `checkInFrom` stays null |
| No short hero line (concepts §6) | – | the tagline is the hero line, as in the revised mockup |

Already noted at 4e and unchanged: no price (live Booking.com inventory, never copied), no WhatsApp, no email, no Instagram, no forecast.

## Facts (every checkable claim → field → dossier; the copy's audit is `copy/review.md`)

The page text is identical to the mockup's, which the 4f critic checked against the dossier (0 mismatches, 0 unsourced, all 12 quotes verbatim).

| On the page | Field | Dossier |
|---|---|---|
| 9.0/10, Booking.com, 125 reviews, 3 Nov 2026 · 4.9/5, Google, 78 reviews, 3 Nov 2026 | `ratings[]` | `reviews.booking` / `reviews.google`, `fetched_at` 2026-11-03 |
| Room names, beds, sleeps, m², fan / A/C / hot water | `rooms[]` | `room_types[]`, `room_types_note` |
| Check-out 11:00–12:00; check-in any hour; cash only; children / cots / pets / parking | `stayInfo` | `stay_info` |
| Breakfast 8–10 | copy block "Breakfast" | `stay_info.breakfast_hours` |
| Midigama Beach 250 m; station 50 m; Ahangama 1.4 km, Weligama 4.2 km, Koggala Airport 9 km | `spot`, copy block "Getting here" | `location.*` |
| Indhana Rd, Midigama 80650, Sri Lanka | `contact.address` | `location.address_site_form` (Google) |
| +94 77 464 7541 / `tel:+94774647541` | `contact.phone` | `contact.phone` |
| The Booking.com URL | `bookingLinks[0].url` | `booking.engine_url` (asserted by the seed) |
| 12 guest quotes, author, country, month | `testimonials[]` | `reviews` quote strings, verbatim |
| Amenities list | `amenities[]` | `facilities` |

## images

All 18 are Booking.com property uploads, `business-owned` (`dossier/lotus-surf-house/assets/index.json`). They are cropped only and never enlarged. The alt texts are the mockup's, written from each photograph opened at full size.

| slot | asset | crop | served |
|---|---|---|---|
| 0 | img-019 | whole frame | 800 / 1200 w, light lift |
| 1 | img-002 | whole frame | 960 / 1600 w (drawn ≤ 1440) |
| 2 | img-025 | 4:5 | 840 |
| 3–6 | img-010, 015, 034, 008 | 3:2 | 640 |
| 7 | img-021 | 4:5 | 840 |
| 8–9 | img-022, img-004 | 4:5 | 560 |
| 10 | img-020 | 16:9 | 960 / 1600 |
| 11–16 | img-029, 043, 030, 009, 028, 044 | 4:5 | ≤ 960 (native when smaller) |
| 17 | img-032 | 4:5 below the ceiling line | 840 |

## gaps

As at 4e:
- no price;
- no WhatsApp or email;
- no usable video;
- no beach, wave, breakfast or Yelum photographs;
- no Instagram;
- no forecast (no named break).

## conflicts

None blocking.

1. The King title's 300 px cap under 409 px is tuned to "The King Rooms". It fixes the swap shift for this title and is harmless for others (at worst a fallback line), but it is a content-length assumption in the template.
2. "The King Rooms", "Upstairs" and the glance and stay short forms live in `gaps.json`, not in the schema (above). If the owner edits `spot` or `stayInfo.note`, those short forms do not follow until the gap is closed.

## other businesses in this run

Cheeky Monkey (`sites/cheeky-monkey/final`, unique "Pick your board") opens on its reel inside a surfboard window on beach-coloured grounds, with Permanent Marker lettering and a plan drawer. This page opens on a carved garden gate in a split on white, with a Parisienne sign-script title, a brick-red button and no motion beyond a settle. The two share no layout, type, colour or section order.

## ledger note (`picked → built`, for the orchestrator)

Calm "The gate" ported to Astro (`sites/lotus-surf-house/final`). It matches the mockup pixel for pixel apart from the rating-card, keyboard-focus and narrow-phone fixes, and keeps Alon's order (gate → King Room img-002/img-025 → roof img-021 → garden rooms). First load 882 KB, JS ≈ 1 KB, LCP 516 ms, CLS 0, scroll CLS 0.0016. check-design, check-places and axe are clean, and booking is 1 tap to the dossier's Booking.com URL.
