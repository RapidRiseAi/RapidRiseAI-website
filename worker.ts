type AssetFetcher = { fetch: (request: Request) => Promise<Response> };

type Env = {
  ASSETS: AssetFetcher;
  APPS_SCRIPT_BASE_URL?: string;
  NEXT_PUBLIC_APPS_SCRIPT_BASE_URL?: string;
  SCRIPT_EXEC_URL?: string;
};

function normalizeUrl(value?: string): string {
  return (value || '').trim().replace(/^['"]|['"]$/g, '');
}

function getAppsScriptConfig(env: Env) {
  const options = [
    { key: 'APPS_SCRIPT_BASE_URL', value: normalizeUrl(env.APPS_SCRIPT_BASE_URL) },
    { key: 'SCRIPT_EXEC_URL', value: normalizeUrl(env.SCRIPT_EXEC_URL) },
    { key: 'NEXT_PUBLIC_APPS_SCRIPT_BASE_URL', value: normalizeUrl(env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL) },
  ] as const;

  const selected = options.find((option) => option.value);
  return {
    url: selected?.value || '',
    source: selected?.key || '',
    configuredKeys: options.filter((option) => option.value).map((option) => option.key),
  };
}

async function handleLeadRequest(request: Request, env: Env): Promise<Response> {
  if (request.method === 'GET') {
    const config = getAppsScriptConfig(env);
    return Response.json({ ok: true, hasAppsScriptUrl: Boolean(config.url), source: config.source, configuredKeys: config.configuredKeys }, { status: 200 });
  }

  if (request.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
  }

  const config = getAppsScriptConfig(env);
  if (!config.url) {
    return Response.json({ ok: false, error: 'Apps Script URL is not configured.', configuredKeys: config.configuredKeys }, { status: 500 });
  }

  let parsedAppsScriptUrl: URL;
  try {
    parsedAppsScriptUrl = new URL(config.url);
  } catch {
    return Response.json({ ok: false, error: 'Apps Script URL is invalid.', source: config.source }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(parsedAppsScriptUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseText = await upstreamResponse.text();
    let responseBody: unknown = { ok: upstreamResponse.ok };

    if (responseText) {
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = { ok: upstreamResponse.ok, raw: responseText };
      }
    }

    return Response.json(responseBody, { status: upstreamResponse.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown fetch error';
    return Response.json({ ok: false, error: 'Unable to reach Apps Script endpoint.', detail: message, source: config.source }, { status: 500 });
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/lead') {
      return handleLeadRequest(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

export default worker;
