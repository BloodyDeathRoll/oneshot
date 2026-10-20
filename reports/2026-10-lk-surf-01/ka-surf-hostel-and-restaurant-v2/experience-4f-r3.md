# KA Surf Hostel v2 — experience-critic, station 4f, designer round 3 (last)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · same method and calibration as `experience-4f.md` (r1) and `experience-4f-r2.md` (r2). Written without reading the other critics' reports.

## How it was walked

- **Served over http** (`127.0.0.1:8851–8853`), with fonts self-hosted (0 font-CDN requests).
- **Phone:** 390×844, touch, CDP 1.6 Mbps / 150 ms RTT, CPU ×4. The three phone walks ran **one at a time**.
  - Cold-load frames at 0.5 / 1.5 / 3 s.
  - A human-pace scroll with a frame at every stop, plus rAF frame times and LCP/CLS.
  - A tap on the foot-bar "Check dates", with frames at 80–600 ms; Esc and focus return checked. No personal data; no external page opened.
- **Laptop:** 1440×900. The same walk, plus hover and a click.
- **Phone, reduced motion** and **phone, JavaScript off.**
- **Probes** (`probe-r3.json`):
  - interactive: the story;
  - unique: the idle swaps and the viewer on the laptop; staff overlap and the viewer on the phone;
  - calm: the phone sticky band;
  - press feedback.
- **Throttled font crop:** the first h2 on each page, cropped on the throttled phone.
- **Text-on-text scan:** the whole unique phone page, every 200 px.
- **Inspector:** tasteskill `inspect.mjs` at 1440 + 390.
- **Evidence:** `reports/2026-10-lk-surf-01/experience/ka-surf-hostel-and-restaurant-v2/r3-<variant>/walk.json` and `probe-r3.json`. All frames and screenshots were deleted.
- **Not seen:** Rosa and the map were blocked off-origin; their fallbacks rendered.
- **Comparison:** KA has no website. The comparison is the earlier rounds of this report and the gold Canopy page.

## Measured

| page | phone bytes, first load | phone LCP (throttled) | CLS | phone scroll frames >34 ms | laptop scroll frames >34 ms | brand fonts on the throttled phone | inspector |
|---|---|---|---|---|---|---|---|
| calm r3 | 663 KB | 1.96 s | 0.0001 | 0 / max 17 ms | 0 | **yes** (Kalam titles) | **0 FAIL**, 4 WARN |
| interactive r3 | 788 KB | 1.86 s | 0 | 0 / max 17 ms | 0 | **yes** (Caveat titles) | 1 FAIL (focal-point, a calibration conflict), 4 WARN incl. one text block under 13 px |
| unique r3 | 840 KB | **1.24 s** | 0 | 0 / max 17 ms | 0 | **yes** (Nanum Pen titles) | 2 FAIL (focal-point; covered-text at 390, which is the fixed booking bar crossing headings at single scroll stops — see below), 5 WARN incl. off-centre 40/8 px at 1440 |

- **All three:** 0 third-party requests on load. No hidden text or broken images with reduced motion or JavaScript off. A modal `<dialog>` sheet with focus inside; Esc closes it and focus returns. Press `scale(.97)` measured on the calm and unique foot bars (CSS on interactive). Hover darkening over 160 ms. 0 long frames in the sheet, the story, the viewer and the swaps.
- **The r2 font regression is fixed.** On the 1.6 Mbps profile, all three pages now draw their handwritten section titles. The cropped h2 shows Kalam, Caveat and Nanum Pen Script, where r2 showed an Arial-like fallback.

---

## calm r3 — "Patio"

**Timeline (phone):** at 0.5 s, two overlapping prints (cottages and private room) already composed in the mint, as blur placeholders, under the title, the white-on-papaya button and the proof line. Sharp by 1.5–3 s. The room print now stays inside the gutter.

**The walk:**
- Rooms: slideshow and " | " bed lines.
- Kabalana with its photo pair.
- Breakfast.
- **"What guests say about the staff" is now its own full-width band:** the long-table night photograph large, Mia's dengue quote at display size, the other words below. It is the page's second moment, and the first thing on calm that makes you want to be there.
- Amenities in " | " lines, Instagram, getting here, a one-screen footer.
- The phone sticky band holds each print while the text panel slides over it (`img-004` at top 93 px from scroll 1000 to 2200), with 0 long frames.

**Booking:** the sheet now offers **"A dorm bed / A private room"** with thumbnails before the three OTAs. 2–3 taps.

**Score: 8/10. Pass (r1 6 · r2 7).** Calm and readable, with two real moments (hero and staff band), the brand faces on the target phone, and a booking sheet with a choice.

**Better than the earlier rounds:** yes. The fonts land, the staff band is new, and the sheet has a choice.

---

## interactive r3 — "Stories"

**Timeline (phone):**
- At 0.5 s the story frame is painted, as a blur placeholder and then `img-006`.
- The balanced headline "Five minutes from / Kabalana Beach" sits above it.
- No slivers.
- LCP 1.86 s.

**Story (probe):**
- It advances after 4 s.
- It pauses off-screen (it held for 4.5 s at scroll 3000).
- A tap advances it in a 300 ms crossfade, and autoplay then stops.
- A chapter tap ("The beach") restarts the story on `img-020`.
- 0 long frames.

**The walk:**
- "The beach" now follows the rooms.
- The breakfast plate is large, with the reel cover beside it.
- The map box is the static OSM map.
- **The amenities are still three long columns of single rows**, the one stretch where attention drops.

**Booking:** unchanged and still the best of the set: dorm or private, then the bed list, then the OTA. 2–3 taps.

**Score: 8/10. Pass (r1 7 · r2 8).** The fonts now land on the phone. The mechanic and the booking were already right.

**Better than the earlier rounds:** yes. Fonts on the phone, playbook order, and a bigger breakfast moment.

---

## unique r3 — "The roll"

**Timeline (phone):**
- 0.5 s: wordmark, h1 (36 px), tagline, button, proof line, and **the roll's frames as placeholder tiles**. No more empty paper.
- 1.5 s: the garden, room, bathroom and plate frames are sharp.
- LCP **1.24 s**, the fastest of all nine pages scored on this business.

**The walk:**
- Rooms, then the beach on sea-glass, staff, breakfast, amenities (" | " groups), Instagram, getting here, and the footer of tiles.
- The strips vary now (three large night frames over the staff, a pair of bathrooms over the amenities).
- **The r2 phone bug is fixed.** The staff facts are no longer sticky at 390, and the full-page text-on-text scan found **0 overlaps**.
- The inspector's remaining covered-text items ("The beach", "What guests say…", "Breakfast") are the fixed booking bar crossing each heading at a single scroll stop. The page is padded by the bar, and every heading is readable a moment later. This is the same accepted conflict as calm's.

**Laptop:**
- The strongest first screen of the business: every picture on the first screen once, the name cell in the middle.
- The idle swaps fire (3 crossfading overlays in 12 s; 0 long frames).
- The frame-to-viewer grow opens, and Esc closes it.

**Booking:** 2 taps through the sheet, plus the viewer's own "Check dates".

**Score: 8/10. Pass (r1 8 · r2 7).** It is back where r1 left it, and now with working swaps, fonts on the phone, placeholders and the fastest LCP of the set.

**Better than the earlier rounds:** yes. The r2 overlap is gone and the r1 dead swaps work.

---

## Final table

| variant | r1 | r2 | r3 |
|---|---|---|---|
| calm | 6 (fail) | 7 (fail) | **8 (pass)** |
| interactive | 7 (fail) | 8 (pass) | **8 (pass)** |
| unique | 8 (pass) | 7 (fail) | **8 (pass)** |

**Experience ranking, r3:**
1. **unique**: the best first screen, the frame-to-viewer grow, the fastest load.
2. **interactive**: the most engaging phone mechanic and the best booking choice.
3. **calm**: quiet and correct, now with two real moments.

**Left under 8:** nothing. All three pass the experience bar.

**Optional polish** (not blocking):
- **interactive:** compress the amenities to " | " lines, as calm and unique do.
- **unique:** fix the 1440 margins (40 px left vs 8 px right, inspector off-centre).
- **interactive and unique:** one text block under 13 px each (inspector small-text).
