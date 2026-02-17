import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { ChatWidget, CookieBanner, Footer, Header } from '@/components/site-chrome';
import { siteContent } from '@/content/siteContent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rapidriseai.com'),
  title: siteContent.home.seo.title,
  description: siteContent.home.seo.description,
  openGraph: { title: siteContent.home.seo.title, description: siteContent.home.seo.description, images: ['/og-image-placeholder.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-[var(--font-inter)]">
        <Header />
        {children}
        <Footer />
        <ChatWidget />
        <CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': ['Organization', 'LocalBusiness'], name: 'Rapid Rise AI (Pty) Ltd', email: 'team@rapidriseai.com', telephone: '+27 64 903 1234', address: { '@type': 'PostalAddress', addressCountry: 'ZA' } }) }} />
      </body>
    </html>
  );
}
