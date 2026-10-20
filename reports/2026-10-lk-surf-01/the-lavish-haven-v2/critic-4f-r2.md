# critic 4f (quick) round 2 — the-lavish-haven-v2 · run 2026-10-lk-surf-01 · 2026-10-20

critic 0.4.3 · rubric 0.3.1 · dimensions 1–7 only (max 80); dimension 8 is the visual critics'. Same method as
`critic-4f.md` (round 1), applied to the designer's round-2 pages (notes.md rounds 6–7; `dist/index.html` last written
14:46–14:55 IDT, all measurements below taken after that).

## Method

- `tools/audit-mockup.mjs the-lavish-haven-v2 <variant>` ×3 (fresh: measured 15:06–15:07 UTC; port 8980 was free on the
  first try). Copies in `evidence-r2/audit-*.json`. The mockups' own `audit.json` files were put back as the designer
  left them afterwards.
- `tools/check-design.mjs <page> --no-shots` → `evidence-r2/check-design-*.txt`.
- `tools/shoot.mjs` over http (plain static server, one port per page), default options, 1440 + 390; frames deleted after
  scoring and described below.
- Playwright (`evidence-r2/probe.json`, `probe2.json`): JS-off booking links, first-screen CTA tap at 390 with external
  requests intercepted, booking links in view at 30/60/90 % scroll, Rosa requests before/after scrolling to it, axe-core
  4.14 (WCAG 2.0/2.1 A+AA) at 1440, 80-press keyboard pass, rating on first screen at 390 and 1440, interactive chips +
  dates form, unique tag flip / Esc / dates submit at 390 and 1440, amenity toggle with JS on/off, text-size census.
- Facts: `evidence-r2/text-*.txt` (rendered `innerText`) against `dossier/the-lavish-haven-v2/dossier.json`.

## Budget table (phone, no scroll)

| page | first load | JS ext. | fonts | largest img | LCP | CLS | scroll CLS early / settled | 3rd-party on load |
|---|---|---|---|---|---|---|---|---|
| budget | ≤ 1.5 MB | ≤ 300 KB | ≤ 150 KB | ≤ 300 KB | ≤ 2.5 s | < 0.1 | < 0.01 | 0 |
| calm r2 | 470 KB | 0 | 87 KB | 84 KB | 2192 ms | 0.0015 | 0 / 0 | 0 |
| interactive r2 | 457 KB | 0 | 61 KB | 100 KB | 2320 ms | 0.0172 | 0 / 0 | 0 |
| unique r2 | 517 KB | 0 | 90 KB | 182 KB | 1856 ms | 0.0005 | 0.0049 (`div#bar`) / 0 | 0 |

All lines met. No horizontal overflow at 390 (JS on and off). 0 words under 14 px at 390 or 1440 on all three.

## Round-1 findings, re-checked

| round-1 finding | r2 |
|---|---|
| calm + interactive forecast "Sun 21 Sep" for a Monday | fixed: "Kabalana, Mon 21 Sep, 20:30" on both (fixture `current.t` 2026-09-21T20:30+05:30) |
| category line left out value for money 9.1 | fixed on all three: "Cleanliness 9.7 · Comfort 9.7 · Location 9.6 · Facilities 9.5 · Staff 9.4 · Value for money 9.1", read 19 September 2026 |
| calm + unique rating not on the first screen | fixed: "9.3 / 10 on Booking.com, 34 reviews · 5.0 / 5 on Google, 21 reviews · Both read 25 September 2026" in the first viewport at 390 and 1440 on all three |
| interactive Rosa iframe without visible focus | fixed: `:focus-within` gives `.rosa-w` a 2 px solid outline |
| calm Rosa iframe without visible focus | **still open**: iframe, `.rosa-w` and the section all have `outline: none`, no shadow |
| unique Esc on the flipped tag not tested | tested: Esc turns it back, `#tag-back` inert + `aria-hidden` again, focus back on "Choose dates first" (390 and 1440) |

## Facts (all three; new content included)

Every claim matches the dossier, as in round 1 (rooms 12/12 with beds and sleeps; ratings and dates; quotes verbatim;
stay rules; amenities; address; phone; booking URLs; spot). New in r2, checked: "After dark" section (featureLine only);
calm and interactive amenities show eight on phones with an "All 25 at the hotel" toggle — the list has 25 rows
(= `facilities`/copy amenities), with JS off all 25 are visible and the toggle is hidden; unique room groups "Pool view, or
pool and garden" 5 / "Garden view" 3 / "No view in the name" 4 = the names in `room_types`; interactive chips (tapped):
Pool 5, Garden 6, Pool & garden 3, Own kitchen 3, Sleeps 4+ 5, list opens on Pool. Rosa headline values match the fixture.
No mismatch, no unsourced claim.

---

## calm r2

```
mode: quick   round: 2   variant: calm
total: 76.2 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | Facts section: all match, weekday and category line fixed. |
| 2 | mobile + perf | 9 | Budget table met; LCP 2192 ms is 308 ms under its line. 390 frames: pool print full width with the blind square on its corner, script name, button, ratings + date; "After dark" night pool full width on frame 2; rooms list grouped; bar on every frame after the first. |
| 3 | booking CTA | 10 | First-screen "Check dates on Booking.com" tapped at 390 → `https://www.booking.com/hotel/lk/the-lavish-haven.html` (= `booking.engine_url`, 1 tap, class engine). JS off: 15 visible booking links (Booking, Agoda, tel). 3–4 booking links in view at each scroll stop. |
| 4 | brand fit | 9 | §3 order present; what + where, trust and the action on the first screen (auditor `above_fold`). |
| 5 | copy | 9 | Passed copy unchanged; interface words only ("After dark", "All 25 at the hotel", group names). |
| 6 | accessibility | 9 | axe 0 violations; 0 tap targets under 44 px; keyboard 22 stops, wraps; −1 the Rosa iframe takes focus with no visible indicator. |
| 7 | security + delivery | 10 | 0 third-party requests on load; the Rosa frame is requested only after scrolling to it (`loading=lazy`, 500 px reserved); JS off shows "See today's forecast for Kabalana on Rosa"; fonts self-hosted, relative URLs. |

check-design: ok (0 / 0). Pinyon Script headings, Work Sans body, ground `rgb(244,245,248)`, 0 all-caps labels.

## interactive r2

```
mode: quick   round: 2   variant: interactive
total: 77.0 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | All match; chooser counts re-verified by tapping. |
| 2 | mobile + perf | 9 | Budget met, but LCP 2320 ms is the closest of the three to 2.5 s, and the load CLS is 0.0172 (scroll CLS 0 / 0). 390: balcony-over-pool photo, name, button, both ratings; chips wrap on two lines (no clipped row); filtered rows start under them. |
| 3 | booking CTA | 10 | First-screen button → engine URL, 1 tap. Dates panel submitted → `…the-lavish-haven.html?checkin=2026-11-12&checkout=2026-11-15&group_adults=2&no_rooms=1&group_children=0`. JS off: 16 booking links. |
| 4 | brand fit | 9 | Trust + action on the first screen; rooms filterable one screen down. |
| 5 | copy | 9 | Passed copy; interface labels only. |
| 6 | accessibility | 10 | axe 0; 0 small tap targets; keyboard 25 stops, wraps; Rosa frame focus shown on its wrapper; chips use `aria-pressed`, count in an `aria-live` region. |
| 7 | security + delivery | 10 | As calm. |

check-design: ok. Bodoni Moda headings, Hanken Grotesk body, aqua ground `rgb(227,240,241)`, 0 all-caps labels.

## unique r2

```
mode: quick   round: 2   variant: unique
total: 77.0 / 80   result: pass (critic gates)   hard_fails: []
```

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | All match, including the facts row (2 min · check in until 00:00 · check out any hour · 9.3 / 10, 34 reviews) and the room groups. |
| 2 | mobile + perf | 9 | Budget met; early scroll CLS 0.0049 from the phone bar arriving (under 0.01); the largest image grew 69 → 182 KB, first load 199 → 517 KB (both under). 390: night pool full width, door-hanger tag under it with name, ratings and both buttons; room tags in one swipeable row. |
| 3 | booking CTA | 10 | Tag front button → engine URL, 1 tap. Back of tag submitted at 390 → the same dated Booking.com URL. JS off: 12 booking links. |
| 4 | brand fit | 9 | Trust + action now on the tag front. No forecast (concept's choice, allowed). |
| 5 | copy | 9 | Passed copy; interface words ("Turn back", group names). |
| 6 | accessibility | 10 | axe 0; 0 small tap targets; keyboard 18 stops, every stop with a visible indicator; flip moves focus to the arrival field, Esc returns it to "Choose dates first", back face inert when hidden (both widths). |
| 7 | security + delivery | 10 | 0 third-party requests at any point (no embeds); fonts self-hosted; relative URLs. |

check-design: ok. EB Garamond throughout, ground `rgb(245,246,244)`, 0 all-caps labels.

---

## Result

| variant | r1 (/80) | r2 (/80) | hard fails |
|---|---|---|---|
| calm | 71.7 | 76.2 | none |
| interactive | 72.2 | 77.0 | none |
| unique | 73.7 | 77.0 | none |

Critic gates (no hard fail; dims 1, 3, 7 ≥ 6): all three pass. Dimension 8 is still the visual critics' call.

The one sentence the human needs: all three book in one tap with the rating on the first screen, are under 0.6 MB with
0 third-party requests, and every fact matches the dossier; interactive and unique also carry dates into Booking.com.

**Remaining fixes** (none blocking; smallest first)

- calm: give the Rosa frame a visible focus ring (interactive's `.rosa-w:focus-within` outline is the pattern) — dim 6.
- interactive: LCP 2320 ms leaves 180 ms of headroom on the throttled phone; the hero view image is the LCP — the first
  budget line a heavier photo would break. Load CLS 0.0172 (under 0.1) is the only non-zero first-load shift of the three.
- unique: first load and largest image roughly tripled since r1 (199 → 517 KB, 69 → 182 KB) — still well within budget,
  but it is now the heaviest of the three.
- all: the forecast headline is the 21 September fixture (allowed at 4e); at 4g it must come from the live JSON with the
  24 h stale rule (playbook §4).

**What the designer prompt got wrong:** nothing new this round; the four round-1 items were all fixed. The one left
(calm's iframe focus) shows the focus-ring rule is applied per page rather than to every embed by default.

## Screenshots (http, deleted after scoring)

- calm 390 (16 frames): pool print full width + blind square, script name, button, ratings with date; frame 2 "After
  dark" night pool full width; frames 3–4 grouped room list; Rosa widget beside the headline on frame 12. 1440 (13): the
  pool print beside the name with the ratings under the button; night pool at large size in "After dark".
- interactive 390 (13): balcony photo first, name, orange button, ratings; "Pick your view" with the photo above wrapped
  chips; 1440 (9): split stage, photo changes per section.
- unique 390 (13): night pool, tag hanging under it with head over the photo's foot; 1440 (10): night pool print beside
  the door-hanger tag; rooms as one screen of small tags in three tone groups.
