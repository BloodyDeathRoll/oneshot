# calm — "Daybed" · designer 0.4.1 · station 4e · run 2026-09-globalsurf-02

Page: `dist/index.html` (+ `dist/img/`, `dist/video/`). Shots: `shots/round-1 … round-7` (+ `round-6/static/` reduced-motion and no-JS captures). Funnel: `funnel/funnel.json`.

## look-log

Old-site reference beside every round: `dossier/global-surf-adventures/assets/old-site-home-desktop-fold.png`, `old-site-lodge-desktop-fold.png`, `old-site-home-mobile-fold.png` (a grey surf clip under a centred serif headline; the lodge page is a dark brown aerial of a tractor field with a badge printed over the breadcrumb and headline, a Messenger bubble on the text, no price anywhere).

**Round 1 — first screen only.** vid-009 poster/loop full-bleed, name at 96 px low-left, coral button in the header and again in the hero. Wrong: the name is set so large it sits on the white daybeds (the one thing) and the white letters vanish into white upholstery; two identical coral buttons on one screen shout; on the phone the button label wraps into a ragged two-line block. Change: stronger bottom gradient, smaller name, header link becomes a quiet underlined text link, phone button tightened. Versus the old site: already clearly better — their lodge page opens on a brown tractor field, ours on their own sunlit pool deck with a price-bearing path one tap away.

**Round 2 — first screen.** Legibility fixed by a 0→62 % ink gradient in the lower 62 % and a faint top scrim; one coral action. Wrong: the hero text was pushed into the centred 1200 px column while the header stayed at the page edge, so the two left edges disagreed; the proof line floated with nothing tying it to the button. Change: header into the same column with a 1 px white hairline under it (the house's thin precise line), proof line separated from the button by a 1 px vertical rule. Versus old site: clearly better at a glance, desktop and phone.

**Round 3 — first screen.** Column, hairline and rule in place; frame captured mid-loop (drone descending on the lodge's white roofs and pool) — the film carries the screen. Wrong: the proof line broke into three lines (the `<b>` became a flex item); at 78 px the two-line name still covered the lodge on the aerial frames. Change: proof line wrapped in one span; name capped at 72 px so it runs on one line at 1440 and sits under the subject. Versus old site: theirs is a static-feeling dark field with a watermark; ours moves, is light, and says what, where, how much trust and where to book in one glance.

**Round 4 — whole page, first build below the fold.** Sections: intro + two photographs bleeding to opposite edges; three level panels with the price printed on each; Freestylers / one-price / trust + actions; feature photo with `featureLine`; four-photo day run; rooms 7/5; rating + quotes; spot + Rosa; getting here; closing band. Wrong: the Level 2 and Level 3 panels used the dossier posters centre-cropped to 4:5 — Level 3's crop lost the barrel entirely and read as grey water, so the booking section's right two thirds looked dull next to Level 1; on the phone the feature line in ink sat on the darker water and was hard to read; the mobile bar's segment buttons let text behind them show through. Change below. Versus old site: the old site has no price and no per-level path at all; ours has both inside big imagery.

**Round 5 — whole page.** Re-extracted poster frames from the prepared cuts (vid-002 at 6.2 s: the surfer deep in the barrel; vid-003 at 2.2 s: a rider on a reef wave) and cropped them on the surfer; each clip's `object-position` matches its poster. Feature line white on the deep water on the phone, ink on the bright pool on desktop. Remaining: bar background, the check-design dark-ground flag on the hero placeholder colour.

**Round 6 — whole page over http (Rosa loads).** Rosa's light widget sits in its reserved 420×500 box beside the headline half; no console errors. Wrong: nothing structural; the hidden bar button came first in the DOM so the funnel read "Packages and dates" as the primary label. Change: bar moved to the end of the DOM (it is fixed, so nothing moves visually); hero `<video poster>` points at the AVIF the `<picture>` already loaded (no second 163 KB poster fetch).

**Round 7 — whole page, final.** Checked for overflow, overlap and unreadable text at 1440 and 390: none found; mobile bar never covers a booking control it duplicates. Side by side with the old site: first screen and whole page are clearly better — their own film full-bleed, big photography in every section, prices and per-level booking the old site never shows, one light calm system instead of taupe grounds, script headings and a Messenger bubble.

Reduced motion (`round-6/static/reduced-motion-390.png`): poster only, level panels show their stills, 0 video requests. No JS (`round-6/static/nojs-390.png`): poster, all text, all links work; the booking bar renders in the flow without the level switch. No WebGL on this page.

## images

All `business-owned` per `dossier.json` (`images[]` / `videos[]`, the business's own site and YouTube channel @globalsurf1582).

| used as | asset | note |
|---|---|---|
| hero loop + poster | vid-009 (cut src 3–15 s) + vid-009-poster (AVIF, 1280 WebP) | no watermark |
| Level 1 panel | vid-010 m1280 cut + its poster, 4:5 crop | centre crop removes the top-left badge |
| Level 2 panel | vid-003 m1280 cut (new cut on disk) + frame at 2.2 s of its d1920 cut, 4:5 | badge cropped out |
| Level 3 panel | vid-002 m1280 cut + frame at 6.2 s of its d1920 cut, 4:5 | badge cropped out |
| intro pair | img-002 (4:5), img-017 (3:2) | lodge |
| feature | img-005 (2000 px source, full-bleed; 4:5 crop on phone) | lodge |
| day run | img-104, img-011, img-111, img-023 (all 4:5 centre crops) | img-104 badge cropped out; img-111 place unidentified — no place claim |
| rooms | img-015, img-064, img-012 | lodge |
| getting here | img-072 | the lodge's roadside sign |
| closing band | img-093 (1536 px source, drawn ≤ 1536 at 21:9; 4:5 on phone) | lodge |

Surf clips and img-111 are never labelled as the lodge's own wave (concepts.md rule). No stock used. No captions under photographs.

## gaps

- No season in the dossier: no season line on the page.
- No reply time and no staff languages: none shown beside WhatsApp.
- The only WhatsApp is the Israeli HQ mobile (`wa.me/972523593240`, copied from `bookingLinks[5]` / `booking.whatsapp`); phone is `+97299733943`.
- "The Rock" has no Rosa spot; only South Point gets the forecast.
- Google 4.7 has no count: not shown.
- Rosa: only `rosa-kabalana.json` is checked in as a fixture; the concept maps to `south-point`. I fetched `https://rosa-data-opal.vercel.app/data/spots/south-point.json` on 2026-09-28 (built 14:26 UTC) and saved it as `rosa-south-point.json` next to this file; the headline values are inlined from it (0.7–1.0 m; swell 1.1 m 14.4 s from 198°; wind 7 km/h from 276°, cross-shore; for 20:30 local).

## conflicts

1. **Level clips move (concept: "the hero video, and nothing else moves by itself").** audit.json `recommended.notes` asks for vid-010 beside Level 1 and vid-002 beside Level 3, playbook §1a says use video whenever it exists, and the vid-003 cut now exists. Each level panel is its clip, poster first: it plays on hover/focus on pointer devices and, on touch, only while ≥ 75 % in view (one at a time in the swipe row), m1280 only, never under reduced motion or Save-Data. Cost of the alternative (concept's still photos img-126/125/099): a calmer page, but the business's level films unused.
2. **Level panel stills are video frames, not img-126/125/099**, so each poster is a frame of its own clip (schema v0.8 rule). The vid-002/vid-003 dossier posters cropped badly to 4:5, so I pulled better frames from the same prepared cuts (not a dossier change; the frames are in `dist/img/` only).
3. **Hero gradient** is 0→62 % ink over the lower 62 %, not the concept's 0→30 % in the bottom quarter: at 30 % the white name disappeared into the white daybeds (round 1).
4. **Ground** is `#F3F4F7` (a lighter cool white) with `#FFFFFF` for the guests band; the concept's `#E3E4E9` read grey and flat behind body text at full-page scale and is kept only as the Rosa box placeholder. Still a cool white, not cream.
5. **Rating band**: the concept's full-width pool-blue band behind the "8.6" would be a dark panel behind text by check-design's rule (pool L ≈ 0.22 < 0.35). The 8.6 is set 240 px in pool blue on white instead.
6. **Hero placeholder colour** is `#9fc0e6` (sky tone). check-design only treats a container as a picture when an `img`/`canvas` is a direct child; our poster is `picture > img`, so the darker placeholder was flagged. It shows only until the 41 KB poster paints.
7. **Interface labels** added by the template (not copy): header link "Weekly packages and dates", mobile bar "Packages and dates" / "Book Fomies" etc., "Included:", "per person, 7 nights / price read 28 Sep 2026", "At the lodge", "Check-in / Check-out", "Call +972 9 973 3943". No copy was rewritten; "From 4 nights" is `lessons[3].includes`.
8. **Fonts** load from Google Fonts at 4e (allowed); they are the 2 non-local requests on load. 4g self-hosts.

## other businesses in this run

None (the run has one business). The interactive and unique variants of this business are other designers' work; not opened here.

## measured (headless Chromium, local static server, no scroll, 8 s wait)

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 343 KB | 413 KB |
| hero video after first paint | 1.50 MB (vid-009 m1280 webm) | 2.98 MB (vid-009 d1920 webm) |
| largest above-the-fold image | poster AVIF 41 KB | poster AVIF 41 KB |
| video requests under reduced motion | 0 | — |
| non-local requests on load | 2 (Google Fonts css + woff2) | 2 |

Level clips load only on hover/in-view: 1.3–2.0 MB each (m1280 webm).

`tools/funnel.mjs` on the file: clicks_to_book 1, primary class engine ("See the weekly surf packages and dates"), CTA above the fold, 0 broken. `tools/check-design.mjs` on the file: pass, 0 warnings (Sora for h1/h2/body, ground hsl(225 20% 96%), 0 all-caps labels). All engine, product and WhatsApp URLs match `dossier.booking` character for character.

---

# Round 2 (after 4f: visual-critic 6/10, experience-critic 7/10)

Inputs added by the orchestrator: vid-009e (hero, pool deck ≈ 2.6 s → surfer on a reef wave, 8.7 s loop, poster at 1.2 s) and vid-002e (Level 3, two barrels, 7.9 s). Their dossier `videos[]` entries are not in `dossier.json` yet; the files and `assets/index.json` entries are.

## look-log, round 2

**Round 8 — whole page.** Old-site screenshots beside the sheets (`old-site-lodge-desktop-fold.png`, `old-site-home-mobile-fold.png`). Hero: vid-009e, and the text no longer sits on the film. It sits on a **white plate** at the bottom left, flush with the page ground, like a daybed floating on the pool. That makes legibility a matter of construction, not of which frame the scrim happens to cover. The brightest lower-left region of the loop (mean luma 169/255, the foam at ≈ 3.75 s, measured at 4 fps) no longer touches any text. On a phone the film is its own box (100svh − 360 px, framed at 34 % so the daybeds and pool fill it) with the plate below, and the CTA, rating and name still fit on the first screen. The intro is img-001, big, bleeding left, with the text beside it; the AC-grille crop is gone. The level cards are the big moment: a wider row (up to 1440), white cards, a clip on water with a surfer on each (vid-010, vid-003, vid-002e), "$1,466" in pool blue on the ground beside the level name (no sticker), and a solid coral "Book Level n" on every card. A lounge band (img-075) breaks the white run between the amenities and the reviews, and "What guests say" now heads its own section instead of being stranded under an empty screen. Wrong: the intro photo at 4:5 across seven columns ran taller than the screen, so the heading dropped below the fold; "Level 1 – Fomies" wrapped next to the price in the 86 vw phone card.

**Round 9 — whole page, final.** Intro photo capped (1:1.08, ≤ 92vh) and the text centred beside it; level names no longer wrap; phone prices at 30 px. Nothing overflows or overlaps at 1440 or 390. Side by side with the old lodge page (a dark rock under a YouTube glyph, a badge over a breadcrumb, and "Choose your level" twice with no price), this opens on their own pool, then their water; the whole page shows the week's price, what's included, three one-tap level bookings and the rating, which their page never states. It is clearly better at a glance and on the whole page.

Checks in `shots/round-9/static/`: the bar and the card row stay in sync on a phone. Tapping "Riders" in the bar scrolls the row to the Riders card (scrollLeft 577), marks it, and repoints the button to `level-3-riders`. Swiping the row to Rollers sets the bar to Rollers and `level-2-rollers`. Under reduced motion, a full scroll makes 0 video requests. A normal phone scroll to the levels requests only the hero m1280 webm and `vid-010-m720.mp4`.

Could not verify: seeking the hero video in headless Chromium kept rendering the paused frame, so I have no screenshot of each hero frame. That no longer affects legibility: no text sits on the film except the header's small white name and link. They sit over the top 150 px, which is sky on the pool shot and dark jungle and rocks on the surf shot, under a 0.34 ink scrim with a soft text shadow.

## what changed (critic fix → done)

- Hero loop without surfing → vid-009e (pool → reef-wave surfer).
- Phone crop was roof and parasol → a separate film box, framed at 34 % on daybeds + pool.
- Text legibility on the brightest frame → text moved onto a white plate: ink on white, about 17:1.
- Orphan intro crops with the AC grille → img-001 big, bleeding left, text beside it.
- Level 3 showed a roof or dirt-lot drone frame → vid-002e (barrels), with a barrel poster frame.
- Level cards were not the big moment → a wider row, clip on water, solid coral book buttons, price set in the layout instead of a sticker, one card per screen on a phone (86 vw, snap centre).
- Bar and cards out of sync → two-way sync: tapping the bar scrolls to the card and plays it; swiping, hovering or focusing a card updates the bar. The selected card gets a coral underline.
- Dead gaps before "Twelve rooms" and "What guests say" → section paddings cut by about a third. "What guests say" leads its own section, and the img-075 lounge band sits between the amenities and the reviews.
- Phone day grid read as a thumbnail sheet → full-width 4:5 frames on a phone.
- No skip link → "Skip to the surf weeks and prices" (visible on focus, jumps to `#levels`).
- Seagallas credited "· review" → "Seagallas · globalsurf.com", linked to the dossier's `source_url`.
- Bar rating had no count or date → "8.6/10 Booking.com, 80 reviews · read 28 Sep 2026".
- Clips below the fold → m720 MP4 on phones (the hero is m1280 there) and m1280 on desktop (the hero is d1920).
- Level name repeated at the start of each body → the heading carries the name and the body continues the same sentence ("Level 1 – Fomies" / "is for your first time…"). The words are en.json's, in order, split across the heading and the paragraph. For Riders the heading keeps the copy's colon ("Level 3 – Riders:").

## images added / removed (round 2)

Added: img-001 (4:5 and 1:1.08, lodge, business-owned), img-075 (21:9 desktop, 4:5 phone, lodge, business-owned), vid-009e + poster (hero), vid-002e + a 4:5 crop of its poster (Level 3), vid-010 / vid-003 m720 (phone clips). Removed: img-002, img-017, vid-009, vid-002.

## conflicts, round 2

9. **Hero text on a white plate, not white type on the film.** The concept asked for type on the video with a light gradient. The coordinator asked for legibility guaranteed on the brightest frame, and a gradient cannot guarantee it over white foam. The plate can, and it is the daybed idea in its own right. What it costs: less film visible behind the text at bottom left on desktop.
10. **Level 3 heading keeps the copy's colon**, so the sentence stays verbatim when split across the heading and the body.
11. **vid-009e's m1280 MP4 fallback is 2.27 MB**, over the 2 MB phone line. The phone plays the 1.89 MB WebM first; only a browser without AV1 WebM would take the MP4.

## measured, round 2 (headless Chromium, local static server, no scroll, 8 s)

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 258 KB | 328 KB |
| hero video after first paint | 1.89 MB (vid-009e m1280 webm) | 3.62 MB (vid-009e d1920 webm) |
| largest above-the-fold image | poster AVIF 45 KB | poster AVIF 45 KB |
| video requests, reduced motion, full scroll | 0 | — |
| non-local requests on load | 2 (Google Fonts) | 2 |

Level clips load one at a time, only when played: 1.6–1.9 MB m720 MP4 on phones, 1.65–1.99 MB m1280 WebM on desktop.

`tools/check-design.mjs` (file path): pass, 0 failing, no warnings. `tools/funnel.mjs` (file path): clicks_to_book 1, primary class engine ("See the weekly surf packages and dates"), CTA above the fold, 0 broken.

---

# Round 3 (after 4f round 2: visual-critic 6 fail, experience-critic 8)

Inputs: re-edited vid-009e (pool deck → sunny teal reef surf, 6.8 s) and vid-002e (barrels, 5.2 s, badge cropped), copied fresh from the dossier. Hero poster WebP regenerated from the new vid-009e poster.

## look-log, round 10 (final)

Old-site screenshots beside the sheets. **Desktop hero:** the white plate over the film is gone. The film is a clear band across the top (the header's hairline, name and link are the only things on it) and the surfer sits in the middle of it, uncovered. Below it, on white, the title card: the name and tagline at left, the coral button and rating at right, the phone treatment widened to 12 columns. **Levels:** no more cards. Each level is a large 4:3 film still bleeding to the page edge, alternating left and right (Fomies, Rollers, Riders), with its clip playing only while it fills the screen. Beside it, quiet: "Level n –" small, the level word at display size, the en.json sentence whole and verbatim ("Level 1 – Fomies is for your first time…"; "Level 3 – Riders: you're already carving…"), the price in pool blue, what's included, and an ink-outline "Book Level n". The only coral on those screens is the bar's; the primary coral returns once, after Riders, beside the trust figure. Phone: each level is a full-width 4:5 still with the text below, and the bar follows the level on screen (Fomies → Rollers → Riders in the sheet). **Poster first:** the film box is painted with a gradient sampled from the poster before any image arrives (`static/slow-3g-1.2s-390.png` shows the blurred pool, not a flat block). **Clips:** the three level clips are my own single-shot trims, so no card can show a dissolve: vid-010 0.8–5.1 s (the stand-up into the sun, hard cut to the beach), vid-003 0–3.0 s (the rider in blue), vid-002e 0–3.2 s (barrels only). They are trimmed with ffmpeg from the dossier's d1920 cuts into `dist/video/l{1,2,3}-*`; each still is a frame from that trim. Against the old lodge page it is clearly better at a glance and over the whole page: their own sunlit water on a clear film, then a priced week per level, where theirs shows a dark rock, a badge over the breadcrumb, and no price.

## conflicts, round 3

12. **Plate replaced by a title card under the film** (conflict 9 withdrawn). Legibility is still structural: ink on white, with no text over the moving picture except the header.
13. **The level clips are designer-made trims** of the business's own cuts, not dossier renditions: single shots, no dissolves, 0.3–1.3 MB each. At 4g they must come from Payload (`videos[]`), so the owner-facing originals would need these cut points.
14. **The level heading shows "Level n –" and the level word**, and the paragraph repeats the full sentence from en.json. The duplication is kept on purpose so the copy stays whole sentences.

## measured, round 3 (headless Chromium, local server, no scroll)

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 204 KB | 239 KB |
| hero video after first paint | 1.36 MB (vid-009e m1280 webm) | 2.59 MB (vid-009e d1920 webm) |
| level clips (only while on screen, one at a time) | 0.32–0.49 MB m720 mp4 | 0.55–1.02 MB m1280 webm |
| video requests, reduced motion, full scroll | 0 | — |

`check-design` (file path): pass. `funnel` (file path): clicks_to_book 1, primary engine, CTA above the fold, 0 broken.

---

# Round 4 (after 4f round 3: visual-critic 7 fail, experience-critic 8)

## look-log, round 11

Old-site screenshots beside the sheets.
- **Desktop hero:** the film runs full-bleed to the fold again; the white slab is gone. The title sits quietly low-left, clear of the surfer, who is centre-right in every surf frame. Behind the words only, a soft local shade: ink at 0.62, fading out from 43 % to 67 % of the width and from 42 % to 61 % of the height (mask). I measured it against every frame of vid-009e at 6 fps (41 frames), cropped as the page crops it at 1440×900, taking the 95th-percentile background under each text box. Worst case: name 5.6:1, tagline 5.6:1, rating 6.1:1. The phone keeps the film band with the text on white below, which the critics rated the best phone first screen.
- **Poster at 0.5 s:** the poster is a 25 KB AVIF inlined in the HTML, so it paints with the document. `static/slow4g-0.5s-390.png` shows the pool poster at 0.5 s on simulated 4G, not a gradient. The video's `poster` is set from that image when the video is attached.
- **Feature line, the page's one still moment:** img-005 fills the viewport, the pool from the water's surface. "Footwear is discouraged. Chilling out is inescapable." sits on the water below the waterline, in white, over a soft local shade. Measured against the image without the text: 6.6:1 (95th percentile) at 1440 and 5.2:1 at 390.
- **Levels:** no dash labels. Each level's heading is en.json's first sentence, whole ("Level 1 – Fomies is for your first time on a board, no surfing experience needed."), and its second sentence follows as the body. The Book buttons are solid coral again. The stills are big, alternate sides, and use single-shot trimmed clips. The Fomies crop is re-centred on the rider at 42 % on desktop and 46 % on the phone.
- **Quotes:** on the phone they are now a swipe row with a peek instead of four screens of text; on desktop they stay in two columns. "Read all 80 reviews on Booking.com" follows.

Versus the old lodge page: their own sunlit surf on the full first screen, then the pool, then a priced week per level. It is clearly better at a glance and over the whole page.

## conflicts, round 4

15. **The hero shade is a local gradient on the film, not a panel.** check-design passes. The shade is part of the picture and never sits behind body text outside the hero.
16. **The inlined poster (25 KB AVIF, about 34 KB of base64) adds to the HTML** (76 KB transferred), in exchange for a poster that paints at 0.5 s. The page also fetches no separate poster AVIF.

## measured, round 4

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 192 KB | 228 KB |
| hero video after first paint | 1.36 MB | 2.59 MB |
| video requests, reduced motion, full scroll | 0 | — |

check-design (file path): pass. funnel (file path): clicks_to_book 1, primary engine, CTA above the fold, 0 broken.

---

# Round 5 (after 4f round 4: visual-critic 7 "no idea of its own", experience-critic 8)

## The signature: the deck

Every chapter opens on the timber edge of the pool. A thin full-bleed strip, cut from the lodge's own photographs, shows a daybed platform over the water. Each strip is cropped to the same 8:1 band, and down the page the light moves through the day:
- the page opens on the hero film, whose first shot is the sunlit pool deck;
- **morning:** img-008, a yoga stretch on the deck edge, before "Pick your level";
- **afternoon:** the full-screen still of two guests laughing on a daybed over the pool (img-017) carries "Footwear is discouraged. Chilling out is inescapable.";
- **day:** img-009, bare feet on a red cushion on the platform, before "Twelve rooms";
- **late afternoon:** img-075, beanbags on the deck beside the pool, before "What guests say";
- **dusk:** the page closes on the dusk band, img-093, where the deck and pool are lit.

It is one move, a photographic strip with no graphic device, and it is the concept's "one thing": the daybeds on dark timber over the long blue pool.

How it differs from the other two variants, checked against their round-3/4 sheets:
- unique's device is a live WebGL waterline refracting between scenes, and its feature is img-005. Calm uses no water surface as a device, and I moved its feature off img-005 to img-017.
- interactive's device is the giant word "Kabalana" and a level stage.
- Calm's strips are still photographs of the deck edge, and nothing moves.

## look-log, round 12

Old-site screenshots (`old-site-lodge-desktop-fold.png`, `old-site-home-mobile-fold.png`) and the unique/interactive sheets sat beside the sheets.
- **Phone hero:** now full-bleed. The film fills the first screen, framed at 62 % so the surfer is inside the crop. The name sits at the top on a local shade, and the tagline, button and rating sit at the foot on a second local shade. I modelled this against all 41 frames of vid-009e at 390×844, using the brightest 5 % of background under each text box: name 9.6:1, tagline 8.2:1, rating 7.9:1. At 0.5 s on simulated 4G the inlined poster is already painted (`static/slow4g-0.5s-390.png`).
- **Guests:** "What guests say", the 8.6 and Fanny's quote now share one screen (`static/guests-1440.png`). The category scores sit under the 8.6; three more quotes follow in three columns (a swipe row on the phone), with "Read all 80 reviews on Booking.com" directly under them. The phone gap before "The spot" is cut to 48 px.
- **Feature line** on img-017: I cropped the image at the top to remove the air-conditioning unit. The line is white over a local shade on the pool. Measured against the image without the text, brightest 5 %: 5.8:1 at 1440, 7.6:1 at 390.

Versus the old site: their own surf on the whole first screen at both widths, then the deck running through the page morning to dusk. It is clearly better at a glance and on the whole page, and it is distinct from unique and interactive.

## measured, round 5

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 249 KB | 285 KB |
| hero video after first paint | 1.36 MB | 2.59 MB |
| video requests, reduced motion, full scroll | 0 | — |

check-design (file path): pass, 0 failing. funnel (file path): clicks_to_book 1, primary engine, CTA above the fold, 0 broken.
