export const dynamic = 'force-static';

const robotsContent = `User-agent: *
Allow: /

Sitemap: https://rapidriseai.com/sitemap.xml
`;

export function GET() {
  return new Response(robotsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
