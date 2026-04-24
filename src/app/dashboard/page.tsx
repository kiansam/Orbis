import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/badge'
import {
  FolderKanban,
  Zap,
  HardDrive,
  Users,
  CheckCircle2,
  Clock,
  Star,
  FileText,
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
    color: 'text-emerald-400',
    text: 'AI Strategy Report generated successfully',
    time: '2 hours ago',
  },
  {
    icon: Zap,
    color: 'text-accent',
    text: 'New API integration connected: Salesforce CRM',
    time: '5 hours ago',
  },
  {
    icon: Users,
    color: 'text-blue-400',
    text: 'Team member Sarah Chen added to workspace',
    time: '1 day ago',
  },
  {
    icon: Star,
    color: 'text-amber-400',
    text: 'Quarterly Business Review analysis completed',
    time: '2 days ago',
  },
  {
    icon: FileText,
    color: 'text-purple-400',
    text: 'Data pipeline report exported to PDF',
    time: '3 days ago',
  },
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
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {displayName} 👋
          </h1>
          <p className="text-foreground-muted mt-1">
            Here&apos;s what&apos;s happening with your AI projects.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            className={
              planName === 'pro'
                ? 'bg-accent text-white border-0'
                : planName === 'enterprise'
                ? 'bg-purple-600 text-white border-0'
                : 'bg-background-card border-border text-foreground-muted'
            }
          >
            {planCapitalized} Plan
          </Badge>
          {subscription?.current_period_end && (
            <span className="text-foreground-muted text-xs hidden sm:block">
              Renews {formatDate(subscription.current_period_end)}
            </span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-background-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <span className="text-foreground-muted text-sm">Last 7 days</span>
        </div>
        <div className="space-y-4">
          {mockActivities.map((activity, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-background-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-foreground text-sm">{activity.text}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-foreground-muted" />
                  <span className="text-foreground-muted text-xs">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Create New Project', description: 'Start a new AI consulting project', icon: FolderKanban, href: '/dashboard/projects' },
          { title: 'View Analytics', description: 'See insights and performance metrics', icon: Zap, href: '/dashboard/analytics' },
          { title: 'Invite Team', description: 'Collaborate with your colleagues', icon: Users, href: '/dashboard/settings' },
        ].map((action, i) => (
          <a
            key={i}
            href={action.href}
            className="bg-background-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.4)] group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-3">
              <action.icon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-foreground font-medium text-sm group-hover:text-accent transition-colors">
              {action.title}
            </h3>
            <p className="text-foreground-muted text-xs mt-1">{action.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
