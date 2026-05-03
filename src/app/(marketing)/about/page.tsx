import type { Metadata } from 'next'
import { Target, Lightbulb, Heart, Shield, Zap, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Orbis Solutions',
  description: 'Learn about Orbis Solutions — done-for-you AI agents for service businesses.',
}

const team = [
  {
    name: 'Alexandra Kim',
    role: 'Chief Executive Officer',
    bio: 'Former McKinsey Partner with 15+ years in enterprise technology transformation. Stanford MBA, MIT Computer Science.',
    initials: 'AK',
    grad: 'linear-gradient(135deg, #4169FF, #6B8EFF)',
  },
  {
    name: 'David Okafor',
    role: 'Chief Technology Officer',
    bio: 'Ex-Google AI Research lead. Built ML infrastructure used by 1B+ users. PhD in Machine Learning from Carnegie Mellon.',
    initials: 'DO',
    grad: 'linear-gradient(135deg, #4169FF, #A78BFA)',
  },
  {
    name: 'Sophia Laurent',
    role: 'Chief Strategy Officer',
    bio: 'Former BCG Principal specializing in digital transformation. Advised 50+ Fortune 500 companies on AI adoption.',
    initials: 'SL',
    grad: 'linear-gradient(135deg, #22C55E, #4169FF)',
  },
  {
    name: 'Marcus Thompson',
    role: 'VP of Engineering',
    bio: 'Built scalable systems at Amazon and Stripe. Expert in cloud architecture, data engineering, and MLOps.',
    initials: 'MT',
    grad: 'linear-gradient(135deg, #0F99B2, #4169FF)',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Data Science',
    bio: 'Former DeepMind researcher. Pioneered NLP applications in enterprise settings. Author of 20+ peer-reviewed AI papers.',
    initials: 'PS',
    grad: 'linear-gradient(135deg, #A78BFA, #4169FF)',
  },
  {
    name: 'James Watanabe',
    role: 'VP of Client Success',
    bio: 'Led enterprise partnerships at Salesforce and Palantir. Obsessed with ensuring clients achieve measurable ROI.',
    initials: 'JW',
    grad: 'linear-gradient(135deg, #4169FF, #A78BFA)',
  },
]

const values = [
  { icon: Target, title: 'Results First', description: 'We measure success by the tangible business outcomes we deliver, not by the sophistication of our models.' },
  { icon: Lightbulb, title: 'Intellectual Honesty', description: 'We tell clients what they need to hear, not what they want to hear. Clear-eyed analysis drives better decisions.' },
  { icon: Heart, title: 'Client Partnership', description: 'We build long-term partnerships, not transactional engagements. Your success is our success.' },
  { icon: Shield, title: 'Responsible AI', description: 'We champion ethical AI development — transparent, fair, auditable, and aligned with human values.' },
  { icon: Zap, title: 'Speed to Value', description: 'We move with urgency. Rapid iteration and quick wins build confidence while larger transformations take shape.' },
  { icon: Globe, title: 'Global Perspective', description: 'AI opportunities are global. Our team brings diverse expertise across geographies, industries, and cultures.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-bg)', paddingTop: '40px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 64px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            About Orbis Solutions
          </span>
          <h1
            className="t-h1"
            style={{ color: 'var(--text-primary)', marginBottom: '20px' }}
          >
            We exist to make AI work for every{' '}
            <span className="text-gradient">service business</span>
          </h1>
          <p className="t-body-lg" style={{ color: 'var(--text-secondary)' }}>
            Founded in Vancouver, Orbis Solutions emerged from a simple observation: small service
            businesses were losing jobs every night to unanswered calls and slow follow-up. We built
            Orbis to close that gap — done-for-you AI agents that never sleep.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section
        style={{
          padding: '80px 0',
          background: 'var(--color-bg-subtle)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="about-grid">
            <div>
              <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                Our Mission
              </span>
              <h2 className="t-h2" style={{ color: 'var(--text-primary)', marginBottom: '20px', marginTop: '16px' }}>
                Giving service businesses an edge they could only get by hiring someone
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7 }}>
                <p>For too long, the transformative power of AI has been accessible only to large technology companies with massive engineering teams. Orbis Solutions is changing that.</p>
                <p>Our mission is to give every service business — regardless of size — a fully managed AI agent that handles the customer interactions that fall through the cracks after hours.</p>
                <p>We believe AI should feel like a trusted team member, not a tool. The best outcomes happen when technology handles the routine so people can focus on the work that matters.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { value: '24/7', label: 'Always-on availability' },
                { value: '2–4 wks', label: 'Average time to launch' },
                { value: '62%', label: 'Calls unanswered after hours' },
                { value: '3×', label: 'More leads closed with fast response' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--border-base)',
                    borderRadius: 'var(--r-lg)',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--color-brand)',
                      fontVariantNumeric: 'tabular-nums',
                      marginBottom: '6px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.about-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Team */}
      <section id="team" style={{ padding: '96px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge-blue" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Leadership
            </span>
            <h2 className="t-h2" style={{ color: 'var(--text-primary)', marginTop: '16px' }}>
              Meet the team
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="team-grid">
            {team.map((member, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--border-base)',
                  borderRadius: 'var(--r-lg)',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--r-md)',
                      background: member.grad,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '15px' }}>
                      {member.name}
                    </div>
                    <div style={{ color: 'var(--color-brand)', fontSize: '12px', marginTop: '2px' }}>
                      {member.role}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" style={{ padding: '96px 0', background: 'var(--color-bg-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Values
            </span>
            <h2 className="t-h2" style={{ color: 'var(--text-primary)', marginTop: '16px' }}>
              What we stand for
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="values-grid">
            {values.map((value, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--border-base)',
                  borderRadius: 'var(--r-lg)',
                  padding: '28px',
                }}
              >
                <div className="icon-box" style={{ marginBottom: '16px' }}>
                  <value.icon style={{ width: '20px', height: '20px' }} />
                </div>
                <h3 className="t-h4" style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .team-grid, .values-grid {
          @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr) !important; }
          @media (max-width: 600px) { grid-template-columns: 1fr !important; }
        }
        .about-grid {
          @media (max-width: 768px) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
