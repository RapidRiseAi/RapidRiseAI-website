import { siteContent } from '@/content/siteContent';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Steps } from '@/components/ui/steps';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { PricingCards } from '@/components/ui/pricing-cards';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pill } from '@/components/ui/pill';

export default function HomePage() {
  return (
    <>
      <Hero h1={siteContent.home.hero.h1} sub={siteContent.home.hero.sub} cta2="View Work" />
      <Section title="Built for real operations"><div className="grid gap-3 md:grid-cols-3">{['Google Workspace automation','Workflow integrations','Web apps and internal tools','Lead capture systems','Support assistants when needed','Documentation and handover'].map((i)=> <Card key={i}>{i}</Card>)}</div></Section>
      <Section title="What we build" intro="Pick what you need now. Expand later."><FeatureGrid items={[{title:'Lead Capture and Follow Up',description:'Turn enquiries into tracked requests and consistent follow-ups.'},{title:'Workflow Automation and Integrations',description:'Connect tools, remove repetition, keep work moving.'},{title:'Smart Google Workspace',description:'Automate Sheets, Gmail, Drive, Calendar, approvals, and reporting.'},{title:'Web Apps and Internal Tools',description:'Portals, dashboards, trackers, and lightweight internal systems.'},{title:'Websites that Convert',description:'Clean messaging, strong trust, better capture.'},{title:'Training and Enablement',description:'Help your team use modern tools properly and safely.'}]} /></Section>
      <Section title="What it costs you when it stays manual"><ul className="space-y-2 text-text1">{['Enquiries go cold while you are busy','Follow-ups get delayed or forgotten','Admin eats time that should go to revenue','Mistakes happen when data is copied by hand','Nothing is tracked properly, so nothing improves','The team relies on memory, not systems'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
      <Section title="What you get with proper systems"><ul className="space-y-2 text-text1">{['Faster response times','Less admin and fewer handoffs','Fewer mistakes and less rework','Better tracking and visibility','Cleaner operations across teams and tools','A workflow that works even when staff are offline'].map((x)=><li key={x}>• {x}</li>)}</ul></Section>
      <Section title="How we work"><Steps items={[{title:'Diagnose the leaks',body:'We map the workflow and find where leads, time, and accuracy are being lost.'},{title:'Build the system',body:'We automate the repetitive work, connect tools, and build any internal pages or dashboards required.'},{title:'Improve and scale',body:'We refine the system based on what the data shows and what the team actually needs.'}]} /></Section>
      <Section title="Systems we build" intro="You do not need everything. You need the right system."><div className="grid gap-4 md:grid-cols-3">{['Enquiry to quote pipeline','Follow-up reminders and escalation','Workspace automation for admin tasks','Internal dashboards and reporting','Onboarding and folder automation','Sample build: Hospitality enquiry assistant'].map((x)=><Card key={x}><div className="flex items-center gap-2">{x}{x.includes('Sample')?<Pill>Sample build</Pill>:null}</div></Card>)}</div><div className="mt-6"><Button href="/work" variant="secondary">View Work</Button></div></Section>
      <Section title="Simple packages. Clean delivery." intro="Start small, build the core, then scale."><PricingCards cards={[{title:'Quick Wins (2 weeks)',includes:[]},{title:'Core System (4 to 6 weeks)',includes:[]},{title:'Scale and Support (monthly)',includes:[]}]} /><div className="mt-6"><Button href="/quote">Request a Quote</Button></div></Section>
      <Section title="Questions we get a lot"><FAQAccordion items={[{q:'Do you work with our current tools?',a:'Yes. We usually improve what you already use before recommending changes.'},{q:'How fast can you deliver value?',a:'Quick Wins are designed to show value within 2 weeks.'},{q:'Do you build websites and web apps too?',a:'Yes. We build internal tools and public sites when it supports the workflow.'},{q:'Do you only do chatbots?',a:'No. Assistants are one part of a bigger system.'},{q:'What does handover look like?',a:'You get documentation, training, and ownership of your workflow.'}]} /></Section>
      <Section title="Stop the leaks. Build the system."><Button href="/quote">Request a Quote</Button><p className="mt-3 text-sm text-text1">Response within 24 hours.</p></Section>
    </>
  );
}
