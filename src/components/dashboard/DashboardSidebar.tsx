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
  Brain,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'

interface DashboardSidebarProps {
  user: {
    id: string
    email?: string
  }
  profile: {
    full_name: string | null
    avatar_url: string | null
  } | null
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
    <div className="flex flex-col h-full">
      {/* Logo + Collapse */}
      <div className="flex items-center justify-between p-4 mb-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">
              Orbis<span className="text-accent"> Solutions</span>
            </span>
          )}
        </Link>
        {onToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-foreground-muted hover:text-foreground"
            onClick={onToggle}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium',
                isActive
                  ? 'bg-accent text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                  : 'text-foreground-muted hover:text-foreground hover:bg-white/5'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        <div className={cn(
          'flex items-center gap-3 p-3 rounded-lg bg-background-secondary mb-2',
          collapsed && 'justify-center'
        )}>
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-accent text-white text-xs">{initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{displayName}</div>
              <Badge
                variant="outline"
                className="text-[10px] border-accent/30 text-accent px-1.5 py-0 h-4 capitalize"
              >
                {plan}
              </Badge>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            'w-full text-foreground-muted hover:text-foreground hover:bg-white/5 text-sm',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="border-border bg-background-card">
              <Menu className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background-secondary border-border p-0 w-64">
            <SidebarContent {...props} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          'hidden lg:flex flex-col bg-background-secondary border-r border-border h-screen sticky top-0 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
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
