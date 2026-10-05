# Global Surf: experience-critic, station 5 (full), round 1

experience-critic 0.1.0 · run `2026-09-globalsurf-02` · 2026-10-05 · final site `sites/global-surf-adventures/final/dist/`, served on http://127.0.0.1:8764/. I checked that the served `/` and `/book/` are byte-identical to `dist/` (same md5). Independent: I did not open the critic or visual-critic reports for this round.

How I walked it:
- Phone: 390×844, touch, DPR 2. The cold home load was throttled with CDP to 1.6 Mbps, 150 ms RTT and 4× CPU.
- Laptop: 1440×900. I also checked a 360×640 phone.
- Also walked with JS off and with reduced motion.
- Every hand-off to `globalsurfadventures.bookinglayer.com` was intercepted and aborted, and the URL logged.
- To verify must-fix 4 I loaded the two hand-off URLs in fresh contexts, read-only: no clicks, no guest data, nothing booked.
- For must-fixes 1 and 2 I used both the live engine API and mocked engine answers, made by rewriting the real response.

Frames and step logs were kept in the session scratch folder and deleted after scoring (CLAUDE.md rule 6). The key logged values are quoted below.

## Result

**Dimension 8 (experience): 8 / 10 · PASS · better than the current site: yes**

| Entry | Taps to the engine hand-off | Target (`audit.json`) |
|---|---|---|
| Hero "Book package now" → Level 2 → Twin pill → Choose this room → + couple → Sat 20 Feb → Next → Continue booking | **8** (phone and laptop, with the live API and with it blocked) | 1 tap to the booking page, ≤ 8 to the hand-off ✓ |
| Home Rooms "Choose this room" (Deluxe) → Level 3 → Next → + woman → Sat 20 Feb → Next → Continue | **7** (plus the room pill on home) | ✓ |

Hand-off with JS on, every walk: `…/level-2-rollers?couple=1&start=2027-02-20&end=2027-02-27`. Engine calls on booking load: 0.

The total reads $3,092 with the live API ("Live price from the booking engine"). With the API blocked it reads the same $3,092, labelled "Live prices didn't load. These are the booking engine's prices from 29 Sep 2026."

## 4g must-fix list: re-verified

| # | Item | Verdict | Evidence (this round) |
|---|---|---|---|
| 1 | Dates step never hands off without `start` | **Fixed** | Guests now sit above the Saturdays: steppers at y 464 and chips at y 612 on the phone. Walk: tap Sat 19 Dec with no guests, then + couple. The **live** calendar strikes 19 Dec for a couple (the mock agrees). Result: the date is cleared (`start=""`), the chip is disabled and not pressed, and the step shows "Sat 19 Dec 2026 isn't available for 1 couple. Choose another Saturday." Next does not advance. The Total progress link sends you back to the first missing step. A forced `requestSubmit()` sent **no** hand-off (phone and laptop). Choosing Sat 20 Feb then completes the walk to `…?couple=1&start=2027-02-20&end=2027-02-27` |
| 2 | No silent room switch | **Fixed** | Mocked "only the dorm is free", with the Twin chosen. The Twin **stays chosen**. Dates and Total say "Not free on these dates: Shared twin room – 2 beds. Only the Mixed dorm room – 4 beds is free on these dates." The room line reads "Not free on these dates" and the total "—". On Total the bar's hand-off is replaced by **"Change room"**. A forced submit sent nothing and moved to the Room step. After choosing the Dorm: $2,932 and the hand-off. Phone and laptop |
| 3 | Home "Choose this room" keeps the room, assumes no level | **Fixed** | Home Deluxe → `book/?room=double`. It lands on **Level** with no level checked and a soft Next. Tapping Next stays on Level. Level 3 → Room with Deluxe "✓ Chosen" and the pill ticked. The summary reads "Level 3 – Riders" and the hand-off is `…/level-3-riders?female=1&start=2027-02-20&end=2027-02-27`. The hero path still preselects Level 1 (`book/`: level-1 checked), as the notes say |
| 4 | JS off: stay length | **Fixed** | The no-JS form now has a stay-length list (`8=7 nights`, `15=14`, `22=21`, `29=28`). A submit without it is blocked ("Please select an item in the list."). With it: `…/level-2-rollers?female=0&male=0&couple=1&start=2027-02-20&duration=8`, phone and laptop. Read-only engine check: `duration=8` and `end=2027-02-27` both land on `/accommodation` with "Guests: 2 · 20 Feb 2027 · 7 nights · Total $2932", the same screen. `duration=15` → "14 nights", $5278. This matches `docs/bookinglayer.md` §3 (duration is in days) |
| 5 | Phone quote control | **Fixed** | › at page y 7601 for all 9 quotes. The section stays 815 px high |
| 5b | Summary dates | **Fixed** | Phone Total: "20 Feb 2027 – 27 Feb 2027" over "7 nights" |

Also re-checked:
- Back from Total goes to Dates, and forward returns to Total.
- No console errors on the live walks.
- "Continue booking" sits in the bar at y 786–834 (phone) and 834–886 (laptop), and `elementFromPoint` hits it.

## Timeline (phone, throttled, cold)

| t | Seen |
|---|---|
| 0.5 s | Poster (pool deck), logo, "Your surf week starts here", coral "Book package now". A complete first screen |
| 1.5 s | Same. No reflow (CLS 0.0033) |
| 3 s | `gs-hero-loop.p546.webm` attached, starting |
| 6 s / 9 s | Playing (t = 2.6 s / 5.5 s): pool deck, then the guide's arms-up cheer in the whitewater |

Measurements:
- LCP 472 ms.
- 12 requests before scroll, all from the site's own host (fonts are now self-hosted).
- Laptop: LCP 76 ms, CLS 0.0053, desktop rendition `d1920.webm`.
- No horizontal overflow at 390 or 1440.
- Reduced motion: 0 video requests on home (scrolled to the end) and on booking, phone and laptop.
- JS off home: 0 video requests, 0 third-party requests, no native video controls.

## The walk

**Phone.**
- One scroll in, I know what this is, where it is and what it costs: the welcome with "12 rooms | Saturday check-in | ISA-certified surf guides", and the fixed "From $1,466 pp | 7 nights · Book now" bar, which is present from the first scroll to the footer.
- Then the page runs through:
  - the level slides (living clips, a price on each card, "Choose Level n");
  - the Freestylers card with "Ask about dates";
  - the theory photo with the icon list of inclusions;
  - "Surf, breakfast, surf again" with a slideshow;
  - the room galleries with Dorm/Twin/Deluxe pills;
  - the full-bleed pool line;
  - the ink guests band with the 8.6 Booking.com score;
  - the Rosa forecast;
  - the Instagram strip;
  - the closing "Book the week for your level.";
  - a real footer with designed buttons.
- The pull is the hero cheer and the room galleries.
- Attention dips at the Instagram tiles, which are small after the big imagery.

**Laptop.** It is editorial throughout:
- three level clips side by side;
- the big room viewer;
- the full-bleed pool;
- the ink quote band;
- the Rosa two-column block;
- a four-column footer.

The fixed header with "Book now" stays visible all the way down.

**Booking.** One step per screen, in the same fonts and colours as home:
- Level: cards with a tick.
- Room: pills, a gallery, a price line and a coral "Choose this room" that becomes "✓ Chosen".
- Dates: guests first, then Saturday chips by month, with struck dates greyed out.
- Total: an itemised summary with the hand-off in the bar.

It reads as part of the site. The engine page it hands to is Bookinglayer's own (Roboto, blue buttons). That page can't be changed, and it lands already filled in: guests, date, 7 nights and the total.

**Against the current site.** I walked globalsurf.com today on the phone and laptop:
- 140 requests from 17 hosts on load: doubleclick, Facebook, Google Tag Manager, Elfsight, YouTube.
- A YouTube iframe as the hero, with a visible pause glyph.
- A Messenger bubble on every screen.
- No price anywhere in the page text.
- "Book Your Stay" goes to `/contact/`. One laptop link goes to the old `bookinglayer.io/frontoffice`.
- The phone home is 3,992 px (about 4.7 screens). After the destination slider it is text and a footer.

It is still ahead on one point: its brush lettering has more grit than Dancing Script.

The new site beats it at a glance, on the whole page, and decisively on booking: 8 taps to a filled-in engine page, against a contact form.

## Motion and interaction

- The hero loop is smooth.
- The level clips play only while near the viewport (frames show `1111` on the levels, then back to `1000`).
- The slideshows use dots and arrows.
- The step changes are history-backed.
- The level tap advances after a short beat (320 ms). The room choice shows "Chosen" (450 ms), then advances.
- **The hero video keeps playing all the way to the footer** (`heroPaused: false` at every scroll frame, phone and laptop). It wastes battery and data. Open since 4f.

## New or remaining issues

1. **On phones, the dates-step "Not free on these dates" notice appears off-screen.** A traveller who taps a Saturday near the bottom of the chips list sees nothing happen.
   - In the Twin-not-free probe the notice was at y −136…44 of 844 on a 390 phone, and at −266…−57 of 640 at 360×640.
   - The only visible sign is the bar switching from "Total $3,092" back to "From $1,466 pp", with Next still coral.
   - Nothing reaches the engine: Total says why and offers "Change room". But the explanation comes one step late.
   - On Total, the blocked bar reads "$1,466 pp" with no "From" beside "Change room".
2. **Next stays coral on Dates while no valid date is chosen.** This is true after a date is struck, and before any is chosen. Tapping it does nothing visible except focus a chip. Level and Room use the soft style for the same state.
3. **Arriving from a home room, the Level step does not say why it is waiting.** "Deluxe double room" is kept, but nothing on screen says so. Tapping the soft Next produced no visible change in the frame. A one-line note would close the loop: "Deluxe double room kept. Choose your level."
4. **Small and short screens.**
   - At 360×640, "Choose this room" (y 615–667) sits under the fixed bar (top 572).
   - On the laptop, the nights selector on Dates is at y 1265 of 900, below the fold.
   - Both are open since 4f.
5. **The hero video plays when scrolled away** (above).

## Fix list (biggest effect first; none blocks a pass)

1. When the live answer marks the chosen room or date as not free, bring the notice into view on phones:
   - Either scroll it into view, or repeat it as one line above the bar ("Twin not free on 20 Feb · Change room").
   - Keep "From" on the blocked Total bar.
2. On Dates, show Next in the soft style until a valid Saturday and the guests are set, matching Level and Room.
3. Level step from a home room: add a short line above the cards ("Deluxe double room kept. Choose your level."). Make the soft-Next nudge visible: a shake or outline on the cards.
4. Keep "Choose this room" clear of the bar at 360×640, for example with bottom padding equal to the bar height. On the laptop Dates step, bring the nights selector above the fold, for example by moving it beside the guests.
5. Pause the hero video once it is out of view (IntersectionObserver), and resume it when it comes back.

**Keep:**
- the hero exactly as cut (title + one coral CTA, no rating, no overlay);
- Shahar's section order;
- the living level clips;
- the room galleries on home and in booking;
- the persistent "From $1,466 pp" bar;
- guests before the Saturdays;
- the struck-and-cleared dates with their message;
- the chosen room never switched, with the bar offering "Change room" or "Change dates";
- room-first entry without an assumed level;
- whole-dollar live totals with the snapshot fallback and its honest note;
- `start` + `end` hand-offs with JS on, and `start` + `duration` with JS off;
- self-hosted fonts;
- zero third-party requests on load.
