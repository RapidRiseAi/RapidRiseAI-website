'use client';

import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { CONFIG } from '@/lib/config';
import { Container } from './ui/container';
import { Button } from './ui/button';
import { siteContent } from '@/content/siteContent';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stroke bg-bg0/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold">Rapid Rise AI</Link>
        <nav className="hidden items-center gap-4 md:flex">{siteContent.nav.items.map((item) => <Link key={item.href} href={item.href} className="text-sm text-text1 hover:text-text0">{item.label}</Link>)}</nav>
        <Button href="/quote" className="text-sm">Request a Quote</Button>
      </Container>
    </header>
  );
}

export function Footer() {
  const f = siteContent.footer;
  return (
    <footer className="border-t border-stroke py-12">
      <Container className="space-y-3 text-sm text-text1">
        <p className="text-text0">{f.company}</p><p>{f.tagline}</p><p>Email: {f.email}</p><p>Phone: {f.phone}</p><p>CIPC: {f.cipc}</p><p>{f.vat}</p>
        <div className="flex gap-4">{f.links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</div>
      </Container>
    </footer>
  );
}

export function ChatWidget() {
  return (
    <>
      {CONFIG.botpressEmbedUrl ? <Script src={CONFIG.botpressEmbedUrl} strategy="afterInteractive" /> : null}
      <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} href="/contact" className="fixed bottom-6 right-6 rounded-full border border-stroke bg-bg1 px-4 py-2 text-sm">Chat</motion.a>
      <div className="fixed bottom-20 right-6 hidden rounded-card border border-stroke bg-bg1 p-3 text-xs text-text1 md:block">Ask a question · Request a quote · View work</div>
    </>
  );
}

export function CookieBanner() {
  if (!CONFIG.analyticsEnabled) return null;
  return <div className="fixed inset-x-4 bottom-4 rounded-card border border-stroke bg-bg1 p-4 text-sm">This site uses cookies for analytics.</div>;
}
