import ClientComponent from './client-component';
import api from '@/app/api';
import { cookies } from 'next/headers';

const user_id = cookies().get('user_id')?.value;

const getSesstionId = async () => {
  const res = await api.sesstions({
    heritage_id: 1,
    user_id: Number(user_id),
  });
  console.log(res);

  return res?.session_id;
};

export default async function Page() {
  const sesstionId = await getSesstionId();

  return <ClientComponent sesstionId={sesstionId} />;
}
