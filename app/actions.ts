'use server';

import { cookies } from 'next/headers';

export function setCookie(name: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(name, value, { path: '/', httpOnly: true });
}
