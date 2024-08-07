'use client';
import api from '@/app/api';
import { useModalStore, useSessions } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientComponent() {
  const router = useRouter();
  const { setOpen, setClose } = useModalStore();
  const { setSession, initSessions } = useSessions();

  const getSesstion = async () => {
    const userId = localStorage.getItem('user_id');

    setOpen('isSplash');

    if (userId) {
      const { data, status } = await api.sesstions({
        heritage_id: 2944,
        user_id: Number(userId),
      });

      if (status != 200) {
        localStorage.removeItem('user_id');
        initSessions();
        alert('세션 생성 실패');
        router.push('/');
      } else {
        setSession(data);
        router.push(`/chat/${data.session_id}`);
      }
    }
    setClose('isSplash');
  };

  useEffect(() => {
    getSesstion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
