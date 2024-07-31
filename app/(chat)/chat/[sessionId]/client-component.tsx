'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useEffect, useMemo, useState } from 'react';
import { useCourse } from '@/hooks/useCourse';
import UserMessage from '@/components/chat/UserMessage';
import ChatbotMessage from '@/components/chat/ChatbotMessage';
import RecommendationQuestion from '@/components/chat/RecommendationQuestion';
import SendSection from '@/components/chat/SendSection';
import PlusIcon from '@/components/icons/PlusIcon';
import SendInput from '@/components/chat/SendInput';
import useInput from '@/hooks/useInput';
import HandIcon from '@/components/icons/HandIcon';
import api from '@/app/api';
import type { BotMessage, SendMessage } from '@/types/api';
import { useParams } from 'next/navigation';
import { Messages, useSessions } from '@/store';

const questions = [
  '재밌는 이야기 해주세요',
  '뭔가 자극적인 이야기가 듣고 싶어요',
  '여기에 어떤 사람들이 묵었나요?',
];

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const [renderElement, setRenderElement] = useState<JSX.Element[]>([]);
  const { course, locationName, locationId, lastId, prev, next, handleNext } =
    useCourse();
  const { isStorage, sessionsMessage, setSessionMessages, syncStorage } =
    useSessions();
  const { value, onChange, reset } = useInput('');
  const params = useParams<{ sessionId: string }>();
  const sessionId = useMemo(() => Number(params.sessionId), [params.sessionId]);
  const messages = useMemo(() => {
    let memo: Messages = [];

    sessionsMessage.forEach((session) => {
      if (session[sessionId]?.location.id == locationId) {
        memo.push(...session[sessionId].location.messages);
      }
    });

    return memo;
  }, [locationId, sessionId, sessionsMessage]);

  const handleOpenClick = () => setOpen(!isOpen);
  const handleQuestionClick = (question: string) => {
    console.log(question);
    const send = async () => {
      const res = await api.messages(sessionId, {
        content: question,
        role: 'user',
        timestamp: new Date().toISOString(),
      });
      if (!res) return;

      setSessionMessages(sessionId, locationId, [...messages, res]);
    };

    send();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messages[messages.length - 1].content == '') {
      return;
    }

    console.log(value);
    reset();
  };

  useEffect(() => {
    console.log();
  }, []);

  useEffect(() => {
    let render: JSX.Element[] = [];

    messages.forEach((message) => {
      const el =
        message.role == 'user' ? (
          <UserMessage text={message.content} key={message.timestamp} />
        ) : (
          <ChatbotMessage
            text={message.content}
            key={message.id}
            isLoading={message.content.length == 0 ? true : false}
          />
        );
      render.push(el);

      if (render.length == 2) {
        const el = (
          <RecommendationQuestion
            key={'questions'}
            questions={questions}
            onClick={handleQuestionClick}
          />
        );
        render.push(el);
      }
    });

    setRenderElement(render);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    syncStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isStorage) return;
    if (messages.length !== 0) return;

    let firstMessage: Messages;
    const sendMessage: SendMessage = {
      content: `${locationName} 도착`,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    const firstBot: BotMessage = {
      id: 0,
      content: '',
      role: 'assistant',
      session_id: 0,
      timestamp: new Date().toISOString(),
    };

    firstMessage = [sendMessage, firstBot];

    setSessionMessages(sessionId, locationId, firstMessage);

    const send = async () => {
      const res = await api.messages(sessionId, sendMessage);

      if (res) {
        firstMessage[1] = res;
        setSessionMessages(sessionId, locationId, firstMessage);
      }
    };

    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);

  useEffect(() => {}, []);

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
        {renderElement}
        {/* <UserMessage /> */}
        {/* <ChatbotMessage /> */}
      </ChatSection>
    </>
  );
}
