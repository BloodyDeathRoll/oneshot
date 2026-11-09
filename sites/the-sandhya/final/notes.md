# The Sandhya, final site: calm, "The Artwork" (designer 0.7.1, station 4g)

Run `2026-11-ahangama-01`, operator alon, `mode: test`, 2026-11-09. The pick: ledger `mocked → picked`, `agent: "human"`, 2026-11-09T14:26:36Z. Alon kept **calm only** ("Calm (Recommended)": highest score, 84.0/100, the strongest first screen). Interactive and unique are not built.

Ported from `mockups/calm/src/page.html` + `build.mjs` (the source of `mockups/calm/dist/index.html`) without changing how it looks. The CSS is the mockup's, copied, with each 4g change marked `4g:` in `src/styles/site.css`; the script is the mockup's with the 4g parts marked in `src/scripts/site.js`.

## Build and serve

```
cd sites/the-sandhya/final
npm install                 # astro 7.3.3, sharp 0.35.4, the two Fontsource packages (pinned)
bash scripts/make-media.sh  # the media recipe: uploads, content.json, logos, fonts, renditions
npm run build               # fonts.mjs + photos.mjs + astro build -> dist/
npx astro preview --port <free port>   # or any static server on dist/
```

Needs `tools/link-assets.sh the-sandhya` (the dossier assets) and ffmpeg (logos). `dist/` is plain static files with relative URLs: one `index.html`, `photos/`, `img/`, `fonts/`. No `/_astro/` path, no script or stylesheet file: the CSS and the one script are inline. `wrangler.jsonc` is for the deployer (station 6); nothing was deployed.

## Layout of the project

| Path | What |
|---|---|
| `src/tenant/content.json` | The content, in `schemas/site-content.md` v0.11's shape (`{ tenant, locales: { en: <site> } }`), written by `scripts/seed-from-dossier.mjs` from `copy/en.json` (never retyped) and the dossier's asset index. Payload replaces it after a sale (station 8) |
| `src/gaps/gaps.json` | What the design shows and the schema has no field for (below) |
| `src/lib/layout.mjs` | Template: where each `photos[]` row goes (by position) and how each place is cut (ratio around `focalX`/`focalY`, widths, quality) |
| `src/lib/labels.mjs` | Template: interface labels, per language |
| `src/pages/index.astro` | The page |
| `scripts/make-media.sh` | The media recipe (`# media:` header for every generated file) |
| `scripts/photos.mjs` | The build's photo step: crops, resizes, WebP; refuses a full-bleed photograph under 1200 px |
| `scripts/fonts.mjs` | Copies the two families from the pinned packages into `public/fonts/` (fonts never go in git) |

## look-log (4g)

**Port round 1.** Built, served over http, shot with `tools/shoot.mjs` at 1440 and 390 and put beside `mockups/calm/shots/round-1/` (the 4e last round). The first screen, rooms, feature, Dining, house, Kabalana, Guests, Exclusive Use, twilight and footer match the mockup frame for frame at 1440. The visible differences are the ones asked for (list below). Two flaws: on the phone the arrival lead I had moved to ¶1 made a seven-line slab of large text, and the date fields cut "dd/mm/yyyy" to "dd/mm/yyy" at 390.

**Port round 2.** Arrival is one size at both widths (the visual critic's "one size" taken literally); the fields have 12 px side padding and 16 px type on a phone (16 px keeps iOS from zooming). Reshot: fields read in full at 390, two side by side, stacked below 380 px. `audit-mockup` then showed `scroll.early.cls` 0.034: the self-hosted fonts now arrive at about 1.5 s on the throttled phone, and the script title "Pause, take a deep breath & exhale. You are home." wraps to three lines in the fallback and two in Sacramento, moving the arrival block. A metric-matched local fallback fixed the body text (equal paragraph heights measured) but not the title, so Sacramento (23 KB) is inlined in the page at build time. Now 0.0032 early and 0 settled. Schibsted Grotesk stays a file with a `size-adjust` fallback (`Arial` at 102.5%).

**Fix after 4h (2026-11-09): intermittent early-scroll jump.** The seo agent's ten `audit-mockup` runs found `scroll.early.cls` 0.22 to 0.27 in about one run in five; the single run in `audit.json` had shown 0.0032. Reproduced with a copy of `audit-mockup`'s early pass (390x844, slow 4G, 4x CPU, scroll 0.8 of the screen every 250 ms from DOMContentLoaded): 4 of 10 runs at 0.39 to 0.42, all from one shift at about 4.7 s while the view was at the end of Dining. Cause, mine: the 4g phone reorder of Dining made `.dining-grid` a flex column but kept the desktop grid's `align-items:start`, so the masonry shrank to its content. Before the lazy dishes loaded it was 10 px wide and 52 px high; when they arrived it took the column's width and grew to 403 px, moving `.step-two`, the house photograph (`.bleed`) and everything below by 351 px. It only counted when scroll anchoring did not absorb it, hence one run in four or five. Fix: `align-items:stretch` on that phone column (`src/styles/site.css`), so the masonry is 350 px wide and 403 px high from the first paint. The settled page is unchanged (the masonry ended at full width before too). An explicit aspect-ratio on the photographs was tried first and did not help, and was taken out. After the fix, 12 consecutive runs of the same early pass: 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032, 0.0032 (the 0.0032 is a 1 px text shift at the font swap, at the top of the page).

**Against the old site:** unchanged from the 4e verdict; the first screen is the mockup's, pixel for pixel at 1440.

### Changes from the mockup, each asked for

| Change | Asked by |
|---|---|
| Date fields above the booking section's link (below) | Alon, gate b |
| Slideshow dots 44x44 (were 34x44) | critic, dimension 6 |
| Phone bar is a `<nav aria-label="Book or call">` (axe `region` on `#bar`) | critic, dimension 6 |
| The details row scrolls into view when it takes focus | critic, dimension 6 |
| Amenities closed by default at every width (was open on desktop) | visual critic, fix 2 |
| Arrival text on the page's left line, top level with the doors, one size | visual critic, fix 5 |
| Exclusive Use photograph 16:9 (was 21:10) | visual critic, fix 5 |
| Compact rating line straight after the rooms (same two ratings, same form as the booking section) | experience critic, fix 3 |
| Phone: the dishes straight after Dining ¶1 and ¶2 (CSS order only; the DOM keeps the copy's order) | experience critic, fix 1 |
| Phone: the feature line in the text face at 24 px (was five lines of script) | experience critic, fix 2 |
| Phone: the blue-hour print full width, the sunset overlapping it | experience critic, fix 4 |

Not done, because each is a redesign or needs material we do not have: the Director's Suite as a full-bleed moment and a new ending without the white card (visual critic 2, 3); the desktop feature line in fewer lines (the wall left of the slit is the only place for it); rooms earlier on the page (the concept's order); the phone hero's soft fronds and grey lower third (needs the 8080 px original, mockup conflict 3).

## The date fields (Alon, gate b)

- In the booking section, in the room the 4e mockup left for them: two fields, "Check-in" and "Check-out", directly above "Check rooms and live dates", in the calm look (soft rounded fields on the white card, the text face, no new colour).
- **The links stay real links.** Every engine link on the page (hero, desktop header, the four room buttons, the booking section, the phone bar; marked `data-engine`) is a plain `<a href>` to the dossier's URL, `https://hotels.cloudbeds.com/reservation/WMvA6V` (from `booking.engine_url`, character for character; rooms from `booking.engine_room_links`). With JS off the fields are not shown at all (`hidden`), because only a script can carry them into the link.
- With both dates chosen (check-in today or later, check-out after it), the script appends them in the format the audit saw reach the engine (`audit.json`: `#checkin=2026-12-10&checkout=2026-12-12`) to every engine link: `…/WMvA6V#checkin=YYYY-MM-DD&checkout=YYYY-MM-DD`, and for rooms `…/WMvA6V?rid=53570#checkin=…&checkout=…`. Choosing a check-in fills check-out with the next day. With one date or an invalid pair, every link goes back to its plain href and a line says "Choose both dates, or clear both." No adults parameter: the audit found the adults count is never sent. No date is pre-filled.
- Tested in headless Chromium at 390: 8 links rewritten after both dates, all 8 back to plain after clearing one, same-day pair refused.
- **Nobody has yet seen the engine honour the dates, or `?rid=`.** The Cloudbeds engine answers a headless browser with a wall (403 on `/booking/property_info`, then its 404 page), and it was not got round. **A person must open, in a real browser, before go-live:** the base link with a `#checkin=…&checkout=…` fragment, and each of the four `?rid=` links with and without the fragment, and confirm the engine shows those dates and that room. If it ignores the fragment, remove the fields (the template renders none when the `dates` block is deleted from `index.astro`) rather than show dates that are not sent.

## facts

Every word on the page is `copy/en.json` (passed 4c) or a template label; `copy/sources.md` maps each field and paragraph to its dossier keys. The checkable claims, with their key:

| On the page | Dossier key |
|---|---|
| Adults-only beachfront boutique hotel, Kabalana Beach, Ahangama | `business.description`, `location.address` |
| 9 rooms, private balcony or patio, sea view | `room_count`, `owner_copy` (sources.md Rooms ¶1) |
| Studio King: King bed, sleeps 2, 38 sq m, upper or ground floor, 3.5 m glass doors | `room_types[0]` |
| Studio Twin: 2 super-single beds, sleeps 2, 38 sq m, upper floor, 3.5 m glass doors | `room_types[1]` |
| Studio+ King: King bed, sleeps 2, 40 to 43 sq m, soaking tub, dual sinks | `room_types[2]` |
| Director's Suite: King bed, sleeps 2, about 75 sq m, top floor, living area, wardrobe, tub, balconies, 55-inch TV | `room_types[3]` |
| Every-room list (500 thread count, Spa Ceylon, PressReader, …), triple occupancy in Studio King | `room_types[].amenities`, `owner_copy` (Rooms ¶3, ¶4) |
| Check-in from 14:00, check-out by 12:00, the contradiction note | `stayInfo`, `contradictions` |
| 29 amenities | `facilities` |
| Chef Christophe DuBois, dishes, in-house breads, dietary options, breakfast for two adults | `dining`, `booking.rate_terms` |
| Wallpaper* sentence (the one real fragment), opened 2017, renovated 2023, Singaporean owner | `press` (Wallpaper*), `business`, `owner_copy` |
| Kabalana a mile long; Galle Fort 25 minutes; nearby beaches; parks; station 1.4 km | `location.spot`, `owner_copy` (Kabalana ¶1–¶5) |
| 9.7/10, Trip.com, 56 reviews, read 2026-11-06; 9.4/10, Kayak, 159 reviews, read 2026-11-06 | `reviews.trip`, `reviews.kayak` |
| Two testimonials, whole, Guest User, Trip.com, June 2026 / February 2026 | `reviews.quotes[3]`, `reviews.quotes[6]` |
| Exclusive Use US$3,500, "from", "++", as of 2026-11-06 | `offers[0]` |
| Zero food waste, no single-use plastic, water recycling, turtles | `sustainability` |
| Sandhya = twilight (संध्य) | `owner_copy` (Why ¶1) |
| Front desk 24 hours; +94 765 700 007; reservations@thesandhya.com; Baranige Wattha Walhengoda, Ahangama 80650, Sri Lanka | `hours_note`, `contact.phone`, `contact.email`, `location.address` |
| Engine and room links | `booking.engine_url`, `booking.engine_room_links` |

No nightly rate, no Michelin, no untraced press quote, no WhatsApp, no aggregator rate in `rooms[]`. `audit-mockup` facts check: the only number not found verbatim in the copy is "3,500", the copy's `3500` formatted by the template.

## images

All `license: business-owned` (`dossier/the-sandhya/assets/index.json`), the same 44 photographs and the same places as at 4e (`mockups/calm/notes.md` "images"); alt text carried from 4e, where it was written from the photographs. No stock, so no credit line and nothing for `check-places`. Never used: img-025, 144 to 150 (the `/locale` surf, stilt-fisher and aerial shots), 036, 012, 057, 151. Every crop is now a ratio cut around the photograph's focal point (schema v0.10), reproducing the 4e crops: img-071 50.8%, img-038 73.35%, img-068 70.675%, img-032 58.65%, img-118 45.675%, the rest centred. img-013 is uploaded as the drawn map itself (cut 730x630 at 100,230 by the seed). Full-bleed: img-071, img-068, img-032, all 2000 px; `photos.mjs` refuses one under 1200 px. The phone hero is still a 616 px cut scaled to 924 (mockup conflict 3).

## gaps

As at 4e: no usable video (stills carry the page; pitch point); no Instagram feed (no post could be read; a button); no nightly rate by decision; season, owner's and staff names not in the copy; WhatsApp unconfirmed, left out; `languagesSpoken` not printed (no sentence for it in the copy).

## schema gaps (`src/gaps/gaps.json`)

1. **Room galleries.** `rooms[].photo` holds one photograph and `photos[]` has no room link and stops at 24 rows. The first photograph of each room is `rooms[].photo`; the other 18 are `roomGalleries` in gaps.
2. **Rating and testimonial labels.** `platform` / `source` are `other` with no label: `platformLabels` (by the rating URL's host) and `testimonialSource` ("Trip.com") are in gaps.
3. **The every-room list.** Rooms ¶3 is shown as an icon list cut at its commas (4e conflict 6); the list is `roomKit` in gaps, and the template shows it in place of ¶3. An edit to ¶3 in the CMS would not reach the page until this list is changed too.
4. **Sentences used by position.** The booking section's breakfast and rates sentences are the last paragraphs of Dining and Rooms; the Wallpaper* line is Casual Luxe ¶3; "We have blended…" is ¶6. An owner's edit that adds or removes a paragraph moves them.
5. **Placement of `photos[]`** is by position (`src/lib/layout.mjs`); the schema has no slot field. Reordering photos moves them between places (each place still crops sensibly).
6. **Logos** (`logo-white.png`, `logo-footer.png`) are template assets in `public/img/`; the schema has no logo field.
7. **Bookings per room.** A room's link is the `bookingLinks[]` row whose label starts with the room's label and a colon; there is no field relating them.

## editable

From `content.json` (Payload after a sale), with no template change: tagline (h1, title, booking card), closing, featureLine, every copy block (by slot and order: intro; about = Why Sandhya, Casual Luxe, Looking after the place; offer = The rooms, The Dining Room, Exclusive Use; info = Kabalana and around), spot, hoursNote, priceList (the Exclusive Use row), rooms (label, beds, sleeps, note, photo), stayInfo, amenities, ratings, testimonials, contact (phone, email, address, map), bookingLinks (engine and room links), socialLinks (Instagram), photos (22 rows, by position) with alt and focal point, heroVideo / videos (none now; renders nothing). Not editable: layout, styles, script, fonts, labels, logos, the date fields.

## conflicts

1. **No date picker (4e conflict 1): resolved by Alon at gate b.** The build adds check-in and check-out fields that carry the dates into the engine links (above). The base links stay plain. Not yet verified against the engine; a person checks before go-live. (`mockups/calm/notes.md` still lists it as open: this station writes only under `final/`.)
2. **`custom.md` "the Instagram feed".** Button only, as at 4e.
3. **Phone hero softness.** As at 4e; an original from the owner fixes it.
4. **Script font inlined.** Sacramento is a data URI in the page (23 KB, about 31 KB of base64, compressed with the page) instead of a file, so its swap cannot move the page. It costs the first paint about 30 KB of HTML on the phone. The file never enters git: the build reads it from `public/fonts/`.
5. **Hard constraint 5 (other businesses).** This run has one business; there is nothing in this run to differ from.

None blocking.

## Self-checks (2026-11-09)

| Check | Result |
|---|---|
| `node tools/check-design.mjs sites/the-sandhya/final/dist` | ok, 0 problems, 0 warnings. Ground hsl(0 0% 95%); h1 and body Schibsted Grotesk, h2 Sacramento |
| `node tools/check-places.mjs the-sandhya` | 0 borrowed images, 0 failing |
| `node tools/audit-mockup.mjs the-sandhya ../final` | `audit.json` in this folder; table below |
| Keyboard, 1440 | 76 stops, every one with a focus style, every one in view after its scroll, no trap; the date inputs reachable and labelled; slideshows answer arrow keys; no drawer, so no Esc case |
| Reduced motion, 1440 | 0 running animations, no settle on the hero, no parallax transform after a scroll |
| JS off, 390 | date fields not shown; 8 engine links present; the bar shown; 46 images visible (gallery slides by `<noscript>`) |
| Offline (only localhost reachable) | 0 failed requests, 0 broken images, both fonts loaded; no third-party host requested on load or on a full scroll |
| Shots against the mockup's last round | see look-log |

Budget, mobile home page (playbook §4), measured by `audit-mockup` on a throttled phone, local server, uncompressed:

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 611 KB (9 requests; HTML 105 KB with the inline font, CSS and script, uncompressed; 44 KB gzipped) |
| Hero video | ≤ 2 MB / 4 MB | none |
| JS | ≤ 300 KB | 0 KB as files; about 7 KB inline |
| Largest above-the-fold image | ≤ 300 KB | 176 KB |
| Fonts | ≤ 2 families, ≤ 150 KB | 2 families: 47 KB file + 23 KB inline = 70 KB |
| LCP | ≤ 2.5 s | 740 ms |
| CLS | < 0.1 | 0.0032; scroll early 0.0032, settled 0 |
| Third-party requests on load | 0 | 0 |
| Tap targets under 44 px | | 0 of 50 |

## Not verified

- The Cloudbeds engine with dates or `?rid=` (above); the engine's own steps.
- A real phone (iOS Safari's native date picker, a 3x screen for the hero), and axe (not run at 4g; the 4f findings were fixed by hand: `region` on the bar, dot size).
- SEO and AI-SEO plumbing (canonical needs `SITE_URL`, structured data, sitemap, llms.txt) belong to the next stations.
