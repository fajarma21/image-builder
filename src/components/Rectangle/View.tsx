import type { RectangleProps } from './View.types';

const Rectangle = ({ shape, ...actionProps }: RectangleProps) => {
  const { imageSrc, ...restShape } = shape;
  void imageSrc;

  return <rect {...restShape} {...actionProps} />;
};

export default Rectangle;
