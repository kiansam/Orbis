'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { createClient } from '@/lib/supabase/client'

interface DashboardSidebarProps {
  user: { id: string; email?: string }
  profile: { full_name: string | null; avatar_url: string | null } | null
  plan: string
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({
  user,
  profile,
  plan,
  collapsed,
  onToggle,
}: DashboardSidebarProps & { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User'
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--bg-surface)',
      }}
    >
      {/* Logo area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
        }}
      >
        <Link
          href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, var(--accent-hex) 0%, #FF8355 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: 'white', fontSize: '13px', fontWeight: 800 }}>O</span>
          </div>
          {!collapsed && (
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Orbis
            </span>
          )}
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            style={{
              width: '28px',
              height: '28px',
              display: collapsed ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              borderRadius: 'var(--r-sm)',
            }}
            className="hidden lg:flex"
          >
            {collapsed ? <ChevronRight style={{ width: '14px', height: '14px' }} /> : <ChevronLeft style={{ width: '14px', height: '14px' }} />}
          </button>
        )}
      </div>

      {/* Nav label */}
      {!collapsed && (
        <div style={{ padding: '16px 16px 6px' }}>
          <span className="t-caption">NAVIGATION</span>
        </div>
      )}

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: collapsed ? '10px' : '9px 12px',
                borderRadius: 'var(--r-md)',
                marginBottom: '2px',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? 'var(--accent-hex)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-muted)' : 'transparent',
                border: isActive ? '1px solid var(--accent-border)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'all var(--t-fast)',
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'var(--color-brand-muted)'
                  el.style.color = 'var(--color-text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'transparent'
                  el.style.color = 'var(--color-text-muted)'
                }
              }}
            >
              <item.icon style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User block */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '12px',
          flexShrink: 0,
        }}
      >
        {!collapsed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-base)',
              marginBottom: '8px',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-hex) 0%, #A78BFA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {displayName}
              </div>
              <span className="badge-accent" style={{ marginTop: '2px', display: 'inline-flex', padding: '1px 6px', textTransform: 'capitalize' }}>
                {plan}
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-hex) 0%, #A78BFA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: 'white',
              margin: '0 auto 8px',
            }}
          >
            {initials}
          </div>
        )}

        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 12px',
            borderRadius: 'var(--r-md)',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--text-muted)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'color var(--t-fast), background var(--t-fast)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.color = 'var(--color-text-primary)'
            el.style.background = 'var(--color-brand-muted)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.color = 'var(--color-text-muted)'
            el.style.background = 'transparent'
          }}
        >
          <LogOut style={{ width: '14px', height: '14px', flexShrink: 0 }} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <button
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-base)',
                borderRadius: 'var(--r-md)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <Menu style={{ width: '16px', height: '16px' }} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-base)', padding: 0, width: '240px' }}
          >
            <SidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div
        className="hidden lg:flex flex-col h-screen sticky top-0"
        style={{
          width: collapsed ? '64px' : '240px',
          borderRight: '1px solid var(--border-base)',
          transition: 'width 300ms ease',
          background: 'var(--bg-surface)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <SidebarContent
          {...props}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>
    </>
  )
}
