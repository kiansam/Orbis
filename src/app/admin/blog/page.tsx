import { createServerClient } from '@supabase/ssr'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'
import AdminBlogActions from './AdminBlogActions'

function getAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

export default async function AdminBlogPage() {
  const supabase = getAdminClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  const typedPosts = (posts || []) as Post[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Manager</h1>
          <p className="text-foreground-muted mt-1">{typedPosts.length} total posts</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent-hover text-white">
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {typedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-background-card border border-border rounded-xl p-5 flex items-start justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-foreground font-medium truncate">{post.title}</span>
                <Badge
                  variant="outline"
                  className={post.is_published
                    ? 'border-emerald-500/30 text-emerald-400 text-xs'
                    : 'border-border text-foreground-muted text-xs'
                  }
                >
                  {post.is_published ? 'Published' : 'Draft'}
                </Badge>
              </div>
              <div className="text-foreground-muted text-sm truncate">{post.excerpt || post.slug}</div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-foreground-muted text-xs">
                  Created {formatDate(post.created_at)}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 bg-accent-muted text-accent text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <AdminBlogActions postId={post.id} isPublished={post.is_published} />
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Edit className="w-4 h-4 text-foreground-muted hover:text-foreground" />
                </Link>
              </Button>
            </div>
          </div>
        ))}

        {typedPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-foreground-muted">No posts yet. Create your first post!</p>
          </div>
        )}
      </div>
    </div>
  )
}
