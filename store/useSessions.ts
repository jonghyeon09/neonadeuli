import type { Session } from '@/types/api';
import { LocationMessages, Message, QuizCount } from '@/types/chat';
import { Location } from '@/types/course';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  isStorage: boolean;
  sessions: Session[] | [];
  sessionMessages: LocationMessages[];
  quizCount: QuizCount;
  course: {
    [sessionId: number]: Location[][] | null;
  };
};

interface Action {
  setSession: (session: Session) => void;
  initSessions: () => void;
  setSessionMessages: (params: { sessionId: number; message: Message }) => void;
  syncStorage: () => void;
  initCount: (sessionId: number) => void;
  setCount: (params: { sessionId: number; count: number }) => void;
  setCourse: (params: { sessionId: number; course: Location[][] }) => void;
}

export const useSessions = create<State & Action>()(
  persist(
    (set) => ({
      isStorage: false,
      sessions: [],
      sessionMessages: [],
      quizCount: {},
      course: {},
      setSession: (session) =>
        set((state) => {
          const filter = state.sessions.filter(
            (session) => session.session_id !== session.session_id
          );

          return {
            sessions: [...filter, session],
          };
        }),
      initSessions: () => set(() => ({ sessions: [] })),
      setSessionMessages: (params) =>
        set((state) => {
          let copyMessages: Message[] = [];
          let copySessions: LocationMessages[] = [];

          state.sessionMessages.forEach((messages, i) => {
            const condition = messages[params.sessionId]?.messages;

            if (condition) {
              copyMessages = condition;
            }

            if (!messages[params.sessionId]) {
              copySessions.push(state.sessionMessages[i]);
            }
          });

          return {
            sessionMessages: [
              ...copySessions,
              {
                [params.sessionId]: {
                  messages: [...copyMessages, params.message],
                },
              },
            ],
          };
        }),
      initCount: (sessionId) =>
        set((state) => ({
          quizCount: { ...state.quizCount, [sessionId]: 10 },
        })),
      setCount: (params) =>
        set((state) => ({
          quizCount: { ...state.quizCount, [params.sessionId]: params.count },
        })),
      setCourse: (params) =>
        set((state) => ({
          course: { ...state.course, [params.sessionId]: params.course },
        })),
      syncStorage: () => set(() => ({ isStorage: true })),
    }),
    {
      name: 'sessions',
    }
  )
);
