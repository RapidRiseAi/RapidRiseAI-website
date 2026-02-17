export const dynamic = 'force-static';

import { staticRoutes } from '@/lib/site-routes';

const siteUrl = 'https://rapidriseai.com';

export function GET() {
  const now = new Date().toISOString();

  const entries = staticRoutes
    .map((route) => {
      const url = `${siteUrl}${route === '/' ? '' : route}`;
      return `<url><loc>${url}</loc><lastmod>${now}</lastmod></url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
