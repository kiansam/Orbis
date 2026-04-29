'use client'

import { motion, type Variants } from 'framer-motion'
import { Brain, BarChart3, Cog, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Strategy',
    description:
      'Develop comprehensive AI roadmaps tailored to your industry. Our experts identify high-value opportunities and create actionable implementation plans aligned with your business goals.',
  },
  {
    icon: BarChart3,
    title: 'Data Intelligence',
    description:
      'Transform raw data into strategic insights with our advanced analytics platform. Real-time dashboards, predictive modeling, and automated reporting for data-driven decisions.',
  },
  {
    icon: Cog,
    title: 'Process Automation',
    description:
      'Eliminate bottlenecks and reduce operational costs with intelligent process automation. From workflow optimization to RPA implementation, we streamline your operations end-to-end.',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description:
      'Proactively identify and mitigate business risks with AI-powered monitoring. Continuous surveillance of regulatory changes, market dynamics, and operational metrics keeps you protected.',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-[#070C16] border-t border-[#162038]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="t-label text-[#4169FF]">Capabilities</span>
          <h2 className="t-h1 text-white mt-3 mb-4">
            Everything you need to lead with AI
          </h2>
          <p className="t-body-lg text-[#8A97B0] max-w-2xl mx-auto">
            From strategy to implementation, Orbis Solutions provides the full spectrum
            of AI consulting capabilities your enterprise needs to stay ahead.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-[#0D1526] border border-[#1E2D4A] rounded-xl p-6 hover:border-[#141E33] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#141E33] flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-[#4169FF]" />
              </div>
              <h3 className="t-h3 text-white mb-3">{feature.title}</h3>
              <p className="t-body text-[#8A97B0]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
