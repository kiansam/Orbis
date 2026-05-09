'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

let lastExchangedCode: string | null = null

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('Completing sign in...')

  useEffect(() => {
    const supabase = createClient()
    const code = searchParams.get('code')
    const next = searchParams.get('next') || '/dashboard'

    // Check for hash-based tokens (implicit flow — Azure may use this)
    const hash = window.location.hash
    const hashParams = new URLSearchParams(hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')

    if (accessToken && refreshToken) {
      setStatus('Setting session from tokens...')
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setStatus(`Session error: ${error.message}`)
            setTimeout(() => router.replace('/login?error=auth_callback_failed'), 2000)
          } else {
            router.replace(next)
          }
        })
      return
    }

    if (code) {
      if (code === lastExchangedCode) return
      lastExchangedCode = code
      setStatus('Exchanging auth code...')

      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          setStatus(`Exchange error: ${error.message}`)
          setTimeout(() => router.replace('/login?error=auth_callback_failed'), 2000)
        } else {
          router.replace(next)
        }
      })
      return
    }

    // No code or hash tokens — check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace(next)
      } else {
        setStatus('No auth data found — redirecting to login')
        setTimeout(() => router.replace('/login?error=auth_callback_failed'), 2000)
      }
    })
  }, [router, searchParams])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
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
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{status}</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
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
      <CallbackHandler />
    </Suspense>
  )
}
