# Back up and restore — {{business_name}}

A backup is one file. It holds everything you typed into the editor and every photo you uploaded.

Make one every month, and before every update. Nobody else does this for you.

## Make a backup

You need the server login from your credentials sheet. If you do not use a terminal, ask {{developer_contact}} to do this. It takes two minutes.

1. Log in to the server: `ssh {{server_user}}@{{server_ip}}`
2. Go to the folder: `cd {{install_dir}}`
3. Run: `./oneshot backup`
4. It prints the name of the new file, for example `{{backup_dir}}/backup-2026-09-17.tar.gz`.

## Copy the backup off the server

A backup that stays on the server is lost when the server is lost.

From your own computer, run:

`scp {{server_user}}@{{server_ip}}:{{backup_dir}}/backup-DATE.tar.gz .`

Keep the file in two places: your computer, and a cloud drive or USB stick.

## Put a backup back (restore)

Use this when content was deleted by mistake, or after moving to a new server.

1. Copy the backup file to the server, into `{{backup_dir}}`.
2. `cd {{install_dir}}`
3. Run: `./oneshot restore {{backup_dir}}/backup-DATE.tar.gz`
4. It asks you to type `yes`. Everything in the editor goes back to how it was on that date. Newer changes are lost.
5. Wait two minutes. Check {{site_url}}.

## Moving to a new server

1. Rent a new server (2 processors, 4 GB memory, with Docker).
2. Copy the folder `{{install_dir}}` and your newest backup to it.
3. Run `./oneshot restore <backup file>`.
4. At {{domain_registrar}}, point your domain name to the new server's address.

A developer can do this in about an hour.

## Checked at handoff

On {{handoff_date}} we made a backup on your server, restored it, and confirmed the site came back. Backup file from that day: `{{handoff_backup_file}}` — you have a copy on {{handoff_backup_location}}.
