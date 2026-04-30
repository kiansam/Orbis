'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Orbis Solutions transformed how we approach strategic decisions. Their AI-powered analysis identified a market opportunity we had completely missed, resulting in a $12M revenue stream in the first year.',
    author: 'Sarah Chen',
    role: 'Chief Strategy Officer',
    company: 'TechFlow Industries',
    initials: 'SC',
  },
  {
    quote:
      "The ROI was evident within 90 days. Orbis Solutions's process automation recommendations reduced our operational costs by 34% while improving output quality. I recommend them to every CTO I know.",
    author: 'Marcus Rodriguez',
    role: 'Chief Technology Officer',
    company: 'DataSync Global',
    initials: 'MR',
  },
  {
    quote:
      'We had tried other AI consulting firms before, but Orbis Solutions was different. They understood our industry deeply and delivered a roadmap we could actually execute.',
    author: 'Priya Patel',
    role: 'VP of Digital Transformation',
    company: 'CloudNine Enterprises',
    initials: 'PP',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#070C16] border-t border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="t-label text-[#4169FF]">Testimonials</span>
          <h2 className="t-h1 text-white mt-3 mb-4">Trusted by industry leaders</h2>
          <p className="t-body-lg text-[#8A97B0] max-w-2xl mx-auto">
            See what enterprise leaders say about working with Orbis Solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="bg-[#0D1526] border border-[#1E2D4A] rounded-xl p-6 flex flex-col gap-6 hover:border-[#2A3F6A] transition-colors duration-200"
            >
              <span className="text-4xl leading-none text-[#4169FF]/30 font-serif select-none">
                &ldquo;
              </span>
              <p className="t-body text-[#8A97B0] flex-1 -mt-4">{testimonial.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#1E2D4A]">
                <div className="w-9 h-9 rounded-lg bg-[rgba(65,105,255,0.12)] flex items-center justify-center flex-shrink-0">
                  <span className="t-label text-[#4169FF]">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.author}</div>
                  <div className="t-body-sm text-[#4F617A]">
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
