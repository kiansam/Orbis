import type { ReactNode } from 'react'

interface Props {
  title: string
  badgeText: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalPageLayout({ title, badgeText, lastUpdated, children }: Props) {
  return (
    <div style={{ background: 'var(--color-bg)', paddingTop: '40px' }}>

      <section style={{ padding: '80px 0 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            {badgeText}
          </span>
          <h1 className="t-h1" style={{ color: 'var(--color-text-primary)', marginBottom: '16px' }}>
            {title}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section style={{ padding: '64px 0 96px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          {children}
        </div>
      </section>

      <div className="section-divider" />

      <section style={{ padding: '48px 0', background: 'var(--color-bg-subtle)', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:info@orbissolutions.ca" style={{ color: 'var(--color-brand)', textDecoration: 'underline' }}>
              info@orbissolutions.ca
            </a>
          </p>
          <p style={{ color: 'var(--color-text-faint)', fontSize: '13px' }}>
            Orbis Solutions · Kelowna, British Columbia
          </p>
        </div>
      </section>
    </div>
  )
}
