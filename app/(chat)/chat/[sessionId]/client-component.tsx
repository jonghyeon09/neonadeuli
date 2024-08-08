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
import { useModalStore, useSessions } from '@/store';
import LodaingMessage from '@/components/chat/LodaingMessage';
import useScroll from '@/hooks/useScroll';
import type { SendMessage } from '@/types/api';
import type {
  ErrorMessage,
  InfoMessage,
  Message,
  QuizMessage,
  SummaryMessage,
} from '@/types/chat';
import type { Visit } from '@/types/course';
import SendIcon from '@/components/icons/SendIcon';
import OptionSection from '@/components/chat/OptionSection';
import CloseIcon from '@/components/icons/CloseIcon';
import QuizChoice from '@/components/chat/QuizChoice';
import Modal from '@/components/modal/Modal';
import ModalView from '@/components/modal/ModalView';
import Button from '@/components/common/Button';
import ChatSummary from '@/components/chat/ChatSummary';
import dayjs from 'dayjs';

const questions = [
  '재밌는 이야기 해주세요',
  '뭔가 자극적인 이야기가 듣고 싶어요',
  '여기에 어떤 사람들이 묵었나요?',
];

const errorMessage: ErrorMessage = {
  content: '작은 문제가 생겼소. 잠시 후에 다시 시도해 보시는 건 어떠시오?',
  role: 'error',
  timestamp: new Date().toISOString(),
};

export default function ClientComponent() {
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [isOption, setIsOption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [renderElement, setRenderElement] = useState<JSX.Element[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [answerNumber, setAnswerNumber] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [choiceLength, setChoiceLength] = useState(0);
  const [isRecommendation, setIsRecommendation] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [endStatus, setEndStatus] = useState(false);
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
  const { isEndChat, setOpen, setClose } = useModalStore();
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
    if (endStatus) return;
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

  const recommendation = async (id: number = 1) => {
    if (endStatus) return;
    const { data, status } = await api.recommendQuestions(sessionId, {
      building_id: id,
    });

    if (status == 200) {
      setQuestions(data.questions);
      setIsRecommendation(true);
    }
  };

  const handleLocationInfo = async () => {
    if (endStatus) return;
    if (isLoading) return;
    setIsOption(false);
    setIsLoading(true);
    setIsRecommendation(false);

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
    if (endStatus) return;
    if (isLoading) return;
    if (count == 0) return;

    const send: SendMessage = {
      content: `${locationName}에 대한 퀴즈를 알려줘`,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setIsRecommendation(false);
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
        content: `어허, 아쉽구려!\n다시 한 번 생각해 보도록 하시오.`,
        role: 'quiz',
        timestamp: new Date().toISOString(),
      };

      setSessionMessages({
        message: wrong,
        sessionId: sessionId,
      });
    }
  };

  const handleOpenClick = () => setIsOpenMap(!isOpenMap);
  const handleQuestionClick = (question: string) => {
    if (isLoading) {
      alert('잠시만 기다려 주시오.');
      return;
    }

    const message: SendMessage = {
      content: question,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setSessionMessages({
      sessionId: sessionId,
      message,
    });
    send(message);
    setIsRecommendation(false);
    setQuestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (endStatus) return;
    if (isLoading) return;
    if (isQuiz) return;
    if (!isFocus) return;
    if (value.length < 2) {
      alert('2글자 이상 입력');
      return;
    }

    const message: SendMessage = {
      content: value,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setIsRecommendation(false);
    setSessionMessages({
      message: message,
      sessionId: sessionId,
    });
    reset();

    send(message);
  };

  const handleLocationClick: Visit = (location, rowIndex, colIndex) => {
    if (endStatus) return;
    if (isLoading) return;

    visitLocation(location, rowIndex, colIndex);

    if (!location.visited) {
      const firstMessage: SendMessage = {
        content: `${location.name} 도착`,
        role: 'user',
        timestamp: new Date().toISOString(),
      };
      const copyCourse = course.map((row) => [...row]) || [];

      copyCourse[rowIndex][colIndex].visited = true;
      setIsRecommendation(false);
      setCourse({ sessionId: sessionId, course: copyCourse });
      setSessionMessages({
        message: firstMessage,
        sessionId: sessionId,
      });

      send(firstMessage);
      recommendation(location.id);
    }
  };

  const handleEndChat = async () => {
    if (endStatus) return;
    setClose('isEndChat');
    setIsLoading(true);
    setIsRecommendation(false);

    const buildings = course.reduce((acc, val) => [...acc, ...val], []);
    const end = await api.end(sessionId, { buildings });

    if (end.status !== 200) {
      alert('세션 종료 실패');
      return;
    }

    const { data, status } = await api.summary(sessionId);

    if (status !== 200) {
      setSessionMessages({
        message: errorMessage,
        sessionId: sessionId,
      });
    } else {
      const message: SummaryMessage = {
        ...data,
        chat_date: dayjs(data.chat_date).format('YYYY.MM.DD'),
        role: 'summary',
      };

      setSessionMessages({
        message,
        sessionId,
      });
    }

    const check = await api.status(sessionId);

    if (check.status == 200) {
      setEndStatus(check.data.ended_status);
    }

    setIsLoading(false);
  };

  const handleOptionOpen = () => {
    if (endStatus) return;
    setIsOption(!isOption);
  };

  const handleEndClick = () => {
    if (endStatus) return;
    setOpen('isEndChat');
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
    recommendation(locationId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);
  /** */
  useEffect(() => {
    if (!messages) return;
    let render: JSX.Element[] = [];

    messages?.forEach((message, i) => {
      if (!message) return;
      let el = <></>;
      if (message.role == 'summary') {
        el = (
          <ChatSummary
            key={i}
            course={message.building_course}
            date={message.chat_date}
            keywords={message.keywords}
            name={message.heritage_name}
          />
        );
      }
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
        if (message.role !== 'summary') {
          el = (
            <ChatbotMessage
              key={i}
              text={message.content}
              time={message.timestamp}
            />
          );
        }
      }

      render.push(el);
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
    if (isRecommendation) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderElement, isLoading, isRecommendation]);

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
      // initCount(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStorage]);

  useEffect(() => {
    const check = async () => {
      const { data, status } = await api.status(sessionId);

      if (status == 200) {
        setEndStatus(data.ended_status);
      }
    };

    check();
  }, [sessionId]);

  return (
    <>
      {isEndChat && (
        <Modal>
          <ModalView>
            <div className="mb-5 flex flex-col gap-5 items-center">
              <p className="heading">지기톡 종료 안내</p>
              <p className="text-center text-neutrals-1200">
                지기톡을 종료하고 대화를 요약해 드릴까요?
                <br />
                지기톡을 종료하면 더 이상 대화를 나눌 수 없습니다.
              </p>
            </div>
            <div className="w-full flex gap-5">
              <Button
                className="bg-neutrals-200"
                onClick={() => setClose('isEndChat')}
              >
                아니요
              </Button>
              <Button
                className="bg-neutrals-1300 text-neutrals-100"
                onClick={handleEndChat}
              >
                네
              </Button>
            </div>
          </ModalView>
        </Modal>
      )}
      <LineMap
        course={course}
        location={locationName}
        locationId={locationId}
        lastId={lastId}
        onOpen={handleOpenClick}
        isOpen={isOpenMap}
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
              <button onClick={handleOptionOpen}>
                {isOption ? <CloseIcon /> : <PlusIcon />}
              </button>

              <form
                className="w-full h-[40px] bg-neutral-100 flex pl-3 py-[10px] pr-1 rounded-[20px] relative"
                onSubmit={handleSubmit}
              >
                <SendInput value={value} onChange={onChange} ref={inputRef} />
                <div className="absolute right-0 top-1">
                  {isFocus ? (
                    <button type="button" onClick={handleSubmit}>
                      <SendIcon />
                    </button>
                  ) : (
                    <button type="button" onClick={handleEndClick}>
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
        {isRecommendation && !isLoading && (
          <RecommendationQuestion
            key={'questions'}
            questions={questions}
            onClick={handleQuestionClick}
          />
        )}
        {<LodaingMessage isLoading={isLoading} />}
      </ChatSection>
    </>
  );
}
