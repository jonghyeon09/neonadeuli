import api from '@/app/api';
import ClientComponent from './client-component';
import { INITIAL_CENTER } from '@/store';
import { AreaCode } from '@/types/api';

const getList = async () => {
  const { data, status } = await api.heritageList({
    user_latitude: INITIAL_CENTER[0],
    user_longitude: INITIAL_CENTER[1],
    page: 1,
    limit: 10,
  });

  if (status == 200) {
    return data;
  }
};

export default async function Page() {
  const list = await getList();

  return <ClientComponent initList={list} />;
}
