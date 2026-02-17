import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

export default function AboutPage(){return <><Hero h1="We build systems that make work easier to run." sub="Less chaos. Better tracking. Faster response." />
<Section title="Why we exist" intro="Most businesses do not have a work problem. They have a system problem. Manual processes create delays, mistakes, and missed opportunities. We build clean workflows and tools so your team can execute faster and with less effort." />
<Section title="What we focus on"><ul className="space-y-2 text-text1">{['Speed and clarity','Reliability and tracking','Practical delivery','Documentation and handover'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
<Section title="What makes us different"><ul className="space-y-2 text-text1">{['We build around real workflows, not hype','We start with quick wins, then build the core','We keep systems simple enough for teams to use','We measure what matters: time, response, tracking, conversion'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
<Section title="Tell us what is currently manual."><Button href="/quote">Request a Quote</Button></Section></>}
