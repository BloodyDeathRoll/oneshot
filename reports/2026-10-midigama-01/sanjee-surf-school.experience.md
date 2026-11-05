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

---
---

# Round 2 (designer 0.7.1 reworks)

experience-critic 0.2.0 · station 4f (quick), round 2 · run `2026-10-midigama-01` (test, operator alon) · 2026-11-05
Pages served over http on :9360 / :9361 / :9362 from my own static server, stopped afterwards. Written without reading the critic's or the visual-critic's report for either round, or the designers' `notes.md`. I read my round 1 section only after walking each page and forming a first impression.

Frames: `reports/2026-10-midigama-01/experience/sanjee-surf-school-r2/` (git-ignored). Phone: 390×844 @2x, touch, real touch events through CDP for drags and swipes. Cold-load timing: CDP 1.6 Mbps / 150 ms RTT, 4× CPU. Laptop: 1440×900. WebGL ran twice: on SwiftShader (the pages' own 10 fps tier on interactive) and on this Mac's GPU through ANGLE Metal. Timings come from hooks on the page's own WebGL calls, not from screenshots.

## Summary

| | calm "The sand" | interactive "Where you start" | unique "The set" |
|---|---|---|---|
| **Dimension 8 (experience)** | **8 / 10** (round 1: 7) | **7 / 10** (round 1: 7) | **8 / 10** (round 1: 8) |
| Better than the current site | **yes** | **yes** | **yes** |
| Pass / fail (this critic) | **pass**, narrowly | **fail**: dark title on orange at laptop width, a calibration hard bar | **pass** |
| Taps to WhatsApp | 1 from every button | 1 from hero, card, bar, tour; message built in 2 to 4 taps | 1 from hero and bar; 2 from a lesson |
| Swell felt within 3 s, throttled phone | no swell (by design) | **no, by about 3.5 to 4 s** | **no, at about 4 to 5 s** |

**Experience ranking at 4f: 1 unique · 2 interactive · 3 calm.** Interactive is one fix from level with unique: the walk alone earns it 8, and it has the strongest colour and the best booking tool of the three.

**The swell, measured** (three cold loads each, ms from navigation, throttled phone):

| | Load event | First canvas draw | Half strength | Full strength |
|---|---|---|---|---|
| interactive, SwiftShader | 2,226–2,871 | 2,471–3,580 | 3,023–4,191 | 3,572–4,724 |
| interactive, Mac GPU | 2,316–2,466 | 2,748–3,201 | 3,329–3,837 | 3,865–4,276 |

| | Load event | Pass starts (off-screen) | Front print lifts 1 px | 3 px | Peak 10 px |
|---|---|---|---|---|---|
| unique, SwiftShader | 1,694–1,727 | 3,012–3,352 | 4,048–4,448 | 4,216–4,604 | 4,715–5,037 |
| unique, Mac GPU | 1,487–1,748 | 2,560–2,838 | 3,578–3,866 | 3,756–4,034 | 4,249–4,531 |

The designer's "2.3 s plus 1.1 s" for interactive is the best case: canvas from 2.5 s, full from 3.6 s. At 3 s the water has just begun to wake. `interactive-phone-cold-3000ms.png` looks like the still.

Strength once running (whole-frame PSNR, lower moves more; frames about 2 s apart on interactive, flat against phase 0.3 on unique):
- **Interactive:** 22.6 dB on the phone and 20.2 dB on the laptop, against 34–40 dB and 35.8 dB in round 1. The water alone is 20.0 and 18.0 dB. Sky is pixel-identical (`inf`), so the sky is locked.
- **Unique:** 22.1 dB on the phone (round 1: 20) and 27.0 dB on the laptop (round 1: 30.7).

So unique's swell did not get meaningfully quieter on these numbers. It changed character instead (see §3).

**Outside dimension 8, for the critic:** all three still request `fonts.gstatic.com` on load, and calm and interactive also `fonts.googleapis.com`. First paint on the throttled phone: calm 776 ms (round 1: 1,476), interactive 892, unique 748.

**The current site, honestly.** The comparison is unchanged from round 1 (`funnel/walk/01-home-fold-settled.png`, `11-wizard-4-date.png`, `11-wizard-5-slot.png`). It has palm trunks over a real breaking wave, a pool that is not the school's, a cookie box, no name and no town. It runs 36 phone screens with no menu. Its one real advantage stays: it holds a slot. A traveller leaves with 8:00 on the 11th, $8 paid and $32 on site, after 5 taps, 3 typed fields and a card. Every mockup ends in a question sent to a number nobody has seen answered, with no reply time and no hours. All three still beat it for a stranger comparing schools, most of all at first contact. Whether a WhatsApp question converts as well as a held slot cannot be answered by walking a page. It stays a decision for the human.

---

## R2 §1. Calm: "The sand", 8/10

### Timeline (phone, throttled)
Frames requested at 0.5 s and 1.5 s were taken late (about 4.3 s and 5.4 s) because the first screenshot stalled under 4× CPU, so they are no evidence for the earliest moments. The page's own timing: first paint 776 ms, hero image complete by 1.7 s, load 3.45 s. Settled from `calm-phone-cold-3000ms.png` on.

**First seconds communicate:** surf lessons, Weligama, one red button, and now a real person standing up on a green wave. That print is the one change that matters. The first screen no longer sells only a headland, so the round 1 method 5 cap comes off. It is clean, bright and sure of itself, and the most conventional of the three.

Two honest doubts:
- The biggest thing on the screen is still a headland of resort roofs that are not the school's.
- On the laptop, the rounded print at lower left can read as a video thumbnail with no play button (`calm-laptop-fold.png`).

### Walk (`calm-phone-sheet.png`, 12,672 px, 15 screens; `calm-laptop-sheet.png`)
- **The lift moved up.** The lesson print, then lessons, then the paddler band, then Sanjee walking in, now around screen 5 rather than screen 9. Boards follow him. It is a better order for wanting to go.
- **The photo grid in Waves** (sunset, dogs, sand, poles, silver sea) is new and a real lift, a good answer to the old site's picture block.
- **The tail** is about 3.3 screens (y≈8,413 to y≈11,170) with prices on the title line and one print among the rows. It no longer sags as it did.
- **Attention drops** at the board-rental paragraphs and in the tour rows, which still look alike, and in the script line at phone size, where Mr Dafoe is the slowest thing to read on the page.
- **The ending:** footprints, then the name in script over the tide edge. Warm.

### Booking
1 tap everywhere. Hero and bar: "Hello Sanjee Surf School, I'd like to ask about surf lessons." Lesson, board and tour buttons name their subject ("…about the Surf Spot Safari tour."). 22 links. There is no way to state a date or level before the tap, so that is left for the traveller to type in WhatsApp. Price and level are clear before the tap. Hrefs read, not opened.

### What I operated, and round 1 fixes
| Round 1 fix | Result | Evidence |
|---|---|---|
| A human moment on the first screen, less empty sky | **Landed**, with img-006 (a surfer) rather than the lesson on sand I asked for. The lesson print stays one scroll down. Good enough | `calm-phone-cold-3000ms.png` |
| Redraw the wash line | **Landed on the laptop**, a soft long edge with no lumps. **On the phone the print covers most of it**, so the concept's device is now barely visible there | `calm-laptop-fold.png`, `calm-phone/s00.png` |
| Break the tail | **Landed** | sheet |
| Hero button under the wordmark | **Landed.** Header solid from y≈100, and at y=400 solid with the bar on. Nothing prints through. The button passes under a white header (`calm-op-hdr-y200.png`) | `calm-op-hdr-y400.png` |
| Self-host fonts | **Not done**, but first paint improved | above |
| Boards table early; `spot` in text face; track takes each quote's height | **All landed.** Track 270 / 270 / 298 / 128 px, animated over 240 ms | `calm-op-quote-0.png`, `-quote-3.png` |

Also operated:
- **Quotes:** touch swipes and dots both move the track, and the dots follow. The page below rises or falls by up to 170 px on the shortest quote. That is animated, and I found it acceptable.
- **Phone menu:** opens, Esc closes and returns focus to the summary, outside tap closes, all six links land clear of the header.
- **Reduced motion and JS off:** both look right on the phone (`calm-reduced-phone.png`, `calm-nojs-phone.png`).
- **Micro-animations:** 35 of 40 controls on the laptop carry a transition. The dots animate through their own bar.

**Nothing got worse.** One small new mismatch: the menu lists Boards before Sanjee, while the page now has Sanjee first, so "Boards" jumps further than its neighbour.

### Score: 8, better than the current site: yes
Engaging for a calm page, clearly better than the old site, and the easiest of the three to read and book. It passes narrowly, on a print that puts a person on the first screen. It has no spectacle, so it is the page most exposed to "nice, but what do I remember?" at the human pick.

**Fix list (biggest effect first)**
1. **Make the print belong to the wash line on the phone.** In `.hero` at under 768 px, raise or shrink the print so that some of the wash edge shows on both sides and the white visibly laps at it. Today the device is close to invisible.
2. **Stop the print reading as a video on the laptop.** Give the print less corner radius, or a little overlap with the headland, so it reads as a photograph laid down rather than a player.
3. **Put the menu in page order.** In `.menu-panel` and the desktop nav: Lessons, Sanjee, Boards.
4. **Set the feature line and long titles in a more readable size or face on phones.** Mr Dafoe at 36 px on `Making waves, one lesson at a time.` is slow.
5. **Self-host the fonts** (critic's line too).

**Keep:** the print on the first screen; the red from the learner's board, used only for booking; Sanjee moved up; the photo grid; the paddler band; the footprints.

---

## R2 §2. Interactive: "Where you start", 7/10

### Timeline (phone, throttled)
| Time | On screen | Frame |
|---|---|---|
| taken about 2.1 s | Title, button, header all usable. The sunset has painted down to the near waves, and the bottom third is still a flat taupe block while the image arrives | `interactive-phone-cold-500ms.png` |
| taken about 3.3 s | The whole picture in. Canvas up, water only just starting | `interactive-phone-cold-3000ms.png` |
| 3.6–4.3 s | The swell at full strength | timings above |

**First seconds communicate:** a sunset over a surf break in Weligama, moving water, one blue button. This is now the most beautiful first screen of the three, and the first with strong colour. It makes you want to be there. The surfing is told by the title and by tiny figures: four paddlers on the laptop, about 4 px dark marks on the phone.

**Did losing the close paddler hurt?** It lost something and gained more. Round 1's hero said "surfing" straight away, in a low-energy blue-green. This one says "this coast at the end of the day", with a close breaking wave in the foreground, and the next screen supplies the people through the tiles. A net gain, with one cost: a stranger who only sees the fold could take it for a beach or a sunset page rather than a school, which is the title's job to correct.

**The hard bar:** on the laptop the near-black title `#181D10` sits on orange cloud. Measured behind the title with the text hidden: average `rgb(227,158,104)`, hue 26°, saturation 0.54 (`interactive-laptop-fold.png`). Contrast is fine at 7.7:1, but calibration says "Never black or blue text on orange", and that a page showing any listed point is below 8. The wordmark and nav also sit on it. On the phone the title sits on the pale band above the clouds (hue 36°, saturation 0.18), so **this is a laptop crop problem only**. It comes from `data-crop-wide`, which starts lower in the photograph than the phone crop does.

### The main item, walked
It is now plainly felt once running. Frames 1.4–2 s apart differ visibly (`interactive-phone-swell-0.png`, `-2.png`, `-4.png`), the water lifts and glitter moves, the sky stays locked and the figures hold. **No jelly in any frame**, including the close foam at laptop size. That is the fix I asked for, and it landed strongly. It runs without any interaction. Its one shortfall is the start: not felt at 3 s on a throttled phone, by about 3.5–4 s. I could not watch it in real time on a real phone.

### Walk (`interactive-phone-sheet.png`, 13,012 px, 15 screens; `interactive-laptop-sheet.png`)
- **Tiles with pictures are a big step up** (`interactive-op-01-tiles.png`, `interactive-laptop-tile-click.png`). The lesson on the sand, a surfer turning, the paddler, big white water, the bay. You choose yourself by picture. The grey app panel is gone.
- **Cards, message, boards chart:** all good. The chart now stands on sand in real colours and is a real moment on both widths.
- **Sanjee on the wave**, then the quotes, is still the strongest passage.
- **The closing bay** in full, with `closing` in the sky, is still a reward.
- **Courgette** replaces the old marker face: readable and tasteful, slightly café-menu. Better than round 1.
- **Attention drops** in the tuk-tuk rows, as on all three.

### Booking: built message, hrefs read after building one
I chose Total beginner, Beginner Lesson, a date and 2 people. The bubble and `#send` read: "Hello Sanjee Surf School, I'd like to ask about the Beginner Lesson. I'm a total beginner. The date I have in mind is 19 November 2026. There are 2 of us."

| Control | Carries it? |
|---|---|
| Phone bar, header button, hero, closing, footer | **Yes, the same text as `#send`** |
| The three cards | **Yes**, keeping their own subject: "…about Private Coaching. I'm a total beginner. The date…" |
| Board button | **Yes:** "…about renting a board. I'm a total beginner…" |
| All 12 tours | **Yes:** "…about the Galle Fort tour. I'm a total beginner. The date…" |

The message now survives everywhere, and the prefills are fixed ("Private Coaching", "the Galle Fort tour"). **Over-reach:** "I'm a total beginner" on a Galle Fort or Tea Estate outing reads oddly, though it harms nothing, since the visitor will see the text in WhatsApp. It would read better if outings kept only date and people.

### What I operated, and round 1 fixes
| Round 1 fix | Result | Evidence |
|---|---|---|
| Swell felt | **Landed**, late by under a second on a throttled phone | above |
| Header overprint | **Landed.** Solid by y=60, when the title reaches it. Nothing prints through at any step from y=0 to y=300 | `interactive-phone-hdr-y60.png`, `-y140.png` |
| Bar and cards follow the message | **Landed** | table above |
| Show a tile's effect on the phone | **Half landed.** The strip above the bar says "I'm a total beginner." at once and goes to the message. **But the new lesson chips under the tiles are hidden in practice.** With the first tile at y=80 / 120 / 200 / 300 / 400 the chip row sits at y=712 / 752 / 832 / 932 / 1032, and the strip starts at y=728. So "Beginner Lesson, USD 40" never shows on tapping a top-row tile, and the page does not scroll | `interactive-op-03-tile-tap-settled.png` |
| Warm up the middle, fix prefills | **Landed.** Cards now size to their content (382 / 356 / 334 px), and the 120 px gap has gone | sheet |

Also operated:
- **Tiles (all five):** ring and label fill. Total beginner gives Beginner Lesson; I can stand up gives two lessons; Intermediate and Advanced give Private Coaching; Not sure gives only "Your message". Tapping again clears. The chosen level's wave paragraph lights up (`interactive-op-wave-lit.png`).
- **Chips:** the lesson and people chips and the date each rewrite the bubble, with a word-level fade-in in the code that I did not catch in a frame. The date was set programmatically. I did not tap the "Not sure" chips.
- **Strip above the bar:** a real link to `#message`, settling with the panel at y=84 under the 60 px header. It also stays on screen when you scroll back up to the hero, floating alone with the bar gone (`interactive-op-12-menu-open.png`, bottom). A small oddity.
- **Soft-top / Hardboard:** slides, digits roll, labels update (`interactive-op-09-rates-hard.png`).
- **Phone menu:** opens, Esc closes and returns focus, outside tap closes, all six links land clear of the header.
- **Reduced motion:** the still (`interactive-reduced-phone.png`); the script returns before it starts the canvas. **JS off:** the phone hero button is hidden on purpose (`.no-js .hero-btn`), and the bar is there from the first paint with a real link (`interactive-nojs-phone.png`).
- **Micro-animations:** 52 of 58 controls on the laptop carry a transition, so method 5 is met.

**Got worse:** nothing in the walk. The direct "surfing" read of the old hero is the only thing given up, as above.

### Score: 7, better than the current site: yes
By the walk alone this page earns 8: the swell is felt, the message survives, the middle is no longer an app. It stays at 7 only because the laptop title is on the calibration's hard-bar list. I am applying that literally, since a critic that passes what Shahar has already ruled out has failed its eval. This is a small fix, and it should not need a redesign.

**Fix list (biggest effect first)**
1. **Get the laptop title off the orange.** In `[data-swell]`, re-cut `hero-img-018-wide` and `data-crop-wide` to start higher in the photograph, so the title lands on the pale band as it does on the phone, and check the wordmark and nav too. Failing that, white on a darker orange, as calibration allows. The shader reads the crop from that attribute, so retest the horizon after the change.
2. **Make the lesson chips visible after a tile tap.** In `#fits`, on the phone, put the chips above the tile grid, or scroll them into view on tap. Today the bar and strip cover them.
3. **Start the swell sooner.** In `later()` and `boot()`, lines 803–807, begin before the `load` event once the hero image has decoded, and shorten the 1.1 s ramp on line 788, so that it is felt by 3 s on slow 4G.
4. **Leave the level out of outing prefills.** In `syncLinks`, line 874: for the nine outings, send date and people only. The three surf tours and the board button can keep the level.
5. **Hide the message strip when the bar is hidden.** `.bar-msg` at the top of the page. Also check that "Not sure" gives a suggested lesson rather than only a message link.

**Keep:** the sunset and swell; picture tiles; the message following every button; no card ever dimmed; the lit wave paragraph; the board chart; Sanjee on the wave; the bay as the last picture.

**For the human at the pick:** the "Advanced" tile uses img-010, which the concepts held in reserve for its rights flag (concepts §2, §6). img-007 and the identifiable img-005 also appear here and need clearing with the owner.

---

## R2 §3. Unique: "The set", 8/10

### Timeline (phone, throttled)
| Time | On screen | Frame |
|---|---|---|
| taken about 1.3 s | Title, button and rating sharp. The small print is in. **The bay and front print are soft blurred placeholders, no longer white boxes** | `unique-phone-cold-500ms.png` |
| by about 1.7 s (resource timing); frame taken 3.7 s | All images in; sharp in the frame | `unique-phone-cold-3000ms.png` |
| 3.6–5.0 s | The swell reaches the front print, peaking at 4.3–5.0 s | timings above |

**First seconds communicate:** a man carving a wave on a yellow board with a pink rail, in front of the headland, under a loud happy title, with "5/5, 13 Google reviews" under a button in the rail's colour. It is still the only fold where you see who you would learn from, and still the one I would remember. The concept's white page has gone: the prints now sit on the full-bleed bay. That costs some of the idea and gains a lot of cleanliness, especially on the laptop, where it no longer comes close to scrapbook (`unique-laptop-fold.png`).

**Did the quieter swell hurt?** On the numbers it is hardly quieter (22.1 dB against 20 on the phone, 27.0 against 30.7 on the laptop). What changed is its character. The prints now ride nearly rigid, lifting up to 10 px with a tilt of at most about 1.3° and a shadow that moves (`unique-phone-freeze0.png` against `-freeze0.3.png`), rather than flexing like paper. The surfer no longer stretches, which I asked for. It reads as a photograph floating on a swell: still felt when it arrives, less special than the paper flex, and cleaner. It now returns every 8.4 s rather than about 12. A fair trade, neither gain nor loss on balance. **Its weakness is timing:** not felt within 3 s on a throttled phone, because the pass waits 900 ms after load and starts well off-screen. A visitor who scrolls straight away misses the first one, and later passes stop once scrolled past 40% of a screen.

### Walk (`unique-phone-sheet.png`, 12,065 px, 14 screens; `unique-laptop-sheet.png`)
- **The blue block with huge prices** is still the boldest cost moment of the three.
- **Sunset band with the feature line**, then Sanjee, a strong change of light. **Flag:** ink on a warm sky. Measured behind the line: hue 33°, saturation 0.21–0.28, so pale tan rather than orange, and I do not count it as the calibration breach. But the orange clouds begin right under it, and Shahar may read it differently (`unique-laptop-featureline.png`).
- **Sanjee's tilted print and large words, 5/5 large, the quote row:** the man the reviews are about, set like he matters.
- **The tuk-tuk rows** are lively for what they are. **The dogs** are still a warm human joke. Attention drops least on this page.

### Booking
Hero and bar: 1 tap, "…ask about a surf lesson." "Ask about this lesson": opens the sheet with that lesson chosen. Built: "Hello Sanjee Surf School, I'd like to ask about the Beginner Lesson. My level: total beginner. Date: 19 November 2026. People: 2." It fits one phone screen with nothing to scroll (sheet 738 of 844 px). It is still the closest thing to the old dialog's reassurance, with the lesson's price and date in one place, in about 3 taps and no typing. It holds no slot and does not pretend to. Hrefs read, not opened.

**A gap:** the built message lives only in the sheet. Close it and the bar and tours still send the generic text. Lesson buttons reopen the sheet with the choices kept, so this matters less than on round 1's interactive, and I do not count it as a defect of the same weight.

### What I operated, and round 1 fixes
| Round 1 fix | Result | Evidence |
|---|---|---|
| Blank prints on load | **Landed:** blurred placeholders | `unique-phone-cold-500ms.png` |
| Clean the collage | **Mostly landed.** Sand sliver gone, title 24 px under the header, laptop back row dropped. **The small print still reads as a tile on the front print's top edge:** it overlaps by only 10 px, 70 px tall | `unique-phone-cold-3000ms.png` |
| Hover on every button | **Landed:** press-fill on mouse enter, darkens with a soft shadow | `unique-laptop-cta-hover.png` |
| Slashed zero | **Landed:** the text face is now Figtree | sheet frames |
| Drag-to-dismiss | **Landed.** Real touch through CDP: 48 px slow drag follows the finger and springs back; upward has friction; 180 px slow closes; a 90 px flick in 138 ms closes; an earlier 60 px flick stayed open (speed not logged, and the threshold is 0.5 px/ms, so it may just have been too slow through CDP); dragging from the title closes; dragging from the body does nothing, rightly. Focus returns to the lesson button | `unique-op-sheet-mid-drag.png` |
| Esc on the phone menu | **Landed:** closes and returns focus to the summary. Outside tap closes too | `unique-op-menu-open.png` |
| Price stepping, surfer stretch | **Landed:** no false indent on the phone; no stretch | sheet |

Also operated:
- **Sheet:** Esc, × and backdrop tap all close and return focus. Reopening from another lesson keeps level, date and people and updates the lesson. Laptop: a centred 640 px panel, send button in view (`unique-laptop-sheet.png`).
- **Strip and quotes:** real touch swipes move them, and the dot follows (`unique-op-strip-1.png`, `unique-op-quotes-swiped.png`).
- **Menu links:** all land clear of the header. "Waves" lands on Coco Beach, with its title 903 px down, which is the section's true start.
- **`?swell=`, `?still`, `?nogl`, reduced motion, JS off:** all clean, and the layout holds (`unique-op-still.png`, `unique-op-nogl.png`, `unique-reduced-phone.png`, `unique-nojs-phone.png`).
- **Micro-animations:** 33 of 38 controls on the laptop carry a transition; method 5 is met.

**Got worse:** nothing broke. The paper flex and the white page are the two losses, both traded for cleanliness.

### Score: 8, better than the current site: yes
Engaging from the first second, clearly better than the old site, easy to book, and every interaction I tried worked. It holds 8 rather than rising because the main item arrives late and has grown more ordinary.

**Fix list (biggest effect first)**
1. **Get the first swell felt by 3 s.** In the script, `schedule(900)` at line 955 and `phaseToFront` at line 922: start the first pass at once with the front already near the print, so that a visible lift arrives within about 1 s of load.
2. **Give the small print room on the phone.** `.print.p-006`: let it overlap the front print clearly or float clear of it, and make it large enough to read. At 124×70 px it adds little as it stands.
3. **Decide the feature line's colour before the pick.** `Making waves…` on img-018: either place it where the sky is plainly pale or set it white on a darker band, so that no one reads it as ink on orange.
4. **Let the built message outlive the sheet.** After a send or close, let the bar's link carry the same text as `#sheet-send`.
5. **Add back a trace of flex at the print edges** if it stays clean. `(hgt(p)-H)*.14` in the vertex shader is the term to raise a little, checking that the surfer does not stretch.

**Keep:** img-007 in front; huge prices; the one-screen sheet with drag; hero and bar going straight to WhatsApp; the swipe strip; Sanjee's tilted print; the dogs.

**For the human at the pick:**
- This page still leans hardest on **img-007, which carries a rights flag** (concepts §6). If the owner cannot clear it, the page must be re-scored.
- The rating now sits with title and button **over a photograph**, not on white as the concept argued. It is a title, not a tagline, and the sky is clear, so I do not count it as the calibration's "tagline + rating + button stack", but it is closer to that line than round 1 was.

---

## Round 2: what the designer prompt got wrong (one paragraph, quotable)
The reworks fixed almost everything named, which shows the fix lists were actionable, but both swells were tuned on strength and neither on arrival time. A main item that starts after the `load` event, and then ramps or waits off-screen, misses three seconds on slow 4G however strong it is: measure from navigation on a throttled phone, not from canvas start. A new hero photograph has to be re-checked against the calibration at every width, because the crop decides what the title sits on: interactive's title is on a pale band on the phone and on orange at 1440. And an effect added below a tile grid on a phone needs checking against the persistent bar, since a chip row at y=712 or lower sits behind a strip that starts at y=728.

## Round 2: what I could not test
- **A real phone.** WebGL ran on SwiftShader and on a Mac's GPU under 4× CPU, about 22 fps on interactive. A mid-range Android's GPU, its frame guard stepping down or stopping the swell, battery, heat and iOS Safari are all untested. So is drag and momentum on a physical screen; touch was real through CDP, not a finger.
- **Watching in real time.** I judged the swells from frames, recordings and the page's own WebGL values, not by eye at speed.
- **Native date pickers.** Dates were set programmatically on interactive and unique.
- **WhatsApp.** No link was opened, and nothing was sent. wa.me was blocked at the browser level in the scripts that tapped controls, and I tapped no WhatsApp link. Whether the number answers, and how fast, is unknown.
- **The live current site.** Captures only, as instructed.
- **Laptop with JS off or reduced motion.** Tested on the phone only.
- **Earliest calm frames.** See the timeline note in R2 §1.
- **The gold pages and skills.** I did not re-render the gold pages this round, or run `/impeccable`, `/emil-design-eng`, the motion audit or the inspector. The bar was the calibration in `references.md` and round 1's gold frames.
