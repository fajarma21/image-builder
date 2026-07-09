import type { Shape } from '@/types/shape';

const getBounds = ({ x, y, width, height }: Shape) => {
  return {
    top: y,
    bottom: y + height,
    left: x,
    right: x + width,
  };
};

export default getBounds;
