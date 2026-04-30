import Link from 'next/link'
import { X, GitFork, Link2 } from 'lucide-react'

const productLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard', label: 'Dashboard' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/about#team', label: 'Team' },
  { href: '/about#values', label: 'Values' },
]

const resourceLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Support' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'API Reference' },
]

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
  { href: '#', label: 'GDPR' },
]

function OrbisLogoWhite() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
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

export function Footer() {
  return (
    <footer className="bg-[#070C16] border-t border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <OrbisLogoWhite />
              <span className="text-[15px] font-semibold text-white">Orbis Solutions</span>
            </Link>
            <p className="text-[#8A97B0] text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered consulting for modern enterprises. Transform your business with
              intelligent strategy and data-driven insights.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://twitter.com/orbissolutions', icon: X, label: 'Twitter' },
                { href: 'https://github.com/orbissolutions', icon: GitFork, label: 'GitHub' },
                { href: 'https://linkedin.com/company/orbissolutions', icon: Link2, label: 'LinkedIn' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[#1E2D4A] flex items-center justify-center text-[#4F617A] hover:text-white hover:border-[#4169FF] transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#8A97B0] text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#8A97B0] text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#8A97B0] text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[#8A97B0] text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-[#1E2D4A] mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4F617A] text-sm">
            &copy; {new Date().getFullYear()} Orbis Solutions. All rights reserved.
          </p>
          <p className="text-[#4F617A] text-sm">Built with AI-powered precision</p>
        </div>
      </div>
    </footer>
  )
}
