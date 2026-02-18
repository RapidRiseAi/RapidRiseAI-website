'use client';

import { motion } from 'framer-motion';
import { Container } from './container';

export function Section({ label, title, intro, children, className = '' }: React.PropsWithChildren<{ label?: string; title?: string; intro?: string; className?: string }>) {
  return (
    <motion.section className={`section-padding ${className}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4 }}>
      <Container>
        {label || title || intro ? (
          <div className="mb-8 md:mb-10">
            {label ? <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">{label}</p> : null}
            {title ? <h2 className="mt-3 max-w-4xl font-[var(--font-jakarta)] text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2> : null}
            {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-text1">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </motion.section>
  );
}
