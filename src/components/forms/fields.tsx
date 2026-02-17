import { cn } from '@/lib/utils';

export function TextField(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const { label, error, className, ...rest } = props;
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><input className={cn('w-full rounded-button border bg-bg1 px-4 py-3', className)} {...rest} />{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  const { label, error, ...rest } = props;
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><textarea className="w-full rounded-button border bg-bg1 px-4 py-3" rows={5} {...rest} />{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function SelectField({ label, error, options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; options: string[] }) {
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><select className="w-full rounded-button border bg-bg1 px-4 py-3" {...rest}><option value="">Select</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function CheckboxField({ label, error, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label className="flex items-center gap-2 text-sm text-text1"><input type="checkbox" {...rest} />{label}{error ? <span className="text-red-400">{error}</span> : null}</label>;
}
