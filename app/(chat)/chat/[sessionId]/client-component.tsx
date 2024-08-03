'use client';
import ChatSection from '@/components/chat/ChatSection';
import LineMap from '@/components/chat/LineMap';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useParams } from 'next/navigation';
import { Messages, useSessions } from '@/store';
import LodaingMessage from '@/components/chat/LodaingMessage';
import useScroll from '@/hooks/useScroll';
import type { SendMessage } from '@/types/api';
import type { ErrorMessage } from '@/types/chat';
import type { Visit } from '@/types/course';
import SendIcon from '@/components/icons/SendIcon';
import OptionSection from '@/components/chat/OptionSection';
import CloseIcon from '@/components/icons/CloseIcon';

const questions = [
  '재밌는 이야기 해주세요',
  '뭔가 자극적인 이야기가 듣고 싶어요',
  '여기에 어떤 사람들이 묵었나요?',
];

const errorMessage: ErrorMessage = {
  content: '문제가 발생하였습니다.',
  role: 'assistant',
  timestamp: new Date().toISOString(),
};

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const [isOption, setIsOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderElement, setRenderElement] = useState<JSX.Element[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { course, locationName, locationId, lastId, visitLocation } =
    useCourse();
  const { isStorage, sessionMessages, setSessionMessages, syncStorage } =
    useSessions();
  const { scrollToBottom } = useScroll();
  const { value, onChange, reset } = useInput('');
  const params = useParams<{ sessionId: string }>();
  const sessionId = useMemo(() => Number(params.sessionId), [params.sessionId]);
  const messages = useMemo(() => {
    let memo: Messages | undefined = undefined;

    for (const el of sessionMessages) {
      memo = el[sessionId]?.messages;
    }

    return memo;
  }, [sessionId, sessionMessages]);

  const handleOpenClick = () => setOpen(!isOpen);
  const handleQuestionClick = (question: string) => {
    if (isLoading) return;

    const send = async () => {
      setIsLoading(true);

      try {
        const { data, status } = await api.messages(sessionId, {
          content: question,
          role: 'user',
          timestamp: new Date().toISOString(),
        });

        setSessionMessages({
          locationId: locationId,
          message: data,
          sessionId: sessionId,
        });
      } catch (error) {
        setSessionMessages({
          locationId: locationId,
          message: errorMessage,
          sessionId: sessionId,
        });
      }

      setIsLoading(false);
    };

    send();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (value.length < 2) {
      alert('2글자 이상 입력');
      return;
    }

    const send: SendMessage = {
      content: value,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    setSessionMessages({
      locationId: locationId,
      message: send,
      sessionId: sessionId,
    });
    reset();
    setIsLoading(true);

    try {
      const { data, status } = await api.messages(sessionId, send);

      setSessionMessages({
        locationId: locationId,
        message: data,
        sessionId: sessionId,
      });
    } catch (error) {
      setSessionMessages({
        locationId: locationId,
        message: errorMessage,
        sessionId: sessionId,
      });
    }

    setIsLoading(false);
  };

  const handleLocationClick: Visit = (location, rowIndex, colIndex) => {
    if (isLoading) return;
    if (location.visited) return;
    visitLocation(location, rowIndex, colIndex);

    const firstMessage: SendMessage = {
      content: `${location.name} 도착`,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setSessionMessages({
      locationId: location.id,
      message: firstMessage,
      sessionId: sessionId,
    });
    setIsLoading(true);

    const send = async () => {
      try {
        const { data, status } = await api.messages(sessionId, firstMessage);
        console.log(data);
        console.log(status);

        setSessionMessages({
          locationId: locationId,
          message: data,
          sessionId: sessionId,
        });
      } catch (error) {
        setSessionMessages({
          locationId: locationId,
          message: errorMessage,
          sessionId: sessionId,
        });
      }

      setIsLoading(false);
    };

    send();
  };

  const handleFocus = (e: React.FocusEvent) => {
    setIsFocus(true);
  };
  const handleBlur = (e: React.FocusEvent) => {
    setIsFocus(false);
  };

  useEffect(() => {
    // 최초 메시지
    if (!isStorage) return;
    if (!!messages) return; // 값이 있을 때 true

    const firstMessage: SendMessage = {
      content: `${locationName} 도착`,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setSessionMessages({
      locationId: locationId,
      message: firstMessage,
      sessionId: sessionId,
    });
    setIsLoading(true);

    const send = async () => {
      const { data, status } = await api.messages(sessionId, firstMessage);

      setSessionMessages({
        locationId: locationId,
        message: data,
        sessionId: sessionId,
      });
      setIsLoading(false);

      if (status !== 200) {
        setSessionMessages({
          locationId: locationId,
          message: errorMessage,
          sessionId: sessionId,
        });
      }
    };

    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);
  /** */
  useEffect(() => {
    if (!messages) return;
    let render: JSX.Element[] = [];

    messages?.forEach((message) => {
      if (!message) return;
      const el =
        message.role == 'user' ? (
          <UserMessage
            text={message.content}
            key={message.timestamp}
            time={message.timestamp}
          />
        ) : (
          <ChatbotMessage
            text={message.content}
            key={message.timestamp}
            time={message.timestamp}
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
    if (renderElement.length != 0) {
      scrollToBottom();
    }
    if (isLoading) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderElement, isLoading]);

  useEffect(() => {
    if (value.length != 0) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
    return () => {};
  }, [value.length]);

  return (
    <>
      <LineMap
        course={course}
        location={locationName}
        locationId={locationId}
        lastId={lastId}
        onOpen={handleOpenClick}
        isOpen={isOpen}
        onClick={handleLocationClick}
      />
      <ChatSection
        sendComponent={
          <SendSection
            optionComponent={<OptionSection isOpen={isOption} count={10} />}
          >
            <button onClick={() => setIsOption(!isOption)}>
              {isOption ? <CloseIcon /> : <PlusIcon />}
            </button>

            <form
              className="w-full h-[40px] bg-neutral-100 flex pl-3 py-[10px] pr-1 rounded-[20px] relative"
              onSubmit={handleSubmit}
            >
              <SendInput value={value} onChange={onChange} ref={inputRef} />
              <div className="absolute right-0 top-1">
                {isFocus ? (
                  <button onClick={handleSubmit}>
                    <SendIcon />
                  </button>
                ) : (
                  <button className="">
                    <HandIcon />
                  </button>
                )}
              </div>
            </form>
          </SendSection>
        }
      >
        {renderElement}
        {<LodaingMessage isLoading={isLoading} />}
      </ChatSection>
    </>
  );
}
