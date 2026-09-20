# The Lavish Haven — mockup 3, "unique"

Station 4d. Built 2026-09-20 from `sites/the-lavish-haven/copy/en.json` (the copy that passed
station 4c) and `dossier/the-lavish-haven/`. Its own Astro project; no markup, CSS or component is
shared with mockup 1, mockup 2, or any other business.

## direction

`custom.md`: *"full blown unique"*, canvas/WebGL in place of static image grids, editorial and
asymmetric grids with varying column counts, overlapping kinetic type, and a booking UX behind a
slide-out.

**The courtyard.** This hotel is a courtyard: two storeys of rooms down both sides, water in the
middle, and — in the copy's own words — "most evenings that is where people end up". So the page is
laid out the same way. A band of the hotel's own pool is fixed to the bottom of every screen for the
whole document, and the heading of whatever section you are reading is reflected in it: upside down,
riding a slow swell, the way a lit sign reflects in a pool at night. Scroll from "Nine doors" to
"The place" and the water changes what it is reflecting.

The page above it is bleached plaster with one enormous grotesque. The name is set as three
overlapping lines that lean apart as the pointer crosses the screen — the kinetic type `custom.md`
asks for, and the thing the water reflects on the first screen.

**Nine doors.** The honest problem with this business is that it has nine room types and about forty
photographs of beds that differ mainly in the wall behind them, with nothing in the dossier saying
which photograph is which room. Mockup 1 answered that by setting the rooms as a list. This one makes
it the idea: an index of nine, and choosing one sets its specification in display type — beds,
occupancy, the note, and the honest line about the rate. No photograph is ever claimed to be a room.

Read against `agents/designer/references.md`:

- **#19** — none of the six reference sites uses canvas or WebGL, so there is no precedent cached for
  any of this. `src/scripts/courtyard.js` is hand-written WebGL1: two textures (the pool photograph,
  and a 2D canvas the current heading is drawn into), one full-screen triangle, ~100 lines of GLSL.
- **#8 type does the heavy lifting** and **#10 grid-breaking with no assets** — the hero is type on
  plaster, no photograph at all; sections sit on a 12-column grid at 1/7, 8/13, 1/5, 7/13, 3/13.
- **#12 data as caption** (White Desert's coordinates) — each room carries its specification as the
  caption a photograph would otherwise carry.
- **#18** — the photographs travel sideways inside a vertical page, as a native snapping scroller.
- **#6 one accent, booking only** — pool cyan `#0D7D8C` on the header action, the per-room action,
  the phone bar and the drawer's primary button. Nowhere else.
- **#1 the CTA reveals a panel** and **#4 persistent on a phone** — a right-edge slide-out, and a
  cyan bar sitting on the waterline on every phone screen.
- **#20 nothing covers the content** — which is why the page is its own scroll area (see below).

## revision, 2026-09-20 (Shahar's review)

1. **The heading is projected on the water, not reflected in it.** A true reflection flips the
   letters, and flipped letters cannot be read — the wrong trade for the one word that tells you
   which section you are in. The text texture is now uploaded the right way up and the swell moves
   under it, so it reads as type thrown onto a moving surface. The water itself is unchanged.
2. **"Nice design but plain."** Four additions, all of them from material this business already has:
   - **A house mark.** A set of swell lines drawn once as SVG (`src/components/Swell.astro`) and
     reused as the divider under the hero and as the ground under the nine doors. This is
     references.md **#11** — Morgan's Rock's contour pattern, the cheapest identity device there is:
     one SVG, no photographs needed. Kabalana's swell runs from the south-south-west, so the lines do.
   - **A ghost numeral.** The nine sits behind the room specification at 17 rem, so a page of prose
     has a scale in it.
   - **The platform ratings set large.** 9.2 and 5.0 are the strongest proof this hotel has; they
     were 1.35 rem and are now up to 2.9 rem of display weight.
   - **Two full-bleed photographs** between the long text runs, with the same parallax the other
     mockups use, off on phones and under `prefers-reduced-motion`.
3. **The Rosa forecast for Kabalana** sits beside "The wave" — see the conflict below.

## facts

Every word other than interface labels comes from `copy/en.json`, which the copyeditor passed with
0 unsourced and 0 contradicted claims; each paragraph maps to dossier fields in `copy/sources.md`.
Same fact set as mockups 1 and 2 — the three carry identical content so the pick is about design
(base.md, 4d outputs). The fact table is in mockup 1's `notes.md`.

Two fixed strings deserve naming because they are judgements, not dossier facts:

- **"Nine doors"** — the section's own label, and the word reflected in the water. The count comes
  from `copy.rooms.length`.
- **"Rate: Depends on the dates — the listings show what is free"** — the honest statement of the
  price gap, in the slot where a rate would be. It asserts nothing.

## gaps

Identical to mockups 1 and 2: no prices (live OTA inventory), no check-in / check-out times, no
season, no WhatsApp, no street address, no email, no socials. Nothing is invented.

This mockup puts the price gap where a visitor will look for it — in the room specification — rather
than only in a sentence near the booking action.

## images

Same 79 business-owned photographs, same two problems: every asset description in the index is the
string "Booking.com listing photo", and no photograph is mapped to a room type. Alt text was written
by looking at each image.

| Asset | Where |
|---|---|
| `img-002` | the courtyard band: the `<img>` that shows without WebGL, and the shader's pool texture |
| `img-078` `img-072` `img-067` `img-065` `img-014` `img-047` `img-042` `img-057` `img-001` | the sideways run |
| `img-073` `img-077` | the two full-bleed bands |

The hero uses **no photograph at all** — it is type on plaster. 67 business-owned photographs are
unused. No review photo, stock or generated image is used.

## conflicts

1. **A fixed band at the foot of the screen versus playbook §4, "nothing may cover the content".**
   A band fixed over a normally-scrolling document hides every line that passes behind it. Resolved
   by giving the page its own scroll area — `position: fixed; inset: 0 0 var(--band) 0;
   overflow-y: auto` — so the text stops at the waterline and nothing is ever read through water.
   The cost is a nested scroll container: the browser's own scrollbar is inside the page area, and
   on iOS the URL bar will not collapse on scroll. That is the trade, and it is the reason this is
   mockup 3 and not mockup 1.
2. **`custom.md` asks for canvas; playbook §10 requires content not to live only inside one.**
   The canvas draws one photograph and one reflected heading. Every heading it reflects is a real
   `<h2>` above the water. With WebGL off the band is a still photograph of the pool.
3. **`custom.md` asks for a slide-out over a booking engine.** There is no engine of ours, and
   playbook §5 forbids introducing a channel the owner does not monitor. The slide-out holds the two
   listings the hotel already sells through plus the front desk number, carries across which room
   you were looking at, and says in plain words why it does not ask for dates.

3. **The Rosa widget is a third-party embed, and playbook §4 says "third-party requests on load: 0"
   and "all assets self-hosted".** Shahar asked for it and it earns its place — the visitor is a
   surfer and Kabalana is why they are booking. The iframe is `loading="lazy"` so it is off the
   critical path and outside the first-load budget, it is sandboxed, and it carries
   `referrerpolicy="strict-origin-when-cross-origin"`. It remains a live dependency on `rosa.surf`:
   if that host is down the visitor sees an empty frame. The dossier-sourced spot sentence above it
   stands on its own. Flagged, not hidden.

## self-check

| Check | Result |
|---|---|
| Every fact traces to the dossier | pass — same content as mockups 1 and 2 |
| Booking targets match the dossier character for character | pass — Booking.com, Agoda, `tel:+94764832988` |
| Works with JavaScript off | pass, and verified: every `Check dates` / `Check this room` trigger is an `<a href="#book">` that lands on the footer booking block, which holds both listings and the phone number. The drawer is the enhancement; the link is the floor. Measured in Chromium with JavaScript disabled: 3 triggers, all anchors, 4 booking links in the footer block. |
| WebGL missing or context lost | pass — `startCourtyard` returns `null`, the canvas stays at `opacity: 0`, the photograph shows |
| `prefers-reduced-motion` | pass — the shader never starts, the kinetic type never leans, the slide-out has no transition |
| Keyboard | pass — Esc closes the slide-out and focus returns to the trigger, verified at 390 px and 1440 px; the nine doors are `<button>`s with `aria-current`, the detail panel is `aria-live="polite"`; the sideways run is a native scroller |
| First screen carries name + claim + proof + booking action | pass — the display type is sized to fit the area above the waterline rather than fill it |
| Mobile 390 px / desktop 1440 px | pass — `shots/mobile-*.png`, `shots/desktop-*.png`; no overflow, no overlap |
| Tap targets ≥ 44 px | pass |
| Broken images | 0 |
| Self-hosted, no third party | **partial** — 0 external requests on first load; fonts vendored, the house mark and the platform marks drawn inline, the shader hand-written. The Rosa forecast iframe (`rosa.surf`) is one deliberate third-party embed, lazy and sandboxed. See conflicts. |

**Weight** (`weight.json`): html + inlined css 25 KB · JS 16 KB · fonts 119 KB (Bricolage Grotesque
+ Inter Tight) · images 1320 KB across all widths of all 10 photographs.

First mobile load is the HTML, two fonts and the 400 px pool image — about **180 KB**, against the
playbook §4 budget of 1.5 MB and 300 KB of JS.

**Lighthouse was not run** — there is no Lighthouse runner in `tools/`. The figures are measured file
sizes. Base.md "Before handing off" item 3 is not satisfied.

## a note on the screenshots

Because the page is its own scroll area, a browser "full page" capture is exactly one viewport.
`shots/*-1.png` … `-6.png` are the record: six scroll positions of the page area, at each width.

## what a visitor would notice is different

Against **KA Surf Hostel**: this site has photographs big enough to fill a screen and uses them;
KA never shows one larger than a postcard, because its best is 576 px wide. Against **Layday Surf**:
this scrolls as a continuous magazine, Layday is a single bordered card read in panels. See the
divergence table in `sites/the-lavish-haven/concepts.md` §5.
