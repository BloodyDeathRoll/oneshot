# mockup notes — the-lavish-haven · unique · en

Built 2026-09-19T19:52:33.991Z from `templates/unique/` + `sites/the-lavish-haven/copy/en.json` (copy that passed station 4c).

## facts
Every word on the page comes from the passed copy, which is mapped paragraph-by-paragraph to dossier fields in
`sites/the-lavish-haven/copy/sources.md`. The template adds no content of its own: its only fixed strings are interface
labels ("Check availability", "What guests wrote", "Address", "Phone", "The wave"), which belong to the template
per `schemas/site-content.md`.

## gaps
- No prices shown anywhere: rates are live dated OTA inventory, so the booking bar says only "Rates change with the dates".
- Sections render only when their content exists — a business with no `amenities`, `testimonials` or `rooms` simply has no such section.

## images
- `img-001` → /photos/img-001.jpg — business-owned
- `img-002` → /photos/img-002.jpg — business-owned
- `img-003` → /photos/img-003.jpg — business-owned
- `img-004` → /photos/img-004.jpg — business-owned
- `img-005` → /photos/img-005.jpg — business-owned
- `img-006` → /photos/img-006.jpg — business-owned
- `img-007` → /photos/img-007.jpg — business-owned
- `img-008` → /photos/img-008.jpg — business-owned
- `img-009` → /photos/img-009.jpg — business-owned
- `img-010` → /photos/img-010.jpg — business-owned
- `img-011` → /photos/img-011.jpg — business-owned
- `img-012` → /photos/img-012.jpg — business-owned
- `img-013` → /photos/img-013.jpg — business-owned
- `img-014` → /photos/img-014.jpg — business-owned

## conflicts
None introduced by the design. Every dossier contradiction was already resolved by being left unwritten in the copy;
see "Deliberately not written" in `sites/the-lavish-haven/copy/sources.md`.

## self-check
- Static build, no runtime network dependency.
- Mobile-first CSS; single column under 900px.
- Booking path works: the bar opens a drawer listing the real booking channels, plus phone and WhatsApp when the dossier has them.
- Content arrives only through `src/tenant/content.json` in the schema shape.
