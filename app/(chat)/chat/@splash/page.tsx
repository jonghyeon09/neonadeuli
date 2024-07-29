'use client';
import Splash from '@/components/common/Splash';
import { useModalStore } from '@/store';

export default function Page() {
  const { isSplash } = useModalStore();

  return <>{isSplash && <Splash />}</>;
}
