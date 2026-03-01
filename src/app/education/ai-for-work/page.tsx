import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AifwPage(){return <><Hero h1="Get more done with better workflows." sub="Training focused on real tasks: communication, admin, writing, planning, and process improvement. Assistants are used where they actually help." cta2="Contact" visual="/images/hero/rapid-rise-ai-education-ai-for-work-hero.jpg" alt="AI for Work keynote style training slide" imagePriority />
<Section title="What you learn"><div className="grid gap-4 md:grid-cols-2">{['Clear instructions and better inputs','Consistent output and templates','Faster admin and communication','Safe usage and common mistakes','How to think in workflows, not random prompts'].map((x)=><Card key={x}>{x}</Card>)}</div></Section>
<Section title="Who it is for"><div className="grid gap-4 md:grid-cols-3">{['Managers and team leads','Admin-heavy teams','Owners who want speed and consistency'].map((x)=><Card key={x}>{x}</Card>)}</div></Section>
<Section title="Format"><div className="grid gap-4 md:grid-cols-3">{['Live training or remote sessions','Recordings where needed','Templates and playbooks included'].map((x)=><Card key={x}>{x}</Card>)}</div></Section>
<Section><Card className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">Want training tailored to your business?</h2><Button href="/quote" arrow className="max-md:hidden">Request a Quote</Button></Card></Section></>}
