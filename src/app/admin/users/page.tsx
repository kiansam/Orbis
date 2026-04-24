import { createServerClient } from '@supabase/ssr'
import { UsersTable } from '@/components/admin/UsersTable'

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export default async function AdminUsersPage() {
  const supabase = getAdminClient()

  const { data: profiles, count } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, role, created_at, is_suspended', { count: 'exact' })
    .order('created_at', { ascending: false })

  // Fetch subscriptions to get plan info
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('user_id, plan')

  const planMap = new Map(subscriptions?.map((s) => [s.user_id, s.plan]) || [])

  const usersWithPlan = (profiles || []).map((p) => ({
    ...p,
    plan: planMap.get(p.id) || 'free',
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-foreground-muted mt-1">
            {count || 0} total registered users
          </p>
        </div>
      </div>

      <UsersTable users={usersWithPlan} total={count || 0} />
    </div>
  )
}
