'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useState } from 'react';
import { useCourse } from '@/hooks/useCourse';

export default function ClientComponent() {
  const [first, setfirst] = useState();
  const { course, locationName, prev, next, handleNext } = useCourse();

  return (
    <>
      <LineMap
        course={course}
        location={locationName}
        prev={prev}
        next={next}
        onNext={handleNext}
      ></LineMap>
      <ChatSection></ChatSection>
    </>
  );
}
