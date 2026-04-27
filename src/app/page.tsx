import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { ManualVsSystems, ProofStrip } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Steps } from '@/components/ui/steps';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { PricingCards } from '@/components/ui/pricing-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';
import { getWorkProofTypeLabel, workProofProjects } from '@/content/workProof';
import { workItems } from '@/content/workItems';
import { buildMetadata } from '@/lib/seo';
import { AnimatedGridBackground, NoiseTextureOverlay, RadialGlow, SystemLinePattern } from '@/components/system/backgrounds';
import { BentoGrid, Container as SystemContainer, SectionHeader, SectionShell, SplitLayout, VisualPanel } from '@/components/system/layout';
import { FeatureCard, MetricCard, VisualCard } from '@/components/system/cards';
import { DrawLine, MotionConnector, PulseDot, RevealOnScroll } from '@/components/system/motion';
import { systemIcons } from '@/components/system/icons';
import { HomeHero } from '@/components/home/hero/HomeHero';
import { BusinessLeakMap } from '@/components/home/business-leak-map/BusinessLeakMap';

export const metadata: Metadata = buildMetadata({
  title: 'Rapid Rise AI | AI Automation and Education',
  description: 'AI automations, chatbots, and AI education for businesses and professionals.',
  path: '/',
});


const transformationStories = [
  {
    problem: 'Leads wait hours before first response, then opportunities go cold.',
    outcome: 'Automated lead routing + instant acknowledgements keep conversations hot.',
  },
  {
    problem: 'Teams copy data manually between inboxes, sheets, and CRMs.',
    outcome: 'Tool integrations sync data in the background with cleaner reporting.',
  },
  {
    problem: 'No single view of what is blocked, delayed, or leaking money.',
    outcome: 'Executive dashboards show live status, bottlenecks, and next actions.',
  },
];

const flagshipSystems = [
  {
    title: 'Revenue Capture Engine',
    description: 'Lead capture, follow-up sequences, qualification logic, and handoff in one flow.',
    href: '/solutions/lead-capture',
  },
  {
    title: 'Operations Command Layer',
    description: 'Automations and integrations that remove repetitive admin and reduce mistakes.',
    href: '/solutions/workflow-automation',
  },
  {
    title: 'Client & Team Portals',
    description: 'Premium web apps that centralise requests, status, documents, and approvals.',
    href: '/solutions/web-apps',
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div aria-hidden className="relative h-6 bg-[linear-gradient(180deg,rgba(3,8,20,0)_0%,rgba(3,8,20,0.48)_100%)] sm:h-7 lg:h-9" />
      <BusinessLeakMap />
      <SectionShell className="overflow-hidden border-b border-border-subtle">
        <SystemLinePattern />
        <RadialGlow />
        <AnimatedGridBackground />
        <NoiseTextureOverlay />
        <SystemContainer className="relative">
          <RevealOnScroll>
            <SplitLayout
              left={(
                <SectionHeader
                  eyebrow="Business system command center"
                  title="Watch manual work become a connected operating layer"
                  description="Rapid Rise AI builds lead capture, routing, automation, portals, and dashboard systems that keep teams in control."
                />
              )}
              right={(
                <VisualPanel className="space-y-4">
                  <div className="flex items-center justify-between text-system-micro text-text-muted">
                    <span className="inline-flex items-center gap-2"><PulseDot /> Live status</span>
                    <span>Updated now</span>
                  </div>
                  <DrawLine />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Response time" value="< 60 sec" trend="Auto acknowledgements live" />
                    <MetricCard label="Pipeline visibility" value="100%" trend="Every lead tracked" />
                    <MetricCard label="Manual admin" value="-42%" trend="Automation active" />
                  </div>
                </VisualPanel>
              )}
            />
          </RevealOnScroll>
          <MotionConnector className="my-3 md:my-5" />
          <BentoGrid>
            <FeatureCard className="lg:col-span-4" icon={<systemIcons.leadCapture className="h-5 w-5" />} title="Lead Capture" description="Forms, qualification logic, and automatic routing into your preferred stack." />
            <FeatureCard className="lg:col-span-4" icon={<systemIcons.automation className="h-5 w-5" />} title="Workflow Automation" description="Inbox tasks, updates, reminders, and handovers move without manual chasing." />
            <FeatureCard className="lg:col-span-4" icon={<systemIcons.dashboard className="h-5 w-5" />} title="Executive Dashboards" description="Live boards show risk, blockers, response times, and next actions in one view." />
            <VisualCard className="lg:col-span-7">
              <p className="text-system-micro text-accent-secondary">System flow</p>
              <h3 className="mt-2 text-system-h3">Capture → Qualify → Route → Deliver → Report</h3>
              <p className="mt-2 text-system-body text-text-secondary">Each module shares context so your team and clients always see accurate status without asking for updates.</p>
            </VisualCard>
            <VisualCard className="lg:col-span-5">
              <p className="text-system-micro text-accent-primary">Built for South African teams</p>
              <ul className="mt-3 space-y-2 text-system-body text-text-secondary">
                <li className="flex items-start gap-2"><PulseDot className="mt-1 h-2 w-2" /> Clean handover documentation</li>
                <li className="flex items-start gap-2"><PulseDot className="mt-1 h-2 w-2" /> Team training and adoption support</li>
                <li className="flex items-start gap-2"><PulseDot className="mt-1 h-2 w-2" /> Practical systems aligned to daily operations</li>
              </ul>
            </VisualCard>
          </BentoGrid>
        </SystemContainer>
      </SectionShell>

      <div className="mobile-home md:hidden">
        <Section className="pt-3" label="Trusted by operators" title="Built to perform under pressure" intro="Premium systems engineered for fast moving teams.">
          <div className="grid grid-cols-2 gap-2.5">
            <Card className="premium-reveal p-3 text-center max-[640px]:min-h-[90px]">
              <p className="text-xl font-semibold text-text0">24h</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text2">Reply SLA</p>
            </Card>
            <Card className="premium-reveal p-3 text-center max-[640px]:min-h-[90px]">
              <p className="text-xl font-semibold text-text0">2 Weeks</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-text2">Quick Wins</p>
            </Card>
            <Card className="premium-reveal col-span-2 p-3 text-center max-[640px]:min-h-[90px]">
              <p className="text-xl font-semibold text-text0">100%</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text2">Handover ready</p>
            </Card>
          </div>
        </Section>

        <Section label="Transformation" title="From messy workflow to premium execution">
          <MobileSnapCarousel itemClassName="w-[92%]">
            {transformationStories.map((story, index) => (
              <Card key={story.problem} className="premium-reveal min-h-[196px] overflow-hidden p-4 max-[640px]:min-h-[172px] max-[640px]:p-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-danger/90">Before</p>
                <p className="mt-2 mobile-copy text-text1">{story.problem}</p>
                <div className="my-3 h-px w-full bg-stroke" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-success">After</p>
                <p className="mt-2 mobile-copy text-text0">{story.outcome}</p>
                <p className="micro-label mt-3 inline-flex rounded-full border border-blue/35 bg-blue/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-blue">Scenario {index + 1}</p>
              </Card>
            ))}
          </MobileSnapCarousel>
        </Section>

        <Section label="Flagship systems" title="Start with the highest ROI layer">
          <MobileSnapCarousel>
            {flagshipSystems.map((system) => (
              <Card key={system.title} className="premium-reveal min-h-[196px] p-4 max-[640px]:min-h-[174px] max-[640px]:p-3.5">
                <Sparkles className="premium-float h-5 w-5 text-blue" />
                <h3 className="mt-3 font-[var(--font-jakarta)] text-[1.55rem] font-semibold leading-[1.15] max-[640px]:text-[1.35rem]">{system.title}</h3>
                <p className="mt-2.5 mobile-copy text-text1">{system.description}</p>
                <Link href={system.href} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-blue">
                  Explore system <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </MobileSnapCarousel>
          <div className="repeated-mobile-cta mt-3 px-4">
            <Button href="/solutions" variant="secondary" className="w-full">
              View all solutions
            </Button>
          </div>
        </Section>

        <Section label="Proof" title="Swipe recent work">
          <MobileSnapCarousel>
            {workProofProjects.slice(0, 4).map((project) => (
              <Card key={project.id} className="space-y-2.5 p-4 max-[640px]:p-3.5">
                <Image
                  src={project.images[0]?.src ?? '/images/work/to-be-replaced.jpg'}
                  alt={project.images[0]?.alt ?? `${project.title} preview`}
                  width={1200}
                  height={675}
                  className="aspect-video w-full rounded-xl border border-stroke object-cover object-center"
                  loading="lazy"
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-[var(--font-jakarta)] text-base font-semibold leading-tight max-[640px]:text-[15px]">{project.title}</h3>
                  <Pill className="border-blue/50 text-blue">{getWorkProofTypeLabel(project.type)}</Pill>
                </div>
                <p className="mobile-copy text-text1">{project.builtForLabel}</p>
              </Card>
            ))}
          </MobileSnapCarousel>
          <div className="repeated-mobile-cta mt-3 px-4">
            <Button href="/work" variant="secondary" className="w-full">
              View all proof
            </Button>
          </div>
        </Section>

        <Section label="Delivery" title="How your system gets shipped">
          <div className="space-y-3 px-4 mobile-stack-tight">
            {[
              'Diagnose leaks and map your workflow in detail.',
              'Build and connect the stack with clean QA and checks.',
              'Train your team and hand over operating docs.',
            ].map((step, idx) => (
              <Card key={step} className="flex items-center gap-3 p-4 max-[640px]:gap-2.5 max-[640px]:p-3.5">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue/60 bg-blue/15 text-sm font-semibold text-blue max-[640px]:h-7 max-[640px]:w-7 max-[640px]:text-xs">{idx + 1}</div>
                <p className="mobile-copy text-text1">{step}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section label="Packages" title="Choose your growth pace">
          <MobileSnapCarousel>
            {[
              {
                title: 'Quick Wins',
                subtitle: '2 weeks',
                bullets: ['Immediate bottleneck fixes', 'Fast automation deployment', 'Measurable efficiency gains'],
              },
              {
                title: 'Core System',
                subtitle: '4 to 6 weeks',
                bullets: ['End-to-end workflow build', 'Integrations + dashboards', 'Team onboarding and training'],
              },
              {
                title: 'Scale & Support',
                subtitle: 'Monthly',
                bullets: ['Ongoing optimisations', 'Performance monitoring', 'Strategic roadmap support'],
              },
            ].map((pack) => (
              <Card key={pack.title} className="min-h-[196px] p-4 max-[640px]:min-h-[172px] max-[640px]:p-3.5">
                <p className="micro-label text-xs uppercase tracking-[0.18em] text-blue">{pack.subtitle}</p>
                <h3 className="mt-2 font-[var(--font-jakarta)] text-[1.55rem] font-semibold max-[640px]:text-[1.35rem]">{pack.title}</h3>
                <ul className="mt-3 space-y-2 mobile-copy text-text1 max-[640px]:space-y-1.5">
                  {pack.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </MobileSnapCarousel>
        </Section>

        <Section label="FAQ" title="Questions we get a lot">
          <div className="px-4">
            <FAQAccordion
              items={[
                { q: 'Do you work with our current tools?', a: 'Yes. We usually improve what you already use before recommending changes.' },
                { q: 'How fast can you deliver value?', a: 'Quick Wins are designed to show value within 2 weeks.' },
                { q: 'Do you build websites and web apps too?', a: 'Yes. We build internal tools and public sites when it supports the workflow.' },
                { q: 'What does handover look like?', a: 'You get documentation, training, and ownership of your workflow.' },
              ]}
            />
          </div>
        </Section>

        <Section className="pt-2">
          <div className="px-4">
            <Card className="border-blue/35 p-5 max-[640px]:p-4">
              <p className="micro-label text-xs uppercase tracking-[0.18em] text-blue">Ready to scale?</p>
              <h2 className="mt-2 font-[var(--font-jakarta)] text-[2rem] font-semibold leading-[1.08] max-[640px]:text-[1.75rem]">Stop the leaks. Build the system.</h2>
              <p className="mt-3 mobile-copy text-text1">Premium execution, clear communication, and ownership from day one.</p>
              <div className="mobile-final-cta mt-4 grid gap-2">
                <Button href="/quote" arrow>
                  Request a Quote
                </Button>
                <Button href="/work" variant="secondary">
                  View Work
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </div>

      <div className="hidden md:block">
        <ProofStrip />
        <Section label="Services" title="What we build" intro="Pick what you need now. Expand later.">
          <FeatureGrid
            items={[
              { title: 'Lead Capture and Follow Up', description: 'Turn enquiries into tracked requests and consistent follow-ups.', href: '/solutions/lead-capture' },
              { title: 'Workflow Automation and Integrations', description: 'Connect tools, remove repetition, keep work moving.', href: '/solutions/workflow-automation' },
              { title: 'Smart Google Workspace', description: 'Automate Sheets, Gmail, Drive, Calendar, approvals, and reporting.', href: '/solutions/google-workspace' },
              { title: 'Web Apps and Internal Tools', description: 'Portals, dashboards, trackers, and lightweight internal systems.', href: '/solutions/web-apps' },
              { title: 'Websites that Convert', description: 'Clean messaging, strong trust, better capture.', href: '/solutions/websites' },
              { title: 'Training and Enablement', description: 'Help your team use modern tools properly and safely.', href: '/solutions/training' },
            ]}
          />
        </Section>
        <Section label="PROOF" title="Featured proof" intro="A few recent builds and demos.">
          <div className="grid gap-4 md:grid-cols-3">
            {workProofProjects.map((project) => (
              <Card key={project.id} className="space-y-4 p-4">
                <Image
                  src={project.images[0]?.src ?? '/images/work/to-be-replaced.jpg'}
                  alt={project.images[0]?.alt ?? `${project.title} preview`}
                  width={1200}
                  height={675}
                  className="aspect-video w-full rounded-xl border border-stroke object-cover object-center"
                  loading="lazy"
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-[var(--font-jakarta)] text-lg font-semibold">{project.title}</h3>
                  <Pill className="border-blue/50 text-blue">{getWorkProofTypeLabel(project.type)}</Pill>
                </div>
                <p className="text-sm text-text1">{project.builtForLabel}</p>
                <Button href="/work#proof" variant="secondary">
                  See proof
                </Button>
              </Card>
            ))}
          </div>
        </Section>
        <ManualVsSystems />
        <Section label="Process" title="How we work">
          <Steps
            items={[
              { title: 'Diagnose the leaks', body: 'We map the workflow and find where leads, time, and accuracy are being lost.' },
              { title: 'Build the system', body: 'We automate the repetitive work, connect tools, and build any internal pages or dashboards required.' },
              { title: 'Improve and scale', body: 'We refine the system based on what the data shows and what the team actually needs.' },
            ]}
          />
        </Section>
        <Section label="Portfolio" title="Systems we build" intro="You do not need everything. You need the right system.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workItems.map((item) => (
              <Card key={item.title}>
                <Image
                  src={item.image ?? '/images/work/rapid-rise-ai-sample-build-automations.jpg'}
                  alt={`Sample build preview: ${item.title}`}
                  width={1200}
                  height={675}
                  className="mb-4 h-36 w-full rounded-xl border border-stroke object-cover"
                  loading="lazy"
                />
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-[var(--font-jakarta)] font-semibold">{item.title}</h3>
                  {item.sample ? <Pill className="border-blue/50 text-blue">Sample build</Pill> : null}
                </div>
                <p className="mt-2 text-sm text-text1">{item.outcome}</p>
                <a href="/work" className="mt-3 inline-flex items-center gap-2 text-sm text-blue">
                  View work <ArrowRight className="h-4 w-4" />
                </a>
              </Card>
            ))}
          </div>
        </Section>
        <Section label="Pricing" title="Simple packages. Clean delivery." intro="Start small, build the core, then scale.">
          <PricingCards cards={[{ title: 'Quick Wins (2 weeks)', includes: [] }, { title: 'Core System (4 to 6 weeks)', includes: [] }, { title: 'Scale and Support (monthly)', includes: [] }]} />
        </Section>
        <Section label="FAQ" title="Questions we get a lot">
          <FAQAccordion
            items={[
              { q: 'Do you work with our current tools?', a: 'Yes. We usually improve what you already use before recommending changes.' },
              { q: 'How fast can you deliver value?', a: 'Quick Wins are designed to show value within 2 weeks.' },
              { q: 'Do you build websites and web apps too?', a: 'Yes. We build internal tools and public sites when it supports the workflow.' },
              { q: 'Do you only do chatbots?', a: 'No. Assistants are one part of a bigger system.' },
              { q: 'What does handover look like?', a: 'You get documentation, training, and ownership of your workflow.' },
            ]}
          />
        </Section>
        <Section>
          <Card className="border-blue/40 p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm text-blue">Ready to start</p>
                <h2 className="mt-2 font-[var(--font-jakarta)] text-3xl font-semibold">Stop the leaks. Build the system.</h2>
                <p className="mt-3 text-sm text-text1">Response within 24 hours. No spam. No pressure.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/quote" arrow className="max-md:hidden">
                  Request a Quote
                </Button>
                <Button href="/work" variant="secondary">
                  View Work
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </>
  );
}
