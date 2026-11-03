# cheeky-monkey — run 2026-10-midigama-01 (test)

State: **critiqued(1), FAIL** (2026-11-03). 4h SEO and 4i AI SEO done (look unchanged; preview noindex rule added). Station 5 round 1: critic 65.1/75 with a hard fail (funnel.mjs reads the header phone icon as the primary action; Booking.com must come first), visual-critic 7/10 (hard fail <8), experience-critic 8/10; all three: clearly better than the current site. Reports: `reports/2026-10-midigama-01/cheeky-monkey{,.visual,.experience}.md`. Next: designer fix round (back to 4f/4g per PLAN), then critique round 2.

**Waiting on Alon:** both visual reviewers want the drawn cartoon beach on the first screen toned down or replaced by a real photo; Alon asked for that background at gate b. Options put to him: keep as is / keep but blend in the camp's own surf photos / replace with a muted real photo. Do not change the hero until he answers. All other must-fixes (video zoom end frame, own surf photo leading 'Down at the water', package cards, font-display swap, a11y role=group + 4.44 contrast, JS-off header, Booking.com first in the header) can go to the designer.

Open for Shahar: CC BY-SA stock-003 is allowed by PLAN §9 but excluded by rubric.md — the critic flagged the conflict. Online preview still needs Cloudflare auth (~/.oneshot/cf-token or wrangler login).

- Cheeky Monkey Surf Camp, Midigama East, +94719248686. Type `surf_camp` (own site sells lessons and weekly packages; also 5 room types on Booking.com and a big board shop).
- Dossier: `dossier/cheeky-monkey/dossier.json` + `sources.md`; 136 sourced facts, 163 images (156 business-owned), 9 videos, 15 gaps, none blocking. Media (492 MB) is local: `media/cheeky-monkey.tsv`.
- The scout missed its own site, an Instagram (15.3K) and a Facebook page (7K). The site renders 470 px wide on a 390 px phone, has no tap-to-call or WhatsApp, PHP warnings and raw shortcodes: still about a 2, inside the threshold.
- Shares its phone and owner with Surf Swell Hostel (the owner's own page names "our two shops"). Kept as separate businesses.

Open (human decisions):
- Status: Facebook says the Midigama shop, rooms and restaurant are closed for low season (owner in Arugam Bay); the site banner (May 2025) says rooms are not bookable. Booking.com reviews run to Sept 2026, Instagram posted from the shop Oct 2026.
- All prices are from 2021 pages; no rental prices anywhere.
- Hero video is weak (vertical, in-shop reel vid-009). The best footage, a 2018 drone film (vid-001), is on a friend's channel: licence unknown, ask the owner.
- Owner name conflicts: "Baba" Pasindu Delgodage (2021 press) vs the Dodangoda family (own site).

Audit (`dossier/cheeky-monkey/audit.json` + `audit.md`): scope `site`, 14 findings (3 high, 10 medium, 1 low), 10 pitch points. Lead with: no booking action on any of the 8 menu pages (F1); a "rooms aren't bookable" banner while Booking.com sells them (F3); prices hidden on unlinked pages (F2). Recommended primary action `engine` (Booking.com), 1 tap; secondary tel + email.
- Harvester follow-up (same day) added the auditor's facts to the dossier: enquiry shortcode is not a link, 16 PayHere links, A/C add-on and extra-room rates (US$ 20 vs 22$ conflict on the non-A/C double), Facebook "Always open".

Copy (`sites/cheeky-monkey/copy/`): en.json, sources.md, humanizer-notes.md, review.md. Left out on purpose: open/closed status, room rates without a unit, the 20-vs-22 double, PayHere links, contradicted owner names, "biggest"/"oldest". All prices labelled 2021. The 2021 A/C add-on row was dropped (Alon delegated the call; it conflicts with Booking.com's "A/C in every room"). Reviewer notes for the build: keep "published in 2021" next to the lesson prices; `contact.whatsapp` is "" and should be null.

Concepts + mockups: archetype "walk in off the main road" (`sites/cheeky-monkey/concepts.md`). calm "The signboard" (img-147 main-road photo, red fin button), interactive "The wall of boards" (vid-009 as three columns, Plan-your-stay panel, magenta button), unique "Pick your board" (vid-009 in a WebGL board-shaped window, zoom-through, blue button). All pass check-design, check-places and scroll CLS. View the unique one over http (`node tools/serve-mockups.mjs`), not from disk, or WebGL loses the video. Run pins for creative-director, designer and the two critics were bumped to current before they ran (2026-10-26).

Build (`sites/cheeky-monkey/final/`): first load 388 KB, LCP 1.47 s, CLS 0. Schema gaps (not owner-editable today) in `src/gaps/gaps.json`: hero where-line, room galleries, announcement line, package groups, the lesson price date, stock credit, socials, SEO title. Atmosphere: stock-003 (Maaike Hage, CC BY-SA 3.0) shown whole with credit; a proposal to widen atmosphere sources and allow atmosphere video is PR #44 (Shahar).
