# Update — {{business_name}}

The programs on your server get security fixes. Installing them is one command. Do it once a month.

If you never update, the public website stays safe for a long time, because it is only plain files. The **editor** is the part that becomes unsafe. An old editor can be broken into.

## Update

1. Log in to the server: `ssh {{server_user}}@{{server_ip}}`
2. `cd {{install_dir}}`
3. Run: `./oneshot update`

What it does, by itself:

1. Makes a backup.
2. Downloads the newest tested versions.
3. Restarts the editor and rebuilds the website.
4. Checks that the website and the editor answer.
5. If the check fails, it goes back to the old version and tells you.

It takes about five minutes. The public website stays online while it runs. The editor is off for about one minute.

## After the update

1. Open {{site_url}}. Does it look right?
2. Log in at {{admin_url}}. Change something small, save, and check it shows on the site.

## If the update says it failed

Your site is still running on the old version. Nothing is lost. Send the text it printed to {{developer_contact}}.

## The server itself

The server's own system also needs updates. We switched on automatic security updates on {{handoff_date}}. Once or twice a year the server needs a restart: log in to {{host_company}} and press **Restart** (or run `sudo reboot`). The website comes back by itself in about two minutes.
