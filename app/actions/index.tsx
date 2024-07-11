import { FetchManager } from '@utils/fetchManager';

import { cookies } from 'next/headers';

export const base_url = 'http://api.localshop.test:3005/v1',
  api = new FetchManager(base_url);

export function setCookieLogin(userID: number) {
  cookies().set({
    name: 'user',
    value: userID.toString(),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    domain: '.localshop.test',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export function cookiesLogout() {
  cookies().set({
    name: 'user',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    domain: '.localshop.test',
    maxAge: -1,
  });
}
