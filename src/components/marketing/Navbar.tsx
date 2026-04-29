'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

function OrbisLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 7A17 17 0 1 0 30 41" stroke="#4169FF" strokeWidth="4.5" strokeLinecap="round" />
      <path
        d="M30 7C39 7 43 12 43 19C43 26 36 26 30 26C24 26 17 26 17 33C17 38 21 41 30 41"
        stroke="#2E4FCC"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          background: 'rgba(7, 12, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #1E2D4A',
        }}
        className="fixed top-0 left-0 right-0 z-50 h-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <OrbisLogo className="w-8 h-8" />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Orbis Solutions
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-150',
                    pathname === link.href
                      ? 'text-white'
                      : 'text-[#8A97B0] hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="btn-ghost" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-[#8A97B0] hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 md:hidden flex flex-col"
              style={{ background: '#0D1526', borderLeft: '1px solid #1E2D4A' }}
            >
              <div
                className="flex items-center justify-between px-6 h-16"
                style={{ borderBottom: '1px solid #1E2D4A' }}
              >
                <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <OrbisLogo className="w-7 h-7" />
                  <span className="text-[15px] font-semibold text-white">Orbis Solutions</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-[#4F617A] hover:text-white rounded-md transition-colors"
                  style={{ background: 'transparent' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-md text-[14px] font-medium text-[#8A97B0] hover:text-white transition-colors"
                    style={{ transition: 'color 150ms ease' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-4 flex flex-col gap-3" style={{ borderTop: '1px solid #1E2D4A' }}>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-ghost w-full justify-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
