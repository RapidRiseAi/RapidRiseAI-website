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
  scale: number;
  previewBullets: string[];
  scenePosition: [number, number, number];
  routePoints: [number, number, number][];
};

export const accentStyles: Record<AccentTone, { main: string; glow: string; soft: string }> = {
  cyan: { main: '#32E6FF', glow: 'rgba(50,230,255,.42)', soft: 'rgba(50,230,255,.16)' },
  blue: { main: '#35A0FF', glow: 'rgba(20,121,255,.42)', soft: 'rgba(20,121,255,.14)' },
  purple: { main: '#9D72FF', glow: 'rgba(139,92,255,.42)', soft: 'rgba(139,92,255,.14)' },
  green: { main: '#27EF7D', glow: 'rgba(39,239,125,.38)', soft: 'rgba(39,239,125,.14)' },
  gold: { main: '#FFCB2E', glow: 'rgba(255,203,46,.46)', soft: 'rgba(255,203,46,.16)' },
  magenta: { main: '#FF52E2', glow: 'rgba(255,82,226,.42)', soft: 'rgba(255,82,226,.14)' },
  google: { main: '#53E6FF', glow: 'rgba(83,230,255,.4)', soft: 'rgba(83,230,255,.14)' },
};

export const systemMapDestinations: SystemMapDestination[] = [
  { id: 'services', title: 'Services', description: 'Core offerings and strategic systems that drive results.', tag: 'CORE LAYER', href: '/solutions', accent: 'gold', scale: 1.08, previewBullets: ['Capture more high-quality leads', 'Automate manual work', 'Track every opportunity', 'Report with clarity', 'Scale with confidence'], scenePosition: [0, 0, 2.75], routePoints: [[0, 0.06, 0], [0, 0.06, 1.4], [0, 0.06, 2.75]], icon: Layers },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', tag: 'LIVE ROUTES', href: '/solutions#automation', accent: 'cyan', scale: 1, previewBullets: ['Sync tools automatically', 'Route tasks and reminders', 'Reduce repetitive admin'], scenePosition: [-3.65, 0, -0.15], routePoints: [[0, 0.06, 0], [-1.6, 0.06, -0.1], [-3.65, 0.06, -0.15]], icon: Workflow },
  { id: 'websites', title: 'Websites', description: 'High-converting sites that generate leads.', tag: 'CONVERSION READY', href: '/solutions#websites', accent: 'cyan', scale: 1, previewBullets: ['Build trust fast', 'Capture quote requests', 'Connect forms to workflows'], scenePosition: [-3.35, 0, 2.65], routePoints: [[0, 0.06, 0], [-1.4, 0.06, 1.1], [-2.4, 0.06, 2], [-3.35, 0.06, 2.65]], icon: Globe },
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', tag: 'SIGNAL LIVE', href: '/solutions#dashboards', accent: 'blue', scale: 0.98, previewBullets: ['Track status', 'See bottlenecks', 'Report clearly'], scenePosition: [0, 0, -3.15], routePoints: [[0, 0.06, 0], [0, 0.06, -1.7], [0, 0.06, -3.15]], icon: Gauge },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', tag: 'CONNECTED', href: '/solutions#google-workspace', accent: 'google', scale: 0.98, previewBullets: ['Connect Gmail and Sheets', 'Organize Drive documents', 'Trigger reminders'], scenePosition: [3.55, 0, -2.35], routePoints: [[0, 0.06, 0], [1.5, 0.06, -0.9], [2.6, 0.06, -1.7], [3.55, 0.06, -2.35]], icon: Sparkles },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', tag: 'OPS CONTROL', href: '/solutions#internal-tools', accent: 'purple', scale: 1, previewBullets: ['Build team dashboards', 'Manage requests', 'Control operations'], scenePosition: [3.65, 0, -0.15], routePoints: [[0, 0.06, 0], [1.7, 0.06, -0.05], [3.65, 0.06, -0.15]], icon: Wrench },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems fast.', tag: 'ADOPTION', href: '/education', accent: 'blue', scale: 1, previewBullets: ['Teach modern workflows', 'Provide SOPs', 'Improve adoption'], scenePosition: [3.45, 0, 2.15], routePoints: [[0, 0.06, 0], [1.4, 0.06, 0.9], [2.5, 0.06, 1.6], [3.45, 0.06, 2.15]], icon: GraduationCap },
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', tag: 'CASE STUDIES', href: '/work', accent: 'purple', scale: 0.98, previewBullets: ['See real builds', 'Review outcomes', 'Understand capability'], scenePosition: [-3.35, 0, -2.55], routePoints: [[0, 0.06, 0], [-1.4, 0.06, -1], [-2.4, 0.06, -1.9], [-3.35, 0.06, -2.55]], icon: Briefcase },
  { id: 'pricing', title: 'Pricing', description: 'Clear, flexible pricing that scales.', tag: 'SCOPE PLANS', href: '/pricing', accent: 'magenta', scale: 1, previewBullets: ['Pick the right scope', 'Start with a quick win', 'Scale with support'], scenePosition: [-1.95, 0, 3.95], routePoints: [[0, 0.06, 0], [-0.8, 0.06, 1.6], [-1.4, 0.06, 2.9], [-1.95, 0.06, 3.95]], icon: DollarSign },
  { id: 'process', title: 'Process', description: 'Proven process that delivers outcomes.', tag: 'SYSTEM FLOW', href: '/about#process', accent: 'blue', scale: 1, previewBullets: ['Diagnose the leak', 'Design the system', 'Ship and improve'], scenePosition: [1.65, 0, 3.95], routePoints: [[0, 0.06, 0], [0.7, 0.06, 1.6], [1.2, 0.06, 2.9], [1.65, 0.06, 3.95]], icon: Workflow },
  { id: 'contact', title: 'Contact', description: 'Start a conversation with our team.', tag: 'OPEN INTAKE', href: '/contact', accent: 'green', scale: 1, previewBullets: ['Request a quote', 'Book discovery', 'Start the build path'], scenePosition: [4.25, 0, 3.25], routePoints: [[0, 0.06, 0], [1.8, 0.06, 1.4], [3.1, 0.06, 2.4], [4.25, 0.06, 3.25]], icon: Contact },
  { id: 'support-assistant', title: 'Support Assistant', description: 'AI support for your team and clients.', tag: 'AI ENABLED', href: '/solutions#support-assistant', accent: 'blue', scale: 0.95, previewBullets: ['Answer faster', 'Summarize requests', 'Handoff cleanly'], scenePosition: [-4.65, 0, 1.25], routePoints: [[0, 0.06, 0], [-1.8, 0.06, 0.4], [-3.4, 0.06, 0.9], [-4.65, 0.06, 1.25]], icon: Bot },
];
