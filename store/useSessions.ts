import type { BotMessage, SendMessage, Session } from '@/types/api';
import { ErrorMessage } from '@/types/chat';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Messages = (BotMessage | SendMessage | ErrorMessage)[];

interface LocationMessages {
  [sessionId: number]: {
    messages: Messages;
  } | null;
}

type State = {
  isStorage: boolean;
  sessions: Session[] | [];
  sessionMessages: LocationMessages[];
};

interface Action {
  setSession: (session: Session) => void;
  initSessions: () => void;
  setSessionMessages: (params: {
    sessionId: number;
    locationId: number;
    message: BotMessage | SendMessage | ErrorMessage;
  }) => void;
  syncStorage: () => void;
  // initSessionMessages: (sessionId: number) => void;
}

export const useSessions = create<State & Action>()(
  persist(
    (set) => ({
      isStorage: false,
      sessions: [],
      sessionMessages: [],
      setSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
      initSessions: () => set(() => ({ sessions: [] })),
      setSessionMessages: (params) =>
        set((state) => {
          let copyMessages: Messages = [];
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
      // initSessionMessages: (sessionId) =>
      //   set((state) => {
      //     state.sessionsMessage.forEach((messages) => {
      //       delete messages[sessionId];
      //     });
      //     return {
      //       sessionsMessage: [...state.sessionsMessage],
      //     };
      //   }),
      syncStorage: () => set(() => ({ isStorage: true })),
    }),
    {
      name: 'sessions',
    }
  )
);
