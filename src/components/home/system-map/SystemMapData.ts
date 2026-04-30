import {
  Briefcase,
  Bot,
  Contact,
  DollarSign,
  Gauge,
  GraduationCap,
  Layers,
  Sparkles,
  Wrench,
  Workflow,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export type AccentTone = 'cyan' | 'blue' | 'purple' | 'green' | 'gold' | 'magenta' | 'google';

export type SystemMapDestination = {
  id: string;
  title: string;
  description: string;
  tag: string;
  href: string;
  accent: AccentTone;
  icon: LucideIcon;
  position: { left: number; top: number };
  scale: number;
  previewBullets: string[];
  route: string;
  anchor: { x: number; y: number };
};

export const accentStyles: Record<AccentTone, { main: string; glow: string; soft: string }> = {
  cyan: { main: '#32E6FF', glow: 'rgba(50,230,255,.40)', soft: 'rgba(50,230,255,.16)' },
  blue: { main: '#35A0FF', glow: 'rgba(20,121,255,.42)', soft: 'rgba(20,121,255,.14)' },
  purple: { main: '#9D72FF', glow: 'rgba(139,92,255,.42)', soft: 'rgba(139,92,255,.14)' },
  green: { main: '#27EF7D', glow: 'rgba(39,239,125,.38)', soft: 'rgba(39,239,125,.14)' },
  gold: { main: '#FFCB2E', glow: 'rgba(255,203,46,.45)', soft: 'rgba(255,203,46,.14)' },
  magenta: { main: '#FF52E2', glow: 'rgba(255,82,226,.40)', soft: 'rgba(255,82,226,.14)' },
  google: { main: '#53E6FF', glow: 'rgba(83,230,255,.38)', soft: 'rgba(83,230,255,.14)' },
};

export const systemMapDestinations: SystemMapDestination[] = [
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', tag: 'SIGNAL LIVE', href: '/solutions#dashboards', accent: 'blue', icon: Gauge, position: { left: 50, top: 20 }, scale: 0.97, previewBullets: ['Track status', 'See bottlenecks', 'Report clearly'], route: 'M575 405 L575 300 C575 250 575 210 575 180', anchor: { x: 575, y: 180 } },
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', tag: 'CASE STUDIES', href: '/work', accent: 'purple', icon: Briefcase, position: { left: 29, top: 28 }, scale: 0.96, previewBullets: ['See real builds', 'Review outcomes', 'Understand capability'], route: 'M575 405 C520 370 430 310 310 245', anchor: { x: 310, y: 245 } },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', tag: 'CONNECTED', href: '/solutions#google-workspace', accent: 'google', icon: Sparkles, position: { left: 73, top: 28 }, scale: 0.96, previewBullets: ['Connect Gmail and Sheets', 'Organize Drive documents', 'Trigger reminders'], route: 'M575 405 C650 365 730 305 835 250', anchor: { x: 835, y: 250 } },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', tag: 'LIVE ROUTES', href: '/solutions#automation', accent: 'cyan', icon: Workflow, position: { left: 24, top: 45 }, scale: 1, previewBullets: ['Sync tools automatically', 'Route tasks and reminders', 'Reduce repetitive admin'], route: 'M575 405 C480 408 365 405 270 400', anchor: { x: 270, y: 400 } },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', tag: 'OPS CONTROL', href: '/solutions#internal-tools', accent: 'purple', icon: Wrench, position: { left: 75, top: 45 }, scale: 1, previewBullets: ['Build team dashboards', 'Manage requests', 'Control operations'], route: 'M575 405 C660 405 765 408 850 415', anchor: { x: 850, y: 415 } },
  { id: 'support-assistant', title: 'Support Assistant', description: 'AI support for your team and clients.', tag: 'AI ENABLED', href: '/solutions#support-assistant', accent: 'blue', icon: Bot, position: { left: 12, top: 56 }, scale: 0.92, previewBullets: ['Answer faster', 'Summarize requests', 'Handoff cleanly'], route: 'M575 405 C445 435 295 485 145 525', anchor: { x: 145, y: 525 } },
  { id: 'websites', title: 'Websites', description: 'High-converting sites that generate leads.', tag: 'CONVERSION READY', href: '/solutions#websites', accent: 'cyan', icon: Globe, position: { left: 28, top: 71 }, scale: 1, previewBullets: ['Build trust fast', 'Capture quote requests', 'Connect forms to workflows'], route: 'M575 405 C470 465 370 565 280 625', anchor: { x: 280, y: 625 } },
  { id: 'services', title: 'Services', description: 'Core offerings and strategic systems that drive results.', tag: 'CORE LAYER', href: '/solutions', accent: 'gold', icon: Layers, position: { left: 50, top: 68 }, scale: 1.1, previewBullets: ['Capture more high-quality leads', 'Automate manual work', 'Track every opportunity', 'Report with clarity', 'Scale with confidence'], route: 'M575 405 L575 575', anchor: { x: 575, y: 575 } },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems fast.', tag: 'ADOPTION', href: '/education', accent: 'blue', icon: GraduationCap, position: { left: 73, top: 64 }, scale: 1, previewBullets: ['Teach modern workflows', 'Provide SOPs', 'Improve adoption'], route: 'M575 405 C675 465 765 520 840 575', anchor: { x: 840, y: 575 } },
  { id: 'pricing', title: 'Pricing', description: 'Clear, flexible pricing that scales.', tag: 'SCOPE PLANS', href: '/pricing', accent: 'magenta', icon: DollarSign, position: { left: 39, top: 84 }, scale: 1, previewBullets: ['Pick the right scope', 'Start with a quick win', 'Scale with support'], route: 'M575 405 C530 510 470 625 420 720', anchor: { x: 420, y: 720 } },
  { id: 'process', title: 'Process', description: 'Proven process that delivers outcomes.', tag: 'SYSTEM FLOW', href: '/about#process', accent: 'blue', icon: Workflow, position: { left: 61, top: 84 }, scale: 1, previewBullets: ['Diagnose the leak', 'Design the system', 'Ship and improve'], route: 'M575 405 C620 520 670 630 705 720', anchor: { x: 705, y: 720 } },
  { id: 'contact', title: 'Contact', description: 'Start a conversation with our team.', tag: 'OPEN INTAKE', href: '/contact', accent: 'green', icon: Contact, position: { left: 78, top: 78 }, scale: 1, previewBullets: ['Request a quote', 'Book discovery', 'Start the build path'], route: 'M575 405 C700 510 815 625 910 700', anchor: { x: 910, y: 700 } },
];
