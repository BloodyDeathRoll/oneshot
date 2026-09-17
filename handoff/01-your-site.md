# Your website — {{business_name}}

This paper explains where your website lives and what belongs to you.

## The short version

- Your website: **{{site_url}}**
- Where you edit it: **{{admin_url}}**
- It belongs to you. All of it: the design, the text, the photos, the server, the domain name.
- From {{handoff_date}} we have no access to it. We cannot see it, change it, or fix it. Only you can, and people you choose.

## Where it lives

Your website runs on a small rented computer (a "server") at **{{host_company}}**.

- You pay {{host_company}} about **{{host_monthly_cost}}** each month. If this is not paid, the website stops.
- You log in to {{host_company}} here: {{host_login_url}}
- The server's address is `{{server_ip}}`.
- On the server, everything is in one folder: `{{install_dir}}`.

Your domain name is registered at **{{domain_registrar}}**. It renews on **{{domain_renewal_date}}**. If it is not renewed, the address stops working, even if the server is fine.

## What is inside

Three parts work together on your server:

1. **The website** — the pages your customers see.
2. **The editor** — the place where you change prices, hours, photos and text.
3. **The database** — where the editor keeps what you typed.

When you press **Save** in the editor, the website rebuilds itself. The change is live in about one minute.

## What you need to do

| How often | What | Guide |
|---|---|---|
| When something changes | Edit prices, hours, photos, text | `03-how-to-edit.md` |
| Every month | Make a backup and copy it off the server | `04-backup-and-restore.md` |
| Every month | Update | `05-update.md` |
| Every year | Renew the domain name. Check that the {{host_company}} payment card is still valid | — |

## Static-only variant

*(Use this section instead of "Where it lives", "What is inside" and "What you need to do" when the site was delivered as files only.)*

You received one zip file. It holds the finished website and its source. Upload the folder `site/` to any web host. There is no editor. To change anything on the site, a developer edits the source and builds it again. Instructions for the developer are in `SOURCE-README.md` inside the zip.
