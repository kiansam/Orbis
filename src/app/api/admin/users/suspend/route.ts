import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export async function POST(req: NextRequest) {
  const { userId, suspend } = await req.json()

  if (!userId || typeof suspend !== 'boolean') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const adminSupabase = getAdminClient()

  // Verify the caller is an admin by checking their session via auth header
  const authHeader = req.headers.get('x-user-id')
  if (authHeader) {
    const { data: callerProfile } = await adminSupabase
      .from('profiles')
      .select('role')
      .eq('id', authHeader)
      .single()
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
  }

  const { error } = await adminSupabase.auth.admin.updateUserById(userId, {
    ban_duration: suspend ? '876600h' : 'none', // ~100 years or unban
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Mirror suspended state in profiles table for easy querying
  await adminSupabase
    .from('profiles')
    .update({ is_suspended: suspend })
    .eq('id', userId)

  return NextResponse.json({ success: true })
}
