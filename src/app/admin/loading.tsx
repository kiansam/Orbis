import { Skeleton } from '@/components/ui/skeleton'

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 bg-background-card" />
        <Skeleton className="h-4 w-32 bg-background-card" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 bg-background-card rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 bg-background-card rounded-xl" />
    </div>
  )
}
