import { createContext } from 'preact';

export interface ImageDimensions {
  height: number;
  width: number;
  x: number;
  y: number;
}

export const ImageContext = createContext<ImageDimensions>({
  height: 0,
  width: 0,
  x: 0,
  y: 0,
});
