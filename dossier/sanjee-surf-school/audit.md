This audit is not a fact source for the site. Nothing below may appear on the site as content.

# Audit: Sanjee Surf School, Weligama (run 2026-10-midigama-01, auditor 0.1.3, 2026-11-05)

Scope: **site**. `tools/funnel.mjs` 0.2.0 ran on https://sanjee-surf.com/ at depth 3 and 390×844, capped at 12 pages to keep the load light. Its line, verbatim: `status 200, clicks_to_book 1, primary dated_form (form (4 fields)), hero - (Book Your Lesson →, - tap to flow), CTA above fold true, pages 12, broken 0` (`funnel/funnel.json`, `funnel/landing-*.png`).

**That 1 is not a booking.** The tool's "dated form" sits 14,236 px down the page and is the spot finder ("Get my recommendations"). The hero button has no href, so the tool cannot follow it. The real path is the dialog in F1: five taps, three typed fields, a tick, then "Pay $8 Now". `measured` in `audit.json` keeps the tool's numbers as they came, and F1 carries the correction.

Hand walk at the same viewport (iPhone UA, no login, no cookies of ours, nothing typed, nothing submitted, writes aborted by a route guard): the home page, the booking dialog up to its unfilled last step, six other pages, the Google listing and the three social links. Output: `funnel/walk-hand.json`, `funnel/walk/*.png`. Recipe: `funnel/make-walk.sh` and `funnel/walk.mjs`.

This is not a weak-presence site in the usual sense. See "What already works" below: the case for a new site rests on visible errors and contradictions, not on a missing funnel.

## Findings

No finding is high: a visitor who wants to book or ask can do so, by the dialog, by the form, or by WhatsApp on other pages.

- **F1 · medium · funnel · pitch.** Booking takes five taps, three typed fields and a card payment, with no WhatsApp or phone link in the dialog. Evidence: [step 1](funnel/walk/11-wizard-1-after-hero.png), [step 2](funnel/walk/11-wizard-2-type.png), [step 3](funnel/walk/11-wizard-3-offer.png), [date](funnel/walk/11-wizard-4-date.png), [details](funnel/walk/11-wizard-5-slot.png)
- **F2 · medium · contact · pitch.** The 30,387 px home page has no tel: or WhatsApp link, says "Tropical Beach, Paradise Coast", and prints an email on a domain with no mail record. Evidence: [funnel/walk/07-home-contact-block.png](funnel/walk/07-home-contact-block.png), [funnel/walk/05-home-all-private.png](funnel/walk/05-home-all-private.png)
- **F3 · medium · cta · pitch.** The home page has no menu on a phone and no booking action that stays on screen; rentals, FAQ and About are only in the footer, about 29,700 px down. Evidence: [funnel/walk/01-home-fold-settled.png](funnel/walk/01-home-fold-settled.png), [funnel/walk/02-home-scroll-3000.png](funnel/walk/02-home-scroll-3000.png), [funnel/walk/08-home-footer.png](funnel/walk/08-home-footer.png)
- **F4 · medium · mobile · pitch.** About six seconds after loading, a red "Could not refresh surf conditions" box covers the top of the first screen for about five seconds, and the surf report says "Live data temporarily unavailable". All 3 fresh loads showed it. Evidence: [funnel/walk/01-home-toast.png](funnel/walk/01-home-toast.png), [funnel/landing-fold.png](funnel/landing-fold.png), [funnel/walk/04-home-surf-report.png](funnel/walk/04-home-surf-report.png)
- **F5 · low · mobile.** The cookie notice stays over the bottom 180 px of every screen, and its button is cut off on the first one. Evidence: [funnel/walk/01-home-fold-settled.png](funnel/walk/01-home-fold-settled.png), [funnel/walk/02-home-scroll-3000.png](funnel/walk/02-home-scroll-3000.png)
- **F6 · medium · content · pitch.** The first screen names neither the business nor Weligama, and its photograph is an empty infinity pool. Evidence: [funnel/walk/01-home-fold-settled.png](funnel/walk/01-home-fold-settled.png)
- **F7 · medium · offer · pitch.** Home says $40 and $50, all private; the price answer says around 25 USD for a group and around 45 USD private. Evidence: [funnel/walk/05-home-all-private.png](funnel/walk/05-home-all-private.png), [funnel/walk/22-faq-lesson-price.png](funnel/walk/22-faq-lesson-price.png)
- **F8 · medium · trust · pitch.** Terms and FAQ give two cancellation policies for the same deposit. Evidence: [funnel/walk/24-terms-cancellation.png](funnel/walk/24-terms-cancellation.png), [funnel/walk/23-faq-cancellation.png](funnel/walk/23-faq-cancellation.png)
- **F9 · medium · trust · pitch.** 500+ and 2,000 students in one card, 3,000+ on About; years move as well. Evidence: [funnel/walk/06-home-stats.png](funnel/walk/06-home-stats.png), [funnel/walk/25-about-students.png](funnel/walk/25-about-students.png)
- **F10 · medium · trust · pitch.** Reviews have no names and most read "1 week ago", where Google shows months; the badge gives no count. Evidence: [funnel/walk/06-home-review-dates.png](funnel/walk/06-home-review-dates.png), [funnel/walk/06-home-google-badge.png](funnel/walk/06-home-google-badge.png), `dossier.json#reviews.quotes`
- **F11 · medium · offsite · pitch.** Instagram, Facebook and YouTube links lead nowhere for a logged-out visitor, and the rental page still says "or message us on Instagram". Evidence: [funnel/walk/31-instagram.png](funnel/walk/31-instagram.png), [funnel/walk/32-facebook.png](funnel/walk/32-facebook.png), [funnel/walk/33-youtube.png](funnel/walk/33-youtube.png), [funnel/walk/20-rental-instagram-line.png](funnel/walk/20-rental-instagram-line.png)
- **F12 · medium · offer.** Rental deposit, swap and card terms differ between the rental page and the FAQ. Evidence: https://sanjee-surf.com/surfboard-rental-weligama, https://sanjee-surf.com/faq/is-there-a-deposit-for-board-rental, `dossier.json#contradictions`
- **F13 · medium · offer.** Tuk-tuk prices and inclusions differ across the site and within /tuktuk. Evidence: https://sanjee-surf.com/tuktuk, https://sanjee-surf.com/faq/how-much-does-a-tuk-tuk-safari-cost, `dossier.json#contradictions`
- **F14 · medium · offsite.** Google says 9 to 5, while the dialog sells a 6:00 AM lesson and the site gives two other sets of hours. Evidence: `dossier.json#hours_candidates`, [funnel/walk/11-wizard-4-date.png](funnel/walk/11-wizard-4-date.png), [funnel/walk/07-home-contact-block.png](funnel/walk/07-home-contact-block.png)

## Two things the earlier stations recorded differently

- **The red box (F4) is not caused by repeated page loads.** The page itself calls `surf-conditions` in a loop, about every 130 ms, until the server answers 429: 41 calls then a refusal at 09:10 UTC, 32 then a refusal at 09:24 UTC, each on a single load with quiet minutes before it. In the script bundle, each successful answer changes the callback the effect depends on, so it fetches again; only an error stops it. The dossier's "when its data fails it still shows a top rating" also needs correcting: the 5/5 comes from the function's successful answers, and the "unavailable" line comes from the page's own 429. Not tested from another network or on a real phone.
- **The sideways scroll is short-lived.** The page is 417 px wide on load, until the About section has slid in. After scrolling it is 390 px, and the inner pages load at 390. This was the scout's only measured fault (`presence.criteria: not_mobile`).

## What already works, and a new site must not lose

Not findings; for the concept and the writer. A booking button above the fold. Prices on the home page, with no "contact us for prices". Live dates and five named slots. A clear split of $8 now and $32 cash, stated before paying. The first load is 1.18 MB, with LCP 2.1 s and CLS 0 (one unthrottled run, `assets/old-site.json`). The only reviewer who says how he booked says "through the website", and that reviewer's quote is marked `do_not_use`, so it is weak evidence.

## Playbook §2: where the old site answers each question

| Question | Old site |
|---|---|
| What and where | Not on the first screen (F6). The tab title says both; on the page the place comes further down, and the contact block has a placeholder (F2) |
| Level | Hero sentence "From beginners to advanced"; only the Beginner Lesson card names a level |
| Cost | Home page cards from 2,522 px; contradicted elsewhere (F7, F13) |
| Included | Card bullets, and the home page FAQ |
| Spot / season | Home page and /surfing-weligama; the surf report's fault is F4 |
| Trust | Review block, Sanjee's card, About page; the numbers disagree (F9, F10) |
| Languages | /about: "Sinhala, English, basic Tamil" |
| How to book | The hero button and dialog (F1); WhatsApp only on other pages (F2) |

## Recommended funnel

1. Primary action: **whatsapp**, which equals `dossier.booking.path`. `contact.whatsapp`, prefilled with the lesson and date (playbook §5).
2. Working label: "Message Sanjee on WhatsApp about a lesson". The copywriter writes the final label.
3. Clicks to book: **1**.
4. Secondary actions: `tel` (`contact.phone`, on the Google listing) and `email` (`contact.email`, the address on /faq).
5. Order of the booking section and persistent bar: what_where → level → price → included → trust → primary_action. The first screen needs only what and where plus the action, over the strongest photograph.
6. Offer: `lessons[]`, then `rentals[]`, then the tuk-tuk tours as `priceList[]` rows, each once, as the owner confirms them (F7, F12, F13).
7. Facts held back until the owner picks: cancellation policy (F8), hours (F14), student and experience numbers (F9).
8. Trust: `ratings[]` with the Google count and capture date, `testimonials[]` verbatim with names and dates (F10).
9. Closing intent: send the reader to WhatsApp with the lesson and date they want, and name the phone as the other way in.
10. Off-site advice: set Google's hours to the real ones (F14); reopen the social accounts or remove their links (F11).

**For the human, not decided here.** Playbook §5 and auditor constraint 6 fix the primary action at the dossier's `whatsapp`, and rule out payment capture on the site. So the new site gives up what the old one has now: live slots and a deposit taken online. WhatsApp is also the channel nobody has seen answered (no message sent in test mode). If the owner wants to keep the dialog, that is a `bookingLinks[]` entry and an `engine` primary, and it needs the old site to stay up at a URL of its own, since the dialog has no deep link. The owner-identity question in `flags_for_operator` stands and sits with this one: whoever built the dialog may be the person the pitch is addressed to.

## Not measured

- Stripe checkout and whether the $8 payment completes: the walk stopped at the unfilled details step.
- Whether WhatsApp, the phone or the email is answered, and how fast: no contact in test mode.
- Whether the contact form delivers: not submitted.
- A lesson card's own Book Now: not walked. The `lesson card Book Now` step in `walk-hand.json` is marked void.
- The red box from another network or on a real phone.
- `tools/funnel.mjs` stopped at 12 pages, 11 of them blog posts; the harvester checked all 67 sitemap URLs, and the WhatsApp pages were opened by hand.
- Google on a phone beyond the app prompt; the 8 reviews behind sign-in; Tripadvisor (403); X (login).
- Conversion and traffic: no analytics access.
