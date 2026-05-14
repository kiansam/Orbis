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
supabase db push        # Run pending migrations (migrations live in /supabase/migrations/)
supabase db diff        # Preview SQL diff between local schema and remote
supabase db reset       # Reset local DB and re-run all migrations (destructive)
```

### Firebase App Hosting (production deployment)
```bash
firebase apphosting:secrets:set <SECRET_NAME>   # Store a secret in Firebase Secret Manager
```
Secrets managed via Firebase: `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`. Public env vars and Stripe price IDs are set directly in `apphosting.yaml`.

## Architecture

Orbis Solutions is a Next.js 16 App Router SaaS platform with Supabase (auth + PostgreSQL) and Stripe subscriptions. It is deployed on Firebase App Hosting (see `apphosting.yaml`).

### Route Groups
- `(marketing)/` — public pages; layout has Navbar + Footer + ParticleBackground (tsparticles) + FloatingChatbot; content sits at `z-index: 1` above the particle canvas
- `(auth)/` — login, signup, forgot/reset password; layout is a sticky BrandPanel (left half, desktop only) + centered form area (right half); BrandPanel hidden on mobile via inline `<style>` tag in the layout
- `app/auth/callback/` — OAuth callback route (not inside the `(auth)` group); exchanges code for session and redirects to `/dashboard`
- `dashboard/` — protected user portal; async layout fetches profile + subscription server-side; redirects to `/login` if unauthenticated
- `admin/` — admin-only (requires `role = 'admin'` on the `profiles` row); layout re-checks admin role server-side; redirects non-admins to `/dashboard`

### Middleware & Route Protection
`src/middleware.ts` delegates to `src/proxy.ts`. The proxy skips Supabase entirely for public routes (`/`, `/about`, `/blog`, `/contact`, `/api/contact`, static assets) to avoid cold-start latency on Firebase Cloud Run. Protected routes (`/dashboard/*`, `/admin/*`) require authentication; `/admin/*` additionally requires `profiles.role = 'admin'`. Auth routes (`/login`, `/signup`, `/forgot-password`, `/reset-password`) redirect already-logged-in users to `/dashboard`.

The admin role check is intentionally duplicated: once in `proxy.ts` (middleware) and once in `app/admin/layout.tsx` (server component). Both must remain — the layout is a defense-in-depth fallback.

### Supabase Client Usage
Three separate clients must be used in the correct context:
- `lib/supabase/client.ts` — browser (Client Components); `createBrowserClient()`
- `lib/supabase/server.ts` — server (Server Components, API routes); `createServerClient()` with cookies; uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `lib/supabase/middleware.ts` — middleware only; refreshes session tokens; uses `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (different env var from anon key, though same value in production)

Webhook handlers and privileged API routes create an **inline admin client** using `createServerClient` with `SUPABASE_SERVICE_ROLE_KEY` and no-op cookie handlers — this bypasses RLS. Do not use the shared server client for writes that need elevated privileges. Admin pages follow this same pattern with a local `getAdminClient()` helper.

### Dashboard Server vs Client Components
The `dashboard/layout.tsx` is a Server Component that fetches auth + profile data and passes it down to the sidebar. Individual dashboard pages may be Server or Client Components:
- Server pages (default): receive no props from the layout; fetch their own data with the server Supabase client
- Client pages (marked `'use client'`): fetch their own data on mount via `useEffect` using the browser Supabase client (e.g., `settings/page.tsx`)

The layout only passes `user`, `profile`, and `plan` to `DashboardSidebar` — inner pages must fetch their own data independently.

Server pages use `Promise.all()` for parallel queries. Client pages (e.g. settings) manage multiple forms with isolated `useState`/`useEffect` and `Promise.all()` for parallel initial fetches. Both rely on toast for error feedback.

### Database Schema (Supabase PostgreSQL with RLS)
- **profiles** — extends `auth.users`: `full_name`, `avatar_url`, `role` (user|admin), `is_suspended`
- **subscriptions** — Stripe plan tracking: `plan` (free|starter|pro|enterprise), `status`, `stripe_customer_id`, `stripe_subscription_id`, `current_period_end`
- **posts** — blog CMS: `title`, `slug` (unique), `content`, `excerpt`, `cover_image`, `tags[]`, `is_published`, `published_at`
- **contact_submissions** — contact form inbox
- **notification_preferences** — per-user email opt-ins

A database trigger (`on_auth_user_created`) auto-creates `profiles`, `subscriptions`, and `notification_preferences` rows on signup. A second trigger keeps `updated_at` current. All tables have RLS; users access only their own rows; admins have full access; published posts are public.

A public Supabase Storage bucket named `avatars` must exist for avatar uploads.

### Payment Flow (Stripe)
1. User selects a plan → POST `/api/checkout` → creates Stripe checkout session (stores `stripe_customer_id` on first checkout)
2. After payment → Stripe webhook → `/api/webhooks/stripe` (signature verified with `STRIPE_WEBHOOK_SECRET`)
3. Webhook updates `subscriptions` table on: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Plan changes and cancellations go through `/api/billing/portal` (Stripe billing portal)

Plan definitions and feature lists live in `lib/plans.ts`. `lib/stripe.ts` re-exports `PLANS` from `lib/plans.ts`, so you can import `PLANS` from either. Price IDs come from `STRIPE_STARTER_PRICE_ID` / `STRIPE_PRO_PRICE_ID`.

`lib/stripe.ts` exports a lazy `stripe` singleton via ES `Proxy` — this defers instantiation to first use at request time so importing the module at build time doesn't crash on Firebase App Hosting. Always use `stripe` (server-side proxy) or `getStripe()` (client-side Stripe.js loader), never instantiate `new Stripe()` directly.

### Contact Form & Email
POST `/api/contact` validates with Zod, inserts into `contact_submissions`, then fires two Resend emails (admin notification + user confirmation). Email failure is non-fatal and does not fail the request.

### Blog (MDX)
Blog posts are stored in the `posts` table and rendered server-side with `next-mdx-remote`. The blog post page uses ISR (`export const revalidate = 60`). The admin CMS at `/admin/blog` handles create/edit/publish with `@uiw/react-md-editor` (dynamically imported with `ssr: false` to avoid hydration issues). Slugs are auto-generated from the title on the create page. Publishing sets `is_published = true` and stamps `published_at`.

### Admin Panel
The admin section covers: user management (role toggle, suspend/reinstate via `/api/admin/users/suspend`), subscriptions dashboard, blog CMS, contact inbox, and a mock analytics chart (Recharts area chart with 30-day mock data). All admin pages create their own `getAdminClient()` that bypasses RLS via the service role key — this is the same pattern as webhook handlers but scoped locally per file.

### Floating Chatbot
`components/marketing/FloatingChatbot` (rendered in the marketing layout) injects the n8n chat widget script at runtime and hides n8n branding via a `MutationObserver` that watches the shadow DOM of the `<n8n-chat>` element. The chatbot connects to `n8n.orbissolutions.ca`. Configuration (theme, welcome message, starter prompts) lives in `ChatbotSection.tsx`. Do not remove the MutationObserver logic — without it, n8n branding reappears on dynamic DOM updates.

### Key Shared Code
- `lib/types.ts` — TypeScript interfaces: `Profile`, `Subscription`, `Post`, `ContactSubmission`, `NotificationPreferences`
- `lib/validations.ts` — Zod schemas for all forms; includes auth flows (login, signup, forgot/reset password), account changes (email, password), contact, profile, blog post; each schema exports its inferred type (e.g. `LoginFormData`)
- `lib/utils.ts` — `cn()`, `formatDate()`, `formatPrice()`
- `lib/plans.ts` — client-safe plan definitions (names, prices, features); no Stripe SDK import
- `components/ui/` — shadcn/ui primitives; regenerate via `shadcn` CLI, do not edit directly

### Animation System (Marketing Pages)
`components/marketing/motion.tsx` exports reusable Framer Motion primitives — use these instead of writing raw `motion.*` components on marketing pages:
- `<FadeUp>` — scroll-triggered fade + slide-up wrapper
- `<Stagger>` / `<StaggerItem>` — staggered reveal for grids and lists
- `useCountUp(target, duration)` — animates a number from 0 to `target` when scrolled into view
- `staggerParent` / `childVariants` — raw variant objects for when you need a custom `motion.*` element inside a stagger container
- `EASE` — shared cubic bezier `[0.25, 0.1, 0.25, 1]` used across all transitions

### Forms
All forms use **React Hook Form + Zod**: `useForm` with `zodResolver(schema)`. Errors surface via shadcn `toast` from `hooks/use-toast.ts`.

### Styling & Design Tokens
The design system uses CSS custom properties defined in `globals.css`. There are two layers:
- **New tokens** (`--color-*`, `--radius-*`) — canonical design values; used in marketing pages
- **Legacy aliases** (`--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--r-*`, `--t-*`) — used throughout dashboard and auth components

Marketing pages predominantly use **inline `style={{}}` with CSS var references** (e.g., `style={{ color: 'var(--color-brand)' }}`), not Tailwind utility classes. Dashboard and admin pages use the legacy CSS class aliases (e.g., `className="bg-background-card border-border"`). Do not mix Tailwind color utilities with CSS var tokens on the same element.

Brand color: `#4169FF` (`--color-brand`). Font: Plus Jakarta Sans via `--font-sans`.

### Images
`next.config.mjs` whitelists remote image hostnames: `avatars.githubusercontent.com` (GitHub OAuth), `lh3.googleusercontent.com` (Google OAuth), `ui-avatars.com` (fallback), and the project's Supabase storage URL. Add new external image sources here.

### OAuth Setup
Enable Google and GitHub OAuth providers in Supabase dashboard → Authentication → Providers. Set Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to Redirect URLs.

### Dashboard Data
The dashboard home page (`/dashboard`) currently renders **mock statistics and activity data** hardcoded in the component. Real data is fetched only for the user's profile name and subscription plan/renewal date.

### Error & Loading Boundaries
`error.tsx` and `loading.tsx` exist for both `dashboard/` and `admin/` route segments. These are the standard Next.js App Router boundaries — add per-page variants only when the segment-level ones are insufficient.

### Seeding an Admin User
Sign up normally → verify email → set `role = 'admin'` directly in the Supabase dashboard on the `profiles` table.

## Environment Variables
Copy `.env.example` to `.env.local`. Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_STARTER_PRICE_ID` / `STRIPE_PRO_PRICE_ID`
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is required locally (used by the middleware client); in production it equals `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Tech Stack
Next.js 16, React 18, TypeScript, Tailwind CSS, shadcn/ui + Radix UI, Framer Motion, Supabase (Auth + PostgreSQL), Stripe, Resend, React Hook Form + Zod, Recharts, next-mdx-remote, @uiw/react-md-editor. Deployed on Firebase App Hosting.
