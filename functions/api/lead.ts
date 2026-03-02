export const onRequestPost = async (context: {
  request: Request;
  env: {
    NEXT_PUBLIC_APPS_SCRIPT_BASE_URL?: string;
    APPS_SCRIPT_BASE_URL?: string;
  };
}) => {
  const appsScriptBaseUrl = context.env.APPS_SCRIPT_BASE_URL || context.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;

  if (!appsScriptBaseUrl) {
    return Response.json({ ok: false, error: 'Apps Script URL is not configured.' }, { status: 500 });
  }

  try {
    const payload = await context.request.json();
    const upstreamResponse = await fetch(appsScriptBaseUrl, {
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
};
