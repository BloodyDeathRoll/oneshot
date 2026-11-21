**This audit is not a fact source for the site: nothing in it may appear on the site as content.**

# The Sandhya: funnel audit (station 3b)

Run `2026-11-ahangama-01`, auditor 0.1.3, 2026-11-06, scope `site`, `mode: test`. Machine copy: `audit.json`. Hand walk: `funnel/walk-hand.json`, remade by `funnel/make-walk.mjs`. Screenshots under `funnel/shots/` are scratch and not in the media manifest: run the recipe to remake them on another machine.

**The engine's own steps were not exercised.** Cloudbeds shows an error page to a headless browser, which is read as an automation wall and not a fault of the hotel. This audit stops at the URL each tap hands to.

## Tool and hand walk

| Measure | `tools/funnel.mjs` (`funnel.json`) | Hand walk (`walk-hand.json`) |
|---|---|---|
| Action on the first screen | `cta_above_fold` false, `terminal_above_fold` false | Yes: RESERVE, fixed, 70 x 30 px. The tool cannot see an `<a>` with no `href` |
| Primary action | `tel`, "+94 765 700 007", 7,798 px down | The engine, by RESERVE |
| Taps to a terminal action | `clicks_to_book` 1 (the footer phone link) | Engine: 2 by RESERVE with dates dropped, 5 or 6 with dates picked, 2 by Menu, 3 plus a scroll by Rooms |
| Pages, broken | 10 crawled, 0 broken | Same 10 pages text-searched |
| Time until RESERVE answers a tap | not measured | 7.5 s after DOM ready on a fast line; about 52 s from opening on emulated slow 4G |

The first tool run timed out at its 30 s load wait; the second, recorded here, succeeded.

## Findings

- **F1 · high · funnel · pitch.** On a slow-4G phone the home page stays white and tapping RESERVE does nothing at 5, 15 and 30 seconds. RESERVE first answers about 52 seconds after the link was opened. On a fast connection the white layer still sits over RESERVE for 7.5 seconds after the page is ready: a tap 2.2 seconds in did nothing, and the same tap after it cleared opened the panel. Evidence: [03-slow4g-15s.png](funnel/shots/03-slow4g-15s.png).
- **F2 · medium · funnel · pitch.** Tapping RESERVE opens a panel already showing today and tomorrow and 2 adults. Tapping its RESERVE with those dates kept sends the engine empty dates (#checkin=&checkout=), and the adults count is never sent at all. Dates are only sent if the visitor picks them, which takes 5 taps in the current month and 6 for next month. Evidence: [05-panel-open.png](funnel/shots/05-panel-open.png).
- **F3 · medium · cta · pitch.** RESERVE is on the first screen and stays fixed while scrolling, which works, but it is 70 by 30 px against a 44 px target, sits in the corner, and does nothing until the page's scripts have run, because it is a script-driven control and not a link. Evidence: [01-home-settled.png](funnel/shots/01-home-settled.png).
- **F4 · medium · content · pitch.** The first screen gives a dictionary entry for the word Sandhya and "Adults Only Hideaway". A visitor has to scroll about two screens to read "hotel", and on the home page Sri Lanka first appears about 3,200 px down, Kabalana about 3,900 px down, and Ahangama only in the footer and the menu. Evidence: [01-home-settled.png](funnel/shots/01-home-settled.png).
- **F5 · medium · offer · pitch.** Across all 10 pages no room shows a rate, so a visitor comparing hotels has to go to the engine to learn one. The only price on the site is on /house, "From US$3,500++ per night", for exclusive use of the whole hotel, with the ++ unexplained. Evidence: [07-house-price.png](funnel/shots/07-house-price.png).
- **F6 · medium · trust · pitch.** None of the 10 pages shows a rating, a review or a link to one. A visitor who wants proof has to leave for a listing, where Trip.com, for one, shows 9.7 out of 10 from 56 reviews. Evidence: [08-trip-9-7.png](funnel/shots/08-trip-9-7.png).
- **F7 · medium · content.** None of the 10 pages gives check-in or check-out times or mentions breakfast, though the hotel's own engine lists breakfast as complimentary and Google lists it as free. "Adults Only" appears once, on the home page, with no age given. Evidence: [08-google-check-in-time.png](funnel/shots/08-google-check-in-time.png).
- **F8 · medium · funnel · pitch.** A visitor who has read about the Director's Suite and taps RESERVE NOW follows the same link as every other room, with no room in it, so the room they chose is not passed on. Evidence: [07-suite-reserve-now.png](funnel/shots/07-suite-reserve-now.png).
- **F9 · medium · contact · pitch.** In the menu and footer a phone icon and a WhatsApp icon sit side by side before the number. Neither icon is a link, the number is a tel: link, and no page has a WhatsApp link, so a visitor who wants to message gets a call screen. The phone and email links are also 15 to 16 px tall against a 44 px target. Evidence: [07-home-footer-contact.png](funnel/shots/07-home-footer-contact.png).
- **F10 · medium · contact · pitch.** The location page shows an illustrated map of the whole island with no link, and none of the 10 pages links to a map, so a visitor trying to get directions has to copy the address into a maps app themselves. Evidence: [07-locale-map.png](funnel/shots/07-locale-map.png).
- **F11 · medium · mobile.** The home page loads 14.4 MB before the page finishes loading on a slow-4G phone, which takes about 82 seconds. It carries 114 images, none of them lazy, for a visitor who may be paying per megabyte and has scrolled nowhere. Evidence: [03-slow4g-30s.png](funnel/shots/03-slow4g-30s.png).
- **F12 · medium · offsite.** On the Google listing, Check availability and Compare prices come first and list resellers: Agoda and Hotels.com in the screenshot, Hotels.com and Expedia.com on another load. The hotel's own engine was not among the options shown on any load, and the link to thesandhya.com sits below them. Evidence: [08-google-fold.png](funnel/shots/08-google-fold.png).
- **F13 · medium · offsite.** The hotel's MICHELIN Guide page shows a fixed bar reading "We’re not currently taking reservations for this hotel. Please explore other hotels in our selection." The page has no link to the hotel's own site, and says "No verified stays yet." Evidence: [08-michelin-not-currently-taking-reservati.png](funnel/shots/08-michelin-not-currently-taking-reservati.png).
- **F14 · medium · offsite.** Google says check-in 14:00 and pet-friendly. Trip.com says check-in after 16:00, pets not allowed, and children aged 12 and above welcome, while the hotel calls itself adults only. A traveller planning an arrival or bringing a teenager finds no answer on the hotel's own pages. Evidence: [08-trip-after-16-00.png](funnel/shots/08-trip-after-16-00.png).
- **F15 · low · content.** Room pages read "500 tread count", the home page "though out", and one room appears as both "Studio King+" and "Studio+ King". The home page has a "brand new 30-meter swimming pool" while /design describes "an up-cycled shipping container for our unique swimming pool". Evidence: [link](https://thesandhya.com/room/studio-king/).
- **F16 · low · content.** A visitor sees nothing on the page itself, but all 10 pages declare their canonical address on vps125323.inmotionhosting.com and not thesandhya.com, the home page declares no Open Graph image for a pasted link, and the inner pages have no description. Evidence: [link](https://thesandhya.com/).

## Recommended funnel

1. Primary action: `engine`, as dossier `booking.path` says: `bookingLinks[0].url` = https://hotels.cloudbeds.com/reservation/WMvA6V.
2. Working label: "Check rooms and live dates". The copywriter owns the final words.
3. Target: `clicks_to_book` 1, with the engine link as a real `<a href>`, so the tool reads it and the critic can measure it.
4. No date panel on our page: no dates shown that are not sent.
5. Secondary: tel, email. WhatsApp stays out until a person confirms the number takes messages.
6. Booking section and persistent bar, in order: what_where, spot, included, price, trust, primary_action. `price` means the link to live dates, never a copied nightly rate.
7. First screen: the strongest media with what + where and the primary action, usable before media and scripts arrive, with no intro layer over it.
8. Offer: the four room types from rooms[] with size, beds and what is included, no copied nightly number, each leading to the engine for live dates and prices; exclusive use of the whole house last, as its own priceList[] row with its capture date. The presentation is a beachfront boutique hotel, not a surf stay (Alon, 2026-11-06); surf lessons and board hire stay amenities[] rows.
9. Closing line must: send the reader to live dates on the hotel's own engine, and give the phone and email as the way to ask first.
10. Off site, as advice: google_business_profile (F12): ask the engine provider whether the hotel's direct rate can appear in the listing's price list; michelin_guide (F13): ask the MICHELIN Guide why the page says it is not taking reservations, and to link the hotel's own site; ota_listings (F14): once check-in, the age rule and pets are settled, make Google, Trip.com and the engine say the same thing.

## Not measurable

- The Cloudbeds engine's own steps were NOT exercised: rooms, rates, availability, what it does with empty dates, whether it honours #checkin= or ?rid=, and whether it works for a real guest. Loaded once, plainly: the page answered 200, then redirected to /404 with "Oops! Something went wrong." (funnel/shots/90-engine-headless-wall.png). Read as a wall against headless browsers, not a fault of the hotel; not worked around, and no finding rests on it. The harvester recorded the 403 on /booking/property_info; this walk's filter did not capture that call and it was not reloaded to get it. A person should open https://hotels.cloudbeds.com/reservation/WMvA6V once in a real browser.
- Every booking action on the site past the point of hand-off, for the same reason: this audit stops at the URL each tap hands to
- Slow-connection timings are headless Chromium with emulated throttling, not a real phone on a real network (two clean runs agreed, 52.6 s and 52.3 s)
- Booking.com listing (202, redirected to the Ahangama city page), Tripadvisor (403), Expedia and lastminute (429), hotels.com (protocol error), Agoda (URL not found): per the harvester, not retried
- Instagram and Facebook: robots.txt disallows them, not loaded, so the bio path from social and any reels were not walked
- The Google listing beyond its limited view: review count, reviews, and whether a signed-in visitor sees a direct rate
- Whether the owner answers the phone, email or WhatsApp, and how fast: no contact in test mode
- Whether the three press quotes on the own site trace to an original: the dossier marks them unverified, so they are not stated as findings either way
- Effect of the wrong canonical on search results, conversion rate and traffic: no search console or analytics access
