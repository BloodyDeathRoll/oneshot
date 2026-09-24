# The Lavish Haven — concepts

Station 4d, creative-director 0.1.0, 2026-09-20. Written after
`agents/designer/references.md` was read in full and all 79 photographs were looked at.

## 1. What this business actually is

A hotel that opened recently enough that one guest wrote he was the first customer, two minutes'
walk back from Kabalana and deliberately set off the main road. Nine room types for what is not a
large building, a restaurant, a spa, and — the thing everything else is arranged around — an
outdoor pool in the middle of the site with rooms on both sides of it. The copy says it plainly:
*"The pool is in the middle of the hotel, and most evenings that is where people end up."* It has no
website, no published rates, and no WhatsApp; it sells entirely through Booking.com and Agoda.

## 2. What the material can and cannot carry

**Photographs — 79, all business-owned, from the hotel's own Booking.com listing.**
Largest usable width: **1024 px** (`img-002`, `img-001`, `img-078`, `img-079`). That clears the
1200 px full-bleed floor only just, and not at 1440 px desktop without a 1.4× upscale, so full-bleed
use is limited to the two night-pool frames, which are dark and forgiving, and never at 1600 px.

- Genuinely good: `img-001` and `img-002`, the pool lit from within after dark with the two storeys
  of rooms glowing on both sides. These are the only photographs here anyone would stop on.
- Useful: `img-078`, `img-079` (the pool from above in daylight); `img-065`–`img-077`, balconies
  looking down through palms to the water.
- Weak: roughly forty near-identical wide-angle phone shots of beds that differ mainly in the wall
  behind them, and about twenty bathrooms. Shown in a grid these are what makes a hotel site look
  generated.
- **Nothing maps a photograph to a room type.** Captioning one "Deluxe Family Suite" would be an
  invented fact.
- Every asset's description in `assets/index.json` is the string "Booking.com listing photo", so alt
  text has to be written by looking.

**Words:** six copy blocks. The intro and the staff block are the strong ones. `copy.spot` is one
sentence about Kabalana.

**Numbers:** 9.2/10 Booking.com across 34, 5.0/5 Google across 21, cleanliness 9.7, comfort 9.7,
staff 9.4. Nine room types with beds and occupancy. 25 amenities. Koggala Airport ~5 km.

**Gaps worth designing around:** no rates at all — so the page must make "rates move with the dates"
a design element rather than an apology. No check-in times. No WhatsApp, no email, no socials.

## 3. The page archetype — **the courtyard**

This hotel is a courtyard: water in the middle, rooms on both sides, and the evening happens at the
water. So every concept organises the page around a single body of water — it is the first thing,
the thing you keep passing, or the thing the page is literally built on top of. Nothing else here
earns the centre; the rooms photograph identically and there are no prices to lead with.

No other business in this run has a pool, or a centre.

## 4. Three concepts

### 1 · calm — **"Off the main road"**

The idea: a quiet hotel page whose one loud moment is the pool at dusk.

- **Structure:** full-bleed night pool → docked booking strip (three real channels, centred) →
  where it is, with a lead set large → one even eight-frame gallery → band → the nine room types as
  a **typeset table**, because they photograph identically and the differentiator is text → band →
  amenities in three columns → band → recently opened → band → five verbatim quotes → band → the
  wave, with the live Kabalana forecast → practicalities → footer.
- **First screen:** `img-002` full-bleed, the tagline set in Instrument Serif bottom-left, both
  platform scores, and the booking strip immediately under the fold line, with a fixed booking bar
  on a phone.
- **Type:** Instrument Serif display / Inter body. Two families, one job each (references.md #23).
- **Colour:** cream `#F4F0E8`, ink `#23201C`, one accent — petrol `#0F3B45` — on booking only (#6).
- **Motion:** none except five `background-attachment: fixed` bands. **Zero bytes of JavaScript.**
  Reduced motion and phones get plain cover images.
- **Booking:** Morgan's Rock's docked bar (#4) with the two OTA listings and `tel:`; no engine of
  ours, because playbook §5 forbids inventing a channel the owner does not monitor.
- **Photographs:** `img-002` bleed; eight at 4:3 in the gallery; five as bands.
- **Fails if:** it reads as a competent hotel template. It is the conformist one, so the only thing
  keeping it alive is the type and the restraint.

### 2 · interactive — **"Afternoon to after dark"**

The idea: the pool, pinned for three screens, walking from daylight to night while you scroll.

- **Structure:** pinned pool (3 × 100svh) → where it is → nine room types as a snapping rail with a
  peeking next card → band → an even masonry of the place → band → amenities → recently opened →
  band → quotes → the wave + forecast → footer, with the booking drawer over the top.
- **First screen:** the canvas, the tagline, both scores, and an amber-to-teal Book button in a
  fixed header; on a phone a full-width booking bar on the waterline of the hero.
- **Type:** Fraunces display / Inter Tight body.
- **Colour:** cream ground, pool teal `#0E5F6B` for booking only. (The first version was dark; a
  dark theme is the wrong register for a surf business.)
- **Motion:** a hand-written WebGL water surface — refraction, caustics masked to the lit water,
  ripples under the pointer — cross-fading three of the hotel's own photographs. Plus Kube's ±4 rem
  parallax, off at ≤767 px (#17). Without WebGL or with reduced motion, the photograph stays.
- **Booking:** Tandjung Sari's slide-down panel (#1), holding the two listings and the phone.
- **Fails if:** the water reads as a gimmick over a hotel page. It has to be the *subject*.

### 3 · unique — **"The courtyard"**

The idea: the water is fixed at the foot of every screen for the whole page, and the heading of the
section you are reading is projected on it.

- **Structure:** a fixed band of pool across the bottom of the viewport; the page is its own scroll
  area above the waterline so no text is ever read through water. Type-only hero on plaster → swell
  divider → where it is → nine doors (a typographic index; pick a room, read its spec) → band →
  a sideways run of photographs → amenities → recently opened → band → quotes → the wave + forecast
  → footer.
- **First screen:** no photograph — "THE / LAVISH / HAVEN" in Bricolage Grotesque on plaster, the
  claim, the two ratings at display size, a teal Check dates button, and the water already running
  along the bottom with the hotel's name projected on it.
- **Type:** Bricolage Grotesque display / Inter Tight body.
- **Colour:** plaster `#E7E1D3`, ink, pool cyan `#0D7D8C` for booking only.
- **Motion:** WebGL water with the current heading drawn into a 2D canvas and projected upright on
  the surface; kinetic type leaning with the pointer. All of it off under reduced motion.
- **Booking:** a right-edge slide-out that carries across which room you were looking at.
- **Fails if:** the fixed band eats too much screen on a phone, or the projected type stops being
  readable. Both are measured, not assumed.

## 5. Divergence table

| Business | Variant | Archetype | First-screen device | Grid | Ground | Motion idiom | Booking pattern |
|---|---|---|---|---|---|---|---|
| Lavish Haven | calm | the courtyard | full-bleed night pool | 12-col editorial | cream | CSS fixed bands | docked strip |
| Lavish Haven | interactive | the courtyard | pinned water canvas | 12-col editorial | cream | water | slide-down drawer |
| Lavish Haven | unique | the courtyard | type on plaster over a fixed waterline | 12-col editorial | plaster | water + projected type | right slide-out |
| KA Surf Hostel | calm | the kitchen noticeboard | a chalked board head, no photograph | pinned cards on a wall | dark clay | none | pinned booking cards |
| KA Surf Hostel | interactive | the kitchen noticeboard | today's card, with the day turning | pinned cards | dark clay | heat shimmer | card that flips open |
| KA Surf Hostel | unique | the kitchen noticeboard | the whole wall at once | pinned cards | dark clay | film grain | pinned card + slide-out |
| Layday Surf | calm | the printed spec card | one bordered card on a colour field | ruled frames | ochre | none | the card's own footer row |
| Layday Surf | interactive | the printed spec card | the card, with light crossing it | ruled frames | ochre | sun across plaster | drawer from the card |
| Layday Surf | unique | the printed spec card | the card at full bleed, ruled into cells | ruled frames | ochre | leaf shadow | right slide-out |

No archetype + first-screen combination repeats.

**What a visitor would notice is different.** Against KA: this site has photographs big enough to
fill a screen and uses them; KA never shows a photograph larger than a postcard. Against Layday:
this site scrolls as a continuous magazine, Layday is a single object you read in panels.
