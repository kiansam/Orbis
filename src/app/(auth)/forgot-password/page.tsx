'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react'
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
  } = useForm<ForgotPasswordFormData>({ resolver: zodResolver(forgotPasswordSchema) })

  const supabase = createClient()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
      return
    }
    setSubmitted(true)
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
          Check your inbox
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
          We sent a password reset link to your email. Follow the instructions to reset your password.
        </p>
        <Link
          href="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--accent-hex)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Back to sign in
        </Link>
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
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="icon-box-lg" style={{ margin: '0 auto 16px' }}>
          <Mail style={{ width: '22px', height: '22px' }} />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Forgot your password?
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Email Address
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
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
            {...register('email')}
          />
          {errors.email && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
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
              Sending...
            </span>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Remember your password?{' '}
        <Link href="/login" style={{ fontWeight: 600, color: 'var(--accent-hex)', textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}
