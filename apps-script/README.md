# Apps Script setup
1. Create a new Apps Script project.
2. Paste `Code.gs` into the script editor.
3. Set Script Properties:
   - `TURNSTILE_SECRET`
   - `INTERNAL_NOTIFICATION_EMAIL` (optional)
4. Deploy as Web App with access set to Anyone.
5. Copy deployment URL into `NEXT_PUBLIC_APPS_SCRIPT_BASE_URL`.
6. Use JSON body `path` with values `quote`, `booking`, `contact`.
