'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AdminBlogActionsProps {
  postId: string
  isPublished: boolean
}

export default function AdminBlogActions({ postId, isPublished }: AdminBlogActionsProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()
  const router = useRouter()

  const handleTogglePublish = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('posts')
      .update({
        is_published: !isPublished,
        published_at: !isPublished ? new Date().toISOString() : null,
      })
      .eq('id', postId)

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: isPublished ? 'Post unpublished' : 'Post published', description: 'Post status updated.' })
      router.refresh()
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return

    setLoading(true)
    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Post deleted', description: 'The post has been deleted.' })
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleTogglePublish}
        disabled={loading}
        title={isPublished ? 'Unpublish' : 'Publish'}
      >
        {isPublished
          ? <EyeOff className="w-4 h-4 text-foreground-muted hover:text-foreground" />
          : <Eye className="w-4 h-4 text-foreground-muted hover:text-emerald-400" />
        }
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleDelete}
        disabled={loading}
        title="Delete post"
      >
        <Trash2 className="w-4 h-4 text-foreground-muted hover:text-red-400" />
      </Button>
    </>
  )
}
