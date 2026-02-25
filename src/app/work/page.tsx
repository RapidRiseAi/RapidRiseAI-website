import Image from 'next/image';
import { Hero } from '@/components/page-template';
import { Section } from '@/components/ui/section';
import { WorkGrid } from '@/components/ui/work-grid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const workItems = [
  {
    title: 'Quote request and follow-up system',
    problem: 'Enquiries arrive from multiple places and follow-ups are inconsistent.',
    build: 'A quote request flow that writes to a pipeline, assigns an owner, and tracks status from New to Won or Lost.',
    tools: ['Next.js', 'Google Sheets', 'Apps Script'],
    outcome: 'Faster response, fewer missed leads, cleaner tracking.',
    tag: 'Lead capture',
    sample: true,
  },
  {
    title: 'Lead qualification and owner routing flow',
    problem: 'Leads are manually triaged and delayed during busy periods.',
    build: 'An automated qualification path that routes leads by service type, priority, and availability.',
    tools: ['Apps Script', 'Gmail', 'Google Sheets'],
    outcome: 'Quicker handoff and better visibility across the pipeline.',
    tag: 'Automations',
    sample: true,
  },
  {
    title: 'Workspace onboarding and permissions system',
    problem: 'User provisioning is inconsistent and manual checks are missed.',
    build: 'A Google Workspace onboarding system with role templates, approval checks, and checklist tracking.',
    tools: ['Google Workspace', 'Apps Script', 'Admin Console'],
    outcome: 'Cleaner onboarding and fewer access gaps.',
    tag: 'Google Workspace',
    sample: true,
  },
  {
    title: 'Internal operations web app',
    problem: 'Teams rely on spreadsheets and disconnected tools for day-to-day work.',
    build: 'A lightweight web app with forms, status boards, and controlled user roles.',
    tools: ['Next.js', 'Supabase', 'Vercel'],
    outcome: 'Fewer manual updates and faster execution.',
    tag: 'Web apps',
    sample: true,
  },
  {
    title: 'Conversion-focused service website',
    problem: 'Existing site does not guide users toward clear next actions.',
    build: 'A structured website with strong service positioning, lead capture, and clean mobile UX.',
    tools: ['Next.js', 'Tailwind CSS', 'Cloudflare'],
    outcome: 'More qualified enquiries and better conversion flow.',
    tag: 'Websites',
    sample: true,
  },
  {
    title: 'Team enablement and handover training',
    problem: 'Systems are delivered but team adoption is inconsistent.',
    build: 'A training workflow with role-specific walkthroughs, SOPs, and follow-up support notes.',
    tools: ['Google Meet', 'Notion', 'Loom'],
    outcome: 'Higher adoption and fewer repeated support requests.',
    tag: 'Training',
    sample: true,
  },
];

const proofCards = [
  {
    title: 'Handover pack',
    image: '/images/work/rapid-rise-ai-work-proof-handover-pack.jpg',
    alt: 'Handover pack deliverables including setup guide, admin notes, and team walkthrough',
    bullets: ['Setup guide', 'Admin notes', 'Team walkthrough'],
  },
  {
    title: 'Build map',
    image: '/images/work/rapid-rise-ai-work-proof-build-map.jpg',
    alt: 'Build map showing modules connected through an integration layer',
    bullets: ['System map before build', 'Integration points defined', 'Single source of truth'],
  },
  {
    title: 'Quality checks',
    image: '/images/work/rapid-rise-ai-work-proof-qa-checklist.jpg',
    alt: 'Quality checks panel showing access verification, error handling, and logging',
    bullets: ['Access verified', 'Errors handled', 'Edge cases tested'],
  },
];

export default function WorkPage() {
  return (
    <>
      <Hero
        h1="Systems we build"
        sub="Clean workflows, reliable tracking, faster operations."
        cta2="View Work"
        visual="/images/hero/rapid-rise-ai-work-hero-intake-to-handover-timeline.jpg"
        alt="Delivery timeline showing intake, build, test, launch, and handover stages"
        imageClassName="aspect-video w-full rounded-xl object-cover object-center"
        imageWidth={1600}
        imageHeight={900}
        imagePriority
      />

      <Section label="PROOF" title="Proof you can verify" intro="Process, QA, and handover are built into every delivery.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofCards.map((card) => (
            <Card key={card.title} className="p-4">
              <Image
                src={card.image}
                alt={card.alt}
                width={1200}
                height={675}
                className="mb-4 aspect-video w-full rounded-xl border border-stroke object-cover object-center"
                loading="lazy"
              />
              <h3 className="font-[var(--font-jakarta)] text-xl font-semibold">{card.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-text1">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <WorkGrid
          filters={['All', 'Lead capture', 'Automations', 'Google Workspace', 'Web apps', 'Websites', 'Training']}
          microcopy="Sample builds are shown below. Real project screenshots are added as systems go live."
          items={[...workItems]}
        />
      </Section>

      <Section>
        <div className="card-surface p-8">
          <h2 className="font-[var(--font-jakarta)] text-2xl font-semibold">Want a system like this?</h2>
          <p className="mt-3 text-text1">Tell us what is currently manual and what keeps slipping through.</p>
          <Button href="/quote" className="mt-5" arrow>
            Request a Quote
          </Button>
        </div>
      </Section>
    </>
  );
}
