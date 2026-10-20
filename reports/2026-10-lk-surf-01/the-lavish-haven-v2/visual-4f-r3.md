# The Lavish Haven v2 — visual-critic 4f, round 3 (last)

Run `2026-10-lk-surf-01` · visual-critic 0.1.2 · 2026-10-20 · quick mode, round 3 (designer notes rounds 8–9).

**Method and calibration** are the same as rounds 1 and 2 (`visual-4f.md`, `visual-4f-r2.md`). Shot with `tools/shoot.mjs` over `http://localhost` (fonts loaded, 0 console errors) into a private scratch folder, deleted after scoring. The tasteskill inspector was re-run over http.

The comparison is unchanged: no business site exists, so "current site" means the Booking.com listing on a phone, with the gold Lavish Haven method and the Global Surf gold as the bar.

| Page | inspector r3 |
|---|---|
| calm | 1 FAIL (covered-text @768/390: sticky header and bar over "Staying longer" and the Kabalana figure). WARN size-count 13, side-scroll (slideshow), lopsided "Your dates" (886 px empty), empty-middle beside "New, and it shows", no-footage |
| interactive | 2 FAIL (off-centre @1440: the split stage; covered-text @390: the phone bar over "Your dates"). WARN size-count 15, still-page, no-footage |
| unique | 1 FAIL (covered-text: the tag's back face and the closing curtain, by design). WARN Kabalana statement 4 lines, card-rows ×3, size-count 17, side-scroll, empty-middle, still-page, no-footage |

---

## calm — r3: 7 / 10

**Three-second test.** Unchanged from r2 at both widths: the noon-pool print, the blind print, the Pinyon name, the button and the dated ratings. It reads as calm and light (`desktop-00`, `mobile-00`).

**What changed, as seen**
- The rooms section closes up: two prints run the height of the list (`desktop-03/04`), so the r2 hole is gone.
- A second large photo (the noon pool and garden at about 1024 px) sits after "Staying longer" (`desktop-09`).
- The pool cluster is four prints at about 230 px each, two by two and offset (`desktop-06/07`).
- The type scale is tighter (13 sizes).

**Still wrong**
- **The photography repeats.** Balcony-over-pool frames appear four times: two in the rooms column (`desktop-04`, one with the ashtray), two in the pool cluster (`desktop-06/07`). The noon pool appears in the hero and again at full size (`desktop-09`). The page now has more pictures but not more variety, so it reads like a contact sheet of the same balcony.
- The pool cluster (`desktop-06/07`) turns into a two-screen scatter of mid-size prints with a kitchen in it. It is busy rather than composed, and the heading floats alone above it.
- "Your dates" leaves 886 px empty on the left at 1440 (`desktop-13`, inspector lopsided). The "New, and it shows" text is far from its photo (empty-middle).
- At 15 desktop screens it is the longest of the three. The amenities and quotes are still long text runs.

**Verdict.** It holds at 7: tidier and fuller than r2, but not more beautiful. **Fail (below 8).**

**What is left**
1. One photo, one job. Drop the duplicate balcony frames (keep one in the rooms column, none in the cluster) and use the unused interiors (`img-007`, `img-024` bedrooms, `img-045` door to balcony) so each section shows something new.
2. Cut the pool cluster to two prints beside the heading, one screen tall.
3. Close the "Your dates" void: centre the closing block with the night print beside it at equal width, or put the print above it.

---

## interactive — r3: 7 / 10 (closest to the bar)

**Three-second test.** 1440 (`desktop-00`): the aqua column, the Bodoni name, the burnt-orange button and the ratings, beside a full-height photo of the pool and garden from an upper floor. No table, no ashtray, palms and red-tiled roofs. This is the first time this variant's opening feels like a holiday. 390 (`mobile-00`): the same photo at 60 % height, then the name and button. Good.

**What changed, as seen**
- The hero is clean (`img-079`) and the fixed half fills its column again (`desktop-00..08`). Every section shows a different photo: bedroom, night pool, bamboo blind, noon pool, balcony door.
- Statements are in Hanken (`desktop-02`, `desktop-04`). On the phone a photo breaks the lists every couple of screens (`mobile-05`, `mobile-07`, `mobile-11`), and amenities are cut to eight plus "All 25".

**Still wrong**
- The hero and Kabalana photos are two near-identical noon-pool-from-above frames (`desktop-00`, `desktop-06/07`), so the stage comes back to where it started.
- The fixed half is soft at 1.17× (visible in the palms on `desktop-00`), acceptable but not crisp.
- The left column stays a single text column for the whole page. On the phone, `mobile-02/03` (twelve rooms) and `mobile-08/09` (five quotes) are four screens of text. The page never changes pace (inspector still-page).
- The closing at 1440 (`desktop-08`) is a wide pale band with small buttons and a large wordmark, flatter than the rest.

**Verdict.** The most improved, and the variant nearest 8. It is clean, specific and easy to book, but still pleasant rather than beautiful, with one idea carried at one pace. **Fail (below 8).**

**What is left**
1. Give Kabalana a different photo (the balcony `img-077` or the night pool from the low angle, `img-001`) so the hero frame is the only noon pool.
2. Change pace once: one full-width band across both halves (for example the night pool at native width with `featureLine` over the aqua) between "Pool, restaurant, spa" and "Staying longer".
3. On the phone, show five room rows and five quotes, each behind a "show all" toggle, so no stretch of text runs past two screens.

---

## unique — r3: 7 / 10

**Three-second test.** 1440 (`desktop-00`): the night pool large beside the door-hanger card, still the best desktop first screen of the round. 390 (`mobile-00`): **fixed**. The night pool is now clear and whole, and the hanger hangs from its lower edge with the hole below the water. A good phone opening.

**What changed, as seen**
- The room tags are three per row with readable names (`desktop-01/02`), grouped by view.
- Large photos mid-page: noon pool at about 1024 px (`desktop-04`), the balcony over pool and garden (`desktop-07`), the garden pool (`desktop-09`), the noon pool again before Kabalana (`desktop-10`).
- Quotes run in four columns (`desktop-08`).

**Still wrong**
- **The same pool-from-above view appears three times** (`desktop-04/05`, `desktop-09`, `desktop-10`), plus once more in the pool section on the phone (`mobile-05`, `mobile-10`). The extra pictures are the same picture.
- The room tags are still three rows of identical pastel boxes (inspector card-rows) taking about 1.5 screens (`desktop-01/02`). They read more like a pricing grid than door tags.
- Big empty areas: right of the slideshow (`desktop-03/04`, the button floating top right with nothing under it), and the left half of the "Staying longer" screen (`desktop-07`).
- 17 font sizes. The Kabalana statement runs 4 lines.

**Verdict.** Its two first screens are now at the bar, and the concept reads. But the middle of the page leans on one repeated photo and a grid of boxes, so the whole page stays at 7. **Fail (below 8).**

**What is left**
1. Use each photo once. Keep `img-078` at full size once (Pool section). Use `img-069` (balcony) for "Staying longer" and the night pool low angle `img-001` for Kabalana.
2. Make the room tags look like tags, not boxes: give each the hanger silhouette at small size (the same SVG mask as the hero), or set the twelve names as a plain grouped list beside one balcony print.
3. Fill the empty half beside the slideshow (put the "New, and it shows" text next to the photo, not a screen below), and cut the type scale to five sizes.

---

## Table

| variant | r1 | r2 | r3 |
|---|---|---|---|
| calm | 6 (fail) | 7 (fail) | 7 (fail) |
| interactive | 7 (fail) | 7 (fail) | 7 (fail, closest to 8) |
| unique | 6 (fail) | 7 (fail) | 7 (fail) |

All three are better than the Booking.com listing at both widths (first screen and whole page). Each round fixed what was flagged. Round 3 cleared the ashtray, the phone hero and the rooms hole. But the fixes added more of the same few photographs rather than new ones, so the score didn't move.

**Visual ranking (r3):** 1. interactive: a clean, specific opening and a different photo per section, but one pace all page long. 2. unique: the best two first screens, but the noon pool appears three times and the room tags read as boxes. 3. calm: tidy, but four balcony frames and a busy cluster.

**Round 3 was the designer's last round. Under the rubric none of the three passes the 8 / 10 visual bar,** so this goes back to the coordinator and Shahar rather than forward to the pick as a pass.

The material explains a lot of the ceiling: 79 photographs at 1024 × 768, about sixty of them near-identical beds and bathrooms, no video. That is the pitch point already in `concepts.md` §2. A 15-second pool and balcony clip, or a dozen photographs at 1920 px or more, would likely do more for the score than another layout round.
