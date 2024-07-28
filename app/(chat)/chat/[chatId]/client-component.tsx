'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useEffect, useState } from 'react';
import { useCourse } from '@/hooks/useCourse';
import UserMessage from '@/components/chat/UserMessage';
import ChatbotMessage from '@/components/chat/ChatbotMessage';
import RecommendationQuestion from '@/components/chat/RecommendationQuestion';
import SendSection from '@/components/chat/SendSection';
import PlusIcon from '@/components/icons/PlusIcon';
import SendInput from '@/components/chat/SendInput';
import useInput from '@/hooks/useInput';
import HandIcon from '@/components/icons/HandIcon';
import { sesstions } from '@/app/api';

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const { course, locationName, locationId, lastId, prev, next, handleNext } =
    useCourse();
  const { value, onChange, reset } = useInput('');

  const questions = [
    '재밌는 이야기 해주세요',
    '뭔가 자극적인 이야기가 듣고 싶어요',
    '여기에 어떤 사람들이 묵었나요?',
  ];

  const handleOpenClick = () => setOpen(!isOpen);
  const handleQuestionClick = (question: string) => {
    console.log(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
    reset();
  };

  useEffect(() => {
    const chatId = async () => {
      const chatId = await sesstions();

      console.log(chatId);
    };
    chatId();
  }, []);

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
      <ChatSection
        sendComponent={
          <SendSection>
            <PlusIcon />
            <form
              className="w-full h-[40px] bg-neutral-100 flex pl-8 py-1 pr-1 rounded-[20px] relative"
              onSubmit={handleSubmit}
            >
              <SendInput value={value} onChange={onChange} />
              <button className="">
                <HandIcon />
              </button>
            </form>
          </SendSection>
        }
      >
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
