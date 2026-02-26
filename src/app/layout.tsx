import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import Script from 'next/script';
import { BotpressLauncher, CookieBanner, Footer, Header } from '@/components/site-chrome';
import { siteContent } from '@/content/siteContent';

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
  metadataBase: new URL('https://rapidriseai.com'),
  title: siteContent.home.seo.title,
  description: siteContent.home.seo.description,
  openGraph: {
    title: siteContent.home.seo.title,
    description: siteContent.home.seo.description,
    images: ['/images/brand/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicons/favicon-24x24.png', type: 'image/png', sizes: '24x24' },
      { url: '/favicons/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicons/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicons/favicon-64x64.png', type: 'image/png', sizes: '64x64' },
      { url: '/favicons/favicon-128x128.png', type: 'image/png', sizes: '128x128' },
      { url: '/favicons/favicon-256x256.png', type: 'image/png', sizes: '256x256' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">
        <Header />
        <main>{children}</main>
        <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" />
        <Script src="https://files.bpcontent.cloud/2024/12/25/17/20241225175107-YFWHYV0L.js" defer />
        <Footer />
        <BotpressLauncher />
        <CookieBanner />
      </body>
    </html>
  );
}
