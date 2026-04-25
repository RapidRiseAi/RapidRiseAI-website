'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { siteContent } from '@/content/siteContent';

const solutionLinks = [
  { label: 'Lead Capture and Follow Up', href: '/solutions/lead-capture' },
  { label: 'Workflow Automation and Integrations', href: '/solutions/workflow-automation' },
  { label: 'Smart Google Workspace', href: '/solutions/google-workspace' },
  { label: 'Web Apps and Internal Tools', href: '/solutions/web-apps' },
  { label: 'Websites that Convert', href: '/solutions/websites' },
  { label: 'Training and Enablement', href: '/solutions/training' },
];

type MobileMenuProps = {
  open: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export function MobileMenu({ open, panelRef, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] bg-black/70 md:hidden" onClick={onClose} aria-hidden="true">
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className="absolute right-0 top-0 h-[100dvh] w-[88%] max-w-sm overflow-y-auto border-l border-stroke bg-bg0 p-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">Menu</p>
          <button onClick={onClose} aria-label="Close menu" className="rounded-full p-1 hover:bg-white/5">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-3 text-sm text-text2">Solutions</p>
        <div className="space-y-2">
          {solutionLinks.map((link) => (
            <Link className="block rounded-lg border border-stroke px-3 py-2 text-sm" key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-5 space-y-1">
          {siteContent.nav.items.map((item) => (
            <Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" key={item.href} href={item.href} onClick={onClose}>
              {item.label}
            </Link>
          ))}
          <Link className="block rounded-lg px-3 py-2 text-sm text-text1 hover:bg-white/5" href="/book" onClick={onClose}>
            Book
          </Link>
        </div>
      </aside>
    </div>
  );
}
