'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EASE, useCountUp } from './motion'

const HEADLINE = "Your business, running itself after hours."
const WORDS = HEADLINE.split(" ")
const WORD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function StatItem({ value, label }: { value: string; label: string }) {
  // Extract leading number and suffix (e.g. "62%" → 62, "%"; "24/7" → 24, "/7")
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1]) : 0
  const suffix = match ? match[2] : value
  const { ref, value: count } = useCountUp(target, 1.6)

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1,
        marginBottom: '6px',
      }}>
        {match ? `${count}${suffix}` : value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '160px' }}>
        {label}
      </div>
    </div>
  )
}

const stats = [
  { value: '62%', label: 'of calls go unanswered after hours' },
  { value: '3x',  label: 'more leads closed with fast response' },
  { value: '24/7', label: 'availability, zero extra headcount' },
]

export function HeroSection() {
  return (
    <section style={{ background: 'transparent', padding: '140px 0 100px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
        >
          <span style={{
            background: 'var(--color-brand-muted)',
            color: 'var(--color-brand)',
            border: '1px solid var(--color-brand-border)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '12px',
            fontWeight: 600,
            padding: '4px 14px',
            letterSpacing: '0.04em',
          }}>
            AI-powered · Done for you
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <h1 style={{
          fontSize: 'clamp(44px, 5.5vw, 64px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          maxWidth: '720px',
          margin: '0 auto 20px',
        }}>
          {WORDS.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.7,
                  ease: WORD_EASE,
                }}
              >
                {word}
              </motion.span>
              {i < WORDS.length - 1 && ' '}
            </span>
          ))}
        </h1>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65, ease: EASE }}
          style={{
            fontSize: '18px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
            maxWidth: '540px',
            margin: '0 auto 40px',
          }}
        >
          We build custom AI agents that answer calls, book jobs, and handle customer questions — trained on your business, managed by our team.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.65, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
        >
          <Link href="/contact" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
            Get Started
          </Link>
          <Link href="/contact" className="btn-ghost" style={{ padding: '13px 31px', fontSize: '15px' }}>
            Book a Demo
          </Link>
        </motion.div>

        {/* Stats — count up on scroll into view */}
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <div key={stat.value} style={{ display: 'contents' }}>
              {i > 0 && <div className="hero-stat-divider" />}
              <StatItem value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 56px;
          flex-wrap: wrap;
          gap: 0;
        }
        .hero-stat-divider {
          width: 1px;
          height: 40px;
          background: var(--color-border);
          margin: 0 40px;
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          section { padding: 80px 0 60px !important; }
          section > div { padding: 0 24px !important; }
          .hero-stats { flex-direction: column; gap: 28px; margin-top: 40px; }
          .hero-stat-divider { display: none; }
        }
      `}</style>
    </section>
  )
}
