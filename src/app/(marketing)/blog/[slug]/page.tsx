import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Post } from '@/lib/types'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { BlogTOC } from '@/components/blog/BlogTOC'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt || undefined,
  }
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractTOC(markdown: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugifyHeading(text)
    items.push({ id, text, level })
  }

  return items
}

function makeHeadingComponents() {
  const H2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : ''
    const id = slugifyHeading(text)
    return <h2 id={id} {...props}>{children}</h2>
  }
  const H3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : ''
    const id = slugifyHeading(text)
    return <h3 id={id} {...props}>{children}</h3>
  }
  return { h2: H2, h3: H3 }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  const typedPost = post as Post

  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, published_at, tags')
    .eq('is_published', true)
    .neq('slug', slug)
    .limit(3)

  const readingTime = Math.ceil(typedPost.content.split(' ').length / 200)
  const tocItems = extractTOC(typedPost.content)
  const mdxComponents = makeHeadingComponents()

  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: '64px' }}>
      <article style={{ padding: '64px 0 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '64px', justifyContent: 'center' }}>

            {/* Main content */}
            <div style={{ minWidth: 0, flex: 1, maxWidth: '680px' }}>

              {/* Back */}
              <Link
                href="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '32px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--t-fast)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-hex)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
              >
                <ArrowLeft style={{ width: '16px', height: '16px' }} />
                Back to Blog
              </Link>

              {/* Tags */}
              {typedPost.tags && typedPost.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {typedPost.tags.map((tag) => (
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

              {/* Title */}
              <h1
                style={{
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {typedPost.title}
              </h1>

              {/* Meta */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '40px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                }}
              >
                {typedPost.published_at && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar style={{ width: '13px', height: '13px' }} />
                    {formatDate(typedPost.published_at)}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '13px', height: '13px' }} />
                  {readingTime} min read
                </span>
              </div>

              {/* Content */}
              <div className="prose-dark">
                <MDXRemote source={typedPost.content} components={mdxComponents} />
              </div>
            </div>

            {/* TOC */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block" style={{ width: '224px', flexShrink: 0 }}>
                <BlogTOC items={tocItems} />
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Related */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section
          style={{
            padding: '64px 0',
            background: 'var(--bg-page)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              More from Orbis Solutions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="related-grid">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{
                      padding: '20px',
                      height: '100%',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-base)',
                      borderRadius: 'var(--r-lg)',
                      transition: 'border-color var(--t-base)',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-base)')}
                  >
                    {related.tags && related.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                        {related.tags.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            style={{
                              padding: '2px 8px',
                              borderRadius: '999px',
                              background: 'var(--accent-muted)',
                              color: 'var(--accent-hex)',
                              fontSize: '11px',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: 'var(--text-primary)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}
                    >
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '13px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}
                      >
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 600px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
