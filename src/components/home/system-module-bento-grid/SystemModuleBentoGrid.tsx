'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BellRing,
  Bot,
  CalendarDays,
  Check,
  FileText,
  FolderOpen,
  FormInput,
  Globe2,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MessageSquare,
  MonitorSmartphone,
  MousePointerClick,
  PlugZap,
  Route,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

type ModuleVisual = 'lead-flow' | 'automation' | 'workspace' | 'apps' | 'websites' | 'training' | 'support';

type SystemModule = {
  id: string;
  title: string;
  category: string;
  outcome: string;
  labels: string[];
  tools: string[];
  cta: string;
  href: string;
  visual: ModuleVisual;
  icon: LucideIcon;
  span: string;
  featured?: boolean;
};

const systemModules: SystemModule[] = [
  {
    id: 'lead-capture',
    title: 'Lead Capture Engine',
    category: 'Lead Capture and Follow Up',
    outcome: 'Turn enquiries into tracked opportunities.',
    labels: ['Captured', 'Qualified', 'Assigned', 'Reminded'],
    tools: ['Website', 'Forms', 'Email', 'WhatsApp', 'Sheets'],
    cta: 'Explore lead systems',
    href: '/solutions/lead-capture',
    visual: 'lead-flow',
    icon: Mail,
    span: 'lg:col-span-6 min-h-[420px]',
    featured: true,
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation and Integrations',
    category: 'Workflow Automation and Integrations',
    outcome: 'Remove repetitive admin between tools.',
    labels: ['Sync', 'Route', 'Notify', 'Update'],
    tools: ['Zapier', 'Make', 'n8n', 'Apps Script', 'APIs'],
    cta: 'Explore automations',
    href: '/solutions/workflow-automation',
    visual: 'automation',
    icon: PlugZap,
    span: 'lg:col-span-6 min-h-[420px]',
    featured: true,
  },
  {
    id: 'workspace',
    title: 'Smart Google Workspace',
    category: 'Workspace Systems',
    outcome: 'Make your current tools work together.',
    labels: ['Label', 'Store', 'Remind', 'Report'],
    tools: ['Gmail', 'Sheets', 'Drive', 'Calendar', 'Docs'],
    cta: 'Explore Workspace systems',
    href: '/solutions/google-workspace',
    visual: 'workspace',
    icon: FolderOpen,
    span: 'lg:col-span-4 min-h-[340px]',
  },
  {
    id: 'web-apps',
    title: 'Web Apps and Internal Tools',
    category: 'Custom Internal Tools',
    outcome: 'Build the screens your team actually needs.',
    labels: ['Admin', 'Team', 'Client', 'Report'],
    tools: ['Next.js', 'Supabase', 'Vercel', 'Auth', 'Dashboards'],
    cta: 'Explore internal tools',
    href: '/solutions/web-apps',
    visual: 'apps',
    icon: LayoutDashboard,
    span: 'lg:col-span-4 min-h-[340px]',
  },
  {
    id: 'websites',
    title: 'Websites that Convert',
    category: 'Conversion Websites',
    outcome: 'Turn visitors into clear next actions.',
    labels: ['Trust', 'CTA', 'Form', 'Follow-up'],
    tools: ['SEO', 'Forms', 'CTA', 'Speed', 'Mobile'],
    cta: 'Explore websites',
    href: '/solutions/websites',
    visual: 'websites',
    icon: Globe2,
    span: 'lg:col-span-4 min-h-[340px]',
  },
  {
    id: 'training',
    title: 'Training and Enablement',
    category: 'Operational Enablement',
    outcome: 'Help your team use modern tools properly.',
    labels: ['Learn', 'Adopt', 'Repeat', 'Improve'],
    tools: ['Templates', 'SOPs', 'Classes', 'Coaching', 'Handover'],
    cta: 'Explore training',
    href: '/education',
    visual: 'training',
    icon: GraduationCap,
    span: 'lg:col-span-6 min-h-[320px]',
  },
  {
    id: 'support-assistant',
    title: 'Support Assistant',
    category: 'Assistant Layer',
    outcome: 'Answer faster and hand off cleaner.',
    labels: ['Answer', 'Summarize', 'Handoff', 'Track'],
    tools: ['Chatbot', 'Knowledge Base', 'Inbox', 'Handoff', 'Reports'],
    cta: 'Explore assistants',
    href: '/contact',
    visual: 'support',
    icon: Bot,
    span: 'lg:col-span-6 min-h-[320px]',
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

function ModuleStatusPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.09em] text-cyan-100/95 transition group-hover:border-cyan-200/46 group-hover:text-cyan-50">
      {label}
    </span>
  );
}

function ToolPill({ tool }: { tool: string }) {
  return (
    <span className="rounded-full border border-cyan-200/14 bg-slate-950/46 px-2.5 py-1 text-[0.68rem] text-slate-300 transition group-hover:border-cyan-200/26 group-hover:text-slate-100">
      {tool}
    </span>
  );
}

function ModuleCTA({ href, children, title }: { href: string; children: string; title: string }) {
  return (
    <Link
      href={href}
      aria-label={`${children}: ${title}`}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/8 px-4 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </Link>
  );
}

function MiniFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-cyan-300/16 bg-[linear-gradient(180deg,rgba(5,17,34,0.82),rgba(3,9,20,0.92))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(125,220,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(125,220,255,0.8)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function RouteSvg({ active, reduceMotion, variant = 'straight' }: { active: boolean; reduceMotion: boolean; variant?: 'straight' | 'arc' | 'split' }) {
  const path = variant === 'arc'
    ? 'M18 82 C78 20, 142 20, 202 82'
    : variant === 'split'
      ? 'M18 76 C76 36, 112 36, 160 58 C184 70, 198 78, 220 58'
      : 'M18 58 C72 58, 120 58, 220 58';

  return (
    <svg viewBox="0 0 238 112" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <path d={path} fill="none" stroke="rgba(56,223,255,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(56,223,255,0.74)"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0.88, opacity: 0.72 }}
        transition={{ duration: reduceMotion ? 0 : 0.75, ease: transitionEase }}
      />
      {!reduceMotion ? (
        <circle r="3" fill="rgba(190,245,255,0.95)" className={active ? 'module-route-particle-active' : 'module-route-particle'}>
          <animateMotion dur={active ? '2.1s' : '6.6s'} repeatCount="indefinite" path={path} />
        </circle>
      ) : null}
    </svg>
  );
}

function LeadFlowVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <MiniFrame className="min-h-[170px] lg:min-h-[190px]">
      <RouteSvg active={active} reduceMotion={reduceMotion} />
      <div className="grid min-h-[142px] grid-cols-[1fr_0.9fr_1fr] items-center gap-3">
        <div className="rounded-xl border border-cyan-200/14 bg-slate-950/62 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[0.64rem] text-cyan-100"><FormInput className="h-3.5 w-3.5" /> Website form</div>
          <div className="space-y-1.5">
            <span className="block h-2 rounded-full bg-slate-700/70" />
            <span className="block h-2 w-4/5 rounded-full bg-slate-700/70" />
            <motion.span animate={active ? { opacity: 1, scaleX: 1 } : { opacity: 0.65, scaleX: 0.72 }} className="block h-3 origin-left rounded-full bg-cyan-300/26" />
          </div>
        </div>
        <div className="space-y-2">
          {['New', 'Qualified', 'Follow-up'].map((stage, index) => (
            <motion.div key={stage} animate={active ? { borderColor: index === 1 ? 'rgba(56,223,255,0.55)' : 'rgba(80,210,255,0.20)' } : {}} className="rounded-lg border border-cyan-300/16 bg-cyan-400/7 px-2 py-1.5 text-[0.62rem] text-cyan-100">
              {stage}
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-cyan-200/18 bg-slate-950/62 p-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/24 bg-cyan-400/10"><UserCheck className="h-4 w-4 text-cyan-100" /></span>
            <div>
              <p className="text-[0.68rem] font-semibold text-white">Owner</p>
              <p className="text-[0.58rem] text-slate-400">Assigned</p>
            </div>
          </div>
          <motion.div animate={active ? { opacity: [0.65, 1, 0.8] } : { opacity: 0.75 }} transition={{ duration: 0.8 }} className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/24 bg-cyan-400/10 px-2 py-1 text-[0.58rem] text-cyan-100"><BellRing className="h-3 w-3" /> Reminder set</motion.div>
        </div>
      </div>
    </MiniFrame>
  );
}

function AutomationVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const nodes = [
    { label: 'Zapier', x: '11%', y: '20%' },
    { label: 'Make', x: '13%', y: '66%' },
    { label: 'n8n', x: '75%', y: '18%' },
    { label: 'API', x: '76%', y: '66%' },
  ];
  return (
    <MiniFrame className="min-h-[170px] lg:min-h-[190px]">
      <svg viewBox="0 0 360 170" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {['M76 44 C132 54, 160 70, 180 84', 'M82 120 C130 104, 156 94, 180 84', 'M278 44 C238 56, 210 70, 180 84', 'M280 120 C236 106, 210 94, 180 84'].map((d, index) => (
          <motion.path key={d} d={d} fill="none" stroke="rgba(56,223,255,0.58)" strokeWidth="1.8" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }} animate={active ? { pathLength: 1, opacity: 0.88 } : { pathLength: 0.82, opacity: 0.42 }} transition={{ duration: reduceMotion ? 0 : 0.65, delay: index * 0.04 }} />
        ))}
      </svg>
      <div className="relative min-h-[142px]">
        {nodes.map((node) => (
          <div key={node.label} style={{ left: node.x, top: node.y }} className="absolute rounded-xl border border-cyan-300/16 bg-slate-950/68 px-3 py-2 text-[0.64rem] text-slate-200">
            {node.label}
          </div>
        ))}
        <motion.div animate={active ? { scale: 1.04 } : { scale: 1 }} className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-200/34 bg-[radial-gradient(circle,rgba(56,223,255,0.18),rgba(5,20,42,0.92))] text-center shadow-[0_0_28px_rgba(56,223,255,0.10)]">
          <Workflow className="h-5 w-5 text-cyan-100" />
          <span className="mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-cyan-100">Rules</span>
        </motion.div>
        <motion.div animate={active ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 4 }} className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-cyan-300/28 bg-cyan-400/10 px-3 py-1 text-[0.62rem] text-cyan-100">Action sent</motion.div>
      </div>
    </MiniFrame>
  );
}

function WorkspaceVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const nodes = [
    { label: 'Gmail', icon: Mail },
    { label: 'Sheets', icon: FileText },
    { label: 'Drive', icon: FolderOpen },
    { label: 'Calendar', icon: CalendarDays },
  ];
  return (
    <MiniFrame className="min-h-[150px]">
      <div className="grid grid-cols-2 gap-2">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div key={node.label} animate={active ? { borderColor: index === 0 ? 'rgba(56,223,255,0.55)' : 'rgba(80,210,255,0.22)' } : {}} className="flex items-center gap-2 rounded-xl border border-cyan-300/14 bg-slate-950/58 px-2.5 py-2 text-[0.64rem] text-slate-200">
              <Icon className="h-3.5 w-3.5 text-cyan-200" /> {node.label}
            </motion.div>
          );
        })}
      </div>
      <div className="relative mt-3 rounded-xl border border-cyan-300/22 bg-cyan-400/8 px-3 py-2 text-center text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-cyan-100">
        Rules Engine
        {!reduceMotion ? <span className="module-pulse-line absolute inset-x-4 bottom-0 h-px bg-cyan-200/60" /> : null}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {['Label', 'Store', 'Remind', 'Report'].map((item, index) => (
          <motion.span key={item} animate={active ? { opacity: 1, y: 0 } : { opacity: 0.72, y: 0 }} transition={{ delay: index * 0.04 }} className="rounded-full border border-cyan-300/18 bg-cyan-400/8 px-1.5 py-1 text-center text-[0.55rem] text-cyan-100">{item}</motion.span>
        ))}
      </div>
    </MiniFrame>
  );
}

function AppsVisual({ active }: { active: boolean; reduceMotion: boolean }) {
  return (
    <MiniFrame className="min-h-[150px]">
      <div className="grid grid-cols-[0.34fr_1fr] gap-3">
        <div className="space-y-2">
          {['Admin', 'Team', 'Client'].map((role, index) => (
            <motion.div key={role} animate={active ? { opacity: index === 1 ? 1 : 0.78 } : { opacity: 0.72 }} className="rounded-lg border border-cyan-300/14 bg-slate-950/58 px-2 py-1.5 text-[0.58rem] text-cyan-100">{role}</motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-cyan-300/16 bg-slate-950/58 p-2">
          <div className="mb-2 flex items-center justify-between"><span className="text-[0.58rem] text-slate-400">Status board</span><ShieldCheck className="h-3.5 w-3.5 text-cyan-200" /></div>
          <div className="grid grid-cols-3 gap-1.5">
            {['New', 'Active', 'Done'].map((stage, index) => (
              <div key={stage} className="space-y-1 rounded-lg bg-white/[0.025] p-1.5">
                <p className="text-[0.5rem] text-slate-500">{stage}</p>
                <motion.div animate={active && index === 1 ? { y: [-1, 0], opacity: 1 } : { opacity: 0.72 }} className="h-8 rounded-md border border-cyan-300/14 bg-cyan-400/8" />
              </div>
            ))}
          </div>
          <motion.div animate={active ? { opacity: 1, width: '84%' } : { opacity: 0.76, width: '62%' }} className="mt-2 h-2 rounded-full bg-gradient-to-r from-[#1d7dff] to-[#38dfff]" />
        </div>
      </div>
    </MiniFrame>
  );
}

function WebsitesVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <MiniFrame className="min-h-[150px]">
      <RouteSvg active={active} reduceMotion={reduceMotion} variant="arc" />
      <div className="grid grid-cols-[1fr_0.44fr] gap-3">
        <div className="rounded-xl border border-cyan-300/16 bg-slate-950/62 p-3">
          <div className="mb-2 h-2 w-16 rounded-full bg-cyan-300/24" />
          <div className="space-y-1.5">
            <span className="block h-2 rounded-full bg-slate-700/70" />
            <span className="block h-2 w-3/4 rounded-full bg-slate-700/70" />
          </div>
          <motion.div animate={active ? { boxShadow: '0 0 20px rgba(56,223,255,0.22)' } : {}} className="mt-3 inline-flex rounded-full border border-cyan-300/34 bg-cyan-400/12 px-3 py-1 text-[0.58rem] text-cyan-100">CTA</motion.div>
        </div>
        <motion.div animate={active ? { x: 0, opacity: 1 } : { x: 4, opacity: 0.76 }} className="rounded-xl border border-cyan-300/14 bg-slate-950/62 p-2">
          <MonitorSmartphone className="mb-2 h-4 w-4 text-cyan-200" />
          <div className="space-y-1"><span className="block h-1.5 rounded-full bg-slate-700" /><span className="block h-1.5 w-4/5 rounded-full bg-slate-700" /><span className="block h-4 rounded bg-cyan-400/10" /></div>
        </motion.div>
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/22 bg-cyan-400/8 px-2.5 py-1 text-[0.58rem] text-cyan-100"><MousePointerClick className="h-3 w-3" /> Lead captured</div>
    </MiniFrame>
  );
}

function TrainingVisual({ active }: { active: boolean; reduceMotion: boolean }) {
  return (
    <MiniFrame className="min-h-[140px]">
      <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
        <div className="relative min-h-[92px]">
          {[0, 1, 2].map((item) => (
            <motion.div key={item} animate={active ? { x: item * 8, y: item * 8 } : { x: item * 5, y: item * 7 }} className="absolute left-0 top-0 h-20 w-28 rounded-xl border border-cyan-300/14 bg-slate-950/72 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.22)]">
              <GraduationCap className="mb-2 h-4 w-4 text-cyan-200" />
              <span className="block h-1.5 rounded-full bg-slate-700" />
              <span className="mt-1 block h-1.5 w-4/5 rounded-full bg-slate-700" />
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-cyan-300/14 bg-slate-950/62 p-3">
          {['SOP saved', 'Checklist done', 'Handover ready'].map((row, index) => (
            <motion.div key={row} animate={active ? { opacity: 1 } : { opacity: 0.72 }} transition={{ delay: index * 0.04 }} className="mb-2 flex items-center gap-2 text-[0.62rem] text-slate-200 last:mb-0">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-cyan-300/28 bg-cyan-400/10"><Check className="h-2.5 w-2.5 text-cyan-100" /></span>{row}
            </motion.div>
          ))}
          <div className="mt-3 h-2 rounded-full bg-slate-800"><motion.div animate={active ? { width: '92%' } : { width: '58%' }} className="h-full rounded-full bg-gradient-to-r from-[#1d7dff] to-[#38dfff]" /></div>
        </div>
      </div>
    </MiniFrame>
  );
}

function SupportVisual({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  return (
    <MiniFrame className="min-h-[140px]">
      <RouteSvg active={active} reduceMotion={reduceMotion} variant="split" />
      <div className="grid grid-cols-3 items-center gap-3">
        <motion.div animate={active ? { opacity: 1, y: 0 } : { opacity: 0.78, y: 2 }} className="rounded-xl border border-cyan-300/14 bg-slate-950/62 p-3">
          <MessageSquare className="mb-2 h-4 w-4 text-cyan-200" />
          <p className="text-[0.62rem] text-white">Customer asks</p>
        </motion.div>
        <motion.div animate={active ? { opacity: 1 } : { opacity: 0.78 }} className="rounded-xl border border-cyan-300/20 bg-cyan-400/8 p-3">
          <Sparkles className="mb-2 h-4 w-4 text-cyan-100" />
          <p className="text-[0.62rem] text-cyan-100">Summary</p>
        </motion.div>
        <motion.div animate={active ? { opacity: 1, y: 0 } : { opacity: 0.78, y: 2 }} className="rounded-xl border border-cyan-300/14 bg-slate-950/62 p-3">
          <UserCheck className="mb-2 h-4 w-4 text-cyan-200" />
          <p className="text-[0.62rem] text-white">Team handoff</p>
        </motion.div>
      </div>
      <div className="mt-3 inline-flex rounded-full border border-cyan-300/22 bg-cyan-400/8 px-2.5 py-1 text-[0.58rem] text-cyan-100">Knowledge base connected</div>
    </MiniFrame>
  );
}

function ModuleMiniVisual({ type, active, reduceMotion }: { type: ModuleVisual; active: boolean; reduceMotion: boolean }) {
  switch (type) {
    case 'lead-flow':
      return <LeadFlowVisual active={active} reduceMotion={reduceMotion} />;
    case 'automation':
      return <AutomationVisual active={active} reduceMotion={reduceMotion} />;
    case 'workspace':
      return <WorkspaceVisual active={active} reduceMotion={reduceMotion} />;
    case 'apps':
      return <AppsVisual active={active} reduceMotion={reduceMotion} />;
    case 'websites':
      return <WebsitesVisual active={active} reduceMotion={reduceMotion} />;
    case 'training':
      return <TrainingVisual active={active} reduceMotion={reduceMotion} />;
    case 'support':
      return <SupportVisual active={active} reduceMotion={reduceMotion} />;
    default:
      return null;
  }
}

function SystemModuleCard({ module, index, active, onActive }: { module: SystemModule; index: number; active: boolean; onActive: (id: string | null) => void }) {
  const Icon = module.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.55, delay: (module.featured ? 0.05 : 0.18) + index * 0.055, ease: transitionEase }}
      onMouseEnter={() => onActive(module.id)}
      onMouseLeave={() => onActive(null)}
      onFocus={() => onActive(module.id)}
      onBlur={() => onActive(null)}
      className={`group relative flex overflow-hidden rounded-[28px] border border-[rgba(80,210,255,0.20)] bg-[linear-gradient(180deg,rgba(6,18,34,0.92),rgba(2,8,18,0.96))] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition duration-300 focus-within:-translate-y-1 focus-within:border-cyan-200/55 focus-within:shadow-[0_28px_70px_rgba(0,0,0,0.42),0_0_34px_rgba(56,223,255,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-1.5 hover:border-cyan-200/55 hover:shadow-[0_28px_70px_rgba(0,0,0,0.42),0_0_34px_rgba(56,223,255,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-6 ${module.span}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_0%,rgba(56,223,255,0.10),transparent_32%),radial-gradient(circle_at_80%_90%,rgba(14,165,255,0.08),transparent_34%)] opacity-80 transition group-hover:opacity-100" />
      <div className="module-top-sweep pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/56 to-transparent opacity-50 transition group-hover:opacity-100" />
      <div className="relative z-10 flex w-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/28 bg-cyan-400/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-cyan-200/52 group-hover:bg-cyan-300/14">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cyan-200/82">{module.category}</p>
              <h3 className="mt-1 text-[1.25rem] font-semibold leading-tight text-[#f8fafc] md:text-[1.38rem]">{module.title}</h3>
            </div>
          </div>
          <span className="hidden rounded-full border border-cyan-300/22 bg-cyan-400/8 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-cyan-100/80 sm:inline-flex">Module</span>
        </div>

        <div className="mt-5">
          <ModuleMiniVisual type={module.visual} active={active} reduceMotion={Boolean(reduceMotion)} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {module.labels.map((label) => <ModuleStatusPill key={label} label={label} />)}
        </div>

        <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-300">{module.outcome}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {module.tools.map((tool) => <ToolPill key={tool} tool={tool} />)}
        </div>

        <div className="mt-auto pt-5">
          <ModuleCTA href={module.href} title={module.title}>{module.cta}</ModuleCTA>
        </div>
      </div>
    </motion.article>
  );
}

export function SystemModuleBentoGrid() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="system-modules-section homepage-section relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32" aria-labelledby="system-modules-title">
      <div className="pointer-events-none absolute inset-0 border-t border-cyan-200/[0.07] bg-[radial-gradient(circle_at_50%_24%,rgba(0,145,255,0.12),transparent_34%),radial-gradient(circle_at_76%_58%,rgba(0,220,255,0.05),transparent_30%),radial-gradient(circle_at_18%_72%,rgba(29,125,255,0.07),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.052] [background-image:linear-gradient(rgba(125,190,255,0.72)_1px,transparent_1px),linear-gradient(90deg,rgba(125,190,255,0.72)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px -8% 0px' }} transition={{ duration: 0.55, ease: transitionEase }} className="max-w-[900px]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">WHAT WE BUILD</p>
          <h2 id="system-modules-title" className="mt-4 text-[clamp(2.15rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">Pick the system layer your business needs next.</h2>
          <p className="mt-5 max-w-[820px] text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.58] text-slate-300">Each build connects to the same goal: faster response, cleaner tracking, and less manual work.</p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.58, delay: 0.18, ease: transitionEase }}
          className="relative mt-12 overflow-hidden rounded-[34px] border border-cyan-300/14 bg-[rgba(3,10,24,0.34)] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.22),inset_0_0_80px_rgba(0,160,255,0.025)] backdrop-blur-sm sm:p-4"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(56,223,255,0.08),transparent_32%)]" />
          <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-12">
            {systemModules.map((module, index) => (
              <SystemModuleCard key={module.id} module={module} index={index} active={activeId === module.id} onActive={setActiveId} />
            ))}
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.48, delay: 0.4 }} className="mt-6 flex flex-col gap-4 rounded-3xl border border-cyan-200/14 bg-slate-950/44 p-5 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <p className="max-w-[760px] text-sm leading-relaxed text-slate-300">Not sure which layer you need first? Start with the manual work costing you the most time.</p>
          <Link href="/quote" className="group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full border border-cyan-300/44 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/16 hover:shadow-[0_0_24px_rgba(0,210,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70">
            Request a system recommendation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .module-route-particle,
          .module-route-particle-active,
          .module-pulse-line,
          .module-top-sweep {
            animation: none !important;
          }
        }
        .module-route-particle,
        .module-route-particle-active {
          filter: drop-shadow(0 0 8px rgba(56, 223, 255, 0.8));
          opacity: 0.82;
        }
        .module-pulse-line {
          animation: modulePulseLine 5.8s ease-in-out infinite;
        }
        .module-top-sweep {
          animation: moduleTopSweep 6.8s ease-in-out infinite;
        }
        @keyframes modulePulseLine {
          0%, 100% { opacity: 0.25; transform: scaleX(0.28); }
          50% { opacity: 0.85; transform: scaleX(1); }
        }
        @keyframes moduleTopSweep {
          0%, 100% { transform: translateX(-20%); opacity: 0.35; }
          50% { transform: translateX(20%); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
