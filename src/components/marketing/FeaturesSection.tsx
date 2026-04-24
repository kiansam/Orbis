'use client'

import { motion, type Variants } from 'framer-motion'
import { Brain, BarChart3, Cog, Shield } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Strategy',
    description:
      'Develop comprehensive AI roadmaps tailored to your industry. Our experts identify high-value opportunities and create actionable implementation plans aligned with your business goals.',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    icon: BarChart3,
    title: 'Data Intelligence',
    description:
      'Transform raw data into strategic insights with our advanced analytics platform. Real-time dashboards, predictive modeling, and automated reporting for data-driven decisions.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Cog,
    title: 'Process Automation',
    description:
      'Eliminate bottlenecks and reduce operational costs with intelligent process automation. From workflow optimization to RPA implementation, we streamline your operations end-to-end.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description:
      'Proactively identify and mitigate business risks with AI-powered monitoring. Continuous surveillance of regulatory changes, market dynamics, and operational metrics keeps you protected.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Capabilities</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything you need to lead with AI
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
            From strategy to implementation, Orbis Solutions provides the full spectrum of AI consulting capabilities your enterprise needs to stay ahead.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
              className="relative bg-background-card border border-border rounded-2xl p-8 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
