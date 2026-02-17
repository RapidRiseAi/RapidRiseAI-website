import { Card } from './card';

export function FeatureGrid({ items }: { items: { title: string; description: string }[] }) {
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((i) => <Card key={i.title}><h3 className="font-semibold mb-2">{i.title}</h3><p className="text-text1 text-sm">{i.description}</p></Card>)}</div>;
}
