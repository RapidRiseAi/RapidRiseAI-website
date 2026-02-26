'use client';

import { useEffect } from 'react';

type BotpressApi = {
  config?: (settings: Record<string, unknown>) => void;
  on?: (eventName: string, listener: () => void) => void;
};

declare global {
  interface Window {
    botpress?: BotpressApi;
  }
}

const FORCE_LAUNCHER_STYLE = {
  opacity: '1',
  visibility: 'visible',
  pointerEvents: 'auto',
};

function enforceLauncherVisibility() {
  const fabRoot = document.querySelector('#fab-root') as HTMLElement | null;
  const shadowRoot = fabRoot?.shadowRoot;

  if (!shadowRoot) {
    return false;
  }

  const launcher = shadowRoot.querySelector(
    '.bpFABWebchat, .bpWebchat, [class*="fab" i], [class*="launcher" i], button'
  ) as HTMLElement | null;

  if (!launcher) {
    return false;
  }

  Object.assign(launcher.style, FORCE_LAUNCHER_STYLE);

  return true;
}

export function BotpressLauncherVisibility() {
  useEffect(() => {
    let observer: MutationObserver | undefined;
    let attempts = 0;
    const maxAttempts = 50;

    const applyConfigAndVisibility = () => {
      attempts += 1;

      const botpress = window.botpress;
      if (botpress?.config) {
        botpress.config({ hideWidget: false });
      }

      const applied = enforceLauncherVisibility();
      if (applied || attempts >= maxAttempts) {
        return;
      }

      window.setTimeout(applyConfigAndVisibility, 200);
    };

    const observeFabRoot = () => {
      const fabRoot = document.querySelector('#fab-root') as HTMLElement | null;
      const shadowRoot = fabRoot?.shadowRoot;

      if (!shadowRoot) {
        return;
      }

      observer?.disconnect();
      observer = new MutationObserver(() => {
        enforceLauncherVisibility();
      });

      observer.observe(shadowRoot, { attributes: true, childList: true, subtree: true });
      enforceLauncherVisibility();
    };

    applyConfigAndVisibility();

    window.botpress?.on?.('webchat:ready', () => {
      applyConfigAndVisibility();
      observeFabRoot();
    });

    window.botpress?.on?.('webchat:initialized', () => {
      applyConfigAndVisibility();
      observeFabRoot();
    });

    const rootObserver = new MutationObserver(() => {
      observeFabRoot();
    });

    rootObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      rootObserver.disconnect();
    };
  }, []);

  return null;
}
