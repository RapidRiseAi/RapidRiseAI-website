import { Briefcase, Building2, Cog, Contact, DollarSign, GraduationCap, Layers, LayoutDashboard, LifeBuoy, MonitorSmartphone, Route, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SystemLocation = {
  id: string;
  title: string;
  description: string;
  status: string;
  icon: LucideIcon;
  href: string;
  position: { left: string; top: string };
  previewBullets: string[];
  detailBullets: string[];
};

export const systemLocations: SystemLocation[] = [
  { id: 'work', title: 'Work', description: 'Proof from real client builds.', status: 'Case Studies', icon: Briefcase, href: '/work', position: { left: '18%', top: '18%' }, previewBullets: ['Recent builds', 'Delivery quality', 'Real outcomes'], detailBullets: ['Review recent implementation examples', 'Understand delivery quality before investing', 'See practical outcomes from real businesses'] },
  { id: 'dashboards', title: 'Dashboards', description: 'Live business visibility and KPIs.', status: 'Signal Live', icon: LayoutDashboard, href: '/solutions/web-apps', position: { left: '43%', top: '12%' }, previewBullets: ['KPIs', 'Visibility', 'Executive reporting'], detailBullets: ['Track bottlenecks in real time', 'See response and delivery trends', 'Share one source of truth across teams'] },
  { id: 'google-workspace', title: 'Google Workspace', description: 'Structured workflows in familiar tools.', status: 'Connected', icon: Building2, href: '/solutions/google-workspace', position: { left: '66%', top: '18%' }, previewBullets: ['Gmail', 'Sheets', 'Drive'], detailBullets: ['Connect existing Workspace tools', 'Automate repetitive operations', 'Improve file and workflow consistency'] },
  { id: 'automation', title: 'Automation', description: 'Remove manual workflow overhead.', status: 'Live Routes', icon: Cog, href: '/solutions/workflow-automation', position: { left: '14%', top: '38%' }, previewBullets: ['Routing', 'Automation', 'Follow-up'], detailBullets: ['Automate repetitive handoffs', 'Reduce manual admin and delays', 'Keep every lead and task moving'] },
  { id: 'internal-tools', title: 'Internal Tools', description: 'Portals, apps, and custom workflows.', status: 'Ops Control', icon: Wrench, href: '/solutions/web-apps', position: { left: '67%', top: '40%' }, previewBullets: ['Portals', 'Apps', 'Control'], detailBullets: ['Build tools for your exact workflow', 'Create role-based operational views', 'Replace patchwork systems with one layer'] },
  { id: 'training', title: 'Training', description: 'Enable teams to adopt systems fast.', status: 'Adoption', icon: GraduationCap, href: '/education', position: { left: '66%', top: '58%' }, previewBullets: ['Enablement', 'SOPs', 'Rollout'], detailBullets: ['Upskill teams on practical AI workflows', 'Improve system adoption speed', 'Keep execution consistent after launch'] },
  { id: 'support-assistant', title: 'Support Assistant', description: 'AI support for your teams and clients.', status: 'AI Enabled', icon: LifeBuoy, href: '/contact', position: { left: '4%', top: '58%' }, previewBullets: ['AI replies', 'Routing', 'Summaries'], detailBullets: ['Improve first-response speed', 'Route conversations intelligently', 'Maintain cleaner handoff context'] },
  { id: 'websites', title: 'Websites', description: 'High-converting sites that generate leads.', status: 'Conversion Ready', icon: MonitorSmartphone, href: '/solutions/websites', position: { left: '18%', top: '68%' }, previewBullets: ['Conversion', 'Messaging', 'Capture'], detailBullets: ['Increase conversion from core pages', 'Connect website forms to operations', 'Support follow-up with clean data capture'] },
  { id: 'services', title: 'Services', description: 'Core offerings and strategic systems.', status: 'Core Layer', icon: Layers, href: '/solutions', position: { left: '43%', top: '64%' }, previewBullets: ['Capture leads', 'Automate work', 'Track progress'], detailBullets: ['Capture more high-quality leads', 'Automate manual work', 'Track every opportunity', 'Report with clarity', 'Scale with confidence'] },
  { id: 'pricing', title: 'Pricing', description: 'Clear, flexible pricing that scales.', status: 'Scope Plans', icon: DollarSign, href: '/pricing', position: { left: '32%', top: '79%' }, previewBullets: ['Clarity', 'Scope', 'Scale'], detailBullets: ['Choose scope based on bottleneck', 'Match investment to business stage', 'Plan growth without guesswork'] },
  { id: 'process', title: 'Process', description: 'Proven process that delivers outcomes.', status: 'System Flow', icon: Route, href: '/about', position: { left: '54%', top: '79%' }, previewBullets: ['Discover', 'Build', 'Enable'], detailBullets: ['Clear discovery and scope alignment', 'Structured implementation and QA', 'Operational handover and enablement'] },
  { id: 'contact', title: 'Contact', description: 'Start a conversation with our team.', status: 'Open Intake', icon: Contact, href: '/contact', position: { left: '74%', top: '76%' }, previewBullets: ['Quote', 'Discovery', 'Plan'], detailBullets: ['Get a clear next step quickly', 'Request a focused quote path', 'Start implementation with confidence'] },
];
