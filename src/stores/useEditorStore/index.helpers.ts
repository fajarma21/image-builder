import type { Document } from './index.types';

export const getCanvasBounds = ({ width, height }: Document) => {
  return {
    top: 0,
    bottom: height,
    left: 0,
    right: width,
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
  };
};
