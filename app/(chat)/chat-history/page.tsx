'use client';
import HistoryItem from '@/components/chat/HistoryItem';
import NewButton from '@/components/chat/NewButton';
import { useSessions } from '@/store';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import { 경복궁 } from '@/hooks/usePalace';

dayjs.extend(relativeTime);
dayjs.locale(ko);

export default function Page() {
  const { sessions, sessionMessages } = useSessions();

  const getLastMessage = (id: number) => {
    let content = '';
    let time = '';

    for (const session of sessionMessages) {
      const messages = session[id]?.messages || [];

      for (const message of messages) {
        if ('content' in message) {
          content = message.content;
          time = dayjs(message.timestamp).fromNow();
        }
      }
    }

    return {
      content,
      time,
    };
  };

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
              src={경복궁}
              name={session.heritage_name}
              message={getLastMessage(session.session_id).content}
              time={getLastMessage(session.session_id).time}
            />
          </Link>
        ))}

        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 my-[80px]">
          <Link href={'/chat'} scroll={false}>
            <NewButton text="새 대화하기"></NewButton>
          </Link>
        </div>
      </div>
    </>
  );
}
