import { Coordinates, NaverMap } from '@/types/map';
import { create } from 'zustand';

interface MapState {
  map: NaverMap | null;
  initializeMap: (map: NaverMap) => void;
}

export const INITIAL_CENTER: Coordinates = [37.576, 126.97685];
export const INITIAL_ZOOM = 19;

export const useMapStore = create<MapState>()((set) => ({
  map: null,
  initializeMap: (map) => set((state) => ({ map: map })),
}));
