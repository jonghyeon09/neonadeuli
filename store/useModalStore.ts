import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  isArrive: boolean;
  isSidebar: boolean;
}

interface Action {
  toggleModal: (key: keyof State) => void;
  // setModal: (modal: { [key: string]: boolean }) => void;
}

export const useModalStore = create<State & Action>()(
  devtools((set) => ({
    isArrive: true,
    isSidebar: false,
    toggleModal: (key) => set((state) => ({ [key]: !state[key] })),
  }))
);
