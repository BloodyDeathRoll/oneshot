# sea-you-surfers-nest — run 2026-10-midigama-01 (test)

State: **packaged** (2026-11-25), waiting at **gate c** for Alon/Shahar to send. Nothing has been sent to the business.

- Preview: https://sea-you-surfers-nest.os1.workers.dev (Worker version e1549c19; noindex, robots Disallow, no sitemap)
- Proposal: https://sea-you-surfers-nest-proposal.os1.workers.dev (version e71f1f91)
- Message, not sent: `sites/sea-you-surfers-nest/pitch/message.en.whatsapp.md` (559 chars); sender's checklist in `pitch/notes.md`

Path: replaced colonial-surfing-villa at gate a (2026-11-22; colonial voided by Alon over two Booking reviews alleging inappropriate host behaviour toward solo female guests) → harvest (82 business-owned photos, no video) → audit (no_site, 9 findings) → copy (4c failed r1 on 2 sentences, passed r2; closing "call" clause dropped while the phone is unconfirmed) → concepts ("the inventory: the house, thing by thing") → 3 mockups → 4f in 3 rounds (calm passed r2; interactive and unique r3) → **gate b: Alon kept interactive "In the palms" only** ("i like the interactive one"; also accepted calm's grey-graded fire extinguishers, moot now) → 4g Astro port (`final/`) → 4h seo → 4i aiseo → station 5 round 1 PASS (critic 78.0/80, visual-critic 8, experience-critic 8) → preview → pitch.

## Business
Sea You Surfers Nest, 151 Weliwaththa Rd, Midigama 80650. Bed and breakfast, 7 double rooms (Deluxe 13 m², Standard 12 m²), sleeps 14; only one room has air conditioning. Host Ashly (Airbnb Superhost). Google 4.9 (11), Booking.com 8.0 (8), Airbnb 5.0 (10), dated 21 Nov 2026. Listings: Booking.com 14923256, Agoda 79261807, Airbnb 1508895627217411616 (rooms) and 1793988904511877292 (whole house). "Surf sick" at the same street number is a separate operation.

## Open — human decisions before sending (gate c)
- **Phone unconfirmed.** +94715880052 was read off the street sign (img-001) only. The site ships with `PHONE_CONFIRMED`/`TEL_CONFIRMED = false`: no tel: links, no number in any text file (it is readable on the sign photo itself). The message goes to that number on WhatsApp/SMS and asks whether it is the right one. Check a WhatsApp account exists before sending; Airbnb "Message host" is the fallback, the humans' call.
- **Host conduct, for the humans only:** two non-safety complaints in guest reviews (a refused two-night refund; "counted every cent"). Not in the pitch.
- Owner questions on the proposal: check-in (Booking/Agoda 14:00–18:00 vs Airbnb after 15:00), breakfast in the rate, which room has A/C and which have their own bathroom, the five amenities in the data but not on the page (parking, shuttle, laundry, toiletries, cameras), AI-crawler policy.

## Known issues
- `tools/site-check.mjs` performance fails on the live preview (LCP 2.5–2.9 s vs 2.5) only because its Playwright route (`engineAbort`, ~line 604) slows image delivery from the Worker; route-free live LCP is 1.1–1.2 s, local 1.4 s. Tool fix to propose.
- Non-blocking polish: show the five hidden amenities; at 768 px the Deluxe description sits 14 px from the edge; with JS off the phone booking bar shows on the first screen.
- Schema gaps (business-type wording, room count line, host name, booking-link roles, per-room features, room galleries, short CTA label) in `final/src/gaps/gaps.json`.
- Tokens: about 11.5M for this business through packaging (usage.jsonl), inside the 14M budget.
