import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { SolutionsDiagnostic } from '@/components/solutions-diagnostic';

export const metadata: Metadata = buildMetadata({
  title: 'Solutions | Rapid Rise AI',
  description: 'Visual system library for lead capture, automation, Google Workspace, web apps, websites, and training.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Choose the system layer your business needs next."
        sub="Start with the leak that costs the most time, money, or control."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-workflow-automation-integrations-hero.jpg"
        alt="System layer selector interface"
      />

      <Section label="Diagnostic" title="What is leaking now?">
        <SolutionsDiagnostic />
      </Section>

      <Section>
        <Card className="border-blue/40 p-6 text-center">
          <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold">Need a custom recommendation?</h2>
          <p className="mt-3 text-text1">Tell us where work is stuck and we will map the cleanest next build.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/quote" arrow>Get a System Recommendation</Button>
            <Button href="/work" variant="secondary">View Work</Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
