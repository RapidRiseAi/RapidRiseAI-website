import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const appsScriptBaseUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_BASE_URL;

  if (!appsScriptBaseUrl) {
    return NextResponse.json({ ok: false, error: 'Apps Script URL is not configured.' }, { status: 500 });
  }

  try {
    const payload = await request.json();
    const upstreamResponse = await fetch(appsScriptBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
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

    return NextResponse.json(responseBody, { status: upstreamResponse.status });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to submit request.' }, { status: 500 });
  }
}
