# NexusAI

AI-powered consulting and SaaS platform for modern enterprises — built with Next.js 14, Supabase, Tailwind CSS, and Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database & Auth | Supabase (PostgreSQL + RLS) |
| Styling | Tailwind CSS + shadcn/ui |
| Payments | Stripe Billing + Webhooks |
| Email | Resend |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Charts | Recharts |

---

## Project Structure

```
nexusai/
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Public marketing pages
│   │   │   ├── page.tsx        # Homepage (hero, pricing, features, FAQ)
│   │   │   ├── about/          # About page
│   │   │   ├── blog/           # Blog listing + individual posts
│   │   │   └── contact/        # Contact form
│   │   ├── (auth)/             # Auth pages
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── dashboard/          # Authenticated user portal
│   │   │   ├── page.tsx        # Dashboard home
│   │   │   └── settings/       # Profile, account, billing, notifications
│   │   ├── admin/              # Admin panel (role = 'admin' only)
│   │   │   ├── page.tsx        # Overview stats
│   │   │   ├── users/          # User management
│   │   │   ├── subscriptions/  # Subscription management
│   │   │   ├── blog/           # Blog CMS
│   │   │   └── contact/        # Contact submissions inbox
│   │   ├── api/
│   │   │   ├── checkout/       # Stripe Checkout session
│   │   │   ├── billing/portal/ # Stripe Customer Portal
│   │   │   ├── contact/        # Contact form submission
│   │   │   └── webhooks/stripe # Stripe webhook handler
│   │   └── auth/callback/      # OAuth callback handler
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── marketing/          # Navbar, Footer, Hero, Pricing, etc.
│   │   ├── dashboard/          # DashboardSidebar, StatCard
│   │   └── admin/              # AdminSidebar, UsersTable
│   ├── lib/
│   │   ├── supabase/           # Browser, server, and middleware clients
│   │   ├── stripe.ts           # Stripe instance + plan definitions
│   │   ├── types.ts            # Shared TypeScript types
│   │   ├── utils.ts            # cn(), formatDate(), formatPrice()
│   │   └── validations.ts      # Zod schemas for all forms
│   └── middleware.ts           # Route protection + admin role check
└── supabase/
    └── migrations/
        ├── 001_initial_schema.sql   # All tables, RLS, triggers
        └── 002_seed_blog_posts.sql  # Sample blog content
```

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url> nexusai
cd nexusai
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in every value:

```bash
cp .env.example .env.local
``` 

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API |
| `STRIPE_SECRET_KEY` | Stripe dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe dashboard → Webhooks (see step 5) |
| `STRIPE_STARTER_PRICE_ID` | Stripe dashboard → Products (see step 4) |
| `STRIPE_PRO_PRICE_ID` | Stripe dashboard → Products (see step 4) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for dev |
| `RESEND_API_KEY` | resend.com → API Keys |

### 3. Supabase migrations

Install the Supabase CLI if you haven't:

```bash
brew install supabase/tap/supabase
```

Link to your project:

```bash
supabase link --project-ref <your-project-ref>
```

Run the migrations:

```bash
supabase db push
```

Or run them manually in the Supabase SQL Editor by pasting the contents of:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_blog_posts.sql`

**Enable OAuth providers** in Supabase dashboard → Authentication → Providers:
- Enable **Google** and add your Google OAuth credentials
- Enable **GitHub** and add your GitHub OAuth app credentials

In the Supabase Auth settings, set the **Site URL** to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to the **Redirect URLs**.

### 4. Stripe products

Create two products in the Stripe dashboard (use test mode during development):

1. **Starter** — $29/month recurring → copy the Price ID → set `STRIPE_STARTER_PRICE_ID`
2. **Pro** — $79/month recurring → copy the Price ID → set `STRIPE_PRO_PRICE_ID`

Enterprise uses a contact form (no Stripe price needed).

### 5. Stripe webhook

For local development, install the Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret printed by the CLI and set `STRIPE_WEBHOOK_SECRET`.

For production, add a webhook endpoint in the Stripe dashboard pointing to:
```
https://your-domain.com/api/webhooks/stripe
```

Subscribe to these events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

### 6. Supabase Storage

Create a public storage bucket called `avatars` in Supabase dashboard → Storage → New bucket → name it `avatars` → make it public.

### 7. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Seeding the first admin user

1. Sign up at `/signup` with your email
2. Verify your email via the confirmation link
3. In Supabase dashboard → Table Editor → `profiles`, find your row and change `role` from `user` to `admin`
4. You now have full access to `/admin`

---

## Key routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Homepage |
| `/about` | Public | About page |
| `/blog` | Public | Blog listing |
| `/blog/[slug]` | Public | Individual blog post |
| `/contact` | Public | Contact form |
| `/login` | Public | Sign in |
| `/signup` | Public | Sign up |
| `/forgot-password` | Public | Password reset request |
| `/reset-password` | Public | New password form |
| `/dashboard` | Auth required | User portal home |
| `/dashboard/settings` | Auth required | Profile, billing, notifications |
| `/admin` | Admin only | Admin overview |
| `/admin/users` | Admin only | User management |
| `/admin/subscriptions` | Admin only | Subscription management |
| `/admin/blog` | Admin only | Blog CMS |
| `/admin/contact` | Admin only | Contact inbox |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in Vercel
3. Add all environment variables from `.env.example`
4. Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://nexusai.com`)
5. Update Supabase Auth → Site URL and Redirect URLs to include your production domain
6. Update the Stripe webhook endpoint to `https://your-domain.com/api/webhooks/stripe`
7. Deploy

---

## Pricing plans

| Plan | Price | Key limits |
|---|---|---|
| Free | $0 | 1 project, 1GB storage, community support |
| Starter | $29/mo | 5 projects, 10GB, email support, API access |
| Pro | $79/mo | Unlimited projects, 100GB, priority support, team collaboration |
| Enterprise | Custom | Dedicated support, SLA, custom AI models, SSO, on-premise option |
