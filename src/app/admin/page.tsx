import { createServerClient } from '@supabase/ssr'
import { StatCard } from '@/components/dashboard/StatCard'
import { AnalyticsChart } from '@/components/admin/AnalyticsChart'
import { Users, CreditCard, FileText, DollarSign, Activity } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export default async function AdminPage() {
  const adminSupabase = await getAdminClient()

  const [
    { count: totalUsers },
    { count: activeSubscriptions },
    { count: publishedPosts },
    { count: contactSubmissions },
    { data: recentUsers },
  ] = await Promise.all([
    adminSupabase.from('profiles').select('*', { count: 'exact', head: true }),
    adminSupabase.from('subscriptions').select('*', { count: 'exact', head: true }).neq('plan', 'free'),
    adminSupabase.from('posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    adminSupabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    adminSupabase.from('profiles').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: totalUsers || 0,
      change: 12,
      changeLabel: 'vs last month',
    },
    {
      icon: CreditCard,
      label: 'Active Subscriptions',
      value: activeSubscriptions || 0,
      change: 8,
      changeLabel: 'vs last month',
    },
    {
      icon: DollarSign,
      label: 'MRR (Mock)',
      value: '$4,280',
      change: 15,
      changeLabel: 'vs last month',
    },
    {
      icon: FileText,
      label: 'Published Posts',
      value: publishedPosts || 0,
      change: 33,
      changeLabel: 'vs last month',
    },
    {
      icon: Activity,
      label: 'Contact Submissions',
      value: contactSubmissions || 0,
      change: 5,
      changeLabel: 'vs last month',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-foreground-muted mt-1">Platform metrics and management tools.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Analytics Chart */}
      <AnalyticsChart />

      {/* Recent signups + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-background-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-foreground">Recent Sign-ups</h2>
            <a href="/admin/users" className="text-accent text-sm hover:text-accent-hover transition-colors">
              View all →
            </a>
          </div>
          {recentUsers && recentUsers.length > 0 ? (
            <div className="space-y-3">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent-muted flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-foreground text-sm font-medium">
                        {u.full_name || 'Anonymous User'}
                      </div>
                      <div className="text-foreground-muted text-xs">
                        {formatDate(u.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground-muted text-sm">No users yet.</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-background-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-5">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/users', label: 'Manage Users', icon: Users },
              { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
              { href: '/admin/blog', label: 'Blog Manager', icon: FileText },
              { href: '/admin/contact', label: 'Contact Inbox', icon: Activity },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="flex items-center gap-3 p-3 bg-background-secondary rounded-lg border border-border hover:border-accent/30 transition-all text-sm"
              >
                <link.icon className="w-4 h-4 text-accent" />
                <span className="text-foreground">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
