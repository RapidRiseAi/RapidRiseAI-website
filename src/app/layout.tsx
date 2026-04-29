import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import Script from 'next/script';
import { BotpressLauncher, CookieBanner, Footer, Header, MobileStickyCtaBar } from '@/components/site-chrome';
import { MobileDetector } from '@/components/mobile-detector';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { MaintenanceGate } from '@/components/maintenance-gate';

const inter = localFont({
  src: '../..//node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2',
  variable: '--font-inter',
  weight: '400',
  display: 'swap',
});

const jakarta = localFont({
  src: '../..//node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2',
  variable: '--font-jakarta',
  weight: '600',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({ path: '/' }),
};

const mobileDetectionScript = `
(function () {
  function applyDeviceMode() {
    if (!document.body) return;

    var mobileUaRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
    var isMobile =
      window.matchMedia('(max-width: 900px)').matches ||
      mobileUaRegex.test(window.navigator.userAgent) ||
      (window.navigator.maxTouchPoints > 0 && window.innerWidth <= 1024);

    document.body.classList.toggle('mobile-view', isMobile);
    document.body.dataset.device = isMobile ? 'mobile' : 'desktop';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDeviceMode, { once: true });
    return;
  }

  applyDeviceMode();
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const MAINTENANCE_MODE = true;
  const maintenanceModeEnabled = MAINTENANCE_MODE || process.env.MAINTENANCE_MODE === 'true' || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-[var(--font-inter)] antialiased" data-device="desktop">
        <Script id="mobile-detection" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: mobileDetectionScript }} />
        <MobileDetector />
        <div aria-hidden={maintenanceModeEnabled} inert={maintenanceModeEnabled}>
          <Header />
          <main>{children}</main>
          <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" />
          <Script src="https://files.bpcontent.cloud/2024/12/25/17/20241225175107-YFWHYV0L.js" defer />
          <Footer />
          <CookieBanner />
          <MobileStickyCtaBar />
          <BotpressLauncher />
        </div>
        {maintenanceModeEnabled ? <MaintenanceGate /> : null}
      </body>
    </html>
  );
}
