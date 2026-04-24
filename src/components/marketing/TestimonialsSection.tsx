'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Orbis Solutions transformed how we approach strategic decisions. Their AI-powered analysis identified a market opportunity we had completely missed, resulting in a $12M revenue stream in the first year.",
    author: 'Sarah Chen',
    role: 'Chief Strategy Officer',
    company: 'TechFlow Industries',
    initials: 'SC',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    quote:
      "The ROI was evident within 90 days. Orbis Solutions's process automation recommendations reduced our operational costs by 34% while improving output quality. I recommend them to every CTO I know.",
    author: 'Marcus Rodriguez',
    role: 'Chief Technology Officer',
    company: 'DataSync Global',
    initials: 'MR',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote:
      "We had tried other AI consulting firms before, but Orbis Solutions was different. They understood our industry deeply and delivered a roadmap we could actually execute. Game-changing.",
    author: 'Priya Patel',
    role: 'VP of Digital Transformation',
    company: 'CloudNine Enterprises',
    initials: 'PP',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            See what enterprise leaders say about working with Orbis Solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-8 flex flex-col gap-6 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
            >
              <Quote className="w-8 h-8 text-accent/50" />
              <p className="text-foreground-muted leading-relaxed italic flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-sm font-bold">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="text-foreground font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-foreground-muted text-xs">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
