'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Shield, User, Ban, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatDate } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface UserRow {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: string
  created_at: string
  email?: string
  plan?: string
  is_suspended?: boolean
}

interface UsersTableProps {
  users: UserRow[]
  total?: number
}

const PAGE_SIZE = 20

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [suspending, setSuspending] = useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const filteredUsers = users.filter(
    (u) =>
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE)

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
      return
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    )
    toast({ title: 'Role updated', description: `User role changed to ${newRole}.` })
  }

  const handleSuspend = async (userId: string, suspend: boolean) => {
    setSuspending(userId)
    const { data: { user } } = await supabase.auth.getUser()

    const res = await fetch('/api/admin/users/suspend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user?.id ?? '',
      },
      body: JSON.stringify({ userId, suspend }),
    })

    if (!res.ok) {
      const { error } = await res.json()
      toast({ title: 'Error', description: error, variant: 'destructive' })
      setSuspending(null)
      return
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_suspended: suspend } : u))
    )
    toast({
      title: suspend ? 'Account suspended' : 'Account reinstated',
      description: suspend ? 'User has been banned.' : 'User can now log in again.',
    })
    setSuspending(null)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="pl-9 bg-background-secondary border-border focus:border-accent"
        />
      </div>

      {/* Table */}
      <div className="bg-background-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Joined</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-foreground-muted text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedUsers.map((user) => {
                const initials = (user.full_name || 'U')
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)

                return (
                  <tr key={user.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent-muted text-accent text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-foreground text-sm font-medium">
                            {user.full_name || 'Anonymous'}
                          </div>
                          {user.email && (
                            <div className="text-foreground-muted text-xs">{user.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          user.role === 'admin'
                            ? 'border-accent/30 text-accent'
                            : 'border-border text-foreground-muted'
                        }
                      >
                        {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground-muted text-sm capitalize">{user.plan || 'free'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-foreground-muted text-sm">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="px-4 py-3">
                      {user.is_suspended ? (
                        <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                          <Ban className="w-3 h-3 mr-1" />
                          Suspended
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-foreground-muted hover:text-foreground"
                          onClick={() =>
                            handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')
                          }
                        >
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={suspending === user.id}
                          className={`text-xs ${user.is_suspended ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}
                          onClick={() => handleSuspend(user.id, !user.is_suspended)}
                        >
                          {suspending === user.id
                            ? '...'
                            : user.is_suspended
                            ? 'Reinstate'
                            : 'Suspend'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-foreground-muted text-sm">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-border h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-foreground text-sm">{page} / {totalPages}</span>
            <Button
              variant="outline"
              size="icon"
              className="border-border h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
