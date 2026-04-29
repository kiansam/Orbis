'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What types of enterprises does Orbis Solutions work with?',
    answer:
      'Orbis Solutions works with mid-market and enterprise organizations across all industries, including financial services, healthcare, manufacturing, technology, retail, and professional services. Our AI consulting methodology is designed to be industry-agnostic while being tailored to the specific regulatory, competitive, and operational context of each client.',
  },
  {
    question: 'How long does a typical engagement take to show results?',
    answer:
      'Most clients begin seeing measurable results within 60–90 days of engagement start. Quick wins in process automation and analytics can often be demonstrated within the first 30 days. Strategic AI roadmaps and larger transformation initiatives typically show full ROI within 6–12 months.',
  },
  {
    question: 'Do I need existing AI infrastructure to work with Orbis Solutions?',
    answer:
      'No. Orbis Solutions works with clients at every stage of AI maturity — from organizations just beginning their AI journey to those looking to optimize mature AI programs. We assess your current data estate, technology stack, and organizational capabilities to build a roadmap that meets you where you are.',
  },
  {
    question: 'How does Orbis Solutions protect our sensitive data during engagements?',
    answer:
      'Data security is foundational to everything we do. We operate under strict data governance policies including NDA agreements, SOC 2 Type II compliance, end-to-end encryption for all data transfers, and role-based access controls. We can also support on-premise or private cloud deployments for clients with strict data residency requirements.',
  },
  {
    question: 'What is included in the Starter and Pro plans?',
    answer:
      'Starter includes up to 5 AI projects, 10 GB of storage, email support, basic analytics, and API access. Pro includes everything in Starter plus unlimited AI projects, 100 GB storage, priority support, advanced analytics, custom integrations, and team collaboration features. Both plans include a 14-day free trial.',
  },
  {
    question: 'Can Orbis Solutions integrate with our existing technology stack?',
    answer:
      'Yes. We have pre-built connectors for major enterprise platforms including Salesforce, SAP, Microsoft Azure, AWS, Google Cloud, Snowflake, Databricks, and dozens of other systems. Custom integrations are available on the Pro and Enterprise plans.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#070C16] border-t border-[#1E2D4A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="t-label text-[#4169FF]">FAQ</span>
          <h2 className="t-h1 text-white mt-3 mb-4">Frequently asked questions</h2>
          <p className="t-body-lg text-[#8A97B0] max-w-2xl mx-auto">
            Everything you need to know about Orbis Solutions and our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="space-y-2"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={cn(
                  'bg-[#0D1526] border rounded-lg px-6 transition-colors duration-200',
                  isOpen ? 'border-[rgba(65,105,255,0.35)]' : 'border-[#1E2D4A]'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4"
                >
                  <span
                    className={cn(
                      'text-[15px] font-medium transition-colors duration-200',
                      isOpen ? 'text-[#4169FF]' : 'text-white'
                    )}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 flex-shrink-0 text-[#4F617A] transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="t-body text-[#8A97B0] pb-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
