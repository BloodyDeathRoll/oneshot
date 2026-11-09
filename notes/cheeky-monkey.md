# cheeky-monkey — run 2026-10-midigama-01 (test)

State: **packaged** (2026-11-04), waiting at gate c for Alon to send: proposal https://cheeky-monkey-surf-camp-proposal.os1.workers.dev, messages in sites/cheeky-monkey/pitch/ (the pitch asks the owner to confirm the vid-001 footage rights). Preview: https://cheeky-monkey-surf-camp.os1.workers.dev (Oneshot Cloudflare account, Worker version e59d7492; 71 files byte-identical, noindex, robots Disallow, no sitemap). Passed round 3 at 92.7 under the current rubric; Shahar's rubric 0.3.2 normalisation (x100/105, PR #69, merged) makes it 88.3, still a pass. Note: the phone number and owner are shared with Surf Swell Hostel; that number would receive both pitches if both are sent.

Forecast (Alon, 2026-11-04): the Rosa forecast block for Rams (rosaSpotId `rams`, the closest Rosa spot to the guesthouse pin, ~360 m; never called their break) was added after packaging and the preview redeployed at the same URL (version 285bbed4; 71 files byte-identical, noindex, no sitemap; site-check acceptance 10/10 incl. forecast-block). No re-critique was run; the proposal page screenshots predate it.

Hero (Alon, 2026-11-04): the cartoon beach is gone; the first screen is a 6.2 s drone loop over Midigama cut from vid-001 (Lorenzo Marzocca's 2018 promo film for the guesthouse), credited in the footer. Its licence is unknown: **Alon waived the PLAN §9 hard fail for the workers.dev preview only** ("i accept it as an exception for the preview. and make the last fixes."). The owner must confirm the rights at pitch, or the hero switches to business-owned media before go-live. Shahar accepted the waiver for the workers.dev preview only (2026-11-04); his PLAN §9 amendment is proposed in PR #69, not merged. stock-003 is no longer used.

Optional polish (reported in round 3, none blocking): pause control for the videos (WCAG 2.2.2), the board-reel load race in site.js, rating cards shift with the review slider, img-100 sky crop, one lead package card, closing board size. Reports: `reports/2026-10-midigama-01/cheeky-monkey{,.visual,.experience}.md`.

- Cheeky Monkey Surf Camp, Midigama East, +94719248686. Type `surf_camp` (own site sells lessons and weekly packages; also 5 room types on Booking.com and a big board shop).
- Dossier: `dossier/cheeky-monkey/dossier.json` + `sources.md`; 136 sourced facts, 163 images (156 business-owned), 9 videos, 15 gaps, none blocking. Media (492 MB) is local: `media/cheeky-monkey.tsv`.
- The scout missed its own site, an Instagram (15.3K) and a Facebook page (7K). The site renders 470 px wide on a 390 px phone, has no tap-to-call or WhatsApp, PHP warnings and raw shortcodes: still about a 2, inside the threshold.
- Shares its phone and owner with Surf Swell Hostel (the owner's own page names "our two shops"). Kept as separate businesses.

Open (human decisions):
- Status: Facebook says the Midigama shop, rooms and restaurant are closed for low season (owner in Arugam Bay); the site banner (May 2025) says rooms are not bookable. Booking.com reviews run to Sept 2026, Instagram posted from the shop Oct 2026.
- All prices are from 2021 pages; no rental prices anywhere.
- vid-001 drone footage (licence unknown) is now the hero under Alon's preview waiver: ask the owner at pitch.
- Owner name conflicts: "Baba" Pasindu Delgodage (2021 press) vs the Dodangoda family (own site).

Audit (`dossier/cheeky-monkey/audit.json` + `audit.md`): scope `site`, 14 findings (3 high, 10 medium, 1 low), 10 pitch points. Lead with: no booking action on any of the 8 menu pages (F1); a "rooms aren't bookable" banner while Booking.com sells them (F3); prices hidden on unlinked pages (F2). Recommended primary action `engine` (Booking.com), 1 tap; secondary tel + email.
- Harvester follow-up (same day) added the auditor's facts to the dossier: enquiry shortcode is not a link, 16 PayHere links, A/C add-on and extra-room rates (US$ 20 vs 22$ conflict on the non-A/C double), Facebook "Always open".

Copy (`sites/cheeky-monkey/copy/`): en.json, sources.md, humanizer-notes.md, review.md. Left out on purpose: open/closed status, room rates without a unit, the 20-vs-22 double, PayHere links, contradicted owner names, "biggest"/"oldest". All prices labelled 2021. The 2021 A/C add-on row was dropped (Alon delegated the call; it conflicts with Booking.com's "A/C in every room"). Reviewer notes for the build: keep "published in 2021" next to the lesson prices; `contact.whatsapp` is "" and should be null.

Concepts + mockups: archetype "walk in off the main road" (`sites/cheeky-monkey/concepts.md`). calm "The signboard" (img-147 main-road photo, red fin button), interactive "The wall of boards" (vid-009 as three columns, Plan-your-stay panel, magenta button), unique "Pick your board" (vid-009 in a WebGL board-shaped window, zoom-through, blue button). All pass check-design, check-places and scroll CLS. View the unique one over http (`node tools/serve-mockups.mjs`), not from disk, or WebGL loses the video. Run pins for creative-director, designer and the two critics were bumped to current before they ran (2026-10-26).

Build (`sites/cheeky-monkey/final/`): first load 388 KB, LCP 1.47 s, CLS 0. Schema gaps (not owner-editable today) in `src/gaps/gaps.json`: hero where-line, room galleries, announcement line, package groups, the lesson price date, stock credit, socials, SEO title. Atmosphere: stock-003 (Maaike Hage, CC BY-SA 3.0) shown whole with credit; a proposal to widen atmosphere sources and allow atmosphere video is PR #44 (Shahar).

Review fixes (PR #68, 2026-11-06): pitch page and message corrected (4 menu pages, room types, forecast named, party night, dinners and payment added to the owner's list); `.handoff[hidden]` CSS fix so the Plan a stay box stays closed until a room is picked. Both the proposal and the preview need it. Redeployed 2026-11-06 from main: proposal version a75ae6cb, preview version b3b92862 (71 files byte-identical; the only change is the one CSS rule; noindex, no sitemap; site-check acceptance ok). The Rosa forecast still hasn't been re-scored.

**Hold the pitch (verification 1, 2026-11-06): FAIL 81.9/100** on the live preview with the forecast block; visual 7.5, experience 7 (8 without the micro-animation cap), critic 68.5/80. Fix list in the reports. Open for a human: whether the cap covers small text links; the nearest-spot Rams forecast against rule 9 and schema v0.3 (the dossier has no Rams, and `concepts.md` still says "Forecast: no"). The proposal screenshots still predate the forecast: re-shoot after the fixes.
