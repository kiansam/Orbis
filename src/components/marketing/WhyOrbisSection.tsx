'use client'

import { useState } from 'react'
import { X, TrendingUp, Brain, CalendarCheck, Wrench, Bot, Rocket } from 'lucide-react'

interface Node {
  Icon: React.ComponentType<{ style?: React.CSSProperties }>
  title: string
  description: string
  linkText: string
  detail: string
}

const nodes: Node[] = [
  {
    Icon: TrendingUp,
    title: '24/7 lead capture and response',
    description: 'Your agent answers enquiries and books jobs around the clock. 62% of service business calls go unanswered after hours. Yours won\'t.',
    linkText: 'See how it works →',
    detail: 'Most service businesses lose leads the moment someone calls after 5pm and gets voicemail. Your Orbis agent picks up every enquiry — by chat, web, or message — responds instantly, qualifies the customer, and books the appointment directly into your calendar. No missed calls, no follow-up lag, no lost jobs. It runs every hour of every day without supervision.',
  },
  {
    Icon: Brain,
    title: 'Trained on your business',
    description: 'Built on your services, pricing, and FAQs — not a generic template. Customers get accurate answers every time.',
    linkText: 'How we build it →',
    detail: 'Before we write a single line of code, we spend time learning how your business actually works. Your service areas, what jobs you take, what you charge, how you like to communicate. That becomes the knowledge base your agent draws from. The result is an agent that sounds like it works for you — because it was built specifically for you.',
  },
  {
    Icon: CalendarCheck,
    title: 'Seamless calendar and CRM integration',
    description: 'Bookings land directly in your existing calendar. No new software, no manual entry.',
    linkText: 'What it connects to →',
    detail: 'Your Orbis agent connects to the tools you already use — Google Calendar, Outlook, or whichever booking system you run. When a customer confirms an appointment, it gets created automatically in your calendar in real time. No double-entry, no checking messages, no admin in between. If you have a CRM, we connect to that too so every lead is logged without anyone touching it.',
  },
  {
    Icon: Wrench,
    title: 'Fully built and managed by our team',
    description: 'We handle the entire build, integration, and every update after launch. You just start seeing results.',
    linkText: 'What we handle →',
    detail: 'This is not a tool you configure yourself. Our team builds your agent from scratch, integrates it with your systems, tests it thoroughly, and launches it. After that we monitor it, update it when your services change, and improve it over time. You never log into a dashboard or adjust a setting unless you want to. We manage it the same way a good employee manages their own work — without needing to be told every step.',
  },
  {
    Icon: Bot,
    title: 'AI automation that does the work for you',
    description: 'The agent doesn\'t just assist — it executes. Workflows run autonomously, without you touching them.',
    linkText: 'What gets automated →',
    detail: 'Most AI tools surface information and leave the action to you. Orbis agents close the loop — they respond, follow up, book, confirm, and log. If a customer enquires on a Sunday night, by Monday morning the appointment is in your calendar, the customer has a confirmation, and the lead is recorded. The entire workflow ran without a single human involved. That is not a convenience feature. That is a staff member who never sleeps.',
  },
  {
    Icon: Rocket,
    title: 'Quick onboarding, live in weeks',
    description: 'Most clients go from first contact to a live, personalised agent faster than they expect.',
    linkText: 'See the timeline →',
    detail: 'Onboarding with Orbis is straightforward because we do the heavy lifting. We start with a discovery call to understand your business, then we build and train your agent, run testing with you, and go live. There is no lengthy IT project, no internal resources required, and no disruption to how you currently operate. You stay focused on your work while we get everything running in the background.',
  },
]

export function WhyOrbisSection() {
  const [active, setActive] = useState<Node | null>(null)

  return (
    <section style={{ background: 'transparent', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Why Orbis?</p>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', maxWidth: '640px', margin: '0 auto', lineHeight: 1.14 }}>
            Everything your business needs to run smarter — built and managed for you.
          </h2>
        </div>

        <div className="why-grid">
          {nodes.map((node, i) => {
            const Icon = node.Icon
            return (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-brand-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon style={{ width: '20px', height: '20px', color: 'var(--color-brand)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>{node.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '10px' }}>{node.description}</p>
                  <button
                    onClick={() => setActive(node)}
                    className="why-link"
                  >
                    {node.linkText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {active && (
        <>
          <div onClick={() => setActive(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1001 }} />
          <div className="why-panel">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', gap: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{active.title}</h2>
              <button
                onClick={() => setActive(null)}
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--color-border)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-muted)', flexShrink: 0 }}
              >
                <X style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--color-text-body)', lineHeight: 1.75 }}>{active.detail}</p>
          </div>
        </>
      )}

      <style>{`
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; row-gap: 48px; column-gap: 64px; }
        .why-link { background: none; border: none; padding: 0; font-size: 13px; color: var(--color-brand); font-weight: 500; cursor: pointer; transition: opacity 150ms ease; }
        .why-link:hover { opacity: 0.7; }
        .why-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 480px; max-width: 100vw; background: #ffffff; z-index: 1002; padding: 40px; border-left: 1px solid var(--color-border); overflow-y: auto; animation: slideIn 300ms ease forwards; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr; row-gap: 36px; }
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
