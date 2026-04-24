'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, ContactFormData } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@orbissolutions.ca',
    sub: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    value: 'San Francisco, CA',
    sub: 'Also in New York, London, Singapore',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon–Fri, 9am–6pm PST',
    sub: 'Enterprise support 24/7',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

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

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Contact</span>
          <h1 className="text-5xl font-bold text-foreground mt-4 mb-4">
            Let&apos;s start a conversation
          </h1>
          <p className="text-xl text-foreground-muted">
            Tell us about your business challenges and we&apos;ll show you how AI can help.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="bg-background-card border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-foreground font-semibold mb-1">{item.title}</div>
                  <div className="text-foreground text-sm mb-1">{item.value}</div>
                  <div className="text-foreground-muted text-xs">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-background-card border border-border rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-foreground-muted">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-border-strong"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <div className="bg-background-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Smith"
                          className="bg-background-secondary border-border focus:border-accent"
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="bg-background-secondary border-border focus:border-accent"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Acme Corporation"
                        className="bg-background-secondary border-border focus:border-accent"
                        {...register('company')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your AI consulting needs, challenges, or goals..."
                        rows={6}
                        className="bg-background-secondary border-border focus:border-accent resize-none"
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent-hover text-white h-11 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
