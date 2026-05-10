'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Inbox,
  LifeBuoy,
  Minus,
  MonitorCheck,
  PlugZap,
  Plus,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ProductCategory = 'Fast Wins' | 'Operational Control' | 'Client Experience' | 'Support and Scale';
type VisualType =
  | 'lead-follow-up'
  | 'inbox-routing'
  | 'dashboard'
  | 'quote-generator'
  | 'client-portal'
  | 'support-assistant';
type ComparisonState = 'included' | 'optional' | 'none';

type Product = {
  id: string;
  category: Exclude<ProductCategory, 'Support and Scale'>;
  typeLabel: string;
  name: string;
  shortName: string;
  price: string;
  timeline: string;
  bestFor: string;
  includes: string[];
  notIncluded: string[];
  visual: VisualType;
  cta: string;
};

type AddOn = {
  name: string;
  price: string;
  useFor: string;
  visual: 'plug' | 'rule' | 'training' | 'priority';
};

type SupportPlan = {
  id: string;
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
  cta: string;
  recommended?: boolean;
};

type ComparisonRow = {
  capability: string;
  states: Record<Product['id'], ComparisonState>;
};

const categories: { name: ProductCategory; description: string }[] = [
  { name: 'Fast Wins', description: 'Small systems that fix one painful bottleneck quickly.' },
  { name: 'Operational Control', description: 'Dashboards, quote flows, and structured tracking for messy operations.' },
  { name: 'Client Experience', description: 'Portals and customer-facing systems that improve visibility and trust.' },
  { name: 'Support and Scale', description: 'Ongoing support for systems that need monitoring, improvements, and expansion.' },
];

const products: Product[] = [
  {
    id: 'lead-follow-up',
    category: 'Fast Wins',
    typeLabel: 'Fast win automation',
    name: 'Lead Follow-Up System',
    shortName: 'Lead Follow-Up',
    price: 'R3,500',
    timeline: '5 to 7 business days',
    bestFor: 'Businesses that receive enquiries but lose leads because replies or follow-ups are delayed.',
    includes: [
      'Lead capture point or intake flow',
      'Auto-confirmation message',
      'Owner assignment',
      'Follow-up reminder',
      'Basic lead status tracking',
      'Simple report or summary view',
    ],
    notIncluded: ['Full CRM replacement', 'Complex multi-team routing', 'Advanced custom dashboard'],
    visual: 'lead-follow-up',
    cta: 'Select this product',
  },
  {
    id: 'inbox-routing',
    category: 'Fast Wins',
    typeLabel: 'Inbox control system',
    name: 'Inbox Routing and Triage',
    shortName: 'Inbox Routing',
    price: 'R2,000',
    timeline: '3 to 5 business days',
    bestFor: 'Teams with emails or requests that need sorting, labelling, and clear next actions.',
    includes: ['Inbox label or category logic', 'Priority routing', 'Owner or action assignment', 'Basic triage rules', 'Optional summary view'],
    notIncluded: ['Full helpdesk platform', 'Complex AI classification across many departments', 'Large historical email migration'],
    visual: 'inbox-routing',
    cta: 'Select this product',
  },
  {
    id: 'dashboard',
    category: 'Operational Control',
    typeLabel: 'Visibility system',
    name: 'Custom Dashboard Starter',
    shortName: 'Dashboard',
    price: 'R6,000',
    timeline: '10 to 14 business days',
    bestFor: 'Businesses that need visibility over work, status, numbers, or team activity.',
    includes: ['Data source connection', 'Core dashboard layout', 'Key metrics', 'Status cards', 'Basic filters', 'Mobile-friendly view where needed'],
    notIncluded: ['Full internal app', 'Complex role-based permissions', 'Large-scale analytics warehouse'],
    visual: 'dashboard',
    cta: 'Select this product',
  },
  {
    id: 'quote-generator',
    category: 'Operational Control',
    typeLabel: 'Document workflow',
    name: 'Quote and Document Generator',
    shortName: 'Quote Generator',
    price: 'R8,000',
    timeline: '7 to 10 business days',
    bestFor: 'Businesses that create quotes, proposals, forms, or repeatable documents manually.',
    includes: ['Structured intake form', 'Quote/document template', 'Auto-filled details', 'Approval or review step', 'Saved document output', 'Basic tracking'],
    notIncluded: ['Complex accounting platform replacement', 'Legal document review', 'Full custom ERP workflow'],
    visual: 'quote-generator',
    cta: 'Select this product',
  },
  {
    id: 'client-portal',
    category: 'Client Experience',
    typeLabel: 'Client visibility system',
    name: 'Client Portal Starter',
    shortName: 'Client Portal',
    price: 'R15,000',
    timeline: '2 to 3 weeks',
    bestFor: 'Businesses that need clients to view status, submit requests, approve items, or access information.',
    includes: ['Client login or access flow', 'Client dashboard', 'Request or status view', 'Basic notifications', 'Admin-side management area', 'Mobile-friendly portal screens'],
    notIncluded: ['Large multi-tenant enterprise platform', 'Advanced billing system', 'Complex custom permission structures beyond starter scope'],
    visual: 'client-portal',
    cta: 'Select this product',
  },
  {
    id: 'support-assistant',
    category: 'Fast Wins',
    typeLabel: 'Support handoff system',
    name: 'Support Assistant Starter',
    shortName: 'Support Assistant',
    price: 'R4,000',
    timeline: '2 weeks',
    bestFor: 'Businesses that answer repeated questions or need cleaner support handoff.',
    includes: ['Support assistant setup', 'Knowledge base or FAQ structure', 'Intake/capture flow', 'Handoff message or summary', 'Basic reporting or log view', 'Website or channel embed where suitable'],
    notIncluded: ['Fully autonomous support department', 'Large multilingual knowledge base buildout', 'Complex CRM/helpdesk integration unless scoped separately'],
    visual: 'support-assistant',
    cta: 'Select this product',
  },
];

const addOns: AddOn[] = [
  { name: 'Extra integration connection', price: 'R700 each', useFor: 'Connecting another tool, sheet, form, inbox, or system.', visual: 'plug' },
  { name: 'Extra workflow step or approval rule', price: 'R500 each', useFor: 'Adding another decision, approval, routing rule, or status step.', visual: 'rule' },
  { name: 'Team training session', price: 'R1,500 for 60 minutes', useFor: 'Teaching your team how to use the system properly.', visual: 'training' },
  { name: 'Priority delivery', price: 'From R2,000', useFor: 'When a build needs to be prioritized faster than normal capacity.', visual: 'priority' },
];

const supportPlans: SupportPlan[] = [
  {
    id: 'essential-support',
    name: 'Essential Support',
    price: 'R2,000 per month',
    bestFor: 'Small systems that need basic monitoring, fixes, and light support.',
    includes: ['Basic monitoring', 'Minor fixes', 'Support requests', 'Small reporting checks'],
    cta: 'Choose Essential',
  },
  {
    id: 'growth-support',
    name: 'Growth Support',
    price: 'R4,000 per month',
    bestFor: 'Growing systems that need improvements, workflow changes, and reporting updates.',
    includes: ['Ongoing improvements', 'Workflow adjustments', 'Reporting updates', 'Priority support over Essential'],
    cta: 'Choose Growth',
    recommended: true,
  },
  {
    id: 'ops-partner',
    name: 'Ops Partner',
    price: 'From R12,500 per month',
    bestFor: 'Businesses that want Rapid Rise AI involved as an ongoing systems partner.',
    includes: ['Strategic system improvements', 'New workflow planning', 'Reporting and optimization', 'Deeper support and advisory'],
    cta: 'Talk to us',
  },
];

const comparisonRows: ComparisonRow[] = [
  { capability: 'Lead capture', states: { 'lead-follow-up': 'included', 'inbox-routing': 'optional', dashboard: 'optional', 'quote-generator': 'optional', 'client-portal': 'optional', 'support-assistant': 'optional' } },
  { capability: 'Auto-confirmation', states: { 'lead-follow-up': 'included', 'inbox-routing': 'optional', dashboard: 'none', 'quote-generator': 'optional', 'client-portal': 'optional', 'support-assistant': 'included' } },
  { capability: 'Owner assignment', states: { 'lead-follow-up': 'included', 'inbox-routing': 'included', dashboard: 'optional', 'quote-generator': 'optional', 'client-portal': 'optional', 'support-assistant': 'included' } },
  { capability: 'Status tracking', states: { 'lead-follow-up': 'included', 'inbox-routing': 'optional', dashboard: 'included', 'quote-generator': 'included', 'client-portal': 'included', 'support-assistant': 'optional' } },
  { capability: 'Dashboard', states: { 'lead-follow-up': 'optional', 'inbox-routing': 'optional', dashboard: 'included', 'quote-generator': 'optional', 'client-portal': 'included', 'support-assistant': 'optional' } },
  { capability: 'Quote generation', states: { 'lead-follow-up': 'none', 'inbox-routing': 'none', dashboard: 'none', 'quote-generator': 'included', 'client-portal': 'optional', 'support-assistant': 'none' } },
  { capability: 'File storage', states: { 'lead-follow-up': 'none', 'inbox-routing': 'none', dashboard: 'none', 'quote-generator': 'included', 'client-portal': 'optional', 'support-assistant': 'optional' } },
  { capability: 'Client access', states: { 'lead-follow-up': 'none', 'inbox-routing': 'none', dashboard: 'none', 'quote-generator': 'optional', 'client-portal': 'included', 'support-assistant': 'optional' } },
  { capability: 'Smart handoff', states: { 'lead-follow-up': 'optional', 'inbox-routing': 'included', dashboard: 'none', 'quote-generator': 'optional', 'client-portal': 'optional', 'support-assistant': 'included' } },
  { capability: 'Reporting', states: { 'lead-follow-up': 'included', 'inbox-routing': 'optional', dashboard: 'included', 'quote-generator': 'included', 'client-portal': 'optional', 'support-assistant': 'included' } },
  { capability: 'Training option', states: { 'lead-follow-up': 'optional', 'inbox-routing': 'optional', dashboard: 'optional', 'quote-generator': 'optional', 'client-portal': 'optional', 'support-assistant': 'optional' } },
];

const faqs = [
  { q: 'What happens after I select a product?', a: 'We review your request, confirm scope, and make sure the product fits your workflow before build starts.' },
  { q: 'Can the price change?', a: 'Fixed-price products stay fixed when the scope matches the product. If the workflow is more complex, we will explain what needs a custom quote before work starts.' },
  { q: 'Do I need new software?', a: 'Not always. We usually improve what you already use before recommending new tools.' },
  { q: 'Are hosting or third-party tools included?', a: 'Third-party subscriptions, hosting, and external tool costs may be separate depending on the build.' },
  { q: 'Do you provide handover?', a: 'Yes. Handover, documentation, and guidance are part of delivery.' },
  { q: 'Can I add more later?', a: 'Yes. Add-ons and support plans can extend the system after the first build.' },
];

const quoteHref = '/quote';
const workHref = '/work';

export function ProductsPricingExperience() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Fast Wins');
  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Support and Scale') return [];
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);
  const activeDescription = categories.find((category) => category.name === activeCategory)?.description;

  return (
    <main className="pricing-command-shell overflow-hidden bg-[#020711] text-[#F8FAFC]">
      <PricingHero />
      <BuildTypeChoice />
      <section id="fixed-price-products" className="pricing-section">
        <SectionHeader eyebrow="Product library" title="Browse fixed-price systems." subtitle="Choose the category closest to the leak you need fixed first." />
        <ProductCategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#94A3B8]" aria-live="polite">
          {activeDescription}
        </p>
        {activeCategory === 'Support and Scale' ? (
          <div className="mt-8 rounded-[28px] border border-[#50D2FF33] bg-[#040D1CD6] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.34)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38DFFF]">Support and Scale</p>
                <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">Support plans are listed below.</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">Use this path when your system is already live and needs monitoring, improvements, reporting updates, or ongoing advisory.</p>
              </div>
              <CommandButton href="#support-plans" variant="secondary">View support plans</CommandButton>
            </div>
          </div>
        ) : (
          <ProductGrid products={visibleProducts} />
        )}
      </section>
      <ProductComparisonMatrix />
      <AddonModules />
      <QuotedBuildExplainer />
      <SupportPlans />
      <PricingFAQAccordion />
      <PricingFinalCTA />
    </main>
  );
}

function SectionHeader({ eyebrow, title, subtitle, centered = false }: { eyebrow: string; title: string; subtitle: string; centered?: boolean }) {
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center')}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">{eyebrow}</p>
      <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] text-[#F8FAFC] md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#94A3B8] md:text-lg">{subtitle}</p>
    </div>
  );
}

function CommandButton({ href, children, variant = 'primary', className, ariaLabel }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; className?: string; ariaLabel?: string }) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020711] max-sm:w-full',
        variant === 'primary' && 'bg-[linear-gradient(135deg,#38DFFF,#0EA5FF)] text-[#020711] shadow-[0_0_30px_rgba(14,165,255,0.28)] hover:brightness-110',
        variant === 'secondary' && 'border border-[#50D2FF33] bg-white/[0.04] text-[#F8FAFC] hover:border-[#38DFFF99] hover:bg-[#0EA5FF1A]',
        variant === 'ghost' && 'text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F8FAFC]',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function PricingHero() {
  return (
    <section className="relative px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,255,0.18),transparent_32%),radial-gradient(circle_at_18%_4%,rgba(56,223,255,0.10),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(80,210,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(80,210,255,0.5)_1px,transparent_1px)] [background-size:76px_76px]" />
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="pricing-reveal">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#50D2FF33] bg-[#051022CC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]">
            <Sparkles className="h-3.5 w-3.5" /> Products and pricing
          </p>
          <h1 className="mt-6 max-w-3xl font-[var(--font-jakarta)] text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#F8FAFC] md:text-7xl">
            Pick the system that fixes the leak.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#CBD5E1]">Start with a fixed-price build or request a custom scope for complex operations.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8]">Clear products for repeatable problems. Custom quotes for workflows that need deeper planning.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CommandButton href={quoteHref}>Request a Quote</CommandButton>
            <CommandButton href="#fixed-price-products" variant="secondary">Browse products</CommandButton>
            <CommandButton href={workHref} variant="ghost">View Work</CommandButton>
          </div>
        </div>
        <HeroPathVisual />
      </div>
    </section>
  );
}

function HeroPathVisual() {
  const stages = [
    { title: 'Fast Win', copy: 'Small fixed-price build that fixes one painful bottleneck.', meta: 'From R2,000', icon: Zap },
    { title: 'Core System', copy: 'Structured build that connects multiple workflow pieces.', meta: '7-14 days', icon: BarChart3 },
    { title: 'Scale and Support', copy: 'Ongoing improvement, monitoring, support, and expansion.', meta: 'Monthly support', icon: MonitorCheck },
  ];
  return (
    <div className="pricing-reveal relative rounded-[34px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] [animation-delay:120ms] md:p-7">
      <div className="absolute inset-6 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(56,223,255,0.16),transparent_34%)]" />
      <div className="relative mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38DFFF]">Buying path</p>
          <p className="mt-1 text-sm text-[#94A3B8]">Fast Win → Core System → Scale and Support</p>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Live scope</span>
      </div>
      <div className="relative grid gap-4">
        <span className="path-line absolute left-7 top-12 hidden h-[calc(100%-6rem)] w-px bg-[linear-gradient(180deg,#38DFFF,#0EA5FF)] md:block" />
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.title} className="path-stage relative flex gap-4 rounded-[24px] border border-[#50D2FF29] bg-[#020711B8] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" style={{ animationDelay: `${180 + index * 120}ms` }}>
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#38DFFF55] bg-[#0EA5FF1F] text-[#38DFFF]">
                <Icon className="h-5 w-5" />
                {index === 2 ? <span className="health-pulse absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400" /> : null}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{stage.title}</h3>
                  <span className="rounded-full border border-[#50D2FF29] bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-[#CBD5E1]">{stage.meta}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{stage.copy}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BuildTypeChoice() {
  return (
    <section className="pricing-section pt-0">
      <SectionHeader eyebrow="Buying path" title="Choose the right buying path." subtitle="Fixed-price products are best when the scope is clear. Quoted builds are better when the workflow needs deeper planning." />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <BuildTypeCard
          title="Fixed-price products"
          bestFor="Repeatable systems with defined scope."
          accent="cyan"
          bullets={['you know the problem', 'the workflow is small to medium', 'the system fits one of the product templates', 'you want a clear price and timeline']}
          cta="Browse products"
          href="#fixed-price-products"
          visual="fixed"
        />
        <BuildTypeCard
          title="Quoted builds"
          bestFor="Complex workflows, internal tools, multi-step systems, and large data movement."
          accent="blue"
          bullets={['multiple teams are involved', 'data moves between many systems', 'the app needs custom roles or permissions', 'the scope needs discovery first', 'the workflow does not fit a fixed product']}
          cta="Request a Quote"
          href={quoteHref}
          visual="quoted"
        />
      </div>
    </section>
  );
}

function BuildTypeCard({ title, bestFor, bullets, cta, href, visual, accent }: { title: string; bestFor: string; bullets: string[]; cta: string; href: string; visual: 'fixed' | 'quoted'; accent: 'cyan' | 'blue' }) {
  return (
    <article className="premium-card group pricing-reveal p-6 md:p-7">
      <div className="grid gap-6 md:grid-cols-[1fr_0.85fr] md:items-center">
        <div>
          <p className={cn('text-xs font-semibold uppercase tracking-[0.24em]', accent === 'cyan' ? 'text-[#38DFFF]' : 'text-[#7DD3FC]')}>Best for</p>
          <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">{bestFor}</p>
          <p className="mt-5 text-sm font-semibold text-[#F8FAFC]">Use when:</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[#94A3B8]">
            {bullets.map((bullet) => <li key={bullet} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />{bullet}</li>)}
          </ul>
          <CommandButton href={href} variant="secondary" className="mt-6">{cta}</CommandButton>
        </div>
        {visual === 'fixed' ? <FixedPriceVisual /> : <QuotedVisual />}
      </div>
    </article>
  );
}

function FixedPriceVisual() {
  return (
    <div className="rounded-[24px] border border-[#50D2FF33] bg-[#02071199] p-4">
      <div className="mb-3 flex items-center justify-between"><span className="text-xs text-[#94A3B8]">Product shelf</span><span className="text-xs text-[#38DFFF]">Fixed scope</span></div>
      {['Price', 'Timeline', 'Included scope'].map((item, index) => (
        <div key={item} className="mb-3 rounded-2xl border border-[#50D2FF24] bg-[#061222] p-3" style={{ transform: `translateX(${index * 4}px)` }}>
          <div className="flex items-center justify-between text-sm"><span>{item}</span><Check className="h-4 w-4 text-emerald-300" /></div>
        </div>
      ))}
    </div>
  );
}

function QuotedVisual() {
  return (
    <div className="rounded-[24px] border border-[#50D2FF33] bg-[#02071199] p-4">
      <div className="relative h-40">
        <div className="absolute left-2 top-4 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">Complexity</div>
        <div className="absolute right-2 top-5 rounded-2xl border border-[#50D2FF33] bg-[#061222] p-3 text-xs">Scope document</div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 160" aria-hidden="true">
          <path d="M50 44 C100 44 112 80 150 80 S202 58 222 44" fill="none" stroke="#38DFFF" strokeWidth="2" strokeDasharray="5 6" />
          <path d="M42 104 C82 86 100 116 138 112 S184 116 222 104" fill="none" stroke="#0EA5FF" strokeWidth="2" strokeDasharray="5 6" />
        </svg>
        {['CRM', 'Ops', 'Roles', 'Data'].map((node, index) => (
          <span key={node} className="absolute rounded-full border border-[#50D2FF33] bg-[#061222] px-3 py-1 text-xs text-[#CBD5E1]" style={{ left: `${12 + index * 18}%`, top: `${62 + (index % 2) * 22}%` }}>{node}</span>
        ))}
      </div>
    </div>
  );
}

function ProductCategoryTabs({ activeCategory, onChange }: { activeCategory: ProductCategory; onChange: (category: ProductCategory) => void }) {
  return (
    <div className="mt-8 overflow-x-auto pb-2" role="tablist" aria-label="Product categories">
      <div className="flex min-w-max gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.name}
            onClick={() => onChange(category.name)}
            className={cn(
              'rounded-full border px-4 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020711]',
              activeCategory === category.name ? 'border-[#38DFFF] bg-[#0EA5FF24] text-[#F8FAFC] shadow-[0_0_24px_rgba(56,223,255,0.18)]' : 'border-[#50D2FF24] bg-white/[0.03] text-[#94A3B8] hover:border-[#50D2FF66] hover:text-[#F8FAFC]',
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({ products: gridProducts }: { products: Product[] }) {
  return <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">{gridProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="product-card pricing-reveal group flex flex-col p-5" style={{ animationDelay: `${index * 90}ms` }}>
      <ProductMiniVisual type={product.visual} />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38DFFF]">{product.typeLabel}</p>
          <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold leading-tight">{product.name}</h3>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#50D2FF24] bg-white/[0.035] p-3"><p className="text-xs text-[#94A3B8]">Price</p><p className="mt-1 text-2xl font-semibold text-[#F8FAFC]">{product.price}</p></div>
        <div className="rounded-2xl border border-[#50D2FF24] bg-white/[0.035] p-3"><p className="text-xs text-[#94A3B8]">Timeline</p><p className="mt-1 text-sm font-semibold text-[#CBD5E1]">{product.timeline}</p></div>
      </div>
      <p className="mt-5 text-sm font-semibold text-[#F8FAFC]">Best for:</p>
      <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{product.bestFor}</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[#F8FAFC]">Includes</p>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-[#CBD5E1]">{product.includes.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-200">Not included</p>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-[#94A3B8]">{product.notIncluded.map((item) => <li key={item} className="flex gap-2"><Minus className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />{item}</li>)}</ul>
        </div>
      </div>
      <div className="mt-auto pt-6">
        <p className="mb-3 text-xs text-[#94A3B8]">Final scope confirmed before build.</p>
        <CommandButton href={`${quoteHref}?product=${product.id}`} ariaLabel={`Select ${product.name}`} className="w-full">{product.cta}</CommandButton>
      </div>
    </article>
  );
}

function ProductMiniVisual({ type }: { type: VisualType }) {
  if (type === 'lead-follow-up') {
    return <MiniVisualShell><div className="mini-flow"><span>Lead</span><ArrowRight /><span className="lit">Owner</span><ArrowRight /><span>Reminder</span><ArrowRight /><span className="report">Report</span></div><p className="mini-chip">New → Follow-up set</p></MiniVisualShell>;
  }
  if (type === 'inbox-routing') {
    return <MiniVisualShell><div className="grid grid-cols-4 gap-2">{['Priority', 'Quote', 'Support', 'Follow-up'].map((lane) => <div key={lane} className="rounded-xl border border-[#50D2FF24] bg-[#061222] p-2 text-[10px] text-[#CBD5E1]"><Inbox className="mb-2 h-4 w-4 text-[#38DFFF]" />{lane}</div>)}</div><p className="mini-chip">Action assigned</p></MiniVisualShell>;
  }
  if (type === 'dashboard') {
    return <MiniVisualShell><div className="grid grid-cols-3 gap-2">{['42', '89%', '12'].map((metric) => <div key={metric} className="rounded-xl border border-[#50D2FF24] bg-[#061222] p-2 text-center text-lg font-semibold text-[#F8FAFC]">{metric}</div>)}</div><svg className="mt-3 h-12 w-full" viewBox="0 0 220 48" aria-hidden="true"><path className="draw-line" d="M4 38 C42 8 66 34 100 22 S158 2 216 14" fill="none" stroke="#38DFFF" strokeWidth="3" /></svg><p className="mini-chip">Visible</p></MiniVisualShell>;
  }
  if (type === 'quote-generator') {
    return <MiniVisualShell><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="rounded-xl border border-[#50D2FF24] bg-[#061222] p-3 text-xs">Intake form</div><ArrowRight className="h-4 w-4 text-[#38DFFF]" /><div className="rounded-xl border border-[#50D2FF24] bg-[#061222] p-3 text-xs"><FileText className="mb-2 h-4 w-4 text-[#38DFFF]" />PDF quote</div></div><p className="mini-chip">Approval ready</p></MiniVisualShell>;
  }
  if (type === 'client-portal') {
    return <MiniVisualShell><div className="rounded-2xl border border-[#50D2FF24] bg-[#061222] p-3"><div className="mb-3 flex items-center justify-between text-xs"><span>Client dashboard</span><span className="text-emerald-300">Open</span></div><div className="h-2 rounded-full bg-[#0EA5FF55]" /><div className="mt-3 grid grid-cols-2 gap-2 text-[10px]"><span className="rounded-lg bg-white/[0.05] p-2">Request status</span><span className="rounded-lg bg-white/[0.05] p-2">Admin panel</span></div></div><p className="mini-chip">Approval sent</p></MiniVisualShell>;
  }
  return <MiniVisualShell><div className="space-y-2"><div className="ml-auto w-4/5 rounded-2xl border border-[#50D2FF24] bg-[#061222] p-3 text-xs">How do I update my booking?</div><div className="w-4/5 rounded-2xl border border-[#50D2FF24] bg-[#0EA5FF1A] p-3 text-xs">Summary generated and sent to team.</div></div><p className="mini-chip">Resolved / Sent to team</p></MiniVisualShell>;
}

function MiniVisualShell({ children }: { children: React.ReactNode }) {
  return <div className="mini-visual min-h-[150px] rounded-[22px] border border-[#50D2FF24] bg-[#02071199] p-4">{children}</div>;
}

function ProductComparisonMatrix() {
  const [openProduct, setOpenProduct] = useState(products[0].id);
  return (
    <section className="pricing-section">
      <SectionHeader eyebrow="Comparison" title="Compare what each product covers." subtitle="Use this to choose the closest fit. If your workflow needs more, request a custom scope." />
      <div className="mt-8 hidden overflow-x-auto rounded-[28px] border border-[#50D2FF33] bg-[#040D1CD6] p-2 shadow-[0_22px_70px_rgba(0,0,0,0.35)] lg:block">
        <table className="w-full min-w-[920px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>{['Capability', ...products.map((product) => product.shortName)].map((heading, index) => <th key={heading} className={cn('border-b border-[#50D2FF24] p-4 text-left font-semibold text-[#F8FAFC]', index > 0 && 'text-center')}>{heading}</th>)}</tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.capability} className="group/row transition hover:bg-[#0EA5FF0D]">
                <th className="sticky left-0 border-b border-[#50D2FF14] bg-[#040D1C] p-4 text-left font-medium text-[#CBD5E1]">{row.capability}</th>
                {products.map((product) => <td key={product.id} className="border-b border-[#50D2FF14] p-4 text-center"><ComparisonIcon state={row.states[product.id]} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-3 lg:hidden">
        {products.map((product) => {
          const isOpen = openProduct === product.id;
          const included = comparisonRows.filter((row) => row.states[product.id] !== 'none');
          return (
            <div key={product.id} className="rounded-[22px] border border-[#50D2FF2E] bg-[#040D1CD6]">
              <button type="button" onClick={() => setOpenProduct(isOpen ? '' : product.id)} className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF]">
                {product.name}<ChevronDown className={cn('h-4 w-4 transition', isOpen && 'rotate-180')} />
              </button>
              {isOpen ? <div className="grid gap-2 px-4 pb-4">{included.map((row) => <div key={row.capability} className="flex items-center justify-between rounded-xl bg-white/[0.035] px-3 py-2 text-sm text-[#CBD5E1]"><span>{row.capability}</span><ComparisonIcon state={row.states[product.id]} /></div>)}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ComparisonIcon({ state }: { state: ComparisonState }) {
  if (state === 'included') return <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300" aria-label="Included"><Check className="h-4 w-4" /></span>;
  if (state === 'optional') return <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-1 text-[11px] font-semibold text-amber-200" aria-label="Optional add-on"><Plus className="h-3 w-3" /> add-on</span>;
  return <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#64748B]" aria-label="Not included"><Minus className="h-4 w-4" /></span>;
}

function AddonModules() {
  return (
    <section className="pricing-section">
      <SectionHeader eyebrow="Plug-in modules" title="Add extra pieces when the workflow needs them." subtitle="Add-ons are scoped when your product needs another connection, rule, approval step, or training session." />
      <div className="relative mt-10">
        <div className="mx-auto mb-6 w-fit rounded-full border border-[#38DFFF55] bg-[#0EA5FF1F] px-5 py-2 text-sm font-semibold text-[#F8FAFC] shadow-[0_0_28px_rgba(14,165,255,0.18)]">Build scope</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{addOns.map((addon) => <AddonCard key={addon.name} addon={addon} />)}</div>
      </div>
    </section>
  );
}

function AddonCard({ addon }: { addon: AddOn }) {
  const Icon = addon.visual === 'plug' ? PlugZap : addon.visual === 'rule' ? GitBranch : addon.visual === 'training' ? Users : TimerReset;
  return (
    <article className="addon-card group rounded-[24px] border border-[#50D2FF2E] bg-[#040D1CD6] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#38DFFF99]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#50D2FF33] bg-[#0EA5FF1A] text-[#38DFFF]"><Icon className="h-5 w-5" /></div>
      <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{addon.name}</h3>
      <p className="mt-3 text-lg font-semibold text-[#38DFFF]">{addon.price}</p>
      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">Use for: {addon.useFor}</p>
    </article>
  );
}

function QuotedBuildExplainer() {
  const examples = ['Multi-department workflows', 'Custom tools', 'Complex integrations', 'Full websites', 'Data migration', 'Advanced permissions', 'Large reporting systems', 'Multi-location workflows'];
  return (
    <section id="quoted-builds" className="pricing-section">
      <div className="quoted-panel grid gap-8 rounded-[32px] border border-[#50D2FF33] bg-[#040D1CD6] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
        <ComplexWorkflowMap />
        <div>
          <SectionHeader eyebrow="Custom scope" title="When fixed pricing stops being honest." subtitle="Some systems need discovery before a fair price can be given. That protects the build, the timeline, and your budget." />
          <p className="mt-5 text-base leading-7 text-[#CBD5E1]">If the workflow has too many moving parts for a fixed package, we scope it properly first.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">{examples.map((example) => <span key={example} className="rounded-full border border-amber-300/24 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">{example}</span>)}</div>
          <CommandButton href={quoteHref} className="mt-7">Request a custom quote</CommandButton>
        </div>
      </div>
    </section>
  );
}

function ComplexWorkflowMap() {
  return (
    <div className="relative min-h-[360px] rounded-[28px] border border-[#50D2FF24] bg-[#02071199] p-5">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 360" aria-hidden="true">
        <path d="M70 74 C150 74 150 154 224 154 S286 104 348 104" stroke="#38DFFF" strokeWidth="2" fill="none" strokeDasharray="6 8" />
        <path d="M78 252 C150 220 150 180 224 180 S300 244 350 230" stroke="#0EA5FF" strokeWidth="2" fill="none" strokeDasharray="6 8" />
        <path d="M116 160 H300" stroke="#FBBF24" strokeWidth="2" fill="none" strokeDasharray="4 8" />
      </svg>
      <div className="relative grid h-full min-h-[320px] grid-cols-2 content-between gap-4">
        {['Website form', 'Inbox', 'Ops board', 'CRM', 'Finance', 'Client team'].map((node, index) => <div key={node} className="w-fit rounded-2xl border border-[#50D2FF33] bg-[#061222] px-4 py-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" style={{ justifySelf: index % 2 ? 'end' : 'start' }}>{node}</div>)}
        <div className="col-span-2 mx-auto rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">Scope first</div>
        <div className="col-span-2 ml-auto rounded-[22px] border border-[#38DFFF55] bg-[#0EA5FF1A] p-4 text-sm"><FileText className="mb-2 h-5 w-5 text-[#38DFFF]" />Custom quote document</div>
      </div>
    </div>
  );
}

function SupportPlans() {
  return (
    <section id="support-plans" className="pricing-section">
      <SectionHeader eyebrow="After launch" title="Keep the system working after launch." subtitle="Support plans help monitor, improve, and extend the system once it is being used." />
      <SystemHealthMonitor />
      <div className="mt-6 grid gap-5 lg:grid-cols-3">{supportPlans.map((plan) => <SupportPlanCard key={plan.id} plan={plan} />)}</div>
    </section>
  );
}

function SystemHealthMonitor() {
  return (
    <div className="mt-8 grid gap-4 rounded-[28px] border border-[#50D2FF33] bg-[#040D1CD6] p-5 md:grid-cols-[0.8fr_1.2fr_1fr]">
      <div><p className="text-sm font-semibold text-[#F8FAFC]">System health</p><div className="mt-4 flex gap-2">{['Live', 'Stable', 'Improving'].map((dot) => <span key={dot} className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">{dot}</span>)}</div></div>
      <div className="rounded-2xl border border-[#50D2FF24] bg-[#02071199] p-4"><p className="text-xs text-[#94A3B8]">Improvement graph</p><svg className="mt-3 h-12 w-full" viewBox="0 0 300 52" aria-hidden="true"><path className="draw-line" d="M4 42 C64 38 72 24 122 26 S190 10 296 8" fill="none" stroke="#38DFFF" strokeWidth="3" /></svg></div>
      <div className="rounded-2xl border border-[#50D2FF24] bg-[#02071199] p-4"><p className="text-xs text-[#94A3B8]">Roadmap board</p><div className="mt-3 grid grid-cols-3 gap-2 text-[10px]"><span className="rounded-lg bg-white/[0.05] p-2">Fixes</span><span className="rounded-lg bg-white/[0.05] p-2">Reports</span><span className="rounded-lg bg-white/[0.05] p-2">Next</span></div></div>
    </div>
  );
}

function SupportPlanCard({ plan }: { plan: SupportPlan }) {
  return (
    <article className={cn('premium-card relative p-6', plan.recommended && 'border-[#FACC154D] shadow-[0_0_0_1px_rgba(250,204,21,0.18),0_28px_80px_rgba(0,0,0,0.42)]')}>
      {plan.recommended ? <span className="absolute right-5 top-5 rounded-full border border-[#FACC154D] bg-[#FACC151A] px-3 py-1 text-xs font-semibold text-[#FDE68A]">Recommended</span> : null}
      <LifeBuoy className="h-8 w-8 text-[#38DFFF]" />
      <h3 className="mt-5 font-[var(--font-jakarta)] text-2xl font-semibold">{plan.name}</h3>
      <p className="mt-3 text-2xl font-semibold text-[#38DFFF]">{plan.price}</p>
      <p className="mt-4 text-sm leading-6 text-[#94A3B8]">Best for: {plan.bestFor}</p>
      <ul className="mt-5 space-y-2 text-sm text-[#CBD5E1]">{plan.includes.map((item) => <li key={item} className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />{item}</li>)}</ul>
      <CommandButton href={`${quoteHref}?support=${plan.id}`} variant={plan.recommended ? 'primary' : 'secondary'} className="mt-6 w-full">{plan.cta}</CommandButton>
    </article>
  );
}

function PricingFAQAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <section className="pricing-section">
      <SectionHeader centered eyebrow="FAQ" title="Pricing questions." subtitle="Practical answers before you choose a product, request a quote, or add support." />
      <div className="mx-auto mt-8 max-w-3xl space-y-3">{faqs.map((faq, index) => { const isOpen = open === index; return (
        <div key={faq.q} className={cn('rounded-[22px] border bg-[#040D1CD6] transition', isOpen ? 'border-[#38DFFF66]' : 'border-[#50D2FF24]')}>
          <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full items-center justify-between gap-5 p-5 text-left font-[var(--font-jakarta)] text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38DFFF]">
            {faq.q}<ChevronDown className={cn('h-5 w-5 shrink-0 transition', isOpen && 'rotate-180 text-[#38DFFF]')} />
          </button>
          {isOpen ? <p className="px-5 pb-5 text-sm leading-6 text-[#94A3B8]">{faq.a}</p> : null}
        </div>
      ); })}</div>
    </section>
  );
}

function PricingFinalCTA() {
  return (
    <section className="px-5 pb-20 md:px-8 md:pb-28">
      <div className="mx-auto max-w-[1200px] rounded-[34px] border border-[#50D2FF33] bg-[linear-gradient(135deg,rgba(5,16,34,0.96),rgba(2,7,17,0.98))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38DFFF]">Next step</p>
            <h2 className="mt-3 font-[var(--font-jakarta)] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Pick a product, or tell us the bottleneck.</h2>
            <p className="mt-4 text-lg leading-8 text-[#94A3B8]">We will recommend the simplest path and price it clearly.</p>
            <p className="mt-4 text-sm font-semibold text-[#CBD5E1]">Clear scope first. No pressure.</p>
            <div className="mt-7 flex flex-wrap gap-3"><CommandButton href={quoteHref}>Request a Quote</CommandButton><CommandButton href={workHref} variant="secondary">View Work</CommandButton></div>
          </div>
          <div className="rounded-[28px] border border-[#50D2FF24] bg-[#02071199] p-5">
            <div className="mini-flow final-path"><span>Product selected</span><ArrowRight /><span>Scope confirmed</span><ArrowRight /><span className="lit">Build starts</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
