import { Hero } from '@/components/page-template';

export type PageHeroProps = React.ComponentProps<typeof Hero>;

export function PageHero(props: PageHeroProps) {
  return <Hero {...props} />;
}
