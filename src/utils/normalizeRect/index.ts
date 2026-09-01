import type { NormalizeRectParams } from './index.types';

const normalizeRect = ({ startMouse, currentMouse }: NormalizeRectParams) => {
  const top = Math.min(startMouse.y, currentMouse.y);
  const bottom = Math.max(startMouse.y, currentMouse.y);
  const left = Math.min(startMouse.x, currentMouse.x);
  const right = Math.max(startMouse.x, currentMouse.x);
  const width = Math.abs(currentMouse.x - startMouse.x);
  const height = Math.abs(currentMouse.y - startMouse.y);
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
