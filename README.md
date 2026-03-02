# Rapid Rise AI Website

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS
- Reusable UI components inspired by shadcn patterns
- Framer Motion micro animations

## Environment variables
```env
NEXT_PUBLIC_APPS_SCRIPT_BASE_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_BOTPRESS_EMBED_URL=
NEXT_PUBLIC_BOTPRESS_SHARE_URL=
INTERNAL_NOTIFICATION_EMAIL=
```

## Local setup
1. `npm install`
2. Copy `.env.example` values into `.env.local`
3. `npm run dev`

## Lead form submission flow (production)
The `/quote`, `/book`, and `/contact` forms submit to the **same-origin API route** `/api/lead`.

1. Browser posts JSON to `/api/lead`.
2. `/api/lead` forwards server-side to `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL`.
3. Apps Script validates Turnstile and writes to Sheets.

This avoids browser-to-Apps-Script CORS errors because the browser only talks to your own domain.

## Cloudflare Pages setup (important)
When deploying on Cloudflare Pages, set the lead form env vars in the Pages project:

1. Go to **Cloudflare Dashboard → Workers & Pages → your Pages project → Settings → Variables and Secrets**.
2. Add these as **Environment Variables** for each environment you use (Preview/Production):
   - `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL` = your deployed Google Apps Script web app URL.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = your Cloudflare Turnstile site key.
3. Save and redeploy.

### Which screen to use in Cloudflare?
Use the variables screen attached to the **Pages project runtime/build environment** (`Workers & Pages` project settings). Do not rely on unrelated account-level variable screens.

## Apps Script deployment
1. Follow `/apps-script/README.md`.
2. Deploy Apps Script as a Web App with access set to Anyone.
3. Copy the deployed web app URL to `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL` in Cloudflare Pages.
4. In Apps Script Script Properties, set:
   - `TURNSTILE_SECRET`
   - `INTERNAL_NOTIFICATION_EMAIL` (optional)

## Verifying successful submissions
1. Open production site `/contact` (or `/quote`, `/book`).
2. Complete the Turnstile challenge and submit.
3. Confirm a 200 response from `/api/lead` in browser network panel.
4. Confirm the corresponding Apps Script sheet tab receives a new row.
5. If enabled, confirm internal notification email arrives.

## Common failures and fixes
- **CORS error in browser**: frontend is likely posting directly to Apps Script instead of `/api/lead`. Ensure all forms post to `/api/lead`.
- **Missing token / Turnstile failed**: Turnstile widget not completed, expired token, or missing `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- **Wrong hostnames in Turnstile**: add your production domain and any preview domains in Cloudflare Turnstile hostname allowlist.
- **500 from `/api/lead`**: missing or incorrect `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL`.
- **400 from Apps Script**: required fields missing or Turnstile verification failed server-side.

## Acceptance checklist
- [ ] All routes exist, no broken links
- [ ] Lighthouse mobile targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- [ ] Quote form writes to Sheets
- [ ] Turnstile validated server side
- [ ] Botpress widget loads and does not break layout
- [ ] Work page supports adding new case studies via content JSON
- [ ] Legal pages present and linked
- [ ] Deployed with HTTPS
