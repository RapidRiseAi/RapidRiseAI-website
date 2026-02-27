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

## 2026-02-27 regression follow-up

5. Live runtime re-check (Playwright against `https://rapidriseai-website.team-a6c.workers.dev/`):
   - Botpress scripts still return `200`.
   - `window.botpress` is an object.
   - `.bpChatContainer` and `#fab-root` exist.
   - `#fab-root` host still reports `height: 0`, while launcher inside shadow root reports visible geometry (`64x64`).
   - No console/CSP/mixed-content errors observed.

6. Local runtime check before code change (`http://127.0.0.1:3000`):
   - At `t+1200ms`: fallback visible while native launcher not yet visible.
   - At `t+2200ms`: native launcher visible and fallback hidden.
   - Confirms a startup flash window (~1-2s).

7. Local runtime check after code change (`http://127.0.0.1:3000`):
   - At `t+1200ms`: fallback hidden, native not yet visible.
   - At `t+2200ms` onward: native launcher visible, fallback remains hidden.
   - After forced native hide (`#fab-root { display: none; }`), fallback appears as fail-safe.

## Additional screenshot artifacts
- Live baseline: `browser:/tmp/codex_browser_invocations/2d407805d0eaa21b/artifacts/artifacts/live-before-fix.png`
- Local before (flash visible): `browser:/tmp/codex_browser_invocations/1ec38a72e683590e/artifacts/artifacts/local-before-fix-1.2s.png`
- Local before (native visible): `browser:/tmp/codex_browser_invocations/1ec38a72e683590e/artifacts/artifacts/local-before-fix-4s.png`
- Local after (no flash): `browser:/tmp/codex_browser_invocations/34f83866280d13b4/artifacts/artifacts/local-after-fix-9s.png`
- Local after forced fail-safe: `browser:/tmp/codex_browser_invocations/34f83866280d13b4/artifacts/artifacts/local-after-fix-forced-fallback.png`
