import type { RectangleProps } from './View.types';

const Rectangle = ({ shape, ...actionProps }: RectangleProps) => {
  const { imageSrc, show, ...restShape } = shape;
  void imageSrc;
  void show;

  return <rect {...restShape} {...actionProps} />;
};

export default Rectangle;
