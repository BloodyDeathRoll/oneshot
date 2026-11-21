This audit is not a fact source for the site. Nothing below may appear on the site as content.

# Audit: Sea You Surfers Nest, Midigama (run 2026-10-midigama-01, auditor 0.1.3, 2026-11-21)

Scope: **no_site**. The business has no website (`dossier.existing_site.url` is null), so `tools/funnel.mjs` was not run and `measured` is null.

The hand walk is the measurement. It used a 390×844 phone viewport with an iPhone user agent, logged out and read-only. The Google listing was also opened at 1440×1000, where its detail rows show. Steps: the Google listing, Booking.com (the dossier's booking path), Agoda, the two Airbnb listings, the Airbnb host profile, and a Google search for the name. Cookie dialogs were declined. "Ask a question" and "Message host" were tapped once to see where they lead, and nothing was typed. Every page opened is in `funnel/walk.json`, made by `funnel/make-walk.mjs`. The screenshots are scratch, kept outside git in `assets/walk/`. Whole-page scrolled sets from `tools/shoot.mjs` are in `assets/walk/shoot-agoda/`, `shoot-airbnb-1/` and `shoot-airbnb-2/`. The tool crashed on Booking.com's mobile pass, so Booking.com is covered by the walk only.

The path a traveller takes today is Google Maps → "Check availability" → Agoda or Booking.com, or an Airbnb search. On that path the only direct channel is a phone number painted on the street sign in the listings' first photo.

## Findings

- **F1 · high · offsite · pitch.** Every way to book or ask goes through a platform, and none of them lets a visitor reach the hosts before booking. On Booking.com the listing says "Once you book, we'll provide details so you can contact the property directly", and "Ask a question" opens a sign-in page. On Airbnb, "Message host" opens "Log in or sign up". Agoda shows no contact at all. Booking.com's listing also says the property "will pay us a higher commission if you make a booking." Evidence: [walk/03-booking-com-contacting.png](assets/walk/03-booking-com-contacting.png), [walk/03-booking-com-ask-tapped.png](assets/walk/03-booking-com-ask-tapped.png), [walk/05-airbnb-1-message-host-tapped.png](assets/walk/05-airbnb-1-message-host-tapped.png), [walk/03-booking-com-preferred-partner.png](assets/walk/03-booking-com-preferred-partner.png)
- **F2 · medium · offsite · pitch.** The Google listing (4.9, 11 reviews) is unclaimed. It shows "Add place's phone number", "Add website" and "Claim this business". Its only booking button compares Agoda and Booking.com, and on a phone there is no Call button. Evidence: [walk/02-google-listing-desktop-add-website.png](assets/walk/02-google-listing-desktop-add-website.png), [walk/02-google-listing-desktop-offers.png](assets/walk/02-google-listing-desktop-offers.png), [walk/01-google-listing-fold.png](assets/walk/01-google-listing-fold.png)
- **F3 · medium · offsite · pitch.** The phone number exists only as part of a picture: the sign in the first photo on Booking.com (1/45) and Agoda (1/44) reads "+94 715880052". A visitor can read it but cannot tap it, and it appears as text on no page walked. Evidence: [walk/03-booking-com-fold.png](assets/walk/03-booking-com-fold.png), [walk/04-agoda-on-load.png](assets/walk/04-agoda-on-load.png), [img-001.jpg](assets/img-001.jpg)
- **F4 · medium · offsite · pitch.** The listings disagree about what a room has. Booking.com and Agoda say "family rooms with air-conditioning … and balconies", and Agoda's FAQ describes an on-site restaurant. The owner's Airbnb text says "one A/C room & Six Non A/C rooms". Airbnb says "Private attached bathroom" on one listing and "0 bathrooms" on the other. Evidence: [walk/03-booking-com-summary.png](assets/walk/03-booking-com-summary.png), [walk/04-agoda-faq-restaurant.png](assets/walk/04-agoda-faq-restaurant.png), [walk/05-airbnb-1-inquire-open.png](assets/walk/05-airbnb-1-inquire-open.png), [walk/06-airbnb-2-summary.png](assets/walk/06-airbnb-2-summary.png)
- **F5 · medium · offsite · pitch.** On Airbnb the rate shown is for a fan room ("rates are for Non A/C double room, Pls inquire when booking"; "Pls inquire for per room rate"), and inquiring needs an Airbnb login. Evidence: [walk/05-airbnb-1-inquire-open.png](assets/walk/05-airbnb-1-inquire-open.png), [walk/06-airbnb-2-description-open.png](assets/walk/06-airbnb-2-description-open.png), [walk/05-airbnb-1-message-host-tapped.png](assets/walk/05-airbnb-1-message-host-tapped.png)
- **F6 · medium · offsite.** On a phone, Agoda's listing opens under an app pop-up, "We have even lower prices in our app!", and the visitor must tap "Continue to mobile site". Evidence: [walk/04-agoda-on-load.png](assets/walk/04-agoda-on-load.png)
- **F7 · low · offsite.** The same house appears under four names and four places: Midigama on Google, Kumbalgama on Booking.com, Mirissa on Agoda and Matara on Airbnb. Evidence: [walk/01-google-listing-fold.png](assets/walk/01-google-listing-fold.png), [walk/03-booking-com-fold.png](assets/walk/03-booking-com-fold.png), [walk/05-airbnb-1-fold.png](assets/walk/05-airbnb-1-fold.png)
- **F8 · low · offsite.** The whole-house Airbnb listing shows "New", no reviews and "0 bathrooms"; the ten 5-star reviews are on the other listing. Evidence: [walk/06-airbnb-2-summary.png](assets/walk/06-airbnb-2-summary.png)
- **F9 · low · offsite.** Check-in is "From 14:00 to 18:00" on Booking.com and Agoda but "after 15:00" on Airbnb. Evidence: [walk/03-booking-com-policies.png](assets/walk/03-booking-com-policies.png), [walk/05-airbnb-1-checkin.png](assets/walk/05-airbnb-1-checkin.png)

Count: 1 high, 5 medium, 3 low. Pitch points: F1, F2, F3, F4, F5.

## Playbook §2: where today's path answers each question

| Question | Google listing | Booking.com / Agoda | Airbnb |
|---|---|---|---|
| What and where | "Bed & breakfast", the Midigama address, map | Name with a slogan, Kumbalgama / Mirissa, map (F7) | "Room" / "guest house in Matara" |
| Rooms (beach_lodging) | Photos | Two room types; the summary says A/C in every room (F4) | Seven rooms, one with A/C (owner's words) |
| Cost | Google's price list for a date it picked | "Choose dates" | "Add dates for prices"; the A/C room "Pls inquire" (F5) |
| Included | Not answered | Facilities list, plus a restaurant that guests do not mention (F4) | Amenities and the shared kitchen |
| Spot / season | Not answered (already dossier gaps) | Distances to Midigama Beach | "Steps from the sea" |
| Trust | 4.9 (11), with review texts not visible signed out | 8.0 (8) on Booking.com; Agoda re-scores the same 8 as 8.8 | 5.0 (10), Guest favourite, Superhost |
| Languages | Not answered | English | Not answered |
| How to book / ask | No call button and no website (F2) | Book only; asking needs sign-in (F1) | Book, or "Message host" behind a login (F1) |

## Recommended funnel

1. Primary action: **engine**, matching `dossier.booking.path`. `bookingLinks[0]` is the Booking.com listing, with no prefilled dates.
2. Working label: "See rooms and live dates on Booking.com". The copywriter writes the final label.
3. Clicks to book: **1**.
4. Secondary action: `tel`, using `contact.phone` +94715880052 from the business's own street sign. It sits beside the primary action, in the persistent bar and in the footer. **This depends on a human confirming the number** (dossier gap, `human_decision`). If it is not confirmed, the list is empty. No WhatsApp or email is published.
5. Order of the booking section and persistent bar: what_where → spot → included → price → trust → primary_action. The first screen needs only what and where plus the action, over the best photograph. There is no video, and no photo shows the sea.
6. Offer: `rooms[]`, one row per Booking.com room type. Each row says plainly which room has the A/C and the balcony door, and which has a private bathroom (F4, F5).
7. Price means the link to live dates. No nightly rate is copied. Further `bookingLinks[]`: Airbnb listing 1 (rooms) and Airbnb listing 2 (the whole house, for groups). Agoda is not linked: it copies Booking.com.
8. `stayInfo`: no check-in time until the owner confirms one (F9). Check-out, children, pets and the no-parties rule go in `stayInfo.note` as the dossier holds them.
9. Trust: `ratings[]` from Google 4.9 (11), Booking.com 8.0 (8) and Airbnb 5.0 (10), each with its capture date. Agoda's score is not shown, because it re-scores Booking.com's reviews. Add verbatim `testimonials[]` about Ashly and the location.
10. Closing intent: send the reader to live dates on Booking.com, offer the whole-house Airbnb listing to groups, and give the phone as the way to ask Ashly first.
11. Off-site advice: claim the Google listing and add the phone and the site (F2). Correct the per-room facilities and the restaurant in the Booking.com extranet (F4). State the A/C room's rate on Airbnb (F5). Fix the whole-house bathroom count (F8). Use one check-in time (F9) and one name and address everywhere (F7).

## Not measured

- Booking.com, Agoda and Airbnb past the listing page: no dates entered and no booking started.
- Booking.com in `tools/shoot.mjs`: the mobile pass crashed on Booking.com's 202 challenge reload. The hand walk covers the listing.
- What Agoda or Airbnb charges the property: no page states it. Booking.com's only statement is the Preferred Partner sentence (F1), which gives no rate.
- Google web search for the name: Google returned its "unusual traffic" page ([walk/08-google-search-fold.png](assets/walk/08-google-search-fold.png)); not bypassed.
- Google review texts, Instagram and Facebook: hidden by the signed-out view or login walls.
- Whether +94715880052 is answered, whether it has WhatsApp, and how fast: no contact is allowed in test mode.
- Conversion and traffic: no analytics access.

## For the harvester

- Booking.com's "Preferred Partner Programme" accordion says, verbatim: "This property is part of our Preferred Partner Programme. It is committed to providing commendable service and good value. It will pay us a higher commission if you make a booking." This is not in the dossier.
- The sign photo with the phone number (img-001) is photo 1 of the gallery on both Booking.com and Agoda. The dossier records the photo but not where it sits.
- Agoda's FAQ answers its own question about an on-site restaurant with "The on-site restaurant provides a welcoming atmosphere for meals". This adds to `contradictions[]` "restaurant".
