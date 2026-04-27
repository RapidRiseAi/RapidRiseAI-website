'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ReducedMotionWrapper({ children }: React.PropsWithChildren) {
  const reduce = useReducedMotion();
  return <div data-reduced-motion={reduce ? 'true' : 'false'}>{children}</div>;
}

export function RevealOnScroll({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </motion.div>
  );
}

export function FloatingCard({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

export function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={cn('block h-px w-full bg-gradient-to-r from-transparent via-accent-primary/80 to-transparent', className)}
      initial={reduce ? false : { scaleX: 0, opacity: 0.5 }}
      whileInView={reduce ? {} : { scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{ transformOrigin: 'left center' }}
    />
  );
}

export function CountUpMetric({ value, className }: { value: string; className?: string }) {
  return <p className={cn('text-2xl font-semibold md:text-3xl', className)}>{value}</p>;
}

export function PulseDot({ className }: { className?: string }) {
  return <span className={cn('relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-success after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-accent-success/70', className)} />;
}

export function AnimatedBorder({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('relative rounded-[22px] border border-border-subtle before:pointer-events-none before:absolute before:inset-0 before:rounded-[22px] before:border before:border-accent-primary/0 hover:before:border-accent-primary/60', className)}>{children}</div>;
}

export function MotionConnector({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-8 overflow-hidden', className)}>
      <motion.div className="absolute inset-y-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-accent-secondary to-transparent" animate={{ opacity: [0.3, 0.85, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
    </div>
  );
}
