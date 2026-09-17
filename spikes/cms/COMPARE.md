# Grav vs Bludit: spike result

Date: 2026-09-17. Versions: **Grav 2.1.6** (`grav-admin` package: Admin2 2.1.18, API 1.0.35,
Login 3.9.8) and **Bludit 3.22.0**. URLs and sha256 are in [README.md](README.md).

**Recommendation: Grav.** Reason and risk are at the end. Three points need Shahar's decision.

Evidence labels used on every claim:
- **[T]** tested here (docker `php:8.3-apache`, PHP 8.3.33, Apache 2.4.68, mod_rewrite, PHP
  running as the non-root file owner; scripts in `test/`).
- **[S]** read here in the source of the pinned release (file named).
- **[C]** cited, URL given, fetched 2026-09-17.
- **[U]** untested or assumed.

Nothing was tested on a real GoDaddy account. Everything about GoDaddy is [C] or [U].

## 1. What was built

One hand-written design (`design/`: asymmetrical hero with the headline overlapping the photo,
a canvas wave animation, a price list, contact cards, a floating WhatsApp button), ported to a
custom theme on each CMS. No stock theme and no CSS framework on either. Both themes load the
byte-identical `site.css` and `waves.js`. The vendored cores and the zips are not tracked in git;
`./build.sh` rebuilds them from pinned, sha256-verified downloads (README.md).

## 2. Test results

All on the final zips, unpacked into clean directories, at the web root and in a subfolder `/surf/`.

| Check | Grav root | Grav `/surf/` | Bludit root | Bludit `/surf/` |
|---|---|---|---|---|
| `smoke.js` (first run, 3 pages, login page, login, price edit shows publicly, photo swap shows publicly) | 25/25 [T] | 25/25 [T] | 24/24 [T] | 24/24 [T] |

Failures and surprises met on the way, all [T]:

1. **Bludit in a subfolder failed with the stock `.htaccess`**: the home page returned 200, every
   other URL returned 404 (`/surf/lessons`, `/surf/admin/`). Cause: `RewriteBase /` is hard-coded.
   Our overlay ships an `.htaccess` without that line; with it, root and subfolder both pass.
   Whether GoDaddy needs a `RewriteBase` is [U]. This is an edit to a core file, so a Bludit
   upgrade (which overwrites files) will undo it.
2. **Grav is offline to visitors until the admin exists**: with no account, every public URL
   302-redirects to `/admin/setup`. Bludit's public pages work before the admin is created.
3. **My first test setup ran PHP as root by mistake** (the `APACHE_RUN_USER=#1000` trick does
   not work in the `php:apache` image). Fixed with `docker --user`; every number in this file is
   from runs with PHP as a non-root user.
4. **A first Bludit admin-rename probe looked like it had failed** (old path 200, new path 404).
   It was opcache serving the old `variables.php` for 2 seconds; after that the rename works. On
   a host with opcache an owner editing a PHP file can see the same delay.
5. In the Grav editor, the custom "Big photo" dropdown only opens from its arrow, not from a
   click on the file name. Cosmetic, but an owner will meet it.
6. `hardening.js` hung once on Grav's login form after a failed login; I replaced the UI loop
   with direct calls to the login endpoint. I did not find out why the UI loop hung.

Tested once by hand, not scripted: **Grav in-admin core update with no shell**. Same overlay on
the 2.1.5 package, dashboard showed "Grav Update Available", Upgrade Grav, `POST
/api/v1/gpm/upgrade` answered 200 `"previous_version":"2.1.5","new_version":"2.1.6"` in 3 seconds;
the 3 pages, the custom theme and the removed stock theme/plugin were all as before. [T] The
container had outbound internet and the zip and curl extensions; on GoDaddy this is [U].

## 3. Criterion 1: admin simplicity for a non-technical owner

| | Grav 2.1.6 (Admin2) | Bludit 3.22.0 |
|---|---|---|
| Editing a price | Pages, Lessons & Prices, the price list is a repeating form block (name, duration, price, note; add, delete, drag to reorder) directly under the text. [T] | Own sidebar link "Prices & contact" opens one screen with price rows and contact fields. [T] That screen exists only because we wrote a plugin for it (section 4). |
| Editing text | Markdown **source** editor with a toolbar and preview, monospace. The owner sees `## Heading`. [T] A WYSIWYG editor (Editor Pro) exists but is a separate plugin that was not evaluated. [U] | TinyMCE WYSIWYG; we cut the toolbar to headings, bold, italic, lists, link, image. The friendlier text editor of the two. [T] |
| Swapping the home photo | Upload under Page Media on the same screen, pick it in the "Big photo" field, Save. [T] | Images, upload, "Set as cover image", Save. [T] |
| Headline, tagline, alt text | Labelled fields on the Home page form, only on that page. [T] | Bludit custom fields are site-wide: the Home-only fields also show on every other page's "Custom" tab, under Options. Tagline reuses the page "Description". [T] |
| Hiding what the owner should not touch | A second account with only `api.access`, `api.pages.*`, `api.media.*` gets a sidebar of Dashboard, Pages, Media, Settings, and can still edit the price list. [T] | Roles are admin, editor, author. Plugin settings screens are admin-only (`checkRole(array('admin'))` in `bl-kernel/admin/controllers/configure-plugin.php` [S]), so with our approach the owner must be a full admin and sees Plugins, Themes, Users, General. A plugin can ship its own admin page with its own role check (`adminController`/`adminView` hooks in `bl-kernel/boot/admin.php` [S]); not built. [U] |
| Overall feel | Modern, fast, more concepts (tabs Options/Advanced/Security, Normal/Expert switch, Env selector). [T] | Small and plain, fewer concepts. [T] |

Verdict: for **text only**, Bludit is simpler. For **prices, contact details, per-page fields and a
locked-down owner account**, Grav is simpler and needs no custom code. The second set is what these
sites are made of.

## 4. Criterion 2: theming freedom for the designer's custom HTML

Both took the design unchanged; neither injected markup, CSS or JS that we did not ask for. [T]

| | Grav | Bludit |
|---|---|---|
| Template language | Twig, inheritance (`base` + one template per page type), autoescape on by default (`system/config/system.yaml` [S]). | Plain PHP includes. Values are stored already HTML-escaped (`Sanitize::html` on save, `bl-kernel/pages.class.php` [S]), so templates echo them raw; anything a plugin decodes must be escaped by hand. Easy to get wrong in generated code. |
| Owner-editable structured data | Declarative YAML blueprints per page type: text, textarea, url, repeating `list`, media picker, all rendered by Admin2. 114 lines of YAML, no PHP. [T] | Custom fields are `string` or `bool` only (`bl-kernel/admin/views/edit-content.php` [S]). No repeater, no per-page-type fields, no theme settings without a plugin. The price list needed a 110-line PHP plugin with its own POST handling and escaping. [T] |
| Images | Media object in Twig: `cropZoom(1600,1000)` generated and cached the resized hero. [T] | Original file is served; 400 px thumbnails only. Resizing is up to the theme. [T] |
| Custom code written for the spike | 108 lines Twig, 114 lines YAML, 8 lines PHP (empty theme class). | 133 lines theme PHP, 110 lines plugin PHP, 75 lines `first-run.php`, hand-built JSON seed databases, patched `.htaccess`. |
| Pre-built content in the package | Drop Markdown files in `user/pages/`. [T] | Must hand-write `bl-content/databases/*.php` (JSON, escaped strings, UUIDs, plugin activation files) because the only supported way to create them is the installer, which writes demo content. [T] |

Verdict: **Grav, clearly.** For a pipeline where an agent generates a new theme for every business,
Grav's version is templates plus YAML. Bludit's version includes generated PHP that handles form
posts on every site, which is per-site attack surface we would own.

## 5. Criterion 3: update path (no shell on the host)

| | Grav | Bludit |
|---|---|---|
| Mechanism | One click in the admin (core, and "Update All" for plugins). Works without shell: tested 2.1.5 to 2.1.6, see section 2. [T] Needs curl, openssl, zip. [C] https://learn.getgrav.org/2/basics/requirements | Manual only: back up, download the zip, "Replace existing files with the new files", over FTP or File Manager. No in-admin updater. [C] https://docs.bludit.com/en/getting-started/upgrade-guide |
| Our customisations survive? | Yes: everything we add is under `user/`, and the update kept it. [T] | Theme, plugin and content survive. The two core edits do not: our `.htaccess` and any `ADMIN_URI_FILTER` rename get overwritten and must be re-applied after each upgrade. [S] + [C] https://github.com/bludit/bludit/issues/1047 |
| Release cadence | About 38 stable 2.x releases between 2026-06-21 and 2026-09-15; four in the five days before this spike. [C] https://api.github.com/repos/getgrav/grav/releases | Nothing from 2024-08-25 to 2026-02-01, then 12 releases to 2026-05-11, none since (4 months). [C] https://api.github.com/repos/bludit/bludit/releases |
| Recent regressions that matter to us | 2.0.19 added a `user/.htaccess` that took sites on hosts with a restricted `AllowOverride` fully offline; repaired in steps across 2.1.4, 2.1.5 and 2.1.6 (2026-09-14/15). [C] release notes at https://github.com/getgrav/grav/releases Exactly our kind of host. | None found. [U] |
| Major-version path | 1.7 to 2.0 is a migration via a plugin, not an in-place update. [C] https://learn.getgrav.org/2/basics/updates We start on 2.x, so it does not apply. | 4.0.0-beta-1 appeared on `master` on 2026-08-15; no 4.x release. [C] https://github.com/bludit/bludit/pull/1752 Migration path unknown. [U] |

Verdict: **Grav.** An owner can realistically click "Update"; nobody will re-upload Bludit over FTP.
The cost is that Grav must actually be updated often (section 6), and its updates have recently
broken shared hosts.

## 6. Criterion 4: security record

| | Grav | Bludit |
|---|---|---|
| GitHub advisories | 165 published on getgrav/grav (which also carries the api, login, form, admin2 plugin advisories). 2025: 20. **2026: 130** (5 critical, 60 high, 48 medium, 17 low), 43 in August alone. Of the 74 with a CVSS vector: 17 need no privileges, 44 low, 13 high. [C] counted from https://api.github.com/repos/getgrav/grav/security-advisories (paginated) | 2, both 2026-05-19, both high, both fixed in 3.22.0. [C] https://api.github.com/repos/bludit/bludit/security-advisories |
| CVEs in NVD | 71 under `cpe:2.3:a:getgrav:grav`. [C] https://services.nvd.nist.gov/rest/json/cves/2.0?virtualMatchString=cpe:2.3:a:getgrav:grav (`totalResults`) | 42 under `cpe:2.3:a:bludit:bludit`. [C] https://services.nvd.nist.gov/rest/json/cves/2.0?virtualMatchString=cpe:2.3:a:bludit:bludit (`totalResults`) |
| Worst recent ones | Pre-auth password-reset token poisoning in the API plugin, critical, CVE-2026-61839, fixed in api 1.0.4; unauthenticated privilege escalation CVE-2026-42613, fixed in 2.0.0-beta.2. Both fixed before the version we pin. [C] same advisory API | Auth bypass + arbitrary upload in the API plugin, CVE-2026-25099, fixed 3.18.4; session fixation CVE-2026-25101, fixed 3.17.2. [C] https://cert.pl/posts/2026/03/CVE-2026-25099 (we remove the API plugin from the package) |
| Known unpatched in the pinned version | Two 2026 advisories list no patched version: GHSA-q5fw-vpqc-fgph (high, stored XSS in shortcode-core attribute handlers; that plugin is in our package) and GHSA-4x9g-vw65-vvf9 (medium, unauthenticated DoS via image derivative dimensions). Whether 2.1.6 is still affected was not analysed. [C] advisory API [U] | **Passwords are single-round `sha1(password + salt)`** (`bl-kernel/users.class.php` line 161 [S]); this is CVE-2024-24553, open since 2024. [C] https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2024-24553 **SVG uploads are stored and served with their `<script>` intact** [T]; this is CVE-2026-25100, where CERT Polska writes the vendor "broke off cooperation" [C] (cert.pl URL above); a fix was merged on 2026-07-19 but is in no release. [C] https://github.com/bludit/bludit/pull/1724 |
| Password storage | bcrypt `$2y$10$`. [T] | SHA-1, see above. [S] |
| Disclosure process | Written policy, weekly triage, monthly advisory day; "maintained by a very small team". 1.7 gets only fixes for bugs exploitable without an account. [S] `SECURITY.md` in the package | Policy exists since 2026: private reporting, acknowledgement within 5 business days, latest release only. [S] `SECURITY.md` in the package |
| Bus factor | One person (rhukster) wrote 558 of the last 600 core commits. [C] https://api.github.com/repos/getgrav/grav/commits?since=2025-09-17T00:00:00Z | One person (dignajar) wrote 142 of the 204 commits since 2025-09-17. [C] https://api.github.com/repos/bludit/bludit/commits?since=2025-09-17T00:00:00Z |
| Known exploited | Neither appears in CISA KEV. [C] https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json (1,713 entries searched for vendor/product grav, bludit) | same |

How to read this: Grav's 130 advisories in nine months mean two things at once. The code is being
audited hard and fixes ship within days, with a public record. And the brand-new Admin2 + API stack
(a JSON API exposed on every site) has a large, actively mined attack surface; a site left
un-updated for a few months will be running publicly documented holes. Bludit's short list is
mostly a sign that few people look, and the two problems that are open today (SHA-1 passwords,
unsanitised SVG) are basic. Neither is a safe "upload and forget" product. Grav is the one where
staying current is possible without a technician.

## 7. Practical facts

| | Grav | Bludit |
|---|---|---|
| Zip | 22.1 MB (22,124,032 bytes) [T] | 2.5 MB (2,510,234 bytes) [T] |
| Files / unpacked size | 6,506 files, 73 MB [T] | 390 files, 9.4 MB [T] |
| GoDaddy inode limit | 250,000 on every cPanel plan, so neither is a problem; Grav's cache adds files over time. [C] https://www.godaddy.com/help/resource-limits-12001 | same |
| Upload | One zip, extract in cPanel File Manager. [C] https://www.godaddy.com/help/unzip-files-in-my-web-hosting-cpanel-account-8396 File-by-file FTP of 6,500 files would be slow and is the wrong way for either. [U] | same, FTP is tolerable at 390 files [U] |
| PHP required | "PHP 8.3.11 or higher" [C] https://learn.getgrav.org/2/basics/requirements ; the code itself only checks for 8.3.0 (`GRAV_PHP_MIN` in `index.php` [S]) | PHP 8.0 or higher [C] https://docs.bludit.com/en/getting-started/requirements |
| Extensions required | curl, ctype, dom, gd, json, libxml, mbstring, openssl, session, simplexml, zip [C] same URL | mbstring, gd, dom, json [C] same URL |
| GoDaddy cPanel PHP | 8.2, 8.3 (default), 8.4 selectable; Apache 2.4.46. [C] https://www.godaddy.com/help/software-versions-installed-on-web-hosting-cpanel-windows-hosting-plesk-and-managed-hosting-for-wordpress-accounts-897 The 8.3 **patch level** and the default extension set are not published. [U] Extensions are toggled under Select PHP Version. [C] https://www.godaddy.com/help/enable-custom-php-modules-12036 | same; Bludit's needs are lower, so less can go wrong |
| `.htaccess` | Needs mod_rewrite and `AllowOverride All` [C] requirements URL; root file uses `Options -Indexes` [S]. GoDaddy publishes no `AllowOverride` policy. [U] | mod_rewrite only, no `Options` lines [S] |
| Subfolder install | Works as shipped. [T] | Works only with our patched `.htaccess`. [T] |

## 8. Mapping onto the PLAN.md §6 hardening list

| Item | Grav | Bludit |
|---|---|---|
| Unique generated credentials, delivered sealed | Drop a `user/accounts/<name>.yaml` into the package. A plaintext `password:` was replaced by `hashed_password:` on first login [T]; shipping a bcrypt `hashed_password` directly is the obvious next step. [U] With an account present there is no open setup wizard. [T] | Write `users.php` at package time with `sha1(password+salt)` [S]. Works, but the hash is weak, so a leaked zip is a leaked password unless it is long and random. |
| HTTPS enforced | `force_ssl: true` in `system.yaml` exists [S]; not tested (no TLS locally). [U] | No core setting found; an `.htaccess` redirect (a core-file edit). [U] |
| Admin path renamed | One line in `user/config/plugins/admin2.yaml`; `/admin` then 404s and the new path serves the login [T]. The Admin2 README says a rebuild is needed; that is out of date. [T] Survives updates. | Supported by editing the constant `ADMIN_URI_FILTER` in `bl-kernel/boot/variables.php` [C] https://docs.bludit.com/en/security/custom-admin-panel-url ; works [T]; overwritten by every upgrade [S]. |
| 2FA | Built in (TOTP); the user screen shows "Two-factor authentication is off" and an "Enable 2FA" button [T]. Enrolment and login with a code were not tested. [U] | None in core; feature request closed unimplemented. [C] https://github.com/bludit/bludit/issues/1322 No mention on the user screen. [T] |
| Login throttling | 429 "Too many login attempts. Try again in 10 minutes." after 4 to 5 wrong passwords. [T] | IP blocked after 10 wrong passwords for 5 minutes; the correct password is also refused during the block. [T] |
| Versions pinned and recorded | `build.sh` pins core by sha256; bundled plugin versions are fixed by the package. | `build.sh` pins core by sha256. |
| No unused plugins | 9 plugins kept, all in the admin's dependency chain except `problems` and `error`. `flex-objects` may be removable. [U] | 4 kept: tinymce, canonical, robots, wobbly. The API plugin (source of CVE-2026-25099) is removed. [T] |
| Upload types whitelisted, uploads sanitised | `.php` refused with 422; SVG accepted but **sanitised** (`<script>` and `onload` stripped) [T]. | `.php` refused server-side; `evil.php.jpg` renamed to `evil-php-jpg.jpg`, served as `image/jpeg`, not executed; SVG accepted **unsanitised** [T]. |
| No public write endpoints | The JSON API at `/api/v1/` is public by design and is what the admin uses; auth endpoints are rate-limited [T]. It cannot be turned off without losing the admin. | Admin forms only, CSRF token checked [S]. |
| Data files not downloadable | Account, config, page source, logs, backup, vendor: all 403. [T] | `bl-content/databases`, `pages`, `workspaces`, `tmp`: 404. [T] Direct hits on plugin PHP files return a PHP fatal error with the server path when `display_errors` is on (stock plugins too). [T] |
| Backups: the zip is the restore point | Content is plain files under `user/`; re-extracting the zip restores the delivered state. Admin has a backup tool (not tested). [U] | Content is `bl-content/`; same. |

## 9. Recommendation

**Use Grav (2.x with the bundled Admin2).**

**Main reason:** it is the only one of the two where the designer's custom HTML can be given
owner-editable structured fields (price list, contact details, per-page headline and photo)
**without writing PHP per site**: templates plus YAML, rendered by the stock admin, with a
limited owner account, config-only admin rename, 2FA, sanitised uploads and a working one-click
update, all confirmed here. On Bludit the same site needed a custom form-handling plugin, a custom
first-run script, hand-built databases and two core-file edits that upgrades undo, on top of SHA-1
passwords and an unreleased SVG fix.

**Main risk:** churn. Grav 2.0 has been stable for three months, ships several releases a week,
has 130 security advisories this year, and its September releases broke and then repaired exactly
the restricted-`.htaccess` shared hosts we deliver to. A delivered site that nobody updates will be
running published vulnerabilities within months, and an update can also break it. Second risk:
Grav 2 asks for PHP 8.3.11+ and eleven extensions, and GoDaddy's 8.3 patch level and extension
defaults are unverified.

## 10. Decisions for Shahar

1. **Who keeps delivered Grav sites updated?** Options: the owner clicks Update (tested to work,
   but they will not do it monthly); we offer updates as a paid upkeep; or we accept the risk and
   say so in the pitch. This is the real cost of choosing Grav and it is a product decision, not a
   technical one.
2. **One real GoDaddy test before Phase 2.** Everything host-specific is unverified: PHP 8.3 patch
   level (needs 8.3.11+), the extension set, `AllowOverride`, whether the in-admin updater can
   reach getgrav.org. It needs a GoDaddy cPanel account; I cannot do it from here.
3. **Pre-seeded admin instead of the setup wizard?** The spike zips are credential-free as
   instructed, so the first visitor to `/admin/setup` becomes admin and the public site is down
   until then. For real deliveries PLAN.md already says "sealed credentials": I would have the
   packager generate the password, write a bcrypt `hashed_password` account file into the zip, and
   add a limited owner account next to the super-admin. Confirm that a password **hash** inside the
   zip is acceptable.

Not evaluated, in case the answer to 1 is "nobody": Grav 1.7 with the classic admin (runs on older
PHP, far slower release pace, but security fixes limited to bugs exploitable without an account
[S] `SECURITY.md`), and generating a fully static site with no CMS at all.
