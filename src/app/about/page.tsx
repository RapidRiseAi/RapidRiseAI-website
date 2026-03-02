import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileSnapCarousel } from '@/components/ui/mobile-snap-carousel';

export default function AboutPage(){return <><Hero h1="We build systems that make work easier to run." sub="Less chaos. Better tracking. Faster response." visual="/images/hero/rapid-rise-ai-about-build-philosophy-systems.jpg" alt="System build blueprint and handover pack" compactMobile />
<Section label="About" title="Why we exist" intro="Most businesses do not have a work problem. They have a system problem. Manual processes create delays, mistakes, and missed opportunities. We build clean workflows and tools so your team can execute faster and with less effort." />
<Section title="What we focus on"><MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">{['Speed and clarity','Reliability and tracking','Practical delivery','Documentation and handover'].map((x)=><Card key={x}>{x}</Card>)}</MobileSnapCarousel></Section>
<Section title="What makes us different"><MobileSnapCarousel desktopClassName="md:grid-cols-2" itemClassName="w-[90%] md:w-auto">{['We build around real workflows, not hype','We start with quick wins, then build the core','We keep systems simple enough for teams to use','We measure what matters: time, response, tracking, conversion'].map((x)=><Card key={x}>{x}</Card>)}</MobileSnapCarousel></Section>
<Section><Card className="flex flex-wrap items-center justify-between gap-4"><h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">Tell us what is currently manual.</h2><Button href="/quote" arrow >Request a Quote</Button></Card></Section></>}
