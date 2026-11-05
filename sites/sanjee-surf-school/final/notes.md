# Sanjee Surf School, final: "Where you start"

Station 4g, designer 0.7.1, run `2026-10-midigama-01`. A port of `mockups/interactive` (picked by Alon at gate b, ledger `mocked → picked`). Markup, class names, CSS and JS are the mockup's; `src/scripts/swell.js` was byte-identical until the patch below, whose rotation fix leaves the shader and the motion as they were. No CMS, no tenant, nothing seeded in Payload: that is station 8.

## Build

```
npm install                  # first time only
bash scripts/make-media.sh   # originals from dossier/sanjee-surf-school/assets -> src/tenant/media, content.json, public/photos
npm run build                # scripts/photos.mjs, then astro build -> dist/
```

`SITE_URL=https://… npm run build` sets the host of `og:image`. Unset, it uses `https://sanjee-surf-school.os1.workers.dev/`, **an assumption until station 6: no such deployment exists**, and the build prints a warning. `SITE_URL=` (empty) leaves the og:image tags out. Tested: unset and `https://example.test/`.

`scripts/fetch-tenant.mjs` is the reference fetch step, copied unchanged for `npm run build:cms` at station 8. Not run here.

## What changed from the mockup

Asked for by the brief or the rubric:
- Fonts self-hosted in `public/fonts/` (Manrope variable latin 24.8 KB, Courgette latin 25.0 KB, `@fontsource` 5.3.0, OFL files beside them). Hero preload first, then Manrope. Courgette is not preloaded: with it preloaded Manrope ended about 135 ms later and the hero no earlier.
- Fallback faces per weight, with ascent and descent matched to the real fonts, in place of one `size-adjust`.
- `max` on the date field and `okDate()`: a date counts only if it is whole, at or after today, and no later than 31 December of the fifth year from now.
- `og:image` host comes from the build.

Not in the brief, none of it visible at rest:
- `html{scroll-padding-bottom:96px}` at 900 px and under: 13 keyboard stops landed behind the phone bar at 390, now 0.
- `elementtiming="hero"` on the hero `<img>`, so the critics can read the real hero paint (the tool's LCP names the H1).
- The swell runs only on `img-018.webp`. Its horizon and shoreline are measured on that photograph (schema v0.10: never run a set-piece on another photograph's coordinates), so any other hero stays a still. Tested.
- Empty modules render nothing. With no WhatsApp number the booking buttons become the phone and the message panel hides. Tested with an empty document and with a swapped hero.

## Patch after critique (defects only, 2026-11-05)

- Phone message link: `aria-label` removed, a `.vh` "Your message: " before `#bar-text`, so the name holds the visible text. axe's serious `label-content-name-mismatch` is gone.
- Phone bar: now `<aside aria-label="Quick contact">`, still a child of `body`. axe's `region` is gone. The label is written in `index.astro`, not `labels.json`.
- Swell: `size()` returns while `naturalWidth` is 0. On the image's `load` it re-uploads the texture, re-reads the crop and sizes again, so it survives a rotation across the crop switch. Shader values and motion unchanged. Tested in Chromium with software GL in phone emulation: not on a real phone.
- `|` in the lesson details, the rating, the languages, the credentials and the review bylines is now `.sep` (13 on the page). The text is unchanged. `.sep` measures 2.22 to 2.79:1 against its background.
- Separators left as `|` in Manrope: "Bodyboard | per day" in the extras and the fit chips built in `site.js`, neither on the patch's list. Messages, `llms.txt`, `robots.txt` and the JSON-LD are byte-identical.
- Visible change beyond the bars: the two rating pills are 2.6 and 2.8 px wider at 1440. Page height is unchanged at 390 and 1440.

## Port comparison

Both pages over http on my own servers (9400, 9401), the mockup still on Google Fonts. Scratch harnesses, not committed. `tools/shoot.mjs` sheets of both, opened and compared with per-frame pixel differences.

| | Mockup | Final |
|---|---|---|
| Page height 390 / 1440 | 12,985 / 9,508 | 12,985 / 9,508 |
| Elements compared | 582 | 582, 0 style differences |
| Visible text (`innerText`) | | identical at both widths |

Visible differences:
1. **The date field is narrower:** 158 px against 177 at 390 and 171 at 1440, and the "Not sure" chip beside it sits 13 to 19 px further left. Caused by `max`, which stops the year segment at four digits. These 3 elements are the only ones of 582 that moved more than 1 px.

Not visible, on measurement:
- Images are re-encoded with sharp instead of cwebp (the publisher has no cwebp): 36 to 44 dB against the mockup's files, except the Not sure phone crops at 27.5 and 28.5 dB, about half a pixel of resampling phase on palm fronds. In the sheets the only frames with more than 1 % of pixels clearly different are the moving hero water (desktop 00) and the frame holding that tile (mobile 02, not isolated further). Three small tiles are 1 px shorter (`object-fit` covers it).
- Board outlines differ by 0.1 inch in a few path points (JS and Python round a tie differently).

Sheets were shot before the last two template edits (empty-module guards, `scroll-padding-bottom`). The built body was re-diffed after them against the mockup and is unchanged.

## Performance (playbook §4)

`audit.json`: `tools/audit-mockup.mjs sanjee-surf-school ../final`, through a scratch copy changing only the port (8980 to 9402) and the import paths. Throttled phone 390×844, 1.6 Mbps, 150 ms, 4× CPU, no scroll. My static server does not compress.

| Line | Target | Measured |
|---|---|---|
| First-load transfer | ≤ 1,500 KB | 370 to 371 (HTML 104 uncompressed; 26.8 KB gzipped, so about 290 once a host compresses it) |
| Desktop first load | | 397 |
| JS | ≤ 300 KB | 25.7 uncompressed, 9.2 gzipped, inline. The tool reports 0 because it counts files |
| Fonts | ≤ 2 families, ≤ 150 KB | 2, 49 |
| Largest image | ≤ 300 KB | 136 |
| LCP, tool | ≤ 2,500 ms | 480, **the H1, not the photo** |
| Hero paint, Element Timing | | phone 2,008 to 2,184 (5 runs), desktop 2,156 to 2,332 (2 runs) |
| Swell visible | | phone 2,200 to 2,213, desktop 2,347 |
| CLS on load | < 0.1 | 0 |
| Scroll CLS, early / settled | < 0.01 | 0 / 0 |
| Third-party requests on load | 0 | 0 |

**Hero timing against the mockup:** on this same harness the mockup's hero bytes end at 1,955 to 1,964 ms and its swell shows at 2,174 to 2,180; the final's are 1,991 to 1,998 and 2,200 to 2,213. So 30 ms or so later, with the critic's round 3 figure of 1,660 to 1,692 ms coming from a different harness that I did not reproduce. The hero file finishes last because everything shares the throttled link.

**Fonts on the throttled phone:** Manrope ends at about 750 ms, Courgette at about 1,460.

### Font swap

The fallback does not hold every line break, and no `size-adjust` can: I scanned weight 400 from 101.3 to 103.4 % at 360, 375, 390 and 412 px and none reaches zero at all widths, so I kept the measured values rather than fit one width.

| Page height, fallback then fonts | Arial | Roboto file standing in for Android |
|---|---|---|
| 390 | 12,928 → 12,985 (+57) | 12,960 → 12,985 (+25) |
| 1440 | 9,509 → 9,508 | 9,510 → 9,508 |

CLS when fonts land with the visitor mid-page (fresh load, jump to the position, fonts held 1.8 s, one run each):

| Phone, scroll position | 1400 | 3200 | 4200 | 7600 | 10500 |
|---|---|---|---|---|---|
| Arial, anchoring on | 0.0103 | 0.0334 | 0.0966 | 0.0000 | 0.0780 |
| Arial, anchoring off | 0.0103 | 0.0927 | 0.0966 | 0.0955 | 0.0948 |
| Roboto, anchoring on | 0.0000 | 0.0088 | 0.0003 | 0.0000 | 0.0000 |
| Roboto, anchoring off | 0.0000 | 0.0089 | 0.0289 | 0.0298 | 0.0285 |

Desktop at or under 0.0002 in all of these. The critic's worst was 0.17; the worst here is 0.0966, under 0.1 but not by much on Arial, which is the iPhone's case. Residual cause: one line more or fewer in a few paragraphs at 390 (Lessons ¶1, Board rental ¶1 and ¶2, the first outing's title). Holding the fonts 1.8 s is the deliberately bad case; on the throttled profile Manrope is in by 0.75 s. If the critic wants it closed outright, inlining Manrope in the HTML removes the swap for about 8 KB extra (base64 arithmetic, not built or measured). I did not do it because the brief asks for preload.

Roboto was a downloaded file through a rewritten stylesheet, Arial stands in for iOS and anchoring off stands in for Safari. No Android, iPhone or Safari run.

## Typed date (real key presses, Chromium, field shows dd/mm/yyyy)

| Typed | While typing | Links with a date | After leaving the field |
|---|---|---|---|
| 10 12 2026 | 0002, 0020, 0202, 2026 | 22 of 22, "10 December 2026" | kept |
| same, 400 ms key hold | same | 22 of 22 | kept |
| today | | 22 of 22, "5 November 2026" | kept |
| yesterday | | 0 | field cleared |
| 01 01 2020 | | 0 | field cleared |
| 20 02 61210 | year stops at 4 digits, 6121, then restarts at 1210 | 0 | field cleared |
| 20 02 612100 | ends 2100 | 0 | field cleared |
| 20 02 2612 | | 0 | field cleared |
| 31 12 2031, the last year allowed | | 22 of 22 | kept |
| 01 01 2032 | | 0 | field cleared |
| day and month only | value empty | 0 | |
| year retyped, 2026-12-10 to 2027 | day and month kept | 22 of 22, "10 December 2027" | kept |
| Backspace on a good date | value empty | 0 | |

The five-year limit is my choice, not a fact about the school. Not run: the native phone picker, the calendar popup, Safari, Firefox, a year-first field.

## Checks

| Check | Result |
|---|---|
| `check-design` (scratch copy, port 9403 only, `--no-shots`, on the page's path) | `ok`, 0 problems, 0 warnings; h1 and body Manrope, h2 Courgette, ground white, 0 all-caps labels, 0 of 24 labelled headings |
| `tools/check-places.mjs sanjee-surf-school` | 0 borrowed images checked, 0 failing |
| `tools/funnel.mjs` on the built page | `clicks_to_book` 1, primary whatsapp, hero whatsapp 0 taps to flow, CTA above fold, broken 0. Meets `dossier/…/audit.json` `recommended` (whatsapp, 1) |
| `tools/build-mockup.mjs` | not run: this site has no `photos.json` roles for it to read, see `conflicts` |
| Messages | all 450 states of level × lesson × date × people, 22 links each: **identical to the mockup in 450 of 450**, with its `%27` read as `'`; 0 links to any other number. hrefs read; no `wa.me` link opened, nothing sent. The tap into a real chat is untested |
| Level on tour links | nine outings drop it; three surf tours, three cards and the board button keep it |
| Swell over http | canvas opacity 1; mean difference over 1.2 s: sky 0.00, water 12.03 at 390 and 14.60 at 1440; 0 console errors. Software GL. **Not watched live and not on a real phone in this port;** the shader and its values are unchanged from what Alon watched |
| Reduced motion | canvas opacity 0, no smooth scroll, chart settled |
| No WebGL (`--disable-3d-apis`) | canvas opacity 0, photo shown, tiles work, 0 errors |
| JS off | 22 `wa.me` and 3 `tel:` links in the HTML; desktop hero button, phone bar; tiles hidden, as in the mockup |
| Keyboard | 62 stops at 1440, 61 at 390; 0 off screen; 0 behind the phone bar; tile and chip operate by key; phone menu opens, Esc closes, focus returns. Two flags, neither new: the skip link reads as "under the header" because it sits above it on purpose, and the date input reports no outline while focus is in a segment (Chromium highlights the segment instead) |
| Offline, this server only, full scroll | 0 off-site requests, 0 404s, 0 images failed |
| Subfolder (`/x/y/`) | 0 404s, fonts and hero load |
| Overflow at 390 | none |
| Page words | no opening hours, "closed", cancellation, owner, founder, operator, video, iframe, forecast or `img-010`. "head instructor" once. Credentials only in `#sanjee`. Beginner card: "Total beginner, beginner \| 2 hours", no group row. `copyBlocks[4]` ¶3 and ¶4 beside the tour rows |
| Numbers on the page | 48 distinct; all in `copy/en.json` except the composed "5/5". The dossier writes board sizes in another format (`rental_terms.quiver`) |

Not run: `/impeccable`, `/review-animations`, `/emil-design-eng`, `inspect.mjs` (a port changes nothing they judge), a screen reader, any real device.

## editable (owner, after a CMS sale): where each thing on the page is edited

| On the page | Field |
|---|---|
| Name in header and footer | `businessName` |
| Hero title, lead line, meta | `tagline` (title = up to the first comma; gap) |
| Line in the feature band | `featureLine` |
| Line over the last picture | `closing` |
| Who we teach, Sanjee's words, Lessons, Board rental, By tuk-tuk, Before you book, Other waves, Finding us | `copyBlocks[]`, by slot and order in the slot |
| Lesson cards and the lesson chips | `lessons[]` |
| Rental table, Bodyboard | `rentals[]` (label form "<kind>, <duration>"; gap) |
| Board chart lengths | the board paragraph in the second `offer` row of `copyBlocks` (gap) |
| Tours, Rashguard, Reef booties | `priceList[]` (gap) |
| Rating | `ratings[0]`, deployer |
| Reviews | `testimonials[]`, deployer; owner may delete |
| Credentials, languages | `credentials[]`, `languagesSpoken[]` |
| Spot, season | `spot`, `season` |
| Phone, WhatsApp, email, address, map | `contact.*` |
| The 8 photographs | `photos[n]` fills slot n (`src/lib/slots.mjs`); the build crops. Focal point honoured on replaced photos |
| Not owner-editable | layout, shader, board shapes and colours, labels (`src/lib/labels.json`), message sentences |

Hours: `openingHours` is `[]` and the template never renders it, so no week of "closed" can appear. If the owner gives hours at station 8, the template needs a place for them.

## schema gaps (bound only to existing fields, nothing invented; `schemas/` untouched)

Proposals for a human, none applied:

| Gap | What the template does now | Weakness | Proposal |
|---|---|---|---|
| `heroLine` | tagline up to its first comma | a comma moved changes the title; a tagline with none gives a long title (tested: wraps, no overflow) | optional `heroLine`, ≤ 50 |
| `priceList[].group` | "to buy" in the label = shop; of the rest, the first 3 are surf tours, the others outings | reordering rows changes which links carry the level and where the gap falls | optional `priceList[].group` |
| `rentals[].kind`, `.duration` | parses "Soft-top, 1 hour"; a label that does not parse goes to the list under the table, nothing lost | renaming a kind moves that row out of the table | optional `kind`, `duration` |
| Board sizes as rows | lengths parsed from the paragraph, so a text edit reaches the chart; no lengths, no chart. Shapes and colours keyed on words in the name | depends on the paragraph's wording | `boards[]` (label, min, max) |
| `spots[]` | wave highlight by paragraph order | reordering paragraphs lights the wrong level | optional `spots[]` (name, level, break) |
| `pricesAsOf` | sentence read from the Before you book block, repeated beside the tables; no sentence, no line | depends on the wording | optional `pricesAsOf` |
| Picture for a level | slot order in `slots.mjs` | owner cannot tell which row is which tile from the schema | document the order, or `lessons`-level picture |
| `ctas` | `src/lib/labels.json`, a template label per the schema | none | none |
| Swell on a replaced hero | still, no shader | owner loses the motion by replacing the photo; `focalX/Y` is one point and cannot carry a horizon and a shoreline | decide at station 8 |

## Facts (every checkable claim → field → dossier key; the audit is `copy/review.md`, row by row in `copy/sources.md`)

| On the page | Field | Dossier key |
|---|---|---|
| Name | `businessName` | `business.name.value` |
| What and where | `tagline` | `business.description`, `business.type`, `location` |
| Feature line | `featureLine` | `business.tagline.value` |
| Levels, English as standard | `copyBlocks` intro 0 | `levels`, `languages_spoken[1].note` |
| Head instructor, birthplace, story | `copyBlocks` about 0 | `team[0]`, `business.owner_voice` (flagged: `flags_for_operator[0]`, `contradictions[20]`) |
| Lesson inclusions, Week Intensive, group bookings | `copyBlocks` offer 0, `lessons[]` | `includes`, `lessons[0–2]` |
| Prices and lengths, lessons | `lessons[]` | `lessons[0–2]`; "2 hours each" from `lessons[2].note` |
| Shop, storage, sizes, leash, fins, wax, ID, deposit | `copyBlocks` offer 1 | `location.shop`, `rental_terms.*` |
| Rental prices and notes | `rentals[]` | `rentals[0–15]`; bodyboard `offers` |
| Tours and shop prices and notes | `priceList[]` | `offers` |
| Swim, age, cash, price date | `copyBlocks` info 0 | `requirements[0,2]`, `booking.payment_on_the_day`, `harvested_at` |
| Spot, season | `spot`, `season` | `location.spot`, `season.value` |
| Other waves | `copyBlocks` info 1 | `surf_spots[]` |
| Plus code, other name | `copyBlocks` info 2 | `location.plus_code`, `business.name` |
| Credentials | `credentials[]` | `credentials[0–1]` |
| Languages | `languagesSpoken` | `languages_spoken[0–1]` |
| Rating, reviews | `ratings[0]`, `testimonials[]` | `reviews.google` |
| Phone, WhatsApp, email, address, map | `contact.*` | `contact.*.value`, `location.address.value`, `location.map_url.value` |

Template words, none a claim: the labels in `src/lib/labels.json`, unchanged from the mockup (visible text identical).

## images

As in `mockups/interactive/notes.md`, now through `src/tenant/media/` and `public/photos/`: img-018, img-005, img-006, img-009, img-012, img-007, img-014, img-002, all business-owned, none of them stock. `img-010`, review photos and `usable: false` images are out. Alts for img-005 and img-012 are new and not shown on the page (the tiles' `alt` stays empty, labelled by their text). **Owner items:** img-007's provenance, img-005's identifiable people.

Recipe: `scripts/make-media.sh`, `# media:` headers for `src/tenant/media/*` and `public/photos/*`. `media/sanjee-surf-school.tsv` lists them: all 8 and all 22 files.

## gaps

No video, no forecast, no hours, no cancellation, no reply time, no deposit amount, no Instagram, as decided.

## conflicts

- **Video path not built.** Base.md and the schema expect the template to render `heroVideo` when set. Decided against for this site ("no video", Alon) and the slot logic does not shift photos as the schema asks. If a client supplies video at station 8, the hero needs it added.
- **Rubric's photograph rule:** img-018 clears ≥ 1920 px by its long edge only, as recorded at 4e. Unchanged. `build-mockup` has no `role: "bleed"` input for this hand-built port, so hard constraint 7 is measured by `check-design` (passes), and the hero draws above 1440 px upscaled, as in the mockup.
- **Hard constraint 5:** not re-checked. The port changes nothing a visitor would compare, and I did not open the sibling mockups; `concepts.md` carries the divergence table.
- **Critics' items left as they were, because the brief says port and limited the fixes:** chips below the fold on a laptop after a tile click; 2× phones fetching the larger tile; ink title near yellow cloud at 640 to 700 px; "Not sure" offering only "Your message"; chart labels 13 px on a phone; 228 px of chips and bar after a two-lesson tile on a phone.
