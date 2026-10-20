# Layday Surf Ahangama v2 — experience-critic, station 4f, round 2

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20.

The designer's round-2 builds were walked with the same method, calibration and comparison basis as round 1. That basis is no business website (`existing_site.url` null), so the comparison is with the OTA listings and the gold page.

The other critics' round-2 reports were not read. The designers' round-2 look-logs were read only to know what changed.

## How it was walked

- **Serving:** over http (`127.0.0.1`). Each phone walk ran **one at a time**, so the frame counts below are more reliable than round 1's parallel runs.
- **Phone:** 390×844, touch, 1.6 Mbps / 150 ms, CPU ×4. Cold-load frames at 0.5 / 1.5 / 3 s, a human-pace scroll with a frame at each stop, and a rAF frame recorder with CLS throughout.
- **Booking on the phone:**
  - Tap the foot-bar "Check dates" and take frames at 80 / 160 / 300 / 600 ms.
  - Enter an arrival date and check that the Booking.com link carries it.
  - Press Esc, then check scroll position and focus.
- **Reduced motion and JavaScript off:** both on the phone.
- **Laptop:** 1440×900, with load frames, the scroll walk, hover timing and booking-open frames.
- **Inspector:** tasteskill `inspect.mjs` at 1440 and 390.
- **Records:** the `walk.json` files are kept under `reports/2026-10-lk-surf-01/experience/layday-surf-ahangama-v2/r2-<variant>/`. All frames were deleted.

## Measured

| | phone first-load | LCP (throttled) | CLS load / after scroll | phone frames >34 ms (max) | laptop frames >34 ms | phone x-overflow | inspector |
|---|---|---|---|---|---|---|---|
| calm r2 | 189 KB | 1.42 s | 0 / 0 | 3 (67 ms) | 0 | 0 | 1 FAIL (covered-text under the foot bar), 4 WARN |
| interactive r2 | 110 KB | 1.31 s | 0 / 0 | 6 (100 ms) | 1 (50 ms) | 0 | 1 FAIL (covered-text "The room"), 5 WARN incl. long-pin, name-only-title |
| unique r2 | 204 KB | 1.30 s (was 2.40) | 0 / 0 | 4 (117 ms) | 0 | 0 | 1 FAIL (covered-text "A two-minute walk…" 25 %), 3 WARN incl. name-only-title |

**Booking path, all three variants:**
- Tapping the foot-bar "Check dates" opens a bottom sheet in place. The page does not scroll behind it, Esc closes it, and focus returns to "Check dates" (verified with scroll at 1200 → 1200 → 1200).
- Choosing 1 Dec 2026 updated "Leaving Friday 4 December" and rewrote the Booking.com link to `?checkin=2026-12-01&checkout=2026-12-04…`.
- Taps to an OTA: 2, or 3 with a date.

**Reduced motion and JS off:**
- All three pages: no hidden content, no broken images.
- Unique's 4 "hidden" nodes under reduced motion are the closed booking sheet's own text, which is correct.

## calm r2 — "Samples"

**What changed, as walked:**
- **Phone first screen:** h1, tagline, dated 10/10, a teak "Check dates" plus "Call", then the berth photograph large (4:5). The photo is already painted at 0.5 s; the blank swatches are gone.
- **Booking:** a bottom sheet that rises from the foot (frames 80 → 160 ms) replaces the 8,000 px scroll. Booking.com is the one teak primary, and Hostelworld and Agoda are secondary. This is clear.
- **Below the fold:** "The wave" comes before Guests. Ratings are three large figures, the amenities are one compact " | " list, and the medallion and inline photo chips are gone.
- **Motion:** sheet 320 ms, press `scale(.97)`, hover darkens over 160 ms (`rgb(117,66,27)` → `rgb(92,51,20)`). Laptop: 0 long frames.

**What still holds it back:**
- **Fonts on a slow first visit.** The faces are `font-display: optional`. On the throttled phone walk, Pilcrow and Caveat missed the block window, so the whole visit rendered in fallbacks: Arial-like headings, and the Caveat section titles ("The room", "Practicalities", "Check dates") fell back to a serif. The script voice that custom.md asks for is lost exactly for the target visitor. The laptop and fast-network runs show Caveat correctly.
- **A quiet page.** Below the fold, the laptop "Just one dorm" section is two edges with 2,051 px of nothing between (inspector empty-middle). There is a 512 px blank gap near the foot. The footer is still a wordmark of material tiles.

**Score: 7/10. Fail.** Fine and now easy to book, but still forgettable; nothing on the page makes you want to be there more than the photographs alone do.

**Better than round 1:** yes, clearly (6 → 7). Better than the earlier round: yes.

**Top fixes left:**
1. Section-title font: Caveat should use `font-display: swap` with a metric-matched cursive fallback, or be preloaded early enough to win the window. The first slow visit must show the script titles, not a serif.
2. Give the page one moment of pull: the room gallery or the wave pair at full column width, with the crossfade the concept promised, rather than small prints beside text.
3. Fill or close the empty middle of "Just one dorm" on the laptop and the 512 px gap near the foot.
4. Pad the page bottom by the foot bar's height (covered-text: "Newly built…", "5.0/5" at 390).
5. Replace the native `mm/dd/yyyy` field with a styled date pill (the floating-label style the references ask for).

## interactive r2 — "One room"

**What changed, as walked:**
- **First screen:** the phone hero portrait now runs the full width between the margins.
- **The pinned run:** three views (lit plaster → pillow → berth yellow) over two screens. In the last quarter the title, sentence and button fade out, so the release shows only the last portrait leaving, with nothing repeated on white. That was round 1's main deflation, and it is gone.
- **Below the fold, each section has its own composition:**
  - "The place" in two columns.
  - "The room": seven 4:5 photographs edge to edge with dots, plus one booking card.
  - "Newly built": three material photographs edge to edge.
  - Guests on the berth-yellow field, with Beth large beside the three ratings.
  - Practicalities as a compact list.
- **Rosa:** the headline now reads live ("0.9–1.3 m chest-high … Now: Tuesday 20 October at 14:30"), next to Rosa's own widget.
- **Fonts:** self-hosted (42 KB). The script titles render on the slow phone walk.
- **Booking:** the sheet slides up from the foot bar (320 ms drawer curve), and its listing buttons stagger in (at 80 ms the first is still pale; settled by 160 ms). The date carries to Booking.com, and Esc returns focus.

**Motion and feel:**
- The motion is the story: the walk down the one room. Every animation stays on transform and opacity.
- Laptop: 1 frame over 34 ms (50 ms). Phone ×4 CPU: 6 frames, worst 100 ms, all in the pinned run.

**What is left:**
- All three OTA buttons in the sheet are equally raspberry. Calm r2 shows the better pattern: one primary, two secondary.
- The native date field.
- "The room" title passes under the foot bar at 390 (inspector).
- The inspector's long-pin WARN at 1440 (3 screens).

**Score: 9/10. Pass.** Engaging from the first scroll, clearly better than anything Layday has online, and booking feels like part of the site.

**Better than round 1:** yes (8 → 9). Better than the earlier round: yes, clearly.

## unique r2 — "Name in plaster"

**What changed, as walked:**
- **Type:** everything people read is now General Sans at 17–19 px. Round 1's thin-serif reading problem is gone, and Boska stays for the name, the titles and the phone number.
- **LCP:** 2.40 s → 1.30 s.
- **Booking on the phone:** "Check dates" raises the business's yellow field as a bottom sheet. The sheet is the plaster colour, with italic Boska "Check dates" and raspberry buttons. It is the best continuity moment in the round: the booking happens inside the hostel's own colour.
- **Guests:** the dense yellow wall became three ratings, Beth's line large, and a swipeable row of quotes with dots.
- **Footer:** the giant footer name is gone.
- **Laptop:** the three-print band plus the monument name is still the strongest first screen of the round.
- **Motion:** the name fades as the hero leaves. The sheet opens over 340 ms and the field opens in place on the laptop. The phone number lifts character by character on hover. The laptop runs with 0 long frames.

**What is left:**
- The phone first screen is the photo, then "Layday" and a two-line sentence. The plain "what + where" is there but small (inspector name-only-title), and the italic "A two-minute walk from Kabalana" sits 25 % under the foot bar on the first screen.
- The sheet's three OTA buttons are equal, and the date field is native.

**Score: 8/10. Pass.** Readable now, with an idea you feel on the phone (booking in the plaster).

**Better than round 1:** yes (7 → 8). Better than the earlier round, including the gold "Inside": yes. It is now photo-led, readable, and gives the gold page's booking idea a smooth, real micro-interaction.

## Ranking (experience, 4f round 2)

1. interactive (9)
2. unique (8)
3. calm (7)

## Table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6 | **7 (fail)** | yes: photo-led first screen, sheet booking with one primary, press and hover feedback. Earlier r3 calm had no photo, no motion, no hover |
| interactive | 8 | **9 (pass)** | yes, clearly: pinned room run and slide-up sheet vs r3's static ink-line "Curtain" |
| unique | 7 | **8 (pass)** | yes: photo-led, readable, booking inside the yellow field vs gold "Inside"'s drawn box, violet and hairlines |
