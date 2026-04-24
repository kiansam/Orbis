'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What types of enterprises does Orbis Solutions work with?',
    answer:
      'Orbis Solutions works with mid-market and enterprise organizations across all industries, including financial services, healthcare, manufacturing, technology, retail, and professional services. Our AI consulting methodology is designed to be industry-agnostic while being tailored to the specific regulatory, competitive, and operational context of each client.',
  },
  {
    question: 'How long does a typical engagement take to show results?',
    answer:
      'Most clients begin seeing measurable results within 60-90 days of engagement start. Quick wins in process automation and analytics can often be demonstrated within the first 30 days. Strategic AI roadmaps and larger transformation initiatives typically show full ROI within 6-12 months.',
  },
  {
    question: 'Do I need existing AI infrastructure to work with Orbis Solutions?',
    answer:
      'No. Orbis Solutions works with clients at every stage of AI maturity—from organizations just beginning their AI journey to those looking to optimize mature AI programs. We assess your current data estate, technology stack, and organizational capabilities to build a roadmap that meets you where you are.',
  },
  {
    question: 'How does Orbis Solutions protect our sensitive data during engagements?',
    answer:
      'Data security is foundational to everything we do. We operate under strict data governance policies including NDA agreements, SOC 2 Type II compliance, end-to-end encryption for all data transfers, and role-based access controls. We can also support on-premise or private cloud deployments for clients with strict data residency requirements.',
  },
  {
    question: 'What is included in the Starter and Pro plans?',
    answer:
      'The Starter plan includes access to up to 5 AI projects, 10GB of storage, email support, basic analytics, and API access. The Pro plan includes everything in Starter plus unlimited AI projects, 100GB storage, priority support, advanced analytics, custom integrations, and team collaboration features. Both plans include a 14-day free trial.',
  },
  {
    question: 'Can Orbis Solutions integrate with our existing technology stack?',
    answer:
      'Yes. Orbis Solutions is designed for integration-first operation. We have pre-built connectors for major enterprise platforms including Salesforce, SAP, Microsoft Azure, AWS, Google Cloud, Snowflake, Databricks, and dozens of other systems. Custom integrations are available on the Pro and Enterprise plans.',
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about Orbis Solutions and our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-background-card border border-border rounded-xl px-6 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="text-foreground hover:no-underline hover:text-accent py-5 text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground-muted leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
