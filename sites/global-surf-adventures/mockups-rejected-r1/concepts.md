# Global Surf Lodge Kabalana — concepts

creative-director 0.3.0 · run `2026-09-globalsurf-02` · slug `global-surf-adventures` · state in: `copy_passed` · 2026-09-28

Inputs read: `dossier.json` (incl. `videos[]`, 198 `images[]`), `audit.json` + `audit.md` (`recommended`), `copy/en.json` (passed 4c), all nine video contact sheets, the three prepared cuts frame by frame (1 fps), the three posters, all 198 photographs (seven labelled contact sheets), the four `old-site-*` screenshots, `agents/designer/references.md` (all 29 findings), `agents/designer/custom.md`, `agents/designer/gold/` (three notes files, the Lavish round-2 sheet, the forecast shot).

This file replaces the voided run `2026-09-globalsurf-01` concepts (a ruled price table, a swinging sign, a line-drawn cross-section). None of those forms returns. Every concept below opens on the business's own moving picture of the lodge.

---

## 1. What this business actually is

A surf-travel agency registered in Israel (`business.businessType_note`) that sells trips to five countries but runs one place itself: a twelve-room lodge of low white bungalows around one long blue pool, on the coast road at Kabalana, between the road and the railway (`rooms[0]`, vid-004 at ≈3–5 s, img-062). What it sells is not a bed but a **week**: three surf levels at one identical engine price, $1,466 per person for seven nights from a Saturday (`offers[0..2]`), with lessons, meals, gear and the ride to the spot of the day. It is a business that **films its guests** — two filmed sessions per week are in the package (`offers[0].includes_engine`), there is an in-house photographer (`facilities`), and its YouTube channel holds 214 videos. And its own site hides all of this: the lodge page opens on a tractor, no page states a price, and every book button loses the package (audit F1–F4).

## 2. What the material can and cannot carry

### Video, the business's own (`dossier.videos[]`)

All licences are `business-owned` (the business's YouTube channel) unless stated. Timestamps are source time; "cut" is the prepared 10–12 s rendition. Sheet timestamps are ≈ (24 frames spread over the clip).

| id | length, resolution | what it shows | usable? | three best moments for a loop |
|---|---|---|---|---|
| **vid-009** "Our experience – 2019" | 59.96 s, 1920×1080, **no watermark** | title card 0–2 s; sunny drone over the lodge's white roofs and pool in the palms; the pool deck in hard sun (daybeds, umbrellas, king coconuts); tuk-tuk POV; hillside Buddha; painted outrigger; a surfer walking the dune path to the sea; drone down the turquoise reef coast; surfing by a rocky headland (≈30–45 s); stilt-fisherman sunset | **Hero, all three concepts.** Cut ready: src 3–15 s (d1920 webm 3.05 MB, m1280 webm 1.54 MB, poster = pool deck at src 6 s, AVIF 41 KB) | (1) src 3–5 s drone descending on the white roofs + pool; (2) src 5–8 s the pool deck — the poster; (3) src 13–15 s drone down the turquoise reef coast. Cut timeline at 1 fps: 0–2 drone, 2–5 pool deck, 5 tuk-tuk, 6 Buddha, 7 boat, 8–9 dune path, 10–11 reef coast |
| **vid-010** "Surf trip for beginners (level 1)" | 46.08 s, 1920×1080, faint badge top-left | drone over a long surf coast; guests in the lodge pool (≈2–5 s); tuk-tuk with boards; pop-up lesson on soft-tops; group walking to the water; golden-hour beginner session — riders into the sun, silhouettes, cheering (≈19–31 s); drone over lodge; dinner; GLOBALSURF end title | **Level 1 clip.** Cut ready: src 19–31 s (m1280 webm 1.99 MB, m720 mp4 1.90 MB, poster = woman standing up on a soft-top into the sun, src 20 s) | (1) src 20–21 s first stand-up into the sun (poster); (2) src 22–23 s silhouettes on the gold-lit sand; (3) src 27–30 s the instructor cheering with both arms up. The badge sits top-left; a centre 4:5 crop removes it |
| **vid-002** "Surf trip for advanced surfers (level 3)" | 39.32 s, 1920×1080, badge top-left throughout | reef-coast drone; drone over the lodge roofs + pool (≈5 s); a pink board in the pool from above (≈6–7 s); surfers paddling from above; a deep right-hand barrel (≈9–12 s); tuk-tuk on a jungle track; beach breaks; sunset line-up + title | **Level 3 clip.** Cut ready: src 4–14 s (m1280 webm 1.33 MB, m720 mp4 1.39 MB, poster = the barrel at src 14 s, AVIF 13 KB) | (1) cut 5–8 s the barrel ridden deep; (2) cut 2 s pink board on the pool from above; (3) cut 3–4 s three surfers paddling, top-down over green water. Crop out or accept the badge |
| vid-003 "Surf trip for intermediates (level 2)" | 49.28 s, 1920×1080, badge top-left | tuk-tuk with boards on the roof; drone over a turquoise bay; intermediates on reef waves (≈11–23 s); drone over the pool with guests (≈27 s); girls at the pool; surf theory at the chalkboard (≈33–35 s); yoga by the pool; dusk drone + title | **Would be the Level 2 clip, but no cut or rendition exists.** Request (not mine to make): `tools/fetch-video.mjs` cut src ≈11–21 s. Until then Level 2 uses img-125 (a still) | (1) ≈11–21 s reef-wave rides; (2) ≈27 s drone over the pool with guests; (3) ≈3–5 s tuk-tuk with boards on the roof |
| vid-004 "Join our experience" | 47.2 s, 1920×1080 | overcast: drone over the coast, top-down of the lodge between road and railway (≈3–5 s), roadside sign, lounge, long pool, rooms, bottles, yoga, dinner, pool lit at night (≈41–43 s) | Not as a loop: grey light flattens the pool and the white walls; the stills cover the same rooms better | — |
| vid-001 "Surf Destinations" | 49.6 s, 1920×800 | Maldives, yacht, Morocco/Angola points and camping | No — other destinations (old home hero) | — |
| vid-006 / vid-007 | 57.5 s / 15.3 s, 1080×1920 | vertical ads, Hebrew captions or script + logo on every frame | No — text burnt into every frame | — |
| vid-008 "Srilanka Short" | 29.7 s, 1920×1080 | older saturated edit, a different, busier beach, titles | No — not the lodge's beach, titles | — |
| six further lodge videos (`y-Bv37TRmXY`, `krC3XZIko44`, `bqISDBfdUCc`, …) | 61–89 s | not downloaded (HTTP 403) | Unknown. The "One Shot Walk through" (89 s) could be the best lodge footage the business owns; worth a second fetch | — |

**Rule for every concept:** describe surf clips without naming the wave (the dossier has not verified that any surf footage is Kabalana's break); the clips illustrate a level, never "our wave".

### Photographs, the business's own

198 photographs, all `business-owned`: 95 of the lodge, 77 surf/people at an **unidentified** place (never captioned or positioned as the lodge's wave), 25 `not_lodge` (Beach House, Hikkaduwa, retreats — not used), 1 labelled Kabalana by filename only (img-096). **152 have a long edge ≥ 1920 px; 116 are landscape 2000 px wide. The largest usable width in the dossier is 2000 px** (the capt_nir set img-001…img-034 exists at 6000×4000 on globalsurf.com — `original_width` — if a sharper 2560 px hero still is ever wanted). Nothing needs upscaling; nothing under 1200 px is drawn full-width.

The ten strongest, all used below:

| # | asset | px | subject | place |
|---|---|---|---|---|
| 1 | img-005 | 2000×1333 | the long pool shot at water level, open lounge and bar behind | lodge |
| 2 | img-001 | 2000×1333 | a guest on a daybed floating on its timber deck over the pool, white bungalow behind | lodge |
| 3 | img-099 | 2000×1333 | a surfer deep in a clear turquoise barrel, shot from the water | unidentified |
| 4 | img-026 | 2000×1123 | drone top-down: the pool, one palm, guests, boards | lodge |
| 5 | img-016 | 2000×1333 | a guest flipping wet hair out of the pool — a spray arc | lodge |
| 6 | img-118 | 2000×1333 | a woman carrying a board over her head through jungle | unidentified |
| 7 | img-111 | 2000×1333 | a longboarder at sunset, gold water | unidentified |
| 8 | img-064 | 2000×1333 | the open-air bathroom with a palm growing through it | lodge |
| 9 | img-075 | 2000×1333 | the open lounge, white beanbags on the deck beside the pool | lodge |
| 10 | img-093 | 1536×1023 | the pool and lounge at dusk, lights on (≥ 1200, so full-width allowed, never the hero) | lodge |

Also load-bearing: img-011 fruit bowl (2000), img-023 guests toasting (2000), img-104 group walking to the surf (2000, badge top-left — crop), img-126 beginner on a soft-top (2000; filename says "Blue Bay" — no place claim), img-125 longboarder in a GLOBALSURF rash vest (2000), img-138 surfer in coral on turquoise (2000), img-015 double room with glass doors (2000), img-063 loft dorm with ladder (2000), img-012 bungalow with hammock (2000), img-072 the round roadside sign (2000), img-062 top-down of the lodge between road and railway (2000×1123), img-151 reef break from above (1600×781).

What the photographs show that a guest would recognise in a second: **the pool** — long, saturated blue, with white daybeds on dark timber platforms cantilevered over the water, under white pitched-roof bungalows and palms. It is the most-photographed thing in the lodge set (img-001–005, 007–009, 016–017, 024, 026, 036, 039–040, 047, 053–054, 060–061, 073–077, 089, 092–094) and it appears in all five lodge videos (vid-009, vid-010, vid-002, vid-003, vid-004). The guests name it too (Fanny, Abigail, Sara, Myrthe in `testimonials`).

### Atmosphere

`dossier/global-surf-adventures/stock/` does not exist, and none is needed: the business's own material fills every large moment.

### Words (`copy/en.json`)

Short and worth setting large: `featureLine` "Footwear is discouraged. Chilling out is inescapable." · intro heading "Next set is yours" · about heading "Surf, breakfast, surf again" · `closing`. Long: "Pick your level" (four paragraphs, one per level — the source for each level's one-line "who it's for") and "Twelve rooms, one big family". Nine verbatim testimonials; the Fanny quote names three photographable things (open-air bathroom, pool area, breakfast bowls).

### Numbers

$1,466 per person, 7 nights, identical for Levels 1–3, engine base price read 28 Sep 2026 (`offers[0..2]`, copy "One price, three levels"). Stays of 7/14/21/28 nights from a Saturday, up to six guests. Booking.com **8.6/10, 80 reviews**, captured 2026-09-28; staff 9.5, facilities 9.2, cleanliness 9.2. Twelve rooms. Distances: Kathaluwa West Beach 40 m, Kabalana Beach 350 m, Kathaluwa station 400 m, Koggala Airport 3.9 km. Check-in 14:00–20:00, check-out by 11:00. Google 4.7 has **no count** and may not be shown.

### Gaps (pitch points, never filled)

No season. No break type, bottom or level fit for "The Rock" and "South Point". No staff languages, no reply time. The only WhatsApp is the Israeli HQ mobile. No price anywhere on the current site. No Level 2 clip cut. No verified footage of the lodge's own wave — the most interesting gap: 214 videos and not one says "this is the wave outside the gate".

---

## 3. The page archetype — **the surf-week film**

The page is cut like the lodge's own films. vid-009, vid-010 and vid-002 all follow the same edit: arrive from the air over the white roofs → the pool → the ride → the water → the table → the title. The site follows that grammar: an opening shot, then sequences, each carried by a full-bleed moving or still picture, each with one short title set like a film title, with the booking section as the scene where you pick your part. The archetype organises the media; it never replaces it.

It belongs to this business because this business makes films of its guests and sells a week, not a night; it is the only business in the run, and it rules out the voided run-01 forms (table, sign, drawing) by construction.

Common spine (all three concepts; the form of each section differs by concept):

1. **Opening** — hero video (vid-009), name, what + where, primary action, one proof point.
2. **Next set is yours** — intro.
3. **Pick your level** — the booking section, in `recommended.above_fold` order: level → price → included → trust → primary action. One scroll below the opening, never on it.
4. **Surf, breakfast, surf again** — the day.
5. **Twelve rooms, one big family** — the lodge.
6. **What guests say** — rating + verbatim quotes.
7. **The spot** + Getting here (+ forecast where carried).
8. **Closing** — `closing` + the action + full contact.

Booking, all concepts (hard constraint 8; references #3, #4, #6, #7, #20, #22):
- Primary action = **engine**, label **"See the weekly surf packages and dates"** → `https://globalsurfadventures.bookinglayer.com/en/category/sri-lanka` (`bookingLinks[0]`), a plain `<a>`, **1 tap** to the engine from the first screen (`clicks_to_book: 1`). Never a `/tests/` URL (audit F1).
- Each level carries its own product link (`bookingLinks[1..4]`), also 1 tap.
- Secondary: "Ask on WhatsApp" → `bookingLinks[5]` (`wa.me/972523593240?text=…`), and `tel:+97299733943`, both ≥ 44 px, in the booking section, the persistent bar's expanded state and the footer.
- Persistent mobile bar on every screen after the opening, in the audit's order: level switch (Fomies / Rollers / Riders) → "$1,466 pp, 7 nights" → "lessons, meals, room" → "8.6 Booking.com" → coral button. Desktop: the same, one row, docked under the header once the opening has scrolled away.
- No drawer or modal stands between the visitor and the engine; nothing covers the first screen (#20).

Proof point on the first screen, all concepts: **"8.6/10 on Booking.com, 80 reviews"** with its capture date (28 Sep 2026), linked to the listing.

---

## 4. Three concepts

### Concept 1 · calm — **"Daybed"**

**The idea in one sentence.** A still, sunlit film of the pool: the lodge's own drone shot lands you on the daybeds, and every section after it is one big, quiet photograph and a few words.

**The one thing.** The daybeds on dark timber platforms floating over the long blue pool (vid-009 poster, img-001, img-017, img-005). Nothing else on the page is loud; there is no graphic device at all — the pool is the device.

**Structure.**
1. **Opening** — full-bleed vid-009 cut, 100svh (see first screen).
2. **Next set is yours** — white ground, 12-column grid (#13) in a centred 1200 px column. Heading at display size across columns 1–7; the two-paragraph body in columns 8–11. Beside it, img-002 (1333×2000, pool and bungalow under palms) as a 4:5 portrait crop in columns 1–5 of the next row, bleeding to the left page edge.
3. **Pick your level** — the booking section. Three level panels in a row (desktop), each a 4:5 centre-cropped photograph (#26) with the price printed on the panel (#7): Level 1 Fomies img-126, Level 2 Rollers img-125, Level 3 Riders img-099. Under each photo: level name, the one-sentence "who it's for" from the "Pick your level" block, **$1,466 per person, 7 nights**, the includes line, its own "Book Level n" link. Below the three: one line for Freestylers (B&B only, from 4 nights, own link, no price), then the "One price, three levels" paragraph, then trust (8.6/10 Booking.com, 80 reviews, 28 Sep 2026), then the primary action + WhatsApp + phone. Mobile: the three panels become a swipe row with the next panel peeking (#14).
4. **Feature** — full-bleed img-005 (the pool at water level), 16:9 on desktop, 4:5 on mobile, with `featureLine` "Footwear is discouraged. Chilling out is inescapable." set large in white over the water in the lower third (the photo's darkest, flattest area).
5. **Surf, breakfast, surf again** — a run of four photographs, all cropped 4:5 from the centre (house rule 2, #26), edge to edge with 1 px white gutters: img-104 (walking to the surf), img-011 (fruit bowl), img-111 (sunset session), img-023 (dinner together). The copy block sits above the run in columns 1–6.
6. **Twelve rooms, one big family** — a 7/5 split: img-015 (double room, glass doors) large on the left at 3:2; img-064 (open-air bathroom with the palm) and img-012 (bungalow with hammock) stacked right at 3:2 each; body text below. The amenities as a plain three-column list, no icons.
7. **What guests say** — the rating set large ("8.6", then "out of 10 on Booking.com, 80 reviews, 28 Sep 2026" small), staff 9.5 / facilities 9.2 / cleanliness 9.2 as three plain figures, then four quotes in a staggered two-column set (Fanny, Myrthe, Abigail, Seagallas), author and source under each.
8. **The spot** — `spot` text beside the Rosa forecast (below), then "Getting here" distances as a short list beside img-072 (the round roadside sign) at 3:2, and a plain "Open in Google Maps" link. Check-in/out and the stay note.
9. **Closing** — full-bleed img-093 (pool at dusk) at 21:9 as a picture band, then on the white ground below it `closing` "Book the week for your level. Not sure which one fits? Ask us on WhatsApp first." with the primary action and WhatsApp side by side, then the contact footer (address, email, phone, socials).

**The first screen.** vid-009's 12 s cut fills the viewport (100svh, `object-fit: cover`, focal point on the pool, lower centre). Poster = vid-009-poster (pool deck in sun, AVIF 41 KB) — it paints first and is the LCP. No grade, no overlay tint; a 0→30 % black gradient in the bottom quarter only, for legibility. Header: "Global Surf Lodge Kabalana" small at left, the coral button at right. Low-left, in white: the name "Global Surf Lodge Kabalana" at display size (≈ 72 px desktop / 40 px phone, light weight), under it the tagline "Surf weeks for all levels on Sri Lanka's south coast, a few steps from the ocean.", under that the coral button "See the weekly surf packages and dates" and, beside it, the proof line "8.6/10 on Booking.com, 80 reviews" (date small). On a phone the button is full-width at the bottom of the hero (Kube pattern, #4).

**Why it beats the current site.** Their lodge page opens on a tractor from a video they may not own, a badge printed over the headline and a Messenger bubble on the text; this opens on their own sunlit drone shot landing on the pool, with the name, the place, a real rating and a button that goes straight to the packages. Below it the visitor sees what a week costs and what it includes within one scroll — something no page of theirs says at all.

**Colour** (sampled).
- Ground `#E3E4E9` — the white bungalow wall in shade, img-001.
- Ink `#011212` — the deepest shadow in the pool under the deck, img-005.
- Place colour, carried large: pool blue `#018DA8` — the pool in sun at water level, img-005. Used for the price figures on the level panels and for one full-width band that carries only the large rating figure (set in ink); never as a ground under body text.
- Booking accent, nothing else: coral `#F84825` — a surfer's coral top on a turquoise wave, img-138. Button text in ink `#011212` (contrast ≈ 6:1), never white. It continues the business's own coral CTA on globalsurf.com, now clean and saturated rather than dusty.
- Would look wrong beside: the current site's taupe ground and olive script headings, and any cream or sand ground — the pool blue turns grey next to warm neutrals.

**Type.** **Sora** alone (Light 300 for display, Regular 400 for body). Its wide, low-contrast, flat-sided letters repeat the lodge's architecture: long, low white volumes with shallow pitched roofs (img-012, img-036). Not a default-look face; not a gold-page face (Jost, Outfit, Urbanist are taken by gold and are not used anywhere in this file). Sentence case throughout, no labels above headings.

**Motion.** The hero video, and nothing else moves by itself. Hover: the level panels' photographs scale 1.00→1.03 inside their frame over 0.4 s. No parallax, no fades, no scroll effects (calm brief). `prefers-reduced-motion` / `Save-Data`: the poster only, never a video request. JS off: poster + all text + all links work. No WebGL anywhere.

**Booking pattern.** Kube's bottom-of-hero full-width mobile button + Morgan's Rock persistent bar (#4) + White Desert's price-on-card (#7), one accent (#6). The engine is the owner's; the site deep-links each level's product page so the chosen package survives (fixes audit F1/F3).

**Photographs.** Hero poster vid-009 (1920). img-002 (portrait 4:5, ≤ 800 px drawn). Level panels img-126 / img-125 / img-099 at 4:5, ≤ 600 px drawn each. Feature img-005 full-bleed (2000 source, srcset 1280/2000). Day run img-104 / img-011 / img-111 / img-023 at 4:5, ≤ 480 px each. Rooms img-015 (≤ 900 px), img-064, img-012. Spot img-072. Closing band img-093 (1536 source, drawn ≤ 1536 at 21:9 — within native width). All lazy below the fold, AVIF/WebP + JPEG.

**Forecast.** **Yes**, in section 8 beside `spot`. Mapping: dossier `location.spot` "South point" (one of the two spots the lodge overlooks, owner's words, ISA course page) → Rosa `south-point` "South Point", Kathaluwa, 5.98044 N 80.33978 E — same name, ≈ 260 m from the lodge's Google pin (5.98105, 80.34206). "The Rock" has no Rosa spot and is not shown as anything. Headline half in Sora on the white ground (wave height now, time, swell period + direction, wind + on/cross/offshore); Rosa's own widget **light theme** beside it. Lazy, reserved space, plain-link fallback "See today's forecast for South Point on Rosa". Credit "Forecast for South Point by Rosa". No second embed.

**Budget.** First load (phone): HTML + CSS ≈ 35 KB, Sora 2 weights subset ≈ 60 KB, poster AVIF 41 KB, JS ≈ 4 KB (video attach + bar). ≈ 0.15 MB. Video after first paint: m1280 webm 1.54 MB (phone) / d1920 webm 3.05 MB (desktop). Forecast: widget + one JSON, only near viewport.

**What would make this concept fail.** Being too polite: if the section rhythm under the hero is just "photo, text, photo", it reads as a nice hotel template and the visual critics will say "safe" — the feature band and the day run have to be genuinely big.

---

### Concept 2 · interactive — **"Pick your water"**

**The idea in one sentence.** The booking section is a stage where choosing your level changes the film: tap Fomies and the golden-hour beginner session plays, tap Riders and the barrel does — price, inclusions and the book link change with it.

**The one thing.** The water each level surfs, in the business's own footage: soft-top whitewater at golden hour (vid-010), green walls (img-125), the barrel (vid-002). The stage is the only loud element; the rest of the page is quiet white with the lodge's photographs.

**Structure.**
1. **Opening** — full-bleed vid-009 with a giant place word (see first screen).
2. **Next set is yours** — asymmetric: heading set large across columns 2–9 of a 12-column grid, body in a narrow column 9–12 with air around it (#10).
3. **Pick your water** (the booking section, "Pick your level" copy) — a **pinned media stage**, 100svh, full-bleed. Left 7 columns: the level's clip playing (poster first). Right 5 columns on the white ground, in the audit's order: the level switch (three large words "Fomies" "Rollers" "Riders", with "first time / can stand up / already carving" under each — from the copy block) → **$1,466 per person, 7 nights** (the date small) → the includes line → trust (8.6/10, 80 reviews) → "Book Level n" coral button (that level's product link). Tapping a level crossfades the clip (0.5 s) and swaps the right column; scrolling through the pinned stage also steps Level 1 → 2 → 3 (three scroll steps, each ≈ 60 vh), so it works without tapping. Clips: Level 1 = vid-010 cut; Level 2 = img-125 still with a slow 1.00→1.06 push-in (until a vid-003 cut exists); Level 3 = vid-002 cut. Only the selected level's clip is requested (m720 on phones, m1280 on desktop). Under the stage: Freestylers line (no price, own link), "One price, three levels" paragraph, primary action + WhatsApp + phone. Mobile: the stage stacks — clip on top at 4:5 (centre crop hides the corner badges), switch and details below, switch sticky at the top of the stage while it is in view.
4. **Feature** — full-bleed img-016 (the hair-flip spray arc over the pool), `featureLine` set over the sky part of the frame.
5. **Surf, breakfast, surf again** — a **pinned horizontal run** inside the vertical page (#18): six full-height photographs in sequence, each 4:5 at ≈ 70 vh, the day in order — img-118 (board overhead through the jungle), img-104 (walking to the surf), img-011 (fruit bowl), img-001 (daybed), img-111 (sunset session), img-023 (dinner). The copy block's two paragraphs sit as two short panels between photographs 1–2 and 4–5. Keyboard and reduced motion: it becomes a normal vertical stack; touch: native horizontal swipe with peek (#14).
6. **Twelve rooms, one big family** — Kube's hover list (#8 method, one photo): room-and-lodge features as a plain list on the right (from the rooms copy: air conditioning, ceiling fan, safe box, private toilet and shower, a socket next to each bed, a board rack; then pool, lounge, bar, kitchen), one photograph on the left that changes on hover/focus/tap: img-015, img-063, img-064, img-012, img-005, img-075, img-077, img-059. Default photo img-015. Tap on a phone swaps; no hover dependence.
7. **What guests say** — the three things Fanny names, as three photographs cropped to one ratio (3:2): img-064 (open-air bathroom), img-005 (the pool area), img-011 (the bowls), with her quote spanning above them; the rating block beside; the other quotes as a swipe row with peek.
8. **The spot** — `spot` + forecast (below) + Getting here with img-062 (top-down: the lodge between the coast road and the railway — which is literally the "getting here" picture) and the distances; Google Maps as a plain link.
9. **Closing** — the three level words repeated small as three direct product links, `closing`, primary action, WhatsApp, footer.

**The first screen.** vid-009 cut full-bleed, 100svh, poster first. Across the bottom, the word **"Kabalana"** set in white at full container width (≈ 22 vw, Barlow Condensed Light), bottom-anchored and **overlapping the pool** in the frame (White Desert #8 — one giant word over one good picture). Above it, small: "Global Surf Lodge Kabalana" and the tagline. Top-right in the header: the coral "See the weekly surf packages and dates" (on a phone: full-width coral button pinned to the bottom of the hero, above the word). Proof line "8.6/10 on Booking.com, 80 reviews" small beside the tagline. Nothing about levels or prices on this screen.

**Why it beats the current site.** Their site lists four level tiles with a heading over grey stock-dark photos and sends every tile to a page whose button loses the package; here the visitor watches the actual water of their level, sees the week's price and what it includes, and taps once into that level's booking. The first screen is their own lodge in sun with the place's name as big as the picture, instead of a tractor and a breadcrumb.

**Colour** (sampled).
- Ground `#FFFDFC` — the sunlit bungalow wall, vid-009 poster.
- Ink `#013C31` — the shaded inside of the barrel, img-099.
- Place colour, carried large: reef aqua `#4EC5D5` — the reef break seen from above, img-151. Used as the stage's level-switch underline and the full-width band behind the horizontal run's track (a picture context, never behind body text).
- Second place colour, small: sky `#6197E4` — the sky over the pool deck, vid-009 poster; only on the active level word.
- Booking accent, nothing else: coral `#F84825` — img-138, a surfer's coral top on a turquoise wave. Ink text on it.
- Would look wrong beside: the golden-hour grade of vid-010 if that grade leaked into the page chrome — it stays inside the clip; and beside any muted teal/petrol, which would make the aqua look dirty.

**Type.** **Barlow Condensed** Light for the giant word and headings, **Barlow** Regular for body — one family, two widths. The business's own wordmark, on its roadside sign (img-072) and on the end card of every film (vid-002, vid-003, vid-010), is set in tall condensed caps, "GLOBALSURF"; the condensed face carries that voice without copying the logo. The giant word is the only caps-height moment; headings are sentence case.

**Motion.** (1) The stage: clip crossfade 0.5 s on level change; right column text slides 16 px + fades 0.3 s. (2) The pinned horizontal run: scroll-scrubbed translateX, hand-written (IntersectionObserver + rAF, no GSAP). (3) Kube parallax (#17) on the feature photo: ±4 rem, desktop only. (4) The giant word drifts 0→12 px against the video on pointer move (desktop only). Reduced motion: posters only, no pinning, no drift, the run is a vertical stack, level change is instant. JS off: the stage shows all three levels stacked (each poster + details + link), the run is a stack, the hover list shows all rows with the default photo. No WebGL.

**Booking pattern.** White Desert's tile-tap choice (#2) + price on the offer (#7), but each choice is itself the 1-tap link to that product (the stage's coral button); persistent bar (#4) whose level switch is synced with the stage; one accent (#6). Optional, never in the way: under the stage, "Not sure which level?" opens a small side drawer (custom.md's slide-out, loaded on first interaction, #5) with three tap tiles — "Never surfed" / "I stand up, can't get out the back" / "I carve" / "Not sure" — ending in the prefilled WhatsApp link (#3). It is a plain `wa.me` link underneath.

**Photographs.** Hero poster vid-009. Stage: vid-010 poster (1920), img-125 (2000, drawn ≤ 1100 at 7/12 width), vid-002 poster (1920). Feature img-016 full-bleed (2000). Run: img-118, img-104, img-011, img-001, img-111, img-023 at 4:5, ≈ 70 vh tall (≤ 760 px drawn). Hover list: img-015, img-063, img-064, img-012, img-005, img-075, img-077, img-059 at 4:5 ≤ 640 px. Guests: img-064, img-005, img-011 at 3:2. Spot: img-062 (2000×1123).

**Forecast.** **Yes**, section 8, same mapping as Concept 1 (dossier "South point" → Rosa `south-point`, ≈ 260 m). Headline half in Barlow on the white ground; Rosa widget **light theme**. Lazy, reserved, plain-link fallback, one credit line. No second embed.

**Budget.** First load: ≈ 40 KB HTML+CSS, Barlow + Barlow Condensed subsets ≈ 80 KB, poster 41 KB, JS ≈ 18 KB (stage, run, bar, drawer boot on interaction). ≈ 0.2 MB. Video: hero m1280 webm 1.54 MB after first paint; each level clip 1.3–2.0 MB only on selection or when the stage scrolls into view (one at a time). Worst case with all three levels viewed on a phone ≈ 5 MB total over the visit — none of it on first load.

**What would make this concept fail.** The stage turns into a video player UI (buttons, progress, chrome) instead of a picture you choose — it must look like a film frame with three words beside it, and the Level 2 still must not read as "the one without a video"; the vid-003 cut would fix that.

---

### Concept 3 · unique — **"Waterline"**

**The idea in one sentence.** The lodge's photographers shoot at water level — the pool from its surface, the barrel from inside it — so the whole page moves through a live waterline: each new sequence rises into view through a refracting water surface instead of a cut.

**The one thing.** The waterline: the pool photographed at its surface (img-005, img-016, img-004), the over-under surf frames (img-099, img-100, img-131). It is the page's only device and it appears only at the joins between sequences; everything between the joins is still, white and quiet.

**Structure.**
1. **Opening** — vid-009 full-bleed, with the waterline lying across the bottom of the frame (see first screen).
2. **Next set is yours** — white ground, heading large, body in a narrow offset column (5 of 12, starting at column 7).
3. **Pick your level** — three full-bleed scenes in sequence, joined by the waterline: Level 1 = vid-010 cut (golden hour), Level 2 = img-125, Level 3 = vid-002 cut (the barrel). As the visitor scrolls, the next scene rises from below through a refracting surface (WebGL displacement of the incoming frame, 1 px ink line at the surface, ≈ 0.8 s of scroll). Each scene is one screen tall, holds for one screen, and carries on the white ground **beside or below it** (never on the video): the level name, who it's for, **$1,466 per person, 7 nights** + date, includes, trust figure, "Book Level n" coral. After Level 3: Freestylers line, "One price, three levels", primary action + WhatsApp + phone. Mobile: each scene is a 4:5 frame (100 vw) with the details below it on white; the transitions still rise.
4. **Feature** — img-005 full-bleed, the pool at water level, with `featureLine` sitting exactly on the photograph's own waterline (the line where the pool surface meets the frame) — the one place where type touches the device.
5. **Surf, breakfast, surf again** — a masonry of five photographs, each keeping its own height (hard constraint 5): img-118 (3:2), img-011 (3:2), img-024 (pineapple above the pool surface, 2:3 portrait — another water-level shot), img-111 (3:2), img-023 (3:2). Copy block in the column beside.
6. **Twelve rooms, one big family** — rises through the waterline from the pool into the lodge: img-026 (drone top-down of the pool and palm) full-bleed as the scene, then on white img-015, img-064, img-063 cropped 3:2 in a 3-up row, body text and amenities list below.
7. **What guests say** — rating set large on white, quotes in a two-column staggered set, img-016 (the hair-flip spray) as a 4:5 print beside them.
8. **Getting here** — the lodge between road and railway, img-062, then the distances and check-in/out, Google Maps link.
9. **Closing** — the last scene is img-093 (pool at dusk, lights on) rising through the waterline as a 21:9 picture band; below it on white, `closing` + primary action + WhatsApp, then the footer.

**The first screen.** vid-009 cut full-bleed, 100svh. Across the lowest ≈ 18 % of the frame lies a **live waterline**: below it, the same video refracted and tinted toward barrel green (a WebGL pass over the one video texture — no second video), with a single 1 px ink surface line that gently undulates. Above the line, in white on the picture: "Global Surf Lodge Kabalana", the tagline, the coral "See the weekly surf packages and dates" and the proof line "8.6/10 on Booking.com, 80 reviews". Scrolling lifts the waterline up the screen and the intro rises through it. On a phone the waterline sits at 22 % and the coral button spans the width just above it. The text is DOM, not canvas; the poster (vid-009-poster) is the LCP; the WebGL canvas starts after first paint over the poster.

**Why it beats the current site.** Their pages cut between tractor footage, dark stock-looking tiles and script headings with no link between them; this is one continuous piece of film where the lodge, each level's water and the week's price arrive in order, each through the same waterline — an idea their own photographers already shoot, finally used as the site's language. It is still one tap from the first screen to the packages, which their site cannot do.

**Colour** (sampled).
- Ground `#DDE5F0` — whitewater foam, img-110.
- Ink `#011212` — the pool's deepest shadow under the deck, img-005; also the 1 px surface line.
- Place colour, carried large (only inside the pictures and the underwater tint): barrel green `#027E82` — the wave face in the barrel, img-099.
- Second, small: sunset water `#F9BE8B` — the sea under the longboarder at sunset, img-111; used only as the tint of the waterline's highlight in the Level 1 scene (matches vid-010's golden hour).
- Booking accent, nothing else: coral `#F84825` — img-138. Ink text on it.
- Would look wrong beside: a dark page (the underwater tint must stay a picture, never a panel behind text — hard constraint 4) and beside warm cream, which would muddy the foam ground.

**Type.** **Archivo** (variable, width axis 62–125) alone. Titles in Archivo Expanded Light: wide and flat like a horizon line; body in Archivo normal width, Regular. As each scene rises through the waterline, its title's width eases from 100 to 112 — the letters flatten as they surface. Reason: the page is about one horizontal line; a face that can stretch along it is the only typographic move the page makes. Not default-look, not a gold face.

**Motion.** (1) WebGL waterline: one full-screen fragment shader, one video or image texture at a time, displacement from a procedural ripple (no texture download), scrubbed by scroll; ≈ 12 KB hand-written GLSL + JS (no three.js). (2) The width change of titles. (3) Hero surface undulation, 0.2 Hz, idle-paused when the tab is hidden. Nothing else moves. `prefers-reduced-motion`: no shader, no scrubbing; scenes are ordinary full-bleed posters/photos with a static 1 px ink line at each join. WebGL unavailable: the same transition as a 2D-canvas vertical wipe with a flat line; if that fails, the reduced-motion layout. JS off: posters + all text + all links, stacked.

**Booking pattern.** Price and book link on each level's scene (#7), persistent bar (#4) whose level switch jumps to the matching scene, one accent (#6), primary 1-tap link on the first screen and after Level 3. No drawer (the page's one idea is the waterline; a slide-out would be a second one).

**Photographs.** Hero poster vid-009. Level scenes: vid-010 poster, img-125 (2000, full-bleed allowed ≥ 1920), vid-002 poster. Feature img-005 full-bleed. Day masonry img-118, img-011, img-024, img-111, img-023 (≤ 700 px drawn each). Rooms scene img-026 full-bleed (2000×1123), then img-015, img-064, img-063. Guests img-016 4:5 ≤ 600 px. Spot img-062. Closing img-093 21:9 ≤ 1536 px.

**Forecast.** **No.** The spot section is replaced by "Getting here"; a widget card breaking the waterline sequence would be a second idea. `spot` text stays in "Getting here".

**Budget.** First load: ≈ 40 KB HTML+CSS, Archivo variable subset ≈ 70 KB, poster 41 KB, JS ≈ 30 KB (shader, scrub, bar). ≈ 0.2 MB. Video: hero m1280 webm 1.54 MB after first paint; vid-010 and vid-002 cuts loaded when their scene is one screen away, released after. GPU: one texture, one pass; on devices reporting `deviceMemory < 4` the shader runs at half resolution.

**What would make this concept fail.** If the waterline reads as a "liquid transition" effect from a template library — wobbly, glossy, too long — it will cheapen the footage; it must be thin, fast, and look like the edge of a real pool.

---

## 5. Divergence table

This run (`2026-09-globalsurf-02`) has one business. No other `concepts.md` exists in this run; divergence across businesses is therefore empty, and the three rows below must differ from each other on first-screen device (they share the archetype by rule).

| business | variant | archetype | first-screen device | grid | colour ground | motion idiom | booking pattern |
|---|---|---|---|---|---|---|---|
| Global Surf Lodge Kabalana | 1 · calm "Daybed" | the surf-week film | full-bleed video (vid-009), still title low-left | 12-col, centred 1200 px column with full-bleed photo breaks | `#E3E4E9` bungalow wall (img-001) | hero video only; hover scale | bottom-of-hero button + persistent bar; price on level panels; 1-tap product links |
| Global Surf Lodge Kabalana | 2 · interactive "Pick your water" | the surf-week film | full-bleed video (vid-009) + one giant place word overlapping the pool | asymmetric 12-col (7/5 stage), pinned horizontal run | `#FFFDFC` sunlit wall (vid-009 poster) | clip switching on a pinned stage; scroll-scrubbed horizontal run; ±4 rem parallax | level stage with per-level 1-tap book button, synced persistent bar, optional WhatsApp tile drawer |
| Global Surf Lodge Kabalana | 3 · unique "Waterline" | the surf-week film | full-bleed video (vid-009) with a live WebGL waterline across its foot | single full-bleed scene track + offset 5-col text column | `#DDE5F0` whitewater foam (img-110) | scroll-scrubbed WebGL waterline between scenes; variable-width titles | price + book link per level scene, persistent bar jumps to scenes |

No two rows repeat archetype + first-screen device.

Other businesses in this run: **none**, so there is nothing a visitor could confuse this site with inside the run. For the record, all three concepts differ from the voided run `2026-09-globalsurf-01` in the way that mattered: each opens on the lodge's own video, not a table, a sign or a line drawing.

---

## Hand-off checklist

1. All 198 photographs looked at (seven contact sheets); best usable width **2000 px** (img-005 et al.; 6000 px originals exist upstream for the capt_nir set). ✔
2. references.md read in full; cited: #2, #3, #4, #5, #6, #7, #8, #10, #13, #14, #17, #18, #20, #22, #26. ✔
3. Divergence table covers every business concepted in this run (only this one). ✔
4. Every concept's first screen: strongest media (vid-009), what + where (name + tagline), primary action, one proof point with source and date. ✔
5. Facts trace to dossier keys: price/includes `offers[0..2]`, rating `reviews.booking`, distances `location.distance_to_beach.others`, rooms/amenities `rooms`, `room_amenities`, `facilities`, spot `location.spot`, Rosa mapping via `location.lat_lng` + Rosa index (fetched 2026-09-28). ✔
6. Every colour carries hex + asset id + what it is. ✔
7. Default-look items: none used. Pool blue `#018DA8` and reef aqua `#4EC5D5` are saturated cyans taken from the pool and the reef, not a muted petrol/teal accent, and neither is used as an accent. ✔
8. Each concept names its one thing and nothing else on its page is louder. ✔
9. Every video listed; the three prepared cuts used; Level 2 clip gap stated. ✔
10. Each concept says why it beats the current site. ✔
