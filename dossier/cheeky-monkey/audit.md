This audit is not a fact source for the site. Nothing below may appear on the site as content.

# Audit: Cheeky Monkey Surf Camp, Midigama (run 2026-10-midigama-01, auditor 0.1.3, 2026-10-26)

Scope: **site**. `tools/funnel.mjs` 0.2.0 ran on https://cheekymonkeymidigama.com/ at depth 3 and 390×844. Result: status 200, clicks_to_book none found, primary action none, CTA above fold false, 8 pages crawled, 0 broken (`funnel/funnel.json`, `funnel/landing-*.png`).

Hand walk at the same viewport (iPhone UA, logged out, read-only): the site, including the pages the menu does not reach, then the Google listing, Booking.com, Instagram and Facebook. Output: `funnel/walk-hand.json` and `funnel/walk/*.png`; the recipe is `funnel/walk.mjs`. Booking.com was also shot with `tools/shoot.mjs` (`funnel/shots/booking-com/`).

The menu reaches four pages: Home, About us, Surf Shop & Activities and Contact us. None of them has a booking action or a price. The prices, the packages and the old booking buttons are on pages nothing links to.

## Findings

- **F1 · high · cta · pitch.** A visitor cannot book a room, a lesson or a package from any page the menu reaches. The only actions are an email link 5,360 px down the page and "Contact". Nothing leads to Booking.com, where the rooms are sold. Evidence: [funnel/landing-fold.png](funnel/landing-fold.png), [funnel/walk/01-home-menu-open.png](funnel/walk/01-home-menu-open.png)
- **F2 · high · offer · pitch.** The site does publish lesson, weekly-package and B&B prices, but only on /our-services/ and /surf-camp-packages-sri-lanka/. No menu item links to them, and on the packages page the price table sits inside a closed "Prices" accordion. All of these prices date from 2021. Evidence: [walk/03-our-services-lesson-price.png](funnel/walk/03-our-services-lesson-price.png), [walk/04-packages-price-table.png](funnel/walk/04-packages-price-table.png)
- **F3 · high · content · pitch.** Right under the hero, a banner says the rooms "aren’t bookable right now", while Booking.com sells them and has reviews of stays up to Sept 2026. Evidence: [walk/01-home-renovation-banner.png](funnel/walk/01-home-renovation-banner.png), [Booking.com](https://www.booking.com/hotel/lk/cheeky-monkey.en-gb.html)
- **F4 · medium · contact · pitch.** The phone number is plain text 5,410 px down the page, so tapping it does nothing. No page on the site has a tel: or WhatsApp link. Evidence: [walk/01-home-phone-text.png](funnel/walk/01-home-phone-text.png)
- **F5 · medium · contact · pitch.** Where the contact form should be, the page shows raw `[contact-form-7 id=”117″]` text, and the booking page shows `[ninja_form id=”2″]`. Evidence: [walk/02-contact-shortcode.png](funnel/walk/02-contact-shortcode.png), [walk/05-booking-surf-camp-shortcode.png](funnel/walk/05-booking-surf-camp-shortcode.png)
- **F6 · medium · funnel · pitch.** Under "Reservation Enquiry!!" the visitor sees raw `[button2 … booking.com …]` text instead of a button. Evidence: [walk/03-our-services-reservation-enquiry.png](funnel/walk/03-our-services-reservation-enquiry.png)
- **F7 · medium · funnel.** Each of the 19 "Book Now" buttons on the packages page goes straight to a PayHere payment link, with no way to ask a question first. We could not see the payment page: the first link stopped at a Cloudflare check. Evidence: [walk/04-packages-price-table.png](funnel/walk/04-packages-price-table.png), [walk/04b-packages-book-now-target-fold.png](funnel/walk/04b-packages-book-now-target-fold.png)
- **F8 · medium · mobile · pitch.** On a 390 px phone the pages lay out 445–577 px wide. The email address and the price table are cut off at the right edge. Evidence: [walk/01-home-phone-text.png](funnel/walk/01-home-phone-text.png), [walk/04-packages-price-table.png](funnel/walk/04-packages-price-table.png)
- **F9 · medium · mobile · pitch.** A nine-line PHP "Notice … /home/cheekymo/public_html/…" fills the top of every page, above the logo. Evidence: [funnel/landing-fold.png](funnel/landing-fold.png)
- **F10 · medium · trust · pitch.** The site shows no rating and no review, although Google has 4.5 (467) and Booking.com 8.3 (45). Evidence: [funnel/landing-mobile.png](funnel/landing-mobile.png), `dossier.json#reviews`
- **F11 · medium · mobile.** The first mobile load is 3.07 MB against a 1.5 MB budget. This is a single headless run, so it is not a pitch point. Evidence: `dossier.json#existing_site.mobile`
- **F12 · low · content.** Theme demo pages are public: a lorem-ipsum "Surf Lesson" page and a test product, "Surf pakage" ("dfsfgf"). Evidence: [walk/06-service-surf-lesson-fold.png](funnel/walk/06-service-surf-lesson-fold.png), [walk/07-product-surf-pakage-fold.png](funnel/walk/07-product-surf-pakage-fold.png)
- **F13 · medium · offsite · pitch.** The Google listing shows a Call button but no website link; Google asks visitors to "Add website". Evidence: [walk/13-google-listing-desktop-add-website.png](funnel/walk/13-google-listing-desktop-add-website.png)
- **F14 · medium · offsite · pitch.** The channels disagree on whether the business is open: Instagram says "OPEN … Rooms", Facebook says "Always open" and also "closed for low season … Arugam Bay", and the site says the rooms are not bookable. Evidence: [walk/11-instagram-fold.png](funnel/walk/11-instagram-fold.png), [walk/12-facebook-fold.png](funnel/walk/12-facebook-fold.png)

## Playbook §2: where the old site answers each question

| Question | Old site (menu-reachable pages) |
|---|---|
| What and where | Home first screen: "Your Surf and Yoga Camp in Midigama" (under a PHP notice) |
| Level | Home: "total beginner or chasing your next big ride" |
| Cost | Not reachable from the menu (F2) |
| Included | Only on the orphan packages page, in a closed accordion (F2) |
| Spot / season | Not answered (already gaps in the dossier) |
| Trust | No rating or review (F10) |
| Languages | Not answered |
| How to book | No action; the email link is the only one (F1, F4, F5) |

## Recommended funnel

1. Primary action: **engine**, which matches `dossier.booking.path`. `bookingLinks[0]` points to the Booking.com listing.
2. Working label: "See rooms and live dates on Booking.com". The copywriter writes the final label.
3. Clicks to book: **1**.
4. Secondary actions: `tel` (`contact.phone`, a tap-to-call link of at least 44 px) and `email`. No WhatsApp until the owner confirms one.
5. Order of the booking section and persistent bar: what_where → included → price → level → trust → primary_action. The first screen needs only what and where plus the action, over the business's best media.
6. Offer: weekly packages first (`lessons[]`/`priceList[]`, per week, each with its 2021 capture date for the owner to confirm), then single lessons. After that, `rooms[]` (five Booking.com room types, no nightly rate, linked to live dates), then the shop (`rentals[]`, `brands[]`).
7. Status: one owner-editable line (`hoursNote` or a `copyBlocks[]` row in slot "info") replaces the stale banner (F3, F14).
8. Trust: `ratings[]` from Google and Booking.com with their counts and capture dates, plus verbatim `testimonials[]`.
9. Closing intent: send the reader to live dates on Booking.com, and name the phone as the way to ask about lessons and packages first.
10. Off-site advice: add the site to both Google listings (F13). Make the Facebook intro, Facebook hours and Instagram bio match the site's status line (F14).

## Not measured

- PayHere payment pages: blocked by a Cloudflare check (403), not bypassed.
- Booking.com beyond the listing: no dates entered and no booking started.
- Whether the owner answers the phone, email or DMs, and how fast: no contact is allowed in test mode.
- Whether the rooms, lessons and restaurant are open now: the channels disagree.
- Instagram and Facebook beyond the public view: behind login walls. Tripadvisor returns 403.
- Conversion and traffic: no analytics access.
