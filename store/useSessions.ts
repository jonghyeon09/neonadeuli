import type { BotMessage, Session } from '@/types/api';
import { ErrorMessage, SendMessage } from '@/types/chat';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Messages = (BotMessage | SendMessage | ErrorMessage)[];

interface LocationMessages {
  [sessionId: number]: {
    location: {
      id: number;
      messages: Messages;
    };
  } | null;
}

type State = {
  isStorage: boolean;
  sessions: Session[] | [];
  sessionsMessage: LocationMessages[] | [];
};

interface Action {
  setSession: (session: Session) => void;
  setSessionMessages: (
    sessionId: number,
    locationId: number,
    messages: BotMessage | SendMessage | ErrorMessage
  ) => void;
  syncStorage: () => void;
  initSessionMessages: (sessionId: number) => void;
}

export const useSessions = create<State & Action>()(
  persist(
    (set) => ({
      isStorage: false,
      sessions: [],
      sessionsMessage: [],
      setSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
      setSessionMessages: (sessionId, locationId, message) =>
        set((state) => {
          let copyMessages: Messages = [];
          let copySessions: LocationMessages[] = [];

          state.sessionsMessage.forEach((messages, i) => {
            const condition = messages[sessionId]?.location?.messages;

            if (condition) {
              copyMessages = condition;
            }

            if (!messages[sessionId]) {
              copySessions.push(state.sessionsMessage[i]);
            }
          });

          return {
            sessionsMessage: [
              ...copySessions,
              {
                [sessionId]: {
                  location: {
                    id: locationId,
                    messages: [...copyMessages, message],
                  },
                },
              },
            ],
          };
        }),
      initSessionMessages: (sessionId) =>
        set((state) => {
          state.sessionsMessage.forEach((messages) => {
            delete messages[sessionId];
          });
          return {
            sessionsMessage: [...state.sessionsMessage],
          };
        }),
      syncStorage: () => set(() => ({ isStorage: true })),
    }),
    {
      name: 'sessions',
    }
  )
);
