# cheeky-monkey — run 2026-10-midigama-01 (test)

State: **mocked** (2026-10-27; designer 0.7.0, three mockups). Waiting at gate b: a human keeps 1–3 mockups (each kept one becomes its own site).

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
