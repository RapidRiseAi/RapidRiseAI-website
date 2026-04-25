import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo';
import { BusinessLeakMap, CommandCenterHero, FeatureBentoGrid, PageEndCta, StickySystemStory, TrustLayer } from '@/components/visual-system';

export const metadata: Metadata = buildMetadata({
  title: 'Rapid Rise AI | Business Automation and Software Systems',
  description: 'Manual work is costing leads, time, and control. Rapid Rise AI builds command-center systems for tracking, automation, and handover.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero
        id="home-hero"
        h1="Manual work is costing you leads, time, and control."
        sub="Rapid Rise AI builds automation systems, dashboards, portals, and workflow tools that help businesses respond faster, track better, and operate with less chaos."
        cta2="View Work"
        trustCopy="Response within 24h · Clear scope · Handover ready · Built around your tools"
        visual="/images/hero/rapid-rise-ai-business-automation-client-portal-hero.jpg"
        alt="Rapid Rise AI operations command center overview"
        compactMobile
      />

      <Section label="Command Center" title="See the system working before you read the details.">
        <CommandCenterHero />
      </Section>

      <Section label="The Leak Map" title="Where work leaks out." intro="Tap a leak and see where the system layer stabilizes response, ownership, and tracking.">
        <BusinessLeakMap />
      </Section>

      <Section label="Before and after" title="From scattered work to one operating layer.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-amber-400/40">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-300">Before</p>
            <ul className="mt-3 space-y-2 text-sm text-text1">
              <li>• Waiting for replies</li>
              <li>• Copied manually</li>
              <li>• No status visibility</li>
              <li>• Lost follow-up</li>
            </ul>
          </Card>
          <Card className="border-blue/40">
            <p className="text-xs uppercase tracking-[0.16em] text-blue">After</p>
            <ul className="mt-3 space-y-2 text-sm text-text1">
              <li>• Captured and assigned</li>
              <li>• Tracked workflows</li>
              <li>• Reported outcomes</li>
              <li>• Dashboard visibility</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section label="What we build" title="Visual system modules.">
        <FeatureBentoGrid />
      </Section>

      <Section label="Sticky story" title="Watch the system take over.">
        <StickySystemStory />
      </Section>

      <Section label="Package pathway" title="Choose your growth path.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Quick Win', '5 to 14 days', 'Fix one bottleneck such as lead follow-up, inbox routing, or support assistant.'],
            ['Core System', '2 to 6 weeks', 'Build an operational layer with dashboards, portals, and quote flows.'],
            ['Scale and Support', 'Monthly', 'Monitoring, fixes, new workflows, and ongoing optimization.'],
          ].map(([title, time, body]) => (
            <Card key={title}>
              <p className="text-xs uppercase tracking-[0.16em] text-blue">{time}</p>
              <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-text1">{body}</p>
            </Card>
          ))}
        </div>
        <Button href="/products/pricing" className="mt-6" arrow>
          View Products and Pricing
        </Button>
      </Section>

      <Section label="Build journey" title="Your build journey.">
        <div className="grid gap-3 md:grid-cols-3">
          {['Diagnose the leaks', 'Design the operating layer', 'Build and connect', 'Test with real scenarios', 'Launch and hand over', 'Improve from data'].map((step, idx) => (
            <Card key={step} className="p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-blue">Step {idx + 1}</p>
              <p className="mt-2 text-sm text-text1">{step}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section label="Trust layer" title="Built for real businesses, not demos.">
        <TrustLayer />
      </Section>

      <Section className="pt-0">
        <PageEndCta />
      </Section>
    </>
  );
}
