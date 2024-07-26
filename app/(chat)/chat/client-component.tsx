'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import DetailHeader from '@/components/common/DetailHeader';
import { useState } from 'react';

export default function ClientComponent() {
  const [first, setfirst] = useState();

  return (
    <>
      {/* <DetailHeader title="경복궁"></DetailHeader> */}
      <LineMap></LineMap>
      <ChatSection></ChatSection>
    </>
  );
}
