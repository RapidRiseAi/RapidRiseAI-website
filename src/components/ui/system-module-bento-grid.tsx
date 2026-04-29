import Link from 'next/link';
import { ArrowRight, Bot, BriefcaseBusiness, GraduationCap, LayoutDashboard, Mail, Network, Orbit } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModuleCardSize = 'lg' | 'md' | 'sm';
type MiniVisualType = 'lead' | 'automation' | 'workspace' | 'internal' | 'website' | 'training' | 'support';

type SystemModule = {
  id: string;
  title: string;
  displayTitle: string;
  outcome: string;
  cta: string;
  tools: string[];
  labels: string[];
  accent: 'cyan' | 'teal' | 'indigo' | 'violet';
  size: ModuleCardSize;
  miniVisualType: MiniVisualType;
  href: string;
  colSpan: string;
};

const modules: SystemModule[] = [
  { id: 'lead', title: 'Lead Capture Engine', displayTitle: 'Lead Capture and Follow Up', outcome: 'Turn enquiries into tracked opportunities.', cta: 'Explore lead systems.', tools: ['Website', 'Forms', 'Email', 'WhatsApp', 'Sheets'], labels: ['Captured', 'Qualified', 'Assigned', 'Reminded'], accent: 'cyan', size: 'lg', miniVisualType: 'lead', href: '/solutions/lead-capture', colSpan: 'xl:col-span-5 lg:col-span-6 md:col-span-2' },
  { id: 'automation', title: 'Workflow Automation and Integrations', displayTitle: 'Workflow Automation and Integrations', outcome: 'Remove repetitive admin between tools.', cta: 'Explore automations.', tools: ['Zapier', 'Make', 'n8n', 'Apps Script', 'APIs'], labels: ['Sync', 'Route', 'Notify', 'Update'], accent: 'cyan', size: 'lg', miniVisualType: 'automation', href: '/solutions/workflow-automation', colSpan: 'xl:col-span-4 lg:col-span-6 md:col-span-2' },
  { id: 'workspace', title: 'Smart Google Workspace', displayTitle: 'Smart Google Workspace', outcome: 'Make your current tools work together.', cta: 'Explore Workspace systems.', tools: ['Gmail', 'Sheets', 'Drive', 'Calendar', 'Docs'], labels: ['Label', 'Store', 'Remind', 'Report'], accent: 'teal', size: 'md', miniVisualType: 'workspace', href: '/solutions/google-workspace', colSpan: 'xl:col-span-3 lg:col-span-6 md:col-span-1' },
  { id: 'internal', title: 'Web Apps and Internal Tools', displayTitle: 'Web Apps and Internal Tools', outcome: 'Build the screens your team actually needs.', cta: 'Explore internal tools.', tools: ['Next.js', 'Supabase', 'Vercel', 'Auth', 'Dashboards'], labels: ['Admin', 'Team', 'Client', 'Report'], accent: 'cyan', size: 'md', miniVisualType: 'internal', href: '/solutions/web-apps', colSpan: 'xl:col-span-4 lg:col-span-6 md:col-span-1' },
  { id: 'websites', title: 'Websites that Convert', displayTitle: 'Websites that Convert', outcome: 'Turn visitors into clear next actions.', cta: 'Explore websites.', tools: ['SEO', 'Forms', 'CTA', 'Speed', 'Mobile'], labels: ['Trust', 'CTA', 'Form', 'Follow-up'], accent: 'indigo', size: 'md', miniVisualType: 'website', href: '/solutions/websites', colSpan: 'xl:col-span-3 lg:col-span-6 md:col-span-1' },
  { id: 'training', title: 'Training and Enablement', displayTitle: 'Training and Enablement', outcome: 'Help your team use modern tools properly.', cta: 'Explore training.', tools: ['Templates', 'SOPs', 'Classes', 'Coaching', 'Handover'], labels: ['Learn', 'Adopt', 'Repeat', 'Improve'], accent: 'violet', size: 'sm', miniVisualType: 'training', href: '/solutions/training', colSpan: 'xl:col-span-3 lg:col-span-4 md:col-span-1' },
  { id: 'support', title: 'Support Assistant', displayTitle: 'Support Assistant', outcome: 'Answer faster and hand off cleaner.', cta: 'Explore support systems.', tools: ['Chat', 'FAQ', 'Routing', 'Handoff', 'Inbox'], labels: ['Reply', 'Summarize', 'Route', 'Handoff'], accent: 'violet', size: 'sm', miniVisualType: 'support', href: '/solutions/workflow-automation#support-assistant', colSpan: 'xl:col-span-2 lg:col-span-4 md:col-span-1' },
];

const icons = {
  lead: Orbit,
  automation: Network,
  workspace: Mail,
  internal: LayoutDashboard,
  website: BriefcaseBusiness,
  training: GraduationCap,
  support: Bot,
};

function MiniVisual({ type }: { type: MiniVisualType }) {
  return <div aria-hidden className={cn('module-visual', `module-visual-${type}`)} />;
}

function SystemModuleCard({ module, index }: { module: SystemModule; index: number }) {
  const Icon = icons[module.miniVisualType];
  return (
    <Link
      href={module.href}
      className={cn('module-card group', `module-accent-${module.accent}`, module.colSpan, module.size === 'lg' && 'module-lg')}
      style={{ animationDelay: `${index * 85}ms` }}
      aria-label={`${module.displayTitle}. ${module.outcome}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 p-1.5"><Icon className="h-4 w-4 text-sky-300" /></span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-sky-200/80">System module</span>
        </div>
      </div>
      <h3 className="mt-3 font-[var(--font-jakarta)] text-xl font-semibold leading-tight text-text0 md:text-2xl">{module.title}</h3>
      <MiniVisual type={module.miniVisualType} />
      <div className="mt-4 flex flex-wrap gap-2">
        {module.labels.map((label) => <span key={label} className="module-pill">{label}</span>)}
      </div>
      <p className="mt-3 text-sm text-text1 md:text-[15px]">{module.outcome}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {module.tools.map((tool) => <span key={tool} className="module-tool">{tool}</span>)}
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sky-200">
        {module.cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      </div>
    </Link>
  );
}

export function SystemModuleBentoGrid() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300/90">System Modules</p>
        <h2 className="mt-3 max-w-3xl font-[var(--font-jakarta)] text-3xl font-semibold leading-[1.06] text-text0 sm:text-4xl lg:text-5xl">Pick the system layer your business needs next.</h2>
        <p className="mt-4 max-w-2xl text-base text-text1 sm:text-lg">Each build connects to the same goal: faster response, cleaner tracking, and less manual work.</p>
        <div className="module-grid-glow mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-12">
          {modules.map((module, index) => <SystemModuleCard key={module.id} module={module} index={index} />)}
        </div>
      </div>
    </section>
  );
}
