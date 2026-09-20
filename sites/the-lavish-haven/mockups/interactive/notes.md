# The Lavish Haven — mockup 2, "interactive"

Station 4d. Built 2026-09-20 from `sites/the-lavish-haven/copy/en.json` (the copy that passed
station 4c) and `dossier/the-lavish-haven/`. Its own Astro project; it shares no markup, CSS or
component with mockup 1 or with any other business.

## direction

`custom.md`: *"more interactive with some bells and whistles"*, plus canvas/WebGL instead of static
image grids, editorial asymmetric grids, and a booking UX hidden behind a sliding drawer.

The idea comes from the business, not from a template. The pool is physically in the middle of this
hotel, its two best photographs are the pool lit at night, and the copy says "most evenings that is
where people end up". So the page opens on the pool, pinned for three screens of scroll, and the
scroll walks it from afternoon to dusk to after dark. The water is a WebGL surface drawn over the
hotel's own photographs: it refracts them, it catches caustics where the water is already bright,
and it ripples under the pointer.

Read against `agents/designer/references.md`:

- **#19** records that none of the six reference sites uses canvas or WebGL anywhere, so there was
  nothing cached to lean on. The shader is written by hand against WebGL1 in
  `src/scripts/pool.js` — no three.js, no CDN, 6 KB of JavaScript for the whole page.
- **#17 the cheapest convincing motion recipe** (Kube) — image parallax of ±4 rem inside an
  `overflow: hidden` wrapper, scrubbed on scroll, **switched off at ≤ 767 px**, 0.3 s eases on the
  drawer. Copied deliberately, including the cut-off.
- **#18** — the one "interactive" pattern in the reference set that stays navigable is a horizontal
  run inside a vertical page. The nine room types are a native horizontal scroller with snap and a
  peeking next card (**#14**), not a transform track: it works with the keyboard, with a screen
  reader, and with a trackpad.
- **#6 one accent, booking only** — lamp amber `#E2A656`, taken out of the hotel's own night
  photographs, is on the Book button, the drawer's primary action, the per-room buttons and the
  phone bar. Nowhere else.
- **#4 booking persistent on a phone** — amber bar on every screen under 760 px.
- **#2 keep the first booking step tiny / #1 the CTA reveals a panel, it never navigates on first
  tap** (Tandjung Sari, Kube) — the drawer slides down over the page and hands off only when the
  visitor picks a channel.
- **#20 nothing covers the first screen** on load.

## facts

Every word other than interface labels comes from `copy/en.json`, which the copyeditor passed with
0 unsourced and 0 contradicted claims (`copy/review.md`); each paragraph maps to dossier fields in
`copy/sources.md`. Same fact set as mockup 1 — the three mockups carry identical content so the
human's pick is about design (base.md, 4d outputs). See mockup 1's `notes.md` for the fact table;
the one difference is that this page also prints the room count ("The rooms · 9 types") from
`copy.rooms.length`, and the hero sub-line quotes the intro block's own sentence about the pool.

## gaps

Identical to mockup 1: no prices (live OTA inventory), no check-in/check-out times, no season, no
WhatsApp, no street address, no email, no socials. Nothing is invented to fill them.

One gap this mockup handles differently: because it has a drawer, the drawer has to say what it
cannot do. It does, in plain words — this hotel's live availability lives on Booking.com and Agoda,
so the drawer does not ask for dates it would then throw away.

## images

Same source and same problem as mockup 1: 79 business-owned photographs from the hotel's own
Booking.com listing, every one described in the asset index only as "Booking.com listing photo", and
no mapping from photograph to room type. Alt text was written by looking at each image. The nine
room types are again set as **text**, in the rail; no card claims a photograph is that room.

| Asset | Where |
|---|---|
| `img-079` | pool texture, "afternoon" |
| `img-001` | pool texture, "dusk" |
| `img-002` | pool texture, "after dark"; also the `<img>` that shows when WebGL is unavailable |
| `img-072` `img-014` `img-042` `img-065` `img-057` `img-067` | the interlocking plate grid |
| `img-013` `img-078` | declared in `photos.json`, not placed — available for a later round |

67 further business-owned photographs unused. No review photo, stock or generated image is used.

## conflicts

1. **`custom.md` asks for a booking drawer over a "complex booking engine".** There is no engine of
   ours to hide, and playbook §5 forbids introducing a channel the owner does not monitor. The drawer
   therefore holds the two listings the hotel already sells through, plus the front desk number, and
   says so. The alternative — a date picker that collects dates and then drops them at an OTA link
   that ignores them — would look better in a screenshot and waste a real visitor's time.
   The triggers are `<a href="#book">`, upgraded by script into the drawer, so the booking path
   survives with JavaScript switched off.
2. **`custom.md` asks for canvas over "static image grids"; references.md #19 records no precedent
   for it in the reference set, and playbook §10 requires that content not live only inside a
   canvas.** Resolved by keeping the canvas purely decorative: it draws the hotel's own photographs
   and nothing else. Every word and every fact is DOM text. With WebGL off, JavaScript off, or
   `prefers-reduced-motion`, the page is the photograph and loses nothing but the water.

## self-check

| Check | Result |
|---|---|
| Every fact traces to the dossier | pass — same content as mockup 1 |
| Booking targets match the dossier character for character | pass — Booking.com, Agoda, `tel:+94764832988` |
| Works with JavaScript off | pass, and verified: the hero shows `img-002`; every `Book` / `Check dates` / `Check this room` trigger is an `<a href="#book">` that lands on the footer booking block, which holds both listings and the phone number — the drawer is the enhancement, the link is the floor; the rail is a native scroller. Measured in Chromium with JavaScript disabled: 11 triggers, all anchors, 4 booking links in the footer block. |
| WebGL missing or context lost | pass — `startPool` returns `null`, the canvas stays at `opacity: 0`, the photograph shows |
| `prefers-reduced-motion` | pass — the shader never starts, parallax is skipped, the drawer has no transition, `scroll-behavior` is `auto` |
| Keyboard | pass — Esc closes the drawer and focus returns to the button that opened it, verified in Chromium at 390 px and 1440 px |
| Mobile 390 px / desktop 1440 px | pass — `shots/mobile-*.png`, `shots/desktop-*.png`; no overflow, no overlap; the fixed header takes a solid floor once the pool is behind it |
| Tap targets ≥ 44 px | pass |
| Broken images | 0 |
| Self-hosted, no third party | pass — 0 external requests; fonts vendored; the shader is hand-written, not a library |

**Weight** (`weight.json`): html + inlined css 22 KB · JS 6 KB · fonts 110 KB (Fraunces + Inter
Tight) · images 1650 KB across all widths of all 12 photographs.

First mobile load is the HTML, two fonts and the 400 px hero — about **165 KB**, against the
playbook §4 budget of 1.5 MB and 300 KB of JS. The two extra pool textures load after first paint,
only if WebGL started.

**Lighthouse was not run** — there is no Lighthouse runner in `tools/`. The figures above are
measured file sizes. Base.md "Before handing off" item 3 is not satisfied.

## a note on the screenshots

`shots/*-1.png` … `-6.png` are viewport stops and are the honest record. `shots/desktop.png` and
`shots/mobile.png` are full-page captures, and a full-page capture of a page with a three-screen
pinned hero shows that hero once and leaves the rest of its scroll height blank — an artefact of
how the capture works, not a hole in the layout.
