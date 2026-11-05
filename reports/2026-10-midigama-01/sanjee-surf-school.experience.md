# Sanjee Surf School: experience critique (4f pre-score)

experience-critic 0.2.0 · station 4f (quick), round 1 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05
Pages: `sites/sanjee-surf-school/mockups/{calm,interactive,unique}/dist/index.html`, served over http on :9360 / :9361 / :9362 from my own static server, stopped afterwards.
Compared with: the current site as captured (`dossier/sanjee-surf-school/assets/old-site-*.png`, `funnel/walk/`), audit F1–F14, and the phone first screens of three gold pages (Lavish, KA, Layday: `gold-*-phone.png`). The live site was not loaded.
Written without reading the critic's or the visual-critic's report, or the designers' `notes.md`.

Frames are in `reports/2026-10-midigama-01/experience/sanjee-surf-school/` (git-ignored PNGs), with `{calm,interactive,unique}-walk.log` and `states-{calm,interactive,unique,extra}.log`. Chromium with SwiftShader WebGL. Phone: 390×844 @2x with touch, real wheel and touch input, CDP 1.6 Mbps / 150 ms RTT and 4× CPU for the cold load. Laptop: 1440×900.

Timing note: under 4× CPU the frames requested at 0.5 s and 1.5 s were really taken at about 1.2–1.7 s and 1.6–2.1 s (logged per frame). The file names give the requested time.

## Summary

| | calm "The sand" | interactive "Where you start" | unique "The set" |
|---|---|---|---|
| **Dimension 8 (experience)** | **7 / 10** | **7 / 10** | **8 / 10** |
| Better than the current site | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **fail**: below 8 (method 5 cap) | **fail**: below 8 | **pass**, narrowly |
| Taps to WhatsApp | 1 from every button | 1 from hero, card, bar; 2+ to build a message | 1 from hero and bar; 2 from a lesson (sheet, then send) |
| Hard fails (dimension-8 side) | below 8/10 | below 8/10 | none |

**Experience ranking at 4f: 1 unique · 2 interactive · 3 calm.**
- **Unique** is the only page where the first thing you see is a man on a wave. The swell is plainly felt, the prices are the boldest moment in the set, and the sheet comes closest to feeling like booking.
- **Interactive** has the best tool: tap your level, watch your message get written. It is let down by a main item you barely notice, a header bug on the first scroll, and a persistent bar that throws the built message away.
- **Calm** is clean, the most correct by the calibration, and the easiest to read. But its first screen sells a bay with a tiled roof on a headland, not a surf lesson.

**Video and photo hard fail.**
- Video: does not apply. No own clip exists on disk (concepts §2). I accept that.
- Photographs at 1920 px or more: calm and unique carry img-002 (2000 px) on the first screen. **Interactive does not: it uses img-009 at 1600 px.** The concept's reason is that img-002 has no surfer and img-009 shows what the page is about. I accept it, and I note it because the rule needs both visual critics to accept.

**Outside dimension 8, for the critic:** all three pages request `fonts.googleapis.com` / `fonts.gstatic.com` on load (the rubric's "third-party request on first load" line; `*-walk.log`). On calm that stylesheet blocks rendering: first paint 1,476 ms with the fonts, 468 ms with them blocked. I discarded my first walk, with the fonts blocked, because it showed the wrong faces.

**The current site, honestly.** The first screen (`funnel/walk/01-home-fold-settled.png`) is palm trunks over a real breaking wave and an infinity pool, with a teal line lost in the branches, "Ride the Wave of Your Life" and a cookie box cut off by the bottom edge. It is atmospheric, it names neither school nor town, and a red error box arrives after about 6 s (F4). It runs 30,387 px on a phone, about 36 screens, with no menu (F3) and no WhatsApp on the home page (F2). All three mockups are 14–15 phone screens with a menu and a persistent action.

**Where the current site is still better than all three:**
- **It actually books.** `11-wizard-4-date.png` shows a calendar with real free days and named slots. `11-wizard-5-slot.png` says "Total: $40, pay $8 now, $32 on site". A traveller leaves with a lesson at 8:00 on the 11th. On the mockups they leave with a question sent to a number nobody has seen answered, and the page gives no reply time and no hours.
- **The verb.** "Book Your Lesson" and "Book Now" promise more than "Ask on WhatsApp". The new label is honest, and it is also less decisive.
- **Its pictures of the place come in a block.** The Coco Beach grid and the "Moments in Motion" row (`assets/old-site-desktop.png`) put about 13 pictures together. The mockups scatter fewer.
- **It carries more to read.** It has a spot finder, a month-by-month calendar and an FAQ, though those are also why it is 36 screens.

The old page's prices and proof contradict each other (F7, F9, F10) and its booking takes 5 taps, 3 typed fields and a card. On balance all three beat it for a stranger comparing schools on a phone, and they beat it most at the point of first contact. Whether a WhatsApp question converts as well as a held slot is not something a page walk can answer.

---

## 1. Calm: "The sand", 7/10

### Timeline (phone, throttled)
| requested t | On screen | Frame |
|---|---|---|
| 0.5 s (taken 1.62 s) | Header, "Surf lessons in Weligama", red "Ask on WhatsApp", all on a flat sky-blue box. No photograph. First paint was 1,476 ms, blocked on the font stylesheet. | `calm-phone-t500.png` |
| 1.5 s (2.08 s) | The photograph is in: sky, headland, tiled roofs, sea. The wash line has not yet risen. | `calm-phone-t1500.png` |
| 3 s, 6 s, 10 s | Settled and identical (`t3000` vs `t10000`: no difference). Nothing moves. | `calm-phone-t3000.png` |

**First seconds communicate:** Weligama, a bright bay, surf lessons in words, one red button. It is clean and sure of itself. There is nobody in the water and no board in the frame. The top half of the phone screen is empty blue. The largest objects are terracotta roofs on a cliff, which read as a resort. The concept names this exact risk ("reads as a nice beach rather than a school"), and it happens.

It is the same form as the calibrated hero, and the wash line is the only thing that makes it this page's own. On a phone that line is a faint wobble in the last 5% of the screen (`calm-phone-s00.png`). On the laptop it is more visible, and there it looks like a lumpy white cut-out with a beige halo rather than foam (`calm-laptop-t2000.png`). Beside the gold first screens (`gold-*-phone.png`), each with an idea you can name, this is a very good landscape with a title on it. **Method 5 cap applies: 7.**

### Walk (phone: `calm-phone-s00…s21.png`, 12,739 px, about 15 screens)
- **s01–s02, the sand:** the tagline, "Who we teach" in Mr Dafoe, then img-005, the red and blue soft-tops with an instructor and a student on the sand. **This is the picture the first screen is missing**, and it is one scroll away.
- **s02–s04, Lessons:** three tinted rows, level | length, USD 40 / 50 / 160 in plain large figures, each with its own button. It is the clearest price block of the three, and it reads like a price list.
- **s04–s06:** rating, Before you book (swim 50 m, kids from 6, cash), then img-009 full-bleed with the script line in the sky. A real lift: the first time you are in the water.
- **s07–s09, Board rental:** four paragraphs, then an eight-row table. Attention drops.
- **s09–s10, Sanjee:** img-008, a man walking out of the shallows with the board and smiling, then "learned on a broken board my uncle fixed with resin and hope". **The best moment on the page, and it is nine screens down.**
- **s10–s11:** the rating, the quote slideshow, then `spot` set as a two-line script title. A full sentence in Mr Dafoe is slow to read.
- **s12–s18, waves and tuk-tuk:** about six screens, mostly text: two prints in the waves, then twelve tour rows that look alike with no picture at all. **The page sags here.**
- **s19–s21:** Finding us, then img-019 (footprints, stilt poles) with the wash line inverted into the footer. A warm ending.

### The story after one scroll
What and where: yes. Why this place: the view says Weligama is pretty, not why Sanjee. Cost: not until the second scroll. It is told through tidy text blocks more than through the media.

### Wanting to go
Lifts: the lesson print, the paddler band, Sanjee walking in, the footprints. Deflates: an empty hero sky, the board-rental text, six screens near the end.

### Booking
1 tap. The hero link is `https://wa.me/94774004422?text=` "Hello Sanjee Surf School, I'd like to ask about surf lessons." Lesson buttons name their lesson and all 12 tour rows name their tour (`states-calm.log`, 22 links). Price and level are clear before the tap. The date is left for the traveller to type. Not opened, nothing sent.

### What I operated
- **Menu (phone):** opens, six links, "Waves" lands with the title 84 px down under a 64 px header. Closes on tap, Esc and an outside tap.
- **Quote slideshow:** swipe advanced to quote 2. Dot 4 slid to quote 4, and the dot stretched into a bar (`calm-phone-quotes-dot-mid.png`). The track height is fixed at 298 px, so the short quote leaves a gap (`-dot-after.png`).
- **Bar:** hidden until past the hero, visible from y≈560 with WhatsApp and a phone icon.
- **Transparent header:** at y≈400 the hero button passes under the wordmark, "Sanjee Surf School" over red (`calm-phone-header-y400.png`). Brief, but on every first scroll.
- **Hover (laptop):** CTA darkens, nav gets a pale fill, table rows take the tint. Tab focus has a 3 px ring. 34 of 39 links and buttons carry a transition (the wordmark and the dots do not; the dots stretch through their own bar).
- **Reduced motion, JS off:** both good (`calm-phone-reduced-s0.png`, `-nojs-s0…s2.png`). The slideshow becomes native scroll with JS off per the concept (not separately tested at that state).

### Score: 7, better than the current site: yes
Clearly better than the old page and easy to book, but the first screen does not make you want a surf lesson. Calm by design has no spectacle, so the first screen has to carry it alone.

**Fix list (biggest effect first)**
1. **Put the lesson on the first screen.** In `#top` on the phone, bring img-005 up onto the wash line as a print the white page laps around, and cut the empty sky by shortening the hero to about 80 svh. The screen then says "you, on this sand, with an instructor". This is the concept's own idea, at the point where it matters.
2. **Redraw the wash line.** Make it one long, soft edge rather than lumps with a beige halo, in the hero and the closing section, and give it a run-up large enough to notice on a phone (it is about 12 px now).
3. **Break the tail of the page.** In `#waves` and `#tuktuk`, add a print between the 3 surf tours and the 9 outings (img-012 or img-014), and put each tour's price on its title line so 12 rows take about 2.5 screens rather than 4. Keep the rows uncollapsed (R2-N2).
4. **Stop the hero button passing under the wordmark.** Make the header solid as soon as the button reaches it, or fade the wordmark until then. Self-host the fonts, so the first paint is not held up by a third party.
5. **Reorder `#boards` on the phone** with the table straight after the first paragraph, and set `spot` in the text face rather than Mr Dafoe. Let the quote track take each quote's height.

**Keep:** the red from the learner's board, used only for booking; three plain lesson rows; img-009 as the band; Sanjee walking in; per-tour prefills; the footprints at the end.

---

## 2. Interactive: "Where you start", 7/10

### Timeline (phone, throttled)
| requested t | On screen | Frame |
|---|---|---|
| 0.5 s (taken 1.73 s) | Complete: pale sky band, sea, one wave, a small paddler seen from behind at mid-height, "Surf lessons in Weligama" in the lower third in dark Manrope, cobalt button. First paint 556 ms. | `interactive-phone-t500.png` |
| 1.5 s → 10 s | Looks the same at a glance. The canvas is running (507×1097). | `-t1500…t10000.png` |

**First seconds communicate:** surfing, right away. One person going out at a wave, which is exactly the feeling a learner imagines. It is soft on a 2× screen, as the concept warned, and the water forgives it. It is calm, monotone blue-green and low in energy, with no strong colour but the button. The title below centre is a declared departure from the calibration. I accept it: the paddler keeps the middle of the screen. On the laptop it holds well (`interactive-laptop-t2000.png`).

### The main item, walked
A WebGL swell on img-009. Measured on frames 1.5–3 s apart:
- Block matching on the water (scratch script, 21 blocks): median 0.5–2.5 css px, about 3 css px at the most where the match is reliable. Blocks that hit the ±7 css px search limit are low-texture noise and I discount them.
- Whole-frame PSNR 34–40 dB on the phone, 35.8 dB on the laptop, against 20 dB for unique's swell.
- Sky band 75 dB, so the sky and horizon are locked. A difference frame (scratch) shows the paddler and the far surfer masked out, the title and button clean, and all the rest of the water moving.

Technically it does what it says, with no jelly in any frame. It runs continuously and needs no permission, which is better than Coconut's 6 s drift. **But it is very quiet.** Side-by-side frames 3 s apart are hard to tell apart. A traveller who looks at the sea for several seconds will sense it breathing. One who scrolls, which is most, gets a still photograph. I could not watch it in real time on a real phone.

### Walk (phone: `interactive-phone-s00…s21.png`, 12,847 px, about 15 screens)
- **s01, the first scroll: the bug.** At y≈560 the hero title runs through the wordmark, "Surf lessons in" printed over "Sanjee Surf School", because the header stays transparent until the hero has gone (`interactive-phone-header-y560.png`, `states-interactive.log`). Every phone visitor meets this within two seconds of scrolling.
- **s01–s02, "Who we teach":** a large flat grey panel with five white tiles. A real question, asked at the right moment. The grey makes the second screen read as an app rather than a surf school.
- **s02–s04, cards:** a swipe row with peek. Good price type (USD 40 large). Cards stretch to the longest one, leaving about 120 px of blank space in the Beginner card (`interactive-phone-cards-0.png`).
- **s04, The message:** the panel below. The best idea on the page.
- **s05–s08, boards:** the to-scale chart. On the laptop it is a real moment (`interactive-laptop-boards.png`). On the phone it becomes six stacked rows of pale board shapes, about 1.5 screens before the rates.
- **s09–s10:** img-018 sunset band, then img-007 large with "sanjee, head instructor". **The page's strongest passage**, and the first strong colour. Covered By Your Grace's capital S looks lower-case, and its wide word gaps look loose ("Who  we  teach"). Calibration asks for tasteful and readable; it is readable and rough.
- **s11–s18:** quotes, spot, waves (the paragraph for your chosen level lights up, a good payoff), then tuk-tuk rows.
- **s19–s21:** the whole bay, full-bleed under "Send us the lesson and date you want". It is a better use of img-002 than calm's hero, as a reward.

### Booking
1 tap from the hero, each card or the bar. The panel writes, for example: "Hello Sanjee Surf School, I'd like to ask about the Private Coaching. I'm a total beginner. The date I have in mind is 20 November 2026. There are 2 of us." `#send` carries all of it (`states-interactive.log`). Of the three pages this is the best answer to "what do I type", and it needs no typing. Not opened, nothing sent.

**Two ways it loses the traveller's choices** (hrefs read after building a message):
- **The bar:** the phone bar's "Ask on WhatsApp" still says only "…ask about a surf lesson." It sits right under `#send`, same label, same colour, both on screen together (`interactive-phone-message-1.png`). Tap the wrong one and the message you built is gone without warning.
- **Card buttons:** after a tile is chosen, the cards' buttons still send only the lesson name, without the level.

### What I operated
- **Tiles (all five):** fill with a sliding pill (`interactive-phone-tile-0-mid.png`), set the bubble text, put a "for you" dot on the matching cards. "I can stand up" dots two cards; Week Intensive never takes one. Never dims anything. "Intermediate" auto-scrolled the row to Private Coaching (`scrollLeft 306`), which is thoughtful.
- **But on the phone a tile's effects are all off-screen.** After a tap the cards start at y=762, just at the top of the bar (772), and the bubble is at y=1597 (`states-extra.log`, `interactive-phone-after-intermediate.png`). What you see is a tile changing colour. On the laptop the dot is in view (`interactive-laptop-tile-intermediate.png`).
- **Add to my message:** becomes "In my message", outlines the card, and updates the bubble (`-add-after.png`). The message panel is further down, with no nudge towards it.
- **Chips and date:** lesson, date, people, "Not sure". Each rewrites the bubble, and tapping a selected chip clears it. The date was set programmatically: I did not operate a native picker.
- **Soft-top / Hardboard:** the pill slides and digits roll (`-pill-mid.png`).
- **Swipe and dots on quotes:** both work. **Menu:** works, closes on Esc and an outside tap.
- **Hover (laptop):** CTA lightens; tile lifts 2 px; a board lifts on hover; the lesson card has no hover of its own, though its buttons do. The Sanjee print has real parallax on scroll (`translateY -35 → -55`). 52 of 59 interactive elements carry a transition.
- **Reduced motion:** one frame shows the still (`-reduced-s0.png`). **JS off:** tiles and panel go away, cards and links stay (`-nojs-s1.png`).

### Score: 7, better than the current site: yes
Best booking idea in the set and clearly better than the old site, but on a phone the main item is barely felt, the first scroll has a visible overprint, the middle is grey interface, and the bar can silently drop the message. These are near fixes: a round on them should reach 8.

**Fix list (biggest effect first)**
1. **Make the swell felt on a phone.** Add one slow, larger lift across the band below the horizon (roughly 6–8 css px at the wave, 8–10 s period) with a visible specular pass, then check on sight that it doesn't turn to jelly. It has to register within three seconds with no interaction.
2. **Fix the header overprint.** In the phone header at y≈400–650, turn the header solid when the title reaches it, or hide the wordmark while the hero title is in view.
3. **Make the bar and card buttons follow the message.** Once a level, lesson, date or people has been set, `.bar`'s link and the cards' links should carry the same text as `#send`.
4. **Show a tile's effect on the phone.** After a tile tap, scroll the matched card into view, or put a one-line live preview ("Private Coaching fits an intermediate surfer") directly under the tiles, with a link to the message.
5. **Warm up and tighten the middle.** Replace the big flat `#D6DAE0` panel with white plus a smaller tint. Let cards size to their own content on the phone so the 120 px gap goes. Reduce the title face's word spacing, and retest its "S". Fix the prefills: "the Private Coaching", "the Galle Fort", "the Hiriketiya Bay", "the Ahangama & Kabalana".

**Keep:** level tiles first; no card ever dimmed; the written message; the lit wave paragraph; the board chart on the laptop; the sunset then Sanjee on the wave; the whole bay as the last picture; the sticky tour text on the laptop.

---

## 3. Unique: "The set", 8/10

### Timeline (phone, throttled)
| requested t | On screen | Frame |
|---|---|---|
| 0.5 s (taken 1.21 s), 1.5 s (1.64 s) | Title, pink button, rating line all usable (first paint 496 ms). **The prints are blank white rectangles with shadows**, except small img-006. It looks broken for this moment. | `unique-phone-t500.png`, `-t1500.png` |
| 3 s (3.31 s) | All prints in: bay behind, small wave print, img-007 huge in front. | `unique-phone-t3000.png` |
| 6 s | The swell passing: the prints' edges curve like paper on water. | `unique-phone-t6000.png` |

**First seconds communicate:** a man carving a wave on a yellow board with a pink rail, under a loud, happy title, with the button in the rail's colour and "5/5, 13 Google reviews" right there. This is the only first screen in the set that makes you think "I want to do that" and "this is a real person". It is also not "clean" in the calm sense. On the phone (`unique-phone-hero-crop.png`):
- The small img-006 butts straight against img-007's top edge with the same left edge, so it reads as a tile rather than a floating print.
- A stray sliver of img-002's sand sticks out at the right.
- The title sits about 8 px under the header.

On the laptop (`unique-laptop-t2000.png`) the top row of three is cut off by the front pair and it comes close to scrapbook, which is the concept's stated risk. Even so it is the first screen I would remember, and the first with an idea. Rating on white, not over media, is fine. I accept the departure from full-bleed: nothing else the school owns can show this at this size.

### The main item, walked
WebGL swell on the prints. Frames every 2 s at both widths, plus `?swell=0.62`, `?still`, `?nogl`:
- **Felt:** whole-frame PSNR 20 dB on the phone between flat and passing (`unique-phone-swell-0` vs `-2000`), 30.7 dB on the laptop. A wave crosses, then flat for several seconds (identical frames at 6–12 s), then again by 14 s. That matches the concept's roughly 12 s.
- **It reads as paper on water** on the edges (`unique-phone-swell-2000.png`, `unique-phone-swell062.png`). At the moment of greatest flex the surfer stretches slightly. That is the only moment I'd call a distortion, and it passes quickly.
- `?still` is steady, and `?nogl` keeps the layout (`unique-phone-still.png`, `-nogl.png`). Canvas stays behind the DOM and takes no pointer events.
- On scroll the prints flatten and leave with the page (`-header-y200`, `-y400`), no pinning.

Method 5 is met: a main item from the school's own photographs, felt on a phone without any permission.

### Walk (phone: `unique-phone-s00…s19.png`, 11,951 px, about 14 screens, the shortest)
- **s01–s02, the blue block:** a full-width cloud-blue colour, tagline, Who we teach. Bold and bright.
- **s02–s03, prices:** "USD 40", "USD 50", "USD 160" huge in Shrikhand. **The strongest price moment in the set.** You cannot miss the cost. The stepping shows on a phone only as a small indent, which reads a little like misalignment.
- **s04–s05:** rating, then img-005 overlapping the blue block's bottom edge with a second print: the lesson on the sand, a good beat.
- **s05–s07:** Before you book, boards text, then the swipe strip by duration (peek). Compact, and better than a table on a phone (`unique-phone-strip-0.png`).
- **s08:** img-020, silver sea with "Making waves, one lesson at a time." Moody, a change of light.
- **s08–s10, Sanjee:** the tilted print, then his two sentences large, then 5/5 big and a quote row. **The man the reviews are about, set like he matters.**
- **s11–s17:** Coco Beach with an overlapped pair of prints, waves, tuk-tuk rows with prices in Shrikhand. The tuk-tuk run is still about 3.5 screens, the display prices keep it lively.
- **s17–s19:** the three dogs at sunset beside "Send us the lesson and date you want", a warm, human joke, then the blue Finding us block.

Attention drops least here. The colour changes and big type carry it between pictures.

### Booking
- Hero and bar: 1 tap, "…ask about a surf lesson."
- "Ask about this lesson": opens the sheet, with the lesson preselected. It stays a real `wa.me` link with JS off.
- **The sheet (`unique-phone-sheet-open.png`, `-filled.png`) fits one phone screen with nothing to scroll:** lesson with its price, level, date, people, the message bubble, one button. Filled: "Hello Sanjee Surf School, I'd like to ask about the Beginner Lesson. My level: beginner. Date: 20 November 2026. People: 2." Not opened, nothing sent.
- It is the nearest thing to the old dialog's reassurance (lesson, price, date all in one place), in about 3 taps and no typing, against 5 taps, 3 fields and a card. It does not hold a slot, and the page does not pretend it does.

### What I operated
- **Sheet (phone):** opens with focus on the chosen lesson. Choices stay after closing and reopening from another lesson, with the lesson updated (`states-unique.log`). Closes on Esc (focus returns to the button), on the ×, and on a backdrop tap. **Dragging it down does nothing**, though it looks like a sheet you can drag. The spring could not be seen: the frame 130 ms after the tap was already at rest.
- **Sheet (laptop):** a centred panel rising from the foot (`unique-laptop-sheet-open.png`). Focus left the sheet at least once in 18 Tabs. It is a `<dialog>`, so that may be focus passing to the browser's own UI; I did not confirm that. No trap: Esc closes it and returns focus to the lesson button.
- **Strip and quotes:** swipes work (`-strip-swiped`, `-quotes-swiped`), dots follow and dots move the row. Masonry on the laptop.
- **Menu:** works and closes on an outside tap. **Esc does not close it** on this page; it does on the other two.
- **Hover (laptop):** the hero CTA and lesson buttons have **no hover change**, and strip cards have none. Press scales to 0.97 with the fill. Hero prints lift under the pointer (`unique-laptop-print-rest` vs `-hovered`, 22 dB). 34 of 38 links and buttons carry a transition, but a transition on press only is thin for "micro-animations on everything you touch".
- **Slashed zero:** Atkinson Hyperlegible slashes every 0: "2026" in the first-screen rating line, "USD 40 / 50 / 160" in the sheet (`unique-phone-sheet-prices.png`), "50 meters", the postcode. Legible, and an odd tic on a price.
- **Reduced motion, JS off:** both clean and static (`unique-phone-reduced-s0.png`, `-nojs-s0.png`).

### Score: 8, better than the current site: yes
Engaging from the first second, clearly better than the old site, and easy to book. Held at 8 by the blank prints on a slow load, a collage that is rougher than it should be, and thin hover states.

**Fix list (biggest effect first)**
1. **Replace the blank white prints on load.** In `#set`, give each print its dominant colour or a tiny blurred placeholder, and load the front print (img-007) first. Today the first impression on slow 4G is empty boxes for 1–3 s.
2. **Clean the collage.** On the phone, offset img-006 so that it overlaps rather than butts img-007, remove the sand sliver at the right edge, and add 16–24 px between header and title. On the laptop, let each back-row print show enough to read, or drop one.
3. **Give every button a hover state.** On `#hero-cta`, `.btn` and the strip cards, add a small lift or tint on hover, as the other pages have.
4. **Deal with the slashed zero.** Use a text face with a plain zero, or set the small prices in the sheet in Shrikhand as the tour rows are.
5. **Small finishes:** drag-to-dismiss on the sheet; Esc on the phone menu; either make the price stepping real on a phone or remove the indent; reduce the surfer's stretch at peak flex.

**Keep:** img-007 in front; the swell, its pause and its colour source; the huge prices; the one-screen sheet with the bubble; hero and bar going straight to WhatsApp; the swipe strip; Sanjee's tilted print; the dogs.

**For the human at the pick:** this page leans hardest on **img-007, which carries a rights flag** (concepts §6). If the owner can't clear it, img-006 takes the front and the page loses a lot of what earned this score. It would need to be re-scored.

---

## What the designer prompt got wrong (one paragraph, quotable)
All three pages get the booking path right and beat the old site's dialog on effort, but the first screen is decided by whether a person is in it. Calm obeys every calibration line and still sells a headland: a school with no strong large action photograph needs its human moment brought to the first screen, even as a print, instead of leaving it one scroll down. Interactive tuned its shader to avoid "jelly" (the concept's stated fear) and went so far the other way that a phone visitor doesn't notice it: a main item must be judged by whether it registers within three seconds without interaction, not only by being tasteful. Two process notes. Transparent fixed headers over a hero need testing on the first scroll, not at rest: both full-bleed pages have hero content running through the wordmark. Any persistent bar on a page with a message builder must carry the built message, or the page has two identical buttons that do different things.

## Inspector (`design-taste-frontend`, evidence only)
No FAIL changes a score. Calm: `icon-cards`, `eyebrow`, `covered-text`. Interactive: `shadow`, `icon-cards`, `palette-terracotta`. Unique: `eyebrow`, `shadow`, `edge-text`, `untitled-section`, `covered-text`. I checked these against the frames. `covered-text` is the sticky header passing, `palette-terracotta` samples the sunset band, the print shadows are the concept, and the two `eyebrow` hits are body lines above a heading. `still-page` and `no-footage` warnings on all three follow from having no video on disk.

## What I could not test
- **A real phone or GPU.** All WebGL ran on SwiftShader. The 60 fps reading on interactive is not a real phone's. Battery, heat and iOS Safari are untested.
- **The swell in real time.** I judged both from frames and measurements, not by watching. Interactive's "registers or not" is my reading of those numbers and frames.
- **Curves and springs.** The sheet's spring and the wash run-up were caught in too few frames to judge their feel.
- **Native date pickers** (set programmatically) and momentum on real touch hardware.
- **WhatsApp.** No link was opened and nothing was sent. Whether the number answers, and how fast, is unknown. Nobody has verified it.
- **The live current site.** Captures only, as instructed. Global Surf gold pages were not rendered; the calibration in `references.md` and three other gold first screens were used. The skills `/impeccable`, `/emil-design-eng` and the motion audit were not run.
