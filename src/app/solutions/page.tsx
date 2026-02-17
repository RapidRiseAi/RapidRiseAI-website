import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SolutionsPage() {
  return <><Hero h1="Choose your outcome." sub="We build systems that reduce admin, speed up response, and make operations easier to run." cta2="View Work" />
  <Section title="What do you want to improve?"><div className="grid gap-4 md:grid-cols-3">{['Capture more leads','Reduce admin and mistakes','Connect tools and workflows','Upgrade your workspace','Build an internal tool','Train your team'].map((x)=><Card key={x}>{x}</Card>)}</div></Section>
  <Section title="Not sure what you need?" intro="Tell us what is currently manual and what keeps slipping through. We will recommend the cleanest next step."><Button href="/quote">Request a Quote</Button></Section></>;
}
