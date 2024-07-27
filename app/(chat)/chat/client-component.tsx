'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useState } from 'react';
import { useCourse } from '@/hooks/useCourse';
import UserMessage from '@/components/chat/UserMessage';
import ChatbotMessage from '@/components/chat/ChatbotMessage';
import RecommendationQuestion from '@/components/chat/RecommendationQuestion';

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const { course, locationName, locationId, lastId, prev, next, handleNext } =
    useCourse();

  const questions = [
    '재밌는 이야기 해주세요',
    '뭔가 자극적인 이야기가 듣고 싶어요',
    '여기에 어떤 사람들이 묵었나요?',
  ];

  const handleOpenClick = () => setOpen(!isOpen);
  const handleQuestionClick = (question: string) => {
    console.log(question);
  };

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
      <ChatSection>
        <UserMessage />
        <ChatbotMessage />
        <RecommendationQuestion
          questions={questions}
          onClick={handleQuestionClick}
        />
      </ChatSection>
    </>
  );
}
