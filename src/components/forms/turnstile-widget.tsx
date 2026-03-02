'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  error?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function TurnstileWidget({ siteKey, onTokenChange, error }: TurnstileWidgetProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  const renderWidget = useCallback(() => {
    if (!siteKey || !isScriptLoaded || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onTokenChangeRef.current(token),
      'expired-callback': () => onTokenChangeRef.current(''),
      'error-callback': () => onTokenChangeRef.current(''),
    });
  }, [isScriptLoaded, siteKey]);

  useEffect(() => {
    renderWidget();
  }, [renderWidget]);

  useEffect(() => {
    return () => {
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-2 rounded-card border border-stroke p-4 text-sm text-text1">
      <p className="text-sm">Spam protection</p>
      {siteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setIsScriptLoaded(true)}
          />
          <div ref={containerRef} className="min-h-[65px]" />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </>
      ) : (
        <p className="text-xs text-red-400">Turnstile site key is missing. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.</p>
      )}
    </div>
  );
}
