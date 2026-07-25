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

## After deploy — create your first account

There is no seeded user. Visit `https://platform.aureoncapitalai.com/signup`,
create an account (password ≥ 8 chars), and you're in. All routes are protected;
signed-out visitors are redirected to `/login`.

To make a user an **admin**, set their `role` to `admin` in the DB:

```sql
UPDATE "User" SET role = 'admin' WHERE email = 'you@example.com';
```

## What's real vs. mock

- **Real**: auth (signup/login/logout, sessions, hashed passwords, route
  protection), the Postgres data layer for users.
- **Mock**: all feature content (community posts, news, markets, events, etc.)
  is still static sample data in `src/lib/*-data.ts`. Wiring those to the
  database is the next phase.
