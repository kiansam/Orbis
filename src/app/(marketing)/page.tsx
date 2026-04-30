import { HeroSection } from '@/components/marketing/HeroSection'
import { FeaturesSection } from '@/components/marketing/FeaturesSection'
import { PricingSection } from '@/components/marketing/PricingSection'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { FAQSection } from '@/components/marketing/FAQSection'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const logos = [
  { name: 'Acme Corp', abbr: 'AC' },
  { name: 'TechFlow', abbr: 'TF' },
  { name: 'DataSync', abbr: 'DS' },
  { name: 'CloudNine', abbr: 'C9' },
  { name: 'Vertex AI Partners', abbr: 'VP' },
]

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

      {/* Social Proof band */}
      <section className="py-12 border-y border-[#1E2D4A] bg-[#070C16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="t-label text-[#4F617A] text-center mb-8">
            Trusted by leading enterprises worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-3 opacity-40 hover:opacity-70 transition-opacity"
              >
                <div className="w-8 h-8 rounded bg-[#141E33] flex items-center justify-center">
                  <span className="text-xs font-bold text-[#8A97B0]">{logo.abbr}</span>
                </div>
                <span className="text-[#8A97B0] font-semibold text-sm hidden sm:block">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — White */}
      <FeaturesSection />

      {/* Process */}
      <section className="py-16 lg:py-24 bg-[#070C16] border-t border-[#1E2D4A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="t-label text-[#4169FF]">Process</span>
            <h2 className="t-h1 text-white mt-3 mb-4">How Orbis Solutions works</h2>
            <p className="t-body-lg text-[#8A97B0] max-w-2xl mx-auto">
              Our proven four-step methodology delivers measurable AI results, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="relative bg-[#0D1526] border border-[#1E2D4A] rounded-xl p-6 hover:border-[#2A3F6A] transition-colors duration-200"
              >
                <div className="text-4xl font-semibold text-[#4169FF] mb-4 tracking-[-0.03em] opacity-60">
                  {step.number}
                </div>
                <h3 className="t-h3 text-white mb-3">{step.title}</h3>
                <p className="t-body text-[#8A97B0]">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#1E2D4A]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — White (inside component) */}
      <TestimonialsSection />

      {/* Pricing — White (inside component) */}
      <PricingSection />

      {/* FAQ — Smoke (inside component) */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-[#070C16] border-t border-[#1E2D4A]">
        <div className="absolute inset-0 o-hero-wash-dark pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#0D1526] border border-[#1E2D4A] rounded-2xl py-16">
          <h2 className="t-h1 text-white mb-6">
            Ready to transform your enterprise with AI?
          </h2>
          <p className="t-body-lg text-[#8A97B0] mb-8 max-w-2xl mx-auto">
            Join 500+ enterprises using Orbis Solutions to unlock the full potential of
            artificial intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/signup" className="btn-primary">
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Talk to an Expert
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['No credit card required', '14-day free trial', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[#8A97B0] text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#4169FF]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
