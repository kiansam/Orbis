'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { FadeUp } from './motion'

// Made-up-logo sliver used for the illusion (3rd) tag. Only the far-left
// slice is ever visible thanks to the mask on `.trust-chip-illusion`, but
// the mark and letters need to feel like a real client so the eye reads
// "there's more" rather than "placeholder".
function IllusionLogoMark() {
  return (
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #253055 0%, #4169FF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(15, 23, 41, 0.15)',
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize: '23px',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        N
      </span>
    </div>
  )
}

export function TrustBar() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #f5f7fc 0%, #eef2fb 100%)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)',
        padding: '60px 0',
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
            gap: '28px',
          }}
          className="trust-inner"
        >
          {/* Trusted by label — larger, single line, shifted further left */}
          <span
            className="trust-label"
            style={{
              fontSize: '19px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              flexShrink: 0,
              marginLeft: '-88px',
              whiteSpace: 'nowrap',
            }}
          >
            Trusted by
          </span>

          {/* Divider */}
          <div
            className="trust-divider"
            style={{
              width: '1px',
              alignSelf: 'stretch',
              background: 'var(--color-border)',
              flexShrink: 0,
              minHeight: '60px',
            }}
          />

          {/* Real client — VGE */}
          <div
            className="trust-chip"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '21px 32px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 1px 2px rgba(15, 23, 41, 0.04)',
              flexShrink: 0,
              height: '115px',
            }}
          >
            <Image
              src="/images/vge-logo.png"
              alt="Vancouver Green Electric"
              width={600}
              height={245}
              style={{
                height: '67px',
                width: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Real client — Dat-Track — tag width matches VGE tag */}
          <div
            className="trust-chip trust-chip-dattrack"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '21px 7px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 1px 2px rgba(15, 23, 41, 0.04)',
              flexShrink: 0,
              height: '115px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/dattrack-logo.png"
              alt="Dat-Track"
              width={3202}
              height={1280}
              style={{
                height: '87px',
                width: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Illusion tag — >75% invisible, fades into banner color extremely fast */}
          <div
            className="trust-chip trust-chip-illusion"
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '21px 32px',
              background: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 1px 2px rgba(15, 23, 41, 0.04)',
              flexShrink: 0,
              height: '115px',
              width: '310px',
              overflow: 'hidden',
            }}
          >
            <IllusionLogoMark />
            <span
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              Northline Ser
            </span>
          </div>

          {/* Non-interactive arrow button — reacts on hover only */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={(e) => e.preventDefault()}
            className="trust-arrow"
          >
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </button>

          <div style={{ flex: 1 }} />
        </div>
      </FadeUp>

      <style>{`
        /* The illusion tag: visible in the first ~22% of its width, then fades
           extremely fast to fully transparent by ~48%. The tag background is
           white, so as it fades it dissolves into the banner gradient behind it. */
        .trust-chip-illusion {
          -webkit-mask-image: linear-gradient(to right, #000 22%, transparent 48%);
                  mask-image: linear-gradient(to right, #000 22%, transparent 48%);
          border-right-color: transparent;
        }

        .trust-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-muted);
          flex-shrink: 0;
          cursor: pointer;
          margin-left: -150px;
          padding: 0;
          transition:
            transform 180ms ease,
            background 180ms ease,
            color 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }
        .trust-arrow:hover {
          background: rgba(65, 105, 255, 0.08);
          border-color: var(--color-brand-border);
          color: var(--color-brand);
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(65, 105, 255, 0.14);
        }
        .trust-arrow:active { transform: scale(1.02); }

        @media (max-width: 900px) {
          .trust-inner { gap: 18px !important; }
          .trust-label { margin-left: 0 !important; }
        }
        @media (max-width: 720px) {
          .trust-inner {
            padding: 0 24px !important;
            gap: 14px !important;
            flex-wrap: wrap;
          }
          .trust-divider { display: none; }
          .trust-chip-illusion { display: none; }
          .trust-arrow { display: none; }
        }
      `}</style>
    </section>
  )
}
