import type { EllipseProps } from './View.types';

const Ellipse = ({ shape, ...actionProps }: EllipseProps) => {
  const { x, y, width, height, imageSrc, show, ...restShape } = shape;
  void imageSrc;
  void show;

  return (
    <ellipse
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
      {...restShape}
      {...actionProps}
    />
  );
};

export default Ellipse;
