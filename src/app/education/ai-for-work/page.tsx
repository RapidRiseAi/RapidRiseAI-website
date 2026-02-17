import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

export default function AifwPage(){return <><Hero h1="Get more done with better workflows." sub="Training focused on real tasks: communication, admin, writing, planning, and process improvement. Assistants are used where they actually help." cta2="Contact" />
<Section title="What you learn"><ul className="space-y-2 text-text1">{['Clear instructions and better inputs','Consistent output and templates','Faster admin and communication','Safe usage and common mistakes','How to think in workflows, not random prompts'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
<Section title="Who it is for"><ul className="space-y-2 text-text1">{['Managers and team leads','Admin-heavy teams','Owners who want speed and consistency'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
<Section title="Format"><ul className="space-y-2 text-text1">{['Live training or remote sessions','Recordings where needed','Templates and playbooks included'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
<Section title="Want training tailored to your business?"><Button href="/quote">Request a Quote</Button></Section></>}
