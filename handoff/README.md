# handoff/ — handoff kit templates: README, credentials sheet, backup/restore, update procedure, "how to edit" guide with screenshots.

The kit a client receives when their site is `self_hosted_docker` (full kit) or `static_only` (files 01 and 06 only, static variant noted inside). `managed` clients get 03 only.

## How the deployer uses it

1. Copy the templates to `sites/<slug>/handoff/<lang>/` for each language the owner reads.
2. Fill every `{{placeholder}}`. A kit with an unfilled placeholder fails `verify`.
3. Take the screenshots listed in `03-how-to-edit.md` from the owner's own admin, logged in as the owner, in the owner's language. Never reuse screenshots from another site.
4. `02-credentials-sheet.md` is filled last, delivered sealed and separately (printed or in person / a one-time link). It is never committed, zipped, emailed with the rest of the kit, or kept by us after `access_revoked`.
5. Every command in the kit must have been run on the client's box during `verify` — backup, restore, update and status included.

## Placeholders

| Placeholder | Meaning |
|---|---|
| `{{business_name}}` | The business, as the owner writes it |
| `{{site_url}}` | Public site address |
| `{{admin_url}}` | Where the owner logs in to edit |
| `{{owner_email}}` | The owner's login email |
| `{{host_company}}` / `{{host_login_url}}` / `{{host_monthly_cost}}` | VPS provider, its control panel, what it costs |
| `{{server_ip}}` | The VPS address |
| `{{domain_registrar}}` / `{{domain_renewal_date}}` | Where the domain is registered, when it renews |
| `{{install_dir}}` | Folder on the server that holds the stack (default `/opt/oneshot`) |
| `{{backup_dir}}` | Where backups are written |
| `{{handoff_date}}` | Date of handoff = the date our access ended |
| `{{developer_contact}}` | A developer or company the owner chose for help. Not us, unless the owner has a paid agreement with us |

## Command contract

The kit documents one command, `./oneshot`, that `deploy/self-hosted-docker/` must install in `{{install_dir}}`:

| Command | Does |
|---|---|
| `./oneshot status` | Says in plain words whether the site, the editor and the database are running |
| `./oneshot backup` | Writes one dated backup file (database + photos) to `{{backup_dir}}` |
| `./oneshot restore <file>` | Puts a backup back |
| `./oneshot update` | Takes a backup, updates the stack to the newest tested versions, checks the site, and rolls back by itself if the check fails |

## Writing rules (local-language ready)

- Short sentences. One instruction per step. No idioms, no jokes, no abbreviations.
- Say what the owner sees on the screen, in the words on the screen.
- Button and menu names in **bold**, exactly as shown in the owner's language.
- Same step numbers and same screenshots in every language, so a helper can follow along in another language.
- Translations are checked by a native speaker before handoff; mark unchecked text `[needs native check]`.
