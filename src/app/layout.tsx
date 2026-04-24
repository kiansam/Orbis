import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Orbis Solutions - AI-Powered Consulting for Modern Enterprises',
    template: '%s | Orbis Solutions',
  },
  description:
    'Orbis Solutions delivers AI-powered consulting services for modern enterprises. Transform your business with intelligent strategy, data analytics, and process automation.',
  keywords: [
    'AI consulting',
    'artificial intelligence',
    'enterprise consulting',
    'data analytics',
    'process automation',
    'digital transformation',
  ],
  authors: [{ name: 'Orbis Solutions' }],
  creator: 'Orbis Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Orbis Solutions - AI-Powered Consulting for Modern Enterprises',
    description:
      'Transform your business with AI-powered intelligence. Strategy, analytics, and automation for the modern enterprise.',
    siteName: 'Orbis Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbis Solutions - AI-Powered Consulting for Modern Enterprises',
    description:
      'Transform your business with AI-powered intelligence. Strategy, analytics, and automation for the modern enterprise.',
    creator: '@orbissolutions',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
