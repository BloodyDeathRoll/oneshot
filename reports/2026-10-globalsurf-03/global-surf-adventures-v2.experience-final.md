# Global Surf v2: experience critic, station 5 (full), round 1

experience-critic 0.1.0 · run `2026-10-globalsurf-03` · slug `global-surf-adventures-v2` · 2026-10-17 (IDT)
Page: `sites/global-surf-adventures-v2/final/dist` at commit 2041e31. The build was copied to a scratch snapshot so that a concurrent rebuild could not change it during the walk (md5 of `index.html` 425fe9e8…, identical to the dist). It was served over http by `tools/_serve.mjs`. The visual critic's and the critic's reports for this round were not read.

**How the walk was done.** I used my own playwright walks. Frames went to `reports/2026-10-globalsurf-03/experience/global-surf-adventures-v2/final/`, and the logs are `walk-{phone,phonedrop,book,laptop,reduced}.json` in the same folder. The screenshots were deleted after the round, so each frame below is described in words.
- **Phone:** 390×844, touch, DPR 2. "Slow" means about 1.6 Mbps, 150 ms RTT and 4× CPU (the playbook §4 profile).
- **Human pace:** 0.3 viewport every 0.4 s, with a frame every 0.6 viewport. The log records the scroll position, page height, height jumps, scroll jumps, video state, drop-stage state and section headings.
- **The drop:** scrubbed in 25 steps on a fast phone and on a laptop. At each step the pool's on-screen position was measured on plate 1 and on plate 2, from their rendered boxes and the focal points in `#pagedata`. It was also run on the slow phone twice: once arriving straight at the drop, and once with a 6 s delay injected on the three plate files while the reader scrolls through.
- **Booking:** tapped through on the phone. Bookinglayer requests were intercepted and aborted, so nothing was booked.
- **Also walked:** reduced motion and JS off on the phone, and the laptop at 1440×900.
- **For comparison:** the picked mockup (`mockups/unique/dist`) on the same two profiles, and the current site live today (`globalsurf.com/kabalana-lodge-surf-packages/`) on phone and laptop.

## The current site (walked live today)

- **Phone first screen** (`cphone-0`): a dark wave video with a breadcrumb, then "Sri Lanka Lodge" and "Weekly Surf & Wellness Retreats". A lead form ("Fill in your details and we'll get back to you soon") follows directly under it. A Messenger bubble sits in the bottom-right corner of every frame.
- **Requests:** 248 on the phone and 275 on the laptop, unthrottled, in about 21 s.
- **What follows:**
  - nine grey icon boxes ("Surf guiding", "Ice baths treatments"…)
  - text-heavy "Kabalana Lodge" and "Accommodation" blocks
  - Beginners / Intermediate / Advanced tiles with long paragraphs
  - one testimonial
  - a Google Maps embed
  - an Instagram row
  - a beige footer
- **No price anywhere** in the page text (checked on `document.body.innerText`).
- **What it still does well:** the handwritten section titles ("The Experience", "Kabalana Lodge", "Follow the Gram"), the Instagram row and a full footer (`claptop-9/10`).

## Timeline on the phone (slow profile, cold)

- **0.5 s, 1.5 s and 3 s** (`phone-cold-*`): the poster is already painted. It shows the lodge's white roofs and pool in the palms, with turquoise sea and a reef line behind. "Your surf week starts here" is set in Literata, centred on the sea, with one deep-blue "Book package now" button under it. The header is transparent: the logo and "Menu". Nothing else is on the screen.
- **3 s:** the phone rendition `gs2-hero.p668.webm` is attached (readyState 1).
- **6 s:** the video is playing (t = 2.21 s). The frame is now the reef coast from the air with breaking whitewater.

On slow 4G the visitor sees a good still first and then real footage. This is the strongest first screen of the run, and it follows Shahar's hero bar exactly.

## The walk (phone)

1. **One scroll down** (`phone-walk-01/02`): the script title "Choose your level", one sentence saying the three weeks cost the same, and "8.6 on Booking.com, 80 reviews, 28 Sep 2026". The Level 1 clip (pop-up practice on mint soft-tops) starts as it enters.
   - The persistent bar "From $1,466 pp | 7 nights · Book now" appears as soon as the hero leaves.
   - After one scroll the visitor knows what this is, where it is, roughly what it costs and that others rate it. The media tells the story, not tables.
2. **Levels** (`02–05`): three full-width clip blocks, each with a one-line pitch, "From $1,466 pp | 7 nights" and its own button. Then the Freestylers card with "Ask about dates" on WhatsApp (`06`).
3. **What's included** (`07–09`): the mango breakfast bowl above the script title, then ten icon lines. This is still about 1.5 screens on a phone, and it is the one stretch where attention dips.
4. **The drop** (`09–14`). See the next section.
5. **The lodge and the rooms** (`15–18`):
   - "The lodge" with the amenities as one " | " paragraph and a dot slideshow.
   - "Our rooms" with the three room names as tabs and a full-width gallery with arrows and dots.
   - The room text: "Sleeps 4 | 4 single beds | Private outdoor bathroom | Shared", "Included in the package price" and "Choose this room".
   - The rooms are sold properly.
6. **The waves** (`19–21`): the barrel photograph is painted on arrival. This round, unlike 4f r2, it was not white on slow 4G. The Rosa headline reads "0.5–0.8 m | 7 s | 12 km/h, South Point, Sat 17 Oct, 14:30", and Rosa's light widget sits under it.
7. **The end of the page** (`22–27`):
   - The sunset yoga silhouettes with "What guests say", the category line and one quote with dots.
   - The dusk pool, then the closing line with "Book package now" and "WhatsApp us".
   - "Follow the lodge" with a mosaic of six tiles.
   - A tinted footer with WhatsApp / Call / Email buttons and "Open in Maps".
- **Page stability:** the page height held at 14,609 px for all 27 walk frames. No height jump and no scroll jump were logged (`walk-phone.json` `jumps: []`). There is no horizontal overflow.
- **Where you want to go:** the drop. The pool comes up under you and the palm grows out of the water. A second moment is the sunset yoga band.

## The drop: alignment, loading and page stability

**Alignment.** The hand-off is exact.
- On the fast phone, plate 2 fades in over p 0.25–0.34 and plate 1 is hidden at p 0.5. For every step in that window, plate 1's pool and plate 2's pool sit on the same screen point: error 0.0–0.1 px (`walk-phonedrop.json`, `phonefast-drop` steps 0–12). The laptop measures the same (`laptop-drop` steps 0–12).
- In the frames the roofs-and-road aerial closes on the pool with the palm. The palm then grows out of the small pool in place, and the descent reads as one camera move:
  - `phonefast-drop-00…09`: the aerial closes on the pool.
  - `-10/11`: the palm grows out of the small pool.
  - `-12…19`: plate 2.
  - `laptop-drop-00…18`: the same on the laptop.
- The geometry comes from each photo's focal point (schema v0.10), not from coordinates written for one photograph. Replacing a plate keeps the pool and palm locked as long as the owner sets the focal point on the pool.

**Remaining softness, all minor:**
- Around p 0.42 (`phonefast-drop-10`, `laptop-drop-10`) plate 1 is blurred around the sharp pool, at most 2.4 px. It reads as a focus pull, lighter than at 4f.
- The dive (p 0.57–0.8) closes on the palm, not "until blue fills the frame" (`phonefast-drop-15…19`). The cut to the bar at water level (p 0.80–0.83) is therefore a quick cross-fade from palm to bar rather than a descent into the water.
- The feature line on the bar plate is clean: "Footwear is discouraged. Chilling out is inescapable." in white on the water (`phonefast-drop-22…24`).
- The phone stage now fills the space between the header and the bottom bar (390×702). The 4:5 box with white bands above and below, as in the mockup (`mphone-drop-*`), is gone.

**No page jump.** The drop's height is fixed from first paint.
- The tier is decided in `<head>`.
- The page height did not change through any probe: 14,609 px through the human-pace walk, through 12 frames of the slow arrive-at-the-drop run and through 16 frames of the slow-plate run.
- The reduced-motion and JS-off walks logged no jumps either.

**Loading state on the playbook's slow phone: the one real flaw.**
- **Human-pace walk:**
  - The plates are requested when the run is 1,400 px away.
  - On 1.6 Mbps they are not ready when the reader arrives, because the level clips are also downloading.
  - The reader sees the static img-062 aerial with a white loading ring for about 1,000 px of scroll (`phone-walk-10/11`).
  - When the plates are ready the stage cross-fades straight to the current progress, already on the palm in the pool at about p 0.5 (`phone-walk-12`).
  - **The roof → pool descent, the whole point of the set-piece, was never seen on this profile.**
- **Arriving straight at the drop** (`phonedrop-load-00…11`):
  - For 0.5–2.5 s the stage is a flat dark-olive slab (`rgb(56,56,40)`) with the ring.
  - At about 2.5 s the poster paints top-down, with half an image over half a slab (`phonedrop-load-05`). That looks broken for a moment.
  - The plates are ready at 5.7 s.
  - The poster is a lazy 219 KB 2000 px WebP: it is the same file as plate 1, so it cannot arrive before plate 1.
- **Slow-plate run** (`phoneslowplate-07…10`): the slab and ring hold while the reader scrolls 36 % into the run, then the stage snaps in already zoomed.
- **Laptop, unthrottled:** ready in 2 ms when reached, and the full sequence plays.

## Booking (phone, tapped)

**The path:** hero "Book package now" (1) → the drawer opens at `/book/` with "Book your week" → Level 2 (2) → Shared Twin (3) → Saturday select, Sat 31 Oct 2026 (4) → "+ Men" (5) → "Continue booking" (6).
- **Hand-off:** `…/en/product/level-2-rollers?start=2026-10-31&end=2026-11-07&female=1&male=1&couple=0`.
- **Taps to book: 6.** The audit target is 1 tap to the flow and at most 8 to the engine, so the target is met.
- **Price shown before each choice:**
  - Each level shows "$1,466 pp".
  - Each room shows "Included", "+$140 pp" or "+$418 pp".
  - The docked foot reads "Total for 1 guest $1,466", then "$1,606", then "Total for 2 guests $3,212". These are whole dollars now; the 4f r2 cents are fixed (`phone-book-01…05`).
- **What the visitor understands:** the level and the price are clear before the tap. The step text explains what happens on Bookinglayer ("Nothing is booked until you check out there", 40 % deposit).
- **Remaining:** the level and room thumbnails in the drawer are still small (84×62).

## Reduced motion and JS off

- **Reduced motion** (`reduced-walk-01…14`): no hero video is attached on any frame. The drop is the static two-up plus the bar photograph with the feature line (`reduced-walk-05/06`). It is a complete, calm page.
- **JS off** (`nojs-walk-01…15`):
  - The level media are stills; there are no native video controls (4f r2 fix 5 is done).
  - The static drop shows.
  - The forecast is the plain "See today's forecast for South Point on Rosa" link card.
  - No ghost header sits over white sections.

## Laptop (1440×900)

- **First screen** (`laptop-cold-500`, `-3000`): at 0.5 s, the lodge and its pool on the coast road under the title. At 3 s, the turquoise reef coast. The video plays from 0.36 s.
- **The walk** (`laptop-walk-01…19`) has real rhythm:
  - the asymmetric level grid
  - the breakfast photograph overlapping "What's included"
  - the drop, which opens from an inset rounded frame to full-bleed (`-05…09`)
  - the room viewer with the text beside it
  - the barrel band, then the forecast in two columns with no rule between them
  - the sunset portrait beside the quotes
  - the dusk pool, the Instagram row and the footer
- No height or scroll jumps were logged.

## Against the picked mockup and the current site

- **Against the mockup** (`mphone-hero`, `mphone-drop-0…8`, `mlaptop-*`): the final is faithful to the picked unique mockup and better on the phone.
  - The poster puts the title on the sea, where the mockup had it over the land and road.
  - The drop stage fills the screen; in the mockup it was a 4:5 box between white bands.
  - The cents are gone and the JS-off clips are stills.
  - Nothing that made the mockup good was lost.
- **Against the current site:** clearly better at a glance and over the whole page. It shows this lodge from the air in sun, with one title and one button, against a dark wave with a lead form under it.
  - The price is one scroll down; the current page has none.
  - The rooms are sold with galleries.
  - The booking keeps the package and shows the total from the first tap.
  - The current site's handwritten titles are matched by Parisienne, and its Instagram row and footer are matched.
  - The current site is better in nothing that matters to the traveller.

## Verdict

**Score: 8/10. Pass.** **Better than the current site: yes** (`phone-cold-500` vs `cphone-0`; `laptop-walk-*` vs `claptop-*`). **Taps to book: 6.**

It is engaging and easy to book, and on a normal connection the drop is the best moment of the run, aligned to the pixel. It is not 9 because on the playbook's own slow phone the set-piece mostly does not happen: a slab and spinner, then a snap to the palm. The page is built for that visitor.

**Must-fix, biggest effect first:**
1. **Let the slow phone see the descent.**
   - Start fetching the phone plates much earlier: when "What's included" enters the viewport, or on idle after the hero video has buffered, instead of at 1,400 px.
   - Do not make the plates smaller to save time. On the 390×702 stage, plate 1 at rest is already drawn at 1.25 device px per source px at DPR 2 (cover scale 0.625), so a narrower file would visibly soften it. Gain the time by fetching earlier.
   - When the plates arrive after the reader has entered the run, map the remaining scroll onto the whole sequence (start from p 0 at the ready point) instead of jumping to the current progress.
2. **Make the loading poster a real still.**
   - Use a small separate poster (about 30 KB, ~800 w, or an inline blurred placeholder from the same photograph) that is eager once the levels are in view.
   - Stop reusing the lazy 2000 px plate 1 file as the poster.
   - The stage must never show the flat olive slab or a half-painted image (`phonedrop-load-00/05`).
3. **End the dive in the water.** Give plate 2 a separate `water` point on open pool water, as the concept intended ("until blue fills the frame"), instead of the palm's focal point. The cut to the bar at water level then reads as arriving at the water's edge, not as a cross-fade from a palm crown.
4. **Shorten "What's included" on phones.** Use two columns of short lines, or the first six lines with "All ten", so the 1.5-screen dip between the levels and the drop goes away.
5. **Bigger drawer thumbnails.** Make the level and room images in the drawer about 120 px wide, so the choice is made by the picture as much as by the label.

**Keep:**
- the roofs-and-sea poster with the title on the sea
- the focal-point-driven drop with no library and a fixed height (exact hand-off, no jump)
- the full-height phone stage
- the docked whole-dollar total and the pre-set Saturday
- the room tabs with full-width galleries
- Literata with Parisienne
- the deep-blue booking colour
- the reduced-motion and JS-off pages

## What the designer prompt got wrong

A set-piece's loading tier is checked on the fast profile and on reduced motion, but not on the slow phone at reading pace, where plates compete with the page's other videos. The designer's 4e checks need this line: "On the playbook's slow phone, scroll at human pace from the hero: the first plate's motion must be visible from p 0, and the stage must never show an empty or half-painted box."
