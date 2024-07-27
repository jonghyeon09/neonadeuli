import { create } from 'zustand';

interface State {
  nickname: string;
  token: string | null;
}

interface Action {
  setNickname: (nicknmae: string) => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<State & Action>()((set) => ({
  nickname: '',
  token: null,
  setNickname: (nickname) => set(() => ({ nickname: nickname })),
  setToken: (token) => set(() => ({ token: token })),
}));
