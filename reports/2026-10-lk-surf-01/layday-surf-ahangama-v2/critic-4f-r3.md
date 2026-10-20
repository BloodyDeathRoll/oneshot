# Layday Surf Ahangama v2: critic pre-score, round 3, calm only (station 4f, quick)

Run `2026-10-lk-surf-01` · critic 0.4.3 · rubric 0.3.1 · measured 2026-10-20 · calm after the
designer's round 3 (`calm/notes.md` § "Round 3"; build `dist/index.html` 15:05). Interactive and
unique were not changed and are not re-scored here (see `critic-4f-r2.md`).

This scorecard covers dimensions 1–7 only (max 80). Dimension 8 belongs to the two visual critics.

The gate at this stage: no hard fail, dimensions 1, 3 and 7 each ≥ 6, and scroll CLS under 0.01.

## Method

Same as rounds 1 and 2, all over http, in my own scratch subfolder.

1. **`tools/audit-mockup.mjs`**, twice, each run started only once port 8980 was free. Both runs are
   fresh (`measured_at` 15:08:41Z and 15:09:13Z) and match.
   - Evidence: `evidence/r3-calm.audit.json`.
   - No tracked file and no designer `audit.json` was written.
2. **`tools/shoot.mjs`** on my own server at 1440 and 390. Frames were read, then deleted.
   - 0 console errors, nothing truncated.
   - Page heights: 8010 px at 1440, 9280 px at 390.
3. **`check-design --no-shots`** and **`check-places`**.
4. **Playwright walk.**
   - At 390: first-screen actions, then overflow, then a foot-bar tap, a date and +1 night, then
     Esc and focus return, and every Booking.com href read back.
   - At 1440, keyboard only: Enter on "Check dates", then 30 Tabs inside the sheet, then Esc.
   - A full scroll recording third-party requests.
   - Reduced motion: count of running animations.
5. **axe-core 4.14** at 390 and 1440.
6. **Page text** diffed against `copy/en.json`, and every claim traced to the dossier.

## Result

| variant | r1 (1–7, /80) | r2 (1–7, /80) | r3 (1–7, /80) | hard fails (r3) |
|---|---|---|---|---|
| calm | 71.5 | 76.5 | **76.5** | none |

```
mode: quick   round: 3   variant: calm
total (1–7): 76.5 / 80   result: pass on 1–7 (dimension 8 pending)   hard_fails: []
```

Hard-fail list, all checked and empty:
- No fact contradicts the dossier, and every claim has a dossier entry.
- Every booking href is identical to the dossier character for character.
- 0 borrowed images.
- 0 third-party requests on load, and 0 after a full scroll (no embeds).
- No keyboard trap.
- All content is DOM text.
- No budget line over.
- No secrets.

### Playbook §4 budget (390 phone, throttled, no scroll; two identical runs)

| line | target | r2 | r3 |
|---|---|---|---|
| first-load transfer | ≤ 1536 KB | 600 KB (19 req) | 714 KB (21 req) |
| JS external | ≤ 300 KB | 0 (inline) | 0 (inline) |
| largest image | ≤ 300 KB | 72 KB | 72 KB |
| fonts | ≤ 2 fam, ≤ 150 KB | 82 KB | 82 KB (Pilcrow Rounded + Caveat, self-hosted, now `swap` + preload) |
| LCP | ≤ 2500 ms | 1368 | 1364–1368 |
| CLS (load) | < 0.1 | 0 | 0 |
| scroll CLS early / settled | < 0.01 | 0 / 0 | **0 / 0** |
| third-party on load | 0 | 0 | 0 |
| tap targets < 44 px | — | 0 / 38 | 0 / 38 |

The switch to `font-display: swap` (from round 2's `optional`) caused no shift. Scroll CLS is
still 0 in both passes.

| # | dimension | score | evidence |
|---|---|---|---|
| 1 | facts | 10 | 34 lines are not verbatim in the copy. All are labels or splits of traced facts: <br>• ratings 10/10 (10), 10/10 (6), 5.0/5 (15), "Each read 25 September 2026" = `reviews.*` refreshed 2026-09-25 <br>• Google address and plus code = `location.*` <br>• 14:00–19:00 / by 14:00 = `stayInfo` <br>• reviewer names, countries and dates = `reviews.quotes` <br>• Taiya's first sentence verbatim <br>• amenities list = copy <br>`audit.facts` unmatched: 25, 5.0, 2026. 0 mismatches. |
| 2 | mobile + perf | 10 | Every line inside budget (worst: transfer at 46 %). Scroll CLS 0 / 0. Horizontal overflow at 390: 0. First screen at 390: h1 (72–147 px), tagline, rating, "Check dates" and "Call" at 301 px, the berth photograph, foot bar at 782 px. |
| 3 | booking CTA | 9 | Foot-bar tap opens `dialog#sheet` (`showModal`) with the date input focused. 2026-11-10 plus one more night gives "Leaving Saturday 14 November", and the section pill reads "10 Nov – 14 Nov, 4 nights". **One date chooser now:** both "Check dates on Booking.com" buttons carry `?checkin=2026-11-10&checkout=2026-11-14&group_adults=1&no_rooms=1&group_children=0` on the exact dossier URL. The plain Booking.com links that remain are the review-source citations (`a.src`) and the footer listing button. Hostelworld, Agoda and `tel:+94778553343` match the dossier. Esc closes, focus returns to "Check dates". JS off: 5 links in `#book`. −1: hero to engine is still 2 taps plus a date, and there is no `dossier/…/audit.json` funnel target. |
| 4 | brand fit | 8 | §3 order: the room (now a crossfading 4:3 stage), just one dorm, newly built, finding the door, **the wave before Guests**, Guests, Practicalities, booking on plaster yellow, footer. Matches custom.md: a text face plus the Caveat script for section titles; teak booking colour with white text; slideshows with dots; booking inside the site with one chooser. −2: the first screen is still a statement beside two photographs, not full-bleed. The designer's stated reason: no business photograph ≥ 1200 px exists, which the dossier's `gaps` ("22 property photos at 576–1024 px") supports. |
| 5 | copy | 9 | copy/en.json words plus interface labels ("Choose your dates", "Arrival and nights", the stage labels). English complete. |
| 6 | accessibility | 10 | axe 0 at 390 and 1440. 42 images, 0 missing alt (23 decorative). Skip link present. 3 px solid focus outline. Modal sheet: focus stayed inside for 30 Tabs, Esc returns it to the trigger. 0 tap targets under 44 px. Reduced motion: 0 running animations, the stage stays still, a photograph is visible. |
| 7 | security + delivery | 10 | 0 third-party requests, on load and after a full scroll. No embeds. Fonts self-hosted. Static, inline JS, relative URLs, lowercase filenames, no secrets. |

**For the human:** the same 76.5/80 as round 2. Round 3 changed design, not facts, speed or
booking. The measured gains are one date chooser instead of two, and every booking button now
carries the dates. Scroll CLS stays 0, after the switch to `font-display: swap`.

## Default-look facts (`check-design`)

h1 Pilcrow Rounded · h2 Caveat · body Pilcrow Rounded · ground `#FFFFFF` · 0 all-caps labels ·
0/10 labelled headings · 0 problems, 0 warnings.

## Remaining fixes (none gating)

1. The first screen is not full-bleed (custom.md). The material does not allow it (all photographs
   ≤ 1024 px). This is for the pick, and a pitch point (photography).
2. Hero to engine is still 2 taps plus a date. There is no `dossier/layday-surf-ahangama-v2/audit.json`
   to measure it against: the auditor (3b) never ran for the fork.

## What the designer prompt got wrong

Nothing new this round on dimensions 1–7. The open item is a pipeline gap, not a prompt fault: the
v2 fork has no auditor `audit.json`, so dimension 3 has no `recommended` target to test against.

## Housekeeping

- No commit, no ledger line, no edits to mockups, custom.md or tools.
- Scratch screenshots deleted. The shared `shots/` were not touched.
- `git status` still shows `tools/check-places.mjs` and `tools/media.mjs` modified. Those changes
  are not from my runs, so I left them alone.
