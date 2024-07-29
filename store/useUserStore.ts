import type { Login } from '@/types/api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  user: Login | null;
  login: boolean;
};

interface Action {
  setUser: (user: Login) => void;
  setLogin: () => void;
  reset: () => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      login: false,
      setUser: (user) => set(() => ({ user: user })),
      setLogin: () => set(() => ({ login: true })),
      reset: () => set(() => ({ user: null, login: false })),
    }),
    {
      name: 'user',
    }
  )
);
