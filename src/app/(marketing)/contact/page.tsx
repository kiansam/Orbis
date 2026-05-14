'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Mail, Clock, CheckCircle, MessageSquare, FileText } from 'lucide-react'
import { contactSchema, ContactFormData } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'

const contactInfo = [
  { icon: Mail, title: 'Email Us', value: 'orbissolutions.ai@gmail.com', sub: 'We respond within 24 hours' },
  { icon: Clock, title: 'Business Hours', value: 'Mon–Fri, 9am–6pm PST', sub: 'We will follow up the same day' },
]

type Tab = 'chat' | 'form'

// Module-level: persists across client-side navigations so initFull is only called once.
let persistedChatEl: HTMLElement | null = null

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>('chat')
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) })

  useEffect(() => {
    const container = chatContainerRef.current
    if (!container) return

    if (!persistedChatEl) {
      // First ever visit: create the element and call initFull once.
      persistedChatEl = document.createElement('n8nchatui-inpage')
      persistedChatEl.style.cssText = 'width:100%;height:100%;display:block;'
      container.appendChild(persistedChatEl)

      const script = document.createElement('script')
      script.type = 'module'
      script.innerHTML = `
        import Chatbot from "https://cdn.n8nchatui.com/v1/embed.js";
        Chatbot.initFull({
          "n8nChatUrl": "https://n8n.orbissolutions.ca/webhook/5ba0f854-d981-41b3-a37f-4b7ab3530a1d/chat",
          "metadata": {},
          "theme": {
            "button": { "iconColor": "#fff9f6", "backgroundColor": "#4169FF" },
            "chatWindow": {
              "borderRadiusStyle": "rounded",
              "avatarBorderRadius": 50,
              "messageBorderRadius": 6,
              "showTitle": true,
              "title": "Orbis Solutions ChatBot",
              "titleAvatarSrc": "https://cdn.corenexis.com/files/c/8289462720.png",
              "avatarSize": 43,
              "welcomeMessage": "Hi there! I can get you booked in for a free demo, or answer any questions you have about what we do. What can I help you with?",
              "errorMessage": "Sorry! Running into some technical issues. Please feel free to reach out to us directly at orbissolutions.ai@gmail.com.",
              "backgroundColor": "#ffffff",
              "height": 0,
              "width": 0,
              "fontSize": 18,
              "starterPrompts": ["I'd like to book a free live demo", "I have questions about Orbis' services"],
              "starterPromptFontSize": 18,
              "renderHTML": false,
              "clearChatOnReload": true,
              "showScrollbar": true,
              "botMessage": {
                "backgroundColor": "#4169FF",
                "textColor": "#fafafa",
                "showAvatar": true,
                "avatarSrc": "https://cdn.corenexis.com/files/c/1119434720.png",
                "showCopyToClipboardIcon": false
              },
              "userMessage": {
                "backgroundColor": "#fff6f3",
                "textColor": "#050505",
                "showAvatar": false,
                "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
              },
              "textInput": {
                "placeholder": "Type your query",
                "backgroundColor": "#ffffff",
                "textColor": "#1e1e1f",
                "sendButtonColor": "#4169FF",
                "maxChars": 300,
                "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 300 characters.",
                "autoFocus": false,
                "borderRadius": 6,
                "sendButtonBorderRadius": 50
              }
            }
          }
        });
      `
      document.body.appendChild(script)
    } else {
      // Returning via client-side nav: reattach the already-initialized element.
      persistedChatEl.style.display = 'block'
      container.appendChild(persistedChatEl)
    }

    return () => {
      // On unmount, move the element to body (hidden) so the chatbot stays
      // alive and initFull doesn't need to be called again on return.
      if (persistedChatEl && container.contains(persistedChatEl)) {
        persistedChatEl.style.display = 'none'
        document.body.appendChild(persistedChatEl)
      }
    }
  }, [])

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
      <section style={{ padding: '80px 0 48px', textAlign: 'center' }}>
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

      {/* Tab switcher */}
      <section style={{ padding: '0 24px 40px', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-base)',
            borderRadius: '100px',
            padding: '4px',
            gap: '2px',
          }}
        >
          {([
            { id: 'chat' as Tab, label: 'Chat with Us', Icon: MessageSquare },
            { id: 'form' as Tab, label: 'Send a Message', Icon: FileText },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 22px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
                background: tab === id ? 'var(--bg-base)' : 'transparent',
                color: tab === id ? 'var(--color-brand)' : 'var(--text-secondary)',
                boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <Icon style={{ width: '15px', height: '15px' }} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab content */}
      <section style={{ padding: '0 24px 96px' }}>

        {/* Chatbot tab — always mounted (display:none when inactive) so initFull doesn't re-run */}
        <div style={{ display: tab === 'chat' ? 'flex' : 'none', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '860px',
              height: '750px',
              position: 'relative',
              background: '#ffffff',
              overflow: 'hidden',
              borderRadius: '12px',
              border: '1px solid var(--border-base)',
            }}
          >
            {/* n8nchatui-inpage is inserted here programmatically in useEffect */}
            <div ref={chatContainerRef} style={{ width: '100%', height: '100%' }} />
            {/* Covers the n8n branding footer */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '34px',
                background: '#ffffff',
                zIndex: 2147483647,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Form tab */}
        {tab === 'form' && (
          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Contact info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="contact-info-row">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-base)',
                    borderRadius: 'var(--r-lg)',
                    padding: '20px',
                  }}
                >
                  <div className="icon-box" style={{ marginBottom: '12px' }}>
                    <item.icon style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '2px' }}>{item.value}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Form / success state */}
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
                  padding: '32px',
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
        )}

      </section>

      <style>{`
        @media (max-width: 600px) {
          .contact-info-row { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
