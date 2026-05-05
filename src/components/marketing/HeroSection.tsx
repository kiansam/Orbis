'use client'

import Link from 'next/link'

const stats = [
  { value: '62%', label: 'of calls go unanswered after hours' },
  { value: '3x', label: 'more leads closed with fast response' },
  { value: '24/7', label: 'availability, zero extra headcount' },
]

export function HeroSection() {
  return (
    <section style={{ background: 'transparent', padding: '140px 0 100px', textAlign: 'center' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
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
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(44px, 5.5vw, 64px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          maxWidth: '720px',
          margin: '0 auto 20px',
        }}>
          Your business, running itself after hours.
        </h1>

        {/* Sub-line */}
        <p style={{
          fontSize: '18px',
          color: 'var(--color-text-muted)',
          lineHeight: 1.6,
          maxWidth: '540px',
          margin: '0 auto 40px',
        }}>
          We build custom AI agents that answer calls, book jobs, and handle customer questions — trained on your business, managed by our team.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
            Get Started
          </Link>
          <Link href="/contact" className="btn-ghost" style={{ padding: '13px 31px', fontSize: '15px' }}>
            Book a Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <div key={stat.value} style={{ display: 'contents' }}>
              {i > 0 && <div className="hero-stat-divider" />}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', maxWidth: '160px' }}>
                  {stat.label}
                </div>
              </div>
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
