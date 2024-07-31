import type { BotMessage, SendMessage, Session } from '@/types/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Messages = (BotMessage | SendMessage)[];

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
    messages: BotMessage | SendMessage
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

          state.sessionsMessage.forEach((messages) => {
            const condition = messages[sessionId]?.location?.messages;
            if (condition) {
              copyMessages = condition;
            }
          });

          return {
            sessionsMessage: [
              // ...state.sessionsMessage,
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
