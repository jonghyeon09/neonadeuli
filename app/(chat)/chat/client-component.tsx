'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useState } from 'react';
import { useCourse } from '@/hooks/useCourse';

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const { course, locationName, locationId, lastId, prev, next, handleNext } =
    useCourse();

  const handleOpenClick = () => setOpen(!isOpen);

  return (
    <>
      <LineMap
        course={course}
        location={locationName}
        locationId={locationId}
        lastId={lastId}
        prev={prev}
        next={next}
        onNext={handleNext}
        onPrev={handleNext}
        onOpen={handleOpenClick}
        isOpen={isOpen}
      />
      <ChatSection></ChatSection>
    </>
  );
}
