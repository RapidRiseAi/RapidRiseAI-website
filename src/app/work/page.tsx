import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WorkGrid } from '@/components/ui/work-grid';
import { WorkProofGallery } from '@/components/ui/work-proof-gallery';
import { workProofProjects } from '@/content/workProof';
import { workItems } from '@/content/workItems';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Work | Rapid Rise AI',
  description: 'Proof of systems built for real operations across dashboards, portals, workflows, and automations.',
  path: '/work',
});

export default function WorkPage() {
  const tj = workProofProjects.find((p) => p.title.includes('TJ')) ?? workProofProjects[0];
  const pet = workProofProjects.find((p) => p.title.includes('Pet')) ?? workProofProjects[1];

  return (
    <>
      <Hero
        compactMobile
        h1="Proof of systems built for real operations."
        sub="Dashboards, portals, workflows, and automation layers designed to remove friction."
        visual="/images/hero/rapid-rise-ai-work-hero-intake-to-handover-timeline.jpg"
        alt="Rapid Rise AI work proof timeline"
      />

      <Section label="Featured" title="TJ Service & Repairs">
        <Card className="space-y-4 border-blue/40">
          <p className="text-sm text-text1"><strong className="text-text0">Problem:</strong> Operations were tracked manually and status was hard to see at a glance.</p>
          <p className="text-sm text-text1"><strong className="text-text0">Build:</strong> Business management system with client dashboard and structured tracking.</p>
          <p className="text-sm text-text1"><strong className="text-text0">Outcome:</strong> Cleaner tracking and better visibility across jobs and updates.</p>
          {tj ? <WorkProofGallery images={tj.images} projectTitle={tj.title} /> : null}
        </Card>
      </Section>

      <Section label="Secondary" title="PetGuardian and sample builds">
        {pet ? (
          <Card className="mb-4 space-y-3">
            <h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{pet.title}</h3>
            <WorkProofGallery images={pet.images} projectTitle={pet.title} />
          </Card>
        ) : null}
        <WorkGrid
          filters={['All', 'Lead Capture', 'Automations', 'Google Workspace', 'Web Apps', 'Websites', 'Training']}
          microcopy="Filtered sample builds"
          items={[...workItems]}
        />
      </Section>

      <Section>
        <Card className="border-blue/40 p-6 text-center">
          <h2 className="font-[var(--font-jakarta)] text-3xl font-semibold">Need this level of control?</h2>
          <p className="mt-3 text-text1">Tell us what is manual and we will map the right system build.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/quote" arrow>Request a Quote</Button>
            <Button href="/products/pricing" variant="secondary">View Pricing</Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
