# If something breaks — {{business_name}}

Since {{handoff_date}} we have no access to your server. We cannot look inside it or repair it. This page tells you what to check, and who to ask.

## First, check these

| What you see | Most likely | What to do |
|---|---|---|
| The address does not open at all | Domain name expired, or the server is off | Log in to {{domain_registrar}}: is the domain paid? Log in to {{host_company}}: is the server running? Is the payment card valid? |
| Browser says "not secure" | The server was off for a long time | Restart the server at {{host_company}}. Wait ten minutes |
| The site opens, but the editor does not | The editor stopped | Restart the server. Still not working: run `./oneshot status` |
| I saved, but the site did not change | The rebuild did not finish | Wait two minutes. Save again. Still old: run `./oneshot status` |
| I forgot my password | — | On the login page press **{{label_forgot_password}}**. No email arrives: a developer can reset it on the server |
| I deleted something by mistake | — | Restore a backup. See `04-backup-and-restore.md` |

## The status command

On the server: `cd {{install_dir}}` then `./oneshot status`. It says in plain words which part is not running. Restarting the server fixes most cases.

## Who to ask

- **{{developer_contact}}** — the person or company you chose for help.
- Any developer who knows **Docker** can work on this. Give them this kit. Everything is standard and documented: `{{install_dir}}/README.md` is written for them.
- {{host_company}} support helps when the server itself does not start. They do not help with the website.

## The worst case

If the server is gone, you still have everything you need if you kept your backups:

1. The backup file — everything you typed and every photo.
2. The folder `{{install_dir}}` — also inside the zip you received at handoff.

With these two, a developer can put your website on a new server in about an hour. See "Moving to a new server" in `04-backup-and-restore.md`.

## Static-only variant

*(Replace everything above "Who to ask" with this when the site was delivered as files only.)*

Your website is plain files on your web host. There is nothing to update and almost nothing that can break. If the site is down, ask your web host. If the domain stopped working, check that it is paid at {{domain_registrar}}. To change anything on the site, give a developer the zip you received.
