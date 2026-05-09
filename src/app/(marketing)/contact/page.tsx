'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Mail, Clock, CheckCircle } from 'lucide-react'
import { contactSchema, ContactFormData } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'

const contactInfo = [
  { icon: Mail, title: 'Email Us', value: 'orbissolutions.ai@gmail.com', sub: 'We respond within 24 hours' },
  { icon: Clock, title: 'Business Hours', value: 'Mon–Fri, 9am–6pm PST', sub: 'We will follow up the same day' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to send message')
      }
      setSubmitted(true)
      reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border-base)',
    borderRadius: 'var(--r-md)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    padding: '10px 14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color var(--t-fast)',
  }

  return (
    <div style={{ background: 'var(--bg-base)', paddingTop: '40px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 0 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <span className="badge-accent" style={{ display: 'inline-flex', marginBottom: '20px' }}>Contact</span>
          <h1 className="t-h1" style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
            Let&apos;s start a <span className="text-gradient">conversation</span>
          </h1>
          <p className="t-body-lg" style={{ color: 'var(--text-secondary)' }}>
            Tell us about your business and we&apos;ll show you what an Orbis agent could do for you.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 96px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }} className="contact-grid">

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-base)',
                    borderRadius: 'var(--r-lg)',
                    padding: '24px',
                  }}
                >
                  <div className="icon-box" style={{ marginBottom: '14px' }}>
                    <item.icon style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '2px' }}>{item.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-base)',
                    borderRadius: 'var(--r-xl)',
                    padding: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '20px',
                    minHeight: '320px',
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
                    }}
                  >
                    <CheckCircle style={{ width: '28px', height: '28px', color: 'var(--success)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-base)',
                    borderRadius: 'var(--r-xl)',
                    padding: '36px',
                  }}
                >
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
                    Send us a message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          Full Name *
                        </label>
                        <input placeholder="John Smith" style={inputStyle} {...register('name')} />
                        {errors.name && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.name.message}</p>}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          Email *
                        </label>
                        <input type="email" placeholder="john@company.com" style={inputStyle} {...register('email')} />
                        {errors.email && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Company
                      </label>
                      <input placeholder="Your Business Name" style={inputStyle} {...register('company')} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Message *
                      </label>
                      <textarea
                        placeholder="Tell us about your business and what you'd like an AI agent to handle..."
                        rows={6}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                        {...register('message')}
                      />
                      {errors.message && <p style={{ color: 'var(--error)', fontSize: '12px', marginTop: '4px' }}>{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ justifyContent: 'center', width: '100%', padding: '13px', fontSize: '15px', gap: '8px' }}
                    >
                      {isSubmitting ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <Send style={{ width: '16px', height: '16px' }} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
