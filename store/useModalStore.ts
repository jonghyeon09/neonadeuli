import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  isArrive: boolean;
  isSidebar: boolean;
  isSplash: boolean;
  isEndChat: boolean;
}

interface Action {
  toggleModal: (key: keyof State) => void;
  setOpen: (key: keyof State) => void;
  setClose: (key: keyof State) => void;
}

export const useModalStore = create<State & Action>()(
  devtools((set) => ({
    isArrive: false,
    isSidebar: false,
    isSplash: true,
    isEndChat: false,
    toggleModal: (key) => set((state) => ({ [key]: !state[key] })),
    setOpen: (key) => set((state) => ({ [key]: true })),
    setClose: (key) => set((state) => ({ [key]: false })),
  }))
);
