'use client';
import { useModalStore, useSessions } from '@/store';
import type { Session } from '@/types/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientComponent({
  session,
}: {
  session: Session | undefined;
}) {
  const router = useRouter();
  const { setOpen, setClose } = useModalStore();
  const { setSession } = useSessions();

  useEffect(() => {
    const sessionId = session?.session_id;

    setOpen('isSplash');
    if (session) {
      setSession(session);
    }
    if (sessionId) {
      setClose('isSplash');
      router.push(`/chat/${sessionId}`);
    }
  }, []);

  return null;
}
