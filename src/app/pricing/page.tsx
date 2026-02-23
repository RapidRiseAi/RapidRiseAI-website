import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { PricingCards } from '@/components/ui/pricing-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PricingPage(){return <><Hero h1="Simple packages. Clean delivery." sub="Pricing depends on complexity, but delivery stays structured and predictable." visual="/images/hero/rapid-rise-ai-pricing-packages-quick-wins-core-system-scale.jpg" alt="Service packages and pricing overview" />
<Section><PricingCards cards={[{title:'Quick Wins (2 weeks)',bestFor:'fixing obvious bottlenecks fast',includes:['Workflow review','1 to 3 automations or improvements','Basic tracking and handover','Documentation']},{title:'Core System (4 to 6 weeks)',bestFor:'an end-to-end system build',includes:['Workflow mapping','Integrations and automation pipeline','Internal tracking and reporting','Documentation and training']},{title:'Scale and Support (monthly)',bestFor:'ongoing improvements',includes:['Monitoring and refinement','New workflows or upgrades each month','Priority support','Continuous optimisation']}]} /></Section>
<Section><Card><h3 className="font-[var(--font-jakarta)] text-xl font-semibold">How pricing works</h3><p className="mt-3 text-text1">We scope based on workflow complexity, tool access, and the number of handoffs. You get a clear scope before anything starts.</p><Button href="/quote" className="mt-5" arrow>Request a Quote</Button></Card></Section></>}
