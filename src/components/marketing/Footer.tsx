import Link from 'next/link'
import { Brain, X, GitFork, Link2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

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

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Orbis<span className="text-accent"> Solutions</span></span>
            </Link>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered consulting for modern enterprises. Transform your business with intelligent strategy and data-driven insights.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/orbissolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background-card border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/orbissolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background-card border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-colors"
              >
                <GitFork className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/orbissolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-background-card border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-colors"
              >
                <Link2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-muted text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-border mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground-muted text-sm">
            &copy; {new Date().getFullYear()} Orbis Solutions. All rights reserved.
          </p>
          <p className="text-foreground-muted text-sm">
            Built with AI-powered precision
          </p>
        </div>
      </div>
    </footer>
  )
}
