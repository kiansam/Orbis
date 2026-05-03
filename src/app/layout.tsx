import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Orbis Solutions',
    template: '%s | Orbis Solutions',
  },
  description:
    'Orbis Solutions builds done-for-you AI agents for service businesses — trades, contractors, and field services. Answer calls, book jobs, and handle customer questions 24/7.',
  keywords: [
    'AI agents',
    'AI for trades',
    'AI for contractors',
    'done-for-you AI',
    'service business automation',
    'AI booking',
    'lead capture AI',
    'field service AI',
    'orbis solutions',
    'AI agent builder',
  ],
  authors: [{ name: 'Orbis Solutions' }],
  creator: 'Orbis Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Orbis Solutions',
    description: 'Done-for-you AI agents for service businesses. Answer calls, book jobs, and handle customers — 24/7.',
    siteName: 'Orbis Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbis Solutions',
    description: 'Done-for-you AI agents for service businesses. Answer calls, book jobs, and handle customers — 24/7.',
    creator: '@orbissolutions',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
