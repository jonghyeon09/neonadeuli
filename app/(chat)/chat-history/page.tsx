import HistoryItem from '@/components/chat/HistoryItem';
import NewButton from '@/components/chat/NewButton';
import Link from 'next/link';
import React from 'react';

export default async function Page() {
  return (
    <>
      <div className="relative pb-[144px] w-full">
        {/* <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" /> */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 my-[80px]">
          <Link href={'/chat/1'}>
            <NewButton text="새 문의하기"></NewButton>
          </Link>
        </div>
      </div>
    </>
  );
}
