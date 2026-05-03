import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { StatCard } from '@/components/dashboard/StatCard'
import {
  FolderKanban,
  Zap,
  HardDrive,
  Users,
  CheckCircle2,
  Clock,
  Star,
  FileText,
  ArrowUpRight,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

const mockStats = [
  { icon: FolderKanban, label: 'Active Projects', value: '3', change: 50, changeLabel: 'vs last month' },
  { icon: Zap, label: 'API Calls (30d)', value: '12,847', change: 23, changeLabel: 'vs last month' },
  { icon: HardDrive, label: 'Storage Used', value: '2.4 GB', change: -8, changeLabel: 'of 10 GB' },
  { icon: Users, label: 'Team Members', value: '5', change: 25, changeLabel: 'vs last month' },
]

const mockActivities = [
  {
    icon: CheckCircle2,
    color: 'var(--success)',
    bg: 'var(--success-bg)',
    text: 'AI Strategy Report generated successfully',
    time: '2 hours ago',
  },
  {
    icon: Zap,
    color: 'var(--accent-hex)',
    bg: 'var(--accent-muted)',
    text: 'New API integration connected: Salesforce CRM',
    time: '5 hours ago',
  },
  {
    icon: Users,
    color: 'var(--accent2-hex)',
    bg: 'var(--accent2-muted)',
    text: 'Team member Sarah Chen added to workspace',
    time: '1 day ago',
  },
  {
    icon: Star,
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
    text: 'Quarterly Business Review analysis completed',
    time: '2 days ago',
  },
  {
    icon: FileText,
    color: '#A78BFA',
    bg: 'rgba(167,139,250,0.12)',
    text: 'Data pipeline report exported to PDF',
    time: '3 days ago',
  },
]

const quickActions = [
  { title: 'Create New Project', description: 'Start a new AI consulting project', icon: FolderKanban, href: '/dashboard/projects' },
  { title: 'View Analytics', description: 'See insights and performance metrics', icon: Zap, href: '/dashboard/analytics' },
  { title: 'Invite Team', description: 'Collaborate with your colleagues', icon: Users, href: '/dashboard/settings' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
    supabase.from('subscriptions').select('plan, status, current_period_end').eq('user_id', user.id).single(),
  ])

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'there'
  const planName = subscription?.plan || 'free'
  const planCapitalized = planName.charAt(0).toUpperCase() + planName.slice(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Welcome */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Here&apos;s what&apos;s happening with your AI projects.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            className={planName === 'pro' || planName === 'enterprise' ? 'badge-accent' : 'badge-neutral'}
            style={{ textTransform: 'capitalize' }}
          >
            {planCapitalized} Plan
          </span>
          {subscription?.current_period_end && (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Renews {formatDate(subscription.current_period_end)}
            </span>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="stats-grid">
        {mockStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Activity + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="dashboard-cols">

        {/* Recent Activity */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-base)',
            borderRadius: 'var(--r-lg)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Recent Activity</h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last 7 days</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockActivities.map((activity, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--r-md)',
                    background: activity.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <activity.icon style={{ width: '14px', height: '14px', color: activity.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.4 }}>{activity.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <Clock style={{ width: '10px', height: '10px', color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>Quick Actions</h2>
          {quickActions.map((action, i) => (
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
                <action.icon style={{ width: '18px', height: '18px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{action.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{action.description}</div>
              </div>
              <ArrowUpRight style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dashboard-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
