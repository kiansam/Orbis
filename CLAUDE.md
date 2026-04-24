# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test runner configured.

### Local Stripe webhook testing
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Database
```bash
supabase db push   # Run pending migrations
```

## Architecture

NexusAI is a Next.js 16 App Router SaaS platform with Supabase (auth + PostgreSQL) and Stripe payments.

### Route Groups
- `(marketing)/` — public pages (homepage, blog, contact, about)
- `(auth)/` — login, signup, forgot/reset password
- `dashboard/` — protected user portal (redirects to login if unauthenticated)
- `admin/` — admin-only (requires `role = 'admin'` on the user's profile)

### Middleware & Route Protection
`src/middleware.ts` (proxies `src/proxy.ts`) intercepts all requests:
- Unauthenticated users accessing `/dashboard/*` or `/admin/*` → redirect to `/login`
- Authenticated non-admins accessing `/admin/*` → redirect to `/dashboard`
- Authenticated users accessing auth pages → redirect to `/dashboard`
- Admin role is stored in the `profiles.role` column in Supabase

### Supabase Client Usage
Three separate clients for different contexts:
- `lib/supabase/client.ts` — browser (Client Components)
- `lib/supabase/server.ts` — server (Server Components, API routes)
- `lib/supabase/middleware.ts` — middleware only (session refresh)

### Database Schema (Supabase PostgreSQL with RLS)
- **profiles** — extends `auth.users`: full_name, avatar_url, role, is_suspended
- **subscriptions** — Stripe plan tracking: plan (free|starter|pro|enterprise), status, stripe_customer_id, stripe_subscription_id, current_period_end
- **posts** — blog CMS: title, slug, content, excerpt, cover_image, tags, is_published
- **contact_submissions** — contact form inbox
- **notification_preferences** — per-user email preferences

All tables have Row Level Security. Users can only access their own rows; admins have full access; published posts are publicly readable.

### Payment Flow (Stripe)
1. User selects a plan → POST `/api/checkout` → creates Stripe checkout session
2. After payment → Stripe webhook → `/api/webhooks/stripe`
3. Webhook updates `subscriptions` table: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Billing portal (plan changes, cancellations) via `/api/billing/portal`

Plan definitions live in `lib/plans.ts`; Stripe price IDs come from env vars (`STRIPE_STARTER_PRICE_ID`, `STRIPE_PRO_PRICE_ID`).

### Key Shared Code
- `lib/types.ts` — TypeScript interfaces: Profile, Subscription, Post, ContactSubmission
- `lib/validations.ts` — Zod schemas for all forms
- `lib/utils.ts` — `cn()`, `formatDate()`, `formatPrice()` helpers
- `components/ui/` — shadcn/ui primitives (do not edit directly; regenerate via `shadcn` CLI)

### Seeding an Admin User
Sign up normally → verify email → manually set `role = 'admin'` in the Supabase dashboard on the `profiles` table.

## Environment Variables
See `.env.example` for all required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_STARTER_PRICE_ID` / `STRIPE_PRO_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`

## Tech Stack
Next.js 16, React 18, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Framer Motion, Supabase (Auth + PostgreSQL), Stripe, Resend (email), React Hook Form + Zod, Recharts, next-mdx-remote (blog).
