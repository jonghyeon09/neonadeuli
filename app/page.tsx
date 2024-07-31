import { usePalace } from '@/hooks/usePalace';
import { getPalace } from './api/openApi';
import ClientComponent from './client-component';

export default async function Home() {
  const { palace } = await usePalace();

  return <ClientComponent palace={palace} />;
}
