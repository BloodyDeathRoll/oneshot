# The Lavish Haven v2 — experience-critic, station 4f (quick)

experience-critic 0.1.1 · run `2026-10-lk-surf-01` · 2026-10-20 · mode: quick · independent of visual-critic and critic (their reports were not read).

## The pages

- **New round (v2):** `sites/the-lavish-haven-v2/mockups/{calm,interactive,unique}/dist/index.html`. These are calm "Prints", interactive "Pick your view" and unique "Do not disturb" (the hang tag).
- **Earlier round (comparison only):** `sites/the-lavish-haven/mockups/{calm,interactive,unique}/dist/index.html`, the 2026-09-20 revision.
- **Current site:** the business has none (`dossier.website: null`). Its only presence is the Booking.com property page. On a phone that page shows an app banner, the blue Booking bar, and a cookie dialog covering the bottom half and the night-pool photo. It shows no phone number until after booking (`dossier/the-lavish-haven/funnel/booking-fold.png`, audit F1). As a secondary bar I also walked our own live preview of the earlier pick (`the-lavish-haven.os1.workers.dev`, gold-derived): a WebGL pool-shaped window, noon to night.

## How the pages were walked (evidence)

- **Own Playwright walk** for every page (`scratchpad/ec-lavish-v2/walk.mjs`), with pages served over local HTTP so the fonts load as they would in production:
  - Phone at 390×844 with touch, slow 4G (1.6 Mbps, 150 ms RTT) and 4× CPU. Cold-load frames at the 0.5 / 1.5 / 3 s marks. Screenshots under CPU throttle landed late: the real capture times were about 1.0–2.6 s, 1.5–2.6 s and 3.0 s, and each is reported as such.
  - A human-pace scroll: a ¾-viewport swipe, then a 1 s dwell, framed each time, with a rAF frame-time probe running.
  - The fixed booking bar after scroll, the first-screen controls, and a tap on the booking CTA. I recorded the href and did not continue on the engine.
  - Interactions: calm's crossfade, drift and slideshow; interactive's chips (frames at 100 / 350 / 850 ms) and the dates panel; unique's swing (200 / 500 / 900 / 1400 ms), tag hover, flip (120 / 270 / 670 ms) and curtain footer.
  - Reduced motion and JavaScript off.
  - Laptop at 1440×900: load frames and scroll.
  - Earlier unique uses an inner scroller (`div.page`), so it got its own inner-scroll walk.
- **tasteskill inspector** (`inspect.mjs`, 1440 + 390) on all six pages.
- **`tools/shoot.mjs`** sheets in each mockup's shared `shots/`.
- **Frame-time caveat:** headless Chromium with SwiftShader holds 60 fps almost regardless of load. Every page measured 16.7 ms mean and p95, with 0–1 frames over 50 ms, at 4× CPU. That rules out gross jank but does not separate the pages. Motion smoothness below is therefore judged from the mid-transition frames.

## Cross-cutting finding (all three v2 pages)

**`font-display: optional` on every face** (6 of 6 @font-face rules), with preloads. On the throttled phone cold load the fonts missed the block window, so the whole first visit renders in fallbacks:

- **calm:** the Pinyon Script h1 and section titles become a plain Times-like serif. The concept's "welcome card" voice is simply gone on a phone (frames `phone-cold-*`, `phone-scroll-*`, versus the laptop frames, where the script renders).
- **interactive:** Bodoni Moda becomes Georgia and Hanken Grotesk becomes the system sans.
- **unique:** EB Garamond becomes Georgia. This does the least harm, because it is close.

The earlier round used `swap`. The traveller on hostel Wi-Fi is exactly the visitor who never sees the designed type.

---

## v2 · calm — "Prints"

**Timeline (phone, cold).**
- At about 1.8 s the header, the "Check dates" pill, the h1, the tagline and the blue button are all usable. The pool print is half-decoded as a thin strip, and the blind square is a grey placeholder.
- By 3.0 s both prints are in. LCP is 2260 ms, CLS 0, and the first load is 464 KB.

**The story.** After one swipe you know what it is and where: a new hotel two minutes from Kabalana, with a pool from above and a balcony blind. There is no price, because none is published, and the page says so plainly.

The walk:
- The first two screens are honest and calm.
- Screens 2–4 are the twelve room names as a small-type table: about three phone screens of text, grouped pool / garden / both / none. Attention drops here.
- One bedroom print and a flat bamboo-coloured field come next.
- Then the slideshow (dots, horizontal snap, which slides smoothly: frames `laptop-slide-120ms` mid-slide, `-520ms` settled).
- "Pool, restaurant, spa" is the page's best moment: six prints scattered around a script heading, with the night pool the largest.
- After that come a two-screen amenity list, the letters, Rosa, the practicalities as `<details>`, and the closing with a script wordmark.

**Wanting to go.** Quietly yes at the pool cluster. Everywhere else the photographs are small (240–440 px on laptop, under 60 % of width on the phone) on a big white wall. On laptop the wall reads as empty more than composed (inspector: `empty-middle` 1805 px).

**Booking.**
- 1 tap. The header pill and the first-screen button both link straight to `booking.com/hotel/lk/the-lavish-haven.html`.
- After the first swipe there is a fixed bar: "Check dates on Booking.com" plus a 52 px phone icon (`tel:+94764832988`).
- Price and level do not apply (no rates exist).
- It feels trustworthy, but on the phone two blue booking buttons sit on screen at once (header pill + bar) for the whole page.

**Motion.**
- The small print crossfades slowly between three blinds (15.2 s cycle, about 1.6 s fade; frames `laptop-crossfade-t1..t4`). It is smooth and almost subliminal.
- Prints in the pool cluster drift on a CSS view-timeline (transform only; frames `laptop-drift-0/3`). Purposeful.
- Buttons press-scale (transform 140 ms `cubic-bezier(.23,1,.32,1)`).
- The motion is correct and composite-only, but there is very little of it to feel. Nothing tells you the page is alive until the pool cluster.

**Reduced motion / JS off.** With reduced motion no animation runs. With JS off the page is complete: 11 Booking links, 3 `tel:`, and the slideshow becomes a snap row.

**Laptop.** The first screen is the best of the three v2 pages at 1440: a script name, a tagline, the button, and a 756 px pool print with the blind square above it, so the screen reads as one wall. Further down the page goes sparse and grey-small.

**Score: 6 / 10** (fine but forgettable). **Better than the current site (Booking.com page): yes.**

**Fix list (biggest effect first).**
1. `font-display: swap` (or `optional` for Work Sans only, `swap` for Pinyon), so the script titles appear on a first phone visit.
2. Shrink the twelve-room table on the phone: pool / garden / both / none as four tappable groups that open, instead of about three screens of 15 px names.
3. Make the prints bigger. On the phone the first-screen pool print at 100 % width (it is 1024 px, so it holds at 390) and the blind square overlapping it. On laptop no print under 360 px, and the bedroom print beside "Twelve kinds of room" up to about 520 px.
4. Cut the amenity list on the phone to 8 items plus "all 24", which saves about two screens.
5. On the phone, hide the header "Check dates" pill once the bottom bar is showing (one booking button per screen).

**Keep:** the two-print first screen on laptop, the pool cluster with drift, the slideshow with dots, the honest "no published price list" line, and the phone bar with its `tel:` icon.

---

## v2 · interactive — "Pick your view"

**Timeline (phone, cold).** At about 1.0 s the header and the "Check dates" pill are showing. At about 1.5 s the balcony photo, the h1, the tagline and the button are in. LCP is 1596 ms, CLS 0, and the first load is 311 KB.

**The story.**
- After one swipe: the hotel name, "two minutes from Kabalana", 9.3/10 from 34 Booking reviews and 5.0/5 from 21 Google reviews (read 25 Sep 2026), then "Pick your view" with the chips at the fold.
- It is told through one photograph and a live control, not a table.
- The hero crop (`img-073`) is mostly a dark teak chair with an ashtray, and the pool is a cyan sliver behind the rail. "The view" is under-sold at the exact moment the page promises it.

**Wanting to go.** The moment is tapping "Garden" or "Pool": the fixed half crossfades to that view while the list filters. Pool goes 13 → 6 rows, garden → 7, kitchen → 4, all → 13 (measured). It is the first time any Lavish page lets the guest *do* something that answers "which room for me".

What deflates it:
- On the phone the twelve rows still run about 2.5 screens.
- The amenity list and the letters are long.
- The Bodoni body statements at about 30 px on laptop lose their hairlines.

**Booking.**
- 1 tap to Booking.com from the first screen or the fixed bar ("Check dates on Booking.com" plus a phone icon).
- Optional dates path: "Choose dates first" opens a panel (369 px on the phone) with floating-label fields and "Check these dates on Booking.com". The form builds `…/the-lavish-haven.html?checkin=2026-12-10&checkout=2026-12-14&group_adults=2&no_rooms=1&group_children=0`. That is 3 taps plus the native date pickers.
- Whether Booking.com honours these parameters was not verified, by design: no engine walk past the hand-off.
- "Same dates on Agoda" sits beside it.
- It reads trustworthy, and the rating sits beside the button.

**Motion.**
- The chip tap crossfades the view in about 600 ms. The 350 ms frame shows a clean blend with no flash or jump (`laptop-chip-garden-100/350/850ms`, `phone-chip-garden-*`).
- The rows FLIP into place (WAAPI). Already finished by 850 ms, so nothing is left hanging.
- Chips and buttons press-scale.
- The dates panel opens by `grid-template-rows` (a layout property). It is smooth at this size, but is the one non-composite move.
- On the phone the view photo sits *between* the chips and the list, so a chip tap changes the photo you can see while the filtered list moves off-screen below it. You feel the photo change but not the filter.

**Reduced motion / JS off.** With reduced motion swaps are instant and nothing runs. With JS off the page is complete (11 Booking links, 3 `tel:`), and the stage holds `img-073` with the other five view images at opacity 0, as intended.

**Laptop.** The split stage works: aqua reading column, a balcony photograph filling the right 45 %, the rating under the button, and the chips at the fold. At 1.17× native the photograph is visibly soft but acceptable. The inspector flags `off-centre` (60 / 312 px); that is the split layout, not an error.

**Score: 7 / 10** (the most engaging of the three; not yet "clearly better" at a glance than our own live preview). **Better than the current site (Booking.com page): yes.**

**Fix list.**
1. `font-display: swap`, so Bodoni and Hanken appear on a first phone visit.
2. Re-crop the hero view so the pool fills at least ⅓ of the frame (`img-073` moved right/down, or `img-069` as the arrival view). The page is named after the view, so the view should lead, not the chair.
3. On the phone, make the view sticky under the chips (or put the count line and the first three filtered rows directly under the chips), so a tap shows the list change as well as the photo.
4. Collapse each room row on the phone to the name plus "sleeps n" (beds on tap), which cuts the list to about one screen.
5. Open the dates panel with a transform/clip-path instead of `grid-template-rows`, and trim the amenity list on the phone.

**Keep:** the chooser with its crossfade and FLIP, the rating beside the button, the floating-label dates panel that hands off to Booking.com with dates, and the phone bar.

---

## v2 · unique — "Do not disturb" (the hang tag)

**Timeline (phone, cold).** At about 1.2 s the hook, the tag with the h1, the tagline, the stay line, "Check dates on Booking.com" and "Choose dates first" are all there. LCP is 428 ms, CLS 0, and the first load is 200 KB (the lightest of all six).

**The story.**
- The first screen on the phone is the clearest of the six pages: a white card hung on a hook with the name, "A new hotel, two minutes from Kabalana" and "Check-in from 14:00 until midnight; check-out at any hour", then the night-pool print below it.
- One swipe gives a four-fact row: 2 min to Kabalana · check in until 00:00 · check out any hour · 9.3/10, 34 reviews.
- What, where, why and trust are all there inside one swipe.

**Wanting to go.** The night pool beside a calm white card is the most inviting first screen in this round. Then comes "Twelve kinds of room": on the phone, twelve pastel tag-shaped cards stacked for about **3.5 screens** (frames `phone-scroll-02..05`), with only text on each card. This is where attention drops hardest anywhere in this round. On laptop the deck pins and travels sideways for about two screens (inspector `long-pin`), which reads better but is still twelve text cards. After that: the slideshow, the pool print, the letters, the practicalities beside two balcony prints, Kabalana with a Maps link (no forecast), and a tag-shaped footer.

**Booking.**
- 1 tap from the tag front or from the fixed bar.
- "Choose dates first" flips the tag to arrival, departure and guests, then "Check these dates on Booking.com". The URL carries the dates (same as interactive, not verified on Booking). Agoda, Call and Turn back sit there too.
- Focus moves to the arrival field after the flip (good). On the phone, that focus also scrolls the page by about a third of the tag (frame `phone-flip-120ms`), a small jolt.
- This is the most "part of the site" booking step of the three.

**Motion.**
- **Swing:** on load the tag settles from about 2° to rest by around 500 ms (frames `laptop-swing-200/500ms`). It is gentle and finished before the hand reaches the button, which is right. A hover nudge was not visible in my frame (`laptop-tag-hover-150ms`). Either it is too small to read, or it did not fire under a synthetic pointer.
- **Flip:** a 3D tilt is visible at 270 ms, then the back face settles at 670 ms. It is smooth, but the back face is shorter than the front, so the card's height jumps at the end.
- **Curtain footer:** it reveals cleanly.
- **Deck travel:** transform on a view-timeline.
- This is the most crafted micro-interaction set in this round, and all of it is composite-only.

**Reduced motion / JS off.** With reduced motion nothing runs, the flip is a crossfade and the deck stacks. With JS off the back of the tag appears in flow, the front button works, and there are 10 Booking links and 3 `tel:`.

**Laptop.** An 867 px night print beside a 430 px tag, their feet aligned. The middle of the tag is about 120 px of empty white between the tagline and the stay line (also a 4e note).

**Score: 6 / 10.** The first screen and the flip are 8-level. The room deck on the phone drags the page down to forgettable in the middle. **Better than the current site (Booking.com page): yes.**

**Fix list.**
1. Cut the room deck on the phone to one horizontal swipe row of the twelve tags (scroll-snap, about 1 screen), or three tags (pool / garden / no view) that flip to list their rooms. That removes about 2.5 screens of text cards.
2. `font-display: swap` for EB Garamond.
3. Give the front and back of the tag the same height, so the flip ends without a jump. Prevent the focus scroll on the phone (`focus({preventScroll:true})`).
4. Fill the empty middle of the tag on laptop (the 9.3 / 34-review line or the four-fact row's first fact), so the card reads as designed, not unfinished.
5. Put a photograph into the deck section on laptop (e.g. a balcony print beside the travelling deck), so two screens are not text-only.

**Keep:** the tag-and-night-print first screen (the strongest phone first screen in this round), the swing settling within about 500 ms, the flip-to-dates booking, the four-fact row, and the tag-shaped footer.

---

## Earlier round, same method (comparison only)

**calm (r1) — 4 / 10.**
- First screen: the night pool full-bleed at 1440. It is a 1024 px photo upscaled about 1.4× and visibly soft. A 52 px tagline sits over it.
- Below the hero is a stack of three outlined all-caps buttons (Booking / Agoda / Call), which the 2026-09-29 calibration rules out. The underlined footer links are "outdated" by the same calibration.
- More photographs than v2 calm (a phone gallery grid and full-width balcony bands), so it is more image-led.
- No motion at all (inspector `still-page`: 0 moved; press feedback none).
- Inspector: 7 FAIL.
- First load is 788 KB (slow-4G frames show the hero still painting at about 2.3 s).
- 1 tap to Booking. Fonts use `swap`.

**interactive (r1, Shahar's pick on 2026-09-20) — 6 / 10.**
- The most immersive first screen of all six: the pool from above filling the screen, a pinned WebGL water layer, and the night pool taking over on scroll.
- The headline is 120 px over the photograph (3 lines). A tagline plus a rating sit over the media, the stack the calibration rejects.
- Full-bleed upscaled photos throughout look soft.
- Booking: "BOOK" in the header and the bottom-bar "CHECK DATES" open an in-page drawer, so it is 2 taps to Booking.com. The page's own Booking.com link sits at the very bottom (y = 13123 on the phone).
- Motion: the WebGL scroll is the earlier round's only real motion, and the inspector cannot see it. Swiftshader frame times were clean. There are no chip-level micro-interactions and no press feedback.
- Inspector: 12 FAIL (eyebrows, 01–06 numbering, hairlines, outlined boxes, blank gaps).

**unique (r1) — 4 / 10.**
- The first screen has **no photograph of the hotel**: only "THE / LAVISH / HAVEN" in a scattered black grotesque.
- A fixed WebGL night-pool band takes about the bottom ⅙ of the phone screen for the whole page, under the booking bar.
- The page scrolls inside an inner `div.page` (9178 px), not the window.
- The rooms are a typeset all-caps table.
- 2 taps to Booking (CHECK DATES → #book).
- Inspector: 11 FAIL, including `few-pictures` (1 picture at 1440), `late-title` and `no-title`.
- Motion is kinetic type plus the WebGL band; inner-scroll frame times were clean.

All three earlier pages are better than the Booking.com page (each gives the phone number and a direct button), but only narrowly for calm and unique.

## Against the earlier round, per variant, on motion and micro-animation

- **calm: v2 is better.** The earlier calm had zero motion and no press feedback. v2 has a slow crossfade, transform drift, a snap slideshow and press-scale, all composite-only, all switched off under reduced motion. It is still the least animated v2 page. Overall v2 is cleaner (no outlined caps, no upscaled hero) but less image-led than the earlier calm.
- **interactive: v2 is better on micro-interactions; earlier is stronger on immersion.**
  - v2 has real feedback loops: the chip → crossfade view + FLIP list, a dates panel with floating labels, and press-scale.
  - The earlier one had one big WebGL scroll effect and no small ones.
  - On "wanting to go" the earlier full-screen pool still hits harder at first sight. v2 wins on booking clarity (1 tap versus 2) and on honesty about the 1024 px photographs.
- **unique: v2 is clearly better.** v2 has a swing that settles in about 0.5 s, a 3D flip to dates and a curtain footer. The earlier one had kinetic type and a permanent WebGL band over the bottom of the phone. The v2 first screen shows the hotel; the earlier one did not.

## Experience ranking (v2, 4f)

1. **interactive — 7.** The only page that answers "which room for me" by doing; smooth chip motion; a weak hero crop.
2. **unique — 6.** The best first screen and the best micro-interactions; the room deck on the phone is the worst stretch in the round.
3. **calm — 6.** Correct, honest, quiet; small prints and long lists make it forgettable.

**Result: all three v2 pages are below 8, so per rubric this is a hard fail on dimension 8.** Each goes back to the designer before a human sees it. The shortest path to 8: unique, with fixes 1–3, and interactive, with fixes 1–3.

## Final table

| variant | new score | earlier score | better than current site | better than earlier round |
|---|---|---|---|---|
| calm | 6 | 4 | yes (vs the Booking.com page; no website exists) | yes. Motion: v2 (earlier had none); imagery: earlier was more image-led |
| interactive | 7 | 6 | yes | yes on micro-interactions and booking (1 tap vs 2); earlier was more immersive at first sight |
| unique | 6 | 4 | yes | yes, clearly (motion, first screen, booking) |

Taps to book: v2 calm 1, interactive 1 (dates path 3), unique 1 (dates path 3 via the flip); earlier calm 1, interactive 2, unique 2.
