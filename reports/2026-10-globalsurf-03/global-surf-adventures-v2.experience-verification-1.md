# Global Surf v2: experience critic, station 5 (full), verification 1

experience-critic 0.1.0 · run `2026-10-globalsurf-03` · slug `global-surf-adventures-v2` · 2026-10-17 (IDT)
Page: `sites/global-surf-adventures-v2/final/dist` built from HEAD 291ae7c (no `src` file newer than the build). Another session was rebuilding the dist during this round, so I copied it to a scratch snapshot first (md5 of `index.html` 9b32e48c…, identical to the dist at the time of the copy). I served the snapshot over http with range support. I did not read the visual critic's or the critic's reports.

**Scope.** This round checks the five must-fixes from round 1 (`global-surf-adventures-v2.experience-final.md`), above all the drop, and looks for regressions from commits 4456cb5, 4f594d8, ec595bc and 5133d6c.

**How the walk was done.**
- **Profiles:**
  - "Slow phone" is 390×844, touch, DPR 2, about 1.6 Mbps, 150 ms RTT and 4× CPU (the playbook §4 profile).
  - "Fast phone" is the same viewport without throttling.
  - "Laptop" is 1440×900.
- **Logs:** each walk's JSON log is in `reports/2026-10-globalsurf-03/experience/global-surf-adventures-v2/verify-1/`. Each log records the scroll position, the page height, the drop's state at every step, the plates' opacity and size, and where the pool focal point of plate 1 and of plate 2 lands on screen.
- **Frames:** screenshots were taken and then deleted after the round, so each frame is described in words below.

## 1. The drop on the slow phone, at reading pace (round-1 must-fix 1). Fixed.

**Same walk as round 1** (`walk-slow.json`: cold load, 6 s on the first screen, then 0.3 viewport every 0.4 s):
- The sharp poster is requested at about 2 s, as soon as the levels come into view. The plates are requested right after it, and all three are in by 12.8 s.
- The reader reaches the drop at 13.9 s (step 16), so the stage is already `ready`. Plate 1 shows the roofs at rest, 1,250 px wide, with the pool at (50, 421).
- From there the whole sequence plays against the scroll:
  - roofs → closing on the pool (steps 19–21)
  - the hand-off (step 22)
  - plate 2 in the pool, then the dive (steps 23–24)
  - the bar (step 25)
  - the feature line (step 26)
- No step skips ahead.

**Slower reading pace** (`walk-read.json`, 0.2 viewport every 1 s): the plates were in by 11 s, the reader arrived at 32 s, and the full sequence played over 13 steps (`read-028…040`).

**A reader who starts scrolling at 1 s** without waiting for the hero (`walk-stress-eager.json`):
- The plates are in at 8.5 s, and the reader enters the run at 9.1 s.
- The sequence plays in full from p 0 (steps 19–27).
- In round 1 the same profile never showed the roof → pool descent.

**Plates arriving mid-run** (2.5 s injected delay, `walk-stress-delay25.json`):
- The stage holds the sharp poster with the ring until raw progress 0.54.
- It then starts at p 0: the roofs at rest, with the poster fading out (step 23).
- The whole sequence plays over the scroll that remains: the hand-off at step 24, plate 2 and the dive at step 25, the bar and the line at step 26.
- It is compressed into about 1,000 px, but nothing is skipped. This is the remap that was asked for.

**Residual edge case** (6 s injected delay, `walk-stress-delay.json`): the plates were in only about 12 s after the request, which is not the playbook profile.
- The reader scrolled the whole run looking at the poster and ring (raw 0 → 1).
- When the plates arrived, the stage was drawn at its end state (the bar plate) just as it left the screen.
- The reader never sees a wrong or half-drawn frame, but the descent is missed. See fix 3.

## 2. The loading still (round-1 must-fix 2). Fixed.

**Arriving at the drop at 1.5 s** (`walk-stress-jump.json`):
- **2.0–2.6 s:** the stage shows the blurred inline still of plate 1 (warm aerial colours), with no ring yet.
- **3.2 s:** the 624 px AVIF poster is decoded.
- **3.9 s:** the poster has faded in, sharp, with the ring.
- **6.8 s:** the stage is `ready` and shows plate 1 at p 0.
- In no frame is there a flat slab or a half-painted image. The round-1 `rgb(56,56,40)` slab and the top-down partial paint are gone.
- The poster is a separate 624 px file and is no longer the lazy 2000 px plate 1.

## 3. Alignment and the end of the dive (round-1 must-fix 3). Fixed.

**Alignment** (`walk-scrub-phone.json`, `walk-scrub-laptop.json`, 41 steps each): wherever two plates are visible together (p 0.275–0.50), the pool focal point of plate 1 and of plate 2 lands on the same screen point.
- Phone error: 0.0 px.
- Laptop error: 0.0–0.1 px.
- The slow walks give the same result at every in-run step. For example, at step 22 of `walk-slow.json` the pool is at (55.8, 410.6) on plate 1, on the masked plate 2 and on plate 2.

**End of the dive:**
- Plate 2's `water` point is now open pool water: (0.35, 0.6144), the same spot as the pool focal point (seed commit ec595bc).
- At p 0.80 (`scrub-phone-32`) the frame is about 70 % rippled blue water, with two surfers on boards at the left and a palm frond in the top-right corner. It no longer closes on the palm crown.
- The cross-fade to the bar at the water line (p 0.80–0.83, `scrub-phone-33`) now reads as arriving at the water. The laptop does the same (`scrub-laptop-32/36`).

## 4. No page jump. Holds.

- **Page height** was constant in every walk, once loading had finished:
  - phone: 14,419 px (the shorter "What's included" removes 190 px against round 1's 14,609)
  - laptop: 12,952 px
  - reduced motion: 12,498 px
  - JS off: 13,466 px
- **Scroll jumps:** none logged in `walk-slow` or `walk-read`.
- **During the first 1.5 s on the slow phone** (`settle.mjs` probe), the content above the drop grows by 97 px while the HTML is still streaming in. Measured CLS is 0.007. The reader is still on the hero at that point, so they do not see it.
- **Horizontal overflow:** 0 on every profile.

## 5. The other round-1 fixes, and regressions

- **"What's included" on phones:** it is now a two-column icon grid, and the ten lines fit on about one screen (`fast-05/06`). The dip between the levels and the drop is gone.
- **Drawer thumbnails:** the level and room images are now 112×84, up from 84×62 (`walk-rest.json` → `book.thumbs`). The pictures now carry the choice.
- **Header:** solid white as soon as the hero is half gone (`hdrBg` is `rgb(255,255,255)` from frame 1 on the phone and laptop walks). With JS off the header is not fixed and scrolls away, so nothing sits over the white sections (`nojs-*`).
- **Room tabs:** the selected room is dark and the others are grey. Contrast is fine (`fast-12`).
- **Review dots:** they wrap onto a second row on the phone (`fast-17`). This is acceptable, but nine dots in two rows is a lot (see fix 4).
- **Hero:** the title, the short "Sri Lanka's south coast, all levels" subtitle and one button (`slow-cold-*`). This stays inside Shahar's hero bar.
- **Poster to video:** the change is a hard cut with no fade. The video was playing at 6 s on the slow phone (t = 1.22 s).
- **Regression, minor: the phone hero poster is soft.** The new portrait cut (`gs2-hero-poster.p1080.webp`, 1080×1746, 61 KB) is upscaled footage. At 100 % the palms and roofs in the lower half are smeared (`poster-crop`). At phone size it reads as a slightly soft photo. On the slow phone it is the first screen for about 3–6 s (`slow-cold-500/1500/3000`), so it is the first impression. It is not blocking.
- **Booking** (phone, tapped, Bookinglayer aborted; `book-1…6`):
  - **Path:** hero "Book package now" (1) → Level 2 (2) → Shared twin (3) → Sat 31 Oct 2026 (4) → "+ Men" (5) → "Continue booking" (6). **6 taps**, which meets the audit target.
  - **Totals:** $1,466 → $1,606 → $3,212 for 2 guests.
  - **Hand-off:** `…/en/product/level-2-rollers?start=2026-10-31&end=2026-11-07&female=1&male=1&couple=0`, identical to round 1.
- **Reduced motion and JS off:**
  - With reduced motion, no hero video loads (`video.src` is empty on every frame). The static drop shows, and the page is complete.
  - With JS off, the clips are stills, the static drop shows and the forecast is the plain "See today's forecast for South Point on Rosa" link (`nojs-13`).
- **Laptop** (`laptop-00…17`): same rhythm as round 1:
  - the inset frame opens to full-bleed
  - the room viewer
  - the barrel band
  - the two-column forecast
  - the sunset portrait beside the quotes
  - the dusk pool
  - the footer
- **Hero video:** the phone gets `gs2-hero.p1080.webm` (1.40 MB, inside the 2 MB line) and the laptop gets `d1920.webm` (1.63 MB).

## Against the current site (walked live today)

- **Current site, phone** (`cur-0`): a dark wave video with a breadcrumb, then "Sri Lanka Lodge" and a lead form under it, with a Messenger bubble in the corner. There is no price in the page text (`price: false`). The page is 8,942 px tall.
- **Verdict:** the new page is clearly better on the first screen and over the whole page:
  - The new page shows the lodge in sun, with one title and one button.
  - The price is one scroll down.
  - The rooms are sold with galleries.
  - The booking keeps the package choice and shows the total from the first tap.
  - The drop is a moment the current site has nothing like.
  - The current site's handwritten titles, Instagram row and footer are all matched.

## Verdict

**Score: 9/10. Pass.** **Better than the current site: yes** (`slow-cold-3000` against `cur-0`). **Taps to book: 6.**

The thing that held round 1 at 8 is fixed. On the playbook's slow phone at reading pace, the full descent from the roofs to the pool plays. The loading stage is always a real still, the hand-off is exact to 0.1 px, the dive ends on open water and nothing jumps. The page has one moment that makes you want to be there, and it now reaches the visitor it was built for. It is not 10 because of the remaining softness listed below.

**Remaining fixes (none blocking), biggest effect first:**
1. **Clean up the hand-off frame.** At p ≈ 0.40–0.45 on the phone (`read-033`, `scrub-phone-18`), the top 40 % of the stage is a grey-mauve fog. This is plate 1's roof enlarged about 4× and blurred, and for about 150 px of scroll it reads as smoke rather than a focus pull. Fade plate 1 out sooner above the pool, or tint the area outside the mask toward the pool deck, so that only the pool and the palm are sharp and the rest is dark green or soft rather than grey.
2. **Sharpen the phone hero poster.** `gs2-hero-poster.p1080.webp` is visibly soft. Either take the poster from a still photograph with the same framing, or use a frame with less motion and cut it at the source's native width rather than upscaling to 1080.
3. **Plates that arrive only after the run ends** (6 s injected delay): when the plates become ready with the reader at raw ≥ 1, keep the poster in place rather than drawing the end state, so that a reader who scrolls back up sees the descent from p 0.
4. **Fewer review dots on phones.** Nine dots wrapping onto two rows looks busy. Use a "1 / 9" counter or cap the dots at a single row.
5. **Pause the hero video when it is off screen.** It keeps playing through the whole walk (`fast` frames 1–21: `paused: false`). This costs battery and CPU on the mid-range phone while the drop and the level clips are working.

**Keep:**
- the drop exactly as it now loads: blurred inline still, then the decoded AVIF poster, then the plates, with the late-ready remap
- the focal-point geometry and the open-water end of the dive
- the fixed height
- the two-column "What's included"
- the bigger drawer thumbnails
- the docked whole-dollar total
- the hero (title, one-line subtitle, one button)
- Literata with Parisienne
- the deep-blue booking colour
- the reduced-motion and JS-off pages
