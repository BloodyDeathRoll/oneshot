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
| Basics | `closing` | the closing sentence (text face) under the template's script title "Come and stay", above the last Book / Call (2026-11-09) |
| Text | `copyBlocks` intro 0 ("In the garden") | garden title + lede |
| Text | `copyBlocks` offer 0 ("Old rooms and new") | ¶1 = Yelum's quote beside the garden lede; ¶2 = the line on the King band |
| Text | `copyBlocks` about 0 / 1 / 2 | Yelum, Breakfast (the porch), Up on the roof |
| Text | `copyBlocks` info 0 ("Getting here") | Getting here |
| Photos & video | `photos[]` rows 0–17, by position (`src/lib/slots.mjs`) | 0 the gate · 1 the King band · 2 the King photo · 3–6 the strip · 7–9 the roof · 10 the garden · 11–16 the garden-rooms slideshow · 17 the porch. The build crops whatever is uploaded; a focal point set in the admin (v0.10) moves the crop |
| Photos & video | `heroVideo` + `heroVideoPoster` | Optional. When set, the poster replaces the gate and the video plays after first paint (not under reduced motion or Save-Data). There is none today |
| Rooms & stay | `rooms[]` label, beds, sleeps, note | the King block (the row named in gaps `featuredRoom.label`) and the garden list (every other row, with its count) |
| Rooms & stay | `stayInfo.checkOutFrom/To`, `stayInfo.note` | "Check-out 11:00–12:00" under the King buttons; "Good to know" |
| Amenities | `amenities[]` | under the address: a two-column list on desktop, a " \| " flow on the phone; rows sharing a note are grouped under it (2026-11-09) |
| Reviews | `ratings[]` (deployer) | the two dated cards; the small dated line under the King facts (2026-11-09); the "Read all 125 reviews" link; the footer's fine print |
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
| 11–16 | img-043, 029, 030, 009, 028, 044 (2026-11-09: img-043 first) | 4:5 | ≤ 960 (native when smaller) |
| 17 | img-032 | 4:5 inside the print border, colour-corrected (2026-11-09, below) | 840 |

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

## 2026-11-04 — the Rosa forecast (Lazy Left), added after critique

**Human decision (Alon, operator, 2026-11-04):** the site carries Rosa's forecast for spot `lazy-left` ("Lazy Left").
The business names no break, which is why the 4e gaps above said "no forecast (no named break)". Lazy Left is the Rosa
spot nearest the Google pin: Rosa's spot (5.963067, 80.390755, `data/index.json`) against `src/gaps/gaps.json` geo
(5.9652192, 80.3922802) is about 290 m. This overrides schema v0.3's "the nearest other spot is never used" on Alon's
say, as on Cheeky Monkey (Rams). So the block never calls Lazy Left the business's own break. It only says "Forecast for
Lazy Left by Rosa". No walking time is stated (none is sourced), and no wave fact is content: the numbers come only from
Rosa's live JSON.

| What | Where |
|---|---|
| `forecast: {enabled: true, rosaSpotId: "lazy-left", spotName: "Lazy Left"}` | `src/tenant/content.json`; `scripts/seed-from-dossier.mjs` carries the same value with the decision in a comment, so a reseed keeps it |
| The block (superseded 2026-11-09: own section `#surf`, no hairline) | `src/pages/index.astro`, at the end of "Getting here" (`#getting-here`), under the address / map / good-to-know grid and above the closing. A hairline (`--line`) separates it from the section's text. It renders nothing unless `enabled` and a valid `rosaSpotId`. Words in `src/lib/labels.json` (`fc_credit`, `fc_link`, `fc_title`) |
| Logic (superseded 2026-11-09, see below: no HEAD gate, link always visible) | `src/scripts/site.js`, ported from `sites/cheeky-monkey/final` (itself from `sites/layday-surf-ahangama/final`). One JSON request when the block is within 400 px of the screen. The headline is drawn only from data under 24 h old. Then the widget gets its `src`, only after a HEAD 200 and the frame's `load`, within 10 s. Otherwise the plain link stays. A failure while the block is still below the screen (`.solo`) drops the empty headline box. In view, the box stays reserved |
| Look (superseded 2026-11-09, see below) | `src/styles/site.css`, in this page's calm language. The headline is a `--tint` card with a 22 px radius, like the rating cards. The credit has the leaf-green wave icon (`wave` and `clock` added to `src/lib/icons.mjs`). The height range is Hanken Grotesk 600 in ink (88 px desktop, 64 px phone), with "m" in muted 400. The time is ink 600, swell and wind are muted, and Rosa's update time is a muted 13.5 px line with the wood clock icon, like `.rday`. Two 420 × 500 boxes sit side by side, centred, at desktop widths. On a phone (≤ 899 px) they stack: card 340 px high, widget box 500 px. The JS-off / failed link sits on the same tint card. Rosa's widget is `theme=light` (white page), embedded exactly as Rosa ships it |
| llms.txt | "Pages" lists `Forecast for Lazy Left by Rosa` → rosa.surf/spot/lazy-left, as on Cheeky Monkey |

Embeds: 1 of 2 (the page has no map iframe; "Open in Google Maps" is a link).

Checks (local preview, `astro preview` on :8960, built with `SITE_URL` unset): `node tools/site-check.mjs lotus-surf-house
--url http://localhost:8960/` gave **PASS** on all checks (video skipped: none). forecast-data: JSON 200, 3.9 h old,
widget 200. forecast-block at 390 / 1440: section height 1984→1984 / 1349→1349, shift 0, headline drawn, iframe set.
Performance: 0 third-party requests on load, CLS 0.0018, LCP 348 ms, 867,428 B first load in 13 requests. A separate
Playwright check at 390 and 1440 found no rosa.surf or rosa-data request on first load, no console errors and no
horizontal overflow. JS off: only the link, in the 420 × 500 box (350 × 500 at 390), no Rosa request. JSON blocked and
stale data (30 h): link shown, no numbers, no widget request, section height unchanged.
Cost: about 3.7 KB gzip of inline HTML (CSS + JS + markup), no new requests on load.

## 2026-11-09: fix round after verification 1 (station 4g)

designer 0.7.1, run `2026-10-midigama-01`, operator alon.

**Why.** Verification 1 (`reports/2026-10-midigama-01/lotus-surf-house{,.visual,.experience}.md`, 2026-11-06) failed the page on dimension 8: visual-critic 7, experience-critic 7; critic 72.8/80; total 86.0. Fixed against the orchestrator's fix list, biggest effect first, inside Alon's gate-b order. That order is unchanged: gate → King band img-002 → img-025 with the facts → strip → roof img-021 → glance → garden rooms → porch → guests → getting here.

### What changed

| # | Fix | Where |
|---|---|---|
| 1 | **Forecast block, redone.** It is now its own section, `#surf`, after Getting here and before the closing (`nav` gains "Surf"). There is no rule above it: the `.fc.live` border-top and its 96 px padding are gone. The pair sits on the page grid: the text column starts at x 144 and Rosa's widget ends at x 1296 at 1440 (measured: text 144–764, widget 876–1296, 420 × 500, unmodified, `theme=light`). The left half is one tight group, vertically centred on the widget: the script title **"Surf at Lazy Left"**, then **"Lazy Left is the Rosa spot nearest the house."**, then Giada's verbatim words with attribution, then the headline card. The card no longer stretches to 500 px: it is 220 px at desktop and 254 px on the phone, credit on top, then "**Latest reading, Mon 9 Nov, 14:30**", the numeral, swell (the mean `period`, as `tools.md` says), wind and Rosa's update time. The plain link "See today's forecast for Lazy Left on Rosa" is always in the card's bottom row. | `index.astro` (`surf`), `site.css` (forecast block), `labels.json` (`fc_heading`, `fc_latest`, `fc_swell`, `fc_wind`, `fc_updated`), `gaps.json` `forecastIntro` (from the seed) |
| 1 | **Loading and failure.** The HEAD-request gate is gone. When the block nears the screen (400 px), the JSON request and Rosa's iframe start independently. The card draws only from data under 24 h old. On failure, stale data or a 10 s timeout, the card's contents give way to the link, which **fills the card at the same height** when the block is on screen. When the failure comes while the block is still below the screen (`.solo`), the card shrinks to the link out of sight. With **JS off**, the card is just the link (112 px) and the widget's box is not drawn at all: no blank grey box and no empty reserved space. A refused or aborted frame leaves Rosa's box as the browser draws it, with the link visible in the card beside or above it. Labels and the JSON URL are `data-*` on the card. | `src/scripts/site.js` |
| 1 | **The mapping** is recorded in `concepts.md` §3 as an amendment dated 2026-11-09. Nothing else in `concepts.md` changed. | `../concepts.md` |
| 2 | **Phone header.** `.top` is `position:absolute` at ≤ 899 px, so it scrolls away with the hero. It held only the wordmark and was already hidden below the hero. That removes the 28 px grey scrim band at the top of every screen below the hero, and the wordmark no longer runs over the hero's Call pill or the rising title. `.top.solid::before` is hidden as well, and `.solid` no longer slides or turns white on the phone. | `site.css` phone block |
| 3 | **Yelum print (img-032)**, kept rather than swapped to img-005, because it is the porch where breakfast is served. The source has a white print border (rows 0–91 and 1296–1388), and the old crop ended in it. The crop box is now 932 × 1165 at 505, 112: clear of both bands and the pillar, all four corners rounded, the left chair whole. A one-photo `tone` warms the lilac wall to white and calms the orange floor (recomb, saturation 0.66, gamma 1.1). It applies only to a source named `img-032*`, so an owner's upload gets no colour change. | `src/lib/slots.mjs` slot 17, `scripts/photos.mjs` (`tone`) |
| 4 | **Separators.** New `pipes()`: each item draws its bar before it inside a clipping box pulled left by one bar, so no line ends (or starts) on a bar. Used for the King stay line and the phone amenities. The amenities are grouped (schema: "the template groups and orders them"): the four rows noted "additional charge" become one line, "**Additional charge:** Airport shuttle, Bicycle rental, Walking tours, Laundry". The other eight are a two-column list on desktop (4 rows) and a " \| " flow on the phone. No row is dropped or reworded. The Guests attribution sets the author on its own line on the phone, so its bar cannot dangle. | `site.mjs` (`pipes`, `AMENITY_GROUPS`), `index.astro`, `site.css` |
| 5 | **Closing.** A short script title, "**Come and stay**" (template label `closing_title`), with the `closing` sentence beneath it in Hanken Grotesk 18/17 px, muted and balanced. | `index.astro`, `site.css`, `labels.json` |
| 6 | **Guests** open on Henry ("after surfing … the local surf spots"), then Svenja ("4 surfspots"); the other ten follow in the copy's order (seed `LEAD_REVIEWS`, order only). A **small dated rating line** sits under the King facts: "9.0/10 Booking.com \| 4.9/5 Google \| read 3 Nov 2026", from the same `ratings[]` rows. The **garden slideshow opens on img-043** (the Deluxe Queen Room with the surfboard), then img-029. The **Yelum / Breakfast run** has its picture inside it on the phone: Yelum, the print, then Breakfast (grid order). Desktop is unchanged (print left, both texts right). | seed `ORDER`, `LEAD_REVIEWS`; `index.astro` (`kproof`, porch markup); `site.css` |
| 7 | **Slider dots** are out of the tab order (`tabindex="-1"`, dot group `aria-hidden`). The 44 px arrows and the track's arrow keys are the keyboard controls, and pointer users can still tap the dots. **Check-in** is said twice, not three times: dropped from the glance line, kept under the King buttons and in Good to know. **JS off:** the hero's text block gets 72 px more bottom padding on the phone, so the static bar no longer covers Call (Call bottom 736, bar top 772 at 390). The desktop subtitle is `text-wrap: balance`: "Sri Lanka" stays together. | `index.astro`, `site.css`, seed `glance` |

Kept, as the critics asked: the gate first screen, the King band, the roof, 1 tap to Booking.com, the facts, every control's existing motion, and Rosa's widget unstyled.

### look-log (fix round)

1. **Round 1, whole page** (`tools/shoot.mjs`, 1440 + 390, plus Playwright captures of each section, 2026-11-09):
   - **Desktop.** The forecast pair reads as one composed block on the grid: script title, one bold sourced line, Giada's quote, and the card with time, numeral and two lines beside it, next to Rosa's widget. There is no rule. The card had about 45 px of air between the update line, so I took it from 236 to 220 px.
   - **Phone.** The amenities picked up the desktop's 32 px `column-gap` as a flex gap, which left a ragged column look. I reset it. Giada's attribution split onto two lines like the Guests one, so that rule is now scoped to `.q`. "Lazy Left is the Rosa spot nearest the house." wrapped to two lines at 18 px, so it is 16.5 px on the phone.
   - **Porch.** The recropped print has four round corners, a warm white wall and a calmer floor, and sits with the greens and woods of the page.
   - **Phone header.** No band at the top of the King band or any later screen, and no wordmark over the hero buttons mid-scroll (captures at 250, 500 and 1800 px).
2. **Round 2, whole page:** after the fixes above. Clean at both widths: no overflow (scrollWidth = innerWidth at 390 and 1440), no text under fixed elements except the phone bar passing over content as it scrolls, as before.

**Against the bar.** The business has no site of its own. Verification 1 found this page already clearly better than the Booking.com and Google listings, and nothing here weakens that. Next to the gold pages it is still "a very good photograph" rather than an idea on the first screen. That is unchanged by this round's scope: the first screen is a "keep".

**Phone length of the forecast block.** It is 1,058 px from the title to the bottom of the widget, against about 925 px before. The headline card itself is shorter (254 against 340 px, it no longer repeats the widget's next row, and the hairline and its 64 + 64 px are gone). But the block now carries the script title, the sourced line and Giada's quote that the critics asked for. Only the card could be shortened. The widget is fixed at 500.

### Checks (2026-11-09, local preview build: `env -u SITE_URL npm run build`, served from `dist/` on 127.0.0.1)

| Check | Result |
|---|---|
| `npm run build` (preview) | pass. `dist/index.html` 73.5 KB, `robots.txt` (Disallow: /, unchanged), `llms.txt` (only the review order changed), no `sitemap.xml`, `noindex, nofollow` present. JSON-LD byte-identical to the live build's |
| `tools/check-design.mjs …/final/dist/index.html` | **ok**, 0 problems, 0 warnings. h1/h2 Parisienne, body Hanken Grotesk, ground #FFFFFF, 0 all-caps labels, 0/15 labelled headings |
| `tools/check-places.mjs lotus-surf-house` | **ok**, 0 borrowed images |
| `tools/site-check.mjs lotus-surf-house --url http://127.0.0.1:8971/ --no-parity` | **PASS**: pages, assets, handoff, forecast-data (JSON 200, 5.4 h old, widget 200), seo, browser, booking, forecast-block, performance; video skipped (none). forecast-block: section height 1058→1058 (390) and 612→612 (1440), shift 0, headline drawn, iframe set. (The first run failed because the probe reads the first 160 characters of the `data-json` element, which was then the whole block; `data-json` moved to the headline card, where it belongs) |
| `tools/audit-mockup.mjs lotus-surf-house ../final` (throttled phone) | first load **897 KB** (918,984 B, 13 requests, 1 host), JS 0 external, LCP **448 ms**, CLS **0**, scroll CLS early **0.0018** / settled **0**, 0 third-party, alt missing 0, largest image 228,380 B, fonts 56,996 B. `audit.json` updated |
| Inspector (`design-taste-frontend/scripts/inspect.mjs`) | 8 FAIL, 5 WARN, down from 9 FAIL. Gone: `hairline` on `.fc.live` and the 3-line closing headline. New: `eyebrow` on "Latest reading, …" above the numeral: kept, because the critics and the fix list asked for a time label on the headline. Unchanged and discounted as in verification 1: "Upstairs" eyebrow, button resting shadow and hover glow, two text-shadows over photographs (legibility scrim), terracotta (both critics accepted it), still-page (calm, no canvas), covered-text (the phone bar passing over "Up on the roof" in scroll), reduced-hidden (the desktop nav waits for the scroll by design), 16 font sizes, no footage (none usable), side-scroll (the slideshows), empty-middle on "In the garden" (unchanged section), name-only title at 768/390 (the tagline under it says what and where). The inspector's own screenshots were deleted |
| axe-core 4.11.4 (WCAG 2.0/2.1 A + AA), after a full scroll, iframes not audited | **0 violations** at 1440 and 390 |
| Keyboard | 30 stops (1440) and 27 (390), all visible once focused. Skip link first, dots 0 (out of the tab order), forecast: credit link → plain link → widget iframe. No trap |
| Failure paths (Playwright, 1440 + 390) | **JS off:** card = the link, 620 × 112 / 350 × 112, no widget box, no Rosa request. **JSON 500** (failed before reaching the screen): `.off.solo`, card 112 px with the link, widget still loads beside it. **Stale (30 h), on screen:** `.off`, card keeps 220/254 px with the link centred, no numbers. **Frame refused** (`frame-ancestors 'none'`): the headline stays, and the link stays visible in the card. All page heights unchanged by the outcome except `.solo` below the screen |
| Booking | unchanged: the hero "Check dates on Booking.com" = `dossier.booking.engine_url` (seed asserts it), every `tel:` = `tel:+94774647541`, 1 tap |
| Text diff, JS off, against the live build | only the intended changes: the "Surf" nav item, the stay line, the King proof line, the glance line without check-in, Henry and Svenja first, the grouped amenities, the forecast section's words, "Come and stay" |

### Facts added this round

| On the page | Source |
|---|---|
| "Lazy Left is the Rosa spot nearest the house." | Alon's mapping (2026-11-04). Rosa `data/index.json` vs dossier `location.lat_lng`: 293 m, nearest of Rosa's spots (`concepts.md` §3 amendment; `gaps.forecastIntro._source`) |
| "The location is perfect to go and surf at lazy left and right" (Giada, Italy, Booking.com, Dec 2025) | dossier `reviews.quotes` (Giada, Italy, 2025-12-13, `…#review-e68a59ddb9111462`), sentence 2, verbatim. The seed fails if it is not a substring of the dossier text. Its trailing " ." is left out, nothing else. Also in `location.spot.note` |
| "9.0/10 Booking.com \| 4.9/5 Google \| read 3 Nov 2026" under the King facts | `ratings[]` (as the cards) |
| "Come and stay", "Surf at Lazy Left", "Latest reading, …" | template labels: no checkable claim |

### Media (no media in git)

- `scripts/make-media.sh` was re-run. It rewrote `src/tenant/media/*` (18 originals, unchanged copies from the dossier) and `public/photos/*` (21 WebP files).
- Changed files: `img-032-r1.25-840.webp` (new crop and tone), plus slots 11/12 swapped (same files, `img-043-r1.25-960.webp` now first). Every other photo is byte-for-byte the same recipe.
- Recipe changes (committed scripts, no new `# media:` globs needed): `src/lib/slots.mjs` slot 17, `scripts/photos.mjs` (the `tone` option), `scripts/seed-from-dossier.mjs` (slideshow order, review order, glance, `forecastIntro`). `dossier/lotus-surf-house/assets/` was not written.

### conflicts (none blocking; for Alon)

1. **New words not passed by the copywriter or copyeditor:** "Surf at Lazy Left", "Lazy Left is the Rosa spot nearest the house.", "Come and stay", "Latest reading, …". The first two follow the orchestrator's fix list and the critics' suggestion. The quote is verbatim. They should go through 4c, or Alon approves them as they are.
2. **The widget now loads independently of the site's JSON.** It also loads when Rosa's JSON is stale or failed. The card then shows only the link, but Rosa's own widget still shows Rosa's days with Rosa's own dates and "Today" label. The alternative, gating the widget on fresh JSON, would leave an empty 420 × 500 box or a layout shift on failure, which the fix list forbids. Alon may prefer the gate.
3. **Amenities "trim":** done by grouping (4 repeated "(additional charge)" notes become one line) and by the two-column list. No row is hidden: the 12 rows are the owner's content (`amenities[]`), and hiding some would be a template overriding the owner. If Alon wants fewer, delete rows in the seed / CMS (CCTV and luggage storage are the obvious ones).
4. **The forecast block on the phone is longer than before** (1,058 vs about 925 px), because it gained the title, line and quote. The card itself is 86 px shorter.
5. The headline's "Latest reading" time can trail the clock by hours (Rosa republishes 4×/day). It is labelled with its time, never "now".
