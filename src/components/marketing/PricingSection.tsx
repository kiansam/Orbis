import { stripe, PLANS } from '@/lib/stripe'
import { PricingSectionClient, StripePlanPrice } from './PricingSectionClient'

async function fetchStripePrices(): Promise<StripePlanPrice[]> {
  try {
    const priceIds = [
      { key: 'starter' as const, id: PLANS.starter.priceId },
      { key: 'pro' as const, id: PLANS.pro.priceId },
    ].filter((p): p is { key: 'starter' | 'pro'; id: string } =>
      typeof p.id === 'string' && p.id.length > 0 && !p.id.includes('placeholder')
    )

    if (!priceIds.length) return []

    const prices = await Promise.all(
      priceIds.map(async ({ key, id }) => {
        const price = await stripe.prices.retrieve(id)
        return {
          key,
          price: price.unit_amount ? Math.round(price.unit_amount / 100) : null,
        }
      })
    )

    return prices
  } catch {
    // Stripe not configured — fall back to PLANS constants
    return []
  }
}

export async function PricingSection() {
  const stripePrices = await fetchStripePrices()
  return <PricingSectionClient stripePrices={stripePrices} />
}
