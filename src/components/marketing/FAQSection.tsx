'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Mail, Calendar, MessageSquare } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need to change my current software or systems?',
    a: 'Not at all. Your Orbis agent integrates with the tools you already use.',
    icons: true,
  },
  {
    q: 'What is the difference between this and a regular chatbot?',
    a: 'A standard chatbot responds to questions. An Orbis agent acts on them. It does not just reply — it books appointments, logs leads, sends confirmations, and completes entire workflows from start to finish, without any human involvement. It is the difference between a tool that informs and one that executes.',
  },
  {
    q: 'What is the agent actually capable of?',
    a: 'Your agent can answer customer questions from your knowledge base, qualify inbound leads, book and confirm appointments directly into your calendar, send follow-up messages, and log activity automatically. It handles the full customer interaction from first message to confirmed booking — across any hour of the day.',
  },
  {
    q: 'How long before I see results?',
    a: 'Most clients are live within two to four weeks. After that, results show up quickly — within the first weeks we typically see meaningful increases in booked appointments, response rates, and leads that would have otherwise gone cold overnight.',
  },
  {
    q: 'What does it cost?',
    a: 'Pricing depends on the scope of your setup and how your business operates. What we can say is that a fully managed AI agent costs a fraction of what a full-time hire would run you — with none of the overhead. Reach out and we will put together a straightforward proposal based on your actual needs.',
    link: true,
  },
]

const integrations = [
  { Icon: Mail, label: 'Gmail' },
  { Icon: Mail, label: 'Outlook' },
  { Icon: Calendar, label: 'Calendar' },
  { Icon: MessageSquare, label: 'Slack' },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ background: 'var(--color-bg-subtle)', padding: '96px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>FAQ</p>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1.14 }}>
            Everything you probably want to know.
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <ChevronDown style={{ width: '18px', height: '18px', color: 'var(--color-brand)', flexShrink: 0, transition: 'transform 300ms ease', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              {open === i && (
                <div style={{ paddingBottom: '20px', fontSize: '15px', color: 'var(--color-text-body)', lineHeight: 1.7 }}>
                  <p style={{ margin: 0 }}>{faq.a}</p>
                  {faq.icons && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
                      {integrations.map(({ Icon, label }) => (
                        <Icon key={label} style={{ width: '20px', height: '20px', color: 'var(--color-text-faint)' }} aria-label={label} />
                      ))}
                    </div>
                  )}
                  {faq.link && (
                    <span> <Link href="/contact" style={{ color: 'var(--color-brand)', textDecoration: 'none', fontWeight: 500 }}>Get in touch →</Link></span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
