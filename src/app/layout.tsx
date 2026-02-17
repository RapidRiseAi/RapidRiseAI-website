import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ChatWidget, CookieBanner, Footer, Header } from '@/components/site-chrome';
import { siteContent } from '@/content/siteContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://rapidriseai.com'),
  title: siteContent.home.seo.title,
  description: siteContent.home.seo.description,
  openGraph: { title: siteContent.home.seo.title, description: siteContent.home.seo.description, images: ['/og-image-placeholder.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
