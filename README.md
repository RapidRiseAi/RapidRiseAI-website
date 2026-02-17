# Rapid Rise AI Website

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS
- Reusable UI components inspired by shadcn patterns
- Framer Motion micro animations

## CONFIG
```env
NEXT_PUBLIC_APPS_SCRIPT_BASE_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_BOTPRESS_EMBED_URL=
INTERNAL_NOTIFICATION_EMAIL=
```

## Local setup
1. `npm install`
2. Copy `.env.example` values into `.env.local`
3. `npm run dev`

## Cloudflare Pages deployment
1. Push repository to Git provider.
2. Create Cloudflare Pages project and choose Next.js preset.
3. Build command: `npm run build`
4. Output directory: `.next`
5. Configure environment variables from CONFIG.
6. Enable HTTPS and custom domain.

## Apps Script deployment
1. Follow `/apps-script/README.md`.
2. Set `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL` to deployed web app URL.
3. Set `TURNSTILE_SECRET` in Apps Script properties.

## Acceptance checklist
- [ ] All routes exist, no broken links
- [ ] Lighthouse mobile targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- [ ] Quote form writes to Sheets
- [ ] Turnstile validated server side
- [ ] Botpress widget loads and does not break layout
- [ ] Work page supports adding new case studies via content JSON
- [ ] Legal pages present and linked
- [ ] Deployed with HTTPS
