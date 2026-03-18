import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { WorkGrid } from '@/components/ui/work-grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';
import { WorkProofGallery } from '@/components/ui/work-proof-gallery';
import { getWorkProofTypeLabel, workProofProjects } from '@/content/workProof';
import { workItems } from '@/content/workItems';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Work | Rapid Rise AI',
  description: 'View Rapid Rise AI work examples across lead capture, workflow automation, web apps, websites, and training systems.',
  path: '/work',
});


export default function WorkPage() {
  return (
    <>
      <Hero
        compactMobile
        h1="Systems we build"
        sub="Clean workflows, reliable tracking, faster operations."
        visual="/images/hero/rapid-rise-ai-work-hero-intake-to-handover-timeline.jpg"
        alt="Delivery timeline showing intake, build, test, launch, and handover stages"
        imageClassName="aspect-video w-full rounded-xl object-cover object-center"
        imageWidth={1600}
        imageHeight={900}
        imagePriority
      />

      <div id="proof">
        <Section label="PROOF" title="Proof of work" intro="Real builds, documented and delivered.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {workProofProjects.map((project) => (
            <Card key={project.id} className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{project.title}</h3>
                <Pill className="border-blue/50 text-blue">{getWorkProofTypeLabel(project.type)}</Pill>
              </div>

              <p className="text-sm text-text1">
                <strong className="text-text0">Built for</strong>: {project.builtForLabel}
              </p>

              <WorkProofGallery images={project.images} projectTitle={project.title} />

              <div className="space-y-3 text-sm text-text1">
                <p>
                  <strong className="text-text0">Problem:</strong> {project.problem}
                </p>
                <p>
                  <strong className="text-text0">Build:</strong> {project.build}
                </p>
                <p>
                  <strong className="text-text0">Outcome:</strong> {project.outcome}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
      </div>

      <Section>
        <WorkGrid
          filters={['All', 'Lead capture', 'Automations', 'Google Workspace', 'Web apps', 'Websites', 'Training']}
          microcopy="Sample builds are shown below."
          items={[...workItems]}
        />
      </Section>

      <Section>
        <div className="card-surface p-8">
          <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">Want a system like this?</h2>
          <p className="mt-3 text-text1">Tell us what is currently manual and what keeps slipping through.</p>
          <Button href="/quote" className="mt-5" arrow>
            Request a Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
