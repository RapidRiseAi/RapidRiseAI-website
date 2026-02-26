# Botpress launcher investigation evidence

## Commands and observed outputs

1. Live check (Playwright against `https://rapidriseai-website.team-a6c.workers.dev/`):
   - Botpress script statuses: inject.js `200`, bpcontent config `200`.
   - `window.botpress` available.
   - `.bpChatContainer`, `#fab-root`, and shadow-root launcher nodes present.
   - `#fab-root` host geometry was `w: 0, h: 0` during unreliable state.
   - No console errors.

2. Local check (Playwright against `http://127.0.0.1:3000` before fix):
   - Botpress scripts loaded `200`.
   - `window.botpress` available.
   - `#fab-root` host geometry was `w: 0, h: 0`.

3. Local check (Playwright after fix):
   - Initial state: native launcher visible and fallback hidden.
   - After programmatically setting `#fab-root { display: none; }`: fallback button became visible.

4. Build/lint checks:
   - `npm run build`: passed.
   - `npm run lint`: blocked by interactive `next lint` first-time setup prompt.

## Screenshot artifacts
- Live before: `browser:/tmp/codex_browser_invocations/6cee255fe1ef500f/artifacts/artifacts/live-before.png`
- Local before: `browser:/tmp/codex_browser_invocations/70cd845fee01aa0e/artifacts/artifacts/local-before.png`
- Local after: `browser:/tmp/codex_browser_invocations/c01e6f72df3031aa/artifacts/artifacts/local-after.png`
