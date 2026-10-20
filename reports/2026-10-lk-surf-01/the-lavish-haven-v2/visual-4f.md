# The Lavish Haven v2 — visual-critic 4f (quick)

Run `2026-10-lk-surf-01` · visual-critic 0.1.2 · 2026-10-20 · mode quick, round 1.
Pages: `sites/the-lavish-haven-v2/mockups/{calm,interactive,unique}/dist/index.html`. For comparison only: the earlier round `sites/the-lavish-haven/mockups/{calm,interactive,unique}` (Astro, built here with `tools/build-mockup.mjs`; the tracked `content.json`/`weight.json` it rewrote were restored).

## How it was looked at

- **Shots.** `tools/shoot.mjs` at 1440 and 390 for all six pages. **The shared `shots/` sets were taken over `file://`, and Chromium blocks the self-hosted woff2 fonts there** (CORS errors in each `shoot.json`: Pinyon Script, Bodoni Moda, EB Garamond, Instrument Serif, Fraunces, Bricolage). Those sheets show fallback faces, so every typography judgement here comes from a second set shot over `http://localhost` (`tools/_serve.mjs`, no console errors), held in the session scratchpad and deleted after scoring. Frame names below (`desktop-00` …) refer to that http set.
- **The current site.** There isn't one (`existing_site.url: null`). The comparison is the hotel's Booking.com listing on a phone (`concepts.md` §2: app banner, cookie dialog over the night-pool photo, no phone number), plus the gold page method (`gold/the-lavish-haven-notes.md`) and the Global Surf gold bar.
- **Media.** No video exists (`dossier.videos` absent). 78 of 79 photos are 1024 × 768, so a full-bleed photograph is ruled out. That makes the video and ≥ 1920 px hard fails not applicable.
- **Design-skill evidence.** tasteskill inspector (`inspect.mjs`, 1440/768/390) on all six. `/impeccable` detector (`impeccable detect --json`) on all six dist files. The full `/impeccable critique` protocol (two sub-agents, a question at the end) didn't fit a headless critic station, so only its detector and its vocabulary were used (degraded, single context). Motion: a Playwright walk for chip filtering, the tag flip, the 8 s blind crossfade, and reduced motion at 390, done in place of the `/design-motion-principles` HTML audit (`/emil-design-eng` vocabulary used for feedback and timing).

| Page | tasteskill inspector | impeccable detect |
|---|---|---|
| v2 calm | 1 FAIL (covered-text), 5 WARN | 1 (buried-raster) |
| v2 interactive | 1 FAIL (off-centre), 5 WARN | 11 (tight-leading 5, buried-raster 5, cramped-padding 1) |
| v2 unique | 2 FAIL (edge-text, covered-text), 7 WARN | 15 (italic-serif-display 10, tight-leading 4, cramped-padding 1) |
| earlier calm | 7 FAIL (eyebrow ×7, micro-label ×16, gradient, 46 hairlines, small text, still page, covered text) | 20 (cream, overused font, low contrast …) |
| earlier interactive | 12 FAIL (3-line headline, eyebrows, 01–06 numbering, 12 outlined boxes, 33 hairlines, 17 text blocks < 13 px, 1728 px blank gap at 390) | 27 |
| earlier unique | 12 FAIL (no visible h1, title not painted at 1.2 s, 3-line caps wordmark, numbering, 48 hairlines, covered text) | 67 (27 low-contrast) |

Motion (Playwright): calm runs `blind` (crossfade of the small print) and `drift` (7 prints, scroll-timeline). Interactive's chips filter the list and swap the fixed half (Garden → `img-066`, "6 of 12 kinds of room with 'Garden' in the name"). Unique's "Choose dates first" flips the tag to a dates form (Arrival, Departure, Guests, "Check these dates on Booking.com", Agoda, Call, Turn back). Under `prefers-reduced-motion` no animation runs on any of the three. No heading reveals anywhere (calibration met).

---

## v2 calm — "Prints"

**Three-second test.** 1440 (`desktop-00`): white wall, a large noon-pool print (`img-078`, about 755 px wide) on the right, a small bamboo-blind print top left, "The Lavish Haven" in Pinyon Script at about 90 px, the tagline and a blue button. It feels light, clean and a little like a boutique brochure. The eye goes to the cyan pool first, then the script. I'd keep scrolling. 390 (`mobile-00`): the two prints overlap at the top, the script name, the tagline and the button. Pleasant, but the pictures are small and the screen reads as half empty under the button.

**Checklist**
- **Media:** the best daylight photo leads at below native size. Nothing is upscaled, which is good. The strongest asset, the night pool `img-002`, appears only at about 220 px in the "Pool, restaurant, spa" cluster (`desktop-05`) and in the closing (`desktop-10`). Every print is small, so the page never gives the hotel a big moment.
- **Composition and grid:** `desktop-02` is a **480 × 800 px flat tan rectangle with nothing in it** beside the room table. The print it frames only arrives a screen later (`desktop-03`), so for a full screen it reads as a missing image. The tasteskill `empty-middle` WARN ("New, and it shows": 1805 px of nothing between) and the `side-scroll` WARN confirm the loose grid. The scattered-prints cluster (`desktop-05/06`) is the best moment on the page.
- **Typography:** the Pinyon Script titles are elegant and match the calibration's "readable text + script titles" bar. Work Sans body is clean. 14 font sizes (inspector). The Kabalana statement runs 5 lines at 32 px. The room list is long two-line bold names at 16 px, nearly 1.5 screens of text (`desktop-02/03`).
- **Colour:** cool white `#F4F5F8`, slate ink, pool-blue booking `#0677B8` with white text. The booking colour is unmistakable. The tan field is the only warm note and appears as a block, not a colour.
- **Hierarchy and rhythm:** text, table, text, slideshow, cluster, list, quotes, forecast, accordion, closing. Pace is even and slow, and long stretches are text on white.
- **Polish:** at 390 the first screen shows two "Check dates" buttons (header + hero). The covered-text FAIL ("Pool, restaurant, spa" hidden behind a drifting print at one scroll position). The footer wordmark at 179 px is good.
- **Distinctiveness:** "prints on a wall" works as a layout system, but it could be any small hotel. Little belongs to this place beyond the photos.

**Score: 6 / 10.** Competent and clean, below the gold Lavish Haven page (one idea, the pool, carried through), and far below the Global Surf bar. The prints are too timid for a page with no hero moment.
**Better than the current site:** yes. First screen (`mobile-00` vs Booking's fold): two clear photos and a booking button instead of a cookie dialog. Whole page: yes.
**Hard fail:** below 8.

**Fix list**
1. Fill or remove the empty tan field in "Twelve kinds of room" (`desktop-02`). Put the 4:5 `img-073` print in it from the first frame, or drop the field.
2. Give the page one big moment: the night pool `img-002` at native 1024 px (not 220 px) as its own section after the intro, with `featureLine` beside it.
3. Cut the room table to a compact grouped list (name only, one line, "sleeps 4" as a tag) so the section is one screen, not two.
4. Enlarge the first-screen prints at 390 (the large one to full content width) and drop the header "Check dates" button on phones while the hero button is in view.
5. Fix the covered-text collision in "Pool, restaurant, spa": keep the drift prints out of the heading column. Shorten the Kabalana statement to about 30 words.

**Keep:** Pinyon titles with Work Sans; the pool-blue booking colour; no upscaled photographs; the scattered-print cluster; the blind crossfade; the footer wordmark.

---

## v2 interactive — "Pick your view"

**Three-second test.** 1440 (`desktop-00`): pale aqua left half with "The Lavish Haven" in Bodoni Moda, the tagline, a burnt-orange button and the two ratings. The right half is a balcony over the pool. It reads as calm and hotel-like, with a clear action. The eye goes photo first, then the name, then the button. I'd keep scrolling. 390 (`mobile-00`): the balcony photo fills the top 60 %, then the name, tagline, button and ratings. A good phone first screen.

**Checklist**
- **Media:** the fixed half is `img-073` shown at about 1.17× native, and it looks **soft** at 1440 (`desktop-00`). A **glass ashtray sits on the table** in the hero frame, and the Garden view (`img-066`, chip walk) shows a parked scooter. The same pool photo `img-078` holds the fixed half for three screens (`desktop-01/02/07`), so the stage stops changing.
- **Composition and grid:** the split stage is coherent and the chips work, a real idea tied to Booking's own room names. The inspector's off-centre FAIL (content 60 px from the left, 312 px from the right) is the split. It is defensible on desktop, but the header button stops at 732 px. The left column is mostly long lists (12 rooms, 26 amenities) at small size.
- **Typography:** Bodoni Moda titles look refined. But the intro and Kabalana statements are set in Bodoni at 30 px over 4 lines (`desktop-02`, `desktop-06`), where hairlines thin out. impeccable flags tight leading ×5. Hanken Grotesk body is good.
- **Colour:** aqua ground, deep green ink, burnt-orange booking (white on orange, as the calibration requires). It reads like the place, and the booking colour is clear.
- **Hierarchy and rhythm:** one rhythm all page long, text left and photo right. It doesn't vary until the closing.
- **Polish:** at 390 the footer wordmark "The Lavish Haven" is **clipped at the right edge** (`mobile-13`). The side-scrolling chip row is cut at 390. The rating line has its capture date. The bottom bar on phones is good.
- **Distinctiveness:** the most specific of the three. "Pick your view" is this hotel's own selling point.

**Score: 7 / 10.** The most complete and usable of the round, close to "clearly professional" but not beautiful: a soft, slightly cluttered hero photo and a monotone column. Below the gold page's single strong idea and the Global Surf gold.
**Better than the current site:** yes. First screen (`mobile-00`: balcony over the pool, button, both ratings vs Booking's covered fold). Whole page: yes, and the chooser does what Booking's twelve long names can't.
**Hard fail:** below 8.

**Fix list**
1. Replace the hero frame with a cleaner balcony/pool frame (`img-069` or `img-079`, no ashtray), capped at 1.0× native with the aqua around it, so it is sharp at 1440.
2. Give each section its own fixed-half picture (night pool for "Pool, restaurant, spa", balcony for "Staying longer", bedroom for "New, and it shows"), and never the same frame twice in a row.
3. Set the long statements (intro, Kabalana) in Hanken at 22–24 px, or cut them to about 30 words. Keep Bodoni for titles only.
4. Fix the 390 footer wordmark overflow (scale to the width), and end the chip row inside the grid (wrap onto two lines).
5. Shorten the left column: amenities as a compact two-line " | " list, and the room list collapsed to the chosen view by default.

**Keep:** the split stage and view chips; Bodoni + Hanken; aqua / green / burnt-orange; the ratings in the hero; the bottom bar; the flip-free plain Booking link.

---

## v2 unique — "Do not disturb"

**Three-second test.** 1440 (`desktop-00`): the night pool `img-002` big (about 870 px, below native), glowing, beside a white card hanging from a thin hook with the name in EB Garamond italic and a dark-brown button. **The strongest first screen of the six on desktop:** warm, inviting, hotel-at-night. I'd keep scrolling. 390 (`mobile-00`): the card fills the screen and the night pool starts below the fold. On a phone the photo doesn't lead.

**Checklist**
- **Media:** the best asset leads, at a good size, on desktop. After that the pool is a 4:3 print (`desktop-06`), and the bedroom slideshow and balcony prints are small.
- **Composition and grid:** the hang tag reads as a **generic white card with a stroke on top**. Neither the hole nor the slot is visible, so the object idea doesn't land, and the hook looks like a stray icon. "Twelve kinds of room" is a pastel tag carousel that **side-scrolls cut at the edge** and **pins for 3 screens** (inspector long-pin, side-scroll; `desktop-01/02/03`). On a phone it becomes 4 screens of pastel cards (`mobile-02..05`). The back of the flipped tag leaves the lower half of the card empty (flip walk).
- **Typography:** EB Garamond italic for every title and every room name (impeccable italic-serif-display ×10). Bookish and consistent, but body text is small at 1440 (`desktop-04`) and the page has 18 font sizes.
- **Colour:** off-white, slate, pastel aqua/sage/sand tags, dark-brown booking. The brown isn't from the place, and the pastel tags look like a SaaS pricing row.
- **Hierarchy and rhythm:** a strong opening, then a long flat middle (lists, quotes) and a framed closing card.
- **Polish:** edge-text FAIL ("Sleeps 4" 14 px from the edge). The covered-text FAIL is the tag's back face, which is expected. Under reduced motion there is no flip animation, and the form still works.
- **Distinctiveness:** the idea is specific; the execution reads generic.

**Score: 6 / 10.** The desktop first screen is close to 8. The rest falls to template level, and the phone first screen buries the photo. Below the gold page.
**Better than the current site:** yes. First screen at 1440 (`desktop-00`, the night pool big). At 390 only marginally (`mobile-00` is a card and a button, but the photo is cut). Whole page: yes.
**Hard fail:** below 8.

**Fix list**
1. At 390 put the night pool first (full content width, 4:3) and the tag under it, overlapping its bottom edge.
2. Make the tag a tag: draw the punched hole and the slot to the edge (the `img-046` proportions), drop the stroke "hook", and size the card to its content so the back face has no empty half.
3. Replace the pinned 3-screen pastel carousel with a wrapped grid of small tags grouped by view, inside the grid and one screen tall. Drop the pastel fills or take them from the photos.
4. Raise body text to 17–18 px and cut the size scale to five. Use roman, not italic, for room names.
5. Use more of the photographs after the first screen: one large print per section (balcony, bedroom, pool at noon) instead of small strips.

**Keep:** the night pool beside the card on desktop; the flip to dates (it works, with Agoda and Call on the back); EB Garamond for titles; the framed closing card.

---

## Earlier round (for comparison only)

- **Earlier calm — 5 / 10.** Hero: the night pool full-bleed at 1440 from a 1024 px source (upscaled, soft) with a 2-line headline and a small-print rating stack over it, then three ruled booking buttons in caps (`v1 desktop-00`). Cream + Instrument Serif, 7 eyebrow labels, 46 hairlines, a ruled room table, underlined footer links. These are exactly the patterns in the 2026-09-29 calibration. The photo grid of beds and bathrooms (`desktop-01`) is the "generated hotel page" look `concepts.md` warns about. Better than the Booking listing: yes, narrowly.
- **Earlier interactive — 4 / 10.** Desktop frames 00–02 render as a black screen with a 3-line headline. This may be the WebGL water under headless software GL (references #29), so it was judged from 390 (`mobile-00`: pool photo with WebGL water and a 3-line headline over it), which the calibration bans as a decorative overlay plus a large title over media. Also cream, eyebrows, 01–06 numbering, outlined room cards with underlined "Check this room" links, and a 1728 px blank gap at 390. Better than the Booking listing: yes on the phone first screen; the page as a whole is weak.
- **Earlier unique — 3 / 10.** Staggered caps "THE / LAVISH / HAVEN" in Bricolage, and a permanent WebGL water strip pinned to the bottom of every screen with giant outlined section names over it ("Nine doors", "What guests wrote") (`desktop-00..11`). That is the "giant word over media" and "decorative overlay" the calibration rejects. No visible h1, 27 low-contrast hits. Better than the Booking listing: no (the strip covers content on every screen).

## Final table

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6 / 10 (fail) | 5 / 10 | yes | **yes**: no upscaled hero, no eyebrows, hairlines, cream or underlined links; a script-title system the calibration asks for. But it lost the night pool's emotional hero. |
| interactive | 7 / 10 (fail) | 4 / 10 | yes | **yes**: a real idea (pick your view) that works on a phone, clean palette and type, no overlays on the photo, versus WebGL water under a 3-line headline and outlined, numbered cards. |
| unique | 6 / 10 (fail) | 3 / 10 | yes (desktop clearly; phone marginally) | **yes, by far**: the night pool big on the first screen instead of a giant word over a pinned water strip. |

**Visual ranking (4f):** 1. interactive: the most coherent and specific, held back by a soft, cluttered hero photo and a monotone column. 2. unique: the best desktop first screen of the round, but the tag doesn't read as a tag and the phone buries the photo. 3. calm: clean and honest about the 1024 px photos, but timid, with an empty tan block where a picture should be.

**All three fail the 8 / 10 bar.** Back to the designer before any human sees them. Every v2 variant beats its earlier counterpart. The design skills cleared the slop patterns (inspector FAILs fell from 7–12 to 1–2 per page), but none of the three yet has the one big, beautiful moment the gold page has.
