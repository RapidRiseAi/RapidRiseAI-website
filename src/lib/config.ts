export const CONFIG = {
  appsScriptBaseUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL ?? '',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
  botpressEmbedUrl: process.env.NEXT_PUBLIC_BOTPRESS_EMBED_URL ?? '',
  botpressShareUrl: process.env.NEXT_PUBLIC_BOTPRESS_SHARE_URL ?? '',
  analyticsEnabled: false,
};
