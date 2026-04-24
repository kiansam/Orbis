'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const metrics = [
  { icon: TrendingUp, value: '3.2x', label: 'Avg. ROI improvement' },
  { icon: Users, value: '500+', label: 'Enterprise clients' },
  { icon: Zap, value: '94%', label: 'Faster insights' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-muted border border-accent/20 text-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Consulting Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 max-w-4xl"
          >
            Transform Your Business with{' '}
            <span className="gradient-text">AI-Powered Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-foreground-muted max-w-2xl mb-10 leading-relaxed"
          >
            Orbis Solutions delivers enterprise-grade AI consulting that accelerates decision-making,
            reduces risk, and unlocks new competitive advantages. Built for the modern enterprise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              asChild
              className="bg-accent hover:bg-accent-hover text-white px-8 h-12 text-base shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] transition-all"
            >
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-border-strong hover:bg-white/5 text-foreground h-12 text-base"
            >
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </motion.div>

          {/* Metrics floating cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0">
                  <metric.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-foreground">{metric.value}</div>
                  <div className="text-xs text-foreground-muted">{metric.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
