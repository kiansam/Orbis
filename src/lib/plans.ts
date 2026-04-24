// Client-safe plan definitions — no Stripe SDK import
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    priceId: null as string | null,
    features: [
      "1 AI project",
      "1GB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  starter: {
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID ?? null,
    features: [
      "Up to 5 AI projects",
      "10GB storage",
      "Email support",
      "Basic analytics",
      "API access",
    ],
  },
  pro: {
    name: "Pro",
    price: 79,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
    features: [
      "Unlimited AI projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: null as number | null,
    priceId: null as string | null,
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "SLA guarantee",
      "Custom AI models",
      "On-premise option",
      "SSO & advanced security",
    ],
  },
};
