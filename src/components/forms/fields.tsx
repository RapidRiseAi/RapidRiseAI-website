import { cn } from '@/lib/utils';

const base = 'w-full rounded-button border bg-bg1/80 px-4 py-3 text-sm text-text0 outline-none transition focus:border-blue focus:shadow-glow';

export function TextField(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; helper?: string }) {
  const { label, error, className, helper, ...rest } = props;
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><input className={cn(base, error && 'border-red-400/70', className)} {...rest} />{helper ? <span className="mt-1 block text-xs text-text2">{helper}</span> : null}{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; helper?: string }) {
  const { label, error, helper, ...rest } = props;
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><textarea className={cn(base, error && 'border-red-400/70')} rows={5} {...rest} />{helper ? <span className="mt-1 block text-xs text-text2">{helper}</span> : null}{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function SelectField({ label, error, options, helper, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; options: string[]; helper?: string }) {
  return <label className="block"><span className="mb-2 block text-sm text-text1">{label}</span><select className={cn(base, error && 'border-red-400/70')} {...rest}><option value="">Select</option>{options.map((o) => <option key={o} value={o}>{o}</option>)}</select>{helper ? <span className="mt-1 block text-xs text-text2">{helper}</span> : null}{error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}</label>;
}

export function CheckboxField({ label, error, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label className="flex items-center gap-2 text-sm text-text1"><input type="checkbox" {...rest} />{label}{error ? <span className="text-red-400">{error}</span> : null}</label>;
}
