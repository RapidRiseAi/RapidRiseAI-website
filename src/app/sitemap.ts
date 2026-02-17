import type { MetadataRoute } from 'next';
const routes = ['','/solutions','/solutions/lead-capture','/solutions/workflow-automation','/solutions/google-workspace','/solutions/web-apps','/solutions/websites','/solutions/training','/work','/pricing','/education','/education/ai-for-work','/about','/contact','/quote','/book','/privacy','/terms','/cookies'];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((r) => ({ url: `https://rapidriseai.com${r}`, lastModified: new Date() })); }
