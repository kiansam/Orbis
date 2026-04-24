import { HeroSection } from '@/components/marketing/HeroSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { PricingSection } from '@/components/marketing/PricingSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

// Social proof logos (fictional companies)
const logos = [
  { name: 'Acme Corp', abbr: 'AC' },
  { name: 'TechFlow', abbr: 'TF' },
  { name: 'DataSync', abbr: 'DS' },
  { name: 'CloudNine', abbr: 'C9' },
  { name: 'Vertex AI Partners', abbr: 'VP' },
]

// How It Works steps
const steps = [
  {
    number: '01',
    title: 'Discovery & Assessment',
    description:
      'We analyze your data landscape, technology stack, and strategic objectives to identify the highest-impact AI opportunities.',
  },
  {
    number: '02',
    title: 'Strategy & Roadmap',
    description:
      'Our experts create a detailed AI implementation roadmap with clear milestones, success metrics, and resource requirements.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'We deploy AI solutions rapidly using our proven frameworks, integrating seamlessly with your existing systems and workflows.',
  },
  {
    number: '04',
    title: 'Optimize & Scale',
    description:
      'Continuous monitoring and optimization ensures your AI investment delivers growing returns as your business evolves.',
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Social Proof Bar */}
      <section className="py-12 border-y border-border bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-foreground-muted text-sm mb-8 uppercase tracking-wider font-medium">
            Trusted by leading enterprises worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity group"
              >
                <div className="w-8 h-8 rounded bg-foreground-muted/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-foreground-muted">{logo.abbr}</span>
                </div>
                <span className="text-foreground-muted font-semibold text-sm hidden sm:block">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* How It Works */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">
              Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              How Orbis Solutions works
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Our proven four-step methodology delivers measurable AI results, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-background-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
              >
                <div className="text-4xl font-bold text-accent/20 mb-4">{step.number}</div>
                <h3 className="text-foreground font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-border-strong" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <PricingSection />

      <FAQSection />

      {/* Final CTA Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-purple-500/10 to-accent/20 animate-gradient-shift bg-[length:200%_auto]" />
        <div className="absolute inset-0 gradient-mesh" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to transform your enterprise with AI?
          </h2>
          <p className="text-foreground-muted text-xl mb-8 max-w-2xl mx-auto">
            Join 500+ enterprises using Orbis Solutions to unlock the full potential of artificial intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 border border-border-strong hover:bg-white/5 text-foreground font-semibold rounded-xl transition-all"
            >
              Talk to an Expert
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['No credit card required', '14-day free trial', 'Cancel anytime'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-foreground-muted text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
