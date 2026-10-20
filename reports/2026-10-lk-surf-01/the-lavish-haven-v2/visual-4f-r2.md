# The Lavish Haven v2 — visual-critic 4f, round 2

Run `2026-10-lk-surf-01` · visual-critic 0.1.2 · 2026-10-20 · quick mode, round 2 (designer notes rounds 6–7).

**Method and calibration** are the same as round 1 (`visual-4f.md`). Shot with `tools/shoot.mjs` over `http://localhost` (all fonts loaded, 0 console errors) into a private scratch folder, deleted after scoring. Frame names below refer to that set. Also checked with the tasteskill inspector over http at 1440/768/390.

The comparison is unchanged: the hotel has no site, so "current site" means its Booking.com listing on a phone, with the gold Lavish Haven method and the Global Surf gold as the bar.

| Page | inspector r1 | inspector r2 |
|---|---|---|
| calm | 1 FAIL, 5 WARN | 1 FAIL (covered-text @768/390: sticky bar over "New, and it shows"), WARN size-count 16, side-scroll, empty-middle 1805 px, ragged-edges (9 left lines), no-footage |
| interactive | 1 FAIL, 5 WARN | 2 FAIL (off-centre: the split stage; covered-text @768/390: sticky bar), WARN size-count 15, still-page, no-footage |
| unique | 2 FAIL, 7 WARN | 1 FAIL (covered-text: the tag's back face and the closing curtain), WARN statement 4 lines (Kabalana), card-rows ×3, size-count 17, side-scroll, empty-middle, still-page, no-footage |

---

## calm — r2: 7 / 10 (r1: 6)

**Three-second test.** 1440 (`desktop-00`): unchanged in kind. The noon-pool print, the blind print, the Pinyon name and the button, now with the ratings and their date under it. Clean and light. 390 (`mobile-00`): the pool print at full width with the blind square overlapping its corner. That is better, and the phone screen now has one button.

**What changed, as seen**
- **The page has a big moment.** "After dark" (`desktop-02`, `mobile-02`): the night pool at its full 1024 px with "A year-round outdoor pool, at the centre of the hotel." beside it in script and lead text. It is the first time this variant makes you stop.
- **Rooms take one screen** (`desktop-03`): a grouped two-column list, with the 4:5 balcony print sitting in the tan field from the first frame. The empty tan block from round 1 is gone.
- **The pool cluster** (`desktop-06`) has four prints of about 360 px around the centred title, which no longer collides with them.

**Still wrong**
- `desktop-04` (the bottom of the rooms section): the **left half is empty for most of a screen**. The balcony print leaves only a dark sliver at the top while the offer text and button sit on the right. Inspector `empty-middle` (1805 px) and `ragged-edges` (text starting at 9 different left lines).
- The middle of the page is a long run of text on white: amenities (`desktop-07`), quotes (`desktop-08`), practicalities (`desktop-10`). The prints are still small apart from "After dark".
- 16 font sizes.

**Verdict.** Clearly better than round 1 and than the Booking listing. Competent, calm and honest about the 1024 px photos, but not yet beautiful. Below the gold page and still below the bar. **Fail (below 8).**

**Top fixes left**
1. Close the hole under the rooms section (`desktop-04`). Let the balcony print run the full height of the list and offer text, or move the offer text under the list on the left so the two columns end together.
2. Repeat the "After dark" scale once more lower down: one print at native size in "Staying longer" or "Kabalana" (the noon pool `img-079` or the balcony `img-069`) to break the run of text.
3. Put the text on one grid: three or four left edges, not nine, and five font sizes.

---

## interactive — r2: 7 / 10 (r1: 7)

**Three-second test.** 1440 (`desktop-00`): the aqua column, the Bodoni name, the burnt-orange button and both ratings. The fixed half is now a framed 553 × 768 print with aqua around it. It is sharp (1.0× native) but no longer immersive: a picture on a wall rather than the view from the room. 390 (`mobile-00`): the balcony over the pool, then the name and button. Good.

**What changed, as seen**
- **The stage changes with every section** (`desktop-00..08`): balcony → pool through palms → bedroom → night pool → bamboo blind → noon pool → balcony door. No frame repeats back to back. This was round 1's biggest fault, and it is fixed.
- Statements are in Hanken and titles only in Bodoni (`desktop-02`, `desktop-06`). The chips wrap on the phone, and the list opens on "Pool" (5 rows), so a tap visibly does something.
- The footer name fits at 390 (`mobile-12`).

**Still wrong**
- **The hero print still has a glass ashtray on the table** (`desktop-00`, lower right of the print; `mobile-00`). `img-069` has it too, so the swap didn't remove it.
- At 1440 the framed fixed half floats with aqua margins (`desktop-00`, `desktop-04`). Combined with the off-centre split it looks a little unresolved: neither full-height nor composed.
- The left column is still mostly lists: twelve rooms (`desktop-01`), 26 amenities (`desktop-04`), quotes. On the phone (`mobile-02..07`) it is about six screens of small text with two photos.
- No motion beyond the crossfade (`still-page`).

**Verdict.** Better made than round 1 (sharp, varied, typographically cleaner), but no more beautiful. It reads as a well-organised, pleasant page rather than a portfolio piece. Better than the Booking listing. **Fail (below 8).**

**Top fixes left**
1. Lead with a photo that has nothing on the table. Crop `img-069` to exclude the ashtray (keep the rail and pool), or use `img-079`.
2. Make the stage a stage: let the print fill the half from top to bottom at up to 1.2× (or crop it 4:5 to 553 × 691 and centre it vertically with equal aqua) so it reads as intentional. Then resolve the header's right edge against it.
3. Break the list walls with pictures. On the phone, put one inline photo every two screens (the night pool before "Pool, restaurant, spa", the blind before "Staying longer"). On desktop, collapse amenities to eight with "All 25", as on phone.

---

## unique — r2: 7 / 10 (r1: 6)

**Three-second test.** 1440 (`desktop-00`): the night pool large on the left, and on the right a real door hanger (round head, punched hole, slot, shoulders) carrying the name in EB Garamond italic, the ratings with their date, and two buttons. **The best first screen of the round, and the idea now lands.** You see a hotel at night and the card on your door. 390 (`mobile-00`): the night pool first, then the hanger's head rising over its lower half. The water shows through the punched hole, a nice touch. **But the white head covers the middle of the best photo:** the lit pool reflections are hidden behind it.

**What changed, as seen**
- The tag reads as a tag. No stroke hook. The front and back are the same height (the flip was checked in round 1; the notes say it is height-stable now).
- **Rooms take one screen** (`desktop-01/02`): small tags grouped by view (pool / garden / no view) in deeper tones, with roman names. The 3-screen pinned carousel is gone.
- Bigger pictures mid-page: the bedroom slideshow (`desktop-03`) and the noon pool at about 455 px (`desktop-04`).

**Still wrong**
- **The room tags' text is tiny** at 1440 (`desktop-01/02`: names and bed lines at about 11–12 px inside the cards). The inspector reads three rows of identical boxed cards (`card-rows`).
- The phone hero: the hanger's head sits over the centre of `img-002` (`mobile-00`), so the strongest photo is half covered on the screen most visitors see first.
- The middle of the page is flat: a two-column amenity list (`desktop-05`), small quote text (`desktop-06`), and a near-empty Kabalana screen with one small blind print (`desktop-08`).
- 17 font sizes. The Kabalana statement runs 4 lines.

**Verdict.** A real step up: the concept now works and the desktop first screen is near the bar. The phone hero and the mid-page keep it at 7. Better than the Booking listing at both widths now. **Fail (below 8).**

**Top fixes left**
1. Phone hero: hang the tag from the photo's bottom edge (head overlapping the last 15–20 %, hole over the water) so the lit building and the pool stay visible.
2. Room tags: at least 15–16 px for names and 14 px for bed lines, and fewer, larger tags per row (3 at 1440), so they read as objects rather than a pricing grid.
3. Give Kabalana and "Staying longer" a large print each (the noon pool `img-079`, the balcony `img-071`) at native size instead of the small blind strip and the empty screen.

---

## Table

| variant | r1 | r2 | better than earlier round |
|---|---|---|---|
| calm | 6 / 10 (fail) | 7 / 10 (fail) | **yes**: the night pool now has its own full-size section, the rooms fit one screen, the empty tan block is gone. A layout hole remains under the rooms. |
| interactive | 7 / 10 (fail) | 7 / 10 (fail) | **yes, in finish, not in score**: sharp 1.0× fixed half, a new photo per section, clean type, wrapped chips, fixed footer. But the ashtray is still in the hero and the framed half looks less immersive. |
| unique | 6 / 10 (fail) | 7 / 10 (fail) | **yes**: the tag is now a recognisable door hanger, and the night pool leads on the phone too. The pinned carousel is replaced by one screen of grouped tags. |

**Visual ranking (r2):** 1. unique: the best first screen of the round and an idea that now reads, held back by tiny tag text and the hanger covering the photo on phones. 2. interactive: the most usable, sharp and varied, but pleasant rather than beautiful, with the ashtray still in the hero. 3. calm: honest and clean with one strong "After dark" moment, but a hole under the rooms and long text runs.

**All three are still below 8 and fail the gate.** The rubric allows a 3rd designer round; the top three fixes per variant are above.
