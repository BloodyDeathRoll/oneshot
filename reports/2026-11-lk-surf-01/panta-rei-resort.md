# panta-rei-resort · critic scorecard

critic 0.4.3 · rubric 0.3.2 · run `2026-11-lk-surf-01` · station 4f · 2026-11-06

---

## Round 1 · quick mode (mockup pre-score)

Scored blind to `panta-rei-resort.visual.md` and `panta-rei-resort.experience.md` (not opened). Dimension 8 belongs to the two visual critics, so the totals below are dimensions 1–7 only, out of 80. Gating in quick mode: no hard fail, and dimensions 1, 3 and 7 at 6 or more. Dimensions 2, 5 and 6 are reported but do not gate. Dimension 4 is reported too.

### What was run (same order, same viewports for all three)

| check | how | evidence |
|---|---|---|
| performance, a11y, no-JS, reduced motion, facts lead | `node tools/audit-mockup.mjs panta-rei-resort <variant>`, re-run by the critic at 11:17–11:19Z (I did not trust the designer's copies) | `sites/panta-rei-resort/mockups/{calm,interactive,unique}/audit.json` (`measured_at` 2026-11-06T11:17:06Z / 11:18:03Z / 11:18:55Z) |
| scrolled screenshots, 1440 and 390 | `node tools/shoot.mjs`. Calm and interactive reused their shared `shots/` because the build was unchanged. I shot unique again over http (`shots/http/`), because its `file://` set logged `Fetch API cannot load file://…/frames/…` and so could not show the film | `calm/shots/`, `interactive/shots/`, `unique/shots/http/` |
| booking tap-through, 390 × 844, touch | Playwright: tap the hero "Check dates", choose Suite, 10–13 Dec 2026, 2 guests, tap the hand-off; external hosts intercepted and their URLs logged. Then again with JavaScript off | log below |
| keyboard | Playwright at 390 and 1440: Tab to the hero CTA, Enter, 40 × Tab, Esc, check where focus lands | table below |
| reduced motion | `reducedMotion: 'reduce'`, scrolled to the bottom, counted video and frame requests | 0 / 0 for all three |
| delivery | grepped `dist/index.html` for absolute or root URLs and secrets, listed `dist/` files | none found except Google Fonts |
| unique's film frames | loaded at 390 and 1440, **no scroll, touch or key**, logged requests for 12 s | below |
| default look | `node tools/check-design.mjs panta-rei-resort --no-shots` | 0 problems, 0 warnings |
| facts | every number, name and claim in each page's DOM text (drawers, alt text and aria labels included) checked against `dossier.json`. Quotes and numbers were also checked by script | facts table below |

### Facts table (all three pages; they carry the same passed copy)

| claim on the page | dossier key | calm | interactive | unique |
|---|---|---|---|---|
| "Panta Rei Resort", logo img-023 | `business.name`, `images[img-023]` | match | match | match |
| boutique resort, Kabalana, Ahangama, south coast of Sri Lanka | `business.description`, `location.address` | match | match | match (hero line "Boutique resort · Kabalana, Ahangama") |
| owner's welcome paragraph, "16 bungalows … natural materials" | `business.description`, `room_count` 16 | match | match | match (caption 1 too) |
| "No paradise like home." | `business.tagline` | match | match | match |
| Double Room 22 m², king or twin, sleeps 3, balcony over the pool, en-suite shower | `room_types[0]` | match | match | match |
| Triple Room 30 m², king and sofa bed, sleeps 3, bathtub and shower | `room_types[1]` | match | match | match |
| Family Villa 50 m², two king or four single, sleeps 4, two bedrooms, garden view, outdoor bath | `room_types[2]` | match | match | match |
| Suite with Private Pool 40 m², king, sleeps 2, own pool, built-in sofa | `room_types[3]` | match | match | match |
| every room: A/C, hot water, wifi, cleaned daily, breakfast | `room_types[].features` | match | match | match |
| engine home and the four `/listings/5727xx` URLs | `booking.engine_url`, `booking.engine_rooms` | identical character for character | identical | identical |
| pool day pass 3,500 LKR per person, spent at the restaurant | `offers[0]` | match | match | match ("Price as of 6 Nov 2026" = `fetched_at` 2026-11-06) |
| fitness class 2,500 / 3,000 / 3,500 LKR per class, no need to book | `offers[1–3]` | match | match | match |
| Vinyasa 8:30 Mon–Thu, Sat, Sun, Friday off (week strip) | `facilities[2]` | match | match | match |
| Surf Therapy and Revitalizing massage 20,000 / 17,000 LKR, 60 / 45 min | `offers[4–7]`, `facilities[4]` | match | match | match |
| restaurant 8:30–12:00 (coffee 8:00), 13:00–17:00, 18:00–21:30, every day | `restaurant_hours` (12 h times written as 24 h) | match | match | match |
| dishes: smoothie bowls, granola, banana oat pancakes, shakshuka, egg hoppers / dhal / coconut sambal, fish bowl, curry of the day, whole grilled fish priced on weight | `menu.sections` | match | match (menu tabs) | match |
| Booking.com 9.2/10 · 468, Google 4.7/5 · 213, as of 6 Nov 2026 | `reviews.booking`, `reviews.google`, `fetched_at` 2026-11-06 | match | match | match |
| six guest quotes, author and source | `reviews.quotes[]` | 6/6 verbatim (Arianna's line break kept as a paragraph) | 6/6 | 6/6 (line break kept as `<br>`) |
| Koggala Lake 1.5 km, Koggala Airport 5 km, Kathaluwa 1.9 km, Ahangama station 2.1 km; Kabalana Beach "a short walk" | `location.nearby`; `contradictions[0]` resolution | match | match (also in the km list) | match |
| tuk tuks at the door, taxi on request | `stay_info.transport` | match | match | match |
| Back to Life Road, Kabalana Rd, Ahangama 80650, Sri Lanka | `location.address` (playbook §6 capitalisation) | match | match | match |
| +94 72 800 3022 (tel), wa.me/94728003022 | `contact.phone`, `contact.whatsapp` | match | match | match |
| hello@pantareiresort.com | `contact.email` | match | match | match |
| check-in 14:00, check-out 11:00; children welcome, no pets, no smoking inside, quiet 22:00–08:00 | `stay_info` | match | match | match |
| 16 amenities, including extra adult bed US$20 per night and a free cot for under-2s | `facilities`, `stay_info`, `offers[8]` | match | match | match |
| "Booking direct gets you our best rate" | `booking.path.note` ("best available rates") | match | match | match |
| groups paragraph | `business.group_hosting` | match | match | match |
| Instagram, Facebook, YouTube, Booking.com and Google Maps links | `contact.socials`, `booking.other_engines`, `location.map_url` | match | match | match |
| alt text (e.g. "garlic prawns", "surfboard leaning outside", "guests carrying surfboards") | `images[].shows` | match | match | match |

**Result: 0 mismatches and 0 claims without a dossier entry on any page.** The audit's `numbers_not_in_passed_copy` ("3,500", "2,500", "3,000", "20,000", "17,000") are copy values written with a thousands separator, and they match the dossier.

### Booking tap-through log (390 × 844, touch, 2026-11-06)

| | calm | interactive | unique |
|---|---|---|---|
| hero CTA | "Check dates", full width at the bottom of the hero (16,768 358×56), `href` engine home | "Check dates", centred (112,435 166×56), `href` engine home | "Check dates", centred (113,454 165×54), `href="#book"` |
| "Check dates" visible on the first phone screen | 1 | 1 | **2** (header pill + hero) |
| tap 1 | drawer opens | drawer opens | drawer (`<dialog>`) opens, Double Room already selected |
| tap 2: Suite, 10–13 Dec, 2 guests, hand-off | `https://pantareiresort.holidayfuture.com/listings/572798?start=2026-12-10&end=2026-12-13&numberOfGuests=2` | same URL | same URL |
| taps from hero to engine | 2 (target `clicks_to_book` 2) | 2 | 2 |
| primary action class | engine = `recommended.primary_action` | engine | engine |
| WhatsApp hand-off from the drawer | `wa.me/94728003022`, "Hi Panta Rei Resort, I'd like to ask about the Suite with Private Pool, 10 Dec to 13 Dec, 2 guests." | `wa.me/94728003022`, "Hi Panta Rei! I'd like to check availability for the Suite with Private Pool, 10 Dec to 13 Dec, 2 guests." | `wa.me/94728003022`, "Hi Panta Rei! I'd like to ask about the Suite with Private Pool, 10 Dec to 13 Dec, 2 guests." |
| JavaScript off | hero lands on the engine home (1 tap); "Book this room" links go straight to each room's page | hero lands on the engine home; room cards are plain `/listings/<id>` links | hero jumps to `#book`, which holds the four room links, engine home, WhatsApp and `tel:` (2 taps) |

### Keyboard (Playwright, 390 and 1440)

| | calm | interactive | unique |
|---|---|---|---|
| drawer opens on Enter, focus inside | yes / yes | yes / yes | yes / yes |
| 40 × Tab stays in the drawer | 0 escapes | 0 escapes | native modal `<dialog>`: focus goes to the browser chrome (BODY) once per cycle and comes back. That is the platform's behaviour, not a trap |
| Esc closes, focus returns to "Check dates" | yes | yes | yes |

`audit.json` shows calm and interactive as `drawer_triggers 0` / "no drawer". This is a tool convention, not a defect: their triggers are `data-drawer` / `data-book` links to the engine, and the tool looks for `[data-open-drawer]`. The manual pass above replaces it.

### Budget table (playbook §4; `audit.json` first_load = 390 px phone, throttled, no scroll)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer, video excluded | ≤ 1.5 MB | 1,264 KB | 1,134 KB | 497 KB |
| hero video after first paint, phone | ≤ 2 MB | 1.94 MB (`vid-001-p608.mp4`) | 1.79 MB (`hero-m1280.webm`) | no video. **The 150-frame sequence is 4.66 MB** (see below) |
| hero video after first paint, desktop | ≤ 4 MB | 3.72 MB (`vid-001-d1920.webm`) | 3.43 MB hero **+ 1.87 MB `welcome-720.webm`**, fetched with no scroll because the Welcome frame peeks into the first screen | no video. **Frames are 9.20 MB** |
| JS (external) | ≤ 300 KB | 0 (inline in a 77 KB HTML) | 0 (inline, 110 KB HTML) | 0 (inline, 101 KB HTML) |
| largest above-the-fold image | ≤ 300 KB | 160 KB | 251 KB | 172 KB |
| fonts | ≤ 2 families, ≤ 150 KB | Figtree + Gochi Hand, 40 KB | Fredoka + Nunito Sans, 79 KB | Bricolage Grotesque + Hanken Grotesk, 112 KB |
| LCP (throttled) | ≤ 2.5 s | 740 ms | 896 ms | 600 ms |
| CLS / scroll CLS early · settled | < 0.1 / < 0.01 | 0 / 0.0002 · 0 | 0.0006 / 0.0013 · 0 | 0.0017 / 0.0016 · 0.0016 |
| third-party on load | 0 | fonts.googleapis.com, fonts.gstatic.com (allowed at 4e) | same | same |
| horizontal overflow at 390 | none | `scrollWidth` 390 | **`scrollWidth` 404**: the review "next" arrow `button.rbtn` reaches x = 404 and the page scrolls 14 px sideways | `scrollWidth` 390 |

**Unique's film frames (the known item, judged).** notes.md conflict 1 says the frames load "on the first scroll, touch or key, **or 4.5 s after load**". I measured it with no scroll, touch or key at all. At 390 px the first frame request went out 4.9 s after navigation, and by 12 s all 150 frames had arrived: **4,655,352 B, or 5.16 MB in total for a visitor who never scrolls**. At 1440 px the same happened: 4.9 s, all 150 frames, **9,200,712 B** (9.75 MB in total). So they are not gated on interaction: a phone that opens the page and stays on the first screen downloads 4.7 MB of frames.

They come after first paint, so `first_load` (497 KB) is not wrong, and they are inside the scroll playbook's own sequence ceiling (`agents/designer/scroll/playbook.md` §6: < 8 MB mobile, < 20 MB desktop). But they are 5× the concept's costing (0.9 MB phone / 1.6 MB desktop, concepts.md §4 concept 3), and 2.3× the playbook §4 line for after-first-paint hero motion (≤ 2 MB phone / ≤ 4 MB desktop). Under the rubric's hard-fail list (first-load transfer, JS, LCP) this is not a hard fail, but it is one budget line over, scored in dimension 2. Reduced motion and Save-Data fetch 0 frames (verified for reduced motion).

### Delivery (all three)

Static `index.html` plus self-hosted `img/`, `video/` (and `frames/` for unique). Every asset URL is relative. Filenames are lowercase. No root-absolute paths, no CMS or API calls, no `localhost`, no secrets. The only off-site requests on load are Google Fonts, which the 4e rule allows; they must be self-hosted at 4g. `dist/` sizes: calm 16 MB, interactive 27 MB, unique 28 MB.

### Default look (check-design, reported as facts)

- calm: Figtree (h1, body) + Gochi Hand (h2). Ground `rgb(247,249,251)` = hsl(210 33% 98%), cool white. 0 all-caps labels, 0/16 labelled headings.
- interactive: Fredoka (h1, h2) + Nunito Sans (body). Ground `rgb(250,251,248)` = hsl(80 27% 98%). Page tints lilac `#F3EEF5`, peach `#FCF1E8`, sage `#EEF4EC` (concept-flagged; they come from the guest booklet PDF). 0 all-caps labels, 0/23 labelled headings.
- unique: Bricolage Grotesque (h1, h2) + Hanken Grotesk (body). Ground `rgb(246,248,248)` = hsl(180 12% 97%). 0 all-caps labels, 0/17 labelled headings.
- 0 default-look warnings on any page.

### Look-log check

Each notes.md has at least three first-screen rounds with visible changes between them: calm rounds 1–3, interactive rounds 1–3, unique first-screen rounds 1–3. No station failure.

---

```
mode: quick        round: 1        variant: calm
total: pending dimension 8 (critic, dimensions 1–7: 72.6 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 claim rows match the dossier (facts table). 6/6 quotes verbatim. 0 numbers without a dossier entry |
| 2 | mobile + performance | 9 | 1,264 KB first load, LCP 740 ms, CLS 0, scroll CLS 0.0002 / 0, largest image 160 KB, fonts 40 KB, phone hero 1.94 MB (9:16 crop), desktop 3.72 MB, `scrollWidth` 390. Google Fonts still remote (allowed at 4e). `shots/mobile-00.png`: the aerial ring with "Panta Rei, Kabalana" on the scrim and a full-width coral button at the thumb |
| 3 | booking CTA | 10 | hero → drawer → `…/listings/572798?start=2026-12-10&end=2026-12-13&numberOfGuests=2` in 2 taps (= target), class engine. JS off: engine home in 1 tap. WhatsApp prefilled with business, room, dates and guests |
| 4 | brand fit | 8 | playbook §3 order present, from rooms through to the footer contact. The first screen gives name + place ("Panta Rei, Kabalana") but not the business type, which is one scroll down in the tagline. The closing uses vid-002 at 16 s, not the poster the concept named (notes conflict "Closing still"): a business-owned frame of the same clip, chosen so the closing does not repeat the hero. Not a fact issue |
| 5 | copy | 9 | the passed copy verbatim. Added words are interface labels only ("What guests say", "Good to know", "Ask us", "Scores as of 6 November 2026") |
| 6 | accessibility | 6 | keyboard drawer passes at 390 and 1440 (focus held, Esc, focus returned). Reduced motion: 0 video requests. Skip link, `lang=en`, 0 missing alt, heading order H1 → H2 → H3. **32 tap targets under 44 px** (`audit.json`): 26 slideshow and review dots at 28 × 28, and 6 footer nav links 39 px tall. notes.md does not mention them |
| 7 | security + delivery | 9 | static and relative, lowercase names, no CMS or secrets. Only Google Fonts off-site (a defect only from 4g) |

what the designer prompt got wrong: the designer's own `audit.json` (10:52Z) already reported `tapables_under_44px: 32`, but neither the look-log nor the conflicts list mentions it. The prompt's hand-off check does not force "every non-zero audit count is either fixed or listed in conflicts". Interactive fixed the same dots to 44 × 44 hit areas, so the rule is known but not enforced per variant.
fix list (fail only): none. Before 4g: 44 × 44 hit areas on the 26 dots, footer nav links ≥ 44 px tall.

---

```
mode: quick        round: 1        variant: interactive
total: pending dimension 8 (critic, dimensions 1–7: 72.0 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 rows match, plus the "From the resort" km list (5 / 2.1 / 1.9 / 1.5 km and "A short walk") and the menu tabs (dish names from `menu`). 6/6 quotes verbatim |
| 2 | mobile + performance | 7 | 1,134 KB first load, LCP 896 ms, CLS 0.0006, scroll CLS 0.0013 / 0, largest image 251 KB, fonts 79 KB, phone hero 1.79 MB. **At 390 the page scrolls 14 px sideways** (`scrollWidth` 404): the review "next" arrow is cut off at the right edge in `shots/mobile-10.png`. On desktop the Welcome clip (1.87 MB) loads with the hero (3.43 MB) without any scroll, so 5.3 MB of video arrives after first paint |
| 3 | booking CTA | 10 | hero → drawer → Suite page with `start` / `end` / `numberOfGuests` in 2 taps, class engine. JS off: hero → engine home, cards → room pages. WhatsApp prefilled with business, room, dates and guests |
| 4 | brand fit | 8 | the §3 order is present. **The hero title is the business name "Panta Rei, Kabalana", not the concept's "A short walk from the waves".** The concept itself named this fallback (concepts.md §6) until the copyeditor audits the new line, and notes.md lists it under conflicts. It is a correct line, not a fact problem, but the first screen carries name + place only, and the type is one scroll down. Menu tabs are relabelled Breakfast / Later on / Dinner from the copy's own words |
| 5 | copy | 9 | passed copy verbatim. Interface labels only ("Look inside", "From the resort", "Ask us for a ride", "Talk to us"). The ride message "Could you call a tuk tuk or a taxi for me?" rests on `stay_info.transport` |
| 6 | accessibility | 9 | keyboard drawer passes at 390 and 1440 (0 escapes in 40 Tabs, Esc, focus returned). 0 tap targets under 44 px, 0 missing alt, skip link, reduced motion fetches 0 video. Contrast was not measured with axe (quick mode) |
| 7 | security + delivery | 9 | static and relative, lowercase names, no CMS or secrets. Google Fonts only |

what the designer prompt got wrong: the look loop checks the phone at 390 by eye, but nothing in it asserts `document.documentElement.scrollWidth === innerWidth`. The 14 px sideways scroll from one arrow button passed five rounds. Unique's notes show that designer measured `scrollWidth` by hand. A one-line overflow assert in the designer's per-round checklist (or in `audit-mockup.mjs`) would have caught it.
fix list (fail only): none. Before 4g: keep the review arrow inside 390 px, and attach the Welcome clip only on scroll (or start the hero row lower) so desktop's first screen pulls one video.

---

```
mode: quick        round: 1        variant: unique
total: pending dimension 8 (critic, dimensions 1–7: 67.5 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 rows match. Captions 1–3 are verbatim copy (Welcome ¶2 excerpt, The pool ¶1, `spot`). "Price(s) as of 6 Nov 2026" = `offers[].fetched_at`. 6/6 quotes verbatim |
| 2 | mobile + performance | 5 | first load 497 KB, LCP 600 ms, CLS 0.0017, scroll CLS 0.0016 / 0.0016, largest image 172 KB, fonts 112 KB, `scrollWidth` 390. **But the 150-frame film is not gated on interaction: with no scroll, touch or key, all 150 frames load from 4.9 s after navigation, 4.66 MB at 390 (5.16 MB in total) and 9.20 MB at 1440 (9.75 MB in total).** That is 2.3× the ≤ 2 MB / ≤ 4 MB after-first-paint line, and 5× the concept's 0.9 / 1.6 MB costing. It is within the scroll playbook's < 8 / < 20 MB sequence ceiling, and reduced motion fetches 0 frames. Seen over http in `shots/http/mobile-01.png` to `mobile-04.png`: the drone rise with caption 2 over the ring |
| 3 | booking CTA | 9 | hero `#book` → `<dialog>` → Suite page with dates in 2 taps, class engine. JS off: hero → `#book` block → room page in 2 taps. WhatsApp prefilled. The drawer opens with Double Room pre-selected, so a visitor who changes nothing lands on the Double Room's page |
| 4 | brand fit | 8 | the first screen states type + place ("Boutique resort · Kabalana, Ahangama") under "Panta Rei", the only variant that does. **Two "Check dates" on the phone's first screen** (header pill + hero button; measured 2 visible, `shots/http/mobile-00.png`; notes conflict 6). The order is §3 with "After the surf" before "Restaurant" |
| 5 | copy | 9 | passed copy verbatim. Interface labels only ("Scroll", "Loading the film n %", "Check dates and book direct") |
| 6 | accessibility | 9 | `audit.json` keyboard: opens, Esc closes, focus returns. Native modal dialog. 0 tap targets under 44 px, 0 missing alt. Reduced motion: canvas hidden, 0 frames, three stills with the captions as DOM text. Contrast not measured with axe |
| 7 | security + delivery | 9 | static and relative, frames self-hosted, no CMS or secrets. Google Fonts only |

what the designer prompt got wrong: concept 3 costed the sequence at ≈ 0.9 / 1.6 MB, and nothing in the designer's or creative director's prompt makes that estimate binding or says which playbook §4 line an image sequence belongs to: first-load images, hero video after first paint, or the scroll playbook's own < 8 / < 20 MB ceiling. So the designer shipped 4.7 / 9.2 MB and called it "after first interaction", while the code also starts on a 4.5 s timer. Playbook §4 needs a row for "scroll sequence after first paint" with a number. The designer prompt should then require the trigger to be a real interaction or a near-viewport stage, never a timer, and require notes.md to state the bytes a non-scrolling visitor pays.
fix list (fail only): none. Before 4g (notes conflict 1 already asks Alon for a decision): drop the 4.5 s timer or report it honestly, bring the phone set to ≤ 2 MB or accept the 4.7 MB in writing, and remove one of the two first-screen "Check dates" on phones.

---

### The one sentence the human needs to pick

All three match the dossier on every fact and reach the right engine room page with the dates in 2 taps. Calm loads 1.26 MB first and has 32 tap targets under 44 px. Interactive loads 1.13 MB first but scrolls 14 px sideways on a 390 px phone. Unique loads only 0.50 MB first, but then pulls its 150-frame film (4.7 MB on a phone, 9.2 MB on desktop) 5 seconds after load even if the visitor never scrolls, and shows two "Check dates" buttons on the phone's first screen.

### Notes on the three known items

- **unique, scroll frames 9.1 / 4.7 MB "loaded only after first interaction":** measured as 9.20 / 4.66 MB, and **not** interaction-only: a 4.5 s timer starts them without any input (above). Scored in dimension 2 (5/10). Not a hard fail under the rubric's lines (first-load transfer, JS, LCP); notes conflict 1 already makes it a human decision at 4g.
- **interactive, hero title is the business name, not the concept's line:** the concept itself named this fallback (concepts.md §6, "or the designer uses 'Panta Rei, Kabalana'"), because "A short walk from the waves" is unaudited copy. The line is correct (`business.name`, `location`), so it is not a fact issue. Noted in dimension 4: the first screen gives name + place, not the type.
- **calm, closing uses a different film frame:** vid-002 at 16 s (gamma 1.18) instead of vid-002's poster. Same business-owned clip; notes give the reason (the poster is nearly the hero frame). Noted in dimension 4; no fact or licence issue.

Screenshots cited (`calm/shots/mobile-00.png`, `interactive/shots/mobile-10.png`, `unique/shots/http/mobile-00…04.png`) are scratch and will be deleted after the round; this scorecard records in words what each showed.

---

## Round 2 · quick mode (mockup pre-score, after the designer's 4f round-1 fixes, commit db7b42f)

critic 0.4.3 · rubric 0.3.2 · 2026-11-06. I did not read `panta-rei-resort.visual.md`, `.experience.md`, or any other critic's working files. The checks, viewports and order are the same as in round 1.

### What was run

| check | how | evidence |
|---|---|---|
| performance, a11y, no-JS, reduced motion | `node tools/audit-mockup.mjs panta-rei-resort <variant>`, re-run by the critic. Calm was run 3× because its LCP varied | `sites/panta-rei-resort/mockups/{calm,interactive,unique}/audit.json` (calm 12:2xZ, interactive 12:18:13Z, unique 12:19:29Z) |
| screenshots, 1440 and 390 | `tools/shoot.mjs`. Calm and interactive reused their shared `shots/` because the build was unchanged since the r2 shoot (calm 12:16:55Z, interactive 12:14:58Z). Unique was shot again over http into `unique/shots/http/` (22 desktop / 23 mobile captures) | sheets read at both widths |
| booking tap-through, 390 × 844, touch, **live engine** | hero "Check dates" → drawer → Suite → dates → 2 guests → hand-off, then the landed engine page read after 9 s | log below |
| engine behaviour | the four `/listings/` pages loaded directly with `?start=&end=&numberOfGuests=` at 390 and 1440, for several date ranges | below |
| keyboard, small targets, overflow, reduced motion, video and frame loading, JS off | as in round 1, with Playwright | tables below |
| default look | `node tools/check-design.mjs panta-rei-resort --no-shots` | 0 problems, 0 warnings |
| facts | the DOM text of each page (drawers, alt text, aria labels) diffed against round 1, then every changed or new line checked against `dossier.json`. Quotes and numbers checked by script | below |

### Facts (round 2)

What changed in the text since round 1:
- **calm:** price rows reordered (label, price, unit, then the note once). Amenities joined with " | ". The drawer opens with "Double Room · 2 guests".
- **interactive:** two menu tabs, Breakfast and "Later on", which now carries the copy's sentence "Dinner is a mix of traditional and modern Mediterranean dishes". A new label "Vinyasa yoga, every morning" sits directly over the strip that shows Fri "Day off". The copy says "Vinyasa yoga is at 8:30 every morning; Friday is the day off", so the label is the copy's own phrase with the exception beside it. The class prices are on one line. The quotes are re-ordered shortest first, with a "1 / 6" counter.
- **unique:** caption 2 is now the verbatim excerpt "The bungalows sit in a ring around a long pool". "Scroll" and "Loading the film 0%" are gone. A closing display line uses the copy's booking label "Check dates and book direct".

New photographs and their alt text, each checked against `images[].description`:

| page | image | alt text vs dossier |
|---|---|---|
| calm | hero poster (vid-001 at pool level) | "long turquoise pool with loungers on its stone deck…" matches the frame |
| calm | img-003 | "breakfast… a bowl, juice and coffee passed across the table" matches |
| calm | img-001 closing | "the resort from above at noon…" matches |
| interactive | vid-002 poster | "red-tiled bungalows in a ring around the long pool, swimmers" matches |
| interactive | img-021 | "a class from behind… hands behind heads" matches |
| interactive | img-012 | "glass doors open to the lawn and the pool, a surfboard leaning outside" matches |
| unique | img-005 | "sliders, plated dishes, a bottle of water and glasses" matches |
| unique | shala loop (vid-001 46.6–52.1 s) | "yoga class in the open-air shala" matches |
| unique | img-003 | "a bowl of granola…": the photograph shows granola on the bowl (checked by eye) |

The round-1 table (29 claim rows) was re-run against the new text and every row still matches. 6/6 quotes are verbatim on all three pages. Every number on every page is in the dossier; the only ones not found literally are 24 h forms of the dossier's 12 h times (13:00, 17:00, 18:00, 21:30, 11:00, 22:00, 08:00).

**Result: 0 mismatches and 0 claims without a dossier entry on any page.**

### Booking tap-through, live engine (390 × 844, touch)

| | calm | interactive | unique |
|---|---|---|---|
| "Check dates" visible on the first phone screen | 1 (full width, 16,768 358×56) | 1 (centred, 111,446 167×56) | **1** (centred, 113,454 165×54). Round 1's second, header button is now hidden over the film |
| hero `href` | engine home | engine home | `#book` |
| drawer opens on | Double Room preselected, 2 guests (`…/listings/572800?numberOfGuests=2`) | Double preselected (`…/listings/572800`) | Double preselected (`…/listings/572800`) |
| Suite, **3–6 Mar 2027**, 2 guests → landed | `https://pantareiresort.holidayfuture.com/listings/572798?start=2027-03-03&end=2027-03-06&numberOfGuests=2`, and the page reads **"For 3 nights · Mar 3 - Mar 6"** | same URL, same "For 3 nights · Mar 3 - Mar 6" | same URL, same "For 3 nights · Mar 3 - Mar 6" |
| taps from hero to engine | 2 (target 2), class engine | 2, engine | 2, engine |
| WhatsApp hand-off | names the business, the Suite, the dates and 2 guests | same | same |
| JavaScript off | hero → engine home; 4 room links on the page | hero → engine home; 4 room cards → `/listings/` | hero → `#book` (four room links, engine home, WhatsApp, `tel:`) → room page, 2 taps |

**Engine finding (not a mockup defect; for the human and the pitch).** I first tapped through with 10–13 Dec 2026 for the Suite. All three mockups built the identical correct URL, but the engine page showed **"Select check-in and check-out dates · Add dates for prices"**, with no dates. I then loaded the engine directly at 390 px:

| room | dates | engine shows |
|---|---|---|
| Double (572800) | 10–13 Dec 2026 | "$465 · For 3 nights · Dec 10 - Dec 13" (same result at 1440) |
| Suite (572798) | 10–13 Dec 2026 | dates dropped |
| Triple (572802) | 10–13 Dec 2026 | dates dropped |
| Family (572799) | 10–13 Dec 2026 | dates dropped |
| Suite | 20–23 Nov 2026 | dates dropped |
| Suite | 10–13 Feb 2027 | dates dropped |
| Suite | 3–6 Mar 2027 | "For 3 nights · Mar 3 - Mar 6" |

So the engine keeps the dates when the room is bookable for them, and silently clears them otherwise, with no "unavailable" message. A visitor whose dates are taken lands on an empty date picker. The parameters work: the mockups hand off correctly, and the engine's behaviour is outside the page. No dimension-3 points are taken for it. It is worth telling the owner.

### Budget table (playbook §4; `audit.json` first_load = 390 px, throttled, no scroll)

| line | target | calm | interactive | unique |
|---|---|---|---|---|
| first-load transfer, video excluded | ≤ 1.5 MB | 1,205 KB | 633 KB | 827 KB (includes the 261 KB key frames) |
| hero video after first paint, phone | ≤ 2 MB | 1.93 MB (`hero-p608.mp4`) | 1.84 MB (`hero-p1080.webm`) | none. Frames: 13 key frames = 261 KB with no interaction; all 72 frames = **1.48 MB** after the first scroll |
| hero video after first paint, desktop | ≤ 4 MB | 3.11 MB (`hero-d1920.webm`) | 3.37 MB hero, **+ 1.06 MB `welcome-720.webm`**, still fetched without scroll = 4.43 MB | key set 518 KB idle; all 72 frames = **2.93 MB** after the first scroll |
| JS (external) | ≤ 300 KB | 0 (inline, HTML 82 KB) | 0 (inline, HTML 99 KB) | 0 (inline, HTML 103 KB) |
| largest above-the-fold image | ≤ 300 KB | 160 KB | 143 KB | 172 KB |
| fonts | ≤ 2 families, ≤ 150 KB | Figtree + Gochi Hand, 40 KB | Satisfy + Jost, 49 KB | Bricolage Grotesque + Hanken Grotesk, 112 KB |
| LCP (throttled) | ≤ 2.5 s | **2,440 / 1,336 / 1,104 ms** over 3 runs | 1,456 ms | 812 ms |
| CLS / scroll CLS early · settled | < 0.1 / < 0.01 | 0 / 0.0007 · 0 (0.0002 on re-runs) | 0.0009 / 0.0009 · 0 | 0.0017 / 0.0003 · 0.0001 |
| third-party on load | 0 | Google Fonts only (allowed at 4e) | same | same |
| `scrollWidth` at 390 | 390 | 390 | **390** (round 1's 14 px overflow is fixed) | 390 |

Unique's round-1 item is resolved, as measured: no timer. With 12 s idle and no input, only 13 frames load (261,040 B phone, 517,976 B desktop). The other 59 load on the first scroll: 1,482,052 B phone and 2,926,194 B desktop in total, both inside the ≤ 2 / ≤ 4 MB after-first-paint line.

### Keyboard, targets, motion (390 and 1440)

| | calm | interactive | unique |
|---|---|---|---|
| drawer: opens on Enter, focus inside, 40 × Tab, Esc, focus returns | yes, 0 escapes, yes, yes | yes, 0 escapes, yes, yes | yes. Native modal `<dialog>`: the browser chrome takes focus once per cycle, which is not a trap. Esc and return both work |
| tap targets under 44 px | **0** (round 1: 32. The dots are fixed) | 0 | 0 visible at the top or after the film. The audit also says 0 |
| reduced motion: video / frame requests | 0 / 0 | 0 / 0 | 0 / 0, canvas hidden |
| missing alt / skip link / `lang` | 0 / yes / en | 0 / yes / en | 0 / yes / en |

### Delivery (all three)

Unchanged from round 1. Static, relative URLs, lowercase names, no CMS, `localhost` or secrets. Google Fonts is the only off-site request on load and must be self-hosted at 4g.

### Default look (check-design, as facts)

- calm: Figtree + Gochi Hand, ground hsl(210 33% 98%), 0 all-caps labels, 0/16 labelled headings.
- interactive: **Satisfy (h1, h2) + Jost (body)**, ground hsl(80 27% 98%), lilac / peach / sage page tints, 0 all-caps labels, 0/25 labelled headings.
- unique: Bricolage Grotesque + Hanken Grotesk, ground hsl(180 12% 97%), 0 all-caps labels, 0/18 labelled headings.
- 0 default-look warnings on any page.

---

```
mode: quick        round: 2        variant: calm
total: pending dimension 8 (critic, dimensions 1–7: 75.0 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 rows plus the new alt text match. 6/6 quotes verbatim. 0 unsourced numbers |
| 2 | mobile + performance | 9 | 1,205 KB first load. LCP 2,440 / 1,336 / 1,104 ms over three runs: always under 2.5 s, but the first run sits 60 ms under the line. CLS 0, scroll CLS ≤ 0.0007, phone hero 1.93 MB, desktop 3.11 MB, `scrollWidth` 390. `shots/mobile-00.png`: the long pool at deck level, "Panta Rei, Kabalana", the full-width coral button at the thumb. Fonts still remote (allowed at 4e) |
| 3 | booking CTA | 10 | 2 taps to `…/listings/572798?start=2027-03-03&end=2027-03-06&numberOfGuests=2`, and the engine shows "For 3 nights · Mar 3 - Mar 6". Class engine. JS off: engine home in 1 tap |
| 4 | brand fit | 8 | the §3 order is present, and the lower half now leads with photographs (breakfast full-bleed, yoga half-bleed, lawn with boards). The first screen is still name + place, not the type. The hero cut moved from the concept's ring-to-sea to pool level, and the closing from vid-002 to img-001; notes say this was on the coordinator's instruction. Both are business-owned, so there is no fact issue |
| 5 | copy | 9 | passed copy verbatim. Interface labels only |
| 6 | accessibility | 9 | 0 tap targets under 44 px (was 32). Keyboard drawer passes at both widths. Reduced motion fetches no video. Skip link, 0 missing alt. Contrast not measured with axe (quick mode) |
| 7 | security + delivery | 9 | static and relative, no CMS or secrets. Google Fonts only |

what the designer prompt got wrong: nothing new mechanically. The round-1 gap (an audit count left unmentioned) did not recur; the dots were fixed. The one thing to watch is LCP: a preloaded 1920/1280 poster plus the pool-and-palm gradient measured as high as 2.44 s on one throttled run. The designer's checklist reads one `audit.json` run, and a single run can sit 60 ms under the line.
fix list (fail only): none.

---

```
mode: quick        round: 2        variant: interactive
total: pending dimension 8 (critic, dimensions 1–7: 75.0 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 rows, the new menu-tab text, the "Vinyasa yoga, every morning" label (the copy's phrase, with Friday "Day off" beside it) and the new alt text all match. 6/6 quotes verbatim |
| 2 | mobile + performance | 9 | 633 KB first load, LCP 1,456 ms, CLS 0.0009, scroll CLS 0.0009 / 0, largest image 143 KB, fonts 49 KB, phone hero 1.84 MB (9:16 column), `scrollWidth` 390 (fixed). Desktop still fetches the Welcome clip (1.06 MB) with the hero (3.37 MB) before any scroll: 4.43 MB of video against the 4 MB line, though the hero alone is within it |
| 3 | booking CTA | 10 | 2 taps to the Suite page with `start` / `end` / `numberOfGuests`, and the engine shows "For 3 nights · Mar 3 - Mar 6". Class engine. JS off: hero → engine home, cards → room pages |
| 4 | brand fit | 8 | the hero is now the business's own aerial (vid-002), so round 1's surf beach is gone. The hero title is still "Panta Rei, Kabalana", the concept's own §6 fallback, so name + place only. The concept's Fredoka + Nunito Sans was replaced with Satisfy + Jost at the critics' request (notes conflicts) |
| 5 | copy | 9 | passed copy verbatim. Labels only ("Later on", "Per class", "From the resort", "Ask us for a ride") |
| 6 | accessibility | 9 | keyboard drawer passes at both widths (focus starts on the preselected room). 0 tap targets under 44 px, 0 missing alt, reduced motion fetches no video. Contrast not measured with axe |
| 7 | security + delivery | 9 | static and relative. Google Fonts only |

what the designer prompt got wrong: the prompt treats "attached after first paint, near the viewport" as enough for secondary clips, but the Welcome page is designed to peek 44 px into the first screen, so on desktop its clip always loads with the hero. Playbook §4's video line should count every clip fetched before the first scroll, not only the hero.
fix list (fail only): none. Before 4g: attach the Welcome clip on the first scroll, not on intersection with a 200 px margin.

---

```
mode: quick        round: 2        variant: unique
total: pending dimension 8 (critic, dimensions 1–7: 75.5 / 80)        result: pass (critic gates; needs dimension 8 ≥ 8 from both visual critics)        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 29/29 rows match. Captions verbatim (caption 2 is now an excerpt of The pool ¶1). "Price(s) as of 6 Nov 2026" = `offers[].fetched_at`. The new alt text matches. 6/6 quotes verbatim |
| 2 | mobile + performance | 9 | 827 KB first load (with the 261 KB key frames), LCP 812 ms, CLS 0.0017, scroll CLS 0.0003 / 0.0001, fonts 112 KB, largest image 172 KB, `scrollWidth` 390. Frames are now **1.48 MB phone / 2.93 MB desktop**, loaded only on the first scroll; idle loads 13 frames only. That is within the after-first-paint line, so the round-1 dimension-2 issue is resolved. Fonts remote (4e) |
| 3 | booking CTA | 10 | hero `#book` → drawer → Suite page with dates, 2 taps, and the engine shows "For 3 nights · Mar 3 - Mar 6". JS off: `#book` block → room page, 2 taps. The drawer preselects Double, as calm and interactive now do too |
| 4 | brand fit | 9 | one "Check dates" on the phone's first screen (`shots/http/mobile-00.png`: the ring from above, "Panta Rei", "Boutique resort · Kabalana, Ahangama", one coral button). It is still the only variant whose first screen states type + place. The §3 order is present |
| 5 | copy | 9 | passed copy verbatim. The closing display line is the copy's booking label |
| 6 | accessibility | 9 | `audit.json` keyboard opens, Esc closes, focus returns (native modal dialog). 0 tap targets under 44 px. Reduced motion: canvas hidden, 0 frames, stills with the captions as DOM text |
| 7 | security + delivery | 9 | static and relative, frames self-hosted. Google Fonts only |

what the designer prompt got wrong: nothing new mechanically. Round 1's timer is gone, and the frame weight now has a number in the notes (2.93 / 1.48 MB, idle 0.26 / 0.52 MB). The playbook §4 table still has no row for a scroll sequence, so this variant met a line it had to infer. The round-1 proposal stands.
fix list (fail only): none.

---

### The one sentence the human needs to pick (round 2)

All three match the dossier on every fact, show one "Check dates" on the phone's first screen, and reach the chosen room's engine page with the dates in 2 taps; the engine shows the dates only when the room is free and silently clears them otherwise. First loads are calm 1.21 MB (one LCP run at 2.44 s, the others 1.1–1.3 s), interactive 0.63 MB (its desktop first screen also loads a second clip, 4.4 MB of video in all), and unique 0.83 MB (its 72-frame film, 1.5 MB on a phone and 2.9 MB on desktop, loads only once the visitor scrolls).

Screenshots cited (`calm/shots/mobile-00.png`, `unique/shots/http/mobile-00.png`) are scratch and will be deleted after the round; this scorecard records in words what each showed.

---

## Full r1 · station 5 (Critique), full mode, round 1: the built site

critic 0.4.3 · rubric 0.3.2 · run `2026-11-lk-surf-01` · 2026-11-06. The page under review is `sites/panta-rei-resort/final/` (Astro port of the picked **interactive** mockup, after 4h SEO and 4i AI SEO, HEAD `9030baf`). I built it with `npm run build` (clean: 1 page, `git status` unchanged) and scored the output `final/dist/`. I did not read the two visual critics' full reports. Dimension 8 comes from them; my part is dimensions 1–7, out of 80.

Evidence files are in `reports/2026-11-lk-surf-01/critic-panta-rei-resort-r1/`:
- `audit.json`: `tools/audit-mockup.mjs` logic, run from a scratch copy whose only changes are the project path (`sites/<slug>/final`), the output path, and absolute imports. Run 3×.
- `checks.json`: offline run, axe, keyboard, reduced motion, meta and JSON-LD.
- `tapthrough.json`: the booking tap-through.
- `funnel-sensitivity-holidayfuture.json`: the scratch funnel run described below.

The funnel output is in `reports/2026-11-lk-surf-01/funnel/panta-rei-resort-r1/funnel.json`. Screenshots were shot over http (file:// breaks the crossorigin fonts and logo mask with 50 console errors) into `final/shots/http/`: 14 desktop and 16 mobile captures, 0 console errors. They are scratch.

### Funnel (`tools/funnel.mjs http://localhost:9431/ --depth 3`) vs `dossier/panta-rei-resort/audit.json` recommended

| | measured | target | result |
|---|---|---|---|
| `clicks_to_book` | **1** | ≤ 2 | met |
| `primary_action.class` | **whatsapp** ("WhatsApp Panta Rei", the header icon, top 19 px, `wa.me/94728003022?text=Hi%20Panta%20Rei!%20I'd%20like%20to%20check%20availability.`) | **engine** | **different class: hard fail (rubric, full mode)** |
| `hero_action` | whatsapp, the same header icon, `clicks_to_flow` 0 | n/a (`recommended.booking_flow` is not set, so `primary_action` is what counts) | |
| CTA above the fold | true | | |
| pages / broken | 1 / 0 | | |

**Why the tool reads WhatsApp, measured rather than assumed:**
1. `tools/funnel.mjs`'s `ENGINES` list has no `holidayfuture.com`, and "Check dates" matches none of its `BOOK_WORDS`. So the hero "Check dates", the four room cards and the closing button (all links to `pantareiresort.holidayfuture.com`) are not classified at all.
2. Even with that fixed, the result does not change. I ran a scratch copy of the tool with `'holidayfuture.com'` added to `ENGINES` and no other change. The hero "Check dates" is then read as `engine` (top 446 px, above the fold), but `primary_action` and `hero_action` stay **whatsapp**. The tool takes the top-most / first terminal action on the landing page, and that is the header's WhatsApp icon at 19 px, which sits above "Check dates" on the first screen.

So the hard fail has two causes, and both have to change:
- **On the site:** the built page puts a WhatsApp action above the engine CTA on the first screen.
- **In the tool:** it does not know the dossier's own engine host.

What a visitor gets is not in doubt; my walk is below. The design's primary action is the engine. The rubric's instrument, measuring this page, says WhatsApp.

### Booking tap-through (390 × 844, touch, live engine)

| step | result |
|---|---|
| first screen | one coral "Check dates" (111,446 167×56), `href` = engine home; the WhatsApp icon sits in the header (top right) |
| tap 1 | drawer opens with the Double Room preselected (`…/listings/572800`) |
| Suite, 3–6 Mar 2027, 2 guests, tap 2 | landed on `https://pantareiresort.holidayfuture.com/listings/572798?start=2027-03-03&end=2027-03-06&numberOfGuests=2`; the engine page reads **"$615 · For 3 nights · Mar 3 - Mar 6"** |
| WhatsApp hand-off | `wa.me/94728003022`, "Hi Panta Rei! I'd like to check availability for the Suite with Private Pool, 3 Mar to 6 Mar, 2 guests." Names the business, the room, the dates and the guests |
| JavaScript off | hero → engine home (1 tap); the 4 room cards are plain `/listings/5727xx` links |
| engine URLs vs dossier | engine home and the four `/listings/` URLs identical to `booking.engine_url` / `engine_rooms` character for character; phone / WhatsApp `+94728003022` |

As found at 4f round 2, the engine silently drops dates the room cannot take. That is not a site defect; it is for the owner.

### Budget (playbook §4; 390 px, throttled 1.6 Mbps / 150 ms / 4× CPU, no scroll; 3 runs)

| line | target | measured | met |
|---|---|---|---|
| first-load transfer (video excluded) | ≤ 1.5 MB | **645 KB** (645,186 B, 12 requests, 1 host) | yes |
| hero video after first paint | ≤ 2 MB phone · ≤ 4 MB desktop | phone `vid-002-cut.p1080.webm` **1.50 MB** (mp4 1.68); desktop `d1920.webm` **3.40 MB** (mp4 3.75). Nothing else loads before a scroll at either width (the Welcome clip, 1.32 MB, and the fitness clip, 1.10 MB, load only on scroll) | yes |
| JS, compressed | ≤ 300 KB | **5.8 KB** gzip (18 KB raw, inline, no library); 0 external scripts | yes |
| largest above-the-fold image | ≤ 300 KB | 148 KB in the phone first load; desktop poster 246 KB | yes |
| fonts | ≤ 2 families, ≤ 150 KB | Jost + Satisfy, **49 KB**, self-hosted with licence files | yes |
| LCP (throttled phone) | ≤ 2.5 s | **2,156 / 2,160 / 2,172 ms** | yes |
| CLS | < 0.1 (scroll < 0.01) | 0; scroll early **0.0009**, settled 0 | yes |
| third-party requests on load | 0 | **0** | yes |

Every line is met, as full mode requires.

### Delivery baseline (served by a plain static server, every other host blocked, full scroll at 390 and 1440)

0 off-site requests attempted, 0 failed requests, 0 console errors, 0 broken images, both fonts loaded, `scrollWidth` = viewport at both widths.

`dist/` is static only: `index.html`, `llms.txt`, `robots.txt`, `fonts/`, `photos/` (77 files), `video/` (9 files), 27 MB in all. Every asset URL is relative, every filename lowercase, there are no root-absolute paths, and there is no CMS or API call (`localhost`, `/api/`, `payload`, `secret`, `token`: 0 hits in all three text files).

The preview is correctly closed to search engines: `<meta name="robots" content="noindex, nofollow">`, and `robots.txt` has `Disallow: /` for `*` and for 15 named AI crawlers.

One thing to carry to the deployer: built without `SITE_URL` (this build), the page has **no canonical and no `og:image`**. The SEO report says both appear only when `SITE_URL` is set. The demo must be built with `SITE_URL=https://panta-rei-resort.os1.workers.dev/`, or a link pasted into WhatsApp shows no picture.

### Accessibility (axe-core 4.10.2, WCAG 2 A/AA + best-practice, 390 and 1440; manual keyboard)

| check | result |
|---|---|
| axe violations, page | **region** (moderate, best-practice): 1 node, the floating phone bar `.bar` at 390 and the floating WhatsApp button `.fwa` at 1440 sit outside any landmark |
| axe violations, drawer open | **scrollable-region-focusable** (serious, WCAG 2.1.1): the gallery track `.slides` scrolls sideways but cannot take keyboard focus (its arrows and dots can) |
| axe incomplete | color-contrast 28 / 29 nodes (text over video and photographs; axe cannot compute these), aria-prohibited-attr 2 / 1, video-caption 2 (muted, decorative loops) |
| keyboard | Tab order at 390: skip link → logo → WhatsApp → "Check dates" (4 tabs). At 1440, 7 tabs, via the nav. Focus is visible as a 3 px solid outline. Enter opens the drawer with focus inside; 40 × Tab stays inside; Esc closes; focus returns to "Check dates". At both widths |
| reduced motion | 0 video requests; posters only |
| tap targets / alt / skip / lang / headings | 0 under 44 px; 0 images without alt (4 decorative `alt=""`); skip link present; `lang="en"`; H1 → H2 → H3 in order |
| content as DOM text | yes: every fact is text; the videos are muted loops with `aria-hidden` or a description |

### Facts (built page, drawer, JSON-LD, `/llms.txt`)

- **Built page:** the visible text is the 4f round-2 interactive text that was checked row by row (29 claim rows + menu tabs + the class week + the distances list). Checked again by script on the built page: 44 numbers, all in the dossier (seven are 24 h forms of the dossier's 12 h times); 6/6 quotes verbatim. Alt text matches `images[].description`.
- **JSON-LD** (`Resort`):
  - name, telephone `+94728003022`, email, address (`Back to Life Road, Kabalana Rd` / `80650` / `Ahangama` / `LK`), and geo `5.9807381, 80.3497102` = `location.lat_lng`
  - `hasMap` = `location.map_url`; check-in 14:00, check-out 11:00
  - 16 `amenityFeature`, the same rows as the page
  - 4 `HotelRoom`, with bed, `occupancy.maxValue` 3/3/4/2 and `floorSize` 22/30/50/40 MTK = `room_types`
  - 8 `Offer`, with prices and LKR = `offers[0–7]`
  - `sameAs` 6 URLs = `booking.other_engines[0]`, `contact.socials` (including Tripadvisor d25364260)
  - No `aggregateRating` and no review markup (nothing self-served).
  - All match.
- **`/llms.txt`:** every section is the copy verbatim. The "In short" lines (address, 4 room types, 14:00 / 11:00, engine URL and WhatsApp `+94728003022`) match. Prices, amenities, ratings (9.2/10 · 468, 4.7/5 · 213, captured 6 Nov 2026) and the 6 quotes are verbatim. Every number is in the dossier. It is marked "Preview build … Do not index, quote or cite it."

**Result: 0 mismatches and 0 claims without a dossier entry** on the page, in the JSON-LD or in `llms.txt`.

```
mode: full        round: 1        variant: interactive (final/)
total: critic part 69.6 / 80 — dimension 8 (lower visual score × 2.5) and the /100 total to be combined        result: FAIL        hard_fails: ["primary booking action class whatsapp ≠ recommended engine (funnel.json primary_action)"]
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches on the page, drawer, JSON-LD and `llms.txt` (above). 6/6 quotes verbatim. 44/44 numbers in the dossier |
| 2 | mobile + performance | 9 | every playbook §4 line met: 645 KB first load, LCP 2.16–2.17 s, JS 5.8 KB gzip, fonts 49 KB, largest image 148 KB, CLS 0, scroll CLS 0.0009 / 0, phone hero 1.50 MB, desktop 3.40 MB, no extra clip before a scroll. `scrollWidth` = viewport at 390 and 1440. LCP is 0.33 s under the line on all three runs |
| 3 | booking CTA | 7 | the walk is right: 2 taps from the hero to `…/listings/572798?start=2027-03-03&end=2027-03-06&numberOfGuests=2`, and the engine shows "For 3 nights · Mar 3 - Mar 6". WhatsApp prefilled; JS-off path works. `funnel.json`: `clicks_to_book` 1 ≤ 2. But **`primary_action.class` = whatsapp**, because the header WhatsApp icon is the top-most booking action on the first screen (hard fail above) |
| 4 | brand fit | 8 | the playbook §3 order is present. The first screen gives name + place ("Panta Rei, Kabalana"), not the business type; the tagline is one scroll down. No `og:image` / canonical without `SITE_URL` (deployer item, above) |
| 5 | copy | 9 | passed copy verbatim; interface labels only |
| 6 | accessibility | 7 | keyboard and focus pass at both widths; reduced motion honoured; 0 small targets. axe: 1 **serious** (`scrollable-region-focusable`, drawer gallery `.slides`) and 1 moderate (`region`, `.bar` / `.fwa`). Contrast over imagery is not computable by axe (28 nodes) |
| 7 | security + delivery | 10 | offline run clean (0 off-site, 0 failed, 0 errors); static, relative, lowercase, self-hosted fonts with licences; no CMS calls, no secrets; preview `noindex` and `Disallow: /` |

Critic part: 10×2 + 9×1.5 + 7×1.5 + 8×0.5 + 9×1 + 7×0.8 + 10×0.7 = **69.6 / 80**. For the full-mode total of ≥ 85 / 100, dimension 8 must be at least 8 from both visual critics: (69.6 + 8 × 2.5) × 100 ÷ 105 = 85.3. Every dimension is ≥ 6. **The result is FAIL on the hard fail alone.**

what the designer prompt got wrong: the designer's 4g checklist walks the hero CTA to the engine (correct), but never runs `tools/funnel.mjs` on the built site, the instrument full mode uses. It also does not say that a persistent WhatsApp shortcut in the header outranks the hero CTA in that instrument, because it is the first terminal action on the first screen. The same header icon was in all four mockup rounds, so the gap was there since 4e. Separately, `tools/funnel.mjs`'s `ENGINES` does not know `holidayfuture.com` (Hostaway's white-label booking host), so no link to this business's engine is classified as `engine`. That needs a tools proposal for the human. The critic does not edit tools.

fix list (ordered smallest first; each tied to a dimension):
1. **(dim 3, hard fail; tool, needs the human):** add `holidayfuture.com` to `ENGINES` in `tools/funnel.mjs`. Without it, no fix on the site can make the primary class `engine`. My scratch run shows that the hero "Check dates" is then read as `engine`.
2. **(dim 3, hard fail; site):** make "Check dates" the first booking action on the first screen. Hide the header WhatsApp icon while the header sits over the hero, the way the header's own "Check dates" already is, and let it appear with the persistent bar once the hero is passed. Re-run `tools/funnel.mjs` and expect `primary_action.class` = `engine` with `clicks_to_book` ≤ 2.
3. **(dim 6):** give the drawer gallery track `.slides` `tabindex="0"`, an accessible name ("Photos of <room>") and arrow-key scrolling, as the room-card row has. That clears axe `scrollable-region-focusable`.
4. **(dim 6):** put the floating phone bar and WhatsApp button inside a landmark (e.g. `<nav aria-label="Book">` or inside `<footer>`). That clears axe `region`.
5. **(dim 4, deployer, station 6):** build the demo with `SITE_URL` set so canonical and `og:image` exist.

---

## Full r2 · station 5 (Critique), full mode, round 2: the built site after the r1 fixes

critic 0.4.3 · rubric 0.3.2 · 2026-11-06. Reviewed: `sites/panta-rei-resort/final/` at `4fa7dce`, with `tools/funnel.mjs` at `717724d` (which now knows `holidayfuture.com` and `hostaway.com`). Built with `npm run build:demo` (`SITE_URL=https://panta-rei-resort.os1.workers.dev/`; clean, `git status` unchanged) and served from `dist/` over http. I did not read the visual critics' reports. The checks and their order are the same as in full r1.

Evidence is in `reports/2026-11-lk-surf-01/critic-panta-rei-resort-r2/`: `audit.json` (scratch copy of `audit-mockup.mjs` pointed at `final/dist`, 3 runs), `checks.json` (offline run, axe, keyboard, reduced motion, meta, JSON-LD) and `tapthrough.json`. The funnel output is in `reports/2026-11-lk-surf-01/funnel/panta-rei-resort-r2-critic/funnel.json`. Screenshots are in `final/shots/http/` (14 desktop + 16 mobile, 0 console errors; scratch). `final/shots/http/mobile-00.png` shows the logo, "Panta Rei, Kabalana" and one coral "Check dates" over the top-down pool. There is no WhatsApp icon on the first screen.

### Funnel (`tools/funnel.mjs http://localhost:9431/ --depth 3`) vs `audit.json` recommended

| | measured | target | result |
|---|---|---|---|
| `clicks_to_book` | **1** | ≤ 2 | met |
| `primary_action.class` | **engine** ("Check dates", `https://pantareiresort.holidayfuture.com/`) | engine | **equal**: the r1 hard fail is cleared |
| `hero_action` | engine, "Check dates", `clicks_to_flow` 0 | n/a | |
| booking actions above the fold | 1: the engine "Check dates" at 446 px. The header WhatsApp icon is no longer on the first screen | | |
| pages / broken | 1 / 0 | | |

### Booking tap-through (390 × 844, touch, live engine)

Hero "Check dates" → drawer (Double Room preselected) → Suite, 3–6 Mar 2027, 2 guests → landed on `https://pantareiresort.holidayfuture.com/listings/572798?start=2027-03-03&end=2027-03-06&numberOfGuests=2`. The engine page reads **"$615 · For 3 nights · Mar 3 - Mar 6"**. That is 2 taps.

The WhatsApp hand-off is `wa.me/94728003022` with "…the Suite with Private Pool, 3 Mar to 6 Mar, 2 guests." With JavaScript off, the hero goes to the engine home in 1 tap and the 4 room cards are `/listings/` links. All URLs are identical to the dossier's.

### Budget (playbook §4; 390 px throttled, no scroll; 3 runs)

| line | target | measured | met |
|---|---|---|---|
| first-load transfer | ≤ 1.5 MB | **653 KB** (652,667 B, 12 requests, 1 host) | yes |
| hero video after first paint | ≤ 2 MB / ≤ 4 MB | phone `p1080.webm` 1.50 MB; desktop `d1920.webm` 3.40 MB. Nothing else loads before a scroll at 390 or 1440 | yes |
| JS, compressed | ≤ 300 KB | **6.4 KB** gzip (19.8 KB raw, inline); 0 external scripts | yes |
| largest image in the first load | ≤ 300 KB | 148 KB | yes |
| fonts | ≤ 2 families, ≤ 150 KB | Jost + Satisfy, 49 KB, self-hosted | yes |
| LCP | ≤ 2.5 s | **1,988 / 2,020 / 1,984 ms** (r1: 2.16–2.17 s) | yes |
| CLS / scroll | < 0.1 / < 0.01 | 0 / early 0.0009, settled 0 | yes |
| third-party on load | 0 | 0 | yes |

### Delivery (plain static server, every other host blocked, full scroll at 390 and 1440)

0 off-site requests attempted, 0 failed, 0 console errors, 0 broken images, both fonts loaded, `scrollWidth` = viewport.

`dist/` has 97 files: 0 with uppercase letters or spaces in the name, 0 root-absolute references, and 0 hits for `localhost`, `/api/`, `payload`, `secret` or `token`. The preview is still closed: `noindex, nofollow`, and `robots.txt` has `Disallow: /`.

The `SITE_URL` build now carries canonical `https://panta-rei-resort.os1.workers.dev/`, hreflang `en` + `x-default`, `og:url`, and an absolute `og:image` (`photos/img-001-full-2000.webp`, 2000×1126, with alt text) with `twitter:card=summary_large_image`. All 12 JSON-LD `image` URLs and the `og:image` exist in `dist/`.

### Accessibility (axe-core 4.10.2, WCAG 2 A/AA + best-practice; manual keyboard)

| check | result |
|---|---|
| axe, page, 390 and 1440 | **0 violations** (46 passes). r1's `region` is cleared: the bar is now inside a nav landmark |
| axe, drawer open | **0 violations**. r1's `scrollable-region-focusable` is cleared: `.slides` now has `role="region" tabindex="0" aria-label="Photos of the Double Room"` |
| axe incomplete | color-contrast 28 / 29 nodes (text over video and photos, not computable), aria-prohibited-attr 1, video-caption 2 (muted loops) |
| keyboard | at 390: skip link → logo → "Check dates" (3 tabs; the hidden header WhatsApp is out of the tab order). At 1440, 7 tabs. 3 px focus outline. Enter opens the drawer with focus inside; 40 × Tab stays inside; Esc closes; focus returns to "Check dates". At both widths |
| reduced motion | 0 video requests |
| targets / alt / skip / lang / headings | 0 under 44 px. 0 images without alt; the 8 `alt=""` are room-card and chip thumbnails inside links named by the room. Skip link, `lang="en"`, heading order kept |

### Facts (page, drawer, JSON-LD, `/llms.txt`)

- **Page:** the visible text is line-for-line identical to full r1 (0 lines removed, 0 added), so it is the r1-checked text. By script: 44/44 numbers are in the dossier (seven are 24 h forms of its 12 h times), and 6/6 quotes are verbatim.
- **JSON-LD (`Resort`):** the r1 fields are unchanged. They are joined by `@id` / `url` (the demo URL) and 12 `image` URLs of business-owned photos. Geo `5.9807381, 80.3497102`, address, `+94728003022`, 4 rooms (3/22, 3/30, 4/50, 2/40), 8 offers (3500, 2500, 3000, 3500, 20000, 17000, 20000, 17000 LKR), 16 amenities, 6 `sameAs`, no `aggregateRating`. All match the dossier.
- **`/llms.txt`:** 6/6 quotes verbatim, every number in the dossier, the "Preview build … Do not index, quote or cite it" line kept, and the page link now points at the demo URL.

**Result: 0 mismatches and 0 claims without a dossier entry.**

```
mode: full        round: 2        variant: interactive (final/)
total: critic part 75.7 / 80 — dimension 8 (lower visual score × 2.5) and the /100 total to be combined        result: pass on the critic's gates (no hard fail, every dimension ≥ 6, every budget line met); final pass needs dimension 8 ≥ 8 from both visual critics and total ≥ 85        hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches on the page, drawer, JSON-LD and `llms.txt`. 6/6 quotes verbatim. 44/44 numbers in the dossier |
| 2 | mobile + performance | 9 | every §4 line met: 653 KB first load, LCP 1.98–2.02 s, JS 6.4 KB gzip, fonts 49 KB, CLS 0, scroll 0.0009 / 0, phone hero 1.50 MB, desktop 3.40 MB. `scrollWidth` = viewport |
| 3 | booking CTA | 10 | `funnel.json`: primary **engine**, `clicks_to_book` **1** ≤ 2. The walk takes 2 taps to the Suite page with the dates shown by the engine. WhatsApp prefilled; JS-off path works; URLs identical to the dossier |
| 4 | brand fit | 8 | the playbook §3 order is present; canonical and `og:image` now exist. The first screen still gives name + place ("Panta Rei, Kabalana"), not the business type, which is one scroll down |
| 5 | copy | 9 | passed copy verbatim; interface labels only |
| 6 | accessibility | 9 | axe 0 violations on the page and in the open drawer. Keyboard and focus pass at both widths. Reduced motion honoured. Contrast over imagery cannot be computed by axe (28 nodes): the only item left unproven |
| 7 | security + delivery | 10 | offline run clean; static, relative, lowercase; self-hosted fonts; no CMS calls or secrets; preview closed to crawlers |

Critic part: 10×2 + 9×1.5 + 10×1.5 + 8×0.5 + 9×1 + 9×0.8 + 10×0.7 = **75.7 / 80**. With dimension 8 = 8 from both visual critics: (75.7 + 20) × 100 ÷ 105 = **91.1**. With 7: 88.8, but that would fail the dimension-8 ≥ 8 gate.

what the designer prompt got wrong: nothing new in round 2. Every item on the r1 fix list was fixed and verified here: funnel class, header WhatsApp, drawer gallery focus, landmark, `SITE_URL` build.
fix list (fail only): none.
