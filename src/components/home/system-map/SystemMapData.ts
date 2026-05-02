import {
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Compass,
  Gauge,
  Globe,
  Mail,
  Settings2,
  Sparkles,
  Target,
  ShieldCheck,
  GitBranch,
  Users,
  ScanLine,
  Zap,
  Send,
  type LucideIcon,
} from 'lucide-react';

export type DestinationId = 'solutions' | 'dashboards' | 'automation' | 'internal-tools' | 'contact' | 'services' | 'websites' | 'work';

export type Destination = {
  id: DestinationId;
  title: string;
  label: string;
  shortDescription: string;
  description: string;
  href: string;
  icon: LucideIcon;
  position: { x: number; y: number };
  cta: string;
  secondaryCta: string;
  benefits: Array<{ title: string; text: string; icon: LucideIcon }>;
};

export const processSteps = [
  { label: 'Capture', icon: ScanLine },
  { label: 'Automate', icon: Zap },
  { label: 'Deliver', icon: Send },
  { label: 'Grow', icon: ArrowUpRight },
] as const;

export const destinations: Destination[] = [
  { id: 'solutions', title: 'Solutions', label: 'FRAMEWORK', shortDescription: 'Strategy, systems & marketing that scale.', description: 'Turn scattered business needs into clear systems, workflows, and digital assets that support growth.', href: '/solutions', icon: Compass, position: { x: 220, y: 170 }, cta: 'Explore Solutions', secondaryCta: 'View service pathways', benefits: [
    { title: 'Map the Bottlenecks', text: 'Identify where time, leads, and money leak.', icon: Target },
    { title: 'Design the System', text: 'Build a practical operating layer around your real workflow.', icon: Sparkles },
    { title: 'Connect the Tools', text: 'Link the platforms your team already uses.', icon: GitBranch },
    { title: 'Improve Over Time', text: 'Use data and feedback to refine the system.', icon: Gauge },
  ] },
  { id: 'dashboards', title: 'Dashboards', label: 'VISIBILITY', shortDescription: 'Live visibility across performance & KPIs.', description: 'See the numbers, tasks, leads, and outcomes that matter without digging through scattered tools.', href: '/solutions#dashboards', icon: BarChart3, position: { x: 500, y: 68 }, cta: 'View Dashboard Work', secondaryCta: 'See how reporting works', benefits: [
    { title: 'Real-Time Clarity', text: 'Track important activity in one place.', icon: Gauge },
    { title: 'Better Decisions', text: 'Surface trends before they become problems.', icon: Target },
    { title: 'Team Accountability', text: 'Make ownership and progress visible.', icon: Users },
    { title: 'Cleaner Reporting', text: 'Replace guesswork with structured insight.', icon: BarChart3 },
  ] },
  { id: 'automation', title: 'Automation', label: 'EFFICIENCY', shortDescription: 'Remove manual work and streamline ops.', description: 'Remove repetitive manual work and create connected workflows that keep the business moving.', href: '/solutions#workflow-automation', icon: Zap, position: { x: 780, y: 170 }, cta: 'Automate My Workflow', secondaryCta: 'Explore automation ideas', benefits: [
    { title: 'Save Time', text: 'Automate repetitive admin and follow-ups.', icon: Zap },
    { title: 'Reduce Mistakes', text: 'Standardize handoffs and data capture.', icon: ShieldCheck },
    { title: 'Respond Faster', text: 'Trigger actions the moment something happens.', icon: Sparkles },
    { title: 'Scale Capacity', text: 'Let systems handle more of the workload.', icon: ArrowUpRight },
  ] },
  { id: 'work', title: 'Work', label: 'PROOF', shortDescription: 'From roadmaps to real client outcomes.', description: 'Explore real builds, systems, and concepts that show how Rapid Rise AI turns ideas into practical outcomes.', href: '/work', icon: Briefcase, position: { x: 115, y: 400 }, cta: 'View Work', secondaryCta: 'See case studies', benefits: [
    { title: 'Real Outcomes', text: 'See what has already been built.', icon: Briefcase },
    { title: 'Practical Thinking', text: 'Understand the logic behind the work.', icon: Compass },
    { title: 'Visual Proof', text: 'Review systems, dashboards, apps, and websites.', icon: Globe },
    { title: 'Confidence Before You Commit', text: 'Know what quality looks like.', icon: ShieldCheck },
  ] },
  { id: 'internal-tools', title: 'Internal Tools', label: 'OPERATIONS', shortDescription: 'Custom portals and workflows for your team.', description: 'Build custom portals, dashboards, calculators, and workflow tools around how your team actually works.', href: '/solutions#web-apps', icon: Settings2, position: { x: 885, y: 400 }, cta: 'Build Internal Tools', secondaryCta: 'See examples', benefits: [
    { title: 'Custom Fit', text: 'Tools designed around your real process.', icon: Target },
    { title: 'Team Control', text: 'Give staff clean interfaces to manage work.', icon: Users },
    { title: 'Cleaner Handoffs', text: 'Move tasks between people without confusion.', icon: GitBranch },
    { title: 'Better Oversight', text: 'Give owners visibility without micromanaging.', icon: Gauge },
  ] },
  { id: 'websites', title: 'Websites', label: 'CONVERSION', shortDescription: 'High-converting sites that turn visitors into customers.', description: 'Replace flat, outdated websites with premium pages built to create trust, explain value, and convert visitors.', href: '/solutions#websites', icon: Globe, position: { x: 220, y: 830 }, cta: 'Upgrade My Website', secondaryCta: 'View website work', benefits: [
    { title: 'Strong First Impression', text: 'Make the business feel credible instantly.', icon: Sparkles },
    { title: 'Clear Service Flow', text: 'Guide visitors to the right action.', icon: Target },
    { title: 'Better Mobile Experience', text: 'Design for how people actually browse.', icon: Users },
    { title: 'Built to Convert', text: 'Turn attention into enquiries.', icon: ArrowUpRight },
  ] },
  { id: 'contact', title: 'Contact', label: 'START HERE', shortDescription: 'Start a conversation. Let’s build together.', description: 'Tell us what is slowing your business down and we will help you map the best next step.', href: '/contact', icon: Mail, position: { x: 780, y: 830 }, cta: 'Request a Quote', secondaryCta: 'Send a message', benefits: [
    { title: 'Clear Next Step', text: 'Know what to build first.', icon: Target },
    { title: 'Practical Scope', text: 'Get a realistic plan, not vague promises.', icon: ShieldCheck },
    { title: 'Fast Response', text: 'Start the conversation quickly.', icon: Zap },
    { title: 'Built Around You', text: 'Recommendations based on your business.', icon: Users },
  ] },
  { id: 'services', title: 'Services', label: 'FEATURED', shortDescription: 'Core systems & strategy that drive real results.', description: 'We design and implement core systems that power your business, so you can focus on growth, not busywork.', href: '/solutions', icon: Sparkles, position: { x: 500, y: 955 }, cta: 'Explore Services', secondaryCta: 'View all solutions', benefits: [
    { title: 'Strategic by Design', text: 'Built around your goals, market, and customers.', icon: Target },
    { title: 'Operational Excellence', text: 'Streamline operations and eliminate friction.', icon: ShieldCheck },
    { title: 'Data-Driven Decisions', text: 'Dashboards and insights that measure what matters.', icon: GitBranch },
    { title: 'Scalable Growth', text: 'Systems that scale with you, efficiently and sustainably.', icon: Users },
  ] },
];
