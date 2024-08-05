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
import { useSessions } from '@/store';
import LodaingMessage from '@/components/chat/LodaingMessage';
import useScroll from '@/hooks/useScroll';
import type { SendMessage } from '@/types/api';
import type {
  ErrorMessage,
  InfoMessage,
  Message,
  QuizMessage,
} from '@/types/chat';
import type { Visit } from '@/types/course';
import SendIcon from '@/components/icons/SendIcon';
import OptionSection from '@/components/chat/OptionSection';
import CloseIcon from '@/components/icons/CloseIcon';
import QuizChoice from '@/components/chat/QuizChoice';

const questions = [
  '재밌는 이야기 해주세요',
  '뭔가 자극적인 이야기가 듣고 싶어요',
  '여기에 어떤 사람들이 묵었나요?',
];

const errorMessage: ErrorMessage = {
  content: '문제가 발생하였습니다.',
  role: 'error',
  timestamp: new Date().toISOString(),
};

export default function ClientComponent() {
  const [isOpen, setOpen] = useState(true);
  const [isOption, setIsOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderElement, setRenderElement] = useState<JSX.Element[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [answerNumber, setAnswerNumber] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [choiceLength, setChoiceLength] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { course, locationName, locationId, lastId, visitLocation } =
    useCourse();
  const {
    isStorage,
    sessionMessages,
    quizCount,
    setSessionMessages,
    initCount,
    setCount,
    syncStorage,
    setCourse,
  } = useSessions();
  const { scrollToBottom } = useScroll();
  const { value, onChange, reset } = useInput('');
  const params = useParams<{ sessionId: string }>();
  const sessionId = useMemo(() => Number(params.sessionId), [params.sessionId]);
  const messages = useMemo(() => {
    let memo: Message[] | undefined = undefined;

    for (const el of sessionMessages) {
      memo = el[sessionId]?.messages;
    }

    return memo;
  }, [sessionId, sessionMessages]);
  const count = useMemo(() => quizCount[sessionId], [quizCount, sessionId]);

  const send = async (sendMessage: SendMessage) => {
    setIsLoading(true);

    const { data, status } = await api.messages(sessionId, sendMessage);

    if (status == 200) {
      setSessionMessages({
        message: data,
        sessionId: sessionId,
      });
    } else {
      setSessionMessages({
        message: errorMessage,
        sessionId: sessionId,
      });
    }

    setIsLoading(false);
  };

  const handleLocationInfo = async () => {
    if (isLoading) return;
    setIsOption(false);
    setIsLoading(true);

    const { data, status } = await api.buildingsInfo(sessionId, locationName, {
      building_id: locationId,
    });

    if (status == 200) {
      const messasge: InfoMessage = {
        role: 'info',
        content: data.bot_response,
        image_url: data.image_url,
        timestamp: new Date().toISOString(),
      };

      setSessionMessages({
        message: messasge,
        sessionId: sessionId,
      });
    } else {
      setSessionMessages({
        message: errorMessage,
        sessionId: sessionId,
      });
    }

    setIsLoading(false);
  };

  const handleQuiz = async () => {
    if (isLoading) return;
    if (count == 0) return;

    const send: SendMessage = {
      content: `${locationName}에 대한 퀴즈를 알려줘`,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setSessionMessages({
      sessionId: sessionId,
      message: send,
    });
    setIsOption(false);
    setIsLoading(true);

    const { data, status } = await api.quiz(sessionId, {
      building_id: locationId,
    });

    if (status !== 200) {
      setSessionMessages({
        message: errorMessage,
        sessionId: sessionId,
      });
    } else {
      const options = data.options
        .map((option, i) => `${i + 1}번. ${option}`)
        .join('\n');
      const content = `${data.question}\n\n${options}`;
      const question: QuizMessage = {
        content,
        role: 'quiz',
        timestamp: new Date().toISOString(),
      };

      setSessionMessages({
        sessionId: sessionId,
        message: question,
      });
      setIsQuiz(true);
      setChoiceLength(data.options.length);
      setCount({ sessionId: sessionId, count: data.quiz_count });
      setAnswerNumber(data.answer);
      setExplanation(data.explanation);
    }

    setIsLoading(false);
  };

  const handleChoiceClick = (n: number) => {
    const choice: SendMessage = {
      content: n + '번',
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setSessionMessages({
      message: choice,
      sessionId: sessionId,
    });

    if (answerNumber == n) {
      const correct: QuizMessage = {
        content: `아, 맞췄소!\n${explanation}`,
        role: 'quiz',
        timestamp: new Date().toISOString(),
      };

      setSessionMessages({
        message: correct,
        sessionId: sessionId,
      });

      setIsQuiz(false);
    } else {
      const wrong: QuizMessage = {
        content: `어허, 아쉽구례!\n다시 한 번 생각해 보도록 하시오.`,
        role: 'quiz',
        timestamp: new Date().toISOString(),
      };

      setSessionMessages({
        message: wrong,
        sessionId: sessionId,
      });
    }
  };

  const handleOpenClick = () => setOpen(!isOpen);
  const handleQuestionClick = (question: string) => {
    if (isLoading) return;

    const message: SendMessage = {
      content: question,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    send(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (value.length < 2) {
      alert('2글자 이상 입력');
      return;
    }

    const message: SendMessage = {
      content: value,
      role: 'user',
      timestamp: new Date().toISOString(),
    };
    setSessionMessages({
      message: message,
      sessionId: sessionId,
    });
    reset();

    send(message);
  };

  const handleLocationClick: Visit = (location, rowIndex, colIndex) => {
    if (isLoading) return;
    console.log(location.visited);

    visitLocation(location, rowIndex, colIndex);

    if (!location.visited) {
      const firstMessage: SendMessage = {
        content: `${location.name} 도착`,
        role: 'user',
        timestamp: new Date().toISOString(),
      };
      const copyCourse = course.map((row) => [...row]) || [];

      copyCourse[rowIndex][colIndex].visited = true;
      setCourse({ sessionId: sessionId, course: copyCourse });
      setSessionMessages({
        message: firstMessage,
        sessionId: sessionId,
      });

      send(firstMessage);
    }
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
      message: firstMessage,
      sessionId: sessionId,
    });

    send(firstMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);
  /** */
  useEffect(() => {
    if (!messages) return;
    let render: JSX.Element[] = [];

    messages?.forEach((message, i) => {
      if (!message) return;
      let el;
      if (message.role == 'user') {
        el = (
          <UserMessage
            key={i}
            text={message.content}
            time={message.timestamp}
          />
        );
      } else if (message.role == 'info') {
        el = (
          <ChatbotMessage
            key={i}
            text={message.content}
            time={message.timestamp}
            image={message.image_url}
          />
        );
      } else {
        el = (
          <ChatbotMessage
            key={i}
            text={message.content}
            time={message.timestamp}
          />
        );
      }

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

  useEffect(() => {
    if (!isStorage) return;
    if (!count) {
      initCount(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);

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
        isQuiz={isQuiz}
        sendComponent={
          <>
            <SendSection
              choiceComponent={
                <>
                  {isQuiz && (
                    <QuizChoice
                      length={choiceLength}
                      onClick={handleChoiceClick}
                    />
                  )}
                </>
              }
              optionComponent={
                <OptionSection
                  isOpen={isOption}
                  count={count ? count : 10}
                  onInfo={handleLocationInfo}
                  onQuiz={handleQuiz}
                />
              }
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
          </>
        }
      >
        {renderElement}
        {<LodaingMessage isLoading={isLoading} />}
      </ChatSection>
    </>
  );
}
