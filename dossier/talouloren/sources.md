# sources.md — talouloren harvest (station 3, harvester 0.5.0, 2026-11-02)

Every URL touched, what it gave, what it did not. Client sources: `brief/talouloren/brief.md` (answers A1–A24 override the body), `brief/talouloren/copy-terms.json`. Our own readings (`direction.md`, `industry/*.md`, `videos.md`) were used as maps to the sources, not as facts.

## talouloren.com (own site)

| URL | Yielded | Did not |
|---|---|---|
| https://talouloren.com/ | contact (phone, WhatsApp, email, old address), socials, logo wall (34 files), tagline, tone lines; screenshots + weight/LCP via `make-old-site.sh` | — |
| https://talouloren.com/wp-json/wp/v2/media (pages 1–4, 373 items) | 343 images downloaded to scratch, 129 ≥ 500 px viewed on contact sheets; 52 picked into `images[]` (photos and work), 7 badges/logos | most ≥ 1600 px files are Pixabay stock (pens, clouds, conference room): left out |
| https://talouloren.com/wp-content/uploads/2018/04/{gold,black,white}_sig.svg | signature logo (`business.logo`) | — |
| https://talouloren.com/winning-personal-brand/ | session 1000 ₪ / 60 min / Zoom or office; booking buttons; phone line | the buttons' no-JS links `/SuccessfulPersonalBrandDesktop` and `/SuccessfulPersonalBrandMobile` return 404 (with JS they open a popup: coordinator's correction of C-position-04) |
| https://talouloren.com/course/ | course 990 incl. VAT, 6×170, "full 1755" after 10/10/2020; Cardcom link; written testimonial wall (not copied, A18) | — |
| https://cardcom.solutions/e/x1lV | — | curl: HTTP 525 (not tried in a browser) |
| https://talouloren.com/case-study/ and the 7 case pages (`/entrepreneurs/doron-shefer/`, `/entrepreneurs/rita/`, `/entrepreneurs/amt-case-study/`, `/brands/eugene-perma-blonde-master-study-case/`, `/brands/wella-case-study/`, `/organizations/obsessed-ck-team-booster-case-study/`, `/organizations/visa-cal-managment-team-booster/`) | case texts verbatim (`old_case_studies`) | — |
| site video lists (per `videos.md`: home testimonials, vlog, case studies, course, session pages, `/total-success/`, landing post) | 47 YouTube ids; 41 fetched; dead: see `videos_dead` | 2022 spam paths skipped (now 404) |

## YouTube @taloulorensuccess (UCX-DqELI3PQjSbpNV95u8fA)

- Listing: `assets/video/listings/UCX-DqELI3PQjSbpNV95u8fA.json` (206 items, 2026-11-02).
- Fetched with `tools/fetch-video.mjs --channel UCX-DqELI3PQjSbpNV95u8fA` and contact sheets looked at: 66 videos (`videos[]`) = every playable site video + the client films of A20 (Maccabi, Amdocs, Taboola, Kornit, Bezeq, Clalit, SEAT, Philip Morris, Park Bavli, Mercedes, Castro, Wella) + "Talou Testimonial Film 1–3".
- Hero cuts with renditions + posters: vid-036 (rank 1), vid-027, vid-013.
- 141 other channel items: `videos_listed_only` (not downloaded).
- `Wvxq6-_mDxM` ("CLIENT EXPERIENCE", on the session page): "This video is not available".
- `X1j7LVg_IEg` (Rita case-study embed) is on Rita's official channel: licence `unknown` (vid-054).
- Note: the first batch raced on `assets/index.json` with a parallel fetch; the one corrupted entry (old vid-044) was deleted and re-fetched as vid-067, and every source file's sha256 was checked against the index.

## Instagram @talou_loren (no login)

- https://www.instagram.com/talou_loren/ : name, bio, 11K followers, 758 posts, highlights, 12 grid links.
- `/p|reel/<code>/embed/captioned/` for the 10 own posts: captions (3); 2 personal posts left out.
- Not reached: post images and reel files (embed pages returned only the avatar). No Instagram media harvested.
- https://linktr.ee/TALOULOREN : 5 links (session, course, ravpage series, Adobe Spark page, site).

## Other channels

- https://www.facebook.com/talouloren , https://www.linkedin.com/in/talouloren/ : not opened this session (facts from `videos.md`, 2026-11-02; LinkedIn walls bots with HTTP 999).
- https://vimeo.com/shaharnaor : listing only (`assets/video/listings/shaharnaor.json`, 69 items), not downloaded.

## Shahar

- https://shaharnaor.com/ : title, description, tagline, links. No portrait.
- https://www.behance.net/shaharnaor (rendered with Playwright; plain curl gets 403): 51 projects with dates; 12 profile covers (`img-101`…, 1380×1080; one, Sheket b9751d219157569, did not decode), og:image of 8 more projects, 5 modules of "TalouLoren - Web & promotional video". No avatar found.

## Tools

- `~/.local/bin/yt-dlp` was broken (pipx venv lost its Python); fixed with `pipx reinstall yt-dlp` (2026.10.26).
- Images: `python3 tools/restore-assets.py talouloren` → 115 of 115 match.
- Old site: `dossier/talouloren/make-old-site.sh` (recipe for `assets/old-site-*.png`).
