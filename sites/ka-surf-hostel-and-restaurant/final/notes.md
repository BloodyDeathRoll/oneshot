# KA Surf Hostel — 4g build, round 3 + corrections · "Canopy" (unique)

## Correction 3 (2026-09-23, after the deployed 4g build; shots `round-9/`, `round-10/`)

Three items from Shahar. Nothing else touched: no copy, no photographs, no schema binding, no
other rule.

1. **The map is a standard Google map now, not OpenStreetMap.**
   `https://www.google.com/maps?q=<lat>,<lng>&z=<z>&output=embed` — the no-key form behind Maps'
   own "Share → Embed a map". Verified by loading it, not by memory:
   - Fetched on its own it renders one sentence, *"The Google Maps Embed API must be used in an
     iframe"* (HTTP 200, both `maps.google.com` and `www.google.com`). Inside an iframe it renders
     the map. So the form is real but only works framed — which is what we do.
   - `https://www.google.com/maps/embed/v1/place?q=…` without a key answers **401**, *"You must use
     an API key"*. Not used.
   - `maps.google.com/maps?…` works too but adds a redirect hop to `www.google.com`, so the
     `www.google.com` form is the one in the page. Inside the frame Google redirects itself to
     `google.com/maps/embed?origin=mfe&pb=…`; **no `pb` string is written into our page** — we never
     had one to obtain honestly, and none is invented.
   - `z=15`. At `z=16` the frame holds the pin and its immediate lane but Kabalana beach (about
     810 m south of the pin) falls outside it at both box sizes. At 15 the frame holds Kabalana
     Road, Thiththagalla Road, the Galle Road / coastal line, Kabalana beach and the neighbouring
     businesses' names — the "surrounding places" the swap was asked for — and the pin is still
     clearly on the hostel's lane.
   - Coordinates: `MAP_PIN` in `src/lib/site.mjs`, 5.98181 / 80.35206, unchanged (dossier
     `location.plus_code` X9J2+PR). `MAP_PIN.bbox`, which only OpenStreetMap needed, is gone and
     `zoom: 15` replaces it.
   Everything else about the block is exactly as it was: no `src` until the section nears the
   viewport (IntersectionObserver, `rootMargin: 400px`), the opaque HEAD probe first so a blocked
   or offline embed shows the address instead of a dead frame, the reserved box, the JS-off
   fallback, and "Open in Google Maps" → `contact.mapUrl`, character for character as before.
   **The "Map © OpenStreetMap contributors" credit line is gone**, with the `.map-cred` rules and
   the `MAP_PIN.bbox` value. Google draws its own attribution inside the frame ("Map data ©2026",
   "Terms", "Report a map error", the Google mark), so the page carries no credit of its own — the
   two-credits-in-two-typefaces problem recorded under round-8 is gone with it.
2. **No border around the map.** `.map-frame`'s `border:1px solid var(--ink)` removed. The reserved
   box is now defined by the map's own edges when it loads, and by nothing when it does not.
3. **Every tap target at 390 px is at least 44 × 44, grown by padding, not by type size.**
   `tools/audit-mockup.mjs` was fixed today to flag a target small on **either** side, and it
   reported **14 of 20** under 44 on the deployed build. All 14 were under 44 *high*; none was
   under 44 *wide*. Before → after (390 px, `a[href] | button | [role=button]`, visible):

   | target | before | after |
   |---|---|---|
   | `.score .src a` "Hostelworld" (hero rating) | 80 × 20 | 80 × 45 |
   | `.score .rest a` "Booking.com" (hero rating) | 87 × 19 | 87 × 45 |
   | `.list a.book` "Check dates" × 6 (room rows) | 88 × 25 | 88 × 46 |
   | `.addr a` "Open in Google Maps" (Getting here) | 164 × 22 | 164 × 47 |
   | `.map-alt a` "Open in Google Maps" (map fallback) | 164 × 26 | 164 × 51 |
   | `.map-cred a` "© OpenStreetMap contributors" | 198 × 19 | **removed with item 1** |
   | `.credit-rosa a` "Forecast for Kabalana by Rosa" | 217 × 21 | 217 × 46 |
   | `.contact p a` "+94 77 374 6053" (footer) | 117 × 21 | 117 × 48 |
   | `.contact p a` "Open in Google Maps" (footer) | 150 × 21 | 150 × 48 |

   Already passing and untouched: the Rosa plain-link box 350 × 500, the three footer tiles
   (115/121/98 × 161), the phone bar's "Check dates" 280 × 63 and "Call" 110 × 63.
   Three more that the audit cannot see because they are hidden at load were padded too, since they
   are real targets on a phone: the header's name link (hidden until the clearing scrolls away)
   107.6 × 21 → 107.6 × 49.5, the slide-out's "Close" 40 × 21 → 60 × 48, and the slide-out's
   "or call +94 77 374 6053" 135 × 24 → 135 × 49. The slide-out's three tiles were already
   108 × 168.
   **How, without moving anything.** Vertical padding on an *inline* link grows its box without
   pushing the lines it sits between apart, so a link inside a sentence gets its hit area and the
   paragraph is not re-typeset. Where the target is a block or flex item (a room row's "Check
   dates", the link in the map box, the slide-out's Close) a negative margin cancels the padding,
   one pixel short at the bottom because those three carried a 1px `border-bottom` *inside* the old
   box. And the underline stops being that `border-bottom`, which the padding would have pushed
   down, and becomes a 1px gradient pinned to the bottom of the **content** box
   (`background-origin:content-box; background-position:0 calc(100% + 1px)`) — the same pixel row
   the border occupied. The room rows' melon hover swatch stays the old 88 × 25 for the same
   reason: it is a second gradient the size of the content box, not a background on the padded box.
   Checked by pixel diff against `shots/critic-4/`: the hero ratings, the room list and the
   slide-out header are **byte-identical** before and after.
   **The one place that had to gain space**: the footer's phone and "Open in Google Maps" sat on
   two lines of one paragraph, 24 px apart. Two 44 px targets cannot be 24 px apart, so they became
   inline-blocks and the contact block is about 42 px taller. Type size, weight and colour
   unchanged. No two targets overlap at 390 px, at load, after scrolling or with the sheet open
   (checked pairwise: 0 overlapping pairs in all three states).

## Correction 2 (2026-09-22, after the preview deploy; shots `round-8/`)

Two items from Shahar, seen on the live preview. Nothing else touched.

1. **The OpenStreetMap embed is back in "Getting here"** (gate answer "Put the embed back",
   reversing his earlier "replace the embedded map with a plain link"). Restored exactly as it was,
   from the only place it survives in the repo — the picked mockup,
   `sites/ka-surf-hostel-and-restaurant/mockups/unique/dist/index.html`, which is also
   `agents/designer/gold/ka-surf-hostel.html`. It is **not** in commit `4648a94`: that commit is the
   round-3 build, so the map had already been removed from `final/` before anything was committed,
   and the 4g round-2 port was never committed at all. What came back:
   - `src/pages/index.astro`: the `.map` column (grid 1/5, row 1) after `.go`, holding the reserved
     `.map-frame`, the `data-src` iframe (no `src`), and the credit "Map © OpenStreetMap
     contributors". The frame's `title`, `loading`, `referrerpolicy` and `sandbox` are the mockup's.
   - `src/styles/site.css`: the nine `.map*` rules verbatim from the mockup, plus the two phone-only
     rules (`.walk>.map` margin, `.map-frame` height) and `.walk .go{padding-bottom:48px}`.
   - `src/scripts/site.js`: the IntersectionObserver that sets `src` only when the section nears the
     viewport (`rootMargin: 400px`), and the HEAD probe round 2 added — one opaque `HEAD` to the
     embed URL first, because a cross-origin iframe fires `load` even when the request was blocked,
     so without it an offline visitor got a dead frame instead of the address.
   - `src/lib/site.mjs`: `MAP_PIN.bbox` (`80.3455,5.9760,80.3540,5.9845`), removed in round 3.
   Two things that stay as round 3 left them, as asked: the address's link under "Getting here" and
   the footer's link both read **"Open in Google Maps"** → `contact.mapUrl` (the mockup said "Open
   the map"), and the box's own fallback line carries the same words. Everything round 3 and later
   changed is untouched: the copy, the rating capture dates, no test hooks, and the preview
   `noindex` rule in `src/lib/site.mjs` / `robots.txt.js` / `[sitemap].xml.js` / `llms.txt.js`
   (this build still emits `Disallow: /` and `<meta name="robots" content="noindex, nofollow">`).
2. **More air between the forecast headline and Rosa's widget.** The channel was one grid gutter,
   24 px, measured 25–26 px from the number's right edge because the fit-to-column loop sizes the
   number to the 351 px column. It is now **96 px** — the same measure as the block's own
   `margin-top`, and four of the page's 24 px gutters, so the air above the pair and the air between
   its halves read as one decision and the number stays on the grid's scale. Rosa's widget is
   untouched: same iframe, same 420 × 500 box, same theme; it only moves with the group, which
   re-centres 36 px to the right (`.fc` is `justify-content:center`).
   A flat 96 px would have started squeezing the widget's track 72 px of window width earlier than
   before, so the channel, not the widget, takes the squeeze:
   `column-gap:clamp(var(--g),calc(min(var(--wmax),100cqw - 2 * var(--m)) - 771px),96px)`.
   Rosa's card therefore holds 420 px down to exactly the window width it held it to before.
   The phone is unchanged: at ≤ 760 px the two stack in one column and `column-gap` does nothing.

   Measured gap from the number's right edge to the widget's left edge, with the three values
   injected into Rosa's JSON (fixture `rosa-kabalana.json`, fresh `generated_at`), Rosa's widget
   stubbed at its real size so the measurement does not depend on the network:

   | value | 1440 | 1525 | 1920 | widget |
   |---|---|---|---|---|
   | `0.7–1.0` | 98.2 px (was 26.2) | 98.2 (was 26.2) | 98.2 (was 26.2) | 420 × 500 |
   | `1.8–2.4` | 96.9 px (was 24.9) | 96.9 (was 24.9) | 96.9 (was 24.9) | 420 × 500 |
   | `10.0–12.5` | 97.6 px (was 25.6) | 97.6 (was 25.6) | 97.6 (was 25.6) | 420 × 500 |

   The descriptive lines under the number (`.nd`, `.upd`, the Rosa credit) fill the column, so the
   gap from *any* text in the left half is exactly 96 px at all three widths and all three values.
   Also swept, same three values: 761, 850, 891, 900, 963, 1000, 1200, 1300 and 2560 px. The channel
   never drops below 24 px (its old value) and the number never reaches the widget at any of them;
   the widget is 420 × 500 from 891 px up, exactly as before, and 96 px of channel appears from
   963 px up.

## Correction 1 (2026-09-22, after the round-3 build passed; shots `round-7/`)

Two items from Shahar, nothing else touched.

1. **The two test hooks are out of the shipped script.** `src/scripts/site.js` no longer reads the
   query string at all: `?open` (auto-opening the booking slide-out, or a room's) and `?no-webgl`
   (forcing the 2D canopy) are gone, and with them the now-unused `const Q = new URLSearchParams(…)`.
   `grep -c "no-webgl\|[?]open" dist/index.html` → **0**. The `?svg` hook had already gone in round 2.
   The no-WebGL fallback is untouched and still the real capability check: with
   `HTMLCanvasElement.prototype.getContext` stubbed to return `null` for `webgl`/`webgl2` (no query
   string involved), the page falls to the 2D renderer — `documentElement.dataset.canopy === "2d"`,
   `html.gl` still set, **0 page errors**, at 1440 and at 390 (`round-7/nowebgl-1440.png`,
   `nowebgl-390.png`). The slide-out was opened by clicking, as a visitor does
   (`round-7/panel-390.png` from the bottom bar, `panel-1440.png` from a room row): it opens, focus
   lands on the first tile, Esc still closes.
2. **Rating capture dates (playbook §6, schema v0.4 `ratings[].capturedAt`).**
   - The seed writes them: `scripts/seed-from-dossier.mjs` reads
     `dossier.reviews.<platform>.fetched_at` per rating row and throws if one is missing. All three
     are `2026-09-19T17:05:00Z` → `"2026-09-19"`. `content.json` was **re-seeded**, not hand-edited,
     from the same `copy/en.json` and dossier as round 3; the only edit to the script is the
     `capturedAt` helper and the one line that calls it, so the three dates are the only values the
     re-seed can have changed.
   - The page prints them as **"read 19 September 2026"** — `readOn()` in `src/lib/site.mjs`, off
     `dayMonthYear()`, in the page's own Outfit and `--ink`, one size step down from the line above
     (13 px against 15 px in the proof block, 13/12 px on the tiles). Wording: "read" rather than
     "captured"/"as of" because the visitor's question is when someone last looked, and it is a word
     the page can say in two syllables; the date is spelled out because the site has no other
     numeric date and `19/09/2026` reads differently in two countries.
   - Placement, all real DOM text: in the first-screen proof block, its own line under
     "Hostelworld, 66 reviews"; in the two rows under it, inline after the review count behind a
     "·" at 1440 and on its own line at 390 (where a mid-date wrap looked broken, so the row's
     `<br>` gives way to the date's own line and a 9 px gap); on each booking tile that carries a
     score, a line under "9.8/10, 66 reviews" — footer tiles and the slide-out's tiles alike. The
     Agoda tile has no rating and gets no date. Seven on the page, five of them outside the
     `hidden` slide-out, all present with **JS off** (`round-7/jsoff-1440.png`, `jsoff-390.png`) and
     under **reduced motion** (`reduced-*.png`, 7 of 7 with the static canopy).
   - Not touched: the SEO stations' surfaces. `dist/llms.txt` still lists the three ratings as
     "9.8/10, 66 reviews" with no date; the JSON-LD has no `aggregateRating` to carry one and its
     key set is unchanged (`@context @type address amenityFeature checkinTime checkoutTime
     containsPlace description geo hasMap knowsLanguage name sameAs telephone`), with no "read 19"
     anywhere in it.

Everything else — layout, colour, type, motion, photographs, copy, booking hrefs — is round 3's.

## Round 3 (2026-09-22, after the critic's full round 2)

The last build round before the final critique. Three things, nothing else.

1. **Copy re-seeded.** `copy/en.json` re-passed 4c in full (`copy/review.md` round 8: 86 claim rows,
   0 unsourced, 0 contradicted) and was re-seeded with `scripts/seed-from-dossier.mjs`; no hand edit
   to `content.json`. The seed picks copy blocks by heading and every heading still matches, so the
   script did not change. `content.json` diff against round 2: exactly four values —
   `copyBlocks[0].body` (intro: "they set out to make you feel at home from the moment you arrive",
   and the breakfast/"come back wet" clause gone), `copyBlocks[1].body` (offer: "private lockers",
   bathrooms "modern and the showers are hot", "Rates change with the dates"), `copyBlocks[3].body`
   ("What is here", now full sentences ending "Reception is open 24 hours."), `amenities[3].label`
   ("Private lockers and personal fridge in every room"). Nothing else in the file moved.
   Where they render: page (intro, "Dorms and private rooms", "What is here", the amenity list, the
   rates line in the footer and in the slide-out), `dist/llms.txt` (same sections), and JSON-LD —
   `amenityFeature[3].name` is the new label; the copy bodies are not in JSON-LD, and `description`
   (tagline + intro/offer headings) is unchanged. grep of `dist/` for the retired phrases
   ("ten minutes", "come back wet", "open to the sky", "with the season", "if you ask",
   "a private locker"): **0 hits each**.
2. **Forecast fallback holds its space (critic fix 2, hard constraint 9, playbook §4).** The failure
   path used to delete the headline half — `html:not(.js) .fc,.fc.off{grid-template-columns:minmax(0,420px)}`
   plus `display:none` on `.fc-now` — so when the request failed with the block on screen the widget's
   box jumped (critic round 2: 0.2266 at 390, 0.0305 at 1440). Now the headline half keeps its
   reserved box on **every** path and only its contents are hidden
   (`html:not(.js) .fc-now,.fc.off .fc-now{visibility:hidden}`); the grid override is gone, and the
   phone rule is plain `.fc` again. Measured layout shift with the block on screen, user-like wheel
   scroll, `PerformanceObserver` (`hadRecentInput` false), the failure armed to land only after the
   block is on screen: **0.0000 on all of success / 404-after-1 s / abort-after-3 s / the 10 s
   timeout / stale (30 h old), at 390 and at 1440**, and the whole-page sum is 0 too. `.fc-rosa`
   sits at the identical page offset in every state (1440: x 698, y 9512, 420×500; 390: x 20,
   y 11328, 350×500), and `.fc-now` keeps 351×289 / 350×232. Control: the round-2 CSS patched back
   into a copy of this same build shifts on every one of those paths (0.0725 at 390, 0.0237 at 1440,
   `.fc-rosa` moving 11328→11096 at 390 and x 698→510 at 1440), so the zeros are measurements, not a
   blind harness. Unchanged: the widget is given its `src` only after fresh data, the plain link is
   still the fallback, and the tab stops in both states are identical to round 2 (live: the Rosa
   credit; fallback: the plain link).
3. **Footer link (critic fix 1).** The footer's second link to the same Google Maps URL now reads
   **"Open in Google Maps"**, like the one under "Getting here". 0 occurrences of "Open the map" left
   in `dist/`. The URL is untouched (`contact.mapUrl`).

Nothing else changed: no template, style or script change beyond those two lines of CSS and the one
link label. Booking hrefs are character-identical and in the same counts as round 2 (12 Hostelworld,
3 Booking.com, 2 Agoda, 5 `tel:`, 2 Google Maps, 2 Rosa).

## Round 2 (2026-09-22, after the critic's full round 1)

What round 2 was asked to do and what was done. Everything below this section is round 1's record,
corrected where round 2 changed it.

1. **Copy.** `copy/en.json` (passed 4c again: review.md round 5) re-seeded with
   `scripts/seed-from-dossier.mjs`; no hand edit to `content.json`. The seed picks copy blocks by
   heading, so its breakfast key changed from "Breakfast changes every morning" to "Breakfast, every
   day" (the only change to the script). `content.json` diff against round 1: exactly the four fields —
   `copyBlocks[2]` heading + body, `amenities[0]` ("Free breakfast"), `spot`, `contact.address`
   ("207/A Welahangoda, 80650 Ahangama, Sri Lanka"). `contact.mapUrl` unchanged (dossier
   `location.map_url`). Where the old texts were and the new ones now render: page (breakfast section,
   amenity list, spot h2, address in "Getting here" and footer), `llms.txt` (address line, breakfast
   section, amenities, "The wave", Location), JSON-LD `address` = PostalAddress {streetAddress
   "207/A Welahangoda", postalCode "80650", addressLocality "Ahangama", addressCountry "LK"}, title
   "KA Surf Hostel, Ahangama" (town parsed from the new address). grep of `dist/index.html` +
   `dist/llms.txt`: 0 hits for "Welhengoda", "No 207", "changes daily", "more often", "swell is up",
   "improvers", "Breakfast changes".
2. **Map → link (Shahar, 2026-09-22).** Removed: the OpenStreetMap iframe and its `.map` column, the
   lazy loader and HEAD probe in `site.js`, the credit, the reserved box, every `.map*` CSS rule, the
   two phone-only rules that existed for it (`.walk>.map` margin, `.map-frame` height) and
   `.walk .go{padding-bottom:48px}` (it shortened the text column so the map could end the section on
   the phone), and `MAP_PIN.bbox`. `MAP_PIN` lat/lon stays: it is the JSON-LD `geo` (SCHEMA GAP, as
   before). The address's link under "Getting here" now reads **"Open in Google Maps"** →
   `contact.mapUrl`, character-identical to the dossier's `location.map_url`. The footer's link keeps
   its round-16 words "Open the map" (not asked to change; see conflicts). Layout: the left columns 1–4
   are left empty, with the section's 1 px rule in columns 5–6 and the text in 7–11 — exactly the
   round-12 composition, before the map was added (`mockups/unique/shots/round-12/desktop-10/11`,
   phone 13/14). No new element, no column moved. Round-4 sheets: desktop 10 and phone 13 show it.
3. **Headline back to round 16.** `.clear` left padding is again round 16's `calc(var(--m) + 8.4%)`;
   round 1's `max(…, (100% − 1200px)/2)` is gone. Measured against the mockup served from its `dist/`
   (text start of the headline, JS off and on, identical both ways): 390 → 16.9 / 16.9, 1440 → 160.7 /
   160.7, 1525 → 167.3 / 167.3, **1920 → 199.7 / 199.7**, 2560 → 253.4 / 253.4 (final / round 16);
   the top edge matches at every width too. Leaves: pixel test re-run with the headline back
   (headline text transparent, every non-ground pixel inside its line boxes counted): **0** at 390
   (43 407 px checked), 1440 (322 818), 1525 (361 059), 1920 (433 557) and 2560 (433 356), in each of
   WebGL, WebGL after a pointer sweep across every line, reduced motion and JS off (20/20 runs).
   Positive controls (green in the last 10 % of the headline): 567 px at 390, 5 190 at 1440 (WebGL),
   6 834 at 1920 (JS off). No conflict between the two notes at any width tested.
4. **Keyboard on the beach row.** `.crops` has `tabindex="0"`, `role="region"`,
   `aria-label="Beach photographs"`; its focus ring is the page's own `:focus-visible` (2 px solid ink,
   3 px offset). At 390: Tab reaches it (12th stop), ArrowRight ×5 scrolls it 0 → 200 px of 334.
   On the phone the row runs to the screen's right edge, so the ring's right side is off-screen; the
   other three sides show (`shots/states/crops-focus-390.png`). At 1440 the row does not scroll but is
   still one tab stop. axe-core 4.11.1 (local copy, `~/Projects/Learning/uigen/node_modules`, nothing
   installed; full scroll first, third-party blocked), WCAG 2.0/2.1 A+AA: **0 violations at 1440, 0 at
   390**; `scrollable-region-focusable` passes at 390. Incomplete at both: `color-contrast` (text over
   the canopy, as round 1) and `aria-prohibited-attr` on `footer.end` (`aria-label` on a footer with
   no role — present in round 1 too, not changed here).
5. Nothing else changed. Rebuilt with `npx --no-install astro build`.

Round-2 checks: see "Checks" and the budget table below (updated). Round-4 sheets vs round 16: see
"Rounds".

designer 0.3.3 · run `2026-09-ahangama-02` · pick: ledger `mocked → picked`, `agent: "human"`,
2026-09-22T08:14:12Z ("Pick: unique … For 4g: cut the two near-empty screens after the hero to one,
and keep the leaves off the headline"), restated for this run: one screen after the hero, leaves off
the headline, forecast headline live and the widget after it. Source of the look: the mockup's last
round, `mockups/unique/dist/index.html`, round 16.

## What this is

One Astro 7.3.3 project, static output, one page (`dist/index.html`), toolchain symlinked from
`spikes/payload/site/node_modules` (no install).

| file | job |
|---|---|
| `scripts/seed-from-dossier.mjs` | stand-in for the CMS until KA has a tenant: writes `src/tenant/content.json` (schema v0.3 REST shape, `{tenant, locales:{en:<site>}}`) and `src/tenant/media/` from `copy/en.json` + the dossier. Run once: `npm run seed`. |
| `scripts/fetch-tenant.mjs` | the spike's fetch step, locales `['en']`. `npm run fetch` / `npm run build:cms`. Exits 2 without `TENANT_SLUG`, `CMS_URL`, `BUILDER_API_KEY` (checked: "fetch-tenant: TENANT_SLUG is required", exit 2); never part of `npm run build`. |
| `scripts/photos.mjs` | build step: every `photos[]` image centre-cropped to 3:4 (the design's one shape) at its largest size, then 264/384/480/576 px (never above the crop) as WebP + JPEG, lowercase names, into `public/photos/`. |
| `src/pages/index.astro` | the page; every owner-editable value read from `content.json`. |
| `src/styles/site.css`, `src/scripts/site.js` | the mockup's CSS and script, inlined into the page at build (no `_astro/` bundle, no hashed names). |
| `src/canopy/still-*.svg` | the mockup's static no-JS / reduced-motion canopy, minus the front blade. |
| `src/lib/site.mjs` | helpers, interface wording, and the three SCHEMA GAP values (below). |

Build: `npm run build` (= `node scripts/photos.mjs && astro build`) → `dist/` (git-ignored; `.gitignore`
here also ignores the node_modules symlink, `.astro/`, `public/photos/`, `src/tenant/media/`,
`src/tenant/photos.generated.json`). Astro/Vite caches are set to `./.astro/` so nothing is written into
the shared node_modules.

## The three pick notes, as built

1. **One near-empty screen after the hero.** In layout: the canopy's scroll length (`--walk`) is
   170svh instead of 220svh, so the leaves close into the green column over 70svh of scroll instead of
   120svh, and the rooms section begins 450 px (desktop) / 422 px (phone) earlier. No content removed,
   no element moved inside any section: geometry measured relative to the rooms section top is
   identical to round 16 for 46 of 48 checked boxes at 1440, 390 and 1525; the two that differ are the
   h1's box width (a measure now, see 2; its text and position are the same) and the forecast headline
   column, 1 px to the right at 1440 (fixed 351 px instead of max-content). Round-3 sheets: desktop capture 01 is the one near-empty screen (the closed green
   column), capture 02 already has the lead paragraph, the dorm print and "Dorms and private rooms";
   phone capture 01 is the near-empty one with the lead starting at its foot, capture 02 is full.
   Round 16 had two (captures 01 and 02 on both sheets).
2. **No leaf on the headline.** The one front blade that deliberately nicked the end of "Kabalana" is
   removed (from the live canopy and from both static SVGs); the front canvas it needed is gone. The
   pointer may no longer push a blade into the headline's line boxes (padded 12 px/8 px). *(Round 1 also
   moved the headline onto the 1200 px column above 1296 px; round 2 reverted that — see Round 2, item
   3. The measurements below are round 1's; round 2's are in item 3.)* Measured (/tmp Playwright + sharp, headline text made
   transparent, every non-ground pixel inside its line boxes counted): **0 px at 390, 1440, 1525, 1920
   and 2560**, in each of WebGL, 2D canvas, reduced motion and JS off, and again (WebGL and 2D) after the
   pointer was moved round each line. A positive control (green painted into the last 10 % of the h1)
   read 576 px at 390 and 5 394 px at 1440, so the test sees green when it is there. The hard `<br>`s of
   the mockup's heading became a measure (`h1{max-width:6.5em}`): the same three lines, and any heading
   the owner writes still wraps.
   Still true, and not changed: while you scroll out of the first screen, the closing leaves pass
   *behind* the headline as it scrolls away (the back canvas is under the text), as in round 16.
3. **Forecast live.** The headline half fetches `https://rosa-data-opal.vercel.app/data/spots/kabalana.json`
   once, when the block is 400 px from the viewport. With data under 24 h old it draws, in Outfit:
   "Forecast for Kabalana by Rosa" (credit, linked), the height range from `current.h`, the time the data
   is for (`current.t` in the spot's timezone, e.g. "Tuesday 22 September, 14:30 at Kabalana" — no
   "Now"), the first in-window swell ("Swell 12.4 s from the south"), the wind ("Wind 16 km/h from the
   west, cross-shore"), and "Rosa, updated 22 September 2026, 13:56". **Only then** is Rosa's widget
   iframe given its `src` (markup exactly as tools.md, theme light, units metric). Request failed, timed
   out (10 s), stale (> 24 h), JS off or no IntersectionObserver: the headline half is not shown and the
   widget's reserved 420 × 500 box shows the plain link "See today's forecast for Kabalana on Rosa" →
   `https://rosa.surf/spot/kabalana`; no iframe. Space: the headline column is a fixed 351 px with a
   289 px minimum height (232 px on the phone), the mockup's measured box; arrival shifts nothing
   (measured: same boxes before/after, layout-shift sum 0 at 1440 and 390).

## Checks (all on `dist/` served from a clean local static server)

Correction 2 (the map and the forecast channel). Build:
`SITE_URL=https://ka-surf-hostel.os1.workers.dev/ npx --no-install astro build`.

- Preview rule still holds: `dist/robots.txt` is `Disallow: /` for `*` and for each named AI crawler,
  `dist/index.html` carries `<meta name="robots" content="noindex, nofollow">`, no `sitemap.xml`.
- check-design: `node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist
  --no-shots` → `ok`, 0 problems, 0 warnings; look: fonts h1/h2/body "Outfit", ground
  rgb(240, 241, 242) = hsl(210 7% 95%), all-caps labels 0, labelled headings 0/8.
- check-places: `node tools/check-places.mjs ka-surf-hostel-and-restaurant` → 0 borrowed image uses,
  0 failing.
- audit: `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final` → first KB **233**,
  JS KB 0, LCP **400 ms** (408 ms on a second run), CLS **0**, 3rd party **0**, noJS links 4,
  kbd n/a, alt miss 0. Every budget line inside. (Correction 1 was 228 KB / 396 ms; the 5 KB is the
  map's markup, CSS and loader — nothing the map loads is on first load.) `audit.json` now also lists
  `https://www.openstreetmap.org/copyright` among the external hrefs: the credit link.
- **Map, 390 × 844 DPR 2, load + 2.5 s, no scroll: 7 requests, all `127.0.0.1`, third-party 0**, and
  the iframe's `src` attribute is still `null` with `.map-frame` not `.on`. Scrolling to the section
  sets `src` and the frame loads (`.on` true); the hosts that then appear are
  `www.openstreetmap.org`, `tile.openstreetmap.org` and the Rosa pair, none of them before the
  scroll.
- **Map with JS off**, 390 and 1440: the reserved box is there (290 × 320 on the phone, 384 × 500 at
  1440), `iframe src` null, `.map-alt` visible, showing "207/A Welahangoda, 80650 Ahangama, Sri
  Lanka" and **"Open in Google Maps"** →
  `https://www.google.com/maps/search/KA%20surf%20hostel%20and%20restaurant/@5.9794134,80.350836,17z?hl=en`
  (character-identical to `contact.mapUrl`), credit "Map © OpenStreetMap contributors" under it,
  0 third-party requests.
- **Map when the embed cannot be reached** (every `*.openstreetmap.org` request aborted), 390 and
  1440: the HEAD probe rejects, `src` is never set, `.on` stays false, `data-loading` is cleared and
  the box keeps the address + "Open in Google Maps". No dead frame — the defect round 2 found.
- **Layout shift over a full scroll** (`PerformanceObserver`, `hadRecentInput` false), 390 and 1440,
  with the embed loading and with it blocked: **0.0000** in all four runs.
- **Forecast layout shift** re-measured with the wider channel, block on screen, failure armed to
  land after it is on screen — **390 / 1440**: success 0 / 0 · 404 after 1 s 0 / 0 · abort after 3 s
  0 / 0 · 10 s timeout 0 / 0 · stale (48 h) 0 / 0. In every failure the `.fc-now` box keeps its
  232 px (390) / 289 px (1440) and `.fc-rosa` its 500 px, and the plain link is visible.
- **Forecast channel**, three injected values × three widths: the table under "Correction 2" above.
- Reduced motion, 1440: the map loads the same way; the canopy is the static path, as before.
- Sheets: `shots/round-8/`, desktop 15 captures / 11 689 px, phone 18 / 13 400, `shoot.json` errors
  `[]`; compared with `shots/seo-4/` capture by capture and pixel by pixel under "Rounds".

Round 3 (below each check, the earlier rounds' lines are kept where they still hold):

- check-design round 3: `node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist
  --no-shots` → `ok`, 0 problems, 0 warnings; look: fonts h1/h2/body "Outfit", ground
  rgb(240, 241, 242) = hsl(210 7% 95%), all-caps labels 0, labelled headings 0/8.
- audit round 3: `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final` → first KB 227,
  JS KB 0, LCP 388 ms, CLS 0, 3rd party 0, noJS links 4, kbd n/a, alt miss 0; numbers on the page not
  in the passed copy: none. Every budget line inside (table below).
- Forecast layout shift round 3, block on screen, wheel-scrolled, `PerformanceObserver`
  (`hadRecentInput` false), the failure armed to land after the block is on screen — **390 / 1440**:
  success 0 / 0 · 404 after 1 s 0 / 0 · abort after 3 s 0 / 0 · the 10 s timeout 0 / 0 · stale (30 h)
  0 / 0. JS off: nothing runs, and the boxes are at the same offsets as with JS on. Whole-page
  layout-shift sum over the same runs: 0. Control on the round-2 CSS: 0.0725 / 0.0237 on each failure
  and stale path.
- Retired phrases in `dist/` round 3: "ten minutes" 0, "come back wet" 0, "open to the sky" 0,
  "with the season" 0, "if you ask" 0, "a private locker" 0, "Open the map" 0.
- Booking hrefs round 3 (raw HTML, i.e. JS off): 12 Hostelworld, 3 Booking.com, 2 Agoda,
  5 `tel:+94773746053`, 2 Google Maps, 2 rosa.surf/spot/kabalana — the round-2 set, unchanged.
- Keyboard round 3: tab stops through the forecast are identical to the round-2 build in both states
  (live: the Rosa credit link; fallback: the plain link), checked side by side against a copy of the
  round-2 build.
- Sheets round 3: `shots/round-6/`, desktop 15 captures / 11 689 px, phone 18 / 13 032, `shoot.json`
  errors `[]`; compared with `shots/round-5/` under "Rounds".
- Fallback state round 3, looked at: `shots/states/fallback-r3-off-{390,1440}.png` (request failed)
  and `fallback-r3-jsoff-{390,1440}.png` (JS off) — the link sits in the widget's box exactly where
  the widget would be, with the headline half's reserved space blank above it (390) or beside it
  (1440). That blank half is the visible cost of the fix; see conflicts.

Round 2 (below each check, round 1's line is kept where it still holds):

- check-design round 2: `ok`, 0 problems, 0 warnings, same look line.
- audit round 2: first KB 226, JS KB 0, LCP 388 ms, CLS 0, 3rd party 0, noJS links 4, kbd n/a, alt
  miss 0. Round 1 was 204: the throttled first load now also fetches the breakfast photograph
  (`img-003-576.webp`, 25 KB) — the shorter breakfast copy moved it up to 4 335 px, inside Chrome's
  lazy-load margin on a slow connection (checked by a throttled run: 8 requests incl. img-003; the
  unthrottled run fetches 7).
- Requests round 2 (390 × 844, DPR 2): no scroll, 3 s → 7, all `127.0.0.1`. Full scroll: off-host,
  in order, the page's `…/data/spots/kabalana.json` (main frame, 9 421 ms) then the widget document
  `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric` (9 638 ms), then only the
  widget's own requests inside its frame (Google Fonts Inter, its JSON copy, favicon, arcgis tiles).
  openstreetmap.org: 0. JS off, full scroll: 0 third-party.
- Booking hrefs round 2: 12 Hostelworld, 3 Booking.com, 2 Agoda, 5 `tel:+94773746053`, each
  character-identical to `booking.engine_url` / `booking.other_engines` / `contact.phone`.
- Wide screens round 2 (`shots/round-4/w1525|1920|2560-*`): no horizontal overflow; forecast pair,
  beach row and tiles span the 1200 px column (1525: 163–1363; 1920: 360–1560; 2560: 680–1880).

Round 1:

- `node tools/check-design.mjs sites/ka-surf-hostel-and-restaurant/final/dist --no-shots`:
  `ok`, 0 problems, 0 warnings; look: fonts h1/h2/body "Outfit", ground rgb(240, 241, 242) = hsl(210 7% 95%),
  all-caps labels 0, labelled headings 0/8.
- `node tools/audit-mockup.mjs ka-surf-hostel-and-restaurant ../final` → `final/audit.json`:
  first KB 201, JS KB 0, LCP 392 ms, CLS 0, 3rd party 0, noJS links 4, kbd ok n/a, alt miss 0;
  numbers on the page not in the passed copy: none; images without alt 0; tap targets under 44 px 0.
  The audit's keyboard probe looks for `data-open-drawer`/`data-drawer`, which this page (like the
  mockup) does not use, hence n/a; the keyboard pass below covers it.
- Lazy load (Playwright, 390 × 844, DPR 2): load + 3 s, no scroll → 7 requests, host `127.0.0.1` only;
  0 to rosa.surf, rosa-data-opal.vercel.app, openstreetmap.org. Walking down: the OpenStreetMap probe and
  embed near "Getting here", then `…/data/spots/kabalana.json` (the page's request), then
  `https://rosa.surf/widget/?spot=kabalana&theme=light&units=metric`, then the widget's own JSON
  request. JSON before widget: true. Final state `fc live`, iframe src set, fallback link hidden.
- JSON request routed to fail: `fc off`, iframe src null, plain link visible in the 350 × 500 box,
  0 requests to rosa.surf. Same with a fulfilled response whose `generated_at` is 30 h old.
- JS off: the plain link in the box, headline half hidden, iframe src null; the map box shows
  "No 207/A, Welhengoda, 80650 Ahangama, Sri Lanka | Open the map"; 0 third-party requests.
- Offline (every request not to the local server aborted), 390 and 1440: Outfit loaded
  (`document.fonts.check('200 20px Outfit')` true), 14/14 images loaded, forecast `off` with the link,
  map box not switched on (address + link). Blocked: only the map probe and the Rosa JSON.
- Keyboard (1440): Enter on the hero's "Check dates" opens the slide-out with focus inside; six Tabs
  stay inside; Esc closes; focus returns to the button. From a room row the panel's first line reads
  "Bunk bed in mixed dormitory, 1 bunk bed" and focus returns to that row's link.
- Reduced motion and JS off: the static SVG canopy, no canvas drawing (headline test above).
- Booking hrefs: 17 links to the three listings, every one character-identical to the dossier's
  `booking.engine_url` / `booking.other_engines` (12 Hostelworld, 3 Booking.com, 2 Agoda — the mockup's
  counts); every `tel:` is `tel:+94773746053` = `contact.phone`.
- Wide screens (round-3 `w1525-*`, `w1920-*`, `w2560-*`): no horizontal overflow; at 1525 forecast pair
  365–1160, beach photos 265–1261, tiles 289–1237 (round 15's numbers exactly); at 1920 pair 563–1358,
  photos 462–1458, tiles 486–1434; at 2560 headline 680, column 680–1880, pair 883–1678.

### Budget (playbook §4, mobile home page, first load, no scroll; audit.json)

Round 3 (`audit.json` rewritten 2026-09-22T18:11:52Z; round 2's number follows where it differs):

| Item | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1.5 MB | 232 485 B (227 KB), 8 requests: HTML 74 158, fonts 32 292, images 126 035 · round 2: 231 552 B |
| JS, compressed | ≤ 300 KB | inline only: 19 942 B raw, 7 715 B gzip (0 B as separate files) · round 2: 19 055 / 7 424 |
| Largest above-the-fold image | ≤ 200 KB | none above the fold (the first screen is drawn); largest image fetched on first load 47 428 B |
| Fonts | ≤ 2 families, ≤ 150 KB | 1 family, 1 file, 32 292 B |
| LCP (throttled phone) | ≤ 2.5 s | 388 ms |
| CLS | < 0.1 | 0 on first load, 0 over a full scroll with the forecast arriving, and **0 on every forecast failure and stale path with the block on screen, at 390 and 1440** (round 3; it was 0.2266 / 0.0305 in round 2) |
| Third-party requests on load | 0 | 0 |

HTML gzip: 25 518 B (round 2: 24 933 B). (Round 1: 206 056 B first load, LCP 392 ms, HTML gzip 25 249 B.) `dist/` total 2.7 MB (every width of every photo).

Re-measured after the correction (`audit.json` rewritten 2026-09-22T19:39:07Z), every line still
inside its target: first load **233 272 B / 8 requests** (HTML 74 945 B — 787 B more than round 3,
the dates and the CSS rules minus the two hooks; fonts 32 292, images 126 035, both unchanged) ·
JS **0 B as separate files**, inline 19 654 B raw / 7 562 B gzip — 288 B *smaller* than round 3's
19 942, because the hooks left · largest image on first load 47 428 B, still nothing above the
fold · 1 font family, 32 292 B · LCP **396 ms** · CLS **0** · third-party requests on load **0**.
HTML gzip 25 464 B (round 3: 25 518). Unchanged in the same run: 0 images without alt, 0 tap targets
under 44 px, 4 booking links reachable with JS off, 14 images visible with JS off.

Re-measured after correction 2 (`audit.json` rewritten 2026-09-22T20:46 UTC), every line still
inside its target: first load **238 561 B (233 KB) / 8 requests** — HTML 80 234 B, 5 289 B more than
correction 1's 74 945, which is the map's markup, its CSS and the loader; fonts 32 292 and images
126 035 both unchanged, because **nothing the map or the forecast loads is on first load** ·
JS 0 B as separate files, inline 20 930 B raw / 8 016 B gzip (correction 1: 19 654 / 7 562 — the map
loader) · largest image on first load 47 428 B, still nothing above the fold · 1 font family,
32 292 B · **LCP 400 ms and 408 ms over two runs** · **CLS 0** on first load, 0 over a full scroll
with the map and the forecast arriving, 0 over a full scroll with the map blocked, and 0 on all five
forecast paths at 390 and 1440 · **third-party requests on load 0**. HTML gzip 27 033 B. Unchanged
in the same run: 0 images without alt, 0 tap targets under 44 px *by the audit as it then was* —
that check only flagged a target small on **both** sides, so it could not fail a text link; the tool
was fixed on 2026-09-23 and the same build then reported 14 of 20 under 44.

Re-measured after correction 3 (`audit.json` rewritten 2026-09-23T03:36:12Z; LCP 424–432 ms over
three runs), every line still
inside its target: first load **240 980 B (235 KB) / 8 requests** — HTML 82 653 B, 2 419 B more than
correction 2's 80 234 (the tap-target rules and the map's new markup); fonts 32 292 and images
126 035 both unchanged, because nothing the map or the forecast loads is on first load ·
JS **0 B as separate files**, inline 20 923 B raw / 7 958 B gzip (correction 2: 20 930 / 8 016) ·
largest image on first load 47 428 B, still nothing above the fold · 1 font family, 32 292 B ·
**LCP 424 ms** · **CLS 0** · **third-party requests on load 0**. HTML gzip 27 668 B (correction 2:
27 033). And now the line that changed: **tap targets under 44 px = 0 of 19**, with the fixed audit
(correction 2's build reported 14 of 20 under the same tool). Unchanged in the same run: 0 images
without alt, 4 booking links reachable with JS off, 14 images visible with JS off.

Behaviour re-checked for correction 3, at 390 and 1440, with a layout-shift observer running from
before first paint (`shots/round-10/states/`):

| path | third party before scroll | CLS | what the map box shows |
|---|---|---|---|
| arrival, no scroll | none | 0 | address + "Open in Google Maps" |
| scrolled to the map, live | none | 0 | Google's map |
| scrolled to the map, `google.com`/`gstatic`/`googleapis` blocked | none | 0 | address + "Open in Google Maps" |
| JS off | none | n/a | address + "Open in Google Maps" |
| scrolled to the forecast, `rosa*` blocked | none | 0 | (forecast falls back to its plain link, as before) |

## Rounds

- **round-1** (`shots/round-1/`): first full shoot. Against round 16: same page, starting 450 px
  earlier; hero without the nick blade; forecast headline live. Found: no "Open the map" link anywhere
  (address block, map fallback, footer) — the seed had copied the dossier's `{value, source_url}` object
  instead of its value, so the URL check dropped it. Fixed in the seed (`map_url.value`,
  `business.type.value`).
- **round-2** (`shots/round-2/`): links back. Found by measuring, not visible at a glance: the beach
  photographs 96 px apart instead of 48 — inside `display:contents` pictures the `<source>` elements
  became flex items and doubled the gap. Also found in the offline test: the map iframe fires `load`
  even when blocked, so offline it showed a dead frame instead of the address. Fixed:
  `picture>source{display:none}`; the map now sends one opaque HEAD request to the embed URL first and
  keeps the address + link if it fails.
- **round-3** (`shots/round-3/`, + `w1525/1920/2560-*`): element geometry against round 16 identical
  (above); desktop and phone sheets match round 16 capture for capture apart from the three pick notes.
  In the sheets the Agoda tile is black in one desktop capture (the shoot's pointer hovering it, as in
  round 16) and the map tiles are blank in one capture (still loading when shot). No regression left
  that I could see.
- `shots/states/`: `live-390.png`, `blocked-390.png` (JSON failed), `nojs-390.png`,
  `crops-focus-390.png` (round 2).
- **round-4** (`shots/round-4/`, round 2 of 4g; + `w1525/1920/2560-*`): sheets opened against round 16.
  Desktop 15 captures / 11 729 px (round 16: 16 / 12 285), phone 18 / 13 092 (19 / 14 078). Differences
  from round 16, all asked for: one near-empty screen after the hero (note 1); no blade on the
  headline (note 2; `w1920-00` vs `round-16/w1920-00`: headline, name line, button and ratings at the
  same x, only the front blade gone); live forecast numbers (note 3); "Getting here" with the left
  columns empty and the rule, no map, "Open in Google Maps" under the address (desktop 10–11, phone
  13); the copy changes — breakfast heading on two lines ("Breakfast, every / day") over a one-line
  body, so that section is shorter (≈106 px at 1440, part of the page-height difference), spot h2
  on two lines at 1440, "Free breakfast", new address in three places. Nothing else differs that I
  could see; no overlap, overflow or unreadable text at 1440 or 390. Seen and unchanged from round 16:
  at 2560 × 900 (and 1920 × 900) the bottom leaf's tip touches the end of "Hostelworld, 66 reviews"
  under the big rating — identical in the mockup served at the same size; it is not the headline.
  The Agoda tile is black in desktop 13 (the shoot's pointer hovers it), as before.
- **round-5** (`shots/round-5/`, 4g round 2 correction, after the SEO re-run's `seo-2/desktop-11`).
  Wrong as design: with live Rosa data "0.7–1.0" the forecast number ran past its 351 px column and
  Rosa's widget covered its "m" — the fit loop in `site.js` measured an inline span's `scrollWidth`
  (always 0), so it never ran. Changed: `fit()` measures the span's box against the column and, only
  when it does not fit, shrinks number + unit together to the column (same Outfit 200, same position,
  same one-gutter pair, widget untouched); it re-fits when the font arrives and when the column's width
  changes. No CSS changed. Injected in Playwright (JSON routed, widget stubbed), number box right edge
  → widget box left edge at 1440/1525/1920: "0.7–1.0" 26.2 px (112 px type), "1.8–2.4" 24.9 px
  (114 px), "10.0–12.5" 25.6 px (88 px); at 390 the widget is below (vertical gap 159 px) and the number
  fits the viewport (73.6 px type unchanged; right margin 139.8 / 143.8 / 78.1 px), no horizontal scroll.
  Sheets against round-4, per-capture pixel diff: only desktop 11–12 differ, in the headline's box
  (x 323–721); desktop 00 / phone 00 differ by the canopy's animation frame (same leaf coverage). The
  canopy renders blank in about half of headless swiftshader shoots, of this build and of the round-4
  build alike (checked side by side); round-5 is the shoot where it rendered. A stranger would not
  see it as generated any more than round-4.

- **round-6** (`shots/round-6/`, 4g round 3; served over http, live network, so the forecast is real).
  Sheets opened at both widths against `round-5/`. Desktop 15 captures / 11 689 px (round-5: 15 /
  11 729), phone 18 / 13 032 (18 / 13 092); `shoot.json` errors `[]` at both widths. The canopy
  rendered on the first screen in this shoot, so the known blank-canvas flake did not occur; desktop 00
  and mobile 00 are the round-5 first screen leaf for leaf — same headline position, same ratings
  block, same red button. Everything that differs is copy or the footer link: the intro is two lines
  shorter and now ends "Kabalana Beach is a five-minute walk."; the offer paragraph reads "private
  lockers" and "The bathrooms are modern and the showers are hot"; "What is here" is one line longer
  and ends "Reception is open 24 hours."; the amenity row reads "Private lockers…"; the rates line
  reads "Rates change with the dates, and the booking links below show what is actually free."; and
  both footer captures read "Open in Google Maps" where round-5 read "Open the map". Because the page
  is 40 px (desktop) / 60 px (phone) shorter, every capture below the intro is offset by that much and
  the scroll-driven canopy sits at a slightly different frame in each — no element moved relative to
  its section. The forecast shows live values for this hour ("0.7–1.1 m", 20:30, swell 12.0 s, wind
  11 km/h) instead of round-5's 14:30 numbers, with Rosa's widget beside it at 1440 and below it at
  390, as before. No overlap, no overflow, no unreadable text, no clipped line at either width. As a
  piece of design it is round-5: nothing about it reads as generated that did not before, and the
  looser, spoken "What is here" paragraph reads more like a person than the fragments it replaced.

- **round-7** (`shots/round-7/`, the correction; served over http from `dist/`, live network).
  Desktop 15 captures / 11 689 px, phone 18 / 13 032 — **the same page height as round-6 to the
  pixel**, `shoot.json` errors `[]` at both widths, and the canopy rendered on the first screen in
  this shoot (the blank-leaves flake did not occur; a first attempt on the wrong port, an old server
  of another build, was thrown away). Sheets opened at both widths against `shots/critic-3/`
  capture for capture, and every capture also diffed pixel by pixel: **desktop 01–10 and 12 are
  byte-identical to critic-3, phone 01–15 likewise**; desktop 11 differs only inside the Rosa block
  (live data an hour later: "0.7–1.1 m" at 20:30 instead of critic-3's hour), and the only other
  captures that differ are the ones carrying a score — desktop 00 and 13–14, phone 00 and 16–17
  (desktop 00's diff also carries the canopy's animation frame, as every shoot of it does).
  **The only thing that differs anywhere is the capture date.** The first
  screen: identical leaf for leaf, same headline position, same red button, same "9.8" — with
  "read 19 September 2026" added under "Hostelworld, 66 reviews" and after each of the two rows
  beside it, so the proof block is three lines taller and, because the clearing is vertically
  centred, everything in it sits ~9 px higher at 1440 and ~39 px higher at 390. The footer tiles:
  same three red rectangles at the same size and position, their content 22 px higher inside the
  box because it is bottom-aligned and there is one line more of it. The slide-out's tiles at 390
  are the one proportion that changed: they grow from 3:4 to about 3:4.7 because "read 19 September
  2026" needs two lines in a 92 px column — nothing clips, nothing overlaps, the row still fits the
  panel. As design it still reads as the picked mockup: the date is a whisper under a number, in
  the same type and the same black, and a stranger would take it for a footnote the designer wanted
  there. What is wrong with it, if anything: at 390 the footer tiles break the date as
  "read 19 September / 2026", which is ragged; the alternative was a short "19 Sep 2026" that reads
  like a receipt, and I chose the ragged wrap.

- **round-8** (`shots/round-8/`, correction 2; served over http from `dist/`, live network, so both
  the forecast and the map tiles are real). Desktop 15 captures / 11 689 px — **the same page height
  as round-6 and round-7 to the pixel**; phone 18 / 13 400 (round-7: 13 032), 368 px taller because
  on the phone the map stacks under the text instead of sitting beside it. `shoot.json` errors `[]`
  at both widths. The canopy rendered on the first screen (two shoots were thrown away first: the
  known blank-leaves flake, then one where Rosa's widget was still painting at capture 11 — it was
  fully painted at capture 12 of that same shoot, so the frame had arrived; `--settle 1400` fixed
  the capture). Sheets opened at both widths against `shots/seo-4/`, and every capture also diffed
  pixel by pixel:
  - **Desktop 01–09, 13 and 14 are byte-identical to seo-4.** Only three captures differ, and they
    are the two things that were asked for: **10** (Getting here — the map box is drawn in the left
    column where seo-4 had empty space, with the pin on the hostel and "Map © OpenStreetMap
    contributors" under it), **11** (the forecast — same headline, same widget, the channel between
    them clearly wider, both halves 36 px left of where they were because the pair re-centres), and
    **12** (2.4 %, only the top strip: the lower half of Rosa's widget, in its new position).
    Desktop 00 differs by 1 % — the canopy's animation frame, as it does in every shoot of it.
  - **Phone 01–12 and 17 are byte-identical.** 13 carries the top of the map box, 14–16 are the same
    content pushed down by the map's 368 px. Nothing else.
  Nothing overlaps, overflows, clips or is unreadable at either width. As a piece of design: the map
  is what the section was composed around — the text column has sat at 7/12 with columns 1–4 empty
  since the map was taken out, and a beach-and-road drawing in that hole reads as the reason the
  text is where it is, which the empty version never did. The forecast is the better half of the
  change: at one gutter the "m" of "0.7–1.1 m" was inside the widget's shadow and the two halves
  read as one crowded object; at 96 px they read as the site's voice and Rosa's, side by side, which
  is what the playbook's two-halves rule is for. What is still wrong: the map's own credit strip
  ("Report a problem | © OpenStreetMap contributors | Make a Donation…") sits inside the frame in
  OSM's type, directly above our own credit line — two credits in two typefaces, and only the second
  is ours. It is OSM's frame and may not be restyled or cropped, so it stays. **Closed by correction
  3:** the frame is Google's now and there is only one credit, Google's own, inside it.

- **round-9** (`shots/round-9/`, correction 3; served over http from `dist/`, live network, so the
  map tiles and the forecast are real). Desktop 15 captures / 11 713 px, phone 18 / 13 448 (round-8:
  11 689 / 13 400 — the 24 px and 48 px are the footer's two contact links becoming 44 px targets).
  Sheets opened at both widths and every capture diffed pixel by pixel against `shots/critic-4/`.
  **What is wrong with it as design:** nothing in the page, but one pixel in the room list —
  "Check dates" sat a pixel lower than before (desktop-03, 0.21 % of the capture, x 1232–1319),
  because the symmetric negative margin centred a box one pixel shorter than the old one, which had
  a border inside it. **What I changed:** the three block-level targets get `-11px -10px` instead of
  `-11px -11px`, so their margin box is exactly the old one. **Would a stranger guess it was
  generated:** no — and the map is the reason. The OpenStreetMap frame drew a pale beige street
  plan with its own donation strip along the bottom in its own type; the Google frame draws the
  coast in flat blue against the page's cool grey, the beach and the road labelled, the neighbours'
  names in Google's orange and purple pins, and its attribution is a hairline of grey text along
  the bottom edge. Without the border it stops being "an embedded widget in a box" and becomes the
  drawing the section was composed around, facing the text across the thin ink line.
- **round-10** (`shots/round-10/`, the one-pixel fix; same server, same live network). Same
  geometry: desktop 15 / 11 713 px, phone 18 / 13 448. Against `shots/critic-4/`, capture by
  capture: **desktop 02–09 and 13 are byte-identical; mobile 01–12 and 16 are byte-identical.**
  What differs, all of it asked for or explained: desktop 10 (the map, 9.5 %), 11–12 (the forecast's
  live numbers and Rosa's widget, 2.0 % / 0.5 %), 14 (7.9 % — the footer's contact links plus the
  whole frame offset by the 24 px the page grew); mobile 13–14 (the map), 15 (the forecast's live
  numbers), 17 (the footer, 21.8 %, same two causes). Desktop 00–01 differ by ~89 % and ~74 %, which
  is the WebGL canopy's animation frame: round-9 against round-10 gives the same numbers, and the
  hero's type, button and ratings are byte-identical in a crop that excludes the canvas.
  **I opened the phone sheet and looked at it, not only at the numbers.** The padding does not crowd
  the phone: the room rows were already 81–110 px tall with the link centred, so a 46 px hit area
  disappears inside them; the hero's two rating links are 55 px apart and read exactly as before;
  the map fallback and the Rosa credit sit alone on their lines. The one place the eye can see the
  change is the footer, where the phone number and "Open in Google Maps" now have air between them
  instead of touching — and it reads better, as two things you can tap rather than a two-line
  address run-on. Nothing overlaps, overflows, clips or is unreadable at 390 or 1440.
  `shots/round-10/states/`: `arrival-390/1440`, `map-live-390/1440`, `map-blocked-390/1440`,
  `forecast-blocked-390/1440`, `forecast-live-390`, `cta-panel-390/1440`.

## facts — every fact on the page → dossier key

| on the page | dossier key |
|---|---|
| KA Surf Hostel | `business.name` |
| Surf, chill and feel at home in Ahangama | `business.tagline` |
| Five minutes from Kabalana Beach; a five-minute walk | `location.distance_to_beach` |
| a family runs this place | `business.run_by` |
| dorms and private rooms; the six room rows and beds | `room_types[]` |
| A/C and fan, private lockers, personal fridge, modern bathrooms, hot showers (amenity row: "Private lockers and personal fridge in every room") | `facilities[]`, `business.description_long` (round 3: "open to the sky" and the singular locker are gone — review.md round 8) |
| they set out to make you feel at home from the moment you arrive | `business.description_long` ("making you feel at home from the moment you arrive"; round 3 replaced the unsourced "about ten minutes after you drop your bag") |
| breakfast (heading "Breakfast, every day"; rotis, fruit, pancakes and eggs, vegan options; amenity "Free breakfast") | `business.description_long`, `facilities[]` (copy/sources.md, review.md round 5) |
| "Family" is the word guests use; the dengue story | `reviews.quotes[1,2,6,7,9]` |
| staff 9.9/10 on Booking.com (highest there); 9.9 on Hostelworld, value for money and security 10 | `reviews.booking.categories`, `reviews.hostelworld.categories` |
| garden, chill zone, filtered water, laundry service, minimarket, scooter rental with a surf rack available, luggage storage, lockers, reception open 24 hours | `facilities[]`, `business.description_long` (round 3: "if you ask" is gone) |
| the 17 amenity rows | `facilities[]` |
| pets on request, no charge; children not accommodated; no cots or extra beds | `house_rules[]`, `facilities[15]` |
| Koggala Airport about 5 km; Ahangama station a little over 2 km | `location.nearby` (3.3 mi, 1.3 mi) |
| the property arranges a shuttle | `facilities[13]` |
| check-in 13:00–23:00, check-out by 13:00, reception 24 hours | `hours_note` |
| 207/A Welahangoda, 80650 Ahangama, Sri Lanka | `location.address` (Google spelling, Shahar 2026-09-22; copy/sources.md) |
| +94 77 374 6053 | `contact.phone` |
| Open in Google Maps ("Getting here", the map box's fallback and the footer, same URL) | `location.map_url` |
| JSON-LD geo 5.98181, 80.35206, and the map embed's pin and centre (correction 2; correction 3 replaced the OpenStreetMap `bbox` with Google's `z=15`) | `location.plus_code` (X9J2+PR) |
| Google's map: the roads, the beach and the neighbouring businesses drawn inside the frame | not a fact about the business, and not ours: Google's map data, credited by Google inside its own frame ("Map data ©2026", Terms, the Google mark). Nothing in it is restated in the site's copy, exactly as with Rosa's widget. **What it costs the visitor, measured 2026-09-23 after the block scrolls near — never on first load:** 32 responses across 5 Google hosts (`www.google.com`, `maps.googleapis.com`, `maps.gstatic.com`, `fonts.googleapis.com`, `fonts.gstatic.com`), **about 800 KB over the wire in the phone's 350 × 320 box at 2x** and about 570 KB in the desktop's 384 × 520 box at 1x. It sets **no cookie** on the site's context and **no cookie, localStorage or sessionStorage inside the frame** (all three read as empty). For comparison, the OpenStreetMap frame it replaces cost 11–14 requests and 370–390 KB. So the swap roughly doubles the bytes and triples the requests of a map the visitor has to scroll to, and it is still outside the first-load budget, which is unchanged at 235 KB / 8 requests / 0 third-party |
| 9.8/10, 66 reviews, Hostelworld | `reviews.hostelworld` |
| 9.5/10, 38 reviews, Booking.com | `reviews.booking` |
| 4.8/5, 42 reviews, Google | `reviews.google` |
| "read 19 September 2026" under each of the three scores and on the two booking tiles that carry one | `reviews.hostelworld.fetched_at`, `reviews.booking.fetched_at`, `reviews.google.fetched_at` — all `2026-09-19T17:05:00Z`, read by the seed into `ratings[].capturedAt` (schema v0.4). The word "read" is the template's; the date is the dossier's. This is the one number on the page that is not in `copy/en.json`, which is why `audit.json` `facts.numbers_not_in_passed_copy` now lists `19` |
| quotes: Wolfgang, Elena (March 2026), Mia (February 2026), Clara, Saketh (February 2026) — verbatim | `reviews.quotes[3,7,9,1,8]` (author as shortened in copy/en.json) |
| Kabalana: sandy beach break for beginners and intermediates; The Rock, a reef A-frame for advanced surfers | `location.spot` |
| the three booking links | `booking.engine_url`, `booking.other_engines` |
| Photographs: KA Surf Hostel's own, from its Booking.com listing and Instagram | `images[].source_url`, `license` business-owned |
| Rates change with the dates, and the booking links below show what is actually free | `gaps[]` "offers" — "nightly rates are live, dated inventory on the OTAs" (copy/sources.md; round 3 dropped "with the season") |
| Rosa's numbers | not a fact about the business: live third-party data, labelled and linked (base.md constraint 1 exemption); spot mapping from concepts.md concept 3 |

## editable — owner-editable item → schema field (where it is edited in Payload)

| on the page | schema field (admin tab) |
|---|---|
| name (top line, clearing, footer, title) | `businessName` (Basics) |
| line under the name; meta description | `tagline` (Basics) |
| headline + lead paragraphs | `copyBlocks[]` first `intro` row: `heading`, `body` (Text) |
| "Dorms and private rooms" + paragraph; the "Rates change…" line in the footer and slide-out | first `offer` row: `heading`, paragraph 1, paragraph 2+ (Text) |
| breakfast section ("Breakfast, every day" + body) | first `about` row (Text) |
| "What guests say about the staff" | second `about` row (Text) |
| "What is here" | first `info` row (Text) |
| "Getting here" | second `info` row (Text) |
| room list + each row's "Check dates" context line | `rooms[].label`, `rooms[].beds` |
| amenity list | `amenities[].label`, `.note` |
| check-in / check-out times, the note under them | `stayInfo.checkInFrom/To`, `checkOutFrom/To`, `stayInfo.note` |
| the 11 photographs and their alt text | `photos[]` order + `media.alt` (Photos); slots: 0 rooms print, 1 dorm print, 2 breakfast, 3–5 garden field, 6 veranda, 7 night print, 8+ beach row |
| ratings in the clearing and on the tiles, each with its capture date | `ratings[]` — `platform`, `score`, `scale`, `count`, `url`, `capturedAt` (all deployer-seeded; the owner may delete a whole row, and deleting it takes its date with it, but may not add or re-date one) |
| the five quotes | `testimonials[]` in order: rooms, breakfast, staff (large), staff, staff (deployer-seeded; owner may delete) |
| spot sentence | `spot` |
| phone (Call, "or call", footer) | `contact.phone` (Contact & booking) |
| address (Getting here, the map box's fallback, footer, JSON-LD, llms.txt, the town in the title) | `contact.address` |
| "Open in Google Maps" (Getting here, the map box's fallback, footer) — the link target | `contact.mapUrl` |
| every "Check dates" (first link), the tiles (all links) | `bookingLinks[]` (first row is the primary action) |
| forecast on/off, spot name in it | `forecast.enabled`, `forecast.spotName` (`rosaSpotId` deployer-only) |

Not editable, by design: layout, the canopy, colours, type, interface words ("Check dates", "Call",
"Check-in", "Open in Google Maps", "read" before a rating's capture date and the way that date is
spelled, the forecast's sentence frames), platform names and marks.

## images

All business-owned (`dossier/…/assets/index.json`), none captioned, none tied to a room type, none drawn
wider than its crop (largest drawn 480 px from a 576 px crop). Cropping is done by `scripts/photos.mjs`
(3:4, centred), the seed only turns the two sideways Instagram squares upright (270°, found by comparing
against the mockup's crops).

| asset | source | crop / widths | slot |
|---|---|---|---|
| img-001, img-004, img-003, img-005, img-006, img-008, img-002 | Booking.com listing | 576×768 (native 3:4) · 264–576 | prints, as round 16 |
| img-012 | Booking.com listing | 1024×576 → 432×576 centre · 264–432 | night print |
| img-023 (turned 270°), img-020, img-021 (turned 270°) | own Instagram | 640×640 → 480×640 centre · 264–480 | beach row |

Platform marks `public/img/{hostelworld,bookingdotcom,agoda}.svg`: the mockup's files unchanged; sources
and terms as in `mockups/unique/notes.md` `images` (Booking.com: Simple Icons, CC0 SVG data; Hostelworld and
Agoda: their own SVGs, no licence granted, used only to label links to the hostel's listings).

Font: Outfit, `@fontsource-variable/outfit` 5.3.0, `files/outfit-latin-wght-normal.woff2` from
cdn.jsdelivr.net (sha256 6c18d579…87e887), latin subset with its unicode-range, one variable file for all
weights used (200/300/400/500), `font-display: swap`, preloaded. SIL Open Font License 1.1, copied to
`public/fonts/ofl.txt` (served with the font). No metric-matched fallback face was added.

## gaps

- **No WhatsApp** (`contact.whatsapp.gap`): schema v0.3 makes `contact.whatsapp` **required** and
  "always the primary CTA"; the seed leaves it `null` (the value would not pass Payload's validation).
  The page does what the mockup does: first `bookingLinks[]` row as the primary action, phone beside it,
  no prefilled message. **Schema gap / blocking for a Payload seed.**
- **No email** (`contact.email.gap`): not shown.
- **No rates** (live OTA inventory): the offer block's second paragraph says so; no numbers.
- **No season** (`season: null`), **no reply time**, **no opening hours** beyond stayInfo: not shown.
- **Instagram** is in the dossier but not in copy/en.json, and schema v0.3 has no social-links field:
  not linked.
- **Schema gaps the design needs** (values kept in `src/lib/site.mjs`, marked SCHEMA GAP):
  1. geo coordinates for JSON-LD `geo` and, since correction 2, for the OpenStreetMap embed's pin
     and bbox as well (v0.3 has only `contact.mapUrl`; both come from `location.plus_code`);
  2. the place in the page title ("Ahangama"; no SEO title/description field);
  3. a photo-credit line (the footer's "Photographs: KA Surf Hostel's own, from its Booking.com listing
     and Instagram." becomes untrue if the owner uploads a photo from elsewhere).
- **Photo slots by position**: v0.3's `photos[]` says the first row is the hero; this design has no hero
  photograph (the first screen is drawn), so rows are placed by index (see `editable`). Testimonials
  and same-slot copy blocks are placed by order too; the schema has no placement field.
- **`copyBlocks[].slot` `about` holds two sections** (breakfast, staff) told apart only by order.
- `canonical`, `hreflang`, `og:url`, `og:image` are emitted only when `SITE_URL` is set at build (there
  is no domain yet and URLs must stay relative). JSON-LD `Hostel` carries name, tagline, address,
  telephone and the three listings; no rating (third-party scores).

## conflicts

- ~~**Map — OPEN. The page carries a second third-party embed against playbook §4.**~~ **Closed
  2026-09-22 by the playbook itself:** playbook 0.4.0 §4 and designer base.md 0.3.4 now allow **two**
  third-party embeds per page, each lazy, each with reserved space and a plain-link fallback, with
  every budget line met with both loaded. This page has exactly two — Rosa's widget and the map —
  and meets all of it (measured below and in the budget table). The entry stays for the record
  because it was open for a day; it is not open now.
- **The map is Google's, not OpenStreetMap's — no longer a conflict with anything, but here is what
  it costs.** Correction 3 (2026-09-23) swapped the frame on Shahar's instruction so the map shows
  the surrounding places rather than only our pin, and dropped the page's own credit line because
  Google draws its attribution inside the frame. There is no rule in playbook §4, base.md or
  custom.md that this breaks. Three things for the human to know anyway:
  - It roughly doubles what the map costs a visitor who scrolls to it: ~800 KB over the wire in the
    phone's box (OpenStreetMap: ~370 KB), 32 responses across 5 Google hosts (OSM: 11–14, one host).
    Nothing on first load either way.
  - It sets **no cookie** on our context and **no cookie or storage inside the frame** — measured,
    not assumed. So it does not turn the page into something that needs a consent notice.
  - Google's terms for the no-key embed are not something I can check from here; the frame is used
    exactly as Maps' own "Share → Embed a map" hands it out, unmodified and uncropped.
  - The alternative, if the bytes ever matter more than the detail: a self-hosted static map image
    of the same frame, linking to Google Maps — one request from our own origin, no third party.
  - Round 3's own record, and round 1's, follow.
- ~~**Map (open, for Shahar).**~~ Playbook §4: Rosa's widget is "the one third-party embed a site may
  carry", and "Map is a static image linking to Google Maps, not an embedded map on load". Kept exactly
  as the mockup has it, as briefed: OpenStreetMap's embed in "Getting here", never on first load
  (0 requests at 390 with no scroll), `src` set only near the section, box reserved, address + "Open the
  map" link with JS off. One addition: a single opaque HEAD request to the embed URL before the frame
  is loaded, so an offline or blocked network keeps the address instead of a dead frame. Not decided
  here; the alternative is a self-hosted static map image linking to Google Maps.
- **Fallback shape — closed in round 3 (critic fix 2).** Playbook: "the block shows a plain link".
  The page still shows it once, inside the widget's reserved box, with no numbers and no duplicate
  credit — but the headline half is now hidden with `visibility`, not removed, so its 351×289 (350×232
  on the phone) box is reserved on every path. Nothing moves on success, on a slow failure, on stale
  data or with JS off: measured 0 at 390 and 1440 on all five paths (round 3, above). What it costs:
  in the fallback the left half is blank space beside the link instead of the link centring itself.
  That is the trade the rule asks for — a reserved box that always holds.
- **"The hour that is now."** `current` is the hour Rosa computed at `generated_at`; up to 24 h later the
  page still shows it, labelled with its own time rather than "now". Picking the nearest `hours[]` row
  instead would contradict tools.md (headline = `current`).
- **Rosa's card is rounded and has its own type and colours** (custom.md: nothing rounded) — the rule
  says never restyle it; unchanged from round 16.
- **Morph behind the headline while scrolling.** With the shorter walk, the leaves close while the
  headline is still leaving the screen, so for part of that scroll green passes behind the letters (not
  over them). Round 16 had the same, over a longer scroll.
- **Authoring hooks.** ~~`?svg` deleted (as the mockup's notes asked). `?no-webgl` (forces the 2D canvas)
  and `?open` (opens the slide-out for screenshots) are still in the script; harmless, but they are
  test hooks.~~ **Resolved in the correction of 2026-09-22:** all three are gone; the script no longer
  reads the query string. The no-WebGL path is only the capability check, and the slide-out is only
  opened by a click.
- **Pointer guard.** New in 4g: the pointer may not push a blade into the headline; everywhere else the
  canopy answers the pointer as before.

- **Correction of 2026-09-23 (Shahar: stop the 404; add a skip link).** The map's pre-flight now sends
  its opaque `HEAD` to `https://www.google.com/generate_204` (same host, answers 204) instead of the
  embed URL, which answers `HEAD` with 404 and logged one console error per visit. The probe's job is
  unchanged: it rejects only when Google cannot be reached, and then the address and link stay. A skip
  link ("Skip to content") is the first focusable element, off screen until focused, and moves focus to
  `<main id="main">`. Measured on the live preview (version `ab0642d3`) at 390 and 1440: map switched
  on, skip link visible at top 8 px on Tab, focus lands on `main`, zero console errors and zero
  4xx/5xx responses. Chromium reports the probe as `net::ERR_ABORTED` to automation (the opaque body is
  dropped); it is not logged to the console.

## Not done / not verified

- No real phone or GPU (headless Chromium, software GL). No Payload build (no tenant; the fetch step was
  only checked to refuse without credentials). `si` or any second locale: none (run.yaml `en`).
- No throttled test of the forecast fetch itself (90 KB) beyond the 10 s timeout in code.
- Platform marks' brand guidelines not checked (as at 4e).
