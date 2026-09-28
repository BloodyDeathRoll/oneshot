# auditor / references.md — curated examples (URLs + what we like about each), cached notes.

Measured on 2026-09-28 with `tools/funnel.mjs` (proposal 007), run `2026-09-ahangama-02` candidates:

| Site | clicks_to_book | primary | CTA above fold | What the tool found |
|---|---|---|---|---|
| mellowhostel.com | 1 | engine (Cloudbeds, "Book Now") | yes | engine link prefilled with `checkin=2024-04-21`; a 404 in the nav (`/link-given`); the Booking.com link is labelled "REVIEWS" |
| tharangasurfingvilla.hotelonia.com | 2 | engine (`/book` redirects to Booking.com) | "BOOK NOW" yes, terminal no | white-label engine site; 346 characters of text; the book button leaves the site |
| surfing-villa.com | none | — (mailto only) | no | German one-pager, 838 characters, no tel/WhatsApp/engine; the only action is an email address |

Patterns worth naming in findings (each must still be evidenced per business): stale prefilled dates in engine links; "Book" buttons that lead to an inquiry form; prices behind "contact us"; the WhatsApp number on Google but not on the site; a review link where a booking link should be; the engine hand-off landing on the OTA's home page instead of the property.
