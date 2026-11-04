This audit is not a fact source for the site. Nothing below may appear on the site as content.

# Audit: Coconut Surf Inn, Gurubebila / Midigama (run 2026-10-midigama-01, auditor 0.1.3, 2026-11-05)

Scope: **no_site**. The business has no website (`dossier.existing_site.url` is null), so `tools/funnel.mjs` was not run and `measured` is null.

The hand walk is the measurement. It used a 390×844 phone viewport with an iPhone user agent, logged out and read-only. The Google listings were also opened at 1440×1000, where their detail rows show. Steps: the inn's Google listing, the "Coconut Surf Restaurant (2nd floor)" listing, the "Coconut Beach" place that carries the inn's phone, Booking.com (the booking path), Airbnb (the second engine), Kayak, and a Google search for the name. Every page opened is in `funnel/walk.json`, with screenshots in `funnel/walk/`. The recipe is `funnel/make-walk.mjs`.

The path a traveller takes today has two steps: Google Maps → Booking.com, or Google's price box → a sponsored Booking.com, Agoda or HomeToGo offer. Airbnb is a second, older listing. Along that path, the only direct channel is the phone number on Google. It is also attached to a Google place for the beach.

## Findings

- **F1 · high · offsite · pitch.** On Booking.com a visitor cannot reach the hosts before booking. The listing has no phone, WhatsApp or email, and says "Once you book, we'll provide details so you can contact the property directly". The public Q&A is the only way to ask first; one answer there starts "Sorry for the late reply". Evidence: [walk/05-booking-com-contacting.png](funnel/walk/05-booking-com-contacting.png), [walk/05-booking-com-questions.png](funnel/walk/05-booking-com-questions.png)
- **F2 · medium · offsite · pitch.** On Airbnb, "Message host" opens "Log in or sign up", and the host card says "Responds within a few days or more". Evidence: [walk/06-airbnb-response.png](funnel/walk/06-airbnb-response.png), [walk/06-airbnb-message-tapped.png](funnel/walk/06-airbnb-message-tapped.png)
- **F3 · medium · offsite · pitch.** The inn's Google listing (4.8, 88 reviews) says "Add website" where the website should be. "Check availability" opens a price box led by a sponsored Booking.com offer, then Agoda and HomeToGo. On a phone the listing offers Directions, Start and Call, and its photos are only in the app. Evidence: [walk/02-google-listing-desktop-add-website.png](funnel/walk/02-google-listing-desktop-add-website.png), [walk/02-google-listing-desktop-availability.png](funnel/walk/02-google-listing-desktop-availability.png), [walk/01-google-listing-fold.png](funnel/walk/01-google-listing-fold.png)
- **F4 · medium · offsite · pitch.** Google shows three places for one business:
  - the inn;
  - "Coconut Surf Restaurant (2nd floor)", which is unclaimed and has no phone and no website. Its address says "No 44" where Booking.com says No.49, and its plus code says Ahangama;
  - "Coconut Beach", a beach whose address is Matara and whose phone is the inn's.

  Evidence: [walk/03-google-restaurant-desktop-claim.png](funnel/walk/03-google-restaurant-desktop-claim.png), [walk/04-google-beach-desktop-phone.png](funnel/walk/04-google-beach-desktop-phone.png)
- **F5 · medium · offsite · pitch.** Booking.com's description says "Each room includes air-conditioning". Booking.com's own room data gives the Budget Single and Budget Double rooms a fan only, and the owner told a guest that the Budget Double has no A/C or hot water. Evidence: [walk/05-booking-com-summary.png](funnel/walk/05-booking-com-summary.png), `dossier.json#room_types`, `dossier.json#reviews.critical_themes`
- **F6 · medium · offsite · pitch.** The Airbnb listing describes a different stay from Booking.com's:

  | | Airbnb | Booking.com |
  |---|---|---|
  | Bathroom | "Shared bathroom" in the header; the host's text says "own bathroom" | Private bathroom in every room |
  | Cooling | Ceiling fan and wall fan in each of "09 rooms" | A/C in four of the six room types |
  | Breakfast | "(Break fast not included to the Price)" | — |
  | Check-in / check-out | 12:00 / 12:00 | 13:00 / 11:00 |

  Evidence: [walk/06-airbnb-header.png](funnel/walk/06-airbnb-header.png), [walk/06-airbnb-description-rooms.png](funnel/walk/06-airbnb-description-rooms.png)
- **F7 · low · offsite.** The top of the Booking.com page says "Beachfront". Its "Closest beaches" block says "Midigama Beach 16 min (1.3 km)" on foot. The host says the break is in front of the guesthouse. Evidence: [walk/05-booking-com-fold.png](funnel/walk/05-booking-com-fold.png), [walk/05-booking-com-distance.png](funnel/walk/05-booking-com-distance.png)
- **F8 · low · offsite.** The place appears under five town names:
  - Gurubebila / Weligama: the Google address;
  - Ahangama: the restaurant's plus code;
  - Matara: the beach place;
  - Weligama: Airbnb's header;
  - Midigama: the host's own text.

  Evidence: [walk/03-google-restaurant-desktop-claim.png](funnel/walk/03-google-restaurant-desktop-claim.png), [walk/04-google-beach-desktop-phone.png](funnel/walk/04-google-beach-desktop-phone.png), [walk/06-airbnb-description-rooms.png](funnel/walk/06-airbnb-description-rooms.png)
- **F9 · low · offsite.** Directly under the inn's address and phone, the desktop Google listing shows three neighbouring guesthouses with their nightly prices. Evidence: [walk/02-google-listing-desktop-add-website.png](funnel/walk/02-google-listing-desktop-add-website.png)

Count: 1 high, 5 medium, 3 low. Pitch points: F1, F2, F3, F4, F5, F6.

## Playbook §2: where today's path answers each question

| Question | Google listing | Booking.com | Airbnb |
|---|---|---|---|
| What and where | "3-star hotel", address, map | Name, No.49 address, map, "Beachfront", but the nearest beach is listed at 1.3 km (F7) | "Room in Weligama"; the host's text says Midigama (F8) |
| Rooms (beach_lodging) | Photos only in the app (mobile) | Six room types with facilities. The description at the top contradicts them (F5) | One "Room", "Shared bathroom", fan rooms (F6) |
| Cost | Prices for a date Google picked | "Choose dates to see prices" | "Add dates for prices" |
| Included | "Free breakfast" on the offers | Breakfast, facilities, policies | "Break fast not included" (F6) |
| Spot / season | Not answered | Not answered (Q&A: "coconut surf break ( 60m)") | The host's text names Coconuts and Plantations. Season is not answered (already a gap) |
| Trust | 4.8 (88), reviews behind sign-in | 8.5 (142) with reviews | 4.44 (54) |
| Languages | Not answered | Listed | "Speaks English" |
| How to book / ask | Call, or OTA offers | Book. Questions go through the Q&A (F1) | Reserve. "Message host" needs sign-up (F2) |

## Recommended funnel

1. Primary action: **engine**, matching `dossier.booking.path`. `bookingLinks[0]` is the Booking.com listing, with no prefilled dates.
2. Working label: "See rooms and live dates on Booking.com". The copywriter writes the final label.
3. Clicks to book: **1**.
4. Secondary action: `tel` (`contact.phone` +94778921396, from the inn's Google listing) beside the primary action and in the persistent bar. No WhatsApp or email: neither is published.
5. Order of the booking section and persistent bar: what_where → spot → included → price → trust → primary_action.
   - The first screen needs only what and where, plus the action, over the best photograph (img-009). There is no video.
6. Offer: `rooms[]`, one row per Booking.com room type, each with its own photo.
   - `rooms[].note` says plainly whether the room has a fan or A/C (F5, F6).
   - The upper-floor restaurant is an `amenities[]` row, with 7:30–22:00 in `hoursNote` (F4).
   - `spot` names Coconuts in front of the inn and Plantations 100 m up the beach (F7).
7. Price means the link to live dates. No nightly rate is copied.
8. `stayInfo`: check-in from 13:00, check-out until 11:00. These are Booking.com's times, from the listing the owner keeps current.
9. Trust: `ratings[]` from Booking.com 8.5 (142), Google 4.8 (88) and Airbnb 4.44 (54), each with its capture date. Never the "Coconut Beach" 4.8 (120). Add verbatim `testimonials[]`.
10. Closing intent: send the reader to live dates on Booking.com, and give the phone as the way to ask the hosts first.
11. Off-site advice:
    - Add the site to the inn's Google listing (F3).
    - Claim the restaurant listing, add its phone and the site, and confirm the house number. Suggest an edit that removes the inn's phone from the beach place (F4).
    - Correct the per-room facilities in the Booking.com extranet (F5) and the closest-beach distances (F7).
    - Bring the Airbnb listing up to date, or close it (F6).

## Not measured

- Booking.com and Airbnb past the listing: no dates entered and no booking started.
- What either platform charges the property: no page opened states it.
- Agoda and HomeToGo listings: not found. They appear only inside Google's price box.
- Google web search for "Coconut Surf Inn Midigama": Google returned its "unusual traffic" page ([walk/08-google-search-fold.png](funnel/walk/08-google-search-fold.png)). It was not bypassed.
- Tripadvisor: 403. Google review texts: sign-in wall (harvester).
- Airbnb messaging past "Log in or sign up", and the Booking.com question form: not entered.
- Whether the owner answers the phone, whether that number has WhatsApp, and how fast: no contact is allowed in test mode.
- Conversion and traffic: no analytics access.
