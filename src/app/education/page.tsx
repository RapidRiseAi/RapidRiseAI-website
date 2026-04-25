import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Education | Rapid Rise AI',
  description: 'Training that turns tools into daily execution for practical teams.',
  path: '/education',
});

export default function EducationPage() {
  return (
    <>
      <Hero
        h1="Training that turns tools into daily execution."
        sub="Practical AI, automation, and workflow training for teams that need to move faster without creating chaos."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-education-ai-for-work-training.jpg"
        alt="Team enablement training session"
        compactMobile
      />

      <Section label="Programs" title="AI for Work, Team Enablement, and 1:1 Assistance.">
        <div className="grid gap-4 md:grid-cols-3">
          {['AI for Work', 'Team Enablement', '1:1 Assistance'].map((p) => (
            <Card key={p}><h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">{p}</h3><p className="mt-2 text-sm text-text1">Practical sessions, templates, and implementation support.</p></Card>
          ))}
        </div>
      </Section>

      <Section label="Learning journey" title="Adoption flow">
        <div className="grid gap-3 md:grid-cols-3">
          {['Understand AI safely', 'Use assistants properly', 'Build repeatable prompts', 'Automate small workflows', 'Use dashboards and SOPs', 'Adopt systems confidently'].map((step) => (
            <Card key={step} className="p-4 text-sm text-text1">{step}</Card>
          ))}
        </div>
      </Section>

      <Section title="Systems fail when teams do not adopt them.">
        <Card className="border-blue/40 p-6">
          <p className="text-text1">System built → Team trained → SOP followed → Usage improves → Data improves.</p>
          <Button href="/quote" className="mt-4" arrow>Start the Build</Button>
        </Card>
      </Section>
    </>
  );
}
