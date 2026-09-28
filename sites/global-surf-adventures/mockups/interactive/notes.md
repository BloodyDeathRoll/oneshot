# Global Surf Lodge Kabalana — interactive · "The sign" — station 4e notes

Designer 0.3.4, run `2026-09-globalsurf-01`, 2026-09-28. Concept 2 of `sites/global-surf-adventures/concepts.md`.
One file: `dist/index.html` (+ `dist/img/`). Contact sheets per round in `shots/round-N/`.

## look-log

**Round 1 — first screen only** (`shots/round-1/`).
Wrong as design: at 1440 the numerals sit in a column far too wide, so a 180 px hole opens between each red figure and its level, and the rows read as three loose objects instead of lines on a fare table; the disc's upper half is a square crop of `img-025` that shows mostly white ceiling and sky, so the sign reads as a red button with a black label, not the road sign, and the dashed "chains" hang from nothing. On the phone the tagline wraps to three ragged lines beside the disc and the blue plates are wide and loud enough to compete with the numerals, which the concept says must stay the loudest thing. Change: fixed narrow numeral column, a 2:1 crop of `img-025` with the pool's waterline sitting on the red, a sign arm (a 1 px bar) for the chains to hang from, smaller plates, tagline full-width under the name on the phone, and put the WhatsApp/phone secondary under the disc on desktop so the right column is not empty below it. A stranger would guess generated: yes — it looks like a pricing-table component with a sticker next to it.

**Round 2 — first screen** (`shots/round-2/`).
Wrong as design: the disc now reads as the sign — the pool's waterline sits on the red and the chains hang from an arm — but on the phone the tagline runs *under* the disc ("Sri Lanka's" is hidden), and at 1440 the WhatsApp block is pinned to the bottom of the right column, leaving a 130 px hole between it and the disc, so the right side reads as two unrelated objects. The numeral column is still too wide (a 90 px gap before "Level"). Change: wrap the name and tagline around the disc with a float so no word can go under it, narrow the numeral column to the figure's width, hang the WhatsApp block directly under the disc; phone number printed as the business prints it. A stranger would guess generated: less — the sign is the business's own object now — but the phone header still looks unfinished.

**Round 3 — first screen + the swing script** (`shots/round-3/`).
Wrong as design: the phone float was not contained, so it squeezed the table head to two-thirds width ("Every Saturday, 7 nights · per person" crammed left) — a broken ruled line on a page built of ruled lines; at 1440 "Questions first?" now touches the disc's rim. The rows themselves are right: figure, level, fare and plate line up on one baseline and the eye runs along them. Change: contain the float (`display:flow-root`), drop the side block 30 px, make the phone plates a little smaller so the red numerals stay the loudest thing. A stranger would guess generated: a timetable with a hanging sign is a specific idea; the risk now is only in finish.

**Round 4 — first screen, plus a hover capture** (`shots/round-4/`, `hover-row2-mid-swing.png`, `hover-row2-rest.png`).
Wrong as design: the swing and relabel work (pointer on row 2: the disc tips about 2° and the plate reads "Level 2", the 2 px rule draws under the row), but on the phone the contained float now leaves a 60 px empty band above the table head, because the float is taller than the name and tagline. Change: shorten the float to the disc's own height; then build below. A stranger would guess generated: the first screen now holds one idea (the sign answering the row you are on) with the prices louder than it — keep it.

**Round 5 — whole page** (`shots/round-5/`).
Wrong as design: the pinned "day" run slides its photographs *behind and to the left of* the copy column, so half-cut frames show in the left margin beside the words — the one sideways moment looks like a layout bug; and the level bar at 1440 is a 520 px strip docked bottom-right that sits over the right-hand text column of every section (rooms table, amenities, the Rosa box). Everything else reads as one page: ruled lines throughout, red only in figures and the closing disc, blue only on booking plates. Change: clip the run in its own window that starts at the copy column's rule; at ≥ 1280 px turn the level bar into an 88 px rail on the right edge, in the page margin, beside no text (768–1279 keeps the bottom strip); end the run 120 px short of the rail. A stranger would guess generated: the day run did; the rest does not.

**Round 6 — whole page** (`shots/round-6/`, static states in `shots/round-6/states/`).
Fixed: the run now travels only inside its window, past a hairline that marks the copy column; the rail sits in the right margin and never covers text at 1440; hidden while any fare row or the closing plates are on screen. Still wrong, and left: the waves section leaves the right third empty beside `img-015` at 1440 (I kept the photograph at 3:2 in cols 1–8 rather than blow it up), and on the phone the 24 amenities make one long ruled list. Static states looked at: JS off (1440 and 390) — sign reads "Level 1", day photos are a sideways-scrolling row, the three level lists are stacked with their own plates, the level bar is always shown; reduced motion (1440 and 390) — no swing (plate still relabels), the day run is a plain 2 × 2 grid (one column on the phone), no parallax. No WebGL is used, so there is no no-WebGL state. A stranger would guess generated: I don't think so — the page is one specific idea (a fare table with the lodge's own sign answering it) carried in the business's own sign lettering and board colours.

## images

All `license: business-owned` in `dossier/global-surf-adventures/assets/index.json`. Copied resized to `dist/img/` (WebP, JPEG fallback except the disc).

| Used as | Asset | Source size | Licence note |
|---|---|---|---|
| upper half of the sign (first screen) and nothing else | `img-025` (2:1 crop, 720 × 360) | 2000 × 1333 | globalsurf.com, Kabalana lodge pages |
| day run | `img-002`, `img-031`, `img-029`, `img-027` (3:2, 640/960) | 2000 wide | globalsurf.com |
| lodge masonry (native ratios) | `img-025`, `img-109`, `img-026`, `img-024`, `img-116`, `img-033`, `img-133`, `img-138` | 675–2000 wide; none drawn wider than its source | globalsurf.com / Booking.com property uploads |
| waves section | `img-015` (3:2) | 2000 × 1333 | globalsurf.com |
| getting here | `img-119` at ≤ 780 CSS px | 1280 × 719 | Booking.com property upload |

Excluded, as the concept and dossier require: the 11 surf frames flagged not identifiable as the lodge's wave (`img-012`, `-013`, `-017`–`-019`, `-053`, `-075`, `-102`, `-105`, `-106`, `-111`), `img-020`–`023` (not this pool), `img-047`–`052`, `img-042`–`045`, `img-014`, web crops `img-058`–`092`. No photograph sits next to a spot name or a level. `img-108` (the sign itself) is not shown: the concept draws the sign rather than showing its photograph. No stock; no captions.

## gaps

- **No Sri Lankan number on the business's own site** — WhatsApp (+972523593240, prefilled) and phone (+972 9-973-3943, the Facebook display of `contact.phone`) are shown, secondary to the engine, as the audit says.
- **Room supplement** is live and date-dependent: stated in words (the offer copy), no figure.
- **No team, no names** (`gaps[]` staff): no people section.
- **Level photographs:** none paired with a level.
- **Opening hours:** none in the dossier; the page shows check-in/out only.
- **Rosa forecast data is the 2026-09-21 fixture** — see conflicts.

## conflicts

1. **Rosa fixture vs "never stale numbers shown as current" (playbook §4).** base.md tells 4e to inline the fixture; the fixture is 7 days old today. I print its own time ("Monday 21 September, 20:30", "Rosa, updated 21 September 2026, 19:55") so nothing reads as now. 4g fetches live and falls back to the link after 24 h. Alternative: link only at 4e, which would hide what the headline half looks like.
2. **"JS loaded after first interaction" (concept) vs one self-contained file.** The ≈ 6 KB of inline JS runs on load; nothing it does blocks the first screen or fetches anything. 4g can defer it.
3. **The disc's photo on a phone.** The concept budgets a 240 px image; an SVG `<image>` has no `srcset`, so the phone also gets the 720 × 360 WebP (19.5 KB instead of ≈ 4 KB). 4g can swap by media query.
4. **Level bar on desktop.** The concept makes it persistent on a phone; I also show it on desktop (bottom strip at 768–1279 px, right-edge rail at ≥ 1280 px) so booking stays one tap away on every screen. Remove if the human wants desktop clean.
5. **Structure additions.** Concept 2 does not place the intro block, the amenities or the credential; all three variants must carry the same facts, so the intro is a short section after the fare table, amenities sit at the end of "The lodge", and "ISA-certified surf guides" sits with the offer copy.

## different from the other businesses and from gold

Opened `ka-surf-hostel-and-restaurant/mockups/unique/shots/round-9`, `layday-surf-ahangama/mockups/{interactive,unique}/shots` and `agents/designer/gold/`. KA opens on a green cut-leaf canopy with one big headline; Layday on a yellow berth box you are inside; Lavish on a pool of live water. This page opens on three red figures in ruled rows with a price at the end of each, and the lodge's round road sign hanging beside them — no green, no yellow, no water, no headline sentence, and the first thing you can do is book a specific level. Typeface (Barlow / Barlow Condensed), palette (soft-top red + blue on `#F4F5FB`), first-screen device (fare table + hanging disc) and section order (fares → day run → includes → lodge → guests → waves → getting here → closing disc) are not used by any gold page.

## checks (4e)

- `node tools/check-design.mjs sites/global-surf-adventures/mockups/interactive/dist/index.html`: ok, 0 problems, 0 default-look warnings (fonts Barlow Condensed / Barlow; ground hsl(231 47% 97%); 0 all-caps labels).
- `node tools/check-places.mjs global-surf-adventures`: 0 borrowed images, 0 failing.
- `node tools/funnel.mjs dist/index.html --depth 1`: clicks_to_book **1**, primary **engine**, CTA above the fold **true**, 0 broken (target in `audit.json.recommended`: engine, 1).
- Booking URLs copied from `copy/en.json` `bookingLinks[]` (which carry the dossier's engine products): `…/product/level-1-fomies`, `…/level-2-rollers`, `…/level-3-riders`, no parameters added; WhatsApp link identical to `bookingLinks[3]`.
- Keyboard: tabs move with ←/→ (focus and panel follow); focusing a fare row relabels the sign ("Level 3").
- First load, no scroll, headless Chromium, local server: **390 × 844: 508 KB** (401 KB own files + 107 KB Google Fonts); **1440 × 900: 422 KB**. Largest above-the-fold image: the disc, 19.5 KB. HTML 42 KB (12.6 KB gzipped), inline JS 6.1 KB, CSS 14 KB. Third-party on load: Google Fonts only (allowed at 4e; self-hosted at 4g); Rosa's iframe is not requested on load (and not at all from `file://`).
