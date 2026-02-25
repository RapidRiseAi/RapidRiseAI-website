export type WorkItem = {
  title: string;
  problem: string;
  build: string;
  tools: string[];
  outcome: string;
  tag: string;
  sample?: boolean;
  image?: string;
};

export const workItems: WorkItem[] = [
  {
    title: 'Quote request and follow-up system',
    problem: 'Enquiries arrive from multiple places and follow-ups are inconsistent.',
    build: 'A quote request flow that writes to a pipeline, assigns an owner, and tracks status from New to Won or Lost.',
    tools: ['Next.js', 'Google Sheets', 'Apps Script'],
    outcome: 'Faster response, fewer missed leads, cleaner tracking.',
    tag: 'Lead capture',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-lead-capture.jpg',
  },
  {
    title: 'Lead qualification and owner routing flow',
    problem: 'Leads are manually triaged and delayed during busy periods.',
    build: 'An automated qualification path that routes leads by service type, priority, and availability.',
    tools: ['Apps Script', 'Gmail', 'Google Sheets'],
    outcome: 'Quicker handoff and better visibility across the pipeline.',
    tag: 'Automations',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-automations.jpg',
  },
  {
    title: 'Workspace onboarding and permissions system',
    problem: 'User provisioning is inconsistent and manual checks are missed.',
    build: 'A Google Workspace onboarding system with role templates, approval checks, and checklist tracking.',
    tools: ['Google Workspace', 'Apps Script', 'Admin Console'],
    outcome: 'Cleaner onboarding and fewer access gaps.',
    tag: 'Google Workspace',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-workspace.jpg',
  },
  {
    title: 'Internal operations web app',
    problem: 'Teams rely on spreadsheets and disconnected tools for day-to-day work.',
    build: 'A lightweight web app with forms, status boards, and controlled user roles.',
    tools: ['Next.js', 'Supabase', 'Vercel'],
    outcome: 'Fewer manual updates and faster execution.',
    tag: 'Web apps',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-web-apps.jpg',
  },
  {
    title: 'Conversion-focused service website',
    problem: 'Existing site does not guide users toward clear next actions.',
    build: 'A structured website with strong service positioning, lead capture, and clean mobile UX.',
    tools: ['Next.js', 'Tailwind CSS', 'Cloudflare'],
    outcome: 'More qualified enquiries and better conversion flow.',
    tag: 'Websites',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-websites.jpg',
  },
  {
    title: 'Team enablement and handover training',
    problem: 'Systems are delivered but team adoption is inconsistent.',
    build: 'A training workflow with role-specific walkthroughs, SOPs, and follow-up support notes.',
    tools: ['Google Meet', 'Notion', 'Loom'],
    outcome: 'Higher adoption and fewer repeated support requests.',
    tag: 'Training',
    sample: true,
    image: '/images/work/rapid-rise-ai-sample-build-training.jpg',
  },
];
