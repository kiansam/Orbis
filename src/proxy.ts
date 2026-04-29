import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Public marketing routes — skip Supabase auth entirely for instant load
function isPublicPath(pathname: string): boolean {
  const exact = ['/', '/about', '/blog', '/contact']
  if (exact.includes(pathname)) return true
  if (pathname.startsWith('/blog/')) return true
  if (pathname.startsWith('/api/contact')) return true
  return false
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Fast-path: no Supabase call for public pages — avoids DNS hang
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const { supabaseResponse, user, supabase } = await updateSession(request)

  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')

  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (user && isAdminRoute) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return supabaseResponse
}
