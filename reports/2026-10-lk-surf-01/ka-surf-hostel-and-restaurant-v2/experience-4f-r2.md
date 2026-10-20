# KA Surf Hostel v2 — experience-critic, station 4f, designer round 2

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · same method and calibration as `experience-4f.md` (r1). Written without reading the other critics' reports.

## How it was walked

- **Served over http** (`127.0.0.1:8841–8843`). All fonts are now self-hosted: the walks made 0 font-CDN requests.
- **Phone:** 390×844, touch, CDP 1.6 Mbps / 150 ms RTT, CPU ×4. The three phone walks ran **one at a time**.
  - Cold-load frames at 0.5 / 1.5 / 3 s.
  - A human-pace wheel scroll: 0.7 screen in 8 steps, then a 450 ms dwell, with a frame at each stop.
  - A rAF frame-time recorder plus LCP and CLS observers.
  - A tap on the foot-bar "Check dates", with frames at 80–600 ms.
  - Esc to close the sheet, then a check that focus returns. No personal data; no external page opened.
- **Laptop:** 1440×900. The same walk, plus hover at 60 and 400 ms and a click.
- **Phone, reduced motion** and **phone, JavaScript off:** hidden-text and broken-image counts.
- **Probes** (`probe-r2.json`):
  - interactive: the story (auto-advance, behaviour off-screen, behaviour after a tap, chapter tap);
  - unique: the idle swaps and the viewer on the laptop; overlap of the staff section and the viewer on the phone;
  - calm: the phone sticky band;
  - all pages: press feedback.
- **Throttled font check:** the h2 was cropped and compared, throttled vs unthrottled, on calm (`font.mjs` / `font2.mjs`, scratch).
- **Inspector:** tasteskill `inspect.mjs` at 1440 + 390.
- **Evidence:** `reports/2026-10-lk-surf-01/experience/ka-surf-hostel-and-restaurant-v2/r2-<variant>/walk.json` and `probe-r2.json`. All frames and screenshots were deleted.
- **Not seen:** Rosa and the map were blocked, so only their fallbacks were seen. They now request their frames only after scroll, as the notes say: `extAfterScroll` shows rosa.surf and maps.google.com, with 0 requests on load.
- **Comparison:** the current site is still none (KA has no website). The comparison is the r1 pages of this report and the gold Canopy page.

## Measured

| page | phone bytes, first load | phone LCP (throttled) | CLS | phone scroll frames >34 ms | laptop scroll frames >34 ms | sheet | inspector |
|---|---|---|---|---|---|---|---|
| calm r2 | 641 KB | **1.97 s** (r1 3.10) | 0 | 0 / max 17 ms | 0 | `<dialog>`, focus inside, Esc closes, focus returns | **0 FAIL**, 4 WARN (r1: 1 FAIL) |
| interactive r2 | 821 KB | **1.92 s** (r1 3.58) | 0 | 0 / max 17 ms | 0 | same, plus the dorm/private choice | 1 FAIL (focal-point), 4 WARN incl. palette-cream |
| unique r2 | 792 KB | **1.36 s** (r1 1.60) | 0 | 0 / max 17 ms | 0 | same | 2 FAIL (focal-point; **covered-text "What guests say about the staff" 100 % hidden at 390**, and "0.7–1.1m"), 3 WARN |

- **All three:** 0 third-party requests on load. No hidden text or broken images with reduced motion or JavaScript off. Every "Check dates" is a real link (now to Booking.com). Hover darkening over 160 ms, `.btn:active` scale .97 (measured on the calm and unique foot bars).
- **New for all three: brand fonts are lost on the throttled phone.**
  - The fonts are applied by script only if they land before `performance.now() < 4000` while the visitor is still at the top. On the 1.6 Mbps profile they arrive after that, so **the whole visit renders in the Arial-like fallback**.
  - Calm, cropped h2: throttled = plain sans, unthrottled = Kalam. Every phone frame of all three pages shows sans section titles; the laptop frames show Kalam, Caveat and Nanum.
  - In r1 the Google-hosted faces landed in time on the same profile, so this is a regression from self-hosting.
  - The woff2 files are small (15–75 KB) and preloaded, but they queue behind the photographs.

---

## calm r2 — "Patio"

**Timeline (phone):**
- 0.5 s: a trio of prints (cottages, fruit plate, private room) already composed in the mint, painted as **blurred placeholders**. "Five minutes from Kabalana Beach", the tagline, white-on-papaya "Check dates" and the proof line are all readable.
- 1.5 s: the cottages are sharp. 3 s: all three are sharp.
- The empty mint field of r1 is gone.

**The walk:**
- Rooms: a large slideshow, and the beds as one " | " line per group.
- **Kabalana now comes before breakfast** (playbook §3).
- Amenities are three short " | " lines under their group names instead of 19 rows in boxes.
- On the phone each section's print **holds in a sticky mint band** (`img-004` stays at top 93 px from scroll 1000 to 2200) while a rounded text panel slides up over it. This is the phone's own version of the curtain, and it is smooth (0 long frames).
- The laptop curtain now crossfades its prints (600 ms) instead of slicing them.

**Booking:** 2 taps, a modal dialog with Booking.com as the primary. Clean and trustworthy, as in r1. You still choose nothing inside the sheet.

**Score: 7/10. Fail (r1: 6).** Now a composed, calm, well-paced page. The first screen has a moment, and the phone has its own motion. But it is still the quiet one, nothing makes you want to go more than the photographs alone do, and on the slow phone it is set in Arial.

**Better than the earlier round:** **yes.** First screen, LCP (1.97 s vs 3.10 s), phone motion and amenities are all better. The inspector went from 1 FAIL to 0.

**Fixes left:**
1. **Fonts on a slow phone:** load the two woff2 files ahead of the gallery images (fetchpriority, or set below-fold images lazy and low priority), or drop the 4 s gate and keep only "not yet scrolled". On the target device Kalam must appear; it is the page's character.
2. **Give the sheet a choice** (dorm or private, as in interactive), so the booking tap carries an intention to the hand-off.
3. **One moment of pull above the fold on the phone:** let the trio breathe (it is cropped at the right edge at 390 px), or let Mia's line ride under the hero. Calm currently persuades only by order and tidiness.

---

## interactive r2 — "Stories"

**Timeline (phone):**
- 0.5 s: the story frame is **already painted** (blur placeholder, then `img-006`) with its five segments. No grey box.
- 1.5–3 s: unchanged and sharp.
- LCP **1.92 s** (r1 3.58 s).
- The slivers are gone (0 in the DOM box).
- The h1 "Five minutes / from Kabalana Beach" and the tagline sit tight above the frame.

**Story behaviour (probe):**
- It auto-advances after 4 s (`img-006` → `img-001`).
- It **pauses off-screen**: at scroll 3000 it stayed on segment 1 for 4.5 s.
- A tap advances it in a 300 ms crossfade with 0 long frames, and **autoplay then stops** (the segment count held for 5 s).
- A chapter tap ("The beach") restarts the story on `img-020`.
- This is the behaviour WCAG 2.2.2 and a traveller both want.

**The walk:** unchanged from r1 in order: blue rooms with slideshows, the quote rail, ratings, breakfast, amenities, the beach with the Rosa headline, the Instagram grid, getting here, the blue footer. Section padding is tighter (no empty screens). **The amenities are still three long columns of single rows** (no " | " compression, unlike calm and unique), and that remains the dead stretch.

**Booking:**
- Foot bar, then a modal sheet, then **"A dorm bed / A private room"** with thumbnails, then the bed list (220 ms), then the OTA. 2–3 taps.
- Focus stays inside, Esc closes, focus returns.
- Still the best booking moment of the set.

**Score: 8/10. Pass (r1: 7).** The one thing holding it back in r1 (a grey first frame and 3.6 s LCP) is fixed. The story is now fast, considerate and the most engaging mechanic on the phone.

**Better than the earlier round:** **yes.** First paint, LCP, off-screen pause, stop-on-tap, no skeleton-like slivers, and Caveat instead of Gochi Hand on the laptop.

**Fixes worth doing even at a pass:**
1. Fonts on the slow phone (as calm). Caveat is the largest font file of the three pages (75 KB), so subset it to the title glyphs.
2. Compress the amenities to " | " lines.
3. palette-cream WARN (`#e8e4dc` section): defend it or move it to the denim family.

---

## unique r2 — "The roll"

**Timeline (phone):**
- 0.5 s: name, h1, tagline, papaya "Check dates", proof line, then **blank page below** (the roll frames are still downloading).
- 1.5 s: one frame (the fruit plate) has painted.
- 3 s: the two-column roll is mostly filled.
- LCP **1.36 s**, the fastest of the set.
- The shutter no longer runs on the phone. But the frames have no placeholder, so on a slow network the lower half is still empty for about 1.5 s.

**The walk:**
- The roll is carried down the page as five-frame bands that open the staff, amenities, beach and getting-here sections.
- The Instagram grid is now large tiles.
- The beach is on sea-glass `#96AEB1` instead of cyan, which is calmer and truer to the photographs.
- **Laptop:** the strongest first screen of all (seven columns of KA's own pictures around a larger name cell). The **idle swaps now fire**: 3 crossfading overlays seen in 12 s, where r1 had 0. The frame-to-viewer grow still works (0 long frames; Esc closes).
- **Phone, the staff section is broken.**
  - The sticky facts column ("9.9 / 9.9 / 24 hours") now **overlaps the quote text**: letters lie on letters.
  - The probe counted 1–6 overlaps per stop over about 1,200 px of scroll (y 3500–4700).
  - The inspector reports "What guests say about the staff" 100 % covered at 390.
  - This is the page's most important trust section (Mia's dengue line is in it), and on the phone it reads as a layout bug. The sticky column was meant to sit beside the quotes; on the phone it sits on them.

**Booking:** 2 taps through the same modal sheet, plus the viewer's own "Check dates". Focus is handled correctly.

**Score: 7/10. Fail (r1: 8).**
- The laptop is better than r1: swaps, bands, bigger Instagram, sea-glass.
- The phone now shows a visible text-on-text collision in the trust section and a still-blank lower half at 0.5 s.
- A traveller on a phone would notice the collision. With that one bug fixed, this page is an 8 or better.

**Better than the earlier round:** **mixed.**
- Yes on the laptop: the swaps work, the roll runs down the page, Instagram is larger, the beach is sea-glass, LCP is 1.36 s.
- **No on the phone** until the staff overlap is fixed. Phone motion is unchanged: the shutter is off on the phone, as planned.

**Fixes left:**
1. **Phone staff section:** turn off the sticky facts under 1000 px (`position: static`, or the facts as a row above the quotes). Then confirm with the inspector that covered-text clears for "What guests say about the staff" and for "0.7–1.1m" (the Rosa headline, also 100 % covered at one stop).
2. **Phone first screen:** paint the first two rows of the roll as blurred placeholders (as calm and interactive now do), so 0.5 s shows the camera roll, not empty paper.
3. **Fonts on a slow phone** (as calm). Nanum Pen titles and Switzer never appear on the 1.6 Mbps profile.

---

## Final table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6 (fail) | **7 (fail)** | yes: trio first screen with placeholders, LCP 3.10 → 1.97 s, a phone sticky band, " \| " amenities, inspector 0 FAIL |
| interactive | 7 (fail) | **8 (pass)** | yes: frame painted at 0.5 s, LCP 3.58 → 1.92 s, slivers gone, pauses off-screen, stops after a tap |
| unique | 8 (pass) | **7 (fail)** | mixed: the laptop is better (swaps fire, roll bands, LCP 1.36 s), but the phone now overlaps the staff facts onto the quotes |

**Experience ranking, r2:** 1. interactive (8) · 2. unique (7, one bug away from 8+) · 3. calm (7).

**Fixes left for anything under 8:**
- **unique:** (1) the staff sticky column overlaps the quotes on the phone; make it static under 1000 px. (2) Blur placeholders for the phone roll. (3) Get the fonts in before the 4 s gate.
- **calm:** (1) get the fonts in before the 4 s gate. (2) A dorm/private choice in the sheet. (3) One moment of pull on the phone's first screen (uncrop the trio, or bring Mia's line up).
- **All three:** the font gate. On the target phone profile, every handwritten title falls back to Arial for the whole visit. This was introduced by self-hosting in this round; r1's CDN faces arrived in time.
