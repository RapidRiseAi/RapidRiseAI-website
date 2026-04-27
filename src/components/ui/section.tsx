'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from './container';

export function Section({ label, title, intro, children, className = '' }: React.PropsWithChildren<{ label?: string; title?: string; intro?: string; className?: string }>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={`section-padding ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      <Container>
        {label || title || intro ? (
          <div className="mb-8 max-[640px]:mb-3.5 md:mb-10">
            {label ? <p className="text-system-eyebrow text-accent-primary max-[640px]:text-[12px]">{label}</p> : null}
            {title ? <h2 className="mt-3 max-w-4xl text-system-h2 max-[640px]:mt-2 max-[640px]:leading-[1.12]">{title}</h2> : null}
            {intro ? <p className="mt-4 max-w-3xl text-system-body text-text-secondary max-[640px]:mt-2 max-[640px]:text-[15px] max-[640px]:leading-[1.5]">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </motion.section>
  );
}
