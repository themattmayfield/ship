'use server';

import { cookies } from 'next/headers';

export const setAccessToken = (access_token: string) => {
  cookies().set('access_token', access_token);
};
