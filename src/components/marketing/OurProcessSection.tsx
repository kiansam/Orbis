'use client'

import { Search, Wrench, Rocket, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stagger, StaggerItem, staggerParent, childVariants } from './motion'

const steps = [
  { num: '01', Icon: Search,     title: 'We learn your business',  body: 'We map your services, pricing, FAQs, and how you like to operate.' },
  { num: '02', Icon: Wrench,     title: 'We build your agent',     body: 'Custom-trained on your business. Connected to your calendar and booking system.' },
  { num: '03', Icon: Rocket,     title: 'We go live together',     body: 'We handle the integration and run tests before anything touches your customers.', highlight: true },
  { num: '04', Icon: TrendingUp, title: 'We keep it running',      body: 'Ongoing updates, monitoring, and improvements as your business grows.' },
]

export function OurProcessSection() {
  return (
    <section
      id="our-process"
      style={{
        background: '#ffffff',
        padding: '112px 0',
        scrollMarginTop: '80px',
      }}
    >
      <div className="process-container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent(0.12)}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <motion.p className="eyebrow" style={{ marginBottom: '12px' }} variants={childVariants}>
            Our Process
          </motion.p>
          <motion.h2
            variants={childVariants}
            style={{
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              maxWidth: '620px',
              margin: '0 auto 18px',
              lineHeight: 1.14,
            }}
          >
            A fully built AI agent, live in your business in weeks.
          </motion.h2>
          <motion.p
            variants={childVariants}
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Not a tool you configure yourself. We handle everything — from building the knowledge base to integrating with your calendar and booking system.
          </motion.p>
        </motion.div>

        {/* 4-column steps */}
        <Stagger className="process-grid" staggerChildren={0.1}>
          {steps.map((step, i) => (
            <StaggerItem
              key={i}
              style={{
                padding: '36px 26px',
                borderRight: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: step.highlight ? 'var(--color-bg-subtle)' : '#ffffff',
                position: 'relative',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-faint)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  marginBottom: '22px',
                }}
              >
                Step {step.num}
              </p>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--color-brand-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '22px',
                }}
              >
                <step.Icon style={{ width: '22px', height: '22px', color: 'var(--color-brand)' }} />
              </div>
              <h3
                style={{
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <style>{`
        .process-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 1px 3px rgba(15, 23, 41, 0.03);
        }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid > div:nth-child(2) { border-right: none !important; }
          .process-grid > div:nth-child(1),
          .process-grid > div:nth-child(2) { border-bottom: 1px solid var(--color-border); }
        }
        @media (max-width: 640px) {
          .process-container { padding: 0 24px; }
          .process-grid { grid-template-columns: 1fr; }
          .process-grid > div { border-right: none !important; border-bottom: 1px solid var(--color-border); }
          .process-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  )
}
