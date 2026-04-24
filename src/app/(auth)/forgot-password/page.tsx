'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const supabase = createClient()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-background-card border border-border rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Check your inbox</h2>
        <p className="text-foreground-muted mb-6">
          We sent a password reset link to your email. Follow the instructions to reset your password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background-card border border-border rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-accent-muted flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Forgot your password?</h1>
        <p className="text-foreground-muted text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="bg-background-secondary border-border focus:border-accent"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-400 text-xs">{errors.email.message}</p>
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
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>

      <p className="text-center text-foreground-muted text-sm mt-6">
        Remember your password?{' '}
        <Link href="/login" className="text-accent hover:text-accent-hover transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
