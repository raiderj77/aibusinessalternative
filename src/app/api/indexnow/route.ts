import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'aibusinessalternative2026key';

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 });
    }

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'aibusinessalternative.com',
        key: INDEXNOW_KEY,
        keyLocation: 'https://aibusinessalternative.com/indexnow-key.txt',
        urlList: urls.map((url: string) =>
          url.startsWith('http') ? url : `https://aibusinessalternative.com${url}`
        ),
      }),
    });

    return NextResponse.json({
      success: true,
      status: response.status,
      submitted: urls.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ key: INDEXNOW_KEY });
}
