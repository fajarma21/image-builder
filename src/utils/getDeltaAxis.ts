import type { Point } from '@/types';

const getDeltaAxis = (startMouse: Point, currentMouse: Point, zoom: number) => {
  return {
    dx: Math.round((currentMouse.x - startMouse.x) / zoom),
    dy: Math.round((currentMouse.y - startMouse.y) / zoom),
  };
};

export default getDeltaAxis;
