import { Coordinates, NaverMap } from '@/types/map';
import { create } from 'zustand';

interface MapState {
  map: NaverMap | null;
}

interface Action {
  initializeMap: (map: NaverMap) => void;
}

export const INITIAL_CENTER: Coordinates = [37.576, 126.97685];
export const INITIAL_ZOOM = 18;

export const useMapStore = create<MapState & Action>()((set) => ({
  map: null,
  initializeMap: (map) => set((state) => ({ map: map })),
}));
