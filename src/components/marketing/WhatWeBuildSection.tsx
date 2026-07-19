'use client'

import { motion } from 'framer-motion'
import { Stagger, StaggerItem, FadeUp, staggerParent, childVariants, EASE } from './motion'
import { Phone, Globe, Sparkles } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   Product previews — polished, screenshot-style mocks
────────────────────────────────────────────────────────────── */

function ChatVoicePreview() {
  return (
    <div className="wwb-mock wwb-mock-chat">
      <div className="wwb-mock-topbar">
        <div className="wwb-mock-dots">
          <span /><span /><span />
        </div>
        <div className="wwb-mock-title">Incoming call · 8:47 PM</div>
      </div>
      <div className="wwb-mock-body" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--color-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            O
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Orbis Voice Agent
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-positive)' }}>
              <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-positive)', marginRight: '5px', verticalAlign: 'middle' }} />
              Handling call — 00:42
            </div>
          </div>
        </div>
        <div className="wwb-transcript">
          <div className="wwb-t-line wwb-t-them">
            &ldquo;Hi, I need someone to come look at my furnace. Do you do same-day?&rdquo;
          </div>
          <div className="wwb-t-line wwb-t-us">
            &ldquo;Yes — we have two openings tomorrow morning. Would 9 AM or 11 AM work better?&rdquo;
          </div>
          <div className="wwb-t-line wwb-t-them">
            &ldquo;Eleven works.&rdquo;
          </div>
          <div className="wwb-t-line wwb-t-us wwb-t-live">
            &ldquo;Great, I&apos;ve booked you in for 11 AM tomorrow…&rdquo;
            <span className="wwb-t-caret" />
          </div>
        </div>
      </div>
    </div>
  )
}

function WebsiteChatbotPreview() {
  return (
    <div className="wwb-mock wwb-mock-web">
      <div className="wwb-mock-browser">
        <div className="wwb-mock-dots">
          <span /><span /><span />
        </div>
        <div className="wwb-mock-url">yourbusiness.com</div>
      </div>
      <div className="wwb-mock-body" style={{ padding: '0' }}>
        <div className="wwb-web-hero">
          <div className="wwb-web-line wwb-web-line-lg" />
          <div className="wwb-web-line wwb-web-line-md" />
          <div className="wwb-web-line wwb-web-line-sm" />
          <div className="wwb-web-cta" />
        </div>
        <div className="wwb-web-widget">
          <div className="wwb-web-widget-header">
            <div className="wwb-web-widget-avatar">O</div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>Ask us anything</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>Trained on your business</div>
            </div>
          </div>
          <div className="wwb-web-widget-msg">
            What&apos;s your service area?
          </div>
          <div className="wwb-web-widget-input">
            <span>Type a message…</span>
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

        /* Chat / voice transcript */
        .wwb-transcript {
          display: flex; flex-direction: column; gap: 10px;
          background: linear-gradient(180deg, #f7f9fd 0%, #eef2fb 100%);
          padding: 14px;
          border-radius: 12px;
          border: 1px solid var(--color-border-subtle);
        }
        .wwb-t-line {
          font-size: 13px;
          padding: 9px 13px;
          border-radius: 10px;
          max-width: 88%;
          line-height: 1.45;
        }
        .wwb-t-them {
          background: #ffffff;
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          align-self: flex-start;
        }
        .wwb-t-us {
          background: var(--color-brand);
          color: #ffffff;
          align-self: flex-end;
        }
        .wwb-t-live { display: flex; align-items: center; gap: 4px; }
        .wwb-t-caret {
          width: 8px; height: 14px;
          background: rgba(255,255,255,0.85);
          display: inline-block;
          animation: wwbBlink 1s infinite steps(1);
        }
        @keyframes wwbBlink { 50% { opacity: 0; } }

        /* Website mock */
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
        .wwb-web-hero {
          padding: 40px 32px 48px;
          background: linear-gradient(180deg, #ffffff 0%, #f6f8fd 100%);
          border-bottom: 1px solid var(--color-border-subtle);
          position: relative;
        }
        .wwb-web-line {
          height: 14px;
          background: var(--color-border);
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .wwb-web-line-lg { width: 82%; height: 22px; background: var(--color-text-primary); opacity: 0.14; }
        .wwb-web-line-md { width: 68%; height: 22px; background: var(--color-text-primary); opacity: 0.14; }
        .wwb-web-line-sm { width: 54%; height: 10px; background: var(--color-border); opacity: 0.8; margin-top: 14px; }
        .wwb-web-cta {
          width: 100px; height: 32px;
          background: var(--color-brand);
          border-radius: 999px;
          margin-top: 20px;
          box-shadow: 0 4px 12px rgba(65, 105, 255, 0.25);
        }
        .wwb-web-widget {
          position: absolute;
          right: 22px;
          bottom: -60px;
          width: 240px;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 14px;
          box-shadow: 0 14px 40px rgba(15, 23, 41, 0.10);
          overflow: hidden;
        }
        .wwb-web-widget-header {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px;
          background: var(--color-brand);
          color: #ffffff;
        }
        .wwb-web-widget-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700;
        }
        .wwb-web-widget-msg {
          padding: 12px 14px;
          font-size: 12px;
          color: var(--color-text-primary);
          background: #ffffff;
          border-bottom: 1px solid var(--color-border-subtle);
        }
        .wwb-web-widget-input {
          padding: 10px 14px;
          font-size: 11px;
          color: var(--color-text-faint);
          background: #f7f9fd;
        }
        .wwb-mock-web { position: relative; padding-bottom: 76px; }

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
