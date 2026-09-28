# calm — "Daybed" · designer 0.4.1 · station 4e · run 2026-09-globalsurf-02

Page: `dist/index.html` (+ `dist/img/`, `dist/video/`). Shots: `shots/round-1 … round-7` (+ `round-6/static/` reduced-motion and no-JS captures). Funnel: `funnel/funnel.json`.

## look-log

Old-site reference beside every round: `dossier/global-surf-adventures/assets/old-site-home-desktop-fold.png`, `old-site-lodge-desktop-fold.png`, `old-site-home-mobile-fold.png` (a grey surf clip under a centred serif headline; the lodge page is a dark brown aerial of a tractor field with a badge printed over the breadcrumb and headline, a Messenger bubble on the text, no price anywhere).

**Round 1 — first screen only.** vid-009 poster/loop full-bleed, name at 96 px low-left, coral button in the header and again in the hero. Wrong: the name is set so large it sits on the white daybeds (the one thing) and the white letters vanish into white upholstery; two identical coral buttons on one screen shout; on the phone the button label wraps into a ragged two-line block. Change: stronger bottom gradient, smaller name, header link becomes a quiet underlined text link, phone button tightened. Versus the old site: already clearly better — their lodge page opens on a brown tractor field, ours on their own sunlit pool deck with a price-bearing path one tap away.

**Round 2 — first screen.** Legibility fixed by a 0→62 % ink gradient in the lower 62 % and a faint top scrim; one coral action. Wrong: the hero text was pushed into the centred 1200 px column while the header stayed at the page edge, so the two left edges disagreed; the proof line floated with nothing tying it to the button. Change: header into the same column with a 1 px white hairline under it (the house's thin precise line), proof line separated from the button by a 1 px vertical rule. Versus old site: clearly better at a glance, desktop and phone.

**Round 3 — first screen.** Column, hairline and rule in place; frame captured mid-loop (drone descending on the lodge's white roofs and pool) — the film carries the screen. Wrong: the proof line broke into three lines (the `<b>` became a flex item); at 78 px the two-line name still covered the lodge on the aerial frames. Change: proof line wrapped in one span; name capped at 72 px so it runs on one line at 1440 and sits under the subject. Versus old site: theirs is a static-feeling dark field with a watermark; ours moves, is light, and says what, where, how much trust and where to book in one glance.

**Round 4 — whole page, first build below the fold.** Sections: intro + two photographs bleeding to opposite edges; three level panels with the price printed on each; Freestylers / one-price / trust + actions; feature photo with `featureLine`; four-photo day run; rooms 7/5; rating + quotes; spot + Rosa; getting here; closing band. Wrong: the Level 2 and Level 3 panels used the dossier posters centre-cropped to 4:5 — Level 3's crop lost the barrel entirely and read as grey water, so the booking section's right two thirds looked dull next to Level 1; on the phone the feature line in ink sat on the darker water and was hard to read; the mobile bar's segment buttons let text behind them show through. Change below. Versus old site: the old site has no price and no per-level path at all; ours has both inside big imagery.

**Round 5 — whole page.** Re-extracted poster frames from the prepared cuts (vid-002 at 6.2 s: the surfer deep in the barrel; vid-003 at 2.2 s: a rider on a reef wave) and cropped them on the surfer; each clip's `object-position` matches its poster. Feature line white on the deep water on the phone, ink on the bright pool on desktop. Remaining: bar background, the check-design dark-ground flag on the hero placeholder colour.

**Round 6 — whole page over http (Rosa loads).** Rosa's light widget sits in its reserved 420×500 box beside the headline half; no console errors. Wrong: nothing structural; the hidden bar button came first in the DOM so the funnel read "Packages and dates" as the primary label. Change: bar moved to the end of the DOM (it is fixed, so nothing moves visually); hero `<video poster>` points at the AVIF the `<picture>` already loaded (no second 163 KB poster fetch).

**Round 7 — whole page, final.** Checked for overflow, overlap and unreadable text at 1440 and 390: none found; mobile bar never covers a booking control it duplicates. Side by side with the old site: first screen and whole page are clearly better — their own film full-bleed, big photography in every section, prices and per-level booking the old site never shows, one light calm system instead of taupe grounds, script headings and a Messenger bubble.

Reduced motion (`round-6/static/reduced-motion-390.png`): poster only, level panels show their stills, 0 video requests. No JS (`round-6/static/nojs-390.png`): poster, all text, all links work; the booking bar renders in the flow without the level switch. No WebGL on this page.

## images

All `business-owned` per `dossier.json` (`images[]` / `videos[]`, the business's own site and YouTube channel @globalsurf1582).

| used as | asset | note |
|---|---|---|
| hero loop + poster | vid-009 (cut src 3–15 s) + vid-009-poster (AVIF, 1280 WebP) | no watermark |
| Level 1 panel | vid-010 m1280 cut + its poster, 4:5 crop | centre crop removes the top-left badge |
| Level 2 panel | vid-003 m1280 cut (new cut on disk) + frame at 2.2 s of its d1920 cut, 4:5 | badge cropped out |
| Level 3 panel | vid-002 m1280 cut + frame at 6.2 s of its d1920 cut, 4:5 | badge cropped out |
| intro pair | img-002 (4:5), img-017 (3:2) | lodge |
| feature | img-005 (2000 px source, full-bleed; 4:5 crop on phone) | lodge |
| day run | img-104, img-011, img-111, img-023 (all 4:5 centre crops) | img-104 badge cropped out; img-111 place unidentified — no place claim |
| rooms | img-015, img-064, img-012 | lodge |
| getting here | img-072 | the lodge's roadside sign |
| closing band | img-093 (1536 px source, drawn ≤ 1536 at 21:9; 4:5 on phone) | lodge |

Surf clips and img-111 are never labelled as the lodge's own wave (concepts.md rule). No stock used. No captions under photographs.

## gaps

- No season in the dossier: no season line on the page.
- No reply time and no staff languages: none shown beside WhatsApp.
- The only WhatsApp is the Israeli HQ mobile (`wa.me/972523593240`, copied from `bookingLinks[5]` / `booking.whatsapp`); phone is `+97299733943`.
- "The Rock" has no Rosa spot; only South Point gets the forecast.
- Google 4.7 has no count: not shown.
- Rosa: only `rosa-kabalana.json` is checked in as a fixture; the concept maps to `south-point`. I fetched `https://rosa-data-opal.vercel.app/data/spots/south-point.json` on 2026-09-28 (built 14:26 UTC) and saved it as `rosa-south-point.json` next to this file; the headline values are inlined from it (0.7–1.0 m; swell 1.1 m 14.4 s from 198°; wind 7 km/h from 276°, cross-shore; for 20:30 local).

## conflicts

1. **Level clips move (concept: "the hero video, and nothing else moves by itself").** audit.json `recommended.notes` asks for vid-010 beside Level 1 and vid-002 beside Level 3, playbook §1a says use video whenever it exists, and the vid-003 cut now exists. Each level panel is its clip, poster first: it plays on hover/focus on pointer devices and, on touch, only while ≥ 75 % in view (one at a time in the swipe row), m1280 only, never under reduced motion or Save-Data. Cost of the alternative (concept's still photos img-126/125/099): a calmer page, but the business's level films unused.
2. **Level panel stills are video frames, not img-126/125/099**, so each poster is a frame of its own clip (schema v0.8 rule). The vid-002/vid-003 dossier posters cropped badly to 4:5, so I pulled better frames from the same prepared cuts (not a dossier change; the frames are in `dist/img/` only).
3. **Hero gradient** is 0→62 % ink over the lower 62 %, not the concept's 0→30 % in the bottom quarter: at 30 % the white name disappeared into the white daybeds (round 1).
4. **Ground** is `#F3F4F7` (a lighter cool white) with `#FFFFFF` for the guests band; the concept's `#E3E4E9` read grey and flat behind body text at full-page scale and is kept only as the Rosa box placeholder. Still a cool white, not cream.
5. **Rating band**: the concept's full-width pool-blue band behind the "8.6" would be a dark panel behind text by check-design's rule (pool L ≈ 0.22 < 0.35). The 8.6 is set 240 px in pool blue on white instead.
6. **Hero placeholder colour** is `#9fc0e6` (sky tone). check-design only treats a container as a picture when an `img`/`canvas` is a direct child; our poster is `picture > img`, so the darker placeholder was flagged. It shows only until the 41 KB poster paints.
7. **Interface labels** added by the template (not copy): header link "Weekly packages and dates", mobile bar "Packages and dates" / "Book Fomies" etc., "Included:", "per person, 7 nights / price read 28 Sep 2026", "At the lodge", "Check-in / Check-out", "Call +972 9 973 3943". No copy was rewritten; "From 4 nights" is `lessons[3].includes`.
8. **Fonts** load from Google Fonts at 4e (allowed); they are the 2 non-local requests on load. 4g self-hosts.

## other businesses in this run

None (the run has one business). The interactive and unique variants of this business are other designers' work; not opened here.

## measured (headless Chromium, local static server, no scroll, 8 s wait)

| | phone 390 | desktop 1440 |
|---|---|---|
| first load, video excluded | 343 KB | 413 KB |
| hero video after first paint | 1.50 MB (vid-009 m1280 webm) | 2.98 MB (vid-009 d1920 webm) |
| largest above-the-fold image | poster AVIF 41 KB | poster AVIF 41 KB |
| video requests under reduced motion | 0 | — |
| non-local requests on load | 2 (Google Fonts css + woff2) | 2 |

Level clips load only on hover/in-view: 1.3–2.0 MB each (m1280 webm).

`tools/funnel.mjs` on the file: clicks_to_book 1, primary class engine ("See the weekly surf packages and dates"), CTA above the fold, 0 broken. `tools/check-design.mjs` on the file: pass, 0 warnings (Sora for h1/h2/body, ground hsl(225 20% 96%), 0 all-caps labels). All engine, product and WhatsApp URLs match `dossier.booking` character for character.
