import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { WorkGrid } from '@/components/ui/work-grid';
import { Button } from '@/components/ui/button';

export default function WorkPage(){
return <><Hero h1="Systems we build" sub="Clean workflows, reliable tracking, faster operations." cta2="View Work" />
<Section><WorkGrid filters={['All','Lead capture','Automations','Google Workspace','Web apps','Websites','Training']} items={[{title:'Quote request and follow-up system',problem:'Enquiries arrive from multiple places and follow-ups are inconsistent.',build:'A quote request flow that writes to a pipeline, assigns an owner, and tracks status from New to Won or Lost.',tools:['Next.js','Google Sheets','Apps Script'],outcome:'Faster response, fewer missed leads, cleaner tracking.',tag:'Lead capture',sample:true}]} /></Section>
<Section title="Want a system like this?" intro="Tell us what is currently manual and what keeps slipping through."><Button href="/quote">Request a Quote</Button></Section></>}
