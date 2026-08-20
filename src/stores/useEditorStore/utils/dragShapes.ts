import type { Shape } from '@/types/shape';

const dragShapes = (shapes: Shape[], dx: number, dy: number) => {
  return shapes.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.id]: {
        ...curr,
        x: curr.x + dx,
        y: curr.y + dy,
      },
    };
  }, {});
};

export default dragShapes;
