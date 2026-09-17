# Credentials sheet — {{business_name}}

**Keep this paper safe. Do not photograph it. Do not send it in a chat.**
Anyone who has it can change your website.

Delivered on {{handoff_date}}. We did not keep a copy.

| What | Address | Username | Password |
|---|---|---|---|
| Website editor | {{admin_url}} | {{owner_email}} | `{{owner_password}}` |
| Server at {{host_company}} | {{host_login_url}} | {{host_account_email}} | set by you |
| Server login (for a developer) | `ssh {{server_user}}@{{server_ip}}` | {{server_user}} | key file: `{{ssh_key_filename}}` (on the USB stick / sent separately) |
| Domain name at {{domain_registrar}} | {{registrar_login_url}} | {{registrar_account_email}} | set by you |

## Do this today

1. Log in to the editor. Change your password. Guide: `03-how-to-edit.md`, step "Change your password".
2. Check that you can log in to {{host_company}} and to {{domain_registrar}} with **your own** email address. These accounts must be in your name, not ours.

## Our access ended

On {{handoff_date}} we removed from your server:

- [ ] our login keys
- [ ] our user in the editor
- [ ] our access tokens

We then tried to log in and were refused. That test is how we know the removal worked.

Signed: ______________________  Date: ______________
