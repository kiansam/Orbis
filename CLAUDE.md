# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

### Local Stripe webhook testing
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Database
```bash
supabase db push   # Run pending migrations (migrations live in /supabase/migrations/)
```

## Architecture

Orbis Solutions is a Next.js 16 App Router SaaS platform with Supabase (auth + PostgreSQL) and Stripe subscriptions.

### Route Groups
- `(marketing)/` — public pages; layout has Navbar + Footer
- `(auth)/` — login, signup, forgot/reset password; centered auth layout
- `dashboard/` — protected user portal with sidebar; redirects to `/login` if unauthenticated
- `admin/` — admin-only (requires `role = 'admin'` on the `profiles` row); redirects non-admins to `/dashboard`

### Middleware & Route Protection
`src/middleware.ts` delegates to `src/proxy.ts`. The proxy fast-paths public routes (no Supabase call) to avoid cold-start latency, then authenticates protected routes and checks admin role before allowing access to `/admin/*`.

### Supabase Client Usage
Three separate clients must be used in the correct context:
- `lib/supabase/client.ts` — browser (Client Components); `createBrowserClient()`
- `lib/supabase/server.ts` — server (Server Components, API routes); `createServerClient()` with cookies
- `lib/supabase/middleware.ts` — middleware only; refreshes session tokens on every request

Webhook handlers use the **service role key** to bypass RLS when writing subscription data.

### Database Schema (Supabase PostgreSQL with RLS)
- **profiles** — extends `auth.users`: `full_name`, `avatar_url`, `role` (user|admin), `is_suspended`
- **subscriptions** — Stripe plan tracking: `plan` (free|starter|pro|enterprise), `status`, `stripe_customer_id`, `stripe_subscription_id`, `current_period_end`
- **posts** — blog CMS: `title`, `slug` (unique), `content`, `excerpt`, `cover_image`, `tags[]`, `is_published`
- **contact_submissions** — contact form inbox
- **notification_preferences** — per-user email opt-ins

A database trigger (`on_auth_user_created`) auto-creates `profiles`, `subscriptions`, and `notification_preferences` rows on signup. A second trigger keeps `updated_at` current. All tables have RLS; users access only their own rows; admins have full access; published posts are public.

### Payment Flow (Stripe)
1. User selects a plan → POST `/api/checkout` → creates Stripe checkout session (stores `stripe_customer_id` on first checkout)
2. After payment → Stripe webhook → `/api/webhooks/stripe` (signature verified with `STRIPE_WEBHOOK_SECRET`)
3. Webhook updates `subscriptions` table on: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Plan changes and cancellations go through `/api/billing/portal` (Stripe billing portal)

Plan definitions and feature lists live in `lib/plans.ts`; price IDs come from `STRIPE_STARTER_PRICE_ID` / `STRIPE_PRO_PRICE_ID`.

### Contact Form & Email
POST `/api/contact` validates with Zod, inserts into `contact_submissions`, then fires two Resend emails (admin notification + user confirmation). Email failure is non-fatal and does not fail the request.

### Blog (MDX)
Blog posts are stored in the `posts` table and rendered server-side with `next-mdx-remote`. The blog post page uses ISR (`export const revalidate = 60`). The admin CMS at `/admin/blog` handles create/edit/publish.

### Key Shared Code
- `lib/types.ts` — TypeScript interfaces: `Profile`, `Subscription`, `Post`, `ContactSubmission`, `NotificationPreferences`
- `lib/validations.ts` — Zod schemas for every form (login, signup, contact, profile, blog post, password change)
- `lib/utils.ts` — `cn()`, `formatDate()`, `formatPrice()`
- `lib/plans.ts` — client-safe plan definitions (names, prices, features)
- `lib/stripe.ts` — lazy Stripe singleton; use `stripe` (server) or `getStripe()` (client)
- `components/ui/` — shadcn/ui primitives; regenerate via `shadcn` CLI, do not edit directly

### Forms
All forms use **React Hook Form + Zod**: `useForm` with `zodResolver(schema)`. Errors surface via shadcn `toast` from `hooks/use-toast.ts`.

### Seeding an Admin User
Sign up normally → verify email → set `role = 'admin'` directly in the Supabase dashboard on the `profiles` table.

## Environment Variables
Copy `.env.example` to `.env.local`. Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_STARTER_PRICE_ID` / `STRIPE_PRO_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`

## Tech Stack
Next.js 16, React 18, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Framer Motion, Supabase (Auth + PostgreSQL), Stripe, Resend, React Hook Form + Zod, Recharts, next-mdx-remote.
