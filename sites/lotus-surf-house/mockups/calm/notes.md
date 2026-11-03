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

## images

All are Booking.com property uploads, `business-owned` (`dossier/lotus-surf-house/assets/index.json`). None is upscaled; crops only. The largest drawn width at 1440 is the King slideshow (1152 CSS px) from a 1600 px source.

| use | asset | crop |
|---|---|---|
| first screen (desktop right half / phone full-bleed) | img-019 | whole frame, object-position 28–30% |
| ground floor 16:9 | img-020 | 1600×900 |
| garden room slideshows 4:5 | img-029, 032, 030, 009 · 029, 032, 009, 030 · 043, 028, 044 | centre 4:5 (#26) |
| porch print 4:5 | img-032 | below the ceiling line |
| King Room slideshow 3:2 | img-002, 010, 015, 025, 034, 008 | centre 3:2 |
| roof row 4:5 | img-021, 022, 004 | centre 4:5 |

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

audit-mockup (phone, slow 4G):
- first load 617 KB (images 500 KB, fonts 57 KB, Google Fonts only as third party, allowed at 4e);
- inline JS ≈ 3 KB;
- largest image 232 KB (gate-1200.webp);
- LCP 644–1,016 ms over the last two runs, first-load CLS 0.020;
- scroll CLS 0.0008 / 0.

Tap targets under 44 px are the slideshow dots' width (24 px wide, 44 px tall); each slideshow also has 44 px arrows.
