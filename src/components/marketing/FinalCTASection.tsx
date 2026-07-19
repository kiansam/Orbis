'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { staggerParent, childVariants } from './motion'

export function FinalCTASection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '140px 0',
        textAlign: 'center',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      {/* Warm gradient wash — Jobber-style depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(65, 105, 255, 0.08) 0%, rgba(65, 105, 255, 0) 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerParent(0.13)}
        >
          <motion.div variants={childVariants} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
              Book a free consultation
            </span>
          </motion.div>

          <motion.h2
            variants={childVariants}
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              marginBottom: '22px',
              maxWidth: '760px',
              margin: '0 auto 22px',
            }}
          >
            Ready to stop missing jobs after hours?
          </motion.h2>
          <motion.p
            variants={childVariants}
            style={{
              fontSize: '18px',
              color: 'var(--color-text-muted)',
              maxWidth: '560px',
              margin: '0 auto 40px',
              lineHeight: 1.6,
            }}
          >
            Book a 30-minute call. We&apos;ll show you exactly what an Orbis agent would look like for your business — no obligation, no pressure.
          </motion.p>
          <motion.div
            variants={childVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/contact" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
              Book a Demo
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ padding: '13px 31px', fontSize: '15px' }}>
              Talk to Us
            </Link>
          </motion.div>
          <motion.p
            variants={childVariants}
            style={{
              fontSize: '13px',
              color: 'var(--color-text-faint)',
              marginTop: '26px',
            }}
          >
            Done-for-you · No self-setup · Live in weeks
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section { padding: 96px 0 !important; }
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
