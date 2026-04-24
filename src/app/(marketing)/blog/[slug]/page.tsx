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

// Custom MDX components that add id attributes to headings
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

  // Fetch related posts (same tags)
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
    <div className="pt-24">
      <article className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-16 justify-center">
            {/* Main content */}
            <div className="min-w-0 max-w-3xl flex-1">
              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors mb-8 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Tags */}
              {typedPost.tags && typedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {typedPost.tags.map((tag) => (
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

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                {typedPost.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-foreground-muted text-sm mb-8 pb-8 border-b border-border">
                {typedPost.published_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(typedPost.published_at)}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readingTime} min read
                </span>
              </div>

              {/* Content */}
              <div className="prose-dark">
                <MDXRemote source={typedPost.content} components={mdxComponents} />
              </div>
            </div>

            {/* TOC Sidebar */}
            {tocItems.length > 0 && (
              <aside className="hidden xl:block w-56 shrink-0">
                <BlogTOC items={tocItems} />
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-background-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">More from Orbis Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                  <div className="bg-background-card border border-border rounded-xl p-5 hover:border-accent/30 transition-all h-full">
                    {related.tags && related.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {related.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-accent-muted text-accent text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-foreground font-semibold text-sm group-hover:text-accent transition-colors mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-foreground-muted text-xs line-clamp-2">{related.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
