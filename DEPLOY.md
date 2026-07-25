# Deploying Aureon Capital AI

This repo is a **single full-stack Next.js app** — the UI and the API routes
(`/api/*`, including auth) are served by the **same** server on the **same**
domain. There is no separate backend service.

## ⚠️ About the two containers (platform.* and api.*)

Auth uses **same-origin cookies**. The whole app — pages **and** `/api/*` — must
be served from **one** domain. So:

- **`platform.aureoncapitalai.com`** → deploy this repo here. This is the app.
- **`api.aureoncapitalai.com`** → **not needed** by this codebase. There is no
  standalone API to run there. Leave it unused, or repurpose it later if you
  split out a dedicated backend. **Do not** try to serve the UI from one domain
  and the API from the other — that breaks login (cookies won't match).

Set `AUTH_URL` to the domain the app is actually served from
(`https://platform.aureoncapitalai.com`).

## Build

A `Dockerfile` is included. The container build:

1. `npm ci`
2. `prisma generate`
3. `npm run build` (Next.js production build)

On **start**, the container runs `prisma migrate deploy` (applies pending DB
migrations) and then `next start` on port `3000`.

No database connection is needed at build time — only at runtime.

## Required environment variables

Set these in the container's environment (Coolify → the app service → Environment):

| Variable          | Value                                                                 | Notes                                                        |
| ----------------- | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| `DATABASE_URL`    | `postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public`           | Point at your Coolify Postgres service (use its internal host). |
| `AUTH_SECRET`     | a 32+ byte random string                                              | Generate: `openssl rand -hex 32`. **Keep secret.**           |
| `AUTH_URL`        | `https://platform.aureoncapitalai.com`                                | The public URL the app is served from.                       |
| `AUTH_TRUST_HOST` | `true`                                                                 | Required behind a reverse proxy (Coolify/Traefik).           |
| `PORT`            | `3000`                                                                 | Optional; defaults to 3000.                                  |

`.env` is **git-ignored** and is **not** in the repo — set the values above in
Coolify, not in a committed file.

## Postgres on Coolify

1. In your Coolify project, add a **PostgreSQL** service (one click).
2. Copy its connection string into the app's `DATABASE_URL`. Use the
   **internal** hostname (service name) so the app talks to the DB over the
   private network, e.g. `postgresql://postgres:PASS@aureon-db:5432/postgres?schema=public`.
3. The app applies the schema automatically on first boot via
   `prisma migrate deploy` (see `prisma/migrations/`).

## Migrations with two containers (important)

Both containers build the **same image** and share **one database**, so only
**one** should apply migrations. Set on the container that should NOT migrate:

```
RUN_MIGRATIONS=false
```

Recommended: let the **API** container run migrations (leave `RUN_MIGRATIONS`
unset there) and set `RUN_MIGRATIONS=false` on the **frontend** container. Both
containers must build **this same repo at the same commit** so their
`prisma/migrations/` folders are identical — otherwise they conflict.

If a migration gets stuck in a failed state (`P3009`) and you have no data worth
keeping, reset the schema and redeploy:

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

## After deploy — create your first account

There is no seeded user. Visit `https://platform.aureoncapitalai.com/signup`,
create an account (password ≥ 8 chars), and you're in. All routes are protected;
signed-out visitors are redirected to `/login`.

To make a user an **admin**, set their `role` to `admin` in the DB:

```sql
UPDATE "User" SET role = 'admin' WHERE email = 'you@example.com';
```

## Two-container split (frontend + API) — extra vars

The **Watchlists** feature is a real DB-backed API that the browser can call on
the API container. To route data calls to `api.*` (rather than same-origin):

**Frontend image build arg** (NEXT_PUBLIC_* is baked in at build time):

```
--build-arg NEXT_PUBLIC_API_URL=https://api.aureoncapitalai.com
```

In Coolify, set `NEXT_PUBLIC_API_URL=https://api.aureoncapitalai.com` as a
**build-time** variable on the frontend service. Leave it empty to keep data
calls same-origin.

**API container runtime env** — allow the frontend origin through CORS:

| Variable         | Value                                      |
| ---------------- | ------------------------------------------ |
| `ALLOWED_ORIGIN` | `https://platform.aureoncapitalai.com`     |

Both containers still need the shared vars from the tables above (same
`AUTH_SECRET`, same `DATABASE_URL`, `AUTH_COOKIE_DOMAIN=.aureoncapitalai.com`).
The shared cookie + CORS let the logged-in session work on cross-origin calls to
`api.*`.

## What's real vs. mock

- **Real**: auth (signup/login/logout, sessions, hashed passwords, route
  protection) and **Watchlists** (create/delete lists, add/remove symbols,
  persisted per user in Postgres, served via the API with CORS).
- **Mock**: the rest of the feature content (community posts, news, markets,
  events, etc.) is still static sample data in `src/lib/*-data.ts`. Watchlists
  is the template for wiring the rest to the database.
