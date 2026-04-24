import { createServerClient } from '@supabase/ssr'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export default async function AdminSubscriptionsPage() {
  const supabase = getAdminClient()

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('id, user_id, plan, status, current_period_end, stripe_subscription_id, stripe_customer_id, created_at')
    .order('created_at', { ascending: false })

  const planCounts = (subscriptions || []).reduce((acc, sub) => {
    acc[sub.plan] = (acc[sub.plan] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const planColors: Record<string, string> = {
    free: 'border-border text-foreground-muted',
    starter: 'border-blue-500/30 text-blue-400',
    pro: 'border-accent/30 text-accent',
    enterprise: 'border-purple-500/30 text-purple-400',
  }

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactive: 'bg-background border-border text-foreground-muted',
    past_due: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    canceled: 'bg-red-500/10 text-red-400 border-red-500/20',
    trialing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-foreground-muted mt-1">
          {subscriptions?.length || 0} total subscriptions
        </p>
      </div>

      {/* Plan summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['free', 'starter', 'pro', 'enterprise'].map((plan) => (
          <div key={plan} className="bg-background-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-foreground">{planCounts[plan] || 0}</div>
            <div className={`text-sm capitalize mt-1 font-medium ${planColors[plan]?.split(' ')[1] || 'text-foreground-muted'}`}>
              {plan} plan
            </div>
          </div>
        ))}
      </div>

      {/* Subscriptions Table */}
      <div className="bg-background-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">User ID</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Period End</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Stripe ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(subscriptions || []).map((sub) => (
                <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-foreground-muted text-xs font-mono">{sub.user_id.slice(0, 8)}...</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={planColors[sub.plan] || planColors.free}>
                      {sub.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={statusColors[sub.status] || statusColors.inactive}>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground-muted text-sm">
                      {sub.current_period_end ? formatDate(sub.current_period_end) : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-foreground-muted text-xs font-mono">
                      {sub.stripe_subscription_id ? sub.stripe_subscription_id.slice(0, 16) + '...' : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
