import { Section } from '@/components/ui/section';

export type SectionShellProps = React.ComponentProps<typeof Section>;

export function SectionShell(props: SectionShellProps) {
  return <Section {...props} />;
}
