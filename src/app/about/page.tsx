import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About | Rapid Rise AI',
  description: 'Operating philosophy and practical delivery model for South African businesses.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <Hero
        h1="We build systems that make work easier to run."
        sub="Less chaos. Better tracking. Faster response."
        visual="/images/hero/rapid-rise-ai-about-build-philosophy-systems.jpg"
        alt="Operating philosophy for workflow systems"
        compactMobile
      />

      <Section label="Why we exist" title="Most businesses do not need more tools.">
        <Card>
          <p className="text-text1">Rapid Rise AI exists because most businesses do not need more tools. They need better systems around the tools they already use.</p>
        </Card>
      </Section>

      <Section label="Principles" title="How we build">
        <div className="grid gap-3 md:grid-cols-3">
          {['Start with the workflow', 'Fix the biggest leak first', 'Keep systems simple enough to use', 'Build for handover', 'Measure what matters', 'Improve after launch'].map((p) => (
            <Card key={p} className="p-4 text-sm text-text1">{p}</Card>
          ))}
        </div>
      </Section>

      <Section label="Comparison" title="Generic provider vs Rapid Rise AI">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-amber-300/30"><h3 className="font-semibold">Generic provider</h3><ul className="mt-2 space-y-1 text-sm text-text1"><li>• Sells tools</li><li>• Vague scope</li><li>• Poor handover</li><li>• Overbuilt systems</li></ul></Card>
          <Card className="border-blue/40"><h3 className="font-semibold">Rapid Rise AI</h3><ul className="mt-2 space-y-1 text-sm text-text1"><li>• Maps workflow</li><li>• Builds practical systems</li><li>• Documents and hands over</li><li>• Improves after launch</li></ul></Card>
        </div>
      </Section>

      <Section title="Built for South African businesses">
        <Card className="border-blue/40 p-6">
          <p className="text-sm text-text1">Registered company · Direct communication · Practical pricing · Remote-friendly · Small business friendly · Scalable for bigger teams.</p>
          <Button href="/quote" className="mt-4" arrow>Request a Quote</Button>
        </Card>
      </Section>
    </>
  );
}
