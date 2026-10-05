# global-surf-adventures — critic quick scorecard, picked composite, round 2 (station 4f)

critic 0.4.1 · rubric 0.3.0 · run `2026-09-globalsurf-02` · 2026-10-04 · composite `sites/global-surf-adventures/mockups/picked/` at HEAD `2c7a17e` (designer fix round, look-log round 6), home + `book/` · dimensions 1–7 only. The visual critics' reports were not opened.

Checks, in this order (same order and viewports as round 1; new checks marked *new*):
1. `tools/audit-mockup.mjs global-surf-adventures picked` from a scratch mirror (the mockup folder was not written). Output copied to `critic/composite-r2/audit.json`.
2. `tools/shoot.mjs` over the running server (http://127.0.0.1:8971/picked/dist/ and `book/`), 1440 and 390.
3. Home probe (`probe-home.mjs`, round 1's, unchanged apart from the playwright path): video timing, first-screen actions, hero CTA tap, full-scroll CLS, overflow, tap targets, fonts, palette, 90-stop Tab pass, reduced motion, Save-Data, JS off.
4. Booking probe (`probe-book.mjs`, rewritten for the round-6 flow): Level 2 tap → Room (Next with no room, then Twin, "Choose this room") → Sat 20 Feb 2027, 7 nights, 1 couple → Total → "Continue booking" in the bar. Passes: 390 live, 1440 live, 390 API blocked, *new* 390 API mocked to "only the dorm is free", *new* 360×640. Deep links, keyboard (arrow keys on levels, Space on a room), colours per step, reduced motion, phone video, JS off (incl. submit without check-out).
5. *new* Hero title contrast (`probe-hero.mjs`): the poster and 11 frames of each loop rendition (0.5–9.8 s, extracted with ffmpeg and drawn in the poster's place, because headless will not seek the video), shade on, title glyphs and text-shadow hidden.
6. *new* Guests band contrast (`probe-guests.mjs`): every text run in the new ink band, background sampled with the text hidden.
7. Rosa (`probe-rosa.mjs`): live and with the JSON blocked; request frames checked.
8. `check-design.mjs` on both pages (booking through a scratch root copy).
9. `tools/funnel.mjs --depth 3` (round 1 read the designer's; this round run by the critic).
10. Rendered text against round 1's text and `copy/en.json`; key numbers against `dossier.json`.
11. Rebuild: `python3 src/build.py` in a scratch tree. Both pages came out **byte-identical** to `dist/`.

Evidence: `reports/2026-09-globalsurf-02/critic/composite-r2/` — `audit.json`, `home-probe.json`, `home-text*.txt`, `book-probe.json`, `hero-contrast.json`, `guests-contrast.json`, `rosa-probe.json`, `funnel/funnel.json`, the probe scripts, and git-ignored scratch images (`home/shots/`, `book/shots/`, `book-walk/`, `hero/`), to be cleaned after the round.

## The sentence the human needs

The composite still passes the critic's gates with no hard fail, now **72.8 / 80** on d1–7 (round 1: 70.5).
- 8 of round 1's 11 fixes are fixed. The past Saturday is gone. The room action is on the first screen at 390 and 1440, and no room is pre-chosen. The phone booking page no longer loads video.
- Not fixed: the new hero loop and the new booking clips are not in `dossier.videos[]`. `funnel.mjs` still reads the primary action as WhatsApp, which is a full-mode risk that the tool or Shahar must resolve. Self-hosted fonts (4g) are not due yet.
- New, small:
  - When live availability says the chosen room is not free, the page switches the room to the free one without saying so on the step the visitor is on.
  - On a 360×640 phone, "Choose this room" sits under the bar.

| d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|
| 10 | 9 | 9 | 8 | 9 | 9 | 8 | **72.8** | none | **pass** (d8 pending from the visual critics) |

## Round-1 fixes → status

| # | round-1 fix | status | evidence (round 2) |
|---|---|---|---|
| 1 | Drop past Saturdays from the calendar | **fixed** | First chip and first `#f-start` option is Sat 24 Oct 2026, JS on and off (`book-probe.json` `s3_dates_options`, `nojs_first_start`). The build filters, and the runtime drops options before the visitor's today (`book.js`). The no-JS `#f-end` list starts "From Sat 24 Oct 2026". |
| 2 | Update `notes.md` | **fixed** | Section 2 and the header record Dancing Script 600 + Lora and the 2026-10-04 approval. Round 5 is marked *superseded*. Round 6 documents this fix round. Older rounds still mention Caveat and Give You Glory, as history only. |
| 3 | Freestylers name repeated | **fixed** | Home: h3 "Freestylers – B&B only", then "from 4 nights". Booking: same (`home-text.txt`, `dist/book` `.free-s`). |
| 4 | Two off-token booking tones | **fixed** | 0 off-palette colours on all four booking steps at 390 and 1440 (`off_palette: {}` at every step). |
| 5 | Room step: action visible on arrival, no default chosen | **fixed** (one caveat) | On arrival `room_checked: null` and no tick on any pill. The coral "Choose this room" is at y 633–685 of 844 (390) and y 481–533 of 900 (1440), above the bar. Next is soft until a room is chosen; Next without a room stays and focuses the choose button. Choosing one shows "✓ Chosen" and a pill tick, then moves to Dates. Caveat: at **360×640** it is at y 615–667, under the bar (top 572) (`phone_small_live.s2_room_arrival`). |
| 6 | Home "Choose this room" lands on Level | **fixed** | The home links are now `book/?room=<k>#room`. `?room=double#room` opens Room with Deluxe double viewed and chosen ("✓ Chosen") (`deeplink_home_room_double`). |
| 7 | Hero title legibility on desktop | **fixed** (mostly) | Background behind the title, glyphs and shadow removed, shade on. Desktop poster: median **6.15:1**, lightest 10% **3.19:1** (round 1: 3.6 / 1.4). Across the 11 loop frames, the worst is the reef shot at 9.0 s: median 4.14, lightest 10% **2.41**, 18% of pixels under 3:1. Every other frame's lightest 10% is ≥ 3.0 on desktop. Phone worst: 2.0 s and 9.0 s, lightest 10% 2.75 / 2.80. All of these are before the text-shadow, which adds on top (`hero-contrast.json`). |
| 8 | Rosa fallback shift | **fixed** | 0 layout shifts after scrolling to the block, live and JSON-blocked (`rosa-probe.json`). Full-scroll CLS on the phone is 0.0033 (round 1: 0.041). |
| 9 | Record the hero loop in `dossier.videos[]` | **not fixed** | `dossier.videos[]` has 29 entries. None is `hero-d1728` / `hero-m608`, and none is the new booking clips `video/b/level-{1,2,3}`. Both recipes carry `# media:` headers, and `media/global-surf-adventures.tsv` lists the files. |
| 10 | Funnel classification before station 5 | **not fixed** (not a designer fix) | `funnel.mjs` (critic run): `clicks_to_book 1`, `primary_action.class: whatsapp` ("Ask about dates"), against `recommended.primary_action: engine`. It still lists the booking form as `form`, not engine. Taps from the home hero to the engine are now **6** (was 7): Book package now → Level tap → Choose this room → date chip → + couple → Next → Continue booking. |
| 11 | Self-host fonts | n/a at 4f (4g) | Google Fonts are still the only third party on load. |

## Shahar's instructions (ledger `mocked → picked`, 2026-09-30) — re-checked

All 13 are still met, as in round 1 (hero loop, Lora + Dancing Script, sections in his order from the named mockups, no Booking rating in levels, standalone booking with one step per screen).
- **Instruction 12** (room selector + a clear CTA to choose the room) is now met without the round-1 defect.
- **Instruction 13** (#1 palette): home colours are #1 tokens apart from the hero placeholder `#CDE4EE`, the level-panel placeholder `#CFDCE4`, and white at 80 % / 12 % inside the new ink guests band. The booking page is all tokens.
- **Change since round 1:** "What guests say" now sits on ink `#27293E` with img-023 toned in at 30 % (notes.md conflict 8). It passes check-design.

## Measured

| line | target | round 2 |
|---|---|---|
| first load, phone, throttled, no scroll (audit.json) | ≤ 1.5 MB | **503 KB** (HTML 112 KB uncompressed, fonts 104 KB, images 300 KB, JS 0 external) |
| largest above-fold image | ≤ 300 KB | 67 KB |
| LCP / CLS on load (throttled phone) | ≤ 2.5 s / < 0.1 | 416 ms / 0.003 |
| CLS after full scroll, phone / desktop | < 0.1 | 0.0033 / 0.0072 |
| fonts | ≤ 2 families, ≤ 150 KB | Lora + Dancing Script, 104 KB (Google Fonts, allowed at 4e/4f) |
| third-party on load (home, book) | 0 | Google Fonts only |
| Bookinglayer / Rosa requests on load | 0 | 0 / 0 |
| tap targets < 44 px | 0 | 0 on home (390, 1440) and on every booking step (390, 1440, 360) |
| overflow-x | 0 | 0 on home and on every booking step |
| check-design | 0 problems | home 0, book 0 |
| booking page on load, phone (unthrottled) | – | **471 KB, 0 video** (round 1: 2.13 MB with a 1.85 MB clip) |
| booking page on load, desktop | – | 3.2 MB, of which `level-1.webm` is 2.50 MB, requested after load |

**Video:**
- **Hero (unchanged files apart from the phone webm):**
  - phone `hero-m608.webm`: 1.90 MB, requested 191 ms after FCP;
  - desktop `hero-d1728.webm`: 3.33 MB, requested 267 ms after FCP;
  - 0 video requests under reduced motion and Save-Data (home and book).
- **Phone full scroll:** 5.9 MB of video (the hero plus three level clips).
- **New booking clips** (`video/b/`, desktop only):
  - 864×1080, no audio, made by `make-book-clips.sh` (`# media:` header);
  - durations 9.0 / 5.4 / 5.72 s;
  - webm 2.50 / 1.99 / 1.28 MB.
  - Fact only: the 6 s floor is a hero-video rule.

**Rosa (one embed): compliant.**
- On load: 0 requests.
- Near the block:
  - one `south-point.json` from the page;
  - the widget frame `https://rosa.surf/widget/?spot=south-point&theme=light&units=metric`;
  - a second `south-point.json` from inside Rosa's own frame (checked by request frame);
  - `server.arcgisonline.com` tiles from inside the widget.
- JSON blocked: the plain link "See today's forecast for South Point on Rosa" only, with no shift.

## Booking (Level 2 → Twin → Sat 20 Feb 2027, 7 nights, 1 couple)

| check | 390 live | 1440 live | 390 API blocked | 390 mocked "dorm only" | 360×640 (blocked) |
|---|---|---|---|---|---|
| engine calls on load | 0 | 0 | 0 | 0 | 0 |
| level tap advances to Room | ✓ | ✓ | ✓ | ✓ | ✓ |
| room chosen on arrival | none | none | none | none | none |
| "Choose this room" on arrival | y 633–685 / 844 ✓ | y 481–533 / 900 ✓ | ✓ | ✓ | **y 615–667, under the bar (572)** |
| Next with no room | stays, focuses Choose | same | same | same | same |
| first Saturday offered | Sat 24 Oct 2026 | same | same | same | same |
| bar on Total | "Total $3,092" + coral "Continue booking", in view | same | same | "Total $2,932" | in view (582–630) |
| total | $3,092, "Live price from the booking engine" | same | $3,092, "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." | $2,932, room **switched to Dorm** | $3,092 (snapshot) |
| hand-off | `…/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27` | same | same | same | same |
| back / forward from Total | `#dates` / `#total` | same | same | same | same |
| CLS through the walk | 0 | 0 | 0 | 0 | 0 |

- **WhatsApp prefill:** "…Level 2 – Rollers, check-in 20 Feb 2027, 7 nights, 1 couple, Shared Twin Room – 2 Beds."
- **Deep links:**
  - `?level=level-3-riders#room` opens Room with Level 3 and no room chosen.
  - `?room=double#room` opens Room with Deluxe chosen.
  - `?room=double` with no hash opens Level, with Deluxe kept. The home page uses no such link.
- **Keyboard:**
  - Arrow keys between levels change the level without jumping steps. Space on "Choose this room" chooses it and moves to Dates.
  - In the first 30 Tab stops on the booking page, every stop has a visible ring.
- **JS off:**
  - All four steps stack as one form. The first date is 24 Oct.
  - A submit without a check-out is blocked by `required`, and no request is made.
  - Hand-off: `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1`.
- **Silent room switch (new; tested with a mocked engine reply):** when the accommodations answer lists only the dorm, `refreshQuote()` re-checks the radio from Twin to Dorm (`book.js`, `if (free.length && room() && supp[room()] == null)`).
  - The visitor is on Dates. The bar total drops from $3,092 to $2,932, the URL changes to `room=dorm` and the WhatsApp text names the dorm.
  - The only explanation ("Only the Mixed dorm room – 4 beds is free on these dates" / "Not free on these dates") is on the Room step, which is not shown.
  - The Total step shows "Room: Mixed dorm room – 4 beds | Included" with no note (`book-walk/390-mock-4-total.png`: summary card with Dorm, $2,932, Continue booking).
- **Desktop Dates step (1440×900):** the Saturday chips fill the first screen. The nights selector and the guest steppers are below the fold (`book-walk/1440-3-dates.png`: chips October 2026 → March 2027, then the bar). Next without guests focuses the first stepper, so the flow is not blocked.
- **Step 1 on arrival:** Level 1 is shown selected (ink card with tick) before the visitor chooses. The radio group needs a value, and the hero link carries no level. This is the same "a default that looks like a choice" pattern as round 1's Dorm. It is reported, not scored.

## Facts and copy

- **Home text:** 109 rendered lines, all en.json strings, apart from template labels (skip link, footer labels, Rosa labels and live values, "1 / 9", and the bar's "From $1,466 pp | 7 nights"). Against round 1 the only text changes are:
  - the Freestylers line;
  - separators hidden at line ends (`common.js`), so "Saturday check-inISA-certified" in `innerText` is a wrap, not a lost space on screen;
  - the phone quote counter.
- **Booking:** whole dollars throughout: "+$140 pp … one guest", "+$80 pp … two sharing", "+$418 pp".
  - These are en.json's own strings, which passed 4c.
  - Dossier values: 140.04, 80.025, 418.46. Total $3,092 against 1,466 + 80.025 = 1,546.025 × 2 = 3,092.05.
  - Rounded presentations of sourced values (< $0.50), with "prices from the booking engine". Not counted as mismatches.
- `audit.json` `facts`: 28 numbers on the page, 0 not in the passed copy.
- **Spot-checked against `dossier.json`:**
  - $1,466; 8.6 / 80 reviews / 28 Sep 2026; 9.5 / 9.2;
  - +972523593240, +97299733943, info@globalsurf.com;
  - 14:00 / 11:00, $220 pickup, 12 rooms, ISA;
  - the Ahangama 80650 address and the T&C URL.
- **Tally:** 0 mismatches, 0 unsourced claims.
- **Copy nit, still open (d5):** room names mix cases ("Mixed dorm room – 4 beds" against "Shared Twin Room – 2 Beds"). These are the engine's titles.

## Accessibility notes

- **Keyboard (home):**
  - The 90-stop Tab pass has a visible ring on every stop except Rosa's iframe (Rosa's own) and `body` at the wrap-around.
  - No trap.
  - The phone bar's "Book now" is `tabindex=-1` and `aria-hidden` until the hero has gone, then focusable.
- **Hero title:** see fix 7. Large text needs 3:1.
  - The lightest 10 % of the background stays at or above 3:1 on every desktop frame but the 9.0 s reef frame (2.41), before the text-shadow.
  - Phone: two frames at 2.75 and 2.80.
- **Guests ink band:** every text run passes 4.5:1 on its own background.
  - Lowest minimum: 4.58 for the 16 px white-80 % date "28 Sep 2026" at 390. The lowest 10th percentile is 4.90 ("Cleanliness 9.2" at 1440).
  - Headings and quotes are ≥ 5.4 (`guests-contrast.json`).
- axe not run (quick mode).

---

```
mode: quick        round: 2 (picked composite, post-gate)        variant: picked (composite #1 + #2 + #3)
total: 72.8 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches, 0 unsourced (text vs en.json, numbers vs dossier). The rating is dated. Whole-dollar prices are the passed copy's own strings (< $0.50 rounding of dossier values). |
| 2 | mobile + perf | 9 | 503 KB, LCP 416 ms, CLS 0.003 (0.0033 after a full scroll), 0 targets < 44, 0 overflow. The phone booking page is down from 2.13 MB to 471 KB with no video. Minus: Google Fonts; 5.9 MB of video on a phone full scroll of home. |
| 3 | booking CTA | 9 | Hero → standalone `book/`. Level tap advances. The room action is on the first screen at 390 and 1440, with no pre-chosen room. Past dates are gone. The hand-off is in the bar on Total. Correct `start`/`end`/guests with JS on and off. Prefill carries the choices. 0 engine calls on load, 3 after interaction, and a fallback label when blocked. Minus: a silent room switch when live availability drops the chosen room; the CTA under the bar at 360×640; `funnel.mjs` still reads the class as whatsapp and 6 taps against target 1 (full-mode risk). |
| 4 | brand fit | 8 | §3 order, all 13 composite instructions met, persistent mobile booking bar. No first-screen proof point (calibration list). |
| 5 | copy | 9 | en.json verbatim. The Freestylers repeat is fixed. Minus: room-name casing is mixed (engine titles). |
| 6 | accessibility | 9 | Skip link, rings, no trap, 0 small targets, 0 video under reduced motion and Save-Data. Guests band ≥ 4.5:1. Hero background lightest 10 % ≥ 3:1 on 10 of 11 desktop frames. Minus: the reef frame (9.0 s) at 2.41 before the shadow; Rosa's iframe has no ring; axe not run. |
| 7 | security + delivery | 8 | Static, relative, rebuild byte-identical, 1 lazy embed with reserved space and fallback, recipes with `# media:` headers. Minus: Google Fonts (4g); the hero loop and the new booking clips are not in `dossier.videos[]`. |

check-design default-look facts (none fail):
- home: h1 Lora, h2 Dancing Script, body Lora.
- book: h1/h2 Dancing Script, body Lora.
- Both: ground `#FFFFFF`, 0 all-caps labels, 0 labelled headings (0/20, 0/11).

## Fix list for the designer (smallest first; none blocks the 4f gate)

1. **Record the new media in `dossier.videos[]`** (d7; round-1 fix 9). The hero loop is `hero-d1728` / `hero-m608` (cut from vid-009 + vid-010). The booking clips are `video/b/level-{1,2,3}` (from `make-book-clips.sh`).
2. **Say so when the room changes** (d3). When live availability drops the visitor's chosen room, either keep their choice and show "Not free on these dates" on the step they are on, or show the switch on Dates and Total, for example "Twin isn't free on 20 Feb; we picked the dorm". Do not switch the room silently. Evidence: mocked pass `book-probe.json` `phone_mock_dorm_only.s3c` / `s4_total`; `book.js` `refreshQuote()`.
3. **Small phones: keep "Choose this room" above the bar** (d3). At 360×640 it is at y 615–667 under the bar's top at 572. Evidence: `phone_small_live.s2_room_arrival`.
4. **Desktop Dates step:** bring the nights and guests into the first screen at 1440×900, or put a jump next to the chips. Today the chips fill it (`book-walk/1440-3-dates.png`).
5. **Hero reef frame** (d6, optional): at 9.0 s the background behind the title reaches 2.41:1 (lightest 10 %, desktop) before the shadow. A slightly stronger shade, or a crop that keeps the white water off the title, would close it.
6. **Before station 5** (not the designer's alone): `funnel.mjs` still reads the primary action as `whatsapp` against `recommended.primary_action: engine`, and there are 6 taps against `clicks_to_book: 1`. Either the tool learns the GET form to the engine, or Shahar sets the target for the stepped flow he asked for. Otherwise full mode hard-fails.
7. At 4g: self-host the fonts.

what the designer prompt got wrong: The prompt has no rule for what happens to a visitor's choice when live data contradicts it. So the booking page "corrects" the room in the background and tells the visitor only on a step they are no longer on. A rule such as "never change a choice the visitor made without saying so on the screen they are on" would cover it. The "primary choice on the first screen" check was measured at 390×844 and 1440×900 only, so a 360×640 phone was not tried. Naming a small-phone viewport in the self-check would catch that.

Not tested:
- a real phone or GPU, Safari, axe;
- the engine's screens past the product URL;
- throttled numbers for the booking page;
- the hero contrast with the text-shadow included (it was measured without it);
- the silent-switch case against the real engine (mocked reply only);
- the old site, whose side-by-side belongs to the visual critics.
