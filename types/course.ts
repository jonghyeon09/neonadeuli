export interface Location {
  id: number;
  name: string;
  visit: boolean;
}

export type Course = Location[][];
export type LocationIndex = [number, number];
