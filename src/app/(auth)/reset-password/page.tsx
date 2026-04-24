'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const supabase = createClient()

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Password updated',
      description: 'Your password has been successfully updated.',
    })

    router.push('/login')
  }

  return (
    <div className="bg-background-card border border-border rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mx-auto mb-4">
          <KeyRound className="w-7 h-7 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Set new password</h1>
        <p className="text-foreground-muted text-sm">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            className="bg-background-secondary border-border focus:border-accent"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-400 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm_password">Confirm New Password</Label>
          <Input
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            className="bg-background-secondary border-border focus:border-accent"
            {...register('confirm_password')}
          />
          {errors.confirm_password && (
            <p className="text-red-400 text-xs">{errors.confirm_password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-hover text-white h-11"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating password...
            </span>
          ) : (
            'Update Password'
          )}
        </Button>
      </form>
    </div>
  )
}
