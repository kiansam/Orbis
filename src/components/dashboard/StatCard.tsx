import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  change?: number
  changeLabel?: string
}

export function StatCard({ icon: Icon, label, value, change, changeLabel }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--r-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: 'border-color var(--t-base)',
        cursor: 'default',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-bright)')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-base)')}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div className="icon-box">
          <Icon style={{ width: '18px', height: '18px' }} />
        </div>
        {change !== undefined && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '999px',
              color: isPositive ? 'var(--success)' : 'var(--error)',
              background: isPositive ? 'var(--success-bg)' : 'var(--error-bg)',
            }}
          >
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '6px',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</div>
      {changeLabel && (
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{changeLabel}</div>
      )}
    </div>
  )
}
