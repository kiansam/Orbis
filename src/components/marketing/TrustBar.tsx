'use client'

import { ChevronRight } from 'lucide-react'
import { FadeUp } from './motion'

// Placeholder logomark for Vancouver Green Electric. Swap `<VGELogo />` for
// an <Image src="/vge-logo.png" ... /> once the real PNG lands in /public.
function VGELogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#0f7a3d" />
      <path
        d="M13 24 L20 14 L27 24 M16 24 L16 20 M24 24 L24 20"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function GhostLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#1f2a44" />
      <path
        d="M13 26 L20 14 L27 26 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TrustBar() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #f5f7fc 0%, #eef2fb 100%)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        padding: '44px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FadeUp>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="trust-inner"
        >
          {/* Trusted by label */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Trusted by
            </span>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--color-text-faint)',
                lineHeight: 1.4,
              }}
            >
              service businesses
            </span>
          </div>

          {/* Divider */}
          <div
            className="trust-divider"
            style={{
              width: '1px',
              alignSelf: 'stretch',
              background: 'var(--color-border)',
              flexShrink: 0,
            }}
          />

          {/* Real client — VGE */}
          <div
            className="trust-chip"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 22px 12px 16px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 1px 2px rgba(15, 23, 41, 0.04)',
              flexShrink: 0,
            }}
          >
            <VGELogo />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                Vancouver Green Electric
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                British Columbia
              </span>
            </div>
          </div>

          {/* Faded chip — implies more clients. Positioned to cut off. */}
          <div
            className="trust-chip trust-chip-ghost"
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 22px 12px 16px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              opacity: 0.28,
              flexShrink: 0,
              filter: 'blur(0.3px)',
              marginRight: '-90px',
            }}
          >
            <GhostLogo />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                Northline Services
              </span>
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                Contractor
              </span>
            </div>
          </div>

          {/* Static decorative arrow — spacer pushes it right */}
          <div style={{ flex: 1 }} />
          <div
            aria-hidden="true"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--color-border)',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              flexShrink: 0,
            }}
          >
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </div>
        </div>
      </FadeUp>

      <style>{`
        @media (max-width: 720px) {
          .trust-inner {
            padding: 0 24px !important;
            gap: 16px !important;
            flex-wrap: wrap;
          }
          .trust-divider { display: none; }
          .trust-chip-ghost { display: none; }
        }
      `}</style>
    </section>
  )
}
