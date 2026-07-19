'use client'

import { motion } from 'framer-motion'
import { FadeUp, staggerParent, childVariants, EASE } from './motion'
import { Phone, Globe, Sparkles, Mic, PhoneCall } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Product previews — polished, screenshot-style mocks
────────────────────────────────────────────────────────────── */

function ChatVoicePreview() {
  return (
    <div className="wwb-mock wwb-mock-voice">
      <div className="wwb-mock-topbar">
        <div className="wwb-mock-dots">
          <span /><span /><span />
        </div>
        <div className="wwb-mock-title">Incoming call · 8:47 PM</div>
      </div>
      <div className="wwb-mock-body" style={{ padding: '20px' }}>
        {/* Header — flat phone-call icon (no border), name, live handling status with waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div className="wwb-voice-callicon" aria-hidden="true">
            <PhoneCall style={{ width: '20px', height: '20px', color: 'var(--color-brand)' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
              Orbis Voice Agent
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-positive)', display: 'inline-flex', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--color-positive)',
                    marginRight: '5px',
                  }}
                />
                Handling call — 00:42
              </span>
              <span className="wwb-voice-wave" aria-hidden="true">
                <span /><span /><span /><span /><span />
              </span>
            </div>
          </div>
        </div>

        {/* Transcript — no bubbles, no blue fill, same background throughout */}
        <div className="wwb-voice-transcript">
          <div className="wwb-voice-line wwb-voice-caller">
            <Phone style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)', flexShrink: 0, marginTop: '3px' }} />
            <span>&ldquo;Hi&hellip; I need someone to come take a look at my furnace. Do you do same-day?&rdquo;</span>
          </div>
          <div className="wwb-voice-line wwb-voice-agent">
            <span>&ldquo;We can definitely help with that&hellip; I&rsquo;ve actually got two openings tomorrow morning — would ten or twelve work better for you?&rdquo;</span>
            <Mic style={{ width: '14px', height: '14px', color: 'var(--color-brand)', flexShrink: 0, marginTop: '3px' }} />
          </div>
          <div className="wwb-voice-line wwb-voice-caller">
            <Phone style={{ width: '14px', height: '14px', color: 'var(--color-text-muted)', flexShrink: 0, marginTop: '3px' }} />
            <span>&ldquo;Uh&hellip; ten is good.&rdquo;</span>
          </div>
          <div className="wwb-voice-line wwb-voice-agent">
            <span>&ldquo;Perfect&hellip; you&rsquo;re all booked in for ten AM tomorrow. You&rsquo;ll get a confirmation shortly.&rdquo;</span>
            <Mic style={{ width: '14px', height: '14px', color: 'var(--color-brand)', flexShrink: 0, marginTop: '3px' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function WebsiteChatbotPreview() {
  return (
    <div className="wwb-mock wwb-mock-webchat">
      <div className="wwb-mock-browser">
        <div className="wwb-mock-dots">
          <span /><span /><span />
        </div>
        <div className="wwb-mock-url">yourbusiness.com</div>
      </div>
      <div className="wwb-mock-body" style={{ padding: 0 }}>
        <div className="wwb-webchat-header">
          <div className="wwb-webchat-avatar">O</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}>
              Ask us anything
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '3px' }}>
              Trained on your business
            </div>
          </div>
        </div>

        <div className="wwb-webchat-body">
          <div className="wwb-webchat-bubble wwb-webchat-them">
            What are your flat rates, and do you cover Richmond?
          </div>
          <div className="wwb-webchat-bubble wwb-webchat-us">
            Our standard service call is a flat $300, plus any materials needed. And yes — Richmond&rsquo;s well within our service area.
          </div>
        </div>

        <div className="wwb-webchat-input">
          <span>Type a message…</span>
          <div className="wwb-webchat-send" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L12 2L7 12L6 8L2 7Z" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminAutomationPreview() {
  return (
    <div className="wwb-mock wwb-mock-admin">
      <div className="wwb-mock-topbar">
        <div className="wwb-mock-dots">
          <span /><span /><span />
        </div>
        <div className="wwb-mock-title">Automations · today</div>
      </div>
      <div className="wwb-mock-body" style={{ padding: '18px 20px' }}>
        {[
          { label: 'Google review request sent', sub: 'Job #4821 · James M.', ago: '2m ago' },
          { label: 'Follow-up email queued',    sub: 'Estimate reminder · 3 clients', ago: '18m ago' },
          { label: 'Missed-call auto-reply',    sub: 'SMS sent to (604) 555-…', ago: '41m ago' },
          { label: 'Weekly summary compiled',   sub: '17 bookings · 4 new leads', ago: '2h ago' },
        ].map((row, i) => (
          <div key={i} className="wwb-admin-row">
            <div className="wwb-admin-check">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="#00C896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                {row.label}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row.sub}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-faint)', flexShrink: 0 }}>
              {row.ago}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Product cards
────────────────────────────────────────────────────────────── */

const products = [
  {
    Icon: Phone,
    tag: 'Chat & voice agents',
    title: 'AI that answers your calls and messages 24/7',
    body:
      'Handles after-hours enquiries, qualifies leads, and books appointments directly into your calendar. On the phone or in chat — trained specifically on your business.',
    Preview: ChatVoicePreview,
  },
  {
    Icon: Globe,
    tag: 'Custom website chatbots',
    title: 'A chatbot on your site trained on your business',
    body:
      'Answers customer questions accurately using your services, pricing, and FAQs. Not a generic template — a real product tuned to how you operate.',
    Preview: WebsiteChatbotPreview,
  },
  {
    Icon: Sparkles,
    tag: 'Admin automations',
    title: 'The repetitive admin, running itself in the background',
    body:
      'Google review requests, follow-ups, missed-call replies, weekly summaries — the small tasks that eat your day, handled automatically.',
    Preview: AdminAutomationPreview,
  },
]

export function WhatWeBuildSection() {
  return (
    <section
      id="what-we-build"
      style={{
        background: 'var(--color-bg-subtle)',
        padding: '112px 0',
        scrollMarginTop: '80px',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="wwb-container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent(0.12)}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <motion.p className="eyebrow" style={{ marginBottom: '12px' }} variants={childVariants}>
            What We Build For You
          </motion.p>
          <motion.h2
            variants={childVariants}
            style={{
              fontSize: 'clamp(28px, 3.2vw, 42px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              maxWidth: '660px',
              margin: '0 auto 18px',
              lineHeight: 1.14,
            }}
          >
            Three systems, one integrated setup for your business.
          </motion.h2>
          <motion.p
            variants={childVariants}
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Every Orbis client gets a tailored mix of the following — installed, trained, and maintained by our team.
          </motion.p>
        </motion.div>

        {/* Product rows — alternating text/visual layout for Jobber-style depth */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
          {products.map((product, i) => {
            const reversed = i % 2 === 1
            const { Preview } = product
            return (
              <FadeUp key={i} delay={0}>
                <div className={`wwb-row ${reversed ? 'wwb-row-reverse' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: reversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="wwb-copy"
                  >
                    <div className="wwb-copy-icon">
                      <product.Icon style={{ width: '20px', height: '20px', color: 'var(--color-brand)' }} />
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-brand)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        margin: '16px 0 12px',
                      }}
                    >
                      {product.tag}
                    </p>
                    <h3
                      style={{
                        fontSize: 'clamp(22px, 2.4vw, 30px)',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        marginBottom: '16px',
                      }}
                    >
                      {product.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'var(--color-text-body)',
                        lineHeight: 1.65,
                        maxWidth: '440px',
                      }}
                    >
                      {product.body}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    className="wwb-visual"
                  >
                    <Preview />
                  </motion.div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>

      <style>{`
        .wwb-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }

        .wwb-row {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 72px;
          align-items: center;
        }
        .wwb-row-reverse .wwb-copy { order: 2; }
        .wwb-row-reverse .wwb-visual { order: 1; }

        .wwb-copy-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--color-brand-muted);
          border: 1px solid var(--color-brand-border);
          display: flex; align-items: center; justify-content: center;
        }

        .wwb-visual { position: relative; }

        /* Shared mock frame */
        .wwb-mock {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 24px 60px rgba(15, 23, 41, 0.08),
            0 4px 12px rgba(15, 23, 41, 0.04);
        }
        .wwb-mock-topbar {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px;
          background: linear-gradient(180deg, #fafbfe 0%, #f2f5fb 100%);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wwb-mock-dots {
          display: flex; gap: 6px;
        }
        .wwb-mock-dots span {
          width: 10px; height: 10px; border-radius: 50%;
          background: #dfe4ee;
          display: block;
        }
        .wwb-mock-dots span:first-child { background: #ff6055; }
        .wwb-mock-dots span:nth-child(2) { background: #ffbd2e; }
        .wwb-mock-dots span:nth-child(3) { background: #27c93f; }
        .wwb-mock-title {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .wwb-mock-body { background: #ffffff; }

        /* Voice call transcript — no bubbles, uniform background, icon-differentiated */
        .wwb-voice-callicon {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          animation: wwbCallPulse 1.6s ease-in-out infinite;
        }
        @keyframes wwbCallPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.78; }
        }
        .wwb-voice-wave {
          display: inline-flex; align-items: center; gap: 2px; height: 12px;
        }
        .wwb-voice-wave span {
          display: inline-block;
          width: 2px;
          background: var(--color-positive);
          border-radius: 1px;
          animation: wwbWave 1.1s ease-in-out infinite;
        }
        .wwb-voice-wave span:nth-child(1) { height: 5px; animation-delay: 0s; }
        .wwb-voice-wave span:nth-child(2) { height: 9px; animation-delay: 0.12s; }
        .wwb-voice-wave span:nth-child(3) { height: 12px; animation-delay: 0.24s; }
        .wwb-voice-wave span:nth-child(4) { height: 7px; animation-delay: 0.36s; }
        .wwb-voice-wave span:nth-child(5) { height: 4px; animation-delay: 0.48s; }
        @keyframes wwbWave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }

        .wwb-voice-transcript {
          background: #f7f9fd;
          border-radius: 12px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .wwb-voice-line {
          display: flex;
          gap: 10px;
          font-size: 13px;
          line-height: 1.55;
          color: var(--color-text-primary);
          max-width: 92%;
        }
        .wwb-voice-caller {
          align-self: flex-start;
          text-align: left;
        }
        .wwb-voice-agent {
          align-self: flex-end;
          text-align: right;
          flex-direction: row-reverse;
        }
        .wwb-voice-line span { display: inline-block; }

        /* Website chat widget — real chat with blue bubbles */
        .wwb-mock-browser {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px;
          background: linear-gradient(180deg, #fafbfe 0%, #f2f5fb 100%);
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wwb-mock-url {
          flex: 1;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 11px;
          color: var(--color-text-muted);
          text-align: center;
        }
        .wwb-webchat-header {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 18px;
          background: var(--color-brand);
        }
        .wwb-webchat-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #ffffff;
          font-size: 13px; font-weight: 700;
          flex-shrink: 0;
        }
        .wwb-webchat-body {
          padding: 22px 18px;
          background: linear-gradient(180deg, #f7f9fd 0%, #eef2fb 100%);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wwb-webchat-bubble {
          font-size: 13px;
          line-height: 1.5;
          padding: 10px 14px;
          max-width: 82%;
        }
        .wwb-webchat-them {
          align-self: flex-end;
          background: #ffffff;
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: 14px 14px 4px 14px;
          box-shadow: 0 1px 2px rgba(15, 23, 41, 0.03);
        }
        .wwb-webchat-us {
          align-self: flex-start;
          background: var(--color-brand);
          color: #ffffff;
          border-radius: 14px 14px 14px 4px;
          box-shadow: 0 4px 14px rgba(65, 105, 255, 0.20);
        }
        .wwb-webchat-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: #ffffff;
          border-top: 1px solid var(--color-border-subtle);
          font-size: 12px;
          color: var(--color-text-faint);
        }
        .wwb-webchat-send {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--color-brand);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(65, 105, 255, 0.30);
        }

        /* Admin automations */
        .wwb-admin-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wwb-admin-row:last-child { border-bottom: none; }
        .wwb-admin-check {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(0,200,150,0.14);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .wwb-row {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .wwb-row-reverse .wwb-copy { order: 1; }
          .wwb-row-reverse .wwb-visual { order: 2; }
        }
        @media (max-width: 640px) {
          .wwb-container { padding: 0 24px; }
        }
      `}</style>
    </section>
  )
}
