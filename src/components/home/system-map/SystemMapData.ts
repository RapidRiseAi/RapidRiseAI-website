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
  cyan: { main: '#32E6FF', glow: 'rgba(50,230,255,.34)', soft: 'rgba(50,230,255,.12)' },
  blue: { main: '#1479FF', glow: 'rgba(20,121,255,.34)', soft: 'rgba(20,121,255,.12)' },
  purple: { main: '#8B5CFF', glow: 'rgba(139,92,255,.40)', soft: 'rgba(139,92,255,.12)' },
  green: { main: '#27EF7D', glow: 'rgba(39,239,125,.36)', soft: 'rgba(39,239,125,.12)' },
  gold: { main: '#FFCB2E', glow: 'rgba(255,203,46,.44)', soft: 'rgba(255,203,46,.12)' },
  magenta: { main: '#FF52E2', glow: 'rgba(255,82,226,.36)', soft: 'rgba(255,82,226,.12)' },
  google: { main: '#53E6FF', glow: 'rgba(83,230,255,.36)', soft: 'rgba(83,230,255,.12)' },
};

export const systemMapDestinations: SystemMapDestination[] = [
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', tag: 'SIGNAL LIVE', href: '/solutions#dashboards', accent: 'blue', icon: Gauge, position: { left: 50, top: 20 }, scale: 0.96, previewBullets: ['Track status', 'See bottlenecks', 'Report clearly'], route: 'M575 400 L575 285 C575 230 575 195 575 170', anchor: { x: 575, y: 170 } },
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', tag: 'CASE STUDIES', href: '/work', accent: 'purple', icon: Briefcase, position: { left: 28, top: 28 }, scale: 0.96, previewBullets: ['See real builds', 'Review outcomes', 'Understand capability'], route: 'M575 400 C510 370 420 320 300 250', anchor: { x: 300, y: 250 } },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', tag: 'CONNECTED', href: '/solutions#google-workspace', accent: 'google', icon: Sparkles, position: { left: 73, top: 28 }, scale: 0.96, previewBullets: ['Connect Gmail and Sheets', 'Organize Drive documents', 'Trigger reminders'], route: 'M575 400 C650 360 740 305 850 245', anchor: { x: 850, y: 245 } },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', tag: 'LIVE ROUTES', href: '/solutions#automation', accent: 'cyan', icon: Workflow, position: { left: 24, top: 45 }, scale: 1, previewBullets: ['Sync tools automatically', 'Route tasks and reminders', 'Reduce repetitive admin'], route: 'M575 400 C470 400 365 398 265 395', anchor: { x: 265, y: 395 } },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', tag: 'OPS CONTROL', href: '/solutions#internal-tools', accent: 'purple', icon: Wrench, position: { left: 75, top: 45 }, scale: 1, previewBullets: ['Build team dashboards', 'Manage requests', 'Control operations'], route: 'M575 400 C665 398 770 400 865 405', anchor: { x: 865, y: 405 } },
  { id: 'support-assistant', title: 'Support Assistant', description: 'AI support for your team and clients.', tag: 'AI ENABLED', href: '/solutions#support-assistant', accent: 'blue', icon: Bot, position: { left: 15, top: 57 }, scale: 0.96, previewBullets: ['Answer faster', 'Summarize requests', 'Handoff cleanly'], route: 'M575 400 C445 430 300 485 145 520', anchor: { x: 145, y: 520 } },
  { id: 'websites', title: 'Websites', description: 'High-converting sites that generate leads.', tag: 'CONVERSION READY', href: '/solutions#websites', accent: 'cyan', icon: Globe, position: { left: 27, top: 68 }, scale: 1.02, previewBullets: ['Build trust fast', 'Capture quote requests', 'Connect forms to workflows'], route: 'M575 400 C470 465 365 575 270 635', anchor: { x: 270, y: 635 } },
  { id: 'services', title: 'Services', description: 'Core offerings and strategic systems that drive results.', tag: 'CORE LAYER', href: '/solutions', accent: 'gold', icon: Layers, position: { left: 50, top: 67 }, scale: 1.1, previewBullets: ['Capture more high-quality leads', 'Automate manual work', 'Track every opportunity', 'Report with clarity', 'Scale with confidence'], route: 'M575 400 L575 570', anchor: { x: 575, y: 570 } },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems fast.', tag: 'ADOPTION', href: '/education', accent: 'blue', icon: GraduationCap, position: { left: 73, top: 62 }, scale: 1, previewBullets: ['Teach modern workflows', 'Provide SOPs', 'Improve adoption'], route: 'M575 400 C670 455 760 515 845 560', anchor: { x: 845, y: 560 } },
  { id: 'pricing', title: 'Pricing', description: 'Clear, flexible pricing that scales.', tag: 'SCOPE PLANS', href: '/pricing', accent: 'magenta', icon: DollarSign, position: { left: 38, top: 82 }, scale: 1.03, previewBullets: ['Pick the right scope', 'Start with a quick win', 'Scale with support'], route: 'M575 400 C520 500 470 615 430 720', anchor: { x: 430, y: 720 } },
  { id: 'process', title: 'Process', description: 'Proven process that delivers outcomes.', tag: 'SYSTEM FLOW', href: '/about#process', accent: 'blue', icon: Workflow, position: { left: 60, top: 82 }, scale: 1.03, previewBullets: ['Diagnose the leak', 'Design the system', 'Ship and improve'], route: 'M575 400 C620 510 670 620 700 710', anchor: { x: 700, y: 710 } },
  { id: 'contact', title: 'Contact', description: 'Start a conversation with our team.', tag: 'OPEN INTAKE', href: '/contact', accent: 'green', icon: Contact, position: { left: 78, top: 78 }, scale: 1.03, previewBullets: ['Request a quote', 'Book discovery', 'Start the build path'], route: 'M575 400 C700 500 820 610 910 690', anchor: { x: 910, y: 690 } },
];
