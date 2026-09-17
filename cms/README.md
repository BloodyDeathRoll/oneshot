# cms/ — Payload app: collections, multi-tenant config, hooks, docker-compose.

One codebase, two profiles, selected by one env var (name fixed by the Payload spike, see `spikes/payload/README.md`):

- **multi-tenant** — our server. Official multi-tenant plugin on, one tenant per business, owner logins scoped to their tenant. Used by the `managed` hosting mode.
- **single-tenant** — a client's own box. Tenants plugin disabled, exactly one admin user (the owner). Used by the `self_hosted_docker` hosting mode.

Both profiles have the same collections, the same content schema (`schemas/site-content.md`) and give the Astro templates the same API shape. A change that would make the profiles diverge is out of scope (PLAN.md §1, "One of everything").
