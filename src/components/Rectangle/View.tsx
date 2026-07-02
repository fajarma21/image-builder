import type { RectangleProps } from './View.types';

const Rectangle = ({ shape, ...actionProps }: RectangleProps) => {
  return <rect {...shape} {...actionProps} />;
};

export default Rectangle;
