This audit is not a fact source for the site: nothing below may appear on the site as content.

# Audit — Global Surf Adventures / Global Surf Lodge Kabalana (run 2026-09-globalsurf-01, auditor 0.1.1, 2026-09-28)

Scope: **site**. `tools/funnel.mjs` 0.1.2 on https://www.globalsurf.com/ at depth 3, 30 pages, 390×844:

> https://www.globalsurf.com/ — status 200, clicks_to_book 1, primary engine (READY TO CATCH MY FIRST WAVE), CTA above fold true, pages 30, broken 0

Read that "1" with care: the hero button does reach the engine in one tap, but it lands on the engine's front page (one "Sri Lanka" tile), not on a package. The tool cannot see that, and it has three more blind spots: it knows `bookinglayer.io` but not `bookinglayer.com`, so the lodge and level pages' `/tests/` buttons show up as `book_link`; it missed Level one's hero button because the label has no "book" in it; and 13 of its 30 pages were Maldives, Morocco, Angola or Mozambique pages. The hand walk (`funnel/walk.json`, screenshots in `funnel/walk/`) covers the Sri Lanka path by hand: every site button into the engine, then the Level 1 engine flow up to the guest form. It stopped there: nothing typed, nothing submitted.

## Findings

- **F1 · medium · pitch**: Every Book button on the lodge and level pages opens the engine's front page. The chosen package is lost, and the visitor taps "Sri Lanka" and finds their level again. [walk/engine-from-level-two.png](funnel/walk/engine-from-level-two.png), [walk/level-two-fold.png](funnel/walk/level-two-fold.png)
- **F2 · high · pitch**: No Kabalana price anywhere on the site. From the lodge page, the first price ("Total: $1466") appears on the 7th tap, inside the engine, after guests and a date. [walk/engine-step-06.png](funnel/walk/engine-step-06.png)
- **F3 · medium · pitch**: The only page whose buttons open the right package (the packages page, three MAKE A RESERVATION cards) is linked from no page of the site, and its cards start about six screens down. [walk/packages-reservation-cards.png](funnel/walk/packages-reservation-cards.png)
- **F4 · high · pitch**: The Freestylers B&B package has a Book button, but the engine calendar strikes through every day from Sep 2026 to Sep 2027. [walk/engine-freestylers-calendar.png](funnel/walk/engine-freestylers-calendar.png)
- **F5 · medium · pitch**: The site's Level one list promises 5 yoga sessions and 2 feedback sessions. The engine's list has no yoga, 1 feedback session and a spa treatment. [walk/level-one-includes.png](funnel/walk/level-one-includes.png), [walk/engine-level1-includes.png](funnel/walk/engine-level1-includes.png)
- **F6 · medium · pitch**: The lodge page downloads 19.96 MB in 204 requests from 20 other hosts before any scroll (home 13.44 MB, packages 13.87 MB). The budget is 1.5 MB. [walk/lodge-fold.png](funnel/walk/lodge-fold.png)
- **F7 · medium · pitch**: A Messenger bubble covers text on every screen. Its "Start Chat" opens messenger.com's login page. [walk/lodge-bubble-open.png](funnel/walk/lodge-bubble-open.png), [walk/messenger-start-chat.png](funnel/walk/messenger-start-chat.png)
- **F8 · medium · pitch**: WhatsApp is a 22-px "What’sup" footer link about nine screens down the lodge page. "Call now" is inside the closed menu and dials Israel, and the lodge's Sri Lankan number is not on the site. [walk/lodge-full.png](funnel/walk/lodge-full.png)
- **F9 · medium · pitch**: No address, map link or check-in time on the lodge, level or contact pages. The only map is on the unlinked packages page. [walk/lodge-full.png](funnel/walk/lodge-full.png), [walk/contact-fold.png](funnel/walk/contact-fold.png)
- **F10 · medium · pitch**: The home page's first screen never says Sri Lanka ("Tailor-Made Surf Trips Like Never Before", a carousel that opens on the Maldives). Its one button opens the empty engine front page. [landing-fold.png](funnel/landing-fold.png), [walk/engine-from-home-hero.png](funnel/walk/engine-from-home-hero.png)
- **F11 · medium · pitch**: Out-of-date pages still offer booking: the Maldives "Surf Charters Schedule - 2024" (16/16 spots, BOOK NOW), 2025 retreats, and "© 2019" in every footer. [walk/myna-schedule-2024.png](funnel/walk/myna-schedule-2024.png), [walk/home-footer-2019.png](funnel/walk/home-footer-2019.png)
- **F12 · medium · pitch**: From a package page it takes 8 taps inside the engine to reach the guest form. One "Continue" only scrolls and shows a red "1 guest left to assign", and the twin-room note points to a box that the phone view does not show. [walk/engine-step-07.png](funnel/walk/engine-step-07.png) … [engine-step-10.png](funnel/walk/engine-step-10.png)
- **F13 · low**: All 5 home-page actions are under 44 px (the hero button is 42 px, the WhatsApp icon 22×24). `funnel.json` landing_actions
- **F14 · low**: Labels: "Choose your level" appears twice on the lodge page, the breadcrumb says "kabalan surf lodge", the WhatsApp link says "What’sup", and the level is "Fomies" in the engine but "Foamie" on the site. [page-02.png](funnel/page-02.png)

Pitch checks against the harvester's points:
- **No prices:** confirmed for Sri Lanka. The site does show prices, but only on the Maldives charter page, for 2024 trips (F11).
- **`/tests/` links lose the package:** confirmed on the lodge page and all four level pages, and the home and contact buttons (`/frontoffice/`) land the same way (F1). The packages page links correctly, but no page links to it (F3).
- **13–20 MB:** confirmed by my own run (F6).
- **Stale content:** confirmed (F11).
- **Messenger bubble:** confirmed. It also leads to a login wall (F7).

## Recommended funnel

1. The site is the **Kabalana lodge's** (`surf_camp`), not the agency's.
2. Primary action: **engine** (= `dossier.booking.path`). One `bookingLinks[]` row per level, each pointing at its product page (`/en/product/level-1-fomies`, `…/level-2-rollers`, `…/level-3-riders`), never `/tests/` or `/frontoffice/`.
3. Working label: "See dates and prices" (the copywriter owns the wording). Clicks to book: **1** (the tap that leaves the site).
4. Secondary actions: WhatsApp (+972523593240) and tel. Both are published on the business's own site, and the lodge's +94770776747 is on its Google listing. Which phone to show is the owner's call.
5. Above the fold, in order: what and where (Global Surf Lodge Kabalana, surf camp, Ahangama) → level → price per person for 7 nights, with its capture date → primary action → Google rating with count and date.
6. Offer: three `lessons[]` rows. Inclusions only where the site and the engine agree (or the engine's list alone). `rooms[]` from the engine names. Saturday start in `stayInfo.note`. Freestylers left out until it has dates. Booking.com as the last `bookingLinks[]` row, for room-only stays.
7. Other destinations: **one `copyBlocks[]` row, slot `info`**, near the end. It names Maldives, Morocco, Angola and Mozambique from `dossier.json#other_destinations[].text`, with no prices, dates, photos or links of their own, and points to the same WhatsApp and email.
8. Contact block and footer: address (the Google listing's), `contact.mapUrl`, check-in 14:00–20:00 and check-out by 11:00, WhatsApp and tel as real links. No chat widget.
9. Closing intent: send the reader to pick a level and see live dates, with WhatsApp named as the place to ask first.
10. Schema catch (F8 notes): a set `contact.whatsapp` makes WhatsApp the template's primary CTA. To keep the engine primary, WhatsApp goes in as a `bookingLinks[]` wa.me row and `contact.whatsapp` stays empty. Otherwise Shahar changes the booking path.

Off-site advice (engine and Messenger, not built by us):
- Freestylers: add dates or hide the package (F4).
- Align the engine's inclusion lists with what is actually delivered (F5).
- Fix the twin-room note (F12).
- If Messenger chat stays anywhere, flag the login and offer WhatsApp beside it (F7).

## Not measured

- Google Maps listing: after declining consent, the view had an empty panel ([walk/google-listing-after-decline.png](funnel/walk/google-listing-after-decline.png)). The harvester's read stands.
- Booking.com: the "details only after booking" sentence exists in the page's DOM but was not visible on screen, so it is not a finding.
- TripAdvisor: not opened (403 per the harvester).
- The engine beyond the guest form: payment, deposit and cancellation terms were not reached.
- Throttled LCP/CLS were not measured. The weights come from one unthrottled run.
- Ad and Instagram landing pages, reply times and conversion: not measurable in test mode.
