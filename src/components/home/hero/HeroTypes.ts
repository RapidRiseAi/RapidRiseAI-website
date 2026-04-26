import type { LucideIcon } from 'lucide-react';

export type HeroMetric = {
  value: string;
  accent?: string;
  label: string;
};

export type TrustItem = {
  label: string;
  icon: LucideIcon;
  accent: string;
};

export type ProcessStep = {
  label: string;
  icon: LucideIcon;
  accent: string;
};

export type ImpactMetric = {
  tag: string;
  value: string;
  label: string;
  icon: LucideIcon;
  accent: string;
};
