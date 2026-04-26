import { Activity, Eye, Gauge, ShieldCheck, Zap, ClipboardCheck, Download, GitBranch } from 'lucide-react';
import type { HeroMetric, ImpactMetric, ProcessStep, TrustItem } from './HeroTypes';

export const heroCopy = {
  eyebrow: 'RAPID RISE AI COMMAND CENTER',
  headlineLead: 'Manual work is costing you',
  headlineAccent: 'leads, time, and control.',
  body: 'We build automation systems, dashboards, and workflow tools that help businesses respond faster, track work clearly, and stay in control.',
  primaryCta: { label: 'Request a Quote', href: '/quote' },
  secondaryCta: { label: 'View Work', href: '/work' },
};

export const navItems = [
  { label: 'Services', href: '/solutions' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/education' },
];

export const trustItems: TrustItem[] = [
  { label: 'Response within 24h', icon: Zap, accent: 'text-emerald-300' },
  { label: 'Clear scope', icon: ShieldCheck, accent: 'text-blue-300' },
  { label: 'Handover ready', icon: ClipboardCheck, accent: 'text-cyan-300' },
  { label: 'Built around your tools', icon: Activity, accent: 'text-violet-300' },
];

export const heroMetrics: HeroMetric[] = [
  { value: '18 min', countTo: 18, suffix: ' min', duration: 2.05, accent: 'text-cyan-300', label: 'Avg Response' },
  { value: '43', countTo: 43, duration: 2.15, label: 'Leads Captured' },
  { value: '100%', countTo: 100, suffix: '%', duration: 2.45, label: 'Visibility' },
];

export const processSteps: ProcessStep[] = [
  { label: 'Capture', icon: Download, accent: 'text-cyan-300' },
  { label: 'Route', icon: GitBranch, accent: 'text-indigo-300' },
  { label: 'Action', icon: Zap, accent: 'text-blue-300' },
  { label: 'Visibility', icon: Eye, accent: 'text-violet-300' },
];

export const impactMetrics: ImpactMetric[] = [
  { tag: 'TIME', value: '+320 hrs', countTo: 320, prefix: '+', suffix: ' hrs', duration: 2.9, label: 'Admin time saved each month', icon: Gauge, accent: 'text-blue-300' },
  { tag: 'SPEED', value: '3.4x', countTo: 3.4, decimals: 1, suffix: 'x', duration: 1.95, label: 'Faster response time on average', icon: Zap, accent: 'text-cyan-300' },
  { tag: 'FOLLOW-UP', value: '+58%', countTo: 58, prefix: '+', suffix: '%', duration: 2.2, label: 'More leads followed up', icon: Activity, accent: 'text-violet-300' },
  { tag: 'VISIBILITY', value: '100%', countTo: 100, suffix: '%', duration: 2.4, label: 'Visibility across your operations', icon: Eye, accent: 'text-indigo-300' },
];
