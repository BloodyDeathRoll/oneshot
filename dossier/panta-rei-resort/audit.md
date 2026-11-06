> **Not a fact source.** Nothing in this audit may appear on the site as content; facts come from `dossier.json` only.

# panta-rei-resort — audit (station 3b, auditor 0.1.3, 2026-11-06)

Scope **site**. Measured (`tools/funnel.mjs` 0.2.0, depth 3, 390×844): `https://www.pantareiresort.com/ — status 200, clicks_to_book 1, primary whatsapp (Whatsapp), hero - (CHECK AVAILABILITY, - tap to flow), CTA above fold true, pages 7, broken 0`.

The old funnel is short: "CHECK AVAILABILITY" on the first screen goes to the hotel's own engine, and a WhatsApp icon opens a prefilled chat. What leaks is everything a traveller wants to know **before** tapping: price, what each room is, the ratings, the restaurant and the surf-recovery massage.

## Findings

| # | Sev. | What a visitor meets | Evidence |
|---|---|---|---|
| F1 | medium | No room price anywhere; the engine says "Add dates for prices" | `funnel/walk/03-engine-suite.png`, /ourrooms |
| F2 | medium | All four room cards open with the same copied Booking.com sentence; sizes and beds only on the engine | `funnel/walk/04-ourrooms.png` |
| F3 | medium | "hello@pantareiresort.com" opens a mail to info@mysite.com (Activities) or to a gmail address (Contact, footer) | `funnel/walk/06-events-email.png`, `07-contact-email.png` |
| F4 | medium | First screen: photo, logo, "CHECK AVAILABILITY", icons; nothing says boutique resort / Kabalana; ~140 words on the whole home page | `funnel/walk/01-home-fold.png` |
| F5 | medium | Ratings not shown (Google 4.7/213, Booking 9.2/468); engine shows stale 4.8 / 9.1 | /restaurant, `funnel/walk/02-engine-home.png` |
| F6 | medium | Menus, class prices and the "Surf Therapy Massage" exist only as PDFs | the three PDF URLs |
| F7 | medium | Explore is an embedded stock-photo "Things to Do" block, which also loads on Restaurant on phones | `funnel/walk/05-explore.png`, `08-restaurant.png` |
| F8 | medium | ~15.7 MB before scrolling, nine outside hosts (incl. error tracking, visitor analytics) | `funnel/landing-fold.png`, `dossier.json#existing_site.first_load` |
| F9 | low | Footer link "room" opens the in-house guest booklet | PDF URL, click path `/ → room` |
| F10 | low | Facebook lists a different phone and email | Facebook page |
| F11 | low | Engine logo link broken (`holidayfuture./`), no way back to the site | `funnel/walk/02-engine-home.png` |

Lead the pitch with **F2** (rooms that all read the same), **F5** (the scores they earned, not shown) and **F1** (no idea of price before the engine). F3 and F8 back them up. F9 is for the owner privately: the PDF publishes the guest Wi-Fi password.

## Recommended funnel

1. Primary action: **engine** (the hotel's own direct engine), working label "Check dates and book direct".
2. Secondary: WhatsApp +94 72 800 3022 (prefilled), tel.
3. Clicks target: ≤ 2 (deep links to each room page on the engine make it 1).
4. Booking section / persistent bar order: what & where → price (link to live dates) → what's included → trust (ratings) → action.
5. Offer: four room types by size and their one distinct thing (pool-view balcony, outdoor bath, private plunge pool), breakfast included; then live dates.
6. Restaurant (hours, menu), fitness club (schedule, prices), massage, pool day pass as text on the page.
7. Ratings with source and capture date; reviews verbatim.
8. Hero: the business's own aerial film, poster first (playbook §1a, §4 budget).
9. Closing: send the reader to live dates on the direct engine, WhatsApp for questions.
10. Off-site advice: one contact set on Facebook (F10); fix the engine logo and rating line (F11); take the guest booklet off the public site (F9).

Note: playbook §5 puts WhatsApp first where it exists; the dossier records the engine as the path because the hotel pushes "book direct" on every screen. The concept stage may flip it.

## Not measurable

Engine room prices (need dates; calendar did not respond to automation) · conversion and reply time (test mode) · TripAdvisor (403) · throttled LCP.
