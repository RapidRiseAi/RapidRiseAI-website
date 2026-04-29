'use client';

import { FormEvent, useEffect, useState } from 'react';

const STORAGE_KEY = 'rapidrise_admin_access';

export function MaintenanceGate() {
  const [hasAccess, setHasAccess] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      setHasAccess(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        setError(payload.error ?? 'Invalid code.');
        return;
      }

      window.sessionStorage.setItem(STORAGE_KEY, 'granted');
      setHasAccess(true);
      setCode('');
    } catch {
      setError('Unable to verify the code right now.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (hasAccess) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/95 px-6 py-10 text-white">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col justify-center gap-6 rounded-2xl border border-white/15 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Temporary Maintenance Notice</p>
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Rapid Rise AI is currently undergoing maintenance.</h1>
        <p className="text-base leading-relaxed text-slate-200">
          We build AI-powered websites, lead-capture systems, workflow automations, and internal tools that help businesses
          streamline operations and grow faster.
        </p>
        <p className="text-base leading-relaxed text-slate-200">
          Please visit our social pages for updates or contact us directly:
          <br />
          Instagram: @rapidriseai &nbsp;|&nbsp; Facebook: Rapid Rise AI &nbsp;|&nbsp; LinkedIn: Rapid Rise AI
          <br />
          Email: hello@rapidriseai.com &nbsp;|&nbsp; Phone: (555) 123-4567
        </p>

        <div className="fixed bottom-2 left-2 z-[10000] h-10 w-10 rounded-md opacity-0 transition-opacity duration-200 hover:opacity-100">
          <form onSubmit={handleSubmit} className="flex h-full w-[260px] items-center gap-2 rounded-md border border-white/25 bg-black/80 p-2 text-xs shadow-lg">
            <label htmlFor="admin-code" className="sr-only">
              Admin code
            </label>
            <input
              id="admin-code"
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Admin code"
              className="h-8 flex-1 rounded border border-white/20 bg-white/10 px-2 text-white placeholder:text-slate-300 focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isSubmitting || !code.trim()}
              className="h-8 rounded bg-cyan-400 px-3 font-semibold text-slate-900 disabled:cursor-not-allowed disabled:bg-cyan-400/50"
            >
              Enter
            </button>
          </form>
          {error ? <p className="mt-1 max-w-[260px] text-[11px] text-rose-300">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
