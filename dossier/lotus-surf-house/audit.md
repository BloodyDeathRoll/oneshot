This audit is not a fact source for the site. Nothing below may appear on the site as content.

# Audit: Lotus Surf House, Midigama (run 2026-10-midigama-01, auditor 0.1.3, 2026-11-03)

Scope: **no_site**. The business has no website (`dossier.existing_site.url` is null), so `tools/funnel.mjs` was not run and `measured` is null.

The hand walk is the measurement. It used a 390×844 phone viewport with an iPhone user agent, logged out and read-only. The Google listings were also opened at 1440×1000, where their detail rows show. Steps: the Google listing, the old "Yelum Guest House" Google listing, Booking.com (the only booking path), Booking.com's old URL, the Facebook page the old listing links to, and a Google search for the name. Every page opened is in `funnel/walk.json`, with screenshots in `funnel/walk/`. The recipe is `funnel/make-walk.mjs`.

The path a traveller takes today has two steps: Google Maps → Booking.com, or Google's own price list → Booking.com or Agoda. Along that path, the only direct channel is the phone number on Google.

## Findings

- **F1 · high · offsite · pitch.** On Booking.com a visitor cannot reach the hosts before booking. The listing says "Once you book, we'll provide details so you can contact the property directly", and "Ask a question" opens a sign-in page. The listing has no phone, WhatsApp or email. Evidence: [walk/04-booking-com-contacting.png](funnel/walk/04-booking-com-contacting.png), [walk/04-booking-com-ask-tapped.png](funnel/walk/04-booking-com-ask-tapped.png)
- **F2 · medium · offsite · pitch.** The Google listing (4.9, 78 reviews) says "Add website" where the website should be. On desktop the first button is a sponsored Booking.com "Book now". On a phone the listing offers Directions, Start and Call, and the photos are behind "See all 150 photos in the app". Evidence: [walk/02-google-listing-desktop-add-website.png](funnel/walk/02-google-listing-desktop-add-website.png), [walk/02-google-listing-desktop-availability.png](funnel/walk/02-google-listing-desktop-availability.png), [walk/01-google-listing-fold.png](funnel/walk/01-google-listing-fold.png)
- **F3 · medium · offsite · pitch.** Google still shows an older, unclaimed "Yelum Guest House" listing at the same spot. Its website is a Facebook page whose newest visible post is from 2018. That page gives a different phone (+94 71 258 5804) and an address ending "123456789". Evidence: [walk/03-google-old-listing-desktop-website.png](funnel/walk/03-google-old-listing-desktop-website.png), [walk/06-facebook-phone.png](funnel/walk/06-facebook-phone.png)
- **F4 · medium · offsite · pitch.** The Booking.com summary says the property "offers family rooms with … air-conditioning" and "Each room includes a shower, balcony". Booking.com's own room data gives A/C and a balcony only to the 3 upstairs King Rooms; the 5 garden rooms have fans. Three guests said their room did not match the photos. Evidence: [walk/04-booking-com-summary.png](funnel/walk/04-booking-com-summary.png), `dossier.json#room_types`, `dossier.json#reviews.critical_themes`
- **F5 · low · offsite.** "This property only accepts cash payments" appears only inside the closed "Hotel policies" accordion. Evidence: [walk/04-booking-com-policies.png](funnel/walk/04-booking-com-policies.png)
- **F6 · low · offsite.** Directly under the address and phone, the desktop Google listing shows three other Midigama hotels with their nightly prices. Evidence: [walk/02-google-listing-desktop-add-website.png](funnel/walk/02-google-listing-desktop-add-website.png)

Count: 1 high, 3 medium, 2 low. Pitch points: F1, F2, F3, F4.

## Playbook §2: where today's path answers each question

| Question | Google listing | Booking.com listing |
|---|---|---|
| What and where | "3-star hotel", address, map | Name, "Indhana Road, Midigama", map, 250 m to Midigama Beach |
| Rooms (beach_lodging) | Photos only in the app (mobile) | Four room types with facilities; the summary at the top contradicts them (F4) |
| Cost | Prices for a date Google picked | "Choose dates to see prices" |
| Included | "Free breakfast" on the offers | Breakfast and facilities. Cash only is in a closed accordion (F5) |
| Spot / season | Not answered (already gaps in the dossier) | Not answered |
| Trust | 4.9 (78), with the reviews behind sign-in | 9.0 (125), with reviews |
| Languages | Not answered | English |
| How to book / ask | Call, or a sponsored Booking.com ad | Book only. The question form needs sign-in (F1) |

## Recommended funnel

1. Primary action: **engine**, matching `dossier.booking.path`. `bookingLinks[0]` is the Booking.com listing, with no prefilled dates.
2. Working label: "See rooms and live dates on Booking.com". The copywriter writes the final label.
3. Clicks to book: **1**.
4. Secondary action: `tel` (`contact.phone` +94774647541, from both Google listings) beside the primary action. No WhatsApp or email: neither is published.
5. Order of the booking section and persistent bar: what_where → spot → included → price → trust → primary_action. The first screen needs only what and where plus the action, over the best photograph. There is no video.
6. Offer: `rooms[]`, one row per Booking.com room type, each with its own photo. Each row says plainly whether the room has A/C and a balcony (upstairs King) or a fan and the garden (F4).
7. Price means the link to live dates. No nightly rate is copied.
8. `stayInfo`: check-in 24 h and check-out 11:00–12:00, with "cash only" in `stayInfo.note` (F5).
9. Trust: `ratings[]` from Booking.com 9.0 (125) and Google 4.9 (78), each with its capture date, plus verbatim `testimonials[]` about the hosts and the breakfast.
10. Closing intent: send the reader to live dates on Booking.com, and give the phone as the way to ask the hosts first.
11. Off-site advice: add the site to the Google listing (F2). Claim the old Yelum listing and point it at the site, or have it merged (F3). Bring Facebook's name and phone up to date (F3). Correct the per-room facilities in the Booking.com extranet (F4).

## Not measured

- Booking.com past the listing: no dates entered and no booking started.
- What Booking.com charges the property: no page opened states it.
- Agoda listing: not found; Agoda appears only inside Google's price list.
- Google web search for the name: Google returned a 429 "unusual traffic" page ([walk/07-google-search-fold.png](funnel/walk/07-google-search-fold.png)); not bypassed.
- Tripadvisor: 403. Facebook beyond the public view: login wall.
- Whether the owner answers the phone, whether that number has WhatsApp, and how fast: no contact is allowed in test mode.
- Conversion and traffic: no analytics access.
