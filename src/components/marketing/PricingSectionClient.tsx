'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PLANS } from '@/lib/plans'

export interface StripePlanPrice {
  key: 'starter' | 'pro' | 'enterprise'
  price: number | null
}

interface PricingSectionClientProps {
  stripePrices?: StripePlanPrice[]
}

const planKeys = ['starter', 'pro', 'enterprise'] as const

export function PricingSectionClient({ stripePrices }: PricingSectionClientProps) {
  const [loading, setLoading] = useState<string | null>(null)

  // Build a price override map from Stripe
  const priceOverrides = new Map(stripePrices?.map((p) => [p.key, p.price]) ?? [])

  const handleCheckout = async (planKey: string) => {
    setLoading(planKey)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error === 'Unauthorized') {
        window.location.href = '/login?redirectTo=/pricing'
      }
    } catch {
      // handle error silently
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Pricing</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Choose the plan that fits your enterprise needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planKeys.map((planKey, i) => {
            const plan = PLANS[planKey]
            const isPro = planKey === 'pro'
            const isEnterprise = planKey === 'enterprise'
            const displayPrice = priceOverrides.has(planKey) ? priceOverrides.get(planKey) : plan.price

            return (
              <motion.div
                key={planKey}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={cn(
                  'relative rounded-2xl p-8 border transition-all duration-300',
                  isPro
                    ? 'bg-accent/10 border-accent/50 shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)] scale-105'
                    : 'bg-background-card border-border hover:border-border-strong'
                )}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    {displayPrice !== null && displayPrice !== undefined ? (
                      <>
                        <span className="text-4xl font-bold text-foreground">${displayPrice}</span>
                        <span className="text-foreground-muted mb-1">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-foreground">Custom</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                        isPro ? 'bg-accent' : 'bg-accent-muted'
                      )}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-foreground-muted text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isEnterprise ? (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border-strong hover:bg-white/5"
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      'w-full',
                      isPro
                        ? 'bg-accent hover:bg-accent-hover text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                        : 'bg-white/10 hover:bg-white/15 text-foreground border border-border-strong'
                    )}
                    onClick={() => handleCheckout(planKey)}
                    disabled={loading === planKey}
                  >
                    {loading === planKey ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Get Started
                      </span>
                    )}
                  </Button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
