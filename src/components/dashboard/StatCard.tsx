import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  className?: string
}

export function StatCard({ icon: Icon, label, value, change, changeLabel, className }: StatCardProps) {
  return (
    <div className={cn(
      'bg-background-card border border-border rounded-xl p-6 hover:border-border-strong transition-colors',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        {change !== undefined && (
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            change >= 0
              ? 'text-emerald-400 bg-emerald-500/10'
              : 'text-red-400 bg-red-500/10'
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-foreground-muted text-sm">{label}</div>
      {changeLabel && (
        <div className="text-foreground-muted text-xs mt-1">{changeLabel}</div>
      )}
    </div>
  )
}
