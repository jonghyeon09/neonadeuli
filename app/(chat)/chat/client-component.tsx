'use client';
import { useModalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientComponent({
  sesstionId,
}: {
  sesstionId: number | undefined;
}) {
  const router = useRouter();
  const { setOpen, setClose } = useModalStore();

  useEffect(() => {
    setOpen('isSplash');
    if (sesstionId) {
      setClose('isSplash');
      router.push(`/chat/${sesstionId}`);
    }
  }, [sesstionId]);

  return null;
}
