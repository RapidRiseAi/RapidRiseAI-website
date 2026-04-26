import type { LucideIcon } from 'lucide-react';

export type HeroMetric = {
  value: string;
  countTo: number;
  decimals?: number;
  suffix?: string;
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
  countTo: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  accent: string;
};
