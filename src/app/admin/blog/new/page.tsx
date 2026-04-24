'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { postSchema } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState('')
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { is_published: false },
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    const { data: { user } } = await supabase.auth.getUser()

    const title = data.title as string
    const slug = data.slug as string
    const excerpt = data.excerpt as string | undefined
    const cover_image = data.cover_image as string | undefined
    const tags = data.tags as string | undefined
    const is_published = data.is_published as boolean | undefined

    const { error } = await supabase.from('posts').insert({
      title,
      slug,
      content: content,
      excerpt: excerpt || null,
      cover_image: cover_image || null,
      tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      is_published: is_published ?? false,
      published_at: is_published ? new Date().toISOString() : null,
      author_id: user?.id || null,
    })

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
      return
    }

    toast({ title: 'Post created', description: 'Your post has been saved successfully.' })
    router.push('/admin/blog')
    router.refresh()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="text-foreground-muted">
          <Link href="/admin/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">New Post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-background-card border border-border rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  placeholder="Post title..."
                  className="bg-background-secondary border-border focus:border-accent text-lg"
                  {...register('title', {
                    onChange: (e) => {
                      setValue('slug', slugify(e.target.value))
                    },
                  })}
                />
                {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Slug *</Label>
                <Input
                  placeholder="post-slug"
                  className="bg-background-secondary border-border focus:border-accent font-mono text-sm"
                  {...register('slug')}
                />
                {errors.slug && <p className="text-red-400 text-xs">{errors.slug.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea
                  placeholder="Brief description for blog listing and SEO..."
                  rows={3}
                  className="bg-background-secondary border-border focus:border-accent resize-none"
                  {...register('excerpt')}
                />
                {errors.excerpt && <p className="text-red-400 text-xs">{errors.excerpt.message}</p>}
              </div>
            </div>

            <div className="bg-background-card border border-border rounded-xl p-6 space-y-3">
              <Label>Content (Markdown) *</Label>
              <div data-color-mode="dark">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val ?? '')}
                  height={500}
                  preview="live"
                />
              </div>
              {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-background-card border border-border rounded-xl p-5 space-y-4">
              <h3 className="text-foreground font-semibold text-sm">Publish Settings</h3>

              <div className="flex items-center justify-between">
                <Label className="cursor-pointer">Publish immediately</Label>
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-500"
                  {...register('is_published')}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-hover text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Post'}
              </Button>
            </div>

            <div className="bg-background-card border border-border rounded-xl p-5 space-y-4">
              <h3 className="text-foreground font-semibold text-sm">Metadata</h3>

              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  placeholder="https://..."
                  className="bg-background-secondary border-border focus:border-accent text-sm"
                  {...register('cover_image')}
                />
                {errors.cover_image && <p className="text-red-400 text-xs">{errors.cover_image.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input
                  placeholder="AI, Strategy, Enterprise"
                  className="bg-background-secondary border-border focus:border-accent text-sm"
                  {...register('tags')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
