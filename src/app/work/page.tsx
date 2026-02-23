import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { WorkGrid } from '@/components/ui/work-grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function WorkPage(){
return <><Hero h1="Systems we build" sub="Clean workflows, reliable tracking, faster operations." cta2="View Work" visual="/images/hero/rapid-rise-ai-work-examples-sample-builds-gallery.jpg" alt="Gallery of sample builds and systems" />
<Section><Card><p className="text-sm text-text1">More proof is added here as we deliver systems.</p></Card></Section>
<Section><WorkGrid filters={['All','Lead capture','Automations','Google Workspace','Web apps','Websites','Training']} items={[{title:'Quote request and follow-up system',problem:'Enquiries arrive from multiple places and follow-ups are inconsistent.',build:'A quote request flow that writes to a pipeline, assigns an owner, and tracks status from New to Won or Lost.',tools:['Next.js','Google Sheets','Apps Script'],outcome:'Faster response, fewer missed leads, cleaner tracking.',tag:'Lead capture',sample:true,image:'/images/work/work-01.svg'}]} /></Section>
<Section><div className="card-surface p-8"><h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">Want a system like this?</h2><p className="mt-3 text-text1">Tell us what is currently manual and what keeps slipping through.</p><Button href="/quote" className="mt-5" arrow>Request a Quote</Button></div></Section></>}
