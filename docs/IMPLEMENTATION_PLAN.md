# AUREON CAPITAL AI — Technical Implementation Plan

**Status:** Draft for build execution
**Stack:** Ruby on Rails 7 (Hotwire/Turbo/Stimulus) · PostgreSQL · Redis/Sidekiq · Anthropic Claude API · Skool (community) · Stripe/Paystack · Resend · Hostinger KVM 4
**Companion doc:** Phased Build Plan ($1,100 budget, 4 phases, 8 weeks)

This document translates the product/business proposal into a buildable system: architecture, data model, service boundaries, third-party integration contracts, and the security posture needed for a platform that touches money, investment intent, and financial trading actions.

---

## 1. Guiding Constraints

These shape almost every decision below, so they're stated up front:

- **Single VPS, single environment.** $1,100 total budget means no separate staging server. Mitigate with Docker Compose locally + CI checks before every deploy, not a staging tier.
- **Server-rendered, not SPA.** Hotwire (Turbo + Stimulus) keeps the team small (no separate API/frontend build), matches the budget plan's stack line, and is fast enough for forums, dashboards, and forms.
- **Community is Skool, not custom-built.** Skool has no public API and no SSO/webhook system for arbitrary use. Design the integration as **link-out + manual/semi-automated reconciliation**, not deep technical coupling. This is a hard constraint — see §6.1.
- **The Investors and News Terminal features carry real regulatory exposure** (investment advice, order execution). The technical plan treats these as *lead-generation and read-mostly* tools in v1, not automated advisory/execution engines, until legal review says otherwise. This is a compliance decision with technical consequences — see §8.

---

## 2. System Architecture

```
                              ┌────────────────────────────┐
                              │        Users (Web)          │
                              └──────────────┬───────────────┘
                                             │ HTTPS (TLS via Let's Encrypt)
                              ┌──────────────▼───────────────┐
                              │   Nginx (reverse proxy, TLS)  │
                              └──────────────┬───────────────┘
                                             │
                              ┌──────────────▼───────────────┐
                              │   Puma (Rails app server)     │
                              │   Rails 7 monolith             │
                              │   - Hotwire/Turbo/Stimulus     │
                              │   - Devise + Pundit             │
                              └──┬──────┬──────┬──────┬───────┘
                                 │      │      │      │
             ┌───────────────────┘  ┌───┘   ┌──┘   ┌──┘
             ▼                      ▼        ▼      ▼
   ┌──────────────────┐   ┌────────────┐ ┌──────────────┐ ┌───────────────┐
   │ PostgreSQL         │   │ Redis /    │ │ Sidekiq      │ │ Active Storage │
   │ (primary datastore)│   │ Sidekiq    │ │ (bg jobs)    │ │ (local → S3)   │
   └──────────────────┘   │ queue       │ └──────┬───────┘ └───────────────┘
                            └────────────┘        │
                                                    │ outbound calls
                          ┌─────────────────────────┼─────────────────────────┐
                          ▼                          ▼                         ▼
                ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
                │ Anthropic Claude   │     │ Stripe / Paystack  │     │ Resend (email)     │
                │ API (Haiku/Sonnet) │     │ (billing, webhooks)│     │ transactional +    │
                └──────────────────┘     └──────────────────┘     │ newsletter          │
                                                                     └──────────────────┘
                          ┌──────────────────┐     ┌──────────────────┐
                          │ TradingView         │     │ Skool               │
                          │ (charts/widgets,     │     │ (community hosting, │
                          │  no order routing v1)│     │ link-out only)      │
                          └──────────────────┘     └──────────────────┘
```

**Why a monolith:** at this budget and team size, a Rails monolith with clear internal service objects (`app/services/`) gets you to market fastest and is the cheapest to operate on one VPS. Extract a service only when a concrete scaling or team-boundary problem shows up — not preemptively.

---

## 3. Backend Architecture

### 3.1 Domain modules (Rails engines-lite, i.e. namespaced folders, not real engines)

```
app/
  models/
  controllers/
  services/
    community/       # Skool link-out, verification workflow
    ai/               # Claude API client, model router, prompt templates
    billing/          # Stripe/Paystack subscription + one-off charges
    news_terminal/     # News ingestion, AI summarization, signal display
    investors/         # Intake form, routing to customer care
    events/            # Event CRUD, paid listing workflow
    newsletter/         # Article publishing, Resend subscriber sync
  jobs/               # Sidekiq workers
  policies/           # Pundit authorization
  mailers/
```

### 3.2 Core data model (initial migration set)

**Identity & access**
- `users` — email, encrypted_password (Devise), role (enum: `member`, `verified_trader`, `event_organizer`, `admin`), two_factor fields
- `profiles` — display_name, bio, avatar (Active Storage), track_record_summary
- `verifications` — user_id, status (`pending`/`approved`/`rejected`), evidence (attached files), reviewed_by (admin user_id), reviewed_at, notes

**Billing**
- `subscriptions` — user_id, plan (`basic`/`pro`), status, provider (`stripe`/`paystack`), provider_subscription_id, current_period_end
- `charges` — polymorphic (subscription, event_listing, etc.), amount_cents, currency, provider_charge_id, status

**Community (Skool bridge)**
- `community_links` — user_id, skool_profile_url or email used on Skool, linked_at (self-reported by user, admin-spot-checked — see §6.1)

**News Terminal**
- `news_items` — headline, source, url, published_at, ai_summary (text), sentiment (enum), symbols (array)
- `watchlists` — user_id, symbol
- `order_intents` — user_id, symbol, side (`buy`/`sell`), quantity, status (`draft` in v1 — no execution)

**Investors**
- `investor_inquiries` — name, email, phone, investment_horizon (`short_term`/`long_term`), amount_range, risk_notes, status (`new`/`contacted`/`closed`), assigned_to (admin)

**Articles / Newsletter**
- `articles` — title, slug, body (rich text via Action Text), author_id, published_at
- `newsletter_subscribers` — email, confirmed_at, resend_contact_id

**Events**
- `events` — organizer_id, title, description, starts_at, location, payment_status, listing_fee_cents, published_at

**Audit**
- `audit_logs` (via PaperTrail `versions` table) — tracks changes to verifications, investor_inquiries, subscriptions, admin actions

### 3.3 Background jobs (Sidekiq)

- `NewsIngestionJob` — polls news source(s) on a schedule, writes `news_items`
- `NewsSummarizationJob` — calls Claude (Haiku) to summarize + tag sentiment, enqueued per new `news_item`
- `NewsletterDispatchJob` — sends published articles to Resend subscriber list
- `SubscriptionWebhookJob` — processes Stripe/Paystack webhook payloads (received synchronously by controller, processed async)
- `VerificationReminderJob` — nudges admins on stale pending verifications

### 3.4 AI service layer (`app/services/ai/`)

- `Ai::ModelRouter` — single entry point; decides Haiku vs Sonnet based on task type (`:news_summary`, `:client_integration`, `:support_draft`), enforces per-request token ceilings
- `Ai::ClaudeClient` — thin wrapper over the Anthropic Ruby SDK/HTTP client; centralizes API key handling, retry/backoff, and **prompt caching** (cache the system prompt + static context blocks for News Terminal and client-integration flows — this is the ~90% cost reduction referenced in the budget doc)
- All AI calls go through this layer — no controller should call the Anthropic API directly. This keeps cost controls, logging, and model routing in one place.

---

## 4. Frontend Architecture

- **Rendering:** server-rendered ERB/Turbo Frames/Turbo Streams. No React/SPA — keeps the build inside the Rails budget and skill set implied by the stack.
- **Real-time-feeling UX:** Turbo Streams for News Terminal updates (new headlines push into the feed via Sidekiq → Turbo Stream broadcast) and community verification status changes.
- **Interactivity:** Stimulus controllers for form validation, watchlist toggling, order-intent draft form, TradingView widget embed lifecycle.
- **Styling:** Tailwind CSS (utility-first, fast to build, no separate design system to maintain on this budget).
- **Charts:** TradingView Lightweight/Advanced Charting widget embedded via `<script>` + Stimulus controller — no self-built charting.
- **Design system scope:** intentionally minimal — component partials (`_card.html.erb`, `_badge.html.erb` for the verification checkmark, `_paywall.html.erb`) rather than a full component library.

---

## 5. Feature-to-Architecture Mapping

| Feature | Build approach | Key risk |
|---|---|---|
| I. Community Hub | Skool (external) + `community_links` bridge table + manual verification queue in Rails admin | No API — reconciliation is manual/self-reported (§6.1) |
| II. AI Integration for Clients | Internal admin-facing tooling + case-tracking (`ai_engagements` table, not detailed above — add in Phase 3) for AI engineers to log client integration work | Service delivery, not pure software — scope creep risk |
| III. Investors Section | Intake form → `investor_inquiries` → notify customer care via email/Sidekiq job. **No automated advice, no execution.** | Regulatory — see §8 |
| IV. News Terminal | Read + AI summary + **draft** order intent only in v1; real order routing deferred pending broker/exchange API + compliance review | Broker-dealer/licensing exposure if "place order" becomes literal |
| V. Articles & Newsletter | Action Text + Resend | Low risk |
| VI. Events | CRUD + Stripe/Paystack one-time charge gate on publish | Low risk |

---

## 6. Third-Party Integration Contracts

### 6.1 Skool (Community)

Skool does not expose a public API, OAuth/SSO, or reliable webhooks for third-party platforms as of this plan. Treat it as an opaque external system:

1. Aureon creates the Forex/Crypto/Stocks communities on Skool.
2. Rails app stores a deep link to each Skool community; "Join Community" buttons link out (`target="_blank"`).
3. Users self-report their Skool username/profile URL in `community_links` (used for the verification workflow — an admin cross-checks track record claims against the user's Skool activity manually).
4. **Verification checkmark** is an internal Rails concept (`verifications` table + `_badge.html.erb` partial rendered on `profiles`), awarded by admin review — it does not depend on any Skool data feed.
5. Revisit if Skool ships a public API; until then, do not build automation that assumes one exists.

### 6.2 Anthropic Claude API

- Models: Haiku 4.5 for high-volume/low-latency (news summarization, support drafts), Sonnet 4.6 for premium/complex (client AI integration work, investor-facing copy review).
- Prompt caching enabled from the first call for any repeated system/context block.
- Spend control: set a hard monthly cap via Anthropic Console billing alerts; `Ai::ModelRouter` enforces a max-tokens ceiling per call type so a runaway loop can't blow the budget.
- API key stored in Rails encrypted credentials, never in `.env` committed to the repo.

### 6.3 Billing (Stripe primary, Paystack as regional alternative)

- Use the `pay` gem (Rails-standard billing abstraction) if it supports both processors cleanly, else two thin service objects sharing a common `Billing::ChargeResult` interface.
- Webhooks: verify signatures on every inbound webhook (`Stripe::Webhook.construct_event`, Paystack HMAC check) before processing — never trust unsigned payloads.
- No card data ever touches the Rails app or database — Stripe Elements / Paystack inline checkout only. This keeps PCI scope to SAQ A.

### 6.4 Resend (Email)

- Transactional (verification emails, investor inquiry confirmations) via Resend API/SMTP through ActionMailer.
- Newsletter subscriber sync: on `newsletter_subscribers` create, push contact to Resend's audience via API (Sidekiq job, not inline in request cycle).

### 6.5 TradingView

- Embed via TradingView's widget/charting library (free tier) for chart display in the News Terminal.
- **No order execution integration in Phase 1–4.** "Buy/Sell" in the News Terminal creates an `order_intents` record only (a saved trade idea/journal entry). Actual execution requires a licensed broker or exchange API integration and a compliance sign-off — scope explicitly deferred, flagged in the roadmap, not silently dropped.

---

## 7. Phased Build — Technical Checklist

Mirrors the existing budget-phase document; this adds the engineering task list per phase.

### Phase 1 — Foundation (Weeks 1–2)
- [ ] Provision Hostinger KVM 4, harden (SSH key-only, ufw, fail2ban, unattended-upgrades)
- [ ] Rails 7 app scaffold, Postgres, Puma + Nginx, Kamal or Capistrano deploy pipeline
- [ ] Devise auth + email verification (Resend free tier SMTP), Pundit roles
- [ ] Community Hub link-out pages (Forex/Crypto/Stocks) + `community_links`
- [ ] Articles (Action Text) + newsletter signup (Resend free tier)
- [ ] CI: GitHub Actions running RSpec, Rubocop, Brakeman, bundler-audit on every push

### Phase 2 — Monetisation Core (Weeks 3–5)
- [ ] Stripe/Paystack subscription tiers (Basic $9/mo, Pro $29/mo) + webhook handling
- [ ] `Ai::ModelRouter` + `Ai::ClaudeClient` with prompt caching
- [ ] News Terminal v1 (news ingestion job, AI summary, gated behind Pro), `order_intents` (draft-only)
- [ ] Verification workflow (`verifications` table, admin review queue, checkmark badge)

### Phase 3 — AI Integrations & Investors (Weeks 6–7)
- [ ] Client AI-integration engagement tracking (admin tool for the AI engineering service line)
- [ ] Investor intake form → `investor_inquiries` → Sidekiq notification to customer care queue
- [ ] Legal disclaimer copy on all Investor and News Terminal surfaces (pending real legal review)
- [ ] Resend paid tier upgrade once subscriber count requires it

### Phase 4 — Events & Scale (Week 8, launch)
- [ ] Events CRUD + paid listing gate (Stripe/Paystack one-time charge)
- [ ] Active Storage → S3 migration for avatars/attachments once local VPS storage is a constraint
- [ ] Load/uptime check: UptimeRobot (free) + Sentry (free tier) wired in
- [ ] Public launch checklist (see §9)

---

## 8. Compliance & Legal Flags (non-negotiable before real-money features go live)

These are not implementation details Claude Code can resolve — they need a human legal review before Phase 3/4 features accept real user funds or trading instructions:

1. **Investors Section** — collecting investment amount/horizon and "advising" on returns can constitute regulated investment advice depending on jurisdiction. v1 scope is intentionally a lead-intake form routed to human customer care, not an automated advisor. Do not add automated portfolio recommendations without legal sign-off.
2. **News Terminal order placement** — "place buy/sell orders directly from the terminal" implies broker-dealer functionality. v1 implements this as a saved trade-idea/journal (`order_intents`), not live execution. Real execution requires a broker/exchange API partnership and likely a licensing review.
3. **Trader verification / checkmark** — market as "verified track record reviewed by Aureon," not as a guarantee, to limit liability if a verified trader later scams someone.
4. **Data handling** — investor inquiry data (name, phone, financial intent) is sensitive; store with the same protections as PII in §9.3, and add a data retention/deletion policy before launch.

---

## 9. Security Architecture

### 9.1 Authentication & Authorization
- Devise for auth; `devise-two-factor` (TOTP) required for `admin` and `verified_trader` roles at minimum, optional for members.
- Pundit policies per resource — no controller action trusts `current_user` role checks inline; all authorization goes through a policy class.
- Session cookies: `Secure`, `HttpOnly`, `SameSite=Lax`; short session timeout for admin role.

### 9.2 Application-layer protections
- Rails defaults: CSRF protection on, strong parameters everywhere, ActiveRecord parameterized queries (no raw SQL interpolation).
- `secure_headers` gem for CSP, HSTS, X-Frame-Options, X-Content-Type-Options.
- `rack-attack` for rate limiting: login attempts, password reset requests, investor form submissions, and any AI-triggering endpoint (prevents cost-abuse of the Claude API via scripted spam).
- CSP explicitly allow-lists TradingView's widget domain and Resend/Stripe/Paystack script origins — no wildcard `script-src`.

### 9.3 Data protection
- TLS everywhere (Let's Encrypt via Nginx, auto-renew).
- `ActiveRecord::Encryption` for at-rest encryption of investor phone numbers and any financial-intent free-text fields.
- No card numbers ever stored (Stripe/Paystack hosted fields only — PCI SAQ A scope).
- Nightly `pg_dump` backup, encrypted, shipped to S3 (aligns with the budgeted S3 line), 30-day retention, quarterly restore test.
- Secrets via Rails encrypted credentials (`config/credentials.yml.enc`) or environment variables injected at deploy time — never committed to version control.

### 9.4 Third-party call safety
- All outbound webhooks (Stripe/Paystack) verified by signature before processing.
- Anthropic API key scoped, spend-capped, and never exposed client-side (all calls server-to-server through `Ai::ClaudeClient`).
- Outbound AI prompts sanitize/strip any accidental PII beyond what's needed for the task (e.g., don't send full investor phone numbers into a Claude summarization prompt).

### 9.5 Infrastructure hardening (Hostinger KVM 4)
- SSH key-only login, non-standard port optional, `fail2ban` on SSH and login endpoints.
- `ufw` firewall: only 80/443/22 open.
- Automatic OS security updates (`unattended-upgrades`).
- Single VPS means no blue/green infra — use Kamal (Docker-based, zero-downtime single-host deploys) so deploys don't require manual downtime windows.

### 9.6 Monitoring & incident response
- Sentry (free tier) for exception tracking.
- UptimeRobot (free) for external uptime checks on the public site and News Terminal endpoint.
- Lograge for structured Rails logs; ship to a local rotated log file (no budget for a hosted log aggregator at launch — revisit post-revenue).
- Documented incident runbook: who gets paged (initially just the founder/admin), rollback procedure via Kamal, DB restore procedure from the S3 backup.

### 9.7 Static/dependency scanning (CI-enforced)
- `brakeman` (Rails static security analyzer) on every PR/push.
- `bundler-audit` for known-CVE gem dependencies.
- `rubocop` for style/consistency, not a security control but keeps the single-developer codebase reviewable.

---

## 10. Testing Strategy

- **Unit/model specs (RSpec):** all models, especially billing state transitions and verification status transitions.
- **Service specs:** `Ai::ModelRouter` (correct model selection, token ceiling enforcement), `Billing::*` (webhook signature rejection on tampered payloads).
- **Request/system specs:** auth flows, subscription upgrade/downgrade, investor form submission, event payment gate.
- **Manual QA before each phase ships:** the checklist in §7 doubles as the phase-exit QA list.

---

## 11. Explicit Out-of-Scope (v1)

To keep the $1,100/8-week build honest, these are named non-goals unless funded separately:

- Live trade execution / broker-dealer order routing (News Terminal is journal-only in v1)
- Automated/algorithmic investment advice
- Custom-built community/forum system (Skool is the community layer)
- Mobile native apps (responsive web only)
- Multi-region/HA infrastructure (single VPS by design, revenue-gated upgrade path noted in the budget doc)

---

## 12. Open Dependencies Requiring a Decision Before Phase 2

1. Final pick: Stripe vs Paystack vs both (affects which regions can subscribe day one).
2. News source for the News Terminal (a licensed/legal news feed API — not scraping) — has its own cost line not yet in the $1,100 budget if a paid feed is required.
3. Legal review sign-off on Investors Section and News Terminal copy before Phase 3 goes live (§8).
