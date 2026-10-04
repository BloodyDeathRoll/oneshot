# global-surf-adventures — critic quick scorecard, picked composite (station 4f)

critic 0.4.1 · rubric 0.3.0 · run `2026-09-globalsurf-02` · 2026-10-04 · composite `sites/global-surf-adventures/mockups/picked/` at HEAD `0770cdb` (home + `book/`) · dimensions 1–7 only. The visual critics' reports were not opened.

Checks, in this order:
1. `tools/audit-mockup.mjs global-surf-adventures picked`, run from a scratch mirror so the mockup folder was not written. The output is copied to `critic/composite/audit.json`.
2. `tools/shoot.mjs` over the running server (http://127.0.0.1:8971/picked/dist/), home and `book/`, 1440 and 390.
3. Home probe (`probe-home.mjs`), phone and desktop:
   - video timing against first paint;
   - first-screen actions and a hero CTA tap-through;
   - full-scroll CLS, overflow and tap targets;
   - computed fonts on every title, and every rendered colour against #1's tokens;
   - a 90-stop Tab pass;
   - reduced motion, Save-Data and JS off.
4. Booking probe (`probe-book.mjs`), phone live, desktop live, phone with `api.bookinglayer.io` blocked:
   - Level 2 → Twin → Sat 20 Feb 2027, 7 nights, 1 couple → Total → Continue;
   - engine calls, hand-off URL, back/forward and deep links;
   - JS off;
   - reduced motion.
   - Engine navigations were aborted and recorded. The guest form was never opened.
5. Rosa probe (`rosa-probe.json`): on load, after scroll, and with the JSON blocked.
6. `check-design.mjs` on both pages.
7. Rendered text against `copy/en.json`. Key facts against `dossier.json`.
8. ffprobe plus frame sheets of both hero renditions. A frame-contrast estimate behind the hero title.
9. Rebuild reproducibility: `python3 src/build.py` in a scratch copy. Both pages came out **byte-identical** to `dist/`.

Evidence: everything is under `reports/2026-09-globalsurf-02/critic/composite/`:
- `audit.json`
- `home/shots/`, `book/shots/`
- `home-probe.json`, `home-text*.txt`
- `book-walk/` (step screenshots + `book-probe.json`)
- `book-text.txt`
- `rosa-probe.json`
- `hero/` (frame sheets, poster-frame captures)

The PNG/JPG files are git-ignored scratch, to be cleaned after the round.

## The sentence the human needs

The composite passes the critic's gates with no hard fail (70.5 / 80 on d1–7).
- Every section of Shahar's 30 Sep list is present, in his order, from the mockup he named.
- The booking flow is standalone, one step per screen, with #2's room selector.
- The approved Dancing Script titles and #1 palette are applied consistently. The hero title is Lora by Shahar's 30 Sep edit.

What remains:
- The snapshot calendar still offers **Sat 3 Oct 2026, which is yesterday**.
- On arrival at the room step, "Choose this room" is below the fold, and Dorm is already chosen.
- On desktop, the hero title partly sits on white bungalow walls.
- Full-mode risk: `funnel.mjs` reads the primary action as WhatsApp, not engine.
- `notes.md` is stale: it still documents Give You Glory.

| d1 (20) | d2 (15) | d3 (15) | d4 (5) | d5 (10) | d6 (8) | d7 (7) | total /80 | hard fails | critic gates |
|---|---|---|---|---|---|---|---|---|---|
| 10 | 9 | 8 | 8 | 9 | 8 | 8 | **70.5** | none | **pass** (d8 pending from the visual critics) |

## Shahar's instructions (ledger `mocked → picked`, 2026-09-30) — checked one by one

| # | instruction | result | evidence |
|---|---|---|---|
| 1 | Hero = #1's loop (pool + pro surfer), plus a third scene: the beginner stands up as the guide cheers (#3's shot) | **met** | Frames show pool (0.5–2.5 s), then the beginner stands up (3.1–3.6 s), then the guide with arms up and clapping (4.2–5.6 s), then the reef rider (7.0–10.0 s), at both widths (`hero/sheet-desktop.jpg`, `hero/sheet-phone.jpg`). It is 10.32 s long, real speed and hard cuts. |
| 2 | Fonts = #3's (Lora); handwritten titles → Caveat, **superseded by the approved Dancing Script** | **met, applied consistently** | Every section `h2.script` is Dancing Script 600: 9 home titles, footer "Talk to us / Getting here / Follow", the 4 booking step titles and the booking "What's included" subtitle. Body, h3 and quotes are Lora. Loaded faces: Dancing Script 600 + Lora 400/500/600/500i only (`home-probe.json` `fonts_loaded`). |
| 2a | — hero h1 | **Lora 500 (48 px desktop, 41 px phone), not script** | Commit `3f71fa6` records it as "Shahar's edits of 2026-09-30". Reported as fact, not failed. The feature line is Lora italic (#3's), as notes.md conflict 3 says. |
| 3 | "Next set is yours" from #3 | met | Asymmetric split, img-118 with img-024 over its corner (`home/shots/desktop-01.png`: woman with board left, small pineapple-pool inset). |
| 4 | Choose your level = #1 with the font change; **remove the Booking rating** | met | `#levels` text has no "8.6" and no "Booking.com" (probe). Three 4:5 living clips + Freestylers card. On the phone it is a swipe row. |
| 5 | What's included + "Surf, breakfast, surf again" from #3 | met | The icon list beside the full-height photo; the text-left slideshow runs off the right edge (`desktop-04`, `desktop-05`). |
| 6 | Our rooms from #2 | met | Dorm / Twin / Deluxe double pills, gallery with arrows and dots, "Choose this room" (`desktop-06`). |
| 7 | Pool image, What guests say, The waves from #3 | met | Feature line over img-005; score column + quote slideshow; Rosa headline + widget (`desktop-07`, `-08`, `-09`). |
| 8 | Follow the lodge from #2 | met | Ink Instagram button + snap row of 8 tiles (`desktop-10`). |
| 9 | "Book the week for your level" from #3 | met | img-111 left, script line, coral + WhatsApp buttons (`desktop-11`). |
| 10 | Footer #1 | met | Logo + tagline, Talk to us, Getting here, Follow, legal line (`desktop-12`). |
| 11 | Booking standalone, not in the home page; **each step on its own screen** | **met** | The home page has no booking form. At each step exactly one `.step` is visible (`visible_steps: ["level"]`, `["room"]`, `["dates"]`, `["total"]`), with its own URL hash. Back/forward move between steps. With JS off, all 4 stack as one GET form, which is intended. |
| 12 | Rooms step: top selector dorm/twin/deluxe as in #2 + a **clear CTA to choose that room** | **met, with a defect** | The pills sit at the top of the step and each room has "Choose this room". But on arrival the CTA is **below the fold**: y 1363 on a 844 px phone, y 1112 on a 900 px desktop. The default Dorm is **already chosen**, shown as an ink button with a tick. The coral CTA appears only after switching to another pill (`book-walk/room-1440-dorm-default.png`, `room-390-twin-unchosen.png`). |
| 13 | Palette = #1 "The sign" (approved 2026-10-04) | **met** | Home: every rendered text and background colour is a #1 token (ink #27293E, #3F4260, white, #EEF2F5, coral #D1402A) apart from two placeholder grounds: the hero `#CDE4EE` behind the poster and the level-panel media `#CFDCE4`. Booking adds two off-token text tones: `#D5D8E6` (detail text on the selected ink card) and `#2B2E47` (`dt` labels). Coral carries white text only. |

## Measured

| line | target | composite |
|---|---|---|
| first load, phone, throttled, no scroll (audit.json) | ≤ 1.5 MB | **499 KB** (HTML uncompressed 107 KB, fonts 104 KB, images 300 KB, JS 0 external) |
| largest above-fold image | ≤ 300 KB | 67 KB (desktop poster webp) |
| LCP / CLS on load (throttled phone) | ≤ 2.5 s / < 0.1 | 408 ms / 0.003 |
| CLS after full scroll, phone / desktop | < 0.1 | 0.041 / 0.007. The Rosa `.fallback` turns `position:absolute` inside its reserved box (0.015), and the font swap is 0.003. |
| fonts | ≤ 2 families, ≤ 150 KB | Lora + Dancing Script, 104 KB (Google Fonts, allowed at 4e) |
| third-party on load (home, book) | 0 | Google Fonts only |
| Bookinglayer / Rosa requests on load | 0 | 0 / 0 |
| tap targets < 44 px | 0 | 0 on home (390, 1440) and on every booking step (390, 1440) |
| overflow-x at 390 | 0 | 0 on home and on every booking step |
| skip link first, target exists | yes | ✓ both pages |
| check-design | 0 problems | home 0, book 0 |

**Video (ffprobe + probe):**
- **Hero files:**
  - phone `hero-m608`: 608×1080, webm 1.72 MB / mp4 1.95 MB (≤ 2 MB).
  - desktop `hero-d1728`: 1728×972, webm 3.41 MB / mp4 3.63 MB (≤ 4 MB).
  - Both are 10.32 s, have no audio stream, and the MP4 has `moov` before `mdat` (faststart).
- **Hero request after first paint:** phone +175 ms, desktop +243 ms.
- **Reduced motion and Save-Data:** 0 video requests on home after a full scroll, at both widths, and 0 on the booking page.
- **Phone full scroll pulls 5.6 MB of video:** hero 1.68 MB + three level clips (1.85 + 1.24 + 0.92 MB). the-sign alone was 4.2 MB.
- **Booking page on load:** 2.13 MB unthrottled, of which 1.85 MB is the level clip `vid-010-p45.webm`, requested +209 ms after first paint (phone). Without the clip it is about 280 KB.
- **Provenance:**
  - The hero loop comes from business-owned vid-009 and vid-010 sources. Its recipe `src/make-hero.sh` carries `# media: …/picked/dist/video/hero-*`, and the 10 files are listed in `media/global-surf-adventures.tsv`.
  - The new loop is **not recorded in `dossier.videos[]`** (0 matches), the same gap as `vid-010c` in the earlier rounds.

**Rosa (home; one embed) — compliant:**
- On load: 0 requests.
- Near the block: one `south-point.json` request and the widget frame `https://rosa.surf/widget/?spot=south-point&theme=light&units=metric`.
- The headline redraws live: "Sun 4 Oct 14:30, 0.5–0.7 m waist-high, 10 s SSE, 13 km/h cross-shore". The baked 28 Sep values are hidden until the JSON proves fresh.
- JSON blocked: the headline, meta and widget are hidden, and only "See today's forecast for South Point on Rosa" shows. No layout shift was recorded.
- JS off: the plain link only.
- Mapping: South point → `south-point` (`concepts.md`).
- Not scored: the headline's 10 s period differs from the widget's 12 s at 12:00. Both come from Rosa.

## Booking (Level 2 → Twin → Sat 20 Feb 2027, 7 nights, 1 couple)

| check | phone live | desktop live | phone, API blocked |
|---|---|---|---|
| engine calls on load | 0 | 0 | 0 |
| after interaction | GET product availabilities, GET accommodations/availabilities, POST packages/…/items (`api.bookinglayer.io` only) | same | same 3, aborted |
| total shown | $3,092.05, "Live price from the booking engine" | same | $3,092.05, "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026." |
| per person | $1,466 + Twin $80.02 = $1,546.03 | $80.03 (rounding of 80.025) | $80.03 |
| hand-off, JS on | `…/en/product/level-2-rollers?start=2027-02-20&couple=1&end=2027-02-27` | same | same |
| hand-off, JS off (level-2 button) | `…/level-2-rollers?start=2027-02-20&end=2027-02-27&female=0&male=0&couple=1` | – | – |
| `duration` anywhere | no | no | no |
| WhatsApp prefill | "…Level 2 – Rollers, check-in 20 Feb 2027, 7 nights, 1 couple, Shared Twin Room – 2 Beds." | same | same |
| back from Total / forward | `#dates` / `#total` | same | same |
| deep links | `?level=level-3-riders#room` opens Room with Level 3 ✓. `?room=double` (the home "Choose this room") opens **Step 1 Level** with Deluxe preselected. | same | same |
| missing date on Next | stays on Dates and focuses the first chip | same | same |

- **Hero CTA tap (phone):** "Book package now" → `book/`, Step 1 Level (`home-probe.json` `hero_cta`).
- **Snapshot calendar** (chips, no-JS select and the no-JS check-out list):
  - It starts with **Sat 3 Oct 2026, which is in the past** today. The rest of the list is Sat 24 Oct, Sat 31 Oct, Sat 19 Dec … Sat 3 Apr 2027.
  - The live calendar (start = today) replaces it only after a guest is chosen. So a visitor who picks a date first, or has no JS, or whose API call fails, can pick yesterday.
- **Taps to the engine:** from the home page, "Book package now" → Next → Next → date chip → + guest → Next → Continue = **7 taps**. From a home "Choose Level n" it is 6.
  - `dossier/…/audit.json` `recommended.clicks_to_book` is 1 with `primary_action: engine`.
  - The designer's `funnel/funnel.json` reports `clicks_to_book 1` but `primary_action.class: whatsapp`, because it does not classify the GET form. In full mode that is a **hard fail** (different primary class), and over the target d3 is capped at 6.
  - Not scored at 4f, but it must be resolved before station 5: the tool learns GET forms to the engine, or the target is revisited given Shahar's stepped-flow instruction.

## Facts and copy

- **Home text:** 108 rendered lines, all of them en.json strings, apart from template labels:
  - "Skip to content", "Talk to us", "Terms and conditions", "© Global Surf Adventures";
  - the Rosa labels and the live Rosa values.
- **Booking text:** all en.json, apart from template labels:
  - "Step n of 4", the month headings and "Sat n" chip labels;
  - "−", "—", "Total for 1 guest".
- `audit.json` `facts`: 28 numbers on the page, 0 not in the passed copy.
- **Spot-checked against `dossier.json`** (all present):
  - $1,466; 8.6 / 80 reviews; 9.5 / 9.2 category scores; 12 rooms;
  - +972523593240 (WhatsApp), +97299733943 (tel), info@globalsurf.com;
  - 14:00 / 11:00; the $220 pickup; supplements 80.025 / 140.04 / 418.46; ISA;
  - "Henewatta Addara Gederawata … 80650", Kathaluwa, 3.9 km;
  - the Instagram, YouTube and Facebook handles and the T&C URL.
- **The rating** carries its count, source and date ("Booking.com 80 reviews | 28 Sep 2026"). It is now only in "What guests say", per instruction 4.
- **Room galleries** come from `room_photo_groups` (owner-unconfirmed, the twin group medium confidence): flagged, not failed.
- **Copy nits (d5):**
  - "Freestylers – B&B only" appears twice in a row, as the card's h3 and again as its detail line "Freestylers – B&B only | from 4 nights", on home and on booking.
  - The room names mix sentence case and title case ("Mixed dorm room – 4 beds" against "Shared Twin Room – 2 Beds"). This comes from the engine's titles in en.json.
- Tally: **0 mismatches, 0 unsourced claims.**

## Accessibility notes

- **Keyboard:**
  - 90-stop Tab pass on home and 40 stops per booking page.
  - Every stop has a visible focus ring, except Rosa's iframe (Rosa's own) and `body` at the wrap-around.
  - No trap; tab order is logical (skip → logo → nav → content → footer).
- **Hero title contrast:**
  - White Lora over the paused poster frame.
  - Desktop: the median background behind the title box is 3.6:1, but the lightest 10% is 1.4:1. "starts here" crosses the white bungalow walls (`hero/page-1440-0.5.png`).
  - Phone: median 4.9:1, lightest 10% 1.6:1.
  - Large text needs 3:1. A text-shadow and #1's local shade are the only mitigation.
  - Raw frames without the shade (`hero/sheet-*`) drop to a 2.1:1 median on the reef shot.
  - Headless Chromium would not paint seeked video frames, so the shaded value on the later scenes was not measured.

---

```
mode: quick        round: 1 (picked composite, post-gate)        variant: picked (composite #1 + #2 + #3)
total: 70.5 / 80 (d1–7)   result: pass (critic gates; d8 from the visual critics)   hard_fails: []
```
| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 0 mismatches and 0 unsourced (text vs en.json, numbers vs dossier). The rating is dated. The Booking rating is removed from the levels, as instructed. Galleries come from `room_photo_groups` (flagged). |
| 2 | mobile + perf | 9 | 499 KB, LCP 408 ms, CLS 0.003, 0 targets < 44, 0 overflow. Hero after paint, inside the caps, no audio, faststart. Minus: Google Fonts; 5.6 MB of video on a phone full scroll; full-scroll CLS 0.041 (Rosa fallback repositioning). |
| 3 | booking CTA | 8 | Hero CTA → standalone `book/`. One step per screen with URLs and history. 0 engine calls on load and 3 after interaction. Fallback label shown when blocked. `start`/`end`/guests on both paths. The prefill carries the choices. Minus: the snapshot calendar offers **Sat 3 Oct 2026 (past)**; the room CTA is below the fold and Dorm is pre-chosen; 7 taps to the engine against target 1, and funnel reads the class as whatsapp (a full-mode risk). |
| 4 | brand fit | 8 | §3 order. All 13 composite instructions are met (table above). No first-screen proof point (calibration list). |
| 5 | copy | 9 | en.json verbatim; labels add no claim. Minus: the Freestylers name is repeated; room-name casing is mixed. |
| 6 | accessibility | 8 | Skip link, focus rings, no trap, 0 targets < 44, 0 video under reduced motion and Save-Data, plain-link Rosa fallback, alt on all 38 images (4 decorative empty). Minus: on desktop the hero title crosses white walls (lightest 10% at 1.4:1); Rosa's iframe has no focus ring. axe not run. |
| 7 | security + delivery | 8 | Static, relative, rebuild byte-identical, 1 lazy embed with reserved space and fallback, media recipe header present. Minus: Google Fonts (4g); new hero loop not in `dossier.videos[]`. |

check-design default-look facts (none fail):
- home: h1 Lora, h2 Dancing Script, body Lora.
- book: h1/h2 Dancing Script, body Lora.
- Both: ground `#FFFFFF`, 0 all-caps labels, 0 labelled headings (0/20 home, 0/11 book).

## Fix list for the designer (smallest first; none blocks the 4f gate)

1. **Drop past Saturdays from the build-time calendar** (d3). Filter the snapshot list against the build date, or at runtime against today, before the live calendar answers. This covers the chips, `#f-start` and the no-JS `#f-end` optgroups. Today the list opens with Sat 3 Oct 2026. Evidence: `book-walk/book-390-3-dates.png` shows "October 2026: Sat 3, Sat 24, Sat 31"; `book-probe.json` `s3_dates_options.select_first[0] = "2026-10-03"`.
2. **Update `mockups/picked/notes.md`** (station hygiene). It still documents Give You Glory and Caveat in sections 2 and "Fonts", the look-log round 5 and the checks. The built pages use Dancing Script 600 (`src/site.css:7 --script`) and a Lora 500 hero title (commit `3f71fa6`). Also record the 2026-10-04 font and palette approval.
3. **Repeat no name in the Freestylers detail line** (d5). Use "from 4 nights" alone under the h3. Evidence: home `#levels .free .detail` and booking `#level .free-s strong`; `home/shots/desktop-03.png` shows "Freestylers – B&B only / … / Freestylers – B&B only | from 4 nights".
4. **Bring the two booking text tones onto #1's tokens** (palette consistency):
   - the `.pick` selected-card `.detail` at `#D5D8E6`;
   - the total-card `dt` at `#2B2E47`.
   - Use `--ink2` / white-at-opacity from the token set. Evidence: `book-probe` colour scan (`fg rgb(213,216,230) SPAN.detail`, `fg rgb(43,46,71) DT`).
5. **Room step: make "choose" visible on arrival** (instruction 12, d3):
   - bring the room name, price and "Choose this room" into the first screen at 390 and 1440 (now at y 1363 / 1112), for instance by shrinking the phone media half on this step or placing the CTA beside the pills;
   - do not show the default room as already chosen (an ink button with a tick) before the visitor chooses.
   - Evidence: `book-walk/room-1440-dorm-default.png` shows only pills + gallery + Next above the fold; `room-390-dorm-default.png`.
6. **Home "Choose this room" deep link** lands on Step 1 Level (`?room=double` → `cur: level`). Either land on Room with that room selected, or label the step so the visitor sees their room was kept. Evidence: `book-probe.json` `deeplink_room_double`.
7. **Hero title legibility on desktop**: the title box crosses the white bungalow walls (lightest 10% of the background 1.4:1, median 3.6:1). Strengthen #1's local shade, or check every scene with the shade on. Evidence: `hero/page-1440-0.5.png`; raw frames `hero/sheet-desktop.jpg` at 9.0 s (reef) and 4.8–5.6 s (splash).
8. **Rosa fallback reposition** adds a 0.015 layout shift when the widget attaches (`.rosa-box .fallback` switches to `position:absolute` at runtime). Set it absolute in CSS from the start. Evidence: `rosa-probe.json` `ok_390.shifts`.
9. **Record the new hero loop** (`hero-d1728` / `hero-m608`, cut from vid-009 + vid-010) in `dossier.videos[]`, as was done for vid-009e/003e.
10. **Before station 5:** resolve the funnel classification. `funnel.mjs` reads the primary action as `whatsapp` (designer's `funnel/funnel.json`) against `recommended.primary_action: engine`, and counts 7 taps to the engine against `clicks_to_book: 1`. Either the tool learns the GET form to the engine, or the human decides the target for a stepped flow he asked for. Otherwise full mode hard-fails.
11. At 4g: self-host the fonts.

what the designer prompt got wrong: The composite brief says "each step on its own screen" and "a clear CTA to choose that room". It does not say that a step's primary choice must be visible on that step's first screen, or that a default selection must not look like a choice the visitor already made. The room step therefore opens with a 574 px level clip, the CTA below the fold, and Dorm pre-chosen. The build-time booking snapshot also has no rule to drop dates before the build date (or today), so a 29 Sep calendar shipped a past Saturday on 4 Oct.

Not tested:
- a real phone or GPU, Safari, axe;
- the engine's screens past the product URL;
- throttled numbers for the booking page (the probe was unthrottled);
- the shaded hero contrast on scenes 2–4 (headless would not paint seeked frames);
- the old site, which was not re-shot because d8 and the side-by-side belong to the visual critics.
