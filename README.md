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

## End-to-end form setup (from scratch)

Use this when you want Quote / Booking / Contact forms to save into Google Sheets.

### 1) Create your Cloudflare Turnstile widget (detailed)

This is done in your **Cloudflare dashboard** (not in Google Apps Script).

1. Log in to Cloudflare: `https://dash.cloudflare.com/`.
2. In the left sidebar, go to **Turnstile**.
   - If you do not see it, use the top search bar and search for **Turnstile**.
3. Click **Add widget** (or **Create widget**).
4. Configure the widget:
   - **Widget name**: use something clear like `rapidriseai-website-forms`.
   - **Hostname management**:
     - Add your production domain, e.g. `rapidriseai.com`.
     - Add `www` version if used, e.g. `www.rapidriseai.com`.
     - For local testing, add `localhost`.
   - **Widget mode/type**: managed/default is fine.
5. Click **Create**.
6. Cloudflare shows two keys:
   - **Site key** (public key used by frontend widget)
   - **Secret key** (private key used server-side only)

Map these keys exactly:
- Site Key → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (in website env vars)
- Secret Key → `TURNSTILE_SECRET` (in Apps Script Script Properties)

Where to paste each key:
- **Frontend (local)**: in `.env.local`
  ```env
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your_site_key>
  ```
- **Frontend (production on Cloudflare Pages)**:
  - Cloudflare Pages project → **Settings** → **Environment variables**
  - Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Apps Script**:
  - Open your Apps Script project
  - Click gear icon **Project Settings**
  - Under **Script properties**, add key `TURNSTILE_SECRET` with your secret value

Important:
- Never expose the **secret key** in frontend env vars or client code.
- If Turnstile fails later, check that the exact domain you are testing is listed in the widget hostnames.

### 2) Create the Google Apps Script web app
1. Go to [script.google.com](https://script.google.com) and create a new project.
2. Replace the default file content with `/apps-script/Code.gs` from this repo.
3. Open **Project Settings** and set Script Properties:
   - `TURNSTILE_SECRET` = your Turnstile secret key
   - `INTERNAL_NOTIFICATION_EMAIL` = team inbox for submission alerts (optional)
4. Deploy:
   - **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL.

### 3) Wire the website to Apps Script
Set these in `.env.local` (and your production env):

```env
NEXT_PUBLIC_APPS_SCRIPT_BASE_URL=<your_apps_script_web_app_url>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your_turnstile_site_key>
NEXT_PUBLIC_BOTPRESS_EMBED_URL=
NEXT_PUBLIC_BOTPRESS_SHARE_URL=
```

Then restart your dev server.

### 4) Submit test entries
1. Run the site locally and submit each form:
   - `/quote`
   - `/book`
   - `/contact`
2. In Google Drive, a spreadsheet named **Rapid Rise AI Leads** is created automatically.
3. Check tabs:
   - Quote Requests
   - Bookings
   - General Enquiries
4. Confirm an internal email notification arrives (if configured).

### 5) Typical issues and fixes
- **Turnstile failed**: wrong `TURNSTILE_SECRET`, expired/invalid token, or domain not allowed in Turnstile widget.
- **Invalid path**: request body `path` must be one of `quote`, `booking`, `contact`.
- **No rows in sheet**: verify `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL` is set and points to the latest web app deployment URL.
- **Script changed but old behavior persists**: redeploy Apps Script as a new web app version after edits.

### 6) Production checklist
- Set all env vars in your Cloudflare Pages project.
- Ensure Turnstile widget includes your production domain.
- Keep Apps Script Web App access at the minimum needed for your flow.
- Re-test one submission per form after deploy.

## Acceptance checklist
- [ ] All routes exist, no broken links
- [ ] Lighthouse mobile targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- [ ] Quote form writes to Sheets
- [ ] Turnstile validated server side
- [ ] Botpress widget loads and does not break layout
- [ ] Work page supports adding new case studies via content JSON
- [ ] Legal pages present and linked
- [ ] Deployed with HTTPS
