# Lotus Surf House: calm mockup, "The gate" (concept 1)

Station 4e · designer 0.7.1 · run `2026-10-midigama-01` (mode `test`, operator alon) · 2026-11-03.
Page: `dist/index.html`, one file, CSS and JS inlined from `src/page.css` / `src/page.js` by `src/build.py`. All words come from `copy/en.json` via `../lotus_data.py` (shared data module for the three variants: copy, alt texts, room galleries, icons; no layout). Media: `src/make-media.sh` (`# media: …/calm/dist/img/**`). Fonts come from Google Fonts at 4e (Hanken Grotesk 400/600, Parisienne). To rebuild: run `bash src/make-media.sh`, then `python3 src/build.py`.

## look-log

Shot with `tools/shoot.mjs` (served over http on :8964), sheets opened at 1440 and 390. There is no own website, so there is no `old-site-*.png`. The bar is the Booking.com listing a visitor reaches today (`dossier/lotus-surf-house/funnel/walk/04-booking-com-fold.png`) plus the gold Global Surf `postcard` (opened locally; its footage is not on this machine, so the method was compared, not the clip) and `gold/global-surf-notes.md`. A process note, stated honestly: the page skeleton was assembled in one pass before round 1. Rounds 1–3 still looked at and changed only the first screen.

**Round 1, first screen.** On desktop, the 6/6 split works: the gate photograph fills the right half at native sharpness. The left half was weak, though. "Lotus Surf House" broke onto two lines at 96 px, so the block felt top-heavy, and the small header button sat on the leaves over the photograph as clutter. On the phone, the gate full-bleed with three centred white lines is strong. The radial shade behind the lines was too weak where the title crosses the bright doorway. Change: one-line title (`nowrap`, 56–80 px); the header button and nav appear only once the header turns solid after the hero; the phone shade goes from 42% to 55% at the centre. Against the Booking.com fold (blue bar, search field, a 1/42 carousel of the ping-pong table, a yellow date box), this is already clearly better at a glance: the house's own gate, its name and one button.

**Round 2, first screen.** The title now sits on one line and reads like the house's entrance sign (img-018 is the same connected script). The left half is calm and composed, and the gate holds the right half edge to edge. On the phone, the lines are legible over the doorway. Change tried: the left half on the tint ground (`#F0EDEE`, the path stone) to tie it to the photograph. The phone hero button was trimmed to 54 px.

**Round 3, first screen.** The stone tint read grey-pink and drab beside the green photograph, so the left half went back to white. White is crisper, and the brick-red button carries the warmth. The first screen is the header, one title, one short line and one button, with the gate unobstructed and its 1.4 s settle. It is clearly better than the Booking.com fold. It matches the gold discipline (one title, one CTA, the business's best image), with no footage to lead with.

**Round 4, whole page.** The sheet showed:
- the amenities line ran off the right edge at 1440 (no break opportunities between the `|`-separated spans);
- the porch print showed a white ceiling band across its top;
- the solid header had a hairline under it ("no lines under the header").

Changes: spaces around the separators so the line wraps; the porch print re-cut below the ceiling line (`1040:1300:470:88`); the header gets a soft shadow with no line.

**Round 5, checks and states.**
- `audit-mockup` first gave an early-scroll CLS of 0.014. The source was text pushed down when the JS revealed the slideshow controls. Fix: the control rows keep their space from first paint (`.js .ctrl[hidden]{visibility:hidden}`). I also added metric-matched fallbacks (Parisienne → Georgia at 83.8%, widths measured against the web font) and stacked the quote slideshow in CSS from first paint. Result: early CLS 0.0008, settled 0.
- First load fell from 835 KB to 617 KB once off-screen slides were held back (`content-visibility:auto` on the slides after the first).
- Inspector `[overflow]` at 768 was real: the phone hero shade (150vw) stuck out past the page. `.hero{overflow:hidden}` fixed it. At 390 the 12-dot review control was 408 px wide; the dots are narrower on the phone now.
- With JS off, the white wordmark stayed fixed over light sections. Without JS it is now `position:absolute`.
- After that, scrollWidth = viewport at 1440 / 768 / 390.

**Round 6, whole page (final sheets in `shots/`).** No overflow, overlap or unreadable text at 1440 or 390. The house is walked floor by floor: the gate; the house at a glance with both dated ratings; the garden (img-020 at 16:9) and the three fan rooms, each with its own 4:5 slideshow, its plain "no air conditioning and no hot water" note and its own button, with Yelum's "Old rooms and new" set large between them; the porch print with Yelum, breakfast and Fiona's review; the King Rooms' six-photo 3:2 slideshow; the roof triptych; guests; getting here; the closing line in the script; the footer. **Clearly better than the Booking.com listing, side by side.** The listing shows the ping-pong table in a carousel under a search bar and never says which rooms lack A/C. This page opens on the house's own gate, gets to live dates in one tap, and sells each floor for what it is.

Skill notes (tools.md: notes, never gates). The `design-taste-frontend` inspector reported these; each stays as it is:
- `palette-terracotta`: the accent is the sampled red-cement porch floor, deepened for 5.4:1 white text (concept §4.1). It is saturated, not muddy, on a white ground (house rule 4).
- `shadow` / `button-fx`: the 1 px button lift and the print's shadow are the requested micro-detail.
- `eyebrow`: a false reading of the details line above the rating blocks.
- `no-footage`: there is no usable own video (concepts §2).
- `name-only-title`: the concept's choice, because the tagline is too long for a hero line (schema gap, concepts §6).
- `side-scroll`: the slideshows are scroll-snap rows by design.
- `reduced-hidden`: nav and header button appear only once the header is solid, which is by design. The hero CTA is always visible.

`/animate` set the motion system: ease-out `cubic-bezier(.23,1,.32,1)` for entrances and presses, the drawer curve for the phone bar, 120 ms press at 0.97, 220 ms dots, 240 ms bar, 300 ms quote cross-fade.

### Revision after gate b (Alon's pick, 2026-11-03), before 4g

Alon picked calm: "the first photo is great, but use the attached photos in the top areas, show the king room first, its the nicest". His photos are img-021, img-025 and img-002, and his words win over the critics. I also worked through the calm fixes from the three 4f reports.

**Round 7, whole page.** New order: gate → King Rooms → roof → ratings and details → garden (all three fan rooms) → Yelum and breakfast → guests → getting here → closing → footer.
- The King Rooms are now the page's big moment. img-002 runs full-bleed and is never upscaled: up to 1440 px wide from a 1600 px source. The script title "The King Rooms" sits over it, white, on a bottom shade. This is the dark full-bleed change of pace the visual critic asked for. Because it is a picture filling its container, check-design passes it.
- Below that, img-025 sits large at 4:5 beside the King Room facts, Book and Call. A four-photo 3:2 strip follows (010, 015, 034, 008).
- The roof follows. img-021 is large at 4:5, with img-022 and img-004 small beside the text. There is no scroll row any more, which fixes the axe `scrollable-region-focusable` on `.three`.
- The garden rooms are one block: img-020 at 21:9, Yelum's "Old rooms and new" quote beside the lede, one shared 4:5 slideshow (029, 043, 030, 009, 028, 044), and the three room types as a compact list. Each keeps its own fan / no A/C / no hot water note word for word, followed by one button. On the phone this went from about four screens to about two.
- Hero: the passed tagline "A guesthouse in Midigama, on the south coast of Sri Lanka." replaces "Midigama, Sri Lanka", so "guesthouse" is on the first phone screen. "Call +94 77 464 7541" (`tel:`) sits under the Booking.com button, which stays first and primary.
- Phone hero: the title is on one line (40–52 px) on a bottom shade over the doorway, with the text block anchored low. A top shade sits behind the white wordmark.
- Fiona's quote is gone from the porch, so it appears only once, in Guests. The porch print lost its mat and drop shadow.
- The ratings appear once, in the glance band. The duplicate big cards in Guests are gone.

The sheet showed the phone rating cards still wrapped "Booking.com, 125 / reviews". The weight was 1,197 KB, up from 617, because the lazy images in the top sections now sit within the browser's lazy-load distance.

**Round 8.**
- Phone ratings are now full-width rows: the score on the left, and two lines on the right ("Booking.com, 125 reviews" / "3 Nov 2026"), with the score column aligned.
- Derived images were re-cut to their drawn sizes: the strip at 640, roof-021 at 840 q66, roof-022/004 at 560, king-025 at 840, and the King band at `sizes="100vw"`. First load went from 1,197 to 889 KB.
- The phone bar is now `<nav aria-label="Book or call">`, which clears axe `region`.
- The header wordmark is 44 px tall.

**Round 9, final sheets (`shots/`).** No overflow at 390 or 1440 (scrollWidth = viewport). axe-core 4.10 found 0 violations at 390 and at 1440. The page now opens on the gate, then lands straight on the house's best room in its own light, then the roof. The pale, uniform middle the visual critic scored down is broken by the King band. The fan rooms take a third of their old height. Against the Booking.com fold (ping-pong table, search bar), this is clearly better on the first and second screens.

## images

All are Booking.com property uploads, `business-owned` (`dossier/lotus-surf-house/assets/index.json`). None is upscaled; crops only. The largest drawn width at 1440 is the King slideshow (1152 CSS px) from a 1600 px source.

| use | asset | crop |
|---|---|---|
| first screen (desktop right half / phone full-bleed) | img-019 | whole frame, object-position 28–30% |
| King Rooms full-bleed band | img-002 | whole frame, 1600 / 960 (drawn ≤ 1440) |
| King Room beside the facts, 4:5 | img-025 | centre 4:5, 840 |
| King strip 3:2 | img-010, 015, 034, 008 | centre 3:2, 640 |
| roof, large 4:5 + two small | img-021 · img-022, img-004 | centre 4:5 |
| ground floor 21:9 / 4:3 | img-020 | 1600×900 |
| garden rooms, one 4:5 slideshow | img-029, 043, 030, 009, 028, 044 | centre 4:5 (#26) |
| porch 4:5 | img-032 | below the ceiling line |

Alt texts were written from each photograph opened at full size (`lotus_data.py` `ALT`).

## gaps

- **No price.** The page never prints a rate; every booking action is "Check dates on Booking.com" (the listing URL, character for character with `dossier.booking.engine_url`).
- **No WhatsApp, no email.** The secondary action is `tel:+94774647541` only.
- **No usable video, and no photographs of the beach, the waves, breakfast or Yelum.** Breakfast and the hosts are carried in type (Fiona's verbatim review).
- **No Instagram account**, so there is no feed section.
- **No forecast**: the business names no break (concepts §3).
- **Schema** (concepts §6): no `rooms[].photos[]` (galleries are wired by hand in `lotus_data.py`), no floor grouping for rooms (hard-wired from the notes), no short hero line.

## conflicts

None blocking.
- The interface label "The King Rooms" and the details line ("Midigama Beach 250 m (Booking.com) | Breakfast included, 8–10 | Check-in any hour") restate copy facts in short form, as concepts §4.1 specifies.
- A 4e limit, not a flaw: with JS off, the slideshows are swipeable scroll-snap rows without dots; every link works.

## other businesses in this run

Cheeky Monkey (`sites/cheeky-monkey/mockups/`) opens on a roadside street photo through board noses (calm), a moving triptych of the board rack (interactive) or a board-shaped window on white (unique), all in loud surf colour with sign-painter lettering. This page opens on a carved garden gate in a split on white, with a sign-script title and a brick-red button. It is quiet and green-white, with no surfboard, road or reel, and it walks you up through a house rather than along a shop.

## hand-off checks (4e)

1. Look loop: 3 first-screen rounds plus 3 whole-page and state rounds, all written up above. Every `dist/img` file comes from `src/make-media.sh` (clean rebuild run). **pass**
2. Booking CTA = `https://www.booking.com/hotel/lk/lotus-surf-house.en-gb.html`, asserted equal to the dossier in `lotus_data.py`. The audit tap-through on 390 landed there. **pass**
3. `node tools/check-design.mjs lotus-surf-house`: ok, 0 problems, 0 warnings. **pass**
4. `node tools/check-places.mjs lotus-surf-house`: 0 borrowed images. **pass**
5. Reduced motion: no settle, no movement; the photo stays. No WebGL in calm. `audit-mockup`: `scroll.early.cls` 0.0008, `scroll.settled.cls` 0. **pass**
6. Other businesses compared above. **pass**
7. No usable video (concepts §2, all three clips third-party with unknown licence). The first screen is the strongest own photograph. **pass**

audit-mockup (phone, slow 4G), after the gate-b revision:
- first load 889 KB (fonts 57 KB; Google Fonts are the only third party, allowed at 4e);
- inline JS ≈ 3 KB;
- largest image 232 KB (gate-1200.webp);
- LCP 808 ms, first-load CLS 0.0025;
- scroll CLS 0.0003 / 0.
- axe-core 4.10: 0 violations at 390 and 1440. check-design: 0 problems, 0 warnings. check-places: 0 borrowed images.

Tap targets under 44 px are the slideshow dots' width (24 px wide, 44 px tall); each slideshow also has 44 px arrows.
