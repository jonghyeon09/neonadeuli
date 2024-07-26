import HistoryItem from '@/components/chat/HistoryItem';
import NewButton from '@/components/chat/NewButton';
import DetailHeader from '@/components/common/DetailHeader';
import React from 'react';

export default async function Page() {
  return (
    <>
      <DetailHeader title="대화 내역"></DetailHeader>
      <div className="relative pb-[144px] h-full flex-1">
        <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" />
        <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" />
        <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" />
        <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" />
        <HistoryItem name="이름" message="ㅁㅇㄹㄴㅇㅁ" time="1시간 전" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 my-[80px]">
          <NewButton text="새 문의하기"></NewButton>
        </div>
      </div>
    </>
  );
}
