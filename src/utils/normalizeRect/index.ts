import type { NormalizeRectParams } from './index.types';

const normalizeRect = ({
  startMouseX,
  startMouseY,
  currentMouseX,
  currentMouseY,
}: NormalizeRectParams) => {
  const top = Math.min(startMouseY, currentMouseY);
  const bottom = Math.max(startMouseY, currentMouseY);
  const left = Math.min(startMouseX, currentMouseX);
  const right = Math.max(startMouseX, currentMouseX);
  return {
    top,
    bottom,
    left,
    right,
    width: Math.abs(currentMouseX - startMouseX),
    height: Math.abs(currentMouseY - startMouseY),
  };
};

export default normalizeRect;
