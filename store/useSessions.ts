import type { Session } from '@/types/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  sessions: Session[] | [];
};

interface Action {
  setSession: (session: Session) => void;
}

export const useSessions = create<State & Action>()(
  persist(
    (set) => ({
      sessions: [],
      setSession: (session) =>
        set((state) => ({ sessions: [...state.sessions, session] })),
    }),
    {
      name: 'sessions',
    }
  )
);
