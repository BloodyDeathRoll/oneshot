# Layday Surf Ahangama — how the gold page was made

The pipeline's own output, station 4e, run `2026-09-ahangama-02`: concept 3 ("Inside") of the
round-3 concepts (`sites/layday-surf-ahangama/concepts.md`, creative-director 0.2.2), built by
designer 0.3.3. Picked by Shahar on 2026-09-22: "the only variant with an idea on the first screen,
in the business's own colour, inside budget." One HTML file, images inlined. Read this for the
method. Do not copy the page.

## The method, in order

1. **Took the material's limit first.** The best photograph is 1024×768 — nothing full-bleed, and
   none of the photographs on the first screen. The big moment is drawn; photographs appear at the
   size they can hold.
2. **Found the one thing.** The whole hostel is one dorm, so what a guest books is one berth: a
   yellow plastered bunk box with a curtain, a lamp, a wall niche, a locking drawer and a black steel
   ladder (`img-018`). Every screen shows exactly one berth, never a row — the dossier has no
   consistent bed count, so nothing on the page is countable.
3. **Took the colour from the business, and fixed the tone.** Round 2's ochre was "good colour
   separation, bad colour tones". Round 3 samples the most saturated bunk wall, berth yellow
   `#E2B827` (`img-002`), as the one big colour on a cool ground `#E8E9F0` (`img-017`), with ink
   `#0B0F10` (the ladder, `img-008`) and violet `#3C1D51` (`img-012`) for booking and nothing else.
   Yellow is never the page ground and never sits beside cream.
4. **One idea, one moment.** You start inside a drawn 3D berth — flat planes, 1 px ink seams, no
   gradient — with the headline lying low in the bunk as real text. Scrolling is climbing out: the box
   flattens into a 16:10 berth, grows its ladder, and docks in the corner as the booking control
   (on a phone, the foot bar). The drawer under the berth is the booking panel.
5. **One family of type.** Urbanist alone.
6. **Looked, three rounds, on the first screen alone.**
   - Round 1: an empty yellow void — the headline was hidden under the canvas — and the box slid
     under a stray pointer. It read as a 3D-software test render, not a berth.
   - Round 2: it read as the inside of a box, and the ink seams made it look drawn, not rendered;
     the words sat too high and spilled out of the box on the phone.
   - Round 3: the words lie in the bunk; the niche and lamp arm make it `img-018` within a second.
7. **Then the rest of the page, and more rounds.** A quote ran under a photo pair; the docked berth
   hid line ends; the phone address ran into its link; the drawer had no edge on the yellow wall. All
   found in screenshots, not in code. Checked at 1525 and 1920 as well as 1440 and 390, because
   Shahar's real viewport is about 1525 px: content sits in a centred 1200 px column.
8. **Small things that carry weight.** The Rosa forecast follows the two-half rule — headline in the
   page's type, Rosa's own widget beside it, loaded only near the viewport. No photograph captioned.
   Every booking control is a real link underneath. Reduced motion and no-JS get a static box; no
   WebGL gets the same box on a 2D canvas.

## What was avoided on purpose

Cream, beige, sand or ochre as a ground; a serif display face; Inter; a teal accent; all-caps labels
over headings; 01/02/03 numbering; a row of bunks; a fade-up on every section. The round-2 archetype
(the printed spec card) is retired.

## Not verified

A real phone or GPU (headless Chromium only). Self-hosted fonts (it loads Urbanist from Google
Fonts). The forecast headline is the 2026-09-21 fixture, not live data. Rounds 5 and 6 changed
nothing on the page sheets (the changes were in the drawer and the static layout); Shahar accepted
that for this run only.

Open from the pick, for 4g: the docked booking box never covers text at any width (at 1440 and 1525
it covers the ends of lines today); remove the empty screen after the hero; add the capture date to
each rating.
