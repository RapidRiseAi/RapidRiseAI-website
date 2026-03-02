'use client';

import { motion } from 'framer-motion';
import { Container } from './container';

export function Section({ label, title, intro, children, className = '' }: React.PropsWithChildren<{ label?: string; title?: string; intro?: string; className?: string }>) {
  return (
    <motion.section className={`section-padding ${className}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4 }}>
      <Container>
        {label || title || intro ? (
          <div className="mb-8 max-[640px]:mb-3.5 md:mb-10">
            {label ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue max-[640px]:text-[12px]">{label}</p> : null}
            {title ? <h2 className="mt-3 max-w-4xl font-[var(--font-jakarta)] text-3xl font-semibold tracking-tight max-[640px]:mt-2 max-[640px]:text-[clamp(26px,6.5vw,32px)] max-[640px]:leading-[1.12] md:text-5xl">{title}</h2> : null}
            {intro ? <p className="mt-4 max-w-3xl text-base leading-7 text-text1 max-[640px]:mt-2 max-[640px]:text-[15px] max-[640px]:leading-[1.5]">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </motion.section>
  );
}
