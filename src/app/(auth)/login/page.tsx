'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'
  const { toast } = useToast()
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const supabase = createClient()

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' })
      return
    }
    router.push(redirectTo)
    router.refresh()
  }

  const handleOAuth = async (provider: 'google' | 'azure') => {
    setOauthLoading(provider)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        scopes: provider === 'azure' ? 'email openid profile' : undefined,
      },
    })
    if (error) {
      toast({ title: 'OAuth error', description: error.message, variant: 'destructive' })
      setOauthLoading(null)
    }
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
          Welcome back
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Sign in to your Orbis Solutions account
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
            ) : (
              icon
            )}
            {label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or continue with email</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label
            htmlFor="email"
            style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            style={{
              width: '100%',
              background: 'var(--bg-elevated)',
              border: errors.email ? '1px solid var(--error)' : '1px solid var(--border-base)',
              borderRadius: 'var(--r-md)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              padding: '10px 14px',
              outline: 'none',
              transition: 'border-color var(--t-fast), box-shadow var(--t-fast)',
              boxSizing: 'border-box',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--accent-hex)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)'
            }}
            {...register('email')}
          />
          {errors.email && (
            <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label
              htmlFor="password"
              style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              style={{
                fontSize: '12px',
                color: 'var(--accent-hex)',
                textDecoration: 'none',
                transition: 'opacity var(--t-fast)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            style={{
              width: '100%',
              background: 'var(--bg-elevated)',
              border: errors.password ? '1px solid var(--error)' : '1px solid var(--border-base)',
              borderRadius: 'var(--r-md)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              padding: '10px 14px',
              outline: 'none',
              transition: 'border-color var(--t-fast), box-shadow var(--t-fast)',
              boxSizing: 'border-box',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--accent-hex)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)'
            }}
            {...register('password')}
          />
          {errors.password && (
            <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>
          )}
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
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          style={{
            fontWeight: 600,
            color: 'var(--accent-hex)',
            textDecoration: 'none',
            transition: 'opacity var(--t-fast)',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        >
          Create one free
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
          }}
        >
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
      <LoginContent />
    </Suspense>
  )
}
