'use client'

import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { FadeUp } from './motion'

const companies = [
  { name: 'Vancouver Green Electric', faded: false },
  { name: 'ClientCo', faded: true },
]

export function TrustBar() {
  const [arrowHover, setArrowHover] = useState(false)

  return (
    <FadeUp delay={0.1}>
      <div style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        padding: '20px 0',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-faint)', whiteSpace: 'nowrap' }}>
            Trusted by
          </span>

          {companies.map((company, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 16px',
                background: '#ffffff',
                opacity: company.faded ? 0.15 : 1,
              }}
            >
              <span style={{ fontWeight: 500, fontSize: '13px', color: 'var(--color-text-body)', whiteSpace: 'nowrap' }}>
                {company.name}
              </span>
            </div>
          ))}

          <button
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid var(--color-border)',
              background: arrowHover ? 'var(--color-bg-elevated)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
              color: arrowHover ? 'var(--color-text-body)' : 'var(--color-text-faint)',
              transition: 'background 150ms ease, color 150ms ease',
              flexShrink: 0,
            }}
            aria-label="More clients"
          >
            <ChevronRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>
    </FadeUp>
  )
}
