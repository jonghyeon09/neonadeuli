import type { Login } from '@/types/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  user: Login | null;
};

interface Action {
  setUser: (user: Login) => void;
  reset: () => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
      reset: () => set(() => ({ user: null })),
    }),
    {
      name: 'user',
    }
  )
);
