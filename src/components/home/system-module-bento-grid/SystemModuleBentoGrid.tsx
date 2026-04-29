'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Bot, Briefcase, Building2, Globe, GraduationCap, Mail, Route } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Module = {
  id: string;
  displayTitle: string;
  outcome: string;
  cta: string;
  tools: string[];
  labels: string[];
  href: string;
  size: string;
  icon: LucideIcon;
  miniVisualType: 'lead' | 'automation' | 'workspace' | 'apps' | 'websites' | 'training' | 'support';
};

const modules: Module[] = [
  {
    id: 'lead-capture',
    displayTitle: 'Lead Capture and Follow Up',
    outcome: 'Turn enquiries into tracked opportunities.',
    cta: 'Explore lead systems',
    tools: ['Website', 'Forms', 'Email', 'WhatsApp', 'Sheets'],
    labels: ['Captured', 'Qualified', 'Assigned', 'Reminded'],
    href: '/solutions/lead-capture',
    size: 'lg:col-span-5',
    icon: Mail,
    miniVisualType: 'lead',
  },
  {
    id: 'workflow-automation',
    displayTitle: 'Workflow Automation and Integrations',
    outcome: 'Remove repetitive admin between tools.',
    cta: 'Explore automations',
    tools: ['Zapier', 'Make', 'n8n', 'Apps Script', 'APIs'],
    labels: ['Sync', 'Route', 'Notify', 'Update'],
    href: '/solutions/workflow-automation',
    size: 'lg:col-span-4',
    icon: Route,
    miniVisualType: 'automation',
  },
  {
    id: 'workspace',
    displayTitle: 'Smart Google Workspace',
    outcome: 'Make your current tools work together.',
    cta: 'Explore Workspace systems',
    tools: ['Gmail', 'Sheets', 'Drive', 'Calendar', 'Docs'],
    labels: ['Label', 'Store', 'Remind', 'Report'],
    href: '/solutions/google-workspace',
    size: 'lg:col-span-3',
    icon: Building2,
    miniVisualType: 'workspace',
  },
  {
    id: 'web-apps',
    displayTitle: 'Web Apps and Internal Tools',
    outcome: 'Build the screens your team actually needs.',
    cta: 'Explore internal tools',
    tools: ['Next.js', 'Supabase', 'Vercel', 'Auth', 'Dashboards'],
    labels: ['Admin', 'Team', 'Client', 'Report'],
    href: '/solutions/web-apps',
    size: 'lg:col-span-4',
    icon: Briefcase,
    miniVisualType: 'apps',
  },
  {
    id: 'websites',
    displayTitle: 'Websites that Convert',
    outcome: 'Turn visitors into clear next actions.',
    cta: 'Explore websites',
    tools: ['SEO', 'Forms', 'CTA', 'Speed', 'Mobile'],
    labels: ['Trust', 'CTA', 'Form', 'Follow-up'],
    href: '/solutions/websites',
    size: 'lg:col-span-3',
    icon: Globe,
    miniVisualType: 'websites',
  },
  {
    id: 'training',
    displayTitle: 'Training and Enablement',
    outcome: 'Help your team use modern tools properly.',
    cta: 'Explore training',
    tools: ['Templates', 'SOPs', 'Classes', 'Coaching', 'Handover'],
    labels: ['Learn', 'Adopt', 'Repeat', 'Improve'],
    href: '/solutions/training',
    size: 'lg:col-span-3',
    icon: GraduationCap,
    miniVisualType: 'training',
  },
  {
    id: 'support-assistant',
    displayTitle: 'Support Assistant',
    outcome: 'Answer faster and hand off cleaner.',
    cta: 'Explore support systems',
    tools: ['Chat', 'FAQ', 'Routing', 'Handoff', 'Inbox'],
    labels: ['Reply', 'Summarize', 'Route', 'Handoff'],
    href: '/contact',
    size: 'lg:col-span-2',
    icon: Bot,
    miniVisualType: 'support',
  },
];

function MiniVisual({ type }: { type: Module['miniVisualType'] }) {
  const visual = {
    lead: ['Website form', 'Pipeline', 'Owner'],
    automation: ['Tools', 'Route', 'Action'],
    workspace: ['Gmail', 'Sheets', 'Rules'],
    apps: ['Dashboard', 'Status board', 'Roles'],
    websites: ['Hero', 'CTA', 'Form'],
    training: ['Lesson', 'Checklist', 'Handover'],
    support: ['Chat', 'Summary', 'Handoff'],
  }[type];

  return (
    <div className="rounded-xl border border-cyan-300/18 bg-[linear-gradient(180deg,rgba(8,18,38,0.76),rgba(6,12,24,0.9))] p-3">
      <div className="flex items-center justify-between">
        {visual.map((item, i) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
            <span className="text-[0.63rem] text-cyan-100/90">{item}</span>
            {i < visual.length - 1 ? <Route className="h-3 w-3 text-cyan-200/60" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemModuleCard({ item, index }: { item: Module; index: number }) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px -6% 0px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-[22px] border border-[rgba(90,170,255,0.22)] bg-[linear-gradient(180deg,rgba(10,18,38,0.88),rgba(5,11,24,0.92))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(70,140,255,0.04)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_40px_rgba(0,0,0,0.35),0_0_24px_rgba(56,189,248,0.14)] ${item.size}`}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent" />
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/12">
          <Icon className="h-4.5 w-4.5 text-cyan-200" />
        </span>
        <span className="text-[0.63rem] tracking-[0.14em] text-cyan-200/82">MODULE</span>
      </div>
      <h3 className="mt-4 text-[1.15rem] font-semibold leading-tight text-white">{item.displayTitle}</h3>
      <div className="mt-4">
        <MiniVisual type={item.miniVisualType} />
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.labels.map((label) => (
          <span key={label} className="rounded-full border border-cyan-300/26 bg-cyan-500/10 px-2 py-0.5 text-[0.62rem] text-cyan-100/90">
            {label}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-300">{item.outcome}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tools.map((tool) => (
          <span key={tool} className="rounded-full border border-white/12 bg-white/[0.03] px-2 py-0.5 text-[0.62rem] text-slate-300">
            {tool}
          </span>
        ))}
      </div>
      <Link href={item.href} className="mt-4 inline-flex items-center gap-1.5 text-sm text-cyan-100 transition group-hover:text-cyan-200">
        {item.cta}
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

export function SystemModuleBentoGrid() {
  return (
    <section className="homepage-section relative overflow-hidden bg-transparent px-5 pb-24 pt-20 sm:px-7 lg:px-10 lg:pb-30 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_24%_26%,rgba(56,189,248,0.08),transparent_56%),radial-gradient(ellipse_at_76%_64%,rgba(37,99,235,0.08),transparent_58%)]" />
      <div className="relative mx-auto max-w-[1380px]">
        <motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-xs font-semibold tracking-[0.24em] text-cyan-300">
          SYSTEM MODULES
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.04 }} className="mt-3 max-w-[880px] text-[clamp(2.2rem,5vw,4.3rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">
          Pick the system layer your business needs next.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }} className="mt-4 max-w-[760px] text-[clamp(1rem,1.35vw,1.18rem)] leading-[1.6] text-slate-300">
          Each build connects to the same goal: faster response, cleaner tracking, and less manual work.
        </motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-12">
          {modules.map((item, index) => (
            <SystemModuleCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
