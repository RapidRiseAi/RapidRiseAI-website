'use client';

import { useEffect } from 'react';

const MOBILE_BREAKPOINT = 900;
const MOBILE_UA_REGEX = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;

function detectMobile() {
  if (typeof window === 'undefined') return false;

  const byViewport = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
  const byUserAgent = MOBILE_UA_REGEX.test(window.navigator.userAgent);
  const byTouch = window.navigator.maxTouchPoints > 0 && window.innerWidth <= 1024;

  return byViewport || byUserAgent || byTouch;
}

export function MobileDetector() {
  useEffect(() => {
    const updateDeviceMode = () => {
      const isMobile = detectMobile();
      document.body.classList.toggle('mobile-view', isMobile);
      document.body.dataset.device = isMobile ? 'mobile' : 'desktop';
    };

    updateDeviceMode();

    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    media.addEventListener('change', updateDeviceMode);
    window.addEventListener('resize', updateDeviceMode);
    window.addEventListener('orientationchange', updateDeviceMode);

    return () => {
      media.removeEventListener('change', updateDeviceMode);
      window.removeEventListener('resize', updateDeviceMode);
      window.removeEventListener('orientationchange', updateDeviceMode);
    };
  }, []);

  return null;
}
