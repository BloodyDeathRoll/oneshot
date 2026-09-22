# The Lavish Haven — how the gold page was made

Made 2026-09-21 outside the pipeline, as a test: same copy (`copy/en.json`), same 79 photographs,
same model, none of `base.md`. One HTML file. Read this for the method. Do not copy the page.

## The method, in order

1. **Looked at all 79 photographs before anything else.** Two are good (the night pool, `img-001`,
   `img-002`), a handful are useful, about sixty are near-identical beds and bathrooms. All are
   1024×768, so none may be used full-bleed.
2. **Found the one thing.** The pool: saturated blue, in the middle of the hotel, with one corner
   cut. The copy already says it: "most evenings that is where people end up."
3. **Sampled the palette from the photographs.** Noon pool `#12B5EC` (`img-079`). Night pool
   `#0B4A94` and sky navy `#07102E` (`img-002`). Cool white ground from the building's render.
   Lamp yellow `#FFC247` from the lit rooms, used for booking and nothing else.
4. **One idea.** A pool-shaped window of live water on a white page. Scrolling opens it to the full
   screen and takes it from noon to night; the night photograph then rises as a print at its
   native size. No photograph is upscaled anywhere (references.md #27).
5. **One family of type.** Jost, light, large. The pointed A and V repeat the cut corner.
6. **One shape.** The cut corner: on the pool, the booking button, the wave panel, the closing
   panel. Nowhere else (references.md #28).
7. **Looked, three rounds, on the first screen alone.**
   - Round 1: the water read as sci-fi plasma, the tiles were too big, and there were two booking
     buttons on one screen. It would have failed the gate.
   - Round 2: cell-based caustics, finer mosaic, one button, header colour timed to the water.
   - Round 3: a black box in the capture, traced to the headless compositor and worked around
     (references.md #29).
8. **Then the rest of the page, and one more round.** Sticky text ran over the photo strip; a grid
   row left a hole between the lead and the body. Both were found in screenshots, not in code.
9. **Small things that carry weight.** Room photographs cropped to 4:5 from the centre
   (references.md #26). No photograph captioned or tied to a room type, because nothing in the
   dossier ties them. The drawer remembers which room was tapped. Every booking control is a real
   link underneath. A static layout for reduced motion and for no WebGL.

## What was avoided on purpose

Cream ground, editorial serif, Inter, a petrol accent, all-caps labels over headings, 01/02/03
numbering, a fade-up on every section. That set is what the pipeline had briefed for this same
business.

## Not verified

A real phone or GPU (headless Chromium only). Self-hosted fonts (it loads Jost from Google Fonts).
`check-design`, `audit-mockup`, the facts table. Rosa forecast added 2026-09-22, on Shahar's
request, per playbook §4: in the noon-blue wave panel, the headline (height, time, swell, wind) in
Jost on the left and Rosa's own widget (light theme) on the right, loaded lazily, with a plain-link fallback.

Two lines are not in `en.json` and belong to a copyeditor pass: "Two minutes from the hotel, on
foot." and the closing headline "Rates move with the dates. The listings show what is free."

House rule 1 — **resolved 2026-09-21: rule unchanged, closing panel relit.** The closing panel
(`footer.close .frame`) was night blue `#07102E` behind the headline, the booking button and the
footer links; it is now the cool white ground `#F5F8FA` with night-blue ink. The pinned night-blue
water moment stays: it is a picture, not a panel behind body text. `tools/check-design.mjs` passes
on this file at 1440 and 390 px. See proposal 003 §4.
