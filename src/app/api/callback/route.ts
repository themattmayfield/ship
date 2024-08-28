import { setAccessToken } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      // "user-agent": "github-lite",
      accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  });
  const result = await response.json();

  if (result.error) {
    return new Response(JSON.stringify(result), { status: 401 });
  }

  setAccessToken(result.access_token);

  return redirect('/');
}
