import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secretAdminCode = process.env.SecretAdminCode;

  if (!secretAdminCode) {
    return NextResponse.json({ ok: false, error: 'Admin code is not configured.' }, { status: 500 });
  }

  try {
    const payload = (await request.json()) as { code?: string };
    const isValid = payload.code?.trim() === secretAdminCode;

    if (!isValid) {
      return NextResponse.json({ ok: false, error: 'Invalid admin code.' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unable to process request.' }, { status: 400 });
  }
}
