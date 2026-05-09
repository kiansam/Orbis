'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { signupSchema, SignupFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

function SignupContent() {
  const [submitted, setSubmitted] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) })

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
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' })
      return
    }
    setSubmitted(true)
  }

  const handleOAuth = async (provider: 'google' | 'azure') => {
    setOauthLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: provider === 'azure' ? 'email openid profile' : undefined,
      },
    })
    if (error) {
      toast({ title: 'OAuth error', description: error.message, variant: 'destructive' })
      setOauthLoading(null)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-base)',
    borderRadius: 'var(--r-md)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color var(--t-fast), box-shadow var(--t-fast)',
    boxSizing: 'border-box' as const,
  }

  if (submitted) {
    return (
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--r-xl)',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--success-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <CheckCircle style={{ width: '28px', height: '28px', color: 'var(--success)' }} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
          Check your email
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
          We sent a confirmation link to your email address. Click the link to activate your account.
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already confirmed?{' '}
          <Link
            href="/login"
            style={{ color: 'var(--accent-hex)', fontWeight: 600, textDecoration: 'none' }}
          >
            Sign in here
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-base)',
        borderRadius: 'var(--r-xl)',
        padding: '40px',
      }}
    >
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: '6px',
          }}
        >
          Create your account
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      {/* OAuth Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {[
          {
            provider: 'google' as const,
            label: 'Google',
            icon: (
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            ),
          },
          {
            provider: 'azure' as const,
            label: 'Microsoft',
            icon: (
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
            ),
          },
        ].map(({ provider, label, icon }) => (
          <button
            key={provider}
            onClick={() => handleOAuth(provider)}
            disabled={oauthLoading !== null}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--r-md)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              cursor: oauthLoading ? 'not-allowed' : 'pointer',
              transition: 'border-color var(--t-fast), background var(--t-fast)',
              opacity: oauthLoading && oauthLoading !== provider ? 0.5 : 1,
            }}
            onMouseEnter={e => {
              if (!oauthLoading) {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = 'var(--border-bright)'
                el.style.background = 'var(--bg-highlight)'
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'var(--border-base)'
              el.style.background = 'var(--bg-elevated)'
            }}
          >
            {oauthLoading === provider ? (
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--border-base)',
                  borderTopColor: 'var(--accent-hex)',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                  flexShrink: 0,
                }}
              />
            ) : icon}
            {label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or sign up with email</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="full_name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Full Name
          </label>
          <input
            id="full_name"
            placeholder="John Smith"
            style={{ ...inputStyle, border: errors.full_name ? '1px solid var(--error)' : '1px solid var(--border-base)' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}            {...register('full_name')}
          />
          {errors.full_name && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.full_name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            style={{ ...inputStyle, border: errors.email ? '1px solid var(--error)' : '1px solid var(--border-base)' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}            {...register('email')}
          />
          {errors.email && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            style={{ ...inputStyle, border: errors.password ? '1px solid var(--error)' : '1px solid var(--border-base)' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}            {...register('password')}
          />
          {errors.password && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirm_password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Confirm Password
          </label>
          <input
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            style={{ ...inputStyle, border: errors.confirm_password ? '1px solid var(--error)' : '1px solid var(--border-base)' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}            {...register('confirm_password')}
          />
          {errors.confirm_password && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.confirm_password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ justifyContent: 'center', width: '100%', padding: '12px', marginTop: '4px' }}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.7s linear infinite',
                }}
              />
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
        By signing up, you agree to our{' '}
        <Link href="#" style={{ color: 'var(--accent-hex)', textDecoration: 'none' }}>Terms of Service</Link>
        {' '}and{' '}
        <Link href="#" style={{ color: 'var(--accent-hex)', textDecoration: 'none' }}>Privacy Policy</Link>
      </p>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ fontWeight: 600, color: 'var(--accent-hex)', textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
          <span
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid var(--border-base)',
              borderTopColor: 'var(--accent-hex)',
              borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
              display: 'block',
            }}
          />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  )
}
