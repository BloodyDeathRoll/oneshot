# The Lavish Haven — mockup 1, "calm"

Station 4d. Built 2026-09-20 from `sites/the-lavish-haven/copy/en.json` (the copy that passed
station 4c) and `dossier/the-lavish-haven/`. Its own Astro project: no shared template, no markup
or CSS carried from another business (CLAUDE.md, Architecture).

## direction

`custom.md`: *"calm, moderate and expressing a conformist standard approach."* PLAN.md §9: the calm
mockup skips the canvas. So: one cream page, two typefaces with one job each, one accent colour
reserved for booking, and nothing that moves. Everything here is static CSS.

Read against `agents/designer/references.md`:

- **#6 one accent colour, reserved for booking actions** (Kube lime, White Desert orange) — petrol
  `#0F3B45` appears on the three booking buttons, the phone link, the map link and focus rings, and
  nowhere else.
- **#4 booking persistent on a phone** (Morgan's Rock, Kube) — a fixed two-button bar at the bottom
  of every screen under 760 px, plus the docked strip under the hero (Morgan's Rock's docked bar).
- **#8 type does the heavy lifting** — the lead paragraph of each section is set large in the serif
  against small sans, because this business's photographs cannot carry a page.
- **#9 imperfect photos as matted prints** (Tandjung Sari) was the first attempt and it was wrong
  here: staggered heights and a caption under every frame read as chaos on a page whose whole
  argument is restraint. Replaced on review with one even gallery — eight photographs, all cropped
  to the same 4:3 frame, equal gaps, no captions. The alt text still carries the description.
- **#10 grid-breaking with no assets** — dropped for the same reason. The break in this page's
  rhythm is now the full-bleed bands, not a staggered tile.
- **#23 two families, each with one job** — Instrument Serif for display, Inter for everything else.
  68 KB of font, self-hosted, `font-display: swap`.
- **#20 nothing covers the first screen** — no pop-up, no cookie wall, no chat widget.

## facts

Every word on the page other than interface labels comes from `copy/en.json`, which the copyeditor
passed with 0 unsourced and 0 contradicted claims; each paragraph is mapped to its dossier fields in
`copy/sources.md`. The template's own fixed strings are labels only: "Check dates", "Where it is",
"The rooms", "What is here", "Recently opened", "What guests wrote", "The wave", "Before you arrive",
"Where", "Front desk", "Book", "Open in Google Maps", "Skip to booking", "Call".

Facts rendered, with their dossier keys:

| On the page | Source |
|---|---|
| Name, tagline, all six copy blocks | `copy/en.json` → `dossier.business`, `location`, `facilities`, `room_types`, `stayInfo` |
| 9.2/10 Booking.com, 34 reviews · 5.0/5 Google, 21 reviews | `dossier.reviews` → `copy.ratings[]` |
| Nine room types with beds and occupancy | `dossier.room_types` → `copy.rooms[]` |
| 25 amenities with their surcharge notes | `dossier.facilities` → `copy.amenities[]` |
| Five guest quotes, verbatim, with author and platform | `dossier.reviews` → `copy.testimonials[]` |
| Phone `+94764832988` | `dossier.contact.phone` (source: Google Maps listing) |
| Address "Ahangama, Sri Lanka" | `dossier.location.address` |
| Map link | `dossier.location.map_url`, character for character |
| Booking.com and Agoda links | `dossier.booking.engine_url` → `copy.bookingLinks[]` |
| Kabalana spot line | `copy.spot` |

## gaps

- **No prices anywhere.** `dossier.gaps` records that nightly rates are live dated OTA inventory, not
  a published price list. The page says so in one line instead of inventing a "from" rate, and sends
  the visitor to the two listings that do hold live rates. Playbook §2 wants a price; this business
  does not publish one. Pitch point.
- **No check-in / check-out times.** `dossier.gaps`. The page says only what the dossier holds: the
  front desk is staffed 24 hours, with private and express check-in.
- **No season block.** `copy.season` is `null`; the section is omitted rather than filled.
- **No WhatsApp.** `dossier.contact.whatsapp` is `null` — "not published". Playbook §5 wants WhatsApp
  first; there isn't one, so the primary action is the OTA listing the hotel already answers on, with
  `tel:` beside it. No number is guessed. Pitch point.
- **No street address.** Booking does not publish one; the footer shows what exists plus the map link.
- **No email, no Instagram, no Facebook** in the dossier — so none on the page.
- **No FAQ section.** Playbook §3 item 8 says "only questions the dossier can answer". The answerable
  ones (parking, airport shuttle, family facilities, laundry) are already in "Before you arrive";
  turning them into questions would have been padding.

## images

79 photographs, all `business-owned`, all from the hotel's own Booking.com listing. Two problems that
drove the design:

1. **Every asset's description in `assets/index.json` is the string "Booking.com listing photo".**
   There is no per-image description to build alt text from. Alt text here was written by looking at
   each photograph and describing what is visible — no room type, no claim, nothing a caption could
   get wrong. The image descriptions belong in the harvester's output; logged as a gap.
2. **The dossier does not map photographs to room types.** About forty of the 79 are wide-angle phone
   shots of beds that differ mainly in the wall behind them. Captioning one "Deluxe Family Suite"
   would be an invented fact (base.md hard constraint 1), so the nine room types are set as **text**
   and the photographs are shown separately as a plate of the place. This is also the better design:
   forty near-identical bed shots in a grid is what makes a hotel site look generated.

Used, in order:

| Asset | Where | Alt |
|---|---|---|
| `img-002` | hero | room blocks lit at dusk around the lit pool |
| `img-078` | gallery | the pool from above in daylight |
| `img-072` | gallery | balcony looking down through palms to the pool |
| `img-014` | gallery | guest room with a stone feature wall |
| `img-042` | gallery | bathroom, dark tile, lit mirror |
| `img-065` | gallery | balcony with timber chairs under a slatted roof |
| `img-057` | gallery | bathroom tiled in timber-toned stone with a rain shower |
| `img-047` | gallery | room with two beds under a high pitched ceiling |
| `img-079` | gallery | pool and garden from above |
| `img-001` | band after the gallery | the pool lit from within at dusk |
| `img-073` | band before "What is here" | down from a balcony through palms to the pool |
| `img-067` | band before "Recently opened" | the pool from a stairwell, framed by a palm |
| `img-077` | band before "What guests wrote" | a balcony behind a bamboo blind |
| `img-068` | band before "The wave" | a balcony walkway with banana leaves against the rail |

65 further business-owned photographs are available and unused — mostly the near-identical room and
bathroom shots. No review photo, stock or generated image is used; none exists in this dossier.

## revision, 2026-09-20 (Shahar's review)

1. **The booking actions keep a line of their own**, with the caveat sentence underneath them
   rather than beside them. Each action carries its platform's mark, drawn inline as SVG
   (`src/components/`), so the page still makes **zero outside requests** for them — Booking.com's
   blue "B.", Agoda's grey "a" over its row of coloured dots, and a plain handset for the phone.
   The marks are used nominatively: each labels a link to this hotel's own listing on that platform.
2. **The docked strip is centred** — actions on one line, the caveat centred under them. The
   left-aligned version was the shape Shahar flagged on KA on 2026-09-20; it applied here too.
3. **The photographs are one even gallery** — same crop, same size, equal gaps, captions removed.
4. **The run-in gap before the room table and the amenity list now equals the section's own top
   padding** (56 px), so the gap between the section rule and its eyebrow and the gap between the
   text and the table are the same measure.
5. **Five full-bleed photographs sit between the long text sections.** They parallax with
   `background-attachment: fixed`, which keeps this mockup at **zero bytes of JavaScript**; on
   phones and under `prefers-reduced-motion` they are plain cover images, because fixed attachment
   is unsupported or janky there. Cost: the source photographs are 1024 px wide, so a full-bleed
   band upscales them — acceptable at this size, and the reason the bands use the wide pool and
   balcony shots rather than the tight interiors.
6. **The Rosa forecast for Kabalana is embedded in "The wave"** — see the conflict below.

## conflicts

1. **`custom.md` asks for canvas/WebGL on every mockup; PLAN.md §9 exempts the calm one.** That
   exemption was never merged into `custom.md`, which is Shahar's file and not mine to edit. Shahar
   confirmed on 2026-09-20 that calm skips the canvas for this run. The proposal to put the line into
   `custom.md` is still open — `proposals/2026-09-mirissa-01/001-designer-custom-calm-variant.md`.
2. **The Rosa widget is a third-party embed, and playbook §4 says "third-party requests on load: 0"
   and "all assets self-hosted; the site must work when a CDN doesn't".** Shahar asked for it on
   2026-09-20 and it is genuinely useful here — the visitor is a surfer and Kabalana is the reason
   they are booking. Mitigations: the iframe is `loading="lazy"`, so it is not on the critical path
   and not part of the first-load budget; it is sandboxed; it carries
   `referrerpolicy="strict-origin-when-cross-origin"`; and the section reads correctly without it,
   because the spot sentence above it is dossier-sourced text. It remains a live dependency on
   `rosa.surf`: if that host is down, the visitor sees an empty frame. Flagged, not hidden.
3. **`custom.md` asks for a booking drawer hiding a complex booking engine.** There is no engine to
   hide: this hotel takes bookings through Booking.com and Agoda, and playbook §5 forbids introducing
   a channel the owner does not monitor. A drawer that collected dates and then threw them away at an
   OTA link would be theatre. The calm mockup therefore states the honest limit — "rates change with
   the dates" — and links out. Mockups 2 and 3 do build the drawer, over the same two links.

## self-check

| Check | Result |
|---|---|
| Every fact traces to `notes.md` `facts` | pass — page grepped for digits and proper nouns |
| Booking targets match the dossier character for character | pass — Booking.com, Agoda and `tel:+94764832988` diffed against `dossier.booking` / `dossier.contact` |
| Mobile first, 390 px | pass — `shots/mobile.png`, no overflow, no overlap |
| Desktop 1440 px | pass — `shots/desktop.png` |
| Works with JS off | pass — the build ships **0 bytes of its own JavaScript**; every action is an `<a href>`, and the parallax is CSS. The embedded Rosa widget runs its own script inside its sandboxed iframe; with JavaScript off the frame is empty and the rest of the page is unaffected. |
| Tap targets ≥ 44 px | pass — buttons 44 px, the fixed bar 52 px |
| Reduced motion | not applicable — nothing animates |
| Keyboard | pass — document order, skip link first, visible focus ring on every link |
| Broken images | 0 (`tools/shoot-mockups.mjs`) |
| Self-hosted, no third party | **partial** — 0 external requests on first load; the fonts and the three platform marks are vendored. The Rosa forecast iframe (`rosa.surf`) is one deliberate third-party embed, lazy-loaded and sandboxed. See conflicts. |
| Relative URLs | pass — CSS is inlined, assets referenced without a leading slash, so the build runs from a subfolder |

**Weight** (`weight.json`, whole `dist/`): html+inlined css 19 KB · JS 0 KB · fonts 68 KB ·
images 1299 KB across all three widths of all nine photographs.

First mobile load is the HTML, the two fonts, and the 400 px hero — about **120 KB**, against the
playbook §4 budget of 1.5 MB. Everything below the fold is `loading="lazy"`. Largest single image
file is 159 KB (the 1024 px hero), under the 200 KB above-the-fold ceiling.

**Lighthouse was not run** — no Chrome/Lighthouse runner is wired into `tools/` yet. The numbers above
are measured file sizes, not a Lighthouse score. Base.md "Before handing off" item 3 is therefore not
satisfied; it needs a tool that does not exist. Reported, not papered over.

## house rules — checked, not promised

`tools/check-design.mjs` measures these on the built page at 1440 px and 390 px and fails the
station if any of them breaks. All three were said by Shahar, then broken by a later rebuild of
this very mockup, then said again:

1. **Light theme.** Every surf business, every variant. This page's ground and every panel behind
   body text are measured for luminance; a photograph filling a container is a picture, not a theme.
2. **No padded picture boxes.** Where photographs of different shapes sit together they are either
   cropped to one ratio or laid out as real masonry where each keeps its own height. Equal-height
   boxes with mixed content — half a card empty under a portrait — are what this check exists for.
3. **No caption under a photograph.** Alt text carries the description; attribution under a
   quotation is not a caption and stays.

Result for this mockup: **0 problems**.

## what a visitor would notice is different

Against **KA Surf Hostel**: this site has photographs big enough to fill a screen and uses them;
KA never shows one larger than a postcard, because its best is 576 px wide. Against **Layday Surf**:
this scrolls as a continuous magazine, Layday is a single bordered card read in panels. See the
divergence table in `sites/the-lavish-haven/concepts.md` §5.
