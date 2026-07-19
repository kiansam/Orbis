'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASE } from './motion'

const HEADLINE = "Your business, running itself after hours."
const WORDS = HEADLINE.split(" ")
const WORD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '64px 0 96px',
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

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(34px, 4.2vw, 52px)',
            fontWeight: 550,
            color: 'var(--color-text-primary)',
            lineHeight: 1.18,
            letterSpacing: '-0.028em',
            maxWidth: '740px',
            margin: '0 auto 18px',
          }}
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '0.14em',
                marginBottom: '-0.14em',
                marginRight: i < WORDS.length - 1 ? '0.28em' : 0,
              }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.65, ease: WORD_EASE }}
              >
                {word}
              </motion.span>
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

        {/* CTAs */}
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

        {/* Product demonstration */}
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
            {/* Left: chat image window */}
            <div className="hero-window hero-window-left">
              <Image
                src="/images/hero-chat.png"
                alt="Orbis AI chatbot conversation"
                width={876}
                height={870}
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Right: calendar (top) + notification (bottom) */}
            <div className="hero-side-stack">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
                className="hero-window hero-window-calendar"
              >
                <Image
                  src="/images/hero-calendar.png"
                  alt="Google Calendar booking"
                  width={820}
                  height={700}
                  sizes="(max-width: 900px) 100vw, 400px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
                className="hero-window hero-window-notif"
              >
                <div className="hero-window-header">
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                    Auto-confirmation sent
                  </span>
                </div>
                <div className="hero-notif-body">
                  <Image
                    src="/images/hero-notification.jpeg"
                    alt="iOS appointment confirmation notification"
                    width={1024}
                    height={200}
                    sizes="(max-width: 900px) 100vw, 400px"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '14px',
                    }}
                  />
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
          align-items: stretch;
        }
        .hero-window {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 24px 60px rgba(15, 23, 41, 0.08),
            0 4px 12px rgba(15, 23, 41, 0.04);
          text-align: left;
        }
        .hero-window-left {
          align-self: start;
        }
        .hero-side-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
          height: 100%;
        }
        .hero-window-calendar {
          flex: 1;
          min-height: 0;
          border-radius: 16px;
          background: #ffffff;
        }
        .hero-window-notif {
          border-radius: 16px;
          flex-shrink: 0;
        }
        .hero-window-header {
          padding: 12px 18px;
          border-bottom: 1px solid var(--color-border-subtle);
          background: linear-gradient(180deg, #fbfcfe 0%, #f5f7fc 100%);
        }
        .hero-notif-body {
          padding: 14px;
          background: #ffffff;
        }
        .hero-caption {
          margin-top: 22px;
          text-align: center;
        }
        @media (max-width: 900px) {
          .hero-showcase { grid-template-columns: 1fr; max-width: 560px; }
          .hero-side-stack { height: auto; }
          .hero-window-calendar { flex: none; min-height: unset; }
          .hero-window-calendar img { height: auto !important; object-fit: contain !important; }
        }
        @media (max-width: 640px) {
          section { padding: 44px 0 72px !important; }
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
