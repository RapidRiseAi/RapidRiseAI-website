import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FormPageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>{children}</Card>
      <Card className="h-fit lg:sticky lg:top-24">
        <p className="text-sm text-blue">Response within 24 hours</p>
        <h3 className="mt-2 font-[var(--font-jakarta)] text-2xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-text1">What happens next: we review your request, scope the cleanest path, and reply with clear next steps.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/work" variant="secondary">View Work</Button>
          <Button href="/book" variant="secondary">Book a Call</Button>
        </div>
      </Card>
    </div>
  );
}
