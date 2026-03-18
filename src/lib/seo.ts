import type { Metadata } from 'next';

export const SITE_NAME = 'Rapid Rise AI';
export const SITE_URL = 'https://www.rapidriseai.com';
export const DEFAULT_TITLE = 'Rapid Rise AI | AI Automation and Education';
export const DEFAULT_DESCRIPTION = 'AI automations, chatbots, and AI education for businesses and professionals.';
export const DEFAULT_OG_TYPE = 'website' as const;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

const normalizePath = (path: string) => {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${normalizePath(path)}`;

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website';
};

export const buildMetadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = DEFAULT_OG_TYPE,
}: BuildMetadataArgs = {}): Metadata => {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
};
