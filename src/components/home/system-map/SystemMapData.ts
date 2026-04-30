import {
  Briefcase,
  Building2,
  Cog,
  Contact,
  DollarSign,
  GraduationCap,
  Layers,
  LayoutDashboard,
  MonitorSmartphone,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ServiceModule = {
  id: string;
  title: string;
  description: string;
};

export type SystemLocation = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: string;
  size: 'large' | 'medium' | 'small';
  position: { x: number; y: number };
  previewBullets: string[];
  detail: {
    problem: string;
    solution: string;
    outcomes: string[];
    tools: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  children?: ServiceModule[];
};

export const serviceModules: ServiceModule[] = [
  { id: 'lead-capture', title: 'Lead Capture Engine', description: 'Capture, qualify, and route leads instantly.' },
  { id: 'workflow-automation', title: 'Workflow Automation', description: 'Automate repetitive operational handoffs.' },
  { id: 'smart-workspace', title: 'Smart Google Workspace', description: 'Connect Gmail, Sheets, Drive, and Docs with automation.' },
  { id: 'web-apps-tools', title: 'Web Apps and Internal Tools', description: 'Custom portals and internal applications for daily operations.' },
  { id: 'websites-convert', title: 'Websites that Convert', description: 'Conversion-first websites integrated into your workflows.' },
  { id: 'training-enablement', title: 'Training and Enablement', description: 'Practical onboarding and SOP-backed rollout support.' },
  { id: 'support-assistant', title: 'Support Assistant', description: 'Faster responses and cleaner support handoffs.' },
];

export const systemLocations: SystemLocation[] = [
  {
    id: 'services',
    title: 'Services',
    description: 'Core offerings and strategic systems.',
    icon: Layers,
    status: 'Core layer',
    size: 'large',
    position: { x: 50, y: 74 },
    previewBullets: ['Lead capture', 'Automation', 'Internal tools'],
    detail: {
      problem: 'Your business has scattered needs across tools, workflows, websites, and teams.',
      solution: 'Rapid Rise AI designs the right operating layer for your next bottleneck.',
      outcomes: ['Faster response', 'Cleaner tracking', 'Less manual work'],
      tools: ['Websites', 'Forms', 'Apps Script', 'Supabase', 'Dashboards'],
      ctaLabel: 'Explore services',
      ctaHref: '/solutions',
    },
    children: serviceModules,
  },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', icon: Cog, status: 'Live routes', size: 'medium', position: { x: 25, y: 48 }, previewBullets: ['Routing', 'Syncing', 'Follow-up'], detail: { problem: 'Manual handoffs slow delivery and create mistakes.', solution: 'We automate task routing, updates, and triggers across your stack.', outcomes: ['Less admin', 'Faster turnaround', 'Lower error rate'], tools: ['Make', 'n8n', 'Zapier', 'APIs'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'websites', title: 'Websites', description: 'High-converting digital front doors.', icon: MonitorSmartphone, status: 'Conversion ready', size: 'medium', position: { x: 22, y: 70 }, previewBullets: ['Messaging', 'Forms', 'Speed'], detail: { problem: 'Visitors leave without taking action.', solution: 'We build conversion-focused websites connected to your system layer.', outcomes: ['More qualified leads', 'Faster response', 'Better mobile UX'], tools: ['Next.js', 'SEO', 'Forms'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', icon: Wrench, status: 'Ops control', size: 'medium', position: { x: 76, y: 48 }, previewBullets: ['Portals', 'Role access', 'Task flows'], detail: { problem: 'Operations run through chat and spreadsheets.', solution: 'We build internal systems that centralize process and ownership.', outcomes: ['Clear accountability', 'Faster handoffs', 'Better visibility'], tools: ['Supabase', 'Next.js', 'Role-based access'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', icon: Building2, status: 'Connected', size: 'small', position: { x: 76, y: 24 }, previewBullets: ['Gmail', 'Sheets', 'Drive'], detail: { problem: 'Work gets buried across inboxes and files.', solution: 'We implement structured automations and reporting in Workspace.', outcomes: ['Better team coordination', 'Stronger file trails', 'Less rework'], tools: ['Gmail', 'Sheets', 'Drive', 'Calendar'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', icon: LayoutDashboard, status: 'Signal live', size: 'small', position: { x: 50, y: 19 }, previewBullets: ['KPIs', 'Bottlenecks', 'Trends'], detail: { problem: 'Leaders cannot see what is blocked or leaking.', solution: 'We build dashboards that show status, risk, and next actions.', outcomes: ['Faster decisions', 'Shared visibility', 'Clear priorities'], tools: ['Looker Studio', 'Sheets', 'Supabase'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', icon: Briefcase, status: 'Case studies', size: 'small', position: { x: 27, y: 24 }, previewBullets: ['Recent builds', 'Outcomes', 'Delivery quality'], detail: { problem: 'You need confidence before committing to a build.', solution: 'Review real implementation examples and outcomes.', outcomes: ['Higher trust', 'Clear expectations', 'Faster scoping'], tools: ['Case studies', 'Screenshots', 'Walkthroughs'], ctaLabel: 'View Work', ctaHref: '/work' } },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems.', icon: GraduationCap, status: 'Adoption', size: 'small', position: { x: 72, y: 32 }, previewBullets: ['SOPs', 'Team coaching', 'Rollout support'], detail: { problem: 'Great systems fail without team adoption.', solution: 'We provide practical training and handover playbooks.', outcomes: ['Faster onboarding', 'Stronger usage', 'Long-term value'], tools: ['Playbooks', 'Templates', 'Coaching'], ctaLabel: 'Request a quote', ctaHref: '/quote' } },
  { id: 'pricing', title: 'Pricing', description: 'Build scope for your stage.', icon: DollarSign, status: 'Scope plans', size: 'small', position: { x: 20, y: 84 }, previewBullets: ['Quick wins', 'Core build', 'Scale support'], detail: { problem: 'Unclear scope delays decisions and progress.', solution: 'Select a build path aligned to your current bottleneck and goals.', outcomes: ['Clear costs', 'Defined phases', 'Confident next steps'], tools: ['Discovery', 'Scoping', 'Roadmaps'], ctaLabel: 'View pricing', ctaHref: '/pricing' } },
  { id: 'contact', title: 'Contact', description: 'Start your build conversation.', icon: Contact, status: 'Open intake', size: 'small', position: { x: 80, y: 84 }, previewBullets: ['Request quote', 'Book discovery', 'Get plan'], detail: { problem: 'You know you need help but need clear next steps.', solution: 'Share your context and get a focused recommendation and quote path.', outcomes: ['Clear action plan', 'Fast response', 'Defined timeline'], tools: ['Discovery call', 'Quote request', 'Roadmap'], ctaLabel: 'Request a Quote', ctaHref: '/quote' } },
];
