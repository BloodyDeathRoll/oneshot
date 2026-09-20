# Layday Surf Ahangama — concepts

Station 4d, creative-director 0.1.0, 2026-09-20. Written after
`agents/designer/references.md` was read in full and all 22 photographs were looked at.

## 1. What this business actually is

One dormitory. Not a hostel with a dorm — a hostel that *is* a dorm: one air-conditioned room,
newly built, run by the family who built it and still clean it daily. It is a two-minute walk from
Kabalana. Guests keep landing on the same two words, clean and quiet, and one wrote that as a solo
female traveller she felt totally safe. It scores 9.8 on Hostelworld across 10, 10/10 on Booking.com
across 6, 5.0 on Google across 15 — small samples, and the dossier says explicitly never to average
them.

And: **guests cannot find it.** The dossier records this as a gap with a fix — an unmarked black
gate, an owner who has promised a sign, and the note that *"a map and directions on a site would fix
it today."*

## 2. What the material can and cannot carry

**Photographs — 22, all business-owned, from Booking.com, Hostelworld and Agoda.**
Largest usable width: **1024 px** (`img-009`, `img-012`, `img-011` and the beach frames). Above the
1200 px floor only at 1024, so full-bleed at 1440 costs a 1.4× upscale; a card that stops at
1024 px does not.

This is the only business in the run whose photographs already carry a design, and it is a real one:
**ochre plaster walls, black steel bunk frames with their own curtains, cane cabinet fronts, white
linen, terracotta floors, one abstract painting.** Somebody made decisions here. The site's job is
to not get in their way — no invented palette, no second idea.

- Interiors: `img-002`, `img-005`, `img-008`, `img-009`, `img-011`, `img-012`, `img-014`, `img-018`.
- Fittings, shot like objects: `img-003`, `img-006` (basin and round mirror), `img-013` (cane and
  concrete shelving), `img-015`, `img-017` (the lounge bench).
- Outside: `img-004`, `img-007`, `img-010`, `img-016` — the steps, the path, the walkway.
- Beach: `img-019`–`img-022`.

**Words:** six copy blocks. "Finding the door" is four sentences of directions and is the most
useful text on the whole site.

**Numbers:** three scores with counts. Check in 14:00–19:00, out by 14:00. 19 amenities. No credit
cards. Taxes included.

**Gaps worth designing around:** no rates. **No bed count** — Booking lists a 6-bed dorm, a
Hostelworld guest describes four bunks, so eight; unresolved, so no number may appear. No WhatsApp,
no email, no website, no social account at all.

## 3. The page archetype — **the printed spec card**

One room is one product, and a product has a spec. So the page is a printed card: a bordered object,
ruled into cells, with the name, the one-line spec, the scores, the directions and the booking row
all set as **data on a card** rather than as a magazine. Black steel hairlines rule it, the way the
bunk frames rule the room. Photographs sit inside cells at their own size; nothing bleeds off the
page except at the one moment concept 3 chooses.

That archetype exists because this business has exactly one of everything: one room, one gate, one
family, one wave two minutes away. A brochure would have to pad; a card can simply state.

Nobody else in this run gets it. The Lavish Haven has nine room types and a pool and needs a
magazine. KA has a wall of many small things and needs a board.

## 4. Three concepts

### 1 · calm — **"The card"**

The idea: one bordered card on a field of the wall colour, holding everything a visitor needs.

- **Structure:** a single card, centred on ochre, ruled into cells: name + spec line + three score
  cells → a cell with the one-line "one dormitory" spec and its honest note that the bed count is
  not published → the booking row along the card's foot, **centred**, three platforms and the phone
  → then, below the card, the rest as further ruled cells: finding the door (four numbered steps) →
  the room, with three framed photographs at their own size → what is in it → everything here, as a
  list → newly built → guests' words → the wave with the live forecast → before you arrive →
  footer.
- **First screen:** the card, whole, on ochre. Name, "One air-conditioned dormitory, two minutes
  from Kabalana", the three scores, and the centred booking row — all of it above the fold, no
  scrolling to reach a price-less booking action. One small framed photograph in the card's
  right-hand cell, at 640 px, not bleeding.
- **Type:** Syne display / Inter Tight body. Syne's flat-sided geometry sits with the steel frames.
- **Colour:** ochre field `#E3BC6B`, card in paper `#F7F1E3`, ink `#171410`, one accent — the rust
  of the timber door frames `#B0521F` — on booking only (#6).
- **Motion:** none. **Zero bytes of JavaScript.**
- **Booking:** the card's own footer row — three platform cards plus `tel:`, centred; fixed bar on a
  phone.
- **Photographs:** `img-012` in the card at 640 px; the rest inside cells at 4:3, never bleeding.
- **Fails if:** a card of cells becomes a wall of grey boxes. The grounds have to alternate —
  paper, ochre, ink — and the rules have to be hairlines, not borders.

### 2 · interactive — **"The card, at four o'clock"**

The idea: the same card, with the sun crossing the room inside its largest cell.

- **Structure:** as concept 1, but the card's photograph cell is full-height and pinned for three
  screens while the light moves; the photograph cells below become an even masonry with one gap
  everywhere; booking becomes a drawer pulled from the card's foot.
- **First screen:** the card with its photograph cell showing the dormitory in morning light, the
  spec, the scores, and the booking row. The light is already moving.
- **Type and colour:** as concept 1 — one business, one brand.
- **Motion:** hand-written WebGL: a warm band of light with the shadow of the window louvres in it,
  crossing the plaster from one side to the other as you scroll, low and orange in the morning,
  narrow and white at midday, long and red at the end, breathing slightly. Kube's ±4 rem parallax
  on the masonry, off at ≤767 px (#17). Without WebGL or with reduced motion the photograph stays.
- **Booking:** a drawer from the card's foot, holding all three listings and the phone.
- **Fails if:** the light is so subtle nobody notices, or so strong it looks like a lens flare.

### 3 · unique — **"One room"**

The idea: the card at full bleed — the whole page ruled into cells, the way the bunks rule the room.

- **Structure:** a hairline border around the entire page, then rows of two and three cells, each
  with its own ground (plaster, ochre, ink): the wall → three score cells → where it is → the
  directions across two ochre cells → a sideways run of framed photographs → the room → what is in
  it and everything here → newly built → five quote cells → the wave and the forecast → footer.
- **First screen:** the ochre room at cell height with the garden's shadow moving on it, and
  "ONE / ROOM" set at 9.5 rem in two overlapping lines that lean apart under the pointer.
- **Type and colour:** as concept 1, at display weight.
- **Motion:** hand-written WebGL — layered noise thresholded into leaf shapes with a hard edge and a
  small penumbra, swaying on two frequencies so it never visibly repeats. The garden here is banana
  and palm pressed against the walkway; two photographs are of nothing else. Kinetic type. All off
  under reduced motion.
- **Booking:** right-edge slide-out.
- **Fails if:** the frames make it feel like a form to fill in. The cells have to hold air.

## 5. Divergence table

See the table in `sites/the-lavish-haven/concepts.md` §5 — it is maintained across the run. Layday's
three rows are the "printed spec card" rows; no archetype + first-screen combination repeats.

**What a visitor would notice is different.** Against the Lavish Haven: that site is a continuous
magazine that opens on a photograph filling the screen; this is a bordered object you read in
panels, and its first screen is a card, not a picture. Against KA: KA is a dark wall with many small
things pinned to it at angles; Layday is pale ochre, square, and everything on it is aligned.

**If we could photograph one thing on location:** the black gate, open, from the road — the picture
that would stop guests getting lost.
