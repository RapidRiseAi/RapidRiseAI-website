import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { ChatWidget, CookieBanner, Footer, Header } from '@/components/site-chrome';
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
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-[var(--font-inter)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
