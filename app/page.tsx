import ClientComponent from './client-component';
import { login } from './api';
import { cookies } from 'next/headers';
import { setCookie } from './actions';

export default async function Home() {
  const cookie = cookies();

  // if (!token) {
  //   const { nickname, access_token } = await login();
  //   console.log(nickname);
  //   console.log(access_token);
  // }

  return <ClientComponent />;
}
