import ClientComponent from './client-component';
import api from '@/app/api';
import { cookies } from 'next/headers';

const getSesstion = async () => {
  const user_id = cookies().get('user_id')?.value;
  console.log(user_id);

  if (user_id) {
    const res = await api.sesstions({
      heritage_id: 1,
      user_id: Number(user_id),
    });

    return res;
  }
};

export default async function Page() {
  const sesstion = await getSesstion();

  return <ClientComponent session={sesstion} />;
}
