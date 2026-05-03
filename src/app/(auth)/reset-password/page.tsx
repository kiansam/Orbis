'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KeyRound } from 'lucide-react'
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
  } = useForm<ResetPasswordFormData>({ resolver: zodResolver(resetPasswordSchema) })

  const supabase = createClient()

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
      return
    }
    toast({ title: 'Password updated', description: 'Your password has been successfully updated.' })
    router.push('/login')
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
          <KeyRound style={{ width: '22px', height: '22px' }} />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Set new password
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters"
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
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-hex)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}            {...register('password')}
          />
          {errors.password && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirm_password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Confirm New Password
          </label>
          <input
            id="confirm_password"
            type="password"
            placeholder="••••••••"
            style={{
              width: '100%',
              background: 'var(--bg-elevated)',
              border: errors.confirm_password ? '1px solid var(--error)' : '1px solid var(--border-base)',
              borderRadius: 'var(--r-md)',
              color: 'var(--text-primary)',
              fontSize: '14px',
              padding: '10px 14px',
              outline: 'none',
              transition: 'border-color var(--t-fast), box-shadow var(--t-fast)',
              boxSizing: 'border-box',
            }}
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
              Updating password...
            </span>
          ) : (
            'Update Password'
          )}
        </button>
      </form>
    </div>
  )
}
