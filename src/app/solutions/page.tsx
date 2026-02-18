import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { FeatureGrid } from '@/components/ui/feature-grid';
import { Button } from '@/components/ui/button';

export default function SolutionsPage() {
  return <><Hero h1="Choose your outcome." sub="We build systems that reduce admin, speed up response, and make operations easier to run." cta2="View Work" visual="/images/sections/workflow-map.svg" />
  <Section label="Solutions" title="What do you want to improve?"><FeatureGrid items={[
    {title:'Capture more leads',description:'Stop missing enquiries and keep follow-ups moving.',href:'/solutions/lead-capture'},
    {title:'Reduce admin and mistakes',description:'Use cleaner workflows so execution is reliable.',href:'/solutions/workflow-automation'},
    {title:'Connect tools and workflows',description:'Sync your systems with clear triggers and handoffs.',href:'/solutions/workflow-automation'},
    {title:'Upgrade your workspace',description:'Turn Google Workspace into a structured operating system.',href:'/solutions/google-workspace'},
    {title:'Build an internal tool',description:'Track operations in one clean custom interface.',href:'/solutions/web-apps'},
    {title:'Train your team',description:'Improve consistency with practical workflow training.',href:'/solutions/training'},
  ]} /></Section>
  <Section><div className="card-surface p-8"><h3 className="font-[var(--font-jakarta)] text-2xl font-semibold">Not sure what you need?</h3><p className="mt-3 max-w-2xl text-text1">Tell us what is currently manual and what keeps slipping through. We will recommend the cleanest next step.</p><Button href="/quote" className="mt-5" arrow>Request a Quote</Button></div></Section></>;
}
