'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, GitFork } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signupSchema, SignupFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const supabase = createClient()

  const onSubmit = async (data: SignupFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    setSubmitted(true)
  }

  const handleOAuth = async (provider: 'google' | 'github') => {
    setOauthLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      toast({
        title: 'OAuth error',
        description: error.message,
        variant: 'destructive',
      })
      setOauthLoading(null)
    }
  }

  if (submitted) {
    return (
      <div className="bg-background-card border border-border rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Check your email</h2>
        <p className="text-foreground-muted mb-6">
          We sent a confirmation link to your email address. Click the link to activate your account and get started.
        </p>
        <p className="text-foreground-muted text-sm">
          Already confirmed?{' '}
          <Link href="/login" className="text-accent hover:text-accent-hover transition-colors font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-background-card border border-border rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
        <p className="text-foreground-muted text-sm">Start your 14-day free trial. No credit card required.</p>
      </div>

      {/* OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant="outline"
          className="border-border-strong hover:bg-white/5"
          onClick={() => handleOAuth('google')}
          disabled={oauthLoading !== null}
        >
          {oauthLoading === 'google' ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          Google
        </Button>
        <Button
          variant="outline"
          className="border-border-strong hover:bg-white/5"
          onClick={() => handleOAuth('github')}
          disabled={oauthLoading !== null}
        >
          {oauthLoading === 'github' ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <GitFork className="w-4 h-4 mr-2" />
          )}
          GitHub
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Separator className="bg-border flex-1" />
        <span className="text-foreground-muted text-xs">or sign up with email</span>
        <Separator className="bg-border flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            placeholder="John Smith"
            className="bg-background-secondary border-border focus:border-accent"
            {...register('full_name')}
          />
          {errors.full_name && (
            <p className="text-red-400 text-xs">{errors.full_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
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
          <Label htmlFor="confirm_password">Confirm Password</Label>
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
          className="w-full bg-accent hover:bg-accent-hover text-white h-11 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>
      </form>

      <p className="text-center text-foreground-muted text-xs mt-4">
        By signing up, you agree to our{' '}
        <Link href="#" className="text-accent hover:text-accent-hover transition-colors">Terms of Service</Link>
        {' '}and{' '}
        <Link href="#" className="text-accent hover:text-accent-hover transition-colors">Privacy Policy</Link>
      </p>

      <p className="text-center text-foreground-muted text-sm mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-accent hover:text-accent-hover transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
