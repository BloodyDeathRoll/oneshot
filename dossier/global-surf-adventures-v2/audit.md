This audit is not a fact source for the site: nothing below may appear on the site as content.

# Audit — Global Surf Lodge Kabalana / Global Surf Adventures (run 2026-09-globalsurf-02, auditor 0.1.2, 2026-09-28)

Scope: **site**. `tools/funnel.mjs` 0.1.2 on https://www.globalsurf.com/ at depth 3, 390×844: status 200, clicks_to_book 1, primary engine ("READY TO CATCH MY FIRST WAVE"), CTA above fold true, pages 30, broken 0 (`funnel/funnel.json`, `funnel/landing-*.png`). Hand walk, same viewport, logged out, read-only (no guests, dates or personal data entered): `funnel/walk-hand.json` + `funnel/walk-*.png`.

The tool's "1 click" is the tap that leaves the site. What the visitor meets after it is the problem (F1–F3).

## Findings

- **F1 · high · pitch** — On the lodge and level pages every booking button is a `/tests/` engine link. It lands on the engine's front page and loses the package the visitor was reading about. [funnel/walk-05-level-one-cta-engine-fold.png](funnel/walk-05-level-one-cta-engine-fold.png), path: Level 1 page → "READY TO CATCH MY FIRST WAVE" → engine home
- **F2 · high · pitch** — None of the 30 pages states a price. The engine's package list has none either. The price appears only after the visitor opens a package and picks guests and a Saturday start date. [funnel/walk-10-engine-sri-lanka-list-fold.png](funnel/walk-10-engine-sri-lanka-list-fold.png), [assets/engine-level-1-fomies-female-13_February_2027.png](assets/engine-level-1-fomies-female-13_February_2027.png)
- **F3 · medium · pitch** — The home page's one booking button (a beginner's promise) opens an engine page with a single "Sri Lanka" card. The packages are two more taps away. [funnel/walk-02-home-cta-engine-fold.png](funnel/walk-02-home-cta-engine-fold.png)
- **F4 · medium · pitch** — The home page's first screen is "Tailor-Made Surf Trips" over Maldives reefs. The lodge is the fourth card in a destinations carousel below the fold. [funnel/landing-fold.png](funnel/landing-fold.png)
- **F5 · medium · pitch** — WhatsApp is a 22×24 px "What'sup" icon in the footer, 3,795 px down the home page. It goes to an Israeli mobile, and "CALL NOW" goes to an Israeli landline. The lodge's Sri Lankan phone number is only on Google. [funnel/landing-mobile.png](funnel/landing-mobile.png), [funnel/walk-07-contact-fold.png](funnel/walk-07-contact-fold.png)
- **F6 · medium · pitch** — A Messenger chat bubble covers the text on every page's first screen. [funnel/walk-03-lodge-fold.png](funnel/walk-03-lodge-fold.png), [funnel/walk-04-level-one-fold.png](funnel/walk-04-level-one-fold.png)
- **F7 · medium** — On a phone, before any scroll, the home page loads 8.9–13.4 MB and the lodge page 14.8–20.0 MB, from 17–23 third-party hosts (trackers, YouTube, Kuula). These are single runs; no screenshot shows bytes, so this is not a pitch point. `dossier.json#existing_site.measurements`, `funnel/walk-hand.json` steps 11
- **F8 · medium** — The lodge page's two testimonials are about the Maldives and Morocco. Its Booking.com rating and the guest quotes about the lodge are not on the site. [lodge page](https://www.globalsurf.com/global-hotels/sri-lanka/kabalana-surf-lodge/), `dossier.json#reviews`
- **F9 · medium** — The Level 1 page and the engine list different inclusions for the same package: yoga ×5 on the site, a spa treatment in the engine, and different session counts. `dossier.json#contradictions`
- **F10 · low** — The footer says "© … 2019", and "Choose your level" appears twice as a heading over lodge paragraphs. [funnel/walk-03-lodge-fold.png](funnel/walk-03-lodge-fold.png)

## Recommended funnel

1. Primary action: **engine** (= `dossier.booking.path`). `bookingLinks[0]` goes to the Sri Lanka category page (`booking.engine_url`), never a `/tests/` URL.
2. Working label: "See the weekly surf packages and dates" (the copywriter writes the final label).
3. Clicks to book: **1**.
4. Secondary: `whatsapp` (+972523593240, published on the site) and `tel`, both ≥ 44 px, in the booking section and the persistent bar. The owner confirms which numbers the lodge answers.
5. Booking section and persistent bar, in order: level → price → included → trust → primary action. The first screen needs only what and where, the action and one proof point, over the video.
6. Offer: three weekly packages as `lessons[]` (level, includes, price per person for 7 nights with its capture date), each with its own product link in `bookingLinks[]`. Then Freestylers B&B (no price), `rooms[]` and `amenities[]`.
7. Trust: `ratings[]` from Booking.com with count and capture date, and `testimonials[]` verbatim from the dossier.
8. Closing intent: send the reader to the package for their level, and name WhatsApp as the way to ask first.
9. No chat widget, no trackers, poster-first video (playbook §4).
10. **Media (recommendation for the creative director, not a fact):** lead with `vid-009` as `heroVideo`. It is the harvester's rank-1 pick and the only watermark-free clip: a sunlit drone shot over the lodge, pool and reef coast. Use its prepared 12 s cut (the 2 s title card is skipped) and its pool-deck poster. Place `vid-010` (golden-hour beginner session) as a `videos[]` row beside Level 1, and `vid-002` (barrel; has a corner badge) beside Level 3. Do not use `vid-001` (the old home hero, other destinations), `vid-006`/`vid-007` (text on every frame) or `vid-008` (another beach). Do not name the wave in clip descriptions; the break is unverified. After the video, the 84 lodge photos at ≥ 1920 px carry the page full-bleed. Prices go in the booking section, never on the first screen.

Off-site advice: none. No off-site problem was evidenced in this audit.

## Not measured

- Google Maps listing: not re-opened. Its website link target was not verified, so there is no finding about it.
- Booking.com and TripAdvisor paths: not walked (TripAdvisor returns 403).
- Engine past the product page: no guests or dates chosen, and "Continue" was never pressed. The price screens are the harvester's.
- Whether the owner answers the +972 WhatsApp or the +94 phone, and how fast: no contact in test mode.
- Instagram/Facebook DMs and reels: behind login.
- Conversion rate: no analytics access.
