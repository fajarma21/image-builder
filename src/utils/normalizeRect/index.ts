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
  const width = Math.abs(currentMouseX - startMouseX);
  const height = Math.abs(currentMouseY - startMouseY);
  return {
    top,
    bottom,
    left,
    right,
    width,
    height,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
};

export default normalizeRect;
