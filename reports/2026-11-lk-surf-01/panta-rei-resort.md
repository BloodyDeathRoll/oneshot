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
