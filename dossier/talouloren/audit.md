**This audit is not a fact source: nothing in it may appear on the site as content.**

# audit.md — talouloren.com (station 3b, auditor 0.1.3, 2026-11-02)

Scope `site`. talouloren.com stays up beside the new site (A11); it is audited as the presence a visitor meets today. Measured with `tools/funnel.mjs` (mobile, depth 3, 30 pages) and a hand walk on an iPhone viewport (`funnel/walk.mjs`, run by `make-funnel.sh`).

Tool line: `https://talouloren.com/ — status 200, clicks_to_book 1, primary whatsapp (), hero whatsapp (, 0 tap to flow), CTA above fold true, pages 30, broken 0`

The tool counts WhatsApp as above the fold because the link is in the menu markup; on screen it shows only after opening the menu (F4).

## Findings (1 high, 5 medium, 5 low)

| # | Sev | What a visitor meets | Evidence |
|---|---|---|---|
| F1 | high | No way from the home page or menu to the paid session (1000 ₪, 60 min) or the course; they are reached from Linktree | `funnel/walk/01-home-menu.png`, `funnel/walk.json` |
| F2 | medium | "קבעו עכשיו" (book now) on the first screen opens /meet-tal/, a choice of three quizzes, not a booking | `funnel/landing-fold.png`, `funnel/walk/04-meettal-fold.png` |
| F3 | medium | Each quiz opens on an empty step with only "הבא"; no question, no length | `funnel/walk/06-entrepreneurquiz-fold.png` (and 07, 08) |
| F4 | medium | On a phone, WhatsApp is hidden in the menu and the phone number is plain text near the bottom | `funnel/landing-fold.png`, `funnel/walk/01-home-menu.png`, `funnel/walk/01-home-full.png` |
| F5 | low | Session buttons open a popup (phone, WhatsApp, form): two taps; without JavaScript they go to a 404 | `funnel/walk/02-winningpersonalbrand-popup.png` |
| F6 | medium | The course price counts down to 10/10/2020, then "1755 ₪" | https://talouloren.com/course/, `funnel/walk/03-course-full.png` |
| F7 | low | The Instagram strip above every footer is empty tiles | `funnel/walk/01-home-full.png` |
| F8 | medium | The AMT case video is removed and the "inside your organization" vlog video has a mistyped id: YouTube errors where proof should play | the two page URLs in `audit.json` |
| F9 | low | Session and course pages promise 10x–1000x returns and name celebrities | /winning-personal-brand/, /course/ |
| F10 | low | Home page 2.5 MB on a phone, largest paint ~2.7 s | `assets/old-site.json` |
| F11 | low | Footer shows a 2021 "CAREERS" box with an office address the partners no longer show | `funnel/walk/01-home-full.png` |

Pitch-point findings: F1, F2, F4, F6, F8.

## Recommended funnel (in site-schema terms)

1. Primary action: `contact.whatsapp` (+972504635536), working label "Message us on WhatsApp". It is the channel the business publishes on every page today (dossier `booking.path`).
2. Clicks to book: 1 (WhatsApp from the first screen and from the persistent mobile bar).
3. Secondary: `contact.phone` as a tap-to-call link, `contact.email`.
4. The brief's two actions, the free Focused Check and the paid Clarity Session, are `services[]` rows (group `lead`) with their own pages and `ctaText`. They are mocked until the partners decide (A10).
5. Booking section and bar order: what + where, primary action, trust (logos and stats), price (placeholders until decided).
6. Offer framing: two doors (Story, Launch), then the ladder from the free Check to Partnership and the course. Every offer is one row, and every page ends in one of the two actions.
7. Every offer is linked from the menu and the home page (F1). No action behind a script-only trigger (F5).
8. Prices have a unit and no deadline. No countdowns (F6).
9. Proof videos come from the fetched files (vid-024 AMT, vid-026), each with a poster (F8).
10. Closing intent: send the reader to the Check or a Clarity Session, with WhatsApp beside them for a question.
11. Off-site: once the new site is live, point the Instagram bio and Linktree at the new Check and Session pages (F1).

## Not measurable

- Conversion and enquiry volume: no analytics access.
- Reply times: no contact was made.
- The quizzes past step 1 and the popup form: not filled or submitted.
- Cardcom checkout: curl got HTTP 525 from cardcom.solutions; no purchase was started.
- LinkedIn: blocked by a bot wall.
