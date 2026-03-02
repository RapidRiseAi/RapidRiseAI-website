# Rapid Rise AI Website

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS
- Reusable UI components inspired by shadcn patterns
- Framer Motion micro animations

## Environment variables
```env
NEXT_PUBLIC_APPS_SCRIPT_BASE_URL=
APPS_SCRIPT_BASE_URL=
SCRIPT_EXEC_URL=
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

## Cloudflare Pages + Wrangler static deploy note
This repository uses `next build` static export (`output: 'export'`) and serves `out/` via Wrangler assets. In this mode, Next.js App Router API routes under `src/app/api/*` are not available at runtime.

To keep `/api/lead` working in production in this repo, deploy the Wrangler Worker (`worker.ts`) with static assets (`out/`).

## Cloudflare Pages setup (important)
When deploying on Cloudflare Pages, set the lead form env vars in the Pages project:

1. Go to **Cloudflare Dashboard → Workers & Pages → your Pages project → Settings → Variables and Secrets**.
2. Add these as **Environment Variables** for each environment you use (Preview/Production):
   - `APPS_SCRIPT_BASE_URL` = your deployed Google Apps Script web app URL (recommended, server-only).
   - or `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL` if you prefer parity with frontend config.
   - legacy compatibility: `SCRIPT_EXEC_URL` is also accepted by the Worker.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = your Cloudflare Turnstile site key.
3. Save and redeploy.

### Which screen to use in Cloudflare?
Use the variables screen attached to the **Pages project runtime/build environment** (`Workers & Pages` project settings). Do not rely on unrelated account-level variable screens.

## Apps Script deployment
1. Follow `/apps-script/README.md`.
2. Deploy Apps Script as a Web App with access set to Anyone.
3. Copy the deployed web app URL to `APPS_SCRIPT_BASE_URL` in Cloudflare Pages/Workers variables (recommended).
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
- **Turnstile console PAT 401 / repeated challenge logs**: Cloudflare may log Private Access Token (PAT) checks and challenge internals in DevTools. A 401 PAT probe can be expected; if widget loops continuously, verify Turnstile hostname allowlist and ensure only one widget instance is rendered per form.
- **CSP report-only logs (`script-src 'none'`)**: these can come from report-only policies or browser extensions and may appear noisy in console. If submissions fail, prioritize network status for `POST /api/lead` and backend response over report-only warnings.
- **Autocomplete warning**: browser warning only; add `autocomplete` attributes to form fields to improve autofill behavior.
- **`/api/lead` returns 404 in production**: this happens if only static assets are deployed without the Worker route. Ensure `worker.ts` is deployed (not assets-only).
- **500 from `/api/lead`**: missing/invalid Apps Script URL variable or upstream fetch failure. Use one canonical variable only (recommended: `APPS_SCRIPT_BASE_URL`). Worker fallback order is `APPS_SCRIPT_BASE_URL` → `SCRIPT_EXEC_URL` → `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL`, so an incorrect higher-priority value can override a correct lower-priority one.
- **Apps Script URL format**: use the deployed Web App `/exec` URL, not the editor URL.
- **See exact worker error**: inspect `POST /api/lead` response body in Network tab (it now includes a `detail` message for upstream fetch failures).
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
