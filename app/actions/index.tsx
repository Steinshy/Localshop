// NextJS
import { cookies } from 'next/headers';

// Utils
import { FetchManager } from '@utils/fetchManager';

const isProd = process.env.NODE_ENV === 'production';
export const base_url = isProd ? 'http://api.sandfox.ovh/v1' : 'http://api.localshop.test:3005/v1';
export const api = new FetchManager(base_url);

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
