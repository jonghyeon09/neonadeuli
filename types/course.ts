export interface Location {
  id: number;
  name: string;
  visit: boolean;
  coordinate: [number, number];
}

export type Course = Location[][];
export type LocationIndex = [number, number];
