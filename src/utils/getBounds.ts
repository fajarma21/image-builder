import type { Shape } from '@/types/shape';

const getBounds = ({ x, y, width, height }: Shape) => {
  return {
    top: y,
    bottom: y + height,
    left: x,
    right: x + width,
    width,
    height,
    centerX: x + width / 2,
    centerY: y + height / 2,
  };
};

export default getBounds;
