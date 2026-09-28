This audit is not a fact source for the site: nothing below may appear on the site as content.

# Audit — The Lavish Haven (run 2026-09-ahangama-02, auditor 0.1.0, 2026-09-28)

Scope: **no_site**. `existing_site.url` is null, so `tools/funnel.mjs` was not run as the measurement and `measured` is null. The path audited is the one a traveller takes today: Google Maps listing → Booking.com / Agoda / TripAdvisor, on a 390×844 phone viewport, logged out. Screenshots in `funnel/`.

## Findings

- **F1 · medium · pitch** — On Booking.com the visitor cannot reach the hotel before booking: "Contacting the Property" says contact details come only after booking, and the page has no phone, email or WhatsApp. [funnel/booking-contacting-property.png](funnel/booking-contacting-property.png)
- **F2 · medium · pitch** — A visitor who wants to book direct finds no site, email or WhatsApp; Booking.com's own "Preferred Partner Program" section says the property "will pay us a higher commission if you make a booking". No rate is stated anywhere fetched. [funnel/booking-preferred-partner.png](funnel/booking-preferred-partner.png)
- **F3 · medium · pitch** — The first phone screen of the Booking.com page is app banner, Booking header and a cookie dialog; the hotel photo is cut off and "Check availability" is below the first screen. [funnel/booking-fold.png](funnel/booking-fold.png), [funnel/booking-choose-dates.png](funnel/booking-choose-dates.png)
- **F4 · medium** — The Agoda link opens on a phone with "We have even lower prices in our app!" over a placeholder image; no hotel name or photo on that screen. [funnel/agoda-fold.png](funnel/agoda-fold.png)
- **F5 · medium** — The Google listing has no website link, so a traveller from Maps can call or get directions but must search an OTA to see rooms (harvester, 2026-09-23; not re-opened today, consent wall). [Google listing](https://www.google.com/maps/place/The+Lavish+Haven+Hotel+And+Resort/@5.9794565,80.3508299,17z/data=!4m9!3m8!1s0x3ae113bbadfe5595:0x8d858b9ae5001097!5m2!4m1!1i2!8m2!3d5.9794565!4d80.3508299!16s%2Fg%2F11ypgcrxg6?hl=en)
- **F6 · low** — Booking.com shows "166/2 Welhengoda Road" as "The Lavish Haven - Ahangama"; Google shows "No166/1 walhengoda road" as "The Lavish Haven Hotel And Resort". [funnel/booking-fold.png](funnel/booking-fold.png), `dossier.json#location.address`

## Recommended funnel

1. Primary action: **engine** (= `dossier.booking.path`), `bookingLinks[0]` → Booking.com property page.
2. Label: "Check dates and prices on Booking.com".
3. Clicks to book: **1** (the tap that leaves the site).
4. Secondary actions: none recorded as proven-answered; `contact.phone` sits in the footer contact block (playbook §3.9).
5. Above the fold, in order: what and where (hotel, Ahangama, 2-minute walk to Kabalana Beach) → Booking.com rating with count and capture date → primary action.
6. Offer: `rooms[]` with beds and sleeps, `amenities[]`, then `bookingLinks[]` to live dates; no nightly number.
7. `bookingLinks[]` order: Booking.com, then Agoda.
8. Closing (the line already decided for this site, site-content v0.5): "Rates move with the dates. The listings show what is free."
9. Off-site advice: add the site URL to the Google listing; use one name across listings; fix the 166/1 vs 166/2 house number.
10. No cookie wall, nothing covering the first screen (playbook §4).

## Not measured

- Google Maps listing: stopped at Google's consent page ([funnel/google-fold.png](funnel/google-fold.png)); not bypassed.
- TripAdvisor: HTTP 403 ([funnel/tripadvisor-fold.png](funnel/tripadvisor-fold.png)).
- Agoda beyond the first screen: no property content rendered.
- Commission rate: none stated on any page fetched; partner.booking.com returned 403.
- Booking.com engine beyond the property page: no dates entered, no rate selected.
- Whether the owner answers the phone, and reply time; conversion rate.
