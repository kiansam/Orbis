import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'
import { Calendar, Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights and updates from Orbis Solutions on AI agents for service businesses.',
}

export const revalidate = 60

export default async function BlogPage() {
  let typedPosts: Post[] = []
  try {
    const supabase = await createClient()
    const { data: posts } = await supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    typedPosts = (posts || []) as Post[]
  } catch {
    // Supabase unavailable
  }

  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: '64px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '20px' }}>Blog</span>
          <h1 className="t-h1" style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
            AI Insights &amp; <span className="text-gradient">Updates</span>
          </h1>
          <p className="t-body-lg" style={{ color: 'var(--text-secondary)' }}>
            Practical guides and updates on AI agents for service businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '0 0 96px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          {typedPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '96px 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
                No posts published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {typedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <article
                    style={{
                      padding: '28px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-base)',
                      borderRadius: 'var(--r-lg)',
                      transition: 'border-color var(--t-base)',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-base)')}
                  >
                    {post.tags && post.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 10px',
                              borderRadius: '999px',
                              background: 'var(--accent-muted)',
                              border: '1px solid var(--accent-border)',
                              color: 'var(--accent-hex)',
                              fontSize: '12px',
                              fontWeight: 500,
                            }}
                          >
                            <Tag style={{ width: '11px', height: '11px' }} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '15px', marginBottom: '16px' }}>
                        {post.excerpt}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      {post.published_at && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar style={{ width: '13px', height: '13px' }} />
                          {formatDate(post.published_at)}
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock style={{ width: '13px', height: '13px' }} />
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
