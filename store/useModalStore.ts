import { create } from 'zustand';

interface State {
  isArrive: boolean;
}

interface Action {
  toggleModal: () => void;
}

export const useModalStore = create<State & Action>()((set) => ({
  isArrive: true,
  toggleModal: () => set((state) => ({ isArrive: !state.isArrive })),
}));
