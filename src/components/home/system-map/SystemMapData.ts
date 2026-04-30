import {
  Briefcase,
  Bot,
  Contact,
  DollarSign,
  Gauge,
  GraduationCap,
  Layers,
  Settings2,
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
};

export const accentStyles: Record<AccentTone, { main: string; glow: string; soft: string }> = {
  cyan: { main: '#32E6FF', glow: 'rgba(50,230,255,.34)', soft: 'rgba(50,230,255,.12)' },
  blue: { main: '#1479FF', glow: 'rgba(20,121,255,.34)', soft: 'rgba(20,121,255,.12)' },
  purple: { main: '#8B5CFF', glow: 'rgba(139,92,255,.38)', soft: 'rgba(139,92,255,.12)' },
  green: { main: '#27EF7D', glow: 'rgba(39,239,125,.34)', soft: 'rgba(39,239,125,.12)' },
  gold: { main: '#FFCB2E', glow: 'rgba(255,203,46,.42)', soft: 'rgba(255,203,46,.12)' },
  magenta: { main: '#FF52E2', glow: 'rgba(255,82,226,.34)', soft: 'rgba(255,82,226,.12)' },
  google: { main: '#53E6FF', glow: 'rgba(83,230,255,.34)', soft: 'rgba(83,230,255,.12)' },
};

export const systemMapDestinations: SystemMapDestination[] = [
  { id: 'services', title: 'Services', description: 'Core offerings and strategic systems that drive results.', tag: 'CORE LAYER', href: '/solutions', accent: 'gold', icon: Layers, position: { left: 50, top: 68 }, scale: 1.08, previewBullets: ['Capture more high-quality leads', 'Automate manual work', 'Track every opportunity', 'Report with clarity', 'Scale with confidence'], route: 'M740 390 L740 565' },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', tag: 'LIVE ROUTES', href: '/solutions/workflow-automation', accent: 'cyan', icon: Workflow, position: { left: 25, top: 46 }, scale: 1, previewBullets: ['Sync tools automatically', 'Route tasks and reminders', 'Reduce repetitive admin'], route: 'M740 390 C625 395 510 388 375 385' },
  { id: 'websites', title: 'Websites', description: 'High-converting sites that generate leads.', tag: 'CONVERSION READY', href: '/solutions/websites', accent: 'cyan', icon: Globe, position: { left: 27, top: 68 }, scale: 1.02, previewBullets: ['Build trust fast', 'Capture quote requests', 'Connect forms to workflows'], route: 'M740 390 C610 450 500 545 360 595' },
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', tag: 'SIGNAL LIVE', href: '/solutions/web-apps', accent: 'blue', icon: Gauge, position: { left: 50, top: 21 }, scale: 0.98, previewBullets: ['Track status', 'See bottlenecks', 'Report clearly'], route: 'M740 390 L740 295 C740 245 740 210 740 175' },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', tag: 'CONNECTED', href: '/solutions/google-workspace', accent: 'google', icon: Sparkles, position: { left: 72, top: 28 }, scale: 0.98, previewBullets: ['Connect Gmail and Sheets', 'Organize Drive documents', 'Trigger reminders'], route: 'M740 390 C820 352 935 305 1060 250' },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', tag: 'OPS CONTROL', href: '/solutions/web-apps', accent: 'purple', icon: Wrench, position: { left: 74, top: 46 }, scale: 1, previewBullets: ['Build team dashboards', 'Manage requests', 'Control operations'], route: 'M740 390 C850 390 955 393 1050 395' },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems fast.', tag: 'ADOPTION', href: '/education', accent: 'blue', icon: GraduationCap, position: { left: 72, top: 64 }, scale: 1.02, previewBullets: ['Teach modern workflows', 'Provide SOPs', 'Improve adoption'], route: 'M740 390 C840 430 950 485 1030 535' },
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', tag: 'CASE STUDIES', href: '/work', accent: 'purple', icon: Briefcase, position: { left: 27, top: 26 }, scale: 0.98, previewBullets: ['See real builds', 'Review outcomes', 'Understand capability'], route: 'M740 390 C650 355 560 315 405 250' },
  { id: 'pricing', title: 'Pricing', description: 'Clear, flexible pricing that scales.', tag: 'SCOPE PLANS', href: '/pricing', accent: 'magenta', icon: DollarSign, position: { left: 39, top: 82 }, scale: 1.04, previewBullets: ['Pick the right scope', 'Start with a quick win', 'Scale with support'], route: 'M740 390 C660 480 585 590 520 660' },
  { id: 'process', title: 'Process', description: 'Proven process that delivers outcomes.', tag: 'SYSTEM FLOW', href: '/about#process', accent: 'blue', icon: Settings2, position: { left: 57, top: 82 }, scale: 1.04, previewBullets: ['Diagnose the leak', 'Design the system', 'Ship and improve'], route: 'M740 390 C780 485 815 580 835 660' },
  { id: 'contact', title: 'Contact', description: 'Start a conversation with our team.', tag: 'OPEN INTAKE', href: '/contact', accent: 'green', icon: Contact, position: { left: 77, top: 78 }, scale: 1.04, previewBullets: ['Request a quote', 'Book discovery', 'Start the build path'], route: 'M740 390 C875 470 1010 565 1105 645' },
  { id: 'support-assistant', title: 'Support Assistant', description: 'AI support for your team and clients.', tag: 'AI ENABLED', href: '/solutions/training', accent: 'blue', icon: Bot, position: { left: 15, top: 56 }, scale: 1, previewBullets: ['Answer faster', 'Summarize requests', 'Handoff cleanly'], route: 'M740 390 C590 425 410 465 220 505' },
];
