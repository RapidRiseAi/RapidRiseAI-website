type AssetFetcher = { fetch: (request: Request) => Promise<Response> };

type Env = {
  ASSETS: AssetFetcher;
  APPS_SCRIPT_BASE_URL?: string;
  NEXT_PUBLIC_APPS_SCRIPT_BASE_URL?: string;
  SCRIPT_EXEC_URL?: string;
};

async function handleLeadRequest(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed.' }, { status: 405 });
  }

  const appsScriptBaseUrl = env.APPS_SCRIPT_BASE_URL || env.SCRIPT_EXEC_URL || env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;
  if (!appsScriptBaseUrl) {
    return Response.json({ ok: false, error: 'Apps Script URL is not configured.' }, { status: 500 });
  }

  let parsedAppsScriptUrl: URL;
  try {
    parsedAppsScriptUrl = new URL(appsScriptBaseUrl);
  } catch {
    return Response.json({ ok: false, error: 'Apps Script URL is invalid.' }, { status: 500 });
  }

  try {
    const payload = await request.json();
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
  } catch {
    return Response.json({ ok: false, error: 'Unable to submit request.' }, { status: 500 });
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
