import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'
import { Calendar, Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, strategies, and thought leadership on AI consulting, enterprise transformation, and the future of work.',
}

export const revalidate = 60

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const typedPosts = (posts || []) as Post[]

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Blog</span>
          <h1 className="text-5xl font-bold text-foreground mt-4 mb-4">
            AI Insights & Strategy
          </h1>
          <p className="text-xl text-foreground-muted">
            Thought leadership on AI consulting, enterprise transformation, and the future of intelligent business.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedPosts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-foreground-muted text-lg">No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {typedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-background-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-all hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]">
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-muted text-accent text-xs font-medium"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-3">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-foreground-muted leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-foreground-muted text-sm">
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.ceil(post.content.split(' ').length / 200)} min read
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
