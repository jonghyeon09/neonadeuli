'use client';
import HistoryItem from '@/components/chat/HistoryItem';
import NewButton from '@/components/chat/NewButton';
import { useSessions } from '@/store';
import Link from 'next/link';

export default function Page() {
  const { sessions } = useSessions();
  return (
    <>
      <div className="relative pb-[144px] w-full">
        {sessions.map((session) => (
          <Link
            scroll={false}
            href={`/chat/${session.session_id}`}
            key={session.session_id}
          >
            <HistoryItem
              name={session.heritage_name}
              message="ㅁㅇㄹㄴㅇㅁ"
              time="1시간 전"
            />
          </Link>
        ))}

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 my-[80px]">
          <Link href={'/chat'} scroll={false}>
            <NewButton text="새 문의하기"></NewButton>
          </Link>
        </div>
      </div>
    </>
  );
}
