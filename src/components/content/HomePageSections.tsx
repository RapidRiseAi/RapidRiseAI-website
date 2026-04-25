import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionShell } from '@/components/layout/SectionShell';
import { siteContent } from '@/content/siteContent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FeatureBentoGrid } from './FeatureBentoGrid';
import { ProcessTimeline } from './ProcessTimeline';
import { TrustGrid } from './TrustGrid';
import { PricingSystemCard } from './PricingSystemCard';
import { BeforeAfterWorkflow } from '@/components/visual-system/BeforeAfterWorkflow';

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

export function HomePageSections() {
  return (
    <>
      <PageHero
        id="home-hero"
        h1={siteContent.home.hero.h1}
        sub={siteContent.home.hero.sub}
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-business-automation-client-portal-hero.jpg"
        alt="Rapid Rise AI team working on system delivery"
        mobileImageClassName="h-full w-full object-contain object-center md:object-contain"
        mobileImageFrameClassName="aspect-video max-[640px]:rounded-[18px] max-[640px]:bg-[#070c18]"
        compactMobile
      />

      <SectionShell className="pt-3" label="Trusted by operators" title="Built to perform under pressure" intro="Premium systems engineered for fast moving teams.">
        <TrustGrid items={[{ value: '24h', label: 'Reply SLA' }, { value: '2 Weeks', label: 'Quick Wins' }, { value: '100%', label: 'Handover ready' }]} />
      </SectionShell>

      <SectionShell label="Transformation" title="From messy workflow to premium execution">
        <div className="grid gap-3 md:grid-cols-3">
          {transformationStories.map((story) => <BeforeAfterWorkflow key={story.problem} before={story.problem} after={story.outcome} />)}
        </div>
      </SectionShell>

      <SectionShell label="Services" title="Start with the highest ROI layer">
        <FeatureBentoGrid
          items={[
            { title: 'Lead Capture and Follow Up', description: 'Turn enquiries into tracked requests and consistent follow-ups.', href: '/solutions/lead-capture' },
            { title: 'Workflow Automation and Integrations', description: 'Connect tools, remove repetition, keep work moving.', href: '/solutions/workflow-automation' },
            { title: 'Smart Google Workspace', description: 'Automate Sheets, Gmail, Drive, Calendar, approvals, and reporting.', href: '/solutions/google-workspace' },
            { title: 'Web Apps and Internal Tools', description: 'Portals, dashboards, trackers, and lightweight internal systems.', href: '/solutions/web-apps' },
            { title: 'Websites that Convert', description: 'Clean messaging, strong trust, better capture.', href: '/solutions/websites' },
            { title: 'Training and Enablement', description: 'Help your team use modern tools properly and safely.', href: '/solutions/training' },
          ]}
        />
        <div className="mt-5">
          <Button href="/solutions" variant="secondary">View all solutions</Button>
        </div>
      </SectionShell>

      <SectionShell label="Delivery" title="How your system gets shipped">
        <ProcessTimeline items={[{ title: 'Diagnose', body: 'Map leaks and current workflow in detail.' }, { title: 'Build', body: 'Connect stack, automate handoffs, and validate output quality.' }, { title: 'Enable', body: 'Train your team, document ownership, and improve performance.' }]} />
      </SectionShell>

      <SectionShell label="Packages" title="Choose your growth pace">
        <div className="grid gap-4 md:grid-cols-3">
          <PricingSystemCard title="Quick Wins" bestFor="2 weeks" includes={['Immediate bottleneck fixes', 'Fast automation deployment', 'Measurable efficiency gains']} />
          <PricingSystemCard title="Core System" bestFor="4 to 6 weeks" featured includes={['End-to-end workflow build', 'Integrations + dashboards', 'Team onboarding and training']} />
          <PricingSystemCard title="Scale & Support" bestFor="Monthly" includes={['Ongoing optimisations', 'Performance monitoring', 'Strategic roadmap support']} />
        </div>
      </SectionShell>

      <SectionShell className="pt-2">
        <Card className="border-blue/35 p-5">
          <h2 className="mt-2 font-[var(--font-jakarta)] text-[2rem] font-semibold leading-[1.08]">Stop the leaks. Build the system.</h2>
          <p className="mt-3 text-text1">Premium execution, clear communication, and ownership from day one.</p>
          <div className="mt-4 grid gap-2 md:grid-cols-[auto_auto_1fr] md:items-center">
            <Button href="/quote" arrow>Request a Quote</Button>
            <Button href="/work" variant="secondary">View Work</Button>
            <Link href="/book" className="inline-flex items-center gap-2 text-sm text-blue">Book discovery <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Card>
      </SectionShell>
    </>
  );
}
