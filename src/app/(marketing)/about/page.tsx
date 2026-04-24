import type { Metadata } from 'next'
import { Target, Lightbulb, Heart, Shield, Zap, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Orbis Solutions',
  description: 'Learn about Orbis Solutions\'s mission, team, and values. We\'re building the future of AI-powered enterprise consulting.',
}

const team = [
  {
    name: 'Alexandra Kim',
    role: 'Chief Executive Officer',
    bio: 'Former McKinsey Partner with 15+ years in enterprise technology transformation. Stanford MBA, MIT Computer Science.',
    initials: 'AK',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'David Okafor',
    role: 'Chief Technology Officer',
    bio: 'Ex-Google AI Research lead. Built ML infrastructure used by 1B+ users. PhD in Machine Learning from Carnegie Mellon.',
    initials: 'DO',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Sophia Laurent',
    role: 'Chief Strategy Officer',
    bio: 'Former BCG Principal specializing in digital transformation. Advised 50+ Fortune 500 companies on AI adoption.',
    initials: 'SL',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Marcus Thompson',
    role: 'VP of Engineering',
    bio: 'Built scalable systems at Amazon and Stripe. Expert in cloud architecture, data engineering, and MLOps.',
    initials: 'MT',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Data Science',
    bio: 'Former DeepMind researcher. Pioneered NLP applications in enterprise settings. Author of 20+ peer-reviewed AI papers.',
    initials: 'PS',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'James Watanabe',
    role: 'VP of Client Success',
    bio: 'Led enterprise partnerships at Salesforce and Palantir. Obsessed with ensuring clients achieve measurable ROI.',
    initials: 'JW',
    gradient: 'from-violet-500 to-purple-500',
  },
]

const values = [
  {
    icon: Target,
    title: 'Results First',
    description: 'We measure success by the tangible business outcomes we deliver, not by the sophistication of our models.',
  },
  {
    icon: Lightbulb,
    title: 'Intellectual Honesty',
    description: 'We tell clients what they need to hear, not what they want to hear. Clear-eyed analysis drives better decisions.',
  },
  {
    icon: Heart,
    title: 'Client Partnership',
    description: 'We build long-term partnerships, not transactional engagements. Your success is our success.',
  },
  {
    icon: Shield,
    title: 'Responsible AI',
    description: 'We champion ethical AI development—transparent, fair, auditable, and aligned with human values.',
  },
  {
    icon: Zap,
    title: 'Speed to Value',
    description: 'We move with urgency. Rapid iteration and quick wins build confidence while larger transformations take shape.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'AI opportunities are global. Our team brings diverse expertise across geographies, industries, and cultures.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">About Orbis Solutions</span>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mt-4 mb-6">
            We exist to make AI work for every enterprise
          </h1>
          <p className="text-xl text-foreground-muted leading-relaxed">
            Founded in 2021, Orbis Solutions emerged from a simple observation: the gap between AI potential
            and AI reality was growing wider every year. We built Orbis Solutions to close that gap—combining
            deep technical expertise with strategic business acumen to deliver AI outcomes that matter.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Our Mission</span>
              <h2 className="text-4xl font-bold text-foreground mt-3 mb-6">
                Democratizing AI-powered strategic advantage
              </h2>
              <div className="space-y-4 text-foreground-muted leading-relaxed">
                <p>
                  For too long, the transformative power of artificial intelligence has been accessible
                  only to a handful of technology giants with massive engineering teams and data infrastructure.
                  Orbis Solutions is changing that.
                </p>
                <p>
                  Our mission is to give every enterprise—regardless of their current AI maturity—the
                  strategic guidance, technical expertise, and platform access needed to compete in an
                  AI-driven world.
                </p>
                <p>
                  We believe AI should be a force multiplier for human intelligence and creativity, not
                  a replacement for it. The best outcomes happen at the intersection of human judgment
                  and machine precision.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Enterprise Clients' },
                { value: '$2.4B', label: 'Client Value Created' },
                { value: '94%', label: 'Client Retention Rate' },
                { value: '47', label: 'Countries Served' },
              ].map((stat, i) => (
                <div key={i} className="bg-background-card border border-border rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-foreground-muted text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Leadership</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              Meet the team
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              World-class expertise from the top technology companies, consulting firms, and research institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-background-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.4)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-lg font-bold">{member.initials}</span>
                  </div>
                  <div>
                    <div className="text-foreground font-semibold">{member.name}</div>
                    <div className="text-accent text-sm">{member.role}</div>
                  </div>
                </div>
                <p className="text-foreground-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-semibold tracking-wider uppercase">Values</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
              What we stand for
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Our values guide every decision we make—from how we advise clients to how we build our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-background-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
