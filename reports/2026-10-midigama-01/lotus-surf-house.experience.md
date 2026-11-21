# Lotus Surf House: experience critique (4f pre-score)

experience-critic 0.2.0 · station 4f (quick), round 1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-03
Pages: `sites/lotus-surf-house/mockups/{calm,interactive,unique}/dist/index.html`, served on :8913 / :8914 / :8915.
Compared with: the business's current presence. It has no website, so that means the Booking.com listing and the Google Maps listing as a traveller meets them (`dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png`, `01-google-listing-fold.png`, audit F1–F6). Also compared with the gold bar (`agents/designer/gold/README.md`, `global-surf-notes.md`).
Written without reading the critic's or the visual-critic's report.

Frames are in `reports/2026-10-midigama-01/experience/lotus-surf-house/` (git-ignored PNGs, plus `calm-walk.log`, `interactive-walk.log`, `unique-walk.log` and `states.log`). Recipes: the scratch Playwright scripts `walk.mjs` (cold phone load, human-pace scroll, laptop, hover, reduced motion, JS off) and `states.mjs` (forced WebGL frames, pointer/drag, floor switch, chooser, tap-through). Chromium ran with SwiftShader WebGL. Phone: 390×844 @2x with touch, CDP 1.6 Mbps / 150 ms RTT and 4× CPU for the cold load. Laptop: 1440×900.

Note on timing: on this machine every captured cold frame, the first one included (requested at 0.5 s), already shows the complete first screen with web fonts. The `load` event came at 6.5–8.5 s. I cannot claim the frames are true 0.5 s paints, only that nothing visibly changes between the first frame and 6 s on any variant.

## Summary

| | calm "The gate" | interactive "Dappled" | unique "Under the net" |
|---|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** | **6 / 10** | **5 / 10** |
| Better than the current presence (Booking.com + Google) | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **pass**, narrowly | **fail**: below 8, and the main item doesn't pull you in (method-5 cap 7) | **fail**: below 8, and the first screen doesn't pull you in (cap 7) |
| Taps to book | 1 (hero → Booking.com listing) | 1 | 1 |
| Hard fails (dimension-8 side) | none | below 8/10 | below 8/10 |

**Experience ranking at 4f: 1 calm · 2 interactive · 3 unique.**
Calm is the only one where the first screen makes you want to walk in. Interactive has the most useful booking moment (the floor switch answers "which rooms have A/C?" in one tap), but its hero photograph and handwriting face don't pull. Unique has the best idea and the kindest chooser ("Not sure: ask Yelum first"), but on a phone its first screen is a small print inside a grid.

The video and photo hard fail does not apply: no usable own video exists (concepts §2: all three clips are third-party with unknown licence), and no photograph reaches 1920 px (largest 1600). I accept the concept's reasons.

**The current presence, honestly.** A traveller today meets the Booking.com fold: blue search bar, a 9.0 badge, the ping-pong table in a 1/42 carousel, then "Choose dates to see prices" on yellow. Or they meet the Google fold: 4.9 (78) and Directions / Start / **Call**. Two things there are better than all three mockups:
- Booking.com shows live prices on the same page after the dates. Here they come one tap later, on Booking.com.
- Google puts **Call** on the first screen. All three mockups show Call only one scroll down, or in the phone bar once the hero has left view (`*-walk.log`: the bar is hidden at s00–s01 and visible from s02, y ≈ 1180).

Everything else favours the mockups: the house in its own pictures and words, with no rival hotels, no sign-in and no sponsored button. The plain fan / A/C truth per room fixes F4.

---

## 1. Calm: "The gate", 8/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| first frame → 6 s | The carved gate full-bleed (img-019), with "Lotus Surf House" in Parisienne on two lines and "Midigama, Sri Lanka" centred over the doorway. Under them, one brick-red "Check dates on Booking.com" button (54 px tall, at y 478). Small wordmark top left. Nothing moves except the one-time settle. | `calm-phone-t500/t1500/t3000/t6000.png` |

Feeling: you are standing at a garden gate with light behind it, and it is an invitation. It is clean, has one action and is not a template section. This is the best first screen in the set. On the laptop (`calm-laptop-t2000.png`), the 6/6 split puts a one-line script title and the button on white, with the gate full height on the right. It is composed and quiet, and it is sharp because the photograph is shown at native size.

### Walk (phone, 0.7 screen per step: `calm-phone-s00…s18.png`, about 13 screens)
- **s01–s02:** "A guesthouse in Midigama…", the details line, the two dated rating cards, then Book + Call. What, where, trust and action all arrive within one scroll.
  - The rating cards break "125 reviews | 3 Nov 2026" over three short lines, which looks fussy (s02, `calm-phone-reduced-s1.png`).
- **s03–s08, In the garden + three garden rooms:** img-020 (hammock, shade tree), then each fan room with a 4:5 slideshow, beds, the honest "no air conditioning and no hot water" and its own button. "Old rooms and new" in Yelum's voice sits between the rooms; it is the best line on the page.
  - **This is where attention drops.** Three stacked rooms in a row, each led by a large 2021 fisheye photo of a bare white room, run for about four screens with the same layout.
- **s09–s11, the porch:** the red porch print, "Yelum", "Breakfast", and Fiona's long quote. It is warm, but it is a lot of grey text on the phone.
- **s11–s12, The King Rooms:** a strong photograph (img-002, the net and the balcony). The upstairs rooms are the house's best product, yet they arrive at screen 8. On the phone the six-photo slideshow is only 390 px wide, so the best room is shown small.
- **s13–s14, the roof:** the Buddha and the terrace. A lift.
- **s14–s16, Guests:** **Fiona's quote again**, as the first slide (it already filled the porch), so the reader sees the same 70 words twice within four screens.
- **s16–s18:** Getting here, Good to know, the closing line in the script, and a real footer with buttons. Good.
- The phone bar (accent button + phone icon) appears once the hero leaves view and stays in every frame from s02 (`calm-walk.log`). Nothing covers content.

### The story after one scroll
What, where and trust: yes. Why this place: the gate and the garden say "quiet family house", which is right. **The surf**, the word in the business's name, never appears as a picture, and it appears only in words late on. Cost is answered honestly as "live dates on Booking.com".

### Wanting to go
Lifts: the gate, img-020's hammock, the King room's net and balcony, the roof Buddha. Deflates: the run of fisheye garden-room photos, and the repeated Fiona quote.

### Booking
1 tap: the hero link goes to `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html` (`states.log`, the first request equals the dossier URL). It matches the audit (`engine`, 1 click). Each room has the same link. Call (`tel:+94774647541`) sits beside every main action. A traveller knows which floor they are booking before the tap, which is better than Booking.com's summary (F4).

### Motion and states
- On the laptop, 63 of 65 links and buttons carry transitions. The hero CTA hover lifts its shadow and darkens to `#9E3816` (`calm-laptop-hover-cta.png`).
- Slideshow arrows move 350 ms (`calm-phone-slide-mid/next.png`).
- Reduced motion and JS off both give the same composed page, with the bar static at the foot (`calm-phone-reduced-*`, `calm-phone-nojs-*`).
- There is no main item, which is correct for calm.

### Against the gold bar
This page has the discipline of Global Surf (header, one title, one short line, one button, the business's best image). It lacks the footage, and that is a fact about the material, not a design failure. Below the fold it is less of a sequence of "moments" than gold: the room run is a repeated template block.

### Score: 8, better than the current presence: yes
It is engaging at the first screen, clearly better than the listing, and 1 tap to book. It is held at 8, not higher, by a middle that sags (four screens of near-identical fan rooms) and the best rooms arriving late and small.

**Fix list (biggest effect first)**
1. On the phone, merge the three garden rooms into one block: one shared slideshow and three compact rows (label | beds | fan note | button). That is four screens of weak photos down to about one and a half.
2. Give the King Rooms more weight: a full-bleed img-002 or img-025 moment on the phone before the slideshow, and consider moving the King Rooms above the garden rooms (or a one-line "Upstairs: A/C · Garden floor: fan" jump in the glance section).
3. Don't repeat Fiona: start the guests slideshow on another quote (Svenja's roof yoga / "4 surfspots" brings the surf in).
4. Rating cards on the phone: two lines ("9.0/10" / "Booking.com · 125 reviews · 3 Nov 2026" at a smaller size, or the date under the pair once) instead of three wrapped lines.
5. Show the phone icon in the hero area too (a small "Call" text-button under the CTA, or the bar from load). Google's Call is on its first screen, and the audit's secondary action is `tel`.

**Keep:** the gate first screen on both widths; Parisienne titles; the brick-red accent used only for booking; the plain fan / A/C notes; "Old rooms and new" in Yelum's words; the footer.

---

## 2. Interactive: "Dappled", 6/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| first frame | img-020 full-bleed: canopy over the top half, the trunk, a strip of hammock, lawn and dusty ground. "Lotus Surf House" in Patrick Hand, white, the town, and the blue button. The light canvas starts fading in (opacity 0.06). | `interactive-phone-t500.png`, `interactive-walk.log` |
| 1.5 s → 6 s | The canvas is fully on (`light on`, opacity 1), but on screen nothing visibly changes. | `interactive-phone-t1500…t6000.png` |

**The main item.** I forced the shader (`?light=force`) and captured frames 1.5 s apart. Over 3 s the whole frame differs by PSNR 30.7 dB on the laptop and 35.4 dB on the phone, so the light really moves. But a crop of the lawn and the hammock side by side at 0 s and 3 s (`interactive-laptop-light-0.png` vs `-3000.png`) looks identical to the eye. It passes the concept's "not an overlay" test. It fails the experience test: a visitor will not notice anything is alive, so the hero is effectively a still photograph.

And as a still, img-020 is not a hero image. On the laptop (`interactive-laptop-t2000.png`):
- the bottom third is bare dirt with dead leaves;
- the left is a grey rendered wall;
- the right is a cinder-block wall and the ping-pong table;
- at 1440 the 1600 px source looks soft.

Patrick Hand, set large and white, reads as a casual marker label rather than a tasteful title. The calibration says "fonts must be tasteful and readable; Barlow Condensed… judged not great". This is in that territory.

**Cap:** the first screen does not pull you in, and the main item does not register. That caps the score at 7 (method 5).

### Walk (phone: `interactive-phone-s00…s13.png`, about 10 screens)
- **s01–s02:** a 2×2 grid of grey icon cards (beach 250 m, breakfast, "Live dates on Booking.com", ratings). It is useful but the most templated block of the set; "Live dates on Booking.com" as a fact card is filler.
- **s02–s05, Choose your floor:** the best moment of the page. The pill slides between Garden floor | Upstairs | Roof (`interactive-phone-floor-garden / -up-mid / -up / -roof.png`). Each garden room is an expandable tile with a "Fan, no A/C, no hot water" chip (`interactive-phone-tile2.png`).
  - Problem: the page is now a stack of white rounded cards on grey, which feels like an app settings screen rather than a guesthouse.
- **s05–s07, In the garden:** the blue ping-pong table (img-001) beside the intro, then the amenities.
- **s07–s09, Breakfast:** Fiona's quote set large in Patrick Hand over most of a screen. At that length the handwriting face is tiring to read.
- **s09–s10, Guests:** big figures (digits roll in; the laptop frame `interactive-laptop-s05.png` caught "0.0 / 0.0" before the roll), then a swipe row of review cards with peek. This works.
- **s11–s13:** Getting here, the closing line and the footer.
- **Phone bar:** "Check dates on Booking.com" plus a phone icon plus ˄. The ˄ opens the audit-ordered summary (`interactive-phone-bar-open.png`). The label fills its button edge to edge with almost no padding (s02–s13).
- In every variant, the upstairs King Rooms appear only after a tap on "Upstairs", so a scroller who never taps never sees the best room on the phone.

### Booking
1 tap: the hero link goes to the dossier's Booking.com URL (`states.log`). From the floor tiles, 2 taps (tile, then "Check dates"). The price is honestly "live dates". The floor switch is the clearest A/C answer of the three variants.

### Motion and states
- On the laptop, 42 of 48 interactive elements have transitions. The rating links and the wordmark have none.
- The CTA lifts 2 px on hover with its shadow (`interactive-laptop-hover-cta.png`).
- Reduced motion: the canvas is `display:none` and the still stays.
- JS off: the floors stack under their headings (`interactive-phone-nojs-s1/s2.png`). The first garden slideshow image was still an empty beige box 0.7 s after the scroll in that run.

### Score: 6, better than the current presence: yes
It is easy to book and answers the A/C question better than anything else. But it is fine and forgettable: a backyard photograph with an invisible effect, a comic-leaning title face and card-heavy sections.

**Fix list**
1. Make the main item visible or change the hero photograph. Either raise the light drift until a viewer sees the sun patches move within 2 s (still on the photo's own light, never added on top), or run the shader on img-002 / img-025, where moving leaf-light through the balcony glass would be visible and beautiful. Crop img-020 so the dirt floor doesn't fill the bottom third.
2. Replace Patrick Hand for titles (at least for the hero and the long Fiona quote) with a more refined hand. Keep long quotes in the text face.
3. Reduce the card chrome: make the 4-up fact grid one " | " line or plain text, and give the floor tiles no borders on a white ground, so the sections read as a house, not a settings panel.
4. Show the King Rooms without a tap on the phone: open on Upstairs, or put the King photo above the switch.
5. Give the phone bar label room: the shorter "Check dates" (as unique does) or 12 px side padding.

**Keep:** the floor switch and its fan / A/C chips; the swipe review row; the table-blue accent used only for booking; the honest "Old rooms and new" placement.

---

## 3. Unique: "Under the net", 5/10

### Timeline (phone, throttled)
| t | On screen | Frame |
|---|---|---|
| first frame → 6 s | White page: "Lotus Surf House" in Allura, the town, then img-025 as a print about 250×330 CSS px inside a pale grid of mesh with soft vertical folds, then a brown hem curve. The violet button sits at y 738, near the bottom of the screen. Both net canvases are on (opacity 1). | `unique-phone-t500…t6000.png` |

With `?net=force`, the phone net sways on load: PSNR 31.2 dB between 0.3 s and 2.3 s (`unique-phone-net-sway0/sway1/rest.png`).

**The main item, walked.** On the laptop (`?net=force`) I moved the pointer diagonally across the print. Rest vs pushed frames differ by only PSNR 40.1 dB, and side by side (`unique-laptop-net-rest.png` vs `-push.png`) the net barely moves. What a visitor actually sees (`unique-laptop-t2000.png`) is:
- a small photograph (about 360×480 on a 1440×900 screen);
- an off-white panel of fine square grid around it, which reads as **fly-screen or graph paper rather than gauze**;
- a brown smile-shaped hem under it.

As a whole it reads like a lampshade or a paper bag around a thumbnail. That is the concept's own named failure ("a gimmick around a thumbnail", concepts §4.3). The closing net (`unique-laptop-s12/13.png`, `unique-phone-s19.png`) reads as a white bowl above the closing line.

**Cap:** the first screen does not pull you in, and the main item is not felt. That caps the score at 7.

### Walk (phone: `unique-phone-s00…s20.png`, about 14 screens, the longest)
- **s01–s02:** the facts paragraph and the dated rating cards (which wrap to three lines, as in calm), then Book + Call.
- **s02–s05, From the roof down:** stepped photographs of the roof, the King room and the garden, each with a small "See the …" button. On the phone the steps collapse into a plain stack, so the idea is lost there and it becomes three photo cards.
- **s05–s07, The King Rooms:** two slideshows (3:2 and 4:5). Good photographs, sold properly.
- **s07–s10, Old rooms and new + masonry:** the masonry mixes the fisheye bathroom, the toilet and the porch at small sizes. It is honest but cluttered.
- **s10–s13:** Fiona's quote at reading size, Yelum, Breakfast and the Buddha print. Calm and warm.
- **s13–s15:** the offset roof pair, then the amenities.
- **s15–s20:** Guests, the gate print with Getting here, the closing net and the footer.
- **Phone bar:** "Check dates" + "Choose a room" + phone, from s02 to the end.

### Booking
- 1 tap: the hero link goes to the dossier's Booking.com URL (`states.log`).
- **The chooser** (bar → "Choose a room") slides down from the top with a hemmed edge (`unique-phone-chooser-mid / -chooser.png`). Its three tiles are "Garden room: fan, on the ground floor", "King Room: A/C, upstairs" and "Not sure: ask Yelum first" (`-chooser-garden`, `-chooser-unsure.png`). "Not sure" shows Yelum's quote and a Call button. It is the most human booking step in the run and matches the audit's closing intent.
  - On open, focus lands on the close button ("x"), not the first tile as the notes say.
  - Esc closes the chooser and returns focus to the bar button (`states.log`).
- Taps to a room's dates: 3 (bar → tile → "Check dates").

### Motion and states
- On the laptop, 58 of 60 interactive elements have transitions. The CTA hover darkens and deepens the shadow (`unique-laptop-hover-cta.png`).
- Reduced motion: the still SVG net (`unique-phone-reduced-hero.png`).
- **JS off has a visible bug:** the transparent fixed wordmark scrolls over the body text, and "Lotus Surf House" overprints "Breakfast is included… 8 to 10 in the morning" (`unique-phone-nojs-s1.png`) and "See the roof" (`unique-phone-nojs-s2.png`). Calm and interactive don't do this.

### Score: 5, better than the current presence: yes
It is better than a Booking.com fold. But the first impression is a small photo in a grid, the signature effect is barely felt, and the page is the longest of the three. A traveller would not feel "I want to be there" until the King slideshow, five screens in.

**Fix list**
1. Make the photograph the subject: on the phone the print should be near full-width (≥ 340 px wide, the 1200 px source allows it) and on the laptop at least the concept's 520×693. Bring the button inside the first 700 px.
2. Make the net read as gauze, not graph paper: no visible square grid at 1× (a finer, softer weave or noise-based translucency), folds as the main signal, and a clearly visible part around the pointer or finger (at present 40 dB, which is invisible).
3. Fix the JS-off wordmark (absolute without JS, as calm and interactive do), and send chooser focus to the first tile.
4. Cut length on the phone: the "From the roof down" stack repeats photos used again two sections later (img-021, img-002, img-020). On the phone, either keep the stepped rows or the later sections, not both.
5. Rethink the closing net: as drawn it reads as a bowl. Make it smaller and lighter, or drop it, so the closing line and buttons carry the end.

**Keep:** the idea of the net, if it can be made to read as gauze over a large photo; the "Choose a room" chooser with "Not sure: ask Yelum first"; Allura + Gelasio (tasteful, and the most "stay"-like voice); the violet accent from the offering flower.

---

## What the designer prompt got wrong (one paragraph, quotable)
With no footage and no 1920 px photographs, both WebGL main items were tuned so subtly that they fail the visitor's test, even though they pass the concepts' "not an overlay" test. The light drift is invisible within 3 s (whole-frame PSNR 30.7 dB, identical to the eye in crop), and the net barely parts under the pointer (PSNR 40 dB). A main item a traveller cannot see does not lift the first screen, and here it also cost the photograph its size (unique) or chose a weaker photograph to carry it (interactive, img-020's dirt ground). For a business whose material is photographs of rooms and a garden, the designer should be told to put the strongest photograph (gate, balcony, King room) large first and make any effect visibly serve it. On the phone, it should also collapse runs of weak, near-identical room blocks into one compact block.

---

## Round 1 — full (station 5)

experience-critic 0.2.0 · station 5 (full), round 1 · run `2026-10-midigama-01` · 2026-11-04
Page: `sites/lotus-surf-house/final/dist/index.html`, served at http://localhost:8960/ (Alon's `astro preview`; not restarted).
Compared with: the business's current presence, re-walked today on a phone (Booking.com listing, `r1-current-booking-fold/s1/s2/s3.png`; it has no website), and with the gold bar.
Written without reading the critic's or the visual-critic's report.

Frames and logs are in `reports/2026-10-midigama-01/experience/lotus-surf-house/`, all prefixed `r1-`:
- `r1-walk.log` + `r1-phone-t*/s*`: the cold throttled phone load (1.6 Mbps / 150 ms / 4× CPU).
- `r1-phone-w00…w15.png`, `r1-laptop-w00…w11.png`: the human-pace walk (60 px steps, a frame every 0.75 screen). The `r1-phone-s*` smooth-scroll frames are unreliable: several caught the page back at the hero. Use the `w` frames.
- `r1-states.log` + `r1-phone-header-y600/y700`, `r1-phone-guests-*`, `r1-phone-garden-show`, `r1-phone-bar`, `r1-laptop-hover-*`: the states and the tap-through.
- `r1-phone-reduced-*`, `r1-phone-nojs-*`: reduced motion and JavaScript off.

Scratch recipes (not committed): `walk.mjs`, `scroll.mjs`, `states.mjs` and `cur.mjs` in the session scratchpad.

### Summary
| | |
|---|---|
| **Dimension 8 (experience)** | **8 / 10** |
| Better than the current presence | **yes** |
| Pass / fail (this critic) | **pass** |
| Taps to book | **1**: the hero "Check dates on Booking.com" goes to `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html`, and so does the phone bar (`r1-states.log`). Audit target: engine, 1 |
| Hard fails (dimension-8 side) | none. There is no usable own video (all three clips are third-party, licence unknown) and no photo is ≥ 1920 px. The first screen is the business's best photograph, and I accept that |

### Timeline (phone, cold, throttled)
| t | On screen | Frame |
|---|---|---|
| 0.5 s → 6 s | The gate (img-019) full-bleed. "Lotus Surf House" in Parisienne, then the tagline, then the brick-red "Check dates on Booking.com" (350×54 at y 696) and an outlined "Call +94 77 464 7541" under it. Wordmark top left. Fonts are already loaded at the first frame. Only the gate settle (1.4 s) moves | `r1-phone-t500…t6000.png` |

Load finished at 6.35 s. Every request went to `localhost:8960` and nothing else (`r1-walk.log`). As at 4f, I can't claim the first frame is a true 0.5 s paint. I can only say nothing changes on screen after it.

Feeling: it is still the best first screen of the run. It is an open garden gate with light behind it, one action, and now Call right there too. That closes the gap with Google's first-screen Call that I noted at 4f.

### Walk (phone, `r1-phone-w00…w15`, about 11.5 screens; it was about 13 at 4f)
- **w01, the first scroll: a defect.** The fixed wordmark is transparent and white. It overprints the hero's tagline as the hero scrolls under it: "Lotus Surf House" sits on "A guesthouse in Midigama" (`r1-phone-header-y600.png`; `r1-states.log` shows the header `rgba(0,0,0,0)` at y 300–700 and hidden only from y 900). Every visitor sees it on the first flick, so it is the one moment that looks unfinished.
- **w01–w02, the King Rooms:** img-002 full-bleed with "Upstairs / The King Rooms" and the line about the balconies. This is the strongest second screen the page could have. Then img-025, the balcony, large.
  - This is Alon's order, and it works: the best product arrives at screen 2, where at 4f it came at screen 8.
- **w03, the King facts:** "1 extra-large double bed, sleeps 2 · Upstairs, 25 m². Air conditioning, fan, mosquito net and hot water", then Book + Call and "Check-out 11:00–12:00 | Check-in at any hour | Cash only". The details are compact, separated by " | ", which is right.
  - Then a 2×2 grid of four 169 px thumbnails. **They are dead ends:** no link, no lightbox, no hover, `cursor:auto` (`r1-states.log`, "small images"). A traveller who wants a closer look at the bathroom or the second bed tries to tap and nothing happens.
- **w04–w05, the roof:** a tall img-021 Buddha, "Up on the roof", and two smaller photos. It is a lift, as at 4f.
- **w05, at a glance:** the two dated rating cards now sit on two lines each (fixed since 4f), then "Midigama Beach 250 m | Breakfast included, 8–10 | Check-in any hour".
  - **The trust proof has moved later:** it is at screen ~5 (y ≈ 3,160) where at 4f it was within one scroll. Booking.com puts "9.0 Superb · 125 reviews" on its first screen (`r1-current-booking-fold.png`).
- **w06–w09, the garden:** the garden text, Yelum's "Old rooms and new" quote and img-020's hammock. Then **one** slideshow beside three compact room rows (beds | ground floor, m² | fan, no A/C, no hot water) and one button (`r1-phone-garden-show.png`).
  - This is 4f fix 1, done well: the sag of four look-alike rooms is gone. The fisheye 2021 photos still lead the slideshow, but there is only one of them on screen now.
- **w09–w10, the porch:** the red porch photo, "Yelum" with his own quote, "Breakfast". Fiona is no longer here, so she is quoted once on the page (`r1-states.log`: Fiona 1, "oasis" 1). That is 4f fix 3, done.
- **w11, Guests:** Fiona's review (13 centred lines at 390) is still slide 1. Slide 2 is Benjamin's (`r1-phone-guests-next.png`).
  - **The surf only exists in slides 3+.** "4 surfspots, suitable for everyone from beginner/intermediates to highly advanced", "surf at lazy left and right" and "breakfasts every day after surfing" are all in the slideshow. But a scroller who doesn't tap ›, as most won't, never meets the word "surf" outside the name (`r1-states.log`: "surf" appears in visible text only as "Lotus Surf House").
- **w12–w15:** Getting here (station 50 m, beaches by distance, the address, amenities joined with " | "), Open in Google Maps + Call, Good to know, the closing line in script, then a designed footer with buttons. This is the bar's "real footer".
- **The phone bar** (Check dates + a round phone button) shows from w02 to the end and never covers content (`r1-walk.log`: bar from y 1182).

### The story after one scroll
What, where and the best room: yes, by screen 2, told through photographs and not tables. **Cost:** "live dates on Booking.com" is honest, but the price is still one tap away (inherent in the material). **Why this place:** the house, the garden, the roof. **The surf**, the word in the name, never appears as a picture or above the guests slideshow. Trust arrives at screen 5.

### Wanting to go
- Lifts: the gate; the King band (img-002); the balcony (img-025); the roof Buddha; the hammock.
- Deflates: the overprinted wordmark on the first scroll; the dead thumbnails; a 13-line centred review as the first thing in Guests.

### Booking
1 tap from the hero, the King block, the garden block, the bar, the closing and the footer. All 9 links are the dossier's engine URL; the one `tel:` is `+94774647541` (`r1-walk.log`). The traveller knows the floor, the A/C / fan truth and the beds before tapping. That beats the Booking.com fold, where room facts are three screens down behind "Show prices" (`r1-current-booking-s3.png`).

### Motion and states
- On the laptop, 43 of 45 links and buttons transition; the exceptions are the skip link and the wordmark (`r1-walk.log`).
- The hero CTA hover darkens to `#9E3816` with a deeper shadow. The hero Call fills to a 6 % tint (`r1-laptop-hover-call.png`).
- The nav "Guests" smooth-scrolls to the section (scrollY 6,435).
- The review › cross-fades (`r1-phone-guests-mid/next.png`). The slideshows have arrows and dots.
- The only CSS animation is the gate settle (`r1-states.log`). There are no scroll reveals, which is right for calm.
- The King thumbnails have no state at all, the only interactive-looking images on the page that do nothing.
- Reduced motion gives the same page without the settle (`r1-phone-reduced-*`).
- JS off is a good page, with the wordmark absolute (no overprint). But the static bar sits over the hero's Call button on the first screen (`r1-phone-nojs-hero.png`). That is minor, since the bar carries its own phone button.

### Laptop (1440 × 900, `r1-laptop-w00…w11`)
- The 6/6 split hero is composed. The King band is full-bleed and gorgeous at 1440 (w01).
- **The King block (w02–w03) is the weak spread:** img-025 at about 480 px on the left, a short facts column floating mid-height on the right with wide empty space, then four ~270 px thumbs on their own row. The best room gets less presence on the laptop than on the phone.
- Roof, glance (two centred cards), garden (the wide hammock photo, then the slideshow + room list), porch, Guests, Getting here and the closing all read as distinct, well-spaced sections.

### Against the current presence (Booking.com, walked today, `r1-current-booking-*`)
Booking.com is better at two things: the score on screen 1, and live prices in the same place after the dates (the yellow "Choose dates to see prices" panel). Everything else favours the new page:
- the house in its own best pictures, where Booking.com leads with the ping-pong table (1/42);
- no "Sign in, save money / Genius" interruptions (they appear twice in four screens);
- the A/C and floor truth up front;
- a Call button. Booking.com has none (audit F1).

### Score: 8 · better than the current presence: yes · pass
Since 4f it is clearly better: the King Rooms are second, the garden run is compact, Fiona appears once, Call is in the hero, and the rating cards are tidy. It stays at 8, not 9, because of the wordmark collision on every first scroll, dead King thumbnails, trust late and surf invisible.

**Fix list (biggest effect first)**
1. **Phone header over the hero:** hide the wordmark (or make the header solid) once the hero text reaches it, at about y 250. Or fade the wordmark out over y 200–300, as it already hides from y 900. Today it overprints the tagline on the first flick (`r1-phone-header-y600.png`).
2. **Make the King thumbnails tappable:** open them in the King slideshow or a simple lightbox with arrows and swipe, with a hover/press state. On the laptop, let img-025 and the facts share the height (a 7/5 split, facts vertically centred on the photo), so the best room's spread has no empty half (`r1-laptop-w02/w03`).
3. **Bring the surf in, from the reviews:** start Guests on a short review that names the surf. "…a few minutes walking distance to 4 surfspots, suitable for everyone from beginner/intermediates to highly advanced surfers" and "…to go and surf at lazy left and right" are verbatim and dated. Or add one sourced "| walk to the surf spots (guests)" item to the glance line. Today "surf" is visible only in the name.
4. **Trust earlier:** put a one-line "9.0 Booking.com · 4.9 Google" (dated, small) under the King facts or at the foot of the King band. Or move the glance block above the roof. The proof now arrives at screen 5, where Booking.com shows it on screen 1.
5. **JS off:** don't let the static bar cover the hero's Call button (bottom padding on `.hero` under `.no-js`, or hide the bar inside the hero) (`r1-phone-nojs-hero.png`).

**Keep:** the gate first screen with Book + Call; Alon's order (King band, then balcony, then roof); the full-bleed King band; the merged garden block with its plain fan / A/C lines; Yelum's own quotes; Parisienne + Hanken Grotesk; brick red used only for booking; the " | " detail lines; the footer; JS-off and reduced-motion pages that are whole.

## Verification 1

experience-critic 0.2.0 · station 5 (full) · 2026-11-06 · live preview https://lotus-surf-house.os1.workers.dev/ · phone 390 × 844 (touch, ~1.6 Mbps, 150 ms RTT; 4× CPU for the cold load only) and laptop 1440 × 900. Frames, logs and walk scripts: `experience/lotus-surf-house/verify-1/` (`phone/`, `states/`, `laptop/`, `presence/`, `phone.log`, `states.log`). Scored against the current presence (Booking.com and Google listings); the business has no site.

**Score 7/10 · FAIL (below 8) · better than the current presence: yes · taps to book: 1.**

The page itself is still the good one: the gate, the King band and the roof all pull. It fails on two visible finishing defects, both small: the forecast block breaks a named calibration bar, and a grey band sits at the top of every phone screen below the hero.

Independence note: I walked and judged before reading any earlier verdict. While checking how this file ended, after the walks, I saw the last lines of Round 1's fix list (its items 3–5 and the keep list). My score was formed from this round's frames. Fixes 3 and 5 below overlap with those lines, and I re-checked each on the live page.

### Cold load, phone

| Frame | What shows |
|---|---|
| `phone/cold-0.5s.png` (taken 0.5–2.2 s) | Green placeholder, name, one line, both buttons. Readable and tappable already |
| `phone/cold-1.5s.png` (taken 2.2 s) | The same; no photo yet |
| `phone/cold-3s.png` (taken 3.0 s) | Only the top ~80 px of the gate photo has painted, as a hard-edged strip over the green |
| `phone/cold-6s.png` (taken 6.0 s) | The whole gate. This is the moment that pulls you in |

First load: 871 KB, 13 requests, one host, no third party, CLS 0.0018 (`phone.log`). The LCP API read 1968, 1012 and 504 ms over three throttled runs, but frame 3 s shows the photo unfinished well after the lowest of those, so on this line the number is kinder than the eye. The hero already has `fetchpriority="high"` and a preload. Nine lazy photos down to y ≈ 3,481 are fetched during first load and compete with it (`phone.log`). Emulated, so a real phone may differ.

### The walk

- **First screen (`phone/cold-6s.png`):** full-bleed gate, script name, one line, a clear rust CTA, a Call button. Clean and specific to this house. The cap at 7 for a weak first screen does not apply.
- **After one scroll (`phone/scroll-01.png`, `scroll-02.png`):** I can say what and where, and the King Room says why. I cannot say what it costs: no price anywhere, by design, because the audit makes price mean the link to live dates. The story is told through pictures, not tables.
- **Wanting to go:** peaks at the balcony view (`phone/scroll-02.png`) and the roof Buddha (`phone/scroll-05.png`). This is the page's real strength.
- **Attention drops:**
  - the garden rooms, whose slideshow opens on a bare white wall with shelves and a door right after the prettiest stretch (`phone/scroll-08.png`), while its second slide is the better room and the only surfboard on the page (`states/slide-after.png`);
  - the long unbroken text of Yelum, Breakfast and Guests, with no picture on screen for two stops (`phone/scroll-12.png`, `scroll-13.png`; `inView: 0` in `phone.log`);
  - Getting here, whose six wrapped lines of " | " amenities read as a spec sheet (`phone/scroll-14.png`).
- **Trust arrives late:** the ratings are about 3,800 px down (`phone/scroll-06.png`). Booking.com and Google both lead with them.
- **Surf:** in the text visible on arrival above the forecast, "surf" appears only in the business name. The first two reviews don't mention it, the third does, and the first that names Lazy Left is the 4th, three taps in (`phone/scroll-13.png`, order from the live HTML).

### Booking

- **Hero CTA, 1 tap:** same tab, lands on the correct Booking.com listing in 3.5 s (`states.log`, `presence/booking-fold.png`). Stopped there: no dates, no sign-in.
- **From anywhere below the hero:** the bar gives Book and a phone icon (`phone/scroll-08.png`). 9 Booking links, 6 `tel:+94774647541` links, read and never tapped (`states.log`).
- **Understood before the tap:** which room, fan or A/C, cash only. Not the price.
- **Trust:** it feels honest, because "Check dates on Booking.com" says exactly where you are going.

### Motion and states

- Fits the calm brief and works: slideshow tap and swipe both move and the dots track (`states.log`, `states/slide-after.png`); header and bar swap on leaving the hero; no long tasks or stutter showed in the frames, and the only layout shift in the walk was 0.0018 at load.
- Rough edges:
  - the fixed header name collides with the script title as the hero rises (`phone/scroll-01.png`);
  - the review cross-fade is a double exposure of two long texts mid-way (`states/quote-mid.png`), acceptable at 300 ms.
- Reduced motion: no animations running (`states.log`, `states/reduced-top.png`). JS off: the page stands, one host, links live, but the static bar covers the hero's Call button (`states/jsoff-top.png`).
- Inspector: 9 FAIL, 6 WARN. Evidence I accept: `hairline` on `div.fc.live`, `headline-lines` on the closing sentence (3 lines at 390), 17 font sizes. Discounted: `still-page` and `no-footage` (a calm concept with no usable video), `reduced-hidden` (the nav is meant to wait for the scroll), `covered-text` (the sticky bar passing over text during scroll).
- Review dots are 15 px wide and the arrows 40 px against the 44 px floor (`states.log`); the critic's dimension, noted here because I felt it.

### The forecast block (the change this round)

**Mechanically it is very good.**
- No third-party request on first load. It loads near the viewport, and the widget was ready before it reached the screen (`phone.log` stops 14–15).
- About 122 KB after scroll: Rosa data 10, widget 10, Google Fonts inside the frame 50, Esri tiles 52.
- Page height 10,807 before and after; CLS unchanged across the whole walk.
- A vertical swipe starting inside the widget still scrolls the page (301 px); a sideways swipe changes the day and opens nothing (`phone/fc-widget-swiped.png`).
- Fallbacks: JSON blocked and JSON two days old both drop the numbers and show the Rosa link; widget blocked keeps the headline and shows the link (`states.log`).

**As an experience it adds something real and is not yet part of the page.**
- **Gain:** it is the first surf content on a page called Surf House, and neither listing has it. For a surfer, 0.9–1.4 m with a 16.6 s swell and Rosa's green "Epic" is a real jolt (`phone/fc-card.png`).
- **No reason given:** nothing says what Lazy Left is to this house. The block arrives after the address and house rules, untitled, under a rule. Google's map shows the pin beside the house at a glance (`presence/google-fold.png`); here the satellite shows no house. A traveller who doesn't know the name learns nothing.
- **Breaks a named calibration bar:** references.md, "without stretched spacing or dividing lines (the forecast section)". The block has a 1 px rule above it with 64 px either side on the phone and larger gaps on the laptop (`phone/fc-card.png`, `laptop/forecast.png`, inspector `hairline`). On the laptop the 500 px left card spreads credit, number and update line apart with empty space between them, beside a white widget of a different visual weight (`laptop/forecast.png`). That calibration says a page showing any listed point is below 8.
- **Long on a phone:** 925 px, nearly half of Getting here (1,984 px), and the card's height range repeats the widget's 18:00 row (`phone/fc-widget.png`). The closing moves further down; the sticky bar means booking is unaffected.
- **Failure can leave a hole:** with the JSON blocked and the block already on screen, about 425 px of blank page sits above the link, which falls behind the bar (`states/json-blocked.png`). The playbook says never an empty box. The stale case takes the same `off` state (`states.log`). An accidental real outage during an earlier run collapsed the block cleanly when it failed below the screen, height 10,807 to 10,447 with no shift; that run's frames were discarded as contaminated.
- **The clock:** on a phone set to Colombo at 02:47 on Saturday, the headline says Friday 20:30 and Rosa's widget says "Today, 11/6" (probe output, recipe `walk-probe.cjs`). The headline's dated line is honest. The widget's label is Rosa's and can't be touched. Minor, and it clears when Rosa next publishes.

**Net:** right content, unfinished placement. It does not hurt booking or speed, and it gives the page its only surf moment, but as built it costs the score rather than earning it.

### Laptop

The split hero works: gate on the right, name and button on calm white (`laptop/settled.png`). The King row is composed (`laptop/scroll-02.png`) and the glance cards are tidy (`laptop/scroll-05.png`). The header stays with a clear focus ring (`laptop/forecast.png`). The white half of the hero is plainer than the phone's full bleed; it is less gripping but clean.

### Against the current presence

- **Where the listings are better:**
  - the rating is on the first screen (`presence/booking-fold.png`, `presence/google-fold.png`);
  - the date picker is on the first screen, so a price is closer;
  - 42 and 150 photos against our 18;
  - Google's map answers "how near is the sea and the surf spot" instantly, with Directions and Call one tap away.
- **Where this page is better:**
  - it looks like a place, not a ping-pong table under a blue bar;
  - it says plainly which rooms have A/C, and has the hosts' voice and a phone number before booking, which Booking.com withholds;
  - one name, one number, no competing hotels, no Google sign-in sheet over the page (`presence/booking-fold.png`);
  - a live forecast.

**Better: yes, clearly.** Note that Google now shows 79 reviews against the page's dated 78, which is correct as dated.

### Fix list (biggest effect first)

1. **Finish the forecast block.** Delete the rule and close the spacing. On the laptop, tighten the left card so its contents sit together. Give it a reason with what is already sourced: Giada's verbatim line from the Guests list ("The location is perfect to go and surf at lazy left and right", Giada, Italy, Booking.com, Dec 2025) above the numbers, plus a plain "the Rosa spot nearest the house". On failure, show the link in the card's place rather than a blank.
2. **Fix the phone header scrim.** `.top::before` stays at opacity 1 with `bottom:-28px` after `.top.solid` slides up by 64 px, so a 28 px grey band sits at the top of every screen below the hero (`states/scrim-white-section.png`, `phone/scroll-12.png`, `phone/fc-card.png`). Hide it on `.solid`. Fade the header name as the hero rises at the same time (`phone/scroll-01.png`).
3. **Bring the surf and the proof up.** Start Guests on a review that names the surf, and add a small dated "9.0 Booking.com · 4.9 Google" and a jump link to the forecast near the King facts. The page then answers "is this a surf house, and is it good" well before 3,800 px.
4. **Lift the garden stretch.** Open the slideshow on the room with the surfboard, not the bare wall (`states/slide-after.png`, `phone/scroll-08.png`), and put one picture in the Yelum / Breakfast run (`phone/scroll-12.png`).
5. **Tidy the ending.** Cut the closing sentence to one short line (3 lines of script at 390, `phone/scroll-17.png`), trim the " | " amenities to what a traveller decides on (`phone/scroll-14.png`), and stop the JS-off bar covering the hero's Call (`states/jsoff-top.png`).

**Keep:** the gate first screen; Alon's order of King band, balcony, roof; the plain fan and A/C lines; "Check dates on Booking.com" with the phone beside it everywhere; the two-half forecast with its lazy loading, reserved space and swipe behaviour; Rosa's widget unstyled.

### What I could not try

- Real phones or real 4G: everything is headless Chromium emulation with synthesised touch.
- Booking.com past the listing, and the call itself: by instruction. I read the `tel:` links only.
- A tap inside Rosa's widget, which by its docs opens rosa.surf in a new window.
- Rosa's "Today" label on a real phone in Sri Lanka: emulated timezone only.
- The rendered gold pages: I used the calibration and the gold notes, not their shots. `/impeccable`, `/emil-design-eng` and the motion-audit skills were not run; the inspector was.

## Verification 2

experience-critic 0.2.0 · station 5 (full) · 2026-11-09 · live preview https://lotus-surf-house.os1.workers.dev/ after today's fix round. Phone 390 × 844 (touch, DPR 2; ~1.6 Mbps, 150 ms RTT and 4× CPU for the cold load), laptop 1440 × 900. My frames, logs and walk scripts are not in git. They stay in the session scratch: `/private/tmp/claude-501/-Users-alonlavi--superset-worktrees-oneshot-pull-latest-version-from-ff5cf4f5/7b7d3b10-1751-44ab-ba22-01cf22a1f312/scratchpad/ec-v2/` (`frames/`, `walk.mjs`, `walk2.mjs`, `walk3.mjs`, `frames/walk.log`, `inspect.txt`). The frame names below are in `frames/`. I also looked at the shared sheets in `verify-2-lotus-surf-house/shots/`, which I did not re-shoot. The current presence is the Booking.com and Google listings (`dossier/lotus-surf-house/audit.json`). I walked the Booking.com landing again today (`b-landing.png`).

**Score 8/10 · PASS · better than the current presence: yes · taps to book: 1.**

Independence: I walked and wrote my own view first. Only then did I read the Verification 1 section, and I re-checked each of its points on the live page (end of this section). I did not read the other two reviewers' reports for this round.

### Cold load, phone (throttled)

| Frame | What shows |
|---|---|
| `p-cold-500.png` | A green placeholder with the script name, the one line "A guesthouse in Midigama, on the south coast of Sri Lanka.", "Check dates on Booking.com" and Call. You can read it and tap it already |
| `p-cold-1500.png` | The same, still no photo |
| `p-cold-3000.png` | Only the top ~140 px of the gate photo has painted |
| (probe, `walk2.mjs` C) | The hero image is complete at about 4.8 s. LCP reads 556 ms, which is the text, not the photo |

First load: 870 KB in 13 requests from one host, with no third party (`walk.log`). The page is usable at once. The first impression that pulls you in, the gate, arrives late on slow 4G, and before it there are three seconds of flat green.

### The walk (`p-walk-00…18`, 12.9 screens)

- **First screen (`p-walk-00`, shared `mobile-00.png`):** the carved gate full-bleed under leaves, the script name, one line, one rust CTA and an outlined Call. It is clean, specific to this house and not a template section. The first-screen cap does not apply.
- **After one scroll (`p-walk-01…03`):** "The King Rooms" sits over the canopy-bed photo, then the balcony photo with "Upstairs, 25 m². Air conditioning, fan, mosquito net and hot water." I can say what this is, where it is, and why I would come. I cannot say what it costs, by design: the audit makes price mean the link to live dates. The rooms are sold through photographs, not tables.
- **Proof comes earlier now:** "9.0/10 Booking.com, 125 reviews · 4.9/5 Google, 78 reviews · read 3 Nov 2026" sits under the King facts at y ≈ 2,394 (`p-walk-04`, `walk3.mjs`). The same two numbers come back as cards two screens later (`p-walk-06`). Seeing them twice is mild redundancy, not a defect.
- **Wanting to go:** the balcony view (`p-walk-03`) and the roof Buddha among the palms (`p-walk-05`) are the moments that make you want to be there.
- **Garden:** the honest line "no air conditioning and no hot water" sits on every fan room, with Yelum's "may not be the newest … popular … due to their charm" beside them (`p-walk-07…09`). This answers audit F4 in the owner's voice, and it builds more trust than any listing does. The slideshow now opens on the room with the surfboard (`b-slide-before.png`). The porch photo breaks up the Yelum / Breakfast text (`p-walk-10`).
- **Where attention drops:**
  - the long room spec block of three garden room types (`p-walk-09`);
  - Getting here, where the amenities still read as a five-line " | " spec sheet (`p-walk-14`);
  - the forecast's first line (below).

### Booking

- **Hero CTA, 1 tap:** it opens `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html` in the same tab. I landed on the right listing, "Lotus Surf House … 9.0 Superb · 125 reviews", with "Choose dates to see prices" (`b-landing.png`). I stopped there: no dates, no sign-in, no cookies accepted. This meets the audit's target (engine, 1 click).
- **Everywhere else:** the sticky bar slides in once you leave the hero and holds "Check dates on Booking.com" plus a phone icon (bar `translateY(79px)` at the top and `none` at y 1200, `walk.log`). There are 15 booking or `tel:` links on the page, with exactly two unique hrefs: the Booking.com URL and `tel:+94774647541`. I read the `tel:` links and never tapped them.
- **Understood before the tap:** which room, A/C or fan, hot water or not, check-in at any hour, cash only. The price is not shown, by design.
- **Feel:** honest. The button says where it goes, and the phone number lets you ask first, which Booking.com does not allow (audit F1).

### Motion and states

- **The calm brief, done with care:** every control has a press state. Buttons `:active scale(.97/.98)` and the dot/arrow buttons `.92`, with a 120 ms `cubic-bezier(.23,1,.32,1)` and a background change. The active dot widens over 220 ms. The CTA darkens on hover on the laptop (`hover.png`). No control was left without a transition (`frames/controls.json`). The Rosa credit links are plain text links, so they fall outside the cap (Alon, 2026-11-09).
- **Slideshow:** a tap and a swipe both move it, and the dots follow (`s-fast-*`, `s-thr-*`). One rough edge: if you tap "Next photo" within a second of the slideshow arriving, the next slide is blank for close to a second. The slides are `loading="lazy"` and start fetching only on the tap (`b-slide-after.png`, 850 ms after the tap). After a short pause it is fine.
- **Header:** the name no longer collides with the script title as the hero rises, and no grey band sits at the top of white sections (`h-rise-200/420/640.png`, `h-white-section.png`).
- **Reduced motion:** a still, complete page (`rm-00.png`, `rm-forecast.png`).
- **JS off:** the page stands, no third-party requests, and the forecast is a single link card, "See today's forecast for Lazy Left on Rosa" (`nojs-forecast.png`). The static bar now sits below the hero's Call button instead of over it (`nojs-00.png`). The first screen then carries four buttons, which is busy but nothing is covered.
- **Inspector:** 8 FAIL, 5 WARN (`inspect.txt`).
  - Accepted as evidence: 16 font sizes; a 1 px button shadow and the text-shadow on the hero (trivial); `empty-middle` on the laptop "In the garden".
  - Discounted: `still-page` and `no-footage` (a calm concept, and no licensed video, as `concepts.md` explains); `reduced-hidden` (the nav waits for the scroll by design); `covered-text` ("Up on the roof" under the sticky bar for one scroll position); `palette-terracotta` (the concept's own rust); `name-only-title` (the line under the name says what and where).

### The forecast block

What a traveller meets (`f-00…f-13`, `widget.png`):

- The block now has a title, "Surf at Lazy Left", and a reason: Giada's verbatim line "The location is perfect to go and surf at lazy left and right" (Booking.com, Dec 2025). There is no rule and no stretched gap above it. On the laptop it is a tight two-column block, with the number card on the left and Rosa's widget on the right (`l-walk-11.png`). That is the calibration's "text/numbers left, widget right" done properly.
- Loading: zero third-party requests until the block nears the screen. Then the Rosa JSON, the widget and the widget's own fonts and Esri tiles load (`walk.log`). Both halves have their space reserved: on arrival the card and widget slots are grey (`f-00-arrive.png`), the numbers come in at 400 ms (`f-01`), and the widget is painted by 3 s (`f-02`), with no shift. A sideways swipe in the widget moves it from Today to Tomorrow (`w-before.png` → `w-after-swipe.png`). The widget's header link opens rosa.surf in a new tab (`target=_blank`), and I did not follow it.
- Fallbacks: with the JSON blocked, the card is replaced by a link card of the same size and nothing is left blank (`fail-json.png`). With JS off it is a link only. With only the widget's request blocked, the headline card with its link stays, but **a ~500 px empty white box** remains where the iframe was (`fail-widget.png`). That is rare, but it is the empty box the playbook forbids.
- **The two halves disagree, side by side.** The headline says "Swell 7.9 s from the south-east" and "Wind 5.7 km/h from the south, onshore". Directly beside it on the laptop (directly below on the phone), Rosa's widget shows 12–14 s SSE swell and "6 SE CROSS" at 12:00 and "3 SE CROSS" at 18:00 (`l-walk-11.png`, `widget.png`). The site takes `current.swells[0].period` (7.9, the mean period). The widget shows the peak period (`peak_period` 12.3 in the same JSON, `lazy-left.json`). A surfer reads swell period first, and seeing 7.9 s against 12 s makes them doubt both numbers. Fix it with the period field the widget shows. If the wind class cannot match Rosa's own labelling, show the direction and speed without "onshore".
- **The first line reads like internal notes:** "Lazy Left is the Rosa spot nearest the house." A traveller does not know what Rosa is yet, and the line does not say how near the spot is. The dossier has a better sourced guest line: Victoria, Booking.com, 2025-12, "The place is in front of two amazing surf spots (lazy right and lazy left), and you have other three that you can go walking (less 1 km)" (`dossier.json`, the spot entry's note). It gives the distance and the other breaks in a guest's words.

Net: it is now part of the page and adds the page's only surf moment, which neither listing has. Its two flaws are a credibility slip in the numbers and a weak first line. Neither costs a booking.

### Laptop (`l-walk-00…12`)

The split hero has the gate on the right and the script name, line and CTA centred on white (`l-walk-00.png`). It is calm and clean, though less gripping than the phone's full bleed. The King band and its photo grid are composed (`l-walk-01…03`). The roof row and the rating cards are tidy (`l-walk-04/05`). The header nav (Rooms · Guests · Getting here · Surf) and the "Check dates" pill stay on screen. The closing and footer are designed, with buttons and icons, not underlined links (`l-walk-12`).

### Against the current presence

- **Where the listings are still better:** the rating and a date picker are on the first screen (`b-landing.png`), Booking has 42 photos and Google 150, and Google's map answers "how near is the sea" at a glance.
- **Where this page is better:**
  - it looks like a place, not a ping-pong table under a blue bar;
  - it says plainly which rooms have A/C and hot water;
  - it gives the hosts' voice and a phone number before booking;
  - it shows one name and one number, and no competing hotels;
  - it has a live forecast for the break.

**Better: yes, clearly.**

### Score: 8 · better than the current presence: yes · pass

It is engaging, clearly better than what a traveller finds today, and booking takes 1 tap. It is held off 9 by the late hero photo on slow 4G, the forecast's mismatched numbers, the spec-sheet stretches (garden room list, amenities), and the slideshow's blank first tap.

### Fix list (biggest effect first)

1. **Make the forecast's two halves agree.** Use the swell period the widget shows (`peak_period`). Drop the "onshore / cross" class unless it is Rosa's own. Replace "Lazy Left is the Rosa spot nearest the house." with Victoria's sourced line about the two breaks in front of the house and three more within 1 km. When the widget fails, collapse its slot to the link instead of leaving a white box (`fail-widget.png`).
2. **Paint the gate sooner on slow phones.** Put a tiny inline blurred preview of img-019 (or its dominant colours as a gradient) in the hero instead of flat green, and let a phone at 390 px pick the 800 w file (`sizes` is `76vh`, which makes a DPR-2 phone pick the 1200 w file). The aim is that the photo, not a green field, is what you see at 1.5 s (`p-cold-1500.png`).
3. **Preload the next slide.** Set the image after the visible slide to `loading="eager"` (or decode it when the slideshow nears the screen), so the first "Next photo" never shows a blank (`b-slide-after.png`).
4. **Shorten the spec stretches.** Turn the amenities into the three or four a traveller decides on (`p-walk-14`). Set the garden room facts as compact " | " lines, so three room types don't run down a screen and a half of text (`p-walk-09`).
5. **Drop one of the two rating blocks**, or make the second one carry something new, such as the 9.9 staff subscore if the copy agrees (`p-walk-04` and `p-walk-06`).

**Keep:** the gate first screen; Alon's order of King band, balcony, roof, garden; the plain fan, A/C and hot-water lines and Yelum's "charm" sentence; "Check dates on Booking.com" with the phone beside it everywhere; the surfboard room opening the slideshow; the titled forecast with Giada's line, lazy loading, reserved space, link fallbacks and Rosa's widget unstyled; the press states on every control.

### Verification 1's points, re-checked

| V1 fix | Today |
|---|---|
| 1. Forecast: delete the rule, close the spacing, tighten the laptop card, give a reason, link instead of blank on failure | **Done**: no rule (`walk3.mjs`, no borders, no `hr` in `#surf`), tight on both widths (`f-02`, `l-walk-11`), titled with Giada's line, JSON failure shows a link card (`fail-json.png`). New finding: the numbers disagree with the widget, and the widget-only failure leaves a white box (fix 1) |
| 2. Header scrim band and name collision | **Done** (`h-rise-*`, `h-white-section.png`) |
| 3. Surf and proof up: a surf-naming first review, dated ratings near the King facts, a jump to the forecast | **Mostly done**: the first review mentions surfing and the local surf spots (`p-walk-11`), and the ratings now sit at y ≈ 2,394 instead of ~3,800. There is no forecast jump link on the phone; the laptop nav has "Surf" |
| 4. The garden slideshow opens on the surfboard room, and a picture in the Yelum / Breakfast run | **Done** (`b-slide-before.png`, `p-walk-10`) |
| 5. Closing to one short line, amenities trimmed, the JS-off bar off the hero Call | Closing **done** (two plain lines under "Come and stay", `p-walk-17`); JS-off bar **done** (`nojs-00.png`); amenities **not really** trimmed (`p-walk-14`, fix 4) |

### What I could not try

- Real phones and real 4G: everything was headless Chromium emulation with synthesised touch. The hero timing is from one throttled run.
- Booking.com past the listing, the call itself, and following Rosa's link (opens a new tab): by instruction.
- The widget's own failure as a real outage: I simulated it by blocking requests. When I blocked the JSON, the widget also showed Rosa's own "Forecast unavailable", because both read the same host.
- Google Maps and the Facebook page were not walked again this round; for them I relied on the audit's frames and Verification 1's walk. `/impeccable`, `/emil-design-eng` and the motion-audit skills were not run; the inspector was.
