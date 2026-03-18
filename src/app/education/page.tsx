import type { Metadata } from 'next';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Education | Rapid Rise AI',
  description: 'Practical AI education and training programs for teams that want faster workflows and better execution.',
  path: '/education',
});


export default function EducationPage(){return <><Hero h1="Practical training for modern work." sub="Help your team communicate better, move faster, and use tools properly." cta2="View Work" visual="/images/hero/rapid-rise-ai-education-ai-for-work-training.jpg" alt="AI for Work training keynote style" compactMobile />
<Section label="Education" title="Programs"><div className="grid gap-4 md:grid-cols-3"><Card><h3 className="font-[var(--font-jakarta)] text-xl font-semibold mb-2">AI for Work</h3><p className="text-sm text-text1 mb-3">Learn how to use assistants and modern workflows safely and effectively in real business tasks.</p><Button href="/education/ai-for-work" variant="secondary">View program</Button></Card><Card><h3 className="font-[var(--font-jakarta)] text-xl font-semibold mb-2">Team Enablement</h3><p className="text-sm text-text1 mb-3">Training plus templates plus workflow mapping for your team.</p><Button href="/quote" variant="secondary" >Request a Quote</Button></Card><Card><h3 className="font-[var(--font-jakarta)] text-xl font-semibold mb-2">1:1 Assistance</h3><p className="text-sm text-text1 mb-3">Fast help for specific tasks, workflows, and setup.</p><Button href="/contact" variant="secondary">Contact</Button></Card></div></Section></>}
