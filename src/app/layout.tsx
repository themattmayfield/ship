import '@/styles/globals.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
const RootLayout = ({ children }: { children: ReactNode }) => {
  const CLIENT_ID = process.env.CLIENT_ID;

  // if user isn't logged in, redirect to github login
  const accessToken = cookies().get('access_token');

  if (!accessToken) {
    const callbackUrl = new URL('https://github.com/login/oauth/authorize');
    callbackUrl.searchParams.set('client_id', CLIENT_ID);
    callbackUrl.searchParams.set('scope', 'repo notifications read:user');
    if (process.env.NODE_ENV !== 'production') {
      callbackUrl.searchParams.set(
        'redirect_uri',
        'http://localhost:3000/api/callback'
      );
    }
    redirect(callbackUrl.toString());
    return;
  }

  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
