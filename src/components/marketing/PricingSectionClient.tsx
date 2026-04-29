'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
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
      // handle silently
    } finally {
      setLoading(null)
    }
  }

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#0D1526] border-t border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="t-label text-[#4169FF]">Pricing</span>
          <h2 className="t-h1 text-white mt-3 mb-4">Simple, transparent pricing</h2>
          <p className="t-body-lg text-[#8A97B0] max-w-2xl mx-auto">
            Choose the plan that fits your enterprise needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planKeys.map((planKey, i) => {
            const plan = PLANS[planKey]
            const isPro = planKey === 'pro'
            const isEnterprise = planKey === 'enterprise'
            const displayPrice = priceOverrides.has(planKey)
              ? priceOverrides.get(planKey)
              : plan.price

            return (
              <motion.div
                key={planKey}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className={cn(
                  'relative rounded-xl p-6 border transition-colors duration-200',
                  isPro
                    ? 'bg-[#0D1526] border-[rgba(65,105,255,0.5)] md:scale-105'
                    : 'bg-[#0D1526] border-[#1E2D4A] hover:border-[#141E33]'
                )}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="t-h3 text-white mb-2">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-4">
                    {displayPrice !== null && displayPrice !== undefined ? (
                      <>
                        <span className="t-mono text-[40px] font-bold text-white leading-none">${displayPrice}</span>
                        <span className="t-body-sm text-[#4F617A] mb-1">/month</span>
                      </>
                    ) : (
                      <span className="t-mono text-[40px] font-bold text-white leading-none">Custom</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div
                        className={cn(
                          'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
                          isPro ? 'bg-[#4169FF]' : 'bg-[rgba(65,105,255,0.12)]'
                        )}
                      >
                        <Check className={cn('w-3 h-3', isPro ? 'text-white' : 'text-[#4169FF]')} />
                      </div>
                      <span className="t-body text-[#8A97B0]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isEnterprise ? (
                  <Link href="/contact" className="btn-ghost w-full justify-center">
                    Contact Sales
                  </Link>
                ) : (
                  <button
                    className={cn('w-full justify-center', isPro ? 'btn-primary' : 'btn-ghost')}
                    onClick={() => handleCheckout(planKey)}
                    disabled={loading === planKey}
                  >
                    {loading === planKey ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
