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
    messages: Messages
  ) => void;
  syncStorage: () => void;
}

export const useSessions = create<State & Action>()(
  persist(
    (set) => ({
      isStorage: false,
      sessions: [],
      sessionsMessage: [],
      setSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
      setSessionMessages: (sessionId, locationId, messages) =>
        set((state) => {
          return {
            sessionsMessage: [
              // ...state.sessionsMessage,
              {
                [sessionId]: {
                  location: {
                    id: locationId,
                    messages: messages,
                  },
                },
              },
            ],
          };
        }),
      syncStorage: () => set(() => ({ isStorage: true })),
    }),
    {
      name: 'sessions',
    }
  )
);
