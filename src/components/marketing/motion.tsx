"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Use on a motion.div parent to stagger its children
export const staggerParent = (stagger = 0.11, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Use on motion.p / motion.h2 etc. inside a staggerParent container
export const childVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Simple scroll-triggered fade + slide-up wrapper (renders a div)
export function FadeUp({
  children,
  delay = 0,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container — pass className for grid layouts
export function Stagger({
  children,
  staggerChildren = 0.09,
  delayChildren = 0,
  style,
  className,
}: {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerParent(staggerChildren, delayChildren)}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item — must be a direct child of <Stagger>
export function StaggerItem({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counts from 0 to target when the returned ref scrolls into view
export function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return { ref, value };
}
