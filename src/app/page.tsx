import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteContent } from '@/content/siteContent';
import { Hero, ManualVsSystems, ProofStrip } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Steps } from '@/components/ui/steps';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { PricingCards } from '@/components/ui/pricing-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';
import { getWorkProofTypeLabel, workProofProjects } from '@/content/workProof';
import { workItems } from '@/content/workItems';

export default function HomePage() {
  return (
    <>
      <Hero h1={siteContent.home.hero.h1} sub={siteContent.home.hero.sub} cta2="View Work" visual="/images/hero/rapid-rise-ai-business-automation-client-portal-hero.jpg" alt="Client portal dashboard with integrations" compactMobile />
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
              <div className="flex items-start justify-between gap-3">
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
    </>
  );
}
