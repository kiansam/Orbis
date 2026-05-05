'use client'

import Link from 'next/link'
import { Search, Wrench, Rocket, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeUp, Stagger, StaggerItem, staggerParent, childVariants } from './motion'

const steps = [
  { num: '01', Icon: Search,     title: 'We learn your business', body: 'We map your services, pricing, FAQs, and how you like to operate.' },
  { num: '02', Icon: Wrench,     title: 'We build your agent',    body: 'Custom-trained on your business. Connected to your calendar and booking system.' },
  { num: '03', Icon: Rocket,     title: 'We go live together',    body: 'We handle the integration and run tests before anything touches your customers.', highlight: true },
  { num: '04', Icon: TrendingUp, title: 'We keep it running',     body: 'Ongoing updates, monitoring, and improvements as your business grows.' },
]

const chat = [
  { side: 'customer', text: "Hi, do you guys do panel upgrades? I've got a 100-amp panel and need to go to 200." },
  { side: 'agent',    text: "Hi! Yes, we do panel upgrades. A 100A to 200A upgrade typically runs between $2,800–$3,500 depending on your setup. Would you like to book a free assessment? I can check our calendar right now." },
  { side: 'customer', text: "Yeah, that'd be great. I'm free Thursday afternoon." },
  { side: 'agent',    text: "Done! I've booked you in for Thursday at 2:00 PM. You'll get a confirmation email shortly. Anything else I can help with?" },
]

export function HowItWorksSection() {
  return (
    <section style={{ background: '#ffffff', padding: '96px 0' }}>
      <div className="how-container">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent(0.12)}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <motion.p className="eyebrow" style={{ marginBottom: '12px' }} variants={childVariants}>
            The Orbis process
          </motion.p>
          <motion.h2
            variants={childVariants}
            style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', maxWidth: '580px', margin: '0 auto 16px', lineHeight: 1.14 }}
          >
            A fully built AI agent, live in your business in weeks.
          </motion.h2>
          <motion.p
            variants={childVariants}
            style={{ fontSize: '16px', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Not a tool you configure yourself. We handle everything — from building your knowledge base to integrating with your calendar.
          </motion.p>
        </motion.div>

        {/* 4-column steps */}
        <Stagger className="process-grid" staggerChildren={0.1}>
          {steps.map((step, i) => (
            <StaggerItem
              key={i}
              style={{
                padding: '32px 24px',
                borderRight: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: step.highlight ? 'var(--color-bg-subtle)' : '#ffffff',
              }}
            >
              <p style={{ fontSize: '12px', color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                Step {step.num}
              </p>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-brand-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <step.Icon style={{ width: '20px', height: '20px', color: 'var(--color-brand)' }} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '10px', lineHeight: 1.3 }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{step.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Divider */}
        <FadeUp>
          <div style={{ borderTop: '1px solid var(--color-border)', margin: '64px 0' }} />
        </FadeUp>

        {/* Showcase header */}
        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: '24px' }}>What we build for you</p>
        </FadeUp>

        {/* Product showcase */}
        <Stagger className="showcase-grid" staggerChildren={0.15}>

          {/* Left: chat */}
          <StaggerItem style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-bg-subtle)' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border)', background: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', flexShrink: 0 }}>O</div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>Orbis Agent</p>
                <p style={{ fontSize: '11px', color: 'var(--color-positive)', marginTop: '2px' }}>● Online</p>
              </div>
              <p style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--color-text-faint)' }}>Client-facing AI agent</p>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chat.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.side === 'agent' ? 'flex-start' : 'flex-end', gap: '8px', alignItems: 'flex-end' }}>
                  {msg.side === 'agent' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: 'white', flexShrink: 0 }}>O</div>
                  )}
                  <div style={{
                    maxWidth: '75%', padding: '10px 14px',
                    borderRadius: msg.side === 'agent' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    background: msg.side === 'agent' ? '#ffffff' : 'var(--color-brand)',
                    color: msg.side === 'agent' ? 'var(--color-text-primary)' : '#ffffff',
                    fontSize: '13px', lineHeight: 1.5,
                    border: msg.side === 'agent' ? '1px solid var(--color-border)' : 'none',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Right column */}
          <StaggerItem style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Calendar */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#ffffff', flex: 1 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Automatic calendar integration</p>
                <span style={{ fontSize: '11px', color: 'var(--color-text-faint)' }}>Thu, Nov 7</span>
              </div>
              <div style={{ padding: '16px' }}>
                {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'].map((t) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '26px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-faint)', width: '42px', flexShrink: 0 }}>{t}</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--color-border-subtle)' }} />
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--color-brand)', fontWeight: 600, width: '42px', flexShrink: 0 }}>2:00 PM</span>
                  <div style={{ flex: 1, padding: '7px 12px', background: 'var(--color-brand-muted)', border: '1px solid var(--color-brand-border)', borderLeft: '3px solid var(--color-brand)', borderRadius: '0 6px 6px 0', fontSize: '12px', fontWeight: 500, color: 'var(--color-brand)' }}>
                    Panel Upgrade Assessment
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: '#ffffff' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)' }}>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Booking confirmation</p>
              </div>
              <div style={{ padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,200,150,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>Appointment confirmed</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    Your appointment is confirmed for Thursday at 2:00 PM. Our team will be in touch if anything changes.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* CTA */}
        <FadeUp delay={0.1} style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '14px 36px', fontSize: '15px' }}>
            Request a Demo
          </Link>
        </FadeUp>
      </div>

      <style>{`
        .how-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; margin-bottom: 0; }
        .showcase-grid { display: grid; grid-template-columns: 55% 45%; gap: 16px; }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid > div:nth-child(2) { border-right: none !important; }
          .process-grid > div:nth-child(1), .process-grid > div:nth-child(2) { border-bottom: 1px solid var(--color-border); }
        }
        @media (max-width: 640px) {
          .how-container { padding: 0 24px; }
          .process-grid { grid-template-columns: 1fr; }
          .process-grid > div { border-right: none !important; border-bottom: 1px solid var(--color-border); }
          .process-grid > div:last-child { border-bottom: none !important; }
          .showcase-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
