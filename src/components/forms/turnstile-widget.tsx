import { CONFIG } from '@/lib/config';

export function TurnstileWidget() {
  return (
    <div className="rounded-card border border-stroke p-4 text-sm text-text1">
      <p>Cloudflare Turnstile</p>
      <p className="text-xs">Site key configured: {CONFIG.turnstileSiteKey ? 'Yes' : 'No'}</p>
      <div className="mt-2 h-16 rounded border border-dashed border-stroke" />
    </div>
  );
}
