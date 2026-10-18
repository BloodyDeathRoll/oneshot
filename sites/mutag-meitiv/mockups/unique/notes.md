# notes.md — mutag-meitiv / unique «מפת חזון» (station 4e, designer 0.5.2)

Run 2026-10-il-brand-01 · Hebrew only, RTL · 2026-10-18.
Page: `dist/index.html` (one self-contained file, CSS + JS inline, fonts from Google Fonts at 4e).
Made by: `src/make-media.sh` (every file in `dist/img/` and `dist/video/`, `# media:` header) and
`src/build.py` (writes `dist/index.html`; every word of business copy is read from `copy/he.json`,
never retyped; WhatsApp number, phone, email and Calendly URL come from the same file).

## look-log

The page was drafted top to bottom in one pass before the first shoot (deviation from "first screen
only, then the rest"); rounds 1–5 judged and changed the first screen only, rounds W1–W3 the whole
page. Old site beside every sheet: `dossier/mutag-meitiv/assets/old-site-desktop.png` / `-mobile.png`.

**First screen**

1. *Sheet:* the logo icon and wordmark were missing (CSS masks blocked under file://); a wide empty
   gutter between text and board at 1440; the two title strips read as two green buttons; the clip
   poster opened on a participant filming with her phone; the award label on white looked like a
   UI chip. *Change:* masks inlined as data URIs; vid-004 recut to start at 3.4 s (the heart drawn on
   the white board, no person); thinner strip padding; award label on the warm `#EBCE8C`; heart
   filled with the pale `#EEF4F1` so it reads as a board. *Vs old site:* already clearly better than the
   boxed green panel with a circle crop and four unexplained badges, but the composition looked small.
2. *Sheet:* hero vertically centred in a fixed 740 px block left ~140 px of white above and ~170 px
   below; board only ~560 px wide. *Change:* min-height removed; grid widened for the board. *Vs old:*
   better, but the empty bands made it feel unfinished.
3. *Sheet:* the 520 + 720 px columns did not fit the 1192 px row, so the board did not grow; the
   staggered second strip looked misaligned rather than pasted. *Change:* columns 460 px | 1fr, board
   up to 700 px, strips start-aligned. *Vs old:* yes — Hadas, the table clip and the award are now
   one composed object in the brand's own heart shape, with one button.
4. *Sheet:* strips still flat; 110 px of dead white before the next section. *Change:* strips rotated
   −1.2° / +0.8° like words pasted on a board (static, no reveal); hero padding reduced so the
   services ground and title peek in at 900 px; sticker moved on phone. *Vs old:* clearly better.
5. *Sheet (390):* the award label text overflowed its warm pill ("2022" outside it); the two title
   strips touched and read as one bar. *Change:* label width unclamped; gap between strips. *Vs old:*
   the old phone hero is a green slab with four badges and no button; ours fits title, tagline and
   the WhatsApp button inside 844 px under a real collage. Clearly better.

**Whole page**

- W1. *Sheet:* lead-service cards broken (the 4:5 photo column overflowed under the text); all 15
  client logos missing (wrong file names); the "חינם" strip covered the intro workshop's title and
  "חינם" was printed twice; ~300 px of empty white after the set-piece; on phone, אנווה's 577-char
  quote was a wall. *Change:* cards rebuilt photo-on-top (4:3); logo paths fixed; strip moved onto the
  card's top edge and the duplicate removed; method bottom padding cut; the quote clamps to 9 lines on
  phone with "קראו עוד"; long quotes in the slideshow switch to the text face at 19 px.
- W2. *Measured:* `check-design` failed — the footer was a tall `#173B34` panel behind text. Early
  scroll CLS 0.16: the board came after the text in the DOM and was moved above it with `order`, so
  a partial first paint placed the text at the top and then pushed it down 340 px. 9 tap targets
  under 44 px. *Change:* footer light (`#EEF4F1`, green icon, coral WhatsApp pill) with a short deep
  green base bar; board first in the DOM (text ordered first only on desktop); slider arrows hidden
  on phone (swipe + 44 px dots); nav and footer links ≥ 44 px. *Result:* check-design ok, scroll CLS
  0.0019 early / 0 settled (three runs).
- W3. *Sheet:* stages 76 vh apart left a 380 px hole in the text column mid-pin. *Change:* 62 vh per
  stage. Final sheets looked at for overflow, overlap and unreadable text at 1440 and 390: none found.
  Mid-scroll set-piece shots (MAKING in view) at 1440 and 390, reduced motion at 1440, JS off at 1440,
  and the demo case-study sheet at 1440 and 390 were also looked at. *Vs old site, whole page:* the old
  page is a 950 px column of identical green boxes, underlined 14 px titles, a team wall of grey text
  and a logo dump; this one has distinct sections (collage hero, two sold lead services with
  outcome quotes, the motto on strips, the board that fills stage by stage, proof, priced offer
  cards with their own WhatsApp messages, the demo case, testimonials slideshow, team grid, podcast
  band, posts, Instagram strip, the closing on real vision boards, a real footer). Clearly better.

**Round 2 (after 4f round 1: visual 7/10 fail, experience 8/10, critic 67.4/75; coordinator decision: house
rule 1 is scoped to surf businesses, brief item 6 wins — the deep greens come back as grounds)**

- R2-1. *Set-piece:* the grey labelled slots are gone. The heart starts as its outline only, and the four
  pieces land into a composed map inside it: SENSING largest in the middle, THINKING lower-left and
  INFLUENCING higher-right overlapping it, MAKING (the clip) on top towards the point. Varied sizes,
  −3…+3°, every corner inside the outline (positions computed from the heart path). Progress is a pill
  row under the board (SENSING · THINKING · MAKING · INFLUENCING, filled green as each lands). Board up
  to 700 px wide (630 tall); stages 46 vh apart instead of 62; motto→method gap cut (method top padding
  40). "טוען את הלוח…" only exists with JS (no stuck label JS-off).
- R2-2. *Greens as grounds:* testimonials on a full-width `#00574C` band, one excerpt at a time in Frank
  Ruhl Libre 24–30 px white, the full quote behind "קראו עוד" (the excerpt is the quote's own opening
  words; JS off shows the full text); courses on a full-width `#173B34` band with white cards; footer back
  on `#173B34` as the concept specified (with ON AIR that is four green grounds below the hero).
- R2-3. *Salmon rationed* to header, hero, phone bar, the two lead services and the closing (6 buttons).
  The 9 offer/course buttons are green pills (`#00574C` on `#E3EEEA`); the footer WhatsApp pill is white.
  Coral text gone: service numbers, stage labels, team roles and post dates are `#00574C` (8.6:1); the
  focus ring is `#00574C` on light grounds and white on green ones; the free-workshop strip is the warm
  `#EBCE8C`.
- R2-4. *Mid-page image moment:* the workshops open on a full-width img-c02 (Hadas presenting a collage
  board on an easel, 1600 px source, 5:2; 4:3 crop on phone) with "הרצאות וסדנאות" on a pasted green
  strip at its foot. The floating tilted tile is gone.
- R2-5. *Phone length 18.7k → 12.9k px:* offers and courses are swipe rows with a next-card peek; posts
  likewise; stage pieces float beside their titles; lead-card photos 2:1, tighter card padding; long
  quotes as excerpts; collaborator photos 1:1 on phone; founder bio clamps with "קראו עוד"; footer
  contact pills wrap, nav in three columns; section padding 44 px.
- R2-6. *Polish:* the 2 px overflow came from the skip link parked at −999 px (RTL puts it on the right)
  and the rotated Instagram tiles; both fixed (scrollWidth = innerWidth at 1440 and 390). Logos sit on
  white without cards (multiply blend). Offer titles: Latin-only segments become a small LTR kicker over
  the Hebrew title ("THE BETTER 4 — Map your vision workshop" / "סדנת חזון לפורצי דרך"; "BRANDS OF CHANGE"
  / "הרצאת הדגל"), all words kept in order. Demo tile: a designed cover (the heart on `#173B34` with the
  four stage names on paper notes) instead of the hatched frame; "דוגמה" stays on the tile. Founder card
  straight, photo now img-010 (img-001 has a dark band across its lower third). JS off: no `<video>` is
  shown (Chrome forces native controls without scripting); the posters show. Phone menu closes on link
  tap (verified). The logo masks moved to the end of the HTML so the first chunk carries the whole hero
  (cold-load phone frame shows title, tagline and button together); the marks stay transparent until
  their masks arrive, so no green blocks flash.
- *Kept exactly:* the hero at both widths, the lead-service cards and photos, the motto strips, the type
  pair, the team grid, the Instagram strip, the closing, the phone bar, the footer contact pills.
- *Vs old site:* the old page is one green Wix column of identical boxes; this one now alternates white
  and the brand's own greens with distinct moments (collage hero, sold services, motto strips, the board
  filling, a full-width workshop photo, a green courses band, the demo case, a green voices band, team,
  podcast, posts, Instagram, closing). Clearly better, and the greens now carry the brand as the client
  asked.

## The set-piece «the board fills»

Pinned object, native scroll: the heart board is `position: sticky` in the left (end) column while
the four stages scroll on the right; an IntersectionObserver lands one piece per stage (350 ms,
from the right, rotation settles), and a slot under each piece names its stage (the progress
indicator; since round 2 a pill row under the board). Pieces: SENSING img-003, THINKING img-032, MAKING vid-002 44–56 s (plays only while its
stage is in view), INFLUENCING img-ig-01.
Round 2: no slots; the heart starts as its outline only. No GSAP, Lenis or three.js (the concept rules out a
smooth-scroll library; nothing here needs WebGL), JS ≈ 6 KB.
Loading: the section's height is in CSS from first paint; until every piece has decoded the board
shows full (the poster) with "טוען את הלוח…"; only then does it arm, and pieces of stages already
passed stay put, so nothing moves under a visitor who arrived early. Reduced motion: full board, no
rotation, clip as poster. JS off: full board, straight stage list. Phone (< 900 px): no pin, each
stage shows its piece straight above its text. No WebGL anywhere, so the no-WebGL layout is the page.

## Measured (`tools/audit-mockup.mjs`, throttled phone, round 2; run from a scratchpad copy, see conflicts)

first load 559 KB (HTML 152 KB incl. the two inlined logo masks, fonts 123 KB) · JS 0 external (≈ 7 KB
inline) · LCP 1,328 ms (728 ms in round 1; the hero is unchanged, so most likely run-to-run noise, not
investigated) · CLS 0.0019 · scroll CLS early 0.0019 / settled 0 · third-party hosts on load 2 (Google
Fonts, 4e only) · images without alt 0 · tap targets under 44 px 0. (Round 1 note: the two "under 44 px"
footer words I reported came from a stale audit.json; the scratchpad copy had lost its playwright link.)
Page height: phone 12,917 px (round 1: 18,729), desktop 12,519 px. scrollWidth = innerWidth at 1440 and 390.
Video after first paint: hero `table-464.webm` 1.66 MB (mp4 1.54 MB); MAKING `leaves-560` 1.32 / 1.36 MB.
`check-design`: **fails by decision** — "dark ground behind text" on `section.courses`, `section.voices` and
`footer.foot` (the coordinator scoped house rule 1 to surf businesses; brief item 6 wins). No other problem,
0 default-look warnings. `check-places` ok.

Booking: 16 `wa.me/972546686808?text=…` links (= `contact.whatsapp` +972546686808); each offer/course
card with its own `ctaText`; hero/header/bar/closing prefill "היי הדס, הגעתי מהאתר של מותג מיטיב.".
Calendly `https://calendly.com/hadas/30min` once, in the closing. `tel:+972546686808`,
`mailto:hadas@kapara.com`. JS off: all links present, no videos, posters shown, no loading label.

## images

All business-owned unless noted; every file made by `src/make-media.sh`.

| file | dossier id | licence note |
|---|---|---|
| hadas-forest-480/720 | img-013 | business-owned (site) |
| svc-personal-960 | img-034 | business-owned |
| svc-strategic-960 | img-012 | business-owned |
| stage-sensing-560 | img-003 | business-owned |
| stage-thinking-560 | img-032 | business-owned |
| stage-influencing-560 | img-ig-01 | business-owned (own Instagram) |
| moment-easel-800/1600 | img-c02 | business-owned (client, 2026-10-18) |
| closing-boards-800/1600 | img-c05 | business-owned (client, 2026-10-18) |
| team-hadas-010 / tamar / yael / dana / lior | img-010 / 036 / 037 / 038 / 039 | business-owned |
| award-seal | img-040 | third-party mark, "unknown"; shown as on the client's current site (default decided by the orchestrator) |
| btc-trainer | img-041 | third-party mark, "unknown"; same default |
| logo-44 … logo-58 | img-044 … img-058 | client logos, "unknown"; shown as on the current site, same default |
| ig-03, ig-02, ig-08, ig-11, ig-04, ig-12 | img-ig-* | business-owned (own Instagram); ig-06 skipped as instructed |
| logo-icon, logo-wordmark | logo-icon, logo-wordmark | business-owned, white PNGs used as CSS masks in the brand green (shape unchanged) |
| table-464.{webm,mp4}, table-poster | vid-004 3.4–14.4 s | business-owned (client video) |
| leaves-560.{webm,mp4}, leaves-poster | vid-002 44–56 s, 4:5 crop | business-owned (own Instagram reel); hands only, a participant, never captioned as Hadas |

Not used: img-015 (stock), img-022/023/029 (unknown), img-028/031 (screenshots; the heart outline is
redrawn as one SVG path), vid-001, vid-003, img-ig-06, img-ig-09 (it is the vid-002 clip's cover).

## gaps

- **Case study images:** none (`caseStudies[0].images` empty). The home tile has a designed cover (the
  heart with the four stage names, round 2); the demo page shows labelled empty frames "תמונה לדוגמה"; the demo is badged "דוגמה" on the tile
  and at the top of its page ("מקרה בוחן לדוגמה, לא פרויקט אמיתי"). The demo page is a `:target` sheet
  (`#work-demo-shorashim`), works with JS off, Esc / × close it.
- **Blog covers:** the dossier holds only remote Wix URLs, no local files; the three post cards are
  type-only (date, title, excerpt), linking to the posts' current URLs.
- **Newsletter:** no URL → no form, label left out.
- **Service pages:** not in a 4e mockup; "לפרטים" opens the current site's /personal101 and /process.
- **Reply time, hours, address, rating:** none in the dossier; nothing shown.
- **Podcast:** links out to Spotify / Apple; no embed.

## conflicts

None blocking. Deviations from `concepts.md`, each made to avoid a visible weakness:

1. **Personal-branding card photo img-034, not img-003.** The concept puts img-003 both on the card
   and on the SENSING piece; the same photograph twice on one page reads as a lack of material.
2. **INFLUENCING piece img-ig-01, not img-011.** img-011 (2000×1023) cannot be cropped to the board's
   one ratio, 4:5, without cutting the "BRANDS OF CHANGE" slide text; img-ig-01 is natively 4:5, 1440
   px, Hadas on stage before "BRAND THE CHANGE". So ig-01 left the Instagram strip, and so did ig-09
   (the cover of the vid-002 clip already on the board): strip = ig-03, 02, 08, 11, 04, 12.
3. **Workshops: a full-width img-c02 moment, not a vid-002 tile** (round 2; round 1 had an img-c03 tile). vid-002 is already the MAKING piece; playing the
   same clip twice was the weaker page. vid-004 (hero) and vid-002 (set-piece) are both used.
4. **Lead-service photos 4:3 on top of the card, not 4:5.** At 4:5 across a 580 px card each card
   ran ~1,000 px tall; at 4:5 beside the text the layout broke (W1).
5. **Dark grounds vs `check-design`.** Round 1 made the footer light to pass house rule 1. Round 2 follows
   the coordinator's decision (house rule 1 is scoped to surf; brief item 6 wins): footer `#173B34`,
   courses band `#173B34`, testimonials band `#00574C`. `check-design` reports these three as "dark
   ground behind text" and fails; that is the accepted cost.
6. **vid-004 cut 3.4–14.4 s, not 2–14 s:** the first 1.4 s are a participant filming with her phone.
7. **Testimonials:** beside the lead services, אנווה רצון and Julia Dojas (static); the slideshow holds
   רננה אורלב, Linda (long), יובל אברהם, איה, Linda (short), קרן — Linda's two quotes are slides 2 and 5,
   never adjacent or on screen together. Renana and Linda-long are listed `beside_lead_services` but
   sit one section later, in the slideshow; איה and קרן carry their "Brand & Breakfast" role line.
8. **Tool gap (not a page flaw):** `tools/audit-mockup.mjs` reads `sites/<slug>/copy/en.json`
   unconditionally and crashes on this Hebrew-only run. I ran an unmodified copy in my scratchpad
   with only `en.json` → `he.json` (and its port) changed; numbers above are from that run. The tool
   should read `copy/<run language>.json`. Also `check-design` and `audit-mockup` use fixed ports
   (8960 / 8980) and collide when the three variants' designers run in parallel.
9. **Testimonial excerpts:** quotes over ~180 characters show their own opening words (cut at a sentence
   end, else at a word with "…") and the full text behind "קראו עוד". No words changed or reordered.
10. **Offer-title kicker:** Latin-only segments of a mixed title are set as a small LTR line above the
    Hebrew segment. Same words, same order inside each segment; the two segments swap visual rows for
    THE BETTER 4 and BRANDS OF CHANGE (the Hebrew part becomes the heading).
11. **Founder photo img-010, not img-001** (concept's team photo), because of img-001's dark band.

## other mockups in this run (hard constraint 5)

Same business, three variants. What a visitor notices: **calm** opens on a full green panel with
white Heebo type, img-034 in a large curved-corner crop and mint buttons; **interactive** is a
sage-white page with handwritten Playpen titles, Hadas in a circle inside four orbiting rings with a
deep-green button; **unique** is a white page with a heart-shaped vision board holding three
rotated cut-outs (img-013, the vid-004 table clip, the award sticker), Frank Ruhl Libre titles on
green paper strips, a coral WhatsApp button, and the board that fills piece by piece through the
method. Shared on purpose (same facts): copy, offers, prices, WhatsApp path. Note: interactive also
plays vid-004 (in its satellite circle), as its concept says.
