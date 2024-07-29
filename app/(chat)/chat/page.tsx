import ClientComponent from './client-component';
import api from '@/app/api';
import { cookies } from 'next/headers';

const getSesstion = async () => {
  const user_id = cookies().get('user_id')?.value;
  const res = await api.sesstions({
    heritage_id: 1,
    user_id: Number(user_id),
  });
  console.log(res);

  return res;
};

export default async function Page() {
  const sesstion = await getSesstion();

  return <ClientComponent session={sesstion} />;
}
