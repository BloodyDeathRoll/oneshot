# CMS spike: Grav vs Bludit (PLAN.md §6, Phase 1)

The same 3-page mini-site (Home, Lessons & Prices, Contact) for a **fictional** surf school
("Wobbly Pelican Surf School", not a real business) built on Grav and on Bludit from one shared
hand-written HTML/CSS/JS design, packaged as one upload-ready zip each, and smoke-tested on
Apache + PHP. Result and recommendation: [COMPARE.md](COMPARE.md).

## What is tracked, what is not

Tracked (about 360 KB): the shared design, each CMS's theme + content + config overlay, the build
script, the tests, this README, COMPARE.md.

Not tracked (see `.gitignore`), rebuilt by `./build.sh`: the vendored CMS cores (`grav/site/`,
`bludit/site/`), the download cache (`.cache/`), the zips (`dist/`), test output (`test/out/`),
`test/node_modules/`. Grav's core alone is 73 MB / 6,500 files.

```
design/            the designer's static output: 3 HTML pages, css/site.css, js/waves.js, img/hero.jpg
grav/overlay/      copied over the Grav release: user/themes/wobbly, user/pages, user/config
bludit/overlay/    copied over the Bludit release: bl-themes/wobbly, bl-plugins/wobbly,
                   bl-content (seed content, NO users.php), first-run.php, .htaccess
build.sh           download pinned releases, verify sha256, overlay, zip
test/              Dockerfile + serve.sh (Apache/PHP stand-in), smoke.js, hardening.js, fixtures/
dist/              grav-site.zip, bludit-site.zip (ignored)
```

`design/css/site.css`, `design/js/waves.js` and `design/img/hero.jpg` are the single source; the
build copies them into both themes, so both sites always use byte-identical CSS/JS.

## Pinned versions

| | Version | Released | Download URL | sha256 |
|---|---|---|---|---|
| Grav + Admin (`grav-admin` package) | 2.1.6 (Admin2 2.1.18, API 1.0.35, Login 3.9.8) | 2026-09-15 | https://github.com/getgrav/grav/releases/download/2.1.6/grav-admin-v2.1.6.zip (byte-identical to https://getgrav.org/download/core/grav-admin/2.1.6, checked 2026-09-17) | `3e0e546a4f39ae8c5276ff631156e2bc25ffab63eec44c103a724a9b600318ca` |
| Bludit | 3.22.0 | 2026-05-11 | https://github.com/bludit/bludit/archive/refs/tags/3.22.0.zip (the download button on https://www.bludit.com/ points here) | `cbc869e12d37f359b7f4ca7044d43d6305ac1d8d0cebdf8416d80e0378d4a070` |

Bludit publishes no release asset, only the GitHub tag archive. GitHub generates those on demand
and does not promise stable bytes forever; if the hash check ever fails, diff the archive against
the `3.22.0` tag before changing the pin.

## Rebuild

Needs bash, curl, unzip, zip, sha256sum. No PHP, no docker.

```
cd spikes/cms
./build.sh            # or: ./build.sh grav | ./build.sh bludit
```

Output: `dist/grav-site.zip` and `dist/bludit-site.zip`. Both are **flat** (files at the zip root,
`.htaccess` included): upload the zip into the folder the site should live in (`public_html` or
any subfolder) with cPanel File Manager, choose Extract, delete the zip. Uploading a zip and
extracting it on the server also avoids FTP clients skipping the hidden `.htaccess`.

What the build removes from the stock packages:
- Grav: sample pages, the stock `quark2` theme, the `github-markdown-alerts` plugin. Kept plugins:
  admin2 + api (the admin), login, form, email, shortcode-core (their dependency chain),
  flex-objects, error, problems.
- Bludit: `install.php`, translated READMEs, `.github`, all four stock themes, and every plugin
  except `tinymce`, `canonical`, `robots` and our `wobbly`.

The build refuses to package if it finds a Grav account file or a Bludit `users.php`.

## No credentials in the zips: how the first admin is created

- **Grav:** stock behaviour. While `user/accounts/` is empty, every URL (public pages included)
  redirects to `/admin/setup`, where the first visitor creates the super-admin. Secrets
  (`user/config/security-private.php`, `plugins/api-private.php`) are generated on the server at
  that moment. Passwords are stored as bcrypt (`$2y$10$`).
- **Bludit:** stock Bludit creates its admin inside `install.php`, which also writes default
  content, so it cannot be used with pre-built content. The package ships **without**
  `bl-content/databases/users.php` and with our own `first-run.php` (75 lines): open
  `/first-run.php`, choose the password for user `admin`, the script writes `users.php` in
  Bludit's own format and deletes itself. The public site works before that; nobody can log in
  until it is done.

In both cases whoever reaches the setup URL first becomes admin, so do it immediately after
extracting. For real deliveries (PLAN.md §6, "sealed credentials") the packager should instead
pre-seed the account at package time; see COMPARE.md, "Decisions for Shahar".

## Test

Needs docker, node, and Google Chrome (driven through `playwright-core`; no browser download).

```
cd spikes/cms/test
npm install
./serve.sh up          # builds the image on first use; unpacks each zip twice into test/out/www/
node smoke.js grav   http://localhost:8081/
node smoke.js grav   http://localhost:8082/surf/
node smoke.js bludit http://localhost:8083/
node smoke.js bludit http://localhost:8084/surf/
./serve.sh up          # fresh copies again: hardening.js does its own first-run
node hardening.js
./serve.sh down
```

`serve.sh` runs `php:8.3-apache` plus gd, zip, opcache and mod_rewrite, with Apache and PHP
running as the non-root owner of the files (as suexec does on cPanel). Each smoke run uses a
random throwaway admin password that is never written to disk. The work directory must be under
`$HOME` when docker is the snap package (it cannot see `/tmp`).

`smoke.js` checks: first-run admin creation, the 3 public pages (theme CSS applied, hero image
loads, 4 price rows, WhatsApp/tel/map links), admin login page loads, login in a fresh browser
context, change the first price in the admin UI, upload a new photo and make it the home photo,
then the public pages show the new price (on the price list and the home teaser) and the new photo.

`hardening.js` prints observations for the PLAN.md §6 hardening list: direct access to data files,
upload whitelist (`.php`, script-carrying `.svg`, `.php.jpg`), 2FA presence, login throttling,
admin path rename.

The in-admin core update (Grav 2.1.5 to 2.1.6) was tested once by hand with the same overlay on
the 2.1.5 package; it is described in COMPARE.md and not scripted here.
