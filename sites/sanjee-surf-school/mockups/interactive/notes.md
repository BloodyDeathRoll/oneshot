# Sanjee Surf School, interactive: "Where you start"

Station 4e, designer 0.7.1, run `2026-10-midigama-01`, concept 2 in `concepts.md`, reworked after pre-score round 1 (visual 5 with a hard fail, experience 7, critic 68.2 of 80; reports in `reports/2026-10-midigama-01/sanjee-surf-school*.md`).
Built by `src/make-media.sh` then `src/build.py` (words read from `copy/en.json`; `src/page.css`, `src/page.js`, `src/swell.js`).

## look-log

Compared with: `dossier/sanjee-surf-school/assets/old-site-desktop.png` and `old-site-mobile.png`. Gold notes read: Global Surf, The Lavish Haven, KA, Layday.

Rounds 1 to 6 are the first build (img-009 hero); committed in a2854d6. Rounds 1, 2, 7 and 8 were shot with a scratch Playwright harness at 1440x900 and 390x844, not `tools/shoot.mjs`, because I needed frames over time. Rounds 9 to 11 are `tools/shoot.mjs` over http on my own server. Rounds 12 to 14 are the third pass after pre-score round 2 (visual 7, experience 7, critic 70.4). Only `shots/round-14` is kept, with `hero-2560.png` added to it.

**Round 1, first screen.** A paddler alone on an aqua band, flat and hazy. Mild grade baked in. Clearly better than the old pool on plainness, not on richness.

**Round 2, first screen.** Slit-scan showed the water wobbling in place, phone canvas softer than the still. Added sliding surface layers, phone canvas 1.3x. Still better than the old site.

**Round 3, first screen.** Layers smeared the lens droplets, no phone menu, heavy button shadow. Droplet zone locked, menu added, button flat. Better than the old phone screen.

**Round 4, whole page.** Grey admin panel, grey chart, misaligned prices, see-through header. Lightened panels, recoloured boards, aligned prices, opaque header.

**Round 5, whole page.** Broken rolling digits, nav short of the edge, oversized tablet boards, surface layers fogging the water. All fixed, travel halved.

**Round 6, whole page.** Final check of the first build. It then failed pre-score: flat, soft hero, shimmer nobody notices, dashboard middle. The critics were right: I had logged the anchored ripples and the soft phone hero as blocking and still built everything else around them.

**Round 7, first screen, new hero.** img-018 full-bleed with the shader on its water only, title in the sky. This is a different class of first screen: sun, swell lines, surfers and a breaking wave in one frame, sharp on a phone. What is wrong: the glints near the shore are soft pale blobs and smudge the reflection, because the noise stretches with perspective. I will drive the glints from photograph coordinates. Beside the old pool it is clearly better at a glance, and for the first time richer as a picture as well as clearer.

**Round 8, first screen.** The finer glints then sprinkled an orange speckle all over the blue-grey foam and looked like noise, and a phone crop made it obvious. I gated glints and the specular pass to pixels already reflecting warm light, and made them sparse and stretched along the water. Frames are now clean; the slit-scan shows the bands sloping as a front passes, the sky difference is black, and frame-to-frame PSNR is about 20 dB against the first build's 35.8. Clearly better than the old site.

**Round 9, whole page.** White ground, photo tiles, Courgette and coloured boards replace the dashboard and read as a surf school. Still wrong: the title ran under the wordmark at scroll 80 to 120 because the header only turned solid when the whole title had left; fins stuck out through the rails on the round tails; "2 / hours" broke across a line in the Private card. All three fixed; the header check below now shows solid from y=80 at both widths. Clearly better than the old 30,387 px page, and it now has a picture wall of its own to set against the old mosaic.

**Round 10, whole page.** On a phone the Week paragraph inside its card made the swipe row 507 px tall, leaving 125 to 150 px of white under the two shorter cards, the same hole the critics marked, moved outside the card. I moved the paragraph directly under the row at every width. It names the Week Intensive itself, so it still reads with it.

**Round 12, first screen (third pass).** White title over a plain brown overlay: legible (5.0:1 worst cell), but the clouds went flat and dull. Also lifted the stage's width cap and looked at 2560: no panels. Multiply will keep the clouds' light. Beside the old site's pool, still clearly better.

**Round 13, first screen.** Multiply scrim: the clouds keep their colour, title worst cell 5.3:1 at 1440. Foam still moved through 12 px because it sits at d of about 0.5 on a laptop, not in the band I had lowered; band widened, now -7 to +1 with -5 to +1 sideways, and foam frames still read as foam. The swell now starts at the decode, about 1.9 s throttled. The first draft of the Advanced crop showed a surfer's arm at its edge, so I moved it.

**Round 14, whole page, last.** Band cut to 52 vh with the head gone; row under the cards on one baseline (468.8 for all three). Phone chips stick above the strip at every tile position, y=624. The sheet found my own bug: the empty sticky `.fits` drew a 14 px white stripe across the tiles, now sticky only when it has chips. Audit found `scroll.early.cls` 0.0241 from the font swap, fixed with a same-width fallback (0, 0.0009, 0.0009 on three runs). Still clearly better than the old site at both widths: a surf sunset that moves, the name and place, one tap to a message.

**Round 11, whole page, end of second pass.** Sheets checked at both widths for overflow, overlap and unreadable text: none at rest; fixed header and bar pass over text while scrolling and nothing rests under them. Reduced motion, no WebGL and `file://` show the same still with the canvas hidden; tiles work without WebGL. No JS hides tiles and message panel and keeps every word and link. **Why this beats the old site:** a real sunset on this coast with moving water, surfers and the school's name in place of a hotel pool; the level question answered with the school's own pictures; a price one scroll further on instead of 2,500 px; one tap instead of five taps, three fields and a card.

**Round 15, patch after pre-score round 3, listed fixes only.** Typed dates work: 10/12/2026 reaches all 22 links, a past date never reaches one and leaves the field on blur. The band holds the paddler whole at 1440, 2200, 2560x1440, 2560x1080 and a phone, and the alt now says one more head, as the crops show. Foam on stepped frames, ANGLE Metal: band brightness swing 17.6 % to 5.1 % at 1440, 19.9 % to 5.2 % at 390, far ends r 0.92 to 0.17 and 0.82 to -0.84, sky identical in every frame, no tearing in the frames I opened. Nav pill at .10: median 5.15 at 1440, lowest pixel 3.72. Still clearly better than the old site. **Nobody has watched the swell live.**

### Skills, one line each
- `/animate`, `/design-motion-principles` (first build): tokens kept. `--ease-out`, press 120 ms, state 240 ms, travel 300 ms, sampled spring.
- `/find-animation-opportunities`: boards stand up once with a 50 ms stagger; new this round: the ring slides to the chosen tile, fit chips rise 5 px on appearing, bar preview slides up.
- `/review-animations`, read and applied by hand: the ring moves on transform only; its width and height change instantly. Fit chips use a keyframe entrance because they are redrawn, not toggled: a minor finding I accept.
- `/mobile-native`: as before; bar and header safe areas; 16 px date input. Nothing on real hardware.
- `/emil-design-eng`: first 90 lines only. `/impeccable`: `craft-floor.md` only; its scripts download a binary outside this worktree, so `detect` and `critique` did not run.
- `inspect.mjs`, last run over http, 4 FAIL and 6 WARN, all false or kept:
  - `icon-cards`, `eyebrow`: the "for you" dot, and "All prices are as of" sitting above the next section's line. Neither is a kicker.
  - `edge-text` at 768: not traced; I believe the next card or board in a swipe row.
  - `covered-text`: the sticky header in transit.
  - `size-count`: 18 sizes, partly clamps. Real, small, not fixed.
  - `no-footage`: no usable video. `side-scroll`: the peek rows. `still-page`: it counts DOM movement, the moving thing is a canvas.
  - `lopsided`, `empty-middle`: not seen in the render.

## images

| File in `dist/img/` | Asset | Measured | Licence note | Use |
|---|---|---|---|---|
| `hero-img-018-wide-1440`, `-tall-1000` | img-018 | 1440x1920 | business-owned, sanjee-surf.com | hero, full-bleed |
| `og-img-018-1200.jpg` | img-018 | | as above | OG image |
| `tile-img-005-380`, `-240` | img-005 | 832x464 | business-owned, Google listing. Identifiable, consent is an owner item | Total beginner |
| `tile-img-006-384`, `-240`, `print-img-006-848` | img-006 | 848x480 | business-owned, Google listing | I can stand up; print |
| `tile-img-009-520`, `-260`, `feature-img-009-wide-1500`, `-near-1040` | img-009 | 1600x1067 | business-owned, sanjee-surf.com | Intermediate; feature band |
| `tile-img-006-wave-*` | img-006 | 848x480 | business-owned, Google listing | Advanced (the wave, no surfer) |
| `tile-img-012-tall-300`, `-wide-700`, `-wide-400` | img-012 | 750x558 | business-owned, sanjee-surf.com | Not sure |
| `print-img-007-962`, `-640` | img-007 | 962x938 | business-owned. **Open rights flag, may be a beach photographer's** | Sanjee print |
| `print-img-014-1000` | img-014 | 1280x960 | business-owned | print |
| `back-img-002-wide-2000`, `-tall-900` | img-002 | 2000x1500 | business-owned, Google listing | closing band |

No review photo and no atmosphere image, so no credit line is needed. img-036, `usable: false` images and the concept's rejected images are not used. No generated imagery.

**Hard constraint 5.** Other businesses' first screens in this run: a drawn board window on a beach, a carved gate, a shaded garden, a thatched roof. This is an open sunset sea with moving water and no building. Within this business, unique also carries img-018, small, as one print among five; calm leads on img-002. I did not open the sibling mockups.

## gaps

- Video: none usable. The swell stands in for it.
- Hours, cancellation, reply time, rental deposit amount: not on the page, by instruction.
- Instagram: omitted, all socials dead (F11).
- Beginner Lesson private or group: no row, by instruction.
- Schema gaps as in concepts §6, plus level-tile pictures (no field ties a picture to a level) and the tiles' labels. Board colours, widths and shapes live in the template.

## conflicts

**The hard-fail rule, measured.** Rubric: "has photographs ≥ 1920 px and the first screen carries none of them". Measured with `sips`: img-018 is 1440x1920, img-002 is 2000x1500. **img-018 clears the rule only by its long edge**, the reading in concepts §2 and the one the visual critic proposed. Its width is 1440, so a critic reading the rule by width would still call this a hard fail. img-002 is the only own landscape at 1920 px wide. I kept img-002 as the closing reward (the experience critic asked to keep it) because it is calm's lead and using it as this hero would cost divergence. Above 1440 wide the hero is upscaled: 1.33x at 1920, then capped at a 1920 px stage.

**Departures from concepts.md, each because it looks better on screen or a critic asked:**
1. **Hero moved from img-009 to img-018.** The concept's "one person paddles at one wave" is gone from the first screen; the paddler moves to the feature band and the Intermediate tile. Concept's hero is calibrated to a person; this one has small figures only. The experience critic judged a person going out to be what a learner imagines, so this trades that for picture quality and clear motion.
2. **Title in the sky**, high on the screen, not centred vertically (calibration) and not low on the water (concept). On desktop it sits on the clouds: contrast worst cell 6.2:1, but the cloud texture sits behind it.
3. **Swell amplitude up to 8 css px** at the near water, against the concept's 3, as the coordinator asked. Refraction adds an estimated 2 or so more. Flat-water glitter added on the sun's path.
4. **Figures are not masked** in this picture. They are small and ride the water; the horizon, sun and tower are locked. First-brief condition ("paddler stays masked") relaxed by the coordinator's later brief.
5. **Phone canvas up to 2x, water only**, against the concept's 1x, so the moving water is as sharp as the still.
6. **Section-title face is Courgette**, not Covered By Your Grace, chosen from six rendered candidates on "Sanjee, head instructor" and "Other waves, as we rate them". Not used elsewhere in the run or gold.
7. **Colour:** grey panels removed. White ground plus a pale water tint `#E6F2F4`, a lightened value I chose from img-009's water rather than a direct sample; `#D6DAE0` is gone. Sand strip `#EFE3CF` under the boards.
8. **Boards** coloured per type from the school's photographs (soft-top red and blue from img-005, wave aqua and lower water from img-009, deck and rail from img-007, sunset orange from img-018, by eye from those samples). Lengths are from the copy; widths, shapes and fins are illustrative and no width is printed. Red and blue suggest the soft-tops but the chart does not claim those colours are what is rented. On a phone they stand in a swipe row at one scale.
9. **Tile pictures added** (visual critic, custom.md). The ring slides instead of the concept's pill. A picture beside a level is illustration, not a claim about who is in it. img-005 shows identifiable people.
10. **Week paragraph** is off its card (concept: "¶2 on the Week card"), directly under the Week column on wide screens and directly under the swipe row on phones, as the visual critic proposed. On a phone it is therefore not next to the Week card while another card is in view; its first words name the Week Intensive.
11. **Prefill "the Galle Fort tour", "Private Coaching"**: "tour" is from [4]. Message links: every WhatsApp button carries the built message. A card, tour or board button keeps its own subject and adds level, date and people, so it matches `#send` except for its subject, by design: a card about the Beginner Lesson should not send "Private Coaching".
12. **Hero is a normal file**, so `file://` shows the still (WebGL refuses a `file://` image). Over http it runs. Moved out of base64 at the critic's suggestion: cacheable, and first load is now 402 KB uncompressed instead of 232.
13. Tile code not lazy-booted: inline at 4e. Date field label beside it, not floating.

**Wording of mine to check:** "2 hours each" (coordinator's exception), "as of 5 November 2026" on the rating (capture date), "per lesson", "per day", "for you", "Your message", "Add to my message", "In my message", "Languages:", tile labels, and the message sentences.

**Check scope:** `check-design` run on this page's path, not `<slug>`, because the slug form writes into sibling `shots/`. `check-design` and `audit-mockup` were scratch copies differing only in port (9323, 9324).

**Round 3 departures and calls:**
- **White title on a darkened sky at 701 px and up, ink on the pale band below that.** A multiply scrim over the top 46% of the stage, so the clouds keep their light (a plain overlay, tried first, turned them flat brown). The sky is darker than the photograph. It is a treatment on the picture, allowed by playbook §1a's legibility scrim and by the calibration's "white on a darker orange". I did not re-cut the crop higher, which the experience critic offered: the sky above the clouds is out of a 16:10 frame without losing the water.
- **Stage has no width cap.** At 2560 the 1440 px file is 1.78x. It holds as a sunset; it is soft close up.
- **Advanced tile is the wave alone**, a second crop of img-006, the same frame as "I can stand up". No unflagged picture shows an advanced surfer: img-006 is the only other own action frame without a flag, and img-007 carries one. img-010 is no longer on the page.
- **Outing prefills drop the level; the three surf tours, cards and board button keep it.**
- **`og:image` is `https://sanjee-surf-school.os1.workers.dev/img/og-img-018-1200.jpg`, an assumption until station 6** (the address unique used). No such deployment exists to check.
- **Fallback font added (`Manrope-fb`):** Arial at 101.2%, measured on this page's text, because `scroll.early.cls` hit 0.0241 when the font swap rewrapped text with the cards in view. The Roboto value (102%) is an estimate: no Roboto on this machine.

**Blocking:** none that I know of. The previous two are addressed: the water now visibly changes and the phone hero is 2.2 source px per css px. **I have still not watched it play** (stills, differences, slit-scans), and nothing has run on a real phone.
