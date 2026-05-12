import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Gauge, Globe2, Inbox, MousePointerClick, ShieldCheck, Workflow } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

const quoteHref = '/quote';
const workHref = '/work';

const pageMetadata = buildMetadata({
  title: 'Websites That Convert | Rapid Rise AI',
  description: 'Build a premium website that creates trust, guides action, captures enquiries, and connects into a practical follow-up flow.',
  path: '/solutions/websites',
});

export const metadata: Metadata = {
  ...pageMetadata,
  openGraph: {
    ...pageMetadata.openGraph,
    title: 'Websites That Convert | Rapid Rise AI',
    description: 'Build a premium website that creates trust, guides action, captures enquiries, and connects into a practical follow-up flow.',
  },
};

const trustChips = ['Clear CTA path', 'Mobile-first build', 'Follow-up ready', 'Built around your offer'];

const problems = [
  { title: 'Weak messaging', copy: 'Visitors cannot quickly understand what you do or what to do next.', visual: 'message' },
  { title: 'Unclear CTA path', copy: 'Buttons, forms, and next steps do not guide people toward action.', visual: 'cta' },
  { title: 'Poor mobile experience', copy: 'The site looks fine on desktop but feels hard to use on a phone.', visual: 'mobile' },
  { title: 'Low trust', copy: 'The page does not explain proof, process, scope, or why the visitor should enquire.', visual: 'trust' },
  { title: 'No follow-up flow', copy: 'Enquiries arrive, but they are not routed into a clear next step.', visual: 'followup' },
];

const outputs = [
  { icon: Globe2, title: 'Premium website structure', value: 'Create a clear site flow around your offer, audience, and next action.', chip: 'Structure set', visual: 'structure' },
  { icon: MousePointerClick, title: 'Clear CTA path', value: 'Guide visitors to request a quote, contact you, book, or submit an enquiry.', chip: 'CTA visible', visual: 'cta' },
  { icon: ShieldCheck, title: 'Trust sections', value: 'Explain process, credibility, services, and what happens after enquiry.', chip: 'Trust built', visual: 'trust' },
  { icon: Inbox, title: 'Enquiry capture', value: 'Use forms and CTA routes that collect the details your team needs.', chip: 'Captured', visual: 'form' },
  { icon: Workflow, title: 'Follow-up connection', value: 'Connect website enquiries into lead capture or workflow automation when scoped.', chip: 'Connected', visual: 'flow' },
  { icon: Gauge, title: 'Basic visibility', value: 'Support analytics, tracking, or review views where the scope requires it.', chip: 'Visible', visual: 'report' },
];

const steps = [
  { title: 'Visitor lands', microcopy: 'The page quickly explains the offer and who it is for.', tag: 'Message clear' },
  { title: 'Trust builds', microcopy: 'Proof, process, scope, and service details reduce uncertainty.', tag: 'Trust visible' },
  { title: 'CTA path guides action', microcopy: 'The visitor sees the best next step without hunting for it.', tag: 'CTA ready' },
  { title: 'Form captures details', microcopy: 'The enquiry form asks for useful information before handoff.', tag: 'Details captured' },
  { title: 'Follow-up begins', microcopy: 'The request can connect into lead capture, email, sheet, dashboard, or workflow when scoped.', tag: 'Follow-up set' },
];

const included = ['Website page structure', 'Messaging and CTA planning', 'Responsive page build', 'Contact or quote form', 'Trust and process sections', 'Basic SEO foundations', 'Mobile QA', 'Handover notes', 'Launch support notes'];
const customScope = ['Large content writing project', 'Advanced SEO campaign', 'Paid ad campaign management', 'Complex ecommerce build', 'Large custom web app', 'Deep CRM integration', 'Ongoing maintenance unless support plan is included'];
const goodFit = ['Service businesses needing better enquiries', 'Owners replacing an outdated website', 'Teams needing clearer forms and CTAs', 'Businesses that want website enquiries connected to follow-up', 'Brands that need a premium first impression'];
const needsScope = ['Large ecommerce platforms', 'Complex portals or dashboards', 'Advanced booking engines', 'Multi-brand content systems', 'Regulated or high-compliance websites', 'Large migration or SEO recovery projects'];

const relatedModules = [
  { title: 'Lead Capture and Follow Up', copy: 'Route website enquiries into a tracked lead flow with owner assignment.', href: '/solutions/lead-capture' },
  { title: 'Workflow Automation and Integrations', copy: 'Connect forms, notifications, sheets, dashboards, and next actions.', href: '/solutions/workflow-automation' },
  { title: 'Support Assistant', copy: 'Add approved answers and cleaner support handoff to the website.', href: '/solutions/support-assistant' },
  { title: 'Web Apps and Internal Tools', copy: 'Connect the website into portals, trackers, dashboards, or internal systems.', href: '/solutions/web-apps' },
];

const faqs = [
  { question: 'Is this only a visual website redesign?', answer: 'No. The goal is a website that explains the offer clearly, guides action, captures enquiries, and can connect into follow-up workflows when scoped.' },
  { question: 'Can the website connect to lead capture?', answer: 'Yes. Website forms and CTAs can connect into a lead capture flow, sheet, inbox, dashboard, or automation when scoped.' },
  { question: 'Do you write all the website copy?', answer: 'Core messaging and page structure can be included. Larger content writing, SEO content, or complex brand messaging may need custom scope.' },
  { question: 'Can this include forms?', answer: 'Yes. A quote, contact, booking, or enquiry form can be included when it fits the workflow.' },
  { question: 'Can this replace a full web app?', answer: 'Not always. If users need logins, dashboards, records, or role-based tools, we may recommend a web app or internal tool instead.' },
  { question: 'Will it work on mobile?', answer: 'Yes. Mobile readability, CTA clarity, and responsive layout are part of the build quality.' },
];

function ProductButton({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  return <Link href={href} className={cn('group inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300', variant === 'primary' ? 'bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(56,223,255,0.24)] hover:bg-white' : 'border border-cyan-300/25 bg-white/[0.03] text-slate-100 hover:border-cyan-300/55 hover:bg-cyan-300/10')}>{children}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></Link>;
}

function SectionHeader({ title, subheading }: { title: string; subheading?: string }) {
  return <div className="mx-auto max-w-3xl text-center"><h2 className="mt-3 text-system-h2 text-slate-50">{title}</h2>{subheading ? <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subheading}</p> : null}</div>;
}

function GlassPanel({ className, children, style }: { className?: string; children: ReactNode; style?: CSSProperties }) {
  return <div style={style} className={cn('rounded-[2rem] border border-cyan-300/20 bg-[#040d1c]/80 shadow-[0_24px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl', className)}>{children}</div>;
}

function ProductHero() {
  return (
    <section className="pt-24 md:pt-32"><Container><div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-system-eyebrow text-cyan-300">WEBSITES THAT CONVERT</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-50 md:text-6xl">Build a website that turns visitors into clear next actions.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Create a premium website that builds trust, guides the visitor, captures enquiries, and connects to the right follow-up flow.</p><p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">Built for businesses that need more than a good-looking page. The site should explain the offer, show the next step, and make enquiries easier to handle.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ProductButton href={quoteHref}>Request a Quote</ProductButton><ProductButton href={workHref} variant="secondary">View Work</ProductButton></div><div className="mt-6 flex flex-wrap gap-2">{trustChips.map((chip) => <span key={chip} className="rounded-full border border-cyan-300/20 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300">{chip}</span>)}</div></div><ProductHeroVisual /></div></Container></section>
  );
}

function ProductHeroVisual() {
  return (
    <GlassPanel className="website-product-visual relative overflow-hidden p-4 sm:p-6"><div className="relative z-10 rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/40 p-4"><div className="absolute left-5 top-5 rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200 website-warning-chip">Weak CTA path</div><div className="flex justify-end"><span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">Enquiry captured</span></div><div className="mt-9 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]"><div className="website-hero-card rounded-3xl border border-cyan-300/20 bg-[#061326]/90 p-4 shadow-[0_0_45px_rgba(14,165,255,0.18)]"><p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Landing page</p><h3 className="mt-2 text-lg font-semibold text-white">Clear offer and CTA</h3><div className="mt-4 space-y-2">{['Hero message', 'Trust block', 'Service fit', 'Primary CTA'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div><div className="grid gap-4"><div className="website-hero-card rounded-3xl border border-cyan-300/15 bg-[#051022]/88 p-4"><p className="text-xs uppercase tracking-[0.18em] text-cyan-200">CTA path</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{['Trust', 'Action', 'Form'].map((item) => <span key={item} className="rounded-xl bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">{item}</span>)}</div></div><div className="website-hero-card rounded-3xl border border-emerald-300/15 bg-emerald-300/8 p-4"><p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Follow-up ready</p><div className="mt-3 grid grid-cols-2 gap-2">{['Name captured', 'Need captured', 'Route set', 'Next step visible'].map((item) => <span key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</span>)}</div></div></div></div><div className="mt-4 grid gap-3 md:grid-cols-4">{['Landing page', 'Trust blocks', 'CTA path', 'Follow-up'].map((item, index) => <div key={item} className={cn('rounded-2xl border p-3 text-sm font-semibold', index === 3 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100')}>{item}</div>)}</div></div></GlassPanel>
  );
}

function ProblemVisual({ type }: { type: string }) {
  if (type === 'mobile') return <div className="mx-auto h-28 w-20 rounded-2xl border border-amber-300/25 bg-amber-300/8 p-2"><div className="h-full rounded-xl bg-slate-950/70"><div className="mx-auto pt-3"><div className="mx-auto h-2 w-10 rounded-full bg-amber-300/50" /></div></div></div>;
  if (type === 'cta') return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="h-2 w-16 rounded-full bg-white/15" /><div className="mt-3 h-px border-t border-dashed border-amber-300/50" /><span className="mt-3 inline-flex rounded-full bg-amber-300/12 px-2 py-1 text-[0.65rem] font-semibold text-amber-200">No path</span></div>;
  if (type === 'followup') return <div className="rounded-2xl bg-slate-950/50 p-3"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"><span className="rounded-xl bg-cyan-300/10 p-2 text-xs text-cyan-100">Form</span><span className="h-px w-8 border-t border-dashed border-amber-300/60" /><span className="rounded-xl bg-white/[0.05] p-2 text-xs text-slate-400">Inbox</span></div></div>;
  return <div className="rounded-2xl bg-slate-950/50 p-3"><span className="rounded-full bg-amber-300/12 px-2 py-1 text-[0.65rem] font-semibold text-amber-200">Unclear</span><div className="mt-3 space-y-2">{['Message', 'Trust', 'Next step'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-slate-300">{item}</div>)}</div></div>;
}

function ProblemGrid() {
  return <section className="py-20"><Container><SectionHeader title="Where websites usually lose action." subheading="A website does not fail only because of design. It fails when the message, trust, CTA, and follow-up path are unclear." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">{problems.map((problem, index) => <GlassPanel key={problem.title} className={cn('website-reveal-card p-5', index < 2 ? 'lg:col-span-3' : 'lg:col-span-2')} style={{ '--website-delay': `${index * 90}ms` } as CSSProperties}><div className="flex items-center gap-2 text-amber-200"><span className="website-warning-dot h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">Conversion leak</span></div><h3 className="mt-4 text-xl font-semibold text-white">{problem.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{problem.copy}</p><div className="mt-5"><ProblemVisual type={problem.visual} /></div></GlassPanel>)}</div></Container></section>;
}

function MiniVisual({ type }: { type: string }) {
  if (type === 'form') return <div className="grid gap-2">{['Name', 'Need', 'Contact'].map((item) => <span key={item} className="rounded-xl bg-emerald-300/10 px-3 py-2 text-[0.68rem] text-emerald-100">{item}</span>)}</div>;
  if (type === 'flow') return <div className="flex items-center gap-2 text-[0.68rem]"><span className="rounded-full bg-cyan-300/10 px-2 py-1 text-cyan-100">Form</span><ArrowRight className="h-3 w-3 text-cyan-200" aria-hidden="true" /><span className="rounded-full bg-emerald-300/10 px-2 py-1 text-emerald-100">Follow-up</span></div>;
  if (type === 'report') return <div className="grid grid-cols-3 gap-2"><span className="h-9 rounded-lg bg-cyan-300/15" /><span className="h-9 rounded-lg bg-cyan-300/10" /><span className="h-9 rounded-lg bg-emerald-300/12" /></div>;
  return <div className="space-y-2"><div className="h-2 rounded-full bg-cyan-300/40" /><div className="h-2 w-2/3 rounded-full bg-white/15" /><div className="rounded-xl bg-white/[0.05] px-3 py-2 text-[0.68rem] text-slate-300">Website layer</div></div>;
}

function OutputGrid() {
  return <section className="py-20"><Container><SectionHeader title="What the website gives you." subheading="A clear conversion layer that explains the offer, guides the visitor, captures the enquiry, and supports follow-up." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{outputs.map((output, index) => { const Icon = output.icon; return <GlassPanel key={output.title} className="website-card website-reveal-card p-5" style={{ '--website-delay': `${index * 70}ms` } as CSSProperties}><div className="flex items-center justify-between gap-3"><span className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-200">{output.chip}</span></div><h3 className="mt-4 text-lg font-semibold text-white">{output.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{output.value}</p><div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/45 p-3"><MiniVisual type={output.visual} /></div></GlassPanel>; })}</div></Container></section>;
}

function HowItWorksTimeline() {
  return <section className="py-20"><Container><SectionHeader title="From visitor to follow-up." subheading="The website should guide people from first impression to a useful enquiry your team can handle." /><GlassPanel className="mt-10 p-5 md:p-7"><div className="relative grid gap-4 lg:grid-cols-5"><div className="absolute left-0 right-0 top-6 hidden h-1 origin-left rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 lg:block website-flow-line" />{steps.map((step, index) => <div key={step.title} className="website-reveal-card relative rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-4" style={{ '--website-delay': `${index * 90}ms` } as CSSProperties}><span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/15 text-sm font-bold text-cyan-100">{index + 1}</span><h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{step.microcopy}</p><span className="mt-4 inline-flex rounded-full bg-emerald-300/10 px-2 py-1 text-[0.65rem] font-semibold text-emerald-100">{step.tag}</span></div>)}</div></GlassPanel></Container></section>;
}

function ScopeListPanel() {
  return <section className="py-20"><Container><SectionHeader title="What can be included." subheading="The exact build depends on your content, page count, forms, integrations, and launch requirements." /><GlassPanel className="mt-10 p-5 md:p-7"><div className="grid gap-6 lg:grid-cols-2"><div><h3 className="text-xl font-semibold text-white">Included in a typical website build</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{included.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-3 text-sm text-slate-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />{item}</div>)}</div></div><div><h3 className="text-xl font-semibold text-white">Usually scoped separately</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{customScope.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/6 p-3 text-sm text-slate-300"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300" />{item}</div>)}</div></div></div><p className="mt-6 rounded-2xl border border-cyan-300/15 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">If the website needs advanced integrations, ecommerce, portals, or a large content system, we will recommend a custom quote instead of forcing a starter scope.</p></GlassPanel></Container></section>;
}

function BestFitPanel() {
  return <section className="py-20"><Container><SectionHeader title="Best fit when your website needs to create clearer action." /><div className="mt-10 grid gap-5 lg:grid-cols-2"><FitCard title="Good fit" items={goodFit} tone="cyan" /><FitCard title="Needs custom scoping" items={needsScope} tone="amber" /></div><GlassPanel className="mt-6 flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center"><div><h3 className="text-xl font-semibold text-white">Not sure what your website needs?</h3><p className="mt-2 text-sm text-slate-400">Request a quote and we will recommend the cleanest website and follow-up path.</p></div><ProductButton href={quoteHref}>Request a Quote</ProductButton></GlassPanel></Container></section>;
}

function FitCard({ title, items, tone }: { title: string; items: string[]; tone: 'cyan' | 'amber' }) {
  return <GlassPanel className={cn('p-6', tone === 'cyan' ? 'border-cyan-300/25' : 'border-amber-300/20')}><h3 className="text-2xl font-semibold text-white">{title}</h3><div className="mt-5 space-y-3">{items.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className={cn('mt-2 h-2 w-2 shrink-0 rounded-full', tone === 'cyan' ? 'bg-cyan-300' : 'bg-amber-300')} />{item}</div>)}</div></GlassPanel>;
}

function WebsiteMockup() {
  return <section className="py-20"><Container><SectionHeader title="Example conversion website flow." subheading="A practical website should show the offer, build trust, guide action, and make follow-up easier." /><GlassPanel className="website-mockup mt-10 overflow-hidden p-4 md:p-6"><div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/55"><div className="flex flex-col gap-4 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Website system preview</p><h3 className="mt-1 text-xl font-semibold text-white">Landing page, CTA, form, follow-up</h3></div><span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs font-semibold text-emerald-200">CTA path live</span></div><div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.8fr]"><div className="space-y-4"><div className="rounded-3xl border border-cyan-300/18 bg-[#061326]/80 p-4"><h4 className="font-semibold text-white">Hero and trust path</h4><div className="mt-4 grid gap-2 md:grid-cols-3">{['Offer clear', 'Proof visible', 'CTA ready'].map((item) => <div key={item} className="rounded-2xl bg-white/[0.05] p-3 text-sm text-slate-300">{item}</div>)}</div></div><div className="rounded-3xl border border-emerald-300/15 bg-emerald-300/7 p-4"><h4 className="font-semibold text-white">Enquiry form</h4><div className="mt-3 grid gap-2 md:grid-cols-4">{['Name', 'Service', 'Budget', 'Contact'].map((item) => <div key={item} className="rounded-xl bg-white/[0.05] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div></div><div className="space-y-4"><div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/7 p-4"><h4 className="font-semibold text-white">Follow-up route</h4><div className="mt-3 space-y-2">{['Lead captured', 'Owner assigned', 'Reply next'].map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div><div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"><h4 className="font-semibold text-white">Page checks</h4><div className="mt-3 space-y-2">{['Mobile readable', 'CTA visible', 'Trust blocks ready'].map((item) => <div key={item} className="rounded-xl bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{item}</div>)}</div></div></div></div></div></GlassPanel></Container></section>;
}

function RelatedSystemModules() {
  return <section className="py-20"><Container><SectionHeader title="This website can connect to other layers." subheading="A conversion website becomes stronger when enquiries connect into lead capture, support, automation, and internal systems." /><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{relatedModules.map((module) => <Link key={module.title} href={module.href} className="group rounded-[1.5rem] border border-cyan-300/18 bg-[#040d1c]/80 p-5 transition hover:-translate-y-1 hover:border-cyan-300/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"><div className="mb-4 h-1 rounded-full bg-gradient-to-r from-cyan-300/80 to-transparent" /><h3 className="text-lg font-semibold text-white">{module.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{module.copy}</p><span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-200">View module <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span></Link>)}</div></Container></section>;
}

function ProductFAQAccordion() {
  return <section className="py-20"><Container><SectionHeader title="Website questions." /><div className="mx-auto mt-10 max-w-4xl space-y-3">{faqs.map((faq) => <details key={faq.question} className="group rounded-3xl border border-cyan-300/16 bg-[#040d1c]/82 p-5 open:border-cyan-300/40"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">{faq.question}<span className="rounded-full border border-cyan-300/20 p-1 text-cyan-200 transition group-open:rotate-90"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></summary><p className="mt-4 text-sm leading-7 text-slate-400">{faq.answer}</p></details>)}</div></Container></section>;
}

function ProductFinalCTA() {
  return <section className="pb-24 pt-16"><Container><GlassPanel className="overflow-hidden p-5 md:p-8"><div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div><h2 className="text-system-h2 text-white">Ready to turn the website into a clearer path?</h2><p className="mt-4 text-base leading-7 text-slate-400">Tell us what your website needs to explain, capture, or connect. We will recommend the cleanest website build and follow-up flow.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><ProductButton href={quoteHref}>Request a Quote</ProductButton><ProductButton href={workHref} variant="secondary">View Work</ProductButton></div><p className="mt-5 text-sm text-slate-500">Clear scope before build. Practical CTA path. No pressure.</p></div><div className="rounded-[1.5rem] border border-cyan-300/15 bg-slate-950/45 p-4"><div className="grid gap-3 md:grid-cols-4">{['Weak website', 'Clear CTA path', 'Enquiry captured', 'Follow-up ready'].map((step, index) => <div key={step} className={cn('rounded-2xl border p-4 text-sm font-semibold', index === 0 ? 'border-amber-300/25 bg-amber-300/10 text-amber-100' : index === 3 ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/8 text-cyan-100')}>{step}</div>)}</div><div className="mt-5 h-1 origin-left rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 website-flow-line" /></div></div></GlassPanel></Container></section>;
}

export default function WebsitesThatConvertPage() {
  return <main className="websites-convert-page relative isolate overflow-hidden"><ProductHero /><ProblemGrid /><OutputGrid /><HowItWorksTimeline /><ScopeListPanel /><BestFitPanel /><WebsiteMockup /><RelatedSystemModules /><ProductFAQAccordion /><ProductFinalCTA /></main>;
}
