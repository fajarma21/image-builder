import type { EllipseProps } from './View.types';

const Ellipse = ({ shape, ...actionProps }: EllipseProps) => {
  const { x, y, width, height, fill, stroke } = shape;

  return (
    <ellipse
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill}
      stroke={stroke}
      {...actionProps}
    />
  );
};

export default Ellipse;
