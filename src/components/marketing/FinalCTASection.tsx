import Link from 'next/link'

export function FinalCTASection() {
  return (
    <section style={{ background: 'var(--color-bg-subtle)', padding: '120px 0', textAlign: 'center', borderTop: '1px solid var(--color-border-subtle)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '20px' }}>
          Ready to stop missing jobs after hours?
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          Book a 30-minute call. We will show you exactly what an Orbis agent would look like for your business.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
            Book a Demo
          </Link>
          <Link href="/contact" className="btn-ghost" style={{ padding: '13px 31px', fontSize: '15px' }}>
            Get Started
          </Link>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-faint)', marginTop: '24px' }}>
          Fully built and managed by our team · No self-setup required
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          section { padding: 80px 0 !important; }
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  )
}
