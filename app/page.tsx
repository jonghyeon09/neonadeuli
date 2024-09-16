import { usePalace } from '@/hooks/usePalace';
import ClientComponent from './client-component';

export default async function Home() {
  // const { palace } = await usePalace();

  return <ClientComponent />;
}
