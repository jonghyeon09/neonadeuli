import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  nickname: string;
  token: string | null;
}

interface Action {
  setNickname: (nicknmae: string) => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      nickname: '',
      token: null,
      setNickname: (nickname) => set(() => ({ nickname })),
      setToken: (token) => set(() => ({ token })),
    }),
    { name: 'user' }
  )
);
