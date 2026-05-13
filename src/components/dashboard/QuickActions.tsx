'use client'

import { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface QuickAction {
  title: string
  description: string
  icon: ReactNode
  href: string
}

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Quick Actions</h2>
      {actions.map((action, i) => (
        <a
          key={i}
          href={action.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-base)',
            borderRadius: 'var(--r-lg)',
            padding: '18px 20px',
            textDecoration: 'none',
            transition: 'border-color var(--t-base), background var(--t-base), transform var(--t-fast)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.borderColor = 'var(--accent-border)'
            el.style.background = 'var(--bg-elevated)'
            el.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.borderColor = 'var(--border-base)'
            el.style.background = 'var(--bg-surface)'
            el.style.transform = 'translateY(0)'
          }}
        >
          <div className="icon-box" style={{ flexShrink: 0 }}>
            {action.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{action.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{action.description}</div>
          </div>
          <ArrowUpRight style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
        </a>
      ))}
    </div>
  )
}
