'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE } from './motion'

const HEADLINE = "Your business, running itself after hours."
const WORDS = HEADLINE.split(" ")
const WORD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const chat = [
  { side: 'customer', text: "Hey, do you guys do panel upgrades? I need to go from 100A to 200A." },
  { side: 'agent',    text: "Yes we do! A 100A→200A upgrade typically runs $2,800–$3,500 depending on your setup. Want me to book you a free assessment?" },
  { side: 'customer', text: "Yeah, Thursday afternoon works." },
  { side: 'agent',    text: "Booked — Thursday at 2:00 PM. Confirmation is on its way to your email." },
]

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '84px 0 96px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* subtle background wash */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(70% 55% at 50% 0%, rgba(65, 105, 255, 0.06) 0%, rgba(65, 105, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}
        >
          <span
            style={{
              background: 'var(--color-brand-muted)',
              color: 'var(--color-brand)',
              border: '1px solid var(--color-brand-border)',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 14px',
              letterSpacing: '0.04em',
            }}
          >
            AI agents · Built and managed by Orbis
          </span>
        </motion.div>

        {/* Headline — deliberately smaller than the old hero, Cursor-style */}
        <h1
          style={{
            fontSize: 'clamp(34px, 4.2vw, 52px)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.08,
            letterSpacing: '-0.028em',
            maxWidth: '740px',
            margin: '0 auto 18px',
          }}
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.65, ease: WORD_EASE }}
              >
                {word}
              </motion.span>
              {i < WORDS.length - 1 && ' '}
            </span>
          ))}
        </h1>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.55, ease: EASE }}
          style={{
            fontSize: '17px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.55,
            maxWidth: '560px',
            margin: '0 auto 34px',
          }}
        >
          We build custom AI chat and voice agents that answer calls, book jobs, and handle customer questions — trained on your business, managed by our team.
        </motion.p>

        {/* CTAs — two clean pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.55, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}
        >
          <Link href="/contact" className="btn-primary" style={{ padding: '13px 30px', fontSize: '15px' }}>
            Get Started
          </Link>
          <Link href="/contact" className="btn-ghost" style={{ padding: '12px 29px', fontSize: '15px' }}>
            Book a Demo
          </Link>
        </motion.div>

        {/* Product demonstration — sits immediately below the fold, Cursor-style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: EASE }}
          style={{
            marginTop: '72px',
            position: 'relative',
          }}
        >
          <div className="hero-showcase">
            {/* Left: phone-style chat */}
            <div className="hero-chat-frame">
              <div className="hero-chat-header">
                <div className="hero-chat-avatar">O</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                    Orbis Agent
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-positive)', marginTop: '3px' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-positive)', marginRight: '5px', verticalAlign: 'middle' }} />
                    Online — replies instantly
                  </div>
                </div>
              </div>
              <div className="hero-chat-body">
                {chat.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.25 + i * 0.28, duration: 0.5, ease: EASE }}
                    style={{
                      display: 'flex',
                      justifyContent: msg.side === 'agent' ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '78%',
                        padding: '10px 14px',
                        borderRadius:
                          msg.side === 'agent' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                        background: msg.side === 'agent' ? '#ffffff' : 'var(--color-brand)',
                        color: msg.side === 'agent' ? 'var(--color-text-primary)' : '#ffffff',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        border: msg.side === 'agent' ? '1px solid var(--color-border)' : 'none',
                        boxShadow:
                          msg.side === 'agent'
                            ? '0 1px 2px rgba(15, 23, 41, 0.03)'
                            : '0 4px 14px rgba(65, 105, 255, 0.20)',
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: booking + confirmation stack */}
            <div className="hero-side-stack">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
                className="hero-panel"
              >
                <div className="hero-panel-header">
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    Bookings today
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-faint)' }}>Thu, Nov 7</span>
                </div>
                <div style={{ padding: '14px 18px' }}>
                  {['9:00 AM', '11:30 AM', '1:00 PM'].map((t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '22px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--color-text-faint)', width: '46px' }}>{t}</span>
                      <div style={{ flex: 1, height: '1px', background: 'var(--color-border-subtle)' }} />
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--color-brand)', fontWeight: 600, width: '46px' }}>
                      2:00 PM
                    </span>
                    <div
                      style={{
                        flex: 1,
                        padding: '7px 12px',
                        background: 'var(--color-brand-muted)',
                        border: '1px solid var(--color-brand-border)',
                        borderLeft: '3px solid var(--color-brand)',
                        borderRadius: '0 6px 6px 0',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--color-brand)',
                      }}
                    >
                      Panel Upgrade Assessment
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
                className="hero-panel"
              >
                <div className="hero-panel-header">
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    Auto-confirmation sent
                  </span>
                </div>
                <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(0,200,150,0.14)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#00C896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      Appointment confirmed
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Thursday · 2:00 PM · logged to CRM
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="hero-caption">
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-faint)',
              }}
            >
              A live look at how an Orbis agent handles an after-hours enquiry.
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-showcase {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 18px;
          max-width: 980px;
          margin: 0 auto;
        }
        .hero-chat-frame {
          background: linear-gradient(180deg, #f7f9fd 0%, #eef2fb 100%);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 24px 60px rgba(15, 23, 41, 0.08),
            0 4px 12px rgba(15, 23, 41, 0.04);
        }
        .hero-chat-header {
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-chat-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--color-brand);
          color: #ffffff;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          flex-shrink: 0;
        }
        .hero-chat-body {
          padding: 22px 22px 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
          min-height: 320px;
        }
        .hero-side-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .hero-panel {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 12px 40px rgba(15, 23, 41, 0.06),
            0 2px 6px rgba(15, 23, 41, 0.03);
          text-align: left;
        }
        .hero-panel-header {
          padding: 12px 18px;
          border-bottom: 1px solid var(--color-border-subtle);
          background: linear-gradient(180deg, #fbfcfe 0%, #f5f7fc 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-caption {
          margin-top: 22px;
          text-align: center;
        }
        @media (max-width: 900px) {
          .hero-showcase { grid-template-columns: 1fr; max-width: 560px; }
        }
        @media (max-width: 640px) {
          section { padding: 60px 0 72px !important; }
          section > div { padding: 0 24px !important; }
          .hero-chat-body { min-height: unset; }
        }
      `}</style>
    </section>
  )
}
