# syntax=docker/dockerfile:1

# ── Base ──────────────────────────────────────────────────────────────────────
FROM node:22-slim AS base
WORKDIR /app
# OpenSSL is required by Prisma at runtime.
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# ── Dependencies ──────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ── Build ─────────────────────────────────────────────────────────────────────
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate the Prisma client, then build the Next.js app.
# A placeholder DATABASE_URL lets the build run; the real one is injected at runtime.
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
RUN npx prisma generate
RUN npm run build

# ── Runtime ───────────────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# node_modules includes the Prisma CLI so migrations can run on start.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma ./prisma
COPY package.json next.config.ts prisma.config.ts ./

EXPOSE 3000

# Apply any pending migrations, then start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start -- -H 0.0.0.0 -p ${PORT:-3000}"]
