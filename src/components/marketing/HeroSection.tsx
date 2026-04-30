'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, Zap } from 'lucide-react'

const metrics = [
  { icon: TrendingUp, value: '3.2x', label: 'Avg. ROI improvement' },
  { icon: Users, value: '500+', label: 'Enterprise clients' },
  { icon: Zap, value: '94%', label: 'Faster insights' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#070C16]"
      id="top"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,45,74,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,45,74,0.35) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 80%)',
        }}
      />
      <div className="absolute inset-0 o-hero-wash-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="badge">AI-Powered Consulting Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="t-display text-white mb-6 max-w-4xl"
          >
            Transform Your Business with{' '}
            <span className="text-[#4169FF]">AI-Powered Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="t-body-lg text-[#8A97B0] max-w-2xl mb-12"
          >
            Orbis Solutions delivers enterprise-grade AI consulting that accelerates
            decision-making, reduces risk, and unlocks new competitive advantages.
            Built for the modern enterprise.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16 mt-0"
          >
            <Link href="/signup" className="btn-primary">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Schedule a Demo
            </Link>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className="rounded-lg p-4 flex items-center gap-3 bg-[#0D1526] border border-[#1E2D4A] hover:border-[#2A3F6A] transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[rgba(65,105,255,0.12)] flex items-center justify-center flex-shrink-0">
                  <metric.icon className="w-5 h-5 text-[#4169FF]" />
                </div>
                <div className="text-left">
                  <div className="t-mono text-xl font-semibold text-white">{metric.value}</div>
                  <div className="t-body-sm text-[#4F617A]">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
