import Link from 'next/link'
import { Check } from 'lucide-react'

const highlights = [
  'Custom-trained on your business',
  'Books appointments directly in your calendar',
  'Handles calls, chats, and web enquiries 24/7',
  'Fully built and managed by our team',
]

function BrandPanel() {
  return (
    <div style={{ position: 'sticky', top: 0, height: '100vh', background: 'var(--color-brand)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 48px', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '15px', fontWeight: 800 }}>O</span>
          </div>
          <span style={{ fontSize: '17px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Orbis Solutions</span>
        </Link>

        <h2 className="t-h2" style={{ color: 'white', maxWidth: '340px', marginBottom: '16px' }}>
          Your business, running itself after hours.
        </h2>
        <p className="t-body" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '320px', marginBottom: '40px' }}>
          Done-for-you AI agents that answer calls, book jobs, and handle customers — 24/7.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {highlights.map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <Check style={{ width: '11px', height: '11px', color: 'white' }} />
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-bg)' }} className="auth-layout">
      <div style={{ flex: '0 0 50%' }} className="auth-brand-panel">
        <BrandPanel />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--color-bg-subtle)', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }} className="auth-mobile-logo">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-md)', background: 'var(--color-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 800 }}>O</span>
              </div>
              <span style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Orbis Solutions</span>
            </Link>
          </div>
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-brand-panel { display: none !important; }
          .auth-mobile-logo { display: block !important; }
        }
        .auth-mobile-logo { display: none; }
      `}</style>
    </div>
  )
}
